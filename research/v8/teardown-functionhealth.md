# Teardown: Function Health (functionhealth.com) — the reference to clone (Max's favorite)

Analyzed 2026-08-13 from the LIVE rendered page + fetched `_astro` CSS. Platform: **Astro** (component CSS bundles, static HTML + light JS islands — very cloneable, no heavy React/Next runtime). Reference role: PRIMARY (craft + feel). Secondary refs: charitywater.org (warm photo-led nonprofit), institute.global (serious editorial). Render in the Develop-HTA brand.

## The language in one paragraph
Everything sits on ONE warm cream (`#FEF9EF`, "bg-beige"), edge to edge — cohesion by a single warm ground, not white. Big **light-weight serif** display headlines (Financier Display, weight ~300), LEFT-aligned, tight leading. Sans body (FT Base). A **mono** for small labels/numbers (Fragment Mono). Generous fluid vertical rhythm (`section-space`). Real photography + video everywhere. Interactivity is constant but tasteful: a scroll-TRACKED (pinned/scrubbed) feature section, count-up stat numbers, a comparison table, an FAQ accordion, testimonial video cards, a logo carousel/marquee, sticky transparent→solid header, hover scale on cards.

## Type substitutions (free, self-hostable, already downloaded)
- Serif display: **Financier Display → Fraunces** (300/400/500) — elegant, warm, light.
- Sans body/UI: **FT Base → Mulish** (400/500/700).
- Mono labels/numbers: **Fragment Mono → Fragment Mono** (OFL, free) or JetBrains Mono.

## Design tokens (EXACT, from utilities CSS — use these verbatim)
```css
:root{
  --font-serif:'Fraunces',Georgia,serif;
  --font-sans:'Mulish',system-ui,sans-serif;
  --font-mono:'Fragment Mono',ui-monospace,monospace;
  /* fluid type scale */
  --heading-xl:clamp(3.375rem,4.3233vw + 2.359rem,6.25rem);
  --h1:clamp(3.5625rem,2.1617vw + 3.0545rem,5rem);
  --h2:clamp(3rem,1.5038vw + 2.6466rem,4rem);
  --h3:clamp(2.125rem,1.0338vw + 1.882rem,2.8125rem);
  --h4:clamp(1.6875rem,.6579vw + 1.5329rem,2.125rem);
  --h5:clamp(1.375rem,.188vw + 1.3308rem,1.5rem);
  --text-xxl:clamp(1.8125rem,.4699vw + 1.7021rem,2.125rem);
  --text-xl:clamp(1.125rem,.5639vw + .9925rem,1.5rem);
  --text-lg:clamp(1.125rem,.188vw + 1.0808rem,1.25rem);
  --text-md:clamp(1rem,.188vw + .9558rem,1.125rem);
  --tagline:clamp(.75rem,.3759vw + .6617rem,1rem);   /* mono uppercase labels */
  --stat:clamp(3rem,1.5038vw + 2.6466rem,4rem);       /* big count-up numbers */
  --pull-quote:clamp(1.6875rem,1.2218vw + 1.4004rem,2.5rem);
  /* fluid spacing scale */
  --s1:.25rem;--s2:.5rem;--s3:.75rem;--s4:clamp(.75rem,.3759vw + .6617rem,1rem);
  --s5:clamp(1rem,.3759vw + .9117rem,1.25rem);--s6:clamp(1.25rem,.3759vw + 1.1617rem,1.5rem);
  --s7:clamp(1.5rem,.7519vw + 1.3233rem,2rem);--s8:clamp(2rem,.7519vw + 1.8233rem,2.5rem);
  --s9:clamp(2.5rem,1.5038vw + 2.1466rem,3.5rem);--s10:clamp(3rem,1.5038vw + 2.6466rem,4rem);
  --s11:clamp(3.5rem,2.2556vw + 2.9699rem,5rem);
  /* layout */
  --main:90rem;                                        /* max content width */
  --site-margin:clamp(1.25rem,4.1353vw + .2782rem,4rem);
  /* colour — warm ground + brand */
  --cream:#FEF9EF; --cream-2:#F5EEE1; --ink:#2A2B2F; --ink-2:#5F5D5A;
  --navy:#0E2C46; --teal:#14808C; --teal-deep:#0F6470;
}
h1,h2,h3{font-family:var(--font-serif);font-weight:300;line-height:1.02;letter-spacing:-.015em;text-wrap:balance}
/* section rhythm */
.section-space{padding-block:var(--s11)}
```

## Section sequence observed (FH homepage, 14 sections)
hero "Check your health." → "Testing is easy" (steps) → **"Monitor early indicators of 1000s of diseases" (class `tracked` = scroll-pinned/scrubbed feature)** → "160+ lab tests" → "The new standard" (8-img grid) → logo carousel → "Real people. Real results." (testimonial video cards) → "Gold standard" (7 imgs) → "Not your average checkup" (comparison table) → "Built with the world's top doctors" (16-portrait medical-board grid) → **"What could cost you $15,000 is $365" (count-up stat/pricing)** → FAQ accordion → CTA "Life is short?" → newsletter.

## Signature effects to clone (interactivity — Max wants MORE of this)
| Effect | How | Our use |
|---|---|---|
| Sticky transparent→solid header | scroll listener toggles bg/blur | keep |
| Scroll reveals | IO adds `.in`, CSS transition (fade+rise) | every section |
| Hero photo parallax + slow scale | translateY on scroll + ken-burns | hero |
| **Scroll-TRACKED feature section** (`tracked`) | pinned section, steps advance/scrub with scroll | **"How an assessment works" = the interactive centerpiece** |
| **Count-up stat** | number animates 0→value when in view | one honest impact stat |
| Comparison table | two-column "with vs without" reveal | "with HTA vs guesswork" |
| FAQ accordion | grid-template-rows 0fr→1fr | "working with us / what HTA is" |
| Testimonial/quote cards | scroll-snap carousel or grid | partners/standards or founder voice |
| Logo marquee | infinite translateX | "standards we build on" (WHO/PATH/HTAi) |
| Card hover scale | transform scale on img | program cards |

## Rules carried over (Master Brain, do NOT break)
Warm cream ground everywhere. Serif display LEFT-aligned, NEVER centered ragged, NO hard `<br>` in headings, NO multi-column body text (Max: "refrain from writing in columns" — one comfortable measure per text block). CLEAR CTA BUTTONS (dark navy pill on cream) in every section, not text links. Real dignified African-clinician photography (verified IDs in `research/v7/photo-plan.md`), faces + eyes visible; honest "coming soon" for founders/proof, never fabricate. One teal accent; green artwork-only. No dashes in copy. Few DEEP sections (~6-8), each with one in-depth message + one interaction.
