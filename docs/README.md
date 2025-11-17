# Sounding The Invisible - Documentation

**An Interactive Audio-Visual Experience Exploring Water Pollution and Phytoremediation**

## Table of Contents

- [Overview](#overview)
- [Quick Links](#quick-links)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Context](#project-context)

---

## Overview

**Sounding The Invisible** is an innovative web-based interactive platform that transforms invisible water pollutants into visible and audible experiences. The project combines art, science, and technology to educate users about water contamination and nature-based remediation solutions through phytoremediation (using plants to clean polluted water).

### Project Vision

The platform makes the invisible visible by:
- **Sonifying** different pollutants with unique audio signatures
- **Visualizing** complex environmental data through interactive graphics
- **Educating** about plant species that can remediate various water pollutants
- **Raising awareness** about water quality issues globally

---

## Quick Links

- 📖 [Installation Guide](./INSTALLATION.md)
- 🏗️ [Architecture Overview](./ARCHITECTURE.md)
- 🎨 [Component Documentation](./COMPONENTS.md)
- 🔊 [Audio System Guide](./AUDIO_SYSTEM.md)
- 🌱 [Data Structure](./DATA_STRUCTURE.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 🤝 [Contributing Guidelines](./CONTRIBUTING.md)
- 🎓 [Usage Guide](./USAGE_GUIDE.md)

---

## Key Features

### 1. **Interactive Pollutant Exploration**
- Navigate through 4 major categories of water pollutants:
  - Agriculture waste
  - Heavy metal waste
  - Radioactive waste
  - Sewage waste
- Detailed information about 50+ specific pollutants
- Visual before/after comparisons

### 2. **Audio Sonification System**
- Each pollutant has a unique audio signature
- Real-time audio playback with fade-in/fade-out effects
- Ambient soundscapes
- Interactive audio controls with mute/unmute functionality
- Overlapping loop technology for seamless audio experiences

### 3. **Phytoremediation Database**
- Comprehensive database of plants that can clean polluted water
- Scientific and common names in multiple languages
- Habitat requirements (temperature, humidity, soil, pH)
- Remediation capacity metrics
- Visual plant profiles with high-quality imagery

### 4. **Health Impact Information**
- Detailed effects of pollutants on human health
- Interactive body diagram showing affected organs
- Expandable information cards
- Evidence-based health data

### 5. **Case Studies**
- Real-world examples of pollution incidents
- Geographic data
- Historical timeline
- Impact analysis

### 6. **Responsive Design**
- Fully responsive across desktop, tablet, and mobile devices
- Adaptive layouts for different screen sizes
- Touch-friendly mobile navigation
- Custom hamburger menu with expandable categories

### 7. **Custom Cursor System**
- Context-aware cursor that changes based on interactive elements
- Inverted cursor on certain UI elements
- Smooth animations and transitions

---

## Technology Stack

### Frontend Framework
- **React 19.0.0** - UI library
- **React Router DOM 7.4.0** - Client-side routing
- **React Scripts 5.0.1** - Build tooling

### UI & Styling
- **Material-UI (MUI) 7.0.2** - Component library
- **Emotion 11.14.0** - CSS-in-JS styling
- **Styled Components 6.1.18** - Component styling
- **Custom CSS** - Specialized styling

### Audio
- **Web Audio API** - Native audio processing
- **Custom AudioService** - Audio management system
- **Socket.io Client 4.8.1** - Real-time audio streaming (optional)

### Data Management
- **PapaParse 5.5.3** - CSV parsing
- **Google Sheets API** - Dynamic content management
- **OpenSheet** - Public Google Sheets access

### Visual Components
- **React Compare Slider 3.1.0** - Before/after image comparisons
- **Custom SVG Components** - Interactive graphics
- **Canvas-based visualizations** - Sound wave displays

### Build & Deploy
- **Create React App** - Project scaffolding
- **Vercel Analytics 1.5.0** - Performance monitoring
- **Google Analytics** - User tracking

### Development
- **TypeScript 4.9.5** - Type checking (partial implementation)
- **Web Vitals 4.2.4** - Performance metrics
- **SVGR Webpack 8.1.0** - SVG component generation

### Fonts
- **Clash Grotesk** - Primary typeface (multiple weights)
- **Nippo** - Secondary typeface (multiple weights)
- Custom font loading with multiple formats (woff, woff2, ttf, eot)

---

## Getting Started

### Prerequisites
```bash
Node.js >= 14.0.0
npm >= 6.0.0 or yarn >= 1.22.0
```

### Quick Start
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd SoundingTheInvisible

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The application will open at `http://localhost:3000`

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md)

---

## Project Context

### Commission & Support

This work was commissioned within the framework of the **S+T+ARTS 4Water II** residency program by:

- **TBA21–Academy**
- **Konsortium Deutsche Meeresforschung (KDM)**

With collaboration from:
- **Ca' Foscari**
- **CNR-ISMAR**
- **ETT**
- **Venice International University**
- **S+T+ARTS program of the European Union**

### Initial Support
- ASU Leonardo Imagination Fellowship
- UNESCO FUTURE Literacy
- The Awesome Foundation

### Development Team
- **Aryan Oberoi** - Lead Developer
- **Arham** - Developer
- **Ayush Singh** - Developer
- **Armaan Nayyar** - Developer

### License
This project is licensed under the **Apache License 2.0** - see the [LICENSE](../LICENSE) file for details.

---

## Project Statistics

- **50+ Pollutants** documented with audio signatures
- **100+ Plant Species** in phytoremediation database
- **Multiple Languages** for plant common names
- **4 Major Categories** of water pollutants
- **Fully Responsive** across all device sizes
- **Accessibility Features** including keyboard navigation
- **Real-time Audio** processing and playback
- **Dynamic Content** loaded from Google Sheets

---

## Browser Support

- **Chrome** (recommended) - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions
- **Mobile browsers** - iOS Safari, Chrome Mobile

### Required Browser Features
- Web Audio API support
- CSS Grid and Flexbox
- ES6+ JavaScript
- SVG support
- LocalStorage

---

## Contact & Resources

- 📧 **Support**: [Contact development team]
- 🌐 **Website**: [Production URL]
- 📱 **Social Media**: Follow project updates
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Discussions**: Join community discussions

---

## Next Steps

1. Read the [Installation Guide](./INSTALLATION.md) to set up your development environment
2. Explore the [Architecture Overview](./ARCHITECTURE.md) to understand the project structure
3. Check the [Component Documentation](./COMPONENTS.md) to learn about individual components
4. Review the [Audio System Guide](./AUDIO_SYSTEM.md) to understand the audio implementation
5. See the [Usage Guide](./USAGE_GUIDE.md) for end-user documentation

---

*Last Updated: November 2025*

