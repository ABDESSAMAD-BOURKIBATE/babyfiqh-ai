
import { Language } from '../utils/translations';

const MP3QURAN_API = 'https://mp3quran.net/api/v3';
const ALQURAN_CLOUD_API = 'https://api.alquran.cloud/v1';

export interface Reciter {
  id: number;
  name: string;
  letter: string;
  moshaf: Moshaf[];
}

export interface Moshaf {
  id: number;
  name: string;
  server: string;
  surah_list: string;
  surah_total: number;
  moshaf_type?: number;
}

export interface Surah {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
  makkia: number;
  type: number;
}

export interface Riwayah {
  id: number;
  name: string;
}

export interface Radio {
    id: number;
    name: string;
    url: string;
}

export interface SearchResultItem {
    number: number;
    text: string;
    edition: {
        identifier: string;
        name: string;
        englishName: string;
        type: string;
    };
    surah: {
        number: number;
        name: string;
        englishName: string;
    };
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean | any;
}

// Helper to map app language codes to API specific codes
const mapLanguageToApi = (lang: Language): string => {
    switch (lang) {
        case 'en': return 'eng';
        case 'fr': return 'fr';
        case 'es': return 'es';
        case 'zgh': return 'ar'; // Fallback for Amazigh
        case 'ar': return 'ar';
        default: return 'ar';
    }
};

export const getReciters = async (lang: Language, riwayahId?: number): Promise<Reciter[]> => {
    const apiLang = mapLanguageToApi(lang);
    
    try {
        let url = `${MP3QURAN_API}/reciters?language=${apiLang}`;
        if (riwayahId) {
            url += `&rewaya=${riwayahId}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.reciters || [];
    } catch (error) {
        console.error("Failed to fetch reciters:", error);
        return [];
    }
};

export const getRiwayat = async (lang: Language): Promise<Riwayah[]> => {
    const apiLang = mapLanguageToApi(lang);
    try {
        const response = await fetch(`${MP3QURAN_API}/riwayat?language=${apiLang}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.riwayat || [];
    } catch (error) {
         console.error("Failed to fetch riwayat:", error);
         return [];
    }
}

export const getSurahs = async (lang: Language): Promise<Surah[]> => {
    const apiLang = mapLanguageToApi(lang);
    try {
        const response = await fetch(`${MP3QURAN_API}/suwar?language=${apiLang}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.suwar || [];
    } catch (error) {
         console.error("Failed to fetch surahs:", error);
         return [];
    }
};

export const getRadios = async (lang: Language): Promise<Radio[]> => {
    const apiLang = mapLanguageToApi(lang);
    try {
        const response = await fetch(`${MP3QURAN_API}/radios?language=${apiLang}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.radios || [];
    } catch (error) {
        console.error("Failed to fetch radios:", error);
        return [];
    }
};

// Fetch a specific page of the Quran (Uthmani Script)
export const getQuranPage = async (page: number): Promise<any> => {
    try {
        const response = await fetch(`${ALQURAN_CLOUD_API}/page/${page}/quran-uthmani`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.data; // Returns { number: 1, ayahs: [...] }
    } catch (error) {
        console.error(`Failed to fetch quran page ${page}:`, error);
        return null;
    }
};

export const getAyahAudio = async (surahNumber: number, ayahNumber: number): Promise<string | null> => {
    try {
        // Fetch audio for specific ayah (Mishary Alafasy as default)
        // Using HTTPS to prevent mixed content errors
        const response = await fetch(`${ALQURAN_CLOUD_API}/ayah/${surahNumber}:${ayahNumber}/ar.alafasy`);
        if (!response.ok) return null;
        const json = await response.json();
        return json.data.audio; // Returns valid MP3 URL from API
    } catch (e) {
        console.error("Audio fetch failed", e);
        return null;
    }
};

// New method: Direct CDN URL generation for instant playback
// Uses EveryAyah for high reliability and speed
export const getDirectAyahAudio = (surah: number, ayah: number): string => {
    const paddedSurah = surah.toString().padStart(3, '0');
    const paddedAyah = ayah.toString().padStart(3, '0');
    return `https://everyayah.com/data/Alafasy_128kbps/${paddedSurah}${paddedAyah}.mp3`;
};

export const searchQuran = async (keyword: string, lang: Language): Promise<SearchResultItem[]> => {
    let identifier = 'quran-uthmani';
    
    // Map Language to specific text editions for search
    if (lang === 'en') identifier = 'en.sahih';
    else if (lang === 'fr') identifier = 'fr.hamidullah';
    else if (lang === 'es') identifier = 'es.cortes';
    
    // Heuristic: If input contains Arabic characters, force Arabic search
    const arabicPattern = /[\u0600-\u06FF]/;
    if (arabicPattern.test(keyword)) {
        identifier = 'quran-uthmani';
    }

    // Smart Search: Check for Reference Pattern (e.g., 2:255)
    const refMatch = keyword.match(/^(\d+):(\d+)$/);
    if (refMatch) {
         try {
            const response = await fetch(`${ALQURAN_CLOUD_API}/ayah/${keyword}/${identifier}`);
            if (!response.ok) throw new Error('Ayah not found');
            const json = await response.json();
            return [json.data];
        } catch (e) {
            console.warn("Reference search failed", e);
        }
    }

    try {
        const response = await fetch(`${ALQURAN_CLOUD_API}/search/${encodeURIComponent(keyword)}/all/${identifier}`);
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        return data.data.matches || data.data || [];
    } catch (error) {
        console.error("Quran search error:", error);
        return [];
    }
};
