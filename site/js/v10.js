// Develop-HTA v10 — distortion-video hero (Three.js) + Lenis + reveals + marquee.
import * as THREE from './vendor/three.module.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- nav stuck ---------- */
const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 40);
onScroll(); addEventListener('scroll', onScroll, { passive: true });

/* ---------- Lenis smooth scroll + GSAP ScrollTrigger ---------- */
let lenis = null;
if (!reduce && window.Lenis) lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, easing: t => 1 - Math.pow(1 - t, 3) });
const gsap = window.gsap, ST = window.ScrollTrigger;
if (gsap && ST) {
  gsap.registerPlugin(ST);
  if (lenis) { lenis.on('scroll', ST.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
} else if (lenis) {
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
}

/* ---------- come-to-life motion — a DISTINCT beat per section (not one shared fade) ---------- */
if (reduce || !(gsap && ST)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));   // fallback: visible (how = vertical card stack, CSS default)
} else {
  const at = (trigger, start = 'top 82%') => ({ trigger, start, once: true });
  const cp = 'transform,opacity';   // NOT 'all' — 'all' wipes the inline --img custom prop on bento tiles

  // section headings — ONE signature reveal everywhere (kicker fades, headline rises + sharpens from blur) => the site moves in unison
  gsap.utils.toArray('.sec-head').forEach(h => {
    const tl = gsap.timeline({ scrollTrigger: at(h) });
    const k = h.querySelector('.kicker'), h2 = h.querySelector('h2');
    if (k) tl.from(k, { y: 14, opacity: 0, duration: .5, ease: 'power2.out' }, 0);
    if (h2) tl.from(h2, { y: 30, opacity: 0, filter: 'blur(10px)', duration: .95, ease: 'power3.out', clearProps: 'filter' }, .12);
  });

  // intro — settle in
  gsap.from('.intro__body', { scrollTrigger: at('.intro__body'), y: 26, opacity: 0, duration: .7, ease: 'power3.out', clearProps: cp });

  // how-it-works — cloned from FH "How it works": each numbered card COMES TO LIFE on scroll
  // (number + card rise in, photo settles from a slow zoom), staggered left->right (P3 reveal-kit)
  // how-it-works — ONE-LINE horizontal gallery: pin the section on one screen; vertical scroll drives
  // the row right->left so the next card comes along (scroll-motion-effects P6 horizontal pin, no wheel-capture)
  const howPin = document.querySelector('.how__pin');
  const howTrack = document.querySelector('.how__track');
  if (howPin && howTrack && !matchMedia('(max-width:820px)').matches) {
    document.querySelector('.how').classList.add('how--horizontal');
    const dist = () => Math.max(0, howTrack.scrollWidth - howPin.clientWidth);
    gsap.to(howTrack, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: howPin, pin: true, scrub: 0.5, start: 'top top',
        end: () => '+=' + dist(), invalidateOnRefresh: true,
      },
    });
  }

  // bento — the mosaic assembles (random-order pop)
  gsap.from('.bento .tile', { scrollTrigger: at('.bento'), scale: .9, y: 34, opacity: 0, duration: .7, stagger: { each: .09, from: 'random' }, ease: 'power3.out', clearProps: cp });

  // comparison — rows slide in, then the teal checks pop
  gsap.from('.cmp__row', { scrollTrigger: at('.cmp__table'), x: -26, opacity: 0, duration: .5, stagger: .1, ease: 'power2.out', clearProps: cp });
  gsap.from('.cmp__row .cmp__c--us', { scrollTrigger: at('.cmp__table', 'top 72%'), scale: 0, transformOrigin: '50% 50%', duration: .5, stagger: .1, delay: .25, ease: 'back.out(2.4)', clearProps: 'transform' });

  // founders — portraits rise
  gsap.from('.fnd__grid .person', { scrollTrigger: at('.fnd__grid'), y: 42, opacity: 0, duration: .75, stagger: .16, ease: 'power3.out', clearProps: cp });

  // work-with-us — settle in
  gsap.from('.engage .reveal', { scrollTrigger: at('.engage'), y: 26, opacity: 0, duration: .7, stagger: .12, ease: 'power3.out', clearProps: cp });

  ST.refresh();
}

/* ---------- evidence-body marquee (logo lockups) ---------- */
// FH-style monochrome logo wall. Real marks where sourced; typographic wordmarks otherwise.
// NOTE: WHO/IQWiG are real trademarked marks shown for this pre-launch MOCKUP — must be legal-cleared before go-live.
// Real official marks (shown for the mockup; legal-clear before public launch).
const bodies = [
  { img: 'assets/logos/who.svg', name: 'World Health Organization', info: 'Sets global health norms and prequalifies medicines, vaccines and diagnostics for safety, quality and efficacy.' },
  { img: 'assets/logos/cochrane.png', name: 'Cochrane', info: 'Produces systematic reviews, the gold standard for synthesising medical evidence into what actually works.' },
  { img: 'assets/logos/nice.png', name: 'NICE', info: 'The UK institute that pioneered using health technology assessment to decide what a health system should fund.' },
  { img: 'assets/logos/iqwig.svg', name: 'IQWiG', info: "Germany's independent institute assessing the benefit and value of medical interventions." },
  { img: 'assets/logos/inahta.png', name: 'INAHTA', info: 'The international network connecting the national HTA agencies whose methods we build on.' },
];
const field = document.getElementById('brandfield');
if (field) {
  const btn = b => `<button class="brand" type="button" data-name="${b.name}" data-info="${b.info}" data-img="${b.img}" aria-label="${b.name}"><img src="${b.img}" alt="${b.name}" loading="lazy"></button>`;
  const set = [bodies, bodies, bodies, bodies].flat().map(btn).join('');   // one endless line, right-to-left
  field.innerHTML = `<div class="brow"><div class="brow__track" style="animation-duration:46s">${set}${set}</div></div>`;

  const pop = document.getElementById('brandPop');
  const pLogo = document.getElementById('bpLogo'), pTitle = document.getElementById('bpTitle'), pBody = document.getElementById('bpBody');
  let pOpener = null;
  const openPop = b => {
    pLogo.innerHTML = `<img src="${b.dataset.img}" alt="">`;
    pTitle.textContent = b.dataset.name; pBody.textContent = b.dataset.info;
    pop.hidden = false; requestAnimationFrame(() => pop.classList.add('is-open'));
    pOpener = b; if (lenis) lenis.stop();
    pop.querySelector('.bpop__close').focus({ preventScroll: true });
  };
  const closePop = () => { pop.classList.remove('is-open'); if (lenis) lenis.start(); setTimeout(() => { pop.hidden = true; }, 240); pOpener?.focus?.({ preventScroll: true }); };
  field.addEventListener('click', e => { const b = e.target.closest('.brand'); if (b) openPop(b); });
  pop.querySelectorAll('[data-bclose]').forEach(el => el.addEventListener('click', closePop));
  addEventListener('keydown', e => { if (!pop.hidden && e.key === 'Escape') closePop(); });
}

/* ---------- WebGL distortion hero ---------- */
(function heroGL() {
  const canvas = document.getElementById('gl');
  const video = document.getElementById('heroVideo');
  if (!canvas || !video) return;

  // Mobile / low-power: skip the WebGL shader, play the video plain (perf + battery). Poster covers the gap.
  const lowPower = matchMedia('(max-width:768px)').matches || matchMedia('(pointer:coarse)').matches
    || (navigator.connection && navigator.connection.saveData);
  if (lowPower) { video.classList.add('plain'); if (!reduce) video.play().catch(() => {}); return; }

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); }
  catch (e) { return; }                                   // no WebGL -> poster/video stands
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const tex = new THREE.VideoTexture(video);
  tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter;

  const uniforms = {
    uTex: { value: tex }, uTime: { value: 0 },
    uAmp: { value: reduce ? 0 : 1 }, uMouse: { value: new THREE.Vector2(.5, .5) },
    uCanvas: { value: new THREE.Vector2(1, 1) }, uVideo: { value: new THREE.Vector2(16, 9) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.); }`,
    fragmentShader: `
      precision highp float; varying vec2 vUv;
      uniform sampler2D uTex; uniform float uTime; uniform float uAmp;
      uniform vec2 uMouse; uniform vec2 uCanvas; uniform vec2 uVideo;
      void main(){
        // cover-fit
        vec2 uv = vUv;
        float ca = uCanvas.x/uCanvas.y, va = uVideo.x/uVideo.y;
        if(ca>va){ uv.y = (uv.y-.5)*(va/ca)+.5; } else { uv.x=(uv.x-.5)*(ca/va)+.5; }
        // organic liquid-glass refraction (domain-warped flow, not a sine wobble)
        float t = uTime*0.08;
        vec2 p = uv*2.2;
        vec2 w1 = vec2(sin(p.y*1.6 + t*2.0), cos(p.x*1.8 - t*1.7));
        vec2 w2 = vec2(sin((p.x + w1.y)*2.1 + t*1.3), cos((p.y + w1.x)*2.3 - t*1.1));
        vec2 d = (w1*0.6 + w2*0.4) * 0.006 * uAmp;
        vec3 col = texture2D(uTex, uv + d).rgb;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    uniforms.uCanvas.value.set(w, h);
  }
  new ResizeObserver(resize).observe(canvas); resize();

  addEventListener('pointermove', e => {
    uniforms.uMouse.value.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
  }, { passive: true });

  let raf, ready = false;
  function loop(t) { uniforms.uTime.value = t / 1000; renderer.render(scene, camera); raf = requestAnimationFrame(loop); }

  function start() {
    if (ready) return; ready = true;
    uniforms.uVideo.value.set(video.videoWidth || 16, video.videoHeight || 9);
    canvas.classList.add('on');                            // fade GL in over poster
    if (!reduce) loop(0);
    else renderer.render(scene, camera);
  }
  video.addEventListener('loadeddata', start);
  video.play().then(() => { if (video.readyState >= 2) start(); }).catch(() => {/* keep poster */ });
})();

/* ---------- WHAT WE ASSESS — enlarge + flip modal ---------- */
(function assessFlip() {
  const modal = document.getElementById('assessModal');
  if (!modal) return;
  const card = modal.querySelector('.amodal__card');
  const front = modal.querySelector('.amodal__face--front');
  const ftitle = modal.querySelector('.amodal__ftitle');
  const title = modal.querySelector('.amodal__title');
  const body = modal.querySelector('.amodal__body');
  const closeBtn = modal.querySelector('.amodal__close');
  const tiles = [...document.querySelectorAll('.bento .tile')];
  const pageEls = [...document.body.children].filter(el => el !== modal);
  let opener = null;

  function open(tile) {
    opener = tile;
    const name = tile.querySelector('h3')?.textContent.trim() || '';
    ftitle.textContent = name; title.textContent = name; body.textContent = tile.dataset.how || '';
    front.className = 'amodal__face amodal__face--front';
    if (tile.classList.contains('tile--img')) front.classList.add('tile--img');
    const img = tile.style.getPropertyValue('--img');
    img ? front.style.setProperty('--img', img) : front.style.removeProperty('--img');
    modal.hidden = false;
    document.body.classList.add('amodal-open');
    pageEls.forEach(el => el.setAttribute('inert', ''));
    if (lenis) lenis.stop();
    tile.setAttribute('aria-expanded', 'true');
    if (!reduce) {
      const r = tile.getBoundingClientRect(), cr = card.getBoundingClientRect();
      card.style.transformOrigin = `${(r.left + r.width / 2) - cr.left}px ${(r.top + r.height / 2) - cr.top}px`;
    }
    requestAnimationFrame(() => modal.classList.add('is-open'));
    setTimeout(() => closeBtn.focus({ preventScroll: true }), reduce ? 0 : 120);
  }
  function close() {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    pageEls.forEach(el => el.removeAttribute('inert'));
    document.body.classList.remove('amodal-open');
    if (lenis) lenis.start();
    opener?.setAttribute('aria-expanded', 'false');
    const back = opener;
    if (reduce) { modal.hidden = true; }
    else { const done = e => { if (e.target !== card) return; modal.hidden = true; card.removeEventListener('transitionend', done); }; card.addEventListener('transitionend', done); }
    back?.focus({ preventScroll: true }); opener = null;
  }
  tiles.forEach(t => { t.setAttribute('aria-expanded', 'false'); t.addEventListener('click', () => open(t)); });
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
  });
})();

/* ---------- mobile nav menu ---------- */
(function navMenu() {
  const b = document.getElementById('navBurger'), m = document.getElementById('navMenu');
  if (!b || !m) return;
  const set = open => { b.setAttribute('aria-expanded', String(open)); m.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; };
  b.addEventListener('click', () => set(b.getAttribute('aria-expanded') !== 'true'));
  m.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();

/* ---------- work-with-us: interactive outcome tabs ---------- */
(function verdictTabs() {
  const tabs = [...document.querySelectorAll('.verdict2 .vt')], panels = [...document.querySelectorAll('.verdict2 .vp')];
  if (!tabs.length) return;
  const set = i => {
    tabs.forEach((t, k) => { const on = k === i; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); });
    panels.forEach((p, k) => p.classList.toggle('is-on', k === i));
  };
  tabs.forEach((t, i) => { t.addEventListener('click', () => set(i)); t.addEventListener('mouseenter', () => set(i)); });
})();
