// src/services/AudioService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

class AudioService {
  constructor() {
    this.audioRefs = {};
    this.currentlyPlaying = null;
    this.isMuted = false;
    this.elementToPadMapping = {};
    this.cachedUrls = {};
  }

  // Initialize with application data
  init(categorizedData) {
    this.buildElementToPadMapping(categorizedData);
    this.preloadCommonSounds();
  }

  // Create mapping from element IDs to pad numbers
  buildElementToPadMapping(categorizedData) {
    if (!categorizedData || !Array.isArray(categorizedData)) {
      console.warn("Invalid data format for building element mapping");
      return;
    }

    // Add known spelling variations map
    const spellingVariants = {
      'aluminum': 'aluminium',  // US vs UK spelling
      'thalium': 'thallium',    // Common misspelling
      'estrogen-pills': 'estrogen', // Specific compound form
      'organic-matter': 'organicmatter', // Hyphenated vs spaced
      'crude': 'crudeoil'
    };

    // Create mappings from the data
    categorizedData.forEach(row => {
      if (row.id && row.Number) {
        const id = row.id.trim();
        const padNumber = String(row.Number);

        // Store multiple variations of the ID to improve matching
        // 1. Original ID (lowercase)
        this.elementToPadMapping[id.toLowerCase()] = padNumber;

        // 2. ID with hyphens removed
        this.elementToPadMapping[id.toLowerCase().replace(/-/g, '')] = padNumber;

        // 3. ID with hyphens replaced by spaces
        this.elementToPadMapping[id.toLowerCase().replace(/-/g, ' ')] = padNumber;

        // 4. ID with spaces removed
        this.elementToPadMapping[id.toLowerCase().replace(/\s+/g, '')] = padNumber;

        // 5. Pollutant name variations if available
        if (row.Pollutantname_split) {
          const pollutantName = row.Pollutantname_split.trim().toLowerCase();
          this.elementToPadMapping[pollutantName] = padNumber;
          this.elementToPadMapping[pollutantName.replace(/\s+/g, '-')] = padNumber;
          this.elementToPadMapping[pollutantName.replace(/\s+/g, '')] = padNumber;
        }
      }
    });

    // Handle plant names separately
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
      // If we have a mapping for the standard spelling, add the variant
      if (this.elementToPadMapping[standard]) {
        this.elementToPadMapping[variant] = this.elementToPadMapping[standard];
        console.log(`Added spelling variant mapping: ${variant} → ${standard} (Pad ${this.elementToPadMapping[standard]})`);
      }
    });

    console.log("Element to pad mapping built with entries:", Object.keys(this.elementToPadMapping).length);
    console.log("Sample mappings:", Object.fromEntries(
      Object.entries(this.elementToPadMapping).slice(0, 10)
    ));
  }

  setupAutoFadeAtEnd(padNumber, fadeOutDuration = 2500) {
    console.log(`[AudioService] Setting up auto-fade at end for pad ${padNumber}`);
    
    if (!this.audioRefs[padNumber]) {
      console.warn(`[AudioService] Cannot setup auto-fade: No audio playing for pad ${padNumber}`);
      return;
    }
    
    const audio = this.audioRefs[padNumber];
    
    // First, check if we already have an ended listener and remove it
    if (audio._endedListener) {
      audio.removeEventListener('ended', audio._endedListener);
    }
    
    // Calculate time remaining before audio would naturally end
    const timeRemaining = (audio.duration - audio.currentTime) * 1000; // in ms
    
    console.log(`[AudioService] Audio for pad ${padNumber}: ${timeRemaining.toFixed(0)}ms remaining`);
    
    // If the audio is near its end already, don't bother setting up the fade
    if (timeRemaining <= fadeOutDuration) {
      console.log(`[AudioService] Audio almost complete, letting it finish naturally`);
      return;
    }
    
    // Calculate when to start the fade-out (timeRemaining - fadeOutDuration)
    const fadeStartDelay = Math.max(0, timeRemaining - fadeOutDuration);
    
    console.log(`[AudioService] Will start fade in ${fadeStartDelay.toFixed(0)}ms, fade duration: ${fadeOutDuration}ms`);
    
    // Set a timeout to fade out the audio before it ends
    if (audio._fadeTimeout) {
      clearTimeout(audio._fadeTimeout);
    }
    
    audio._fadeTimeout = setTimeout(() => {
      console.log(`[AudioService] Starting auto-fade for pad ${padNumber}`);
      this.fadeOutAudio(audio, fadeOutDuration).then(() => {
        console.log(`[AudioService] Auto-fade complete for pad ${padNumber}`);
      });
    }, fadeStartDelay);
    
    // Also set up a safety cleanup in case the ended event fires
    audio._endedListener = () => {
      console.log(`[AudioService] Audio ended naturally for pad ${padNumber}`);
      if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
      }
    };
    
    audio.addEventListener('ended', audio._endedListener);
    
    return {
      cancel: () => {
        console.log(`[AudioService] Cancelling auto-fade for pad ${padNumber}`);
        if (audio._fadeTimeout) {
          clearTimeout(audio._fadeTimeout);
          audio._fadeTimeout = null;
        }
        if (audio._endedListener) {
          audio.removeEventListener('ended', audio._endedListener);
          audio._endedListener = null;
        }
      }
    };
  }

  fadeInAudio(audio, targetVolume = 1.0, duration = 1000) {
    return new Promise(resolve => {
      if (!audio || audio.ended || targetVolume === 0) {
        resolve();
        return;
      }
      
      // Start with volume at 0
      audio.volume = 0;
      
      // Play the audio
      const playPromise = audio.play();
      
      // Handle play promise (required for modern browsers)
      playPromise.then(() => {
        const fadeSteps = 60;
        const intervalTime = duration / fadeSteps;
        const startTime = Date.now();
        
        const fadeInterval = setInterval(() => {
          // Calculate fade progress with exponential curve for natural sound
          const elapsedTime = Date.now() - startTime;
          const fadeProgress = Math.min(elapsedTime / duration, 1);
          
          // Use quadratic curve for natural fade-in
          audio.volume = targetVolume * Math.pow(fadeProgress, 2);
          
          if (fadeProgress >= 1 || audio.volume >= targetVolume - 0.01) {
            audio.volume = targetVolume;
            clearInterval(fadeInterval);
            resolve();
          }
        }, intervalTime);
      }).catch(err => {
        console.error("Error starting audio playback:", err);
        resolve();
      });
    });
  }

  // Play sound by element ID (for SVG hover)
  playElementSound(elementId, options = {}) {
    console.log(`[AudioService] playElementSound called for: ${elementId} with options:`, options);
    
    if (!elementId) {
      console.warn("[AudioService] No elementId provided to playElementSound");
      return;
    }

    // Default fade options
    const defaultOptions = {
      loop: false,
      volume: 1.0,
      stopOnMouseLeave: false,
      fadeIn: true,
      fadeInDuration: 1000,
      fadeOutDuration: 2500  // Longer fade-out duration
    };
    
    const settings = { ...defaultOptions, ...options };
    console.log(`[AudioService] Final settings for ${elementId}:`, settings);

    // Known spelling variations map - adding here too for redundancy
    const spellingVariants = {
      'aluminum': 'aluminium',
      'thalium': 'thallium',
      'estrogen-pills': 'estrogen',
      'organic-matter': 'organicmatter',
      'vallisneria': 'vallisneria spiralis',
      'crude': 'crudeoil'
    };

    // Convert to lowercase for consistent lookup
    let lookupId = elementId.toLowerCase();

    // Check if this is a known variant and replace with standard spelling
    if (spellingVariants[lookupId]) {
      const standardSpelling = spellingVariants[lookupId];
      console.log(`[AudioService] Converting ${lookupId} to standard spelling: ${standardSpelling}`);
      lookupId = standardSpelling;
    }

    // Try direct lookup first
    let padNumber = this.elementToPadMapping[lookupId];

    if (!padNumber) {
      // Try variations
      const withoutHyphens = lookupId.replace(/-/g, '');
      padNumber = this.elementToPadMapping[withoutHyphens];

      if (!padNumber) {
        const withSpaces = lookupId.replace(/-/g, ' ');
        padNumber = this.elementToPadMapping[withSpaces];

        if (!padNumber) {
          // For elements like "aluminum" that should be "aluminium"
          Object.entries(spellingVariants).forEach(([variant, standard]) => {
            if (lookupId === variant && this.elementToPadMapping[standard]) {
              padNumber = this.elementToPadMapping[standard];
              console.log(`[AudioService] Using standard spelling mapping: ${standard} (Pad ${padNumber})`);
            }
          });
        }
      }
    }

    if (!padNumber) {
      console.warn(`[AudioService] No pad mapping found for element: ${elementId}`);
      console.log("[AudioService] Available elements:", Object.keys(this.elementToPadMapping).slice(0, 20));
      return;
    }

    console.log(`[AudioService] Playing sound for element: ${elementId} (Pad ${padNumber})`);
    return this.playPadSound(padNumber, settings);
  }

  // Stop sound for specific element
  stopElementSound(elementId, fadeOutDuration = 2500) {
    console.log(`[AudioService] stopElementSound called for: ${elementId} with fadeOutDuration: ${fadeOutDuration}ms`);
    
    if (!elementId) {
      console.warn("[AudioService] No elementId provided to stopElementSound");
      return;
    }
    
    const lookupId = elementId.toLowerCase();
    const padNumber = this.elementToPadMapping[lookupId];
    
    if (!padNumber) {
      console.warn(`[AudioService] No pad mapping found for element: ${elementId}`);
      return;
    }
    
    console.log(`[AudioService] Stopping sound for element: ${elementId} (Pad ${padNumber}) with fade: ${fadeOutDuration}ms`);
    return this.stopPadSound(padNumber, fadeOutDuration);
  }

  // Add this debugging function to the AudioService class
  async debugAudioFile(padNumber) {
    try {
      // Get the audio URL
      const url = await this.getAudioUrl(padNumber);
      
      // Create a temporary audio element for analysis
      const tempAudio = new Audio(url);
      
      // Wait for metadata to load
      await new Promise(resolve => {
        tempAudio.addEventListener('loadedmetadata', resolve);
        tempAudio.addEventListener('error', (e) => {
          console.error(`Error loading audio metadata: ${e}`);
          resolve();
        });
        // Set a timeout in case metadata never loads
        setTimeout(resolve, 3000);
      });
      
      // Log audio details
      console.log(`----- AUDIO DEBUG: Pad ${padNumber} -----`);
      console.log(`Duration: ${tempAudio.duration} seconds`);
      console.log(`Default playback rate: ${tempAudio.defaultPlaybackRate}`);
      console.log(`Can play through: ${tempAudio.preload}`);
      console.log(`Ready state: ${tempAudio.readyState}`);
      
      // Check if audio is too short for our fade duration
      if (tempAudio.duration < 2.5) {
        console.warn(`⚠️ ISSUE DETECTED: Audio for pad ${padNumber} is only ${tempAudio.duration.toFixed(2)} seconds long, which is shorter than our fade duration (2.5s)`);
        return {
          isTooShort: true,
          duration: tempAudio.duration,
          recommendation: "Adjust fade duration to be shorter than audio length"
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

  // Replace the existing fadeOutAudio function with this enhanced version
  fadeOutAudio(audio, duration = 2000) {
    return new Promise(resolve => {
      if (!audio || audio.paused || audio.volume === 0) {
        console.log("Fade skipped: Audio already stopped or volume at 0");
        resolve();
        return;
      }
      
      // DEBUG: Log initial state
      console.log(`Starting fade out - Duration: ${audio.duration}s, Current time: ${audio.currentTime.toFixed(2)}s, Remaining: ${(audio.duration - audio.currentTime).toFixed(2)}s`);
      
      // Check if audio will end before fade completes
      const timeRemaining = audio.duration - audio.currentTime;
      if (timeRemaining < duration/1000) {
        console.warn(`⚠️ FADE ISSUE: Audio will end naturally in ${timeRemaining.toFixed(2)}s, before ${duration/1000}s fade completes!`);
        
        // Adjust fade duration to match remaining time
        duration = timeRemaining * 1000 * 0.95; // 95% of remaining time
        console.log(`Adjusted fade duration to ${duration.toFixed(0)}ms`);
      }
      
      const originalVolume = audio.volume;
      const fadeSteps = 60;
      const intervalTime = duration / fadeSteps;
      const startTime = Date.now();
      let lastLogTime = 0;
      
      // Create an onended handler to catch if audio ends during fade
      const handleEnded = () => {
        console.log("Audio ended naturally during fade out");
        clearInterval(fadeInterval);
        audio.removeEventListener('ended', handleEnded);
        audio.volume = originalVolume; // Reset volume for future plays
        resolve();
      };
      
      audio.addEventListener('ended', handleEnded);
      
      const fadeInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const fadeProgress = Math.min(elapsedTime / duration, 1);
        
        // Exponential curve for more natural audio fade
        audio.volume = originalVolume * Math.pow(1 - fadeProgress, 2);
        
        // Log progress every 500ms to avoid console spam
        if (Date.now() - lastLogTime > 500) {
          console.log(`Fade progress: ${Math.round(fadeProgress * 100)}%, Volume: ${audio.volume.toFixed(2)}, Time: ${audio.currentTime.toFixed(2)}/${audio.duration.toFixed(2)}s`);
          lastLogTime = Date.now();
        }
        
        if (fadeProgress >= 1 || audio.volume < 0.01) {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          audio.volume = originalVolume;
          audio.removeEventListener('ended', handleEnded);
          clearInterval(fadeInterval);
          console.log("Fade out complete");
          resolve();
        }
      }, intervalTime);
    });
  }

  // Core function to play a pad sound (used by both hover and SoundToggle)
  playPadSound(padNumber, options = {}, sendPostRequest = false) {
    if (this.isMuted) return null;
    
    const defaultOptions = {
      loop: false,
      volume: 1.0,
      stopOnMouseLeave: false,
      fadeIn: true,
      fadeInDuration: 1000,
      fadeOutDuration: 2500
    };
    
    const settings = { ...defaultOptions, ...options };
    
    // Create a control object immediately that will handle the async operations internally
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
    
    // Start the async process
    (async () => {
      try {
        // Stop current sound if it's the same pad being replayed
        if (this.audioRefs[padNumber]) {
          await this.stopPadSound(padNumber);
        }
        
        // Get audio URL (cached or fresh)
        const url = await this.getAudioUrl(padNumber, sendPostRequest);
        
        // Create or update Audio object
        if (!this.audioRefs[padNumber]) {
          this.audioRefs[padNumber] = new Audio(url);
        } else {
          this.audioRefs[padNumber].src = url;
        }
        
        // Configure audio properties
        this.audioRefs[padNumber].loop = settings.loop;
        
        // Play with or without fade
        if (settings.fadeIn) {
          await this.fadeInAudio(this.audioRefs[padNumber], settings.volume, settings.fadeInDuration);
        } else {
          this.audioRefs[padNumber].volume = settings.volume;
          await this.audioRefs[padNumber].play();
        }
        
        // Track currently playing looping sound for global control
        if (settings.loop) {
          this.currentlyPlaying = padNumber;
        }
        
        // Update the control object with the audio reference
        control.audio = this.audioRefs[padNumber];
        control.isReady = true;
        
        console.log(`[AudioService] Audio control for pad ${padNumber} is now ready`);
      } catch (err) {
        console.error(`Error playing pad ${padNumber}:`, err);
      }
    })();
    
    return control;
  }

  // Get audio URL with caching
  async getAudioUrl(padNumber, sendPostRequest = false) {
    try {
      if (sendPostRequest) {
        // Send a POST request
        const postResponse = await fetch(`${API_URL}/post_pad`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pad: padNumber }),
        });
  
        if (!postResponse.ok) {
          throw new Error(`Failed to send POST request for pad ${padNumber}`);
        }
        console.log(`POST request sent for pad ${padNumber}`);
      }
  
      // Send a GET request
      const response = await fetch(`${API_URL}/play_pad?pad=${padNumber}`);
      if (!response.ok) throw new Error(`Failed to fetch sound for pad ${padNumber}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;  // Return fresh URL every time without caching
    } catch (err) {
      console.error(`Error fetching pad ${padNumber}:`, err);
      throw err;
    }
  }

  // Stop a specific pad sound
  async stopPadSound(padNumber, fadeOutDuration = 2000) {
    if (!this.audioRefs[padNumber]) return;
    
    try {
      await this.fadeOutAudio(this.audioRefs[padNumber], fadeOutDuration);
      
      // Clear currently playing reference if it's this pad
      if (this.currentlyPlaying === padNumber) {
        this.currentlyPlaying = null;
      }
    } catch (err) {
      console.error(`Error stopping pad ${padNumber}:`, err);
    }
  }

  // Stop all sounds
  async stopAllSounds(fadeOutDuration = 2000) {
    const stopPromises = Object.keys(this.audioRefs).map(padNumber => 
      this.stopPadSound(padNumber, fadeOutDuration)
    );
    
    await Promise.all(stopPromises);
    this.currentlyPlaying = null;
  }

  // Toggle global mute state
  async toggleMute(muted, fadeOutDuration = 1500) {
    this.isMuted = muted;
    
    if (muted) {
      // Fade out all currently playing sounds
      const fadePromises = Object.values(this.audioRefs).map(audio => {
        if (!audio.paused) {
          return this.fadeOutAudio(audio, fadeOutDuration);
        }
        return Promise.resolve();
      });
      await Promise.all(fadePromises);
    } else if (this.currentlyPlaying) {
      // Resume current looping sound if there is one
      this.playPadSound(this.currentlyPlaying, { loop: true });
    }
  }

  // Preload common sounds for better performance
  preloadCommonSounds() {
    // Preload all 36 pads, one at a time, waiting for each to finish before starting the next
    const allPads = Array.from({ length: 36 }, (_, i) => String(i + 1));
    console.log("Preloading all sounds sequentially:", allPads);

    const loadNext = async (index) => {
      if (index >= allPads.length) {
        console.log("Finished preloading all sounds.");
        return;
      }
      const padNumber = allPads[index];
      try {
        await this.getAudioUrl(padNumber);
        console.log(`[AudioService] Preloaded pad ${padNumber}`);
      } catch (e) {
        // Silently fail preloading - will retry when actually needed
        console.warn(`[AudioService] Failed to preload pad ${padNumber}`);
      }
      // Wait 1 second before loading the next pad
      setTimeout(() => loadNext(index + 1), 1000);
    };

    loadNext(0);
  }

  // Clean up resources
  dispose() {
    this.stopAllSounds();
    
    // Revoke any blob URLs to prevent memory leaks
    Object.values(this.cachedUrls).forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    
    this.cachedUrls = {};
    this.audioRefs = {};
  }
}

// Create singleton instance
const audioService = new AudioService();
export default audioService;