# Wellcome-Leap Parity Targets — Develop-HTA v6

Reference: https://wellcomeleap.org (fetched 2026-08-12) · Teardown: `research/teardown-wellcomeleap.md`
Purpose: the concrete, numeric definition of "looks like the reference," rendered in the Develop-HTA brand
(navy #0E2C46 / #123A5E, teal #14808C UI accent, green #5CB85C artwork-only, Poppins display + Mulish body).
Every target is a checkable number so a deterministic gate can score convergence. Fonts are LOCKED — do not change them.

---

## A. TYPE SCALE & TREATMENT (measured off WL, mapped to our locked stack)

WL uses ONE heavy neo-grotesque, very bold, tight, mixed-case, large. We render the same BEHAVIOUR in Poppins 700.

- **Display family:** Poppins for every heading + program name + statement. Mulish for body/UI/labels only. No third family.
- **Display weight:** 700 (heaviest self-hosted). Never <600 on a heading. Body/labels 400 / 600 / 700.
- **Display tracking:** `-0.02em` headings, `-0.03em` on the largest (hero + program name + bridge). Never positive tracking on display.
- **Display line-height:** 1.00–1.09 on hero/program-name/statement; ≤1.12 on h2.
- **Hero H1:** desktop 64–72px (`clamp(2.4rem, .9rem + 4.6vw, 4.4rem)` OK; bump max to `4.6rem` allowed). One H1 only. Mixed case, not all-caps.
- **PROGRAM NAME (the WL signature move — must be the 2nd-biggest type on the page):**
  - desktop **48–64px** (target token `--fs-tile: clamp(1.9rem, 1rem + 3.2vw, 3.75rem)`; current max 2.75rem is TOO SMALL — raise it).
  - Must be visibly larger than any h2/section head. Rank: Hero > Program-name ≈ Bridge statement > h2 > h3 > body.
  - line-height 1.0, tracking -0.03em, weight 700, mixed case.
- **Statement one-liner:** desktop 40–64px (`--fs-statement` current max 4.2rem OK).
- **Section h2:** desktop 30–46px (`--fs-h2` current max 2.9rem OK).
- **Body:** 16–18px (`--fs-body` 1.02–1.15rem OK), line-height 1.5–1.62, max-width 46–60ch.
- **Small label / eyebrow / tile label:** 11–13px, weight 700, UPPERCASE, tracking +0.12–0.16em, Mulish. Exactly one label per zone, never a kicker stacked on the H1.

## B. PROGRAM-NAME COPY NORMS (measured verbatim from WL's 16 names)

WL names, measured: VISIBLE(7) FORM(4) CARE(4) SAVE(4) HOPE(4) Q4Bio(5) 1kD(3) In Utero(8) R3 Global(9)
Delta Tissue(12) Dynamic Resilience(18) Untangling Addiction(20) Focused Antibiotics(19) Resistance Networks(19)
The Missed Vital Sign(21, the one 4-word outlier). → distribution:

- **Words per name: median 1–2. HARD CAP 3 words** (one 4-word outlier tolerated site-wide, no more).
- **Characters per name (incl. spaces): target ≤ 14, HARD CAP 20.** ~60% of WL names are ≤ 9 chars.
- **Case:** mixed case or all-caps acronym; never sentence-with-verb, never a phrase with a preposition chain.
- **Fits on ≤ 2 lines** inside the tile at 48–64px within `max-width:14ch` (CSS already set to 14ch — keep).
- Develop-HTA rename targets (fix owner feedback #2 — current names are full sentences): e.g.
  `Assess` · `Compare` · `Dossiers` · `Modeling` · `Capacity` · `Advisory` (each ≤ 1–2 words, ≤ 10 chars).
- **Tile description: absent OR ≤ 12 words**, one line, Mulish 15px. WL shows a premise QUESTION or nothing —
  never a paragraph. No description longer than the name is tall.

## C. SECTION SEQUENCE (ordered homepage jobs — must match this spine)

1. **Nav** — logo mark + ≤5 links + one teal CTA. Transparent over hero.
2. **Hero (dark navy, full-bleed)** — one small eyebrow, big Poppins H1, ≤2-line subline, teal primary + ghost, generative NETWORK-CONSTELLATION canvas (dhta-viz.js) tied to the logo. min-height 84vh.
3. **Thesis one-liner (white)** — bold statement (our "global ARPA" analogue) + ≤2 short sentences.
4. **Big-statement line** — one confident honest line, no fabricated numbers.
5. **PROGRAM GRID (the centrepiece / WL clone)** — 4–6 tiles, generative canvas + tiny label + HUGE short name. See §D.
6. **Network / bridge section (dark navy)** — collaboration headline + generative node-graph. See §E.
7. **Interactive "how an assessment works" stepper** — real interaction, not static tiles. See §F.
8. **Who we serve** — geometry-distinct from grid (3-col bordered cols, small type). Not another big-tile row.
9. **Knowledge Hub teaser** — typed ledger/cards, honest "coming soon" badges.
10. **Founders + sources** — credibility, honest slots, no fabricated proof.
11. **CTA band (dark navy)** — bold statement + teal button + email.
12. **Footer** — white-knockout logo on navy + legal row.

Order-critical: hero → thesis → statement → **program grid** → network → interactive stepper. Grid must appear above the fold-2 / before any who-we-serve or founders content.

## D. PROGRAM-GRID TREATMENT (the parity centrepiece)

- **Columns:** 2 on desktop (WL is 2-col), 1 on mobile. Square-ish cards, aspect ~1/1 to 4/3.
- **Card = full-bleed generative canvas** (dhta-viz.js motif, one distinct motif per card: network-burst / molecular / circuit / rings / particle-field). ZERO stock photos in the grid (owner decision).
- **Composition inside each card (3 stacked elements, top-to-bottom):**
  - tiny UPPERCASE label top-left (11–13px, tracking +0.12em) — our honest analogue of WL's "$50M Program" (e.g. `PROGRAM 01`, `SERVICE`), never a fake dollar figure.
  - HUGE program name bottom-left, 48–64px, ≤14ch, ≤2 lines (§A/§B).
  - optional `Learn more →` link, 15px, weight 700, teal.
- **Colour:** vividness lives ONLY inside the canvas artwork (navy/teal/green ok there). Card chrome + text = white or navy + at most teal. No green on any text.
- **Motion:** card lifts / canvas subtly animates on hover only; masked-line reveal on scroll-in (`.reveal`). No parallax storms.
- **Count:** 4 minimum, 6 maximum. Fewer big commanding tiles > many small ones.

## E. NETWORK / BRIDGE SECTION

- Dark navy full-bleed. One bold white statement (our "researchers working together" analogue), tracking -0.03em, `--fs-statement` scale.
- Generative NODE-GRAPH canvas (nodes + links, the "bridge global standards to local realities" metaphor) in navy/teal, ≤1 highlighted teal node cluster. Green permitted inside the canvas only.
- Body copy ≤ 2 short sentences, 16–18px, colour #B9CEDD on navy.
- Exactly ONE accent in this zone (teal). No red (WL uses red here; we substitute teal to hold the one-accent law).

## F. INTERACTIVITY TARGET (owner feedback #3 — bring interaction forward)

- The "how an assessment works" **stepper must be a real interaction**, not 4 static columns.
- Requirements (checkable): ≥ 3 steps; user can advance via click/keyboard AND it auto-advances or scroll-scrubs; the active step visibly changes (state class toggles) and updates an illustrative canvas/panel; respects `prefers-reduced-motion` (no auto-play, still fully clickable).
- Placed as its own section (seq #7), geometry distinct from the program grid (horizontal timeline or pinned scrub, not a 2-col card grid).
- Reuse existing `.process` stepper primitive + dhta.js; do not build a second motion vocabulary.

## G. COLOUR DISCIPLINE

- Base: white body + navy dark zones (hero, network, CTA band, footer). No black backgrounds.
- **Exactly ONE UI accent site-wide: teal #14808C.** Count of distinct non-neutral UI/text colours ≤ 1. (Deterministic: no hex other than the navy set, white/greys, and #14808C appears on text/border/button.)
- **Green #5CB85C ONLY inside `<canvas>` artwork.** Zero green on any text, border, button, link, icon-stroke in CSS/HTML.
- Dark-zone body text: #B9CEDD / #C7D8E3 only.
- No gradients on text. No more than one accent per zone.

## H. MOTION RESTRAINT

- Hero + program grid + statements use masked-line reveal (`.reveal`/`.reveal-h`) once on scroll-in; no loop.
- Continuous animation limited to the generative canvases (low amplitude) + the interactive stepper.
- Lenis smooth scroll on (already wired). No scroll-jacking except at most one pinned moment (the stepper, optional).
- Everything pauses / simplifies under `prefers-reduced-motion`. Hover transitions 0.3–0.5s, spring easing already in tokens.

## I. COPY NORMS (owner feedback #4 — rewrite via copywriting skill, WL register)

- Register: confident, bold, science-forward, SHORT. No hedging, no filler.
- **Hero H1 ≤ 12 words.** Subline ≤ 2 lines / ≤ 24 words.
- **Statement one-liners ≤ 12 words**, declarative, may use a period-split ("…for health. At global scale.").
- **Program names per §B** (≤3 words / ≤20 chars).
- **Body paragraphs ≤ 3 sentences / ≤ 45 words.** Tile descriptions ≤ 12 words or absent.
- **NO em/en dashes anywhere.** No all-caps kicker sitting on the H1.
- **No fabricated proof** — pre-registration stage, honest "coming soon" slots, no invented numbers/logos/testimonials.

## J. DETERMINISTIC CHECK HINTS (what the v6 gate can measure)

- Program-name font-size token max ≥ 3rem AND > `--fs-h2` max (program names bigger than section heads).
- Every program-name string in index.html: word-count ≤ 3, char-count ≤ 20 (allow ONE 4-word/21-char outlier).
- Program grid = exactly 4–6 tiles, each containing a `<canvas>` / motif hook, zero `<img>` stock inside a tile.
- Zero `#5CB85C`/green tokens applied to text/border/button/link in CSS (green string only inside canvas JS).
- Distinct UI accent hex count = 1 (teal). No em/en dash characters (—, –) in index.html body copy.
- Hero H1 ≤ 12 words; each `.thesis .big` / statement ≤ 12 words; body `<p>` ≤ 45 words.
- Section order in DOM matches the §C spine (hero → thesis → statement → program grid → network → stepper → …).
- Interactive stepper: ≥3 steps + JS state toggle + reduced-motion guard present.
