
import { Translation, Language } from './i18n/types';
import { arUI } from './i18n/ar';
import { enUI } from './i18n/en';
import { frUI } from './i18n/fr';
import { esUI } from './i18n/es';
import { zghUI } from './i18n/zgh';

export type { Language, CharacterId } from './i18n/types';

export const translations: Record<Language, Translation> = {
  ar: arUI,
  en: enUI,
  fr: frUI,
  es: esUI,
  zgh: zghUI
};
