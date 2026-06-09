# AZ GenAI Guidance — 2026 Companion

A lightweight companion to Arizona's **2026 GenAI K-12 guidance (v26.01, "A Call for AI Literacy")**.
It helps busy education leaders answer one question fast: **where do I start?** Each role gets a
prioritized, page-numbered reading route into the full guidance — and everyone is encouraged to read
the whole thing over time.

Two deliverables, one shared design and dataset:

| File | What it is |
|---|---|
| `index.html` | The **website** — a navigator: Reading routes · Read the guidance · Explore sections · Share kit |
| `embed.html` | A **compact build for embedding** in Google Sites (no big hero, non-sticky nav) |
| `doc.html` | The **document** — a printable one-pager: what's new + every role's reading route |
| `doc.pdf` | A print-rendered PDF of `doc.html` |
| `embed-harness.html` | A local preview showing how `embed.html` looks framed inside Google Sites |

## Built-in reader
The **Read the guidance** tab shows the document itself, page by page (pre-rendered images in
`assets/pages/`). Each role's **priority pages open first**; the rest of the guidance is one tap
away — everything is worth reading. Every page link on the site jumps straight to the right page.
The guidance is public, so there is no access gate.

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
