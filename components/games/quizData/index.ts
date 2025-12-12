import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';
import { level6 } from './level6';
import { level7 } from './level7';
import { level8 } from './level8';
import { level9 } from './level9';
import { level10 } from './level10';
import { QuizLevel } from '../quizTypes';

// Helper to create placeholder levels
const createLevel = (id: number, titleAr: string, titleEn: string, descAr: string, descEn: string, icon: string): QuizLevel => ({
    id,
    titleAr,
    titleEn,
    description: descAr,
    descriptionEn: descEn,
    requiredScore: 70,
    icon,
    questions: []
});

import { level11 } from './level11';
import { level12 } from './level12';
import { level13 } from './level13';
import { level14 } from './level14';
import { level15 } from './level15';

export const allLevels: QuizLevel[] = [
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10,
    level11,
    level12,
    level13,
    level14,
    level15
];
