# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a userscripts repository containing browser userscripts for Tampermonkey and similar managers. Each script is organized in its own directory under `scripts/` with the following standard structure:

```
scripts/
├── script-name/
│   ├── user.js       # Main userscript file with userscript metadata header
│   ├── meta.js       # Metadata-only file for update checking
│   ├── README.md     # Documentation with features and installation
│   └── icon.png      # Script icon
```

## Userscript Standards

### Metadata Headers
All userscripts use standard Tampermonkey metadata headers in both `user.js` and `meta.js`:
- `@name`, `@namespace`, `@version`, `@description`, `@author`
- `@match` patterns for target websites
- `@grant` permissions (GM_setValue, GM_getValue, GM_setClipboard, etc.)
- `@license MIT`
- `@icon`, `@downloadURL`, `@updateURL` pointing to GitHub raw URLs

### Code Structure
- Scripts wrapped in IIFE: `(function () { 'use strict'; ... })()`
- Constants defined at top (APP_NAME, storage keys, defaults)
- Configuration objects with default values
- Clean separation of concerns (initialization, UI, event handlers)
- Graceful handling of SPA navigation and DOM mutations

### Storage Patterns
- Use `GM_getValue`/`GM_setValue` for persistent configuration
- Merge defaults with stored config: `{ ...DEFAULT_CONFIG, ...GM_getValue(key, {}) }`
- Store complex objects as JSON when needed

## Development Guidelines

### File Organization
- Keep each script self-contained in its directory
- Include comprehensive README.md with features, installation, and screenshots
- Use descriptive icons (typically PNG format)
- Maintain version consistency between `user.js` and `meta.js`

### Code Quality
- Use modern JavaScript (ES6+) features
- Implement proper error handling and fallbacks
- Add retry mechanisms for DOM-dependent initialization
- Use MutationObserver for dynamic content handling
- Clean up event listeners and observers on navigation

### Security Considerations
- Minimize granted permissions (`@grant`)
- Validate input from page content
- Use safe DOM manipulation methods
- Avoid `eval()` and similar unsafe practices
- Be mindful of CSP restrictions on target sites

## Testing

No automated testing framework is configured. Manual testing approach:
- Test on target websites with different states (logged in/out, different page types)
- Verify cross-browser compatibility (Chrome, Firefox, Safari with respective managers)
- Test SPA navigation and page refresh scenarios
- Validate storage persistence across sessions

## Distribution

Scripts are distributed via:
- GitHub raw URLs (primary installation method)
- Greasy Fork (external mirror)
- Direct download from repository

Update mechanism uses `@updateURL` pointing to `meta.js` for version checking.