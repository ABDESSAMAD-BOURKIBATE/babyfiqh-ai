
export interface LearningItem {
    id: string;
    image: string; // Emoji or Image URL
    nativeText: string; // Arabic text to read
    phonetic: string; // Phonetic guide
    translation: string; // Meaning in current app language (e.g., English/French)
    audioUrl?: string; // Optional custom audio
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    items: LearningItem[];
}

export interface Level {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    lessons: Lesson[];
}

export const arabicCurriculum: Level[] = [];

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
}

export const arabicQuizzes: Quiz[] = [];

export interface Activity {
    id: string;
    title: string;
    description: string;
    type: 'matching' | 'flashcards';
}

export const arabicActivities: Activity[] = [];
