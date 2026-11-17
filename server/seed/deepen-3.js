/* Content v4 (part 3): deeper lessons for ui, progression, ai, arabic, production. See deepen-1.js for the format. */
export default {
  /* ================================================================ */
  ui: [
    {
      match: "The anatomy of a mobile HUD", image: "/images/800edad8be4259bef7e61dbc74bc3ce1.jpg",
      en: { title: "The anatomy of a mobile HUD", body: `<p>The <strong>HUD</strong> (heads-up display) is the information layered over the game: health, currencies, map, buttons. This mobile RPG HUD follows a layout that is almost universal, because each corner answers one question:</p>
<ul><li><b>Top-left</b> — portrait, level, health and mana: "who am I and am I OK?"</li>
<li><b>Top-centre</b> — currencies: "what can I afford?"</li>
<li><b>Top-right</b> — minimap and quest tracker: "where am I going?"</li>
<li><b>Bottom-left</b> — virtual joystick, for the left thumb.</li>
<li><b>Bottom-right</b> — a big attack button ringed by skills, for the right thumb.</li>
<li><b>Bottom bar</b> — menus you open between fights.</li></ul>
<p>The principle behind it: <strong>frequency of use decides size and position</strong>. The attack button is the largest because it is pressed hundreds of times per session; the settings button is small and tucked away because it is pressed once.</p>
<aside class="example"><b>Worked example:</b> Count presses in a 5-minute session: attack 240, skill 1 35, skill 2 20, potion 6, map 3, settings 0. Give the attack button the largest size (about 2× a skill button) and the best thumb position. Put the potion close but separate, so it is not pressed by accident. The map and settings can live in the top corners where reaching costs effort, because they are rarely needed.</aside>
<aside class="pitfall"><b>Common mistake:</b> Covering the centre of the screen. The middle is where the action happens; keep the HUD at the edges, and fade it out when it is not needed.</aside>
<aside class="try"><b>Try it:</b> Open "Mobile MMORPG HUD" in the Gallery and label each corner with the question it answers. Then look at "HUD & player feedback (before/after)". <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "تشريح واجهة لعبة الجوال", body: `<p><strong>الواجهة الطافية</strong> (HUD) هي المعلومات المعروضة فوق اللعبة: الصحة والعملات والخريطة والأزرار. تتبع واجهة لعبة الأدوار هذه على الجوال تخطيطًا شبه عالمي، لأن كل زاوية تجيب عن سؤال واحد:</p>
<ul><li><b>أعلى اليسار</b> — الصورة والمستوى والصحة والطاقة السحرية: «من أنا وهل أنا بخير؟»</li>
<li><b>أعلى الوسط</b> — العملات: «ماذا أستطيع أن أشتري؟»</li>
<li><b>أعلى اليمين</b> — الخريطة المصغرة ومتتبع المهام: «إلى أين أذهب؟»</li>
<li><b>أسفل اليسار</b> — عصا التحكم الافتراضية، للإبهام الأيسر.</li>
<li><b>أسفل اليمين</b> — زر هجوم كبير تحيط به المهارات، للإبهام الأيمن.</li>
<li><b>الشريط السفلي</b> — قوائم تفتحها بين المعارك.</li></ul>
<p>المبدأ وراء ذلك: <strong>تكرار الاستخدام يحدد الحجم والموضع</strong>. زر الهجوم هو الأكبر لأنه يُضغط مئات المرات في الجلسة، وزر الإعدادات صغير ومخفي في زاوية لأنه يُضغط مرة واحدة.</p>
<aside class="example"><b>مثال عملي:</b> عُدّ الضغطات في جلسة مدتها 5 دقائق: الهجوم 240، والمهارة 1 خمس وثلاثون، والمهارة 2 عشرون، والجرعة 6، والخريطة 3، والإعدادات 0. امنح زر الهجوم أكبر حجم (نحو ضعف زر المهارة) وأفضل موضع للإبهام. ضع الجرعة قريبة لكن منفصلة، حتى لا تُضغط بالخطأ. الخريطة والإعدادات يمكن أن تكون في الزوايا العليا حيث يتطلب الوصول جهدًا، لأنها نادرًا ما تُحتاج.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> تغطية وسط الشاشة. الوسط هو مكان الأحداث؛ أبقِ الواجهة عند الحواف، واجعلها تتلاشى حين لا تكون مطلوبة.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «شاشة لعبة جماعية على الجوال» في المعرض واكتب عند كل زاوية السؤال الذي تجيب عنه. ثم انظر إلى «شاشة اللعب والتغذية الراجعة (قبل/بعد)». <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Thumb zones and touch targets", image: "",
      en: { title: "Thumb zones and touch targets", body: `<p>On a phone held in two hands, the thumbs rest near the bottom corners. Those areas are easy to reach; the top centre is the hardest. This map of comfort is called the <strong>thumb zone</strong>, and it should decide where you put every control.</p>
<ul><li><b>Easy zone</b> (bottom corners, lower sides): constant actions such as moving, jumping and attacking.</li>
<li><b>Stretch zone</b> (middle sides): occasional actions such as switching weapons or using a potion.</li>
<li><b>Hard zone</b> (top centre): information to glance at, never something to press in a hurry.</li></ul>
<p>Keep every <strong>touch target</strong> at least about 44–48 px (roughly 9 mm), and leave space between targets so a thumb cannot hit two at once. A thumb covers far more than the tip of a mouse cursor.</p>
<aside class="example"><b>Worked example:</b> In a playtest of a mobile runner, players kept pausing the game by accident. The pause button was 36 px and sat 20 px above the jump button. Moving pause to the top corner and enlarging jump to 96 px stopped every accidental pause, and jump timing improved because players could press without looking. Two layout changes, no code changes.</aside>
<p>Remember left-handed players: offer a "swap sides" option. And remember different phones: test on a small screen, because a layout that fits a large phone may overlap on a small one.</p>
<aside class="pitfall"><b>Common mistake:</b> Designing the mobile layout on a computer monitor with a mouse. Always test on a real phone, held the way players hold it.</aside>
<aside class="try"><b>Try it:</b> Open this platform on your phone and play Checkpoint Rush. Which controls are comfortable, and which force you to stretch? <a class="go" href="#/lab/racing">▶ Play Checkpoint Rush</a></aside>` },
      ar: { title: "مناطق الإبهام وأهداف اللمس", body: `<p>حين يُمسك الهاتف باليدين، تستقر الإبهامات قرب الزاويتين السفليتين. الوصول إلى هاتين المنطقتين سهل، وأعلى الوسط هو الأصعب. تُسمّى خريطة الراحة هذه <strong>منطقة الإبهام</strong>، ويجب أن تحدد مكان كل عنصر تحكم.</p>
<ul><li><b>المنطقة السهلة</b> (الزاويتان السفليتان والجانبان السفليان): الأفعال الدائمة مثل الحركة والقفز والهجوم.</li>
<li><b>منطقة الامتداد</b> (منتصف الجانبين): الأفعال العرضية مثل تبديل السلاح أو استخدام جرعة.</li>
<li><b>المنطقة الصعبة</b> (أعلى الوسط): معلومات تُلقى عليها نظرة، لا شيء يُضغط على عجل أبدًا.</li></ul>
<p>اجعل كل <strong>هدف لمس</strong> بحجم 44 إلى 48 بكسل تقريبًا على الأقل (نحو 9 ملم)، واترك مسافة بين الأهداف حتى لا يضغط الإبهام اثنين معًا. الإبهام يغطي مساحة أكبر بكثير من رأس مؤشر الفأرة.</p>
<aside class="example"><b>مثال عملي:</b> في اختبار للعبة جري على الجوال، ظل اللاعبون يوقفون اللعبة مؤقتًا دون قصد. كان زر الإيقاف 36 بكسل ويقع على بعد 20 بكسل فوق زر القفز. نقل زر الإيقاف إلى الزاوية العليا وتكبير زر القفز إلى 96 بكسل أوقف كل الإيقافات غير المقصودة، وتحسّن توقيت القفز لأن اللاعبين صاروا يضغطون دون النظر. تغييران في التخطيط، ولا تغيير في الشيفرة.</aside>
<p>تذكّر اللاعبين العُسر: وفّر خيار «تبديل الجهتين». وتذكّر اختلاف الهواتف: اختبر على شاشة صغيرة، لأن التخطيط الذي يناسب هاتفًا كبيرًا قد يتداخل على هاتف صغير.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تصميم واجهة الجوال على شاشة حاسوب باستخدام الفأرة. اختبر دائمًا على هاتف حقيقي، ممسوك كما يمسكه اللاعبون.</aside>
<aside class="try"><b>جرّبها:</b> افتح هذه المنصة على هاتفك والعب «سباق نقاط التفتيش». أي عناصر التحكم مريحة، وأيها يجبرك على مدّ إبهامك؟ <a class="go" href="#/lab/racing">▶ العب سباق نقاط التفتيش</a></aside>` }
    },
    {
      match: "Battle UI: cards, cooldowns and resources", image: "/images/df9a9615d48fa95c249a3b296a4b8220.jpg",
      en: { title: "Battle UI: cards, cooldowns and resources", body: `<p>In a fast battle, the player has no time to read. Good battle UI shows three things at a glance:</p>
<ul><li><strong>State</strong> — who is winning? Health bars, tower health, the score.</li>
<li><strong>Cost</strong> — what can I afford right now? Card costs and the current resource.</li>
<li><strong>Timing</strong> — when can I act again? Cooldowns, the energy refill, the match clock.</li></ul>
<p>In this lane battler, both sides' health bars face each other at the top, the pause button sits in the middle and the bottom row shows unit cards with their cost. A segmented energy bar fills over time, so the player can see exactly when they can afford the next unit.</p>
<aside class="example"><b>Worked example:</b> Showing a cooldown, three ways. Version 1: a number "4.2" on the button. Players must read and calculate. Version 2: a dark overlay that shrinks clockwise like a clock. Readable without looking directly at it. Version 3: the clock overlay plus a short flash and a "ready" sound when it ends. Testers using version 3 used their skills about 30% more often, because they noticed every time a skill became ready.</aside>
<p>Use the same visual language everywhere: if greyed-out means "can't afford" on cards, it must mean the same on the shop buttons and upgrades.</p>
<aside class="pitfall"><b>Common mistake:</b> Showing exact numbers for everything. Numbers are precise but slow; bars, colours and shapes are fast. Show the numbers on request, not by default.</aside>
<aside class="try"><b>Try it:</b> Play Path Defense and watch your gold: can you tell at a glance whether you can afford the next tower? Then read the Clash Royale breakdown. <a class="go" href="#/lab/strategy">▶ Path Defense</a> <a class="go" href="#/games/clash-royale">▶ Clash Royale breakdown</a></aside>` },
      ar: { title: "واجهة المعركة: البطاقات وفترات التهدئة والموارد", body: `<p>في المعركة السريعة لا وقت لدى اللاعب للقراءة. واجهة المعركة الجيدة تُظهر ثلاثة أشياء بلمحة:</p>
<ul><li><strong>الحالة</strong> — من يفوز؟ أشرطة الصحة، وصحة الأبراج، والنتيجة.</li>
<li><strong>التكلفة</strong> — ماذا أستطيع أن أدفع الآن؟ تكلفة البطاقات والمورد الحالي.</li>
<li><strong>التوقيت</strong> — متى أستطيع التصرف مجددًا؟ فترات التهدئة، وامتلاء الطاقة، وساعة المباراة.</li></ul>
<p>في لعبة معارك الممرات هذه، يتقابل شريطا صحة الطرفين في الأعلى، ويقع زر الإيقاف في الوسط، ويعرض الصف السفلي بطاقات الوحدات مع تكلفتها. شريط طاقة مقسّم يمتلئ مع الوقت، فيرى اللاعب بالضبط متى يستطيع شراء الوحدة التالية.</p>
<aside class="example"><b>مثال عملي:</b> عرض فترة التهدئة بثلاث طرق. النسخة 1: رقم «4.2» على الزر. على اللاعب أن يقرأ ويحسب. النسخة 2: غطاء داكن يتقلص باتجاه عقارب الساعة. يُقرأ دون النظر إليه مباشرة. النسخة 3: غطاء الساعة مع وميض قصير وصوت «جاهز» عند انتهائه. المختبِرون الذين استخدموا النسخة 3 استعملوا مهاراتهم أكثر بنحو 30%، لأنهم لاحظوا كل مرة صارت فيها المهارة جاهزة.</aside>
<p>استخدم اللغة البصرية نفسها في كل مكان: إذا كان اللون الرمادي يعني «لا تستطيع الدفع» على البطاقات، فيجب أن يعني الشيء نفسه على أزرار المتجر والترقيات.</p>
<aside class="pitfall"><b>خطأ شائع:</b> عرض أرقام دقيقة لكل شيء. الأرقام دقيقة لكنها بطيئة، والأشرطة والألوان والأشكال سريعة. اعرض الأرقام عند الطلب لا افتراضيًا.</aside>
<aside class="try"><b>جرّبها:</b> العب «الدفاع عن الطريق» وراقب ذهبك: هل تعرف بلمحة إن كنت تستطيع شراء البرج التالي؟ ثم اقرأ تحليل Clash Royale. <a class="go" href="#/lab/strategy">▶ الدفاع عن الطريق</a> <a class="go" href="#/games/clash-royale">▶ تحليل Clash Royale</a></aside>` }
    },
    {
      match: "Diegetic vs non-diegetic UI", image: "/images/7b2fa29bbd6afeeb415c1689c2f146ad.jpg",
      en: { title: "Diegetic vs non-diegetic UI", body: `<p>Interface designers use a word from film studies: <em>diegetic</em> means "existing inside the story world". That gives two main types of game UI:</p>
<ul><li><strong>Non-diegetic</strong> — overlays only the player sees: health bars, the minimap, damage numbers. Fast to read and easy to build.</li>
<li><strong>Diegetic</strong> — UI that exists in the world itself: a signpost reading "CAMP", a glowing die on a board, a health meter on the character's suit, ammo shown on the gun.</li></ul>
<p>Between them are two more: <b>spatial</b> UI that sits in the 3D world but the characters cannot see (a glowing outline around an item), and <b>meta</b> UI that shows the character's state on the screen itself (blood at the screen edges when hurt).</p>
<aside class="example"><b>Worked example:</b> Showing low health, four ways. Non-diegetic: the health bar turns red and flashes. Spatial: a red outline glows around the character. Meta: the screen edges darken and a heartbeat sound plays. Diegetic: the character limps and holds their side. Many games combine two of these: the bar for precision, the limp and heartbeat for feeling.</aside>
<p>Diegetic UI increases <strong>immersion</strong>, but it can be slower to read, especially in a hurry. Most games blend both: diegetic for atmosphere, non-diegetic for critical information.</p>
<aside class="pitfall"><b>Common mistake:</b> Making critical information purely diegetic for style. If a player dies because they could not read their ammo on a tiny gun model, the style has cost them the game.</aside>
<aside class="try"><b>Try it:</b> Play Tiny Farm and notice the day/night cycle: is it diegetic (part of the world) or an overlay? Find one example of each type in that game. <a class="go" href="#/lab/simulation">▶ Play Tiny Farm</a></aside>` },
      ar: { title: "الواجهة الداخلية والواجهة الخارجية", body: `<p>يستعير مصممو الواجهات كلمة من دراسات السينما: <em>الداخلية</em> (Diegetic) تعني «موجودة داخل عالم القصة». وهذا يعطي نوعين رئيسيين من واجهات الألعاب:</p>
<ul><li><strong>الواجهة الخارجية</strong> — طبقات فوق اللعبة لا يراها إلا اللاعب: أشرطة الصحة، والخريطة المصغرة، وأرقام الضرر. سريعة القراءة وسهلة البناء.</li>
<li><strong>الواجهة الداخلية</strong> — واجهة موجودة في العالم نفسه: لافتة مكتوب عليها «مخيم»، أو نرد متوهج على لوحة، أو مقياس صحة على بدلة الشخصية، أو عدد الطلقات على السلاح.</li></ul>
<p>بينهما نوعان آخران: الواجهة <b>المكانية</b> الموجودة في العالم ثلاثي الأبعاد لكن الشخصيات لا تراها (إطار متوهج حول غرض)، والواجهة <b>الفوقية</b> التي تُظهر حالة الشخصية على الشاشة نفسها (احمرار حواف الشاشة عند الإصابة).</p>
<aside class="example"><b>مثال عملي:</b> عرض انخفاض الصحة بأربع طرق. خارجية: شريط الصحة يحمرّ ويومض. مكانية: إطار أحمر يتوهج حول الشخصية. فوقية: حواف الشاشة تُظلم ويُسمع صوت نبض القلب. داخلية: الشخصية تعرج وتمسك جنبها. ألعاب كثيرة تجمع اثنين منها: الشريط للدقة، والعرج والنبض للإحساس.</aside>
<p>الواجهة الداخلية تزيد <strong>الانغماس</strong>، لكنها قد تكون أبطأ قراءة، خصوصًا على عجل. معظم الألعاب تمزج النوعين: الداخلية للأجواء، والخارجية للمعلومات الحاسمة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> جعل المعلومات الحاسمة داخلية بالكامل من أجل الأسلوب. إذا خسر اللاعب لأنه لم يستطع قراءة عدد طلقاته على نموذج سلاح صغير، فقد كلّفه الأسلوب اللعبة.</aside>
<aside class="try"><b>جرّبها:</b> العب «المزرعة الصغيرة» ولاحظ دورة النهار والليل: هل هي داخلية (جزء من العالم) أم طبقة فوقه؟ ابحث عن مثال لكل نوع في تلك اللعبة. <a class="go" href="#/lab/simulation">▶ العب المزرعة الصغيرة</a></aside>` }
    },
    {
      match: "Notifications: helpful or manipulative?", image: "",
      en: { title: "Notifications: helpful or manipulative?", body: `<p>Red dots, "first purchase" offers, countdown timers and "your energy is full!" pushes all drive players back into the game. Used well, they help players find what is new. Used carelessly, they create anxiety, noise and distrust.</p>
<p>A simple test for every <strong>notification badge</strong>: can the player act on it <em>now</em>, and will acting on it help them? If not, remove it.</p>
<ul><li><b>Helpful:</b> "A new area is unlocked", "Your crops are ready", "A friend sent you a gift".</li>
<li><b>Noise:</b> red dots on every menu after every update, or badges that only disappear after opening a shop.</li>
<li><b>Manipulative:</b> fake countdowns that reset every day, or "limited" offers that are always available.</li></ul>
<aside class="example"><b>Worked example:</b> An audit of one main menu found 7 red dots: new event, shop offer, mail, friends, achievements, battle pass and settings ("new options"). Players had learned to ignore them all, including the important one, the new event. The team kept only two (rewards to collect and new events) and moved the rest into a single "What's new" panel. Event participation rose because the remaining dots meant something again.</aside>
<p>Never hide the real price of something behind several currencies, and never use urgency (a timer) for something that is not truly limited. Players remember when they feel tricked.</p>
<aside class="pitfall"><b>Common mistake:</b> Treating notifications as free. Each one spends a little of the player's attention and trust.</aside>
<aside class="try"><b>Try it:</b> Look at this platform's own home page and menus as a player. Which signals tell you what to do next, and do any feel like pressure? Write down one improvement. <a class="go" href="#/">▶ Open the home page</a></aside>` },
      ar: { title: "الإشعارات: مساعدة أم تلاعب؟", body: `<p>النقاط الحمراء، وعروض «الشراء الأول»، والعدّادات التنازلية، وتنبيهات «امتلأت طاقتك!» كلها تُعيد اللاعبين إلى اللعبة. إذا استُخدمت جيدًا، فإنها تساعد اللاعبين على إيجاد الجديد. وإذا استُخدمت بلا اكتراث، فإنها تصنع القلق والضجيج وانعدام الثقة.</p>
<p>اختبار بسيط لكل <strong>شارة إشعار</strong>: هل يستطيع اللاعب التصرف بناءً عليها <em>الآن</em>، وهل سيساعده ذلك؟ إن لم يكن، فاحذفها.</p>
<ul><li><b>مفيد:</b> «فُتحت منطقة جديدة»، «محاصيلك جاهزة»، «أرسل لك صديق هدية».</li>
<li><b>ضجيج:</b> نقاط حمراء على كل قائمة بعد كل تحديث، أو شارات لا تختفي إلا بعد فتح المتجر.</li>
<li><b>تلاعب:</b> عدّادات تنازلية زائفة تُعاد كل يوم، أو عروض «محدودة» متاحة دائمًا.</li></ul>
<aside class="example"><b>مثال عملي:</b> فحص قائمة رئيسية واحدة وجد 7 نقاط حمراء: حدث جديد، وعرض متجر، والبريد، والأصدقاء، والإنجازات، وبطاقة الموسم، والإعدادات («خيارات جديدة»). تعلّم اللاعبون تجاهلها جميعًا، بما فيها المهمة: الحدث الجديد. أبقى الفريق اثنتين فقط (مكافآت للاستلام وأحداث جديدة) ونقل الباقي إلى لوحة واحدة باسم «ما الجديد». ارتفعت المشاركة في الأحداث لأن النقاط الباقية عادت تعني شيئًا.</aside>
<p>لا تُخفِ أبدًا السعر الحقيقي لشيء خلف عدة عملات، ولا تستخدم الاستعجال (مؤقتًا) لشيء ليس محدودًا فعلًا. يتذكر اللاعبون متى شعروا بأنهم خُدعوا.</p>
<aside class="pitfall"><b>خطأ شائع:</b> معاملة الإشعارات كأنها مجانية. كل إشعار ينفق قليلًا من انتباه اللاعب وثقته.</aside>
<aside class="try"><b>جرّبها:</b> انظر إلى الصفحة الرئيسية لهذه المنصة وقوائمها بعين اللاعب. أي الإشارات تخبرك بما تفعله بعد ذلك، وهل يبدو أي منها ضغطًا؟ اكتب تحسينًا واحدًا. <a class="go" href="#/">▶ افتح الصفحة الرئيسية</a></aside>` }
    },
    {
      match: "Accessibility: games everyone can play", image: "",
      en: { title: "Accessibility: games everyone can play", body: `<p>Accessibility options help far more players than you might expect: people with permanent disabilities, but also someone with a broken arm, someone playing on a bus with the sound off, or someone who is simply tired. Designers often describe this as permanent, temporary and situational needs.</p>
<ul><li><strong>Subtitles</strong> on by default, with adjustable size, a background box and the speaker's name.</li>
<li><strong>Colour</strong> — never use colour alone to carry meaning. Add shapes, icons or patterns for colour-blind players.</li>
<li><strong>Controls</strong> — full remapping, hold-to-toggle options and adjustable timing windows.</li>
<li><strong>Difficulty and assists</strong> — let players choose their challenge without shame, and change it at any time.</li></ul>
<aside class="example"><b>Worked example:</b> A match-3 game used red, green and blue gems. About 1 in 12 men has some form of colour blindness, and for many of them red and green look nearly the same. The fix: each gem colour got its own shape (red = heart, green = leaf, blue = drop). The change took one afternoon of art work. It helped colour-blind players, and testers without colour blindness also matched faster, because shape is quicker to spot than colour.</aside>
<p>Start with the cheap wins: subtitles, remapping, a screen-shake toggle, and shape plus colour. The free Game Accessibility Guidelines website lists practical options from basic to advanced.</p>
<aside class="pitfall"><b>Common mistake:</b> Leaving accessibility for the end. Shapes for colours and remappable controls are easy at the start and painful to add later.</aside>
<aside class="try"><b>Try it:</b> Play Gem Quest and check: can you tell the gems apart by shape alone? Try looking at your screen in greyscale (most phones have a setting for it). <a class="go" href="#/lab/puzzle">▶ Play Gem Quest</a></aside>` },
      ar: { title: "إمكانية الوصول: ألعاب يستطيع الجميع لعبها", body: `<p>تساعد خيارات إمكانية الوصول لاعبين أكثر بكثير مما تتوقع: أصحاب الإعاقات الدائمة، وأيضًا من كُسرت ذراعه، ومن يلعب في الحافلة والصوت مكتوم، أو من هو متعب ببساطة. كثيرًا ما يصف المصممون هذا باحتياجات دائمة ومؤقتة وظرفية.</p>
<ul><li><strong>الترجمة النصية</strong> مفعّلة افتراضيًا، مع حجم قابل للتعديل وخلفية واسم المتحدث.</li>
<li><strong>اللون</strong> — لا تجعل اللون وحده يحمل المعنى أبدًا. أضف أشكالًا أو أيقونات أو نقوشًا لمن لديهم عمى ألوان.</li>
<li><strong>التحكم</strong> — إعادة تعيين كاملة للأزرار، وخيار الضغط المستمر أو التبديل، ونوافذ توقيت قابلة للتعديل.</li>
<li><strong>الصعوبة والمساعدات</strong> — دع اللاعبين يختارون تحديهم دون خجل، ويغيّرونه في أي وقت.</li></ul>
<aside class="example"><b>مثال عملي:</b> لعبة مطابقة ثلاثية استخدمت جواهر حمراء وخضراء وزرقاء. نحو رجل من كل 12 لديه شكل من أشكال عمى الألوان، ولدى كثير منهم يبدو الأحمر والأخضر متشابهين تقريبًا. الحل: صار لكل لون من الجواهر شكل خاص (الأحمر = قلب، والأخضر = ورقة، والأزرق = قطرة). استغرق التغيير عصرية واحدة من عمل الرسم. ساعد ذلك اللاعبين ذوي عمى الألوان، وصار المختبِرون الآخرون أيضًا يطابقون أسرع، لأن الشكل يُلتقط أسرع من اللون.</aside>
<p>ابدأ بالمكاسب الرخيصة: الترجمة النصية، وإعادة تعيين الأزرار، وخيار إيقاف اهتزاز الشاشة، والشكل مع اللون. يعرض موقع Game Accessibility Guidelines المجاني خيارات عملية من الأساسية إلى المتقدمة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> ترك إمكانية الوصول للنهاية. الأشكال للألوان والأزرار القابلة للتعيين سهلة في البداية ومؤلمة الإضافة لاحقًا.</aside>
<aside class="try"><b>جرّبها:</b> العب «مغامرة الجواهر» وتحقق: هل تستطيع التمييز بين الجواهر بالشكل وحده؟ جرّب عرض شاشتك بالأبيض والأسود (معظم الهواتف فيها إعداد لذلك). <a class="go" href="#/lab/puzzle">▶ العب مغامرة الجواهر</a></aside>` }
    },
    {
      image: "/images/575670a06e353ca00bf22e763b30c5e3.jpg",
      en: { title: "Workshop: redesign a HUD on paper", body: `<p>This workshop takes about <strong>35 minutes</strong>. You will design the HUD for a mobile game from scratch, place it using the thumb zones, and test it with a phone-sized paper frame.</p>
<ol><li><b>Information list</b> (5 min): list everything the player needs to know or press: health, coins, map, pause, move, jump, attack, two skills, potion.</li>
<li><b>Frequency</b> (5 min): estimate how often each is used per minute. Sort the list.</li>
<li><b>Paper phone</b> (3 min): draw a rectangle the size of your phone, held sideways.</li>
<li><b>Place by zone</b> (10 min): put the most frequent controls in the bottom corners, information at the top edges. Keep the centre clear.</li>
<li><b>Size check</b> (5 min): make every button at least 9 mm wide and leave a gap between them.</li>
<li><b>Thumb test</b> (7 min): hold the paper like a phone and "play" for one minute, pressing the drawn buttons. Mark every awkward reach and fix it.</li></ol>
<aside class="example"><b>What you hand in:</b> the paper HUD, the sorted frequency list, and two changes you made after the thumb test.</aside>
<aside class="pitfall"><b>Common mistake:</b> Placing the pause button next to a frequent action. One accidental pause every minute ruins any game.</aside>
<aside class="try"><b>Try it:</b> Compare your HUD with "Mobile MMORPG HUD" and "Lane battler UI" in the Gallery. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "ورشة تطبيقية: أعد تصميم واجهة على الورق", body: `<p>تستغرق هذه الورشة نحو <strong>35 دقيقة</strong>. ستصمم واجهة لعبة جوال من الصفر، وتوزعها حسب مناطق الإبهام، وتختبرها بإطار ورقي بحجم الهاتف.</p>
<ol><li><b>قائمة المعلومات</b> (5 دقائق): اكتب كل ما يحتاج اللاعب إلى معرفته أو ضغطه: الصحة، والعملات، والخريطة، والإيقاف، والحركة، والقفز، والهجوم، ومهارتان، والجرعة.</li>
<li><b>التكرار</b> (5 دقائق): قدّر كم مرة يُستخدم كل عنصر في الدقيقة. رتّب القائمة.</li>
<li><b>هاتف ورقي</b> (3 دقائق): ارسم مستطيلًا بحجم هاتفك، ممسوكًا بالعرض.</li>
<li><b>التوزيع حسب المناطق</b> (10 دقائق): ضع أكثر العناصر استخدامًا في الزاويتين السفليتين، والمعلومات عند الحواف العليا. أبقِ الوسط فارغًا.</li>
<li><b>فحص الحجم</b> (5 دقائق): اجعل عرض كل زر 9 ملم على الأقل، واترك فراغًا بين الأزرار.</li>
<li><b>اختبار الإبهام</b> (7 دقائق): أمسك الورقة كالهاتف و«العب» دقيقة واحدة بالضغط على الأزرار المرسومة. علّم كل وصول مزعج وأصلحه.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> الواجهة الورقية، وقائمة التكرار المرتبة، وتغييرين أجريتهما بعد اختبار الإبهام.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> وضع زر الإيقاف بجانب فعل متكرر. إيقاف واحد غير مقصود كل دقيقة يفسد أي لعبة.</aside>
<aside class="try"><b>جرّبها:</b> قارن واجهتك بصورتي «شاشة لعبة جماعية على الجوال» و«واجهة معركة المسارات» في المعرض. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    }
  ],

  /* ================================================================ */
  progression: [
    {
      match: "The progression toolkit", image: "/images/9aa17f877788c113b2d7a4d70618559e.jpg",
      en: { title: "The progression toolkit", body: `<p>The "Study like a video game" sheet borrows every classic progression system from games and applies it to learning. This platform uses many of them too, so you are experiencing them as you read:</p>
<ul><li><strong>Levels</strong> break a big goal into steps you can see.</li>
<li><strong>XP</strong> rewards every small effort, so no session feels wasted.</li>
<li><b>Daily quests</b> give short-term goals for one sitting.</li>
<li><b>Streaks</b> reward consistency over intensity.</li>
<li><b>Boss battles</b> are milestone tests that prove a skill.</li>
<li><b>Leaderboards</b> add social comparison.</li>
<li><b>Rewards</b> and badges mark achievements and give something to show.</li></ul>
<aside class="example"><b>Worked example:</b> How this platform layers them. Each lesson scene gives XP when cleared, and the 💎 terms in the text give bonus XP. A region (module) frees when every scene is cleared, and you earn 1–3 stars depending on how many gems you collected. Stars invite you back to collect missed gems, a mastery loop, while the map shows the next region waiting. Three systems, each answering a different question: "did I make progress?" (XP), "how well?" (stars), "what's next?" (the map).</aside>
<p>Do not add every tool to every game. Pick the ones that fit the length and rhythm of your game: streaks suit games played daily; leaderboards suit short, replayable rounds.</p>
<aside class="pitfall"><b>Common mistake:</b> Piling on rewards until none of them mean anything. If every action pops a badge, players stop looking at badges.</aside>
<aside class="try"><b>Try it:</b> Open the adventure map and your profile, and name each progression system you see there and which question it answers for you. <a class="go" href="#/learn">▶ The adventure map</a> <a class="go" href="#/profile">▶ Your profile</a></aside>` },
      ar: { title: "صندوق أدوات التقدّم", body: `<p>تستعير لوحة «ادرس كأنك في لعبة فيديو» كل أنظمة التقدّم الكلاسيكية من الألعاب وتطبقها على التعلّم. وهذه المنصة تستخدم كثيرًا منها أيضًا، فأنت تعيشها وأنت تقرأ:</p>
<ul><li><strong>المستويات</strong> تقسم الهدف الكبير إلى خطوات تراها.</li>
<li><strong>نقاط الخبرة</strong> تكافئ كل جهد صغير، فلا تبدو أي جلسة ضائعة.</li>
<li><b>المهام اليومية</b> تعطي أهدافًا قصيرة لجلسة واحدة.</li>
<li><b>السلاسل المتتالية</b> تكافئ الاستمرارية أكثر من الشدة.</li>
<li><b>معارك الزعماء</b> اختبارات عند المحطات الكبرى تُثبت المهارة.</li>
<li><b>لوحات الصدارة</b> تضيف المقارنة الاجتماعية.</li>
<li><b>المكافآت</b> والأوسمة تسجّل الإنجازات وتعطي شيئًا يُعرض.</li></ul>
<aside class="example"><b>مثال عملي:</b> كيف تُركّب هذه المنصة الأنظمة فوق بعضها. كل مشهد درس يمنح نقاط خبرة عند إنهائه، ومصطلحات 💎 في النص تمنح خبرة إضافية. تتحرر المنطقة (الوحدة) حين تُنهي كل مشاهدها، وتكسب من نجمة إلى ثلاث حسب عدد الجواهر التي جمعتها. النجوم تدعوك للعودة وجمع الجواهر الفائتة، وهذه حلقة إتقان، بينما تُظهر الخريطة المنطقة التالية بانتظارك. ثلاثة أنظمة، كل منها يجيب عن سؤال مختلف: «هل تقدّمت؟» (الخبرة)، و«كم أحسنت؟» (النجوم)، و«ما التالي؟» (الخريطة).</aside>
<p>لا تُضِف كل الأدوات إلى كل لعبة. اختر ما يناسب طول لعبتك وإيقاعها: السلاسل تناسب الألعاب التي تُلعب يوميًا، ولوحات الصدارة تناسب الجولات القصيرة المتكررة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> تكديس المكافآت حتى لا يعني أي منها شيئًا. إذا ظهر وسام مع كل فعل، يتوقف اللاعبون عن النظر إلى الأوسمة.</aside>
<aside class="try"><b>جرّبها:</b> افتح خريطة المغامرة وملفك الشخصي، وسمِّ كل نظام تقدّم تراه هناك والسؤال الذي يجيب عنه لديك. <a class="go" href="#/learn">▶ خريطة المغامرة</a> <a class="go" href="#/profile">▶ ملفك الشخصي</a></aside>` }
    },
    {
      match: "Intrinsic vs extrinsic motivation", image: "",
      en: { title: "Intrinsic vs extrinsic motivation", body: `<p>Why do people keep playing? Psychologists Edward Deci and Richard Ryan's <em>Self-Determination Theory</em> says people are most motivated when three needs are met:</p>
<ul><li><strong>Competence</strong> — feeling that you are getting better and that your actions work.</li>
<li><strong>Autonomy</strong> — making meaningful choices, not just following orders.</li>
<li><strong>Relatedness</strong> — feeling connected to other people or characters.</li></ul>
<p>These are <em>intrinsic</em> motivations: the activity itself is rewarding. XP, badges and loot are <em>extrinsic</em>: rewards from outside the activity. Extrinsic rewards work best when they <strong>point at</strong> real mastery, rather than replace it.</p>
<aside class="example"><b>Worked example:</b> Two versions of a "100 enemies defeated" badge. Version A: you get it automatically after enough fighting; players grind easy enemies to get it and feel nothing. Version B: "Defeat the Stone Golem without being hit" unlocks after you have practised dodging. It recognises a skill you actually built. The badge is a mirror of competence, not a substitute for it, and players share it proudly.</aside>
<p>Research on the so-called <em>overjustification effect</em> suggests that paying people for something they already enjoy can reduce their own interest once the payment stops. In games: if a player loves exploring, do not turn exploration into a checklist of 300 collectibles with a reward at the end.</p>
<aside class="pitfall"><b>Common mistake:</b> Using rewards to hide a core loop that is not fun. Extrinsic rewards can keep players for a while, but they leave as soon as the rewards slow down.</aside>
<aside class="try"><b>Try it:</b> Play Meteor Storm. There is no badge, only your score and your best score. Notice why you press "play again": that is competence at work. <a class="go" href="#/lab/arcade">▶ Play Meteor Storm</a></aside>` },
      ar: { title: "الدافع الداخلي والدافع الخارجي", body: `<p>لماذا يواصل الناس اللعب؟ تقول <em>نظرية تقرير المصير</em> لعالمي النفس إدوارد ديسي وريتشارد رايان إن الناس يكونون في أعلى دافعيتهم حين تُلبّى ثلاث حاجات:</p>
<ul><li><strong>الكفاءة</strong> — الشعور بأنك تتحسن وأن أفعالك تنجح.</li>
<li><strong>الاستقلالية</strong> — اتخاذ خيارات ذات معنى، لا مجرد اتباع الأوامر.</li>
<li><strong>الانتماء</strong> — الشعور بالارتباط بأشخاص آخرين أو بشخصيات.</li></ul>
<p>هذه دوافع <em>داخلية</em>: النشاط نفسه مُجزٍ. أما نقاط الخبرة والأوسمة والغنائم فدوافع <em>خارجية</em>: مكافآت من خارج النشاط. تعمل المكافآت الخارجية أفضل حين <strong>تشير إلى</strong> إتقان حقيقي، لا حين تحل محله.</p>
<aside class="example"><b>مثال عملي:</b> نسختان من وسام «هزيمة 100 عدو». النسخة أ: تحصل عليه تلقائيًا بعد قتال كافٍ؛ فيكرر اللاعبون قتال أعداء سهلين للحصول عليه ولا يشعرون بشيء. النسخة ب: «اهزم عملاق الحجر دون أن تُصاب» يُفتح بعد أن تتدرب على التفادي. إنه يعترف بمهارة بنيتها فعلًا. الوسام هنا مرآة للكفاءة لا بديل عنها، ويشاركه اللاعبون بفخر.</aside>
<p>تشير الأبحاث حول ما يسمى <em>أثر التبرير المفرط</em> إلى أن مكافأة الناس على شيء يستمتعون به أصلًا قد تقلل اهتمامهم الذاتي حين تتوقف المكافأة. في الألعاب: إذا كان اللاعب يحب الاستكشاف، فلا تحوّل الاستكشاف إلى قائمة من 300 غرض قابل للجمع بمكافأة في النهاية.</p>
<aside class="pitfall"><b>خطأ شائع:</b> استخدام المكافآت لإخفاء حلقة أساسية غير ممتعة. المكافآت الخارجية قد تُبقي اللاعبين فترة، لكنهم يغادرون فور تباطئها.</aside>
<aside class="try"><b>جرّبها:</b> العب «عاصفة النيازك». لا وسام فيها، فقط نتيجتك وأفضل نتيجة لك. لاحظ لماذا تضغط «العب مرة أخرى»: هذه هي الكفاءة تعمل. <a class="go" href="#/lab/arcade">▶ العب عاصفة النيازك</a></aside>` }
    },
    {
      match: "What the best-sellers teach us", image: "/images/f6252ae0a48cf7d8bc2ab29d2ab8b605.jpg",
      en: { title: "What the best-sellers teach us", body: `<p>Look at the top of the list of best-selling games of all time: Tetris, Minecraft, GTA V, Wii Sports and a handful of others. They look nothing alike, yet they share three traits:</p>
<ul><li><strong>Instantly understandable</strong> — you get the basic idea within seconds, often without reading anything.</li>
<li><strong>Deep through systems, not content</strong> — a few rules combine into endless situations, so the game does not run out.</li>
<li><strong>Player expression</strong> — you build, choose and play your own way, so every player's game is a little different.</li></ul>
<aside class="example"><b>Worked example:</b> Tetris in one line: "pieces fall; fill complete rows to clear them". Seven shapes and one rule. Yet the decision space is huge: where to place the piece, whether to leave a gap for the long piece, when to risk building high. Compare that with a game that needs 40 levels of hand-made content to stay interesting; Tetris produces a new situation with every piece, for free.</aside>
<p>For a small team, the second trait is the most important lesson: design <em>systems</em> that create situations, rather than hand-making every situation yourself.</p>
<aside class="pitfall"><b>Common mistake:</b> Copying the surface of a best-seller (its theme or look) instead of its principles. Taking "simple rules that combine" is reusable; taking "blocks" is just a copy.</aside>
<aside class="try"><b>Try it:</b> Read the Minecraft and Candy Crush breakdowns in the Games Showcase. For each, write its rule in one line and one way players express themselves. <a class="go" href="#/games/minecraft">▶ Minecraft</a> <a class="go" href="#/games/candy-crush">▶ Candy Crush</a></aside>` },
      ar: { title: "ما تعلّمنا إياه الألعاب الأكثر مبيعًا", body: `<p>انظر إلى رأس قائمة الألعاب الأكثر مبيعًا في التاريخ: تتريس وماينكرافت وGTA V وWii Sports وقليل غيرها. لا يشبه بعضها بعضًا أبدًا، لكنها تشترك في ثلاث صفات:</p>
<ul><li><strong>تُفهم فورًا</strong> — تفهم الفكرة الأساسية خلال ثوانٍ، غالبًا دون قراءة أي شيء.</li>
<li><strong>عمقها من الأنظمة لا من المحتوى</strong> — قواعد قليلة تتركب لتصنع مواقف لا تنتهي، فلا تنفد اللعبة.</li>
<li><strong>التعبير الشخصي</strong> — تبني وتختار وتلعب بطريقتك، فتختلف لعبة كل لاعب قليلًا.</li></ul>
<aside class="example"><b>مثال عملي:</b> تتريس في سطر واحد: «القطع تسقط؛ أكمل الصفوف لتمحوها». سبعة أشكال وقاعدة واحدة. ومع ذلك فمساحة القرار هائلة: أين تضع القطعة، وهل تترك فجوة للقطعة الطويلة، ومتى تخاطر بالبناء عاليًا. قارن ذلك بلعبة تحتاج 40 مرحلة مصنوعة يدويًا لتبقى مثيرة؛ تتريس تنتج موقفًا جديدًا مع كل قطعة، مجانًا.</aside>
<p>للفريق الصغير، الصفة الثانية هي أهم درس: صمّم <em>أنظمة</em> تصنع المواقف، بدل أن تصنع كل موقف بيدك.</p>
<aside class="pitfall"><b>خطأ شائع:</b> نسخ سطح اللعبة الناجحة (موضوعها أو مظهرها) بدل مبادئها. أخذ «قواعد بسيطة تتركب» قابل لإعادة الاستخدام، أما أخذ «المكعبات» فمجرد نسخ.</aside>
<aside class="try"><b>جرّبها:</b> اقرأ تحليلَي ماينكرافت وCandy Crush في معرض الألعاب. اكتب لكل منهما قاعدته في سطر واحد، وطريقة واحدة يعبّر بها اللاعبون عن أنفسهم. <a class="go" href="#/games/minecraft">▶ ماينكرافت</a> <a class="go" href="#/games/candy-crush">▶ Candy Crush</a></aside>` }
    },
    {
      match: "Ethical monetization", image: "",
      en: { title: "Ethical monetization", body: `<p>How a game makes money shapes its design from the first day. A game sold once can focus purely on being good; a free game with in-game purchases must decide what to sell without making the game worse for people who do not pay.</p>
<p>Fair models sell <strong>value</strong>: the full game, expansions with new content, cosmetics that do not affect play, and a battle pass whose full contents are shown before you buy.</p>
<p>Watch out for <strong>dark patterns</strong>, designs that push players against their own interest:</p>
<ul><li>Confusing premium currencies that hide real prices (gems sold in packs that never match item prices).</li>
<li>Random loot boxes sold for money, which several countries regulate as a form of gambling.</li>
<li>Pay-to-win items that make free players lose to paying ones.</li>
<li>Artificial waiting designed to be annoying, so players pay to skip it.</li></ul>
<aside class="example"><b>Worked example:</b> Gems are sold in packs of 100 for $1.99 and 550 for $9.99. A costume costs 120 gems, so a player must buy at least 200 gems (two small packs, $3.98) and is left with 80 useless gems, nudging them to buy again. The honest version: price the costume at $2.49 directly, or sell gems in amounts that match item prices. The game earns slightly less per sale but keeps players' trust.</aside>
<p>Ask one question about every monetisation feature: <em>would I be comfortable explaining this, in plain words, to the player's parents?</em></p>
<aside class="pitfall"><b>Common mistake:</b> Designing the game first and "adding monetisation" at the end. The business model changes pacing, progression and difficulty; decide it early.</aside>
<aside class="try"><b>Try it:</b> Read the Clash Royale breakdown and list which parts of its economy players can get by playing and which by paying. Then decide where your own game would draw the line. <a class="go" href="#/games/clash-royale">▶ Clash Royale breakdown</a></aside>` },
      ar: { title: "الربح الأخلاقي", body: `<p>طريقة ربح اللعبة تشكّل تصميمها منذ اليوم الأول. اللعبة التي تُباع مرة واحدة تستطيع التركيز على الجودة وحدها، أما اللعبة المجانية ذات المشتريات الداخلية فعليها أن تقرر ما تبيعه دون أن تجعل اللعبة أسوأ لمن لا يدفع.</p>
<p>النماذج العادلة تبيع <strong>القيمة</strong>: اللعبة الكاملة، وتوسعات بمحتوى جديد، وأزياء لا تؤثر في اللعب، وبطاقة موسم تُعرض محتوياتها كاملة قبل الشراء.</p>
<p>احذر <strong>الأنماط المظلمة</strong>، وهي تصاميم تدفع اللاعبين ضد مصلحتهم:</p>
<ul><li>عملات مميزة مربكة تُخفي الأسعار الحقيقية (جواهر تُباع في حزم لا تطابق أسعار الأغراض أبدًا).</li>
<li>صناديق غنائم عشوائية تُباع بالمال، وتنظّمها عدة دول بوصفها شكلًا من القمار.</li>
<li>أغراض «ادفع لتفوز» تجعل اللاعبين المجانيين يخسرون أمام الدافعين.</li>
<li>انتظار مصطنع مصمم ليكون مزعجًا، حتى يدفع اللاعبون لتخطيه.</li></ul>
<aside class="example"><b>مثال عملي:</b> تُباع الجواهر في حزمة 100 بسعر 1.99 دولار وحزمة 550 بسعر 9.99 دولار. الزي يكلّف 120 جوهرة، فيجب أن يشتري اللاعب 200 جوهرة على الأقل (حزمتين صغيرتين، 3.98 دولار) ويبقى معه 80 جوهرة بلا فائدة، تدفعه للشراء مجددًا. النسخة الأمينة: سعّر الزي مباشرة بـ2.49 دولار، أو بِع الجواهر بكميات تطابق أسعار الأغراض. تربح اللعبة أقل قليلًا في كل عملية بيع، لكنها تحتفظ بثقة اللاعبين.</aside>
<p>اسأل سؤالًا واحدًا عن كل ميزة ربح: <em>هل سأرتاح لشرح هذا بكلمات بسيطة لوالدَي اللاعب؟</em></p>
<aside class="pitfall"><b>خطأ شائع:</b> تصميم اللعبة أولًا ثم «إضافة الربح» في النهاية. نموذج العمل يغيّر الإيقاع والتقدّم والصعوبة؛ قرّره مبكرًا.</aside>
<aside class="try"><b>جرّبها:</b> اقرأ تحليل Clash Royale واكتب أي أجزاء اقتصادها يحصل عليها اللاعبون باللعب وأيها بالدفع. ثم قرّر أين ستضع لعبتك الحد الفاصل. <a class="go" href="#/games/clash-royale">▶ تحليل Clash Royale</a></aside>` }
    },
    {
      match: "Playing together: social design", image: "/images/1b45657cfb3c814db3bbbb66ab992790.jpg",
      en: { title: "Playing together: social design", body: `<p>Other people are the strongest motivation in games: we play to compete, to help, to show off and to belong. Social design ranges from light to heavy:</p>
<ul><li><strong>Asynchronous</strong> — players affect each other without playing at the same time: leaderboards, "ghosts" of friends' best runs, sending gifts, visiting each other's towns. Cheap to build; no real-time servers needed.</li>
<li><strong>Co-op</strong> — players share a goal. The best co-op gives each role something the others need: one player sees the map, the other has the key.</li>
<li><strong>Competitive</strong> — players play against each other. It needs fair matchmaking, balanced options and strong anti-cheat.</li></ul>
<aside class="example"><b>Worked example:</b> A solo racing game added one asynchronous feature: after each race, the game saves your run as a ghost, and you can race against the ghosts of three friends. No servers synchronising cars in real time, just a small file of positions per run. Players started sending each other challenges ("beat my 1:42 on the desert track"), and average play sessions grew longer. The cost was a fraction of what real-time multiplayer would have needed.</aside>
<p>Real-time online multiplayer is one of the most expensive features to build and maintain: servers, lag, cheating, empty lobbies. For a first game, start with local play on one screen or with asynchronous features.</p>
<aside class="pitfall"><b>Common mistake:</b> Building a game that only works with many players online at once. If there are not enough players at launch, nobody can play at all.</aside>
<aside class="try"><b>Try it:</b> Play Checkpoint Rush and beat your best distance. Then imagine your friend's ghost driving next to you: what would change in how you play? Read the PUBG breakdown for the opposite end, 100 players at once. <a class="go" href="#/lab/racing">▶ Checkpoint Rush</a> <a class="go" href="#/games/pubg">▶ PUBG breakdown</a></aside>` },
      ar: { title: "اللعب معًا: التصميم الاجتماعي", body: `<p>الآخرون أقوى دافع في الألعاب: نلعب لننافس، ونساعد، ونتباهى، وننتمي. يتراوح التصميم الاجتماعي من الخفيف إلى الثقيل:</p>
<ul><li><strong>غير المتزامن</strong> — يؤثر اللاعبون في بعضهم دون اللعب في الوقت نفسه: لوحات الصدارة، و«أشباح» أفضل جولات الأصدقاء، وإرسال الهدايا، وزيارة مدن بعضهم. رخيص البناء، ولا يحتاج خوادم فورية.</li>
<li><strong>التعاوني</strong> — يشترك اللاعبون في هدف. أفضل لعب تعاوني يمنح كل دور شيئًا يحتاجه الآخرون: لاعب يرى الخريطة، والآخر يملك المفتاح.</li>
<li><strong>التنافسي</strong> — يلعب اللاعبون ضد بعضهم. يحتاج توفيقًا عادلًا بين اللاعبين، وخيارات متوازنة، ومكافحة قوية للغش.</li></ul>
<aside class="example"><b>مثال عملي:</b> أضافت لعبة سباق فردية ميزة واحدة غير متزامنة: بعد كل سباق تحفظ اللعبة جولتك كشبح، ويمكنك أن تسابق أشباح ثلاثة أصدقاء. لا خوادم تزامن السيارات لحظيًا، بل ملف صغير من المواقع لكل جولة. بدأ اللاعبون يرسلون التحديات لبعضهم («اهزم وقتي 1:42 في مضمار الصحراء»)، وطالت جلسات اللعب في المتوسط. وكانت التكلفة جزءًا صغيرًا مما كان سيحتاجه اللعب الجماعي الفوري.</aside>
<p>اللعب الجماعي الفوري عبر الإنترنت من أغلى الميزات بناءً وصيانة: خوادم، وتأخير، وغش، وغرف انتظار فارغة. للعبة الأولى، ابدأ باللعب المحلي على شاشة واحدة أو بميزات غير متزامنة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> بناء لعبة لا تعمل إلا بوجود كثير من اللاعبين متصلين معًا. إذا لم يكن هناك لاعبون كافون عند الإطلاق، فلن يستطيع أحد اللعب إطلاقًا.</aside>
<aside class="try"><b>جرّبها:</b> العب «سباق نقاط التفتيش» واكسر أفضل مسافة لك. ثم تخيّل شبح صديقك يقود بجانبك: ما الذي سيتغير في طريقة لعبك؟ واقرأ تحليل PUBG للطرف المقابل: 100 لاعب في وقت واحد. <a class="go" href="#/lab/racing">▶ سباق نقاط التفتيش</a> <a class="go" href="#/games/pubg">▶ تحليل PUBG</a></aside>` }
    },
    {
      match: "Retention: why players leave on day one", image: "",
      en: { title: "Retention: why players leave on day one", body: `<p><strong>Retention</strong> is the share of players who come back after their first session. The standard checkpoints are day 1, day 7 and day 30. For most games, the biggest drop happens in the very first minutes, long before players see the best parts.</p>
<p>To find out where players leave, track a few simple <strong>events</strong>: game started, tutorial finished, level 1 cleared, level 2 started, first purchase, session length. Then draw a <strong>funnel</strong>, the share of players who reach each step.</p>
<aside class="example"><b>Worked example:</b> A funnel for 1,000 new players. Started: 1,000 (100%). Finished tutorial: 820 (82%). Cleared level 1: 760 (76%). Started level 2: 700 (70%). Cleared level 2: 280 (28%). The big drop is clearly inside level 2: 420 players started it and gave up. Playtests then showed why: a jump in the middle of level 2 needed a skill the game had never taught. One teaching room was added before it, and the level 2 completion rate rose to 61%.</aside>
<p>Numbers tell you <em>where</em> players leave; playtests tell you <em>why</em>. Use both together.</p>
<p>Collect only what you need, tell players what you collect, and follow privacy laws in the countries where you publish. Children's games have extra rules in many countries.</p>
<aside class="pitfall"><b>Common mistake:</b> Trying to fix retention with rewards (daily login bonuses) when the real problem is a confusing first ten minutes. Fix the funnel first.</aside>
<aside class="try"><b>Try it:</b> Play the first two minutes of Gem Quest as if you had never seen a match-3 game. Write down the exact moment you would quit if you were bored, and what kept you playing. <a class="go" href="#/lab/puzzle">▶ Play Gem Quest</a></aside>` },
      ar: { title: "الاحتفاظ باللاعبين: لماذا يغادرون في اليوم الأول؟", body: `<p><strong>الاحتفاظ</strong> نسبة اللاعبين الذين يعودون بعد جلستهم الأولى. نقاط القياس المعتادة هي اليوم الأول واليوم السابع واليوم الثلاثون. في معظم الألعاب يحدث أكبر انخفاض في الدقائق الأولى، قبل أن يرى اللاعبون أفضل ما فيها بوقت طويل.</p>
<p>لتعرف أين يغادر اللاعبون، تتبّع بعض <strong>الأحداث</strong> البسيطة: بدء اللعبة، وإنهاء الشرح، وإنهاء المرحلة 1، وبدء المرحلة 2، وأول شراء، وطول الجلسة. ثم ارسم <strong>القمع</strong>: نسبة اللاعبين الذين يصلون إلى كل خطوة.</p>
<aside class="example"><b>مثال عملي:</b> قمع لألف لاعب جديد. بدأوا: 1,000 (100%). أنهوا الشرح: 820 (82%). أنهوا المرحلة 1: 760 (76%). بدأوا المرحلة 2: 700 (70%). أنهوا المرحلة 2: 280 (28%). الانخفاض الكبير واضح داخل المرحلة 2: 420 لاعبًا بدأوها واستسلموا. ثم أظهرت الاختبارات السبب: قفزة في منتصف المرحلة 2 تتطلب مهارة لم تعلّمها اللعبة أبدًا. أُضيفت غرفة تعليم واحدة قبلها، فارتفعت نسبة إنهاء المرحلة 2 إلى 61%.</aside>
<p>الأرقام تخبرك <em>أين</em> يغادر اللاعبون، والاختبارات تخبرك <em>لماذا</em>. استخدم الاثنين معًا.</p>
<p>اجمع فقط ما تحتاجه، وأخبر اللاعبين بما تجمعه، واتبع قوانين الخصوصية في الدول التي تنشر فيها. ولألعاب الأطفال قواعد إضافية في دول كثيرة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> محاولة إصلاح الاحتفاظ بالمكافآت (مكافآت الدخول اليومي) بينما المشكلة الحقيقية أول عشر دقائق مربكة. أصلح القمع أولًا.</aside>
<aside class="try"><b>جرّبها:</b> العب أول دقيقتين من «مغامرة الجواهر» كأنك لم ترَ لعبة مطابقة من قبل. اكتب اللحظة الدقيقة التي كنت ستغادر فيها لو شعرت بالملل، وما الذي أبقاك تلعب. <a class="go" href="#/lab/puzzle">▶ العب مغامرة الجواهر</a></aside>` }
    },
    {
      image: "/images/9aa17f877788c113b2d7a4d70618559e.jpg",
      en: { title: "Workshop: design a progression map for your game", body: `<p>This workshop takes about <strong>35 minutes</strong>. You will plan how a player progresses through your game for its first hour, and check that every reward points at real skill.</p>
<ol><li><b>Target length</b> (2 min): decide how long the first "chapter" lasts, for example 60 minutes.</li>
<li><b>Skills list</b> (6 min): list the skills a player should have by the end of that hour: dodging, timing a jump, managing gold.</li>
<li><b>Timeline</b> (10 min): draw a line from 0 to 60 minutes. Mark where each skill is taught, tested and rewarded.</li>
<li><b>Rewards</b> (8 min): for each mark, choose one reward: XP, a new ability, a cosmetic, a story moment or a new area. Avoid the same type twice in a row.</li>
<li><b>Motivation check</b> (5 min): next to each reward write C (competence), A (autonomy) or R (relatedness). Is any of the three missing?</li>
<li><b>Gap check</b> (4 min): is there any 10-minute stretch with no new reward or discovery? Fill it.</li></ol>
<aside class="example"><b>What you hand in:</b> the timeline with skills and rewards marked, and one sentence on which motivation your game relies on most.</aside>
<aside class="pitfall"><b>Common mistake:</b> Giving the biggest reward in the first five minutes. Save something exciting for the end of the hour, so players have a reason to reach it.</aside>
<aside class="try"><b>Try it:</b> Add your progression plan to the Gameplay step of your project in the Design Studio. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "ورشة تطبيقية: صمّم خريطة تقدّم للعبتك", body: `<p>تستغرق هذه الورشة نحو <strong>35 دقيقة</strong>. ستخطط كيف يتقدم اللاعب في لعبتك خلال ساعتها الأولى، وتتحقق من أن كل مكافأة تشير إلى مهارة حقيقية.</p>
<ol><li><b>المدة المستهدفة</b> (دقيقتان): حدد مدة «الفصل» الأول، مثلًا 60 دقيقة.</li>
<li><b>قائمة المهارات</b> (6 دقائق): اكتب المهارات التي يجب أن يملكها اللاعب في نهاية تلك الساعة: التفادي، وتوقيت القفز، وإدارة الذهب.</li>
<li><b>الخط الزمني</b> (10 دقائق): ارسم خطًا من 0 إلى 60 دقيقة. حدد أين تُعلَّم كل مهارة، وأين تُختبر، وأين تُكافأ.</li>
<li><b>المكافآت</b> (8 دقائق): اختر لكل علامة مكافأة واحدة: خبرة، أو قدرة جديدة، أو زي، أو لحظة قصصية، أو منطقة جديدة. تجنّب النوع نفسه مرتين متتاليتين.</li>
<li><b>فحص الدوافع</b> (5 دقائق): بجانب كل مكافأة اكتب ك (الكفاءة) أو س (الاستقلالية) أو ن (الانتماء). هل ينقص أحد الثلاثة؟</li>
<li><b>فحص الفجوات</b> (4 دقائق): هل هناك 10 دقائق متواصلة بلا مكافأة أو اكتشاف جديد؟ املأها.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> الخط الزمني مع المهارات والمكافآت، وجملة واحدة عن الدافع الذي تعتمد عليه لعبتك أكثر.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> منح أكبر مكافأة في أول خمس دقائق. احتفظ بشيء مثير لنهاية الساعة، ليكون لدى اللاعبين سبب للوصول إليها.</aside>
<aside class="try"><b>جرّبها:</b> أضف خطة التقدّم إلى خطوة أسلوب اللعب في مشروعك داخل استوديو التصميم. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    }
  ],

  /* ================================================================ */
  ai: [
    {
      match: "Partner, not replacement", image: "/images/d891091ff8cea4d867f3d2ef66a32b1f.jpg",
      en: { title: "Partner, not replacement", body: `<p>AI tools can write code, draft dialogue, suggest names and describe images in seconds. They cannot decide what your game is <em>for</em>. That remains the designer's job: the pillars, the core loop, the feel, and the thousand small "no"s that make a game coherent.</p>
<p>A helpful way to divide the work:</p>
<ul><li><b>Give AI the speed work</b>: boilerplate code, placeholder text, twenty name ideas to pick one, first drafts of item descriptions, summaries of your own playtest notes.</li>
<li><b>Keep the <strong>decisions</strong></b>: what the player does, how it feels, what to cut, what the game is about.</li></ul>
<aside class="example"><b>Worked example:</b> A designer needed names for 12 potions. Asking an AI tool "give me 30 fantasy potion names for a cosy forest game, short, no more than two words" took 10 seconds. The designer kept 4, edited 5 and wrote 3 new ones inspired by the list. Total time: 10 minutes instead of an hour. But when the same designer asked the tool to "design the core loop of my game", the answer was a generic mix of popular games. The designer threw it away and kept their own.</aside>
<p>A game where AI made every choice usually feels like an <strong>average</strong> of every other game, because that is what such tools learn from. Your taste is what makes a game specific.</p>
<aside class="pitfall"><b>Common mistake:</b> Accepting the first answer. Treat every AI output as a draft to choose from and edit, never as the final version.</aside>
<aside class="try"><b>Try it:</b> In the Design Studio, use the "✨ Suggest with AI" button on one step (if it is enabled on this platform). Keep one suggestion, change one and reject one, and write why. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "شريك لا بديل", body: `<p>تستطيع أدوات الذكاء الاصطناعي كتابة الشيفرة وصياغة الحوار واقتراح الأسماء ووصف الصور في ثوانٍ. لكنها لا تستطيع أن تقرر <em>لماذا</em> توجد لعبتك. هذا يبقى عمل المصمم: الركائز، والحلقة الأساسية، والإحساس، وآلاف «لا» الصغيرة التي تجعل اللعبة متماسكة.</p>
<p>طريقة مفيدة لتقسيم العمل:</p>
<ul><li><b>أعطِ الذكاء الاصطناعي أعمال السرعة</b>: الشيفرة المتكررة، والنصوص المؤقتة، وعشرين اسمًا لتختار واحدًا، والمسودات الأولى لأوصاف الأغراض، وتلخيص ملاحظات اختباراتك.</li>
<li><b>احتفظ <strong>بالقرارات</strong></b>: ماذا يفعل اللاعب، وما إحساس ذلك، وماذا تحذف، وعمّ تتحدث اللعبة.</li></ul>
<aside class="example"><b>مثال عملي:</b> احتاج مصمم أسماء لـ12 جرعة. سؤال أداة ذكاء اصطناعي «أعطني 30 اسمًا خياليًا لجرعات في لعبة غابة هادئة، قصيرة، كلمتان على الأكثر» استغرق 10 ثوانٍ. احتفظ المصمم بأربعة، وعدّل خمسة، وكتب ثلاثة جديدة مستوحاة من القائمة. الوقت الكلي: 10 دقائق بدل ساعة. لكن حين طلب المصمم نفسه من الأداة «صمّم الحلقة الأساسية للعبتي»، جاء الجواب خليطًا عامًا من الألعاب الشائعة. رماه المصمم واحتفظ بحلقته.</aside>
<p>اللعبة التي اتخذ الذكاء الاصطناعي كل قراراتها تبدو عادة كأنها <strong>متوسط</strong> كل الألعاب الأخرى، لأن هذا ما تتعلم منه هذه الأدوات. ذوقك هو ما يجعل اللعبة مميزة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> قبول أول جواب. عامل كل مخرج من الذكاء الاصطناعي كمسودة تختار منها وتحررها، لا كنسخة نهائية أبدًا.</aside>
<aside class="try"><b>جرّبها:</b> في استوديو التصميم استخدم زر «✨ اقترح بالذكاء الاصطناعي» في إحدى الخطوات (إن كان مفعّلًا على هذه المنصة). احتفظ باقتراح، وغيّر آخر، وارفض ثالثًا، واكتب السبب. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Writing a build brief", image: "/images/59a14c35737e4f4ebe0430940e3070f6.jpg",
      en: { title: "Writing a build brief", body: `<p>The best results from AI coding tools come from a clear <strong>brief</strong> written once, not a long back-and-forth of corrections. A brief is a short document that a stranger, human or AI, could build from. Include:</p>
<ol><li><b>Goal</b> — for example: "a single index.html that runs offline in a browser, no external libraries".</li>
<li><b>Core loop</b> and controls, in short numbered steps.</li>
<li><b>Numbers</b> — speeds, health, timings, from your balance sheet.</li>
<li><b>Assets</b> — file names and sizes it must use.</li>
<li><b>Done when</b> — a checklist the build must pass.</li></ol>
<aside class="example"><b>Worked example:</b> A short brief.<br><em>Goal:</em> one index.html, runs from file://, canvas 960×540.<br><em>Loop:</em> 1) The player moves left/right with arrow keys. 2) Fruit falls from the top at random x positions. 3) Catching fruit gives +1. 4) Missing three fruits ends the game.<br><em>Numbers:</em> player speed 400 px/s; fruit falls at 150 px/s, +10 px/s every 5 points.<br><em>Assets:</em> assets/basket.png (96×48), assets/apple.png (32×32).<br><em>Done when:</em> the score shows top-left; a game-over screen shows the score and "Press Space to restart"; it runs at 60 fps on a laptop.</aside>
<p>Every number and every "done when" item you write is a decision you made, not one the tool guessed. That is how the game stays <em>yours</em>.</p>
<aside class="pitfall"><b>Common mistake:</b> "Make me a fun platformer like X". Vague requests produce generic results, and naming a specific game invites copying it.</aside>
<aside class="try"><b>Try it:</b> The project pack in the Design Studio exports a brief like this (BUILD-PROMPT.md) from your design, together with a GDD and your assets. Finish the steps and download it to see your own brief. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "كتابة موجز البناء", body: `<p>أفضل النتائج من أدوات البرمجة بالذكاء الاصطناعي تأتي من <strong>موجز</strong> واضح يُكتب مرة واحدة، لا من محادثة طويلة من التصحيحات. الموجز وثيقة قصيرة يستطيع غريب، إنسانًا كان أو ذكاءً اصطناعيًا، أن يبني منها. اكتب فيه:</p>
<ol><li><b>الهدف</b> — مثلًا: «ملف index.html واحد يعمل دون إنترنت في المتصفح، بلا مكتبات خارجية».</li>
<li><b>الحلقة الأساسية</b> والتحكم، في خطوات قصيرة مرقّمة.</li>
<li><b>الأرقام</b> — السرعات والصحة والتوقيتات، من جدول التوازن.</li>
<li><b>العناصر</b> — أسماء الملفات وأحجامها التي يجب استخدامها.</li>
<li><b>يكتمل حين</b> — قائمة تحقق يجب أن يجتازها البناء.</li></ol>
<aside class="example"><b>مثال عملي:</b> موجز قصير.<br><em>الهدف:</em> ملف index.html واحد، يعمل من file://، ولوحة رسم 960×540.<br><em>الحلقة:</em> 1) يتحرك اللاعب يمينًا ويسارًا بالأسهم. 2) تسقط الفاكهة من الأعلى في مواضع أفقية عشوائية. 3) التقاط الفاكهة يعطي +1. 4) إفلات ثلاث فواكه ينهي اللعبة.<br><em>الأرقام:</em> سرعة اللاعب 400 بكسل/ث؛ الفاكهة تسقط بسرعة 150 بكسل/ث، وتزيد 10 بكسل/ث كل 5 نقاط.<br><em>العناصر:</em> assets/basket.png (96×48)، وassets/apple.png (32×32).<br><em>يكتمل حين:</em> تظهر النتيجة أعلى الشاشة؛ وتظهر شاشة نهاية فيها النتيجة و«اضغط Space لإعادة اللعب»؛ ويعمل بمعدل 60 إطارًا في الثانية على حاسوب محمول.</aside>
<p>كل رقم وكل بند في «يكتمل حين» تكتبه هو قرار اتخذته أنت، لا قرار خمّنته الأداة. هكذا تبقى اللعبة <em>لعبتك</em>.</p>
<aside class="pitfall"><b>خطأ شائع:</b> «اصنع لي لعبة منصات ممتعة مثل س». الطلبات الغامضة تنتج نتائج عامة، وتسمية لعبة محددة تدعو إلى نسخها.</aside>
<aside class="try"><b>جرّبها:</b> حزمة المشروع في استوديو التصميم تصدّر موجزًا كهذا (BUILD-PROMPT.md) من تصميمك، مع وثيقة تصميم وعناصرك. أكمل الخطوات ونزّلها لترى موجزك الخاص. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Test and iterate", image: "",
      en: { title: "Test and iterate", body: `<p>AI-written code often looks right and still has bugs: a collision that misses at high speed, a score that does not reset, a game that runs twice as fast on a fast screen. Treat every result as a first draft:</p>
<ul><li>Play it immediately. Check every item on your <strong>done when</strong> list, one by one.</li>
<li>Report one problem at a time, with exact steps: "press jump while touching a wall → the player sticks to the wall".</li>
<li>Keep working versions. Save a copy every time something works. If a change breaks things, go back instead of piling fixes on top of each other.</li></ul>
<aside class="example"><b>Worked example:</b> A good and a bad bug report to an AI tool. Bad: "the game is broken, fix it". Good: "Steps: start the game, collect 5 apples, then miss 3. Expected: the game-over screen. Actual: the game keeps running and the miss counter shows 4, 5, 6. Probably the game-over check runs before the counter updates." The good report led to a correct fix in one reply; the bad one produced three rewrites, each with new bugs.</aside>
<p>Learn enough code to <strong>read</strong> what you were given. You do not need to write it from memory, but you must be able to find where the score is updated or where the speed is set. You cannot fix what you cannot read.</p>
<aside class="pitfall"><b>Common mistake:</b> Asking for many changes in one message. The tool changes ten things, two of them break, and you cannot tell which.</aside>
<aside class="try"><b>Try it:</b> In the Game Feel Lab, press "Copy values" and paste them into a note. That is the kind of exact, numeric description a good bug report or brief needs. <a class="go" href="#/lab/platformer">▶ Game Feel Lab</a></aside>` },
      ar: { title: "اختبر وكرّر", body: `<p>الشيفرة التي يكتبها الذكاء الاصطناعي تبدو صحيحة كثيرًا وفيها أخطاء: تصادم لا يُكتشف عند السرعات العالية، أو نتيجة لا تُصفَّر، أو لعبة تعمل بضعف السرعة على شاشة سريعة. عامل كل نتيجة كمسودة أولى:</p>
<ul><li>العبها فورًا. تحقق من كل بند في قائمة <strong>يكتمل حين</strong>، واحدًا تلو الآخر.</li>
<li>أبلغ عن مشكلة واحدة في كل مرة، بخطوات دقيقة: «اضغط القفز وأنت تلمس جدارًا ← يلتصق اللاعب بالجدار».</li>
<li>احتفظ بالنسخ العاملة. احفظ نسخة كل مرة يعمل فيها شيء. إذا أفسد تغيير ما الأمور، فعُد إلى الوراء بدل تكديس الإصلاحات فوق بعضها.</li></ul>
<aside class="example"><b>مثال عملي:</b> بلاغ جيد وبلاغ سيئ عن خطأ لأداة ذكاء اصطناعي. السيئ: «اللعبة معطلة، أصلحها». الجيد: «الخطوات: ابدأ اللعبة، اجمع 5 تفاحات، ثم أفلت 3. المتوقع: شاشة نهاية اللعبة. الفعلي: تستمر اللعبة ويُظهر عدّاد الإفلات 4 و5 و6. غالبًا يحدث فحص النهاية قبل تحديث العدّاد.» أدى البلاغ الجيد إلى إصلاح صحيح من أول رد، وأنتج السيئ ثلاث إعادات كتابة، كل منها بأخطاء جديدة.</aside>
<p>تعلّم من البرمجة ما يكفي <strong>لقراءة</strong> ما أُعطيت. لا تحتاج إلى كتابتها من الذاكرة، لكن يجب أن تستطيع إيجاد مكان تحديث النتيجة أو ضبط السرعة. لا تستطيع إصلاح ما لا تستطيع قراءته.</p>
<aside class="pitfall"><b>خطأ شائع:</b> طلب تغييرات كثيرة في رسالة واحدة. تغيّر الأداة عشرة أشياء، ينكسر اثنان منها، ولا تعرف أيهما.</aside>
<aside class="try"><b>جرّبها:</b> في مختبر إحساس اللعب اضغط «انسخ القيم» والصقها في ملاحظة. هذا هو الوصف الدقيق الرقمي الذي يحتاجه بلاغ الخطأ الجيد أو الموجز الجيد. <a class="go" href="#/lab/platformer">▶ مختبر إحساس اللعب</a></aside>` }
    },
    {
      match: "Ethics, licences and disclosure", image: "",
      en: { title: "Ethics, licences and disclosure", body: `<p>Using AI responsibly protects your players, other creators and your own project. Four areas to check before you publish:</p>
<ul><li><strong>Ownership</strong> — read each tool's terms: who owns the output, and is commercial use allowed? Terms differ between tools and change over time.</li>
<li><strong>Style copying</strong> — never prompt for a living artist's style or a specific game's characters. Describe the qualities you want instead: "thick outlines, warm autumn palette, round friendly shapes".</li>
<li><strong>Disclosure</strong> — some stores, Steam included, ask developers to declare AI-generated content in their game. Be honest with players too.</li>
<li><strong>Privacy</strong> — do not paste private player data (names, emails, chat logs) into AI tools.</li></ul>
<aside class="example"><b>Worked example:</b> A short AI note for a game's store page: "AI tools were used to draft some item descriptions and to generate placeholder sound effects during development. All final art, music, characters and level design were made by the team." It takes one minute to write, and it answers the question before players or the store have to ask it.</aside>
<p>Keep a simple log as you work: which tool, what for, and whether the result is in the final game. It makes the disclosure easy and protects you if questions come later.</p>
<aside class="pitfall"><b>Common mistake:</b> Assuming that "the AI made it" means nobody owns it, or that you can use it however you like. Check the tool's terms and your local law.</aside>
<aside class="try"><b>Try it:</b> Write a three-line AI note for your own project, even if you have not used AI yet, and save it next to your credits file. Then compare it with the credits advice in the Art module. <a class="go" href="#/learn/art">▶ Art module</a></aside>` },
      ar: { title: "الأخلاقيات والتراخيص والإفصاح", body: `<p>استخدام الذكاء الاصطناعي بمسؤولية يحمي لاعبيك والمبدعين الآخرين ومشروعك نفسه. أربعة مجالات تتحقق منها قبل النشر:</p>
<ul><li><strong>الملكية</strong> — اقرأ شروط كل أداة: من يملك المخرجات، وهل الاستخدام التجاري مسموح؟ تختلف الشروط بين الأدوات وتتغير مع الوقت.</li>
<li><strong>نسخ الأساليب</strong> — لا تطلب أبدًا أسلوب فنان حيّ أو شخصيات لعبة محددة. صِف الصفات التي تريدها بدلًا من ذلك: «حدود سميكة، ولوحة ألوان خريفية دافئة، وأشكال مستديرة ودودة».</li>
<li><strong>الإفصاح</strong> — بعض المتاجر، ومنها Steam، تطلب من المطورين التصريح بالمحتوى المولَّد بالذكاء الاصطناعي في لعبتهم. وكن صادقًا مع اللاعبين أيضًا.</li>
<li><strong>الخصوصية</strong> — لا تلصق بيانات لاعبين خاصة (أسماء، أو بريد إلكتروني، أو سجلات محادثة) في أدوات الذكاء الاصطناعي.</li></ul>
<aside class="example"><b>مثال عملي:</b> ملاحظة قصيرة عن الذكاء الاصطناعي لصفحة لعبة في المتجر: «استُخدمت أدوات ذكاء اصطناعي لصياغة مسودات بعض أوصاف الأغراض ولتوليد مؤثرات صوتية مؤقتة أثناء التطوير. كل الرسوم والموسيقى والشخصيات وتصميم المراحل النهائية من صنع الفريق.» تستغرق كتابتها دقيقة، وتجيب عن السؤال قبل أن يضطر اللاعبون أو المتجر إلى طرحه.</aside>
<p>احتفظ بسجل بسيط أثناء العمل: أي أداة، ولأي غرض، وهل النتيجة موجودة في اللعبة النهائية. هذا يسهّل الإفصاح ويحميك إن طُرحت أسئلة لاحقًا.</p>
<aside class="pitfall"><b>خطأ شائع:</b> افتراض أن «الذكاء الاصطناعي صنعه» يعني أن لا أحد يملكه، أو أنك تستطيع استخدامه كيفما شئت. تحقق من شروط الأداة والقانون المحلي.</aside>
<aside class="try"><b>جرّبها:</b> اكتب ملاحظة من ثلاثة أسطر عن الذكاء الاصطناعي لمشروعك، حتى لو لم تستخدمه بعد، واحفظها بجانب ملف الشكر. ثم قارنها بنصيحة ملف الشكر في وحدة الرسوم. <a class="go" href="#/learn/art">▶ وحدة الرسوم</a></aside>` }
    },
    {
      image: "/images/59a14c35737e4f4ebe0430940e3070f6.jpg",
      en: { title: "Workshop: from design to a playable build", body: `<p>This workshop takes about <strong>60 minutes</strong> and connects everything: you will turn a small design into a brief, ask an AI coding tool to build it, and test the result like a QA tester.</p>
<ol><li><b>Small design</b> (10 min): in the Design Studio, complete the steps for a very small game, one mechanic and one screen. A catcher, a dodger or a one-room puzzle is ideal.</li>
<li><b>Export</b> (2 min): download the project pack and open BUILD-PROMPT.md.</li>
<li><b>Edit the brief</b> (10 min): add your numbers and three or more "done when" checks. Remove anything vague.</li>
<li><b>Build</b> (10 min): give the brief to an AI coding tool of your choice and save the resulting index.html next to the assets folder.</li>
<li><b>Test</b> (15 min): open it in a browser. Go through every "done when" item. Write each failure as a bug report with steps, expected and actual.</li>
<li><b>One fix at a time</b> (13 min): send the bug reports one by one. Save a copy after each working fix.</li></ol>
<aside class="example"><b>What you hand in:</b> your edited brief, a list of the bugs you found, and the final index.html. Also write one thing you would design differently now that you have played it.</aside>
<aside class="pitfall"><b>Common mistake:</b> Choosing a game that is too big. If the brief is longer than one page, cut the design in half.</aside>
<aside class="try"><b>Try it:</b> <a class="go" href="#/studio">▶ Start in the Design Studio</a></aside>` },
      ar: { title: "ورشة تطبيقية: من التصميم إلى نسخة قابلة للعب", body: `<p>تستغرق هذه الورشة نحو <strong>60 دقيقة</strong> وتربط كل شيء: ستحوّل تصميمًا صغيرًا إلى موجز، وتطلب من أداة برمجة بالذكاء الاصطناعي بناءه، وتختبر النتيجة كما يفعل مختبِر الجودة.</p>
<ol><li><b>تصميم صغير</b> (10 دقائق): في استوديو التصميم أكمل الخطوات للعبة صغيرة جدًا، بآلية واحدة وشاشة واحدة. لعبة التقاط أو تفادٍ أو لغز من غرفة واحدة مثالية.</li>
<li><b>التصدير</b> (دقيقتان): نزّل حزمة المشروع وافتح BUILD-PROMPT.md.</li>
<li><b>حرّر الموجز</b> (10 دقائق): أضف أرقامك وثلاثة بنود أو أكثر في «يكتمل حين». احذف كل ما هو غامض.</li>
<li><b>البناء</b> (10 دقائق): أعطِ الموجز لأداة برمجة بالذكاء الاصطناعي من اختيارك، واحفظ ملف index.html الناتج بجانب مجلد العناصر.</li>
<li><b>الاختبار</b> (15 دقيقة): افتحه في المتصفح. مرّ على كل بند في «يكتمل حين». اكتب كل إخفاق كبلاغ خطأ فيه الخطوات والمتوقع والفعلي.</li>
<li><b>إصلاح واحد في كل مرة</b> (13 دقيقة): أرسل البلاغات واحدًا تلو الآخر. احفظ نسخة بعد كل إصلاح ناجح.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> موجزك المحرَّر، وقائمة الأخطاء التي وجدتها، وملف index.html النهائي. واكتب أيضًا شيئًا واحدًا كنت ستصممه بشكل مختلف بعد أن لعبته.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> اختيار لعبة كبيرة جدًا. إذا زاد الموجز على صفحة واحدة، فاقسم التصميم إلى النصف.</aside>
<aside class="try"><b>جرّبها:</b> <a class="go" href="#/studio">▶ ابدأ في استوديو التصميم</a></aside>` }
    }
  ],

  /* ================================================================ */
  arabic: [
    {
      match: "Arabic text in game engines", image: "",
      en: { title: "Arabic text in game engines", body: `<p>Arabic letters change shape depending on their position in a word (start, middle, end or alone), and lines run <strong>right to left</strong>. An engine that cannot do <strong>text shaping</strong> shows separate, unconnected letters, often in reversed order, which makes the text unreadable.</p>
<ul><li><b>Godot 4</b> handles Arabic shaping and bidirectional text out of the box.</li>
<li><b>Unity</b>'s TextMeshPro needs a community plugin such as RTLTMPro to connect and order letters correctly.</li>
<li><b>Web games</b> (HTML/canvas) get correct shaping from the browser, as long as you set the text direction.</li>
<li>Choose a font with full Arabic coverage, for example Noto Sans Arabic, Cairo or Tajawal, and test it at small sizes; some fonts become unreadable below 14 px.</li></ul>
<aside class="example"><b>Worked example:</b> The test sentence "اضغط Space للقفز" ("press Space to jump"). A correct engine shows the Arabic words connected, reading right to left, with "Space" in the middle exactly where it belongs. A broken engine shows "ز ف ق ل ل Space ط غ ض ا": separate letters in the wrong order. Add numbers too: "لديك 3 أرواح" ("you have 3 lives"). If the 3 jumps to the wrong end of the line, your bidirectional handling needs work.</aside>
<p>Make a short <strong>test screen</strong> early in development with mixed Arabic, English, numbers and punctuation, and check it on every platform you target.</p>
<aside class="pitfall"><b>Common mistake:</b> Testing Arabic only with short single words. Problems appear with long lines, line breaks and mixed text.</aside>
<aside class="try"><b>Try it:</b> Switch this platform between Arabic and English with the language button and watch how the layout mirrors. Then open the Game Lab in Arabic and look at how the mini-games handle Arabic text inside a canvas. <a class="go" href="#/lab">▶ Open the Game Lab</a></aside>` },
      ar: { title: "النص العربي في محركات الألعاب", body: `<p>تتغير أشكال الحروف العربية حسب موضعها في الكلمة (أول أو وسط أو آخر أو منفردة)، وتسير الأسطر <strong>من اليمين إلى اليسار</strong>. المحرك الذي لا يدعم <strong>تشكيل النص</strong> يعرض حروفًا منفصلة غير متصلة، وكثيرًا ما تكون بترتيب معكوس، فيصبح النص غير مقروء.</p>
<ul><li><b>Godot 4</b> يدعم تشكيل العربية والنص ثنائي الاتجاه مباشرة.</li>
<li><b>Unity</b> بأداة TextMeshPro يحتاج إضافة مجتمعية مثل RTLTMPro لوصل الحروف وترتيبها بشكل صحيح.</li>
<li><b>ألعاب الويب</b> (HTML وCanvas) تحصل على التشكيل الصحيح من المتصفح، بشرط أن تحدد اتجاه النص.</li>
<li>اختر خطًا يغطي العربية بالكامل، مثل Noto Sans Arabic أو Cairo أو Tajawal، واختبره بأحجام صغيرة؛ بعض الخطوط تصبح غير مقروءة تحت 14 بكسل.</li></ul>
<aside class="example"><b>مثال عملي:</b> جملة الاختبار «اضغط Space للقفز». المحرك الصحيح يعرض الكلمات العربية متصلة، تُقرأ من اليمين إلى اليسار، و«Space» في الوسط تمامًا حيث يجب. المحرك المعطّل يعرض «ز ف ق ل ل Space ط غ ض ا»: حروفًا منفصلة بترتيب خاطئ. أضف الأرقام أيضًا: «لديك 3 أرواح». إذا قفز الرقم 3 إلى الطرف الخطأ من السطر، فمعالجة الاتجاهين تحتاج عملًا.</aside>
<p>اصنع <strong>شاشة اختبار</strong> قصيرة في بداية التطوير فيها عربية وإنجليزية وأرقام وعلامات ترقيم ممزوجة، وتحقق منها على كل منصة تستهدفها.</p>
<aside class="pitfall"><b>خطأ شائع:</b> اختبار العربية بكلمات قصيرة منفردة فقط. المشكلات تظهر مع الأسطر الطويلة وفواصل الأسطر والنص الممزوج.</aside>
<aside class="try"><b>جرّبها:</b> بدّل لغة هذه المنصة بين العربية والإنجليزية بزر اللغة، ولاحظ كيف ينعكس التخطيط. ثم افتح مختبر اللعب بالعربية وانظر كيف تتعامل الألعاب المصغرة مع النص العربي داخل لوحة الرسم. <a class="go" href="#/lab">▶ افتح مختبر اللعب</a></aside>` }
    },
    {
      match: "Localization is more than translation", image: "",
      en: { title: "Localization is more than translation", body: `<p><strong>Localization</strong> means adapting a whole game for players in another language and culture: text, layout, numbers, images and sometimes even gameplay. Translation is only one part of it.</p>
<ul><li><strong>Mirror the UI</strong> — back buttons, progress bars, menus and page order usually flip for right-to-left players. But do not mirror everything: media controls (play, rewind) and clocks usually stay as they are.</li>
<li><b>Leave room</b> — Arabic text can be longer or taller than English. Avoid fixed-width boxes; let buttons grow.</li>
<li><strong>Register</strong> — Modern Standard Arabic reaches every Arabic-speaking country; a local dialect adds warmth and humour but narrows the audience.</li>
<li><b>Numbers and dates</b> — decide on Western (123) or Arabic-Indic (١٢٣) digits and use them consistently everywhere.</li>
<li><b>Culture</b> — review symbols, gestures, clothing and humour with native players before launch.</li></ul>
<aside class="example"><b>Worked example:</b> A level-select screen. In English, the progress bar fills left to right, the "next" arrow points right and level 1 is on the left. In Arabic, the bar fills right to left, "next" points left and level 1 is on the right. However, the platformer itself still scrolls left to right, because that is a gameplay decision, not reading direction; many Arabic games keep it so. Decide each element separately, and write the decision in your design document.</aside>
<p>Use a <strong>string table</strong> from day one: every piece of text lives in one file with a key (<em>menu.start</em>, <em>hud.lives</em>), never typed directly into the code. Adding a language later becomes a translation job, not a programming project.</p>
<aside class="pitfall"><b>Common mistake:</b> Building text from pieces ("You have" + n + "lives"). Arabic grammar changes with numbers (one, two, three to ten, eleven and up), so give translators whole sentences for each case.</aside>
<aside class="try"><b>Try it:</b> This platform is bilingual. Switch the language on the Design Studio page and list three elements that mirror and one that does not. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "التوطين أكثر من الترجمة", body: `<p><strong>التوطين</strong> يعني تكييف اللعبة كلها للاعبين في لغة وثقافة أخرى: النصوص والتخطيط والأرقام والصور، وأحيانًا حتى أسلوب اللعب. الترجمة جزء واحد منه فقط.</p>
<ul><li><strong>اعكس الواجهة</strong> — أزرار الرجوع وأشرطة التقدم والقوائم وترتيب الصفحات تنعكس عادة للاعبي اللغات التي تُكتب من اليمين. لكن لا تعكس كل شيء: أزرار تشغيل الوسائط (تشغيل، ترجيع) والساعات تبقى عادة كما هي.</li>
<li><b>اترك مساحة</b> — النص العربي قد يكون أطول أو أعلى من الإنجليزي. تجنّب الصناديق ثابتة العرض، ودع الأزرار تكبر.</li>
<li><strong>مستوى اللغة</strong> — العربية الفصحى المعاصرة تصل إلى كل البلدان العربية، واللهجة المحلية تضيف دفئًا وفكاهة لكنها تضيّق الجمهور.</li>
<li><b>الأرقام والتواريخ</b> — قرّر بين الأرقام الغربية (123) والمشرقية (١٢٣) والتزم بها في كل مكان.</li>
<li><b>الثقافة</b> — راجع الرموز والإيماءات والملابس والفكاهة مع لاعبين من أهل اللغة قبل الإطلاق.</li></ul>
<aside class="example"><b>مثال عملي:</b> شاشة اختيار المراحل. بالإنجليزية يمتلئ شريط التقدم من اليسار إلى اليمين، ويشير سهم «التالي» إلى اليمين، والمرحلة 1 على اليسار. بالعربية يمتلئ الشريط من اليمين إلى اليسار، ويشير «التالي» إلى اليسار، والمرحلة 1 على اليمين. أما لعبة المنصات نفسها فتبقى تتحرك من اليسار إلى اليمين، لأن هذا قرار لعب لا اتجاه قراءة، وكثير من الألعاب العربية تُبقيه كذلك. قرّر كل عنصر على حدة، واكتب القرار في وثيقة التصميم.</aside>
<p>استخدم <strong>جدول نصوص</strong> من اليوم الأول: كل نص يعيش في ملف واحد بمفتاح (<em>menu.start</em>، <em>hud.lives</em>)، ولا يُكتب مباشرة في الشيفرة أبدًا. حينها تصبح إضافة لغة لاحقًا عمل ترجمة لا مشروع برمجة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> بناء النص من قطع («لديك» + ن + «أرواح»). قواعد العربية تتغير مع الأعداد (واحد، اثنان، من ثلاثة إلى عشرة، أحد عشر فما فوق)، فأعطِ المترجمين جملًا كاملة لكل حالة.</aside>
<aside class="try"><b>جرّبها:</b> هذه المنصة ثنائية اللغة. بدّل اللغة في صفحة استوديو التصميم واكتب ثلاثة عناصر تنعكس وعنصرًا واحدًا لا ينعكس. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Heritage as inspiration", image: "/images/9c591068f21ce6e5f57fea2ce375c7ea.jpg",
      en: { title: "Heritage as inspiration", body: `<p>The Arabic-speaking world offers rich, little-used sources for games: <strong>Alf Layla wa Layla</strong> (One Thousand and One Nights) and its stories within stories, desert and sea trade routes, Andalusian gardens and their water systems, Nabataean cities carved in rock, folk tales of the jinn and the ghoul, souqs and caravanserais, pearl diving, and the patterns of Islamic geometry.</p>
<p>Heritage can inspire every layer of a game, not only its look:</p>
<ul><li><b>Mechanics</b> — geometric tiling as a puzzle mechanic; trading along a caravan route as an economy game; pearl diving as a breath-management challenge.</li>
<li><b>Structure</b> — a story within a story, as in the Nights, as a level structure where each tale is a chapter.</li>
<li><b>Art</b> — arches, muqarnas, calligraphy, textiles, palettes taken from real places.</li></ul>
<aside class="example"><b>Worked example:</b> A pitch: "Every night, a storyteller must tell a new tale to keep the city's lamps lit. Each tale is a short level in a different style: a chase through a souq, a puzzle in a palace garden, a voyage between islands. Choices in one tale change details of the next." It borrows a <em>structure</em> from heritage (the frame story) instead of only its surface, and gives the player the storyteller's role.</aside>
<p>Avoid the <strong>orientalist cliché</strong>: endless sand, flying carpets, villains in turbans and exotic decoration with no real people. Research real places, talk to people who live there, read local writers, and give characters their own goals and humour. Authentic detail is exactly what makes a setting feel fresh to the rest of the world.</p>
<aside class="pitfall"><b>Common mistake:</b> Mixing details from many countries and centuries into one "generic Arabian" setting. Pick a place and a time, and be specific.</aside>
<aside class="try"><b>Try it:</b> Start a new project in the Design Studio inspired by one heritage source. Write its pitch in one paragraph and its three pillars. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "التراث مصدرًا للإلهام", body: `<p>يقدّم العالم العربي مصادر غنية قليلة الاستخدام في الألعاب: <strong>ألف ليلة وليلة</strong> وقصصها المتداخلة، وطرق التجارة الصحراوية والبحرية، والحدائق الأندلسية وأنظمة مياهها، ومدن الأنباط المنحوتة في الصخر، والحكايات الشعبية عن الجن والغول، والأسواق والخانات، والغوص على اللؤلؤ، وزخارف الهندسة الإسلامية.</p>
<p>يستطيع التراث أن يلهم كل طبقة في اللعبة، لا مظهرها وحده:</p>
<ul><li><b>الآليات</b> — التبليط الهندسي كآلية ألغاز، والتجارة على طريق القوافل كلعبة اقتصاد، والغوص على اللؤلؤ كتحدٍّ لإدارة النَّفَس.</li>
<li><b>البنية</b> — القصة داخل القصة، كما في الليالي، كبنية مراحل تكون فيها كل حكاية فصلًا.</li>
<li><b>الرسوم</b> — الأقواس والمقرنصات والخط والمنسوجات، ولوحات ألوان مأخوذة من أماكن حقيقية.</li></ul>
<aside class="example"><b>مثال عملي:</b> عرض لفكرة: «في كل ليلة، يجب على راوية أن تحكي حكاية جديدة لتبقى مصابيح المدينة مضاءة. كل حكاية مرحلة قصيرة بأسلوب مختلف: مطاردة في سوق، ولغز في حديقة قصر، ورحلة بين الجزر. اختيارات اللاعب في حكاية تغيّر تفاصيل الحكاية التالية.» إنها تستعير <em>بنية</em> من التراث (القصة الإطارية) لا سطحه فقط، وتمنح اللاعب دور الراوية.</aside>
<p>تجنّب <strong>القالب الاستشراقي</strong>: رمال لا تنتهي، وبُسط طائرة، وأشرار بعمائم، وزخرفة غريبة بلا بشر حقيقيين. ابحث عن أماكن حقيقية، وتحدث مع من يعيشون فيها، واقرأ للكتّاب المحليين، وامنح الشخصيات أهدافها وفكاهتها الخاصة. التفاصيل الأصيلة هي بالضبط ما يجعل العالم يبدو جديدًا لبقية العالم.</p>
<aside class="pitfall"><b>خطأ شائع:</b> خلط تفاصيل من بلدان وقرون كثيرة في عالم «عربي عام» واحد. اختر مكانًا وزمانًا، وكن محددًا.</aside>
<aside class="try"><b>جرّبها:</b> ابدأ مشروعًا جديدًا في استوديو التصميم مستوحى من مصدر تراثي واحد. اكتب عرضه في فقرة واحدة وركائزه الثلاث. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "The Arabic-speaking games market", image: "",
      en: { title: "The Arabic-speaking games market", body: `<p>The Arabic-speaking region is one of the fastest-growing game markets, and it has its own habits that should shape design decisions:</p>
<ul><li><strong>Mobile first</strong> — most players in the region play on phones, often mid-range models. Design for touch, small screens, modest memory and patchy connections.</li>
<li><b>The Gulf</b> — Saudi Arabia and the UAE are among the highest-spending markets in the region, and Saudi Arabia is investing heavily in games and esports.</li>
<li><b>Seasons</b> — evenings during Ramadan and the Eid holidays are peak play times. Plan events and updates around them.</li>
<li><strong>Arabic content</strong> — fully Arabic games, written and designed for the region rather than translated, remain rare. That gap is an opportunity for local studios.</li></ul>
<aside class="example"><b>Worked example:</b> Planning a Ramadan event for a casual puzzle game. Play peaks after iftar and late at night, so daily challenges reset at an evening time, not midnight. The event uses lanterns and crescent decorations, offers a cooperative goal for families playing together, avoids anything tied to food during fasting hours, and ends with an Eid reward. Before building it, the team asked players from three different countries to review the idea, because customs differ between them.</aside>
<p>Prices matter too: many stores support regional pricing, so a price that feels fair in one country may feel very high in another.</p>
<aside class="pitfall"><b>Common mistake:</b> Treating the region as one market. Egypt, Saudi Arabia, Morocco and Iraq differ in dialect, devices, payment methods and income. Know which players you are designing for.</aside>
<aside class="try"><b>Try it:</b> Look up one current, public market report on games in the Middle East and North Africa (the numbers change every year), and note two facts that would change your design. Then read the Candy Crush breakdown as a mobile-first example. <a class="go" href="#/games/candy-crush">▶ Candy Crush breakdown</a></aside>` },
      ar: { title: "سوق الألعاب الناطقة بالعربية", body: `<p>المنطقة الناطقة بالعربية من أسرع أسواق الألعاب نموًا، ولها عاداتها الخاصة التي يجب أن تشكّل قرارات التصميم:</p>
<ul><li><strong>الجوال أولًا</strong> — معظم اللاعبين في المنطقة يلعبون على الهواتف، وكثيرًا ما تكون متوسطة المواصفات. صمّم للّمس والشاشات الصغيرة والذاكرة المحدودة والاتصال المتقطع.</li>
<li><b>الخليج</b> — السعودية والإمارات من أعلى الأسواق إنفاقًا في المنطقة، والسعودية تستثمر بكثافة في الألعاب والرياضات الإلكترونية.</li>
<li><b>المواسم</b> — أمسيات رمضان وإجازات العيد أوقات ذروة اللعب. خطط للأحداث والتحديثات حولها.</li>
<li><strong>المحتوى العربي</strong> — الألعاب العربية بالكامل، المكتوبة والمصممة للمنطقة لا المترجمة إليها، ما زالت نادرة. وهذه الفجوة فرصة للاستوديوهات المحلية.</li></ul>
<aside class="example"><b>مثال عملي:</b> تخطيط حدث رمضاني للعبة ألغاز خفيفة. يبلغ اللعب ذروته بعد الإفطار وفي ساعات الليل المتأخرة، لذلك تُعاد التحديات اليومية في وقت مسائي لا عند منتصف الليل. يستخدم الحدث زينة الفوانيس والأهلّة، ويقدّم هدفًا تعاونيًا للعائلات التي تلعب معًا، ويتجنب أي شيء مرتبط بالطعام في ساعات الصيام، وينتهي بمكافأة العيد. قبل بنائه طلب الفريق من لاعبين من ثلاث دول مختلفة مراجعة الفكرة، لأن العادات تختلف بينها.</aside>
<p>والأسعار مهمة أيضًا: متاجر كثيرة تدعم التسعير الإقليمي، فالسعر الذي يبدو عادلًا في بلد قد يبدو مرتفعًا جدًا في آخر.</p>
<aside class="pitfall"><b>خطأ شائع:</b> معاملة المنطقة كسوق واحدة. مصر والسعودية والمغرب والعراق تختلف في اللهجة والأجهزة وطرق الدفع والدخل. اعرف لأي لاعبين تصمم.</aside>
<aside class="try"><b>جرّبها:</b> ابحث عن تقرير سوق علني حديث عن الألعاب في الشرق الأوسط وشمال أفريقيا (الأرقام تتغير كل عام)، ودوّن حقيقتين ستغيّران تصميمك. ثم اقرأ تحليل Candy Crush كمثال للعبة جوال أولًا. <a class="go" href="#/games/candy-crush">▶ تحليل Candy Crush</a></aside>` }
    },
    {
      image: "/images/7ccdb6d2e558d99a83a8eb931710a429.jpg",
      en: { title: "Workshop: localize one screen into Arabic", body: `<p>This workshop takes about <strong>35 minutes</strong>. You will take one screen of a game, such as a main menu or a HUD, and plan its full Arabic localization, not only the words.</p>
<ol><li><b>Pick a screen</b> (2 min): a main menu, a shop or an in-game HUD. Sketch it in English.</li>
<li><b>String table</b> (8 min): list every piece of text with a key and its Arabic version: <em>menu.play = العب</em>, <em>hud.lives = الأرواح</em>.</li>
<li><b>Plurals</b> (5 min): for any text with a number, write the Arabic for 1, 2, 3–10 and 11+.</li>
<li><b>Mirror</b> (8 min): redraw the screen in Arabic. Mark what flips (menus, arrows, bars) and what stays (gameplay direction, media controls).</li>
<li><b>Space check</b> (5 min): find the longest Arabic label. Does it fit its button? If not, redesign the button, not the text.</li>
<li><b>Culture check</b> (7 min): review icons, gestures and colours. Write one change you would make for players in the region.</li></ol>
<aside class="example"><b>What you hand in:</b> the English sketch, the mirrored Arabic sketch, the string table with plurals, and your culture note.</aside>
<aside class="pitfall"><b>Common mistake:</b> Translating with a tool and never showing it to a native reader. Always have one native speaker read the final screen.</aside>
<aside class="try"><b>Try it:</b> Switch this platform to English and back to Arabic while looking at the Game Lab menu, to see a real mirrored layout. <a class="go" href="#/lab">▶ Game Lab</a></aside>` },
      ar: { title: "ورشة تطبيقية: وطّن شاشة واحدة إلى العربية", body: `<p>تستغرق هذه الورشة نحو <strong>35 دقيقة</strong>. ستأخذ شاشة واحدة من لعبة، مثل القائمة الرئيسية أو الواجهة الطافية، وتخطط توطينها الكامل إلى العربية، لا كلماتها فقط.</p>
<ol><li><b>اختر شاشة</b> (دقيقتان): قائمة رئيسية أو متجر أو واجهة داخل اللعب. ارسمها بالإنجليزية.</li>
<li><b>جدول النصوص</b> (8 دقائق): اكتب كل نص بمفتاح ونسخته العربية: <em>menu.play = العب</em>، <em>hud.lives = الأرواح</em>.</li>
<li><b>الجمع</b> (5 دقائق): لكل نص فيه رقم، اكتب العربية للعدد 1 و2 ومن 3 إلى 10 و11 فما فوق.</li>
<li><b>العكس</b> (8 دقائق): أعد رسم الشاشة بالعربية. حدد ما ينعكس (القوائم والأسهم والأشرطة) وما يبقى (اتجاه اللعب وأزرار الوسائط).</li>
<li><b>فحص المساحة</b> (5 دقائق): ابحث عن أطول تسمية عربية. هل تتسع لها أزرارها؟ إن لم تتسع، فأعد تصميم الزر لا النص.</li>
<li><b>الفحص الثقافي</b> (7 دقائق): راجع الأيقونات والإيماءات والألوان. اكتب تغييرًا واحدًا ستجريه للاعبين في المنطقة.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> الرسم الإنجليزي، والرسم العربي المعكوس، وجدول النصوص مع صيغ الجمع، وملاحظتك الثقافية.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> الترجمة بأداة دون عرضها على قارئ من أهل اللغة أبدًا. اطلب دائمًا من متحدث أصلي واحد قراءة الشاشة النهائية.</aside>
<aside class="try"><b>جرّبها:</b> بدّل هذه المنصة إلى الإنجليزية ثم إلى العربية وأنت تنظر إلى قائمة مختبر اللعب، لترى تخطيطًا معكوسًا حقيقيًا. <a class="go" href="#/lab">▶ مختبر اللعب</a></aside>` }
    }
  ],

  /* ================================================================ */
  production: [
    {
      match: "Choosing an engine", image: "",
      en: { title: "Choosing an engine", body: `<p>A <strong>game engine</strong> is the software that handles the hard, shared parts of every game: drawing to the screen, physics, input, sound and exporting to different devices. You build your game on top of it. Popular options:</p>
<ul><li><b>Godot</b> — free and open source, light and fast to start; excellent for 2D and growing in 3D. Uses its own Python-like language, GDScript.</li>
<li><b>Unity</b> — huge ecosystem, tutorials and asset store; strong for mobile and both 2D and 3D. Uses C#.</li>
<li><b>Unreal Engine</b> — high-end 3D, with Blueprints visual scripting so you can build logic without typing code.</li>
<li><b>GDevelop</b> and <b>Roblox Studio</b> — no-code or low-code tools, great for first games and for publishing to a ready audience.</li>
<li><b>Web (HTML/JavaScript)</b> — runs in any browser with nothing to install; the mini-games on this platform are built this way.</li></ul>
<aside class="example"><b>Worked example:</b> Three learners, three choices. A 14-year-old who wants to share games with friends immediately: GDevelop or Roblox Studio, publishing in a day. A student planning a 2D pixel-art game for PC: Godot, because it is light and free. A team aiming for a realistic 3D world: Unreal Engine. All three are right, because each fits the project and the person, not because one engine is "best".</aside>
<p>Choose by asking: what kind of game (2D or 3D)? Which platforms (browser, phone, PC)? How much do I want to code? And where are the tutorials I can follow?</p>
<aside class="pitfall"><b>Common mistake:</b> Switching engines every time a project gets hard. Every engine has a hard middle. Finish one small game in one engine first.</aside>
<aside class="try"><b>Try it:</b> Open "2D platformer roadmap" and "25 free design tools" in the Gallery and decide which engine you would use for the game in your Design Studio project. Add it to your pitch. <a class="go" href="#/gallery">▶ Gallery</a> <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "اختيار محرك الألعاب", body: `<p><strong>محرك الألعاب</strong> برنامج يتولى الأجزاء الصعبة المشتركة في كل لعبة: الرسم على الشاشة، والفيزياء، والتحكم، والصوت، والتصدير إلى أجهزة مختلفة. وأنت تبني لعبتك فوقه. خيارات شائعة:</p>
<ul><li><b>Godot</b> — مجاني ومفتوح المصدر، خفيف وسريع البدء؛ ممتاز للألعاب ثنائية الأبعاد ويتطور في الثلاثية. يستخدم لغته الخاصة GDScript الشبيهة بـPython.</li>
<li><b>Unity</b> — منظومة ضخمة من الدروس ومتجر العناصر؛ قوي للجوال وللبعدين والثلاثة أبعاد. يستخدم C#.</li>
<li><b>Unreal Engine</b> — ثلاثي الأبعاد عالي المستوى، مع البرمجة المرئية Blueprints لبناء المنطق دون كتابة شيفرة.</li>
<li><b>GDevelop</b> و<b>Roblox Studio</b> — أدوات بلا برمجة أو ببرمجة قليلة، رائعة للألعاب الأولى وللنشر لجمهور جاهز.</li>
<li><b>الويب (HTML وJavaScript)</b> — يعمل في أي متصفح دون تثبيت شيء؛ والألعاب المصغرة في هذه المنصة مبنية بهذه الطريقة.</li></ul>
<aside class="example"><b>مثال عملي:</b> ثلاثة متعلمين وثلاثة اختيارات. فتى في الرابعة عشرة يريد مشاركة الألعاب مع أصدقائه فورًا: GDevelop أو Roblox Studio، والنشر في يوم. طالبة تخطط للعبة بفن البكسل ثنائية الأبعاد للحاسوب: Godot، لأنه خفيف ومجاني. فريق يستهدف عالمًا ثلاثي الأبعاد واقعيًا: Unreal Engine. الثلاثة على صواب، لأن كل اختيار يناسب المشروع والشخص، لا لأن محركًا واحدًا هو «الأفضل».</aside>
<p>اختر بطرح الأسئلة: أي نوع من الألعاب (ثنائية أم ثلاثية الأبعاد)؟ أي منصات (متصفح، هاتف، حاسوب)؟ كم أريد أن أبرمج؟ وأين الدروس التي أستطيع اتباعها؟</p>
<aside class="pitfall"><b>خطأ شائع:</b> تبديل المحرك كلما صار المشروع صعبًا. لكل محرك منتصف صعب. أنهِ لعبة صغيرة واحدة بمحرك واحد أولًا.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورتي «خريطة طريق لعبة منصات ثنائية الأبعاد» و«25 أداة تصميم مجانية» في المعرض، وقرّر أي محرك ستستخدم للعبة مشروعك في استوديو التصميم. أضفه إلى عرضك. <a class="go" href="#/gallery">▶ المعرض</a> <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Your free toolbox", image: "/images/d8dab14f2bdf0e6f35fbd07b4e6ca263.jpg",
      en: { title: "Your free toolbox", body: `<p>You can make a complete game without paying for a single tool. A starter toolbox, by job:</p>
<ul><li><b>Pixel art</b>: Aseprite (low price, or build it free from source), Pixelorama (free).</li>
<li><b>Painting and 2D</b>: Krita. <b>3D</b>: Blender, MagicaVoxel for voxel art.</li>
<li><b>Sound effects</b>: Bfxr, ChipTone. <b>Music</b>: Bosca Ceoil, LMMS. <b>Editing</b>: Audacity.</li>
<li><b>Story and dialogue</b>: Twine and Inky for branching stories.</li>
<li><b>Design</b>: Machinations for modelling economies, Miro for boards and diagrams.</li>
<li><b>Planning</b>: Trello, Notion, HacknPlan. <b>Levels</b>: Tiled for tile maps.</li>
<li><b>Feedback and publishing</b>: itch.io for pages and builds, Discord for community, Google Forms for playtest surveys.</li></ul>
<aside class="example"><b>Worked example:</b> A two-week jam toolbox for one person: Godot (engine), Pixelorama (art), Tiled (levels), Bfxr (sounds), Bosca Ceoil (one music loop), Trello (a board with three columns: To do, Doing, Done) and itch.io (publishing). Seven free tools, all learnable in an evening each, and nothing else needed.</aside>
<p>Pick <strong>one tool per job</strong> and learn it well rather than trying ten. Most tools have short official tutorials; one hour with a tutorial saves days of guessing.</p>
<aside class="pitfall"><b>Common mistake:</b> Spending the first week of a project choosing tools. Choose in an hour, start making, and change only if a tool truly blocks you.</aside>
<aside class="try"><b>Try it:</b> Open "25 free design tools" and "30 free 2D asset sources" in the Gallery. Choose one tool for each job your game needs and write your toolbox list. <a class="go" href="#/gallery">▶ Open the Gallery</a></aside>` },
      ar: { title: "صندوق أدواتك المجاني", body: `<p>تستطيع صنع لعبة كاملة دون دفع ثمن أداة واحدة. صندوق أدوات للبداية حسب المهمة:</p>
<ul><li><b>فن البكسل</b>: Aseprite (بسعر منخفض، أو ابنِه مجانًا من مصدره)، وPixelorama (مجاني).</li>
<li><b>الرسم والبعدان</b>: Krita. <b>الأبعاد الثلاثة</b>: Blender، وMagicaVoxel لفن المكعبات.</li>
<li><b>المؤثرات الصوتية</b>: Bfxr وChipTone. <b>الموسيقى</b>: Bosca Ceoil وLMMS. <b>التحرير</b>: Audacity.</li>
<li><b>القصة والحوار</b>: Twine وInky للقصص المتفرعة.</li>
<li><b>التصميم</b>: Machinations لنمذجة الاقتصادات، وMiro للّوحات والمخططات.</li>
<li><b>التخطيط</b>: Trello وNotion وHacknPlan. <b>المراحل</b>: Tiled لخرائط المربعات.</li>
<li><b>الملاحظات والنشر</b>: itch.io للصفحات والنسخ، وDiscord للمجتمع، وGoogle Forms لاستبيانات الاختبار.</li></ul>
<aside class="example"><b>مثال عملي:</b> صندوق أدوات لجام مدته أسبوعان لشخص واحد: Godot (المحرك)، وPixelorama (الرسم)، وTiled (المراحل)، وBfxr (الأصوات)، وBosca Ceoil (حلقة موسيقية واحدة)، وTrello (لوحة بثلاثة أعمدة: للعمل، وقيد العمل، ومنتهٍ)، وitch.io (النشر). سبع أدوات مجانية، يمكن تعلّم كل منها في أمسية، ولا حاجة لغيرها.</aside>
<p>اختر <strong>أداة واحدة لكل مهمة</strong> وتعلّمها جيدًا بدل تجربة عشر. لمعظم الأدوات دروس رسمية قصيرة؛ ساعة مع درس توفر أيامًا من التخمين.</p>
<aside class="pitfall"><b>خطأ شائع:</b> قضاء الأسبوع الأول من المشروع في اختيار الأدوات. اختر في ساعة، وابدأ الصنع، ولا تغيّر إلا إذا أعاقتك أداة فعلًا.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورتي «25 أداة تصميم مجانية» و«30 مصدرًا مجانيًا لأصول ثنائية الأبعاد» في المعرض. اختر أداة لكل مهمة تحتاجها لعبتك واكتب قائمة صندوق أدواتك. <a class="go" href="#/gallery">▶ افتح المعرض</a></aside>` }
    },
    {
      match: "Scope: the #1 killer of games", image: "",
      en: { title: "Scope: the #1 killer of games", body: `<p>Most games that are never finished do not fail because of bad ideas; they fail because they were too big. <strong>Scope</strong> is the total amount of work a game needs, and beginners almost always underestimate it, often by three times or more.</p>
<p>The fix is to plan the smallest version that is still fun, the <strong>vertical slice</strong>: one complete level or loop, at final quality, with every system working. Then cut features until it fits your time, and cut again.</p>
<aside class="example"><b>Worked example:</b> A first plan: "an open-world RPG with crafting, 10 towns, 50 quests and online co-op". Estimate: several years for a large team. Cut 1: one town, 10 quests, no co-op. Still too big for one person. Cut 2: one village, 3 quests, a crafting system with 8 recipes, 2 hours of play. Realistic in about three months. The ideas that were cut go into a "maybe later" list. If the small game succeeds, it becomes the base for the bigger one.</aside>
<p>A simple estimating trick: list every task, estimate each in hours, then multiply the total by two or three. Unknown problems, bugs and polish always take longer than planned.</p>
<p>A finished small game teaches more than an unfinished big one: you learn menus, saving, balancing, publishing and getting feedback, things you never reach in a project that stalls halfway.</p>
<aside class="pitfall"><b>Common mistake:</b> Adding "just one more feature" during production. Every new feature needs art, sound, testing and balancing too. Put it on the "maybe later" list.</aside>
<aside class="try"><b>Try it:</b> Every mini-game in the Game Lab is a well-scoped game: one loop, one screen, a clear end. Play two of them and write down the number of mechanics each one has. <a class="go" href="#/lab">▶ Open the Game Lab</a></aside>` },
      ar: { title: "النطاق: القاتل الأول للألعاب", body: `<p>معظم الألعاب التي لا تكتمل أبدًا لا تفشل بسبب أفكار سيئة، بل لأنها كانت أكبر من اللازم. <strong>النطاق</strong> هو مجموع العمل الذي تحتاجه اللعبة، والمبتدئون يقللون من تقديره دائمًا تقريبًا، كثيرًا بثلاثة أضعاف أو أكثر.</p>
<p>الحل أن تخطط لأصغر نسخة ما زالت ممتعة، وهي <strong>الشريحة العمودية</strong>: مرحلة واحدة أو حلقة واحدة كاملة بالجودة النهائية، مع عمل كل الأنظمة. ثم احذف الميزات حتى تتسع لوقتك، ثم احذف مرة أخرى.</p>
<aside class="example"><b>مثال عملي:</b> خطة أولى: «لعبة أدوار بعالم مفتوح، فيها صناعة، و10 مدن، و50 مهمة، ولعب تعاوني عبر الإنترنت». التقدير: عدة سنوات لفريق كبير. الحذف الأول: مدينة واحدة، و10 مهام، بلا لعب تعاوني. ما زالت كبيرة على شخص واحد. الحذف الثاني: قرية واحدة، و3 مهام، ونظام صناعة من 8 وصفات، وساعتا لعب. واقعية في نحو ثلاثة أشهر. الأفكار المحذوفة تذهب إلى قائمة «ربما لاحقًا». وإن نجحت اللعبة الصغيرة، تصبح أساسًا للكبيرة.</aside>
<p>حيلة بسيطة للتقدير: اكتب كل مهمة، وقدّر كلًّا منها بالساعات، ثم اضرب المجموع في اثنين أو ثلاثة. المشكلات غير المعروفة والأخطاء والتحسين تستغرق دائمًا أطول مما خُطط له.</p>
<p>اللعبة الصغيرة المكتملة تعلّم أكثر من الكبيرة غير المكتملة: تتعلم القوائم والحفظ والموازنة والنشر وتلقي الملاحظات، وهي أشياء لا تصل إليها أبدًا في مشروع يتوقف في منتصفه.</p>
<aside class="pitfall"><b>خطأ شائع:</b> إضافة «ميزة واحدة أخرى فقط» أثناء الإنتاج. كل ميزة جديدة تحتاج رسومًا وصوتًا واختبارًا وموازنة أيضًا. ضعها في قائمة «ربما لاحقًا».</aside>
<aside class="try"><b>جرّبها:</b> كل لعبة مصغرة في مختبر اللعب لعبة محددة النطاق جيدًا: حلقة واحدة وشاشة واحدة ونهاية واضحة. العب اثنتين منها واكتب عدد الآليات في كل واحدة. <a class="go" href="#/lab">▶ افتح مختبر اللعب</a></aside>` }
    },
    {
      match: "Playtesting", image: "/images/1b45657cfb3c814db3bbbb66ab992790.jpg",
      en: { title: "Playtesting", body: `<p><strong>Playtesting</strong> means watching real people play your game to find out what they actually experience, which is rarely what you intended. It is the single most useful habit in game design.</p>
<ul><li><b>Watch silently; don't explain.</b> Where testers get confused is where the design is unclear. If you explain, you hide the problem.</li>
<li><b>Ask about experience, not opinion.</b> "What did you think you had to do?" and "What was the hardest moment?" teach more than "Did you like it?"</li>
<li><b>Test early</b> with grey boxes, <b>test often</b>, and test with people who are not your friends, because friends are kind.</li>
<li><b>Ask testers to <strong>think aloud</strong></b>: to say what they are looking at, trying and expecting as they play.</li></ul>
<aside class="example"><b>Worked example:</b> A simple observation sheet with four columns: time, what the tester did, what they said, my note. A 10-minute session produced: "01:20 — jumped at the wall three times — 'can I climb this?' — wall looks climbable, change texture". "04:05 — ignored the shop — said nothing — shop sign not visible from the path". Two clear design problems in ten minutes, neither of which the designer had noticed in weeks of playing alone.</aside>
<p>After three to five testers you will see the same problems repeat. That is when to stop testing, fix the biggest issue and test again.</p>
<aside class="pitfall"><b>Common mistake:</b> Arguing with testers ("you were supposed to go left"). Their confusion is data, not a mistake. Write it down and thank them.</aside>
<aside class="try"><b>Try it:</b> Ask someone to play Gem Quest or The Guardian's Chest for five minutes while thinking aloud, and fill in an observation sheet. <a class="go" href="#/lab/puzzle">▶ Gem Quest</a> <a class="go" href="#/lab/adventure">▶ The Guardian's Chest</a></aside>` },
      ar: { title: "اختبار اللعب", body: `<p><strong>اختبار اللعب</strong> يعني مشاهدة أشخاص حقيقيين يلعبون لعبتك لتعرف ما يعيشونه فعلًا، وهو نادرًا ما يكون ما قصدته. إنه أنفع عادة منفردة في تصميم الألعاب.</p>
<ul><li><b>شاهد بصمت ولا تشرح.</b> حيث يرتبك المختبِرون يكون التصميم غير واضح. إذا شرحت، أخفيت المشكلة.</li>
<li><b>اسأل عن التجربة لا عن الرأي.</b> «ما الذي ظننت أن عليك فعله؟» و«ما أصعب لحظة؟» تعلّمك أكثر من «هل أعجبتك؟»</li>
<li><b>اختبر مبكرًا</b> بالمكعبات الرمادية، و<b>اختبر كثيرًا</b>، واختبر مع أشخاص ليسوا أصدقاءك، لأن الأصدقاء لطفاء.</li>
<li><b>اطلب من المختبِرين <strong>التفكير بصوت عالٍ</strong></b>: أن يقولوا ما ينظرون إليه وما يحاولونه وما يتوقعونه أثناء اللعب.</li></ul>
<aside class="example"><b>مثال عملي:</b> ورقة ملاحظة بسيطة بأربعة أعمدة: الوقت، وما فعله المختبِر، وما قاله، وملاحظتي. جلسة مدتها 10 دقائق أنتجت: «01:20 — قفز نحو الجدار ثلاث مرات — "هل أستطيع تسلق هذا؟" — الجدار يبدو قابلًا للتسلق، غيّر الخامة». «04:05 — تجاهل المتجر — لم يقل شيئًا — لافتة المتجر لا تُرى من الطريق». مشكلتا تصميم واضحتان في عشر دقائق، لم يلاحظ المصمم أيًّا منهما في أسابيع من اللعب وحده.</aside>
<p>بعد ثلاثة إلى خمسة مختبِرين سترى المشكلات نفسها تتكرر. هذا وقت التوقف عن الاختبار، وإصلاح أكبر مشكلة، ثم الاختبار مجددًا.</p>
<aside class="pitfall"><b>خطأ شائع:</b> مجادلة المختبِرين («كان يجب أن تذهب يسارًا»). ارتباكهم بيانات لا خطأ. دوّنه واشكرهم.</aside>
<aside class="try"><b>جرّبها:</b> اطلب من شخص أن يلعب «مغامرة الجواهر» أو «صندوق الحارس» خمس دقائق وهو يفكر بصوت عالٍ، واملأ ورقة ملاحظة. <a class="go" href="#/lab/puzzle">▶ مغامرة الجواهر</a> <a class="go" href="#/lab/adventure">▶ صندوق الحارس</a></aside>` }
    },
    {
      match: "Build & ship", image: "",
      en: { title: "Build & ship", body: `<p>Shipping, getting the game into players' hands, is its own phase of work, and it always takes longer than expected. A typical final checklist:</p>
<ol><li><b>Optimise</b> — check that it runs smoothly on the weakest device you support.</li>
<li><b>Fix crashes</b> and anything that loses the player's progress first, cosmetic bugs last.</li>
<li><b>Add options</b> — volume per channel, controls, accessibility settings, language.</li>
<li><b>Export</b> for each platform and test the exported version, not just the editor.</li>
<li><b>Publish</b> — a store page with a clear description, screenshots and a short trailer.</li></ol>
<p><strong>itch.io</strong> is the easiest place to publish a first game for free: you can upload a browser version that people play instantly, set your own price (including free or "pay what you want") and get comments.</p>
<aside class="example"><b>Worked example:</b> An itch.io page that works. Title and a one-line hook: "A tiny lighthouse keeper guides ships through a storm." Three screenshots: one of the core action, one of a dramatic moment, one of the cosy start. A 30-second GIF of gameplay at the top. Controls in a short list. "Made in 10 days for a game jam" in the description. The page took one hour to make and explained the game in ten seconds.</aside>
<p>After launch, write a <strong>post-mortem</strong>: what went right, what went wrong, and what you will do differently next time. It turns one finished game into lessons for every future one.</p>
<aside class="pitfall"><b>Common mistake:</b> Testing only in the editor and finding on launch day that the exported build has missing files or broken input. Export and test a build every week.</aside>
<aside class="try"><b>Try it:</b> Download the project pack from the Design Studio. Its GDD.md is a good start for your store page text: take its pitch and write a one-line hook. <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "البناء والإطلاق", body: `<p>الإطلاق، أي إيصال اللعبة إلى أيدي اللاعبين، مرحلة عمل مستقلة، ويستغرق دائمًا أطول من المتوقع. قائمة تحقق نهائية نموذجية:</p>
<ol><li><b>التحسين</b> — تأكد أن اللعبة تعمل بسلاسة على أضعف جهاز تدعمه.</li>
<li><b>إصلاح الانهيارات</b> وكل ما يُضيّع تقدم اللاعب أولًا، والأخطاء الشكلية أخيرًا.</li>
<li><b>إضافة الخيارات</b> — مستوى الصوت لكل قناة، والتحكم، وإعدادات إمكانية الوصول، واللغة.</li>
<li><b>التصدير</b> لكل منصة، واختبار النسخة المصدَّرة لا المحرر فقط.</li>
<li><b>النشر</b> — صفحة متجر بوصف واضح ولقطات شاشة ومقطع دعائي قصير.</li></ol>
<p><strong>itch.io</strong> أسهل مكان لنشر لعبة أولى مجانًا: يمكنك رفع نسخة متصفح يلعبها الناس فورًا، وتحديد سعرك (بما في ذلك المجاني أو «ادفع ما تريد»)، وتلقي التعليقات.</p>
<aside class="example"><b>مثال عملي:</b> صفحة itch.io ناجحة. العنوان وجملة جذب واحدة: «حارس منارة صغير يرشد السفن عبر العاصفة.» ثلاث لقطات شاشة: واحدة للفعل الأساسي، وواحدة للحظة مثيرة، وواحدة للبداية الهادئة. صورة متحركة مدتها 30 ثانية من اللعب في الأعلى. التحكم في قائمة قصيرة. وعبارة «صُنعت في 10 أيام لجام ألعاب» في الوصف. استغرقت الصفحة ساعة، وشرحت اللعبة في عشر ثوانٍ.</aside>
<p>بعد الإطلاق اكتب <strong>تقرير ما بعد المشروع</strong>: ما الذي نجح، وما الذي أخفق، وما الذي ستفعله بشكل مختلف في المرة القادمة. إنه يحوّل لعبة واحدة مكتملة إلى دروس لكل لعبة قادمة.</p>
<aside class="pitfall"><b>خطأ شائع:</b> الاختبار في المحرر فقط، ثم اكتشاف يوم الإطلاق أن النسخة المصدَّرة تنقصها ملفات أو أن التحكم فيها معطّل. صدّر نسخة واختبرها كل أسبوع.</aside>
<aside class="try"><b>جرّبها:</b> نزّل حزمة المشروع من استوديو التصميم. ملف GDD.md فيها بداية جيدة لنص صفحة المتجر: خذ العرض منه واكتب جملة جذب واحدة. <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "QA: finding and tracking bugs", image: "",
      en: { title: "QA: finding and tracking bugs", body: `<p><strong>QA</strong> (quality assurance) is the work of finding problems before players do. Its first rule: a bug that cannot be reproduced cannot be fixed. Every bug report needs:</p>
<ol><li>A short, specific <b>title</b>: "Player falls through floor in level 3 near the well".</li>
<li><strong>Steps to reproduce</strong>, numbered, starting from a known point such as the main menu.</li>
<li><b>Expected</b> result versus <b>actual</b> result.</li>
<li>Build version, device, and a screenshot or short video.</li></ol>
<aside class="example"><b>Worked example:</b> A complete report. <em>Title:</em> "Coin counter does not reset after Restart". <em>Steps:</em> 1) Start level 1. 2) Collect 3 coins. 3) Press R to restart. <em>Expected:</em> coin counter shows 0/10. <em>Actual:</em> it shows 3/10, and collecting all coins gives 13/10. <em>Build:</em> v0.4, Chrome on Windows. <em>Severity:</em> medium, because progress is wrong but nothing is lost. A programmer can find and fix this in minutes, without asking a single question.</aside>
<p>Keep bugs in one <b>tracker</b> (a Trello board or GitHub Issues is enough) and rank them by <strong>severity</strong>:</p>
<ul><li><b>Critical</b>: crashes, lost saves, a level that cannot be finished.</li>
<li><b>Major</b>: a feature that does not work, or a big balance problem.</li>
<li><b>Minor</b>: small mistakes with an easy workaround.</li>
<li><b>Cosmetic</b>: typos and visual glitches.</li></ul>
<aside class="pitfall"><b>Common mistake:</b> Fixing the cosmetic bugs first because they are quick. Always fix from the top of the severity list down.</aside>
<aside class="try"><b>Try it:</b> Play any mini-game in the Game Lab and try to "break" it: press keys at strange times, restart quickly, resize the window. If you find anything odd, write it as a full report. <a class="go" href="#/lab">▶ Open the Game Lab</a></aside>` },
      ar: { title: "ضمان الجودة: اكتشاف الأخطاء وتتبّعها", body: `<p><strong>ضمان الجودة</strong> هو عمل اكتشاف المشكلات قبل اللاعبين. قاعدته الأولى: الخطأ الذي لا يمكن تكراره لا يمكن إصلاحه. كل بلاغ خطأ يحتاج:</p>
<ol><li><b>عنوانًا</b> قصيرًا ومحددًا: «اللاعب يسقط عبر الأرض في المرحلة 3 قرب البئر».</li>
<li><strong>خطوات إعادة الحدوث</strong>، مرقّمة، تبدأ من نقطة معروفة مثل القائمة الرئيسية.</li>
<li>النتيجة <b>المتوقعة</b> مقابل النتيجة <b>الفعلية</b>.</li>
<li>رقم النسخة، والجهاز، ولقطة شاشة أو مقطع قصير.</li></ol>
<aside class="example"><b>مثال عملي:</b> بلاغ كامل. <em>العنوان:</em> «عدّاد العملات لا يُصفَّر بعد إعادة البدء». <em>الخطوات:</em> 1) ابدأ المرحلة 1. 2) اجمع 3 عملات. 3) اضغط R لإعادة البدء. <em>المتوقع:</em> يُظهر العدّاد 0/10. <em>الفعلي:</em> يُظهر 3/10، وجمع كل العملات يعطي 13/10. <em>النسخة:</em> v0.4، كروم على ويندوز. <em>الخطورة:</em> متوسطة، لأن التقدم خاطئ لكن لا شيء يضيع. يستطيع المبرمج إيجاد هذا وإصلاحه في دقائق دون طرح سؤال واحد.</aside>
<p>احفظ الأخطاء في <b>متتبّع</b> واحد (لوحة Trello أو GitHub Issues تكفي) ورتّبها حسب <strong>الخطورة</strong>:</p>
<ul><li><b>حرجة</b>: انهيارات، أو ضياع الحفظ، أو مرحلة لا يمكن إنهاؤها.</li>
<li><b>كبيرة</b>: ميزة لا تعمل، أو مشكلة توازن كبيرة.</li>
<li><b>صغيرة</b>: أخطاء بسيطة لها حل التفافي سهل.</li>
<li><b>شكلية</b>: أخطاء إملائية وعيوب بصرية.</li></ul>
<aside class="pitfall"><b>خطأ شائع:</b> إصلاح الأخطاء الشكلية أولًا لأنها سريعة. أصلح دائمًا من أعلى قائمة الخطورة نزولًا.</aside>
<aside class="try"><b>جرّبها:</b> العب أي لعبة مصغرة في مختبر اللعب وحاول «كسرها»: اضغط الأزرار في أوقات غريبة، وأعد البدء بسرعة، وغيّر حجم النافذة. إن وجدت شيئًا غريبًا، فاكتبه كبلاغ كامل. <a class="go" href="#/lab">▶ افتح مختبر اللعب</a></aside>` }
    },
    {
      match: "Marketing starts before launch", image: "/images/d891091ff8cea4d867f3d2ef66a32b1f.jpg",
      en: { title: "Marketing starts before launch", body: `<p>Launching to silence is the most common indie mistake. Thousands of games are released every month, and a game nobody has heard of is very hard to find. Start showing the game as soon as it has one good-looking moment, often months before launch.</p>
<ul><li><strong>Store page early</strong> — on Steam, wishlists collected before launch help the store show the game to more people on release day.</li>
<li><strong>Capsule art</strong> — the small store image must read clearly at thumbnail size: one character, one idea, a readable title.</li>
<li><b>Trailer</b> — show gameplay in the first few seconds; keep it to about a minute.</li>
<li><b>Community</b> — share short clips and progress regularly, and reply to every comment.</li></ul>
<aside class="example"><b>Worked example:</b> A three-month plan for a small game. Month 1: post a 10-second clip of the core mechanic every week, and open a free devlog on itch.io. Month 2: launch the store page with capsule art and three screenshots; join one online game festival or showcase. Month 3: release a free demo, send it to a few small content creators who play similar games, and announce the launch date. Each step reuses what you are already making, so it costs a few hours a week.</aside>
<p>Your strongest material is the game itself: a short clip of the most satisfying moment, like the juicy hit or the clever puzzle solution, beats any description.</p>
<aside class="pitfall"><b>Common mistake:</b> Waiting until the game is "perfect" before showing it. Early feedback improves the game, and early followers become your first players.</aside>
<aside class="try"><b>Try it:</b> Open "Running Ghost pitch" in the Gallery and study how it sells a game in one image. Then write your game's one-line hook in the Design Studio pitch step. <a class="go" href="#/gallery">▶ Gallery</a> <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "التسويق يبدأ قبل الإطلاق", body: `<p>الإطلاق في صمت أشيع خطأ لدى المستقلين. آلاف الألعاب تصدر كل شهر، واللعبة التي لم يسمع بها أحد صعبة الاكتشاف جدًا. ابدأ عرض اللعبة حالما تملك لحظة واحدة جميلة المظهر، وغالبًا قبل الإطلاق بأشهر.</p>
<ul><li><strong>صفحة المتجر مبكرًا</strong> — على Steam، قوائم الرغبات المجموعة قبل الإطلاق تساعد المتجر على عرض اللعبة لعدد أكبر من الناس يوم الإصدار.</li>
<li><strong>صورة الغلاف</strong> — صورة المتجر الصغيرة يجب أن تُقرأ بوضوح بحجم مصغّر: شخصية واحدة، وفكرة واحدة، وعنوان مقروء.</li>
<li><b>المقطع الدعائي</b> — أظهر اللعب في الثواني الأولى، واجعله نحو دقيقة.</li>
<li><b>المجتمع</b> — شارك مقاطع قصيرة وتقدمك بانتظام، ورُدّ على كل تعليق.</li></ul>
<aside class="example"><b>مثال عملي:</b> خطة ثلاثة أشهر للعبة صغيرة. الشهر 1: انشر مقطعًا مدته 10 ثوانٍ للآلية الأساسية كل أسبوع، وافتح مدونة تطوير مجانية على itch.io. الشهر 2: أطلق صفحة المتجر بصورة الغلاف وثلاث لقطات شاشة، وشارك في مهرجان أو معرض ألعاب واحد عبر الإنترنت. الشهر 3: أصدر نسخة تجريبية مجانية، وأرسلها إلى عدد من صنّاع المحتوى الصغار الذين يلعبون ألعابًا مشابهة، وأعلن موعد الإطلاق. كل خطوة تعيد استخدام ما تصنعه أصلًا، فتكلّف بضع ساعات في الأسبوع.</aside>
<p>أقوى مادة لديك هي اللعبة نفسها: مقطع قصير لأكثر لحظة إرضاءً، مثل الضربة الحيوية أو الحل الذكي للغز، يتفوق على أي وصف.</p>
<aside class="pitfall"><b>خطأ شائع:</b> انتظار أن تصبح اللعبة «مثالية» قبل عرضها. الملاحظات المبكرة تحسّن اللعبة، والمتابعون الأوائل يصبحون أول لاعبيك.</aside>
<aside class="try"><b>جرّبها:</b> افتح صورة «عرض Running Ghost» في المعرض وادرس كيف تبيع لعبة بصورة واحدة. ثم اكتب جملة جذب واحدة للعبتك في خطوة العرض داخل استوديو التصميم. <a class="go" href="#/gallery">▶ المعرض</a> <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      match: "Your portfolio and career", image: "",
      en: { title: "Your portfolio and career", body: `<p>Studios hire people who <strong>finish</strong> things. A strong beginner portfolio is three to five small, polished, playable games, not one giant unfinished one. Each finished game proves you can handle the whole journey: idea, prototype, build, polish, publish.</p>
<ul><li>Put games where they can be played instantly in a browser, for example on itch.io. Reviewers rarely download and install.</li>
<li>For each project, write what <em>you</em> did, the problem you solved and what you would change.</li>
<li>Pick a direction: design, programming, art, audio, writing or production. Generalists thrive in small teams; specialists in large ones.</li></ul>
<aside class="example"><b>Worked example:</b> A portfolio entry for a game designer. Title, a GIF and a "Play in browser" link. Then three short paragraphs. <em>My role:</em> "Solo designer and programmer, 3 weeks." <em>The problem:</em> "Testers found level 2 too hard; 60% quit there." <em>What I did:</em> "Added a teaching room and changed two jumps; completion rose to 85%. Here are the before and after layouts." This shows thinking, data and iteration, which is exactly what a hiring designer wants to see.</aside>
<p>Game jams are an excellent way to build a portfolio: each one gives you a finished game, teammates you can learn from and a deadline that forces you to finish.</p>
<aside class="pitfall"><b>Common mistake:</b> Showing only final screenshots. Studios want to see your <em>process</em>: sketches, greyboxes, playtest notes and what changed because of them.</aside>
<aside class="try"><b>Try it:</b> Open your profile and look at the badges and modules you have completed. Then plan your first portfolio entry: which workshop from this course would you turn into a small playable game? <a class="go" href="#/profile">▶ Your profile</a> <a class="go" href="#/studio">▶ Design Studio</a></aside>` },
      ar: { title: "معرض أعمالك ومسيرتك المهنية", body: `<p>توظّف الاستوديوهات من <strong>يُنهي</strong> الأشياء. معرض الأعمال القوي للمبتدئ هو ثلاث إلى خمس ألعاب صغيرة مصقولة قابلة للعب، لا لعبة عملاقة واحدة غير مكتملة. كل لعبة مكتملة تُثبت أنك تستطيع إدارة الرحلة كلها: الفكرة، والنموذج، والبناء، والتحسين، والنشر.</p>
<ul><li>ضع الألعاب حيث يمكن لعبها فورًا في المتصفح، مثل itch.io. نادرًا ما يقوم المراجعون بالتنزيل والتثبيت.</li>
<li>لكل مشروع، اكتب ما فعلته <em>أنت</em>، والمشكلة التي حللتها، وما الذي كنت ستغيّره.</li>
<li>اختر اتجاهًا: التصميم، أو البرمجة، أو الرسم، أو الصوت، أو الكتابة، أو الإنتاج. أصحاب المهارات المتعددة يزدهرون في الفرق الصغيرة، والمتخصصون في الكبيرة.</li></ul>
<aside class="example"><b>مثال عملي:</b> مدخل في معرض أعمال مصمم ألعاب. العنوان، وصورة متحركة، ورابط «العب في المتصفح». ثم ثلاث فقرات قصيرة. <em>دوري:</em> «مصمم ومبرمج منفرد، 3 أسابيع.» <em>المشكلة:</em> «وجد المختبِرون المرحلة 2 صعبة جدًا؛ 60% توقفوا عندها.» <em>ما فعلته:</em> «أضفت غرفة تعليم وغيّرت قفزتين؛ ارتفعت نسبة الإنهاء إلى 85%. وهذه تخطيطات المرحلة قبل وبعد.» هذا يُظهر التفكير والبيانات والتكرار، وهو بالضبط ما يريد مصمم التوظيف رؤيته.</aside>
<p>جامات الألعاب طريقة ممتازة لبناء معرض الأعمال: كل جام يعطيك لعبة مكتملة، وزملاء تتعلم منهم، وموعدًا نهائيًا يجبرك على الإنهاء.</p>
<aside class="pitfall"><b>خطأ شائع:</b> عرض لقطات الشاشة النهائية فقط. تريد الاستوديوهات رؤية <em>طريقة عملك</em>: الرسومات الأولية، والمراحل الرمادية، وملاحظات الاختبار، وما تغيّر بسببها.</aside>
<aside class="try"><b>جرّبها:</b> افتح ملفك الشخصي وانظر إلى الأوسمة والوحدات التي أكملتها. ثم خطط لأول مدخل في معرض أعمالك: أي ورشة من هذه الدورة ستحوّلها إلى لعبة صغيرة قابلة للعب؟ <a class="go" href="#/profile">▶ ملفك الشخصي</a> <a class="go" href="#/studio">▶ استوديو التصميم</a></aside>` }
    },
    {
      image: "/images/d8dab14f2bdf0e6f35fbd07b4e6ca263.jpg",
      en: { title: "Workshop: a one-page production plan", body: `<p>This workshop takes about <strong>40 minutes</strong>. You will turn your game idea into a realistic plan on one page, with a scope you can actually finish.</p>
<ol><li><b>Vertical slice</b> (5 min): describe the smallest complete version of your game in three sentences.</li>
<li><b>Task list</b> (10 min): list every task to build that slice: movement, one enemy, one level, menu, sounds, upload.</li>
<li><b>Estimate</b> (5 min): give each task hours. Add them up, then multiply by 2.5.</li>
<li><b>Cut</b> (5 min): compare with the hours you really have per week. Cut tasks until it fits; move the rest to "maybe later".</li>
<li><b>Milestones</b> (8 min): split the plan into weekly milestones, each ending with something playable. Put playtests in weeks 2 and 4 at the latest.</li>
<li><b>Board</b> (7 min): create a Trello or paper board with To do / Doing / Done, and put the first week's tasks on it.</li></ol>
<aside class="example"><b>What you hand in:</b> the one-page plan with the slice description, the estimated task list, the "maybe later" list and the weekly milestones.</aside>
<aside class="pitfall"><b>Common mistake:</b> Planning polish and publishing for "the last few days". Give them a full week in the plan.</aside>
<aside class="try"><b>Try it:</b> Download your project pack from the Design Studio; its GDD.md is the base of this plan. Then compare your plan with "GDD workflow" in the Gallery. <a class="go" href="#/studio">▶ Design Studio</a> <a class="go" href="#/gallery">▶ Gallery</a></aside>` },
      ar: { title: "ورشة تطبيقية: خطة إنتاج من صفحة واحدة", body: `<p>تستغرق هذه الورشة نحو <strong>40 دقيقة</strong>. ستحوّل فكرة لعبتك إلى خطة واقعية في صفحة واحدة، بنطاق تستطيع إنهاءه فعلًا.</p>
<ol><li><b>الشريحة العمودية</b> (5 دقائق): صِف أصغر نسخة مكتملة من لعبتك في ثلاث جمل.</li>
<li><b>قائمة المهام</b> (10 دقائق): اكتب كل مهمة لبناء تلك الشريحة: الحركة، وعدو واحد، ومرحلة واحدة، والقائمة، والأصوات، والرفع.</li>
<li><b>التقدير</b> (5 دقائق): أعطِ كل مهمة عدد ساعات. اجمعها، ثم اضرب المجموع في 2.5.</li>
<li><b>الحذف</b> (5 دقائق): قارن بالساعات المتاحة لك فعلًا كل أسبوع. احذف المهام حتى تتسع الخطة، وانقل الباقي إلى «ربما لاحقًا».</li>
<li><b>المحطات</b> (8 دقائق): قسّم الخطة إلى محطات أسبوعية، تنتهي كل منها بشيء قابل للعب. ضع اختبارات اللعب في الأسبوعين 2 و4 على الأكثر.</li>
<li><b>اللوحة</b> (7 دقائق): أنشئ لوحة Trello أو لوحة ورقية بأعمدة: للعمل / قيد العمل / منتهٍ، وضع عليها مهام الأسبوع الأول.</li></ol>
<aside class="example"><b>ما تسلّمه:</b> الخطة في صفحة واحدة، فيها وصف الشريحة، وقائمة المهام المقدّرة، وقائمة «ربما لاحقًا»، والمحطات الأسبوعية.</aside>
<aside class="pitfall"><b>خطأ شائع:</b> تخطيط التحسين والنشر «للأيام الأخيرة». امنحهما أسبوعًا كاملًا في الخطة.</aside>
<aside class="try"><b>جرّبها:</b> نزّل حزمة مشروعك من استوديو التصميم؛ ملف GDD.md فيها أساس هذه الخطة. ثم قارن خطتك بصورة «مسار وثيقة التصميم» في المعرض. <a class="go" href="#/studio">▶ استوديو التصميم</a> <a class="go" href="#/gallery">▶ المعرض</a></aside>` }
    }
  ]
};
