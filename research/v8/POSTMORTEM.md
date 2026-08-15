# Develop-HTA v8 — Root-Cause Postmortem (corrected)

Date: 2026-08-13
Method: 8-agent ultracode investigation (5 evidence streams over source/gates/Master Brain/reference/version-history → synthesis → 2 adversarial verify passes). Both verify passes returned REVISE; this document folds their corrections in. Full raw run: workflow wf_c1a5b27d-71b.

---

## The paradox we were explaining
v8 passed the full done-gate on 2026-08-13 — mechanical parity check, 390px overflow probe, no-dashes linter, AND a fresh-context "builder≠judge" visual judge that returned **"genuine top-1% clone of Function Health, ELITE, zero blockers."** The same hour, Max's eye found ~16 craft failures. No gate was "wrong." How?

## Root cause (upstream → downstream, corrected ranking)
The first draft blamed the gate ("criterion capture"). The refute pass corrected this: that's the **second** link, not the first. The true chain:

1. **UPSTREAM ROOT — Max's hard constraints were never captured as a spec, so the reference was never owner-gated against them.** Max's non-negotiables — **video hero, centered, one font** — were never written down before a reference was chosen. Nothing forced the reference to be checked against them.
2. **→ Wrong reference locked.** Function Health is **left-aligned, three fonts (serif+sans+mono), photo-hero** — the structural *opposite* of all three of Max's wants. So "clone FH faithfully" and "give Max what he asked" were in conflict from commit one. The *better* the clone, the *further* from the ask. Complaints #9 (fonts), #14 (nothing centered), #1/#8 (wrapping) are FH-faithfulness **biting**, not execution slips.
3. **→ Gates rewarded fidelity to the wrong target.** With no constraint spec, every gate could only grade "does this match the reference." `parity-check-v8.py` was even authored by the same judge that then graded against it (independence of *person*, not of *standard*). The gate meant "no v6/v7 sins recur" — true, and irrelevant to the *new* failures Max raised. This violates our own Build-Protocol Gate-3: *the bar is the audience target + Max's eye, never a reference, never an agent verdict.*

Contributing mechanics:
- **The gates measure source-code/reference proxies, never the rendered page.** Not one gate opened a browser or measured a layout box. A too-narrow `--measure-hero` cap (480px, *not* from FH — a home-grown token grafted on top) force-wraps the 5.4rem headline to 5 lines; the `no-<br>`/`no-ch` proxies pass it anyway (css:44/94/112).
- **The one anti-slop tool we own was not run.** `impeccable detect` ships `oversized-h1` / `flat-type-hierarchy` (map onto #1/#8) — not run on v8 since v3/v4.
- **The discipline linter pointed at a ghost file** (`dhta.css`/`.site-header`); v8 is `v8.css`/`.hdr`. Only its dash-scan was live.

## Answer to "are we even using the Master Brain?" (#16)
Partial yes. The **token layer WAS data-driven** — the FH type scale, spacing and colour were lifted verbatim from a real teardown; that part is honest, not slop. What was **skipped**: (a) the Master Brain's **Anti-Slop Deterministic Gate** was never wired in; (b) `impeccable` wasn't run; (c) the reference was never owner-gated against Max's constraints. So: Master Brain used for *tokens*, its *enforcement* systems bypassed.

## Why it keeps recurring
Same failure on a 7-version loop: the reference is re-litigated every round instead of a proven baseline being locked. **v3 was the high-water mark** — real graded video hero, curated dignified photo set, interactive stepper, judge-passed — then never locked; v6 threw its wins away to re-clone the one reference research had said to SKIP. Direction only stabilized at v8 once Max named the reference himself — the owner-gate that should happen *before build one, not after six.* This matches Max's own standing memory: *"auditors give false premium verdicts," "enforce at build-time not advise," "taste stays with Max, judges are gates not the bar."*

## The fix — HONEST split (what the verify forced)
Mechanical hooks catch the **layout/type** slop. They do **not** catch taste. Do not route taste back into an AI judge — that is the exact vibes gate that stamped ELITE.

### Genuinely mechanical (wire as build-blocking hooks)
- **Constraint spec first + reference reconciliation.** Write `owner-constraints.json` (hero: video|photo · alignment · font-count · …). Diff any candidate reference against it; **build cannot start** on a conflict until Max re-picks or logs a per-trait override. v8 would have red-flagged 3 conflicts on day one. *Highest-leverage fix.*
- **Rendered line-count probe.** Headless-measure every h1/h2 bounding box at 390/768/1440; FAIL if any heading >2 lines. Catches #1, #8.
- **Rendered-centering probe.** Measure the actual bounding box centre vs container, not the CSS `text-align` property (a centered property inside a left-shifted narrow column still reads uncentered — verify caught this). 
- **Font-family count assertion.** FAIL if families-in-use > the number in the constraint file. (Today the gate *requires* 3.)
- **Delete-and-run `impeccable detect`** for `oversized-h1`/`flat-type-hierarchy` only. **Do NOT use its `single-font` rule** — Max *wants* one font; that rule is inverted here (verify caught this).
- **Repoint the discipline linter** at `v8.css`/`v8.js`/`.hdr`/`.ft` (one-line fix; today it lints a ghost).

### NOT mechanical — stays with Max's eye (do not fake it)
- **Photo-set register / homogeneity (#7).** The defect is *subject sameness* (all 12 = African medical staff), not file reuse — a uniqueness hash can't see it. Fix = a curated photo-SET brief (varied subjects/settings, white doctors fine) that Max signs off. Not a hook.
- **"Feels freestyled / horribly structured" (#8, #12).** Section register and taste. Max's eye is the judge, full stop.
- **Kill the false label.** A green gate = **"permitted to show Max," never "ELITE / done."** Calling a green hygiene+fidelity stack "ELITE, zero blockers" is the category error that produced same-day certify-and-reject. The gate script must never print a quality verdict.

**Honest limit (verify made me say this):** these hooks would have caught most of the *eye-obvious layout/type* slop (≈#1,#8,#9,#14) before Max ever saw it. They would NOT have caught the taste items. This failure class is *reduced*, not "made impossible." Max's eye remains the bar — by design, not by gap.

## Site fix list (mapped to complaints)
KEEP: pinned scroll stepper #5 (swap only the last image), founders #11, footer #13 (just fix the title font), standards-marquee concept #10.
DELETE: the mission section immediately before the pinned scroll #6.
REBUILD: hero → video + un-capped headline + centered CTAs #1/#2/#3/#14; make stepper ticks clickable #4; single font #9/#13; standards → real body logos + hover tooltips #10; statement section un-capped + restructured #8; varied photo set #7; de-repeat the 5-col/multi-grid geometry #12.
Keep the one-pager for now #15.

## Owner-decisions pending (Max)
(a) Reference: keep FH+override 3 traits · **re-select a video-hero/centered/one-font NGO reference (recommended)** · hybrid FH-palette + NGO-geometry.
(b) Approach: patch v8 in place · **graft v3's proven wins (video hero, curated photos) onto v8's cream system (recommended)** · ground-up rebuild.
(c) Scope: **do structural+process fixes now, hold real photo SET for client assets (recommended)** · full stock build now · wait.
