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

  // Play sound by element ID (for SVG hover)
  playElementSound(elementId, options = {}) {
    if (!elementId) return;

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
      console.log(`Converting ${lookupId} to standard spelling: ${standardSpelling}`);
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
              console.log(`Using standard spelling mapping: ${standard} (Pad ${padNumber})`);
            }
          });
        }
      }
    }

    if (!padNumber) {
      console.warn(`No pad mapping found for element: ${elementId}`);
      console.log("Available elements:", Object.keys(this.elementToPadMapping).slice(0, 20));
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
    const commonPads = Array.from({ length: 30 }, (_, i) => String(i + 1));
    
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