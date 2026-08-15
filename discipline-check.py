#!/usr/bin/env python3
"""Develop-HTA discipline linter — deterministic gate before any human eye.
Scoped to the v10 ship page (site/v10.html + css/v10.css + js/v10.js). The old
v4 pages (dhta.css / site-header / Poppins) are legacy and not gated here.
Checks the house rules that must ALWAYS hold (mechanical, not vibes):
  1. No em/en dashes in visible copy.
  2. Type sprawl: no @font-face families beyond the two locked (Fraunces, Mulish).
  3. Wiring: the page links css/v10.css + js/v10.js; nav + footer present.
  4. Exactly one <h1>; title + meta description present.
  5. Motion primitives don't regress: no scroll-behavior:smooth (conflicts with
     Lenis), Lenis never uses the floaty lerp config.
Exit non-zero on any FAIL.
"""
import re, sys, os

ROOT = os.path.dirname(__file__)
SITE = os.path.join(ROOT, "site")
HTML = os.path.join(SITE, "v10.html")
CSS  = os.path.join(SITE, "css", "v10.css")
JS   = os.path.join(SITE, "js", "v10.js")
fails, warns = [], []

def visible_text(html):
    html = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    html = re.sub(r"<style[\s\S]*?</style>", " ", html, flags=re.I)
    html = re.sub(r"<svg[\s\S]*?</svg>", " ", html, flags=re.I)
    html = re.sub(r"<[^>]+>", " ", html)
    return html

html = open(HTML, encoding="utf-8").read()
txt = visible_text(html)

# 1. dashes in visible copy
for ch, label in [("—", "em dash"), ("–", "en dash")]:
    if ch in txt:
        ctx = txt.split(ch)[0].strip()[-60:]
        fails.append(f"v10.html: {label} found in copy near '...{ctx}'")

# 3. wiring
if "css/v10.css" not in html:
    fails.append("v10.html: does not link css/v10.css")
if "js/v10.js" not in html:
    fails.append("v10.html: does not link js/v10.js")
if 'class="nav"' not in html:
    fails.append("v10.html: missing nav")
if 'class="ft"' not in html:
    fails.append("v10.html: missing footer")

# 4. one h1 + title + description
h1s = re.findall(r"<h1[ >]", html)
if len(h1s) != 1:
    fails.append(f"v10.html: expected exactly one <h1>, found {len(h1s)}")
if "<title>" not in html:
    fails.append("v10.html: missing <title>")
if 'name="description"' not in html:
    warns.append("v10.html: missing meta description")

# 2. type sprawl on the shared CSS
css = open(CSS, encoding="utf-8").read()
fams = set(re.findall(r"font-family:\s*'([^']+)'", css))
allowed = {"Fraunces", "Mulish"}
extra = fams - allowed
if extra:
    fails.append(f"v10.css: unexpected font families {extra}")

# 5. motion-primitive drift
for m in re.finditer(r"scroll-behavior\s*:\s*smooth", css):
    seg = css[max(0, m.start()-80):m.start()]
    if "prefers-reduced-motion" not in seg:
        fails.append("v10.css: scroll-behavior:smooth present (conflicts with Lenis; use auto)")
if os.path.exists(JS):
    js = open(JS, encoding="utf-8").read()
    if re.search(r"new\s+(window\.)?Lenis\([^)]*lerp\s*:", js):
        fails.append("v10.js: Lenis uses lerp (must be duration/easing + gsap.ticker)")

print("Checked v10.html + v10.css + v10.js")
if warns:
    print("\nWARNINGS:")
    for w in warns: print("  ! " + w)
if fails:
    print("\nFAILURES:")
    for f in fails: print("  X " + f)
    sys.exit(1)
print("\nPASS: discipline gate green.")
