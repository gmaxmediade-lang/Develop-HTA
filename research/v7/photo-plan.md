# Develop-HTA v7 — Photo Plan (bring the real dignified photography back)

Date: 2026-08-13
Author: LEAD (fix spec). No site file touched.
Fixes: postmortem Finding 3 (all real photos stripped for generative canvas art) and owner complaint #2 verbatim ("bring back the stock photos... real dignified photography").
Sourced from: `research/media-shotlist.md` (curated 2026-08-11) + Gavi photo-hero / photo+text-grid clone (reference-decision).
Rule: real dignified African clinicians/scientists WITH FACES + EYES visible, in-context, competent. NO poverty-porn, NO faces-turned-away, NO globe cliché, NO aid framing. Generative/SVG art is demoted to a SUBORDINATE accent only, never a media slot.

CDN URL pattern (all self-hostable / hotlinkable, Pexels License, no attribution required):
`https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg`
For fixed crops add Pexels params, e.g. `?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop` (hero: `w=2000`).

**ALL 13 photo IDs below verified live 2026-08-13: HTTP 200, content-type image/jpeg.** (The two hero VIDEO ids are on Pexels' video CDN, not the /photos/ path — download + self-host as `assets/img/hero.mp4`.)

---

## PHOTO-VS-CLEAN POLICY (per section)
The old failure was BOTH extremes at once: canvas art where photos belong, and no clean editorial rest anywhere. v7 alternates on purpose so photos land with weight and geometry stays distinct (postmortem F6).

| # | Section | Media decision | Why |
|---|---|---|---|
| 1 | Hero | **REAL** — graded lab video (primary) or strong photo fallback | owner wants the photo back; Gavi hero clone |
| 2 | Affiliations strip | clean (text only) | trust furniture, no image |
| 3 | Positioning / thesis | clean (type + whitespace) | CGD text-mission line; rest beat |
| 4 | What we do (4 programs) | **REAL x4** — one documentary photo per program | the "photos back done right" section; Gavi work-grid |
| 5 | Knowledge Hub / Latest Work | **REAL where content exists**, PATH-style SVG placeholder tile only on honest "Coming soon" cards | CGD publication card; never fake a photo for empty proof |
| 6 | Impact / proof band | clean (large numerals on tint) | metric-as-proof, no image |
| 7 | How we work (3 steps) | clean + optional tiny subordinate SVG accent | geometry rest; art stays a whisper |
| 8 | Founders / Who we are | **REAL dignified stand-in** now + honest "real founder photos coming soon" note; NEVER monogram letters | Finding 3 fix directly |
| 9 | Standards we build on | clean (word/logo row) | keep, on-brief |
| 10 | CTA + footer | clean navy (no photo), OR one wide researcher band if a photo moment is wanted | avoid a 2nd dark-photo hero competing with section 1 |

Headline of the plan: **photos in the HERO + the 4 PROGRAM tiles + the FOUNDERS slot + real Knowledge cards; everything else is clean editorial.** Generative canvas is removed from all primary media and survives only as an optional subordinate SVG accent in section 7.

---

## 1. HERO
Clone: Gavi full-bleed documentary hero + Commonwealth left-light type. ONE dark full-bleed moment on the page.

**Primary — graded lab video (recommended):** Pexels video 8381327 "Automated Analysers in a Laboratory" (Pavel Danilyuk, 4K, Pexels License).
Source page: https://www.pexels.com/video/automated-analysers-in-a-laboratory-8381327/
Handling: download, grade (desaturate, crush blacks, midtones toward teal), navy left-to-right gradient overlay + vignette, seamless loop, compress < 1.5MB, self-host `assets/img/hero.mp4` + `hero-poster.jpg`. Reads as "evidence engine + technology", faces not required (machinery hero).

**Human-hero alternative (if owner wants people in the hero):** Pexels video 8381580 "People Working in a Laboratory" (two scientists examining data), source https://www.pexels.com/video/people-working-in-a-laboratory-8381580/ .

**Static photo fallback (if video is cut for LCP):** ID **3825434** African researcher running a biochemical experiment.
`https://images.pexels.com/photos/3825434/pexels-photo-3825434.jpeg?auto=compress&cs=tinysrgb&w=2000` — face + eyes visible, serious science, wide-croppable, grades to navy/teal.

---

## 2. PROGRAM GRID (4 real photos — one per program). Consistent ~3:2 ratio, faces + eyes visible.

| Program | Primary ID | CDN url | Alt ID |
|---|---|---|---|
| 01 Assess & Compare | **6234992** | `https://images.pexels.com/photos/6234992/pexels-photo-6234992.jpeg` | 33764117 |
| 02 Evidence & Modeling | **5452298** | `https://images.pexels.com/photos/5452298/pexels-photo-5452298.jpeg` | 5327915 |
| 03 Build Capacity | **5452193** | `https://images.pexels.com/photos/5452193/pexels-photo-5452193.jpeg` | 5452224 |
| 04 Advisory | **30313899** | `https://images.pexels.com/photos/30313899/pexels-photo-30313899.jpeg` | 33642011 |

Descriptions (from media-shotlist, all faces/eyes visible, dignified):
- 6234992 — African female technician operating medical machinery (assessing the technology).
- 5452298 — focused African doctor in white coat using a tablet in a clinical setting (data/evidence).
- 5452193 — team of African clinicians in a diagnostic discussion (peers teaching/learning).
- 30313899 — African medical team in consultation (advisory / deliberation).

Crop param for tiles: `?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`. Grade lightly to hold navy/teal cohesion (do NOT over-tint faces — keep skin natural; cohesion via a subtle navy scrim gradient at the card foot, as the existing `.tile2__grad` already does).

---

## 3. FOUNDERS / WHO WE ARE
Fixes Finding 3 (monogram "M"/"J" letter tiles were passed off as design).

**Now (until real Marina/Jani headshots exist):** dignified professional stand-in + an honest dated note.
- Primary stand-in ID **4989148** — confident African doctor, arms crossed, studio-clean, face + eyes to camera. `https://images.pexels.com/photos/4989148/pexels-photo-4989148.jpeg?auto=compress&cs=tinysrgb&w=900&h=1125&fit=crop`
- Alt portrait ID **6097758** — attentive Black physician reading a clipboard.

Keep the existing honest line: "Coming soon — real founder photographs and full bios are being prepared." Two-up portrait+bio split, left-aligned. **Delete `.portrait__ph` monogram tiles.** If owner prefers no stand-in face, use a clean bordered card with the coming-soon note — but NEVER a decorative letter tile.

---

## 4. KNOWLEDGE HUB / LATEST WORK cards
CGD publication-card system: fixed-ratio image + headline + author/date/type.
- Real cards that describe an actual framework/toolkit MAY use a supporting documentary photo, e.g. the who-we-serve image ID **6303643** (African doctor explaining a diagnosis to a patient in a modern hospital hallway — patient's agency intact, both faces visible) or ID **29941469** (modern ultrasound in clinic).
- **"Coming soon" / no-real-content cards get a PATH-style geometric-SVG placeholder tile, NOT a stock photo** — never imply proof or a case study that does not exist (postmortem honesty rule). The SVG tile is the ONLY sanctioned generative art on the page and it is subordinate (a placeholder, not a hero).

---

## 5. OPTIONAL WIDE BAND (only if a mid-page photo moment is wanted; keep it out of section 1's way)
- Wide researchers-at-work strip ID **3825434** (also the hero fallback) — full-bleed, `w=2400`, navy scrim, LEFT-aligned short overlay. Use at MOST once and not adjacent to the hero, so the page has exactly one or two photographic dark moments, not four (F6).

---

## GRADING / COHESION RULES (so the photo SET reads as one system)
1. One consistent aspect ratio per family: hero full-bleed; program tiles ~3:2; founders ~4:5; knowledge cards ~16:9.
2. Light, uniform grade: slight desaturation + a subtle navy scrim gradient at the foot for text legibility. Do NOT heavy-tint skin tones — dignity + realism over a heavy teal wash.
3. Faces + eyes visible in every people-photo (owner rule). Reject any crop that turns a face away.
4. Colour is carried by the PHOTOGRAPHY (Gavi discipline); navy/teal stay on interactive elements (links/CTAs) only.
5. Self-host under `assets/img/` for production (parity B2 forbids leftover/duplicate refs); hotlinking the CDN is fine for the build/preview stage.

## Reject list (unchanged from media-shotlist)
No "aid"/"village children"/"helping hands"/crying/destitute subjects, no aid-worker-over-villagers, no generic-beauty footage, no globe/map cliché, no faces-turned-away. None of the above are used.

## Verification log (2026-08-13)
`curl -I` on all 13 photo IDs: 6234992, 33764117, 5452298, 5327915, 5452193, 5452224, 30313899, 33642011, 4989148, 6097758, 3825434, 6303643, 29941469 -> all **200 image/jpeg**. Hero video ids 8381327 / 8381580 are on the Pexels video CDN (source pages listed above), download + self-host.
