
import { Language } from './translations';

export interface Country {
    code: string;
    name: Record<Language, string>;
    capital: Record<Language, string>;
    timezone: string;
    currency: Record<Language, string>;
    region: Record<Language, string>;
}

export const countries: Country[] = [
    {
        code: 'SA',
        name: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', fr: 'Arabie saoudite', es: 'Arabia Saudita', zgh: 'ⵜⴰⴳⵍⴷⵉⵜ ⵜⴰⵙⴰⵄⵓⴷⵉⵜ' },
        capital: { ar: 'الرياض', en: 'Riyadh', fr: 'Riyad', es: 'Riad', zgh: 'ⵔⵔⵉⵢⴰⴹ' },
        timezone: 'Asia/Riyadh',
        currency: { ar: 'ريال سعودي', en: 'Saudi Riyal', fr: 'Riyal saoudien', es: 'Riyal saudí', zgh: 'ⵔⵢⴰⵍ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'MA',
        name: { ar: 'المملكة المغربية', en: 'Morocco', fr: 'Maroc', es: 'Marruecos', zgh: 'ⵍⵎⵖⵔⵉⴱ' },
        capital: { ar: 'الرباط', en: 'Rabat', fr: 'Rabat', es: 'Rabat', zgh: 'ⵔⵔⴱⴰⵟ' },
        timezone: 'Africa/Casablanca',
        currency: { ar: 'درهم مغربي', en: 'Moroccan Dirham', fr: 'Dirham marocain', es: 'Dirham marroquí', zgh: 'ⴷⵔⵀⵎ' },
        region: { ar: 'أفريقيا', en: 'Africa', fr: 'Afrique', es: 'África', zgh: 'ⵉⴼⵔⵉⵇⵢⴰ' }
    },
    {
        code: 'EG',
        name: { ar: 'جمهورية مصر العربية', en: 'Egypt', fr: 'Égypte', es: 'Egipto', zgh: 'ⵎⵉⵚⵕ' },
        capital: { ar: 'القاهرة', en: 'Cairo', fr: 'Le Caire', es: 'El Cairo', zgh: 'ⵍⵇⴰⵀⵉⵔⴰ' },
        timezone: 'Africa/Cairo',
        currency: { ar: 'جنيه مصري', en: 'Egyptian Pound', fr: 'Livre égyptienne', es: 'Libra egipcia', zgh: 'ⵊⵓⵏⴰⵢⵀ' },
        region: { ar: 'أفريقيا', en: 'Africa', fr: 'Afrique', es: 'África', zgh: 'ⵉⴼⵔⵉⵇⵢⴰ' }
    },
    {
        code: 'AE',
        name: { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates', fr: 'Émirats arabes unis', es: 'Emiratos Árabes Unidos', zgh: 'ⵍⵉⵎⴰⵔⴰⵜ' },
        capital: { ar: 'أبو ظبي', en: 'Abu Dhabi', fr: 'Abou Dabi', es: 'Abu Dabi', zgh: 'ⴰⴱⵓ ⴹⴰⴱⵉ' },
        timezone: 'Asia/Dubai',
        currency: { ar: 'درهم إماراتي', en: 'UAE Dirham', fr: 'Dirham émirati', es: 'Dirham EAU', zgh: 'ⴷⵔⵀⵎ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'TR',
        name: { ar: 'تركيا', en: 'Turkey', fr: 'Turquie', es: 'Turquía', zgh: 'ⵜⵓⵔⴽⵢⴰ' },
        capital: { ar: 'أنقرة', en: 'Ankara', fr: 'Ankara', es: 'Ankara', zgh: 'ⴰⵏⵇⴰⵔⴰ' },
        timezone: 'Europe/Istanbul',
        currency: { ar: 'ليرة تركية', en: 'Turkish Lira', fr: 'Livre turque', es: 'Lira turca', zgh: 'ⵍⵉⵔⴰ' },
        region: { ar: 'أوروبا/آسيا', en: 'Europe/Asia', fr: 'Europe/Asie', es: 'Europa/Asia', zgh: 'ⵓⵕⵓⴱⴱⴰ/ⴰⵙⵢⴰ' }
    },
    {
        code: 'ID',
        name: { ar: 'إندونيسيا', en: 'Indonesia', fr: 'Indonésie', es: 'Indonesia', zgh: 'ⴰⵏⴷⵓⵏⵉⵙⵢⴰ' },
        capital: { ar: 'جاكرتا', en: 'Jakarta', fr: 'Jakarta', es: 'Yakarta', zgh: 'ⵊⴰⴽⴰⵔⵜⴰ' },
        timezone: 'Asia/Jakarta',
        currency: { ar: 'روبية إندونيسية', en: 'Indonesian Rupiah', fr: 'Roupie indonésienne', es: 'Rupia indonesia', zgh: 'ⵔⵓⴱⵢⴰ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'GB',
        name: { ar: 'المملكة المتحدة', en: 'United Kingdom', fr: 'Royaume-Uni', es: 'Reino Unido', zgh: 'ⵜⴰⴳⵍⴷⵉⵜ ⵉⵎⵓⵏⵏ' },
        capital: { ar: 'لندن', en: 'London', fr: 'Londres', es: 'Londres', zgh: 'ⵍⵓⵏⴹⵓⵏ' },
        timezone: 'Europe/London',
        currency: { ar: 'جنيه إسترليني', en: 'Pound Sterling', fr: 'Livre sterling', es: 'Libra esterlina', zgh: 'ⵊⵓⵏⴰⵢⵀ' },
        region: { ar: 'أوروبا', en: 'Europe', fr: 'Europe', es: 'Europa', zgh: 'ⵓⵕⵓⴱⴱⴰ' }
    },
    {
        code: 'US',
        name: { ar: 'الولايات المتحدة', en: 'United States', fr: 'États-Unis', es: 'Estados Unidos', zgh: 'ⵉⵡⵓⵏⴰⴽ ⵉⵎⵓⵏⵏ' },
        capital: { ar: 'واشنطن العاصمة', en: 'Washington, D.C.', fr: 'Washington', es: 'Washington D. C.', zgh: 'ⵡⴰⵛⵉⵏⵟⵓⵏ' },
        timezone: 'America/New_York',
        currency: { ar: 'دولار أمريكي', en: 'US Dollar', fr: 'Dollar américain', es: 'Dólar estadounidense', zgh: 'ⴹⵓⵍⴰⵕ' },
        region: { ar: 'أمريكا الشمالية', en: 'North America', fr: 'Amérique du Nord', es: 'América del Norte', zgh: 'ⴰⵎⵔⵉⴽⴰ' }
    },
    {
        code: 'JP',
        name: { ar: 'اليابان', en: 'Japan', fr: 'Japon', es: 'Japón', zgh: 'ⵍⵢⴰⴱⴰⵏ' },
        capital: { ar: 'طوكيو', en: 'Tokyo', fr: 'Tokyo', es: 'Tokio', zgh: 'ⵟⵓⴽⵢⵓ' },
        timezone: 'Asia/Tokyo',
        currency: { ar: 'ين ياباني', en: 'Japanese Yen', fr: 'Yen japonais', es: 'Yen japonés', zgh: 'ⵢⴰⵏ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'CN',
        name: { ar: 'الصين', en: 'China', fr: 'Chine', es: 'China', zgh: 'ⵛⵛⵉⵏⵡⴰ' },
        capital: { ar: 'بكين', en: 'Beijing', fr: 'Pékin', es: 'Pekín', zgh: 'ⴱⵉⴽⵉⵏ' },
        timezone: 'Asia/Shanghai',
        currency: { ar: 'يوان صيني', en: 'Chinese Yuan', fr: 'Yuan chinois', es: 'Yuan chino', zgh: 'ⵢⵓⵡⴰⵏ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'DE',
        name: { ar: 'ألمانيا', en: 'Germany', fr: 'Allemagne', es: 'Alemania', zgh: 'ⴰⵍⵎⴰⵏⵢⴰ' },
        capital: { ar: 'برلين', en: 'Berlin', fr: 'Berlin', es: 'Berlín', zgh: 'ⴱⵉⵔⵍⵉⵏ' },
        timezone: 'Europe/Berlin',
        currency: { ar: 'يورو', en: 'Euro', fr: 'Euro', es: 'Euro', zgh: 'ⵓⵕⵓ' },
        region: { ar: 'أوروبا', en: 'Europe', fr: 'Europe', es: 'Europa', zgh: 'ⵓⵕⵓⴱⴱⴰ' }
    },
    {
        code: 'MY',
        name: { ar: 'ماليزيا', en: 'Malaysia', fr: 'Malaisie', es: 'Malasia', zgh: 'ⵎⴰⵍⵉⵣⵢⴰ' },
        capital: { ar: 'كوالالمبور', en: 'Kuala Lumpur', fr: 'Kuala Lumpur', es: 'Kuala Lumpur', zgh: 'ⴽⵡⴰⵍⴰ ⵍⵓⵎⴱⵓⵔ' },
        timezone: 'Asia/Kuala_Lumpur',
        currency: { ar: 'رينغيت ماليزي', en: 'Malaysian Ringgit', fr: 'Ringgit malaisien', es: 'Ringgit malasio', zgh: 'ⵔⵉⵏⴳⵉⵜ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'PK',
        name: { ar: 'باكستان', en: 'Pakistan', fr: 'Pakistan', es: 'Pakistán', zgh: 'ⴱⴰⴽⵉⵙⵜⴰⵏ' },
        capital: { ar: 'إسلام آباد', en: 'Islamabad', fr: 'Islamabad', es: 'Islamabad', zgh: 'ⵉⵙⵍⴰⵎⴰⴱⴰⴷ' },
        timezone: 'Asia/Karachi',
        currency: { ar: 'روبية باكستانية', en: 'Pakistani Rupee', fr: 'Roupie pakistanaise', es: 'Rupia pakistaní', zgh: 'ⵔⵓⴱⵢⴰ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    },
    {
        code: 'DZ',
        name: { ar: 'الجزائر', en: 'Algeria', fr: 'Algérie', es: 'Argelia', zgh: 'ⴷⵣⴰⵢⵔ' },
        capital: { ar: 'الجزائر', en: 'Algiers', fr: 'Alger', es: 'Argel', zgh: 'ⴷⵣⴰⵢⵔ' },
        timezone: 'Africa/Algiers',
        currency: { ar: 'دينار جزائري', en: 'Algerian Dinar', fr: 'Dinar algérien', es: 'Dinar argelino', zgh: 'ⴷⵉⵏⴰⵔ' },
        region: { ar: 'أفريقيا', en: 'Africa', fr: 'Afrique', es: 'África', zgh: 'ⵉⴼⵔⵉⵇⵢⴰ' }
    },
    {
        code: 'IN',
        name: { ar: 'الهند', en: 'India', fr: 'Inde', es: 'India', zgh: 'ⵍⵀⵉⵏⴷ' },
        capital: { ar: 'نيودلهي', en: 'New Delhi', fr: 'New Delhi', es: 'Nueva Delhi', zgh: 'ⵏⵢⵓ ⴷⵉⵍⵀⵉ' },
        timezone: 'Asia/Kolkata',
        currency: { ar: 'روبية هندية', en: 'Indian Rupee', fr: 'Roupie indienne', es: 'Rupia india', zgh: 'ⵔⵓⴱⵢⴰ' },
        region: { ar: 'آسيا', en: 'Asia', fr: 'Asie', es: 'Asia', zgh: 'ⴰⵙⵢⴰ' }
    }
];
