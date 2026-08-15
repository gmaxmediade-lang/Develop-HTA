# Develop-HTA — Top-1% Homepage Rebuild Plan

Date: 2026-08-11
Author: design lead (synthesis)
Reference to clone: **Wellcome Leap** (wellcomeleap.org) — craft/language only, rendered in Develop-HTA brand.
Standard: Master Brain Website Top-1% (7 laws + anti-slop bans).
Inputs: `top1-audit.md`, `research/teardown-wellcomeleap.md`, `media-shotlist.md` (scratchpad), `interactivity-spec.md`, `DECISIONS.md`, live `site/index.html` + `css/dhta.css`.

## The one move that matters
The build is already sober, honest, single-accent, and correctly structured. It fails top-1% on exactly one axis: **the entire art direction is generative canvas art and every human is an initial in a circle.** The rebuild swaps that for **real, graded media** — a cinematic lab video hero and real-photo program tiles with big-type overlays (the literal Wellcome Leap move) — plus six restrained interactions. Nothing else about the IA or the discipline changes. This is a media + motion pass, not a redesign.

---

## Locked discipline (carried into every section)
- **Palette:** navy ink ramp on clinical white + ONE teal accent `--accent #14808C`. Green `#5CB85C` only inside the mark/positive-data, never UI. (tokens already in `css/dhta.css`.)
- **Type:** Archivo (display, 800/900) + Source Sans 3 (body/UI). Consolidate to 5-6 sizes. **Strip the 18 dead Source Serif 4 faces** from `assets/fonts/fonts.css` (v1 leftover, hurts LCP — audit minor). Reconcile the DECISIONS row that still names Source Serif: live build is Archivo; log the correction.
- **Copy:** NO em/en dashes anywhere (Wellcome Leap uses "5 – 10 years" — do NOT copy that). Honest proof only; every unproven element is an identical-styled "coming soon" slot.
- **Logo:** real files only — `logo-transparent.png` on light, `logo-white.png` on navy. Never redrawn.
- **All media graded** to navy/teal per the `cinematic-stock-hero-video` grade recipe (desaturate, crush blacks, push midtones teal, navy gradient overlay + vignette) so photo + video + UI read as one system.
- **Every photo carries real `alt` text** (fixes the aria-hidden empty-block accessibility gap).
- **Reduced-motion honored** on all six effects (already the house pattern).

## The six interactions (from interactivity-spec.md) and where they live
1. **Lenis smooth momentum scroll** — global (lerp 0.09, smoothing only, no jack). RM = native scroll.
2. **Staggered reveals** (IO, fade + 8px rise, 60ms stagger cap 4, 380ms) — tile grid, who-we-serve, knowledge-hub, credibility.
3. **Condensing sticky nav** (sentinel → `.nav--condensed`, 220ms) — header.
4. **6-state hover** (rest/hover/focus-visible/active/disabled/loading) — all tiles, buttons, form controls.
5. **Graded video hero** (poster-first, muted loop, 20s ambient scale) — Section 1 only.
6. **Accessible "How HTA works" stepper** (accordion, `aria-expanded`, grid-rows 0fr→1fr, `<details>` no-JS baseline) — Section 5, the one rich interaction.
Count-up stat deliberately excluded until a real cited number exists (per spec).

---

# Section-by-section homepage (11 full-bleed sections)

### 0. Header / sticky nav
- **Purpose:** persistent wayfinding + the funnel CTA always in reach.
- **Media:** `logo-transparent.png`.
- **Layout:** logo left, primary links center, `Get in touch` accent button right (this is the funnel action, kept visible on scroll). Mobile: hamburger.
- **Interaction:** Effect 3 — 1px sentinel above hero leaves viewport → `.nav--condensed` (padding 28→16px, hairline border, `backdrop-filter: blur(8px)`). No hide-on-scroll. RM = instant swap, still sticky.
- **Fixes:** gap 8 (funnel — the persistent nav CTA is the goal, not navigation).

### 1. Hero — graded video (fixes gaps 3, 7, 8; audit CRITICAL)
- **Purpose:** cinematic, credible "evidence + technology" first impression tied to the mission.
- **Media:** **VIDEO — Candidate A, "Automated Analysers in a Laboratory"** (`pexels.com/video/automated-analysers-in-a-laboratory-8381327/`, Pexels License). Graded navy/teal, seamless loop, `<1MB`, `poster="hero-poster.jpg"` (poster is LCP), `muted playsinline loop preload="metadata"`. Full-bleed behind copy, dark navy gradient scrim for AA text contrast. Retire the `constellation` canvas.
- **Layout:** left-weighted copy column over the video (Wellcome Leap hero geometry). Big Archivo headline (keep: "Making Health Technology Assessment work for Sub-Saharan Africa."), one-line subline. **No eyebrow** (hero is already correct).
- **CTA fix (gap 8):** primary **accent-filled = "Get in touch"** (the goal); ghost = "What we do". Trust microline beside them: **"Grounded in WHO and PATH standards."**
- **Interaction:** Effect 5 (video + 20s ambient `scale(1.00→1.06)`; RM = static poster `<img>`, no video). Effect 4 on buttons.
- **Build:** produce via `cinematic-stock-hero-video` skill (source → grade → seamless loop → compress → matched poster → wire full-bleed with reduced-motion pause).

### 2. Affiliations / "standards we build on" strip (fixes gap 9)
- **Purpose:** honest credibility above the fold — legitimacy without endorsement claims.
- **Media:** WHO / PATH wordmarks where licensing permits, else set as clean text marks; HTAi Interest Group named as "where our founders met." Quiet, single-row.
- **Layout:** thin full-width band directly under hero, tint surface, small-caps label "Standards we build on" + the marks. Honest framing: **build-on, not endorsed-by.**
- **Interaction:** subtle Effect 2 reveal.
- **Fixes:** moves credibility out of the buried deep-page source list into an above-the-fold trust row.

### 3. Thesis one-liner (white)
- **Purpose:** the Wellcome Leap "global ARPA for health" thesis move, in our voice.
- **Media:** none (type-only, intentional breathing room).
- **Layout:** two-column — big Archivo statement ("An evidence engine for health decisions across Africa.") + one honest paragraph. Keep current copy.
- **Interaction:** Effect 2.

### 4. What we do — REAL-PHOTO program tile grid (fixes gaps 1, 7; audit CRITICAL, the signature clone)
- **Purpose:** the exact Wellcome Leap centerpiece — each program is a bold visual OBJECT. WL uses commissioned science renders; **we use real graded photos with big-type name overlays** (not generative canvas).
- **Media (4 tiles, all Pexels License, graded navy/teal):**
  - **Tile 1 — Assess and compare technologies:** `pexels.com/photo/side-view-shot-of-a-woman-operating-the-equipment-6234992/` (African technician operating medical machinery = "assessing the tech").
  - **Tile 2 — Dossiers and modeling:** `pexels.com/photo/a-physician-wearing-a-white-coat-5452298/` (clinician with tablet = data/evidence).
  - **Tile 3 — Capacity building and training:** `pexels.com/photo/team-of-doctors-having-a-diagnostic-discussion-5452193/` (peer teaching, collegial).
  - **Tile 4 — Advisory for coverage and procurement:** `pexels.com/photo/medical-team-consultation-in-tinduf-algeria-30313899/` (team in consultation = advisory).
- **Layout:** 2-col grid of square-ish cards (WL geometry). Each tile = full-bleed graded photo + bottom-anchored dark gradient scrim + small teal label ("Assessment"/"Evidence"/"Capacity"/"Advisory") + huge Archivo program name + "How it works →". Real `alt` per photo.
- **Interaction:** Effect 2 (staggered reveal, 60ms) + Effect 4 (6-state: hover lift -2px + shadow, focus-visible accent outline, active scale .995).
- **Generative art:** removed from tiles. Canvas survives ONLY as the optional subtle texture in Section 6 (gap 7 — demote to at most one surface).

### 5. How HTA works — interactive stepper (fixes gap 4; the rich interaction)
- **Purpose:** explain the HTA pipeline (educates the four-way technical audience) and satisfy the "one signature interaction" bar without gimmickry.
- **Media:** optional supporting wide band photo `pexels.com/photo/focused-african-american-researcher-conducting-biochemical-experiment-in-clinic-3825434/` as a graded strip beside the stepper (or omit for pure type).
- **Layout:** left = section headline + short frame; right = 4-step accordion **Evidence → Assessment → Appraisal → Recommendation**, connecting rail, one panel open at a time.
- **Interaction:** Effect 6 — accessible accordion (`<button aria-expanded>` + region, keyboard/arrow nav, grid-rows 0fr→1fr at 300ms, marker fills accent). No-JS baseline = native `<details>`/`<summary>`. RM = instant toggle.

### 6. Bridge / network — signature scroll moment (fixes gap 7)
- **Purpose:** the mission metaphor — "global standards ↔ local realities" — as the one place generative art is allowed, now grounded in a real image.
- **Media:** full-bleed graded band. **Primary = the researchers band photo** (`3825434` above, if not used in §5) OR the who-we-serve image, navy overlay; the `bridge` node-line canvas kept ONLY as a faint texture layer over it (the single surviving generative accent). Green permitted inside this artwork only.
- **Layout:** centered bold Archivo statement (keep: "Global standards on one side. Local realities on the other. We are the bridge."), short copy, one accent button "How we are built →".
- **Interaction:** Effect 2 reveal (per interactivity-spec — no scroll-scrub/pinning in this register).

### 7. Who we serve
- **Purpose:** four-way stakeholder self-sort (ministries / hospitals / donors / device-makers).
- **Media:** optional lead band `pexels.com/photo/doctor-communicating-with-black-patient-in-hallway-of-hospital-6303643/` (dignified clinician + patient, agency intact) as a graded strip above the columns; keep columns type-led so geometry stays distinct from the photo-tile grid.
- **Layout:** 3 columns (keep current), dot markers, tight lists.
- **Interaction:** Effect 2 (staggered), Effect 4 if columns become links.

### 8. Knowledge Hub teaser
- **Purpose:** signal depth, hold honest "coming soon" without looking empty.
- **Media:** none (typed ledger).
- **Layout:** typed ledger rows (Framework / Toolkit / Success stories = coming-soon), identical styling so the grid reads full and intentional.
- **Interaction:** Effect 2 + Effect 4 (6-state on rows/cards).

### 9. Credibility / founders (fixes gap 2; audit CRITICAL)
- **Purpose:** put a human face on a trust-driven non-profit; retire the "M"/"J" initials.
- **Media:** **real Marina + Jani headshots**, graded to match. **Owner gate:** we do NOT have them yet, and dropping a stock person's face under the name "Marina/Jani" is fabrication (violates the locked no-fabricated-proof rule). So ship a **premium honest framed headshot slot** ("Founder portraits arriving") sized for the real files, and swap the instant they land. Do NOT use the generic stock portrait as a founder. Keep the "what we build on" WHO/PATH source list here as the deeper detail.
- **Layout:** two founder cards (photo frame + name + one-line credential: MD / biomedical engineer) beside the sources list.
- **Interaction:** Effect 2.

### 10. CTA band (navy) (fixes gaps 5, 8)
- **Purpose:** the single conversion goal, repeated.
- **Media:** none (dark navy band).
- **Layout:** bold Archivo statement + lead + primary accent "Get in touch →" + email. Trust microline beside it.
- **Interaction:** Effect 4 (6-state, including loading state shared with the contact form). **Contact form (on contact page) fix (gap 5):** wire to a real endpoint (Formspree or Vercel serverless), add client-side validation, disabled-while-submitting + spinner, and success/error states. Retire `action="mailto:"`.

### 11. Footer (fixes gap 10)
- **Purpose:** legal + wayfinding.
- **Media:** `logo-white.png` knockout on navy.
- **Layout:** brand blurb, Explore + Contact columns, legal row.
- **Fixes:** keep Privacy link (already good). **Add an Impressum / legal-entity block** (entity name, registration number, responsible contact) once registered — honest "Registration in progress" placeholder until then. **Add a cookie/consent notice** the moment any analytics/embed/third-party asset is introduced (none today = honest none).

### Interior pages (apply the same fixes, gap 6)
- **Delete every all-caps eyebrow stacked over an H1** on what-we-do ("The approach"), about ("Mission and vision"), knowledge-hub ("HTA frameworks"). Fold positioning into the H1/subline. `.eyebrow` class may stay but never over a heading.

---

## Audit-gap coverage map
| Gap | Fixed in |
|---|---|
| 1 No photography | §4 photo tiles + §6/§7 photo bands + §9 headshots |
| 2 No faces | §9 real founder headshots (honest slot until supplied) |
| 3 No video | §1 graded Candidate-A hero video |
| 4 Motion too thin | Effects 1-6, esp. §5 stepper + §6 signature band |
| 5 Interactive-state fidelity | Effect 4 everywhere + §10 real form endpoint/states |
| 6 Eyebrow/kicker slop | Interior-page eyebrows deleted |
| 7 Generative art primary | Canvas removed from tiles; survives only as §6 faint texture |
| 8 Funnel dilution | §1 primary CTA = "Get in touch"; trust microlines |
| 9 No trust strip | §2 honest affiliations strip near hero |
| 10 EU compliance | §11 Impressum block + consent-notice trigger |
| Minor: dead serif payload | Strip Source Serif faces from fonts.css |
| Minor: empty aria-hidden blocks | Real photos + alt text |
| Minor: type-size count | Consolidate to 5-6 sizes |

---

## Deterministic gate + judge plan
**Phase A — deterministic (must be green before any judge):**
1. `discipline-check.py` — no em/en dashes, no kicker-over-H1, accent-amount within budget, AA contrast.
2. **`impeccable` skill detect** — run the impeccable detector pass over the built home; resolve all flags.
3. **Media gates:** hero video `<1MB`; poster is the LCP element (not the video); every photo has real `alt`; license = Pexels recorded in a MEDIA-CREDITS note; all media graded to the navy/teal recipe (set-coherence: luminance/cast match).
4. **Effects gate (interactivity-spec checklist):** exactly 6 effects; every entrance ≤400ms, micro-feedback ≤200ms; `prefers-reduced-motion` = no transforms / content visible / video paused; keyboard-only pass on nav + stepper (tab order, Enter/Space/arrows, no traps); no CLS from reveals.
5. Build fingerprint stamped.

**Phase B — fresh-context builder ≠ judge vs Wellcome Leap:**
A fresh-context judge (never the builder) pixel-compares the home build to **Wellcome Leap** on: (a) dark full-bleed hero with a big grotesque headline + one accent button + real motion imagery; (b) the program grid reading as bold photo OBJECTS with big-type overlays (not decoration); (c) restraint everywhere else; (d) single-accent discipline; (e) honest proof (no fabricated numbers/faces). Verdict is **against the named reference, not a rubric.** FIX-FIRST loop until parity.

**Phase C — Max's eye (live trackpad).** Motion smoothness (Lenis feel), grade coherence, and the funnel read judged live. Done ≠ a green hygiene gate.

---
Plan written to: `D:\AntiGravity\develop-hta\TOP1-BUILD-PLAN.md`
