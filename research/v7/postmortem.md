# Develop-HTA v6 Post-Mortem — why the owner said "that's terrible"

Date: 2026-08-12
Author: independent reviewer (did NOT build v5/v6)
Inputs read: 4 owner screenshots, `site/index.html`, `site/css/dhta.css`, `research/reference-candidates.md`, `research/domain-hta-ngo.md`
Judged against: Master Brain — Reference-Clone Elite Site, Benchmark Selection, "differentiate by geometry not paint", accent discipline, no-dashes.

## One-line verdict
v6 cloned the CRAFT of the wrong reference (Wellcome Leap, a science-funder the benchmark research had explicitly told us to SKIP), then rendered its signature move — giant CENTERED grotesque statements — at a font size so large against so narrow a measure that headlines shatter into ragged 1-2-word columns full of orphans, and replaced all real photography with repeating dark generative canvas art. Three separate Master Brain rules were broken at once: wrong benchmark, freestyle drift, and paint-not-geometry differentiation.

---

## FINDING 1 — Centered giant headlines wrap into ragged 1-2-word columns (the headline crime)
**Symptom (screenshot 23.52.23, the bridge section):** "We build the bridge between global standards and local realities." renders as SEVEN stacked lines — "We build the / bridge / between / global / standards / and local / realities." — each line 1-2 words, both edges ragged, no grid anchor. This is the single worst offender and exactly the owner's complaint ("big centered headlines wrap into narrow ragged columns with orphan words").

**Root cause (CSS):**
- `.bridge-inner{max-width:38ch;text-align:center;margin-inline:auto}` (dhta.css line 212) sets a 38ch measure, but the heading is `font-size:var(--fs-statement)` = `clamp(2.2rem,1rem + 4vw,4.2rem)` (line 30, line 213). At ~4.2rem a "ch" is very wide, so 38ch physically holds only ~6-8 characters per line, i.e. one or two words. The measure was chosen as if for body type, not for 4rem display type.
- `text-align:center` means every ragged wrap is mirrored on BOTH sides, so the eye has no straight edge to lock to — the "not aligning to a clean grid" complaint.
- No `text-wrap:balance`/`pretty` on this heading (it is set only on `.hero h1`, line 161), so nothing rebalances the orphans.

**Corrective principle:** For multi-line display headlines, LEFT-align to the grid (one straight edge the reader locks to) and size the measure in ch AGAINST the actual font size so a line holds 5-9 words, not 1-2. Reserve `text-align:center` for genuinely SHORT single-line statements only. Add `text-wrap:balance` to every display heading to kill orphans. This is standard Reference-Clone craft; the real in-niche references (iDSI, CGD, GiveWell) left-align their statements.

---

## FINDING 2 — Forced `<br>` in headings fights responsive wrapping and manufactures orphans
**Symptom (screenshot 17.29.37 hero; 23.52.45 CTA band):** The hero "Making health technology work for Africa." breaks awkwardly, and the CTA "Bringing a technology to Sub-Saharan Africa, or deciding whether to?" breaks at a hard-coded point that is not where the column naturally wants to wrap, producing uneven line lengths.

**Root cause (HTML):** Hard `<br>` tags are baked into the markup — `index.html` line 46 (`Making health technology<br>work for Africa.`) and line 294 (`...Sub-Saharan Africa,<br>or deciding whether to?`). A hard break is a fixed decision that is only correct at one viewport width; at every other width it collides with the natural wrap and creates a short orphan line. It also overrides `text-wrap:balance`.

**Corrective principle:** Never hard-code `<br>` in fluid headings. Control wrap with measure (`max-width` in ch) + `text-wrap:balance`, and let the browser choose break points per width. If a specific break is truly wanted, use a non-breaking hint, not a forced break — but for these it should just be measure + balance.

---

## FINDING 3 — All real photography was stripped out and replaced with repeating generative canvas art
**Symptom (all four screenshots):** The hero background is a generative "constellation" of dots and lines (17.29.37); the program tiles, the bridge, and the stepper panel (23.52.32, the green/teal "circuit" rectangle) are all `<canvas>` line-art; the founders are letter tiles "M" / "J", not faces. There is not one photograph of a person, clinic, or device anywhere. This is complaint #2 verbatim ("bring back the stock photos... real dignified photography").

**Root cause (HTML + CSS):** Every media slot is a `<canvas data-viz="...">` — hero line 39, program tiles lines 93/105/117/129, bridge line 146, stepper lines 165-179. The CSS still CONTAINS real-image slots that were abandoned: `.thesis-media img`, `.serve-media img`, `.band__img img`, `.tile2 img`, `.zig__media img` (lines 175, 181, 189, 255, 356) — the photo system exists but the HTML feeds canvas into all of them. Founder portraits are gradient letter placeholders `.portrait__ph` (line 118 / HTML lines 270, 274). v6 substituted a "clever" generative visual for the honest, human, dignified imagery the niche demands.

**Corrective principle:** Restore real, dignified, in-niche photography (documentary clinical / professional-in-context, per `domain-hta-ngo.md` §6 — NO poverty-porn, NO globe cliché) into the media slots that already exist. Generative/geometric marks are allowed only as a SUBORDINATE accent (PATH-style SVG rhythm), never as the primary hero and never as the substitute for people. Founder slots get real photos, or an honest dated "coming soon" — not decorative monograms passed off as design.

---

## FINDING 4 — Wrong reference cloned: a science-FUNDER, not a health-policy institute (benchmark violation)
**Symptom:** The whole aesthetic — dark full-bleed hero, oversized centered grotesque statements, a 2x2 grid of abstract "PROGRAM 01-04" tiles over generative art, a dark "network/bridge" section — is Wellcome Leap's brand language for funding moonshot science programs. It reads as a well-funded research-funder, not as a sober 2-person HTA / health-policy institute.

**Root cause (documented, not inferred):** `dhta.css` lines 2-4 state it outright: "Reference cloned: Wellcome Leap (wellcomeleap.org)... program-tile grid of abstract visuals". But `research/reference-candidates.md` had already ranked the in-class siblings — **iDSI #1, GiveWell #2, Our World in Data #3, CGD**, with PATH's geometric-SVG rhythm as the photo-free supporting pattern — and line 22 explicitly flagged Wellcome as "advantage-heavy giant... out-of-class anyway; noted only as aspirational paint to skip." v6 cloned the one reference the benchmark research told it to SKIP.

**Corrective principle:** Benchmark Selection = clone the truest in-class sibling by NICHE and CRAFT. Re-anchor v7 to iDSI (IA + sober navy register + metric-as-proof), GiveWell (photo-lean credibility for our pre-asset stage), OWID/CGD (knowledge-hub geometry + trust furniture), with PATH's geometric-SVG rhythm as the only "abstract art" and only in a subordinate role. A funder's statement-hero aesthetic is the wrong genre for an evidence institute.

---

## FINDING 5 — Freestyle drift from the documented plan (the process failure behind Findings 1-4)
**Symptom:** The individual craft moves (huge centered type, canvas art everywhere, program-tile abstraction) were invented at build time to match Wellcome Leap, overriding the written benchmark and domain research that already existed in `research/`.

**Root cause:** The build did not build FROM the project's own research outputs. `reference-candidates.md` (the Benchmark Selection deliverable) and `domain-hta-ngo.md` (which explicitly says the credible model is "think-tank / policy-institute... achievable with NO field photography," and warns against decorative abstraction and globe/cliché imagery) were both on disk and both contradicted what v6 shipped. This is the "never freestyle craft / build from the named reference" rule failing at the point of execution, not for lack of research.

**Corrective principle:** v7 must be built as an explicit clone of the named in-niche references, section by section, with the research docs open — not a fresh interpretation. The spec should name, per section, WHICH reference's mechanic it clones. If a pattern is genuinely missing from the references, teardown → research note → extend, never freestyle.

---

## FINDING 6 — Sections differentiated by PAINT (same dark-canvas motif), not by GEOMETRY
**Symptom (screenshots 23.52.23 bridge + 23.52.32 stepper + the hero):** Four sections — hero, the 2x2 program grid, the bridge, and the stepper panel — all share the identical visual texture: navy background + teal/green generative line-art. In a wireframe/greyscale test they read as the same block re-skinned. On top of that, THREE sections repeat the same "giant centered statement" move (the big-statement line at index.html line 80, the bridge line 149, the CTA band line 294).

**Root cause (CSS):** `.hero`, `.tile2--dark`, `.bridge-sec`, and `.workflow__canvas` all resolve to `background:var(--navy-900)` + a `<canvas>` overlay (lines 151, 187/193, 208, 247). The distinction between them is color/texture (paint), not grid. And `.statement--center` (line 379) + `.bridge-inner` (centered, line 212) + `.band__inner` (centered, line 258) apply the same centered-giant-type geometry three times.

**Corrective principle:** Differentiate sections by changing the GRID — a bento, a numbered sequence, a two-column editorial split, a ledger of rows, a full-bleed photo band — so each section is structurally distinct. Cap the dark-navy "signature" treatment to ONE moment (one hero OR one bridge, not four). Use centered giant type at most once. This is the "differentiate by geometry not paint" rule.

---

## Secondary notes (lower priority, fold into the v7 spec)
- **Orphan sublines:** "...a health system can act / on." (screenshot 23.52.32) and the centered sub in 23.52.23 also orphan — apply `text-wrap:pretty` + sane measure to sub-paragraphs too.
- **Accent discipline is borderline, not broken:** green does appear only inside artwork (allowed), but it is so prominent in the stepper/program canvas that it reads as a second decorative accent rather than an artwork-only whisper. Dial green back so navy + ONE teal remains the read.
- **The honest "coming soon" slots and cited-standards strip are GOOD** — keep the ledger's "Coming soon" row, the founders' honest note, and the "Standards we build on" affiliations. That honesty is on-brief; it is the craft around it that failed.

---

## The six corrective principles for v7 (carry into the spec)
1. LEFT-align multi-line display headlines to the grid; center only short single-line statements; add `text-wrap:balance` everywhere.
2. Size the measure (ch) against the font size so headlines hold 5-9 words/line; delete every hard-coded `<br>` in headings.
3. Restore real dignified in-niche photography into the existing image slots; demote generative/geometric marks to subordinate accent only; real founder photos or honest coming-soon, not monograms.
4. Re-anchor the clone to the in-niche references (iDSI + GiveWell + OWID/CGD, PATH geometric rhythm); drop Wellcome Leap entirely.
5. Build FROM the existing research docs section by section, naming which reference each section clones — no freestyle.
6. Make every section geometrically distinct (change the grid); cap the dark-navy generative treatment and centered-giant-type to ONE moment each.
