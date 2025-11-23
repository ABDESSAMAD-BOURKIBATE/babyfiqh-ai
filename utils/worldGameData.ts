
import { Language } from './translations';

export interface Scenario {
    id: number;
    text: Record<Language, string>;
    choices: {
        text: Record<Language, string>;
        impact: number; // Positive adds to health, Negative subtracts
        feedback: Record<Language, string>;
        type: 'value' | 'harm';
    }[];
}

export const WORLD_SCENARIOS: Scenario[] = [
    // --- Digital Ethics ---
    {
        id: 1,
        text: {
            ar: 'وصلتك رسالة تحتوي على خبر خطير غير مؤكد عن صديق، ماذا تفعل؟',
            en: 'You received a message with unverified news about a friend. What do you do?',
            fr: 'Vous avez reçu un message avec des nouvelles non vérifiées sur un ami.',
            es: 'Recibiste un mensaje con noticias no verificadas sobre un amigo.',
            zgh: 'ⵜⵍⴽⵎ ⴽ ⴷ ⵜⴱⵔⴰⵜ ⴳⵉⵙ ⵉⵙⴰⵍⵏ ⵓⵔ ⵉⵜⵜⵓⵙⵏⵄⴰⵜⵏ ⵅⴼ ⵓⵎⴷⴷⴰⴽⴽⵯⵍ ⵏⴽ.'
        },
        choices: [
            {
                text: { ar: 'أنشرها فوراً للجميع', en: 'Share it immediately', fr: 'Partager immédiatement', es: 'Compartir inmediatamente', zgh: 'ⴰⵣⵏ ⵜ ⵉ ⴽⵓⵍⵍⵓ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'نشر الشائعات يهدم الثقة ويفسد المجتمع.', en: 'Spreading rumors destroys trust.', fr: 'Répandre des rumeurs détruit la confiance.', es: 'Difundir rumores destruye la confianza.', zgh: 'ⴰⵣⵓⵣⵣⵔ ⵏ ⵉⵙⴰⵍⵏ ⵓⵔ ⵉⵖⵣⴰⵏⵏ ⴰⵔ ⵉⵜⵜⵅⵕⵕⴰⴱ ⵜⴰⴼⵍⵙⵜ.' }
            },
            {
                text: { ar: 'أتثبت وأمتنع عن نشرها (الصدق)', en: 'Verify and do not share', fr: 'Vérifier et ne pas partager', es: 'Verificar y no compartir', zgh: 'ⵙⵙⵏ ⵉⵙ ⵉⵖⵣⴰⵏ ⵓⵔ ⵜ ⵜⴰⵣⵏⵜ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'أحسنت! {يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ}.', en: 'Great! Verification builds a safe society.', fr: 'Bravo! Vérifier construit une société sûre.', es: '¡Genial! Verificar construye una sociedad segura.', zgh: 'ⴰⵢⵢⵓⵣ! ⴰⵙⵙⵏ ⵏ ⵜⵉⴷⵜ ⴰⵔ ⵉⴱⵏⵏⵓ ⴰⵎⵓⵏ ⵉⴼⵓⵍⴽⵉⵏ.' }
            }
        ]
    },
    {
        id: 2,
        text: {
            ar: 'طلب منك شخص غريب في لعبة إلكترونية كلمة سر حسابك.',
            en: 'A stranger in an online game asked for your account password.',
            fr: 'Un inconnu dans un jeu en ligne a demandé votre mot de passe.',
            es: 'Un extraño en un juego en línea pidió tu contraseña.',
            zgh: 'ⵉⵙⵇⵙⴰ ⴽ ⵢⴰⵏ ⵓⵔ ⵜ ⵜⵙⵙⵉⵏⵜ ⴳ ⵓⵔⴰⵔ ⵅⴼ ⵜⴳⵓⵔⵉ ⵏ ⵓⵣⵔⴰⵢ ⵏⴽ.'
        },
        choices: [
            {
                text: { ar: 'أعطيه كلمة السر', en: 'Give him the password', fr: 'Lui donner le mot de passe', es: 'Darle la contraseña', zgh: 'ⴼⴽ ⴰⵙ ⵜⴰⴳⵓⵔⵉ ⵏ ⵓⵣⵔⴰⵢ' },
                impact: -20,
                type: 'harm',
                feedback: { ar: 'خطأ كبير! كشف أسرارك يعرضك للسرقة والخطر.', en: 'Big mistake! Never share passwords.', fr: 'Grosse erreur! Ne partagez jamais.', es: '¡Gran error! Nunca compartas contraseñas.', zgh: 'ⴰⵣⴳⴰⵍ ⴰⵎⵇⵔⴰⵏ! ⴰⴼⵙⴰⵔ ⵏ ⵉⵙⵔⴰⵔⵏ ⵏⴽ ⴰⵔ ⴽ ⵉⵜⵜⴰⵊⵊⴰ ⴳ ⵓⵎⵉⵣⵉ.' }
            },
            {
                text: { ar: 'أرفض وأحظر الشخص (الخصوصية)', en: 'Refuse and block', fr: 'Refuser et bloquer', es: 'Rechazar y bloquear', zgh: 'ⴰⴳⵉ ⴷ ⴱⵍⵓⴽⵉ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'ممتاز! الحفاظ على الخصوصية قوة وحماية.', en: 'Excellent! Privacy is protection.', fr: 'Excellent! La vie privée est une protection.', es: '¡Excelente! La privacidad es protección.', zgh: 'ⵉⴼⵓⵍⴽⵉ! ⴰⵃⵟⵟⵓ ⵏ ⵜⵓⵙⵙⵔⴰ ⵉⴳⴰ ⵜⴰⴼⵍⵙⵜ.' }
            }
        ]
    },
    {
        id: 3,
        text: {
            ar: 'رأيت تعليقاً مسيئاً وتنمر على منشور أحد الأصدقاء.',
            en: 'You saw an offensive comment bullying a friend.',
            fr: 'Vous avez vu un commentaire intimidant un ami.',
            es: 'Viste un comentario ofensivo intimidando a un amigo.',
            zgh: 'ⵜⵥⵕⵉⴷ ⴰⵅⴼⴰⵡⴰⵍ ⵉⵅⵛⵏⵏ ⵖⴼ ⵓⵎⴷⴷⴰⴽⴽⵯⵍ ⵏⴽ.'
        },
        choices: [
            {
                text: { ar: 'أضحك وأشارك في السخرية', en: 'Laugh and join in', fr: 'Rire et participer', es: 'Reír y unirse', zgh: 'ⴹⵚⴰ ⴰⴽⴷ ⵉⵜⵙⵏ' },
                impact: -20,
                type: 'harm',
                feedback: { ar: 'التنمر يؤذي المشاعر ويغضب الله.', en: 'Bullying hurts feelings.', fr: 'L\'intimidation blesse.', es: 'La intimidación duele.', zgh: 'ⴰⵙⵙⵉⵡⴹ ⴰⵔ ⵉⵜⵜⴰⴽⵯⴰⵢ.' }
            },
            {
                text: { ar: 'أدافع عنه بكلمة طيبة (النصرة)', en: 'Defend him kindly', fr: 'Le défendre gentiment', es: 'Defenderlo amablemente', zgh: 'ⴷⴰⴼⵄ ⴼⵍⵍⴰⵙ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'رائع! (انصر أخاك ظالماً أو مظلوماً).', en: 'Wonderful! Support your brother.', fr: 'Merveilleux! Soutenez votre frère.', es: '¡Maravilloso! Apoya a tu hermano.', zgh: 'ⵉⴼⵓⵍⴽⵉ ⴱⴰⵀⵔⴰ! ⴰⵡⵙ ⵉ ⴳⵎⴰⴽ.' }
            }
        ]
    },
    {
        id: 4,
        text: {
            ar: 'وجدت رابطاً مجهولاً يقول "اضغط هنا لتربح جائزة".',
            en: 'You found a link saying "Click here to win a prize".',
            fr: 'Lien "Cliquez ici pour gagner".',
            es: 'Enlace "Haga clic para ganar".',
            zgh: 'ⵜⵓⴼⵉⴷ ⵍⵢⴰⵏ ⵉⵏⵏⴰ ⴰⴽ "ⴰⴷⴷ ⵖⵉⴷ ⴰⴼⴰⴷ ⴰⴷ ⵜⵔⴱⵃⴷ".'
        },
        choices: [
            {
                text: { ar: 'أضغط عليه بسرعة', en: 'Click immediately', fr: 'Cliquer immédiatement', es: 'Hacer clic inmediatamente', zgh: 'ⴰⴷⴷ ⴼⵍⵍⴰⵙ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'احذر! الروابط المجهولة قد تسرق بياناتك.', en: 'Beware! Phishing links steal data.', fr: 'Attention! Liens d\'hameçonnage.', es: '¡Cuidado! Enlaces de phishing.', zgh: 'ⵔⴰⵔ ⵍⴱⴰⵍ! ⵍⵢⴰⵏ ⴰⴷ ⵉⵅⵛⵏ.' }
            },
            {
                text: { ar: 'أتجاهله وأحذفه (الحذر)', en: 'Ignore and delete', fr: 'Ignorer et supprimer', es: 'Ignorar y eliminar', zgh: 'ⴰⵊⵊ ⵜ ⵜⴽⴽⵙⵜ ⵜ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'تصرف ذكي! المؤمن كيس فطن.', en: 'Smart move! Be alert.', fr: 'Mouvement intelligent!', es: '¡Movimiento inteligente!', zgh: 'ⵜⴰⵡⵓⵔⵉ ⵉⵖⵣⴰⵏⵏ!' }
            }
        ]
    },
    {
        id: 5,
        text: {
            ar: 'حان وقت الصلاة وأنت في منتصف لعبة ممتعة.',
            en: 'Prayer time is here, but you are in the middle of a game.',
            fr: 'L\'heure de la prière, mais vous jouez.',
            es: 'Hora de rezar, pero estás jugando.',
            zgh: 'ⵜⵍⴽⵎ ⵜⵥⴰⵍⵍⵉⵜ ⴽⵢⵢⵉ ⴰⵔ ⵜⵓⵔⴰⵔⵜ.'
        },
        choices: [
            {
                text: { ar: 'أكمل اللعب وأؤخر الصلاة', en: 'Keep playing, delay prayer', fr: 'Continuer à jouer', es: 'Seguir jugando', zgh: 'ⴽⵎⵎⵍ ⵓⵔⴰⵔ' },
                impact: -25,
                type: 'harm',
                feedback: { ar: 'تأخير الصلاة يذهب بركتها. الصلاة كتاب موقوت.', en: 'Delaying prayer loses blessings.', fr: 'Retarder la prière perd des bénédictions.', es: 'Retrasar la oración pierde bendiciones.', zgh: 'ⴰⵙⵎⴰطل ⵏ ⵜⵥⴰⵍⵍⵉⵜ ⵓⵔ ⵉⴼⵓⵍⴽⵉ.' }
            },
            {
                text: { ar: 'أتوقف فوراً وأذهب للصلاة', en: 'Stop and pray', fr: 'Arrêter et prier', es: 'Parar y rezar', zgh: 'ⴱⴷⴷ ⵜⴷⴷⵓⴷ ⴰⴷ ⵜⵥⴰⵍⵍⵜ' },
                impact: 25,
                type: 'value',
                feedback: { ar: 'بارك الله فيك! الصلاة خير من اللعب.', en: 'Bless you! Prayer comes first.', fr: 'Dieu vous bénisse!', es: '¡Dios te bendiga!', zgh: 'ⵜⴱⴰⵔⴽ ⴰⵍⵍⴰⵀ! ⵜⴰⵥⴰⵍⵍⵉⵜ ⵜⵓⴼ ⵓⵔⴰⵔ.' }
            }
        ]
    },
    // --- Social & Family Ethics ---
    {
        id: 6,
        text: {
            ar: 'طلبت منك والدتك المساعدة في ترتيب المنزل.',
            en: 'Your mother asked for help cleaning the house.',
            fr: 'Ta mère a demandé de l\'aide.',
            es: 'Tu madre pidió ayuda.',
            zgh: 'ⵜⵙⵇⵙⴰ ⴽ ⵎⴰⵙ ⵏⴽ ⴰⴷ ⴰⵙ ⵜⴰⵡⵙⵜ.'
        },
        choices: [
            {
                text: { ar: 'أقول "أف" وأرفض', en: 'Say "Uff" and refuse', fr: 'Refuser', es: 'Rechazar', zgh: 'ⵉⵏⵉ "ⵓⴼ" ⵜⴰⴳⵉⴷ' },
                impact: -30,
                type: 'harm',
                feedback: { ar: 'ولا تقل لهما أف! رضا الله في رضا الوالدين.', en: 'Never disrespect parents.', fr: 'Ne manquez jamais de respect aux parents.', es: 'Nunca faltes el respeto a los padres.', zgh: 'ⴰⴷ ⵓⵔ ⵜⵉⵏⵉⵜ ⵓⴼ ⵉ ⵍⵡⴰⵍⵉⴷⴰⵢⵏ.' }
            },
            {
                text: { ar: 'أقوم فوراً وأساعدها بحب', en: 'Help immediately with love', fr: 'Aider immédiatement', es: 'Ayudar inmediatamente', zgh: 'ⵏⴽⵔ ⵖⵉⵍⴰ ⵜⴰⵡⵙⵜ ⴰⵙ' },
                impact: 30,
                type: 'value',
                feedback: { ar: 'الجنة تحت أقدام الأمهات. أحسنت!', en: 'Paradise is under mothers feet.', fr: 'Le paradis est sous les pieds des mères.', es: 'El paraíso está bajo los pies de las madres.', zgh: 'ⵍⵊⵏⵜ ⴷⴷⴰⵡ ⵉⴹⴰⵕⵏ ⵏ ⵜⵉⵎⵎⴰⵜⵉⵏ.' }
            }
        ]
    },
    {
        id: 7,
        text: {
            ar: 'وجدت محفظة نقود في الشارع.',
            en: 'You found a wallet on the street.',
            fr: 'Tu as trouvé un portefeuille.',
            es: 'Encontraste una billetera.',
            zgh: 'ⵜⵓⴼⵉⴷ ⵍⴱⵣⵟⴰⵎ ⴳ ⵓⵖⴰⵔⴰⵙ.'
        },
        choices: [
            {
                text: { ar: 'آخذها لنفسي', en: 'Keep it', fr: 'Le garder', es: 'Guardarlo', zgh: 'ⴰⵙⵉ ⵜ ⵉ ⵉⵅⴼ ⵏⴽ' },
                impact: -20,
                type: 'harm',
                feedback: { ar: 'هذه أمانة! أخذها يعتبر سرقة.', en: 'That is stealing!', fr: 'C\'est du vol!', es: '¡Eso es robar!', zgh: 'ⵅⵜⴰⴷ ⵜⴳⴰ ⵜⴰⵎⴰⵏⵜ!' }
            },
            {
                text: { ar: 'أبحث عن صاحبها أو أسلمها للشرطة', en: 'Look for owner', fr: 'Chercher le propriétaire', es: 'Buscar al dueño', zgh: 'ⵔⵣⵓ ⴱⴰⴱ ⵏⵏⵙ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'أحسنت! الأمانة من صفات المؤمنين.', en: 'Honesty is a virtue.', fr: 'L\'honnêteté est une vertu.', es: 'La honestidad es una virtud.', zgh: 'ⵜⴰⵎⴰⵏⵜ ⵜⴳⴰ ⵜⵉⵖⴰⵔⵉⵡⵉⵏ ⵏ ⵉⵎⵓⵎⵏⵏ.' }
            }
        ]
    },
    {
        id: 8,
        text: {
            ar: 'رأيت قطة عطشى في يوم حار.',
            en: 'You saw a thirsty cat on a hot day.',
            fr: 'Un chat assoiffé.',
            es: 'Un gato sediento.',
            zgh: 'ⵜⵥⵕⵉⴷ ⴰⵎⵛⵉⵛ ⵉⴼⵓⴷⵏ.'
        },
        choices: [
            {
                text: { ar: 'أتجاهلها وأمشي', en: 'Ignore it', fr: 'Ignorer', es: 'Ignorar', zgh: 'ⵣⵔⵢ ⴼⵍⵍⴰⵙ' },
                impact: -10,
                type: 'harm',
                feedback: { ar: 'القسوة على الحيوان تجلب غضب الله.', en: 'Cruelty creates darkness.', fr: 'La cruauté crée l\'obscurité.', es: 'La crueldad crea oscuridad.', zgh: 'ⵜⴰⴽⵕⴹⵉ ⵅⴼ ⵉⵎⵓⴷⴰⵔⵏ ⵜⵅⵛⵏ.' }
            },
            {
                text: { ar: 'أسقيها الماء (الرحمة)', en: 'Give it water', fr: 'Donner de l\'eau', es: 'Darle agua', zgh: 'ⴼⴽ ⴰⵙ ⴰⵎⴰⵏ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'في كل كبد رطبة أجر. رحمك الله!', en: 'Kindness brings reward.', fr: 'La gentillesse apporte une récompense.', es: 'La bondad trae recompensa.', zgh: 'ⵕⵕⵃⵎⵜ ⴰⵔ ⴷ ⵜⵜⴰⵡⵉ ⵍⴰⵊⵕ.' }
            }
        ]
    },
    {
        id: 9,
        text: {
            ar: 'كسرت زهرية والدتك بالخطأ.',
            en: 'You accidentally broke your mom\'s vase.',
            fr: 'Tu as cassé le vase de ta mère.',
            es: 'Rompiste el jarrón de tu madre.',
            zgh: 'ⵜⵕⵥⵉⴷ ⵍⴼⴰⵣ ⵏ ⵎⴰⵙ ⵏⴽ.'
        },
        choices: [
            {
                text: { ar: 'أخفي الأمر وأكذب', en: 'Hide it and lie', fr: 'Mentir', es: 'Mentir', zgh: 'ⴼⴼⵔ ⵜ ⵜⵙⴽⵔⴽⵙⵜ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'الكذب يهدي إلى الفجور. كن شجاعاً.', en: 'Lying leads to bad deeds.', fr: 'Le mensonge mène au mal.', es: 'Mentir lleva al mal.', zgh: 'ⵜⵉⴽⵔⴽⴰⵙ ⵅⵛⵏⵏⵜ.' }
            },
            {
                text: { ar: 'أعترف وأعتذر (الشجاعة)', en: 'Confess and apologize', fr: 'Avouer et s\'excuser', es: 'Confesar y disculparse', zgh: 'ⵉⵏⵉ ⵜⵉⴷⵜ ⵜⵙⵙⵓⵔⴼⴷ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'الصدق منجاة! الله يحب الصادقين.', en: 'Honesty saves you!', fr: 'L\'honnêteté vous sauve!', es: '¡La honestidad te salva!', zgh: 'ⵜⵉⴷⵜ ⵜⴼⵓⵍⴽⵉ!' }
            }
        ]
    },
    {
        id: 10,
        text: {
            ar: 'زميلك في المدرسة نسي طعامه وهو جائع.',
            en: 'Your classmate forgot his lunch and is hungry.',
            fr: 'Ton camarade a oublié son déjeuner.',
            es: 'Tu compañero olvidó su almuerzo.',
            zgh: 'ⴰⵎⴷⴷⴰⴽⴽⵯⵍ ⵏⴽ ⵉⵜⵜⵓ ⵍⵎⴰⴽⵍⴰ ⵏⵏⵙ.'
        },
        choices: [
            {
                text: { ar: 'آكل طعامي وحدي', en: 'Eat alone', fr: 'Manger seul', es: 'Comer solo', zgh: 'ⵛⵛ ⵡⴰⵃⴷⵓⴽ' },
                impact: -10,
                type: 'harm',
                feedback: { ar: 'الأنانية تفرق القلوب.', en: 'Selfishness divides hearts.', fr: 'L\'égoïsme divise.', es: 'El egoísmo divide.', zgh: 'ⵜⴰⵏⵏⴰⵏⵉⵜ ⵓⵔ ⵜⴼⵓⵍⴽⵉ.' }
            },
            {
                text: { ar: 'أقاسمه طعامي (الإيثار)', en: 'Share my food', fr: 'Partager ma nourriture', es: 'Compartir mi comida', zgh: 'ⴱⴹⵓ ⴷⵉⴷⵙ ⵍⵎⴰⴽⵍⴰ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'ويؤثرون على أنفسهم! بورك فيك.', en: 'Sharing spreads love.', fr: 'Le partage répand l\'amour.', es: 'Compartir esparce amor.', zgh: 'ⵜⵉⵡⵉⵣⵉ ⵜⴼⵓⵍⴽⵉ.' }
            }
        ]
    },
    // --- General Behavior ---
    {
        id: 11,
        text: {
            ar: 'أنهيت شرب العصير في الحديقة.',
            en: 'You finished your juice in the park.',
            fr: 'Tu as fini ton jus au parc.',
            es: 'Terminaste tu jugo en el parque.',
            zgh: 'ⵜⵙⵡⵉⴷ ⴰⵀⵚⵉⵕ ⴳ ⵓⵔⵜⵉ.'
        },
        choices: [
            {
                text: { ar: 'أرمي العلبة على الأرض', en: 'Throw it on ground', fr: 'Jeter par terre', es: 'Tirar al suelo', zgh: 'ⵍⵓⵃ ⵜ ⴳ ⵡⴰⴽⴰⵍ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'إماطة الأذى عن الطريق صدقة. النظافة من الإيمان.', en: 'Littering harms nature.', fr: 'Les déchets nuisent à la nature.', es: 'La basura daña la naturaleza.', zgh: 'ⴰⵣⵓⴳⴳⵣ ⵏ ⵡⴰⴽⴰⵍ ⵉⵅⵛⵏ.' }
            },
            {
                text: { ar: 'أبحث عن سلة المهملات', en: 'Find a bin', fr: 'Trouver une poubelle', es: 'Encontrar una papelera', zgh: 'ⵔⵣⵓ ⵜⴰⵏⴼⴰ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'أحسنت! الله جميل يحب الجمال.', en: 'Cleanliness is part of faith.', fr: 'La propreté fait partie de la foi.', es: 'La limpieza es parte de la fe.', zgh: 'ⵜⴰⵣⵓⴳⴰ ⵜⴳⴰ ⵣⵖ ⵍⵉⵎⴰⵏ.' }
            }
        ]
    },
    {
        id: 12,
        text: {
            ar: 'لديك فائض من الملابس القديمة.',
            en: 'You have extra old clothes.',
            fr: 'Vieux vêtements.',
            es: 'Ropa vieja.',
            zgh: 'ⴷⴰⵔⴽ ⵉⵃⵔⵓⵢⵏ ⵉⵇⴱⵓⵔⵏ.'
        },
        choices: [
            {
                text: { ar: 'أرميها في القمامة', en: 'Trash them', fr: 'Jeter', es: 'Tirar', zgh: 'ⵍⵓⵃ ⵜⵏ' },
                impact: -10,
                type: 'harm',
                feedback: { ar: 'التبذير من عمل الشياطين.', en: 'Wastefulness is bad.', fr: 'Le gaspillage est mauvais.', es: 'El desperdicio es malo.', zgh: 'ⴰⵙⴼⵕⴹ ⵓⵔ ⵉⴼⵓⵍⴽⵉ.' }
            },
            {
                text: { ar: 'أتصدق بها للفقراء', en: 'Donate them', fr: 'Donner', es: 'Donar', zgh: 'ⵙⴷⴷⵇ ⵜⵏ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'ما نقص مال من صدقة. بارك الله فيك.', en: 'Charity purifies wealth.', fr: 'La charité purifie.', es: 'La caridad purifica.', zgh: 'ⵚⵚⴰⴹⴰⵇⴰ ⵜⴼⵓⵍⴽⵉ.' }
            }
        ]
    },
    {
        id: 13,
        text: {
            ar: 'تسمع صوت القرآن يقرأ في الغرفة.',
            en: 'Quran is being recited in the room.',
            fr: 'Le Coran est récité.',
            es: 'Se recita el Corán.',
            zgh: 'ⴰⵔ ⵜⵙⴼⵍⵉⴷⴷ ⵉ ⵍⵇⵓⵔⴰⵏ.'
        },
        choices: [
            {
                text: { ar: 'أرفع صوت اللعب والموسيقى', en: 'Play loud noise', fr: 'Faire du bruit', es: 'Hacer ruido', zgh: 'ⵙⵖⵓⵢⵢ' },
                impact: -20,
                type: 'harm',
                feedback: { ar: 'وإذا قرئ القرآن فاستمعوا له وأنصتوا.', en: 'Respect the Quran.', fr: 'Respectez le Coran.', es: 'Respeta el Corán.', zgh: 'ⵇⵇⴰⵔ ⵍⵇⵓⵔⴰⵏ ⵙ ⵍⵉⵃⵜⵉⵔⴰⵎ.' }
            },
            {
                text: { ar: 'أنصت وأتأدب', en: 'Listen quietly', fr: 'Écouter calmement', es: 'Escuchar tranquilamente', zgh: 'ⵙⴼⵍⴷ ⵙ ⵍⴰⴷⴰⴱ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'جزاك الله خيراً. الإنصات رحمة.', en: 'Listening brings mercy.', fr: 'L\'écoute apporte la miséricorde.', es: 'Escuchar trae misericordia.', zgh: 'ⴰⵙⴼⵍⴷ ⵉⴳⴰ ⵕⵕⵃⵎⵜ.' }
            }
        ]
    },
    {
        id: 14,
        text: {
            ar: 'غضب منك صديقك وتخاصمتما.',
            en: 'You fought with your friend.',
            fr: 'Dispute avec un ami.',
            es: 'Pelea con un amigo.',
            zgh: 'ⵜⵏⵏⴰⵖⴷ ⴷ ⵓⵎⴷⴷⴰⴽⴽⵯⵍ ⵏⴽ.'
        },
        choices: [
            {
                text: { ar: 'أقاطعه ولا أكلمه أبداً', en: 'Ignore him forever', fr: 'L\'ignorer', es: 'Ignorarlo', zgh: 'ⵇⵇⵏ ⴰⵙ ⴰⵡⴰⵍ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'لا يحل لمسلم أن يهجر أخاه فوق ثلاث.', en: 'Do not hold grudges.', fr: 'Ne gardez pas rancune.', es: 'No guardes rencor.', zgh: 'ⴰⴷ ⵓⵔ ⵜⵇⵇⵏⴷ ⴰⵡⴰⵍ.' }
            },
            {
                text: { ar: 'أبادره بالسلام والاعتذار', en: 'Apologize and Say Salam', fr: 'S\'excuser', es: 'Disculparse', zgh: 'ⵙⴰⵎⵃ ⴰⵙ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'وخيرهما الذي يبدأ بالسلام.', en: 'Forgiveness is strength.', fr: 'Le pardon est une force.', es: 'El perdón es fuerza.', zgh: 'ⴰⵙⵙⵓⵔⴼ ⵉⴳⴰ ⵜⴰⴼⵍⵙⵜ.' }
            }
        ]
    },
    {
        id: 15,
        text: {
            ar: 'رأيت صنبور الماء مفتوحاً دون حاجة.',
            en: 'You saw a water tap running unnecessarily.',
            fr: 'Robinet ouvert.',
            es: 'Grifo abierto.',
            zgh: 'ⵜⵥⵕⵉⴷ ⵔⵔⵓⴱⵉⵏⵉ ⵉⵕⵥⵎ.'
        },
        choices: [
            {
                text: { ar: 'لا أهتم، ليس منزلي', en: 'Ignore it', fr: 'Ignorer', es: 'Ignorar', zgh: 'ⵣⵔⵢ ⴼⵍⵍⴰⵙ' },
                impact: -10,
                type: 'harm',
                feedback: { ar: 'لا تسرفوا إن الله لا يحب المسرفين.', en: 'Do not waste water.', fr: 'Ne gaspillez pas l\'eau.', es: 'No desperdicies agua.', zgh: 'ⴰⴷ ⵓⵔ ⵜⵙⴼⵕⴰⴹⴷ ⴰⵎⴰⵏ.' }
            },
            {
                text: { ar: 'أغلقه حفاظاً على النعمة', en: 'Close it', fr: 'Le fermer', es: 'Cerrarlo', zgh: 'ⵇⵇⵏ ⵜ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'أحسنت! الماء نعمة عظيمة.', en: 'Water is a blessing.', fr: 'L\'eau est une bénédiction.', es: 'El agua es una bendición.', zgh: 'ⴰⵎⴰⵏ ⴳⴰⵏ ⵜⴰⵏⴼⵓⵙⵜ.' }
            }
        ]
    },
    {
        id: 16,
        text: {
            ar: 'طلب منك صديق أن تغش معه في الامتحان.',
            en: 'Friend asked you to cheat in exam.',
            fr: 'Ami a demandé de tricher.',
            es: 'Amigo pidió hacer trampa.',
            zgh: 'ⵉⵏⵏⴰ ⴰⴽ ⵓⵎⴷⴷⴰⴽⴽⵯⵍ ⴰⴷ ⵜⵖⵛⵛⴷ.'
        },
        choices: [
            {
                text: { ar: 'أغش لمساعدته', en: 'Cheat to help', fr: 'Tricher', es: 'Hacer trampa', zgh: 'ⵖⵛⵛ' },
                impact: -30,
                type: 'harm',
                feedback: { ar: 'من غشنا فليس منا. الغش خيانة.', en: 'Cheating is betrayal.', fr: 'Tricher est une trahison.', es: 'Hacer trampa es traición.', zgh: 'ⵍⵖⵛⵛ ⵉⴳⴰ ⵍⵅⵉⵢⴰⵏⴰ.' }
            },
            {
                text: { ar: 'أرفض وأنصحه بالمذاكرة', en: 'Refuse and advise', fr: 'Refuser', es: 'Rechazar', zgh: 'ⴰⴳⵉ' },
                impact: 30,
                type: 'value',
                feedback: { ar: 'ممتاز! النجاح يأتي بالعمل الصادق.', en: 'Honesty leads to success.', fr: 'L\'honnêteté mène au succès.', es: 'La honestidad lleva al éxito.', zgh: 'ⵜⵉⴷⵜ ⴰⵔ ⵜⵜⴰⵡⵉ ⵜⴰⵡⵏⴰⴼⵜ.' }
            }
        ]
    },
    {
        id: 17,
        text: {
            ar: 'استيقظت متأخراً، هل ترتب سريرك؟',
            en: 'Woke up late. Make your bed?',
            fr: 'Réveillé tard. Faire le lit?',
            es: '¿Despertaste tarde. Hacer la cama?',
            zgh: 'ⵜⵏⴽⵔⴷ ⴳ ⵓⵣⴳⴳⵯⴰ.'
        },
        choices: [
            {
                text: { ar: 'أتركه فوضوياً', en: 'Leave it messy', fr: 'Laisser en désordre', es: 'Dejar desordenado', zgh: 'ⴰⵊⵊ ⵜ' },
                impact: -5,
                type: 'harm',
                feedback: { ar: 'النظام أساس النجاح.', en: 'Order implies success.', fr: 'L\'ordre implique le succès.', es: 'El orden implica éxito.', zgh: 'ⴰⵙⵏⵎ ⵉⴳⴰ ⵜⴰⵡⵏⴰⴼⵜ.' }
            },
            {
                text: { ar: 'أرتبه بسرعة (النظام)', en: 'Make it', fr: 'Le faire', es: 'Hacerla', zgh: 'ⵙⴳⴰⴷⴰ ⵜ' },
                impact: 10,
                type: 'value',
                feedback: { ar: 'بداية يوم منظمة تعني يوماً ناجحاً.', en: 'Organized start, successful day.', fr: 'Début organisé, journée réussie.', es: 'Inicio organizado, día exitoso.', zgh: 'ⴰⵙⵏⵎ ⵏ ⵡⴰⵙⵙ ⵉⴳⴰ ⵜⴰⵡⵏⴰⴼⵜ.' }
            }
        ]
    },
    {
        id: 18,
        text: {
            ar: 'سمعت أحدهم يغتاب صديقاً لك.',
            en: 'Heard someone backbiting your friend.',
            fr: 'Entendu médire d\'un ami.',
            es: 'Oíste hablar mal de un amigo.',
            zgh: 'ⵜⵙⴼⵍⵉⴷⴷ ⵉ ⴽⵔⴰ ⴰⵔ ⵉⴳⴳⴰⵔ ⴰⵡⴰⵍ ⴳ ⵓⵎⴷⴷⴰⴽⴽⵯⵍ ⵏⴽ.'
        },
        choices: [
            {
                text: { ar: 'أستمع وأسكت', en: 'Listen silently', fr: 'Écouter', es: 'Escuchar', zgh: 'ⵙⴼⵍⴷ ⵜⵙⵙⵓⵙⵎⴷ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'الغيبة كأكل لحم الأخ ميتاً.', en: 'Backbiting is huge sin.', fr: 'La médisance est un péché.', es: 'La murmuración es pecado.', zgh: 'ⵜⴰⵖⵎⵙⵜ ⵜⵅⵛⵏ.' }
            },
            {
                text: { ar: 'أدافع عنه وأغير الموضوع', en: 'Defend him', fr: 'Le défendre', es: 'Defenderlo', zgh: 'ⴷⴰⴼⵄ ⴼⵍⵍⴰⵙ' },
                impact: 20,
                type: 'value',
                feedback: { ar: 'ذب الله النار عن وجه من ذب عن عرض أخيه.', en: 'Defend honor.', fr: 'Défendez l\'honneur.', es: 'Defiende el honor.', zgh: 'ⴷⴰⴼⵄ ⵅⴼ ⵓⴳⵎⴰⴽ.' }
            }
        ]
    },
    {
        id: 19,
        text: {
            ar: 'رأيت إعلاناً لصور غير لائقة أثناء تصفح الإنترنت.',
            en: 'Saw bad ads while browsing.',
            fr: 'Vu de mauvaises publicités.',
            es: 'Viste malos anuncios.',
            zgh: 'ⵜⵥⵕⵉⴷ ⵉⵛⵀⴰⵔⵏ ⵉⵅⵛⵏⵏ.'
        },
        choices: [
            {
                text: { ar: 'أستمر في النظر', en: 'Keep looking', fr: 'Continuer à regarder', es: 'Seguir mirando', zgh: 'ⵉⵙⵉⵏ' },
                impact: -20,
                type: 'harm',
                feedback: { ar: 'غض البصر يحفظ القلب والنور.', en: 'Lower your gaze.', fr: 'Baissez le regard.', es: 'Baja la mirada.', zgh: 'ⴳⴰⴱⴱⵍ ⴰⵍⵍⵏ ⵏⴽ.' }
            },
            {
                text: { ar: 'أغلق الصفحة وأستغفر الله', en: 'Close and seek forgiveness', fr: 'Fermer et demander pardon', es: 'Cerrar y pedir perdón', zgh: 'ⵇⵇⵏ ⵜⴰⵙⵏⴰ' },
                impact: 25,
                type: 'value',
                feedback: { ar: 'أحسنت! (قل للمؤمنين يغضوا من أبصارهم).', en: 'Great job protecting yourself.', fr: 'Bravo!', es: '¡Bien hecho!', zgh: 'ⴰⵢⵢⵓⵣ!' }
            }
        ]
    },
    {
        id: 20,
        text: {
            ar: 'لديك واجبات مدرسية ولعبة جديدة.',
            en: 'Homework vs New Game.',
            fr: 'Devoirs vs Nouveau Jeu.',
            es: 'Tarea vs Nuevo Juego.',
            zgh: 'ⴷⴰⵔⴽ ⵜⵉⵡⵓⵔⵉⵡⵉⵏ ⵏ ⵜⵉⵏⵎⵍ.'
        },
        choices: [
            {
                text: { ar: 'ألعب طوال الوقت', en: 'Play all time', fr: 'Jouer tout le temps', es: 'Jugar todo el tiempo', zgh: 'ⵓⵔⴰⵔ' },
                impact: -15,
                type: 'harm',
                feedback: { ar: 'تضييع الوقت ندامة.', en: 'Wasting time brings regret.', fr: 'Perdre du temps apporte des regrets.', es: 'Perder el tiempo trae arrepentimiento.', zgh: 'ⴰⵙⴼⵕⴹ ⵏ ⵡⴰⴽⵓⴷ ⵓⵔ ⵉⴼⵓⵍⴽⵉ.' }
            },
            {
                text: { ar: 'أنهي واجبي ثم ألعب', en: 'Finish work then play', fr: 'Finir le travail', es: 'Terminar el trabajo', zgh: 'ⵙⴰⵍⴰ ⵜⵉⵡⵓⵔⵉⵡⵉⵏ' },
                impact: 15,
                type: 'value',
                feedback: { ar: 'ترتيب الأولويات سر النجاح.', en: 'Priorities lead to success.', fr: 'Les priorités mènent au succès.', es: 'Las prioridades llevan al éxito.', zgh: 'ⴰⵙⵏⵎ ⵉⴳⴰ ⵜⴰⵡⵏⴰⴼⵜ.' }
            }
        ]
    }
];
