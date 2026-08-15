# Develop-HTA v8 — Section-by-Section BUILD SPEC

Date: 2026-08-13 · Author: LEAD (spec only, no build). Completes the owner-approved v8 draft
(`site/v8.html` + `site/css/v8.css`) into the full site by cloning the CRAFT of Function Health.

**Read order for the builder:** this spec → `teardown-functionhealth.md` (FH tokens/effects) →
`typography-rules.md` (measure/align law) → `photo-plan.md` (verified photo IDs). Extend the v8
files; create `site/js/v8.js`. Do NOT touch `index.html` or interior pages.

---

## GLOBAL RULES (apply to every section — non-negotiable)

- **Ground:** warm cream `--cream:#FEF9EF` edge to edge; alternate rest sections to `--paper`/`--cream-2`. Cohesion by ONE warm ground, never white.
- **Type:** serif display (Fraunces 300) LEFT-aligned, `line-height` tight, `letter-spacing:-.015em`, `text-wrap:balance`. Body Mulish, `text-wrap:pretty`. Mono (`Fragment Mono`) for labels/step-numbers/stat only.
- **Measure law (typography-rules R1):** display headings get `max-width` in **rem**, NEVER `ch`. **BUG TO FIX in the v8 draft:** `.statement{max-width:22ch}` and `.head-row h2{max-width:16ch}` must become the rem tokens `--measure-h2:30rem` (or `--measure-statement`). Body/lead already use rem — keep.
- **Zero `<br>` in any heading.** Zero em/en dashes anywhere in copy. Sentence case, no trailing period on H1/H2/H3.
- **NO multi-column prose** (owner note 2): one comfortable single measure per text block. Photo+text splits and full-width statements are allowed; two side-by-side paragraph columns are NOT.
- **CTA law (owner note 1):** every section that fits a CTA gets a real navy pill button `.cta` (dark navy on cream), NOT a bare text link. `.link-u` may appear as a SECONDARY action beside a pill, never as the only CTA.
- **One teal accent** (`--teal-deep`), used on a single em word, links, step-numbers, checks. Green artwork-only. Skin tones never heavy-tinted.
- **Photos:** only the verified Pexels IDs from `photo-plan.md`, faces + eyes visible; honest "coming soon" for founders/proof; no fabricated numbers.
- **Interaction:** reuse ONE motion vocabulary — `.rv`/`.rv.in` reveals (already in v8), Lenis smooth scroll, IO toggles. Add GSAP ScrollTrigger ONLY for the pinned centrepiece (§3). All motion is deferred to the motion agent; this spec only NAMES each interaction.

**Section geometry must differ from its neighbours (geometry, not paint):** hero split → full-bleed statement → pinned horizontal stepper → 3-photo card grid → two-panel comparison → edge-to-edge marquee → portrait+bio split → single-measure accordion → full-bleed band. No two adjacent sections share a grid.

---

## §1 HERO  (KEEP + deepen the existing v8 hero)
- **FH pattern:** FH "Check your health." hero — light-serif headline left, real media right, parallax + slow scale, sticky transparent→solid header.
- **Copy slots (by name):** `hero.h1` (existing "Making health technology *work* for Africa."), `hero.sub` (one 2-line subline), `hero.cta_primary` label, `hero.cta_secondary` label.
- **Photo:** `assets/img/v8-hero.jpg` (in place). Optional upgrade to graded lab video `hero.mp4` + `hero-poster.jpg` per photo-plan §1 (machinery hero, LCP < 1.5MB) — motion agent's call.
- **Tokens/classes:** `.hero` split grid `1.02fr .98fr`; `h1` `clamp(2.7rem…5.4rem)` `max-width:var(--measure-hero)`; `.sub` `--ink-2`; `.hero__media img` `height:112%` for parallax headroom; `::after` cream+navy scrim.
- **Geometry:** asymmetric two-column split (text left, full-height photo right). Unique on page.
- **CTA:** primary pill `.cta` "See what we do"; secondary `.link-u` "Get in touch" beside it. (Already correct.)
- **Interaction:** `hero-parallax` (translateY on `[data-parallax]`) + `.rv` staggered reveal of h1/sub/cta + `header-stuck` toggle. All present in v8 — keep.

## §2 MISSION  (KEEP shell, FIX the columns)
- **FH pattern:** FH single deep statement + one tight supporting line; scroll reveal.
- **Copy slots:** `mission.statement` (one serif line, one teal em word — existing "An *evidence engine* for health decisions across Africa."), `mission.body` (ONE single-measure paragraph, ~2 sentences), `mission.cta` label.
- **Photo:** `assets/img/v8-mission.jpg` (4:5 portrait, in place).
- **Tokens/classes:** `.statement` `clamp(1.9rem…3.5rem)` weight 300, `max-width:var(--measure-statement)` (**fix from `22ch`**); `.mission__media` `aspect-ratio:4/5` radius 18px.
- **Geometry:** full-width serif statement on top, then ONE text measure beside the portrait photo (photo+text split — allowed). **FIX:** the current left column stacks two `<p>` as a prose column — collapse to a SINGLE paragraph measure (owner note 2), photo on the right.
- **CTA:** ADD a navy pill `.cta` "Read our approach" (or to `#work`) under the paragraph — the section currently has no button (owner note 1 gap).
- **Interaction:** `reveal-rise` on statement, then delayed reveal on body+photo (`.rv` `data-d`). Optional subtle photo `parallax` on scroll.

## §3 HOW AN ASSESSMENT WORKS  (NEW — the interactive centrepiece)
- **FH pattern:** FH `tracked` section — a PINNED / scroll-scrubbed feature whose steps advance as you scroll. This is the one place we clone FH's signature scroll-tracking.
- **Copy slots:** `assess.h2` (section title), and 4 step blocks each `stepN.label` (mono 01–04) + `stepN.title` + `stepN.body` (one measure each): **Evidence → Assessment → Appraisal → Recommendation**. `assess.cta` label.
- **Photo:** none required (diagram/type-led). Optional single supporting image `assets/img/v8-hero-b.jpg` inside the pinned panel; keep it subordinate.
- **Tokens/classes:** mono `--tagline` for step numbers (`Fragment Mono`, `--teal-deep`); step titles `--h3`/`--h4`; body `--measure-body`. Pin container full-viewport; progress rail uses `--teal` fill.
- **Geometry:** a PINNED panel with a horizontal 4-step track + progress indicator — deliberately unlike the vertical stacks around it. One step in focus at a time (dim the rest). No prose columns; each step is one measure.
- **CTA:** navy pill `.cta` "Bring us a question" → `#contact` at the end of the pinned sequence.
- **Interaction:** `scroll-tracked-steps` (GSAP ScrollTrigger pin + scrub advancing 01→04, progress rail fills; reduced-motion → static stacked list). This is the only section needing ScrollTrigger. Detail deferred to the motion agent; see `scroll-motion-effects` skill (pinned "chapters").

## §4 WHAT WE DO  (KEEP — 3 photo cards)
- **FH pattern:** FH card grid with hover scale + mono numbers ("The new standard" / program grid).
- **Copy slots:** `work.h2` ("How we turn evidence into decisions."), 3 cards each `cardN.n` (mono 01–03) + `cardN.title` + `cardN.body`: Assess & compare / Evidence & modeling / Advisory & capacity. `work.cta` label.
- **Photos (photo-plan §2):** card01 `6234992`, card02 `5452298`, card03 `30313899` (download to `assets/img/`, crop `w=1200&h=800&fit=crop`, ~4:5). Draft currently reuses `v8-hero-b/tile2/v8-advisory` — swap to the verified program IDs for a coherent set.
- **Tokens/classes:** `.work` `grid-template-columns:repeat(3,1fr)`; `.wcard__img` `aspect-ratio:4/5` radius 16; `.wcard__n` mono `--teal-deep`; `.wcard h3` `1.6rem` weight 400.
- **Geometry:** even 3-up card grid — distinct from the pinned §3 and the split §2. Card bodies are single short measures, not columns.
- **CTA:** section already has a `.link-u` — **UPGRADE to a navy pill `.cta`** "Talk to us about your question" in the `.head-row` (owner note 1).
- **Interaction:** `card-hover-scale` (`transform:scale(1.05)` on img) + staggered `.rv` reveal per card.

## §5 WHY IT MATTERS  (NEW — honest comparison, NO fabricated number)
- **FH pattern:** FH "Not your average checkup" two-column comparison table (with vs without), revealed on scroll. **Count-up stat is used ONLY if a real sourceable figure exists — none is verified, so default to the comparison reveal, no number.**
- **Copy slots:** `why.h2`, two panels: `why.without.title` + list (guesswork/ad-hoc procurement) and `why.with.title` + list (HTA-led evidence). `why.cta` label. If a sourced stat is later supplied with a citation, swap one panel for a `count-up` stat — not before.
- **Photo:** none (type + tint panels), per photo-plan (impact band is clean, no image).
- **Tokens/classes:** panels on `--cream-2`/`--paper` tint; `--teal-deep` checks on the "with HTA" side; titles `--h4`; rows `--text-md`.
- **Geometry:** two contrasting panels side by side (comparison), a grid seen nowhere else on the page. Each panel is a titled LIST, not a prose column.
- **CTA:** navy pill `.cta` "See how it works" → `#assess` (§3) or "Get in touch".
- **Interaction:** `comparison-reveal` (the two panels slide/fade in on IO; the "with HTA" side settles second for emphasis). Reduced-motion → both static.

## §6 STANDARDS WE BUILD ON  (NEW — honest marquee)
- **FH pattern:** FH logo carousel / infinite marquee.
- **Copy slots:** `standards.h2` (short) + `standards.items[]` as WORDMARKS/labels (honest references, not partnership claims): WHO Prequalification, WHO Compendium 2024, PATH, HTAi, iDSI. Optional one-line `standards.note` clarifying "standards we reference".
- **Photo:** none — text/wordmark row (photo-plan: clean).
- **Tokens/classes:** mono/`--body` labels on `--cream`; `--line` dividers between items; `--tagline` size.
- **Geometry:** a single edge-to-edge horizontal band — the only full-width scrolling row on the page.
- **CTA:** none (trust furniture). No forced button here.
- **Interaction:** `logo-marquee` (infinite `translateX`, pauses on hover; reduced-motion → static wrapped row).

## §7 FOUNDERS / WHO WE ARE  (NEW — honest, real photo, no monograms)
- **FH pattern:** FH medical-board / "built with top doctors" portrait-led trust block, simplified to founders.
- **Copy slots:** `founders.h2`, `founders.intro` (one measure), `founders.marina` name+role, `founders.jani` name+role, and the honest line `founders.comingsoon` ("Real founder photographs and full bios are being prepared."). `founders.cta` label.
- **Photo (photo-plan §3):** dignified stand-in `4989148` (primary) and/or `6097758`, ~4:5, with the coming-soon note. **NEVER monogram letter tiles.** If owner prefers no stand-in face, use a clean bordered card with the note.
- **Tokens/classes:** portrait `aspect-ratio:4/5` radius 18; name `--h5`/`--h4` serif; role mono/`--ink-2`; `--measure-body` intro.
- **Geometry:** portrait + bio split (photo left, single-measure text right) — echoes §2's split but reversed side, and distinct from grids. No prose columns.
- **CTA:** navy pill `.cta` "Get in touch" → `#contact`.
- **Interaction:** `reveal-rise` on portrait + text (`.rv` `data-d` stagger). Optional soft portrait parallax.

## §8 FAQ  (NEW — accordion)
- **FH pattern:** FH FAQ accordion (`grid-template-rows:0fr→1fr`).
- **Copy slots:** `faq.h2` + 3–5 Q/A pairs: `faq.q_whatishta`, `faq.q_whoiwehelp`, `faq.q_howtostart`, (opt) `faq.q_cost`, `faq.q_independence`. Each answer is one measure. `faq.cta` label.
- **Photo:** none.
- **Tokens/classes:** question `--text-xl`/`--h5`; answer `--text-md` `--ink-2` `--measure-body`; `--line` row dividers; `--teal-deep` on the open/plus indicator.
- **Geometry:** single-column stacked accordion at one comfortable measure — the calmest, narrowest block on the page.
- **CTA:** navy pill `.cta` "Ask us anything" → `#contact` below the list.
- **Interaction:** `accordion-expand` (rows `0fr→1fr` transition, one open at a time, rotating indicator; keyboard-accessible). Reduced-motion → instant toggle.

## §9 CLOSING CTA BAND  (KEEP)
- **FH pattern:** FH closing "Life is short?" full-bleed CTA — serif headline left over photo, clear button, contact.
- **Copy slots:** `band.h2` (existing "Bringing a technology to Sub-Saharan Africa, or deciding whether to?"), `band.body` (one line), `band.cta` label, `band.email` (contact@develop-hta.com).
- **Photo:** `assets/img/serve.jpg` full-bleed (in place); optional swap to wide `3825434` per photo-plan §5 (use at most once, not adjacent to hero — this is the page's second and final dark photographic moment).
- **Tokens/classes:** `.band` navy base, photo `object-fit:cover`, `::after` navy left-gradient; `.band h2` cream `clamp(2.1rem…3.8rem)` `max-width` in rem (**not `20ch`**); `.band .cta` cream pill on navy.
- **Geometry:** full-bleed dark band, headline LEFT — the inverse of the cream sections, closes the page.
- **CTA:** cream pill `.cta` "Get in touch" (mailto) + `.mail` email link beside it. (Already correct.)
- **Interaction:** `reveal-rise` on h2/body/row (`.rv`) + optional slow `band-parallax` on the background photo.

---

## BUILD ORDER & NOTES
1. First land the typography fixes (swap all `ch` measures → rem tokens; add `--measure-statement`) so every section inherits correct measures.
2. Keep §1/§2/§4/§9 shells from the v8 draft; ADD §3/§5/§6/§7/§8; UPGRADE the §2 and §4 CTAs to navy pills; FIX §2 prose to a single measure.
3. Put all JS in `site/js/v8.js` (Lenis + IO reveals + header-stuck + parallax already inline in v8 — move them there; add GSAP ScrollTrigger only for §3, marquee for §6, accordion for §8).
4. Copy stays with the copy agent (referenced by slot name). Motion detail stays with the motion agent (each interaction is NAMED, not coded here).
5. Section count = 9 blocks but only 7 DEEP content beats (hero, mission, assess-centrepiece, what-we-do, why-it-matters, founders, faq) plus the marquee strip and closing band. Merge §5 into §3's tail if §5 reads thin.
