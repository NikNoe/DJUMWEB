# DJUMPERFORMANCE

> *La performance d'un rêve* — Maison de production indépendante, Paris
> Site : [djumperformance.com](https://djumperformance.com) · Déployé via GitHub Pages

---

> Dernière mise à jour : 2026-05-14
> Généré par `node scripts/update-readme.js` — relancer après tout changement structurel.

---

## À propos

DJUMPERFORMANCE est une maison de production indépendante fondée sur une conviction : chaque histoire mérite d'être racontée avec la puissance d'un rêve. Le site présente les projets, permet aux talents et techniciens de candidater, et met en valeur l'univers cinématique de la maison.

---

## Pages

| Fichier | Titre | Description |
|---|---|---|
| `a-propos.html` | À Propos — DJUMPERFORMANCE | DJUMPERFORMANCE — À Propos. La vision derrière la maison de production. |
| `candidature-lieu.html` | Lieu & Sponsor — DJUMPERFORMANCE | DJUMPERFORMANCE — Proposer un lieu ou devenir sponsor. |
| `candidature-talent.html` | Candidature Talent — DJUMPERFORMANCE | DJUMPERFORMANCE — Candidature Talent. Rejoignez notre maison de production indépendante. |
| `candidature-technique.html` | Candidature Technique — DJUMPERFORMANCE | DJUMPERFORMANCE — Candidature Équipe Technique. Son, image, montage. |
| `index.html` | DJUMPERFORMANCE — La performance d'un rêve | DJUMPERFORMANCE — Maison de production indépendante. Courts métrages cinématiques. La performance d'un rêve. |

---

## Architecture

```
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   └── tokens.css
│   ├── images/
│   │   ├── 1561417538227_Original 2.PNG
│   │   ├── 1561417538227_Original.PNG
│   │   ├── djum.PNG
│   │   └── ian-kenny.jpg
│   └── js/
│       ├── nav.js
│       └── stars.js
├── scripts/
│   ├── install-hooks.js
│   └── update-readme.js
├── a-propos.html
├── candidature-lieu.html
├── candidature-talent.html
├── candidature-technique.html
├── CNAME
├── favicon-180.png
├── favicon-32.png
├── favicon-512.png
├── favicon.ico
└── index.html
```

---

## Système de design

Tous les fichiers partagent les mêmes tokens CSS (déclarés dans chaque `:root {}` jusqu'à l'extraction vers `assets/css/tokens.css`).

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#C9A84C` | Primary accent — nav, headings, borders |
| `--gold-dim` | `#8a6e2f` | Muted gold — decorative lines |
| `--gold-light` | `#e8c97a` | Hover highlights |
| `--star-white` | `#F0EEE6` | Body text |
| `--bg` | `#05060A` | Main background |
| `--bg2` | `#0B0D14` | Section background |
| `--bg3` | `#0f1119` | Card background |
| `--text-muted` | `#7A7D8A` | Secondary text |

**Typographie :** Cormorant Garamond (serif) + Space Mono (monospace) — chargées depuis Google Fonts. Aucune autre police autorisée.

---

## Modularisation

Extraction des patterns partagés (inline → fichiers externes) :

- [x] assets/css/tokens.css — CSS variables
- [x] assets/css/global.css — reset + base styles
- [x] assets/js/stars.js — star canvas animation
- [x] assets/js/nav.js — mobile menu
- [ ] assets/js/forms.js — form validation & steps

---

## Développement

```bash
# Serveur local
python3 -m http.server 8080
# ou
npx serve .

# Déploiement (auto via GitHub Pages)
git push origin main

# Mettre à jour ce fichier
node scripts/update-readme.js
```

---

## Roadmap — Phase 1 (Frontend)

- [x] index.html
- [x] a-propos.html
- [x] candidature-talent.html
- [x] candidature-technique.html
- [x] candidature-lieu.html
- [x] Extract assets/css/tokens.css
- [x] Extract assets/css/global.css
- [x] Extract assets/js/stars.js
- [x] Extract assets/js/nav.js
- [ ] Extract assets/js/forms.js
- [ ] Replace all Formspree placeholders
- [ ] Add real project images

### Phase 2 — Backend (à venir)
- [ ] Headless CMS (Decap CMS) pour blog/BTS
- [ ] Backend formulaires (au-delà du tier gratuit Formspree)
- [ ] Pages projets avec contenu dynamique
- [ ] Dashboard admin candidatures
