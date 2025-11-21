
const BASE_URL = 'http://api.alquran.cloud/v1';

export interface QuranEdition {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: 'text' | 'audio';
    type: 'translation' | 'tafsir' | 'quran' | 'versebyverse';
    direction?: 'rtl' | 'ltr';
}

export interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
}

export interface QuranData {
    surahs: Surah[];
    edition: QuranEdition;
}

export interface QuranResponse {
    code: number;
    status: string;
    data: QuranData;
}

export const getQuranByEdition = async (edition: string): Promise<QuranData | null> => {
    try {
        const response = await fetch(`${BASE_URL}/quran/${edition}`);
        if (!response.ok) throw new Error('Failed to fetch Quran');
        const result: QuranResponse = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching Quran:', error);
        return null;
    }
};

// Popular editions
export const POPULAR_EDITIONS = {
    // Arabic
    UTHMANI: 'quran-uthmani',
    SIMPLE: 'quran-simple',

    // English Translations
    SAHIH_INTERNATIONAL: 'en.sahih',
    YUSUF_ALI: 'en.yusufali',
    PICKTHALL: 'en.pickthall',
    ASAD: 'en.asad',

    // French
    FRENCH: 'fr.hamidullah',

    // Spanish
    SPANISH: 'es.cortes',

    // Audio
    ALAFASY: 'ar.alafasy',
    MINSHAWI: 'ar.minshawi',
    HUSARY: 'ar.husary',
};
