


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

const hadithPool = [
    {
        part1: { ar: 'خيركم', en: 'The best of you', fr: 'Le meilleur', es: 'El mejor', zgh: 'ⴰⴼⵓⵍⴽⵉ ⵏⵏⵓⵏ' },
        part2: { ar: 'من تعلم القرآن وعلمه', en: 'learns Quran and teaches it', fr: 'apprend le Coran et l\'enseigne', es: 'aprende el Corán y lo enseña', zgh: 'ⵉⵍⵎⴷ ⵍⵇⵓⵔⴰⵏ ⵉⵙⵙⵍⵎⴷ ⵜ' },
        fullText: { ar: 'خيركم من تعلم القرآن وعلمه', en: 'The best of you is he who learns the Quran and teaches it', fr: 'Le meilleur d\'entre vous est celui qui apprend le Coran et l\'enseigne', es: 'El mejor de vosotros es quien aprende el Corán y lo enseña', zgh: 'ⵅⵢⵢⵔⴽⵓⵎ ⵎⴰⵏ ⵜⵄⵍⵍⵎ ⵍⵇⵓⵔⴰⵏ ⵡⴰ ⵄⵍⵍⵎⵀ' },
        explanation: { ar: 'أفضل المسلمين هو الذي يحفظ القرآن ويعلمه لغيره.', en: 'The best Muslim is the one who memorizes Quran and teaches it.', fr: 'Le meilleur musulman est celui qui mémorise le Coran et l\'enseigne.', es: 'El mejor musulmán es quien memoriza el Corán y lo enseña.', zgh: 'ⴰⵎⵓⵙⵍⵎ ⵉⴼⵓⵍⴽⵉⵏ ⵉⴳⴰ ⵡⴰⴷ ⵉⵃⴼⴹⵏ ⵍⵇⵓⵔⴰⵏ ⵉⵙⵙⵍⵎⴷ ⵜ.' }
    },
    {
        part1: { ar: 'إنما الأعمال', en: 'Actions are', fr: 'Les actes ne valent', es: 'Las acciones son', zgh: 'ⵉⵎⵓⵙⵙⵓⵜⵏ' },
        part2: { ar: 'بالنيات', en: 'by intentions', fr: 'que par les intentions', es: 'según las intenciones', zgh: 'ⵙ ⵜⵏⵏⴰⵢⵉⵏ' },
        fullText: { ar: 'إنما الأعمال بالنيات', en: 'Actions are by intentions', fr: 'Les actes ne valent que par les intentions', es: 'Las acciones son según las intenciones', zgh: 'ⵉⵏⵏⴰⵎⴰ ⵍⴰⵄⵎⴰⵍ ⴱⵉⵏⵏⵉⵢⵢⴰⵜ' },
        explanation: { ar: 'الله يقبل أعمالنا الصالحة إذا كنا نقصد بها رضاه.', en: 'Allah accepts our good deeds if we intend them for His pleasure.', fr: 'Allah accepte nos bonnes actions si nous les faisons pour Lui plaire.', es: 'Allah acepta nuestras buenas obras si buscamos Su complacencia.', zgh: 'ⵕⴱⴱⵉ ⴰⵔ ⵉⵇⴱⴱⵍ ⵉⵎⵓⵙⵙⵓⵜⵏ ⵏⵏⵖ ⵉⵖ ⵏⴳⴰ ⵜⵉⵏⵏⴰⵢⵉⵏ ⵏⵏⵖ ⵉ ⵕⴱⴱⵉ.' }
    },
    {
        part1: { ar: 'تبسمك في وجه أخيك', en: 'Your smile to your brother', fr: 'Ton sourire à ton frère', es: 'Tu sonrisa a tu hermano', zgh: 'ⵜⴰⴹⵚⴰ ⵏⴽ ⵉ ⴳⵎⴰⴽ' },
        part2: { ar: 'صدقة', en: 'is charity', fr: 'est une aumône', es: 'es caridad', zgh: 'ⵜⴳⴰ ⵚⴰⴹⴰⵇⴰ' },
        fullText: { ar: 'تبسمك في وجه أخيك صدقة', en: 'Your smile in the face of your brother is charity', fr: 'Ton sourire face à ton frère est une aumône', es: 'Tu sonrisa ante tu hermano es caridad', zgh: 'ⵜⴰⴱⴰⵙⵙⵓⵎⵓⴽⴰ ⴼⵉ ⵡⵊⵀⵉ ⴰⵅⵉⴽⴰ ⵚⴰⴹⴰⵇⴰ' },
        explanation: { ar: 'الابتسامة عمل طيب نؤجر عليه مثل التصدق بالمال.', en: 'Smiling is a good deed rewarded like giving money to charity.', fr: 'Sourire est une bonne action récompensée comme un don d\'argent.', es: 'Sonreír es una buena obra recompensada como dar dinero en caridad.', zgh: 'ⵜⴰⴹⵚⴰ ⵜⴳⴰ ⵜⴰⵡⵓⵔⵉ ⵉⴼⵓⵍⴽⵉⵏ ⴰⵔ ⴼⵍⵍⴰⵙ ⵏⵜⵜⴰⵙⵉ ⵍⴰⵊⵕ ⵣⵓⵏⴷ ⵚⴰⴹⴰⵇⴰ.' }
    },
    {
        part1: { ar: 'الكلمة الطيبة', en: 'A good word', fr: 'La bonne parole', es: 'Una buena palabra', zgh: 'ⴰⵡⴰⵍ ⵉⴼⵓⵍⴽⵉⵏ' },
        part2: { ar: 'صدقة', en: 'is charity', fr: 'est une aumône', es: 'es caridad', zgh: 'ⵉⴳⴰ ⵚⴰⴹⴰⵇⴰ' },
        fullText: { ar: 'الكلمة الطيبة صدقة', en: 'A good word is charity', fr: 'La bonne parole est une aumône', es: 'Una buena palabra es caridad', zgh: 'ⵍⴽⴰⵍⵉⵎⴰ ⵜⴰⵢⵢⵉⴱⴰ ⵚⴰⴹⴰⵇⴰ' },
        explanation: { ar: 'الكلام الجميل واللطيف مع الناس يعتبر صدقة.', en: 'Speaking nicely and kindly to people is considered charity.', fr: 'Parler gentiment aux gens est considéré comme une aumône.', es: 'Hablar amablemente con la gente se considera caridad.', zgh: 'ⴰⵡⴰⵍ ⵉⵄⴷⵍⵏ ⴰⴽⴷ ⵎⴷⴷⵏ ⵉⴳⴰ ⵚⴰⴹⴰⵇⴰ.' }
    },
    {
        part1: { ar: 'من غشنا', en: 'Who cheats us', fr: 'Qui nous trompe', es: 'Quien nos engaña', zgh: 'ⵡⴰⵏⵏⴰ ⴰⵖ ⵉⵖⴷⵕⵏ' },
        part2: { ar: 'فليس منا', en: 'is not of us', fr: 'n\'est pas des nôtres', es: 'no es de nosotros', zgh: 'ⵓⵔ ⵉⴳⵉ ⴳⵉⵜⵏⵖ' },
        fullText: { ar: 'من غشنا فليس منا', en: 'He who cheats us is not one of us', fr: 'Celui qui nous trompe n\'est pas des nôtres', es: 'Quien nos engaña no es de nosotros', zgh: 'ⵎⴰⵏ ⵖⵛⵛⴰⵏⴰ ⴼⴰⵍⴰⵢⵙⴰ ⵎⵉⵏⵏⴰ' },
        explanation: { ar: 'المسلم الصادق لا يغش أبداً في أي شيء.', en: 'A true Muslim never cheats in anything.', fr: 'Un vrai musulman ne triche jamais.', es: 'Un verdadero musulmán nunca hace trampa.', zgh: 'ⴰⵎⵓⵙⵍⵎ ⵉⵙⴷⵉⴷⵏ ⵓⵔ ⴰⵔ ⵉⵜⵜⵖⴹⴰⵕ.' }
    },
    {
        part1: { ar: 'الدين', en: 'The Religion is', fr: 'La religion est', es: 'La religión es', zgh: 'ⴷⴷⵉⵏ ⵉⴳⴰ' },
        part2: { ar: 'النصيحة', en: 'sincerity/advice', fr: 'le bon conseil', es: 'el consejo sincero', zgh: 'ⵜⴰⵏⵚⵉⵃⵜ' },
        fullText: { ar: 'الدين النصيحة', en: 'The Religion is sincerity (and good advice)', fr: 'La religion, c\'est le bon conseil', es: 'La religión es el consejo sincero', zgh: 'ⴰⴷⴷⵉⵏⵓ ⵏⵏⴰⵚⵉⵃⴰ' },
        explanation: { ar: 'أساس ديننا هو الإخلاص والنصح للغير بالخير.', en: 'Our religion is based on sincerity and wishing good for others.', fr: 'Notre religion est basée sur la sincérité et le bon conseil.', es: 'Nuestra religión se basa en la sinceridad y el buen consejo.', zgh: 'ⵍⵙⴰⵙ ⵏ ⴷⴷⵉⵏ ⵏⵏⵖ ⵉⴳⴰ ⵜⴰⵏⵚⵉⵃⵜ ⵉ ⵡⵉⵢⵢⴰⴹ.' }
    },
    {
        part1: { ar: 'لا يرحم الله', en: 'Allah does not show mercy', fr: 'Allah ne fait pas miséricorde', es: 'Allah no muestra misericordia', zgh: 'ⵓⵔ ⴰⵔ ⵉⵜⵜⵃⵏⵏⵓ ⵕⴱⴱⵉ' },
        part2: { ar: 'من لا يرحم الناس', en: 'to who is not merciful to people', fr: 'à celui qui n\'est pas miséricordieux', es: 'a quien no es misericordioso', zgh: 'ⵉ ⵡⴰⵏⵏⴰ ⵓⵔ ⵉⵜⵜⵃⵏⵏⵓⵏ ⴳ ⵎⴷⴷⵏ' },
        fullText: { ar: 'لا يرحم الله من لا يرحم الناس', en: 'Allah does not show mercy to him who is not merciful to people', fr: 'Allah ne fait pas miséricorde à celui qui n\'est pas miséricordieux envers les gens', es: 'Allah no muestra misericordia a quien no es misericordioso con la gente', zgh: 'ⵍⴰ ⵢⴰⵔⵃⴰⵎⵓ ⵍⵍⴰⵀ ⵎⴰⵏ ⵍⴰ ⵢⴰⵔⵃⴰⵎ ⵏⵏⴰⵙ' },
        explanation: { ar: 'يجب أن نكون رحماء مع الآخرين ليرحمنا الله.', en: 'We must be merciful to others so Allah will be merciful to us.', fr: 'Nous devons être miséricordieux pour qu\'Allah le soit avec nous.', es: 'Debemos ser misericordiosos para que Allah lo sea con nosotros.', zgh: 'ⵉⵅⵚⵚⴰ ⴰ ⵏⵜⵜⵃⵏⵏⵓ ⴳ ⵎⴷⴷⵏ ⴱⴰⵛ ⴰ ⴳⵉⵜⵏⵖ ⵉⵃⵏⵏⵓ ⵕⴱⴱⵉ.' }
    },
    {
        part1: { ar: 'الطهور', en: 'Cleanliness is', fr: 'La pureté est', es: 'La limpieza es', zgh: 'ⵜⴰⵣⴳⴳⴰ' },
        part2: { ar: 'شطر الإيمان', en: 'half of faith', fr: 'la moitié de la foi', es: 'la mitad de la fe', zgh: 'ⴰⵣⴳⵏ ⵏ ⵍⵉⵎⴰⵏ' },
        fullText: { ar: 'الطهور شطر الإيمان', en: 'Cleanliness is half of faith', fr: 'La pureté est la moitié de la foi', es: 'La limpieza es la mitad de la fe', zgh: 'ⴰⵟⵟⵓⵀⵓⵔ ⵛⴰⵟⵕ ⵍⵉⵎⴰⵏ' },
        explanation: { ar: 'النظافة والطهارة جزء مهم جداً من إيمان المسلم.', en: 'Cleanliness and purity are a very important part of a Muslim\'s faith.', fr: 'La propreté est une partie très importante de la foi.', es: 'La limpieza es una parte muy importante de la fe.', zgh: 'ⵜⴰⵣⴳⴳⴰ ⵜⴳⴰ ⴰⴳⵣⵣⵓⵎ ⵉⵎⵇⵇⵓⵔⵏ ⴳ ⵍⵉⵎⴰⵏ.' }
    },
    {
        part1: { ar: 'تهادوا', en: 'Exchange gifts', fr: 'Échangez des cadeaux', es: 'Intercambiad regalos', zgh: 'ⵙⵙⴼⴽⴰⵢⴰⵜ ⵜⵉⵡⵡⵓⵔⴳⵉⵡⵉⵏ' },
        part2: { ar: 'تحابوا', en: 'you will love one another', fr: 'vous vous aimerez', es: 'os amaréis', zgh: 'ⴰⴷ ⵜⵜⵉⵎⵉⵔⵉⵎ' },
        fullText: { ar: 'تهادوا تحابوا', en: 'Exchange gifts, as that will lead to increasing your love to one another', fr: 'Échangez des cadeaux, vous vous aimerez', es: 'Intercambiad regalos, os amaréis', zgh: 'ⵜⴰⵀⴰⴷⴰⵡ ⵜⴰⵃⴰⴱⴱⴰⵡ' },
        explanation: { ar: 'تقديم الهدايا يزيد المحبة والمودة بين الناس.', en: 'Giving gifts increases love and affection between people.', fr: 'Offrir des cadeaux augmente l\'amour entre les gens.', es: 'Dar regalos aumenta el amor entre las personas.', zgh: 'ⵜⵉⵡⵡⵓⵔⴳⵉⵡⵉⵏ ⴰⵔ ⵙⵣⴰⵢⴷⵏⵜ ⵜⴰⵢⵔⵉ ⴳⵔ ⵎⴷⴷⵏ.' }
    },
    {
        part1: { ar: 'المسلم', en: 'A Muslim is', fr: 'Le musulman est', es: 'El musulmán es', zgh: 'ⴰⵎⵓⵙⵍⵎ' },
        part2: { ar: 'أخو المسلم', en: 'brother of a Muslim', fr: 'frère du musulman', es: 'hermano del musulmán', zgh: 'ⵉⴳⴰ ⴳⵯⵎⴰⵙ ⵏ ⵓⵎⵓⵙⵍⵎ' },
        fullText: { ar: 'المسلم أخو المسلم', en: 'A Muslim is a brother of another Muslim', fr: 'Le musulman est le frère du musulman', es: 'El musulmán es hermano del musulmán', zgh: 'ⴰⵍⵎⵓⵙⵍⵉⵎ ⴰⵅⵓ ⵍⵎⵓⵙⵍⵉⵎ' },
        explanation: { ar: 'كل المسلمين إخوة، يجب أن يساعد بعضهم بعضاً.', en: 'All Muslims are brothers; they should help each other.', fr: 'Tous les musulmans sont frères, ils doivent s\'entraider.', es: 'Todos los musulmanes son hermanos, deben ayudarse mutuamente.', zgh: 'ⴽⵓⵍⵍⵓ ⵉⵎⵓⵙⵍⵎⵏ ⴳⴰⵏ ⴰⵢⵜⵎⴰⵜⵏ.' }
    },
    {
        part1: { ar: 'لا يؤمن أحدكم', en: 'None of you believes', fr: 'Nul n\'est croyant', es: 'Nadie cree', zgh: 'ⵓⵔ ⵉⵓⵎⵏ ⵢⴰⵏ ⴳⵉⵜⵓⵏ' },
        part2: { ar: 'حتى يحب لأخيه ما يحب لنفسه', en: 'until he loves for his brother what he loves for himself', fr: 'tant qu\'il n\'aime pour son frère ce qu\'il aime pour lui-même', es: 'hasta que ame para su hermano lo que ama para sí mismo', zgh: 'ⴰⵔ ⵉⵔⴰ ⵉ ⴳⵯⵎⴰⵙ ⴰⵢⵏⵏⴰ ⵉⵔⴰ ⵉ ⵉⵅⴼ ⵏⵏⵙ' },
        fullText: { ar: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه', en: 'None of you truly believes until he loves for his brother what he loves for himself', fr: 'Nul de vous n\'est vraiment croyant tant qu\'il n\'aime pas pour son frère ce qu\'il aime pour lui-même', es: 'Ninguno de vosotros cree verdaderamente hasta que ame para su hermano lo que ama para sí mismo', zgh: 'ⵍⴰ ⵢⵓⵎⵉⵏⵓ ⴰⵃⴰⴷⵓⴽⵓⵎ ⵃⵜⵜⴰ ⵢⵓⵃⵉⴱⴱⴰ ⵍⵉ ⴰⵅⵉⵀ ⵎⴰ ⵢⵓⵃⵉⴱⴱⵓ ⵍⵉ ⵏⴰⴼⵙⵉⵀ' },
        explanation: { ar: 'من كمال الإيمان أن تتمنى الخير لغيرك كما تتمناه لنفسك.', en: 'True faith means wishing good for others just as you wish it for yourself.', fr: 'La vraie foi, c\'est de souhaiter le bien aux autres comme à soi-même.', es: 'La verdadera fe es desear el bien a los demás como a uno mismo.', zgh: 'ⵍⵉⵎⴰⵏ ⵉⴽⵎⵍⵏ ⵉⴳⴰ ⴰⴷ ⵜⵔⵉⵜ ⵍⵅⵉⵔ ⵉ ⵡⵉⵢⵢⴰⴹ ⵣⵓⵏⴷ ⵉⵅⴼ ⵏⴽ.' }
    },
    {
        part1: { ar: 'خير الناس', en: 'The best of people', fr: 'Le meilleur des gens', es: 'La mejor gente', zgh: 'ⴰⴼⵓⵍⴽⵉ ⵏ ⵎⴷⴷⵏ' },
        part2: { ar: 'أنفعهم للناس', en: 'is the most beneficial to people', fr: 'est le plus utile aux gens', es: 'es el más beneficioso para la gente', zgh: 'ⵉⴳⴰ ⵡⴰⵏⵏⴰ ⵜⵏ ⵉⵏⴼⵄⵏ' },
        fullText: { ar: 'خير الناس أنفعهم للناس', en: 'The best of people are those that are most beneficial to others', fr: 'Le meilleur des gens est celui qui est le plus utile aux autres', es: 'La mejor de las personas es la que más beneficia a los demás', zgh: 'ⵅⵢⵔ ⵏⵏⴰⵙ ⴰⵏⴼⵄⵀⵓⵎ ⵍⵉⵏⵏⴰⵙ' },
        explanation: { ar: 'أحب الناس إلى الله هو من يساعد الآخرين وينفعهم.', en: 'The most beloved to Allah is the one who helps and benefits others.', fr: 'Le plus aimé d\'Allah est celui qui aide et est utile aux autres.', es: 'El más amado por Allah es quien ayuda y beneficia a los demás.', zgh: 'ⴰⵏⵏⴰ ⵉⵄⵣⵣⴰⵏ ⴷⴰⵔ ⵕⴱⴱⵉ ⵉⴳⴰ ⵡⴰⵏⵏⴰ ⵉⵜⵜⵄⴰⵡⴰⵏⵏ ⵎⴷⴷⵏ.' }
    },
    {
        part1: { ar: 'من سلك طريقاً', en: 'Who walks a path', fr: 'Celui qui emprunte un chemin', es: 'Quien recorre un camino', zgh: 'ⵡⴰⵏⵏⴰ ⵉⵣⵔⵉⵏ ⴳ ⵓⵖⴰⵔⴰⵙ' },
        part2: { ar: 'يلتمس فيه علماً', en: 'seeking knowledge', fr: 'à la recherche du savoir', es: 'buscando conocimiento', zgh: 'ⵉⴳ ⵉⵔⴰ ⵍⵄⵉⵍⵎ' },
        fullText: { ar: 'من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة', en: 'Whoever follows a path to seek knowledge, Allah will make easy for him a path to Paradise', fr: 'Celui qui emprunte un chemin à la recherche du savoir, Allah lui facilite un chemin vers le Paradis', es: 'Quien sigue un camino en busca de conocimiento, Allah le facilita un camino al Paraíso', zgh: 'ⵎⴰⵏ ⵙⴰⵍⴰⴽⴰ ⵟⴰⵔⵉⵇⴰⵏ ⵢⴰⵍⵜⴰⵎⵉⵙⵓ ⴼⵉⵀⵉ ⵄⵉⵍⵎⴰⵏ' },
        explanation: { ar: 'طلب العلم طريق يوصلنا إلى الجنة.', en: 'Seeking knowledge is a path that leads us to Paradise.', fr: 'La recherche du savoir mène au Paradis.', es: 'Buscar conocimiento lleva al Paraíso.', zgh: 'ⴰⵙⵉⴳⴳⵍ ⵏ ⵍⵄⵉⵍⵎ ⴰⵔ ⴰⵖ ⵉⵙⵙⵉⵡⵉⴹ ⵙ ⵍⵊⵏⵏⵜ.' }
    },
    {
        part1: { ar: 'إماطة الأذى', en: 'Removing harm', fr: 'Enlever ce qui nuit', es: 'Quitar el daño', zgh: 'ⴰⴷ ⵜⴽⴽⵙⵜ ⴰⵣⵣⴰⵢ' },
        part2: { ar: 'عن الطريق صدقة', en: 'from the path is charity', fr: 'du chemin est une aumône', es: 'del camino es caridad', zgh: 'ⴳ ⵓⵖⴰⵔⴰⵙ ⵉⴳⴰ ⵚⴰⴹⴰⵇⴰ' },
        fullText: { ar: 'إماطة الأذى عن الطريق صدقة', en: 'Removing harmful things from the path is a charity', fr: 'Enlever ce qui nuit du chemin est une aumône', es: 'Quitar cosas dañinas del camino es caridad', zgh: 'ⵉⵎⴰⵟⴰⵜⵓ ⵍⴰⴷⴰ ⵄⴰⵏⵉ ⵟⵟⴰⵔⵉⵇ ⵚⴰⴹⴰⵇⴰ' },
        explanation: { ar: 'إبعاد ما يؤذي الناس عن طريقهم عمل صالح.', en: 'Removing what harms people from their way is a good deed.', fr: 'Écarter ce qui blesse les gens de leur chemin est une bonne action.', es: 'Alejar lo que daña a la gente de su camino es una buena acción.', zgh: 'ⴰⴷ ⵜⴽⴽⵙⵜ ⴰⵢⵏⵏⴰ ⵉضرⵕⵏ ⵎⴷⴷⵏ ⴳ ⵓⵖⴰⵔⴰⵙ ⵏⵏⵙⵏ ⵉⴳⴰ ⵍⵅⵉⵔ.' }
    },
    {
        part1: { ar: 'المؤمن القوي', en: 'The strong believer', fr: 'Le croyant fort', es: 'El creyente fuerte', zgh: 'ⴰⵎⵓⵎⵏ ⵉⴷⵓⵙⵏ' },
        part2: { ar: 'خير وأحب إلى الله', en: 'is better and more beloved to Allah', fr: 'est meilleur et plus aimé d\'Allah', es: 'es mejor y más amado por Allah', zgh: 'ⵉⴼⵓⵍⴽⵉ ⵉⵄⵣⵣⴰ ⴷⴰⵔ ⵕⴱⴱⵉ' },
        fullText: { ar: 'المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف', en: 'The strong believer is better and more beloved to Allah than the weak believer', fr: 'Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible', es: 'El creyente fuerte es mejor y más amado por Allah que el creyente débil', zgh: 'ⵍⵎⵓⵎⵉⵏ ⵍⵇⴰⵡⵉ ⵅⴰⵢⵔⵓⵏ ⵡⴰ ⴰⵃⴰⴱⴱⵓ ⵉⵍⴰ ⵍⵍⴰⵀ' },
        explanation: { ar: 'الله يحب المؤمن القوي في إيمانه وجسده وعلمه.', en: 'Allah loves the believer who is strong in faith, body, and knowledge.', fr: 'Allah aime le croyant fort dans sa foi, son corps et son savoir.', es: 'Allah ama al creyente fuerte en su fe, cuerpo y conocimiento.', zgh: 'ⵕⴱⴱⵉ ⵉⵃⵎⵍ ⴰⵎⵓⵎⵏ ⵉⴷⵓⵙⵏ ⴳ ⵍⵉⵎⴰⵏ ⵏⵏⵙ ⴷ ⵍⵄⵉⵍⵎ ⵏⵏⵙ.' }
    }
];

export const hadithGameData: HadithLevel[] = [];

// Generate 20 levels using the pool
for (let i = 1; i <= 20; i++) {
    // Each level needs enough pairs for 30 stages.
    // Max pairs per stage is 4 (Stage 21-30).
    // Total pairs needed: (10*2) + (10*3) + (10*4) = 20 + 30 + 40 = 90 pairs per level.
    // We will cycle through the pool to generate unique IDs for each instance.

    const levelPairs = [];
    for (let j = 0; j < 120; j++) { // Generate 120 pairs to be safe
        const poolIndex = j % hadithPool.length;
        const hadith = hadithPool[poolIndex];
        const id = `l${i}_p${j}`;

        levelPairs.push({
            id,
            part1: hadith.part1,
            part2: hadith.part2,
            fullText: hadith.fullText,
            explanation: hadith.explanation
        });
    }

    hadithGameData.push({
        id: i,
        pairs: levelPairs
    });
}

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
