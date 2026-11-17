/* Games showcase ("معرض الألعاب") — design breakdowns of well-known games, bilingual.
   Each entry: facts, scenario, game loop, structure diagram (flow), mechanics, audience, lessons.
   Images come from the user's own images/ folder and illustrate the genre — they are not screenshots of the game. */
window.GAMES = [
  {
    id: "pubg", verbs: ["collect", "survive", "fight"], img: "7df59f3a8a179a8b365acd11c4dd925b.jpg", color: "#e8a33d",
    title: { en: "PUBG: Battlegrounds", ar: "PUBG: Battlegrounds" },
    year: 2017, studio: { en: "PUBG Studios (Krafton)", ar: "PUBG Studios (كرافتون)" },
    genre: { en: "Battle royale · Shooter", ar: "باتل رويال · تصويب" }, genreKey: "action",
    platforms: { en: "PC, consoles, mobile", ar: "الحاسوب والمنصات والجوال" },
    pitch: { en: "100 players, one island, one survivor.", ar: "مئة لاعب، جزيرة واحدة، ناجٍ واحد." },
    scenario: {
      en: "There is no hero story. Up to 100 players jump from a plane onto an island with nothing in their hands. They search buildings for weapons, armour and medicine, while a deadly zone keeps shrinking and pushes everyone closer together. The last player or team alive wins the \"chicken dinner\". Each match writes its own story from the player's choices.",
      ar: "لا توجد قصة بطل. يقفز حتى 100 لاعب من طائرة إلى جزيرة دون أي شيء في أيديهم. يفتّشون المباني بحثًا عن الأسلحة والدروع والأدوية، بينما تضيق منطقة قاتلة باستمرار وتدفع الجميع نحو بعضهم. آخر لاعب أو فريق يبقى حيًّا يفوز. كل مباراة تكتب قصتها الخاصة من قرارات اللاعبين."
    },
    loop: { en: ["Drop", "Loot", "Move with the zone", "Fight"], ar: ["القفز", "جمع العتاد", "التحرك مع المنطقة", "القتال"] },
    flowH: { en: "Match timeline", ar: "خط زمن المباراة" },
    flow: {
      en: [["Plane", "Choose where and when to jump"], ["Landing", "Hot drop (risky, rich loot) or quiet spot"], ["Early game", "Loot weapons, armour, healing"], ["Zone phases", "The safe circle shrinks in stages"], ["Mid game", "Vehicles, rotations, third-party fights"], ["Final circle", "Few players, very little cover"], ["Winner", "Last player / squad standing"]],
      ar: [["الطائرة", "اختر أين ومتى تقفز"], ["الهبوط", "منطقة ساخنة (خطرة وغنية) أو مكان هادئ"], ["بداية المباراة", "اجمع الأسلحة والدروع والعلاج"], ["مراحل المنطقة", "الدائرة الآمنة تضيق على مراحل"], ["منتصف المباراة", "مركبات وتنقّل ومعارك مفاجئة"], ["الدائرة الأخيرة", "لاعبون قليلون وغطاء قليل جدًا"], ["الفائز", "آخر لاعب أو فريق يبقى"]]
    },
    mechanics: {
      en: ["A shrinking safe zone that forces players to meet", "Random loot, so every match starts differently", "One life per match: losing costs you the whole round", "Air drops with rare gear as a risky reward", "Vehicles for moving fast across a large map"],
      ar: ["منطقة آمنة تضيق وتجبر اللاعبين على الالتقاء", "غنائم عشوائية، فكل مباراة تبدأ بشكل مختلف", "حياة واحدة في المباراة: الخسارة تكلّفك الجولة كلها", "صناديق إسقاط جوي فيها عتاد نادر كمكافأة خطرة", "مركبات للتنقل السريع في خريطة كبيرة"]
    },
    audience: { en: "Competitive players aged 16+ who like tension and replayable matches of 20–30 minutes.", ar: "لاعبون تنافسيون من عمر 16 فما فوق يحبون التوتر والمباريات المتكررة (20–30 دقيقة)." },
    lessons: {
      en: ["Shrinking space creates rising tension on its own.", "Randomness at the start makes every round feel new.", "\"Easy to learn, hard to master\": anyone can loot, few can win."],
      ar: ["تضييق المساحة يصنع توترًا متصاعدًا تلقائيًا.", "العشوائية في البداية تجعل كل جولة جديدة.", "«سهلة التعلّم، صعبة الإتقان»: الجميع يجمع العتاد، والقليل يفوز."]
    }
  },
  {
    id: "minecraft", verbs: ["collect", "craft", "build"], img: "079c911db9949dff4702781d6857369f.jpg", color: "#6fbf4a",
    title: { en: "Minecraft", ar: "ماينكرافت (Minecraft)" },
    year: 2011, studio: { en: "Mojang Studios", ar: "Mojang Studios" },
    genre: { en: "Sandbox · Survival · Crafting", ar: "عالم مفتوح للبناء (Sandbox) · بقاء · صناعة" }, genreKey: "simulation",
    platforms: { en: "Almost every platform", ar: "تقريبًا كل المنصات" },
    pitch: { en: "A world made of blocks — break it, craft it, build anything.", ar: "عالم من المكعبات — اكسره، اصنع منه، وابنِ أي شيء." },
    scenario: {
      en: "You appear alone in an endless world generated from a random seed. In the day you collect wood, stone and food; at night monsters come out, so you need a shelter fast. There is no forced story: the optional goal is to reach a dark dimension called the End and defeat the Ender Dragon. Most players set their own goals — a castle, a farm, a city.",
      ar: "تظهر وحيدًا في عالم لا نهائي يُولَّد من بذرة عشوائية. في النهار تجمع الخشب والحجر والطعام، وفي الليل تخرج الوحوش، فتحتاج إلى مأوى بسرعة. لا توجد قصة مفروضة: الهدف الاختياري هو الوصول إلى بُعد مظلم اسمه The End وهزيمة تنين الإندر. معظم اللاعبين يضعون أهدافهم بأنفسهم — قلعة أو مزرعة أو مدينة."
    },
    loop: { en: ["Gather", "Craft", "Build", "Survive the night"], ar: ["اجمع", "اصنع", "ابنِ", "انجُ من الليل"] },
    flowH: { en: "Progression map", ar: "مخطط التقدّم" },
    flow: {
      en: [["Wood", "Punch trees, make a crafting table"], ["Stone tools", "Faster mining, first shelter"], ["Iron", "Armour, buckets, better tools"], ["Diamond", "Deep caves, the strongest gear"], ["The Nether", "Fire dimension: blaze rods, rare blocks"], ["The End", "Find the stronghold, fight the dragon"]],
      ar: [["الخشب", "اقطع الأشجار واصنع طاولة الصناعة"], ["أدوات الحجر", "تعدين أسرع وأول مأوى"], ["الحديد", "دروع ودلاء وأدوات أفضل"], ["الألماس", "كهوف عميقة وأقوى عتاد"], ["النذر (Nether)", "بُعد ناري: عصيّ البليز ومكعبات نادرة"], ["النهاية (The End)", "اعثر على القلعة وقاتل التنين"]]
    },
    mechanics: {
      en: ["Every block can be broken and placed", "Crafting recipes: combine items in a grid", "Day / night cycle that changes the danger", "Procedurally generated world — every world is unique", "Creative mode with no limits, next to Survival mode"],
      ar: ["كل مكعب يمكن كسره ووضعه", "وصفات صناعة: ادمج الأشياء في شبكة", "دورة ليل ونهار تغيّر مستوى الخطر", "عالم مولَّد إجرائيًا — كل عالم فريد", "وضع إبداعي بلا حدود بجانب وضع البقاء"]
    },
    audience: { en: "All ages (very popular with 8–16). Builders, explorers and players who like to set their own goals.", ar: "كل الأعمار (شائعة جدًا بين 8 و16 سنة). البنّاؤون والمستكشفون ومن يحب وضع أهدافه بنفسه." },
    lessons: {
      en: ["Simple pieces + free combination = endless creativity.", "A clear threat (the night) gives freedom a purpose.", "Let players write their own goals."],
      ar: ["قطع بسيطة + حرية الدمج = إبداع لا ينتهي.", "خطر واضح (الليل) يعطي الحرية معنى.", "دع اللاعبين يكتبون أهدافهم بأنفسهم."]
    }
  },
  {
    id: "mario", verbs: ["jump", "collect", "explore"], img: "4fe63357a6e5a321c216b3c8552b8d2b.jpg", color: "#e5483b",
    title: { en: "Super Mario Bros.", ar: "سوبر ماريو براذرز" },
    year: 1985, studio: { en: "Nintendo", ar: "نينتندو" },
    genre: { en: "2D platformer", ar: "منصات ثنائية الأبعاد" }, genreKey: "platformer",
    platforms: { en: "NES (and many re-releases)", ar: "جهاز NES (وإصدارات كثيرة لاحقة)" },
    pitch: { en: "Run, jump, and reach the flag.", ar: "اركض، واقفز، واصل إلى العلم." },
    scenario: {
      en: "Bowser, king of the Koopa, has invaded the Mushroom Kingdom and kidnapped Princess Peach. Mario travels through eight worlds to save her. At the end of each castle, a Toad tells him: \"Thank you Mario! But our princess is in another castle!\" — until the last castle, where he finally rescues her.",
      ar: "غزا باوزر، ملك الكوبا، مملكة الفطر وخطف الأميرة بيتش. يسافر ماريو عبر ثمانية عوالم لإنقاذها. في نهاية كل قلعة يقول له أحد سكان المملكة: «شكرًا يا ماريو! لكن أميرتنا في قلعة أخرى!» — حتى القلعة الأخيرة حيث ينقذها أخيرًا."
    },
    loop: { en: ["Run", "Jump / stomp", "Collect", "Reach the flag"], ar: ["اركض", "اقفز / ادعس", "اجمع", "صِل إلى العلم"] },
    flowH: { en: "Level structure", ar: "هيكل المراحل" },
    flow: {
      en: [["World 1-1", "Teaches everything without a single word"], ["Levels X-1 to X-3", "Overworld, underground, sky, water"], ["Castle X-4", "Fire bars, lava and a fake Bowser"], ["Warp zones", "Secret pipes that skip worlds"], ["World 8-4", "The real Bowser — the princess is here"]],
      ar: [["المرحلة 1-1", "تعلّم كل شيء دون كلمة واحدة"], ["المراحل X-1 إلى X-3", "سطح وأنفاق وسماء وماء"], ["القلعة X-4", "قضبان نار وحمم وباوزر مزيّف"], ["مناطق الانتقال", "أنابيب سرّية تتخطى العوالم"], ["المرحلة 8-4", "باوزر الحقيقي — والأميرة هنا"]]
    },
    mechanics: {
      en: ["Momentum: running longer lets you jump further", "Stomp enemies from above; touching them from the side hurts", "Power-ups: mushroom (grow), fire flower (shoot), star (invincible)", "Coins: 100 coins = an extra life", "A timer that pushes you forward"],
      ar: ["الزخم: كلما ركضت أكثر قفزت أبعد", "ادعس الأعداء من الأعلى؛ لمسهم من الجانب يؤذيك", "التقويات: الفطر (يكبّرك)، زهرة النار (تطلق)، النجمة (لا تُقهر)", "العملات: 100 عملة = حياة إضافية", "مؤقت يدفعك للأمام"]
    },
    audience: { en: "Everyone. It is the classic first game for many players.", ar: "الجميع. إنها اللعبة الأولى الكلاسيكية لكثير من اللاعبين." },
    lessons: {
      en: ["Teach with level design, not with text.", "Introduce one idea, then test it, then twist it.", "Movement must feel good before anything else."],
      ar: ["علّم عبر تصميم المرحلة، لا عبر النصوص.", "قدّم فكرة واحدة، ثم اختبرها، ثم غيّرها.", "يجب أن تكون الحركة ممتعة قبل أي شيء آخر."]
    }
  },
  {
    id: "zelda-botw", verbs: ["explore", "solve", "fight"], img: "ad47519e8a1ee6d5c4001c0450eb4562.jpg", color: "#3fb7a8",
    title: { en: "The Legend of Zelda: Breath of the Wild", ar: "أسطورة زيلدا: نَفَس البرية" },
    year: 2017, studio: { en: "Nintendo", ar: "نينتندو" },
    genre: { en: "Open-world action-adventure", ar: "مغامرة وأكشن في عالم مفتوح" }, genreKey: "adventure",
    platforms: { en: "Nintendo Switch, Wii U", ar: "نينتندو سويتش، Wii U" },
    pitch: { en: "See that mountain? You can climb it.", ar: "هل ترى ذلك الجبل؟ يمكنك تسلّقه." },
    scenario: {
      en: "Link wakes up after a 100-year sleep with no memory. A great evil, Calamity Ganon, has taken Hyrule Castle, and Princess Zelda has been holding it back alone for a century. Link must free four giant machines, the Divine Beasts, recover his memories, and face Ganon — or go straight to the castle at any time.",
      ar: "يستيقظ لينك بعد نوم دام 100 عام وقد فقد ذاكرته. شرّ عظيم اسمه «كارثة غانون» استولى على قلعة هايرول، والأميرة زيلدا تصدّه وحدها منذ قرن. على لينك تحرير أربع آلات عملاقة (الوحوش الإلهية)، واستعادة ذكرياته، ثم مواجهة غانون — أو الذهاب إلى القلعة مباشرة في أي وقت."
    },
    loop: { en: ["Spot something", "Travel / climb", "Solve or fight", "Get stronger"], ar: ["لاحِظ شيئًا", "انتقل / تسلّق", "حلّ أو قاتل", "ازدد قوة"] },
    flowH: { en: "World structure", ar: "هيكل العالم" },
    flow: {
      en: [["Great Plateau", "A closed tutorial area: 4 shrines, 4 core powers"], ["Paraglider", "Leave the plateau — the whole world opens"], ["Towers", "Climb them to reveal each region's map"], ["Shrines", "120 short puzzles; rewards raise hearts and stamina"], ["Divine Beasts", "4 big dungeons in any order"], ["Hyrule Castle", "The final fight — open from the start"]],
      ar: [["الهضبة الكبرى", "منطقة تعليمية مغلقة: 4 أضرحة و4 قدرات أساسية"], ["المظلة الشراعية", "اخرج من الهضبة — فينفتح العالم كله"], ["الأبراج", "تسلّقها لتكشف خريطة كل منطقة"], ["الأضرحة", "120 لغزًا قصيرًا؛ مكافآتها تزيد القلوب والطاقة"], ["الوحوش الإلهية", "4 زنازين كبيرة بأي ترتيب"], ["قلعة هايرول", "المعركة الأخيرة — مفتوحة منذ البداية"]]
    },
    mechanics: {
      en: ["Climb almost any surface, limited by stamina", "A physics and chemistry system: fire, wind, metal, electricity", "Weapons break, so you keep trying new ones", "Cooking turns ingredients into buffs", "Non-linear: go anywhere, in any order"],
      ar: ["تسلّق أي سطح تقريبًا، بحدود شريط الطاقة", "نظام فيزياء وكيمياء: نار وريح ومعدن وكهرباء", "الأسلحة تنكسر، فتجرّب أسلحة جديدة باستمرار", "الطبخ يحوّل المكوّنات إلى تقويات", "غير خطية: اذهب إلى أي مكان بأي ترتيب"]
    },
    audience: { en: "Teens and adults who love exploring, curiosity and solving problems their own way.", ar: "المراهقون والبالغون الذين يحبون الاستكشاف والفضول وحل المشكلات بطريقتهم." },
    lessons: {
      en: ["Reward curiosity: put something interesting at every point you can see.", "Systems that react to each other let players invent solutions.", "A small closed tutorial area before a big open world."],
      ar: ["كافئ الفضول: ضع شيئًا مثيرًا في كل نقطة يراها اللاعب.", "أنظمة تتفاعل مع بعضها تتيح للاعبين ابتكار الحلول.", "منطقة تعليمية صغيرة مغلقة قبل العالم المفتوح الكبير."]
    }
  },
  {
    id: "assassins-creed", verbs: ["explore", "sneak", "fight"], img: "6688f7719a979339e40bd5c577791951.jpg", color: "#c9c9c9",
    title: { en: "Assassin's Creed", ar: "أساسنز كريد (Assassin's Creed)" },
    year: 2007, studio: { en: "Ubisoft Montreal", ar: "يوبيسوفت مونتريال" },
    genre: { en: "Action-adventure · Stealth", ar: "أكشن ومغامرة · تخفٍّ" }, genreKey: "action",
    platforms: { en: "PC, PlayStation 3, Xbox 360", ar: "الحاسوب، بلايستيشن 3، إكس بوكس 360" },
    pitch: { en: "Climb, watch, strike — and vanish into the crowd.", ar: "تسلّق، راقب، اضرب — ثم اختفِ بين الحشود." },
    scenario: {
      en: "In the present day, Desmond Miles is held by a company that uses a machine, the Animus, to relive his ancestors' memories. Through it he becomes Altaïr, an assassin in 1191 during the Third Crusade. After failing his order, Altaïr is demoted and must earn his rank back by eliminating nine targets in Damascus, Acre and Jerusalem — and he discovers a much bigger conspiracy.",
      ar: "في الزمن الحاضر، تحتجز شركةٌ ديزموند مايلز وتستخدم آلة اسمها «الأنيموس» ليعيش ذكريات أجداده. من خلالها يصبح «الطائر» (Altaïr)، وهو قاتل في عام 1191 أثناء الحملة الصليبية الثالثة. بعد أن يخذل جماعته تُسحب رتبته، فعليه استعادتها بإسقاط تسعة أهداف في دمشق وعكا والقدس — ليكتشف مؤامرة أكبر بكثير."
    },
    loop: { en: ["Synchronise (viewpoint)", "Investigate", "Assassinate", "Escape & blend"], ar: ["المزامنة (نقطة المراقبة)", "التحقيق", "الاغتيال", "الهروب والاختفاء"] },
    flowH: { en: "Mission structure", ar: "هيكل المهمة" },
    flow: {
      en: [["Masyaf (hub)", "The Assassin fortress: get the next target"], ["Travel", "Ride across the kingdom to a city"], ["Viewpoints", "Climb high points to reveal the area"], ["Investigations", "Eavesdrop, pickpocket, interrogate"], ["The assassination", "Plan the approach and strike"], ["Escape", "Break line of sight, hide, return to Masyaf"]],
      ar: [["مصياف (القاعدة)", "قلعة الجماعة: خذ الهدف التالي"], ["السفر", "اركب عبر المملكة إلى مدينة"], ["نقاط المراقبة", "تسلّق الأماكن العالية لكشف المنطقة"], ["التحقيقات", "تنصّت، وانشل، واستجوب"], ["الاغتيال", "خطّط للاقتراب ثم اضرب"], ["الهروب", "اكسر خط الرؤية، واختبئ، وعُد إلى مصياف"]]
    },
    mechanics: {
      en: ["Free-running: climb buildings and run across rooftops", "Social stealth: hide in crowds instead of shadows", "Eagle Vision to identify targets and allies", "Notoriety: the more you are noticed, the more guards react", "\"Leap of faith\" into hay to break pursuit"],
      ar: ["الجري الحر: تسلّق المباني واركض فوق الأسطح", "التخفّي الاجتماعي: اختبئ بين الحشود بدل الظلال", "رؤية النسر لتمييز الأهداف والحلفاء", "الشهرة: كلما لُوحظت أكثر زادت ردة فعل الحراس", "«قفزة الإيمان» إلى كومة القش لقطع المطاردة"]
    },
    audience: { en: "Players 17+ who enjoy history, stealth and parkour.", ar: "لاعبون من عمر 17 فما فوق يحبون التاريخ والتخفي والباركور." },
    lessons: {
      en: ["A story frame (the Animus) can explain game rules like the map and \"desync\".", "Real places and history make a world feel deep.", "A repeated mission pattern must vary, or it gets boring — a known criticism of this first game."],
      ar: ["إطار قصصي (الأنيموس) يمكنه تفسير قواعد اللعب مثل الخريطة و«فقدان المزامنة».", "الأماكن والتاريخ الحقيقي تجعل العالم عميقًا.", "نمط المهمات المتكرر يجب أن يتنوّع وإلا أصبح مملًّا — وهو نقد معروف لهذا الجزء الأول."]
    }
  },
  {
    id: "stardew", verbs: ["collect", "trade", "upgrade"], img: "7b9032db95f04bf1811e84e6d97648b2.jpg", color: "#8bc34a",
    title: { en: "Stardew Valley", ar: "ستاردو فالي (Stardew Valley)" },
    year: 2016, studio: { en: "ConcernedApe (Eric Barone, solo)", ar: "ConcernedApe (إريك بارون، مطوّر واحد)" },
    genre: { en: "Farming simulation · Life sim · RPG", ar: "محاكاة زراعة · محاكاة حياة · تقمّص أدوار" }, genreKey: "simulation",
    platforms: { en: "PC, consoles, mobile", ar: "الحاسوب والمنصات والجوال" },
    pitch: { en: "Leave the office. Grow a farm. Become part of a town.", ar: "اترك المكتب. ازرع مزرعة. وكن جزءًا من بلدة." },
    scenario: {
      en: "Tired of a grey job at the Joja corporation, you open a letter from your late grandfather: he left you his old farm in Pelican Town. You arrive with a few coins and a field full of weeds. You restore the farm, meet the townspeople, and choose a side: rebuild the abandoned Community Center with the help of forest spirits, or let Joja turn it into a warehouse.",
      ar: "بعد أن تتعب من وظيفة رمادية في شركة جوجا، تفتح رسالة من جدّك الراحل: لقد ترك لك مزرعته القديمة في بلدة بيليكان. تصل ومعك بضع عملات وحقل مليء بالأعشاب. تعيد إحياء المزرعة، وتتعرّف على أهل البلدة، وتختار طرفًا: إعادة بناء مركز المجتمع المهجور بمساعدة أرواح الغابة، أو ترك جوجا تحوّله إلى مستودع."
    },
    loop: { en: ["Plant & water", "Harvest & sell", "Upgrade", "Make friends"], ar: ["ازرع واسقِ", "احصد وبِع", "طوّر", "كوّن صداقات"] },
    flowH: { en: "Time & progression", ar: "الوقت والتقدّم" },
    flow: {
      en: [["One day", "6 am – 2 am, limited energy"], ["One season", "28 days; each season has its own crops"], ["Bundles", "Deliver item sets to restore the Community Center"], ["The Mines", "120 floors: ores, monsters, better tools"], ["Year 2+", "Greenhouse, artisan goods, marriage, family"]],
      ar: [["يوم واحد", "من 6 صباحًا إلى 2 فجرًا، بطاقة محدودة"], ["فصل واحد", "28 يومًا؛ لكل فصل محاصيله"], ["الحِزَم", "سلّم مجموعات أشياء لإصلاح مركز المجتمع"], ["المناجم", "120 طابقًا: خامات ووحوش وأدوات أفضل"], ["السنة الثانية فما بعد", "بيت زجاجي ومنتجات حرفية وزواج وعائلة"]]
    },
    mechanics: {
      en: ["Energy and a clock limit each day — you must choose", "Seasonal crops: planning ahead pays off", "Friendship hearts unlock events with each villager", "Skills (farming, mining, fishing…) level up as you use them", "No fail state: you can never lose"],
      ar: ["الطاقة والساعة تحدّان كل يوم — عليك أن تختار", "محاصيل موسمية: التخطيط المسبق يؤتي ثماره", "قلوب الصداقة تفتح أحداثًا مع كل شخصية", "المهارات (الزراعة، التعدين، الصيد…) تتطور بالاستخدام", "لا توجد خسارة: لا يمكنك أن تخسر أبدًا"]
    },
    audience: { en: "Relaxed players of all ages who like routine, collecting and characters.", ar: "اللاعبون الهادئون من كل الأعمار ممن يحبون الروتين والجمع والشخصيات." },
    lessons: {
      en: ["Daily limits turn simple actions into meaningful choices.", "\"Cozy\" games still need goals: bundles give direction.", "One person can ship a hit with focus and a clear vision."],
      ar: ["الحدود اليومية تحوّل الأفعال البسيطة إلى قرارات ذات معنى.", "الألعاب «المريحة» تحتاج أهدافًا أيضًا: الحِزَم تعطي اتجاهًا.", "شخص واحد يمكنه إطلاق لعبة ناجحة بالتركيز ورؤية واضحة."]
    }
  },
  {
    id: "candy-crush", verbs: ["match", "solve", "collect"], img: "8d2272b72b5edf0309b308c9211f0036.jpg", color: "#e660a8",
    title: { en: "Candy Crush Saga", ar: "كاندي كراش ساغا" },
    year: 2012, studio: { en: "King", ar: "King" },
    genre: { en: "Match-3 puzzle · Casual mobile", ar: "ألغاز مطابقة ثلاثية · جوال كاجوال" }, genreKey: "puzzle",
    platforms: { en: "Mobile, Facebook, PC", ar: "الجوال، فيسبوك، الحاسوب" },
    pitch: { en: "Swap two candies. Make a line of three. Feel the cascade.", ar: "بدّل حلوتين. كوّن صفًّا من ثلاث. واستمتع بالتتابع." },
    scenario: {
      en: "The story is very light: you travel with Tiffi and Mr. Toffee through the Candy Kingdom, helping its characters with small problems at the end of each episode. The real \"story\" is the map itself — a long winding road of levels that shows how far you have come.",
      ar: "القصة خفيفة جدًا: تسافر مع «تيفي» و«مستر توفي» عبر مملكة الحلوى، وتساعد سكانها في مشكلات صغيرة في نهاية كل حلقة. «القصة» الحقيقية هي الخريطة نفسها — طريق طويل متعرّج من المراحل يُظهر كم تقدّمت."
    },
    loop: { en: ["Swap", "Match & cascade", "Meet the goal", "Next level"], ar: ["بدّل", "طابق وتتابع", "حقق الهدف", "المرحلة التالية"] },
    flowH: { en: "Saga map", ar: "خريطة الساغا" },
    flow: {
      en: [["Level", "A goal + a limited number of moves"], ["Stars", "1–3 stars depending on the score"], ["Episode", "About 15 levels with a new obstacle"], ["Lives", "5 lives; fail costs one, they refill over time"], ["Boosters", "Help on hard levels (earned or bought)"]],
      ar: [["المرحلة", "هدف + عدد محدود من الحركات"], ["النجوم", "من 1 إلى 3 نجوم حسب النقاط"], ["الحلقة", "نحو 15 مرحلة مع عائق جديد"], ["الأرواح", "5 أرواح؛ الفشل يأخذ واحدة وتعود مع الوقت"], ["المعززات", "مساعدة في المراحل الصعبة (تُكسب أو تُشترى)"]]
    },
    mechanics: {
      en: ["Match 3; matches of 4 or 5 create special candies", "Combining two special candies makes huge effects", "Different goals: score, clear jelly, bring ingredients down", "Limited moves create the tension", "Lives system controls session length (free-to-play)"],
      ar: ["طابق 3؛ مطابقة 4 أو 5 تصنع حلوى خاصة", "دمج حلوتين خاصتين يصنع تأثيرًا ضخمًا", "أهداف مختلفة: نقاط، إزالة الجيلي، إنزال المكوّنات", "الحركات المحدودة تصنع التوتر", "نظام الأرواح يتحكم في طول الجلسة (لعب مجاني)"]
    },
    audience: { en: "Casual players of every age, often in short sessions of a few minutes.", ar: "اللاعبون العاديون من كل الأعمار، غالبًا في جلسات قصيرة لبضع دقائق." },
    lessons: {
      en: ["Juicy feedback (sound, particles, cascades) makes a simple action feel great.", "A visible map turns progress into a reward.", "Introduce one new obstacle per episode to keep it fresh."],
      ar: ["ردود الفعل الغنية (صوت وجزيئات وتتابع) تجعل الفعل البسيط ممتعًا.", "الخريطة المرئية تحوّل التقدّم إلى مكافأة.", "قدّم عائقًا جديدًا واحدًا في كل حلقة لتبقى اللعبة متجددة."]
    }
  },
  {
    id: "clash-royale", verbs: ["fight", "collect", "upgrade"], img: "df9a9615d48fa95c249a3b296a4b8220.jpg", color: "#4a8fe0",
    title: { en: "Clash Royale", ar: "كلاش رويال" },
    year: 2016, studio: { en: "Supercell", ar: "سوبرسيل" },
    genre: { en: "Real-time strategy · Card battler", ar: "استراتيجية لحظية · معارك بطاقات" }, genreKey: "strategy",
    platforms: { en: "Mobile", ar: "الجوال" },
    pitch: { en: "Three minutes. Two lanes. Eight cards. Take their towers.", ar: "ثلاث دقائق. ممرّان. ثماني بطاقات. اهدم أبراجهم." },
    scenario: {
      en: "There is no campaign story. It is set in the \"Clash\" universe of kings, knights, goblins and wizards, and each match is a duel between two players. The progress story is the climb: win trophies, unlock new arenas, and collect stronger cards.",
      ar: "لا توجد قصة حملة. تدور في عالم «كلاش» من الملوك والفرسان والعفاريت والسحرة، وكل مباراة مبارزة بين لاعبَين. قصة التقدّم هي الصعود: اربح الكؤوس، وافتح ساحات جديدة، واجمع بطاقات أقوى."
    },
    loop: { en: ["Battle (3 min)", "Win rewards", "Upgrade cards", "Climb arenas"], ar: ["معركة (3 دقائق)", "اربح المكافآت", "طوّر البطاقات", "اصعد الساحات"] },
    flowH: { en: "Match layout", ar: "مخطط المباراة" },
    flow: {
      en: [["Deck", "Choose 8 cards before the match"], ["Arena", "2 lanes, a river, 3 towers per side"], ["Elixir", "Refills over time; each card has a cost"], ["Last minute", "Double elixir — the pace rises"], ["Overtime", "Tie? Next tower destroyed wins"], ["Result", "Crowns, trophies and rewards"]],
      ar: [["المجموعة", "اختر 8 بطاقات قبل المباراة"], ["الساحة", "ممرّان ونهر و3 أبراج لكل طرف"], ["الإكسير", "يمتلئ مع الوقت؛ لكل بطاقة تكلفة"], ["الدقيقة الأخيرة", "إكسير مضاعف — يرتفع الإيقاع"], ["الوقت الإضافي", "تعادل؟ أول برج يُهدم يحسم المباراة"], ["النتيجة", "تيجان وكؤوس ومكافآت"]]
    },
    mechanics: {
      en: ["Elixir economy: spend efficiently, punish wasteful opponents", "Rock-paper-scissors counters (air vs. ground, swarm vs. single)", "Only 4 cards in hand, rotating from the 8-card deck", "Short matches fit mobile play perfectly", "Trophy road and arenas as long-term goals"],
      ar: ["اقتصاد الإكسير: أنفق بكفاءة وعاقب الخصم المسرف", "مضادات كحجر-ورقة-مقص (جوي ضد أرضي، سرب ضد فرد)", "4 بطاقات فقط في اليد تدور من مجموعة الـ8", "المباريات القصيرة تناسب الجوال تمامًا", "طريق الكؤوس والساحات كأهداف طويلة المدى"]
    },
    audience: { en: "Competitive mobile players aged 10+ who like quick tactical duels.", ar: "لاعبو الجوال التنافسيون من عمر 10 فما فوق ممن يحبون المبارزات التكتيكية السريعة." },
    lessons: {
      en: ["Take a big genre (RTS) and shrink it to fit a phone session.", "A single resource (elixir) can carry all the strategy.", "Clear counters make every decision readable."],
      ar: ["خذ نوعًا كبيرًا (الاستراتيجية اللحظية) وصغّره ليناسب جلسة على الهاتف.", "مورد واحد (الإكسير) يمكنه أن يحمل الاستراتيجية كلها.", "المضادات الواضحة تجعل كل قرار مفهومًا."]
    }
  }
];
