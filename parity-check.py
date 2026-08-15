#!/usr/bin/env python3
"""Develop-HTA parity gate — deterministic convergence check for the v6 homepage.
Complements discipline-check.py (house rules). This one guards REFERENCE PARITY
to Wellcome Leap + the owner feedback: generative program grid, short/huge names,
photos removed, real interactivity, section order, colour/type discipline, copy
register. Only index.html is parity-checked. Exit non-zero on any FAIL.

Self-contained: reads site/index.html + site/css/dhta.css + site/js/dhta.js +
site/js/dhta-viz.js. Does not import discipline-check.
"""
import re, sys, os, html as _html

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(ROOT, "site")


def read(*parts):
    with open(os.path.join(SITE, *parts), encoding="utf-8") as fh:
        return fh.read()


HTML = read("index.html")
CSS = read("css", "dhta.css")
JS = read("js", "dhta.js")
VIZ = read("js", "dhta-viz.js")

fails, warns = [], []


def fail(rid, msg):
    fails.append((rid, msg))


def warn(rid, msg):
    warns.append((rid, msg))


def visible_text(h):
    h = re.sub(r"<script[\s\S]*?</script>", " ", h, flags=re.I)
    h = re.sub(r"<style[\s\S]*?</style>", " ", h, flags=re.I)
    h = re.sub(r"<svg[\s\S]*?</svg>", " ", h, flags=re.I)
    h = re.sub(r"<[^>]+>", " ", h)
    return h


def unescape(s):
    return _html.unescape(s).strip()


def wc(s):
    return len(re.findall(r"\S+", s.strip()))


def cc(s):
    return len(unescape(s))


def clamp_max(css, token):
    m = re.search(r"--" + re.escape(token) + r"\s*:\s*clamp\([^,]+,[^,]+,\s*([\d.]+)rem", css)
    return float(m.group(1)) if m else None


# ---- grid block slice: from class="tilegrid" to the first following </section>
gm = re.search(r'class="tilegrid"[\s\S]*?</section>', HTML)
GRID = gm.group(0) if gm else ""

VT = visible_text(HTML)

# ============================================================
# Group A — Program grid = generative canvas objects
# ============================================================
ncanvas = len(re.findall(r"<canvas\s+data-viz=", GRID))
nimg = len(re.findall(r"<img", GRID))
if ncanvas >= 4 and nimg == 0:
    pass
else:
    fail("A1", "program grid must be 4+ canvas motifs and zero <img> "
               "(found %d canvas, %d img)" % (ncanvas, nimg))

ntile = len(re.findall(r'class="tile2 ', GRID))
if 4 <= ntile <= 6:
    pass
else:
    fail("A2", "program grid must have 4 to 6 tiles (found %d)" % ntile)

KNOWN = {"burst", "molecular", "circuit", "rings", "mesh", "constellation", "bridge"}
motifs = re.findall(r'data-viz="([^"]+)"', GRID)
if motifs and len(motifs) == len(set(motifs)) and all(m in KNOWN for m in motifs):
    pass
else:
    fail("A3", "grid motifs must be distinct known motifs (got %s)" % motifs)

names = re.findall(r'<h3 class="tile2__name">(.*?)</h3>', GRID, flags=re.S)
breaches = []
hard = False
for nm in names:
    w, c = wc(unescape(nm)), cc(nm)
    if w > 3 or c > 20:
        breaches.append((unescape(nm), w, c))
    if w > 4 or c > 21:
        hard = True
if len(breaches) <= 1 and not hard:
    pass
else:
    b = breaches[0] if breaches else ("", 0, 0)
    fail("A4", "program name too long: '%s' (%d words, %d chars) - cap 3 words / 20 chars"
               % (b[0], b[1], b[2]))

ft, fh = clamp_max(CSS, "fs-tile"), clamp_max(CSS, "fs-h2")
if ft is not None and fh is not None and ft >= 3.0 and ft > fh:
    pass
else:
    fail("A5", "--fs-tile max must be >=3rem and > --fs-h2 max (tile=%srem, h2=%srem)"
               % (ft, fh))

descs = re.findall(r'<p class="tile2__desc">(.*?)</p>', GRID, flags=re.S)
bad_desc = None
for d in descs:
    if cc(d) > 80 or wc(unescape(d)) > 12:
        bad_desc = (unescape(d), cc(d), wc(unescape(d)))
        break
if bad_desc is None:
    pass
else:
    fail("A6", "tile sub-line too long: '%s' (%d chars / %d words) - cap 80 chars / 12 words"
               % bad_desc)

# ============================================================
# Group B — Photos removed / honest
# ============================================================
BANNED = ["tile1.jpg", "tile2.jpg", "tile3.jpg", "tile4.jpg",
          "evidence.jpg", "band.jpg", "consult.jpg", "serve.jpg"]
hit = [b for b in BANNED if b in HTML]
if not hit:
    pass
else:
    fail("B1", "banned stock photo still referenced: %s" % ", ".join(hit))

srcs = re.findall(r'src="(assets/[^"]+\.(?:jpg|png|webp))"', HTML, flags=re.I)
logos = {"assets/logo-transparent.png", "assets/logo-white.png"}
leftover = [s for s in srcs if s not in logos]
if not leftover:
    pass
else:
    fail("B2", "duplicate or leftover photo reference(s): %s" % ", ".join(leftover))

iv = HTML.find("js/dhta-viz.js")
ij = HTML.find("js/dhta.js")
if iv != -1 and ij != -1 and iv < ij:
    pass
else:
    fail("B3", "homepage must load js/dhta-viz.js before js/dhta.js")

# ============================================================
# Group C — Interactivity
# ============================================================
wm = re.search(r'id="workflow"[\s\S]*?</section>', HTML)
wblock = wm.group(0) if wm else ""
nstep = len(re.findall(r'class="step"', wblock))
if 'id="workflow"' in HTML and nstep >= 3:
    pass
else:
    fail("C1", "interactive stepper (#workflow with >=3 .step) missing (found %d)" % nstep)

if re.search(r"<canvas\s+data-viz=", wblock):
    pass
else:
    fail("C2", "stepper must include a generative canvas panel")

if "aria-selected" in JS and ("workflow" in JS or ".step" in JS):
    pass
else:
    fail("C3", "dhta.js must toggle stepper active state (aria-selected)")

has_guard = ("prefers-reduced-motion" in JS) or re.search(r"\breduce\b", JS)
has_timer = ("setInterval" in JS) or ("setTimeout" in JS)
if has_timer and has_guard:
    # co-location check (WARN only): auto-advance interval guarded by reduce
    if not re.search(r"reduce[\s\S]{0,120}setInterval", JS):
        warn("C4", "auto-advance timer present; reduced-motion guard not clearly co-located")
elif has_timer and not has_guard:
    fail("C4", "auto-advance present without a prefers-reduced-motion guard")

# ============================================================
# Group D — Section sequence / geometry
# ============================================================
ANCHORS = [
    ("hero", r'class="hero"'),
    ("thesis", r'class="(?:hta-def|thesis)'),
    ("big-statement", r'statement--center'),
    ("program grid", r'class="tilegrid"'),
    ("bridge", r'class="bridge-sec'),
    ("stepper", r'id="workflow"'),
    ("who-we-serve", r'class="who[\s"]'),
    ("knowledge ledger", r'class="ledger[\s"]'),
    ("cta band", r'class="band"'),
]
idxs, order_ok = [], True
for nm, pat in ANCHORS:
    m = re.search(pat, HTML)
    if not m:
        fail("D1", "section '%s' missing or out of order" % nm)
        order_ok = False
        idxs.append(None)
    else:
        idxs.append(m.start())
if order_ok:
    for k in range(1, len(idxs)):
        if idxs[k] <= idxs[k - 1]:
            fail("D1", "section '%s' missing or out of order" % ANCHORS[k][0])
            break

ig = re.search(r'class="tilegrid"', HTML)
iw = re.search(r'class="who[\s"]', HTML)
ip = re.search(r'class="portraits', HTML)
if ig and iw and ip and ig.start() < iw.start() and ig.start() < ip.start():
    pass
else:
    fail("D2", "program grid must appear above who-we-serve/founders")

# ============================================================
# Group E — Colour + type discipline
# ============================================================
# E1: green (#5CB85C / #8FD98F) never on a UI colour property in CSS; artwork-only.
GREENS = ("#5cb85c", "#8fd98f")
ui_props = re.compile(r"(?:^|[;{])\s*(color|border[a-z-]*|outline[a-z-]*|stroke|fill|"
                      r"background(?:-color)?|box-shadow|text-shadow)\s*:\s*([^;{}]*)", re.I)
green_ui = None
for m in ui_props.finditer(CSS):
    prop, val = m.group(1).lower(), m.group(2).lower()
    if any(g in val for g in GREENS):
        green_ui = (prop, val.strip()[:40])
        break
# also: literal green in HTML visible text / inline styles
green_html = any(g in VT.lower() for g in GREENS) or \
    any(g in v.lower() for v in re.findall(r'style="([^"]*)"', HTML) for g in [GREENS[0], GREENS[1]])
if green_ui is None and not green_html:
    pass
else:
    ctx = ("%s:%s" % green_ui) if green_ui else "inline HTML"
    fail("E1", "green (#5CB85C) used on UI/text - green is artwork-only (near '%s')" % ctx)

ma = re.search(r"--accent\s*:\s*(#[0-9a-fA-F]{6})", CSS)
if ma and ma.group(1).lower() == "#14808c":
    pass
else:
    fail("E2", "--accent must be #14808C (found %s)" % (ma.group(1) if ma else "none"))

md = re.search(r"--display\s*:\s*([^;]+);", CSS)
ms = re.search(r"--sans\s*:\s*([^;]+);", CSS)
fams = set(re.findall(r"font-family:\s*'([^']+)'", CSS))
extra = fams - {"Poppins", "Mulish"}
if md and "Poppins" in md.group(1) and ms and "Mulish" in ms.group(1) and not extra:
    pass
else:
    fail("E3", "display font must be Poppins, body Mulish; unexpected family %s"
               % (extra or "n/a"))

# ============================================================
# Group F — Copy register
# ============================================================
dash = None
for ch, lbl in [("—", "em"), ("–", "en")]:
    if ch in VT:
        seg = VT.split(ch)[0].strip()[-40:]
        dash = (lbl, seg)
        break
if dash is None:
    pass
else:
    fail("F1", "%s dash in copy near '%s'" % dash)

h1m = re.search(r"<h1[^>]*>([\s\S]*?)</h1>", HTML)
h1w = wc(re.sub(r"<[^>]+>", " ", h1m.group(1))) if h1m else 99
if h1w <= 12:
    pass
else:
    fail("F2", "hero H1 must be <=12 words (found %d)" % h1w)

sm = re.search(r'statement--center[^>]*>([\s\S]*?)</p>', HTML)
sw = wc(re.sub(r"<[^>]+>", " ", sm.group(1))) if sm else 99
if sw <= 12:
    pass
else:
    fail("F3", "big-statement line must be <=12 words (found %d)" % sw)

# F4: <p> direct children of .bridge-inner / .band__inner (support lines) <=120 chars
band_p = []
for cls in ("bridge-inner", "band__inner"):
    bm = re.search(r'class="' + cls + r'[^"]*"[^>]*>([\s\S]*?)</div>', HTML)
    if bm:
        band_p += re.findall(r"<p[^>]*>([\s\S]*?)</p>", bm.group(1))
long_band = None
for p in band_p:
    t = re.sub(r"<[^>]+>", " ", p)
    if cc(t) > 120:
        long_band = (unescape(t)[:60], cc(t))
        break
if long_band is None:
    pass
else:
    fail("F4", "band support copy >120 chars: '%s' (%d)" % long_band)

# F5 (WARN): any body <p> > 45 words
for p in re.findall(r"<p[^>]*>([\s\S]*?)</p>", HTML):
    t = re.sub(r"<[^>]+>", " ", p)
    if wc(t) > 45:
        warn("F5", "long paragraph (%d words): '%s...'" % (wc(t), unescape(t)[:50]))

# F6 (WARN): all-caps kicker as immediate sibling directly above <h1>
if re.search(r'class="eyebrow"[\s\S]{0,80}<h1', HTML):
    warn("F6", "all-caps kicker sits directly on the H1")

# ============================================================
# OUTPUT
# ============================================================
print("Parity check - index.html")
order = ["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3",
         "C1", "C2", "C3", "C4", "D1", "D2", "E1", "E2", "E3",
         "F1", "F2", "F3", "F4", "F5", "F6"]
fmap = {}
for rid, msg in fails:
    fmap.setdefault(rid, []).append(msg)
wmap = {}
for rid, msg in warns:
    wmap.setdefault(rid, []).append(msg)
for rid in order:
    if rid in fmap:
        for m in fmap[rid]:
            print("FAIL %s: %s" % (rid, m))
    elif rid in wmap:
        for m in wmap[rid]:
            print("WARN %s: %s" % (rid, m))
    else:
        print("PASS %s" % rid)

print("\n%d failures, %d warnings" % (len(fails), len(warns)))
if fails:
    print("\nFAILURES:")
    for rid, m in fails:
        print("  X %s: %s" % (rid, m))
    sys.exit(1)
print("\nPASS: parity gate green.")
sys.exit(0)
