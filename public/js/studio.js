/* Game Academy — Design Studio: a step-by-step drag & drop game builder.
   Steps: genre → characters → levels → gameplay → world & style → pitch & export.
   Drag works with mouse and touch (pointer events); every draggable is also a button, so a tap/Enter adds it to the default spot.
   Exposes window.GAStudio(el, ctx) — ctx carries the app helpers (state, save, toast, i18n…). */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Building blocks ---------- */
  const SLOTS = ["hero", "ally", "enemy", "boss"];
  const SLOT_MAX = { hero: 1, boss: 2, ally: 6, enemy: 8 };
  const BLOCKS = [
    ["start", "🚩"], ["terrain", "🧱"], ["enemy", "👾"], ["collect", "💎"], ["puzzle", "🧩"], ["trap", "⚠️"],
    ["checkpoint", "⛳"], ["npc", "💬"], ["shop", "🛒"], ["secret", "🗝️"], ["chase", "🏃"], ["boss", "👑"], ["goal", "🏁"]
  ];
  const BLOCK_IDS = BLOCKS.map(b => b[0]);
  const VERBS = ["explore", "collect", "fight", "build", "upgrade", "solve", "race", "trade", "sneak", "craft", "match", "answer", "jump", "survive"];
  const MECHS = ["doubleJump", "dash", "inventory", "crafting", "skillTree", "combo", "timer", "stealth", "dayNight", "physics", "dialogue", "permadeath", "coop", "leaderboard"];
  const PLATFORMS = ["pc", "mobile", "console", "web", "vr"];

  const STR = {
    ar: {
      steps: ["النوع", "الشخصيات", "المراحل", "طريقة اللعب", "العالم والأسلوب", "العرض والتصدير"],
      stepH: ["اختر نوع لعبتك", "كوّن فريق الشخصيات", "ابنِ المراحل", "صمّم طريقة اللعب", "العالم والأسلوب الفني", "اكتب العرض وصدّر الوثيقة"],
      stepP: [
        "تصفّح الأنواع، ثم اسحب البطاقة إلى خانة «لعبتي» — أو اضغطها مباشرة.",
        "اسحب الشخصيات من الرف إلى أدوارها: البطل والرفاق والأعداء والزعيم. يمكنك إعادة تسميتها.",
        "اسحب قطع البناء إلى مسار كل مرحلة بالترتيب الذي يمرّ به اللاعب. اسحب القطعة داخل المسار لتغيير ترتيبها.",
        "اسحب ثلاثة أفعال لتصنع الحلقة الأساسية، ثم اسحب الآليات التي تريدها.",
        "اختر الأسلوب الفني والمنصات، وصف العالم والصوت.",
        "أضف العنوان والجملة التعريفية، وراجع وثيقتك ثم احفظها أو نزّلها."
      ],
      next: "التالي", back: "السابق", myGame: "لعبتي", dropGenre: "اسحب نوعًا إلى هنا",
      shelf: "رف الشخصيات", custom: "شخصية جديدة", customName: "شخصية", slots: { hero: "البطل", ally: "الرفاق", enemy: "الأعداء", boss: "الزعيم" },
      dropHere: "أفلت هنا", full: "هذه الخانة ممتلئة", remove: "إزالة", rename: "الاسم",
      blocksH: "قطع البناء", level: "المرحلة", addLevel: "+ مرحلة جديدة", delLevel: "حذف المرحلة", emptyLane: "اسحب القطع إلى هنا لتبني المرحلة",
      blocks: { start: "البداية", terrain: "منصات وتضاريس", enemy: "أعداء", collect: "مقتنيات", puzzle: "لغز", trap: "فخ", checkpoint: "نقطة حفظ", npc: "حوار/شخصية", shop: "متجر", secret: "سرّ مخفي", chase: "مطاردة", boss: "معركة الزعيم", goal: "النهاية" },
      verbsH: "الأفعال", loopH: "الحلقة الأساسية", mechsH: "الآليات", myMechs: "آليات لعبتي", dropMech: "اضغط أي آلية من القائمة أو اسحبها إلى هنا", notes: "ملاحظات الآليات",
      verbs: { explore: "استكشف", collect: "اجمع", fight: "قاتل", build: "ابنِ", upgrade: "طوّر", solve: "حُلّ", race: "تسابق", trade: "تاجر", sneak: "تسلّل", craft: "اصنع", match: "طابق", answer: "أجب", jump: "اقفز", survive: "انجُ" },
      mechs: { doubleJump: "قفزة مزدوجة", dash: "اندفاع", inventory: "حقيبة أغراض", crafting: "صناعة", skillTree: "شجرة مهارات", combo: "سلاسل ضربات", timer: "مؤقّت", stealth: "تخفٍّ", dayNight: "ليل ونهار", physics: "فيزياء", dialogue: "حوارات واختيارات", permadeath: "موت دائم", coop: "لعب تعاوني", leaderboard: "لوحة صدارة" },
      artH: "الأسلوب الفني", dropArt: "اسحب أسلوبًا إلى هنا", platH: "المنصات", plats: { pc: "حاسوب", mobile: "جوال", console: "منصة ألعاب", web: "ويب", vr: "واقع افتراضي" },
      ai: "✨ اقترح بالذكاء الاصطناعي", aiBusy: "يفكّر…", aiAsk: "اطلب شيئًا محددًا (اختياري)", aiOff: "مساعد الذكاء الاصطناعي غير مفعّل على الخادم بعد.", aiErr: "تعذّر الحصول على اقتراح الآن.", aiLogin: "سجّل الدخول لاستخدام مساعد الذكاء الاصطناعي.", aiLimit: "وصلت إلى حد الاقتراحات لهذه الساعة، جرّب لاحقًا.", aiH: "اقتراحات المساعد", aiUse: "استخدم", aiAddLevel: "أضف المرحلة", aiDrag: "اسحب أي اقتراح إلى مكانه",
      ideaUse: "✔ اعتمدها كفكرة لعبتي", ideaUsed: "✔ هذه فكرة لعبتك — ستجدها في خطوة «العرض والتصدير».", ideaNext: "التالي: اختر نوع اللعبة من البطاقات (أو اضغط بطاقة النوع المقترح)، ثم اضغط «التالي» لبناء الشخصيات.",
      as: { pic: "🖼 صورة", change: "🖼 غيّر", levelPic: "🖼 صورة المرحلة", bgH: "خلفية اللعبة", bgP: "صورة العالم أو الشاشة الرئيسية (PNG أو JPG أو WebP، حتى 3 ميغابايت).", musicH: "موسيقى اللعبة", musicP: "ملف صوتي (mp3 أو ogg أو wav، حتى 10 ميغابايت).", add: "＋ أضف ملفًا", rm: "إزالة",
        note: "الصور والموسيقى تبقى في هذا المتصفح فقط ولا تُرفع إلى الخادم. استخدم رسوماتك وأصواتك أنت، أو أصولًا مرخّصة للاستخدام الحر (CC0).",
        badType: "نوع الملف غير مدعوم.", badSize: (mb) => `الملف أكبر من ${mb} ميغابايت.`, failed: "تعذّر حفظ الملف في المتصفح.",
        zip: "📦 نزّل حزمة المشروع (.zip)", zipBusy: "يجهّز الحزمة…", zipDone: "نُزّلت الحزمة ✓", zipHint: "الحزمة فيها وثيقة التصميم، وصورك وموسيقاك في مجلد assets، وملف تعليمات جاهز تلصقه في أداة ذكاء اصطناعي لتبني لك نسخة تجريبية من لعبتك.",
        assetsH: "الأصول", bg: "الخلفية", music: "الموسيقى" },
      genreFirst: "اختر نوع اللعبة أولًا.", summary: "ملخّص التصميم", nothing: "—", progress: (n, m) => `${n} من ${m} خطوات مكتملة`,
      fin: {
        eyebrow: "اكتمل التصميم", h: "وثيقة تصميم لعبتك جاهزة!", again: "حُدّثت الوثيقة المحفوظة.",
        stats: { genre: "النوع", cast: "الشخصيات", levels: "المراحل", loop: "الحلقة الأساسية" },
        reward: "+40 نقطة خبرة", badge: "شارة جديدة",
        where: "حُفظت في حسابك — ستجدها هنا كلما عدت إلى الاستوديو.", whereGuest: "حُفظت في هذا المتصفح فقط. أنشئ حسابًا مجانيًا لتحتفظ بها على أي جهاز.",
        keep: "احتفظ بنسخة", nextH: "ماذا بعد؟",
        next: [["🧪", "جرّب إحساس الحركة في مختبر اللعب", "#/lab"], ["🎮", "قارن فكرتك بألعاب ناجحة", "#/games"], ["📚", "تعمّق في الدروس", "#/learn"]],
        profile: "👤 ملفي وشاراتي", register: "أنشئ حسابًا", close: "تابع التعديل", fresh: "✚ صمّم لعبة جديدة", freshConfirm: "اضغط مجددًا — ستُمسح الوثيقة الحالية"
      }
    },
    en: {
      steps: ["Genre", "Characters", "Levels", "Gameplay", "World & style", "Pitch & export"],
      stepH: ["Pick your game's genre", "Assemble your cast", "Build the levels", "Design the gameplay", "World & art style", "Write the pitch and export"],
      stepP: [
        "Browse the genres, then drag a card into the “My game” slot — or just tap it.",
        "Drag characters from the shelf into their roles: hero, allies, enemies and boss. Rename them as you like.",
        "Drag building blocks into each level's lane in the order the player meets them. Drag inside a lane to reorder.",
        "Drag three verbs to form the core loop, then drag in the mechanics you want.",
        "Choose an art style and platforms, then describe the world and audio.",
        "Add a title and logline, review your document, then save or download it."
      ],
      next: "Next", back: "Back", myGame: "My game", dropGenre: "Drop a genre here",
      shelf: "Character shelf", custom: "New character", customName: "Character", slots: { hero: "Hero", ally: "Allies", enemy: "Enemies", boss: "Boss" },
      dropHere: "Drop here", full: "That slot is full", remove: "Remove", rename: "Name",
      blocksH: "Building blocks", level: "Level", addLevel: "+ New level", delLevel: "Delete level", emptyLane: "Drag blocks here to build this level",
      blocks: { start: "Start", terrain: "Platforms & terrain", enemy: "Enemies", collect: "Collectibles", puzzle: "Puzzle", trap: "Trap", checkpoint: "Checkpoint", npc: "Dialogue / NPC", shop: "Shop", secret: "Secret", chase: "Chase", boss: "Boss fight", goal: "Goal" },
      verbsH: "Verbs", loopH: "Core loop", mechsH: "Mechanics", myMechs: "My mechanics", dropMech: "Tap any mechanic in the list, or drag it here", notes: "Mechanics notes",
      verbs: { explore: "Explore", collect: "Collect", fight: "Fight", build: "Build", upgrade: "Upgrade", solve: "Solve", race: "Race", trade: "Trade", sneak: "Sneak", craft: "Craft", match: "Match", answer: "Answer", jump: "Jump", survive: "Survive" },
      mechs: { doubleJump: "Double jump", dash: "Dash", inventory: "Inventory", crafting: "Crafting", skillTree: "Skill tree", combo: "Combos", timer: "Timer", stealth: "Stealth", dayNight: "Day / night", physics: "Physics", dialogue: "Dialogue choices", permadeath: "Permadeath", coop: "Co-op", leaderboard: "Leaderboard" },
      artH: "Art style", dropArt: "Drop a style here", platH: "Platforms", plats: { pc: "PC", mobile: "Mobile", console: "Console", web: "Web", vr: "VR" },
      ai: "✨ Suggest with AI", aiBusy: "Thinking…", aiAsk: "Ask for something specific (optional)", aiOff: "The AI assistant isn't enabled on the server yet.", aiErr: "Couldn't get a suggestion right now.", aiLogin: "Sign in to use the AI assistant.", aiLimit: "You've reached this hour's suggestion limit — try again later.", aiH: "Assistant suggestions", aiUse: "Use", aiAddLevel: "Add level", aiDrag: "Drag any suggestion into place",
      ideaUse: "✔ Use as my game idea", ideaUsed: "✔ This is your game idea — you'll find it in the “Pitch & export” step.", ideaNext: "Next: pick a genre from the cards, then press “Next” to build your cast.",
      as: { pic: "🖼 Image", change: "🖼 Change", levelPic: "🖼 Level image", bgH: "Game background", bgP: "An image of the world or title screen (PNG, JPG or WebP, up to 3 MB).", musicH: "Game music", musicP: "An audio file (mp3, ogg or wav, up to 10 MB).", add: "＋ Add a file", rm: "Remove",
        note: "Images and music stay in this browser only and are never uploaded to the server. Use your own art and audio, or assets licensed for free use (CC0).",
        badType: "That file type isn't supported.", badSize: (mb) => `The file is larger than ${mb} MB.`, failed: "Couldn't store the file in this browser.",
        zip: "📦 Download project pack (.zip)", zipBusy: "Packing…", zipDone: "Pack downloaded ✓", zipHint: "The pack holds your design document, your images and music in an assets folder, and a ready-made brief to paste into an AI tool so it builds a playable prototype.",
        assetsH: "Assets", bg: "Background", music: "Music" },
      genreFirst: "Pick a genre first.", summary: "Design summary", nothing: "—", progress: (n, m) => `${n} of ${m} steps done`,
      fin: {
        eyebrow: "Design complete", h: "Your game design document is ready!", again: "Your saved document was updated.",
        stats: { genre: "Genre", cast: "Characters", levels: "Levels", loop: "Core loop" },
        reward: "+40 XP", badge: "New badge",
        where: "Saved to your account — it'll be here whenever you come back to the studio.", whereGuest: "Saved in this browser only. Create a free account to keep it on any device.",
        keep: "Keep a copy", nextH: "What's next?",
        next: [["🧪", "Test how movement feels in the Game Feel Lab", "#/lab"], ["🎮", "Compare your idea with hit games", "#/games"], ["📚", "Go deeper in the lessons", "#/learn"]],
        profile: "👤 My profile & badges", register: "Create an account", close: "Keep editing", fresh: "✚ Design a new game", freshConfirm: "Click again — this clears the current document"
      }
    }
  };

  /* ---------- Pointer drag & drop (mouse + touch) ---------- */
  let dragging = null;
  document.addEventListener("touchmove", (e) => { if (dragging) e.preventDefault(); }, { passive: false });
  /** Wires drag & drop inside root. onDrop(item, zone, beforeEl) when dropped on a [data-drop] that accepts item.dataset.drag; onTap(item) for a click/Enter. */
  function dnd(root, onDrop, onTap) {
    root.addEventListener("dragstart", (e) => { if (e.target.closest?.("[data-drag]") || e.target.tagName === "IMG") e.preventDefault(); }); // stop native image drag from stealing the pointer
    root.addEventListener("click", (e) => {
      const it = e.target.closest("[data-drag]");
      if (!it || !root.contains(it) || e.target.closest("input,textarea,select,[data-act]")) return;
      if (it._dragged) { it._dragged = false; return; }
      onTap(it);
    });
    root.addEventListener("pointerdown", (e) => {
      const it = e.target.closest("[data-drag]");
      if (!it || e.button > 0 || e.target.closest("input,textarea,select,[data-act]")) return;
      const sx = e.clientX, sy = e.clientY, touch = e.pointerType !== "mouse", t0 = Date.now();
      let ghost = null, over = null;
      const zoneAt = (x, y) => {
        const z = document.elementFromPoint(x, y)?.closest("[data-drop]");
        return z && z.dataset.accept.split(" ").includes(it.dataset.drag) ? z : null;
      };
      const move = (ev) => {
        if (!ghost) {
          const d = Math.hypot(ev.clientX - sx, ev.clientY - sy);
          if (d < 6) return;
          if (touch && Date.now() - t0 < 160) { end(); return; } // quick swipe = scroll the page
          const r = it.getBoundingClientRect();
          ghost = it.cloneNode(true); ghost.classList.add("dnd-ghost"); ghost.style.width = r.width + "px";
          ghost.dx = sx - r.left; ghost.dy = sy - r.top;
          document.body.appendChild(ghost); it.classList.add("dnd-src"); dragging = it; document.body.classList.add("dnd-on");
          $$("[data-drop]").forEach(z => { if (z.dataset.accept.split(" ").includes(it.dataset.drag)) z.classList.add("dnd-can"); });
        }
        ev.preventDefault();
        ghost.style.transform = `translate(${ev.clientX - ghost.dx}px, ${ev.clientY - ghost.dy}px)`;
        const z = zoneAt(ev.clientX, ev.clientY);
        if (z !== over) { over?.classList.remove("dnd-over"); over = z; over?.classList.add("dnd-over"); }
      };
      const up = (ev) => {
        if (ghost) {
          it._dragged = true; setTimeout(() => { it._dragged = false; }, 0);
          const z = zoneAt(ev.clientX, ev.clientY);
          if (z) {
            const sibs = $$(":scope > [data-drag]", z).filter(n => n !== it);
            const horiz = z.classList.contains("lane");
            const before = sibs.find(n => { const r = n.getBoundingClientRect(); return horiz ? (document.dir === "rtl" ? ev.clientX > r.left + r.width / 2 : ev.clientX < r.left + r.width / 2) && ev.clientY < r.bottom : ev.clientY < r.top + r.height / 2; });
            onDrop(it, z, before || null);
          }
        }
        end();
      };
      const end = () => {
        removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", end);
        ghost?.remove(); it.classList.remove("dnd-src"); over?.classList.remove("dnd-over"); dragging = null; document.body.classList.remove("dnd-on");
        $$(".dnd-can").forEach(z => z.classList.remove("dnd-can"));
      };
      addEventListener("pointermove", move, { passive: false }); addEventListener("pointerup", up); addEventListener("pointercancel", end);
    });
  }

  /* ---------- The view ---------- */
  let aiCache = null;
  const rid = () => Math.random().toString(36).slice(2, 10); // last AI suggestion for the current step

  let assetsReady = false;
  window.GAStudio = function viewStudio(el, ctx) {
    // The asset key cache loads once (IndexedDB is async); render after it so upload buttons know what exists.
    if (!assetsReady) { window.GAAssets.ready.then(() => { assetsReady = true; if (el.isConnected && location.hash.startsWith("#/studio")) viewStudio(el, ctx); }); return; }
    const { S, save, toast, addXP, T, C, L, esc, head, castImg, ART_REF, ART_KEYS, fit, lang, api, FWD } = ctx;
    const s = STR[lang] || STR.en, t = T().studio, F = t.f;
    const g = S.gdd;
    g.cast = Array.isArray(g.cast) ? g.cast : [];
    g.levels = Array.isArray(g.levels) && g.levels.length ? g.levels : [{ name: "", blocks: [] }];
    g.mechList = Array.isArray(g.mechList) ? g.mechList : [];
    g.platforms = Array.isArray(g.platforms) ? g.platforms : [];
    g.step = Math.min(Math.max(+g.step || 0, 0), 5);
    g.cast.forEach(c => { c.aid ||= rid(); }); g.levels.forEach(l => { l.aid ||= rid(); });
    const AS = window.GAAssets, sa = s.as;
    const charKey = (c) => "char:" + c.aid, levelKey = (l) => "level:" + l.aid;
    /** Upload button (a label around a hidden file input) for one asset slot. */
    const upBtn = (key, kind, label) => `<label class="btn small st-up" data-act="asset" tabindex="0"><input type="file" hidden data-asset="${key}" data-kind="${kind}" accept="${kind === "img" ? "image/png,image/jpeg,image/webp,image/gif" : "audio/*"}">${AS.has(key) ? sa.change : label}</label>`;
    const rmBtn = (key) => AS.has(key) ? `<button type="button" class="btn small ghost-line" data-act="rm-asset" data-key="${key}">${sa.rm}</button>` : "";
    const genres = C.genres || [];
    const genreOf = (id) => genres.find(x => x.id === id);
    const genreImg = (id) => (C.gallery || []).find(x => (x.genres || []).includes(id))?.src;
    const castOf = (id) => (C.cast || []).find(c => c.id === id);
    const artLabel = (k) => t.arts[ART_KEYS.indexOf(k)] || "";
    const verbLabel = (v) => s.verbs[v] || v, mechLabel = (m) => s.mechs[m] || m;
    const blockIcon = (b) => (BLOCKS.find(x => x[0] === b) || [, "▫️"])[1];
    const commit = () => { save(); };
    const done = [!!g.genreId, g.cast.some(c => c.slot === "hero"), g.levels.some(l => l.blocks.length), !!(g.loop1 && g.loop2 && g.loop3), !!g.art, !!(g.title && g.logline)];

    const stepper = `<ol class="st-steps" role="tablist">${s.steps.map((n, i) => `<li><button type="button" role="tab" aria-selected="${i === g.step}" class="${i === g.step ? "on" : ""} ${done[i] ? "ok" : ""}" data-step="${i}"><b>${done[i] ? "✓" : i + 1}</b><span>${n}</span></button></li>`).join("")}</ol>
      <p class="st-prog">${s.progress(done.filter(Boolean).length, 6)}</p>`;

    const chip = (kind, id, label, icon = "", extra = "") => `<button type="button" class="st-chip" data-drag="${kind}" data-id="${esc(id)}" ${extra}>${icon ? `<i>${icon}</i>` : ""}<span>${esc(label)}</span></button>`;

    /* ----- step bodies ----- */
    const bodies = [
      () => {
        const cur = genreOf(g.genreId);
        return `<div class="st-two">
          <div class="st-grid genres" data-drop="pal" data-accept="genre">${genres.map(x => `
            <button type="button" class="st-card genre ${x.id === g.genreId ? "picked" : ""}" data-drag="genre" data-id="${x.id}">
              ${genreImg(x.id) ? fit(genreImg(x.id), "", "st-thumb") : `<span class="st-thumb st-emoji">${x.icon}</span>`}
              <b>${x.icon} ${esc(L(x.name))}</b><small>${esc(L(x.desc))}</small></button>`).join("")}</div>
          <aside class="st-side"><h3>${s.myGame}</h3>
            <div class="st-slot big" data-drop="genre" data-accept="genre">${cur ? `<div class="st-picked">${genreImg(cur.id) ? fit(genreImg(cur.id), "", "st-thumb") : ""}<b>${cur.icon} ${esc(L(cur.name))}</b><small>${esc(L(cur.desc))}</small></div>` : `<span class="st-hint">${s.dropGenre}</span>`}</div>
            <div class="st-idea"><p id="idea">${ctx.currentIdea ? t.idea(...ctx.currentIdea.map(esc)) : t.placeholder}</p>
              <div id="ideaAfter">${ideaAfter()}</div>
              <button class="btn" type="button" id="rollIdea">${t.roll}</button></div>
          </aside></div>`;
      },
      () => {
        const placed = (slot) => g.cast.map((c, i) => [c, i]).filter(([c]) => c.slot === slot);
        const cardFor = (c, i) => {
          const a = castOf(c.arch);
          return `<div class="st-char" data-drag="char" data-idx="${i}" tabindex="0">
            <span class="st-face">${AS.has(charKey(c)) ? `<img data-asset-img="${charKey(c)}" alt="">` : a ? castImg(a) : `<span class="st-emoji">${c.icon || "🧑"}</span>`}</span>
            <input data-act="rename" data-idx="${i}" aria-label="${s.rename}" value="${esc(c.name)}" maxlength="40">
            ${c.note ? `<small>${esc(c.note)}</small>` : a ? `<small>${esc(L(a.role))}</small>` : ""}
            <span class="st-up-row">${upBtn(charKey(c), "img", sa.pic)}${rmBtn(charKey(c))}</span>
            <button type="button" class="st-x" data-act="rm-char" data-idx="${i}" aria-label="${s.remove}">✕</button></div>`;
        };
        return `<div class="st-two">
          <div><h3>${s.shelf}</h3><div class="st-grid cast" data-drop="pal" data-accept="char">
            ${(C.cast || []).map(c => `<button type="button" class="st-card arch" data-drag="arch" data-id="${c.id}"><span class="st-face">${castImg(c)}</span><b>${esc(L(c.name))}</b><small>${esc(L(c.role))}</small></button>`).join("")}
            <button type="button" class="st-card arch custom" data-drag="arch" data-id=""><span class="st-face st-emoji">✚</span><b>${s.custom}</b></button></div></div>
          <div class="st-slots">${SLOTS.map(sl => `<section><h4>${s.slots[sl]} <small>${placed(sl).length}/${SLOT_MAX[sl]}</small></h4>
            <div class="st-slot" data-drop="slot" data-slot="${sl}" data-accept="arch char">${placed(sl).map(([c, i]) => cardFor(c, i)).join("") || `<span class="st-hint">${s.dropHere}</span>`}</div></section>`).join("")}</div></div>`;
      },
      () => `<div class="st-pal sticky"><h3>${s.blocksH}</h3><div class="st-chips" data-drop="trash" data-accept="block">${BLOCKS.map(([b, ic]) => chip("pblock", b, s.blocks[b], ic)).join("")}</div></div>
        <div class="st-levels">${g.levels.map((lv, li) => `
          <section class="st-level"><header><b>${s.level} ${li + 1}</b><input data-act="lvname" data-li="${li}" value="${esc(lv.name)}" placeholder="${esc(s.level + " " + (li + 1))}" maxlength="60">
            <span class="st-up-row">${AS.has(levelKey(lv)) ? `<img class="st-lvthumb" data-asset-img="${levelKey(lv)}" alt="">` : ""}${upBtn(levelKey(lv), "img", sa.levelPic)}${rmBtn(levelKey(lv))}</span>
            ${g.levels.length > 1 ? `<button type="button" class="st-x" data-act="rm-level" data-li="${li}" aria-label="${s.delLevel}">✕</button>` : ""}</header>
            <div class="lane st-lane" data-drop="lane" data-li="${li}" data-accept="pblock block">${lv.blocks.map((b, bi) => `<span class="st-chip block" data-drag="block" data-li="${li}" data-bi="${bi}" tabindex="0"><i>${blockIcon(b)}</i><span>${esc(s.blocks[b] || b)}</span><button type="button" class="st-x" data-act="rm-block" data-li="${li}" data-bi="${bi}" aria-label="${s.remove}">✕</button></span>`).join(`<span class="st-arrow" aria-hidden="true">${FWD()}</span>`) || `<span class="st-hint">${s.emptyLane}</span>`}</div></section>`).join("")}
          <button type="button" class="btn" data-act="add-level">${s.addLevel}</button></div>`,
      () => `<div class="st-two">
          <div><h3>${s.verbsH}</h3><div class="st-chips" data-drop="pal" data-accept="loop">${VERBS.map(v => chip("verb", v, verbLabel(v))).join("")}</div>
            <h3>${s.mechsH}</h3><div class="st-chips" data-drop="trash" data-accept="mech">${MECHS.filter(m => !g.mechList.includes(m)).map(m => chip("pmech", m, mechLabel(m))).join("")}</div></div>
          <div><h3>${s.loopH}</h3><div class="st-loop">${[1, 2, 3].map(n => `<div class="st-slot loop" data-drop="loop" data-n="${n}" data-accept="verb loop">${g["loop" + n] ? `<span class="st-chip" data-drag="loop" data-n="${n}" tabindex="0"><span>${esc(verbLabel(g["loop" + n]))}</span><button type="button" class="st-x" data-act="rm-loop" data-n="${n}">✕</button></span>` : `<span class="st-hint">${t.loopPh[n - 1]}</span>`}</div>`).join(`<span class="st-arrow">${FWD()}</span>`)}<span class="st-arrow">↺</span></div>
            <h3>${s.myMechs}</h3><div class="st-slot st-chips" data-drop="mechs" data-accept="pmech">${g.mechList.map(m => `<span class="st-chip" data-drag="mech" data-id="${esc(m)}" tabindex="0"><span>${esc(mechLabel(m))}</span><button type="button" class="st-x" data-act="rm-mech" data-id="${esc(m)}">✕</button></span>`).join("") || `<span class="st-hint">${s.dropMech}</span>`}</div>
            <div class="field"><label for="f-mechanics">${s.notes}</label><textarea id="f-mechanics" name="mechanics" placeholder="${esc(F.mechanics[1])}">${esc(g.mechanics)}</textarea></div></div></div>`,
      () => `<div class="st-two">
          <div><h3>${s.artH}</h3><div class="st-grid arts" data-drop="pal" data-accept="art">${ART_KEYS.map(k => `<button type="button" class="st-card ${g.art === k ? "picked" : ""}" data-drag="art" data-id="${k}">${fit(ART_REF[k], "", "st-thumb")}<b>${esc(artLabel(k))}</b></button>`).join("")}</div></div>
          <div><div class="st-slot big" data-drop="art" data-accept="art">${g.art ? `<div class="st-picked">${fit(ART_REF[g.art], "", "st-thumb")}<b>${esc(artLabel(g.art))}</b></div>` : `<span class="st-hint">${s.dropArt}</span>`}</div>
            <h3>${s.platH}</h3><div class="st-chips">${PLATFORMS.map(p => `<button type="button" class="st-toggle ${g.platforms.includes(p) ? "on" : ""}" data-act="plat" data-id="${p}" aria-pressed="${g.platforms.includes(p)}">${s.plats[p]}</button>`).join("")}</div>
            ${field("setting", "textarea")}${field("audio", "input")}
            <h3>${sa.assetsH}</h3>
            <div class="st-asset"><div class="st-asset-media">${AS.has("bg") ? `<img data-asset-img="bg" alt="">` : `<span class="st-emoji">🏞️</span>`}</div>
              <div><b>${sa.bgH}</b><small>${sa.bgP}</small><span class="st-up-row">${upBtn("bg", "img", sa.add)}${rmBtn("bg")}</span></div></div>
            <div class="st-asset"><div class="st-asset-media">${AS.has("music") ? "🎵" : `<span class="st-emoji">🎵</span>`}</div>
              <div><b>${sa.musicH}</b><small>${sa.musicP}</small>${AS.has("music") ? `<audio controls preload="none" data-asset-audio="music"></audio>` : ""}<span class="st-up-row">${upBtn("music", "audio", sa.add)}${rmBtn("music")}</span></div></div>
            <p class="st-hint">${sa.note}</p></div></div>`,
      () => `<div class="st-two">
          <form class="card studio-form" autocomplete="off">${["title", "logline", "audience", "usp", "scope"].map(k => field(k, k === "logline" || k === "usp" ? "textarea" : "input")).join("")}
            <div class="studio-actions">
              <button type="button" class="btn primary" id="saveGdd">${t.save}${S.gddSaved ? "" : t.saveXp}</button>
              <button type="button" class="btn" id="zipGdd">${sa.zip}</button>
              <button type="button" class="btn" id="dlGdd">${t.dl}</button>
              <button type="button" class="btn" id="printGdd">${t.print}</button>
              <button type="button" class="btn" id="clearGdd">${t.clear}</button></div>
            <p class="st-hint">${sa.zipHint}</p></form>
          <article class="card gdd-preview" id="gddPreview" aria-live="polite">${preview()}</article></div>`
    ];
    function ideaAfter() {
      if (!ctx.currentIdea) return "";
      const used = g.logline === t.ideaPlain(...ctx.currentIdea);
      return (used ? `<p class="st-hint">${s.ideaUsed}</p>` : `<button class="btn primary small" type="button" id="useIdea">${s.ideaUse}</button>`) +
        (used && !g.genreId ? `<p class="st-hint">${s.ideaNext}</p>` : "");
    }
    function field(k, type) {
      const [label, ph] = F[k];
      return type === "textarea"
        ? `<div class="field"><label for="f-${k}">${label}</label><textarea id="f-${k}" name="${k}" placeholder="${esc(ph)}">${esc(g[k])}</textarea></div>`
        : `<div class="field"><label for="f-${k}">${label}</label><input id="f-${k}" name="${k}" placeholder="${esc(ph)}" value="${esc(g[k])}"></div>`;
    }
    function preview() {
      const v = (k) => g[k] ? esc(g[k]).replace(/\n/g, "<br>") : `<span class="empty">${t.notYet}</span>`;
      const loop = [g.loop1, g.loop2, g.loop3].filter(Boolean).map(verbLabel), gen = genreOf(g.genreId);
      return `<span class="eyebrow">${t.onePage}</span>
        <h2>${g.title ? esc(g.title) : `<span class="empty">${t.untitled}</span>`}</h2>
        <p class="logline">${g.logline ? esc(g.logline) : t.hookHere}</p>
        <div class="tags">${[gen && L(gen.name), ...g.platforms.map(p => s.plats[p]), artLabel(g.art)].filter(Boolean).map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        <h4>${t.sec.loop}</h4>${loop.length ? `<div class="loopviz">${loop.map(x => `<span class="step">${esc(x)}</span>`).join(`<span>${FWD()}</span>`)}<span>↺</span></div>` : `<span class="empty">${t.defineLoop}</span>`}
        <h4>${t.sec.mechanics}</h4><p>${g.mechList.map(mechLabel).map(esc).join(" · ")}${g.mechList.length && g.mechanics ? "<br>" : ""}${g.mechanics ? esc(g.mechanics).replace(/\n/g, "<br>") : g.mechList.length ? "" : `<span class="empty">${t.notYet}</span>`}</p>
        <h4>${t.sec.characters}</h4>${g.cast.length ? `<ul class="st-list">${SLOTS.map(sl => g.cast.filter(c => c.slot === sl).map(c => `<li><b>${s.slots[sl]}:</b> ${esc(c.name)}${c.note ? ` — ${esc(c.note)}` : ""}</li>`).join("")).join("")}</ul>` : `<p><span class="empty">${t.notYet}</span></p>`}
        <h4>${s.steps[2]}</h4>${g.levels.some(l => l.blocks.length) ? `<ol class="st-list">${g.levels.map((l, i) => `<li><b>${esc(l.name || s.level + " " + (i + 1))}:</b> ${l.blocks.map(b => blockIcon(b) + " " + esc(s.blocks[b] || b)).join(` ${FWD()} `) || s.nothing}</li>`).join("")}</ol>` : `<p><span class="empty">${t.notYet}</span></p>`}
        <h4>${t.sec.audience}</h4><p>${v("audience")}</p><h4>${t.sec.world}</h4><p>${v("setting")}</p>
        <h4>${t.sec.artAudio}</h4><p>${g.art ? esc(artLabel(g.art)) : `<span class="empty">${t.chooseArt}</span>`}${g.audio ? " · " + esc(g.audio) : ""}</p>
        ${ART_REF[g.art] ? `<img class="gdd-ref" src="${ART_REF[g.art]}" alt="${esc(t.refFor + artLabel(g.art))}">` : ""}
        <h4>${t.sec.usp}</h4><p>${v("usp")}</p><h4>${t.sec.scope}</h4><p>${v("scope")}</p>`;
    }
    function markdown(used) {
      const gen = genreOf(g.genreId), line = (h, k) => `## ${h}\n${g[k] || "_TBD_"}\n`;
      return `# ${g.title || t.untitled}\n\n> ${g.logline || ""}\n\n**${F.genre[0]}:** ${gen ? L(gen.name) : "-"} · **${F.platform[0]}:** ${g.platforms.map(p => s.plats[p]).join(", ") || "-"} · **${F.art[0]}:** ${artLabel(g.art) || "-"}\n\n` +
        `## ${t.sec.loop}\n${[g.loop1, g.loop2, g.loop3].filter(Boolean).map(verbLabel).join(" → ") || "_TBD_"}\n\n## ${t.sec.mechanics}\n${g.mechList.map(m => "- " + mechLabel(m)).join("\n")}\n${g.mechanics || ""}\n\n` +
        `## ${t.sec.characters}\n${g.cast.map(c => `- **${s.slots[c.slot]}:** ${c.name}${c.note ? " — " + c.note : ""}`).join("\n") || "_TBD_"}\n\n` +
        `## ${s.steps[2]}\n${g.levels.map((l, i) => `${i + 1}. **${l.name || s.level + " " + (i + 1)}:** ${l.blocks.map(b => s.blocks[b] || b).join(" → ") || "-"}`).join("\n")}\n\n` +
        `${line(t.sec.audience, "audience")}\n${line(t.sec.world, "setting")}\n${line(F.audio[0], "audio")}\n${line(t.sec.usp, "usp")}\n${line(t.sec.scope, "scope")}` +
        (used?.length ? `\n## ${sa.assetsH}\n${used.map(u => u.audio ? `- **${u.label}:** [${u.path}](${encodeURI(u.path)})` : `- **${u.label}:**\n\n  ![${u.label}](${encodeURI(u.path)})`).join("\n")}\n` : "");
    }

    /* ----- AI panel ----- */
    const aiPanel = () => `<div class="st-ai card">
        <div class="st-ai-row"><input id="aiAsk" placeholder="${esc(s.aiAsk)}" maxlength="300"><button type="button" class="btn primary" id="aiGo">${s.ai}</button></div>
        <div id="aiOut">${aiCache && aiCache.step === g.step ? aiHtml(aiCache.data) : ""}</div></div>`;
    function aiHtml(d) {
      const st = g.step; let items = "";
      if (st === 1) items = (d.characters || []).map((c, i) => `<button type="button" class="st-chip ai" data-drag="aichar" data-i="${i}"><i>${c.slot === "boss" ? "👑" : c.slot === "enemy" ? "👾" : c.slot === "ally" ? "🤝" : "⭐"}</i><span>${esc(c.name)} · ${esc(s.slots[c.slot] || "")}</span></button>`).join("");
      if (st === 2) items = (d.levels || []).map((l, i) => `<div class="st-ai-level"><b>${esc(l.name)}</b> ${l.blocks.map(b => blockIcon(b)).join(" ")} <button type="button" class="btn small" data-act="ai-level" data-i="${i}">${s.aiAddLevel}</button></div>`).join("");
      if (st === 3) items = (d.loop || []).map(v => VERBS.includes(v) ? chip("verb", v, verbLabel(v), "✨") : "").join("") + (d.mechanics || []).filter(m => MECHS.includes(m) && !g.mechList.includes(m)).map(m => chip("pmech", m, mechLabel(m), "✨")).join("");
      const texts = st === 0 ? [["logline", d.logline], ["title", d.title]] : st === 4 ? [["setting", d.setting], ["audio", d.audio]] : st === 5 ? [["title", d.title], ["logline", d.logline], ["usp", d.usp], ["audience", d.audience], ["scope", d.scope]] : [];
      return `<h4>${s.aiH}</h4>${d.tip ? `<p class="st-tip">${esc(d.tip)}</p>` : ""}
        ${items ? `<p class="st-hint">${s.aiDrag}</p><div class="st-chips">${items}</div>` : ""}
        ${texts.filter(([, v]) => v).map(([k, v]) => `<div class="st-ai-text"><small>${F[k][0]}</small><p>${esc(v)}</p><button type="button" class="btn small" data-act="ai-text" data-k="${k}">${s.aiUse}</button></div>`).join("")}`;
    }

    el.innerHTML = `<div class="st-root">${head("studio", t.eyebrow, s.stepH[g.step], s.stepP[g.step])}
      <div class="studio2">${stepper}
        <div class="st-body" id="stBody">${bodies[g.step]()}</div>
        ${aiPanel()}
        <nav class="st-nav"><button type="button" class="btn" data-go="-1" ${g.step === 0 ? "disabled" : ""}>${lang === "ar" ? "→" : "←"} ${s.back}</button>
          ${g.step < 5 ? `<button type="button" class="btn primary" data-go="1">${s.next} ${FWD()}</button>` : ""}</nav></div></div>`;
    const root = el.firstElementChild;

    const rerender = (scrollTop) => { const y = scrollY; viewStudio(el, ctx); if (!scrollTop) scrollTo(0, y); };
    const goStep = (n) => { g.step = Math.min(Math.max(n, 0), 5); commit(); rerender(true); el.querySelector(".st-steps")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

    /* ----- actions ----- */
    const addChar = (arch, slot, before) => {
      if (g.cast.filter(c => c.slot === slot).length >= SLOT_MAX[slot]) { toast(s.full); return false; }
      const a = castOf(arch);
      const c = { aid: rid(), arch: a ? a.id : "", name: a ? L(a.name) : s.customName + " " + (g.cast.length + 1), slot, note: "" };
      insertChar(c, before); return true;
    };
    const insertChar = (c, before) => { const bi = before ? +before.dataset.idx : -1; if (bi >= 0) g.cast.splice(bi, 0, c); else g.cast.push(c); };
    const defaultSlot = () => SLOTS.find(sl => sl !== "boss" && g.cast.filter(c => c.slot === sl).length < SLOT_MAX[sl]) || "ally";
    const setGenre = (id) => { g.genreId = id; const gen = genreOf(id); if (gen) g.genre = L(gen.name); };

    dnd(root, (it, z, before) => {
      const kind = it.dataset.drag, drop = z.dataset.drop;
      if (kind === "genre" && drop === "genre") setGenre(it.dataset.id);
      else if (kind === "art" && drop === "art") g.art = it.dataset.id;
      else if (kind === "arch" && drop === "slot") { if (!addChar(it.dataset.id, z.dataset.slot, before)) return; }
      else if (kind === "aichar" && drop === "slot") { const c = aiCache?.data.characters[+it.dataset.i]; if (!c) return; if (g.cast.filter(x => x.slot === z.dataset.slot).length >= SLOT_MAX[z.dataset.slot]) { toast(s.full); return; } insertChar({ aid: rid(), arch: "", name: c.name, note: c.note, slot: z.dataset.slot }, before); }
      else if (kind === "char" && drop === "slot") {
        const i = +it.dataset.idx, c = g.cast[i], sl = z.dataset.slot;
        if (c.slot !== sl && g.cast.filter(x => x.slot === sl).length >= SLOT_MAX[sl]) { toast(s.full); return; }
        g.cast.splice(i, 1); c.slot = sl;
        const bi = before ? +before.dataset.idx : -1; g.cast.splice(bi >= 0 ? (bi > i ? bi - 1 : bi) : g.cast.length, 0, c);
      }
      else if (kind === "char" && drop === "pal") { const [c] = g.cast.splice(+it.dataset.idx, 1); if (c) AS.del(charKey(c)); }
      else if ((kind === "pblock" || kind === "block") && drop === "lane") {
        const li = +z.dataset.li, lane = g.levels[li].blocks;
        let id = it.dataset.id, at = before ? +before.dataset.bi : lane.length;
        if (kind === "block") { const fl = +it.dataset.li, fb = +it.dataset.bi; id = g.levels[fl].blocks.splice(fb, 1)[0]; if (fl === li && fb < at) at--; }
        lane.splice(at, 0, id);
      }
      else if (kind === "block" && drop === "trash") g.levels[+it.dataset.li].blocks.splice(+it.dataset.bi, 1);
      else if ((kind === "verb" || kind === "loop") && drop === "loop") {
        const n = z.dataset.n;
        if (kind === "loop") { const from = it.dataset.n; [g["loop" + from], g["loop" + n]] = [g["loop" + n], g["loop" + from]]; } else g["loop" + n] = it.dataset.id;
      }
      else if (kind === "loop" && drop === "pal") g["loop" + it.dataset.n] = "";
      else if (kind === "pmech" && drop === "mechs") { if (!g.mechList.includes(it.dataset.id)) g.mechList.push(it.dataset.id); }
      else if (kind === "mech" && drop === "trash") g.mechList = g.mechList.filter(m => m !== it.dataset.id);
      else return;
      commit(); rerender();
    }, (it) => { // tap / Enter = add to the default place
      const kind = it.dataset.drag;
      if (kind === "genre") setGenre(it.dataset.id);
      else if (kind === "art") g.art = it.dataset.id;
      else if (kind === "arch") { if (!addChar(it.dataset.id, defaultSlot(), null)) return; }
      else if (kind === "aichar") { const c = aiCache?.data.characters[+it.dataset.i]; if (!c) return; const sl = g.cast.filter(x => x.slot === c.slot).length < SLOT_MAX[c.slot] ? c.slot : defaultSlot(); g.cast.push({ aid: rid(), arch: "", name: c.name, note: c.note, slot: sl }); }
      else if (kind === "pblock") g.levels[g.levels.length - 1].blocks.push(it.dataset.id);
      else if (kind === "verb") { const n = [1, 2, 3].find(k => !g["loop" + k]); if (!n) return; g["loop" + n] = it.dataset.id; }
      else if (kind === "pmech") { if (!g.mechList.includes(it.dataset.id)) g.mechList.push(it.dataset.id); }
      else return;
      commit(); rerender();
    });

    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act],[data-step],[data-go]"); if (!b || !root.contains(b)) return;
      if (b.dataset.step) return goStep(+b.dataset.step);
      if (b.dataset.go) return goStep(g.step + +b.dataset.go);
      const a = b.dataset.act;
      if (a === "rm-char") { const [c] = g.cast.splice(+b.dataset.idx, 1); if (c) AS.del(charKey(c)); }
      else if (a === "rm-asset") { AS.del(b.dataset.key).then(() => rerender()); return; }
      else if (a === "rm-block") g.levels[+b.dataset.li].blocks.splice(+b.dataset.bi, 1);
      else if (a === "rm-level") { const [l] = g.levels.splice(+b.dataset.li, 1); if (l) AS.del(levelKey(l)); }
      else if (a === "add-level") g.levels.push({ aid: rid(), name: "", blocks: [] });
      else if (a === "rm-loop") g["loop" + b.dataset.n] = "";
      else if (a === "rm-mech") g.mechList = g.mechList.filter(m => m !== b.dataset.id);
      else if (a === "plat") g.platforms = g.platforms.includes(b.dataset.id) ? g.platforms.filter(p => p !== b.dataset.id) : [...g.platforms, b.dataset.id];
      else if (a === "ai-level") { const l = aiCache?.data.levels[+b.dataset.i]; if (!l) return; const last = g.levels[g.levels.length - 1]; if (!last.blocks.length && !last.name && !AS.has(levelKey(last))) g.levels.pop(); g.levels.push({ aid: rid(), name: l.name, blocks: l.blocks.filter(x => BLOCK_IDS.includes(x)) }); }
      else if (a === "ai-text") { g[b.dataset.k] = aiCache?.data[b.dataset.k] || g[b.dataset.k]; }
      else return;
      commit(); rerender();
    });
    root.addEventListener("input", (e) => {
      const x = e.target;
      if (x.dataset.act === "rename") { g.cast[+x.dataset.idx].name = x.value; commit(); }
      else if (x.dataset.act === "lvname") { g.levels[+x.dataset.li].name = x.value; commit(); }
      else if (x.name && x.closest(".st-body")) { g[x.name] = x.value; commit(); const p = $("#gddPreview", el); if (p) p.innerHTML = preview(); }
    });

    /* idea roller (step 1) */
    $("#rollIdea", el)?.addEventListener("click", () => {
      const I = C.ideas[lang]; const pick = (a) => a[Math.floor(Math.random() * a.length)];
      ctx.currentIdea = [pick(I.genre), pick(I.theme), pick(I.twist)];
      if (!g.logline) { g.logline = t.ideaPlain(...ctx.currentIdea); commit(); }
      const p = $("#idea", el); p.innerHTML = t.idea(...ctx.currentIdea.map(esc)); p.classList.remove("pop-in"); void p.offsetWidth; p.classList.add("pop-in");
      $("#ideaAfter", el).innerHTML = ideaAfter();
      if (!S.idea) { S.idea = true; save(); addXP(10, "idea"); }
    });
    root.addEventListener("click", (e) => {
      if (!e.target.closest("#useIdea") || !ctx.currentIdea) return;
      g.logline = t.ideaPlain(...ctx.currentIdea); commit();
      $("#ideaAfter", el).innerHTML = ideaAfter();
    });

    /* AI */
    $("#aiGo", el).addEventListener("click", async (e) => {
      const btn = e.currentTarget, out = $("#aiOut", el);
      if (g.step > 0 && !g.genreId) { toast(s.genreFirst); return; }
      btn.disabled = true; btn.textContent = s.aiBusy;
      try {
        const gen = genreOf(g.genreId);
        const data = await api("/api/studio/ai", { method: "POST", body: { step: ["genre", "characters", "levels", "gameplay", "world", "pitch"][g.step], lang, ask: $("#aiAsk", el).value, design: {
          genre: gen ? gen.name.en : "", title: g.title || "", logline: g.logline || "", cast: g.cast.map(c => ({ name: c.name, slot: c.slot })),
          levels: g.levels.map(l => ({ name: l.name, blocks: l.blocks })), loop: [g.loop1, g.loop2, g.loop3].filter(Boolean), mechanics: g.mechList, art: g.art || "", setting: g.setting || "" } } });
        aiCache = { step: g.step, data: data.suggestion }; out.innerHTML = aiHtml(data.suggestion);
      } catch (err) { out.innerHTML = `<p class="st-hint">${({ ai_off: s.aiOff, auth_required: s.aiLogin, ai_limit: s.aiLimit })[err.code] || s.aiErr}</p>`; }
      btn.disabled = false; btn.textContent = s.ai;
    });

    /* export (last step) */
    const downloadMd = () => {
      saveBlob(new Blob([markdown()], { type: "text/markdown" }), slug() + ".md");
    };
    /** Stored assets still in use, in pack order: [{ key, base, label, audio? }]. */
    const assetList = () => {
      const out = [], n = {};
      for (const sl of SLOTS) g.cast.filter(c => c.slot === sl).forEach(c => {
        if (!AS.has(charKey(c))) return;
        n[sl] = (n[sl] || 0) + 1;
        out.push({ key: charKey(c), base: "assets/characters/" + sl + (SLOT_MAX[sl] > 1 ? "-" + n[sl] : ""), label: s.slots[sl] + ": " + c.name });
      });
      g.levels.forEach((l, i) => { if (AS.has(levelKey(l))) out.push({ key: levelKey(l), base: "assets/levels/level-" + (i + 1), label: l.name || s.level + " " + (i + 1) }); });
      if (AS.has("bg")) out.push({ key: "bg", base: "assets/background", label: sa.bg });
      if (AS.has("music")) out.push({ key: "music", base: "assets/music", label: sa.music, audio: true });
      return out;
    };
    const slug = () => (g.title || "game-design-document").replace(/[^\w؀-ۿ-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "game";
    const saveBlob = (blob, name) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1500); };
    async function downloadZip(btn) {
      const idle = btn?.textContent; if (btn) { btn.disabled = true; btn.textContent = sa.zipBusy; }
      try {
        const files = [], used = [];
        for (const x of assetList()) {
          const r = await AS.get(x.key); if (!r) continue;
          const path = x.base + "." + AS.ext(r); files.push({ path, data: r.blob }); used.push({ ...x, path });
        }
        const pathOf = (key) => used.find(u => u.key === key)?.path || null, gen = genreOf(g.genreId);
        const data = {
          title: g.title || "", logline: g.logline || "", genre: gen ? gen.name.en : "", genreId: g.genreId || "", lang,
          platforms: g.platforms, art: g.art || "", loop: [g.loop1, g.loop2, g.loop3].filter(Boolean), mechanics: g.mechList, mechanicsNotes: g.mechanics || "",
          characters: g.cast.map(c => ({ role: c.slot, name: c.name, note: c.note || "", image: pathOf(charKey(c)) })),
          levels: g.levels.map((l, i) => ({ name: l.name || s.level + " " + (i + 1), blocks: l.blocks, image: pathOf(levelKey(l)) })),
          background: pathOf("bg"), music: pathOf("music"),
          setting: g.setting || "", audio: g.audio || "", audience: g.audience || "", usp: g.usp || "", scope: g.scope || ""
        };
        files.unshift({ path: "GDD.md", data: markdown(used) }, { path: "game.json", data: JSON.stringify(data, null, 2) }, { path: "BUILD-PROMPT.md", data: buildPrompt(data) });
        saveBlob(await AS.zip(files), slug() + ".zip");
        toast(sa.zipDone);
      } catch (err) { console.error(err); toast(sa.failed); }
      if (btn) { btn.disabled = false; btn.textContent = idle; }
    }
    /** Brief the learner pastes into an AI coding tool to turn the pack into a playable prototype. Written in English (the tools follow it best); in-game text stays in the design's language. */
    function buildPrompt(d) {
      const ui = d.lang === "ar" ? 'Arabic, right-to-left (dir="rtl")' : "English";
      return [
        `# Build brief: ${d.title || "My game"}`, "",
        "Build a small playable prototype of the game described in `GDD.md` and `game.json` (in the same folder as this file).", "",
        "## Hard requirements",
        "- One file: `index.html` next to this brief, with all JavaScript and CSS inside it. No build step, no npm, no server.",
        "- It must run by double-clicking `index.html` (a file:// page). Load images with `new Image()` / `<img>` and music with `new Audio()` / `<audio>` using the relative paths in `game.json`. Do NOT use fetch() or XHR: browsers block them on file://. Copy the values from game.json into the script instead of loading it.",
        "- Use the files in `assets/` exactly where game.json puts them (characters, levels, background, music). Where a slot has no image, draw a simple coloured shape.",
        "- Start the music only after the first click or key press (browsers block autoplay).",
        "- Keyboard controls (arrows/WASD + space) and on-screen touch controls for mobile.",
        `- All on-screen text in ${ui}.`, "",
        "## Scope",
        `- Genre: ${d.genre || "see GDD"}. Core loop: ${d.loop.join(" → ") || "see GDD"}.`,
        "- Build only the first level from game.json, with a start screen, a win screen and a lose/retry screen.",
        "- Keep the code commented and simple so a beginner can change speeds, sizes and text.", "",
        "When you finish, list what you built and suggest three small changes the designer could try next.", ""
      ].join("\n");
    }
    const printDoc = () => {
      const w = window.open("", "_blank"); if (!w) return;
      w.document.write(`<!doctype html><html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${esc(g.title || "GDD")}</title><style>body{font:15px/1.7 system-ui,"Segoe UI",Tahoma;max-width:720px;margin:40px auto;padding:0 20px;color:#111}h4{font-size:12px;color:#555;margin:20px 0 4px}.tag{border:1px solid #ccc;border-radius:99px;padding:2px 8px;font-size:12px;margin:0 2px}.step{border:1px solid #ccc;padding:4px 8px;border-radius:6px}.eyebrow,.empty{color:#888}img{max-width:100%}</style></head><body>${preview()}</body></html>`);
      w.document.close(); w.focus(); w.print();
    };
    const resetDoc = () => { S.gdd = {}; aiCache = null; save(); AS.clear().then(() => viewStudio(el, ctx)); };
    /** Two-click confirm: first click relabels the button, second click within 2.5s runs fn. */
    const armed = (btn, idle, confirm, fn) => {
      let arm = false;
      btn.addEventListener("click", () => {
        if (!arm) { arm = true; btn.textContent = confirm; setTimeout(() => { arm = false; btn.textContent = idle; }, 2500); return; }
        fn();
      });
    };

    function finishDialog(first) {
      const f = s.fin, gen = genreOf(g.genreId), badge = (C.badges || []).find(b => b.id === "gdd");
      const loop = [g.loop1, g.loop2, g.loop3].filter(Boolean).map(verbLabel).join(lang === "ar" ? " ← " : " → ");
      const stat = (k, v) => `<div><dt>${f.stats[k]}</dt><dd>${v ? esc(String(v)) : s.nothing}</dd></div>`;
      const d = document.createElement("dialog");
      d.className = "st-finish"; d.setAttribute("aria-labelledby", "finH");
      d.innerHTML = `
        <button type="button" class="st-x st-finish-x" data-fin="close" aria-label="${esc(f.close)}">✕</button>
        <div class="st-finish-top">
          ${g.art && ART_REF[g.art] ? fit(ART_REF[g.art], "", "st-finish-art") : `<span class="st-finish-art st-emoji">${gen ? gen.icon : "🎮"}</span>`}
          <div><span class="eyebrow">${f.eyebrow}</span>
            <h2 id="finH">${f.h}</h2>
            <p class="st-finish-title">${esc(g.title)}</p>
            <p class="muted">${esc(g.logline)}</p></div>
        </div>
        ${first ? `<div class="st-finish-rewards"><span class="st-finish-xp">${f.reward}</span>${badge ? `<span class="st-finish-badge"><i>${badge.icon}</i><span><small>${f.badge}</small>${esc(L(badge.name))}</span></span>` : ""}</div>` : `<p class="st-hint">${f.again}</p>`}
        <dl class="st-finish-stats">
          ${stat("genre", gen ? L(gen.name) : "")}${stat("cast", g.cast.length || "")}${stat("levels", g.levels.filter(l => l.blocks.length).length || "")}${stat("loop", loop)}
        </dl>
        <p class="st-finish-where">${ctx.loggedIn ? "☁️ " + f.where : "💾 " + f.whereGuest}</p>
        <h3>${f.keep}</h3>
        <div class="st-finish-row">
          <button type="button" class="btn primary" data-fin="zip">${sa.zip}</button>
          <button type="button" class="btn" data-fin="dl">${t.dl}</button>
          <button type="button" class="btn" data-fin="print">${t.print}</button>
          ${ctx.loggedIn ? `<a class="btn" href="#/profile">${f.profile}</a>` : `<a class="btn" href="#/register">${f.register}</a>`}
        </div>
        <h3>${f.nextH}</h3>
        <ul class="st-finish-next">${f.next.map(([ic, label, href]) => `<li><a href="${href}"><i>${ic}</i><span>${label}</span><b aria-hidden="true">${FWD()}</b></a></li>`).join("")}</ul>
        <div class="st-finish-row end">
          <button type="button" class="btn ghost-line" data-fin="fresh">${f.fresh}</button>
          <button type="button" class="btn" data-fin="close">${f.close}</button>
        </div>`;
      document.body.appendChild(d);
      const shut = () => { if (d.open) d.close(); };
      d.addEventListener("close", () => d.remove());
      d.addEventListener("click", (e) => {
        if (e.target === d) return shut(); // backdrop
        const act = e.target.closest("[data-fin]")?.dataset.fin;
        if (act === "close") shut(); else if (act === "dl") downloadMd(); else if (act === "zip") downloadZip(e.target.closest("[data-fin]")); else if (act === "print") printDoc();
        else if (e.target.closest("a[href^='#/']")) shut(); // navigating away
      });
      armed($("[data-fin=fresh]", d), f.fresh, f.freshConfirm, () => { shut(); resetDoc(); scrollTo({ top: 0, behavior: "smooth" }); });
      d.showModal();
      $("[data-fin=zip]", d).focus();
    }

    $("#saveGdd", el)?.addEventListener("click", () => {
      if (!g.title || !g.logline) { toast(t.needTitle); return; }
      commit();
      const first = !S.gddSaved;
      if (first) { S.gddSaved = true; save(); addXP(40, "gdd"); $("#saveGdd", el).textContent = t.save; }
      finishDialog(first);
    });
    $("#dlGdd", el)?.addEventListener("click", downloadMd);
    $("#zipGdd", el)?.addEventListener("click", (e) => downloadZip(e.currentTarget));

    /* assets: pick a file → store it in this browser → re-render */
    root.addEventListener("change", async (e) => {
      const inp = e.target.closest("input[data-asset]"); if (!inp || !inp.files[0]) return;
      const f = inp.files[0], kind = inp.dataset.kind, bad = AS.check(f, kind);
      if (bad) { toast(bad === "type" ? sa.badType : sa.badSize(AS.LIMITS[kind] / 1048576)); inp.value = ""; return; }
      try { await AS.put(inp.dataset.asset, f); rerender(); } catch (err) { toast(sa.failed); }
    });
    root.addEventListener("keydown", (e) => {
      const l = e.target.closest?.("label.st-up");
      if (l && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); l.querySelector("input").click(); }
    });
    $$("[data-asset-img]", root).forEach(async (im) => { im.src = await AS.url(im.dataset.assetImg); });
    $$("[data-asset-audio]", root).forEach(async (au) => { au.src = await AS.url(au.dataset.assetAudio); });
    $("#printGdd", el)?.addEventListener("click", printDoc);
    const clr = $("#clearGdd", el);
    if (clr) armed(clr, t.clear, t.clearConfirm, resetDoc);
  };
})();
