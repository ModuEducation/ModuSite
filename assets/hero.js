/* ============================================================================
   MODU HERO — GSAP 3 timeline
   ----------------------------------------------------------------------------
   TIMELINE SECTIONS (edit the T object below to retime; sub-events are offsets
   from their section start, so moving a section moves everything inside it)

     T.HOOK      0.00s   headline springs in, squashes to a purple seed
     T.MESS      1.60s   seed bursts into the pile of grey legacy material
     T.ENGINE    3.55s   Modu AI pill lands, scanline sweeps, pile is absorbed
     T.CLARITY   4.60s   clean cards snap out, interact, glide into the phone
     T.INSIGHTS  7.80s   camera pulls back, lecturer dashboard, drills go back
     T.RESOLVE  10.50s   everything condenses to the seed, which opens into "The"
     T.END      12.00s   loop point (last frame == first frame)
   ========================================================================== */
(function () {
  'use strict';

  const T = { HOOK: 0, MESS: 1.6, ENGINE: 3.55, CLARITY: 4.6, INSIGHTS: 7.8, RESOLVE: 10.5, END: 12 };

  function initModuHero(root) {
    const gs = window.gsap;
    if (!gs || !root) return { destroy() {}, timeline() { return null; } };

    const q = (s, c) => (c || root).querySelector(s);
    const qa = (s, c) => Array.from((c || root).querySelectorAll(s));
    const rnd = (a, b) => a + Math.random() * (b - a);
    const S = v => ({ scaleX: v, scaleY: v });
    const mm = qs => (window.matchMedia ? window.matchMedia(qs) : { matches: false, addEventListener() {}, removeEventListener() {} });

    const vp = q('.mh-viewport'), stage = q('.mh-stage'), scene = q('#scene');
    const el = {
      head: q('#headWrap'), words: qa('#headline .w'), seed: q('#seed'), ring: q('#ring'), bloom: q('#bloom'),
      orb: q('#orb'), scan: q('#scan'), note: q('#cNote'), flash: q('#cFlash'), flip: q('#cFlash .flip'),
      quiz: q('#cQuiz'), puzzle: q('#cPuzzle'), streak: q('#cStreak'), cursor: q('#cursor'), xp: q('#xp'),
      phone: q('#phone'), toast: q('#toast'), dash: q('#dash'), dot: q('#dot'), flame: q('#flame'),
      sfill: q('#sfill'), optA: q('#optA'), optB: q('#optB'), anchor: q('#mAnchor'), pz: q('#pz'),
      sbox: q('#sbox'), send: q('#send')
    };
    const oB = { of: q('.of', el.optB), fill: q('.fill', el.optB), t1: q('.t1', el.optB), t2: q('.t2', el.optB), l2: q('.l2', el.optB), chk: q('.chk', el.optB) };
    const dq = {
      f1: q('#f1'), f2: q('#f2'), p1: q('#pc1'), p2: q('#pc2'), flag: q('#flag'), colh: qa('.colh span'),
      rec1: q('#rec1'), rec2: q('#rec2'), spk1: q('#spk1'), spk2: q('#spk2'), sendF: q('.bf', el.send)
    };

    /* ---------- the "before": grey legacy material ---------- */
    const MESS = [
      { w: 190, h: 170, c: '', t: 'CS210 · Lecture 7 — Recursion', b: '7.1 A recursive function is defined in terms of itself. Every recursive definition requires (i) one or more base cases, solved directly, and (ii) a recursive step that reduces the problem towards a base case. Failure to satisfy (ii) ⇒ non-termination. See also tail recursion §7.4, mutual recursion §7.5 and the link to induction (L2). Ex. 7.1.1  n! = n·(n−1)!, 0! = 1. Show fact(n) terminates ∀ n ∈ ℕ. Call stack depth O(n) — large n may cause stack overflow. NB: memoisation (§7.6) not examinable unless stated in tutorial 4. Revision: re-read pp. 112–131.' },
      { w: 200, h: 150, c: '', t: 'UNIVERSITY EXAMINATION 2019', b: 'CS210 Data Structures &amp; Algorithms\nTime allowed: 2 hours. Answer ALL of Section A and TWO of Section B.\nQ4 (a) Define a hash table. [3]\n(b) Prove that, under simple uniform hashing, the expected cost of an unsuccessful search is Θ(1 + α). [9]\n(c) Contrast open addressing with chaining. [4]\nQ5 (a) State the Master Theorem. [4] (b) Hence solve T(n) = 4T(n/2) + n². [6]' },
      { w: 190, h: 160, c: 'code', t: 'recursive_solve.pseudo', b: 'function SOLVE(A, lo, hi)\n  if hi − lo &lt; 2 then\n    return A[lo]\n  mid ← ⌊(lo+hi)/2⌋\n  L ← SOLVE(A, lo, mid)\n  R ← SOLVE(A, mid, hi)\n  if L.key &lt; R.key then\n    return MERGE(L, R, lo, mid, hi)\n  else\n    return MERGE(R, L, lo, mid, hi)\n  end if\nend function\n// T(n)=2T(n/2)+Θ(n)' },
      { w: 200, h: 110, c: '', t: 'Formula sheet', b: 'T(n) = 2T(n/2) + Θ(n) ⇒ Θ(n log n)\nΣ i=1..n i = n(n+1)/2   Σ 2^i = 2^(n+1) − 1\nH(X) = −Σ p(x) log₂ p(x)\nlog_b a = ln a / ln b   n! ≈ √(2πn)(n/e)^n\nMaster: a ≥ 1, b &gt; 1, f(n) = Θ(n^{log_b a} log^k n)\n⇒ T(n) = Θ(n^{log_b a} log^{k+1} n)\nE[X] = Σ x·P(X=x)' },
      { w: 210, h: 130, c: 'slide', t: 'Hash Tables (cont.)', b: '• Hash function h: U → {0,…,m−1}\n• Collisions: chaining / open addressing\n• Load factor α = n/m\n• Linear probing, quadratic probing, double hashing\n• Resize when α &gt; 0.75 (amortised O(1))\n• Universal hashing  • Perfect hashing (FKS)\n• Cuckoo hashing  • Robin Hood hashing\n• Deletion: tombstones!!\n• See Cormen Ch. 11  • Tutorial 6 Q3–Q9' },
      { w: 180, h: 170, c: '', t: 'CS210 · Lecture 9 — Graphs', b: '9.1 A graph G = (V, E) consists of a set V of vertices and a set E ⊆ V×V of edges. G is directed if E is a set of ordered pairs. Representations: adjacency matrix Θ(|V|²) space; adjacency list Θ(|V|+|E|). BFS explores level by level using a queue; DFS uses a stack (or recursion). Dijkstra: non-negative weights only. Bellman–Ford handles negative weights, detects negative cycles in O(|V||E|). Topological sort exists iff G is a DAG. MST: Kruskal (union–find) / Prim (priority queue)…' },
      { w: 190, h: 150, c: '', t: 'Quiz 3 (2018) — Name: ________', b: 'Q1. Worst-case time of quicksort?\n (a) O(n)  (b) O(n log n)  (c) O(n²)  (d) O(2ⁿ)\nQ2. Which structure gives O(1) average lookup?\n (a) BST (b) hash table (c) heap (d) list\nQ3. Height of a complete binary tree with n nodes?\nQ4. Define amortised cost.\nQ5. True/False: Dijkstra works with negative edges.\nQ6. Trace insertion sort on [5,2,4,6,1,3].\nQ7. Explain the base case of mergesort.' },
      { w: 180, h: 140, c: '', t: 'Tutorial 5 — Trees', b: '1. Draw the BST obtained by inserting 8, 3, 10, 1, 6, 14, 4, 7, 13 in that order.\n2. Define the height of a node and of a tree.\n3. Show that a binary tree with n nodes has height ≥ ⌊log₂ n⌋.\n4. Give pseudocode for in-order traversal (recursive and iterative).\n5. Delete 3 and then 8 from your tree from Q1.\n6. What is the worst-case height of an AVL tree?\n7. Prove the AVL rotation preserves BST order.' }
    ];
    const messEls = MESS.map(m => {
      const d = document.createElement('div');
      d.className = 'el mc' + (m.c ? ' ' + m.c : '');
      d.style.width = m.w + 'px'; d.style.height = m.h + 'px';
      d.innerHTML = '<div class="mi"><div class="mt">' + m.t + '</div><div class="mb">' + m.b + '</div></div>';
      scene.insertBefore(d, el.anchor);
      return d;
    });
    const messIn = messEls.map(c => c.firstChild);
    const trails = messEls.map(() => { const t = document.createElement('div'); t.className = 'trail'; scene.insertBefore(t, el.anchor); return t; });

    /* ---------- puzzle (tree) ---------- */
    const PZ = { root: [149, 20], l: [80, 66], r: [218, 66], ll: [40, 112], slot: [120, 112], loose: [262, 116] };
    const mkEdge = (a, b) => {
      const A = PZ[a], B = PZ[b], dx = B[0] - A[0], dy = B[1] - A[1];
      const d = document.createElement('div'); d.className = 'edge';
      d.style.width = Math.hypot(dx, dy) + 'px';
      d._p = { x: A[0], y: A[1] - 1.5, a: Math.atan2(dy, dx) * 180 / Math.PI };
      el.pz.appendChild(d); return d;
    };
    const edges = [mkEdge('root', 'l'), mkEdge('root', 'r'), mkEdge('l', 'll'), mkEdge('l', 'slot')];
    const mkNode = (key, label, cls) => {
      const d = document.createElement('div'); d.className = 'nd' + (cls ? ' ' + cls : '');
      d.innerHTML = '<b class="g"></b>' + (label ? '<span>' + label + '</span>' : '');
      d._k = key; el.pz.appendChild(d); return d;
    };
    const nRoot = mkNode('root', '8'), nL = mkNode('l', '3'), nR = mkNode('r', '10'), nLL = mkNode('ll', '1');
    const nSlot = mkNode('slot', '', 'slot'), nPulse = mkNode('slot', '', 'pulse'), nLoose = mkNode('loose', '6');
    const treeNodes = [nRoot, nL, nR, nLL];
    const nodeG = nLoose.querySelector('.g');

    /* ---------- students ---------- */
    const INIT = ['AO', 'MK', 'SL', 'JD', 'RB', 'NP', 'TC', 'EM', 'LH'], GRP = [0, 1, 2, 0, 1, 2, 0, 1, 2];
    const AVC = [['#E1F5EE', '#0F6E56'], ['#EEEDFE', '#534AB7'], ['#FAEEDA', '#854F0B']];
    const avs = INIT.map((s, i) => {
      const d = document.createElement('div'); d.className = 'av'; d.textContent = s;
      d.style.background = AVC[GRP[i]][0]; d.style.color = AVC[GRP[i]][1];
      el.sbox.appendChild(d); return d;
    });

    /* ---------- helpers ---------- */
    const rel = (n, a) => { let x = 0, y = 0; while (n && n !== a) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x, y }; };
    const anchorOf = (n, a, pos, s, ox, oy) => {
      const r = rel(n, a);
      return {
        x: pos[0] + (r.x + (ox != null ? ox : n.offsetWidth / 2) - a.offsetWidth / 2) * s,
        y: pos[1] + (r.y + (oy != null ? oy : n.offsetHeight / 2) - a.offsetHeight / 2) * s
      };
    };

    /* ---------- state ---------- */
    const reduce = mm('(prefers-reduced-motion: reduce)');
    let tl = null, L = null, mode = null, inView = true, tabVis = !document.hidden, destroyed = false;
    let avRow = [], avShuf = [], avTgt = [], P = {};

    /* ---------- layouts ---------- */
    const D_MESS = [[-430, -125, -9], [-280, 95, 6], [-125, -170, -4], [60, 100, 8], [225, -110, -6], [425, 55, 10], [-45, -10, 3], [395, -205, -5]];
    const M_MESS = [[-85, -250, -9], [85, -195, 6], [-95, -110, -4], [90, -20, 8], [-70, 60, -6], [95, 130, 10], [0, -60, 3], [-60, 225, -5]];

    function layoutFor(m) {
      if (!m) return {
        m: false, W: 1440, H: 720, cam: .88, ms: 1, cs: 1, mess: D_MESS, scanV: false,
        clr: { note: [-300, -150], flash: [0, -150], quiz: [300, -150], puzzle: [-150, 140], streak: [200, 140] },
        p1S: 1, p2S: 1, phoneX: -430, phoneY: 0, dashS: 1, dashX: 200, dashY: 0, bloomS: 1
      };
      const l = {
        m: true, W: 390, H: 680, cam: .9, ms: .64, cs: .56, mess: M_MESS, scanV: true,
        clr: { note: [-88, -172], flash: [88, -176], quiz: [-88, -24], puzzle: [88, -14], streak: [0, 126] },
        p1S: .8, dashS: .85, dashX: 0, bloomS: 1, phoneX: 0
      };
      return l;
    }

    function fit() {
      const cw = root.clientWidth || L.W;
      const sc = L.m ? Math.min(cw / L.W, 1.35) : cw / L.W;
      stage.style.width = L.W + 'px'; stage.style.height = L.H + 'px';
      stage.style.transform = 'scale(' + sc + ')';
      stage.style.left = ((cw - L.W * sc) / 2) + 'px';
      vp.style.aspectRatio = 'auto'; vp.style.height = (L.H * sc) + 'px';
    }

    function measure() {
      /* geometry that depends on real rendered sizes */
      L.dashH = el.dash.offsetHeight || 424;
      if (L.m) {
        const top = -(L.H / 2 - 20) / L.cam;
        L.dashY = (L.H / 2 - 20) / L.cam - L.dashH * L.dashS / 2;
        const dashTop = L.dashY - L.dashH * L.dashS / 2;
        const avail = dashTop - 14 - top;
        L.p2S = Math.max(.3, Math.min(.55, avail / 560));
        L.phoneY = top + (560 * L.p2S) / 2;
      }
      const cs = L.cs;
      P.qB = anchorOf(el.optB, el.quiz, L.clr.quiz, cs, el.optB.offsetWidth * .6, 22);
      P.pzPt = k => anchorOf(el.pz, el.puzzle, L.clr.puzzle, cs, PZ[k][0], PZ[k][1]);
      P.loose = P.pzPt('loose'); P.slot = P.pzPt('slot');
      P.xp = { x: P.qB.x + (el.optB.offsetWidth / 2 - 34) * cs, y: P.qB.y - 6 * cs };
      P.btn = anchorOf(el.send, el.dash, [L.dashX, L.dashY], L.dashS);
      P.btnTip = anchorOf(el.send, el.dash, [L.dashX, L.dashY], L.dashS, el.send.offsetWidth * .7, 20);
      const hw = el.head, w0 = el.words[0];
      P.w0 = { x: w0.offsetLeft + w0.offsetWidth / 2 - hw.offsetWidth / 2, y: w0.offsetTop + w0.offsetHeight / 2 - hw.offsetHeight / 2 };
      const bw = el.sbox.offsetWidth || 280;
      avRow = avs.map((_, i) => ({ x: i * (bw - 24) / 8, y: 70 }));
      avShuf = avs.map(() => ({ x: rnd(0, bw - 24), y: rnd(34, 96) }));
      const cnt = [0, 0, 0];
      avTgt = avs.map((_, i) => { const g = GRP[i], r = cnt[g]++; return { x: (bw / 3) * (g + .5) - 12, y: 34 + r * 30 }; });
      trails.forEach((t, i) => { const p = L.mess[i]; t.style.width = Math.hypot(p[0], p[1]) + 'px'; });
      L.scanW = L.scanV ? L.W : 3; L.scanH = L.scanV ? 3 : L.H;
      el.scan.style.width = L.scanW + 'px'; el.scan.style.height = L.scanH + 'px';
      el.bloom.style.opacity = '';
    }

    /* ---------- initial state (also used on every loop wrap) ---------- */
    function reset() {
      const W = L.W, H = L.H, m = L.m;
      gs.set(scene, { scale: 1 });
      gs.set(el.head, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 });
      gs.set(el.words, { opacity: 0, scale: .6, y: 20 });
      gs.set(el.words[0], { opacity: 1, scale: 1, y: 0 });
      gs.set(el.seed, { x: 0, y: 0, scaleX: 0, scaleY: 0, opacity: 1 });
      gs.set(el.ring, { scale: .3, opacity: 0 });
      gs.set(messEls, { x: 0, y: 0, rotation: 0, scaleX: 0, scaleY: 0, opacity: 0 });
      gs.set(messIn, { x: 0, y: 0, rotation: 0 });
      trails.forEach((t, i) => {
        const p = L.mess[i];
        gs.set(t, { x: p[0], y: p[1], xPercent: 0, yPercent: -50, rotation: Math.atan2(-p[1], -p[0]) * 180 / Math.PI, scaleX: 0, opacity: 0, transformOrigin: '0% 50%' });
      });
      gs.set(el.orb, { x: 0, y: -90, scaleX: .3, scaleY: .3, opacity: 0 });
      gs.set(el.bloom, { scale: .6, opacity: 0 });
      gs.set(el.scan, L.scanV ? { x: 0, y: -H / 2 - 6, opacity: 0 } : { x: -W / 2 - 6, y: 0, opacity: 0 });

      [el.note, el.flash, el.quiz, el.puzzle, el.streak].forEach(c => gs.set(c, { x: 0, y: 0, rotation: 0, scaleX: 0, scaleY: 0, opacity: 0 }));
      gs.set(el.flip, { rotationY: 0, transformPerspective: 900 });
      gs.set(el.flame, { scale: 0, rotation: -25 });
      gs.set(el.sfill, { scaleX: 0 });
      gs.set(oB.of, { y: 0 }); gs.set(oB.fill, { opacity: 0 }); gs.set(oB.t1, { opacity: 1 }); gs.set(oB.t2, { opacity: 0 });
      gs.set(oB.l2, { opacity: 0 }); gs.set(oB.chk, { scale: 0 }); gs.set(el.optA, { opacity: 1 });
      gs.set(el.xp, { x: P.xp.x, y: P.xp.y, opacity: 0, scale: .6 });

      /* puzzle */
      gs.set(treeNodes.concat([nSlot]), { scale: 0 });
      treeNodes.concat([nSlot, nPulse, nLoose]).forEach(n => gs.set(n, { x: PZ[n._k][0] - 17, y: PZ[n._k][1] - 17 }));
      gs.set(nPulse, { scale: 1, opacity: 0 });
      gs.set(nLoose, { scale: 0, scaleX: 0, scaleY: 0 });
      gs.set(nodeG, { opacity: 0 });
      edges.forEach(e => gs.set(e, { x: e._p.x, y: e._p.y, rotation: e._p.a, transformOrigin: '0% 50%', scaleX: 0 }));

      /* cursor */
      gs.set(el.cursor, { xPercent: 0, yPercent: 0, x: P.qB.x + 110 - 3, y: P.qB.y + 130 - 2, scale: 1, opacity: 0 });

      /* phone */
      gs.set(el.phone, { x: 0, y: 0, scaleX: .5, scaleY: .5, opacity: 0, skewX: 0 });
      gs.set(el.toast, { xPercent: -50, yPercent: 0, scale: 0, transformOrigin: '50% 0%' });

      /* dashboard */
      gs.set(el.dash, { x: L.dashX + (m ? 0 : 1000), y: L.dashY + (m ? 800 : 0), scaleX: L.dashS, scaleY: L.dashS, skewX: m ? 0 : 10, opacity: 0 });
      gs.set([dq.f1, dq.f2], { scaleX: 0 });
      dq.p1.textContent = '0%'; dq.p2.textContent = '0%';
      gs.set(dq.flag, { scale: 0, rotation: -12 });
      gs.set(dq.colh, { opacity: 0 });
      avs.forEach((a, i) => gs.set(a, { x: avRow[i].x, y: avRow[i].y, scale: 0, rotation: 0 }));
      gs.set([dq.rec1, dq.rec2], { scale: .6, opacity: 0 });
      gs.set([dq.spk1, dq.spk2], { scale: 0, rotation: 0, opacity: 0 });
      gs.set(dq.sendF, { y: 0 });
      gs.set(el.dot, { x: P.btn.x, y: P.btn.y, scale: 0, opacity: 0 });
    }

    /* ---------- reduced motion: a single composed frame ---------- */
    function staticFrame() {
      reset();
      const m = L.m;
      gs.set(el.words, { opacity: 1, scale: 1, y: 0 });
      gs.set(el.head, { y: m ? -282 : -268, scaleX: m ? .74 : .86, scaleY: m ? .74 : .86 });
      const qs = m ? .9 : 1;
      gs.set(el.quiz, Object.assign({ x: m ? 0 : -300, y: m ? -92 : 56, opacity: 1 }, S(qs)));
      gs.set(oB.fill, { opacity: 1 }); gs.set(oB.t1, { opacity: 0 }); gs.set(oB.t2, { opacity: 1 }); gs.set(oB.l2, { opacity: 1 });
      gs.set(oB.chk, { scale: 1 }); gs.set(el.optA, { opacity: .55 });
      const ds = m ? .64 : 1, dy = m ? L.H / 2 - 14 - L.dashH * ds / 2 : 60;
      gs.set(el.dash, Object.assign({ x: m ? 0 : 190, y: dy, skewX: 0, opacity: 1 }, S(ds)));
      gs.set(dq.f1, { scaleX: .82 }); gs.set(dq.f2, { scaleX: .41 });
      dq.p1.textContent = '82%'; dq.p2.textContent = '41%';
      gs.set(dq.flag, { scale: 1, rotation: 0 }); gs.set(dq.colh, { opacity: 1 });
      avs.forEach((a, i) => gs.set(a, { x: avTgt[i].x, y: avTgt[i].y, scale: 1, rotation: 0 }));
      gs.set([dq.rec1, dq.rec2], { scale: 1, opacity: 1 });
    }

    /* ---------- the timeline ---------- */
    function buildTL() {
      const m = L.m, ms = L.ms, cs = L.cs, W = L.W, H = L.H;
      const t = gs.timeline({ repeat: -1, onRepeat: reset });

      /* === 1 · HOOK ======================================================= */
      t.to(el.words.slice(1), { opacity: 1, scale: 1, y: 0, duration: .45, ease: 'back.out(2.2)', stagger: .13 }, T.HOOK + .1);
      t.to(el.head, { scaleX: .02, scaleY: 1.08, duration: .2, ease: 'power3.in' }, T.HOOK + 1.3);
      t.to(el.head, { opacity: 0, duration: .04 }, T.HOOK + 1.46);
      t.to(el.seed, Object.assign({ duration: .18, ease: 'back.out(2.2)' }, S(1)), T.HOOK + 1.4);

      /* === 2 · THE MESS =================================================== */
      t.to(el.seed, Object.assign({ duration: .08, ease: 'power2.out' }, S(1.5)), T.MESS);
      t.to(el.seed, Object.assign({ duration: .2, ease: 'power2.in' }, S(0)), T.MESS + .08);
      t.fromTo(el.ring, { scale: .3, opacity: .6 }, { scale: 5, opacity: 0, duration: .55, ease: 'power2.out', immediateRender: false }, T.MESS);
      messEls.forEach((c, i) => {
        const p = L.mess[i];
        t.to(c, Object.assign({ x: p[0], y: p[1], rotation: p[2], opacity: 1, duration: .55, ease: 'back.out(1.5)' }, S(ms)), T.MESS + .04 + i * .05);
      });
      messIn.forEach((inn, i) => {
        const kf = [];
        for (let k = 0; k < 11; k++) kf.push({ x: rnd(-2, 2), y: rnd(-2, 2), rotation: rnd(-.8, .8), duration: .09, ease: 'none' });
        kf.push({ x: 0, y: 0, rotation: 0, duration: .09, ease: 'none' });
        t.to(inn, { keyframes: kf }, T.MESS + .9 + i * .012);
      });

      /* === 3 · THE ENGINE ================================================= */
      const E = T.ENGINE;
      t.to(el.orb, { keyframes: [
        { y: 0, scaleX: .95, scaleY: 1.15, opacity: 1, duration: .26, ease: 'power3.in' },
        { scaleX: 1.22, scaleY: .78, duration: .1, ease: 'power2.out' },
        { scaleX: 1, scaleY: 1, duration: .22, ease: 'elastic.out(1,0.5)' }
      ] }, E);
      t.to(el.bloom, { scale: 1, opacity: 1, duration: .7, ease: 'power2.out' }, E + .1);
      t.to(el.scan, { opacity: 1, duration: .05 }, E + .2);
      t.to(el.scan, L.scanV ? { y: H / 2 + 6, duration: .65, ease: 'none' } : { x: W / 2 + 6, duration: .65, ease: 'none' }, E + .2);
      t.to(el.scan, { opacity: 0, duration: .05 }, E + .85);

      const order = messEls.map((_, i) => i).sort((a, b) => L.scanV ? L.mess[a][1] - L.mess[b][1] : L.mess[a][0] - L.mess[b][0]);
      const pulses = [];
      order.forEach((i, k) => {
        const c = messEls[i], tr = trails[i], t0 = E + .3 + k * .07;
        t.to(c, { scaleX: ms * 1.18, scaleY: ms * .84, duration: .1, ease: 'power1.out' }, t0);
        t.to(c, { x: 0, y: 0, rotation: 0, duration: .32, ease: 'power3.in' }, t0);
        t.to(c, { scaleX: .04, scaleY: .04, opacity: 0, duration: .22, ease: 'power3.in' }, t0 + .1);
        t.to(tr, { scaleX: 1, opacity: .7, duration: .16, ease: 'power2.out' }, t0);
        t.to(tr, { opacity: 0, duration: .18, ease: 'none' }, t0 + .16);
        pulses.push({ scaleX: 1.1 + k * .008, scaleY: .9 - k * .006, duration: .04, ease: 'power2.out' }, { scaleX: 1, scaleY: 1, duration: .03, ease: 'power2.in' });
      });
      t.to(el.orb, { keyframes: pulses }, E + .3 + .3 - .03);

      /* === 4 · CLARITY ==================================================== */
      const C = T.CLARITY;
      const CL = [['note', el.note], ['flash', el.flash], ['quiz', el.quiz], ['puzzle', el.puzzle], ['streak', el.streak]];
      CL.forEach((pair, i) => {
        const p = L.clr[pair[0]], c = pair[1], t0 = C + i * .07;
        t.to(c, Object.assign({ x: p[0], y: p[1], opacity: 1, duration: .45, ease: 'back.out(1.7)' }, S(cs)), t0);
        t.to(c, { keyframes: [
          { scaleX: cs * 1.04, scaleY: cs * .92, duration: .07, ease: 'power2.out' },
          { scaleX: cs, scaleY: cs, duration: .16, ease: 'back.out(2)' }
        ] }, t0 + .45);
      });
      const rp = [];
      for (let k = 0; k < 5; k++) rp.push({ scaleX: 1.1, scaleY: .9, duration: .04, ease: 'power2.out' }, { scaleX: 1, scaleY: 1, duration: .03, ease: 'power2.in' });
      t.to(el.orb, { keyframes: rp }, C + .12);
      t.to(el.orb, Object.assign({ opacity: 0, duration: .3, ease: 'back.in(1.7)' }, S(0)), C + .5);
      t.to(el.bloom, { opacity: 0, duration: .6, ease: 'power2.inOut' }, C + .5);

      /* flashcard flip */
      t.to(el.flip, { rotationY: 180, duration: .55, ease: 'power3.inOut' }, C + .75);
      t.to(el.flash, { keyframes: [
        { scaleX: cs * 1.06, scaleY: cs * 1.06, duration: .25, ease: 'power2.out' },
        { scaleX: cs, scaleY: cs, duration: .3, ease: 'back.out(2)' }
      ] }, C + .75);

      /* streak + progress */
      t.to(el.flame, { scale: 1, rotation: 0, duration: .45, ease: 'back.out(3)' }, C + .7);
      t.to(el.sfill, { scaleX: .72, duration: 1.1, ease: 'elastic.out(1,0.45)' }, C + .8);

      /* puzzle build-in */
      treeNodes.forEach((n, k) => t.to(n, { scale: 1, duration: .35, ease: 'back.out(2.5)' }, C + .5 + k * .06));
      edges.slice(0, 3).forEach((e, k) => t.to(e, { scaleX: 1, duration: .22, ease: 'power2.out' }, C + .8 + k * .06));
      t.to(nSlot, { scale: 1, duration: .3, ease: 'back.out(2.5)' }, C + .95);
      t.to(nLoose, Object.assign({ duration: .35, ease: 'back.out(2.5)' }, S(1)), C + 1.05);

      /* cursor → quiz option B */
      const qb = P.qB;
      t.to(el.cursor, { opacity: 1, duration: .12 }, C + .6);
      t.to(el.cursor, { x: qb.x - 3, y: qb.y - 2, duration: .5, ease: 'power2.inOut' }, C + .6);
      t.to(el.cursor, { keyframes: [{ scale: .86, duration: .08, ease: 'power2.out' }, { scale: 1, duration: .15, ease: 'back.out(3)' }] }, C + 1.15);
      t.to(oB.of, { y: 3, duration: .08, ease: 'power2.out' }, C + 1.15);
      t.to(oB.fill, { opacity: 1, duration: .1 }, C + 1.23);
      t.to(oB.t1, { opacity: 0, duration: .1 }, C + 1.23);
      t.to(oB.t2, { opacity: 1, duration: .1 }, C + 1.23);
      t.to(oB.l2, { opacity: 1, duration: .1 }, C + 1.23);
      t.to(el.optA, { opacity: .55, duration: .2 }, C + 1.3);
      t.to(oB.chk, { scale: 1, duration: .3, ease: 'back.out(3)' }, C + 1.27);
      t.to(oB.of, { y: 0, duration: .15, ease: 'back.out(2.5)' }, C + 1.33);
      t.to(el.xp, { opacity: 1, y: P.xp.y - 30 * cs, scale: 1, duration: .35, ease: 'back.out(2)' }, C + 1.33);
      t.to(el.xp, { y: P.xp.y - 62 * cs, opacity: 0, duration: .4, ease: 'power1.in' }, C + 1.78);

      /* cursor → puzzle: grab node 6, drag into slot */
      const lo = P.loose, sl = P.slot, lift = 26;
      t.to(el.cursor, { x: lo.x - 3, y: lo.y - 2, duration: .4, ease: 'power2.inOut' }, C + 1.45);
      t.to(el.cursor, { scale: .86, duration: .08, ease: 'power2.out' }, C + 1.88);
      t.to(nLoose, Object.assign({ duration: .1, ease: 'power2.out' }, S(1.18)), C + 1.88);
      t.to(el.cursor, { x: sl.x - 3, duration: .4, ease: 'power1.inOut' }, C + 1.98);
      t.to(el.cursor, { keyframes: [{ y: Math.min(lo.y, sl.y) - lift * cs - 2, duration: .2, ease: 'power2.out' }, { y: sl.y - 2, duration: .2, ease: 'power2.in' }] }, C + 1.98);
      t.to(nLoose, { x: PZ.slot[0] - 17, duration: .4, ease: 'power1.inOut' }, C + 1.98);
      t.to(nLoose, { keyframes: [{ y: PZ.loose[1] - 17 - lift, duration: .2, ease: 'power2.out' }, { y: PZ.slot[1] - 17, duration: .2, ease: 'power2.in' }] }, C + 1.98);
      t.to(nLoose, { keyframes: [
        { scaleX: 1.28, scaleY: .8, duration: .07, ease: 'power2.out' },
        { scaleX: .94, scaleY: 1.08, duration: .09, ease: 'power2.inOut' },
        { scaleX: 1, scaleY: 1, duration: .12, ease: 'power2.out' }
      ] }, C + 2.38);
      t.to(nodeG, { opacity: 1, duration: .12 }, C + 2.38);
      t.fromTo(nPulse, { scale: 1, opacity: .8 }, { scale: 2.1, opacity: 0, duration: .45, ease: 'power2.out', immediateRender: false }, C + 2.38);
      t.to(edges[3], { scaleX: 1, duration: .2, ease: 'power2.out' }, C + 2.42);
      t.to(el.cursor, { scale: 1, duration: .15, ease: 'back.out(3)' }, C + 2.38);
      t.to(el.cursor, { opacity: 0, duration: .15 }, C + 2.45);

      /* glide into the phone */
      const G = C + 2.6;
      CL.forEach((pair, i) => {
        const c = pair[1], t0 = G + i * .04;
        t.to(c, { x: 0, y: 0, rotation: 0, duration: .35, ease: 'power3.inOut' }, t0);
        t.to(c, Object.assign({ duration: .35, ease: 'power2.in' }, S(.25)), t0);
        t.to(c, { opacity: 0, duration: .1, ease: 'none' }, t0 + .25);
      });
      t.to(el.phone, Object.assign({ opacity: 1, duration: .4, ease: 'back.out(1.7)' }, S(L.p1S)), G + .12);
      t.to(el.phone, { keyframes: [
        { scaleX: L.p1S * 1.03, scaleY: L.p1S * .94, duration: .04 },
        { scaleX: L.p1S, scaleY: L.p1S, duration: .04 }
      ] }, G + .52);

      /* === 5 · INSIGHTS =================================================== */
      const I = T.INSIGHTS;
      t.to(scene, { scale: L.cam, duration: .6, ease: 'power2.inOut' }, I);
      t.to(el.phone, Object.assign({ x: L.phoneX, y: L.phoneY, duration: .55, ease: 'power3.inOut' }, S(L.p2S)), I);
      t.to(el.phone, { keyframes: [{ skewX: -6, duration: .2, ease: 'power1.out' }, { skewX: 0, duration: .35, ease: 'power2.inOut' }] }, I);
      t.to(el.dash, { opacity: 1, duration: .1 }, I + .2);
      t.to(el.dash, { x: L.dashX, y: L.dashY, skewX: 0, duration: .5, ease: 'back.out(1.4)' }, I + .2);
      t.to(el.dash, { keyframes: [
        { scaleX: L.dashS * .97, scaleY: L.dashS * 1.02, duration: .06 },
        { scaleX: L.dashS, scaleY: L.dashS, duration: .12, ease: 'power2.out' }
      ] }, I + .7);

      const count = (node, val, at, d) => {
        const o = { v: 0 };
        t.to(o, { v: val, duration: d, ease: 'power2.out', onUpdate() { node.textContent = Math.round(o.v) + '%'; } }, at);
      };
      t.to(dq.f1, { scaleX: .82, duration: .9, ease: 'elastic.out(1,0.55)' }, I + .65);
      count(dq.p1, 82, I + .65, .7);
      t.to(dq.f2, { scaleX: .41, duration: .9, ease: 'elastic.out(1,0.55)' }, I + .75);
      count(dq.p2, 41, I + .75, .6);
      t.to(dq.flag, { scale: 1, rotation: 0, duration: .35, ease: 'back.out(3)' }, I + 1.15);

      t.to(dq.colh, { opacity: 1, duration: .2, stagger: .05 }, I + .8);
      t.to(avs, { scale: 1, duration: .3, ease: 'back.out(2.5)', stagger: .03 }, I + .8);
      t.to(avs, { x: i => avShuf[i].x, y: i => avShuf[i].y, rotation: i => (i % 2 ? 12 : -12), duration: .22, ease: 'power2.inOut', stagger: .015 }, I + 1.1);
      t.to(avs, { x: i => avTgt[i].x, y: i => avTgt[i].y, rotation: 0, duration: .38, ease: 'back.out(1.8)', stagger: .025 }, I + 1.35);

      const spark = (spk, at) => t.to(spk, { keyframes: [
        { scale: 1.3, rotation: 45, opacity: 1, duration: .18, ease: 'power2.out' },
        { scale: 0, rotation: 90, opacity: 0, duration: .22, ease: 'power2.in' }
      ] }, at);
      t.to(dq.rec1, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2.2)' }, I + 1.2);
      spark(dq.spk1, I + 1.35);
      t.to(dq.rec2, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2.2)' }, I + 1.45);
      spark(dq.spk2, I + 1.6);

      /* press "Send drills", dot flies back to the phone */
      const bt = P.btnTip;
      t.set(el.cursor, { x: bt.x + 90 - 3, y: bt.y + 70 - 2, scale: 1 }, I + 1.45);
      t.to(el.cursor, { opacity: 1, duration: .1 }, I + 1.5);
      t.to(el.cursor, { x: bt.x - 3, y: bt.y - 2, duration: .35, ease: 'power2.inOut' }, I + 1.55);
      t.to(el.cursor, { keyframes: [{ scale: .86, duration: .07, ease: 'power2.out' }, { scale: 1, duration: .15, ease: 'back.out(3)' }] }, I + 1.95);
      t.to(dq.sendF, { y: 3, duration: .07, ease: 'power2.out' }, I + 1.95);
      t.to(dq.sendF, { y: 0, duration: .16, ease: 'back.out(3)' }, I + 2.04);
      t.to(el.cursor, { opacity: 0, duration: .15 }, I + 2.15);

      t.to(el.dot, { opacity: 1, scale: 1, duration: .1, ease: 'back.out(3)' }, I + 2.05);
      t.to(el.dot, { x: L.phoneX, duration: .45, ease: 'power2.inOut' }, I + 2.05);
      t.to(el.dot, { keyframes: [{ y: Math.min(P.btn.y, L.phoneY) - 70, duration: .22, ease: 'power2.out' }, { y: L.phoneY, duration: .23, ease: 'power2.in' }] }, I + 2.05);
      t.to(el.dot, { scale: 0, opacity: 0, duration: .1, ease: 'power2.in' }, I + 2.5);
      t.to(el.phone, { keyframes: [
        { scaleX: L.p2S * 1.04, scaleY: L.p2S * .93, duration: .06, ease: 'power2.out' },
        { scaleX: L.p2S, scaleY: L.p2S, duration: .08, ease: 'power2.out' }
      ] }, I + 2.5);
      t.to(el.toast, { scale: 1, duration: .35, ease: 'back.out(2.5)' }, I + 2.5);

      /* === 6 · LOOP RESOLVE =============================================== */
      const R = T.RESOLVE;
      t.to(el.dash, Object.assign({ x: 0, y: 0, opacity: 0, duration: .5, ease: 'power3.in' }, S(.08)), R + .1);
      t.to(el.phone, Object.assign({ x: 0, y: 0, opacity: 0, duration: .5, ease: 'power3.in' }, S(.08)), R + .15);
      t.to(scene, { scale: 1, duration: .6, ease: 'power2.inOut' }, R + .1);
      t.to(el.seed, Object.assign({ duration: .25, ease: 'back.out(2.5)' }, S(1)), R + .5);
      t.to(el.seed, { x: P.w0.x, y: P.w0.y, duration: .26, ease: 'power3.inOut' }, R + .8);
      t.to(el.seed, { keyframes: [{ scaleX: 1.5, scaleY: .7, duration: .1, ease: 'power2.out' }, { scaleX: 1, scaleY: 1, duration: .16, ease: 'power2.out' }] }, R + .8);
      t.set(el.head, { scaleX: 1, scaleY: 1, opacity: 1 }, R + 1.05);
      t.set(el.words, { opacity: 0, scale: .6, y: 20 }, R + 1.05);
      t.to(el.words[0], { opacity: 1, scale: 1, y: 0, duration: .35, ease: 'back.out(2.2)' }, R + 1.07);
      t.to(el.seed, Object.assign({ duration: .12, ease: 'power2.in' }, S(0)), R + 1.07);

      t.set(root, {}, T.END);   // pins total duration to exactly T.END
      return t;
    }

    /* ---------- lifecycle ---------- */
    function sync() { if (tl) tl.paused(!(inView && tabVis)); }

    function build() {
      if (tl) { tl.kill(); tl = null; }
      const cw = root.clientWidth || 1440;
      mode = cw < 720 ? 'm' : 'd';
      root.classList.toggle('m', mode === 'm');
      L = layoutFor(mode === 'm');
      fit();
      measure();
      if (reduce.matches) { staticFrame(); }
      else { reset(); tl = buildTL(); sync(); }
      root.classList.add('ready');
    }

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (destroyed) return;
        const m = (root.clientWidth || 1440) < 720 ? 'm' : 'd';
        if (m !== mode) build(); else fit();
      });
    };
    const onVis = () => { tabVis = !document.hidden; sync(); };
    const onReduce = () => build();

    let ro = null, io = null;
    function start() {
      if (destroyed) return;
      gs.set(scene.querySelectorAll(':scope > .el'), { xPercent: -50, yPercent: -50 });
      build();
      if ('ResizeObserver' in window) { ro = new ResizeObserver(onResize); ro.observe(root); }
      else window.addEventListener('resize', onResize);
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(es => { inView = es[0].isIntersecting; sync(); }, { threshold: .05 });
        io.observe(root);
      }
      document.addEventListener('visibilitychange', onVis);
      if (reduce.addEventListener) reduce.addEventListener('change', onReduce);
    }
    const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise(r => setTimeout(r, 1800))]).then(start);

    return {
      timeline() { return tl; },
      layout() { return L; },
      destroy() {
        destroyed = true;
        if (tl) tl.kill();
        if (ro) ro.disconnect(); if (io) io.disconnect();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        if (reduce.removeEventListener) reduce.removeEventListener('change', onReduce);
      }
    };
  }

  window.initModuHero = initModuHero;
  const root = document.getElementById('moduHero');
  if (root) window.moduHero = initModuHero(root);
})();
