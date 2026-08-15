# Develop-HTA v7 — Build Spec (section-by-section rebuild, no code yet)

Date: 2026-08-13
Author: LEAD (fix spec). No site file touched.
Primary clone: **Center for Global Development (cgdev.org)** — IA + left-aligned editorial type + author/date/type publication cards.
Grafts: **Gavi** (photo hero + photo/text work grid + impact-stat band), **Commonwealth Fund** (the ONE signature large-light left type moment).
Brand render: navy #0E2C46 / #123A5E, ONE teal #14808C accent, green artwork-only whisper, Poppins display + Mulish body (all owner-approved, KEEP).
Governing docs: `postmortem.md`, `reference-decision.md`, `teardown-primary.md`, `typography-rules.md`, `photo-plan.md`.
Rule of this doc: every section names WHICH reference mechanic it clones, WHICH grid geometry it uses (distinct from neighbours), the corrected typography, the real photo, and honest copy. **No freestyle. No fabricated proof. No dashes.**

---

## GLOBAL RULES (apply to every section)
- **Typography:** all of `typography-rules.md` — measures in `rem` not `ch`; headlines LEFT-aligned; center only ONE short line once; `text-wrap:balance` on headings, `pretty` on body; ZERO `<br>` in headings; sentence case, no trailing periods; statement ceiling 3.4rem.
- **Photos:** all of `photo-plan.md` — real dignified faces in hero + 4 program tiles + founders; clean editorial elsewhere; generative art only as a subordinate SVG placeholder on empty knowledge cards.
- **Geometry (F6 fix):** each section uses a DIFFERENT grid. The dark full-bleed treatment appears at most ONCE (hero). Centered-giant type appears at most ONCE.
- **Accent:** navy/white + ONE teal on interactive elements; at most one teal word inside a heading; green never on type.
- **Copy:** short, honest, no em/en dashes, no invented numbers, honest "Coming soon" where proof is absent.

---

## SECTION 1 — Header / Nav  [clone: CGD A1]
- Logo left (existing `logo-transparent.png`). Nav: Home / What we do / About us / Knowledge Hub / Contact. One teal "Get in touch" pill (keep `.pill-liquid`).
- White bg, navy text, hairline bottom border on scroll (keep `.is-stuck`). No centering. **KEEP as-is** — this section was never the problem.

## SECTION 2 — HERO  [clone: Gavi hero + Commonwealth type; the ONE dark/signature moment]
- **Media:** real graded lab video `assets/img/hero.mp4` (Pexels 8381327) with poster, OR static fallback photo ID 3825434 (photo-plan §1). Navy left-to-right gradient scrim for legibility (keep `.hero__scrim`). **DELETE the `data-viz="constellation"` canvas and the throwaway `?hero=video` toggle script.**
- **Headline:** LEFT-aligned, Commonwealth-style large-light. Copy: `Making health technology work for Africa` (no trailing period per NICE; owner call if he wants it kept). `max-width:var(--measure-hero)`, `text-wrap:balance`, **NO `<br>`**.
- **Subline:** one, <= 2 lines, Mulish, `text-wrap:pretty`, `max-width:var(--measure-body)`.
- **CTAs:** primary teal pill "What we do", ghost "Get in touch".
- Geometry: full-bleed dark photo hero, text bottom-left. The ONLY dark full-bleed section; everything below is white-based.
- Fixes: complaint #1 (left, measured, no ragged stack), #2 (real photo hero back), F6 (dark treatment used once).

## SECTION 3 — Affiliations strip  [KEEP — on-brief]
- "Standards we build on" + WHO Prequalification / WHO Compendium 2024 / PATH / HTAi. Sober navy strip. Keep. No image.

## SECTION 4 — Positioning / thesis line  [clone: CGD hero-as-mission-line, LEFT]
- ONE short left-aligned mission line on white, moderate size (NOT giant, NOT centered). Copy: `We help Sub-Saharan African health systems decide which technologies are worth it, using evidence.` One teal keyword accent max.
- Geometry: single left column ~60% width, big right whitespace (asymmetric). `max-width:var(--measure-statement)` or `--measure-h2`, LEFT.
- **This replaces v6's two separate centered "big-statement" beats.** The old `.statement--center` "Global standards, made usable..." either folds in here (left) OR becomes the single sanctioned centered short line used ONCE (typography Rule 2) — pick one, not both.

## SECTION 5 — What we do (4 programs)  [clone: Gavi photo+text work grid]
- **4-up responsive grid**, each cell: real documentary photo (photo-plan §2: 6234992 / 5452298 / 5452193 / 30313899), fixed ~3:2 ratio, then LEFT-aligned program title (Poppins, `max-width:var(--measure-h3)`) + 1-2 line description (Mulish, <= 12 words / 80 chars per parity A6).
- Titles: `Assess & Compare`, `Evidence & Modeling`, `Build Capacity`, `Advisory` (<= 3 words each, parity A4).
- **DELETE all 4 `data-viz` canvases; feed the real photos into the existing `.tile2 img` slot** (CSS already supports it, lines 189-191). Photography carries colour; teal only on "Learn more".
- Geometry: 4-col photo-card row. Distinct from section 4's single column and section 6's list.
- Fixes: #2 (photos back done right), F3, F6.

## SECTION 6 — Knowledge Hub / Latest Work  [clone: CGD signature publication card]
- CGD author/date/type publication card. 3-col grid OR vertical ledger of cards: image (real doc photo 6303643/29941469 where content is real) or **PATH-style SVG placeholder tile on "Coming soon" cards**, headline, meta row (type label: Framework / Toolkit / Case Study + "Curated" + read-time).
- **KEEP the honest "Coming soon" Success-stories row** — never fabricate a case study.
- Geometry: dense multi-column card grid. Distinct again.

## SECTION 7 — Impact / proof band  [clone: Gavi stat band + iDSI metric-as-proof]
- Horizontal band, 3-4 metrics-as-proof, bold figures + labels, LEFT-aligned within the band on subtle navy/tint. **Where no real number exists, state honest founding facts** ("Pre-registration stage", "2 founders", "WHO + PATH standards") — never an invented stat.
- Geometry: single full-width row of large numerals. Distinct from all card grids. No image.

## SECTION 8 — How we work / method  [clone: Resolve 3-step, rendered LEFT]
- 3-4 step sequence (Evidence -> Assessment -> Appraisal -> Recommendation), numbered, **LEFT-aligned** (Resolve structure, NOT its centering). Reuse the clean `.process` grid (already left, already in CSS lines 102-113) INSTEAD of the v6 interactive canvas stepper.
- Optional tiny subordinate PATH-style SVG accent per step (a whisper, not a canvas hero). **DELETE the `#workflow` canvas stepper** (it was pure generative art + caused the alignment drift). If interactivity is wanted, keep it text/number-only; do NOT bring back `data-viz` canvas panels.
- Geometry: numbered horizontal sequence, shared top edge (typography Rule 8). Distinct.

## SECTION 9 — Who we serve  [KEEP — light retune]
- 3-col cards (healthcare orgs / public institutions / local industry). Keep the content; ensure titles left, lists share the grid left edge (Rule 8). No image needed; if one is wanted use 6303643 as a single lead image (photo-plan §4).

## SECTION 10 — Founders / Who we are  [clone: Nuffield author-credibility + honest slot]
- Real dignified stand-in photo (4989148) + honest dated "real founder photos coming soon" note. **DELETE `.portrait__ph` monogram letter tiles** (Finding 3). LEFT-aligned name + role + one-line bio each. 2-up portrait+bio split.
- Keep the "What we build on" citation strip (WHO / PATH) — honest, on-brief.
- Geometry: portrait+bio split. Distinct.

## SECTION 11 — CTA + Footer  [clone: CGD footer + one teal CTA]
- Short **LEFT-aligned** CTA line (NOT centered, NOT giant): `Bringing a technology to Sub-Saharan Africa, or deciding whether to?` — remove the `<br>`, left-align, `max-width:var(--measure-h2)`, `text-wrap:balance`. Primary teal pill + email.
- Flat navy band (no competing photo hero) OR keep clean. Footer: nav, logo, legal, contact. **DELETE `.band__inner{text-align:center}`** and the hard `<br>`.

---

## PART B — v6 failure -> v7 fix map (build checklist)
| v6 failure | v7 fix |
|---|---|
| F1 centered giant headlines shatter | ALL headlines LEFT; measure in rem; center = 1 short line once |
| F2 hard `<br>` orphans | ZERO `<br>` in headings; measure + balance |
| F3 photos stripped for canvas | real photos in hero + 4 tiles + founders; canvas deleted; SVG only on empty knowledge cards |
| F4 cloned Wellcome Leap (funder) | cloned CGD institute + Gavi/Commonwealth craft; zero funder aesthetic |
| F5 freestyle drift | every section names its reference mechanic; build FROM these docs |
| F6 paint-not-geometry (dark canvas x4) | each section a different grid; dark full-bleed ONCE (hero); centered type ONCE |

---

## PART C — parity-check.py UPDATES (retarget from Wellcome Leap to CGD + typography guards)
The current `parity-check.py` enforces the WRONG reference (its header literally says "guards REFERENCE PARITY to Wellcome Leap"): Group A REQUIRES 4+ canvas motifs and ZERO `<img>` in the program grid (A1), and REQUIRES huge tile type (A5 `--fs-tile >= 3rem`). Those rules now enforce the exact defect. Rewrite:

**Group A (program grid) — INVERT to require real photos:**
- A1: program grid must be **4+ `<img>` and ZERO `<canvas data-viz>`** (the inverse of today). FAIL if any `data-viz` canvas remains in the grid slice.
- A2: keep 4-6 tiles.
- A3: retire the "distinct known canvas motifs" rule; replace with **each tile `<img src>` present and unique**.
- A4: keep program-name cap (<= 3 words / 20 chars).
- A5: **DELETE the `--fs-tile >= 3rem` giant-type requirement.** Replace with the typography guard: `.tile2__name` uses `max-width` in `rem` not `ch`, and word count <= 4.
- A6: keep tile-desc cap (<= 80 chars / 12 words).

**Group B (photos) — INVERT to require real photos present:**
- B1: keep banned-old-filename check.
- B2: **allow real photos** — permit `assets/img/*` (self-hosted) and `images.pexels.com/photos/*` refs; still forbid stray/duplicate unexpected refs. Do NOT fail on the presence of `<img>` photos anymore.
- New B4: **require a real hero media** — `.hero` contains a `<video>` or `<img>` (not a `data-viz` canvas). FAIL if the hero is canvas-only.
- New B5: **founders slot has a real `<img>` or an honest coming-soon note, and NO `.portrait__ph` monogram tile.** FAIL if a monogram letter tile is present.

**Group C (interactivity):** drop the "stepper must include a generative canvas panel" (C2) requirement. Method section is now the clean `.process` grid; if kept interactive it must be text/number-only. Remove C2, keep a soft WARN that #workflow (if present) has no `data-viz` canvas.

**Group D (section sequence) — retarget anchors to the CGD sequence:**
```
hero -> affiliations -> positioning/thesis(LEFT) -> program grid(photos) ->
knowledge cards -> impact band -> method(process) -> who-we-serve ->
founders(real/honest) -> cta+footer
```
- D1: update ANCHORS list to the above; drop the `bridge-sec` anchor (bridge section removed). Program grid still above who-we-serve/founders (D2 keep).

**Group E (colour/type) — mostly keep, add typography guards:**
- E1/E2/E3 keep (green artwork-only, accent #14808C, Poppins+Mulish).
- New E4 (typography, from typography-rules Rule 9): FAIL if `.hero h1 / .statement / .h2 / .tile2__name` set `max-width` in `ch`. FAIL if `<br>` inside `<h1>|<h2>|<h3>`. FAIL if more than one element has a headline centering class. WARN if a heading string ends in `.`.

**Group F (copy register) — keep, tighten:**
- F1 (no dashes) keep. F2 hero H1 <= 12 words keep. F3 centered statement <= 12 words keep (and it must be the ONLY centered line). F4/F5/F6 keep.
- New F7: FAIL if more than ONE section uses centered display type (postmortem F6).

Header comment of parity-check.py must be rewritten: "guards REFERENCE PARITY to **CGD (cgdev.org) + Gavi photo grid + Commonwealth left-light type**, and the v7 typography rules" — the Wellcome Leap line is deleted.

---

## Sources
- `research/v7/postmortem.md`, `reference-decision.md`, `teardown-primary.md`, `typography-rules.md`, `photo-plan.md`
- `research/media-shotlist.md` (photo IDs, verified 2026-08-13)
- Firsthand: cgdev.org, gavi.org, commonwealthfund.org type values (refhunt-evidence-policy.md)
