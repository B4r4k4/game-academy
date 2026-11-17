import { rng, svg, A, T, lin, rad, glowFilter, txt, rr, circ, poly, stars, starShape, lanternGlowDef, shade } from "./lib.mjs";

/* The Game Academy cast — eight original heroes, one per archetype. (0,0) = feet. */
export const CAST = [
  { id: "bloop", name: "Bloop", role: "Mascot", shape: "circle", color: "#5ee0b0",
    draw: () => `<ellipse cx="0" cy="2" rx="46" ry="10" fill="#000" opacity=".3"/><ellipse cx="-22" cy="-6" rx="16" ry="9" fill="#2a9a78"/><ellipse cx="22" cy="-6" rx="16" ry="9" fill="#2a9a78"/>
      <circle cx="0" cy="-58" r="56" fill="#5ee0b0"/><ellipse cx="-18" cy="-80" rx="18" ry="12" fill="#fff" opacity=".35"/>
      <ellipse cx="-17" cy="-60" rx="8" ry="12" fill="#1a1430"/><ellipse cx="17" cy="-60" rx="8" ry="12" fill="#1a1430"/><circle cx="-14" cy="-65" r="3" fill="#fff"/><circle cx="20" cy="-65" r="3" fill="#fff"/>
      <ellipse cx="-34" cy="-44" rx="9" ry="5" fill="#ff8fb1" opacity=".7"/><ellipse cx="34" cy="-44" rx="9" ry="5" fill="#ff8fb1" opacity=".7"/><path d="M-8 -40 q8 8 16 0" stroke="#1a1430" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M0 -112 q-4 -20 -22 -24 q4 18 20 22 M0 -112 q6 -24 26 -22 q-8 18 -24 20" fill="#7ed36b"/><ellipse cx="-56" cy="-50" rx="12" ry="16" fill="#4fc79c"/><ellipse cx="56" cy="-50" rx="12" ry="16" fill="#4fc79c"/>` },
  { id: "shade", name: "Shade", role: "Stealth", shape: "triangle", color: "#8b7bff",
    draw: () => `<ellipse cx="0" cy="2" rx="40" ry="9" fill="#000" opacity=".3"/><rect x="-20" y="-50" width="14" height="50" rx="6" fill="#1a1530"/><rect x="6" y="-50" width="14" height="50" rx="6" fill="#15112a"/>
      <path d="M-40 -46 L-30 -130 L30 -130 L40 -46 Q0 -36 -40 -46Z" fill="#2a2348"/><path d="M-40 -46 L-56 -20 L-30 -40Z M40 -46 L56 -16 L30 -40Z" fill="#2a2348"/>
      <path d="M-6 -126 L-60 -40" stroke="#9aa3c4" stroke-width="5" stroke-linecap="round"/><path d="M10 -126 L58 -60" stroke="#9aa3c4" stroke-width="5" stroke-linecap="round"/>
      <rect x="-30" y="-92" width="60" height="10" fill="#ff3b6b"/><path d="M-44 -140 Q0 -220 44 -140 Q48 -112 30 -100 L-30 -100 Q-48 -112 -44 -140Z" fill="#1e1838"/><path d="M0 -206 Q30 -180 44 -140 L30 -134 Q20 -170 0 -206Z" fill="#15112a"/>
      <path d="M-28 -148 Q0 -160 28 -148 L24 -118 Q0 -110 -24 -118Z" fill="#0c0a1a"/><rect x="-26" y="-128" width="52" height="14" rx="4" fill="#2a2348"/>
      ${A("glowf", `<path d="M-20 -140 l12 4 l-12 3z M20 -140 l-12 4 l12 3z" fill="#ff3b6b"/>`, 0, 1.2)}` },
  { id: "brakk", name: "Brakk", role: "Guardian", shape: "square", color: "#ff9a5a",
    draw: () => `<ellipse cx="0" cy="2" rx="62" ry="12" fill="#000" opacity=".3"/><rect x="-40" y="-56" width="30" height="56" rx="8" fill="#6a5a7a"/><rect x="10" y="-56" width="30" height="56" rx="8" fill="#5a4a6a"/>
      <rect x="-60" y="-150" width="120" height="104" rx="18" fill="#9aa3c4"/><rect x="0" y="-150" width="60" height="104" rx="18" fill="#7a83a8"/><rect x="-60" y="-104" width="120" height="16" fill="#ff9a5a"/>
      <rect x="-86" y="-148" width="34" height="80" rx="14" fill="#7a83a8"/><rect x="52" y="-148" width="34" height="80" rx="14" fill="#6a7398"/>
      <rect x="-40" y="-212" width="80" height="66" rx="16" fill="#c0c8dc"/><rect x="0" y="-212" width="40" height="66" rx="16" fill="#9aa3c4"/><rect x="-28" y="-188" width="56" height="12" rx="6" fill="#1a1430"/>
      ${A("glowf", `<rect x="-22" y="-185" width="44" height="6" rx="3" fill="#ffcf5a"/>`, 0, 2)}<path d="M-8 -212 L0 -236 L8 -212Z" fill="#ff9a5a"/>
      <path d="M86 -150 h40 v70 q0 30 -20 44 q-20 -14 -20 -44z" fill="#ff9a5a" stroke="#7a3a1a" stroke-width="4"/>${A("tw", poly(starShape(106, -110, 12, 5), "#fff"), 0, 1.4)}` },
  { id: "ember", name: "Ember", role: "Adventurer", shape: "diamond", color: "#ff5d73",
    draw: () => `<ellipse cx="0" cy="2" rx="40" ry="9" fill="#000" opacity=".3"/><rect x="-18" y="-60" width="14" height="60" rx="5" fill="#5a3a2a"/><rect x="4" y="-60" width="14" height="60" rx="5" fill="#4a2e20"/>
      <path d="M-30 -60 L-24 -130 L24 -130 L30 -60 Q0 -48 -30 -60Z" fill="#3a5ab8"/><rect x="-26" y="-112" width="52" height="12" fill="#8a5a3c"/><rect x="-6" y="-112" width="12" height="12" fill="#ffcf5a"/>
      <circle cx="0" cy="-156" r="26" fill="#f2c9a0"/><path d="M-32 -160 Q-30 -196 0 -192 Q34 -196 32 -158 Q22 -172 6 -170 Q-12 -176 -32 -160Z" fill="#7a3a20"/><path d="M-32 -160 q-12 20 -6 40 M32 -160 q12 24 2 40" stroke="#7a3a20" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="-9" cy="-154" r="3.5" fill="#1a1430"/><circle cx="9" cy="-154" r="3.5" fill="#1a1430"/><path d="M-6 -142 q6 4 12 0" stroke="#a04040" stroke-width="2.5" fill="none"/>
      ${A("sway", `<path d="M-20 -132 Q-50 -128 -66 -110 Q-50 -112 -40 -106 Q-30 -120 -10 -122Z" fill="#ff5d73"/>`, 0, 1.6)}<rect x="-24" y="-136" width="48" height="12" rx="6" fill="#ff5d73"/>
      <path d="M40 -40 L40 -150" stroke="#9fd8ff" stroke-width="10" stroke-linecap="round"/>${A("glowf", `<path d="M40 -40 L40 -150" stroke="#5ab0ff" stroke-width="20" opacity=".4" stroke-linecap="round"/>`, 0, 1.3)}<rect x="26" y="-44" width="28" height="8" rx="3" fill="#ffcf5a"/><rect x="36" y="-36" width="8" height="22" fill="#5a3a2a"/>` },
  { id: "zip", name: "Zip", role: "Speedster", shape: "bolt", color: "#b8f34a",
    draw: () => `<ellipse cx="0" cy="2" rx="44" ry="9" fill="#000" opacity=".3"/>${A("hop", `<path d="M-14 0 l-10 -40 M14 0 l12 -40" stroke="#4a8a2a" stroke-width="14" stroke-linecap="round"/><ellipse cx="-22" cy="-2" rx="16" ry="8" fill="#ff5d73"/><ellipse cx="26" cy="-2" rx="16" ry="8" fill="#ff5d73"/>
      <ellipse cx="0" cy="-74" rx="34" ry="42" fill="#b8f34a"/><ellipse cx="0" cy="-64" rx="20" ry="28" fill="#eaffc0"/><path d="M-30 -80 Q-70 -60 -90 -90 Q-66 -76 -40 -96Z" fill="#8ad02a"/>
      <circle cx="0" cy="-136" r="32" fill="#b8f34a"/><path d="M-20 -164 L-4 -196 L4 -166 L24 -190 L22 -160Z" fill="#8ad02a"/>
      <rect x="-30" y="-150" width="60" height="22" rx="11" fill="#5ab0ff" stroke="#1a1430" stroke-width="4"/><circle cx="-12" cy="-139" r="6" fill="#fff"/><circle cx="14" cy="-139" r="6" fill="#fff"/>
      <path d="M-14 -118 q14 10 28 0" stroke="#1a1430" stroke-width="4" fill="none" stroke-linecap="round"/>`, 0, .3)}
      ${[0, 1, 2].map(k => A("drift", `<path d="M-60 ${-40 - k * 30} h-40" stroke="#b8f34a" stroke-width="4" opacity=".5" stroke-linecap="round"/>`, k * .3, .8)).join("")}` },
  { id: "nova", name: "Nova", role: "Explorer", shape: "drop", color: "#2fd3c4",
    draw: () => `<ellipse cx="0" cy="2" rx="40" ry="9" fill="#000" opacity=".3"/><rect x="-18" y="-46" width="14" height="46" rx="6" fill="#2a2147"/><rect x="4" y="-46" width="14" height="46" rx="6" fill="#231b3d"/>
      <path d="M-36 -40 Q-40 -110 -18 -128 L18 -128 Q40 -110 36 -40 Q0 -30 -36 -40Z" fill="#2fd3c4"/><path d="M8 -128 L18 -128 Q40 -110 36 -40 Q22 -34 10 -34Z" fill="#1c9f95"/>
      <circle cx="0" cy="-160" r="34" fill="#2fd3c4"/><path d="M8 -190 Q14 -214 36 -206 Q20 -192 20 -184Z" fill="#2fd3c4"/><ellipse cx="0" cy="-154" rx="24" ry="22" fill="#ffe0c2"/>
      <circle cx="-9" cy="-156" r="4" fill="#1a1430"/><circle cx="9" cy="-156" r="4" fill="#1a1430"/><path d="M-6 -144 q6 5 12 0" stroke="#c0605a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="-30" y="-132" width="60" height="16" rx="8" fill="#ff5d73"/>${A("sway", `<path d="M20 -128 Q44 -122 56 -104 Q40 -106 30 -100 Q26 -114 14 -118Z" fill="#ff5d73"/>`, 0, 1.8)}
      <line x1="-44" y1="-30" x2="-50" y2="-150" stroke="#6b4a2f" stroke-width="5" stroke-linecap="round"/>${A("glowf", `<circle cx="-50" cy="-138" r="42" fill="url(#lanternGlow)"/>`, 0, 1.6)}<rect x="-59" y="-150" width="18" height="24" rx="5" fill="#ffcf5a" stroke="#7a4f1c" stroke-width="3"/>` },
  { id: "doc", name: "Doc", role: "Everyman", shape: "rectangle", color: "#7ed36b",
    draw: () => `<ellipse cx="0" cy="2" rx="42" ry="9" fill="#000" opacity=".3"/><polygon points="-22,0 -20,-70 -2,-70 -4,0" fill="#3a3f55"/><polygon points="4,0 2,-70 20,-70 22,0" fill="#2e3348"/><polygon points="-28,0 -4,0 -4,-8 -26,-10" fill="#2a2a2a"/><polygon points="4,0 28,0 26,-10 4,-8" fill="#2a2a2a"/>
      <polygon points="-36,-66 -32,-140 32,-140 36,-66" fill="#7ed36b"/><polygon points="0,-140 32,-140 36,-66 0,-66" fill="#5fb84f"/><polygon points="-36,-140 -50,-80 -40,-74 -28,-128" fill="#6fc65f"/><polygon points="36,-140 50,-80 40,-74 28,-128" fill="#4fa83f"/>
      <polygon points="-24,-140 -26,-196 26,-196 24,-140" fill="#d9a07a"/><polygon points="0,-196 26,-196 24,-140 0,-140" fill="#c48a64"/><polygon points="-28,-196 -26,-216 26,-216 28,-196" fill="#4a3022"/>
      <polygon points="-24,-160 -22,-138 22,-138 24,-160 12,-152 -12,-152" fill="#4a3022"/><rect x="-18" y="-182" width="14" height="10" rx="2" fill="none" stroke="#1a1430" stroke-width="3"/><rect x="4" y="-182" width="14" height="10" rx="2" fill="none" stroke="#1a1430" stroke-width="3"/>
      <path d="M-32 -184 Q-32 -226 0 -226 Q32 -226 32 -184" stroke="#2a2a3a" stroke-width="7" fill="none"/><rect x="-38" y="-192" width="12" height="22" rx="5" fill="#2a2a3a"/><rect x="26" y="-192" width="12" height="22" rx="5" fill="#2a2a3a"/>
      ${A("rise", `<text x="44" y="-200" font-size="24" fill="#ffcf5a">♪</text>`, 0, 2.2)}` },
  { id: "hex", name: "Hex", role: "Caster", shape: "tall triangle", color: "#d65cff",
    draw: () => `<ellipse cx="0" cy="2" rx="44" ry="9" fill="#000" opacity=".3"/><path d="M-44 0 L-20 -130 L20 -130 L44 0Z" fill="#6a3aa8"/><path d="M0 -130 L20 -130 L44 0 L10 0Z" fill="#5a2a98"/>
      ${[0, 1, 2].map(k => A("tw", poly(starShape(-14 + k * 14, -40 - k * 26, 6, 2.5), "#ffcf5a"), k * .4, 1.2)).join("")}
      <circle cx="0" cy="-150" r="24" fill="#f2c9a0"/><path d="M-20 -140 Q0 -100 20 -140 Q10 -128 0 -126 Q-10 -128 -20 -140Z" fill="#e8e0f0"/>
      <circle cx="-8" cy="-154" r="3.5" fill="#1a1430"/><circle cx="8" cy="-154" r="3.5" fill="#1a1430"/><path d="M-48 -168 Q0 -180 48 -168 Q0 -158 -48 -168Z" fill="#4a1a78"/><path d="M-30 -170 L10 -260 L30 -170Z" fill="#6a3aa8"/>
      <line x1="56" y1="0" x2="56" y2="-170" stroke="#6b4a2f" stroke-width="6" stroke-linecap="round"/>${A("pulse", `<circle cx="56" cy="-182" r="16" fill="#d65cff" opacity=".9"/>`, 0, 1)}${A("glowf", `<circle cx="56" cy="-182" r="34" fill="#d65cff" opacity=".35"/>`, 0, 1.2)}` }
];

/* 23. CAST LINEUP — crossover-poster energy, all original */
export function castLineup() {
  const R = rng(55);
  const order = ["shade", "ember", "brakk", "nova", "bloop", "hex", "zip", "doc"].map(id => CAST.find(c => c.id === id));
  const xs = [100, 245, 390, 540, 690, 840, 985, 1115], scales = [.95, 1, 1.05, 1.15, 1.1, 1.05, 1, .95];
  const sil = (c, x) => T(x, 742, `<g fill="#0c0820" opacity=".9">${c.draw().replace(/fill="[^"]*"/g, 'fill="#0c0820"').replace(/stroke="[^"]*"/g, 'stroke="#0c0820"')}</g>`, .42);
  const defs = lin("bg", [[0, "#140a3a"], [.6, "#3a1460"], [1, "#ff6b8a"]]) + rad("spot", [[0, "#fff6d0", .5], [1, "#fff6d0", 0]]) + lanternGlowDef() + glowFilter("g", 6) + lin("floor", [[0, "#2a1450"], [1, "#0c0820"]]);
  const body = `<rect width="1200" height="750" fill="url(#bg)"/>${stars(R, 70, 1200, 360)}
    ${A("spin", `<g opacity=".18">${Array.from({ length: 16 }, (_, i) => `<polygon points="600,330 ${600 + Math.cos(i / 16 * Math.PI * 2) * 900},${330 + Math.sin(i / 16 * Math.PI * 2) * 900} ${600 + Math.cos((i + .45) / 16 * Math.PI * 2) * 900},${330 + Math.sin((i + .45) / 16 * Math.PI * 2) * 900}" fill="#ffd27a"/>`).join("")}</g>`, 0, 80)}
    <ellipse cx="600" cy="560" rx="620" ry="120" fill="url(#floor)"/>
    ${order.map((c, i) => `${A("glowf", `<ellipse cx="${xs[i]}" cy="380" rx="90" ry="260" fill="url(#spot)"/>`, i * .4, 2.6)}`).join("")}
    ${order.map((c, i) => T(xs[i], 560 - (i === 3 || i === 4 ? 10 : 0), A("bob", c.draw(), i * .5, 2 + (i % 3) * .5), scales[i])).join("")}
    ${order.map((c, i) => T(xs[i], 600, rr(-56, -14, 112, 46, 12, "#120a2e", `opacity=".85" stroke="${c.color}" stroke-width="2"`) + txt(0, 6, c.name, { size: 17 }) + txt(0, 25, c.role.toUpperCase(), { size: 10, ls: 2, fill: c.color }))).join("")}
    <rect y="650" width="1200" height="100" fill="#ffd27a" opacity=".1"/>${order.map((c, i) => sil(c, xs[i])).join("")}
    ${txt(600, 70, "MEET THE CAST", { size: 40, ls: 8, stroke: "#3a1460", sw: 8 })}${txt(600, 102, "eight archetypes · eight silhouettes · one academy", { size: 17, fill: "#ffd27a", w: 600 })}`;
  return svg({ title: "Lineup of eight original Game Academy heroes, one per character archetype", defs, body });
}

/* Individual portrait cards for the archetype quiz */
export function castCard(c) {
  const defs = rad("bgc", [[0, shade(c.color, -.25)], [1, "#120a2e"]], .5, .45, .7) + lanternGlowDef() + glowFilter("g", 6);
  const body = `<rect width="400" height="400" fill="url(#bgc)"/>${A("spin", `<g opacity=".15">${Array.from({ length: 12 }, (_, i) => `<polygon points="200,200 ${200 + Math.cos(i / 12 * Math.PI * 2) * 400},${200 + Math.sin(i / 12 * Math.PI * 2) * 400} ${200 + Math.cos((i + .4) / 12 * Math.PI * 2) * 400},${200 + Math.sin((i + .4) / 12 * Math.PI * 2) * 400}" fill="#fff"/>`).join("")}</g>`, 0, 60)}
    <ellipse cx="200" cy="352" rx="130" ry="22" fill="#000" opacity=".25"/>${T(200, 368, A("bob", c.draw(), 0, 2.4), 1.35)}`;
  return svg({ w: 400, h: 400, title: `${c.name}, the ${c.role}`, defs, body });
}
