/* Genre Lab — one tiny playable game per genre, so learners can feel what defines each type. */
(function () {
  const W = 960, H = 480;
  const LANG = () => (window.GA_LANG ? window.GA_LANG() : "en");
  const tr = (o) => (o && (o[LANG()] || o.en)) || "";
  const rand = (a, b) => b === undefined ? Math.random() * a : a + Math.random() * (b - a);
  const irand = (n) => Math.floor(Math.random() * n);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
  const FONT = "600 15px 'IBM Plex Mono', ui-monospace, monospace";

  const UI = {
    en: { play: "▶ Play", again: "↺ Play again", restart: "↺ Restart", what: "What is it?", loop: "Core loop", notice: "Notice while playing", controls: "Controls",
      win: "You did it!", over: "Game over", timeUp: "Time's up!", draw: "Draw!", score: "Score", best: "Best", newBest: "New best!", gallery: "See examples in the gallery →",
      lives: "Lives", hp: "HP", moves: "Moves", time: "Time", wave: "Wave", kills: "Kills", gold: "Gold", coins: "Coins", goal: "Goal", lv: "Lv", xp: "XP", potions: "Potions",
      gems: "Gems", key: "Key", speed: "km/h", dist: "Distance", you: "You", ai: "AI", draws: "Draws", placed: "Placed", q: "Question", streak: "Streak", harvests: "Harvests", plots: "Plots" },
    ar: { play: "▶ العب", again: "↺ العب مرة أخرى", restart: "↺ أعد البدء", what: "ما هذا النوع؟", loop: "حلقة اللعب الأساسية", notice: "لاحظ أثناء اللعب", controls: "التحكم",
      win: "أحسنت!", over: "انتهت اللعبة", timeUp: "انتهى الوقت!", draw: "تعادل!", score: "النقاط", best: "الأفضل", newBest: "رقم قياسي جديد!", gallery: "شاهد أمثلة في المعرض ←",
      lives: "الأرواح", hp: "الصحة", moves: "الحركات", time: "الوقت", wave: "الموجة", kills: "الإصابات", gold: "الذهب", coins: "العملات", goal: "الهدف", lv: "المستوى", xp: "الخبرة", potions: "الجرعات",
      gems: "الجواهر", key: "المفتاح", speed: "كم/س", dist: "المسافة", you: "أنت", ai: "الحاسوب", draws: "تعادل", placed: "في مكانها", q: "السؤال", streak: "سلسلة", harvests: "المحاصيل", plots: "الأراضي" }
  };
  const U = () => UI[LANG()] || UI.en;

  /* Genre catalogue: order matches the gallery genres. */
  const INFO = {
    platformer: { icon: "🍄", name: { en: "Platformer", ar: "المنصات" } },
    arcade: { icon: "🕹️", name: { en: "Arcade", ar: "أركيد" }, game: { en: "Meteor Storm", ar: "عاصفة النيازك" },
      what: { en: "Short, intense rounds with simple controls. Difficulty keeps rising until you fail — then you try again to beat your score.", ar: "جولات قصيرة ومكثفة وتحكم بسيط. الصعوبة ترتفع باستمرار حتى تخسر — ثم تحاول مجددًا لتكسر رقمك." },
      loop: { en: ["Dodge", "Shoot", "Score", "Retry for a better score"], ar: ["تفادَ", "أطلق", "اجمع النقاط", "أعد المحاولة لرقم أعلى"] },
      notice: { en: ["Meteors come faster every few seconds — that's the difficulty curve.", "Big rocks need two hits and give more points: risk vs. reward.", "Shake and sparks make each hit feel strong."], ar: ["النيازك تتسارع كل بضع ثوانٍ — هذا منحنى الصعوبة.", "الصخور الكبيرة تحتاج ضربتين وتعطي نقاطًا أكثر: مخاطرة مقابل مكافأة.", "الاهتزاز والشرر يجعلان كل إصابة قوية الإحساس."] },
      controls: { en: "← → move · Space shoot (hold)", ar: "← → للحركة · Space للإطلاق (اضغط مطولًا)" } },
    puzzle: { icon: "🔷", name: { en: "Puzzle & Match", ar: "الألغاز والمطابقة" }, game: { en: "Gem Quest", ar: "مغامرة الجواهر" },
      what: { en: "A level-based match-3: every level gives a clear goal and a move limit. Simple rules, but planning which gems to match — and where — is the real game.", ar: "لعبة مطابقة بالمستويات: لكل مستوى هدف واضح وعدد حركات محدود. القواعد بسيطة، لكن اللعبة الحقيقية في التخطيط: أي جواهر تطابق وأين." },
      loop: { en: ["Read the level goals", "Drag to swap two gems", "Make special gems", "Finish the goals before moves run out"], ar: ["اقرأ أهداف المستوى", "اسحب لتبدّل جوهرتين", "اصنع جواهر خاصة", "حقق الأهداف قبل نفاد الحركات"] },
      notice: { en: ["Goals are always on screen — the player never wonders what to do.", "Crates are obstacles: they only break when you match next to them, so they steer where you play.", "Bigger matches create special gems — the game rewards planning, not luck.", "Leftover moves turn into celebration rockets: a satisfying finish."], ar: ["الأهداف ظاهرة دائمًا — اللاعب لا يتساءل أبدًا ماذا يفعل.", "الصناديق عقبات: لا تنكسر إلا بمطابقة بجوارها، فتوجّه مكان لعبك.", "المطابقات الأكبر تصنع جواهر خاصة — اللعبة تكافئ التخطيط لا الحظ.", "الحركات المتبقية تتحول صواريخ احتفالية: نهاية مُرضية."] },
      controls: { en: "Drag a gem onto a neighbour (or click both) · tap a special gem to fire it", ar: "اسحب جوهرة نحو جارتها (أو انقر الاثنتين) · انقر الجوهرة الخاصة لتفجيرها" } },
    jigsaw: { icon: "🧩", name: { en: "Jigsaw Puzzle", ar: "ألغاز التركيب" }, game: { en: "Picture Pieces", ar: "قطع الصورة" },
      what: { en: "Rebuild a picture from mixed-up pieces. Relaxing, visual and satisfying — every correct piece is a small win.", ar: "أعد بناء صورة من قطع مبعثرة. مريحة وبصرية ومُرضية — كل قطعة صحيحة انتصار صغير." },
      loop: { en: ["Compare with the preview", "Pick a piece", "Swap it into place", "Watch the picture appear"], ar: ["قارن بالصورة المصغّرة", "اختر قطعة", "بدّلها إلى مكانها", "شاهد الصورة تكتمل"] },
      notice: { en: ["Correct pieces lock with a glow — progress you can see.", "No timer pressure: the genre is about calm focus.", "The preview is a design aid that lowers frustration."], ar: ["القطع الصحيحة تُقفل وتتوهج — تقدّم تراه بعينك.", "لا ضغط وقت: هذا النوع عن التركيز الهادئ.", "الصورة المصغّرة أداة تصميم تقلل الإحباط."] },
      controls: { en: "Click a piece, then another to swap them", ar: "انقر قطعة ثم أخرى لتبديلهما" } },
    adventure: { icon: "🗺️", name: { en: "Adventure", ar: "المغامرات" }, game: { en: "The Guardian's Chest", ar: "صندوق الحارس" },
      what: { en: "Explore a world, talk to characters, find items and use them to open the way forward. Curiosity is the engine.", ar: "استكشف عالمًا وتحدّث مع الشخصيات وابحث عن الأدوات واستخدمها لفتح الطريق. الفضول هو المحرّك." },
      loop: { en: ["Explore", "Talk & find clues", "Get an item", "Unlock a new area"], ar: ["استكشف", "تحدّث واجمع الأدلة", "احصل على أداة", "افتح منطقة جديدة"] },
      notice: { en: ["Dark rooms stay hidden until you enter — that pulls you forward.", "The locked door is a question; the key is its answer.", "Gems are optional: rewards for players who explore every corner."], ar: ["الغرف المظلمة تبقى مخفية حتى تدخلها — وهذا يشدّك للأمام.", "الباب المقفل سؤال، والمفتاح جوابه.", "الجواهر اختيارية: مكافأة لمن يستكشف كل زاوية."] },
      controls: { en: "Arrows / WASD move · Space talk", ar: "الأسهم / WASD للحركة · Space للتحدث" } },
    action: { icon: "⚔️", name: { en: "Action", ar: "الأكشن" }, game: { en: "Slime Arena", ar: "حلبة الهلام" },
      what: { en: "Fast real-time combat that tests reflexes and positioning. Every hit must feel powerful and readable.", ar: "قتال سريع في الزمن الحقيقي يختبر ردود الفعل والتمركز. كل ضربة يجب أن تكون قوية وواضحة." },
      loop: { en: ["Move & position", "Strike", "Avoid damage", "Survive the next wave"], ar: ["تحرّك وتمركز", "اضرب", "تفادَ الضرر", "انجُ من الموجة التالية"] },
      notice: { en: ["Hit-stop: the game freezes for a split second on each hit.", "Knockback pushes enemies away and gives you space.", "After getting hurt you blink — short invincibility is fair design."], ar: ["توقف الضربة: اللعبة تتجمد جزءًا من الثانية مع كل إصابة.", "الارتداد يدفع الأعداء بعيدًا ويمنحك مساحة.", "بعد الإصابة تومض — مناعة قصيرة تصميم عادل."] },
      controls: { en: "Arrows / WASD move · Space slash", ar: "الأسهم / WASD للحركة · Space للضرب" } },
    rpg: { icon: "🛡️", name: { en: "RPG", ar: "تقمّص الأدوار" }, game: { en: "Three Battles", ar: "ثلاث معارك" },
      what: { en: "You grow a character. Battles give XP, XP gives levels, levels make you stronger — progress is the reward.", ar: "أنت تطوّر شخصية. المعارك تمنح خبرة، والخبرة ترفع المستوى، والمستوى يقوّيك — التقدّم هو المكافأة." },
      loop: { en: ["Choose an action", "Read the enemy", "Win XP", "Level up & go on"], ar: ["اختر فعلًا", "اقرأ العدو", "اكسب الخبرة", "ارفع مستواك وتابع"] },
      notice: { en: ["Turn-based: no rush, every choice is a decision.", "When an enemy is charging, Defend — reading the enemy matters.", "Resources (MP, potions) are limited: spend them wisely."], ar: ["بالأدوار: لا عجلة، كل اختيار قرار.", "عندما يتهيأ العدو لضربة قوية، دافع — قراءة العدو مهمة.", "الموارد (الطاقة والجرعات) محدودة: أنفقها بحكمة."] },
      controls: { en: "Use the action buttons under the game", ar: "استخدم أزرار الأفعال أسفل اللعبة" } },
    strategy: { icon: "♟️", name: { en: "Strategy", ar: "الاستراتيجية" }, game: { en: "Path Defense", ar: "الدفاع عن الطريق" },
      what: { en: "Win by planning, not speed. You manage limited resources and decide where and when to invest.", ar: "تفوز بالتخطيط لا بالسرعة. تدير موارد محدودة وتقرر أين ومتى تستثمر." },
      loop: { en: ["Earn gold", "Build or upgrade", "Watch the wave", "Adjust your plan"], ar: ["اكسب الذهب", "ابنِ أو طوّر", "راقب الموجة", "عدّل خطتك"] },
      notice: { en: ["Corners of the path are worth more — enemies stay in range longer.", "Build new or upgrade old? That's a real trade-off.", "Waves grow stronger, so early choices matter later."], ar: ["زوايا الطريق أثمن — الأعداء يبقون في المدى وقتًا أطول.", "تبني جديدًا أم تطوّر القديم؟ هذه مفاضلة حقيقية.", "الموجات تقوى، فقراراتك المبكرة تؤثر لاحقًا."] },
      controls: { en: "Click grass to build (50) · click a tower to upgrade", ar: "انقر العشب للبناء (50) · انقر برجًا لتطويره" } },
    quiz: { icon: "❓", name: { en: "Quiz & Trivia", ar: "الأسئلة والأجوبة" }, game: { en: "Genre Quiz", ar: "اختبار الأنواع" },
      what: { en: "Knowledge is the challenge. A timer and streak bonus turn simple questions into tension.", ar: "المعرفة هي التحدي. المؤقت ومكافأة السلسلة يحوّلان الأسئلة البسيطة إلى توتر ممتع." },
      loop: { en: ["Read", "Answer before time runs out", "Build a streak", "See your score"], ar: ["اقرأ", "أجب قبل نفاد الوقت", "ابنِ سلسلة", "شاهد نتيجتك"] },
      notice: { en: ["Fast answers earn more — the timer adds pressure.", "A streak multiplies points: momentum feels great.", "Instant right/wrong colours = clear feedback."], ar: ["الإجابة السريعة تكسب أكثر — المؤقت يضيف ضغطًا.", "السلسلة تضاعف النقاط: الزخم إحساس رائع.", "ألوان الصح والخطأ الفورية = إشارة واضحة."] },
      controls: { en: "Click an answer", ar: "انقر الإجابة" } },
    board: { icon: "🎲", name: { en: "Board & Cards", ar: "اللوحة والورق" }, game: { en: "Four in a Row", ar: "أربعة في صف" },
      what: { en: "Turn-based games with clear rules and an opponent. You win by thinking a few moves ahead.", ar: "ألعاب بالأدوار وقواعد واضحة وخصم. تفوز بالتفكير قبل خصمك بخطوات." },
      loop: { en: ["Your turn", "Opponent's turn", "Block & build threats", "Connect four"], ar: ["دورك", "دور الخصم", "اصنع التهديدات واقطعها", "صِل أربعة"] },
      notice: { en: ["Every move does two jobs: attack and defend.", "The AI blocks you — watch how it reacts.", "Simple rules, deep play: a mark of good board games."], ar: ["كل حركة لها مهمتان: هجوم ودفاع.", "الحاسوب يقطع عليك — راقب كيف يتفاعل.", "قواعد بسيطة وعمق كبير: علامة ألعاب اللوحة الجيدة."] },
      controls: { en: "Click a column to drop your disc", ar: "انقر عمودًا لإسقاط قطعتك" } },
    simulation: { icon: "🏗️", name: { en: "Simulation", ar: "المحاكاة" }, game: { en: "Tiny Farm", ar: "المزرعة الصغيرة" },
      what: { en: "You run a system: invest, wait, collect, expand. The fun is watching your little economy grow.", ar: "أنت تدير نظامًا: استثمر وانتظر واجمع وتوسّع. المتعة في مشاهدة اقتصادك الصغير ينمو." },
      loop: { en: ["Plant (5)", "Wait for it to grow", "Harvest (+18)", "Buy land & upgrades"], ar: ["ازرع (5)", "انتظر حتى ينمو", "احصد (+18)", "اشترِ أرضًا وتحسينات"] },
      notice: { en: ["Ripe crops wither if ignored — gentle time pressure.", "Upgrades change the system itself (faster growth, a helper).", "The day/night cycle shows time passing."], ar: ["المحصول الناضج يذبل إن أهملته — ضغط وقت لطيف.", "التحسينات تغيّر النظام نفسه (نمو أسرع، مساعد).", "دورة الليل والنهار تُظهر مرور الوقت."] },
      controls: { en: "Click plots · use the shop buttons", ar: "انقر الأراضي · استخدم أزرار المتجر" } },
    racing: { icon: "🏎️", name: { en: "Racing", ar: "السباق" }, game: { en: "Checkpoint Rush", ar: "سباق نقاط التفتيش" },
      what: { en: "Speed and control. Push faster without crashing, and reach each checkpoint before the clock runs out.", ar: "سرعة وتحكم. اندفع أسرع دون اصطدام، وصل كل نقطة تفتيش قبل نفاد الوقت." },
      loop: { en: ["Accelerate", "Weave through traffic", "Hit a checkpoint (+time)", "Go further"], ar: ["تسارع", "راوغ بين السيارات", "اعبر نقطة تفتيش (+وقت)", "اذهب أبعد"] },
      notice: { en: ["Grass slows you: the track has edges for a reason.", "Crashing costs speed, and speed is time.", "Checkpoints reset tension: relief, then pressure again."], ar: ["العشب يبطئك: للمضمار حدود لسبب.", "الاصطدام يكلّفك سرعة، والسرعة وقت.", "نقاط التفتيش تعيد التوتر: ارتياح ثم ضغط من جديد."] },
      controls: { en: "← → steer · ↑ accelerate · ↓ brake", ar: "← → للتوجيه · ↑ للتسارع · ↓ للفرملة" } }
  };
  const ORDER = ["platformer", "arcade", "puzzle", "jigsaw", "adventure", "action", "rpg", "strategy", "quiz", "board", "simulation", "racing"];

  /* ---------- shared drawing helpers ---------- */
  function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
  function bgGrad(c, a, b) { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  function bar(c, x, y, w, h, f, col) { c.fillStyle = "#0008"; rr(c, x, y, w, h, h / 2); c.fill(); c.fillStyle = col; rr(c, x, y, Math.max(h, w * clamp(f, 0, 1)), h, h / 2); c.fill(); }
  function heroSprite(c, x, y, s, face, flash) {
    c.save(); c.translate(x, y); c.scale(s * face, s);
    c.fillStyle = "rgba(0,0,0,.25)"; c.beginPath(); c.ellipse(0, 20, 18, 5, 0, 0, 7); c.fill();
    c.fillStyle = flash ? "#fff" : "#75c9c0"; c.strokeStyle = "#112e3a"; c.lineWidth = 3; rr(c, -17, -20, 34, 40, 11); c.fill(); c.stroke();
    c.fillStyle = flash ? "#fff" : "#ffe0a1"; rr(c, -19, -20, 38, 12, 7); c.fill(); c.stroke();
    c.fillStyle = "#fff"; c.beginPath(); c.ellipse(-1, -1, 4, 5, 0, 0, 7); c.ellipse(9, -1, 4, 5, 0, 0, 7); c.fill();
    c.fillStyle = "#120f29"; c.beginPath(); c.arc(0.5, -1, 2, 0, 7); c.arc(10.5, -1, 2, 0, 7); c.fill();
    c.restore();
  }

  /* ================= GAMES ================= */
  const GAMES = {};

  /* ---- Arcade: Meteor Storm ---- */
  GAMES.arcade = (A) => {
    let x = W / 2, cd = 0, shots = [], rocks = [], spawn = .6, t = 0, score = 0, lives = 3, inv = 0;
    const stars = Array.from({ length: 90 }, () => ({ x: rand(W), y: rand(H), s: rand(.5, 2.2) }));
    const hud = () => A.hud([[U().score, score], [U().lives, "♥".repeat(Math.max(0, lives)) || "–"], [U().best, A.best()]]);
    hud();
    return {
      pad: ["left", "right", "a"],
      update(dt) {
        t += dt;
        x = clamp(x + ((A.held.right ? 1 : 0) - (A.held.left ? 1 : 0)) * 520 * dt, 30, W - 30);
        cd -= dt; if (A.held.a && cd <= 0) { shots.push({ x: x - 9, y: H - 74 }, { x: x + 9, y: H - 74 }); cd = .17; }
        for (const s of shots) s.y -= 900 * dt;
        spawn -= dt;
        if (spawn <= 0) { const r = rand(16, 40); rocks.push({ x: rand(r, W - r), y: -r, r, vy: rand(110, 170) + t * 5, vx: rand(-40, 40), a: 0, va: rand(-2, 2), hp: r > 30 ? 2 : 1, hit: 0 }); spawn = Math.max(.25, 1.05 - t * .022); }
        for (const k of rocks) { k.y += k.vy * dt; k.x += k.vx * dt; k.a += k.va * dt; k.hit -= dt; }
        for (const k of rocks) for (const s of shots) if (!s.dead && !k.dead && dist(k.x, k.y, s.x, s.y) < k.r + 4) {
          s.dead = true; k.hp--; k.hit = .08; A.burst(s.x, s.y, 4, "#ffd36f", .5);
          if (k.hp <= 0) { k.dead = true; const p = k.r > 30 ? 20 : 10; score += p; A.burst(k.x, k.y, 18, "#c9a27a", 1.2); A.shake(4, .12); A.float(k.x, k.y, "+" + p, "#ffd36f"); hud(); }
        }
        shots = shots.filter(s => !s.dead && s.y > -20);
        inv -= dt;
        for (const k of rocks) if (!k.dead && inv <= 0 && dist(k.x, k.y, x, H - 52) < k.r + 18) {
          k.dead = true; lives--; inv = 1.3; A.shake(11, .3); A.burst(x, H - 52, 26, "#ff6f6f", 1.4); hud();
          if (lives <= 0) A.end(false, score);
        }
        rocks = rocks.filter(k => !k.dead && k.y < H + 60);
      },
      draw(c, now) {
        bgGrad(c, "#070d1f", "#1b2142");
        for (const s of stars) { const y = (s.y + now * .02 * s.s) % H; c.fillStyle = `rgba(220,230,255,${.2 + s.s / 3})`; c.fillRect(s.x, y, s.s, s.s); }
        for (const k of rocks) {
          c.save(); c.translate(k.x, k.y); c.rotate(k.a);
          c.fillStyle = k.hit > 0 ? "#fff" : "#7b6252"; c.strokeStyle = "#3a2b25"; c.lineWidth = 3;
          c.beginPath(); for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, rr2 = k.r * (.82 + ((i * 37) % 7) / 30); c.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } c.closePath(); c.fill(); c.stroke();
          c.fillStyle = "#5d4a3f"; c.beginPath(); c.arc(-k.r * .3, -k.r * .2, k.r * .2, 0, 7); c.arc(k.r * .3, k.r * .25, k.r * .14, 0, 7); c.fill();
          c.restore();
        }
        c.fillStyle = "#b8f34a"; for (const s of shots) { rr(c, s.x - 2, s.y - 9, 4, 16, 2); c.fill(); }
        if (inv <= 0 || Math.floor(now / 90) % 2) {
          c.save(); c.translate(x, H - 52);
          c.fillStyle = "#ff9d5c"; c.beginPath(); c.moveTo(-8, 22); c.lineTo(0, 34 + Math.random() * 10); c.lineTo(8, 22); c.fill();
          c.fillStyle = "#75c9c0"; c.strokeStyle = "#112e3a"; c.lineWidth = 3;
          c.beginPath(); c.moveTo(0, -26); c.lineTo(24, 22); c.lineTo(0, 12); c.lineTo(-24, 22); c.closePath(); c.fill(); c.stroke();
          c.fillStyle = "#ffe0a1"; c.beginPath(); c.ellipse(0, -2, 6, 9, 0, 0, 7); c.fill(); c.restore();
        }
      }
    };
  };

  /* ---- Puzzle: Gem Quest — level-based match-3 with goals, crates and special gems ---- */
  const PZ_KEY = "ga_pz_level";
  const PZ_LEVELS = [
    { moves: 20, goals: [[0, 15], [3, 15]], map: [] },
    { moves: 22, goals: [["box", 8], [1, 15]], map: ["........", "........", "........", "........", ".11..11.", ".11..11.", "........"] },
    { moves: 24, goals: [["box", 10], [2, 18], [4, 18]], map: ["........", "..2..2..", "2......2", "2......2", "........", "...22...", "...22..."] },
    { moves: 26, goals: [["box", 16], [0, 24]], map: ["........", ".1....1.", "1......1", "........", "..1221..", "..1221..", "1..11..1"] }
  ];
  let pzLevel = (() => { try { return clamp(+localStorage.getItem(PZ_KEY) || 0, 0, PZ_LEVELS.length - 1); } catch (e) { return 0; } })();
  const AF = "'Thmanyah Sans', 'IBM Plex Sans Arabic', 'Segoe UI', system-ui, sans-serif", MF = "'IBM Plex Mono', ui-monospace, monospace";
  const PZ_COL = ["#ff5d6c", "#ffc933", "#5ad16b", "#4aa8ff", "#b874ff"], PZ_DARK = ["#b8233a", "#c47f00", "#1f8a38", "#1f5fc4", "#7330c4"];
  function pzGem(c, k, r) {
    c.beginPath();
    if (k === 0) c.arc(0, 0, r * .92, 0, 7);
    else if (k === 1) { c.moveTo(0, -r); c.lineTo(r * .9, 0); c.lineTo(0, r); c.lineTo(-r * .9, 0); c.closePath(); }
    else if (k === 2) c.roundRect(-r * .82, -r * .82, r * 1.64, r * 1.64, r * .38);
    else if (k === 3) { c.moveTo(0, -r); c.bezierCurveTo(r * .95, -r * .05, r * .85, r, 0, r); c.bezierCurveTo(-r * .85, r, -r * .95, -r * .05, 0, -r); c.closePath(); }
    else { for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 - Math.PI / 2, q = i % 2 ? r * .48 : r; c.lineTo(Math.cos(a) * q, Math.sin(a) * q); } c.closePath(); }
    const gr = c.createLinearGradient(0, -r, 0, r); gr.addColorStop(0, PZ_COL[k]); gr.addColorStop(1, PZ_DARK[k]);
    c.fillStyle = gr; c.fill(); c.strokeStyle = "#0008"; c.lineWidth = 2.5; c.stroke();
    c.fillStyle = "#ffffff80"; c.beginPath(); c.ellipse(-r * .28, -r * .38, r * .26, r * .15, -.5, 0, 7); c.fill();
  }
  function pzPower(c, p, r, now) {
    c.strokeStyle = "#0009"; c.lineWidth = 2.5;
    if (p === "h" || p === "v") {
      c.save(); if (p === "v") c.rotate(Math.PI / 2);
      c.fillStyle = "#ff8a3d"; rr(c, -r * .62, -r * .36, r * 1.24, r * .72, r * .3); c.fill(); c.stroke();
      c.fillStyle = "#ffe08a"; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * r, 0); c.lineTo(s * r * .55, -r * .46); c.lineTo(s * r * .55, r * .46); c.closePath(); c.fill(); c.stroke(); }
      c.fillStyle = "#fff"; c.fillRect(-r * .14, -r * .36, r * .28, r * .72);
      c.restore();
    } else if (p === "bomb") {
      const gr = c.createRadialGradient(-r * .25, -r * .1, 2, 0, r * .1, r * .8); gr.addColorStop(0, "#6b7896"); gr.addColorStop(1, "#1b2236");
      c.fillStyle = gr; c.beginPath(); c.arc(0, r * .12, r * .74, 0, 7); c.fill(); c.stroke();
      c.strokeStyle = "#c9a27a"; c.lineWidth = 3; c.beginPath(); c.moveTo(r * .2, -r * .5); c.quadraticCurveTo(r * .45, -r * .95, r * .7, -r * .8); c.stroke();
      c.fillStyle = "#ffd36f"; c.beginPath(); c.arc(r * .72, -r * .82, r * (.16 + Math.sin(now / 70) * .06), 0, 7); c.fill();
    } else if (p === "plane") {
      c.save(); c.rotate(-.35 + Math.sin(now / 260) * .12);
      c.fillStyle = "#eaf7ff"; c.beginPath(); c.moveTo(r, 0); c.lineTo(-r * .8, -r * .72); c.lineTo(-r * .38, 0); c.lineTo(-r * .8, r * .72); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = "#5ab8ff"; c.lineWidth = 2; c.beginPath(); c.moveTo(r * .9, 0); c.lineTo(-r * .38, 0); c.stroke();
      c.restore();
    } else {
      c.save(); c.rotate(now / 500);
      let fill = "#fff";
      if (c.createConicGradient) { fill = c.createConicGradient(0, 0, 0); PZ_COL.concat(PZ_COL[0]).forEach((col, i) => fill.addColorStop(i / 5, col)); }
      c.fillStyle = fill; c.beginPath(); c.arc(0, 0, r * .82, 0, 7); c.fill(); c.strokeStyle = "#fff"; c.stroke();
      c.fillStyle = "#fff"; c.beginPath(); c.arc(0, 0, r * .28, 0, 7); c.fill();
      c.restore();
    }
  }
  function pzBox(c, x, y, s, hp) {
    c.fillStyle = "#b9773e"; c.strokeStyle = "#5b3415"; c.lineWidth = 2.5; rr(c, x + 3, y + 3, s - 6, s - 6, 7); c.fill(); c.stroke();
    c.strokeStyle = "#8a5226"; c.lineWidth = 2; c.beginPath();
    for (let i = 1; i < 3; i++) { c.moveTo(x + 6, y + s * i / 3); c.lineTo(x + s - 6, y + s * i / 3); }
    c.stroke();
    if (hp >= 2) { c.strokeStyle = "#9fb2c0"; c.lineWidth = 4; c.beginPath(); c.moveTo(x + 7, y + 7); c.lineTo(x + s - 7, y + s - 7); c.moveTo(x + s - 7, y + 7); c.lineTo(x + 7, y + s - 7); c.stroke(); }
  }

  GAMES.puzzle = (A) => {
    const AR = LANG() === "ar";
    const TX = AR ? {
      level: "المستوى", moves: "الحركات", score: "النقاط", goals: "اجمع قبل نفاد الحركات", specials: "الجواهر الخاصة",
      l4: "4 في صف", lT: "شكل L أو T", sq: "مربع 2×2", l5: "5 في صف", rocket: "صاروخ", bomb: "قنبلة", plane: "طائرة", rainbow: "قوس قزح",
      intro: ["اسحب جوهرة نحو جارتها لتكوّن 3 متشابهة أو أكثر. اجمع الأهداف قبل نفاد الحركات!",
        "الصناديق تنكسر حين تطابق جواهر بجوارها. كوّن 4 في صف لتصنع صاروخًا!",
        "الصناديق المقوّاة تحتاج ضربتين. شكل L أو T يصنع قنبلة.",
        "المستوى الأخير! بدّل جوهرتين خاصتين ببعضهما لتفجير أقوى."],
      noMatch: "يجب أن يكوّن التبديل 3 جواهر متشابهة على الأقل", shuffle: "لا توجد حركات — نعيد خلط اللوحة",
      done: "تحقق الهدف! الحركات المتبقية تتحول صواريخ 🎉", win: (n) => `اكتمل المستوى ${n}! 🎉`, lose: "نفدت الحركات!",
      allDone: "أنهيت كل المستويات! 🏆", next: "▶ المستوى التالي", retry: "↺ حاول مجددًا", again: "↺ ابدأ من المستوى 1"
    } : {
      level: "Level", moves: "Moves", score: "Score", goals: "Collect before moves run out", specials: "Special gems",
      l4: "4 in a row", lT: "L or T shape", sq: "2×2 square", l5: "5 in a row", rocket: "Rocket", bomb: "Bomb", plane: "Plane", rainbow: "Rainbow",
      intro: ["Drag a gem onto its neighbour to line up 3 or more. Collect the goals before you run out of moves!",
        "Crates break when you match gems next to them. Line up 4 to make a rocket!",
        "Reinforced crates need two hits. An L or T shape makes a bomb.",
        "Final level! Swap two special gems together for a bigger blast."],
      noMatch: "A swap must line up at least 3 matching gems", shuffle: "No moves left — reshuffling",
      done: "Goal reached! Leftover moves become rockets 🎉", win: (n) => `Level ${n} complete! 🎉`, lose: "Out of moves!",
      allDone: "You beat every level! 🏆", next: "▶ Next level", retry: "↺ Try again", again: "↺ Start from level 1"
    };
    const LV = PZ_LEVELS[pzLevel], lvNo = pzLevel + 1;
    const C = 8, R = 7, S = 54, ox = W - C * S - 34, oy = (H - R * S) / 2;
    const D4 = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const g = [], box = [];
    const goals = LV.goals.map(([k, n]) => ({ k, n, bump: 0 }));
    let moves = LV.moves, score = 0, phase = "idle", pair = null, combo = 0, sel = null, down = null, hint = null, idleT = 0, winning = false, wait = 0, warned = 0;
    let beams = [], rings = [], planes = [], pending = [], hitBoxes = new Set();
    const inB = (r, c) => r >= 0 && c >= 0 && r < R && c < C;
    const rk = () => irand(5);
    const cell = (k, p = null) => ({ k, p, dx: 0, dy: 0, born: 0 });
    const ctr = (r, c) => [ox + c * S + S / 2, oy + r * S + S / 2];
    const kAt = (r, c) => { if (!inB(r, c)) return -1; const x = g[r][c]; return x && !x.p ? x.k : -1; };
    const need = (k) => goals.some(q => q.k === k && q.n > 0);

    for (let r = 0; r < R; r++) { box[r] = []; g[r] = []; for (let c = 0; c < C; c++) { const ch = (LV.map[r] || "")[c] || "."; box[r][c] = ch === "1" ? 1 : ch === "2" ? 2 : 0; g[r][c] = null; } }
    function bad(r, c, v) {
      return (kAt(r, c - 1) === v && kAt(r, c - 2) === v) || (kAt(r - 1, c) === v && kAt(r - 2, c) === v) || (kAt(r - 1, c) === v && kAt(r, c - 1) === v && kAt(r - 1, c - 1) === v);
    }
    function fresh() { for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { g[r][c] = null; if (!box[r][c]) { let v, t = 0; do v = rk(); while (bad(r, c, v) && ++t < 40); g[r][c] = cell(v); } } }
    fresh(); for (let t = 0; t < 30 && !findMove(); t++) fresh();

    function findGroups() {
      const m = new Set();
      for (let r = 0; r < R; r++) for (let c = 0; c < C;) { const k = kAt(r, c); let e = c; if (k >= 0) while (e + 1 < C && kAt(r, e + 1) === k) e++; if (k >= 0 && e - c >= 2) for (let i = c; i <= e; i++) m.add(r * C + i); c = e + 1; }
      for (let c = 0; c < C; c++) for (let r = 0; r < R;) { const k = kAt(r, c); let e = r; if (k >= 0) while (e + 1 < R && kAt(e + 1, c) === k) e++; if (k >= 0 && e - r >= 2) for (let i = r; i <= e; i++) m.add(i * C + c); r = e + 1; }
      for (let r = 0; r < R - 1; r++) for (let c = 0; c < C - 1; c++) { const k = kAt(r, c); if (k >= 0 && kAt(r, c + 1) === k && kAt(r + 1, c) === k && kAt(r + 1, c + 1) === k) [r * C + c, r * C + c + 1, (r + 1) * C + c, (r + 1) * C + c + 1].forEach(i => m.add(i)); }
      const seen = new Set(), groups = [];
      for (const i of m) {
        if (seen.has(i)) continue;
        const k = kAt(i / C | 0, i % C), comp = [], st = [i]; seen.add(i);
        while (st.length) {
          const j = st.pop(); comp.push(j); const r = j / C | 0, c = j % C;
          for (const [dr, dc] of D4) { const n = (r + dr) * C + c + dc; if (inB(r + dr, c + dc) && m.has(n) && !seen.has(n) && kAt(r + dr, c + dc) === k) { seen.add(n); st.push(n); } }
        }
        const set = new Set(comp); let mh = 0, mv = 0, sq = false;
        for (const j of comp) {
          const r = j / C | 0, c = j % C;
          let a = 0; while (c + a < C && set.has(r * C + c + a)) a++; mh = Math.max(mh, a);
          let b = 0; while (r + b < R && set.has((r + b) * C + c)) b++; mv = Math.max(mv, b);
          if (c < C - 1 && r < R - 1 && set.has(j + 1) && set.has(j + C) && set.has(j + C + 1)) sq = true;
        }
        const type = mh >= 5 || mv >= 5 ? "rainbow" : mh >= 3 && mv >= 3 ? "bomb" : mh === 4 ? "h" : mv === 4 ? "v" : sq ? "plane" : null;
        groups.push({ k, cells: comp, type });
      }
      return groups;
    }
    function findMove() {
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (g[r][c] && g[r][c].p) return [{ r, c }, { r, c }];
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const r2 = r + dr, c2 = c + dc; if (!inB(r2, c2)) continue;
        const a = g[r][c], b = g[r2][c2]; if (!a || !b) continue;
        g[r][c] = b; g[r2][c2] = a; const ok = findGroups().length > 0; g[r][c] = a; g[r2][c2] = b;
        if (ok) return [{ r, c }, { r: r2, c: c2 }];
      }
      return null;
    }
    function shuffle() {
      const pos = []; for (const row of g) for (const x of row) if (x && !x.p) pos.push(x);
      for (let t = 0; t < 200; t++) {
        const ks = t > 100 ? pos.map(rk) : pos.map(x => x.k);
        for (let i = ks.length - 1; i > 0; i--) { const j = irand(i + 1); [ks[i], ks[j]] = [ks[j], ks[i]]; }
        pos.forEach((x, i) => { x.k = ks[i]; });
        if (!findGroups().length && findMove()) break;
      }
      pos.forEach(x => { x.born = .4; });
    }
    function swap(a, b) {
      const t = g[a.r][a.c]; g[a.r][a.c] = g[b.r][b.c]; g[b.r][b.c] = t;
      g[a.r][a.c].dx += (b.c - a.c) * S; g[a.r][a.c].dy += (b.r - a.r) * S;
      g[b.r][b.c].dx += (a.c - b.c) * S; g[b.r][b.c].dy += (a.r - b.r) * S;
    }
    function fill() {
      const spawned = new Array(C).fill(0);
      for (let pass = 0; pass < 80; pass++) {
        let ch = false;
        for (let r = R - 1; r >= 0; r--) for (let c = 0; c < C; c++) {
          if (box[r][c] > 0 || g[r][c]) continue;
          if (r === 0) { spawned[c]++; g[0][c] = cell(rk()); g[0][c].dy = -S * spawned[c]; ch = true; continue; }
          const up = g[r - 1][c];
          if (up) { g[r][c] = up; g[r - 1][c] = null; up.dy -= S; ch = true; continue; }
          if (box[r - 1][c] > 0) for (const dc of (Math.random() < .5 ? [-1, 1] : [1, -1])) {
            const cc = c + dc; if (cc < 0 || cc >= C) continue;
            const d = g[r - 1][cc]; if (d) { g[r][c] = d; g[r - 1][cc] = null; d.dy -= S; d.dx += dc * S; ch = true; break; }
          }
        }
        if (!ch) break;
      }
    }

    /* ---- clearing & special gems ---- */
    function collect(k) { const q = goals.find(o => o.k === k && o.n > 0); if (q) { q.n--; q.bump = .35; } }
    function damageBox(r, c) {
      const key = r * C + c; if (hitBoxes.has(key)) return; hitBoxes.add(key);
      box[r][c]--; const [px, py] = ctr(r, c); A.burst(px, py, 10, "#c98a4b", .8);
      if (box[r][c] === 0) { collect("box"); score += 40; A.burst(px, py, 14, "#e2b07a", 1.1); }
    }
    function hitCell(r, c) {
      if (!inB(r, c)) return;
      if (box[r][c] > 0) { damageBox(r, c); return; }
      const x = g[r][c]; if (!x) return;
      g[r][c] = null; const [px, py] = ctr(r, c);
      if (x.p) { score += 30; trigger(x.p, r, c); }
      else { collect(x.k); score += 10 * Math.max(1, combo); A.burst(px, py, 6, PZ_COL[x.k], .6); }
    }
    const kill = (p) => { if (g[p.r][p.c]) { g[p.r][p.c] = null; score += 30; } };
    function beamRow(r) { const y = oy + r * S + S / 2; beams.push({ x1: ox, y1: y, x2: ox + C * S, y2: y, t: .35, w: 12 }); }
    function beamCol(c) { const x = ox + c * S + S / 2; beams.push({ x1: x, y1: oy, x2: x, y2: oy + R * S, t: .35, w: 12 }); }
    function trigger(p, r, c, carry) {
      const [px, py] = ctr(r, c);
      if (p === "h") { beamRow(r); for (let q = 0; q < C; q++) hitCell(r, q); A.shake(4, .12); }
      else if (p === "v") { beamCol(c); for (let q = 0; q < R; q++) hitCell(q, c); A.shake(4, .12); }
      else if (p === "bomb") { rings.push({ x: px, y: py, r: S * 2.6, t: .4 }); for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) if (Math.abs(dr) + Math.abs(dc) <= 2) hitCell(r + dr, c + dc); A.shake(7, .2); }
      else if (p === "plane") { for (const [dr, dc] of D4) hitCell(r + dr, c + dc); launchPlane(r, c, carry); }
      else clearColor(mostColor(), r, c);
    }
    function mostColor() {
      const n = [0, 0, 0, 0, 0]; for (const row of g) for (const x of row) if (x && !x.p) n[x.k] += need(x.k) ? 3 : 1;
      return n.indexOf(Math.max(...n));
    }
    function clearColor(k, r0, c0) {
      const [x0, y0] = ctr(r0, c0);
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (kAt(r, c) === k) { const [x, y] = ctr(r, c); beams.push({ x1: x0, y1: y0, x2: x, y2: y, t: .4, w: 4 }); hitCell(r, c); }
      rings.push({ x: x0, y: y0, r: S * 1.6, t: .4 }); A.shake(6, .2);
    }
    function launchPlane(r, c, carry) {
      const all = [];
      for (let q = 0; q < R; q++) for (let w = 0; w < C; w++) {
        if (box[q][w] > 0) all.push([q, w, need("box") ? 3 : 0]);
        else if (g[q][w]) all.push([q, w, !g[q][w].p && need(g[q][w].k) ? 2 : 1]);
      }
      if (!all.length) return;
      const best = Math.max(...all.map(t => t[2])), pool = all.filter(t => t[2] === best), t = pool[irand(pool.length)];
      const [x0, y0] = ctr(r, c), [x1, y1] = ctr(t[0], t[1]);
      planes.push({ x0, y0, x1, y1, t: 0, dur: .5 });
      pending.push({ t: .5, fn: () => { if (carry) trigger(carry, t[0], t[1]); else hitCell(t[0], t[1]); } });
    }
    function comboFire(a, b) {
      const X = g[a.r][a.c], Y = g[b.r][b.c];
      const P = [X, Y].filter(q => q && q.p);
      if (P.length === 1) {
        const s = P[0], pos = s === X ? a : b, other = s === X ? Y : X;
        kill(pos);
        if (s.p === "rainbow") clearColor(other && !other.p ? other.k : mostColor(), pos.r, pos.c);
        else trigger(s.p, pos.r, pos.c);
        return;
      }
      const p1 = X.p, p2 = Y.p, r = b.r, c = b.c, has = (p) => p1 === p || p2 === p, rocket = (p) => p === "h" || p === "v";
      kill(a); kill(b);
      if (p1 === "rainbow" && p2 === "rainbow") { rings.push({ x: ctr(r, c)[0], y: ctr(r, c)[1], r: W, t: .5 }); for (let q = 0; q < R; q++) for (let w = 0; w < C; w++) hitCell(q, w); A.shake(12, .35); }
      else if (has("rainbow")) {
        const o = p1 === "rainbow" ? p2 : p1, k = mostColor(), list = [], [x0, y0] = ctr(r, c);
        for (let q = 0; q < R; q++) for (let w = 0; w < C; w++) if (kAt(q, w) === k) { const x = g[q][w]; x.k = -1; x.p = rocket(o) ? (Math.random() < .5 ? "h" : "v") : o; list.push([q, w]); const [x1, y1] = ctr(q, w); beams.push({ x1: x0, y1: y0, x2: x1, y2: y1, t: .4, w: 4 }); }
        for (const [q, w] of list) hitCell(q, w);
      }
      else if (has("plane")) { for (const [dr, dc] of D4) hitCell(r + dr, c + dc); launchPlane(r, c, p1 === "plane" ? p2 : p1); }
      else if (rocket(p1) && rocket(p2)) { trigger("h", r, c); trigger("v", r, c); }
      else if (has("bomb") && (rocket(p1) || rocket(p2))) { for (let d = -1; d <= 1; d++) { if (inB(r + d, 0)) trigger("h", r + d, c); if (inB(0, c + d)) trigger("v", r, c + d); } }
      else { const [px, py] = ctr(r, c); rings.push({ x: px, y: py, r: S * 4, t: .5 }); for (let dr = -3; dr <= 3; dr++) for (let dc = -3; dc <= 3; dc++) if (Math.abs(dr) + Math.abs(dc) <= 4) hitCell(r + dr, c + dc); A.shake(10, .3); }
    }
    function clearGroups(gr, sw) {
      combo++; hitBoxes = new Set(); let sx = 0, sy = 0, n = 0;
      for (const G of gr) {
        let keep = -1;
        if (G.type) { const s = sw && sw.map(p => p.r * C + p.c).find(i => G.cells.includes(i)); keep = s !== undefined ? s : G.cells[G.cells.length >> 1]; }
        for (const j of G.cells) { const r = j / C | 0, c = j % C; for (const [dr, dc] of D4) if (inB(r + dr, c + dc) && box[r + dr][c + dc] > 0) damageBox(r + dr, c + dc); }
        for (const j of G.cells) {
          const r = j / C | 0, c = j % C; sx += c; sy += r; n++;
          if (j === keep) { const x = g[r][c]; collect(x.k); score += 10 * combo; x.k = -1; x.p = G.type; x.born = .45; const [px, py] = ctr(r, c); A.burst(px, py, 18, "#fff", .9); }
          else hitCell(r, c);
        }
      }
      A.float(ox + (sx / n) * S + S / 2, oy + (sy / n) * S + S / 2, (combo > 1 ? "x" + combo + " " : "") + "+" + n * 10 * combo, "#fff");
      if (combo > 1) A.shake(2 + combo, .12);
    }
    function afterAction() { fill(); phase = "settle"; wait = .12; hint = null; }
    function resolveSwap() {
      const [a, b] = pair, X = g[a.r][a.c], Y = g[b.r][b.c];
      if ((X && X.p) || (Y && Y.p)) { moves--; combo = 1; hitBoxes = new Set(); comboFire(a, b); afterAction(); return; }
      const gr = findGroups();
      if (gr.length) { moves--; combo = 0; clearGroups(gr, [a, b]); afterAction(); return; }
      swap(a, b); phase = "back"; A.shake(2, .08);
      if (warned++ < 2) A.say(TX.noMatch, 1800);
    }
    function tapPower(p) {
      const x = g[p.r][p.c]; moves--; combo = 1; hitBoxes = new Set(); kill(p);
      if (x.p === "rainbow") clearColor(mostColor(), p.r, p.c); else trigger(x.p, p.r, p.c);
      afterAction();
    }
    function trySwap(a, b) {
      if (!inB(b.r, b.c) || !g[a.r][a.c] || !g[b.r][b.c]) { A.shake(2, .06); return; }
      pair = [a, b]; swap(a, b); phase = "swap"; sel = null;
    }
    function finish(win) {
      phase = "over";
      if (!win) { A.end(false, score, TX.lose, TX.retry); return; }
      const last = pzLevel >= PZ_LEVELS.length - 1;
      pzLevel = last ? 0 : pzLevel + 1; try { localStorage.setItem(PZ_KEY, String(pzLevel)); } catch (e) { /* ignore */ }
      A.end(true, score, last ? TX.allDone : TX.win(lvNo), last ? TX.again : TX.next);
    }
    function at(x, y) {
      const c = Math.floor((x - ox) / S), r = Math.floor((y - oy) / S);
      return inB(r, c) && g[r][c] ? { r, c } : null;
    }
    A.hud([]);

    /* ---- side panel: level, moves, goals and a legend of special gems ---- */
    function panel(c, now) {
      const px = 28, py = oy - 10, pw = ox - 10 - 18 - px, ph = R * S + 20, cx = px + pw / 2;
      c.fillStyle = "#0b1426cc"; rr(c, px, py, pw, ph, 18); c.fill(); c.strokeStyle = "#ffffff1a"; c.lineWidth = 1.5; c.stroke();
      c.textAlign = "center"; c.textBaseline = "middle"; c.direction = AR ? "rtl" : "ltr";
      c.fillStyle = "#ffd36f"; c.font = `800 22px ${AF}`; c.fillText(`${TX.level} ${lvNo} / ${PZ_LEVELS.length}`, cx, py + 30);
      const bw = (pw - 48) / 2, by = py + 54, bh = 72;
      const stat = (x, label, val, warn) => {
        c.fillStyle = warn ? "#ff5d6c22" : "#ffffff0f"; rr(c, x, by, bw, bh, 14); c.fill();
        c.fillStyle = "#9fb3c8"; c.font = `600 13px ${AF}`; c.fillText(label, x + bw / 2, by + 18);
        c.fillStyle = warn ? "#ff8b8b" : "#fff"; c.font = `800 30px ${MF}`; c.fillText(String(val), x + bw / 2, by + 48);
      };
      const L = px + 16, Rt = px + 32 + bw;
      stat(AR ? Rt : L, TX.moves, Math.max(0, moves), moves <= 5 && !winning); stat(AR ? L : Rt, TX.score, score);
      c.fillStyle = "#cfe0f0"; c.font = `700 14px ${AF}`; c.fillText("🎯 " + TX.goals, cx, py + 148);
      const n = goals.length, gw = 96, gap = 14, gx = cx - (n * gw + (n - 1) * gap) / 2;
      goals.forEach((q, i) => {
        const x = gx + (AR ? n - 1 - i : i) * (gw + gap), y = py + 164, h = 86, ok = q.n <= 0;
        c.fillStyle = ok ? "#2f8a4a55" : "#ffffff10"; rr(c, x, y, gw, h, 14); c.fill();
        if (ok) { c.strokeStyle = "#7be07b"; c.lineWidth = 2; c.stroke(); }
        const s = 1 + q.bump; c.save(); c.translate(x + gw / 2, y + 32); c.scale(s, s);
        if (q.k === "box") pzBox(c, -21, -21, 42, 1); else pzGem(c, q.k, 19);
        c.restore();
        c.font = `800 20px ${MF}`; c.fillStyle = ok ? "#7be07b" : "#fff"; c.fillText(ok ? "✓" : String(q.n), x + gw / 2, y + 70);
      });
      c.fillStyle = "#cfe0f0"; c.font = `700 14px ${AF}`; c.fillText("✨ " + TX.specials, cx, py + 276);
      const items = [["h", TX.rocket, TX.l4], ["bomb", TX.bomb, TX.lT], ["plane", TX.plane, TX.sq], ["rainbow", TX.rainbow, TX.l5]];
      const iw = (pw - 40) / 2, ih = 42;
      items.forEach(([p, name, rule], i) => {
        const col = i % 2, row = i >> 1, x = px + 14 + (AR ? 1 - col : col) * (iw + 12), y = py + 292 + row * (ih + 8);
        c.fillStyle = "#ffffff0a"; rr(c, x, y, iw, ih, 10); c.fill();
        c.save(); c.translate(AR ? x + iw - 24 : x + 24, y + ih / 2); pzPower(c, p, 15, now); c.restore();
        c.textAlign = AR ? "right" : "left"; const tx = AR ? x + iw - 48 : x + 48;
        c.fillStyle = "#fff"; c.font = `700 13px ${AF}`; c.fillText(name, tx, y + 14);
        c.fillStyle = "#9fb3c8"; c.font = `500 12px ${AF}`; c.fillText(rule, tx, y + 30);
        c.textAlign = "center";
      });
      c.direction = "ltr"; c.textBaseline = "alphabetic";
    }

    return {
      drag: true,
      start() { A.say(TX.intro[pzLevel] || TX.intro[0], 5500); },
      update(dt) {
        for (const q of goals) q.bump = Math.max(0, q.bump - dt);
        for (const b of beams) b.t -= dt; beams = beams.filter(b => b.t > 0);
        for (const o of rings) o.t -= dt; rings = rings.filter(o => o.t > 0);
        for (const p of planes) p.t += dt; planes = planes.filter(p => p.t < p.dur);
        if (pending.length) {
          for (const p of pending) p.t -= dt;
          const due = pending.filter(p => p.t <= 0);
          if (due.length) { pending = pending.filter(p => p.t > 0); hitBoxes = new Set(); due.forEach(p => p.fn()); fill(); phase = "settle"; wait = .1; }
        }
        let moving = false; const sp = 900 * dt;
        for (const row of g) for (const x of row) {
          if (!x) continue;
          if (x.born > 0) x.born = Math.max(0, x.born - dt);
          if (x.dx) { x.dx = Math.abs(x.dx) <= sp ? 0 : x.dx - Math.sign(x.dx) * sp; moving = true; }
          if (x.dy) { x.dy = Math.abs(x.dy) <= sp ? 0 : x.dy - Math.sign(x.dy) * sp; moving = true; }
        }
        if (moving) return;
        if (phase === "swap") resolveSwap();
        else if (phase === "back") phase = "idle";
        else if (phase === "settle") {
          if (pending.length || (wait -= dt) > 0) return;
          const gr = findGroups();
          if (gr.length) { clearGroups(gr, null); fill(); wait = .08; return; }
          combo = 0;
          if (!winning && goals.every(q => q.n <= 0)) { winning = true; A.say(TX.done, 2200); wait = .6; return; }
          if (winning) {
            const live = []; for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (g[r][c] && !g[r][c].p) live.push([r, c]);
            if (moves > 0 && live.length) {
              const [r, c] = live[irand(live.length)], p = Math.random() < .5 ? "h" : "v";
              moves--; score += 50; hitBoxes = new Set(); g[r][c] = null; trigger(p, r, c); fill(); wait = .25; return;
            }
            finish(true); return;
          }
          if (moves <= 0) { finish(false); return; }
          if (!findMove()) { shuffle(); A.say(TX.shuffle, 1800); }
          phase = "idle"; idleT = 0;
        } else if (phase === "idle") { idleT += dt; if (idleT > 5 && !hint) hint = findMove(); }
      },
      click(x, y) {
        idleT = 0; hint = null;
        if (phase !== "idle") return;
        const p = at(x, y);
        if (!p) { sel = null; down = null; return; }
        if (sel && Math.abs(sel.r - p.r) + Math.abs(sel.c - p.c) === 1) { trySwap(sel, p); return; }
        down = { r: p.r, c: p.c, x, y };
      },
      hover(x, y, buttons) {
        if (!down || !(buttons & 1) || phase !== "idle") return;
        const dx = x - down.x, dy = y - down.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < S * .35) return;
        const t = Math.abs(dx) > Math.abs(dy) ? { r: down.r, c: down.c + Math.sign(dx) } : { r: down.r + Math.sign(dy), c: down.c };
        const d = down; down = null; sel = null; trySwap(d, t);
      },
      release() {
        if (!down) return;
        const d = down; down = null;
        if (phase !== "idle") return;
        const x = g[d.r][d.c];
        if (x && x.p && (!sel || (sel.r === d.r && sel.c === d.c))) { sel = null; tapPower(d); return; }
        sel = sel && sel.r === d.r && sel.c === d.c ? null : { r: d.r, c: d.c };
      },
      draw(c, now) {
        bgGrad(c, "#132238", "#1d3a4a");
        c.fillStyle = "#ffffff08"; for (let i = 0; i < 12; i++) { c.beginPath(); c.arc((i * 173) % W, (i * 89) % H, 26 + (i % 4) * 16, 0, 7); c.fill(); }
        panel(c, now);
        c.fillStyle = "#0b1426e6"; rr(c, ox - 10, oy - 10, C * S + 20, R * S + 20, 18); c.fill(); c.strokeStyle = "#ffffff22"; c.lineWidth = 2; c.stroke();
        c.save(); rr(c, ox, oy, C * S, R * S, 10); c.clip();
        for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) { c.fillStyle = (r + q) % 2 ? "#ffffff08" : "#ffffff13"; c.fillRect(ox + q * S, oy + r * S, S, S); }
        for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) if (box[r][q] > 0) pzBox(c, ox + q * S, oy + r * S, S, box[r][q]);
        const hinted = (r, q) => hint && hint.some(h => h.r === r && h.c === q);
        for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) {
          const x = g[r][q]; if (!x) continue;
          const cx = ox + q * S + S / 2 + x.dx, cy = oy + r * S + S / 2 + x.dy;
          const on = sel && sel.r === r && sel.c === q, hi = hinted(r, q);
          let s = 1 + x.born;
          if (on) { s *= 1.12 + Math.sin(now / 120) * .05; c.fillStyle = "#ffffff30"; rr(c, ox + q * S + 3, oy + r * S + 3, S - 6, S - 6, 12); c.fill(); }
          else if (hi) { s *= 1 + Math.abs(Math.sin(now / 220)) * .14; c.strokeStyle = "#ffd36faa"; c.lineWidth = 2.5; rr(c, ox + q * S + 4, oy + r * S + 4, S - 8, S - 8, 12); c.stroke(); }
          c.save(); c.translate(cx, cy); c.scale(s, s);
          if (x.p) pzPower(c, x.p, S * .4, now); else pzGem(c, x.k, S * .38);
          c.restore();
        }
        c.restore();
        c.lineCap = "round";
        for (const b of beams) { c.globalAlpha = clamp(b.t / .35, 0, 1); c.strokeStyle = "#ffe6a8"; c.lineWidth = b.w; c.beginPath(); c.moveTo(b.x1, b.y1); c.lineTo(b.x2, b.y2); c.stroke(); c.strokeStyle = "#fff"; c.lineWidth = b.w / 3; c.stroke(); }
        for (const o of rings) { const f = 1 - o.t / .4; c.globalAlpha = clamp(o.t / .4, 0, 1); c.strokeStyle = "#ffd36f"; c.lineWidth = 6; c.beginPath(); c.arc(o.x, o.y, Math.max(1, o.r * f), 0, 7); c.stroke(); }
        c.globalAlpha = 1; c.lineCap = "butt";
        for (const p of planes) {
          const f = p.t / p.dur, x = p.x0 + (p.x1 - p.x0) * f, y = p.y0 + (p.y1 - p.y0) * f - Math.sin(f * Math.PI) * 60;
          c.save(); c.translate(x, y); c.rotate(Math.atan2(p.y1 - p.y0, p.x1 - p.x0) + .35); pzPower(c, "plane", 22, now); c.restore();
        }
      }
    };
  };

  /* ---- Jigsaw: Picture Pieces ---- */
  GAMES.jigsaw = (A) => {
    const COLS = 4, ROWS = 3;
    let img = null, ready = false, pos = [], sel = -1, moves = 0, t = 0, bw = 0, bh = 0, bx = 0, by = 0, flash = [];
    const all = ((window.GA && window.GA.C && window.GA.C.gallery) || []).filter(g => g.src), jz = all.filter(g => (g.genres || []).includes("jigsaw")), pics = jz.length ? jz : all;
    function layout() {
      const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height, k = Math.min(600 / iw, 420 / ih);
      bw = Math.round(iw * k); bh = Math.round(ih * k); bx = 40 + (600 - bw) / 2; by = (H - bh) / 2;
    }
    function fallback() {
      const cv = document.createElement("canvas"); cv.width = 800; cv.height = 560; const c = cv.getContext("2d");
      const g = c.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, "#ffb36b"); g.addColorStop(.55, "#ff6f91"); g.addColorStop(1, "#4b2a6b"); c.fillStyle = g; c.fillRect(0, 0, 800, 560);
      c.fillStyle = "#ffe9a8"; c.beginPath(); c.arc(560, 210, 90, 0, 7); c.fill();
      [["#3c2a5e", 380, .004, 70], ["#2a1d48", 440, .007, 50], ["#1a1230", 500, .011, 34]].forEach(([col, base, f, a]) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, 560); for (let x = 0; x <= 800; x += 10) c.lineTo(x, base - Math.sin(x * f) * a); c.lineTo(800, 560); c.fill(); });
      img = cv; layout(); ready = true;
    }
    if (pics.length) { const im = new Image(); im.onload = () => { img = im; layout(); ready = true; }; im.onerror = fallback; im.src = pics[irand(pics.length)].src; } else fallback();
    const N = COLS * ROWS;
    /* interlocking tab directions: hS[r][c] = edge under row r at col c (+1 bulges down), vS[r][c] = edge right of col c (+1 bulges right) */
    const hS = [...Array(ROWS - 1)].map(() => [...Array(COLS)].map(() => Math.random() < .5 ? 1 : -1));
    const vS = [...Array(ROWS)].map(() => [...Array(COLS - 1)].map(() => Math.random() < .5 ? 1 : -1));
    /* classic knob: narrow neck, round head wider than the neck (u along edge, v outward) */
    const KS = .34, KT = [[.42, 0, .45, .03, .43, .09], [.40, .16, .28, .38, .50, .39], [.72, .38, .60, .16, .57, .09], [.55, .03, .58, 0, .66, 0]];
    function edgeTo(c, x0, y0, x1, y1, nx, ny) { // nx,ny = bulge vector (0 → straight outer edge)
      if (!nx && !ny) { c.lineTo(x1, y1); return; }
      const dx = x1 - x0, dy = y1 - y0, q = Math.min(1, Math.hypot(nx, ny) / Math.hypot(dx, dy)); // keep the knob round on long edges
      const P = (u, v) => { u = .5 + (u - .5) * q; return [x0 + u * dx + v * nx, y0 + u * dy + v * ny]; };
      c.lineTo(...P(KS, 0));
      for (const k of KT) c.bezierCurveTo(...P(k[0], k[1]), ...P(k[2], k[3]), ...P(k[4], k[5]));
      c.lineTo(x1, y1);
    }
    function piecePath(c, i, pw, ph) {
      const col = i % COLS, row = Math.floor(i / COLS), x = bx + col * pw, y = by + row * ph, z = Math.min(pw, ph);
      const top = row > 0 ? hS[row - 1][col] * z : 0, bot = row < ROWS - 1 ? hS[row][col] * z : 0;
      const lft = col > 0 ? vS[row][col - 1] * z : 0, rgt = col < COLS - 1 ? vS[row][col] * z : 0;
      c.beginPath(); c.moveTo(x, y);
      edgeTo(c, x, y, x + pw, y, 0, top);
      edgeTo(c, x + pw, y, x + pw, y + ph, rgt, 0);
      edgeTo(c, x + pw, y + ph, x, y + ph, 0, bot);
      edgeTo(c, x, y + ph, x, y, lft, 0);
      c.closePath();
    }
    pos = [...Array(N).keys()];
    do { for (let i = N - 1; i > 0; i--) { const j = irand(i + 1); [pos[i], pos[j]] = [pos[j], pos[i]]; } } while (pos.filter((p, i) => p === i).length > 2);
    const placed = () => pos.filter((p, i) => p === i).length;
    const hud = () => A.hud([[U().placed, `${placed()}/${N}`], [U().moves, moves], [U().time, t.toFixed(0)]]);
    hud();
    return {
      update(dt) { t += dt; flash = flash.filter(f => (f.t -= dt) > 0); if (Math.floor(t * 4) !== Math.floor((t - dt) * 4)) hud(); },
      click(x, y) {
        if (!ready) return;
        const c = Math.floor((x - bx) / (bw / COLS)), r = Math.floor((y - by) / (bh / ROWS));
        if (c < 0 || r < 0 || c >= COLS || r >= ROWS) { sel = -1; return; }
        const i = r * COLS + c;
        if (pos[i] === i) { A.shake(2, .06); return; }
        if (sel < 0) { sel = i; return; }
        if (sel === i) { sel = -1; return; }
        [pos[sel], pos[i]] = [pos[i], pos[sel]]; moves++;
        for (const j of [sel, i]) if (pos[j] === j) { flash.push({ i: j, t: .6 }); const pw = bw / COLS, ph = bh / ROWS; A.burst(bx + (j % COLS + .5) * pw, by + (Math.floor(j / COLS) + .5) * ph, 14, "#b8f34a", .8); }
        sel = -1; hud();
        if (placed() === N) A.end(true, Math.max(10, 1000 - moves * 15 - Math.floor(t) * 3));
      },
      draw(c, now) {
        bgGrad(c, "#14262a", "#0d1a1f");
        if (!ready) return;
        const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height, pw = bw / COLS, ph = bh / ROWS;
        c.fillStyle = "#0008"; rr(c, bx - 8, by - 8, bw + 16, bh + 16, 12); c.fill();
        for (let i = 0; i < N; i++) {
          const p = pos[i], dx = bx + (i % COLS) * pw, dy = by + Math.floor(i / COLS) * ph;
          c.save(); piecePath(c, i, pw, ph); c.clip();
          c.drawImage(img, dx - (p % COLS) * pw, dy - Math.floor(p / COLS) * ph, bw, bh); // piece p's picture, tabs included
          c.restore();
        }
        for (let i = 0; i < N; i++) {
          piecePath(c, i, pw, ph);
          c.lineWidth = 3.5; c.strokeStyle = "#000000b0"; c.stroke();
          c.lineWidth = 1.2; c.strokeStyle = pos[i] === i ? "#b8f34a99" : "#ffffff55"; c.stroke();
        }
        for (const f of flash) { piecePath(c, f.i, pw, ph); c.fillStyle = `rgba(184,243,74,${f.t * .6})`; c.fill(); }
        if (sel >= 0) { piecePath(c, sel, pw, ph); c.lineWidth = 4; c.strokeStyle = `rgba(255,207,90,${.7 + Math.sin(now / 120) * .3})`; c.stroke(); }
        const k = Math.min(230 / iw, 180 / ih), tw = iw * k, th = ih * k, tx = 720 - tw / 2 + 50, ty = 60;
        c.fillStyle = "#0008"; rr(c, tx - 6, ty - 6, tw + 12, th + 12, 10); c.fill();
        c.drawImage(img, tx, ty, tw, th);
        c.fillStyle = "#ffffff99"; c.font = FONT; c.textAlign = "center"; c.fillText("?  →  ✓", tx + tw / 2, ty + th + 30);
      }
    };
  };

  /* ---- Adventure: The Guardian's Chest ---- */
  GAMES.adventure = (A) => {
    const TS = 40;
    const MAP = [
      "########################",
      "#......#...t..t.#......#",
      "#.N....#.t....g.#......#",
      "#......#....t...#..C...#",
      "#...............L......#",
      "#......#.t......#......#",
      "#.@..s.#....tt..#......#",
      "#......#..t..k..#..g...#",
      "#..g...#.....t..#......#",
      "#......#.t......#......#",
      "#......#....g...#......#",
      "########################"
    ].map(r => r.split(""));
    const TXT = {
      en: { intro: "A quiet valley… The old guardian is waiting. Walk up and press Space.", npc: "Guardian: \"My chest lies beyond the eastern door. The key fell among the trees next door.\"", npc2: "Guardian: \"Use the key on the door in the middle room.\"", sign: "Sign: \"East → the Grove. Beyond it, the Guardian's vault.\"", key: "You found a key!", locked: "The door is locked. Maybe someone knows where the key is…", open: "The key turns… the door opens!", gem: "A gem! (optional treasure)", chest: "Treasure found!" },
      ar: { intro: "وادٍ هادئ… الحارس العجوز ينتظرك. اقترب منه واضغط Space.", npc: "الحارس: «صندوقي خلف الباب الشرقي. سقط المفتاح بين الأشجار في الغرفة المجاورة.»", npc2: "الحارس: «استخدم المفتاح على الباب في الغرفة الوسطى.»", sign: "لافتة: «شرقًا ← البستان. وبعده خزينة الحارس.»", key: "وجدت مفتاحًا!", locked: "الباب مقفل. ربما يعرف أحدهم مكان المفتاح…", open: "يدور المفتاح… وينفتح الباب!", gem: "جوهرة! (كنز اختياري)", chest: "وجدت الكنز!" }
    }[LANG()] || {};
    let px = 0, py = 0, face = 1, hasKey = false, gems = 0, talked = false, t = 0, lockedMsg = 0;
    const totalGems = MAP.flat().filter(c => c === "g").length;
    MAP.forEach((row, r) => row.forEach((ch, c) => { if (ch === "@") { px = c * TS + TS / 2; py = r * TS + TS / 2; row[c] = "."; } }));
    const room = (x) => x < 8 * TS ? 0 : x < 17 * TS ? 1 : 2;
    const seen = [true, false, false];
    const solid = (x, y) => { const ch = (MAP[Math.floor(y / TS)] || [])[Math.floor(x / TS)]; return !ch || "#tNsL".includes(ch); };
    const hit = (x, y) => [[-12, -12], [12, -12], [-12, 12], [12, 12]].some(([a, b]) => solid(x + a, y + b));
    const near = (ch) => { for (let r = -1; r <= 1; r++) for (let c = -1; c <= 1; c++) { const rr2 = Math.floor(py / TS) + r, cc = Math.floor(px / TS) + c; if ((MAP[rr2] || [])[cc] === ch) return true; } return false; };
    const hud = () => A.hud([[U().key, hasKey ? "🗝️" : "–"], [U().gems, `${gems}/${totalGems}`], [U().time, t.toFixed(0)]]);
    hud(); A.say(TXT.intro, 5000);
    return {
      pad: ["left", "right", "up", "down", "a"],
      update(dt) {
        t += dt; lockedMsg -= dt;
        if (Math.floor(t) !== Math.floor(t - dt)) hud();
        const dx = (A.held.right ? 1 : 0) - (A.held.left ? 1 : 0), dy = (A.held.down ? 1 : 0) - (A.held.up ? 1 : 0), m = dx && dy ? .707 : 1;
        if (dx) face = dx;
        const nx = px + dx * 190 * m * dt; if (!hit(nx, py)) px = nx;
        const ny = py + dy * 190 * m * dt; if (!hit(px, ny)) py = ny;
        seen[room(px)] = true;
        const r = Math.floor(py / TS), c = Math.floor(px / TS), ch = MAP[r][c];
        if (ch === "k") { MAP[r][c] = "."; hasKey = true; A.say(TXT.key); A.burst(px, py, 20, "#ffd36f"); hud(); }
        if (ch === "g") { MAP[r][c] = "."; gems++; A.say(TXT.gem, 1500); A.burst(px, py, 14, "#5ab8ff"); hud(); }
        if (ch === "C") { MAP[r][c] = "."; A.burst(px, py, 50, "#ffd36f", 1.6); A.say(TXT.chest); A.end(true, Math.max(10, 600 - Math.floor(t) * 4 + gems * 100)); }
        if (near("L")) {
          if (hasKey) { MAP.forEach(row => row.forEach((x, i) => { if (x === "L") row[i] = "."; })); A.say(TXT.open); A.shake(5, .2); A.burst(16 * TS + 20, 4 * TS + 20, 24, "#c9a27a"); }
          else if (lockedMsg <= 0) { A.say(TXT.locked); lockedMsg = 4; }
        }
        if (A.tap("a")) {
          if (near("N")) { A.say(talked && hasKey ? TXT.npc2 : TXT.npc, 5000); talked = true; }
          else if (near("s")) A.say(TXT.sign, 4000);
        }
      },
      draw(c, now) {
        for (let r = 0; r < MAP.length; r++) for (let q = 0; q < MAP[r].length; q++) {
          const ch = MAP[r][q], x = q * TS, y = r * TS;
          c.fillStyle = (r + q) % 2 ? "#3d6b4a" : "#41704e"; c.fillRect(x, y, TS, TS);
          if (ch === "#") { c.fillStyle = "#5b5363"; c.fillRect(x, y, TS, TS); c.fillStyle = "#6e6577"; c.fillRect(x + 2, y + 2, TS / 2 - 3, TS / 2 - 3); c.fillRect(x + TS / 2 + 1, y + TS / 2 + 1, TS / 2 - 3, TS / 2 - 3); }
          if (ch === "t") { c.fillStyle = "#5b3b25"; c.fillRect(x + 16, y + 22, 8, 16); c.fillStyle = "#2a5a35"; c.beginPath(); c.arc(x + 20, y + 16, 16, 0, 7); c.fill(); c.fillStyle = "#3d7a46"; c.beginPath(); c.arc(x + 15, y + 12, 8, 0, 7); c.fill(); }
          if (ch === "L") { c.fillStyle = "#7a4b2a"; c.fillRect(x + 4, y, TS - 8, TS); c.fillStyle = "#ffd36f"; c.beginPath(); c.arc(x + 20, y + 20, 5, 0, 7); c.fill(); c.fillRect(x + 18, y + 20, 4, 9); }
          if (ch === "k") { const b = Math.sin(now / 200) * 3; c.strokeStyle = "#ffd36f"; c.lineWidth = 4; c.beginPath(); c.arc(x + 14, y + 20 + b, 7, 0, 7); c.moveTo(x + 21, y + 20 + b); c.lineTo(x + 33, y + 20 + b); c.lineTo(x + 33, y + 26 + b); c.stroke(); }
          if (ch === "g") { const b = Math.sin(now / 250 + q) * 3; c.fillStyle = "#5ab8ff"; c.beginPath(); c.moveTo(x + 20, y + 8 + b); c.lineTo(x + 30, y + 20 + b); c.lineTo(x + 20, y + 32 + b); c.lineTo(x + 10, y + 20 + b); c.fill(); c.fillStyle = "#fff8"; c.fillRect(x + 17, y + 14 + b, 4, 4); }
          if (ch === "C") { c.fillStyle = "#8a5a2b"; rr(c, x + 4, y + 10, 32, 24, 4); c.fill(); c.fillStyle = "#ffd36f"; c.fillRect(x + 4, y + 18, 32, 3); c.fillRect(x + 17, y + 16, 6, 8); }
          if (ch === "s") { c.fillStyle = "#6b4a2b"; c.fillRect(x + 18, y + 18, 4, 20); c.fillStyle = "#c9a27a"; rr(c, x + 6, y + 6, 28, 16, 3); c.fill(); }
          if (ch === "N") { heroSprite(c, x + 20, y + 18, .8, -1, false); c.fillStyle = "#c77dff"; rr(c, x + 3, y + 2, 34, 9, 4); c.fill(); if (!talked || near("N")) { c.fillStyle = "#ffd36f"; c.font = "700 20px sans-serif"; c.textAlign = "center"; c.fillText("!", x + 20, y - 4 + Math.sin(now / 150) * 3); } }
        }
        heroSprite(c, px, py - 4, .62, face, false);
        [[0, 8], [8, 17], [17, 24]].forEach(([a, b], i) => { if (!seen[i]) { c.fillStyle = "#06101bf2"; c.fillRect(a * TS + (i ? 0 : 0), 0, (b - a) * TS, H); c.fillStyle = "#ffffff30"; c.font = "700 64px sans-serif"; c.textAlign = "center"; c.fillText("?", (a + b) / 2 * TS, H / 2 + 20); } });
      }
    };
  };

  /* ---- Action: Slime Arena ---- */
  GAMES.action = (A) => {
    let p = { x: W / 2, y: H / 2, vx: 0, vy: 0, fx: 1, fy: 0, hp: 5, inv: 0, cd: 0, slash: 0 }, foes = [], wave = 0, kills = 0, queue = 0, spawnT = 0, between = 1.2;
    const WAVES = 5;
    const hud = () => A.hud([[U().wave, `${Math.max(1, wave)}/${WAVES}`], [U().hp, "♥".repeat(Math.max(0, p.hp)) || "–"], [U().kills, kills]]);
    hud();
    function spawn() {
      const side = irand(4), x = side === 0 ? -20 : side === 1 ? W + 20 : rand(W), y = side === 2 ? -20 : side === 3 ? H + 20 : rand(H);
      const bat = wave >= 3 && Math.random() < .35;
      foes.push({ x, y, vx: 0, vy: 0, hp: bat ? 1 : 2, sp: (bat ? 130 : 70) + wave * 8, bat, flash: 0, r: bat ? 13 : 18, ph: rand(7) });
    }
    return {
      pad: ["left", "right", "up", "down", "a"],
      update(dt) {
        if (!foes.length && !queue) { between -= dt; if (between <= 0) { if (wave >= WAVES) { A.end(true, kills * 10 + p.hp * 50); return; } wave++; queue = 3 + wave * 2; between = 1.6; A.say(`${U().wave} ${wave}`, 1200); hud(); } }
        if (queue) { spawnT -= dt; if (spawnT <= 0) { spawn(); queue--; spawnT = .45; } }
        const dx = (A.held.right ? 1 : 0) - (A.held.left ? 1 : 0), dy = (A.held.down ? 1 : 0) - (A.held.up ? 1 : 0);
        if (dx || dy) { const l = Math.hypot(dx, dy); p.fx = dx / l; p.fy = dy / l; }
        p.vx += ((dx ? dx / Math.hypot(dx, dy) : 0) * 250 - p.vx) * Math.min(1, dt * 14);
        p.vy += ((dy ? dy / Math.hypot(dx, dy) : 0) * 250 - p.vy) * Math.min(1, dt * 14);
        p.x = clamp(p.x + p.vx * dt, 30, W - 30); p.y = clamp(p.y + p.vy * dt, 40, H - 30);
        p.cd -= dt; p.slash -= dt; p.inv -= dt;
        if (A.tap("a") && p.cd <= 0) {
          p.cd = .32; p.slash = .14; let any = false;
          for (const f of foes) {
            const ex = f.x - p.x, ey = f.y - p.y, d = Math.hypot(ex, ey);
            if (d < 82 && (ex * p.fx + ey * p.fy) / (d || 1) > .3) {
              f.hp--; f.flash = .12; f.vx = ex / d * 420; f.vy = ey / d * 420; any = true;
              A.burst(f.x, f.y, 8, f.bat ? "#c77dff" : "#7be07b", .8);
              if (f.hp <= 0) { f.dead = true; kills++; A.burst(f.x, f.y, 18, f.bat ? "#c77dff" : "#7be07b", 1.2); A.float(f.x, f.y - 10, "+10", "#ffd36f"); }
            }
          }
          if (any) { A.freeze(.06); A.shake(5, .1); hud(); }
        }
        for (const f of foes) {
          const ex = p.x - f.x, ey = p.y - f.y, d = Math.hypot(ex, ey) || 1;
          f.vx += (ex / d * f.sp - f.vx) * Math.min(1, dt * 3); f.vy += (ey / d * f.sp - f.vy) * Math.min(1, dt * 3);
          f.x += f.vx * dt; f.y += f.vy * dt; f.flash -= dt; f.ph += dt * 8;
          if (d < f.r + 14 && p.inv <= 0) {
            p.hp--; p.inv = 1; p.vx = -ex / d * 500; p.vy = -ey / d * 500; A.shake(9, .25); A.burst(p.x, p.y, 16, "#ff6f6f"); hud();
            if (p.hp <= 0) { A.end(false, kills * 10); return; }
          }
        }
        foes = foes.filter(f => !f.dead);
      },
      draw(c, now) {
        bgGrad(c, "#2a2236", "#1a1424");
        c.strokeStyle = "#ffffff10"; c.lineWidth = 1; for (let x = 0; x < W; x += 48) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 48) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
        c.strokeStyle = "#c9a27a55"; c.lineWidth = 6; rr(c, 10, 18, W - 20, H - 28, 20); c.stroke();
        for (const f of foes) {
          c.fillStyle = "rgba(0,0,0,.3)"; c.beginPath(); c.ellipse(f.x, f.y + f.r, f.r, 5, 0, 0, 7); c.fill();
          if (f.bat) {
            const fl = Math.sin(f.ph * 2) * 8; c.fillStyle = f.flash > 0 ? "#fff" : "#8b5fbf";
            c.beginPath(); c.moveTo(f.x, f.y); c.lineTo(f.x - 24, f.y - 8 + fl); c.lineTo(f.x - 12, f.y + 4); c.lineTo(f.x, f.y); c.lineTo(f.x + 24, f.y - 8 + fl); c.lineTo(f.x + 12, f.y + 4); c.fill();
            c.beginPath(); c.arc(f.x, f.y, f.r * .7, 0, 7); c.fill();
          } else {
            const sq = 1 + Math.sin(f.ph) * .1; c.fillStyle = f.flash > 0 ? "#fff" : "#6fcf73";
            c.beginPath(); c.ellipse(f.x, f.y + 4, f.r * sq, f.r / sq, 0, Math.PI, 0); c.lineTo(f.x + f.r * sq, f.y + 8); c.lineTo(f.x - f.r * sq, f.y + 8); c.fill();
          }
          c.fillStyle = "#120f29"; c.beginPath(); c.arc(f.x - 5, f.y - 2, 2.5, 0, 7); c.arc(f.x + 5, f.y - 2, 2.5, 0, 7); c.fill();
        }
        if (p.inv <= 0 || Math.floor(now / 80) % 2) heroSprite(c, p.x, p.y - 6, .75, p.fx < 0 ? -1 : 1, false);
        if (p.slash > 0) {
          const a = Math.atan2(p.fy, p.fx), k = 1 - p.slash / .14;
          c.strokeStyle = `rgba(255,240,200,${1 - k * .7})`; c.lineWidth = 10; c.lineCap = "round";
          c.beginPath(); c.arc(p.x, p.y, 62, a - 1.1 + k * .4, a + 1.1 - k * .4); c.stroke(); c.lineCap = "butt";
        }
      }
    };
  };

  /* ---- RPG: Three Battles ---- */
  GAMES.rpg = (A) => {
    const TX = {
      en: { attack: "⚔️ Attack", fire: "🔥 Fire (5 MP)", potion: "🧪 Potion", defend: "🛡️ Defend", appear: (n) => `A wild ${n} appears!`, charge: (n) => `${n} is gathering power… Defend!`, win: (n, x) => `${n} defeated! +${x} XP`, lvl: (l) => `Level up! You are now level ${l}. Stronger and fully healed.`, crit: "Critical hit!", heal: "You drink a potion.", guard: "You raise your shield.", names: ["Slime", "Wolf", "Stone Golem"] },
      ar: { attack: "⚔️ هجوم", fire: "🔥 نار (5 طاقة)", potion: "🧪 جرعة", defend: "🛡️ دفاع", appear: (n) => `ظهر ${n}!`, charge: (n) => `${n} يجمع قوته… دافع!`, win: (n, x) => `هزمت ${n}! +${x} خبرة`, lvl: (l) => `ارتفع مستواك! أنت الآن في المستوى ${l}. أقوى وصحتك كاملة.`, crit: "ضربة حاسمة!", heal: "شربت جرعة.", guard: "رفعت درعك.", names: ["الهلام", "الذئب", "العملاق الحجري"] }
    }[LANG()] || {};
    const hero = { lv: 1, hp: 30, max: 30, mp: 10, maxmp: 10, atk: 6, xp: 0, next: 12, pots: 2, lunge: 0, flash: 0, guard: false };
    const FOES = [{ hp: 20, atk: 4, xp: 12, col: "#6fcf73", kind: 0 }, { hp: 32, atk: 6, xp: 16, col: "#9aa3b5", kind: 1 }, { hp: 52, atk: 8, xp: 30, col: "#8a7d6b", kind: 2 }];
    let fi = 0, foe = null, busy = true, turn = 0, timers = [];
    const later = (s, fn) => timers.push({ s, fn });
    const hud = () => A.hud([[U().lv, hero.lv], [U().xp, `${hero.xp}/${hero.next}`], [U().potions, hero.pots]]);
    function newFoe() { const f = FOES[fi]; foe = { ...f, max: f.hp, name: TX.names[fi], lunge: 0, flash: 0, charge: false, y: 0 }; turn = 0; A.say(TX.appear(foe.name), 2500); busy = false; buttons(); }
    function buttons() {
      A.actions([
        { label: TX.attack, fn: () => act("attack"), disabled: busy },
        { label: TX.fire, fn: () => act("fire"), disabled: busy || hero.mp < 5 },
        { label: `${TX.potion} ×${hero.pots}`, fn: () => act("potion"), disabled: busy || !hero.pots || hero.hp === hero.max },
        { label: TX.defend, fn: () => act("defend"), disabled: busy }
      ]);
    }
    function dmgFoe(n, col) { foe.hp = Math.max(0, foe.hp - n); foe.flash = .15; A.float(700, 200, "-" + n, col); A.burst(700, 260, 12, col); A.shake(4, .12); }
    function act(kind) {
      if (busy || !foe) return; busy = true; hero.guard = false; buttons();
      if (kind === "attack") { hero.lunge = .25; const crit = Math.random() < .12; dmgFoe((hero.atk + irand(3)) * (crit ? 2 : 1), crit ? "#ffd36f" : "#fff"); if (crit) A.say(TX.crit, 1200); }
      if (kind === "fire") { hero.mp -= 5; hero.lunge = .25; dmgFoe(Math.round(hero.atk * 1.9) + irand(3), "#ff9d5c"); A.burst(700, 250, 30, "#ff9d5c", 1.3); }
      if (kind === "potion") { hero.pots--; const h = Math.min(hero.max - hero.hp, 18); hero.hp += h; A.float(260, 200, "+" + h, "#7be07b"); A.burst(260, 260, 16, "#7be07b"); A.say(TX.heal, 1200); }
      if (kind === "defend") { hero.guard = true; hero.mp = Math.min(hero.maxmp, hero.mp + 3); A.say(TX.guard, 1200); }
      hud();
      later(.7, () => {
        if (foe.hp <= 0) {
          A.say(TX.win(foe.name, foe.xp), 2200); A.burst(700, 250, 40, foe.col, 1.5); hero.xp += foe.xp;
          while (hero.xp >= hero.next) { hero.xp -= hero.next; hero.lv++; hero.next = Math.round(hero.next * 1.5); hero.max += 8; hero.maxmp += 3; hero.atk += 2; hero.hp = hero.max; hero.mp = hero.maxmp; later(1, () => A.say(TX.lvl(hero.lv), 2600)); A.burst(260, 250, 40, "#ffd36f", 1.5); }
          hud(); foe = null; fi++;
          if (fi >= FOES.length) later(1.4, () => A.end(true, hero.lv * 100 + hero.hp * 5));
          else later(2.6, newFoe);
          return;
        }
        enemyTurn();
      });
    }
    function enemyTurn() {
      turn++;
      if (!foe.charge && turn % 3 === 0) { foe.charge = true; A.say(TX.charge(foe.name), 2400); later(.4, () => { busy = false; buttons(); }); return; }
      foe.lunge = .25;
      let d = foe.atk + irand(3); if (foe.charge) { d *= 2; foe.charge = false; } if (hero.guard) d = Math.ceil(d / 3);
      hero.hp = Math.max(0, hero.hp - d); hero.flash = .15; A.float(260, 200, "-" + d, "#ff6f6f"); A.shake(hero.guard ? 2 : 6, .15); hud();
      if (hero.hp <= 0) { later(.6, () => { A.actions([]); A.end(false, hero.lv * 50); }); return; }
      later(.5, () => { busy = false; buttons(); });
    }
    hud(); buttons();
    return {
      start() { later(.3, newFoe); },
      update(dt) {
        for (const x of timers.slice()) if ((x.s -= dt) <= 0) { timers.splice(timers.indexOf(x), 1); x.fn(); }
        hero.lunge = Math.max(0, hero.lunge - dt); hero.flash -= dt;
        if (foe) { foe.lunge = Math.max(0, foe.lunge - dt); foe.flash -= dt; }
      },
      draw(c, now) {
        bgGrad(c, "#2c3e6b", "#c98b6b");
        c.fillStyle = "#3d5a3d"; c.beginPath(); c.moveTo(0, 300); for (let x = 0; x <= W; x += 20) c.lineTo(x, 300 - Math.sin(x * .01) * 20); c.lineTo(W, H); c.lineTo(0, H); c.fill();
        c.fillStyle = "#2c442c"; c.beginPath(); c.ellipse(260, 300, 110, 22, 0, 0, 7); c.ellipse(700, 300, 120, 24, 0, 0, 7); c.fill();
        const hl = Math.sin(hero.lunge / .25 * Math.PI) * 60;
        heroSprite(c, 260 + hl, 262 + Math.sin(now / 400) * 3, 1.5, 1, hero.flash > 0);
        if (hero.guard) { c.strokeStyle = "#5ab8ffaa"; c.lineWidth = 4; c.beginPath(); c.arc(260, 255, 58, 0, 7); c.stroke(); }
        bar(c, 180, 330, 160, 12, hero.hp / hero.max, "#7be07b"); bar(c, 180, 348, 160, 8, hero.mp / hero.maxmp, "#5ab8ff");
        c.fillStyle = "#fff"; c.font = FONT; c.textAlign = "left"; c.fillText(`HP ${hero.hp}/${hero.max}   MP ${hero.mp}`, 180, 378);
        if (foe) {
          const fl = -Math.sin(foe.lunge / .25 * Math.PI) * 60, x = 700 + fl, y = 255 + Math.sin(now / 300) * 4, col = foe.flash > 0 ? "#fff" : foe.col;
          c.fillStyle = "rgba(0,0,0,.3)"; c.beginPath(); c.ellipse(x, 300, 60, 10, 0, 0, 7); c.fill();
          c.fillStyle = col; c.strokeStyle = "#0006"; c.lineWidth = 4;
          if (foe.kind === 0) { c.beginPath(); c.ellipse(x, y + 10, 56, 44, 0, Math.PI, 0); c.lineTo(x + 56, y + 40); c.lineTo(x - 56, y + 40); c.closePath(); c.fill(); c.stroke(); }
          if (foe.kind === 1) { c.beginPath(); c.ellipse(x + 10, y + 10, 60, 30, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(x - 44, y - 10, 30, 24, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x - 60, y - 26); c.lineTo(x - 54, y - 52); c.lineTo(x - 42, y - 30); c.moveTo(x - 38, y - 30); c.lineTo(x - 28, y - 52); c.lineTo(x - 24, y - 26); c.fill(); }
          if (foe.kind === 2) { rr(c, x - 50, y - 50, 100, 90, 12); c.fill(); c.stroke(); rr(c, x - 78, y - 30, 30, 60, 10); c.fill(); c.stroke(); rr(c, x + 48, y - 30, 30, 60, 10); c.fill(); c.stroke(); }
          c.fillStyle = foe.charge ? "#ff6f6f" : "#120f29"; const ex = foe.kind === 1 ? x - 50 : x - 14;
          c.beginPath(); c.arc(ex, y - 6, 5, 0, 7); c.arc(ex + 22, y - 6, 5, 0, 7); c.fill();
          if (foe.charge) { c.strokeStyle = `rgba(255,111,111,${.5 + Math.sin(now / 80) * .4})`; c.lineWidth = 5; c.beginPath(); c.arc(x, y, 90, 0, 7); c.stroke(); }
          bar(c, 620, 330, 160, 12, foe.hp / foe.max, "#ff6f6f");
          c.fillStyle = "#fff"; c.font = FONT; c.textAlign = "left"; c.fillText(`HP ${foe.hp}/${foe.max}`, 620, 362);
        }
      }
    };
  };

  /* ---- Strategy: Path Defense ---- */
  GAMES.strategy = (A) => {
    const TS = 40, WP = [[-1, 2], [5, 2], [5, 8], [11, 8], [11, 3], [17, 3], [17, 9], [24, 9]].map(([c, r]) => [c * TS + TS / 2, r * TS + TS / 2]);
    const pathCells = new Set();
    for (let i = 0; i < WP.length - 1; i++) { const [ax, ay] = WP[i], [bx, by] = WP[i + 1]; const n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)) / TS; for (let k = 0; k <= n; k++) pathCells.add(Math.round((ax + (bx - ax) * k / n - TS / 2) / TS) + "," + Math.round((ay + (by - ay) * k / n - TS / 2) / TS)); }
    let gold = 120, lives = 10, wave = 0, towers = [], foes = [], shots = [], queue = 0, spawnT = 0, countdown = 5, hover = null;
    const WAVES = 8, COST = 50, UPG = 60;
    const TX = { en: { next: "▶ Send next wave", cd: (s) => `Next wave in ${s}s` }, ar: { next: "▶ أرسل الموجة التالية", cd: (s) => `الموجة التالية بعد ${s} ث` } }[LANG()];
    const hud = () => A.hud([[U().wave, `${wave}/${WAVES}`], [U().gold, gold], [U().lives, lives]]);
    const btn = () => A.actions([{ label: TX.next, fn: () => { if (!queue && !foes.length && wave < WAVES) countdown = 0; }, disabled: !!(queue || foes.length) || wave >= WAVES }]);
    hud(); btn();
    function startWave() { wave++; queue = 6 + wave * 2; spawnT = 0; A.say(`${U().wave} ${wave}`, 1200); hud(); btn(); }
    return {
      update(dt) {
        if (!queue && !foes.length) {
          if (wave >= WAVES) { A.end(true, gold + lives * 30); return; }
          const before = Math.ceil(countdown); countdown -= dt;
          if (Math.ceil(countdown) !== before && countdown > 0) A.say(TX.cd(Math.ceil(countdown)), 1100);
          if (countdown <= 0) { startWave(); countdown = 6; }
        }
        if (queue) { spawnT -= dt; if (spawnT <= 0) { const hp = 3 + wave * 1.6; foes.push({ x: WP[0][0], y: WP[0][1], i: 1, hp, max: hp, sp: 55 + wave * 5, ph: rand(7) }); queue--; spawnT = .75; if (!queue) btn(); } }
        for (const f of foes) {
          const [tx, ty] = WP[f.i], dx = tx - f.x, dy = ty - f.y, d = Math.hypot(dx, dy), s = f.sp * dt; f.ph += dt * 6;
          if (d <= s) { f.x = tx; f.y = ty; f.i++; if (f.i >= WP.length) { f.dead = true; lives--; A.shake(6, .2); hud(); if (lives <= 0) { A.end(false, wave * 50); return; } } }
          else { f.x += dx / d * s; f.y += dy / d * s; }
        }
        for (const t of towers) {
          t.cd -= dt; let best = null, bd = 1e9;
          for (const f of foes) { const d = dist(f.x, f.y, t.x, t.y); if (!f.dead && d < t.range && f.i * 1000 - dist(f.x, f.y, ...WP[f.i]) > (best ? best.i * 1000 - dist(best.x, best.y, ...WP[best.i]) : -1e9)) { best = f; bd = d; } }
          if (best) { t.a = Math.atan2(best.y - t.y, best.x - t.x); if (t.cd <= 0) { shots.push({ x: t.x, y: t.y, f: best, dmg: t.dmg }); t.cd = t.rate; } }
        }
        for (const s of shots) {
          if (s.f.dead) { s.dead = true; continue; }
          const dx = s.f.x - s.x, dy = s.f.y - s.y, d = Math.hypot(dx, dy), st = 520 * dt;
          if (d <= st + 6) { s.dead = true; s.f.hp -= s.dmg; A.burst(s.f.x, s.f.y, 4, "#ffd36f", .4); if (s.f.hp <= 0 && !s.f.dead) { s.f.dead = true; gold += 7; A.float(s.f.x, s.f.y, "+7", "#ffd36f"); A.burst(s.f.x, s.f.y, 14, "#ff6f91"); hud(); btn(); } }
          else { s.x += dx / d * st; s.y += dy / d * st; }
        }
        shots = shots.filter(s => !s.dead); const had = foes.length; foes = foes.filter(f => !f.dead); if (had && !foes.length) btn();
      },
      hover(x, y) { hover = [Math.floor(x / TS), Math.floor(y / TS)]; },
      click(x, y) {
        const c = Math.floor(x / TS), r = Math.floor(y / TS), key = c + "," + r;
        const t = towers.find(t => t.c === c && t.r === r);
        if (t) { if (t.lv < 3 && gold >= UPG) { gold -= UPG; t.lv++; t.dmg++; t.range += 18; t.rate *= .8; A.burst(t.x, t.y, 16, "#b8f34a"); A.float(t.x, t.y - 20, "Lv" + t.lv, "#b8f34a"); hud(); } else A.shake(2, .06); return; }
        if (pathCells.has(key) || r < 1 || r > 11 || c < 0 || c > 23) { A.shake(2, .06); return; }
        if (gold < COST) { A.shake(2, .06); return; }
        gold -= COST; towers.push({ c, r, x: c * TS + TS / 2, y: r * TS + TS / 2, lv: 1, dmg: 1, range: 100, rate: .6, cd: 0, a: 0 }); A.burst(c * TS + 20, r * TS + 20, 12, "#c9a27a"); hud();
      },
      draw(c, now) {
        for (let r = 0; r < 12; r++) for (let q = 0; q < 24; q++) { c.fillStyle = (r + q) % 2 ? "#4f7d45" : "#548449"; c.fillRect(q * TS, r * TS, TS, TS); }
        c.strokeStyle = "#a88a5c"; c.lineWidth = TS - 4; c.lineJoin = "round"; c.beginPath(); WP.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
        c.strokeStyle = "#c2a676"; c.lineWidth = 2; c.setLineDash([8, 10]); c.stroke(); c.setLineDash([]);
        c.fillStyle = "#c95b5b"; rr(c, W - 34, WP[WP.length - 1][1] - 26, 28, 52, 6); c.fill();
        if (hover) {
          const [q, r] = hover, t = towers.find(t => t.c === q && t.r === r), ok = !t && !pathCells.has(q + "," + r) && gold >= COST && r >= 1;
          c.fillStyle = t ? "#ffffff22" : ok ? "#b8f34a33" : "#ff6f6f33"; c.fillRect(q * TS, r * TS, TS, TS);
          c.strokeStyle = "#ffffff55"; c.lineWidth = 1.5; c.beginPath(); c.arc(q * TS + 20, r * TS + 20, t ? t.range : 100, 0, 7); c.stroke();
        }
        for (const t of towers) {
          c.fillStyle = "#5b5363"; rr(c, t.x - 16, t.y - 16, 32, 32, 8); c.fill();
          c.save(); c.translate(t.x, t.y); c.rotate(t.a); c.fillStyle = ["#c9a27a", "#75c9c0", "#ffd36f"][t.lv - 1]; c.fillRect(0, -4, 20, 8); c.beginPath(); c.arc(0, 0, 10, 0, 7); c.fill(); c.restore();
          c.fillStyle = "#fff"; for (let i = 0; i < t.lv; i++) c.fillRect(t.x - 12 + i * 9, t.y + 12, 6, 3);
        }
        for (const f of foes) {
          const b = Math.abs(Math.sin(f.ph)) * 4;
          c.fillStyle = "rgba(0,0,0,.3)"; c.beginPath(); c.ellipse(f.x, f.y + 12, 12, 4, 0, 0, 7); c.fill();
          c.fillStyle = "#e05a7a"; c.beginPath(); c.arc(f.x, f.y - b, 13, 0, 7); c.fill();
          c.fillStyle = "#fff"; c.beginPath(); c.arc(f.x + 4, f.y - 3 - b, 3.5, 0, 7); c.fill();
          bar(c, f.x - 14, f.y - 26, 28, 4, f.hp / f.max, "#7be07b");
        }
        c.fillStyle = "#ffd36f"; for (const s of shots) { c.beginPath(); c.arc(s.x, s.y, 4, 0, 7); c.fill(); }
      }
    };
  };

  /* ---- Quiz ---- */
  GAMES.quiz = (A) => {
    const Q = {
      en: [
        ["You grow a character with XP, levels and loot. Which genre?", ["RPG", "Racing", "Puzzle", "Arcade"], 0],
        ["Short rounds, rising difficulty, chasing a high score. Which genre?", ["Simulation", "Arcade", "Adventure", "Board"], 1],
        ["Plant, wait, harvest, expand — you manage a system. Which genre?", ["Action", "Quiz", "Simulation", "Platformer"], 2],
        ["Explore, find a key, open a new area, follow a story. Which genre?", ["Strategy", "Adventure", "Racing", "Arcade"], 1],
        ["What is 'coyote time' in a platformer?", ["A night level", "A grace period to jump after leaving a ledge", "A speed boost", "A boss timer"], 1],
        ["Why do games add shake and particles when you hit something?", ["To slow the game", "To make actions feel impactful and readable", "To hide bugs", "To save memory"], 1],
        ["In a turn-based game, the player mainly has time to…", ["Plan each move", "React in milliseconds", "Skip the rules", "Drive faster"], 0],
        ["In tower defense, where are towers usually most effective?", ["Far from the path", "At corners of the path", "On the path itself", "At the start screen"], 1],
        ["'Hit-stop' in action games is…", ["A pause menu", "A tiny freeze on impact that sells the hit", "A game over screen", "A save point"], 1],
        ["What does a 'core loop' describe?", ["The game's menu", "The repeated set of actions the player does", "The soundtrack", "The final boss"], 1]
      ],
      ar: [
        ["تطوّر شخصية بالخبرة والمستويات والغنائم. أي نوع هذا؟", ["تقمّص الأدوار", "السباق", "الألغاز", "الأركيد"], 0],
        ["جولات قصيرة وصعوبة تتصاعد وسعي لرقم قياسي. أي نوع؟", ["المحاكاة", "الأركيد", "المغامرات", "اللوحة"], 1],
        ["ازرع وانتظر واحصد وتوسّع — تدير نظامًا. أي نوع؟", ["الأكشن", "الأسئلة", "المحاكاة", "المنصات"], 2],
        ["استكشف وابحث عن مفتاح وافتح منطقة جديدة وتابع قصة. أي نوع؟", ["الاستراتيجية", "المغامرات", "السباق", "الأركيد"], 1],
        ["ما هو «وقت الذئب» في ألعاب المنصات؟", ["مرحلة ليلية", "مهلة للقفز بعد مغادرة الحافة", "تسريع مؤقت", "مؤقت الزعيم"], 1],
        ["لماذا تضيف الألعاب اهتزازًا وجسيمات عند الإصابة؟", ["لإبطاء اللعبة", "لتبدو الأفعال قوية وواضحة", "لإخفاء الأخطاء", "لتوفير الذاكرة"], 1],
        ["في الألعاب بالأدوار، يملك اللاعب وقتًا كي…", ["يخطط لكل حركة", "يتفاعل بأجزاء الثانية", "يتجاوز القواعد", "يقود أسرع"], 0],
        ["في ألعاب الدفاع بالأبراج، أين تكون الأبراج أكثر فعالية غالبًا؟", ["بعيدًا عن الطريق", "عند زوايا الطريق", "على الطريق نفسه", "في شاشة البداية"], 1],
        ["«توقف الضربة» في ألعاب الأكشن هو…", ["قائمة الإيقاف", "تجمّد قصير جدًا لحظة الإصابة يُبرز قوتها", "شاشة الخسارة", "نقطة حفظ"], 1],
        ["ماذا تصف «حلقة اللعب الأساسية»؟", ["قائمة اللعبة", "مجموعة الأفعال التي يكررها اللاعب", "الموسيقى", "الزعيم الأخير"], 1]
      ]
    }[LANG()] || [];
    const pick = Q.map(q => q).sort(() => Math.random() - .5).slice(0, 6);
    const LIMIT = 12;
    let i = -1, left = LIMIT, score = 0, streak = 0, locked = false, next = 0, el = null;
    const hud = () => A.hud([[U().q, `${Math.min(i + 1, pick.length)}/${pick.length}`], [U().score, score], [U().streak, streak ? "×" + (1 + Math.min(streak, 4) * .5) : "–"]]);
    function show() {
      i++; hud();
      if (i >= pick.length) { A.panel(null); A.end(true, score); return; }
      const [q, opts] = pick[i]; left = LIMIT; locked = false;
      el = A.panel(`<div class="gl-q"><div class="gl-timer"><i></i></div><p class="gl-qn"><bdi>${i + 1}/${pick.length}</bdi></p><h3>${q}</h3><div class="gl-opts">${opts.map((o, k) => `<button data-o="${k}">${o}</button>`).join("")}</div></div>`);
      el.querySelectorAll("[data-o]").forEach(b => b.addEventListener("click", () => answer(+b.dataset.o)));
    }
    function answer(k) {
      if (locked) return; locked = true;
      const ok = k === pick[i][2];
      el.querySelectorAll("[data-o]").forEach(b => { const n = +b.dataset.o; b.disabled = true; if (n === pick[i][2]) b.classList.add("ok"); else if (n === k) b.classList.add("bad"); });
      if (ok) { streak++; const pts = Math.round((100 + Math.ceil(left) * 10) * (1 + Math.min(streak - 1, 4) * .5)); score += pts; A.burst(W / 2, H / 2, 30, "#b8f34a", 1.4); A.float(W / 2, H / 2 - 120, "+" + pts, "#b8f34a"); }
      else { streak = 0; A.shake(6, .2); }
      hud(); next = 1.4;
    }
    hud();
    return {
      start() { show(); },
      update(dt) {
        if (!locked && el) { left -= dt; const b = el.querySelector(".gl-timer i"); if (b) b.style.inlineSize = Math.max(0, left / LIMIT * 100) + "%"; if (left <= 0) answer(-1); }
        if (locked && next > 0) { next -= dt; if (next <= 0) show(); }
      },
      draw(c, now) {
        bgGrad(c, "#2a1f4f", "#4b2a6b");
        c.font = "700 54px sans-serif"; c.textAlign = "center";
        for (let k = 0; k < 18; k++) { const x = (k * 173 + now * .015 * (k % 3 + 1)) % (W + 80) - 40, y = (k * 89) % H; c.fillStyle = `rgba(255,255,255,${.04 + (k % 4) * .015})`; c.fillText(k % 2 ? "?" : "!", x, y + 40); }
      },
      stop() { A.panel(null); }
    };
  };

  /* ---- Board: Four in a Row ---- */
  const boardScore = { you: 0, ai: 0, draw: 0 };
  GAMES.board = (A) => {
    const C = 7, R = 6, S = 62, ox = (W - C * S) / 2, oy = (H - R * S) / 2 + 14;
    const g = Array.from({ length: R }, () => Array(C).fill(0));
    let turn = 1, drops = [], hoverC = -1, win = null, aiT = 0, over = false, endT = 0, endArgs = null;
    const hud = () => A.hud([[U().you, boardScore.you], [U().ai, boardScore.ai], [U().draws, boardScore.draw]]);
    hud();
    const lowest = (c) => { for (let r = R - 1; r >= 0; r--) if (!g[r][c]) return r; return -1; };
    function line(b, who) {
      const D = [[0, 1], [1, 0], [1, 1], [1, -1]];
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) for (const [dr, dc] of D) {
        const cells = []; for (let k = 0; k < 4; k++) { const rr2 = r + dr * k, cc = c + dc * k; if (rr2 < 0 || rr2 >= R || cc < 0 || cc >= C || b[rr2][cc] !== who) break; cells.push([rr2, cc]); }
        if (cells.length === 4) return cells;
      }
      return null;
    }
    function aiMove() {
      const cols = [...Array(C).keys()].filter(c => lowest(c) >= 0);
      const tryWin = (who) => cols.find(c => { const r = lowest(c); g[r][c] = who; const w = line(g, who); g[r][c] = 0; return w; });
      let c = tryWin(2); if (c === undefined) c = tryWin(1);
      if (c === undefined) {
        const safe = cols.filter(c => { const r = lowest(c); g[r][c] = 2; const r2 = lowest(c); let bad = false; if (r2 >= 0) { g[r2][c] = 1; bad = !!line(g, 1); g[r2][c] = 0; } g[r][c] = 0; return !bad; });
        const pool = safe.length ? safe : cols; let best = -1;
        for (const k of pool) { const sc = 4 - Math.abs(3 - k) + Math.random() * 2.5; if (sc > best) { best = sc; c = k; } }
      }
      drop(c, 2);
    }
    function drop(c, who) { const r = lowest(c); if (r < 0) return false; g[r][c] = who; drops.push({ r, c, y: oy - S, vy: 0, who }); turn = 0; return true; }
    function settle(d) {
      const w = line(g, d.who);
      if (w) { win = w; over = true; boardScore[d.who === 1 ? "you" : "ai"]++; hud(); A.burst(ox + d.c * S + S / 2, oy + d.r * S + S / 2, 30, d.who === 1 ? "#ff6f6f" : "#75c9c0", 1.4); endT = .9; endArgs = [d.who === 1, null, d.who === 1 ? U().win : U().over]; return; }
      if (g.every(row => row.every(Boolean))) { over = true; boardScore.draw++; hud(); endT = .6; endArgs = [false, null, U().draw]; return; }
      turn = d.who === 1 ? 2 : 1; if (turn === 2) aiT = .45;
    }
    return {
      update(dt) {
        for (const d of drops) { d.vy += 2600 * dt; d.y += d.vy * dt; const ty = oy + d.r * S; if (d.y >= ty) { d.y = ty; if (Math.abs(d.vy) > 300) { d.vy = -d.vy * .25; A.shake(1.5, .05); } else { d.done = true; } } }
        const done = drops.filter(d => d.done); drops = drops.filter(d => !d.done);
        for (const d of done) settle(d);
        if (turn === 2 && !over && !drops.length) { aiT -= dt; if (aiT <= 0) aiMove(); }
        if (endArgs) { endT -= dt; if (endT <= 0) { A.end(...endArgs); endArgs = null; } }
      },
      hover(x) { hoverC = Math.floor((x - ox) / S); },
      click(x) { const c = Math.floor((x - ox) / S); if (turn !== 1 || over || c < 0 || c >= C) return; if (!drop(c, 1)) A.shake(2, .06); },
      draw(c, now) {
        bgGrad(c, "#1b2a3a", "#0f1824");
        if (turn === 1 && hoverC >= 0 && hoverC < C && !over) { c.fillStyle = "#ff6f6f88"; c.beginPath(); c.arc(ox + hoverC * S + S / 2, oy - 34, 24, 0, 7); c.fill(); }
        const disc = (x, y, who) => { c.fillStyle = who === 1 ? "#ff6f6f" : "#75c9c0"; c.beginPath(); c.arc(x, y, 24, 0, 7); c.fill(); c.strokeStyle = "#0004"; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 17, 0, 7); c.stroke(); };
        for (const d of drops) disc(ox + d.c * S + S / 2, d.y + S / 2, d.who);
        for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) if (g[r][q] && !drops.some(d => d.r === r && d.c === q)) disc(ox + q * S + S / 2, oy + r * S + S / 2, g[r][q]);
        c.save(); c.fillStyle = "#2f5d8a"; c.beginPath(); c.roundRect(ox - 10, oy - 10, C * S + 20, R * S + 20, 16);
        for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) { c.moveTo(ox + q * S + S / 2 + 26, oy + r * S + S / 2); c.arc(ox + q * S + S / 2, oy + r * S + S / 2, 26, 0, Math.PI * 2, true); }
        c.fill("evenodd"); c.restore();
        if (win) { c.strokeStyle = `rgba(255,255,255,${.6 + Math.sin(now / 100) * .4})`; c.lineWidth = 6; c.lineCap = "round"; c.beginPath(); c.moveTo(ox + win[0][1] * S + S / 2, oy + win[0][0] * S + S / 2); c.lineTo(ox + win[3][1] * S + S / 2, oy + win[3][0] * S + S / 2); c.stroke(); c.lineCap = "butt"; }
        c.fillStyle = turn === 2 ? "#75c9c0" : "#ff6f6f"; c.beginPath(); c.arc(W / 2, H - 14, 6, 0, 7); c.fill();
      }
    };
  };

  /* ---- Simulation: Tiny Farm ---- */
  GAMES.simulation = (A) => {
    const COLS = 6, ROWS = 3, PW = 116, PH = 100, ox = (W - COLS * PW) / 2, oy = 150;
    const GOAL = 300, GROW = 7, ROT = 9;
    let coins = 20, harvests = 0, t = 0, unlockCost = 30, fert = false, helper = false, helperT = 0;
    const plots = Array.from({ length: COLS * ROWS }, (_, i) => ({ open: [7, 8, 9, 10].includes(i), s: "empty", g: 0, ripeT: 0 }));
    const TX = { en: { fert: "🌱 Fertilizer — grow 40% faster (60)", helper: "🧑‍🌾 Helper — auto-harvest (90)", owned: "✓" }, ar: { fert: "🌱 سماد — نمو أسرع 40% (60)", helper: "🧑‍🌾 مساعد — حصاد تلقائي (90)", owned: "✓" } }[LANG()];
    const hud = () => A.hud([[U().coins, `${coins}/${GOAL}`], [U().harvests, harvests], [U().plots, plots.filter(p => p.open).length]]);
    let shopSig = "";
    const shop = () => { const sig = `${fert}${helper}${coins >= 60}${coins >= 90}`; if (sig === shopSig) return; shopSig = sig; A.actions([
      { label: fert ? TX.owned + " " + TX.fert.split("(")[0] : TX.fert, disabled: fert || coins < 60, fn: () => { if (!fert && coins >= 60) { coins -= 60; fert = true; hud(); shop(); A.burst(W / 2, 100, 20, "#7be07b"); } } },
      { label: helper ? TX.owned + " " + TX.helper.split("(")[0] : TX.helper, disabled: helper || coins < 90, fn: () => { if (!helper && coins >= 90) { coins -= 90; helper = true; hud(); shop(); A.burst(W / 2, 100, 20, "#ffd36f"); } } }
    ]); };
    hud(); shop();
    const center = (i) => [ox + (i % COLS) * PW + PW / 2, oy + Math.floor(i / COLS) * PH + PH / 2];
    function harvest(p, i) { p.s = "empty"; p.g = 0; coins += 18; harvests++; const [x, y] = center(i); A.float(x, y - 20, "+18", "#ffd36f"); A.burst(x, y, 12, "#ffd36f"); hud(); shop(); if (coins >= GOAL) A.end(true, Math.max(10, 1000 - Math.floor(t) * 4)); }
    return {
      update(dt) {
        t += dt;
        for (const p of plots) {
          if (p.s === "grow") { p.g += dt / (GROW * (fert ? .6 : 1)); if (p.g >= 1) { p.s = "ripe"; p.ripeT = 0; } }
          else if (p.s === "ripe") { p.ripeT += dt; if (p.ripeT > ROT) p.s = "dead"; }
        }
        if (helper) { helperT -= dt; if (helperT <= 0) { const i = plots.findIndex(p => p.s === "ripe"); if (i >= 0) harvest(plots[i], i); helperT = 1.2; } }
        if (coins < 5 && !plots.some(p => p.s === "grow" || p.s === "ripe")) A.end(false, harvests * 10);
      },
      click(x, y) {
        const c = Math.floor((x - ox) / PW), r = Math.floor((y - oy) / PH); if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return;
        const i = r * COLS + c, p = plots[i], [cx, cy] = center(i);
        if (!p.open) { if (coins >= unlockCost) { coins -= unlockCost; p.open = true; unlockCost += 15; A.burst(cx, cy, 16, "#c9a27a"); hud(); shop(); } else A.shake(2, .06); return; }
        if (p.s === "empty") { if (coins >= 5) { coins -= 5; p.s = "grow"; p.g = 0; A.float(cx, cy - 20, "-5", "#ff9d9d"); hud(); shop(); } else A.shake(2, .06); }
        else if (p.s === "ripe") harvest(p, i);
        else if (p.s === "dead") { p.s = "empty"; A.burst(cx, cy, 8, "#7a5a3a"); }
      },
      draw(c, now) {
        const day = (Math.sin(t / 10) + 1) / 2;
        const sky = c.createLinearGradient(0, 0, 0, 140); sky.addColorStop(0, `rgb(${30 + day * 110},${50 + day * 150},${90 + day * 150})`); sky.addColorStop(1, `rgb(${80 + day * 140},${90 + day * 130},${110 + day * 100})`);
        c.fillStyle = sky; c.fillRect(0, 0, W, 140);
        c.fillStyle = day > .45 ? "#ffe9a8" : "#e8ecff"; c.beginPath(); c.arc(120 + (t * 18) % (W - 240), 60 - day * 20, 22, 0, 7); c.fill();
        c.fillStyle = `rgb(${70 + day * 40},${120 + day * 50},${60 + day * 20})`; c.fillRect(0, 120, W, H - 120);
        c.fillStyle = "#8a5a2b"; rr(c, 60, 60, 90, 70, 6); c.fill(); c.fillStyle = "#b34a3a"; c.beginPath(); c.moveTo(50, 64); c.lineTo(105, 24); c.lineTo(160, 64); c.fill();
        if (helper) heroSprite(c, 190 + Math.sin(now / 600) * 20, 110, .6, 1, false);
        for (let i = 0; i < plots.length; i++) {
          const p = plots[i], x = ox + (i % COLS) * PW + 6, y = oy + Math.floor(i / COLS) * PH + 6, w = PW - 12, h = PH - 12, [cx, cy] = center(i);
          if (!p.open) { c.fillStyle = "#00000030"; rr(c, x, y, w, h, 10); c.fill(); c.strokeStyle = "#ffffff40"; c.setLineDash([6, 6]); c.lineWidth = 2; c.stroke(); c.setLineDash([]); c.fillStyle = coins >= unlockCost ? "#ffd36f" : "#ffffff70"; c.font = FONT; c.textAlign = "center"; c.fillText("🔒 " + unlockCost, cx, cy + 6); continue; }
          c.fillStyle = "#6b4a2b"; rr(c, x, y, w, h, 10); c.fill(); c.fillStyle = "#5a3d22"; for (let k = 0; k < 4; k++) c.fillRect(x + 8, y + 14 + k * 20, w - 16, 5);
          if (p.s === "grow") {
            const s = p.g; c.strokeStyle = "#7be07b"; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, cy + 22); c.lineTo(cx, cy + 22 - 30 * s); c.stroke();
            c.fillStyle = "#7be07b"; c.beginPath(); c.ellipse(cx - 9 * s, cy + 18 - 22 * s, 9 * s + 2, 4 * s + 2, -.5, 0, 7); c.ellipse(cx + 9 * s, cy + 14 - 22 * s, 9 * s + 2, 4 * s + 2, .5, 0, 7); c.fill();
            bar(c, x + 10, y + h - 12, w - 20, 6, s, "#b8f34a");
          }
          if (p.s === "ripe") {
            const b = Math.sin(now / 200) * 2, warn = p.ripeT > ROT * .6;
            c.strokeStyle = "#5fbf5f"; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, cy + 22); c.lineTo(cx, cy - 6); c.stroke();
            c.fillStyle = "#ff9d5c"; c.beginPath(); c.arc(cx, cy - 12 + b, 15, 0, 7); c.fill(); c.fillStyle = "#7be07b"; c.beginPath(); c.ellipse(cx, cy - 28 + b, 8, 4, 0, 0, 7); c.fill();
            if (warn) { c.strokeStyle = `rgba(255,111,111,${.5 + Math.sin(now / 90) * .5})`; c.lineWidth = 3; rr(c, x, y, w, h, 10); c.stroke(); }
            else { c.strokeStyle = "#ffd36faa"; c.lineWidth = 2; rr(c, x, y, w, h, 10); c.stroke(); }
          }
          if (p.s === "dead") { c.strokeStyle = "#7a6a4a"; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, cy + 22); c.quadraticCurveTo(cx + 4, cy, cx + 14, cy + 4); c.stroke(); c.fillStyle = "#6a5a3a"; c.beginPath(); c.arc(cx + 14, cy + 6, 8, 0, 7); c.fill(); }
          if (p.s === "empty") { c.fillStyle = "#ffffff30"; c.font = "700 26px sans-serif"; c.textAlign = "center"; c.fillText("+", cx, cy + 9); }
        }
      }
    };
  };

  /* ---- Racing: Checkpoint Rush ---- */
  GAMES.racing = (A) => {
    const RL = 300, RR = 660, LANES = [360, 480, 600];
    let x = 480, speed = 0, distPx = 0, time = 30, cars = [], spawnT = 1, nextCp = 3000, crashT = 0, cpFlash = 0, trees = Array.from({ length: 16 }, (_, i) => ({ side: i % 2, y: i * 60, x: rand(20, 230) }));
    const MAX = 620, OFF = 200;
    const TX = { en: { cp: "Checkpoint! +8s" }, ar: { cp: "نقطة تفتيش! +8 ث" } }[LANG()];
    const hud = () => A.hud([[U().time, Math.max(0, time).toFixed(1)], [U().speed, Math.round(speed * .4)], [U().dist, Math.round(distPx / 10) + "m"]]);
    hud();
    return {
      pad: ["left", "right", "up", "down"],
      update(dt) {
        time -= dt; crashT -= dt; cpFlash -= dt;
        const off = x < RL + 20 || x > RR - 20;
        if (A.held.up && crashT <= 0) speed += 380 * dt; else if (A.held.down) speed -= 700 * dt; else speed -= 120 * dt;
        speed = clamp(speed, 0, off ? Math.min(OFF, MAX) : MAX); if (off && speed > OFF) speed -= 900 * dt;
        x = clamp(x + ((A.held.right ? 1 : 0) - (A.held.left ? 1 : 0)) * (180 + speed * .4) * dt, RL - 120, RR + 120);
        distPx += speed * dt;
        for (const t of trees) { t.y += speed * dt; if (t.y > H + 40) { t.y -= H + 80; t.x = rand(20, 230); } }
        spawnT -= dt * (speed / 300 + .3);
        if (spawnT <= 0) { cars.push({ x: LANES[irand(3)], y: -80, v: rand(140, 260), col: ["#5ab8ff", "#ffcf5a", "#c77dff", "#7be07b"][irand(4)] }); spawnT = rand(.9, 1.6); }
        for (const k of cars) {
          k.y += (speed - k.v) * dt;
          if (!k.hit && Math.abs(k.x - x) < 40 && Math.abs(k.y - 380) < 70) { k.hit = true; speed *= .3; crashT = .6; A.shake(10, .3); A.burst(x, 360, 24, "#ffd36f", 1.3); k.v += 120; }
        }
        cars = cars.filter(k => k.y < H + 120 && k.y > -400);
        if (distPx >= nextCp) { nextCp += 3000; time += 8; cpFlash = 1.2; A.say(TX.cp, 1400); A.burst(x, 340, 30, "#b8f34a", 1.4); }
        if (Math.floor(time * 10) !== Math.floor((time + dt) * 10)) hud();
        if (time <= 0) { hud(); A.end(false, Math.round(distPx / 10), U().timeUp); }
      },
      draw(c, now) {
        c.fillStyle = "#3f7a3a"; c.fillRect(0, 0, W, H);
        const off = distPx % 80;
        c.fillStyle = "#467f40"; for (let y = -80 + off; y < H; y += 80) { c.fillRect(0, y, RL - 20, 40); c.fillRect(RR + 20, y, W - RR - 20, 40); }
        for (const t of trees) { const tx = t.side ? RR + 40 + t.x : RL - 40 - t.x; c.fillStyle = "#2a5a35"; c.beginPath(); c.arc(tx, t.y, 22, 0, 7); c.fill(); c.fillStyle = "#3d7a46"; c.beginPath(); c.arc(tx - 6, t.y - 6, 10, 0, 7); c.fill(); }
        c.fillStyle = "#3b3f4a"; c.fillRect(RL, 0, RR - RL, H);
        for (let y = -40 + off % 40; y < H; y += 40) { c.fillStyle = (Math.floor((y - off % 40) / 40) % 2) ? "#e0e0e0" : "#d24a4a"; c.fillRect(RL - 14, y, 14, 40); c.fillRect(RR, y, 14, 40); }
        c.fillStyle = "#ffffffaa"; for (const lx of [420, 540]) for (let y = -60 + (distPx % 60); y < H; y += 60) c.fillRect(lx - 3, y, 6, 30);
        const cpY = 380 - (nextCp - distPx);
        if (cpY > -40 && cpY < H) { for (let k = 0; k < 12; k++) { c.fillStyle = k % 2 ? "#fff" : "#111"; c.fillRect(RL + k * 30, cpY, 30, 14); } }
        const car = (cx, cy, col, tilt) => {
          c.save(); c.translate(cx, cy); c.rotate(tilt);
          c.fillStyle = "rgba(0,0,0,.3)"; rr(c, -22, -34, 48, 76, 12); c.fill();
          c.fillStyle = col; rr(c, -24, -38, 48, 76, 12); c.fill();
          c.fillStyle = "#1b2433"; rr(c, -17, -20, 34, 20, 5); c.fill(); rr(c, -17, 14, 34, 12, 4); c.fill();
          c.fillStyle = "#111"; c.fillRect(-28, -28, 6, 16); c.fillRect(22, -28, 6, 16); c.fillRect(-28, 16, 6, 16); c.fillRect(22, 16, 6, 16);
          c.restore();
        };
        for (const k of cars) car(k.x, k.y, k.col, 0);
        const tilt = ((A.held.right ? 1 : 0) - (A.held.left ? 1 : 0)) * .12 + (crashT > 0 ? Math.sin(now / 30) * .2 : 0);
        car(x, 380, "#ff6f6f", tilt);
        if (speed > 450) { c.strokeStyle = "#ffffff30"; c.lineWidth = 2; for (let k = 0; k < 8; k++) { const sx = rand(W), sy = rand(H); c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx, sy + 40); c.stroke(); } }
        if (cpFlash > 0) { c.fillStyle = `rgba(184,243,74,${cpFlash * .15})`; c.fillRect(0, 0, W, H); }
      }
    };
  };

  /* ================= ENGINE ================= */
  let root, canvas, ctx, game = null, gid = null, playing = false, done = false, running = false, raf = 0, last = 0, hooks = {};
  let fx = [], floats = [], shakeT = 0, shakeMag = 0, freezeT = 0, sayTimer = 0;
  const held = { left: false, right: false, up: false, down: false, a: false };
  const taps = new Set();
  const q = (s) => root && root.querySelector(s);
  const bestKey = (id) => "ga_genre_best_" + id;
  const getBest = (id) => { try { return +localStorage.getItem(bestKey(id)) || 0; } catch (e) { return 0; } };
  let lastHud = "";
  const api = {
    W, H, held,
    tap: (k) => taps.has(k),
    best: () => getBest(gid),
    hud(items) {
      const html = items.map(([l, v]) => `<div class="lab-chip"><span>${l}</span><bdi dir="ltr">${v}</bdi></div>`).join("");
      if (html !== lastHud && q("#glHud")) { q("#glHud").innerHTML = html; lastHud = html; }
    },
    say(text, ms = 2400) { const s = q("#glSay"); if (!s) return; s.textContent = text; s.hidden = false; clearTimeout(sayTimer); sayTimer = setTimeout(() => { s.hidden = true; }, ms); },
    burst(x, y, n, color, spread = 1) { for (let i = 0; i < n; i++) { const a = rand(Math.PI * 2), v = rand(60, 260) * spread; fx.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, life: rand(.4, .8), max: .8, color, s: rand(2, 5) }); } },
    float(x, y, text, color = "#fff") { floats.push({ x, y, text, color, t: 1 }); },
    shake(m, t) { shakeMag = Math.max(shakeMag, m); shakeT = Math.max(shakeT, t); },
    freeze(t) { freezeT = Math.max(freezeT, t); },
    actions(list) {
      const box = q("#glActions"); if (!box) return;
      box.hidden = !list.length;
      box.innerHTML = list.map((b, i) => `<button class="btn small" data-act="${i}" ${b.disabled ? "disabled" : ""}>${b.label}</button>`).join("");
      box.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", () => { list[+b.dataset.act].fn(); }));
    },
    panel(html) { const p = q("#glPanel"); if (!p) return null; p.hidden = !html; p.innerHTML = html || ""; return p; },
    end(win, score, title, btn) {
      if (done) return; done = true;
      const cur = game; let best = false;
      if (score != null && score > getBest(gid)) { try { localStorage.setItem(bestKey(gid), String(score)); } catch (e) { /* ignore */ } best = getBest(gid) > 0; }
      setTimeout(() => {
        if (!q("#glOver") || game !== cur) return;
        overlay(title || (win ? U().win : U().over), score != null ? `${U().score}: ${score}${best ? " · " + U().newBest : ""}` : "", btn || U().again);
      }, 700);
    }
  };
  function overlay(title, sub, btn) {
    const o = q("#glOver"); o.hidden = false;
    o.innerHTML = `<div class="gl-over-card"><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ""}<button class="btn" id="glGo">${btn}</button></div>`;
    o.querySelector("#glGo").addEventListener("click", () => { if (done) newGame(); begin(); });
  }
  function newGame() {
    if (game && game.stop) game.stop();
    fx = []; floats = []; shakeT = 0; freezeT = 0; done = false; playing = false; lastHud = "";
    Object.keys(held).forEach(k => held[k] = false); taps.clear();
    api.actions([]); api.panel(null); const s = q("#glSay"); if (s) s.hidden = true;
    game = GAMES[gid](api);
    canvas.style.touchAction = game.drag ? "none" : "";
    const pad = q("#glPad"); const keys = game.pad || [];
    pad.hidden = !keys.length;
    const lbl = { left: "◀", right: "▶", up: "▲", down: "▼", a: "●" };
    pad.innerHTML = `<div>${keys.filter(k => k !== "a").map(k => `<button data-k="${k}" aria-label="${k}">${lbl[k]}</button>`).join("")}</div><div>${keys.includes("a") ? `<button class="jump" data-k="a" aria-label="action">${lbl.a}</button>` : ""}</div>`;
    pad.querySelectorAll("button").forEach(b => {
      const k = b.dataset.k;
      const on = (e) => { e.preventDefault(); if (!held[k]) taps.add(k); held[k] = true; };
      const off = (e) => { e.preventDefault(); held[k] = false; };
      b.addEventListener("pointerdown", on); b.addEventListener("pointerup", off); b.addEventListener("pointerleave", off); b.addEventListener("pointercancel", off);
    });
  }
  function begin() {
    q("#glOver").hidden = true; playing = true;
    if (game.start) game.start();
    canvas.focus({ preventScroll: true });
    if (hooks.onPlay) hooks.onPlay();
  }
  function frame(now) {
    if (!running) return;
    let dt = Math.min(.05, (now - last) / 1000 || 0); last = now;
    if (playing && !done) {
      if (freezeT > 0) freezeT -= dt; else game.update(dt);
    } else if (playing && done && game.update && freezeT <= 0) { /* keep particles alive but freeze game logic */ }
    taps.clear();
    for (const p of fx) { p.vy += 500 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
    fx = fx.filter(p => p.life > 0);
    for (const f of floats) { f.y -= 50 * dt; f.t -= dt; }
    floats = floats.filter(f => f.t > 0);
    if (shakeT > 0) shakeT -= dt; else shakeMag = 0;
    ctx.save();
    if (shakeT > 0) ctx.translate((Math.random() - .5) * shakeMag * 2, (Math.random() - .5) * shakeMag * 2);
    game.draw(ctx, now);
    for (const p of fx) { ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.s, p.s); }
    ctx.globalAlpha = 1;
    ctx.font = "700 22px 'IBM Plex Mono', ui-monospace, monospace"; ctx.textAlign = "center";
    for (const f of floats) { ctx.globalAlpha = Math.min(1, f.t * 2); ctx.lineWidth = 4; ctx.strokeStyle = "#0009"; ctx.strokeText(f.text, f.x, f.y); ctx.fillStyle = f.color; ctx.fillText(f.text, f.x, f.y); }
    ctx.globalAlpha = 1;
    ctx.restore();
    raf = requestAnimationFrame(frame);
  }

  const KEYS = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down", Space: "a", KeyJ: "a", Enter: "a" };
  function onKey(e, down) {
    if (!running || !game) return;
    const tag = (e.target && e.target.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if (tag === "BUTTON" && (e.code === "Space" || e.code === "Enter")) return;
    if (down && e.code === "KeyR" && !e.ctrlKey && !e.metaKey) { newGame(); begin(); return; }
    const k = KEYS[e.code]; if (!k || !(game.pad || []).includes(k)) return;
    e.preventDefault();
    if (down && !held[k]) taps.add(k);
    held[k] = down;
  }
  window.addEventListener("keydown", (e) => onKey(e, true));
  window.addEventListener("keyup", (e) => onKey(e, false));
  window.addEventListener("blur", () => Object.keys(held).forEach(k => held[k] = false));

  function pt(e) { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; }

  function build(el, id) {
    const I = INFO[id], T = U();
    el.innerHTML = `
      <div class="lab-wrap gl-wrap">
        <div class="lab-main">
          <div class="card lab-stage">
            <div class="lab-viewport">
              <canvas id="glCanvas" width="${W}" height="${H}" dir="ltr" tabindex="0" aria-label="${tr(I.game)}"></canvas>
              <div class="lab-status" id="glHud"></div>
              <div class="gl-say" id="glSay" role="status" hidden></div>
              <div class="gl-panel" id="glPanel" hidden></div>
              <div class="gl-over" id="glOver"></div>
            </div>
            <div class="gl-actions" id="glActions" hidden></div>
            <div class="touch-pad lab-touch" id="glPad" dir="ltr"></div>
          </div>
        </div>
        <aside class="card lab-controls gl-info">
          <p class="gl-kicker">${I.icon} ${tr(I.name)}</p>
          <h3 class="gl-title">${tr(I.game)}</h3>
          <h4>${T.what}</h4><p>${tr(I.what)}</p>
          <h4>${T.loop}</h4><ol class="gl-loop">${tr(I.loop).map(s => `<li>${s}</li>`).join("")}</ol>
          <h4>${T.notice}</h4><ul class="gl-notice">${tr(I.notice).map(s => `<li>${s}</li>`).join("")}</ul>
          <h4>${T.controls}</h4><p class="gl-controls">${tr(I.controls)}</p>
          <div class="lab-actions"><button class="btn small" id="glRestart">${T.restart}</button><a class="btn small ghost" href="#/gallery">${T.gallery}</a></div>
        </aside>
      </div>`;
    canvas = el.querySelector("#glCanvas"); ctx = canvas.getContext("2d");
    canvas.addEventListener("pointerdown", (e) => {
      if (!(playing && !done && game.click)) return;
      if (game.drag) { try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } }
      const [x, y] = pt(e); game.click(x, y);
    });
    canvas.addEventListener("pointermove", (e) => { if (game && game.hover && playing && !done) { const [x, y] = pt(e); game.hover(x, y, e.buttons); } });
    canvas.addEventListener("pointerup", (e) => { if (game && game.release && playing && !done) { const [x, y] = pt(e); game.release(x, y); } });
    el.querySelector("#glRestart").addEventListener("click", () => { newGame(); begin(); });
  }

  window.GenreLab = {
    INFO, ORDER, tr,
    open(el, id, h) {
      if (!GAMES[id]) return;
      hooks = h || {}; root = el; gid = id;
      build(el, id); newGame();
      overlay(`${INFO[id].icon} ${tr(INFO[id].game)}`, tr(INFO[id].controls), U().play);
      this.start();
    },
    start() { if (running || !game) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); Object.keys(held).forEach(k => held[k] = false); },
    close() { this.stop(); if (game && game.stop) game.stop(); game = null; gid = null; }
  };
})();
