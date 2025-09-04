// src/services/AudioService.js

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

class AudioService {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.cachedBuffers = {};
    this.activeSources = {};
    this.ambientAudioSource = null;
    this.currentlyPlayingExclusiveLoop = null;
    this.ambientSoundPad = "999";
    this.isMuted = localStorage.getItem("audioEnabled") === "false";
    this.elementToPadMapping = {};
    this.activeTimeouts = new Set();
    this._soundData = [];
  }

  _ensureContextIsRunning() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
      } catch (e) {
        console.error("[AudioService] Web Audio API is not supported.", e);
        return false;
      }
    }
    if (this.audioContext.state === 'suspended') this.audioContext.resume();
    return true;
  }

  // MODIFIED: `init` now accepts data directly.
  init(soundData) {
    if (!soundData || soundData.length === 0) {
      console.warn("[AudioService] init() called with no data.");
      return;
    }

    this._soundData = soundData;
    this.buildElementToPadMapping(this._soundData);
    
    const initAudio = () => {
      if (this._ensureContextIsRunning()) {
        this.preloadCommonSounds();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('keydown', initAudio);
      }
    };
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
  }

  buildElementToPadMapping(soundData) {
    if (!soundData || !Array.isArray(soundData)) return;
    this.elementToPadMapping = {}; // Reset mapping
    soundData.forEach(row => {
      if (row.id && row.Number) {
        const id = String(row.id).trim().toLowerCase();
        const padNumber = String(row.Number);
        this.elementToPadMapping[id] = padNumber;
        this.elementToPadMapping[id.replace(/-/g, '')] = padNumber;
        this.elementToPadMapping[id.replace(/-/g, ' ')] = padNumber;
      }
    });
    const spellingVariants = {
      'aluminium': 'aluminium', 'thallium': 'thallium', 'estrogen-pills': 'estrogen',
      'organicmatter': 'organicmatter', 'crude': 'crudeoil'
    };
    Object.entries(spellingVariants).forEach(([variant, standard]) => {
      if (this.elementToPadMapping[standard]) {
        this.elementToPadMapping[variant] = this.elementToPadMapping[standard];
      }
    });
  }

  _createAudioSource(audioBuffer, volume, fadeIn, fadeInDuration) {
    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    source.buffer = audioBuffer;
    source.loop = false;
    source.connect(gain).connect(this.masterGain);
    source.start(0);
    if (fadeIn) {
      this.fadeInAudio(gain, volume, fadeInDuration);
    } else {
      gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    }
    return { source, gain };
  }

  _scheduleOverlappingLoop(loopController) {
    if (loopController.stopped) return;
    const { audioBuffer, settings, padNumber } = loopController;

    const soundInfo = this._soundData.find(item => String(item.Number) === String(padNumber));
    const overlapTime = soundInfo && soundInfo.overlapDuration ? parseFloat(soundInfo.overlapDuration) : 1.0;
    const bufferDuration = audioBuffer.duration;
    
    if (overlapTime >= bufferDuration) {
      const timeoutId = setTimeout(() => {
        if (!loopController.stopped) this._scheduleOverlappingLoop(loopController);
        this._removeTimeout(timeoutId);
      }, bufferDuration * 1000);
      this._addTimeout(timeoutId);
      return;
    }
    
    const nextStartTime = bufferDuration - overlapTime;
    const timeoutId = setTimeout(() => {
      if (loopController.stopped) return;
      try {
        const { source: nextSource, gain: nextGain } = this._createAudioSource(audioBuffer, settings.volume, settings.fadeIn, settings.fadeInDuration);
        const oldSource = loopController.source;
        loopController.source = nextSource;
        loopController.gain = nextGain;
        const cleanupTimeoutId = setTimeout(() => {
          try { oldSource.stop(0); } catch (e) {}
          this._removeTimeout(cleanupTimeoutId);
        }, overlapTime * 1000);
        this._addTimeout(cleanupTimeoutId);
        this._scheduleOverlappingLoop(loopController);
      } catch (error) {
        console.error(`Error in overlapping loop for pad ${padNumber}:`, error);
      }
      this._removeTimeout(timeoutId);
    }, nextStartTime * 1000);
    this._addTimeout(timeoutId);
  }

  async playPadSound(padNumber, options = {}) {
    if (this.isMuted || !this._ensureContextIsRunning()) return null;
    const settings = { loop: false, volume: 1.0, fadeIn: true, fadeInDuration: 1000, ...options };

    if (padNumber !== this.ambientSoundPad) {
      if (this.currentlyPlayingExclusiveLoop && this.currentlyPlayingExclusiveLoop !== padNumber) {
        await this.stopPadSound(this.currentlyPlayingExclusiveLoop, 500);
      }
      this.currentlyPlayingExclusiveLoop = settings.loop ? padNumber : null;
    }

    try {
      const audioBuffer = await this._getAudioBuffer(padNumber);
      if (!audioBuffer) throw new Error("Failed to get audio buffer.");
      if (this.activeSources[padNumber]) await this.stopPadSound(padNumber, 50);

      const { source, gain } = this._createAudioSource(audioBuffer, settings.volume, settings.fadeIn, settings.fadeInDuration);
      const loopController = { source, gain, settings, audioBuffer, padNumber, isLooping: settings.loop, stopped: false };

      if (padNumber === this.ambientSoundPad) {
        this.ambientAudioSource = loopController;
      } else {
        this.activeSources[padNumber] = loopController;
      }

      if (settings.loop) this._scheduleOverlappingLoop(loopController);
      return { stop: (fadeOutDuration) => this.stopPadSound(padNumber, fadeOutDuration) };
    } catch (err) {
      console.error(`Error playing pad ${padNumber}:`, err);
      return null;
    }
  }

  playElementSound(elementId, options = {}) {
    if (this.isMuted || !elementId) return null;
    const padNumber = this.elementToPadMapping[String(elementId).toLowerCase().replace(/\s+/g, '')];
    if (!padNumber) {
      return null;
    }
    return this.playPadSound(padNumber, options);
  }

  async _getAudioBuffer(padNumber) {
    if (this.cachedBuffers[padNumber]) return this.cachedBuffers[padNumber];
    if (!this.audioContext) return null;

    fetch(`${API_URL}/play_pad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pad: padNumber }),
    }).catch(err => {});

    try {
      const response = await fetch(`/sounds/${padNumber}.mp3`);
      if (!response.ok) throw new Error(`Failed to fetch local sound for pad ${padNumber}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.cachedBuffers[padNumber] = audioBuffer;
      return audioBuffer;
    } catch (err) {
      return null;
    }
  }

  // --- Other helper functions (stopPadSound, stopAllSounds, etc.) remain the same ---

  dispose() {
    Object.values(this.activeSources).forEach(src => { if (src && src.source) src.source.stop(0); });
    if (this.ambientAudioSource && this.ambientAudioSource.source) { this.ambientAudioSource.source.stop(0); }
    this.activeSources = {};
    this.ambientAudioSource = null;
    this.cachedBuffers = {};
  }
  _addTimeout(id) { this.activeTimeouts.add(id); }
  _removeTimeout(id) { this.activeTimeouts.delete(id); }
  fadeInAudio(gainNode, targetVolume = 1.0, duration = 1000) {
    if (!gainNode || !this.audioContext) return;
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(targetVolume, now + duration / 1000);
  }
  fadeOutAudio(activeSound, duration = 2000) {
    return new Promise(resolve => {
        if (!activeSound || !activeSound.source || !this.audioContext) return resolve();
        const { source, gain } = activeSound;
        const now = this.audioContext.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
        const timeoutId = setTimeout(() => {
            source.stop(0);
            this._removeTimeout(timeoutId);
            resolve();
        }, duration);
        this._addTimeout(timeoutId);
    });
  }
  stopElementSound(elementId, fadeOutDuration = 2500) {
    if (!elementId) return Promise.resolve();
    const padNumber = this.elementToPadMapping[String(elementId).toLowerCase().replace(/\s+/g, '')];
    if (!padNumber) return Promise.resolve();
    return this.stopPadSound(padNumber, fadeOutDuration);
  }
  async stopPadSound(padNumber, fadeOutDuration = 2000) {
    const loopController = (padNumber === this.ambientSoundPad) ? this.ambientAudioSource : this.activeSources[padNumber];
    if (this.currentlyPlayingExclusiveLoop === padNumber) this.currentlyPlayingExclusiveLoop = null;
    if (padNumber === this.ambientSoundPad) { this.ambientAudioSource = null; } else { delete this.activeSources[padNumber]; }
    if (loopController) {
      loopController.stopped = true;
      if (loopController.source && loopController.gain) {
        await this.fadeOutAudio({ source: loopController.source, gain: loopController.gain }, fadeOutDuration);
      }
    }
  }
  async stopAllSounds(fadeOutDuration = 2000) {
    const stopPromises = Object.keys(this.activeSources).map(padNumber => this.stopPadSound(padNumber, fadeOutDuration));
    if (this.ambientAudioSource) {
      stopPromises.push(this.stopPadSound(this.ambientSoundPad, fadeOutDuration));
    }
    await Promise.all(stopPromises);
    this.currentlyPlayingExclusiveLoop = null;
  }
  async toggleMute(muted, fadeOutDuration = 1500) {
    this.isMuted = muted;
    localStorage.setItem("audioEnabled", String(!muted));
    if (muted) {
      await this.stopAllSounds(fadeOutDuration);
    } else if (this._ensureContextIsRunning()) {
      await this.playAmbientSound(1.0, 1000);
    }
  }
  async playAmbientSound(volume = 1.0, fadeInDuration = 1000) {
    if (this.isMuted || this.ambientAudioSource) return null;
    return this.playPadSound(this.ambientSoundPad, { loop: true, volume, fadeInDuration });
  }
  async stopAmbientSound(fadeOutDuration = 1500) {
    await this.stopPadSound(this.ambientSoundPad, fadeOutDuration);
  }
  preloadCommonSounds() {
    if (!this._soundData || this._soundData.length === 0 || !this.audioContext) return;
    const allPads = this._soundData.map(item => item.Number).filter(Boolean);
    let index = 0;
    const loadNext = async () => {
        if (index >= allPads.length) { return; }
        const padNumber = allPads[index];
        try { await this._getAudioBuffer(padNumber); } catch (e) {}
        index++;
        setTimeout(loadNext, 100);
    };
    loadNext();
  }
  resetAllAudioState() {
    this.stopAllSounds(500);
    this.activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.activeTimeouts.clear();
    this.currentlyPlayingExclusiveLoop = null;
    this.isMuted = false;
    localStorage.setItem("audioEnabled", "true");
    this.dispose();
  }
}

const audioService = new AudioService();
export default audioService;
