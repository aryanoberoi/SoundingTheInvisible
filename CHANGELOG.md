# Changelog

All notable changes to Sounding The Invisible will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation suite
- Installation guide
- Architecture documentation
- Component reference
- Audio system guide
- Data structure documentation
- Deployment guide
- Contributing guidelines
- Usage guide
- FAQ section

## [1.0.0] - 2025-11-17

### Added
- Initial release
- Homepage with project concept and interactive visualizations
- Four main pollutant categories (Agriculture, Heavy Metal, Radioactive, Sewage)
- 50+ pollutant detail pages
- 100+ phytoremediation plant profiles
- Audio sonification system with unique sounds for each pollutant
- Interactive navigation menu with expandable categories
- Health effects visualization with human body diagram
- Real-world case studies
- Plant common names in 19 languages
- Before/after image comparison sliders
- Sound frequency visualizations
- Fully responsive design
- Custom cursor system
- Google Sheets integration for content management
- Vercel Analytics integration
- Google Analytics tracking
- Apache 2.0 License

### Components
- App.js - Main application router
- Homepage.js - Landing page
- PollutantPage.js - Detail pages
- Navbar.js - Navigation menu
- AudioService.js - Audio management system
- IsolatedCursor.js - Custom cursor
- Multiple PollutantPage subcomponents
- Interactive SVG frames
- Cloud animations
- Footer with credits

### Features
- Web Audio API integration
- Seamless audio looping
- Fade-in/fade-out effects
- Audio buffer caching
- Mute persistence in localStorage
- Scroll management on route changes
- Intersection Observer for section tracking
- Responsive image handling
- SVG interactions
- Touch-optimized mobile experience

### Technical
- React 19.0.0
- React Router DOM 7.4.0
- Material-UI 7.0.2
- Styled Components 6.1.18
- Web Audio API
- Google Sheets API integration
- Create React App build system

---

## Version History Format

Each version should include:

### [Version] - YYYY-MM-DD

#### Added
- New features or components
- New functionality
- New documentation

#### Changed
- Updates to existing features
- Improvements to existing functionality
- Refactoring

#### Deprecated
- Features marked for removal
- Old APIs being phased out

#### Removed
- Deleted features
- Removed dependencies
- Cleaned up code

#### Fixed
- Bug fixes
- Performance improvements
- Security patches

#### Security
- Security vulnerability fixes
- Security improvements

---

## Examples for Future Releases

### [1.1.0] - YYYY-MM-DD

#### Added
- Multi-language interface support
- User accounts and authentication
- Save favorite pollutants feature
- Advanced audio visualizations
- Export data functionality

#### Changed
- Improved mobile navigation
- Updated component architecture
- Enhanced audio performance

#### Fixed
- Audio sync issues on Safari
- Mobile scroll behavior
- Image loading performance

#### Security
- Updated dependencies with security patches
- Improved CSP headers

---

### [1.0.1] - YYYY-MM-DD

#### Fixed
- Audio playback issue on iOS Safari
- Navigation menu overflow on small screens
- Google Sheets data parsing error
- Image alt text accessibility

#### Changed
- Improved loading performance
- Updated documentation links

---

## Semantic Versioning Guide

Given a version number MAJOR.MINOR.PATCH:

- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible new features
- **PATCH**: Backwards-compatible bug fixes

### Examples

- **1.0.0 → 2.0.0**: Breaking changes (e.g., complete redesign, API overhaul)
- **1.0.0 → 1.1.0**: New features (e.g., new pollutant category, user accounts)
- **1.0.0 → 1.0.1**: Bug fixes (e.g., audio fix, navigation fix)

---

## Release Notes Template

When creating a new release, use this template:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### 🎉 Highlights
- Major feature 1
- Major feature 2

### ✨ Added
- New feature A
- New component B
- New documentation C

### 🔄 Changed
- Improved X
- Updated Y
- Refactored Z

### 🐛 Fixed
- Fixed bug #123: Description
- Resolved issue #456: Description

### 🔒 Security
- Security fix #789

### 📚 Documentation
- Updated README
- Added new guides

### 🙏 Contributors
Thank you to all contributors:
- @username1
- @username2
```

---

## Migration Guides

### Migrating to 2.0 (Future)

When major version changes occur, include migration instructions:

#### Breaking Changes
- List of breaking changes
- Why the change was made
- How to update your code

#### Deprecated Features
- Features removed in this version
- Alternative solutions

#### New Features
- Significant new functionality
- How to use new features

---

## Links

- [GitHub Releases](link-to-releases)
- [Documentation](docs/README.md)
- [Contributing Guide](docs/CONTRIBUTING.md)

---

*For the latest changes, see [Unreleased] section above or check [GitHub Commits](link-to-commits)*

---

*Last Updated: November 2025*

