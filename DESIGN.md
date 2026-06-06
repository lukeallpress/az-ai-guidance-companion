# Design notes & handoff — AZ GenAI Guidance Companion

These deliverables are styled to match **v26.01** of the guidance so the graphic designer can
restyle them quickly. Everything visual is **CSS + SVG + structured data** — nothing is baked
into flat images, and the two illustrations ship as editable SVG.

## Source of truth
- **Design:** `source/AZ GenAI Guidance v26.01.pdf` (rendered to confirm color, type, and motifs).
- **Content & page numbers:** the same PDF's Table of Contents (verified, 41 pages).
- All text/data lives in **`data.js`**; all design lives in **`styles.css`** (`:root` tokens).

## Color tokens (sampled from the PDF) — edit in `styles.css :root`
| Token | Hex | Use |
|---|---|---|
| `--navy` | `#002454` | Primary. Banners, headings, page pills |
| `--navy-deep` | `#001734` | Gradient end |
| `--teal` | `#008a95` | Accent. Sub-headers, icons, "next" steps |
| `--teal-bg` | `#e5f3f4` | Student-voice callout background |
| `--gold` | `#febe10` | Highlight. Consideration badges, tagline, "first" steps |
| `--orange` | `#d96b00` | Secondary highlight, share callouts |
| `--blue` | `#0066b3` | Links |
| `--green` | `#007a33` | Positive accent |
| `--cream` | `#fbf0e5` | Warm callout background |
| `--gray` | `#d1d3d4` | Rules / dividers |

## Typography (free Google Fonts — already linked in the HTML)
- **Nunito** (800/900) — display & headings (the rounded sans on the PDF banners).
- **Nunito Sans** (400/600/700) — body text.
- **Vollkorn** (italic) — pull-quotes, the cover tagline, role discussion prompts.
- The cover's script accents (ACaslon / "Melisa") are decorative only and are approximated.

## Component inventory (where to find each in `styles.css`)
- **Hero** `.hero` — navy gradient + Arizona constellation (`assets/arizona-constellation.svg`), brand lockup, title, gold serif tagline, stat cards.
- **Navy chapter banners** `.chapter > h3`, `.role-banner` — full-width navy with a faint dot-network texture (`.dots`), echoing the PDF chapter headers.
- **Page pill** `.pagepill` — navy "p 8–9" link to the guidance.
- **Reading-route steps** `.route-list` — numbered steps; gold for "read first," teal for "if you have time."
- **Discussion prompt** `.prompt` — Vollkorn italic with an oversized gold quotation mark.
- **Gold consideration badge** `.cbadge` — the "#1–#8" ethics badges.
- **Student-voice callout** `.starthere` / teal-bg pattern — light-teal box with a navy rule (PDF student quotes).
- **Pull-quote** `.pullquote` — serif italic with gold rule.
- **Change card** `.change` — "what changed" with tag, page pill, and a "why it matters" line.
- **Framework cards / circular icons** — used for 3-part frameworks (Imperative/Practice/Redesign; the "boat" sections). Swap in real icons as desired.

## Illustrations (editable, replaceable)
- `assets/aiee-logo.svg` — **placeholder** pyramid mark (gray/navy/gold). Replace with the official AIEE + NAU lockup.
- `assets/arizona-constellation.svg` — stylized Arizona network from the cover. Recolor via the `--teal` family.

## Accessibility
- WCAG AA target; navy/white and navy/gold meet AA for text sizes used.
- All images have `role`, `<title>`, and `alt`/`aria-label`.
- Keyboard-operable tabs, role buttons, and filters; visible gold focus ring.
- `prefers-reduced-motion` disables animation.
