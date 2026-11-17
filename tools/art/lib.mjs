/* Shared SVG drawing helpers for Game Academy original artwork. */
export const F = "'Trebuchet MS','Segoe UI',Verdana,sans-serif";

export function rng(seed = 1) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const r1 = (n) => Math.round(n * 10) / 10;

const BASE_CSS = `
.bob{animation:bob 4s ease-in-out infinite alternate}@keyframes bob{to{transform:translateY(-12px)}}
.tw{animation:tw 2.4s ease-in-out infinite alternate}@keyframes tw{to{opacity:.12}}
.drift{animation:drift 40s ease-in-out infinite alternate}@keyframes drift{to{transform:translateX(140px)}}
.driftL{animation:driftL 34s ease-in-out infinite alternate}@keyframes driftL{to{transform:translateX(-140px)}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 1.6s ease-in-out infinite alternate}@keyframes pulse{to{transform:scale(1.2);opacity:.55}}
.flick{transform-box:fill-box;transform-origin:50% 100%;animation:flick .16s steps(2) infinite alternate}@keyframes flick{to{transform:scale(.88,1.08);opacity:.8}}
.glowf{animation:glowf 2.4s ease-in-out infinite alternate}@keyframes glowf{to{opacity:.4}}
.spin{transform-box:fill-box;transform-origin:center;animation:spin 24s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.spinR{transform-box:fill-box;transform-origin:center;animation:spin 24s linear infinite reverse}
.sway{transform-box:fill-box;transform-origin:50% 100%;animation:sway 3.6s ease-in-out infinite alternate}@keyframes sway{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg)}}
.flag{transform-box:fill-box;transform-origin:0 50%;animation:flag 1.2s ease-in-out infinite alternate}@keyframes flag{to{transform:skewY(8deg) scaleX(.9)}}
.dash{animation:dash 1.4s linear infinite}@keyframes dash{to{stroke-dashoffset:-28}}
.rise{animation:rise 2.8s ease-out infinite}@keyframes rise{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(-70px);opacity:0}}
.fall{animation:fall 7s linear infinite}@keyframes fall{0%{transform:translate(0,-40px) rotate(0);opacity:0}10%{opacity:1}100%{transform:translate(40px,520px) rotate(300deg);opacity:0}}
.flap{transform-box:fill-box;transform-origin:center;animation:flap .22s ease-in-out infinite alternate}@keyframes flap{to{transform:scaleY(.35)}}
.coin{transform-box:fill-box;transform-origin:center;animation:coin 1.6s ease-in-out infinite}@keyframes coin{50%{transform:scaleX(.12)}}
.grow{transform-box:fill-box;transform-origin:left center;animation:grow 3.5s ease-in-out infinite alternate}@keyframes grow{from{transform:scaleX(.12)}}
.wave{animation:wave 5s ease-in-out infinite alternate}@keyframes wave{to{transform:translateX(-36px)}}
.float{transform-box:fill-box;transform-origin:center;animation:float 5s ease-in-out infinite alternate}@keyframes float{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-18px) rotate(2deg)}}
.marchR{animation:marchR 9s linear infinite}@keyframes marchR{from{transform:translateX(0)}to{transform:translateX(330px)}}
.marchL{animation:marchL 9s linear infinite}@keyframes marchL{from{transform:translateX(0)}to{transform:translateX(-330px)}}
.hop{animation:hop .45s ease-in-out infinite alternate}@keyframes hop{to{transform:translateY(-6px)}}
.sweep{animation:sweep 2.6s linear infinite}@keyframes sweep{from{stroke-dashoffset:0}to{stroke-dashoffset:-260}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;

/** Wrap an SVG document. */
export function svg({ w = 1200, h = 750, title = "", defs = "", css = "", body = "", bg, attrs = "" }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" ${attrs}><title>${title}</title><defs>${defs}</defs><style>${BASE_CSS}${css}</style>${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}${body}</svg>`;
}
/** Animated group. Keep transforms on an outer group so CSS animation doesn't override them. */
export const A = (cls, inner, delay = 0, dur) => `<g class="${cls}" style="animation-delay:${-Math.abs(delay).toFixed(2)}s${dur ? `;animation-duration:${dur}s` : ""}">${inner}</g>`;
export const T = (x, y, inner, s = 1, rot = 0) => `<g transform="translate(${r1(x)} ${r1(y)})${s !== 1 ? ` scale(${s})` : ""}${rot ? ` rotate(${rot})` : ""}">${inner}</g>`;
export const lin = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join("")}</linearGradient>`;
export const rad = (id, stops, cx = .5, cy = .5, r = .5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`).join("")}</radialGradient>`;
export const glowFilter = (id = "glow", sd = 6) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
export const blurFilter = (id = "blur", sd = 4) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
export const shadowFilter = (id = "drop") => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity=".35"/></filter>`;

export function txt(x, y, s, o = {}) {
  const { size = 24, fill = "#fff", w = 700, anchor = "middle", ls = 0, font = F, op = 1, stroke, sw = 0, extra = "" } = o;
  s = String(s).replace(/&(?![a-z]+;|#\d+;)/gi, "&amp;");
  return `<text x="${r1(x)}" y="${r1(y)}" font-family="${font}" font-size="${size}" font-weight="${w}" fill="${fill}" text-anchor="${anchor}"${ls ? ` letter-spacing="${ls}"` : ""}${op !== 1 ? ` opacity="${op}"` : ""}${stroke ? ` stroke="${stroke}" stroke-width="${sw}" paint-order="stroke" stroke-linejoin="round"` : ""} ${extra}>${s}</text>`;
}
export const rr = (x, y, w, h, r, fill, extra = "") => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${r}" fill="${fill}" ${extra}/>`;
export const circ = (cx, cy, r, fill, extra = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}" fill="${fill}" ${extra}/>`;
export const poly = (pts, fill, extra = "") => `<polygon points="${pts.map(p => p.map(r1).join(",")).join(" ")}" fill="${fill}" ${extra}/>`;
export const path = (d, fill, extra = "") => `<path d="${d}" fill="${fill}" ${extra}/>`;

export function stars(rand, n, w, h, { color = "#fff", maxR = 1.8 } = {}) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const r = rand() * maxR + .4;
    s += A("tw", circ(rand() * w, rand() * h, r, color, `opacity="${(.4 + rand() * .6).toFixed(2)}"`), rand() * 3, 1.6 + rand() * 2.4);
  }
  return s;
}

/** Two-tone stacked pine. (x,y) = base of trunk. */
export function pine(x, y, h, light = "#5cc26a", dark = "#2f8f4f", trunk = "#6b4a3a", tiers = 3) {
  const w = h * .42; let s = rr(x - h * .04, y - h * .16, h * .08, h * .18, 2, trunk);
  for (let i = 0; i < tiers; i++) {
    const tb = y - h * .12 - i * h * .25, tt = tb - h * .42, tw = w * (1 - i * .22);
    s += poly([[x - tw, tb], [x, tt], [x, tb + h * .03]], light) + poly([[x, tt], [x + tw, tb], [x, tb + h * .03]], dark);
  }
  return s;
}
/** Round canopy tree. */
export function bush(x, y, s, c1 = "#6fd28a", c2 = "#3fa866", trunk = "#7a5236") {
  return rr(x - 5 * s, y - 26 * s, 10 * s, 28 * s, 3 * s, trunk) +
    circ(x - 16 * s, y - 34 * s, 20 * s, c2) + circ(x + 16 * s, y - 34 * s, 20 * s, c2) + circ(x, y - 50 * s, 24 * s, c1) + circ(x - 8 * s, y - 58 * s, 10 * s, "#fff", 'opacity=".15"');
}
export function cloud(x, y, s = 1, fill = "#fff", op = 1) {
  return `<g opacity="${op}">${circ(x, y, 34 * s, fill)}${circ(x + 40 * s, y - 14 * s, 42 * s, fill)}${circ(x + 86 * s, y, 32 * s, fill)}${rr(x - 2 * s, y - 4 * s, 92 * s, 36 * s, 18 * s, fill)}</g>`;
}
/** Mountain ridge polygon across width. */
export function ridge(rand, w, baseY, amp, peaks, fill, extra = "", H = 2000) {
  const pts = [[0, H]]; const step = w / peaks;
  for (let i = 0; i <= peaks; i++) {
    pts.push([i * step, baseY - rand() * amp * .4]);
    if (i < peaks) pts.push([i * step + step * (.35 + rand() * .3), baseY - amp * (.55 + rand() * .45)]);
  }
  pts.push([w, H]);
  return poly(pts, fill, extra);
}
export function gearPath(cx, cy, teeth, ro, ri) {
  let d = ""; const n = teeth * 4;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, r = (i % 4 < 2) ? ro : ri;
    d += (i ? "L" : "M") + r1(cx + Math.cos(a) * r) + " " + r1(cy + Math.sin(a) * r);
  }
  return d + "Z";
}
export function starShape(cx, cy, ro, ri = ro * .45, n = 5) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, r = i % 2 ? ri : ro; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
  return pts;
}
export const lanternGlowDef = (id = "lanternGlow") => rad(id, [[0, "#fff6c9", .95], [.25, "#ffd36b", .55], [1, "#ff9a3c", 0]]);

/** Nova, the academy mascot — seen from behind. (0,0) = between the feet. Needs lanternGlowDef in defs. */
export function novaBack(glowId = "lanternGlow") {
  return `
  <ellipse cx="0" cy="2" rx="36" ry="8" fill="#000" opacity=".28"/>
  <rect x="-17" y="-36" width="13" height="36" rx="6" fill="#2a2147"/><rect x="4" y="-36" width="13" height="36" rx="6" fill="#231b3d"/>
  <ellipse cx="-10" cy="-3" rx="11" ry="6" fill="#6b3f2a"/><ellipse cx="11" cy="-3" rx="11" ry="6" fill="#5a3322"/>
  <path d="M-32 -32 Q-36 -84 -18 -104 L18 -104 Q36 -84 32 -32 Q0 -22 -32 -32Z" fill="#2fd3c4"/>
  <path d="M6 -104 L18 -104 Q36 -84 32 -32 Q20 -27 8 -26Z" fill="#1c9f95"/>
  <rect x="-21" y="-98" width="42" height="48" rx="11" fill="#8a5a3c"/><path d="M-21 -86 Q0 -74 21 -86 L21 -96 Q0 -104 -21 -96Z" fill="#a8714c"/>
  <rect x="-5" y="-82" width="10" height="9" rx="2" fill="#ffcf5a"/>
  <rect x="-26" y="-114" width="52" height="17" rx="8.5" fill="#ff6b6b"/><path d="M-10 -114 v17 M8 -114 v17" stroke="#d94f5c" stroke-width="3"/>
  <circle cx="0" cy="-130" r="23" fill="#2fd3c4"/><path d="M4 -152 Q8 -170 24 -164 Q14 -152 13 -146Z" fill="#2fd3c4"/>
  <path d="M8 -150 A23 23 0 0 1 22 -122 Q16 -126 8 -128Z" fill="#1c9f95"/>
  ${A("sway", `<path d="M10 -112 Q34 -118 48 -104 Q58 -96 66 -102 Q58 -88 44 -94 Q30 -100 12 -100Z" fill="#ff5d73"/>`, 0, 2.2)}
  <line x1="24" y1="-58" x2="44" y2="-160" stroke="#6b4a2f" stroke-width="5" stroke-linecap="round"/>
  <line x1="44" y1="-160" x2="54" y2="-158" stroke="#6b4a2f" stroke-width="4" stroke-linecap="round"/>
  ${A("glowf", `<circle cx="56" cy="-136" r="58" fill="url(#${glowId})"/>`, 0, 1.8)}
  <line x1="54" y1="-158" x2="56" y2="-148" stroke="#3a2a20" stroke-width="2"/>
  <rect x="47" y="-148" width="18" height="24" rx="5" fill="#ffcf5a" stroke="#7a4f1c" stroke-width="3"/>
  ${A("flick", `<ellipse cx="56" cy="-135" rx="4" ry="7" fill="#fff8d6"/>`)}`;
}
/** Nova in profile, mid-jump, facing right. (0,0) = body centre. */
export function novaJump() {
  return `
  ${A("sway", `<path d="M-8 -26 Q-40 -34 -62 -18 Q-74 -10 -86 -16 Q-74 2 -56 -6 Q-36 -14 -10 -14Z" fill="#ff5d73"/>`, 0, 1.4)}
  <ellipse cx="-6" cy="30" rx="10" ry="16" fill="#2a2147" transform="rotate(30 -6 30)"/><ellipse cx="14" cy="26" rx="10" ry="15" fill="#231b3d" transform="rotate(-40 14 26)"/>
  <ellipse cx="-12" cy="44" rx="11" ry="6" fill="#6b3f2a"/><ellipse cx="26" cy="36" rx="11" ry="6" fill="#5a3322"/>
  <path d="M-26 22 Q-30 -20 -6 -30 L10 -30 Q30 -16 26 22 Q0 30 -26 22Z" fill="#2fd3c4"/>
  <rect x="-34" y="-20" width="20" height="34" rx="8" fill="#8a5a3c"/>
  <circle cx="4" cy="-46" r="22" fill="#2fd3c4"/><path d="M-12 -62 Q-30 -76 -36 -60 Q-24 -60 -18 -52Z" fill="#2fd3c4"/>
  <ellipse cx="12" cy="-42" rx="14" ry="13" fill="#ffe0c2"/><circle cx="17" cy="-45" r="3" fill="#1a1430"/><circle cx="18" cy="-46" r="1" fill="#fff"/>
  <path d="M12 -36 q5 3 9 0" stroke="#c0605a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="24" cy="-6" rx="8" ry="7" fill="#ffe0c2"/><path d="M14 -10 L26 -6" stroke="#1c9f95" stroke-width="9" stroke-linecap="round"/>`;
}
/** Tiny Nova token (front), (0,0) = feet. */
export function novaTiny(s = 1) {
  return T(0, 0, `<ellipse cx="0" cy="2" rx="14" ry="4" fill="#000" opacity=".3"/>
  <path d="M-12 0 Q-14 -24 -6 -30 L6 -30 Q14 -24 12 0Z" fill="#2fd3c4"/><circle cx="0" cy="-38" r="11" fill="#2fd3c4"/>
  <ellipse cx="0" cy="-36" rx="7" ry="6.5" fill="#ffe0c2"/><circle cx="-2.5" cy="-37" r="1.4" fill="#1a1430"/><circle cx="2.5" cy="-37" r="1.4" fill="#1a1430"/>
  <rect x="-9" y="-30" width="18" height="6" rx="3" fill="#ff5d73"/>`, s);
}
/** Isometric projection helpers. */
export function isoKit(ox, oy, tw = 96, th = 48) {
  const P = (i, j, z = 0) => [ox + (i - j) * tw / 2, oy + (i + j) * th / 2 - z];
  const box = (i, j, w, d, z, h, top, left, right, extra = "") => {
    const t = [P(i, j, z + h), P(i + w, j, z + h), P(i + w, j + d, z + h), P(i, j + d, z + h)];
    const l = [P(i, j + d, z), P(i + w, j + d, z), P(i + w, j + d, z + h), P(i, j + d, z + h)];
    const r = [P(i + w, j, z), P(i + w, j + d, z), P(i + w, j + d, z + h), P(i + w, j, z + h)];
    return poly(l, left, extra) + poly(r, right, extra) + poly(t, top, extra);
  };
  const tile = (i, j, fill, extra = "", z = 0) => poly([P(i, j, z), P(i + 1, j, z), P(i + 1, j + 1, z), P(i, j + 1, z)], fill, extra);
  return { P, box, tile };
}
export const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = (c) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  return "#" + [f(r), f(g), f(b)].map(c => c.toString(16).padStart(2, "0")).join("");
};
