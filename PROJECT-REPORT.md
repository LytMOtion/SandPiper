# Sandpiper Golf Club — Creative Proof · Project Report

**Status:** Preview build (not a live site). All rates, policies, per-hole numbers, event
details, and imagery are placeholders/AI-reference until verified. Nothing deployed; the live
site (sandpipergolf.com) was never touched.

**Stack:** static HTML/CSS/JS, no framework, no build step. Progressive enhancement (all content
renders without JavaScript). Intended for a client-run GitHub → Vercel deploy later.

**Pages:** `index.html` (home), `tour.html` (18-hole course tour), `rates.html` (rates + 4-path
booking gateway), `events.html` (events destination), `story.html` (land history).

---

## 1 · Design system (frozen creative direction — preserved)

- Type: Archivo + Archivo Expanded; tabular numerals for data ("numbers as instruments").
- Palette: cool fog base, deep Pacific (primary/CTA), marine grays, ochre as a reserved
  micro-signal. Tokens in `assets/app.css` `:root` (WCAG-AA verified pairings; see `NOTES.md`).
- Concepts: The Edge (photographic horizon), The Descent (spatial movement toward the water),
  numbers-as-instruments, one "swell" easing, squared geometry, thin rules/ledgers.
- Components: `.shot`/`<picture>`, `.hero-shot`, `.climax`, `.hole-stage`, `.swell`, `.ledger`,
  `.datum`, `.field-dark`/`.field-pacific`, `.bleed`, `.shot__ref` (AI-reference tag).
- Accessibility-first: skip links, landmarks, single H1/page, visible focus, `prefers-reduced-motion`,
  keyboard hole-jump, `aria-live` announcements. Reduced-motion fully disables reveal/swell.

Frozen (do not restyle): the homepage hero composition and the Hole-13 stage.

---

## 2 · Brand / logo decision

**Chosen treatment: solid Pacific-dark silhouette of the supplied sandpiper bird**, with a
fog/off-white reverse for dark surfaces. Rationale (validated by rendered comparison): the supplied
mark is a detailed line illustration (white belly, black speckles, thin green), so flat monochromes
collapse into sparse, low-legibility lines at header/mobile size; a **solid silhouette** stays bold,
intentional, and mobile-clear, and Pacific-dark ties it to the site's primary color.

- Files: `assets/img/sandpiper-logo.png` (+ `@2x`), `assets/img/sandpiper-logo-light.png` (+ `@2x`).
- Original supplied artwork preserved untouched at `~/Downloads/sandpiperlogo.png`.
- Constraints honored: bird silhouette preserved, no distortion, no gradient, no legacy bright
  green, contrast ~13:1 on the light masthead. Alt handled via link `aria-label` + visible wordmark.
- Alternatives (muted green illustration, ink silhouette, Pacific/ink line-mono) were generated and
  rejected on the render; available if the client prefers.
- **Production dependency:** a vector **SVG** export of the mark.

---

## 3 · Booking gateway (Rates & Tee Times)

Four coherent, in-system selection paths (squared, not SaaS cards): **Non-Resident,
Tri-County Resident, Preferred Player, Montecito Club Member.**

**Dependency-safe outbound links (key architecture):**
- All external destinations centralized in `assets/data.js` → `window.SANDPIPER.destinations`
  (`book_nonResident`, `book_resident`, `book_preferred`, `book_montecito`, `grillMenu`,
  `scorecard`) — **every value is `null`** until a verified URL is supplied.
- Each CTA uses `data-dest="<key>"` and has **no `href`** — so it can never navigate or jump the
  page to top. `assets/app.js` renders it as an honest focusable, `aria-disabled`, keyboard-safe
  "pending" control; when a real URL is placed in the config it becomes a working (external) link
  with **no markup change**.
- No invented URLs, no simulated availability, no fabricated login/inventory.

Copy claims are unverified and labeled: residency ("proof required," county list tagged *to verify*),
Preferred Player / Montecito described as sign-in/reciprocal *channels* (no login built). Green-fee
figures are tagged placeholder.

---

## 4 · 18-hole course tour

All 18 holes built with distinct composition archetypes distributed across the round
(wide-landscape, tee/photo-lead, stage-overlay, green-complex/split), plus the frozen Hole 13.
Narrative rhythm: 1–4 arrival/inland · 5–9 strategy/approach · 10–14 ocean stretch (climax) ·
15–18 turn inward/finish. This is narrative rhythm, **not** documentary mapping of real holes.

- Per hole: AVIF → WebP → JPG at 1344×768 + an 800w WebP mobile source; per-hole `object-position`;
  `loading="lazy"`; explicit dimensions (no CLS). Files in `assets/images/course/holes/`.
- Navigation: numbered 1–18 selector, `data-hole`/`data-hole-panel`, `aria-current`, `aria-live`
  announcements, deep links (`#hole-13`), sticky desktop rail, horizontal mobile rail. Invalid
  `#hole-` hashes fail safe to the default hole. No-JS shows Hole 13.
- Source→hole map + two intentionally-unused frames recorded in
  `assets/images/course/holes/mapping.json`; roles in `IMAGE-MANIFEST.md`.
- **All hole imagery is temporary AI reference** — labeled per image + one page-level disclosure.

---

## 5 · Events page

Hero → positioning → event types (Weddings & celebrations, Corporate gatherings, Golf outings &
tournaments, Private dinners & receptions, Catering) → venue/setting → **"A day at the edge" flow**
(Arrival → Gather → Play → Dine → Sunset, framed as illustrative, not an operational promise) →
food & beverage (the Grill) → inquiry (honest `mailto`/phone; no fake submission).
No invented capacities, menus, packages, pricing, or services.

---

## 6 · Story page

Rebuilt as visual historical storytelling: quiet establishing frame → geography schematic
(honest, "not to scale") → the 1942 Ellwood shelling as a full-bleed beat → industrial→golf
transition → present-day close → sourced timeline. History is kept out of the primary commercial
messaging (the homepage teaser is "The ground has a story.", not "Oil field. Wartime. Then golf.").
Interpretive AI imagery and the extraction-era placeholder are explicitly labeled; the oil-era date
conflict (1927–1965 vs 1938–1954) is preserved, not smoothed.

---

## 7 · SEO / metadata

Ready: unique `<title>` + meta description per page, single H1 per page, logical headings,
crawlable internal links, descriptive anchors, alt text, Open Graph + Twitter-card tags.
Waits for migration: production domain (canonical, `og:url`, absolute `og:image`), `sitemap.xml`
/ `robots.txt`, and `LocalBusiness`/`GolfCourse` structured data (needs verified hours/geo — not
fabricated). No production-domain assumptions were invented.

---

## 8 · Verification performed

- All 5 pages return HTTP 200 (served locally); every local CSS/JS/image reference resolves.
- **Zero `href="#"` remain in the project.**
- 6 `data-dest` controls match 6 config keys; JS wiring present.
- Tour: 18 panels, Hole 13 frozen intact, 0 redundant disclosures.
- One H1 + unique title/description + OG tags per page.
- Nav consistent across all pages; Grill cross-page anchor (`index.html#grill`) resolves.
- Logo silhouette + booking gateway visually confirmed in a real browser render.

(Objective snapshot appended at the bottom of this file.)

---

## 9 · Production dependency checklist (must be resolved before launch)

- [ ] Verified booking URLs × 4 (paste into `data.js` → `destinations`)
- [ ] Grill menu URL + official scorecard URL (same config)
- [ ] Official scorecard: per-hole par / yardage / stroke index
- [ ] Verified rates and policies (green fees, twilight times, cart, range, pace, cancellation)
- [ ] Tri-county eligibility (county list) + Preferred Player / Montecito access terms
- [ ] Real commissioned photography for ALL imagery (all current images are AI reference)
- [ ] Event-specific photo roles: bluff ceremony, intimate dinner, corporate gathering,
      tournament arrival, food/service detail, sunset reception
- [ ] Event capacities / menus / packages / pricing
- [ ] Vector **SVG** logo export
- [ ] Story: real public-domain archival material (replace interpretive AI + placeholder)
- [ ] Production domain → canonical, `og:url`, absolute `og:image`, `sitemap.xml`, `robots.txt`
- [ ] `LocalBusiness`/`GolfCourse` structured data (verified hours/geo)
- [ ] Analytics + a real event-inquiry form backend
- [ ] On-device mobile QA at 320 / 375 / 390 / 430 px

---

## 10 · Risk register

- **Factual / legal:** placeholder rates, policies, and unverified residency/membership terms must
  not go live unverified. AI imagery must never be presented as real Sandpiper or archival
  photography (currently labeled). Historical dates carry a documented, unresolved conflict.
- **UX:** no misleading dead links remain (all resolved or honestly pending).
- **Accessibility:** mobile widths ≤430px not verified on a real device.
- **SEO / deploy:** no canonical / sitemap / structured data yet (expected pre-migration).

---

## 11 · Honesty guardrails maintained

No facts, URLs, booking vendors, capacities, menus, prices, scorecard data, membership rules, or
historical certainty were invented. No fake reviews/testimonials. No deploy, no live-site changes,
no production-domain assumptions. The four booking paths and the 18-hole tour are fully preserved.

---


## 13 · Course data, Grill & booking (this iteration)

**Booking (TeeItUp):** the four verified booking URLs and (removed) grill link are wired via
`assets/data.js` → destinations. All four CTAs are now active external links (new tab, rel=noopener):
- Non-Resident → sandpiper-golf-club.book.teeitup.com
- Tri-County Resident → sandpiper-golf-club-tri-county-residents.book.teeitup.com
- Preferred Player → sandpiper-golf-club-preferred-player.book.teeitup.com
- Montecito Club Member → sandpiper-golf-club-members.book.teeitup.com
No availability/inventory is simulated; TeeItUp remains the engine.

**Grill:** new internal `grill.html` rebuilt in the design system from Sandpiper's current Grill menu
(Breakfast, Wraps, Burgers & Dogs, Salad & Chili, Sandwiches, From the Bar). Nav "The Grill",
the homepage "See the menu" CTA, and the Events F&B CTA all point to `grill.html`; the external
grillMenu destination was removed. **Prices/items carry a visible "to be verified before production"
note.** One breakfast price ("Two-Egg Breakfast") could not be confidently matched from the source
layout and shows a clean dash — verify against the kitchen.

**Scorecard data (hole 1–18):** par, yardage by tee (Black/Gold/Silver/Copper), and Men's stroke
index populated from the course scorecard database (greenskeeper.org, last updated 2020). All
"Pending card" labels removed. **Verify against the official Sandpiper scorecard before production**
— note a total-yardage discrepancy across sources: this card lists Black 7,159 yds (slope 135,
rating 75.0); other sources cite ~7,068. Women's par/HDCP also available if needed.

**Wind/weather:** the per-hole "Prevailing wind" row was removed (no verified per-hole data). A
single course-wide note was added to the Course Tour: "Wind and the marine layer can change quickly
on the bluff — check current conditions before play."

## 14 · Documented future enhancements (NOT built — require real data/APIs)

- **"Today at Sandpiper" conditions module:** could show temperature, wind speed/direction, fog /
  marine-layer status, and sunset time. Requires a real weather API key + data source. Not built.
- **Live GPS walking-distance / yardage:** requires user geolocation, accurate hole geometry, and
  pin positions (a golf-GPS mapping system). Out of scope for this website phase. Not built.

---

## APPENDIX · Objective verification snapshot
_Generated 2026-07-04 16:41 against the actual repository._

```
TOP-LEVEL FILES:
  IMAGE-MANIFEST.md
  ITERATION-02.md
  NOTES.md
  PROJECT-REPORT.md
  assets
  events.html
  index.html
  rates.html
  story.html
  tour.html

IMAGE COUNTS:
  assets/images/course/holes : 72 hole image files
  assets/img                 : 28 files

HTTP STATUS:
  200  index.html
  200  rates.html
  200  tour.html
  200  story.html
  200  events.html
  200  assets/app.css
  200  assets/app.js
  200  assets/data.js

STRUCTURE CHECKS:
  href="#" occurrences : 0  (target 0)
  data-dest controls   : 6
  destinations config  : book_montecito book_nonResident book_preferred book_resident grillMenu scorecard 
  tour hole panels     : 18  (target 18)
  tour hole buttons    : 18  (target 18)
  H1 per page          : index=1 rates=1 tour=1 story=1 events=1
  masthead logo pages  : 5 of 5

PAGE TITLES:
  index.html -> Sandpiper Golf Club — public golf on the Santa Barbara coast
  rates.html -> Rates &amp; Tee Times · Sandpiper Golf Club
  tour.html -> The Course — hole by hole · Sandpiper Golf Club
  story.html -> The ground before the game · Sandpiper Golf Club
  events.html -> Events — weddings, outings &amp; gatherings · Sandpiper Golf Club
```
