import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { defaultGenresFor } from "./genres.js";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = process.env.DATA_DIR || join(ROOT, "data");
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(join(dataDir, "academy.db"));
db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, pass TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', lang TEXT NOT NULL DEFAULT 'ar', xp INTEGER NOT NULL DEFAULT 0,
  state TEXT NOT NULL DEFAULT '{}', disabled INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL, last_seen INTEGER
);
CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS modules (
  id INTEGER PRIMARY KEY, slug TEXT NOT NULL UNIQUE, num TEXT, icon TEXT, color TEXT, cover TEXT, lab INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0, published INTEGER DEFAULT 1,
  title_en TEXT, title_ar TEXT, tagline_en TEXT, tagline_ar TEXT, takeaways_en TEXT DEFAULT '[]', takeaways_ar TEXT DEFAULT '[]'
);
CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY, module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE, position INTEGER DEFAULT 0,
  title_en TEXT, title_ar TEXT, body_en TEXT, body_ar TEXT, image TEXT DEFAULT ''
);
DROP TABLE IF EXISTS quiz;
CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY, position INTEGER DEFAULT 0, src TEXT NOT NULL, published INTEGER DEFAULT 1,
  title_en TEXT, title_ar TEXT, tags TEXT DEFAULT '[]', notes_en TEXT DEFAULT '[]', notes_ar TEXT DEFAULT '[]'
);
CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY, module_id INTEGER REFERENCES modules(id) ON DELETE SET NULL, position INTEGER DEFAULT 0, published INTEGER DEFAULT 1,
  kind TEXT NOT NULL DEFAULT 'file', src TEXT NOT NULL, poster TEXT DEFAULT '', duration TEXT DEFAULT '',
  title_en TEXT, title_ar TEXT, desc_en TEXT, desc_ar TEXT, created_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_videos_pos ON videos(position, id);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id, position);
`);

/* Migration: gallery.genres (game types). Existing rows get the default classification. */
if (!db.prepare("PRAGMA table_info(gallery)").all().some(c => c.name === "genres")) {
  db.exec("ALTER TABLE gallery ADD COLUMN genres TEXT DEFAULT '[]'");
  const up = db.prepare("UPDATE gallery SET genres = ? WHERE id = ?");
  for (const r of db.prepare("SELECT id, src FROM gallery").all()) up.run(JSON.stringify(defaultGenresFor(r.src)), r.id);
}

export const now = () => Date.now();
export const J = (s, d = null) => { try { return JSON.parse(s); } catch { return d; } };

/* Passwords: scrypt with a per-user salt. */
export function hashPassword(pw) {
  const salt = randomBytes(16).toString("hex");
  return salt + ":" + scryptSync(pw, salt, 64).toString("hex");
}
export function checkPassword(pw, stored) {
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const a = Buffer.from(hash, "hex"), b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* Sessions */
const SESSION_DAYS = 30;
export function createSession(userId) {
  const token = randomBytes(32).toString("base64url");
  db.prepare("INSERT INTO sessions (token, user_id, expires) VALUES (?, ?, ?)").run(token, userId, now() + SESSION_DAYS * 864e5);
  return { token, maxAge: SESSION_DAYS * 864e5 };
}
export function userFromSession(token) {
  if (!token) return null;
  const row = db.prepare("SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires > ? AND u.disabled = 0").get(token, now());
  return row || null;
}
export const destroySession = (token) => db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
export const pruneSessions = () => db.prepare("DELETE FROM sessions WHERE expires < ?").run(now());

export function publicUser(u) {
  if (!u) return null;
  return { id: u.id, name: u.name, email: u.email, role: u.role, lang: u.lang, xp: u.xp, state: J(u.state, {}), created_at: u.created_at };
}

export function getSettings() {
  const out = {};
  for (const r of db.prepare("SELECT key, value FROM settings").all()) out[r.key] = J(r.value, r.value);
  return out;
}
export function setSetting(key, value) {
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(key, JSON.stringify(value));
}

export function tx(fn) {
  db.exec("BEGIN");
  try { const r = fn(); db.exec("COMMIT"); return r; } catch (e) { db.exec("ROLLBACK"); throw e; }
}
