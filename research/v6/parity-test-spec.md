# parity-check.py — Spec for the v6 Deterministic Convergence Gate

Date: 2026-08-12
Purpose: a NEW deterministic test `parity-check.py` (repo root, beside `discipline-check.py`) that mechanically verifies the homepage has converged to the Wellcome-Leap reference per `parity-targets.md` and the owner feedback. It complements `discipline-check.py` (which guards house rules); this one guards REFERENCE PARITY. Every rule below is greppable/parseable from `site/index.html`, `site/css/dhta.css`, `site/js/dhta.js`, `site/js/dhta-viz.js`. Exit non-zero on any FAIL. WARN-only rules print but do not fail.

## Conventions for the script
- `HTML = read(site/index.html)`, `CSS = read(site/css/dhta.css)`, `JS = read(site/js/dhta.js)`, `VIZ = read(site/js/dhta-viz.js)`.
- Only the HOMEPAGE (`index.html`) is parity-checked (interior pages already load the viz engine).
- `visible_text(HTML)` = strip `<script>`, `<style>`, `<svg>`, then tags (reuse the helper from `discipline-check.py`).
- "Grid block" = the substring of HTML from the opening `<div class="tilegrid"` to its matching section close. A regex slice `class="tilegrid"[\s\S]*?</section>` is acceptable (grid is the only `.tilegrid` on the page).
- Program-name strings = every `<h3 class="tile2__name">...</h3>` inner text inside the grid block.
- Tile sub-lines = every `<p class="tile2__desc">...</p>` inner text inside the grid block.
- Word count = `len(re.findall(r"\S+", s))` (whitespace tokens; `&` counts as one token).
- Char count = `len(s.strip())` including spaces, after unescaping `&amp;`→`&`.

---

## RULES (each: ID · what · parse · PASS condition · FAIL message)

### Group A — Program grid = generative canvas objects (owner feedback #1, parity §D/§J)

**A1. Grid uses canvas motifs, not stock photos.**
Parse grid block. PASS if grid block contains `>= 4` `<canvas data-viz=` occurrences AND `0` occurrences of `<img`.
FAIL: "program grid must be 4+ canvas motifs and zero <img> (found {ncanvas} canvas, {nimg} img)".

**A2. Grid tile count 4–6.**
Count `class="tile2` in grid block. PASS if `4 <= n <= 6`.
FAIL: "program grid must have 4 to 6 tiles (found {n})".

**A3. Each grid motif is distinct.**
Collect `data-viz="X"` values inside grid block. PASS if all values unique AND each ∈ {burst, molecular, circuit, rings, mesh, constellation, bridge}.
FAIL: "grid motifs must be distinct known motifs (got {list})".

**A4. Program names are SHORT (owner feedback #2, parity §B).**
For each `.tile2__name` string: word_count <= 3 AND char_count <= 20. Allow AT MOST ONE site-wide outlier of 4 words / 21 chars.
PASS if at most one name breaches, and no name exceeds 4 words or 21 chars.
FAIL: "program name too long: '{name}' ({w} words, {c} chars) — cap 3 words / 20 chars".

**A5. Program names are HUGE (parity §A/§J).**
From CSS, read `--fs-tile` and `--fs-h2` clamp MAX values (the 3rd clamp arg, in rem). PASS if `fs-tile.max >= 3.0rem` AND `fs-tile.max > fs-h2.max`.
FAIL: "--fs-tile max must be >=3rem and > --fs-h2 max (tile={a}rem, h2={b}rem)".

**A6. Tile sub-line short or absent (parity §B/§D).**
For each `.tile2__desc` string (if any): char_count <= 80 AND word_count <= 12.
PASS if every desc within limits (zero descs also passes).
FAIL: "tile sub-line too long: '{desc}' ({c} chars / {w} words) — cap 80 chars / 12 words".

### Group B — Photos removed / honest (owner feedback #1, drift #2/#5/#7)

**B1. No banned stock photos anywhere on the homepage.**
PASS if none of these substrings appear in HTML: `tile1.jpg tile2.jpg tile3.jpg tile4.jpg evidence.jpg band.jpg consult.jpg serve.jpg`.
FAIL: "banned stock photo still referenced: {name}".

**B2. No duplicate image reference.**
Collect all `src="assets/img/*.jpg|png|webp"` on the page EXCLUDING the two logos (`logo-transparent.png`, `logo-white.png`). PASS if the remaining list has no duplicates AND (stronger) is empty.
FAIL: "duplicate or leftover photo reference(s): {list}".

**B3. Generative engine loaded.**
PASS if HTML contains `js/dhta-viz.js` AND it appears before `js/dhta.js` in the file.
FAIL: "homepage must load js/dhta-viz.js before js/dhta.js".

### Group C — Interactivity (owner feedback #3, parity §F)

**C1. Interactive stepper section present.**
PASS if HTML contains `id="workflow"` AND `>= 3` occurrences of `class="step"` within that section.
FAIL: "interactive stepper (#workflow with >=3 .step) missing".

**C2. Stepper has a linked canvas panel.**
PASS if the `#workflow` section contains at least one `<canvas data-viz=`.
FAIL: "stepper must include a generative canvas panel".

**C3. Stepper has JS state toggle.**
PASS if `JS` contains `aria-selected` AND references the stepper (`workflow` or `.step`).
FAIL: "dhta.js must toggle stepper active state (aria-selected)".

**C4. Reduced-motion guard on auto-advance.**
PASS if `JS` contains a reduced-motion read (`prefers-reduced-motion` or the `reduce` variable) AND an auto-advance timer (`setInterval` or `setTimeout` near the stepper). WARN (not FAIL) if timer present but guard not clearly co-located.
FAIL: "auto-advance present without a prefers-reduced-motion guard".

### Group D — Section sequence / geometry (parity §C)

**D1. Required sections present in order.**
Define ordered anchors, each identified by a stable marker in HTML:
1. hero → `class="hero"`
2. thesis → `class="hta-def` OR `class="thesis`
3. big-statement → `statement--center`
4. program grid → `class="tilegrid"`
5. bridge → `class="bridge-sec`
6. stepper → `id="workflow"`
7. who-we-serve → `class="who"`
8. knowledge ledger → `class="ledger"`
9. cta band → `class="band"`
Find each marker's first index in HTML. PASS if all present AND indices strictly increasing in the order above.
FAIL: "section '{name}' missing or out of order".

**D2. Grid appears before who-we-serve and before founders.**
PASS if index(`class="tilegrid"`) < index(`class="who"`) AND < index(`class="portraits"`).
FAIL: "program grid must appear above who-we-serve/founders".

### Group E — Colour + type discipline (parity §G, locked brand)

**E1. Exactly one UI accent (teal) — no green on UI.**
In CSS, find every hex colour applied to a text/border/button/link/icon property (`color:`, `border`, `background` on non-canvas UI, `stroke:`, `fill:` outside `<svg>` art). PASS if `#5CB85C` (and `#8FD98F`) never appears in CSS on any such property. Green may ONLY appear as a string inside `VIZ` (dhta-viz.js). Also PASS-check: `#5CB85C` count in `visible_text`/inline styles of HTML == 0.
FAIL: "green (#5CB85C) used on UI/text — green is artwork-only (near '{ctx}')".

**E2. Teal is the accent token.**
PASS if CSS `--accent` == `#14808C` (case-insensitive).
FAIL: "--accent must be #14808C (found {val})".

**E3. Display font is Poppins.**
PASS if CSS `--display` value contains `'Poppins'` AND `--sans` contains `'Mulish'`, and no `@font-face`/`font-family:'X'` introduces a family outside {Poppins, Mulish}.
FAIL: "display font must be Poppins, body Mulish; unexpected family {X}".

### Group F — Copy register (parity §I, owner feedback #4)

**F1. No em/en dashes** (mirror of discipline-check, kept here so parity is self-contained).
PASS if `visible_text(HTML)` contains no `—` and no `–`.
FAIL: "em/en dash in copy near '{ctx}'".

**F2. Hero H1 short.**
Extract the `<h1>` inner text (strip inner tags/`<br>`). PASS if word_count <= 12.
FAIL: "hero H1 must be <=12 words (found {w})".

**F3. Big-statement line short.**
Extract text of the `statement--center` element. PASS if word_count <= 12.
FAIL: "big-statement line must be <=12 words (found {w})".

**F4. Dark-band support copy short (parity §E, band ≤120 chars).**
For each `<p>` that is a DIRECT child of `.bridge-inner` or `.band__inner` (support line, not the h2), char_count <= 120.
PASS if all within 120.
FAIL: "band support copy >120 chars: '{p}' ({c})".

**F5. Body paragraph cap (WARN).**
For each `<p>` in `visible_text` scope with > 45 words, WARN (not FAIL) — long-paragraph smell. Print the offender.

**F6. No all-caps kicker on the H1 (WARN, mirror).**
If an element with an uppercase label class (`eyebrow`, `tile2__label` is fine — it is on tiles) sits as an immediate sibling directly above the `<h1>`, WARN. (Primary enforcement stays in discipline-check.)

---

## OUTPUT CONTRACT
- Print `Parity check — index.html` header.
- Print each rule as `PASS Rx` / `FAIL Rx: msg` / `WARN Rx: msg`.
- Print a summary line `{nfail} failures, {nwarn} warnings`.
- `sys.exit(1)` if any FAIL, else `sys.exit(0)`.

## RULE → SOURCE-OF-TRUTH MAP (traceability)
| Rule | Owner feedback | parity-targets §  |
|---|---|---|
| A1–A3 | #1 grid generative | §D, §J |
| A4 | #2 short names | §B, §J |
| A5 | #2 huge names | §A, §J |
| A6 | #1/#4 short subs | §B, §D |
| B1–B2 | #1 remove weak photos | §D, drift #2 |
| B3 | #1 engine loaded | drift #1 |
| C1–C4 | #3 interactivity | §F |
| D1–D2 | #5 closer to ref | §C |
| E1–E3 | locked discipline | §G, §A |
| F1–F6 | #4 copy | §I |

## NOTES FOR THE IMPLEMENTER
- Reuse `discipline-check.py`'s `visible_text()` and clamp-max parsing helpers; keep the two scripts independent (parity-check does not import discipline-check).
- Clamp-max parse: `re.search(r"--fs-tile:clamp\([^,]+,[^,]+,\s*([\d.]+)rem", CSS)` → group(1) float; same for `--fs-h2`.
- Be tolerant of `&amp;` in names: unescape before counting (so `Assess &amp; Compare` counts as `Assess & Compare` = 3 words / 16 chars — PASSES A4).
- Grid-block slicing must not accidentally swallow later sections: anchor the close on the FIRST `</section>` after `class="tilegrid"`.
- All four copy-deck program names pass A4/A6 by construction; the test exists to catch REGRESSION back to sentence-length names.
