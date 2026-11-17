/* One-time migration: builds server/seed/en.json from the v1 data file.
   Usage: node tools/extract-content.cjs <v1-data.js> <v2-data.js(for cast)> <imgmap.json> */
const vm = require("vm"), fs = require("fs"), path = require("path");
const [v1, v2, mapFile] = process.argv.slice(2);
const load = (f) => { const ctx = {}; ctx.window = ctx; vm.createContext(ctx); vm.runInContext(fs.readFileSync(f, "utf8"), ctx); return ctx.GA; };
const G = load(v1), G2 = load(v2), { map, chars } = JSON.parse(fs.readFileSync(mapFile, "utf8"));
const img = (p) => { const n = path.basename(p, ".jpg"); if (!map[n]) throw new Error("no image for " + n); return "/images/" + map[n]; };

const modules = G.modules.map((m, mi) => ({
  slug: m.id, num: m.num, icon: m.icon, color: m.color, cover: img(m.cover), lab: !!m.lab, position: mi,
  title: m.title, tagline: m.tagline, takeaways: m.takeaways,
  lessons: m.lessons.map(l => ({ title: l.title, body: l.body.replace(/\s*\n\s*/g, "\n"), image: l.image ? img(l.image) : "" })),
  quiz: m.quiz.map(q => ({ q: q.q, a: q.a, c: q.c }))
}));
// New lesson in the art module: character design.
const art = modules.find(m => m.slug === "art");
art.lessons.splice(1, 0, {
  title: "Character design: shape, silhouette, colour",
  image: "/images/" + chars[2],
  body: `<p>Great characters are recognisable from their <strong>silhouette alone</strong>. Fill a character in solid black: if you can still tell who it is, the design works. Scan this chart of tiny characters — most are recognisable from a few pixels.</p>
<ul><li><strong>Shape language</strong> — circles feel friendly, squares feel sturdy, triangles feel dangerous or clever.</li>
<li><strong>One signature colour</strong> per hero, repeated on their UI, so players can track them in a busy fight.</li>
<li><strong>One or two motion cues</strong> — a scarf, a cape, ears, a hood — give animators something to move.</li>
<li><strong>Design for the role</strong> — a speedster leans forward, a guardian stands wide, a stealth character hides the face.</li></ul>
<p>Find your own archetype with the quiz in the <a href="#/hall">Hall of Fame</a>.</p>`
});
art.takeaways.splice(1, 0, "A good character reads as a silhouette.");

const C = (i) => "/images/" + chars[i];
const charGallery = [
  [0, "Hero lineup: hooded heroes", ["Characters", "Key Art"], ["Three silhouettes, three readable shapes: mask, hood, armour.", "Cool, desaturated palette keeps attention on faces.", "Overlapping figures create depth and hierarchy."]],
  [1, "Which character are you? (zodiac chart)", ["Characters", "Infographic"], ["Personality quizzes turn characters into identity.", "Each card pairs a hero with traits — a pattern our hero quiz uses.", "Consistent card frames make 12 very different heroes feel like one set."]],
  [2, "Pixel character chart", ["Characters", "Pixel"], ["Dozens of heroes, each readable in a few pixels.", "Silhouette and one signature colour do most of the work.", "Exercise: pick three and name the shape that defines them."]],
  [3, "Crossover poster", ["Characters", "Key Art"], ["A central light source pulls every eye to the middle.", "Mixed styles work when lighting and colour grade are shared.", "Scale shows importance: closest heroes are the biggest."]],
  [4, "Crowd composition", ["Characters", "Key Art"], ["Fog at the bottom unifies a crowded scene.", "Bright colours (red, blue) mark the hero characters.", "Faces are arranged in loose rows to avoid tangents."]],
  [5, "Low-poly everyman", ["Characters", "3D"], ["A casual avatar for life-sim and sandbox games.", "Flat shading and simple shapes keep it cheap to render.", "Headphones and a hoodie give personality without detail."]],
  [6, "Round hero in a bright world", ["Characters", "3D"], ["The rounder the shape, the friendlier it feels.", "Saturated pastel palette matches the character's personality.", "Small companions repeat the hero's shape language."]],
  [7, "Platform lineup poster", ["Characters", "Key Art"], ["Layered heroes from back to front create depth.", "A dark blue backdrop makes warm-coloured characters pop.", "Mascots sit at the front, at the viewer's eye level."]],
  [8, "Mascot design: simple and expressive", ["Characters", "3D"], ["Two goggles, one colour, one outfit — instantly recognisable.", "A plain background puts all attention on the pose.", "A wave gesture invites the player in."]],
  [9, "Speedster mascot", ["Characters", "3D"], ["Leaning pose and big shoes say 'fast' before it moves.", "Orange stands out against green jungle backgrounds.", "Exaggerated grin = attitude and personality."]],
  [10, "Chibi stealth hero", ["Characters", "Key Art"], ["Big head, small body: cute proportions on a dangerous archetype.", "Hood and mask hide the face — the player fills it in.", "Neon rain alley sets mood with a limited palette."]],
  [11, "Hooded assassin in action", ["Characters", "Key Art"], ["A strong diagonal pose reads as motion.", "White costume stands out against the dusty city.", "Red accents (sash) draw the eye to the centre of mass."]],
  [12, "Action heroes collage", ["Characters", "Key Art"], ["Electric blue accents tie dozens of heroes together.", "Vertical composition leads the eye from top to bottom.", "Most-famous heroes take the biggest, most central slots."]],
  [13, "Mascot in a new role", ["Characters", "3D"], ["A familiar character in a new costume — instant novelty.", "Props (radio, tents, signs) tell the story of the camp.", "Warm, soft lighting keeps the tone friendly."]],
  [14, "Battle royale hero", ["Characters", "3D"], ["The helmet hides the face: anyone can be this character.", "Explosion behind the hero frames the silhouette.", "Grey costume against fire = maximum contrast."]],
  [15, "Adventure party in ruins", ["Characters", "Environment"], ["A party lineup shows the cast and the world in one image.", "A sunset arch frames the group.", "Different heights and silhouettes make each member readable."]],
  [16, "Pixel swordswoman", ["Characters", "Pixel"], ["A glowing blade is the brightest point — it marks her role.", "Scarf and hair give two motion cues for animation.", "Isometric pixel tiles ground the character in a world."]]
].map(([i, title, tags, notes]) => ({ src: C(i), title, tags, notes }));
const gallery = G.gallery.map(g => ({ src: img(g.src), title: g.title, tags: g.tags, notes: g.notes })).concat(charGallery);

// Hall of Fame image links where a matching picture exists.
const hallImg = { mario: C(13), kirby: C(6), crash: C(9), "s-mario": C(3) };
const hall = {};
for (const k of Object.keys(G.hall)) hall[k] = G.hall[k].map(x => ({ ...x, image: hallImg[x.id] || "" }));

const out = { modules, gallery, hall, tools: G.tools, ideas: G.ideas, badges: G.badges.concat([{ id: "hero", icon: "🦸", name: "Know Thyself", desc: "Find your hero archetype" }]), cast: G2.cast, castQuiz: G2.castQuiz,
  heroImages: [C(3), C(7), C(12), "/images/" + map["adventure-key-art"]] };
fs.writeFileSync(path.join(__dirname, "..", "server", "seed", "en.json"), JSON.stringify(out, null, 1));
console.log("modules", modules.length, "lessons", modules.reduce((a, m) => a + m.lessons.length, 0), "gallery", gallery.length);
