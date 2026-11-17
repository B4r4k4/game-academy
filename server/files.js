/* Uploaded files (media library images, uploaded videos) normally live only in uploads/.
   With Turso (REMOTE) the disk is wiped on every restart, so each file is also stored in the `files` table
   in 1 MB parts and written back to uploads/ when the server starts. */
import { openSync, readSync, closeSync, writeFileSync, appendFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { db, REMOTE, tx } from "./db.js";

const PART = 1024 * 1024;

/** Copy a file from disk into the database. `rel` is its path under uploads/, e.g. "photo-ab12.jpg" or "videos/x.mp4". */
export function persistFile(rel, abs) {
  if (!REMOTE) return;
  const size = statSync(abs).size, fd = openSync(abs, "r");
  try {
    tx(() => {
      db.prepare("DELETE FROM files WHERE path = ?").run(rel);
      const ins = db.prepare("INSERT INTO files (path, part, data) VALUES (?, ?, ?)");
      for (let off = 0, part = 0; off < size; off += PART, part++) {
        const buf = Buffer.alloc(Math.min(PART, size - off));
        readSync(fd, buf, 0, buf.length, off);
        ins.run(rel, part, buf);
      }
    });
  } finally { closeSync(fd); }
}

export function forgetFile(rel) {
  if (REMOTE) db.prepare("DELETE FROM files WHERE path = ?").run(rel);
}

/** On start: write every stored file that is missing from uploads/. */
export function restoreFiles(uploadsDir) {
  if (!REMOTE) return 0;
  let n = 0;
  for (const { path } of db.prepare("SELECT DISTINCT path FROM files").all()) {
    const abs = join(uploadsDir, path);
    if (!abs.startsWith(uploadsDir) || existsSync(abs)) continue;
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, Buffer.alloc(0));
    for (const r of db.prepare("SELECT data FROM files WHERE path = ? ORDER BY part").iterate(path)) appendFileSync(abs, Buffer.from(r.data));
    n++;
  }
  return n;
}
