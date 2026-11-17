/* Game genres ("أنواع الألعاب") used to classify gallery images. Order = display order. */
export const GENRES = [
  { id: "jigsaw", icon: "🧩", name: { en: "Jigsaw Puzzle", ar: "ألغاز التركيب (Jigsaw)" }, desc: { en: "Assemble a picture piece by piece.", ar: "رتّب القطع لتكتمل الصورة." } },
  { id: "puzzle", icon: "🔷", name: { en: "Puzzle & Match", ar: "الألغاز والمطابقة" }, desc: { en: "Logic, match-3 and level maps.", ar: "منطق ومطابقة وخرائط مراحل." } },
  { id: "arcade", icon: "🕹️", name: { en: "Arcade", ar: "ألعاب الأركيد" }, desc: { en: "Fast rounds, high scores, instant fun.", ar: "جولات سريعة ونقاط عالية ومتعة فورية." } },
  { id: "platformer", icon: "🍄", name: { en: "Platformer", ar: "ألعاب المنصات" }, desc: { en: "Run, jump and master movement.", ar: "اركض واقفز وأتقن الحركة." } },
  { id: "adventure", icon: "🗺️", name: { en: "Adventure", ar: "ألعاب المغامرات" }, desc: { en: "Explore worlds and follow a story.", ar: "استكشف العوالم وتابع القصة." } },
  { id: "action", icon: "⚔️", name: { en: "Action", ar: "ألعاب الأكشن" }, desc: { en: "Combat, reflexes and heroes.", ar: "قتال وردود فعل وأبطال." } },
  { id: "rpg", icon: "🛡️", name: { en: "RPG", ar: "تقمّص الأدوار (RPG)" }, desc: { en: "Grow a character, loot and quests.", ar: "طوّر شخصيتك واجمع الغنائم وأنجز المهام." } },
  { id: "strategy", icon: "♟️", name: { en: "Strategy", ar: "ألعاب الاستراتيجية" }, desc: { en: "Plan, build and outthink.", ar: "خطّط وابنِ وتفوّق بالتفكير." } },
  { id: "quiz", icon: "❓", name: { en: "Quiz & Trivia", ar: "الأسئلة والأجوبة" }, desc: { en: "Questions, answers and personality tests.", ar: "أسئلة وأجوبة واختبارات شخصية." } },
  { id: "board", icon: "🎲", name: { en: "Board & Cards", ar: "ألعاب اللوحة والورق" }, desc: { en: "Turns, dice, tiles and cards.", ar: "أدوار ونرد ومربعات وأوراق." } },
  { id: "simulation", icon: "🏗️", name: { en: "Simulation", ar: "ألعاب المحاكاة" }, desc: { en: "Build, manage and run things.", ar: "ابنِ وأدِر وشغّل الأشياء." } },
  { id: "racing", icon: "🏎️", name: { en: "Racing", ar: "ألعاب السباق" }, desc: { en: "Speed, tracks and rivals.", ar: "سرعة ومضامير ومنافسون." } }
];
export const GENRE_IDS = new Set(GENRES.map(g => g.id));

/* Initial classification of the bundled gallery images (by file name). Infographics stay unclassified. */
export const DEFAULT_GENRES = {
  "079c911db9949dff4702781d6857369f.jpg": ["rpg"],
  "02dcfbefe90d72b020174944578e35bf.jpg": ["rpg", "adventure"],
  "50535a92ff115343db22d8abc8c6facb.jpg": ["rpg", "adventure"],
  "800edad8be4259bef7e61dbc74bc3ce1.jpg": ["rpg"],
  "8d2272b72b5edf0309b308c9211f0036.jpg": ["puzzle"],
  "7b9032db95f04bf1811e84e6d97648b2.jpg": ["adventure"],
  "260d34da2f408621cb1989b2f8c32645.jpg": ["adventure", "rpg"],
  "7b2fa29bbd6afeeb415c1689c2f146ad.jpg": ["board"],
  "df9a9615d48fa95c249a3b296a4b8220.jpg": ["strategy"],
  "fcdc0e9522ec3c9501b02611066c936f.jpg": ["arcade", "action"],
  "8e3c920ba644f94924101abf5cfe2e20.jpg": ["adventure"],
  "e28c3ec7dbaaf46610b16d57720f5ba2.jpg": ["simulation"],
  "67876e3341e10e0e6b5b0fdca2c87054.jpg": ["rpg"],
  "ad47519e8a1ee6d5c4001c0450eb4562.jpg": ["adventure"],
  "d891091ff8cea4d867f3d2ef66a32b1f.jpg": ["arcade"],
  "2a2d3667ba7e1d63e8bf0277e6a040f2.jpg": ["platformer"],
  "093b729522a9e810b4d3b822593d4727.jpg": ["action", "adventure"],
  "15fee4920dd9d409983d25652efb108e.jpg": ["quiz"],
  "18080658cb447a3e643dd2039e13cce1.jpg": ["arcade", "platformer"],
  "1acff3228a3a5649a62c4a7136b54808.jpg": ["action"],
  "1b45657cfb3c814db3bbbb66ab992790.jpg": ["action"],
  "38eb386afea361c404aab871acf40f5a.jpg": ["adventure"],
  "459ecc606c237323534075bc3da63893.jpg": ["platformer"],
  "4fe63357a6e5a321c216b3c8552b8d2b.jpg": ["platformer"],
  "548cfb7d32fc3e084665386d837063eb.jpg": ["jigsaw", "platformer"],
  "6113575b6817695e02f79ad6103d8e7c.jpg": ["platformer", "arcade"],
  "64a2dcf7178675e3eca666961e5fed23.jpg": ["action"],
  "6688f7719a979339e40bd5c577791951.jpg": ["action", "adventure"],
  "7ccdb6d2e558d99a83a8eb931710a429.jpg": ["action"],
  "7de0f5c635de73b46ba6890fc037f128.jpg": ["platformer"],
  "7df59f3a8a179a8b365acd11c4dd925b.jpg": ["action"],
  "9c591068f21ce6e5f57fea2ce375c7ea.jpg": ["adventure", "rpg"],
  "dc2021517635a27544f5ac93233cd5e6.jpg": ["action", "rpg"]
};
export const defaultGenresFor = (src) => DEFAULT_GENRES[String(src).split("/").pop()] || [];
