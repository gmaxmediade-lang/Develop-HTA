# Develop-HTA — Homepage + Shared-System Upgrade Plan
**Date:** 2026-08-12 · **Scope:** `D:\AntiGravity\develop-hta\site` (all 6 HTML pages share `css/dhta.css` + `js/dhta.js`)
**Method:** PORT the proven Gmax / Reference-Clone motion system 1:1. No freestyle. Source of truth = `D:\AntiGravity\Gmax-Media-Web\assets\mg.css` + `mg.js` and `D:\Master Brain\Systems\Reference-Clone Elite Site.md`.

This plan closes, in one pass: (a) every Master Brain audit finding, (b) every Wellcome-Leap parity gap in `wl-parity.md`, (c) all 6 owner directives.

## Ground truth verified in the current code (so the plan is exact, not inferred)
- `index.html` head loads ONLY `lenis.min.js` + `dhta.js` (both `defer`). **GSAP + ScrollTrigger are on disk (`js/gsap.min.js`, `js/ScrollTrigger.min.js`) but never `<script>`-included** → the BLOCKER. `dhta-viz.js` (generative canvas) is referenced by interior pages, leave it.
- The premium faces are **already self-hosted**: `assets/fonts/fonts.css` already declares `General Sans` (400/500/600/700), `Clash Display` (600/700), `Satoshi` (400/500/700/900) via @font-face. TYPE work = wire the vars + delete dead files, not download anything.
- Dead faces still shipping: `serif-0..17.woff2` (18, Source Serif 4 = v1 leftover, **not referenced anywhere in HTML**), `archivo-0..14.woff2` (15), `sans-0..20.woff2` (21, Source Sans 3 = current body). Total 54 woff2, ~39+ removable after the swap.
- `css/dhta.css:42` sets `html{scroll-behavior:smooth}` → **conflicts with Lenis** (double-smoothing = the "floaty/mushy" feel). Reduced-motion block at :345 already resets it to auto; the base rule must go to `auto`.
- Current CTA = `.btn.btn--primary` flat colour-swap (dhta.css:75-76). Nav = `position:sticky` + `.is-stuck` blur (dhta.css:90-91). Underline-wipe links `.nav__links a::after` (dhta.css:96-99) are ALREADY correct — KEEP, do not touch.
- Hero H1 choke = `.hero h1{...max-width:13ch}` (dhta.css:114); hero column `.hero__inner{max-width:42ch}` (dhta.css:113).
- Reveal engine = whole-block `opacity`+`translateY(20px)` IO (dhta.css:322-326, dhta.js:82-95). No split-line anywhere.
- Ease tokens to import from Gmax: `--ease:cubic-bezier(.16,1,.3,1)` · `--spring:cubic-bezier(.34,1.56,.64,1)`. (DHTA's own `--ease` is `cubic-bezier(.22,.61,.36,1)` — keep DHTA's for existing transitions, ADD `--spring` for the pill.)

---

# ORDERED BUILD CHECKLIST

## 0 · GATE-0 — close the process gaps FIRST (audit MINOR, fast)
- [ ] **0.1** Write `research/technique-motion.md`: teardown of the Gmax pill / masked-reveal / Lenis+ticker source (selectors, config, easing) — the exact snippets below. This is the CRAFT-ASSET gate (`Craft/Web-Build Method.md` §1) the motion pass currently skips. Fast close, not new research.
- [ ] **0.2** Log a DECISIONS.md row: "2026-08-12 · Port Gmax Reference-Clone primitives (pill-liquid, masked-line reveal, Lenis+GSAP-ticker) into shared system · rationale: system was named but foundation primitives never built (audit FIX-FIRST) · source: mg.css/mg.js + Reference-Clone Elite Site.md".

## 1 · SCROLL (Directive 4) — kill the floaty lerp, wire GSAP-ticker Lenis
This is FIRST after gate-0 because the masked reveal (§4) depends on GSAP + ScrollTrigger being loaded, and the scroll fix shares that wiring.
- [ ] **1.1** In `index.html` `<head>` (and every page that will use motion), replace the two script tags. Load order matters — GSAP → ScrollTrigger → Lenis → dhta.js, at END of `<body>` (not head-defer, to match the proven Gmax order and guarantee `window.gsap` exists before dhta.js runs):
  ```html
  <script src="js/gsap.min.js"></script>
  <script src="js/ScrollTrigger.min.js"></script>
  <script src="js/lenis.min.js"></script>
  <script src="js/dhta.js"></script>
  ```
  Remove the two `defer` tags from `<head>`.
- [ ] **1.2** In `css/dhta.css:42` change `html{...scroll-behavior:smooth}` → `scroll-behavior:auto`. (Lenis owns smoothing now; leaving `smooth` double-eases and is the mushy feel — confirmed trap, see MEMORY "smooth-scroll trap".)
- [ ] **1.3** In `dhta.js` replace the floaty Lenis block (lines 46-51) with the PROVEN Gmax config (ported 1:1 from `mg.js:7-16`):
  ```js
  if (window.gsap) gsap.registerPlugin(ScrollTrigger);
  var lenis = null;
  if (!reduce && window.Lenis && window.gsap) {
    lenis = new Lenis({ duration: 0.9, easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10*t)); } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(t){ lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  ```
  Delete the old `new window.Lenis({lerp:0.09...})` + raw `requestAnimationFrame(raf)` loop.
- [ ] **1.4** In-page anchor links go through Lenis (mirror `mg.js:22-28`): intercept same-page `#` links → `lenis.scrollTo(el,{offset:-72,duration:1.2})`, cross-page links navigate normally.
- [ ] **1.5** JUDGE LIVE ON TRACKPAD (Max) — headless gates are blind to scroll feel (`Craft/Web-Build Method` §4). If still heavy on his mouse, fall back to native scroll (drop Lenis, keep `scroll-behavior:auto`). Do not tune blind.

## 2 · TYPE (Directive 3) — premium face, self-hosted, dead files deleted
Faces are already on disk + @font-face'd. This is var-wiring + cleanup. **OWNER GATE**: show Max the hero in each option before locking (Directive 3 is his call).
- [ ] **2.1** Present 2-3 options (render hero H1 in each), ONE recommendation:
  - **Option A (RECOMMEND): Clash Display 700/600 (display) + General Sans 400/500/600/700 (body).** Bold grotesque display = closest match to Wellcome Leap's big-statement grotesque; General Sans is a clean neutral workhorse body. Both on the anti-slop approved list, both already self-hosted, both never-default. Best WL parity.
  - Option B: Satoshi (display 700/900 + body 400/500) — single-family, more modern/neutral, less "statement" than Clash.
  - Option C: General Sans for BOTH (700 display / 400-500 body) — most sober, least distinctive.
- [ ] **2.2** After lock, update `css/dhta.css:23-24`:
  ```css
  --display:'Clash Display','Archivo',system-ui,sans-serif;   /* per lock */
  --sans:'General Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  ```
  Heading weight (`h1..h4` :47 is `font-weight:800`) → Clash tops out at 700, so set headings to `font-weight:700`. Re-check `.hero h1`, `.thesis .big`, `.tile2__name`, `.hta-def` still read heavy enough at 700.
- [ ] **2.3** Prune `assets/fonts/fonts.css`: delete ALL `Source Serif 4` @font-face blocks (lines 1-162) and ALL `Archivo` blocks (lines 354-503) — unless the locked pair keeps Archivo as fallback (it can stay as the `--display` fallback token WITHOUT loading files; the fallback name in the var does not require @font-face). If Source Sans 3 is dropped as body, delete its blocks too (164-352).
- [ ] **2.4** Delete the now-unreferenced woff2 files: `serif-*.woff2` (18), `archivo-*.woff2` (15), and `sans-*.woff2` (21) if Source Sans 3 is dropped. Keep only the weights the locked pair actually uses. Verify with a grep that no `url('serif-` / `archivo-` / `sans-` remains in fonts.css before deleting.
- [ ] **2.5** Add a `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the ONE display latin weight used above the fold (the Clash 700 latin file) in each page `<head>` — LCP win, closes the `top1-audit.md` LCP flag.

## 3 · CTA (Directive 2) — port `.pill-liquid` 1:1, teal/navy variants
Port the exact markup + CSS + hover from Gmax (`mg.css:400-423`). DHTA is navy+teal not dark, so add DHTA-toned variants instead of Gmax's `-light/-wa`.
- [ ] **3.1** Add to `css/dhta.css` (after the `.btn` block, ~line 88). Uses DHTA's `--spring` (add token to `:root`) and existing `--ease`:
  ```css
  :root{ --spring:cubic-bezier(.34,1.56,.64,1); }
  .pill-liquid{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:.6rem;
    overflow:hidden;isolation:isolate;padding:.95rem 1.9rem;border-radius:999px;
    border:1.5px solid var(--accent);color:var(--accent);font-family:var(--sans);font-weight:700;font-size:1rem;
    cursor:pointer;transition:color .45s var(--ease),transform .5s var(--spring)}
  .pill-liquid .pl-fill{position:absolute;left:0;right:0;bottom:0;height:100%;background:var(--accent);
    border-radius:50% 50% 0 0;transform:translateY(101%);
    transition:transform .5s var(--ease),border-radius .5s var(--ease);z-index:-1}
  .pill-liquid:hover{color:#fff;transform:scale(1.045)}
  .pill-liquid:hover .pl-fill{transform:translateY(0);border-radius:0}
  .pill-liquid .arw{transition:transform var(--dur) var(--ease)}
  .pill-liquid:hover .arw{transform:translateX(3px)}
  /* on dark hero / bands: white ring + white dome that flips text to navy */
  .pill-liquid.-onink{border-color:rgba(255,255,255,.34);color:#fff}
  .pill-liquid.-onink .pl-fill{background:#fff}
  .pill-liquid.-onink:hover{color:var(--navy-900)}
  /* xl closing-band variant */
  .pill-liquid.-xl{padding:1.15rem 2.6rem;font-size:clamp(1rem,.9rem + .4vw,1.18rem)}
  @media(prefers-reduced-motion:reduce){.pill-liquid,.pill-liquid .pl-fill{transition:none}}
  ```
- [ ] **3.2** Swap every funnel CTA markup `<a class="btn btn--primary">Label <span class="arw">→</span></a>` → `<a class="pill-liquid"><span class="pl-fill"></span>Label <span class="arw">→</span></a>`. Locations (index.html): nav CTA (line 29 — use plain teal), hero primary (52 — over dark, use `.-onink`), bridge band (192 — `.-onink`), CTA band (319 — `.-onink -xl`). Repeat across `about.html`, `what-we-do.html`, `contact.html`, `knowledge-hub.html`, `privacy.html` wherever `btn--primary` is the funnel action.
- [ ] **3.3** Keep the secondary/ghost `.btn--ghost*` links AS-IS (they are the quiet secondary action; the pill is the single primary). Do NOT turn every button into a pill — one primary per view (accent discipline).
- [ ] **3.4** `.pill-liquid` has no `overflow:visible` clash with the dome (`overflow:hidden` clips the dome to the pill) — verify the arrow glyph still shows (it sits above `.pl-fill` at z-index auto > -1).

## 4 · TEXT EFFECTS (Directive 5) — masked-line heading reveal
Port the `.ln > .ln-i` split + GSAP from Gmax (`mg.css:956-957`, `mg.js:40-48`) 1:1.
- [ ] **4.1** CSS — add to `dhta.css`:
  ```css
  .reveal-h .ln{display:block;overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
  .reveal-h .ln .ln-i{display:block;will-change:transform}
  @media(prefers-reduced-motion:reduce){.reveal-h .ln .ln-i{transform:none!important}}
  ```
  (Use a `.reveal-h` opt-in class on the headings that should mask-reveal — hero H1 + each section H2 + the two big statements `.thesis .big`, `.hta-def`, `.band__inner h2`, `.bridge-inner h2`.)
- [ ] **4.2** JS — add to `dhta.js` inside the `if(!reduce && window.gsap)` guard (ported from `mg.js:41-48`). Split on `<br>` so line breaks are author-controlled (ties into HEADLINES §5 — the hero uses deliberate `<br>`):
  ```js
  if (!reduce && window.gsap) {
    [].slice.call(document.querySelectorAll('.reveal-h')).forEach(function(h){
      h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i)
        .map(function(p){ return '<span class="ln"><span class="ln-i">'+p+'</span></span>'; }).join('');
      var inners = h.querySelectorAll('.ln-i');
      gsap.set(inners, { yPercent: 120 });
      var isHero = h.closest('.hero');
      if (isHero) {
        gsap.to(inners, { yPercent:0, duration:.95, stagger:.1, ease:'expo.out', delay:.15 }); // fire on load
      } else {
        ScrollTrigger.create({ trigger:h, start:'top 88%', once:true,
          onEnter:function(){ gsap.to(inners,{ yPercent:0, duration:.95, stagger:.1, ease:'expo.out' }); } });
      }
    });
    ScrollTrigger.refresh();
  }
  ```
- [ ] **4.3** Add `class="reveal-h"` to the target headings in HTML. Hero H1 (line 49) fires on load (scroll-stopper, Website Top-1% law 3); section H2s fire on ScrollTrigger enter. Keep the existing whole-block `.reveal` IO for BODY/tiles/cards (it is fine for non-heading blocks) — do not rip it out; only headings upgrade to masked-line.
- [ ] **4.4** Guard: any heading inside `.reveal-h` must contain plain text/`<br>` only (no nested inline markup like `<em>`) or the innerHTML split will wrap the whole thing. `.thesis .big` has an `<em>` — either drop the `<em>` (it is `font-style:normal` anyway, cosmetic no-op) or exclude it from `.reveal-h` and give it a simpler whole-line rise.

## 5 · HEADLINES (Directive 1) — run wide, full lines, not a 13ch column
- [ ] **5.1** `dhta.css:114` — DELETE `max-width:13ch` from `.hero h1`. Keep `text-wrap:balance`, `hyphens:none`.
- [ ] **5.2** `dhta.css:113` — widen `.hero__inner` from `max-width:42ch` to `max-width:min(64ch,100%)` so the headline has room to run wide (WL parity).
- [ ] **5.3** Push hero size for a true scroll-stopper: `--fs-hero` (:29) → `clamp(2.75rem,1rem + 7vw,6.5rem)`; tighten `.hero h1` to `letter-spacing:-.035em;line-height:.98`.
- [ ] **5.4** Restructure the hero copy into 2 deliberate lines with `<br>` (works with the §4 split): e.g. `Making health technology<br>work for Africa.` Confirm against WL's own hero line count — 1-2 wide lines, never 4.
- [ ] **5.5** Adaptive full-width desktop check (MEMORY: Nike-style): on a large monitor the hero must fill, not sit in a narrow column with dead margin. Verify `--fs-hero` `7vw` + `min(64ch,100%)` fills a 1920px screen.

## 6 · NAV (Directive 2) — fixed slide-down; KEEP underline-wipe
- [ ] **6.1** `dhta.css:90` — change `.site-header{position:sticky}` → `position:fixed;left:0;right:0;top:0` and add a `transform:translateY(0);transition:transform .4s var(--ease),background .3s,border-color .3s`. Add top padding to `body` (or a spacer) = header height (76px) so content isn't hidden under the fixed bar.
- [ ] **6.2** Add slide-down direction tracking to `dhta.js` (replace the `onScroll` at lines 13-17). Hide on scroll-DOWN past ~80px, show on scroll-UP; keep the `.is-stuck` blur when `scrollY>8`:
  ```css
  .site-header.nav--hidden{transform:translateY(-100%)}
  ```
  ```js
  var lastY = 0;
  var onScroll = function(){
    var y = window.scrollY;
    header.classList.toggle('is-stuck', y > 8);
    if (y > 80 && y > lastY) header.classList.add('nav--hidden');
    else header.classList.remove('nav--hidden');
    lastY = y;
  };
  ```
- [ ] **6.3** DO NOT TOUCH `.nav__links a::after` (dhta.css:96-99) — the underline-wipe is already correct per the audit; directive-2's "underline-wipe" half is done.
- [ ] **6.4** Mobile nav dropdown (`:337-341`) currently anchors at `top:76px` for a sticky header — with `position:fixed` it still works, but verify the open menu positions under the fixed bar and that hide-on-scroll doesn't fight the open mobile menu (disable `nav--hidden` while `.nav__links.open`).

## 7 · SECTION RHYTHM + WL PARITY (Directive 6, wl-parity #7)
- [ ] **7.1** Un-choke the thesis: `dhta.css:119` `.thesis{max-width:24ch}` → `max-width:40ch` (or none on the big statement); bump `--fs-statement` (:30) toward `clamp(2.2rem,1rem + 4vw,4.2rem)` so the BIG STATEMENT rows read as WL-scale statements.
- [ ] **7.2** Confirm the WL cadence holds: BIG STATEMENT (thesis) → tile grid → BIG STATEMENT (bridge band) → grid → BIG STATEMENT (CTA band). Tile grid already clones WL well — leave geometry, only the type scale grows.
- [ ] **7.3** Leave at-parity items ALONE (per wl-parity.md): full-bleed graded-video hero, program-tile grid, network/bridge canvas, one-accent chrome, underline-wipe links.

## 8 · OPTIONAL PROVEN PRIMITIVE (audit MINOR, not blocking)
- [ ] **8.1** Fluid rem engine — replace the ~7 per-element `clamp()` type tokens with one `html{font-size:clamp(...vw...)}` capped at a design width, per Reference-Clone step 2. Cheaper + cleaner. Do ONLY if time allows; it is an optimization, not a directive. Re-test all `rem`-based sizing if done.

---

# DETERMINISTIC GATE + JUDGE (run AFTER the build, BEFORE Max's eye)
- [ ] **G1** Extend `discipline-check.py` with rules that FAIL on primitive drift (audit: gate has no coverage yet): (a) `scroll-behavior:smooth` present anywhere = FAIL (Lenis conflict); (b) `lerp:` present in any Lenis init = FAIL (must be duration/easing); (c) a funnel `btn--primary` with no `.pill-liquid` sibling = WARN; (d) GSAP+ScrollTrigger `<script>` present on any page that uses `.reveal-h`. Keep existing dash/accent/type-sprawl rules.
- [ ] **G2** Run `discipline-check.py` + `impeccable` (anti-slop) → must be green. Green ≠ done.
- [ ] **G3** Run `review-animations` / `find-animation-opportunities` (UI Motion Craft) on the wired pill + mask-reveal + retuned Lenis as the builder≠judge gate.
- [ ] **G4** Fresh-context REFERENCE-JUDGE: pixel-compare hero + sections against Wellcome Leap screenshots (`research/teardown-wellcomeleap.md`) → reference-level or specific gaps. Cap ~2 rounds.
- [ ] **G5** Max's LIVE trackpad pass — scroll feel (§1.5), pill hover, mask reveals. This is the bar; the judge is only a gate. If scroll still floaty → native fallback.
- [ ] **G6** Log the outcome + any font lock in `DECISIONS.md`. Deploy device-split per the Vercel playbook only after G5 passes.

# Coverage map (nothing dropped)
- Directive 1 → §5 · Directive 2 (CTA) → §3 · Directive 2 (nav) → §6 · Directive 3 → §2 · Directive 4 → §1 · Directive 5 → §4 · Directive 6 → §5/§7.
- Audit BLOCKERS: GSAP not included → §1.1 · hero 13ch choke → §5.1. Audit MAJORs: flat pill → §3 · sticky nav → §6 · floaty Lenis → §1 · no mask reveal → §4 · font/dead files → §2. Audit MINORs: technique-motion.md → §0.1 · fluid rem → §8 · gate coverage → G1.
- wl-parity #1-7 → §5, §2, §4, §1, §3, §6, §7 respectively.
