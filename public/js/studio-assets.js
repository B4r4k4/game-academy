/* Game Academy — Design Studio assets: the learner's own images & music for a design, plus a tiny ZIP writer.
   Files stay in this browser (IndexedDB) and never go to the server: the account state is capped at 200 KB, and keeping
   uploads local avoids hosting, moderation and copyright exposure. Exposes window.GAAssets. */
(function () {
  const DB = "ga-studio", STORE = "assets";
  let dbP = null;
  const open = () => dbP || (dbP = new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result); r.onerror = () => { dbP = null; rej(r.error); };
  }));
  const run = async (mode, fn) => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, mode), st = tx.objectStore(STORE), req = fn(st);
      tx.oncomplete = () => res(req?.result); tx.onerror = tx.onabort = () => rej(tx.error);
    });
  };

  let have = new Set(); // keys known to exist, so the view can render synchronously
  const urls = new Map(); // key → object URL (revoked when the asset changes)
  const drop = (k) => { const u = urls.get(k); if (u) { URL.revokeObjectURL(u); urls.delete(k); } };

  const LIMITS = { img: 3 * 1024 * 1024, audio: 10 * 1024 * 1024 };
  const TYPES = { img: /^image\/(png|jpeg|webp|gif)$/, audio: /^audio\/(mpeg|mp3|ogg|wav|x-wav|wave|mp4|x-m4a|aac|webm)$/ };

  const A = {
    LIMITS,
    /** null if the file is acceptable for that kind, else "type" or "size". */
    check: (file, kind) => !TYPES[kind].test(file.type) ? "type" : file.size > LIMITS[kind] ? "size" : null,
    put: async (key, file) => { await run("readwrite", st => st.put({ blob: file, name: file.name, type: file.type }, key)); have.add(key); drop(key); },
    get: (key) => run("readonly", st => st.get(key)).catch(() => null),
    del: async (key) => { drop(key); have.delete(key); try { await run("readwrite", st => st.delete(key)); } catch (e) { /* storage unavailable */ } },
    clear: async () => { [...urls.keys()].forEach(drop); have.clear(); try { await run("readwrite", st => st.clear()); } catch (e) { /* storage unavailable */ } },
    /** Object URL for a stored asset, or "" when there is none. */
    url: async (key) => {
      if (urls.has(key)) return urls.get(key);
      const r = await A.get(key); if (!r) { have.delete(key); return ""; }
      const u = URL.createObjectURL(r.blob); urls.set(key, u); return u;
    },
    ext: (r) => {
      const m = /\.([a-z0-9]{2,4})$/i.exec(r.name || ""); if (m) return m[1].toLowerCase();
      return ({ "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif", "audio/mpeg": "mp3", "audio/ogg": "ogg", "audio/wav": "wav" })[r.type] || "bin";
    },
    has: (key) => have.has(key),
    zip
  };
  A.ready = run("readonly", st => st.getAllKeys()).then(k => { have = new Set(k); }).catch(() => {});

  /* ---------- Minimal ZIP writer (stored, no compression — images/audio are already compressed) ---------- */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = (u8) => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  /** files: [{ path, data: string | Blob | Uint8Array }] → Blob (application/zip). Paths are UTF-8 (flag bit 11). */
  async function zip(files) {
    const enc = new TextEncoder(), parts = [], central = [];
    const d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    let offset = 0;
    for (const f of files) {
      const data = typeof f.data === "string" ? enc.encode(f.data) : f.data instanceof Blob ? new Uint8Array(await f.data.arrayBuffer()) : f.data;
      const name = enc.encode(f.path), crc = crc32(data);
      const head = (sig, central) => {
        const b = new DataView(new ArrayBuffer(central ? 46 : 30)); let p = 0;
        const u32 = (v) => { b.setUint32(p, v, true); p += 4; }, u16 = (v) => { b.setUint16(p, v, true); p += 2; };
        u32(sig); if (central) u16(20); u16(20); u16(0x0800); u16(0); u16(time); u16(date); u32(crc); u32(data.length); u32(data.length); u16(name.length); u16(0);
        if (central) { u16(0); u16(0); u16(0); u32(0); u32(offset); }
        return new Uint8Array(b.buffer);
      };
      const local = head(0x04034b50, false);
      parts.push(local, name, data);
      central.push(head(0x02014b50, true), name);
      offset += local.length + name.length + data.length;
    }
    const cSize = central.reduce((n, x) => n + x.length, 0), end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cSize, true); end.setUint32(16, offset, true);
    return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: "application/zip" });
  }

  window.GAAssets = A;
})();
