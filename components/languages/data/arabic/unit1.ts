import React from 'react';

export type StepType = 'lesson' | 'coloring' | 'activity' | 'quiz';
export type SectionType = 'text' | 'image' | 'audio' | 'question';

export interface LessonSection {
    id: string;
    type: SectionType;
    content?: string;
    question?: Question;
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
}

export interface MatchingPair {
    id: string;
    item1: string;
    item2: string;
}

export interface Step {
    id: string;
    title: string;
    type: StepType;
    icon: string;
    description?: string;
    sections?: LessonSection[];
    questions?: Question[];
    activityPairs?: MatchingPair[];
    isCompleted: boolean;
    isLocked: boolean;
}

export interface Unit {
    id: string;
    title: string;
    description: string;
    steps: Step[];
}

export const arabicUnit1: Unit = {
    id: 'arabic-unit-1',
    title: 'الوحدة الأولى: مقدمة في اللغة العربية',
    description: 'رحلة ممتعة لتعلم الحروف العربية',
    steps: [
        {
            id: 'step-1-lesson',
            title: 'درس الحروف',
            type: 'lesson',
            icon: '📚',
            isCompleted: false,
            isLocked: false,
            description: 'تعلم حروف: أ، ب، ت',
            sections: [
                {
                    id: 'intro',
                    type: 'text',
                    content: 'مرحباً يا بطل! 👋\nاليوم سنتعلم أول ثلاثة حروف في اللغة العربية.\nهل أنت مستعد؟ هيا بنا!'
                },
                {
                    id: 'alif-title',
                    type: 'text',
                    content: '## 1. حرف الألف (أ)'
                },
                {
                    id: 'alif-desc',
                    type: 'text',
                    content: 'حرف الألف هو أول الحروف. يقف مستقيماً مثل العصا.'
                },
                {
                    id: 'alif-example',
                    type: 'text',
                    content: 'مثال: **أَسَد** 🦁'
                },
                {
                    id: 'alif-q',
                    type: 'question',
                    question: {
                        id: 'q-alif',
                        text: 'أي كلمة تبدأ بحرف الألف؟',
                        options: ['بطة', 'أرنب', 'تمساح'],
                        correctAnswer: 1
                    }
                },
                {
                    id: 'ba-title',
                    type: 'text',
                    content: '## 2. حرف الباء (ب)'
                },
                {
                    id: 'ba-desc',
                    type: 'text',
                    content: 'حرف الباء يشبه الصحن وتحته نقطة واحدة.'
                },
                {
                    id: 'ba-example',
                    type: 'text',
                    content: 'مثال: **بَطَّة** 🦆'
                },
                {
                    id: 'ta-title',
                    type: 'text',
                    content: '## 3. حرف التاء (ت)'
                },
                {
                    id: 'ta-desc',
                    type: 'text',
                    content: 'حرف التاء يشبه الباء، لكن النقطتين فوقه! مثل العينين.'
                },
                {
                    id: 'ta-example',
                    type: 'text',
                    content: 'مثال: **تُفَّاحَة** 🍎'
                }
            ]
        },
        {
            id: 'step-2-coloring',
            title: 'تلوين الحروف',
            type: 'coloring',
            icon: '🎨',
            isCompleted: false,
            isLocked: false,
            description: 'لون الحروف التي تعلمتها'
        },
        {
            id: 'step-3-activity',
            title: 'لعبة المطابقة',
            type: 'activity',
            icon: '🧩',
            isCompleted: false,
            isLocked: false,
            description: 'طابق الحرف مع الكلمة',
            activityPairs: [
                { id: 'p1', item1: 'أ', item2: 'أسد 🦁' },
                { id: 'p2', item1: 'ب', item2: 'بطة 🦆' },
                { id: 'p3', item1: 'ت', item2: 'تفاحة 🍎' },
                { id: 'p4', item1: 'ج', item2: 'جمل 🐪' },
            ]
        },
        {
            id: 'step-4-quiz',
            title: 'الاختبار النهائي',
            type: 'quiz',
            icon: '🏆',
            isCompleted: false,
            isLocked: false,
            description: 'اختبر معلوماتك',
            questions: [
                {
                    id: 'q1',
                    text: 'ما هو الحرف الذي تحته نقطة؟',
                    options: ['أ', 'ب', 'ت'],
                    correctAnswer: 1,
                },
                {
                    id: 'q2',
                    text: 'ما هو الحرف الذي فوقه نقطتان؟',
                    options: ['أ', 'ب', 'ت'],
                    correctAnswer: 2,
                },
                {
                    id: 'q3',
                    text: 'كلمة "أسد" تبدأ بحرف...',
                    options: ['أ', 'ب', 'ت'],
                    correctAnswer: 0,
                },
            ],
        },
    ],
};
