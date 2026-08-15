# -*- coding: utf-8 -*-
"""
parity-check-v8.py  -  deterministic parity gate for the Develop-HTA v8 build.
Authored by the fresh-context JUDGE (did NOT build the site).
Checks site/v8.html + site/css/v8.css + site/js/v8.js against the owner notes and
the Function Health teardown. Prints "PASS: v8 parity green." + exit 0 on success,
else "FAILURES:" + reasons + exit 1.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(ROOT, "site", "v8.html")
CSS  = os.path.join(ROOT, "site", "css", "v8.css")
JS   = os.path.join(ROOT, "site", "js", "v8.js")

def read(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

fails = []
warns = []

for p in (HTML, CSS, JS):
    if not os.path.exists(p):
        fails.append("MISSING FILE: %s" % p)

if fails:
    print("FAILURES:")
    for f in fails:
        print("  - " + f)
    sys.exit(1)

html = read(HTML)
css  = read(CSS)
js   = read(JS)

# strip html comments for structural checks
html_nc = re.sub(r"<!--.*?-->", "", html, flags=re.S)

# ------------------------------------------------------------------ 1. warm cream ground
if not re.search(r"--cream\s*:\s*#FEF9EF", css, re.I):
    fails.append("Cream token --cream:#FEF9EF not defined in css.")
if not re.search(r"\bbody\s*\{[^}]*background\s*:\s*var\(--cream\)", css, re.I):
    fails.append("body background is not var(--cream) (warm cream ground).")

# ------------------------------------------------------------------ 2. serif display present
if not re.search(r"--display\s*:\s*['\"]?Fraunces", css, re.I):
    fails.append("Fraunces not set as --display serif family.")
if not re.search(r"h1\s*,\s*h2\s*,\s*h3\s*\{[^}]*font-family\s*:\s*var\(--display\)", css, re.I):
    fails.append("h1,h2,h3 do not use var(--display) (Fraunces serif) as font-family.")

# ------------------------------------------------------------------ 3. clear CTA button in every major section
if not re.search(r"\.cta\s*\{", css):
    fails.append("No .cta button class defined in css.")
# split html into <section ...> blocks and require a .cta pill in each (marquee band exempt)
sections = re.findall(r"<section\b[^>]*>.*?</section>", html_nc, flags=re.S)
cta_sections = 0
missing_cta = []
for sec in sections:
    m = re.search(r'class="([^"]*)"', sec)
    scls = m.group(1) if m else ""
    idm = re.search(r'id="([^"]*)"', sec)
    sid = idm.group(1) if idm else scls[:24]
    has_cta = re.search(r'class="[^"]*\bcta\b[^"]*"', sec) is not None
    is_marquee = "standards" in scls  # marquee band: no CTA fits, exempt
    if has_cta:
        cta_sections += 1
    elif not is_marquee:
        missing_cta.append(sid or "unnamed")
if missing_cta:
    fails.append("Sections missing a .cta button pill: " + ", ".join(missing_cta))
if cta_sections < 6:
    fails.append("Fewer than 6 sections carry a CTA button (found %d)." % cta_sections)

# ------------------------------------------------------------------ 4. NO multi-column body-prose block
# (a) no CSS multi-column on text
if re.search(r"(^|[^-\w])columns\s*:\s*[2-9]", css) or re.search(r"column-count\s*:\s*[2-9]", css):
    fails.append("CSS uses multi-column (columns/column-count >=2) on a text block.")
# (b) no HTML grid whose columns are BOTH long prose <p> with no media between them.
# Heuristic: for each *__grid / .grid container block, if it holds >=2 long <p> (>90 chars)
# and NO <img>/<figure> as a companion column, it's a prose-in-columns block -> FAIL.
grid_blocks = re.findall(r'<div class="[^"]*grid[^"]*">.*?(?=<div class="[^"]*grid|</section>)', html_nc, flags=re.S)
# more robust: pull each element whose class contains 'grid'
for m in re.finditer(r'<(?:div|section)[^>]*class="[^"]*\bgrid\b[^"]*|<(?:div|section)[^>]*class="[^"]*__grid[^"]*', html_nc):
    start = m.start()
    block = html_nc[start:start+2200]
    longps = [p for p in re.findall(r"<p[^>]*>(.*?)</p>", block, flags=re.S) if len(re.sub(r"<[^>]+>", "", p)) > 90]
    has_media = ("<img" in block) or ("<figure" in block) or ("<ul" in block) or ("data-accordion" in block) or ("<button" in block)
    if len(longps) >= 2 and not has_media:
        fails.append("A grid container holds >=2 long prose <p> with no media column (multi-column prose).")
        break

# ------------------------------------------------------------------ 5. ZERO <br> inside headings
for tag in ("h1", "h2", "h3"):
    for h in re.findall(r"<%s\b[^>]*>(.*?)</%s>" % (tag, tag), html_nc, flags=re.S):
        if re.search(r"<br\b", h, re.I):
            fails.append("<br> found inside a <%s> heading." % tag)
            break

# ------------------------------------------------------------------ 6. no max-width in ch on headings
# scan CSS rules that target headings / statements for a `ch` max-width
head_selectors = ["h1", "h2", "h3", ".statement", ".hero h1", ".head-row h2",
                  ".tracked__head h2", ".founders__text h2", ".faq__head h2", ".band h2"]
for rule in re.finditer(r"([^{}]+)\{([^}]*)\}", css):
    sel, body = rule.group(1), rule.group(2)
    if "max-width" in body and re.search(r"max-width\s*:\s*[\d.]+ch", body):
        if any(hs in sel for hs in head_selectors) or re.search(r"\bh[123]\b", sel):
            fails.append("A heading selector sets max-width in ch: %s" % sel.strip()[:60])

# ------------------------------------------------------------------ 7. real <img> photos in hero + program cards + closing band
if not re.search(r'<section class="hero">.*?<img\s[^>]*src="assets/img/[^"]+\.(?:jpg|png|webp)"', html_nc, flags=re.S):
    fails.append("No real <img> photo in the hero section.")
work_block = re.search(r'id="work">.*?</section>', html_nc, flags=re.S)
if not work_block or len(re.findall(r'<img\s[^>]*src="assets/img/[^"]+\.(?:jpg|png|webp)"', work_block.group(0))) < 3:
    fails.append("Program cards section does not have 3 real <img> photos.")
band_block = re.search(r'<section class="band"[^>]*>.*?</section>', html_nc, flags=re.S)
if not band_block or not re.search(r'<img\s[^>]*src="assets/img/[^"]+\.(?:jpg|png|webp)"', band_block.group(0)):
    fails.append("Closing CTA band has no real <img> photo.")
# every referenced local image must exist on disk
for src in re.findall(r'<img[^>]*src="(assets/img/[^"]+)"', html_nc):
    if not os.path.exists(os.path.join(ROOT, "site", src)):
        fails.append("Referenced image missing on disk: %s" % src)

# ------------------------------------------------------------------ 8. interactive hooks present
hooks = {
    "tracked stepper (data-tracked/data-track/data-step)":
        ("data-tracked" in html_nc and "data-track" in html_nc and "data-step" in html_nc),
    "scroll reveals (.rv)": bool(re.search(r'class="[^"]*\brv\b', html_nc)),
    "faq accordion (data-accordion)": "data-accordion" in html_nc,
    "standards marquee (data-marquee)": "data-marquee" in html_nc,
    "parallax (data-parallax)": "data-parallax" in html_nc,
    "why-it-matters interaction (comparison .compare panels)":
        ("compare" in html_nc),
}
for name, ok in hooks.items():
    if not ok:
        fails.append("Interactive hook missing: %s" % name)
# JS must actually wire the stepper, accordion, reveals
for needle, what in [("IntersectionObserver", "scroll reveals wiring"),
                     ("data-track", "stepper wiring"),
                     ("data-accordion", "faq wiring"),
                     ("classList.add('in')", "reveal .in toggle")]:
    if needle not in js:
        fails.append("v8.js does not wire %s (missing '%s')." % (what, needle))

# ------------------------------------------------------------------ 9. no em/en dashes in visible copy
# check rendered text: strip tags, ignore entities. Flag U+2014 (em) and U+2013 (en).
for ch, nm in [(u"—", "em-dash"), (u"–", "en-dash")]:
    if ch in html:
        fails.append("Visible copy contains an %s (banned)." % nm)
    if ch in css:
        warns.append("CSS contains an %s (comment only? check)." % nm)

# ------------------------------------------------------------------ 10. ONE shared grid: hero uses .wrap, no bespoke container
# strip css comments so commented-out code never trips the greps
css_nc = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
# hero must not re-implement a container: no padding-left on .hero__text, no bespoke 44rem cap
if re.search(r"\.hero__text\s*\{[^}]*padding-left", css_nc):
    fails.append("Hero re-implements a container: .hero__text sets padding-left (breaks the shared left edge).")
if re.search(r"\.hero__text\s*\{[^}]*max-width\s*:\s*44rem", css_nc):
    fails.append("Hero caps text at a bespoke max-width:44rem (must share the page measure).")
# hero text must live inside a .wrap in the markup
hero_html = re.search(r'<section class="hero">.*?</section>', html_nc, flags=re.S)
if not hero_html or not re.search(r'<div class="wrap">\s*<div class="hero__text">', hero_html.group(0), flags=re.S):
    fails.append("Hero text is not wrapped in the shared .wrap container.")
# no section-level block may re-implement the container triplet (max-width:var(--maxw)+margin-inline:auto) outside .wrap
for m in re.finditer(r"([.#][\w-]+)\s*\{([^}]*)\}", css_nc):
    sel, body = m.group(1), m.group(2)
    if sel == ".wrap":
        continue
    if "var(--maxw)" in body and re.search(r"margin-inline\s*:\s*auto", body):
        fails.append("Bespoke container clone re-implements .wrap: %s" % sel)
# GRID UNITY (general): EVERY top-level <section> must place its content in the ONE shared
# container class (class contains 'wrap'). No section may opt out and freestyle its own edge.
for sec in sections:
    m = re.search(r'class="([^"]*)"', sec)
    scls = m.group(1) if m else ""
    idm = re.search(r'id="([^"]*)"', sec)
    sid = idm.group(1) if idm else (scls.split() or ["unnamed"])[0]
    if not re.search(r'class="[^"]*\bwrap\b[^"]*"', sec):
        fails.append("Section '%s' has no shared .wrap container (breaks the one grid)." % sid)
# only ONE selector in the whole sheet may own the page gutter (padding-inline:var(--gut)) -> .wrap
gut_owners = [m2.group(1) for m2 in re.finditer(r"([.#][\w-]+)\s*\{([^}]*)\}", css_nc)
              if re.search(r"padding-inline\s*:\s*var\(--gut\)", m2.group(2))]
if [s for s in gut_owners if s != ".wrap"]:
    fails.append("More than one selector owns the page gutter (padding-inline:var(--gut)): %s"
                 % ", ".join(gut_owners))

# ------------------------------------------------------------------ 11. dead tokens removed (system cleanup)
for tok in ["--heading-xl", "--h1", "--h4", "--stat", "--pull-quote", "--main", "--site-margin", "--navy-2"]:
    if re.search(re.escape(tok) + r"\s*:", css_nc):
        fails.append("Dead token still declared in css: %s" % tok)
if ".cta--ghost" in css_nc:
    fails.append("Dead selector .cta--ghost still present in css.")

# ------------------------------------------------------------------ 12. tracked stepper has one photo per step
for n in ("01", "02", "03", "04"):
    if ("assets/img/step-%s.jpg" % n) not in html_nc:
        fails.append("Tracked step %s missing its photo (assets/img/step-%s.jpg)." % (n, n))
    if not os.path.exists(os.path.join(ROOT, "site", "assets", "img", "step-%s.jpg" % n)):
        fails.append("Tracked step photo missing on disk: assets/img/step-%s.jpg" % n)
tracked_html = re.search(r'<section class="tracked"[^>]*>.*?</section>', html_nc, flags=re.S)
if tracked_html and len(re.findall(r'class="tstep__media"', tracked_html.group(0))) < 4:
    fails.append("Tracked stepper does not have 4 .tstep__media photo slots.")
if not tracked_html:
    fails.append("Tracked stepper section not found.")
elif len(re.findall(r"<img\b", tracked_html.group(0))) < 3:
    fails.append("Tracked stepper has fewer than 3 <img> photos.")

# ------------------------------------------------------------------ 13. real footer (logo knockout + columns + honest legal)
ft_html = re.search(r'<footer class="ft">.*?</footer>', html_nc, flags=re.S)
if not ft_html:
    fails.append("No <footer class=\"ft\"> present.")
else:
    fb = ft_html.group(0)
    if "ft__grid" not in fb:
        fails.append("Footer is not a real multi-column footer (no .ft__grid).")
    if "assets/logo-white.png" not in fb:
        fails.append("Footer missing white-knockout logo (logo-white.png).")
    if len(re.findall(r'class="ft__col"', fb)) < 3:
        fails.append("Footer has fewer than 3 nav columns.")
    if not re.search(r"[Rr]egistration", fb):
        fails.append("Footer missing the honest registration legal line.")
    if "contact@develop-hta.com" not in fb:
        fails.append("Footer missing the contact email.")

# ------------------------------------------------------------------ verdict
if fails:
    print("FAILURES:")
    for f in fails:
        print("  - " + f)
    if warns:
        print("WARNINGS:")
        for w in warns:
            print("  - " + w)
    sys.exit(1)

if warns:
    print("WARNINGS:")
    for w in warns:
        print("  - " + w)
print("PASS: v8 parity green.")
print("  CTA sections: %d | sections scanned: %d" % (cta_sections, len(sections)))
sys.exit(0)
