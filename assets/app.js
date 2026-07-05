/* SANDPIPER — Creative Proof · shared behavior (progressive enhancement).
   All content is present in HTML without JS; JS only enhances. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Mobile nav toggle (accessible) --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.querySelector('[data-label]').textContent = open ? 'Menu' : 'Close';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 860) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('[data-label]').textContent = 'Menu';
      }
    });
  }

  /* --- Swell reveal (and the climax arrival-settle) --- */
  var reveals = document.querySelectorAll('.reveal, .swell');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* --- Course-tour: hole jump + deep-link (the 3-second test) --- */
  var holeButtons = document.querySelectorAll('[data-hole]');
  var holePanels = document.querySelectorAll('[data-hole-panel]');
  function showHole(n, push) {
    // Act only when a real panel exists (all 18 holes are built); an unknown
    // hole is ignored so nothing is ever blanked.
    var panel = document.querySelector('[data-hole-panel="' + n + '"]');
    if (!panel) return;
    holePanels.forEach(function (p) { p.hidden = (p !== panel); });
    holeButtons.forEach(function (b) {
      var on = b.getAttribute('data-hole') === String(n);
      b.setAttribute('aria-current', on ? 'true' : 'false');
    });
    if (push) history.replaceState(null, '', '#hole-' + n);
    var live = document.getElementById('hole-live');
    if (live) live.textContent = 'Showing hole ' + n;
  }
  if (holeButtons.length) {
    holeButtons.forEach(function (b) {
      b.addEventListener('click', function () { showHole(b.getAttribute('data-hole'), true); });
    });
    // Deep-link (#hole-N); an invalid/unknown hash falls back to the default hole.
    var m = (location.hash.match(/hole-(\d+)/) || [])[1];
    var valid = m && document.querySelector('[data-hole-panel="' + m + '"]');
    var initial = valid ? m
      : (document.querySelector('[data-hole-panel]:not([hidden])')
          ?.getAttribute('data-hole-panel') || '13');
    showHole(initial, false);
  }

  /* --- Dependency-safe outbound links (booking paths, menu, scorecard) ---
     Each control carries data-dest="key"; its URL lives in SANDPIPER.destinations.
     Resolved -> becomes a real link. Unresolved (null) -> stays a focusable,
     announced control that does NOT navigate and NEVER jumps to top. No fake
     navigation, no fabricated URL; going live is a config edit only. */
  var DEST = (window.SANDPIPER && window.SANDPIPER.destinations) || {};
  document.querySelectorAll('[data-dest]').forEach(function (el) {
    var url = DEST[el.getAttribute('data-dest')];
    if (url) {
      el.setAttribute('href', url);
      el.removeAttribute('aria-disabled');
      el.removeAttribute('role');
      el.removeAttribute('tabindex');
      el.classList.remove('is-pending');
      el.removeAttribute('title');
      if (/^https?:/i.test(url)) { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
    } else {
      el.classList.add('is-pending');
      el.setAttribute('aria-disabled', 'true');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'link');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      el.setAttribute('title', 'Booking destination pending verification (proof stage).');
      var stop = function (e) { e.preventDefault(); };
      el.addEventListener('click', stop);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); });
    }
  });
})();
