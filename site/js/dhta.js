/* Develop-HTA — interactions: Lenis(GSAP-ticker) smooth scroll, masked-line
   heading reveal, slide-down nav, stepper, form states, block reveals.
   Ported from the Gmax / Reference-Clone motion system. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (location.hash === '#still') document.documentElement.classList.add('still');

  /* ---- smooth scroll: Lenis tied to the GSAP ticker (the proven config) ---- */
  var lenis = null;
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (!reduce && window.Lenis && window.gsap) {
    lenis = new Lenis({ duration: 0.9, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  // in-page anchors go through Lenis; cross-page links navigate normally
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -76, duration: 1.2 }); else el.scrollIntoView();
    });
  });

  /* ---- slide-down nav + stuck state ---- */
  var header = document.querySelector('.site-header');
  var links = document.querySelector('.nav__links');
  if (header) {
    var lastY = 0;
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 8);
      var menuOpen = links && links.classList.contains('open');
      if (y > 90 && y > lastY && !menuOpen) header.classList.add('nav--hidden');
      else header.classList.remove('nav--hidden');
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile nav toggle ---- */
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- hero video: pause under reduced-motion (poster stands) ---- */
  var hv = document.getElementById('hero-video');
  if (hv && reduce) { hv.removeAttribute('autoplay'); hv.pause(); }

  /* ---- masked-line heading reveal (words/lines rise behind a mask) ---- */
  var still = location.hash === '#still';
  if (!reduce && window.gsap) {
    [].slice.call(document.querySelectorAll('.reveal-h')).forEach(function (h) {
      h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map(function (p) {
        return '<span class="ln"><span class="ln-i">' + p + '</span></span>';
      }).join('');
      var inners = h.querySelectorAll('.ln-i');
      if (still) { gsap.set(inners, { yPercent: 0 }); return; }
      gsap.set(inners, { yPercent: 120 });
      if (h.closest('.hero')) {
        gsap.to(inners, { yPercent: 0, duration: 0.95, stagger: 0.1, ease: 'expo.out', delay: 0.15 });
      } else if (window.ScrollTrigger) {
        ScrollTrigger.create({
          trigger: h, start: 'top 88%', once: true,
          onEnter: function () { gsap.to(inners, { yPercent: 0, duration: 0.95, stagger: 0.1, ease: 'expo.out' }); }
        });
      } else {
        gsap.set(inners, { yPercent: 0 });
      }
    });
  }

  /* ---- accordion stepper (interior pages) — skip the interactive workflow rail ---- */
  document.querySelectorAll('.step__btn').forEach(function (btn) {
    if (btn.closest('.workflow')) return;
    btn.addEventListener('click', function () {
      var step = btn.closest('.step');
      var open = step.getAttribute('aria-expanded') === 'true';
      step.setAttribute('aria-expanded', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
      if (window.ScrollTrigger) setTimeout(ScrollTrigger.refresh, 360);
    });
  });

  /* ---- interactive workflow stepper (homepage): rail + linked canvas panel ---- */
  (function () {
    var wf = document.querySelector('.workflow');
    if (!wf) return;
    var steps = [].slice.call(wf.querySelectorAll('.step'));
    var body = wf.querySelector('.workflow__body');
    var canvas = wf.querySelector('.workflow__canvas canvas');
    if (!steps.length || !body || !canvas) return;
    var current = 0, timer = null, interacted = false;

    function select(i, focus) {
      i = (i + steps.length) % steps.length;
      current = i;
      steps.forEach(function (s, k) {
        var on = k === i;
        s.setAttribute('aria-selected', String(on));
        var b = s.querySelector('.step__btn');
        if (b) { b.setAttribute('aria-selected', String(on)); b.setAttribute('tabindex', on ? '0' : '-1'); }
      });
      var st = steps[i];
      body.textContent = st.getAttribute('data-detail') || '';
      canvas.setAttribute('data-viz', st.getAttribute('data-viz') || 'molecular');
      canvas.setAttribute('data-seed', st.getAttribute('data-seed') || '21');
      if (window.DHTAViz && window.DHTAViz.redraw) window.DHTAViz.redraw(canvas);
      if (focus) { var fb = st.querySelector('.step__btn'); if (fb) fb.focus(); }
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function userActed() { interacted = true; stop(); }

    steps.forEach(function (s, i) {
      s.addEventListener('click', function () { userActed(); select(i); });
      var b = s.querySelector('.step__btn');
      if (b) b.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); userActed(); select(current + 1, true); }
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); userActed(); select(current - 1, true); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); userActed(); select(i); }
      });
    });

    select(0);
    // auto-advance: paused on first interaction, never started under reduced motion
    if (!reduce) timer = setInterval(function () { if (!interacted) select(current + 1); }, 4500);
  })();

  /* ---- contact form: real loading -> success feedback ---- */
  var form = document.querySelector('form[data-contact]');
  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.classList.add('is-loading'); btn.setAttribute('aria-busy', 'true'); }
      setTimeout(function () {
        if (btn) { btn.classList.remove('is-loading'); btn.removeAttribute('aria-busy'); }
        var ok = form.querySelector('.form-ok');
        if (ok) ok.hidden = false;
      }, 900);
    });
  }

  /* ---- whole-block reveal for non-heading content (bodies, tiles, cards) ---- */
  var revs = document.querySelectorAll('.reveal');
  if (revs.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    var vh = window.innerHeight || 800;
    revs.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('shown');
      else io.observe(el);
    });
  } else {
    revs.forEach(function (el) { el.classList.add('shown'); });
  }

  if (window.ScrollTrigger) window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
