
const BASE_URL = '/api/tafseer';

export interface TafseerInfo {
    id: number;
    name: string;
    language: string;
    author: string;
    book_name: string;
}

export interface TafseerSurah {
    index: number;
    name: string;
}

export interface VerseDetails {
    sura_index: number;
    sura_name: string;
    ayah_number: number;
    text: string;
}

export interface TafseerVerse {
    tafseer_id: number;
    tafseer_name: string;
    ayah_url: string;
    ayah_number: number;
    text: string;
}

export const getTafseers = async (): Promise<TafseerInfo[]> => {
    try {
        const response = await fetch(`${BASE_URL}/tafseer`);
        if (!response.ok) throw new Error('Failed to fetch tafseers');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tafseers:', error);
        return [];
    }
};

export const getTafseerSurahs = async (): Promise<TafseerSurah[]> => {
    try {
        const response = await fetch(`${BASE_URL}/quran`);
        if (!response.ok) throw new Error('Failed to fetch surahs');
        return await response.json();
    } catch (error) {
        console.error('Error fetching surahs:', error);
        return [];
    }
};

export const getVerseDetails = async (surahNumber: number, ayahNumber: number): Promise<VerseDetails> => {
    try {
        const response = await fetch(`${BASE_URL}/quran/${surahNumber}/${ayahNumber}`);
        if (!response.ok) throw new Error('Failed to fetch verse details');
        return await response.json();
    } catch (error) {
        console.error('Error fetching verse details:', error);
        throw error;
    }
};

export const getVerseTafseer = async (tafseerId: number, surahNumber: number, ayahNumber: number): Promise<TafseerVerse> => {
    try {
        const response = await fetch(`${BASE_URL}/tafseer/${tafseerId}/${surahNumber}/${ayahNumber}`);
        if (!response.ok) throw new Error('Failed to fetch verse tafseer');
        return await response.json();
    } catch (error) {
        console.error('Error fetching verse tafseer:', error);
        throw error;
    }
};

export const getVerseTafseerRange = async (tafseerId: number, surahNumber: number, fromAyah: number, toAyah: number): Promise<TafseerVerse[]> => {
    try {
        const response = await fetch(`${BASE_URL}/tafseer/${tafseerId}/${surahNumber}/${fromAyah}/${toAyah}`);
        if (!response.ok) throw new Error('Failed to fetch verse tafseer range');
        return await response.json();
    } catch (error) {
        console.error('Error fetching verse tafseer range:', error);
        return [];
    }
};
