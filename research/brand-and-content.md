# Develop-HTA — Brand Tokens + Content Inventory

Date: 2026-08-11
Status: STARTING PROPOSAL — owner-confirmation required on all Max/founder-owned calls (palette, type, positioning language). Nothing here is locked.
Class (per Benchmark Selection): small mission-driven global-health non-profit / health-policy institute. NOT a giant foundation. Sober, evidence-first, credible. Build in this class.

Founders: Marina (medical doctor) + Jani (biomedical engineer). Met via the HTAi Interest Group on Developing Countries.
Constraint reality: 2-person team, non-profit budget, pre-registration (entities not yet formally registered), NO real photography or client proof yet. Every proof-shaped element is an honest "coming soon" SLOT, never a fabrication.

---

## 1. BRAND TOKENS (starting proposal — owner-confirm)

### 1.1 Color system

The described logos are a navy -> teal -> green gradient on clinical white. Master Brain "accent discipline" rule applies: the site is **monochrome (a navy/ink neutral ramp) + ONE rationed brand whisper**, never decorative color, never color on headlines. The three-stop gradient is a LOGO asset, not a page-painting license. On the site the gradient appears only inside the mark and, at most, as one hairline rule or one small motif — not as section backgrounds or big blocks (that is exactly what the amateur all-blue Wix draft did wrong).

Proposed tokens (hex grounded in the brief's stated logo colors):

Brand / identity (used in the mark, and sparingly):
- `--navy-900  #0E2C46`  deepest navy, headings ink option, footer
- `--navy-700  #123A5E`  primary navy (brief's stated navy) — wordmark, primary text-on-white accent
- `--teal-500  #1A9AA8`  brief's teal — mid stop of the gradient
- `--green-500 #5CB85C`  brief's fresh green — end stop of the gradient

THE ONE rationed accent (the single functional whisper — links, active states, the check/tick in lists, focus ring, one hairline). Recommendation: **teal `--teal-600 #14808C`** (a slightly deepened, WCAG-safer teal than #1A9AA8, which fails AA on white for text). Rationale: teal is the "bridge" color — it sits between the navy (Europe / clinical rigor) and the green (Africa / growth) and reads as the join between the two halves of the hybrid model. Green is reserved for the mark + the occasional positive-data accent, not general UI, so we don't drift into "eco/NGO green" cliché.
- `--accent      #14808C`  (teal-600) — the whisper: links, focus, ticks, one hairline
- `--accent-weak #E6F3F4`  teal tint for a rare hover/selected chip background

Neutral ramp (the actual page — this is 90%+ of the pixels):
- `--ink        #111A22`  body text (near-black, cool)
- `--ink-2      #3C4B59`  secondary text / captions
- `--ink-3      #6B7A88`  muted / meta / labels
- `--line       #E3E8EC`  hairlines, card borders (borders-first, not shadow-heavy)
- `--surface    #FFFFFF`  clinical white — primary background
- `--surface-2  #F6F8FA`  faint cool-grey section band for rhythm (NOT blue)
- `--surface-ink #0E2C46` rare dark section (footer / one statement band) using navy-900

Functional / semantic (kept distinct from the brand accent so status never reads as brand):
- `--success #2E7D46`  (a grounded green, darker than brand green — for "verified/complete" states)
- `--warning #B26A00`
- `--danger  #B3261E`
- `--info    #14808C`  (may reuse accent teal)

Gradient token (LOGO + at most one hairline/motif only):
- `--brand-gradient  linear-gradient(90deg, #123A5E 0%, #1A9AA8 55%, #5CB85C 100%)`
  Usage law: inside the mark, or a 2px underline/rule, or a thin motif stroke. NEVER a section background, NEVER behind text, NEVER a button fill on primary CTAs (primary CTA = solid navy-700 or solid accent teal, white text).

Contrast notes (must verify at build): body ink on white and navy-700 on white pass AA. `#1A9AA8` and `#5CB85C` do NOT pass AA for normal text on white — that is why the interactive/text accent is deepened to `#14808C` and green is decoration-only.

### 1.2 Typography (real, free/open fonts)

Brief = sober, evidence-first health-policy brand. Pairing = a credible text-friendly serif (or humanist sans) for headings + a clean neutral sans for body. Recommendation and two alternates:

RECOMMENDED — "Institute" pairing:
- Headings: **Fraunces** (Google Fonts, OFL) at its lower optical/soft settings, or **Source Serif 4** (OFL) if Fraunces feels too characterful. Source Serif 4 is the safer, more institutional choice — it was literally designed for long-form reading and pairs with Source Sans. It signals rigor and journals without feeling luxury/fashion.
- Body/UI: **Source Sans 3** (OFL) — humanist, highly legible at small sizes, quiet.
- Numerals/data: use the sans with `font-variant-numeric: tabular-nums` for any figures/tables.

ALTERNATE A — "Policy" (fully humanist-sans, no serif):
- Headings + body both **Inter** (OFL) with heading weight 600 and tight tracking, OR headings in **IBM Plex Sans** / body in Inter. IBM Plex reads as engineering + institutional credibility (fits Jani's biomedical-engineer side). This is the most neutral, safest, cheapest-to-render option.

ALTERNATE B — "Journal" (stronger editorial serif):
- Headings **Lora** or **Spectral** (both OFL); body **Inter**. Use only if founders want a warmer, more publication-like feel. Slightly higher risk of reading "magazine" vs "institute".

Type rules (per house standards): max ~4 type sizes in play; no all-caps kicker/eyebrow labels over an H1 (AI-slop — fold positioning into the headline/subline); hero subline <= 2 lines; generous leading; left-aligned long-form (no centered paragraphs).

Load only the weights used (e.g. 400/600/700) to keep it lean; self-host the woff2 for privacy + speed (non-profit, EU — self-hosting avoids Google Fonts data concerns).

### 1.3 Motif usage (Africa + tech) — restraint law

The identity carries loaded motifs: baobab, Kilimanjaro, continent outline, medical cross, circuit lines, stethoscope/ECG, globe. On the SITE these must be **restrained line-work**, used as quiet structure — never literal, never "Western savior over Africa" imagery.

DO:
- Use a single thin line-motif as a section divider or a corner mark (e.g. an ECG line that resolves into a baobab-branch or a circuit trace — ONE such device, reused, not a zoo of icons).
- Let the navy->teal->green gradient live only inside the mark / one hairline; it already carries the "Europe bridges to Africa growth" meaning without a picture spelling it out.
- Prefer abstract geometry (the continent as a subtle negative-space or a dotted grid) over photographic Africa.
- Keep icons single-weight, monochrome ink or accent teal, consistent stroke.

DON'T:
- No stock photos of smiling African children/villages, no hands-across-the-globe, no white-coat-savior visuals, no "helping hands" clichés.
- No literal Kilimanjaro sunset hero, no baobab-at-golden-hour stock.
- No generic AI globe (that was the amateur draft's tell). If a globe appears at all, it is a thin wire line-motif, not a rendered 3D marble.
- No rainbow of the three brand colors across UI — motif is monochrome/ink with at most an accent-teal stroke.

---

## 2. CONTENT INVENTORY (phase 1 + phase 2)

Legend: [HAVE] = real copy exists in brief and can ship. [SLOT] = honest placeholder / "coming soon", must NOT be fabricated. [DERIVE] = we can write credibly from the brief now, founder to confirm. [SOURCE] = can cite the provided WHO/PATH sources.

### PHASE 1

#### PAGE: Home
- Hero
  - [DERIVE] Headline: states what Develop-HTA is + who for, in the headline itself (no kicker label). Direction: "Making Health Technology Assessment work for Sub-Saharan Africa." Subline <=2 lines from mission: "A non-profit bridging global HTA standards with local realities, so every medical technology reaching African soil is safe, effective, and sustainable." (Owner-confirm final wording; strip the amateur draft's italic version.)
  - [DERIVE] Primary CTA: "What we do" -> /what-we-do. Secondary: "Contact" -> /contact.
  - [SLOT] Hero visual: restrained line-motif / abstract, NOT a stock globe. Real founder/field photography = coming-soon slot.
- What HTA is (one-line plain-language definition band)
  - [DERIVE/SOURCE] A 2-3 sentence "what is HTA and why it matters here" — can lean on WHO framing. Evidence-first, no jargon wall.
- What we do (3-up summary -> links to full page)
  - [HAVE/DERIVE] Three cards summarizing the offering (Assess / Build capacity / Bridge standards-to-local). Pull from mission + stakeholders.
- The hybrid model teaser (Public Advisory Division + Consultancy Division)
  - [HAVE] One clear block naming the two arms (see IA section 3 for the donor-vs-client framing). Links to About.
- Who we serve (3 stakeholder tiles -> phase-2 stakeholder pages/anchors)
  - [HAVE] Healthcare Organizations / Public Institutions / Local Health Industry — one line each from the brief.
- Knowledge Hub teaser
  - [SLOT] Latest frameworks / news — 2-3 cards. If empty at launch, show an honest "The Knowledge Hub is being built — first frameworks and briefs coming soon" state, not fake articles.
- Founders / credibility strip
  - [HAVE] Marina (medical doctor) + Jani (biomedical engineer), met via HTAi Interest Group on Developing Countries. [SLOT] real headshots + fuller bios.
- Closing CTA / contact band
  - [HAVE] contact@develop-hta.com, www.develop-hta.com.
- Footer
  - [HAVE] org, tagline, email. [SLOT] registration details ("registration in progress" honest note), partner logos, social links.

#### PAGE: What we do
- Intro: the problem + the approach
  - [HAVE/DERIVE] "Global standards are only as good as their local application" — story line reused. A bridge, not just a technical repository.
- Service pillars (the actual offering)
  - [DERIVE] Assess & compare technologies; scenario / economic modeling; HTA-informed dossiers; capacity building & training; advisory for emerging HTA units. (Map directly to the three stakeholder needs.)
- How we work / method
  - [DERIVE/SOURCE] Evidence-first process; grounded in WHO prequalification, WHO compendium of innovative health technologies for low-resource settings 2024, PATH technical standards. Cite sources rather than assert authority.
- Deliverables (what a client/partner receives)
  - [DERIVE] e.g. an HTA report, a comparison matrix, a grant-ready evidence annex, a training module. [SLOT] real sample/redacted example -> coming soon.
- CTA -> Contact
  - [HAVE]

#### PAGE: About us
- Mission / Vision
  - [HAVE] Mission text from brief (non-profit making HTA accessible across Sub-Saharan Africa; hybrid model). Vision: empower Africa through HTA.
- Our Story
  - [HAVE] Common dream; met via HTAi Interest Group on Developing Countries; a bridge not a repository; every medical technology reaching African soil safe/effective/sustainable.
- Founders
  - [HAVE] Marina + Jani, roles + how they met. [SLOT] full bios, credentials, photos, LinkedIn.
- The hybrid model (short here, full in phase 2)
  - [HAVE] Names the European non-profit core + Sub-Saharan consultancy arm. (Deep version = phase 2.)
- Values / principles
  - [DERIVE] Equitable access, public interest, local ownership, evidence over hype, honesty about what we can prove.
- [SLOT] Advisory board / network, partners, registration status.

#### PAGE: Knowledge Hub
- Section: HTA Frameworks
  - [SOURCE/SLOT] Curated framework explainers + links to WHO/PATH primary sources. At launch may be a short curated list + "more coming". Real original briefs = slot.
- Section: Success Stories
  - [SLOT] HONEST EMPTY STATE. No fabricated case studies. "Our first engagements are underway — stories will be published here as they complete." Pre-registration, no client proof yet.
- Section: Experts network
  - [SLOT] Founders now; network members = coming soon. No fake logos/names.
- Section: News
  - [SLOT/DERIVE] Launch post + registration milestones are legitimately publishable now.

#### PAGE: Contact
- [HAVE] contact@develop-hta.com, www.develop-hta.com.
- [DERIVE] Simple form (name, org, stakeholder type, message) — routes to email. Clear "who should reach out" (donors/partners vs clients) so the two audiences self-sort.
- [SLOT] EU base location detail, entity/registration line ("registration in progress"), phone if any.

### PHASE 2

#### PAGE: Expanded About us — the hybrid model
- Public Advisory Division (the non-profit core)
  - [HAVE] Public interest, equitable access to HTA, EU-based. Audience = donors, ministries, public partners. Language of mission and stewardship.
- Consultancy Division (the mission-driven arm on the ground)
  - [HAVE] Services, expertise, capacity building in Sub-Saharan Africa. Audience = paying/partner clients. Language of deliverables and value.
- How the two relate (governance + firewall)
  - [DERIVE + FOUNDER-CONFIRM] Plain explanation that consultancy revenue funds/sustains the mission; non-profit sets standards, consultancy delivers. Needs founder sign-off on exact structure (and legal accuracy given pre-registration).
- [SLOT] Governance, board, financial-transparency note, registration numbers per entity.

#### PAGE: Target Stakeholders (hub + 3 sub-pages or anchored sections)
- Healthcare Organizations
  - [HAVE] public & private hospitals, faith-based providers, health NGOs. Jobs: prioritise tech investments, compare alternatives, strengthen grant/donor applications, scenario modeling.
- Public Institutions
  - [HAVE] Ministry of Health, National Health Insurance Fund, emerging HTA units. Jobs: inform coverage/reimbursement/procurement; usable HTA tools where no formal HTA exists; capacity strengthening.
- Local Health Industry
  - [HAVE] medical-device/diagnostics manufacturers & importers, digital-health startups. Jobs: demonstrate value for money; HTA-informed dossiers; align tech design with payer expectations.
- Each: [SLOT] tailored CTA, later a case story slot (honest empty until real).

### Global content-needed SLOT register (never fabricate)
- Real founder headshots + full bios/credentials.
- Real field / partner photography (no stock savior imagery).
- Publications / sample reports / redacted deliverable examples.
- Partner + funder logos.
- Expert-network member names/photos.
- Success stories / case studies (NONE yet — pre-registration).
- Legal: entity names, registration numbers/status, EU base, privacy policy, cookie note.
- Testimonials (none yet).

---

## 3. IA RECOMMENDATION

### 3.1 Homepage scroll vs deeper pages
Homepage = the 60-second orientation, not the encyclopedia. Order:
1. Hero (what + who-for, one line).
2. Plain-language "what HTA is / why it matters here" (lowers the barrier immediately; most visitors won't know HTA).
3. What we do (3-up) -> deep page.
4. The hybrid model teaser (one honest paragraph + the two named divisions) -> About.
5. Who we serve (3 stakeholder tiles) -> phase-2 pages.
6. Credibility: founders + the HTAi-group origin + sources we build on (WHO/PATH) — this is the trust engine when there's no client proof yet.
7. Knowledge Hub teaser (honest "coming soon" if thin).
8. Contact band.

Push to deeper pages: full method, full story, full stakeholder job-maps, framework library, governance of the hybrid model. Keep the home scroll skimmable; depth is one click away.

Because there is no proof yet, the homepage's trust must come from CLARITY + CREDIBLE SOURCING (cite WHO/PATH, name the HTAi group, be specific about method) — not from testimonials or logos we don't have. That is the honest substitute for social proof at launch.

### 3.2 Communicating the hybrid model without confusing donor vs client
Risk: one visitor is a donor/ministry (thinks "non-profit, public good, can I fund/trust this?"), another is a paying client (thinks "consultancy, can they deliver, what does it cost me?"). If the site blurs these, both bounce.

Recommendation:
- Lead with the MISSION as the umbrella (non-profit identity first) — this frames everything and reassures donors/public partners.
- Then explicitly name the two arms as a clear two-part structure: "Public Advisory Division" (non-profit core, public interest) and "Consultancy Division" (mission-driven services on the ground). Give each a one-line "who this is for."
- Provide a self-sort early: on the "Who we serve" tiles and the Contact page, let visitors pick their type. A donor/ministry path and a client path can share pages but should have distinct CTAs ("Partner with us / Support the mission" vs "Work with our consultancy").
- Be transparent that consultancy revenue sustains the non-profit mission — donors want to see sustainability, clients want to see this isn't a for-profit in disguise. One honest sentence does both.
- Keep pricing OFF the public site at this stage (pre-registration, no rate card confirmed) — Contact-to-scope. Avoid any fabricated pricing/CPL-style numbers.

Owner-decision (present to founders, 2-3 options, one rec):
- OPTION A (rec): single site, mission-first umbrella, two clearly-labeled divisions + audience self-sort. Simplest, honest, cheap. Best for a 2-person pre-registration team.
- OPTION B: two visually-distinct sub-brands under one domain (e.g. /advisory vs /consultancy). More scalable later, more to build/maintain now — premature.
- OPTION C: two separate sites. Rejected for now — splits a tiny team's credibility and SEO, doubles maintenance.
Recommend A until the entities are registered and volume justifies B.

---

## 4. TONE — do / don't for copy

House rules first: NO em/en dashes anywhere in copy (use commas, periods, or restructure). No all-caps kicker/eyebrow labels over headlines. Hero subline <= 2 lines.

DO:
- Lead with the answer / the point. Plain, simple English. One idea per line.
- Be evidence-first: cite what we build on (WHO prequalification, WHO compendium 2024, PATH standards) rather than asserting authority.
- Be specific and concrete ("compare two diagnostic devices before a hospital invests") over abstract mission-speak.
- Say "unknown" / "coming soon" honestly where we lack proof. Confidence through clarity, not claims.
- Center local ownership and partnership: African institutions as agents, not recipients. "with" and "alongside", "local realities", "capacity strengthening".
- Respect the reader's intelligence: define HTA once, plainly, then use it.
- Keep it sober and institutional — this is a health-policy institute, not a startup.

DON'T:
- No white-savior framing. No "we save/rescue/lift up Africa", no "bringing modern medicine to", no helping-hands / children / village clichés (visual or verbal).
- No fabricated proof: no invented case studies, testimonials, client counts, CPL/value numbers, partner logos, or "trusted by".
- No hype adjectives (revolutionary, cutting-edge, world-class, game-changing) and no vague mission-mush.
- No dashes. No borrowed luxury-brand voice. No generic AI-globe "connecting the world" boilerplate.
- Don't overclaim capacity: we are a 2-person, pre-registration non-profit. Don't imply a large staff, offices, or completed engagements.
- Don't blur non-profit and consultancy into a confusing single pitch (see IA 3.2).
- Don't treat the three brand colors as a paint bucket — restraint in copy AND design.

---

## Open owner-confirmation gates (founders / Max)
1. Palette sign-off: accept teal-600 `#14808C` as the single functional accent, green as decoration-only? (Data reason: raw teal/green fail AA for text.)
2. Type pairing: Source Serif 4 + Source Sans 3 (rec) vs Inter/IBM Plex (safest) vs Lora/Spectral (warmer)?
3. Hybrid-model structure wording — legally accurate given pre-registration (needs founder input, this is a factual claim, not ours to invent).
4. Hero headline/subline final wording.
5. IA option A vs B for donor/client split.

Sources referenced (from brief, to cite on-site, not to assert beyond): WHO prequalification (extranet.who.int/prequal), PATH technical standards (media.path.org TS_update_san_pad.pdf), WHO compendium of innovative health technologies for low-resource settings 2024, WHO IRIS bitstream. Save any deeper findings to `D:/AntiGravity/develop-hta/research/`.
