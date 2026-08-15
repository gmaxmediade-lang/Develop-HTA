# Develop-HTA Homepage v6 — Section-by-Section Build Spec (LEAD synthesis)

Date: 2026-08-12
Reference cloned: Wellcome Leap (`research/teardown-wellcomeleap.md`)
Governing system: Reference-Clone Elite Site (clone the CRAFT, render in our brand; differentiate by GEOMETRY not paint; one teal accent; green artwork-only; no dashes; no fabricated proof).
Inputs synthesized: `parity-targets.md` (numbers), `drift-audit.md` (defects), `copy-deck.md` (verbatim copy), current `site/index.html` + `site/css/dhta.css` + `site/js/dhta-viz.js` + `site/js/dhta.js`.

This spec is the single source of truth for the v6 rebuild. Build EXACTLY this. Every copy string here is final (from the copy deck). Every class named here already exists in `dhta.css`/`dhta-viz.js` unless flagged **[NEW CSS]** or **[NEW JS]**.

---

## 0. GLOBAL CHANGES (do these first)

**0.1 Load the generative engine on the homepage.** The homepage is the ONE page missing `dhta-viz.js` (drift #1). Add before `js/dhta.js`:
```html
<script src="js/dhta-viz.js"></script>
```
Order in `<script>` block: gsap → ScrollTrigger → lenis → **dhta-viz.js** → dhta.js.

**0.2 Bump the program-name type token** (parity §A/§J — names must be the 2nd-biggest type and larger than any h2). In `:root`:
```css
--fs-tile:clamp(1.9rem,1rem + 3.2vw,3.75rem);   /* was max 2.75rem — too small */
```
Constraint: `--fs-tile` max (3.75rem) MUST be > `--fs-h2` max (2.9rem). Do not raise `--fs-h2`.

**0.3 Remove ALL stock photography** (drift #2/#5/#7 + owner feedback #1). Delete these `<img>` and their wrappers everywhere on the homepage: `tile1.jpg`, `tile2.jpg`, `tile3.jpg`, `tile4.jpg`, `evidence.jpg`, `band.jpg`, `consult.jpg`, `serve.jpg`. After this rebuild the homepage contains ZERO `<img src=".../img/*.jpg">`. The only raster left is the two brand logos (`logo-transparent.png`, `logo-white.png`) which stay. Founder identity stays as honest letter-placeholders (`.portrait__ph`), never a stock face.

**0.4 Discipline invariants** (carry through every section): fonts LOCKED to Poppins (display) + Mulish (body) — do not add a third. Exactly one UI accent, teal `#14808C`. Green `#5CB85C` appears ONLY inside `<canvas>` artwork (it already does inside dhta-viz.js) — zero green on any text/border/button/link/icon in HTML or CSS. No em/en dashes. No all-caps kicker sitting on an H1.

---

## 1. NAV (keep as-is)
Reference pattern: WL fixed transparent nav over dark hero.
Geometry: single horizontal row, logo left, links center-right, one teal CTA.
Copy: unchanged. Links: Home / What we do / About us / Knowledge Hub / Contact. CTA `Get in touch`.
Reuse: `.site-header`, `.nav`, `.pill-liquid`. No change.

---

## 2. HERO
Reference pattern: WL dark full-bleed hero — small structure, one huge bold grotesque H1, one-line subline, one accent button + ghost, abstract science visual tied to the brand mark.
Geometry: full-bleed dark navy, single left-aligned text column over a full-bleed generative canvas. `min-height:clamp(560px,84vh,880px)` (unchanged).

**Visual (reference-true move — parity §C.2, drift #6):** replace the graded `hero.mp4` video with the logo-tied generative constellation. Inside `.hero__bg`, swap the `<video>` for:
```html
<canvas data-viz="constellation" data-dark="1" data-seed="7" aria-hidden="true"></canvas>
```
`.hero__bg video,.hero__bg img` CSS already sizes children full-bleed; add `canvas` to that selector **[NEW CSS, 1 word]** (`.hero__bg video,.hero__bg img,.hero__bg canvas{...}`). Keep `.hero__scrim` for text contrast. This ties the hero to the mark (circuit + network + medical cross) exactly as the teardown makes the #1 move. Reduced-motion is already handled inside dhta-viz.js (renders one static frame).
(Owner-optional: if a confirmed-strong niche hero video later exists, it may sit BEHIND the constellation. Default v6 = constellation only. Do not reintroduce weak footage.)

**Copy (copy deck §1) — FINAL:**
- H1 (`.reveal-h`, one `<br>`): `Making health technology<br>work for Africa.`  (6 words)
- Subline (`.sub`): `Health Technology Assessment for Sub-Saharan Africa, so every device, diagnostic, and treatment that reaches the region is safe, effective, and worth it.`
- Primary CTA `.pill-liquid.-onink` → `What we do` (href `what-we-do.html`), arrow.
- Secondary `.btn.btn--ghost-ink` → `Get in touch` (href `contact.html`).

Reuse: `.hero`, `.hero__inner`, `.reveal-h`, `.sub`, `.pill-liquid`, `.btn--ghost-ink`.

---

## 3. AFFILIATIONS STRIP (keep)
Reference pattern: honest sourcing bar (our substitute for WL's funder logos — no fabricated logos).
Geometry: single horizontal inline row on navy (`.affil`). Distinct from hero (thin band) and thesis (white).
Copy (unchanged, honest): label `Standards we build on` · `WHO Prequalification` · `WHO Compendium 2024` · `PATH Technical Standards` · `HTAi Interest Group`.
Reuse: `.affil`, `.affil__label`, `.affil__items`, `.dot`.

---

## 4. THESIS (geometry CHANGED — no photo)
Reference pattern: WL thesis one-liner ("A breakthrough engine for health. At global scale.") + short support paragraph.
Geometry: **full-width, NO image** (drift #7 — kills the first of the two duplicate L-text/R-photo splits and removes weak `evidence.jpg`). Two-column TEXT block: big statement left (`max-width:22ch`), support paragraph right (`max-width:46ch`). Reuse the existing `.hta-cols` grid + `.hta-def` statement type (already defined, `font-size:var(--fs-statement)`), or keep `.thesis .big` and drop the `.thesis-media` figure. **Chosen: reuse `.hta-cols` / `.hta-def` / `.hta-aside`** so the statement reads at full statement scale.

**Copy (copy deck §2) — FINAL:**
- Statement (`.hta-def reveal-h`): `An evidence engine for African health.`
- Support (`.hta-aside`, one paragraph ≤3 sentences): `Health Technology Assessment is how a health system decides which technologies are worth it, judged on safety, effectiveness, and value. The global standards already exist. We make them usable where ministries, hospitals, and funders actually make the call.`

Remove: the `<figure class="thesis-media">` + `evidence.jpg` entirely.

---

## 5. BIG-STATEMENT LINE (NEW section, drift #9)
Reference pattern: WL confident stand-alone statement line between thesis and the program grid.
Geometry: single centered full-width bold line on white, nothing else. `max-width:24ch;margin-inline:auto;text-align:center`. Distinct from thesis (which is left, 2-col) and from the grid below (which is 2-col cards).
Reuse: a `.section` wrapping `<p class="hta-def reveal-h statement--center">`. **[NEW CSS, ~2 lines]** `.statement--center{text-align:center;max-width:24ch;margin-inline:auto}`.

**Copy (copy deck §2 alt statement) — FINAL:** `Global standards, made usable where the decisions are made.`  (9 words)

---

## 6. PROGRAM GRID — THE CENTREPIECE (owner decision + drift #1/#3)
Reference pattern: WL program-grid — each program a BOLD abstract visual object with a tiny label and a HUGE short program name. This is the parity centrepiece (parity §D).
Geometry: 2-col on desktop, 1-col mobile (`.tilegrid`), square-ish cards (`.tile2`, aspect 5/4). Distinct from every other section (only 2-col big-canvas card row on the page).

**Each tile is a full-bleed generative CANVAS, NOT a photo.** Delete the four `<img>`. Each `.tile2.tile2--dark` gets ONE distinct motif canvas as its background:
```html
<a class="tile2 tile2--dark reveal" href="what-we-do.html">
  <canvas data-viz="MOTIF" data-dark="1" data-seed="N" aria-hidden="true"></canvas>
  <span class="tile2__grad"></span>
  <div class="tile2__c">
    <span class="tile2__label">PROGRAM 0X</span>
    <div>
      <h3 class="tile2__name">NAME</h3>
      <p class="tile2__desc">SUBLINE</p>
      <span class="tile2__more">Learn more <span class="arw">&rarr;</span></span>
    </div>
  </div>
</a>
```
`.tile2 canvas` is already sized full-bleed (dhta.css line 189). `.tile2__label` already styled (top-left, teal-bright on dark). `.tile2__c` uses `justify-content:space-between` so label sits top, name/sub/link sit bottom — the WL 3-stack composition.

**Motif + seed assignment (one distinct motif each — parity §D):**
| Tile | Motif (`data-viz`) | seed | label |
|---|---|---|---|
| 1 | `burst` | 3 | `PROGRAM 01` |
| 2 | `molecular` | 5 | `PROGRAM 02` |
| 3 | `circuit` | 9 | `PROGRAM 03` |
| 4 | `rings` | 13 | `PROGRAM 04` |

**Copy (copy deck §3) — FINAL. Names are SHORT + HUGE (`--fs-tile`, ≤3 words, ≤20 chars). Sub-line one tight sentence ≤80 chars:**
1. Name `Assess & Compare` — Sub `Independent verdicts on safety, effectiveness, and value before you invest.`
2. Name `Evidence & Modeling` — Sub `Economic models and dossiers that strengthen procurement and grants.`
3. Name `Build Capacity` — Sub `Training so local teams can run their own assessments over time.`
4. Name `Advisory` — Sub `Guidance on coverage and procurement, even where no HTA exists yet.`

Section head (`.section__head--row`): H2 `Four ways we turn evidence into decisions.` + link `All of what we do →` (href `what-we-do.html`).
Section shell: `.section.section--tint`.
Motion: `.reveal` on each tile (masked lift on scroll-in); `.tile2:hover` lift already defined. No parallax.

---

## 7. BRIDGE / NETWORK SECTION (geometry CHANGED — canvas, not photo; drift #5)
Reference pattern: WL network section — a bold statement over a node-graph visual, the "solve problems they can't solve alone" metaphor. Our metaphor: standards bridged to local realities.
Geometry: dark full-bleed, centered statement over a full-bleed generative node-graph canvas. Distinct from the CTA band (which is flat navy, no canvas) and from the grid (2-col).

Replace the `.band` + `band.jpg` block with the existing `.bridge-sec` primitive:
```html
<section class="bridge-sec section">
  <canvas data-viz="bridge" data-dark="1" data-seed="11" aria-hidden="true"></canvas>
  <div class="wrap"><div class="bridge-inner reveal">
    <h2 class="reveal-h">We build the bridge between global standards and local realities.</h2>
    <p>A European non-profit sets the standards. A local consultancy makes them work on the ground.</p>
    <a class="pill-liquid -onink" href="about.html"><span class="pl-fill" aria-hidden="true"></span>How we are built <span class="arw">&rarr;</span></a>
  </div></div>
</section>
```
`.bridge-sec` + `.bridge-inner` already styled; `makeBridge()` renders the two-cluster node graph in navy/teal (green inside artwork only). Reduced-motion handled in dhta-viz.js.

**Copy (copy deck §4) — FINAL:**
- H2 (tighter alt, one statement): `We build the bridge between global standards and local realities.`
- Support (`p`, ≤120 chars): `A European non-profit sets the standards. A local consultancy makes them work on the ground.`  (91 chars)
- CTA: `How we are built →`.

Delete: `.band` wrapper + `band.jpg`.

---

## 8. INTERACTIVE STEPPER — "how an assessment works" (owner feedback #3, parity §F, drift #4)
Reference pattern: none 1:1 in WL; this is our interaction moment. Must be a REAL interaction, not the flat `.process` grid, and not just an accordion.
Geometry: **split** — left = clickable numbered rail (4 steps), right = a sticky panel showing the active step's detail + a generative canvas that swaps motif per step. Horizontal/split composition, distinct from the 2-col card grid (#6) and the 3-col bordered cols (#9).

Replace the entire static `.process` block. Reuse the existing `.stepper/.step/.step__btn/.step__panel` vocabulary for the rail (do NOT invent a second motion system — parity §F). Add a right panel.

**Markup:**
```html
<section class="section" id="workflow">
  <div class="wrap">
    <div class="section__head reveal">
      <h2 class="h2 reveal-h">How an assessment actually works.</h2>
      <p class="lead" style="margin-top:1rem">Four steps from a question to a decision a health system can act on.</p>
    </div>
    <div class="workflow reveal" data-d="1">
      <div class="workflow__rail stepper" role="tablist">
        <!-- 4 × .step, first is aria-selected="true" -->
        <div class="step" data-step="0" aria-selected="true">
          <button class="step__btn" role="tab"><span class="step__n">01</span><span class="step__t">Evidence</span></button>
        </div>
        <!-- 02 Assessment, 03 Appraisal, 04 Recommendation -->
      </div>
      <figure class="workflow__panel">
        <div class="workflow__canvas"><canvas data-viz="molecular" data-dark="1" data-seed="21" aria-hidden="true"></canvas></div>
        <figcaption class="workflow__body" aria-live="polite"><!-- active step detail text --></figcaption>
      </figure>
    </div>
  </div>
</section>
```

**[NEW CSS, ~16 lines]:**
```css
.workflow{display:grid;grid-template-columns:.85fr 1.15fr;gap:clamp(1.5rem,4vw,3.5rem);align-items:start}
.workflow__rail .step{cursor:pointer}
.workflow__rail .step[aria-selected="true"] .step__t{color:var(--accent-deep)}
.workflow__rail .step[aria-selected="true"] .step__n{color:var(--accent)}
.workflow__rail .step[aria-selected="true"]{box-shadow:inset 3px 0 0 var(--accent)}   /* teal active marker */
.workflow__panel{margin:0;position:relative}
.workflow__canvas{position:relative;aspect-ratio:16/11;border-radius:var(--radius);overflow:hidden;background:var(--navy-900)}
.workflow__canvas canvas{position:absolute;inset:0;width:100%;height:100%}
.workflow__body{margin-top:1.1rem;color:var(--ink-2);font-family:var(--sans);max-width:52ch}
@media(max-width:860px){.workflow{grid-template-columns:1fr}}
```

**[NEW JS, ~25 lines added to dhta.js]** — extend the existing stepper handler (do not add a new library):
- Steps hold their detail text (from a JS array or `data-` attrs). Clicking a `.step` sets `aria-selected="true"` on it and `false` on siblings (single-select), updates `.workflow__body` text, and re-initialises the `.workflow__canvas` canvas with that step's motif (call the existing `initStatic`-style path by swapping `data-viz`/`data-seed` and re-dispatching, or expose a small `window.DHTAViz.redraw(canvas)` hook from dhta-viz.js).
- Keyboard: rail is focusable; Left/Right or Up/Down arrows move the active step; Enter/Space selects.
- Auto-advance: every 4.5s advance to the next step, PAUSED permanently after first user interaction, and NEVER started when `prefers-reduced-motion: reduce` (guard already read as `reduce` at top of dhta.js) — under reduced motion the stepper is fully clickable, just no auto-play.

**Step content (copy deck / current, keep) — 4 steps, motif per step:**
| # | Title | Motif | Detail |
|---|---|---|---|
| 01 | Evidence | `molecular` (seed 21) | `We gather the best available evidence on a technology, from clinical trials to real-world use.` |
| 02 | Assessment | `burst` (seed 22) | `We weigh safety, effectiveness, and value against real budgets and the alternatives.` |
| 03 | Appraisal | `rings` (seed 23) | `We read the evidence through local context, ethics, equity, and what a system can sustain.` |
| 04 | Recommendation | `circuit` (seed 24) | `We deliver a clear, structured recommendation a decision maker can defend.` |

Checkables satisfied (parity §F): ≥3 steps ✓, click + keyboard ✓, auto-advance ✓, active state class toggle (`aria-selected`) ✓, updates canvas ✓, reduced-motion guard ✓.

---

## 9. WHO WE SERVE (keep grid, REMOVE photo; drift #2/#7)
Reference pattern: compact audience breakdown, bold-type led, geometry-distinct from the program grid.
Geometry: 3-col bordered columns (`.who`, small type, teal-square bullets), heading full-width above. **Remove the `.serve-head` figure + `consult.jpg`** (the duplicated weak photo) — heading becomes a plain full-width `.section__head`. Distinct from the big-canvas tile grid (#6) by using small bordered text columns.

**Copy (copy deck §5) — FINAL:**
- H2: `HTA that meets each partner where they are.`
- Lead: `From a single hospital to a ministry of health, the work fits the decision in front of you.`
- Col 1 `Healthcare organizations` — `Hospitals, faith-based providers, and health NGOs.` — list: `Prioritise technology investments` / `Compare the alternatives` / `Strengthen grant and donor applications`.
- Col 2 `Public institutions` — `Ministries of Health, insurance funds, emerging HTA units.` — list: `Inform coverage and procurement` / `Use HTA tools where none exist yet` / `Strengthen institutional capacity`.
- Col 3 `Local health industry` — `Device and diagnostics makers, digital-health startups.` — list: `Prove value for money` / `Prepare HTA-informed dossiers` / `Align design with what payers expect`.

Reuse: `.who`, `.who__col`, `.dot`. Remove `.serve-media`/`consult.jpg`.

---

## 10. KNOWLEDGE HUB TEASER (keep)
Reference pattern: WL typed cards / ledger. Honest "coming soon" slot stays.
Geometry: horizontal ledger rows (`.ledger`), type-label + body + meta. Distinct (row ledger vs everything else).

**Copy (copy deck §6) — FINAL:**
- H2: `Frameworks and evidence, in plain language.` + link `Open the hub →`.
- Row 1 `Framework` — `HTA foundations for low-resource settings` — `A plain-language starting point, drawn from WHO and PATH standards, for assessing technologies where formal HTA is still emerging.` — meta `Curated · 6 min read`.
- Row 2 `Toolkit` — `Comparing two technologies before you buy` — `A simple structure for weighing safety, effectiveness, and cost when a hospital or ministry faces a real purchasing choice.` — meta `Curated · guide`.
- Row 3 `Success stories` (`.ledger__row--soon`) — `Our first engagements are underway` — `We publish stories here as real engagements complete. We do not post case studies we cannot stand behind.` — meta `<span class="badge-soon">Coming soon</span>`.

Reuse: `.ledger`, `.ledger__row`, `.badge-soon`. Use `&middot;` for the `·` in meta.

---

## 11. FOUNDERS + SOURCES (keep, honest slots)
Reference pattern: credibility block; honest proof only (pre-registration — no fabricated testimonials/logos/numbers).
Geometry: 2-up portrait figures with letter-placeholders (`.portraits`) + a 3-col citation strip (`.citation-strip`). Distinct from all above.

**Copy (copy deck §7) — FINAL:**
- H2: `Founded by a doctor and an engineer, joined by one goal.`
- Lead: `We met through the HTAi Interest Group on Developing Countries, convinced that global standards are only as good as their local application.`
- Marina (`.portrait__ph` "M"): `Medical doctor. Clinical grounding in what technologies actually face in the field.`
- Jani (`.portrait__ph` "J"): `Biomedical engineer. Technical assessment of devices, diagnostics, and systems.`
- Honest slot line (`.muted`, `.badge-soon`): `Coming soon` `Real founder photographs and full bios are being prepared.`
- Citation strip label `What we build on`, three items:
  - `WHO prequalification of health products, the global benchmark for safe, quality-assured medicines and devices.`
  - `WHO compendium of innovative health technologies for low-resource settings, 2024.`
  - `PATH technical standards for the settings we serve.`

Reuse: `.portraits`, `.portrait`, `.portrait__ph`, `.citation-strip`, `.badge-soon`.

---

## 12. CLOSING CTA BAND (geometry CHANGED — flat navy, no photo; drift #2/#7)
Reference pattern: WL closing CTA — bold statement + one accent button.
Geometry: **flat navy full-bleed, NO photo, NO canvas** (removes duplicated weak `serve.jpg`; stays visually distinct from the bridge section which DOES have a canvas). Centered statement + button + email. Reuse `.band` shell but drop `.band__img`/`.band__scrim` and set the section background to solid navy (the `.band` base is already `var(--navy-900)`), or reuse `.section--ink` centered. **Chosen: `.band` with the `.band__img` removed** so the existing centered `.band__inner` typography is preserved; the flat navy base shows through.

**Copy (copy deck §8) — FINAL:**
- H2 (`.reveal-h`, one `<br>`): `Bringing a technology to Sub-Saharan Africa,<br>or deciding whether to?`
- Support (`p`, ≤120 chars): `Tell us your question. We will point you to the evidence, or help you build it.`  (78 chars)
- CTA row: `.pill-liquid.-onink.-xl` → `Get in touch` (href `contact.html`) + email link `contact@develop-hta.com`.

Delete: `.band__img` + `serve.jpg` + `.band__scrim`.

---

## 13. FOOTER (keep)
Reference pattern: white-knockout logo on navy + legal row.
Geometry: 3-col foot-grid + note row. Unchanged.
Reuse: `.site-footer`, `logo-white.png`. Copy unchanged (already honest, "Registration in progress").

---

## SECTION SEQUENCE (must match this DOM order — parity §C)
Nav → Hero(constellation) → Affiliations → Thesis(full-width, no photo) → Big-statement line → **Program grid (4 canvas tiles)** → Bridge(canvas) → **Interactive stepper** → Who we serve(no photo) → Knowledge Hub → Founders+sources → CTA band(flat navy) → Footer.
Grid appears before who-we-serve/founders. Interactive stepper is its own section after the bridge.

## GEOMETRY DISTINCTNESS LEDGER (no two neighbours share a wireframe)
Hero(1-col over canvas) → Affil(inline band) → Thesis(2-col text, no img) → Statement(1 centered line) → Grid(2-col canvas cards) → Bridge(centered over canvas) → Stepper(split rail+panel) → Who(3-col bordered cols) → Ledger(rows) → Founders(2-up + strip) → CTA(flat centered band). Every adjacent pair differs in grid.

## NEW CSS SUMMARY (all additive, ~20 lines total)
1. token `--fs-tile` → `clamp(1.9rem,1rem + 3.2vw,3.75rem)`.
2. `.hero__bg canvas` added to the full-bleed child selector.
3. `.statement--center` (2 lines).
4. `.workflow*` block (~16 lines).
No new fonts, no new colours, no green on UI.

## NEW JS SUMMARY
1. dhta.js: extend the stepper handler → single-select `aria-selected`, swap `.workflow__body` text, redraw `.workflow__canvas` motif, arrow-key nav, 4.5s auto-advance paused on interaction and disabled under `prefers-reduced-motion`.
2. dhta-viz.js: expose a tiny `window.DHTAViz = { redraw:function(cv){...} }` (wrap existing `initStatic`) so the stepper can re-render a canvas after changing its `data-viz`/`data-seed`. No motif code changes.
3. index.html: add `<script src="js/dhta-viz.js"></script>` before dhta.js.

## DONE-GATE
Run `discipline-check.py` (existing) AND the new `parity-check.py` (spec below). Both must pass before a fresh-context builder≠judge pass vs the Wellcome-Leap reference.
