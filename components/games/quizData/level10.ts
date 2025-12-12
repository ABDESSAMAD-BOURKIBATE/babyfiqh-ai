import { QuizLevel } from '../quizTypes';

export const level10: QuizLevel = {
    id: 10,
    titleAr: 'المستوى العاشر: الصوم ورمضان',
    titleEn: 'Level 10: Fasting & Ramadan',
    description: 'أحكام الصيام وفضل شهر رمضان',
    descriptionEn: 'Fasting rules and virtues of Ramadan',
    requiredScore: 70,
    icon: '🌙',
    questions: [
        {
            id: 1,
            question: 'ما هو الركن الرابع من أركان الإسلام؟',
            questionEn: 'What is the fourth pillar of Islam?',
            options: ['الصوم', 'الصلاة', 'الزكاة', 'الحج'],
            optionsEn: ['Fasting', 'Prayer', 'Zakat', 'Hajj'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 2,
            question: 'في أي شهر يصوم المسلمون؟',
            questionEn: 'In which month do Muslims fast?',
            options: ['رمضان', 'شعبان', 'رجب', 'محرم'],
            optionsEn: ['Ramadan', 'Sha\'ban', 'Rajab', 'Muharram'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 3,
            question: 'ما هو الصوم؟',
            questionEn: 'What is Fasting (Sawm)?',
            options: ['الإمساك عن المفطرات من الفجر إلى الغروب', 'الإمساك عن الطعام فقط', 'الإمساك عن الشراب فقط', 'الإمساك عن الكلام'],
            optionsEn: ['Abstaining from invalidators from dawn to sunset', 'Abstaining from food only', 'Abstaining from drink only', 'Abstaining from speech'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 4,
            question: 'ما هي الليلة التي هي خير من ألف شهر؟',
            questionEn: 'Which night is better than a thousand months?',
            options: ['ليلة القدر', 'ليلة النصف من شعبان', 'ليلة العيد', 'ليلة الجمعة'],
            optionsEn: ['Laylat al-Qadr', 'Mid-Sha\'ban Night', 'Eid Night', 'Friday Night'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 5,
            question: 'في أي عشر من رمضان تكون ليلة القدر؟',
            questionEn: 'In which ten days of Ramadan is Laylat al-Qadr?',
            options: ['العشر الأواخر', 'العشر الأوائل', 'العشر الأوسط', 'أول يوم'],
            optionsEn: ['The last ten days', 'The first ten days', 'The middle ten days', 'The first day'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 6,
            question: 'ما حكم صيام رمضان؟',
            questionEn: 'What is the ruling of fasting Ramadan?',
            options: ['واجب (فرض)', 'سنة', 'مستحب', 'مباح'],
            optionsEn: ['Obligatory (Fard)', 'Sunnah', 'Recommended', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 7,
            question: 'ماذا يسمى الطعام الذي نأكله قبل الفجر في رمضان؟',
            questionEn: 'What is the meal eaten before dawn in Ramadan called?',
            options: ['السحور', 'الإفطار', 'الغداء', 'العشاء'],
            optionsEn: ['Suhoor', 'Iftar', 'Lunch', 'Dinner'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 8,
            question: 'ماذا يسمى الطعام الذي نأكله عند غروب الشمس في رمضان؟',
            questionEn: 'What is the meal eaten at sunset in Ramadan called?',
            options: ['الإفطار', 'السحور', 'الغداء', 'العشاء'],
            optionsEn: ['Iftar', 'Suhoor', 'Lunch', 'Dinner'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 9,
            question: 'ما هو الدعاء المستحب عند الإفطار؟',
            questionEn: 'What is the recommended Dua at Iftar?',
            options: ['ذهب الظمأ وابتلت العروق وثبت الأجر إن شاء الله', 'اللهم إني صائم', 'سبحان الله وبحمده', 'الحمد لله رب العالمين'],
            optionsEn: ['The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills', 'O Allah, I am fasting', 'Glory be to Allah and His praise', 'Praise be to Allah, Lord of the worlds'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 10,
            question: 'ما هي الصلاة الخاصة التي تصلى في ليالي رمضان؟',
            questionEn: 'What is the special prayer performed in the nights of Ramadan?',
            options: ['التراويح', 'الضحى', 'الاستخارة', 'الكسوف'],
            optionsEn: ['Taraweeh', 'Duha', 'Istikhara', 'Eclipse'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 11,
            question: 'متى فرض الصيام على المسلمين؟',
            questionEn: 'When was fasting made obligatory for Muslims?',
            options: ['في السنة الثانية للهجرة', 'في السنة الأولى للهجرة', 'في السنة الخامسة للهجرة', 'في مكة'],
            optionsEn: ['2nd year of Hijrah', '1st year of Hijrah', '5th year of Hijrah', 'In Makkah'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 12,
            question: 'ما حكم من أكل أو شرب ناسياً في نهار رمضان؟',
            questionEn: 'What is the ruling for someone who eats or drinks forgetfully during Ramadan day?',
            options: ['صيامه صحيح ويكمل صومه', 'يفطر وعليه القضاء', 'يفطر وعليه الكفارة', 'صيامه باطل'],
            optionsEn: ['Fasting is valid, continue fasting', 'Breaks fast, must make up', 'Breaks fast, must pay expiation', 'Fasting is invalid'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 13,
            question: 'ما هي زكاة الفطر؟',
            questionEn: 'What is Zakat al-Fitr?',
            options: ['صدقة واجبة تخرج قبل صلاة العيد', 'صدقة تطوعية', 'زكاة المال', 'ذبح الأضحية'],
            optionsEn: ['Obligatory charity given before Eid prayer', 'Voluntary charity', 'Wealth Zakat', 'Sacrificing an animal'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 14,
            question: 'على من تجب زكاة الفطر؟',
            questionEn: 'Upon whom is Zakat al-Fitr obligatory?',
            options: ['على كل مسلم يملك قوت يومه', 'على الأغنياء فقط', 'على الكبار فقط', 'على الرجال فقط'],
            optionsEn: ['Every Muslim who has food for the day', 'Only the rich', 'Only adults', 'Only men'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 15,
            question: 'ما هو باب الجنة الذي يدخل منه الصائمون؟',
            questionEn: 'What is the gate of Paradise for those who fast?',
            options: ['الريان', 'الجهاد', 'الصدقة', 'الصلاة'],
            optionsEn: ['Ar-Rayyan', 'Jihad', 'Charity', 'Prayer'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 16,
            question: 'ما معنى "رمضان" لغوياً؟',
            questionEn: 'What does "Ramadan" mean linguistically?',
            options: ['شدة الحر', 'المطر', 'الربيع', 'الخريف'],
            optionsEn: ['Intense heat', 'Rain', 'Spring', 'Autumn'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 17,
            question: 'ما هي كفارة الجماع في نهار رمضان؟',
            questionEn: 'What is the expiation (Kaffarah) for intercourse during Ramadan day?',
            options: ['عتق رقبة، فإن لم يجد فصيام شهرين متتابعين، فإن لم يستطع فإطعام 60 مسكيناً', 'إطعام 10 مساكين', 'صيام 3 أيام', 'لا شيء عليه'],
            optionsEn: ['Free a slave, or fast 2 consecutive months, or feed 60 poor people', 'Feed 10 poor people', 'Fast 3 days', 'Nothing'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 18,
            question: 'هل القيء المتعمد يفطر؟',
            questionEn: 'Does intentional vomiting break the fast?',
            options: ['نعم', 'لا', 'مكروه فقط', 'حسب الكمية'],
            optionsEn: ['Yes', 'No', 'Only disliked', 'Depends on amount'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 19,
            question: 'هل القيء غير المتعمد يفطر؟',
            questionEn: 'Does unintentional vomiting break the fast?',
            options: ['لا', 'نعم', 'نعم ويجب القضاء', 'نعم ويجب الكفارة'],
            optionsEn: ['No', 'Yes', 'Yes and must make up', 'Yes and must pay expiation'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 20,
            question: 'ما حكم استخدام السواك للصائم؟',
            questionEn: 'What is the ruling on using Siwak for the fasting person?',
            options: ['مستحب', 'مكروه', 'حرام', 'يفطر'],
            optionsEn: ['Recommended', 'Disliked', 'Forbidden', 'Breaks fast'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 21,
            question: 'ما حكم قطرة العين للصائم؟',
            questionEn: 'What is the ruling on eye drops for the fasting person?',
            options: ['لا تفطر', 'تفطر', 'مكروهة', 'حرام'],
            optionsEn: ['Does not break fast', 'Breaks fast', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 22,
            question: 'ما حكم الإبر المغذية للصائم؟',
            questionEn: 'What is the ruling on nutrient injections for the fasting person?',
            options: ['تفطر', 'لا تفطر', 'مكروهة', 'مباحة'],
            optionsEn: ['Breaks fast', 'Does not break fast', 'Disliked', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 23,
            question: 'ما حكم الإبر غير المغذية (مثل البنسلين) للصائم؟',
            questionEn: 'What is the ruling on non-nutrient injections (like Penicillin) for the fasting person?',
            options: ['لا تفطر', 'تفطر', 'مكروهة', 'حرام'],
            optionsEn: ['Does not break fast', 'Breaks fast', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 24,
            question: 'ما هو الاعتكاف؟',
            questionEn: 'What is I\'tikaf?',
            options: ['لزوم المسجد لطاعة الله', 'الصيام في البيت', 'قراءة القرآن', 'الصدقة'],
            optionsEn: ['Staying in the mosque to worship Allah', 'Fasting at home', 'Reading Quran', 'Charity'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 25,
            question: 'متى يستحب الاعتكاف؟',
            questionEn: 'When is I\'tikaf recommended?',
            options: ['في العشر الأواخر من رمضان', 'في أول رمضان', 'في شعبان', 'في العيد'],
            optionsEn: ['Last ten days of Ramadan', 'Beginning of Ramadan', 'In Sha\'ban', 'In Eid'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 26,
            question: 'ما هو يوم الشك؟',
            questionEn: 'What is the Day of Doubt?',
            options: ['يوم 30 شعبان إذا لم ير الهلال', 'يوم 29 رمضان', 'يوم العيد', 'يوم الجمعة'],
            optionsEn: ['30th of Sha\'ban if moon not sighted', '29th of Ramadan', 'Eid day', 'Friday'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 27,
            question: 'ما حكم صيام يوم الشك؟',
            questionEn: 'What is the ruling on fasting the Day of Doubt?',
            options: ['منهي عنه إلا لعادة', 'واجب', 'مستحب', 'مباح'],
            optionsEn: ['Prohibited unless habitual', 'Obligatory', 'Recommended', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 28,
            question: 'ما هو صيام الست من شوال؟',
            questionEn: 'What is fasting the six days of Shawwal?',
            options: ['سنة مؤكدة', 'واجب', 'مكروه', 'بدعة'],
            optionsEn: ['Confirmed Sunnah', 'Obligatory', 'Disliked', 'Innovation'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 29,
            question: 'ما فضل صيام رمضان وإتباعه بست من شوال؟',
            questionEn: 'What is the reward of fasting Ramadan followed by six of Shawwal?',
            options: ['كصيام الدهر', 'كصيام شهرين', 'كصيام سنة', 'كصيام أسبوع'],
            optionsEn: ['Like fasting a lifetime', 'Like fasting two months', 'Like fasting a year', 'Like fasting a week'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 30,
            question: 'ما هو صيام يوم عرفة؟',
            questionEn: 'What is fasting the Day of Arafah?',
            options: ['يكفر السنة الماضية والباقية', 'يكفر السنة الماضية فقط', 'يكفر كبائر الذنوب', 'واجب على الحاج'],
            optionsEn: ['Expiates previous and coming year', 'Expiates previous year only', 'Expiates major sins', 'Obligatory for pilgrims'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 31,
            question: 'ما هو صيام يوم عاشوراء؟',
            questionEn: 'What is fasting the Day of Ashura?',
            options: ['يكفر السنة الماضية', 'يكفر السنة الباقية', 'واجب', 'مكروه'],
            optionsEn: ['Expiates previous year', 'Expiates coming year', 'Obligatory', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 32,
            question: 'متى يكون يوم عاشوراء؟',
            questionEn: 'When is the Day of Ashura?',
            options: ['10 محرم', '9 محرم', '10 رمضان', '10 ذو الحجة'],
            optionsEn: ['10th of Muharram', '9th of Muharram', '10th of Ramadan', '10th of Dhul-Hijjah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 33,
            question: 'ما هي الأيام البيض؟',
            questionEn: 'What are the White Days (Al-Ayyam Al-Beed)?',
            options: ['13، 14، 15 من كل شهر هجري', '1، 2، 3 من كل شهر', 'آخر 3 أيام من الشهر', 'أيام الجمعة'],
            optionsEn: ['13, 14, 15 of Hijri month', '1, 2, 3 of month', 'Last 3 days of month', 'Fridays'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 34,
            question: 'ما حكم صيام الأيام البيض؟',
            questionEn: 'What is the ruling on fasting the White Days?',
            options: ['سنة مستحبة', 'واجب', 'مكروه', 'بدعة'],
            optionsEn: ['Recommended Sunnah', 'Obligatory', 'Disliked', 'Innovation'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 35,
            question: 'ما حكم صيام يوم الجمعة منفرداً؟',
            questionEn: 'What is the ruling on fasting Friday alone?',
            options: ['مكروه إلا أن يوافق عادة', 'مستحب', 'حرام', 'واجب'],
            optionsEn: ['Disliked unless habitual', 'Recommended', 'Forbidden', 'Obligatory'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 36,
            question: 'ما حكم صيام يومي العيد؟',
            questionEn: 'What is the ruling on fasting the two days of Eid?',
            options: ['حرام', 'مكروه', 'مباح', 'مستحب'],
            optionsEn: ['Forbidden', 'Disliked', 'Permissible', 'Recommended'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 37,
            question: 'ما حكم صيام أيام التشريق؟',
            questionEn: 'What is the ruling on fasting the Days of Tashreeq?',
            options: ['حرام إلا للمتمتع الذي لم يجد الهدي', 'مستحب', 'مباح', 'مكروه'],
            optionsEn: ['Forbidden except for Tamattu pilgrim without hady', 'Recommended', 'Permissible', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 38,
            question: 'ما هي أيام التشريق؟',
            questionEn: 'What are the Days of Tashreeq?',
            options: ['11، 12، 13 ذو الحجة', '1، 2، 3 ذو الحجة', 'العشر الأواخر من رمضان', 'أيام العيد'],
            optionsEn: ['11, 12, 13 of Dhul-Hijjah', '1, 2, 3 of Dhul-Hijjah', 'Last ten of Ramadan', 'Eid days'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 39,
            question: 'ما هو الصيام الواجب غير رمضان؟',
            questionEn: 'What is obligatory fasting other than Ramadan?',
            options: ['صيام الكفارات والنذور والقضاء', 'صيام الاثنين والخميس', 'صيام عاشوراء', 'صيام شعبان'],
            optionsEn: ['Expiations, Vows, and Make-up', 'Mondays and Thursdays', 'Ashura', 'Sha\'ban'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 40,
            question: 'ما حكم من مات وعليه صيام؟',
            questionEn: 'What is the ruling for someone who dies owing fasts?',
            options: ['يصوم عنه وليه', 'يطعم عنه وليه', 'يسقط عنه', 'لا شيء عليه'],
            optionsEn: ['His guardian fasts for him', 'His guardian feeds for him', 'It is dropped', 'Nothing'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 41,
            question: 'ما حكم الحامل والمرضع إذا خافتا على نفسيهما أو ولديهما؟',
            questionEn: 'What is the ruling for pregnant/nursing women fearing for themselves/child?',
            options: ['تفطران وتقضيان', 'تفطران وتطعمان', 'تفطران ولا شيء عليهما', 'يجب عليهما الصوم'],
            optionsEn: ['Break fast and make up', 'Break fast and feed', 'Break fast and nothing', 'Must fast'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 42,
            question: 'ما حكم الشيخ الكبير الذي لا يطيق الصيام؟',
            questionEn: 'What is the ruling for an old person unable to fast?',
            options: ['يفطر ويطعم عن كل يوم مسكيناً', 'يفطر ويقضي', 'يفطر ولا شيء عليه', 'يجب عليه الصوم'],
            optionsEn: ['Breaks fast and feeds a poor person daily', 'Breaks fast and makes up', 'Breaks fast and nothing', 'Must fast'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 43,
            question: 'ما مقدار الفدية لمن لا يستطيع الصوم؟',
            questionEn: 'What is the amount of Fidyah for those unable to fast?',
            options: ['إطعام مسكين عن كل يوم (نصف صاع)', 'إطعام 10 مساكين', 'صيام يوم مكانه', 'دينار ذهبي'],
            optionsEn: ['Feed a poor person daily (half Sa\')', 'Feed 10 poor people', 'Fast a day instead', 'Gold Dinar'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 44,
            question: 'ما حكم المسافر في رمضان؟',
            questionEn: 'What is the ruling for a traveler in Ramadan?',
            options: ['يباح له الفطر والقصر', 'يجب عليه الفطر', 'يجب عليه الصوم', 'يكره له الفطر'],
            optionsEn: ['Permissible to break fast and shorten prayer', 'Must break fast', 'Must fast', 'Disliked to break fast'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 45,
            question: 'ما هي المسافة التي تبيح الفطر للمسافر؟',
            questionEn: 'What is the distance that permits breaking fast for a traveler?',
            options: ['حوالي 80 كم (مسيرة يوم وليلة قديماً)', '20 كم', '50 كم', '100 كم'],
            optionsEn: ['Approx 80 km', '20 km', '50 km', '100 km'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 46,
            question: 'هل يجوز تقديم السحور؟',
            questionEn: 'Is it permissible to hasten Suhoor?',
            options: ['السنة تأخيره', 'نعم', 'مكروه', 'حرام'],
            optionsEn: ['Sunnah is to delay it', 'Yes', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 47,
            question: 'هل يجوز تأخير الإفطار؟',
            questionEn: 'Is it permissible to delay Iftar?',
            options: ['السنة تعجيله', 'نعم', 'مستحب', 'واجب'],
            optionsEn: ['Sunnah is to hasten it', 'Yes', 'Recommended', 'Obligatory'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 48,
            question: 'بماذا يستحب أن يفطر الصائم؟',
            questionEn: 'With what is it recommended to break the fast?',
            options: ['رطب، فإن لم يجد فتمر، فإن لم يجد فماء', 'ماء فقط', 'عصير', 'خبز'],
            optionsEn: ['Fresh dates, else dry dates, else water', 'Water only', 'Juice', 'Bread'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 49,
            question: 'ما حكم من شتم الصائم؟',
            questionEn: 'What should a fasting person do if insulted?',
            options: ['يقول: إني صائم', 'يرد الشتيمة', 'يضربه', 'يسكت'],
            optionsEn: ['Say: I am fasting', 'Return insult', 'Hit him', 'Stay silent'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 50,
            question: 'ما حكم الغيبة والنميمة للصائم؟',
            questionEn: 'What is the ruling on backbiting and gossip for the fasting person?',
            options: ['تنقص أجر الصوم وقد تذهبه', 'تفطر', 'مباحة', 'لا تؤثر'],
            optionsEn: ['Decreases or nullifies reward', 'Breaks fast', 'Permissible', 'No effect'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 51,
            question: 'هل يجوز للصائم أن يغتسل للتبرد؟',
            questionEn: 'Is it permissible for a fasting person to bathe for cooling?',
            options: ['نعم', 'لا', 'مكروه', 'يفطر'],
            optionsEn: ['Yes', 'No', 'Disliked', 'Breaks fast'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 52,
            question: 'هل يجوز للصائم تذوق الطعام دون بلعه؟',
            questionEn: 'Is it permissible to taste food without swallowing?',
            options: ['نعم للحاجة مع الكراهة', 'لا', 'يفطر', 'حرام'],
            optionsEn: ['Yes for need, disliked', 'No', 'Breaks fast', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 53,
            question: 'ما حكم بلع الريق للصائم؟',
            questionEn: 'What is the ruling on swallowing saliva?',
            options: ['جائز', 'يفطر', 'مكروه', 'حرام'],
            optionsEn: ['Permissible', 'Breaks fast', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 54,
            question: 'ما حكم بلع النخامة للصائم؟',
            questionEn: 'What is the ruling on swallowing phlegm?',
            options: ['يفطر عند الجمهور إذا وصلت للفم', 'جائز', 'مكروه', 'لا يفطر'],
            optionsEn: ['Breaks fast (majority) if reaches mouth', 'Permissible', 'Disliked', 'Does not break fast'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 55,
            question: 'هل الحجامة تفطر؟',
            questionEn: 'Does Cupping (Hijama) break the fast?',
            options: ['خلاف، والأحوط تجنبها', 'نعم تفطر', 'لا تفطر', 'مكروهة'],
            optionsEn: ['Disputed, better to avoid', 'Yes', 'No', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 56,
            question: 'ما حكم من أصبح جنباً وهو صائم؟',
            questionEn: 'Ruling on waking up in Janabah while fasting?',
            options: ['صومه صحيح ويغتسل', 'صومه باطل', 'يقضي', 'يكفر'],
            optionsEn: ['Valid, perform Ghusl', 'Invalid', 'Make up', 'Expiate'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 57,
            question: 'هل يجوز للصائم تقبيل زوجته؟',
            questionEn: 'Is kissing wife permissible while fasting?',
            options: ['نعم إذا ملك نفسه', 'لا', 'حرام', 'يفطر'],
            optionsEn: ['Yes if controls desires', 'No', 'Forbidden', 'Breaks fast'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 58,
            question: 'ما هو الوصال في الصوم؟',
            questionEn: 'What is Wisal (continuous fasting)?',
            options: ['صوم يومين أو أكثر دون إفطار', 'صوم الدهر', 'صوم رمضان', 'صوم النفل'],
            optionsEn: ['Fasting 2+ days without breaking', 'Lifetime fasting', 'Ramadan fasting', 'Voluntary fasting'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 59,
            question: 'ما حكم الوصال؟',
            questionEn: 'What is the ruling on Wisal?',
            options: ['مكروه أو محرم', 'مستحب', 'واجب', 'مباح'],
            optionsEn: ['Disliked or Forbidden', 'Recommended', 'Obligatory', 'Permissible'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 60,
            question: 'ما هي ليلة الجهني؟',
            questionEn: 'What is Laylat al-Juhani?',
            options: ['ليلة 23 من رمضان', 'ليلة 27', 'ليلة 21', 'ليلة 25'],
            optionsEn: ['Night of 23rd Ramadan', 'Night of 27th', 'Night of 21st', 'Night of 25th'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 61,
            question: 'كم مرة ذكر شهر رمضان في القرآن؟',
            questionEn: 'How many times is Ramadan mentioned in Quran?',
            options: ['مرة واحدة', 'مرتان', '3 مرات', '5 مرات'],
            optionsEn: ['Once', 'Twice', '3 times', '5 times'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 62,
            question: 'في أي سورة ذكر شهر رمضان؟',
            questionEn: 'In which Surah is Ramadan mentioned?',
            options: ['البقرة', 'آل عمران', 'القدر', 'الدخان'],
            optionsEn: ['Al-Baqarah', 'Ali Imran', 'Al-Qadr', 'Ad-Dukhan'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 63,
            question: 'ما هي الآية التي فرض فيها الصيام؟',
            questionEn: 'Which verse mandated fasting?',
            options: ['يا أيها الذين آمنوا كتب عليكم الصيام...', 'شهر رمضان الذي أنزل فيه القرآن', 'إنا أنزلناه في ليلة القدر', 'وكلوا واشربوا حتى يتبين لكم...'],
            optionsEn: ['O you who believe, fasting is prescribed...', 'Ramadan is the month...', 'We revealed it in Night of Decree', 'Eat and drink until...'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 64,
            question: 'ما معنى "تصفد الشياطين"؟',
            questionEn: 'What means "Devils are chained"?',
            options: ['تقيد بالسلاسل', 'تقتل', 'تطرد', 'تنام'],
            optionsEn: ['Chained up', 'Killed', 'Expelled', 'Sleep'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 65,
            question: 'ماذا يحدث لأبواب الجنة في رمضان؟',
            questionEn: 'What happens to gates of Paradise in Ramadan?',
            options: ['تفتح', 'تغلق', 'تزين', 'لا تتغير'],
            optionsEn: ['Opened', 'Closed', 'Decorated', 'No change'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 66,
            question: 'ماذا يحدث لأبواب النار في رمضان؟',
            questionEn: 'What happens to gates of Hell in Ramadan?',
            options: ['تغلق', 'تفتح', 'تضيق', 'لا تتغير'],
            optionsEn: ['Closed', 'Opened', 'Narrowed', 'No change'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 67,
            question: 'من هو الصحابي الذي كان يكثر من الصيام؟',
            questionEn: 'Which companion fasted frequently?',
            options: ['عبد الله بن عمرو بن العاص', 'أبو بكر', 'عمر', 'عثمان'],
            optionsEn: ['Abdullah ibn Amr', 'Abu Bakr', 'Umar', 'Uthman'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 68,
            question: 'ما هو أفضل الصيام بعد رمضان؟',
            questionEn: 'Best fasting after Ramadan?',
            options: ['شهر الله المحرم', 'شعبان', 'رجب', 'شوال'],
            optionsEn: ['Muharram', 'Sha\'ban', 'Rajab', 'Shawwal'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 69,
            question: 'ما هو صيام داود عليه السلام؟',
            questionEn: 'What is the fasting of Dawud (AS)?',
            options: ['صيام يوم وإفطار يوم', 'صيام الدهر', 'صيام الاثنين والخميس', 'صيام البيض'],
            optionsEn: ['Fast one day, eat one day', 'Lifetime', 'Mon & Thu', 'White days'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 70,
            question: 'هل يجوز صيام يوم الجمعة قضاء؟',
            questionEn: 'Can one fast Friday for make-up (Qada)?',
            options: ['نعم', 'لا', 'مكروه', 'حرام'],
            optionsEn: ['Yes', 'No', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 71,
            question: 'ما حكم من أفطر في رمضان متعمداً بجماع؟',
            questionEn: 'Ruling on intentional intercourse during Ramadan day?',
            options: ['عليه القضاء والكفارة المغلظة', 'القضاء فقط', 'التوبة فقط', 'لا شيء'],
            optionsEn: ['Make-up and Major Expiation', 'Make-up only', 'Repentance only', 'Nothing'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 72,
            question: 'هل يجوز استخدام البخاخ للربو للصائم؟',
            questionEn: 'Is asthma inhaler permissible for fasting?',
            options: ['جائز عند كثير من العلماء', 'يفطر', 'حرام', 'مكروه'],
            optionsEn: ['Permissible (many scholars)', 'Breaks fast', 'Forbidden', 'Disliked'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 73,
            question: 'ما حكم تحليل الدم للصائم؟',
            questionEn: 'Blood test ruling for fasting?',
            options: ['لا يفطر', 'يفطر', 'مكروه', 'حرام'],
            optionsEn: ['Does not break fast', 'Breaks fast', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 74,
            question: 'ما حكم خلع الضرس للصائم؟',
            questionEn: 'Tooth extraction ruling for fasting?',
            options: ['لا يفطر إذا لم يبتلع الدم', 'يفطر', 'مكروه', 'حرام'],
            optionsEn: ['Valid if no blood swallowed', 'Breaks fast', 'Disliked', 'Forbidden'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 75,
            question: 'ما حكم السباحة للصائم؟',
            questionEn: 'Swimming ruling for fasting?',
            options: ['جائزة مع التحرز من دخول الماء', 'مكروهة', 'حرام', 'تفطر'],
            optionsEn: ['Permissible with caution', 'Disliked', 'Forbidden', 'Breaks fast'],
            correctAnswer: 0,
            difficulty: 'easy'
        }
    ]
};
