import { F, rng, svg, A, T, lin, rad, glowFilter, shadowFilter, txt, rr, circ, poly, path, stars, pine, bush, cloud, ridge, starShape, gearPath, lanternGlowDef, novaTiny, isoKit, shade, r1 } from "./lib.mjs";

const bar = (x, y, w, h, pct, c, bg = "#140f2a", label = "") =>
  rr(x, y, w, h, h / 2, bg, 'stroke="#000" stroke-opacity=".4" stroke-width="2"') + rr(x + 2, y + 2, (w - 4) * pct, h - 4, (h - 4) / 2, c) + rr(x + 4, y + 3, (w - 8) * pct, (h - 4) * .35, 3, "#fff", 'opacity=".3"') + (label ? txt(x + w / 2, y + h * .72, label, { size: h * .6, stroke: "#000", sw: 3 }) : "");

/* Field backdrop used by HUD mockups */
function field(R, w = 1200, h = 750) {
  let s = `<rect width="${w}" height="${h}" fill="url(#fieldG)"/>`;
  for (let i = 0; i < 18; i++) s += bush(R() * w, 150 + R() * (h - 150), .6 + R() * .6, "#5fbf6a", "#3f9a5a");
  return s;
}
const slime = (c = "#ff6b6b") => `<ellipse cx="0" cy="2" rx="22" ry="6" fill="#000" opacity=".3"/><path d="M-22 0 Q-24 -30 0 -32 Q24 -30 22 0Z" fill="${c}"/><circle cx="-7" cy="-16" r="4" fill="#1a1430"/><circle cx="7" cy="-16" r="4" fill="#1a1430"/><ellipse cx="-8" cy="-24" rx="5" ry="3" fill="#fff" opacity=".5"/>`;

/* ---------------------------------------------------------------- */
/* 8. HUD — anatomy of an action-RPG mobile HUD                      */
/* ---------------------------------------------------------------- */
export function hud() {
  const R = rng(14);
  const trail = "M600 560 C640 470 560 420 640 360 C720 300 820 300 860 230";
  const skill = (x, y, c, icon, cd) => T(x, y, circ(0, 0, 38, "#140f2a", 'opacity=".85" stroke="#fff" stroke-opacity=".5" stroke-width="3"') + circ(0, 0, 30, c) + icon +
    (cd ? A("sweep", `<circle r="30" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="60" stroke-dasharray="188 400" transform="rotate(-90)"/>`, 0, 4) + txt(0, 8, "3", { size: 24, stroke: "#000", sw: 4 }) : ""));
  const defs = lin("fieldG", [[0, "#7ccf6a"], [1, "#4fa85a"]]) + glowFilter("g", 5) + shadowFilter("drop") + rad("vig", [[.6, "#000", 0], [1, "#000", .45]]);
  const body = field(R) + `<path d="${trail}" stroke="#ffe08a" stroke-width="22" fill="none" opacity=".35" stroke-linecap="round" filter="url(#g)"/>
    ${A("dash", `<path d="${trail}" stroke="#fff6c9" stroke-width="6" fill="none" stroke-dasharray="14 14" stroke-linecap="round"/>`, 0, 1)}
    ${T(860, 220, A("bob", `<path d="M0 -40 L18 -18 L0 4 L-18 -18Z" fill="#ffcf5a" stroke="#fff" stroke-width="4" filter="url(#g)"/>`, 0, .8))}
    ${T(600, 580, novaTiny(1.6))}${T(450, 420, slime())}${T(380, 470, slime("#b07aff"))}
    ${T(450, 380, A("rise", txt(0, 0, "-128", { size: 30, fill: "#ffd84a", stroke: "#7a1a1a", sw: 5 }), 0, 1.8))}
    ${T(395, 430, A("rise", txt(0, 0, "+40 XP", { size: 22, fill: "#9fffb0", stroke: "#0b3a1a", sw: 4 }), 1, 2.2))}
    <rect width="1200" height="750" fill="url(#vig)"/>
    ${rr(20, 20, 360, 112, 22, "#140f2a", 'opacity=".78"')}${circ(76, 76, 44, "#2fd3c4", 'stroke="#fff" stroke-width="4"')}
    <ellipse cx="76" cy="82" rx="26" ry="24" fill="#ffe0c2"/><circle cx="68" cy="78" r="4" fill="#1a1430"/><circle cx="86" cy="78" r="4" fill="#1a1430"/><path d="M54 62 q22 -26 44 0z" fill="#2fd3c4"/>
    ${circ(110, 112, 18, "#ffcf5a", 'stroke="#fff" stroke-width="3"')}${txt(110, 119, "24", { size: 17, fill: "#5a3a10" })}
    ${txt(140, 50, "NOVA", { size: 18, anchor: "start", ls: 2 })}
    ${bar(140, 60, 220, 24, .78, "#ff5d6b", "#140f2a", "1,240 / 1,600")}${bar(140, 90, 180, 16, .55, "#4aa8ff")}${A("grow", rr(140, 112, 220, 6, 3, "#ffd84a"), 0, 6)}
    ${T(600, 44, rr(-170, -22, 160, 44, 22, "#140f2a", 'opacity=".78"') + circ(-148, 0, 15, "#ffcf5a") + txt(-80, 8, "8,240", { size: 20 }) + rr(10, -22, 160, 44, 22, "#140f2a", 'opacity=".78"') + poly([[32, -16], [46, -4], [40, 14], [24, 14], [18, -4]], "#d65cff") + txt(100, 8, "315", { size: 20 }))}
    ${T(1100, 100, `<circle r="76" fill="#140f2a" opacity=".85" stroke="#fff" stroke-opacity=".6" stroke-width="4"/>
      <clipPath id="mm"><circle r="70"/></clipPath><g clip-path="url(#mm)"><rect x="-70" y="-70" width="140" height="140" fill="#2f6a4a"/>
      <path d="M-70 20 Q-10 0 10 -30 T70 -50" stroke="#f2d690" stroke-width="10" fill="none"/>${A("spin", `<path d="M0 0 L0 -72 A72 72 0 0 1 50 -52Z" fill="#9fffb0" opacity=".25"/>`, 0, 4)}
      ${circ(-30, 30, 5, "#ff5d6b")}${circ(-10, 40, 5, "#ff5d6b")}${A("pulse", circ(30, -44, 7, "#ffcf5a"))}</g>${poly([[0, -10], [8, 8], [0, 3], [-8, 8]], "#fff")}`)}
    ${T(1100, 30, txt(0, 0, "Old Mill · Lv 20–25", { size: 13, op: .9 }))}
    ${rr(930, 196, 250, 122, 16, "#140f2a", 'opacity=".78"')}${txt(948, 226, "QUEST", { size: 14, fill: "#ffcf5a", anchor: "start", ls: 2 })}
    ${[["Reach the Old Mill", 1], ["Defeat slimes 6/8", 0], ["Talk to the Miller", 0]].map(([s, d], i) => rr(948, 240 + i * 26, 16, 16, 4, d ? "#5ee08c" : "none", 'stroke="#fff" stroke-width="2"') + txt(974, 254 + i * 26, s, { size: 15, w: 500, anchor: "start", op: d ? .6 : 1 })).join("")}
    ${T(130, 620, circ(0, 0, 80, "#140f2a", 'opacity=".55" stroke="#fff" stroke-opacity=".4" stroke-width="3"') + A("drift", circ(0, 0, 36, "#fff", 'opacity=".75"'), 0, 2.4))}
    ${T(1080, 630, circ(0, 0, 66, "#140f2a", 'opacity=".85" stroke="#fff" stroke-opacity=".6" stroke-width="4"') + circ(0, 0, 56, "#ff6b4a") + `<path d="M-22 22 L18 -18 M10 -26 L26 -10 M-26 10 L-10 26" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`)}
    ${skill(960, 650, "#4aa8ff", `<path d="M-12 8 Q0 -22 12 8Z" fill="#fff"/>`, true)}${skill(980, 560, "#b07aff", poly(starShape(0, 0, 16), "#fff"))}${skill(1060, 520, "#5ee08c", `<path d="M0 14 C-20 0 -14 -16 0 -6 C14 -16 20 0 0 14Z" fill="#fff"/>`)}${skill(1150, 520, "#ffcf5a", circ(0, 0, 12, "#fff"))}
    ${T(600, 712, rr(-150, -26, 300, 52, 26, "#140f2a", 'opacity=".78"') + [[-100, "#a8714c"], [-33, "#7ed36b"], [33, "#9aa3c4"], [100, "#5ab0ff"]].map(([x, c]) => rr(x - 17, -17, 34, 34, 9, c)).join("") + A("pulse", circ(117, -16, 9, "#ff3b5c")))}`;
  return svg({ title: "Mobile action-RPG HUD with stats, minimap, quests, joystick and skills", defs, body });
}

/* ---------------------------------------------------------------- */
/* 9. HUD BEFORE / AFTER                                             */
/* ---------------------------------------------------------------- */
export function hudBeforeAfter() {
  const R = rng(3);
  const half = (x, clean) => {
    const Rr = rng(77); let s = `<g transform="translate(${x} 0)"><svg width="580" height="640" viewBox="0 0 580 640"><rect width="580" height="640" fill="url(#fieldG)"/>`;
    for (let i = 0; i < 9; i++) s += bush(Rr() * 580, 180 + Rr() * 460, .55, "#5fbf6a", "#3f9a5a");
    s += T(290, 420, novaTiny(1.4)) + T(200, 330, slime());
    if (!clean) {
      const cols = ["#ff3b5c", "#ffcf5a", "#4aa8ff", "#d65cff", "#5ee08c"];
      for (let i = 0; i < 16; i++) { const w = 70 + R() * 120, h = 26 + R() * 60, px = R() * (580 - w), py = R() * (640 - h); s += rr(px, py, w, h, 6, "#140f2a", `opacity=".85" stroke="${cols[i % 5]}" stroke-width="3"`) + Array.from({ length: Math.floor(h / 12) }, (_, k) => rr(px + 8, py + 8 + k * 12, w * (.4 + R() * .5), 5, 2, "#fff", 'opacity=".5"')).join(""); }
      for (let i = 0; i < 9; i++) s += A("pulse", circ(R() * 560 + 10, R() * 620 + 10, 12, "#ff3b5c") , R()) + txt(0, 0, "");
      s += T(290, 560, A("pulse", rr(-120, -30, 240, 60, 12, "#ff3b5c", 'stroke="#ffd84a" stroke-width="4"') + txt(0, 12, "SALE!! 90%", { size: 30, fill: "#ffd84a" }), 0, .5));
    } else {
      s += rr(20, 20, 200, 30, 15, "#140f2a", 'opacity=".75"') + rr(24, 24, 140, 22, 11, "#ff5d6b") + circ(530, 60, 40, "#140f2a", 'opacity=".75" stroke="#fff" stroke-opacity=".5" stroke-width="3"') + A("pulse", circ(540, 44, 5, "#ffcf5a")) +
        rr(20, 64, 210, 30, 10, "#140f2a", 'opacity=".6"') + txt(32, 85, "▸ Reach the Old Mill", { size: 15, anchor: "start", w: 600 }) +
        circ(500, 560, 50, "#ff6b4a", 'stroke="#fff" stroke-width="4"') + circ(410, 590, 26, "#4aa8ff", 'stroke="#fff" stroke-width="3"') + circ(440, 500, 26, "#b07aff", 'stroke="#fff" stroke-width="3"') + circ(80, 560, 50, "#140f2a", 'opacity=".45"') + circ(80, 560, 22, "#fff", 'opacity=".7"');
    }
    return s + `</svg></g>`;
  };
  const defs = lin("fieldG", [[0, "#7ccf6a"], [1, "#4fa85a"]]);
  const body = `<rect width="1200" height="750" fill="#120c22"/>${half(10, false)}${half(610, true)}
    ${T(300, 700, rr(-110, -26, 220, 52, 26, "#ff3b5c") + txt(0, 10, "BEFORE", { size: 26, ls: 4 }))}${T(900, 700, rr(-110, -26, 220, 52, 26, "#5ee08c") + txt(0, 10, "AFTER", { size: 26, ls: 4, fill: "#0b2a14" }))}
    ${T(600, 320, A("pulse", circ(0, 0, 34, "#ffcf5a") + `<path d="M-12 -14 L10 0 L-12 14Z" fill="#120c22"/>`, 0, .9))}`;
  return svg({ title: "The same scene with a cluttered HUD and with a clean HUD", defs, body });
}

/* ---------------------------------------------------------------- */
/* 10. LANE BATTLER UI                                               */
/* ---------------------------------------------------------------- */
export function battleUI() {
  const R = rng(8);
  const unit = (c, hat) => `<ellipse cx="0" cy="2" rx="16" ry="5" fill="#000" opacity=".3"/>${A("hop", `<path d="M-16 0 Q-18 -32 0 -34 Q18 -32 16 0Z" fill="${c}"/><circle cx="5" cy="-20" r="3.5" fill="#1a1430"/>${hat}`, R(), .4)}`;
  const foe = (c) => `<ellipse cx="0" cy="2" rx="18" ry="5" fill="#000" opacity=".3"/>${A("hop", `<path d="M-18 0 L-12 -34 L0 -40 L12 -34 L18 0Z" fill="${c}"/><path d="M-10 -24 l6 3 M10 -24 l-6 3" stroke="#fff" stroke-width="3"/><path d="M-8 -40 l-6 -12 l10 6 M8 -40 l6 -12 l-10 6" fill="${shade(c, -.3)}"/>`, R(), .4)}`;
  const helm = `<path d="M-14 -24 Q0 -46 14 -24Z" fill="#c0c8dc"/>`, wiz = `<path d="M-14 -26 L4 -60 L14 -26Z" fill="#7a5ad8"/>`, cap = `<path d="M-14 -26 Q0 -40 14 -26Z" fill="#ff5d73"/>`;
  const card = (x, c, cost, hat, on) => T(x, 650, `${on ? A("pulse", rr(-58, -66, 116, 132, 16, "none", 'stroke="#ffd84a" stroke-width="5"'), 0, .8) : ""}${rr(-52, -60, 104, 120, 14, on ? "#2a2058" : "#1a1438", `stroke="${on ? "#ffd84a" : "#3a2f6a"}" stroke-width="3"`)}
    ${rr(-44, -52, 88, 70, 10, shade(c, -.5))}${T(0, 8, `<path d="M-22 0 Q-24 -44 0 -46 Q24 -44 22 0Z" fill="${c}"/><circle cx="6" cy="-26" r="5" fill="#1a1430"/>${T(0, -2, hat, 1.4)}`)}
    ${txt(0, 46, ["Knight", "Archer", "Mage", "Brute", "Storm"][Math.round((x - 300) / 130)] || "", { size: 15, w: 600 })}
    ${T(-40, -54, poly([[0, -16], [14, 0], [0, 16], [-14, 0]], "#d65cff", 'stroke="#fff" stroke-width="3"') + txt(0, 6, cost, { size: 16 }))}`, 1);
  let march = "";
  for (let i = 0; i < 4; i++) march += T(250 + i * 30, 470 + (i % 2) * 20, A("marchR", unit(["#4aa8ff", "#5ee08c", "#ffcf5a", "#4aa8ff"][i], [helm, cap, wiz, helm][i]), i * 2.2, 9));
  for (let i = 0; i < 3; i++) march += T(950 - i * 30, 480 + (i % 2) * 20, A("marchL", foe(["#7a5ad8", "#ff6b6b", "#7a5ad8"][i]), i * 3, 10));
  const defs = lin("sky", [[0, "#7fd0ff"], [1, "#e6f6ff"]]) + lin("gr", [[0, "#8fd16a"], [1, "#5fa85a"]]) + glowFilter("g", 5);
  const body = `<rect width="1200" height="750" fill="url(#sky)"/>${A("drift", cloud(200, 140, 1.1, "#fff", .9) + cloud(700, 110, .8, "#fff", .8), 3)}
    ${poly([[0, 380], [250, 300], [500, 360], [760, 290], [1000, 350], [1200, 300], [1200, 420], [0, 420]], "#9fd8a0")}
    <rect y="400" width="1200" height="180" fill="url(#gr)"/><rect y="460" width="1200" height="60" fill="#e8cf8f" opacity=".6"/>
    ${pine(420, 410, 90)}${pine(760, 405, 110)}${pine(560, 400, 70)}
    ${T(130, 500, `<rect x="-70" y="-180" width="140" height="180" fill="#9aa3c4"/><rect x="-70" y="-180" width="140" height="180" fill="url(#gr)" opacity="0"/>
      ${[-70, -35, 0, 35].map(x => rr(x, -200, 22, 24, 2, "#9aa3c4")).join("")}<rect x="0" y="-180" width="70" height="180" fill="#7a83a8"/>
      <path d="M-24 0 v-60 a24 24 0 0 1 48 0 v60z" fill="#3a2a40"/><rect x="-3" y="-260" width="6" height="64" fill="#6b4a2f"/>${T(3, -256, A("flag", `<path d="M0 0 h56 l-12 16 l12 16 h-56z" fill="#4aa8ff"/>`))}`)}
    ${T(1080, 500, `<path d="M-110 0 Q-120 -200 0 -210 Q120 -200 110 0Z" fill="#5a4a6a"/><path d="M-60 0 Q-60 -110 0 -116 Q60 -110 60 0Z" fill="#1a0f22"/>
      ${A("tw", circ(-20, -60, 7, "#ff3b5c") + circ(20, -60, 7, "#ff3b5c"), 0, 1.2)}<path d="M-110 -40 l-30 -40 l40 10z M110 -40 l30 -40 l-40 10z" fill="#7a6a8a"/>`)}
    ${march}${T(600, 450, A("marchR", circ(0, 0, 9, "#ffcf5a", 'filter="url(#g)"'), 0, 2.4))}
    ${rr(20, 20, 470, 60, 18, "#140f2a", 'opacity=".85"')}${circ(56, 50, 24, "#4aa8ff", 'stroke="#fff" stroke-width="3"')}${txt(90, 44, "YOU", { size: 14, anchor: "start", ls: 2 })}${bar(90, 52, 380, 20, .72, "#5ee08c")}
    ${rr(710, 20, 470, 60, 18, "#140f2a", 'opacity=".85"')}${circ(1144, 50, 24, "#7a5ad8", 'stroke="#fff" stroke-width="3"')}${txt(1110, 44, "CAVE LORD", { size: 14, anchor: "end", ls: 2 })}
    ${T(1110, 52, rr(-380, 0, 380, 20, 10, "#140f2a", 'stroke="#000" stroke-opacity=".4" stroke-width="2"') + rr(-378 + 380 * .46, 2, 376 * .54, 16, 8, "#ff5d6b"))}
    ${T(600, 50, rr(-32, -32, 64, 64, 16, "#4aa8ff", 'stroke="#fff" stroke-width="4"') + rr(-12, -14, 8, 28, 2, "#fff") + rr(4, -14, 8, 28, 2, "#fff"))}
    <rect y="580" width="1200" height="170" fill="#120c2a"/><rect y="580" width="1200" height="4" fill="#3a2f6a"/>
    ${card(300, "#4aa8ff", 2, helm, true)}${card(430, "#5ee08c", 3, cap, true)}${card(560, "#ffcf5a", 4, wiz, true)}${card(690, "#ff9a5a", 5, helm, false)}${card(820, "#b07aff", 7, wiz, false)}
    ${T(80, 650, circ(0, 0, 44, "#d65cff", 'stroke="#fff" stroke-width="4"') + txt(0, 12, "6", { size: 36 }))}
    ${Array.from({ length: 10 }, (_, i) => rr(930 + i * 24, 636, 20, 28, 5, i < 6 ? "#d65cff" : "#2a2058", i === 6 ? 'class="pulse" style="animation-duration:.8s"' : "")).join("")}
    ${txt(1050, 700, "ENERGY", { size: 13, ls: 3, op: .7 })}`;
  return svg({ title: "Lane battler UI with facing health bars, unit cards and a segmented energy bar", defs, body });
}

/* ---------------------------------------------------------------- */
/* 11. ITEM ICON TIERS                                               */
/* ---------------------------------------------------------------- */
export function itemIcons() {
  const O = 'stroke="#140f1c" stroke-width="5" stroke-linejoin="round"';
  const sparkle = (x, y, d) => T(x, y, A("tw", poly(starShape(0, 0, 9, 2.5, 4), "#fff"), d, .9));
  const sword = [
    `<path d="M-6 30 L-6 -60 L0 -72 L6 -60 L6 30Z" fill="#b8bccc" ${O}/><rect x="-24" y="28" width="48" height="10" rx="3" fill="#7a6a5a" ${O}/><rect x="-5" y="38" width="10" height="26" fill="#6b4a2f" ${O}/>`,
    `<path d="M-8 30 L-8 -62 L0 -76 L8 -62 L8 30Z" fill="#d6dbea" ${O}/><path d="M0 -62 V24" stroke="#9aa0b8" stroke-width="3"/><path d="M-34 30 Q0 18 34 30 Q0 44 -34 30Z" fill="#ffcf5a" ${O}/><rect x="-6" y="36" width="12" height="28" fill="#8a3a3a" ${O}/><circle cx="0" cy="70" r="8" fill="#ffcf5a" ${O}/>`,
    `${A("glowf", `<path d="M-10 30 L-10 -64 L0 -82 L10 -64 L10 30Z" fill="#5ab0ff" filter="url(#g)"/>`, 0, 1.4)}<path d="M-10 30 L-10 -64 L0 -82 L10 -64 L10 30Z" fill="#9fd8ff" ${O}/><path d="M0 -60 l-4 10 l4 10 l-4 10 l4 10 l-4 10" stroke="#fff" stroke-width="3" fill="none"/>
     <path d="M-44 22 Q-20 34 0 28 Q20 34 44 22 Q30 44 0 40 Q-30 44 -44 22Z" fill="#ffcf5a" ${O}/><circle cx="0" cy="32" r="8" fill="#ff3b6b" ${O}/><rect x="-6" y="40" width="12" height="26" fill="#3a2a6a" ${O}/><path d="M0 66 l-10 10 l10 10 l10 -10z" fill="#ffcf5a" ${O}/>${sparkle(-26, -40, 0)}${sparkle(28, -10, .5)}`];
  const potion = [
    `<rect x="-8" y="-50" width="16" height="16" rx="3" fill="#c98a5a" ${O}/><circle cx="0" cy="0" r="34" fill="#ff6b6b" ${O}/><path d="M-30 -6 Q0 6 30 -6 A34 34 0 0 1 -30 -6Z" fill="#fff" opacity=".0"/><ellipse cx="-12" cy="-12" rx="7" ry="10" fill="#fff" opacity=".45"/>`,
    `<rect x="-9" y="-70" width="18" height="18" rx="3" fill="#a8714c" ${O}/><path d="M-10 -54 L-10 -34 Q-38 -10 -32 22 Q-26 44 0 44 Q26 44 32 22 Q38 -10 10 -34 L10 -54Z" fill="#4aa8ff" ${O}/><rect x="-20" y="0" width="40" height="22" rx="4" fill="#f2e8d0" ${O}/><path d="M-8 11 h16" stroke="#7a5a3a" stroke-width="3"/><ellipse cx="-16" cy="-12" rx="5" ry="10" fill="#fff" opacity=".45"/>`,
    `${A("glowf", circ(0, 4, 50, "#d65cff", 'opacity=".45" filter="url(#g)"'), 0, 1.2)}<path d="M-8 -72 L8 -72 L12 -58 L-12 -58Z" fill="#ffcf5a" ${O}/><path d="M0 -58 L36 -18 L26 40 L-26 40 L-36 -18Z" fill="#b25cff" ${O}/><path d="M0 -58 L0 40 M-36 -18 L36 -18" stroke="#e8b8ff" stroke-width="3"/>
     <path d="M-36 -18 L36 -18 L26 40 L-26 40Z" fill="none" stroke="#ffcf5a" stroke-width="5"/>${[[-10, 20, 0], [8, 10, .8], [0, 28, 1.6]].map(([x, y, d]) => T(x, y, A("rise", circ(0, 0, 4, "#fff", 'opacity=".8"'), d, 2))).join("")}${sparkle(30, -50, .3)}`];
  const shield = [
    `<circle cx="0" cy="0" r="42" fill="#a8714c" ${O}/><circle cx="0" cy="0" r="34" fill="none" stroke="#6b4a2f" stroke-width="3"/><path d="M-30 -14 H30 M-34 6 H34" stroke="#7a4a2a" stroke-width="3"/><circle cx="0" cy="0" r="9" fill="#8a8a9a" ${O}/>`,
    `<path d="M-40 -46 H40 V0 Q40 36 0 54 Q-40 36 -40 0Z" fill="#c0c8dc" ${O}/><path d="M-10 -46 H10 V50 Q0 54 -10 48Z" fill="#ff5d6b"/><path d="M-40 -46 H40 V0 Q40 36 0 54 Q-40 36 -40 0Z" fill="none" ${O}/>`,
    `${A("glowf", circ(0, 0, 60, "#ffcf5a", 'opacity=".35" filter="url(#g)"'), 0, 1.6)}<path d="M-46 -52 Q0 -64 46 -52 V0 Q46 40 0 62 Q-46 40 -46 0Z" fill="#ffcf5a" ${O}/><path d="M-34 -40 Q0 -50 34 -40 V0 Q34 30 0 48 Q-34 30 -34 0Z" fill="#2a4aa8"/>
     ${poly(starShape(0, -2, 22, 9), "#ffcf5a", O)}<circle cx="0" cy="-2" r="7" fill="#ff3b6b"/>${sparkle(-36, -50, .2)}${sparkle(40, 30, 1)}`];
  const key = [
    `<circle cx="0" cy="-36" r="18" fill="none" stroke="#8a8a9a" stroke-width="12"/><circle cx="0" cy="-36" r="18" fill="none" ${O.replace("5", "2")}/><rect x="-6" y="-18" width="12" height="72" fill="#8a8a9a" ${O}/><rect x="6" y="30" width="16" height="10" fill="#8a8a9a" ${O}/><rect x="6" y="44" width="12" height="10" fill="#8a8a9a" ${O}/>`,
    `<path d="M0 -70 C-30 -70 -34 -40 -20 -30 C-34 -16 -14 0 0 -12 C14 0 34 -16 20 -30 C34 -40 30 -70 0 -70Z" fill="#e0a83a" ${O}/><circle cx="0" cy="-40" r="8" fill="#5a3a10"/><rect x="-6" y="-12" width="12" height="70" fill="#e0a83a" ${O}/><path d="M6 30 h18 v8 h-8 v8 h10 v10 h-20" fill="#e0a83a" ${O}/>`,
    `${A("glowf", circ(0, -10, 56, "#5ab0ff", 'opacity=".4" filter="url(#g)"'), 0, 1.3)}<path d="M0 -80 L24 -50 L0 -20 L-24 -50Z" fill="#9fd8ff" ${O}/><path d="M0 -80 L0 -20 M-24 -50 L24 -50" stroke="#fff" stroke-width="3"/>
     <rect x="-6" y="-22" width="12" height="80" fill="#5ab0ff" ${O}/><path d="M6 26 l20 -6 v12 l-12 4 v10 l14 -2 v12 l-22 4" fill="#9fd8ff" ${O}/>${sparkle(30, -76, 0)}${sparkle(-28, 10, .7)}`];
  const rows = [["SWORD", sword], ["POTION", potion], ["SHIELD", shield], ["KEY", key]];
  const corner = (x, y, sx, sy) => `<path transform="translate(${x} ${y}) scale(${sx} ${sy})" d="M0 0 h50 q-24 6 -30 30 q-6 -14 -20 -20z M0 0 v50 q6 -24 30 -30" fill="#c98a3a"/>`;
  const defs = glowFilter("g", 8) + rad("bgG", [[0, "#3a3048"], [1, "#1e1828"]]);
  const body = `<rect width="1200" height="750" fill="url(#bgG)"/>${corner(14, 14, 1, 1)}${corner(1186, 14, -1, 1)}${corner(14, 736, 1, -1)}${corner(1186, 736, -1, -1)}
    ${["TIER I", "TIER II", "TIER III"].map((s, i) => txt(470 + i * 260, 64, s, { size: 20, ls: 4, fill: ["#b8bccc", "#ffcf5a", "#d6a0ff"][i] })).join("")}
    ${rows.map(([n, icons], r) => `${txt(140, 175 + r * 160, n, { size: 18, ls: 4, fill: "#e8dcc8", anchor: "middle" })}<path d="M230 ${168 + r * 160} H1110" stroke="#fff" stroke-opacity=".06" stroke-width="2"/>` +
      icons.map((ic, t) => T(470 + t * 260, 160 + r * 160, A("float", ic, r + t * .6, 4 + t), .85)).join("")).join("")}
    ${T(1000, 728, txt(0, 0, "same outline · same light · more detail = better", { size: 15, fill: "#e8dcc8", op: .6 }))}`;
  return svg({ title: "Item icon sheet: swords, potions, shields and keys in three tiers", defs, body });
}

/* ---------------------------------------------------------------- */
/* 12. ISOMETRIC BOARD GAME                                          */
/* ---------------------------------------------------------------- */
export function boardIso() {
  const R = rng(19); const { P, box, tile } = isoKit(600, 180, 92, 46);
  const ring = []; const W = 8, D = 6;
  for (let i = 0; i < W; i++) ring.push([i, 0]); for (let j = 1; j < D; j++) ring.push([W - 1, j]); for (let i = W - 2; i >= 0; i--) ring.push([i, D - 1]); for (let j = D - 2; j > 0; j--) ring.push([0, j]);
  const types = ["blue", "blue", "red", "star", "blue", "q", "blue", "skull", "blue", "arrow", "red", "blue", "q", "blue", "star", "blue", "red", "blue", "arrow", "blue", "q", "blue", "skull", "blue"];
  const col = { blue: "#3fa9ff", red: "#ff5d6b", star: "#ffcf5a", q: "#b07aff", skull: "#3a3050", arrow: "#5ee08c" };
  const sym = (t, x, y) => t === "star" ? poly(starShape(x, y - 2, 13, 5.5).map(([a, b]) => [a, b * .9 + y * .1]), "#fff") : t === "q" ? txt(x, y + 7, "?", { size: 22 }) : t === "skull" ? circ(x, y - 2, 9, "#e8e0f0") + circ(x - 3, y - 3, 2.5, "#3a3050") + circ(x + 3, y - 3, 2.5, "#3a3050") : t === "arrow" ? `<path d="M${x - 10} ${y} h14 v-6 l10 8 l-10 8 v-6 h-14z" fill="#fff"/>` : t === "red" ? txt(x, y + 5, "−3", { size: 15 }) : txt(x, y + 5, "+3", { size: 15 });
  let tiles = "";
  ring.forEach(([i, j], k) => { const t = types[k % types.length]; tiles += box(i + .06, j + .06, .88, .88, 0, 14, col[t], shade(col[t], -.35), shade(col[t], -.2)); const [x, y] = P(i + .5, j + .5, 14); tiles += sym(t, x, y); });
  const pawn = (i, j, c, bob) => { const [x, y] = P(i + .5, j + .5, 14); const g = `<ellipse cx="0" cy="0" rx="14" ry="6" fill="#000" opacity=".3"/><path d="M-12 0 Q-10 -26 0 -36 Q10 -26 12 0Z" fill="${c}" stroke="#fff" stroke-width="2"/>${circ(0, -42, 10, c, 'stroke="#fff" stroke-width="2"')}`; return T(x, y, bob ? A("hop", g, 0, .5) : g); };
  const [cx, cy] = P(4, 3, 0);
  const defs = lin("bg", [[0, "#2a1f5e"], [1, "#4a2a7a"]]) + glowFilter("g", 6);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${stars(R, 50, 1200, 300)}
    ${poly([P(-.4, -.4, 0), P(W + .4, -.4, 0), P(W + .4, D + .4, 0), P(-.4, D + .4, 0)], "#2a6a4a")}${box(-.4, -.4, W + .8, D + .8, -40, 40, "#3f9a5a", "#1f5a3a", "#2a6a4a")}
    ${tiles}${T(cx, cy, `<ellipse cx="0" cy="10" rx="80" ry="30" fill="#2f8a4a"/>${pine(-30, 6, 80)}${pine(30, 14, 64)}<rect x="-14" y="-60" width="28" height="60" fill="#e8dcc8"/><path d="M-20 -60 L0 -92 L20 -60Z" fill="#ff5d6b"/>${A("glowf", circ(0, -40, 40, "#ffd36b", 'opacity=".35"'), 0, 2)}`)}
    ${pawn(3, 0, "#ff5d6b", true)}${pawn(7, 2, "#3fa9ff")}${pawn(1, 5, "#ffcf5a")}${pawn(0, 2, "#5ee08c")}
    ${T(1040, 610, A("float", `<g transform="rotate(14)"><rect x="-50" y="-50" width="100" height="100" rx="20" fill="#fff" stroke="#c0b8e0" stroke-width="6"/>${[[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]].map(([x, y]) => circ(x, y, 9, "#2a1f5e")).join("")}</g>`, 0, 1.8))}
    ${T(1040, 720, rr(-80, -24, 160, 44, 22, "#ffcf5a", 'stroke="#fff" stroke-width="4"') + txt(0, 6, "ROLL!", { size: 22, fill: "#5a3a10" }))}
    ${T(110, 110, `<path d="M-80 0 A80 80 0 0 1 80 0Z" fill="#1a1238" stroke="#fff" stroke-opacity=".4" stroke-width="3"/><path d="M-80 0 A80 80 0 0 1 0 -80 V0Z" fill="#ffcf5a" opacity=".35"/><path d="M0 -80 A80 80 0 0 1 80 0 H0Z" fill="#4a3aa8" opacity=".6"/>
      ${circ(-48, -30, 12, "#ffcf5a")}${circ(48, -30, 11, "#e8e0ff")}${circ(54, -34, 9, "#4a3aa8")}${A("spin", `<rect x="-3" y="-70" width="6" height="70" rx="3" fill="#fff"/>`, 0, 30)}${txt(0, 26, "TURN 7 / 20", { size: 15, op: .85 })}`)}
    ${T(1060, 120, rr(-120, -80, 240, 160, 18, "#1a1238", 'opacity=".85"') + [["#ff5d6b", 3, 42], ["#3fa9ff", 2, 55], ["#ffcf5a", 1, 30], ["#5ee08c", 1, 18]].map(([c, s, k], i) => circ(-96, -54 + i * 36, 10, c) + poly(starShape(-50, -54 + i * 36, 10), "#ffcf5a") + txt(-30, -48 + i * 36, s, { size: 16, anchor: "start" }) + circ(20, -54 + i * 36, 9, "#ffcf5a") + txt(36, -48 + i * 36, k, { size: 16, anchor: "start" })).join(""))}`;
  return svg({ title: "Isometric dice board with special tiles, pawns and a day/night turn dial", defs, body });
}

/* ---------------------------------------------------------------- */
/* 13. PITCH BOARD — "Lantern Moths: Night Delivery"                 */
/* ---------------------------------------------------------------- */
export function pitchBoard() {
  const R = rng(41);
  const moth = (c, s = 1) => T(0, 0, `${A("flap", `<path d="M0 0 C-40 -40 -60 -10 -44 10 C-30 24 -10 14 0 4Z" fill="${shade(c, .35)}" opacity=".9"/>`, R(), .22)}${A("flap", `<path d="M0 0 C40 -40 60 -10 44 10 C30 24 10 14 0 4Z" fill="${shade(c, .35)}" opacity=".9"/>`, R(), .22)}
    <ellipse cx="0" cy="6" rx="18" ry="22" fill="${c}"/><circle cx="-6" cy="0" r="4" fill="#1a1430"/><circle cx="6" cy="0" r="4" fill="#1a1430"/><path d="M-4 -18 q-8 -14 -16 -12 M4 -18 q8 -14 16 -12" stroke="${c}" stroke-width="3" fill="none"/><rect x="-8" y="16" width="16" height="10" rx="3" fill="#a8714c"/>`, s);
  const panel = (x, w, title, inner) => T(x, 30, rr(0, 0, w, 690, 26, "#18123a", 'stroke="#3a2f6a" stroke-width="3"') + (title ? txt(30, 56, title, { size: 22, anchor: "start", ls: 4, fill: "#ffcf5a" }) + `<path d="M${30 + title.length * 18} 48 H${w - 30}" stroke="#ffcf5a" stroke-opacity=".4" stroke-width="2"/>` : "") + inner);
  const lines = (x, y, n, w) => Array.from({ length: n }, (_, i) => rr(x, y + i * 18, w * (i === n - 1 ? .6 : .9 + R() * .1), 8, 4, "#fff", 'opacity=".25"')).join("");
  const defs = lin("night", [[0, "#0f1a3a"], [1, "#2a1f5e"]]) + lanternGlowDef("lg") + glowFilter("g", 5) + `<clipPath id="p1"><rect x="0" y="0" width="460" height="690" rx="26"/></clipPath>`;
  const body = `<rect width="1200" height="750" fill="#0c0820"/>
    ${T(20, 30, `<g clip-path="url(#p1)"><rect width="460" height="690" fill="url(#night)"/>${stars(R, 50, 460, 690)}
      <path d="M0 690 Q120 560 240 600 T460 560 V690Z" fill="#1a2a4a"/>${[60, 130, 330, 400].map(x => T(x, 640, `<rect x="-20" y="-40" width="40" height="40" fill="#2a3a5a"/><path d="M-26 -40 L0 -64 L26 -40Z" fill="#3a2a5a"/>${A("tw", rr(-7, -30, 14, 14, 2, "#ffd36b"), R() * 2, 1.4)}`)).join("")}
      <line x1="230" y1="0" x2="230" y2="210" stroke="#6b4a2f" stroke-width="4"/>${A("glowf", circ(230, 260, 150, "url(#lg)"), 0, 2)}
      ${T(230, 260, `<rect x="-36" y="-50" width="72" height="96" rx="14" fill="#ffcf5a" stroke="#7a4f1c" stroke-width="6"/><path d="M-30 -50 h60 l-10 -14 h-40z" fill="#7a4f1c"/>${A("flick", `<ellipse cx="0" cy="4" rx="12" ry="22" fill="#fff8d6"/>`)}`)}
      ${[[120, 200, "#ff8fb1", 0], [340, 220, "#9fd8ff", 1.5], [180, 380, "#c8ff9f", 3]].map(([x, y, c, d]) => T(x, y, A("float", moth(c, 1.1), d, 3))).join("")}
      ${txt(230, 500, "LANTERN", { size: 58, fill: "#ffcf5a", stroke: "#3a1f0a", sw: 10, ls: 3 })}${txt(230, 560, "MOTHS", { size: 58, fill: "#ff8fb1", stroke: "#3a1f0a", sw: 10, ls: 6 })}
      ${T(230, 598, rr(-100, -18, 200, 32, 16, "#fff", 'opacity=".12"') + txt(0, 4, "Night Delivery", { size: 18, w: 600 }))}</g>`)}
    ${panel(500, 330, "STORY", `${T(165, 250, A("float", `<path d="M-130 0 Q-60 -20 0 -16 Q70 -20 130 0 L60 60 L0 130 L-50 60Z" fill="#4a3a7a"/><path d="M-134 2 Q-60 -26 0 -22 Q74 -28 134 2 Q60 14 0 12 Q-70 16 -134 2Z" fill="#5fbf8a"/>
        ${[[-70, 0], [-20, -6], [40, -2], [90, 2]].map(([x, y], i) => T(x, y, `<rect x="-16" y="-32" width="32" height="32" fill="#e8dcc8"/><path d="M-20 -32 L0 -52 L20 -32Z" fill="${["#ff6b6b", "#5ab0ff", "#ffcf5a", "#b07aff"][i]}"/>${A("tw", rr(-6, -24, 12, 12, 2, "#ffd36b"), i, 1.5)}`)).join("")}${pine(-110, 0, 46)}${pine(120, 0, 40)}`, 0, 6))}
      ${T(165, 420, rr(-90, -18, 180, 36, 18, "none", 'stroke="#9fd8ff" stroke-width="2"') + txt(0, 6, "Wickwood Isle", { size: 17, fill: "#9fd8ff", w: 500 }))}
      ${lines(30, 480, 7, 270)}${txt(30, 640, "Deliver light before dawn.", { size: 17, anchor: "start", fill: "#ffcf5a" })}`)}
    ${panel(850, 330, "CAST", `${T(90, 170, A("float", moth("#ff8fb1", 1.1), 0, 3))}${T(165, 230, A("float", moth("#9fd8ff", 1), 1, 3.4))}${T(240, 170, A("float", moth("#c8ff9f", 1.1), 2, 2.8))}
      ${txt(165, 300, "Couriers — round &amp; soft", { size: 16, w: 600 })}${lines(40, 318, 3, 250)}
      ${T(165, 500, `${A("glowf", circ(0, -30, 90, "#5ab0ff", 'opacity=".12"'), 0, 2)}<path d="M-70 40 L-50 -60 L0 -100 L50 -60 L70 40 L0 70Z" fill="#3a3a5a"/><path d="M-50 -60 L-80 -110 L-20 -80Z M50 -60 L80 -110 L20 -80Z" fill="#2a2a44"/>
        <path d="M-40 -40 L-10 -30 L-40 -16Z M40 -40 L10 -30 L40 -16Z" fill="#ffd84a"/><path d="M-6 -14 L0 4 L6 -14Z" fill="#ff9a3c"/><path d="M-50 20 L0 40 L50 20" stroke="#2a2a44" stroke-width="6" fill="none"/>`)}
      ${txt(165, 610, "The Owl Warden — sharp", { size: 16, w: 600 })}${lines(40, 628, 2, 250)}`)}`;
  return svg({ title: "Lantern Moths pitch board: title, story and cast panels", defs, body });
}
