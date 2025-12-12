import { QuizLevel } from '../quizTypes';

export const level3: QuizLevel = {
    id: 3,
    titleAr: 'أساسيات القرآن وقصار السور',
    titleEn: 'Quran Basics & Short Surahs',
    description: 'اختبر معلوماتك في القرآن الكريم والسور القصيرة',
    descriptionEn: 'Test your knowledge of the Holy Quran and short Surahs',
    requiredScore: 70,
    icon: '📖',
    questions: [
        // Quran Basics
        {
            id: 1,
            question: 'كم عدد سور القرآن الكريم؟',
            questionEn: 'How many Surahs are in the Holy Quran?',
            options: ['114', '110', '120', '100'],
            optionsEn: ['114', '110', '120', '100'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'يحتوي القرآن الكريم على 114 سورة.',
            explanationEn: 'The Holy Quran contains 114 Surahs.'
        },
        {
            id: 2,
            question: 'ما هي أول سورة في ترتيب المصحف؟',
            questionEn: 'What is the first Surah in the Quran order?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة الناس', 'سورة الإخلاص'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah An-Nas', 'Surah Al-Ikhlas'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'سورة الفاتحة هي أول سورة في المصحف وتسمى فاتحة الكتاب.',
            explanationEn: 'Surah Al-Fatiha is the first Surah in the Quran, known as The Opening.'
        },
        {
            id: 3,
            question: 'ما هي أطول سورة في القرآن الكريم؟',
            questionEn: 'What is the longest Surah in the Holy Quran?',
            options: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء', 'سورة المائدة'],
            optionsEn: ['Surah Al-Baqarah', 'Surah Ali Imran', 'Surah An-Nisa', 'Surah Al-Maidah'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'سورة البقرة هي أطول سورة في القرآن الكريم وعدد آياتها 286.',
            explanationEn: 'Surah Al-Baqarah is the longest Surah in the Quran with 286 verses.'
        },
        {
            id: 4,
            question: 'ما هي أقصر سورة في القرآن الكريم؟',
            questionEn: 'What is the shortest Surah in the Holy Quran?',
            options: ['سورة الكوثر', 'سورة الإخلاص', 'سورة العصر', 'سورة النصر'],
            optionsEn: ['Surah Al-Kawthar', 'Surah Al-Ikhlas', 'Surah Al-Asr', 'Surah An-Nasr'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'سورة الكوثر هي أقصر سورة في القرآن الكريم وعدد آياتها 3.',
            explanationEn: 'Surah Al-Kawthar is the shortest Surah in the Quran with only 3 verses.'
        },
        {
            id: 5,
            question: 'ما هي السورة التي تعدل ثلث القرآن؟',
            questionEn: 'Which Surah is equivalent to one-third of the Quran?',
            options: ['سورة الإخلاص', 'سورة الفلق', 'سورة الناس', 'سورة الكافرون'],
            optionsEn: ['Surah Al-Ikhlas', 'Surah Al-Falaq', 'Surah An-Nas', 'Surah Al-Kafirun'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'قال النبي ﷺ أن سورة الإخلاص (قل هو الله أحد) تعدل ثلث القرآن.',
            explanationEn: 'The Prophet ﷺ said that Surah Al-Ikhlas is equivalent to one-third of the Quran.'
        },
        {
            id: 6,
            question: 'كم عدد أجزاء القرآن الكريم؟',
            questionEn: 'How many Juz (parts) are in the Holy Quran?',
            options: ['30', '60', '114', '20'],
            optionsEn: ['30', '60', '114', '20'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'القرآن الكريم مقسم إلى 30 جزءاً.',
            explanationEn: 'The Holy Quran is divided into 30 Juz (parts).'
        },
        {
            id: 7,
            question: 'ما هي السورة التي تسمى "قلب القرآن"؟',
            questionEn: 'Which Surah is called the "Heart of the Quran"?',
            options: ['سورة يس', 'سورة الرحمن', 'سورة الملك', 'سورة الواقعة'],
            optionsEn: ['Surah Yasin', 'Surah Ar-Rahman', 'Surah Al-Mulk', 'Surah Al-Waqiah'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة يس تُعرف بقلب القرآن.',
            explanationEn: 'Surah Yasin is known as the Heart of the Quran.'
        },
        {
            id: 8,
            question: 'ما هي السورة التي لا تبدأ بالبسملة؟',
            questionEn: 'Which Surah does not start with Bismillah?',
            options: ['سورة التوبة', 'سورة الأنفال', 'سورة يونس', 'سورة هود'],
            optionsEn: ['Surah At-Tawbah', 'Surah Al-Anfal', 'Surah Yunus', 'Surah Hud'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة التوبة هي السورة الوحيدة التي لا تبدأ بـ "بسم الله الرحمن الرحيم".',
            explanationEn: 'Surah At-Tawbah is the only Surah that does not begin with Bismillah.'
        },
        {
            id: 9,
            question: 'في أي شهر نزل القرآن الكريم؟',
            questionEn: 'In which month was the Quran revealed?',
            options: ['شهر رمضان', 'شهر رجب', 'شهر شعبان', 'شهر محرم'],
            optionsEn: ['Ramadan', 'Rajab', 'Sha\'ban', 'Muharram'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'نزل القرآن الكريم في شهر رمضان المبارك.',
            explanationEn: 'The Holy Quran was revealed in the blessed month of Ramadan.'
        },
        {
            id: 10,
            question: 'ما هي الليلة التي نزل فيها القرآن؟',
            questionEn: 'In which night was the Quran revealed?',
            options: ['ليلة القدر', 'ليلة النصف من شعبان', 'ليلة الإسراء', 'ليلة العيد'],
            optionsEn: ['Laylat al-Qadr', 'Mid-Sha\'ban Night', 'Isra Night', 'Eid Night'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ.',
            explanationEn: 'Indeed, We sent the Quran down during the Night of Decree (Laylat al-Qadr).'
        },
        // Surah Al-Fatiha
        {
            id: 11,
            question: 'كم عدد آيات سورة الفاتحة؟',
            questionEn: 'How many verses are in Surah Al-Fatiha?',
            options: ['7', '5', '6', '8'],
            optionsEn: ['7', '5', '6', '8'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'سورة الفاتحة تتكون من 7 آيات وتسمى السبع المثاني.',
            explanationEn: 'Surah Al-Fatiha consists of 7 verses.'
        },
        {
            id: 12,
            question: 'ما معنى "مالك يوم الدين"؟',
            questionEn: 'What does "Maliki Yawm-id-Deen" mean?',
            options: ['مالك يوم القيامة', 'مالك الدنيا', 'مالك السماوات', 'مالك الجنة'],
            optionsEn: ['Master of the Day of Judgment', 'Master of the World', 'Master of Heavens', 'Master of Paradise'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'يوم الدين هو يوم القيامة والحساب.',
            explanationEn: 'Yawm-id-Deen refers to the Day of Judgment.'
        },
        {
            id: 13,
            question: 'ما معنى "إياك نعبد"؟',
            questionEn: 'What does "Iyyaka Na\'budu" mean?',
            options: ['نعبدك وحدك', 'نحبك', 'نستعين بك', 'ندعوك'],
            optionsEn: ['You alone we worship', 'We love You', 'We ask You for help', 'We pray to You'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'إياك نعبد تعني نخصك وحدك بالعبادة.',
            explanationEn: '"Iyyaka Na\'budu" means You alone we worship.'
        },
        // Surah Al-Ikhlas
        {
            id: 14,
            question: 'أكمل الآية: "قل هو الله ..."',
            questionEn: 'Complete the verse: "Qul Huwa Allahu ..."',
            options: ['أحد', 'الصمد', 'الواحد', 'الكبير'],
            optionsEn: ['Ahad', 'As-Samad', 'Al-Wahid', 'Al-Kabir'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'الآية الأولى من سورة الإخلاص: "قُلْ هُوَ اللَّهُ أَحَدٌ".',
            explanationEn: 'The first verse of Surah Al-Ikhlas is "Say, He is Allah, [who is] One."'
        },
        {
            id: 15,
            question: 'ما معنى "الله الصمد"؟',
            questionEn: 'What does "Allahu As-Samad" mean?',
            options: ['الذي يحتاجه الجميع ولا يحتاج لأحد', 'القوي', 'الخالق', 'الرحيم'],
            optionsEn: ['The Eternal Refuge (whom all need)', 'The Strong', 'The Creator', 'The Merciful'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'الصمد هو السيد الذي يُقصَد في الحوائج ولا يحتاج إلى أحد.',
            explanationEn: 'As-Samad means the Eternal Refuge whom all creatures need, but He needs no one.'
        },
        {
            id: 16,
            question: 'أكمل الآية: "لم يلد ولم ..."',
            questionEn: 'Complete the verse: "Lam yalid wa lam ..."',
            options: ['يولد', 'يكن', 'يمت', 'ينم'],
            optionsEn: ['Yulad', 'Yakun', 'Yamut', 'Yanam'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'لَمْ يَلِدْ وَلَمْ يُولَدْ.',
            explanationEn: 'He neither begets nor is born.'
        },
        // Surah Al-Falaq
        {
            id: 17,
            question: 'ما معنى "الفلق" في سورة الفلق؟',
            questionEn: 'What does "Al-Falaq" mean in Surah Al-Falaq?',
            options: ['الصبح', 'الليل', 'الشمس', 'القمر'],
            optionsEn: ['The Daybreak', 'The Night', 'The Sun', 'The Moon'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'الفلق يعني الصبح.',
            explanationEn: 'Al-Falaq refers to the Daybreak or Dawn.'
        },
        {
            id: 18,
            question: 'أكمل الآية: "من شر ما ..."',
            questionEn: 'Complete the verse: "Min sharri ma ..."',
            options: ['خلق', 'رزق', 'فعل', 'كتب'],
            optionsEn: ['Khalaq', 'Razaq', 'Fa\'al', 'Katab'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'مِن شَرِّ مَا خَلَقَ.',
            explanationEn: 'From the evil of that which He created.'
        },
        {
            id: 19,
            question: 'ما معنى "غاسق إذا وقب"؟',
            questionEn: 'What does "Ghasiqin idha waqab" mean?',
            options: ['الليل إذا أظلم', 'الشمس إذا غابت', 'القمر إذا ظهر', 'النهار إذا طلع'],
            optionsEn: ['Darkness as it settles', 'Sun as it sets', 'Moon as it appears', 'Day as it rises'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'الغاسق إذا وقب هو الليل إذا دخل ظلامه.',
            explanationEn: 'It refers to the darkness of the night as it spreads.'
        },
        // Surah An-Nas
        {
            id: 20,
            question: 'من هو "الوسواس الخناس"؟',
            questionEn: 'Who is "Al-Waswas Al-Khannas"?',
            options: ['الشيطان', 'الإنسان', 'الجن', 'النفس'],
            optionsEn: ['The Devil (Shaytan)', 'Human', 'Jinn', 'Self'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'الوسواس الخناس هو الشيطان الذي يوسوس ثم يختفي عند ذكر الله.',
            explanationEn: 'It refers to the whisperer (Shaytan) who withdraws when Allah is mentioned.'
        },
        {
            id: 21,
            question: 'أكمل الآية: "من الجنة و ..."',
            questionEn: 'Complete the verse: "Mina al-jinnati wa ..."',
            options: ['الناس', 'الملائكة', 'الحيوان', 'الطير'],
            optionsEn: ['An-Nas', 'Al-Malaika', 'Al-Haywan', 'At-Tayr'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'مِنَ الْجِنَّةِ وَالنَّاسِ.',
            explanationEn: 'From among the jinn and mankind.'
        },
        // Surah Al-Kawthar
        {
            id: 22,
            question: 'ما هو "الكوثر"؟',
            questionEn: 'What is "Al-Kawthar"?',
            options: ['نهر في الجنة', 'جبل في مكة', 'اسم نبي', 'كتاب'],
            optionsEn: ['A river in Paradise', 'A mountain in Mecca', 'A Prophet\'s name', 'A book'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'الكوثر هو نهر أعطاه الله للنبي محمد ﷺ في الجنة.',
            explanationEn: 'Al-Kawthar is a river in Paradise given to Prophet Muhammad ﷺ.'
        },
        {
            id: 23,
            question: 'أكمل الآية: "فصل لربك و ..."',
            questionEn: 'Complete the verse: "Fa salli li rabbika wa ..."',
            options: ['انحر', 'اصبر', 'اشكر', 'اعبد'],
            optionsEn: ['Anhar', 'Asbir', 'Ashkur', 'A\'bud'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ.',
            explanationEn: 'So pray to your Lord and sacrifice [to Him alone].'
        },
        {
            id: 24,
            question: 'ما معنى "شانئك" في سورة الكوثر؟',
            questionEn: 'What does "Shani-aka" mean in Surah Al-Kawthar?',
            options: ['مبغضك وعدوك', 'صديقك', 'جارك', 'أهلك'],
            optionsEn: ['Your enemy/hater', 'Your friend', 'Your neighbor', 'Your family'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'شانئك هو مبغضك وعدوك.',
            explanationEn: 'Shani-aka refers to the one who hates you (the enemy).'
        },
        // Surah Al-Asr
        {
            id: 25,
            question: 'بماذا أقسم الله في سورة العصر؟',
            questionEn: 'What did Allah swear by in Surah Al-Asr?',
            options: ['بالزمن/الوقت', 'بالشمس', 'بالقمر', 'بالليل'],
            optionsEn: ['By Time', 'By the Sun', 'By the Moon', 'By the Night'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'أقسم الله بالعصر وهو الدهر أو الزمن.',
            explanationEn: 'Allah swore by Al-Asr, which means Time.'
        },
        {
            id: 26,
            question: 'أكمل الآية: "إن الإنسان لفي ..."',
            questionEn: 'Complete the verse: "Inna al-insana lafee ..."',
            options: ['خسر', 'نعيم', 'خطر', 'أمان'],
            optionsEn: ['Khusr', 'Na\'eem', 'Khatar', 'Aman'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ.',
            explanationEn: 'Indeed, mankind is in loss.'
        },
        // Surah Al-Fil
        {
            id: 27,
            question: 'من هم "أصحاب الفيل"؟',
            questionEn: 'Who are the "Companions of the Elephant"?',
            options: ['جيش أبرهة', 'قوم ثمود', 'قوم عاد', 'قوم لوط'],
            optionsEn: ['Abraha\'s Army', 'People of Thamud', 'People of Ad', 'People of Lut'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'أصحاب الفيل هم جيش أبرهة الذي أراد هدم الكعبة.',
            explanationEn: 'They are the army of Abraha who wanted to destroy the Kaaba.'
        },
        {
            id: 28,
            question: 'ماذا أرسل الله على أصحاب الفيل؟',
            questionEn: 'What did Allah send against the Companions of the Elephant?',
            options: ['طيراً أبابيل', 'ريحاً صرصراً', 'طوفاناً', 'جراداً'],
            optionsEn: ['Birds (Ababil)', 'Furious Wind', 'Flood', 'Locusts'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'أرسل الله عليهم طيراً أبابيل ترميهم بحجارة من سجيل.',
            explanationEn: 'Allah sent against them flocks of birds (Ababil).'
        },
        // Surah Quraish
        {
            id: 29,
            question: 'ما هما الرحلتان المذكورتان في سورة قريش؟',
            questionEn: 'What are the two journeys mentioned in Surah Quraish?',
            options: ['الشتاء والصيف', 'الليل والنهار', 'البر والبحر', 'الشرق والغرب'],
            optionsEn: ['Winter and Summer', 'Night and Day', 'Land and Sea', 'East and West'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'رحلة الشتاء (إلى اليمن) ورحلة الصيف (إلى الشام).',
            explanationEn: 'The journey of winter and summer.'
        },
        {
            id: 30,
            question: 'أكمل الآية: "فليعبدوا رب هذا ..."',
            questionEn: 'Complete the verse: "Fal ya\'budu Rabba hadha ..."',
            options: ['البيت', 'البلد', 'الكون', 'المكان'],
            optionsEn: ['Al-Bayt', 'Al-Balad', 'Al-Kawn', 'Al-Makan'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ (الكعبة).',
            explanationEn: 'Let them worship the Lord of this House (the Kaaba).'
        },
        // Surah Al-Ma'un
        {
            id: 31,
            question: 'ما معنى "الماعون"؟',
            questionEn: 'What does "Al-Ma\'un" mean?',
            options: ['المساعدة البسيطة', 'المال الكثير', 'الطعام', 'الماء'],
            optionsEn: ['Small kindnesses/assistance', 'Much wealth', 'Food', 'Water'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'الماعون هو كل ما يستعان به من الأشياء البسيطة كالدلو والفأس.',
            explanationEn: 'Al-Ma\'un refers to small kindnesses or assistance (like lending household items).'
        },
        {
            id: 32,
            question: 'من هم الذين "هم عن صلاتهم ساهون"؟',
            questionEn: 'Who are those "who are heedless of their prayer"?',
            options: ['المنافقون', 'المؤمنون', 'الفقراء', 'المساكين'],
            optionsEn: ['Hypocrites', 'Believers', 'The Poor', 'The Needy'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'هم الذين يؤخرون الصلاة عن وقتها ولا يبالون بها.',
            explanationEn: 'Those who delay prayer beyond its time and do not care about it.'
        },
        // Surah An-Nasr
        {
            id: 33,
            question: 'ماذا تعني سورة النصر؟',
            questionEn: 'What does Surah An-Nasr signify?',
            options: ['قرب وفاة النبي ﷺ', 'بداية الإسلام', 'الهجرة', 'غزوة بدر'],
            optionsEn: ['Approaching death of Prophet ﷺ', 'Beginning of Islam', 'Migration', 'Battle of Badr'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة النصر كانت إشارة لقرب أجل النبي ﷺ بعد فتح مكة.',
            explanationEn: 'Surah An-Nasr indicated the approaching death of the Prophet ﷺ after the conquest of Mecca.'
        },
        {
            id: 34,
            question: 'أكمل الآية: "ورأيت الناس يدخلون في دين الله ..."',
            questionEn: 'Complete: "And you see the people entering into the religion of Allah in ..."',
            options: ['أفواجاً', 'فرادى', 'خائفين', 'مسرعين'],
            optionsEn: ['Multitudes/Crowds', 'Individually', 'Fearfully', 'Hurriedly'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا.',
            explanationEn: 'Entering into the religion of Allah in multitudes.'
        },
        // Surah Al-Masad
        {
            id: 35,
            question: 'من هو "أبو لهب"؟',
            questionEn: 'Who is "Abu Lahab"?',
            options: ['عم النبي ﷺ وعدوه', 'صديق النبي', 'ابن النبي', 'جار النبي'],
            optionsEn: ['Prophet\'s uncle and enemy', 'Prophet\'s friend', 'Prophet\'s son', 'Prophet\'s neighbor'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'أبو لهب هو عم النبي ﷺ وكان من أشد أعداء الإسلام.',
            explanationEn: 'Abu Lahab was the Prophet\'s uncle and a fierce enemy of Islam.'
        },
        {
            id: 36,
            question: 'ماذا كانت تفعل زوجة أبي لهب؟',
            questionEn: 'What did Abu Lahab\'s wife do?',
            options: ['تحمل الحطب والشوك', 'تطبخ الطعام', 'تساعد الفقراء', 'تسقي الماء'],
            optionsEn: ['Carried firewood/thorns', 'Cooked food', 'Helped poor', 'Served water'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'كانت تضع الشوك في طريق النبي ﷺ.',
            explanationEn: 'She used to place thorns in the path of the Prophet ﷺ.'
        },
        // General Quran Info
        {
            id: 37,
            question: 'ما هي "أم الكتاب"؟',
            questionEn: 'What is "Umm al-Kitab"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة يس', 'سورة الكهف'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Yasin', 'Surah Al-Kahf'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى أم الكتاب لأنها أصل القرآن.',
            explanationEn: 'Surah Al-Fatiha is called the Mother of the Book.'
        },
        {
            id: 38,
            question: 'كم عدد السجدات في القرآن الكريم؟',
            questionEn: 'How many Sajdahs (prostrations) are in the Quran?',
            options: ['15', '10', '20', '12'],
            optionsEn: ['15', '10', '20', '12'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'يوجد 15 سجدة تلاوة في القرآن الكريم.',
            explanationEn: 'There are 15 prostrations of recitation in the Quran.'
        },
        {
            id: 39,
            question: 'ما هي السورة التي تسمى "عروس القرآن"؟',
            questionEn: 'Which Surah is called the "Bride of the Quran"?',
            options: ['سورة الرحمن', 'سورة يس', 'سورة الواقعة', 'سورة الملك'],
            optionsEn: ['Surah Ar-Rahman', 'Surah Yasin', 'Surah Al-Waqiah', 'Surah Al-Mulk'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الرحمن تسمى عروس القرآن.',
            explanationEn: 'Surah Ar-Rahman is known as the Bride of the Quran.'
        },
        {
            id: 40,
            question: 'ما هي السورة المنجية من عذاب القبر؟',
            questionEn: 'Which Surah protects from the punishment of the grave?',
            options: ['سورة الملك', 'سورة السجدة', 'سورة الكهف', 'سورة يس'],
            optionsEn: ['Surah Al-Mulk', 'Surah As-Sajdah', 'Surah Al-Kahf', 'Surah Yasin'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الملك هي المنجية من عذاب القبر.',
            explanationEn: 'Surah Al-Mulk protects from the punishment of the grave.'
        },
        {
            id: 41,
            question: 'كم سنة استمر نزول القرآن؟',
            questionEn: 'For how many years was the Quran revealed?',
            options: ['23 سنة', '20 سنة', '25 سنة', '10 سنوات'],
            optionsEn: ['23 years', '20 years', '25 years', '10 years'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'نزل القرآن مفرقاً على مدى 23 سنة.',
            explanationEn: 'The Quran was revealed over a period of 23 years.'
        },
        {
            id: 42,
            question: 'أين نزل أول ما نزل من القرآن؟',
            questionEn: 'Where was the first revelation of the Quran?',
            options: ['غار حراء', 'غار ثور', 'المسجد الحرام', 'المدينة'],
            optionsEn: ['Cave Hira', 'Cave Thawr', 'Masjid Al-Haram', 'Medina'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'نزل الوحي لأول مرة في غار حراء.',
            explanationEn: 'The first revelation came in the Cave of Hira.'
        },
        {
            id: 43,
            question: 'ما هي أول كلمة نزلت من القرآن؟',
            questionEn: 'What was the first word revealed in the Quran?',
            options: ['اقرأ', 'قل', 'يا', 'الحمد'],
            optionsEn: ['Iqra (Read)', 'Qul (Say)', 'Ya (O)', 'Alhamd (Praise)'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'أول كلمة نزلت هي "اقرأ" من سورة العلق.',
            explanationEn: 'The first word revealed was "Iqra" (Read) from Surah Al-Alaq.'
        },
        {
            id: 44,
            question: 'ما هي السورة التي تقرأ كل جمعة؟',
            questionEn: 'Which Surah is recommended to read every Friday?',
            options: ['سورة الكهف', 'سورة يس', 'سورة الملك', 'سورة الدخان'],
            optionsEn: ['Surah Al-Kahf', 'Surah Yasin', 'Surah Al-Mulk', 'Surah Ad-Dukhan'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'يستحب قراءة سورة الكهف يوم الجمعة.',
            explanationEn: 'It is recommended to read Surah Al-Kahf on Fridays.'
        },
        {
            id: 45,
            question: 'ما هي أعظم آية في القرآن؟',
            questionEn: 'What is the greatest verse in the Quran?',
            options: ['آية الكرسي', 'آية الدين', 'آية النور', 'آخر آية من البقرة'],
            optionsEn: ['Ayat al-Kursi', 'Ayat ad-Dayn', 'Ayat an-Nur', 'Last verse of Baqarah'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'آية الكرسي هي أعظم آية في كتاب الله.',
            explanationEn: 'Ayat al-Kursi is the greatest verse in the Book of Allah.'
        },
        {
            id: 46,
            question: 'ما هي السورة التي تسمى "بني إسرائيل"؟',
            questionEn: 'Which Surah is also called "Bani Israel"?',
            options: ['سورة الإسراء', 'سورة البقرة', 'سورة طه', 'سورة القصص'],
            optionsEn: ['Surah Al-Isra', 'Surah Al-Baqarah', 'Surah Taha', 'Surah Al-Qasas'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة الإسراء تسمى أيضاً سورة بني إسرائيل.',
            explanationEn: 'Surah Al-Isra is also known as Surah Bani Israel.'
        },
        {
            id: 47,
            question: 'كم عدد السور المكية؟',
            questionEn: 'How many Meccan Surahs are there?',
            options: ['86', '28', '114', '50'],
            optionsEn: ['86', '28', '114', '50'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'عدد السور المكية 86 سورة.',
            explanationEn: 'There are 86 Meccan Surahs.'
        },
        {
            id: 48,
            question: 'كم عدد السور المدنية؟',
            questionEn: 'How many Medinan Surahs are there?',
            options: ['28', '86', '30', '40'],
            optionsEn: ['28', '86', '30', '40'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'عدد السور المدنية 28 سورة.',
            explanationEn: 'There are 28 Medinan Surahs.'
        },
        {
            id: 49,
            question: 'ما هي السورة التي تسمى "الفاضحة"؟',
            questionEn: 'Which Surah is called "The Exposer" (Al-Fadhiha)?',
            options: ['سورة التوبة', 'سورة المنافقون', 'سورة الأحزاب', 'سورة النور'],
            optionsEn: ['Surah At-Tawbah', 'Surah Al-Munafiqun', 'Surah Al-Ahzab', 'Surah An-Nur'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة التوبة تسمى الفاضحة لأنها فضحت المنافقين.',
            explanationEn: 'Surah At-Tawbah is called The Exposer because it exposed the hypocrites.'
        },
        {
            id: 50,
            question: 'ما هي السورة التي ذكر فيها اسم الله في كل آية؟',
            questionEn: 'Which Surah mentions Allah in every verse?',
            options: ['سورة المجادلة', 'سورة الملك', 'سورة الحديد', 'سورة الحشر'],
            optionsEn: ['Surah Al-Mujadila', 'Surah Al-Mulk', 'Surah Al-Hadid', 'Surah Al-Hashr'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة المجادلة هي السورة الوحيدة التي ذكر فيها لفظ الجلالة في كل آية.',
            explanationEn: 'Surah Al-Mujadila is the only Surah where Allah is mentioned in every verse.'
        },
        {
            id: 51,
            question: 'ما هي السورة التي تسمى "السبع المثاني"؟',
            questionEn: 'Which Surah is called "As-Sab\' Al-Mathani"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة يس', 'سورة الملك'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Yasin', 'Surah Al-Mulk'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى السبع المثاني.',
            explanationEn: 'Surah Al-Fatiha is called The Seven Oft-Repeated Verses.'
        },
        {
            id: 52,
            question: 'ما هي السورة التي تسمى "سنام القرآن"؟',
            questionEn: 'Which Surah is called "The Hump/Pinnacle of the Quran"?',
            options: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء', 'سورة المائدة'],
            optionsEn: ['Surah Al-Baqarah', 'Surah Ali Imran', 'Surah An-Nisa', 'Surah Al-Maidah'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة البقرة هي سنام القرآن.',
            explanationEn: 'Surah Al-Baqarah is the Pinnacle of the Quran.'
        },
        {
            id: 53,
            question: 'ما هي السورة التي تسمى "النساء الصغرى"؟',
            questionEn: 'Which Surah is called "The Smaller Women" (An-Nisa As-Sughra)?',
            options: ['سورة الطلاق', 'سورة التحريم', 'سورة النور', 'سورة الأحزاب'],
            optionsEn: ['Surah At-Talaq', 'Surah At-Tahrim', 'Surah An-Nur', 'Surah Al-Ahzab'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة الطلاق تسمى سورة النساء الصغرى.',
            explanationEn: 'Surah At-Talaq is called The Smaller Surah An-Nisa.'
        },
        {
            id: 54,
            question: 'من هو الصحابي الوحيد المذكور اسمه في القرآن؟',
            questionEn: 'Who is the only Companion mentioned by name in the Quran?',
            options: ['زيد بن حارثة', 'أبو بكر الصديق', 'عمر بن الخطاب', 'علي بن أبي طالب'],
            optionsEn: ['Zaid bin Harithah', 'Abu Bakr As-Siddiq', 'Umar bin Al-Khattab', 'Ali bin Abi Talib'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'زيد بن حارثة هو الصحابي الوحيد المذكور اسمه صراحة في سورة الأحزاب.',
            explanationEn: 'Zaid bin Harithah is the only Companion explicitly mentioned by name in Surah Al-Ahzab.'
        },
        {
            id: 55,
            question: 'ما هي السورة التي تسمى "التوديع"؟',
            questionEn: 'Which Surah is called "The Farewell"?',
            options: ['سورة النصر', 'سورة الكافرون', 'سورة الإخلاص', 'سورة الفلق'],
            optionsEn: ['Surah An-Nasr', 'Surah Al-Kafirun', 'Surah Al-Ikhlas', 'Surah Al-Falaq'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة النصر تسمى سورة التوديع لأنها نعت النبي ﷺ.',
            explanationEn: 'Surah An-Nasr is called The Farewell Surah because it announced the passing of the Prophet ﷺ.'
        },
        {
            id: 56,
            question: 'ما هي أطول آية في القرآن؟',
            questionEn: 'What is the longest verse in the Quran?',
            options: ['آية الدين', 'آية الكرسي', 'آية النور', 'آية المداينة'],
            optionsEn: ['Ayat ad-Dayn (Debt)', 'Ayat al-Kursi', 'Ayat an-Nur', 'Ayat al-Mudayanah'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'آية الدين في سورة البقرة هي أطول آية.',
            explanationEn: 'The Verse of Debt in Surah Al-Baqarah is the longest verse.'
        },
        {
            id: 57,
            question: 'ما هي السورة التي تسمى "الحائلة"؟',
            questionEn: 'Which Surah is called "The Barrier"?',
            options: ['سورة الكهف', 'سورة الملك', 'سورة يس', 'سورة الواقعة'],
            optionsEn: ['Surah Al-Kahf', 'Surah Al-Mulk', 'Surah Yasin', 'Surah Al-Waqiah'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة الكهف تسمى الحائلة لأنها تحول بين قارئها وبين النار.',
            explanationEn: 'Surah Al-Kahf is called The Barrier because it stands between its reciter and the Fire.'
        },
        {
            id: 58,
            question: 'كم مرة ذكر اسم "محمد" ﷺ في القرآن؟',
            questionEn: 'How many times is the name "Muhammad" ﷺ mentioned in the Quran?',
            options: ['4 مرات', '5 مرات', '3 مرات', 'مرة واحدة'],
            optionsEn: ['4 times', '5 times', '3 times', 'Once'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'ذكر اسم محمد ﷺ 4 مرات في القرآن الكريم.',
            explanationEn: 'The name Muhammad ﷺ is mentioned 4 times in the Holy Quran.'
        },
        {
            id: 59,
            question: 'ما هي السورة التي تسمى "المانعة"؟',
            questionEn: 'Which Surah is called "The Preventer"?',
            options: ['سورة الملك', 'سورة الفاتحة', 'سورة الإخلاص', 'سورة الفلق'],
            optionsEn: ['Surah Al-Mulk', 'Surah Al-Fatiha', 'Surah Al-Ikhlas', 'Surah Al-Falaq'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الملك تسمى المانعة لأنها تمنع عذاب القبر.',
            explanationEn: 'Surah Al-Mulk is called The Preventer because it prevents the punishment of the grave.'
        },
        {
            id: 60,
            question: 'ما هي السورة التي تسمى "الواقية"؟',
            questionEn: 'Which Surah is called "The Protector"?',
            options: ['سورة الملك', 'سورة الواقعة', 'سورة الفاتحة', 'سورة الإخلاص'],
            optionsEn: ['Surah Al-Mulk', 'Surah Al-Waqiah', 'Surah Al-Fatiha', 'Surah Al-Ikhlas'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الملك تسمى الواقية.',
            explanationEn: 'Surah Al-Mulk is called The Protector.'
        },
        {
            id: 61,
            question: 'ما هي السورة التي تسمى "الكافية"؟',
            questionEn: 'Which Surah is called "The Sufficient"?',
            options: ['سورة الفاتحة', 'سورة الإخلاص', 'سورة الكوثر', 'سورة الناس'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Ikhlas', 'Surah Al-Kawthar', 'Surah An-Nas'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الكافية.',
            explanationEn: 'Surah Al-Fatiha is called The Sufficient.'
        },
        {
            id: 62,
            question: 'ما هي السورة التي تسمى "الشافية"؟',
            questionEn: 'Which Surah is called "The Healer"?',
            options: ['سورة الفاتحة', 'سورة الناس', 'سورة الفلق', 'سورة الإخلاص'],
            optionsEn: ['Surah Al-Fatiha', 'Surah An-Nas', 'Surah Al-Falaq', 'Surah Al-Ikhlas'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الشافية.',
            explanationEn: 'Surah Al-Fatiha is called The Healer.'
        },
        {
            id: 63,
            question: 'ما هي السورة التي تسمى "الأساس"؟',
            questionEn: 'Which Surah is called "The Foundation"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة الإخلاص', 'سورة يس'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Al-Ikhlas', 'Surah Yasin'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الأساس.',
            explanationEn: 'Surah Al-Fatiha is called The Foundation.'
        },
        {
            id: 64,
            question: 'ما هي السورة التي تسمى "الكنز"؟',
            questionEn: 'Which Surah is called "The Treasure"?',
            options: ['سورة الفاتحة', 'سورة الكهف', 'سورة يس', 'سورة الملك'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Kahf', 'Surah Yasin', 'Surah Al-Mulk'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الكنز.',
            explanationEn: 'Surah Al-Fatiha is called The Treasure.'
        },
        {
            id: 65,
            question: 'ما هي السورة التي تسمى "النور"؟',
            questionEn: 'Which Surah is called "The Light"?',
            options: ['سورة الفاتحة', 'سورة النور', 'سورة الإخلاص', 'سورة الفلق'],
            optionsEn: ['Surah Al-Fatiha', 'Surah An-Nur', 'Surah Al-Ikhlas', 'Surah Al-Falaq'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى النور.',
            explanationEn: 'Surah Al-Fatiha is called The Light.'
        },
        {
            id: 66,
            question: 'ما هي السورة التي تسمى "الراقية"؟',
            questionEn: 'Which Surah is called "The Ruqyah"?',
            options: ['سورة الفاتحة', 'سورة الناس', 'سورة الفلق', 'سورة الإخلاص'],
            optionsEn: ['Surah Al-Fatiha', 'Surah An-Nas', 'Surah Al-Falaq', 'Surah Al-Ikhlas'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الراقية.',
            explanationEn: 'Surah Al-Fatiha is called The Ruqyah.'
        },
        {
            id: 67,
            question: 'ما هي السورة التي تسمى "الحمد"؟',
            questionEn: 'Which Surah is called "Al-Hamd"?',
            options: ['سورة الفاتحة', 'سورة الأنعام', 'سورة الكهف', 'سورة سبأ'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-An\'am', 'Surah Al-Kahf', 'Surah Saba'],
            correctAnswer: 0,
            difficulty: 'easy',
            explanation: 'سورة الفاتحة تسمى سورة الحمد.',
            explanationEn: 'Surah Al-Fatiha is called Surah Al-Hamd.'
        },
        {
            id: 68,
            question: 'ما هي السورة التي تسمى "الصلاة"؟',
            questionEn: 'Which Surah is called "The Prayer"?',
            options: ['سورة الفاتحة', 'سورة الأعلى', 'سورة العلق', 'سورة القدر'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-A\'la', 'Surah Al-Alaq', 'Surah Al-Qadr'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الصلاة لقوله تعالى في الحديث القدسي: "قسمت الصلاة بيني وبين عبدي نصفين".',
            explanationEn: 'Surah Al-Fatiha is called The Prayer.'
        },
        {
            id: 69,
            question: 'ما هي السورة التي تسمى "أم القرآن"؟',
            questionEn: 'Which Surah is called "Mother of the Quran"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة يس', 'سورة الرحمن'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Yasin', 'Surah Ar-Rahman'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى أم القرآن.',
            explanationEn: 'Surah Al-Fatiha is called Mother of the Quran.'
        },
        {
            id: 70,
            question: 'ما هي السورة التي تسمى "القرآن العظيم"؟',
            questionEn: 'Which Surah is called "The Great Quran"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة يس', 'سورة الواقعة'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Yasin', 'Surah Al-Waqiah'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى القرآن العظيم.',
            explanationEn: 'Surah Al-Fatiha is called The Great Quran.'
        },
        {
            id: 71,
            question: 'ما هي السورة التي تسمى "تعليم المسألة"؟',
            questionEn: 'Which Surah is called "Teaching the Request"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة آل عمران', 'سورة النساء'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Ali Imran', 'Surah An-Nisa'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة الفاتحة تسمى تعليم المسألة لأنها تعلمنا كيف نسأل الله.',
            explanationEn: 'Surah Al-Fatiha is called Teaching the Request because it teaches us how to ask Allah.'
        },
        {
            id: 72,
            question: 'ما هي السورة التي تسمى "المناجاة"؟',
            questionEn: 'Which Surah is called "The Supplication"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة يس', 'سورة الملك'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Yasin', 'Surah Al-Mulk'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة الفاتحة تسمى المناجاة.',
            explanationEn: 'Surah Al-Fatiha is called The Supplication.'
        },
        {
            id: 73,
            question: 'ما هي السورة التي تسمى "التفويض"؟',
            questionEn: 'Which Surah is called "The Delegation"?',
            options: ['سورة الفاتحة', 'سورة البقرة', 'سورة الإخلاص', 'سورة الفلق'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Baqarah', 'Surah Al-Ikhlas', 'Surah Al-Falaq'],
            correctAnswer: 0,
            difficulty: 'hard',
            explanation: 'سورة الفاتحة تسمى التفويض.',
            explanationEn: 'Surah Al-Fatiha is called The Delegation.'
        },
        {
            id: 74,
            question: 'ما هي السورة التي تسمى "الكنز"؟',
            questionEn: 'Which Surah is called "The Treasure"?',
            options: ['سورة الفاتحة', 'سورة الكهف', 'سورة يس', 'سورة الملك'],
            optionsEn: ['Surah Al-Fatiha', 'Surah Al-Kahf', 'Surah Yasin', 'Surah Al-Mulk'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى الكنز.',
            explanationEn: 'Surah Al-Fatiha is called The Treasure.'
        },
        {
            id: 75,
            question: 'ما هي السورة التي تسمى "النور"؟',
            questionEn: 'Which Surah is called "The Light"?',
            options: ['سورة الفاتحة', 'سورة النور', 'سورة الإخلاص', 'سورة الفلق'],
            optionsEn: ['Surah Al-Fatiha', 'Surah An-Nur', 'Surah Al-Ikhlas', 'Surah Al-Falaq'],
            correctAnswer: 0,
            difficulty: 'medium',
            explanation: 'سورة الفاتحة تسمى النور.',
            explanationEn: 'Surah Al-Fatiha is called The Light.'
        }

    ]
};
