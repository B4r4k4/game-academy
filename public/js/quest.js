/* Game Academy — Learning as an adventure.
   #/learn       → world map: each module is a region on a winding trail; regions unlock in order.
   #/learn/:slug → the region: a briefing, then each lesson is a scene revealed beat by beat
                   (key terms are gems to collect). Clearing every scene frees the region; stars come from the gems found.
   Exposes window.GAQuest = { map(el, ctx), stage(el, slug, ctx) } — ctx carries the app helpers. */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const STR = {
    ar: {
      mapEb: "خريطة المغامرة", mapH: "رحلة صانع الألعاب", mapP: (d, n) => `${n} منطقة بين الفكرة واللعبة المنشورة. استكشف المشاهد واجمع الجواهر وأنهِ كل منطقة لتفتح التالية. حرّرت ${d} من ${n}.`,
      hero: "بطلك", change: "غيّر البطل", yourName: "اسمك", pickH: "اختر بطلك للرحلة", regions: "مناطق محرّرة", stars: "نجوم", gems: "جواهر",
      region: "المنطقة", locked: "🔒 حرّر المنطقة السابقة أولًا", here: "أنت هنا", cleared: "محرّرة", map: "→ الخريطة",
      briefEb: "مهمة جديدة", objH: "أهداف المهمة", obj: (n) => [`🧭 استكشف ${n} مشاهد`, "💎 اجمع جواهر المصطلحات المضيئة داخل النص — كلما جمعت أكثر نلت نجومًا أكثر", "🏁 أنهِ كل المشاهد لتحرّر المنطقة"],
      reward: "الجائزة: نقاط خبرة، ونجوم، ومفتاح المنطقة التالية", begin: "ابدأ المغامرة ←",
      sceneOf: (i, n) => `المشهد ${i} من ${n}`, cont: "تابع ◂", hint: "اضغط «تابع» أو مفتاح المسافة لتكشف بقية المشهد",
      clear: (x) => `أنهِ المشهد · +${x} نقطة`, nextScene: "المشهد التالي ←", toFinish: "حرّر المنطقة 🏁", gemsLeft: (n) => `بقيت ${n} جواهر مخفية في هذا المشهد`, gemGot: "💎 جوهرة!",
      lockedFinish: "أنهِ كل المشاهد لتحرّر المنطقة", finish: "نهاية المنطقة",
      win: "تحرّرت المنطقة!", loot: "الغنائم", scrolls: "لفائف الحكمة", refs: "صور مرجعية", nextRegion: (r) => `المنطقة التالية: ${r} ←`, moreStars: "💎 اجمع الجواهر الناقصة لنجوم أكثر", allDone: "🎓 أكملت الرحلة — اعرض ملفك",
      practice: "🕹️ تدرّب في مختبر اللعب", starsGot: (n) => `${n} من 3 نجوم`, gemsOf: (a, b) => `💎 ${a} من ${b} جواهر`, perfect: "جمعت كل الجواهر!", archive: "🎬 فيديوهات المنطقة", seeAll: "كل الفيديوهات"
    },
    en: {
      mapEb: "Adventure map", mapH: "The game maker's journey", mapP: (d, n) => `${n} regions between an idea and a shipped game. Explore the scenes, collect the gems and finish each region to unlock the next. ${d} of ${n} freed.`,
      hero: "Your hero", change: "Change hero", yourName: "Your name", pickH: "Choose your hero for the journey", regions: "regions freed", stars: "stars", gems: "gems",
      region: "Region", locked: "🔒 Free the previous region first", here: "You are here", cleared: "Freed", map: "← Map",
      briefEb: "New mission", objH: "Mission objectives", obj: (n) => [`🧭 Explore ${n} scenes`, "💎 Collect the glowing key-term gems in the text — more gems, more stars", "🏁 Clear every scene to free the region"],
      reward: "Reward: XP, stars and the key to the next region", begin: "Begin the adventure →",
      sceneOf: (i, n) => `Scene ${i} of ${n}`, cont: "Continue ▸", hint: "Press Continue or the Space bar to reveal the rest of the scene",
      clear: (x) => `Clear scene · +${x} XP`, nextScene: "Next scene →", toFinish: "Free the region 🏁", gemsLeft: (n) => `${n} gems still hidden in this scene`, gemGot: "💎 Gem!",
      lockedFinish: "Clear every scene to free the region", finish: "Region end",
      win: "Region freed!", loot: "Loot", scrolls: "Scrolls of wisdom", refs: "Reference shots", nextRegion: (r) => `Next region: ${r} →`, moreStars: "💎 Find the missing gems for more stars", allDone: "🎓 Journey complete — see your profile",
      practice: "🕹️ Practice in the Game Feel Lab", starsGot: (n) => `${n} of 3 stars`, gemsOf: (a, b) => `💎 ${a} of ${b} gems`, perfect: "Every gem found!", archive: "🎬 Region videos", seeAll: "All videos"
    }
  };
  let X = null;                       // app context for the current render
  const s = () => STR[X.lang] || STR.en;
  const esc = (v) => X.esc(v), L = (o) => X.L(o);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mods = () => X.C.modules;
  const short = (m) => L(m.title).split(/[:：]/)[0].trim();
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const stars = (n, cls = "") => `<span class="q-stars ${cls}" aria-label="${n}/3">${[0, 1, 2].map(i => `<i class="${i < n ? "on" : ""}">★</i>`).join("")}</span>`;

  function ensure() {
    const S = X.S;
    S.stars = S.stars || {}; S.gems = S.gems || {};
    if (!S.avatar || !X.C.cast.some(c => c.id === S.avatar)) S.avatar = (X.C.cast[0] || {}).id;
  }
  const hasProgress = (m) => m.lessons.some(l => X.S.lessons[l.id]);
  /* Stars: 3 for every gem in the region, 2 for at least half, else 1. */
  const gemsIn = (l) => (L(l.body).match(/<strong[\s>]/gi) || []).length;
  const gemTally = (m) => m.lessons.reduce((a, l) => { const n = gemsIn(l); return [a[0] + Math.min(n, (X.S.gems[l.id] || []).length), a[1] + n]; }, [0, 0]);
  const starsFor = (m) => { const [got, all] = gemTally(m); return !all || got >= all ? 3 : got * 2 >= all ? 2 : 1; };
  function awardStars(m) {
    const st = starsFor(m), prev = X.S.stars[m.slug] || 0;
    if (st > prev) { X.S.stars[m.slug] = st; X.save(); X.addXP((st - prev) * 10, "stars"); }
  }
  const unlocked = (i) => i === 0 || !!X.S.modules[mods()[i - 1].slug] || hasProgress(mods()[i]);
  const gemCount = () => Object.values(X.S.gems).reduce((a, v) => a + (v ? v.length : 0), 0);
  const avatar = () => X.C.cast.find(c => c.id === X.S.avatar) || X.C.cast[0];

  /* ================= World map ================= */
  const WAVE = [.5, .86, .62, .14, .38, .9, .5, .1, .5];
  let mapRO = null;
  function map(el, ctx) {
    X = ctx; ensure();
    const t = s(), M = mods(), freed = M.filter(m => X.S.modules[m.slug]).length;
    const cur = M.findIndex((m, i) => unlocked(i) && !X.S.modules[m.slug]);
    const totalStars = Object.values(X.S.stars).reduce((a, n) => a + n, 0), av = avatar();
    el.innerHTML = `
      ${X.head("learn", t.mapEb, t.mapH, t.mapP(freed, M.length))}
      <section class="q-hero card">
        <button class="qh-av" id="qPick" aria-expanded="false">${av ? X.castImg(av) : ""}<span class="qh-swap">${t.change}</span></button>
        <div class="qh-who"><span class="eyebrow">${t.hero}</span><strong>${esc(X.S.player || (av ? L(av.name) : ""))}</strong><small class="muted">${av ? (X.S.player ? esc(L(av.name)) + " · " : "") + esc(L(av.role)) : ""}</small></div>
        <dl class="qh-stats">
          <div><dt>${t.regions}</dt><dd>${freed}<small>/${M.length}</small></dd></div>
          <div><dt>${t.stars}</dt><dd>★ ${totalStars}<small>/${M.length * 3}</small></dd></div>
          <div><dt>${t.gems}</dt><dd>💎 ${gemCount()}</dd></div>
        </dl>
        <div class="q-pick" id="qPickRow" hidden><label class="q-name"><span>${t.yourName}</span><input id="qName" maxlength="24" value="${esc(X.S.player || "")}"></label><p>${t.pickH}</p><div>${X.C.cast.map(c => `<button class="${c.id === X.S.avatar ? "on" : ""}" data-av="${esc(c.id)}" title="${esc(L(c.name))}">${X.castImg(c)}<span>${esc(L(c.name))}</span></button>`).join("")}</div></div>
      </section>
      <div class="qmap" id="qmap">
        <svg class="qmap-path" aria-hidden="true"><path class="base"/><path class="done"/></svg>
        ${M.map((m, i) => {
          const open = unlocked(i), done = !!X.S.modules[m.slug], st = done ? "done" : i === cur ? "current" : open ? "open" : "locked";
          const inner = `<span class="qn-orb">${X.fit(m.cover)}${st === "locked" ? `<span class="qn-lock">🔒</span>` : ""}${i === cur && av ? `<span class="qn-token" title="${esc(t.here)}">${X.castImg(av)}</span>` : ""}</span>
            <span class="qn-num">${t.region} ${esc(m.num)}</span><span class="qn-name">${m.icon} ${esc(short(m))}</span>
            ${done ? stars(X.S.stars[m.slug] || 1) : i === cur ? `<span class="qn-here">${t.here}</span>` : `<span class="qn-meta">${m.lessons.length} · 🏁</span>`}`;
          return open ? `<a class="qnode ${st}" href="#/learn/${m.slug}" style="--mc:${m.color};--x:${WAVE[i % WAVE.length]}">${inner}</a>`
            : `<button class="qnode ${st}" data-locked style="--mc:${m.color};--x:${WAVE[i % WAVE.length]}">${inner}</button>`;
        }).join("")}
        <div class="qmap-end">🏁</div>
      </div>`;
    $$("[data-locked]", el).forEach(b => b.addEventListener("click", () => { X.toast(t.locked); b.classList.remove("nope"); void b.offsetWidth; b.classList.add("nope"); }));
    $("#qPick", el).addEventListener("click", (e) => { const r = $("#qPickRow", el); r.hidden = !r.hidden; e.currentTarget.setAttribute("aria-expanded", !r.hidden); });
    $$("[data-av]", el).forEach(b => b.addEventListener("click", () => { X.S.avatar = b.dataset.av; X.save(); map(el, ctx); }));
    $("#qName", el).addEventListener("change", (e) => { const v = e.target.value.trim().slice(0, 24); if (v) { X.S.player = v; X.save(); map(el, ctx); } else e.target.value = X.S.player || ""; });
    drawPath(el, cur);
  }
  function drawPath(el, cur) {
    const box = $("#qmap", el); if (!box) return;
    const draw = () => {
      if (!box.isConnected) { mapRO && mapRO.disconnect(); return; }
      const b = box.getBoundingClientRect(), svg = $("svg", box);
      svg.setAttribute("viewBox", `0 0 ${b.width} ${b.height}`);
      const pts = $$(".qn-orb", box).map(o => { const r = o.getBoundingClientRect(); return [r.left - b.left + r.width / 2, r.top - b.top + r.height / 2]; });
      const end = $(".qmap-end", box).getBoundingClientRect(); pts.push([end.left - b.left + end.width / 2, end.top - b.top + end.height / 2]);
      const d = (list) => list.map((p, i) => { if (!i) return `M${p[0]},${p[1]}`; const q = list[i - 1], my = (q[1] + p[1]) / 2; return `C${q[0]},${my} ${p[0]},${my} ${p[0]},${p[1]}`; }).join(" ");
      $(".base", svg).setAttribute("d", d(pts));
      const upto = cur === -1 ? pts.length : cur + 1;
      $(".done", svg).setAttribute("d", upto > 1 ? d(pts.slice(0, upto)) : "");
    };
    mapRO && mapRO.disconnect();
    mapRO = new ResizeObserver(draw); mapRO.observe(box);
    requestAnimationFrame(draw);
  }

  /* ================= Region (stage) ================= */
  let Q = { slug: null };
  function stage(el, slug, ctx) {
    X = ctx; ensure();
    const M = mods(), mi = M.findIndex(m => m.slug === slug), m = M[mi];
    if (!m) { location.hash = "#/learn"; return; }
    if (!unlocked(mi)) { X.toast(s().locked); location.hash = "#/learn"; return; }
    if (Q.slug !== slug) {
      const open = m.lessons.findIndex(l => !X.S.lessons[l.id]);
      Q = { slug, reveal: {}, fresh: false,
        mode: X.S.modules[slug] || open === -1 ? "win" : !hasProgress(m) ? "brief" : "scene", idx: open === -1 ? 0 : open };
    }
    Q.el = el; Q.m = m; Q.mi = mi;
    const t = s(), vids = (X.C.videos || []).filter(v => v.module_id === m.id);
    el.innerHTML = `
      <a class="back" href="#/learn">${t.map}</a>
      <section class="qstage" style="--mc:${m.color}">
        <div class="qs-bg">${X.fit(m.cover)}</div>
        <header class="qhud">
          <div class="qh-title"><span class="eyebrow">${t.region} ${esc(m.num)}</span><h1>${m.icon} ${esc(short(m))}</h1></div>
          <ol class="qtrack" id="qtrack"></ol>
        </header>
        <div class="qs-body" id="qsBody"></div>
      </section>
      ${vids.length ? `<section class="mod-videos"><div class="section-title"><h2>${t.archive}</h2><a href="#/videos">${t.seeAll}</a></div><div class="vgrid compact">${vids.map(X.videoCard).join("")}</div></section>` : ""}`;
    X.bindVideos(el);
    paint();
  }
  const allScenesDone = () => Q.m.lessons.every(l => X.S.lessons[l.id]);
  function go(mode, idx) { Q.mode = mode; if (idx != null) Q.idx = idx; paint(); const st = $(".qstage", Q.el); if (st && st.getBoundingClientRect().top < 0) st.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
  function paint() {
    if (!Q.el.isConnected) return;
    track();
    const body = $("#qsBody", Q.el);
    ({ brief, scene, win })[Q.mode](body);
    X.bindZoom(body);
  }
  function track() {
    const t = s(), m = Q.m, ls = m.lessons, done = allScenesDone();
    const firstOpen = ls.findIndex(l => !X.S.lessons[l.id]);
    $("#qtrack", Q.el).innerHTML = ls.map((l, i) => {
      const ok = X.S.lessons[l.id], can = ok || i === firstOpen, on = Q.mode === "scene" && Q.idx === i;
      return `<li><button data-scene="${i}" class="${ok ? "done" : ""} ${on ? "on" : ""}" ${can ? "" : "disabled"} title="${esc(L(l.title))}">${ok ? "✓" : i + 1}</button></li>`;
    }).join("") + `<li class="boss"><button data-finish class="${X.S.modules[m.slug] ? "done" : ""} ${Q.mode === "win" ? "on" : ""}" ${done ? "" : "disabled"} title="${esc(done ? t.finish : t.lockedFinish)}">🏁</button></li>`;
    $$("[data-scene]", Q.el).forEach(b => b.addEventListener("click", () => go("scene", +b.dataset.scene)));
    const fb = $("[data-finish]", Q.el); if (fb) fb.addEventListener("click", () => go("win"));
  }

  /* ---- Briefing ---- */
  function brief(body) {
    const t = s(), m = Q.m;
    body.innerHTML = `<div class="qbrief">
      <figure class="qb-art">${X.fit(m.cover)}</figure>
      <div class="qb-copy"><span class="eyebrow">${t.briefEb}</span><h2>${esc(L(m.title))}</h2><p class="lead">${esc(L(m.tagline))}</p>
        <h3>${t.objH}</h3><ul class="q-obj">${t.obj(m.lessons.length).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="muted">${t.reward}</p>
        <button class="btn primary glow" id="qBegin">${t.begin}</button></div></div>`;
    $("#qBegin", body).addEventListener("click", () => go("scene", 0));
  }

  /* ---- Scene: the lesson revealed beat by beat; <strong> terms are gems ---- */
  function beats(html) {
    const tpl = document.createElement("template"); tpl.innerHTML = html;
    let k = 0;
    $$("strong", tpl.content).forEach(st => { const b = document.createElement("button"); b.type = "button"; b.className = "gem"; b.dataset.gem = k++; b.innerHTML = st.innerHTML; st.replaceWith(b); });
    const out = [];
    tpl.content.childNodes.forEach(n => {
      if (n.nodeType === 1) out.push(n.outerHTML);
      else if (n.nodeType === 3 && n.textContent.trim()) { const p = document.createElement("p"); p.textContent = n.textContent.trim(); out.push(p.outerHTML); }
    });
    return { list: out.length ? out : ["<p></p>"], gems: k };
  }
  function scene(body) {
    const t = s(), m = Q.m, i = Math.min(Q.idx, m.lessons.length - 1), l = m.lessons[i], b = beats(L(l.body));
    const done = !!X.S.lessons[l.id];
    let n = done ? b.list.length : Math.max(1, Q.reveal[l.id] || 1);
    const got = () => X.S.gems[l.id] || [];
    const art = l.image || m.cover;
    body.innerHTML = `<div class="qscene">
      <figure class="qs-art"><button data-zoom="${esc(art)}">${X.fit(art, L(l.title))}</button></figure>
      <div class="qs-dialog">
        <div class="qs-top"><span class="eyebrow">${t.sceneOf(i + 1, m.lessons.length)}</span>${b.gems ? `<span class="qs-gems" id="qsGems"></span>` : ""}</div>
        <h2>${esc(L(l.title))}</h2>
        <div class="qs-log lesson-body" id="qsLog" aria-live="polite"></div>
        <div class="qs-foot"><div class="qs-beats" id="qsBeats"></div><button class="btn primary" id="qsNext"></button></div>
        <p class="qs-hint muted" id="qsHint">${t.hint}</p>
      </div></div>`;
    const log = $("#qsLog", body), btn = $("#qsNext", body);
    const paintGems = () => {
      const g = got(); $$(".gem", log).forEach(x => x.classList.toggle("got", g.includes(+x.dataset.gem)));
      const c = $("#qsGems", body); if (c) c.innerHTML = `💎 ${g.length}/${b.gems}`;
    };
    const update = (anim) => {
      log.innerHTML = b.list.slice(0, n).map((h, k) => k === n - 1 && anim ? h.replace(/^<(\w+)/, '<$1 data-new') : h).join("");
      $$("[data-new]", log).forEach(x => { x.classList.add("beat-in"); x.removeAttribute("data-new"); });
      $$(".fig img", log).forEach(im => im.addEventListener("click", () => window.GA?.zoom?.(im.getAttribute("src"))));
      $$(".gem", log).forEach(x => x.addEventListener("click", () => {
        const g = got(), id = +x.dataset.gem; if (g.includes(id)) return;
        X.S.gems[l.id] = g.concat(id); X.save(); paintGems(); sparkle(x); X.toast(t.gemGot);
        if (X.S.modules[m.slug]) awardStars(m);
      }));
      paintGems();
      $("#qsBeats", body).innerHTML = b.list.map((_, k) => `<i class="${k < n ? "on" : ""}"></i>`).join("");
      const all = n >= b.list.length;
      $("#qsHint", body).hidden = all || done;
      const left = b.gems - got().length, bonus = got().length * 2;
      btn.textContent = !all ? t.cont : !X.S.lessons[l.id] ? t.clear(20 + bonus) : i + 1 < m.lessons.length ? t.nextScene : t.toFinish;
      btn.title = all && !X.S.lessons[l.id] && left > 0 ? t.gemsLeft(left) : "";
    };
    btn.addEventListener("click", () => {
      if (n < b.list.length) { n++; Q.reveal[l.id] = n; update(true); return; }
      if (!X.S.lessons[l.id]) { X.S.lessons[l.id] = true; X.save(); X.addXP(20 + got().length * 2, "lesson"); }
      if (i + 1 < m.lessons.length) go("scene", i + 1);
      else if (allScenesDone()) go("win");
      else go("scene", m.lessons.findIndex(x => !X.S.lessons[x.id]));
    });
    update(false);
  }
  function sparkle(node) {
    if (reduced) return;
    const r = node.getBoundingClientRect();
    for (let k = 0; k < 10; k++) {
      const p = document.createElement("i"); p.className = "spark";
      const a = Math.random() * 6.283, d = 24 + Math.random() * 40;
      p.style.left = (r.left + r.width / 2) + "px"; p.style.top = (r.top + r.height / 2) + "px";
      p.style.setProperty("--dx", Math.cos(a) * d + "px"); p.style.setProperty("--dy", Math.sin(a) * d + "px");
      p.style.background = ["#ffd37a", "#5cc8d8", "#fff"][k % 3];
      document.body.appendChild(p); setTimeout(() => p.remove(), 900);
    }
  }

  /* ---- Region end: frees the region (first time), stars from gems, loot ---- */
  function win(body) {
    const t = s(), m = Q.m, M = mods(), next = M[Q.mi + 1];
    if (!X.S.modules[m.slug] && allScenesDone()) {
      awardStars(m); X.maybeCompleteModule(m); X.checkBadges(); Q.fresh = true;
      track();
    }
    const st = X.S.stars[m.slug] || starsFor(m), [got, all] = gemTally(m);
    const refs = [...new Set([m.cover, ...m.lessons.map(l => l.image)].filter(Boolean))];
    const missing = m.lessons.findIndex(l => (X.S.gems[l.id] || []).length < gemsIn(l));
    body.innerHTML = `<div class="qwin ${Q.fresh ? "fresh" : ""}">
      <div class="qw-head"><span class="eyebrow">${t.region} ${esc(m.num)}</span><h2>${t.win}</h2>${stars(st, "big")}
        <p class="muted">${t.starsGot(st)} · ${all && got >= all ? t.perfect : t.gemsOf(got, all)}</p></div>
      <div class="qw-loot"><h3>${t.scrolls}</h3><ol class="qw-scrolls">${(L(m.takeaways) || []).map(x => `<li>${esc(x)}</li>`).join("")}</ol>
        ${refs.length ? `<h3>${t.refs}</h3><div class="mini-gallery">${refs.map(src => `<img src="${esc(src)}" alt="" loading="lazy" data-zoom="${esc(src)}">`).join("")}</div>` : ""}</div>
      <div class="qw-cta">
        ${next ? `<a class="btn primary glow" href="#/learn/${next.slug}">${esc(t.nextRegion(short(next)))}</a>` : `<a class="btn primary glow" href="#/profile">${t.allDone}</a>`}
        ${missing !== -1 ? `<button class="btn" id="qMore">${t.moreStars}</button>` : ""}
        ${m.lab ? `<a class="btn ghost-line" href="#/lab">${t.practice}</a>` : ""}
        <a class="btn ghost-line" href="#/learn">${t.map}</a>
      </div></div>`;
    Q.fresh = false;
    const more = $("#qMore", body); if (more) more.addEventListener("click", () => go("scene", missing));
  }

  /* Keyboard: Space continues a scene. */
  document.addEventListener("keydown", (e) => {
    if (!Q.el || !Q.el.isConnected || !Q.el.classList.contains("active") || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable]") || document.querySelector("#lightbox:not([hidden]), dialog[open]")) return;
    if (Q.mode === "scene" && e.key === " " && !e.target.closest("button, a")) { e.preventDefault(); $("#qsNext", Q.el)?.click(); }
  });

  window.GAQuest = { map, stage };
})();
