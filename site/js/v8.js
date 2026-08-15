/* Develop-HTA v8 - one motion vocabulary, library-light vanilla.
   Lenis momentum + IntersectionObserver reveals + ONE shared rAF scroll loop that drives
   the sticky header, hero/mission/band parallax, and the pinned scroll-tracked 4-step (S3).
   FAQ accordion (S8) is click/keyboard; the standards marquee (S6) and hero ken-burns are
   pure CSS. No GSAP, no ScrollTrigger. Every scroll-linked effect has a reduced-motion
   fallback that shows the final, static state. See research/v8/motion-spec.md. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- shared scroll engine: one listener sets a flag, one rAF does all reads ---------- */
  var readers = [];        // fn(scrollY) - scroll-linked writers
  var measurers = [];      // fn() - cache layout so the tick never thrashes
  var ticking = false;
  function tick() {
    var y = window.scrollY || window.pageYOffset || 0;
    for (var i = 0; i < readers.length; i++) readers[i](y);
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  function measure() { for (var i = 0; i < measurers.length; i++) measurers[i](); }

  /* ---------- Lenis smooth scroll (kept; scrolls the real document, so sticky + rAF work) ---------- */
  var lenis = null;
  try {
    if (window.Lenis && !reduce) {
      lenis = new Lenis({ duration: 0.9, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      lenis.on('scroll', onScroll);
    }
  } catch (e) {}

  /* ---------- (a) scroll reveals: IO adds .in once, then unobserves ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv:not(.in)').forEach(function (el) { io.observe(el); });

  /* ---------- (h) sticky header: state (not motion), so it runs even under reduced-motion ---------- */
  var hdr = document.querySelector('.hdr');
  if (hdr) readers.push(function (y) { hdr.classList.toggle('stuck', y > 40); });

  /* ---------- (b) hero parallax via independent `translate` (composes with the CSS ken-burns scale) ---------- */
  var heroImg = document.querySelector('.hero__media [data-parallax]');
  if (heroImg && !reduce) {
    readers.push(function (y) {
      if (y < innerHeight * 1.3) heroImg.style.translate = '0 ' + (y * 0.06).toFixed(2) + 'px';
    });
  }

  /* ---------- (b) soft parallax on the mission portrait + the closing band photo ---------- */
  var soft = document.querySelector('[data-parallax-soft]');
  if (soft && !reduce) {
    readers.push(function () {
      var r = soft.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        var off = (r.top + r.height / 2 - innerHeight / 2) * -0.05;
        soft.style.transform = 'translate3d(0,' + off.toFixed(2) + 'px,0)';
      }
    });
  }
  var band = document.querySelector('[data-parallax-band]');
  if (band && !reduce) {
    readers.push(function () {
      var r = band.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        var off = (r.top + r.height / 2 - innerHeight / 2) * -0.06;
        band.style.transform = 'translate3d(0,' + off.toFixed(2) + 'px,0) scale(1.08)';
      }
    });
  }

  /* ---------- (c) HOW AN ASSESSMENT WORKS - pinned scroll-tracked 4-step (the centrepiece) ---------- */
  (function () {
    var sec = document.querySelector('[data-tracked]');
    if (!sec) return;
    var track = sec.querySelector('[data-track]');
    var steps = [].slice.call(sec.querySelectorAll('[data-step]'));
    var rail = sec.querySelector('[data-rail]');
    var ticks = [].slice.call(sec.querySelectorAll('[data-ticks] span'));
    var view = sec.querySelector('.tracked__view');
    var N = steps.length;
    if (!track || !view || N < 2) return;

    function setState(idx, p) {
      for (var i = 0; i < N; i++) steps[i].classList.toggle('is-active', i === idx);
      for (var j = 0; j < N; j++) if (ticks[j]) ticks[j].classList.toggle('on', j <= idx);
      steps[idx].setAttribute('aria-current', 'step');
      for (var k = 0; k < N; k++) if (k !== idx) steps[k].removeAttribute('aria-current');
      if (rail) rail.style.width = (100 / N + p * (100 - 100 / N)).toFixed(2) + '%';
    }

    // Fallback: reduced-motion or narrow viewport -> the authored readable vertical stack, all lit.
    if (reduce || innerWidth < 760) {
      steps.forEach(function (s) { s.classList.add('is-active'); });
      ticks.forEach(function (t) { t.classList.add('on'); });
      if (rail) rail.style.width = '100%';
      return;
    }

    // Progressive enhancement: switch to the pinned horizontal mode ONLY once JS is wired.
    sec.classList.add('is-pinned');

    // Tall wrapper + sticky inner = the pin. Wrapping the view keeps the rail/CTA siblings
    // from overlapping the stuck panel (classic sticky-scroll pattern, no GSAP pinSpacing).
    var pin = document.createElement('div');
    pin.className = 'tracked__pinwrap';
    pin.style.position = 'relative';
    view.parentNode.insertBefore(pin, view);
    pin.appendChild(view);
    view.style.position = 'sticky';
    view.style.top = '0';
    view.style.height = '100svh';
    view.style.willChange = 'transform';

    var travel = 1;
    measurers.push(function () {
      pin.style.height = (100 + (N - 1) * 80) + 'vh';   // 100svh panel + ~0.8vh-of-scroll per step transition
      travel = Math.max(1, pin.offsetHeight - view.offsetHeight);
    });

    readers.push(function () {
      var p = Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / travel));
      track.style.transform = 'translate3d(' + (-p * (N - 1) * 100).toFixed(3) + '%,0,0)';
      setState(Math.min(N - 1, Math.max(0, Math.round(p * (N - 1)))), p);
    });
  })();

  /* ---------- (d) FAQ accordion: real <button>, one open at a time, keyboard-native ---------- */
  (function () {
    var root = document.querySelector('[data-accordion]');
    if (!root) return;
    var items = [].slice.call(root.querySelectorAll('.faq__item'));
    root.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.faq__q');
      if (!btn) return;
      var item = btn.closest('.faq__item');
      var willOpen = !item.classList.contains('open');
      items.forEach(function (it) {
        it.classList.remove('open');
        var b = it.querySelector('.faq__q'); if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  })();

  /* ---------- (f) standards marquee (S6) + (g) card hover (S4) are pure CSS - nothing to wire ---------- */

  /* ---------- boot the shared engine ---------- */
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });
  addEventListener('load', function () { measure(); onScroll(); });   // re-measure after images/fonts
  measure();
  onScroll();
})();
