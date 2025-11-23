


import { Language } from './translations';

export interface GameQuestion {
    id: string;
    question: Record<Language, string>;
    options: Record<Language, string>[];
    correctIndex: number;
    explanation?: Record<Language, string>;
}

export interface GameLevel {
    id: number;
    title: Record<Language, string>;
    questions: GameQuestion[];
}

export const fursanLevels: GameLevel[] = [
    {
        id: 1,
        title: { ar: 'المستوى الأول: الحروف والكلمات', en: 'Level 1: Letters & Words', fr: 'Niveau 1', es: 'Nivel 1', zgh: 'ⴰⵙⵡⵉⵔ 1' },
        questions: [
            {
                id: '1-1',
                question: { ar: 'ما هو الحرف الأول من كلمة "كتاب"؟', en: 'What is the first letter of the word "Kitab" (Book)?', fr: 'Quelle est la première lettre de "Kitab"?', es: '¿Cuál es la primera letra de "Kitab"?', zgh: 'ⵎⴰ ⵉⴳⴰ ⵓⵙⴽⴽⵉⵍ ⴰⵎⵣⵡⴰⵔⵓ ⵏ "ⴽⵜⴰⴱ"?' },
                options: [
                    { ar: 'ك', en: 'Kaf (ك)', fr: 'Kaf (ك)', es: 'Kaf (ك)', zgh: 'ⴽ' },
                    { ar: 'ب', en: 'Ba (ب)', fr: 'Ba (ب)', es: 'Ba (ب)', zgh: 'ⴱ' },
                    { ar: 'ت', en: 'Ta (ت)', fr: 'Ta (ت)', es: 'Ta (ت)', zgh: 'ⵜ' },
                    { ar: 'ا', en: 'Alif (ا)', fr: 'Alif (ا)', es: 'Alif (ا)', zgh: 'ⴰ' }
                ],
                correctIndex: 0
            },
            {
                id: '1-2',
                question: { ar: 'أي كلمة تبدأ بحرف "ض"؟', en: 'Which word starts with "Dhad"?', fr: 'Quel mot commence par "Dhad"?', es: '¿Qué palabra empieza por "Dhad"?', zgh: 'ⵎⴰ ⵉⴳⴰ ⵡⴰⵡⴰⵍ ⵉⴱⴷⴰⵏ ⵙ "ⴹ"?' },
                options: [
                    { ar: 'شمس', en: 'Shams', fr: 'Shams', es: 'Shams', zgh: 'ⵛⴰⵎⵙ' },
                    { ar: 'قمر', en: 'Qamar', fr: 'Qamar', es: 'Qamar', zgh: 'ⵇⴰⵎⴰⵔ' },
                    { ar: 'ضوء', en: 'Daw\' (Light)', fr: 'Daw\'', es: 'Daw\'', zgh: 'ⴹⴰⵡ' },
                    { ar: 'طائر', en: 'Ta\'ir', fr: 'Ta\'ir', es: 'Ta\'ir', zgh: 'ⵟⴰⵢⵔ' }
                ],
                correctIndex: 2
            },
            {
                id: '1-3',
                question: { ar: 'ما جمع كلمة "مسلم"؟', en: 'What is the plural of "Muslim"?', fr: 'Quel est le pluriel de "Muslim"?', es: '¿Cuál es el plural de "Muslim"?', zgh: 'ⵎⴰ ⵉⴳⴰ ⵓⵎⴰⴳⵓⵜ ⵏ "ⵎⵓⵙⵍⵉⵎ"?' },
                options: [
                    { ar: 'مسلمان', en: 'Musliman', fr: 'Musliman', es: 'Musliman', zgh: 'ⵎⵓⵙⵍⵉⵎⴰⵏ' },
                    { ar: 'مسلمون', en: 'Muslimoon', fr: 'Muslimoon', es: 'Muslimoon', zgh: 'ⵎⵓⵙⵍⵉⵎⵓⵏ' },
                    { ar: 'مسلمات', en: 'Muslimat', fr: 'Muslimat', es: 'Muslimat', zgh: 'ⵎⵓⵙⵍⵉⵎⴰⵜ' },
                    { ar: 'سالم', en: 'Salim', fr: 'Salim', es: 'Salim', zgh: 'ⵙⴰⵍⵉⵎ' }
                ],
                correctIndex: 1
            }
        ]
    },
    {
        id: 2,
        title: { ar: 'المستوى الثاني: معاني الكلمات', en: 'Level 2: Meanings', fr: 'Niveau 2', es: 'Nivel 2', zgh: 'ⴰⵙⵡⵉⵔ 2' },
        questions: [
            {
                id: '2-1',
                question: { ar: 'ما معنى كلمة "الصلاة"؟', en: 'What does "Salah" mean?', fr: 'Que signifie "Salah"?', es: '¿Qué significa "Salah"?', zgh: 'ⵎⴰ ⵉⴳⴰ ⵓⵏⴰⵎⴽ ⵏ "ⵜⵥⴰⵍⵍⵉⵜ"?' },
                options: [
                    { ar: 'الصيام', en: 'Fasting', fr: 'Jeûne', es: 'Ayuno', zgh: 'ⵓⵥⵓⵎ' },
                    { ar: 'الدعاء والعبادة', en: 'Prayer & Worship', fr: 'Prière', es: 'Oración', zgh: 'ⵜⴰⵥⴰⵍⵍⵉⵜ' },
                    { ar: 'الحج', en: 'Pilgrimage', fr: 'Pèlerinage', es: 'Peregrinaje', zgh: 'ⵍⵃⵉⵊⵊ' },
                    { ar: 'الزكاة', en: 'Charity', fr: 'Charité', es: 'Caridad', zgh: 'ⵣⵣⴰⴽⴰⵜ' }
                ],
                correctIndex: 1
            },
            {
                id: '2-2',
                question: { ar: 'ما معنى "الرحيم"؟', en: 'What does "Ar-Rahim" mean?', fr: 'Que signifie "Ar-Rahim"?', es: '¿Qué significa "Ar-Rahim"?', zgh: 'ⵎⴰ ⵉⴳⴰ ⵓⵏⴰⵎⴽ ⵏ "ⵔⵔⴰⵃⵉⵎ"?' },
                options: [
                    { ar: 'القوي', en: 'The Strong', fr: 'Le Fort', es: 'El Fuerte', zgh: 'ⴰⵎⴷⵓⵔⵔⵓ' },
                    { ar: 'الخالق', en: 'The Creator', fr: 'Le Créateur', es: 'El Creador', zgh: 'ⴰⵎⵅⵍⵓⵇ' },
                    { ar: 'واسع الرحمة', en: 'The Merciful', fr: 'Le Miséricordieux', es: 'El Misericordioso', zgh: 'ⴰⵎⴰⵍⵍⴰⵢ' },
                    { ar: 'الملك', en: 'The King', fr: 'Le Roi', es: 'El Rey', zgh: 'ⴰⴳⵍⵍⵉⴷ' }
                ],
                correctIndex: 2
            }
        ]
    },
    {
        id: 3,
        title: { ar: 'المستوى الثالث: القرآن الكريم', en: 'Level 3: Quran', fr: 'Niveau 3', es: 'Nivel 3', zgh: 'ⴰⵙⵡⵉⵔ 3' },
        questions: [
            {
                id: '3-1',
                question: { ar: 'أكمل الآية الكريمة: "الحمد لله رب ____"', en: 'Complete the verse: "Alhamdu lillahi rabbi ____"', fr: 'Complétez le verset : "Alhamdu lillahi rabbi ____"', es: 'Completa el verso: "Alhamdu lillahi rabbi ____"', zgh: 'ⴽⵎⵎⵍ ⴰⵢⴰ: "ⵍⵃⴰⵎⴷⵓ ⵍⵉⵍⵍⴰⵀⵉ ⵕⴱⴱⵉ ____"' },
                options: [
                    { ar: 'الناس', en: 'An-Nas', fr: 'An-Nas', es: 'An-Nas', zgh: 'ⵏⵏⴰⵙ' },
                    { ar: 'العالمين', en: 'Al-Alameen', fr: 'Al-Alameen', es: 'Al-Alameen', zgh: 'ⵍⵄⴰⵍⴰⵎⵉⵏ' },
                    { ar: 'الفلق', en: 'Al-Falaq', fr: 'Al-Falaq', es: 'Al-Falaq', zgh: 'ⵍⴼⴰⵍⴰⵇ' },
                    { ar: 'الرحيم', en: 'Ar-Rahim', fr: 'Ar-Rahim', es: 'Ar-Rahim', zgh: 'ⵔⵔⴰⵃⵉⵎ' }
                ],
                correctIndex: 1
            },
            {
                id: '3-2',
                question: { ar: 'كم عدد سور القرآن الكريم؟', en: 'How many Surahs in Quran?', fr: 'Combien de sourates?', es: '¿Cuántas suras?', zgh: 'ⵎⵏⵏⴰⵡ ⵜⵉⵙⵓⵔⵉⵏ?' },
                options: [
                    { ar: '110', en: '110', fr: '110', es: '110', zgh: '110' },
                    { ar: '114', en: '114', fr: '114', es: '114', zgh: '114' },
                    { ar: '120', en: '120', fr: '120', es: '120', zgh: '120' },
                    { ar: '100', en: '100', fr: '100', es: '100', zgh: '100' }
                ],
                correctIndex: 1
            }
        ]
    }
];

export interface QuranLevel {
    id: number;
    title: Record<Language, string>;
    type: 'arrange' | 'complete';
    content: {
        verses: string[]; // For arrange: correct order of verses. For complete: verse parts
        missingWord?: string; // For complete
        options?: string[]; // For complete
    }
}

export const quranGameData: QuranLevel[] = [
    {
        id: 1,
        title: { ar: 'سورة الفاتحة', en: 'Surah Al-Fatiha', fr: 'Sourate Al-Fatiha', es: 'Sura Al-Fatiha', zgh: 'ⵜⴰⵙⵓⵔⵜ ⵏ ⵍⴼⴰⵜⵉⵃⴰ' },
        type: 'arrange',
        content: {
            verses: [
                'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
                'الرَّحْمَٰنِ الرَّحِيمِ',
                'مَالِكِ يَوْمِ الدِّينِ',
                'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ'
            ]
        }
    },
    {
        id: 2,
        title: { ar: 'سورة الإخلاص', en: 'Surah Al-Ikhlas', fr: 'Sourate Al-Ikhlas', es: 'Sura Al-Ikhlas', zgh: 'ⵜⴰⵙⵓⵔⵜ ⵏ ⵍⵉⵅⵍⴰⵚ' },
        type: 'complete',
        content: {
            verses: ['قُلْ هُوَ اللَّهُ أَحَدٌ', 'اللَّهُ الصَّمَدُ', 'لَمْ يَلِدْ وَلَمْ ___', 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ'],
            missingWord: 'يُولَدْ',
            options: ['يُولَدْ', 'يَكُنْ', 'أَحَدٌ', 'الصَّمَدُ']
        }
    },
    {
        id: 3,
        title: { ar: 'سورة الكوثر', en: 'Surah Al-Kawthar', fr: 'Sourate Al-Kawthar', es: 'Sura Al-Kawthar', zgh: 'ⵜⴰⵙⵓⵔⵜ ⵏ ⵍⴽⴰⵡⵜⴰⵔ' },
        type: 'arrange',
        content: {
            verses: [
                'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
                'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
                'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ'
            ]
        }
    },
    {
        id: 4,
        title: { ar: 'سورة الفلق', en: 'Surah Al-Falaq', fr: 'Sourate Al-Falaq', es: 'Sura Al-Falaq', zgh: 'ⵜⴰⵙⵓⵔⵜ ⵏ ⵍⴼⴰⵍⴰⵇ' },
        type: 'complete',
        content: {
            verses: ['قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', 'مِن شَرِّ مَا خَلَقَ', 'وَمِن شَرِّ غَاسِقٍ إِذَا ___', 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ'],
            missingWord: 'وَقَبَ',
            options: ['وَقَبَ', 'حَسَدَ', 'خَلَقَ', 'عَقَدَ']
        }
    },
    {
        id: 5,
        title: { ar: 'سورة الناس', en: 'Surah An-Nas', fr: 'Sourate An-Nas', es: 'Sura An-Nas', zgh: 'ⵜⴰⵙⵓⵔⵜ ⵏ ⵏⵏⴰⵙ' },
        type: 'arrange',
        content: {
            verses: [
                'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
                'مَلِكِ النَّاسِ',
                'إِلَٰهِ النَّاسِ',
                'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ'
            ]
        }
    }
];

// --- Hadith Game Data ---

export interface HadithLevel {
    id: number;
    pairs: {
        id: string;
        part1: Record<Language, string>;
        part2: Record<Language, string>;
        fullText: Record<Language, string>;
        explanation: Record<Language, string>;
    }[];
}

export const hadithGameData: HadithLevel[] = [
    {
        id: 1,
        pairs: [
            {
                id: 'h1',
                part1: { ar: 'خيركم', en: 'The best of you', fr: 'Le meilleur', es: 'El mejor', zgh: 'ⴰⴼⵓⵍⴽⵉ ⵏⵏⵓⵏ' },
                part2: { ar: 'من تعلم القرآن وعلمه', en: 'is he who learns the Quran and teaches it', fr: 'est celui qui apprend le Coran et l\'enseigne', es: 'es quien aprende el Corán y lo enseña', zgh: 'ⵉⴳⴰ ⵡⵉⵏⵏⴰ ⵉⵍⵎⴷⵏ ⵍⵇⵓⵔⴰⵏ ⴰⵔ ⵜ ⵉⵙⵙⵍⵎⴰⴷ' },
                fullText: { ar: 'خيركم من تعلم القرآن وعلمه', en: 'The best of you is he who learns the Quran and teaches it', fr: 'Le meilleur d\'entre vous est celui qui apprend le Coran et l\'enseigne', es: 'El mejor de vosotros es quien aprende el Corán y lo enseña', zgh: 'ⵅⵢⵢⵔⴽⵓⵎ ⵎⴰⵏ ⵜⵄⵍⵍⵎ ⵍⵇⵓⵔⴰⵏ ⵡⴰ ⵄⵍⵍⵎⵀ' },
                explanation: { ar: 'أفضل المسلمين هو الذي يحفظ القرآن ويعلمه لغيره.', en: 'The best Muslim is the one who memorizes Quran and teaches it to others.', fr: 'Le meilleur musulman est celui qui mémorise le Coran et l\'enseigne aux autres.', es: 'El mejor musulmán es quien memoriza el Corán y lo enseña a otros.', zgh: 'ⴰⵎⵓⵙⵍⵎ ⵉⴼⵓⵍⴽⵉⵏ ⵉⴳⴰ ⵡⴰⴷ ⵉⵃⴼⴹⵏ ⵍⵇⵓⵔⴰⵏ ⵉⵙⵙⵍⵎⴷ ⵜ ⵉ ⵡⵉⵢⵢⴰⴹ.' }
            },
            {
                id: 'h2',
                part1: { ar: 'إنما الأعمال', en: 'Actions are', fr: 'Les actes ne valent', es: 'Las acciones son', zgh: 'ⵉⵎⵓⵙⵙⵓⵜⵏ' },
                part2: { ar: 'بالنيات', en: 'by intentions', fr: 'que par les intentions', es: 'según las intenciones', zgh: 'ⵙ ⵜⵏⵏⴰⵢⵉⵏ' },
                fullText: { ar: 'إنما الأعمال بالنيات', en: 'Actions are by intentions', fr: 'Les actes ne valent que par les intentions', es: 'Las acciones son según las intenciones', zgh: 'ⵉⵏⵏⴰⵎⴰ ⵍⴰⵄⵎⴰⵍ ⴱⵉⵏⵏⵉⵢⵢⴰⵜ' },
                explanation: { ar: 'الله يقبل أعمالنا الصالحة إذا كنا نقصد بها رضاه.', en: 'Allah accepts our good deeds if we intend them for His pleasure.', fr: 'Allah accepte nos bonnes actions si nous les faisons pour Lui plaire.', es: 'Allah acepta nuestras buenas obras si buscamos Su complacencia.', zgh: 'ⵕⴱⴱⵉ ⴰⵔ ⵉⵇⴱⴱⵍ ⵉⵎⵓⵙⵙⵓⵜⵏ ⵏⵏⵖ ⵉⵖ ⵏⴳⴰ ⵜⵉⵏⵏⴰⵢⵉⵏ ⵏⵏⵖ ⵉ ⵕⴱⴱⵉ.' }
            },
            {
                id: 'h3',
                part1: { ar: 'تبسمك في وجه أخيك', en: 'Your smile to your brother', fr: 'Ton sourire à ton frère', es: 'Tu sonrisa a tu hermano', zgh: 'ⵜⴰⴹⵚⴰ ⵏⴽ ⵉ ⴳⵎⴰⴽ' },
                part2: { ar: 'صدقة', en: 'is charity', fr: 'est une aumône', es: 'es caridad', zgh: 'ⵜⴳⴰ ⵚⴰⴹⴰⵇⴰ' },
                fullText: { ar: 'تبسمك في وجه أخيك صدقة', en: 'Your smile in the face of your brother is charity', fr: 'Ton sourire face à ton frère est une aumône', es: 'Tu sonrisa ante tu hermano es caridad', zgh: 'ⵜⴰⴱⴰⵙⵙⵓⵎⵓⴽⴰ ⴼⵉ ⵡⵊⵀⵉ ⴰⵅⵉⴽⴰ ⵚⴰⴹⴰⵇⴰ' },
                explanation: { ar: 'الابتسامة عمل طيب نؤجر عليه مثل التصدق بالمال.', en: 'Smiling is a good deed rewarded like giving money to charity.', fr: 'Sourire est une bonne action récompensée comme un don d\'argent.', es: 'Sonreír es una buena obra recompensada como dar dinero en caridad.', zgh: 'ⵜⴰⴹⵚⴰ ⵜⴳⴰ ⵜⴰⵡⵓⵔⵉ ⵉⴼⵓⵍⴽⵉⵏ ⴰⵔ ⴼⵍⵍⴰⵙ ⵏⵜⵜⴰⵙⵉ ⵍⴰⵊⵕ ⵣⵓⵏⴷ ⵚⴰⴹⴰⵇⴰ.' }
            },
            {
                id: 'h4',
                part1: { ar: 'الكلمة الطيبة', en: 'A good word', fr: 'La bonne parole', es: 'Una buena palabra', zgh: 'ⴰⵡⴰⵍ ⵉⴼⵓⵍⴽⵉⵏ' },
                part2: { ar: 'صدقة', en: 'is charity', fr: 'est une aumône', es: 'es caridad', zgh: 'ⵉⴳⴰ ⵚⴰⴹⴰⵇⴰ' },
                fullText: { ar: 'الكلمة الطيبة صدقة', en: 'A good word is charity', fr: 'La bonne parole est une aumône', es: 'Una buena palabra es caridad', zgh: 'ⵍⴽⴰⵍⵉⵎⴰ ⵜⴰⵢⵢⵉⴱⴰ ⵚⴰⴹⴰⵇⴰ' },
                explanation: { ar: 'الكلام الجميل واللطيف مع الناس يعتبر صدقة.', en: 'Speaking nicely and kindly to people is considered charity.', fr: 'Parler gentiment aux gens est considéré comme une aumône.', es: 'Hablar amablemente con la gente se considera caridad.', zgh: 'ⴰⵡⴰⵍ ⵉⵄⴷⵍⵏ ⴰⴽⴷ ⵎⴷⴷⵏ ⵉⴳⴰ ⵚⴰⴹⴰⵇⴰ.' }
            }
        ]
    }
];

// --- Champion's Path Data ---

export interface ChampionMission {
    id: number;
    text: Record<Language, string>;
    xp: number;
}

export const championsPathData: ChampionMission[] = [
    { id: 1, text: { ar: 'رتب سريرك بإتقان', en: 'Make your bed neatly', fr: 'Fais ton lit proprement', es: 'Haz tu cama', zgh: 'ⵙⴳⴰⴷⴰ ⵜⵓⵙⵓⵜ ⵏⴽ' }, xp: 10 },
    { id: 2, text: { ar: 'ساعد والدتك في المنزل', en: 'Help your mother at home', fr: 'Aide ta mère à la maison', es: 'Ayuda a tu madre en casa', zgh: 'ⵄⴰⵡⵏ ⵎⴰⵙ ⵏⴽ ⴳ ⵜⴳⵎⵎⵉ' }, xp: 20 },
    { id: 3, text: { ar: 'ابتسم في وجه 3 أشخاص', en: 'Smile at 3 people', fr: 'Souris à 3 personnes', es: 'Sonríe a 3 personas', zgh: 'ⴹⵚⴰ ⵉ 3 ⵏ ⵎⴷⴷⵏ' }, xp: 10 },
    { id: 4, text: { ar: 'قل "سبحان الله" 10 مرات', en: 'Say "SubhanAllah" 10 times', fr: 'Dis "SubhanAllah" 10 fois', es: 'Di "SubhanAllah" 10 veces', zgh: 'ⵉⵏⵉ "ⵙⵓⴱⵃⴰⵏ ⴰⵍⵍⴰⵀ" 10 ⵏ ⵜⵡⴰⵍ' }, xp: 15 },
    { id: 5, text: { ar: 'نظف غرفتك لمدة 5 دقائق', en: 'Clean your room for 5 mins', fr: 'Nettoie ta chambre pendant 5 min', es: 'Limpia tu habitación por 5 min', zgh: 'ⵙⵣⴳⴳ ⵜⴰⵅⴰⵎⵜ ⵏⴽ 5 ⵏ ⵜⵓⵙⴷⵉⴷⵉⵏ' }, xp: 20 },
    { id: 6, text: { ar: 'شارك لعبة مع صديقك أو أخيك', en: 'Share a toy with a friend', fr: 'Partage un jouet', es: 'Comparte un juguete', zgh: 'ⴱⴹⵓ ⵓⵔⴰⵔ ⴰⴽⴷ ⴰⵎⴷⴷⴰⴽⴽⵯⵍ' }, xp: 25 },
    { id: 7, text: { ar: 'اقرأ صفحة من القرآن', en: 'Read a page of Quran', fr: 'Lis une page du Coran', es: 'Lee una página del Corán', zgh: 'ⵖⵔ ⵢⴰⵜ ⵜⴰⴼⵔⵜ ⵏ ⵍⵇⵓⵔⴰⵏ' }, xp: 30 },
    { id: 8, text: { ar: 'تصدق بقطعة نقود', en: 'Donate a coin', fr: 'Donne une pièce', es: 'Dona una moneda', zgh: 'ⵙⴷⴷⵇ ⵢⴰⵜ ⵜⴰⵇⴰⵔⵉⴹⵜ' }, xp: 20 }
];
