# Develop-HTA v7 — Primary Teardown + Build Blueprint

Primary reference cloned: **Center for Global Development — https://www.cgdev.org**
Grafted craft layers: **Gavi** (photography hero + photo/text grid + stat band) and **Commonwealth Fund** (the ONE signature serif type moment).
Date: 2026-08-13. Read-only. Rendered in the Develop-HTA brand (navy #0E2C46 / #123A5E, ONE teal #14808C accent, Poppins display + Mulish body, real dignified African-clinician photography from `research/media-shotlist.md`).
Rule of this doc: every section names WHICH reference's mechanic it clones. No freestyle. If a pattern is missing, it is flagged, not invented.

---

## PART A — What CGD actually does (the extracted craft)

### A1. Section sequence (top to bottom, firsthand)
1. Header / nav (logo left, topic + utility nav, one accent link).
2. Hero: compact tagline "Ideas to action: independent research for global prosperity" — LEFT-aligned, transitional/serif face, moderate size (restraint over drama), NO photo in the hero itself, one mission link.
3. Featured content: 4 publication cards (image + headline + author + date), consistent landscape ratio, LEFT-aligned text.
4. Latest Work: chronological stack of mixed content types, each row carrying a content-type label (Blog Post / Case Study / Series), author, date.
5. Series promotion band (one featured multi-part series).
6. Newsletter CTA.
7. Areas of Focus: modular topic grid (~9 topic links).
8. Mission-statement repeat (short).
9. Footer (nav, logo, legal).

### A2. Type treatment — HOW it avoids ragged headlines
- Headings are consistently **LEFT-aligned / flush-left** — one straight edge the reader locks to. No centered giant stacks anywhere.
- Headline face reads as a **serif/transitional** for editorial authority; body is sans. Hierarchy is carried by **type size + whitespace**, not colour.
- Measure is a **readable body/heading column** (never a 38ch measure under 4rem type — the v6 bug). Headlines hold multiple words per line.
- Restraint: moderate heading weight/size, generous breathing room. Nothing shouts.

### A3. Grid system
- A repeating **publication-card unit**: fixed-ratio image on top, then headline, then meta row (author link + date + type label). Cards tile in a responsive 2-3 column grid; the "Latest Work" variant is a vertical stack of the same unit.
- Topic grid = simple equal cells, text links, generous gutters.
- Differentiation is by CARD DENSITY and COLUMN COUNT, not by re-skinning the same block.

### A4. Photography
- Documentary development/health context: medical professionals, lab work, vaccination, teaching — real African locations (Madagascar, Tanzania, Liberia). Dignified, in-context, never poverty-porn or globe cliché.
- ONE consistent aspect ratio per card family (~16:9 / 3:2). Photos anchor every feature card; the hero itself is text-only.

### A5. Colour discipline
- Neutral institutional base: black text on white, dark logo. Accent minimal and functional (links/CTAs only). Hierarchy from type + whitespace, not chroma. Maps directly onto navy + ONE teal.

### A6. Signature component
- The **author + date + content-type publication card** is CGD's signature. It is the credibility engine and it is exactly what Develop-HTA needs for its Knowledge Hub / Success Stories, with honest "Coming soon" cards where proof is absent.

### A7. Grafted from the two secondaries
- **Gavi (photography ceiling, firsthand):** full-bleed documentary hero (mother + child, malaria vaccination, Burkina Faso) with a **LEFT-aligned SHORT overlaid statement**; a consistent-ratio (~4:3) photo+text work grid; a horizontal **impact-stat band** (">1.2 billion children vaccinated"); navy/teal reserved strictly for interactive elements while the PHOTOGRAPHY carries the colour. This is where v7 gets its warmth that CGD's text-hero lacks.
- **Commonwealth Fund (type ceiling, measured live):** a large **light-weight serif hero, LEFT-aligned, negative tracking** (their hero: 80px / weight 100 / -2.4px; H1 48px / weight 200 / -1.44px) + a single-ratio real-photo card grid. Borrowed as the ONE signature type moment, rendered in Poppins-light (or a light serif if owner approves a serif accent — flag as an owner call).

---

## PART B — Section-by-section build blueprint (rendered in the DHTA brand)

Global type rules (fixes the v6 headline crime, sourced from CGD left-align + NICE measure + Commonwealth restraint):
- ALL display headlines **LEFT-aligned to the grid**. Center is allowed ONLY for a single short line (<= ~6 words), and used at most ONCE on the page.
- Headline measure capped at **~24-30ch at display sizes** so a line holds 5-9 words; body measure **~66ch** (NICE rule). Never a narrow measure under large type.
- `text-wrap: balance` on every headline, `text-wrap: pretty` on sublines. **ZERO hard-coded `<br>`** in any heading (v6 Finding 2).
- Sentence case, **no trailing periods** on headings (NICE). No em/en dashes anywhere (brand law).
- Display = Poppins (kept, owner-approved); body = Mulish. One functional teal accent; green only inside artwork, dialed to a whisper (postmortem secondary note).

Global geometry rule (fixes v6 Finding 6): each section below uses a DIFFERENT grid. The dark-navy signature treatment appears at most ONCE (the hero). Centered-giant type appears at most ONCE.

---

### Section 1 — Header / Nav  [clone: CGD A1]
- Logo left (circuit + cross + Africa mark). Nav: Who we are / What we do / Where we work / Knowledge Hub / About. One teal utility link or CTA ("Contact"). White bg, navy text, thin bottom hairline on scroll. No centering.

### Section 2 — HERO  [clone: Gavi hero + Commonwealth type; the ONE dark/signature moment]
- **Full-bleed dignified documentary photograph or calm lab-motion video** (media-shotlist §1 Candidate A "Automated Analysers in a Laboratory", graded desaturate + teal midtones + navy gradient overlay + vignette; OR §1 Candidate C human researchers if owner wants people). Navy gradient overlay left-to-right for text legibility.
- **LEFT-aligned SHORT overlaid statement** (<= 6 words per line, 2 lines max): e.g. "Making health technology work for Africa." rendered as a Commonwealth-style large light-weight headline, negative tracking, `text-wrap: balance`, NO `<br>`.
- One subline (<= 2 lines, Mulish, `text-wrap: pretty`) + two CTAs (primary teal, secondary ghost).
- This is the ONLY dark full-bleed section and the ONLY place photography carries the whole frame. Everything below is white-based.
- Fixes: complaint #1 (left-aligned, measured, no ragged stack), #2 (real photo hero back).

### Section 3 — Positioning / thesis strip  [clone: CGD hero-as-mission-line, LEFT]
- A short LEFT-aligned mission line on white ("We help Sub-Saharan African health systems decide which technologies are worth it, using evidence."), moderate size, generous whitespace. NOT centered, NOT giant. One teal keyword accent at most.
- Grid: single left column, ~60% width, big right-side whitespace (asymmetric) — geometrically distinct from the hero.

### Section 4 — What we do (the 4 programs)  [clone: Gavi photo+text work grid]
- **4-up responsive grid** (Gavi's consistent-ratio photo+text module), each cell: documentary photo (media-shotlist §2 TILE 1-4 — African clinicians operating equipment / analysing data / training / advisory), fixed ~3:2 ratio, then a LEFT-aligned program title (Poppins) + 1-2 line description (Mulish).
- Photography carries the colour; navy/teal only on the "Learn more" link. This is the "bring the photos back done right" section.
- Geometry: 4-column card row — distinct from Section 3's single column and Section 5's list.

### Section 5 — Knowledge Hub / Latest Work  [clone: CGD signature publication card]
- The **author + date + content-type publication-card** system. Vertical stack OR 3-col grid of cards: fixed-ratio image (or a PATH-style geometric-SVG placeholder tile where no photo exists), headline, meta row (author + date + type label: Framework / Case Study / Brief).
- **Honest "Coming soon" cards** for slots with no real content yet (postmortem: keep the honesty; never fabricate proof).
- Geometry: dense multi-column card grid — distinct again.

### Section 6 — Impact / proof band  [clone: Gavi horizontal stat band + iDSI metric-as-proof]
- Horizontal band of 3-4 **metrics-as-proof** (iDSI pattern: "22 countries" style), bold figures + labels, LEFT-aligned within the band on a subtle navy or tinted background. Where real numbers do not exist yet, state honest founding facts (e.g. "Pre-registration, 2 founders") — never invented stats.
- Geometry: single full-width horizontal row of large numerals — distinct from all card grids.

### Section 7 — How we work / method  [clone: Resolve 3-step, rendered LEFT]
- A 3-step method sequence (Assess -> Model -> Advise), numbered, **LEFT-aligned** (Resolve's structure but NOT its centering). Optional small PATH-style geometric-SVG accent per step, subordinate to type.
- Geometry: numbered horizontal sequence — distinct.

### Section 8 — Founders / Who we are  [clone: Nuffield author-credibility + honest slot]
- Real founder photos (Marina, Jani) OR a dignified professional stand-in from media-shotlist §3A with an honest dated "real photos coming soon" note — NEVER monogram letter tiles (v6 Finding 3). LEFT-aligned name + role + one-line bio each.
- Geometry: 2-up portrait + bio split — distinct.

### Section 9 — Standards we build on  [KEEP from v5/v6 — it was on-brief]
- The cited-standards / affiliations strip (iDSI, NICE, WHO frameworks as "standards we build on"). Sober logo/word row. Honest, non-fabricated.

### Section 10 — CTA + Footer  [clone: CGD footer + one teal CTA]
- Short LEFT-aligned CTA line + primary teal button. Footer: nav, logo, legal, contact. No centered giant type.

---

## PART C — The v6 failure -> v7 fix map (carry into the build spec)
| v6 failure (postmortem) | v7 fix in this blueprint |
|---|---|
| F1 Centered giant headlines shatter into 1-2-word ragged columns | ALL headlines LEFT-aligned; measure ~24-30ch at display size (5-9 words/line); center only one short line, once |
| F2 Hard-coded `<br>` manufacturing orphans | ZERO `<br>` in headings; control wrap with measure + `text-wrap: balance` |
| F3 Real photography stripped for generative canvas art | Real dignified African-clinician photography restored in hero + program grid + cards (media-shotlist); geometric SVG demoted to subordinate PATH-style accent only; real/honest founder photos, no monograms |
| F4 Cloned a science-funder (Wellcome Leap) | Cloned CGD (in-class institute) + Gavi/Commonwealth craft; zero funder aesthetic |
| F5 Freestyle drift from research | Every section above names its reference mechanic; build FROM this doc + the shortlists, section by section |
| F6 Sections differentiated by paint (same dark canvas x4) | Every section a DIFFERENT grid; dark full-bleed used ONCE (hero); centered-giant type used at most once |

## Sources
- Firsthand WebFetch 2026-08-13: cgdev.org, gavi.org, idsihealth.org.
- Commonwealth Fund type values: measured live in `research/v7/refhunt-evidence-policy.md` (403 to fetch here).
- `research/v7/postmortem.md`, `research/media-shotlist.md`, `research/v7/refhunt-*.md`.
