/* SANDPIPER — Creative Proof · centralized content/data (single source of truth).
   VERIFICATION FLAGS:  V = verified (see NOTES source ledger)
                        P = PLACEHOLDER / indicative — replace before any publish
                        O = intentionally omitted (not verified; honesty rule)
   The prototype HTML mirrors these values so pages render without JS.
   In production this becomes the shared data module for tour + scorecard + rates. */
window.SANDPIPER = {
  facts: {
    name: 'Sandpiper Golf Club',              // V
    address: '7925 Hollister Avenue, Goleta, CA 93117', // V
    phone: '805.968.1541',                    // V
    email: 'golfshop@sandpipergolf.com',      // V
    hours: '6:30 AM – 8:30 PM daily',         // V
    opened: 1972,                              // V
    architect: 'William F. Bell',              // V
    holes: 18, par: 72,                        // V
    yardageTips: 7068,                         // V (approx, "over 7,000")
    slope: 134,                                // V (confirm official scorecard)
    ratingNote: '74.2 / 74.5 / 75.1 across sources — CONFLICT, resolve on official card' // V(conflict)
  },
  nav: [
    { label: 'The Course', href: 'tour.html' },
    { label: 'Rates & Tee Times', href: 'rates.html' },
    { label: 'Events', href: '#', stub: true },
    { label: 'The Grill', href: '#', stub: true },
    { label: 'Story', href: 'story.html' }
  ],
  // Indicative rates — NONE verified. Replace with official rate card. (all P)
  rates: {
    flag: 'P',
    rows: [
      { k: 'Weekday · 18 holes', sub: 'Mon–Thu, before noon', v: 175 },
      { k: 'Weekend · 18 holes', sub: 'Fri–Sun & holidays, before noon', v: 195 },
      { k: 'Twilight', sub: 'After 2:00 PM, cart included', v: 105 },
      { k: 'Super-twilight', sub: 'After 4:00 PM', v: 75 },
      { k: 'Replay (same day)', sub: 'Subject to availability', v: 60 },
      { k: 'Cart', sub: 'Per player, where not included', v: 22 }
    ],
    policies: [
      'Cancellations accepted up to 24 hours before your tee time.',
      'Pace of play is managed; plan for roughly 4½ hours.',
      'The marine layer can hold into late morning — layers are wise even in summer.',
      'All-grass practice range; range balls included with your round.'
    ]
  },
  // Course tour — qualitative notes are VERIFIED & cited; numbers are PLACEHOLDER.
  holes: {
    oceanStretch: [10, 11, 12, 13, 14],       // V (reviews: "10–14 along the ocean")
    detail: {
      // Iteration 03 — contrasting archetypes (character verified/qualitative; numbers P)
      4:  { par: null, pacific: 'none (inland)', character: 'front-nine, rolling inland ground — the ocean is not in play', // character only
            yardage: { black: null, blue: null, white: null, gold: null }, strokeIndex: null, wind: null,
            flag: 'archetype-inland', imageMissing: 'inland hole reference frame (the one shot type absent from the set)' },
      10: { par: null, pacific: 'comes into play — the ocean stretch begins here', character: 'transition / reveal into the ocean stretch', // V (10–14 ocean)
            yardage: { black: null, blue: null, white: null, gold: null }, strokeIndex: null, wind: null,
            flag: 'archetype-transition', image: 'hole-transition' },
      12: { par: 4,  pacific: 'adjacent', flag: 'scaffold' },
      13: {
        par: 5,                                // V
        name: 'The reachable par five',        // descriptive, from character
        pacific: 'plays toward the ocean',     // V (back-nine ocean hole)
        strategy: 'A good drive tempts you to go for the green in two — the reward and the risk both sit out toward the water.', // V (paraphrased Golf Digest panelist)
        yardage: { black: null, blue: null, white: null, gold: null }, // P (omitted — no verified per-hole numbers)
        strokeIndex: null,                     // P
        wind: null,                            // O (not verified — omitted, not invented)
        source: 'Golf Digest course profile (panelist notes); player reviews'
      },
      14: { par: 4,  pacific: 'adjacent', flag: 'scaffold' }
    }
  },
  // Story — all VERIFIED, cited; oil-era dates carry a documented conflict.
  story: {
    chapters: [
      { year: '1927', text: 'Oil is struck at the Ellwood field on the bluffs west of Goleta.', flag: 'V-conflict' },
      { year: '1942', text: 'On February 23, a Japanese submarine (I-17) surfaces offshore and shells the Ellwood oil facility — the first attack on the U.S. mainland in the Second World War.', flag: 'V' },
      { year: '1965', text: 'Oil production on the site winds down.', flag: 'V-conflict' },
      { year: '1972', text: 'The land opens as a golf course — William F. Bell’s routing along the same bluffs.', flag: 'V' }
    ],
    conflictNote: 'Oil-era dates differ by source (Ellwood 1927–1965 vs. ARCO 1938–1954). Recorded, unresolved.'
  }
};

/* ------------------------------------------------------------------
   OUTBOUND DESTINATIONS (single source of truth for external links).
   Every value is null until a VERIFIED live URL is supplied. Links that
   reference a null destination render in an honest "pending" state — they
   do NOT navigate and do NOT jump to top. To go live, paste the real URL
   here (no markup changes needed). Do not invent URLs.
   ------------------------------------------------------------------ */
window.SANDPIPER.destinations = {
  book_nonResident: null,   // Non-Resident public booking
  book_resident:    null,   // Tri-County Resident booking
  book_preferred:   null,   // Preferred Player sign-in / booking
  book_montecito:   null,   // Montecito Club member channel
  grillMenu:        null,   // The Grill menu
  scorecard:        null    // Official scorecard
};
