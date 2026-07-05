# Sandpiper — Creative Proof · Notes & Registers

Prototype only. Not production. Not deployed. Does not touch the live site.
Four experiences built: **Homepage** (`index.html`), **Course tour / Hole 13** (`tour.html`),
**Rates & Tee Times** (`rates.html`), **Story fragment** (`story.html`), plus a
**Typography specimen** (`typography.html`).

Open `index.html` first. Everything cross-links. Content renders with JavaScript and
animation disabled; motion is enhancement only.

---

## 1 · What this proves (and what it doesn't)

**Proves:** the strategy survives contact with design. The Edge Line, the Descent,
numbers-as-instruments, swell-motion, and honest photography behavior resolve into one
coherent system that is *not* generic coastal-luxury and *not* a FoundryState house style
with golf photos dropped in.

**Doesn't (by scope):** no full site, no content migration, no booking backend, no
renovation hub, no 18 holes, no deploy. Imagery is labeled placeholder; most numbers are
labeled placeholder (see §7).

---

## 2 · Color tokens (all pairings WCAG-verified — computed, not asserted)

| Token | Hex | Role |
|---|---|---|
| `--fog` | `#EFF1F0` | base (cool marine-layer white — deliberately *not* cream) |
| `--fog-2` | `#E4E7E5` | panels |
| `--ink` | `#10171A` | text |
| `--pacific` | `#0E3540` | primary + **Book button fill** |
| `--pacific-2` | `#0A2830` | descent / dark fields |
| `--marine` | `#556268` | text-safe gray (labels, notes) |
| `--marine-soft` | `#64757B` | hairlines / large only — **not** for small text |
| `--sandstone` | `#C7B7A0` | warm neutral |
| `--eucalyptus` | `#5F6F63` | sparse native green |
| `--ochre` | `#B07A3D` | **reserved micro-signal only** (Book dot, active-hole marker, hairline accent) |
| `--ochre-ink` | `#946023` | ochre when text is unavoidable |

Verified contrast (foreground on background):

- ink / fog — **15.96** ✓ AAA
- pacific / fog — **11.56** ✓ AAA (headings, links)
- white / pacific — **13.11** ✓ AAA (Book button, dark fields)
- fog / pacific-2 — **13.62** ✓ AAA
- ink / sandstone — **9.24** ✓ AAA
- **marine `#556268` / fog — 5.55 ✓ AA** (this is the fix)
- marine-soft `#64757B` / fog — 4.23 → **AA-large only**, so restricted to hairlines
- ochre / fog — 3.25 → **decorative only**, never small text (enforced in the CSS)

**Why no terracotta.** The single biggest AI-design tell right now is cream + serif +
terracotta accent (~#D97757 — Anthropic's own interaction accent). The earlier plan's
"sun-faded coral" CTA was drifting into it. Rejected. The Book button is **Pacific-filled**;
warmth is a reserved ochre micro-signal. This is also more disciplined — the boldness is
spent in one place.

---

## 3 · Type tokens & the typography finding

**System (built): Archivo Expanded (display) + Archivo (text/UI) + Archivo tabular numerals (data).**
Display faces request the width axis (`font-stretch:125%`) and fall back gracefully to
normal-width Archivo if the expanded cut fails to load.

Scale is fluid (`clamp`): label → body → lead → h3 → h2 → display.

**The finding from testing three pairings** (see `typography.html`): the strategy
hypothesis was "grotesk + technical/data companion." On real content, the *mono* companion
(Space Grotesk + IBM Plex Mono) reads **fintech/tech-startup** — the exact aesthetic the
brief prohibits. So the sharper answer: a single architectural grotesk superfamily, with the
"instrument" quality carried by **tabular figures + label discipline**, not a second mono
face. Familjen Grotesk + Spline Sans Mono is kept as a warmer backup if Archivo ever tests
too austere. Distinct from Penrose (Lyon Text serif) and the rest of the FoundryState serif
houses.

---

## 4 · Motion tokens

- One easing: `--swell: cubic-bezier(.45,.05,.35,1)` — slow, symmetric, sinusoidal. No spring, no bounce.
- Durations: `--t-slow 900ms`, `--t-med 640ms`.
- One behavior: `.reveal` = opacity + 14px rise on scroll-in, small stagger via `--i`.
- Nav underline and Book hover use the same swell.
- `prefers-reduced-motion` → all reveals show instantly, transitions off. **The site is fully usable, and arguably calmer, with motion disabled** — which the brief said is acceptable.

---

## 5 · Design-system / architecture notes

- One shared stylesheet (`assets/app.css`), one behavior file (`assets/app.js`), one data
  file (`assets/data.js`). Facts are not scattered across components.
- **Content is in the HTML** (renders without JS). `data.js` is the documented single source
  of truth with verification flags; in production it feeds tour + scorecard + rates so the
  prototype's HTML mirroring collapses into one source.
- The Edge Line is implemented as **tonal fields meeting at a hairline** (land/sea), plus
  content aligned to a "waterline," not a decorative line drawn on every page.
- The Descent is **spacing compression + tonal deepening** down the homepage (airy fog →
  deep pacific at the ocean stretch → opens again), and hole sequencing on the tour. No
  parallax, no scroll-jacking.
- Numbers use one `.ledger` / `.datum` language everywhere: tabular numerals, uppercase
  letterspaced labels, hairline rules, right-aligned figures.
- Isolated workspace: `sandpiper-creative-proof/`. Nothing here is production architecture.

---

## 6 · Accessibility notes

- Semantic landmarks, one `<h1>` per page, logical heading order.
- Skip link on every page; visible focus (`2px` solid, high-contrast, never color-only).
- Mobile nav: real `<button>` with `aria-expanded`/`aria-controls`; closes on selection.
- Hole-jump: real buttons, `aria-current`, and an `aria-live` region announcing changes.
- No information conveyed by motion or color alone (ocean-stretch holes carry a text key,
  not just the ochre marker; placeholders carry visible text labels).
- Contrast verified (§2). Reduced-motion respected.
- Incomplete ARIA table roles were removed in favor of labelled groups that read cleanly in
  DOM order.

---

## 7 · Placeholder / unverified-content register

| Item | Status | Action before publish |
|---|---|---|
| All photography (hero, holes, archival) | **Placeholder** — CSS/SVG horizon fields, visibly tagged; never faked as photos | Commission eye-level coastal shoot; wire in with alt text already scaffolded |
| Green fees (all rates) | **Placeholder / indicative** | Replace from official rate card |
| Policies (cancellation, pace, range) | **Placeholder** | Confirm current shop terms |
| Hole 13 yardage, stroke index | **Placeholder ("—")** — no verified per-hole numbers | Pull from official scorecard |
| Hole 13 prevailing wind | **Omitted, not invented** (honesty rule) | Add only if verified |
| Holes 12 & 14 | **Scaffold** | Populate via the hole-13 template |
| Course rating | **Conflict** — 74.2 / 74.5 / 75.1 across sources | Resolve on official card |
| Oil-era dates | **Conflict** — 1927–1965 vs 1938–1954; flagged in the Story itself | Confirm; wartime date is well-documented |
| Verified & used as-is | Est. 1972 · William F. Bell · par 72 · ~7,068 yds tips · slope 134 · address/phone/hours · 1942 Bombardment of Ellwood (I-17) · ocean stretch holes 10–14 | — |

---

## 8 · Prototype-only vs production-candidate register

**Promote to production:** color/type/motion token systems; the `.ledger`/`.datum`
instrument language; the hole-jump + deep-link + `aria-live` pattern; the accessible nav;
the reveal-on-scroll behavior; the placeholder→real image swap architecture (alt text
already in place); the centralized `data.js` shape.

**Prototype-only / do not ship:** all placeholder imagery and the CSS horizon stand-ins;
all placeholder rates/policies; the booking availability **stub** (front-end echo only — no
backend); the generic hole scaffold; the typography specimen page.

---

## 9 · Self-critique (against the brief's checklist)

- **Bandon / Pebble / boutique-hotel with a logo swap?** No — cool fog (not cream), grotesk
  (not luxury serif), Pacific-filled CTA (not a warm-clay slab), and place-specific content
  (oil field, 1942, the ocean stretch) that no template carries.
- **Framer template / fashion editorial?** No — no full-bleed serif-over-photo hero; the hero
  is a horizon composition with an instrument facts strip.
- **Edge Line a gimmick?** Held to tonal-field boundaries + content alignment; not drawn on
  every page. Honest risk: on the homepage it's more *structural* than *dramatic* — see below.
- **Descent perceptible?** Yes on scroll (compression + darkening into the ocean stretch);
  it's intentionally subtle, not theatrical.
- **Numbers genuinely part of the identity?** Yes — same language on rates, facts, hole data,
  scorecard strip.
- **Grotesk/technical = tech startup?** Avoided by *rejecting the mono* (the finding in §3).
- **Booking obvious? Rates clear? Mobile designed?** Book persists in nav + repeats;
  rates use plain hierarchy; mobile has a dedicated nav and a top hole-jump rail for the
  3-second test.
- **Looks like Penrose / FoundryState-with-golf?** No — different type spine, different
  palette logic, different structural device.

**Where I pulled a punch, and why:** the original hero put the headline and CTAs *on* the
horizon gradient. It failed contrast on the dark lower half and would have hidden the Book
button. I chose a legible horizon composition over the more cinematic overlay. Accessibility
is non-negotiable per the brief; the drama can return in production via an art-directed photo
with a proper scrim, tested for contrast. Flagging it rather than hiding it.

---

## 10 · Recommendation

**Proceed to full production — with the creative direction locked and three revisions carried in.**

Confidence: high on the system (type, color, motion, instrument language, IA), because it
resolves cleanly and dodges every named failure mode. Medium on the *hero's* emotional peak,
which is currently structural rather than cinematic and will live or die on real photography.

Carry-ins to production:
1. **Photography is now the critical path.** The whole "eye-level, human-small, honest"
   thesis is asserted, not yet shown. Commission the shoot before committing to the hero's
   final drama; re-test the on-horizon headline overlay for contrast with the real image.
2. **Verify the numbers** (official scorecard + rate card) and resolve the rating and oil-date
   conflicts. The instrument language is only as good as the data behind it.
3. **Decide the hero's ambition** — keep the disciplined horizon shelf, or push the cinematic
   overlay once a real photo exists. That's a one-line decision for you; I'd hold the
   disciplined version until the photo proves the bolder one.

Reject only if the photography can't be produced at eye-level/honest quality — in which case
the entire premise weakens and it *would* start drifting toward the generic coastal look the
brief exists to avoid.

---

## 11 · Iteration 03 addendum (render-verified pass)

**First actual render.** Prior iterations were built without a browser. Iteration 03 rendered
all four pages in a real browser at desktop width and confirmed the system holds in pixels
(Archivo Expanded display, photographic hero, the descent sequence, the Hole-13 stage).
Mobile widths (375/390/768) were **not** render-verified in this pass — that remains the
client's device gate. Frozen compositions (homepage hero, Hole-13 stage) were left untouched.

**New reference imagery (all AI-generated, tagged "Reference only", never presented as real):**

| File | Role | Source frame |
|---|---|---|
| `events.webp/.jpg` | Homepage Events — bluff banquet | lucid-origin outdoor-dinner |
| `grill.webp/.jpg` | Homepage Grill — interior/coast (portrait register) | lucid-origin hospitality-interior |
| `story-1942.webp/.jpg` | Story — the 1942 interruption (night coast, offshore vessel) | lucid-origin Ellwood-bluff-night; labeled **interpretive, not archival** |
| `hole-transition.webp/.jpg` | Tour — Hole 10 transition/reveal | lucid-origin telephoto layered-coast |

**Updated placeholder / unverified register (adds to §7):**

| Item | Status | Finalizes when |
|---|---|---|
| Inland hole reference frame (Hole 4) | **Missing shot type** — labeled placeholder used; no coastal image forced in | Commission an inland/front-nine frame |
| Story extraction-era ("Before") image | **Placeholder — interpretive** | Source real public-domain archival (preferred) |
| Story geography cross-section | **Honest schematic**, tagged "not to scale" | Optional: replace with verified survey/map |
| Story 1942 image | **Interpretive AI reference**, explicitly not a historical photo | Real archival if available |
| Holes 4 & 10 par / yardage / stroke / wind | **Pending / omitted** (`—`) — no numbers invented | Official scorecard |

**Booking model:** changed from a front-end **availability stub** (fake "Check availability"
→ echoed result) to **Model A — direct handoff** (transparent rates + one clear route to the
real tee-time system; no simulated search or result). The old stub JS was removed from `app.js`.

**Contrast:** no new color pairings introduced — all new sections reuse existing AA-verified
tokens (§2). Events/Grill copy uses `--marine` on `--fog` (5.55:1); the 1942 overlay uses
`#eef3f2`/white on a ≥.5 dark scrim over a near-black night image.

**Course system — 3 contrasting archetypes (proves variation without losing coherence):**
1. **Hole 13** — ocean climax; data *on* the photograph (unchanged, frozen reference).
2. **Hole 10** — transition/reveal; photograph leads full-width, data *below*.
3. **Hole 4** — inland/build-up; data-led, **no ocean imagery**, labeled placeholder for the
   missing inland frame. Shared: data language, nav, type, hole-jump. Distinct: composition,
   image position, ocean relationship, data density.

---

## 12 · Full 18-hole reference imagery (temporary AI placeholders)

**TEMPORARY AI REFERENCE ASSETS — REPLACE WITH VERIFIED SANDPIPER PHOTOGRAPHY BEFORE PRODUCTION.**
Not evidence of actual routing, hazards, par, yardage, ocean relationship, architecture, or
strategy. Source masters preserved untouched in `~/Downloads/18 holes/`; project copies live in
`assets/images/course/holes/` as AVIF + WebP + JPG (1344w) + 800w WebP for mobile srcset.

- All 18 holes now render their own visual state via the hole-jump selector; Hole 4 (inland,
  data-led) and Hole 10 (reveal, photo-then-data) keep their distinct compositions; Hole 13
  remains the frozen reference; the rest use the hole-stage overlay with a **per-hole
  `object-position`** so crops are not identical.
- Facts stay honest: every hole shows par/yardage/hazards as “—” pending the official scorecard;
  only the verified ocean-stretch (holes 10–14) carries a Pacific relationship label.
- Perf: AVIF ~50–74 KB/hole; non-current holes are `hidden` + `loading="lazy"` (deferred);
  explicit 1344×768 dimensions prevent CLS; nothing preloaded.
- Two source frames unused (a tight flag/cup detail and a near-duplicate coastal green); mapping
  recorded in `assets/images/course/holes/mapping.json`.
