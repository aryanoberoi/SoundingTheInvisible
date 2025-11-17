# Architecture Overview

This document provides a comprehensive overview of the Sounding The Invisible application architecture, including the project structure, data flow, and key architectural decisions.

## Table of Contents

- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [Routing Architecture](#routing-architecture)
- [Data Management](#data-management)
- [Audio Architecture](#audio-architecture)
- [Component Hierarchy](#component-hierarchy)
- [State Management](#state-management)
- [Performance Optimizations](#performance-optimizations)

---

## Project Structure

```
SoundingTheInvisible/
├── build/                      # Production build output
├── docs/                       # Documentation files
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── AUDIO_SYSTEM.md
│   └── ...
├── fonts/                      # Custom font files
│   ├── ClashGrotesk-*
│   └── Nippo-*
├── node_modules/               # Dependencies
├── public/                     # Static assets
│   ├── sounds/                 # Audio files (999.mp3, 1.mp3, etc.)
│   ├── *.svg                   # Vector graphics
│   ├── *.png                   # Images
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   └── robots.txt
├── src/                        # Source code
│   ├── PollutantPage/          # Pollutant detail page components
│   │   ├── AboutPlant.js
│   │   ├── AboutPollutant.js
│   │   ├── Body.js
│   │   ├── CaseStudies.js
│   │   ├── LeftPanel.js
│   │   ├── RightPanel.js
│   │   ├── Phyto.js
│   │   ├── PhytoCapacity.js
│   │   ├── PlantHabitat.js
│   │   ├── SoundFrequency.js
│   │   └── *.css
│   ├── App.js                  # Main application component
│   ├── App.css
│   ├── Homepage.js             # Homepage component
│   ├── Homepage.css
│   ├── PollutantPage.js        # Pollutant detail page
│   ├── Navbar.js               # Navigation menu
│   ├── AudioService.js         # Audio management singleton
│   ├── AudioPopup.js           # Audio control popup
│   ├── SoundToggle.js          # Audio toggle button
│   ├── IsolatedCursor.js       # Custom cursor component
│   ├── ScrollFix.js            # Scroll behavior utilities
│   ├── ScrollToTop.js          # Scroll to top component
│   ├── Cloud.js                # Animated cloud component
│   ├── Footer.js               # Footer component
│   ├── frame.js                # Sound concept frame
│   ├── frame1.js               # Concept frame
│   ├── frame2.js               # Middle frame
│   ├── title.js                # Animated title
│   ├── PlayPads.js             # Audio testing component
│   ├── index.js                # Application entry point
│   ├── index.css               # Global styles
│   ├── clash-grotesk.css       # Font definitions
│   ├── nippo.css               # Font definitions
│   └── *.{js,css,png,svg}      # Other components and assets
├── .gitignore
├── LICENSE                     # Apache 2.0 License
├── package.json                # Dependencies and scripts
├── package-lock.json
└── README.md                   # Project overview
```

---

## Application Flow

### 1. Application Initialization

```
index.js
  ├─> React.render(<App />)
  └─> Mounts to #root in public/index.html
```

### 2. App Component Flow

```javascript
App.js (BrowserRouter wrapper)
  ├─> AppContent
  │   ├─> Fetch Google Sheets data
  │   ├─> Initialize AudioService with data
  │   ├─> Wait for page load
  │   ├─> Components:
  │   │   ├─> ScrollToTop (utility)
  │   │   ├─> IsolatedCursor (custom cursor)
  │   │   ├─> Navbar (navigation menu)
  │   │   └─> Routes:
  │   │       ├─> "/" → Homepage
  │   │       ├─> "/:customName" → PollutantPage
  │   │       └─> "/playtest" → PlayPads (testing)
  │   └─> Vercel Analytics
  └─> Google Analytics tracking
```

### 3. Data Flow

```
User Opens App
  ↓
App.js fetches data from Google Sheets
  ↓
Data is categorized and stored in state
  ↓
AudioService is initialized with sound mappings
  ↓
Data is passed to components via props
  ↓
Components render with dynamic content
```

---

## Routing Architecture

### Route Structure

| Route | Component | Purpose | Data Required |
|-------|-----------|---------|---------------|
| `/` | `Homepage` | Landing page with concept explanation | Homepage sheet data |
| `/:customName` | `PollutantPage` | Detailed pollutant & plant information | Pollutant sheet data |
| `/playtest` | `PlayPads` | Audio testing interface | Audio mapping data |

### Route Parameters

**Dynamic Route**: `/:customName`
- Matches pollutant URL-friendly names
- Examples: `/lead`, `/mercury`, `/uranium`, `/e-coli`
- Maps to `pollutantData.url_id` in Google Sheets

### Navigation Flow

```
User clicks in Navbar
  ↓
React Router changes route
  ↓
App.js detects route change (useEffect on location.pathname)
  ↓
Scroll position is reset to top
  ↓
Body scroll is locked temporarily
  ↓
New component mounts with categorized data
  ↓
Scroll is unlocked after 50ms
  ↓
Component renders with data for that route
```

### Scroll Management

The application implements sophisticated scroll management to ensure smooth transitions:

1. **Lock scroll** on route change (prevent jump)
2. **Force scroll to top** (multiple attempts if needed)
3. **Add/remove body classes** based on route
4. **Delay component render** for pollutant pages (1 second)
5. **Unlock scroll** after transition

---

## Data Management

### Google Sheets Integration

#### Sheet 1: Homepage Content

**URL**: `https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1`

**Structure**:
```javascript
{
  Title_1: "Concept section title",
  Para_1: "First paragraph",
  Para_2: "Expandable paragraph",
  Title_2: "Middle section title",
  Para_3: "Third paragraph",
  Para_4: "Expandable paragraph",
  Title_3: "Sound section title",
  Para_5: "Fifth paragraph",
  Para_6: "Expandable paragraph"
}
```

#### Sheet 2: Pollutant & Plant Data

**URL**: `https://docs.google.com/spreadsheets/d/1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs/gviz/tq?tqx=out:json&sheet=Sheet1`

**Key Fields**:
- `id` / `unique_id` / `Number`: Unique identifier
- `pollutantName_Split`: Display name for pollutant
- `url_id`: URL-friendly identifier
- `plantName_Split`: Display name for plant
- `plant_name`: Scientific (Latin) name
- `image_split_pollutant`: Pollutant image URL
- `image_split_plant`: Plant image URL
- Health effects fields: `HealthEffects_title1_content1`, etc.
- Phytoremediation fields: `Phyto_Species1_medium`, etc.
- Plant habitat fields: `PlantHabitat_temperature`, etc.
- Case study fields: `CaseStudies_*`
- Audio mapping: `Number` (corresponds to sound file)

### Data Processing

```javascript
// Fetching and parsing
const response = await fetch(googleSheetsUrl);
const text = await response.text();
const json = JSON.parse(text.substr(47).slice(0, -2)); // Remove JSONP wrapper

// Converting to objects
const rows = json.table.rows.map(row => {
  const obj = {};
  json.table.cols.forEach((col, i) => {
    obj[col.label] = row.c[i]?.v || "";
  });
  return obj;
});

// Categorizing by unique ID
const categorizedData = rows.reduce((acc, row) => {
  const key = row.id || row.unique_id || row.Number;
  if (!acc[key]) acc[key] = [];
  acc[key].push(row);
  return acc;
}, {});
```

### Data Flow to Components

```
App.js (fetches and categorizes)
  ↓
dataByCategory state
  ↓
Passed to routes as "categorizedData" prop
  ↓
Homepage / PollutantPage receive data
  ↓
Components extract relevant fields
  ↓
Render with processed data
```

---

## Audio Architecture

### AudioService Singleton

**Location**: `src/AudioService.js`

**Purpose**: Centralized audio management with Web Audio API

**Key Features**:
- Single instance managing all audio
- Buffer caching for performance
- Overlapping loop system for seamless playback
- Fade-in/fade-out effects
- Mute/unmute with localStorage persistence
- Element-to-pad mapping for easy triggering

### Audio File Structure

```
public/sounds/
  ├── 999.mp3        # Ambient/background sound
  ├── 1.mp3          # Pollutant sound 1
  ├── 2.mp3          # Pollutant sound 2
  ├── ...
  └── 50.mp3         # Pollutant sound 50
```

### Audio Flow

```
User interacts (hover/click on element)
  ↓
Component calls audioService.playElementSound(elementId)
  ↓
AudioService maps elementId to pad number
  ↓
AudioService fetches/caches audio buffer
  ↓
AudioService creates audio source with gain node
  ↓
Fade-in effect applied
  ↓
Audio plays through Web Audio API
  ↓
If looping, overlapping loop scheduled
  ↓
On user leave: fade-out and stop
```

### Ambient Audio

- **Pad Number**: 999
- **Behavior**: Loops continuously in background
- **Control**: SoundToggle component
- **Persistence**: Mute state saved in localStorage

---

## Component Hierarchy

### Top-Level Structure

```
App
├── ScrollToTop (utility component)
├── IsolatedCursor (custom cursor)
├── Navbar (hamburger menu)
└── Routes
    ├── Homepage
    │   ├── SoundToggle
    │   ├── Title
    │   ├── Cloud (multiple instances)
    │   ├── ConceptFrame (interactive SVG)
    │   ├── MiddleFrame (interactive SVG)
    │   ├── SoundConceptFrame (interactive SVG)
    │   └── Footer
    └── PollutantPage
        ├── SoundToggle
        ├── LeftPanel (desktop)
        ├── MobileLeftPanel (mobile)
        ├── RightPanel (desktop)
        ├── MobileRightPanel (mobile)
        ├── AboutPollutant
        ├── Box (health effects)
        ├── CaseStudies
        ├── Phyto (plants list)
        ├── AboutPlant
        ├── CommonNames
        ├── PlantHabitat
        ├── UsesOfPlant
        ├── PhytoCapacity
        └── SoundFrequency (sine wave)
```

### Component Communication

**Props Down**: Data flows from App → Pages → Sections → Elements

**Events Up**: User interactions bubble up or call global services

**Shared Services**: AudioService (singleton), accessed directly

---

## State Management

### Local State (useState)

Most components use React's built-in `useState` for local state:
- UI toggles (menu open/closed, expanded items)
- Form inputs
- Temporary display states

### Global State Patterns

1. **Audio State**: Managed by AudioService singleton
2. **Route Data**: Passed via React Router context
3. **Categorized Data**: Props from App.js to route components
4. **Scroll State**: Managed via body classes and refs

### State Persistence

- **Audio Mute Preference**: localStorage (`audioEnabled`)
- **No other persistence**: Fresh data on each page load

---

## Performance Optimizations

### 1. Code Splitting

- Automatic chunking by Create React App
- Route-based code splitting (each route is a separate chunk)

### 2. Audio Optimizations

```javascript
// Buffer caching
cachedBuffers = {} // Prevents re-downloading audio files

// Preloading common sounds
preloadCommonSounds() // Loads all audio in background with delays

// Efficient fade-in/out
exponentialRampToValueAtTime() // Native Web Audio API for smooth transitions
```

### 3. Image Optimizations

- Lazy loading: `loading="lazy"` on images
- SVG for icons and graphics (scalable, small file size)
- Optimized image formats (WebP where supported)

### 4. Rendering Optimizations

```javascript
// React.memo for expensive components
export const Box = React.memo(({ sections, pollutantName }) => { ... });

// useMemo for expensive calculations
const parsedSections = useMemo(
  () => sections.map((section) => parseSection(section.text)),
  [sections]
);

// useCallback for stable function references
const toggleItem = useCallback((item) => { ... }, []);
```

### 5. Scroll Performance

- `scroll-behavior: auto` for instant scrolling (no smooth scrolling overhead)
- Intersection Observer for detecting viewport elements
- Debounced scroll event handlers

### 6. Font Loading

- Multiple font formats (woff2, woff, ttf, eot) for browser compatibility
- Font preloading in CSS
- Fallback fonts to prevent FOIT (Flash of Invisible Text)

### 7. Build Optimizations

Production build includes:
- Minification (JavaScript and CSS)
- Tree shaking (unused code removal)
- Asset optimization
- Compression (gzip/brotli)
- Cache busting (hash-based filenames)

---

## Security Considerations

### 1. Content Security

- Google Sheets data is publicly accessible (read-only)
- No sensitive data stored in application
- API calls are to trusted domains only

### 2. XSS Prevention

- React's built-in XSS protection via JSX
- `dangerouslySetInnerHTML` used only for trusted Google Sheets content
- No `eval()` or dynamic script execution

### 3. CORS

- Audio files served from same origin
- Google Sheets API allows cross-origin requests
- Analytics scripts loaded from trusted CDNs

---

## Deployment Architecture

### Build Process

```
npm run build
  ↓
Create React App webpack configuration
  ↓
Minify JavaScript and CSS
  ↓
Optimize assets
  ↓
Generate static files in build/
  ↓
Ready for deployment to static hosting
```

### Hosting Requirements

- **Type**: Static file hosting
- **Server**: Any HTTP server (Nginx, Apache, Vercel, Netlify, etc.)
- **HTTPS**: Required for Web Audio API and service workers
- **Routing**: All routes must serve index.html (SPA routing)

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Google Sheets are publicly accessible
- [ ] All audio files are in `public/sounds/`
- [ ] Analytics tracking ID is correct
- [ ] `homepage` field in package.json is set correctly
- [ ] Build completes without errors
- [ ] Production build tested locally with `serve -s build`
- [ ] HTTPS is configured
- [ ] Custom domain DNS (if applicable)

---

## Technology Decisions

### Why React?

- Component-based architecture for reusability
- Large ecosystem and community support
- Excellent performance with Virtual DOM
- Built-in hooks for state and effects

### Why Web Audio API?

- Native browser support (no external dependencies)
- Low latency audio playback
- Advanced features (gain control, fade effects, loops)
- Fine-grained control over audio processing

### Why Google Sheets?

- Easy content management for non-technical team members
- Real-time updates without code changes
- No database infrastructure needed
- Free and reliable hosting

### Why CSS-in-JS + CSS Modules?

- Component-scoped styles prevent conflicts
- Dynamic styling based on props/state
- Better developer experience with MUI and styled-components
- Coexistence with traditional CSS for global styles

---

## Future Architecture Considerations

### Scalability

- Consider backend API if data exceeds Google Sheets limits
- Implement service worker for offline support
- Add database for user-generated content (if needed)

### Performance

- Implement virtual scrolling for long lists
- Add skeleton loaders for better perceived performance
- Consider audio streaming for very large files
- Implement progressive image loading

### Features

- Add internationalization (i18n) support
- Implement search functionality
- Add filtering and sorting for pollutants
- Consider adding user authentication for personalized features

---

*Last Updated: November 2025*

