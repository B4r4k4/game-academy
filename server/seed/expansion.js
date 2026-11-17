/* Content expansion v3 — six new modules and new lessons for existing modules, Arabic and English side by side.
   server/seed.js merges this into en.json / ar.js before seeding, and adds it once to databases seeded before it existed. */
export default {
  version: 3,

  /* Final course order (positions and numbers follow this list). */
  order: ["foundations", "prototyping", "gdd", "mechanics", "balancing", "levels", "narrative", "environment", "art", "audio", "ui", "progression", "ai", "arabic", "production"],

  modules: [
    /* ------------------------------------------------------------ */
    {
      slug: "prototyping", icon: "✂️", color: "#4fd1a5", cover: "/images/7b2fa29bbd6afeeb415c1689c2f146ad.jpg", lab: false,
      en: {
        title: "Prototyping: Find the Fun First",
        tagline: "Paper, cardboard and grey boxes before code and art.",
        takeaways: ["A prototype answers one question.", "Paper is the fastest engine there is.", "Three design pillars decide every argument."],
        lessons: [
          { title: "A prototype answers one question", body: `<p>A <strong>prototype</strong> is not a small version of your game. It is an experiment built to answer a single question: <em>Is jumping between moving platforms fun? Do players understand the card costs?</em></p>
<p>Write the question down before you build. When you have the answer, stop and throw the prototype away. Ugly is fine. Grey boxes, placeholder squares and stick figures are the right look at this stage, because nobody is tempted to polish them.</p>` },
          { title: "Paper prototyping", body: `<p>Cards, dice, coins and a sheet of paper can test most rules in an hour. A <strong>paper prototype</strong> lets you change a number with a pencil instead of a recompile.</p>
<ol><li>Write each rule on its own card so you can swap it out.</li>
<li>Play one round yourself, then watch a friend play without explaining anything.</li>
<li>Note where they hesitate, cheat or get bored. Those are your design problems.</li></ol>
<p>Even action games can be paper-tested: turn-based movement on a grid shows whether a level layout makes sense.</p>` },
          { title: "Design pillars", body: `<p><strong>Design pillars</strong> are three or four short phrases that describe the experience you promise, for example <em>"lonely exploration", "every fight is a puzzle", "the world remembers you"</em>.</p>
<p>When the team argues about a feature, ask: <em>which pillar does it serve?</em> If the answer is none, cut it, however cool it is. Pillars protect you from scope creep and keep a small team pulling in the same direction. Put them on the first page of your GDD.</p>` },
          { title: "Game jams: a whole game in 48 hours", body: `<p>A <strong>game jam</strong> is an event where you make a complete game around a theme in a fixed time, usually 48 or 72 hours. Popular online jams such as Global Game Jam, Ludum Dare and the many jams on itch.io are free to join.</p>
<ul><li>Jams force you to <strong>finish</strong>: menu, ending and upload included.</li>
<li>Pick the smallest idea that fits the theme, then cut it in half.</li>
<li>Spend the last quarter of the time on polish and the build, not new features.</li></ul>
<p>Ten finished jam games teach more than one unfinished dream project.</p>` }
        ]
      },
      ar: {
        title: "النموذج الأولي: ابحث عن المتعة أولًا",
        tagline: "الورق والكرتون والصناديق الرمادية قبل الشيفرة والرسوم.",
        takeaways: ["النموذج الأولي يجيب عن سؤال واحد.", "الورق أسرع محرّك ألعاب على الإطلاق.", "ثلاث ركائز تصميم تحسم كل خلاف."],
        lessons: [
          { title: "النموذج الأولي يجيب عن سؤال واحد", body: `<p><strong>النموذج الأولي</strong> ليس نسخة مصغّرة من لعبتك، بل تجربة تُبنى للإجابة عن سؤال واحد: <em>هل القفز بين المنصّات المتحركة ممتع؟ هل يفهم اللاعبون تكلفة البطاقات؟</em></p>
<p>اكتب السؤال قبل أن تبدأ البناء. وحين تحصل على الإجابة، توقّف وتخلّص من النموذج. لا بأس أن يكون قبيحًا؛ فالصناديق الرمادية والمربعات المؤقتة والرسوم البسيطة هي الشكل الصحيح في هذه المرحلة، لأن أحدًا لن يُغرى بتلميعها.</p>` },
          { title: "النموذج الورقي", body: `<p>البطاقات والنرد والقطع النقدية وورقة واحدة تكفي لاختبار معظم القواعد في ساعة. و<strong>النموذج الورقي</strong> يتيح لك تغيير رقم بقلم رصاص بدل إعادة بناء المشروع.</p>
<ol><li>اكتب كل قاعدة على بطاقة مستقلة لتستبدلها بسهولة.</li>
<li>العب جولة بنفسك، ثم راقب صديقًا يلعب دون أن تشرح له شيئًا.</li>
<li>سجّل أين يتردد أو يغشّ أو يملّ؛ فتلك هي مشكلات التصميم لديك.</li></ol>
<p>حتى ألعاب الحركة يمكن اختبارها على الورق: الحركة بالأدوار على شبكة تكشف هل تصميم المرحلة منطقي.</p>` },
          { title: "ركائز التصميم", body: `<p><strong>ركائز التصميم</strong> ثلاث أو أربع عبارات قصيرة تصف التجربة التي تعد بها اللاعب، مثل: <em>«استكشاف في عزلة»، «كل معركة لغز»، «العالم يتذكّرك»</em>.</p>
<p>حين يختلف الفريق حول ميزة، اسأل: <em>أي ركيزة تخدمها؟</em> فإن كانت الإجابة «لا شيء» فاحذفها مهما بدت رائعة. الركائز تحميك من تضخّم النطاق وتُبقي الفريق الصغير متّجهًا نحو هدف واحد. ضعها في الصفحة الأولى من وثيقة التصميم.</p>` },
          { title: "مسابقات تطوير الألعاب: لعبة كاملة في 48 ساعة", body: `<p><strong>مسابقة تطوير الألعاب (Game Jam)</strong> حدث تصنع فيه لعبة كاملة حول موضوع محدد في وقت محدد، غالبًا 48 أو 72 ساعة. والمسابقات الشهيرة عبر الإنترنت مثل Global Game Jam وLudum Dare والمسابقات الكثيرة على itch.io مجانية الاشتراك.</p>
<ul><li>المسابقة تجبرك على <strong>الإنهاء</strong>: القائمة والنهاية ورفع اللعبة كلها جزء من العمل.</li>
<li>اختر أصغر فكرة تناسب الموضوع، ثم اقسمها على اثنين.</li>
<li>خصّص الربع الأخير من الوقت للتلميع والنشر، لا لميزات جديدة.</li></ul>
<p>عشر ألعاب مكتملة من المسابقات تعلّمك أكثر من مشروع حلم واحد لم يكتمل.</p>` }
        ]
      }
    },

    /* ------------------------------------------------------------ */
    {
      slug: "balancing", icon: "⚖️", color: "#e8c547", cover: "/images/df9a9615d48fa95c249a3b296a4b8220.jpg", lab: false,
      en: {
        title: "Balance, Numbers & Game Economy",
        tagline: "Spreadsheets, difficulty curves, sources and sinks.",
        takeaways: ["Put every number in one spreadsheet.", "Difficulty rises in waves, not a straight line.", "Every source of currency needs a sink."],
        lessons: [
          { title: "Balance lives in a spreadsheet", body: `<p>Health, damage, prices and XP should never be scattered through code. Keep them in one <strong>spreadsheet</strong> (or a data file the game reads) so you can see the whole system at once.</p>
<p>Useful columns: cost, power, <em>power per cost</em> and time to kill. If one sword deals twice the damage per coin of every other sword, the sheet shows it before players do. Change one value at a time and playtest after each change, or you will not know which change fixed the problem.</p>` },
          { title: "Difficulty curves and flow", body: `<p>Psychologist Mihaly Csikszentmihalyi described <strong>flow</strong>: deep focus that happens when the challenge sits just above the player's skill. Too hard means anxiety; too easy means boredom.</p>
<p>A good difficulty curve is a <strong>saw-tooth</strong>, not a straight ramp: tension rises to a peak (a boss), drops for a breather, then climbs again slightly higher. Dynamic difficulty, such as giving a little more health after repeated deaths, can help, but players dislike it when they notice it.</p>` },
          { title: "Sources and sinks", body: `<p>Every game economy has <strong>sources</strong> (where gold, wood or gems come from: quests, enemies, daily rewards) and <strong>sinks</strong> (where they go: upgrades, repairs, consumables, cosmetics).</p>
<p>If sources outgrow sinks, prices stop mattering and you get <strong>inflation</strong>: players hoard millions and nothing is exciting to buy. If sinks outgrow sources, the game feels stingy. Track total currency earned and spent per hour of play and keep the two close.</p>` },
          { title: "Dominant strategies", body: `<p>A <strong>dominant strategy</strong> is one option that is always best. Once players find it, every other choice in your game stops being a decision.</p>
<ul><li><strong>Rock–paper–scissors</strong> relationships make each option strong against something and weak against something else.</li>
<li><strong>Trade-offs</strong>: fast but fragile, strong but slow, cheap but short-lived.</li>
<li><strong>Situational value</strong>: fire is great in the forest and useless in the lake level.</li></ul>
<p>Watch what testers pick. If everyone picks the same thing, it is too strong or the others are too weak.</p>` }
        ]
      },
      ar: {
        title: "التوازن والأرقام واقتصاد اللعبة",
        tagline: "جداول البيانات ومنحنيات الصعوبة ومصادر الموارد ومصارفها.",
        takeaways: ["ضع كل الأرقام في جدول بيانات واحد.", "الصعوبة ترتفع على شكل موجات لا خطٍّ مستقيم.", "كل مصدر للعملة يحتاج إلى مصرف."],
        lessons: [
          { title: "التوازن يسكن في جدول بيانات", body: `<p>لا ينبغي أن تتبعثر نقاط الصحة والضرر والأسعار ونقاط الخبرة في الشيفرة. اجمعها في <strong>جدول بيانات</strong> واحد (أو ملف بيانات تقرؤه اللعبة) لترى النظام كاملًا دفعة واحدة.</p>
<p>أعمدة مفيدة: التكلفة، والقوة، و<em>القوة مقابل التكلفة</em>، والوقت اللازم لهزيمة العدو. فإن كان سيف واحد يُحدث ضعف الضرر لكل قطعة نقدية مقارنة ببقية السيوف، كشفه الجدول قبل أن يكتشفه اللاعبون. غيّر قيمة واحدة في كل مرة واختبر بعد كل تغيير، وإلا فلن تعرف أي تغيير حلّ المشكلة.</p>` },
          { title: "منحنيات الصعوبة وحالة التدفّق", body: `<p>وصف عالم النفس ميهاي تشيكسنتميهاي حالة <strong>التدفّق (Flow)</strong>: تركيز عميق يحدث حين يكون التحدي أعلى قليلًا من مهارة اللاعب. الصعوبة الزائدة تولّد القلق، والسهولة الزائدة تولّد الملل.</p>
<p>منحنى الصعوبة الجيد يشبه <strong>أسنان المنشار</strong> لا المنحدر المستقيم: يرتفع التوتر حتى ذروة (زعيم)، ثم ينخفض لالتقاط الأنفاس، ثم يصعد من جديد أعلى قليلًا. الصعوبة الديناميكية، كمنح صحة إضافية بعد تكرار الخسارة، قد تساعد، لكن اللاعبين يكرهونها إن لاحظوها.</p>` },
          { title: "المصادر والمصارف", body: `<p>لكل اقتصاد في لعبة <strong>مصادر</strong> (من أين يأتي الذهب أو الخشب أو الجواهر: المهام، والأعداء، والمكافآت اليومية) و<strong>مصارف</strong> (أين تذهب: الترقيات، والإصلاحات، والمواد المستهلكة، والأزياء).</p>
<p>إذا تجاوزت المصادرُ المصارفَ فقدت الأسعار قيمتها وظهر <strong>التضخّم</strong>: يكدّس اللاعبون الملايين ولا يجدون شيئًا مثيرًا للشراء. وإذا تجاوزت المصارفُ المصادرَ بدت اللعبة بخيلة. تتبّع مجموع العملة المكتسبة والمنفقة في كل ساعة لعب وأبقِ الرقمين متقاربين.</p>` },
          { title: "الاستراتيجيات المهيمنة", body: `<p><strong>الاستراتيجية المهيمنة</strong> خيار واحد هو الأفضل دائمًا. وحين يكتشفه اللاعبون تفقد بقية الخيارات في لعبتك صفة القرار.</p>
<ul><li>علاقات <strong>حجر–ورقة–مقص</strong> تجعل كل خيار قويًّا أمام شيء وضعيفًا أمام آخر.</li>
<li><strong>المقايضات</strong>: سريع لكنه هشّ، قوي لكنه بطيء، رخيص لكنه قصير العمر.</li>
<li><strong>القيمة الظرفية</strong>: النار رائعة في الغابة وبلا فائدة في مرحلة البحيرة.</li></ul>
<p>راقب ما يختاره المختبِرون. إن اختار الجميع الشيء نفسه، فهو قوي أكثر من اللازم أو أن البقية ضعيفة.</p>` }
        ]
      }
    },

    /* ------------------------------------------------------------ */
    {
      slug: "narrative", icon: "📖", color: "#d98ba0", cover: "/images/7ccdb6d2e558d99a83a8eb931710a429.jpg", lab: false,
      en: {
        title: "Narrative Design: Story Through Play",
        tagline: "Stories the player performs, not just watches.",
        takeaways: ["What the player does is the story.", "Combine embedded, environmental and emergent story.", "A choice matters only if it has a visible cost."],
        lessons: [
          { title: "The player's actions are the story", body: `<p>Film tells a story with pictures; games tell it with <strong>actions</strong>. If a cutscene says the hero is merciful but the gameplay rewards killing everyone, the two fight each other. Critic Clint Hocking called this <strong>ludonarrative dissonance</strong>.</p>
<p>Ask: <em>what does the player do most of the time, and what does that say about their character?</em> Design mechanics that carry your theme. A game about protecting someone should make the player physically protect them.</p>` },
          { title: "Three kinds of story", body: `<ul><li><strong>Embedded narrative</strong> — the authored plot: dialogue, cutscenes, quests.</li>
<li><strong>Environmental narrative</strong> — the story told by places and objects: a barricaded door, a child's drawing, an abandoned meal.</li>
<li><strong>Emergent narrative</strong> — stories that come out of the systems: the time your last soldier survived with one hit point.</li></ul>
<p>Small teams should lean on environmental and emergent story. They cost far less than cutscenes and players remember them as <em>their</em> stories.</p>` },
          { title: "Choices that matter", body: `<p>A branching story grows fast: three choices with three options each already make 27 endings. Writers control this with <strong>branch-and-bottleneck</strong> structures, where branches return to shared key scenes, and with remembered <strong>state</strong> (who you helped, who you betrayed) that changes lines and details instead of whole chapters.</p>
<p>A choice feels meaningful when it has a clear <strong>cost</strong> and the game reflects it back later, even in one line of dialogue.</p>` },
          { title: "Writing for games", body: `<p>Players skip walls of text. Game writing is short and works in pieces:</p>
<ul><li><strong>Barks</strong> — short lines characters shout during play ("Reloading!", "Over there!"). They give feedback and personality at once.</li>
<li><strong>Item descriptions</strong> — one or two lines that hint at the world's history.</li>
<li><strong>Show, don't tell</strong> — cut any line the level or animation already explains.</li></ul>
<p>Read every line aloud. If it is hard to say, it is hard to read in a hurry.</p>` }
        ]
      },
      ar: {
        title: "تصميم السرد: القصة عبر اللعب",
        tagline: "قصص يؤدّيها اللاعب، لا يكتفي بمشاهدتها.",
        takeaways: ["ما يفعله اللاعب هو القصة.", "امزج السرد المضمَّن والبيئي والناشئ.", "الخيار له معنى فقط إن كانت له كلفة مرئية."],
        lessons: [
          { title: "أفعال اللاعب هي القصة", body: `<p>السينما تروي القصة بالصورة، والألعاب ترويها <strong>بالأفعال</strong>. فإذا قال المشهد السينمائي إن البطل رحيم بينما تكافئ طريقة اللعب قتل الجميع، تصارع الطرفان. سمّى الناقد كلينت هوكينغ هذا <strong>التنافر السردي-اللعبي (Ludonarrative Dissonance)</strong>.</p>
<p>اسأل: <em>ماذا يفعل اللاعب معظم الوقت، وماذا يقول ذلك عن شخصيته؟</em> صمّم آليات تحمل فكرتك. فاللعبة التي تدور حول حماية شخص ما يجب أن تجعل اللاعب يحميه فعلًا.</p>` },
          { title: "ثلاثة أنواع من القصص", body: `<ul><li><strong>السرد المضمَّن</strong> — الحبكة المكتوبة: الحوار والمشاهد السينمائية والمهام.</li>
<li><strong>السرد البيئي</strong> — القصة التي ترويها الأماكن والأشياء: باب مُحصَّن، رسمة طفل، وجبة متروكة.</li>
<li><strong>السرد الناشئ</strong> — قصص تولد من الأنظمة: المرة التي نجا فيها آخر جنودك بنقطة صحة واحدة.</li></ul>
<p>على الفرق الصغيرة أن تعتمد على السرد البيئي والناشئ؛ فهما أقل كلفة بكثير من المشاهد السينمائية، ويتذكّرهما اللاعبون على أنهما قصتهم <em>هم</em>.</p>` },
          { title: "خيارات لها وزن", body: `<p>القصة المتفرّعة تتضخّم بسرعة: ثلاثة خيارات بثلاثة احتمالات لكلٍّ منها تصنع 27 نهاية. يتحكّم الكتّاب في ذلك ببنية <strong>التفرّع والاختناق</strong>، حيث تعود الفروع إلى مشاهد رئيسية مشتركة، وبـ<strong>حالة</strong> تتذكّرها اللعبة (من ساعدت ومن خنت) فتغيّر جملًا وتفاصيل بدل فصول كاملة.</p>
<p>يشعر اللاعب بأن الخيار ذو معنى حين تكون له <strong>كلفة</strong> واضحة وتعكسه اللعبة لاحقًا، ولو بجملة حوار واحدة.</p>` },
          { title: "الكتابة للألعاب", body: `<p>اللاعبون يتخطّون جدران النصوص. الكتابة للألعاب قصيرة وتعمل على شكل قطع:</p>
<ul><li><strong>الصيحات (Barks)</strong> — جمل قصيرة تقولها الشخصيات أثناء اللعب («أعيد التلقيم!»، «هناك!»). تمنح التغذية الراجعة والشخصية معًا.</li>
<li><strong>أوصاف العناصر</strong> — سطر أو سطران يلمّحان إلى تاريخ العالم.</li>
<li><strong>أرِ ولا تخبر</strong> — احذف أي جملة تشرحها المرحلة أو الحركة مسبقًا.</li></ul>
<p>اقرأ كل جملة بصوت عالٍ. إن صعب نطقها، صعبت قراءتها على العجل.</p>` }
        ]
      }
    },

    /* ------------------------------------------------------------ */
    {
      slug: "audio", icon: "🔊", color: "#6ec6ff", cover: "/images/ad47519e8a1ee6d5c4001c0450eb4562.jpg", lab: false,
      en: {
        title: "Sound & Music",
        tagline: "Half of what the player feels, they hear.",
        takeaways: ["Every action needs a sound.", "Game audio has five layers.", "Music should react to play."],
        lessons: [
          { title: "Sound is half the feel", body: `<p>Mute a great action game and it suddenly feels weak. Sound confirms that an action happened, tells the player <em>how well</em> it happened and warns them of danger they cannot see.</p>
<p>Rule of thumb: <strong>every player action gets a sound</strong>, and important events get a sound that is clearly different from everything else. A critical hit should not sound like a normal hit. Add small random changes in pitch (±5–10%) so repeated sounds do not become tiring.</p>` },
          { title: "The five layers of game audio", body: `<ol><li><strong>Music</strong> — sets the emotion and pace.</li>
<li><strong>Sound effects (SFX)</strong> — footsteps, hits, pickups, explosions.</li>
<li><strong>Ambience</strong> — wind, birds, distant traffic: makes a place feel alive.</li>
<li><strong>UI sounds</strong> — clicks, confirms, errors. Keep them short and quiet.</li>
<li><strong>Voice</strong> — dialogue and barks.</li></ol>
<p>Mix them so the <strong>gameplay-critical</strong> sounds (an enemy attack wind-up, low health) always cut through the music.</p>` },
          { title: "Adaptive music", body: `<p><strong>Adaptive music</strong> changes with what is happening in the game. Two common techniques:</p>
<ul><li><strong>Vertical layering</strong> — the track is split into layers (drums, strings, melody) that fade in as tension rises.</li>
<li><strong>Horizontal re-sequencing</strong> — the game jumps between sections (explore, combat, victory) at musical bar lines so the cut sounds natural.</li></ul>
<p>Even a simple version, such as adding a drum layer when enemies notice you, makes the world feel like it is reacting to the player.</p>` },
          { title: "Making and finding sounds", body: `<ul><li><strong>Retro effects</strong>: tools such as jsfxr or Bfxr generate jump, coin and laser sounds in seconds.</li>
<li><strong>Recording</strong>: your phone plus everyday objects gives you great foley. Celery snaps make convincing bone breaks.</li>
<li><strong>Editing</strong>: Audacity (free) for trimming, fades and noise removal.</li>
<li><strong>Libraries</strong>: freesound.org and other free libraries. Always check the <strong>licence</strong> (CC0, CC-BY needs credit) and keep a credits file.</li></ul>` }
        ]
      },
      ar: {
        title: "الصوت والموسيقى",
        tagline: "نصف ما يشعر به اللاعب يسمعه.",
        takeaways: ["كل فعل يحتاج إلى صوت.", "لصوت الألعاب خمس طبقات.", "الموسيقى يجب أن تتفاعل مع اللعب."],
        lessons: [
          { title: "الصوت نصف الإحساس", body: `<p>اكتم صوت لعبة حركة رائعة، وستشعر فجأة بأنها ضعيفة. الصوت يؤكّد أن الفعل حدث، ويخبر اللاعب <em>بمدى جودته</em>، ويحذّره من خطر لا يراه.</p>
<p>القاعدة العملية: <strong>كل فعل يقوم به اللاعب له صوت</strong>، والأحداث المهمة لها صوت مختلف بوضوح عن كل ما سواه. الضربة الحاسمة لا ينبغي أن تبدو كالضربة العادية. وأضف تغييرات عشوائية صغيرة في طبقة الصوت (±5–10%) حتى لا تصبح الأصوات المتكررة مُتعِبة.</p>` },
          { title: "الطبقات الخمس لصوت الألعاب", body: `<ol><li><strong>الموسيقى</strong> — تحدّد العاطفة والإيقاع.</li>
<li><strong>المؤثرات الصوتية (SFX)</strong> — الخطوات والضربات والالتقاط والانفجارات.</li>
<li><strong>الأجواء</strong> — الريح والطيور وضجيج بعيد: تجعل المكان حيًّا.</li>
<li><strong>أصوات الواجهة</strong> — النقر والتأكيد والخطأ. اجعلها قصيرة وهادئة.</li>
<li><strong>الصوت البشري</strong> — الحوار والصيحات.</li></ol>
<p>امزجها بحيث تخترق الأصوات <strong>الحاسمة للعب</strong> (تحضير العدو لهجومه، انخفاض الصحة) الموسيقى دائمًا.</p>` },
          { title: "الموسيقى التكيّفية", body: `<p><strong>الموسيقى التكيّفية</strong> تتغيّر بحسب ما يجري في اللعبة. أشهر أسلوبين:</p>
<ul><li><strong>الطبقات الرأسية</strong> — يُقسَّم المقطع إلى طبقات (طبول، وتريات، لحن) تظهر تدريجيًا كلما ارتفع التوتر.</li>
<li><strong>إعادة الترتيب الأفقي</strong> — تنتقل اللعبة بين مقاطع (استكشاف، قتال، نصر) عند نهايات المازورة الموسيقية فيبدو الانتقال طبيعيًا.</li></ul>
<p>حتى النسخة البسيطة، كإضافة طبقة طبول حين ينتبه الأعداء إليك، تجعل العالم يبدو وكأنه يستجيب للاعب.</p>` },
          { title: "صناعة الأصوات والعثور عليها", body: `<ul><li><strong>مؤثرات كلاسيكية</strong>: أدوات مثل jsfxr وBfxr تولّد أصوات القفز والعملات والليزر في ثوانٍ.</li>
<li><strong>التسجيل</strong>: هاتفك مع أدوات يومية يمنحك مؤثرات رائعة (Foley). كسر عود الكرفس يشبه صوت كسر العظام بشكل مقنع.</li>
<li><strong>التحرير</strong>: برنامج Audacity المجاني للقص والتلاشي وإزالة الضجيج.</li>
<li><strong>المكتبات</strong>: موقع freesound.org ومكتبات مجانية أخرى. تحقّق دائمًا من <strong>الترخيص</strong> (CC0 حرّ، وCC-BY يشترط ذكر المؤلف) واحتفظ بملف للاعتمادات.</li></ul>` }
        ]
      }
    },

    /* ------------------------------------------------------------ */
    {
      slug: "ai", icon: "🤖", color: "#a78bfa", cover: "/images/d891091ff8cea4d867f3d2ef66a32b1f.jpg", lab: false,
      en: {
        title: "AI as Your Co-Developer",
        tagline: "Use AI to build faster without giving away your design.",
        takeaways: ["You design; AI drafts.", "A good brief beats a long chat.", "Test everything AI builds, and disclose it."],
        lessons: [
          { title: "Partner, not replacement", body: `<p>AI tools can write code, draft dialogue and suggest ideas in seconds. They cannot decide what your game is <em>for</em>. That is still the designer's job: the pillars, the core loop, the feel.</p>
<p>Use AI where speed matters and taste matters less: boilerplate code, placeholder text, brainstorming twenty names to pick one. Keep the <strong>decisions</strong> for yourself. A game where AI made every choice usually feels like an average of every other game.</p>` },
          { title: "Writing a build brief", body: `<p>The best results come from a clear <strong>brief</strong>, not a long back-and-forth. Include:</p>
<ol><li><strong>Goal</strong> — "a single index.html that runs offline in a browser".</li>
<li><strong>Core loop</strong> and controls, in short numbered steps.</li>
<li><strong>Numbers</strong> — speeds, health, timings, from your balance sheet.</li>
<li><strong>Assets</strong> — file names and sizes it must use.</li>
<li><strong>Done when</strong> — a checklist the build must pass.</li></ol>
<p>The project pack in the <a href="#/studio">Design Studio</a> exports a brief like this (BUILD-PROMPT.md) from your design.</p>` },
          { title: "Test and iterate", body: `<p>AI-written code often looks right and still has bugs. Treat it as a first draft:</p>
<ul><li>Play it immediately. Check every item on your <strong>done when</strong> list.</li>
<li>Report one problem at a time, with exact steps: "press jump while touching a wall → the player sticks".</li>
<li>Keep working versions. If a change breaks things, go back instead of piling fixes on top.</li></ul>
<p>Learn enough code to read what you were given. You cannot fix what you cannot read.</p>` },
          { title: "Ethics, licences and disclosure", body: `<ul><li><strong>Ownership</strong> — check each tool's terms for who owns the output and whether commercial use is allowed.</li>
<li><strong>Style copying</strong> — never prompt for a living artist's style or a specific game's characters. Describe the qualities you want instead.</li>
<li><strong>Disclosure</strong> — some stores, Steam included, ask developers to declare AI-generated content. Be honest with players too.</li>
<li><strong>Privacy</strong> — do not paste private player data into AI tools.</li></ul>` }
        ]
      },
      ar: {
        title: "الذكاء الاصطناعي شريكك في التطوير",
        tagline: "استخدم الذكاء الاصطناعي لتبني أسرع دون أن تتنازل عن تصميمك.",
        takeaways: ["أنت تصمّم، والذكاء الاصطناعي يصوغ المسودة.", "موجّه واضح أفضل من محادثة طويلة.", "اختبر كل ما يبنيه الذكاء الاصطناعي، وأفصح عنه."],
        lessons: [
          { title: "شريك لا بديل", body: `<p>أدوات الذكاء الاصطناعي تكتب الشيفرة وتصوغ الحوار وتقترح الأفكار في ثوانٍ، لكنها لا تستطيع أن تقرّر <em>غاية</em> لعبتك. هذا ما زال عمل المصمّم: الركائز والحلقة الأساسية والإحساس.</p>
<p>استخدم الذكاء الاصطناعي حيث تهمّ السرعة أكثر من الذوق: الشيفرة المتكررة، والنصوص المؤقتة، وتوليد عشرين اسمًا لتختار واحدًا. واحتفظ <strong>بالقرارات</strong> لنفسك. اللعبة التي اتخذ الذكاء الاصطناعي كل قراراتها تبدو غالبًا كمتوسّط حسابي لكل الألعاب الأخرى.</p>` },
          { title: "كتابة موجّه البناء", body: `<p>أفضل النتائج تأتي من <strong>موجّه</strong> واضح، لا من أخذ وردّ طويل. ضمِّنه:</p>
<ol><li><strong>الهدف</strong> — «ملف index.html واحد يعمل في المتصفح دون إنترنت».</li>
<li><strong>الحلقة الأساسية</strong> والتحكّم، في خطوات مرقّمة قصيرة.</li>
<li><strong>الأرقام</strong> — السرعات والصحة والتوقيتات، من جدول التوازن لديك.</li>
<li><strong>الأصول</strong> — أسماء الملفات وأحجامها التي يجب استخدامها.</li>
<li><strong>معيار الإنجاز</strong> — قائمة تحقّق يجب أن تجتازها النسخة.</li></ol>
<p>حزمة المشروع في <a href="#/studio">استوديو التصميم</a> تصدّر موجّهًا كهذا (BUILD-PROMPT.md) من تصميمك.</p>` },
          { title: "اختبر وكرّر", body: `<p>الشيفرة التي يكتبها الذكاء الاصطناعي تبدو صحيحة كثيرًا وفيها أخطاء مع ذلك. عاملها كمسودة أولى:</p>
<ul><li>العبها فورًا، وتحقّق من كل بند في <strong>معيار الإنجاز</strong>.</li>
<li>أبلغ عن مشكلة واحدة في كل مرة، مع خطوات دقيقة: «أضغط القفز وأنا ألمس الجدار ← تلتصق الشخصية».</li>
<li>احتفظ بالنسخ العاملة. إن أفسد تغيير ما شيئًا، فارجع بدل تكديس الإصلاحات فوقه.</li></ul>
<p>تعلّم من البرمجة ما يكفي لتقرأ ما أُعطيت. لا يمكنك إصلاح ما لا تستطيع قراءته.</p>` },
          { title: "الأخلاقيات والتراخيص والإفصاح", body: `<ul><li><strong>الملكية</strong> — راجع شروط كل أداة: من يملك الناتج، وهل الاستخدام التجاري مسموح؟</li>
<li><strong>نسخ الأساليب</strong> — لا تطلب أسلوب فنان حيّ ولا شخصيات لعبة بعينها. صِف الصفات التي تريدها بدلًا من ذلك.</li>
<li><strong>الإفصاح</strong> — بعض المتاجر، ومنها Steam، تطلب من المطوّرين التصريح بالمحتوى المولَّد بالذكاء الاصطناعي. وكن صادقًا مع اللاعبين أيضًا.</li>
<li><strong>الخصوصية</strong> — لا تلصق بيانات اللاعبين الخاصة في أدوات الذكاء الاصطناعي.</li></ul>` }
        ]
      }
    },

    /* ------------------------------------------------------------ */
    {
      slug: "arabic", icon: "🌙", color: "#f0a35e", cover: "/images/9c591068f21ce6e5f57fea2ce375c7ea.jpg", lab: false,
      en: {
        title: "Games in Arabic: Language, Heritage & Market",
        tagline: "Right-to-left text, culture and the region's players.",
        takeaways: ["Arabic text needs shaping and RTL support.", "Localization is culture, not just translation.", "Heritage is a source, clichés are a trap."],
        lessons: [
          { title: "Arabic text in game engines", body: `<p>Arabic letters change shape depending on their position in a word, and lines run <strong>right to left</strong>. An engine that cannot do <strong>text shaping</strong> shows separate, reversed letters.</p>
<ul><li>Godot 4 handles Arabic shaping and bidirectional text out of the box.</li>
<li>Unity's TextMeshPro needs a community plugin such as RTLTMPro.</li>
<li>Choose a font with full Arabic coverage (for example Noto Sans Arabic, Cairo or Tajawal) and test it at small sizes.</li></ul>
<p>Test mixed lines like "اضغط Space للقفز": the English word must stay in the right place.</p>` },
          { title: "Localization is more than translation", body: `<ul><li><strong>Mirror the UI</strong> — back buttons, progress bars and menus usually flip for right-to-left players.</li>
<li><strong>Leave room</strong> — Arabic text can be longer or taller than English. Avoid fixed-width boxes.</li>
<li><strong>Register</strong> — Modern Standard Arabic reaches every country; a local dialect adds warmth but narrows the audience.</li>
<li><strong>Numbers and dates</strong> — decide on Western (123) or Arabic-Indic (١٢٣) digits and use them consistently.</li>
<li><strong>Culture</strong> — review symbols, gestures, clothing and humour with native players before launch.</li></ul>` },
          { title: "Heritage as inspiration", body: `<p>The region offers rich sources: <strong>Alf Layla wa Layla</strong> (One Thousand and One Nights), desert and sea trade routes, Andalusian gardens, Nabataean cities carved in rock, folk tales of the jinn and the ghoul, and the patterns of Islamic geometry.</p>
<p>Avoid the <strong>orientalist cliché</strong> of endless sand, flying carpets and villains in turbans. Research real places, talk to people who live there and give characters their own goals. Authentic detail is what makes a setting feel fresh to the rest of the world.</p>` },
          { title: "The Arabic-speaking games market", body: `<ul><li><strong>Mobile first</strong> — most players in the region play on phones, so design for touch and modest devices.</li>
<li><strong>The Gulf</strong> — Saudi Arabia and the UAE are among the highest-spending markets in the region, and Saudi Arabia is investing heavily in games and esports.</li>
<li><strong>Seasons</strong> — evenings during Ramadan and the Eid holidays are peak play times. Plan events around them.</li>
<li><strong>Arabic content</strong> — fully Arabic games remain rare, which is an opportunity for local studios.</li></ul>
<p>Look up current market reports before you make business decisions; the numbers change every year.</p>` }
        ]
      },
      ar: {
        title: "الألعاب بالعربية: اللغة والتراث والسوق",
        tagline: "النص من اليمين إلى اليسار، والثقافة، ولاعبو المنطقة.",
        takeaways: ["النص العربي يحتاج إلى تشكيل الحروف ودعم الاتجاه من اليمين إلى اليسار.", "التعريب ثقافة لا ترجمة فقط.", "التراث مصدر إلهام، والصور النمطية فخّ."],
        lessons: [
          { title: "النص العربي في محرّكات الألعاب", body: `<p>تتغيّر أشكال الحروف العربية بحسب موقعها في الكلمة، وتُكتب الأسطر <strong>من اليمين إلى اليسار</strong>. والمحرّك الذي لا يدعم <strong>تشكيل النص (Text Shaping)</strong> يعرض حروفًا منفصلة ومعكوسة.</p>
<ul><li>محرّك Godot 4 يدعم تشكيل العربية والنص ثنائي الاتجاه مباشرة.</li>
<li>أداة TextMeshPro في Unity تحتاج إلى إضافة مجتمعية مثل RTLTMPro.</li>
<li>اختر خطًّا يغطّي العربية كاملة (مثل Noto Sans Arabic أو Cairo أو Tajawal) واختبره بالأحجام الصغيرة.</li></ul>
<p>اختبر الأسطر المختلطة مثل «اضغط Space للقفز»: يجب أن تبقى الكلمة الإنجليزية في مكانها الصحيح.</p>` },
          { title: "التعريب أكثر من ترجمة", body: `<ul><li><strong>اعكس الواجهة</strong> — أزرار الرجوع وأشرطة التقدّم والقوائم تنقلب عادةً للاعب الذي يقرأ من اليمين.</li>
<li><strong>اترك مساحة</strong> — قد يكون النص العربي أطول أو أعلى من الإنجليزي. تجنّب الصناديق ذات العرض الثابت.</li>
<li><strong>مستوى اللغة</strong> — الفصحى تصل إلى كل البلدان، واللهجة المحلية تضيف دفئًا لكنها تضيّق الجمهور.</li>
<li><strong>الأرقام والتواريخ</strong> — اختر الأرقام الغربية (123) أو الهندية (١٢٣) والتزم بها في كل مكان.</li>
<li><strong>الثقافة</strong> — راجع الرموز والإيماءات والملابس والفكاهة مع لاعبين من أهل اللغة قبل الإطلاق.</li></ul>` },
          { title: "التراث مصدرًا للإلهام", body: `<p>تقدّم المنطقة مصادر غنية: <strong>ألف ليلة وليلة</strong>، وطرق التجارة في الصحراء والبحر، وحدائق الأندلس، ومدن الأنباط المنحوتة في الصخر، وحكايات الجن والغول الشعبية، وأنماط الهندسة الإسلامية.</p>
<p>تجنّب <strong>الصورة الاستشراقية النمطية</strong>: رمال لا تنتهي وبُسط طائرة وأشرار بالعمائم. ابحث في أماكن حقيقية، وتحدّث مع من يعيشون فيها، وامنح الشخصيات أهدافها الخاصة. التفاصيل الأصيلة هي ما يجعل العالم يبدو جديدًا لبقية العالم.</p>` },
          { title: "سوق الألعاب الناطق بالعربية", body: `<ul><li><strong>الهاتف أولًا</strong> — معظم اللاعبين في المنطقة يلعبون على الهواتف، فصمّم للّمس وللأجهزة المتوسطة.</li>
<li><strong>الخليج</strong> — السعودية والإمارات من أعلى أسواق المنطقة إنفاقًا، والسعودية تستثمر بقوة في الألعاب والرياضات الإلكترونية.</li>
<li><strong>المواسم</strong> — ليالي رمضان وإجازات العيد أوقات ذروة للعب. خطّط للفعاليات حولها.</li>
<li><strong>المحتوى العربي</strong> — الألعاب العربية بالكامل ما زالت نادرة، وهذه فرصة للاستوديوهات المحلية.</li></ul>
<p>راجع تقارير السوق الحديثة قبل اتخاذ قرارات تجارية؛ فالأرقام تتغيّر كل عام.</p>` }
        ]
      }
    }
  ],

  /* New lessons appended to the end of existing modules. */
  lessons: {
    foundations: [
      {
        en: { title: "Deconstruct games without copying them", body: `<p>Playing as a designer is a skill. Pick a game you love and take notes:</p>
<ol><li>What is the <strong>core loop</strong>? Write it as a cycle of verbs.</li>
<li>What <strong>decisions</strong> does the player make every minute?</li>
<li>How does the game <strong>teach</strong> its first mechanic?</li>
<li>What keeps you playing: <strong>goals, rewards or curiosity</strong>?</li></ol>
<p>Then take the <em>principle</em>, not the content. "Short runs with permanent upgrades" is a principle you can reuse. Its characters, art and levels are not.</p>` },
        ar: { title: "فكّك الألعاب دون أن تنسخها", body: `<p>اللعب بعين المصمّم مهارة. اختر لعبة تحبها ودوّن ملاحظاتك:</p>
<ol><li>ما <strong>الحلقة الأساسية</strong>؟ اكتبها دورةً من الأفعال.</li>
<li>ما <strong>القرارات</strong> التي يتخذها اللاعب كل دقيقة؟</li>
<li>كيف <strong>تعلّم</strong> اللعبة آليتها الأولى؟</li>
<li>ما الذي يجعلك تواصل اللعب: <strong>الأهداف أم المكافآت أم الفضول</strong>؟</li></ol>
<p>ثم خذ <em>المبدأ</em> لا المحتوى. «جولات قصيرة مع ترقيات دائمة» مبدأ يمكنك إعادة استخدامه، أما الشخصيات والرسوم والمراحل فلا.</p>` }
      }
    ],
    mechanics: [
      {
        en: { title: "Camera and controls: the invisible feel", body: `<p>Players blame themselves for bad cameras and clumsy controls, then quietly stop playing.</p>
<ul><li><strong>Look-ahead</strong> — move the camera slightly ahead of the player so they see what is coming.</li>
<li><strong>Dead zone</strong> — let the character move a little before the camera follows, so the screen does not shake with every step.</li>
<li><strong>Smoothing</strong> — follow with a short lag, but never so long the player leaves the screen.</li>
<li><strong>Remapping</strong> — let players change the buttons, and support both keyboard and gamepad.</li></ul>` },
        ar: { title: "الكاميرا والتحكّم: الإحساس الخفي", body: `<p>يلوم اللاعبون أنفسهم على الكاميرا السيئة والتحكّم الثقيل، ثم يتوقّفون عن اللعب بصمت.</p>
<ul><li><strong>النظر إلى الأمام</strong> — حرّك الكاميرا قليلًا أمام اللاعب ليرى ما هو قادم.</li>
<li><strong>المنطقة الميتة</strong> — دع الشخصية تتحرّك قليلًا قبل أن تتبعها الكاميرا، حتى لا تهتزّ الشاشة مع كل خطوة.</li>
<li><strong>التنعيم</strong> — تتبّع بتأخير قصير، لكن لا تدعه يطول حتى يخرج اللاعب من الشاشة.</li>
<li><strong>تخصيص الأزرار</strong> — اسمح للاعبين بتغيير الأزرار، وادعم لوحة المفاتيح وذراع التحكّم معًا.</li></ul>` }
      }
    ],
    levels: [
      {
        en: { title: "Invisible tutorials", body: `<p>The best tutorial does not feel like one. Instead of a text box that says "press A to jump", build a first screen where the only way forward is a small gap: the player <strong>discovers</strong> jumping.</p>
<ul><li>Teach <strong>one thing at a time</strong>, in a safe place where failure costs nothing.</li>
<li>Use the level's shape, light and colour to point at the answer.</li>
<li>Show a text hint only if the player is stuck for several seconds.</li></ul>
<p>Watch new players in playtests. Every place they get stuck marks a lesson the level did not teach.</p>` },
        ar: { title: "الدروس التعليمية الخفيّة", body: `<p>أفضل درس تعليمي لا يبدو درسًا. بدل صندوق نص يقول «اضغط A للقفز»، ابنِ شاشة أولى لا طريق فيها إلى الأمام إلا عبر فجوة صغيرة، فـ<strong>يكتشف</strong> اللاعب القفز بنفسه.</p>
<ul><li>علّم <strong>شيئًا واحدًا في كل مرة</strong>، في مكان آمن لا كلفة فيه للخطأ.</li>
<li>استخدم شكل المرحلة والإضاءة واللون للإشارة إلى الحل.</li>
<li>لا تُظهر تلميحًا نصيًّا إلا إذا علق اللاعب عدة ثوانٍ.</li></ul>
<p>راقب اللاعبين الجدد في جلسات الاختبار. كل مكان يعلقون فيه علامة على درس لم تعلّمه المرحلة.</p>` }
      }
    ],
    ui: [
      {
        en: { title: "Accessibility: games everyone can play", body: `<p>Accessibility options help far more players than you expect: people with disabilities, but also someone playing on a bus or with a broken arm.</p>
<ul><li><strong>Subtitles</strong> on by default, with adjustable size and a background.</li>
<li><strong>Colour</strong> — never use colour alone; add shapes or icons for colour-blind players.</li>
<li><strong>Controls</strong> — remapping, hold-to-toggle and adjustable timing windows.</li>
<li><strong>Difficulty and assists</strong> — let players choose their challenge without shame.</li></ul>
<p>The free Game Accessibility Guidelines website lists practical options from basic to advanced.</p>` },
        ar: { title: "إمكانية الوصول: ألعاب يلعبها الجميع", body: `<p>خيارات إمكانية الوصول تساعد لاعبين أكثر بكثير مما تتوقّع: ذوي الإعاقة، وأيضًا من يلعب في الحافلة أو ذراعه مكسورة.</p>
<ul><li><strong>الترجمة النصية</strong> مفعّلة افتراضيًا، مع حجم قابل للتعديل وخلفية.</li>
<li><strong>اللون</strong> — لا تعتمد على اللون وحده؛ أضف أشكالًا أو أيقونات لمن لديهم عمى ألوان.</li>
<li><strong>التحكّم</strong> — تخصيص الأزرار، والتبديل بدل الضغط المستمر، ونوافذ توقيت قابلة للتعديل.</li>
<li><strong>الصعوبة والمساعدات</strong> — دع اللاعبين يختارون مستوى التحدي دون إحراج.</li></ul>
<p>موقع Game Accessibility Guidelines المجاني يسرد خيارات عملية من الأساسية إلى المتقدّمة.</p>` }
      }
    ],
    progression: [
      {
        en: { title: "Ethical monetization", body: `<p>How a game makes money shapes its design. Fair models sell <strong>value</strong>: the full game, expansions, cosmetics, a battle pass with clear contents.</p>
<p>Watch out for <strong>dark patterns</strong>:</p>
<ul><li>Confusing premium currencies that hide real prices.</li>
<li>Random loot boxes sold for money, which some countries regulate as gambling.</li>
<li>Pay-to-win items that make free players lose.</li>
<li>Artificial waiting designed to be annoying so players pay to skip it.</li></ul>
<p>Ask: <em>would I be comfortable explaining this to the player's parents?</em></p>` },
        ar: { title: "تحقيق الدخل بأخلاق", body: `<p>الطريقة التي تكسب بها اللعبة المال تشكّل تصميمها. النماذج العادلة تبيع <strong>قيمة</strong>: اللعبة كاملة، أو التوسعات، أو الأزياء، أو تذكرة موسم (Battle Pass) محتواها واضح.</p>
<p>احذر من <strong>الأنماط المظلمة</strong>:</p>
<ul><li>عملات مميّزة مُربكة تُخفي الأسعار الحقيقية.</li>
<li>صناديق غنائم عشوائية تُباع بالمال، وبعض الدول تنظّمها بوصفها قمارًا.</li>
<li>عناصر «ادفع لتفوز» تجعل اللاعبين المجانيين يخسرون.</li>
<li>انتظار مصطنع مصمَّم ليكون مزعجًا حتى يدفع اللاعب لتخطّيه.</li></ul>
<p>اسأل نفسك: <em>هل أرتاح لشرح هذا لوالدَي اللاعب؟</em></p>` }
      },
      {
        en: { title: "Playing together: social design", body: `<p>Other people are the strongest motivation in games. Social design ranges from light to heavy:</p>
<ul><li><strong>Asynchronous</strong> — leaderboards, ghosts of friends' runs, sending gifts. Cheap to build, no servers needed for real-time play.</li>
<li><strong>Co-op</strong> — players share a goal. Give each role something the others need.</li>
<li><strong>Competitive</strong> — needs fair matchmaking and strong anti-cheat.</li></ul>
<p>Real-time online multiplayer is one of the most expensive features to build. For a first game, start with local or asynchronous play.</p>` },
        ar: { title: "اللعب معًا: التصميم الاجتماعي", body: `<p>الآخرون هم أقوى دافع في الألعاب. ويتدرّج التصميم الاجتماعي من الخفيف إلى الثقيل:</p>
<ul><li><strong>غير المتزامن</strong> — لوحات الصدارة، وأشباح جولات الأصدقاء، وإرسال الهدايا. بناؤه رخيص ولا يحتاج إلى خوادم للعب الفوري.</li>
<li><strong>التعاوني</strong> — يتشارك اللاعبون هدفًا واحدًا. امنح كل دور شيئًا يحتاجه الآخرون.</li>
<li><strong>التنافسي</strong> — يحتاج إلى مطابقة عادلة بين اللاعبين وحماية قوية من الغش.</li></ul>
<p>اللعب الجماعي الفوري عبر الإنترنت من أغلى الميزات بناءً. في لعبتك الأولى، ابدأ باللعب المحلي أو غير المتزامن.</p>` }
      },
      {
        en: { title: "Retention: why players leave on day one", body: `<p><strong>Retention</strong> is the share of players who come back: day 1, day 7 and day 30 are the standard checkpoints. Most players who quit do so in the first minutes.</p>
<ul><li>Track simple <strong>events</strong>: tutorial finished, level 1 cleared, first purchase, session length.</li>
<li>Draw a <strong>funnel</strong>: if 90% start level 2 but only 40% finish it, level 2 is the problem.</li>
<li>Collect only what you need, tell players about it and follow privacy laws.</li></ul>
<p>Numbers tell you <em>where</em> players leave; playtests tell you <em>why</em>.</p>` },
        ar: { title: "الاحتفاظ باللاعبين: لماذا يغادرون في اليوم الأول؟", body: `<p><strong>معدّل الاحتفاظ (Retention)</strong> هو نسبة اللاعبين الذين يعودون، ونقاط القياس المعتادة هي اليوم الأول والسابع والثلاثون. ومعظم من يتركون اللعبة يتركونها في الدقائق الأولى.</p>
<ul><li>تتبّع <strong>أحداثًا</strong> بسيطة: إنهاء الدرس التعليمي، واجتياز المرحلة الأولى، وأول عملية شراء، وطول الجلسة.</li>
<li>ارسم <strong>قُمعًا</strong>: إن بدأ 90% المرحلة الثانية ولم ينهها إلا 40%، فالمشكلة في المرحلة الثانية.</li>
<li>اجمع ما تحتاجه فقط، وأخبر اللاعبين بذلك، والتزم بقوانين الخصوصية.</li></ul>
<p>الأرقام تخبرك <em>أين</em> يغادر اللاعبون، وجلسات الاختبار تخبرك <em>لماذا</em>.</p>` }
      }
    ],
    production: [
      {
        en: { title: "QA: finding and tracking bugs", body: `<p>A bug that cannot be reproduced cannot be fixed. Every bug report needs:</p>
<ol><li>A short, specific <strong>title</strong>: "Player falls through floor in level 3 near the well".</li>
<li><strong>Steps to reproduce</strong>, numbered.</li>
<li><strong>Expected</strong> vs <strong>actual</strong> result.</li>
<li>Build version, device, and a screenshot or video.</li></ol>
<p>Keep bugs in one tracker (a Trello board or GitHub Issues is enough) and rank them by <strong>severity</strong>: crash and data loss first, cosmetic glitches last.</p>` },
        ar: { title: "ضمان الجودة: اكتشاف الأخطاء وتتبّعها", body: `<p>الخطأ الذي لا يمكن تكراره لا يمكن إصلاحه. كل تقرير خطأ يحتاج إلى:</p>
<ol><li><strong>عنوان</strong> قصير ومحدد: «اللاعب يسقط عبر الأرض في المرحلة 3 قرب البئر».</li>
<li><strong>خطوات التكرار</strong> مرقّمة.</li>
<li>النتيجة <strong>المتوقّعة</strong> مقابل النتيجة <strong>الفعلية</strong>.</li>
<li>رقم النسخة والجهاز، مع لقطة شاشة أو مقطع فيديو.</li></ol>
<p>اجمع الأخطاء في متتبّع واحد (لوحة Trello أو GitHub Issues تكفي) ورتّبها حسب <strong>الخطورة</strong>: الانهيار وفقدان البيانات أولًا، والعيوب الشكلية أخيرًا.</p>` }
      },
      {
        en: { title: "Marketing starts before launch", body: `<p>Launching to silence is the most common indie mistake. Start showing the game as soon as it has one good-looking moment.</p>
<ul><li><strong>Store page early</strong> — on Steam, wishlists collected before launch help the game get noticed on release.</li>
<li><strong>Capsule art</strong> — the small store image must read clearly at thumbnail size.</li>
<li><strong>Trailer</strong> — show gameplay in the first few seconds; keep it short.</li>
<li><strong>Community</strong> — share short clips and progress regularly, and reply to every comment.</li></ul>` },
        ar: { title: "التسويق يبدأ قبل الإطلاق", body: `<p>الإطلاق في صمت هو أكثر أخطاء المطوّرين المستقلّين شيوعًا. ابدأ بعرض اللعبة بمجرد أن تمتلك لحظة واحدة جميلة المظهر.</p>
<ul><li><strong>صفحة المتجر مبكرًا</strong> — على Steam، قوائم الرغبات التي تُجمع قبل الإطلاق تساعد اللعبة على الظهور يوم صدورها.</li>
<li><strong>صورة الغلاف</strong> — صورة المتجر الصغيرة يجب أن تُقرأ بوضوح بحجم مصغّر.</li>
<li><strong>المقطع الدعائي</strong> — اعرض طريقة اللعب في الثواني الأولى، واجعله قصيرًا.</li>
<li><strong>المجتمع</strong> — شارك مقاطع قصيرة وتقدّمك بانتظام، وردّ على كل تعليق.</li></ul>` }
      },
      {
        en: { title: "Your portfolio and career", body: `<p>Studios hire people who <strong>finish</strong> things. A strong beginner portfolio is three to five small, polished, playable games, not one giant unfinished one.</p>
<ul><li>Put games where they can be played in a browser, for example on itch.io.</li>
<li>For each project, write what <em>you</em> did, the problem you solved and what you would change.</li>
<li>Pick a direction: design, programming, art, audio, writing or production. Generalists thrive in small teams; specialists in large ones.</li></ul>` },
        ar: { title: "ملف أعمالك ومسارك المهني", body: `<p>الاستوديوهات توظّف من <strong>يُنهون</strong> أعمالهم. ملف الأعمال القوي للمبتدئ هو من ثلاث إلى خمس ألعاب صغيرة مصقولة قابلة للعب، لا لعبة عملاقة واحدة لم تكتمل.</p>
<ul><li>انشر ألعابك حيث يمكن لعبها في المتصفح، مثل itch.io.</li>
<li>اكتب لكل مشروع ما قمت به <em>أنت</em>، والمشكلة التي حللتها، وما الذي ستغيّره.</li>
<li>اختر اتجاهًا: التصميم أو البرمجة أو الفن أو الصوت أو الكتابة أو الإنتاج. أصحاب المهارات المتعددة يزدهرون في الفرق الصغيرة، والمتخصّصون في الفرق الكبيرة.</li></ul>` }
      }
    ]
  }
};
