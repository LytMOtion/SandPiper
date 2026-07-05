# Sandpiper Golf Club — Website (Creative Proof)

A static marketing-site **Creative Proof** for Sandpiper Golf Club (Goleta, CA). This is a
**preview build**, not the live site and not a production replacement for sandpipergolf.com.
Rates, policies, per-hole data, and event details are **placeholders**; all imagery is
**AI-generated reference**, not real Sandpiper photography.

## Status
Preview / proof stage. Search indexing is disabled (`robots.txt` + per-page `noindex`) so it
cannot compete with the live Sandpiper site. Remove those guards only at production launch.

## Stack
Static **HTML + CSS + JavaScript**. No framework, no build step, no dependencies. Progressive
enhancement — all content renders without JavaScript.

## Pages
- `index.html` — home (the Edge / descent narrative)
- `tour.html` — 18-hole course tour
- `rates.html` — rates + four-path booking gateway
- `events.html` — events destination
- `story.html` — the land's history

## Local preview
Serve the folder with any static server (relative paths require http://, not `file://`):
```
python3 -m http.server 8000      # then open http://localhost:8000
```

## Deployment model (GitHub → Vercel)
Static site; **no `vercel.json` required** — Vercel serves the repo root as-is.
1. Create a new GitHub repo and push these files.
2. In Vercel: New Project → import the repo.
3. Framework preset: **Other**. Build command: **none**. Output directory: **/** (root).
4. Deploy. Direct page URLs (e.g. `/tour.html`) and relative assets work without config.

## Project structure
```
index.html  tour.html  rates.html  events.html  story.html
robots.txt  README.md  .gitignore
assets/
  app.css  app.js  data.js
  img/            shared imagery + logo (sandpiper-logo*.png)
  images/course/holes/   18-hole imagery (AVIF/WebP/JPG + 800w), mapping.json, README.txt
PROJECT-REPORT.md  IMAGE-MANIFEST.md  NOTES.md   (documentation)
```

## Booking destination configuration
All outbound booking/menu/scorecard links are centralized in `assets/data.js`:
```js
window.SANDPIPER.destinations = {
  book_nonResident: null, book_resident: null,
  book_preferred: null,   book_montecito: null,
  grillMenu: null,        scorecard: null
};
```
`null` = unresolved → the link renders as an honest, non-navigating "pending" control (no jump-to-top,
keyboard/screen-reader safe). Paste a **verified** URL to activate it — no markup changes needed.
Do not invent URLs.

## Known placeholders (intentional, disclosed)
Green fees, policies, tri-county eligibility, membership/Preferred-Player terms, event
capacities/menus/pricing, per-hole par/yardage (shown `—`), and all photography.

## AI-reference imagery
Every image is AI-generated reference, labeled on-page. **Do not present any image as real
Sandpiper or archival photography.** Replace with commissioned photography before production.

## Production dependencies
See `PROJECT-REPORT.md` §9 for the full pre-launch checklist (verified booking URLs, official
scorecard, verified rates/policies, real photography, vector SVG logo, production domain +
canonical/sitemap/structured data, analytics, inquiry backend).

## Scope
This repository is a standalone static preview. It **does not modify, connect to, or affect the
live sandpipergolf.com site** in any way.
