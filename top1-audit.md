# Develop-HTA — Top-1% Website Audit

Audited: 2026-08-11
Live: https://develop-hta.vercel.app
Reviewed source: `D:\AntiGravity\develop-hta\site\` (index, what-we-do, about, knowledge-hub, contact, privacy) + `css/dhta.css` + `js/dhta.js` + `js/dhta-viz.js`
Bar: Master Brain Website Top-1% Standard (7 laws + anti-slop bans)

## Verdict
The build is structurally sober and disciplined (colour, layout, type, honesty are largely compliant), but it fails the standard on the two things that separate top-1% from "clean template": **there is ZERO real photography and ZERO video anywhere** (Law 4), and **motion/interactivity is thin and generative-only** (Law 5). Every visual is abstract canvas art. Every human is an initial in a circle. That is the definition of "reads freestyled / generative" the owner flagged. This is fixable without a redesign: swap generative art for real imagery + one cinematic video, and add real scroll interactivity and full interactive-state fidelity.

What already passes: colour <=5 with one teal accent; 8 full-bleed sections, mobile single-column; 2 type families (Archivo + Source Sans 3), weight-based hierarchy, one oversized H1, body >=16px; no em/en dashes; honest claims with "coming soon" slots and no fabricated proof; privacy linked in every footer; reduced-motion respected; contact form is exactly 4 fields.

---

## Prioritized gap list

### 1. No real photography anywhere — CRITICAL (Law 4)
**Violates:** Law 4 (real photography dominates; kill generative-only) + anti-slop "real images not illustration."
**What is wrong:** The only raster asset on the whole site is the logo PNG. Every hero, every program tile, every interior zigzag panel, every page-head is a `<canvas data-viz="...">` generative motif (constellation / circuit / molecular / rings / burst / bridge) with soft radial glow behind it. No photo of a clinic, hospital, health worker, device, or the Sub-Saharan settings the org serves. A non-profit about real health decisions in real places shows none of them.
**Fix:** Source real, commercially-licensed stock photography (Pexels/Unsplash/Coverr) of Sub-Saharan clinical/hospital/health-worker/medical-device contexts, colour-graded to the navy/teal palette. Replace the 4 program-tile canvases and the interior zigzag canvases with real photos. Keep at most one subtle canvas motif as brand texture, not as the primary image everywhere.

### 2. No human faces — founders are initials, no testimonials — CRITICAL (Law 4)
**Violates:** Law 4 (faces in testimonials; real result + faces).
**What is wrong:** On home and about, the founders render as `<span class="person__ph">M</span>` / `J` — literally the letters M and J in circles. There are zero testimonials, zero named quotes, zero advisor faces. A trust-driven non-profit with no human face on it reads as a shell.
**Fix:** Add real founder headshots for Marina and Jani with short bios (this is available now, unlike client proof). As real engagements/advisors come online, add named testimonial quotes with faces. Until then, real founder photos alone remove the biggest "faceless" tell.

### 3. No video — owner explicitly wants a cinematic hero — CRITICAL (Law 4/5)
**Violates:** Law 4 (real footage over generative) + owner brief.
**What is wrong:** There is no `<video>` element anywhere. The hero is a dark navy block with a drifting dot-constellation canvas. Wellcome Leap (the named reference) leads with real motion imagery; this clone substitutes abstract particles.
**Fix:** Use the `cinematic-stock-hero-video` skill: a real, commercially-licensed looping hero clip (health/lab/African clinical setting), graded to navy/teal, seamless loop, poster frame, <1MB, `prefers-reduced-motion` paused. Wire it full-bleed behind the existing hero copy in place of the constellation canvas.

### 4. Interactivity/motion is thin — below the "present but restrained" bar (Law 5)
**Violates:** Law 5 (3-6 subtle effects PRESENT; Lenis/GSAP or CSS scroll-timeline present).
**What is wrong:** Total motion inventory = (a) IntersectionObserver reveal-on-scroll fade-up, (b) sticky-header shadow, (c) button/tile hover translate, (d) two animated canvases (constellation drift, bridge pulse). No scroll-driven storytelling, no count-up stats, no pinned/scroll-scrub moment, no smooth-scroll engine, no signature interaction. No GSAP/Lenis/scroll-timeline present. It clears "has some motion" but not top-1% "motion is a designed layer."
**Fix:** Use `scroll-motion-effects`: staggered scroll reveals on the tile grid and who-we-serve columns, a count-up on any real stat once numbers exist, and ONE signature scroll moment (e.g. the bridge section as a scroll-scrubbed "global standards -> local realities" reveal). Add Lenis for smooth momentum. Keep entrances <=400ms and reduced-motion honored (already wired).

### 5. Incomplete interactive-state fidelity (Law 5)
**Violates:** Law 5 (6-state fidelity: default/hover/focus/active/disabled/loading on every interactive element).
**What is wrong:** Buttons define default + hover + global `:focus-visible` only — no `:active`, no `:disabled`, no loading state. The contact form has focus states but no validation states, no disabled/submitting/loading state, no success/error state, and posts via `action="mailto:"` (opens the mail client; no real submission, no confirmation). Selects/inputs lack error styling.
**Fix:** Add `:active` and `:disabled` button styles + a loading/spinner state. Wire the contact form to a real endpoint (Formspree/Vercel serverless) with client-side validation, a disabled-while-submitting state, and a success/error message. Retire the mailto fallback once live.

### 6. Kicker/eyebrow labels over headings — SLOP TELL (anti-slop + Max locked rule)
**Violates:** Anti-slop "max 1 eyebrow per 3 sections" and Max's own locked rule "no kicker/eyebrow labels over an H1 (AI slop)."
**What is wrong:** Every interior page-head stacks an all-caps eyebrow directly over the H1: what-we-do "The approach", about "Mission and vision", knowledge-hub "HTA frameworks". This is the exact AI-slop pattern Max banned in memory (`feedback_no_kicker_labels`). (Home hero correctly has none.)
**Fix:** Delete the `.eyebrow` labels on all three interior page-heads; fold the positioning into the H1 or a one-line subline. The `.eyebrow` CSS class can stay but should not sit over a heading.

### 7. Generative glow art stands in for imagery — generative-only tell (Law 4 / anti-slop)
**Violates:** Law 4 (kill generative-only) + anti-slop spirit of "no AI glow gradients."
**What is wrong:** `baseGlow()` paints soft radial teal/green/navy glows behind every tile, and the motifs (burst/molecular/rings/circuit) are abstract generative decoration. Palette is on-brand (not the banned purple/blue), so it is not a literal ban hit, but functionally the whole site's "art direction" is procedurally-generated glow + particles — the generative-only look the standard exists to prevent.
**Fix:** Once real photography lands (gaps 1-3), demote the canvas system to at most one subtle background texture. Do not ship generative art as the primary visual on 12+ surfaces.

### 8. Funnel dilution — hero primary CTA is navigation, not the goal (Law 6)
**Violates:** Law 6 (ONE goal, ONE primary action; same CTA label+accent >=3x; trust signal beside every CTA).
**What is wrong:** The site's single goal is "Get in touch / Contact," and that label does persist in the nav and repeat in the CTA band — good. But the hero's primary (accent-filled) button is "What we do" (a navigation link), with "Get in touch" demoted to the ghost nav button. The strongest visual CTA on the page does not point at the conversion goal. No trust microline sits beside the CTAs.
**Fix:** Make the hero primary button the funnel action ("Get in touch" / "Start a conversation") in the accent fill, and demote "What we do" to the ghost style. Add a one-line trust signal beside the hero and CTA-band buttons (e.g. "Grounded in WHO and PATH standards" or founder credentials).

### 9. No trust seals / partner / funder logos near the hero (Law 4/6)
**Violates:** Law 4 ("trust seals near hero") + Law 6 ("trust signal beside every CTA").
**What is wrong:** There is no logo strip, affiliation row, or credibility marks near the hero. The only credibility is a text list of WHO/PATH sources deep in the credibility section. Pre-registration limits what is claimable, but there is currently nothing visual establishing legitimacy above the fold.
**Fix:** Add an honest affiliations/foundations strip near the hero — the HTAi Interest Group connection (how the founders met), and WHO/PATH as "standards we build on" rendered as recognizable marks where licensing permits. Keep it honest (build-on, not endorsed-by).

### 10. Compliance gaps for an EU non-profit (Law 7)
**Violates:** Law 7 (privacy/legal in footer; local/credibility; honest claims).
**What is wrong:** Privacy page exists and is linked site-wide (good) and claims are honest (good). Missing for an EU entity: an imprint/legal-entity (Impressum) block, and a cookie/consent notice. Currently mitigated by "Registration in progress" honesty and no tracking scripts, but this must land before the entity is public-facing and before any analytics/embed is added.
**Fix:** Add an imprint/legal-entity block (entity name, registration number, responsible contact) to the footer once registered, and a cookie/consent notice the moment any analytics, embedded form, or third-party asset is introduced. Keep an honest placeholder until then.

---

## Minor / hygiene (not in top 10)
- **Dead font payload:** `assets/fonts/` still ships 18 Source Serif 4 weights (`serif-0..17`) from the rejected v1, but v2 uses only Archivo + Source Sans 3. If `fonts.css` still `@font-face`s the serif, that is unused download weight hurting LCP. Confirm and strip unused faces.
- **Decorative-only visuals:** all `data-viz` canvases are `aria-hidden` (correct for decoration) but that means no-JS / screen-reader users get an empty dark block where the "image" should be. Real photos with alt text fix this automatically.
- **Type-size count:** ~7 discrete sizes (hero/statement/h2/tile/h3/body/kicker) is slightly above the 4-6 target; acceptable, but tighten if consolidating.
