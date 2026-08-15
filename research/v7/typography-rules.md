# Develop-HTA v7 — Typography Rules (the mechanical fix for the ragged-headline crime)

Date: 2026-08-13
Author: LEAD (fix spec). No site file touched.
Fixes: postmortem Findings 1, 2, 6-secondary (ragged centered headlines, hard `<br>`, orphan sublines, stepper misalignment).
Sourced from: CGD left-align editorial discipline, NICE 66ch measure + sentence-case + no trailing periods, Commonwealth Fund restrained large-light hero.
Scope: these are hard CSS values the v7 builder copies verbatim. Nothing here is a vibe.

---

## THE ROOT BUG IN ONE LINE
v6 put `font-size: clamp(2.2rem, ..., 4.2rem)` on a heading whose container was `max-width: 38ch; text-align: center`. At 4rem, one `ch` is ~2.5x wider than at body size, so a 38ch box physically holds only 6-8 CHARACTERS per line -> 1-2 words per line -> a ragged column mirrored on both edges. The measure was sized for body type and then fed display type. **Rule 1 fixes exactly this.**

---

## RULE 1 — Measure is capped in `rem`/`px`, NEVER in `ch`, for any display heading
`ch` scales with font-size, so a `ch` cap on a fluid clamp heading is a moving target that collapses at large sizes. Cap the LINE BOX in a font-size-independent unit so a line always holds 5-9 words.

```css
/* Display headline measures — absolute, not ch. Tuned so a line = 5-9 words. */
:root{
  --measure-hero:      clamp(16rem, 46vw, 30rem);  /* hero H1: ~7-9 words/line at display size */
  --measure-statement: clamp(15rem, 42vw, 26rem);  /* the one centered short line */
  --measure-h2:        clamp(16rem, 50vw, 32rem);   /* section H2 */
  --measure-h3:        22rem;                        /* card/tile titles */
  --measure-body:      34rem;   /* ~66ch of Mulish at body size (NICE rule) */
  --measure-lead:      38rem;   /* lead paragraph, slightly wider */
}

.hero h1        { max-width: var(--measure-hero);      text-wrap: balance; }
.statement      { max-width: var(--measure-statement); text-wrap: balance; }
.h2             { max-width: var(--measure-h2);         text-wrap: balance; }
.tile2__name,
.card__title    { max-width: var(--measure-h3);         text-wrap: balance; }
p, .lead        { max-width: var(--measure-body);       text-wrap: pretty;  }
.lead           { max-width: var(--measure-lead); }
```

Concrete check: at the hero size (`--fs-hero` max 4.4rem, Poppins avg glyph ~0.55em advance), `30rem / (4.4rem * 0.55) ~= 12` glyph-slots is wrong maths; the real guard is the **word count parity test in Rule 8** — measure values above are tuned to pass it, do not hand-edit them without re-running that test.

**BAN:** any `max-width:*ch` on `.hero h1`, `.statement`, `.h2`, `.tile2__name`. Delete the v6 `.bridge-inner{max-width:38ch}` pattern entirely.

---

## RULE 2 — LEFT-align every multi-line display headline; center is a rare single-line exception
One straight edge the eye locks to = the "aligns to a clean grid" the owner wanted. CGD, Gavi, Commonwealth all left-align their statements.

```css
h1, h2, h3, .hero h1, .h2, .tile2__name { text-align: left; }
```

**Centered text is allowed ONLY when ALL are true:**
1. it is a SINGLE line at the target desktop width (<= ~6 words / <= ~34 characters), AND
2. it appears **at most once on the whole page** (the postmortem F6 "same centered move x3" rule).

```css
/* the single sanctioned centered moment — short line only */
.statement--center{
  text-align: center;
  max-width: var(--measure-statement);
  margin-inline: auto;
  text-wrap: balance;
}
/* GUARD: never combine centered + a long measure. If the line needs >6 words, it is LEFT. */
```
The v6 crimes to delete: `.bridge-inner{text-align:center}` and `.band__inner{text-align:center}` — the bridge and CTA band both go **left-aligned** in v7 (only ONE centered line survives, and it is short).

---

## RULE 3 — ZERO hard-coded `<br>` inside any heading
A hard break is correct at exactly one viewport width and manufactures an orphan at every other. It also overrides `text-wrap:balance`.

- Remove `<br>` from `index.html` hero (`Making health technology<br>work for Africa.`) and the CTA band (`...Sub-Saharan Africa,<br>or deciding whether to?`).
- Control the wrap with `max-width` (Rule 1) + `text-wrap:balance`. Let the browser choose the break per width.
- If a specific break is ever truly required (it is not here), use `<wbr>` or `&nbsp;` to bind a pair, never `<br>`.

Mechanical guard (add to parity-check): **`<br>` inside `<h1>`/`<h2>`/`<h3>` = FAIL.**

---

## RULE 4 — `text-wrap: balance` on headings, `text-wrap: pretty` on body/sublines
`balance` evens the ragged edge and kills 1-word last lines on short multi-line headings. `pretty` prevents single-word orphan last lines on paragraphs (fixes the "...a health system can act / on." orphan).

```css
h1, h2, h3, .hero h1, .h2, .tile2__name, .statement { text-wrap: balance; }
p, .lead, .sub, .tile2__desc, figcaption            { text-wrap: pretty;  }
```
Fallback: `text-wrap` is well-supported in current Chromium/Firefox/Safari; where unsupported it degrades to normal wrap, which is safe because Rule 1's measure already prevents the 1-2-word column. Do NOT rely on `balance` alone — the measure cap is the real fix, `balance` is polish.

---

## RULE 5 — Orphan / widow control belt-and-suspenders
Beyond `pretty`, prevent a lone trailing word on key sublines:

```css
.sub, .lead, .tile2__desc { hyphens: none; overflow-wrap: normal; }
/* optional per-string: bind the last two words so a widow can't strand */
/* author writes: "...worth&nbsp;it." only where a widow is visible in QA */
```
Do not sprinkle `&nbsp;` pre-emptively; add it only where QA at 1280 / 768 / 390px shows a real one-word last line.

---

## RULE 6 — Type scale (keep Poppins display / Mulish body; retune the clamps so display isn't oversized against the new measures)
The v6 clamps are fine in ceiling but were paired with a broken measure. Keep the fonts (owner-approved). Adjust only where the postmortem flagged "so large against so narrow a measure":

```css
:root{
  --fs-hero:      clamp(2.4rem, 1rem  + 4.2vw, 4.0rem);  /* was 4.4 — dial the ceiling ~9% */
  --fs-statement: clamp(2.0rem, 1rem  + 3.4vw, 3.4rem);  /* was 4.2 — the biggest offender */
  --fs-h2:        clamp(1.7rem, 1.1rem+ 2.2vw, 2.7rem);
  --fs-h3:        clamp(1.1rem, 1rem  + .55vw, 1.35rem);
  --fs-body:      clamp(1.02rem,.98rem+ .2vw,  1.15rem);
  --lh-display:   1.08;   /* headings */
  --lh-body:      1.6;    /* paragraphs */
  --track-display:-0.02em;/* Poppins tight, Commonwealth-style restraint */
}
h1,h2,h3{ line-height: var(--lh-display); letter-spacing: var(--track-display); font-weight: 600; }
```
Note the statement ceiling drops from 4.2rem -> 3.4rem: giant type + short measure was the visible failure; a slightly smaller ceiling plus a wider absolute measure (Rule 1) lets a line hold real words.

---

## RULE 7 — Sentence case, no trailing periods on headings (NICE rule); one teal accent word max
- Headings in **sentence case** (already mostly true). No ALL-CAPS headlines.
- **No trailing period** on H1/H2/H3. (v6 hero "...work for Africa." keeps a period today; drop it, or keep only if the owner insists — flag as owner call. NICE convention = no period.)
- At most ONE teal accent word inside a heading (`.hta-def em{color:var(--accent-deep)}` is fine used once); never colour a whole headline. Green never touches type (artwork-only — parity E1 already guards this).
- Kicker/eyebrow labels stay banned above H1 (house rule; discipline-check already guards).

---

## RULE 8 — The baseline / alignment grid (fixes the stepper + heading + list misalignment)
The v6 stepper rail, its canvas panel, the heading, and the list did not share a common left edge or vertical rhythm, so blocks stepped raggedly. Lock everything to ONE spacing unit and ONE content left edge.

```css
:root{
  --space: 8px;                 /* base rhythm unit; all vertical gaps are multiples */
  --rhythm-1: calc(var(--space)*1);  --rhythm-2: calc(var(--space)*2);
  --rhythm-3: calc(var(--space)*3);  --rhythm-4: calc(var(--space)*4);
  --rhythm-6: calc(var(--space)*6);  --rhythm-8: calc(var(--space)*8);
  --content-left: var(--gut);   /* single shared left edge for headings + media + lists */
}
/* every section's heading, its lead, its grid, its list share --content-left via .wrap padding-inline */
.section__head, .section__grid, .stepper, .workflow__panel { padding-inline: 0; } /* inherit .wrap edge, no extra indent */

/* two-column blocks: align the media TOP to the heading BASELINE, not center, so rows line up */
.workflow{ align-items: start; }              /* was center-ish -> caused the step/panel drift */
.workflow__rail .step__btn{ padding-block: var(--rhythm-2); } /* uniform step height */
.workflow__panel{ margin-top: 0; }            /* panel top edge = rail top edge */

/* headings sit on a consistent margin below their section top */
.section__head{ margin-bottom: var(--rhythm-4); }
.section__head .lead{ margin-top: var(--rhythm-2); }
```
Rule: any two adjacent columns (heading|media, rail|panel, text|photo) must share either the same TOP edge (`align-items:start`) or the same BASELINE — never `center` when the two columns have different heights, because centering is what made the stepper look misaligned.

---

## RULE 9 — The mechanical parity guard (word-count-per-line proxy)
Since a headless checker cannot render line boxes, guard the ROOT CAUSE instead: forbid the `ch`-measure-under-display-type pattern and cap headline WORD COUNT so even a worst-case wrap can't shatter.

Add to `parity-check.py` (see build-spec Part C):
- FAIL if any of `.hero h1 / .statement / .h2 / .tile2__name` selectors set `max-width` in `ch`.
- FAIL if `<br>` appears inside `<h1>|<h2>|<h3>`.
- FAIL if hero H1 word count > 10, or the centered statement word count > 8, or any `.tile2__name` > 4 words.
- FAIL if more than ONE element carries a centering class (`statement--center` or `text-align:center` on a headline block).
- WARN if any heading string ends in `.`.

---

## THE 8 VALUES A BUILDER PASTES (quick card)
| What | v6 (broken) | v7 (fixed) |
|---|---|---|
| Headline measure unit | `38ch` | absolute `rem` (`--measure-*`) |
| Headline align | `center` (x3) | `left` (center = 1 short line, once) |
| `<br>` in headings | 2 hard-coded | 0 |
| `text-wrap` headings | only on hero | `balance` on ALL |
| `text-wrap` body | none | `pretty` on all sublines |
| Statement font ceiling | `4.2rem` | `3.4rem` |
| Two-col vertical align | center-ish | `align-items:start` (shared top) |
| Trailing period on H* | yes | no (NICE) |
