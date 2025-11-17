# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

We take the security of Sounding The Invisible seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT Publicly Disclose

**Do not** create a public GitHub issue for security vulnerabilities. This could put users at risk.

### 2. Report Privately

Send a detailed report to:

**Email**: [security@example.com] (replace with actual security contact)

**Include in your report**:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information

### 3. What to Expect

- **Response Time**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Status Updates**: Every 7 days until resolved
- **Fix Timeline**: Based on severity (see below)

### 4. Severity Levels

| Severity | Response Time | Fix Timeline |
|----------|---------------|--------------|
| Critical | < 24 hours    | < 7 days     |
| High     | < 48 hours    | < 30 days    |
| Medium   | < 7 days      | < 90 days    |
| Low      | < 14 days     | Next release |

---

## Security Measures

### Current Security Implementations

#### 1. Frontend Security

**Content Security Policy**:
```javascript
// Recommended CSP headers
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' https: data:; 
  font-src 'self' data:; 
  connect-src 'self' https://docs.google.com https://opensheet.vercel.app;
  media-src 'self';
```

**XSS Prevention**:
- React's built-in XSS protection via JSX
- Sanitized user input
- Limited use of `dangerouslySetInnerHTML` (only for trusted Google Sheets content)

**HTTPS Enforcement**:
- All production deployments require HTTPS
- Strict Transport Security (HSTS) headers
- Secure cookie flags

#### 2. Data Security

**Google Sheets**:
- Read-only public access
- No sensitive data stored
- No user authentication required

**LocalStorage**:
- Only stores audio mute preference
- No sensitive data
- Client-side only

**No Backend Database**:
- Reduced attack surface
- No SQL injection risk
- No user data stored

#### 3. Dependency Security

**Regular Updates**:
- Automated dependency scanning
- Monthly security audits
- Prompt patching of vulnerabilities

**Audit Command**:
```bash
npm audit
npm audit fix
```

#### 4. Build Security

**Source Code**:
- No secrets in repository
- Environment variables for sensitive data
- `.gitignore` for local secrets

**Build Process**:
- Clean builds from source
- Verified dependencies
- Hash-based asset names

---

## Known Security Considerations

### 1. Google Sheets Access

**Current State**: 
- Sheets are publicly accessible (read-only)
- No authentication required

**Risk**: 
- Low - No sensitive data in sheets
- Content could be modified by sheet owners

**Mitigation**:
- Only trusted team members have edit access
- Regular content reviews
- Version control for sheet structure

### 2. Third-Party Dependencies

**Current State**:
- Uses npm packages from public registry
- Dependencies updated regularly

**Risk**:
- Medium - Supply chain attacks possible
- Malicious package updates

**Mitigation**:
- Lock file (`package-lock.json`) ensures consistent versions
- Regular security audits
- Monitoring for known vulnerabilities

### 3. Audio Files

**Current State**:
- Audio served from public directory
- No authentication required

**Risk**:
- Low - Audio files are public content
- Could be accessed directly

**Mitigation**:
- This is intentional - educational content
- No DRM or protection needed

### 4. Client-Side Analytics

**Current State**:
- Google Analytics tracking
- Vercel Analytics

**Risk**:
- Low - Privacy considerations
- Data collected by third parties

**Mitigation**:
- Anonymous analytics only
- No personally identifiable information
- Users can block with browser extensions

---

## Security Best Practices for Developers

### 1. Environment Variables

**Never commit**:
- API keys
- Secret tokens
- Private credentials

**Use `.env` files**:
```bash
# .env.local (add to .gitignore)
REACT_APP_API_KEY=your_key_here
```

### 2. Dependencies

**Before installing**:
```bash
# Check package reputation
npm view package-name

# Check for known vulnerabilities
npm audit

# Use exact versions in production
npm install --save-exact package-name
```

### 3. Code Review

**Security checklist**:
- [ ] No hardcoded secrets
- [ ] Input sanitization
- [ ] Error handling doesn't expose sensitive info
- [ ] HTTPS for all external requests
- [ ] Proper CORS configuration
- [ ] No `eval()` or dynamic code execution

### 4. Deployment

**Production checklist**:
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables set
- [ ] Dependencies updated
- [ ] No debug code
- [ ] Error tracking configured

---

## Disclosure Policy

### Coordinated Disclosure

We practice **Coordinated Disclosure**:

1. **Private Report**: You report vulnerability privately
2. **Investigation**: We investigate and develop fix
3. **Patch Release**: We release patch
4. **Public Disclosure**: After users have time to update (typically 30 days), we publicly disclose

### Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

**2025**
- (No reports yet)

**Previous Years**
- (None)

---

## Security Updates

### Notification Channels

Security updates are announced via:

1. **GitHub Security Advisories**: [Link to advisories]
2. **Release Notes**: [CHANGELOG.md](CHANGELOG.md)
3. **Email**: Mailing list (if available)
4. **Website**: Security page

### Subscribing to Updates

**GitHub Watch**:
1. Click "Watch" on GitHub repository
2. Select "Custom"
3. Enable "Security alerts"

**Email Notifications**:
1. Star the repository
2. Enable notifications
3. Subscribe to security advisories

---

## Vulnerability Response Process

### 1. Report Received

- Acknowledge receipt within 48 hours
- Assign severity level
- Create private tracking issue

### 2. Triage & Investigation

- Verify vulnerability
- Assess impact
- Determine affected versions
- Identify fix approach

### 3. Fix Development

- Develop patch
- Test thoroughly
- Prepare release notes
- Create security advisory draft

### 4. Release

- Tag new version
- Publish release
- Update documentation
- Notify users

### 5. Public Disclosure

- After 30 days (or sooner if agreed)
- Publish security advisory
- Credit researcher (if desired)
- Update this document

---

## Security Contacts

### Primary Contact

**Security Team Email**: [security@example.com]

**Response Time**: < 48 hours

### Secondary Contact

**Project Lead**: [lead@example.com]

**GitHub**: @username

---

## Legal

### Safe Harbor

We support safe harbor for security researchers who:

- Make good faith effort to avoid privacy violations
- Do not access unnecessary data
- Do not exploit vulnerability beyond demonstration
- Report vulnerabilities promptly
- Do not publicly disclose without coordination

**We will not take legal action** against researchers who follow these guidelines.

### Disclaimer

This security policy is provided "as is" without warranty. While we strive for security, no system is 100% secure.

---

## Historical Security Issues

### 2025

**None reported**

### Previous Years

**None**

---

## Additional Resources

### Security Documentation

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

### Security Tools

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [Dependabot](https://github.com/dependabot)
- [OWASP ZAP](https://www.zaproxy.org/)

### Contact Information

- **Security Email**: [security@example.com]
- **GitHub Issues**: [Link] (for non-security issues)
- **Documentation**: [docs/README.md](docs/README.md)

---

## Acknowledgments

We thank the security research community for helping keep Sounding The Invisible safe.

---

*Last Updated: November 2025*

*This policy is subject to change. Check back regularly for updates.*

