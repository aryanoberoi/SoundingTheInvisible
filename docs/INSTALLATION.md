# Installation Guide

This guide will help you set up the Sounding The Invisible project on your local machine.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 1GB free space
- **OS**: Windows 10+, macOS 10.14+, or Linux

### Recommended Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **RAM**: 8GB or more
- **Storage**: 2GB free space

### Check Your Current Versions

```bash
node --version
npm --version
```

---

## Installation Steps

### 1. Install Node.js and npm

If you don't have Node.js installed:

**Windows:**
- Download from [nodejs.org](https://nodejs.org/)
- Run the installer
- Restart your terminal

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Clone the Repository

```bash
# Using HTTPS
git clone <repository-url>

# Or using SSH
git clone git@<repository-url>

# Navigate to the project directory
cd SoundingTheInvisible
```

### 3. Install Dependencies

This will install all required packages listed in `package.json`:

```bash
npm install
```

**Expected installation time:** 2-5 minutes (depending on internet speed)

#### What Gets Installed

The installation includes:
- React and React DOM (v19.0.0)
- React Router DOM (v7.4.0)
- Material-UI components
- Audio processing libraries
- Build tools and development dependencies

### 4. Verify Installation

Check that all dependencies are installed correctly:

```bash
npm list --depth=0
```

You should see a list of installed packages without errors.

---

## Environment Configuration

### Environment Variables

Create a `.env` file in the project root (if needed for custom configuration):

```bash
# .env file
REACT_APP_API_URL=http://localhost:6000
REACT_APP_GA_MEASUREMENT_ID=G-27HKJ5REFB
```

### Available Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API URL for audio analytics | `http://localhost:6000` | No |
| `REACT_APP_GA_MEASUREMENT_ID` | Google Analytics tracking ID | Set in code | No |
| `NODE_ENV` | Environment mode | `development` | Auto-set |
| `PORT` | Development server port | `3000` | No |

### Google Sheets Configuration

The application uses Google Sheets for dynamic content. The sheet IDs are configured in:

**Homepage Content:**
- Sheet ID: `1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4`
- Sheet: `Sheet1`
- Used for: Homepage text sections

**Pollutant Data:**
- Sheet ID: `1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs`
- Sheet: `Sheet1`
- Used for: Pollutant information, plant data, audio mappings

#### To Use Custom Google Sheets

1. Make a copy of the existing sheets
2. Update the sheet IDs in:
   - `src/App.js` (line 102)
   - `src/Homepage.js` (line 30)
3. Ensure sheets are publicly accessible

---

## Running the Application

### Development Mode

Start the development server with hot reloading:

```bash
npm start
```

**Output:**
```
Compiled successfully!

You can now view soundingtheinvisible in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

The application will automatically open in your default browser at `http://localhost:3000`.

### Development Features

- **Hot Module Replacement (HMR)**: Changes appear instantly
- **Error Overlay**: Errors display in the browser
- **Lint on Save**: Code quality checks
- **Source Maps**: Debug original source code

### Custom Port

To run on a different port:

**Windows (PowerShell):**
```powershell
$env:PORT=3001; npm start
```

**macOS/Linux:**
```bash
PORT=3001 npm start
```

---

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Build Output

```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── [chunk].[hash].js
│   └── media/
│       └── [assets]
├── index.html
├── manifest.json
├── robots.txt
└── [other assets]
```

### Build Optimizations

- **Minification**: JavaScript and CSS are minified
- **Code Splitting**: Automatic chunking for better load times
- **Tree Shaking**: Unused code is removed
- **Asset Optimization**: Images and fonts are optimized
- **Cache Busting**: Hash-based filenames for cache control

### Test Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build
```

Access at `http://localhost:3000`

---

## Additional Scripts

### Run Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Eject Configuration

⚠️ **Warning: This is a one-way operation!**

```bash
npm run eject
```

This exposes all configuration files. Only use if you need full control over webpack, Babel, ESLint, etc.

---

## Troubleshooting

### Common Issues

#### 1. Installation Fails

**Problem:** `npm install` fails with errors

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 2. Port Already in Use

**Problem:** Port 3000 is already in use

**Solution:**
```bash
# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

#### 3. Audio Not Playing

**Problem:** Audio files don't play

**Checks:**
- Ensure `/public/sounds/` directory contains all MP3 files
- Check browser console for 404 errors
- Verify Web Audio API support in browser
- Click on page first (browsers require user interaction for audio)

#### 4. Google Sheets Data Not Loading

**Problem:** Content doesn't load from Google Sheets

**Checks:**
- Verify sheet IDs are correct
- Ensure sheets are publicly accessible (Share > Anyone with link can view)
- Check browser console for CORS errors
- Verify internet connection

#### 5. Build Fails

**Problem:** `npm run build` fails

**Solutions:**
```bash
# Check for linting errors
npm run build -- --verbose

# Increase memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

#### 6. Font Loading Issues

**Problem:** Custom fonts don't load

**Checks:**
- Verify `/fonts/` directory contains all font files
- Check `src/clash-grotesk.css` and `src/nippo.css` for correct paths
- Clear browser cache
- Check browser console for 404 errors

### Memory Issues

If you encounter memory errors during build:

```bash
# Increase Node.js memory limit
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### Dependency Conflicts

If you have dependency version conflicts:

```bash
# Use legacy peer dependencies flag
npm install --legacy-peer-deps
```

### Clear Everything and Start Fresh

```bash
# Remove all build artifacts and dependencies
rm -rf node_modules build package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Rebuild
npm run build
```

---

## Verification Checklist

After installation, verify:

- [ ] `npm start` runs without errors
- [ ] Application opens in browser at `http://localhost:3000`
- [ ] Homepage displays correctly
- [ ] Navigation menu opens and closes
- [ ] Audio toggle button works
- [ ] Can navigate to pollutant detail pages
- [ ] Images load correctly
- [ ] Fonts display properly (Clash Grotesk and Nippo)
- [ ] Responsive design works on mobile view
- [ ] Custom cursor appears and functions
- [ ] Google Sheets data loads

---

## Next Steps

Once installation is complete:

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
2. Review [COMPONENTS.md](./COMPONENTS.md) to learn about components
3. Check [AUDIO_SYSTEM.md](./AUDIO_SYSTEM.md) for audio implementation details
4. See [USAGE_GUIDE.md](./USAGE_GUIDE.md) for user-facing features

---

## Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](link-to-issues) for similar problems
2. Review the [FAQ section](link-to-faq)
3. Contact the development team
4. Create a new issue with:
   - Your operating system and version
   - Node.js and npm versions
   - Full error message
   - Steps to reproduce

---

*Last Updated: November 2025*

