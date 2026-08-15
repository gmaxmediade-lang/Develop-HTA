# Function Health — Teardown + Experience Blueprint (the build spec)

Date: 2026-08-13. Source: real FH homepage HTML/CSS you supplied (`Non-Profit/functional health source code.txt`). This is what v9 should have been built from and was NOT. The failure was cloning PAINT (color/font tokens) instead of GEOMETRY + MOTION (layout archetype + interaction per section).

## THE PROCESS (how we stop freestyling — enforce this)
1. **Teardown first (this doc).** Every reference build starts by decomposing the reference section-by-section into: what the EYE HITS · the LAYOUT ARCHETYPE · the INTERACTION/motion · the mechanic.
2. **Owner-gate the GEOMETRY, not the paint.** Max approves this blueprint (wireframe/greyscale level) BEFORE any code. Reject at blueprint stage = cheap. "No approved blueprint, no build."
3. **Build each section to its archetype WITH its real interaction** (mechanics from the `scroll-motion-effects` skill — never hand-rolled).
4. **Done-gate = a RECORDED side-by-side scroll vs the reference recording.** Never stills, never font-counts. The question the gate answers: "does the eye hit the same kind of thing, in the same rhythm, with the same come-to-life moments?"

---

## FH tech + design system (confirmed from source)
- **Stack:** Astro + Svelte islands. Lottie (`/lotties/*.json`) for "comes to life" card animations. Custom WebGL/canvas hero (`data-flutie-hero`, `FlutieHero.astro`). AVIF images w/ responsive srcset. Sanity CMS.
- **Fonts:** `Financier Display` (serif; **Light + Light Italic**, both preloaded) for all headings + italic accent words · `FT Base` (Book/Semibold) for body/UI/stats · a mono for tiny calc labels.
- **Color:** ground cream `--fill-01 #FEF9EF` · **accent = ONE warm rust `--orange #B05A36`** (italic accent words, numbers, check icons, button focus). Dark ink text. Zero navy, zero teal.
- **Signature moves:** (a) italic-serif accent word in every headline, in rust; (b) almost every section "comes to life" (Lottie/marquee/hover-video/rail); (c) motion pause toggles everywhere (a11y); (d) full-bleed distorted video hero.

## Effects table (the stuff that makes it feel alive)
| # | FH section | Eye hits | Archetype | Interaction / motion | Mechanic |
|---|---|---|---|---|---|
| 0 | Announcement bar | 1 line + link | thin rust top bar | static | — |
| 1 | Nav | logo + links + pill | transparent sticky nav, mega-menu | sticky, hover underline, dropdown | CSS + small JS |
| 2 | **Hero** | short headline over moving abstract video | full-bleed **distorted video slideshow** | multi-clip cycle + **WebGL displacement/distortion**, pause btn, stats row | canvas/WebGL shader over `<video>` slides |
| 3 | "Testing is *easy*" | 3 numbered cards | 3-col cards | **each card's visual animates in on scroll (Lottie) = comes to life** | Lottie + ScrollTrigger |
| 4 | "Monitor *1000s of diseases*" | scrolling disease words + chart | checklist + **2-row marquee** + Lottie chart | opposite-direction marquees, animated chart, pause | CSS/JS marquee |
| 5 | "160+ tests *chosen by top doctors*" | quote + grid of category cards | **bento-ish grid** | hover lift; mono count labels | grid + hover |
| 6 | "The new standard *for health*" | mosaic of faces + awards | **bento photo mosaic** | quotes overlaid, mobile carousel | grid/carousel |
| 7 | Press logos | row of logos | **logo marquee banner** | infinite horizontal scroll | CSS marquee |
| 8 | "Real people. *Real results.*" | portrait videos | **hover-play video wall** | hover → plays; click → floats PiP + scrub | `<video>` + JS |
| 9 | "*Gold standard*" | copy + partner logos + 2 stats | split + stat cards | count values, small visuals | layout |
| 10 | "*Not your average* checkup" | big Y/N table | **comparison table** | rust checks vs grey X | table |
| 11 | "Built with *top doctors*" | doctor cards | **horizontal-scroll rail** | prev/next drag rail | scroll rail |
| 12 | Pricing | price card | pricing block | testimonials carousel | — |
| 13 | FAQ | questions | plus-icon accordion | expand/collapse | `<details>` |
| 14 | CTA | 1 line, 2 buttons | centered CTA | static | — |
| 15 | Footer | columns + newsletter + apps | big info footer | newsletter form | — |

Takeaway: **11 of 15 sections have a distinct GEOMETRY and 8 "come to life."** v9 has ~6 flat sections, one static video, zero come-to-life. That is the ~0% Max is pointing at.

---

## OUR BLUEPRINT — Develop-HTA mapped to FH archetypes
Honest constraint up front: **FH's density is REAL assets we don't have** (famous doctors, press logos, video testimonials, 160 biomarkers, awards). We replicate FH's **layout archetypes + interactions + scroll experience**, NOT its social proof. Our site will be shorter but must FEEL alive the same way. Real assets are honest slots until the founders supply them.

| # | Our section | Eye hits | Archetype (from FH) | Interaction (must come to life) | Assets |
|---|---|---|---|---|---|
| 0 | Mission bar | 1 line: "Non-profit · pre-launch · HTA for Sub-Saharan Africa" | thin accent top bar | static | none |
| 1 | **Nav** (WE HAVE NONE) | **logo** + links + 1 CTA | transparent sticky nav | sticky, hover underline | real logo |
| 2 | **Hero** | SHORT decisive headline, centered, over **distorted video** | full-bleed distortion-video | **WebGL displacement on the video** + multi-clip + pause + a 3-"pillar" row (Evidence-led · Locally-built · Independent — honest, not fake numbers) | 2-3 graded clips |
| 3 | How an assessment works | 3-4 cards | 3-col cards | **each card's line-art visual DRAWS ITSELF on scroll** (comes to life) | SVG animations |
| 4 | The evidence bodies | scrolling **real logos** (WHO/Cochrane/INAHTA/IQWiG/NICE) | **logo marquee banner** (replaces the "random words" chips) | infinite scroll + hover-pause + tooltip | real body logos |
| 5 | What HTA covers | **bento grid** of domains (medicines · devices · diagnostics · digital health · cost) | bento grid | reveal-in on scroll, hover lift | icons |
| 6 | Why it matters | **comparison table**: "Adopt with HTA vs adopt blind" | comparison table | rust/teal checks vs grey X, rows reveal | none (great, asset-free) |
| 7 | Founders / advisors | portrait cards | **horizontal rail** (or 2-up) | honest photo slots; rail if >3 | photo slots |
| 8 | FAQ | questions | plus-icon accordion | expand/collapse | none |
| 9 | Get in touch | 1 line + CTA | centered CTA | static | none |
| 10 | **Footer (INFO ONLY — NO CTA)** | logo + columns + contact | info footer | none (Max: footers never carry a CTA) | logo |

Deliberately CUT from FH (no honest asset): press logos, celebrity testimonials/video wall, awards mosaic, pricing, famous medical board. Their JOB (credibility) is carried by the evidence-bodies marquee (#4) + the comparison table (#6) instead.

## The interaction mechanics (from `scroll-motion-effects`, not freestyle)
- **Hero distortion:** WebGL displacement/RGB-shift shader over a `<video>` (Three.js plane + displacement map, or a lightweight canvas shader). Multi-clip cycle. This is the single biggest "looks like FH" lever after color.
- **Come-to-life cards:** SVG line-draw (`stroke-dashoffset`) or Lottie, triggered by IntersectionObserver on enter.
- **Logo marquee:** CSS infinite translate loop, hover-pause.
- **Bento reveal:** staggered fade-up on scroll (IO).
- **Comparison rows:** reveal + count/checks.
- **Smooth scroll:** Lenis (already vendored) — fix the "broken scroll" feel.

## Fonts + color to actually match FH (the paint, done last)
- Serif: a sharp editorial serif with a REAL italic (Financier is commercial; closest free = a high-contrast serif e.g. "Newsreader"/"Spectral" with true italic — NOT Fraunces faux-italic).
- Sans: a clean grotesque (FT Base ≈ Inter/Mulish-class; fine).
- Accent: **Max's decision pending — rust `#B05A36` (matches FH) vs navy/teal (brand).** Color is the LAST and easiest change; it does not fix the layout/motion gap.

## Build order
1. Nav + Lenis smooth scroll (fix the broken scroll first).
2. Hero with the WebGL distortion video (the make-or-break section).
3. Come-to-life cards.
4. Evidence-bodies logo marquee.
5. Bento "what HTA covers".
6. Comparison table.
7. Founders rail + FAQ + info footer.
Each section: build → record scroll → judge side-by-side vs FH → fix → next.
