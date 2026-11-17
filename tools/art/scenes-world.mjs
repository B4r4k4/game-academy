import { F, rng, svg, A, T, lin, rad, glowFilter, blurFilter, shadowFilter, txt, rr, circ, poly, path, stars, pine, bush, cloud, ridge, starShape, lanternGlowDef, novaBack, novaTiny, isoKit, shade, r1 } from "./lib.mjs";

/* ---------------------------------------------------------------- */
/* 1. HERO — "The Beacon at Dusk" (key art + layered home hero)      */
/* ---------------------------------------------------------------- */
export function heroSummit({ layered = false } = {}) {
  const R = rng(7), W = 1600, H = 900;
  const L = (depth, inner) => layered ? `<g class="L" data-depth="${depth}">${inner}</g>` : inner;
  const island = (x, y, s, tower) => T(x, y, A("float", `
      <path d="M-120 0 Q-60 -18 0 -16 Q70 -20 120 0 L60 70 L10 150 L-30 80 Z" fill="url(#rock)"/>
      <path d="M-128 2 Q-60 -26 0 -22 Q74 -28 128 2 Q60 14 0 12 Q-70 16 -128 2Z" fill="#69e09a"/>
      <path d="M-128 2 Q-60 14 0 12 Q74 16 128 2 L124 10 Q60 24 0 22 Q-70 26 -124 10Z" fill="#3fae7c"/>
      ${A("dash", `<path d="M96 10 L96 220" stroke="url(#fallG)" stroke-width="9" stroke-dasharray="16 12" fill="none" opacity=".85"/>`, R() * 2, 1.1)}
      ${pine(-80, -2, 46, "#4fc98a", "#2a8f6c")}${pine(-58, 0, 34, "#4fc98a", "#2a8f6c")}${pine(70, -2, 40, "#4fc98a", "#2a8f6c")}
      ${tower ? `
        <rect x="-16" y="-110" width="32" height="96" rx="4" fill="#3b2a66"/><rect x="0" y="-110" width="16" height="96" fill="#2c1f52"/>
        <rect x="-7" y="-70" width="14" height="20" rx="7" fill="#ffd36b"/><path d="M-26 -108 L0 -150 L26 -108Z" fill="#ff6b8a"/>
        ${A("glowf", `<circle cx="0" cy="-122" r="70" fill="url(#beacon)"/>`, 0, 1.6)}
        ${A("glowf", `<polygon points="0,-128 -420,-260 -420,-200" fill="url(#beam)" opacity=".55"/>`, .8, 3)}
        <circle cx="0" cy="-124" r="9" fill="#fff8d6"/>` : ""}
    `, R() * 4, 5 + R() * 2), s);

  let ff = "";
  for (let i = 0; i < 28; i++) ff += T(R() * W, 380 + R() * 500, A(i % 2 ? "bob" : "rise", circ(0, 0, 2 + R() * 2.5, "#ffe9a0", 'filter="url(#glowS)"'), R() * 4, 2.5 + R() * 3));
  let birds = "";
  for (let i = 0; i < 5; i++) birds += T(300 + i * 70 + R() * 40, 200 + R() * 80, A("bob", `<path d="M-10 0 Q-5 -6 0 0 Q5 -6 10 0" stroke="#3a2357" stroke-width="2.5" fill="none"/>`, R() * 3, 1 + R()));

  const defs = lin("sky", [[0, "#1b0f47"], [.38, "#4d1f74"], [.62, "#b23d7c"], [.8, "#ff8a5c"], [1, "#ffd27a"]]) +
    rad("sun", [[0, "#fff6d0"], [.18, "#ffd27a", .95], [.45, "#ff9a5a", .35], [1, "#ff6b8a", 0]]) +
    lin("rock", [[0, "#6a4b9a"], [1, "#24163f"]]) + lin("fallG", [[0, "#bff4ff"], [1, "#bff4ff", 0]]) +
    rad("beacon", [[0, "#fff8d6", 1], [.3, "#ffd36b", .6], [1, "#ff9a3c", 0]]) + lin("beam", [[0, "#ffe9a0", .9], [1, "#ffe9a0", 0]], 1, 0, 0, 0) +
    lin("pathG", [[0, "#ffcf8a", .9], [1, "#ffe7b8", .25]], 0, 1, 0, 0) + lin("fog", [[0, "#ff9a7a", 0], [1, "#ff9a7a", .45]]) +
    lanternGlowDef() + glowFilter("glowS", 3) + blurFilter("soft", 3);

  const body =
    L(0, `<rect width="${W}" height="${H}" fill="url(#sky)"/>${stars(R, 90, W, 380)}<circle cx="1060" cy="600" r="260" fill="url(#sun)"/>`) +
    L(.06, ridge(R, W, 600, 160, 7, "#7a3f8f", 'opacity=".75"') + ridge(R, W, 650, 120, 9, "#5a2d78")) +
    L(.12, A("drift", cloud(140, 250, 1.3, "#ffb3c7", .35) + cloud(620, 170, 1, "#ffc9b0", .3), 3) + birds) +
    L(.18, island(1120, 380, 1.05, true) + island(780, 250, .55) + island(1430, 230, .45) + island(480, 330, .38)) +
    L(.28, `<rect y="560" width="${W}" height="200" fill="url(#fog)"/>` + ridge(R, W, 720, 90, 6, "#3a1f63") +
      `<path d="M1180 760 C1000 740 1020 690 880 690 C760 690 820 650 700 640" stroke="url(#pathG)" stroke-width="16" fill="none" stroke-linecap="round" opacity=".8"/>` +
      Array.from({ length: 16 }, (_, i) => pine(i * 105 + R() * 40, 735 + R() * 20, 70 + R() * 50, "#2d1952", "#241443", "#1e1038")).join("")) +
    L(.36, A("driftL", cloud(1250, 520, 1.1, "#ffd0c0", .25) + cloud(260, 600, 1.4, "#ffc0d0", .2), 7)) +
    L(.5, `<path d="M820 900 L860 790 Q900 740 1000 728 Q1120 716 1210 722 Q1330 730 1420 770 L1600 800 L1600 900Z" fill="#1a0f33"/>
      <path d="M860 790 Q900 740 1000 728 Q1120 716 1210 722 Q1330 730 1420 770 L1410 782 Q1300 748 1200 742 Q1080 738 990 748 Q920 758 880 800Z" fill="#2c1a4f"/>` +
      T(1190, 728, novaBack(), 1.15) + ff) +
    L(.7, `<path d="M0 900 L0 640 Q40 600 80 650 Q100 560 150 620 Q190 540 230 640 Q270 600 300 700 Q330 680 340 760 L380 900Z" fill="#0d0720"/>
      <path d="M1600 900 L1600 560 Q1560 600 1540 660 Q1500 590 1480 700 Q1450 650 1440 760 L1400 900Z" fill="#0d0720"/>
      <path d="M60 900 Q90 760 170 700 Q120 790 140 900Z" fill="#1a0f33"/>`);
  return svg({ w: W, h: H, title: "Nova the explorer watches a beacon on a floating island at dusk", defs, body, attrs: layered ? 'preserveAspectRatio="xMidYMid slice" class="hero-scene"' : "" });
}

/* ---------------------------------------------------------------- */
/* 2. LEVEL MAP — "Coral Isles" saga map                             */
/* ---------------------------------------------------------------- */
export function levelMap() {
  const R = rng(21);
  const nodes = [[170, 586], [280, 560], [330, 510], [240, 430], [330, 340], [470, 320], [580, 390], [690, 460], [800, 420], [860, 320], [780, 230], [900, 160], [1030, 200], [1080, 300]];
  const cur = 7;
  let d = `M${nodes[0]}`; for (let i = 1; i < nodes.length; i++) { const [x0, y0] = nodes[i - 1], [x1, y1] = nodes[i]; d += ` Q${(x0 + x1) / 2 + (i % 2 ? 40 : -40)} ${(y0 + y1) / 2} ${x1} ${y1}`; }
  const isl = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y + 10}" rx="${rx + 18}" ry="${ry + 14}" fill="#7fe3e6" opacity=".55"/><ellipse cx="${x}" cy="${y + 6}" rx="${rx + 6}" ry="${ry + 6}" fill="#f6dda0"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#7ed36b"/><ellipse cx="${x - rx * .3}" cy="${y - ry * .3}" rx="${rx * .5}" ry="${ry * .4}" fill="#9be37f"/>`;
  let waves = ""; for (let i = 0; i < 40; i++) { const x = R() * 1200, y = R() * 750; waves += T(x, y, A("wave", `<path d="M0 0 q8 -6 16 0 t16 0" stroke="#bff6ff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>`, R() * 5, 3 + R() * 3)); }
  const nodeSvg = nodes.map(([x, y], i) => {
    const done = i < cur, now = i === cur, c = done ? "#3fa9ff" : now ? "#ffcf5a" : "#a7adc4", cd = done ? "#1f6fc0" : now ? "#d08a1a" : "#6e7590";
    const nstars = done ? [3, 2, 3, 3, 1, 2, 3][i] : 0;
    const st = done ? [0, 1, 2].map(k => poly(starShape(x - 22 + k * 22, y - 40 - (k === 1 ? 6 : 0), 10), k < nstars ? "#ffd84a" : "#7d7f95", 'stroke="#5a3a10" stroke-width="2"')).join("") : "";
    return `${now ? A("pulse", circ(x, y, 34, "#ffcf5a", 'opacity=".5"')) : ""}<ellipse cx="${x}" cy="${y + 8}" rx="30" ry="22" fill="${cd}"/><ellipse cx="${x}" cy="${y}" rx="30" ry="22" fill="${c}" stroke="#fff" stroke-width="3"/>
      ${i <= cur ? txt(x, y + 8, i + 1, { size: 22, fill: "#fff", stroke: cd, sw: 4 }) : `<rect x="${x - 8}" y="${y - 4}" width="16" height="12" rx="3" fill="#5b6078"/><path d="M${x - 5} ${y - 4} v-4 a5 5 0 0 1 10 0 v4" stroke="#5b6078" stroke-width="3" fill="none"/>`}${st}`;
  }).join("");
  const [px, py] = nodes[cur];
  const icon = (x, shape, lbl, big) => T(x, big ? 690 : 700, `${big ? circ(0, -8, 44, "#ffcf5a", 'stroke="#fff" stroke-width="4"') : ""}${shape}${txt(0, big ? 44 : 34, lbl, { size: big ? 17 : 13, fill: "#fff" })}`);
  const defs = lin("sea", [[0, "#1fc2d6"], [1, "#0f6d9a"]]) + glowFilter("g", 5) + shadowFilter("drop") + lin("bar", [[0, "#7a4a2a"], [1, "#4f2e1a"]]);
  const body = `<rect width="1200" height="750" fill="url(#sea)"/>${waves}
    ${isl(210, 560, 150, 100)}${isl(330, 380, 120, 80)}${isl(640, 420, 170, 70)}${isl(840, 300, 110, 90)}${isl(980, 190, 150, 70)}${isl(1080, 330, 70, 50)}
    ${T(560, 210, isl(0, 0, 60, 34) + `<rect x="-10" y="-80" width="20" height="74" fill="#fff"/><rect x="-10" y="-62" width="20" height="10" fill="#ff5d73"/><rect x="-10" y="-38" width="20" height="10" fill="#ff5d73"/><path d="M-14 -80 h28 l-14 -18z" fill="#ff5d73"/>${A("glowf", `<polygon points="0,-88 -220,-140 -220,-100" fill="#fff6c9" opacity=".5"/>`, 0, 1.4)}<circle cx="0" cy="-88" r="7" fill="#fff6c9"/>`)}
    ${T(980, 160, `<rect x="-10" y="-64" width="20" height="60" fill="#e9d2a8"/><path d="M-14 -64 h28 l-14 -16z" fill="#c75a4a"/>${T(0, -62, A("spin", `<path d="M0 0 L-4 -40 L4 -40Z M0 0 L40 -4 L40 4Z M0 0 L4 40 L-4 40Z M0 0 L-40 4 L-40 -4Z" fill="#fff" stroke="#8a6a4a" stroke-width="2"/>`, 0, 6))}`)}
    ${[[120, 520], [380, 360], [900, 280], [1020, 170], [560, 430], [740, 400]].map(([x, y], i) => T(x, y, `<rect x="-3" y="-60" width="6" height="60" rx="3" fill="#8a5a3c" transform="rotate(${i % 2 ? 8 : -8})"/>${A("sway", `<path d="M0 -60 q-30 -6 -44 10 M0 -60 q28 -10 44 6 M0 -60 q-14 -20 -30 -22 M0 -60 q16 -22 32 -18" stroke="#3fae5c" stroke-width="8" fill="none" stroke-linecap="round"/>`, i)}`, .9)).join("")}
    <path d="${d}" stroke="#5a3a20" stroke-width="20" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="${d}" stroke="#f6e3b5" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="2 14"/>
    ${T(470, 470, `<rect x="-26" y="-18" width="52" height="34" rx="6" fill="#a8622f"/><rect x="-28" y="-26" width="56" height="16" rx="6" fill="#c97a3a"/><rect x="-6" y="-14" width="12" height="12" rx="2" fill="#ffcf5a"/>${A("tw", poly(starShape(26, -30, 8, 3, 4), "#fff"), 0, .8)}`)}
    ${T(1100, 460, A("bob", `<path d="M-30 0 h60 l-10 16 h-40z" fill="#c97a3a"/><rect x="-2" y="-46" width="4" height="46" fill="#7a4a2a"/><path d="M2 -44 l26 30 h-26z" fill="#fff"/>`, 1, 2.2))}
    ${nodeSvg}
    ${T(px, py - 60, A("bob", `<path d="M0 30 C-26 0 -26 -30 0 -30 C26 -30 26 0 0 30Z" fill="#ff5d73" stroke="#fff" stroke-width="4" filter="url(#drop)"/>${circ(0, -8, 11, "#fff")}`, 0, .7))}
    ${rr(18, 18, 56, 56, 16, "#ffb13b", 'stroke="#fff" stroke-width="4"')}${T(46, 46, `<path d="${gear()}" fill="#fff"/>`)}
    ${T(430, 46, rr(-80, -22, 190, 44, 22, "#1a2a4a", 'opacity=".75"') + circ(-80, 0, 26, "#ffcf5a", 'stroke="#c98a12" stroke-width="4"') + txt(-80, 8, "✦", { size: 22, fill: "#c98a12" }) + txt(10, 9, "12,480", { size: 22 }) + circ(110, 0, 18, "#5ee08c", 'stroke="#fff" stroke-width="3"') + txt(110, 8, "+", { size: 24 }))}
    ${T(740, 46, rr(-80, -22, 190, 44, 22, "#1a2a4a", 'opacity=".75"') + poly([[-80, -28], [-56, -10], [-64, 22], [-96, 22], [-104, -10]], "#d65cff", 'stroke="#fff" stroke-width="3"') + txt(10, 9, "860", { size: 22 }) + circ(110, 0, 18, "#5ee08c", 'stroke="#fff" stroke-width="3"') + txt(110, 8, "+", { size: 24 }))}
    <rect y="650" width="1200" height="100" fill="url(#bar)"/><rect y="650" width="1200" height="6" fill="#c98a52"/>
    ${icon(140, `<path d="M-16 6 v-18 l16 -12 l16 12 v18z" fill="#ffcf5a" stroke="#fff" stroke-width="3"/>`, "HOME")}
    ${icon(370, `<path d="M-16 -16 h32 v8 a16 16 0 0 1 -32 0z M-6 8 h12 v10 h-12z" fill="#ffcf5a" stroke="#fff" stroke-width="3"/>`, "TROPHIES")}
    ${icon(600, `<path d="M-22 -24 l14 6 l16 -6 l14 6 v34 l-14 -6 l-16 6 l-14 -6z" fill="#7ed36b" stroke="#fff" stroke-width="3"/>`, "MAP", true)}
    ${icon(830, `<circle cx="-8" cy="-12" r="9" fill="#ff8fa3" stroke="#fff" stroke-width="3"/><circle cx="10" cy="-10" r="9" fill="#3fa9ff" stroke="#fff" stroke-width="3"/><path d="M-22 12 q14 -18 28 0z M-2 12 q12 -16 26 0z" fill="#fff"/>`, "FRIENDS")}
    ${icon(1060, `<rect x="-18" y="-14" width="36" height="28" rx="5" fill="#d65cff" stroke="#fff" stroke-width="3"/><path d="M-18 -14 l18 -12 l18 12" fill="none" stroke="#fff" stroke-width="3"/>`, "SHOP")}`;
  return svg({ title: "Coral Isles: a saga level-select map with numbered nodes across islands", defs, body });
}
function gear() { let d = ""; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2, r = i % 4 < 2 ? 18 : 13; d += (i ? "L" : "M") + r1(Math.cos(a) * r) + " " + r1(Math.sin(a) * r); } return d + "Z M6 0 A6 6 0 1 0 -6 0 A6 6 0 1 0 6 0Z"; }

/* ---------------------------------------------------------------- */
/* 3. WORLD MAP — "Realm of Aster" + party select                    */
/* ---------------------------------------------------------------- */
export function worldMap() {
  const R = rng(33);
  const land = "M130 300 C110 170 260 70 420 92 C540 50 700 60 820 96 C980 70 1100 160 1080 290 C1110 400 1040 520 880 530 C760 560 600 540 480 548 C320 560 160 520 140 420 C110 380 120 340 130 300Z";
  let waves = ""; for (let i = 0; i < 30; i++) waves += T(R() * 1200, R() * 570, A("wave", `<path d="M0 0 q8 -6 16 0 t16 0" stroke="#8fd8ff" stroke-width="2.5" fill="none" opacity=".45"/>`, R() * 5, 3 + R() * 3));
  const peaks = Array.from({ length: 7 }, (_, i) => { const x = 220 + i * 50 + R() * 20, y = 170 + (i % 2) * 40, h = 70 + R() * 40; return poly([[x - 40, y + 40], [x, y - h + 40], [x + 40, y + 40]], "#b8c8ef") + poly([[x - 14, y - h * .45 + 40], [x, y - h + 40], [x + 14, y - h * .45 + 40], [x + 4, y - h * .3 + 40], [x - 6, y - h * .4 + 40]], "#fff"); }).join("");
  const mesas = Array.from({ length: 5 }, (_, i) => { const x = 680 + i * 70 + R() * 20, y = 420 + (i % 2) * 30, w = 40 + R() * 30, h = 40 + R() * 30; return rr(x - w / 2, y - h, w, h, 4, "#d9734e") + rr(x - w / 2, y - h, w, 10, 4, "#f2a46a") + rr(x - w / 2 + w * .6, y - h + 10, w * .4, h - 10, 0, "#b55a3a"); }).join("");
  const towers = Array.from({ length: 6 }, (_, i) => { const x = 740 + i * 46, h = 60 + R() * 70, y = 250; return rr(x, y - h, 32, h, 4, "#4b3a8a") + rr(x + 16, y - h, 16, h, 0, "#3a2c70") + Array.from({ length: Math.floor(h / 18) }, (_, k) => A("tw", rr(x + 6, y - h + 8 + k * 18, 8, 6, 1, k % 2 ? "#ff6fb5" : "#5ab0ff"), R() * 3, 1 + R() * 2)).join(""); }).join("");
  const road = "M300 470 C380 420 360 360 430 330 C500 300 470 230 380 210 C470 170 600 200 640 260 C680 320 760 300 860 270 C900 330 820 380 780 430 C840 470 900 470 960 440";
  const label = (x, y, s, c) => T(x, y, rr(-90, -18, 180, 36, 18, "#1a1238", 'opacity=".85"') + circ(-72, 0, 8, c) + txt(6, 7, s, { size: 17 }));
  const card = (x, name, color, shape, sel) => T(x, 650, `${sel ? A("pulse", rr(-96, -86, 192, 172, 22, "none", `stroke="${color}" stroke-width="5"`)) : ""}${rr(-88, -78, 176, 156, 18, "#221a45", `stroke="${sel ? color : "#3a2f6a"}" stroke-width="3"`)}${rr(-88, -78, 176, 96, 18, shade(color, -.45))}${A("bob", shape, R() * 2, 1.4)}${txt(0, 52, name, { size: 17 })}`);
  const defs = lin("sea", [[0, "#1b4b8f"], [1, "#122f63"]]) + `<clipPath id="land"><path d="${land}"/></clipPath>` + glowFilter("g", 4);
  const body = `<rect width="1200" height="750" fill="url(#sea)"/>${waves}
    <path d="${land}" fill="#f2dfa7" transform="translate(0 12)" opacity=".6"/><path d="${land}" fill="#f6e3b5" stroke="#fff" stroke-width="6" stroke-opacity=".4"/>
    <g clip-path="url(#land)">
      <rect x="0" y="0" width="610" height="290" fill="#cfe0ff"/>${peaks}
      <rect x="610" y="0" width="600" height="300" fill="#2a2058"/>${towers}
      <rect x="0" y="290" width="610" height="300" fill="#8fd16a"/>${[[200, 420], [260, 380], [500, 470], [440, 400], [180, 480]].map(([x, y]) => bush(x, y, .9)).join("")}
      <rect x="610" y="300" width="600" height="300" fill="#f2b06a"/>${mesas}
      <path d="M610 0 V600 M0 295 H1200" stroke="#000" stroke-opacity=".15" stroke-width="6"/>
    </g>
    <path d="${road}" stroke="#7a4f1c" stroke-width="18" fill="none" stroke-linecap="round" opacity=".45"/>
    ${A("dash", `<path d="${road}" stroke="#ffd84a" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="18 10"/>`, 0, 1.6)}
    ${[[300, 470], [430, 330], [380, 210], [640, 260], [860, 270], [780, 430], [960, 440]].map(([x, y], i) => circ(x, y, 12, i < 3 ? "#ffd84a" : "#fff", 'stroke="#7a4f1c" stroke-width="4"')).join("")}
    ${T(300, 470, novaTiny(1.1))}
    ${label(330, 100, "Frostpeak", "#bfe0ff")}${label(880, 84, "Gearspire", "#ff6fb5")}${label(200, 512, "Bloom Meadows", "#7ed36b")}${label(980, 500, "Ember Canyon", "#ff9a5a")}
    ${T(1110, 90, A("spin", `<circle r="44" fill="#1a1238" opacity=".7"/><path d="M0 -40 L8 0 L0 40 L-8 0Z" fill="#ffd84a"/><path d="M-40 0 L0 -8 L40 0 L0 8Z" fill="#fff" opacity=".7"/>`, 0, 40))}
    ${txt(1110, 30, "N", { size: 16, fill: "#ffd84a" })}
    <rect y="572" width="1200" height="178" fill="#120c2a"/><rect y="572" width="1200" height="4" fill="#3a2f6a"/>
    ${card(210, "Bloom · Healer", "#7ed36b", `<circle cx="0" cy="-30" r="34" fill="#7ed36b"/><circle cx="-10" cy="-36" r="4" fill="#1a1430"/><circle cx="10" cy="-36" r="4" fill="#1a1430"/>`, false)}
    ${card(460, "Frost · Ranger", "#9fc8ff", `<rect x="-18" y="-72" width="36" height="84" rx="14" fill="#9fc8ff"/><circle cx="-6" cy="-50" r="4" fill="#1a1430"/><circle cx="8" cy="-50" r="4" fill="#1a1430"/>`, true)}
    ${card(710, "Ember · Guardian", "#ff9a5a", `<rect x="-36" y="-62" width="72" height="66" rx="10" fill="#ff9a5a"/><circle cx="-12" cy="-36" r="4" fill="#1a1430"/><circle cx="12" cy="-36" r="4" fill="#1a1430"/>`, false)}
    ${card(960, "Gear · Rogue", "#ff6fb5", `<polygon points="0,-74 38,8 -38,8" fill="#ff6fb5"/><path d="M-12 -24 l8 4 M12 -24 l-8 4" stroke="#1a1430" stroke-width="4"/>`, false)}`;
  return svg({ title: "Realm of Aster: a four-biome world map with a party-select row", defs, body });
}

/* ---------------------------------------------------------------- */
/* 4. PIXEL BIOMES — four panels                                     */
/* ---------------------------------------------------------------- */
export function pixelBiomes() {
  const R = rng(4), S = 10;
  const px = (x, y, c, w = 1, h = 1) => `<rect x="${x * S}" y="${y * S}" width="${w * S}" height="${h * S}" fill="${c}"/>`;
  const sprite = (rows, pal, ox, oy) => rows.map((r, y) => [...r].map((ch, x) => ch === "." ? "" : px(ox + x, oy + y, pal[ch])).join("")).join("");
  const hero = ["..hhhh..", ".hhhhhh.", ".hffffh.", ".fefeff.", "..ffff..", ".ssssss.", "cbbbbbbc", ".bbbbbb.", ".bb..bb.", ".kk..kk."];
  const heroPal = { h: "#2fd3c4", f: "#ffe0c2", e: "#1a1430", s: "#ff5d73", b: "#2fd3c4", c: "#ffe0c2", k: "#5a3322" };
  const noise = (x0, y0, w, h, cols, n) => Array.from({ length: n }, () => px(x0 + Math.floor(R() * w), y0 + Math.floor(R() * h), cols[Math.floor(R() * cols.length)])).join("");
  const shadow = (x, y) => px(x + 1, y, "#000", 6, 1).replace("/>", ' opacity=".25"/>');
  const panel = (i, inner) => `<g transform="translate(${i * 300} 0)"><svg width="294" height="750" viewBox="0 0 294 750">${inner}</svg></g>`;
  // Beach
  const beach = px(0, 0, "#2b8fd8", 30, 22) + px(0, 0, "#1f6fbf", 30, 8) + noise(0, 0, 30, 22, ["#5ab8f0", "#1f6fbf"], 70) +
    A("tw", px(0, 20, "#e8fbff", 30, 1) + noise(0, 18, 30, 4, ["#e8fbff"], 20), 0, 1.4) +
    px(0, 22, "#f2d48a", 30, 53) + noise(0, 22, 30, 53, ["#e6c070", "#f8e2a6", "#d9ad5c"], 160) +
    sprite(["...gg...", ".gggggg.", "gg.tt.gg", "...tt...", "...tt...", "...tt...", "...tt...", "..tttt.."], { g: "#3fae5c", t: "#a8714c" }, 20, 26) +
    A("bob", sprite(["..pppp..", ".pppppp.", "pwpppwpp", "pppppppp", ".p.p.p.p", "p.p.p.p.", ".p...p.."], { p: "#ff8fb1", w: "#fff" }, 3, 42), 0, 1.2) +
    sprite(["r.r", "rrr", ".r."], { r: "#ff6b4a" }, 22, 60) + shadow(12, 59) + sprite(hero, heroPal, 12, 49) + px(17, 52, "#bff6ff") + px(18, 51, "#7fe3ff");
  // Jungle village
  const jungle = px(0, 0, "#6fcf5a", 30, 75) + noise(0, 0, 30, 75, ["#5abb4a", "#86dd6a", "#4aa63e"], 260) +
    px(0, 30, "#3aa0c8", 30, 6) + noise(0, 30, 30, 6, ["#5fc1e6", "#2a86b0"], 40) + px(10, 29, "#a8714c", 8, 8) + noise(10, 29, 8, 8, ["#8a5a3c"], 12) +
    sprite(["....yy....", "...yyyy...", "..yyyyyy..", ".yyyyyyyy.", "yyyyyyyyyy", ".wwwwwwww.", ".wwddwwww.", ".wwddwwww.", ".wwddwwww."], { y: "#d9a84a", w: "#f2d4a0", d: "#6b4020" }, 2, 6) +
    sprite(["....yy....", "...yyyy...", "..yyyyyy..", ".yyyyyyyy.", "yyyyyyyyyy", ".wwwwwwww.", ".wwwwddww.", ".wwwwddww."], { y: "#c98a3a", w: "#f2d4a0", d: "#6b4020" }, 18, 12) +
    A("sway", [0, 1, 2, 3, 4, 5].map(k => px(4 + k * 4, 3 + (k % 2), ["#ff5d73", "#ffcf5a", "#5ab0ff"][k % 3], 2, 2)).join("") + px(2, 3, "#fff", 26, 1).replace("/>", ' opacity=".5"/>'), 0, 2) +
    [[4, 46], [22, 44], [6, 64], [24, 66]].map(([x, y]) => sprite([".gggg.", "gggggg", "gGgggg", ".gggg."], { g: "#2f8f3a", G: "#4fb84a" }, x, y)).join("") +
    shadow(13, 59) + sprite(hero, heroPal, 13, 49) + shadow(20, 41) + sprite(["..oooo..", ".oooooo.", ".offffo.", ".fefeff.", "..ffff..", ".gggggg.", ".gggggg.", ".gg..gg."], { o: "#ff9a3c", f: "#ffe0c2", e: "#1a1430", g: "#7a5ad8" }, 20, 33);
  // Autumn forest
  let leaves = ""; for (let i = 0; i < 12; i++) leaves += T(R() * 280, R() * 200, A("fall", px(0, 0, ["#ff9a3c", "#ffcf5a", "#d94f3a"][i % 3]), R() * 7, 6 + R() * 3));
  const autumn = px(0, 0, "#7a8a3a", 30, 75) + noise(0, 0, 30, 75, ["#8f9e44", "#6a7a30", "#a08a3a"], 220) + px(11, 0, "#8a5a3c", 8, 75) + noise(11, 0, 8, 75, ["#a8714c", "#6b4a2f", "#d9a84a"], 90) +
    [[0, 4, "#d94f3a"], [19, 8, "#ff9a3c"], [-2, 30, "#ffb13b"], [20, 36, "#d94f3a"], [0, 56, "#ff9a3c"], [21, 62, "#ffcf5a"]].map(([x, y, c]) => sprite(["..cccccc..", ".cccccccc.", "cccCcccccc", "cccccccCcc", ".cccccccc.", "..ccbbcc..", "....bb....", "....bb...."], { c, C: shade(c, .25), b: "#5a3322" }, x, y)).join("") +
    sprite(["sss", "sws", "sss", ".s."], { s: "#8a8aa0", w: "#ffd36b" }, 20, 26) + A("glowf", circ(215, 285, 26, "#ffd36b", 'opacity=".35"'), 0, 1.2) +
    shadow(12, 59) + sprite(hero, heroPal, 12, 49) + A("bob", sprite([".ww.", "wwww", "wewe", "wwww", "w.w."], { w: "#f2e8d0", e: "#1a1430" }, 4, 22), 1, 1.6) + leaves;
  // Desert ruins
  const desert = px(0, 0, "#e8b878", 30, 75) + noise(0, 0, 30, 75, ["#d9a060", "#f2cc90", "#c98a4a"], 240) +
    sprite(["SSSSSSSSSSSS", "SssSSssSSssS", "SS........SS", "SS........SS", "Ss........sS", "SS........SS", "SS........SS", "sS........Ss", "SS........SS"], { S: "#9a8a9a", s: "#7a6a80" }, 9, 6) +
    sprite(["..g..", ".gg.g", "gggg.", ".ggg.", "..gg.", "..gg."], { g: "#4f9a5a" }, 2, 30) + sprite(["..g..", "g.gg.", ".ggg.", "..gg.", "..gg."], { g: "#4f9a5a" }, 23, 44) +
    sprite(["bbbbbb", "bggggb", "bbybbb", "bbbbbb"], { b: "#8a5a3c", g: "#c98a3a", y: "#ffd84a" }, 22, 22) +
    A("bob", sprite([".s....s.", "ss.ss.ss", ".ssssss.", "..ssss..", ".s.ss.s.", "s..ss..s", "...ss...", "..ss...."], { s: "#2a1a2a" }, 3, 58), 0, .8) +
    px(2, 70, "#fff", 1, 1) + sprite(["www", "wkw", ".w."], { w: "#f2ede0", k: "#2a1a2a" }, 26, 66) + shadow(14, 51) + sprite(hero, heroPal, 14, 41);
  const body = `<rect width="1200" height="750" fill="#120c22"/>` + panel(0, beach) + panel(1, jungle) + panel(2, autumn) + panel(3, desert) +
    ["BEACH", "JUNGLE VILLAGE", "AUTUMN WOODS", "DESERT RUINS"].map((s, i) => T(i * 300 + 147, 724, rr(-90, -20, 180, 34, 6, "#120c22", 'opacity=".8"') + txt(0, 4, s, { size: 15, ls: 2, font: "Consolas,'Courier New',monospace" }))).join("");
  return svg({ title: "Four pixel-art biomes sharing one hero, outline and light direction", body, attrs: 'shape-rendering="crispEdges"' });
}

/* ---------------------------------------------------------------- */
/* 5. ISOMETRIC DUNGEON                                              */
/* ---------------------------------------------------------------- */
export function isoDungeon() {
  const R = rng(9); const { P, box, tile } = isoKit(600, 150, 104, 52); const N = 8, WH = 170;
  let floor = "";
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const pit = i >= 3 && i <= 4 && j >= 3 && j <= 4;
    if (pit) continue;
    const moss = (i + j * 3) % 7 === 0 || (i === 1 && j > 4) || (j === 6 && i < 3);
    floor += tile(i, j, moss ? (R() > .5 ? "#3f6b3a" : "#4a7a40") : ((i + j) % 2 ? "#3c3754" : "#36314c"), 'stroke="#25203a" stroke-width="2"');
  }
  let pit = tile(3, 3, "#0b0814") + tile(4, 3, "#0b0814") + tile(3, 4, "#0b0814") + tile(4, 4, "#0b0814");
  for (let k = 0; k < 5; k++) { if (k === 2) continue; const a = P(3 + k * .4, 3), b = P(3 + k * .4 + .3, 3), c = P(3 + k * .4 + .3, 5), d = P(3 + k * .4, 5); pit += poly([a, b, c, d], k % 2 ? "#8a5a3c" : "#a8714c", 'stroke="#4a2e1a" stroke-width="2"'); }
  const wallR = poly([P(0, 0, 0), P(N, 0, 0), P(N, 0, WH), P(0, 0, WH)], "#4d4670"), wallL = poly([P(0, 0, 0), P(0, N, 0), P(0, N, WH), P(0, 0, WH)], "#3f3960");
  let bricks = "";
  for (let z = 22; z < WH; z += 22) { bricks += `<path d="M${P(0, 0, z)} L${P(N, 0, z)} M${P(0, 0, z)} L${P(0, N, z)}" stroke="#2c2746" stroke-width="2"/>`; }
  for (let z = 0; z < WH; z += 22) for (let k = 0; k < N * 2; k++) { const o = ((z / 22) % 2) * .25; bricks += `<path d="M${P(k * .5 + o, 0, z)} L${P(k * .5 + o, 0, z + 22)} M${P(0, k * .5 + o, z)} L${P(0, k * .5 + o, z + 22)}" stroke="#2c2746" stroke-width="2"/>`; }
  const cap = box(0, -.3, N, .3, WH, 14, "#6a6290", "#4d4670", "#5a5280") + box(-.3, -.3, .3, N + .3, WH, 14, "#6a6290", "#4d4670", "#5a5280");
  const door = poly([P(3, 0, 0), P(4.2, 0, 0), P(4.2, 0, 110), P(3.6, 0, 140), P(3, 0, 110)], "#0f0b1c");
  const candle = (i, j, z = 0) => { const [x, y] = P(i, j, z); return A("glowf", circ(x, y - 40, 70, "url(#warm)"), R() * 2, 1.4 + R()) + rr(x - 4, y - 26, 8, 22, 2, "#f2e8d0") + T(x, y - 30, A("flick", `<ellipse cx="0" cy="-4" rx="4" ry="8" fill="#ffd36b"/><ellipse cx="0" cy="-3" rx="2" ry="4" fill="#fff"/>`, R())); };
  const crystal = (i, j, z = 0) => { const [x, y] = P(i, j, z); return A("pulse", circ(x, y - 24, 46, "url(#cool)"), R() * 2, 2) + poly([[x, y - 46], [x + 10, y - 20], [x, y - 6], [x - 10, y - 20]], "#5ab0ff") + poly([[x, y - 46], [x + 10, y - 20], [x, y - 6]], "#9fd8ff"); };
  const table = (i, j) => box(i, j, 1, .7, 30, 8, "#a8714c", "#7a4a2a", "#8a5a3c") + box(i + .05, j + .55, .1, .1, 0, 30, "#6b4020", "#4a2e1a", "#5a3322") + box(i + .85, j + .55, .1, .1, 0, 30, "#6b4020", "#4a2e1a", "#5a3322");
  const arch = box(2, 6, .6, .6, 0, 130, "#5aa08a", "#3a6a64", "#4a8078") + box(2, 7.2, .6, .6, 0, 130, "#5aa08a", "#3a6a64", "#4a8078");
  const [ax, ay] = P(2.3, 6.3, 130), [bx, by] = P(2.3, 7.5, 130);
  const archTop = `<path d="M${ax - 18} ${ay} Q${(ax + bx) / 2} ${ay - 70} ${bx + 18} ${by}" stroke="#5aa08a" stroke-width="26" fill="none"/>`;
  const stairs = [0, 1, 2, 3].map(k => box(6, 1 + k * .5, 2, .5, 0, 60 - k * 15, "#5a5280", "#3f3960", "#4d4670")).join("") + box(6, 0, 2, 1, 0, 60, "#6a6290", "#3f3960", "#4d4670");
  const chest = box(1, .4, .9, .6, 0, 34, "#c98a3a", "#8a5a3c", "#a8714c") + A("tw", poly(starShape(...P(1.4, .7, 50), 9, 3, 4), "#fff"), 0, .9);
  let dust = ""; for (let i = 0; i < 26; i++) dust += T(200 + R() * 800, 200 + R() * 450, A("bob", circ(0, 0, 1.5 + R() * 1.5, "#cfc8ff", 'opacity=".5"'), R() * 4, 3 + R() * 3));
  const defs = rad("warm", [[0, "#ffd36b", .55], [1, "#ff9a3c", 0]]) + rad("cool", [[0, "#7fd0ff", .55], [1, "#5ab0ff", 0]]) + rad("vig", [[.55, "#000", 0], [1, "#000", .65]]);
  const body = `<rect width="1200" height="750" fill="#120c22"/>${wallL}${wallR}${bricks}${door}${cap}${floor}${pit}
    ${box(0.1, 3, .4, .4, 0, 70, "#6b4020", "#4a2e1a", "#5a3322")}${candle(.3, 3.2, 70)}
    ${chest}${table(1, 1.8)}${candle(1.2, 2, 38)}${candle(1.7, 2.1, 38)}${crystal(1.5, 2.2, 38)}
    ${stairs}${candle(6.2, .3, 60)}${crystal(7.4, .5, 60)}
    ${arch}${archTop}${table(5.6, 5.6)}${candle(5.8, 5.9, 38)}${crystal(6.3, 6, 38)}
    ${box(6.6, 3.4, .5, .5, 0, 36, "#a8714c", "#6b4020", "#8a5a3c")}${box(7.2, 3.6, .4, .4, 0, 46, "#c98a6a", "#8a5a4a", "#a86a5a")}
    ${dust}<rect width="1200" height="750" fill="url(#vig)"/>`;
  return svg({ title: "Isometric dungeon lit by warm candles and cool crystals", defs, body });
}

/* ---------------------------------------------------------------- */
/* 6. LOW-POLY FOREST PATH                                           */
/* ---------------------------------------------------------------- */
export function lowpolyForest() {
  const R = rng(12);
  const lpCloud = (x, y, s) => T(x, y, poly([[0, 0], [30, -26], [70, -34], [110, -18], [140, 0]], "#fff") + poly([[0, 0], [140, 0], [110, 10], [30, 10]], "#dceefe"), s);
  const tree = (x, y, h) => T(x, y, A("sway", pine(0, 0, h, "#6fd27a", "#2f9a5a", "#7a5236", 4), R() * 3, 3 + R() * 2));
  const rock = (x, y, s) => T(x, y, poly([[-40, 0], [-30, -30], [0, -44], [30, -26], [42, 0]], "#9a8fb4") + poly([[0, -44], [30, -26], [42, 0], [6, 0]], "#7a6f98") + poly([[-30, -30], [0, -44], [-6, -20]], "#b8aed0"), s);
  const sideTrees = [];
  for (let k = 0; k < 9; k++) { const t = k / 8, y = 360 + t * t * 420, sc = .25 + t * 1.25; sideTrees.push([520 - 60 - t * 520 - R() * 40, y, 160 * sc], [680 + 60 + t * 520 + R() * 40, y, 160 * sc]); }
  sideTrees.sort((a, b) => a[1] - b[1]);
  let flowers = ""; for (let i = 0; i < 30; i++) { const y = 420 + R() * 320, side = R() > .5 ? 1 : -1, x = 600 + side * (60 + (y - 330) * .55 + R() * 200); flowers += circ(x, y, 3 + R() * 3, ["#ffcf5a", "#ff8fb1", "#fff"][i % 3]); }
  const defs = lin("sky", [[0, "#5ab8ff"], [1, "#d8f3ff"]]) + lin("grass", [[0, "#9be37f"], [1, "#5fbf5a"]]) + lin("road", [[0, "#fff1c9"], [1, "#f2d690"]]);
  const body = `<rect width="1200" height="750" fill="url(#sky)"/>${circ(930, 120, 60, "#fff6c9")}${A("glowf", circ(930, 120, 110, "#fff6c9", 'opacity=".35"'), 0, 3)}
    ${A("drift", lpCloud(100, 140, 1.2) + lpCloud(420, 90, .8) + lpCloud(760, 180, 1), 2)}
    ${poly([[0, 360], [200, 300], [380, 340], [600, 290], [820, 330], [1000, 290], [1200, 340], [1200, 400], [0, 400]], "#8fc7a8")}
    <rect y="330" width="1200" height="420" fill="url(#grass)"/>
    ${poly([[586, 330], [614, 330], [820, 750], [380, 750]], "url(#road)")}${poly([[586, 330], [590, 330], [400, 750], [380, 750]], "#e0b870")}${poly([[610, 330], [614, 330], [820, 750], [800, 750]], "#e0b870")}
    ${sideTrees.map(([x, y, h]) => `<ellipse cx="${x + h * .12}" cy="${y + 2}" rx="${h * .32}" ry="${h * .06}" fill="#2f7a3a" opacity=".35"/>` + tree(x, y, h)).join("")}
    ${rock(300, 640, 1.2)}${rock(930, 560, .8)}${rock(470, 430, .4)}${flowers}
    ${T(250, 520, poly([[0, 0], [90, -12], [96, 6], [4, 18]], "#a8714c") + `<ellipse cx="94" cy="-3" rx="6" ry="9" fill="#f2d4a0"/>`)}
    ${T(600, 380, A("bob", circ(0, 0, 5, "#ff8fb1") + circ(9, -2, 5, "#ff8fb1"), 0, .6))}`;
  return svg({ title: "Low-poly forest path converging toward the horizon", defs, body });
}

/* ---------------------------------------------------------------- */
/* 7. OVERGROWN RUINS — environmental storytelling                   */
/* ---------------------------------------------------------------- */
export function ruinedCity() {
  const R = rng(5);
  const tower = (x, w, h, c) => { const y = 520 - h; let s = rr(x, y, w, h, 2, c) + poly([[x, y], [x + w * .4, y - 30], [x + w * .7, y + 6], [x + w, y - 14], [x + w, y + 20], [x, y + 20]], c);
    for (let k = 0; k < h / 40; k++) for (let m = 0; m < w / 26; m++) if (R() > .3) s += rr(x + 8 + m * 26, y + 30 + k * 40, 12, 18, 2, R() > .85 ? "#ffcf8a" : shade(c, -.35));
    s += circ(x + w * .3, y - 6, 22, "#4fae6a") + circ(x + w * .7, y + 4, 18, "#3f9a5a");
    for (let v = 0; v < 3; v++) { const vx = x + 6 + R() * (w - 12); s += `<path d="M${vx} ${y} q${-8 + R() * 16} ${h * .25} 0 ${h * (.3 + R() * .4)}" stroke="#3f9a5a" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
    return s; };
  let birds = ""; for (let i = 0; i < 6; i++) birds += T(200 + R() * 500, 90 + R() * 120, A("drift", A("bob", `<path d="M-10 0 Q-5 -6 0 0 Q5 -6 10 0" stroke="#3a2357" stroke-width="3" fill="none"/>`, R() * 2, .8), R() * 6, 26));
  let lights = ""; for (let i = 0; i < 9; i++) lights += A("tw", circ(830 + i * 30, 470 + Math.sin(i * .9) * 10, 5, ["#ffd36b", "#ff8fb1", "#7fd0ff"][i % 3]), R() * 2, 1);
  const defs = lin("sky", [[0, "#4a2a7a"], [.55, "#ff7a8a"], [1, "#ffcf8a"]]) + lin("shaft", [[0, "#fff6c9", .45], [1, "#fff6c9", 0]]) + lin("gr", [[0, "#5a8a4a"], [1, "#2f5a3a"]]);
  const body = `<rect width="1200" height="750" fill="url(#sky)"/>${circ(280, 400, 90, "#ffe7b8", 'opacity=".8"')}
    <g opacity=".45">${tower(60, 90, 260, "#6a4a8a")}${tower(420, 70, 300, "#6a4a8a")}${tower(980, 110, 280, "#6a4a8a")}</g>
    ${tower(160, 120, 340, "#5a3f78")}${tower(560, 140, 380, "#5a3f78")}${tower(900, 100, 300, "#5a3f78")}
    ${A("glowf", poly([[600, 0], [720, 0], [520, 750], [300, 750]], "url(#shaft)"), 0, 4)}${A("glowf", poly([[840, 0], [900, 0], [800, 750], [690, 750]], "url(#shaft)"), 1.5, 5)}
    ${birds}<path d="M0 520 Q300 490 600 520 T1200 510 V750 H0Z" fill="url(#gr)"/>
    ${T(360, 610, `<ellipse cx="0" cy="40" rx="230" ry="26" fill="#000" opacity=".25"/>
      <path d="M-200 30 Q-210 -150 -20 -170 Q170 -170 190 20 Q180 50 -200 30Z" fill="#9a94a8"/><path d="M-200 30 Q-210 -150 -20 -170 Q-120 -120 -150 30Z" fill="#b8b2c6"/>
      <path d="M40 -110 q30 10 60 -6 M30 -60 q40 16 80 0" stroke="#5a5470" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M60 -20 q20 20 50 6" stroke="#5a5470" stroke-width="8" fill="none"/>
      <path d="M-40 -168 l20 50 l-14 30 l24 40" stroke="#4a4460" stroke-width="5" fill="none"/>
      <path d="M150 -90 q34 6 30 40 q-20 4 -30 -4" fill="#8a849a"/><path d="M60 -96 q20 -10 40 0" stroke="#4a4460" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M-196 0 l-22 -26 l26 4 l-6 -34 l24 22 l4 -34 l18 30 l14 -26 l2 40 Z" fill="#c9a24a" stroke="#8a6a2a" stroke-width="4"/>
      ${circ(-120, -110, 40, "#4fae6a")}${circ(-60, -150, 30, "#3f9a5a")}${circ(120, -40, 26, "#4fae6a")}${circ(-170, 10, 30, "#3f9a5a")}
      ${T(-80, -170, A("sway", `<rect x="-3" y="-60" width="6" height="60" fill="#7a5236"/>${circ(0, -66, 26, "#6fd27a")}${circ(-14, -54, 16, "#4fae6a")}`, 0, 3))}`)}
    ${T(780, 640, `<rect x="-120" y="-80" width="240" height="90" rx="22" fill="#b5653a"/><rect x="-120" y="-80" width="240" height="20" rx="10" fill="#d9844e"/>
      ${[0, 1, 2, 3].map(k => rr(-100 + k * 52, -54, 40, 30, 4, "#2a1a3a")).join("")}${circ(-70, 12, 22, "#2a1a2a")}${circ(70, 12, 22, "#2a1a2a")}
      ${circ(-60, -50, 18, "#4fae6a")}${circ(30, -60, 22, "#3f9a5a")}${circ(90, -46, 14, "#6fd27a")}<path d="M-110 -10 q60 20 120 0" stroke="#3f9a5a" stroke-width="6" fill="none"/>`, 1, -6)}
    ${T(1010, 600, `<rect x="-90" y="-110" width="10" height="120" fill="#6b4a2f"/><rect x="80" y="-110" width="10" height="120" fill="#6b4a2f"/>
      ${[0, 1, 2, 3, 4, 5].map(k => poly([[-96 + k * 32, -120], [-64 + k * 32, -120], [-64 + k * 32, -92], [-80 + k * 32, -84], [-96 + k * 32, -92]], k % 2 ? "#fff1d6" : "#ff6b6b")).join("")}
      <rect x="-80" y="-40" width="160" height="50" rx="4" fill="#8a5a3c"/>${txt(0, -54, "SHOP", { size: 26, fill: "#ffcf5a", stroke: "#4a2e1a", sw: 5 })}
      ${circ(-40, -48, 10, "#ff9a3c")}${circ(-20, -46, 10, "#ffcf5a")}${circ(30, -48, 10, "#7ed36b")}`)}
    <path d="M830 470 Q950 500 1070 470" stroke="#3a2a40" stroke-width="2" fill="none"/>${lights}
    ${T(960, 610, novaTiny(1.3))}${T(1060, 612, `<ellipse cx="0" cy="2" rx="12" ry="4" fill="#000" opacity=".3"/><path d="M-10 0 Q-12 -26 0 -30 Q12 -26 10 0Z" fill="#c98a3a"/><circle cx="0" cy="-36" r="10" fill="#ffe0c2"/><path d="M-12 -40 q12 -16 24 0z" fill="#7a4a2a"/>`, 1.3)}
    ${[[120, 700], [560, 690], [680, 720], [1150, 700]].map(([x, y]) => poly([[x - 20, y], [x - 8, y - 20], [x + 12, y - 14], [x + 22, y]], "#7a7290")).join("")}`;
  return svg({ title: "Overgrown city ruins with a toppled statue, a planted bus and a market stall", defs, body });
}
