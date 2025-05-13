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
    if (!categorizedData) return;
    
    // Flatten the categorized data and extract id -> Number mapping
    const allPollutants = Object.values(categorizedData).flat();
    
    allPollutants.forEach(row => {
      if (row.id && row.Number) {
        // Store lowercase for case-insensitive matching
        this.elementToPadMapping[row.id.trim().toLowerCase()] = String(row.Number);
      }
    });
    
    console.log("Element to pad mapping loaded:", Object.keys(this.elementToPadMapping).length, "items");
  }

  // Play sound by element ID (for SVG hover)
  playElementSound(elementId, options = {}) {
    if (!elementId) return;
    
    // Convert to lowercase for consistent lookup
    const lookupId = elementId.toLowerCase();
    const padNumber = this.elementToPadMapping[lookupId];
    
    if (!padNumber) {
      console.warn(`No pad mapping found for element: ${elementId}`);
      return;
    }
    
    console.log(`Playing sound for element: ${elementId} (Pad ${padNumber})`);
    return this.playPadSound(padNumber, options);
  }

  // Stop sound for specific element
  stopElementSound(elementId) {
    if (!elementId) return;
    
    const lookupId = elementId.toLowerCase();
    const padNumber = this.elementToPadMapping[lookupId];
    
    if (!padNumber) return;
    
    this.stopPadSound(padNumber);
  }

  // Core function to play a pad sound (used by both hover and SoundToggle)
  async playPadSound(padNumber, options = {}) {
    if (this.isMuted) return;
    
    const defaultOptions = {
      loop: false,
      volume: 1.0,
      stopOnMouseLeave: false
    };
    
    const settings = { ...defaultOptions, ...options };
    
    try {
      // Stop current sound if it's the same pad being replayed
      if (this.audioRefs[padNumber]) {
        this.audioRefs[padNumber].pause();
        this.audioRefs[padNumber].currentTime = 0;
      }
      
      // Get audio URL (cached or fresh)
      const url = await this.getAudioUrl(padNumber);
      
      // Create or update Audio object
      if (!this.audioRefs[padNumber]) {
        this.audioRefs[padNumber] = new Audio(url);
      } else {
        this.audioRefs[padNumber].src = url;
      }
      
      // Configure audio properties
      this.audioRefs[padNumber].loop = settings.loop;
      this.audioRefs[padNumber].volume = settings.volume;
      
      // Play the sound
      await this.audioRefs[padNumber].play();
      
      // Track currently playing looping sound for global control
      if (settings.loop) {
        this.currentlyPlaying = padNumber;
      }
      
      // Return control object for external management
      return {
        padNumber,
        stop: () => this.stopPadSound(padNumber),
        audio: this.audioRefs[padNumber]
      };
    } catch (err) {
      console.error(`Error playing pad ${padNumber}:`, err);
    }
  }

  // Get audio URL with caching
  async getAudioUrl(padNumber) {
    // Return cached URL if available
    if (this.cachedUrls[padNumber]) {
      return this.cachedUrls[padNumber];
    }
    
    // Fetch new audio from API
    try {
      const response = await fetch(`${API_URL}/play_pad?pad=${padNumber}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sound for pad ${padNumber}`);
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Cache the URL for future use
      this.cachedUrls[padNumber] = url;
      
      return url;
    } catch (err) {
      console.error(`Error fetching pad ${padNumber}:`, err);
      throw err;
    }
  }

  // Stop a specific pad sound
  stopPadSound(padNumber) {
    if (!this.audioRefs[padNumber]) return;
    
    try {
      this.audioRefs[padNumber].pause();
      this.audioRefs[padNumber].currentTime = 0;
      
      // Clear currently playing reference if it's this pad
      if (this.currentlyPlaying === padNumber) {
        this.currentlyPlaying = null;
      }
    } catch (err) {
      console.error(`Error stopping pad ${padNumber}:`, err);
    }
  }

  // Stop all sounds
  stopAllSounds() {
    Object.keys(this.audioRefs).forEach(padNumber => {
      this.stopPadSound(padNumber);
    });
    this.currentlyPlaying = null;
  }

  // Toggle global mute state
  toggleMute(muted) {
    this.isMuted = muted;
    
    if (muted) {
      // Pause all currently playing sounds
      Object.values(this.audioRefs).forEach(audio => {
        if (!audio.paused) {
          audio.pause();
        }
      });
    } else if (this.currentlyPlaying) {
      // Resume current looping sound if there is one
      this.playPadSound(this.currentlyPlaying, { loop: true });
    }
  }

  // Preload common sounds for better performance
  preloadCommonSounds() {
    // Preload first 10 pads (most common)
    const commonPads = Array.from({ length: 10 }, (_, i) => String(i + 1));
    
    console.log("Preloading common sounds:", commonPads);
    
    // Fetch URLs in background without awaiting
    commonPads.forEach(padNumber => {
      this.getAudioUrl(padNumber).catch(() => {
        // Silently fail preloading - will retry when actually needed
      });
    });
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