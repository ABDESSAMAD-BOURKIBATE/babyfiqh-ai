
import { Language } from './translations';

export interface BrainNode {
    id: string;
    label: Record<Language, string>;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    connections: string[]; // IDs
    value: number; // 0-100
    type: 'core' | 'auxiliary';
}

export interface NeuroChoice {
    id: string;
    text: Record<Language, string>;
    impact: { nodeId: string; amount: number }[];
    feedback: Record<Language, string>;
    aiAnalysis: string; // Techy text
}

export interface NeuroScenario {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    choices: NeuroChoice[];
}

export const brainNodes: BrainNode[] = [
    { id: 'iman', label: { ar: 'الإيمان', en: 'Iman', fr: 'Foi', es: 'Fe', zgh: 'ⵍⵉⵎⴰⵏ' }, x: 50, y: 50, connections: ['haya', 'sidq', 'hikmah'], value: 50, type: 'core' },
    { id: 'haya', label: { ar: 'الحياء', en: 'Haya', fr: 'Pudeur', es: 'Modestia', zgh: 'ⵍⵃⵢⴰ' }, x: 25, y: 35, connections: ['iman', 'adab'], value: 40, type: 'core' },
    { id: 'sidq', label: { ar: 'الصدق', en: 'Honesty', fr: 'Honnêteté', es: 'Honestidad', zgh: 'ⵜⵉⴷⵜ' }, x: 75, y: 35, connections: ['iman', 'adab'], value: 40, type: 'core' },
    { id: 'hikmah', label: { ar: 'الحكمة', en: 'Wisdom', fr: 'Sagesse', es: 'Sabiduría', zgh: 'ⵜⴰⵎⵓⵙⵏⵉ' }, x: 50, y: 80, connections: ['iman', 'shajaa'], value: 30, type: 'core' },
    { id: 'adab', label: { ar: 'الأدب', en: 'Adab', fr: 'Politesse', es: 'Cortesía', zgh: 'ⵍⴰⴷⴰⴱ' }, x: 50, y: 20, connections: ['haya', 'sidq'], value: 30, type: 'auxiliary' },
    { id: 'shajaa', label: { ar: 'الشجاعة', en: 'Courage', fr: 'Courage', es: 'Coraje', zgh: 'ⵜⴰⵣⵣⵓⴳⴰⵣⵜ' }, x: 50, y: 95, connections: ['hikmah'], value: 20, type: 'auxiliary' },
];

export const neuroScenarios: NeuroScenario[] = [
    {
        id: 'sc1',
        title: { ar: 'التنمر الرقمي', en: 'Digital Bullying', fr: 'Cyberintimidation', es: 'Ciberacoso', zgh: 'ⴰⵙⵙⵉⵡⴹ ⴰⵍⵉⴽⵜⵕⵓⵏⵉ' },
        description: {
            ar: 'في مجموعة واتساب، بدأ الأصدقاء بالسخرية من صورة زميل لكم. عقلك يحلل الموقف...',
            en: 'In a group chat, friends started mocking a classmate\'s photo. Your mind analyzes...',
            fr: 'Dans un groupe, des amis se moquent d\'une photo. Votre esprit analyse...',
            es: 'En un chat, amigos se burlan de una foto. Tu mente analiza...',
            zgh: 'ⴳ ⵡⴰⵜⵙⴰⴱ, ⵉⵎⴷⴷⵓⴽⴽⵯⴰⵍ ⴰⵔ ⵜⵜⴹⵚⴰⵏ ⴼ ⵜⵡⵍⴰⴼⵜ ⵏ ⵓⵎⴷⴷⴰⴽⴽⵯⵍ. ⴰⵏⵍⵍⵉ ⵏⴽ ⴰⵔ ⵉⵜⵜⵅⵎⵎⴰⵎ...'
        },
        choices: [
            {
                id: 'c1',
                text: { ar: 'أشارك برمز تعبيري ضاحك 😂', en: 'Send laughing emoji 😂', fr: 'Envoyer un emoji rieur 😂', es: 'Enviar emoji riendo 😂', zgh: 'ⴰⵣⵏ ⵉⵎⵓⵊⵉ ⵏ ⵜⴰⴹⵚⴰ 😂' },
                impact: [{ nodeId: 'haya', amount: -25 }, { nodeId: 'adab', amount: -25 }],
                feedback: { ar: 'خطأ فادح! انطفأ نور الحياء. المشاركة في الأذى ظلم.', en: 'Critical Error! Haya dimmed. Participation in harm is injustice.', fr: 'Erreur critique! La pudeur diminue.', es: '¡Error crítico! La modestia disminuye.', zgh: 'ⴰⵣⴳⴰⵍ! ⵍⵃⵢⴰ ⵉⵏⵇⵚ.' },
                aiAnalysis: 'Evaluation: High Harm Probability (95%). Degrades Moral Integrity. Recommendation: AVOID.'
            },
            {
                id: 'c2',
                text: { ar: 'أخرج من المجموعة بصمت', en: 'Leave group silently', fr: 'Quitter le groupe en silence', es: 'Salir en silencio', zgh: 'ⴼⴼⵖ ⵙ ⵜⵙⵓⵙⵎⵉ' },
                impact: [{ nodeId: 'hikmah', amount: 10 }],
                feedback: { ar: 'قرار آمن. حفظت نفسك، لكنك لم تنصر أخاك. زادت الحكمة قليلاً.', en: 'Safe decision. Self-preservation active. Wisdom increased slightly.', fr: 'Décision sûre. Sagesse augmentée légèrement.', es: 'Decisión segura. Sabiduría aumentada ligeramente.', zgh: 'ⵜⴰⵡⵓⵔⵉ ⵉⵖⵣⴰⵏⵏ. ⵜⴰⵎⵓⵙⵏⵉ ⵜⵣⴰⵢⴷ.' },
                aiAnalysis: 'Evaluation: Neutral Utility. Risk Aversion Strategy. State Value: Stable.'
            },
            {
                id: 'c3',
                text: { ar: 'أدافع عنه: "يا شباب، هذا لا يجوز" ✋', en: 'Defend: "Guys, this is not right" ✋', fr: 'Défendre: "Ce n\'est pas bien" ✋', es: 'Defender: "Chicos, esto no está bien" ✋', zgh: 'ⴷⴰⴼⵄ: "ⴰ ⵉⵄⵣⵣⴰⵏ, ⴰⵢⴰⴷ ⵓⵔ ⵉⵖⵣⵉⵏ" ✋' },
                impact: [{ nodeId: 'shajaa', amount: 30 }, { nodeId: 'iman', amount: 30 }, { nodeId: 'hikmah', amount: 15 }],
                feedback: { ar: 'نقلة عبقرية! (نصرة الأخ). توهج الإيمان والشجاعة في عقلك!', en: 'Brilliant Move! (Brotherhood Defense). Iman and Courage glowing!', fr: 'Coup de génie! Foi et Courage brillent!', es: '¡Movimiento genial! Fe y Coraje brillan.', zgh: 'ⵜⴰⵡⵓⵔⵉ ⵉⴼⵓⵍⴽⵉⵏ! ⵍⵉⵎⴰⵏ ⴷ ⵜⴰⵣⵣⵓⴳⴰⵣⵜ ⵖⵍⵉⵏ.' },
                aiAnalysis: 'Evaluation: Optimal Move. Win Probability 98%. Maximizes Ethical Reward & Social Capital.'
            }
        ]
    },
    {
        id: 'sc2',
        title: { ar: 'مقترح الخوارزمية', en: 'Algorithm Suggestion', fr: 'Suggestion d\'algorithme', es: 'Sugerencia de algoritmo', zgh: 'ⴰⵙⵙⵓⵎⵔ ⵏ ⵍⵅⴰⵡⴰⵔⵉⵣⵎⵉⵢⵢⴰ' },
        description: {
            ar: 'ظهر لك فيديو بعنوان مثير لكن صورته تبدو غير لائقة. الخوارزمية تختبر فضولك.',
            en: 'A video with a clickbait title appears, but the thumbnail looks inappropriate. The algorithm tests your curiosity.',
            fr: 'Une vidéo au titre accrocheur apparaît, mais la miniature semble inappropriée.',
            es: 'Aparece un video con un título llamativo, pero la miniatura parece inapropiada.',
            zgh: 'ⵜⴱⴰⵏ ⴷ ⵢⴰⵜ ⵍⴼⵉⴷⵢⵓ ⴳⵉⵙ ⵜⴰⵡⵍⴰⴼⵜ ⵓⵔ ⵉⴼⵓⵍⴽⵉⵏ.'
        },
        choices: [
            {
                id: 'c1',
                text: { ar: 'أضغط للمشاهدة بدافع الفضول', en: 'Click to watch out of curiosity', fr: 'Cliquer par curiosité', es: 'Hacer clic por curiosidad', zgh: 'ⴰⴷⴷ ⴼⵍⵍⴰⵙ ⵙ ⵜⴰⵙⵏⵙⵉⵜ' },
                impact: [{ nodeId: 'iman', amount: -15 }, { nodeId: 'haya', amount: -20 }],
                feedback: { ar: 'تنبيه! الفضول السيئ يضعف نور البصيرة.', en: 'Warning! Bad curiosity weakens insight.', fr: 'Attention! La mauvaise curiosité affaiblit la perspicacité.', es: '¡Advertencia! La mala curiosidad debilita la perspicacia.', zgh: 'ⴰⵣⴳⴰⵍ! ⵜⴰⵙⵏⵙⵉⵜ ⵜⵅⵛⵏ.' },
                aiAnalysis: 'Evaluation: Negative Utility. Cognitive Hazard Detected. Recommendation: AVOID.'
            },
            {
                id: 'c2',
                text: { ar: 'أتجاهل وأكمل التمرير', en: 'Ignore and scroll', fr: 'Ignorer et défiler', es: 'Ignorar y desplazar', zgh: 'ⵣⵔⵢ ⴼⵍⵍⴰⵙ' },
                impact: [{ nodeId: 'adab', amount: 5 }],
                feedback: { ar: 'تجاهل جيد. لم تتأثر، لكن الخطر ما زال موجوداً.', en: 'Good ignore. Unaffected, but risk remains.', fr: 'Bien ignoré.', es: 'Bien ignorado.', zgh: 'ⵜⴰⵡⵓⵔⵉ ⵉⵖⵣⴰⵏⵏ.' },
                aiAnalysis: 'Evaluation: Neutral/Positive. Maintains Baseline State.'
            },
            {
                id: 'c3',
                text: { ar: 'أضغط "لا يهمني" أو "إبلاغ"', en: 'Click "Not Interested" or "Report"', fr: 'Cliquer "Pas intéressé"', es: 'Clic en "No me interesa"', zgh: 'ⴰⴷⴷ "ⵓⵔ ⵉⵢⵉ ⵉⵀⵎⵎⴰ"' },
                impact: [{ nodeId: 'hikmah', amount: 20 }, { nodeId: 'iman', amount: 10 }],
                feedback: { ar: 'ممتاز! أنت تدرب الخوارزمية وتحمي نفسك وغيرك.', en: 'Excellent! You are training the algorithm and protecting yourself.', fr: 'Excellent! Vous entraînez l\'algorithme.', es: '¡Excelente! Estás entrenando el algoritmo.', zgh: 'ⴰⵢⵢⵓⵣ! ⴰⵔ ⵜⵙⵙⵍⵎⴰⴷⴷ ⵍⵅⴰⵡⴰⵔⵉⵣⵎⵉⵢⵢⴰ.' },
                aiAnalysis: 'Evaluation: Strategic Win. Improves Future State Environment. High Value.'
            }
        ]
    }
];
