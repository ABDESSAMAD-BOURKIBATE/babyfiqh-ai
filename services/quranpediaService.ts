

const BASE_URL = '/api/quranpedia';

export interface SurahInfoItem {
    title: string;
    value: string; // HTML content
}

export interface SurahInfo {
    introduction?: SurahInfoItem;
    surah_number?: SurahInfoItem;
    surah_type?: SurahInfoItem;
    words_count?: SurahInfoItem;
    descent?: SurahInfoItem;
    grace?: SurahInfoItem;
    prophet?: SurahInfoItem;
    revelation?: SurahInfoItem;
}

export interface Mushaf {
    id: number;
    name: string;
    description: string;
    image: string;
    bismillah: string;
    font_file: string | null;
    images?: string; // zip url
    images_png?: string; // zip url
    rawi?: {
        name: string;
        full_name: string;
    };
}

export const getSurahInfo = async (surahId: number): Promise<SurahInfo> => {
    try {
        const response = await fetch(`${BASE_URL}/v1/surah/information/${surahId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching surah info:', error);
        throw error;
    }
};

export const getMushafs = async (): Promise<Mushaf[]> => {
    try {
        const response = await fetch(`${BASE_URL}/v1/mushafs`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching mushafs:', error);
        throw error;
    }
};
