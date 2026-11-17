import express from "express";
import { readFileSync, readdirSync, writeFileSync, unlinkSync, existsSync, mkdirSync, statSync, createWriteStream, rmSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { randomBytes } from "node:crypto";
import { db, ROOT, J, now, hashPassword, checkPassword, createSession, userFromSession, destroySession, pruneSessions, publicUser, getSettings, setSetting, tx } from "./db.js";
import { seedContent, ensureAdmin } from "./seed.js";
import ar from "./seed/ar.js";
import { GENRES, GENRE_IDS } from "./genres.js";
import { suggest, STEPS, AI_ENABLED } from "./ai.js";

const PORT = +process.env.PORT || 3000;
const PROD = process.env.NODE_ENV === "production";
const UPLOADS = join(ROOT, "uploads");
mkdirSync(UPLOADS, { recursive: true });
const VIDEOS = join(UPLOADS, "videos");
mkdirSync(VIDEOS, { recursive: true });
const MAX_VIDEO = (+process.env.VIDEO_MAX_MB || 2048) * 1024 * 1024;

seedContent();
const firstAdmin = ensureAdmin();
pruneSessions();

/* ---------------- Static bilingual reference data (tools, ideas, badges…) ---------------- */
const REMOVED_BADGES = new Set(["historian", "hero", "quiz"]); // Hall of Fame page and quizzes were removed
const en = JSON.parse(readFileSync(join(ROOT, "server", "seed", "en.json"), "utf8"));
const STATIC = {
  tools: en.tools.map((c, i) => ({ cat: { en: c.cat, ar: ar.tools[i].cat }, items: c.items.map(([n, u, d], k) => ({ name: n, url: u, desc: { en: d, ar: ar.tools[i].items[k] } })) })),
  ideas: { en: en.ideas, ar: ar.ideas },
  badges: en.badges.filter(b => !REMOVED_BADGES.has(b.id)).map(b => ({ id: b.id, icon: b.icon, name: { en: b.name, ar: ar.badges[b.id].name }, desc: { en: b.desc, ar: ar.badges[b.id].desc } })),
  cast: en.cast.map(c => ({ id: c.id, color: c.color, name: { en: c.name, ar: ar.cast[c.id].name }, role: { en: c.role, ar: ar.cast[c.id].role },
    shape: { en: c.shape, ar: ar.cast[c.id].shape }, fantasy: { en: c.fantasy, ar: ar.cast[c.id].fantasy }, design: { en: c.design, ar: ar.cast[c.id].design } })),
  tags: ar.tags,
  genres: GENRES
};

/* ---------------- Row ↔ API shapes ---------------- */
const bi = (r, f) => ({ en: r[f + "_en"] ?? "", ar: r[f + "_ar"] ?? "" });
const biJ = (r, f) => ({ en: J(r[f + "_en"], []), ar: J(r[f + "_ar"], []) });
const lessonOut = (l) => ({ id: l.id, position: l.position, title: bi(l, "title"), body: bi(l, "body"), image: l.image || "" });
function moduleOut(m, withChildren = true) {
  const o = { id: m.id, slug: m.slug, num: m.num, icon: m.icon, color: m.color, cover: m.cover, lab: !!m.lab, position: m.position, published: !!m.published,
    title: bi(m, "title"), tagline: bi(m, "tagline"), takeaways: biJ(m, "takeaways") };
  if (withChildren) {
    o.lessons = db.prepare("SELECT * FROM lessons WHERE module_id = ? ORDER BY position, id").all(m.id).map(lessonOut);
  }
  return o;
}
const videoOut = (v) => ({ id: v.id, module_id: v.module_id ?? null, position: v.position, published: !!v.published, kind: v.kind, src: v.src, poster: v.poster || "", duration: v.duration || "", title: bi(v, "title"), desc: bi(v, "desc"), created_at: v.created_at });
const galleryOut = (g) => ({ id: g.id, position: g.position, src: g.src, published: !!g.published, title: bi(g, "title"), tags: J(g.tags, []), genres: J(g.genres, []), notes: biJ(g, "notes") });

/* ---------------- Validation helpers ---------------- */
class HttpError extends Error { constructor(status, code) { super(code); this.status = status; this.code = code; } }
const fail = (status, code) => { throw new HttpError(status, code); };
const str = (v, max = 200) => (typeof v === "string" ? v : v == null ? "" : String(v)).slice(0, max);
const pair = (v, max) => ({ en: str(v?.en, max), ar: str(v?.ar, max) });
const arr = (v, max = 50, len = 400) => (Array.isArray(v) ? v : []).slice(0, max).map(x => str(x, len));
const pairArr = (v) => ({ en: arr(v?.en), ar: arr(v?.ar) });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const safeSrc = (s) => { s = str(s, 300); return s === "" || /^\/(images|uploads|assets\/art)\/[\w.\-() ]+$/.test(s) ? s : fail(400, "bad_image"); };
/* Video source: an uploaded file path, a YouTube link/ID or a Vimeo link → { kind, src } where src is the file path or the platform ID. */
function parseVideo(input) {
  const s = str(input, 500).trim();
  if (/^\/uploads\/videos\/[\w.\-]+\.(mp4|webm|ogv|mov)$/i.test(s)) return { kind: "file", src: s };
  let m = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/i.exec(s) || /^([\w-]{11})$/.exec(s);
  if (m) return { kind: "youtube", src: m[1] };
  m = /vimeo\.com\/(?:.*\/)?(\d{5,})/i.exec(s);
  if (m) return { kind: "vimeo", src: m[1] };
  fail(400, "bad_video");
}
const slugify = (s) => str(s, 60).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "module-" + randomBytes(3).toString("hex");

/* ---------------- App ---------------- */
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff", "Referrer-Policy": "same-origin", "X-Frame-Options": "SAMEORIGIN",
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data: blob: https://i.ytimg.com; media-src 'self' blob:; frame-src https://www.youtube-nocookie.com https://player.vimeo.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
  });
  next();
});
app.use(express.json({ limit: "12mb" }));

const cookie = (req) => Object.fromEntries((req.headers.cookie || "").split(/;\s*/).filter(Boolean).map(c => { const i = c.indexOf("="); return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))]; }));
app.use((req, res, next) => {
  req.sid = cookie(req).ga_sid;
  req.user = userFromSession(req.sid);
  if (req.user && (!req.user.last_seen || now() - req.user.last_seen > 6e4)) db.prepare("UPDATE users SET last_seen = ? WHERE id = ?").run(now(), req.user.id);
  next();
});
// JSON-only API writes block simple cross-site form posts (CSRF) on top of SameSite cookies.
app.use("/api", (req, res, next) => {
  if (req.method === "POST" && req.path === "/admin/videos/upload") return next(); // raw video body; a video/* type always needs a CORS preflight, so it can't be forged cross-site
  if (!["GET", "HEAD"].includes(req.method) && !req.is("application/json")) return res.status(415).json({ error: "json_required" });
  next();
});
const setSid = (res, s) => res.cookie("ga_sid", s.token, { httpOnly: true, sameSite: "lax", secure: PROD, maxAge: s.maxAge, path: "/" });
const auth = (req, res, next) => (req.user ? next() : res.status(401).json({ error: "auth_required" }));
const admin = (req, res, next) => (req.user?.role === "admin" ? next() : res.status(req.user ? 403 : 401).json({ error: "admin_required" }));

/* Login throttle: 10 failed attempts per IP+email per 15 minutes. */
const attempts = new Map();
const throttleKey = (req, email) => req.ip + "|" + String(email).toLowerCase();
function throttled(key) { const a = attempts.get(key); return a && a.n >= 10 && now() - a.t < 9e5; }
function failed(key) { const a = attempts.get(key); attempts.set(key, a && now() - a.t < 9e5 ? { n: a.n + 1, t: a.t } : { n: 1, t: now() }); }

/* ---------------- Auth ---------------- */
app.post("/api/auth/register", (req, res) => {
  if (getSettings().registration_open === false) fail(403, "registration_closed");
  const name = str(req.body.name, 60).trim(), email = str(req.body.email, 120).trim().toLowerCase(), password = str(req.body.password, 200);
  const lang = req.body.lang === "en" ? "en" : "ar";
  if (name.length < 2) fail(400, "name_short");
  if (!EMAIL.test(email)) fail(400, "email_invalid");
  if (password.length < 8) fail(400, "password_short");
  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) fail(409, "email_taken");
  const guest = req.body.state && typeof req.body.state === "object" ? req.body.state : {};
  const state = JSON.stringify(guest).length < 2e5 ? JSON.stringify(guest) : "{}";
  const xp = cappedXp(req.body.xp, guest);
  const { lastInsertRowid: id } = db.prepare("INSERT INTO users (name, email, pass, lang, xp, state, created_at, last_seen) VALUES (?,?,?,?,?,?,?,?)").run(name, email, hashPassword(password), lang, xp, state, now(), now());
  setSid(res, createSession(id));
  res.status(201).json({ user: publicUser(db.prepare("SELECT * FROM users WHERE id = ?").get(id)) });
});
app.post("/api/auth/login", (req, res) => {
  const email = str(req.body.email, 120).trim().toLowerCase(), key = throttleKey(req, email);
  if (throttled(key)) fail(429, "too_many_attempts");
  const u = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!u || !checkPassword(str(req.body.password, 200), u.pass)) { failed(key); fail(401, "bad_credentials"); }
  if (u.disabled) fail(403, "account_disabled");
  attempts.delete(key);
  setSid(res, createSession(u.id));
  res.json({ user: publicUser(u) });
});
app.post("/api/auth/logout", (req, res) => { if (req.sid) destroySession(req.sid); res.clearCookie("ga_sid", { path: "/" }); res.json({ ok: true }); });

app.get("/api/me", (req, res) => res.json({ user: publicUser(req.user) }));
app.put("/api/me", auth, (req, res) => {
  const u = req.user, b = req.body;
  const name = b.name != null ? str(b.name, 60).trim() : u.name;
  if (name.length < 2) fail(400, "name_short");
  const lang = b.lang === "en" || b.lang === "ar" ? b.lang : u.lang;
  let pass = u.pass;
  if (b.newPassword) {
    if (!checkPassword(str(b.currentPassword, 200), u.pass)) fail(400, "bad_current_password");
    if (str(b.newPassword, 200).length < 8) fail(400, "password_short");
    pass = hashPassword(str(b.newPassword, 200));
    db.prepare("DELETE FROM sessions WHERE user_id = ? AND token != ?").run(u.id, req.sid);
  }
  db.prepare("UPDATE users SET name = ?, lang = ?, pass = ? WHERE id = ?").run(name, lang, pass, u.id);
  res.json({ user: publicUser(db.prepare("SELECT * FROM users WHERE id = ?").get(u.id)) });
});
/* XP is never taken on trust: it is capped at what the saved progress can actually earn, counting only real
   lesson / module / gallery / video ids. Mirrors the awards in app.js, quest.js and studio.js. */
function earnableXp(st) {
  if (!st || typeof st !== "object") return 0;
  const on = (o) => Object.entries(o && typeof o === "object" ? o : {}).filter(([, v]) => v === true).map(([k]) => k);
  const gemsIn = (html) => (String(html || "").match(/<strong[\s>]/gi) || []).length;
  let xp = 0;
  const lessons = new Map(db.prepare("SELECT id, body_en, body_ar FROM lessons").all().map(l => [String(l.id), Math.max(gemsIn(l.body_en), gemsIn(l.body_ar))]));
  for (const id of on(st.lessons)) if (lessons.has(id)) xp += 20 + 2 * Math.min(lessons.get(id), Array.isArray(st.gems?.[id]) ? st.gems[id].length : 0);
  const slugs = new Set(db.prepare("SELECT slug FROM modules").all().map(m => m.slug));
  xp += 50 * on(st.modules).filter(s => slugs.has(s)).length;
  for (const [s, n] of Object.entries(st.stars && typeof st.stars === "object" ? st.stars : {})) if (slugs.has(s)) xp += 10 * Math.max(0, Math.min(3, Math.floor(+n || 0)));
  const galleryIds = new Set(db.prepare("SELECT id FROM gallery").all().map(g => String(g.id)));
  xp += 3 * on(st.gallery).filter(id => galleryIds.has(id)).length;
  const videoIds = new Set(db.prepare("SELECT id FROM videos").all().map(v => String(v.id)));
  xp += 5 * on(st.videos).filter(id => videoIds.has(id)).length;
  xp += (st.lab === true ? 25 : 0) + (st.coins === true ? 50 : 0) + (st.idea === true ? 10 : 0) + (st.gddSaved === true ? 40 : 0);
  return xp;
}
const cappedXp = (claimed, st) => Math.max(0, Math.min(Math.floor(+claimed || 0), earnableXp(st)));

app.put("/api/me/progress", auth, (req, res) => {
  const state = JSON.stringify(req.body.state || {});
  if (state.length > 2e5) fail(413, "state_too_large");
  const xp = cappedXp(req.body.xp, req.body.state);
  db.prepare("UPDATE users SET state = ?, xp = ? WHERE id = ?").run(state, xp, req.user.id);
  res.json({ ok: true });
});
app.delete("/api/me", auth, (req, res) => {
  if (!checkPassword(str(req.body.password, 200), req.user.pass)) fail(400, "bad_current_password");
  if (req.user.role === "admin" && db.prepare("SELECT COUNT(*) n FROM users WHERE role = 'admin'").get().n < 2) fail(400, "last_admin");
  db.prepare("DELETE FROM users WHERE id = ?").run(req.user.id);
  res.clearCookie("ga_sid", { path: "/" }); res.json({ ok: true });
});

/* ---------------- Public content ---------------- */
app.get("/api/content", (req, res) => {
  const modules = db.prepare("SELECT * FROM modules WHERE published = 1 ORDER BY position, id").all().map(m => moduleOut(m));
  const gallery = db.prepare("SELECT * FROM gallery WHERE published = 1 ORDER BY position, id").all().map(galleryOut);
  const videos = db.prepare("SELECT v.* FROM videos v LEFT JOIN modules m ON m.id = v.module_id WHERE v.published = 1 AND (v.module_id IS NULL OR m.published = 1) ORDER BY v.position, v.id").all().map(videoOut);
  const s = getSettings();
  res.json({ modules, gallery, videos, settings: { site_name: s.site_name, announcement: s.announcement, hero_images: s.hero_images, default_lang: s.default_lang, registration_open: s.registration_open !== false }, ...STATIC });
});
/* ---------------- Design Studio AI (signed-in users, 30 requests / hour each) ---------------- */
const aiUse = new Map();
app.post("/api/studio/ai", auth, async (req, res, next) => {
  if (!AI_ENABLED) return res.status(503).json({ error: "ai_off" });
  const u = aiUse.get(req.user.id), t = now();
  const rec = u && t - u.t < 36e5 ? u : { n: 0, t };
  if (rec.n >= 30) return res.status(429).json({ error: "ai_limit" });
  rec.n++; aiUse.set(req.user.id, rec);
  const b = req.body || {};
  const step = STEPS.includes(b.step) ? b.step : "genre";
  const design = JSON.stringify(b.design || {}).length < 8000 ? b.design || {} : {};
  try { res.json({ suggestion: await suggest({ step, lang: b.lang === "en" ? "en" : "ar", ask: String(b.ask || "").slice(0, 300), design }) }); }
  catch (e) { if (e.code) return res.status(502).json({ error: e.code }); console.error("studio ai:", e.message); res.status(502).json({ error: "ai_failed" }); }
});
app.get("/api/leaderboard", (req, res) => {
  res.json({ top: db.prepare("SELECT id, name, xp FROM users WHERE disabled = 0 AND xp > 0 ORDER BY xp DESC, id LIMIT 10").all() });
});

/* ---------------- Admin: dashboard & users ---------------- */
app.get("/api/admin/stats", admin, (req, res) => {
  const week = now() - 7 * 864e5;
  const users = db.prepare("SELECT id, name, email, xp, state, created_at, last_seen, role FROM users").all();
  const lessonIds = new Map(db.prepare("SELECT l.id, m.slug FROM lessons l JOIN modules m ON m.id = l.module_id").all().map(r => [String(r.id), r.slug]));
  const perModule = {}; let lessonsDone = 0;
  for (const u of users) {
    const st = J(u.state, {});
    for (const [k, v] of Object.entries(st.lessons || {})) if (v) { lessonsDone++; const s = lessonIds.get(k); if (s) perModule[s] = (perModule[s] || 0) + 1; }
  }
  const modules = db.prepare("SELECT slug, title_en, title_ar, color FROM modules ORDER BY position").all().map(m => ({ slug: m.slug, title: { en: m.title_en, ar: m.title_ar }, color: m.color, completions: perModule[m.slug] || 0 }));
  const days = Array.from({ length: 14 }, (_, i) => { const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - (13 - i)); return start.getTime(); });
  const signups = days.map((d, i) => users.filter(u => u.created_at >= d && u.created_at < (days[i + 1] || Infinity)).length);
  res.json({
    totals: { users: users.length, admins: users.filter(u => u.role === "admin").length, newThisWeek: users.filter(u => u.created_at >= week).length, activeThisWeek: users.filter(u => (u.last_seen || 0) >= week).length,
      lessonsDone, modules: db.prepare("SELECT COUNT(*) n FROM modules").get().n, lessons: db.prepare("SELECT COUNT(*) n FROM lessons").get().n, gallery: db.prepare("SELECT COUNT(*) n FROM gallery").get().n, videos: db.prepare("SELECT COUNT(*) n FROM videos").get().n },
    modules, signups: { days, counts: signups },
    recent: users.sort((a, b) => b.created_at - a.created_at).slice(0, 6).map(u => ({ id: u.id, name: u.name, email: u.email, created_at: u.created_at, xp: u.xp })),
    top: users.sort((a, b) => b.xp - a.xp).slice(0, 6).map(u => ({ id: u.id, name: u.name, xp: u.xp }))
  });
});
app.get("/api/admin/users", admin, (req, res) => {
  const q = "%" + str(req.query.q, 80) + "%";
  const rows = db.prepare("SELECT id, name, email, role, lang, xp, disabled, created_at, last_seen, state FROM users WHERE name LIKE ? OR email LIKE ? ORDER BY created_at DESC LIMIT 500").all(q, q);
  res.json({ users: rows.map(u => { const st = J(u.state, {}); return { ...u, state: undefined, disabled: !!u.disabled, lessons: Object.values(st.lessons || {}).filter(Boolean).length, badges: Object.values(st.badges || {}).filter(Boolean).length }; }) });
});
app.put("/api/admin/users/:id", admin, (req, res) => {
  const u = db.prepare("SELECT * FROM users WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  const b = req.body;
  const role = b.role === "admin" || b.role === "user" ? b.role : u.role;
  const disabled = b.disabled != null ? (b.disabled ? 1 : 0) : u.disabled;
  if (u.id === req.user.id && (role !== "admin" || disabled)) fail(400, "cannot_demote_self");
  const name = b.name != null ? str(b.name, 60).trim() || u.name : u.name;
  db.prepare("UPDATE users SET role = ?, disabled = ?, name = ? WHERE id = ?").run(role, disabled, name, u.id);
  if (b.resetProgress) db.prepare("UPDATE users SET state = '{}', xp = 0 WHERE id = ?").run(u.id);
  if (b.newPassword) { if (str(b.newPassword, 200).length < 8) fail(400, "password_short"); db.prepare("UPDATE users SET pass = ? WHERE id = ?").run(hashPassword(str(b.newPassword, 200)), u.id); db.prepare("DELETE FROM sessions WHERE user_id = ?").run(u.id); }
  if (disabled) db.prepare("DELETE FROM sessions WHERE user_id = ?").run(u.id);
  res.json({ ok: true });
});
app.delete("/api/admin/users/:id", admin, (req, res) => {
  if (+req.params.id === req.user.id) fail(400, "cannot_delete_self");
  db.prepare("DELETE FROM users WHERE id = ?").run(+req.params.id);
  res.json({ ok: true });
});

/* ---------------- Admin: modules and lessons ---------------- */
app.get("/api/admin/modules", admin, (req, res) => res.json({ modules: db.prepare("SELECT * FROM modules ORDER BY position, id").all().map(m => moduleOut(m)) }));
function moduleFields(b) {
  return { num: str(b.num, 6), icon: str(b.icon, 8), color: /^#[0-9a-f]{6}$/i.test(b.color) ? b.color : "#8b7bff", cover: safeSrc(b.cover), lab: b.lab ? 1 : 0, published: b.published === false ? 0 : 1,
    title: pair(b.title, 160), tagline: pair(b.tagline, 300), takeaways: pairArr(b.takeaways) };
}
app.post("/api/admin/modules", admin, (req, res) => {
  const f = moduleFields(req.body); let slug = slugify(req.body.slug || f.title.en);
  if (db.prepare("SELECT 1 FROM modules WHERE slug = ?").get(slug)) slug += "-" + randomBytes(2).toString("hex");
  const pos = (db.prepare("SELECT MAX(position) p FROM modules").get().p ?? -1) + 1;
  const { lastInsertRowid: id } = db.prepare(`INSERT INTO modules (slug, num, icon, color, cover, lab, position, published, title_en, title_ar, tagline_en, tagline_ar, takeaways_en, takeaways_ar) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .run(slug, f.num || String(pos + 1).padStart(2, "0"), f.icon || "🎮", f.color, f.cover, f.lab, pos, f.published, f.title.en, f.title.ar, f.tagline.en, f.tagline.ar, JSON.stringify(f.takeaways.en), JSON.stringify(f.takeaways.ar));
  res.status(201).json({ module: moduleOut(db.prepare("SELECT * FROM modules WHERE id = ?").get(id)) });
});
app.put("/api/admin/modules/:id", admin, (req, res) => {
  const m = db.prepare("SELECT * FROM modules WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  const f = moduleFields(req.body);
  db.prepare(`UPDATE modules SET num=?, icon=?, color=?, cover=?, lab=?, published=?, title_en=?, title_ar=?, tagline_en=?, tagline_ar=?, takeaways_en=?, takeaways_ar=? WHERE id=?`)
    .run(f.num, f.icon, f.color, f.cover, f.lab, f.published, f.title.en, f.title.ar, f.tagline.en, f.tagline.ar, JSON.stringify(f.takeaways.en), JSON.stringify(f.takeaways.ar), m.id);
  res.json({ module: moduleOut(db.prepare("SELECT * FROM modules WHERE id = ?").get(m.id)) });
});
app.delete("/api/admin/modules/:id", admin, (req, res) => { db.prepare("DELETE FROM modules WHERE id = ?").run(+req.params.id); res.json({ ok: true }); });
const reorder = (table, ids, where = "", whereVal) => tx(() => ids.forEach((id, i) => db.prepare(`UPDATE ${table} SET position = ? WHERE id = ?${where}`).run(...[i, +id, ...(whereVal != null ? [whereVal] : [])])));
app.put("/api/admin/modules-order", admin, (req, res) => { reorder("modules", arr(req.body.ids, 500)); res.json({ ok: true }); });

app.post("/api/admin/modules/:id/lessons", admin, (req, res) => {
  const m = db.prepare("SELECT id FROM modules WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  const b = req.body, t = pair(b.title, 200), body = pair(b.body, 60000);
  const pos = (db.prepare("SELECT MAX(position) p FROM lessons WHERE module_id = ?").get(m.id).p ?? -1) + 1;
  const { lastInsertRowid: id } = db.prepare("INSERT INTO lessons (module_id, position, title_en, title_ar, body_en, body_ar, image) VALUES (?,?,?,?,?,?,?)").run(m.id, pos, t.en, t.ar, body.en, body.ar, safeSrc(b.image));
  res.status(201).json({ lesson: lessonOut(db.prepare("SELECT * FROM lessons WHERE id = ?").get(id)) });
});
app.put("/api/admin/lessons/:id", admin, (req, res) => {
  const l = db.prepare("SELECT * FROM lessons WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  const b = req.body, t = pair(b.title, 200), body = pair(b.body, 60000);
  db.prepare("UPDATE lessons SET title_en=?, title_ar=?, body_en=?, body_ar=?, image=? WHERE id=?").run(t.en, t.ar, body.en, body.ar, safeSrc(b.image), l.id);
  res.json({ lesson: lessonOut(db.prepare("SELECT * FROM lessons WHERE id = ?").get(l.id)) });
});
app.delete("/api/admin/lessons/:id", admin, (req, res) => { db.prepare("DELETE FROM lessons WHERE id = ?").run(+req.params.id); res.json({ ok: true }); });
app.put("/api/admin/modules/:id/lessons-order", admin, (req, res) => { reorder("lessons", arr(req.body.ids, 500), " AND module_id = ?", +req.params.id); res.json({ ok: true }); });


/* ---------------- Admin: gallery ---------------- */
app.get("/api/admin/gallery", admin, (req, res) => res.json({ gallery: db.prepare("SELECT * FROM gallery ORDER BY position, id").all().map(galleryOut) }));
function galleryFields(b) { return { src: safeSrc(b.src) || fail(400, "image_required"), title: pair(b.title, 160), tags: arr(b.tags, 8, 40), genres: arr(b.genres, 12, 20).filter(x => GENRE_IDS.has(x)), notes: pairArr(b.notes), published: b.published === false ? 0 : 1 }; }
app.post("/api/admin/gallery", admin, (req, res) => {
  const f = galleryFields(req.body), pos = (db.prepare("SELECT MAX(position) p FROM gallery").get().p ?? -1) + 1;
  const { lastInsertRowid: id } = db.prepare("INSERT INTO gallery (position, src, published, title_en, title_ar, tags, genres, notes_en, notes_ar) VALUES (?,?,?,?,?,?,?,?,?)").run(pos, f.src, f.published, f.title.en, f.title.ar, JSON.stringify(f.tags), JSON.stringify(f.genres), JSON.stringify(f.notes.en), JSON.stringify(f.notes.ar));
  res.status(201).json({ item: galleryOut(db.prepare("SELECT * FROM gallery WHERE id = ?").get(id)) });
});
app.put("/api/admin/gallery/:id", admin, (req, res) => {
  const g = db.prepare("SELECT id FROM gallery WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  const f = galleryFields(req.body);
  db.prepare("UPDATE gallery SET src=?, published=?, title_en=?, title_ar=?, tags=?, genres=?, notes_en=?, notes_ar=? WHERE id=?").run(f.src, f.published, f.title.en, f.title.ar, JSON.stringify(f.tags), JSON.stringify(f.genres), JSON.stringify(f.notes.en), JSON.stringify(f.notes.ar), g.id);
  res.json({ item: galleryOut(db.prepare("SELECT * FROM gallery WHERE id = ?").get(g.id)) });
});
app.delete("/api/admin/gallery/:id", admin, (req, res) => { db.prepare("DELETE FROM gallery WHERE id = ?").run(+req.params.id); res.json({ ok: true }); });
app.put("/api/admin/gallery-order", admin, (req, res) => { reorder("gallery", arr(req.body.ids, 1000)); res.json({ ok: true }); });

/* ---------------- Admin: course videos ---------------- */
app.get("/api/admin/videos", admin, (req, res) => res.json({ videos: db.prepare("SELECT * FROM videos ORDER BY position, id").all().map(videoOut), maxMb: Math.round(MAX_VIDEO / 1048576) }));
function videoFields(b) {
  const { kind, src } = parseVideo(b.src);
  const mid = b.module_id == null || b.module_id === "" ? null : +b.module_id;
  if (mid != null && !db.prepare("SELECT 1 FROM modules WHERE id = ?").get(mid)) fail(400, "bad_module");
  const title = pair(b.title, 200);
  if (!title.en.trim() && !title.ar.trim()) fail(400, "title_required");
  return { kind, src, module_id: mid, poster: safeSrc(b.poster), duration: str(b.duration, 12).trim(), title, desc: pair(b.desc, 4000), published: b.published === false ? 0 : 1 };
}
/** Remove an uploaded video file once no video row points at it any more. */
function dropVideoFile(src) {
  if (!src || !src.startsWith("/uploads/videos/") || db.prepare("SELECT 1 FROM videos WHERE src = ?").get(src)) return;
  rmSync(join(VIDEOS, basename(src)), { force: true });
}
app.post("/api/admin/videos", admin, (req, res) => {
  const f = videoFields(req.body), pos = (db.prepare("SELECT MAX(position) p FROM videos").get().p ?? -1) + 1;
  const { lastInsertRowid: id } = db.prepare("INSERT INTO videos (module_id, position, published, kind, src, poster, duration, title_en, title_ar, desc_en, desc_ar, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")
    .run(f.module_id, pos, f.published, f.kind, f.src, f.poster, f.duration, f.title.en, f.title.ar, f.desc.en, f.desc.ar, now());
  res.status(201).json({ video: videoOut(db.prepare("SELECT * FROM videos WHERE id = ?").get(id)) });
});
app.put("/api/admin/videos/:id", admin, (req, res) => {
  const v = db.prepare("SELECT * FROM videos WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  const f = videoFields(req.body);
  db.prepare("UPDATE videos SET module_id=?, published=?, kind=?, src=?, poster=?, duration=?, title_en=?, title_ar=?, desc_en=?, desc_ar=? WHERE id=?")
    .run(f.module_id, f.published, f.kind, f.src, f.poster, f.duration, f.title.en, f.title.ar, f.desc.en, f.desc.ar, v.id);
  if (v.src !== f.src) dropVideoFile(v.src);
  res.json({ video: videoOut(db.prepare("SELECT * FROM videos WHERE id = ?").get(v.id)) });
});
/* Discard an uploaded file the admin never saved (closing the form after uploading). Files a video row uses are kept.
   Registered before /videos/:id so "upload" isn't read as an id. */
app.delete("/api/admin/videos/upload", admin, (req, res) => { const src = str(req.body.src, 300); if (/^\/uploads\/videos\/[\w.\-]+$/.test(src)) dropVideoFile(src); res.json({ ok: true }); });
app.delete("/api/admin/videos/:id", admin, (req, res) => {
  const v = db.prepare("SELECT * FROM videos WHERE id = ?").get(+req.params.id) || fail(404, "not_found");
  db.prepare("DELETE FROM videos WHERE id = ?").run(v.id);
  dropVideoFile(v.src);
  res.json({ ok: true });
});
app.put("/api/admin/videos-order", admin, (req, res) => { reorder("videos", arr(req.body.ids, 2000)); res.json({ ok: true }); });
/* Raw upload: the body is the video itself (Content-Type video/*, file name in X-File-Name), streamed to disk. */
const VIDEO_MIME = { "video/mp4": ".mp4", "video/webm": ".webm", "video/ogg": ".ogv", "video/quicktime": ".mov" };
app.post("/api/admin/videos/upload", admin, (req, res) => {
  const ext = VIDEO_MIME[String(req.headers["content-type"] || "").split(";")[0].trim().toLowerCase()];
  if (!ext) return res.status(400).json({ error: "unsupported_video" });
  if (+req.headers["content-length"] > MAX_VIDEO) return res.status(413).set("Connection", "close").json({ error: "video_too_large" });
  let raw = ""; try { raw = decodeURIComponent(String(req.headers["x-file-name"] || "")); } catch { /* keep default */ }
  const base = basename(raw, extname(raw)).replace(/[^\w\-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "video";
  const file = `${base}-${randomBytes(4).toString("hex")}${ext}`, path = join(VIDEOS, file);
  const out = createWriteStream(path);
  let size = 0, finished = false;
  const abort = (status, code) => {
    if (finished) return; finished = true;
    req.unpipe(out); out.destroy(); rmSync(path, { force: true });
    if (!res.headersSent && !res.destroyed) res.status(status).set("Connection", "close").json({ error: code });
    req.resume();
  };
  req.on("data", (c) => { size += c.length; if (size > MAX_VIDEO) abort(413, "video_too_large"); });
  req.on("close", () => { if (!req.complete) abort(400, "upload_aborted"); });
  out.on("error", (e) => { console.error(e); abort(500, "server_error"); });
  out.on("finish", () => {
    if (finished) return; finished = true;
    if (!size) { rmSync(path, { force: true }); return res.status(400).json({ error: "unsupported_video" }); }
    res.status(201).json({ src: "/uploads/videos/" + file, size });
  });
  req.pipe(out);
});

/* ---------------- Admin: media library ---------------- */
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
function listDir(dir, prefix, deletable) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => IMG_EXT.has(extname(f).toLowerCase())).map(f => ({ src: `${prefix}/${f}`, name: f, size: statSync(join(dir, f)).size, deletable, folder: prefix.slice(1) }));
}
app.get("/api/admin/media", admin, (req, res) => {
  const usage = new Map();
  const count = (s) => s && usage.set(s, (usage.get(s) || 0) + 1);
  db.prepare("SELECT cover FROM modules").all().forEach(r => count(r.cover));
  db.prepare("SELECT image FROM lessons").all().forEach(r => count(r.image));
  db.prepare("SELECT src FROM gallery").all().forEach(r => count(r.src));
  const items = [...listDir(UPLOADS, "/uploads", true), ...listDir(join(ROOT, "images"), "/images", false), ...listDir(join(ROOT, "public", "assets", "art"), "/assets/art", false)];
  res.json({ media: items.map(m => ({ ...m, used: usage.get(m.src) || 0 })) });
});
const MIME = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" };
app.post("/api/admin/media", admin, (req, res) => {
  const m = /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/.exec(str(req.body.data, 16e6)) || fail(400, "unsupported_image");
  const buf = Buffer.from(m[2], "base64");
  if (buf.length > 8 * 1024 * 1024) fail(413, "image_too_large");
  const base = basename(str(req.body.name, 80), extname(str(req.body.name, 80))).replace(/[^\w\-]+/g, "-").slice(0, 40) || "image";
  const file = `${base}-${randomBytes(4).toString("hex")}${MIME[m[1]]}`;
  writeFileSync(join(UPLOADS, file), buf);
  res.status(201).json({ src: "/uploads/" + file });
});
app.delete("/api/admin/media", admin, (req, res) => {
  const name = basename(str(req.body.src, 200));
  if (!str(req.body.src, 200).startsWith("/uploads/") || !existsSync(join(UPLOADS, name))) fail(404, "not_found");
  unlinkSync(join(UPLOADS, name)); res.json({ ok: true });
});

/* ---------------- Admin: settings ---------------- */
app.get("/api/admin/settings", admin, (req, res) => res.json({ settings: getSettings() }));
app.put("/api/admin/settings", admin, (req, res) => {
  const b = req.body;
  if (b.site_name) setSetting("site_name", pair(b.site_name, 80));
  if (b.announcement) setSetting("announcement", pair(b.announcement, 300));
  if (Array.isArray(b.hero_images)) setSetting("hero_images", b.hero_images.slice(0, 8).map(safeSrc).filter(Boolean));
  if (b.default_lang === "ar" || b.default_lang === "en") setSetting("default_lang", b.default_lang);
  if (typeof b.registration_open === "boolean") setSetting("registration_open", b.registration_open);
  res.json({ settings: getSettings() });
});

/* ---------------- Static files & errors ---------------- */
app.use("/api", (req, res) => res.status(404).json({ error: "not_found" }));
const cache = { maxAge: PROD ? "7d" : 0 };
app.use("/images", express.static(join(ROOT, "images"), cache));
app.use("/uploads", express.static(UPLOADS, { ...cache, setHeaders: (r) => r.set("Content-Security-Policy", "default-src 'none'; img-src 'self'; media-src 'self'; style-src 'unsafe-inline'") }));
app.use(express.static(join(ROOT, "public"), { maxAge: PROD ? "1h" : 0 }));
app.get("/admin", (req, res) => res.redirect("/#/admin"));
app.use((err, req, res, next) => {
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.code });
  if (err.type === "entity.too.large") return res.status(413).json({ error: "too_large" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "bad_json" });
  console.error(err); res.status(500).json({ error: "server_error" });
});

app.listen(PORT, () => {
  console.log(`Game Academy running → http://localhost:${PORT}`);
  if (firstAdmin) console.log(`First admin account created → ${firstAdmin.email} / ${firstAdmin.password}\n(also saved to data/initial-admin.txt — change the password, then delete that file)`);
});
