# API Reference

Complete API documentation for Sounding The Invisible.

## Table of Contents

- [AudioService API](#audioservice-api)
- [Google Sheets API](#google-sheets-api)
- [Component Props API](#component-props-api)
- [Utility Functions](#utility-functions)
- [Hooks](#hooks)
- [Constants](#constants)

---

## AudioService API

The AudioService is a singleton class managing all audio functionality.

### Import

```javascript
import audioService from './AudioService';
```

---

### Methods

#### `init(soundData)`

Initializes the audio service with sound mapping data.

**Parameters**:
- `soundData` (Array): Array of sound data objects from Google Sheets

**Returns**: `void`

**Example**:
```javascript
const soundData = [
  { id: "lead", Number: "1", overlapDuration: "1.0" },
  { id: "mercury", Number: "2", overlapDuration: "1.5" }
];

audioService.init(soundData);
```

---

#### `playPadSound(padNumber, options)`

Plays audio for a specific pad number.

**Parameters**:
- `padNumber` (String): The pad/sound identifier (e.g., "1", "2", "999")
- `options` (Object): Optional configuration
  - `loop` (Boolean): Whether to loop continuously (default: `false`)
  - `volume` (Number): Volume level 0-1 (default: `1.0`)
  - `fadeIn` (Boolean): Apply fade-in effect (default: `true`)
  - `fadeInDuration` (Number): Fade-in time in milliseconds (default: `1000`)

**Returns**: `Object|null` - Control object with `stop()` method, or `null` if muted/failed

**Example**:
```javascript
const control = audioService.playPadSound("5", {
  loop: true,
  volume: 0.8,
  fadeIn: true,
  fadeInDuration: 2000
});

// Stop later
if (control) {
  control.stop(1500); // 1.5 second fade-out
}
```

---

#### `playElementSound(elementId, options)`

Plays audio for an element by its ID.

**Parameters**:
- `elementId` (String): Element identifier (e.g., "lead", "mercury", "e-coli")
- `options` (Object): Same as `playPadSound()`

**Returns**: `Object|null` - Control object or `null`

**Example**:
```javascript
// Play on hover
const handleMouseEnter = () => {
  audioService.playElementSound("lead", { 
    loop: true, 
    volume: 0.7,
    fadeIn: true,
    fadeInDuration: 1000
  });
};

// Stop on leave
const handleMouseLeave = () => {
  audioService.stopElementSound("lead", 2000);
};
```

---

#### `stopPadSound(padNumber, fadeOutDuration)`

Stops audio for a specific pad.

**Parameters**:
- `padNumber` (String): The pad/sound identifier
- `fadeOutDuration` (Number): Fade-out time in milliseconds (default: `2000`)

**Returns**: `Promise<void>`

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
- `fadeOutDuration` (Number): Fade-out time in milliseconds (default: `2500`)

**Returns**: `Promise<void>`

**Example**:
```javascript
await audioService.stopElementSound("lead", 2000);
```

---

#### `stopAllSounds(fadeOutDuration)`

Stops all currently playing audio.

**Parameters**:
- `fadeOutDuration` (Number): Fade-out time in milliseconds (default: `2000`)

**Returns**: `Promise<void>`

**Example**:
```javascript
// When leaving page or changing route
await audioService.stopAllSounds(1000);
```

---

#### `playAmbientSound(volume, fadeInDuration)`

Plays the ambient background sound (pad 999).

**Parameters**:
- `volume` (Number): Volume level 0-1 (default: `1.0`)
- `fadeInDuration` (Number): Fade-in time in milliseconds (default: `1000`)

**Returns**: `Object|null` - Control object or `null`

**Example**:
```javascript
// Start ambient on page load
useEffect(() => {
  audioService.playAmbientSound(0.5, 2000);
  
  return () => {
    audioService.stopAmbientSound(1500);
  };
}, []);
```

---

#### `stopAmbientSound(fadeOutDuration)`

Stops the ambient background sound.

**Parameters**:
- `fadeOutDuration` (Number): Fade-out time in milliseconds (default: `1500`)

**Returns**: `Promise<void>`

**Example**:
```javascript
await audioService.stopAmbientSound(1500);
```

---

#### `toggleMute(muted, fadeOutDuration)`

Toggles global mute state.

**Parameters**:
- `muted` (Boolean): New mute state (`true` = muted, `false` = unmuted)
- `fadeOutDuration` (Number): Fade-out time when muting (default: `1500`)

**Returns**: `Promise<void>`

**Side Effects**:
- Updates `audioService.isMuted`
- Saves state to localStorage as `"audioEnabled"`
- If unmuting, starts ambient sound

**Example**:
```javascript
const [isMuted, setIsMuted] = useState(audioService.isMuted);

const handleToggle = async () => {
  const newState = !isMuted;
  await audioService.toggleMute(newState, 1000);
  setIsMuted(newState);
};
```

---

#### `preloadCommonSounds()`

Preloads all audio files in the background.

**Parameters**: None

**Returns**: `void`

**Example**:
```javascript
// Call after user interaction
useEffect(() => {
  const handleFirstInteraction = () => {
    audioService.preloadCommonSounds();
    document.removeEventListener('click', handleFirstInteraction);
  };
  
  document.addEventListener('click', handleFirstInteraction, { once: true });
}, []);
```

---

#### `dispose()`

Cleans up all audio resources.

**Parameters**: None

**Returns**: `void`

**Example**:
```javascript
// On component unmount
useEffect(() => {
  return () => {
    audioService.dispose();
  };
}, []);
```

---

#### `resetAllAudioState()`

Resets audio service to initial state.

**Parameters**: None

**Returns**: `void`

**Side Effects**:
- Stops all sounds
- Clears timeouts
- Unmutes audio
- Resets localStorage

**Example**:
```javascript
// Reset everything
audioService.resetAllAudioState();
```

---

#### `fadeInAudio(gainNode, targetVolume, duration)`

Applies fade-in effect to a gain node.

**Parameters**:
- `gainNode` (GainNode): Web Audio API gain node
- `targetVolume` (Number): Target volume 0-1 (default: `1.0`)
- `duration` (Number): Duration in milliseconds (default: `1000`)

**Returns**: `void`

**Note**: Internal method, typically not called directly

---

#### `fadeOutAudio(activeSound, duration)`

Applies fade-out effect and stops audio.

**Parameters**:
- `activeSound` (Object): Active sound object with `source` and `gain`
- `duration` (Number): Duration in milliseconds (default: `2000`)

**Returns**: `Promise<void>`

**Note**: Internal method, typically not called directly

---

### Properties

#### `isMuted`

**Type**: `Boolean`

**Description**: Current global mute state

**Example**:
```javascript
if (!audioService.isMuted) {
  console.log("Audio is active");
}
```

---

#### `audioContext`

**Type**: `AudioContext|null`

**Description**: Web Audio API context

**Note**: Read-only, managed internally

---

#### `cachedBuffers`

**Type**: `Object`

**Description**: Cache of decoded audio buffers

**Structure**:
```javascript
{
  "1": AudioBuffer,
  "2": AudioBuffer,
  ...
  "999": AudioBuffer
}
```

**Note**: Read-only, managed internally

---

#### `activeSources`

**Type**: `Object`

**Description**: Currently playing audio sources

**Note**: Read-only, managed internally

---

## Google Sheets API

### Data Sources

#### Homepage Content

**URL**: `https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1`

**Method**: `GET`

**Response**:
```javascript
[
  {
    "Title_1": "Section 1 Title",
    "Para_1": "Paragraph 1",
    "Para_2": "Paragraph 2",
    "Title_2": "Section 2 Title",
    ...
  }
]
```

**Example**:
```javascript
const fetchHomepageContent = async () => {
  const response = await fetch(
    "https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1"
  );
  const data = await response.json();
  return data[0]; // First row contains all content
};
```

---

#### Pollutant Data

**URL**: `https://docs.google.com/spreadsheets/d/1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs/gviz/tq?tqx=out:json&sheet=Sheet1`

**Method**: `GET`

**Response**: JSONP format (needs parsing)

**Example**:
```javascript
const fetchPollutantData = async () => {
  const sheetId = "1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs";
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
  
  const response = await fetch(url);
  const text = await response.text();
  
  // Remove JSONP wrapper
  const json = JSON.parse(text.substr(47).slice(0, -2));
  
  // Convert to array of objects
  const rows = json.table.rows.map(row => {
    const obj = {};
    json.table.cols.forEach((col, i) => {
      obj[col.label] = row.c[i]?.v || "";
    });
    return obj;
  });
  
  return rows;
};
```

---

### Data Categorization

**Function**: Categorize rows by unique ID

**Example**:
```javascript
const categorizeData = (rows) => {
  return rows.reduce((acc, row) => {
    const key = row.id || row.unique_id || row.Number;
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
};

// Result:
// {
//   "lead": [{ ...row data }],
//   "mercury": [{ ...row data }],
//   ...
// }
```

---

## Component Props API

### App

**Props**: None (root component)

**Context Provided**:
- `categorizedData`: Pollutant and plant data

---

### Homepage

**Props**:
- `categorizedData` (Object): Categorized data (optional, fetches own)

**Example**:
```javascript
<Homepage categorizedData={dataByCategory} />
```

---

### PollutantPage

**Props**:
- `categorizedData` (Object): Required. Categorized data from App

**Route Params**:
- `customName` (String): URL parameter for pollutant

**Example**:
```javascript
<PollutantPage categorizedData={dataByCategory} key={location.pathname} />
```

---

### SoundToggle

**Props**:
- `padNumber` (String): Audio pad to control (default: `"999"`)
- `isInTrapezium` (Boolean): Visual mode flag
- `panelMode` (String): Theme mode (`"black"` or `"white"`)
- `defaultActive` (Boolean): Initial audio state

**Example**:
```javascript
<SoundToggle 
  padNumber="999" 
  isInTrapezium={false}
  panelMode="white"
  defaultActive={true}
/>
```

---

### Cloud

**Props**:
- `top` (Number): Vertical position in pixels or percent
- `left` (Number): Horizontal position in pixels or percent
- `distance` (String): Parallax distance (`"short"`, `"medium"`, `"long"`)
- `direction` (String): Movement direction (`"left"` or `"right"`)
- `variant` (Number): Cloud style (1, 2, or 3)

**Example**:
```javascript
<Cloud 
  top={-60} 
  left={45} 
  distance="short" 
  direction="left" 
  variant={1} 
/>
```

---

### Box (Health Effects)

**Props**:
- `sections` (Array): Array of health effect sections
- `pollutantName` (String): Name of the pollutant

**Section Structure**:
```javascript
sections: [
  { text: "System_Description" },
  ...
]
```

**Example**:
```javascript
<Box 
  sections={[
    { text: "Nervous System_Lead causes..." },
    { text: "Cardiovascular_Affects..." }
  ]} 
  pollutantName="Lead" 
/>
```

---

### Phyto

**Props**:
- `sections` (Array): Array of phytoremediation species
- `pollutantName` (String): Name of the pollutant

**Section Structure**:
```javascript
sections: [
  {
    medium: "SpeciesName_Medium",
    timePeriod: "SpeciesName_TimePeriod",
    remediation: "SpeciesName_Percentage"
  },
  ...
]
```

**Example**:
```javascript
<Phyto 
  sections={[
    {
      medium: "Sunflower_Soil",
      timePeriod: "Sunflower_3-6 months",
      remediation: "Sunflower_60-80%"
    }
  ]} 
  pollutantName="Mercury" 
/>
```

---

## Utility Functions

### `renderWithLineBreaks(text)`

Converts `\\n` and actual newlines to HTML `<br/>` tags.

**Parameters**:
- `text` (String): Text with line breaks

**Returns**: `String` - HTML-safe text with `<br/>` tags

**Example**:
```javascript
const text = "First line\\nSecond line";
const html = renderWithLineBreaks(text);
// Result: "First line<br/>Second line"

<p dangerouslySetInnerHTML={{ __html: html }} />
```

---

### `inspectScrollableElements()`

Logs all scrollable elements (debugging utility).

**Parameters**: None

**Returns**: `Array` - Array of scrollable elements

**Example**:
```javascript
import { inspectScrollableElements } from './ScrollFix';

useEffect(() => {
  inspectScrollableElements();
}, []);
```

---

## Hooks

### Custom Hook: useAudioControl

**Usage**:
```javascript
const useAudioControl = (elementId, options = {}) => {
  useEffect(() => {
    audioService.playElementSound(elementId, options);
    
    return () => {
      audioService.stopElementSound(elementId);
    };
  }, [elementId]);
};

// In component
useAudioControl("lead", { loop: true, volume: 0.8 });
```

---

## Constants

### Audio Configuration

```javascript
// Default ambient sound pad
const AMBIENT_SOUND_PAD = "999";

// Default fade durations (ms)
const DEFAULT_FADE_IN_DURATION = 1000;
const DEFAULT_FADE_OUT_DURATION = 2000;

// Default volume
const DEFAULT_VOLUME = 1.0;

// API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";
```

---

### Route Paths

```javascript
const ROUTES = {
  HOME: "/",
  POLLUTANT: "/:customName",
  PLAYTEST: "/playtest"
};
```

---

### Google Sheets IDs

```javascript
const GOOGLE_SHEETS = {
  HOMEPAGE_CONTENT: "1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4",
  POLLUTANT_DATA: "1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs"
};
```

---

## Error Handling

### AudioService Errors

```javascript
try {
  await audioService.playPadSound("1");
} catch (error) {
  console.error("Audio playback failed:", error);
  // Handle error (e.g., show user message)
}
```

### Data Fetch Errors

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error("Failed to fetch data:", error);
  // Fallback or retry logic
}
```

---

## TypeScript Definitions (Future)

Example type definitions for TypeScript users:

```typescript
interface AudioOptions {
  loop?: boolean;
  volume?: number;
  fadeIn?: boolean;
  fadeInDuration?: number;
}

interface AudioControl {
  stop: (fadeOutDuration?: number) => void;
}

interface SoundData {
  id: string;
  Number: string;
  overlapDuration?: string;
}

class AudioService {
  init(soundData: SoundData[]): void;
  playPadSound(padNumber: string, options?: AudioOptions): AudioControl | null;
  playElementSound(elementId: string, options?: AudioOptions): AudioControl | null;
  stopPadSound(padNumber: string, fadeOutDuration?: number): Promise<void>;
  stopAllSounds(fadeOutDuration?: number): Promise<void>;
  toggleMute(muted: boolean, fadeOutDuration?: number): Promise<void>;
  // ... other methods
}
```

---

## Code Examples

### Complete Integration Example

```javascript
import React, { useEffect, useState } from 'react';
import audioService from './AudioService';

const PollutantCard = ({ pollutant }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isHovered) {
      audioService.playElementSound(pollutant.id, {
        loop: true,
        volume: 0.7,
        fadeIn: true,
        fadeInDuration: 1000
      });
    } else {
      audioService.stopElementSound(pollutant.id, 1500);
    }
  }, [isHovered, pollutant.id]);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pollutant-card"
    >
      <h3>{pollutant.name}</h3>
      <p>{pollutant.description}</p>
    </div>
  );
};

export default PollutantCard;
```

---

*Last Updated: November 2025*

