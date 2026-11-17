/* Content v4 (part 1): deeper lessons for prototyping, mechanics, balancing, levels.
   Each entry with `match` rewrites the existing lesson whose English title equals it (same id, so progress is kept);
   entries without `match` are new lessons appended to the module. Keep the number of <strong> equal in EN and AR. */
export default {
  /* ================================================================ */
  prototyping: [
    {
      match: "A prototype answers one question", image: "/images/8e3c920ba644f94924101abf5cfe2e20.jpg",
      en: { title: "A prototype answers one question", body: `<p>A <strong>prototype</strong> is not a small version of your game. It is an experiment built to answer one question, as fast and as cheaply as possible. The moment you have the answer, the prototype has done its job.</p>
<p>Good prototype questions are narrow and can be answered with yes or no after watching someone play:</p>
<ul><li>"Is jumping between moving platforms fun for more than two minutes?"</li>
<li>"Do players understand that red cards cost health instead of gold?"</li>
<li>"Is a 60-second round long enough to make a plan?"</li></ul>
<p>Bad questions are too wide: "Is my RPG fun?" cannot be answered by any single build. Split it until each piece fits into one afternoon of work.</p>
<aside class="example"><b>Worked example:</b> A student wanted to make a farming game. Instead of building fields, shops and seasons, they wrote one question: <em>"Is waiting for crops boring or exciting?"</em> They built a page with three squares that grow in 10 seconds and a button to harvest. Testers kept clicking empty squares while waiting, which showed that waiting needs something to do. The answer took 40 minutes and changed the whole design: the final game added weeding while crops grow.</aside>
<p>Keep the art <strong>ugly on purpose</strong>: grey boxes, coloured squares and stick figures. Nobody is tempted to polish them, and testers comment on the rules instead of the graphics.</p>
<aside class="pitfall"><b>Common mistake:</b> Keeping the prototype and "growing" it into the final game. Prototype code is written fast and breaks easily. Keep the lesson you learned and start the real build cleanly.</aside>
<aside class="try"><b>Try it:</b> The Tiny Farm game in the Game Lab is itself a prototype of one question: "Is a plant–wait–harvest loop satisfying?" Play two minutes and decide your answer. <a class="go" href="#/lab/simulation">▶ Play Tiny Farm</a></aside>` },
      ar: { title: "النموذج الأولي يجيب عن سؤال واحد", body: `<p><strong>النموذج الأولي</strong> ليس نسخة مصغّرة من لعبتك، بل تجربة تُبنى لتجيب عن سؤال واحد بأسرع وأرخص طريقة ممكنة. في اللحظة التي تحصل فيها على الجواب، يكون النموذج قد أدّى مهمته.</p>
<p>السؤال الجيد ضيّق، ويمكن الإجابة عنه بنعم أو لا بعد مشاهدة شخص يلعب:</p>
<ul><li>«هل القفز بين منصات متحركة ممتع لأكثر من دقيقتين؟»</li>
<li>«هل يفهم اللاعبون أن البطاقات الحمراء تكلّف صحة بدل الذهب؟»</li>
<li>«هل 60 ثانية للجولة كافية لوضع خطة؟»</li></ul>
<p>أما السؤال السيئ فواسع جدًا: «هل لعبتي ممتعة؟» لا يجيب عنه أي نموذج واحد. قسّمه حتى يصبح كل جزء عمل عصرية واحدة.</p>
<aside class="example"><b>مثال عملي:</b> أرادت طالبة صنع لعبة مزرعة. بدل بناء الحقول والمتجر والفصول، كتبت سؤالًا واحدًا: <em>«هل انتظار المحصول مملّ أم مثير؟»</em> صنعت صفحة فيها ثلاثة مربعات تنمو في 10 ثوانٍ وزرًّا للحصاد. ظل المختبِرون ينقرون على المربعات الفارغة أثناء الانتظار، فاتضح أن الانتظار يحتاج شيئًا يُفعل. استغرق الجواب 40 دقيقة وغيّر التصميم كله: أضافت اللعبة النهائية إزالة الأعشاب أثناء النمو.</aside>
<p>اجعل الرسوم <strong>قبيحة عن قصد</strong>: مربعات رمادية وأشكال ملوّنة ورجال من خطوط. لن يغريك أحد بتلميعها، وسيعلّق المختبِرون على القواعد لا على الرسوم.</p>
<aside class="pitfall"><b>خطأ شائع:</b> الاحتفاظ بالنموذج و«تكبيره» حتى يصبح اللعبة النهائية. شيفرة النموذج تُكتب بسرعة وتنكسر بسهولة. احتفظ بالدرس الذي تعلّمته وابدأ البناء الحقيقي من جديد ونظيفًا.</aside>
<aside class="try"><b>جرّبها:</b> لعبة «المزرعة الصغيرة» في مختبر اللعب هي نفسها نموذج لسؤال واحد: «هل حلقة ازرع–انتظر–احصد مُرضية؟» العبها دقيقتين وقرّر جوابك. <a class="go" href="#/lab/simulation">▶ العب المزرعة الصغيرة</a></aside>` }
    },
    {
      match: "Paper prototyping", image: "/images/7b2fa29bbd6afeeb415c1689c2f146ad.jpg",
      en: { title: "Paper prototyping", body: `<p>Cards, dice, coins and a sheet of paper can test most game rules in an hour. A <strong>paper prototype</strong> lets you change a number with a pencil instead of rewriting code, so you can try ten versions of a rule in the time one coded version takes.</p>
<p>What you need: index cards or cut paper, two dice, coins or beans as tokens, a pencil and an eraser. The method:</p>
<ol><li>Write each rule on its own card so you can swap a single rule out.</li>
<li>Play one full round alone, speaking your decisions aloud.</li>
<li>Then watch a friend play <strong>without explaining anything</strong>. Hand them the rule cards and stay silent.</li>
<li>Note where they hesitate, break a rule by accident or look bored. Each of those is a design problem.</li>
<li>Change one thing, then play again.</li></ol>
<aside class="example"><b>Worked example:</b> A tower-defence idea on paper: draw a winding path on squared paper, put coins as enemies at the start, and give the player 10 beans of gold. A tower costs 3 beans and hits enemies within 2 squares. Each turn, enemies move 2 squares. After three games it was clear that towers on corners hit enemies twice as often. That single rule (corners are valuable) became the heart of the final level design, before a line of code existed.</aside>
<p>Even action games can be paper-tested. Turn-based movement on a grid shows whether a level layout makes sense, whether enemies block the path and whether the player has room to escape.</p>
<aside class="pitfall"><b>Common mistake:</b> Explaining the rules while the tester plays. Every time you speak, you hide a problem that real players will meet alone.</aside>
<aside class="try"><b>Try it:</b> Play Path Defense in the Game Lab and notice how corners are worth more. Then draw the same map on paper and try a different tower rule. <a class="go" href="#/lab/strategy">▶ Play Path Defense</a></aside>` },
      ar: { title: "النموذج الورقي", body: `<p>البطاقات والنرد والعملات وورقة واحدة تكفي لاختبار معظم قواعد اللعبة في ساعة. يتيح لك <strong>النموذج الورقي</strong> تغيير رقم بقلم رصاص بدل إعادة كتابة الشيفرة، فتجرّب عشر نسخ من القاعدة في الوقت الذي تستغرقه نسخة مبرمجة واحدة.</p>
<p>ما تحتاجه: بطاقات أو ورق مقصوص، نردان، عملات أو حبوب كقطع، قلم رصاص وممحاة. والطريقة:</p>
<ol><li>اكتب كل قاعدة على بطاقة مستقلة لتستطيع تبديل قاعدة واحدة فقط.</li>
<li>العب جولة كاملة وحدك وأنت تنطق قراراتك بصوت عالٍ.</li>
<li>ثم شاهد صديقًا يلعب <strong>دون أن تشرح له شيئًا</strong>. أعطه بطاقات القواعد والزم الصمت.</li>
<li>دوّن أين يتردد، وأين يكسر قاعدة دون قصد، وأين يبدو عليه الملل. كل واحدة منها مشكلة تصميم.</li>
<li>غيّر شيئًا واحدًا، ثم العب مرة أخرى.</li></ol>
<aside class="example"><b>مثال عملي:</b> فكرة لعبة دفاع عن البرج على الورق: ارسم طريقًا متعرجًا على ورق مربعات، وضع عملات كأعداء في البداية، وأعطِ اللاعب 10 حبات ذهب. البرج يكلّف 3 حبات ويضرب الأعداء ضمن مربعين. في كل دور يتحرك الأعداء مربعين. بعد ثلاث جولات اتضح أن الأبراج عند المنعطفات تضرب الأعداء ضعف المرات. صارت هذه القاعدة الواحدة (المنعطفات ثمينة) قلب تصميم المراحل النهائي، قبل كتابة سطر شيفرة واحد.</aside>
<p>حتى ألعاب الحركة يمكن اختبارها على الورق. الحركة بالأدوار على شبكة تكشف هل تصميم المرحلة منطقي، وهل يسدّ الأعداء الطريق، وهل لدى اللاعب مساحة للهرب.</p>
<aside class="pitfall"><b>خطأ شائع:</b> شرح القواعد أثناء لعب المختبِر. كل مرة تتكلم فيها تُخفي مشكلة سيواجهها اللاعبون الحقيقيون وحدهم.</aside>
<aside class="try"><b>جرّبها:</b> العب «الدفاع عن الطريق» في مختبر اللعب ولاحظ أن المنعطفات أثمن. ثم ارسم الخريطة نفسها على ورق وجرّب قاعدة مختلفة للأبراج. <a class="go" href="#/lab/strategy">▶ العب الدفاع عن الطريق</a></aside>` }
    },
    {
      match: "Design pillars", image: "/images/ad47519e8a1ee6d5c4001c0450eb4562.jpg",
      en: { title: "Design pillars", body: `<p><strong>Design pillars</strong> are three or four short phrases that describe the experience you promise the player. They are not features ("has a crafting system") but feelings and qualities ("everything you find is useful").</p>
<p>Pillars do their real work when the team disagrees. Ask: <em>which pillar does this feature serve?</em> If the answer is none, cut it, however cool it is. That is why they protect small teams from <strong>scope creep</strong>, the slow growth of a project until it can never be finished.</p>
<aside class="example"><b>Worked example:</b> A small exploration game chose three pillars: <em>"lonely exploration", "every fight is a puzzle", "the world remembers you"</em>. Someone suggested online co-op. It sounds great, but it breaks "lonely exploration" and costs months, so it was cut. Someone else suggested that broken bridges stay broken after a fight. It serves "the world remembers you" and takes one day, so it went in.</aside>
<p>How to write good pillars:</p>
<ul><li>Keep each one under five words so the whole team remembers them.</li>
<li>Make them specific to <em>your</em> game. "Fun gameplay" is true of every game and decides nothing.</li>
<li>Check that they can say no. A pillar that every idea passes is not a pillar.</li></ul>
<aside class="pitfall"><b>Common mistake:</b> Writing eight pillars. With that many, every feature fits one of them and nothing is ever cut. Three is the sweet spot.</aside>
<aside class="try"><b>Try it:</b> Open the Games Showcase and read the Minecraft breakdown. Write three pillars you think its designers followed, then check them against its mechanics list. <a class="go" href="#/games/minecraft">▶ Open the Minecraft breakdown</a></aside>` },
      ar: { title: "ركائز التصميم", body: `<p><strong>ركائز التصميم</strong> ثلاث أو أربع عبارات قصيرة تصف التجربة التي تعد بها اللاعب. ليست ميزات («فيها نظام صناعة») بل مشاعر وصفات («كل ما تجده مفيد»).</p>
<p>تؤدي الركائز عملها الحقيقي حين يختلف الفريق. اسأل: <em>أي ركيزة تخدمها هذه الميزة؟</em> إذا كان الجواب لا شيء، فاحذفها مهما كانت رائعة. لهذا تحمي الفرق الصغيرة من <strong>تضخّم النطاق</strong>، أي النمو البطيء للمشروع حتى يصبح إنهاؤه مستحيلًا.</p>
<aside class="example"><b>مثال عملي:</b> اختارت لعبة استكشاف صغيرة ثلاث ركائز: <em>«استكشاف موحش»، «كل معركة لغز»، «العالم يتذكّرك»</em>. اقترح أحدهم لعبًا تعاونيًا عبر الإنترنت. يبدو رائعًا، لكنه يكسر «الاستكشاف الموحش» ويكلّف شهورًا، فحُذف. واقترح آخر أن تبقى الجسور المكسورة مكسورة بعد المعركة. هذا يخدم «العالم يتذكّرك» ويستغرق يومًا واحدًا، فأُضيف.</aside>
<p>كيف تكتب ركائز جيدة:</p>
<ul><li>اجعل كل واحدة أقل من خمس كلمات ليتذكرها الفريق كله.</li>
<li>اجعلها خاصة بلعبتك <em>أنت</em>. «لعب ممتع» تصدق على كل لعبة ولا تحسم شيئًا.</li>
<li>تأكد أنها تستطيع قول «لا». الركيزة التي تمرّ منها كل فكرة ليست ركيزة.</li></ul>
<aside class="pitfall"><b>خطأ شائع:</b> كتابة ثماني ركائز. مع هذا العدد، تجد كل ميزة ركيزة تناسبها ولا يُحذف شيء أبدًا. الرقم الأمثل ثلاث.</aside>
<aside class="try"><b>جرّبها:</b> افتح معرض الألعاب واقرأ تحليل ماينكرافت. اكتب ثلاث ركائز تظن أن مصمميها اتبعوها، ثم قارنها بقائمة آلياتها. <a class="go" href="#/games/minecraft">▶ افتح تحليل ماينكرافت</a></aside>` }
    },
    {
      match: "Game jams: a whole game in 48 hours", image: "/images/d891091ff8cea4d867f3d2ef66a32b1f.jpg",
      en: { title: "Game jams: a whole game in 48 hours", body: `<p>A <strong>game jam</strong> is an event where you make a complete game around a theme in a fixed time, usually 48 or 72 hours. Global Game Jam, Ludum Dare and the many jams listed on itch.io are free to join, alone or in a team.</p>
<p>Jams are the fastest training in <strong>finishing</strong>: menu, ending and upload included. A typical 48-hour plan:</p>
<ol><li><b>Hours 0–2:</b> read the theme, brainstorm 10 ideas, pick the smallest one that fits.</li>
<li><b>Hours 2–12:</b> core mechanic with grey boxes. Test it yourself every hour.</li>
<li><b>Hours 12–30:</b> one level start to finish, then two or three more.</li>
<li><b>Hours 30–40:</b> art, sound, title screen, win and lose screens.</li>
<li><b>Hours 40–48:</b> polish, bug fixes, upload and a short description. No new features.</li></ol>
<aside class="example"><b>Worked example:</b> Theme: "Only one". A team first planned a dungeon game with one sword, one life and one key. On hour 2 they cut it to "a platformer where you have only one jump per room". It fitted the theme perfectly, each room was a small puzzle, and they finished 12 rooms. Their dungeon plan would have ended with half a game.</aside>
<aside class="pitfall"><b>Common mistake:</b> Starting the build process in the last hour. Export and upload a test version by hour 24, so you discover export problems while there is still time.</aside>
<aside class="try"><b>Try it:</b> Give yourself a 30-minute mini-jam with the theme "a rising tide". In the Design Studio, choose a genre and write a one-paragraph pitch before the time runs out. <a class="go" href="#/studio">▶ Open the Design Studio</a></aside>` },
      ar: { title: "جامات الألعاب: لعبة كاملة في 48 ساعة", body: `<p><strong>جام الألعاب</strong> حدث تصنع فيه لعبة كاملة حول موضوع محدد في وقت ثابت، عادة 48 أو 72 ساعة. المشاركة في Global Game Jam وLudum Dare والجامات الكثيرة على itch.io مجانية، فرديًا أو ضمن فريق.</p>
<p>الجامات أسرع تدريب على <strong>الإنهاء</strong>: القائمة والنهاية والرفع كلها ضمن الوقت. خطة نموذجية لـ48 ساعة:</p>
<ol><li><b>الساعات 0–2:</b> اقرأ الموضوع، واكتب 10 أفكار، واختر أصغرها مناسبًا للموضوع.</li>
<li><b>الساعات 2–12:</b> الآلية الأساسية بمربعات رمادية. اختبرها بنفسك كل ساعة.</li>
<li><b>الساعات 12–30:</b> مرحلة واحدة من البداية إلى النهاية، ثم مرحلتان أو ثلاث.</li>
<li><b>الساعات 30–40:</b> الرسوم والصوت وشاشة العنوان وشاشتا الفوز والخسارة.</li>
<li><b>الساعات 40–48:</b> تحسين وإصلاح أخطاء ورفع ووصف قصير. لا ميزات جديدة.</li></ol>
<aside class="example"><b>مثال عملي:</b> الموضوع: «واحد فقط». خطط فريق أولًا للعبة زنزانة فيها سيف واحد وحياة واحدة ومفتاح واحد. في الساعة الثانية قلّصوها إلى «لعبة منصات لديك فيها قفزة واحدة فقط في كل غرفة». ناسبت الموضوع تمامًا، وصارت كل غرفة لغزًا صغيرًا، وأنهوا 12 غرفة. خطة الزنزانة كانت ستنتهي بنصف لعبة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> بدء تصدير اللعبة في الساعة الأخيرة. صدّر وارفع نسخة تجريبية قبل الساعة 24، لتكتشف مشكلات التصدير وما زال لديك وقت.</aside>
<aside class="try"><b>جرّبها:</b> امنح نفسك جامًا مصغرًا مدته 30 دقيقة بموضوع «مدّ يرتفع». في استوديو التصميم اختر نوعًا واكتب عرضًا من فقرة واحدة قبل انتهاء الوقت. <a class="go" href="#/studio">▶ افتح استوديو التصميم</a></aside>` }
    },
    {
      image: "/images/fcdc0e9522ec3c9501b02611066c936f.jpg",
      en: { title: "Greyboxing: a playable level without art", body: `<p>A <strong>greybox</strong> (also called blockout) is a level built only from simple shapes: grey boxes for walls, flat planes for floors, cylinders for pillars. It is the digital version of the paper prototype, and it answers questions about space: Is the jump too long? Can the player see the exit? Is the room too big to be tense?</p>
<p>The workflow used by most studios:</p>
<ol><li>Sketch the level from above on paper: start, goal, main path, one optional path.</li>
<li>Build it with boxes at real size. Put a box the size of the player at the start for scale.</li>
<li>Play it. Measure jumps, timing and lines of sight.</li>
<li>Only when the greybox plays well does an artist replace boxes with real art.</li></ol>
<aside class="example"><b>Worked example:</b> In a greybox test, players kept missing the exit door in a large hall. The designer did not add an arrow. They moved one light above the door and lowered the ceiling of the corridor behind it, creating a dark-to-bright frame. In the next test every player found the door in under 10 seconds. That fix cost five minutes because no art had to be redone.</aside>
<p>Use a <strong>metric sheet</strong> next to your greybox: player height, jump height, jump length, run speed. Every gap and wall is built from these numbers, so levels stay fair.</p>
<aside class="pitfall"><b>Common mistake:</b> Adding textures and props to the greybox "to make testing nicer". Testers then judge the art, and you will hesitate to move a wall you spent an hour decorating.</aside>
<aside class="try"><b>Try it:</b> In the Game Feel Lab, change the jump height and watch which gaps in the level become impossible. That is why your metric sheet must be fixed before you build levels. <a class="go" href="#/lab/platformer">▶ Open the Game Feel Lab</a></aside>` },
      ar: { title: "المكعبات الرمادية: مرحلة قابلة للعب بلا رسوم", body: `<p><strong>المرحلة الرمادية</strong> (وتسمى أيضًا Blockout) مرحلة مبنية من أشكال بسيطة فقط: صناديق رمادية للجدران، وأسطح مسطحة للأرضيات، وأسطوانات للأعمدة. إنها النسخة الرقمية من النموذج الورقي، وتجيب عن أسئلة المساحة: هل القفزة طويلة جدًا؟ هل يرى اللاعب المخرج؟ هل الغرفة أكبر من أن تكون مشحونة بالتوتر؟</p>
<p>طريقة العمل التي تتبعها معظم الاستوديوهات:</p>
<ol><li>ارسم المرحلة من الأعلى على ورق: البداية والهدف والطريق الرئيسي وطريق اختياري واحد.</li>
<li>ابنِها بالصناديق بالحجم الحقيقي. ضع عند البداية صندوقًا بحجم اللاعب ليكون مقياسًا.</li>
<li>العبها. قِس القفزات والتوقيت وخطوط الرؤية.</li>
<li>فقط حين تصبح المرحلة الرمادية ممتعة، يستبدل الرسام الصناديق بالرسوم الحقيقية.</li></ol>
<aside class="example"><b>مثال عملي:</b> في اختبار لمرحلة رمادية، ظل اللاعبون يفوّتون باب الخروج في قاعة كبيرة. لم يضف المصمم سهمًا، بل نقل ضوءًا واحدًا فوق الباب وخفض سقف الممر خلفه، فصنع إطارًا ينتقل من الظلام إلى النور. في الاختبار التالي وجد كل اللاعبين الباب في أقل من 10 ثوانٍ. كلّف هذا الإصلاح خمس دقائق لأنه لم يكن هناك رسوم تُعاد.</aside>
<p>استخدم <strong>جدول المقاييس</strong> بجانب مرحلتك الرمادية: طول اللاعب وارتفاع القفزة وطولها وسرعة الركض. كل فجوة وكل جدار يُبنى من هذه الأرقام، فتبقى المراحل عادلة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> إضافة الخامات والزينة إلى المرحلة الرمادية «ليصبح الاختبار ألطف». حينها يحكم المختبِرون على الرسوم، وستتردد في تحريك جدار قضيت ساعة في تزيينه.</aside>
<aside class="try"><b>جرّبها:</b> في مختبر إحساس اللعب غيّر ارتفاع القفزة ولاحظ أي الفجوات في المرحلة تصبح مستحيلة. لهذا يجب تثبيت جدول المقاييس قبل بناء المراحل. <a class="go" href="#/lab/platformer">▶ افتح مختبر إحساس اللعب</a></aside>` }
    },
    {
      image: "/images/7b2fa29bbd6afeeb415c1689c2f146ad.jpg",
      en: { title: "Workshop: build and test a paper prototype", body: `<p>This workshop takes about <strong>45 minutes</strong>. You will turn one game idea into a paper prototype, test it with another person and change it based on what you saw. You need paper, a pencil, a die and some coins.</p>
<ol><li><b>Question (5 min):</b> write the one question your prototype must answer. Example: "Is it fun to choose between saving coins and buying a shield?"</li>
<li><b>Rules (10 min):</b> write at most six rules, each on its own card: goal, turn order, what you can do on a turn, how you win, how you lose.</li>
<li><b>Solo test (5 min):</b> play one round alone. Fix any rule that you could not follow.</li>
<li><b>Silent test (10 min):</b> give the cards to a friend or family member. Do not explain. Write down every hesitation, question and smile.</li>
<li><b>One change (5 min):</b> pick the biggest problem and change one rule only.</li>
<li><b>Second test (10 min):</b> play again and compare. Did the change answer your question better?</li></ol>
<aside class="example"><b>What you hand in:</b> a photo of your rule cards, a list of three observations from the silent test, and one sentence: "The answer to my question is … because …".</aside>
<aside class="pitfall"><b>Common mistake:</b> Changing three rules after the first test. You will not know which change made the difference.</aside>
<aside class="try"><b>Try it:</b> Before you start, play Four in a Row in the Game Lab. Its rules fit on one card, yet it has real depth. Aim for that. <a class="go" href="#/lab/board">▶ Play Four in a Row</a></aside>` },
      ar: { title: "ورشة تطبيقية: ابنِ نموذجًا ورقيًا واختبره", body: `<p>تستغرق هذه الورشة نحو <strong>45 دقيقة</strong>. ستحوّل فكرة لعبة إلى نموذج ورقي، وتختبره مع شخص آخر، وتعدّله بناءً على ما رأيت. تحتاج ورقًا وقلم رصاص ونردًا وبعض العملات.</p>
<ol><li><b>السؤال (5 دقائق):</b> اكتب السؤال الواحد الذي يجب أن يجيب عنه نموذجك. مثال: «هل الاختيار بين ادخار العملات وشراء درع ممتع؟»</li>
<li><b>القواعد (10 دقائق):</b> اكتب ست قواعد على الأكثر، كل واحدة على بطاقة: الهدف، ترتيب الأدوار، ما يمكنك فعله في دورك، كيف تفوز، كيف تخسر.</li>
<li><b>اختبار فردي (5 دقائق):</b> العب جولة وحدك. أصلح كل قاعدة لم تستطع اتباعها.</li>
<li><b>اختبار صامت (10 دقائق):</b> أعطِ البطاقات لصديق أو أحد أفراد العائلة. لا تشرح. دوّن كل تردد وكل سؤال وكل ابتسامة.</li>
<li><b>تغيير واحد (5 دقائق):</b> اختر أكبر مشكلة وغيّر قاعدة واحدة فقط.</li>
<li><b>اختبار ثانٍ (10 دقائق):</b> العب مجددًا وقارن. هل أجاب التغيير عن سؤالك بشكل أفضل؟</li></ol>
<aside class="example"><b>ما تسلّمه:</b> صورة لبطاقات قواعدك، وقائمة بثلاث ملاحظات من الاختبار الصامت، وجملة واحدة: «جواب سؤالي هو … لأن …».</aside>
<aside class="pitfall"><b>خطأ شائع:</b> تغيير ثلاث قواعد بعد الاختبار الأول. لن تعرف أي تغيير صنع الفرق.</aside>
<aside class="try"><b>جرّبها:</b> قبل أن تبدأ، العب «أربعة في صف» في مختبر اللعب. قواعدها تتسع لبطاقة واحدة، ومع ذلك فيها عمق حقيقي. اجعل هذا هدفك. <a class="go" href="#/lab/board">▶ العب أربعة في صف</a></aside>` }
    }
  ],

  /* ================================================================ */
  mechanics: [
    {
      match: "Building a platformer: the roadmap", image: "/images/2a2d3667ba7e1d63e8bf0277e6a040f2.jpg",
      en: { title: "Building a platformer: the roadmap", body: `<p>A complete 2D platformer breaks down into eight stages: <strong>Get started → Core mechanics → Gameplay systems → Level design → Art & animation → Audio → Polish & UI → Build & deploy</strong>. The order matters more than it looks.</p>
<p>Inside each stage the same small cycle repeats: <em>Plan → Design → Code → Art → Audio → Test → Deploy</em>. You do not finish all the code and then all the art; you take one feature through the whole cycle.</p>
<ul><li><b>Core mechanics</b> means run, jump, fall and collide. Nothing else.</li>
<li><b>Gameplay systems</b> are what you build on top: coins, enemies, checkpoints, lives.</li>
<li><b>Level design</b> comes only after movement is final, because every gap depends on the jump.</li></ul>
<p>Note that <strong>core mechanics come before art</strong>. Use coloured boxes until the movement feels right. If you draw a beautiful character first, you will be tempted to keep a jump that feels wrong because changing it means redoing the animation.</p>
<aside class="example"><b>Worked example:</b> A two-person team planned 8 weeks. Week 1: movement with a blue square. Week 2: enemies and coins as red and yellow squares. Weeks 3–4: six greybox levels. Weeks 5–6: art and animation, which now fitted exact sizes. Week 7: sound and menus. Week 8: bug fixing and upload. Because the movement was fixed in week 1, no level had to be rebuilt later.</aside>
<aside class="pitfall"><b>Common mistake:</b> Starting with the title screen and menus because they are easy. They feel like progress, but they teach you nothing about whether the game is fun.</aside>
<aside class="try"><b>Try it:</b> The Game Feel Lab is exactly "stage 2": one character, one level, only movement. Play the "Tight" preset, then "Floaty". <a class="go" href="#/lab/platformer">▶ Open the Game Feel Lab</a></aside>` },
      ar: { title: "بناء لعبة منصات: خريطة الطريق", body: `<p>تنقسم لعبة المنصات ثنائية الأبعاد الكاملة إلى ثماني مراحل: <strong>البداية ← الآليات الأساسية ← أنظمة اللعب ← تصميم المراحل ← الرسوم والتحريك ← الصوت ← التحسين والواجهة ← البناء والنشر</strong>. والترتيب أهم مما يبدو.</p>
<p>داخل كل مرحلة تتكرر الدورة الصغيرة نفسها: <em>خطّط ← صمّم ← برمج ← ارسم ← أضف الصوت ← اختبر ← انشر</em>. أنت لا تنهي الشيفرة كلها ثم الرسوم كلها، بل تأخذ ميزة واحدة عبر الدورة كاملة.</p>
<ul><li><b>الآليات الأساسية</b> تعني الركض والقفز والسقوط والاصطدام. لا شيء غيرها.</li>
<li><b>أنظمة اللعب</b> ما تبنيه فوقها: العملات والأعداء ونقاط الحفظ والأرواح.</li>
<li><b>تصميم المراحل</b> يأتي فقط بعد تثبيت الحركة، لأن كل فجوة تعتمد على القفزة.</li></ul>
<p>لاحظ أن <strong>الآليات الأساسية تأتي قبل الرسوم</strong>. استخدم صناديق ملوّنة حتى تصبح الحركة صحيحة الإحساس. إذا رسمت شخصية جميلة أولًا، فستميل إلى إبقاء قفزة سيئة الإحساس لأن تغييرها يعني إعادة التحريك.</p>
<aside class="example"><b>مثال عملي:</b> خطط فريق من شخصين لثمانية أسابيع. الأسبوع 1: الحركة بمربع أزرق. الأسبوع 2: الأعداء والعملات كمربعات حمراء وصفراء. الأسبوعان 3–4: ست مراحل رمادية. الأسبوعان 5–6: الرسوم والتحريك، وقد صارت تناسب أحجامًا دقيقة. الأسبوع 7: الصوت والقوائم. الأسبوع 8: إصلاح الأخطاء والرفع. ولأن الحركة ثُبّتت في الأسبوع الأول، لم يُعَد بناء أي مرحلة لاحقًا.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> البدء بشاشة العنوان والقوائم لأنها سهلة. تبدو تقدمًا، لكنها لا تعلّمك شيئًا عن متعة اللعبة.</aside>
<aside class="try"><b>جرّبها:</b> مختبر إحساس اللعب هو «المرحلة 2» بالضبط: شخصية واحدة ومرحلة واحدة وحركة فقط. العب بالإعداد «مُحكم» ثم «عائم». <a class="go" href="#/lab/platformer">▶ افتح مختبر إحساس اللعب</a></aside>` }
    },
    {
      match: "Jumping is maths you can design", image: "",
      en: { title: "Jumping is maths you can design", body: `<p>Don't tune "jump force" blindly until it feels right; every later change to gravity will break it again. Decide the two numbers a level designer cares about, the <strong>jump height</strong> (h) and <strong>gravity</strong> (g), and derive the take-off speed from them:</p>
<pre><code>v₀ = √(2 · g · h)
time to apex = v₀ / g</code></pre>
<p>Now a level designer can say "the player jumps 3 tiles high" and it stays true when someone changes gravity for a heavier feel.</p>
<aside class="example"><b>Worked example:</b> Tiles are 32 px. You want a jump of 3 tiles, h = 96 px, with gravity g = 2000 px/s². Then v₀ = √(2 × 2000 × 96) = √384000 ≈ 620 px/s, and time to apex = 620 / 2000 = 0.31 s. A jump that rises in 0.31 s feels snappy. With g = 1000 the same height takes 0.44 s and feels floaty, even though the player still clears exactly 3 tiles.</aside>
<p>Most good platformers also apply <strong>extra gravity when falling</strong>, often 1.5 to 2.5 times normal. The rise stays readable and the fall is quick, so the jump arc is asymmetric and feels sharp instead of moon-like.</p>
<p>Jump length follows from height and run speed: if the player runs at 280 px/s and is in the air for about 0.6 s, they cover about 170 px, a little over 5 tiles. Write that number on your metric sheet; it decides the widest gap you may build.</p>
<aside class="pitfall"><b>Common mistake:</b> Changing gravity late in production. If you tuned force instead of height, every level built so far may now have impossible or trivial jumps.</aside>
<aside class="try"><b>Try it:</b> In the Game Feel Lab, set gravity to 1100, then to 3500. Watch the "measured apex" readout: it stays at your jump height because v₀ is derived from it. <a class="go" href="#/lab/platformer">▶ Test it in the Game Feel Lab</a></aside>` },
      ar: { title: "القفزة رياضيات يمكنك تصميمها", body: `<p>لا تضبط «قوة القفز» عشوائيًا حتى يصبح إحساسها مناسبًا، فكل تغيير لاحق في الجاذبية سيفسدها من جديد. حدّد الرقمين اللذين يهمّان مصمم المراحل، <strong>ارتفاع القفزة</strong> (h) و<strong>الجاذبية</strong> (g)، واشتقّ منهما سرعة الانطلاق:</p>
<pre><code>v₀ = √(2 · g · h)
time to apex = v₀ / g</code></pre>
<p>الآن يستطيع مصمم المراحل أن يقول «اللاعب يقفز ارتفاع 3 مربعات»، ويبقى ذلك صحيحًا حين يغيّر أحدهم الجاذبية ليصبح الإحساس أثقل.</p>
<aside class="example"><b>مثال عملي:</b> المربع 32 بكسل. تريد قفزة ارتفاعها 3 مربعات، أي h = 96 بكسل، مع جاذبية g = 2000 بكسل/ث². إذن v₀ = √(2 × 2000 × 96) = √384000 ≈ 620 بكسل/ث، وزمن الوصول إلى القمة = 620 ÷ 2000 = 0.31 ث. القفزة التي تصعد في 0.31 ث تبدو حادة وسريعة. مع g = 1000 يستغرق الارتفاع نفسه 0.44 ث ويبدو عائمًا، رغم أن اللاعب ما زال يتجاوز 3 مربعات بالضبط.</aside>
<p>معظم ألعاب المنصات الجيدة تضيف أيضًا <strong>جاذبية إضافية أثناء السقوط</strong>، غالبًا من 1.5 إلى 2.5 ضعف الجاذبية العادية. يبقى الصعود مقروءًا ويكون السقوط سريعًا، فيصبح قوس القفزة غير متماثل وحادًّا بدل أن يشبه القفز على القمر.</p>
<p>طول القفزة ينتج من الارتفاع وسرعة الركض: إذا ركض اللاعب بسرعة 280 بكسل/ث وبقي في الهواء نحو 0.6 ث، فإنه يقطع نحو 170 بكسل، أي أكثر من 5 مربعات بقليل. اكتب هذا الرقم في جدول المقاييس؛ فهو يحدد أوسع فجوة يحق لك بناؤها.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تغيير الجاذبية في وقت متأخر من الإنتاج. إذا كنت قد ضبطت القوة بدل الارتفاع، فقد تصبح قفزات كل المراحل المبنية مستحيلة أو تافهة.</aside>
<aside class="try"><b>جرّبها:</b> في مختبر إحساس اللعب اضبط الجاذبية على 1100 ثم على 3500. راقب قراءة «القمة المقيسة»: تبقى عند ارتفاع قفزتك لأن v₀ مشتقة منه. <a class="go" href="#/lab/platformer">▶ اختبرها في مختبر إحساس اللعب</a></aside>` }
    },
    {
      match: "Forgiveness: coyote time & jump buffering", image: "",
      en: { title: "Forgiveness: coyote time & jump buffering", body: `<p>Human reactions are not frame-perfect. Players press jump a little too late after running off a ledge, or a little too early before landing. If the game punishes these tiny misses, players feel the controls are "broken", even though the code does exactly what it was told. Good games add hidden <em>forgiveness</em>:</p>
<ul><li><strong>Coyote time</strong> — let the player jump for about 0.1 s (6 frames at 60 fps) after running off a ledge. The name comes from cartoon characters who run off a cliff and only fall when they look down.</li>
<li><strong>Jump buffering</strong> — remember a jump press made about 0.1 s <em>before</em> landing, and perform it the moment the player touches the ground.</li>
<li><strong>Variable jump height</strong> — releasing the button early cuts the upward speed, so a tap gives a small hop and holding gives a full jump.</li></ul>
<aside class="example"><b>Worked example:</b> In a playtest without coyote time, a tester fell into the same pit 7 times and said "the jump button doesn't always work". The log showed every press came 2–4 frames after leaving the ledge. With 100 ms of coyote time the same tester cleared the pit on the first try and never mentioned the controls again.</aside>
<p>Players never notice these features when they are present. They only notice when they are missing. That is why they are called invisible design.</p>
<aside class="pitfall"><b>Common mistake:</b> Making coyote time too long (0.3 s or more). Then players can visibly walk on air, which feels like a bug in the other direction.</aside>
<aside class="try"><b>Try it:</b> Choose the "No forgiveness" preset in the Game Feel Lab and try to collect every coin. Then switch back to "Tight". Count your falls each time. <a class="go" href="#/lab/platformer">▶ Compare the presets</a></aside>` },
      ar: { title: "التسامح: وقت الذئب وحفظ ضغطة القفز", body: `<p>ردود فعل البشر ليست دقيقة حتى الإطار الواحد. يضغط اللاعبون زر القفز متأخرين قليلًا بعد مغادرة الحافة، أو مبكرين قليلًا قبل الهبوط. إذا عاقبت اللعبة هذه الأخطاء الصغيرة، يشعر اللاعبون أن التحكم «معطّل»، رغم أن الشيفرة تفعل بالضبط ما طُلب منها. الألعاب الجيدة تضيف <em>تسامحًا</em> خفيًا:</p>
<ul><li><strong>وقت الذئب</strong> — اسمح للاعب بالقفز لمدة 0.1 ث تقريبًا (6 إطارات بمعدل 60 إطارًا في الثانية) بعد مغادرة الحافة. الاسم مأخوذ من شخصيات الرسوم المتحركة التي تركض خارج الجرف ولا تسقط إلا حين تنظر إلى الأسفل.</li>
<li><strong>حفظ ضغطة القفز</strong> — تذكّر ضغطة القفز التي حدثت قبل الهبوط بنحو 0.1 ث، ونفّذها لحظة ملامسة الأرض.</li>
<li><strong>ارتفاع القفزة المتغيّر</strong> — إفلات الزر مبكرًا يقطع السرعة الصاعدة، فتعطي النقرة قفزة صغيرة ويعطي الضغط المستمر قفزة كاملة.</li></ul>
<aside class="example"><b>مثال عملي:</b> في اختبار دون وقت الذئب، سقط مختبِر في الحفرة نفسها 7 مرات وقال: «زر القفز لا يعمل دائمًا». أظهر السجل أن كل ضغطة جاءت بعد مغادرة الحافة بـ2 إلى 4 إطارات. مع 100 ملّي ثانية من وقت الذئب تجاوز المختبِر نفسه الحفرة من أول محاولة ولم يذكر التحكم مرة أخرى.</aside>
<p>لا يلاحظ اللاعبون هذه الميزات حين تكون موجودة، بل يلاحظونها فقط حين تغيب. لهذا تُسمّى تصميمًا غير مرئي.</p>
<aside class="pitfall"><b>خطأ شائع:</b> جعل وقت الذئب طويلًا جدًا (0.3 ث أو أكثر). حينها يمشي اللاعبون في الهواء بشكل واضح، وهذا يبدو خطأً برمجيًا في الاتجاه المعاكس.</aside>
<aside class="try"><b>جرّبها:</b> اختر الإعداد «بلا تسامح» في مختبر إحساس اللعب وحاول جمع كل العملات. ثم عُد إلى «مُحكم». عُدّ سقطاتك في كل مرة. <a class="go" href="#/lab/platformer">▶ قارن الإعدادات</a></aside>` }
    },
    {
      match: "Juice: feedback that sells the action", image: "/images/575670a06e353ca00bf22e763b30c5e3.jpg",
      en: { title: "Juice: feedback that sells the action", body: `<p>"Juice" is everything that makes an action feel strong without changing the rules: animation, particles, sound and camera. The same hit with and without juice can feel like two different games.</p>
<ul><li><strong>Squash & stretch</strong> — stretch on take-off, squash on landing. This principle comes straight from classic animation.</li>
<li><strong>Particles</strong> — dust on landing, sparks on a hit, sparkles on a pickup.</li>
<li><strong>Screen shake & hit-stop</strong> — freezing the game for 3–6 frames on a hit makes it feel heavy. Shake only for big events.</li>
<li><strong>Sound</strong> — every action needs a sound; vary the pitch by a few percent so repeats don't grate.</li></ul>
<figure class="fig"><img src="/images/575670a06e353ca00bf22e763b30c5e3.jpg" alt="Before and after comparison of player feedback"><figcaption>Before and after: the same moment with clear feedback (numbers, flashes, a reaction) reads instantly.</figcaption></figure>
<aside class="example"><b>Worked example:</b> A coin pickup, step by step. Version 1: the coin disappears. Version 2: add a short rising "ding". Version 3: the coin flies to the coin counter, which bounces once. Version 4: five small sparkles and a counter that briefly turns gold. Total extra work: about one hour. Testers described version 4 as "satisfying" without being asked.</aside>
<aside class="pitfall"><b>Common mistake:</b> Too much juice. If every small action shakes the screen, nothing feels special, and some players get motion sick. Always offer an option to reduce screen shake.</aside>
<aside class="try"><b>Try it:</b> In the Game Feel Lab, switch off squash, particles and shake, and play for 30 seconds. Then switch them back on. Same physics, different game. Then play Slime Arena and notice hit-stop and knockback. <a class="go" href="#/lab/platformer">▶ Game Feel Lab</a> <a class="go" href="#/lab/action">▶ Slime Arena</a></aside>` },
      ar: { title: "الحيوية: تغذية راجعة تُقنع اللاعب بالفعل", body: `<p>«الحيوية» (Juice) هي كل ما يجعل الفعل قوي الإحساس دون تغيير القواعد: التحريك والجسيمات والصوت والكاميرا. الضربة نفسها مع الحيوية ودونها قد تبدو لعبتين مختلفتين.</p>
<ul><li><strong>الانضغاط والتمدد</strong> — تمدّد عند الانطلاق، وانضغاط عند الهبوط. مبدأ مأخوذ مباشرة من التحريك الكلاسيكي.</li>
<li><strong>الجسيمات</strong> — غبار عند الهبوط، وشرر عند الضربة، وبريق عند الالتقاط.</li>
<li><strong>اهتزاز الشاشة والتجميد اللحظي</strong> — تجميد اللعبة 3 إلى 6 إطارات عند الضربة يجعلها ثقيلة. استخدم الاهتزاز للأحداث الكبيرة فقط.</li>
<li><strong>الصوت</strong> — كل فعل يحتاج صوتًا؛ غيّر طبقته بنسبة بسيطة حتى لا يزعج التكرار.</li></ul>
<figure class="fig"><img src="/images/575670a06e353ca00bf22e763b30c5e3.jpg" alt="مقارنة قبل وبعد للتغذية الراجعة للاعب"><figcaption>قبل وبعد: اللحظة نفسها مع تغذية راجعة واضحة (أرقام وومضات وردّ فعل) تُقرأ فورًا.</figcaption></figure>
<aside class="example"><b>مثال عملي:</b> التقاط عملة خطوة بخطوة. النسخة 1: تختفي العملة. النسخة 2: أضف رنينًا قصيرًا صاعدًا. النسخة 3: تطير العملة إلى عدّاد العملات فيقفز العدّاد مرة. النسخة 4: خمس شرارات صغيرة وعدّاد يتحول إلى الذهبي لحظة. العمل الإضافي كله نحو ساعة. وصف المختبِرون النسخة 4 بأنها «مُرضية» دون أن يُسألوا.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> الإفراط في الحيوية. إذا اهتزت الشاشة مع كل فعل صغير، فلن يبدو أي شيء مميزًا، وقد يشعر بعض اللاعبين بالدوار. وفّر دائمًا خيارًا لتقليل اهتزاز الشاشة.</aside>
<aside class="try"><b>جرّبها:</b> في مختبر إحساس اللعب أوقف الانضغاط والجسيمات والاهتزاز والعب 30 ثانية، ثم أعِدها. الفيزياء نفسها، واللعبة مختلفة. بعدها العب «حلبة الهلام» ولاحظ التجميد اللحظي والارتداد. <a class="go" href="#/lab/platformer">▶ مختبر إحساس اللعب</a> <a class="go" href="#/lab/action">▶ حلبة الهلام</a></aside>` }
    },
    {
      match: "Vector vs raster art for gameplay objects", image: "/images/28abc3dd8c7814dacf00f82a1777cf61.jpg",
      en: { title: "Vector vs raster art for gameplay objects", body: `<p>Game art comes in two families. <strong>Raster</strong> images (PNG, JPG) are grids of pixels: rich in texture, but they blur when scaled up. <strong>Vector</strong> images (SVG, or shapes in tools such as Inkscape or Illustrator) are stored as points and curves: they stay sharp at any size.</p>
<ul><li>Vector suits clean, flat styles: characters, coins, trees and platforms that can be exported at 1×, 2× and 4× from the same file, so the same asset serves a phone and a 4K monitor.</li>
<li>Raster suits painted, textured and pixel-art styles, where every pixel is a choice.</li></ul>
<p>Whatever you choose, keep each object on its own layer so it can become its own sprite, and name layers the way the game will use them: <em>player_idle_01</em>, <em>coin_spin_03</em>.</p>
<aside class="example"><b>Worked example:</b> A coin drawn as a vector circle is exported as a 64×64 PNG for phones and a 128×128 PNG for tablets, in seconds. Its <em>collision shape</em> in the game is just a circle with a radius of 28 px, slightly smaller than the art, so players never feel cheated by an invisible edge.</aside>
<p>Keep <strong>collision shapes</strong> simpler than the art: a capsule for the player, rectangles for platforms, circles for pickups. Detailed shapes make the physics slower and the game less fair.</p>
<aside class="pitfall"><b>Common mistake:</b> Making the hurtbox (where the player can be hit) as big as the drawing, hair and cape included. Players feel hits they "dodged". Make the hurtbox smaller than the art, and pickups' boxes slightly larger.</aside>
<aside class="try"><b>Try it:</b> In the Gallery, open "Vector graphics in game dev" and the pixel-art images. List which of your game's objects would be vector and which raster. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "الرسوم المتجهة أم النقطية لعناصر اللعب", body: `<p>تأتي رسوم الألعاب في عائلتين. الصور <strong>النقطية</strong> (PNG وJPG) شبكات من البكسلات: غنية بالتفاصيل والخامات، لكنها تتشوش عند التكبير. والصور <strong>المتجهة</strong> (SVG، أو الأشكال في أدوات مثل Inkscape وIllustrator) تُخزَّن كنقاط ومنحنيات، فتبقى حادة بأي حجم.</p>
<ul><li>المتجهة تناسب الأساليب النظيفة المسطحة: شخصيات وعملات وأشجار ومنصات يمكن تصديرها بحجم 1× و2× و4× من الملف نفسه، فيخدم العنصر نفسه الهاتف وشاشة 4K.</li>
<li>النقطية تناسب الأساليب المرسومة يدويًا والغنية بالخامات وفن البكسل، حيث كل بكسل قرار.</li></ul>
<p>أيًّا كان اختيارك، ضع كل عنصر في طبقة مستقلة ليصبح صورة مستقلة (Sprite)، وسمِّ الطبقات كما ستستخدمها اللعبة: <em>player_idle_01</em> و<em>coin_spin_03</em>.</p>
<aside class="example"><b>مثال عملي:</b> عملة مرسومة كدائرة متجهة تُصدَّر بصيغة PNG بحجم 64×64 للهواتف و128×128 للأجهزة اللوحية، في ثوانٍ. و<em>شكل التصادم</em> الخاص بها في اللعبة مجرد دائرة نصف قطرها 28 بكسل، أصغر قليلًا من الرسم، فلا يشعر اللاعبون أبدًا بأن حافة خفية خدعتهم.</aside>
<p>اجعل <strong>أشكال التصادم</strong> أبسط من الرسوم: كبسولة للاعب، ومستطيلات للمنصات، ودوائر للعناصر القابلة للالتقاط. الأشكال المفصّلة تجعل الفيزياء أبطأ واللعبة أقل عدلًا.</p>
<aside class="pitfall"><b>خطأ شائع:</b> جعل منطقة الإصابة (حيث يمكن ضرب اللاعب) بحجم الرسم كاملًا مع الشعر والعباءة. يشعر اللاعبون بضربات ظنوا أنهم تفادوها. اجعل منطقة الإصابة أصغر من الرسم، ومنطقة الالتقاط أكبر قليلًا.</aside>
<aside class="try"><b>جرّبها:</b> في المعرض افتح صورة «الرسم المتجهي في تطوير الألعاب» وصور فن البكسل. اكتب أي عناصر لعبتك ستكون متجهة وأيها نقطية. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Camera and controls: the invisible feel", image: "/images/459ecc606c237323534075bc3da63893.jpg",
      en: { title: "Camera and controls: the invisible feel", body: `<p>Players blame themselves for bad cameras and clumsy controls, then quietly stop playing. They rarely say "the camera is bad"; they say "I'm not good at this game". The camera decides what the player can see, and therefore what they can decide.</p>
<ul><li><strong>Look-ahead</strong> — place the camera slightly ahead of the player in the direction of movement (for example a quarter of the screen), so they see what is coming.</li>
<li><strong>Dead zone</strong> — let the character move inside a small central box before the camera follows, so the screen does not jitter with every step.</li>
<li><strong>Smoothing</strong> — follow with a short lag (0.1–0.2 s), but never so long that the player leaves the screen.</li>
<li><strong>Remapping</strong> — let players change the buttons, and support both keyboard and gamepad.</li></ul>
<aside class="example"><b>Worked example:</b> In a side-scroller with the camera centred on the hero, players kept running into enemies that appeared at the screen edge 0.4 s before contact, which is too little time to react. Moving the camera 25% ahead of the running direction doubled the warning time to 0.8 s. Deaths in that level fell by half without changing a single enemy.</aside>
<p>For controls, aim for <em>input latency</em> under 100 ms from button press to visible reaction. Start the animation on the same frame as the press, even if the full action follows a little later.</p>
<aside class="pitfall"><b>Common mistake:</b> A camera that follows the jump vertically. Every jump makes the screen bounce. Most platformers only move the camera up when the player lands on a higher platform.</aside>
<aside class="try"><b>Try it:</b> Play Checkpoint Rush and notice how much road you can see ahead. Ask yourself: if the camera showed half as much, would the game still be fair? <a class="go" href="#/lab/racing">▶ Play Checkpoint Rush</a></aside>` },
      ar: { title: "الكاميرا والتحكم: الإحساس الخفي", body: `<p>يلوم اللاعبون أنفسهم على الكاميرا السيئة والتحكم الثقيل، ثم يتوقفون عن اللعب بصمت. نادرًا ما يقولون «الكاميرا سيئة»، بل يقولون «لست جيدًا في هذه اللعبة». الكاميرا تحدد ما يستطيع اللاعب رؤيته، وبالتالي ما يستطيع أن يقرره.</p>
<ul><li><strong>الرؤية المسبقة</strong> — ضع الكاميرا متقدمة قليلًا أمام اللاعب في اتجاه حركته (مثلًا ربع الشاشة)، ليرى ما هو قادم.</li>
<li><strong>المنطقة الميتة</strong> — دع الشخصية تتحرك داخل صندوق صغير في الوسط قبل أن تتبعها الكاميرا، فلا ترتجّ الشاشة مع كل خطوة.</li>
<li><strong>التنعيم</strong> — اتبع اللاعب بتأخير قصير (0.1–0.2 ث)، لكن لا تجعله طويلًا إلى حد خروج اللاعب من الشاشة.</li>
<li><strong>إعادة تعيين الأزرار</strong> — اسمح للاعبين بتغيير الأزرار، وادعم لوحة المفاتيح ويد التحكم معًا.</li></ul>
<aside class="example"><b>مثال عملي:</b> في لعبة تمرير جانبي كانت الكاميرا فيها في منتصف البطل، ظل اللاعبون يصطدمون بأعداء يظهرون عند حافة الشاشة قبل التلامس بـ0.4 ث، وهو وقت أقل من أن يكفي للتفاعل. نقل الكاميرا 25% أمام اتجاه الركض ضاعف وقت التحذير إلى 0.8 ث. وانخفضت حالات الموت في تلك المرحلة إلى النصف دون تغيير عدو واحد.</aside>
<p>في التحكم، اجعل <em>زمن الاستجابة</em> أقل من 100 ملّي ثانية من ضغط الزر إلى رد الفعل المرئي. ابدأ التحريك في الإطار نفسه الذي حدث فيه الضغط، حتى لو جاء الفعل الكامل بعده بقليل.</p>
<aside class="pitfall"><b>خطأ شائع:</b> كاميرا تتبع القفزة عموديًا، فتقفز الشاشة مع كل قفزة. معظم ألعاب المنصات لا ترفع الكاميرا إلا حين يهبط اللاعب على منصة أعلى.</aside>
<aside class="try"><b>جرّبها:</b> العب «سباق نقاط التفتيش» ولاحظ كم من الطريق تستطيع رؤيته أمامك. اسأل نفسك: لو أظهرت الكاميرا نصف هذه المسافة، هل ستبقى اللعبة عادلة؟ <a class="go" href="#/lab/racing">▶ العب سباق نقاط التفتيش</a></aside>` }
    },
    {
      image: "/images/2a2d3667ba7e1d63e8bf0277e6a040f2.jpg",
      en: { title: "Workshop: tune a jump and write its spec", body: `<p>This workshop takes about <strong>30 minutes</strong> and uses the Game Feel Lab. You will design a jump for a specific kind of game and write it down so a programmer could rebuild it exactly.</p>
<ol><li><b>Pick a target feel</b> (2 min): choose one: "a heavy knight", "a light ninja" or "a cosy explorer".</li>
<li><b>Start from a preset</b> (3 min): Heavy for the knight, Tight for the ninja, Floaty for the explorer. Play one full run.</li>
<li><b>Tune height first</b> (5 min): change only jump height until the highest platform is just reachable.</li>
<li><b>Tune gravity and fall</b> (8 min): change gravity and the fall multiplier until the arc matches your target feel.</li>
<li><b>Add forgiveness</b> (5 min): set coyote time and jump buffer. Test running off every ledge.</li>
<li><b>Write the spec</b> (7 min): press "Copy values" and paste them into a note. Under the numbers, write two sentences on why each value fits your character.</li></ol>
<aside class="example"><b>What you hand in:</b> a short spec like: "Ninja jump — height 140, gravity 2600, fall ×2.0, air control 0.85, coyote 110 ms, buffer 120 ms. Fast rise and fast fall feel agile; high air control lets the player correct mid-air."</aside>
<aside class="pitfall"><b>Common mistake:</b> Changing four sliders at once. Change one, play, then decide.</aside>
<aside class="try"><b>Try it:</b> <a class="go" href="#/lab/platformer">▶ Start the workshop in the Game Feel Lab</a></aside>` },
      ar: { title: "ورشة تطبيقية: اضبط قفزة واكتب مواصفاتها", body: `<p>تستغرق هذه الورشة نحو <strong>30 دقيقة</strong> وتستخدم مختبر إحساس اللعب. ستصمم قفزة لنوع محدد من الألعاب وتكتبها بحيث يستطيع مبرمج إعادة بنائها بدقة.</p>
<ol><li><b>اختر الإحساس المطلوب</b> (دقيقتان): اختر واحدًا: «فارس ثقيل» أو «نينجا خفيف» أو «مستكشف هادئ».</li>
<li><b>ابدأ من إعداد مسبق</b> (3 دقائق): «ثقيل» للفارس، و«مُحكم» للنينجا، و«عائم» للمستكشف. العب جولة كاملة.</li>
<li><b>اضبط الارتفاع أولًا</b> (5 دقائق): غيّر ارتفاع القفزة فقط حتى تصبح أعلى منصة في المتناول بالكاد.</li>
<li><b>اضبط الجاذبية والسقوط</b> (8 دقائق): غيّر الجاذبية ومضاعف السقوط حتى يطابق القوس الإحساس المطلوب.</li>
<li><b>أضف التسامح</b> (5 دقائق): اضبط وقت الذئب وحفظ الضغطة. اختبر الركض خارج كل حافة.</li>
<li><b>اكتب المواصفات</b> (7 دقائق): اضغط «انسخ القيم» والصقها في ملاحظة. تحت الأرقام اكتب جملتين عن سبب مناسبة كل قيمة لشخصيتك.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> مواصفات قصيرة مثل: «قفزة النينجا — الارتفاع 140، الجاذبية 2600، السقوط ×2.0، التحكم في الهواء 0.85، وقت الذئب 110 ملّي ث، حفظ الضغطة 120 ملّي ث. الصعود السريع والسقوط السريع يمنحان خفة، والتحكم العالي في الهواء يتيح التصحيح أثناء القفز.»</aside>
<aside class="pitfall"><b>خطأ شائع:</b> تغيير أربعة منزلقات دفعة واحدة. غيّر واحدًا، والعب، ثم قرّر.</aside>
<aside class="try"><b>جرّبها:</b> <a class="go" href="#/lab/platformer">▶ ابدأ الورشة في مختبر إحساس اللعب</a></aside>` }
    }
  ],

  /* ================================================================ */
  balancing: [
    {
      match: "Balance lives in a spreadsheet", image: "/images/67876e3341e10e0e6b5b0fdca2c87054.jpg",
      en: { title: "Balance lives in a spreadsheet", body: `<p>Health, damage, prices and XP should never be scattered through code. Keep them in one <strong>spreadsheet</strong> (or a data file the game reads) so you can see the whole system at once and change a value without touching code.</p>
<p>Useful columns for any list of items or units: <em>cost</em>, <em>power</em>, <em>power per cost</em> and <em>time to kill</em> (how many seconds it takes to defeat a standard enemy).</p>
<aside class="example"><b>Worked example:</b> Three swords in a shop.<br>Wooden: 10 damage, costs 50 → 0.20 damage per coin.<br>Iron: 18 damage, costs 100 → 0.18 per coin.<br>Flame: 40 damage, costs 150 → 0.27 per coin.<br>The sheet shows at a glance that the flame sword is the best deal <em>and</em> the strongest: a <strong>dominant</strong> option. Raising its price to 220 brings it to 0.18 per coin. It is still the strongest, but now you pay for it, so buying the iron sword first becomes a real choice.</aside>
<p>Add a column for each enemy's health and you can compute time to kill directly: an enemy with 60 health and a sword hitting for 18 once per second takes 4 hits. If every weapon kills it in 1 hit, the enemy is not a challenge; if the starting weapon needs 12 hits, the start is a grind.</p>
<p>Change <strong>one value at a time</strong> and playtest after each change, or you will not know which change fixed the problem.</p>
<aside class="pitfall"><b>Common mistake:</b> Balancing on feeling alone. "This feels a bit strong" becomes clear when the sheet says "this is 40% more efficient than everything else".</aside>
<aside class="try"><b>Try it:</b> Play Three Battles in the Game Lab. Write down the enemy's damage, your potions and your MP. Can you calculate how many turns you can survive without healing? <a class="go" href="#/lab/rpg">▶ Play Three Battles</a></aside>` },
      ar: { title: "التوازن يعيش في جدول بيانات", body: `<p>لا ينبغي أن تتناثر قيم الصحة والضرر والأسعار ونقاط الخبرة داخل الشيفرة. احفظها في <strong>جدول بيانات</strong> واحد (أو ملف بيانات تقرؤه اللعبة)، لترى النظام كله دفعة واحدة وتغيّر قيمة دون لمس الشيفرة.</p>
<p>أعمدة مفيدة لأي قائمة من العناصر أو الوحدات: <em>التكلفة</em> و<em>القوة</em> و<em>القوة مقابل التكلفة</em> و<em>زمن القضاء على العدو</em> (كم ثانية يلزم لهزيمة عدو عادي).</p>
<aside class="example"><b>مثال عملي:</b> ثلاثة سيوف في متجر.<br>الخشبي: ضرر 10، السعر 50 ← 0.20 ضرر لكل عملة.<br>الحديدي: ضرر 18، السعر 100 ← 0.18 لكل عملة.<br>الناري: ضرر 40، السعر 150 ← 0.27 لكل عملة.<br>يظهر الجدول بلمحة أن السيف الناري هو الصفقة الأفضل <em>و</em>الأقوى معًا: خيار <strong>مهيمن</strong>. رفع سعره إلى 220 يجعله 0.18 لكل عملة. يبقى الأقوى، لكنك الآن تدفع ثمن قوته، فيصبح شراء الحديدي أولًا خيارًا حقيقيًا.</aside>
<p>أضف عمودًا لصحة كل عدو وستحسب زمن القضاء عليه مباشرة: عدو صحته 60 وسيف يضرب 18 مرة في الثانية يحتاج 4 ضربات. إذا قتلته كل الأسلحة بضربة واحدة فهو ليس تحديًا، وإذا احتاج السلاح الأول 12 ضربة فالبداية مملة ومرهقة.</p>
<p>غيّر <strong>قيمة واحدة في كل مرة</strong> واختبر بعد كل تغيير، وإلا فلن تعرف أي تغيير حلّ المشكلة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> الموازنة بالإحساس وحده. «هذا يبدو قويًا قليلًا» تصبح واضحة حين يقول الجدول «هذا أكفأ من كل ما عداه بنسبة 40%».</aside>
<aside class="try"><b>جرّبها:</b> العب «ثلاث معارك» في مختبر اللعب. دوّن ضرر العدو وجرعاتك ونقاط السحر. هل تستطيع حساب عدد الأدوار التي تنجو فيها دون علاج؟ <a class="go" href="#/lab/rpg">▶ العب ثلاث معارك</a></aside>` }
    },
    {
      match: "Difficulty curves and flow", image: "/images/8d2272b72b5edf0309b308c9211f0036.jpg",
      en: { title: "Difficulty curves and flow", body: `<p>Psychologist Mihaly Csikszentmihalyi described <strong>flow</strong>: deep, effortless focus that happens when the challenge sits just above the player's skill. Too hard means anxiety; too easy means boredom. Since players' skill grows as they play, the challenge must grow too.</p>
<p>A good difficulty curve is a <strong>saw-tooth</strong>, not a straight ramp: tension rises to a peak (a hard level or a boss), drops for a breather (an easy level, a shop, a story scene), then climbs again to a slightly higher peak.</p>
<aside class="example"><b>Worked example:</b> A puzzle game with 20 levels. Levels 1–3 teach, 4 is a small peak, 5 is a breather with a new toy, 6–9 rise, 10 is a big peak, 11 is a breather that introduces a new mechanic, and so on. Each breather is still a little harder than the previous breather. A designer can draw this on paper as a jagged line climbing to the right, and mark each level on it before building any of them.</aside>
<p><em>Dynamic difficulty</em> means the game adjusts itself: a little more health after three deaths in a row, or fewer enemies for a struggling player. It can help, but players often dislike it when they notice it, because it makes their success feel unearned. Many games prefer to <em>offer</em> help ("Want an easier mode for this section?") rather than apply it silently.</p>
<aside class="pitfall"><b>Common mistake:</b> Testing difficulty only with yourself. You know the game better than anyone; the curve that feels gentle to you is a wall for a new player. Ask three new testers to play the first ten minutes.</aside>
<aside class="try"><b>Try it:</b> Play Meteor Storm and note the second where it starts to feel stressful. That moment is the edge of your flow channel. Then play Gem Quest and see how each level adds one new obstacle. <a class="go" href="#/lab/arcade">▶ Meteor Storm</a> <a class="go" href="#/lab/puzzle">▶ Gem Quest</a></aside>` },
      ar: { title: "منحنيات الصعوبة وحالة التدفق", body: `<p>وصف عالم النفس ميهاي تشيكسنتميهاي حالة <strong>التدفق</strong>: تركيز عميق بلا جهد يحدث حين يكون التحدي أعلى قليلًا من مهارة اللاعب. الصعب جدًا يعني القلق، والسهل جدًا يعني الملل. ولأن مهارة اللاعب تنمو أثناء اللعب، يجب أن ينمو التحدي معها.</p>
<p>منحنى الصعوبة الجيد يشبه <strong>أسنان المنشار</strong> لا الخط المستقيم: يرتفع التوتر إلى قمة (مرحلة صعبة أو زعيم)، ثم ينخفض لاستراحة (مرحلة سهلة أو متجر أو مشهد قصصي)، ثم يرتفع مجددًا إلى قمة أعلى قليلًا.</p>
<aside class="example"><b>مثال عملي:</b> لعبة ألغاز من 20 مرحلة. المراحل 1–3 للتعليم، و4 قمة صغيرة، و5 استراحة مع أداة جديدة، و6–9 صعود، و10 قمة كبيرة، و11 استراحة تقدّم آلية جديدة، وهكذا. كل استراحة أصعب قليلًا من الاستراحة التي قبلها. يستطيع المصمم رسم ذلك على ورقة كخط متعرج يصعد نحو اليمين، ويحدد عليه موضع كل مرحلة قبل بناء أي منها.</aside>
<p><em>الصعوبة الديناميكية</em> تعني أن اللعبة تعدّل نفسها: صحة أكثر قليلًا بعد ثلاث خسارات متتالية، أو أعداء أقل للاعب المتعثّر. قد تفيد، لكن اللاعبين كثيرًا ما يكرهونها حين يلاحظونها، لأنها تجعل نجاحهم يبدو غير مستحق. لذلك تفضّل ألعاب كثيرة أن <em>تعرض</em> المساعدة («هل تريد وضعًا أسهل لهذا الجزء؟») بدل تطبيقها بصمت.</p>
<aside class="pitfall"><b>خطأ شائع:</b> اختبار الصعوبة بنفسك فقط. أنت تعرف اللعبة أكثر من أي أحد، والمنحنى الذي تراه لطيفًا هو جدار أمام اللاعب الجديد. اطلب من ثلاثة مختبِرين جدد لعب أول عشر دقائق.</aside>
<aside class="try"><b>جرّبها:</b> العب «عاصفة النيازك» ودوّن الثانية التي بدأت فيها تشعر بالضغط. تلك اللحظة هي حافة قناة التدفق لديك. ثم العب «مغامرة الجواهر» ولاحظ كيف تضيف كل مرحلة عائقًا جديدًا واحدًا. <a class="go" href="#/lab/arcade">▶ عاصفة النيازك</a> <a class="go" href="#/lab/puzzle">▶ مغامرة الجواهر</a></aside>` }
    },
    {
      match: "Sources and sinks", image: "/images/7b9032db95f04bf1811e84e6d97648b2.jpg",
      en: { title: "Sources and sinks", body: `<p>Every game economy has <strong>sources</strong>, where gold, wood or gems come from (quests, enemies, daily rewards, selling items), and <strong>sinks</strong>, where they go (upgrades, repairs, consumables, cosmetics, fees).</p>
<p>Picture a bathtub: sources are taps, sinks are drains. If the taps run faster than the drains, the tub overflows and you get <strong>inflation</strong>: players hoard millions, prices stop mattering and nothing is exciting to buy. If the drains are faster, the game feels stingy and players stop trying.</p>
<aside class="example"><b>Worked example:</b> A farming game. In one hour of play the player earns: crops 600, quests 250, selling fish 150 → 1,000 gold per hour. They spend: seeds 300, tool upgrades 400, decorations 100 → 800 per hour. Surplus: 200 per hour. After 20 hours the player has 4,000 spare gold. Is there anything worth 4,000? If not, add a long-term sink, such as a barn expansion costing 5,000, so the surplus has a goal.</aside>
<p>Track two numbers in your balance sheet: <em>currency earned per hour</em> and <em>currency spent per hour</em>, at hour 1, hour 5 and hour 20. Keep the gap small early on and give large, aspirational sinks for later.</p>
<aside class="pitfall"><b>Common mistake:</b> Adding a new source (a daily login reward, a new quest line) without adding a sink to match. Every source needs a matching drain.</aside>
<aside class="try"><b>Try it:</b> Play Tiny Farm for three minutes. Write down your sources (harvests) and sinks (seeds, land, upgrades). Is the economy growing too fast or too slowly? Then read the Stardew Valley breakdown. <a class="go" href="#/lab/simulation">▶ Tiny Farm</a> <a class="go" href="#/games/stardew">▶ Stardew Valley breakdown</a></aside>` },
      ar: { title: "المصادر والمصارف", body: `<p>لكل اقتصاد في لعبة <strong>مصادر</strong> يأتي منها الذهب أو الخشب أو الجواهر (المهام والأعداء والمكافآت اليومية وبيع الأغراض)، و<strong>مصارف</strong> تذهب إليها (الترقيات والإصلاح والمستهلكات والأزياء والرسوم).</p>
<p>تخيّل حوض استحمام: المصادر صنابير، والمصارف فتحات تصريف. إذا تدفقت الصنابير أسرع من التصريف فاض الحوض وحدث <strong>التضخم</strong>: يكدّس اللاعبون الملايين، وتفقد الأسعار معناها، ولا يبقى شيء مثير للشراء. وإذا كان التصريف أسرع، تبدو اللعبة بخيلة ويتوقف اللاعبون عن المحاولة.</p>
<aside class="example"><b>مثال عملي:</b> لعبة مزرعة. في ساعة لعب واحدة يكسب اللاعب: محاصيل 600، ومهام 250، وبيع سمك 150 ← 1,000 ذهبة في الساعة. وينفق: بذور 300، وترقية أدوات 400، وزينة 100 ← 800 في الساعة. الفائض: 200 في الساعة. بعد 20 ساعة يملك اللاعب 4,000 ذهبة فائضة. هل هناك شيء يستحق 4,000؟ إن لم يكن، فأضف مصرفًا طويل الأمد، مثل توسعة الحظيرة بـ5,000، ليصبح للفائض هدف.</aside>
<p>تابع رقمين في جدول التوازن: <em>العملة المكتسبة في الساعة</em> و<em>العملة المنفقة في الساعة</em>، عند الساعة 1 والساعة 5 والساعة 20. اجعل الفجوة صغيرة في البداية، وقدّم مصارف كبيرة طموحة للمراحل اللاحقة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> إضافة مصدر جديد (مكافأة دخول يومية أو سلسلة مهام جديدة) دون إضافة مصرف يقابله. كل صنبور يحتاج فتحة تصريف تقابله.</aside>
<aside class="try"><b>جرّبها:</b> العب «المزرعة الصغيرة» ثلاث دقائق. دوّن مصادرك (المحاصيل) ومصارفك (البذور والأراضي والترقيات). هل ينمو الاقتصاد بسرعة كبيرة أم ببطء؟ ثم اقرأ تحليل Stardew Valley. <a class="go" href="#/lab/simulation">▶ المزرعة الصغيرة</a> <a class="go" href="#/games/stardew">▶ تحليل Stardew Valley</a></aside>` }
    },
    {
      match: "Dominant strategies", image: "/images/df9a9615d48fa95c249a3b296a4b8220.jpg",
      en: { title: "Dominant strategies", body: `<p>A <strong>dominant strategy</strong> is one option that is always best, whatever the situation. Once players find it, every other choice in your game stops being a decision, and the game becomes a routine.</p>
<p>Three tools keep options alive:</p>
<ul><li><strong>Rock–paper–scissors</strong> relationships: each option is strong against something and weak against something else. Archers beat infantry, cavalry beats archers, infantry with spears beats cavalry.</li>
<li><strong>Trade-offs</strong>: fast but fragile, strong but slow, cheap but short-lived.</li>
<li><strong>Situational value</strong>: fire is great in the forest and useless in the lake level.</li></ul>
<aside class="example"><b>Worked example:</b> In a lane battler, playtest data showed that 9 of 10 players opened with the same giant unit. It cost 5 energy, had 2,000 health and beat every other unit one-on-one. The fix was not to weaken it much, but to give it a counter: a cheap 3-energy unit that deals triple damage to large units. The giant stayed popular, but now players had to <em>think</em> about when to play it, because the opponent might be holding the counter.</aside>
<p>Watch what testers pick. If everyone picks the same thing, either it is too strong or the others are too weak. Before you weaken the favourite, check whether you can make another option more interesting instead.</p>
<aside class="pitfall"><b>Common mistake:</b> "Fixing" a dominant option by making it useless. Players liked it for a reason; nerf it gently and give others a niche.</aside>
<aside class="try"><b>Try it:</b> Read the Clash Royale breakdown and find its counter relationships. Then play Four in a Row: notice that no single opening move always wins, because every move both attacks and defends. <a class="go" href="#/games/clash-royale">▶ Clash Royale breakdown</a> <a class="go" href="#/lab/board">▶ Four in a Row</a></aside>` },
      ar: { title: "الاستراتيجيات المهيمنة", body: `<p><strong>الاستراتيجية المهيمنة</strong> خيار هو الأفضل دائمًا مهما كان الموقف. حين يكتشفها اللاعبون، تتوقف كل الخيارات الأخرى في لعبتك عن أن تكون قرارات، وتتحول اللعبة إلى روتين.</p>
<p>ثلاث أدوات تُبقي الخيارات حيّة:</p>
<ul><li>علاقات <strong>حجر-ورقة-مقص</strong>: كل خيار قوي أمام شيء وضعيف أمام شيء آخر. الرماة يغلبون المشاة، والفرسان يغلبون الرماة، والمشاة بالرماح يغلبون الفرسان.</li>
<li><strong>المقايضات</strong>: سريع لكنه هش، قوي لكنه بطيء، رخيص لكن عمره قصير.</li>
<li><strong>القيمة الظرفية</strong>: النار رائعة في الغابة وعديمة الفائدة في مرحلة البحيرة.</li></ul>
<aside class="example"><b>مثال عملي:</b> في لعبة معارك الممرات، أظهرت بيانات الاختبار أن 9 من كل 10 لاعبين يبدؤون بالوحدة العملاقة نفسها. كانت تكلّف 5 طاقة، وصحتها 2,000، وتغلب كل وحدة أخرى في مواجهة فردية. لم يكن الحل إضعافها كثيرًا، بل منحها مضادًّا: وحدة رخيصة بـ3 طاقة تضرب الوحدات الكبيرة ثلاثة أضعاف. بقي العملاق محبوبًا، لكن صار على اللاعبين أن <em>يفكروا</em> متى يلعبونه، لأن الخصم قد يحتفظ بالمضاد.</aside>
<p>راقب ما يختاره المختبِرون. إذا اختار الجميع الشيء نفسه، فإما أنه قوي جدًا أو أن البقية ضعيفة جدًا. قبل أن تُضعف الخيار المفضّل، تحقق إن كان بإمكانك جعل خيار آخر أكثر إثارة بدلًا من ذلك.</p>
<aside class="pitfall"><b>خطأ شائع:</b> «إصلاح» الخيار المهيمن بجعله عديم الفائدة. أحبه اللاعبون لسبب ما؛ أضعفه بلطف وامنح الخيارات الأخرى دورًا خاصًا بها.</aside>
<aside class="try"><b>جرّبها:</b> اقرأ تحليل Clash Royale وابحث عن علاقات المضادات فيه. ثم العب «أربعة في صف»: لاحظ أنه لا توجد نقلة افتتاحية تفوز دائمًا، لأن كل نقلة تهاجم وتدافع في آن واحد. <a class="go" href="#/games/clash-royale">▶ تحليل Clash Royale</a> <a class="go" href="#/lab/board">▶ أربعة في صف</a></aside>` }
    },
    {
      image: "/images/9aa17f877788c113b2d7a4d70618559e.jpg",
      en: { title: "XP and level curves", body: `<p>How much XP should level 2 need? And level 30? The answer is a <strong>level curve</strong>, a formula that sets the XP required for each level. Three common shapes:</p>
<ul><li><b>Linear</b> — every level needs the same extra amount (100, 200, 300…). Simple, but late levels come too fast because rewards also grow.</li>
<li><b>Exponential</b> — each level needs a fixed percentage more (for example ×1.15). Early levels fly by; late levels become a long climb.</li>
<li><b>Polynomial</b> — XP = base × level², a middle path used by many RPGs.</li></ul>
<aside class="example"><b>Worked example:</b> Formula: XP to next level = 100 × level^1.5.<br>Level 1 → 2: 100 XP.<br>Level 5 → 6: 100 × 11.2 ≈ 1,118 XP.<br>Level 10 → 11: 100 × 31.6 ≈ 3,162 XP.<br>If an average enemy at level 10 gives 120 XP, the player needs about 26 fights per level. If one fight takes 40 seconds, that is roughly 17 minutes per level, a pace you can now check against your target playtime.</aside>
<p>Always check the curve against <strong>time</strong>, not just XP: "how many minutes of play is level 10?" is the question that matters. A level-up every few minutes early on, and every 15–30 minutes later, is a common target.</p>
<aside class="pitfall"><b>Common mistake:</b> A curve that grows faster than rewards. Players hit a wall where progress almost stops, and they leave. Plot both the XP needed and the XP earned per hour on the same chart.</aside>
<aside class="try"><b>Try it:</b> This platform uses XP too. Open your profile and look at your XP and badges, then play Three Battles and watch how quickly the first level-ups arrive. <a class="go" href="#/profile">▶ Your profile</a> <a class="go" href="#/lab/rpg">▶ Three Battles</a></aside>` },
      ar: { title: "منحنيات الخبرة والمستويات", body: `<p>كم نقطة خبرة يحتاج المستوى 2؟ والمستوى 30؟ الجواب هو <strong>منحنى المستويات</strong>، معادلة تحدد الخبرة المطلوبة لكل مستوى. ثلاثة أشكال شائعة:</p>
<ul><li><b>خطّي</b> — كل مستوى يحتاج الزيادة نفسها (100، 200، 300…). بسيط، لكن المستويات المتأخرة تأتي بسرعة كبيرة لأن المكافآت تكبر أيضًا.</li>
<li><b>أُسّي</b> — كل مستوى يحتاج نسبة ثابتة إضافية (مثلًا ×1.15). المستويات الأولى تمر بسرعة، والمتأخرة تصبح تسلقًا طويلًا.</li>
<li><b>متعدد الحدود</b> — الخبرة = الأساس × المستوى²، طريق وسط تستخدمه ألعاب أدوار كثيرة.</li></ul>
<aside class="example"><b>مثال عملي:</b> المعادلة: الخبرة للمستوى التالي = 100 × المستوى^1.5.<br>من 1 إلى 2: 100 نقطة.<br>من 5 إلى 6: 100 × 11.2 ≈ 1,118 نقطة.<br>من 10 إلى 11: 100 × 31.6 ≈ 3,162 نقطة.<br>إذا أعطى العدو المتوسط في المستوى 10 مقدار 120 نقطة، يحتاج اللاعب نحو 26 معركة لكل مستوى. وإذا استغرقت المعركة 40 ثانية، فهذا قرابة 17 دقيقة لكل مستوى، وهي وتيرة يمكنك الآن مقارنتها بمدة اللعب المستهدفة.</aside>
<p>قارن المنحنى دائمًا <strong>بالوقت</strong> لا بالخبرة فقط: «كم دقيقة لعب يستغرق المستوى 10؟» هو السؤال المهم. ارتقاء كل بضع دقائق في البداية، وكل 15 إلى 30 دقيقة لاحقًا، هدف شائع.</p>
<aside class="pitfall"><b>خطأ شائع:</b> منحنى ينمو أسرع من المكافآت. يصطدم اللاعبون بجدار يكاد يتوقف عنده التقدم، فيغادرون. ارسم الخبرة المطلوبة والخبرة المكتسبة في الساعة على الرسم البياني نفسه.</aside>
<aside class="try"><b>جرّبها:</b> هذه المنصة تستخدم نقاط الخبرة أيضًا. افتح ملفك الشخصي وانظر إلى خبرتك وأوسمتك، ثم العب «ثلاث معارك» ولاحظ سرعة وصول أول ارتقاءات. <a class="go" href="#/profile">▶ ملفك الشخصي</a> <a class="go" href="#/lab/rpg">▶ ثلاث معارك</a></aside>` }
    },
    {
      image: "/images/df9a9615d48fa95c249a3b296a4b8220.jpg",
      en: { title: "Workshop: balance a three-item shop", body: `<p>This workshop takes about <strong>35 minutes</strong>. You will design three items for a small shop, put them in a table and adjust them until each one is a reasonable choice. A spreadsheet helps, but paper works too.</p>
<ol><li><b>Context</b> (3 min): the player earns about 100 gold per level. Enemies have 60 health.</li>
<li><b>Draft</b> (7 min): invent three weapons with damage, attack speed (hits per second) and price.</li>
<li><b>Compute</b> (8 min): for each, work out damage per second (DPS = damage × speed), DPS per 100 gold, and time to kill one enemy (60 ÷ DPS).</li>
<li><b>Spot problems</b> (5 min): is one weapon better on every column? That is a dominant option.</li>
<li><b>Add a trade-off</b> (7 min): give each weapon one reason to exist: range, a special effect against armour, or a lower price.</li>
<li><b>Justify</b> (5 min): write one line per weapon: "a player would choose this when…".</li></ol>
<aside class="example"><b>What you hand in:</b> a table such as: Dagger — 8 dmg, 2.5/s, 60 gold → 20 DPS, kills in 3.0 s, "when you need speed and are poor". Axe — 30 dmg, 0.6/s, 150 gold → 18 DPS, kills in 3.3 s, "against armoured enemies, ignores 50% armour". Bow — 12 dmg, 1/s, 120 gold → 12 DPS, kills in 5 s, "when you must stay out of reach".</aside>
<aside class="pitfall"><b>Common mistake:</b> Making the most expensive item best at everything. Price alone is not a trade-off once the player is rich.</aside>
<aside class="try"><b>Try it:</b> Test your thinking in Path Defense: each tower choice is a small balance decision between cost, range and damage. <a class="go" href="#/lab/strategy">▶ Play Path Defense</a></aside>` },
      ar: { title: "ورشة تطبيقية: وازن متجرًا من ثلاثة أغراض", body: `<p>تستغرق هذه الورشة نحو <strong>35 دقيقة</strong>. ستصمم ثلاثة أغراض لمتجر صغير، وتضعها في جدول، وتعدّلها حتى يصبح كل منها خيارًا معقولًا. جدول البيانات يساعد، لكن الورق يكفي.</p>
<ol><li><b>السياق</b> (3 دقائق): يكسب اللاعب نحو 100 ذهبة في كل مرحلة. صحة الأعداء 60.</li>
<li><b>المسودة</b> (7 دقائق): اخترع ثلاثة أسلحة لكل منها ضرر وسرعة هجوم (ضربات في الثانية) وسعر.</li>
<li><b>الحساب</b> (8 دقائق): احسب لكل سلاح الضرر في الثانية (DPS = الضرر × السرعة)، والضرر في الثانية لكل 100 ذهبة، وزمن القضاء على عدو واحد (60 ÷ DPS).</li>
<li><b>اكتشف المشكلات</b> (5 دقائق): هل يتفوق سلاح واحد في كل الأعمدة؟ هذا خيار مهيمن.</li>
<li><b>أضف مقايضة</b> (7 دقائق): امنح كل سلاح سببًا للوجود: المدى، أو تأثير خاص ضد الدروع، أو سعر أقل.</li>
<li><b>برّر</b> (5 دقائق): اكتب سطرًا لكل سلاح: «سيختار اللاعب هذا حين…».</li></ol>
<aside class="example"><b>ما تسلّمه:</b> جدول مثل: الخنجر — ضرر 8، 2.5/ث، 60 ذهبة ← 20 DPS، يقتل في 3.0 ث، «حين تحتاج السرعة ومالك قليل». الفأس — ضرر 30، 0.6/ث، 150 ذهبة ← 18 DPS، يقتل في 3.3 ث، «ضد الأعداء المدرّعين، يتجاهل 50% من الدرع». القوس — ضرر 12، 1/ث، 120 ذهبة ← 12 DPS، يقتل في 5 ث، «حين يجب أن تبقى بعيدًا».</aside>
<aside class="pitfall"><b>خطأ شائع:</b> جعل الغرض الأغلى هو الأفضل في كل شيء. السعر وحده ليس مقايضة حين يصبح اللاعب غنيًا.</aside>
<aside class="try"><b>جرّبها:</b> اختبر تفكيرك في «الدفاع عن الطريق»: كل اختيار لبرج قرار توازن صغير بين التكلفة والمدى والضرر. <a class="go" href="#/lab/strategy">▶ العب الدفاع عن الطريق</a></aside>` }
    }
  ],

  /* ================================================================ */
  levels: [
    {
      match: "Teach → Test → Twist", image: "/images/4fe63357a6e5a321c216b3c8552b8d2b.jpg",
      en: { title: "Teach → Test → Twist", body: `<p>Players learn by doing, not by reading. Good levels introduce every mechanic in three beats:</p>
<ol><li><strong>Teach</strong> it in a safe space where failure costs nothing. One new idea, nothing else on screen.</li>
<li><strong>Test</strong> it with real stakes: a pit below, an enemy nearby, a timer.</li>
<li><strong>Twist</strong> it by combining it with something the player already knows, or by changing one condition.</li></ol>
<aside class="example"><b>Worked example:</b> Mechanic: a spring that launches the player upward.<br><b>Teach:</b> a spring on flat ground below a ledge with a coin. Missing costs nothing; you just try again.<br><b>Test:</b> the spring sits on a small platform over a pit. Now a miss costs a life.<br><b>Twist:</b> the spring is on a moving platform, so the player must time the bounce. Later, combine it with an enemy you can bounce on to reach the spring. One mechanic, four rooms of content.</aside>
<p>The first level of many classic platformers teaches running, jumping, enemies and power-ups without a single line of tutorial text. The level's shape makes the lesson unavoidable: the first enemy walks towards you on flat ground, so you must jump over it or on it.</p>
<p>This structure also gives you a way to <em>make content</em>: for each new mechanic, plan its teach, test and twist rooms. Five mechanics give you fifteen rooms and their combinations give you dozens more.</p>
<aside class="pitfall"><b>Common mistake:</b> Teaching two new things at once. If the player fails, they cannot tell which one they did not understand.</aside>
<aside class="try"><b>Try it:</b> Play Gem Quest and notice how each new obstacle first appears alone, then in harder layouts. Then read the Mario breakdown in the Games Showcase. <a class="go" href="#/lab/puzzle">▶ Gem Quest</a> <a class="go" href="#/games/mario">▶ Mario breakdown</a></aside>` },
      ar: { title: "علّم ← اختبر ← أضف لمسة", body: `<p>يتعلم اللاعبون بالفعل لا بالقراءة. المراحل الجيدة تقدّم كل آلية في ثلاث خطوات:</p>
<ol><li><strong>علّم</strong> الآلية في مكان آمن لا يكلّف فيه الفشل شيئًا. فكرة جديدة واحدة ولا شيء غيرها على الشاشة.</li>
<li><strong>اختبر</strong> الآلية بمخاطرة حقيقية: حفرة في الأسفل، أو عدو قريب، أو مؤقت.</li>
<li><strong>أضف لمسة</strong> بدمجها مع شيء يعرفه اللاعب، أو بتغيير شرط واحد.</li></ol>
<aside class="example"><b>مثال عملي:</b> الآلية: نابض يقذف اللاعب إلى الأعلى.<br><b>علّم:</b> نابض على أرض مستوية تحت حافة عليها عملة. الإخفاق لا يكلّف شيئًا؛ تحاول مرة أخرى فقط.<br><b>اختبر:</b> النابض على منصة صغيرة فوق حفرة. الآن الإخفاق يكلّف حياة.<br><b>أضف لمسة:</b> النابض على منصة متحركة، فيجب على اللاعب توقيت القفزة. لاحقًا ادمجه مع عدو تقفز فوقه لتصل إلى النابض. آلية واحدة، وأربع غرف من المحتوى.</aside>
<p>المرحلة الأولى في كثير من ألعاب المنصات الكلاسيكية تعلّم الركض والقفز والأعداء والتقويات دون سطر واحد من نص الشرح. شكل المرحلة يجعل الدرس محتومًا: أول عدو يمشي نحوك على أرض مستوية، فيجب أن تقفز فوقه أو عليه.</p>
<p>هذا البناء يمنحك أيضًا طريقة <em>لصنع المحتوى</em>: لكل آلية جديدة خطّط غرف التعليم والاختبار واللمسة. خمس آليات تعطيك خمس عشرة غرفة، ودمجها يعطيك عشرات أخرى.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تعليم شيئين جديدين معًا. إذا فشل اللاعب، فلن يعرف أيهما لم يفهم.</aside>
<aside class="try"><b>جرّبها:</b> العب «مغامرة الجواهر» ولاحظ كيف يظهر كل عائق جديد وحده أولًا، ثم في ترتيبات أصعب. ثم اقرأ تحليل ماريو في معرض الألعاب. <a class="go" href="#/lab/puzzle">▶ مغامرة الجواهر</a> <a class="go" href="#/games/mario">▶ تحليل ماريو</a></aside>` }
    },
    {
      match: "The saga map: progression you can see", image: "/images/8d2272b72b5edf0309b308c9211f0036.jpg",
      en: { title: "The saga map: progression you can see", body: `<p>Casual mobile games present levels as a winding path of numbered nodes, the <strong>saga map</strong>. It looks like decoration, but every part of it is a piece of design that answers a question the player has:</p>
<ul><li><b>Where am I?</b> A pin or avatar on the current level.</li>
<li><b>How well did I do?</b> One to three stars per level. Stars invite replay for mastery without forcing it.</li>
<li><b>What's ahead?</b> Grey, locked nodes create anticipation.</li>
<li><b>How far have I come?</b> The path behind you is a visible record of effort.</li></ul>
<p>Rivers, bridges and changes of scenery split the path into <strong>chapters</strong>. Each chapter usually introduces one new obstacle and ends with a harder level, the saw-tooth curve drawn as a map.</p>
<aside class="example"><b>Worked example:</b> Chapter 2 of a match-3 game: levels 11–25 on a beach. Level 11 introduces sand blocks; 12–14 teach them; 15 is a small peak; 16 is a breather; 17–24 combine sand with earlier ice blocks; 25 is the chapter peak, with a bridge to a new area after it. Players who reach the bridge feel a clear sense of "I finished something", even though the game continues.</aside>
<aside class="pitfall"><b>Common mistake:</b> Making the map so long that the next chapter is never visible. Show a glimpse of the next area so there is always something to look forward to.</aside>
<aside class="try"><b>Try it:</b> The adventure map of this platform's lessons works the same way: regions unlock in order and you earn stars. Open it and look at it as a designer. Then read the Candy Crush breakdown. <a class="go" href="#/learn">▶ The adventure map</a> <a class="go" href="#/games/candy-crush">▶ Candy Crush breakdown</a></aside>` },
      ar: { title: "خريطة الملحمة: تقدّم تراه بعينك", body: `<p>تعرض ألعاب الجوال الخفيفة المراحل كطريق متعرج من العُقد المرقّمة، وتسمّى <strong>خريطة الملحمة</strong>. تبدو زينة، لكن كل جزء منها قطعة تصميم تجيب عن سؤال لدى اللاعب:</p>
<ul><li><b>أين أنا؟</b> دبّوس أو صورة اللاعب على المرحلة الحالية.</li>
<li><b>كم أحسنت؟</b> من نجمة إلى ثلاث لكل مرحلة. النجوم تدعو إلى إعادة اللعب للإتقان دون فرضها.</li>
<li><b>ما القادم؟</b> العقد الرمادية المقفلة تصنع الترقّب.</li>
<li><b>كم قطعت؟</b> الطريق خلفك سجلّ مرئي لجهدك.</li></ul>
<p>الأنهار والجسور وتغيّر المناظر تقسم الطريق إلى <strong>فصول</strong>. كل فصل يقدّم عادة عائقًا جديدًا واحدًا وينتهي بمرحلة أصعب، أي منحنى أسنان المنشار مرسومًا كخريطة.</p>
<aside class="example"><b>مثال عملي:</b> الفصل الثاني من لعبة مطابقة ثلاثية: المراحل 11–25 على شاطئ. المرحلة 11 تقدّم كتل الرمل، و12–14 تعلّمها، و15 قمة صغيرة، و16 استراحة، و17–24 تدمج الرمل مع كتل الجليد السابقة، و25 قمة الفصل يليها جسر إلى منطقة جديدة. اللاعب الذي يصل إلى الجسر يشعر بوضوح أنه «أنهى شيئًا»، رغم أن اللعبة مستمرة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> جعل الخريطة طويلة إلى حد ألّا يظهر الفصل التالي أبدًا. أظهر لمحة من المنطقة التالية ليبقى هناك دائمًا ما يُنتظر.</aside>
<aside class="try"><b>جرّبها:</b> خريطة المغامرة لدروس هذه المنصة تعمل بالطريقة نفسها: المناطق تُفتح بالترتيب وتكسب نجومًا. افتحها وانظر إليها بعين المصمم. ثم اقرأ تحليل Candy Crush. <a class="go" href="#/learn">▶ خريطة المغامرة</a> <a class="go" href="#/games/candy-crush">▶ تحليل Candy Crush</a></aside>` }
    },
    {
      match: "Paths, landmarks and leading lines", image: "/images/7b9032db95f04bf1811e84e6d97648b2.jpg",
      en: { title: "Paths, landmarks and leading lines", body: `<p>A level must tell the player where to go without words. Three tools do most of the work:</p>
<ul><li><strong>Paths</strong> — the strongest guide in level art. A light trail on dark grass, a road, a line of lamps. The eye follows it before the player decides to.</li>
<li><strong>Landmarks</strong> — unique, visible objects that give places a name: a tall tower, a broken statue, a giant tree. Players navigate by them ("go past the well, then left at the sign").</li>
<li><strong>Leading lines</strong> — edges in the art (fences, rivers, cliff edges, roof lines) that point towards the goal.</li></ul>
<p>In this forest map the sandy trail carries the eye from bottom to top, crossing the river twice. A well, a stone flower shrine and a signpost act as landmarks, so the player always knows where they are.</p>
<aside class="example"><b>Worked example:</b> An open area had three exits and testers wandered for minutes. The designer made three changes: the correct exit got a warm light and a short path of lighter stones; a tall tower was placed behind it, visible from anywhere in the area; the two optional exits were darker and narrower. Average time to find the exit fell from 3 minutes to 40 seconds, and the optional areas were still found by curious players.</aside>
<p>Use <strong>contrast</strong> (light on dark), <strong>framing</strong> (trees on both sides of the path) and <strong>reward placement</strong> (a coin trail) to pull players where you want them.</p>
<aside class="pitfall"><b>Common mistake:</b> Making every corner equally detailed. If everything stands out, nothing does, and players cannot read the space.</aside>
<aside class="try"><b>Try it:</b> Play The Guardian's Chest and notice how dark rooms pull you forward and the locked door asks a question. <a class="go" href="#/lab/adventure">▶ Play The Guardian's Chest</a></aside>` },
      ar: { title: "الطرق والمعالم والخطوط الموجِّهة", body: `<p>يجب أن تخبر المرحلةُ اللاعبَ إلى أين يذهب دون كلمات. ثلاث أدوات تؤدي معظم العمل:</p>
<ul><li><strong>الطرق</strong> — أقوى دليل في رسوم المراحل. ممر فاتح على عشب داكن، أو شارع، أو صف من المصابيح. تتبعه العين قبل أن يقرر اللاعب ذلك.</li>
<li><strong>المعالم</strong> — أشياء فريدة ظاهرة تمنح الأماكن أسماء: برج عالٍ، تمثال مكسور، شجرة عملاقة. يتنقل اللاعبون بها («تجاوز البئر ثم انعطف يسارًا عند اللافتة»).</li>
<li><strong>الخطوط الموجِّهة</strong> — حواف في الرسم (أسوار وأنهار وحواف منحدرات وخطوط أسطح) تشير نحو الهدف.</li></ul>
<p>في خريطة الغابة هذه يحمل الممر الرملي العين من الأسفل إلى الأعلى، عابرًا النهر مرتين. البئر والمزار الحجري المزهر واللافتة تعمل كمعالم، فيعرف اللاعب دائمًا أين هو.</p>
<aside class="example"><b>مثال عملي:</b> منطقة مفتوحة لها ثلاثة مخارج، وتاه فيها المختبِرون دقائق. أجرى المصمم ثلاثة تغييرات: المخرج الصحيح حصل على ضوء دافئ وممر قصير من حجارة أفتح؛ ووُضع خلفه برج عالٍ يُرى من أي مكان في المنطقة؛ وصار المخرجان الاختياريان أغمق وأضيق. انخفض متوسط وقت العثور على المخرج من 3 دقائق إلى 40 ثانية، وظل اللاعبون الفضوليون يكتشفون المناطق الاختيارية.</aside>
<p>استخدم <strong>التباين</strong> (فاتح على داكن) و<strong>التأطير</strong> (أشجار على جانبي الطريق) و<strong>وضع المكافآت</strong> (أثر من العملات) لتجذب اللاعبين إلى حيث تريد.</p>
<aside class="pitfall"><b>خطأ شائع:</b> جعل كل زاوية مفصّلة بالقدر نفسه. إذا برز كل شيء، فلن يبرز شيء، ولن يستطيع اللاعبون قراءة المكان.</aside>
<aside class="try"><b>جرّبها:</b> العب «صندوق الحارس» ولاحظ كيف تجذبك الغرف المظلمة إلى الأمام وكيف يطرح الباب المقفل سؤالًا. <a class="go" href="#/lab/adventure">▶ العب صندوق الحارس</a></aside>` }
    },
    {
      match: "World maps and biomes", image: "/images/260d34da2f408621cb1989b2f8c32645.jpg",
      en: { title: "World maps and biomes", body: `<p>A world map tells the player the shape of the whole adventure in one picture. Each region, or <strong>biome</strong>, promises something new: green meadows for learning, orange canyons with falling rocks, snowy peaks with slippery ice, a mechanical city with moving platforms.</p>
<p>A biome is more than a colour change. A good one bundles four things:</p>
<ul><li><b>A look</b>: a dominant colour, its own props and music.</li>
<li><b>A mechanic</b>: ice that slides, wind that pushes, darkness that hides.</li>
<li><b>Enemies</b> that fit it and use the mechanic.</li>
<li><b>A boss or finale</b> that tests everything the biome taught.</li></ul>
<aside class="example"><b>Worked example:</b> A four-world plan for a small platformer. World 1, Meadow: basic jumps and the first enemy. World 2, Desert: sinking sand that limits how long you can stand still. World 3, Glacier: ice from the Game Feel Lab's "Ice" preset, so stopping takes planning. World 4, Clock Tower: every mechanic so far plus moving gears. Each world has 5 levels and a boss, 24 levels in total, a realistic size for a first game.</aside>
<p>Combine a world map with a character-select screen and one image shows both <em>where</em> and <em>who</em>.</p>
<aside class="pitfall"><b>Common mistake:</b> Biomes that only change colours. If the snow level plays exactly like the grass level, players notice quickly and feel the content is padded.</aside>
<aside class="try"><b>Try it:</b> In the Game Feel Lab, choose the "Ice" preset: that is a whole biome's mechanic in one setting. Then plan your own worlds in the Levels step of the Design Studio. <a class="go" href="#/lab/platformer">▶ Try the Ice preset</a> <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "خرائط العالم والبيئات الحيوية", body: `<p>تُخبر خريطة العالم اللاعب بشكل المغامرة كلها في صورة واحدة. كل منطقة، أو <strong>بيئة حيوية</strong>، تعد بشيء جديد: مروج خضراء للتعلّم، وأودية برتقالية بصخور متساقطة، وقمم ثلجية بجليد زلق، ومدينة آلية بمنصات متحركة.</p>
<p>البيئة الحيوية أكثر من تغيير لون. البيئة الجيدة تجمع أربعة أشياء:</p>
<ul><li><b>مظهر</b>: لون غالب، وعناصر وزينة خاصة، وموسيقى خاصة.</li>
<li><b>آلية</b>: جليد ينزلق، أو ريح تدفع، أو ظلام يُخفي.</li>
<li><b>أعداء</b> يناسبونها ويستخدمون آليتها.</li>
<li><b>زعيم أو خاتمة</b> يختبر كل ما علّمته البيئة.</li></ul>
<aside class="example"><b>مثال عملي:</b> خطة من أربعة عوالم للعبة منصات صغيرة. العالم 1، المرج: قفزات أساسية وأول عدو. العالم 2، الصحراء: رمال متحركة تحدّ من مدة وقوفك ساكنًا. العالم 3، النهر الجليدي: جليد مثل إعداد «جليد» في مختبر إحساس اللعب، فيحتاج التوقف إلى تخطيط. العالم 4، برج الساعة: كل الآليات السابقة مع تروس متحركة. لكل عالم 5 مراحل وزعيم، أي 24 مرحلة إجمالًا، وهو حجم واقعي للعبة أولى.</aside>
<p>اجمع خريطة العالم مع شاشة اختيار الشخصية، فتُظهر صورة واحدة <em>أين</em> و<em>من</em> معًا.</p>
<aside class="pitfall"><b>خطأ شائع:</b> بيئات تغيّر الألوان فقط. إذا كانت مرحلة الثلج تُلعب تمامًا مثل مرحلة العشب، يلاحظ اللاعبون بسرعة ويشعرون أن المحتوى محشوّ.</aside>
<aside class="try"><b>جرّبها:</b> في مختبر إحساس اللعب اختر الإعداد «جليد»: هذه آلية بيئة كاملة في إعداد واحد. ثم خطط عوالمك في خطوة المراحل داخل استوديو التصميم. <a class="go" href="#/lab/platformer">▶ جرّب إعداد الجليد</a> <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Board-game loops in video games", image: "/images/7b2fa29bbd6afeeb415c1689c2f146ad.jpg",
      en: { title: "Board-game loops in video games", body: `<p>Many video games borrow the structure of a board game: a fixed route, dice for movement and special squares that trigger events. The dice add <strong>randomness</strong>; the squares turn every roll into a small decision.</p>
<ul><li><b>Star or coin squares</b>: rewards worth detouring for.</li>
<li><b>Question-mark squares</b>: a random event, good or bad.</li>
<li><b>Hazard squares</b>: lose coins, skip a turn, go back.</li>
<li><b>Forks and arrows</b>: a choice between a short risky route and a long safe one.</li></ul>
<p>A day/night meter or a fixed number of turns adds time pressure. The structure is a great first project: turn-based, easy to code and easy to balance with a spreadsheet.</p>
<aside class="example"><b>Worked example:</b> A route of 30 squares. You roll one die (1–6, average 3.5), so you land on about 9 squares per lap. If 6 of the 30 squares are hazards, a lap hits a hazard about twice on average. Too punishing? Make it 4 hazards, and add a fork where the short route has 3 hazards in 8 squares and the long route has none in 14. Now the player decides each lap how much risk to take.</aside>
<aside class="pitfall"><b>Common mistake:</b> Letting dice decide everything. If the player only presses "roll", there is no game. Give at least one choice per turn: which path, which item to use, or whether to roll twice at a cost.</aside>
<aside class="try"><b>Try it:</b> Play Four in a Row, a board game with no luck at all, then think about where dice could add excitement without removing the decisions. <a class="go" href="#/lab/board">▶ Play Four in a Row</a></aside>` },
      ar: { title: "حلقات الألعاب اللوحية في ألعاب الفيديو", body: `<p>تستعير ألعاب فيديو كثيرة بنية اللعبة اللوحية: طريق ثابت، ونرد للحركة، ومربعات خاصة تطلق أحداثًا. النرد يضيف <strong>العشوائية</strong>، والمربعات تحوّل كل رمية إلى قرار صغير.</p>
<ul><li><b>مربعات النجوم أو العملات</b>: مكافآت تستحق الالتفاف إليها.</li>
<li><b>مربعات علامة الاستفهام</b>: حدث عشوائي، جيد أو سيئ.</li>
<li><b>مربعات الخطر</b>: تخسر عملات، أو يفوتك دور، أو تعود إلى الوراء.</li>
<li><b>التفرعات والأسهم</b>: اختيار بين طريق قصير خطِر وطريق طويل آمن.</li></ul>
<p>عدّاد للنهار والليل أو عدد ثابت من الأدوار يضيف ضغط الوقت. هذه البنية مشروع أول رائع: بالأدوار، وسهلة البرمجة، وسهلة الموازنة بجدول بيانات.</p>
<aside class="example"><b>مثال عملي:</b> طريق من 30 مربعًا. ترمي نردًا واحدًا (1–6، بمتوسط 3.5)، فتقف على نحو 9 مربعات في كل دورة. إذا كان 6 من الثلاثين مربعات خطر، فإن الدورة تصيب خطرًا مرتين تقريبًا في المتوسط. عقاب زائد؟ اجعلها 4 مربعات خطر، وأضف تفرعًا: الطريق القصير فيه 3 مخاطر في 8 مربعات، والطويل لا خطر فيه في 14 مربعًا. الآن يقرر اللاعب في كل دورة مقدار المخاطرة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> ترك النرد يقرر كل شيء. إذا كان اللاعب يضغط «ارمِ» فقط، فلا توجد لعبة. امنحه خيارًا واحدًا على الأقل في كل دور: أي طريق، أو أي غرض يستخدم، أو هل يرمي مرتين بتكلفة.</aside>
<aside class="try"><b>جرّبها:</b> العب «أربعة في صف»، وهي لعبة لوحية بلا حظ إطلاقًا، ثم فكّر أين يمكن للنرد أن يضيف إثارة دون أن يلغي القرارات. <a class="go" href="#/lab/board">▶ العب أربعة في صف</a></aside>` }
    },
    {
      match: "Invisible tutorials", image: "/images/459ecc606c237323534075bc3da63893.jpg",
      en: { title: "Invisible tutorials", body: `<p>The best tutorial does not feel like one. Instead of a text box that says "press A to jump", build a first screen where the only way forward is a small gap: the player <strong>discovers</strong> jumping, and discovery feels like their own achievement.</p>
<ul><li>Teach <strong>one thing at a time</strong>, in a safe place where failure costs nothing.</li>
<li>Use the level's shape, light and colour to point at the answer.</li>
<li>Show a text hint only if the player is stuck for several seconds, and hide it as soon as they succeed.</li>
<li>Let the player <em>do</em> the thing within seconds of hearing about it.</li></ul>
<aside class="example"><b>Worked example:</b> Teaching a double jump. Old version: a pop-up explains the double jump, then the player continues. New version: the player gets the double-jump boots in a room with a ledge just too high for one jump, and a coin floats exactly where the second jump should start. If nothing happens for 8 seconds, a small button icon appears near the coin. In testing, 80% of players solved it without the hint, and nobody reported being confused later.</aside>
<p>Watch new players in playtests. Every place they get stuck marks a lesson the level did not teach, so change the level first, and add text only as a last resort.</p>
<aside class="pitfall"><b>Common mistake:</b> Front-loading every control in the first minute. Players remember what they need now; teach the rest when it becomes useful.</aside>
<aside class="try"><b>Try it:</b> Play Gem Quest without reading any help, then write down how it taught you to swap gems. Compare with the Zelda breakdown, a famous example of teaching through the world. <a class="go" href="#/lab/puzzle">▶ Gem Quest</a> <a class="go" href="#/games/zelda-botw">▶ Zelda breakdown</a></aside>` },
      ar: { title: "الشرح غير المرئي", body: `<p>أفضل شرح هو الذي لا يبدو شرحًا. بدل صندوق نص يقول «اضغط A للقفز»، ابنِ شاشة أولى لا يمكن التقدم فيها إلا بتجاوز فجوة صغيرة: فـ<strong>يكتشف</strong> اللاعب القفز، والاكتشاف يبدو إنجازًا خاصًا به.</p>
<ul><li>علّم <strong>شيئًا واحدًا في كل مرة</strong>، في مكان آمن لا يكلّف فيه الفشل شيئًا.</li>
<li>استخدم شكل المرحلة وضوءها وألوانها للإشارة إلى الحل.</li>
<li>أظهر تلميحًا نصيًا فقط إذا علق اللاعب عدة ثوانٍ، وأخفِه فور نجاحه.</li>
<li>دع اللاعب <em>يفعل</em> الشيء بعد ثوانٍ من سماعه عنه.</li></ul>
<aside class="example"><b>مثال عملي:</b> تعليم القفزة المزدوجة. النسخة القديمة: نافذة تشرح القفزة المزدوجة، ثم يتابع اللاعب. النسخة الجديدة: يحصل اللاعب على حذاء القفزة المزدوجة في غرفة فيها حافة أعلى قليلًا من قفزة واحدة، وعملة تطفو بالضبط حيث يجب أن تبدأ القفزة الثانية. إذا لم يحدث شيء خلال 8 ثوانٍ، تظهر أيقونة زر صغيرة قرب العملة. في الاختبار حلّها 80% من اللاعبين دون التلميح، ولم يشكُ أحد من الارتباك لاحقًا.</aside>
<p>راقب اللاعبين الجدد في الاختبارات. كل مكان يعلقون فيه يدل على درس لم تعلّمه المرحلة، فغيّر المرحلة أولًا، وأضف النص كحل أخير فقط.</p>
<aside class="pitfall"><b>خطأ شائع:</b> حشو كل أزرار التحكم في الدقيقة الأولى. يتذكر اللاعبون ما يحتاجونه الآن؛ علّم الباقي حين يصبح مفيدًا.</aside>
<aside class="try"><b>جرّبها:</b> العب «مغامرة الجواهر» دون قراءة أي مساعدة، ثم اكتب كيف علّمتك تبديل الجواهر. قارن ذلك بتحليل Zelda، وهي مثال شهير على التعليم من خلال العالم. <a class="go" href="#/lab/puzzle">▶ مغامرة الجواهر</a> <a class="go" href="#/games/zelda-botw">▶ تحليل Zelda</a></aside>` }
    },
    {
      image: "/images/8d2272b72b5edf0309b308c9211f0036.jpg",
      en: { title: "Workshop: design a level on squared paper", body: `<p>This workshop takes about <strong>40 minutes</strong>. You will design one complete platformer level on squared paper using Teach → Test → Twist, then check it against your jump numbers.</p>
<ol><li><b>Metrics</b> (5 min): from the Game Feel Lab, note your jump height and length in tiles (for example: 3 high, 5 long). One square = one tile.</li>
<li><b>Mechanic</b> (3 min): pick one new mechanic for this level: moving platforms, springs, falling blocks or a key and a door.</li>
<li><b>Sketch the route</b> (10 min): draw start on the left and goal on the right, 40–60 squares long. Mark three zones: Teach, Test, Twist.</li>
<li><b>Fill the zones</b> (10 min): place gaps, platforms, enemies and the mechanic. Every gap must be at most your jump length.</li>
<li><b>Landmark and reward</b> (5 min): add one landmark in the middle and one optional, harder path with a reward.</li>
<li><b>Paper playtest</b> (7 min): move a coin across the level square by square, as the player would. Mark any jump that is impossible or trivial.</li></ol>
<aside class="example"><b>What you hand in:</b> a photo of the level with the three zones labelled, the metrics written in a corner, and one sentence on what the Twist adds.</aside>
<aside class="pitfall"><b>Common mistake:</b> Designing the level before fixing the jump numbers. Measure first, then draw.</aside>
<aside class="try"><b>Try it:</b> <a class="go" href="#/lab/platformer">▶ Measure your jump in the Game Feel Lab</a> <a class="go" href="#/studio">▶ Add the level to your Design Studio project</a></aside>` },
      ar: { title: "ورشة تطبيقية: صمّم مرحلة على ورق مربعات", body: `<p>تستغرق هذه الورشة نحو <strong>40 دقيقة</strong>. ستصمم مرحلة منصات كاملة على ورق مربعات باستخدام «علّم ← اختبر ← أضف لمسة»، ثم تتحقق منها بأرقام قفزتك.</p>
<ol><li><b>المقاييس</b> (5 دقائق): من مختبر إحساس اللعب دوّن ارتفاع قفزتك وطولها بالمربعات (مثلًا: 3 ارتفاعًا و5 طولًا). المربع الواحد = خلية واحدة.</li>
<li><b>الآلية</b> (3 دقائق): اختر آلية جديدة واحدة لهذه المرحلة: منصات متحركة، أو نوابض، أو كتل ساقطة، أو مفتاح وباب.</li>
<li><b>ارسم المسار</b> (10 دقائق): البداية على جانب والهدف على الجانب الآخر، بطول 40 إلى 60 مربعًا. حدد ثلاث مناطق: التعليم، والاختبار، واللمسة.</li>
<li><b>املأ المناطق</b> (10 دقائق): ضع الفجوات والمنصات والأعداء والآلية. يجب ألا تزيد أي فجوة على طول قفزتك.</li>
<li><b>معلم ومكافأة</b> (5 دقائق): أضف معلمًا واحدًا في المنتصف، وطريقًا اختياريًا أصعب فيه مكافأة.</li>
<li><b>اختبار ورقي</b> (7 دقائق): حرّك عملة عبر المرحلة مربعًا بمربع كما سيفعل اللاعب. علّم كل قفزة مستحيلة أو تافهة.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> صورة للمرحلة مع تسمية المناطق الثلاث، والمقاييس مكتوبة في زاوية، وجملة واحدة عمّا تضيفه اللمسة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> تصميم المرحلة قبل تثبيت أرقام القفزة. قِس أولًا ثم ارسم.</aside>
<aside class="try"><b>جرّبها:</b> <a class="go" href="#/lab/platformer">▶ قِس قفزتك في مختبر إحساس اللعب</a> <a class="go" href="#/studio">▶ أضف المرحلة إلى مشروعك في استوديو التصميم</a></aside>` }
    }
  ]
};
