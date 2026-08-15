// Develop-HTA v9 - Lenis smooth scroll + IntersectionObserver reveals. No pinned scroll (FH uses cards).
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // header stuck-on-scroll
  var hdr = document.getElementById('hdr');
  function onScroll() { hdr.classList.toggle('stuck', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // hero video: respect reduced-motion
  var v = document.getElementById('hero-video');
  if (v && reduce) { v.removeAttribute('autoplay'); v.pause(); }

  // Lenis smooth scroll (the buttery base layer)
  if (!reduce && window.Lenis) {
    var lenis = new Lenis({ duration: 1.05, smoothWheel: true, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
  }

  // FH-style subtle fade-up reveals
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el, i) { el.style.transitionDelay = (i % 4 * 0.06) + 's'; io.observe(el); });
    }
  }

  // tooltip tap support (mobile has no hover)
  [].slice.call(document.querySelectorAll('.chip')).forEach(function (c) {
    c.addEventListener('click', function (e) { e.preventDefault(); c.classList.toggle('tip-open'); });
  });
})();
