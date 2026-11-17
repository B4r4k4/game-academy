/* Content v4 (part 2): deeper lessons for narrative, environment, art, audio. See deepen-1.js for the format. */
export default {
  /* ================================================================ */
  narrative: [
    {
      match: "The player's actions are the story", image: "/images/7ccdb6d2e558d99a83a8eb931710a429.jpg",
      en: { title: "The player's actions are the story", body: `<p>Film tells a story with pictures; games tell it with <strong>actions</strong>. What the player does for hours says more about the hero than any cutscene. If the hero climbs, the story is about reaching the top. If the hero builds, it is about making a home.</p>
<p>When the story and the actions disagree, players feel it. If a cutscene says the hero is gentle but the gameplay rewards defeating everyone in sight, the two fight each other. Designer and critic Clint Hocking named this <strong>ludonarrative dissonance</strong>: a gap between what the game <em>says</em> (narrative) and what it <em>makes you do</em> (ludo, play).</p>
<aside class="example"><b>Worked example:</b> A game about a lighthouse keeper who protects ships at night. First draft: the keeper fights sea monsters with a harpoon, and the story keeps saying "you are a protector". Testers described it as "a monster-hunting game". Second draft: the keeper turns the lamp to guide ships between rocks, and storms make it harder. There is still danger and skill, but now every action <em>is</em> protecting. Testers described it as "a game about keeping people safe".</aside>
<p>Ask three questions about your design:</p>
<ol><li>What does the player do most of the time?</li>
<li>What does that action say about who they are?</li>
<li>Does the ending reward the same values the gameplay rewards?</li></ol>
<aside class="pitfall"><b>Common mistake:</b> Writing the story first and adding unrelated gameplay later. Start from the core action and let the story grow from it.</aside>
<aside class="try"><b>Try it:</b> Read the Assassin's Creed breakdown and list its core verbs (explore, sneak, fight). What kind of hero do those verbs describe, even before you read a word of its story? <a class="go" href="#/games/assassins-creed">▶ Open the breakdown</a></aside>` },
      ar: { title: "أفعال اللاعب هي القصة", body: `<p>يحكي الفيلم القصة بالصور، وتحكيها الألعاب <strong>بالأفعال</strong>. ما يفعله اللاعب لساعات يقول عن البطل أكثر من أي مشهد سينمائي. إذا كان البطل يتسلق، فالقصة عن بلوغ القمة. وإذا كان يبني، فهي عن صنع بيت.</p>
<p>حين تختلف القصة والأفعال، يشعر اللاعبون بذلك. إذا قال المشهد إن البطل لطيف بينما يكافئ اللعب هزيمة كل من يظهر، يتصارع الاثنان. سمّى المصمم والناقد كلينت هوكينغ هذا <strong>التنافر السردي-اللعبي</strong>: فجوة بين ما <em>تقوله</em> اللعبة (السرد) وما <em>تجعلك تفعله</em> (اللعب).</p>
<aside class="example"><b>مثال عملي:</b> لعبة عن حارس منارة يحمي السفن ليلًا. المسودة الأولى: يقاتل الحارس وحوش البحر برمح، والقصة تكرر «أنت حامٍ». وصفها المختبِرون بأنها «لعبة صيد وحوش». المسودة الثانية: يدير الحارس المصباح ليرشد السفن بين الصخور، والعواصف تجعل ذلك أصعب. ما زال هناك خطر ومهارة، لكن كل فعل الآن <em>هو</em> حماية. وصفها المختبِرون بأنها «لعبة عن حماية الناس».</aside>
<p>اطرح ثلاثة أسئلة على تصميمك:</p>
<ol><li>ماذا يفعل اللاعب معظم الوقت؟</li>
<li>ماذا يقول هذا الفعل عن هويته؟</li>
<li>هل تكافئ النهاية القيم نفسها التي يكافئها اللعب؟</li></ol>
<aside class="pitfall"><b>خطأ شائع:</b> كتابة القصة أولًا ثم إضافة لعب لا علاقة له بها. ابدأ من الفعل الأساسي، ودع القصة تنمو منه.</aside>
<aside class="try"><b>جرّبها:</b> اقرأ تحليل Assassin's Creed واكتب أفعاله الأساسية (استكشف، تسلّل، قاتل). أي نوع من الأبطال تصفه هذه الأفعال، حتى قبل أن تقرأ كلمة من قصته؟ <a class="go" href="#/games/assassins-creed">▶ افتح التحليل</a></aside>` }
    },
    {
      match: "Three kinds of story", image: "/images/50535a92ff115343db22d8abc8c6facb.jpg",
      en: { title: "Three kinds of story", body: `<p>Games tell stories through three channels at once. Knowing them lets a small team choose the cheapest one that still moves players.</p>
<ul><li><strong>Embedded narrative</strong> — the authored plot: dialogue, cutscenes, quests, letters. Fully controlled by the writer, but expensive, and the player cannot change it.</li>
<li><strong>Environmental narrative</strong> — the story told by places and objects: a barricaded door, a child's drawing on a wall, a meal left half-eaten. The player reads it at their own pace and connects the clues themselves.</li>
<li><strong>Emergent narrative</strong> — stories that come out of the systems: the time your last soldier survived with one hit point, or the time a storm destroyed your harvest the day before the festival. Nobody wrote them; the rules produced them.</li></ul>
<figure class="fig"><img src="/images/50535a92ff115343db22d8abc8c6facb.jpg" alt="An overgrown city with a toppled statue"><figcaption>Environmental narrative: a toppled statue, overgrown towers and a shop built into ruins tell you what happened here without a single line of dialogue.</figcaption></figure>
<aside class="example"><b>Worked example:</b> One abandoned house, three ways. Embedded: an old man tells you the family fled the flood. Environmental: water marks halfway up the walls, a boat tied to the upstairs window, a calendar stopped on one date. Emergent: the river in your game really floods every 10 days, and the player's own house is next to it. The second costs a few props; the third makes the player <em>live</em> the story.</aside>
<p>Small teams should lean on environmental and emergent story. They cost far less than cutscenes and players remember them as <em>their</em> stories.</p>
<aside class="pitfall"><b>Common mistake:</b> Hiding the main plot only in collectible notes. Optional clues are great for depth, but the core story must be understandable to someone who reads none of them.</aside>
<aside class="try"><b>Try it:</b> Read the PUBG breakdown: it has no written story at all, yet every match produces one. Write the "story" of one imaginary match in three sentences. <a class="go" href="#/games/pubg">▶ PUBG breakdown</a></aside>` },
      ar: { title: "ثلاثة أنواع من القصص", body: `<p>تحكي الألعاب القصص عبر ثلاث قنوات في وقت واحد. معرفتها تتيح للفريق الصغير اختيار أرخصها مع بقائها مؤثرة في اللاعبين.</p>
<ul><li><strong>السرد المُضمَّن</strong> — الحبكة المكتوبة: حوارات ومشاهد ومهام ورسائل. يتحكم فيها الكاتب كليًا، لكنها مكلفة، ولا يستطيع اللاعب تغييرها.</li>
<li><strong>السرد البيئي</strong> — القصة التي ترويها الأماكن والأشياء: باب محصّن بالألواح، ورسمة طفل على الجدار، ووجبة نصف مأكولة. يقرؤها اللاعب بإيقاعه ويربط الأدلة بنفسه.</li>
<li><strong>السرد الناشئ</strong> — قصص تخرج من الأنظمة: المرة التي نجا فيها آخر جنودك بنقطة صحة واحدة، أو المرة التي دمّرت فيها عاصفة محصولك قبل المهرجان بيوم. لم يكتبها أحد؛ القواعد أنتجتها.</li></ul>
<figure class="fig"><img src="/images/50535a92ff115343db22d8abc8c6facb.jpg" alt="مدينة غطتها النباتات وتمثال مقلوب"><figcaption>سرد بيئي: تمثال مقلوب وأبراج غطّتها النباتات ومتجر مبني داخل الأطلال، تخبرك بما حدث هنا دون سطر حوار واحد.</figcaption></figure>
<aside class="example"><b>مثال عملي:</b> بيت مهجور واحد بثلاث طرق. مُضمَّن: رجل عجوز يخبرك أن العائلة هربت من الفيضان. بيئي: علامات الماء في منتصف الجدران، وقارب مربوط بنافذة الطابق العلوي، وتقويم توقف عند تاريخ واحد. ناشئ: النهر في لعبتك يفيض فعلًا كل 10 أيام، وبيت اللاعب نفسه بجانبه. الثاني يكلّف بضع قطع زينة، والثالث يجعل اللاعب <em>يعيش</em> القصة.</aside>
<p>على الفرق الصغيرة أن تعتمد على السرد البيئي والناشئ. كلفتهما أقل بكثير من المشاهد السينمائية، ويتذكرهما اللاعبون كقصص <em>خاصة بهم</em>.</p>
<aside class="pitfall"><b>خطأ شائع:</b> إخفاء الحبكة الرئيسية في ملاحظات قابلة للجمع فقط. الأدلة الاختيارية رائعة للعمق، لكن القصة الأساسية يجب أن يفهمها من لا يقرأ أيًّا منها.</aside>
<aside class="try"><b>جرّبها:</b> اقرأ تحليل PUBG: لا قصة مكتوبة فيها إطلاقًا، ومع ذلك تنتج كل مباراة قصة. اكتب «قصة» مباراة متخيَّلة في ثلاث جمل. <a class="go" href="#/games/pubg">▶ تحليل PUBG</a></aside>` }
    },
    {
      match: "Choices that matter", image: "/images/9c591068f21ce6e5f57fea2ce375c7ea.jpg",
      en: { title: "Choices that matter", body: `<p>A branching story grows fast. Three choices with three options each already make 27 endings; five such choices make 243. No team can write that many. Writers control the growth with two tools:</p>
<ul><li><strong>Branch-and-bottleneck</strong>: branches split for a scene or two, then return to shared key scenes. The path differs; the main events stay the same.</li>
<li>Remembered <strong>state</strong>: the game stores who you helped, who you betrayed, what you took. Instead of whole new chapters, this changes lines of dialogue, who appears, prices, and small details.</li></ul>
<aside class="example"><b>Worked example:</b> At the city gate a hungry child asks for bread. You can give your last bread or keep it. The story does not branch: both paths reach the market scene. But a flag is saved: <em>helped_child = yes/no</em>. Ten minutes later the child's mother runs the inn. If you helped, she gives you a free room and a hint; if not, she charges double and says nothing. One flag, two lines of dialogue, and players remember that choice for the rest of the game.</aside>
<p>A choice feels meaningful when it has three parts: a clear <strong>cost</strong> at the moment you choose, an uncertain outcome, and a <em>reflection</em> later, where the game shows that it remembered, even in one line.</p>
<aside class="pitfall"><b>Common mistake:</b> A "choice" where one option is clearly good and the other clearly evil with no cost. Players simply pick the one that matches their style; nothing is decided. Make both options cost something.</aside>
<aside class="try"><b>Try it:</b> In the Characters step of the Design Studio, create a hero and a supporting character. Write one choice between them, with its cost and the line of dialogue that reflects it later. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "خيارات لها وزن", body: `<p>القصة المتفرعة تكبر بسرعة. ثلاثة خيارات لكل منها ثلاثة بدائل تصنع 27 نهاية، وخمسة خيارات مثلها تصنع 243. لا يستطيع أي فريق كتابة كل هذا. يتحكم الكتّاب في هذا النمو بأداتين:</p>
<ul><li><strong>التفرع والاختناق</strong>: تتفرع المسارات لمشهد أو مشهدين، ثم تعود إلى مشاهد رئيسية مشتركة. الطريق يختلف، والأحداث الكبرى تبقى نفسها.</li>
<li><strong>الحالة</strong> المحفوظة: تخزن اللعبة من ساعدت، ومن خنت، وماذا أخذت. بدل فصول جديدة كاملة، يغيّر هذا سطور الحوار، ومن يظهر، والأسعار، والتفاصيل الصغيرة.</li></ul>
<aside class="example"><b>مثال عملي:</b> عند بوابة المدينة يطلب طفل جائع خبزًا. يمكنك أن تعطيه آخر خبزة أو تحتفظ بها. القصة لا تتفرع: الطريقان يصلان إلى مشهد السوق. لكن يُحفظ علم: <em>helped_child = نعم/لا</em>. بعد عشر دقائق تظهر أم الطفل صاحبةً للنُّزُل. إن ساعدت، تعطيك غرفة مجانية وتلميحًا؛ وإن لم تفعل، تأخذ ضعف الأجرة ولا تقول شيئًا. علم واحد، وسطرا حوار، ويتذكر اللاعبون ذلك الخيار بقية اللعبة.</aside>
<p>يبدو الخيار ذا معنى حين تكون له ثلاثة أجزاء: <strong>تكلفة</strong> واضحة لحظة الاختيار، ونتيجة غير مؤكدة، و<em>انعكاس</em> لاحق تُظهر فيه اللعبة أنها تذكّرت، ولو بسطر واحد.</p>
<aside class="pitfall"><b>خطأ شائع:</b> «خيار» أحد بديليه خير واضح والآخر شر واضح دون تكلفة. يختار اللاعبون ببساطة ما يوافق أسلوبهم ولا يُحسم شيء. اجعل لكلا البديلين ثمنًا.</aside>
<aside class="try"><b>جرّبها:</b> في خطوة الشخصيات داخل استوديو التصميم، أنشئ بطلًا وشخصية مساندة. اكتب خيارًا واحدًا بينهما، مع تكلفته وسطر الحوار الذي يعكسه لاحقًا. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Writing for games", image: "/images/093b729522a9e810b4d3b822593d4727.jpg",
      en: { title: "Writing for games", body: `<p>Players skip walls of text, often while running from danger. Game writing is short, works in small pieces and is read in a hurry. The main formats:</p>
<ul><li><strong>Barks</strong> — short lines characters shout during play ("Reloading!", "Over there!", "I'm hit!"). They give feedback and personality at the same time.</li>
<li><strong>Item descriptions</strong> — one or two lines that say what an item does and hint at the world's history.</li>
<li><b>UI text</b> — buttons, warnings and objectives: as short and clear as possible.</li>
<li><b>Dialogue</b> — no more than two or three lines per box, and always let players skip or speed up.</li></ul>
<aside class="example"><b>Worked example:</b> An item description, before and after.<br><em>Before:</em> "This is an ancient sword that was forged many centuries ago by the great blacksmiths of the northern mountains, and it is very sharp and strong."<br><em>After:</em> "Rusted Northblade — +12 damage. Its owner swore never to draw it again. The rust says he kept that promise."<br>The second version is shorter, gives the number the player needs, and tells a tiny story.</aside>
<p>Follow the rule <em>show, don't tell</em>: cut any line that the level, animation or sound already explains. And give every important character a recognisable <strong>voice</strong>: one uses short sentences, another asks questions, a third jokes when nervous.</p>
<aside class="pitfall"><b>Common mistake:</b> Writing every line in the same voice as the narrator. Read three lines without names: if you cannot tell who is speaking, the voices are too similar.</aside>
<aside class="try"><b>Try it:</b> Play Genre Quiz and notice how short each question is, because the timer forces fast reading. Then write five barks for your hero: for jumping, getting hurt, finding treasure, low health and victory. <a class="go" href="#/lab/quiz">▶ Play Genre Quiz</a></aside>` },
      ar: { title: "الكتابة للألعاب", body: `<p>يتخطى اللاعبون جدران النصوص، وكثيرًا ما يكونون هاربين من خطر. كتابة الألعاب قصيرة، تعمل في قطع صغيرة، وتُقرأ على عجل. أهم أشكالها:</p>
<ul><li><strong>الصيحات</strong> — سطور قصيرة تطلقها الشخصيات أثناء اللعب («أعيد التلقيم!»، «هناك!»، «أُصبت!»). تمنح التغذية الراجعة والشخصية في آن واحد.</li>
<li><strong>أوصاف الأغراض</strong> — سطر أو سطران يقولان ما يفعله الغرض ويلمّحان إلى تاريخ العالم.</li>
<li><b>نصوص الواجهة</b> — الأزرار والتحذيرات والأهداف: أقصر وأوضح ما يمكن.</li>
<li><b>الحوار</b> — لا أكثر من سطرين أو ثلاثة في كل صندوق، واسمح دائمًا بالتخطي أو التسريع.</li></ul>
<aside class="example"><b>مثال عملي:</b> وصف غرض قبل التعديل وبعده.<br><em>قبل:</em> «هذا سيف قديم صُنع قبل قرون كثيرة على يد حدّادين عظماء من جبال الشمال، وهو حاد جدًا وقوي.»<br><em>بعد:</em> «نصل الشمال الصدئ — ضرر +12. أقسم صاحبه ألّا يستلّه مرة أخرى. والصدأ يقول إنه وفى بوعده.»<br>النسخة الثانية أقصر، وتعطي الرقم الذي يحتاجه اللاعب، وتحكي قصة صغيرة.</aside>
<p>اتبع قاعدة <em>أرِ ولا تُخبر</em>: احذف كل سطر تشرحه المرحلة أو الحركة أو الصوت أصلًا. وامنح كل شخصية مهمة <strong>صوتًا</strong> مميزًا: واحدة تستخدم جملًا قصيرة، وأخرى تسأل كثيرًا، وثالثة تمزح حين تتوتر.</p>
<aside class="pitfall"><b>خطأ شائع:</b> كتابة كل السطور بصوت الراوي نفسه. اقرأ ثلاثة سطور دون أسماء: إذا لم تعرف من المتكلم، فالأصوات متشابهة جدًا.</aside>
<aside class="try"><b>جرّبها:</b> العب «اختبار الأنواع» ولاحظ قِصر كل سؤال، لأن المؤقت يفرض القراءة السريعة. ثم اكتب خمس صيحات لبطلك: للقفز، والإصابة، والعثور على كنز، وانخفاض الصحة، والفوز. <a class="go" href="#/lab/quiz">▶ العب اختبار الأنواع</a></aside>` }
    },
    {
      image: "/images/ad47519e8a1ee6d5c4001c0450eb4562.jpg",
      en: { title: "Story structure for short games", body: `<p>Most game stories, even small ones, follow a simple shape: a <strong>hook</strong>, a rising journey and a payoff. A useful version for short games has five beats:</p>
<ol><li><b>Normal world</b> — show what the hero cares about, in under a minute of play.</li>
<li><b>Inciting event</b> — something breaks: the village's well dries up, the robot loses its memory.</li>
<li><b>Rising challenge</b> — each level or area is a step towards fixing it, and each step is harder.</li>
<li><b>Crisis</b> — the lowest point: the hero loses an ability or an ally right before the end.</li>
<li><b>Resolution</b> — the final challenge uses everything the player has learned, and the world visibly changes.</li></ol>
<aside class="example"><b>Worked example:</b> A 20-minute game, "The Last Lantern". Normal world: a lantern-maker lights the town's streets (1 minute, teaches movement and lighting lamps). Inciting event: the great lantern in the square goes out and darkness creatures appear. Rising challenge: three districts, each relit to unlock a new tool. Crisis: the player's lantern shatters in the final district. Resolution: the townspeople the player helped bring their own small lights, and together they relight the great lantern. Every beat is something the player <em>does</em>.</aside>
<p>Notice how the structure follows the <strong>difficulty curve</strong>: rising challenge matches rising difficulty, and the resolution is the final test.</p>
<aside class="pitfall"><b>Common mistake:</b> A ten-minute opening cutscene before the player touches the controls. Start with play; reveal the background story gradually.</aside>
<aside class="try"><b>Try it:</b> Open the Design Studio and, in the pitch step, write your game's story in five sentences, one for each beat. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "بنية القصة في الألعاب القصيرة", body: `<p>معظم قصص الألعاب، حتى الصغيرة منها، تتبع شكلًا بسيطًا: <strong>خطّاف</strong> يشد الانتباه، ورحلة متصاعدة، وخاتمة مُرضية. نسخة مفيدة للألعاب القصيرة من خمس محطات:</p>
<ol><li><b>العالم العادي</b> — أظهر ما يهتم به البطل، في أقل من دقيقة لعب.</li>
<li><b>الحدث المحرّك</b> — شيء ينكسر: بئر القرية تجف، أو الروبوت يفقد ذاكرته.</li>
<li><b>التحدي المتصاعد</b> — كل مرحلة أو منطقة خطوة نحو الإصلاح، وكل خطوة أصعب.</li>
<li><b>الأزمة</b> — أدنى نقطة: يفقد البطل قدرة أو حليفًا قبيل النهاية.</li>
<li><b>الحل</b> — التحدي الأخير يستخدم كل ما تعلّمه اللاعب، ويتغير العالم بشكل مرئي.</li></ol>
<aside class="example"><b>مثال عملي:</b> لعبة مدتها 20 دقيقة اسمها «الفانوس الأخير». العالم العادي: صانع فوانيس يضيء شوارع البلدة (دقيقة واحدة، تعلّم الحركة وإشعال المصابيح). الحدث المحرّك: ينطفئ الفانوس الكبير في الساحة وتظهر كائنات الظلام. التحدي المتصاعد: ثلاثة أحياء، كل حي يُعاد إشعاله يفتح أداة جديدة. الأزمة: يتحطم فانوس اللاعب في الحي الأخير. الحل: يأتي سكان البلدة الذين ساعدهم اللاعب بأنوارهم الصغيرة، ويعيدون معًا إشعال الفانوس الكبير. كل محطة شيء <em>يفعله</em> اللاعب.</aside>
<p>لاحظ كيف تتبع البنية <strong>منحنى الصعوبة</strong>: التحدي المتصاعد يوافق الصعوبة المتصاعدة، والحل هو الاختبار الأخير.</p>
<aside class="pitfall"><b>خطأ شائع:</b> مشهد افتتاحي مدته عشر دقائق قبل أن يلمس اللاعب أزرار التحكم. ابدأ باللعب، واكشف خلفية القصة تدريجيًا.</aside>
<aside class="try"><b>جرّبها:</b> افتح استوديو التصميم، وفي خطوة العرض اكتب قصة لعبتك في خمس جمل، جملة لكل محطة. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      image: "/images/9c591068f21ce6e5f57fea2ce375c7ea.jpg",
      en: { title: "Workshop: tell a story with one room", body: `<p>This workshop takes about <strong>30 minutes</strong>. You will design a single room that tells a complete story without any text or dialogue, using only environmental narrative.</p>
<ol><li><b>The event</b> (5 min): write one sentence that only you know, for example: "A young inventor left in a hurry after her last experiment caught fire."</li>
<li><b>Five clues</b> (10 min): list five objects that hint at the event: a scorched workbench, a half-packed bag, a burnt blueprint, a fire bucket on its side, a note pinned to the door.</li>
<li><b>Placement</b> (5 min): sketch the room from above. Put the strongest clue where the player looks first, opposite the entrance.</li>
<li><b>One question left open</b> (3 min): add one clue that raises a question: where did she go? A trail of soot leads to a locked hatch.</li>
<li><b>Test</b> (7 min): show the sketch to someone and ask: "What happened here?" Compare their answer with your sentence.</li></ol>
<aside class="example"><b>What you hand in:</b> the sketch, the list of clues and the tester's answer. If they guessed at least two thirds of your event, the room works.</aside>
<aside class="pitfall"><b>Common mistake:</b> Too many clues. Twenty objects become noise; five strong ones become a story.</aside>
<aside class="try"><b>Try it:</b> Browse the Environment images in the Gallery for inspiration, especially "Overgrown city RPG" and "Adventure party in ruins". <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "ورشة تطبيقية: احكِ قصة بغرفة واحدة", body: `<p>تستغرق هذه الورشة نحو <strong>30 دقيقة</strong>. ستصمم غرفة واحدة تحكي قصة كاملة دون أي نص أو حوار، بالسرد البيئي وحده.</p>
<ol><li><b>الحدث</b> (5 دقائق): اكتب جملة واحدة لا يعرفها غيرك، مثل: «غادرت مخترعة شابة على عجل بعد أن اشتعلت النار في آخر تجاربها.»</li>
<li><b>خمسة أدلة</b> (10 دقائق): اكتب خمسة أشياء تلمّح إلى الحدث: طاولة عمل محترقة، وحقيبة نصف معبأة، ومخطط محروق، ودلو إطفاء مقلوب، وورقة مثبتة على الباب.</li>
<li><b>التوزيع</b> (5 دقائق): ارسم الغرفة من الأعلى. ضع أقوى دليل حيث ينظر اللاعب أولًا، مقابل المدخل.</li>
<li><b>سؤال يبقى مفتوحًا</b> (3 دقائق): أضف دليلًا يطرح سؤالًا: إلى أين ذهبت؟ أثر من السخام يقود إلى فتحة مقفلة.</li>
<li><b>الاختبار</b> (7 دقائق): أرِ الرسم لشخص واسأله: «ماذا حدث هنا؟» قارن جوابه بجملتك.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> الرسم وقائمة الأدلة وجواب المختبِر. إذا خمّن ثلثي الحدث على الأقل، فالغرفة ناجحة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> كثرة الأدلة. عشرون شيئًا تصبح ضجيجًا، وخمسة أشياء قوية تصبح قصة.</aside>
<aside class="try"><b>جرّبها:</b> تصفح صور البيئات في المعرض للإلهام، خصوصًا «مدينة غزتها النباتات» و«فريق مغامرين في الأطلال». <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    }
  ],

  /* ================================================================ */
  environment: [
    {
      match: "The nine elements", image: "/images/4f00c32a1a93de7dc6fe7fd689e114b0.jpg",
      en: { title: "The nine elements", body: `<p>An environment is not a background. It guides the player, sets the mood and tells a story. This infographic breaks environment design into nine elements, and each one is a tool you can adjust on its own:</p>
<ol><li><strong>Architecture</strong> — buildings, pathways, doors, bridges: the shape of the space you move through.</li>
<li><strong>Lighting</strong> — direction, shadows, highlights. Players walk towards light.</li>
<li><strong>Scale</strong> — objects that communicate size and distance: a door tells you how big a building is.</li>
<li><strong>Props</strong> — signs, furniture, containers, debris.</li>
<li><strong>Atmosphere</strong> — fog, particles, weather, depth of field.</li>
<li><strong>Textures</strong> — stone, metal, wood, glass, vegetation.</li>
<li><strong>Colour</strong> — a controlled palette that sets mood and identity.</li>
<li><strong>Sound</strong> — wind, water, footsteps, distant activity.</li>
<li><strong>Storytelling</strong> — clues that imply history and events.</li></ol>
<aside class="example"><b>Worked example:</b> One corridor, two moods, same layout. <em>Safe:</em> warm side-lighting, wooden textures, plants as props, birdsong, a soft orange palette. <em>Danger:</em> one cold light from above, wet stone, broken crates, dripping water and a distant metallic sound, a blue-green palette. Nothing about the geometry changed, yet players walk slowly and carefully through the second one.</aside>
<aside class="pitfall"><b>Common mistake:</b> Treating these as a checklist to fill at maximum. A great environment chooses two or three to push hard and keeps the rest quiet.</aside>
<aside class="try"><b>Try it:</b> In the Gallery, filter by "Environment" and pick one image. For each of the nine elements, write one word describing how that image uses it. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "العناصر التسعة", body: `<p>البيئة ليست خلفية. إنها ترشد اللاعب وتصنع الجو وتحكي قصة. يقسّم هذا الإنفوجرافيك تصميم البيئة إلى تسعة عناصر، وكل منها أداة يمكنك ضبطها وحدها:</p>
<ol><li><strong>العمارة</strong> — المباني والممرات والأبواب والجسور: شكل المكان الذي تتحرك فيه.</li>
<li><strong>الإضاءة</strong> — الاتجاه والظلال واللمعان. اللاعبون يمشون نحو الضوء.</li>
<li><strong>المقياس</strong> — أشياء توحي بالحجم والمسافة: الباب يخبرك بحجم المبنى.</li>
<li><strong>الأغراض</strong> — اللافتات والأثاث والحاويات والحطام.</li>
<li><strong>الأجواء</strong> — الضباب والجسيمات والطقس وعمق المجال.</li>
<li><strong>الخامات</strong> — الحجر والمعدن والخشب والزجاج والنباتات.</li>
<li><strong>اللون</strong> — لوحة ألوان مضبوطة تصنع المزاج والهوية.</li>
<li><strong>الصوت</strong> — الريح والماء والخطوات والحركة البعيدة.</li>
<li><strong>السرد</strong> — أدلة توحي بتاريخ وأحداث.</li></ol>
<aside class="example"><b>مثال عملي:</b> ممر واحد بمزاجين، والتخطيط نفسه. <em>آمن:</em> إضاءة جانبية دافئة، وخامات خشبية، ونباتات كزينة، وتغريد طيور، ولوحة برتقالية ناعمة. <em>خطر:</em> ضوء بارد واحد من الأعلى، وحجر مبلل، وصناديق مكسورة، وماء يقطر وصوت معدني بعيد، ولوحة زرقاء مخضرّة. لم يتغير شيء في الشكل الهندسي، ومع ذلك يمشي اللاعبون ببطء وحذر في الممر الثاني.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> معاملة هذه العناصر كقائمة يجب ملؤها كلها إلى الحد الأقصى. البيئة الرائعة تختار اثنين أو ثلاثة تدفعها بقوة وتُبقي الباقي هادئًا.</aside>
<aside class="try"><b>جرّبها:</b> في المعرض صفِّ الصور حسب «البيئة» واختر صورة واحدة. لكل عنصر من العناصر التسعة، اكتب كلمة تصف كيف تستخدمه الصورة. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Same elements, different style", image: "/images/d7aa1128da5fdcb9939f9031a74b352f.jpg",
      en: { title: "Same elements, different style", body: `<p>The same principles work in any art style. This bright, low-poly diorama looks nothing like a dark realistic dungeon, yet it uses the same tools: architecture, scale, props, colour and storytelling.</p>
<p>A small <strong>palette swatch</strong> (terracotta, sage, cream, slate) keeps every object coherent. Choosing four to six main colours before you build anything is one of the cheapest ways to make a small game look professional.</p>
<aside class="example"><b>Worked example:</b> Building a palette for a seaside town. Base colours: sand (cream), sea (teal), rooftops (terracotta), shadows (deep slate). One accent colour: sunflower yellow, used only for things the player can interact with: doors that open, items to pick up, the quest-giver's hat. After a few minutes, players learn without being told that "yellow means I can use it".</aside>
<p>"Great worlds tell stories without words": a crosswalk, a lamp post and a café awning tell you that this is a lived-in town, where people walk, meet and sit. Ask of every prop: <em>what does this say about the people who live here?</em></p>
<p>Keep <strong>consistency</strong> in three things across every scene: the outline (all objects with outlines or none), the light direction, and the level of detail. Mixing a detailed realistic barrel with flat cartoon houses breaks the world faster than any wrong colour.</p>
<aside class="pitfall"><b>Common mistake:</b> Downloading assets from five different packs and using them as they are. Recolour them to your palette, or the game looks like a collage.</aside>
<aside class="try"><b>Try it:</b> In the World & Style step of the Design Studio, choose a palette and a style for your game, then compare it with "Environment design — 8 elements" in the Gallery. <a class="go" href="#/studio">▶ Design Studio</a> <a class="go" href="#/gallery">▶ Gallery</a></aside>` },
      ar: { title: "العناصر نفسها بأسلوب مختلف", body: `<p>تعمل المبادئ نفسها في أي أسلوب رسم. هذا المجسّم المصغّر الزاهي منخفض المضلعات لا يشبه أبدًا زنزانة واقعية مظلمة، لكنه يستخدم الأدوات نفسها: العمارة والمقياس والأغراض واللون والسرد.</p>
<p><strong>لوحة ألوان</strong> صغيرة (طيني، وأخضر مريمي، وكريمي، ورمادي إردوازي) تُبقي كل الأشياء متناسقة. اختيار أربعة إلى ستة ألوان رئيسية قبل بناء أي شيء من أرخص الطرق لجعل لعبة صغيرة تبدو احترافية.</p>
<aside class="example"><b>مثال عملي:</b> بناء لوحة ألوان لبلدة ساحلية. الألوان الأساسية: الرمل (كريمي)، والبحر (أزرق مخضر)، والأسطح (طيني)، والظلال (إردوازي داكن). لون تمييز واحد: أصفر عباد الشمس، يُستخدم فقط للأشياء التي يمكن التفاعل معها: الأبواب التي تُفتح، والأغراض القابلة للالتقاط، وقبعة مانح المهام. بعد دقائق يتعلم اللاعبون دون أن يُقال لهم أن «الأصفر يعني أنني أستطيع استخدامه».</aside>
<p>«العوالم العظيمة تحكي القصص دون كلمات»: ممر مشاة وعمود إنارة ومظلة مقهى تخبرك أن هذه بلدة مأهولة، يمشي فيها الناس ويلتقون ويجلسون. اسأل عن كل غرض: <em>ماذا يقول هذا عن الناس الذين يعيشون هنا؟</em></p>
<p>حافظ على <strong>الاتساق</strong> في ثلاثة أشياء عبر كل المشاهد: الحدود الخارجية (كل الأشياء بحدود أو لا شيء)، واتجاه الضوء، ومستوى التفاصيل. برميل واقعي مفصّل بين بيوت كرتونية مسطحة يكسر العالم أسرع من أي لون خاطئ.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تنزيل عناصر من خمس حزم مختلفة واستخدامها كما هي. أعد تلوينها بلوحة ألوانك، وإلا بدت اللعبة كقصاصات ملصقة.</aside>
<aside class="try"><b>جرّبها:</b> في خطوة العالم والأسلوب داخل استوديو التصميم، اختر لوحة ألوان وأسلوبًا للعبتك، ثم قارنها بصورة «تصميم البيئات — 8 عناصر» في المعرض. <a class="go" href="#/studio">▶ استوديو التصميم</a> <a class="go" href="#/gallery">▶ المعرض</a></aside>` }
    },
    {
      match: "Lighting guides the player", image: "/images/02dcfbefe90d72b020174944578e35bf.jpg",
      en: { title: "Lighting guides the player", body: `<p>Players follow light. It is one of the oldest instincts we have, and level designers use it constantly. In this isometric dungeon, warm candles mark tables and doorways, while cool blue crystals mark points of interest. The broken wooden floor in the centre is the darkest, most textured area, so it reads as a hazard before the player steps on it.</p>
<p>Three ways to use light as a design tool:</p>
<ul><li><strong>Guide</strong> — the brightest spot in a room is where the player goes next. Place it on the exit or the goal.</li>
<li><strong>Code</strong> — give colours a meaning and keep it: warm = safe, red = danger, blue = magic or secrets.</li>
<li><strong>Pace</strong> — alternate dark, tense spaces with bright, open ones. The contrast makes both stronger.</li></ul>
<aside class="example"><b>Worked example:</b> A cave level where players kept walking into a dead end on the right. The designer added nothing new, but moved the brightest torch from the dead end to the correct passage on the left and dimmed the right side. In the next playtest, 9 out of 10 players went left first. The dead end remained for curious explorers, now with a small hidden reward at its end.</aside>
<aside class="pitfall"><b>Common mistake:</b> Lighting every area evenly so it is "easy to see". Flat lighting removes depth and direction, and the space becomes harder to read, not easier.</aside>
<aside class="try"><b>Try it:</b> Play The Guardian's Chest: dark rooms stay hidden until you enter them. Notice how that pulls you forward. <a class="go" href="#/lab/adventure">▶ Play The Guardian's Chest</a></aside>` },
      ar: { title: "الإضاءة ترشد اللاعب", body: `<p>يتبع اللاعبون الضوء. إنها من أقدم غرائزنا، ويستخدمها مصممو المراحل باستمرار. في هذه الزنزانة الأيزومترية تحدد الشموع الدافئة الطاولات والمداخل، بينما تحدد البلورات الزرقاء الباردة نقاط الاهتمام. الأرضية الخشبية المكسورة في الوسط هي أغمق منطقة وأكثرها خشونة، فتُقرأ كخطر قبل أن يخطو عليها اللاعب.</p>
<p>ثلاث طرق لاستخدام الضوء كأداة تصميم:</p>
<ul><li><strong>الإرشاد</strong> — أكثر بقعة سطوعًا في الغرفة هي وجهة اللاعب التالية. ضعها على المخرج أو الهدف.</li>
<li><strong>الترميز</strong> — امنح الألوان معنى والتزم به: الدافئ = آمن، والأحمر = خطر، والأزرق = سحر أو أسرار.</li>
<li><strong>الإيقاع</strong> — بدّل بين أماكن مظلمة متوترة وأخرى مضيئة مفتوحة. التباين يقوّي الاثنين.</li></ul>
<aside class="example"><b>مثال عملي:</b> مرحلة كهف ظل اللاعبون فيها يدخلون طريقًا مسدودًا على اليمين. لم يضف المصمم شيئًا جديدًا، بل نقل أسطع شعلة من الطريق المسدود إلى الممر الصحيح على اليسار وخفّف إضاءة الجهة اليمنى. في الاختبار التالي ذهب 9 من كل 10 لاعبين يسارًا أولًا. بقي الطريق المسدود للمستكشفين الفضوليين، وصارت في نهايته مكافأة صغيرة مخفية.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> إضاءة كل منطقة بالتساوي «لتسهل الرؤية». الإضاءة المسطحة تزيل العمق والاتجاه، فيصبح المكان أصعب قراءة لا أسهل.</aside>
<aside class="try"><b>جرّبها:</b> العب «صندوق الحارس»: الغرف المظلمة تبقى مخفية حتى تدخلها. لاحظ كيف يجذبك ذلك إلى الأمام. <a class="go" href="#/lab/adventure">▶ العب صندوق الحارس</a></aside>` }
    },
    {
      match: "Environmental storytelling", image: "/images/50535a92ff115343db22d8abc8c6facb.jpg",
      en: { title: "Environmental storytelling", body: `<p>A giant toppled statue, overgrown towers, a moss-covered van, a "SHOP" sign built into ruins. Without one line of dialogue you know three things: a civilisation fell, nature took over, and people are now rebuilding. That is <strong>environmental storytelling</strong>: placing objects so the player reconstructs what happened.</p>
<p>Techniques that work in any game:</p>
<ul><li><strong>The familiar made strange</strong> — a well-known landmark in an unfamiliar state (a famous statue half-buried) is one of the most powerful tools there is.</li>
<li><b>Before and after</b> — show a place as it was (a painting on a wall) next to what it is now.</li>
<li><b>Traces of people</b> — footprints, a dropped toy, a door forced open from the inside. Each one implies an action.</li>
<li><b>Contradiction</b> — a sign saying "safe zone" covered in claw marks makes players ask questions.</li></ul>
<aside class="example"><b>Worked example:</b> A camp in a desert level. A campfire still warm, three bedrolls but only two packs, tracks leading away from the third bedroll towards the dunes, and a broken compass. No text. Testers invented almost the same story: one traveller wandered off at night and got lost. Then the designer placed the third pack, with a reward inside, at the end of those tracks. Curious players followed the story to the treasure.</aside>
<aside class="pitfall"><b>Common mistake:</b> Clues that only make sense if you read the design document. Test with someone who knows nothing about your world.</aside>
<aside class="try"><b>Try it:</b> Open "Overgrown city RPG" and "Adventure party in ruins" in the Gallery and write the story each picture tells in two sentences. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "السرد البيئي", body: `<p>تمثال عملاق مقلوب، وأبراج غطتها النباتات، وشاحنة يكسوها الطحلب، ولافتة «متجر» مبنية داخل الأطلال. دون سطر حوار واحد تعرف ثلاثة أشياء: حضارة سقطت، والطبيعة استولت على المكان، والناس الآن يعيدون البناء. هذا هو <strong>السرد البيئي</strong>: ترتيب الأشياء بحيث يعيد اللاعب بناء ما حدث.</p>
<p>أساليب تنجح في أي لعبة:</p>
<ul><li><strong>المألوف في حال غريبة</strong> — معلم معروف في وضع غير مألوف (تمثال شهير نصفه مدفون) من أقوى الأدوات على الإطلاق.</li>
<li><b>قبل وبعد</b> — أظهر المكان كما كان (لوحة على جدار) بجانب ما صار إليه.</li>
<li><b>آثار الناس</b> — آثار أقدام، ولعبة سقطت، وباب كُسر من الداخل. كل واحد منها يوحي بفعل.</li>
<li><b>التناقض</b> — لافتة تقول «منطقة آمنة» مغطاة بآثار مخالب تجعل اللاعبين يطرحون الأسئلة.</li></ul>
<aside class="example"><b>مثال عملي:</b> مخيم في مرحلة صحراوية. نار ما زالت دافئة، وثلاثة أفرشة لكن حقيبتان فقط، وآثار أقدام تبتعد من الفراش الثالث نحو الكثبان، وبوصلة مكسورة. لا نص. اخترع المختبِرون القصة نفسها تقريبًا: مسافر ابتعد ليلًا وضلّ طريقه. ثم وضع المصمم الحقيبة الثالثة، وفيها مكافأة، في نهاية تلك الآثار. تتبّع اللاعبون الفضوليون القصة حتى الكنز.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> أدلة لا تُفهم إلا إذا قرأت وثيقة التصميم. اختبرها مع شخص لا يعرف شيئًا عن عالمك.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورتي «مدينة غزتها النباتات» و«فريق مغامرين في الأطلال» في المعرض، واكتب القصة التي ترويها كل صورة في جملتين. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Biomes and palette variation", image: "/images/079c911db9949dff4702781d6857369f.jpg",
      en: { title: "Biomes and palette variation", body: `<p>Beach, jungle village, autumn forest, desert ruins: in this pixel-art sheet, each biome has its own dominant hue, its own enemies (jellyfish on the beach, scorpions in the desert) and its own props. Yet it is obviously one game, because the same characters, outline style and light direction tie everything together.</p>
<p>The rule is short: <strong>change the palette, keep the rules</strong>. Decide what stays fixed across the whole game and what each biome is allowed to change.</p>
<ul><li><b>Fixed:</b> character style, outline thickness, pixel size, light direction, UI.</li>
<li><b>Per biome:</b> dominant hue, ground texture, props, enemies, music, one mechanic.</li></ul>
<aside class="example"><b>Worked example:</b> Use <strong>hue shifting</strong> to make biomes quickly. Take your grass tile: bright green, with shadows in blue-green and highlights in yellow-green. For autumn, shift every colour towards orange: the shadows become red-brown, the highlights become gold. For the desert, shift towards yellow and lower the saturation of the shadows. Three biomes from one set of tiles, in an afternoon, and they still look like the same world.</aside>
<p>Use colour to tell the player how far they have come. Many games move from bright, saturated colours at the start towards darker or stranger palettes as the journey gets more dangerous.</p>
<aside class="pitfall"><b>Common mistake:</b> Making shadows simply darker versions of the same colour. Shift shadows slightly towards blue or purple and highlights towards yellow; the scene will look much richer.</aside>
<aside class="try"><b>Try it:</b> Open "Pixel RPG biomes" in the Gallery and pick out one colour that appears in every biome. That is the thread holding the game together. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "البيئات الحيوية وتنويع الألوان", body: `<p>شاطئ، وقرية في الأدغال، وغابة خريفية، وأطلال صحراوية: في هذه اللوحة بفن البكسل لكل بيئة لونها الغالب وأعداؤها (قناديل البحر على الشاطئ، والعقارب في الصحراء) وأغراضها. ومع ذلك يبدو واضحًا أنها لعبة واحدة، لأن الشخصيات نفسها وأسلوب الحدود نفسه واتجاه الضوء نفسه تربط كل شيء.</p>
<p>القاعدة قصيرة: <strong>غيّر الألوان واحفظ القواعد</strong>. قرّر ما الذي يبقى ثابتًا في اللعبة كلها وما الذي يُسمح لكل بيئة بتغييره.</p>
<ul><li><b>ثابت:</b> أسلوب الشخصيات، وسماكة الحدود، وحجم البكسل، واتجاه الضوء، والواجهة.</li>
<li><b>لكل بيئة:</b> اللون الغالب، وخامة الأرض، والأغراض، والأعداء، والموسيقى، وآلية واحدة.</li></ul>
<aside class="example"><b>مثال عملي:</b> استخدم <strong>إزاحة درجة اللون</strong> لصنع البيئات بسرعة. خذ مربع العشب: أخضر زاهٍ، بظلال زرقاء مخضرّة ولمعات خضراء مصفرّة. للخريف أزح كل لون نحو البرتقالي: تصبح الظلال بنية محمرّة واللمعات ذهبية. للصحراء أزحه نحو الأصفر وخفّف تشبع الظلال. ثلاث بيئات من مجموعة مربعات واحدة في عصرية واحدة، وما زالت تبدو العالم نفسه.</aside>
<p>استخدم اللون لتخبر اللاعب كم قطع من الرحلة. ألعاب كثيرة تنتقل من ألوان زاهية مشبعة في البداية إلى لوحات أغمق أو أغرب كلما صارت الرحلة أخطر.</p>
<aside class="pitfall"><b>خطأ شائع:</b> جعل الظلال مجرد نسخ أغمق من اللون نفسه. أزح الظلال قليلًا نحو الأزرق أو البنفسجي واللمعات نحو الأصفر، وسيبدو المشهد أغنى بكثير.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «بيئات حيوية بالبكسل» في المعرض واستخرج لونًا واحدًا يظهر في كل البيئات. هذا هو الخيط الذي يربط اللعبة. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      image: "/images/02dcfbefe90d72b020174944578e35bf.jpg",
      en: { title: "Workshop: plan one scene with the nine elements", body: `<p>This workshop takes about <strong>35 minutes</strong>. You will plan a single game scene on paper, deciding each of the nine elements on purpose, then check whether it guides the player.</p>
<ol><li><b>Purpose</b> (3 min): write what the scene is for: "the player must find the hidden entrance to the old library".</li>
<li><b>Mood words</b> (2 min): choose three words: for example "quiet, forgotten, magical".</li>
<li><b>Palette</b> (5 min): pick four main colours and one accent colour for interactive objects.</li>
<li><b>Sketch</b> (10 min): draw the scene from above or the side. Mark the player's entry, the goal, and one landmark.</li>
<li><b>Nine-element table</b> (10 min): for each element write one decision: architecture "collapsed arches", lighting "one beam through the roof onto the entrance", sound "pages rustling in the wind", and so on.</li>
<li><b>Squint test</b> (5 min): look at your sketch with half-closed eyes. Is the brightest or highest-contrast area the goal? If not, adjust.</li></ol>
<aside class="example"><b>What you hand in:</b> the sketch, the palette, and the nine-element table, each with one line.</aside>
<aside class="pitfall"><b>Common mistake:</b> Leaving sound for later. Write the sound decisions now; they change how the place feels as much as colour does.</aside>
<aside class="try"><b>Try it:</b> <a class="go" href="#/gallery">▶ Gather references in the Gallery</a> <a class="go" href="#/studio">▶ Save your world in the Design Studio</a></aside>` },
      ar: { title: "ورشة تطبيقية: خطط مشهدًا بالعناصر التسعة", body: `<p>تستغرق هذه الورشة نحو <strong>35 دقيقة</strong>. ستخطط مشهدًا واحدًا من لعبة على الورق، وتحدد كل عنصر من العناصر التسعة عن قصد، ثم تتحقق هل يرشد اللاعب.</p>
<ol><li><b>الغرض</b> (3 دقائق): اكتب الغرض من المشهد: «يجب أن يجد اللاعب المدخل الخفي للمكتبة القديمة».</li>
<li><b>كلمات المزاج</b> (دقيقتان): اختر ثلاث كلمات، مثل: «هادئ، منسيّ، سحري».</li>
<li><b>لوحة الألوان</b> (5 دقائق): اختر أربعة ألوان رئيسية ولون تمييز واحدًا للأشياء القابلة للتفاعل.</li>
<li><b>الرسم</b> (10 دقائق): ارسم المشهد من الأعلى أو من الجانب. حدد مدخل اللاعب والهدف ومعلمًا واحدًا.</li>
<li><b>جدول العناصر التسعة</b> (10 دقائق): اكتب لكل عنصر قرارًا واحدًا: العمارة «أقواس منهارة»، والإضاءة «شعاع واحد من السقف على المدخل»، والصوت «حفيف صفحات في الريح»، وهكذا.</li>
<li><b>اختبار تضييق العينين</b> (5 دقائق): انظر إلى رسمك بعينين نصف مغمضتين. هل أكثر منطقة سطوعًا أو تباينًا هي الهدف؟ إن لم تكن، فعدّل.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> الرسم ولوحة الألوان وجدول العناصر التسعة، سطر لكل عنصر.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> ترك الصوت لوقت لاحق. اكتب قرارات الصوت الآن؛ فهي تغيّر إحساس المكان بقدر ما يغيّره اللون.</aside>
<aside class="try"><b>جرّبها:</b> <a class="go" href="#/gallery">▶ اجمع مراجعك من المعرض</a> <a class="go" href="#/studio">▶ احفظ عالمك في استوديو التصميم</a></aside>` }
    }
  ],

  /* ================================================================ */
  art: [
    {
      match: "Pick a style you can finish", image: "/images/1acff3228a3a5649a62c4a7136b54808.jpg",
      en: { title: "Pick a style you can finish", body: `<p>The best art style is not the most beautiful one; it is the one your team can produce <em>consistently</em> until the end. A game with 20 levels in a simple style beats a game with 3 levels in a stunning style that was never finished.</p>
<ul><li><strong>Pixel art</strong> — low resolution, fast to iterate, strong nostalgia. Hard to do well at high detail, and animation is frame by frame.</li>
<li><strong>Vector / hand-painted 2D</strong> — clean, scalable, great for mobile. Cut-out animation (moving body parts) saves time.</li>
<li><strong>Low-poly 3D</strong> — flat-shaded shapes, cheap to model, very readable, runs on any hardware.</li>
<li><strong>Isometric</strong> — 2D or 3D with a fixed diagonal camera; perfect for strategy, simulation and dungeon crawlers.</li>
<li><strong>Stylised 3D</strong> — chunky proportions, saturated colours, soft lighting. Needs more skill and time.</li></ul>
<aside class="example"><b>Worked example:</b> Estimate before you choose. Your game has 1 hero with 6 animations, 5 enemies with 3 animations each, and 4 biomes of 30 tiles. That is 21 animations and 120 tiles. In 32×32 pixel art at about 1 hour per animation and 15 minutes per tile, that is roughly 51 hours. In stylised 3D, the same list could take several hundred hours. The numbers make the choice for you.</aside>
<aside class="pitfall"><b>Common mistake:</b> Choosing a style because of a favourite game made by a 200-person studio. Look at games made by one or two people for realistic references.</aside>
<aside class="try"><b>Try it:</b> Browse the Gallery's art-style tags (Pixel, 3D, Isometric) and choose the one you could produce for a whole game. Then set it in the World & Style step of the Design Studio. <a class="go" href="#/gallery">▶ Gallery</a> <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "اختر أسلوبًا تستطيع إكماله", body: `<p>أفضل أسلوب رسم ليس الأجمل؛ إنه الأسلوب الذي يستطيع فريقك إنتاجه <em>باتساق</em> حتى النهاية. لعبة من 20 مرحلة بأسلوب بسيط تتفوق على لعبة من 3 مراحل بأسلوب مذهل لم تكتمل أبدًا.</p>
<ul><li><strong>فن البكسل</strong> — دقة منخفضة، وتعديل سريع، وحنين قوي. صعب الإتقان مع التفاصيل الكثيرة، والتحريك فيه إطارًا بإطار.</li>
<li><strong>الرسم المتجه / المرسوم يدويًا ثنائي الأبعاد</strong> — نظيف وقابل للتكبير ورائع للجوال. التحريك بالقطع (تحريك أجزاء الجسم) يوفر الوقت.</li>
<li><strong>ثلاثي الأبعاد منخفض المضلعات</strong> — أشكال مسطحة التظليل، ورخيص النمذجة، وواضح جدًا، ويعمل على أي جهاز.</li>
<li><strong>الأيزومتري</strong> — ثنائي أو ثلاثي الأبعاد بكاميرا قطرية ثابتة؛ مثالي للاستراتيجية والمحاكاة وألعاب الزنازين.</li>
<li><strong>ثلاثي الأبعاد المُنمَّق</strong> — نسب ممتلئة، وألوان مشبعة، وإضاءة ناعمة. يحتاج مهارة ووقتًا أكثر.</li></ul>
<aside class="example"><b>مثال عملي:</b> قدّر قبل أن تختار. في لعبتك بطل واحد بست حركات، وخمسة أعداء لكل منهم ثلاث حركات، وأربع بيئات في كل منها 30 مربعًا. هذا 21 حركة و120 مربعًا. بفن بكسل 32×32 بمعدل ساعة لكل حركة و15 دقيقة لكل مربع، يصبح المجموع نحو 51 ساعة. أما بالأسلوب ثلاثي الأبعاد المنمّق فقد تحتاج القائمة نفسها مئات الساعات. الأرقام تختار عنك.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> اختيار أسلوب لأنه أسلوب لعبتك المفضلة التي صنعها استوديو من 200 شخص. ابحث عن ألعاب صنعها شخص أو شخصان لتكون مراجعك واقعية.</aside>
<aside class="try"><b>جرّبها:</b> تصفح وسوم الأساليب في المعرض (بكسل، ثلاثي الأبعاد، أيزومتري) واختر الأسلوب الذي تستطيع إنتاجه للعبة كاملة. ثم حدده في خطوة العالم والأسلوب في استوديو التصميم. <a class="go" href="#/gallery">▶ المعرض</a> <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Character design: shape, silhouette, colour", image: "/images/18080658cb447a3e643dd2039e13cce1.jpg",
      en: { title: "Character design: shape, silhouette, colour", body: `<p>Great characters are recognisable from their <strong>silhouette alone</strong>. Fill a character in solid black: if you can still tell who it is, the design works. Scan this chart of tiny characters: most are recognisable from a few pixels, because their outlines are distinct.</p>
<ul><li><strong>Shape language</strong> — circles feel friendly, squares feel sturdy, triangles feel dangerous or clever.</li>
<li><strong>One signature colour</strong> per hero, repeated on their UI, so players can track them in a busy fight.</li>
<li><b>One or two motion cues</b> — a scarf, a cape, ears, a hood — give animators something to move and make the character feel alive.</li>
<li><b>Design for the role</b> — a speedster leans forward, a guardian stands wide, a stealth character hides the face.</li></ul>
<figure class="fig"><img src="/images/093b729522a9e810b4d3b822593d4727.jpg" alt="A lineup of hooded heroes"><figcaption>A lineup test: put all your characters side by side at the same height. Each one should differ in outline, not only in colour.</figcaption></figure>
<aside class="example"><b>Worked example:</b> Three heroes for a party game. The tank: built from squares, broad shoulders, a huge shield, dark blue. The healer: built from circles, a round hat, flowing sleeves, soft green. The rogue: built from triangles, a pointed hood, thin daggers, orange scarf. In a greyscale lineup they are still clearly different, and the scarf, sleeves and shield all move when they run.</aside>
<aside class="pitfall"><b>Common mistake:</b> Adding detail to make a character "interesting". Detail disappears at game size; a strong outline and one bold feature do not.</aside>
<aside class="try"><b>Try it:</b> Design your own hero in the Characters step of the Design Studio, then compare it with "Pixel character chart" and "Mascot design: simple and expressive" in the Gallery. <a class="go" href="#/studio">▶ Design Studio</a> <a class="go" href="#/gallery">▶ Gallery</a></aside>` },
      ar: { title: "تصميم الشخصيات: الشكل والظل الخارجي واللون", body: `<p>الشخصيات العظيمة تُعرف من <strong>ظلها الخارجي وحده</strong>. املأ الشخصية بالأسود الكامل: إذا ما زلت تعرف من هي، فالتصميم ناجح. تأمل لوحة الشخصيات الصغيرة هذه: معظمها يُعرف من بضعة بكسلات، لأن حدودها الخارجية مميزة.</p>
<ul><li><strong>لغة الأشكال</strong> — الدوائر توحي بالود، والمربعات بالصلابة، والمثلثات بالخطر أو الدهاء.</li>
<li><strong>لون مميز واحد</strong> لكل بطل، يتكرر في واجهته، ليتتبعه اللاعبون في المعارك المزدحمة.</li>
<li><b>علامة حركة أو اثنتان</b> — وشاح أو عباءة أو أذنان أو قلنسوة — تمنح المحرّكين شيئًا يحركونه وتجعل الشخصية حيّة.</li>
<li><b>صمّم للدور</b> — السريع يميل إلى الأمام، والحارس يقف بقدمين متباعدتين، والمتسلل يخفي وجهه.</li></ul>
<figure class="fig"><img src="/images/093b729522a9e810b4d3b822593d4727.jpg" alt="صف من الأبطال بالقلنسوات"><figcaption>اختبار الاصطفاف: ضع كل شخصياتك جنبًا إلى جنب بالارتفاع نفسه. يجب أن تختلف كل واحدة في حدودها الخارجية لا في لونها فقط.</figcaption></figure>
<aside class="example"><b>مثال عملي:</b> ثلاثة أبطال للعبة جماعية. المدافع: مبني من مربعات، أكتاف عريضة، ودرع ضخم، وأزرق داكن. المعالج: مبني من دوائر، قبعة مستديرة، وأكمام منسدلة، وأخضر ناعم. المتسلل: مبني من مثلثات، قلنسوة مدببة، وخناجر رفيعة، ووشاح برتقالي. في اصطفاف بالأبيض والأسود يبقون مختلفين بوضوح، والوشاح والأكمام والدرع كلها تتحرك حين يركضون.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> إضافة التفاصيل لجعل الشخصية «مثيرة». التفاصيل تختفي بحجم اللعبة، أما الحدود القوية والسمة الجريئة الواحدة فلا تختفي.</aside>
<aside class="try"><b>جرّبها:</b> صمّم بطلك في خطوة الشخصيات داخل استوديو التصميم، ثم قارنه بصورتي «مخطط شخصيات البكسل» و«تصميم الشخصية: بسيط ومعبّر» في المعرض. <a class="go" href="#/studio">▶ استوديو التصميم</a> <a class="go" href="#/gallery">▶ المعرض</a></aside>` }
    },
    {
      match: "Hybrid styles: 2D pixels in a 3D world", image: "/images/fcdc0e9522ec3c9501b02611066c936f.jpg",
      en: { title: "Hybrid styles: 2D pixels in a 3D world", body: `<p>Pixel-art sprites can live in a 3D space: flat characters standing on a tilted 3D plane with real depth, lighting and camera blur. The result feels both retro and modern, and it lets a small team combine cheap 2D characters with a 3D camera.</p>
<p>The rule that keeps it coherent: <strong>one pixel density</strong> for everything on screen. If a character is drawn at 32×32 and scaled ×4, every other sprite must also be scaled ×4. A ×4 character next to a ×2 tree looks broken immediately, even to people who cannot say why.</p>
<aside class="example"><b>Worked example:</b> A hero sprite of 32×32 pixels is shown at 128×128 screen pixels (×4). A tree drawn at 64×96 is shown at 256×384, also ×4. A small decoration drawn at 16×16 becomes 64×64. If the tree needs to look bigger, draw it bigger in pixels; never scale it by a different factor. In the 3D scene, the camera blur and lights affect the 3D world, while sprites face the camera (billboarding) so they never look paper-thin.</aside>
<p>Other hybrids worth knowing: 3D characters rendered into 2D sprites, 2D backgrounds behind 3D characters, and <strong>parallax</strong> layers, flat images that move at different speeds to fake depth.</p>
<aside class="pitfall"><b>Common mistake:</b> Rotating pixel sprites by small angles. Rotation breaks the pixel grid and creates jagged edges. Draw separate frames instead.</aside>
<aside class="try"><b>Try it:</b> Open "Pixel art in 3D space" in the Gallery and check: is every sprite the same pixel size? Then look at "Pixel swordswoman" for a single-character example. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "الأساليب الهجينة: بكسلات ثنائية الأبعاد في عالم ثلاثي", body: `<p>يمكن لشخصيات فن البكسل أن تعيش في فضاء ثلاثي الأبعاد: شخصيات مسطحة تقف على سطح ثلاثي الأبعاد مائل فيه عمق وإضاءة وضبابية كاميرا حقيقية. تبدو النتيجة قديمة وحديثة معًا، وتتيح للفريق الصغير الجمع بين شخصيات ثنائية الأبعاد رخيصة وكاميرا ثلاثية الأبعاد.</p>
<p>القاعدة التي تحفظ الاتساق: <strong>كثافة بكسل واحدة</strong> لكل ما على الشاشة. إذا رُسمت الشخصية بحجم 32×32 وكُبّرت ×4، فيجب تكبير كل صورة أخرى ×4 أيضًا. شخصية ×4 بجانب شجرة ×2 تبدو مكسورة فورًا، حتى لمن لا يستطيع تفسير السبب.</p>
<aside class="example"><b>مثال عملي:</b> صورة البطل 32×32 بكسل تُعرض بحجم 128×128 بكسل على الشاشة (×4). شجرة مرسومة بحجم 64×96 تُعرض بحجم 256×384، أيضًا ×4. زينة صغيرة بحجم 16×16 تصبح 64×64. إذا أردت الشجرة أكبر، فارسمها أكبر بالبكسلات؛ لا تكبّرها بمعامل مختلف أبدًا. في المشهد ثلاثي الأبعاد تؤثر الضبابية والأضواء في العالم ثلاثي الأبعاد، بينما تواجه الصور المسطحة الكاميرا دائمًا (Billboarding) فلا تبدو رقيقة كالورق.</aside>
<p>هجائن أخرى تستحق المعرفة: شخصيات ثلاثية الأبعاد تُحوَّل إلى صور ثنائية الأبعاد، وخلفيات ثنائية الأبعاد خلف شخصيات ثلاثية الأبعاد، وطبقات <strong>المنظور المتحرك</strong> (Parallax)، وهي صور مسطحة تتحرك بسرعات مختلفة لتوهم بالعمق.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تدوير صور البكسل بزوايا صغيرة. التدوير يكسر شبكة البكسل ويصنع حوافّ مسنّنة. ارسم إطارات منفصلة بدلًا من ذلك.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «فن البكسل في فضاء ثلاثي الأبعاد» في المعرض وتحقق: هل كل الصور بحجم البكسل نفسه؟ ثم انظر إلى «مقاتلة بالسيف بأسلوب البكسل» كمثال لشخصية منفردة. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Low-poly: shape over detail", image: "/images/8e3c920ba644f94924101abf5cfe2e20.jpg",
      en: { title: "Low-poly: shape over detail", body: `<p>Stacked cone trees, chunky rocks, a straight sandy path. <strong>Low-poly</strong> scenes use few polygons and flat colours instead of detailed textures. They rely on three things:</p>
<ul><li><b>Silhouette</b> — every object is recognisable by its shape: a cone is a pine, a sphere on a stick is a round tree.</li>
<li><b>A limited palette</b> — often each object has one or two colours, without texture images.</li>
<li><b>One strong light direction</b> — flat shading makes each face a different brightness, which shows the form.</li></ul>
<p>Low-poly runs on any hardware, models quickly and is the friendliest style for a first 3D game. Free tools such as Blender are enough to make a whole kit.</p>
<aside class="example"><b>Worked example:</b> A pine tree in 10 minutes: a cylinder with 6 sides for the trunk, three cones with 7 sides stacked on top, each one slightly smaller. Colour the trunk brown and the cones in two greens, darker at the bottom. Rotate each copy randomly and scale it between 80% and 120%, and 30 copies become a forest that does not look repetitive. Total: under 200 triangles per tree.</aside>
<p>Keep a <strong>polygon budget</strong>: for example 300 triangles for a prop, 1,500 for a character. A budget keeps the style consistent; one very detailed object in a low-poly world stands out as a mistake.</p>
<aside class="pitfall"><b>Common mistake:</b> Smooth shading on low-poly models. It blurs the faces and makes the style look unfinished. Use flat shading.</aside>
<aside class="try"><b>Try it:</b> Compare "Low-poly forest path" and "Low-poly everyman" in the Gallery. Count how few shapes make each one readable. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "المضلعات المنخفضة: الشكل قبل التفاصيل", body: `<p>أشجار من مخروطات متراكبة، وصخور ممتلئة، وطريق رملي مستقيم. تستخدم مشاهد <strong>المضلعات المنخفضة</strong> عددًا قليلًا من المضلعات وألوانًا مسطحة بدل الخامات المفصّلة. وتعتمد على ثلاثة أشياء:</p>
<ul><li><b>الظل الخارجي</b> — كل شيء يُعرف بشكله: المخروط صنوبرة، والكرة على عصا شجرة مستديرة.</li>
<li><b>لوحة ألوان محدودة</b> — غالبًا لكل شيء لون أو لونان، دون صور خامات.</li>
<li><b>اتجاه ضوء قوي واحد</b> — التظليل المسطح يجعل لكل وجه سطوعًا مختلفًا، فيظهر الشكل.</li></ul>
<p>هذا الأسلوب يعمل على أي جهاز، ونمذجته سريعة، وهو أودّ الأساليب للعبة ثلاثية الأبعاد أولى. الأدوات المجانية مثل Blender تكفي لصنع مجموعة كاملة.</p>
<aside class="example"><b>مثال عملي:</b> شجرة صنوبر في 10 دقائق: أسطوانة بستة أوجه للجذع، وثلاثة مخروطات بسبعة أوجه فوقها، كل واحد أصغر قليلًا. لوّن الجذع بالبني والمخروطات بدرجتين من الأخضر، الأغمق في الأسفل. دوّر كل نسخة عشوائيًا وغيّر حجمها بين 80% و120%، فتصبح 30 نسخة غابة لا تبدو مكررة. المجموع: أقل من 200 مثلث لكل شجرة.</aside>
<p>التزم <strong>بميزانية مضلعات</strong>: مثلًا 300 مثلث للغرض و1,500 للشخصية. الميزانية تحفظ اتساق الأسلوب؛ وشيء واحد شديد التفصيل في عالم منخفض المضلعات يبرز كخطأ.</p>
<aside class="pitfall"><b>خطأ شائع:</b> التظليل الناعم على نماذج المضلعات المنخفضة. يطمس الأوجه ويجعل الأسلوب يبدو غير مكتمل. استخدم التظليل المسطح.</aside>
<aside class="try"><b>جرّبها:</b> قارن صورتي «درب غابة منخفض المضلعات» و«شخصية عادية منخفضة المضلعات» في المعرض. عُدّ كم شكلًا قليلًا يكفي لجعل كل واحدة مقروءة. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Modular kits", image: "/images/e28c3ec7dbaaf46610b16d57720f5ba2.jpg",
      en: { title: "Modular kits", body: `<p>A <strong>modular kit</strong> is a set of pieces built on a shared grid: walls, floors, corners, doors, counters, chairs, food. Like building blocks, they snap together into many different rooms. In this image, the last panel shows the whole kit laid out, and the first three show different rooms built from it. One kit → dozens of levels.</p>
<p>Three technical rules make a kit work:</p>
<ul><li><b>A grid size</b> — for example 2 m × 2 m for walls and floors. Every piece is a multiple of it.</li>
<li><b>Consistent pivots</b> — the origin point of every wall is in the same corner, so pieces snap without gaps.</li>
<li><b>Variations</b> — a plain wall, a wall with a window, a damaged wall. Mixing them hides repetition.</li></ul>
<aside class="example"><b>Worked example:</b> A dungeon kit with 12 pieces: floor, wall, corner, doorway, pillar, stairs, plus three variants (cracked wall, mossy floor, wall torch) and three props (barrel, crate, chest). With these 12 pieces, a designer built 15 different rooms in two days. When an artist later improved the wall texture, all 15 rooms updated at once, because they all used the same piece.</aside>
<p>Kits are also ideal with free assets: many free packs are modular, so you can prototype levels on the first day and replace pieces later.</p>
<aside class="pitfall"><b>Common mistake:</b> Pieces that are 1.97 m instead of 2 m. Tiny gaps let light leak through and characters fall through floors. Snap to the grid every time.</aside>
<aside class="try"><b>Try it:</b> Open "Modular 3D restaurant kit" in the Gallery and count how many unique pieces appear in all three rooms. Then plan the five pieces your own game's kit would need. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "المجموعات المعيارية", body: `<p><strong>المجموعة المعيارية</strong> قطع مبنية على شبكة مشتركة: جدران وأرضيات وزوايا وأبواب ومناضد وكراسٍ وطعام. مثل قطع البناء، تتركب معًا لتصنع غرفًا كثيرة مختلفة. في هذه الصورة تُظهر اللوحة الأخيرة المجموعة كلها مرتّبة، وتُظهر الثلاث الأولى غرفًا مختلفة مبنية منها. مجموعة واحدة ← عشرات المراحل.</p>
<p>ثلاث قواعد تقنية تجعل المجموعة تعمل:</p>
<ul><li><b>حجم الشبكة</b> — مثلًا 2 م × 2 م للجدران والأرضيات. كل قطعة من مضاعفاته.</li>
<li><b>نقاط ارتكاز ثابتة</b> — نقطة الأصل لكل جدار في الزاوية نفسها، فتتركب القطع دون فراغات.</li>
<li><b>تنويعات</b> — جدار عادي، وجدار بنافذة، وجدار متضرر. خلطها يُخفي التكرار.</li></ul>
<aside class="example"><b>مثال عملي:</b> مجموعة زنزانة من 12 قطعة: أرضية، وجدار، وزاوية، ومدخل، وعمود، ودرج، وثلاث تنويعات (جدار متشقق، وأرضية بطحلب، وجدار عليه شعلة) وثلاثة أغراض (برميل، وصندوق، وصندوق كنز). بهذه القطع الاثنتي عشرة بنى مصمم 15 غرفة مختلفة في يومين. وحين حسّن الرسام لاحقًا خامة الجدار، تحدّثت الغرف الخمس عشرة كلها دفعة واحدة، لأنها جميعًا تستخدم القطعة نفسها.</aside>
<p>المجموعات مثالية أيضًا مع العناصر المجانية: كثير من الحزم المجانية معيارية، فتستطيع بناء نماذج المراحل في اليوم الأول واستبدال القطع لاحقًا.</p>
<aside class="pitfall"><b>خطأ شائع:</b> قطع طولها 1.97 م بدل 2 م. الفراغات الصغيرة تسرّب الضوء وتُسقط الشخصيات عبر الأرضيات. اربط القطع بالشبكة في كل مرة.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «حزمة مطعم معيارية ثلاثية الأبعاد» في المعرض وعُدّ القطع الفريدة التي تظهر في الغرف الثلاث. ثم خطط القطع الخمس التي ستحتاجها مجموعة لعبتك. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Designing item icons", image: "/images/67876e3341e10e0e6b5b0fdca2c87054.jpg",
      en: { title: "Designing item icons", body: `<p>Icons must be readable at 64 pixels or smaller, often on a phone, often for half a second. This sheet shows the rules in action:</p>
<ul><li>A <strong>strong silhouette</strong> per category: rings, goggles, bags, potions, books, belts and keys each have a shape you cannot confuse with another.</li>
<li><strong>Progression within a row</strong>: the plain satchel becomes an adventurer's pack with more straps, colour and detail. Players learn "more detail = better item" without reading a stat.</li>
<li><b>Rarity colour</b>: many games add a frame or glow (grey, green, blue, purple, gold) so value is visible at a glance.</li></ul>
<aside class="example"><b>Worked example:</b> Three tiers of a healing potion. Tier 1: a small round bottle, pale red liquid, no decoration. Tier 2: the same shape, a taller neck, brighter red, a cork with string. Tier 3: the same shape again, glowing red, a gold cap and a small sparkle. Shrink all three to 32×32: the bottle shape still says "healing potion", and the extra detail and glow still say "better". If tier 3 had been a completely different shape, players would not know it was the same item type.</aside>
<p>Test every icon by shrinking it to its smallest in-game size and viewing it in greyscale. If two icons are confused, change the shape, not just the colour.</p>
<aside class="pitfall"><b>Common mistake:</b> Drawing icons at 512 px with fine detail and shrinking them down. Draw at the final size first, or at least check it every few minutes.</aside>
<aside class="try"><b>Try it:</b> Open "RPG item icons" in the Gallery and pick one row. Describe in one sentence what changes from the first to the last icon. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "تصميم أيقونات الأغراض", body: `<p>يجب أن تُقرأ الأيقونات بحجم 64 بكسل أو أقل، غالبًا على هاتف، وغالبًا خلال نصف ثانية. تُظهر هذه اللوحة القواعد عمليًا:</p>
<ul><li><strong>ظل خارجي قوي</strong> لكل فئة: الخواتم والنظارات والحقائب والجرعات والكتب والأحزمة والمفاتيح، لكل منها شكل لا يُخلط بغيره.</li>
<li><strong>تدرّج داخل الصف</strong>: الحقيبة البسيطة تصبح حقيبة مغامر بأحزمة وألوان وتفاصيل أكثر. يتعلم اللاعبون أن «تفاصيل أكثر = غرض أفضل» دون قراءة أي رقم.</li>
<li><b>لون الندرة</b>: تضيف ألعاب كثيرة إطارًا أو توهجًا (رمادي، أخضر، أزرق، بنفسجي، ذهبي) لتظهر القيمة بلمحة.</li></ul>
<aside class="example"><b>مثال عملي:</b> ثلاث درجات من جرعة العلاج. الدرجة 1: قارورة صغيرة مستديرة، وسائل أحمر باهت، بلا زينة. الدرجة 2: الشكل نفسه، وعنق أطول، وأحمر أسطع، وسدادة بخيط. الدرجة 3: الشكل نفسه مجددًا، وأحمر متوهج، وغطاء ذهبي، وبريق صغير. صغّر الثلاث إلى 32×32: شكل القارورة ما زال يقول «جرعة علاج»، والتفاصيل والتوهج ما زالت تقول «أفضل». لو كانت الدرجة 3 بشكل مختلف تمامًا، لما عرف اللاعبون أنها من نوع الغرض نفسه.</aside>
<p>اختبر كل أيقونة بتصغيرها إلى أصغر حجم لها داخل اللعبة وعرضها بالأبيض والأسود. إذا اختلطت أيقونتان، فغيّر الشكل لا اللون فقط.</p>
<aside class="pitfall"><b>خطأ شائع:</b> رسم الأيقونات بحجم 512 بكسل بتفاصيل دقيقة ثم تصغيرها. ارسم بالحجم النهائي أولًا، أو تحقق منه كل بضع دقائق على الأقل.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «أيقونات عناصر تقمّص الأدوار» في المعرض واختر صفًا واحدًا. صِف في جملة واحدة ما الذي يتغير من الأيقونة الأولى إلى الأخيرة. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Free asset sources", image: "/images/0ce14877070edf73ce6e8dd221205e3a.jpg",
      en: { title: "Free asset sources", body: `<p>Free assets let you prototype fast and focus on gameplay. Well-known sources include <strong>Kenney.nl</strong> (huge, consistent packs under CC0), <strong>OpenGameArt</strong>, <strong>itch.io</strong> asset packs, the free section of <strong>CraftPix</strong>, and <strong>Quaternius</strong> for low-poly 3D.</p>
<p>Before you use anything, read its <strong>licence</strong>:</p>
<ul><li><b>CC0</b> — public domain: use it for anything, no credit required (crediting is still kind).</li>
<li><b>CC-BY</b> — free to use, but you must credit the author in your game.</li>
<li><b>CC-BY-SA</b> — credit, and your changes to the asset must use the same licence.</li>
<li><b>Non-commercial</b> — fine for learning, but not for a game you sell.</li></ul>
<aside class="example"><b>Worked example:</b> Keep a <em>credits.txt</em> file from day one. One line per asset: name, author, link, licence, and where you used it. For example: "Forest tileset — by Jane Artist — opengameart.org/… — CC-BY 4.0 — levels 1–3". When you publish, copy this list into your credits screen. It takes ten seconds per asset now and saves hours of searching later.</aside>
<p>Pro tip: mix packs and recolour them to a single palette so they look like one game. A palette swap in any image editor turns three different packs into one visual world.</p>
<aside class="pitfall"><b>Common mistake:</b> Using images from a web image search because they are "free to view". Viewing is not a licence; only use assets whose page clearly states their licence.</aside>
<aside class="try"><b>Try it:</b> Open "30 free 2D asset sources" in the Gallery and pick two sources. Find one pack in each that fits your game, and note its licence. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "مصادر العناصر المجانية", body: `<p>تتيح لك العناصر المجانية بناء النماذج بسرعة والتركيز على اللعب. من المصادر المعروفة <strong>Kenney.nl</strong> (حزم ضخمة متناسقة برخصة CC0)، و<strong>OpenGameArt</strong>، وحزم العناصر على <strong>itch.io</strong>، والقسم المجاني في <strong>CraftPix</strong>، و<strong>Quaternius</strong> للنماذج ثلاثية الأبعاد منخفضة المضلعات.</p>
<p>قبل أن تستخدم أي شيء، اقرأ <strong>رخصته</strong>:</p>
<ul><li><b>CC0</b> — ملكية عامة: استخدمه لأي غرض دون ذكر المؤلف (وذكره يبقى لطفًا).</li>
<li><b>CC-BY</b> — مجاني الاستخدام، لكن يجب أن تذكر المؤلف في لعبتك.</li>
<li><b>CC-BY-SA</b> — اذكر المؤلف، وتعديلاتك على العنصر يجب أن تحمل الرخصة نفسها.</li>
<li><b>غير تجاري</b> — مناسب للتعلّم، لا للعبة تبيعها.</li></ul>
<aside class="example"><b>مثال عملي:</b> احتفظ بملف <em>credits.txt</em> من اليوم الأول. سطر لكل عنصر: الاسم والمؤلف والرابط والرخصة وأين استخدمته. مثلًا: «مربعات الغابة — للرسامة فلانة — opengameart.org/… — CC-BY 4.0 — المراحل 1–3». عند النشر انسخ هذه القائمة إلى شاشة الشكر. يستغرق ذلك عشر ثوانٍ لكل عنصر الآن، ويوفر ساعات من البحث لاحقًا.</aside>
<p>نصيحة محترفين: اخلط الحزم وأعد تلوينها بلوحة ألوان واحدة لتبدو لعبة واحدة. تبديل لوحة الألوان في أي محرر صور يحوّل ثلاث حزم مختلفة إلى عالم بصري واحد.</p>
<aside class="pitfall"><b>خطأ شائع:</b> استخدام صور من محرك بحث الصور لأنها «متاحة للمشاهدة». المشاهدة ليست رخصة؛ استخدم فقط العناصر التي تذكر صفحتها رخصتها بوضوح.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «30 مصدرًا مجانيًا لأصول ثنائية الأبعاد» في المعرض واختر مصدرين. ابحث في كل منهما عن حزمة تناسب لعبتك، ودوّن رخصتها. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      image: "/images/548cfb7d32fc3e084665386d837063eb.jpg",
      en: { title: "Workshop: design a character in three passes", body: `<p>This workshop takes about <strong>40 minutes</strong>. You will design one game character the way professionals do: many quick silhouettes first, then shape and colour, then a final check at game size.</p>
<ol><li><b>Role and three words</b> (3 min): for example "a fast courier; cheerful, light, reckless".</li>
<li><b>Ten silhouettes</b> (12 min): fill ten small black shapes, about one minute each. Vary proportions wildly: big head, long legs, huge backpack.</li>
<li><b>Pick two</b> (3 min): choose the two that read best and best fit your three words.</li>
<li><b>Shape language</b> (7 min): redraw them with clear circles, squares or triangles. Add one motion cue: a scarf, ears or a cape.</li>
<li><b>Colour</b> (8 min): one signature colour, one secondary and one accent. Try two versions.</li>
<li><b>Game-size test</b> (7 min): draw the final version at 32 px tall (about the size of a fingernail). Is it still recognisable? If not, simplify.</li></ol>
<aside class="example"><b>What you hand in:</b> the page of ten silhouettes, the final coloured character, and its tiny game-size version side by side.</aside>
<aside class="pitfall"><b>Common mistake:</b> Starting with the face and details. Silhouettes first; details last.</aside>
<aside class="try"><b>Try it:</b> When you are done, add the character to your project in the Design Studio and upload your drawing as its image. <a class="go" href="#/studio">▶ Design Studio</a> <a class="go" href="#/gallery">▶ Character references in the Gallery</a></aside>` },
      ar: { title: "ورشة تطبيقية: صمّم شخصية على ثلاث مراحل", body: `<p>تستغرق هذه الورشة نحو <strong>40 دقيقة</strong>. ستصمم شخصية لعبة واحدة كما يفعل المحترفون: ظلال سريعة كثيرة أولًا، ثم الشكل واللون، ثم فحص أخير بحجم اللعبة.</p>
<ol><li><b>الدور وثلاث كلمات</b> (3 دقائق): مثل «ساعٍ سريع؛ مرح، خفيف، متهوّر».</li>
<li><b>عشرة ظلال</b> (12 دقيقة): املأ عشرة أشكال سوداء صغيرة، دقيقة لكل واحد تقريبًا. نوّع النسب بجرأة: رأس كبير، أو ساقان طويلتان، أو حقيبة ظهر ضخمة.</li>
<li><b>اختر اثنين</b> (3 دقائق): اختر الظلين الأوضح قراءة والأكثر تعبيرًا عن كلماتك الثلاث.</li>
<li><b>لغة الأشكال</b> (7 دقائق): أعد رسمهما بدوائر أو مربعات أو مثلثات واضحة. أضف علامة حركة واحدة: وشاحًا أو أذنين أو عباءة.</li>
<li><b>اللون</b> (8 دقائق): لون مميز واحد، ولون ثانوي، ولون تمييز. جرّب نسختين.</li>
<li><b>اختبار حجم اللعبة</b> (7 دقائق): ارسم النسخة النهائية بارتفاع 32 بكسل (بحجم ظفر الإصبع تقريبًا). هل ما زالت تُعرف؟ إن لم تكن، فبسّطها.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> صفحة الظلال العشرة، والشخصية النهائية الملوّنة، ونسختها الصغيرة بحجم اللعبة جنبًا إلى جنب.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> البدء بالوجه والتفاصيل. الظلال أولًا، والتفاصيل أخيرًا.</aside>
<aside class="try"><b>جرّبها:</b> حين تنتهي، أضف الشخصية إلى مشروعك في استوديو التصميم وارفع رسمتك كصورة لها. <a class="go" href="#/studio">▶ استوديو التصميم</a> <a class="go" href="#/gallery">▶ مراجع الشخصيات في المعرض</a></aside>` }
    }
  ],

  /* ================================================================ */
  audio: [
    {
      match: "Sound is half the feel", image: "/images/ad47519e8a1ee6d5c4001c0450eb4562.jpg",
      en: { title: "Sound is half the feel", body: `<p>Mute a great action game and it suddenly feels weak, as if the hits stopped landing. Sound does three jobs at once: it <em>confirms</em> that an action happened, tells the player <em>how well</em> it happened, and <em>warns</em> them of danger they cannot see.</p>
<p>Rule of thumb: <strong>every player action gets a sound</strong>, and important events get a sound that is clearly different from everything else. A critical hit should not sound like a normal hit; a rare item should not sound like a coin.</p>
<aside class="example"><b>Worked example:</b> A sword combo with three hits. Hit 1: a short "swish" and a dull impact. Hit 2: the same swish one semitone higher. Hit 3, the finisher: a deeper impact, a short metallic ring and 4 frames of hit-stop. Testers who heard the version without sound rated the combo "weak"; with sound, the same animation was rated "powerful". Not one frame of animation changed.</aside>
<p>Add small random changes in <strong>pitch</strong> (±5–10%) and volume to sounds that repeat often, such as footsteps, coins and gunshots. Ten identical footsteps in a row sound like a machine; slight variation sounds like a person walking.</p>
<p>Sound also carries information the screen cannot: an enemy behind you, a timer about to run out, a door opening somewhere else in the level.</p>
<aside class="pitfall"><b>Common mistake:</b> Adding all sounds at the very end. Use placeholder sounds from the first prototype; they change how testers feel about the game.</aside>
<aside class="try"><b>Try it:</b> Play Slime Arena twice: once with your device's sound on and once muted. Write one sentence about how the hits felt each time. <a class="go" href="#/lab/action">▶ Play Slime Arena</a></aside>` },
      ar: { title: "الصوت نصف الإحساس", body: `<p>اكتم صوت لعبة حركة رائعة وستبدو فجأة ضعيفة، كأن الضربات لم تعد تصيب. يؤدي الصوت ثلاث مهام في وقت واحد: <em>يؤكد</em> أن الفعل حدث، ويخبر اللاعب <em>بمدى جودة</em> تنفيذه، و<em>يحذّره</em> من خطر لا يراه.</p>
<p>قاعدة عامة: <strong>لكل فعل من أفعال اللاعب صوت</strong>، والأحداث المهمة لها صوت مختلف بوضوح عن كل ما عداها. الضربة الحاسمة لا ينبغي أن تُسمع مثل الضربة العادية، والغرض النادر لا ينبغي أن يُسمع مثل العملة.</p>
<aside class="example"><b>مثال عملي:</b> سلسلة ضربات بالسيف من ثلاث ضربات. الضربة 1: «حفيف» قصير وارتطام مكتوم. الضربة 2: الحفيف نفسه أعلى بنصف درجة. الضربة 3، الضربة الختامية: ارتطام أعمق، ورنين معدني قصير، وتجميد لحظي لأربعة إطارات. المختبِرون الذين سمعوا النسخة بلا صوت وصفوا السلسلة بأنها «ضعيفة»؛ ومع الصوت وُصف التحريك نفسه بأنه «قوي». لم يتغير إطار واحد من التحريك.</aside>
<p>أضف تغييرات عشوائية صغيرة في <strong>طبقة الصوت</strong> (±5–10%) وفي مستواه للأصوات المتكررة كثيرًا مثل الخطوات والعملات والطلقات. عشر خطوات متطابقة متتالية تبدو آلة، والتنويع الطفيف يبدو إنسانًا يمشي.</p>
<p>ويحمل الصوت أيضًا معلومات لا تستطيع الشاشة حملها: عدو خلفك، أو مؤقت على وشك الانتهاء، أو باب يُفتح في مكان آخر من المرحلة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> إضافة كل الأصوات في النهاية تمامًا. استخدم أصواتًا مؤقتة من النموذج الأول؛ فهي تغيّر إحساس المختبِرين باللعبة.</aside>
<aside class="try"><b>جرّبها:</b> العب «حلبة الهلام» مرتين: مرة وصوت جهازك مفتوح، ومرة وهو مكتوم. اكتب جملة عن إحساس الضربات في كل مرة. <a class="go" href="#/lab/action">▶ العب حلبة الهلام</a></aside>` }
    },
    {
      match: "The five layers of game audio", image: "",
      en: { title: "The five layers of game audio", body: `<p>Game audio is built in layers, and each one has its own job and its own volume control in a good options menu:</p>
<ol><li><strong>Music</strong> — sets the emotion and pace.</li>
<li><strong>Sound effects (SFX)</strong> — footsteps, hits, pickups, explosions: the feedback for actions.</li>
<li><strong>Ambience</strong> — wind, birds, distant traffic, a humming machine: makes a place feel alive even when nothing happens.</li>
<li><strong>UI sounds</strong> — clicks, confirms, errors. Keep them short and quiet.</li>
<li><strong>Voice</strong> — dialogue and barks.</li></ol>
<p>The skill is in the <em>mix</em>: deciding what is loudest at each moment. The gameplay-critical sounds (an enemy's attack wind-up, the low-health warning) must always cut through the music.</p>
<aside class="example"><b>Worked example:</b> A simple mixing table for a platformer, in decibels below maximum. Critical warnings 0 dB, player SFX −4 dB, enemy SFX −6 dB, voice −6 dB, music −14 dB, ambience −18 dB, UI −12 dB. In addition, when a voice line plays, music drops another 6 dB for its duration (this is called <strong>ducking</strong>), then returns over half a second. With these few rules, players hear every important sound without touching the volume.</aside>
<aside class="pitfall"><b>Common mistake:</b> Music that is as loud as the effects. Players lose the information sounds carry, and many simply switch the music off.</aside>
<aside class="try"><b>Try it:</b> Play Meteor Storm with headphones and list every sound you hear. Assign each one to one of the five layers. Is anything missing? <a class="go" href="#/lab/arcade">▶ Play Meteor Storm</a></aside>` },
      ar: { title: "الطبقات الخمس لصوت اللعبة", body: `<p>يُبنى صوت اللعبة في طبقات، لكل منها مهمتها، ولكل منها منزلق مستوى خاص في قائمة الخيارات الجيدة:</p>
<ol><li><strong>الموسيقى</strong> — تصنع العاطفة والإيقاع.</li>
<li><strong>المؤثرات الصوتية</strong> — الخطوات والضربات والالتقاط والانفجارات: التغذية الراجعة للأفعال.</li>
<li><strong>الأصوات المحيطة</strong> — الريح والطيور وحركة المرور البعيدة وطنين آلة: تجعل المكان حيًا حتى حين لا يحدث شيء.</li>
<li><strong>أصوات الواجهة</strong> — النقرات والتأكيد والأخطاء. اجعلها قصيرة وهادئة.</li>
<li><strong>الصوت البشري</strong> — الحوار والصيحات.</li></ol>
<p>المهارة في <em>المزج</em>: تحديد ما يكون الأعلى في كل لحظة. الأصوات الحاسمة للعب (استعداد عدو للهجوم، وتحذير انخفاض الصحة) يجب أن تخترق الموسيقى دائمًا.</p>
<aside class="example"><b>مثال عملي:</b> جدول مزج بسيط للعبة منصات، بالديسيبل تحت الحد الأقصى. التحذيرات الحاسمة 0، ومؤثرات اللاعب −4، ومؤثرات الأعداء −6، والصوت البشري −6، والموسيقى −14، والأصوات المحيطة −18، والواجهة −12. إضافة إلى ذلك، حين يُسمع سطر حوار، تنخفض الموسيقى 6 ديسيبل إضافية طوال مدته (ويسمى هذا <strong>الإخماد المؤقت</strong>)، ثم تعود خلال نصف ثانية. بهذه القواعد القليلة يسمع اللاعبون كل صوت مهم دون لمس مستوى الصوت.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> موسيقى بعلوّ المؤثرات نفسه. يفقد اللاعبون المعلومات التي تحملها الأصوات، ويطفئ كثيرون الموسيقى ببساطة.</aside>
<aside class="try"><b>جرّبها:</b> العب «عاصفة النيازك» بسماعات واكتب كل صوت تسمعه. انسب كل واحد إلى إحدى الطبقات الخمس. هل ينقص شيء؟ <a class="go" href="#/lab/arcade">▶ العب عاصفة النيازك</a></aside>` }
    },
    {
      match: "Adaptive music", image: "",
      en: { title: "Adaptive music", body: `<p><strong>Adaptive music</strong> changes with what is happening in the game, so the soundtrack follows the player instead of playing the same loop no matter what. Two common techniques:</p>
<ul><li><strong>Vertical layering</strong> — the track is recorded in layers that play together in sync (drums, strings, melody). Layers fade in or out as tension rises or falls.</li>
<li><strong>Horizontal re-sequencing</strong> — the music is split into sections (explore, combat, victory), and the game jumps between them at musical bar lines so the cut sounds natural.</li></ul>
<aside class="example"><b>Worked example:</b> A stealth level with three layers of the same 8-bar loop. Layer A (soft pads) always plays. Layer B (a ticking percussion) fades in over 2 seconds when an enemy is within 10 metres. Layer C (drums and brass) comes in when the player is spotted, and after 15 seconds without being seen it fades back out. Players reported that they "felt" danger before seeing it, because the percussion arrived first. The whole system needed one track split into three files and about 20 lines of code.</aside>
<p>Even a very simple version, such as adding a drum layer when enemies notice you, makes the world feel like it is reacting to the player. Matching tempo also matters: a calm puzzle game rarely needs more than 80–100 beats per minute; a racing game may push 140 or more.</p>
<aside class="pitfall"><b>Common mistake:</b> Switching tracks abruptly every time the state changes. If the player is in and out of combat every few seconds, the music flips constantly. Add a minimum time before switching back.</aside>
<aside class="try"><b>Try it:</b> In the Design Studio you can attach a music file to your project. Choose one track for exploring and describe in your pitch which layer you would add for danger. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "الموسيقى التكيّفية", body: `<p><strong>الموسيقى التكيّفية</strong> تتغير مع ما يحدث في اللعبة، فتتبع الموسيقى اللاعب بدل تكرار الحلقة نفسها مهما حدث. أسلوبان شائعان:</p>
<ul><li><strong>الطبقات العمودية</strong> — تُسجَّل المقطوعة في طبقات تُعزف معًا بتزامن (الإيقاع والوتريات واللحن). تظهر الطبقات أو تختفي تدريجيًا مع ارتفاع التوتر أو انخفاضه.</li>
<li><strong>إعادة الترتيب الأفقي</strong> — تُقسم الموسيقى إلى مقاطع (استكشاف، وقتال، وانتصار)، وتنتقل اللعبة بينها عند حدود المازورات الموسيقية فيبدو الانتقال طبيعيًا.</li></ul>
<aside class="example"><b>مثال عملي:</b> مرحلة تسلل فيها ثلاث طبقات من الحلقة نفسها ذات 8 مازورات. الطبقة A (خلفية ناعمة) تُعزف دائمًا. الطبقة B (إيقاع تكتكة) تظهر خلال ثانيتين حين يكون عدو على بعد 10 أمتار. الطبقة C (طبول ونحاسيات) تدخل حين يُكتشف اللاعب، وبعد 15 ثانية دون أن يُرى تختفي تدريجيًا. قال اللاعبون إنهم «شعروا» بالخطر قبل رؤيته، لأن الإيقاع وصل أولًا. احتاج النظام كله إلى مقطوعة واحدة مقسومة إلى ثلاثة ملفات ونحو 20 سطرًا من الشيفرة.</aside>
<p>حتى نسخة بسيطة جدًا، مثل إضافة طبقة طبول حين يلاحظك الأعداء، تجعل العالم يبدو متفاعلًا مع اللاعب. والإيقاع مهم أيضًا: لعبة ألغاز هادئة نادرًا ما تحتاج أكثر من 80 إلى 100 نبضة في الدقيقة، ولعبة سباق قد تصل إلى 140 أو أكثر.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تبديل المقطوعات فجأة مع كل تغير في الحالة. إذا دخل اللاعب القتال وخرج منه كل بضع ثوانٍ، تنقلب الموسيقى باستمرار. أضف حدًا أدنى من الوقت قبل العودة.</aside>
<aside class="try"><b>جرّبها:</b> في استوديو التصميم يمكنك إرفاق ملف موسيقى بمشروعك. اختر مقطوعة للاستكشاف، واكتب في عرضك أي طبقة ستضيفها للخطر. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Making and finding sounds", image: "",
      en: { title: "Making and finding sounds", body: `<p>You do not need a studio to get good game sounds. Four routes, from fastest to most personal:</p>
<ul><li><strong>Retro generators</strong>: free tools such as jsfxr, Bfxr and ChipTone generate jump, coin, laser and explosion sounds in seconds. Press "randomise" until something fits, then adjust.</li>
<li><strong>Recording</strong>: your phone plus everyday objects gives you excellent <em>foley</em> (recorded sound effects). Celery snaps make convincing bone breaks; a wet towel makes a heavy punch; shaking a box of rice makes rain.</li>
<li><strong>Editing</strong>: Audacity (free) for trimming, fades, noise removal and pitch changes.</li>
<li><strong>Libraries</strong>: freesound.org and other free libraries. Always check the <strong>licence</strong> (CC0 or CC-BY, which requires credit) and keep a credits file.</li></ul>
<aside class="example"><b>Worked example:</b> A footstep set in 20 minutes. Record yourself walking on gravel with a phone held close to your shoes, about 20 steps. In Audacity, cut each step into its own file, trim the silence, add a 10 ms fade at both ends, and normalise them to the same volume. Keep the best 6. In the game, pick one at random for each step and vary the pitch by ±5%. The result sounds natural and is completely yours.</aside>
<aside class="pitfall"><b>Common mistake:</b> Leaving silence at the start of a sound file. Even 50 ms of silence makes the sound arrive late and the action feel sluggish. Trim every file so it starts immediately.</aside>
<aside class="try"><b>Try it:</b> Open "25 free design tools" in the Gallery to find audio tools, then make or find three sounds for your game: a jump, a pickup and a hit. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "صنع الأصوات والعثور عليها", body: `<p>لا تحتاج إلى استوديو لتحصل على أصوات جيدة للعبتك. أربعة طرق، من الأسرع إلى الأكثر خصوصية:</p>
<ul><li><strong>المولّدات الكلاسيكية</strong>: أدوات مجانية مثل jsfxr وBfxr وChipTone تولّد أصوات القفز والعملات والليزر والانفجارات في ثوانٍ. اضغط «عشوائي» حتى يظهر صوت مناسب، ثم عدّله.</li>
<li><strong>التسجيل</strong>: هاتفك مع أشياء يومية يعطيك <em>مؤثرات فولي</em> ممتازة (مؤثرات صوتية مسجّلة). كسر عيدان الكرفس يشبه كسر العظام بشكل مقنع، والمنشفة المبللة تصنع لكمة ثقيلة، وهزّ علبة أرز يصنع المطر.</li>
<li><strong>التحرير</strong>: Audacity (مجاني) للقص والتلاشي وإزالة الضوضاء وتغيير الطبقة.</li>
<li><strong>المكتبات</strong>: freesound.org ومكتبات مجانية أخرى. تحقق دائمًا من <strong>الرخصة</strong> (CC0، أو CC-BY التي تتطلب ذكر المؤلف) واحتفظ بملف للشكر.</li></ul>
<aside class="example"><b>مثال عملي:</b> مجموعة خطوات في 20 دقيقة. سجّل نفسك تمشي على الحصى والهاتف قريب من حذائك، نحو 20 خطوة. في Audacity اقطع كل خطوة في ملف مستقل، واحذف الصمت، وأضف تلاشيًا مدته 10 ملّي ثانية في الطرفين، ووحّد مستوى الصوت. احتفظ بأفضل 6. في اللعبة اختر واحدة عشوائيًا لكل خطوة وغيّر طبقتها ±5%. النتيجة طبيعية وخاصة بك تمامًا.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> ترك صمت في بداية ملف الصوت. حتى 50 ملّي ثانية من الصمت تجعل الصوت يصل متأخرًا والفعل يبدو بطيئًا. قصّ كل ملف ليبدأ فورًا.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «25 أداة تصميم مجانية» في المعرض لتجد أدوات الصوت، ثم اصنع أو اعثر على ثلاثة أصوات للعبتك: قفزة، والتقاط، وضربة. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      image: "/images/9c591068f21ce6e5f57fea2ce375c7ea.jpg",
      en: { title: "Workshop: make a sound list and a mini mix", body: `<p>This workshop takes about <strong>35 minutes</strong>. You will list every sound your game needs, give each a priority, and produce three of them yourself.</p>
<ol><li><b>Action inventory</b> (8 min): write every player action and game event: jump, land, hit, get hurt, pick up, open door, win, lose, menu click.</li>
<li><b>Five layers</b> (5 min): next to each sound write its layer (music, SFX, ambience, UI, voice) and whether it is critical for gameplay.</li>
<li><b>Mixing order</b> (4 min): rank the sounds from loudest to quietest. Critical warnings at the top.</li>
<li><b>Make three sounds</b> (12 min): generate a jump and a pickup in a retro generator; record one foley sound with your phone.</li>
<li><b>Variation check</b> (6 min): play the pickup ten times in a row. Is it tiring? Write the pitch range you would use.</li></ol>
<aside class="example"><b>What you hand in:</b> the sound table (sound, layer, critical yes/no, rank) and three audio files with their sources and licences written down.</aside>
<aside class="pitfall"><b>Common mistake:</b> Forgetting the sounds of failure. Getting hurt, missing and losing need clear sounds too, so players understand what went wrong.</aside>
<aside class="try"><b>Try it:</b> Attach your best sound or a music track to your project in the Design Studio. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "ورشة تطبيقية: قائمة أصوات ومزج مصغّر", body: `<p>تستغرق هذه الورشة نحو <strong>35 دقيقة</strong>. ستكتب كل صوت تحتاجه لعبتك، وتمنح كلًّا منها أولوية، وتنتج ثلاثة منها بنفسك.</p>
<ol><li><b>جرد الأفعال</b> (8 دقائق): اكتب كل فعل من أفعال اللاعب وكل حدث في اللعبة: القفز، والهبوط، والضرب، والإصابة، والالتقاط، وفتح الباب، والفوز، والخسارة، ونقرة القائمة.</li>
<li><b>الطبقات الخمس</b> (5 دقائق): بجانب كل صوت اكتب طبقته (موسيقى، مؤثرات، محيطة، واجهة، صوت بشري) وهل هو حاسم للعب.</li>
<li><b>ترتيب المزج</b> (4 دقائق): رتّب الأصوات من الأعلى إلى الأهدأ. التحذيرات الحاسمة في الأعلى.</li>
<li><b>اصنع ثلاثة أصوات</b> (12 دقيقة): ولّد صوت قفزة وصوت التقاط في مولّد كلاسيكي، وسجّل صوت فولي واحدًا بهاتفك.</li>
<li><b>فحص التنويع</b> (6 دقائق): شغّل صوت الالتقاط عشر مرات متتالية. هل يُتعب؟ اكتب مدى تغيير الطبقة الذي ستستخدمه.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> جدول الأصوات (الصوت، والطبقة، وحاسم نعم/لا، والترتيب) وثلاثة ملفات صوتية مع مصادرها ورخصها مكتوبة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> نسيان أصوات الفشل. الإصابة والإخفاق والخسارة تحتاج أصواتًا واضحة أيضًا، ليفهم اللاعبون ما الذي حدث خطأ.</aside>
<aside class="try"><b>جرّبها:</b> أرفق أفضل صوت لديك أو مقطوعة موسيقية بمشروعك في استوديو التصميم. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    }
  ]
};
