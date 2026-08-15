# v8 System + Alignment Diagnosis

Date: 2026-08-13
Scope read fully: `site/css/v8.css`, `site/v8.html`, `site/js/v8.js`. Cross-checked against `research/v8/teardown-functionhealth.md`, `research/v7/typography-rules.md`, `research/v7/photo-plan.md`, and the old `site/index.html` `.site-footer`.
Fixes owner feedback #1 (alignment), #2 (photos in tracked stepper), #3 (real footer), #4 (system cleanup). Touch ONLY v8.html / css/v8.css / js/v8.js / parity-check-v8.py.

---

## 1. GRID UNIFICATION (owner #1 — the root cause, measured)

### Root cause confirmed
There are **two different content grids** on the page:

- **Every real section** uses `.wrap{width:100%;max-width:var(--maxw)/*1280px*/;margin-inline:auto;padding-inline:var(--gut)}` (css:73). On a 1920px monitor the wrap box is 1280px centered → its box left edge sits at x≈320px, then `padding-inline:var(--gut)` (~72px) pushes text in → **content left edge ≈ 392px**.
- **The HERO** has NO `.wrap`. `.hero` is a full-bleed 2-col grid (css:97) and `.hero__text{padding-left:var(--gut)}` (css:98) with NO centered max-width → **content left edge ≈ 72px** (just the gutter from the viewport edge).

Delta ≈ **320px** — the hero text starts ~300px left of every other section, exactly as the lead measured. Second offense: the hero caps text at a bespoke `max-width:44rem` while sections cap at the `--measure-*` tokens → different measure too.

Third: three MORE blocks re-implement `.wrap` by hand instead of using it (they happen to use `--maxw`+`--gut` so they align horizontally, but they are duplicate bespoke containers that can drift): `.tracked__head` (css:131), `.tracked__rail` (css:135), `.tracked__view` (css:142), and `.standards__line` (css:192). So the page really has FOUR hand-rolled copies of the container + one divergent hero.

### The fix — ONE shared container primitive: `.wrap`
Keep `--maxw` + `--gut` as THE single left-edge system (they are already wired into `.wrap` and align every real section). Make **every** content block — the hero included — sit inside a `.wrap`. Delete all bespoke `padding-left` / `max-width:var(--maxw);margin-inline:auto;padding-inline:var(--gut)` re-implementations. Backgrounds and bleed images live on the SECTION; content lives in the `.wrap`.

Delete the unused FH-model tokens `--main` / `--site-margin` (declared css:44,47, never referenced) so there is exactly one documented cap.

#### 1a. HERO — put the text in a `.wrap`, bleed the photo behind it (FH hero pattern)

HTML (v8.html §1):
```html
<section class="hero">
  <div class="wrap">
    <div class="hero__text">
      <h1 class="rv in">Making health technology <span class="serif-em">work</span> for Africa</h1>
      <p class="sub rv in" data-d="1">A non-profit bringing Health Technology Assessment ...</p>
      <div class="hero__cta rv in" data-d="2"> ...unchanged... </div>
    </div>
  </div>
  <div class="hero__media">
    <img src="assets/img/v8-hero.jpg" alt="..." data-parallax>
  </div>
</section>
```

CSS (replace css:96-111 `.hero*` block):
```css
.hero{position:relative;min-height:100svh;display:flex;align-items:center;padding-top:6rem}
.hero .wrap{position:relative;z-index:2}
.hero__text{max-width:var(--measure-hero);padding-block:clamp(2rem,6vh,5rem)}
/* h1 + .sub keep their own measures; NO padding-left, NO 44rem cap here */
.hero h1{font-size:clamp(2.7rem,1rem + 6.4vw,5.4rem);line-height:1.0;letter-spacing:-.02em;max-width:var(--measure-hero)}
.hero .sub{margin-top:1.6rem;font-size:var(--text-xl);color:var(--ink-2);max-width:32rem;line-height:1.5;text-wrap:pretty}
.hero__cta{margin-top:2.4rem;display:flex;flex-wrap:wrap;gap:1rem 1.6rem;align-items:center}
.hero__media{position:absolute;top:0;right:0;width:clamp(40%,46vw,50%);height:100%;overflow:hidden;z-index:1}
.hero__media img{width:100%;height:112%;object-fit:cover;object-position:50% 30%;will-change:transform}
.hero__media::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(254,249,239,.85),rgba(254,249,239,0) 30%),linear-gradient(0deg,rgba(14,44,70,.12),transparent 40%)}
@media(max-width:860px){
  .hero{display:block;min-height:auto;padding-top:5rem}
  .hero__media{position:static;width:auto;height:62vh;border-radius:20px;margin:1rem var(--gut) 0}
  .hero__media img{height:118%}
}
```
The text now shares the exact `.wrap` left edge as every section; the photo bleeds to the right half behind the (narrow, capped) text column, so there is no collision. On mobile it stacks exactly as before.

> Fallback option (lower-risk, if the restructure is rejected): keep the 2-col grid but replace `.hero__text{padding-left:var(--gut)}` with a shared edge token
> `--edge:max(var(--gut),calc((100% - var(--maxw))/2 + var(--gut)))` and use `padding-left:var(--edge)`. This makes the hero left edge computed-identical to `.wrap`. Still, the wrap restructure above is preferred because it uses ONE primitive rather than two mechanisms that merely compute equal.

#### 1b. TRACKED section — replace 3 hand-rolled containers with `.wrap`

The `.tracked` section keeps its full-bleed `--cream-2` background on the SECTION; each content block becomes a `.wrap`. HTML (v8.html §3): wrap `.tracked__head` content, the rail, and the `.tracked__view` each in a `.wrap` (or add the class to them). CSS: delete the `max-width/margin-inline/padding-inline` triplet from css:131, css:135, css:142 and keep only their non-container rules:
```css
.tracked{background:var(--cream-2);position:relative}
.tracked__head{padding-top:clamp(5rem,4rem + 7vw,11rem)}      /* container comes from .wrap */
.tracked__rail{margin-top:var(--s9)}
.tracked__view{padding-block:var(--s9) clamp(5rem,4rem + 7vw,11rem)}
```
Note: the JS wraps `.tracked__view` in a `.tracked__pinwrap` and makes the view `position:sticky` (js:108-116). `.wrap` on the view is compatible — sticky + max-width + auto margins co-exist. But to be safe, put the `.wrap` as a child INSIDE `.tracked__view` (view stays the sticky/overflow element, `.wrap` centers the track) rather than making the view itself the wrap. Recommended structure:
```html
<div class="tracked__view">
  <div class="wrap">
    <div class="tracked__track" data-track> ...steps... </div>
    <div class="tracked__cta"> ... </div>
  </div>
</div>
```
JS is unaffected: it queries `[data-track]`, `[data-step]`, `.tracked__view` by attribute/class regardless of the extra `.wrap` div.

#### 1c. STANDARDS — `.wrap` for the intro line, marquee stays full-bleed
`.standards__line` (css:192) currently re-wraps AND sets `max-width` twice (see cleanup #11). Fold container duty into `.wrap`; keep only the measure:
```html
<section class="standards">
  <div class="wrap"><p class="standards__line rv">We do not invent our own rules...</p></div>
  <div class="marquee"> ...unchanged, intentionally edge-to-edge... </div>
</section>
```
```css
.standards__line{font-size:var(--text-lg);color:var(--ink-2);max-width:var(--measure-lead)}
```

### Every place that must change (checklist)
1. `.hero` → text into `.wrap`; remove `.hero__text{padding-left}` + `{max-width:44rem}` (css:98). **[primary offender]**
2. `.tracked__head` — drop container triplet (css:131).
3. `.tracked__rail` — drop container triplet (css:135).
4. `.tracked__view` — drop container triplet; add inner `.wrap` (css:142).
5. `.standards__line` — drop container triplet + duplicate max-width (css:192).
6. Delete tokens `--main`, `--site-margin` (unused, css:44/47).
7. Confirm all other sections already use `.wrap` (mission, work, why, founders, faq, band) — they do; no change.

Result: ONE container primitive (`.wrap` = `--maxw` cap + `--gut` edge), one shared left edge for every heading/label/body/CTA including the hero, zero bespoke `padding-left`/`max-width` containers.

---

## 2. CSS/JS CLEANUP LIST

Dead custom properties (declared, never referenced anywhere in css/html/js):
1. `--heading-xl` (css:22)
2. `--h1` (css:23) — hero h1 uses a bespoke clamp, not this token
3. `--h4` (css:26)
4. `--stat` (css:33)
5. `--pull-quote` (css:34)
6. `--main` (css:44)
7. `--site-margin` (css:47)
8. `--navy-2` (css:60)

Dead / unused selectors:
9. `.cta--ghost` + `.cta--ghost:hover` (css:81-82) — defined, never used in v8.html.
10. `.rv[data-d="3"]` and `.rv[data-d="4"]` delay rules (css:252) — HTML only ever uses `data-d` up to "2".

Duplicate / conflicting declarations:
11. `.standards__line` (css:192) sets `max-width` **twice** in one rule (`var(--maxw)` then `min(var(--measure-lead),...)`) — the first is dead. Collapses to just the measure after the `.wrap` fold.
12. `.hero__media img` declared in **two** separate rules (css:103 sizing + css:256 kenburns animation) — merge into one.

Bespoke one-off styles to fold into tokens / the primitive:
13. Four hand-rolled `.wrap` clones (`.hero__text` padding-left, `.tracked__head`, `.tracked__rail`, `.tracked__view`, `.standards__line`) — folded into `.wrap` per §1 (this is both the alignment fix AND the biggest de-dup).
14. `@media(max-width:560px){.cta{...}}` is nested inside the HERO comment block (css:105) — it is a global `.cta` rule; move it up into the CTA section so styles live with their component.

Dead JS:
15. Count-up block (js:130-148) runs against `.count`, which does not exist in the honest markup (self-labeled "No-op here"). Remove the block (and the now-unused `--stat` token) unless a real honest stat is added.

Token consistency (decide one, then document):
16. `--maxw:1280px` is the wired cap but the teardown documents `--main:90rem` (1440px); and `--cream-2:#F6EEDE` in the build vs `#F5EEE1` in the teardown. Pick the canonical value for each and align the comment so the token cannot drift again.

**Cleanup items total: 16.**

---

## 3. TRACKED "How an assessment works" — adding a photo per step

### Current markup (v8.html:75-94) and why it is safe to extend
Each step is:
```html
<article class="tstep is-active" data-step>
  <span class="tstep__n">01 &middot; Evidence</span>
  <h3>We gather the evidence</h3>
  <p>...</p>
</article>
```
The JS (js:74-128) only ever selects `[data-track]`, `[data-step]`, `[data-rail]`, `[data-ticks] span`, `.tracked__view`. It toggles `.is-active`/`aria-current` on the article and sets a `transform` on the **track** (not the step). It never reads the step's inner DOM, count, or size beyond `steps.length` (N=4) and the pin height math `100 + (N-1)*80`vh. **Adding a media child inside each `.tstep` changes none of those inputs**, so the pin/scroll is untouched. Each `.tstep` stays `flex:0 0 100%` (css:152) — keep that.

### The change — media slot per step
Wrap the text in `.tstep__body` and add a `.tstep__media` figure:
```html
<article class="tstep is-active" data-step>
  <div class="tstep__body">
    <span class="tstep__n">01 &middot; Evidence</span>
    <h3>We gather the evidence</h3>
    <p>We gather the clinical trials, field data, and real costs ...</p>
  </div>
  <figure class="tstep__media"><img src="assets/img/step-01.jpg" alt="African researcher gathering clinical evidence in a lab"></figure>
</article>
```
CSS additions (append near the tracked block, css ~155):
```css
.tstep__media{border-radius:16px;overflow:hidden;aspect-ratio:4/5;background:var(--navy);margin-top:var(--s5)}
.tstep__media img{width:100%;height:100%;object-fit:cover}
/* pinned horizontal mode: two-column step (text | photo), like FH */
.tracked.is-pinned .tstep{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(2rem,5vw,5rem);align-items:center;flex:0 0 100%}
.tracked.is-pinned .tstep__media{margin-top:0;aspect-ratio:4/5;max-height:64svh}
.tracked.is-pinned .tstep__body{max-width:var(--measure-lead)}
@media(max-width:640px){.tracked.is-pinned .tstep{grid-template-columns:1fr}}
```
Note: the existing `.tracked.is-pinned .tstep p,h3{max-width:var(--measure-lead)}` (css:154) should retarget to `.tstep__body` measure; harmless either way.

### Step → photo mapping (from the verified pool)
Download to `site/assets/img/` (curl, `?auto=compress&cs=tinysrgb&w=1400`):
- **step-01.jpg — Evidence → 3825434** (African researcher / lab evidence).
- **step-02.jpg — Assessment → 5452298** (doctor + tablet, data/testing).
- **step-03.jpg — Appraisal → 5452193** (team discussion / weighing trade-offs).
- **step-04.jpg — Recommendation → 30313899** (consultation / deliberated verdict).

All four verified 200 image/jpeg in photo-plan (2026-08-13). Consistent 4:5 crop, faces + eyes visible, natural skin (no heavy teal wash), navy background placeholder while loading.

---

## 4. FOOTER REPLACEMENT

### Current (v8.html:254-259)
`.ft` is a thin two-`<small>` strip (css:245-247). Replace with a real multi-column footer modeled on the old `index.html` `.site-footer` (index.html:306-337) but restyled to the v8 warm/serif token system.

### Structure
```html
<footer class="ft">
  <div class="wrap">
    <div class="ft__grid">
      <div class="ft__brand">
        <img src="assets/logo-white.png" alt="Develop-HTA">
        <p>Making Health Technology Assessment usable across Sub-Saharan Africa, so every medical technology reaching the region is safe, effective, and worth it.</p>
      </div>
      <nav class="ft__col"><h4>What we do</h4><ul>
        <li><a href="#work">Programs</a></li><li><a href="#assess">How it works</a></li><li><a href="#why">Why it matters</a></li></ul></nav>
      <nav class="ft__col"><h4>About</h4><ul>
        <li><a href="#founders">Who we are</a></li><li><a href="#faq">FAQ</a></li></ul></nav>
      <nav class="ft__col"><h4>Knowledge</h4><ul>
        <li><a href="index.html">Overview</a></li><li><a href="#assess">Standards we build on</a></li></ul></nav>
      <div class="ft__col"><h4>Contact</h4><ul>
        <li><a href="mailto:contact@develop-hta.com">contact@develop-hta.com</a></li>
        <li>www.develop-hta.com</li>
        <li class="ft__reg">A non-profit currently completing registration.</li></ul></div>
    </div>
    <div class="ft__note">
      <small>&copy; 2026 Develop-HTA. Health Technology Assessment for Sub-Saharan Africa.</small>
      <small>Registration in progress, entity details to follow.</small>
    </div>
  </div>
</footer>
```
(Note: v8 is single-page anchors; "Knowledge" points to `index.html` since v8 has no dedicated knowledge section — honest, and does not edit other pages.)

### Tokens / classes (restyle the old footer to v8)
Reuse: `--navy` (bg), `--cream` (logo-white knockout sits on navy; hover color), `--mono`+`--tagline` (column heads, uppercase), `--body` (links), `--s*` (rhythm), a low-opacity white hairline for the divider. New classes `.ft__grid .ft__brand .ft__col .ft__reg .ft__note`. Replace css:245-247 with:
```css
.ft{background:var(--navy);color:#AEC0CE;padding-block:var(--s11) var(--s8)}
.ft__grid{display:grid;grid-template-columns:1.6fr repeat(4,1fr);gap:clamp(2rem,4vw,4rem)}
.ft__brand img{height:34px;margin-bottom:var(--s5)}
.ft__brand p{font-size:var(--text-md);color:#8FA6B6;max-width:26rem}
.ft__col h4{font-family:var(--mono);font-size:var(--tagline);letter-spacing:.08em;text-transform:uppercase;color:var(--cream);font-weight:400;margin:0 0 var(--s5)}
.ft__col ul{list-style:none;margin:0;padding:0;display:grid;gap:var(--s3)}
.ft__col a{color:#AEC0CE}.ft__col a:hover{color:var(--cream)}
.ft__reg{font-size:.85rem;color:#7C93A4;margin-top:var(--s3)}
.ft__note{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-top:var(--s10);padding-top:var(--s6);border-top:1px solid rgba(255,255,255,.1)}
.ft__note small{color:#7C93A4;font-size:.85rem}
@media(max-width:820px){.ft__grid{grid-template-columns:1fr 1fr}.ft__brand{grid-column:1/-1}}
```
White-knockout logo on navy = `assets/logo-white.png` (per brand note). Honest "registration in progress" retained. One teal accent is NOT needed in the footer (navy + muted blue-grey); keep teal out to preserve the single-accent discipline.

---

## Parity-check note (parity-check-v8.py, in scope)
Add/adjust assertions to lock the fixes so the system cannot drift:
- Assert NO `.hero__text{padding-left` and NO second `max-width:var(--maxw)` container outside `.wrap` (grep the CSS).
- Assert the 8 dead tokens are gone.
- Assert `step-01..04.jpg` referenced in the tracked steps and present in assets/img.
- Assert the footer has `.ft__grid` + `logo-white.png` + a "registration" legal line.
