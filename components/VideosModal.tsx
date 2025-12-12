import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { VideoIcon } from './icons/VideoIcon';
import { logChildActivity } from '../utils/userData';

interface VideosModalProps {
    currentLang: Language;
    onClose: () => void;
}

// Professional SVG Icons with enhanced designs
const PrayerIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C10.9 2 10 2.9 10 4V5.17C8.83 5.58 8 6.69 8 8V14C8 15.1 8.9 16 10 16H14C15.1 16 16 15.1 16 14V8C16 6.69 15.17 5.58 14 5.17V4C14 2.9 13.1 2 12 2M12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4M10 8H14V14H10V8M7 18C7 19.1 7.9 20 9 20H15C16.1 20 17 19.1 17 18V17H7V18M4 21C4 21.55 4.45 22 5 22H19C19.55 22 20 21.55 20 21C20 20.45 19.55 20 19 20H5C4.45 20 4 20.45 4 21Z" />
    </svg>
);

const QuranIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2H12V9L9.5 7.5L7 9V2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2M18 20H6V4H7V13L9.5 11.5L12 13V4H18V20M14 14.5V16.5H10V14.5H14M14 11.5V13.5H10V11.5H14Z" />
    </svg>
);

const ProphetIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2M12 6.1L13.71 10.4L18.09 10.78L14.77 13.62L15.78 17.9L12 15.77L8.22 17.9L9.23 13.62L5.91 10.78L10.29 10.4L12 6.1Z" />
    </svg>
);

const MannersIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35M16.5 5C15.76 5 15.09 5.24 14.5 5.68C14.5 5.77 14.5 5.86 14.5 5.95C14.5 7.43 13.93 8.93 12.94 10.06C11.95 11.19 10.62 11.86 9.25 11.95C9.16 11.95 9.08 11.95 9 11.95C8.36 11.95 7.74 11.79 7.19 11.5C6.32 12.38 5.5 13.32 4.76 14.32C7.5 16.93 10 19.06 12 20.87C14 19.06 16.5 16.93 19.24 14.32C18.5 13.32 17.68 12.38 16.81 11.5C16.26 11.79 15.64 11.95 15 11.95C14.92 11.95 14.84 11.95 14.75 11.95C13.38 11.86 12.05 11.19 11.06 10.06C10.07 8.93 9.5 7.43 9.5 5.95C9.5 5.86 9.5 5.77 9.5 5.68C8.91 5.24 8.24 5 7.5 5C5.5 5 4 6.5 4 8.5C4 11.39 7.14 14.24 11.89 18.55L12 18.65L12.11 18.55C16.86 14.24 20 11.39 20 8.5C20 6.5 18.5 5 16.5 5Z" />
    </svg>
);

// Video categories
const categories = [
    { id: 'prayer', nameAr: 'الصلاة', nameEn: 'Prayer', icon: PrayerIcon },
    { id: 'quran', nameAr: 'القرآن', nameEn: 'Quran', icon: QuranIcon },
    { id: 'prophets', nameAr: 'الأنبياء', nameEn: 'Prophets', icon: ProphetIcon },
    { id: 'manners', nameAr: 'الأخلاق', nameEn: 'Manners', icon: MannersIcon }
];

// Educational videos organized by category
const videosByCategory: Record<string, any[]> = {
    prayer: [
        {
            id: 1,
            titleAr: 'تعلم كيفية الصلاة مع زكريا',
            titleEn: 'Learn How to Pray with Zakaria',
            videoId: 'edL3W38ODd4',
            description: 'كرتون تعليمي يعلم الأطفال الصلاة خطوة خطوة بطريقة ممتعة'
        },
        {
            id: 2,
            titleAr: 'تعلم كيفية الوضوء للأطفال',
            titleEn: 'Learn How to Perform Wudu for Children',
            videoId: 'y3Hd5srW_ak',
            description: 'كرتون تعليمي يعلم الأطفال الوضوء بطريقة سهلة وممتعة'
        }
    ],
    quran: [
        {
            id: 1,
            titleAr: 'قصص العجائب في القرآن | الحلقة 1 | الدرع المسروقة - ج 1',
            titleEn: 'Marvellous Stories from Qur\'an | EP 01 - The Stolen Shield (Part 1)',
            videoId: 'wuKVKYW0Ois',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الأولى: "الدرع المسروقة" (الجزء الأول). يسرد القاضي أعجب القصص الواردة في القرآن الكريم بالتزامن مع ما يمر به هو وعائلته من مواقف حياتية يومية يعيد تقويم أخلاقها بطريقة غير مباشرة تعتمد على السلوك القويم في الحياة و الذي يستخلص العبر من القصص القرآنية ذات الدلالات المفيدة والعظة.'
        },
        {
            id: 2,
            titleAr: 'قصص العجائب في القرآن | الحلقة 2 | الدرع المسروقة - ج 2',
            titleEn: 'Marvellous Stories from Qur\'an | EP 02 - The Stolen Shield (Part 2)',
            videoId: 'z7TGl8msdrE',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الثانية: "الدرع المسروقة" (الجزء الثاني).'
        },
        {
            id: 3,
            titleAr: 'قصص العجائب في القرآن | الحلقة 3 | الدرع المسروقة - ج 3',
            titleEn: 'Marvellous Stories from Qur\'an | EP 03 - The Stolen Shield (Part 3)',
            videoId: 'WoiB4_8JzBM',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الثالثة: "الدرع المسروقة" (الجزء الثالث).'
        },
        {
            id: 4,
            titleAr: 'قصص العجائب في القرآن | الحلقة 4 | الثلاثة الذين خلفوا - ج 1',
            titleEn: 'Marvellous Stories from Qur\'an | EP 04 - The Three Who Were Left Behind (Part 1)',
            videoId: '0yRuh1MJs9w',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الرابعة: "الثلاثة الذين خلفوا" (الجزء الأول).'
        },
        {
            id: 5,
            titleAr: 'قصص العجائب في القرآن | الحلقة 5 | الثلاثة الذين خلفوا - ج 2',
            titleEn: 'Marvellous Stories from Qur\'an | EP 05 - The Three Who Were Left Behind (Part 2)',
            videoId: '9YalzTt74TQ',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الخامسة: "الثلاثة الذين خلفوا" (الجزء الثاني).'
        },
        {
            id: 6,
            titleAr: 'قصص العجائب في القرآن | الحلقة 6 | الثلاثة الذين خلفوا - ج 3',
            titleEn: 'Marvellous Stories from Qur\'an | EP 06 - The Three Who Were Left Behind (Part 3)',
            videoId: 'uhSnJE0s-co',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة السادسة: "الثلاثة الذين خلفوا" (الجزء الثالث).'
        },
        {
            id: 7,
            titleAr: 'قصص العجائب في القرآن | الحلقة 7 | المبيت في الغار - ج 1',
            titleEn: 'Marvellous Stories from Qur\'an | EP 07 - The Sleepers in the Cave (Part 1)',
            videoId: 'EU4EIa89D0U',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة السابعة: "المبيت في الغار" (الجزء الأول).'
        },
        {
            id: 8,
            titleAr: 'قصص العجائب في القرآن | الحلقة 8 | المبيت في الغار - ج 2',
            titleEn: 'Marvellous Stories from Qur\'an | EP 08 - The Sleepers in the Cave (Part 2)',
            videoId: 'DlmEJC2Pq-c',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الثامنة: "المبيت في الغار" (الجزء الثاني).'
        },
        {
            id: 9,
            titleAr: 'قصص العجائب في القرآن | الحلقة 9 | المبيت في الغار - ج 3',
            titleEn: 'Marvellous Stories from Qur\'an | EP 09 - The Sleepers in the Cave (Part 3)',
            videoId: 'kVdYM4xzpCo',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة التاسعة: "المبيت في الغار" (الجزء الثالث).'
        },
        {
            id: 10,
            titleAr: 'قصص العجائب في القرآن | الحلقة 10 | المبيت في الغار - ج 4',
            titleEn: 'Marvellous Stories from Qur\'an | EP 10 - The Sleepers in the Cave (Part 4)',
            videoId: '3--KpOCTSrw',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة العاشرة: "المبيت في الغار" (الجزء الرابع).'
        },
        {
            id: 11,
            titleAr: 'قصص العجائب في القرآن | الحلقة 11 | القرد العادل',
            titleEn: 'Marvellous Stories from Qur\'an | EP 11 - The Just Monkey',
            videoId: 'Xrqhf30TMOU',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الحادية عشر: "القرد العادل".'
        },
        {
            id: 12,
            titleAr: 'قصص العجائب في القرآن | الحلقة 12 | بائعة اللبن',
            titleEn: 'Marvellous Stories from Qur\'an | EP 12 - The Milk Seller',
            videoId: 'IBt-UXeu-mg',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الثانية عشر: "بائعة اللبن".'
        },
        {
            id: 13,
            titleAr: 'قصص العجائب في القرآن | الحلقة 13 | أصحاب الرس - ج 1',
            titleEn: 'Marvellous Stories from Qur\'an | EP 13 - Companions of the Rass (Part 1)',
            videoId: 'cmpJVc3Tycs',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الثالثة عشر: "أصحاب الرس" (الجزء الأول).'
        },
        {
            id: 14,
            titleAr: 'قصص العجائب في القرآن | الحلقة 14 | أصحاب الرس - ج 2',
            titleEn: 'Marvellous Stories from Qur\'an | EP 14 - Companions of the Rass (Part 2)',
            videoId: 'ap7hgAKm3W0',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الرابعة عشر: "أصحاب الرس" (الجزء الثاني).'
        },
        {
            id: 15,
            titleAr: 'قصص العجائب في القرآن | الحلقة 15 | أصحاب الرس - ج 3',
            titleEn: 'Marvellous Stories from Qur\'an | EP 15 - Companions of the Rass (Part 3)',
            videoId: 'FGAGGSobbHs',
            description: 'مسلسل "قصص العجائب في القرآن" - الحلقة الخامسة عشر: "أصحاب الرس" (الجزء الثالث).'
        }
    ],
    prophets: [
        {
            id: 1,
            titleAr: 'محمد: خاتم الأنبياء (فيلم)',
            titleEn: 'Muhammad: The Last Prophet (Film)',
            videoId: 'cJljsPJiqiI',
            description: 'فيلم كرتوني تعليمي عن حياة النبي محمد صلى الله عليه وسلم'
        },
        {
            id: 2,
            titleAr: 'الفيلم الديني " ايوب " عليه السلام و شدة صبره علي البلاء',
            titleEn: 'Prophet Ayoub (Job) and His Great Patience',
            videoId: 'JAtpnL2dzYk',
            description: 'الفيلم الديني عن النبي أيوب عليه السلام وشدة صبره على البلاء'
        },
        {
            id: 3,
            titleAr: 'قصة نبي الله يوسف عليه السلام (عزيز مصر)',
            titleEn: 'The Story of Prophet Yusuf (Joseph) - The Aziz of Egypt',
            videoId: 'xFkLUM4Otaw',
            description: 'قصة نبي الله يوسف عليه السلام وكيف أصبح عزيز مصر'
        },
        {
            id: 4,
            titleAr: 'معجزات نبي الله سليمان الحكيم عليه السلام',
            titleEn: 'The Miracles of Prophet Sulaiman (Solomon) the Wise',
            videoId: 'CGFi0EE6kWI',
            description: 'قصة نبي الله سليمان عليه السلام ومعجزاته العظيمة وحكمته'
        },
        {
            id: 5,
            titleAr: 'نبي الله شعيب عليه السلام - خطيب الأنبياء',
            titleEn: 'Prophet Shuaib (Jethro) - The Orator of Prophets',
            videoId: '8R2PKsVRd10',
            description: 'نبي الله شعيب عليه السلام، أرسله الله تعالى إلى قومه أهل مدين الذين كفروا بالله وعبدوا الأيكة وساءت أخلاقهم وشاع فيهم الغش والخداع. كان شعيب فصيح اللسان قوي البلاغة وسماه بعض السلف "خطيب الأنبياء"'
        },
        {
            id: 6,
            titleAr: 'قصة سيدنا آدم عليه السلام - أبو البشر',
            titleEn: 'The Story of Prophet Adam (AS) - The Father of Mankind',
            videoId: 'hC-hfDGgMVg',
            description: 'قصة خلق سيدنا آدم عليه السلام، أول البشر ونبي الله، وكيف علمه الله الأسماء كلها.'
        },
        {
            id: 7,
            titleAr: 'الفيلم الديني نبي الله "زكريا" و "مريم" عليها السلام',
            titleEn: 'Prophet Zakariya and Maryam (AS)',
            videoId: 'e7Nqjnx_OeY',
            description: 'قصة نبي الله زكريا وكفالته للسيدة مريم عليها السلام، وكيف رزقه الله بيحيى عليه السلام على كبر.'
        },
        {
            id: 8,
            titleAr: 'قصة نبي الله إسماعيل ووفاة خليل الله إبراهيم عليهما السلام',
            titleEn: 'The Story of Prophet Ismail and the Passing of Prophet Ibrahim (AS)',
            videoId: 'UTDo8Tj_3co',
            description: 'الفيلم الديني عن قصة نبي الله إسماعيل عليه السلام ووفاة والده خليل الله إبراهيم عليه السلام.'
        },
        {
            id: 9,
            titleAr: 'رحلة نبي الله هود عليه السلام - إرم ذات العماد',
            titleEn: 'The Journey of Prophet Hud (AS) - Iram of the Pillars',
            videoId: 'r2pXfUt3ngE',
            description: 'نبي الله هود عليه السلام، من نسل نوح، أرسله الله إلى قوم عاد الأولى "إرم ذات العماد" الذين عبدوا الأصنام بعد الطوفان. قصة كاملة من البداية إلى النهاية.'
        },
        {
            id: 10,
            titleAr: 'قصة سيدنا إبراهيم عليه السلام - خليل الرحمن',
            titleEn: 'The Story of Prophet Ibrahim (AS) - The Friend of Allah',
            videoId: 'ru3Un2Pl-M8',
            description: 'قصة نبي الله إبراهيم عليه السلام، خليل الرحمن، وكيف حطم الأصنام ودعا قومه إلى عبادة الله الواحد. قصة كاملة ومؤثرة.'
        }
    ],
    manners: [
        {
            id: 1,
            titleAr: 'أروع ما قيل عن حسن الأخلاق - كيف كان يتعامل الصالحون مع العباد',
            titleEn: 'The Excellence of Good Manners - How the Righteous Treated People',
            videoId: 'b3jfC3RODYE',
            description: 'فيديو تعليمي رائع يتحدث عن أروع ما قيل في حسن الأخلاق، وكيف كان الصالحون يتعاملون مع الناس بالرحمة والحكمة والتواضلة.'
        },
        {
            id: 2,
            titleAr: 'كيف يوسوس الشيطان بالابتعاد عن حفظ القرآن',
            titleEn: 'How Satan Whispers to Distance You from Memorizing Quran',
            videoId: 'RP7buKZNEto',
            description: 'شاهد كيف يوسوس إليك الشيطان بالابتعاد عن حفظ القرآن لمشاهدة الأفلام. فيديو تعليمي يوضح مكائد الشيطان وكيف نتغلب عليها.'
        },
        {
            id: 3,
            titleAr: 'ماذا حدث عندما تحدث آدم عن دلائل وجود الله',
            titleEn: 'What Happened When Adam Spoke About the Signs of Allah\'s Existence',
            videoId: 'ubvb1NSw7ys',
            description: 'شاهد ماذا حدث عندما تحدث آدم مع بعض الأشخاص عن دلائل وجود الله عز وجل. قصة تعليمية عن الإيمان والدعوة إلى الله.'
        },
        {
            id: 4,
            titleAr: 'اللحظة التي استجاب الله لدعاء آدم',
            titleEn: 'The Moment Allah Answered Adam\'s Prayer',
            videoId: 'HNDYmfHxo9k',
            description: 'اللحظة التي استجاب الله إلى دعاء آدم. فيديو مؤثر عن قوة الدعاء والتوكل على الله سبحانه وتعالى.'
        },
        {
            id: 5,
            titleAr: 'ماذا فعل إبليس لمنع آدم من فعل الخير',
            titleEn: 'What Satan Did to Prevent Adam from Doing Good',
            videoId: 'n61NUJ4Kj-k',
            description: 'انظروا ماذا فعل إبليس كي لا يفعل آدم الخير مع زملائه في المدرسة. قصة تعليمية عن أهمية الخير والإحسان للآخرين.'
        },
        {
            id: 6,
            titleAr: 'ما يحدث مع العبد الصالح عندما يثق بالله',
            titleEn: 'What Happens to the Righteous Servant When He Trusts Allah',
            videoId: 'SbcZXmeZLIs',
            description: 'انظروا ما الذي يحدث مع العبد الصالح عندما يثق بالله! قصة ملهمة عن التوكل على الله والثقة به سبحانه.'
        },
        {
            id: 7,
            titleAr: 'الإيمان بالله والثقة به - مخرج من كل ضيق',
            titleEn: 'Faith in Allah and Trust in Him - A Way Out of Every Hardship',
            videoId: 'NGmHDC3bzQs',
            description: 'الإيمان بالله والثقة به يجعل للمؤمن مخرجاً من كل ضيق. فيديو تعليمي عن أهمية الإيمان والتوكل على الله.'
        },
        {
            id: 8,
            titleAr: 'سلسلة القيم الإسلامية الكريمة',
            titleEn: 'Series of Noble Islamic Values',
            videoId: 'sHzuu2KayLo',
            description: 'سلسلة عظيمة من القيم الإسلامية الكريمة التي أمرنا الله سبحانه وتعالى بها في الحياة الدنيا. محتوى تعليمي شامل عن الأخلاق والقيم الإسلامية.'
        },
        {
            id: 9,
            titleAr: 'قصة الراعي الصادق - الأمانة في العمل',
            titleEn: 'The Honest Shepherd - Trustworthiness at Work',
            videoId: 'W23DebAOjuk',
            description: 'كان حريصاً على الأمانة في عمله فأخذ الله حقه من الرجل الظالم. تعرفوا على قصة الراعي الصادق.'
        },
        {
            id: 10,
            titleAr: 'قصة طالب العلم والتفاحة - الورع والأمانة',
            titleEn: 'The Student and the Apple - Piety and Honesty',
            videoId: 'sm5H1ydzQzg',
            description: 'قصة عظيمة لطالب العلم الذي أخذ تفاحة من حديقة دون علم صاحبها، وكيف قاده ورعه إلى الخير.'
        },
        {
            id: 11,
            titleAr: 'قيمة الأمانة في العمل - قصة إسلام مشرك',
            titleEn: 'The Value of Honesty - Story of a Conversion',
            videoId: 'PYsMPwa5j0c',
            description: 'تعرفوا على قيمة الأمانة في العمل وكيف كان لها دور في جعل مشرك يدخل الإسلام.'
        },
        {
            id: 12,
            titleAr: 'حكاية الصياد الأمين - الصدقة والرزق',
            titleEn: 'The Honest Fisherman - Charity and Provision',
            videoId: 'jGFjAHthOf4',
            description: 'تصدق على الفقراء والمحتاجين ففتح الله له أبواب الرزق. حكاية الصياد الأمين وكيف حقق الله أمنياته.'
        }
    ]
};

const VideoCard: React.FC<{ video: any, currentLang: Language }> = ({ video, currentLang }) => {
    const t = translations[currentLang].ui;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
        const childId = localStorage.getItem('currentChildId');
        if (childId) {
            logChildActivity(childId, {
                type: 'video',
                title: currentLang === 'ar' ? video.titleAr : video.titleEn,
                details: `Watched video ID: ${video.videoId}`,
                topic: 'Islamic Education' // Could be refined based on category
            });
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    if (isPlaying) {
        return (
            <div className={`bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all ${isFullscreen ? 'fixed inset-0 z-[60] rounded-none max-w-none' : ''}`}>
                <div className={`bg-black relative overflow-hidden ${isFullscreen ? 'h-screen' : 'aspect-video rounded-lg'}`}>
                    {/* Fullscreen Toggle Button */}
                    <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 z-10 p-3 bg-black/70 hover:bg-black/90 rounded-lg transition-all group"
                        title={isFullscreen ? t.exitFullscreen : t.fullscreen}
                    >
                        {isFullscreen ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        )}
                    </button>

                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.videoId}?modestbranding=1&rel=0&showinfo=0&fs=0&controls=1&disablekb=1&iv_load_policy=3&cc_load_policy=0&playsinline=1&autoplay=1&origin=${window.location.origin}`}
                        title={currentLang === 'ar' ? video.titleAr : video.titleEn}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope"
                        frameBorder="0"
                        style={{
                            pointerEvents: 'auto',
                            border: 'none'
                        }}
                    ></iframe>

                    {/* Comprehensive protection overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ zIndex: 1 }}
                    >
                        {/* Block YouTube logo (top-right) */}
                        <div
                            className="absolute top-0 right-0 w-24 h-16 pointer-events-auto cursor-default bg-transparent"
                            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        ></div>

                        {/* Block title area (top-left) */}
                        <div
                            className="absolute top-0 left-0 right-24 h-16 pointer-events-auto cursor-default bg-transparent"
                            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        ></div>

                        {/* Block bottom controls area where "Watch on YouTube" appears */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-auto cursor-default bg-transparent"
                            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        ></div>
                    </div>
                </div>
                {!isFullscreen && (
                    <div className="p-5">
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 font-bold text-xl font-cairo leading-tight mb-2">
                            {currentLang === 'ar' ? video.titleAr : video.titleEn}
                        </h3>
                        {video.description && (
                            <p className="text-white/70 text-sm leading-relaxed">
                                {video.description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
            onClick={handlePlay}
        >
            <div className="aspect-video bg-black relative overflow-hidden">
                <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={currentLang === 'ar' ? video.titleAr : video.titleEn}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-purple-400 font-bold text-xl font-cairo leading-tight mb-2 transition-all duration-300">
                    {currentLang === 'ar' ? video.titleAr : video.titleEn}
                </h3>
                {video.description && (
                    <p className="text-white/70 text-sm leading-relaxed">
                        {video.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export const VideosModal: React.FC<VideosModalProps> = ({ currentLang, onClose }) => {
    const t = translations[currentLang].ui;
    const isRtl = translations[currentLang].direction === 'rtl';
    const [selectedCategory, setSelectedCategory] = useState('prayer');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSafetyNotice, setShowSafetyNotice] = useState(true);

    // Auto-hide safety notice after 7 seconds
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowSafetyNotice(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    // Filter videos based on search query
    const allCategoryVideos = videosByCategory[selectedCategory] || [];
    const currentVideos = searchQuery.trim() === ''
        ? allCategoryVideos
        : allCategoryVideos.filter(video =>
            video.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (video.description && video.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/10">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <VideoIcon className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white font-cairo">
                            {t.videosLibrary}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSafetyNotice(true)}
                            className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors group"
                            title={t.safeZoneForChildren}
                        >
                            <svg className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <XIcon className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>

                {/* Safety Notice - Auto-hide after 7 seconds */}
                {showSafetyNotice && (
                    <div className="mx-6 mt-4 mb-2 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl relative overflow-hidden animate-fade-in">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-0.5">
                                <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-emerald-300 font-bold text-sm mb-1 flex items-center gap-2">
                                    {t.safeZoneForChildren}
                                </h3>
                                <p className="text-white/80 text-xs leading-relaxed">
                                    {currentLang === 'ar'
                                        ? 'جميع الفيديوهات مختارة بعناية وذات محتوى تعليمي إسلامي آمن %100. قد تظهر بعض الإعلانات من YouTube خارج سيطرتنا، لكن المحتوى التعليمي نفسه آمن تماماً ومناسب للأطفال.'
                                        : 'All videos are carefully selected with 100% safe Islamic educational content. Some YouTube ads may appear beyond our control, but the educational content itself is completely safe and suitable for children.'
                                    }
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSafetyNotice(false)}
                                className="shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <XIcon className="w-4 h-4 text-white/60 hover:text-white" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Search Bar */}
                <div className="px-6 pt-4 pb-2">
                    <div className="relative">
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchVideo}
                            className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 ${isRtl ? 'pr-12 pl-12' : 'pl-12 pr-12'} text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all font-cairo`}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-4' : 'right-4'} text-white/40 hover:text-white transition-colors`}
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                <div className="px-6 pt-2 pb-2 border-b border-white/10">
                    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setSearchQuery(''); // Clear search when changing category
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    <IconComponent />
                                    <span className="font-bold font-cairo">
                                        {currentLang === 'ar' ? category.nameAr : category.nameEn}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-2 overflow-y-auto max-h-[calc(90vh-240px)] custom-scrollbar">
                    {currentVideos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentVideos.map((video) => (
                                <VideoCard key={video.id} video={video} currentLang={currentLang} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            {searchQuery ? (
                                <>
                                    <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <p className="text-white/60 text-lg font-cairo mb-2">
                                        {currentLang === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                                    </p>
                                    <p className="text-white/40 text-sm font-cairo">
                                        {currentLang === 'ar' ? `${t.noVideosMatch} "${searchQuery}"` : `${t.noVideosMatch} "${searchQuery}"`}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <VideoIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                    <p className="text-white/60 text-lg font-cairo">
                                        {t.noVideosInCategory}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
