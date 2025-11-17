# Component Documentation

Comprehensive documentation of all components in the Sounding The Invisible application.

## Table of Contents

- [Core Components](#core-components)
- [Page Components](#page-components)
- [Pollutant Page Components](#pollutant-page-components)
- [Interactive Components](#interactive-components)
- [Utility Components](#utility-components)
- [SVG Components](#svg-components)

---

## Core Components

### App.js

**Purpose**: Root application component managing routing and global state

**Key Responsibilities**:
- Fetches data from Google Sheets
- Initializes AudioService
- Manages routing with React Router
- Handles scroll behavior on navigation
- Tracks analytics

**Props**: None (root component)

**State**:
- `dataByCategory`: Categorized pollutant/plant data
- `pageLoaded`: Loading state
- `displayPollutantPage`: Controls delayed pollutant page display

**Key Features**:
- Automatic scroll to top on route change
- 1-second delay before displaying pollutant pages
- Google Analytics page view tracking
- Scroll locking during navigation

```javascript
// Usage
<App />
```

---

### Navbar.js

**Purpose**: Fullscreen hamburger navigation menu

**Props**: None

**State**:
- `isOpen`: Menu visibility
- `expandedItem`: Currently expanded category
- `previousExpanded`: Tracks previous expansion for scroll management
- `menuScale`: Dynamic scaling for viewport fit

**Features**:
- **4 Main Categories**:
  - Agriculture waste
  - Heavy metal waste
  - Radioactive waste
  - Sewage waste
- Expandable SVG graphics for each category
- Smooth animations and transitions
- Responsive scaling to fit viewport
- Keyboard navigation (Escape to close)
- Body scroll locking when open
- Custom cursor integration
- Auto-scroll to expanded items

**Key Interactions**:
- Click hamburger icon to open
- Click X button to close
- Click category to expand
- Click X on expanded item to collapse
- Click "Home" button to navigate to homepage

```javascript
// Used in App.js
<Navbar />
```

**Desktop vs Mobile**:
- Desktop: Larger expanded graphics
- Mobile: Compressed mobile-optimized SVGs

---

## Page Components

### Homepage.js

**Purpose**: Landing page with project concept and interactive visuals

**Props**:
- `categorizedData`: Pollutant and plant data (optional, fetches own content)

**Features**:
- **Three Main Sections**:
  1. **Concept Section**: Project introduction
  2. **Trapezium Section**: Methodology explanation
  3. **Sound Concept Section**: Audio system overview

- **Interactive Elements**:
  - Animated clouds (parallax effect)
  - Interactive SVG frames (hover effects)
  - Sound toggle button
  - Read more/less expandable text
  - Animated title

**Data Source**: 
- Fetches from OpenSheet API
- Sheet: `1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4`

**Key Components Used**:
- `Title`: Animated title
- `Cloud`: Animated background clouds
- `ConceptFrame`: Interactive concept visualization
- `MiddleFrame`: Trapezium section visualization
- `SoundConceptFrame`: Sound methodology visualization
- `SoundToggle`: Audio control
- `Footer`: Site footer

```javascript
// Usage in App.js
<Homepage categorizedData={dataByCategory} />
```

---

### PollutantPage.js

**Purpose**: Detailed page for a specific pollutant and remediating plant

**Props**:
- `categorizedData`: Categorized data from Google Sheets

**Route**: `/:customName` (e.g., `/lead`, `/uranium`)

**Features**:
- **Dual Panel Layout** (Desktop):
  - **Left Panel**: Pollutant information
  - **Right Panel**: Plant information
  
- **Mobile Layout**:
  - Collapsible drawers
  - Swipe-to-reveal panels
  - Optimized scrolling

- **Content Sections**:
  1. Hero image comparison (before/after)
  2. Pollutant details
  3. Health effects (expandable)
  4. Case studies
  5. Phytoremediation species list
  6. About the plant
  7. Common names (multiple languages)
  8. Plant habitat requirements
  9. Uses of plant
  10. Phytoremediation capacity
  11. Sound frequency visualization

**Data Processing**:
```javascript
// Extracts data from categorized data based on URL parameter
const { customName } = useParams();
const matchedRow = categorizedData[customName]?.[0];

// Structures data into context object
const dataContext = {
  pollutant: { ... },
  plant: { ... }
};
```

**Share Functionality**:
- Facebook share
- Instagram share  
- Twitter share
- Native Web Share API

**Audio Integration**:
- Sound toggle in top corner
- Sine wave visualization
- Context-aware audio (changes with pollutant)

```javascript
// Usage in App.js
<PollutantPage categorizedData={dataByCategory} key={location.pathname} />
```

---

## Pollutant Page Components

### LeftPanel.js & MobileLeftPanel.js

**Purpose**: Display pollutant information (desktop and mobile versions)

**Props**:
- `sections`: Array of data sections
- `pollutantName`: Name of the pollutant
- `onLoad`: Callback when images load
- `onNavigate`: Navigation callback

**Displays**:
- Pollutant name
- Description
- Before/after comparison image (React Compare Slider)
- Navigation buttons

**Mobile Differences**:
- Vertical layout
- Touch-optimized controls
- Simplified comparison slider

```javascript
<LeftPanel 
  sections={[{ pollutantName, description, imgUrl, ... }]} 
  pollutantName={pollutantName}
  onLoad={handleLoad}
  onNavigate={handleNav}
/>
```

---

### RightPanel.js & MobileRightPanel.js

**Purpose**: Display plant information

**Props**:
- `sections`: Array of plant data
- `pollutantName`: Related pollutant name
- `onLoad`: Image load callback
- `onNavigate`: Navigation callback

**Displays**:
- Plant image
- Scientific name
- Common name
- Wetland status
- Phytoremediation capacity preview
- Habitat requirements (temperature, humidity, soil, pH)
- "Know More" button (scrolls to detailed sections)

**Features**:
- Icon-based habitat display
- Expandable information
- Smooth scroll-to-section

```javascript
<RightPanel 
  sections={[{ 
    plantName, 
    plantimagedesktop, 
    wetlandDescription, 
    phytoCapacity,
    temperature,
    humidity,
    soil,
    ph
  }]} 
  pollutantName={pollutantName}
  onLoad={handleLoad}
  onNavigate={handleNav}
/>
```

---

### Body.js (Box Component)

**Purpose**: Display health effects of pollutant on human body

**Props**:
- `sections`: Array of health effect sections
- `pollutantName`: Name of the pollutant

**Features**:
- Human anatomy diagram
- Expandable cards for each affected system
- Toggle-able content (click to expand/collapse)
- Color-coded sections (alternating styles)

**Data Structure**:
```javascript
sections: [
  { text: "Title_Content text for health effect" },
  { text: "Title_Content text for health effect" },
  ...
]
```

**Performance**:
- Wrapped in `React.memo` for optimization
- Uses `useMemo` for parsing sections
- Uses `useCallback` for event handlers

```javascript
<Box sections={healthEffectSections} pollutantName="Lead" />
```

---

### CaseStudies.js

**Purpose**: Display real-world case studies of pollution

**Props**:
- `sections`: Array containing case study data

**Displays**:
- Location/place name
- Map image
- Descriptive text
- Historical data
- Environmental impact
- Area affected

**Layout**:
- Side-by-side text and map image
- Responsive stacking on mobile

```javascript
<CaseStudies sections={[{ place, description, image, area }]} />
```

---

### Phyto.js

**Purpose**: List of plant species that can remediate the pollutant

**Props**:
- `sections`: Array of phytoremediation species data
- `pollutantName`: Name of the pollutant

**Displays for Each Species**:
- Species name (split from data)
- Medium (soil, water, etc.)
- Time period for remediation
- Percentage of remediation

**Layout**:
- Grid of species boxes
- Decorative SVG backgrounds (alternating left/right)
- Mobile-optimized simplified layout

**Data Format**:
```javascript
sections: [
  { 
    medium: "SpeciesName_Medium", 
    timePeriod: "SpeciesName_Time",
    remediation: "SpeciesName_Percentage"
  },
  ...
]
```

```javascript
<Phyto sections={phytoSpecies} pollutantName="Mercury" />
```

---

### AboutPlant.js

**Purpose**: Detailed information about the plant

**Props**:
- `sections`: Array with plant description and image

**Displays**:
- Descriptive text about the plant
- Wetland status
- Scientific illustration or photo
- Visual decorations

```javascript
<AboutPlant sections={[{ description, status, image }]} />
```

---

### CommonNames.js

**Purpose**: Display plant names in multiple languages

**Props**:
- `sections`: Array of common names in different languages

**Features**:
- Multi-language support (19 languages)
- Formatted as language: name pairs
- Responsive grid layout
- Decorative SVG backgrounds

**Languages Supported**:
English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Bengali, Turkish, Vietnamese, Thai, Indonesian, Swahili

```javascript
<CommonNames sections={[
  { text: "English: Common Reed" },
  { text: "Spanish: Carrizo común" },
  ...
]} />
```

---

### PlantHabitat.js

**Purpose**: Display plant's natural habitat requirements

**Props**:
- `sections`: Habitat data including temperature, humidity, soil, pH, and details

**Displays**:
- **Key Metrics** (with icons):
  - Temperature range
  - Humidity/moisture requirements
  - Soil type
  - pH range

- **Expandable Details**:
  - Growing conditions
  - Geographic distribution
  - Seasonal variations
  - Care requirements

**Interactive**:
- Click to expand/collapse detail sections
- Icon-based visual representation

```javascript
<PlantHabitat sections={[{
  temperature: "15-30°C",
  humidity: "High",
  soil: "Moist, loamy",
  ph: "6.0-7.5",
  details: [
    { title: "Growing Season", content: "..." },
    ...
  ]
}]} />
```

---

### UsesOfPlant.js

**Purpose**: Display traditional and modern uses of the plant

**Props**:
- `sections`: Array of use categories and descriptions

**Displays**:
- Traditional uses
- Modern applications
- Industrial uses
- Cultural significance
- Nutritional value

**Layout**:
- Grid-based cards
- Icon representations
- Expandable content

```javascript
<UsesOfPlant sections={[
  { text: "Medicinal_Used in traditional medicine..." },
  { text: "Construction_Used for thatching..." },
  ...
]} />
```

---

### PhytoCapacity.js

**Purpose**: Detailed phytoremediation capacity information

**Props**:
- `sections`: Array of remediation capacity data

**Displays**:
- Introduction paragraph
- Pollutant-specific remediation info
- Mechanisms of action
- Efficiency data
- Visual representations

**Layout**:
- Alternating left/right layout
- SVG illustrations
- Vertical dividers between sections

```javascript
<PhytoCapacity sections={[
  { type: 'intro', text: "Introduction..." },
  { text: "Heavy Metals_This plant can accumulate..." },
  { text: "Organic Compounds_Breaks down pesticides..." },
  ...
]} />
```

---

### AboutPollutant.js (AboutPollutantSection)

**Purpose**: Introduction to the pollutant

**Props**:
- `sections`: Array with description and image

**Displays**:
- Pollutant description
- Chemical/scientific information
- Atomic/molecular image or diagram

```javascript
<AboutPollutantSection sections={[{ description, image }]} />
```

---

### SoundFrequency.js

**Purpose**: Visual representation of pollutant's audio signature

**Props**:
- `padNumber`: Audio pad number for the pollutant

**Features**:
- Real-time sine wave visualization (canvas-based)
- Connects to AudioService
- Displays frequency and wavelength
- Animated waveform

**Technical**:
- Uses Canvas API for rendering
- Analyzes audio from Web Audio API
- Updates at 60fps

```javascript
<SoundFrequency padNumber={5} />
```

---

### sinwave.js (SineWaveVisualizer)

**Purpose**: Advanced sine wave visualization component

**Props**:
- `padNumber`: Audio pad to visualize
- `width`: Canvas width
- `height`: Canvas height
- `color`: Waveform color

**Features**:
- Real-time frequency analysis
- Multiple wave rendering modes
- Smooth animations
- Responsive sizing

```javascript
<SineWaveVisualizer 
  padNumber={10} 
  width={800} 
  height={200} 
  color="#00ff00" 
/>
```

---

## Interactive Components

### SoundToggle.js

**Purpose**: Audio mute/unmute button

**Props**:
- `padNumber`: Audio pad to control (999 for ambient)
- `isInTrapezium`: Visual mode toggle (black/white theme)
- `panelMode`: Theme mode ("black" or "white")
- `defaultActive`: Initial audio state

**Features**:
- Toggles AudioService mute state
- Animated icon (speaker with/without waves)
- Persistent state (localStorage)
- Context-aware styling (adapts to background)

**States**:
- Active (audio on): Speaker with sound waves
- Inactive (audio off): Speaker with X

```javascript
<SoundToggle 
  padNumber={999} 
  isInTrapezium={false}
  panelMode="white"
  defaultActive={true}
/>
```

---

### AudioPopup.js

**Purpose**: Audio control popup (if used)

**Features**:
- Volume control
- Play/pause
- Track information
- Keyboard controls

---

### IsolatedCursor.js

**Purpose**: Custom animated cursor

**Features**:
- Follows mouse position
- Inverts color on interactive elements (data-cursor-invert)
- Smooth animations
- Hover state changes (grows on interactive elements)

**CSS Variables**:
```css
--cursor-x: [mouse x position]
--cursor-y: [mouse y position]
```

**Inversion Logic**:
```javascript
// Elements with data-cursor-invert="true" invert cursor color
element.setAttribute('data-cursor-invert', 'true');
```

```javascript
// Automatically used in App.js
<IsolatedCursor />
```

---

## Utility Components

### ScrollToTop.js

**Purpose**: Reset scroll position on route change

**Usage**:
```javascript
// Automatically used in App.js
<ScrollToTop />
```

**Behavior**:
- Listens to route changes
- Scrolls to (0, 0) on navigation
- Handles smooth vs instant scrolling

---

### ScrollFix.js

**Purpose**: Utility functions for scroll behavior management

**Exports**:
- `ScrollToTop`: Component
- `inspectScrollableElements()`: Debugging function

**Functions**:
```javascript
// Inspect all scrollable elements (debugging)
inspectScrollableElements();

// Returns list of elements with overflow
```

---

### PreventPullToRefresh.js

**Purpose**: Prevent mobile pull-to-refresh gesture

**Usage**:
```javascript
import './PreventPullToRefresh';
// Automatically applies on import
```

**Behavior**:
- Listens to touch events
- Prevents default pull-to-refresh on iOS/Android
- Allows normal scrolling

---

### Loader.js

**Purpose**: Loading spinner/animation

**Usage**:
```javascript
<Loader />
```

**Variants**:
- Full-page loader
- Inline loader
- Custom styling

---

## SVG Components

### Title.js (title.js)

**Purpose**: Animated title/logo for homepage

**Features**:
- SVG-based animation
- Fade-in effect
- Responsive scaling

```javascript
<Title />
```

---

### Cloud.js

**Purpose**: Animated background clouds with parallax effect

**Props**:
- `top`: Vertical position (px or %)
- `left`: Horizontal position (px or %)
- `distance`: Parallax distance ("short", "medium", "long")
- `direction`: Movement direction ("left" or "right")
- `variant`: Cloud style (1, 2, or 3)

**Features**:
- CSS-based animation
- Parallax scrolling effect
- Multiple cloud variants
- Configurable speed and direction

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

### Frame Components (frame.js, frame1.js, frame2.js)

**Purpose**: Interactive SVG illustrations for homepage sections

**Features**:
- Hover interactions
- Audio triggering on hover
- Responsive design
- Animated elements

**Types**:
- `SoundConceptFrame` (frame.js): Sound methodology
- `ConceptFrame` (frame1.js): Project concept
- `MiddleFrame` (frame2.js): Trapezium/process

**Props**:
- `className`: CSS class
- `preserveAspectRatio`: SVG aspect ratio
- `audioRef`: Reference to audio element
- `handleAudio`: Audio control callback
- `onHover`: Hover state callback
- `audioControls`: Audio control object

```javascript
<ConceptFrame 
  className="interactive-svg-concept"
  preserveAspectRatio="xMidYMid meet"
  audioRef={audioRef}
  handleAudio={handleAudio}
  onHover={handleFrameHover}
  audioControls={audioControls}
/>
```

---

### Expanded Waste SVGs

**Purpose**: Detailed category graphics for expanded navigation menu

**Components**:
- `AgricultureWasteExpanded` / `MobileAgricultureWasteExpanded`
- `HeavyMetalWasteExpanded` / `MobileHeavyMetalWasteExpanded`
- `RadioactiveWasteExpanded` / `MobileRadioactiveWasteExpanded`
- `SewageWasteExpanded` / `MobileSewageWasteExpanded`

**Features**:
- Clickable elements with navigation
- Detailed pollutant listings
- Interactive hover states
- Responsive versions for mobile

**Data Attributes**:
```javascript
// For interactive SVG elements
data-action="navigate"  // Navigate to route
data-route="/pollutant-name"  // Target route
```

---

### Footer.js

**Purpose**: Site footer with credits and links

**Features**:
- Copyright information
- Project credits
- Social media links
- Partner logos
- Funding acknowledgments

```javascript
<Footer />
```

---

## Component Best Practices

### 1. Performance

```javascript
// Use React.memo for expensive components
export const Box = React.memo(({ sections, pollutantName }) => { ... });

// Use useMemo for expensive calculations
const parsedSections = useMemo(() => sections.map(parse), [sections]);

// Use useCallback for stable function references
const handleClick = useCallback(() => { ... }, []);
```

### 2. Props Validation

```javascript
// Destructure with defaults
const { pollutantName = "", sections = [] } = props;

// Check for data existence
if (!matchedRow) return <div>Pollutant not found</div>;
```

### 3. Audio Integration

```javascript
import audioService from './AudioService';

// Play audio
audioService.playElementSound('lead', { loop: true, volume: 0.8 });

// Stop audio
audioService.stopElementSound('lead');
```

### 4. Responsive Design

```javascript
// Use window.innerWidth for conditional rendering
{window.innerWidth <= 768 ? <MobileComponent /> : <DesktopComponent />}

// Or use CSS media queries in component styles
```

### 5. Accessibility

```javascript
// Add ARIA attributes
<button aria-label="Close menu" aria-expanded={isOpen}>

// Keyboard navigation
onKeyDown={(e) => e.key === 'Escape' && closeMenu()}

// Focus management
<div role="navigation" tabIndex={0}>
```

---

*Last Updated: November 2025*

