#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ─── HTML metadata ───────────────────────────────────────────────────────────

function extractHtmlMeta(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const titleMatch = src.match(/<title>(.*?)<\/title>/s);
  const descMatch  = src.match(/<meta\s+name="description"\s+content="(.*?)"/s);
  return {
    title:       titleMatch ? titleMatch[1].trim() : path.basename(filePath),
    description: descMatch  ? descMatch[1].trim()  : '',
  };
}

function getPages() {
  return fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .sort()
    .map(f => ({ file: f, ...extractHtmlMeta(path.join(ROOT, f)) }));
}

// ─── File tree ────────────────────────────────────────────────────────────────

const TREE_SKIP = new Set([
  '.git', '.claude', '.agents', 'node_modules',
  '.DS_Store', 'skills-lock.json', 'CLAUDE.md', 'README.md',
]);

function buildFileTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => !TREE_SKIP.has(e.name))
    .sort((a, b) => {
      // directories first, then files
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  const lines = [];
  entries.forEach((entry, i) => {
    const isLast      = i === entries.length - 1;
    const connector   = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';

    if (entry.isDirectory()) {
      lines.push(`${prefix}${connector}${entry.name}/`);
      lines.push(...buildFileTree(path.join(dir, entry.name), prefix + childPrefix));
    } else {
      lines.push(`${prefix}${connector}${entry.name}`);
    }
  });
  return lines;
}

// ─── Modularisation status ────────────────────────────────────────────────────

const EXTRACTIONS = [
  { label: 'assets/css/tokens.css — CSS variables',       path: 'assets/css/tokens.css' },
  { label: 'assets/css/global.css — reset + base styles', path: 'assets/css/global.css' },
  { label: 'assets/js/stars.js — star canvas animation',  path: 'assets/js/stars.js' },
  { label: 'assets/js/nav.js — mobile menu',              path: 'assets/js/nav.js' },
  { label: 'assets/js/forms.js — form validation & steps',path: 'assets/js/forms.js' },
];

function getModularStatus() {
  return EXTRACTIONS.map(e => ({
    ...e,
    done: fs.existsSync(path.join(ROOT, e.path)),
  }));
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────

function getRoadmapPhase1(pages, modular) {
  const htmlFiles = [
    'index.html',
    'a-propos.html',
    'candidature-talent.html',
    'candidature-technique.html',
    'candidature-lieu.html',
  ];
  const pageNames = new Set(pages.map(p => p.file));

  const items = htmlFiles.map(f => {
    const done = pageNames.has(f);
    return `- [${done ? 'x' : ' '}] ${f}`;
  });
  modular.forEach(m => {
    items.push(`- [${m.done ? 'x' : ' '}] Extract ${m.path}`);
  });
  items.push('- [ ] Replace all Formspree placeholders');
  items.push('- [ ] Add real project images');

  return items.join('\n');
}

// ─── Design tokens (brand constants — do not parse from HTML) ─────────────────

const TOKENS_TABLE = `
| Token | Value | Usage |
|---|---|---|
| \`--gold\` | \`#C9A84C\` | Primary accent — nav, headings, borders |
| \`--gold-dim\` | \`#8a6e2f\` | Muted gold — decorative lines |
| \`--gold-light\` | \`#e8c97a\` | Hover highlights |
| \`--star-white\` | \`#F0EEE6\` | Body text |
| \`--bg\` | \`#05060A\` | Main background |
| \`--bg2\` | \`#0B0D14\` | Section background |
| \`--bg3\` | \`#0f1119\` | Card background |
| \`--text-muted\` | \`#7A7D8A\` | Secondary text |
`.trim();

// ─── Generate ─────────────────────────────────────────────────────────────────

function generate() {
  const pages   = getPages();
  const modular = getModularStatus();
  const tree    = buildFileTree(ROOT).join('\n');

  const pagesTable = [
    '| Fichier | Titre | Description |',
    '|---|---|---|',
    ...pages.map(p => `| \`${p.file}\` | ${p.title} | ${p.description} |`),
  ].join('\n');

  const modularList = modular
    .map(m => `- [${m.done ? 'x' : ' '}] ${m.label}`)
    .join('\n');

  const roadmap = getRoadmapPhase1(pages, modular);

  const now = new Date().toISOString().slice(0, 10);

  const readme = `# DJUMPERFORMANCE

> *La performance d'un rêve* — Maison de production indépendante, Paris
> Site : [djumperformance.com](https://djumperformance.com) · Déployé via GitHub Pages

---

> Dernière mise à jour : ${now}
> Généré par \`node scripts/update-readme.js\` — relancer après tout changement structurel.

---

## À propos

DJUMPERFORMANCE est une maison de production indépendante fondée sur une conviction : chaque histoire mérite d'être racontée avec la puissance d'un rêve. Le site présente les projets, permet aux talents et techniciens de candidater, et met en valeur l'univers cinématique de la maison.

---

## Pages

${pagesTable}

---

## Architecture

\`\`\`
${tree}
\`\`\`

---

## Système de design

Tous les fichiers partagent les mêmes tokens CSS (déclarés dans chaque \`:root {}\` jusqu'à l'extraction vers \`assets/css/tokens.css\`).

${TOKENS_TABLE}

**Typographie :** Cormorant Garamond (serif) + Space Mono (monospace) — chargées depuis Google Fonts. Aucune autre police autorisée.

---

## Modularisation

Extraction des patterns partagés (inline → fichiers externes) :

${modularList}

---

## Développement

\`\`\`bash
# Serveur local
python3 -m http.server 8080
# ou
npx serve .

# Déploiement (auto via GitHub Pages)
git push origin main

# Mettre à jour ce fichier
node scripts/update-readme.js
\`\`\`

---

## Roadmap — Phase 1 (Frontend)

${roadmap}

### Phase 2 — Backend (à venir)
- [ ] Headless CMS (Decap CMS) pour blog/BTS
- [ ] Backend formulaires (au-delà du tier gratuit Formspree)
- [ ] Pages projets avec contenu dynamique
- [ ] Dashboard admin candidatures
`;

  fs.writeFileSync(path.join(ROOT, 'README.md'), readme.trimEnd() + '\n');
  console.log('✓ README.md updated');
}

generate();
