
import { Language } from '../utils/translations';
import { countryTimezones } from '../utils/timezones';

export interface Country {
    code: string;
    name: Record<Language, string>;
    capital: Record<Language, string>;
    timezone: string;
    currency: Record<Language, string>;
    region: Record<Language, string>;
}

const regionTranslations: Record<string, Record<Language, string>> = {
    "Africa": { ar: "أفريقيا", en: "Africa", fr: "Afrique", es: "África", zgh: "ⵉⴼⵔⵉⵇⵢⴰ" },
    "Americas": { ar: "الأمريكتين", en: "Americas", fr: "Amériques", es: "Américas", zgh: "ⵜⵉⵎⵔⵉⴽⵉⵏ" },
    "Asia": { ar: "آسيا", en: "Asia", fr: "Asie", es: "Asia", zgh: "ⴰⵙⵢⴰ" },
    "Europe": { ar: "أوروبا", en: "Europe", fr: "Europe", es: "Europa", zgh: "ⵓⵕⵓⴱⴱⴰ" },
    "Oceania": { ar: "أوقيانوسيا", en: "Oceania", fr: "Océanie", es: "Oceanía", zgh: "ⵓⵙⵢⴰⵏⵢⴰ" },
    "Antarctic": { ar: "القطب الجنوبي", en: "Antarctic", fr: "Antarctique", es: "Antártico", zgh: "ⴰⵏⵜⴰⵔⴽⵜⵉⴽⴰ" }
};

export const getAllCountries = async (): Promise<Country[]> => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,capital,currencies,region,translations');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();

        const mappedCountries: Country[] = data
            .filter((c: any) => countryTimezones[c.cca2]) // Only include ones with valid timezone mapping
            .map((c: any) => {
                // Use currency Code (e.g. USD) instead of symbol for consistency
                const currencyCode = c.currencies ? Object.keys(c.currencies)[0] : 'N/A';
                
                // Safe Capital access
                const capitalEn = c.capital && c.capital.length > 0 ? c.capital[0] : 'N/A';

                // Region Translation
                const regionEn = c.region || '';
                const translatedRegion = regionTranslations[regionEn] || { 
                    ar: regionEn, en: regionEn, fr: regionEn, es: regionEn, zgh: regionEn 
                };

                return {
                    code: c.cca2,
                    name: {
                        ar: c.translations?.ara?.common || c.name.common,
                        en: c.name.common,
                        fr: c.translations?.fra?.common || c.name.common,
                        es: c.translations?.spa?.common || c.name.common,
                        zgh: c.translations?.ara?.common || c.name.common // Fallback to Arabic for ZGH
                    },
                    capital: {
                        ar: capitalEn, // API does not provide translated capitals easily, using EN/Native
                        en: capitalEn,
                        fr: capitalEn,
                        es: capitalEn,
                        zgh: capitalEn
                    },
                    timezone: countryTimezones[c.cca2],
                    currency: {
                        ar: currencyCode,
                        en: currencyCode,
                        fr: currencyCode,
                        es: currencyCode,
                        zgh: currencyCode
                    },
                    region: translatedRegion
                };
            });

        // Sort by Name (EN default)
        return mappedCountries.sort((a, b) => a.name.en.localeCompare(b.name.en));
    } catch (error) {
        console.error("World Service Error:", error);
        return [];
    }
};
