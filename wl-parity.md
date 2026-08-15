# Develop-HTA vs Wellcome Leap — Parity Check (2026-08-12)

Live: https://develop-hta.vercel.app · Reference: https://wellcomeleap.org
Method: WebFetch on both + read of the actual live source (`css/dhta.css`, `js/dhta.js`, `assets/fonts/fonts.css`). Current-state facts below are quoted from the code, not eyeballed.

## What WL actually does (the bar)
Confident, science-forward, type-led. A dark full-bleed hero with ONE big punchy grotesque statement running on **full wide lines** (not a narrow column), a small subline, one accent action. Then a thesis one-liner + a big-number statement, a **program-tile grid** of bold visual objects, and a network section. Chrome stays black/white + one accent; colour lives inside the tile artwork. Motion is restrained but the type is huge and heavy and does all the work.

## Current-state facts (confirmed in source)
- `--fs-hero: clamp(2.5rem, 1.2rem + 5vw, 4.9rem)` → hero caps at ~78px.
- `.hero h1{ max-width:13ch }` → **this is the narrow column Max flagged**; forces the headline to wrap ~4 lines.
- `--display:'Archivo'` (800/900) + `--sans:'Source Sans 3'`; **Source Serif 4 is still loaded** (18 woff2 files) but no longer the display face — dead payload from v1.
- Lenis `new Lenis({ lerp:0.09 })` with its own `requestAnimationFrame` loop → floaty, not tied to the GSAP ticker.
- **GSAP + ScrollTrigger are already loaded on the page** (`js/gsap.min.js`, `js/ScrollTrigger.min.js`) but `dhta.js` never uses them — reveals are a plain IntersectionObserver `opacity/translateY(20px)` fade. So masked-line reveals cost zero new dependencies.
- CTA `.btn` = plain pill (`border-radius:999px`, 1.5px border, `transform/background` transition). No liquid dome fill.
- Nav `.site-header` = sticky blur bar with `.is-stuck` shadow; links **already have a left-anchored underline-wipe** (`::after` `right:100%`→`right:0`). No slide-down show/hide-on-scroll behaviour yet.

---

# Ranked gap-closing changes

### 1. Hero headline — kill the 13ch column, go full-line + bigger (Directive 1 + 6, biggest visual gap)
WL's hero statement runs across full wide lines in huge heavy type. Ours is choked into a 13ch column at max 78px, wrapping to 4 skinny lines — the single thing that most reads "not WL".
- In `.hero h1` delete `max-width:13ch`. Let the line run the hero width and control wrapping with deliberate `<br>`s (2 lines, e.g. "Making health technology / work for Africa.") instead of a column choke.
- Widen the hero text block: `.hero__inner{max-width:42ch}` → `min(64ch, 100%)` so the headline has room to be wide.
- Push the size up to WL scale: `--fs-hero: clamp(2.75rem, 1rem + 7vw, 6.5rem)` and tighten `letter-spacing:-.035em`, `line-height:.98`.
- Keep `text-wrap:balance` so the two full lines split evenly.

### 2. Typography — drop Archivo for a premium grotesque, and delete the dead serif (Directive 3)
Archivo reads generic and Source Serif 4 is loading unused. WL leans on one heavy characterful neo-grotesque. Anti-slop list (never Inter/Roboto/Arial): pick **General Sans** or **Cabinet Grotesk** for display; keep a clean neutral sans for body.
- Recommendation (present to Max, don't decide): **display = General Sans 700/800** (institutional, less "startup" than Clash, more character than Archivo) with **Cabinet Grotesk 800** as the punchier alt; **body = General Sans 400/500** or keep Source Sans 3 for the paragraph register.
- Self-host woff2 (EU/no-Google-Fonts rule already in DECISIONS). Swap `--display` var; delete the 18 `serif-*.woff2` `@font-face` blocks in `fonts.css` and the files.
- Note: this is an owner call on face — give Max 2-3 rendered options of the hero headline in General Sans vs Cabinet Grotesk vs Clash before locking.

### 3. Masked-line heading reveal — add the WL/Reference-Clone text effect (Directive 5)
Right now every heading just fades up 20px. Add the masked-line reveal on section headings using the GSAP that is already on the page.
- Wrap each heading line: `<span class="mask-line"><span class="mask-inner">…</span></span>` with `.mask-line{overflow:hidden;display:block}`.
- `gsap.set('.mask-inner',{yPercent:120})` then on ScrollTrigger enter `gsap.to(inners,{yPercent:0,duration:.95,stagger:.1,ease:'expo.out'})`.
- Guard with `prefers-reduced-motion` (set inners visible, skip the tween) to preserve the existing accessibility behaviour.

### 4. Scroll feel — retune Lenis to the approved config (Directive 4)
`lerp:0.09` is the floaty/mushy feel Max hates. Move to the Gmax-approved duration+easing model bound to the GSAP ticker so scroll and ScrollTrigger share one clock.
```js
const lenis = new Lenis({ duration:0.9, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)) }); // expo-out
gsap.ticker.add(t=>lenis.raf(t*1000));
gsap.ticker.lagSmoothing(0);
```
Delete the standalone `requestAnimationFrame(raf)` loop. Keep the reduced-motion skip. If it still feels heavy on this content length, fall back to responsive native scroll — momentum is a nice-to-have, responsiveness is the requirement.

### 5. CTA — port the Gmax liquid-fill pill (Directive 2)
Our `.btn` is a flat colour-swap pill. WL's actions are quieter but ours should read modern via the cuberto liquid-fill.
- Markup: `<a class="pill-liquid"><span class="pl-fill"></span>Label</a>`.
- `.pill-liquid{position:relative;overflow:hidden;border-radius:999px;transition:transform .5s cubic-bezier(.2,.9,.2,1)}` `:hover{transform:scale(1.045)}`.
- `.pl-fill` = absolutely-positioned dome that rises from the bottom on hover (`transform:translateY(101%)`→`0`, `border-radius:50% 50% 0 0`→`0`), label colour flips on hover. Apply to the hero primary CTA and the closing-band CTA; keep the ghost as a quiet outline so there's still one clear accent per zone (WL restraint).

### 6. Nav — add the fixed slide-down behaviour (Directive 2)
The underline-wipe links are already there and correct — do not rebuild them. What's missing is the modern **slide-down on scroll-up / hide on scroll-down** fixed nav.
- Change `position:sticky` handling to track scroll direction: add `.nav--hidden{transform:translateY(-100%)}` when scrolling down past ~120px, remove it when scrolling up. Keep the `.is-stuck` blur/shadow. Transition `transform .4s cubic-bezier(.2,.9,.2,1)`.

### 7. Section rhythm — let one or two statements go full-bleed big (Directive 6, polish)
WL alternates huge type-only statement rows with the visual tile grid. Ours constrains the thesis to `max-width:24ch` and the big statement stays modest.
- Give the thesis one-liner and the "big statement" line real WL scale: bump `--fs-statement` toward `clamp(2.2rem, 1rem + 4vw, 4.2rem)` and widen `.thesis{max-width:24ch}` to ~`18ch`-per-line but full-width block so it's a punchy wide statement, not a narrow paragraph.
- Keep the tile grid as the colour/visual centrepiece (it already clones WL's program-grid move well) — the fix is making the *type* statements between grids bigger and wider, matching WL's cadence of BIG STATEMENT → visual grid → BIG STATEMENT.

---

## Already at parity (leave alone)
- Full-bleed dark navy hero with real graded video tied to the logo's identity — good, and arguably richer than WL's static hero.
- Program-tile grid of bold visual objects with big-type names — the core WL move, already cloned.
- Network/bridge section metaphor, affiliations strip, restrained one-accent chrome.
- Underline-wipe nav links (keep).

## Owner gates before building
- Directive 3 (face) is a Max-owned call → show 2-3 hero renders (General Sans / Cabinet Grotesk / Clash) first.
- Everything else is mechanical parity work with a defined target; build, then fresh-context judge vs WL screenshots + `impeccable`.
