# CLAUDE.md — DJUMPERFORMANCE

This file is read by Claude Code at the start of every session.
Never delete or truncate it. Add to it as the project evolves.

---

## 🎬 Project Identity

**Name:** DJUMPERFORMANCE  
**Type:** Independent film production house — static website  
**Domain:** djumperformance.com (GitHub Pages, see `CNAME`)  
**Language:** Bilingual FR/EN (French primary, English secondary)  
**Tagline:** *La performance d'un rêve* / *The performance of a dream*  
**Location:** Paris, France  
**Stage:** Early — growing from short films toward a full production house  

---

## 🌌 Brand Identity (NON-NEGOTIABLE)

This is the single most important section. Every design decision must align with it.

### Visual Universe
- **Concept:** Deep space, starry night sky, cinematic darkness
- **Mood:** Premium, cinematic, editorial, poetic — never generic SaaS
- **Background:** Near-black (`#05060A`) with animated twinkling stars
- **Accent:** Gold (`#C9A84C`) — used sparingly as the only warm element
- **Text:** Off-white (`#F0EEE6`) on dark, never pure white

### Design Tokens (replicate in every file until shared CSS exists)
```css
--gold: #C9A84C;
--gold-dim: #8a6e2f;
--gold-light: #e8c97a;
--star-white: #F0EEE6;
--bg: #05060A;
--bg2: #0B0D14;
--bg3: #0f1119;
--text-muted: #7A7D8A;
--serif: 'Cormorant Garamond', Georgia, serif;
--mono: 'Space Mono', monospace;
```

### Typography Rules
- **Headings:** Cormorant Garamond — italic for poetry, bold for impact
- **UI / labels / nav:** Space Mono — uppercase, wide letter-spacing
- **Body:** Cormorant Garamond 300 weight, generous line-height (1.8–1.9)
- **NEVER use:** Inter, Roboto, Arial, Space Grotesk, or any generic SaaS font

### Forbidden Patterns (Impeccable anti-patterns)
- ❌ Purple or blue gradients
- ❌ Rounded card grids (generic SaaS layout)
- ❌ Centered hero with Inter font
- ❌ Emoji in navigation or UI controls
- ❌ Bounce easing on animations
- ❌ Dark glows or neon effects
- ❌ Any pattern that looks "AI-generated" or generic

---

## 🗂️ Current Architecture

```
djumperformance/
├── CLAUDE.md                        ← This file
├── README.md                        ← Auto-updated architecture doc
├── CNAME                            ← djumperformance.com
├── index.html                       ← Main page (Hero + Univers + Projets + Rejoindre + Soutenir + Contact)
├── a-propos.html                    ← "7 règles cosmiques" + founder
├── candidature-talent.html          ← Multi-step form — actors
├── candidature-technique.html       ← Multi-step form — crew
├── candidature-lieu.html            ← Multi-step form — locations/sponsors
├── assets/
│   └── images/
│       ├── projets/                 ← Project thumbnails
│       ├── bts/                     ← Behind the scenes
│       └── og/                      ← Open Graph social images
├── .claude/
│   └── skills/
│       └── ui-ux-pro-max/           ← UI/UX design intelligence skill
├── .agents/
│   └── skills/
│       ├── frontend-design/         ← Anthropic official design skill
│       └── impeccable/              ← Brand/product design system skill
└── scripts/
    └── update-readme.js             ← Auto-generates README.md
```

---

## 🧩 Modularity Rules (CRITICAL for scalability)

The current architecture inlines everything. The **target architecture** is modular.
Apply these rules on every new file or refactor:

### Rule 1 — One responsibility per file
Each HTML page handles one section of the site. Never merge two pages.

### Rule 2 — Shared patterns must be extracted
When a pattern appears in 3+ files, it becomes a candidate for extraction:
- Star canvas JS → `assets/js/stars.js`
- Mobile nav → `assets/js/nav.js`  
- Design tokens → `assets/css/tokens.css`
- Star canvas CSS → `assets/css/stars.css`

### Rule 3 — Extraction priority order
```
1. assets/css/tokens.css      ← CSS variables (extract first)
2. assets/css/global.css      ← Reset, base styles, shared components
3. assets/js/stars.js         ← Star canvas animation
4. assets/js/nav.js           ← Mobile menu
5. assets/js/forms.js         ← Form validation & multi-step logic
```

### Rule 4 — New pages use external files
Any page created after the initial refactor must use `<link>` and `<script src="">`,
never inline styles or scripts longer than 20 lines.

### Rule 5 — Component naming convention
```
assets/css/           → kebab-case.css
assets/js/            → kebab-case.js
assets/images/        → kebab-case.jpg/png/webp
HTML pages            → kebab-case.html
CSS classes           → BEM-inspired: .block__element--modifier
JS functions          → camelCase
CSS custom properties → --kebab-case
```

---

## 🛠️ Development

### Local server
```bash
python3 -m http.server 8080
# or
npx serve .
```

### Deploy
Every `git push` to `main` auto-deploys via GitHub Pages. No build step needed.

```bash
git add .
git commit -m "feat: description"
git push
```

### Update README architecture doc
```bash
node scripts/update-readme.js
```
Run this after any structural change (new file, new section, rename).

---

## 🎯 Shared Patterns Reference

### Star Canvas
Every page has `<canvas id="star-canvas">` with twinkling animation.
- Density formula: `Math.floor((W * H) / 1800)`
- Two star types: white (`rgba(240,238,230,a)`) + gold (`rgba(201,168,76,a * 0.85)`)
- Gold star probability: `Math.random() < 0.06`
- Until extracted to `stars.js`: copy the full script block from `index.html`

### Mobile Menu
Every page has a hamburger + `#mobileMenu` overlay.
- Toggle functions: `openMenu()` / `closeMenu()`
- Until extracted to `nav.js`: copy the nav block from `index.html`

### Section Label
```html
<div class="section-label">Titre FR — Title EN</div>
```
Always bilingual, always with gold top-border via CSS.

### Multi-step Forms
The three candidature pages use a JS wizard:
- Steps: `.step` elements shown/hidden
- Progress: `.progress-bar` width updated per step
- Submission: Formspree endpoint (replace placeholder before launch)

---

## 📋 Formspree Setup (TODO)
Replace in `index.html` (contact form):
```
https://formspree.io/f/VOTRE_ID_FORMSPREE
→ your real Formspree endpoint after signup at formspree.io
```
Do the same for each candidature form.

---

## 🖼️ Images (TODO)
Add real images to replace placeholders:
- `assets/images/projets/projet1.jpg` → current project thumbnail
- `assets/images/projets/projet2.jpg` → completed project thumbnail
- `assets/images/og/og-default.jpg` → 1200×630 Open Graph image
- `assets/images/bts/` → behind the scenes photos

---

## 🧠 Active Skills

These skills are loaded and must be respected in every design task:

| Skill | Invoke with | Purpose |
|---|---|---|
| **impeccable** | `/impeccable` | Brand design system, 23 commands |
| **frontend-design** | `/frontend-design` | Anthropic official design quality |
| **ui-ux-pro-max** | `/ui-ux-pro-max` | 161 palettes, 57 font pairings, UX guidelines |

Before designing any new component or page:
1. Run `/impeccable` in brand mode
2. Commit to an explicit aesthetic direction before writing a single line of CSS
3. Run `npx impeccable detect` after implementation to catch anti-patterns

---

## 📐 Playwright MCP

Playwright is configured as an MCP server for visual testing.
Use it to:
- Screenshot every page at 375px (mobile) and 1440px (desktop)
- Verify nav, hero, sections, and forms render correctly
- Catch layout regressions before committing

```
# Inside Claude Code session:
Use playwright to open http://localhost:8080 and screenshot all pages
```

---

## 🚀 Roadmap (Frontend → Backend)

### Phase 1 — Frontend (current)
- [x] index.html — main page
- [x] a-propos.html
- [x] candidature-talent.html
- [x] candidature-technique.html  
- [x] candidature-lieu.html
- [ ] Extract shared CSS to `assets/css/tokens.css` + `global.css`
- [ ] Extract shared JS to `assets/js/stars.js` + `nav.js`
- [ ] Replace all Formspree placeholders
- [ ] Add real project images
- [ ] README auto-update script

### Phase 2 — Backend (upcoming)
- [ ] Headless CMS (Decap CMS) for blog/BTS content updates
- [ ] Form submissions backend (beyond Formspree free tier)
- [ ] Project pages with dynamic content
- [ ] Admin dashboard for managing candidatures

---

## ⚠️ Rules Claude Must Always Follow

1. **Never break the star canvas** — it is the identity of the site
2. **Never use generic fonts** — Cormorant Garamond + Space Mono only
3. **Never add purple/blue gradients** — gold on dark only
4. **Always test mobile first** — 375px is the primary viewport
5. **Always keep files under 500 lines** — split if longer
6. **Always update README.md** after structural changes
7. **Never inline styles** on new pages — use external CSS files
8. **Commit messages in English**, code comments can be FR or EN
9. **Before any design work** — invoke `/impeccable` brand mode first
10. **Gold is sacred** — use sparingly, never as background fill