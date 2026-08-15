# Develop-HTA v8 — MOTION SPEC (the "more interactive" build)

Date: 2026-08-13 · Author: MOTION LEAD · Skill: `scroll-motion-effects` (vendor-neutral primitives P3/P5/P6, count-up cookbook, pinned-chapter, parallax).
Scope: the JS + data-attribute contract for `site/js/v8.js`, plus the CSS motion rules the builder adds to `site/css/v8.css`. Extends the approved v8 draft (Lenis + IO + rAF already present). Do NOT touch `index.html` or interior pages.

## Ground rules (carry over, do not break)
- **Stack = library-light vanilla.** Keep Lenis (already vendored at `js/lenis.min.js`) for momentum. Everything else is vanilla JS + `IntersectionObserver` + a SINGLE shared `requestAnimationFrame` loop. NO GSAP, NO ScrollTrigger dependency — the FH effects here are all reproducible with IO + one rAF scroll-progress reader. (The skill's GSAP recipes are the reference; we port them to vanilla to match the draft.)
- **One rAF, one scroll read.** All scroll-linked motion (parallax, ken-burns, tracked-step progress, header state) reads `window.scrollY` / `getBoundingClientRect()` inside ONE rAF tick, gated by a dirty flag set on a single passive `scroll` listener. Never attach a per-effect `scroll` handler (the draft's separate parallax + header listeners get merged into this loop).
- **`prefers-reduced-motion: reduce` is non-negotiable.** Every effect below has an explicit reduced fallback that shows the FINAL state, no scroll-jacking, no pin, no auto-advance. Guard hidden start-states in JS behind `!reduce` OR in a `@media (prefers-reduced-motion: reduce)` block — NEVER as an inline `style` (inline beats the media query on specificity and would strip the fallback).
- **Smoothness before cleverness.** `transform` + `opacity` only (GPU compositable); no animating `top/left/width/height/margin`. Add `will-change` only to the 2-3 elements actively transforming (hero photo, tracked media), never blanket.
- **`.rv` reveal engine stays as-is** (IO adds `.in`, `unobserve` after). Extend its coverage, keep the contract.

---

## GLOBAL — the shared scroll engine (build FIRST, everything hooks it)
One listener sets a flag; one rAF loop does all reads/writes.
```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;
const readers = [];                 // each effect pushes a fn(scrollY) here
function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(tick); } }
function tick(){ const y = window.scrollY; for(const r of readers) r(y); ticking = false; }
addEventListener('scroll', onScroll, { passive:true });
addEventListener('resize', ()=>{ measure(); onScroll(); }, { passive:true });
addEventListener('load',   ()=>{ measure(); onScroll(); });   // re-measure after images/fonts
```
`measure()` caches each scroll-linked element's offsetTop/height so the tick does no layout thrash. Reduced-motion still runs the header-state reader (it is not motion), but parallax/ken-burns/tracked readers are simply never pushed when `reduce` is true.

---

## (a) SCROLL REVEALS — `.rv` fade-up (already in draft, extend coverage)
**Effect:** each block fades in + rises 26px when it enters view, once. FH's constant tasteful entrance.
**HTML hooks:** `class="rv"` on every block that should reveal; optional `data-d="1|2|3"` for a stagger delay (children of one group). Already defined in CSS (`.rv` / `.rv.in` / `.rv[data-d]`).
**JS:** keep the existing IO (`threshold:.12`, `rootMargin:'0px 0px -8% 0px'`, `unobserve` on enter). Add `.rv` to the NEW sections' blocks: mission statement + paragraph + media, each tracked-step caption, each work card, the stat block, each founder card, each FAQ item, the closing band lines.
**Reduced-motion:** existing `@media` rule forces `.rv{opacity:1;transform:none;transition:none}` — keep it.
**New variants (add to CSS, same IO):**
```css
.rv--left{transform:translateX(-28px)}            /* photo slides in from the left */
.rv--right{transform:translateX(28px)}
.rv--left.in,.rv--right.in{transform:none}
@media(prefers-reduced-motion:reduce){.rv--left,.rv--right{transform:none}}
```

## (b) HERO — parallax + ken-burns
**Effect:** the hero photo drifts up slowly on scroll (parallax) AND slow-zooms from load (ken-burns), for depth. FH hero.
**HTML hooks:** `<img ... data-parallax="0.08">` on the hero photo (draft already has `data-parallax`; add the depth value). Wrapper `.hero__media` stays `overflow:hidden`; img is already `height:112%`.
**JS (parallax reader, pushed to `readers` only if `!reduce`):**
```js
const heroImg = document.querySelector('.hero__media [data-parallax]');
if(heroImg && !reduce){
  const depth = parseFloat(heroImg.dataset.parallax) || 0.08;
  readers.push(y => { if(y < innerHeight*1.2) heroImg.style.transform = `translate3d(0,${y*depth}px,0) scale(var(--kb,1.06))`; });
}
```
**Ken-burns (CSS, independent of scroll, runs from load):**
```css
.hero__media img{--kb:1.06;animation:kb 18s var(--ease) forwards}
@keyframes kb{from{--kb:1.02}to{--kb:1.10}}   /* or transform:scale if var-in-keyframe unsupported: */
/* fallback: animate transform:scale(1.02)->(1.08); parallax then uses translateY only, no scale conflict */
```
> Build note: if combining scroll-translate + keyframe-scale on the same `transform` is fragile, split them — put ken-burns `scale` on the `<img>` via keyframes and parallax `translateY` on a wrapping `<div class="hero__media-inner">`. Cleaner, no clobber. Recommended.
**Reduced-motion:** existing rule already resets `.hero__media img{height:100%}`; ALSO add `animation:none` and skip pushing the parallax reader. Photo sits static, full-frame.

## (c) HOW AN ASSESSMENT WORKS — the scroll-TRACKED pinned 4-step (INTERACTIVE CENTREPIECE)
**Effect:** FH's `tracked` section. The section PINS (sticky) for a tall scroll distance; a media/graphic panel stays fixed in view while the 4 steps (Evidence -> Assessment -> Appraisal -> Recommendation) advance one at a time as scroll progress crosses 0->1. Active step: full opacity + teal rail marker + its photo/label shown; inactive steps dimmed. This is **P6 pinned-chapter (CSS `position:sticky` + scroll-progress), NOT P7 wheel-capture** — P7 is top-hero-takeover only; a mid-page section must never `preventDefault`/`lenis.stop()`. Sticky-pin + progress has no scroll-jack, is fully reversible, and degrades cleanly.
**Layout / HTML hooks:**
```html
<section class="tracked" id="how" data-steps>
  <div class="tracked__pin">                     <!-- position:sticky, 100svh -->
    <div class="tracked__media">                 <!-- fixed panel: photo or diagram -->
      <img class="tstep-img is-active" data-step="0" src="assets/img/...">
      <img class="tstep-img" data-step="1" ...><img class="tstep-img" data-step="2" ...><img class="tstep-img" data-step="3" ...>
    </div>
    <ol class="tracked__rail">                    <!-- the 4 captions + progress rail -->
      <li class="tstep is-active" data-step="0"><span class="tstep__n">01</span><h3>Evidence</h3><p>...</p></li>
      <li class="tstep" data-step="1"><span class="tstep__n">02</span><h3>Assessment</h3><p>...</p></li>
      <li class="tstep" data-step="2"><span class="tstep__n">03</span><h3>Appraisal</h3><p>...</p></li>
      <li class="tstep" data-step="3"><span class="tstep__n">04</span><h3>Recommendation</h3><p>...</p></li>
      <span class="tracked__fill" aria-hidden="true"></span>   <!-- teal rail that grows with progress -->
    </ol>
    <a class="cta" href="#contact">Bring us your question <span class="arw">&rarr;</span></a>
  </div>
</section>
```
- Outer `.tracked` gets a tall height so there is scroll room to advance 4 steps: **`height: calc(100svh * 4)`** (~1 viewport of scroll budget PER step — respects the skill's ~300-500px-per-beat distance budget; 4 steps over ~4 viewports reads as distinct, un-crammed).
- `.tracked__pin{position:sticky;top:0;height:100svh;...}` holds the panel while the outer section scrolls past.
**JS (progress reader, pushed only if `!reduce`):**
```js
const sec = document.querySelector('[data-steps]');
if(sec && !reduce){
  const steps = [...sec.querySelectorAll('.tstep')];
  const imgs  = [...sec.querySelectorAll('.tstep-img')];
  const fill  = sec.querySelector('.tracked__fill');
  const N = steps.length;
  let cur = -1;
  readers.push(() => {
    const r = sec.getBoundingClientRect();
    const total = sec.offsetHeight - innerHeight;                 // scrollable distance inside the pin
    const p = Math.min(1, Math.max(0, -r.top / total));           // 0..1 progress
    if(fill) fill.style.transform = `scaleY(${p})`;               // rail grows
    const i = Math.min(N-1, Math.floor(p * N));                   // active index
    if(i !== cur){
      cur = i;
      steps.forEach((s,k)=>s.classList.toggle('is-active', k===i));
      imgs.forEach((im,k)=>im.classList.toggle('is-active', k===i));
      steps[i].setAttribute('aria-current','step');
    }
  });
}
```
**CSS (state via opacity/transform only):**
```css
.tstep{opacity:.35;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.tstep.is-active{opacity:1}
.tstep__n{font-family:'Fragment Mono',ui-monospace,monospace;color:var(--teal-deep)}
.tracked__media{position:relative}
.tstep-img{position:absolute;inset:0;opacity:0;transform:scale(1.02);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.tstep-img.is-active{opacity:1;transform:none}
.tracked__fill{transform-origin:top;transform:scaleY(0)}   /* teal progress rail */
```
**Accessibility:** the 4 steps are a real `<ol>` and readable in DOM order; active step gets `aria-current="step"`. No content is keyboard-trapped (sticky pin never blocks tab/scroll).
**Reduced-motion fallback (CRITICAL — the centrepiece must still work):**
```css
@media(prefers-reduced-motion:reduce){
  .tracked{height:auto}                    /* kill the tall pin distance */
  .tracked__pin{position:static;height:auto;display:block}
  .tstep{opacity:1;transform:none}         /* ALL four steps visible as a vertical list */
  .tstep-img{position:relative;opacity:1;transform:none;margin-bottom:1rem}  /* all photos stacked, or show only #0 */
  .tracked__fill{display:none}
}
```
Because the progress reader is never pushed when `reduce` is true, no JS touches it — the CSS list is the whole experience. Same escape hatch if JS fails to load (progressive enhancement): author `.tstep`/`.tstep-img` with the reduced-motion styles as the DEFAULT and let JS ADD the `is-active`/dim behaviour only after it successfully wires up (add a `.js-tracked` class on `sec` from JS, scope the dimming to `.js-tracked .tstep`).

## (d) COUNT-UP STAT (WHY IT MATTERS) — only if a real sourced figure exists
**Effect:** a number ticks 0 -> target when it scrolls into view, once (skill P5). HONESTY GATE: use ONLY a figure sourced in `research/`; if none exists, the builder ships the "evidence vs guesswork" comparison reveal instead (two blocks, one `.rv--left` one `.rv--right`, no number) — never a fabricated count.
**HTML hooks:** `<span class="count" data-target="1000" data-suffix="+">0</span>` (target + optional suffix; optional `data-locale` for thousands separators).
**JS (IO, separate from the rAF loop — fires once):**
```js
const cio = new IntersectionObserver((es)=>{es.forEach(e=>{
  if(!e.isIntersecting) return; const el=e.target; cio.unobserve(el);
  const target=+el.dataset.target, suf=el.dataset.suffix||'';
  if(reduce){ el.textContent=target.toLocaleString()+suf; return; }
  const dur=1800, t0=performance.now();
  (function step(t){ const p=Math.min(1,(t-t0)/dur); const e2=1-Math.pow(1-p,3); // easeOutCubic
    el.textContent=Math.round(target*e2).toLocaleString()+suf;
    if(p<1) requestAnimationFrame(step); })(t0);
})},{threshold:.6});
document.querySelectorAll('.count').forEach(el=>cio.observe(el));
```
**Reduced-motion:** prints the final value immediately (guarded above).

## (e) FAQ ACCORDION — grid-rows 0fr -> 1fr
**Effect:** click a question, its answer smooth-expands (the animatable `grid-template-rows: 0fr -> 1fr` technique). One open at a time optional.
**HTML hooks:**
```html
<div class="faq" data-faq>
  <div class="faq__item">
    <button class="faq__q" aria-expanded="false" aria-controls="fa1" id="fq1">What is HTA?<span class="faq__ic" aria-hidden="true"></span></button>
    <div class="faq__a" id="fa1" role="region" aria-labelledby="fq1"><div class="faq__inner"><p>...</p></div></div>
  </div>
  ...
</div>
```
**CSS:**
```css
.faq__a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s var(--ease)}
.faq__item.is-open .faq__a{grid-template-rows:1fr}
.faq__inner{overflow:hidden}
.faq__ic{transition:transform .4s var(--ease)}         /* +/chevron rotates */
.faq__item.is-open .faq__ic{transform:rotate(45deg)}
@media(prefers-reduced-motion:reduce){.faq__a{transition:none}.faq__ic{transition:none}}
```
**JS (click toggle, keyboard-native because it is a real `<button>`):**
```js
document.querySelectorAll('[data-faq]').forEach(faq=>{
  faq.addEventListener('click', e=>{
    const btn = e.target.closest('.faq__q'); if(!btn) return;
    const item = btn.closest('.faq__item'), open = item.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open);
    // single-open (optional): faq.querySelectorAll('.faq__item').forEach(o=>{ if(o!==item){o.classList.remove('is-open');o.querySelector('.faq__q').setAttribute('aria-expanded','false');} });
  });
});
```
**Reduced-motion:** open/close is instant (transition:none), fully functional.

## (f) STANDARDS MARQUEE — infinite translateX, pause on hover
**Effect:** WHO Prequalification / WHO Compendium 2024 / PATH / HTAi glide horizontally in a continuous loop; pause when hovered/focused. These are REAL standards we reference (honest).
**HTML hooks:** duplicate the track once so the loop is seamless (`aria-hidden="true"` on the clone).
```html
<div class="marq" data-marq>
  <div class="marq__track">
    <span class="marq__item">WHO Prequalification</span><span class="marq__item">WHO Compendium 2024</span><span class="marq__item">PATH</span><span class="marq__item">HTAi</span>
    <span class="marq__item" aria-hidden="true">WHO Prequalification</span>... (clone)
  </div>
</div>
```
**CSS (pure CSS animation, no JS needed):**
```css
.marq{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.marq__track{display:flex;gap:clamp(2rem,5vw,4rem);width:max-content;animation:marq 32s linear infinite}
.marq:hover .marq__track,.marq:focus-within .marq__track{animation-play-state:paused}
@keyframes marq{to{transform:translateX(-50%)}}     /* -50% because the track is duplicated once */
@media(prefers-reduced-motion:reduce){.marq__track{animation:none;flex-wrap:wrap;width:auto;justify-content:center}}
```
**Reduced-motion:** no scroll, items wrap to a static centered row — all readable.

## (g) CARD HOVER SCALE (WHAT WE DO) — already in draft, keep
**Effect:** work-card photo scales to 1.05 on hover (draft `.wcard:hover .wcard__img img{transform:scale(1.05)}`). Keep. Add a subtle lift + shadow for FH tactility:
```css
.wcard{transition:transform .5s var(--ease)}
.wcard:hover{transform:translateY(-4px)}
@media(prefers-reduced-motion:reduce){.wcard,.wcard:hover .wcard__img img{transform:none}}
```
Touch devices: hover is inert (no harm); the reveal + tap-through carry it.

## (h) STICKY HEADER transparent -> solid (already in draft, fold into rAF)
**Effect:** header is transparent over the hero, gains cream bg + blur + hairline shadow after 40px scroll (draft `.hdr.stuck`). Keep the CSS; MOVE the toggle out of its own `scroll` listener into the shared rAF reader so there is one scroll source of truth.
```js
const hdr = document.querySelector('.hdr');
readers.push(y => hdr.classList.toggle('stuck', y > 40));   // runs even under reduced-motion (state, not motion)
```
**Reduced-motion:** state swap is a background change, not motion — allowed; the `.stuck` transition on bg/blur is fine (or set `transition:none` under the media query if desired).

---

## BUILD ORDER (dependencies)
1. Global rAF engine + `reduce` flag + `measure()` (everything hooks it).
2. Fold existing header + hero parallax into `readers[]`; add ken-burns CSS.
3. Reveal coverage (`.rv` + new `--left/--right` variants) on all new sections.
4. Tracked 4-step (sticky-pin + progress reader + `is-active` CSS + reduced list). ← the centrepiece, test hardest.
5. Count-up IO (or comparison reveal if no sourced number).
6. FAQ accordion, standards marquee (CSS-only), card hover polish.
7. `ScrollTrigger.refresh()` equivalent = call `measure(); onScroll();` on `load` and `resize` (already in the engine).

## DATA-ATTRIBUTE / CLASS CONTRACT (what the HTML builder must add)
| Effect | Hook the builder writes |
|---|---|
| Reveal | `class="rv"` (+ `data-d="1..3"`, or `rv--left`/`rv--right`) on each block |
| Hero parallax | `data-parallax="0.08"` on hero `<img>` (in `.hero__media`) |
| Tracked steps | `data-steps` on `<section>`; `.tracked__pin`, `.tracked__media`, `.tstep-img[data-step]`, `.tstep[data-step]`, `.tracked__fill` |
| Count-up | `class="count" data-target="N" data-suffix="+"` on the number `<span>` |
| FAQ | `data-faq` wrapper; `.faq__item` > `button.faq__q[aria-expanded][aria-controls]` + `.faq__a[role=region]` > `.faq__inner` |
| Marquee | `data-marq` > `.marq__track` with items duplicated once (clone `aria-hidden`) |
| Card hover | `.wcard` (+ `.wcard__img > img`) — no data-attr, CSS only |
| Header | `.hdr` (JS toggles `.stuck`) |

## VERIFY (per skill: motion bugs are visual, not thrown)
Serve the folder, scroll the whole page in a real browser + a reduced-motion browser profile. Check: tracked steps advance 1-2-3-4 with no crammed/overlapping beats and reverse cleanly on scroll-up; no horizontal page scroll from the marquee; header solidifies once; count-up fires once; FAQ keyboard-operable; reduced-motion shows every section's final state with zero pin/auto-advance.
