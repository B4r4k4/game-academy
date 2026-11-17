/* Game Feel Lab — a tiny tunable platformer for learning game feel */
(function () {
  const W = 960, H = 480, WORLD_W = 2440, STEP = 1 / 120;

  const DEFAULTS = {
    gravity: 2200, jumpHeight: 130, runSpeed: 280, accel: 2600, decel: 3000,
    airControl: 0.65, fallMult: 1.7, coyote: 100, buffer: 100,
    variable: true, squash: true, particles: true, shake: true, arc: true
  };
  const PRESETS = {
    "Tight": {},
    "Floaty": { gravity: 1100, jumpHeight: 150, fallMult: 1, airControl: 0.9, accel: 1600, decel: 1000, coyote: 0, buffer: 0, variable: false },
    "Heavy": { gravity: 3600, jumpHeight: 90, runSpeed: 220, accel: 1400, decel: 1800, fallMult: 2.2, airControl: 0.35 },
    "Ice": { accel: 700, decel: 250, airControl: 0.5 },
    "No forgiveness": { coyote: 0, buffer: 0, variable: false }
  };
  const LANG = () => (window.GA_LANG ? window.GA_LANG() : "en");
  const TXT = {
    en: { presets: { "Tight": "Tight", "Floaty": "Floaty", "Heavy": "Heavy", "Ice": "Ice", "No forgiveness": "No forgiveness" },
      sliders: { gravity: ["Gravity", "How hard the world pulls down."], jumpHeight: ["Jump height", "Designed apex height. Take-off speed is derived: v₀ = √(2gh)."], fallMult: ["Fall multiplier", "Extra gravity while falling. >1 removes floatiness."], runSpeed: ["Max run speed", "Top horizontal speed."], accel: ["Acceleration", "How fast you reach top speed."], decel: ["Deceleration", "How fast you stop. Low = slippery."], airControl: ["Air control", "Fraction of ground control while airborne."], coyote: ["Coyote time", "Grace period to jump after leaving a ledge."], buffer: ["Jump buffer", "Remember a jump pressed just before landing."] },
      toggles: { variable: "Variable jump height (release to cut)", squash: "Squash & stretch", particles: "Particles", shake: "Screen shake on hard landings", arc: "Show jump arc trail" },
      eyebrow: "Interactive · Module 03", title: "Game Feel Lab",
      intro: "Same level, same character — only the numbers change. Try every preset and notice how each one <em>feels</em>.",
      keys: [["Move", ["←", "→"], ["A", "D"]], ["Jump", ["Space"], ["W"], ["↑"]], ["Restart", ["R"]]], or: "or",
      hud: ["Take-off v₀", "Air time", "Grounded", "Measured apex", "Jumps"], yes: "yes", no: "no", coyote: "coyote",
      exps: [["🎯 Experiment 1", "Set coyote time to 0 and try running off ledges then jumping. Then set it to 120ms. Which feels \"fair\"?"], ["📐 Experiment 2", "Change gravity a lot. The <em>measured apex</em> stays at your jump height — because v₀ is derived from it. Level designers love this."], ["🪶 Experiment 3", "Set fall multiplier to 1, then 2.5. Watch the arc trail: the second is asymmetric and feels snappier."], ["🧃 Experiment 4", "Turn off squash, particles and shake. Same physics, but the game feels lifeless. That's \"juice\"."]],
      h: ["Presets", "Physics", "Feel"], restart: "↺ Restart level", copy: "⧉ Copy values", copied: "Values copied to clipboard",
      goal: (g, n, t) => `Goal! ${g}/${n} coins · ${t}s`, status: (g, n, t, f) => [`◉ ${g}/${n}`, `⏱ ${t}s`, `↺ ${f} falls`], canvas: "Playable platformer demo" },
    ar: { presets: { "Tight": "مُحكم", "Floaty": "عائم", "Heavy": "ثقيل", "Ice": "جليد", "No forgiveness": "بلا تسامح" },
      sliders: { gravity: ["الجاذبية", "مدى قوة جذب العالم للأسفل."], jumpHeight: ["ارتفاع القفزة", "ارتفاع القمة المصمَّم. سرعة الانطلاق مشتقة منه: v₀ = √(2gh)."], fallMult: ["مضاعف السقوط", "جاذبية إضافية أثناء السقوط. أكبر من 1 يزيل الإحساس بالطفو."], runSpeed: ["أقصى سرعة ركض", "السرعة الأفقية القصوى."], accel: ["التسارع", "مدى سرعة الوصول إلى السرعة القصوى."], decel: ["التباطؤ", "مدى سرعة التوقف. القيمة المنخفضة = انزلاق."], airControl: ["التحكم في الهواء", "نسبة التحكم الأرضي أثناء الطيران."], coyote: ["وقت الذئب", "مهلة للقفز بعد مغادرة الحافة."], buffer: ["حفظ ضغطة القفز", "تذكّر ضغطة القفز قبل الهبوط مباشرة."] },
      toggles: { variable: "ارتفاع قفزة متغيّر (أفلت الزر للقطع)", squash: "الانضغاط والتمدد", particles: "الجسيمات", shake: "اهتزاز الشاشة عند الهبوط القوي", arc: "إظهار أثر قوس القفزة" },
      eyebrow: "تفاعلي · الوحدة 03", title: "مختبر إحساس اللعب",
      intro: "المرحلة نفسها والشخصية نفسها — الأرقام فقط تتغير. جرّب كل إعداد مسبق ولاحظ <em>إحساس</em> كل واحد.",
      keys: [["الحركة", ["←", "→"], ["A", "D"]], ["القفز", ["Space"], ["W"], ["↑"]], ["إعادة البدء", ["R"]]], or: "أو",
      hud: ["سرعة الانطلاق v₀", "زمن الطيران", "على الأرض", "القمة المقيسة", "القفزات"], yes: "نعم", no: "لا", coyote: "ذئب",
      exps: [["🎯 التجربة 1", "اضبط وقت الذئب على 0 وجرّب الركض خارج الحواف ثم القفز. ثم اضبطه على 120 ملّي ثانية. أيهما يبدو «عادلًا»؟"], ["📐 التجربة 2", "غيّر الجاذبية كثيرًا. تبقى <em>القمة المقيسة</em> عند ارتفاع قفزتك — لأن v₀ مشتقة منه. مصممو المراحل يحبون هذا."], ["🪶 التجربة 3", "اضبط مضاعف السقوط على 1، ثم على 2.5. راقب أثر القوس: الثاني غير متماثل ويبدو أكثر حدّة."], ["🧃 التجربة 4", "أوقف الانضغاط والجسيمات والاهتزاز. الفيزياء نفسها، لكن اللعبة تبدو بلا حياة. هذه هي «الحيوية»."]],
      h: ["إعدادات مسبقة", "الفيزياء", "الإحساس"], restart: "↺ أعد المرحلة", copy: "⧉ انسخ القيم", copied: "نُسخت القيم",
      goal: (g, n, t) => `الهدف! ${g}/${n} عملة · ${t} ث`, status: (g, n, t, f) => [`◉ ${g}/${n}`, `⏱ ${t} ث`, `↺ ${f} سقطات`], canvas: "عرض لعبة منصات قابل للعب" }
  };
  Object.assign(TXT.en, { pageEyebrow: "Interactive · Try every game type", pageTitle: "Game Lab", pageIntro: "Pick a game type and play it to understand how it looks and feels. Every genre has its own core loop — and the platformer also lets you tune the numbers behind its feel.", pickH: "Choose a game type", featH: "Game Feel Lab", tunable: "tunable" });
  Object.assign(TXT.ar, { pageEyebrow: "تفاعلي · جرّب كل أنواع الألعاب", pageTitle: "مختبر اللعب", pageIntro: "اختر نوع لعبة والعبها لتفهم شكلها وإحساسها. لكل نوع حلقة لعب خاصة به — وفي ألعاب المنصات يمكنك أيضًا ضبط الأرقام التي تصنع الإحساس.", pickH: "اختر نوع اللعبة", featH: "مختبر إحساس اللعب", tunable: "قابل للضبط" });
  Object.assign(TXT.en, { groups: ['Jump', 'Movement', 'Forgiveness', 'Juice'], custom: 'Custom', counters: ['Coins', 'Time', 'Falls'], seconds: 's' });
  Object.assign(TXT.ar, { groups: ['القفز', 'الحركة', 'التسامح', 'الحيوية'], custom: 'مخصص', counters: ['العملات', 'الوقت', 'السقطات'], seconds: 'ث' });
  const L = () => TXT[LANG()] || TXT.en;
  const SLIDERS = [
    ["gravity", "Gravity", 600, 4500, 50, "px/s²", "How hard the world pulls down."],
    ["jumpHeight", "Jump height", 40, 260, 5, "px", "Designed apex height. Take-off speed is derived: v₀ = √(2gh)."],
    ["fallMult", "Fall multiplier", 1, 3.5, 0.1, "×", "Extra gravity while falling. >1 removes floatiness."],
    ["runSpeed", "Max run speed", 100, 520, 10, "px/s", "Top horizontal speed."],
    ["accel", "Acceleration", 400, 6000, 100, "px/s²", "How fast you reach top speed."],
    ["decel", "Deceleration", 150, 6000, 50, "px/s²", "How fast you stop. Low = slippery."],
    ["airControl", "Air control", 0, 1, 0.05, "", "Fraction of ground control while airborne."],
    ["coyote", "Coyote time", 0, 250, 5, "ms", "Grace period to jump after leaving a ledge."],
    ["buffer", "Jump buffer", 0, 250, 5, "ms", "Remember a jump pressed just before landing."]
  ];
  const TOGGLES = [
    ["variable", "Variable jump height (release to cut)"],
    ["squash", "Squash & stretch"],
    ["particles", "Particles"],
    ["shake", "Screen shake on hard landings"],
    ["arc", "Show jump arc trail"]
  ];

  const level = {
    solids: [
      { x: 0, y: 440, w: 700, h: 40 }, { x: 800, y: 440, w: 520, h: 40 }, { x: 1420, y: 440, w: 1020, h: 40 },
      { x: 250, y: 345, w: 140, h: 18 }, { x: 460, y: 270, w: 140, h: 18 }, { x: 660, y: 200, w: 110, h: 18 },
      { x: 880, y: 330, w: 120, h: 18 }, { x: 1060, y: 250, w: 140, h: 18 }, { x: 1250, y: 330, w: 90, h: 18 },
      { x: 1520, y: 360, w: 80, h: 18 }, { x: 1660, y: 290, w: 80, h: 18 }, { x: 1800, y: 220, w: 80, h: 18 },
      { x: 1940, y: 150, w: 180, h: 18 }, { x: 2180, y: 300, w: 40, h: 140 }
    ],
    coins: [
      [320, 310], [530, 235], [715, 160], [750, 400], [940, 295], [1130, 215], [1295, 295], [1370, 380],
      [1560, 325], [1700, 255], [1840, 185], [2000, 115], [2060, 115], [2300, 400]
    ],
    goal: { x: 2360, y: 360, w: 30, h: 80 }
  };

  let P = { ...DEFAULTS };
  let canvas, ctx, root, raf = 0, running = false, last = 0, acc = 0;
  const input = { left: false, right: false, jump: false };
  let pl, coins, parts, arc, shakeT = 0, shakeMag = 0, camX = 0, stats, hooks = {}, won = false, msg = null;
  let scenery, activePreset = "Tight", mode = "platformer", pageOn = false;
  const stars = Array.from({ length: 70 }, () => ({ x: Math.random() * WORLD_W, y: Math.random() * 300, r: Math.random() * 1.6 + .3 }));

  function reset(full) {
    pl = { x: 60, y: 380, w: 28, h: 34, vx: 0, vy: 0, ground: false, coyoteT: 0, bufferT: 0, sx: 1, sy: 1, face: 1, takeoffY: null, apex: null, measured: null };
    if (full) {
      coins = level.coins.map(([x, y]) => ({ x, y, got: false }));
      stats = { jumps: 0, falls: 0, time: 0, got: 0 };
      won = false; msg = null;
    }
    parts = []; arc = []; camX = 0;
  }

  const v0 = () => Math.sqrt(2 * P.gravity * P.jumpHeight);
  const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  function emit(x, y, n, color, spread = 1, up = 0) {
    if (!P.particles) return;
    for (let i = 0; i < n; i++) {
      parts.push({ x, y, vx: (Math.random() - .5) * 260 * spread, vy: -Math.random() * 180 * spread - up, life: .5 + Math.random() * .3, max: .8, color, s: 2 + Math.random() * 3 });
    }
  }

  function step(dt) {
    if (!won) stats.time += dt;
    const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const ctrl = pl.ground ? 1 : P.airControl;
    if (dir) {
      pl.vx += dir * P.accel * ctrl * dt;
      pl.vx = Math.max(-P.runSpeed, Math.min(P.runSpeed, pl.vx));
      pl.face = dir;
    } else {
      const d = P.decel * ctrl * dt;
      pl.vx = Math.abs(pl.vx) <= d ? 0 : pl.vx - Math.sign(pl.vx) * d;
    }

    if (!pl.ground) pl.coyoteT -= dt;
    pl.bufferT -= dt;

    if (pl.bufferT > 0 && (pl.ground || pl.coyoteT > 0)) {
      pl.vy = -v0();
      pl.ground = false; pl.coyoteT = 0; pl.bufferT = 0;
      stats.jumps++;
      pl.takeoffY = pl.y; pl.apex = pl.y;
      if (P.squash) { pl.sx = .72; pl.sy = 1.32; }
      emit(pl.x + pl.w / 2, pl.y + pl.h, 8, "#d9d1ff", .6);
      if (P.arc) arc = [];
    }

    let g = P.gravity;
    if (pl.vy > 0) g *= P.fallMult;
    else if (P.variable && !input.jump && pl.vy < 0) g *= 3;
    pl.vy = Math.min(pl.vy + g * dt, 1400);

    // horizontal
    pl.x += pl.vx * dt;
    for (const s of level.solids) if (overlap(pl, s)) {
      if (pl.vx > 0) pl.x = s.x - pl.w; else if (pl.vx < 0) pl.x = s.x + s.w;
      pl.vx = 0;
    }
    pl.x = Math.max(0, Math.min(WORLD_W - pl.w, pl.x));

    // vertical
    const wasGround = pl.ground, impact = pl.vy;
    pl.y += pl.vy * dt;
    pl.ground = false;
    for (const s of level.solids) if (overlap(pl, s)) {
      if (pl.vy > 0) { pl.y = s.y - pl.h; pl.ground = true; }
      else if (pl.vy < 0) { pl.y = s.y + s.h; }
      pl.vy = 0;
    }
    if (pl.takeoffY !== null && pl.y < pl.apex) pl.apex = pl.y;
    if (!wasGround && pl.ground) {
      if (pl.takeoffY !== null) { pl.measured = Math.round(pl.takeoffY - pl.apex); pl.takeoffY = null; }
      if (P.squash) { const k = Math.min(1, impact / 1100); pl.sx = 1 + .4 * k; pl.sy = 1 - .3 * k; }
      if (impact > 300) emit(pl.x + pl.w / 2, pl.y + pl.h, Math.round(impact / 90), "#b8f34a", .5);
      if (P.shake && impact > 900) { shakeT = .18; shakeMag = Math.min(10, impact / 140); }
    }
    if (wasGround && !pl.ground && pl.vy >= 0) pl.coyoteT = P.coyote / 1000;

    if (P.arc && !pl.ground) { arc.push([pl.x + pl.w / 2, pl.y + pl.h / 2]); if (arc.length > 240) arc.shift(); }

    // fall out
    if (pl.y > H + 120) {
      stats.falls++;
      if (P.shake) { shakeT = .3; shakeMag = 8; }
      const keepCoins = true;
      reset(!keepCoins);
    }

    // coins
    for (const c of coins) if (!c.got && overlap(pl, { x: c.x - 10, y: c.y - 10, w: 20, h: 20 })) {
      c.got = true; stats.got++;
      emit(c.x, c.y, 14, "#ffcf5a", 1, 60);
      if (stats.got === coins.length && hooks.onAllCoins) hooks.onAllCoins();
    }
    if (!won && overlap(pl, level.goal)) {
      won = true;
      msg = { t: 3, text: L().goal(stats.got, coins.length, stats.time.toFixed(1)) };
      emit(level.goal.x + 15, level.goal.y, 40, "#ff6fb5", 1.5, 120);
      if (hooks.onGoal) hooks.onGoal(stats);
    }

    // ease scale
    pl.sx += (1 - pl.sx) * Math.min(1, dt * 14);
    pl.sy += (1 - pl.sy) * Math.min(1, dt * 14);

    for (const p of parts) { p.vy += 900 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
    parts = parts.filter(p => p.life > 0);
    if (shakeT > 0) shakeT -= dt;
    if (msg) { msg.t -= dt; if (msg.t <= 0) msg = null; }

    const target = Math.max(0, Math.min(WORLD_W - W, pl.x - W * .38));
    camX += (target - camX) * Math.min(1, dt * 6);
  }

  function draw(t) {
    ctx.save();
    ctx.drawImage(scenery.sky, -camX * .06, 0);
    for (const layer of scenery.hills) ctx.drawImage(layer.image, -camX * layer.par, 0);

    let sx = 0, sy = 0;
    if (shakeT > 0) { sx = (Math.random() - .5) * shakeMag * 2; sy = (Math.random() - .5) * shakeMag * 2; }
    ctx.translate(-Math.round(camX) + sx, sy);

    ctx.drawImage(scenery.terrain, 0, 0);
    // goal
    const gl = level.goal;
    ctx.fillStyle = "#e9e4ff"; ctx.fillRect(gl.x + 4, gl.y, 5, gl.h);
    ctx.fillStyle = won ? "#b8f34a" : "#ff6fb5";
    const wave = Math.sin(t / 180) * 4;
    ctx.beginPath(); ctx.moveTo(gl.x + 9, gl.y + 2); ctx.lineTo(gl.x + 44, gl.y + 14 + wave); ctx.lineTo(gl.x + 9, gl.y + 28); ctx.fill();
    // coins
    for (const c of coins) if (!c.got) {
      const b = Math.sin(t / 250 + c.x) * 3, sw = Math.abs(Math.cos(t / 300 + c.x));
      ctx.save(); ctx.translate(c.x, c.y + b);
      ctx.fillStyle = 'rgba(255,211,111,.12)'; ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.fill();
      ctx.scale(.45 + .55 * sw, 1);
      ctx.fillStyle = '#bd752e'; ctx.beginPath(); ctx.ellipse(1, 1, 12, 13, 0, 0, 7); ctx.fill();
      ctx.fillStyle = '#ffcf70'; ctx.beginPath(); ctx.ellipse(0, -1, 10, 11, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = '#fff0b8'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, -1, 7, 8, 0, 0, 7); ctx.stroke();
      ctx.fillStyle = '#fff9dc'; ctx.fillRect(-1, -6, 2, 10); ctx.restore();
      ctx.strokeStyle = `rgba(255,248,215,${Math.max(0, Math.sin(t / 420 + c.x))})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(c.x + 8, c.y + b - 18); ctx.lineTo(c.x + 8, c.y + b - 8);
      ctx.moveTo(c.x + 3, c.y + b - 13); ctx.lineTo(c.x + 13, c.y + b - 13); ctx.stroke();
    }
    // arc trail
    if (P.arc && arc.length > 1) {
      ctx.fillStyle = "rgba(184,243,74,.55)";
      for (let i = 0; i < arc.length; i += 3) { ctx.beginPath(); ctx.arc(arc[i][0], arc[i][1], 2, 0, 7); ctx.fill(); }
    }
    // particles
    for (const p of parts) { ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.s, p.s); }
    ctx.globalAlpha = 1;
    // player
    const cx = pl.x + pl.w / 2, by = pl.y + pl.h;
    const w = (pl.w + 6) * pl.sx, h = (pl.h + 6) * pl.sy; // Visual padding; collision bounds are unchanged.
    ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(cx, by + 1, w / 2, 4, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "#75c9c0"; ctx.strokeStyle = "#112e3a"; ctx.lineWidth = 3; roundRect(cx - w / 2, by - h, w, h, 11); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#ffe0a1"; roundRect(cx - w / 2 - 2, by - h, w + 4, h * .28, 7); ctx.fill(); ctx.stroke(); // explorer cap
    ctx.fillStyle = "#fff";
    const ex = cx + pl.face * 4, ey = by - h * .55;
    ctx.beginPath(); ctx.ellipse(ex - 5, ey, 4, 5 * pl.sy, 0, 0, 7); ctx.ellipse(ex + 5, ey, 4, 5 * pl.sy, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "#120f29";
    ctx.beginPath(); ctx.arc(ex - 5 + pl.face * 1.5, ey, 2, 0, 7); ctx.arc(ex + 5 + pl.face * 1.5, ey, 2, 0, 7); ctx.fill();
    ctx.restore();

    ctx.drawImage(scenery.vignette, 0, 0);
  }

  // Rasterize static art once; animation only composites these cached layers.
  function buildScenery() {
    const make = (width, paint) => {
      const image = document.createElement('canvas'); image.width = Math.ceil(width); image.height = H;
      paint(image.getContext('2d')); return image;
    };
    const sky = make(W + WORLD_W * .06, c => {
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#0c192e'); g.addColorStop(.6, '#254559'); g.addColorStop(1, '#81948b');
      c.fillStyle = g; c.fillRect(0, 0, c.canvas.width, H);
      const glow = c.createRadialGradient(520, 180, 5, 520, 180, 380);
      glow.addColorStop(0, '#497c8055'); glow.addColorStop(1, '#497c8000');
      c.fillStyle = glow; c.fillRect(0, 0, c.canvas.width, H);
      for (const star of stars) {
        c.fillStyle = `rgba(226,244,237,${.25 + star.r / 3})`;
        c.beginPath(); c.arc(star.x % c.canvas.width, star.y, star.r * .65, 0, 7); c.fill();
      }
      const halo = c.createRadialGradient(775, 104, 25, 775, 104, 116);
      halo.addColorStop(0, '#fce8b938'); halo.addColorStop(1, '#fce8b900');
      c.fillStyle = halo; c.fillRect(650, 0, 250, 240);
      const moon = c.createRadialGradient(760, 88, 2, 775, 104, 40);
      moon.addColorStop(0, '#fff3cf'); moon.addColorStop(1, '#c2c5ad');
      c.fillStyle = moon; c.beginPath(); c.arc(775, 104, 37, 0, 7); c.fill();
      for (const [x,y,r] of [[762,94,8],[789,116,10],[778,81,4],[756,115,4],[793,94,5]]) {
        c.fillStyle = '#7f958b33'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.strokeStyle = '#fff9de33'; c.stroke();
      }
    });
    const hills = [[.17,330,66,'#496474',.004],[.33,378,62,'#2c4d5d',.006],[.55,430,48,'#193b49',.009]].map(([par,base,amp,color,freq]) => ({ par, image: make(W + WORLD_W * par, c => {
      const haze = c.createLinearGradient(0,base-amp,0,H); haze.addColorStop(0,color); haze.addColorStop(1,'#102a3d'); c.fillStyle=haze;
      c.beginPath(); c.moveTo(0,H);
      for(let x=0;x<=c.canvas.width+8;x+=8) c.lineTo(x,base-Math.sin(x*freq)*amp-Math.sin(x*freq*2.3)*amp*.3);
      c.lineTo(c.canvas.width,H); c.fill();
    }) }));
    const terrain = make(WORLD_W, c => {
      for (const s of level.solids) {
        const depth = Math.max(s.h,30);
        c.shadowColor='#07172388'; c.shadowBlur=13; c.shadowOffsetY=9;
        const dirt=c.createLinearGradient(0,s.y,0,s.y+depth); dirt.addColorStop(0,'#52665a'); dirt.addColorStop(1,'#263f43'); c.fillStyle=dirt;
        c.beginPath(); c.roundRect(s.x,s.y,s.w,depth,7); c.fill(); c.shadowBlur=0; c.shadowOffsetY=0;
        for(let x=s.x+8;x<s.x+s.w-6;x+=17) {
          const y=s.y+13+((x*7)%Math.max(8,depth-16)); c.fillStyle='#91a18933'; c.fillRect(x,y,5,2); c.fillStyle='#132d3933'; c.fillRect(x+3,y+4,7,3);
        }
        c.fillStyle='#548b78'; c.beginPath(); c.roundRect(s.x,s.y,s.w,9,4); c.fill();
        c.fillStyle='#b3d5a1'; c.fillRect(s.x+4,s.y,s.w-8,2); c.strokeStyle='#8fbb94'; c.lineWidth=1;
        for(let x=s.x+12;x<s.x+s.w-8;x+=23) { c.beginPath(); c.moveTo(x-2,s.y+1); c.lineTo(x-4,s.y-4); c.moveTo(x,s.y+1); c.lineTo(x+3,s.y-3); c.stroke(); }
      }
    });
    const vignette=make(W,c=>{ const g=c.createRadialGradient(W/2,H/2,160,W/2,H/2,540); g.addColorStop(0,'#06132600'); g.addColorStop(1,'#06132666'); c.fillStyle=g; c.fillRect(0,0,W,H); });
    return { sky,hills,terrain,vignette };
  }
  function roundRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.min(.05, (now - last) / 1000 || 0); last = now; acc += dt;
    while (acc >= STEP) { step(STEP); acc -= STEP; }
    draw(now);
    if (Math.floor(now / 100) !== Math.floor((now - dt * 1000) / 100)) readouts();
    raf = requestAnimationFrame(frame);
  }

  function readouts() {
    const q = (id) => root.querySelector("#" + id);
    const up = v0() / P.gravity, down = Math.sqrt(2 * P.jumpHeight / (P.gravity * P.fallMult));
    q("roV0").textContent = Math.round(v0()) + " px/s";
    q("roAir").textContent = (up + down).toFixed(2) + "s";
    q("roVx").textContent = Math.round(pl.vx);
    q("roVy").textContent = Math.round(pl.vy);
    q("roGround").textContent = pl.ground ? L().yes : (pl.coyoteT > 0 ? L().coyote : L().no);
    q("roApex").textContent = pl.measured == null ? "–" : pl.measured + "px";
    q("roJumps").textContent = stats.jumps;
    q("labCoins").textContent = `${stats.got}/${coins.length}`;
    q("labTime").textContent = stats.time.toFixed(1);
    q("labFalls").textContent = stats.falls;
    q("labGoal").hidden = !msg;
    q("labGoal").textContent = msg ? L().goal(`\u2066${stats.got}\u2069`, `\u2066${coins.length}\u2069`, `\u2066${stats.time.toFixed(1)}\u2069`) : '';

  }

  /* ---------- UI ---------- */
  function buildUI(el) {
    const T = L();
    const icons = ['<circle cx="12" cy="12" r="8"/><path d="M12 7v10m-3-8h5m-5 6h5"/>','<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>','<path d="M7 16v-3a7 7 0 1 1 10 0v3h-3v3h-4v-3Z"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/>'];
    const slider = ([k,label,min,max,st]) => `<div class="lab-control"><label for="s-${k}">${T.sliders[k][0]}<output dir="ltr" id="o-${k}"></output></label><input type="range" id="s-${k}" data-k="${k}" min="${min}" max="${max}" step="${st}" aria-describedby="help-${k}"><small id="help-${k}">${T.sliders[k][1]}</small></div>`;
    const toggle = ([k]) => `<label class="lab-switch"><span>${T.toggles[k]}</span><input type="checkbox" role="switch" data-t="${k}"><span class="lab-switch-track" aria-hidden="true"></span></label>`;
    el.innerHTML = `
      <div class="page-head lab-header">
        <span class="eyebrow">${T.pageEyebrow}</span>
        <h1>${T.pageTitle}</h1>
        <p>${T.pageIntro}</p>
      </div>
      <section class="gl-pick" aria-labelledby="glPickH">
        <h2 id="glPickH">${T.pickH}</h2>
        <div class="gl-pick-grid">${window.GenreLab ? GenreLab.ORDER.map(id => { const I = GenreLab.INFO[id]; return `<button class="gl-pick-card" data-genre="${id}" aria-pressed="false"><span class="gi" aria-hidden="true">${I.icon}</span><span class="gn">${GenreLab.tr(I.name)}</span>${id === "platformer" ? `<span class="gt">${T.tunable}</span>` : ""}</button>`; }).join("") : ""}</div>
      </section>
      <div id="labGenre" hidden></div>
      <div id="labPlat">
      <div class="lab-plat-head">
        <h2>${T.featH}</h2>
        <p>${T.intro}</p>
        <ul class="lab-keys">${T.keys.map(([label, ...alts]) => `<li><span class="lk-label">${label}</span>${alts.map(ks => `<bdi dir="ltr" class="lk-combo">${ks.map(k => `<kbd>${k}</kbd>`).join("")}</bdi>`).join(`<span class="lk-or">${T.or}</span>`)}</li>`).join("")}</ul>
      </div>
      <div class="lab-wrap">
        <div class="lab-main">
          <div class="card lab-stage">
            <div class="lab-viewport">
            <canvas id="labCanvas" width="${W}" height="${H}" aria-label="${T.canvas}" dir="ltr" tabindex="0"></canvas>
            <div class="lab-status">${T.counters.map((label,i) => `<div class="lab-chip"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg><span>${label}</span><bdi dir="ltr" id="${['labCoins','labTime','labFalls'][i]}">0</bdi>${i === 1 ? `<span>${T.seconds}</span>` : ''}</div>`).join('')}</div>
            <div class="lab-goal" id="labGoal" role="status" hidden></div>
            </div>
            <div class="touch-pad lab-touch" dir="ltr">
              <div><button data-k="left" aria-label="${T.keys[0][0]} ←">◀</button><button data-k="right" aria-label="${T.keys[0][0]} →">▶</button></div>
              <div><button class="jump" data-k="jump" aria-label="${T.keys[1][0]}">⤒</button></div>
            </div>
            <div class="lab-hud">
              ${[[T.hud[0],'roV0'],[T.hud[1],'roAir'],['vx · px/s','roVx'],['vy · px/s','roVy'],[T.hud[2],'roGround'],[T.hud[3],'roApex'],[T.hud[4],'roJumps']].map(([label,id]) => `<div class="lab-stat"><span>${label}</span><bdi dir="${id === 'roGround' ? 'auto' : 'ltr'}" id="${id}">–</bdi></div>`).join('')}
            </div>
          </div>
          <div class="lab-notes">
            ${T.exps.map(([h, p]) => `<div class="card"><h4>${h}</h4><p>${p}</p></div>`).join("")}
          </div>
        </div>
        <aside class="card lab-controls">
          <h3>${T.h[0]}</h3>
          <div class="lab-presets">${Object.keys(PRESETS).map(n => `<button class="lab-preset" data-preset="${n}" aria-pressed="false">${T.presets[n]}</button>`).join('')}<span class="lab-custom" id="labCustom">${T.custom}</span></div>
          ${T.groups.map((name,i) => `<details class="lab-group" ${i === 0 ? 'open' : ''}><summary><span>${name}</span><bdi>0${i+1}</bdi></summary><div class="lab-group-body">${SLIDERS.filter((_,j) => i === 0 ? j < 3 : i === 1 ? j >= 3 && j < 7 : i === 2 ? j >= 7 : false).map(slider).join('')}${(i === 0 ? TOGGLES.slice(0,1) : i === 3 ? TOGGLES.slice(1) : []).map(toggle).join('')}</div></details>`).join('')}
          <div class="lab-actions">
            <button class="btn small" id="labReset">${T.restart}</button>
            <button class="btn small" id="labCopy">${T.copy}</button>
          </div>
        </aside>
      </div>
      </div>`;
    el.querySelectorAll("[data-genre]").forEach(b => b.addEventListener("click", () => select(b.dataset.genre, true)));

    const unitOf = Object.fromEntries(SLIDERS.map(s => [s[0], s[5]]));
    function syncPreset() {
      el.querySelectorAll('[data-preset]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.preset === activePreset)));
      el.querySelector('#labCustom').classList.toggle('lab-selected', activePreset === null);
    }
    function fill(i) { i.style.setProperty('--fill', `${(i.value - i.min) / (i.max - i.min) * 100}%`); }
    function syncUI() {
      syncPreset();
      el.querySelectorAll("input[data-k]").forEach(i => { i.value = P[i.dataset.k]; fill(i); el.querySelector("#o-" + i.dataset.k).textContent = fmt(P[i.dataset.k]) + " " + unitOf[i.dataset.k]; });
      el.querySelectorAll("input[data-t]").forEach(i => { i.checked = !!P[i.dataset.t]; });
    }
    const fmt = (v) => Number.isInteger(v) ? v : (+v).toFixed(2);
    el.querySelectorAll("input[data-k]").forEach(i => i.addEventListener("input", () => {
      P[i.dataset.k] = parseFloat(i.value); fill(i); activePreset = null; syncPreset();
      el.querySelector("#o-" + i.dataset.k).textContent = fmt(P[i.dataset.k]) + " " + unitOf[i.dataset.k];
      touched();
    }));
    el.querySelectorAll("input[data-t]").forEach(i => i.addEventListener("change", () => { P[i.dataset.t] = i.checked; activePreset = null; syncPreset(); touched(); }));
    el.querySelectorAll("[data-preset]").forEach(b => b.addEventListener("click", () => {
      activePreset = b.dataset.preset; P = { ...DEFAULTS, ...PRESETS[activePreset] }; syncUI(); reset(true); touched();
    }));
    el.querySelector("#labReset").addEventListener("click", () => reset(true));
    el.querySelector("#labCopy").addEventListener("click", () => {
      const txt = JSON.stringify(P, null, 2);
      try { navigator.clipboard.writeText(txt); hooks.toast && hooks.toast(L().copied); } catch (e) { /* ignore */ }
    });
    el.querySelectorAll(".touch-pad button").forEach(b => {
      const k = b.dataset.k;
      const on = (e) => { e.preventDefault(); if (k === "jump" && !input.jump) pl.bufferT = P.buffer / 1000 || STEP * 2; input[k] = true; touched(); };
      const off = (e) => { e.preventDefault(); input[k] = false; };
      b.addEventListener("pointerdown", on); b.addEventListener("pointerup", off);
      b.addEventListener("pointerleave", off); b.addEventListener("pointercancel", off);
    });
    syncUI();
  }

  function select(id, user) {
    if (!window.GenreLab || !(id in GenreLab.INFO)) id = "platformer";
    mode = id;
    root.querySelectorAll("[data-genre]").forEach(b => { const on = b.dataset.genre === id; b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); });
    const plat = root.querySelector("#labPlat"), gen = root.querySelector("#labGenre");
    plat.hidden = id !== "platformer"; gen.hidden = id === "platformer";
    if (id === "platformer") { if (window.GenreLab) GenreLab.close(); gen.innerHTML = ""; if (pageOn) loopStart(); }
    else { loopStop(); GenreLab.open(gen, id, { onPlay: touched }); if (!pageOn) GenreLab.stop(); }
    const hash = "#/lab" + (id === "platformer" ? "" : "/" + id);
    if (user && location.hash !== hash) history.replaceState(null, "", hash);
  }
  function loopStart() { if (running) return; running = true; last = performance.now(); acc = 0; raf = requestAnimationFrame(frame); }
  function loopStop() { running = false; cancelAnimationFrame(raf); input.left = input.right = input.jump = false; }

  function touched() { if (hooks.onPlay) { hooks.onPlay(); hooks.onPlay = null; } }

  const KEYS = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", Space: "jump", ArrowUp: "jump", KeyW: "jump" };
  function onKey(e, down) {
    if (!running) return;
    const tag = (e.target && e.target.tagName) || "";
    if (down && /INPUT|TEXTAREA|SELECT|BUTTON|SUMMARY/.test(tag)) return;
    if (e.code === "KeyR" && down) { reset(true); return; }
    const k = KEYS[e.code];
    if (!k) return;
    e.preventDefault();
    if (k === "jump" && down && !input.jump) pl.bufferT = P.buffer / 1000 || STEP * 2;
    input[k] = down;
    if (down) touched();
  }
  window.addEventListener("keydown", (e) => onKey(e, true));
  window.addEventListener("keyup", (e) => onKey(e, false));
  window.addEventListener("blur", () => { input.left = input.right = input.jump = false; });

  window.Lab = {
    mount(el, h) {
      hooks = h || {};
      root = el;
      if (el.dataset.built !== LANG()) { const first = !el.dataset.built; buildUI(el); el.dataset.built = LANG(); if (first) reset(true); }
      canvas = el.querySelector("#labCanvas");
      ctx = canvas.getContext("2d");
      if (!scenery) scenery = buildScenery();
      readouts();
      select(hooks.genre || "platformer", false);
    },
    start() { pageOn = true; if (mode === "platformer") loopStart(); else if (window.GenreLab) GenreLab.start(); },
    stop() { pageOn = false; loopStop(); if (window.GenreLab) GenreLab.stop(); }
  };
})();
