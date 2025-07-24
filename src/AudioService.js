// src/services/AudioService.js

// Define the API URL for your backend
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

class AudioService {
  constructor() {
    // Stores HTMLAudioElement instances for each padNumber
    this.audioRefs = {};
    // Stores the padNumber of the currently looping sound that is *exclusive* (e.g., specific pollutant sounds if they were looping)
    this.currentlyPlayingExclusiveLoop = null; // Renamed for clarity
    // Stores the padNumber of the persistent ambient background sound
    this.ambientSoundPad = "999"; // Define your ambient sound pad number here
    this.ambientAudioRef = null; // Reference for the ambient audio element

    // Global mute state, initialized based on localStorage if available, otherwise false (unmuted)
    this.isMuted = localStorage.getItem("audioEnabled") === "false";
    // Maps SVG element IDs (pollutants, plants) to pad numbers.
    // This mapping is INTENTIONALLY NOT CLEARED on reset.
    this.elementToPadMapping = {};
    // Stores blob URLs for preloaded/fetched audio to avoid re-fetching
    this.cachedUrls = {};

    // Sets to keep track of active timeouts and intervals for proper cleanup
    this.activeFadeTimeouts = new Set();
    this.activeFadeIntervals = new Set();

    // Internal storage for categorized data, used to rebuild mapping if needed (though not on reset in this version)
    this._categorizedData = null;
  }

  /**
   * Initializes the AudioService with application data (pollutants, plants).
   * This should typically be called once when the main application component mounts.
   * @param {Array} categorizedData - The data containing pollutant/plant IDs and pad numbers.
   */
  init(categorizedData) {
    if (!categorizedData || !Array.isArray(categorizedData) || categorizedData.length === 0) {
      console.warn("[AudioService] init called with invalid or empty data. Skipping mapping build.");
      return;
    }
    console.log("[AudioService] Initializing service with data (building mapping).");
    // Store the data internally, in case we need to rebuild the mapping later (though not on `resetAllAudioState` in current logic)
    this._categorizedData = categorizedData;
    this.buildElementToPadMapping(categorizedData);
    this.preloadCommonSounds(); // Start preloading sounds
  }

  /**
   * Resets the entire audio playback state of the service.
   * Stops all playing sounds, clears internal audio element references,
   * resets mute state, and clears active fade operations.
   * Importantly, `elementToPadMapping` is RETAINED.
   */
  resetAllAudioState() {
    console.log('[AudioService] Performing full audio state reset...');

    // 1. Stop all currently playing sounds with a quick fade
    this.stopAllSounds(500); // This now includes ambient sound too

    // 2. Clear all pending timeouts and intervals for fades to prevent ghost operations
    this.activeFadeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.activeFadeTimeouts.clear();
    this.activeFadeIntervals.forEach(intervalId => clearInterval(intervalId));
    this.activeFadeIntervals.clear();

    // 3. Reset internal state variables to their default "first load" values
    this.currentlyPlayingExclusiveLoop = null; // Reset exclusive loop tracker
    this.isMuted = false; // Reset mute state to default (unmuted)
    // Update localStorage to reflect the unmuted state for future loads
    localStorage.setItem("audioEnabled", "true");

    // 4. Dispose of all active HTMLAudioElement instances and revoke their blob URLs
    this.dispose();

    console.log('[AudioService] Audio state reset complete. Element mapping retained.');
  }

  /**
   * Cleans up all active HTMLAudioElement instances and revokes blob URLs.
   * This is called internally by `resetAllAudioState()`.
   * The `elementToPadMapping` is NOT cleared here.
   */
  dispose() {
    console.log('[AudioService] Disposing audio resources (pausing audio elements and revoking URLs)...');
    // Iterate over all stored audio elements and pause/reset them
    Object.values(this.audioRefs).forEach(audio => {
      if (audio) {
        if (!audio.paused) {
          audio.pause();
        }
        audio.currentTime = 0; // Reset playback position
      }
    });

    // Also dispose of the ambient audio ref
    if (this.ambientAudioRef) {
      if (!this.ambientAudioRef.paused) {
        this.ambientAudioRef.pause();
      }
      this.ambientAudioRef.currentTime = 0;
      this.ambientAudioRef = null; // Clear reference
    }

    // Revoke any created blob URLs to prevent memory leaks
    Object.values(this.cachedUrls).forEach(url => {
      if (url && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    // Clear references to HTMLAudioElement instances and cached URLs
    this.audioRefs = {};
    this.cachedUrls = {};
    // Crucially: this.elementToPadMapping is NOT cleared here, ensuring persistence.
  }

  /**
   * Adds a timeout ID to a set for tracking, allowing global clearing.
   * @param {number} id - The ID returned by `setTimeout`.
   */
  _addTimeout(id) {
    this.activeFadeTimeouts.add(id);
  }

  /**
   * Removes a timeout ID from tracking.
   * @param {number} id - The ID returned by `setTimeout`.
   */
  _removeTimeout(id) {
    this.activeFadeTimeouts.delete(id);
  }

  /**
   * Adds an interval ID to a set for tracking, allowing global clearing.
   * @param {number} id - The ID returned by `setInterval`.
   */
  _addInterval(id) {
    this.activeFadeIntervals.add(id);
  }

  /**
   * Removes an interval ID from tracking.
   * @param {number} id - The ID returned by `setInterval`.
   */
  _removeInterval(id) {
    this.activeFadeIntervals.delete(id);
  }

  /**
   * Builds a comprehensive mapping from element IDs (pollutant/plant names) to pad numbers.
   * This supports various spellings and formats for robust lookup.
   * @param {Array} categorizedData - The data array from the backend.
   */
  buildElementToPadMapping(categorizedData) {
    if (!categorizedData || !Array.isArray(categorizedData)) {
      console.warn("Invalid data format for building element mapping");
      return;
    }

    // Add known spelling variations map for robust lookup
    const spellingVariants = {
      'aluminum': 'aluminium', // US vs UK spelling
      'thalium': 'thallium', // Common misspelling
      'estrogen-pills': 'estrogen', // Specific compound form
      'organic-matter': 'organicmatter', // Hyphenated vs spaced
      'crude': 'crudeoil'
    };

    // Create mappings from the data for pollutants
    categorizedData.forEach(row => {
      if (row.id && row.Number) {
        const id = row.id.trim();
        const padNumber = String(row.Number);

        // Store multiple variations of the ID to improve matching
        this.elementToPadMapping[id.toLowerCase()] = padNumber;
        this.elementToPadMapping[id.toLowerCase().replace(/-/g, '')] = padNumber;
        this.elementToPadMapping[id.toLowerCase().replace(/-/g, ' ')] = padNumber;
        this.elementToPadMapping[id.toLowerCase().replace(/\s+/g, '')] = padNumber;

        // Pollutant name variations if available
        if (row.Pollutantname_split) {
          const pollutantName = row.Pollutantname_split.trim().toLowerCase();
          this.elementToPadMapping[pollutantName] = padNumber;
          this.elementToPadMapping[pollutantName.replace(/\s+/g, '-')] = padNumber;
          this.elementToPadMapping[pollutantName.replace(/\s+/g, '')] = padNumber;
        }
      }
    });

    // Handle plant names separately (assuming they also map to pad numbers)
    categorizedData.forEach(row => {
      if (row.plantName_Split && row.Number) {
        const plantName = row.plantName_Split.trim().toLowerCase();
        this.elementToPadMapping[plantName] = String(row.Number);
        this.elementToPadMapping[plantName.replace(/\s+/g, '-')] = String(row.Number);
        this.elementToPadMapping[plantName.replace(/\s+/g, '')] = String(row.Number);
      }
    });

    // Add the known spelling variants to our mapping, connecting them to existing entries
    Object.entries(spellingVariants).forEach(([variant, standard]) => {
      if (this.elementToPadMapping[standard]) {
        this.elementToPadMapping[variant] = this.elementToPadMapping[standard];
        console.log(`Added spelling variant mapping: ${variant} → ${standard} (Pad ${this.elementToPadMapping[standard]})`);
      }
    });

    console.log("Element to pad mapping built with entries:", Object.keys(this.elementToPadMapping).length);
  }

  /**
   * Sets up an automatic fade-out for an audio element before it naturally ends.
   * @param {string} padNumber - The pad number of the audio.
   * @param {number} fadeOutDuration - The duration of the fade-out in milliseconds.
   */
  setupAutoFadeAtEnd(audio, padNumber, fadeOutDuration = 2500) { // Added 'audio' parameter
    console.log(`[AudioService] Setting up auto-fade at end for pad ${padNumber}`);

    if (!audio) {
      console.warn(`[AudioService] Cannot setup auto-fade: No audio playing for pad ${padNumber}`);
      return;
    }

    // Clear any existing fade timeouts/listeners for this audio
    if (audio._fadeTimeout) { clearTimeout(audio._fadeTimeout); audio._fadeTimeout = null; }
    if (audio._endedListener) { audio.removeEventListener('ended', audio._endedListener); audio._endedListener = null; }

    const timeRemaining = (audio.duration - audio.currentTime) * 1000; // in ms
    console.log(`[AudioService] Audio for pad ${padNumber}: ${timeRemaining.toFixed(0)}ms remaining`);

    // If audio is already too short, let it finish naturally
    if (timeRemaining <= fadeOutDuration) {
      console.log(`[AudioService] Audio almost complete, letting it finish naturally`);
      return;
    }

    const fadeStartDelay = Math.max(0, timeRemaining - fadeOutDuration);
    console.log(`[AudioService] Will start fade in ${fadeStartDelay.toFixed(0)}ms, fade duration: ${fadeOutDuration}ms`);

    audio._fadeTimeout = setTimeout(() => {
      console.log(`[AudioService] Starting auto-fade for pad ${padNumber}`);
      this.fadeOutAudio(audio, fadeOutDuration).then(() => {
        console.log(`[AudioService] Auto-fade complete for pad ${padNumber}`);
      });
    }, fadeStartDelay);
    this._addTimeout(audio._fadeTimeout); // Track the timeout

    // Set up a safety cleanup in case the ended event fires before the fade timeout
    audio._endedListener = () => {
      console.log(`[AudioService] Audio ended naturally for pad ${padNumber}`);
      if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        this._removeTimeout(audio._fadeTimeout); // Remove from tracking
        audio._fadeTimeout = null;
      }
    };
    audio.addEventListener('ended', audio._endedListener);

    return {
      cancel: () => {
        console.log(`[AudioService] Cancelling auto-fade for pad ${padNumber}`);
        if (audio._fadeTimeout) {
          clearTimeout(audio._fadeTimeout);
          this._removeTimeout(audio._fadeTimeout);
          audio._fadeTimeout = null;
        }
        if (audio._endedListener) {
          audio.removeEventListener('ended', audio._endedListener);
          audio._endedListener = null;
        }
      }
    };
  }

  /**
   * Fades in an audio element.
   * @param {HTMLAudioElement} audio - The audio element to fade in.
   * @param {number} targetVolume - The target volume to fade to (0.0 to 1.0).
   * @param {number} duration - The duration of the fade in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the fade is complete.
   */
  fadeInAudio(audio, targetVolume = 1.0, duration = 1000) {
    return new Promise(resolve => {
      if (!audio || audio.ended || targetVolume === 0) {
        resolve();
        return;
      }

      audio.volume = 0; // Start with volume at 0

      const playPromise = audio.play();

      playPromise.then(() => {
        // Handle play promise (required for modern browsers to catch autoplay blocking)
        if (audio.paused) {
          // If audio is paused immediately after play() call, it was blocked
          window.dispatchEvent(new CustomEvent('audio-blocked'));
        }

        const fadeSteps = 60;
        const intervalTime = duration / fadeSteps;
        const startTime = Date.now();

        const fadeInterval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const fadeProgress = Math.min(elapsedTime / duration, 1);

          // Use quadratic curve for natural fade-in perception
          audio.volume = targetVolume * Math.pow(fadeProgress, 2);

          if (fadeProgress >= 1 || audio.volume >= targetVolume - 0.01) {
            audio.volume = targetVolume;
            clearInterval(fadeInterval);
            this._removeInterval(fadeInterval); // Remove from tracking
            resolve();
          }
        }, intervalTime);
        this._addInterval(fadeInterval); // Add to tracking
      }).catch(err => {
        // Handle explicit playback blocking (e.g., NotAllowedError)
        if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
          window.dispatchEvent(new CustomEvent('audio-blocked'));
        }
        console.error("Error starting audio playback:", err);
        resolve(); // Resolve anyway to not block the main flow
      });
    });
  }

  /**
   * Fades out an audio element.
   * @param {HTMLAudioElement} audio - The audio element to fade out.
   * @param {number} duration - The duration of the fade in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the fade is complete.
   */
  fadeOutAudio(audio, duration = 2000) {
    return new Promise(resolve => {
      if (!audio || audio.paused || audio.volume === 0) {
        console.log("Fade skipped: Audio already stopped or volume at 0");
        resolve();
        return;
      }

      console.log(`Starting fade out - Duration: ${audio.duration}s, Current time: ${audio.currentTime.toFixed(2)}s, Remaining: ${(audio.duration - audio.currentTime).toFixed(2)}s`);

      const timeRemaining = audio.duration - audio.currentTime;
      // Adjust fade duration if audio will end naturally sooner
      if (timeRemaining > 0 && timeRemaining < duration / 1000) {
        duration = timeRemaining * 1000 * 0.95; // 95% of remaining time to finish just before end
        console.warn(`⚠️ FADE ISSUE: Audio will end naturally in ${timeRemaining.toFixed(2)}s, adjusting fade duration to ${duration.toFixed(0)}ms`);
      }
      if (duration < 50) { // If calculated duration is too short, just stop immediately
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        resolve();
        return;
      }

      const originalVolume = audio.volume;
      const fadeSteps = 60;
      const intervalTime = duration / fadeSteps;
      const startTime = Date.now();
      let lastLogTime = 0;

      // Create an onended handler to catch if audio ends naturally during fade
      const handleEnded = () => {
        console.log("Audio ended naturally during fade out");
        clearInterval(fadeInterval);
        this._removeInterval(fadeInterval); // Remove from tracking
        audio.removeEventListener('ended', handleEnded);
        audio.volume = originalVolume; // Reset volume for future plays
        resolve();
      };

      audio.addEventListener('ended', handleEnded);

      const fadeInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const fadeProgress = Math.min(elapsedTime / duration, 1);

        // Exponential curve for more natural audio fade perception
        audio.volume = originalVolume * Math.pow(1 - fadeProgress, 2);

        // Log progress every 500ms to avoid console spam
        if (Date.now() - lastLogTime > 500) {
          lastLogTime = Date.now();
        }

        if (fadeProgress >= 1 || audio.volume < 0.01) {
          audio.volume = 0; // Ensure volume is 0
          audio.pause(); // Pause the audio
          audio.currentTime = 0; // Reset playback to beginning
          audio.volume = originalVolume; // Restore original volume for next play
          audio.removeEventListener('ended', handleEnded); // Clean up listener
          clearInterval(fadeInterval); // Clear the interval
          this._removeInterval(fadeInterval); // Remove from tracking
          console.log("Fade out complete");
          resolve();
        }
      }, intervalTime);
      this._addInterval(fadeInterval); // Add to tracking
    });
  }

  /**
   * Plays a sound associated with a given element ID (e.g., from an SVG).
   * It looks up the corresponding pad number and plays that sound.
   * @param {string} elementId - The ID of the SVG element.
   * @param {object} options - Playback options (loop, volume, fadeIn, etc.).
   * @returns {object|null} A control object for the playing sound, or null if sound cannot be played.
   */
  playElementSound(elementId, options = {}) {
    console.log(`[AudioService] playElementSound called for: ${elementId} with options:`, options);

    if (this.isMuted) {
      console.log(`[AudioService] Play request for ${elementId} skipped: Audio is muted.`);
      return null;
    }

    if (!elementId) {
      console.warn("[AudioService] No elementId provided to playElementSound");
      return null;
    }

    const defaultOptions = {
      loop: false,
      volume: 1.0,
      stopOnMouseLeave: false,
      fadeIn: true,
      fadeInDuration: 1000,
      fadeOutDuration: 2500
    };

    const settings = { ...defaultOptions, ...options };
    console.log(`[AudioService] Final settings for ${elementId}:`, settings);

    // Known spelling variations map (redundant here, but ensures robustness)
    const spellingVariants = {
      'aluminum': 'aluminium',
      'thalium': 'thallium',
      'estrogen-pills': 'estrogen',
      'organic-matter': 'organicmatter',
      'vallisneria': 'vallisneria spiralis',
      'crude': 'crudeoil'
    };

    let lookupId = elementId.toLowerCase();

    // Check if this is a known variant and replace with standard spelling
    if (spellingVariants[lookupId]) {
      const standardSpelling = spellingVariants[lookupId];
      console.log(`[AudioService] Converting ${lookupId} to standard spelling: ${standardSpelling}`);
      lookupId = standardSpelling;
    }

    // Attempt to find padNumber using various formats
    let padNumber = this.elementToPadMapping[lookupId] ||
      this.elementToPadMapping[lookupId.replace(/-/g, '')] ||
      this.elementToPadMapping[lookupId.replace(/-/g, ' ')] ||
      this.elementToPadMapping[lookupId.replace(/\s+/g, '')];

    // Final check for spelling variants if direct/hyphenated failed
    if (!padNumber) {
      Object.entries(spellingVariants).forEach(([variant, standard]) => {
        if (lookupId === variant && this.elementToPadMapping[standard]) {
          padNumber = this.elementToPadMapping[standard];
          console.log(`[AudioService] Using spelling variant mapping: ${standard} (Pad ${padNumber})`);
        }
      });
    }

    if (!padNumber) {
      console.warn(`[AudioService] No pad mapping found for element: ${elementId}. Available mappings count: ${Object.keys(this.elementToPadMapping).length}`);
      return null;
    }

    console.log(`[AudioService] Playing sound for element: ${elementId} (Pad ${padNumber})`);
    // Pass along the `isAmbient` flag if needed by playPadSound for special handling
    return this.playPadSound(padNumber, settings);
  }

  /**
   * Stops a sound associated with a given element ID.
   * @param {string} elementId - The ID of the SVG element.
   * @param {number} fadeOutDuration - The duration of the fade-out in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the sound is stopped.
   */
  stopElementSound(elementId, fadeOutDuration = 2500) {
    console.log(`[AudioService] stopElementSound called for: ${elementId} with fadeOutDuration: ${fadeOutDuration}ms`);

    if (!elementId) {
      console.warn("[AudioService] No elementId provided to stopElementSound");
      return Promise.resolve();
    }

    const lookupId = elementId.toLowerCase();
    const padNumber = this.elementToPadMapping[lookupId];

    if (!padNumber) {
      console.warn(`[AudioService] No pad mapping found for element to stop: ${elementId}`);
      return Promise.resolve();
    }

    console.log(`[AudioService] Stopping sound for element: ${elementId} (Pad ${padNumber}) with fade: ${fadeOutDuration}ms`);
    return this.stopPadSound(padNumber, fadeOutDuration);
  }

  /**
   * Debugs an audio file by fetching its URL and logging properties like duration.
   * Useful for identifying issues with audio files themselves (e.g., too short for fades).
   * @param {string} padNumber - The pad number of the audio file to debug.
   * @returns {Promise<object>} An object containing debug information.
   */
  async debugAudioFile(padNumber) {
    try {
      const url = await this.getAudioUrl(padNumber);

      const tempAudio = new Audio(url);

      await new Promise(resolve => {
        tempAudio.addEventListener('loadedmetadata', resolve);
        tempAudio.addEventListener('error', (e) => {
          console.error(`Error loading audio metadata: ${e}`);
          resolve(); // Resolve even on error to prevent hanging
        });
        setTimeout(resolve, 3000); // Timeout in case metadata never loads
      });

      console.log(`----- AUDIO DEBUG: Pad ${padNumber} -----`);
      console.log(`Duration: ${tempAudio.duration} seconds`);
      console.log(`Default playback rate: ${tempAudio.defaultPlaybackRate}`);
      console.log(`Can play through: ${tempAudio.preload}`);
      console.log(`Ready state: ${tempAudio.readyState}`);

      if (tempAudio.duration < 2.5 && tempAudio.duration > 0) { // Check for valid but short duration
        console.warn(`⚠️ ISSUE DETECTED: Audio for pad ${padNumber} is only ${tempAudio.duration.toFixed(2)} seconds long, which is shorter than our default fade duration (2.5s)`);
        return {
          isTooShort: true,
          duration: tempAudio.duration,
          recommendation: "Adjust fade duration to be shorter than audio length or use longer audio."
        };
      }

      return {
        duration: tempAudio.duration,
        isTooShort: false
      };
    } catch (err) {
      console.error(`Error debugging audio file for pad ${padNumber}:`, err);
      return { error: err.message };
    }
  }

  /**
   * Core function to play a sound associated with a pad number.
   * Manages audio element creation, loading, looping, and fading.
   * @param {string} padNumber - The pad number of the sound to play.
   * @param {object} options - Playback options (loop, volume, fadeIn, etc.).
   * @param {boolean} sendPostRequest - Whether to send a POST request to the backend.
   * @returns {object|null} A control object for the playing sound, or null if muted.
   */
  async playPadSound(padNumber, options = {}, sendPostRequest = false) {
    if (this.isMuted) {
      console.log(`[AudioService] Play request for pad ${padNumber} skipped: Audio is muted.`);
      return null;
    }

    const tankNumber = options.tankNumber;
    const defaultOptions = {
      loop: false,
      volume: 1.0,
      stopOnMouseLeave: false,
      fadeIn: true,
      fadeInDuration: 1000,
      fadeOutDuration: 2500
    };

    const settings = { ...defaultOptions, ...options };

    // Create a control object immediately for async operations
    const control = {
      padNumber,
      isReady: false,
      audio: null,
      stop: (fadeOutDuration = 2500) => {
        if (this.audioRefs[padNumber]) {
          return this.stopPadSound(padNumber, fadeOutDuration);
        }
        return Promise.resolve();
      }
    };

    try {
      // Logic for `currentlyPlayingExclusiveLoop` for non-ambient sounds
      if (padNumber !== this.ambientSoundPad) { // Do not stop ambient sound
        if (this.currentlyPlayingExclusiveLoop && this.currentlyPlayingExclusiveLoop !== padNumber) {
          console.log(`[AudioService] Stopping currently playing exclusive loop ${this.currentlyPlayingExclusiveLoop} before playing ${padNumber}`);
          await this.stopPadSound(this.currentlyPlayingExclusiveLoop, 500); // Gentle fade out for global stop
        }
        if (settings.loop) { // Only update exclusive loop if the new sound is a loop
          this.currentlyPlayingExclusiveLoop = padNumber;
        } else if (this.currentlyPlayingExclusiveLoop === padNumber) {
          // If a non-looping sound is requested and it was the currently playing exclusive loop, clear it.
          this.currentlyPlayingExclusiveLoop = null;
        }
      }


      // Get audio URL (from cache or new fetch)
      const url = await this.getAudioUrl(padNumber, sendPostRequest, tankNumber);

      // Determine which audio ref to use (ambient or general)
      let audio;
      if (padNumber === this.ambientSoundPad) {
        if (!this.ambientAudioRef) {
          this.ambientAudioRef = new Audio();
        }
        audio = this.ambientAudioRef;
      } else {
        if (!this.audioRefs[padNumber]) {
          this.audioRefs[padNumber] = new Audio();
        }
        audio = this.audioRefs[padNumber];
      }

      // Only update src and load if the URL has changed or it's a new Audio instance
      if (audio.src !== url) {
        audio.src = url;
        console.log(`[AudioService] Updating src for pad ${padNumber} and loading.`);
        await audio.load(); // Ensure new source is loaded and ready
      }

      // Configure audio properties
      audio.loop = settings.loop;
      audio.volume = settings.volume; // Set initial volume

      // Play with or without fade-in
      if (settings.fadeIn) {
        await this.fadeInAudio(audio, settings.volume, settings.fadeInDuration);
      } else {
        await audio.play();
      }

      // If it's the ambient sound and it's set to loop, make sure it keeps looping
      if (padNumber === this.ambientSoundPad && settings.loop) {
        audio.loop = true; // Ensure ambient sound loops indefinitely
        // No need to set currentlyPlayingExclusiveLoop for ambient
      } else if (padNumber !== this.ambientSoundPad && settings.loop) {
        // For other looping sounds, manage exclusive loop
        this.currentlyPlayingExclusiveLoop = padNumber;
      } else if (padNumber === this.currentlyPlayingExclusiveLoop && !settings.loop) {
        // If a non-looping sound is requested and it was the currently playing exclusive loop, clear it.
        this.currentlyPlayingExclusiveLoop = null;
      }


      // Update the control object with the audio reference
      control.audio = audio;
      control.isReady = true;

      console.log(`[AudioService] Audio control for pad ${padNumber} is now ready`);
      return control; // Return the control object on success
    } catch (err) {
      console.error(`Error playing pad ${padNumber}:`, err);
      // Dispatch audio-blocked event if play was blocked by browser policy
      if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
        window.dispatchEvent(new CustomEvent('audio-blocked'));
      }
      return null; // Return null on error
    }
  }

  /**
   * Fetches an audio URL from the backend, using a cache for efficiency.
   * @param {string} padNumber - The pad number to fetch audio for.
   * @param {boolean} sendPostRequest - Whether to send a POST request (for server-side logging/triggering).
   * @param {string|null} tankNumber - Optional tank number for the POST request.
   * @returns {Promise<string>} The Blob URL for the audio.
   */
  async getAudioUrl(padNumber, sendPostRequest = false, tankNumber = null) {
    // Check if URL is already cached
    if (this.cachedUrls[padNumber]) {
      return this.cachedUrls[padNumber];
    }

    try {
      const endpoint = `${API_URL}/play_pad?pad=${padNumber}`;
      if (sendPostRequest) {
        // Send POST request with tankNumber in the body if provided
        const body = tankNumber
          ? JSON.stringify({ pad: padNumber, tankNumber })
          : JSON.stringify({ pad: padNumber });

        const postResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });

        if (!postResponse.ok) {
          throw new Error(`Failed to send POST request for pad ${padNumber}`);
        }
        console.log(
          `POST request sent for pad ${padNumber}${
            tankNumber ? ` (tankNumber: ${tankNumber})` : ""
          }`
        );
      }

      // Always perform the GET request to actually fetch the audio blob
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Failed to fetch sound for pad ${padNumber}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      this.cachedUrls[padNumber] = url; // Cache the generated URL
      return url;
    } catch (err) {
      console.error(`Error fetching pad ${padNumber}:`, err);
      throw err; // Re-throw to be caught by playPadSound
    }
  }

  /**
   * Stops a specific pad sound, optionally with a fade-out.
   * @param {string} padNumber - The pad number of the sound to stop.
   * @param {number} fadeOutDuration - The duration of the fade-out in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the sound is stopped.
   */
  async stopPadSound(padNumber, fadeOutDuration = 2000) {
    let audio;
    if (padNumber === this.ambientSoundPad) {
      audio = this.ambientAudioRef;
    } else {
      audio = this.audioRefs[padNumber];
    }

    if (!audio) {
      console.log(`[AudioService] No audio found for pad ${padNumber} to stop.`);
      return;
    }

    try {
      if (!audio.paused) { // Only try to fade if currently playing
        await this.fadeOutAudio(audio, fadeOutDuration);
      } else {
        // If already paused, just ensure it's reset
        audio.pause();
        audio.currentTime = 0;
      }
    } catch (err) {
      console.error(`Error stopping pad ${padNumber}:`, err);
    } finally {
      // Clear exclusive loop tracker if this was the sound
      if (this.currentlyPlayingExclusiveLoop === padNumber) {
        this.currentlyPlayingExclusiveLoop = null;
      }
      // Do NOT clear ambientAudioRef or audioRefs[padNumber] if it's the ambient sound here,
      // as we want to keep it ready for quick restarts.
    }
  }

  /**
   * Stops all currently playing sounds, optionally with a fade-out.
   * @param {number} fadeOutDuration - The duration of the fade-out in milliseconds.
   * @returns {Promise<void>} A promise that resolves when all sounds are stopped.
   */
  async stopAllSounds(fadeOutDuration = 2000) {
    console.log(`[AudioService] Stopping all sounds with fade duration: ${fadeOutDuration}ms`);
    const stopPromises = [];

    // Stop all interactive sounds
    Object.values(this.audioRefs).forEach(audio => {
      if (audio && !audio.paused) {
        stopPromises.push(this.fadeOutAudio(audio, fadeOutDuration));
      }
    });

    // Stop the ambient sound
    if (this.ambientAudioRef && !this.ambientAudioRef.paused) {
      stopPromises.push(this.fadeOutAudio(this.ambientAudioRef, fadeOutDuration));
    }

    await Promise.all(stopPromises);
    this.currentlyPlayingExclusiveLoop = null; // Clear the exclusive playing flag
    console.log('[AudioService] All sounds stopped.');
  }

  /**
   * Toggles the global mute state of the audio service.
   * @param {boolean} muted - True to mute, false to unmute.
   * @param {number} fadeOutDuration - The duration for fading out sounds when muting.
   * @returns {Promise<void>} A promise that resolves when the mute state is applied.
   */
  async toggleMute(muted, fadeOutDuration = 1500) {
    this.isMuted = muted;
    // Store the user's mute preference in localStorage
    localStorage.setItem("audioEnabled", String(!muted));

    console.log(`[AudioService] Global mute toggled to: ${muted}`);

    if (muted) {
      // If muting, fade out all currently playing sounds (ambient + interactive)
      await this.stopAllSounds(fadeOutDuration);
    } else {
      // If unmuting, start the ambient sound
      console.log(`[AudioService] Unmuting. Attempting to play ambient sound: ${this.ambientSoundPad}`);
      // Ensure ambient sound plays on unmute and loops
      await this.playAmbientSound(1.0, 1000); // 1-second fade-in
    }
  }

  /**
   * Plays the designated ambient background sound (pad 999).
   * This sound will loop and persist.
   * @param {number} volume - The target volume for the ambient sound.
   * @param {number} fadeInDuration - Duration for fade-in.
   * @returns {Promise<object|null>} Control object for the ambient sound.
   */
  async playAmbientSound(volume = 1.0, fadeInDuration = 1000) {
    if (this.isMuted) {
      console.log(`[AudioService] Ambient sound play skipped: Audio is muted.`);
      return null;
    }
    console.log(`[AudioService] Playing ambient sound (pad ${this.ambientSoundPad})`);

    // Ensure ambient audio element exists
    if (!this.ambientAudioRef) {
      this.ambientAudioRef = new Audio();
    }

    const url = await this.getAudioUrl(this.ambientSoundPad);
    if (this.ambientAudioRef.src !== url) {
      this.ambientAudioRef.src = url;
      await this.ambientAudioRef.load();
    }

    this.ambientAudioRef.loop = true; // Ambient sound always loops
    this.ambientAudioRef.volume = 0; // Start at 0 for fade-in

    if (this.ambientAudioRef.paused) {
      await this.fadeInAudio(this.ambientAudioRef, volume, fadeInDuration);
    } else {
      // If already playing, just adjust volume (e.g., if re-enabled after temporary mute without full stop)
      this.ambientAudioRef.volume = volume;
    }

    return {
      padNumber: this.ambientSoundPad,
      audio: this.ambientAudioRef,
      stop: (fadeOutDuration = 1500) => this.stopAmbientSound(fadeOutDuration)
    };
  }

  /**
   * Stops the designated ambient background sound (pad 999).
   * @param {number} fadeOutDuration - Duration for fade-out.
   * @returns {Promise<void>}
   */
  async stopAmbientSound(fadeOutDuration = 1500) {
    console.log(`[AudioService] Stopping ambient sound (pad ${this.ambientSoundPad})`);
    if (this.ambientAudioRef && !this.ambientAudioRef.paused) {
      await this.fadeOutAudio(this.ambientAudioRef, fadeOutDuration);
    } else {
      console.log(`[AudioService] Ambient sound not playing, no need to stop.`);
    }
  }


  /**
   * Preloads common sounds (pads 1-36) by fetching their URLs and caching them.
   * This improves performance for subsequent playback.
   */
  preloadCommonSounds() {
    // Only preload if the mapping is already built and we have data
    if (!this._categorizedData || Object.keys(this.elementToPadMapping).length === 0) {
      console.warn("[AudioService] Cannot preload sounds: categorizedData or elementToPadMapping is empty.");
      return;
    }

    const allPads = Array.from({ length: 36 }, (_, i) => String(i + 1));
    // Include the ambient sound pad in preloading
    if (!allPads.includes(this.ambientSoundPad)) {
      allPads.unshift(this.ambientSoundPad); // Preload ambient sound first
    }

    console.log("Preloading all sounds sequentially:", allPads);

    const loadNext = async (index) => {
      if (index >= allPads.length) {
        console.log("Finished preloading all sounds.");
        return;
      }
      const padNumber = allPads[index];
      try {
        await this.getAudioUrl(padNumber); // This caches the blob URL
        console.log(`[AudioService] Preloaded pad ${padNumber} (URL cached).`);
      } catch (e) {
        console.warn(`[AudioService] Failed to preload pad ${padNumber}:`, e);
      }
      // Use _addTimeout for tracking this sequential loading timeout
      this._addTimeout(setTimeout(() => loadNext(index + 1), 1000));
    };

    loadNext(0);
  }
}

// Create and export a singleton instance of AudioService
const audioService = new AudioService();
export default audioService;