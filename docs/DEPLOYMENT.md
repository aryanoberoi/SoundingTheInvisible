# Deployment Guide

Complete guide to deploying Sounding The Invisible to production.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Building for Production](#building-for-production)
- [Deployment Platforms](#deployment-platforms)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment](#post-deployment)
- [Continuous Deployment](#continuous-deployment)
- [Rollback Procedures](#rollback-procedures)

---

## Pre-Deployment Checklist

### Code Readiness

- [ ] All features tested locally
- [ ] No console errors in production build
- [ ] All linter warnings resolved
- [ ] Code reviewed and approved
- [ ] Git commits are clean and descriptive

### Content Verification

- [ ] Google Sheets are publicly accessible
- [ ] All audio files (1.mp3 - 50.mp3, 999.mp3) are in `public/sounds/`
- [ ] All images load correctly
- [ ] Text content is finalized
- [ ] No "Work in Progress" placeholders in critical content

### Configuration

- [ ] `package.json` `homepage` field is set correctly
- [ ] Environment variables are configured
- [ ] Google Analytics tracking ID is correct
- [ ] API URLs point to production endpoints

### Testing

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test all routes (`/`, `/:pollutant`, `/playtest`)
- [ ] Audio playback works on all browsers
- [ ] Responsive design works at all breakpoints
- [ ] Performance is acceptable (Lighthouse score >80)

---

## Building for Production

### 1. Clean Build

```bash
# Remove previous build artifacts
rm -rf build

# Clear node_modules cache
rm -rf node_modules/.cache

# Create fresh production build
npm run build
```

### 2. Build Output

```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  250.5 kB  build/static/js/main.[hash].js
  15.2 kB   build/static/css/main.[hash].css
  
The project was built assuming it is hosted at /.
```

### 3. Test Production Build Locally

```bash
# Install serve globally (one time)
npm install -g serve

# Serve the build folder
serve -s build -l 3000

# Open http://localhost:3000
```

### 4. Verify Production Build

**Checks**:
- All routes work (including dynamic routes)
- Audio plays correctly
- Images load
- Fonts render properly
- No 404 errors in console
- Google Sheets data loads
- Analytics fires correctly

---

## Deployment Platforms

### Option 1: Vercel (Recommended)

**Advantages**:
- Zero configuration
- Automatic HTTPS
- Global CDN
- Built-in analytics
- GitHub integration
- Preview deployments

#### Deploy to Vercel

**Method 1: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Method 2: Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your Git repository
4. Configure project:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Click "Deploy"

#### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### Environment Variables on Vercel

1. Go to project settings
2. Navigate to "Environment Variables"
3. Add variables:
   - `REACT_APP_API_URL`: Backend API URL
   - `REACT_APP_GA_MEASUREMENT_ID`: Google Analytics ID

---

### Option 2: Netlify

**Advantages**:
- Simple deployment
- Automatic HTTPS
- Form handling
- Serverless functions
- GitHub integration

#### Deploy to Netlify

**Method 1: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Method 2: Netlify Dashboard**

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect repository
4. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
5. Click "Deploy site"

#### Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Option 3: GitHub Pages

**Advantages**:
- Free hosting
- Direct from GitHub repo
- Simple setup

#### Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/soundingtheinvisible",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository settings
   - Navigate to "Pages"
   - Select `gh-pages` branch
   - Save

#### Note on Routing

GitHub Pages doesn't support client-side routing out of the box. Add a `404.html` that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Sounding The Invisible</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

---

### Option 4: Traditional Web Server

**Platforms**: DigitalOcean, AWS, Azure, etc.

#### Requirements

- Node.js server or static file server
- HTTPS certificate
- Domain name

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/soundingtheinvisible/build;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    
    # Cache static assets
    location /static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing
    location / {
        try_files $uri /index.html;
    }
}
```

#### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    Redirect / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /var/www/soundingtheinvisible/build
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css application/javascript
    </IfModule>
    
    # Cache static assets
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
    
    # SPA routing
    <Directory /var/www/soundingtheinvisible/build>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

---

## Environment Configuration

### Production Environment Variables

Create `.env.production` file:

```bash
# API Configuration
REACT_APP_API_URL=https://api.yourdomain.com

# Analytics
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# App Configuration
REACT_APP_ENV=production
```

### Environment-Specific Builds

```bash
# Development build
npm run build

# Production build with .env.production
NODE_ENV=production npm run build

# Staging build with .env.staging
REACT_APP_ENV=staging npm run build
```

---

## Post-Deployment

### 1. Smoke Testing

Test critical paths immediately after deployment:

```bash
# Homepage loads
curl -I https://yourdomain.com/

# Pollutant page loads
curl -I https://yourdomain.com/lead

# Static assets load
curl -I https://yourdomain.com/static/js/main.[hash].js
```

### 2. Browser Testing

- Open site in multiple browsers
- Check console for errors
- Verify audio playback
- Test mobile responsiveness
- Check all routes work

### 3. Performance Testing

Run Lighthouse audit:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://yourdomain.com --view
```

**Target Scores**:
- Performance: >80
- Accessibility: >90
- Best Practices: >90
- SEO: >80

### 4. Analytics Verification

- Check Google Analytics dashboard
- Verify page views are being tracked
- Test event tracking (if implemented)

### 5. Error Monitoring

Set up error monitoring (optional):

```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.REACT_APP_ENV,
});
```

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test -- --watchAll=false
        
      - name: Build
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}
          REACT_APP_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Rollback Procedures

### Vercel Rollback

1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find previous working deployment
4. Click "Promote to Production"

### Netlify Rollback

1. Go to Netlify dashboard
2. Navigate to "Deploys"
3. Find previous deployment
4. Click "Publish deploy"

### Manual Rollback

```bash
# Checkout previous version
git checkout <previous-commit-hash>

# Rebuild
npm run build

# Redeploy
npm run deploy
```

---

## Domain Configuration

### Custom Domain Setup

#### Vercel

1. Go to project settings
2. Navigate to "Domains"
3. Add domain: `www.yourdomain.com`
4. Update DNS:
   ```
   CNAME  www  cname.vercel-dns.com
   ```

#### Netlify

1. Go to site settings
2. Navigate to "Domain management"
3. Add custom domain
4. Update DNS:
   ```
   CNAME  www  your-site.netlify.app
   ```

### SSL/HTTPS

Both Vercel and Netlify automatically provision SSL certificates via Let's Encrypt.

For traditional servers:

```bash
# Using Certbot (Let's Encrypt)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Performance Optimization

### CDN Configuration

- Enable CDN on hosting platform
- Configure cache headers
- Use image CDN for media assets

### Asset Optimization

```bash
# Optimize images before deployment
npm install -g imagemin-cli

imagemin public/*.{jpg,png} --out-dir=public/optimized

# Compress audio files
npm install -g @ffmpeg-installer/ffmpeg
ffmpeg -i input.mp3 -b:a 128k output.mp3
```

### Lazy Loading

Implement code splitting:

```javascript
// App.js
const PollutantPage = React.lazy(() => import('./PollutantPage'));

<Suspense fallback={<Loader />}>
  <PollutantPage />
</Suspense>
```

---

## Monitoring

### Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

### Performance Monitoring

- Vercel Analytics (built-in)
- Google Analytics
- Lighthouse CI

### Error Tracking

- Sentry
- LogRocket
- Bugsnag

---

## Backup Strategy

### Code Backup

- Git repository (primary backup)
- GitHub/GitLab/Bitbucket (remote backup)
- Local clones on multiple machines

### Asset Backup

```bash
# Backup audio files
tar -czf sounds-backup-$(date +%Y%m%d).tar.gz public/sounds/

# Backup images
tar -czf images-backup-$(date +%Y%m%d).tar.gz public/*.{png,jpg,svg}
```

### Google Sheets Backup

1. File > Download > Comma Separated Values (.csv)
2. Store in version control or cloud storage
3. Automate with Google Apps Script

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] SSL certificate valid
- [ ] No sensitive data in client-side code
- [ ] Environment variables not exposed
- [ ] Content Security Policy headers set
- [ ] CORS configured correctly
- [ ] Dependencies have no known vulnerabilities (`npm audit`)

---

## Troubleshooting Deployment

### Build Fails

```bash
# Check for errors
npm run build 2>&1 | tee build.log

# Common fixes
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 Errors

- Ensure SPA routing is configured
- Check `homepage` field in `package.json`
- Verify redirect rules in hosting platform

### Assets Not Loading

- Check asset paths (relative vs absolute)
- Verify files exist in build folder
- Check CORS headers
- Test asset URLs directly

### Performance Issues

- Run Lighthouse audit
- Check bundle size: `npm run build -- --stats`
- Optimize images and audio
- Enable compression

---

*Last Updated: November 2025*

