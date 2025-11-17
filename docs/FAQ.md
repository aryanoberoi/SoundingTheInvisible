# Frequently Asked Questions (FAQ)

Common questions and answers about Sounding The Invisible.

## Table of Contents

- [General Questions](#general-questions)
- [Technical Questions](#technical-questions)
- [Content & Data](#content--data)
- [Audio System](#audio-system)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## General Questions

### What is Sounding The Invisible?

Sounding The Invisible is an interactive web application that transforms invisible water pollutants into visible and audible experiences. It combines art, science, and technology to educate users about water contamination and phytoremediation (using plants to clean polluted water).

### Who is this project for?

- **Educators**: Teaching tool for environmental science
- **Students**: Learning resource for water pollution
- **Researchers**: Database of phytoremediation plants
- **General Public**: Raising awareness about water quality
- **Policy Makers**: Data for environmental decisions

### Is this project free to use?

Yes! The project is open source under the Apache 2.0 license and free to access, use, and modify.

### How accurate is the scientific data?

All data is sourced from peer-reviewed scientific literature, environmental databases, and documented case studies. We strive for accuracy and update information regularly.

### Can I use this for my class/presentation?

Absolutely! The project is designed for educational use. Please provide attribution to the project and its creators.

### How do I cite this project?

```
Sounding The Invisible. (2025). An Interactive Audio-Visual Experience 
Exploring Water Pollution and Phytoremediation. TBA21–Academy. 
Retrieved from [website URL]
```

---

## Technical Questions

### Which browsers are supported?

**Fully Supported**:
- Chrome (latest 2 versions) - **Recommended**
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**Minimum Requirements**:
- Web Audio API support
- CSS Grid and Flexbox
- ES6+ JavaScript
- SVG rendering

### Why doesn't the site work in Internet Explorer?

Internet Explorer is not supported as it lacks modern web standards including Web Audio API, ES6+ JavaScript features, and many CSS properties. Please use a modern browser.

### Does this work on mobile devices?

Yes! The entire site is fully responsive and optimized for:
- iOS (Safari, Chrome)
- Android (Chrome, Firefox, Samsung Internet)
- Tablets (iPad, Android tablets)

### Do I need an internet connection?

Yes, currently the app requires internet for:
- Loading Google Sheets data
- Fetching audio files
- Loading images

Offline mode is planned for future releases.

### What are the system requirements?

**Minimum**:
- Any modern device (desktop, laptop, tablet, phone)
- 2GB RAM
- Modern browser
- Internet connection
- Audio output capability

**Recommended**:
- 4GB+ RAM
- Chrome browser
- High-speed internet
- Headphones for best audio experience

### Why is the page loading slowly?

**Common causes**:
1. Slow internet connection
2. First visit (assets need to download)
3. Large audio files loading
4. Many browser tabs open

**Solutions**:
- Wait for initial load (subsequent visits will be faster)
- Close unnecessary browser tabs
- Check internet connection
- Clear browser cache and reload

### Can I run this locally without internet?

Yes, for development:
```bash
npm start
```

However, Google Sheets data and some assets still require internet.

---

## Content & Data

### How many pollutants are documented?

Currently 50+ pollutants across 4 main categories:
- Agriculture waste
- Heavy metal waste
- Radioactive waste
- Sewage waste

### How many plant species are in the database?

Over 100 plant species with phytoremediation capabilities are documented.

### Where does the data come from?

Data sources include:
- Peer-reviewed scientific journals
- Environmental Protection Agency (EPA) databases
- World Health Organization (WHO) reports
- Academic research institutions
- Historical case study documentation

### How often is the data updated?

Data is stored in Google Sheets and can be updated at any time without code changes. Major updates occur quarterly, with critical corrections made as needed.

### Can I suggest adding a new pollutant?

Yes! Please:
1. Open a GitHub issue
2. Provide scientific sources
3. Include relevant data (health effects, remediation methods, etc.)
4. Suggest an audio representation (optional)

### Why is some data marked "Work in Progress"?

We're continuously improving and expanding the database. "Work in Progress" indicates:
- Data collection in progress
- Awaiting verification
- Content being developed

These entries are filtered out in the public view.

### In how many languages are plant names available?

Plant common names are provided in 19 languages:
English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Bengali, Turkish, Vietnamese, Thai, Indonesian, Swahili

---

## Audio System

### Why can't I hear any audio?

**Common causes & solutions**:

1. **User Interaction Required**
   - Click anywhere on the page first
   - Browsers require user interaction before playing audio

2. **Muted State**
   - Check the sound toggle button (top right)
   - Ensure it's not showing the muted icon

3. **System Volume**
   - Check your device's volume settings
   - Ensure not muted in system tray

4. **Browser Settings**
   - Check site permissions for audio
   - Ensure browser audio isn't muted

5. **Audio Files Missing**
   - In development: Verify files in `public/sounds/`
   - Check browser console for 404 errors

### What creates the pollutant sounds?

Each pollutant's sound is created through a process called sonification, where data characteristics (molecular weight, toxicity, etc.) are translated into audio parameters (frequency, amplitude, timbre).

### Why does audio lag sometimes?

**Causes**:
- Browser audio buffer issues
- High system load
- Slow internet connection
- Multiple sounds playing simultaneously

**Solutions**:
- Close other applications
- Use Chrome for best performance
- Reduce number of browser tabs
- Clear browser cache

### Can I download the audio files?

The audio files are not directly downloadable through the interface. For research or educational use, please contact the development team.

### How are sounds looped seamlessly?

We use an overlapping loop technique where:
1. The next audio iteration starts before the current one ends
2. A crossfade happens during overlap
3. The previous iteration fades out
4. This creates seamless, gap-free loops

### Why does audio click or pop sometimes?

This shouldn't happen in normal use. If it does:
- Ensure fade effects are enabled
- Check system audio settings
- Try a different browser
- Report the issue if it persists

---

## Development

### How do I set up the development environment?

See the [Installation Guide](INSTALLATION.md) for detailed instructions:

```bash
git clone <repository-url>
cd SoundingTheInvisible
npm install
npm start
```

### What's the tech stack?

- **Frontend**: React 19, React Router 7
- **UI**: Material-UI, Styled Components
- **Audio**: Web Audio API, custom AudioService
- **Data**: Google Sheets API, PapaParse
- **Build**: Create React App, Webpack

See [Architecture Documentation](ARCHITECTURE.md) for details.

### How do I add a new pollutant?

1. Update Google Sheets with new row
2. Add audio file (`[number].mp3`) to `public/sounds/`
3. Update navigation SVG (if applicable)
4. Test the new page

See [Data Structure Guide](DATA_STRUCTURE.md) for schema.

### Where is the data stored?

Data is stored in Google Sheets:
- **Homepage content**: Sheet 1
- **Pollutant data**: Sheet 2

This allows non-technical updates without code changes.

### How do I modify the audio system?

The audio system is centralized in `src/AudioService.js`. See the [Audio System Guide](AUDIO_SYSTEM.md) for detailed documentation.

### Can I use TypeScript?

The project is currently JavaScript-based, but TypeScript is partially configured. You can add `.ts`/`.tsx` files and they will be compiled.

### How do I run tests?

```bash
npm test
```

Note: Test coverage is currently minimal. Contributions to test suite are welcome!

---

## Deployment

### How do I deploy to production?

See the [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

**Quick steps**:
1. Build: `npm run build`
2. Test build: `serve -s build`
3. Deploy to hosting platform (Vercel, Netlify, etc.)

### Which hosting platforms are recommended?

**Recommended**:
- **Vercel** - Zero config, excellent performance
- **Netlify** - Easy setup, great features
- **GitHub Pages** - Free, simple

See [Deployment Guide](DEPLOYMENT.md) for platform-specific instructions.

### Do I need a backend server?

No! This is a fully static site. However, you can optionally add a backend for:
- Audio playback analytics
- User accounts
- Advanced features

### How do I configure environment variables?

Create `.env.production`:
```bash
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

See [Environment Configuration](DEPLOYMENT.md#environment-configuration).

### How do I set up a custom domain?

This depends on your hosting platform:
- **Vercel**: Add domain in project settings
- **Netlify**: Add domain in site settings
- **Custom server**: Configure DNS A/CNAME records

See [Domain Configuration](DEPLOYMENT.md#domain-configuration).

---

## Contributing

### How can I contribute?

Many ways to contribute:
- Fix bugs
- Add features
- Improve documentation
- Add tests
- Improve accessibility
- Optimize performance
- Add new pollutants/plants

See [Contributing Guide](CONTRIBUTING.md) for details.

### I found a bug. What should I do?

1. Check if it's already reported in GitHub Issues
2. If not, open a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, version)

### I have a feature idea. How do I propose it?

1. Open a GitHub issue with "Feature Request" label
2. Describe:
   - What problem it solves
   - How it should work
   - Why it's valuable
   - Any alternatives considered

### Do I need to know React to contribute?

Not necessarily! You can contribute by:
- Updating documentation
- Adding data to Google Sheets
- Designing visuals
- Testing and reporting bugs
- Improving copy/text
- Translating content

### How do I get my PR merged?

1. Follow [Contributing Guidelines](CONTRIBUTING.md)
2. Write clean, documented code
3. Test thoroughly
4. Update documentation
5. Respond to review feedback
6. Be patient and respectful

### Are there any good first issues?

Yes! Look for issues labeled:
- `good first issue`
- `help wanted`
- `documentation`
- `beginner friendly`

---

## Accessibility

### Is the site accessible?

Yes! We prioritize accessibility:
- Keyboard navigation support
- Screen reader compatible
- ARIA labels on interactive elements
- High contrast text
- Alt text on images

### Can I navigate without a mouse?

Yes! Full keyboard navigation:
- `Tab`: Move forward
- `Shift + Tab`: Move backward
- `Enter`/`Space`: Activate
- `Escape`: Close menus

### Does it work with screen readers?

Yes, tested with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### How can I improve accessibility?

Contributions welcome! Areas to improve:
- ARIA label coverage
- Color contrast
- Focus indicators
- Screen reader announcements

---

## Performance

### Why is the site slow?

**Possible causes**:
- First visit (assets downloading)
- Slow internet connection
- Many audio files loading
- Device limitations

**Check**:
- Network tab in browser dev tools
- Lighthouse performance audit
- System resource usage

### How can I improve performance?

**For Users**:
- Use Chrome browser
- Close unnecessary tabs
- Clear browser cache
- Ensure good internet connection

**For Developers**:
- Optimize images
- Lazy load components
- Reduce bundle size
- Enable caching

See [Performance Optimization](DEPLOYMENT.md#performance-optimization).

### What's the recommended bundle size?

Target: < 500KB (gzipped) for main bundle

Check current size:
```bash
npm run build
# Check build/static/js/ for bundle sizes
```

---

## Troubleshooting

### The page is blank/white

**Solutions**:
1. Check browser console for errors
2. Ensure JavaScript is enabled
3. Clear cache and reload (Ctrl+Shift+R)
4. Try different browser
5. Check internet connection

### Images won't load

**Solutions**:
1. Check internet connection
2. Verify image URLs in Google Sheets
3. Clear browser cache
4. Check CORS settings (for developers)

### Navigation menu won't open

**Solutions**:
1. Check JavaScript is enabled
2. Try different browser
3. Clear browser cache
4. Check for JavaScript errors in console

### Audio won't play on mobile

**Solutions**:
1. Tap the page to enable audio
2. Check device isn't in silent mode
3. Ensure browser has audio permission
4. Try different mobile browser

### Build fails

**Solutions**:
```bash
# Clear everything
rm -rf node_modules build package-lock.json

# Reinstall
npm cache clean --force
npm install

# Rebuild
npm run build
```

---

## Still Have Questions?

### Resources

- 📖 [Full Documentation](README.md)
- 🏗️ [Architecture Guide](ARCHITECTURE.md)
- 🔧 [Installation Guide](INSTALLATION.md)
- 📱 [Usage Guide](USAGE_GUIDE.md)

### Contact

- 📧 Email: [support email]
- 🐙 GitHub Issues: [issues link]
- 💬 Discussions: [discussions link]
- 🌐 Website: [website link]

### Community

- Join our discussions
- Follow development updates
- Connect with other users
- Share your implementations

---

*Can't find your question? [Open an issue](link) or [contact us](link)!*

---

*Last Updated: November 2025*

