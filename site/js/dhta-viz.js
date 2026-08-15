/* Develop-HTA generative visual system
   Replaces stock/commissioned imagery with on-brand abstract art that echoes
   the logo (circuit + network + medical cross). Canvas, brand palette, lean.
   Motifs: constellation (hero + bridge), burst, molecular, circuit, rings, mesh.
   Respects prefers-reduced-motion (renders one static frame, no loop). */
(function () {
  'use strict';
  var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var C = {
    navy:  '#123A5E', navyD: '#0E2C46', navyL: '#1E4E77',
    teal:  '#1A9AA8', tealD: '#14808C', tealL: '#5FC6D0',
    green: '#5CB85C', greenL: '#8FD98F',
    light: '#EAF1F3', line: 'rgba(122,168,190,'
  };

  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function fit(cv) {
    var r = cv.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.max(1, Math.round(r.width * dpr));
    cv.height = Math.max(1, Math.round(r.height * dpr));
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: r.width, h: r.height };
  }
  function cross(ctx, x, y, s, col) {
    ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, s * 0.28); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s);
    ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.stroke();
  }

  /* ---- constellation: nodes + proximity links, one cross node, subtle drift ---- */
  function makeConstellation(w, h, seed, opts) {
    var rand = mulberry32(seed);
    opts = opts || {};
    var n = opts.count || Math.round(Math.min(46, Math.max(16, w * h / 9000)));
    var pts = [], i;
    for (i = 0; i < n; i++) {
      pts.push({
        x: rand() * w, y: rand() * h,
        vx: (rand() - 0.5) * 0.12, vy: (rand() - 0.5) * 0.12,
        r: 1.4 + rand() * 2.2,
        c: rand() < 0.16 ? (rand() < 0.5 ? C.teal : C.green) : (opts.dark ? 'rgba(180,210,225,0.7)' : C.navy)
      });
    }
    var crossPt = pts[Math.floor(rand() * pts.length)];
    var linkC = opts.dark ? 'rgba(120,190,205,' : 'rgba(30,78,119,';
    var D = opts.link || 118;
    return function (ctx, t) {
      var j, k, a, b, dx, dy, d;
      for (j = 0; j < pts.length; j++) {
        a = pts[j];
        if (!REDUCE) { a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1; }
      }
      for (j = 0; j < pts.length; j++) {
        a = pts[j];
        for (k = j + 1; k < pts.length; k++) {
          b = pts[k]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.strokeStyle = linkC + (0.5 * (1 - d / D)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (j = 0; j < pts.length; j++) {
        a = pts[j];
        if (a === crossPt) continue;
        ctx.fillStyle = a.c;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
      // highlighted medical-cross node
      ctx.save();
      ctx.fillStyle = opts.dark ? 'rgba(20,128,140,0.18)' : 'rgba(20,128,140,0.12)';
      ctx.beginPath(); ctx.arc(crossPt.x, crossPt.y, 13, 0, 6.2832); ctx.fill();
      cross(ctx, crossPt.x, crossPt.y, 6, C.tealD);
      ctx.restore();
    };
  }

  /* ---- bridge: two node clusters joined across a gap, center join node ---- */
  function makeBridge(w, h, seed, dark) {
    var rand = mulberry32(seed), i;
    function cluster(cx) { var a = []; for (i = 0; i < 9; i++) a.push({ x: cx + (rand() - 0.5) * w * 0.22, y: h * 0.5 + (rand() - 0.5) * h * 0.7, r: 1.6 + rand() * 2.4 }); return a; }
    var L = cluster(w * 0.2), R = cluster(w * 0.8);
    var mid = { x: w * 0.5, y: h * 0.5 };
    var nodeC = dark ? 'rgba(180,210,225,0.7)' : C.navy;
    var linkC = dark ? 'rgba(120,190,205,0.35)' : 'rgba(30,78,119,0.28)';
    return function (ctx, t) {
      var i, p;
      ctx.strokeStyle = linkC; ctx.lineWidth = 1;
      for (i = 0; i < L.length; i++) { ctx.beginPath(); ctx.moveTo(L[i].x, L[i].y); ctx.lineTo(mid.x, mid.y); ctx.stroke(); }
      for (i = 0; i < R.length; i++) { ctx.beginPath(); ctx.moveTo(R[i].x, R[i].y); ctx.lineTo(mid.x, mid.y); ctx.stroke(); }
      // gradient bridge line
      var g = ctx.createLinearGradient(w * 0.2, 0, w * 0.8, 0);
      g.addColorStop(0, C.navy); g.addColorStop(0.55, C.teal); g.addColorStop(1, C.green);
      ctx.strokeStyle = g; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(w * 0.2, h * 0.5); ctx.lineTo(w * 0.8, h * 0.5); ctx.stroke();
      ctx.fillStyle = nodeC;
      [L, R].forEach(function (cl) { for (i = 0; i < cl.length; i++) { p = cl[i]; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); } });
      var pulse = REDUCE ? 0 : Math.sin(t / 700) * 2;
      ctx.fillStyle = 'rgba(20,128,140,0.16)'; ctx.beginPath(); ctx.arc(mid.x, mid.y, 16 + pulse, 0, 6.2832); ctx.fill();
      cross(ctx, mid.x, mid.y, 7, C.tealD);
    };
  }

  /* ---- shared base: color depth glow so tiles read bold like the reference ---- */
  function baseGlow(ctx, w, h, seed, dark, hue) {
    var rand = mulberry32(seed * 3 + 1), i, x, y, r, g;
    var cols = hue === 'green' ? [C.green, C.teal, C.navyL] :
               hue === 'teal' ? [C.teal, C.tealL, C.green] : [C.teal, C.navyL, C.green];
    for (i = 0; i < 3; i++) {
      x = w * (0.2 + rand() * 0.6); y = h * (0.08 + rand() * 0.34); r = Math.max(w, h) * (0.5 + rand() * 0.45);
      g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, cols[i] + (dark ? '4D' : '30')); g.addColorStop(1, cols[i] + '00');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
  }
  /* ---- static tile motifs (bold) ---- */
  function drawBurst(ctx, w, h, seed, dark) {
    var rand = mulberry32(seed), cx = w * (0.42 + rand() * 0.24), cy = h * (0.26 + rand() * 0.1), rays = 48, i, a, len, x2, y2, c;
    ctx.lineCap = 'round';
    for (i = 0; i < rays; i++) {
      a = (i / rays) * 6.2832 + rand() * 0.08; len = Math.min(w, h) * (0.32 + rand() * 0.42);
      x2 = cx + Math.cos(a) * len; y2 = cy + Math.sin(a) * len;
      c = i % 4 === 0 ? C.green : (dark ? C.tealL : C.teal);
      ctx.strokeStyle = c; ctx.globalAlpha = dark ? 0.85 : 0.7; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x2, y2, 2.6, 0, 6.2832); ctx.fill();
    }
    ctx.fillStyle = dark ? '#fff' : C.navy; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 6.2832); ctx.fill();
  }
  function drawMolecular(ctx, w, h, seed, dark) {
    var rand = mulberry32(seed), K = 4, i, j, cx, cy, orb, ox, oy, aa, rad, c;
    for (i = 0; i < K; i++) {
      cx = w * (0.2 + rand() * 0.6); cy = h * (0.12 + rand() * 0.34);
      orb = 5 + Math.floor(rand() * 4); rad = 22 + rand() * 24;
      for (j = 0; j < orb; j++) {
        aa = (j / orb) * 6.2832; ox = cx + Math.cos(aa) * rad; oy = cy + Math.sin(aa) * rad;
        ctx.strokeStyle = dark ? 'rgba(150,215,225,0.6)' : 'rgba(20,128,140,0.5)'; ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ox, oy); ctx.stroke();
        c = j % 3 === 0 ? C.green : (dark ? C.tealL : C.teal);
        ctx.fillStyle = c; ctx.beginPath(); ctx.arc(ox, oy, 3.2, 0, 6.2832); ctx.fill();
      }
      ctx.fillStyle = dark ? '#fff' : C.navy; ctx.beginPath(); ctx.arc(cx, cy, 5.5, 0, 6.2832); ctx.fill();
    }
  }
  function drawCircuit(ctx, w, h, seed, dark) {
    var rand = mulberry32(seed), lines = 9, i, x, y, steps, s, nx, ny, c;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (i = 0; i < lines; i++) {
      x = rand() * w * 0.5; y = (i + 0.5) / lines * h * 0.62;
      c = i % 3 === 0 ? (dark ? C.tealL : C.teal) : (i % 3 === 1 ? C.green : (dark ? 'rgba(160,205,220,0.75)' : 'rgba(30,78,119,0.6)'));
      ctx.strokeStyle = c; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, y);
      steps = 4 + Math.floor(rand() * 3);
      for (s = 0; s < steps; s++) {
        if (s % 2 === 0) { nx = x + (36 + rand() * 66); ny = y; } else { nx = x; ny = y + (rand() - 0.5) * 66; }
        ctx.lineTo(nx, ny); x = nx; y = ny;
      }
      ctx.stroke();
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 6.2832); ctx.fill();
    }
  }
  function drawRings(ctx, w, h, seed, dark) {
    var rand = mulberry32(seed), cx = w * (0.4 + rand() * 0.26), cy = h * (0.24 + rand() * 0.14), i, r, c;
    for (i = 0; i < 9; i++) {
      r = 12 + i * (Math.min(w, h) * 0.062);
      c = i % 3 === 0 ? C.green : (i % 3 === 1 ? (dark ? C.tealL : C.teal) : (dark ? 'rgba(150,205,220,0.55)' : 'rgba(20,128,140,0.5)'));
      ctx.strokeStyle = c; ctx.lineWidth = i % 3 === 0 ? 2.4 : 1.4;
      ctx.beginPath(); ctx.arc(cx, cy, r, rand() * 1.4, 4.8 + rand() * 1.2); ctx.stroke();
    }
    ctx.fillStyle = dark ? '#fff' : C.navy; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, 6.2832); ctx.fill();
  }
  function drawMesh(ctx, w, h, seed, dark) {
    var rand = mulberry32(seed), i, x, y, r, g, cols = [C.navy, C.teal, C.green];
    for (i = 0; i < 5; i++) {
      x = rand() * w; y = rand() * h; r = 50 + rand() * 100;
      g = ctx.createRadialGradient(x, y, 0, x, y, r);
      var col = cols[i % 3];
      g.addColorStop(0, col + (dark ? '66' : '44')); g.addColorStop(1, col + '00');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
  }
  var MOTIFS = { burst: drawBurst, molecular: drawMolecular, circuit: drawCircuit, rings: drawRings, mesh: drawMesh };
  var HUES = { circuit: 'teal', molecular: 'green', rings: 'green', burst: 'teal', mesh: 'teal' };

  function initStatic(cv) {
    var f = fit(cv), kind = cv.getAttribute('data-viz'), seed = parseInt(cv.getAttribute('data-seed') || '7', 10);
    var dark = cv.getAttribute('data-dark') === '1';
    f.ctx.clearRect(0, 0, f.w, f.h);
    baseGlow(f.ctx, f.w, f.h, seed, dark, HUES[kind] || 'teal');
    (MOTIFS[kind] || drawMolecular)(f.ctx, f.w, f.h, seed, dark);
  }
  function initAnimated(cv, make) {
    var f = fit(cv), seed = parseInt(cv.getAttribute('data-seed') || '11', 10);
    var dark = cv.getAttribute('data-dark') === '1';
    var draw = make(f.w, f.h, seed, dark);
    f.ctx.clearRect(0, 0, f.w, f.h); draw(f.ctx, 0); // paint one frame immediately so it never blanks if rAF is throttled/paused
    if (REDUCE) return;
    var raf;
    function loop(ts) { f.ctx.clearRect(0, 0, f.w, f.h); draw(f.ctx, ts); raf = requestAnimationFrame(loop); }
    raf = requestAnimationFrame(loop);
    // pause offscreen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { if (!raf) raf = requestAnimationFrame(loop); }
        else { cancelAnimationFrame(raf); raf = 0; }
      }, { threshold: 0 }).observe(cv);
    }
  }

  function boot() {
    document.querySelectorAll('canvas[data-viz]').forEach(function (cv) {
      var k = cv.getAttribute('data-viz');
      if (k === 'constellation') initAnimated(cv, function (w, h, s, d) { return makeConstellation(w, h, s, { dark: d, count: cv.getAttribute('data-count') ? +cv.getAttribute('data-count') : 0 || undefined }); });
      else if (k === 'bridge') initAnimated(cv, function (w, h, s, d) { return makeBridge(w, h, s, d); });
      else initStatic(cv);
    });
  }
  // small public hook so the interactive stepper can re-render a canvas after
  // swapping its data-viz / data-seed (static motifs only)
  window.DHTAViz = { redraw: initStatic };

  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);

  // re-fit on resize (debounced) — static tiles redraw, animated re-fit
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      document.querySelectorAll('canvas[data-viz]').forEach(function (cv) {
        var k = cv.getAttribute('data-viz');
        if (k !== 'constellation' && k !== 'bridge') initStatic(cv);
      });
    }, 200);
  }, { passive: true });
})();
