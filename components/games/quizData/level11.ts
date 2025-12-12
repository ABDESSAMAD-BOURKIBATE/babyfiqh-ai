import { QuizLevel } from '../quizTypes';

export const level11: QuizLevel = {
    id: 11,
    titleAr: 'المستوى الحادي عشر: الحج والعمرة',
    titleEn: 'Level 11: Hajj & Umrah',
    description: 'مناسك الحج والعمرة',
    descriptionEn: 'Rituals of Hajj and Umrah',
    requiredScore: 70,
    icon: '🕋',
    questions: [
        {
            id: 1,
            question: 'ما هو الركن الخامس من أركان الإسلام؟',
            questionEn: 'What is the fifth pillar of Islam?',
            options: ['الحج', 'الصوم', 'الزكاة', 'الصلاة'],
            optionsEn: ['Hajj', 'Fasting', 'Zakat', 'Prayer'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 2,
            question: 'على من يجب الحج؟',
            questionEn: 'Upon whom is Hajj obligatory?',
            options: ['على كل مسلم بالغ عاقل مستطيع', 'على الأغنياء فقط', 'على الرجال فقط', 'على العرب فقط'],
            optionsEn: ['Every capable adult Muslim', 'Only the rich', 'Only men', 'Only Arabs'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 3,
            question: 'كم مرة يجب الحج في العمر؟',
            questionEn: 'How many times is Hajj obligatory in a lifetime?',
            options: ['مرة واحدة', 'كل سنة', 'كل 5 سنوات', 'مرتان'],
            optionsEn: ['Once', 'Every year', 'Every 5 years', 'Twice'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 4,
            question: 'ما هي العمرة؟',
            questionEn: 'What is Umrah?',
            options: ['زيارة البيت الحرام لأداء مناسك خاصة', 'زيارة المدينة المنورة', 'صيام يوم عرفة', 'الوقوف بعرفة'],
            optionsEn: ['Visiting Kaaba for special rituals', 'Visiting Madinah', 'Fasting Arafah', 'Standing at Arafah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 5,
            question: 'ما هو الميقات؟',
            questionEn: 'What is Miqat?',
            options: ['المكان الذي يحرم منه الحاج أو المعتمر', 'مكان رمي الجمرات', 'مكان الطواف', 'مكان السعي'],
            optionsEn: ['Place where pilgrim enters Ihram', 'Place of stoning', 'Place of Tawaf', 'Place of Sa\'i'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 6,
            question: 'ما هو الإحرام؟',
            questionEn: 'What is Ihram?',
            options: ['نية الدخول في النسك مع تجنب المحظورات', 'لبس الملابس البيضاء فقط', 'الوضوء', 'الصلاة'],
            optionsEn: ['Intention to enter ritual avoiding prohibitions', 'Wearing white only', 'Wudu', 'Prayer'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 7,
            question: 'ماذا يلبس الرجل في الإحرام؟',
            questionEn: 'What does a man wear in Ihram?',
            options: ['إزار ورداء غير مخيطين', 'ثوب أبيض عادي', 'أي ملابس مريحة', 'عباءة'],
            optionsEn: ['Two unstitched sheets', 'Normal white thobe', 'Any comfortable clothes', 'Abaya'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 8,
            question: 'ماذا تلبس المرأة في الإحرام؟',
            questionEn: 'What does a woman wear in Ihram?',
            options: ['ملابسها العادية الساترة دون نقاب أو قفازين', 'ملابس بيضاء فقط', 'ملابس سوداء فقط', 'إزار ورداء'],
            optionsEn: ['Normal covering clothes w/o face veil/gloves', 'White only', 'Black only', 'Two sheets'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 9,
            question: 'ما هو الطواف؟',
            questionEn: 'What is Tawaf?',
            options: ['الدوران حول الكعبة 7 أشواط', 'السعي بين الصفا والمروة', 'الوقوف بعرفة', 'رمي الجمرات'],
            optionsEn: ['Circling Kaaba 7 times', 'Walking between Safa & Marwa', 'Standing at Arafah', 'Stoning Jamarat'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 10,
            question: 'من أين يبدأ الطواف؟',
            questionEn: 'Where does Tawaf start?',
            options: ['من الحجر الأسود', 'من الركن اليماني', 'من مقام إبراهيم', 'من باب الكعبة'],
            optionsEn: ['From Black Stone', 'From Yamani Corner', 'From Maqam Ibrahim', 'From Kaaba Door'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 11,
            question: 'ما هو السعي؟',
            questionEn: 'What is Sa\'i?',
            options: ['المشي بين الصفا والمروة 7 أشواط', 'الدوران حول الكعبة', 'رمي الجمرات', 'المبيت بمنى'],
            optionsEn: ['Walking between Safa & Marwa 7 times', 'Circling Kaaba', 'Stoning Jamarat', 'Staying in Mina'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 12,
            question: 'ما هو الركن الأعظم في الحج؟',
            questionEn: 'What is the greatest pillar of Hajj?',
            options: ['الوقوف بعرفة', 'طواف الإفاضة', 'السعي', 'الإحرام'],
            optionsEn: ['Standing at Arafah', 'Tawaf al-Ifadah', 'Sa\'i', 'Ihram'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 13,
            question: 'متى يكون الوقوف بعرفة؟',
            questionEn: 'When is standing at Arafah?',
            options: ['يوم 9 ذو الحجة', 'يوم 8 ذو الحجة', 'يوم 10 ذو الحجة', 'يوم 11 ذو الحجة'],
            optionsEn: ['9th of Dhul-Hijjah', '8th of Dhul-Hijjah', '10th of Dhul-Hijjah', '11th of Dhul-Hijjah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 14,
            question: 'ماذا يفعل الحجاج في مزدلفة؟',
            questionEn: 'What do pilgrims do in Muzdalifah?',
            options: ['يبيتون فيها ويجمعون الحصى', 'يطوفون', 'يسعون', 'يذبحون الهدي'],
            optionsEn: ['Stay overnight and collect pebbles', 'Perform Tawaf', 'Perform Sa\'i', 'Sacrifice animal'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 15,
            question: 'ما هي الجمرات؟',
            questionEn: 'What are Jamarat?',
            options: ['أعمدة حجرية ترجم بالحصى', 'أماكن للراحة', 'أبواب المسجد الحرام', 'جبال في مكة'],
            optionsEn: ['Stone pillars pelted with pebbles', 'Resting places', 'Gates of Haram', 'Mountains in Makkah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 16,
            question: 'كم عدد الجمرات؟',
            questionEn: 'How many Jamarat are there?',
            options: ['ثلاثة (الصغرى، الوسطى، الكبرى)', 'واحدة', 'اثنتان', 'أربعة'],
            optionsEn: ['Three (Small, Medium, Large)', 'One', 'Two', 'Four'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 17,
            question: 'ما هو الهدي؟',
            questionEn: 'What is Hady?',
            options: ['ما يذبح من الأنعام تقرباً لله في الحج', 'صدقة مالية', 'صيام', 'دعاء'],
            optionsEn: ['Animal sacrificed in Hajj', 'Monetary charity', 'Fasting', 'Supplication'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 18,
            question: 'ما هو التحلل الأول؟',
            questionEn: 'What is the First Tahallul?',
            options: ['الخروج من الإحرام بعد فعل اثنين من ثلاثة (رمي، حلق، طواف)', 'انتهاء الحج كاملاً', 'لبس المخيط فقط', 'قص الأظافر'],
            optionsEn: ['Exiting Ihram after 2 of 3 (Stoning, Shaving, Tawaf)', 'Completing Hajj fully', 'Wearing stitched only', 'Cutting nails'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 19,
            question: 'ما هو طواف الوداع؟',
            questionEn: 'What is Tawaf al-Wada?',
            options: ['آخر عهد الحاج بالبيت قبل السفر', 'أول طواف', 'طواف الإفاضة', 'طواف التطوع'],
            optionsEn: ['Last Tawaf before leaving', 'First Tawaf', 'Tawaf al-Ifadah', 'Voluntary Tawaf'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 20,
            question: 'ما حكم طواف الوداع؟',
            questionEn: 'Ruling on Tawaf al-Wada?',
            options: ['واجب على غير الحائض والنفساء', 'سنة', 'ركن', 'مستحب'],
            optionsEn: ['Obligatory except for menstruating women', 'Sunnah', 'Pillar', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 21,
            question: 'ما هو يوم التروية؟',
            questionEn: 'What is the Day of Tarwiyah?',
            options: ['يوم 8 ذو الحجة', 'يوم 9 ذو الحجة', 'يوم 10 ذو الحجة', 'يوم 7 ذو الحجة'],
            optionsEn: ['8th of Dhul-Hijjah', '9th of Dhul-Hijjah', '10th of Dhul-Hijjah', '7th of Dhul-Hijjah'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 22,
            question: 'أين يذهب الحجاج في يوم التروية؟',
            questionEn: 'Where do pilgrims go on Day of Tarwiyah?',
            options: ['إلى منى', 'إلى عرفة', 'إلى مزدلفة', 'إلى مكة'],
            optionsEn: ['To Mina', 'To Arafah', 'To Muzdalifah', 'To Makkah'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 23,
            question: 'ما هو يوم النحر؟',
            questionEn: 'What is the Day of Nahr (Sacrifice)?',
            options: ['يوم 10 ذو الحجة (عيد الأضحى)', 'يوم 9 ذو الحجة', 'يوم 11 ذو الحجة', 'يوم 8 ذو الحجة'],
            optionsEn: ['10th Dhul-Hijjah (Eid)', '9th Dhul-Hijjah', '11th Dhul-Hijjah', '8th Dhul-Hijjah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 24,
            question: 'ما هي أنواع النسك في الحج؟',
            questionEn: 'What are the types of Hajj rituals (Nusuk)?',
            options: ['التمتع، القران، الإفراد', 'الحج والعمرة', 'الفرض والسنة', 'القصير والطويل'],
            optionsEn: ['Tamattu, Qiran, Ifrad', 'Hajj & Umrah', 'Fard & Sunnah', 'Short & Long'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 25,
            question: 'ما هو التمتع؟',
            questionEn: 'What is Tamattu?',
            options: ['العمرة في أشهر الحج ثم التحلل ثم الحج', 'الحج والعمرة بنية واحدة', 'الحج فقط', 'العمرة فقط'],
            optionsEn: ['Umrah in Hajj months, break Ihram, then Hajj', 'Hajj & Umrah one intention', 'Hajj only', 'Umrah only'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 26,
            question: 'ما هو القران؟',
            questionEn: 'What is Qiran?',
            options: ['الإحرام بالحج والعمرة معاً دون تحلل بينهما', 'العمرة ثم الحج', 'الحج فقط', 'العمرة فقط'],
            optionsEn: ['Ihram for Hajj & Umrah together w/o break', 'Umrah then Hajj', 'Hajj only', 'Umrah only'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 27,
            question: 'ما هو الإفراد؟',
            questionEn: 'What is Ifrad?',
            options: ['الإحرام بالحج فقط', 'الإحرام بالعمرة فقط', 'الجمع بينهما', 'التتابع'],
            optionsEn: ['Ihram for Hajj only', 'Ihram for Umrah only', 'Combining both', 'Succession'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 28,
            question: 'ما حكم صيد البر للمحرم؟',
            questionEn: 'Ruling on land hunting for Muhrim?',
            options: ['حرام', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 29,
            question: 'ما حكم قطع شجر الحرم؟',
            questionEn: 'Ruling on cutting Haram trees?',
            options: ['حرام', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 30,
            question: 'ماذا يقول المحرم عند التلبية؟',
            questionEn: 'What does Muhrim say in Talbiyah?',
            options: ['لبيك اللهم لبيك، لبيك لا شريك لك لبيك...', 'الله أكبر', 'سبحان الله', 'الحمد لله'],
            optionsEn: ['Labbayk Allahumma Labbayk...', 'Allahu Akbar', 'Subhan Allah', 'Alhamdulillah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 31,
            question: 'ما هو الرمل في الطواف؟',
            questionEn: 'What is Ramal in Tawaf?',
            options: ['الإسراع في المشي مع تقارب الخطى في الأشواط الثلاثة الأولى', 'الجري السريع', 'المشي ببطء', 'القفز'],
            optionsEn: ['Walking fast with short steps in first 3 rounds', 'Running fast', 'Walking slowly', 'Jumping'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 32,
            question: 'ما هو الاضطباع؟',
            questionEn: 'What is Idtiba?',
            options: ['كشف الكتف الأيمن في طواف القدوم', 'تغطية الرأس', 'لبس المخيط', 'كشف الكتف الأيسر'],
            optionsEn: ['Uncovering right shoulder in Tawaf al-Qudum', 'Covering head', 'Wearing stitched', 'Uncovering left shoulder'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 33,
            question: 'ما حكم صلاة ركعتين بعد الطواف؟',
            questionEn: 'Ruling on 2 Rak\'ahs after Tawaf?',
            options: ['سنة مؤكدة', 'واجب', 'ركن', 'مباح'],
            optionsEn: ['Confirmed Sunnah', 'Obligatory', 'Pillar', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 34,
            question: 'أين تصلى ركعتا الطواف؟',
            questionEn: 'Where are Tawaf Rak\'ahs prayed?',
            options: ['خلف مقام إبراهيم إن تيسر', 'داخل الكعبة', 'في الحجر', 'خارج المسجد'],
            optionsEn: ['Behind Maqam Ibrahim if possible', 'Inside Kaaba', 'In Hijr', 'Outside Mosque'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 35,
            question: 'ما هو الحجر الأسود؟',
            questionEn: 'What is the Black Stone?',
            options: ['حجر من الجنة في ركن الكعبة', 'حجر عادي', 'حجر من الذهب', 'حجر من الفضة'],
            optionsEn: ['Stone from Paradise in Kaaba corner', 'Normal stone', 'Gold stone', 'Silver stone'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 36,
            question: 'ماذا يفعل الحاج عند الحجر الأسود؟',
            questionEn: 'What does pilgrim do at Black Stone?',
            options: ['يستلمه ويقبله إن استطاع أو يشير إليه', 'يغسله', 'يجلس عليه', 'يأخذ منه قطعة'],
            optionsEn: ['Touch/Kiss if able or point to it', 'Wash it', 'Sit on it', 'Take a piece'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 37,
            question: 'ما هو الركن اليماني؟',
            questionEn: 'What is the Yamani Corner?',
            options: ['الركن الذي يسبق الحجر الأسود', 'الركن الذي فيه الحجر', 'باب الكعبة', 'مقام إبراهيم'],
            optionsEn: ['Corner before Black Stone', 'Corner with Stone', 'Kaaba Door', 'Maqam Ibrahim'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 38,
            question: 'ماذا يقال بين الركن اليماني والحجر الأسود؟',
            questionEn: 'What is said between Yamani Corner and Black Stone?',
            options: ['ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار', 'الله أكبر', 'لبيك اللهم لبيك', 'الفاتحة'],
            optionsEn: ['Rabbana atina fid-dunya hasanah...', 'Allahu Akbar', 'Labbayk...', 'Al-Fatiha'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 39,
            question: 'ما هو الصفا والمروة؟',
            questionEn: 'What are Safa and Marwa?',
            options: ['جبلان صغيران يسعى بينهما الحجاج', 'مسجدان', 'بئران', 'مدينتان'],
            optionsEn: ['Two small hills pilgrims walk between', 'Two mosques', 'Two wells', 'Two cities'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 40,
            question: 'من هي التي سعت بين الصفا والمروة أول مرة؟',
            questionEn: 'Who ran between Safa and Marwa first?',
            options: ['هاجر عليها السلام', 'سارة عليها السلام', 'مريم عليها السلام', 'آسية عليها السلام'],
            optionsEn: ['Hajar (AS)', 'Sarah (AS)', 'Maryam (AS)', 'Asiya (AS)'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 41,
            question: 'ما هو بئر زمزم؟',
            questionEn: 'What is Zamzam Well?',
            options: ['بئر مبارك فجره الله لإسماعيل وأمه', 'بئر عادي', 'نهر', 'بحيرة'],
            optionsEn: ['Blessed well Allah gushed for Ismail & mom', 'Normal well', 'River', 'Lake'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 42,
            question: 'ما حكم شرب ماء زمزم؟',
            questionEn: 'Ruling on drinking Zamzam?',
            options: ['سنة ومستحب وفيه شفاء', 'واجب', 'مكروه', 'مباح فقط'],
            optionsEn: ['Sunnah, recommended, healing', 'Obligatory', 'Disliked', 'Just permissible'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 43,
            question: 'ما هو الحلق أو التقصير؟',
            questionEn: 'What is Shaving (Halq) or Trimming (Taqsir)?',
            options: ['واجب للتحلل من الإحرام', 'سنة', 'مستحب', 'مكروه'],
            optionsEn: ['Obligatory to exit Ihram', 'Sunnah', 'Recommended', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 44,
            question: 'أيهما أفضل للرجال: الحلق أم التقصير؟',
            questionEn: 'Which is better for men: Shaving or Trimming?',
            options: ['الحلق أفضل (دعا له النبي 3 مرات)', 'التقصير أفضل', 'سواء', 'التقصير في العمرة والحلق في الحج'],
            optionsEn: ['Shaving (Prophet prayed for it 3x)', 'Trimming', 'Equal', 'Trimming in Umrah, Shaving in Hajj'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 45,
            question: 'ما حكم الحلق للنساء؟',
            questionEn: 'Ruling on shaving for women?',
            options: ['حرام (تقصر فقط)', 'مستحب', 'واجب', 'مكروه'],
            optionsEn: ['Forbidden (trim only)', 'Recommended', 'Obligatory', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 46,
            question: 'كم تأخذ المرأة من شعرها؟',
            questionEn: 'How much does a woman cut from her hair?',
            options: ['قدر أنملة (رأس الأصبع)', 'النصف', 'الكل', 'الربع'],
            optionsEn: ['Fingertip length', 'Half', 'All', 'Quarter'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 47,
            question: 'ما حكم الطيب للمحرم؟',
            questionEn: 'Ruling on perfume for Muhrim?',
            options: ['حرام', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 48,
            question: 'ما حكم تغطية الرأس للرجل المحرم؟',
            questionEn: 'Ruling on covering head for male Muhrim?',
            options: ['حرام (بملاصق كالطاقية)', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden (with fitted cap etc)', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 49,
            question: 'ما حكم لبس المخيط للرجل المحرم؟',
            questionEn: 'Ruling on stitched clothes for male Muhrim?',
            options: ['حرام', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 50,
            question: 'ما حكم قص الأظافر للمحرم؟',
            questionEn: 'Ruling on cutting nails for Muhrim?',
            options: ['حرام', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 51,
            question: 'ما حكم عقد النكاح للمحرم؟',
            questionEn: 'Ruling on marriage contract for Muhrim?',
            options: ['باطل وحرام', 'صحيح ومكروه', 'صحيح', 'مستحب'],
            optionsEn: ['Invalid and Forbidden', 'Valid but Disliked', 'Valid', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 52,
            question: 'ما هي الفدية لمن ارتكب محظوراً (غير الجماع والصيد)؟',
            questionEn: 'Expiation for prohibition (except intercourse/hunting)?',
            options: ['صيام 3 أيام أو إطعام 6 مساكين أو ذبح شاة', 'صيام شهرين', 'عتق رقبة', 'لا شيء'],
            optionsEn: ['Fast 3 days OR feed 6 poor OR sheep', 'Fast 2 months', 'Free slave', 'Nothing'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 53,
            question: 'ما حكم من مات ولم يحج وهو مستطيع؟',
            questionEn: 'Ruling on dying without Hajj while capable?',
            options: ['يحج عنه من تركته', 'يسقط عنه', 'يأثم ولا يحج عنه', 'يتصدق عنه'],
            optionsEn: ['Hajj performed from his estate', 'Dropped', 'Sins, no Hajj', 'Charity instead'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 54,
            question: 'هل يجوز الحج عن الغير؟',
            questionEn: 'Is Hajj on behalf of others permissible?',
            options: ['نعم بشرط أن يكون قد حج عن نفسه', 'لا', 'نعم مطلقاً', 'نعم للأقارب فقط'],
            optionsEn: ['Yes, if performed for self first', 'No', 'Yes absolutely', 'Yes for relatives only'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 55,
            question: 'ما هو مسجد الخيف؟',
            questionEn: 'What is Al-Khaif Mosque?',
            options: ['مسجد في منى صلى فيه 70 نبياً', 'مسجد في عرفة', 'مسجد في مزدلفة', 'مسجد في المدينة'],
            optionsEn: ['Mosque in Mina where 70 Prophets prayed', 'Mosque in Arafah', 'Mosque in Muzdalifah', 'Mosque in Madinah'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 56,
            question: 'ما هو مسجد نمرة؟',
            questionEn: 'What is Namirah Mosque?',
            options: ['مسجد بعرفة يخطب فيه الإمام', 'مسجد بمنى', 'مسجد بمزدلفة', 'مسجد بمكة'],
            optionsEn: ['Mosque in Arafah for sermon', 'Mosque in Mina', 'Mosque in Muzdalifah', 'Mosque in Makkah'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 57,
            question: 'ما حكم صلاة العيد للحاج؟',
            questionEn: 'Ruling on Eid prayer for pilgrims?',
            options: ['لا تشرع لهم', 'واجبة', 'سنة', 'مستحبة'],
            optionsEn: ['Not prescribed for them', 'Obligatory', 'Sunnah', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 58,
            question: 'ما حكم الأضحية للحاج؟',
            questionEn: 'Ruling on Udhiyah (sacrifice) for pilgrims?',
            options: ['الهدي يغني عنها', 'واجبة', 'سنة', 'مكروهة'],
            optionsEn: ['Hady suffices', 'Obligatory', 'Sunnah', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 59,
            question: 'ما هو طواف القدوم؟',
            questionEn: 'What is Tawaf al-Qudum?',
            options: ['طواف تحية البيت عند الوصول (للمفرد والقارن)', 'طواف الوداع', 'طواف الإفاضة', 'طواف العمرة'],
            optionsEn: ['Arrival Tawaf (for Ifrad/Qiran)', 'Farewell Tawaf', 'Ifadah Tawaf', 'Umrah Tawaf'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 60,
            question: 'ما حكم طواف القدوم؟',
            questionEn: 'Ruling on Tawaf al-Qudum?',
            options: ['سنة', 'واجب', 'ركن', 'مكروه'],
            optionsEn: ['Sunnah', 'Obligatory', 'Pillar', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 61,
            question: 'ما هو طواف الإفاضة؟',
            questionEn: 'What is Tawaf al-Ifadah?',
            options: ['ركن الحج الذي يكون يوم العيد أو بعده', 'طواف القدوم', 'طواف الوداع', 'طواف التطوع'],
            optionsEn: ['Hajj Pillar on Eid or after', 'Arrival Tawaf', 'Farewell Tawaf', 'Voluntary Tawaf'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 62,
            question: 'ما حكم طواف الإفاضة؟',
            questionEn: 'Ruling on Tawaf al-Ifadah?',
            options: ['ركن لا يصح الحج بدونه', 'واجب', 'سنة', 'مستحب'],
            optionsEn: ['Pillar, Hajj invalid without it', 'Obligatory', 'Sunnah', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 63,
            question: 'متى يبدأ وقت رمي جمرة العقبة؟',
            questionEn: 'When does stoning Jamrat al-Aqaba start?',
            options: ['من منتصف ليلة النحر للضعفة', 'من الظهر', 'من العصر', 'من المغرب'],
            optionsEn: ['From midnight of Nahr for weak', 'From Dhuhr', 'From Asr', 'From Maghrib'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 64,
            question: 'بكم حصاة ترمى كل جمرة؟',
            questionEn: 'How many pebbles for each Jamrah?',
            options: ['7 حصيات', '10 حصيات', '5 حصيات', '3 حصيات'],
            optionsEn: ['7 pebbles', '10 pebbles', '5 pebbles', '3 pebbles'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 65,
            question: 'ما حجم الحصاة؟',
            questionEn: 'Size of the pebble?',
            options: ['مثل حبة الحمص أو البندق', 'كبيرة جداً', 'صغيرة جداً كالرمل', 'بحجم اليد'],
            optionsEn: ['Like chickpea or hazelnut', 'Very big', 'Very small like sand', 'Hand size'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 66,
            question: 'ماذا يقول عند رمي كل حصاة؟',
            questionEn: 'What to say when throwing each pebble?',
            options: ['الله أكبر', 'سبحان الله', 'الحمد لله', 'لا إله إلا الله'],
            optionsEn: ['Allahu Akbar', 'Subhan Allah', 'Alhamdulillah', 'La ilaha illa Allah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 67,
            question: 'هل يجوز الرمي ليلاً أيام التشريق؟',
            questionEn: 'Is stoning at night permissible in Tashreeq days?',
            options: ['نعم عند الحاجة', 'لا', 'مكروه', 'حرام'],
            optionsEn: ['Yes if needed', 'No', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 68,
            question: 'من لم يجد الهدي فماذا يفعل؟',
            questionEn: 'Who cannot afford Hady, what to do?',
            options: ['يصوم 3 أيام في الحج و7 إذا رجع', 'يصوم 10 أيام في الحج', 'يصوم شهر', 'لا شيء عليه'],
            optionsEn: ['Fast 3 days in Hajj & 7 when returned', 'Fast 10 days in Hajj', 'Fast a month', 'Nothing'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 69,
            question: 'ما حكم زيارة المسجد النبوي؟',
            questionEn: 'Ruling on visiting Prophet\'s Mosque?',
            options: ['سنة مؤكدة ليست من أعمال الحج', 'واجبة', 'ركن من الحج', 'شرط للصحة'],
            optionsEn: ['Confirmed Sunnah, not part of Hajj', 'Obligatory', 'Hajj Pillar', 'Condition for validity'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 70,
            question: 'ما فضل الصلاة في المسجد الحرام؟',
            questionEn: 'Reward of prayer in Masjid al-Haram?',
            options: ['بـ 100,000 صلاة', 'بـ 1,000 صلاة', 'بـ 500 صلاة', 'بـ 50 صلاة'],
            optionsEn: ['100,000 prayers', '1,000 prayers', '500 prayers', '50 prayers'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 71,
            question: 'ما فضل الصلاة في المسجد النبوي؟',
            questionEn: 'Reward of prayer in Prophet\'s Mosque?',
            options: ['بـ 1,000 صلاة', 'بـ 100,000 صلاة', 'بـ 500 صلاة', 'بـ 100 صلاة'],
            optionsEn: ['1,000 prayers', '100,000 prayers', '500 prayers', '100 prayers'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 72,
            question: 'ما هي الروضة الشريفة؟',
            questionEn: 'What is Rawdah Sharifah?',
            options: ['مكان بين بيت النبي ومنبره (روضة من رياض الجنة)', 'قبر النبي', 'ساحة المسجد', 'مكان الوضوء'],
            optionsEn: ['Area between Prophet\'s house & pulpit', 'Prophet\'s Grave', 'Mosque courtyard', 'Wudu area'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 73,
            question: 'ما حكم زيارة قبر النبي صلى الله عليه وسلم؟',
            questionEn: 'Ruling on visiting Prophet\'s grave?',
            options: ['مشروعة للرجال', 'واجبة', 'حرام', 'مكروهة'],
            optionsEn: ['Legitimate for men', 'Obligatory', 'Forbidden', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 74,
            question: 'ماذا يقول الزائر عند قبر النبي؟',
            questionEn: 'What does visitor say at Prophet\'s grave?',
            options: ['السلام عليك يا رسول الله...', 'يدعوه من دون الله', 'يتمسح بالقبر', 'يطوف به'],
            optionsEn: ['Peace be upon you O Messenger of Allah...', 'Pray to him', 'Touch grave', 'Circle it'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 75,
            question: 'ما حكم زيارة البقيع؟',
            questionEn: 'Ruling on visiting Al-Baqi?',
            options: ['سنة للرجال للدعاء للأموات', 'واجبة', 'حرام', 'مكروهة'],
            optionsEn: ['Sunnah for men to pray for dead', 'Obligatory', 'Forbidden', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        }
    ]
};
