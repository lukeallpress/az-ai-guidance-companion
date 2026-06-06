# AZ GenAI Guidance — 2026 Companion

A lightweight companion to Arizona's **2026 GenAI K-12 guidance (v26.01, "A Call for AI Literacy")**.
It helps busy education leaders by answering two questions fast:

1. **What changed** in the 2026 rewrite?
2. **What should *I* read?** — a short, page-numbered reading route for each role.

Two deliverables, one shared design and dataset:

| File | What it is |
|---|---|
| `index.html` | The **website** — a full navigator: Reading routes · What changed · Explore sections · Share kit |
| `embed.html` | A **compact build for embedding** in Google Sites (no big hero, non-sticky nav) |
| `doc.html` | The **document** — a printable one-pager: what changed + every role's reading route |
| `doc.pdf` | A print-rendered PDF of `doc.html` |
| `embed-harness.html` | A local preview showing how `embed.html` looks framed inside Google Sites |

## Built-in reader & access word
The **Read the guidance** tab shows the document itself, page by page, with each role's
recommended pages open and the rest collapsed into expandable strips. Every page link on the
site jumps straight to the right page.

Because the draft isn't public yet, the site is gated by an **access word** and the document is
genuinely protected, not just hidden:
- Pages are pre-rendered images, **AES-256-GCM encrypted** (`assets/pages/pNN.enc`, shared salt in
  `assets/pages/salt.bin`). The access word derives the key (PBKDF2-SHA256) and decrypts them in the
  browser. Without it the files are unreadable — even though the repo is public.
- Current access word: **`Institute`** (case-insensitive). To change it, re-run the page-encryption
  step with a new word (see `scripts` note in `DEPLOYMENT-AND-EMBED.md`) and redeploy.
- This stops casual/accidental access. A short dictionary word is brute-forceable by someone
  determined — use a longer passphrase if you need more.

## Source of truth & accuracy
- **Page numbers and chapter titles** come from **v26.01** (verified against the PDF's Table of Contents).
- Every "open the guidance" link points to **https://azk12.ai** (the official live document) — set once as
  `pdfUrl` in `data.js`. We do **not** host the draft PDF.

## Editing
- **Content** (roles, routes, sections, change cards, teasers) → `data.js` only.
- **Design** (colors, fonts, components) → `styles.css` (`:root` tokens) — see **`DESIGN.md`**.
- No build step, no dependencies. It's vanilla HTML/CSS/JS.

## View locally
Any static server works, e.g.:
```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```

## Deploy / redeploy
GitHub Pages serves this folder. To push updates after editing, run `./deploy.sh`
(it syncs this folder into the Git clone and pushes). Live site:
**https://lukeallpress.github.io/az-ai-guidance-companion/**

## Embed in Google Sites
Edit your Google Site → **Insert → Embed → By URL** →
`https://lukeallpress.github.io/az-ai-guidance-companion/embed.html` → Insert, then drag to resize.

## For the graphic designer
Everything is editable: design tokens live in `styles.css`, illustrations are SVG in `assets/`,
and all copy is in `data.js`. `DESIGN.md` documents the colors, type, and component inventory so the
guidance's look can be reproduced or refreshed. Nothing is flattened into images.

*Unofficial reading aid produced as a companion to the Arizona Institute for Education & the Economy guidance.*
