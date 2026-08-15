# Develop-HTA homepage (v5) — DRIFT AUDIT vs Wellcome Leap reference + Reference-Clone system

Date: 2026-08-12 · Audited: `site/index.html` + `site/css/dhta.css` full read, all homepage photos opened and assessed, `dhta-viz.js` + `dhta.js` inspected.
Reference: `research/teardown-wellcomeleap.md`. Ranked WORST-FIRST. Each item: SECTION · PROBLEM · REFERENCE-TRUE FIX.

---

## 1. [CRITICAL] The program grid uses STOCK PHOTOS, not the generative canvas — and the generative engine is not even loaded on the homepage
SECTION: "What we do" tile grid (`index.html` lines 83-137), and the whole page's `<script>` block (lines 326-329).
PROBLEM: The owner LOCKED this grid to Wellcome-Leap bold visual objects on the existing generative canvas motif system (`dhta-viz.js`: constellation / bridge / burst / molecular / circuit / rings / mesh). Instead every tile renders `tile1-4.jpg` stock photos. Worse: `index.html` never loads `dhta-viz.js` and contains ZERO `canvas[data-viz]` nodes — grep confirms 0 matches. Every OTHER page (about, contact, knowledge-hub, privacy, what-we-do) DOES load and use it. The homepage, the one page that must clone the reference, is the only page missing the reference's single most defining move. This is a direct violation of the locked owner decision and the teardown's centrepiece ("a grid of program tiles, each a bold abstract visual").
FIX: Remove all four `<img src="tileN.jpg">`. Load `dhta-viz.js`. Give each `.tile2` a `<canvas data-viz="burst|molecular|circuit|rings">` (one distinct motif per tile) in navy/teal with green ONLY inside the artwork. This is the reference's "each program is a bold visual object, done in code" and the only way color enters the page the WL way.

## 2. [CRITICAL] The same stock photo is used TWICE, and the whole photo set is amateur / off-brand / not Sub-Saharan
SECTION: "Who we serve" figure (`consult.jpg`, line 176) and closing CTA band (`serve.jpg`, line 277); plus thesis (`evidence.jpg`), bridge band (`band.jpg`), and the four tiles.
PROBLEM (verified by opening every file):
 - `consult.jpg` and `serve.jpg` are BYTE-IDENTICAL (md5 `2d641df8…`). The identical photo appears twice on one scroll. It shows a Western exposed-brick loft, a male nurse wearing a female "Jennifer Martin RN" badge (mismatched/fake), and an anxious patient. Not Sub-Saharan, reads as cheap stock, and the duplication is glaring.
 - `band.jpg` (bridge): African woman in safety glasses, face turned DOWN, eyes hidden/downcast — the exact "no eyes / turned away" amateur tell the brief says scores BELOW showing nothing.
 - `tile1.jpg`: heavy PURPLE/blue color-cast (off-brand — not navy/teal), alarmed expression at an X-ray box.
 - `tile2.jpg`: cold desaturated studio, male doctor in profile, eyes downcast behind round glasses — no eye contact, fashion-moody not clinical.
 - `tile3.jpg`: three doctors in a cold concrete loft, Western editorial, nobody engaged — off-region, off-tone.
 - `tile4.jpg`: the ONE authentic frame (real Sahel field clinic) — but it clashes tonally (warm daylight) with the cold-studio tiles beside it, so the SET is incoherent.
 - `evidence.jpg` (thesis): two African clinicians, warmer and on-brand-ish, but the BACK of a grey monitor dominates dead-center and the patient is faceless — awkward crop.
FIX: Per the owner decision the grid goes generative (item 1), so tile1-4 are deleted outright. For the remaining photo slots, either (a) replace with honest niche photography that has EYE CONTACT and reads Sub-Saharan clinical, or (b) drop the photo and use a generative panel / honest slot. Never reuse one file twice. `band.jpg` and the duplicated `consult/serve.jpg` are the priority removals.

## 3. [HIGH] Program/tile names are long and crammed with descriptions — the opposite of WL's huge one-word names
SECTION: tile grid `.tile2__name` + `.tile2__desc` (lines 96-131).
PROBLEM: Names run 3-5 words ("Assess and compare technologies", "Advisory for coverage and procurement", "Capacity building and training"), each stacked over a 2-line description and a "How it works" link, four to a 2-column grid. WL's move is a HUGE, short, commanding program name that owns the tile with near-zero supporting text. Current tiles are cramped mini-cards, not bold visual objects.
FIX: Cut each name to ONE or two commanding words ("Assess", "Model", "Train", "Advise") at the large `--fs-tile` size, drop the per-tile paragraph (or reduce to a 3-4 word label), let the generative canvas + huge name do the work. Give each name room to breathe over its own visual.

## 4. [HIGH] Interactivity regressed — the interactive stepper exists but the homepage uses a STATIC grid instead
SECTION: "How an assessment actually works" (`index.html` lines 139-153) uses `.process` (a static 4-column sequence, all visible, no interaction).
PROBLEM: The owner explicitly preferred the interactive sections over static tiles and asked to bring interactivity forward. The real interactive accordion stepper is fully built — CSS `.stepper/.step/.step__btn/[aria-expanded]` (dhta.css 226-237) and the JS handler (`dhta.js` lines 89-95) — but the homepage does not use it; it uses the flat `.process` grid. The one interaction the owner liked is sitting unused.
FIX: Replace the static `.process` block with the interactive `.step` accordion (already wired), or build a real click/hover stepper where each of the 4 steps (Evidence → Assessment → Appraisal → Recommendation) expands its detail. Make "how an assessment works" the page's interaction moment.

## 5. [HIGH] The bridge/network section is a stock photo band, not the generative node-graph the teardown specifies
SECTION: "Global standards / local realities / we are the bridge" band (lines 155-166) rendered with `band.jpg`.
PROBLEM: Teardown section 5 explicitly calls for the bridge metaphor rendered as WL's network graphic — a generative node-graph bridging two clusters. The engine for it exists (`makeBridge()` in dhta-viz.js, and `.bridge-sec` with a `<canvas>` in dhta.css 207-215) but is UNUSED on the homepage; instead a faceless stock photo carries the section. The single most on-metaphor, most on-logo section is done in stock instead of code.
FIX: Swap the `.band`/`band.jpg` bridge for a `.bridge-sec` with `<canvas data-viz="bridge">`, centered bold statement over it. This renders the mission metaphor (standards bridged to local realities) in brand palette and ties to the logo's network motif.

## 6. [MEDIUM] Hero is a stock-ish graded video, not the logo-tied generative constellation the teardown makes the #1 move
SECTION: hero (lines 37-55), `hero.mp4` + `hero-poster.jpg`.
PROBLEM: Teardown section 1 makes the hero a generative NETWORK CONSTELLATION (nodes + links, a medical-cross node, a hint of the continent) precisely so "the hero must relate to their logo." The `makeConstellation()` engine exists. The current hero is a graded video that does not tie to the mark. It is not bad, but it is not the reference-true, logo-anchored hero.
FIX: Either replace the video with a `<canvas data-viz="constellation">` behind the headline, or layer the constellation over the video, so the hero echoes the circuit+network+cross+Africa mark as speced.

## 7. [MEDIUM] Sections are not geometry-distinct — two identical text/photo splits and two identical photo bands
SECTION: `thesis-cols` (text-left / photo-right, lines 71-81) vs `serve-head` (text-left / photo-right, lines 169-177); and the bridge band (line 155) vs the CTA band (line 275) — both centered-text-over-full-bleed-photo.
PROBLEM: The Reference-Clone law is "differentiate by GEOMETRY not paint." Two sections share the same L-text/R-photo 2-col grid, and two share the same centered-band composition. The wireframe repeats; only the words change.
FIX: Change the GRID, not the color. E.g. make the thesis a full-width statement line (WL "evidence engine" one-liner, no photo), keep who-we-serve as the split; and make one of the two bands a generative canvas section (the bridge, item 5) so it is compositionally distinct from the closing CTA band.

## 8. [MEDIUM] Copy is hedgy/wordy in places vs WL's bold, short, science-forward register
SECTION: credibility ("joined by one dream", "brought together by a shared belief", lines 250-251), tile descriptions (long), various soft NGO lines.
PROBLEM: WL register is confident, bold, SHORT. Lines like "Founded by a doctor and an engineer, joined by one dream" and "brought together by a shared belief that global standards are only as good as their local application" are soft and long. Tile descriptions add wordiness the reference does not have.
FIX: Rewrite via the copywriting skill in the WL register — short declaratives, science-forward, no fabricated proof, no dashes. Cut tile descriptions to labels (item 3). Keep the honest "coming soon" slots (those are correct and should stay).

## 9. [LOW] The page lacks the WL "color from artwork" pop and the confident big-statement line
SECTION: overall + between thesis and grid (teardown section 3).
PROBLEM: Because no generative artwork is present (items 1, 5, 6), the entire page is navy + white + teal + flat photos. WL's vividness comes entirely from the tile/hero VISUALS; with those absent the page reads flat and monochrome next to the reference. There is also no standalone confident big-statement line (teardown section 3, e.g. "Global standards, made usable where decisions are actually made.").
FIX: Items 1/5/6 restore the color-from-artwork. Add one bold big-statement band between thesis and grid (honest, no numbers).

---

## Clean (no drift found)
- DASHES: no em/en dashes anywhere in homepage copy (grep clean). Only `&rarr;` and `&middot;` entities, which are fine. Hyphenated compounds (non-profit, low-resource) are legitimate.
- ACCENT DISCIPLINE: teal `#14808C` is the only UI accent; dots/links/checks all teal. Green appears only in the favicon mark (brand logo), not on UI/text. NOTE: the "green only inside artwork" allowance is currently moot because there is no artwork on the page — items 1/5/6 are where green should finally appear (inside the canvas motifs), never on text.
- KICKER LABELS: no all-caps eyebrow sits on an H1; headlines lead. Correct.
- HONEST PROOF: "Coming soon" slots for success stories and founder photos are honest and correct — keep them.

## Priority order to fix
1 (generative grid + load viz) → 2 (kill duplicate/amateur photos) → 3 (short huge names) → 4 (interactive stepper) → 5 (generative bridge) → 6 (constellation hero) → 7 (geometry) → 8 (copy) → 9 (statement line / color pop).
