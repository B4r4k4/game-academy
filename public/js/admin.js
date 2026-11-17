/* Game Academy — admin pages (dashboard, users, content, gallery, media, settings). Uses helpers from app.js via window.GA. */
(function () {
  const { $, $$, esc, api, toast, errText, T, L } = window.GA;
  const A = () => T().a;
  const fmtDate = (ms) => ms ? new Date(ms).toLocaleDateString(I18N.lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB", { year: "numeric", month: "short", day: "numeric" }) : A().users.never;
  const lines = (s) => String(s || "").split("\n").map(x => x.trim()).filter(Boolean);
  const run = async (btn, fn) => { if (btn) btn.disabled = true; try { return await fn(); } catch (e) { toast("⚠️ " + esc(errText(e))); throw e; } finally { if (btn) btn.disabled = false; } };
  const afterChange = () => window.GA.reloadContent().catch(() => {});

  /* ---------- Modal + media picker ---------- */
  function modal(html, { wide = false, onClose = null } = {}) {
    const wrap = document.createElement("div");
    wrap.className = "adm-modal"; wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML = `<div class="adm-modal-box ${wide ? "wide" : ""}"><button class="icon-btn adm-x" aria-label="${esc(T().gallery.close)}">✕</button>${html}</div>`;
    document.body.appendChild(wrap); document.body.style.overflow = "hidden";
    const close = () => { if (!wrap.isConnected) return; wrap.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); if (onClose) onClose(); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    $(".adm-x", wrap).onclick = close; wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
    return { el: $(".adm-modal-box", wrap), close };
  }
  function confirmBtn(btn, onConfirm) {
    let armed = false; const orig = btn.textContent;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!armed) { armed = true; btn.textContent = A().delConfirm; btn.classList.add("armed"); setTimeout(() => { armed = false; btn.textContent = orig; btn.classList.remove("armed"); }, 3000); return; }
      onConfirm();
    });
  }
  async function uploadFiles(files) {
    const out = [];
    for (const f of files) {
      const data = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f); });
      const r = await api("/api/admin/media", { method: "POST", body: { name: f.name, data } });
      out.push(r.src);
    }
    return out;
  }
  function pickMedia(current) {
    return new Promise((resolve) => {
      const m = modal(`<h2>${A().choose}</h2><div class="media-tools"><div class="seg" id="mpSeg"></div><label class="btn small primary">⬆ ${A().media.upload}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple hidden id="mpFile"></label></div><div class="media-grid picker" id="mpGrid">${A().loading}</div>`, { wide: true });
      let folder = "all", items = [];
      const draw = () => {
        $("#mpSeg", m.el).innerHTML = ["all", "images", "uploads", "assets/art"].map(k => `<button class="${folder === k ? "on" : ""}" data-f="${k}">${A().media.folders[k]}</button>`).join("");
        $$("[data-f]", m.el).forEach(b => b.onclick = () => { folder = b.dataset.f; draw(); });
        $("#mpGrid", m.el).innerHTML = items.filter(x => folder === "all" || x.folder === folder).map(x => `<button class="media-tile ${x.src === current ? "sel" : ""}" data-src="${esc(x.src)}"><img src="${esc(x.src)}" alt="" loading="lazy"><span>${esc(x.name)}</span></button>`).join("");
        $$("#mpGrid [data-src]", m.el).forEach(b => b.onclick = () => { m.close(); resolve(b.dataset.src); });
      };
      const load = () => api("/api/admin/media").then(r => { items = r.media; draw(); });
      $("#mpFile", m.el).onchange = async (e) => { const srcs = await run(null, () => uploadFiles([...e.target.files])); toast(A().media.uploaded); await load(); if (srcs[0]) { m.close(); resolve(srcs[0]); } };
      load();
    });
  }
  const imgField = (name, src, label) => `<div class="field"><label>${label}</label><div class="img-field" data-img="${name}"><img src="${esc(src || "")}" alt="" ${src ? "" : "hidden"}><input type="hidden" name="${name}" value="${esc(src || "")}"><div><button type="button" class="btn small" data-pick>${A().choose}</button> <button type="button" class="btn small" data-clear>${A().none}</button></div></div></div>`;
  function wireImgFields(root) {
    $$("[data-img]", root).forEach(box => {
      const inp = $("input", box), img = $("img", box);
      const set = (v) => { inp.value = v; img.src = v; img.hidden = !v; };
      $("[data-pick]", box).onclick = async () => set(await pickMedia(inp.value));
      $("[data-clear]", box).onclick = () => set("");
    });
  }
  /* Bilingual field pair: English (LTR) and Arabic (RTL) side by side. */
  const bi = (name, label, val = {}, { area = false, rows = 4, hint = "" } = {}) => `
    <div class="field bi-field"><label>${label}</label>${hint ? `<small class="muted">${hint}</small>` : ""}<div class="bi">
      ${["ar", "en"].map(lg => `<div class="bi-col"><span class="bi-tag">${A()[lg]}</span>${area ? `<textarea name="${name}_${lg}" dir="${lg === "ar" ? "rtl" : "ltr"}" lang="${lg}" rows="${rows}">${esc(val[lg] || "")}</textarea>` : `<input name="${name}_${lg}" dir="${lg === "ar" ? "rtl" : "ltr"}" lang="${lg}" value="${esc(val[lg] || "")}">`}</div>`).join("")}
    </div></div>`;
  const pairOf = (f, n) => ({ en: f.get(n + "_en") || "", ar: f.get(n + "_ar") || "" });
  const linesPair = (f, n) => ({ en: lines(f.get(n + "_en")), ar: lines(f.get(n + "_ar")) });

  /* ---------- Layout ---------- */
  const PAGES = [["", "dash", "📊"], ["users", "users", "👥"], ["content", "content", "📚"], ["videos", "videos", "🎬"], ["gallery", "gallery", "🖼️"], ["media", "media", "🗂️"], ["settings", "settings", "⚙️"]];
  function render(el, parts) {
    const page = parts[0] || "";
    el.innerHTML = `
      <div class="adm">
        <aside class="adm-side">
          <div class="adm-brand">🛡️ ${A().panel}</div>
          <nav>${PAGES.map(([p, k, ic]) => `<a href="#/admin${p ? "/" + p : ""}" class="${page === p ? "on" : ""}"><span>${ic}</span>${A().nav[k]}</a>`).join("")}</nav>
          <a class="adm-back" href="#/">${A().back}</a>
        </aside>
        <section class="adm-main" id="admMain"><p class="muted">${A().loading}</p></section>
      </div>`;
    const main = $("#admMain", el);
    ({ "": dash, users, content, videos, gallery, media, settings }[page] || dash)(main, parts.slice(1));
  }

  /* ---------- Dashboard ---------- */
  async function dash(el) {
    const a = A().dash, s = await api("/api/admin/stats"), tt = s.totals;
    const maxSign = Math.max(1, ...s.signups.counts), maxMod = Math.max(1, ...s.modules.map(m => m.completions));
    el.innerHTML = `
      <div class="adm-head"><h1>${a.h}</h1></div>
      <div class="kpis">
        ${[[tt.users, a.users, "👥"], [tt.newThisWeek, a.newWeek, "✨"], [tt.activeThisWeek, a.active, "⚡"], [tt.lessonsDone, a.lessonsDone, "📘"]].map(([n, l, ic], i) => `<div class="card kpi rv" style="--i:${i}"><span class="kpi-ic">${ic}</span><strong>${n}</strong><span>${l}</span></div>`).join("")}
      </div>
      <div class="adm-cols">
        <div class="card adm-panel rv"><h3>${a.signups}</h3>
          <div class="bars" role="img" aria-label="${esc(a.signups)}">${s.signups.counts.map((c, i) => `<div class="bar-col" title="${fmtDate(s.signups.days[i])}: ${c}"><span style="height:${c / maxSign * 100}%"></span><small>${new Date(s.signups.days[i]).getDate()}</small></div>`).join("")}</div>
        </div>
        <div class="card adm-panel rv" style="--i:1"><h3>${a.content}</h3>
          <ul class="adm-list">${[[tt.modules, a.modules, "#/admin/content"], [tt.lessons, a.lessons, "#/admin/content"], [tt.videos, a.videos, "#/admin/videos"], [tt.gallery, a.gallery, "#/admin/gallery"]].map(([n, l, h]) => `<li><a href="${h}"><b>${n}</b> ${l}</a></li>`).join("")}</ul>
        </div>
      </div>
      <div class="card adm-panel rv"><h3>${a.popular}</h3>
        <div class="hbars">${s.modules.map(m => `<div class="hbar"><span class="hb-l">${esc(L(m.title))}</span><div class="hb-t"><span style="width:${m.completions / maxMod * 100}%;background:${m.color}"></span></div><b>${m.completions}</b></div>`).join("")}</div>
      </div>
      <div class="adm-cols">
        <div class="card adm-panel rv"><h3>${a.recent}</h3><ul class="adm-list">${s.recent.map(u => `<li><bdi>${esc(u.name)}</bdi> <small class="muted" dir="ltr">${esc(u.email)}</small><span class="push">${fmtDate(u.created_at)}</span></li>`).join("")}</ul></div>
        <div class="card adm-panel rv" style="--i:1"><h3>${a.top}</h3><ol class="adm-list">${s.top.map(u => `<li><bdi>${esc(u.name)}</bdi><b class="push">${u.xp} XP</b></li>`).join("")}</ol></div>
      </div>`;
  }

  /* ---------- Users ---------- */
  async function users(el) {
    const u = A().users;
    el.innerHTML = `<div class="adm-head"><h1>${u.h}</h1><input class="search" type="search" id="uq" placeholder="${esc(A().search)}"></div><p class="muted" id="ucount"></p><div class="card table-wrap"><table class="adm-table" id="ut"></table></div>`;
    let q = "";
    const load = async () => {
      const r = await api("/api/admin/users?q=" + encodeURIComponent(q)), me = window.GA.ME;
      $("#ucount", el).textContent = u.count(r.users.length);
      $("#ut", el).innerHTML = `<thead><tr><th>${u.name}</th><th>${u.role}</th><th>${u.xp}</th><th>${u.lessons}</th><th>${u.joined}</th><th>${u.seen}</th><th>${u.status}</th><th>${u.actions}</th></tr></thead><tbody>
        ${r.users.map(x => `<tr data-id="${x.id}" class="${x.disabled ? "off" : ""}">
          <td><bdi><b>${esc(x.name)}</b></bdi><br><small class="muted" dir="ltr">${esc(x.email)}</small></td>
          <td><span class="pill ${x.role}">${x.role === "admin" ? u.admin : u.user}</span></td><td>${x.xp}</td><td>${x.lessons}</td>
          <td>${fmtDate(x.created_at)}</td><td>${fmtDate(x.last_seen)}</td><td><span class="pill ${x.disabled ? "off" : "on"}">${x.disabled ? u.disabled : u.active}</span></td>
          <td class="acts">${x.id === me.id ? "—" : `
            <button class="btn small" data-act="role">${x.role === "admin" ? u.makeUser : u.makeAdmin}</button>
            <button class="btn small" data-act="toggle">${x.disabled ? u.enable : u.disable}</button>
            <button class="btn small" data-act="pass">${u.setPass}</button>
            <button class="btn small" data-act="reset">${u.reset}</button>
            <button class="btn small danger-btn" data-act="del">${A().del}</button>`}</td></tr>`).join("")}</tbody>`;
      $$("tr[data-id]", el).forEach(tr => {
        const id = +tr.dataset.id, x = r.users.find(y => y.id === id), put = (body) => api(`/api/admin/users/${id}`, { method: "PUT", body });
        const b = (k) => $(`[data-act="${k}"]`, tr);
        if (!b("role")) return;
        b("role").onclick = (e) => run(e.target, () => put({ role: x.role === "admin" ? "user" : "admin" })).then(load);
        b("toggle").onclick = (e) => run(e.target, () => put({ disabled: !x.disabled })).then(load);
        confirmBtn(b("reset"), () => run(b("reset"), () => put({ resetProgress: true })).then(() => { toast(A().saved); load(); }));
        confirmBtn(b("del"), () => run(b("del"), () => api(`/api/admin/users/${id}`, { method: "DELETE", body: {} })).then(load));
        b("pass").onclick = () => {
          const m = modal(`<h2>${u.setPass}</h2><p><bdi>${esc(x.name)}</bdi></p><form id="pf"><div class="field"><label>${u.passPrompt}</label><input name="p" type="password" dir="ltr" minlength="8" required autocomplete="new-password"></div><button class="btn primary">${A().save}</button></form>`);
          $("#pf", m.el).onsubmit = (e) => { e.preventDefault(); run($("button", e.target), () => put({ newPassword: new FormData(e.target).get("p") })).then(() => { m.close(); toast(A().saved); }); };
        };
      });
    };
    let deb = 0; $("#uq", el).oninput = (e) => { q = e.target.value; clearTimeout(deb); deb = setTimeout(load, 250); };
    load();
  }

  /* ---------- Content: module list & editor ---------- */
  async function content(el, parts) {
    if (parts[0]) return moduleEditor(el, +parts[0]);
    const c = A().content, r = await api("/api/admin/modules");
    el.innerHTML = `<div class="adm-head"><h1>${c.h}</h1><button class="btn primary" id="newMod">＋ ${c.newModule}</button></div>
      <div class="mod-admin-list">${r.modules.map((m, i) => `
        <div class="card mod-row rv" style="--mc:${m.color}">
          <img src="${esc(m.cover)}" alt="">
          <div class="mr-body"><b>${m.icon} ${esc(m.num)} · ${esc(L(m.title))}</b><small class="muted">${m.lessons.length} ${T().learn.lessons}</small>${m.published ? "" : `<span class="pill off">${A().draft}</span>`}</div>
          <div class="mr-acts"><button class="icon-btn" data-mv="${i}" data-d="-1" aria-label="${A().up}" ${i === 0 ? "disabled" : ""}>▲</button><button class="icon-btn" data-mv="${i}" data-d="1" aria-label="${A().down}" ${i === r.modules.length - 1 ? "disabled" : ""}>▼</button><a class="btn small" href="#/admin/content/${m.id}">${c.open}</a></div>
        </div>`).join("")}</div>`;
    $$("[data-mv]", el).forEach(b => b.onclick = () => {
      const ids = r.modules.map(m => m.id), i = +b.dataset.mv, j = i + +b.dataset.d;[ids[i], ids[j]] = [ids[j], ids[i]];
      run(b, () => api("/api/admin/modules-order", { method: "PUT", body: { ids } })).then(() => { afterChange(); content(el, []); });
    });
    $("#newMod", el).onclick = (e) => run(e.target, () => api("/api/admin/modules", { method: "POST", body: { title: { en: "New module", ar: "وحدة جديدة" }, tagline: { en: "", ar: "" }, cover: "", published: false } }))
      .then(res => { afterChange(); location.hash = "#/admin/content/" + res.module.id; });
  }
  async function moduleEditor(el, id) {
    const c = A().content, r = await api("/api/admin/modules"), m = r.modules.find(x => x.id === id);
    if (!m) { location.hash = "#/admin/content"; return; }
    el.innerHTML = `
      <a class="back" href="#/admin/content">${I18N.lang === "ar" ? "→" : "←"} ${c.h}</a>
      <div class="adm-head"><h1>${m.icon} ${esc(L(m.title))}</h1><a class="btn small" href="#/learn/${m.slug}" target="_blank">${c.preview} ↗</a></div>
      <form class="card adm-form rv" id="modForm">
        <div class="grid-4">
          <div class="field"><label>${c.icon}</label><input name="icon" value="${esc(m.icon)}" maxlength="8"></div>
          <div class="field"><label>${c.num}</label><input name="num" value="${esc(m.num)}" maxlength="6" dir="ltr"></div>
          <div class="field"><label>${c.color}</label><input name="color" type="color" value="${esc(m.color)}"></div>
          <div class="field checks"><label><input type="checkbox" name="published" ${m.published ? "checked" : ""}> ${A().published}</label><label><input type="checkbox" name="lab" ${m.lab ? "checked" : ""}> ${c.lab}</label></div>
        </div>
        ${bi("title", c.title, m.title)}${bi("tagline", c.tagline, m.tagline)}
        ${bi("takeaways", c.takeaways, { en: m.takeaways.en.join("\n"), ar: m.takeaways.ar.join("\n") }, { area: true, rows: 4 })}
        ${imgField("cover", m.cover, c.cover)}
        <div class="form-actions"><button class="btn primary">${A().save}</button><button class="btn danger-btn" type="button" id="delMod">${c.deleteModule}</button></div>
      </form>
      <div class="section-title"><h2>${c.lessons}</h2><button class="btn small primary" id="addLesson">＋ ${c.newLesson}</button></div>
      <div id="lessons">${m.lessons.map((l, i) => lessonCard(l, i, m.lessons.length)).join("")}</div>`;
    wireImgFields(el);
    const reload = () => moduleEditor(el, id);
    $("#modForm", el).onsubmit = (e) => {
      e.preventDefault(); const f = new FormData(e.target);
      run($("button", e.target), () => api(`/api/admin/modules/${id}`, { method: "PUT", body: { icon: f.get("icon"), num: f.get("num"), color: f.get("color"), published: !!f.get("published"), lab: !!f.get("lab"), cover: f.get("cover"), title: pairOf(f, "title"), tagline: pairOf(f, "tagline"), takeaways: linesPair(f, "takeaways") } }))
        .then(() => { toast(A().saved); afterChange(); });
    };
    confirmBtn($("#delMod", el), () => run($("#delMod", el), () => api(`/api/admin/modules/${id}`, { method: "DELETE", body: {} })).then(() => { toast(c.moduleDeleted); afterChange(); location.hash = "#/admin/content"; }));
    $("#addLesson", el).onclick = (e) => run(e.target, () => api(`/api/admin/modules/${id}/lessons`, { method: "POST", body: { title: { en: "New lesson", ar: "درس جديد" }, body: { en: "<p></p>", ar: "<p></p>" } } })).then(() => { afterChange(); reload(); });
    $$(".lesson-card", el).forEach(card => {
      const lid = +card.dataset.id, form = $("form", card);
      $("summary", card).addEventListener("click", () => setTimeout(() => wireImgFields(card), 0), { once: true });
      form.onsubmit = (e) => { e.preventDefault(); const f = new FormData(form); run($("button.primary", form), () => api(`/api/admin/lessons/${lid}`, { method: "PUT", body: { title: pairOf(f, "title"), body: pairOf(f, "body"), image: f.get("image") } })).then(() => { toast(A().saved); afterChange(); $(".lc-title", card).textContent = L(pairOf(f, "title")); }); };
      confirmBtn($("[data-del]", card), () => run(null, () => api(`/api/admin/lessons/${lid}`, { method: "DELETE", body: {} })).then(() => { afterChange(); reload(); }));
      $$("[data-mv]", card).forEach(b => b.onclick = (e) => {
        e.preventDefault(); const ids = m.lessons.map(x => x.id), i = ids.indexOf(lid), j = i + +b.dataset.mv; if (j < 0 || j >= ids.length) return; [ids[i], ids[j]] = [ids[j], ids[i]];
        run(b, () => api(`/api/admin/modules/${id}/lessons-order`, { method: "PUT", body: { ids } })).then(() => { afterChange(); reload(); });
      });
      const prev = $("[data-preview]", card);
      if (prev) prev.onclick = (e) => { e.preventDefault(); const f = new FormData(form); modal(`<div class="lesson preview-lesson" dir="${I18N.lang === "ar" ? "rtl" : "ltr"}"><h2>${esc(L(pairOf(f, "title")))}</h2><div class="lesson-body">${L(pairOf(f, "body"))}</div></div>`, { wide: true }); };
    });
  }
  function lessonCard(l, i, n) {
    const c = A().content;
    return `<details class="card lesson-card" data-id="${l.id}">
      <summary><span class="lc-num">${i + 1}</span><span class="lc-title">${esc(L(l.title))}</span>${l.image ? `<img src="${esc(l.image)}" alt="">` : ""}
        <span class="lc-mv"><button class="icon-btn" data-mv="-1" aria-label="${A().up}" ${i === 0 ? "disabled" : ""}>▲</button><button class="icon-btn" data-mv="1" aria-label="${A().down}" ${i === n - 1 ? "disabled" : ""}>▼</button></span></summary>
      <form class="adm-form">
        ${bi("title", c.title, l.title)}
        ${bi("body", c.body, l.body, { area: true, rows: 10, hint: esc(c.bodyHint) })}
        ${imgField("image", l.image, c.image)}
        <div class="form-actions"><button class="btn primary">${A().save}</button><button class="btn" data-preview>${c.preview}</button><button class="btn danger-btn" data-del>${A().del}</button></div>
      </form></details>`;
  }

  /* ---------- Course videos ---------- */
  const VIDEO_TYPES = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", ogv: "video/ogg", ogg: "video/ogg", mov: "video/quicktime" };
  /** Streams one file to the server as the raw request body, reporting progress 0–100. */
  function uploadVideo(file, onProgress) {
    return new Promise((resolve, reject) => {
      const type = VIDEO_TYPES[(file.name.split(".").pop() || "").toLowerCase()] || file.type;
      const x = new XMLHttpRequest();
      x.open("POST", "/api/admin/videos/upload");
      x.setRequestHeader("Content-Type", type || "application/octet-stream");
      x.setRequestHeader("X-File-Name", encodeURIComponent(file.name));
      x.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100)); };
      const failWith = (code) => { const e = new Error(code); e.code = code; reject(e); };
      x.onload = () => { let d = {}; try { d = JSON.parse(x.responseText); } catch (e) { /* not JSON */ } x.status < 300 ? resolve(d) : failWith(d.error || (x.status === 413 ? "video_too_large" : "generic")); };
      x.onerror = () => failWith("network");
      x.send(file);
    });
  }
  let vidFilter = "all";
  async function videos(el) {
    const v = A().videos, [r, mr] = await Promise.all([api("/api/admin/videos"), api("/api/admin/modules")]);
    const mods = mr.modules, modOf = (x) => mods.find(m => m.id === x.module_id);
    const list = r.videos.filter(x => vidFilter === "all" || (vidFilter === "general" ? !modOf(x) : String(x.module_id) === vidFilter));
    el.innerHTML = `<div class="adm-head"><h1>🎬 ${v.h}</h1><button class="btn primary" id="addV">＋ ${v.add}</button></div>
      <div class="media-tools"><select id="vFilter" aria-label="${esc(v.module)}"><option value="all">${v.filter}</option>${mods.map(m => `<option value="${m.id}" ${vidFilter === String(m.id) ? "selected" : ""}>${m.icon} ${esc(m.num)} · ${esc(L(m.title))}</option>`).join("")}<option value="general" ${vidFilter === "general" ? "selected" : ""}>${v.noModule}</option></select><span class="muted">${v.count(list.length)}</span></div>
      ${r.videos.length ? `<div class="adm-videos">${list.map((x, i) => { const m = modOf(x); return `<div class="card av-item rv ${x.published ? "" : "off"}" data-id="${x.id}" style="--i:${i % 4}">
        <button class="av-thumb" data-play aria-label="${esc(v.preview)}">${window.GA.videoThumb(x)}<span class="vc-play" aria-hidden="true">▶</span>${x.duration ? `<span class="vc-dur" dir="ltr">${esc(x.duration)}</span>` : ""}</button>
        <div class="av-body"><b>${esc(L(x.title))}</b><small class="muted">${m ? `${m.icon} ${esc(m.num)} · ${esc(L(m.title))}` : v.noModule}</small>
          <div class="tags"><span class="tag">${v.tag[x.kind]}</span>${x.published ? "" : `<span class="pill off">${A().draft}</span>`}</div></div>
        <div class="ag-acts"><button class="icon-btn" data-mv="-1" aria-label="${A().up}" ${vidFilter !== "all" || i === 0 ? "disabled" : ""}>▲</button><button class="btn small" data-edit>${A().edit}</button><button class="icon-btn" data-mv="1" aria-label="${A().down}" ${vidFilter !== "all" || i === list.length - 1 ? "disabled" : ""}>▼</button></div></div>`; }).join("")}</div>`
        : `<div class="card empty-note"><span aria-hidden="true">🎬</span><p>${v.empty}</p><button class="btn primary" id="addV2">＋ ${v.add}</button></div>`}`;
    const reload = () => videos(el);
    const add = () => videoForm(null, mods, r.maxMb, reload);
    $("#addV", el).onclick = add; if ($("#addV2", el)) $("#addV2", el).onclick = add;
    $("#vFilter", el).onchange = (e) => { vidFilter = e.target.value; reload(); };
    $$(".av-item", el).forEach(card => {
      const id = +card.dataset.id, item = r.videos.find(x => x.id === id);
      $("[data-edit]", card).onclick = () => videoForm(item, mods, r.maxMb, reload);
      $("[data-play]", card).onclick = () => window.GA.openVideo(item, { track: false });
      $$("[data-mv]", card).forEach(b => b.onclick = () => { const ids = r.videos.map(x => x.id), i = ids.indexOf(id), j = i + +b.dataset.mv; if (j < 0 || j >= ids.length) return; [ids[i], ids[j]] = [ids[j], ids[i]]; run(b, () => api("/api/admin/videos-order", { method: "PUT", body: { ids } })).then(() => { afterChange(); reload(); }); });
    });
  }
  function videoForm(item, mods, maxMb, done) {
    const v = A().videos, c = A().content;
    const x = item || { kind: "file", src: "", module_id: vidFilter !== "all" && vidFilter !== "general" ? +vidFilter : null, title: { en: "", ar: "" }, desc: { en: "", ar: "" }, duration: "", poster: "", published: true };
    let mode = x.kind === "file" ? "upload" : "link", fileSrc = x.kind === "file" ? x.src : "", fresh = "", busy = false, saved = false;
    const linkVal = x.kind === "youtube" ? "https://www.youtube.com/watch?v=" + x.src : x.kind === "vimeo" ? "https://vimeo.com/" + x.src : "";
    const m = modal(`<h2>${item ? A().edit : v.add}</h2><form class="adm-form" id="vf">
      <div class="field"><label>${v.source}</label><div class="seg" id="vSeg"><button type="button" data-k="upload">${v.kinds.upload}</button><button type="button" data-k="link">${v.kinds.link}</button></div></div>
      <div data-pane="upload">
        <label class="dropzone" id="vdz"><input type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.m4v,.webm,.ogv,.mov" hidden id="vFile"><span>🎬</span><b id="vdzText">${v.drop}</b><small class="muted">${v.dropHint(maxMb)}</small><span class="up-bar" hidden><i></i></span></label>
        <div class="vf-preview" id="vPrev"></div>
      </div>
      <div data-pane="link"><div class="field"><label for="vLink">${v.link}</label><input id="vLink" name="link" dir="ltr" value="${esc(linkVal)}" placeholder="${esc(v.linkPh)}"></div></div>
      ${bi("title", c.title, x.title)}
      ${bi("desc", v.desc, x.desc, { area: true, rows: 3 })}
      <div class="grid-2">
        <div class="field"><label for="vMod">${v.module}</label><select id="vMod" name="module_id"><option value="">${v.noModule}</option>${mods.map(md => `<option value="${md.id}" ${x.module_id === md.id ? "selected" : ""}>${md.icon} ${esc(md.num)} · ${esc(L(md.title))}</option>`).join("")}</select></div>
        <div class="field"><label for="vDur">${v.duration}</label><input id="vDur" name="duration" dir="ltr" maxlength="12" value="${esc(x.duration)}" placeholder="${esc(v.durationPh)}"></div>
      </div>
      ${imgField("poster", x.poster, v.poster)}
      <label class="check"><input type="checkbox" name="published" ${x.published ? "checked" : ""}> ${A().published}</label>
      <div class="form-actions"><button class="btn primary">${A().save}</button>${item ? `<button class="btn danger-btn" type="button" id="vdel">${A().del}</button>` : ""}</div></form>`,
      { wide: true, onClose: () => { if (fresh && !saved) api("/api/admin/videos/upload", { method: "DELETE", body: { src: fresh } }).catch(() => {}); } });
    wireImgFields(m.el);
    const setMode = (k) => { mode = k; $$("#vSeg [data-k]", m.el).forEach(b => b.classList.toggle("on", b.dataset.k === k)); $$("[data-pane]", m.el).forEach(p => p.hidden = p.dataset.pane !== k); };
    $$("#vSeg [data-k]", m.el).forEach(b => b.onclick = () => setMode(b.dataset.k));
    setMode(mode);
    const showPrev = () => { $("#vPrev", m.el).innerHTML = fileSrc ? `<video src="${esc(fileSrc)}" controls preload="metadata" playsinline></video><small class="muted" dir="ltr">${esc(fileSrc.split("/").pop())}</small>` : ""; $("#vdzText", m.el).textContent = fileSrc ? v.replace : v.drop; };
    showPrev();
    const bar = $(".up-bar", m.el);
    const upload = async (file) => {
      if (!file || busy) return;
      if (file.size > maxMb * 1048576) { toast("⚠️ " + esc(T().err.video_too_large)); return; }
      busy = true; bar.hidden = false; $("i", bar).style.width = "0%";
      try {
        const res = await uploadVideo(file, (p) => { $("i", bar).style.width = p + "%"; $("#vdzText", m.el).textContent = v.uploading(p); });
        if (fresh) api("/api/admin/videos/upload", { method: "DELETE", body: { src: fresh } }).catch(() => {});
        fresh = fileSrc = res.src; toast(v.uploaded);
        const tEn = m.el.querySelector('[name="title_en"]'), tAr = m.el.querySelector('[name="title_ar"]');
        if (!tEn.value && !tAr.value) (I18N.lang === "ar" ? tAr : tEn).value = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
        const probe = document.createElement("video"); probe.preload = "metadata"; probe.src = res.src;
        probe.onloadedmetadata = () => { const d = $("#vDur", m.el); if (!d.value && isFinite(probe.duration)) { const s = Math.round(probe.duration); d.value = (s >= 3600 ? Math.floor(s / 3600) + ":" + String(Math.floor(s / 60) % 60).padStart(2, "0") : Math.floor(s / 60)) + ":" + String(s % 60).padStart(2, "0"); } };
      } catch (e) { toast("⚠️ " + esc(errText(e))); }
      finally { busy = false; bar.hidden = true; showPrev(); }
    };
    $("#vFile", m.el).onchange = (e) => upload(e.target.files[0]);
    const dz = $("#vdz", m.el);
    dz.addEventListener("dragover", (e) => { e.preventDefault(); dz.classList.add("over"); });
    dz.addEventListener("dragleave", () => dz.classList.remove("over"));
    dz.addEventListener("drop", (e) => { e.preventDefault(); dz.classList.remove("over"); upload([...e.dataTransfer.files][0]); });
    $("#vf", m.el).onsubmit = (e) => {
      e.preventDefault();
      if (busy) { toast(v.busy); return; }
      const f = new FormData(e.target), src = mode === "upload" ? fileSrc : String(f.get("link") || "").trim();
      if (!src) { toast("⚠️ " + v.needSource); return; }
      const body = { src, module_id: f.get("module_id") || null, title: pairOf(f, "title"), desc: pairOf(f, "desc"), duration: f.get("duration"), poster: f.get("poster"), published: !!f.get("published") };
      run($("button.primary", e.target), () => api(item ? `/api/admin/videos/${item.id}` : "/api/admin/videos", { method: item ? "PUT" : "POST", body }))
        .then(() => { saved = true; m.close(); toast(A().saved); afterChange(); done(); });
    };
    if (item) confirmBtn($("#vdel", m.el), () => run(null, () => api(`/api/admin/videos/${item.id}`, { method: "DELETE", body: {} })).then(() => { saved = true; m.close(); afterChange(); done(); }));
  }

  /* ---------- Gallery ---------- */
  async function gallery(el) {
    const g = A().gallery, r = await api("/api/admin/gallery");
    el.innerHTML = `<div class="adm-head"><h1>${g.h}</h1><button class="btn primary" id="addG">＋ ${g.add}</button></div><p class="muted">${g.count(r.gallery.length)}</p>
      <div class="adm-gallery">${r.gallery.map((x, i) => `<div class="card ag-item rv ${x.published ? "" : "off"}" data-id="${x.id}" style="--i:${i % 4}">
        <img src="${esc(x.src)}" alt="" loading="lazy"><div class="ag-body"><b>${esc(L(x.title))}</b><div class="tags">${(x.genres || []).map(id => (window.GA.C.genres || []).find(z => z.id === id)).filter(Boolean).map(z => `<span class="tag genre-tag">${z.icon} ${esc(L(z.name))}</span>`).join("")}${x.tags.map(t => `<span class="tag">${esc(window.GA.tagLabel(t))}</span>`).join("")}</div></div>
        <div class="ag-acts"><button class="icon-btn" data-mv="-1" aria-label="${A().up}" ${i === 0 ? "disabled" : ""}>◀</button><button class="btn small" data-edit>${A().edit}</button><button class="icon-btn" data-mv="1" aria-label="${A().down}" ${i === r.gallery.length - 1 ? "disabled" : ""}>▶</button></div></div>`).join("")}</div>`;
    const reload = () => gallery(el);
    $("#addG", el).onclick = () => galleryForm(null, reload);
    $$(".ag-item", el).forEach(card => {
      const id = +card.dataset.id, item = r.gallery.find(x => x.id === id);
      $("[data-edit]", card).onclick = () => galleryForm(item, reload);
      $$("[data-mv]", card).forEach(b => b.onclick = () => { const ids = r.gallery.map(x => x.id), i = ids.indexOf(id), j = i + +b.dataset.mv;[ids[i], ids[j]] = [ids[j], ids[i]]; run(b, () => api("/api/admin/gallery-order", { method: "PUT", body: { ids } })).then(() => { afterChange(); reload(); }); });
    });
  }
  function galleryForm(item, done) {
    const g = A().gallery, c = A().content, x = item || { src: "", title: { en: "", ar: "" }, tags: [], genres: [], notes: { en: [], ar: [] }, published: true };
    const m = modal(`<h2>${item ? A().edit : g.add}</h2><form class="adm-form" id="gf">
      ${imgField("src", x.src, c.image)}${bi("title", c.title, x.title)}
      <div class="field"><label>${g.tags}</label><input name="tags" dir="ltr" value="${esc(x.tags.join(", "))}" placeholder="Pixel, Characters, UI/HUD"></div>
      <div class="field"><label>${g.genres}</label><div class="genre-checks">${(window.GA.C.genres || []).map(z => `<label class="check"><input type="checkbox" name="genres" value="${esc(z.id)}" ${(x.genres || []).includes(z.id) ? "checked" : ""}> ${z.icon} ${esc(L(z.name))}</label>`).join("")}</div></div>
      ${bi("notes", g.notes, { en: x.notes.en.join("\n"), ar: x.notes.ar.join("\n") }, { area: true, rows: 4 })}
      <label class="check"><input type="checkbox" name="published" ${x.published ? "checked" : ""}> ${A().published}</label>
      <div class="form-actions"><button class="btn primary">${A().save}</button>${item ? `<button class="btn danger-btn" type="button" id="gdel">${A().del}</button>` : ""}</div></form>`, { wide: true });
    wireImgFields(m.el);
    $("#gf", m.el).onsubmit = (e) => {
      e.preventDefault(); const f = new FormData(e.target);
      const body = { src: f.get("src"), title: pairOf(f, "title"), tags: String(f.get("tags")).split(",").map(s => s.trim()).filter(Boolean), genres: f.getAll("genres"), notes: linesPair(f, "notes"), published: !!f.get("published") };
      run($("button.primary", e.target), () => api(item ? `/api/admin/gallery/${item.id}` : "/api/admin/gallery", { method: item ? "PUT" : "POST", body })).then(() => { m.close(); toast(A().saved); afterChange(); done(); });
    };
    if (item) confirmBtn($("#gdel", m.el), () => run(null, () => api(`/api/admin/gallery/${item.id}`, { method: "DELETE", body: {} })).then(() => { m.close(); afterChange(); done(); }));
  }

  /* ---------- Media ---------- */
  async function media(el) {
    const md = A().media; let folder = "all";
    el.innerHTML = `<div class="adm-head"><h1>${md.h}</h1></div>
      <label class="dropzone" id="dz"><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple hidden id="dzFile"><span>⬆</span><b>${md.drop}</b></label>
      <div class="media-tools"><div class="seg" id="mSeg"></div></div><div class="media-grid" id="mGrid">${A().loading}</div>`;
    let items = [];
    const draw = () => {
      $("#mSeg", el).innerHTML = ["all", "images", "uploads", "assets/art"].map(k => `<button class="${folder === k ? "on" : ""}" data-f="${k}">${md.folders[k]} <small>${k === "all" ? items.length : items.filter(x => x.folder === k).length}</small></button>`).join("");
      $$("[data-f]", el).forEach(b => b.onclick = () => { folder = b.dataset.f; draw(); });
      $("#mGrid", el).innerHTML = items.filter(x => folder === "all" || x.folder === folder).map(x => `<figure class="media-tile" data-src="${esc(x.src)}"><img src="${esc(x.src)}" alt="" loading="lazy"><figcaption><span dir="ltr">${esc(x.name)}</span><small>${(x.size / 1024).toFixed(0)} KB · ${md.used(x.used)}</small>
        <span class="mt-acts"><button class="btn small" data-copy>${md.copy}</button>${x.deletable ? `<button class="btn small danger-btn" data-del>${A().del}</button>` : ""}</span></figcaption></figure>`).join("");
      $$(".media-tile", el).forEach(t => {
        $("[data-copy]", t).onclick = () => { try { navigator.clipboard.writeText(t.dataset.src); toast(md.copied); } catch (e) { /* ignore */ } };
        const d = $("[data-del]", t); if (d) confirmBtn(d, () => run(d, () => api("/api/admin/media", { method: "DELETE", body: { src: t.dataset.src } })).then(load));
        $("img", t).onclick = () => window.GA.zoom(t.dataset.src, t.dataset.src.split("/").pop(), [], []);
      });
    };
    const load = () => api("/api/admin/media").then(r => { items = r.media; draw(); });
    const up = async (files) => { if (!files.length) return; $("#dz b", el).textContent = md.uploading; try { await run(null, () => uploadFiles(files)); toast(md.uploaded); folder = "uploads"; } finally { $("#dz b", el).textContent = md.drop; load(); } };
    $("#dzFile", el).onchange = (e) => up([...e.target.files]);
    const dz = $("#dz", el);
    dz.addEventListener("dragover", (e) => { e.preventDefault(); dz.classList.add("over"); });
    dz.addEventListener("dragleave", () => dz.classList.remove("over"));
    dz.addEventListener("drop", (e) => { e.preventDefault(); dz.classList.remove("over"); up([...e.dataTransfer.files].filter(f => f.type.startsWith("image/"))); });
    load();
  }

  /* ---------- Settings ---------- */
  async function settings(el) {
    const s = A().settings, r = await api("/api/admin/settings"), st = r.settings;
    let hero = [...(st.hero_images || [])];
    el.innerHTML = `<div class="adm-head"><h1>${s.h}</h1></div>
      <form class="card adm-form rv" id="sf">
        ${bi("site_name", s.site, st.site_name || {})}
        ${bi("announcement", s.ann, st.announcement || {})}
        <div class="field"><label>${s.hero}</label><div class="hero-pick" id="heroPick"></div><button type="button" class="btn small" id="addHero">＋ ${s.addHero}</button></div>
        <div class="grid-2">
          <div class="field"><label>${s.defLang}</label><select name="default_lang"><option value="ar" ${st.default_lang !== "en" ? "selected" : ""}>العربية</option><option value="en" ${st.default_lang === "en" ? "selected" : ""}>English</option></select></div>
          <div class="field checks"><label><input type="checkbox" name="registration_open" ${st.registration_open !== false ? "checked" : ""}> ${s.reg}</label></div>
        </div>
        <div class="form-actions"><button class="btn primary">${A().save}</button></div>
      </form>`;
    const drawHero = () => {
      $("#heroPick", el).innerHTML = hero.map((src, i) => `<div class="hp-item"><img src="${esc(src)}" alt=""><div><button type="button" class="icon-btn" data-l="${i}" aria-label="${A().up}">◀</button><button type="button" class="icon-btn" data-x="${i}" aria-label="${A().del}">✕</button><button type="button" class="icon-btn" data-r="${i}" aria-label="${A().down}">▶</button></div></div>`).join("");
      $$("[data-x]", el).forEach(b => b.onclick = () => { hero.splice(+b.dataset.x, 1); drawHero(); });
      $$("[data-l],[data-r]", el).forEach(b => b.onclick = () => { const i = +(b.dataset.l ?? b.dataset.r), j = i + (b.dataset.l != null ? -1 : 1); if (j < 0 || j >= hero.length) return; [hero[i], hero[j]] = [hero[j], hero[i]]; drawHero(); });
    };
    drawHero();
    $("#addHero", el).onclick = async () => { const src = await pickMedia(""); if (src) { hero.push(src); drawHero(); } };
    $("#sf", el).onsubmit = (e) => {
      e.preventDefault(); const f = new FormData(e.target);
      run($("button.primary", e.target), () => api("/api/admin/settings", { method: "PUT", body: { site_name: pairOf(f, "site_name"), announcement: pairOf(f, "announcement"), hero_images: hero, default_lang: f.get("default_lang"), registration_open: !!f.get("registration_open") } }))
        .then(async () => { toast(A().saved); await afterChange(); });
    };
  }

  window.Admin = { render };
})();
