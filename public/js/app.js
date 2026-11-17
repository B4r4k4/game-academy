/* Game Academy v2 — bilingual SPA: user pages, auth, progress sync, cinematic motion. Admin pages live in admin.js. */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const T = () => I18N.t, L = (o) => I18N.L(o);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IMG = (f) => "/images/" + f;
  const PIC = { learn: IMG("2a2d3667ba7e1d63e8bf0277e6a040f2.jpg"), lab: IMG("fcdc0e9522ec3c9501b02611066c936f.jpg"), hall: IMG("64a2dcf7178675e3eca666961e5fed23.jpg"), gallery: IMG("02dcfbefe90d72b020174944578e35bf.jpg"), studio: IMG("59a14c35737e4f4ebe0430940e3070f6.jpg"), games: IMG("7b2fa29bbd6afeeb415c1689c2f146ad.jpg"), sellers: IMG("f6252ae0a48cf7d8bc2ab29d2ab8b605.jpg"), assets: IMG("0ce14877070edf73ce6e8dd221205e3a.jpg"), castPoster: IMG("dc2021517635a27544f5ac93233cd5e6.jpg") };
  const ART_REF = { pixel: IMG("079c911db9949dff4702781d6857369f.jpg"), vector: IMG("28abc3dd8c7814dacf00f82a1777cf61.jpg"), lowpoly: IMG("8e3c920ba644f94924101abf5cfe2e20.jpg"), iso: IMG("02dcfbefe90d72b020174944578e35bf.jpg"), stylized: IMG("e28c3ec7dbaaf46610b16d57720f5ba2.jpg"), hybrid: IMG("fcdc0e9522ec3c9501b02611066c936f.jpg") };
  const ART_KEYS = Object.keys(ART_REF);
  /* Home hero: realistic key art shown as film-frame panels — [file, focal point]. */
  /* Original art only on the home hero, banners and cast — no third-party characters (see the 2026-11-16 review). */
  const HERO_SHOTS = [["64a2dcf7178675e3eca666961e5fed23.jpg", "50% 30%"], ["dc2021517635a27544f5ac93233cd5e6.jpg", "50% 25%"], ["02dcfbefe90d72b020174944578e35bf.jpg", "50% 50%"], ["50535a92ff115343db22d8abc8c6facb.jpg", "50% 40%"]];
  const BANNER = { learn: IMG("260d34da2f408621cb1989b2f8c32645.jpg"), gallery: IMG("50535a92ff115343db22d8abc8c6facb.jpg"), studio: IMG("800edad8be4259bef7e61dbc74bc3ce1.jpg"), videos: IMG("2a2d3667ba7e1d63e8bf0277e6a040f2.jpg"), games: IMG("8e3c920ba644f94924101abf5cfe2e20.jpg"), profile: IMG("ad47519e8a1ee6d5c4001c0450eb4562.jpg"), account: IMG("ad47519e8a1ee6d5c4001c0450eb4562.jpg") };
  /* Rendered key art for each cast archetype — [file, focal point]. Replaces the flat SVG cast on user pages. */
  const CAST_ART = { nova: ["ad47519e8a1ee6d5c4001c0450eb4562.jpg", "50% 50%"], shade: ["64a2dcf7178675e3eca666961e5fed23.jpg", "50% 36%"], ember: ["dc2021517635a27544f5ac93233cd5e6.jpg", "50% 22%"], doc: ["38eb386afea361c404aab871acf40f5a.jpg", "50% 26%"] };
  const castImg = (c, cls = "") => { const a = CAST_ART[c.id]; return a ? `<img class="${cls}" src="${IMG(a[0])}" style="object-position:${a[1]}${a[2] ? `;scale:${a[2]};transform-origin:${a[1]}` : ""}" alt="${esc(L(c.name))}" loading="lazy">` : `<img class="${cls}" src="/assets/art/cast-${c.id}.svg" alt="${esc(L(c.name))}" loading="lazy">`; };
  /** Whole-image frame: the full picture (contain) over a blurred copy of itself, so nothing is cropped away. */
  const fit = (src, alt = "", cls = "") => `<span class="fit ${cls}"><img class="fit-bg" src="${esc(src)}" alt="" aria-hidden="true" loading="lazy"><img class="fit-fg" src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></span>`;
  /** Page banner: the full key art beside the eyebrow, title and intro. Arguments are trusted/escaped HTML. */
  const head = (k, eb, h, p) => `<header class="page-head has-bg">${BANNER[k] ? fit(BANNER[k], "", "ph-art") : ""}<div class="ph-in"><span class="eyebrow">${eb}</span><h1>${h}</h1>${p ? `<p>${p}</p>` : ""}</div></header>`;
  const FWD = () => (I18N.lang === "ar" ? "←" : "→");

  /* ---------------- API ---------------- */
  async function api(path, opts = {}) {
    let res;
    try {
      res = await fetch(path, { method: opts.method || "GET", credentials: "same-origin", headers: opts.body !== undefined ? { "Content-Type": "application/json" } : {}, body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined });
    } catch (e) { const err = new Error("network"); err.code = "network"; throw err; }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { const err = new Error(data.error || "generic"); err.code = data.error || "generic"; err.status = res.status; throw err; }
    return data;
  }
  const errText = (e) => T().err[e.code] || T().err.generic;

  /* ---------------- State ---------------- */
  let C = null, ME = null;
  const GKEY = "ga-guest-v2";
  const fresh = () => ({ xp: 0, lessons: {}, modules: {}, hall: {}, gallery: {}, videos: {}, badges: {}, lab: false, coins: false, idea: false, gddSaved: false, castQuiz: false, gdd: {}, theme: null, stars: {}, gems: {}, avatar: null, player: "" });
  let S = fresh();
  const loadGuest = () => { try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(GKEY)) || {}); } catch (e) { return fresh(); } };
  let saveT = 0;
  function save() {
    if (!ME) { try { localStorage.setItem(GKEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } return; }
    clearTimeout(saveT);
    saveT = setTimeout(() => api("/api/me/progress", { method: "PUT", body: { state: S, xp: S.xp } }).catch(() => toast(T().err.network)), 600);
  }
  function adopt(user) {
    ME = user;
    S = user ? Object.assign(fresh(), user.state || {}, { xp: user.xp }) : loadGuest();
  }

  const XP_PER_LEVEL = 150, TITLE_AT = [1, 3, 5, 8, 12, 16];
  const level = () => Math.floor(S.xp / XP_PER_LEVEL) + 1;
  const title = () => T().titles[TITLE_AT.filter(l => level() >= l).length - 1];
  const count = (o) => Object.values(o || {}).filter(Boolean).length;
  const lessonsDone = (m) => m.lessons.filter(l => S.lessons[l.id]).length;
  const modPct = (m) => m.lessons.length ? Math.round(lessonsDone(m) / m.lessons.length * 100) : 0;

  /* ---------------- Feedback: toasts, XP burst, level up ---------------- */
  function toast(html) {
    const n = document.createElement("div"); n.className = "toast"; n.innerHTML = html;
    $("#toasts").appendChild(n); setTimeout(() => n.remove(), 3400);
  }
  function xpBurst(n) {
    const chip = $(".player-chip"); if (!chip) return;
    chip.classList.remove("ping"); void chip.offsetWidth; chip.classList.add("ping");
    if (reduced) return;
    const r = chip.getBoundingClientRect();
    const b = document.createElement("div"); b.className = "xp-pop"; b.textContent = "+" + n + " XP";
    b.style.left = (r.left + r.width / 2) + "px"; b.style.top = (r.bottom + 6) + "px";
    document.body.appendChild(b); setTimeout(() => b.remove(), 1300);
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("i"); p.className = "spark";
      const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60;
      p.style.left = (r.left + r.width / 2) + "px"; p.style.top = (r.top + r.height / 2) + "px";
      p.style.setProperty("--dx", Math.cos(a) * d + "px"); p.style.setProperty("--dy", Math.sin(a) * d + "px");
      p.style.background = ["#ffb238", "#ffd37a", "#ffffff", "#ff6b4a", "#5cc8d8"][i % 5];
      document.body.appendChild(p); setTimeout(() => p.remove(), 900);
    }
  }
  function levelUp() {
    const o = $("#levelup");
    $("#luText").textContent = T().levelUp; $("#luLevel").textContent = level(); $("#luTitle").textContent = title();
    o.hidden = false; o.classList.remove("show"); void o.offsetWidth; o.classList.add("show");
    clearTimeout(levelUp.t); levelUp.t = setTimeout(() => { o.hidden = true; o.classList.remove("show"); }, 2600);
  }
  function addXP(n, whyKey) {
    const before = level();
    S.xp += n; save(); updateChip(); xpBurst(n);
    toast(T().xpToast(n, T().why[whyKey]));
    if (level() > before) setTimeout(() => { levelUp(); toast(T().levelToast(level(), title())); }, 500);
    checkBadges();
  }
  function updateChip() {
    const c = $(".player-chip"); if (!c) return;
    $(".lvl", c).textContent = T().lv + " " + level();
    $(".xpbar span", c).style.width = ((S.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100) + "%";
  }
  function checkBadges() {
    const rules = {
      first: count(S.lessons) >= 1, module: count(S.modules) >= 1,
      lab: S.lab, coins: S.coins, gdd: S.gddSaved, spark: S.idea, curator: count(S.gallery) >= 8,
      graduate: C.modules.length > 0 && C.modules.every(m => S.modules[m.slug])
    };
    for (const b of C.badges) if (rules[b.id] && !S.badges[b.id]) {
      S.badges[b.id] = true; save();
      setTimeout(() => toast(`${b.icon} ${T().badgeToast(esc(L(b.name)))}`), 700);
    }
  }
  function maybeCompleteModule(m) {
    if (S.modules[m.slug]) return;
    if (lessonsDone(m) === m.lessons.length) { S.modules[m.slug] = true; save(); addXP(50, "module"); }
  }

  /* ---------------- Shell (header, footer, theme, language) ---------------- */
  const NAV = ["home", "learn", "videos", "lab", "gallery", "studio", "games"];
  function renderShell() {
    const t = T();
    document.title = L(C?.settings?.site_name) || t.brand;
    $("#skip").textContent = t.skip;
    $("#brandText").innerHTML = I18N.lang === "ar" ? `<span>${esc(L(C?.settings?.site_name) || t.brand)}</span>` : `GAME<span>ACADEMY</span>`;
    $("#nav").innerHTML = NAV.filter(k => k !== "videos" || C?.videos?.length).map(k => `<a href="#/${k === "home" ? "" : k}" data-route="${k}">${t.nav[k]}</a>`).join("");
    const profLabel = typeof t.profile === "string" ? t.profile : t.profile.eyebrow;
    const initials = ME ? esc(ME.name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()) : "";
    $("#topRight").innerHTML = `
      <a class="player-chip" href="#/profile" title="${esc(profLabel)}"><span class="lvl"></span><span class="xpbar"><span></span></span></a>
      <button class="icon-btn lang-btn" id="langBtn" aria-label="${esc(t.langLabel)}" lang="${I18N.lang === "ar" ? "en" : "ar"}">${t.langSwitch}</button>
      <button class="icon-btn" id="themeBtn" aria-label="${esc(t.theme)}">◐</button>
      ${ME ? `<div class="user-menu"><button class="avatar-btn" id="userBtn" aria-haspopup="true" aria-expanded="false" title="${esc(ME.name)}">${initials}</button>
        <div class="menu-pop" id="userPop" hidden><div class="mp-head"><b>${esc(ME.name)}</b><small>${esc(ME.email)}</small></div>
        <a href="#/profile">👤 ${esc(profLabel)}</a><a href="#/account">⚙️ ${t.account}</a>${ME.role === "admin" ? `<a href="#/admin">🛡️ ${t.admin}</a>` : ""}<button id="logoutBtn">↪ ${t.logout}</button></div></div>`
        : `<a class="btn small ghost-line" href="#/login">${t.login}</a><a class="btn small primary hide-sm" href="#/register">${t.register}</a>`}
      <button class="icon-btn menu-btn" id="menuBtn" aria-label="${esc(t.menu)}" aria-expanded="false">☰</button>`;
    const ann = L(C?.settings?.announcement);
    $("#announce").hidden = !ann; $("#announce").textContent = ann || "";
    $("#footerText").innerHTML = `<strong>${esc(L(C?.settings?.site_name) || t.brand)}</strong> — ${esc(t.footer)}`;
    $("#lbClose").setAttribute("aria-label", t.gallery.close);
    $("#lightbox").setAttribute("aria-label", t.gallery.viewer);
    $("#lbWhat").textContent = t.gallery.what;
    updateChip();
    $("#themeBtn").onclick = () => { S.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; save(); applyTheme(); };
    $("#langBtn").onclick = () => switchLang(I18N.lang === "ar" ? "en" : "ar");
    $("#menuBtn").onclick = () => { const open = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", open); };
    if (ME) {
      const pop = $("#userPop"), btn = $("#userBtn");
      btn.onclick = (e) => { e.stopPropagation(); pop.hidden = !pop.hidden; btn.setAttribute("aria-expanded", !pop.hidden); };
      $("#logoutBtn").onclick = async () => { await api("/api/auth/logout", { method: "POST", body: {} }).catch(() => {}); adopt(null); renderShell(); toast(T().auth.bye); location.hash = "#/"; };
    }
  }
  document.addEventListener("click", () => { const p = $("#userPop"); if (p && !p.hidden) { p.hidden = true; $("#userBtn")?.setAttribute("aria-expanded", "false"); } });
  function applyTheme() { document.documentElement.dataset.theme = S.theme || "dark"; } // cinematic dark is the default; the toggle still switches to light
  function switchLang(l) {
    I18N.set(l);
    if (ME) api("/api/me", { method: "PUT", body: { lang: l } }).then(r => { ME = r.user; }).catch(() => {});
    renderShell(); render(true);
  }

  /* ---------------- Lightbox ---------------- */
  function openLightbox(src, ttl, tags, notes) {
    $("#lbImg").src = src; $("#lbImg").alt = ttl || "";
    $("#lbTitle").textContent = ttl || "";
    $("#lbTags").innerHTML = (tags || []).map(x => `<span class="tag">${esc(x)}</span>`).join("");
    $("#lbNotes").innerHTML = (notes && notes.length ? notes : [T().gallery.defNote]).map(n => `<li>${esc(n)}</li>`).join("");
    $("#lightbox").hidden = false; $("#lbClose").focus(); document.body.style.overflow = "hidden";
  }
  const closeLightbox = () => { $("#lightbox").hidden = true; document.body.style.overflow = ""; };
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#lightbox").hidden) closeLightbox(); });
  const tagLabel = (tg) => I18N.lang === "ar" ? (C.tags[tg] || tg) : tg;
  function zoom(src) {
    const g = C.gallery.find(x => x.src === src);
    openLightbox(src, g ? L(g.title) : "", g ? [...(g.genres || []).map(genreOf).filter(Boolean).map(x => `${x.icon} ${L(x.name)}`), ...g.tags.map(tagLabel)] : [], g ? L(g.notes) : null);
    if (g && !S.gallery[g.id]) { S.gallery[g.id] = true; save(); addXP(3, "gallery"); }
  }
  const bindZoom = (el) => $$("[data-zoom]", el).forEach(b => b.addEventListener("click", () => zoom(b.dataset.zoom)));

  /* ---------------- Video player ---------------- */
  /** Thumbnail markup for a video card: custom poster, else the YouTube still, else the file's first frames, else a plain play tile. */
  function videoThumb(v) {
    if (v.poster) return `<img src="${esc(v.poster)}" alt="" loading="lazy">`;
    if (v.kind === "youtube") return `<img src="https://i.ytimg.com/vi/${esc(v.src)}/hqdefault.jpg" alt="" loading="lazy">`;
    if (v.kind === "file") return `<video src="${esc(v.src)}#t=1" preload="metadata" muted playsinline tabindex="-1" aria-hidden="true"></video>`;
    return `<span class="vt-blank" aria-hidden="true">▶</span>`;
  }
  /** The actual player: an embedded YouTube/Vimeo frame or a native <video>. */
  function videoPlayer(v, autoplay = true) {
    const ap = autoplay ? 1 : 0;
    if (v.kind === "youtube") return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.src)}?rel=0&autoplay=${ap}" title="${esc(L(v.title))}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    if (v.kind === "vimeo") return `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(v.src)}?autoplay=${ap}" title="${esc(L(v.title))}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    return `<video src="${esc(v.src)}" controls playsinline preload="metadata" ${autoplay ? "autoplay" : ""} ${v.poster ? `poster="${esc(v.poster)}"` : ""}></video>`;
  }
  function openVideo(v, { track = true } = {}) {
    const t = T().videos, mod = C.modules.find(m => m.id === v.module_id);
    const wrap = document.createElement("div");
    wrap.className = "vmodal"; wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true"); wrap.setAttribute("aria-label", L(v.title));
    wrap.innerHTML = `<div class="vm-box"><button class="icon-btn vm-x" aria-label="${esc(t.close)}">✕</button>
      <div class="vm-player">${videoPlayer(v)}</div>
      <div class="vm-info">${mod ? `<span class="eyebrow" style="color:${mod.color}">${t.module} ${esc(mod.num)} · ${esc(L(mod.title))}</span>` : ""}<h2>${esc(L(v.title))}</h2>${L(v.desc) ? `<p>${esc(L(v.desc)).replace(/\n/g, "<br>")}</p>` : ""}</div></div>`;
    document.body.appendChild(wrap); document.body.style.overflow = "hidden";
    const close = () => { wrap.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    $(".vm-x", wrap).onclick = close; wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
    $(".vm-x", wrap).focus();
    if (track && v.id && !S.videos[v.id]) { S.videos[v.id] = true; save(); addXP(5, "video"); $$(`[data-video="${v.id}"]`).forEach(c => c.classList.add("seen")); }
  }
  const videoCard = (v, i = 0) => `<button class="card vcard rv ${S.videos[v.id] ? "seen" : ""}" data-video="${v.id}" style="--i:${i % 3}">
      <span class="vc-thumb">${videoThumb(v)}<span class="vc-play" aria-hidden="true">▶</span>${v.duration ? `<span class="vc-dur" dir="ltr">${esc(v.duration)}</span>` : ""}<span class="vc-seen">${T().videos.watched}</span></span>
      <span class="vc-body"><b>${esc(L(v.title))}</b>${L(v.desc) ? `<small>${esc(L(v.desc))}</small>` : ""}</span></button>`;
  const bindVideos = (el) => $$("[data-video]", el).forEach(b => b.addEventListener("click", () => { const v = C.videos.find(x => x.id === +b.dataset.video); if (v) openVideo(v); }));

  /* ---------------- Views: videos ---------------- */
  let vidMod = "all";
  function viewVideos(el) {
    const t = T().videos, V = C.videos || [];
    const groups = [...C.modules.map(m => ({ m, list: V.filter(v => v.module_id === m.id) })), { m: null, list: V.filter(v => !C.modules.some(m => m.id === v.module_id)) }].filter(g => g.list.length);
    const key = (g) => g.m ? String(g.m.id) : "general";
    if (vidMod !== "all" && !groups.some(g => key(g) === vidMod)) vidMod = "all";
    const shown = groups.filter(g => vidMod === "all" || key(g) === vidMod);
    el.innerHTML = `
      ${head("videos", t.eyebrow, t.h, t.p(V.filter(v => S.videos[v.id]).length, V.length))}
      ${groups.length > 1 ? `<div class="toolbar"><div class="seg"><button class="${vidMod === "all" ? "on" : ""}" data-vm="all">${t.all}</button>${groups.map(g => `<button class="${vidMod === key(g) ? "on" : ""}" data-vm="${key(g)}">${g.m ? `${g.m.icon} ${esc(g.m.num)}` : t.general}</button>`).join("")}</div></div>` : ""}
      ${V.length ? shown.map(g => `<section class="vgroup" ${g.m ? `style="--mc:${g.m.color}"` : ""}>
          <div class="section-title rv"><h2>${g.m ? `<a href="#/learn/${g.m.slug}">${g.m.icon} ${esc(L(g.m.title))}</a>` : t.general}</h2><span class="muted">${g.list.filter(v => S.videos[v.id]).length}/${g.list.length}</span></div>
          <div class="vgrid">${g.list.map(videoCard).join("")}</div></section>`).join("")
        : `<div class="card empty-note rv"><span aria-hidden="true">🎬</span><p>${t.empty}</p></div>`}`;
    $$("[data-vm]", el).forEach(b => b.addEventListener("click", () => { vidMod = b.dataset.vm; viewVideos(el); }));
    bindVideos(el);
  }

  /* ---------------- Views: home ---------------- */
  function viewHome(el) {
    const t = T().home, nextMod = C.modules.find(m => !S.modules[m.slug]) || C.modules[0];
    const intro = !viewHome.played && !reduced; viewHome.played = true;
    const quests = [[t.q[0], count(S.lessons) >= 1, 20, nextMod ? "#/learn/" + nextMod.slug : "#/learn"], [t.q[1], S.lab, 25, "#/lab"], [t.q[3], S.idea, 10, "#/studio"], [t.q[4], S.gddSaved, 40, "#/studio"]];
    const reel = (C.settings.hero_images || []).filter(Boolean);
    const words = t.t;
    const shots = HERO_SHOTS.map(([f, pos]) => { const src = IMG(f), g = C.gallery.find(x => x.src === src); return { src, pos, title: g ? L(g.title) : "" }; });
    el.innerHTML = `
      <section class="kino ${intro ? "intro" : ""}" aria-label="${esc(T().brand)}">
        <div class="kino-bg" aria-hidden="true">${shots.map((x, i) => `<img src="${x.src}" alt="" class="${i ? "" : "on"}">`).join("")}</div>
        <div class="kino-panels" id="cineScene">
          ${shots.map((x, i) => `<button class="kp ${i ? "" : "on"}" style="--i:${i}" data-shot="${x.src}" aria-pressed="${!i}" aria-label="${esc(x.title)}"><img class="L" data-depth="${(.1 + i * .03).toFixed(2)}" src="${x.src}" alt="" style="object-position:${x.pos}"></button>`).join("")}
        </div>
        <div class="kino-grade" aria-hidden="true"></div>
        <div class="letterbox top"></div><div class="letterbox bottom"></div>
        <div class="kino-copy">
          <span class="slate"><i></i>${t.press}</span>
          <h1 class="kino-title"><span class="w" style="--i:0">${words[0]}</span> <span class="w hl" style="--i:1">${words[1]}</span> <span class="w" style="--i:2">${words[2]}</span> <span class="w hl2" style="--i:3">${words[3]}</span> <span class="w" style="--i:4">${words[4]}</span></h1>
          <p class="lead">${t.lead}</p>
          <div class="hero-ctas">
            ${nextMod ? `<a class="btn primary glow" href="#/learn/${nextMod.slug}">${count(S.lessons) ? t.cont : t.start} ${FWD()} ${esc(L(nextMod.title).split(/[:：]/)[0])}</a>` : ""}
            <a class="btn ghost" href="#/lab">${t.labCta}</a>
          </div>
          <div class="kino-stats">
            <div><strong data-count="${C.modules.length}">0</strong>${t.stats[0]}</div>
            <div><strong data-count="${C.modules.reduce((a, m) => a + m.lessons.length, 0)}">0</strong>${t.stats[1]}</div>
            <div><strong data-count="${C.gallery.length}">0</strong>${t.stats[3]}</div>
          </div>
        </div>
        <div class="kino-hud" aria-hidden="true"><span><b id="kinoNow">01</b> / ${String(shots.length).padStart(2, "0")}</span><span class="kino-bar"><i></i></span></div>
      </section>

      ${reel.length ? `<section class="reel rv" aria-label="${esc(t.reel)}">
        <div class="reel-head"><span class="eyebrow">${t.reel}</span><h2>${t.reelH}</h2></div>
        <div class="reel-stage" id="reel">${reel.map((src, i) => `<figure class="reel-slide ${i === 0 ? "on" : ""}" data-zoom="${esc(src)}"><img src="${esc(src)}" alt="" ${i ? 'loading="lazy"' : ""}><img class="reel-bg" src="${esc(src)}" alt="" aria-hidden="true"></figure>`).join("")}
          <div class="reel-dots">${reel.map((_, i) => `<button class="${i === 0 ? "on" : ""}" data-slide="${i}" aria-label="${i + 1}"></button>`).join("")}</div>
          <div class="reel-bar"><span></span></div>
        </div>
      </section>` : ""}

      <div class="section-title rv" id="quests"><h2>${t.quests}</h2><a href="#/profile">${t.viewProfile}</a></div>
      <div class="card quest-panel rv">
        <div>
          <h3>${t.learnLike}</h3>
          <p class="muted">${t.learnLikeP}</p>
          <div class="big-xp"><span style="width:${(S.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100}%"></span></div>
          <small class="muted">${t.toNext(S.xp % XP_PER_LEVEL, XP_PER_LEVEL, level() + 1)}</small>
        </div>
        <ul class="quest-list">
          ${quests.map(([q, done, xp, href]) => `<li class="${done ? "done" : ""}"><span class="chk">${done ? "✓" : ""}</span><span class="t"><a href="${href}">${q}</a></span><span class="xp">+${xp} XP</span></li>`).join("")}
        </ul>
      </div>

      <div class="section-title rv"><h2>${t.everything}</h2></div>
      <div class="feature-grid">
        ${[["learn", 0], ["lab", 1], ["gallery", 3], ["studio", 4], ["games", 5]].map(([k, f], i) =>
          `<a class="card feature tilt rv" style="--i:${i % 3}" href="#/${k}"><div class="f-art">${fit(PIC[k])}</div><div class="f-body"><h3>${t.features[f][0]}</h3><p>${t.features[f][1]}</p></div></a>`).join("")}
      </div>

      <div class="section-title rv"><h2>${t.sellH}</h2></div>
      <div class="split rv">
        <div>
          <p class="big-p">${t.sellP}</p>
          <ul class="takeaways">${t.sellL.map(([a, b]) => `<li><strong>${a}</strong> ${b}</li>`).join("")}</ul>
        </div>
        <button class="g-item" data-zoom="${PIC.sellers}"><img src="${PIC.sellers}" alt="" loading="lazy"></button>
      </div>

      ${!ME && C.settings.registration_open ? `<section class="join-band rv"><div><h2>${t.joinH}</h2><p>${t.joinP}</p></div><a class="btn primary glow" href="#/register">${t.joinCta}</a></section>` : ""}`;
    bindZoom(el);
    countUp(el); startReel(el); startKino(el);
  }
  let kinoTimer = 0;
  function startKino(el) {
    clearInterval(kinoTimer);
    const root = $(".kino", el); if (!root) return;
    const ps = $$(".kp", root), bgs = $$(".kino-bg img", root), bar = $(".kino-bar i", root); let i = 0, hold = false;
    const go = (n) => {
      i = (n + ps.length) % ps.length;
      ps.forEach((p, k) => { p.classList.toggle("on", k === i); p.setAttribute("aria-pressed", k === i); });
      bgs.forEach((b, k) => b.classList.toggle("on", k === i));
      $("#kinoNow", root).textContent = String(i + 1).padStart(2, "0");
      bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = reduced ? "none" : "";
    };
    const restart = () => { clearInterval(kinoTimer); if (reduced || ps.length < 2) return; kinoTimer = setInterval(() => { if (!root.isConnected) { clearInterval(kinoTimer); return; } if (!document.hidden && !hold) go(i + 1); }, 6000); };
    ps.forEach((p, k) => p.addEventListener("click", () => { if (k === i) zoom(p.dataset.shot); else { go(k); restart(); } }));
    const panels = $(".kino-panels", root);
    panels.addEventListener("pointerenter", () => { hold = true; root.classList.add("hold"); });
    panels.addEventListener("pointerleave", () => { hold = false; root.classList.remove("hold"); go(i); restart(); });
    if (reduced) bar.style.animation = "none";
    restart();
  }
  let reelTimer = 0;
  function startReel(el) {
    clearInterval(reelTimer);
    const stage = $("#reel", el); if (!stage) return;
    const slides = $$(".reel-slide", stage), dots = $$(".reel-dots button", stage); let i = 0;
    const go = (n) => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("on", k === i)); dots.forEach((d, k) => d.classList.toggle("on", k === i)); const bar = $(".reel-bar span", stage); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; };
    dots.forEach((d, k) => d.addEventListener("click", (e) => { e.stopPropagation(); go(k); restart(); }));
    const restart = () => { clearInterval(reelTimer); if (!reduced && slides.length > 1) reelTimer = setInterval(() => { if (!document.hidden && $("#reel")) go(i + 1); else if (!$("#reel")) clearInterval(reelTimer); }, 5200); };
    restart();
  }

  /* ---------------- Views: learn & module — played as an adventure (quest.js) ---------------- */
  const questCtx = () => ({ S, C, save, toast, addXP, T, L, esc, head, fit, castImg, videoCard, bindVideos, bindZoom, maybeCompleteModule, checkBadges, lang: I18N.lang });
  function viewLearn(el) { window.GAQuest.map(el, questCtx()); }
  function viewModule(el, slug) { window.GAQuest.stage(el, slug, questCtx()); }

  /* ---------------- Views: lab ---------------- */
  function viewLab(el, genre) {
    Lab.mount(el, {
      genre,
      onPlay: () => { if (!S.lab) { S.lab = true; save(); addXP(25, "lab"); } },
      onAllCoins: () => { if (!S.coins) { S.coins = true; save(); addXP(50, "coins"); } },
      onGoal: () => {},
      toast: (x) => toast(esc(x))
    });
    Lab.start();
  }

  /* ---------------- Views: gallery ---------------- */
  let galTag = "All", galGenre = "all";
  const genreOf = (id) => (C.genres || []).find(x => x.id === id);
  /* Interlocking jigsaw cut lines drawn over an image (cols × rows pieces). Tabs flip in a fixed pattern so it's stable between renders. */
  function jigsawCuts(cols, rows) {
    const S0 = 100, W = cols * S0, Hh = rows * S0;
    const K = [[.34, 0], [.40, 0, .42, -.04, .39, -.10], [.34, -.20, .40, -.28, .50, -.28], [.60, -.28, .66, -.20, .61, -.10], [.58, -.04, .60, 0, .66, 0], [1, 0]];
    const edge = (x0, y0, x1, y1, s) => {
      const dx = x1 - x0, dy = y1 - y0, nx = -dy * s, ny = dx * s;
      const P = (u, v) => `${(x0 + u * dx + v * nx).toFixed(1)} ${(y0 + u * dy + v * ny).toFixed(1)}`;
      return `M${P(0, 0)}L${P(K[0][0], 0)}` + K.slice(1, 5).map(k => `C${P(k[0], k[1])} ${P(k[2], k[3])} ${P(k[4], k[5])}`).join("") + `L${P(1, 0)}`;
    };
    const sign = (a, b) => ((a * 7 + b * 13) % 3 === 0 ? -1 : 1) * ((a + b) % 2 ? 1 : -1);
    let d = "";
    for (let c = 1; c < cols; c++) for (let r = 0; r < rows; r++) d += edge(c * S0, r * S0, c * S0, (r + 1) * S0, sign(c, r));
    for (let r = 1; r < rows; r++) for (let c = 0; c < cols; c++) d += edge(c * S0, r * S0, (c + 1) * S0, r * S0, sign(r + 5, c));
    return `<svg class="jz-cuts" viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" class="jz-sh"/><path d="${d}" class="jz-ln"/><rect x="0" y="0" width="${W}" height="${Hh}" class="jz-ln" fill="none"/></svg>`;
  }
  function viewGallery(el) {
    const t = T().gallery, genres = C.genres || [], gcount = (id) => C.gallery.filter(g => (g.genres || []).includes(id)).length;
    const inGenre = (g) => galGenre === "all" || (g.genres || []).includes(galGenre);
    const tags = ["All", ...new Set(C.gallery.filter(inGenre).flatMap(g => g.tags))];
    if (!tags.includes(galTag)) galTag = "All";
    const items = C.gallery.filter(g => inGenre(g) && (galTag === "All" || g.tags.includes(galTag)));
    el.innerHTML = `
      ${head("gallery", t.eyebrow, t.h, t.p(C.gallery.filter(g => S.gallery[g.id]).length, C.gallery.length))}
      <section class="genres" aria-labelledby="genresH">
        <div class="genres-head"><h2 id="genresH">${t.genresH}</h2><p class="muted">${t.genresP}</p></div>
        <div class="genre-grid">
          <button class="genre-card ${galGenre === "all" ? "on" : ""}" data-genre="all" aria-pressed="${galGenre === "all"}"><span class="gi">🎮</span><span class="gn">${t.allTypes}</span><span class="gc">${t.count(C.gallery.length)}</span></button>
          ${genres.map(x => { const n = gcount(x.id); return `<button class="genre-card ${galGenre === x.id ? "on" : ""} ${n ? "" : "soon"}" data-genre="${esc(x.id)}" aria-pressed="${galGenre === x.id}" ${n ? "" : "disabled"} title="${esc(L(x.desc))}"><span class="gi">${x.icon}</span><span class="gn">${esc(L(x.name))}</span><span class="gd">${esc(L(x.desc))}</span><span class="gc">${n ? t.count(n) : t.soon}</span></button>`; }).join("")}
        </div>
      </section>
      <div class="gal-results" id="galResults">
        <h2>${galGenre === "all" ? `🎮 ${t.allTypes}` : `${genreOf(galGenre)?.icon || ""} ${I18N.lang === "ar" ? "صور" : ""} ${esc(L(genreOf(galGenre)?.name || ""))}${I18N.lang === "ar" ? "" : " — images"}`} <span class="muted">(${items.length})</span></h2>
        ${galGenre === "all" ? "" : `<button class="btn ghost sm" data-genre="all">${I18N.lang === "ar" ? "عرض كل الأنواع" : "Show all types"}</button>`}
      </div>
      <div class="toolbar"><span class="toolbar-label">${t.styleH}</span><div class="seg">${tags.map(x => `<button class="${x === galTag ? "on" : ""}" data-tag="${esc(x)}">${x === "All" ? t.all : esc(tagLabel(x))}</button>`).join("")}</div></div>
      ${items.length ? "" : `<p class="muted gallery-empty">${t.empty}</p>`}
      <div class="masonry">
        ${items.map(g => `
          <button class="g-item rv" data-src="${esc(g.src)}">
            ${(g.genres || []).includes("jigsaw")
              ? `<span class="jz"><img src="${esc(g.src)}" alt="${esc(L(g.title))}" loading="lazy">${jigsawCuts(4, 6)}<span class="jz-badge">🧩 ${I18N.lang === "ar" ? "24 قطعة" : "24 pieces"}</span></span>`
              : `<img src="${esc(g.src)}" alt="${esc(L(g.title))}" loading="lazy">`}
            ${S.gallery[g.id] ? `<span class="studied">${t.studied}</span>` : ""}
            <div class="cap"><strong>${esc(L(g.title))}</strong><div class="tags">${(g.genres || []).map(genreOf).filter(Boolean).map(x => `<span class="tag genre-tag">${x.icon} ${esc(L(x.name))}</span>`).join("")}${g.tags.map(x => `<span class="tag">${esc(tagLabel(x))}</span>`).join("")}</div></div>
          </button>`).join("")}
      </div>`;
    $$("[data-genre]", el).forEach(b => b.addEventListener("click", () => { galGenre = b.dataset.genre; viewGallery(el); motion(el); const r = $("#galResults", el); if (r) r.scrollIntoView({ behavior: "smooth", block: "start" }); }));
    $$("[data-tag]", el).forEach(b => b.addEventListener("click", () => { galTag = b.dataset.tag; viewGallery(el); motion(el); }));
    $$("[data-src]", el).forEach(b => b.addEventListener("click", () => { zoom(b.dataset.src); if (!$(".studied", b)) b.insertAdjacentHTML("beforeend", `<span class="studied">${t.studied}</span>`); }));
  }

  /* ---------------- Views: studio (drag & drop builder lives in studio.js) ---------------- */
  const studioCtx = { currentIdea: null };
  function viewStudio(el) {
    Object.assign(studioCtx, { S, save, toast, addXP, T, C, L, esc, head, castImg, fit, api, FWD, ART_REF, ART_KEYS, lang: I18N.lang, loggedIn: !!ME });
    window.GAStudio(el, studioCtx);
  }

  /* ---------------- Views: games showcase (breakdowns of famous games; data in games.js) ---------------- */
  let gameGenre = "all";
  function viewGames(el, id) {
    const t = T().games, G = window.GAMES || [];
    const game = id && G.find(g => g.id === id);
    if (game) return viewGame(el, game, G, t);
    const keys = [...new Set(G.map(g => g.genreKey))];
    if (gameGenre !== "all" && !keys.includes(gameGenre)) gameGenre = "all";
    const list = G.filter(g => gameGenre === "all" || g.genreKey === gameGenre);
    el.innerHTML = `
      ${head("games", t.eyebrow, t.h, t.p)}
      <div class="toolbar"><div class="seg">
        <button class="${gameGenre === "all" ? "on" : ""}" data-gg="all">🎮 ${t.all}</button>
        ${keys.map(k => { const x = genreOf(k); return `<button class="${gameGenre === k ? "on" : ""}" data-gg="${esc(k)}">${x ? x.icon + " " + esc(L(x.name)) : esc(k)}</button>`; }).join("")}
      </div></div>
      <div class="game-grid">
        ${list.map((g, i) => `<a class="card game-card rv" style="--i:${i % 3};--gc:${g.color}" href="#/games/${g.id}">
          <div class="gc-art">${fit(IMG(g.img))}</div>
          <div class="gc-body">
            <span class="tag genre-tag">${esc(L(g.genre))}</span>
            <h3>${esc(L(g.title))}</h3>
            <p class="gc-pitch">${esc(L(g.pitch))}</p>
            <div class="gc-loop">${L(g.loop).map(x => `<span>${esc(x)}</span>`).join(`<i aria-hidden="true">${FWD()}</i>`)}</div>
            <small class="muted">${g.year} · <bdi>${esc(L(g.studio))}</bdi></small>
            <span class="gc-open">${t.open}</span>
          </div></a>`).join("")}
      </div>
      <p class="muted art-note">${t.artNote}</p>`;
    $$("[data-gg]", el).forEach(b => b.addEventListener("click", () => { gameGenre = b.dataset.gg; viewGames(el); }));
  }
  function viewGame(el, g, G, t) {
    const i = G.indexOf(g), prev = G[(i - 1 + G.length) % G.length], next = G[(i + 1) % G.length];
    const loop = L(g.loop), flow = L(g.flow), BACK = I18N.lang === "ar" ? "→" : "←";
    el.innerHTML = `
      <article class="game-page" style="--gc:${g.color}">
        <header class="page-head has-bg">${fit(IMG(g.img), "", "ph-art")}<div class="ph-in">
          <a class="eyebrow back-link" href="#/games">${t.back}</a>
          <h1>${esc(L(g.title))}</h1><p>${esc(L(g.pitch))}</p>
        </div></header>
        <div class="game-cols">
          <aside class="card game-facts rv">
            <h2>${t.facts}</h2>
            <dl>
              <dt>${t.genre}</dt><dd>${esc(L(g.genre))}</dd>
              <dt>${t.year}</dt><dd>${g.year}</dd>
              <dt>${t.studio}</dt><dd><bdi>${esc(L(g.studio))}</bdi></dd>
              <dt>${t.platforms}</dt><dd>${esc(L(g.platforms))}</dd>
              <dt>${t.audience}</dt><dd>${esc(L(g.audience))}</dd>
            </dl>
            <button class="btn primary" id="useTpl">${t.useTpl}</button>
            <small class="muted art-note">${t.artNote}</small>
          </aside>
          <div class="game-main">
            <section class="card gsec rv"><h2><span class="gs-n">01</span>${t.scenario}</h2><p class="big-p">${esc(L(g.scenario))}</p></section>
            <section class="card gsec rv"><h2><span class="gs-n">02</span>${t.loop}</h2>
              <div class="loop-ring" role="list">${loop.map((x, k) => `<span class="lr-step" role="listitem"><b>${k + 1}</b>${esc(x)}</span>`).join(`<span class="lr-arrow" aria-hidden="true">${FWD()}</span>`)}<span class="lr-arrow lr-back" aria-hidden="true">↺</span></div>
            </section>
            <section class="card gsec rv"><h2><span class="gs-n">03</span>${esc(L(g.flowH))}</h2>
              <ol class="flow-map">${flow.map(([h, d]) => `<li><span class="fm-dot" aria-hidden="true"></span><div><strong>${esc(h)}</strong><p>${esc(d)}</p></div></li>`).join("")}</ol>
            </section>
            <section class="card gsec rv"><h2><span class="gs-n">04</span>${t.mechanics}</h2>
              <ul class="takeaways">${L(g.mechanics).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
            </section>
            <section class="card gsec gsec-lessons rv"><h2><span class="gs-n">05</span>${t.lessons}</h2>
              <ol class="lesson-list">${L(g.lessons).map(x => `<li>${esc(x)}</li>`).join("")}</ol>
            </section>
          </div>
        </div>
        <nav class="game-pn" aria-label="${esc(t.prev)} / ${esc(t.next)}">
          <a class="btn ghost-line" href="#/games/${prev.id}" title="${esc(t.prev)}">${BACK} ${esc(L(prev.title))}</a>
          <a class="btn ghost-line" href="#/games/${next.id}" title="${esc(t.next)}">${esc(L(next.title))} ${FWD()}</a>
        </nav>
      </article>`;
    $("#useTpl", el).addEventListener("click", () => {
      const d = S.gdd, gen = genreOf(g.genreKey);
      d.genreId = g.genreKey; d.genre = gen ? L(gen.name) : L(g.genre);
      (g.verbs || []).slice(0, 3).forEach((v, k) => { d["loop" + (k + 1)] = v; });
      if (!d.audience) d.audience = L(g.audience);
      save();
      toast(t.tplDone); location.hash = "#/studio";
    });
  }

  /* ---------------- Views: profile ---------------- */
  function viewProfile(el) {
    const t = T().profile, gems = Object.values(S.gems || {}).reduce((a, v) => a + (Array.isArray(v) ? v.length : 0), 0);
    el.innerHTML = `
      ${head("profile", t.eyebrow, ME ? esc(ME.name) : t.h)}
      ${ME ? "" : `<div class="card guest-note rv"><div><h3>${t.guestH}</h3><p class="muted">${t.guestP}</p></div><a class="btn primary" href="#/register">${T().register}</a></div>`}
      <div class="card profile-top rv">
        <div class="avatar" aria-hidden="true">${castImg(C.cast.find(c => c.id === "nova") || C.cast[0])}</div>
        <div>
          <div class="big-level">${esc(t.level(level(), title()))}</div>
          <div class="big-xp"><span style="width:${(S.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100}%"></span></div>
          <small class="muted">${t.xpLine(S.xp, XP_PER_LEVEL - (S.xp % XP_PER_LEVEL))}</small>
        </div>
      </div>
      <div class="stats-row">
        ${[[count(S.lessons), t.stats[0]], [`${count(S.modules)}/${C.modules.length}`, t.stats[1]], [`💎 ${gems}`, t.stats[2]], [count(S.gallery), t.stats[4]]].map(([n, l], i) => `<div class="card stat rv" style="--i:${i}"><strong>${n}</strong><span>${l}</span></div>`).join("")}
      </div>
      <div class="profile-cols">
        <div>
          <div class="section-title"><h2>${t.badges}</h2><span class="muted">${t.unlocked(count(S.badges), C.badges.length)}</span></div>
          <div class="badge-grid">${C.badges.map((b, i) => `<div class="card badge rv ${S.badges[b.id] ? "earned" : ""}" style="--i:${i % 4}"><div class="b-ico">${b.icon}</div><h4>${esc(L(b.name))}</h4><p>${esc(L(b.desc))}</p></div>`).join("")}</div>
        </div>
        <div>
          <div class="section-title"><h2>${t.leaderboard}</h2></div>
          <ol class="card leaderboard" id="leaders"><li class="muted">…</li></ol>
        </div>
      </div>
      <div class="section-title"><h2>${t.modules}</h2></div>
      <div class="card mod-progress">
        ${C.modules.map(m => `<div class="mp-row" style="--mc:${m.color}"><a href="#/learn/${m.slug}">${m.icon} ${esc(L(m.title))}</a><div class="progress"><span style="width:${modPct(m)}%"></span></div><small class="muted">${modPct(m)}%</small></div>`).join("")}
      </div>
      <p class="mt-lg"><button class="btn small" id="resetAll">${t.reset}</button></p>`;
    api("/api/leaderboard").then(r => {
      $("#leaders", el).innerHTML = r.top.length ? r.top.map((u, i) => `<li class="${ME && u.id === ME.id ? "me" : ""}"><span class="rank">${["🥇", "🥈", "🥉"][i] || i + 1}</span><bdi>${esc(u.name)}</bdi>${ME && u.id === ME.id ? ` <small>(${t.you})</small>` : ""}<b>${u.xp} XP</b></li>`).join("") : `<li class="muted">${t.noLeaders}</li>`;
    }).catch(() => { $("#leaders", el).innerHTML = `<li class="muted">${T().err.network}</li>`; });
    let arm = false;
    $("#resetAll", el).addEventListener("click", (e) => {
      if (!arm) { arm = true; e.target.textContent = t.resetConfirm; setTimeout(() => { arm = false; e.target.textContent = t.reset; }, 3000); return; }
      const theme = S.theme; S = fresh(); S.theme = theme; save(); updateChip(); viewProfile(el); toast(t.resetDone);
    });
  }

  /* ---------------- Views: auth & account ---------------- */
  function authForm(el, mode) {
    const t = T().auth, reg = mode === "register";
    if (ME) { location.hash = "#/profile"; return; }
    const guestHas = S.xp > 0 || count(S.lessons) > 0;
    el.innerHTML = `
      <div class="auth-wrap">
        <div class="auth-art rv">${fit(reg ? PIC.castPoster : PIC.hall)}</div>
        <form class="card auth-card" id="authForm" novalidate>
          <span class="eyebrow">${reg ? T().register : T().login}</span>
          <h1>${reg ? t.registerH : t.loginH}</h1>
          <p class="muted">${reg ? t.registerP : t.loginP}</p>
          ${reg && !C.settings.registration_open ? `<p class="form-err">${t.closed}</p>` : ""}
          ${reg ? `<div class="field"><label for="a-name">${t.name}</label><input id="a-name" name="name" autocomplete="name" required minlength="2"></div>` : ""}
          <div class="field"><label for="a-email">${t.email}</label><input id="a-email" name="email" type="email" autocomplete="email" dir="ltr" required></div>
          <div class="field"><label for="a-pass">${t.password}</label><input id="a-pass" name="password" type="password" autocomplete="${reg ? "new-password" : "current-password"}" dir="ltr" required minlength="${reg ? 8 : 1}">${reg ? `<small class="muted">${t.passHint}</small>` : ""}</div>
          ${reg && guestHas ? `<p class="note">✨ ${t.keepGuest}</p>` : ""}
          <p class="form-err" id="authErr" role="alert" hidden></p>
          <button class="btn primary block" type="submit">${reg ? t.submitRegister : t.submitLogin}</button>
          <p class="muted center">${reg ? t.haveAccount : t.noAccount} <a href="#/${reg ? "login" : "register"}">${reg ? T().login : T().register}</a></p>
        </form>
      </div>`;
    $("#authForm", el).addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = new FormData(e.target), btn = $("button[type=submit]", e.target), errEl = $("#authErr", el);
      errEl.hidden = true; btn.disabled = true;
      try {
        const body = { email: f.get("email"), password: f.get("password") };
        if (reg) Object.assign(body, { name: f.get("name"), lang: I18N.lang, state: S, xp: S.xp });
        const r = await api(reg ? "/api/auth/register" : "/api/auth/login", { method: "POST", body });
        adopt(r.user);
        if (!reg && r.user.lang !== I18N.lang) I18N.set(r.user.lang);
        try { localStorage.removeItem(GKEY); } catch (x) { /* ignore */ }
        applyTheme(); renderShell(); toast(t.welcome(esc(r.user.name)));
        location.hash = r.user.role === "admin" && !reg ? "#/admin" : "#/profile";
      } catch (err) { errEl.textContent = errText(err); errEl.hidden = false; btn.disabled = false; }
    });
  }
  function viewAccount(el) {
    if (!ME) { location.hash = "#/login"; return; }
    const t = T().accountP, a = T().auth;
    el.innerHTML = `
      ${head("account", t.eyebrow, t.h)}
      <div class="account-grid">
        <form class="card form-card rv" id="profForm">
          <h3>${t.profile}</h3>
          <div class="field"><label for="p-name">${a.name}</label><input id="p-name" name="name" value="${esc(ME.name)}" required></div>
          <div class="field"><label>${a.email}</label><input value="${esc(ME.email)}" disabled dir="ltr"></div>
          <div class="field"><label for="p-lang">${t.lang}</label><select id="p-lang" name="lang"><option value="ar" ${ME.lang === "ar" ? "selected" : ""}>العربية</option><option value="en" ${ME.lang === "en" ? "selected" : ""}>English</option></select></div>
          <p class="form-err" hidden></p><button class="btn primary">${t.save}</button>
        </form>
        <form class="card form-card rv" id="passForm" style="--i:1">
          <h3>${t.pass}</h3>
          <div class="field"><label for="p-cur">${t.current}</label><input id="p-cur" name="currentPassword" type="password" autocomplete="current-password" dir="ltr" required></div>
          <div class="field"><label for="p-new">${t.newPass}</label><input id="p-new" name="newPassword" type="password" autocomplete="new-password" dir="ltr" minlength="8" required><small class="muted">${a.passHint}</small></div>
          <p class="form-err" hidden></p><button class="btn primary">${t.changePass}</button>
        </form>
        <form class="card form-card danger rv" id="delForm" style="--i:2">
          <h3>${t.danger}</h3><p class="muted">${t.deleteP}</p>
          <div class="field"><label for="p-del">${t.delConfirm}</label><input id="p-del" name="password" type="password" autocomplete="current-password" dir="ltr" required></div>
          <p class="form-err" hidden></p><button class="btn danger-btn">${t.del}</button>
        </form>
      </div>`;
    const wire = (id, fn) => $(id, el).addEventListener("submit", async (e) => {
      e.preventDefault(); const err = $(".form-err", e.target), btn = $("button", e.target); err.hidden = true; btn.disabled = true;
      try { await fn(new FormData(e.target), e.target); } catch (x) { err.textContent = errText(x); err.hidden = false; } finally { btn.disabled = false; }
    });
    wire("#profForm", async (f) => { const r = await api("/api/me", { method: "PUT", body: { name: f.get("name"), lang: f.get("lang") } }); ME = r.user; toast(t.saved); if (r.user.lang !== I18N.lang) switchLang(r.user.lang); else renderShell(); });
    wire("#passForm", async (f, form) => { await api("/api/me", { method: "PUT", body: { currentPassword: f.get("currentPassword"), newPassword: f.get("newPassword") } }); form.reset(); toast(t.passChanged); });
    wire("#delForm", async (f) => { await api("/api/me", { method: "DELETE", body: { password: f.get("password") } }); adopt(null); renderShell(); toast(t.deleted); location.hash = "#/"; });
  }

  /* ---------------- Motion ---------------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((ents) => ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 }) : null;
  function motion(root) {
    $$(".rv:not(.in)", root).forEach(n => io && !reduced ? io.observe(n) : n.classList.add("in"));
    if (reduced || matchMedia("(hover: none)").matches) return;
    $$(".tilt", root).forEach(c => {
      if (c._tilt) return; c._tilt = true;
      c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg"); c.style.setProperty("--ry", (x * 10).toFixed(2) + "deg"); c.style.setProperty("--mx", (x + .5) * 100 + "%"); c.style.setProperty("--my", (y + .5) * 100 + "%"); });
      c.addEventListener("pointerleave", () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
    });
  }
  let mo = 0;
  new MutationObserver(() => { if (!mo) mo = requestAnimationFrame(() => { mo = 0; motion($("#main")); }); }).observe($("#main"), { childList: true, subtree: true });
  function countUp(root) {
    $$("[data-count]", root).forEach(n => { const end = +n.dataset.count; if (reduced) { n.textContent = end; return; } const t0 = performance.now() + 900, d = 1400;
      const tick = (t) => { const p = Math.max(0, Math.min(1, (t - t0) / d)); n.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  }
  let px = 0, py = 0, tx = 0, ty = 0, heroRaf = 0;
  function heroLoop() {
    heroRaf = 0;
    const scene = $("#cineScene"); if (!scene || !$("#view-home").classList.contains("active")) return;
    tx += (px - tx) * .06; ty += (py - ty) * .06;
    const sc = window.scrollY;
    $$(".L", scene).forEach(g => { const d = +g.dataset.depth; g.style.transform = `translate(${(-tx * d * 90).toFixed(1)}px, ${(-ty * d * 50 + sc * d * .4).toFixed(1)}px)`; });
    const copy = $(".kino-copy"); if (copy && innerWidth >= 760) { copy.style.transform = `translateY(${sc * .35}px)`; copy.style.opacity = Math.max(0, 1 - sc / 520); }
    if (Math.abs(px - tx) > .001 || Math.abs(py - ty) > .001) heroRaf = requestAnimationFrame(heroLoop);
  }
  const kickHero = () => { if (!heroRaf && !reduced) heroRaf = requestAnimationFrame(heroLoop); };
  window.addEventListener("pointermove", (e) => { px = e.clientX / innerWidth - .5; py = e.clientY / innerHeight - .5; kickHero(); }, { passive: true });
  window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--sp", (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)).toFixed(4));
    kickHero(); if (reduced) return;
    $$("[data-parallax]").forEach(img => { const r = img.parentElement.getBoundingClientRect(); img.style.transform = `translateY(${(r.top * -+img.dataset.parallax).toFixed(1)}px) scale(1.15)`; });
  }, { passive: true });
  (function ambient() {
    const c = $("#ambient"); if (!c || reduced) return;
    const ctx = c.getContext("2d"); let W, H; const P = [];
    const size = () => { W = c.width = innerWidth; H = c.height = innerHeight; }; size(); addEventListener("resize", size);
    for (let i = 0; i < 38; i++) P.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .6, v: Math.random() * .00025 + .00008, ph: Math.random() * 6.28, hue: [52, 170, 255, 320][i % 4] });
    let last = 0;
    const draw = (t) => {
      if (!document.hidden && t - last > 33) {
        last = t; ctx.clearRect(0, 0, W, H);
        for (const p of P) { p.y -= p.v * 16; p.ph += .02; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
          ctx.beginPath(); ctx.fillStyle = `hsla(${p.hue},100%,75%,${.25 + Math.sin(p.ph) * .25 + .25})`; ctx.shadowColor = `hsla(${p.hue},100%,70%,1)`; ctx.shadowBlur = 10; ctx.arc((p.x + Math.sin(p.ph * .5) * .01) * W, p.y * H, p.r, 0, 6.29); ctx.fill(); }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  })();

  /* ---------------- Router ---------------- */
  const ROUTES = { "": ["home", viewHome], learn: ["learn", viewLearn], lab: ["lab", viewLab], gallery: ["gallery", viewGallery], videos: ["videos", viewVideos], studio: ["studio", viewStudio], games: ["games", viewGames], toolbox: ["games", viewGames], profile: ["profile", viewProfile], login: ["login", (el) => authForm(el, "login")], register: ["register", (el) => authForm(el, "register")], account: ["account", viewAccount] };
  let firstRoute = true;
  function route() {
    const cur = $("#curtain");
    if (firstRoute || reduced) { firstRoute = false; render(); return; }
    cur.classList.remove("go"); void cur.offsetWidth; cur.classList.add("go");
    setTimeout(render, 330);
  }
  function render(keepScroll) {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    let name, fn, arg;
    if (parts[0] === "learn" && parts[1]) { name = "module"; fn = viewModule; arg = parts[1]; }
    else if (parts[0] === "lab" && parts[1]) { name = "lab"; fn = viewLab; arg = parts[1]; }
    else if (parts[0] === "games" && parts[1]) { name = "games"; fn = viewGames; arg = parts[1]; }
    else if (parts[0] === "admin") {
      name = "admin"; arg = parts.slice(1);
      fn = (el, a) => { if (!ME) { location.hash = "#/login"; return; } if (ME.role !== "admin") { el.innerHTML = `<div class="page-head"><h1>🛡️</h1><p>${T().err.admin_required}</p></div>`; return; } Admin.render(el, a); };
    } else { [name, fn] = ROUTES[parts[0]] || ROUTES[""]; }
    if (name !== "lab" && window.Lab) Lab.stop();
    if (name !== "home") { clearInterval(reelTimer); clearInterval(kinoTimer); }
    document.body.classList.toggle("is-admin", name === "admin");
    $$(".view").forEach(v => v.classList.remove("active"));
    const el = $("#view-" + name); el.classList.add("active");
    fn(el, arg);
    const navName = name === "module" ? "learn" : name;
    $$("#nav a").forEach(a => a.classList.toggle("active", a.dataset.route === navName));
    $("#nav").classList.remove("open"); $("#menuBtn")?.setAttribute("aria-expanded", "false");
    const site = L(C.settings.site_name) || T().brand;
    const label = [T().nav[navName], T()[navName], T()[navName]?.eyebrow, T().a.panel].find(x => typeof x === "string" && x);
    document.title = name === "home" ? site : `${label} · ${site}`;
    if (!keepScroll) window.scrollTo({ top: 0 });
    motion(el); kickHero();
    onboard();
  }

  /* ---------------- First visit: the player names themself and picks an avatar ---------------- */
  const ONB = {
    ar: { eb: "قبل أن تبدأ الرحلة", h: "من أنت أيها المغامر؟", p: "اكتب اسمك واختر الشخصية التي سترافقك على خريطة المغامرة. يمكنك تغييرهما لاحقًا.", name: "اسمك", ph: "مثال: سارة", pick: "اختر شخصيتك", go: "ابدأ المغامرة ←", hi: (n) => `أهلًا ${n}! رحلتك تبدأ الآن 🚀` },
    en: { eb: "Before the journey", h: "Who are you, adventurer?", p: "Type your name and choose the character who will travel the adventure map with you. You can change both later.", name: "Your name", ph: "e.g. Sara", pick: "Choose your character", go: "Begin the adventure →", hi: (n) => `Welcome, ${n}! Your journey starts now 🚀` }
  };
  function onboard() {
    if (S.player || !C.cast?.length || $("#onb") || location.hash.startsWith("#/admin")) return;
    const o = ONB[I18N.lang] || ONB.en;
    let pick = C.cast.some(c => c.id === S.avatar) ? S.avatar : null;
    const box = document.createElement("div");
    box.id = "onb"; box.className = "onb"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-labelledby", "onbH");
    box.innerHTML = `<form class="onb-card card" novalidate>
      <span class="eyebrow">${o.eb}</span><h2 id="onbH">${o.h}</h2><p class="muted">${o.p}</p>
      <label class="onb-lbl" for="onbName">${o.name}</label>
      <input id="onbName" maxlength="24" autocomplete="nickname" placeholder="${esc(o.ph)}" value="${esc(ME?.name?.split(/\s+/)[0] || "")}">
      <p class="onb-lbl">${o.pick}</p>
      <div class="onb-cast">${C.cast.map(c => `<button type="button" data-av="${esc(c.id)}" class="${c.id === pick ? "on" : ""}" aria-pressed="${c.id === pick}">${castImg(c)}<b>${esc(L(c.name))}</b><small>${esc(L(c.role) || "")}</small></button>`).join("")}</div>
      <button class="btn primary onb-go" type="submit" disabled>${o.go}</button></form>`;
    document.body.appendChild(box); document.body.classList.add("onb-open");
    const inp = $("#onbName", box), go = $(".onb-go", box);
    const sync = () => { go.disabled = !(inp.value.trim() && pick); };
    inp.addEventListener("input", sync);
    $$("[data-av]", box).forEach(b => b.addEventListener("click", () => {
      pick = b.dataset.av;
      $$("[data-av]", box).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
      sync();
    }));
    $("form", box).addEventListener("submit", (e) => {
      e.preventDefault(); if (go.disabled) return;
      S.player = inp.value.trim().slice(0, 24); S.avatar = pick; save();
      box.remove(); document.body.classList.remove("onb-open");
      toast(o.hi(esc(S.player))); render(true);
    });
    sync(); setTimeout(() => inp.focus(), 50);
  }

  /* Shared helpers for admin.js */
  window.GA = { $, $$, esc, api, toast, errText, T, L, IMG, get C() { return C; }, get ME() { return ME; }, reloadContent: async () => { C = await api("/api/content"); }, zoom: openLightbox, tagLabel, videoThumb, videoPlayer, openVideo };

  /* ---------------- Boot ---------------- */
  (async function boot() {
    try {
      const [me, content] = await Promise.all([api("/api/me"), api("/api/content")]);
      C = content; adopt(me.user);
      I18N.applyDefault(ME ? ME.lang : C.settings.default_lang);
    } catch (e) {
      $("#main").innerHTML = `<div class="boot-err"><h1>⚠️</h1><p>${T().err.network}</p><a class="btn" href="">↻</a></div>`; return;
    }
    applyTheme(); renderShell();
    window.addEventListener("hashchange", route);
    render();
    document.body.classList.add("ready");
  })();
})();
