# Develop-HTA — Direction Memo (owner-gate before build)

Date: 2026-08-11
Status: AWAITING MAX'S PICK. No code until a direction is chosen.
Built from: `domain-hta-ngo.md`, `reference-candidates.md`, `reference-teardown.md`, `brand-and-content.md` (all in this folder).
System in use: Master Brain **Reference-Clone Elite Site**, started via **Project Bootstrap**. Benchmark chosen per **Benchmark Selection** (our class = small mission-driven health-policy non-profit, NOT a giant foundation).

## Spec, restated in three lines
A sober, evidence-first website for **Develop-HTA**, a non-profit making Health Technology Assessment accessible across Sub-Saharan Africa (founders Marina, MD + Jani, biomedical engineer). Two audiences: public partners/donors/ministries and paying consultancy clients. Hard constraint: 2-person, pre-registration, **no real photos or client proof yet** so every proof-shaped element is an honest "coming soon" slot, never fabricated.

## The reference shortlist (in our class)
- **iDSI (idsihealth.org)** — our literal sibling: HTA for LMICs, sober navy-on-white, metric-as-proof, resources-as-toolkit hub. Its sitemap is effectively ours.
- **GiveWell (givewell.org)** — proof a near photo-free, citation-forward site reads authoritative. The model for our zero-asset stage.
- **Our World in Data (ourworldindata.org)** — the evidence-forward knowledge-hub geometry with trust furniture on every asset.
- **Resolve to Save Lives / Amref** — sober Africa framing without visual cliché.
- **PATH** — repeating geometric SVG motifs as a photo substitute (rhythm with zero photography).

## Three directions (differentiated by GEOMETRY, not paint)

### Direction 1 — "Evidence Institute"  (anchor: iDSI + Our World in Data)
The safest credible register and the closest sibling. Homepage = calm gridded scroll: hero value line, plain "what HTA is" band, an honest metric/fact band, a 6-tile "what we do" grid, a stakeholder tile row, a knowledge-hub card grid. Navy ink on white, teal accent whisper, flat brand-gradient SVG motif marks, motion near-zero.
- Geometry: structured tile + card grids, metric band, generous whitespace.
- Pros: maximum credibility with ministries/donors; matches the sibling that already works; cheapest to build honestly with no photos.
- Cons: safest = least distinctive on its own (we counter this by grafting D3's citation density + D2's one bridge motif).

### Direction 2 — "The Bridge"  (anchor: Resolve to Save Lives + PATH geometric SVG)
Leads with the founding metaphor: global standards on one side, local realities on the other, Develop-HTA as the join. A continuous vertical **spine** threads the scroll (an ECG/circuit line that resolves into a baobab-branch), sections alternate in an asymmetric media+text zigzag. Warmer, more narrative.
- Geometry: connected vertical spine + asymmetric zigzag, one recurring line-motif as the connective tissue.
- Pros: memorable, differentiated, tells the story; the navy→teal→green gradient earns its meaning (Europe → bridge → Africa).
- Cons: narrative/zigzag wants imagery to shine, which we lack now; slightly higher craft risk to keep it sober not decorative.

### Direction 3 — "Transparent Ledger"  (anchor: GiveWell + Center for Global Development)
Radical-transparency, text-and-citation forward. Left-rail topic nav, publication-style typed cards (Framework / Toolkit / Policy Brief / Case Study, each with source + date + read-time), authority built purely from cited WHO/PATH framing and founder credentials. Almost no imagery by design.
- Geometry: document-library layout, typed publication cards, left-rail topic index, text-column forward.
- Pros: best possible fit for zero-asset pre-registration; reads authoritative on rigor alone; scales into the Knowledge Hub effortlessly.
- Cons: driest for a first-time visitor who does not yet know what HTA is; needs strong plain-language onboarding up top.

## Recommendation
**Direction 1 (Evidence Institute) as the spine, grafting D3's citation density and D2's single bridge-motif.**
Why: iDSI is our literal sibling and the sober institute register is what ministries, hospitals and donors trust. Because we have no proof yet, we borrow GiveWell/D3's transparency-and-citation engine so authority comes from cited sources + clarity, not testimonials we don't have. And we keep ONE bridge line-motif from D2 for warmth and differentiation, so we are not just "another sober NGO grid." This is the highest-credibility, lowest-fabrication path for a 2-person pre-registration team, and it is the most honest use of the brand.

## Phased build plan (Reference-Clone Elite Site pipeline)
1. Teardown → done (iDSI, on disk). Capture reference screenshots for the judge.
2. Build the SHARED DESIGN SYSTEM first: tokens (navy ink ramp + one teal whisper, green decoration-only), fluid rem engine, section shell, one card unit, the reveal engine, the single bridge line-motif, nav/footer. Verify this foundation by hand.
3. Build home SECTION-BY-SECTION, each on a named iDSI/OWID pattern, geometry-distinct per section, honest "coming soon" slots where proof is missing.
4. Deterministic gates: discipline linter (no dashes, accent discipline, type sprawl, geometry-dup), anti-slop, per-section probes.
5. Fresh-context reference-judge (builder ≠ judge) vs the iDSI shots, then Max's eye on live scroll.
6. Multi-page fan-out from the one design system (What we do / About / Knowledge Hub / Contact), each its own geometry.
7. Deploy device-split to a Vercel/host target for develop-hta.com.

## Open owner decisions (this gate)
1. **Direction**: D1 (rec) / D2 / D3.
2. **Scope now**: Phase 1 only (Home, What we do, About, Knowledge Hub, Contact) — recommended — vs include Phase 2 (hybrid-model detail + 3 stakeholder pages) in this build.
3. **Typography**: Source Serif 4 + Source Sans 3 (institute, rec) / Inter + IBM Plex (safest, most neutral) / Lora + Inter (warmer, editorial).
4. **Palette accent**: confirm teal-600 `#14808C` as the single functional accent with green as decoration-only (raw teal/green fail WCAG AA for text — data reason).

## Founder-confirm items (Marina + Jani, not ours to invent)
- Exact hybrid-model / division wording, legally accurate given pre-registration.
- Final hero headline + subline wording.
- Real assets when available: founder headshots + bios, any partner/funder logos, EU base + registration status, privacy policy.
