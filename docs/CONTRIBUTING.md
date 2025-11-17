# Contributing Guide

Thank you for your interest in contributing to Sounding The Invisible! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing Guidelines](#testing-guidelines)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Our Standards

**Positive behaviors include**:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include**:
- Trolling, insulting, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React and JavaScript

### Setting Up Development Environment

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SoundingTheInvisible.git
   cd SoundingTheInvisible
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/SoundingTheInvisible.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start Development Server**
   ```bash
   npm start
   ```

---

## Development Workflow

### Branch Naming Convention

Use descriptive branch names following these patterns:

- `feature/add-new-pollutant` - New features
- `fix/audio-playback-issue` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/audio-service` - Code refactoring
- `style/improve-responsive-design` - UI/styling changes
- `test/add-audio-tests` - Test additions

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(audio): add fade-out effect to audio transitions

fix(pollutant-page): resolve image loading issue on mobile

docs(readme): update installation instructions

refactor(audio-service): simplify buffer caching logic
```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

---

## Coding Standards

### JavaScript/React Style Guide

#### 1. Use Functional Components

```javascript
// ✅ Good
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// ❌ Avoid
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.prop1}</div>;
  }
}
```

#### 2. Use Hooks

```javascript
// ✅ Good
const [state, setState] = useState(initialValue);

useEffect(() => {
  // side effect
}, [dependencies]);
```

#### 3. Destructure Props

```javascript
// ✅ Good
const MyComponent = ({ name, age, city }) => {
  return <div>{name}</div>;
};

// ❌ Avoid
const MyComponent = (props) => {
  return <div>{props.name}</div>;
};
```

#### 4. Use Meaningful Names

```javascript
// ✅ Good
const handlePollutantClick = () => { ... };
const isPollutantActive = true;
const pollutantData = [...];

// ❌ Avoid
const handleClick = () => { ... };
const flag = true;
const data = [...];
```

#### 5. Keep Components Small

Aim for components under 200 lines. Break down large components into smaller, reusable pieces.

#### 6. Use PropTypes or TypeScript

```javascript
import PropTypes from 'prop-types';

const MyComponent = ({ name, age }) => { ... };

MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

### CSS Style Guide

#### 1. Use BEM Naming Convention

```css
/* Block */
.pollutant-card { }

/* Element */
.pollutant-card__title { }
.pollutant-card__description { }

/* Modifier */
.pollutant-card--highlighted { }
```

#### 2. Group Related Styles

```css
/* Layout */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Spacing */
.container {
  padding: 20px;
  margin: 0 auto;
}

/* Typography */
.container {
  font-size: 16px;
  color: #333;
}
```

#### 3. Use CSS Variables for Theming

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-family: 'Clash Grotesk', sans-serif;
}

.button {
  background-color: var(--primary-color);
}
```

### Audio Integration Standards

#### 1. Use AudioService

```javascript
// ✅ Good
import audioService from './AudioService';
audioService.playElementSound('lead', { loop: true });

// ❌ Avoid creating new audio instances
const audio = new Audio('/sounds/1.mp3');
audio.play();
```

#### 2. Always Fade Audio

```javascript
// ✅ Good
audioService.playPadSound('1', { 
  fadeIn: true, 
  fadeInDuration: 1000 
});
audioService.stopPadSound('1', 1500);

// ❌ Avoid abrupt starts/stops
```

#### 3. Clean Up Audio

```javascript
// ✅ Good
useEffect(() => {
  audioService.playElementSound('lead', { loop: true });
  
  return () => {
    audioService.stopElementSound('lead', 1000);
  };
}, []);
```

---

## Pull Request Process

### Before Submitting

1. **Test Your Changes**
   ```bash
   npm start  # Test in development
   npm run build  # Test production build
   npm test  # Run tests (if applicable)
   ```

2. **Check for Errors**
   - No console errors
   - No linting warnings
   - All routes work
   - Responsive design intact

3. **Update Documentation**
   - Update README if needed
   - Add JSDoc comments to new functions
   - Update relevant .md files in docs/

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat(scope): descriptive message"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating a Pull Request

1. **Go to Original Repository** on GitHub

2. **Click "New Pull Request"**

3. **Select Your Branch**
   - Base: `main`
   - Compare: `your-feature-branch`

4. **Fill Out PR Template**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
How you tested these changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass (if applicable)
```

5. **Submit PR**

### Review Process

1. **Automated Checks**: CI/CD runs automatically
2. **Code Review**: Maintainer reviews your code
3. **Feedback**: Address any requested changes
4. **Approval**: PR is approved
5. **Merge**: Maintainer merges your PR

### After Your PR is Merged

```bash
# Update your main branch
git checkout main
git pull upstream main

# Delete your feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## Issue Guidelines

### Before Creating an Issue

1. **Search Existing Issues**: Check if issue already exists
2. **Check Documentation**: Ensure it's not a usage question
3. **Reproduce the Bug**: Verify you can consistently reproduce it

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 95]
- Node version: [e.g. 16.0.0]

## Additional Context
Any other relevant information
```

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Any other relevant information
```

---

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

#### Functionality
- [ ] All new features work as expected
- [ ] No regressions in existing features
- [ ] Audio plays correctly
- [ ] Images load properly
- [ ] Navigation works

#### Responsiveness
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

#### Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Sufficient color contrast

### Writing Tests (Optional)

If adding tests:

```javascript
// Example test
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component correctly', () => {
  render(<MyComponent name="Test" />);
  const element = screen.getByText(/Test/i);
  expect(element).toBeInTheDocument();
});
```

---

## Adding New Content

### Adding a New Pollutant

1. **Update Google Sheets**
   - Add row with all required fields
   - Ensure unique `id` and `Number`

2. **Add Audio File**
   - Create sound as `[Number].mp3`
   - Place in `public/sounds/`

3. **Update Navigation SVG** (if in category)
   - Edit expanded SVG component
   - Add clickable element

4. **Test**
   - Navigate to route
   - Verify data displays
   - Test audio playback

### Adding Images

1. **Optimize Image**
   ```bash
   # Compress before adding
   imagemin input.jpg --out-dir=output
   ```

2. **Add to Public Folder**
   ```
   public/
   └── pollutant-images/
       └── new-image.jpg
   ```

3. **Reference in Google Sheets**
   ```
   https://yourdomain.com/pollutant-images/new-image.jpg
   ```

---

## Component Development Guidelines

### Creating a New Component

1. **Create Component File**
   ```javascript
   // src/components/NewComponent.js
   import React from 'react';
   import './NewComponent.css';

   const NewComponent = ({ prop1, prop2 }) => {
     return (
       <div className="new-component">
         {/* Component content */}
       </div>
     );
   };

   export default NewComponent;
   ```

2. **Create CSS File**
   ```css
   /* src/components/NewComponent.css */
   .new-component {
     /* Styles */
   }
   ```

3. **Add PropTypes**
   ```javascript
   import PropTypes from 'prop-types';

   NewComponent.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.number,
   };
   ```

4. **Export from Index** (if needed)
   ```javascript
   // src/components/index.js
   export { default as NewComponent } from './NewComponent';
   ```

---

## Documentation Standards

### JSDoc Comments

```javascript
/**
 * Plays audio for a specific pollutant
 * @param {string} elementId - The pollutant identifier
 * @param {Object} options - Playback options
 * @param {boolean} options.loop - Whether to loop audio
 * @param {number} options.volume - Volume level (0-1)
 * @returns {Object|null} Audio control object or null
 */
function playElementSound(elementId, options = {}) {
  // Implementation
}
```

### README Updates

When adding features:
- Update feature list
- Add usage examples
- Update screenshots (if UI changed)

### Documentation Files

Keep docs up to date:
- `ARCHITECTURE.md` - For architectural changes
- `COMPONENTS.md` - For new components
- `AUDIO_SYSTEM.md` - For audio changes
- `DATA_STRUCTURE.md` - For data schema changes

---

## Performance Considerations

### Bundle Size

Check bundle size impact:

```bash
# Build and analyze
npm run build

# Check build/static/js/ for file sizes
```

Keep main bundle under 500KB (gzipped).

### Lazy Loading

Use code splitting for large components:

```javascript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>
```

### Audio Optimization

- Keep audio files under 1MB
- Use appropriate bitrate (128-192kbps)
- Test playback performance

---

## Getting Help

### Resources

- **Documentation**: Check `/docs` folder
- **Issues**: Browse existing issues
- **Discussions**: Join community discussions

### Contact

- **Email**: [Development team email]
- **Discord**: [Discord server link]
- **GitHub Discussions**: [Link to discussions]

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (if applicable)

Thank you for contributing to Sounding The Invisible! 🎵💧

---

*Last Updated: November 2025*

