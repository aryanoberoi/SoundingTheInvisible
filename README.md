# Sounding The Invisible

**An Interactive Audio-Visual Experience Exploring Water Pollution and Phytoremediation**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-%3E%3D14.0.0-green.svg)](https://nodejs.org/)

---

## 🌊 About The Project

**Sounding The Invisible** is an innovative web-based platform that transforms invisible water pollutants into visible and audible experiences. By combining art, science, and technology, the project educates users about water contamination and nature-based remediation solutions through phytoremediation.

### ✨ Key Features

- 🎵 **Audio Sonification**: Each pollutant has a unique audio signature
- 🌱 **Phytoremediation Database**: 100+ plants that can clean polluted water
- 📊 **Interactive Visualizations**: Explore data through engaging graphics
- 🏥 **Health Impact Information**: Detailed effects on human health
- 📍 **Real Case Studies**: Historical pollution incidents worldwide
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile
- ♿ **Accessible**: Keyboard navigation and screen reader support

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[📖 Documentation Home](docs/README.md)** - Overview and quick links
- **[⚙️ Installation Guide](docs/INSTALLATION.md)** - Setup and configuration
- **[🏗️ Architecture Overview](docs/ARCHITECTURE.md)** - System design and structure
- **[🧩 Component Documentation](docs/COMPONENTS.md)** - Component reference
- **[🔊 Audio System Guide](docs/AUDIO_SYSTEM.md)** - Audio implementation details
- **[📊 Data Structure](docs/DATA_STRUCTURE.md)** - Google Sheets schema
- **[🚀 Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment
- **[🤝 Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute
- **[📱 Usage Guide](docs/USAGE_GUIDE.md)** - User documentation

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd SoundingTheInvisible

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

For detailed installation instructions, see the [Installation Guide](docs/INSTALLATION.md).

---

## 🎨 Technology Stack

### Frontend
- **React 19.0.0** - UI library
- **React Router DOM 7.4.0** - Routing
- **Material-UI 7.0.2** - Component library
- **Styled Components** - Styling

### Audio
- **Web Audio API** - Native audio processing
- **Custom AudioService** - Audio management

### Data
- **Google Sheets API** - Content management
- **PapaParse** - CSV parsing

### Build & Deploy
- **Create React App** - Build tooling
- **Vercel Analytics** - Performance monitoring

---

## 📁 Project Structure

```
SoundingTheInvisible/
├── docs/                   # Comprehensive documentation
├── public/                 # Static assets
│   ├── sounds/             # Audio files (1.mp3 - 50.mp3, 999.mp3)
│   └── *.{svg,png,jpg}     # Images
├── src/                    # Source code
│   ├── PollutantPage/      # Pollutant detail components
│   ├── App.js              # Main app component
│   ├── Homepage.js         # Homepage
│   ├── Navbar.js           # Navigation menu
│   ├── AudioService.js     # Audio management
│   └── ...                 # Other components
├── fonts/                  # Custom fonts
├── package.json
└── README.md
```

---

## 🎵 Features Overview

### 1. Interactive Homepage

- Project introduction and concept explanation
- Interactive SVG visualizations with audio triggers
- Animated backgrounds and transitions
- Expandable content sections

### 2. Navigation System

- Fullscreen hamburger menu
- Four main pollutant categories:
  - Agriculture waste
  - Heavy metal waste
  - Radioactive waste
  - Sewage waste
- Expandable category graphics
- Direct pollutant selection

### 3. Pollutant Detail Pages

Each pollutant page includes:

- **Pollutant Information**: Chemical composition, sources, impact
- **Plant Solution**: Species that can remediate the pollutant
- **Health Effects**: Interactive body diagram with expandable details
- **Case Studies**: Real-world incidents and data
- **Phytoremediation Species**: List of effective plants
- **Plant Details**: Common names in 19 languages, habitat, uses
- **Sound Visualization**: Real-time sine wave display

### 4. Audio System

- Unique sound for each of 50+ pollutants
- Ambient background soundscape
- Smooth fade-in/fade-out effects
- Seamless looping
- Mute/unmute with localStorage persistence
- Hover-triggered audio on interactive elements

### 5. Mobile Experience

- Fully responsive design
- Touch-optimized controls
- Swipeable panels
- Mobile-specific layouts
- Optimized performance

---

## 📊 Data Management

Content is managed via Google Sheets for easy updates without code changes:

- **Homepage Content**: Text sections and titles
- **Pollutant Data**: 50+ pollutants with full details
- **Plant Data**: 100+ plant species with remediation info
- **Audio Mappings**: Sound file associations

See [Data Structure Documentation](docs/DATA_STRUCTURE.md) for schema details.

---

## 🎯 Use Cases

### Education
- Classroom teaching tool
- Environmental science curriculum
- Public health education
- Art and technology integration

### Research
- Water quality awareness
- Phytoremediation studies
- Pollution impact visualization
- Case study analysis

### Awareness
- Public exhibitions
- Environmental campaigns
- Policy advocacy
- Community education

---

## 🌍 Project Context

### Commission & Support

This work was commissioned within the framework of the **S+T+ARTS 4Water II** residency program by **TBA21–Academy** with the support of:

- Konsortium Deutsche Meeresforschung (KDM)
- Ca' Foscari
- CNR-ISMAR
- ETT
- Venice International University
- S+T+ARTS program of the European Union

### Initial Support

- ASU Leonardo Imagination Fellowship
- UNESCO FUTURE Literacy
- The Awesome Foundation

### Development Team

- **Aryan Oberoi** - Lead Developer
- **Arham** - Developer
- **Ayush Singh** - Developer
- **Armaan Nayyar** - Developer

---

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Coding standards
- Pull request process
- Issue guidelines

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Open an issue](link-to-issues) with detailed reproduction steps
- **Feature Requests**: [Open an issue](link-to-issues) describing the feature
- **Questions**: Check [Usage Guide](docs/USAGE_GUIDE.md) or [FAQ](docs/USAGE_GUIDE.md#faq)

---

## 📈 Project Statistics

- **50+ Pollutants** documented
- **100+ Plant Species** in database
- **19 Languages** for plant common names
- **4 Major Categories** of water pollutants
- **Fully Responsive** design
- **100% Accessible** with keyboard navigation

---

## 🌐 Browser Support

- **Chrome** (recommended) - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions

### Required Features
- Web Audio API
- CSS Grid and Flexbox
- ES6+ JavaScript
- SVG support

---

## 📞 Contact & Support

- 📧 **Email**: [Contact development team]
- 🐙 **GitHub**: [Repository link]
- 🌐 **Website**: [Production URL]
- 💬 **Discussions**: [GitHub Discussions]

---

## 🙏 Acknowledgments

- All scientific advisors and researchers
- Environmental organizations providing data
- Open source community
- Beta testers and early users
- All contributors and supporters

---

## 📖 Additional Resources

### For Developers
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Component Reference](docs/COMPONENTS.md)
- [Audio System Guide](docs/AUDIO_SYSTEM.md)
- [API Documentation](docs/DATA_STRUCTURE.md)

### For Contributors
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Development Setup](docs/INSTALLATION.md)
- [Coding Standards](docs/CONTRIBUTING.md#coding-standards)

### For Users
- [Usage Guide](docs/USAGE_GUIDE.md)
- [FAQ](docs/USAGE_GUIDE.md#faq)
- [Troubleshooting](docs/USAGE_GUIDE.md#troubleshooting)

### For Deployers
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Environment Configuration](docs/DEPLOYMENT.md#environment-configuration)
- [Performance Optimization](docs/DEPLOYMENT.md#performance-optimization)

---

## 🔮 Roadmap

Future enhancements may include:

- [ ] Multi-language interface
- [ ] User accounts and saved favorites
- [ ] Advanced audio visualizations
- [ ] AR/VR experiences
- [ ] Educational curriculum materials
- [ ] API for third-party integrations
- [ ] Mobile native apps
- [ ] Offline mode support

---

## 📊 Performance

- **Lighthouse Score**: 85+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

---

## 🔐 Security

- HTTPS required for production
- No sensitive data stored
- Secure API communications
- Regular dependency updates
- Security audit compliance

See [Security Policy](SECURITY.md) for reporting vulnerabilities.

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history and version details.

---

## ⭐ Star History

If you find this project useful, please consider giving it a star on GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=username/SoundingTheInvisible&type=Date)](https://star-history.com/#username/SoundingTheInvisible&Date)

---

<div align="center">

**Made with ❤️ for clean water and a sustainable future**

[Website](link) • [Documentation](docs/README.md) • [Report Bug](link) • [Request Feature](link)

</div>

---

*Last Updated: November 2025*
