/* Content v4 (part 4): foundations + gdd — deepen the two short foundations lessons and add a workshop to each unit. */
export default {
  foundations: [
    {
      match: "7 details that improve player experience", image: "/images/3c3669ea821034094d338cc469e40275.jpg",
      en: { title: "7 details that improve player experience", body: `<p>This infographic lists seven details that separate a game that feels good from one that feels frustrating. None of them needs a big budget; they are about clarity and respect for the player's time.</p>
<ol><li><strong>Clear objectives</strong> — a goal that is easy to spot, like a glowing castle on the horizon. The player should always be able to answer "what am I trying to do?"</li>
<li><strong>Readable level design</strong> — clear paths, landmarks and visual cues, so players know where they can go.</li>
<li><strong>Responsive controls</strong> — movement and actions react instantly and naturally.</li>
<li><strong>Strong feedback</strong> — every action visibly and audibly makes an impact.</li>
<li><strong>Helpful sound cues</strong> — audio guides, warns and rewards.</li>
<li><strong>Balanced difficulty</strong> — challenge builds gradually, not too early.</li>
<li><strong>Meaningful rewards</strong> — something worth working for.</li></ol>
<aside class="example"><b>Worked example:</b> One small level checked against the seven. Objective: a flag is visible from the start (✓). Readability: the path is lighter than the grass (✓). Controls: jump starts on the same frame as the press (✓). Feedback: coins vanish with no sound or effect (✗, add a ding and sparkles). Sound cues: no warning before a falling rock (✗, add a rumble). Difficulty: the hardest jump is the first one (✗, move it to the end). Reward: a new hat at the flag (✓). Three fixes, each under an hour, and the level feels completely different.</aside>
<p>Every one of these is something a playtest will reveal. Each later module in this course goes deeper into one or more of them.</p>
<aside class="pitfall"><b>Common mistake:</b> Treating these as polish for the end. Controls, feedback and readability decide whether testers enjoy even your first prototype.</aside>
<aside class="try"><b>Try it:</b> Play Meteor Storm and score it from 1 to 5 on each of the seven details. Which one is strongest, and which would you improve first? <a class="go" href="#/lab/arcade">▶ Play Meteor Storm</a></aside>` },
      ar: { title: "7 تفاصيل تحسّن تجربة اللاعب", body: `<p>يعرض هذا الإنفوجرافيك سبعة تفاصيل تفصل بين لعبة جميلة الإحساس ولعبة محبطة. لا يحتاج أيٌّ منها إلى ميزانية كبيرة؛ كلها تتعلق بالوضوح واحترام وقت اللاعب.</p>
<ol><li><strong>أهداف واضحة</strong> — هدف يسهل رصده، مثل قلعة مضيئة في الأفق. يجب أن يستطيع اللاعب دائمًا الإجابة عن «ماذا أحاول أن أفعل؟»</li>
<li><strong>تصميم مراحل مقروء</strong> — مسارات ومعالم وإشارات بصرية واضحة، ليعرف اللاعبون أين يستطيعون الذهاب.</li>
<li><strong>تحكم سريع الاستجابة</strong> — الحركة والأفعال تستجيب فورًا وبشكل طبيعي.</li>
<li><strong>تغذية راجعة قوية</strong> — لكل فعل أثر مرئي ومسموع.</li>
<li><strong>إشارات صوتية مفيدة</strong> — الصوت يرشد ويحذّر ويكافئ.</li>
<li><strong>صعوبة متوازنة</strong> — يُبنى التحدي تدريجيًا، لا مبكرًا جدًا.</li>
<li><strong>مكافآت ذات معنى</strong> — شيء يستحق العمل من أجله.</li></ol>
<aside class="example"><b>مثال عملي:</b> مرحلة صغيرة واحدة تُفحص بالتفاصيل السبعة. الهدف: راية تُرى من البداية (✓). المقروئية: الطريق أفتح من العشب (✓). التحكم: القفزة تبدأ في إطار الضغط نفسه (✓). التغذية الراجعة: العملات تختفي بلا صوت أو أثر (✗، أضف رنينًا وبريقًا). الإشارات الصوتية: لا تحذير قبل سقوط الصخرة (✗، أضف هديرًا). الصعوبة: أصعب قفزة هي الأولى (✗، انقلها إلى النهاية). المكافأة: قبعة جديدة عند الراية (✓). ثلاثة إصلاحات، كل منها أقل من ساعة، وتبدو المرحلة مختلفة تمامًا.</aside>
<p>كل واحد من هذه التفاصيل سيكشفه اختبار اللعب. وكل وحدة لاحقة في هذه الدورة تتعمق في واحد منها أو أكثر.</p>
<aside class="pitfall"><b>خطأ شائع:</b> معاملتها كتحسينات للنهاية. التحكم والتغذية الراجعة والمقروئية تحدد هل يستمتع المختبِرون حتى بنموذجك الأول.</aside>
<aside class="try"><b>جرّبها:</b> العب «عاصفة النيازك» وقيّمها من 1 إلى 5 في كل تفصيل من السبعة. أيها الأقوى، وأيها ستحسّنه أولًا؟ <a class="go" href="#/lab/arcade">▶ العب عاصفة النيازك</a></aside>` }
    },
    {
      match: "Deconstruct games without copying them", image: "/images/f6252ae0a48cf7d8bc2ab29d2ab8b605.jpg",
      en: { title: "Deconstruct games without copying them", body: `<p>Playing as a designer is a skill you can practise. Pick a game you love, play for twenty minutes, and take notes on four questions:</p>
<ol><li>What is the <strong>core loop</strong>? Write it as a cycle of verbs: "explore → fight → loot → upgrade".</li>
<li>What <strong>decisions</strong> does the player make every minute?</li>
<li>How does the game <strong>teach</strong> its first mechanic?</li>
<li>What keeps you playing: <strong>goals, rewards or curiosity</strong>?</li></ol>
<aside class="example"><b>Worked example:</b> Deconstructing a farming game. Core loop: plant → water → wait → harvest → sell → buy better seeds. Decisions every minute: which crop to plant (fast and cheap or slow and valuable), where to spend limited energy. Teaching: the first day gives exactly 15 seeds and one empty field, so the player plants without being told. What keeps you playing: short goals (tomorrow's harvest) layered over long ones (repairing the community building). The <em>principle</em> worth reusing: "short and long goals running at the same time".</aside>
<p>Then take the <em>principle</em>, not the content. "Short runs with permanent upgrades" is a principle you can reuse in a completely different game. The characters, art, names and levels of the original are not yours to take.</p>
<aside class="pitfall"><b>Common mistake:</b> Deconstructing only what a game shows (its art, story and features) and missing what it makes you <em>do</em>. Always start from the verbs.</aside>
<aside class="try"><b>Try it:</b> The Games Showcase contains eight deconstructions written in exactly this way: loop, structure, mechanics, audience and lessons. Read one, then write your own for a game you play. <a class="go" href="#/games">▶ Open the Games Showcase</a></aside>` },
      ar: { title: "فكّك الألعاب دون أن تنسخها", body: `<p>اللعب بعين المصمّم مهارة يمكن التدرب عليها. اختر لعبة تحبها، والعبها عشرين دقيقة، ودوّن ملاحظاتك على أربعة أسئلة:</p>
<ol><li>ما <strong>الحلقة الأساسية</strong>؟ اكتبها دورةً من الأفعال: «استكشف ← قاتل ← اغنم ← طوّر».</li>
<li>ما <strong>القرارات</strong> التي يتخذها اللاعب كل دقيقة؟</li>
<li>كيف <strong>تعلّم</strong> اللعبة آليتها الأولى؟</li>
<li>ما الذي يجعلك تواصل اللعب: <strong>الأهداف أم المكافآت أم الفضول</strong>؟</li></ol>
<aside class="example"><b>مثال عملي:</b> تفكيك لعبة مزرعة. الحلقة الأساسية: ازرع ← اسقِ ← انتظر ← احصد ← بِع ← اشترِ بذورًا أفضل. القرارات كل دقيقة: أي محصول تزرع (سريع ورخيص أم بطيء وثمين)، وأين تنفق طاقتك المحدودة. التعليم: اليوم الأول يعطيك 15 بذرة بالضبط وحقلًا فارغًا واحدًا، فيزرع اللاعب دون أن يُطلب منه. ما يبقيك تلعب: أهداف قصيرة (حصاد الغد) فوق أهداف طويلة (ترميم مبنى القرية). <em>المبدأ</em> الذي يستحق إعادة الاستخدام: «أهداف قصيرة وطويلة تعمل في الوقت نفسه».</aside>
<p>ثم خذ <em>المبدأ</em> لا المحتوى. «جولات قصيرة مع ترقيات دائمة» مبدأ يمكنك إعادة استخدامه في لعبة مختلفة تمامًا. أما شخصيات اللعبة الأصلية ورسومها وأسماؤها ومراحلها فليست لك.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تفكيك ما تعرضه اللعبة فقط (رسومها وقصتها وميزاتها) وتجاهل ما تجعلك <em>تفعله</em>. ابدأ دائمًا من الأفعال.</aside>
<aside class="try"><b>جرّبها:</b> يضم معرض الألعاب ثمانية تحليلات مكتوبة بهذه الطريقة بالضبط: الحلقة والبنية والآليات والجمهور والدروس. اقرأ واحدًا، ثم اكتب تحليلك للعبة تلعبها. <a class="go" href="#/games">▶ افتح معرض الألعاب</a></aside>` }
    },
    {
      image: "/images/7b2fa29bbd6afeeb415c1689c2f146ad.jpg",
      en: { title: "Workshop: add one decision to a game with none", body: `<p>This workshop takes about <strong>30 minutes</strong>. You will take a game that has almost no decisions, add one rule, and test whether it became a real game. You need a die, a paper board and two players.</p>
<ol><li><b>Base game</b> (5 min): draw a track of 30 squares. Each turn, roll the die and move. First to square 30 wins. Play one round: notice that you never decide anything.</li>
<li><b>Name the elements</b> (5 min): write the six formal elements of this game: players, objective, rules, resources, conflict, boundaries. Which one is missing or empty? (Hint: resources.)</li>
<li><b>Add a resource and a trade-off</b> (5 min): each player gets 3 tokens. Before rolling, you may spend a token to roll two dice and choose one. Squares 10 and 20 give a token back.</li>
<li><b>Play again</b> (10 min): note every moment someone has to think.</li>
<li><b>Reflect</b> (5 min): what is the trade-off? What is uncertain? What changes after you choose? Write one sentence for each.</li></ol>
<aside class="example"><b>What you hand in:</b> the new rule, the six elements, and three sentences: the trade-off, the uncertainty and the consequence.</aside>
<aside class="pitfall"><b>Common mistake:</b> Adding a rule that is always good to use. If players spend every token at once, the choice is fake; make saving them valuable too.</aside>
<aside class="try"><b>Try it:</b> Then play Four in a Row in the Game Lab: a game where every turn is a decision. <a class="go" href="#/lab/board">▶ Play Four in a Row</a></aside>` },
      ar: { title: "ورشة تطبيقية: أضف قرارًا إلى لعبة بلا قرارات", body: `<p>تستغرق هذه الورشة نحو <strong>30 دقيقة</strong>. ستأخذ لعبة تكاد تخلو من القرارات، وتضيف قاعدة واحدة، وتختبر هل أصبحت لعبة حقيقية. تحتاج نردًا ولوحة ورقية ولاعبَين.</p>
<ol><li><b>اللعبة الأساسية</b> (5 دقائق): ارسم مسارًا من 30 مربعًا. في كل دور ارمِ النرد وتحرك. أول من يصل إلى المربع 30 يفوز. العب جولة: لاحظ أنك لا تقرر شيئًا أبدًا.</li>
<li><b>سمِّ العناصر</b> (5 دقائق): اكتب العناصر الشكلية الستة لهذه اللعبة: اللاعبون، والهدف، والقواعد، والموارد، والصراع، والحدود. أيها مفقود أو فارغ؟ (تلميح: الموارد.)</li>
<li><b>أضف موردًا ومقايضة</b> (5 دقائق): يحصل كل لاعب على 3 قطع. قبل الرمي يمكنك إنفاق قطعة لترمي نردين وتختار أحدهما. المربعان 10 و20 يعيدان قطعة.</li>
<li><b>العب مجددًا</b> (10 دقائق): دوّن كل لحظة اضطر فيها أحد إلى التفكير.</li>
<li><b>تأمّل</b> (5 دقائق): ما المقايضة؟ ما غير المؤكد؟ ما الذي يتغير بعد أن تختار؟ اكتب جملة لكل منها.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> القاعدة الجديدة، والعناصر الستة، وثلاث جمل: المقايضة، وعدم اليقين، والعاقبة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> إضافة قاعدة يكون استخدامها جيدًا دائمًا. إذا أنفق اللاعبون كل القطع دفعة واحدة، فالخيار زائف؛ اجعل ادخارها ثمينًا أيضًا.</aside>
<aside class="try"><b>جرّبها:</b> بعدها العب «أربعة في صف» في مختبر اللعب: لعبة كل دور فيها قرار. <a class="go" href="#/lab/board">▶ العب أربعة في صف</a></aside>` }
    }
  ],

  gdd: [
    {
      image: "/images/59a14c35737e4f4ebe0430940e3070f6.jpg",
      en: { title: "Workshop: write a one-page GDD", body: `<p>This workshop takes about <strong>45 minutes</strong>. You will write a one-page game design document that another person could read in five minutes and understand your game.</p>
<ol><li><b>Pitch</b> (5 min): one sentence with the genre, the hero and the twist: "A cosy puzzle game where a tiny robot repairs a lighthouse by rerouting light beams."</li>
<li><b>Pillars</b> (5 min): three short phrases that say no to features.</li>
<li><b>Core loop</b> (5 min): four verbs in a cycle, with one sentence each.</li>
<li><b>Mechanics</b> (10 min): two or three mechanics written precisely enough to build, with numbers: "The beam travels 6 tiles; each mirror rotates in 90° steps; a level has at most 5 mirrors."</li>
<li><b>Content and scope</b> (8 min): how many levels, characters, enemies and minutes of play? Cut until it fits your time.</li>
<li><b>Audience and platform</b> (5 min): who plays it, on which device, for how long per session.</li>
<li><b>Review</b> (7 min): give it to someone and ask them to explain your game back to you. Fix what they got wrong.</li></ol>
<aside class="example"><b>What you hand in:</b> one page, with headings in this order: Pitch, Pillars, Core loop, Mechanics, Content & scope, Audience & platform.</aside>
<aside class="pitfall"><b>Common mistake:</b> Writing twenty pages before building anything. One page now, expanded only when the prototype proves the idea.</aside>
<aside class="try"><b>Try it:</b> The Design Studio builds exactly this document from your choices and exports it as GDD.md in the project pack. Fill in the steps, then edit the exported file. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "ورشة تطبيقية: اكتب وثيقة تصميم من صفحة واحدة", body: `<p>تستغرق هذه الورشة نحو <strong>45 دقيقة</strong>. ستكتب وثيقة تصميم من صفحة واحدة يستطيع شخص آخر قراءتها في خمس دقائق وفهم لعبتك.</p>
<ol><li><b>العرض</b> (5 دقائق): جملة واحدة فيها النوع والبطل واللمسة المميزة: «لعبة ألغاز هادئة يصلح فيها روبوت صغير منارةً بإعادة توجيه أشعة الضوء.»</li>
<li><b>الركائز</b> (5 دقائق): ثلاث عبارات قصيرة تقول «لا» للميزات.</li>
<li><b>الحلقة الأساسية</b> (5 دقائق): أربعة أفعال في دورة، بجملة لكل منها.</li>
<li><b>الآليات</b> (10 دقائق): آليتان أو ثلاث مكتوبة بدقة تكفي للبناء، مع الأرقام: «يقطع الشعاع 6 مربعات؛ كل مرآة تدور بخطوات 90°؛ في المرحلة 5 مرايا على الأكثر.»</li>
<li><b>المحتوى والنطاق</b> (8 دقائق): كم مرحلة وشخصية وعدوًّا وكم دقيقة لعب؟ احذف حتى يتسع لوقتك.</li>
<li><b>الجمهور والمنصة</b> (5 دقائق): من يلعبها، وعلى أي جهاز، وكم تستمر الجلسة.</li>
<li><b>المراجعة</b> (7 دقائق): أعطها لشخص واطلب منه أن يشرح لك لعبتك. أصلح ما فهمه خطأ.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> صفحة واحدة، بعناوين بهذا الترتيب: العرض، والركائز، والحلقة الأساسية، والآليات، والمحتوى والنطاق، والجمهور والمنصة.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> كتابة عشرين صفحة قبل بناء أي شيء. صفحة واحدة الآن، تُوسَّع فقط حين يُثبت النموذج الفكرة.</aside>
<aside class="try"><b>جرّبها:</b> يبني استوديو التصميم هذه الوثيقة بالضبط من اختياراتك، ويصدّرها كملف GDD.md في حزمة المشروع. املأ الخطوات، ثم حرّر الملف المصدَّر. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    }
  ]
};
