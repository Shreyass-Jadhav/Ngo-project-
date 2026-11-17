# Sakri Foundation website

Static site (plain HTML/CSS/JS + one tiny build script) deployed on Vercel. No framework, no database.
Mission: "We can't help everyone, but everyone can help someone." Women & children, Dharwad.

## Run
`npm run dev` (builds to `dist/` and serves it). Needs Node 18+. `npm run build` is what Vercel runs.

## Structure (one folder per section = one owner, minimal merge conflicts)
```
src/pages/        index, about, causes, gallery, news, donate -> list sections with <!-- @include name -->
src/data/programs.json  program list (title, blurb, featured). Folder name in assets/img/ = slug
src/sections/<name>/<name>.html|.css|.js    -> everything for that section lives here
src/core/         base.css (colors, buttons, grid) + core.js (scroll reveal) -> shared, change rarely
src/assets/img/   images (WebP, < 200 KB each)
api/contact.js    only backend: contact form via Resend (env: RESEND_API_KEY, CONTACT_TO_EMAIL)
build.mjs         concatenates sections into dist/ (styles.css, main.js, pages)
```
Add a section: create `src/sections/x/x.html` (+ optional css/js), then add `<!-- @include x -->` to a page.

## Suggested ownership (4 people)
| Person | Sections |
|---|---|
| A | header, hero, footer, pagehero, core/ (motion, parallax) |
| B | about, focus, involved |
| C | impact, causes/programs, strip, gallery, news, data/programs.json, photos |
| D | donate, api/contact.js, build.mjs, Vercel setup |

## Rules
- Branch per task: `feat/<section>-<what>`; PR into `main`; Vercel makes a preview URL per PR.
- Touch only your section folder. Need a global change (colors, fonts)? Edit `core/base.css` in a small separate PR.
- Section CSS: use the variables in `base.css`; prefix selectors with the section's class/id.
- Keep JS per section wrapped to its own elements; no libraries without discussion.
- Accessibility: alt text/aria-label on every image, keep contrast, test keyboard nav.
- Search the code for `TODO` to find content still needed (real stats, dates, 80G number, photos, social links, QR).

## Photos
Client photos are already in `src/assets/img/<program-slug>/01.webp, 02.webp...` (deduped, WebP, max 1400px). Gallery, cards and photo strip build from these folders automatically.
- Add photos: `python tools/add-photos.py <slug> <folder>` (needs `pip install pillow`), then `npm run dev`.
- Add a program: new folder + one entry in `src/data/programs.json`.
- `01.webp` is the card cover. Alt text is generic (program title); improve where possible.

## Build tokens (in src/pages/*.html)
`@include name`, `@programs featured|all`, `@strip`, `@gallery`, `@pagehero Title | slug/01.webp`. See top of `build.mjs`.
