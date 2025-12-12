import { arGuide } from './ar';
import { enGuide } from './en';
import { frGuide } from './fr';
import { Language } from '../translations';

export interface GuideTranslation {
    title: string;
    subtitle: string;
    tabs: {
        overview: string;
        features: string;
        indicators: string;
        questionnaire: string;
        future: string;
    };
    overview: {
        visionTitle: string;
        visionText: string;
        educationalGoalTitle: string;
        educationalGoalText: string;
        technicalGoalTitle: string;
        technicalGoalText: string;
        missionTitle: string;
        missionText: string;
        valuesTitle: string;
        values: Array<{ title: string; desc: string }>;
    };
    features: {
        list: Array<{ title: string; desc: string; icon?: string }>;
    };
    indicators: {
        stats: Array<{ label: string; value: string; change: string; trend?: string }>;
        tableTitle: string;
        tableHeaders: string[];
        tableData: Array<{ month: string; users: string; engagement: string; rating: string }>;
        growthTitle?: string;
        growthText?: string;
    };
    questionnaire: {
        title: string;
        subtitle: string;
        questions: Array<{ question: string; options: string[] }>;
        openQuestion: string;
        placeholder: string;
        submitButton: string;
        thankYou: string;
    };
    future: {
        roadmap: Array<{ year: string; title: string; desc: string; status?: string }>;
        personalVision: {
            title: string;
            text: string;
        };
    };
}

export const guideTranslations: Record<Language, GuideTranslation> = {
    ar: arGuide,
    en: enGuide,
    fr: frGuide,
    es: enGuide, // Use English as fallback for Spanish
    zgh: arGuide // Use Arabic as fallback for Tamazight
};

export const getGuideTranslation = (lang: Language): GuideTranslation => {
    return guideTranslations[lang] || guideTranslations.ar;
};
