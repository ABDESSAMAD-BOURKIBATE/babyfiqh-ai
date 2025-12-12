// Quiz Game Types and Interfaces

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
    id: number;
    question: string;
    questionEn: string;
    options: string[];
    optionsEn: string[];
    correctAnswer: number; // Index of correct option (0-based)
    difficulty: DifficultyLevel;
    explanation?: string;
    explanationEn?: string;
}

export interface QuizLevel {
    id: number;
    titleAr: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    questions: QuizQuestion[];
    requiredScore: number; // Percentage needed to pass (e.g., 70)
    timeLimit?: number; // Optional time limit in seconds
    icon: string; // Emoji icon for the level
}

export interface QuizProgress {
    completedLevels: number[];
    levelScores: { [levelId: number]: number };
    levelStars: { [levelId: number]: number }; // 1-3 stars
    currentLevel: number;
    totalQuestionsAnswered: number;
    correctAnswers: number;
}

export interface GameSession {
    levelId: number;
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    score: number;
    answeredQuestions: number[];
    startTime: number;
    lives: number; // New: 3 lives
    streak: number; // New: Consecutive correct answers
    timeLeft: number; // New: Time left for current question
}
