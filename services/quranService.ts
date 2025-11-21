

import { Language } from '../utils/translations';

const BASE_URL = 'https://mp3quran.net/api/v3';

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

export interface Radio {
  id: number;
  name: string;
  url: string;
  recent_date: string;
}

export interface LiveTV {
  id: number;
  name: string;
  url: string;
}

export interface Riwayah {
  id: number;
  name: string;
}

export const getReciters = async (lang: Language, riwayahId?: number): Promise<Reciter[]> => {
    // API expects languages like 'ar', 'eng', 'fr' etc.
    // Map our languages to API supported codes if necessary
    let apiLang = lang === 'zgh' ? 'ar' : lang; // Fallback for Amazigh
    if (apiLang === 'es') apiLang = 'es';
    
    try {
        let url = `${BASE_URL}/reciters?language=${apiLang}`;
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
    let apiLang = lang === 'zgh' ? 'ar' : lang;
    if (apiLang === 'es') apiLang = 'es';
    try {
        const response = await fetch(`${BASE_URL}/riwayat?language=${apiLang}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.riwayat || [];
    } catch (error) {
         console.error("Failed to fetch riwayat:", error);
         return [];
    }
}

export const getSurahs = async (lang: Language): Promise<Surah[]> => {
    let apiLang = lang === 'zgh' ? 'ar' : lang;
    try {
        const response = await fetch(`${BASE_URL}/suwar?language=${apiLang}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.suwar || [];
    } catch (error) {
         console.error("Failed to fetch surahs:", error);
         return [];
    }
};

export const getRadios = async (lang: Language): Promise<Radio[]> => {
     let apiLang = lang === 'zgh' ? 'ar' : lang;
    try {
        const response = await fetch(`${BASE_URL}/radios?language=${apiLang}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.radios || [];
    } catch (error) {
         console.error("Failed to fetch radios:", error);
         return [];
    }
};

export const getLiveTV = async (): Promise<LiveTV[]> => {
    try {
        const response = await fetch(`${BASE_URL}/live-tv`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.livetv || [];
    } catch (error) {
         console.error("Failed to fetch live tv:", error);
         return [];
    }
};