<h1>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="width: 1em; height: 1em; vertical-align: -0.125em; fill: currentColor;">
    <path fill="currentColor" d="M224,0H32C14.43,0,0,14.43,0,32v192c0,17.57,14.43,32,32,32h192c17.57,0,32-14.43,32-32V32c0-17.57-14.43-32-32-32ZM223.93,216.59H31.93v-32.92h192.13l-.13,32.92ZM224.07,177.67h-28.38v-26.79l28.38.02v26.77ZM223.93,144.38H31.93v-32.92h192.13l-.13,32.92ZM31.93,105.84v-26.79l28.38.02v26.77h-28.38ZM223.93,72.33H31.93v-32.92h192.13l-.13,32.92Z"/>
</svg>
&nbsp;Slidebar — GitHub PR Sidebar Enhancer
</h1>

> [!IMPORTANT]
> GitHub actually addressed some of these issues! As of **August 2025**, their "Files Changed" experience update is in preview and includes:
>
> - Resizable sidebar 🎉
> - Full file names on hover 👏
> - No horizontal scrolling ❌ (still optional with Slidebar)
>
> If horizontal scrolling is a must-have for you, Slidebar is still here. Otherwise, consider uninstalling to reduce bloat. No hard feelings.
>
> _Even though I used this userscript privately and only shared it after GitHub's update, I'm gonna go ahead and take credit for inspiring them to fix their jank. You're welcome, internet._
>
> Read more: [GitHub Community Discussion - Improved pull request "Files Changed" experience feedback](https://github.com/orgs/community/discussions/163932)

---

**Finally, a PR sidebar that doesn't make you want to throw your mouse.**

Resize it. See full file names. Scroll when needed. You know, basic stuff GitHub forgot (update: they remembered! see above 👆).

---

## ✨ What you get

- **📐 Resizable sidebar** — Drag the edge to your heart's content (200-600px range)
- **💬 Smart tooltips** — Hover truncated file names to see the full path
- **↔️ Horizontal scrolling** — Optional side-scroll for those `really/deeply/nested/component/files/Button.tsx` names
- **💾 Persistent settings** — Your width preference survives refreshes
- **🎯 Zero-jank** — Handles GitHub's SPA navigation cleanly

---

## 🚀 Why Slidebar beats squinting

| Problem | GitHub's Take | Slidebar's Fix |
|---------|---------------|----------------|
| Long file names | `src/compon...tsx` 🤦 | Full names on hover or scroll |
| Sidebar too narrow | Deal with it | Drag to resize (persisted!) |
| Deep folder structures | Good luck | Make it wider, see everything |
| Settings | What settings? | Clean modal with all options |

---

## 📦 Installation

1. **Install** a userscript manager ([Tampermonkey](https://www.tampermonkey.net/) recommended)
2. **Click** the [raw script link](https://raw.githubusercontent.com/astromash/userscripts/main/scripts/github-slidebar/user.js)
3. **Confirm** installation when prompted
4. **Navigate** to any GitHub PR or compare page
5. **Hover** between the sidebar and content area to reveal the draggable edge
6. **Look** for the Slidebar icon in the toolbar to access settings

---

## ⚙️ Configuration

<div>
Click the Slidebar icon [
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="width: 1em; height: 1em; vertical-align: -0.125em; fill: currentColor;">
    <path fill="currentColor" d="M224,0H32C14.43,0,0,14.43,0,32v192c0,17.57,14.43,32,32,32h192c17.57,0,32-14.43,32-32V32c0-17.57-14.43-32-32-32ZM223.93,216.59H31.93v-32.92h192.13l-.13,32.92ZM224.07,177.67h-28.38v-26.79l28.38.02v26.77ZM223.93,144.38H31.93v-32.92h192.13l-.13,32.92ZM31.93,105.84v-26.79l28.38.02v26.77h-28.38ZM223.93,72.33H31.93v-32.92h192.13l-.13,32.92Z"/>
</svg>
] in the toolbar to open the settings modal.
</div>

### Options

- **Enable Sidebar Resizing** — Adds a draggable edge to the sidebar
- **Show Tooltips** — Display full file paths on hover for truncated items
- **Horizontal Scrolling** — Allow side-scrolling instead of truncation
- **Sidebar Width** — Manual width input (200-600px)

---

## 💡 Pro Tips

- **Optimal width**: Most find 350-400px hits the sweet spot
- **Performance**: Horizontal scrolling can feel sluggish on massive PRs - tooltips might be better
- **Reset**: Delete the stored config via your userscript manager to reset to defaults

---

## 🔒 Privacy & Permissions

**Zero tracking. Zero network calls. Pure local enhancement.**

**Permissions explained:**

- `GM_setValue` / `GM_getValue` — Store your preferences locally
- `GM_addStyle` — Inject the UI styles

---

## 📋 Compatibility

- **Sites**: GitHub PRs and compare pages
- **Browsers**: Chrome, Edge, Firefox, Safari, Opera, Maxthon (all the browsers I know of with userscript managers)

---

## 🐛 Known Issues

- **GitHub updates**: If GitHub changes their DOM structure, the script might need updates
- **Theme switching**: Should work with both light and dark themes (uses CSS variables)
- **Performance**: Very large PRs (1000+ files) might see slight lag with horizontal scrolling enabled

---

## 🧾 Changelog

### 1.0.0

- Complete rewrite for stability
- Fixed style assignment bug
- Added SPA navigation handling
- Improved memory management
- Better error handling and retry logic
- Consistent UI using GitHub's CSS variables

### 0.3.0

- Initial config modal
- Basic resize/tooltip/scroll features

---

**Slidebar** — Because GitHub has better things to do
_Trunc' popped by AstroMash_
