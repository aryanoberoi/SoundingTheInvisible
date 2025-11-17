# Audio System Documentation

Complete guide to the audio system in Sounding The Invisible, including the AudioService implementation, audio file management, and integration patterns.

## Table of Contents

- [Overview](#overview)
- [AudioService Architecture](#audioservice-architecture)
- [Audio File Structure](#audio-file-structure)
- [API Reference](#api-reference)
- [Integration Guide](#integration-guide)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Sounding The Invisible audio system transforms invisible water pollutants into audible experiences. Each pollutant has a unique audio signature that plays when users interact with the interface.

### Key Features

1. **Sonification**: Each pollutant has a unique sound (pad)
2. **Web Audio API**: Low-latency, high-quality audio processing
3. **Overlapping Loops**: Seamless looping without gaps
4. **Fade Effects**: Smooth fade-in and fade-out transitions
5. **Buffer Caching**: Optimized performance with audio caching
6. **Ambient Sound**: Continuous background soundscape
7. **Mute Persistence**: User preferences saved to localStorage

---

## AudioService Architecture

### Singleton Pattern

AudioService is implemented as a singleton to ensure consistent audio state across the entire application.

```javascript
// src/AudioService.js
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
}

const audioService = new AudioService();
export default audioService;
```

### Core Components

#### 1. AudioContext

The Web Audio API context for all audio processing:

```javascript
this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
```

**Features**:
- Native browser audio processing
- Low latency
- Advanced audio manipulation
- Cross-browser compatibility

#### 2. Master Gain Node

Controls overall volume for all audio:

```javascript
this.masterGain = this.audioContext.createGain();
this.masterGain.connect(this.audioContext.destination);
```

#### 3. Buffer Cache

Stores decoded audio data to prevent re-downloading:

```javascript
this.cachedBuffers = {
  "1": AudioBuffer,   // Pollutant 1 audio
  "2": AudioBuffer,   // Pollutant 2 audio
  // ...
  "999": AudioBuffer  // Ambient audio
};
```

#### 4. Active Sources

Tracks currently playing audio:

```javascript
this.activeSources = {
  "5": {
    source: AudioBufferSourceNode,
    gain: GainNode,
    settings: { volume, loop, fadeIn },
    audioBuffer: AudioBuffer,
    padNumber: "5",
    isLooping: true,
    stopped: false
  }
};
```

#### 5. Element-to-Pad Mapping

Maps element IDs to audio pad numbers:

```javascript
this.elementToPadMapping = {
  "lead": "1",
  "mercury": "2",
  "uranium": "3",
  "e-coli": "4",
  // ... etc
};
```

---

## Audio File Structure

### File Naming Convention

```
public/sounds/
├── 999.mp3        # Ambient background sound
├── 1.mp3          # Pollutant 1
├── 2.mp3          # Pollutant 2
├── 3.mp3          # Pollutant 3
├── ...
└── 50.mp3         # Pollutant 50
```

**Pad Number Assignment**:
- `999`: Ambient/background sound
- `1-50`: Individual pollutant sounds

### Audio Specifications

**Recommended Format**:
- **Format**: MP3
- **Bitrate**: 128-192 kbps
- **Sample Rate**: 44.1 kHz or 48 kHz
- **Channels**: Stereo or Mono
- **Duration**: 5-30 seconds (for loops)

**File Size Considerations**:
- Keep files under 1MB for faster loading
- Use appropriate bitrate for quality vs. size balance
- Consider compression for ambient sounds

---

## API Reference

### Initialization

#### `init(soundData)`

Initializes the audio service with sound mapping data.

**Parameters**:
- `soundData` (Array): Array of sound data objects from Google Sheets

**Example**:
```javascript
const soundData = [
  { id: "lead", Number: "1", ... },
  { id: "mercury", Number: "2", ... }
];

audioService.init(soundData);
```

**What it does**:
1. Stores sound data
2. Builds element-to-pad mapping
3. Sets up audio context on user interaction
4. Preloads common sounds

---

### Playback Methods

#### `playPadSound(padNumber, options)`

Plays audio for a specific pad number.

**Parameters**:
- `padNumber` (String): The pad/sound identifier
- `options` (Object):
  - `loop` (Boolean): Loop continuously (default: false)
  - `volume` (Number): Volume 0-1 (default: 1.0)
  - `fadeIn` (Boolean): Fade-in effect (default: true)
  - `fadeInDuration` (Number): Fade-in time in ms (default: 1000)

**Returns**: Object with `stop()` method or `null`

**Example**:
```javascript
const control = audioService.playPadSound("5", {
  loop: true,
  volume: 0.8,
  fadeIn: true,
  fadeInDuration: 2000
});

// Later, stop the sound
control.stop(1500); // 1.5 second fade-out
```

**Behavior**:
- If another exclusive loop is playing, it stops automatically
- Creates audio buffer source with gain node
- Applies fade-in effect if enabled
- Schedules overlapping loops for seamless playback

---

#### `playElementSound(elementId, options)`

Plays audio for an element by its ID.

**Parameters**:
- `elementId` (String): Element identifier (e.g., "lead", "mercury")
- `options` (Object): Same as `playPadSound`

**Returns**: Object with `stop()` method or `null`

**Example**:
```javascript
// Play lead pollutant sound on hover
audioService.playElementSound("lead", { 
  loop: true, 
  volume: 0.7 
});

// Stop on mouse leave
audioService.stopElementSound("lead", 2000);
```

**Mapping**:
```javascript
"lead" → "1" → /sounds/1.mp3
"mercury" → "2" → /sounds/2.mp3
```

---

#### `stopPadSound(padNumber, fadeOutDuration)`

Stops audio for a specific pad.

**Parameters**:
- `padNumber` (String): The pad/sound identifier
- `fadeOutDuration` (Number): Fade-out time in ms (default: 2000)

**Returns**: Promise

**Example**:
```javascript
await audioService.stopPadSound("5", 1500);
console.log("Audio stopped");
```

---

#### `stopElementSound(elementId, fadeOutDuration)`

Stops audio for an element by its ID.

**Parameters**:
- `elementId` (String): Element identifier
- `fadeOutDuration` (Number): Fade-out time in ms (default: 2500)

**Returns**: Promise

**Example**:
```javascript
await audioService.stopElementSound("lead", 2000);
```

---

#### `stopAllSounds(fadeOutDuration)`

Stops all currently playing audio.

**Parameters**:
- `fadeOutDuration` (Number): Fade-out time in ms (default: 2000)

**Returns**: Promise

**Example**:
```javascript
// Stop everything when navigating away
await audioService.stopAllSounds(1000);
```

---

### Ambient Audio

#### `playAmbientSound(volume, fadeInDuration)`

Plays the ambient background sound (pad 999).

**Parameters**:
- `volume` (Number): Volume 0-1 (default: 1.0)
- `fadeInDuration` (Number): Fade-in time in ms (default: 1000)

**Returns**: Object with `stop()` method or `null`

**Example**:
```javascript
// Start ambient sound on page load
audioService.playAmbientSound(0.5, 2000);
```

---

#### `stopAmbientSound(fadeOutDuration)`

Stops the ambient background sound.

**Parameters**:
- `fadeOutDuration` (Number): Fade-out time in ms (default: 1500)

**Returns**: Promise

**Example**:
```javascript
await audioService.stopAmbientSound(1500);
```

---

### Mute Control

#### `toggleMute(muted, fadeOutDuration)`

Toggles global mute state.

**Parameters**:
- `muted` (Boolean): New mute state (true = muted)
- `fadeOutDuration` (Number): Fade-out time when muting (default: 1500)

**Returns**: Promise

**Example**:
```javascript
// Mute all audio
await audioService.toggleMute(true, 1000);

// Unmute and start ambient
await audioService.toggleMute(false);
```

**Persistence**:
Mute state is saved to `localStorage` as `"audioEnabled"`.

---

### Utility Methods

#### `preloadCommonSounds()`

Preloads all audio files in background.

**Example**:
```javascript
audioService.preloadCommonSounds();
```

**Behavior**:
- Loads audio files sequentially with 100ms delays
- Caches buffers for instant playback
- Runs automatically after user interaction

---

#### `dispose()`

Cleans up all audio resources.

**Example**:
```javascript
// Cleanup on component unmount
audioService.dispose();
```

**What it does**:
- Stops all active audio sources
- Clears cached buffers
- Resets state

---

#### `resetAllAudioState()`

Resets audio service to initial state.

**Example**:
```javascript
audioService.resetAllAudioState();
```

**What it does**:
- Stops all sounds
- Clears timeouts
- Unmutes audio
- Resets localStorage

---

## Integration Guide

### Basic Integration

#### 1. Import AudioService

```javascript
import audioService from './AudioService';
```

#### 2. Play Sound on Hover

```javascript
const MyComponent = () => {
  const handleMouseEnter = () => {
    audioService.playElementSound("lead", { loop: true, volume: 0.7 });
  };

  const handleMouseLeave = () => {
    audioService.stopElementSound("lead", 1500);
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Lead Pollutant
    </div>
  );
};
```

---

### Advanced Integration

#### Interactive SVG with Audio

```javascript
const InteractiveSVG = () => {
  const handleElementHover = (elementId) => {
    audioService.playElementSound(elementId, {
      loop: true,
      volume: 0.8,
      fadeIn: true,
      fadeInDuration: 1000
    });
  };

  const handleElementLeave = (elementId) => {
    audioService.stopElementSound(elementId, 2000);
  };

  return (
    <svg>
      <g 
        data-element="lead"
        onMouseEnter={() => handleElementHover("lead")}
        onMouseLeave={() => handleElementLeave("lead")}
      >
        {/* SVG content */}
      </g>
    </svg>
  );
};
```

---

#### Mute Toggle Button

```javascript
const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(
    audioService.isMuted
  );

  const toggleMute = async () => {
    const newMutedState = !isMuted;
    await audioService.toggleMute(newMutedState);
    setIsMuted(newMutedState);
  };

  return (
    <button onClick={toggleMute}>
      {isMuted ? "🔇 Unmute" : "🔊 Mute"}
    </button>
  );
};
```

---

## Advanced Features

### Overlapping Loop System

For seamless looping without gaps, AudioService uses an overlapping loop technique.

**How it Works**:

1. **First Source Plays**: Audio starts playing
2. **Schedule Next Source**: Before first source ends, schedule second source
3. **Overlap Period**: Both sources play simultaneously during overlap
4. **Crossfade**: First source fades out while second fades in
5. **Repeat**: Process continues indefinitely

**Configuration**:

Overlap duration is configured per-sound in Google Sheets:
```javascript
overlapDuration: 1.0  // 1 second overlap
```

**Code**:

```javascript
_scheduleOverlappingLoop(loopController) {
  const { audioBuffer, settings, padNumber } = loopController;
  const overlapTime = this.getOverlapTime(padNumber) || 1.0;
  const nextStartTime = audioBuffer.duration - overlapTime;

  setTimeout(() => {
    // Start next iteration
    const { source, gain } = this._createAudioSource(...);
    loopController.source = source;
    loopController.gain = gain;
    
    // Stop old source after overlap
    setTimeout(() => oldSource.stop(), overlapTime * 1000);
    
    // Schedule next loop
    this._scheduleOverlappingLoop(loopController);
  }, nextStartTime * 1000);
}
```

---

### Fade Effects

#### Fade-In

```javascript
fadeInAudio(gainNode, targetVolume = 1.0, duration = 1000) {
  const now = this.audioContext.currentTime;
  gainNode.gain.setValueAtTime(0.001, now);
  gainNode.gain.exponentialRampToValueAtTime(
    targetVolume, 
    now + duration / 1000
  );
}
```

**Uses**:
- Start playing audio smoothly
- Avoid sudden loud sounds
- Better user experience

#### Fade-Out

```javascript
fadeOutAudio(activeSound, duration = 2000) {
  return new Promise(resolve => {
    const { source, gain } = activeSound;
    const now = this.audioContext.currentTime;
    
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001, 
      now + duration / 1000
    );
    
    setTimeout(() => {
      source.stop();
      resolve();
    }, duration);
  });
}
```

**Uses**:
- Stop audio gracefully
- Prevent audio clicks/pops
- Smooth transitions

---

### Exclusive Loop Management

Only one exclusive loop (pollutant sound) can play at a time.

**Behavior**:
```javascript
// Playing new exclusive loop stops previous one
audioService.playPadSound("1", { loop: true });  // Starts playing
audioService.playPadSound("2", { loop: true });  // Stops "1", starts "2"
```

**Ambient Exception**:
- Ambient sound (pad 999) can play alongside exclusive loops
- Ambient is not considered an exclusive loop

---

### Backend Analytics (Optional)

AudioService can send analytics to a backend server:

```javascript
fetch(`${API_URL}/play_pad`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pad: padNumber }),
});
```

**Environment Variable**:
```bash
REACT_APP_API_URL=http://localhost:6000
```

**Endpoint**:
- Method: POST
- URL: `/play_pad`
- Body: `{ "pad": "5" }`

**Use Cases**:
- Track which pollutants are most explored
- Analyze user engagement
- Monitor audio playback issues

---

## Troubleshooting

### Audio Won't Play

**Issue**: No sound when clicking/hovering

**Checks**:
1. **Browser Requirement**: User must interact with page first
   ```javascript
   // AudioService waits for user interaction
   document.addEventListener('click', initAudio, { once: true });
   ```

2. **Check Mute State**:
   ```javascript
   console.log("Is muted?", audioService.isMuted);
   ```

3. **Verify Audio Files Exist**:
   ```bash
   # Check public/sounds/ directory
   ls public/sounds/
   ```

4. **Check Browser Console**:
   - Look for 404 errors (missing audio files)
   - Check for Web Audio API errors

5. **Browser Support**:
   - Ensure Web Audio API is supported
   ```javascript
   if (!window.AudioContext && !window.webkitAudioContext) {
     console.error("Web Audio API not supported");
   }
   ```

---

### Audio Clicks/Pops

**Issue**: Clicking or popping sounds when audio starts/stops

**Solutions**:

1. **Use Fade Effects**:
   ```javascript
   // Always use fade-in and fade-out
   audioService.playPadSound("1", { fadeIn: true, fadeInDuration: 1000 });
   audioService.stopPadSound("1", 1000);
   ```

2. **Check Overlap Duration**:
   - Ensure overlap is long enough (1-2 seconds)

3. **Avoid Abrupt Stops**:
   ```javascript
   // Bad: Immediate stop
   source.stop();
   
   // Good: Faded stop
   audioService.stopPadSound("1", 1500);
   ```

---

### Memory Leaks

**Issue**: Audio memory increases over time

**Solutions**:

1. **Stop Audio When Done**:
   ```javascript
   useEffect(() => {
     audioService.playElementSound("lead", { loop: true });
     
     return () => {
       audioService.stopElementSound("lead");
     };
   }, []);
   ```

2. **Clean Up on Unmount**:
   ```javascript
   useEffect(() => {
     return () => {
       audioService.dispose();
     };
   }, []);
   ```

3. **Clear Timeouts**:
   AudioService automatically tracks and clears timeouts

---

### Audio Out of Sync

**Issue**: Looping audio has gaps or overlaps incorrectly

**Solutions**:

1. **Check Audio File Duration**:
   - Ensure files are clean loops
   - No silence at start/end

2. **Adjust Overlap Duration**:
   ```javascript
   // In Google Sheets data
   overlapDuration: 1.5  // Try different values
   ```

3. **Check System Performance**:
   - Close other applications
   - Reduce browser tab count
   - Check CPU usage

---

### Cross-Browser Issues

**Issue**: Audio works in Chrome but not Safari/Firefox

**Solutions**:

1. **Use Compatible Audio Format**:
   - MP3 is widely supported
   - Consider providing multiple formats

2. **Check Autoplay Policies**:
   ```javascript
   // Safari requires user interaction
   audioContext.resume();
   ```

3. **Test in All Browsers**:
   - Chrome (recommended)
   - Firefox
   - Safari
   - Edge

---

## Best Practices

### 1. Always Use Fade Effects

```javascript
// Smooth audio experience
audioService.playPadSound("1", { 
  fadeIn: true, 
  fadeInDuration: 1000 
});

audioService.stopPadSound("1", 1500);
```

### 2. Clean Up on Component Unmount

```javascript
useEffect(() => {
  audioService.playElementSound("lead", { loop: true });
  
  return () => {
    audioService.stopElementSound("lead", 1000);
  };
}, []);
```

### 3. Respect User Preferences

```javascript
// Check mute state before playing
if (!audioService.isMuted) {
  audioService.playElementSound("lead");
}
```

### 4. Preload Audio for Better UX

```javascript
// Preload on app init
audioService.preloadCommonSounds();
```

### 5. Handle Errors Gracefully

```javascript
try {
  await audioService.playPadSound("1");
} catch (error) {
  console.error("Audio playback failed:", error);
  // Show user-friendly message
}
```

---

## Performance Tips

1. **Limit Simultaneous Sounds**: Don't play too many sounds at once
2. **Use Appropriate Bitrates**: Balance quality and file size
3. **Preload Strategically**: Preload common sounds, lazy-load others
4. **Clean Up**: Always stop and dispose audio when not needed
5. **Monitor Memory**: Use browser dev tools to check audio memory usage

---

*Last Updated: November 2025*

