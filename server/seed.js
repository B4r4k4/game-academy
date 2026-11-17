/* Seeds course content and the first admin account.
   node server/seed.js            → seeds only if the database has no modules yet
   node server/seed.js --reset    → wipes and re-seeds content (users are kept)
   node server/seed.js --admin email password [name]   → creates/promotes an admin */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { db, ROOT, hashPassword, now, setSetting, tx } from "./db.js";
import ar from "./seed/ar.js";
import { defaultGenresFor } from "./genres.js";

import expansion from "./seed/expansion.js";
import deepen from "./seed/deepen.js";

const en = JSON.parse(readFileSync(join(ROOT, "server", "seed", "en.json"), "utf8"));
const S = JSON.stringify;

/* Merge server/seed/expansion.js (new modules and lessons) into the en/ar seed and apply its module order. */
(function mergeExpansion() {
  for (const m of expansion.modules) {
    en.modules.push({ slug: m.slug, icon: m.icon, color: m.color, cover: m.cover, lab: m.lab, ...m.en, lessons: m.en.lessons.map(l => ({ image: "", ...l })) });
    ar.modules[m.slug] = { ...m.ar };
  }
  for (const [slug, list] of Object.entries(expansion.lessons)) {
    const e = en.modules.find(x => x.slug === slug);
    for (const l of list) { e.lessons.push({ image: l.image || "", ...l.en }); ar.modules[slug].lessons.push(l.ar); }
  }
  const rank = (s) => { const i = expansion.order.indexOf(s); return i < 0 ? 999 : i; };
  en.modules.sort((a, b) => rank(a.slug) - rank(b.slug));
  en.modules.forEach((m, i) => { m.position = i; m.num = String(i + 1).padStart(2, "0"); });
})();

/* Merge server/seed/deepen.js (v4: deeper lessons + workshops) into the seed: rewrite matched lessons, append new ones. */
(function mergeDeepen() {
  for (const [slug, list] of Object.entries(deepen.modules)) {
    const e = en.modules.find(x => x.slug === slug), a = ar.modules[slug];
    if (!e || !a) throw new Error(`deepen.js: unknown module "${slug}"`);
    for (const d of list) {
      if (d.match) {
        const i = e.lessons.findIndex(l => l.title === d.match);
        if (i < 0) throw new Error(`deepen.js: no lesson "${d.match}" in ${slug}`);
        e.lessons[i] = { ...e.lessons[i], ...d.en, image: d.image || e.lessons[i].image || "" };
        a.lessons[i] = { ...a.lessons[i], ...d.ar };
      } else {
        e.lessons.push({ image: d.image || "", ...d.en });
        a.lessons.push(d.ar);
      }
    }
  }
})();
const CONTENT_VERSION = Math.max(expansion.version, deepen.version);

/* Databases seeded before v4 get the deeper lessons once: matched lessons (by module + English title) are updated in place,
   new lessons are appended (skipped if a lesson with that title already exists). Admin edits made after this run are kept. */
function syncDeepen() {
  const done = db.prepare("SELECT value FROM settings WHERE key = 'content_version'").get();
  if (done && +JSON.parse(done.value) >= deepen.version) return;
  tx(() => {
    const upd = db.prepare("UPDATE lessons SET title_en = ?, title_ar = ?, body_en = ?, body_ar = ?, image = CASE WHEN ? = '' THEN image ELSE ? END WHERE id = ?");
    const insL = db.prepare("INSERT INTO lessons (module_id, position, title_en, title_ar, body_en, body_ar, image) VALUES (?,?,?,?,?,?,?)");
    for (const [slug, list] of Object.entries(deepen.modules)) {
      const mod = db.prepare("SELECT id FROM modules WHERE slug = ?").get(slug);
      if (!mod) continue;
      const find = db.prepare("SELECT id FROM lessons WHERE module_id = ? AND title_en = ?");
      let lp = db.prepare("SELECT COALESCE(MAX(position), -1) p FROM lessons WHERE module_id = ?").get(mod.id).p;
      for (const d of list) {
        const img = d.image || "";
        if (d.match) {
          const row = find.get(mod.id, d.match);
          if (row) upd.run(d.en.title, d.ar.title, d.en.body, d.ar.body, img, img, row.id);
        } else if (!find.get(mod.id, d.en.title)) {
          insL.run(mod.id, ++lp, d.en.title, d.ar.title, d.en.body, d.ar.body, img);
        }
      }
    }
  });
  setSetting("content_version", deepen.version);
}

/* Databases seeded before the expansion get it once: missing modules are inserted, new lessons appended
   (matched by English title so nothing is duplicated), and the seed modules take the new order.
   Runs only once (setting "content_version"), so later admin deletions or reordering are respected. */
function syncExpansion() {
  const done = db.prepare("SELECT value FROM settings WHERE key = 'content_version'").get();
  if (done && +JSON.parse(done.value) >= expansion.version) return;
  tx(() => {
    const insM = db.prepare(`INSERT INTO modules (slug, num, icon, color, cover, lab, position, title_en, title_ar, tagline_en, tagline_ar, takeaways_en, takeaways_ar)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    const insL = db.prepare("INSERT INTO lessons (module_id, position, title_en, title_ar, body_en, body_ar, image) VALUES (?,?,?,?,?,?,?)");
    for (const m of en.modules) {
      const a = ar.modules[m.slug];
      let row = db.prepare("SELECT id FROM modules WHERE slug = ?").get(m.slug);
      if (!row) {
        const { lastInsertRowid } = insM.run(m.slug, m.num, m.icon, m.color, m.cover, m.lab ? 1 : 0, m.position, m.title, a.title, m.tagline, a.tagline, S(m.takeaways), S(a.takeaways));
        m.lessons.forEach((l, i) => insL.run(lastInsertRowid, i, l.title, a.lessons[i].title, l.body, a.lessons[i].body, l.image || ""));
        continue;
      }
      db.prepare("UPDATE modules SET position = ?, num = ? WHERE id = ?").run(m.position, m.num, row.id);
      const titles = new Set(db.prepare("SELECT title_en FROM lessons WHERE module_id = ?").all(row.id).map(r => r.title_en));
      let lp = db.prepare("SELECT COALESCE(MAX(position), -1) p FROM lessons WHERE module_id = ?").get(row.id).p;
      for (const l of expansion.lessons[m.slug] || []) if (!titles.has(l.en.title)) insL.run(row.id, ++lp, l.en.title, l.ar.title, l.en.body, l.ar.body, l.image || "");
    }
  });
  setSetting("content_version", expansion.version);
}

/* Rewrites links to the removed Hall of Fame page in already-seeded lessons (exact sentences only, so admin edits are untouched). */
const DEAD_LINKS = [
  ["body_en", 'Find your own archetype with the quiz in the <a href="#/hall">Hall of Fame</a>.', 'Design your own hero in the <a href="#/studio">Design Studio</a>.'],
  ["body_en", 'Explore more in the <a href="#/hall">Hall of Fame</a>.', 'Explore more in the <a href="#/games">Games Showcase</a>.'],
  ["body_ar", 'اكتشف نمطك البطولي من خلال الاختبار في <a href="#/hall">قاعة المشاهير</a>.', 'صمّم بطلك الخاص في <a href="#/studio">استوديو التصميم</a>.'],
  ["body_ar", 'اكتشف المزيد في <a href="#/hall">قاعة المشاهير</a>.', 'اكتشف المزيد في <a href="#/games">معرض الألعاب</a>.']
];
function fixDeadLinks() {
  for (const [col, from, to] of DEAD_LINKS) db.prepare(`UPDATE lessons SET ${col} = REPLACE(${col}, ?, ?) WHERE instr(${col}, ?) > 0`).run(from, to, from);
}

export function seedContent({ reset = false } = {}) {
  fixDeadLinks();
  const has = db.prepare("SELECT COUNT(*) n FROM modules").get().n;
  if (has && !reset) { syncExpansion(); syncDeepen(); return false; }
  tx(() => {
    db.exec("DELETE FROM lessons; DELETE FROM modules; DELETE FROM gallery;");
    const insM = db.prepare(`INSERT INTO modules (slug, num, icon, color, cover, lab, position, title_en, title_ar, tagline_en, tagline_ar, takeaways_en, takeaways_ar)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    const insL = db.prepare("INSERT INTO lessons (module_id, position, title_en, title_ar, body_en, body_ar, image) VALUES (?,?,?,?,?,?,?)");
    for (const m of en.modules) {
      const a = ar.modules[m.slug];
      const { lastInsertRowid: mid } = insM.run(m.slug, m.num, m.icon, m.color, m.cover, m.lab ? 1 : 0, m.position, m.title, a.title, m.tagline, a.tagline, S(m.takeaways), S(a.takeaways));
      m.lessons.forEach((l, i) => insL.run(mid, i, l.title, a.lessons[i].title, l.body, a.lessons[i].body, l.image || ""));
    }
    const insG = db.prepare("INSERT INTO gallery (position, src, title_en, title_ar, tags, genres, notes_en, notes_ar) VALUES (?,?,?,?,?,?,?,?)");
    en.gallery.forEach((g, i) => insG.run(i, g.src, g.title, ar.gallery[i].title, S(g.tags), S(defaultGenresFor(g.src)), S(g.notes), S(ar.gallery[i].notes)));
  });
  const defaults = {
    site_name: { en: "Game Academy", ar: "أكاديمية الألعاب" },
    announcement: { en: "", ar: "" },
    hero_images: en.heroImages,
    default_lang: "ar",
    registration_open: true,
    content_version: CONTENT_VERSION
  };
  for (const [k, v] of Object.entries(defaults)) if (reset || !db.prepare("SELECT 1 FROM settings WHERE key = ?").get(k)) setSetting(k, v);
  return true;
}

export function upsertAdmin(email, password, name = "Admin") {
  const u = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (u) db.prepare("UPDATE users SET role = 'admin', pass = ?, disabled = 0 WHERE id = ?").run(hashPassword(password), u.id);
  else db.prepare("INSERT INTO users (name, email, pass, role, lang, created_at) VALUES (?, ?, ?, 'admin', 'ar', ?)").run(name, email, hashPassword(password), now());
}

/** First run: make sure an admin exists. Uses ADMIN_EMAIL / ADMIN_PASSWORD when set. */
export function ensureAdmin() {
  if (db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get()) return null;
  const email = process.env.ADMIN_EMAIL || "admin@game-academy.local";
  const password = process.env.ADMIN_PASSWORD || randomBytes(9).toString("base64url");
  upsertAdmin(email, password);
  if (!process.env.ADMIN_PASSWORD) {
    writeFileSync(join(ROOT, "data", "initial-admin.txt"), `Game Academy admin\nemail: ${email}\npassword: ${password}\nChange this password after signing in, then delete this file.\n`);
  }
  return { email, password: process.env.ADMIN_PASSWORD ? "(from ADMIN_PASSWORD)" : password };
}

if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  const args = process.argv.slice(2);
  if (args[0] === "--admin") {
    if (!args[1] || !args[2] || args[2].length < 8) { console.error("Usage: node server/seed.js --admin <email> <password (8+ chars)> [name]"); process.exit(1); }
    upsertAdmin(args[1], args[2], args[3]); console.log("Admin ready:", args[1]);
  } else {
    console.log(seedContent({ reset: args.includes("--reset") }) ? "Content seeded." : "Content already present (use --reset to re-seed).");
    const a = ensureAdmin(); if (a) console.log(`Admin created → ${a.email} / ${a.password}`);
  }
}
