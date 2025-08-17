# 🎯 CodePen.md — Copy as Markdown

> **Transform any CodePen into beautiful Markdown with one click.**
>
> Extract HTML, CSS, and JavaScript into clean code fences with proper syntax highlighting and optional attribution. No more manual copying between editors.

---

## ✨ What you get

**Example output**

    > Source: [Glassmorphism Card by AstroMash](https://codepen.io/astromash/pen/abc123)

    ```html
    <div class="glass-card">
      <h2>Beautiful Design</h2>
    </div>
    ```

    ```scss
    .glass-card {
      backdrop-filter: blur(20px);
      background: rgba(17, 24, 39, 0.95);

      h2 {
        font-weight: bolder;
      }
    }
    ```

    ```javascript
    const card = document.querySelector('.glass-card');
    card.addEventListener('click', () => shimmer());
    ```

---

## 🚀 Why CodePen.md beats copy-paste

<table>
  <tr>
    <td>⚡ Instant</td><td>One click or hotkey — no selecting, no switching editors</td>
  </tr>
  <tr>
    <td>🎨 Smart</td><td>Choose compiled HTML/CSS/JS or raw (selected preprocessor for each editor) with proper language tags</td>
  </tr>
  <tr>
    <td>🔗 Attributed</td><td>Auto-adds title, author, and link in a clean header</td>
  </tr>
  <tr>
    <td>🎯 Resilient</td><td>Works in Preview frame, falls back gracefully, handles clipboard blocks</td>
  </tr>
  <tr>
    <td>⌨️ Customizable</td><td>Set your own shortcut — any combo of CTRL/ALT/SHIFT/CMD + any key</td>
  </tr>
</table>

---

## 📦 Installation & Usage

### ⚡ Getting started

1. **Install** the userscript (Tampermonkey/Violentmonkey recommended)
2. **Navigate** to any CodePen editor page (`codepen.io/*/pen/*`)
3. **Look** for the sleek button combo in the bottom-right corner
4. **Click** Copy CodePen as Markdown or hit Alt+Shift+X
5. **Paste** your perfectly formatted Markdown anywhere

### ⚙️ Configuration panel

Click the **gear icon** to reveal a dark-themed options panel:

#### **🔧 Copy Options**

- **Copy compiled code** — Get processed output (SCSS→CSS or TS→JS, for example)
- **Add attribution header** — Include source link with title & author

#### **⌨️ Keyboard Shortcut**

- **Enable/disable** — Toggle keyboard activation
- **Customize combo** — Click Edit to set your perfect shortcut
- **Visual feedback** — See your current combo in a styled badge

---

## 🎨 Premium Features

- **Dark glassmorphism UI** — Subtle vibe, smooth flow
- **Split button design** — Main action + gear for options
- **Toast notifications** — Clear, non-intrusive feedback
- **Collapsible shortcut editor** — Compact when closed, full controls when open
- **Smart Escape handling** — Closes shortcut editor → panel → overlay in order
- **Preview frame support** — Shortcut works even when preview has focus
- **Sync everywhere** — Settings persist and sync to preview via `postMessage`

---

## 🔒 Privacy & Permissions

**Zero tracking, pure functionality**

**No analytics. No network calls. No data collection.** Everything runs locally.

**Permissions explained:**

- `GM_setClipboard` — Direct clipboard access when allowed
- `GM_notification` — Optional desktop notifications
- `GM_addStyle` — Injects the UI
- `GM_registerMenuCommand` — Right-click menu options
- `unsafeWindow` — Reads CodePen’s editor state

---

## 💡 Pro Tips

- **Windows users**: Skip Win (Meta) combos — the OS often intercepts them. Prefer Ctrl/Alt/Shift.
- **Preview frame**: Your shortcut works there too — the preview asks the parent for the Markdown.
- **Language tags**: Compiled = standard (`javascript`, `css`, `html`). Raw = preprocessor (`scss`, `typescript`).
- **Clipboard blocked?**: A one-click overlay appears to complete the copy.

---

## 📋 Compatibility

- **Browsers**: Chrome, Edge, Firefox, Safari, Opera, Maxthon (all the browsers I know of with userscript managers)
- **Sites**: `codepen.io/*/pen/*` and `cdpn.io/*` (preview)

---

## 🧾 Changelog

**2.3.0**

- New compact shortcut editor: collapsed badge row with expandable capture/config.
- Instant preview sync: options & shortcuts broadcast to `cdpn.io` via `postMessage`.
- Cleaner labels for special keys (F-keys, arrows, digits).
- Safer clipboard fallback with a one-click overlay.

**2.x**

- Split copy/gear button, sticky toasts, processed-vs-raw toggle, attribution header toggle.
- Preview-frame hotkey support and a robust parent↔preview messaging bridge.

---

**CodePen.md** — Because your code deserves better than screenshots.
Scripted by AstroMash in a fit of copy/paste frustration
