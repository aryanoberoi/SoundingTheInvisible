// src/services/AudioService.js

// Define the API URL for your backend
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

class AudioService {
  constructor() {
    // --- WEB AUDIO API SETUP ---
    // The core of the Web Audio API, remains null until first user interaction.
    this.audioContext = null;
    // Master volume control. All sounds route through this node.
    this.masterGain = null;
    // Stores decoded AudioBuffer objects to avoid re-fetching and re-decoding.
    this.cachedBuffers = {};
    // Stores active playback instances { source: AudioBufferSourceNode, gain: GainNode }.
    this.activeSources = {};
    // Reference for the ambient audio's active source and gain nodes.
    this.ambientAudioSource = null;
    // --- END WEB AUDIO API SETUP ---

    // Stores the padNumber of the currently looping sound that is *exclusive*.
    this.currentlyPlayingExclusiveLoop = null;
    // Stores the padNumber of the persistent ambient background sound.
    this.ambientSoundPad = "999";

    // Global mute state, initialized based on localStorage if available.
    this.isMuted = localStorage.getItem("audioEnabled") === "false";
    // Maps SVG element IDs to pad numbers. RETAINED on reset.
    this.elementToPadMapping = {};

    // Sets to keep track of active timeouts for proper cleanup (used for post-fade stop actions).
    this.activeTimeouts = new Set();
    this._categorizedData = null;
  }

  /**
   * Initializes the AudioContext after a user interaction (e.g., a click).
   * This is required by modern browsers' autoplay policies.
   */
  _ensureContextIsRunning() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        console.log("[AudioService] AudioContext created and initialized.");
      } catch (e) {
        console.error("[AudioService] Web Audio API is not supported in this browser.", e);
        return false;
      }
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      console.log("[AudioService] AudioContext resumed from suspended state.");
    }
    return true;
  }

  /**
   * Initializes the AudioService with application data.
   * @param {Array} categorizedData - The data containing pollutant/plant IDs and pad numbers.
   */
  init(categorizedData) {
    if (!categorizedData || !Array.isArray(categorizedData) || categorizedData.length === 0) {
      console.warn("[AudioService] init called with invalid or empty data. Skipping mapping build.");
      return;
    }
    console.log("[AudioService] Initializing service with data.");
    this._categorizedData = categorizedData;
    this.buildElementToPadMapping(categorizedData);
    
    // Set up a one-time event listener to initialize the AudioContext on first user gesture.
    const initAudio = () => {
      if (this._ensureContextIsRunning()) {
        console.log("[AudioService] Audio engine ready. Preloading common sounds.");
        this.preloadCommonSounds();
        // Remove the listeners after they've done their job.
        document.removeEventListener('click', initAudio);
        document.removeEventListener('keydown', initAudio);
      }
    };
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
  }

  /**
   * Resets the entire audio playback state of the service.
   */
  resetAllAudioState() {
    console.log('[AudioService] Performing full audio state reset...');
    this.stopAllSounds(500); // Stop all sounds with a quick fade.

    // Clear all pending timeouts to prevent ghost operations.
    this.activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.activeTimeouts.clear();

    this.currentlyPlayingExclusiveLoop = null;
    this.isMuted = false;
    localStorage.setItem("audioEnabled", "true");

    this.dispose();
    console.log('[AudioService] Audio state reset complete. Element mapping retained.');
  }

  /**
   * Cleans up all active audio resources.
   */
  dispose() {
    console.log('[AudioService] Disposing audio resources...');
    // Stop all currently playing sources immediately.
    Object.values(this.activeSources).forEach(src => {
      if (src && src.source) {
        src.source.stop(0);
      }
    });
    if (this.ambientAudioSource && this.ambientAudioSource.source) {
        this.ambientAudioSource.source.stop(0);
    }

    this.activeSources = {};
    this.ambientAudioSource = null;
    // Clears the decoded audio data.
    this.cachedBuffers = {};
  }
  
  // --- Timeout tracking helpers for robust cleanup ---
  _addTimeout(id) { this.activeTimeouts.add(id); }
  _removeTimeout(id) { this.activeTimeouts.delete(id); }

  /**
   * Builds a mapping from element IDs to pad numbers. (No changes from original)
   */
  buildElementToPadMapping(categorizedData) {
    if (!categorizedData || !Array.isArray(categorizedData)) return;
    const spellingVariants = {
      'aluminum': 'aluminium', 'thalium': 'thallium', 'estrogen-pills': 'estrogen',
      'organic-matter': 'organicmatter', 'crude': 'crudeoil'
    };
    categorizedData.forEach(row => {
      if (row.id && row.Number) {
        const id = row.id.trim().toLowerCase();
        const padNumber = String(row.Number);
        this.elementToPadMapping[id] = padNumber;
        this.elementToPadMapping[id.replace(/-/g, '')] = padNumber;
        this.elementToPadMapping[id.replace(/-/g, ' ')] = padNumber;
      }
    });
    Object.entries(spellingVariants).forEach(([variant, standard]) => {
      if (this.elementToPadMapping[standard]) {
        this.elementToPadMapping[variant] = this.elementToPadMapping[standard];
      }
    });
    console.log("Element to pad mapping built with entries:", Object.keys(this.elementToPadMapping).length);
  }

  /**
   * Fades in an audio source using Web Audio API's precise scheduling.
   * @param {GainNode} gainNode - The GainNode controlling the sound's volume.
   * @param {number} targetVolume - The target volume (0.0 to 1.0).
   * @param {number} duration - The fade duration in milliseconds.
   */
  fadeInAudio(gainNode, targetVolume = 1.0, duration = 1000) {
    if (!gainNode || !this.audioContext) return;
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.001, now); // Start at near-zero volume
    gainNode.gain.exponentialRampToValueAtTime(targetVolume, now + duration / 1000);
  }

  /**
   * Fades out an audio source and stops it.
   * @param {string} padNumber - The pad number of the sound to stop.
   * @param {number} duration - The fade duration in milliseconds.
   * @returns {Promise<void>}
   */
  fadeOutAudio(padNumber, duration = 2000) {
      return new Promise(resolve => {
          const activeSound = (padNumber === this.ambientSoundPad)
              ? this.ambientAudioSource
              : this.activeSources[padNumber];

          if (!activeSound || !activeSound.source || !this.audioContext) {
              return resolve();
          }

          const { source, gain } = activeSound;
          const now = this.audioContext.currentTime;
          
          // Gently cancel any future gain changes and set current value
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          
          // Ramp down to a value that is effectively silent
          gain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);

          // Schedule the source to stop after the fade completes
          const timeoutId = setTimeout(() => {
              source.stop(0);
              // Clean up reference
              if (padNumber === this.ambientSoundPad) {
                  this.ambientAudioSource = null;
              } else {
                  delete this.activeSources[padNumber];
              }
              this._removeTimeout(timeoutId);
              resolve();
          }, duration);
          this._addTimeout(timeoutId);
      });
  }

  /**
   * Plays a sound for a given element ID. The public interface is unchanged.
   */
  playElementSound(elementId, options = {}) {
    if (this.isMuted) return null;
    if (!elementId) {
      console.warn("[AudioService] No elementId provided.");
      return null;
    }
    
    // Normalize and look up the pad number (logic unchanged)
    let lookupId = elementId.toLowerCase().replace(/\s+/g, '');
    const padNumber = this.elementToPadMapping[lookupId];
    
    if (!padNumber) {
      console.warn(`[AudioService] No pad mapping found for element: ${elementId}.`);
      return null;
    }

    console.log(`[AudioService] Playing sound for element: ${elementId} (Pad ${padNumber})`);
    return this.playPadSound(padNumber, options);
  }

  /**
   * Stops a sound for a given element ID. The public interface is unchanged.
   */
  stopElementSound(elementId, fadeOutDuration = 2500) {
    if (!elementId) return Promise.resolve();
    let lookupId = elementId.toLowerCase().replace(/\s+/g, '');
    const padNumber = this.elementToPadMapping[lookupId];
    if (!padNumber) {
      console.warn(`[AudioService] No pad mapping found to stop element: ${elementId}`);
      return Promise.resolve();
    }
    return this.stopPadSound(padNumber, fadeOutDuration);
  }

  /**
   * The core playback function, now using the Web Audio API.
   * @returns A control object (or null) with a `stop` method.
   */
  async playPadSound(padNumber, options = {}) {
    if (this.isMuted || !this._ensureContextIsRunning()) {
      return null;
    }
    
    const defaultOptions = { loop: false, volume: 1.0, fadeIn: true, fadeInDuration: 1000 };
    const settings = { ...defaultOptions, ...options };

    // --- Exclusive Loop Logic (Unchanged) ---
    if (padNumber !== this.ambientSoundPad) {
      if (this.currentlyPlayingExclusiveLoop && this.currentlyPlayingExclusiveLoop !== padNumber) {
        await this.stopPadSound(this.currentlyPlayingExclusiveLoop, 500);
      }
      this.currentlyPlayingExclusiveLoop = settings.loop ? padNumber : null;
    }

    try {
      const audioBuffer = await this._getAudioBuffer(padNumber);
      if (!audioBuffer) throw new Error("Failed to get audio buffer.");
      
      // Stop any existing sound on this pad before playing a new one.
      if (this.activeSources[padNumber]) {
        await this.stopPadSound(padNumber, 50);
      }

      // Create the node graph for this sound
      const source = this.audioContext.createBufferSource();
      const gain = this.audioContext.createGain();
      source.buffer = audioBuffer;
      source.loop = settings.loop;
      source.connect(gain).connect(this.masterGain);

      // Start playback and apply fade-in
      source.start(0);
      if (settings.fadeIn) {
        this.fadeInAudio(gain, settings.volume, settings.fadeInDuration);
      } else {
        gain.gain.setValueAtTime(settings.volume, this.audioContext.currentTime);
      }
      
      // Store the active source and gain nodes
      const activeSound = { source, gain };
      if (padNumber === this.ambientSoundPad) {
        this.ambientAudioSource = activeSound;
      } else {
        this.activeSources[padNumber] = activeSound;
      }
      
      // Return a control object with a working stop method
      return {
        stop: (fadeOutDuration) => this.stopPadSound(padNumber, fadeOutDuration)
      };

    } catch (err) {
      console.error(`Error playing pad ${padNumber}:`, err);
      return null;
    }
  }
  
  /**
   * Fetches and decodes an audio file into an AudioBuffer. Caches the result.
   * @returns {Promise<AudioBuffer|null>}
   */
  async _getAudioBuffer(padNumber) {
    if (this.cachedBuffers[padNumber]) {
      return this.cachedBuffers[padNumber];
    }
    if (!this.audioContext) {
        console.warn("Cannot fetch buffer, AudioContext is not initialized.");
        return null;
    }
    
    try {
      const response = await fetch(`${API_URL}/play_pad?pad=${padNumber}`);
      if (!response.ok) throw new Error(`Failed to fetch sound for pad ${padNumber}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.cachedBuffers[padNumber] = audioBuffer;
      return audioBuffer;
    } catch (err) {
      console.error(`Error fetching or decoding pad ${padNumber}:`, err);
      return null;
    }
  }

  /**
   * Stops a specific pad sound with a fade-out.
   */
  async stopPadSound(padNumber, fadeOutDuration = 2000) {
      await this.fadeOutAudio(padNumber, fadeOutDuration);
      if (this.currentlyPlayingExclusiveLoop === padNumber) {
        this.currentlyPlayingExclusiveLoop = null;
      }
  }

  /**
   * Stops all currently playing sounds.
   */
  async stopAllSounds(fadeOutDuration = 2000) {
    console.log(`[AudioService] Stopping all sounds...`);
    const stopPromises = [];
    
    // Stop all interactive sounds
    Object.keys(this.activeSources).forEach(padNumber => {
      stopPromises.push(this.stopPadSound(padNumber, fadeOutDuration));
    });

    // Stop the ambient sound
    if (this.ambientAudioSource) {
      stopPromises.push(this.stopPadSound(this.ambientSoundPad, fadeOutDuration));
    }

    await Promise.all(stopPromises);
    this.currentlyPlayingExclusiveLoop = null;
    console.log('[AudioService] All sounds stopped.');
  }

  /**
   * Toggles the global mute state.
   */
  async toggleMute(muted, fadeOutDuration = 1500) {
    this.isMuted = muted;
    localStorage.setItem("audioEnabled", String(!muted));
    console.log(`[AudioService] Global mute toggled to: ${muted}`);

    if (muted) {
      // Replicates original behavior by stopping all sounds
      await this.stopAllSounds(fadeOutDuration);
    } else {
      // On unmute, restart the ambient sound
      if (this._ensureContextIsRunning()) {
        await this.playAmbientSound(1.0, 1000);
      }
    }
  }
  
  /**
   * Plays the designated ambient background sound.
   */
  async playAmbientSound(volume = 1.0, fadeInDuration = 1000) {
    if (this.isMuted || this.ambientAudioSource) {
      // Don't play if muted or if it's already playing
      return null;
    }
    console.log(`[AudioService] Playing ambient sound (pad ${this.ambientSoundPad})`);
    return this.playPadSound(this.ambientSoundPad, {
      loop: true,
      volume: volume,
      fadeInDuration: fadeInDuration
    });
  }

  /**
   * Stops the designated ambient background sound.
   */
  async stopAmbientSound(fadeOutDuration = 1500) {
    console.log(`[AudioService] Stopping ambient sound.`);
    await this.stopPadSound(this.ambientSoundPad, fadeOutDuration);
  }

  /**
   * Preloads sounds by fetching and decoding them into the cache.
   */
  preloadCommonSounds() {
    if (!this._categorizedData || Object.keys(this.elementToPadMapping).length === 0 || !this.audioContext) {
      console.warn("[AudioService] Cannot preload sounds: context or mapping not ready.");
      return;
    }
    const allPads = Array.from({ length: 36 }, (_, i) => String(i + 1));
    allPads.unshift(this.ambientSoundPad); // Preload ambient sound too

    console.log("Starting sequential preloading of sounds...");
    
    let index = 0;
    const loadNext = async () => {
        if (index >= allPads.length) {
            console.log("Finished preloading all sounds.");
            return;
        }
        const padNumber = allPads[index];
        try {
            await this._getAudioBuffer(padNumber);
            console.log(`[AudioService] Preloaded pad ${padNumber}.`);
        } catch (e) {
            console.warn(`[AudioService] Failed to preload pad ${padNumber}:`, e);
        }
        index++;
        // Use a short, untracked timeout to prevent blocking the main thread
        setTimeout(loadNext, 100);
    };
    loadNext();
  }
}

const audioService = new AudioService();
export default audioService;