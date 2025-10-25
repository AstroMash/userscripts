# Userscripts Repository - AI Coding Guide

This is a Tampermonkey userscripts repository. Each script modifies specific websites to fix annoyances or add QOL features.

## Project Structure

Scripts live in `scripts/<script-name>/` with this standard structure:
- `user.js` - Main userscript with metadata header and implementation
- `meta.js` - Metadata-only file for update checking (subset of user.js header)
- `README.md` - Features, installation instructions, screenshots
- `icon.png` - Script icon (optional)

## Userscript Metadata Standards

All `user.js` and `meta.js` files MUST include Tampermonkey metadata headers:

```javascript
// ==UserScript==
// @name         Script Name
// @namespace    https://github.com/AstroMash/userscripts
// @version      X.Y.Z
// @description  Brief description
// @author       AstroMash
// @match        https://example.com/*
// @run-at       document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// @icon         https://raw.githubusercontent.com/astromash/userscripts/main/scripts/<script-name>/icon.png
// @downloadURL  https://raw.githubusercontent.com/astromash/userscripts/main/scripts/<script-name>/user.js
// @updateURL    https://raw.githubusercontent.com/astromash/userscripts/main/scripts/<script-name>/meta.js
// ==/UserScript==
```

**Critical**: Version numbers in `user.js` and `meta.js` MUST match. `meta.js` contains only the metadata block (no implementation).

## Code Patterns

### IIFE Wrapper
All scripts use strict mode IIFE:
```javascript
(function () {
    'use strict';
    // implementation
})();
```

### Storage Patterns
Scripts use either:
- **localStorage** (`codepen-md`): `localStorage.getItem/setItem` for simple key-value pairs
- **GM storage** (`github-slidebar`): `GM_getValue/GM_setValue` for objects with defaults:
  ```javascript
  const DEFAULT_CONFIG = { setting: true, width: 300 };
  let config = { ...DEFAULT_CONFIG, ...GM_getValue(STORAGE_KEY, {}) };
  ```

### SPA Navigation Handling
Scripts targeting SPAs (GitHub, CodePen) must handle dynamic navigation:
- Use retry mechanisms with `MAX_INIT_ATTEMPTS` counters for DOM-dependent initialization
- Implement `MutationObserver` to re-initialize on page changes
- Clean up observers and event listeners on navigation to prevent memory leaks
- Check `isInitialized` flags to prevent duplicate initialization

### Menu Commands (Tampermonkey)
Scripts can register menu commands via `GM_registerMenuCommand`. See `codepen-md/user.js` lines 83-200 for the pattern:
- Store menu command IDs to enable dynamic refresh via `GM_unregisterMenuCommand`
- Use checkmarks (`✓`) for toggleable preferences
- Include access keys for keyboard shortcuts

### Graceful Degradation
- Check if GM functions exist before using: `typeof GM_addStyle === 'function'`
- Provide fallbacks for unsupported features
- Handle missing DOM elements gracefully (retry or log)

## Development Workflow

### Creating a New Script
1. Create directory: `scripts/<script-name>/`
2. Create `user.js` with complete metadata header
3. Create `meta.js` (copy metadata block from `user.js`)
4. Create `README.md` with features and installation
5. Update root `README.md` to list the new script

### Testing
No automated tests. Manual testing checklist:
- Test on target site in different states (logged in/out, different page types)
- Verify SPA navigation works (if applicable)
- Test storage persistence across sessions
- Verify keyboard shortcuts and menu commands
- Check in Tampermonkey (primary) and Violentmonkey (secondary)

### Version Bumping
When updating a script:
1. Increment version in BOTH `user.js` AND `meta.js`
2. Versions must match exactly or updates will break
3. Use semantic versioning (major.minor.patch)

## Security & Best Practices

- **Minimize @grant permissions**: Only request what's needed
- **Avoid `eval()`**: Never use eval or similar unsafe practices
- **Validate page content**: Don't trust DOM data implicitly
- **Use safe DOM methods**: Prefer `textContent` over `innerHTML` when possible
- **Be mindful of CSP**: Some sites have strict Content Security Policies

## Distribution

Scripts are distributed via:
- GitHub raw URLs (primary - users click "Raw" on `user.js`)
- Greasy Fork (external mirror at https://greasyfork.org/en/users/1449331-astromash)

Update mechanism: Tampermonkey polls `@updateURL` (meta.js) for version changes, then downloads from `@downloadURL` (user.js).

## Local Development

The `.local-only/` directory is gitignored for personal/private scripts that should never be pushed to the public repository. Scripts in this directory are only used locally and don't follow the standard project structure - they can be single-file userscripts without the accompanying `meta.js`, `README.md`, or `icon.png` files required for public scripts.
