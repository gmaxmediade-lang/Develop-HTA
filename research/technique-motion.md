# Technique Teardown — Motion System (Gmax / Reference-Clone)

Date: 2026-08-12 · Source: `D:\AntiGravity\Gmax-Media-Web\assets\mg.css` + `mg.js`; `D:\Master Brain\Systems\Reference-Clone Elite Site.md`.
Purpose: the CRAFT-ASSET gate (`Craft/Web-Build Method.md` §1) — capture how the reference builds each interaction BEFORE porting. Ported verbatim into Develop-HTA `css/dhta.css` + `js/dhta.js`.

## 1. Smooth scroll — Lenis tied to the GSAP ticker (NOT a raw rAF, NOT `lerp`)
```js
lenis = new Lenis({ duration: 0.9, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)) });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Key: `duration`+`easing` (expo-out), driven by ONE ticker shared with ScrollTrigger. The floaty `lerp:0.09` + separate rAF loop = the "mushy/unresponsive" feel Max flagged. Also: `html{scroll-behavior:auto}` (Lenis owns smoothing; `smooth` double-eases — see MEMORY "smooth-scroll trap"). In-page anchors: `lenis.scrollTo(el,{offset:-76,duration:1.2})`. Reduced-motion: skip Lenis entirely (native scroll).

## 2. Liquid-fill pill CTA (cuberto `.cb-btn_cta`, simplified)
Markup: `<a class="pill-liquid"><span class="pl-fill"></span>Label</a>`.
Mechanic: pill has `overflow:hidden`; `.pl-fill` is a full-height slab at `translateY(101%)` with `border-radius:50% 50% 0 0` (a dome below the pill). On hover the dome rises to `translateY(0)` + `border-radius:0` (fills the pill), text colour flips, pill `scale(1.045)` on a spring. Variants: default (teal ring/ink on light), `-onink` (white ring/dome, flips text to navy — for dark hero/bands), `-xl` (bigger closing CTA). Easing: fill uses `--ease` (cubic-bezier(.16,1,.3,1) in Gmax; DHTA uses its own decel), scale uses `--spring` (cubic-bezier(.34,1.56,.64,1)).

## 3. Masked-line heading reveal (words/lines rise behind a mask)
CSS: `.reveal-h .ln{display:block;overflow:hidden}` · `.ln .ln-i{display:block}`.
JS: split the heading `innerHTML` on `<br>` into `.ln>.ln-i`, `gsap.set(inners,{yPercent:120})`, then reveal:
```js
gsap.to(inners,{ yPercent:0, duration:.95, stagger:.1, ease:'expo.out' });
```
Hero H1 fires on load (`delay:.15`, it is the scroll-stopper); section H2s fire on `ScrollTrigger.create({trigger:h,start:'top 88%',once:true})`. Author line breaks with `<br>` so each `.ln` is one deliberate line. Reduced-motion / no-GSAP: no split or `transform:none` → headings render as plain static text.

## 4. Fixed slide-down nav + underline-wipe links
`.site-header{position:fixed}` + `.nav--hidden{transform:translateY(-100%)}`. JS tracks scroll direction: hide on scroll-DOWN past ~90px, show on scroll-UP; never hide while the mobile menu is open; add `.is-stuck` (blur+border) past 8px. Links: `a::after{right:100%→0 on hover}` (cuberto underline-wipe) — already correct in DHTA, kept as-is.

## What we deliberately did NOT port
Gmax's 3D model-viewer logo, magnetic mouse-follower cursor, sticky-stacking `.lstack` cards, and beispiele scroll-scrub — not needed for this register; would over-motion a sober health-policy site.
