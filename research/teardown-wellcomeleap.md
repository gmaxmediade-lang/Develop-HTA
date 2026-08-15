# Site Teardown → Build Breakdown: Wellcome Leap (the reference to clone)

URL: https://wellcomeleap.org · analyzed 2026-08-11 · platform: WordPress (custom theme)
Purpose: clone the CRAFT/LANGUAGE and render it in the Develop-HTA brand (navy/teal/green, logo = circuit + medical cross + network + Africa). No stock photos. Owner (Max) picked this reference.

## The language in one paragraph
Confident, bold, science-forward. A **dark full-bleed hero** with a small eyebrow, a **big bold grotesque headline**, one accent button, and an **abstract science visual**. Then a **thesis one-liner** ("A breakthrough engine for health. At global scale.") + a **big-number statement** ("In 6 years, executing 16 programs in 30 countries."). The centrepiece is a **grid of program tiles**, each a **bold abstract visual** (network bursts, molecular renders, 3D forms) with a small `$50M PROGRAM` label and a **huge program name** in mixed case. Then a **network section** ("Researchers working together to solve problems they can't solve alone.") with a **node-graph visual** and a red accent. Color comes from the tile VISUALS; the UI chrome stays black/white + one accent.

## Design system (observed)
- **Type:** one heavy neo-grotesque across all headings (very bold, tight, mixed case, large). Body = clean neutral sans, small.
  - CLONE with: **Archivo** (OFL, self-hosted) at 800/900 for display + 600/700 for subheads; **Source Sans 3** for body (already self-hosted).
- **Color:** white base, near-black hero, ONE accent per zone (teal button / red network+CTA). Vividness lives only inside the tile artwork.
  - ADAPT: navy `#0E2C46`/`#123A5E` hero (not black), white body, **teal `#14808C` the single UI accent**, **green `#5CB85C` only inside generative artwork**. Restrain the rainbow so it reads serious for ministries, not startup.
- **Layout:** full-bleed dark hero, generous white sections, a 2-col tile grid of square-ish cards, big type doing the work.
- **Motion:** hero carousel + subtle; near-zero elsewhere. Keep restrained.

## The key adaptation (this is what makes it ours and photo-free)
Wellcome Leap's tiles use expensive commissioned science renders. We **generate the abstract visuals in CANVAS**, in brand palette, so each tile / the hero has a bespoke, on-brand, zero-photo visual that echoes the LOGO (circuit + network + medical cross + Africa):
- **Hero visual:** a generative NETWORK CONSTELLATION (nodes + links) in navy/teal on the dark hero, with a few highlighted nodes, a medical-cross node, and a hint of the continent. Directly ties the hero to the mark (Max: "the hero must relate to their logo").
- **Tile visuals:** a small library of generative motifs, one per card, each distinct: network burst, molecular cluster, circuit trace, concentric rings/ripple, gradient mesh, particle field. Navy/teal/green. This is the WL "each program is a bold visual object" move, done in code.
- **Network section:** a node-graph ("standards bridged to local realities") in brand colors, echoing WL's researcher-network graphic and the mission metaphor.

## Section-by-section build plan (Develop-HTA, in WL language)
1. **Hero (dark navy, full-bleed):** small eyebrow, big Archivo headline ("Making Health Technology Assessment work for Sub-Saharan Africa." set BIG and bold), one-line subline, teal primary button + ghost, and the generative network-constellation canvas on the right/behind. Logo mark present. This replaces the weak old hero and ties to the logo.
2. **Thesis one-liner (white):** "An evidence engine for African health." style bold statement + short paragraph. WL's "global ARPA for health" move.
3. **Big-statement line:** a confident bold line (honest, no fabricated numbers) e.g. "Global standards, made usable where decisions are actually made."
4. **What we do = TILE GRID (WL program-grid clone):** 3 to 6 tiles, each a generative brand visual + small label + big-type name (Assess and compare / Dossiers and modeling / Capacity building / Advisory). Each tile links deeper.
5. **The network section:** "Bridging global standards with local realities." + generative node-graph + short copy. The bridge metaphor rendered as WL's network graphic.
6. **Who we serve:** compact, still bold-type led (keep geometry-distinct from the tile grid).
7. **Knowledge Hub teaser:** typed cards / ledger, honest "coming soon".
8. **Founders + sources:** credibility, honest slots.
9. **CTA band (dark navy):** bold statement + teal button + email.
10. **Footer:** WHITE-KNOCKOUT LOGO (logo-white.png) on navy, legal row (fixes Max's footer note).

## Rules carried over (locked)
No dashes. Teal is the only UI accent, green only inside artwork. NO fabricated proof (honest "coming soon"). Subheadings/eyebrows: NONE of the old kicker spam; the bold headline leads. Use the REAL logo (logo-transparent.png on light, logo-white.png on navy), never redrawn. Generative visuals via Canvas, not hand-authored SVG paths, and paused under prefers-reduced-motion.

## What we deliberately DON'T copy (advantage-dependent / wrong register)
WL's commissioned science renders, its rainbow saturation, its $-figure program labels, real conference photography. We substitute generative brand art + honest copy.
