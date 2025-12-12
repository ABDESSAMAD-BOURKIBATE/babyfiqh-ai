import { QuizLevel } from '../quizTypes';

export const level14: QuizLevel = {
    id: 14,
    titleAr: 'المستوى الرابع عشر: الفقه الميسر',
    titleEn: 'Level 14: Basic Fiqh',
    description: 'أحكام فقهية ميسرة للحياة اليومية',
    descriptionEn: 'Simplified jurisprudence for daily life',
    requiredScore: 70,
    icon: '⚖️',
    questions: [
        {
            id: 1,
            question: 'ما هو الفقه؟',
            questionEn: 'What is Fiqh?',
            options: ['العلم بالأحكام الشرعية العملية من أدلتها التفصيلية', 'حفظ القرآن', 'العبادة فقط', 'الدعاء'],
            optionsEn: ['Knowledge of practical Sharia rulings from detailed evidence', 'Memorizing Quran', 'Worship only', 'Supplication'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 2,
            question: 'ما هي أقسام الحكم الشرعي التكليفي؟',
            questionEn: 'What are the divisions of Taklifi (Prescriptive) rulings?',
            options: ['واجب، مندوب، مباح، مكروه، حرام', 'حلال وحرام فقط', 'فرض وسنة فقط', 'واجب ومستحب فقط'],
            optionsEn: ['Obligatory, Recommended, Permissible, Disliked, Forbidden', 'Halal & Haram only', 'Fard & Sunnah only', 'Wajib & Mustahab only'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 3,
            question: 'ما الفرق بين الفرض والواجب عند الحنفية؟',
            questionEn: 'Difference between Fard and Wajib according to Hanafis?',
            options: ['الفرض ما ثبت بدليل قطعي، الواجب بدليل ظني', 'لا فرق', 'الفرض أقل من الواجب', 'الواجب أعلى من الفرض'],
            optionsEn: ['Fard proven by definitive evidence, Wajib by speculative', 'No difference', 'Fard less than Wajib', 'Wajib higher than Fard'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 4,
            question: 'ما هي شروط الطهارة؟',
            questionEn: 'What are conditions of Purification?',
            options: ['الإسلام، العقل، التمييز، النية، الماء الطهور', 'الماء فقط', 'النية فقط', 'الوضوء فقط'],
            optionsEn: ['Islam, Sanity, Discernment, Intention, Pure water', 'Water only', 'Intention only', 'Wudu only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 5,
            question: 'ما هي فروض الوضوء؟',
            questionEn: 'What are the pillars of Wudu?',
            options: ['غسل الوجه، اليدين، مسح الرأس، غسل الرجلين، الترتيب، الموالاة', 'غسل اليدين فقط', 'المضمضة فقط', 'مسح الرأس فقط'],
            optionsEn: ['Washing face, hands, wiping head, washing feet, order, continuity', 'Washing hands only', 'Rinsing mouth only', 'Wiping head only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 6,
            question: 'ما هي نواقض الوضوء؟',
            questionEn: 'What nullifies Wudu?',
            options: ['الخارج من السبيلين، النوم، زوال العقل، مس الفرج، أكل لحم الإبل (خلاف)', 'الأكل فقط', 'الشرب فقط', 'الكلام فقط'],
            optionsEn: ['Discharge from private parts, sleep, loss of sanity, touching privates, camel meat (disputed)', 'Eating only', 'Drinking only', 'Speaking only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 7,
            question: 'ما هي موجبات الغسل؟',
            questionEn: 'What necessitates Ghusl?',
            options: ['الجنابة، الحيض، النفاس، الموت، الإسلام', 'الجنابة فقط', 'الحيض فقط', 'الوضوء'],
            optionsEn: ['Janabah, Menstruation, Postpartum, Death, Conversion', 'Janabah only', 'Menstruation only', 'Wudu'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 8,
            question: 'ما هو التيمم؟',
            questionEn: 'What is Tayammum?',
            options: ['التطهر بالتراب الطاهر عند عدم الماء أو العجز عنه', 'الوضوء بالماء', 'الغسل', 'المسح على الخفين'],
            optionsEn: ['Purification with pure earth when water unavailable/unable', 'Wudu with water', 'Ghusl', 'Wiping over socks'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 9,
            question: 'متى يشرع التيمم؟',
            questionEn: 'When is Tayammum legislated?',
            options: ['عند عدم الماء أو العجز عن استعماله', 'عند وجود الماء', 'في كل وقت', 'في الحضر فقط'],
            optionsEn: ['When water unavailable or unable to use', 'When water available', 'Anytime', 'In residence only'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 10,
            question: 'ما حكم المسح على الخفين؟',
            questionEn: 'Ruling on wiping over socks?',
            options: ['جائز بشروط', 'واجب', 'حرام', 'مكروه'],
            optionsEn: ['Permissible with conditions', 'Obligatory', 'Forbidden', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 11,
            question: 'ما مدة المسح على الخفين للمقيم؟',
            questionEn: 'Duration of wiping for resident?',
            options: ['يوم وليلة', 'ثلاثة أيام', 'أسبوع', 'شهر'],
            optionsEn: ['One day and night', 'Three days', 'Week', 'Month'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 12,
            question: 'ما مدة المسح على الخفين للمسافر؟',
            questionEn: 'Duration of wiping for traveler?',
            options: ['ثلاثة أيام بلياليها', 'يوم وليلة', 'أسبوع', 'شهر'],
            optionsEn: ['Three days and nights', 'One day and night', 'Week', 'Month'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 13,
            question: 'ما هي أنواع النجاسات؟',
            questionEn: 'What are types of impurities?',
            options: ['مغلظة (كلب وخنزير)، مخففة (بول غلام)، متوسطة (بقية النجاسات)', 'نوع واحد فقط', 'نوعان فقط', 'لا توجد نجاسات'],
            optionsEn: ['Severe (dog/pig), Light (boy\'s urine), Medium (rest)', 'One type only', 'Two types only', 'No impurities'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 14,
            question: 'كيف تطهر النجاسة المغلظة (الكلب)؟',
            questionEn: 'How to purify severe impurity (dog)?',
            options: ['سبع غسلات إحداها بالتراب', 'غسلة واحدة', 'ثلاث غسلات', 'لا تطهر'],
            optionsEn: ['Seven washes, one with earth', 'One wash', 'Three washes', 'Cannot purify'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 15,
            question: 'ما حكم الصلاة بدون طهارة؟',
            questionEn: 'Ruling on prayer without purification?',
            options: ['باطلة', 'صحيحة', 'مكروهة', 'مباحة'],
            optionsEn: ['Invalid', 'Valid', 'Disliked', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 16,
            question: 'ما هي شروط الصلاة؟',
            questionEn: 'What are conditions of Prayer?',
            options: ['الطهارة، ستر العورة، استقبال القبلة، دخول الوقت، النية', 'النية فقط', 'الوقت فقط', 'القبلة فقط'],
            optionsEn: ['Purity, Covering awrah, Facing Qibla, Time entry, Intention', 'Intention only', 'Time only', 'Qibla only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 17,
            question: 'ما هي أركان الصلاة؟',
            questionEn: 'What are pillars of Prayer?',
            options: ['القيام، تكبيرة الإحرام، الفاتحة، الركوع، السجود، الجلوس، التشهد، السلام...', 'الركوع فقط', 'السجود فقط', 'القراءة فقط'],
            optionsEn: ['Standing, Opening Takbir, Fatiha, Ruku, Sujud, Sitting, Tashahhud, Salam...', 'Ruku only', 'Sujud only', 'Recitation only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 18,
            question: 'ما هي واجبات الصلاة؟',
            questionEn: 'What are obligations of Prayer?',
            options: ['التكبيرات غير الإحرام، التسميع، التحميد، التسبيح، التشهد الأول...', 'لا توجد واجبات', 'الأركان فقط', 'السنن فقط'],
            optionsEn: ['Takbirs except opening, Tasmi, Tahmid, Tasbih, First Tashahhud...', 'No obligations', 'Pillars only', 'Sunnahs only'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 19,
            question: 'ما الفرق بين الركن والواجب في الصلاة؟',
            questionEn: 'Difference between Pillar and Obligation in Prayer?',
            options: ['الركن لا يسقط عمداً ولا سهواً، الواجب يسقط سهواً بسجود السهو', 'لا فرق', 'الواجب أهم', 'الركن يسقط سهواً'],
            optionsEn: ['Pillar never drops, Obligation drops if forgotten with prostration', 'No difference', 'Obligation more important', 'Pillar drops if forgotten'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 20,
            question: 'ما حكم صلاة الجماعة للرجال؟',
            questionEn: 'Ruling on congregational prayer for men?',
            options: ['واجبة (أو سنة مؤكدة)', 'سنة خفيفة', 'مستحبة', 'مباحة'],
            optionsEn: ['Obligatory (or confirmed Sunnah)', 'Light Sunnah', 'Recommended', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 21,
            question: 'ما هو أقل عدد لصلاة الجماعة؟',
            questionEn: 'Minimum number for congregational prayer?',
            options: ['اثنان (إمام ومأموم)', 'ثلاثة', 'أربعة', 'خمسة'],
            optionsEn: ['Two (Imam and follower)', 'Three', 'Four', 'Five'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 22,
            question: 'ما حكم صلاة الجمعة؟',
            questionEn: 'Ruling on Friday prayer?',
            options: ['فرض عين على الرجال', 'سنة', 'مستحبة', 'نافلة'],
            optionsEn: ['Individual obligation on men', 'Sunnah', 'Recommended', 'Voluntary'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 23,
            question: 'ما هي شروط وجوب الجمعة؟',
            questionEn: 'Conditions for Friday prayer obligation?',
            options: ['الإسلام، الذكورة، البلوغ، العقل، الإقامة، الصحة، عدم العذر', 'الإسلام فقط', 'الذكورة فقط', 'البلوغ فقط'],
            optionsEn: ['Islam, Male, Puberty, Sanity, Residence, Health, No excuse', 'Islam only', 'Male only', 'Puberty only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 24,
            question: 'ما حكم صلاة العيدين؟',
            questionEn: 'Ruling on Eid prayers?',
            options: ['سنة مؤكدة (أو واجب)', 'فرض عين', 'مستحبة', 'نافلة'],
            optionsEn: ['Confirmed Sunnah (or obligatory)', 'Individual obligation', 'Recommended', 'Voluntary'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 25,
            question: 'متى تصلى صلاة الكسوف؟',
            questionEn: 'When is Eclipse prayer performed?',
            options: ['عند كسوف الشمس أو خسوف القمر', 'كل يوم', 'كل جمعة', 'في العيد'],
            optionsEn: ['During solar or lunar eclipse', 'Every day', 'Every Friday', 'On Eid'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 26,
            question: 'ما حكم صلاة الاستسقاء؟',
            questionEn: 'Ruling on Rain prayer?',
            options: ['سنة مؤكدة', 'واجبة', 'مكروهة', 'محرمة'],
            optionsEn: ['Confirmed Sunnah', 'Obligatory', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 27,
            question: 'ما هي صلاة الاستخارة؟',
            questionEn: 'What is Istikhara prayer?',
            options: ['ركعتان يطلب فيهما العبد من الله الخيرة في أمر', 'صلاة الفجر', 'صلاة الضحى', 'صلاة التهجد'],
            optionsEn: ['Two Rakahs asking Allah for best choice', 'Fajr prayer', 'Duha prayer', 'Tahajjud'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 28,
            question: 'ما حكم قضاء الفوائت؟',
            questionEn: 'Ruling on making up missed prayers?',
            options: ['واجب على الفور', 'مستحب', 'مباح', 'لا يقضى'],
            optionsEn: ['Obligatory immediately', 'Recommended', 'Permissible', 'Not made up'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 29,
            question: 'ما حكم الجمع بين الصلاتين؟',
            questionEn: 'Ruling on combining prayers?',
            options: ['جائز للمسافر والمريض وفي المطر (خلاف)', 'واجب', 'حرام', 'مكروه'],
            optionsEn: ['Permissible for traveler, sick, rain (disputed)', 'Obligatory', 'Forbidden', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 30,
            question: 'ما حكم القصر في السفر؟',
            questionEn: 'Ruling on shortening prayer in travel?',
            options: ['سنة (أو رخصة)', 'واجب', 'حرام', 'مكروه'],
            optionsEn: ['Sunnah (or concession)', 'Obligatory', 'Forbidden', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 31,
            question: 'ما هي الصلوات التي تقصر؟',
            questionEn: 'Which prayers are shortened?',
            options: ['الظهر والعصر والعشاء (من 4 إلى 2)', 'الفجر', 'المغرب', 'كل الصلوات'],
            optionsEn: ['Dhuhr, Asr, Isha (from 4 to 2)', 'Fajr', 'Maghrib', 'All prayers'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 32,
            question: 'ما هي مسافة القصر؟',
            questionEn: 'Distance for shortening?',
            options: ['حوالي 80 كم (مسيرة يوم وليلة)', '20 كم', '50 كم', '200 كم'],
            optionsEn: ['Approx 80 km', '20 km', '50 km', '200 km'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 33,
            question: 'ما حكم سجود السهو؟',
            questionEn: 'Ruling on prostration of forgetfulness?',
            options: ['واجب لجبر الخلل', 'سنة', 'مستحب', 'مباح'],
            optionsEn: ['Obligatory to remedy deficiency', 'Sunnah', 'Recommended', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 34,
            question: 'متى يكون سجود السهو قبل السلام؟',
            questionEn: 'When is prostration before Salam?',
            options: ['عند النقص', 'عند الزيادة', 'عند الشك', 'دائماً'],
            optionsEn: ['For omission', 'For addition', 'For doubt', 'Always'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 35,
            question: 'متى يكون سجود السهو بعد السلام؟',
            questionEn: 'When is prostration after Salam?',
            options: ['عند الزيادة', 'عند النقص', 'عند الشك', 'أبداً'],
            optionsEn: ['For addition', 'For omission', 'For doubt', 'Never'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 36,
            question: 'ما هي أنواع الزكاة؟',
            questionEn: 'What are types of Zakat?',
            options: ['زكاة المال، زكاة الفطر، زكاة الزروع والثمار، زكاة الأنعام', 'زكاة المال فقط', 'زكاة الفطر فقط', 'لا توجد أنواع'],
            optionsEn: ['Wealth, Fitr, Crops/fruits, Livestock', 'Wealth only', 'Fitr only', 'No types'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 37,
            question: 'ما هو نصاب الذهب؟',
            questionEn: 'What is Nisab of gold?',
            options: ['85 جراماً', '50 جراماً', '100 جرام', '200 جرام'],
            optionsEn: ['85 grams', '50 grams', '100 grams', '200 grams'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 38,
            question: 'ما هو نصاب الفضة؟',
            questionEn: 'What is Nisab of silver?',
            options: ['595 جراماً', '200 جرام', '400 جرام', '1000 جرام'],
            optionsEn: ['595 grams', '200 grams', '400 grams', '1000 grams'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 39,
            question: 'ما مقدار زكاة المال؟',
            questionEn: 'Amount of wealth Zakat?',
            options: ['2.5% (ربع العشر)', '5%', '10%', '20%'],
            optionsEn: ['2.5%', '5%', '10%', '20%'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 40,
            question: 'متى تجب الزكاة في المال؟',
            questionEn: 'When is Zakat due on wealth?',
            options: ['إذا بلغ النصاب وحال عليه الحول', 'فوراً', 'كل شهر', 'كل أسبوع'],
            optionsEn: ['When reaches Nisab and year passes', 'Immediately', 'Every month', 'Every week'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 41,
            question: 'من هم مصارف الزكاة الثمانية؟',
            questionEn: 'Who are the eight categories of Zakat recipients?',
            options: ['الفقراء، المساكين، العاملون عليها، المؤلفة قلوبهم، الرقاب، الغارمون، في سبيل الله، ابن السبيل', 'الفقراء فقط', 'المساكين فقط', 'الجميع'],
            optionsEn: ['Poor, Needy, Workers, Hearts reconciled, Slaves, Debtors, Allah\'s path, Travelers', 'Poor only', 'Needy only', 'Everyone'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 42,
            question: 'هل يجوز إعطاء الزكاة للأقارب؟',
            questionEn: 'Is giving Zakat to relatives permissible?',
            options: ['نعم إلا من تجب نفقتهم', 'لا مطلقاً', 'نعم للجميع', 'للوالدين فقط'],
            optionsEn: ['Yes except those whose maintenance obligatory', 'No absolutely', 'Yes to all', 'Parents only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 43,
            question: 'ما حكم منع الزكاة؟',
            questionEn: 'Ruling on withholding Zakat?',
            options: ['كبيرة من الكبائر', 'صغيرة', 'مكروه', 'مباح'],
            optionsEn: ['Major sin', 'Minor sin', 'Disliked', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 44,
            question: 'ما هو البيع؟',
            questionEn: 'What is Sale (Bay)?',
            options: ['مبادلة مال بمال بقصد التملك', 'الهبة', 'الإجارة', 'القرض'],
            optionsEn: ['Exchange of property for property for ownership', 'Gift', 'Lease', 'Loan'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 45,
            question: 'ما هي شروط صحة البيع؟',
            questionEn: 'Conditions for valid sale?',
            options: ['التراضي، أن يكون المبيع مباحاً، مملوكاً، مقدوراً على تسليمه، معلوماً', 'التراضي فقط', 'الثمن فقط', 'المبيع فقط'],
            optionsEn: ['Mutual consent, Permissible item, Owned, Deliverable, Known', 'Consent only', 'Price only', 'Item only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 46,
            question: 'ما هو الربا؟',
            questionEn: 'What is Riba (Usury)?',
            options: ['الزيادة المشروطة في أحد العوضين', 'البيع', 'الشراء', 'الإجارة'],
            optionsEn: ['Stipulated increase in one of two countervalues', 'Sale', 'Purchase', 'Lease'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 47,
            question: 'ما هي أنواع الربا؟',
            questionEn: 'Types of Riba?',
            options: ['ربا الفضل، ربا النسيئة', 'نوع واحد', 'ثلاثة أنواع', 'أربعة أنواع'],
            optionsEn: ['Riba Al-Fadl, Riba An-Nasi\'ah', 'One type', 'Three types', 'Four types'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 48,
            question: 'ما حكم الربا؟',
            questionEn: 'Ruling on Riba?',
            options: ['من أكبر الكبائر', 'صغيرة', 'مكروه', 'مباح'],
            optionsEn: ['Among greatest major sins', 'Minor sin', 'Disliked', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 49,
            question: 'ما هو الغرر؟',
            questionEn: 'What is Gharar (Uncertainty)?',
            options: ['بيع ما لا يعلم حصوله أو صفته', 'البيع الصحيح', 'الشراء', 'الإجارة'],
            optionsEn: ['Selling what is uncertain in existence or quality', 'Valid sale', 'Purchase', 'Lease'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 50,
            question: 'ما حكم بيع الغرر؟',
            questionEn: 'Ruling on Gharar sale?',
            options: ['منهي عنه', 'جائز', 'مستحب', 'واجب'],
            optionsEn: ['Forbidden', 'Permissible', 'Recommended', 'Obligatory'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 51,
            question: 'ما هو النكاح؟',
            questionEn: 'What is Nikah (Marriage)?',
            options: ['عقد يفيد حل استمتاع كل من الزوجين بالآخر', 'الخطبة', 'الطلاق', 'الرجعة'],
            optionsEn: ['Contract permitting mutual enjoyment', 'Engagement', 'Divorce', 'Return'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 52,
            question: 'ما هي أركان النكاح؟',
            questionEn: 'Pillars of Marriage?',
            options: ['الزوجان، الولي، الشاهدان، الصيغة (الإيجاب والقبول)', 'الزوجان فقط', 'الولي فقط', 'المهر فقط'],
            optionsEn: ['Spouses, Guardian, Witnesses, Formula (Offer & Acceptance)', 'Spouses only', 'Guardian only', 'Mahr only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 53,
            question: 'ما هي شروط الولي في النكاح؟',
            questionEn: 'Conditions of Guardian in marriage?',
            options: ['الذكورة، البلوغ، العقل، الحرية، الإسلام (لمسلمة)', 'الذكورة فقط', 'البلوغ فقط', 'لا شروط'],
            optionsEn: ['Male, Puberty, Sanity, Freedom, Islam (for Muslim)', 'Male only', 'Puberty only', 'No conditions'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 54,
            question: 'من هو الولي الأقرب؟',
            questionEn: 'Who is the closest guardian?',
            options: ['الأب ثم الجد ثم الأخ الشقيق...', 'العم', 'الخال', 'الصديق'],
            optionsEn: ['Father, then grandfather, then full brother...', 'Uncle', 'Maternal uncle', 'Friend'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 55,
            question: 'ما حكم المهر؟',
            questionEn: 'Ruling on Mahr (Dowry)?',
            options: ['واجب', 'سنة', 'مستحب', 'مكروه'],
            optionsEn: ['Obligatory', 'Sunnah', 'Recommended', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 56,
            question: 'هل يشترط مقدار معين للمهر؟',
            questionEn: 'Is specific amount required for Mahr?',
            options: ['لا، ما تراضى عليه الطرفان', 'نعم، ألف دينار', 'نعم، مئة دينار', 'نعم، عشرة دنانير'],
            optionsEn: ['No, what parties agree on', 'Yes, 1000 dinars', 'Yes, 100 dinars', 'Yes, 10 dinars'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 57,
            question: 'ما هو الطلاق؟',
            questionEn: 'What is Divorce (Talaq)?',
            options: ['حل عقد النكاح بلفظ مخصوص', 'الزواج', 'الخطبة', 'الرجعة'],
            optionsEn: ['Dissolving marriage with specific wording', 'Marriage', 'Engagement', 'Return'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 58,
            question: 'ما هي أنواع الطلاق؟',
            questionEn: 'Types of Divorce?',
            options: ['رجعي، بائن بينونة صغرى، بائن بينونة كبرى', 'نوع واحد', 'نوعان', 'أربعة أنواع'],
            optionsEn: ['Revocable, Minor irrevocable, Major irrevocable', 'One type', 'Two types', 'Four types'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 59,
            question: 'ما هي العدة؟',
            questionEn: 'What is Iddah (Waiting period)?',
            options: ['المدة التي تتربص فيها المرأة بعد الفرقة', 'فترة الخطبة', 'فترة الزواج', 'فترة الحمل'],
            optionsEn: ['Period woman waits after separation', 'Engagement period', 'Marriage period', 'Pregnancy period'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 60,
            question: 'ما هي عدة المطلقة غير الحامل؟',
            questionEn: 'Iddah of divorced non-pregnant woman?',
            options: ['ثلاثة قروء (حيضات)', 'شهر', 'شهران', 'أربعة أشهر'],
            optionsEn: ['Three menstrual cycles', 'One month', 'Two months', 'Four months'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 61,
            question: 'ما هي عدة الحامل؟',
            questionEn: 'Iddah of pregnant woman?',
            options: ['وضع الحمل', 'ثلاثة أشهر', 'أربعة أشهر وعشر', 'شهر'],
            optionsEn: ['Delivery', 'Three months', 'Four months ten days', 'One month'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 62,
            question: 'ما هي عدة المتوفى عنها زوجها؟',
            questionEn: 'Iddah of widow?',
            options: ['أربعة أشهر وعشراً', 'ثلاثة أشهر', 'شهر', 'ستة أشهر'],
            optionsEn: ['Four months ten days', 'Three months', 'One month', 'Six months'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 63,
            question: 'ما هي الحضانة؟',
            questionEn: 'What is Custody (Hadanah)?',
            options: ['القيام بتربية الصغير ورعايته', 'النفقة', 'الطلاق', 'الزواج'],
            optionsEn: ['Raising and caring for child', 'Maintenance', 'Divorce', 'Marriage'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 64,
            question: 'من الأحق بحضانة الصغير؟',
            questionEn: 'Who has priority for child custody?',
            options: ['الأم ثم أمهاتها ثم الأب...', 'الأب فقط', 'الجد', 'العم'],
            optionsEn: ['Mother, then her mothers, then father...', 'Father only', 'Grandfather', 'Uncle'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 65,
            question: 'ما هي النفقة؟',
            questionEn: 'What is Maintenance (Nafaqah)?',
            options: ['ما يحتاجه الإنسان من طعام وكسوة ومسكن', 'المال فقط', 'الطعام فقط', 'المسكن فقط'],
            optionsEn: ['What person needs of food, clothing, shelter', 'Money only', 'Food only', 'Shelter only'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 66,
            question: 'على من تجب النفقة؟',
            questionEn: 'Upon whom is maintenance obligatory?',
            options: ['الزوج على زوجته، الوالد على أولاده، الولد على والديه الفقيرين', 'الزوج فقط', 'الوالد فقط', 'لا أحد'],
            optionsEn: ['Husband on wife, Father on children, Child on poor parents', 'Husband only', 'Father only', 'No one'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 67,
            question: 'ما هي الوصية؟',
            questionEn: 'What is Will (Wasiyyah)?',
            options: ['التبرع بالمال بعد الموت', 'الهبة', 'البيع', 'الإجارة'],
            optionsEn: ['Donating property after death', 'Gift', 'Sale', 'Lease'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 68,
            question: 'ما هو الحد الأقصى للوصية؟',
            questionEn: 'Maximum limit for will?',
            options: ['الثلث', 'النصف', 'الربع', 'الكل'],
            optionsEn: ['One third', 'Half', 'Quarter', 'All'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 69,
            question: 'هل تجوز الوصية للوارث؟',
            questionEn: 'Is will for heir permissible?',
            options: ['لا إلا بإجازة الورثة', 'نعم', 'نعم بالثلث', 'نعم بالنصف'],
            optionsEn: ['No except with heirs\' permission', 'Yes', 'Yes with third', 'Yes with half'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 70,
            question: 'ما هي الميراث؟',
            questionEn: 'What is Inheritance (Mirath)?',
            options: ['انتقال مال الميت إلى ورثته', 'الوصية', 'الهبة', 'البيع'],
            optionsEn: ['Transfer of deceased\'s property to heirs', 'Will', 'Gift', 'Sale'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 71,
            question: 'ما هي أسباب الميراث؟',
            questionEn: 'Causes of Inheritance?',
            options: ['النكاح، النسب، الولاء', 'النسب فقط', 'النكاح فقط', 'الصداقة'],
            optionsEn: ['Marriage, Kinship, Loyalty', 'Kinship only', 'Marriage only', 'Friendship'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 72,
            question: 'ما هي موانع الميراث؟',
            questionEn: 'Impediments to Inheritance?',
            options: ['القتل، اختلاف الدين، الرق', 'لا موانع', 'القتل فقط', 'الدين فقط'],
            optionsEn: ['Killing, Different religion, Slavery', 'No impediments', 'Killing only', 'Religion only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 73,
            question: 'ما نصيب الزوج من زوجته إذا لم يكن لها فرع وارث؟',
            questionEn: 'Husband\'s share from wife if no inheriting offspring?',
            options: ['النصف', 'الربع', 'الثلث', 'الكل'],
            optionsEn: ['Half', 'Quarter', 'Third', 'All'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 74,
            question: 'ما نصيب الزوجة من زوجها إذا لم يكن له فرع وارث؟',
            questionEn: 'Wife\'s share from husband if no inheriting offspring?',
            options: ['الربع', 'النصف', 'الثلث', 'السدس'],
            optionsEn: ['Quarter', 'Half', 'Third', 'Sixth'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 75,
            question: 'للذكر مثل حظ...؟',
            questionEn: 'For male is equivalent to share of...?',
            options: ['الأنثيين', 'الأنثى', 'ثلاث إناث', 'أربع إناث'],
            optionsEn: ['Two females', 'One female', 'Three females', 'Four females'],
            correctAnswer: 0,
            difficulty: 'easy'
        }
    ]
};
