import { QuizLevel } from '../quizTypes';

// Level 1: Arabic Letters & Basic Words (70 questions)
export const level1: QuizLevel = {
    id: 1,
    titleAr: 'المستوى الأول: الحروف والكلمات',
    titleEn: 'Level 1: Letters and Words',
    description: 'تعلم الحروف العربية والكلمات الأساسية',
    descriptionEn: 'Learn Arabic letters and basic words',
    requiredScore: 70,
    icon: '🔤',
    questions: [
        // Arabic Letters Recognition (20 questions)
        {
            id: 1,
            question: 'ما هو الحرف الأول في كلمة "أحمد"؟',
            questionEn: 'What is the first letter in the word "Ahmad"?',
            options: ['أ', 'ح', 'م', 'د'],
            optionsEn: ['Alif', 'Ha', 'Meem', 'Dal'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 2,
            question: 'كم عدد الحروف في الأبجدية العربية؟',
            questionEn: 'How many letters are in the Arabic alphabet?',
            options: ['26', '28', '30', '32'],
            optionsEn: ['26', '28', '30', '32'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 3,
            question: 'ما هو الحرف الذي يأتي بعد "ب"؟',
            questionEn: 'What letter comes after "Ba"?',
            options: ['ت', 'ث', 'ج', 'أ'],
            optionsEn: ['Ta', 'Tha', 'Jeem', 'Alif'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 4,
            question: 'أي حرف من هذه الحروف له نقطة واحدة؟',
            questionEn: 'Which of these letters has one dot?',
            options: ['ب', 'ت', 'ن', 'ج'],
            optionsEn: ['Ba', 'Ta', 'Noon', 'Jeem'],
            correctAnswer: 2,
            difficulty: 'medium'
        },
        {
            id: 5,
            question: 'ما هو الحرف الأخير في الأبجدية العربية؟',
            questionEn: 'What is the last letter in the Arabic alphabet?',
            options: ['و', 'ه', 'ي', 'ء'],
            optionsEn: ['Waw', 'Ha', 'Ya', 'Hamza'],
            correctAnswer: 2,
            difficulty: 'easy'
        },
        {
            id: 6,
            question: 'كم نقطة في حرف "ث"؟',
            questionEn: 'How many dots does the letter "Tha" have?',
            options: ['1', '2', '3', '4'],
            optionsEn: ['1', '2', '3', '4'],
            correctAnswer: 2,
            difficulty: 'easy'
        },
        {
            id: 7,
            question: 'أي من هذه الحروف ليس له نقاط؟',
            questionEn: 'Which of these letters has no dots?',
            options: ['ب', 'د', 'ت', 'ن'],
            optionsEn: ['Ba', 'Dal', 'Ta', 'Noon'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 8,
            question: 'ما هو الحرف الذي يشبه "ب" ولكن بثلاث نقاط؟',
            questionEn: 'What letter looks like "Ba" but with three dots?',
            options: ['ت', 'ث', 'ن', 'ي'],
            optionsEn: ['Ta', 'Tha', 'Noon', 'Ya'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 9,
            question: 'أي حرف من هذه الحروف هو حرف علة؟',
            questionEn: 'Which of these letters is a vowel?',
            options: ['ب', 'و', 'د', 'ك'],
            optionsEn: ['Ba', 'Waw', 'Dal', 'Kaf'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 10,
            question: 'ما هو الحرف الذي يبدأ به اسم "محمد"؟',
            questionEn: 'What letter does the name "Muhammad" start with?',
            options: ['م', 'ح', 'د', 'ن'],
            optionsEn: ['Meem', 'Ha', 'Dal', 'Noon'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 11,
            question: 'كم نقطة في حرف "ش"؟',
            questionEn: 'How many dots does "Sheen" have?',
            options: ['1', '2', '3', '4'],
            optionsEn: ['1', '2', '3', '4'],
            correctAnswer: 2,
            difficulty: 'easy'
        },
        {
            id: 12,
            question: 'أي من هذه الحروف يُكتب فوق السطر؟',
            questionEn: 'Which letter is written above the line?',
            options: ['ب', 'د', 'ر', 'ك'],
            optionsEn: ['Ba', 'Dal', 'Ra', 'Kaf'],
            correctAnswer: 2,
            difficulty: 'medium'
        },
        {
            id: 13,
            question: 'ما هو الحرف الذي يأتي قبل "ع"؟',
            questionEn: 'What letter comes before "Ain"?',
            options: ['ظ', 'ط', 'ض', 'ص'],
            optionsEn: ['Dha', 'Ta', 'Dad', 'Sad'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 14,
            question: 'أي حرف من هذه الحروف له نقطتان تحته؟',
            questionEn: 'Which letter has two dots below it?',
            options: ['ت', 'ب', 'ي', 'ث'],
            optionsEn: ['Ta', 'Ba', 'Ya', 'Tha'],
            correctAnswer: 2,
            difficulty: 'medium'
        },
        {
            id: 15,
            question: 'ما هو الحرف الذي يشبه "ج" ولكن بنقطة واحدة؟',
            questionEn: 'What letter looks like "Jeem" but with one dot?',
            options: ['ح', 'خ', 'ج', 'ع'],
            optionsEn: ['Ha', 'Kha', 'Jeem', 'Ain'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 16,
            question: 'كم حرف علة في اللغة العربية؟',
            questionEn: 'How many vowels are in Arabic?',
            options: ['2', '3', '4', '5'],
            optionsEn: ['2', '3', '4', '5'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 17,
            question: 'أي من هذه الحروف يُنطق من الحلق؟',
            questionEn: 'Which letter is pronounced from the throat?',
            options: ['ب', 'ت', 'ح', 'د'],
            optionsEn: ['Ba', 'Ta', 'Ha', 'Dal'],
            correctAnswer: 2,
            difficulty: 'hard'
        },
        {
            id: 18,
            question: 'ما هو الحرف الذي يبدأ به كلمة "قرآن"؟',
            questionEn: 'What letter does "Quran" start with?',
            options: ['ق', 'ك', 'ر', 'ن'],
            optionsEn: ['Qaf', 'Kaf', 'Ra', 'Noon'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 19,
            question: 'أي حرف من هذه الحروف له شكل مميز في نهاية الكلمة؟',
            questionEn: 'Which letter has a special form at the end of a word?',
            options: ['ب', 'ه', 'د', 'ر'],
            optionsEn: ['Ba', 'Ha', 'Dal', 'Ra'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 20,
            question: 'ما هو الحرف الذي يُكتب مثل "س" ولكن بثلاث نقاط؟',
            questionEn: 'What letter is written like "Seen" but with three dots?',
            options: ['ش', 'ص', 'ض', 'ط'],
            optionsEn: ['Sheen', 'Sad', 'Dad', 'Ta'],
            correctAnswer: 0,
            difficulty: 'easy'
        },

        // Basic Islamic Words (25 questions)
        {
            id: 21,
            question: 'ماذا تعني كلمة "الله"؟',
            questionEn: 'What does "Allah" mean?',
            options: ['الخالق', 'النبي', 'الملاك', 'الكتاب'],
            optionsEn: ['The Creator', 'The Prophet', 'The Angel', 'The Book'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 22,
            question: 'ماذا تعني كلمة "صلاة"؟',
            questionEn: 'What does "Salah" mean?',
            options: ['الصوم', 'الصلاة', 'الزكاة', 'الحج'],
            optionsEn: ['Fasting', 'Prayer', 'Charity', 'Pilgrimage'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 23,
            question: 'ماذا تعني كلمة "قرآن"؟',
            questionEn: 'What does "Quran" mean?',
            options: ['القراءة', 'الكتابة', 'الاستماع', 'الحفظ'],
            optionsEn: ['Reading/Recitation', 'Writing', 'Listening', 'Memorization'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 24,
            question: 'ماذا تعني كلمة "نبي"؟',
            questionEn: 'What does "Nabi" mean?',
            options: ['ملك', 'رسول', 'صحابي', 'عالم'],
            optionsEn: ['Angel', 'Prophet', 'Companion', 'Scholar'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 25,
            question: 'ماذا تعني كلمة "مسجد"؟',
            questionEn: 'What does "Masjid" mean?',
            options: ['بيت', 'مدرسة', 'مكان السجود', 'سوق'],
            optionsEn: ['House', 'School', 'Place of Prostration', 'Market'],
            correctAnswer: 2,
            difficulty: 'easy'
        },
        {
            id: 26,
            question: 'ماذا تعني كلمة "إسلام"؟',
            questionEn: 'What does "Islam" mean?',
            options: ['السلام والاستسلام', 'الحرب', 'العلم', 'العمل'],
            optionsEn: ['Peace and Submission', 'War', 'Knowledge', 'Work'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 27,
            question: 'ماذا تعني كلمة "مؤمن"؟',
            questionEn: 'What does "Mumin" mean?',
            options: ['كافر', 'مؤمن', 'منافق', 'مشرك'],
            optionsEn: ['Disbeliever', 'Believer', 'Hypocrite', 'Polytheist'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 28,
            question: 'ماذا تعني كلمة "رحمة"؟',
            questionEn: 'What does "Rahmah" mean?',
            options: ['غضب', 'رحمة', 'عذاب', 'قوة'],
            optionsEn: ['Anger', 'Mercy', 'Punishment', 'Power'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 29,
            question: 'ماذا تعني كلمة "جنة"؟',
            questionEn: 'What does "Jannah" mean?',
            options: ['النار', 'الجنة', 'الدنيا', 'القبر'],
            optionsEn: ['Hell', 'Paradise', 'World', 'Grave'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 30,
            question: 'ماذا تعني كلمة "شكر"؟',
            questionEn: 'What does "Shukr" mean?',
            options: ['الشكر', 'الصبر', 'الخوف', 'الأمل'],
            optionsEn: ['Gratitude', 'Patience', 'Fear', 'Hope'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 31,
            question: 'ماذا تعني كلمة "صبر"؟',
            questionEn: 'What does "Sabr" mean?',
            options: ['السرعة', 'الصبر', 'الغضب', 'الفرح'],
            optionsEn: ['Speed', 'Patience', 'Anger', 'Joy'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 32,
            question: 'ماذا تعني كلمة "توحيد"؟',
            questionEn: 'What does "Tawheed" mean?',
            options: ['الشرك', 'التوحيد', 'الكفر', 'النفاق'],
            optionsEn: ['Polytheism', 'Monotheism', 'Disbelief', 'Hypocrisy'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 33,
            question: 'ماذا تعني كلمة "إيمان"؟',
            questionEn: 'What does "Iman" mean?',
            options: ['الكفر', 'الإيمان', 'الشك', 'الظن'],
            optionsEn: ['Disbelief', 'Faith', 'Doubt', 'Assumption'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 34,
            question: 'ماذا تعني كلمة "دعاء"؟',
            questionEn: 'What does "Dua" mean?',
            options: ['الصلاة', 'الدعاء', 'الذكر', 'القراءة'],
            optionsEn: ['Prayer', 'Supplication', 'Remembrance', 'Reading'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 35,
            question: 'ماذا تعني كلمة "ذكر"؟',
            questionEn: 'What does "Dhikr" mean?',
            options: ['النسيان', 'التذكر', 'الكتابة', 'القراءة'],
            optionsEn: ['Forgetting', 'Remembrance', 'Writing', 'Reading'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 36,
            question: 'ماذا تعني كلمة "حمد"؟',
            questionEn: 'What does "Hamd" mean?',
            options: ['الذم', 'الحمد', 'الشكوى', 'البكاء'],
            optionsEn: ['Blame', 'Praise', 'Complaint', 'Crying'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 37,
            question: 'ماذا تعني كلمة "تقوى"؟',
            questionEn: 'What does "Taqwa" mean?',
            options: ['الخوف من الله', 'الخوف من الناس', 'القوة', 'الضعف'],
            optionsEn: ['Fear of Allah', 'Fear of People', 'Strength', 'Weakness'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 38,
            question: 'ماذا تعني كلمة "هداية"؟',
            questionEn: 'What does "Hidayah" mean?',
            options: ['الضلال', 'الهداية', 'الحيرة', 'الشك'],
            optionsEn: ['Misguidance', 'Guidance', 'Confusion', 'Doubt'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 39,
            question: 'ماذا تعني كلمة "بركة"؟',
            questionEn: 'What does "Barakah" mean?',
            options: ['البركة', 'النقص', 'الزيادة', 'القلة'],
            optionsEn: ['Blessing', 'Decrease', 'Increase', 'Scarcity'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 40,
            question: 'ماذا تعني كلمة "نور"؟',
            questionEn: 'What does "Noor" mean?',
            options: ['الظلام', 'النور', 'الليل', 'النهار'],
            optionsEn: ['Darkness', 'Light', 'Night', 'Day'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 41,
            question: 'ماذا تعني كلمة "علم"؟',
            questionEn: 'What does "Ilm" mean?',
            options: ['الجهل', 'العلم', 'الظن', 'الشك'],
            optionsEn: ['Ignorance', 'Knowledge', 'Assumption', 'Doubt'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 42,
            question: 'ماذا تعني كلمة "حكمة"؟',
            questionEn: 'What does "Hikmah" mean?',
            options: ['الحماقة', 'الحكمة', 'السرعة', 'البطء'],
            optionsEn: ['Foolishness', 'Wisdom', 'Speed', 'Slowness'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 43,
            question: 'ماذا تعني كلمة "أمانة"؟',
            questionEn: 'What does "Amanah" mean?',
            options: ['الخيانة', 'الأمانة', 'الكذب', 'الصدق'],
            optionsEn: ['Betrayal', 'Trustworthiness', 'Lying', 'Truthfulness'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 44,
            question: 'ماذا تعني كلمة "صدق"؟',
            questionEn: 'What does "Sidq" mean?',
            options: ['الكذب', 'الصدق', 'الشك', 'الظن'],
            optionsEn: ['Lying', 'Truthfulness', 'Doubt', 'Assumption'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 45,
            question: 'ماذا تعني كلمة "عدل"؟',
            questionEn: 'What does "Adl" mean?',
            options: ['الظلم', 'العدل', 'الجور', 'الحيف'],
            optionsEn: ['Injustice', 'Justice', 'Tyranny', 'Bias'],
            correctAnswer: 1,
            difficulty: 'easy'
        },

        // Simple Phrases (25 questions)
        {
            id: 46,
            question: 'ماذا نقول عندما نبدأ شيئاً؟',
            questionEn: 'What do we say when we start something?',
            options: ['الحمد لله', 'بسم الله', 'سبحان الله', 'لا إله إلا الله'],
            optionsEn: ['Alhamdulillah', 'Bismillah', 'Subhanallah', 'La ilaha illallah'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 47,
            question: 'ماذا نقول عندما نشكر الله؟',
            questionEn: 'What do we say when we thank Allah?',
            options: ['بسم الله', 'الحمد لله', 'استغفر الله', 'ما شاء الله'],
            optionsEn: ['Bismillah', 'Alhamdulillah', 'Astaghfirullah', 'Mashallah'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 48,
            question: 'ماذا نقول عندما نرى شيئاً جميلاً؟',
            questionEn: 'What do we say when we see something beautiful?',
            options: ['سبحان الله', 'ما شاء الله', 'الله أكبر', 'لا حول ولا قوة إلا بالله'],
            optionsEn: ['Subhanallah', 'Mashallah', 'Allahu Akbar', 'La hawla wala quwwata illa billah'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 49,
            question: 'ماذا نقول عندما نستغفر؟',
            questionEn: 'What do we say when we seek forgiveness?',
            options: ['الحمد لله', 'استغفر الله', 'سبحان الله', 'الله أكبر'],
            optionsEn: ['Alhamdulillah', 'Astaghfirullah', 'Subhanallah', 'Allahu Akbar'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 50,
            question: 'ماذا نقول عندما نسمع الأذان؟',
            questionEn: 'What do we say when we hear the Adhan?',
            options: ['نكرر ما يقوله المؤذن', 'نقول الحمد لله', 'نقول سبحان الله', 'نقول الله أكبر'],
            optionsEn: ['We repeat what the Muezzin says', 'We say Alhamdulillah', 'We say Subhanallah', 'We say Allahu Akbar'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 51,
            question: 'ماذا نقول قبل النوم؟',
            questionEn: 'What do we say before sleeping?',
            options: ['بسم الله', 'باسمك اللهم أموت وأحيا', 'الحمد لله', 'سبحان الله'],
            optionsEn: ['Bismillah', 'In Your name O Allah I die and live', 'Alhamdulillah', 'Subhanallah'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 52,
            question: 'ماذا نقول عند الاستيقاظ؟',
            questionEn: 'What do we say when we wake up?',
            options: ['الحمد لله الذي أحيانا بعد ما أماتنا', 'بسم الله', 'سبحان الله', 'الله أكبر'],
            optionsEn: ['Praise to Allah who gave us life after death', 'Bismillah', 'Subhanallah', 'Allahu Akbar'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 53,
            question: 'ماذا نقول عند دخول المنزل؟',
            questionEn: 'What do we say when entering the house?',
            options: ['السلام عليكم', 'بسم الله', 'الحمد لله', 'كل ما سبق'],
            optionsEn: ['Assalamu Alaikum', 'Bismillah', 'Alhamdulillah', 'All of the above'],
            correctAnswer: 3,
            difficulty: 'medium'
        },
        {
            id: 54,
            question: 'ماذا نقول عند الخروج من المنزل؟',
            questionEn: 'What do we say when leaving the house?',
            options: ['بسم الله توكلت على الله', 'الحمد لله', 'سبحان الله', 'الله أكبر'],
            optionsEn: ['In the name of Allah, I trust in Allah', 'Alhamdulillah', 'Subhanallah', 'Allahu Akbar'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 55,
            question: 'ماذا نقول عند دخول المسجد؟',
            questionEn: 'What do we say when entering the mosque?',
            options: ['بسم الله', 'اللهم افتح لي أبواب رحمتك', 'الحمد لله', 'سبحان الله'],
            optionsEn: ['Bismillah', 'O Allah open for me the doors of Your mercy', 'Alhamdulillah', 'Subhanallah'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 56,
            question: 'ماذا نقول عند الخروج من المسجد؟',
            questionEn: 'What do we say when leaving the mosque?',
            options: ['بسم الله', 'اللهم افتح لي أبواب فضلك', 'الحمد لله', 'سبحان الله'],
            optionsEn: ['Bismillah', 'O Allah open for me the doors of Your bounty', 'Alhamdulillah', 'Subhanallah'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 57,
            question: 'ماذا نقول عند دخول الحمام؟',
            questionEn: 'What do we say when entering the bathroom?',
            options: ['بسم الله', 'اللهم إني أعوذ بك من الخبث والخبائث', 'الحمد لله', 'سبحان الله'],
            optionsEn: ['Bismillah', 'O Allah I seek refuge in You from evil', 'Alhamdulillah', 'Subhanallah'],
            correctAnswer: 1,
            difficulty: 'hard'
        },
        {
            id: 58,
            question: 'ماذا نقول عند الخروج من الحمام؟',
            questionEn: 'What do we say when leaving the bathroom?',
            options: ['غفرانك', 'الحمد لله', 'سبحان الله', 'بسم الله'],
            optionsEn: ['I seek Your forgiveness', 'Alhamdulillah', 'Subhanallah', 'Bismillah'],
            correctAnswer: 0,
            difficulty: 'hard'
        },
        {
            id: 59,
            question: 'ماذا نقول قبل الأكل؟',
            questionEn: 'What do we say before eating?',
            options: ['الحمد لله', 'بسم الله', 'سبحان الله', 'الله أكبر'],
            optionsEn: ['Alhamdulillah', 'Bismillah', 'Subhanallah', 'Allahu Akbar'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 60,
            question: 'ماذا نقول بعد الأكل؟',
            questionEn: 'What do we say after eating?',
            options: ['بسم الله', 'الحمد لله', 'سبحان الله', 'استغفر الله'],
            optionsEn: ['Bismillah', 'Alhamdulillah', 'Subhanallah', 'Astaghfirullah'],
            correctAnswer: 1,
            difficulty: 'easy'
        },
        {
            id: 61,
            question: 'ماذا نقول عندما نعطس؟',
            questionEn: 'What do we say when we sneeze?',
            options: ['الحمد لله', 'بسم الله', 'سبحان الله', 'الله أكبر'],
            optionsEn: ['Alhamdulillah', 'Bismillah', 'Subhanallah', 'Allahu Akbar'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 62,
            question: 'ماذا نقول لمن عطس وحمد الله؟',
            questionEn: 'What do we say to someone who sneezed and praised Allah?',
            options: ['بارك الله فيك', 'يرحمك الله', 'جزاك الله خيراً', 'شفاك الله'],
            optionsEn: ['May Allah bless you', 'May Allah have mercy on you', 'May Allah reward you', 'May Allah heal you'],
            correctAnswer: 1,
            difficulty: 'medium'
        },
        {
            id: 63,
            question: 'ماذا نقول عندما نسمع خبراً سيئاً؟',
            questionEn: 'What do we say when we hear bad news?',
            options: ['إنا لله وإنا إليه راجعون', 'الحمد لله', 'سبحان الله', 'الله أكبر'],
            optionsEn: ['To Allah we belong and to Him we return', 'Alhamdulillah', 'Subhanallah', 'Allahu Akbar'],
            correctAnswer: 0,
            difficulty: 'medium'
        },
        {
            id: 64,
            question: 'ماذا نقول عندما نسمع خبراً جيداً؟',
            questionEn: 'What do we say when we hear good news?',
            options: ['الحمد لله', 'بسم الله', 'سبحان الله', 'استغفر الله'],
            optionsEn: ['Alhamdulillah', 'Bismillah', 'Subhanallah', 'Astaghfirullah'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 65,
            question: 'ماذا نقول عندما نريد شيئاً في المستقبل؟',
            questionEn: 'What do we say when we want something in the future?',
            options: ['إن شاء الله', 'ما شاء الله', 'بارك الله', 'جزاك الله خيراً'],
            optionsEn: ['If Allah wills', 'What Allah wills', 'May Allah bless', 'May Allah reward you'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 66,
            question: 'ماذا نقول عندما نشكر شخصاً؟',
            questionEn: 'What do we say when we thank someone?',
            options: ['شكراً', 'جزاك الله خيراً', 'بارك الله فيك', 'كل ما سبق'],
            optionsEn: ['Thank you', 'May Allah reward you with good', 'May Allah bless you', 'All of the above'],
            correctAnswer: 3,
            difficulty: 'easy'
        },
        {
            id: 67,
            question: 'ماذا نقول عندما نودع شخصاً؟',
            questionEn: 'What do we say when we say goodbye?',
            options: ['السلام عليكم', 'في أمان الله', 'مع السلامة', 'كل ما سبق'],
            optionsEn: ['Peace be upon you', 'In Allah\'s protection', 'Goodbye', 'All of the above'],
            correctAnswer: 3,
            difficulty: 'easy'
        },
        {
            id: 68,
            question: 'ماذا نقول عندما نلتقي بشخص؟',
            questionEn: 'What do we say when we meet someone?',
            options: ['السلام عليكم', 'مرحباً', 'أهلاً', 'كل ما سبق'],
            optionsEn: ['Peace be upon you', 'Hello', 'Welcome', 'All of the above'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 69,
            question: 'ماذا نرد على من قال "السلام عليكم"؟',
            questionEn: 'What do we reply to "Assalamu Alaikum"?',
            options: ['وعليكم السلام', 'أهلاً', 'مرحباً', 'شكراً'],
            optionsEn: ['Wa Alaikum Assalam', 'Hello', 'Welcome', 'Thank you'],
            correctAnswer: 0,
            difficulty: 'easy'
        },
        {
            id: 70,
            question: 'ماذا نقول عندما نرى هلال رمضان؟',
            questionEn: 'What do we say when we see the crescent of Ramadan?',
            options: ['الله أكبر', 'اللهم أهله علينا بالأمن والإيمان', 'الحمد لله', 'سبحان الله'],
            optionsEn: ['Allahu Akbar', 'O Allah bring it upon us with security and faith', 'Alhamdulillah', 'Subhanallah'],
            correctAnswer: 1,
            difficulty: 'hard'
        }
    ]
};
