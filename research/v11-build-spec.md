# v11 Build Spec — v10 → Function Health parity (ultracode wf_18f020c2, 2026-08-13)

Full spec + 7-agent audit in the workflow output. Both adversarial verifies = SOUND/reachesParity, with fixes folded in below. Governing skills (GATE-0, load before each area): `wow-asset-director`+`cinematic-stock-hero-video` (hero), `scroll-motion-effects` (come-to-life), `impeccable`/Anti-Slop (gate).

## DONE this pass
- [x] HERO = doctor-video distortion. 3 clinical clips (Mixkit 11850 doctor+scans, 33703 clinician+sample, 46365 vitals monitor) graded navy/teal+cream, xfade montage + tail-loop -> `assets/video/hero.mp4` (293KB). Doctors present, framed SAFE (hands/over-shoulder/monitor, no tight center-face). Retired banned `hero-abstract.mp4`.
- [x] Shader = EDGE-WEIGHTED glass (center ~14% -> edge 100%): crisp subject, living glass at edges, single clean sample (no chromatic). `js/v10.js`.
- [x] Scrim -> navy centered radial. Hero `.em` gold #F3D9AE -> legible teal #6CC4CB (fixed flagged off-palette accent). Hero bg -> #0A1E30.

## TODO (ordered, cheapest-risk-first)
- [ ] STEP 0 cleanup: delete 7 `.kicker` all-caps labels (fold into headlines; LOCKED no-kicker); fix em-dash in `<title>` v10.html:6 -> colon.
- [ ] STEP 2 marquee: kill invented SVG emblems (`js/v10.js:26-33`). Max-authorized: source REAL body logos (WHO/Cochrane/INAHTA/IQWiG/NICE) for this pre-launch mockup + FLAG "legal-clear before go-live". Fallback = mono type wordmarks. Keep disclaimer + hover-pause + tooltip.
- [ ] STEP 3/4/5 COME-TO-LIFE (the "paint not motion" core fix): wire vendored gsap+ScrollTrigger; retire the single shared `.reveal` fade-up; give >=3 sections DISTINCT content-keyed motion (cards: staggered image/number reveal + count-up; bento: staggered assemble; comparison: row + teal-check pop). Raise motion beats toward FH's ~8.
- [ ] STEP 3 card set coherence: one shared warm grade across the 4 card photos (mechanical luminance/cast match).
- [ ] STEP 4 bento: fill empty tiles (Diagnostics = repo photo card-evidence/tile2; Cost/Safety = teal line-motif SVG, NOT rust [flagged], NOT emoji). Differentiate `.hcard` vs `.tile` geometry (they share a skeleton = Reference-Clone §11 fail) — recast "how" as a distinct grid.
- [ ] STEP 11 real italic: fonts have no Fraunces italic woff2 -> faux slant. Load a real Fraunces italic (or switch serif). Owner-locked font -> get real italic, keep family.
- [ ] GATE: run `impeccable detect --json` on site/v10.* with WAIVERS for the 2 locked tells (cream-palette, overused-font:Fraunces); FAIL on kickers/faux-italic/color-drift/geometry-dup. Then recorded-scroll-vs-FH refute judge, then Max's eye.

## OWNER-GATES (resolved / open)
- Founders: RESOLVED = honest slot stays (memory: founder-a/b are stand-ins, not real). Upgrade monogram. Real photos = ask when available.
- Hero footage: RESOLVED = doctors + safe framing (done). Could add a visibly-African establishing clip from Pexels later.
- Real logos: DECIDED = use real for the mockup + hard legal-clear-before-launch flag.
- Italic font + exact 6 bodies (GRADE vs EUnetHTA): minor, my call unless Max redirects.

## Verify-flagged risks (addressed)
- Don't tune hero distortion DOWN (kept edge amplitude strong). / Off-center faces: chose safe-framed clips. / rust->teal. / Mixkit IDs verified resolve. / marquee-as-wordmarks reads weak -> using real logos.
