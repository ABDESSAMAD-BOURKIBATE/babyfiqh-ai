
import { Language } from './translations';

export type LibraryItemType = 
  | 'prophet' 
  | 'companion' 
  | 'sahabiyat' 
  | 'tabiin' 
  | 'atba_tabiin' 
  | 'scholar' 
  | 'fiqh_ibadat' 
  | 'fiqh_muamalat'
  | 'fiqh_family'
  | 'fiqh_jinayat'
  | 'fiqh_judiciary'
  | 'fiqh_politics'
  | 'fiqh_ethics'
  | 'fiqh_nawazil'
  | 'fiqh_tech'
  | 'fiqh_cyber';

export interface LibraryItem {
    id: string;
    names: Record<Language, string>;
    type: LibraryItemType;
    subtype?: 'mother_of_believers'; // Optional distinguishing property
}

export const prophets: LibraryItem[] = [
    { id: 'adam', type: 'prophet', names: { ar: 'آدم عليه السلام', en: 'Adam (AS)', fr: 'Adam (PSL)', es: 'Adán (P)', zgh: 'ⴰⴷⴰⵎ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'idris', type: 'prophet', names: { ar: 'إدريس عليه السلام', en: 'Idris (AS)', fr: 'Idris (PSL)', es: 'Idris (P)', zgh: 'ⵉⴷⵔⵉⵙ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'nuh', type: 'prophet', names: { ar: 'نوح عليه السلام', en: 'Noah (AS)', fr: 'Noé (PSL)', es: 'Noé (P)', zgh: 'ⵏⵓⵃ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'hud', type: 'prophet', names: { ar: 'هود عليه السلام', en: 'Hud (AS)', fr: 'Houd (PSL)', es: 'Hud (P)', zgh: 'ⵀⵓⴷ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'saleh', type: 'prophet', names: { ar: 'صالح عليه السلام', en: 'Saleh (AS)', fr: 'Saleh (PSL)', es: 'Saleh (P)', zgh: 'ⵚⴰⵍⵃ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'ibrahim', type: 'prophet', names: { ar: 'إبراهيم عليه السلام', en: 'Abraham (AS)', fr: 'Abraham (PSL)', es: 'Abraham (P)', zgh: 'ⵉⴱⵔⴰⵀⵉⵎ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'lut', type: 'prophet', names: { ar: 'لوط عليه السلام', en: 'Lot (AS)', fr: 'Loth (PSL)', es: 'Lot (P)', zgh: 'ⵍⵓⵟ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'ismail', type: 'prophet', names: { ar: 'إسماعيل عليه السلام', en: 'Ishmael (AS)', fr: 'Ismaël (PSL)', es: 'Ismael (P)', zgh: 'ⵉⵙⵎⴰⵄⵉⵍ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'ishaq', type: 'prophet', names: { ar: 'إسحاق عليه السلام', en: 'Isaac (AS)', fr: 'Isaac (PSL)', es: 'Isaac (P)', zgh: 'ⵉⵙⵃⴰⵇ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'yaqub', type: 'prophet', names: { ar: 'يعقوب عليه السلام', en: 'Jacob (AS)', fr: 'Jacob (PSL)', es: 'Jacob (P)', zgh: 'ⵢⴰⵄⵇⵓⴱ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'yusuf', type: 'prophet', names: { ar: 'يوسف عليه السلام', en: 'Joseph (AS)', fr: 'Joseph (PSL)', es: 'José (P)', zgh: 'ⵢⵓⵙⴼ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'ayoub', type: 'prophet', names: { ar: 'أيوب عليه السلام', en: 'Job (AS)', fr: 'Job (PSL)', es: 'Job (P)', zgh: 'ⴰⵢⵢⵓⴱ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'shuaib', type: 'prophet', names: { ar: 'شعيب عليه السلام', en: 'Shuaib (AS)', fr: 'Chuaib (PSL)', es: 'Shuaib (P)', zgh: 'ⵛⵓⵄⴰⵢⴱ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'musa', type: 'prophet', names: { ar: 'موسى عليه السلام', en: 'Moses (AS)', fr: 'Moïse (PSL)', es: 'Moisés (P)', zgh: 'ⵎⵓⵙⴰ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'harun', type: 'prophet', names: { ar: 'هارون عليه السلام', en: 'Aaron (AS)', fr: 'Aaron (PSL)', es: 'Aarón (P)', zgh: 'ⵀⴰⵔⵓⵏ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'dhul_kifl', type: 'prophet', names: { ar: 'ذو الكفل عليه السلام', en: 'Dhul-Kifl (AS)', fr: 'Dhul-Kifl (PSL)', es: 'Dhul-Kifl (P)', zgh: 'ⴷⵓ ⵍⴽⵉⴼⵍ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'dawud', type: 'prophet', names: { ar: 'داود عليه السلام', en: 'David (AS)', fr: 'David (PSL)', es: 'David (P)', zgh: 'ⴷⴰⵡⵓⴷ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'sulaiman', type: 'prophet', names: { ar: 'سليمان عليه السلام', en: 'Solomon (AS)', fr: 'Salomon (PSL)', es: 'Salomón (P)', zgh: 'ⵙⵓⵍⴰⵢⵎⴰⵏ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'ilyas', type: 'prophet', names: { ar: 'إلياس عليه السلام', en: 'Ilyas (AS)', fr: 'Élie (PSL)', es: 'Elías (P)', zgh: 'ⵉⵍⵢⴰⵙ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'al_yasa', type: 'prophet', names: { ar: 'اليسع عليه السلام', en: 'Al-Yasa (AS)', fr: 'Élisée (PSL)', es: 'Eliseo (P)', zgh: 'ⴰⵍ ⵢⴰⵙⴰⵄ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'yunus', type: 'prophet', names: { ar: 'يونس عليه السلام', en: 'Jonah (AS)', fr: 'Jonas (PSL)', es: 'Jonás (P)', zgh: 'ⵢⵓⵏⵓⵙ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'zakariya', type: 'prophet', names: { ar: 'زكريا عليه السلام', en: 'Zechariah (AS)', fr: 'Zacharie (PSL)', es: 'Zacarías (P)', zgh: 'ⵣⴰⴽⴰⵔⵉⵢⴰ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'yahya', type: 'prophet', names: { ar: 'يحيى عليه السلام', en: 'John (AS)', fr: 'Jean (PSL)', es: 'Juan (P)', zgh: 'ⵢⴰⵃⵢⴰ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'isa', type: 'prophet', names: { ar: 'عيسى عليه السلام', en: 'Jesus (AS)', fr: 'Jésus (PSL)', es: 'Jesús (P)', zgh: 'ⵄⵉⵙⴰ (ⴼⵍⴰⵙ ⵜⴰⵍⵡⵉⵜ)' } },
    { id: 'muhammad', type: 'prophet', names: { ar: 'محمد صلى الله عليه وسلم', en: 'Muhammad (SAW)', fr: 'Mahomet (PBSL)', es: 'Muhammad (SAW)', zgh: 'ⵎⵓⵃⴰⵎⵎⴷ (ⵜⴰⵥⴰⵍⵍⵉⵜ ⵏ ⵕⴱⴱⵉ ⴼⵍⴰⵙ)' } },
];

export const companions: LibraryItem[] = [
    { id: 'abu_bakr', type: 'companion', names: { ar: 'أبو بكر الصديق', en: 'Abu Bakr Al-Siddiq', fr: 'Abou Bakr', es: 'Abu Bakr', zgh: 'ⴰⴱⵓ ⴱⴰⴽⵔ ⴰⵚⴷⴷⵉⵇ' } },
    { id: 'umar', type: 'companion', names: { ar: 'عمر بن الخطاب', en: 'Umar ibn Al-Khattab', fr: 'Omar', es: 'Umar', zgh: 'ⵄⵓⵎⴰⵕ ⴱⵏ ⵍⵅⵟⵟⴰⴱ' } },
    { id: 'uthman', type: 'companion', names: { ar: 'عثمان بن عفان', en: 'Uthman ibn Affan', fr: 'Othman', es: 'Uthman', zgh: 'ⵄⵓⵜⵎⴰⵏ ⴱⵏ ⵄⴼⴼⴰⵏ' } },
    { id: 'ali', type: 'companion', names: { ar: 'علي بن أبي طالب', en: 'Ali ibn Abi Talib', fr: 'Ali', es: 'Ali', zgh: 'ⵄⴰⵍⵉ ⴱⵏ ⴰⴱⵉ ⵟⴰⵍⵉⴱ' } },
    { id: 'talha', type: 'companion', names: { ar: 'طلحة بن عبيد الله', en: 'Talha ibn Ubaydullah', fr: 'Talha', es: 'Talha', zgh: 'ⵟⴰⵍⵃⴰ ⴱⵏ ⵄⵓⴱⴰⵢⴷⵉⵍⵍⴰⵀ' } },
    { id: 'zubayr', type: 'companion', names: { ar: 'الزبير بن العوام', en: 'Zubayr ibn al-Awam', fr: 'Zubayr', es: 'Zubayr', zgh: 'ⵣⵓⴱⴰⵢⵔ ⴱⵏ ⵍⵄⵡⵡⴰⵎ' } },
    { id: 'abdul_rahman', type: 'companion', names: { ar: 'عبد الرحمن بن عوف', en: 'Abd al-Rahman ibn Awf', fr: 'Abd al-Rahman', es: 'Abd al-Rahman', zgh: 'ⵄⴱⴷ ⵔⵔⴰⵃⵎⴰⵏ ⴱⵏ ⵄⴰⵡⴼ' } },
    { id: 'saad', type: 'companion', names: { ar: 'سعد بن أبي وقاص', en: 'Sa\'d ibn Abi Waqqas', fr: 'Sa\'d', es: 'Sa\'d', zgh: 'ⵙⴰⵄⴷ ⴱⵏ ⴰⴱⵉ ⵡⴰⵇⵇⴰⵚ' } },
    { id: 'said', type: 'companion', names: { ar: 'سعيد بن زيد', en: 'Said ibn Zayd', fr: 'Said', es: 'Said', zgh: 'ⵙⴰⵄⵉⴷ ⴱⵏ ⵣⴰⵢⴷ' } },
    { id: 'abu_ubaidah', type: 'companion', names: { ar: 'أبو عبيدة بن الجراح', en: 'Abu Ubaidah ibn al-Jarrah', fr: 'Abou Oubeida', es: 'Abu Ubaidah', zgh: 'ⴰⴱⵓ ⵄⵓⴱⴰⵢⴷⴰ ⴱⵏ ⵍⵊⵔⵔⴰⵃ' } },
    { id: 'hamza', type: 'companion', names: { ar: 'حمزة بن عبد المطلب', en: 'Hamza ibn Abdul-Muttalib', fr: 'Hamza', es: 'Hamza', zgh: 'ⵃⴰⵎⵣⴰ ⴱⵏ ⵄⴱⴷ ⵍⵎⵓⵟⴰⵍⵉⴱ' } },
    { id: 'musab', type: 'companion', names: { ar: 'مصعب بن عمير', en: 'Mus\'ab ibn Umayr', fr: 'Mous\'ab', es: 'Mus\'ab', zgh: 'ⵎⵓⵚⵄⴰⴱ ⴱⵏ ⵄⵓⵎⴰⵢⵔ' } },
    { id: 'bilal', type: 'companion', names: { ar: 'بلال بن رباح', en: 'Bilal ibn Rabah', fr: 'Bilal', es: 'Bilal', zgh: 'ⴱⵉⵍⴰⵍ ⴱⵏ ⵔⴰⴱⴰⵃ' } },
    { id: 'khalid', type: 'companion', names: { ar: 'خالد بن الوليد', en: 'Khalid ibn Al-Walid', fr: 'Khalid', es: 'Jálid', zgh: 'ⵅⴰⵍⵉⴷ ⴱⵏ ⵍⵡⴰⵍⵉⴷ' } },
    { id: 'abu_hurairah', type: 'companion', names: { ar: 'أبو هريرة', en: 'Abu Hurairah', fr: 'Abou Hourayra', es: 'Abu Hurairah', zgh: 'ⴰⴱⵓ ⵀⵓⵔⴰⵢⵔⴰ' } },
    { id: 'anas', type: 'companion', names: { ar: 'أنس بن مالك', en: 'Anas ibn Malik', fr: 'Anas', es: 'Anas', zgh: 'ⴰⵏⴰⵙ ⴱⵏ ⵎⴰⵍⵉⴽ' } },
    { id: 'salman', type: 'companion', names: { ar: 'سلمان الفارسي', en: 'Salman Al-Farsi', fr: 'Salman', es: 'Salman', zgh: 'ⵙⴰⵍⵎⴰⵏ ⵍⴼⴰⵔⵉⵙⵉ' } },
    { id: 'abdullah_masud', type: 'companion', names: { ar: 'عبد الله بن مسعود', en: 'Abdullah ibn Masud', fr: 'Abdullah ibn Masoud', es: 'Abdullah ibn Masud', zgh: 'ⵄⴱⴷ ⵍⵍⴰⵀ ⴱⵏ ⵎⴰⵙⵄⵓⴷ' } },
    { id: 'muadh', type: 'companion', names: { ar: 'معاذ بن جبل', en: 'Mu\'adh ibn Jabal', fr: 'Mou\'adh', es: 'Mu\'adh', zgh: 'ⵎⵓⵄⴰⴷ ⴱⵏ ⵊⴰⴱⴰⵍ' } },
    { id: 'zayd_harithah', type: 'companion', names: { ar: 'زيد بن حارثة', en: 'Zayd ibn Harithah', fr: 'Zayd', es: 'Zayd', zgh: 'ⵣⴰⵢⴷ ⴱⵏ ⵃⴰⵔⵉⵜⴰ' } },
    { id: 'usama', type: 'companion', names: { ar: 'أسامة بن زيد', en: 'Usama ibn Zayd', fr: 'Oussama', es: 'Usama', zgh: 'ⵓⵙⴰⵎⴰ ⴱⵏ ⵣⴰⵢⴷ' } },
    { id: 'abdullah_umar', type: 'companion', names: { ar: 'عبد الله بن عمر', en: 'Abdullah ibn Umar', fr: 'Abdullah ibn Omar', es: 'Abdullah ibn Umar', zgh: 'ⵄⴱⴷ ⵍⵍⴰⵀ ⴱⵏ ⵄⵓⵎⴰⵕ' } },
    { id: 'abdullah_abbas', type: 'companion', names: { ar: 'عبد الله بن عباس', en: 'Abdullah ibn Abbas', fr: 'Abdullah ibn Abbas', es: 'Abdullah ibn Abbas', zgh: 'ⵄⴱⴷ ⵍⵍⴰⵀ ⴱⵏ ⵄⴱⴱⴰⵙ' } },
    { id: 'ammar', type: 'companion', names: { ar: 'عمار بن ياسر', en: 'Ammar ibn Yasir', fr: 'Ammar', es: 'Ammar', zgh: 'ⵄⵎⵎⴰⵔ ⴱⵏ ⵢⴰⵙⵉⵔ' } },
    { id: 'suhayb', type: 'companion', names: { ar: 'صهيب الرومي', en: 'Suhayb ar-Rumi', fr: 'Souhayb', es: 'Suhayb', zgh: 'ⵚⵓⵀⴰⵢⴱ ⵔⵔⵓⵎⵉ' } },
    { id: 'hassan', type: 'companion', names: { ar: 'حسان بن ثابت', en: 'Hassan ibn Thabit', fr: 'Hassan', es: 'Hassan', zgh: 'ⵃⴰⵙⵙⴰⵏ ⴱⵏ ⵜⴰⴱⵉⵜ' } },
    { id: 'jaafar', type: 'companion', names: { ar: 'جعفر بن أبي طالب', en: 'Ja\'far ibn Abi Talib', fr: 'Ja\'far', es: 'Ja\'far', zgh: 'ⵊⴰⵄⴼⴰⵕ ⴱⵏ ⴰⴱⵉ ⵟⴰⵍⵉⴱ' } },
    { id: 'amr_aas', type: 'companion', names: { ar: 'عمرو بن العاص', en: 'Amr ibn al-Aas', fr: 'Amr ibn al-Aas', es: 'Amr ibn al-Aas', zgh: 'ⵄⵎⵔⵓ ⴱⵏ ⵍⵄⴰⵚ' } },
    { id: 'abu_dharr', type: 'companion', names: { ar: 'أبو ذر الغفاري', en: 'Abu Dharr al-Ghifari', fr: 'Abu Dharr', es: 'Abu Dharr', zgh: 'ⴰⴱⵓ ⴷⴰⵔ ⵍⵖⵉⴼⴰⵔⵉ' } },
    { id: 'ubayy', type: 'companion', names: { ar: 'أبي بن كعب', en: 'Ubayy ibn Ka\'b', fr: 'Ubayy', es: 'Ubayy', zgh: 'ⵓⴱⴰⵢⵢ ⴱⵏ ⴽⴰⵄⴱ' } },
    { id: 'hudhayfah', type: 'companion', names: { ar: 'حذيفة بن اليمان', en: 'Hudhayfah ibn al-Yaman', fr: 'Hudhayfah', es: 'Hudhayfah', zgh: 'ⵃⵓⴷⴰⵢⴼⴰ ⴱⵏ ⵍⵢⴰⵎⴰⵏ' } },
];

export const sahabiyat: LibraryItem[] = [
    // Mothers of the Believers (Wives of the Prophet)
    { id: 'khadija', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'خديجة بنت خويلد', en: 'Khadija bint Khuwaylid', fr: 'Khadija', es: 'Khadija', zgh: 'ⵅⴰⴷⵉⵊⴰ ⴱⵏⵜ ⵅⵓⵡⴰⵢⵍⵉⴷ' } },
    { id: 'sawda', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'سودة بنت زمعة', en: 'Sawda bint Zam\'a', fr: 'Sawda', es: 'Sawda', zgh: 'ⵙⴰⵡⴷⴰ ⴱⵏⵜ ⵣⴰⵎⵄⴰ' } },
    { id: 'aisha', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'عائشة بنت أبي بكر', en: 'Aisha bint Abu Bakr', fr: 'Aïcha', es: 'Aisha', zgh: 'ⵄⴰⵢⵛⴰ ⴱⵏⵜ ⴰⴱⵉ ⴱⴰⴽⵔ' } },
    { id: 'hafsa', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'حفصة بنت عمر', en: 'Hafsa bint Umar', fr: 'Hafsa', es: 'Hafsa', zgh: 'ⵃⴰⴼⵚⴰ ⴱⵏⵜ ⵄⵓⵎⴰⵕ' } },
    { id: 'zaynab_khuzayma', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'زينب بنت خزيمة', en: 'Zaynab bint Khuzayma', fr: 'Zaynab bint Khouzayma', es: 'Zaynab bint Juzayma', zgh: 'ⵣⴰⵢⵏⴰⴱ ⴱⵏⵜ ⵅⵓⵣⴰⵢⵎⴰ' } },
    { id: 'umm_salamah', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'أم سلمة (هند بنت أبي أمية)', en: 'Umm Salamah', fr: 'Oum Salama', es: 'Umm Salamah', zgh: 'ⵓⵎⵎ ⵙⴰⵍⴰⵎⴰ' } },
    { id: 'zaynab_jahsh', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'زينب بنت جحش', en: 'Zaynab bint Jahsh', fr: 'Zaynab', es: 'Zaynab', zgh: 'ⵣⴰⵢⵏⴰⴱ ⴱⵏⵜ ⵊⴰⵃⵛ' } },
    { id: 'juwayriya', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'جويرية بنت الحارث', en: 'Juwayriya bint al-Harith', fr: 'Juwayriya', es: 'Juwayriya', zgh: 'ⵊⵓⵡⴰⵢⵔⵉⵢⴰ ⴱⵏⵜ ⵍⵃⴰⵔⵉⵜ' } },
    { id: 'umm_habiba', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'أم حبيبة (رملة بنت أبي سفيان)', en: 'Umm Habiba', fr: 'Oum Habiba', es: 'Umm Habiba', zgh: 'ⵓⵎⵎ ⵃⴰⴱⵉⴱⴰ' } },
    { id: 'safiyya', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'صفية بنت حيي', en: 'Safiyya bint Huyayy', fr: 'Safiyya', es: 'Safiyya', zgh: 'ⵚⴰⴼⵉⵢⵢⴰ ⴱⵏⵜ ⵃⵓⵢⴰⵢ' } },
    { id: 'maymuna', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'ميمونة بنت الحارث', en: 'Maymuna bint al-Harith', fr: 'Maymuna', es: 'Maymuna', zgh: 'ⵎⴰⵢⵎⵓⵏⴰ ⴱⵏⵜ ⵍⵃⴰⵔⵉⵜ' } },
    { id: 'maria', type: 'sahabiyat', subtype: 'mother_of_believers', names: { ar: 'مارية القبطية', en: 'Maria al-Qibtiyya', fr: 'Maria la Copte', es: 'Maria la Copta', zgh: 'ⵎⴰⵔⵢⴰ ⵍⵇⵉⴱⵜⵉⵢⵢⴰ' } },

    // Daughters of the Prophet
    { id: 'fatima', type: 'sahabiyat', names: { ar: 'فاطمة الزهراء', en: 'Fatima Al-Zahra', fr: 'Fatima', es: 'Fátima', zgh: 'ⴼⴰⵟⵉⵎⴰ ⵣⵣⴰⵀⵔⴰ' } },
    { id: 'ruqayyah', type: 'sahabiyat', names: { ar: 'رقية بنت محمد', en: 'Ruqayyah bint Muhammad', fr: 'Rouqayya', es: 'Ruqayyah', zgh: 'ⵔⵓⵇⴰⵢⵢⴰ ⴱⵏⵜ ⵎⵓⵃⴰⵎⵎⴷ' } },
    { id: 'umm_kulthum', type: 'sahabiyat', names: { ar: 'أم كلثوم بنت محمد', en: 'Umm Kulthum bint Muhammad', fr: 'Oum Koulthoum', es: 'Umm Kulthum', zgh: 'ⵓⵎⵎ ⴽⵓⵍⵜⵓⵎ ⴱⵏⵜ ⵎⵓⵃⴰⵎⵎⴷ' } },
    { id: 'zainab_bint_muhammad', type: 'sahabiyat', names: { ar: 'زينب بنت محمد', en: 'Zainab bint Muhammad', fr: 'Zainab', es: 'Zainab', zgh: 'ⵣⴰⵢⵏⴰⴱ ⴱⵏⵜ ⵎⵓⵃⴰⵎⵎⴷ' } },

    // Prominent Sahabiyat
    { id: 'asma', type: 'sahabiyat', names: { ar: 'أسماء بنت أبي بكر', en: 'Asma bint Abu Bakr', fr: 'Asma', es: 'Asma', zgh: 'ⴰⵙⵎⴰ ⴱⵏⵜ ⴰⴱⵉ ⴱⴰⴽⵔ' } },
    { id: 'sumayyah', type: 'sahabiyat', names: { ar: 'سمية بنت خياط', en: 'Sumayyah bint Khayyat', fr: 'Soumayya', es: 'Sumayyah', zgh: 'ⵙⵓⵎⴰⵢⵢⴰ ⴱⵏⵜ ⵅⴰⵢⵢⴰⵟ' } },
    { id: 'umm_ayman', type: 'sahabiyat', names: { ar: 'أم أيمن', en: 'Umm Ayman', fr: 'Oum Ayman', es: 'Umm Ayman', zgh: 'ⵓⵎⵎ ⴰⵢⵎⴰⵏ' } },
    { id: 'umm_sulaym', type: 'sahabiyat', names: { ar: 'أم سليم (الرميصاء)', en: 'Umm Sulaym', fr: 'Oum Soulaym', es: 'Umm Sulaym', zgh: 'ⵓⵎⵎ ⵙⵓⵍⴰⵢⵎ' } },
    { id: 'nusaybah', type: 'sahabiyat', names: { ar: 'نسيبة بنت كعب (أم عمارة)', en: 'Nusaybah bint Ka\'b', fr: 'Nousayba', es: 'Nusaybah', zgh: 'ⵏⵓⵙⴰⵢⴱⴰ ⴱⵏⵜ ⴽⴰⵄⴱ' } },
    { id: 'khawla', type: 'sahabiyat', names: { ar: 'خولة بنت الأزور', en: 'Khawla bint al-Azwar', fr: 'Khawla', es: 'Jawla', zgh: 'ⵅⴰⵡⵍⴰ ⴱⵏⵜ ⵍⴰⵣⵡⴰⵔ' } },
    { id: 'al_khansa', type: 'sahabiyat', names: { ar: 'الخنساء', en: 'Al-Khansa', fr: 'Al-Khansa', es: 'Al-Khansa', zgh: 'ⵍⵅⴰⵏⵙⴰ' } },
    { id: 'halimah', type: 'sahabiyat', names: { ar: 'حليمة السعدية', en: 'Halimah Al-Sa\'diyah', fr: 'Halima', es: 'Halimah', zgh: 'ⵃⴰⵍⵉⵎⴰ ⵙⵙⴰⵄⴷⵉⵢⵢⴰ' } },
    { id: 'umm_haram', type: 'sahabiyat', names: { ar: 'أم حرام بنت ملحان', en: 'Umm Haram bint Milhan', fr: 'Oum Haram', es: 'Umm Haram', zgh: 'ⵓⵎⵎ ⵃⴰⵔⴰⵎ ⴱⵏⵜ ⵎⵉⵍⵃⴰⵏ' } },
    { id: 'asma_umays', type: 'sahabiyat', names: { ar: 'أسماء بنت عميس', en: 'Asma bint Umays', fr: 'Asma', es: 'Asma', zgh: 'ⴰⵙⵎⴰ ⴱⵏⵜ ⵄⵓⵎⴰⵢⵙ' } },
    { id: 'shifa', type: 'sahabiyat', names: { ar: 'الشفاء بنت عبد الله', en: 'Al-Shifa bint Abdullah', fr: 'Al-Shifa', es: 'Al-Shifa', zgh: 'ⵛⵛⵉⴼⴰ ⴱⵏⵜ ⵄⴱⴷ ⵍⵍⴰⵀ' } },
    { id: 'barakah', type: 'sahabiyat', names: { ar: 'بركة (أم أيمن)', en: 'Barakah (Umm Ayman)', fr: 'Barakah', es: 'Barakah', zgh: 'ⴱⴰⵔⴰⴽⴰ (ⵓⵎⵎ ⴰⵢⵎⴰⵏ)' } },
];

export const tabiin: LibraryItem[] = [
    { id: 'saeed_bin_al_musayyib', type: 'tabiin', names: { ar: 'سعيد بن المسيب', en: 'Saeed ibn al-Musayyib', fr: 'Saeed ibn al-Musayyib', es: 'Saeed ibn al-Musayyib', zgh: 'ⵙⴰⵄⵉⴷ ⴱⵏ ⵍⵎⵓⵙⴰⵢⵢⵉⴱ' } },
    { id: 'urwah_bin_al_zubayr', type: 'tabiin', names: { ar: 'عروة بن الزبير', en: 'Urwah ibn al-Zubayr', fr: 'Urwah ibn al-Zubayr', es: 'Urwah ibn al-Zubayr', zgh: 'ⵄⵓⵔⵡⴰ ⴱⵏ ⵣⵣⵓⴱⴰⵢⵔ' } },
    { id: 'al_qasim_bin_muhammad', type: 'tabiin', names: { ar: 'القاسم بن محمد', en: 'Al-Qasim ibn Muhammad', fr: 'Al-Qasim ibn Muhammad', es: 'Al-Qasim ibn Muhammad', zgh: 'ⵍⵇⴰⵙⵉⵎ ⴱⵏ ⵎⵓⵃⴰⵎⵎⴷ' } },
    { id: 'salim_bin_abdullah', type: 'tabiin', names: { ar: 'سالم بن عبد الله', en: 'Salim ibn Abdullah', fr: 'Salim ibn Abdullah', es: 'Salim ibn Abdullah', zgh: 'ⵙⴰⵍⵉⵎ ⴱⵏ ⵄⴱⴷ ⵍⵍⴰⵀ' } },
    { id: 'ata_bin_abi_rabah', type: 'tabiin', names: { ar: 'عطاء بن أبي رباح', en: 'Ata ibn Abi Rabah', fr: 'Ata ibn Abi Rabah', es: 'Ata ibn Abi Rabah', zgh: 'ⵄⴰⵟⴰ ⴱⵏ ⴰⴱⵉ ⵔⴰⴱⴰⵃ' } },
    { id: 'mujahid_bin_jabr', type: 'tabiin', names: { ar: 'مجاهد بن جبر', en: 'Mujahid ibn Jabr', fr: 'Mujahid ibn Jabr', es: 'Mujahid ibn Jabr', zgh: 'ⵎⵓⵊⴰⵀⵉⴷ ⴱⵏ ⵊⴰⴱⵔ' } },
    { id: 'tawus_bin_kaysan', type: 'tabiin', names: { ar: 'طاوس بن كيسان', en: 'Tawus ibn Kaysan', fr: 'Tawus ibn Kaysan', es: 'Tawus ibn Kaysan', zgh: 'ⵟⴰⵡⵓⵙ ⴱⵏ ⴽⴰⵢⵙⴰⵏ' } },
    { id: 'ikrimah', type: 'tabiin', names: { ar: 'عكرمة', en: 'Ikrimah', fr: 'Ikrimah', es: 'Ikrimah', zgh: 'ⵄⵉⴽⵔⵉⵎⴰ' } },
    { id: 'al_hasan_al_basri', type: 'tabiin', names: { ar: 'الحسن البصري', en: 'Al-Hasan Al-Basri', fr: 'Al-Hasan Al-Basri', es: 'Al-Hasan Al-Basri', zgh: 'ⵍⵃⴰⵙⴰⵏ ⵍⴱⴰⵚⵔⵉ' } },
    { id: 'ibn_sirin', type: 'tabiin', names: { ar: 'ابن سيرين', en: 'Ibn Sirin', fr: 'Ibn Sirin', es: 'Ibn Sirin', zgh: 'ⴱⵏ ⵙⵉⵔⵉⵏ' } },
    { id: 'al_shabi', type: 'tabiin', names: { ar: 'الشعبي', en: 'Al-Sha\'bi', fr: 'Al-Sha\'bi', es: 'Al-Sha\'bi', zgh: 'ⵛⵛⴰⵄⴱⵉ' } },
    { id: 'ibrahim_al_nakhai', type: 'tabiin', names: { ar: 'إبراهيم النخعي', en: 'Ibrahim Al-Nakha\'i', fr: 'Ibrahim Al-Nakha\'i', es: 'Ibrahim Al-Nakha\'i', zgh: 'ⵉⴱⵔⴰⵀⵉⵎ ⵏⵏⴰⵅⴰⵄⵉ' } },
    { id: 'qatadah', type: 'tabiin', names: { ar: 'قتادة', en: 'Qatadah', fr: 'Qatadah', es: 'Qatadah', zgh: 'ⵇⴰⵜⴰⴷⴰ' } },
    { id: 'thabit_al_bunani', type: 'tabiin', names: { ar: 'ثابت البناني', en: 'Thabit Al-Bunani', fr: 'Thabit Al-Bunani', es: 'Thabit Al-Bunani', zgh: 'ⵜⴰⴱⵉⵜ ⵍⴱⵓⵏⴰⵏⵉ' } },
    { id: 'malik_bin_dinar', type: 'tabiin', names: { ar: 'مالك بن دينار', en: 'Malik ibn Dinar', fr: 'Malik ibn Dinar', es: 'Malik ibn Dinar', zgh: 'ⵎⴰⵍⵉⴽ ⴱⵏ ⴷⵉⵏⴰⵔ' } },
    { id: 'makhul', type: 'tabiin', names: { ar: 'مكحول', en: 'Makhul', fr: 'Makhul', es: 'Makhul', zgh: 'ⵎⴰⴽⵃⵓⵍ' } },
    { id: 'raja_bin_haywah', type: 'tabiin', names: { ar: 'رجاء بن حيوة', en: 'Raja ibn Haywah', fr: 'Raja ibn Haywah', es: 'Raja ibn Haywah', zgh: 'ⵔⴰⵊⴰ ⴱⵏ ⵃⴰⵢⵡⴰ' } },
    { id: 'khalid_bin_madan', type: 'tabiin', names: { ar: 'خالد بن معدان', en: 'Khalid ibn Ma\'dan', fr: 'Khalid ibn Ma\'dan', es: 'Khalid ibn Ma\'dan', zgh: 'ⵅⴰⵍⵉⴷ ⴱⵏ ⵎⴰⵄⴷⴰⵏ' } },
    { id: 'abu_idris_al_khawlani', type: 'tabiin', names: { ar: 'أبو إدريس الخولاني', en: 'Abu Idris Al-Khawlani', fr: 'Abu Idris Al-Khawlani', es: 'Abu Idris Al-Khawlani', zgh: 'ⴰⴱⵓ ⵉⴷⵔⵉⵙ ⵍⵅⴰⵡⵍⴰⵏⵉ' } },
    { id: 'wahb_bin_munabbih', type: 'tabiin', names: { ar: 'وهب بن منبه', en: 'Wahb ibn Munabbih', fr: 'Wahb ibn Munabbih', es: 'Wahb ibn Munabbih', zgh: 'ⵡⴰⵀⴱ ⴱⵏ ⵎⵓⵏⴰⴱⴱⵉⵀ' } },
    { id: 'saeed_bin_jubayr', type: 'tabiin', names: { ar: 'سعيد بن جبير', en: 'Saeed ibn Jubayr', fr: 'Saeed ibn Jubayr', es: 'Saeed ibn Jubayr', zgh: 'ⵙⴰⵄⵉⴷ ⴱⵏ ⵊⵓⴱⴰⵢⵔ' } },
];

export const atbaTabiin: LibraryItem[] = [
    { id: 'malik_bin_anas', type: 'atba_tabiin', names: { ar: 'مالك بن أنس', en: 'Malik ibn Anas', fr: 'Malik ibn Anas', es: 'Malik ibn Anas', zgh: 'ⵎⴰⵍⵉⴽ ⴱⵏ ⴰⵏⴰⵙ' } },
    { id: 'al_zuhri', type: 'atba_tabiin', names: { ar: 'الزهري', en: 'Al-Zuhri', fr: 'Al-Zuhri', es: 'Al-Zuhri', zgh: 'ⵣⵣⵓⵀⵔⵉ' } },
    { id: 'ibn_jurayj', type: 'atba_tabiin', names: { ar: 'ابن جريج', en: 'Ibn Jurayj', fr: 'Ibn Jurayj', es: 'Ibn Jurayj', zgh: 'ⴱⵏ ⵊⵓⵔⴰⵢⵊ' } },
    { id: 'abdullah_bin_al_mubarak', type: 'atba_tabiin', names: { ar: 'عبد الله بن المبارك', en: 'Abdullah ibn Al-Mubarak', fr: 'Abdullah ibn Al-Mubarak', es: 'Abdullah ibn Al-Mubarak', zgh: 'ⵄⴱⴷ ⵍⵍⴰⵀ ⴱⵏ ⵍⵎⵓⴱⴰⵔⴰⴽ' } },
    { id: 'sufyan_bin_uyainah', type: 'atba_tabiin', names: { ar: 'سفيان بن عيينة', en: 'Sufyan ibn Uyainah', fr: 'Sufyan ibn Uyainah', es: 'Sufyan ibn Uyainah', zgh: 'ⵙⵓⴼⵢⴰⵏ ⴱⵏ ⵄⵓⵢⴰⵢⵏⴰ' } },
    { id: 'sufyan_al_thawri', type: 'atba_tabiin', names: { ar: 'سفيان الثوري', en: 'Sufyan Al-Thawri', fr: 'Sufyan Al-Thawri', es: 'Sufyan Al-Thawri', zgh: 'ⵙⵓⴼⵢⴰⵏ ⵜⵜⴰⵡⵔⵉ' } },
    { id: 'abu_hanifa', type: 'atba_tabiin', names: { ar: 'أبو حنيفة', en: 'Abu Hanifa', fr: 'Abou Hanifa', es: 'Abu Hanifa', zgh: 'ⴰⴱⵓ ⵃⴰⵏⵉⴼⴰ' } },
    { id: 'shubah', type: 'atba_tabiin', names: { ar: 'شعبة', en: 'Shu\'bah', fr: 'Shu\'bah', es: 'Shu\'bah', zgh: 'ⵛⵓⵄⴱⴰ' } },
    { id: 'hammad_bin_zayd', type: 'atba_tabiin', names: { ar: 'حماد بن زيد', en: 'Hammad ibn Zayd', fr: 'Hammad ibn Zayd', es: 'Hammad ibn Zayd', zgh: 'ⵃⴰⵎⵎⴰⴷ ⴱⵏ ⵣⴰⵢⴷ' } },
    { id: 'hammad_bin_salamah', type: 'atba_tabiin', names: { ar: 'حماد بن سلمة', en: 'Hammad ibn Salamah', fr: 'Hammad ibn Salamah', es: 'Hammad ibn Salamah', zgh: 'ⵃⴰⵎⵎⴰⴷ ⴱⵏ ⵙⴰⵍⴰⵎⴰ' } },
    { id: 'waki_bin_al_jarrah', type: 'atba_tabiin', names: { ar: 'وكيع بن الجراح', en: 'Waki\' ibn Al-Jarrah', fr: 'Waki\' ibn Al-Jarrah', es: 'Waki\' ibn Al-Jarrah', zgh: 'ⵡⴰⴽⵉⵄ ⴱⵏ ⵍⵊⵔⵔⴰⵃ' } },
    { id: 'al_awzai', type: 'atba_tabiin', names: { ar: 'الأوزاعي', en: 'Al-Awza\'i', fr: 'Al-Awza\'i', es: 'Al-Awza\'i', zgh: 'ⵍⴰⵡⵣⴰⵄⵉ' } },
    { id: 'al_walid_bin_muslim', type: 'atba_tabiin', names: { ar: 'الوليد بن مسلم', en: 'Al-Walid ibn Muslim', fr: 'Al-Walid ibn Muslim', es: 'Al-Walid ibn Muslim', zgh: 'ⵍⵡⴰⵍⵉⴷ ⴱⵏ ⵎⵓⵙⵍⵉⵎ' } },
];

export const scholars: LibraryItem[] = [
    // Religious Scholars
    { id: 'bukhari', type: 'scholar', names: { ar: 'الإمام البخاري', en: 'Imam Al-Bukhari', fr: 'Imam Al-Bukhari', es: 'Imam Al-Bukhari', zgh: 'ⵍⵉⵎⴰⵎ ⵍⴱⵓⵅⴰⵔⵉ' } },
    { id: 'muslim', type: 'scholar', names: { ar: 'الإمام مسلم', en: 'Imam Muslim', fr: 'Imam Mouslim', es: 'Imam Muslim', zgh: 'ⵍⵉⵎⴰⵎ ⵎⵓⵙⵍⵉⵎ' } },
    { id: 'shafi', type: 'scholar', names: { ar: 'الإمام الشافعي', en: 'Imam Al-Shafi\'i', fr: 'Imam Al-Shafi\'i', es: 'Imam Al-Shafi\'i', zgh: 'ⵍⵉⵎⴰⵎ ⵛⵛⴰⴼⵉⵄⵉ' } },
    { id: 'ahmad', type: 'scholar', names: { ar: 'الإمام أحمد بن حنبل', en: 'Imam Ahmad ibn Hanbal', fr: 'Imam Ahmad ibn Hanbal', es: 'Imam Ahmad ibn Hanbal', zgh: 'ⵍⵉⵎⴰⵎ ⴰⵃⵎⴰⴷ ⴱⵏ ⵃⴰⵏⴱⴰⵍ' } },
    { id: 'tabari', type: 'scholar', names: { ar: 'الإمام الطبري', en: 'Imam Al-Tabari', fr: 'Imam Al-Tabari', es: 'Imam Al-Tabari', zgh: 'ⵍⵉⵎⴰⵎ ⵟⵟⴰⴱⴰⵔⵉ' } },
    { id: 'ghazali', type: 'scholar', names: { ar: 'الإمام الغزالي', en: 'Imam Al-Ghazali', fr: 'Imam Al-Ghazali', es: 'Imam Al-Ghazali', zgh: 'ⵍⵉⵎⴰⵎ ⵍⵖⴰⵣⴰⵍⵉ' } },
    { id: 'nawawi', type: 'scholar', names: { ar: 'الإمام النووي', en: 'Imam Al-Nawawi', fr: 'Imam Al-Nawawi', es: 'Imam Al-Nawawi', zgh: 'ⵍⵉⵎⴰⵎ ⵏⵏⴰⵡⴰⵡⵉ' } },
    { id: 'ibn_taymiyyah', type: 'scholar', names: { ar: 'شيخ الإسلام ابن تيمية', en: 'Ibn Taymiyyah', fr: 'Ibn Taymiyyah', es: 'Ibn Taymiyyah', zgh: 'ⴱⵏ ⵜⴰⵢⵎⵉⵢⵢⴰ' } },
    { id: 'ibn_al_qayyim', type: 'scholar', names: { ar: 'ابن القيم الجوزية', en: 'Ibn Al-Qayyim', fr: 'Ibn Al-Qayyim', es: 'Ibn Al-Qayyim', zgh: 'ⴱⵏ ⵍⵇⴰⵢⵢⵉⵎ' } },
    { id: 'ibn_kathir', type: 'scholar', names: { ar: 'الإمام ابن كثير', en: 'Imam Ibn Kathir', fr: 'Imam Ibn Kathir', es: 'Imam Ibn Kathir', zgh: 'ⵍⵉⵎⴰⵎ ⴱⵏ ⴽⴰⵜⵉⵔ' } },
    { id: 'dhahabi', type: 'scholar', names: { ar: 'الإمام الذهبي', en: 'Imam Al-Dhahabi', fr: 'Imam Al-Dhahabi', es: 'Imam Al-Dhahabi', zgh: 'ⵍⵉⵎⴰⵎ ⴷⴷⴰⵀⴰⴱⵉ' } },
    { id: 'qurtubi', type: 'scholar', names: { ar: 'الإمام القرطبي', en: 'Imam Al-Qurtubi', fr: 'Imam Al-Qurtubi', es: 'Imam Al-Qurtubi', zgh: 'ⵍⵉⵎⴰⵎ ⵍⵇⵓⵔⵟⵓⴱⵉ' } },
    { id: 'ibn_hajar', type: 'scholar', names: { ar: 'ابن حجر العسقلاني', en: 'Ibn Hajar Al-Asqalani', fr: 'Ibn Hajar', es: 'Ibn Hajar', zgh: 'ⴱⵏ ⵃⴰⵊⴰⵔ ⵍⵄⴰⵙⵇⴰⵍⴰⵏⵉ' } },
    { id: 'suyuti', type: 'scholar', names: { ar: 'الإمام السيوطي', en: 'Imam Al-Suyuti', fr: 'Imam Al-Suyuti', es: 'Imam Al-Suyuti', zgh: 'ⵍⵉⵎⴰⵎ ⵙⵙⵓⵢⵓⵟⵉ' } },
    { id: 'salahuddin', type: 'scholar', names: { ar: 'صلاح الدين الأيوبي', en: 'Salahuddin Al-Ayyubi', fr: 'Saladin', es: 'Saladino', zgh: 'ⵚⴰⵍⴰⵃ ⴷⴷⵉⵏ ⵍⴰⵢⵢⵓⴱⵉ' } },
    
    // Golden Age Scientists & Polymaths (Expanded)
    { id: 'khwarizmi', type: 'scholar', names: { ar: 'الخوارزمي (الرياضيات)', en: 'Al-Khwarizmi (Mathematics)', fr: 'Al-Khwarizmi', es: 'Al-Juarismi', zgh: 'ⵍⵅⴰⵡⴰⵔⵉⵣⵎⵉ' } },
    { id: 'ibn_sina', type: 'scholar', names: { ar: 'ابن سينا (الطب)', en: 'Ibn Sina (Avicenna)', fr: 'Avicenne', es: 'Avicena', zgh: 'ⴱⵏ ⵙⵉⵏⴰ' } },
    { id: 'al_zahrawi', type: 'scholar', names: { ar: 'الزهراوي (الجراحة)', en: 'Al-Zahrawi (Surgery)', fr: 'Aboulcassis', es: 'Abulcasis', zgh: 'ⵣⵣⴰⵀⵔⴰⵡⵉ' } },
    { id: 'ibn_rushd', type: 'scholar', names: { ar: 'ابن رشد (الفلسفة والطب)', en: 'Ibn Rushd (Averroes)', fr: 'Averroès', es: 'Averroes', zgh: 'ⴱⵏ ⵔⵓⵛⴷ' } },
    { id: 'ibn_al_haytham', type: 'scholar', names: { ar: 'ابن الهيثم (البصريات)', en: 'Ibn al-Haytham (Optics)', fr: 'Alhazen', es: 'Alhacén', zgh: 'ⴱⵏ ⵍⵀⴰⵢⵜⴰⵎ' } },
    { id: 'al_biruni', type: 'scholar', names: { ar: 'البيروني (الفلك)', en: 'Al-Biruni (Astronomy)', fr: 'Al-Biruni', es: 'Al-Biruni', zgh: 'ⵍⴱⵉⵔⵓⵏⵉ' } },
    { id: 'ibn_khaldun', type: 'scholar', names: { ar: 'ابن خلدون (الاجتماع)', en: 'Ibn Khaldun (Sociology)', fr: 'Ibn Khaldun', es: 'Ibn Jaldún', zgh: 'ⴱⵏ ⵅⴰⵍⴷⵓⵏ' } },
    { id: 'al_razi', type: 'scholar', names: { ar: 'أبو بكر الرازي (الطب)', en: 'Al-Razi (Medicine)', fr: 'Rhazès', es: 'Al-Razi', zgh: 'ⵔⵔⴰⵣⵉ' } },
    { id: 'jabir_ibn_hayyan', type: 'scholar', names: { ar: 'جابر بن حيان (الكيمياء)', en: 'Jabir ibn Hayyan (Chemistry)', fr: 'Geber', es: 'Geber', zgh: 'ⵊⴰⴱⵉⵔ ⴱⵏ ⵃⴰⵢⵢⴰⵏ' } },
];

export const fiqhIbadat: LibraryItem[] = [
    { id: 'taharah', type: 'fiqh_ibadat', names: { ar: 'الطهارة والوضوء', en: 'Purification & Wudu', fr: 'Purification', es: 'Purificación', zgh: 'ⵍⵡⴹⵓ ⴷ ⵜⴰⵣⵓⴳⴰ' } },
    { id: 'salah', type: 'fiqh_ibadat', names: { ar: 'الصلاة', en: 'Salah (Prayer)', fr: 'La Prière', es: 'La Oración', zgh: 'ⵜⴰⵥⴰⵍⵍⵉⵜ' } },
    { id: 'zakat', type: 'fiqh_ibadat', names: { ar: 'الزكاة والصدقة', en: 'Zakat & Charity', fr: 'Zakat', es: 'Zakat', zgh: 'ⵣⵣⴰⴽⴰⵜ' } },
    { id: 'sawm', type: 'fiqh_ibadat', names: { ar: 'الصوم (رمضان)', en: 'Sawm (Fasting)', fr: 'Le Jeûne', es: 'Ayuno', zgh: 'ⵓⵥⵓⵎ' } },
    { id: 'hajj', type: 'fiqh_ibadat', names: { ar: 'الحج والعمرة', en: 'Hajj & Umrah', fr: 'Hajj', es: 'Hajj', zgh: 'ⵍⵃⵉⵊⵊ' } },
    { id: 'dua', type: 'fiqh_ibadat', names: { ar: 'الدعاء والأذكار', en: 'Dua & Azkar', fr: 'Invocations', es: 'Súplicas', zgh: 'ⴷⴷⵓⵄⴰ' } },
];

export const fiqhMuamalat: LibraryItem[] = [
    { id: 'sidq', type: 'fiqh_muamalat', names: { ar: 'الصدق والأمانة', en: 'Honesty & Trust', fr: 'Honnêteté', es: 'Honestidad', zgh: 'ⵜⵉⴷⵜ ⴷ ⵍⴰⵎⴰⵏⴰ' } },
    { id: 'trade', type: 'fiqh_muamalat', names: { ar: 'آداب البيع والشراء', en: 'Ethics of Trade', fr: 'Éthique du commerce', es: 'Ética comercial', zgh: 'ⵍⴰⴷⴰⴱ ⵏ ⵜⵜⵉⵊⴰⵔⴰ' } },
    { id: 'debt', type: 'fiqh_muamalat', names: { ar: 'الدين والقرض الحسن', en: 'Debt & Good Loan', fr: 'Dette & Bon Prêt', es: 'Deuda y Préstamo', zgh: 'ⴰⵕⵟⵟⴰⵍ' } },
    { id: 'waad', type: 'fiqh_muamalat', names: { ar: 'الوفاء بالعهد', en: 'Keeping Promises', fr: 'Tenir ses promesses', es: 'Cumplir promesas', zgh: 'ⵍⵡⴰⴼⴰ ⵙ ⵍⵄⴰⵀⴷ' } },
];

export const fiqhFamily: LibraryItem[] = [
    { id: 'birr', type: 'fiqh_family', names: { ar: 'بر الوالدين', en: 'Kindness to Parents', fr: 'Bonté envers parents', es: 'Bondad a padres', zgh: 'ⵜⴰⵖⵓⴼⵉ ⵉ ⵍⵡⴰⵍⵉⴷⴰⵢⵏ' } },
    { id: 'marriage', type: 'fiqh_family', names: { ar: 'أهمية الزواج', en: 'Importance of Marriage', fr: 'Importance du Mariage', es: 'Importancia del Matrimonio', zgh: 'ⴰⵜⵉⴳ ⵏ ⵍⵣⵡⴰⵊ' } },
    { id: 'silat_rahim', type: 'fiqh_family', names: { ar: 'صلة الرحم', en: 'Kinship Ties', fr: 'Liens de parenté', es: 'Lazos familiares', zgh: 'ⴰⵣⴷⴰⵢ ⵏ ⵜⵡⵊⴰ' } },
    { id: 'children_rights', type: 'fiqh_family', names: { ar: 'حقوق الطفل', en: 'Rights of Children', fr: 'Droits de l\'enfant', es: 'Derechos del niño', zgh: 'ⵉⵣⵔⴼⴰⵏ ⵏ ⵓⵔⴱⴰ' } },
];

export const fiqhJinayat: LibraryItem[] = [
    { id: 'life_preservation', type: 'fiqh_jinayat', names: { ar: 'حفظ النفس', en: 'Preservation of Life', fr: 'Préservation de la vie', es: 'Preservación de la vida', zgh: 'ⴰⵃⵟⵟⵓ ⵏ ⵜⵓⴷⵔⵜ' } },
    { id: 'theft_prohibition', type: 'fiqh_jinayat', names: { ar: 'تحريم السرقة', en: 'Prohibition of Theft', fr: 'Interdiction du vol', es: 'Prohibición del robo', zgh: 'ⵜⵓⴽⵔⴹⴰ ⵜⵃⵔⴰⵎ' } },
    { id: 'harm_prevention', type: 'fiqh_jinayat', names: { ar: 'لا ضرر ولا ضرار', en: 'No Harm', fr: 'Ne pas nuire', es: 'No dañar', zgh: 'ⵓⵔ ⵉⵍⵍⵉ ⴹⴹⴰⵕⴰⵕ' } },
];

export const fiqhJudiciary: LibraryItem[] = [
    { id: 'justice', type: 'fiqh_judiciary', names: { ar: 'العدل في الإسلام', en: 'Justice in Islam', fr: 'Justice en Islam', es: 'Justicia en el Islam', zgh: 'ⵍⵄⴰⴷⵍ ⴳ ⵍⵉⵙⵍⴰⵎ' } },
    { id: 'testimony', type: 'fiqh_judiciary', names: { ar: 'شهادة الحق', en: 'Testimony of Truth', fr: 'Témoignage de vérité', es: 'Testimonio de la verdad', zgh: 'ⵜⴰⵖⵓⵍⵉ ⵏ ⵜⵉⴷⵜ' } },
    { id: 'reconciliation', type: 'fiqh_judiciary', names: { ar: 'الإصلاح بين الناس', en: 'Reconciliation', fr: 'Réconciliation', es: 'Reconciliación', zgh: 'ⴰⵙⵍⴰⵃ ⴳⵔ ⵎⴷⴷⵏ' } },
];

export const fiqhPolitics: LibraryItem[] = [
    { id: 'shura', type: 'fiqh_politics', names: { ar: 'الشورى', en: 'Shura (Consultation)', fr: 'Choura', es: 'Shura', zgh: 'ⵛⵛⵓⵔⴰ' } },
    { id: 'responsibility', type: 'fiqh_politics', names: { ar: 'المسؤولية والأمانة', en: 'Responsibility', fr: 'Responsabilité', es: 'Responsabilidad', zgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ' } },
    { id: 'community', type: 'fiqh_politics', names: { ar: 'حقوق المجتمع', en: 'Community Rights', fr: 'Droits de la communauté', es: 'Derechos comunitarios', zgh: 'ⵉⵣⵔⴼⴰⵏ ⵏ ⵡⴰⵎⵓⵏ' } },
];

export const fiqhEthics: LibraryItem[] = [
    { id: 'patience', type: 'fiqh_ethics', names: { ar: 'الصبر', en: 'Patience (Sabr)', fr: 'Patience', es: 'Paciencia', zgh: 'ⵚⵚⴱⵕ' } },
    { id: 'humility', type: 'fiqh_ethics', names: { ar: 'التواضع', en: 'Humility', fr: 'Humilité', es: 'Humildad', zgh: 'ⵜⴰⵡⴰⴹⵓⵄ' } },
    { id: 'neighbors', type: 'fiqh_ethics', names: { ar: 'حقوق الجار', en: 'Rights of Neighbors', fr: 'Droits des voisins', es: 'Derechos de vecinos', zgh: 'ⵉⵣⵔⴼⴰⵏ ⵏ ⵍⵊⴰⵔ' } },
    { id: 'environment', type: 'fiqh_ethics', names: { ar: 'النظافة والبيئة', en: 'Cleanliness & Nature', fr: 'Propreté & Nature', es: 'Limpieza', zgh: 'ⵜⴰⵣⵓⴳⴰ ⴷ ⵓⴳⴰⵎⴰ' } },
    { id: 'animals', type: 'fiqh_ethics', names: { ar: 'الرفق بالحيوان', en: 'Kindness to Animals', fr: 'Bonté envers animaux', es: 'Bondad a animales', zgh: 'ⵕⵕⵉⴼⵇ ⵙ ⵉⵎⵓⴷⴰⵔⵏ' } },
];

export const fiqhNawazil: LibraryItem[] = [
    { id: 'travel_prayer', type: 'fiqh_nawazil', names: { ar: 'الصلاة في السفر والطائرة', en: 'Prayer during Travel', fr: 'Prière en voyage', es: 'Oración en viaje', zgh: 'ⵜⴰⵥⴰⵍⵍⵉⵜ ⴳ ⵓⵎⵓⴷⴷⵓ' } },
    { id: 'medicine', type: 'fiqh_nawazil', names: { ar: 'التداوي والطب الحديث', en: 'Modern Medicine', fr: 'Médecine moderne', es: 'Medicina moderna', zgh: 'ⴰⵙⵙⵊⵊⵉ' } },
];

export const fiqhTech: LibraryItem[] = [
    { id: 'social_media', type: 'fiqh_tech', names: { ar: 'آداب التواصل الاجتماعي', en: 'Social Media Etiquette', fr: 'Étiquette des réseaux sociaux', es: 'Etiqueta en redes sociales', zgh: 'ⵍⴰⴷⴰⴱ ⵏ ⵓⵎⵢⴰⵡⴰⴹ' } },
    { id: 'verify_news', type: 'fiqh_tech', names: { ar: 'التثبت من الأخبار', en: 'Verifying News', fr: 'Vérification des nouvelles', es: 'Verificación de noticias', zgh: 'ⴰⵙⵙⴼⵍⴷ ⵏ ⵉⵙⴰⵍⵏ' } },
    { id: 'time_management', type: 'fiqh_tech', names: { ar: 'تنظيم الوقت والشاشات', en: 'Screen Time Management', fr: 'Gestion du temps d\'écran', es: 'Gestión del tiempo de pantalla', zgh: 'ⴰⵙⵏⵎ ⵏ ⵡⴰⴽⵓⴷ' } },
];

export const fiqhCyber: LibraryItem[] = [
    { id: 'privacy', type: 'fiqh_cyber', names: { ar: 'حرمة الخصوصية الرقمية', en: 'Digital Privacy Sanctity', fr: 'Confidentialité numérique', es: 'Privacidad digital', zgh: 'ⵜⵓⵙⵙⵔⴰ ⵜⴰⵍⵉⴽⵜⵕⵓⵏⵉⵜ' } },
    { id: 'safe_browsing', type: 'fiqh_cyber', names: { ar: 'غض البصر الإلكتروني', en: 'Safe Browsing (Lowering Gaze)', fr: 'Navigation sûre', es: 'Navegación segura', zgh: 'ⴰⵃⵟⵟⵓ ⵏ ⵡⴰⵍⵍⵏ' } },
    { id: 'cyber_bullying', type: 'fiqh_cyber', names: { ar: 'تحريم التنمر الإلكتروني', en: 'Prohibition of Cyberbullying', fr: 'Interdiction du cyberharcèlement', es: 'Prohibición del ciberacoso', zgh: 'ⴰⵙⵙⵉⵡⴹ ⴰⵍⵉⴽⵜⵕⵓⵏⵉ' } },
    { id: 'data_protection', type: 'fiqh_cyber', names: { ar: 'حفظ البيانات والأسرار', en: 'Data Protection', fr: 'Protection des données', es: 'Protección de datos', zgh: 'ⴰⵃⵟⵟⵓ ⵏ ⵉⵙⴼⴽⴰ' } },
];
