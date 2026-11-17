import { F, rng, svg, A, T, lin, rad, glowFilter, shadowFilter, txt, rr, circ, poly, path, stars, pine, bush, cloud, ridge, starShape, gearPath, lanternGlowDef, novaJump, novaTiny, isoKit, shade, r1 } from "./lib.mjs";

const darkBg = (id = "bg", a = "#1a1046", b = "#2a1458") => lin(id, [[0, a], [1, b]], 0, 0, 1, 1);
const title = (s, sub, c = "#ffcf5a") => txt(60, 74, s, { size: 34, anchor: "start", ls: 1 }) + (sub ? txt(60, 106, sub, { size: 18, anchor: "start", fill: c, w: 600 }) : "");
const grid = (R) => Array.from({ length: 30 }, () => circ(R() * 1200, R() * 750, 1.5, "#fff", 'opacity=".25"')).join("");

/* 14. SEVEN DETAILS */
export function sevenDetails() {
  const R = rng(2); const cx = 600, cy = 420;
  const items = [["Clear goals", "#ffcf5a", `<circle r="16" fill="none" stroke="#fff" stroke-width="5"/><circle r="6" fill="#fff"/>`],
    ["Readable levels", "#7ed36b", `<path d="M-18 14 Q-4 -2 0 6 T18 -14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="18" cy="-14" r="5" fill="#fff"/>`],
    ["Responsive controls", "#5ab0ff", `<rect x="-20" y="-10" width="40" height="22" rx="11" fill="#fff"/><path d="M-12 1 h8 M-8 -3 v8" stroke="#5ab0ff" stroke-width="3"/><circle cx="9" cy="1" r="3" fill="#5ab0ff"/>`],
    ["Strong feedback", "#ff6b6b", poly(starShape(0, 0, 20, 8, 8), "#fff")],
    ["Sound cues", "#b07aff", `<path d="M-16 -6 h8 l10 -10 v32 l-10 -10 h-8z" fill="#fff"/><path d="M8 -8 q8 8 0 16 M13 -13 q14 13 0 26" stroke="#fff" stroke-width="3" fill="none"/>`],
    ["Balanced difficulty", "#2fd3c4", `<path d="M-18 14 h12 v-10 h12 v-10 h12 v20z" fill="#fff"/>`],
    ["Meaningful rewards", "#ff9a5a", `<rect x="-18" y="-6" width="36" height="22" rx="4" fill="#fff"/><path d="M-18 -6 q18 -18 36 0z" fill="#fff"/><rect x="-4" y="0" width="8" height="8" fill="#ff9a5a"/>`]];
  const pos = items.map((_, i) => { const a = -Math.PI / 2 + i * Math.PI * 2 / 7; return [cx + Math.cos(a) * 330, cy + Math.sin(a) * 240]; });
  const defs = darkBg() + rad("halo", [[0, "#ffd36b", .6], [1, "#ffd36b", 0]]) + lin("hill", [[0, "#7ed36b"], [1, "#2f8a4a"]]) + glowFilter("g", 6);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("7 details players feel", "…before they can name them")}
    ${A("spin", `<ellipse cx="${cx}" cy="${cy}" rx="330" ry="240" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="2" stroke-dasharray="6 10"/>`, 0, 120)}
    ${pos.map(([x, y]) => A("dash", `<path d="M${cx} ${cy} L${x} ${y}" stroke="#fff" stroke-opacity=".25" stroke-width="2" stroke-dasharray="4 10"/>`, R(), 2)).join("")}
    ${A("glowf", circ(cx, cy, 160, "url(#halo)"), 0, 2)}${circ(cx, cy, 110, "#2a1f6a", 'stroke="#ffcf5a" stroke-width="4"')}
    <clipPath id="c"><circle cx="${cx}" cy="${cy}" r="106"/></clipPath><g clip-path="url(#c)"><rect x="${cx - 110}" y="${cy - 110}" width="220" height="220" fill="#ff9a7a"/><circle cx="${cx}" cy="${cy + 10}" r="40" fill="#ffe7b8"/>
      <path d="M${cx - 110} ${cy + 60} Q${cx} ${cy - 10} ${cx + 110} ${cy + 50} V${cy + 120} H${cx - 110}Z" fill="url(#hill)"/>
      ${T(cx, cy + 14, `<rect x="-26" y="-50" width="52" height="50" fill="#e8dcc8"/><rect x="-36" y="-70" width="18" height="70" fill="#d6c8b0"/><rect x="18" y="-70" width="18" height="70" fill="#d6c8b0"/><path d="M-40 -70 L-27 -92 L-14 -70Z M14 -70 L27 -92 L40 -70Z" fill="#ff5d73"/><path d="M-8 0 v-16 a8 8 0 0 1 16 0 v16z" fill="#4a2a5a"/>${A("glowf", circ(0, -40, 50, "#fff6c9", 'opacity=".5"'), 0, 1.5)}`)}
      <path d="M${cx - 40} ${cy + 120} Q${cx - 10} ${cy + 70} ${cx} ${cy + 16}" stroke="#ffe7b8" stroke-width="8" fill="none"/></g>
    ${txt(cx, cy + 150, "THE GOAL", { size: 14, ls: 4, fill: "#ffcf5a" })}
    ${items.map(([n, c, ic], i) => { const [x, y] = pos[i]; return T(x, y, A("bob", `${circ(0, 0, 44, c, 'filter="url(#g)"')}${circ(0, 0, 44, c, 'stroke="#fff" stroke-width="4"')}${ic}${circ(-34, -34, 15, "#1a1046", 'stroke="#fff" stroke-width="3"')}${txt(-34, -28, i + 1, { size: 15 })}`, i * .5, 2.4) + txt(0, 72, n, { size: 18 })); }).join("")}`;
  return svg({ title: "Seven design details orbiting a glowing goal castle", defs, body });
}

/* 15. GDD FLOW */
export function gddFlow() {
  const R = rng(6);
  const stages = [["01", "Concept & Pitch", "#ffcf5a", ["Hook & fantasy", "Target player", "Genre & platform"], `<circle cx="0" cy="-6" r="22" fill="#fff"/><rect x="-10" y="16" width="20" height="12" rx="3" fill="#fff"/>${A("glowf", circ(0, -6, 36, "#fff6c9", 'opacity=".5"'), 0, 1.2)}`],
    ["02", "Gameplay & Mechanics", "#2fd3c4", ["Core loop", "Systems", "Win / lose"], `<rect x="-32" y="-16" width="64" height="34" rx="17" fill="#fff"/><path d="M-20 1 h12 M-14 -5 v12" stroke="#2fd3c4" stroke-width="4"/><circle cx="12" cy="-3" r="4" fill="#2fd3c4"/><circle cx="20" cy="5" r="4" fill="#2fd3c4"/>`],
    ["03", "Art & Sound", "#ff6fb5", ["Style guide", "Palette", "Audio mood"], `<path d="M-26 22 L4 -8 L14 2 L-16 32Z" fill="#fff"/><path d="M4 -8 L20 -24 L30 -14 L14 2Z" fill="#ffd0e6"/><path d="M18 18 v-34 l18 -4 v30" stroke="#fff" stroke-width="5" fill="none"/><circle cx="14" cy="20" r="6" fill="#fff"/>`],
    ["04", "Engine & Tools", "#8b7bff", ["Engine choice", "Pipelines", "Build targets"], T(0, 0, A("spin", `<path d="${gearPath(0, 0, 9, 30, 22)}" fill="#fff"/><circle r="9" fill="#8b7bff"/>`, 0, 8))]];
  const defs = darkBg() + glowFilter("g", 6) + shadowFilter("drop");
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("The Game Design Document", "four stages · one living document", "#2fd3c4")}
    ${A("dash", `<path d="M150 380 H1050" stroke="#fff" stroke-opacity=".35" stroke-width="4" stroke-dasharray="10 18"/>`, 0, 1)}
    ${stages.map(([n, t, c, bullets, ic], i) => T(150 + i * 300, 380, A("bob", `${rr(-125, -190, 250, 330, 24, "#221a52", `stroke="${c}" stroke-width="3" filter="url(#drop)"`)}${circ(0, -110, 52, c)}${T(0, -110, ic)}
      ${txt(0, -20, n, { size: 16, fill: c, ls: 3 })}${txt(0, 12, t, { size: 20 })}${bullets.map((b, k) => txt(-90, 56 + k * 28, "• " + b, { size: 16, w: 500, anchor: "start", op: .85 })).join("")}`, i * .7, 3))).join("")}
    ${T(1040, 640, `${[2, 1, 0].map(k => rr(-70 + k * 10, -46 - k * 10, 120, 80, 8, ["#f2e8d0", "#e8dcc8", "#fff"][k], 'stroke="#c0b090" stroke-width="2"')).join("")}${[0, 1, 2, 3].map(k => rr(-56, -40 + k * 14, 80 - (k === 3 ? 30 : 0), 6, 3, "#c0b090")).join("")}
      ${T(-120, -4, A("spin", `<path d="M0 -26 A26 26 0 1 1 -24 10" stroke="#5ee08c" stroke-width="6" fill="none"/><path d="M-32 4 L-24 16 L-14 4Z" fill="#5ee08c"/>`, 0, 3))}`)}
    ${txt(880, 650, "Update after every playtest →", { size: 18, anchor: "end", fill: "#5ee08c" })}`;
  return svg({ title: "Four-stage Game Design Document workflow", defs, body });
}

/* 16. PLATFORMER ROADMAP */
export function platformerRoadmap() {
  const R = rng(16);
  const stages = ["Get started", "Core mechanics", "Systems", "Level design", "Art & anim", "Audio", "Polish & UI", "Build & ship"];
  const plats = stages.map((_, i) => [80 + i * 135, 640 - i * 62]);
  const plat = ([x, y], i) => `<rect x="${x}" y="${y}" width="120" height="${750 - y}" fill="#8a5a3c"/><rect x="${x}" y="${y}" width="120" height="${750 - y}" fill="url(#dirt)"/>
    <rect x="${x - 6}" y="${y - 4}" width="132" height="22" rx="10" fill="#6fd27a"/><path d="M${x} ${y + 16} q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0" fill="#6fd27a"/>
    ${circ(x + 26, y + 50, 18, "#fff", 'opacity=".9"')}${txt(x + 26, y + 57, i + 1, { size: 18, fill: "#8a5a3c" })}${txt(x + 60, y - 18, stages[i], { size: 15, fill: "#1a2a4a" })}`;
  const [jx, jy] = plats[3], [kx, ky] = plats[4];
  const arc = `M${jx + 70} ${jy - 10} Q${(jx + kx) / 2 + 60} ${jy - 220} ${kx + 60} ${ky - 10}`;
  const defs = lin("sky", [[0, "#5ab8ff"], [1, "#d8f3ff"]]) + lin("dirt", [[0, "#a8714c", 0], [1, "#4a2e1a", .6]]) + glowFilter("g", 4);
  const body = `<rect width="1200" height="750" fill="url(#sky)"/>${A("drift", cloud(80, 120, 1, "#fff", .9) + cloud(500, 80, .7, "#fff", .8) + cloud(860, 160, .9, "#fff", .9), 1)}
    ${ridge(R, 1200, 560, 160, 6, "#9fd0e8")}${ridge(R, 1200, 620, 100, 8, "#86c0d8")}
    ${txt(60, 74, "Build a 2D platformer", { size: 36, anchor: "start", fill: "#1a2a4a" })}${txt(60, 106, "eight stages · core mechanics before art", { size: 18, anchor: "start", fill: "#1f6fbf", w: 600 })}
    ${plats.map(plat).join("")}
    <path d="${arc}" stroke="#fff" stroke-width="4" fill="none" stroke-dasharray="2 12" stroke-linecap="round"/>
    ${T((jx + kx) / 2 + 70, jy - 150, A("bob", novaJump(), 0, .9), 1)}
    ${[[plats[1][0] + 60, plats[1][1] - 60], [plats[2][0] + 60, plats[2][1] - 60], [plats[5][0] + 60, plats[5][1] - 60], [plats[6][0] + 60, plats[6][1] - 60]].map(([x, y], i) => T(x, y, A("coin", `<circle r="16" fill="#ffcf5a" stroke="#c98a12" stroke-width="4"/><rect x="-3" y="-8" width="6" height="16" rx="2" fill="#c98a12"/>`, i * .3))).join("")}
    ${T(plats[2][0] + 70, plats[2][1] - 140, A("bob", rr(-26, -26, 52, 52, 8, "#ffb13b", 'stroke="#8a4a10" stroke-width="4"') + txt(0, 12, "?", { size: 34, fill: "#fff", stroke: "#8a4a10", sw: 4 }), 0, .7))}
    ${T(plats[7][0] + 80, plats[7][1], `<rect x="-3" y="-120" width="6" height="120" fill="#e8e0f0"/>${T(3, -116, A("flag", `<path d="M0 0 h60 l-14 20 l14 20 h-60z" fill="#ff5d73"/>`))}${circ(0, -124, 8, "#ffcf5a")}`)}
    ${T(plats[0][0] + 60, plats[0][1], `<ellipse cx="0" cy="0" rx="30" ry="8" fill="#000" opacity=".1"/>`)}
    ${T(plats[5][0] + 80, plats[5][1] - 30, A("rise", txt(0, 0, "♪", { size: 30, fill: "#7a5ad8" }), 0, 2))}`;
  return svg({ title: "Eight-stage roadmap for building a 2D platformer, drawn as ascending platforms", defs, body });
}

/* 17. ENVIRONMENT ELEMENTS — a cozy low-poly street with 9 callouts */
export function envElements() {
  const R = rng(23);
  const pal = { terracotta: "#d9734e", sage: "#9cbf8a", cream: "#f3e6c8", slate: "#4e5d78" };
  const house = (x, w, h, c, roof) => { const y = 520 - h; return rr(x, y, w, h, 0, c) + rr(x + w * .7, y, w * .3, h, 0, shade(c, -.12)) + poly([[x - 12, y], [x + w / 2, y - 60], [x + w + 12, y]], roof) +
    Array.from({ length: Math.floor(h / 70) }, (_, k) => [0, 1].map(m => rr(x + 18 + m * (w / 2), y + 22 + k * 70, w / 2 - 36, 36, 4, R() > .4 ? "#ffd98a" : "#36405a")).join("")).join(""); };
  const callout = (n, x, y, lx, ly, label) => `<path d="M${x} ${y} L${lx} ${ly}" stroke="#fff" stroke-width="2" stroke-opacity=".8"/>${A("pulse", circ(x, y, 7, "#fff"), n * .2, 1.4)}
    ${T(lx, ly, rr(label.length * -5.5 - 30, -17, label.length * 11 + 60, 34, 17, "#1a1238", 'opacity=".88"') + circ(label.length * -5.5 - 14, 0, 12, "#ffcf5a") + txt(label.length * -5.5 - 14, 5, n, { size: 14, fill: "#1a1238" }) + txt(8, 6, label, { size: 15 }))}`;
  const defs = lin("sky", [[0, "#ffb38a"], [1, "#ffe8c8"]]) + lin("fog", [[0, "#fff", 0], [1, "#fff", .5]]) + rad("lamp", [[0, "#fff1b0", .8], [1, "#ffcf5a", 0]]);
  const body = `<rect width="1200" height="750" fill="url(#sky)"/>${circ(900, 260, 70, "#fff1d6")}
    ${ridge(R, 1200, 430, 80, 5, "#e8a088", 'opacity=".6"')}
    ${house(40, 200, 300, pal.cream, pal.terracotta)}${house(260, 170, 240, "#e8d4b0", pal.slate)}${house(820, 180, 280, pal.cream, pal.terracotta)}${house(1020, 160, 220, "#e8d4b0", "#8a6a5a")}
    ${T(470, 520, `<rect x="0" y="-210" width="300" height="210" fill="${pal.sage}"/><rect x="210" y="-210" width="90" height="210" fill="${shade(pal.sage, -.15)}"/><path d="M-14 -210 L150 -270 L314 -210Z" fill="${pal.slate}"/>
      ${[0, 1, 2, 3, 4, 5].map(k => poly([[k * 50, -120], [k * 50 + 50, -120], [k * 50 + 50, -92], [k * 50 + 25, -84], [k * 50, -92]], k % 2 ? pal.cream : pal.terracotta)).join("")}
      <rect x="30" y="-80" width="100" height="80" fill="#36405a"/><rect x="170" y="-80" width="50" height="80" fill="#6b4a2f"/>${txt(150, -150, "CAFÉ", { size: 28, fill: pal.cream, ls: 4 })}`)}
    <rect y="520" width="1200" height="230" fill="#8a8aa0"/><rect y="520" width="1200" height="24" fill="#b8b4c8"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(k => rr(520 + k * 34, 590, 20, 110, 2, "#f2eee6")).join("")}
    ${T(380, 545, `<rect x="-5" y="-170" width="10" height="170" fill="#36405a"/><path d="M-20 -170 h40 l-8 -26 h-24z" fill="#36405a"/>${A("glowf", circ(0, -150, 80, "url(#lamp)"), 0, 2)}${circ(0, -170, 9, "#fff1b0")}`)}
    ${[[30, 560], [760, 560], [1160, 570]].map(([x, y]) => T(x, y, A("sway", pine(0, 0, 120, "#9cbf8a", "#6f9a68"), R() * 2))).join("")}
    ${T(700, 590, `<rect x="-26" y="-50" width="52" height="40" rx="6" fill="${pal.terracotta}"/><circle cx="-14" cy="-10" r="10" fill="#36405a"/><circle cx="14" cy="-10" r="10" fill="#36405a"/>`, 1)}
    ${T(300, 600, `<rect x="-30" y="-24" width="60" height="24" rx="3" fill="#a8714c"/><rect x="-30" y="-4" width="6" height="16" fill="#6b4a2f"/><rect x="24" y="-4" width="6" height="16" fill="#6b4a2f"/>`)}
    ${T(640, 560, novaTiny(1.2))}
    <rect y="360" width="1200" height="260" fill="url(#fog)" opacity=".6"/>
    ${A("drift", `<path d="M80 160 Q85 154 90 160 Q95 154 100 160 M130 140 Q135 134 140 140 Q145 134 150 140" stroke="#5a3a4a" stroke-width="3" fill="none"/>`, 0, 30)}
    ${T(70, 690, Object.values(pal).map((c, i) => rr(i * 46, -26, 40, 40, 8, c, 'stroke="#fff" stroke-width="3"')).join(""))}
    ${T(1000, 690, Array.from({ length: 22 }, (_, i) => { const h = 6 + Math.abs(Math.sin(i * .9)) * 26; return A("pulse", rr(i * 8, -h / 2, 4, h, 2, "#fff"), i * .1, .6 + (i % 3) * .2); }).join(""))}
    ${callout(1, 140, 260, 150, 150, "Architecture")}${callout(2, 380, 380, 400, 230, "Lighting")}${callout(3, 640, 520, 620, 440, "Scale")}
    ${callout(4, 300, 590, 330, 652, "Props")}${callout(5, 1000, 450, 1060, 360, "Atmosphere")}${callout(6, 560, 640, 560, 720, "Textures")}
    ${callout(7, 140, 668, 110, 618, "Colour")}${callout(8, 1080, 690, 1050, 630, "Sound")}${callout(9, 700, 570, 820, 640, "Storytelling")}`;
  return svg({ title: "Low-poly town street annotated with nine environment design elements", defs, body });
}

/* 18. PROGRESSION TOOLKIT */
export function progression() {
  const R = rng(31);
  const tile = (x, y, w, h, t, c, inner) => T(x, y, rr(0, 0, w, h, 22, "#221a52", `stroke="${c}" stroke-width="3"`) + txt(24, 40, t, { size: 18, anchor: "start", fill: c, ls: 3 }) + inner);
  const defs = darkBg() + glowFilter("g", 6) + lin("xp", [[0, "#8b7bff"], [1, "#b8f34a"]], 0, 0, 1, 0);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("Learn like you play", "seven systems that make progress visible", "#ff6fb5")}
    ${tile(60, 140, 260, 270, "LEVELS", "#ffcf5a", `${[0, 1, 2, 3].map(k => rr(30 + k * 50, 230 - k * 34, 50, 34 + k * 34, 4, shade("#ffcf5a", -.15 * (3 - k)))).join("")}${T(205, 110, A("bob", circ(0, 0, 24, "#ffcf5a", 'stroke="#fff" stroke-width="4"') + txt(0, 7, "12", { size: 18, fill: "#5a3a10" }), 0, 1.2))}`)}
    ${tile(340, 140, 520, 130, "XP", "#b8f34a", `${rr(24, 64, 470, 30, 15, "#140f2a")}${A("grow", rr(28, 68, 462, 22, 11, "url(#xp)"), 0, 4)}${txt(494, 50, "+20 XP", { size: 16, anchor: "end", fill: "#b8f34a" })}`)}
    ${tile(340, 290, 250, 120, "STREAK", "#ff9a5a", `${T(70, 92, A("flick", `<path d="M0 0 C-26 -6 -24 -40 -6 -56 C-4 -40 8 -40 6 -54 C26 -36 26 -6 0 0Z" fill="#ff9a5a"/><path d="M0 0 C-12 -4 -10 -22 0 -30 C10 -22 12 -4 0 0Z" fill="#ffcf5a"/>`, 0, .5))}${txt(170, 90, "7 days", { size: 26 })}`)}
    ${tile(610, 290, 250, 120, "QUESTS", "#2fd3c4", `${["Finish a lesson", "Try the lab"].map((s, k) => rr(24, 56 + k * 28, 18, 18, 4, k ? "none" : "#5ee08c", 'stroke="#fff" stroke-width="2"') + txt(52, 71 + k * 28, s, { size: 15, w: 500, anchor: "start" })).join("")}`)}
    ${tile(880, 140, 260, 270, "BOSS", "#ff6b6b", `${T(130, 170, A("bob", `<path d="M-60 40 Q-70 -60 0 -70 Q70 -60 60 40Z" fill="#7a3aa8"/><path d="M-40 -50 L-56 -84 L-20 -64Z M40 -50 L56 -84 L20 -64Z" fill="#5a2a88"/><path d="M-30 -20 l16 6 M30 -20 l-16 6" stroke="#ffd84a" stroke-width="6"/><path d="M-26 14 l10 -8 l8 8 l8 -8 l8 8 l8 -8 l10 8" stroke="#fff" stroke-width="4" fill="none"/>`, 0, 1.6))}${rr(30, 230, 200, 16, 8, "#140f2a")}${rr(32, 232, 120, 12, 6, "#ff6b6b")}`)}
    ${tile(60, 430, 520, 270, "LEADERBOARD", "#5ab0ff", `${[[2, 120, 150, "#c0c8dc"], [1, 260, 200, "#ffcf5a"], [3, 400, 110, "#d9844e"]].map(([n, x, h, c]) => rr(x - 60, 250 - h, 120, h, 8, c) + txt(x, 250 - h + 44, n, { size: 34, fill: "#1a1046" }) + T(x, 250 - h - 6, A("hop", novaTiny(.9), n * .2, .5))).join("")}`)}
    ${tile(600, 430, 540, 270, "REWARDS", "#ff6fb5", `${T(270, 190, `${A("glowf", circ(0, -30, 110, "#ffcf5a", 'opacity=".25" filter="url(#g)"'), 0, 1.5)}<rect x="-80" y="-40" width="160" height="90" rx="10" fill="#a8622f" stroke="#5a2e10" stroke-width="5"/><path d="M-80 -40 Q0 -110 80 -40Z" fill="#c97a3a" stroke="#5a2e10" stroke-width="5"/><rect x="-14" y="-30" width="28" height="30" rx="4" fill="#ffcf5a" stroke="#5a2e10" stroke-width="4"/>
      ${[[-110, -80], [110, -70], [-70, -130], [80, -130], [0, -150]].map(([x, y], i) => T(x, y, A("tw", poly(starShape(0, 0, 14, 5), ["#ffcf5a", "#fff", "#ff6fb5"][i % 3]), i * .3, .9))).join("")}`)}`)}`;
  return svg({ title: "Seven progression systems: levels, XP, streaks, quests, boss, leaderboard and rewards", defs, body });
}

/* 19. VECTOR LAYERS */
export function vectorLayers() {
  const R = rng(13);
  const layer = (y, label, c, inner, d) => T(330, y, A("float", `<g transform="skewX(-30) scale(1 .55)"><rect x="-200" y="-110" width="400" height="220" rx="16" fill="${c}" opacity=".9" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>${inner}</g>`, d, 4) + txt(270, 6, label, { size: 17, anchor: "start" }));
  const defs = darkBg("bg", "#141a3a", "#241a52") + glowFilter("g", 5);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("Vector art for games", "separate layers · editable points · any resolution", "#5ab0ff")}
    ${[230, 360, 490, 620].map((y, i) => i < 3 ? `<path d="M${130 + i * 0} ${y + 40} V${y + 90}" stroke="#fff" stroke-opacity=".3" stroke-dasharray="4 6" stroke-width="2"/>` : "").join("")}
    ${layer(620, "Background", "#3a6ab8", `<path d="M-200 60 Q-100 -20 0 30 T200 0 V110 H-200Z" fill="#5fbf8a"/>${circ(120, -50, 30, "#ffe7b8")}`, 0)}
    ${layer(490, "Platforms", "#2a2058", `<rect x="-160" y="40" width="140" height="30" rx="8" fill="#a8714c"/><rect x="20" y="-10" width="150" height="30" rx="8" fill="#a8714c"/><rect x="-160" y="40" width="140" height="10" rx="5" fill="#6fd27a"/><rect x="20" y="-10" width="150" height="10" rx="5" fill="#6fd27a"/>`, .8)}
    ${layer(360, "Character", "#2a2058", `<circle cx="-80" cy="0" r="40" fill="#2fd3c4"/><circle cx="-70" cy="0" r="22" fill="#ffe0c2"/><rect x="-110" y="34" width="60" height="16" rx="8" fill="#ff5d73"/>`, 1.6)}
    ${layer(230, "Coins & UI", "#2a2058", `<circle cx="60" cy="0" r="30" fill="#ffcf5a"/><circle cx="130" cy="0" r="30" fill="#ffcf5a"/><rect x="-180" y="-80" width="140" height="24" rx="12" fill="#ff5d6b"/>`, 2.4)}
    ${T(860, 320, `${A("spin", circ(0, 0, 180, "none", 'stroke="#5ab0ff" stroke-opacity=".2" stroke-width="2" stroke-dasharray="4 10"'), 0, 60)}
      <circle r="120" fill="#ffcf5a" stroke="#c98a12" stroke-width="10"/><rect x="-18" y="-60" width="36" height="120" rx="10" fill="#c98a12"/>
      <path d="M-120 0 C-120 -66 -66 -120 0 -120" stroke="#5ab0ff" stroke-width="3" fill="none"/>
      ${[[-120, 0], [0, -120], [120, 0], [0, 120]].map(([x, y]) => rr(x - 9, y - 9, 18, 18, 2, "#fff", 'stroke="#5ab0ff" stroke-width="4"')).join("")}
      <path d="M-120 -66 V66 M-66 -120 H66" stroke="#5ab0ff" stroke-width="2"/>${[[-120, -66], [-120, 66], [-66, -120], [66, -120]].map(([x, y]) => A("pulse", circ(x, y, 8, "#5ab0ff"), R(), 1.2)).join("")}`)}
    ${txt(860, 540, "Edit points, not pixels", { size: 20, fill: "#5ab0ff" })}
    ${T(800, 650, `<rect x="-80" y="-50" width="160" height="96" rx="8" fill="#140f2a" stroke="#fff" stroke-opacity=".6" stroke-width="3"/><rect x="-14" y="46" width="28" height="14" fill="#fff" opacity=".6"/>${circ(0, -2, 26, "#ffcf5a")}`)}
    ${T(960, 650, `<rect x="-50" y="-62" width="100" height="124" rx="10" fill="#140f2a" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>${circ(0, 0, 20, "#ffcf5a")}`)}
    ${T(1080, 650, `<rect x="-26" y="-50" width="52" height="100" rx="10" fill="#140f2a" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>${circ(0, 0, 13, "#ffcf5a")}`)}`;
  return svg({ title: "A game scene exploded into vector layers, with Bézier anchor points on a coin", defs, body });
}

/* 20. MODULAR KIT */
export function modularKit() {
  const R = rng(17);
  const k = isoKit(0, 0, 60, 30);
  const piece = (x, y, label, draw) => T(x, y, rr(-80, -80, 160, 150, 16, "#221a52", 'stroke="#3a2f6a" stroke-width="2"') + T(0, -6, draw) + txt(0, 56, label, { size: 14, w: 600, op: .85 }));
  const floorT = k.tile(-.5, -.5, "#e8c89a", 'stroke="#c0a070" stroke-width="2"');
  const wall = k.box(-.5, -.5, 1, .2, 0, 60, "#f3e6c8", "#d9c8a8", "#e8d8b8");
  const win = wall + poly([k.P(-.2, -.3, 20), k.P(.2, -.3, 20), k.P(.2, -.3, 46), k.P(-.2, -.3, 46)], "#5ab0ff");
  const door = k.box(-.5, -.5, 1, .2, 0, 60, "#f3e6c8", "#d9c8a8", "#e8d8b8") + poly([k.P(-.2, -.3, 0), k.P(.2, -.3, 0), k.P(.2, -.3, 44), k.P(-.2, -.3, 44)], "#8a5a3c");
  const counter = k.box(-.5, -.25, 1, .5, 0, 26, "#d9734e", "#a8522e", "#c0623e");
  const stool = k.box(-.15, -.15, .3, .3, 0, 22, "#ffcf5a", "#c98a12", "#e0a83a");
  const plant = k.box(-.15, -.15, .3, .3, 0, 16, "#a8714c", "#6b4020", "#8a5a3c") + circ(0, -30, 16, "#6fd27a") + circ(-8, -22, 10, "#4fae6a");
  const lamp = `<rect x="-2" y="-60" width="4" height="60" fill="#4e5d78"/>${A("glowf", circ(0, -60, 26, "#ffd36b", 'opacity=".5"'), 0, 1.4)}${circ(0, -60, 8, "#fff1b0")}`;
  const pieces = [["Floor", floorT], ["Wall", wall], ["Window", win], ["Door", door], ["Counter", counter], ["Stool", stool], ["Plant", plant], ["Lamp", lamp]];
  const room = isoKit(985, 250, 72, 36); let rm = "";
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) rm += room.tile(i, j, (i + j) % 2 ? "#e8c89a" : "#dcbc8a", 'stroke="#c0a070" stroke-width="2"');
  rm += poly([room.P(0, 0, 0), room.P(5, 0, 0), room.P(5, 0, 120), room.P(0, 0, 120)], "#f3e6c8") + poly([room.P(0, 0, 0), room.P(0, 5, 0), room.P(0, 5, 120), room.P(0, 0, 120)], "#e0d0b0");
  rm += poly([room.P(1.2, 0, 40), room.P(2.3, 0, 40), room.P(2.3, 0, 90), room.P(1.2, 0, 90)], "#5ab0ff") + poly([room.P(3.2, 0, 40), room.P(4.3, 0, 40), room.P(4.3, 0, 90), room.P(3.2, 0, 90)], "#5ab0ff");
  rm += poly([room.P(0, 2, 0), room.P(0, 3, 0), room.P(0, 3, 80), room.P(0, 2, 80)], "#8a5a3c");
  rm += room.box(1, 1, 3, .7, 0, 34, "#d9734e", "#a8522e", "#c0623e") + room.box(1.3, 2.2, .35, .35, 0, 28, "#ffcf5a", "#c98a12", "#e0a83a") + room.box(2.4, 2.2, .35, .35, 0, 28, "#ffcf5a", "#c98a12", "#e0a83a") + room.box(3.5, 2.2, .35, .35, 0, 28, "#ffcf5a", "#c98a12", "#e0a83a");
  const [px, py] = room.P(4.4, 4.2, 0); rm += T(px, py, plant, 1.4); const [lx, ly] = room.P(.5, 4.3, 0); rm += T(lx, ly, lamp, 1.6);
  const defs = darkBg() + glowFilter("g", 5);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("One kit, many rooms", "grid-aligned pieces with shared pivots", "#ff9a5a")}
    ${pieces.map(([l, d], i) => piece(130 + (i % 4) * 170, 240 + Math.floor(i / 4) * 175, l, d)).join("")}
    ${A("dash", `<path d="M728 420 H762" stroke="#ffcf5a" stroke-width="6" stroke-dasharray="10 8"/>`, 0, .8)}<path d="M762 404 L786 420 L762 436Z" fill="#ffcf5a"/>
    ${A("bob", rm, 0, 6)}${txt(985, 640, "Café · built from 8 pieces", { size: 18, fill: "#ffcf5a" })}`;
  return svg({ title: "Modular kit sheet of eight pieces and an assembled isometric café room", defs, body });
}

/* 21. TOOLKIT */
export function toolkit() {
  const R = rng(29);
  const orbit = [["ART", "#ff6fb5", `<path d="M-22 18 L8 -12 L18 -2 L-12 28Z" fill="#fff"/><path d="M8 -12 L20 -24 L30 -14 L18 -2Z" fill="#ffd0e6"/>`],
    ["AUDIO", "#b07aff", `<path d="M-6 16 v-34 l22 -6 v30" stroke="#fff" stroke-width="5" fill="none"/><circle cx="-12" cy="16" r="8" fill="#fff"/><circle cx="10" cy="10" r="8" fill="#fff"/>`],
    ["NARRATIVE", "#ffcf5a", `<path d="M-22 -16 h44 v26 h-24 l-12 10 v-10 h-8z" fill="#fff"/>`],
    ["DESIGN", "#2fd3c4", `<rect x="-18" y="-18" width="36" height="36" rx="4" fill="none" stroke="#fff" stroke-width="5"/><path d="M-18 0 H18 M0 -18 V18" stroke="#fff" stroke-width="3"/>`],
    ["PLANNING", "#ff9a5a", `${[0, 1, 2].map(k => rr(-22 + k * 16, -18, 12, 36 - k * 8, 3, "#fff")).join("")}`],
    ["LEVELS", "#7ed36b", `${[0, 1, 2].map(i => [0, 1, 2].map(j => rr(-20 + i * 14, -20 + j * 14, 12, 12, 2, (i + j) % 2 ? "#fff" : "#d6ffd0")).join("")).join("")}`],
    ["FEEDBACK", "#5ab0ff", `<path d="M0 16 C-24 0 -16 -20 0 -8 C16 -20 24 0 0 16Z" fill="#fff"/>`],
    ["ENGINES", "#8b7bff", T(0, 0, A("spin", `<path d="${gearPath(0, 0, 8, 22, 16)}" fill="#fff"/><circle r="7" fill="#8b7bff"/>`, 0, 6))]];
  const cx = 600, cy = 420;
  const defs = darkBg() + glowFilter("g", 8) + rad("screen", [[0, "#3a6ab8"], [1, "#1a2a5a"]]);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("Your free toolbox", "engines · art · audio · narrative · planning · levels · feedback", "#b8f34a")}
    ${A("spin", `<ellipse cx="${cx}" cy="${cy}" rx="420" ry="230" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="2" stroke-dasharray="6 12"/>`, 0, 90)}
    ${T(cx, cy, `${A("glowf", circ(0, 0, 220, "#5ab0ff", 'opacity=".12" filter="url(#g)"'), 0, 2)}<rect x="-190" y="-130" width="380" height="240" rx="16" fill="#140f2a" stroke="#c0c8dc" stroke-width="6"/><rect x="-176" y="-116" width="352" height="212" rx="6" fill="url(#screen)"/>
      <path d="M-230 110 H230 L250 140 H-250Z" fill="#c0c8dc"/><rect x="-176" y="-116" width="352" height="22" fill="#140f2a" opacity=".6"/>${[0, 1, 2].map(k => circ(-160 + k * 14, -105, 4, ["#ff5d6b", "#ffcf5a", "#5ee08c"][k])).join("")}
      ${(() => { const kk = isoKit(0, -40, 50, 25); let s = ""; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += kk.tile(i - 2, j - 2, "none", 'stroke="#9fd8ff" stroke-opacity=".45" stroke-width="1.5"'); return s + A("bob", kk.box(-.5, -.5, 1, 1, 10, 40, "#ffcf5a", "#c98a12", "#e0a83a"), 0, 1.4); })()}
      ${rr(-170, 60, 120, 30, 4, "#140f2a", 'opacity=".6"')}${txt(-110, 80, "▶ PLAY", { size: 14, fill: "#5ee08c" })}`)}
    ${orbit.map(([l, c, ic], i) => { const a = -Math.PI / 2 + i * Math.PI * 2 / orbit.length, x = cx + Math.cos(a) * 420, y = cy + Math.sin(a) * 230; return T(x, y, A("float", `${circ(0, 0, 40, c, 'stroke="#fff" stroke-width="4"')}${ic}`, i * .6, 3 + (i % 3)) + txt(0, 66, l, { size: 14, ls: 3, fill: c })); }).join("")}`;
  return svg({ title: "A laptop running a game engine, orbited by tools for every discipline", defs, body });
}

/* 22. THREE TRAITS of the best-sellers */
export function threeTraits() {
  const R = rng(37);
  const card = (x, n, t, c, inner) => T(x, 410, A("bob", `${rr(-170, -240, 340, 470, 28, "#221a52", `stroke="${c}" stroke-width="3"`)}${circ(-130, -200, 22, c)}${txt(-130, -193, n, { size: 18, fill: "#1a1046" })}${inner}${txt(0, 190, t, { size: 21 })}`, n * .6, 3.4));
  const defs = darkBg() + glowFilter("g", 8);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${grid(R)}${title("What the best-sellers share", "simple to learn · deep to master · room to express", "#ffcf5a")}
    ${card(220, 1, "Understood in seconds", "#ffcf5a", `${A("glowf", circ(0, -30, 110, "#ffcf5a", 'opacity=".2" filter="url(#g)"'), 0, 1.4)}<ellipse cx="0" cy="20" rx="90" ry="30" fill="#5a3a10"/>${A("hop", `<ellipse cx="0" cy="0" rx="90" ry="30" fill="#c98a12"/><ellipse cx="0" cy="-12" rx="80" ry="26" fill="#ffcf5a"/><ellipse cx="-20" cy="-18" rx="30" ry="8" fill="#fff" opacity=".5"/>`, 0, .6)}
      ${T(60, -110, `<path d="M0 0 v-50 a10 10 0 0 1 20 0 v40 l20 4 q10 4 8 16 l-6 40 h-50 l-14 -40 q-4 -14 10 -12z" fill="#ffe0c2" stroke="#5a3a20" stroke-width="3"/>`, .9)}`)}
    ${card(600, 2, "Deep through systems", "#2fd3c4", `${T(-40, -40, A("spin", `<path d="${gearPath(0, 0, 12, 70, 56)}" fill="#2fd3c4"/><circle r="22" fill="#221a52"/>`, 0, 10))}${T(60, 40, A("spinR", `<path d="${gearPath(0, 0, 8, 48, 36)}" fill="#8b7bff"/><circle r="14" fill="#221a52"/>`, 0, 6.7))}${T(70, -80, A("spinR", `<path d="${gearPath(0, 0, 6, 34, 24)}" fill="#ff6fb5"/><circle r="10" fill="#221a52"/>`, 0, 5))}`)}
    ${card(980, 3, "Room for expression", "#ff6fb5", `${[[-60, 40, "#ff6fb5"], [0, 40, "#5ab0ff"], [60, 40, "#7ed36b"], [-30, -20, "#ffcf5a"], [30, -20, "#ff9a5a"]].map(([x, y, c]) => rr(x - 28, y - 28, 56, 56, 8, c, 'stroke="#1a1046" stroke-width="3"')).join("")}<path d="M-64 -48 L0 -110 L64 -48Z" fill="#b07aff" stroke="#1a1046" stroke-width="3"/>
      ${T(110, -130, A("bob", rr(-24, -24, 48, 48, 8, "#2fd3c4", 'stroke="#1a1046" stroke-width="3"'), 0, .8))}`)}`;
  return svg({ title: "Three shared traits of best-selling games: simple, deep, expressive", defs, body });
}
