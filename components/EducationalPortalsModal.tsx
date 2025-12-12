import React, { useEffect, useState } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { FolderIcon } from './icons/FolderIcon';
import { FileIcon } from './icons/FileIcon';
import { PortalIcon } from './icons/PortalIcon';
import { AcademyIcon, InstituteIcon, LanguageIcon, IslamicIcon, CodingIcon, KidsIcon } from './icons/CategoryIcons';
import { ArrowIcon } from './LandingPage';

interface EducationalPortalsModalProps {
    onClose: () => void;
    currentLang: Language;
}

type LocalizedText = { ar: string; en: string; fr: string };

interface PortalReport {
    summary: LocalizedText;
    highlights?: {
        ar: string[];
        en: string[];
        fr: string[];
    };
    stats?: {
        label: LocalizedText;
        value: string;
    }[];
}

interface Portal {
    id: string;
    name: LocalizedText;
    url: string;
    description?: LocalizedText;
    icon?: string;
    openInNewTab?: boolean;
    report?: PortalReport;
    videoUrl?: string;
}

interface PortalCategory {
    id: string;
    name: LocalizedText;
    icon: React.ReactNode;
    portals: Portal[];
}

const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const FullScreenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
);

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const SAVED_PORTALS_KEY = 'educational-portals-saved';
const PASSWORD_REMINDER_KEY = 'educational-portals-last-pass-change';
const ACCESS_CODE_STORAGE_KEY = 'educational-portals-access-code';
const ACCESS_CODE_VALUE = 'VIP2026';
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

export const EducationalPortalsModal: React.FC<EducationalPortalsModalProps> = ({ onClose, currentLang }) => {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['academies']));
    const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [accessCode, setAccessCode] = useState(() => {
        if (typeof window === 'undefined') return '';
        const stored = window.localStorage.getItem(ACCESS_CODE_STORAGE_KEY);
        return stored === ACCESS_CODE_VALUE ? stored : '';
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.localStorage.getItem(ACCESS_CODE_STORAGE_KEY) === ACCESS_CODE_VALUE;
    });
    const [showError, setShowError] = useState(false);
    const [savedPortals, setSavedPortals] = useState<string[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const stored = window.localStorage.getItem(SAVED_PORTALS_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Failed to read saved portals', error);
            return [];
        }
    });
    const [lastPasswordChange, setLastPasswordChange] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return window.localStorage.getItem(PASSWORD_REMINDER_KEY);
    });

    const t = translations[currentLang].ui;
    const dir = translations[currentLang].direction;

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(max-width: 900px)');
        const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        handler(mq);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(SAVED_PORTALS_KEY, JSON.stringify(savedPortals));
        } catch (error) {
            console.warn('Failed to persist saved portals', error);
        }
    }, [savedPortals]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            if (lastPasswordChange) {
                window.localStorage.setItem(PASSWORD_REMINDER_KEY, lastPasswordChange);
            } else {
                window.localStorage.removeItem(PASSWORD_REMINDER_KEY);
            }
        } catch (error) {
            console.warn('Failed to persist password reminder', error);
        }
    }, [lastPasswordChange]);

    const togglePortalSave = (portalId: string) => {
        setSavedPortals((prev) => (prev.includes(portalId) ? prev.filter((id) => id !== portalId) : [...prev, portalId]));
    };

    const handlePasswordChangeConfirmation = () => {
        setLastPasswordChange(new Date().toISOString());
    };

    const needsPasswordChange = !lastPasswordChange || Date.now() - new Date(lastPasswordChange).getTime() >= SIX_MONTHS_MS;
    const nextReminderDate = lastPasswordChange ? new Date(new Date(lastPasswordChange).getTime() + SIX_MONTHS_MS) : null;

    const formatDate = (date: Date) =>
        date.toLocaleDateString(
            currentLang === 'fr' ? 'fr-FR' : currentLang === 'ar' ? 'ar-EG' : 'en-US',
            { day: '2-digit', month: 'short', year: 'numeric' }
        );

    const selectedPortalSaved = selectedPortal ? savedPortals.includes(selectedPortal.id) : false;
    const selectedPortalHighlights = selectedPortal?.report?.highlights ? selectedPortal.report.highlights[currentLang] : undefined;
    const selectedPortalStats = selectedPortal?.report?.stats ?? [];

    const categories: PortalCategory[] = [
        {
            id: 'islamic',
            name: {
                ar: 'التعليم الإسلامي',
                en: 'Islamic Education',
                fr: 'Éducation Islamique'
            },
            icon: <IslamicIcon className="w-6 h-6 text-emerald-400" />,
            portals: [
                {
                    id: 'khalil',
                    name: {
                        ar: 'معهد العلامة خليل',
                        en: 'Khalil Institute',
                        fr: 'Institut Khalil'
                    },
                    description: {
                        ar: 'أول معهد علمي إلكتروني لدراسة الفقه أصولًا وفروعًا على مذهب الإمام مالك بن أنس',
                        en: 'First electronic scientific institute for studying jurisprudence based on the Maliki school',
                        fr: 'Premier institut scientifique électronique pour l\'étude de la jurisprudence selon l\'école malikite'
                    },
                    icon: 'portals/khalil.png',
                    url: 'https://www.khalilfiqh.com/',
                    openInNewTab: true,
                    videoUrl: 'https://www.youtube.com/embed/vRfr7hOM_3w',
                    report: {
                        summary: {
                            ar: 'منصة رقمية متخصصة في التأصيل على المذهب المالكي عبر مستويات منظمة تشرح أهم المتون، وتجمع بين الدروس المباشرة والمسجلة مع اختبارات داخلية وشهادات إتمام، تحت إشراف أساتذة مختصين وبأسلوب مبسط يناسب المبتدئين والمتوسطين.',
                            en: 'A dedicated digital platform for grounding students in the Maliki school through structured levels that explain essential texts, combining live and recorded lessons with internal assessments and completion certificates under expert supervision in an accessible format for beginners and intermediates.',
                            fr: 'Plateforme numérique dédiée à l\'ancrage des étudiants dans l\'école malikite via des niveaux structurés expliquant les principaux textes, mêlant cours en direct et enregistrés avec évaluations internes et attestations de fin d\'études, encadrée par des spécialistes pour un suivi adapté aux débutants et intermédiaires.'
                        },
                        highlights: {
                            ar: [
                                'مستويات منظمة تغطي المتون المالكية الأساسية',
                                'دروس مباشرة ومسجلة مع تقييمات ذاتية',
                                'شهادات إتمام وإشراف أكاديمي متخصص'
                            ],
                            en: [
                                'Structured levels covering core Maliki texts',
                                'Live plus recorded lessons paired with self assessments',
                                'Completion certificates with specialist academic oversight'
                            ],
                            fr: [
                                'Niveaux structurés couvrant les textes malikites essentiels',
                                'Cours en direct et enregistrés avec auto-évaluations',
                                'Attestations finales et supervision académique spécialisée'
                            ]
                        }
                    }
                },
                {
                    id: 'gheras-elm',
                    name: {
                        ar: 'أكاديمية غراس العلم',
                        en: 'Gheras Al-Elm Academy',
                        fr: 'Académie Gheras Al-Elm'
                    },
                    description: {
                        ar: 'أكاديمية غراس العلم لدراسة العلوم الشرعية تحت إشراف الشيخ إبراهيم رفيق الطويل.',
                        en: 'Gheras Al-Elm Academy for Sharia studies under the supervision of Sheikh Ibrahim Rafiq Al-Tawil.',
                        fr: "Académie Gheras Al-Elm pour l'étude des sciences religieuses sous la supervision du Cheikh Ibrahim Rafiq Al-Tawil."
                    },
                    url: 'https://gheras-3elm.com/',
                    openInNewTab: true,
                    videoUrl: 'https://www.youtube.com/embed/9Lxt4cA1Bso?start=6',
                    report: {
                        summary: {
                            ar: 'أكاديمية علمية وقفية متخصّصة عبر شبكة الإنترنت لتدريس العلوم الشرعية وما يخدمها بأسلوب تفاعلي شيّق يربط طالب العلم بتراث الأقدمين ليعيد صياغته بأسلوب عصري يلبّي حاجة المجتمعات المسلمة في وقتنا الحاضر.',
                            en: 'An endowed online academy specialized in Sharia sciences and related disciplines, using an engaging interactive approach that links learners to classical heritage and reframes it in a contemporary style to meet the needs of today’s Muslim communities.',
                            fr: "Académie en ligne dotée dédiée aux sciences religieuses et disciplines associées, avec une approche interactive captivante reliant l'étudiant à l'héritage des anciens pour le reformuler de façon moderne répondant aux besoins des communautés musulmanes actuelles."
                        }
                    }
                },
                {
                    id: 'baldatayiba',
                    name: {
                        ar: 'أكاديمية البلدة الطيبة',
                        en: 'Al-Balda Al-Tayiba Academy',
                        fr: 'Académie Al-Balda Al-Tayiba'
                    },
                    description: {
                        ar: 'منصة تعليمية إسلامية شاملة تقدم دورات ومحاضرات في العلوم الشرعية واللغة العربية',
                        en: 'Comprehensive Islamic educational platform offering courses and lectures in Islamic sciences and Arabic language',
                        fr: 'Plateforme éducative islamique complète proposant des cours et conférences en sciences islamiques et langue arabe'
                    },
                    icon: 'images/baldatayiba-logo.png',
                    url: 'https://www.baldatayiba.com/ar',
                    openInNewTab: true,
                    videoUrl: 'https://www.youtube.com/embed/bKUjMRCfZYE',
                    report: {
                        summary: {
                            ar: 'أكاديمية البلدة الطيبة منصة تعليم شرعي عن بُعد تقدم دبلومات ودورات في القرآن والفقه والعقيدة والسيرة والعلوم الشرعية، عبر دروس مسجلة وبث مباشر تمنح شهادات إتمام، وتؤكد الأكاديمية اعتمادها وتصديقها من وزارة الأوقاف اليمنية.',
                            en: 'Al-Balda Al-Tayiba Academy is a remote Sharia learning platform delivering diplomas and courses in Qur’an, fiqh, creed, seerah, and Islamic sciences through flexible recorded and live lessons that grant completion certificates, and it states it is accredited by the Yemeni Ministry of Endowments.',
                            fr: 'L\'Académie Al-Balda Al-Tayiba est une plateforme d\'enseignement religieux à distance proposant des diplômes et cours en Coran, fiqh, croyance, sira et sciences islamiques via des leçons enregistrées et en direct avec attestations d\'achèvement, tout en déclarant son accréditation par le ministère yéménite des Awqaf.'
                        },
                        highlights: {
                            ar: ['دبلومات ودورات شرعية متخصصة', 'مزيج من الدروس المسجلة والبث المباشر', 'شهادات إتمام مع اعتماد وزارة الأوقاف اليمنية'],
                            en: ['Specialized Sharia diplomas and courses', 'Blend of recorded lessons and live broadcasts', 'Completion certificates with Yemeni Endowments Ministry accreditation'],
                            fr: ['Diplômes et cours religieux spécialisés', 'Combinaison de cours enregistrés et de diffusions en direct', 'Certificats d\'achèvement avec accréditation du ministère yéménite des Awqaf']
                        }
                    }
                },
                {
                    id: 'forqanacademy',
                    name: {
                        ar: 'أكاديمية الفرقان للثقافة الإسلامية',
                        en: 'Forqan Academy for Islamic Culture',
                        fr: 'Académie Forqan de Culture Islamique'
                    },
                    description: {
                        ar: 'أكاديمية تعليمية تهتم بنشر الثقافة الإسلامية الأصيلة عبر برامج مبسطة في القرآن وعلومه والعقيدة والفقه والسلوك مع بناء وعي رقمي منضبط.',
                        en: 'Educational academy sharing authentic Islamic culture through concise Quran, creed, fiqh, and character programs while nurturing balanced digital awareness.',
                        fr: 'Académie éducative diffusant la culture islamique authentique grâce à des programmes synthétiques en Coran, croyance, fiqh et comportement tout en développant une conscience numérique équilibrée.'
                    },
                    icon: 'portals/forqan.svg',
                    url: 'https://forqanacademy.com/',
                    videoUrl: 'https://www.youtube.com/embed/vsZrhJQxWlA',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'أكاديمية تعليمية تُعنى بنشر الثقافة الإسلامية الأصيلة، تُقدّم برامج مبسّطة في القرآن وعلومه، والعقيدة، والفقه، والسلوك التربوي، مع عناية خاصة ببناء الوعي الرقمي المنضبط. تهدف إلى ترسيخ الهوية الإسلامية لدى الناشئة وتيسير التعلم الشرعي عبر وسائل حديثة ودروس منهجية موثوقة.',
                            en: 'An educational academy dedicated to spreading authentic Islamic culture with simplified programs in Quran studies, creed, fiqh, and character development, while putting special emphasis on cultivating disciplined digital awareness. It aims to anchor Islamic identity for youth and make Sharia learning accessible through trusted, modern delivery.',
                            fr: 'Académie éducative dédiée à la diffusion de la culture islamique authentique via des programmes simplifiés en Coran et ses sciences, en croyance, fiqh et éducation spirituelle, avec un accent particulier sur la conscience numérique maîtrisée. Elle vise à ancrer l’identité islamique chez les jeunes et à faciliter l’apprentissage religieux par des moyens modernes fiables.'
                        },
                        highlights: {
                            ar: ['برامج قرآنية وفقهية مبسطة بمناهج موثوقة', 'ورش سلوك وتربية تعزز الهوية الإسلامية', 'إرشادات للوعي الرقمي المنضبط داخل الأسرة'],
                            en: ['Simplified Quran and fiqh programs built on trusted curricula', 'Character workshops that strengthen Islamic identity', 'Guidance for disciplined digital awareness within families'],
                            fr: ['Programmes simplifiés de Coran et fiqh basés sur des cursus fiables', 'Ateliers comportementaux renforçant l’identité islamique', 'Guides pour une conscience numérique maîtrisée au sein des familles']
                        }
                    }
                },
                {
                    id: 'openlearningacademy',
                    name: {
                        ar: 'أكاديمية التعليم المفتوح',
                        en: 'Open Learning Academy',
                        fr: 'Académie Open Learning'
                    },
                    description: {
                        ar: 'منصة تعليمية تجمع برامج في القرآن والعلوم الشرعية والتنمية الذاتية عبر بث مباشر وتسجيلات مع شهادات رقمية.',
                        en: 'Learning platform blending Quran, Sharia sciences, and personal development programs through live broadcasts, recordings, and digital certificates.',
                        fr: 'Plateforme éducative réunissant programmes de Coran, sciences islamiques et développement personnel via des directs, des enregistrements et des certificats numériques.'
                    },
                    icon: 'portals/open-learning.svg',
                    url: 'https://open-learning.net/',
                    videoUrl: 'https://www.youtube.com/embed/jdbie9Jhx6w?start=88',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'هي منشأة تعليمية افتراضية تسعى لنشر العلم الشرعي عبر بيئة محفزة ومناهج متطورة مؤصلة وأساليب تقنية حديثة، تقرب المعارف الشرعية لجميع المسلمين وفق منهج أهل السنة والجماعة.',
                            en: 'A virtual educational institution dedicated to spreading Sharia knowledge through a motivating environment, advanced authenticated curricula, and modern technical delivery to bring authentic learning to all Muslims upon the creed of Ahl al-Sunnah.',
                            fr: 'Institution éducative virtuelle visant à diffuser les sciences islamiques grâce à un environnement motivant, des curricula authentifiés et des moyens techniques modernes, tout en restant fidèle à la voie d’Ahl as-Sunna.'
                        },
                        highlights: {
                            ar: [
                                'الرؤية: التميز في نشر وتعليم القرآن الكريم والعلوم الشرعية بالشراكة مع الآخرين',
                                'أهداف تشمل نشر العلم، إعداد الدعاة، توظيف التقنية، العناية بالقرآن، بناء كوادر تربوية، وتشجيع التعلم المستمر',
                                'دبلوم تأصيل العلوم الشرعية لمدة عامين لتأهيل معلمين ومعلمات بقدرات علمية وتربوية'
                            ],
                            en: [
                                'Vision: excel in spreading and teaching Qur’an and Sharia sciences through collaborative partnerships',
                                'Goals span disseminating knowledge, training capable callers, leveraging technology, caring for Qur’an mastery, forming educational cadres, and encouraging lifelong learning',
                                'Sharia Foundations Diploma: two-year Arabic program preparing qualified male and female educators'
                            ],
                            fr: [
                                'Vision : exceller dans la diffusion et l’enseignement du Coran et des sciences religieuses en partenariat avec autrui',
                                'Objectifs : vulgariser le savoir, former des prédicateurs compétents, exploiter la technologie, soigner la maîtrise du Coran, bâtir des cadres éducatifs et promouvoir l’apprentissage continu',
                                'Diplôme de Fondements des Sciences Religieuses : programme de deux ans en arabe pour former des éducateurs qualifiés'
                            ]
                        }
                    }
                }
                ,
                {
                    id: 'alnawawi',
                    name: {
                        ar: 'معهد الإمام النووي للتفقه الشافعي',
                        en: "Imam Nawawi Institute for Shafi'i Fiqh",
                        fr: "Institut Imam Nawawi pour le fiqh Shaféite"
                    },
                    description: {
                        ar: 'معهد علمي يهتم بالتفقه على المذهب الشافعي، يقدم دورات علمية في الفقه وأصوله وشرح المتون والتطبيقات الفقهية تحت إشراف مشايخ معتمدين.',
                        en: 'A scholarly institute focused on Shafi‘i jurisprudence offering courses in fiqh, usul, classical texts and practical applications under qualified scholars.',
                        fr: 'Institut scientifique dédié au fiqh shaféite proposant des cours de fiqh, usul, textes classiques et applications pratiques encadrés par des savants qualifiés.'
                    },
                    icon: 'portals/alnawawi.svg',
                    url: 'https://www.alnawawifiqh.com/',
                    videoUrl: 'https://www.youtube.com/embed/ojRUU9bC1o4',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'يوفّر المعهد برامج تأصيلية في الفقه الشافعي، من مناهج معتمدة ودورات متدرجة مع مراعاة الجانب التطبيقي والشرعي.',
                            en: 'The institute provides foundational programs in Shafi‘i fiqh with accredited curricula and leveled courses emphasizing both theoretical and practical aspects.',
                            fr: 'L’institut propose des programmes de base en fiqh shaféite avec des cursus accrédités et des cours par niveaux mettant l’accent sur les aspects théoriques et pratiques.'
                        },
                        highlights: {
                            ar: ['دورات تأصيلية في الفقه الشافعي', 'شرح المتون وحلقات تطبيقية', 'إشراف علمي من مشايخ مؤهلين'],
                            en: ['Foundational Shafi‘i fiqh courses', 'Classical texts with applied study circles', 'Scholarly supervision by qualified teachers'],
                            fr: ['Cours fondamentaux de fiqh shaféite', 'Études de textes classiques et cercles pratiques', 'Encadrement scientifique par des savants qualifiés']
                        }
                    }
                },
                {
                    id: 'murtaqaa',
                    name: {
                        ar: 'معهد مرتقى للعلوم الشرعية',
                        en: 'Murtaqaa Institute for Sharia Sciences',
                        fr: 'Institut Murtaqaa des Sciences Religieuses'
                    },
                    description: {
                        ar: 'معهد مختص بتقديم برامج علمية شرعية متدرجة في الفقه والحديث والتفسير وعلوم القرآن، مع تركيز على التطبيق التربوي وبناء الكوادر.',
                        en: 'An institute offering progressive Sharia programs in fiqh, hadith, tafsir and Quranic sciences, emphasizing applied pedagogy and capacity building.',
                        fr: 'Institut proposant des programmes progressifs en fiqh, hadith, tafsir et sciences coraniques, avec un accent sur la pédagogie appliquée et la formation de cadres.'
                    },
                    icon: 'portals/murtaqaa.svg',
                    url: 'https://www.academy.murtaqaa.com/',
                    videoUrl: 'https://www.youtube.com/embed/W8qr5hqhZww',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'يقدّم المعهد مسارات تعليمية مبنية على مناهج موثوقة لتهيئة طلاب العلم في مجالات الشريعة المختلفة، مع خيارات دبلومات وتدريب عملي.',
                            en: 'The institute provides curriculum-backed learning tracks to prepare students in various Sharia disciplines, offering diploma options and hands-on training.',
                            fr: 'L’institut offre des parcours pédagogiques fondés sur des cursus fiables pour former les étudiants aux différentes disciplines de la charia, avec diplômes et formations pratiques.'
                        },
                        highlights: {
                            ar: ['مسارات دبلومية متدرجة', 'تركيز تطبيقي وتدريبي', 'شهادات وخيارات متابعة علمية'],
                            en: ['Leveled diploma tracks', 'Applied and practical focus', 'Certificates and continued study options'],
                            fr: ['Parcours diplômants par niveaux', 'Approche appliquée et pratique', 'Certificats et possibilités de suivi']
                        }
                    }
                }
                ,
                {
                    id: 'zadacademy',
                    name: {
                        ar: 'أكاديمية زاد',
                        en: 'Zad Academy',
                        fr: 'Académie Zad'
                    },
                    description: {
                        ar: 'ابدأ رحلتك لمدة عامين كاملين مجانًا مع برنامج أكاديمية زاد عبر الإنترنت وقناة زاد الفضائية لتعلّم مبادئ العلوم الشرعية واللغة العربية.',
                        en: 'Start a full two-year journey for free with Zad Academy’s program online and on Zad TV to learn core Sharia sciences and Arabic language essentials.',
                        fr: 'Commencez un parcours complet de deux ans gratuitement avec le programme de l’Académie Zad en ligne et sur la chaîne Zad TV pour apprendre les sciences religieuses et la langue arabe.'
                    },
                    icon: 'portals/zadacademy.svg',
                    url: 'https://zad-academy.com/ar',
                    videoUrl: 'https://www.youtube.com/embed/HVb_oebnHdM',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'برنامج تعليمي من أربع مستويات (عامان)، كل مستوى مدته 12 أسبوعًا. منهج احترافي يشرحه مختصون ويهدف إلى تزويد المثقف الشرعي المعاصر بالمعارف الأساسية.',
                            en: 'A four-level program (two years), each level lasting 12 weeks. Professional curricula taught by specialists aiming to equip the contemporary Sharia student with essential knowledge.',
                            fr: 'Programme en quatre niveaux (deux ans), chaque niveau durant 12 semaines. Des programmes professionnels enseignés par des spécialistes visant à doter l’apprenant des connaissances essentielles.'
                        },
                        highlights: {
                            ar: ['4 مستويات - مدة عامين', '12 أسبوعًا لكل مستوى', 'دروس عبر الإنترنت وقناة تلفزيونية', 'مجانًا'],
                            en: ['4 levels — 2 years total', '12 weeks per level', 'Online lessons and TV broadcasts', 'Free of charge'],
                            fr: ['4 niveaux — 2 ans au total', '12 semaines par niveau', 'Cours en ligne et diffusion TV', 'Gratuit']
                        },
                        stats: [
                            { label: { ar: 'عدد المستويات', en: 'Levels', fr: 'Niveaux' }, value: '4' },
                            { label: { ar: 'مدة المستوى', en: 'Level duration', fr: 'Durée niveau' }, value: '12 أسابيع / 12 wks' },
                            { label: { ar: 'المدة الإجمالية', en: 'Total length', fr: 'Durée totale' }, value: '2 سنوات / 2 yrs' }
                        ]
                    }
                }
                ,
                {
                    id: 'imamaynacademy',
                    name: {
                        ar: 'أكاديمية الإمامين',
                        en: "Imamayn Academy",
                        fr: 'Académie des Deux Imams'
                    },
                    description: {
                        ar: 'تُقدّم أكاديمية الإمامين فرصة لتلقي العلم على يد شيوخ معتبرين وفق منهج متدرج ومنظم، مع محتوى مجاني بالكامل وتعليم عن بُعد.',
                        en: 'Imamayn Academy offers learning taught along a graded, organized curriculum by respected scholars, fully free and delivered remotely.',
                        fr: 'L’Académie des Deux Imams propose un enseignement selon un cursus progressif et organisé par des savants réputés, entièrement gratuit et à distance.'
                    },
                    icon: 'portals/imamain.svg',
                    url: 'https://www.elm-academy.net/ar',
                    videoUrl: 'https://www.youtube.com/embed/ZHX13fDwOR0',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'أكاديمية تقدم برامج شرعية متدرجة معتمدَّة تتيح التعلُّم عن بعد على يد رواد علمية معروفة، وتهدف إلى نشر العلم الشرعي بالمناهج الموثوقة.',
                            en: 'An academy providing accredited, leveled Sharia programs taught remotely by renowned scholars, aiming to disseminate authentic knowledge via trusted curricula.',
                            fr: 'Une académie proposant des programmes de charia accrédités et gradués, enseignés à distance par des savants reconnus, visant à diffuser un savoir authentique.'
                        },
                        highlights: {
                            ar: [
                                'التعلم من كبار العلماء (تتلمذ على يد ابن العثيمين وابن باز، رحمهما الله)',
                                'المادة التعليمية مجانية بالكامل',
                                'شهادة معتمدة ومجانية عند إتمام المادة',
                                'دروس عن بُعد عبر منصة تعليمية متقدمة'
                            ],
                            en: [
                                'Learn from senior scholars (students of Ibn Uthaymeen and Ibn Baz traditions)',
                                'All course material is completely free',
                                'Accredited free certificates upon completion',
                                'Remote learning via an advanced educational platform'
                            ],
                            fr: [
                                'Apprentissage auprès de grands savants (selon les traditions d’Ibn Uthaymeen et Ibn Baz)',
                                'Matériel entièrement gratuit',
                                'Certificats accrédités et gratuits après réussite',
                                'Enseignement à distance via une plateforme avancée'
                            ]
                        },
                        stats: [
                            { label: { ar: 'نوع الشهادات', en: 'Certificate types', fr: 'Types de certificats' }, value: 'شهادة مادة / شهادة فصل / شهادة تخرج مع سجل أكاديمي' }
                        ]
                    }
                }
                ,
                {
                    id: 'imamacademy',
                    name: {
                        ar: 'أكاديمية الأئمة والخطباء',
                        en: 'Imams & Preachers Academy',
                        fr: 'Académie des Imams et Prédicateurs'
                    },
                    description: {
                        ar: 'أكاديمية متخصصة في بناء وتطوير المعارف والمهارات ورفع الكفاءات وزيادة الوعي، موجهة للأئمة والخطباء عبر برامج تأصيلية ومهارية وتطبيقية.',
                        en: 'An academy specialized in developing knowledge, skills and competencies for imams and preachers, offering foundational, scholarly and practical programs to enhance their leadership and community service role.',
                        fr: 'Une académie spécialisée dans le développement des connaissances, compétences et capacités des imams et prédicateurs, proposant des programmes fondamentaux, scientifiques et pratiques pour renforcer leur rôle communautaire.'
                    },
                    icon: 'portals/imamacademy.svg',
                    url: 'https://www.imam-academy.com/ar/login',
                    videoUrl: 'https://www.youtube.com/embed/1oCDUuCjPYc',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'تقدّم الأكاديمية مسارات تأهيلية وتأصيلية وورش مهارية تهدف إلى تطوير قدرة الأئمة والخطباء على القيادة العلمية والتربوية وخدمة المجتمع باستخدام منهجية معاصرة.',
                            en: 'The academy offers qualifying and foundational tracks plus skill workshops aimed at developing imams’ and preachers’ capacities for scholarly and pastoral leadership, using contemporary methodologies.',
                            fr: 'L’académie propose des parcours de qualification et des ateliers de compétences visant à développer la capacité des imams et prédicateurs en leadership scientifique et pastoral, avec des méthodologies contemporaines.'
                        },
                        highlights: {
                            ar: [
                                'برامج تأصيلية وعلمية ومهارية موجهة للأئمة والخطباء',
                                'تطوير المهارات والخطط المعاصرة للخطابة والإمامة',
                                'دورات تطبيقية وتدريب على المنهجيات التربوية',
                                'موجه لخدمة المجتمع وتعزيز القيادة المحلية'
                            ],
                            en: [
                                'Foundational, scholarly and skills-track programs for imams and preachers',
                                'Develop contemporary preaching and leadership skills',
                                'Practical courses and pedagogy-focused training',
                                'Designed to strengthen community service and local leadership'
                            ],
                            fr: [
                                'Programmes fondationnels, scientifiques et de compétences pour imams et prédicateurs',
                                'Développement des compétences contemporaines en prédication et leadership',
                                'Cours pratiques et formation axée sur la pédagogie',
                                'Conçu pour renforcer le service communautaire et le leadership local'
                            ]
                        }
                    }
                }
                ,
                {
                    id: 'alsafwa',
                    name: {
                        ar: 'جامعة الصفوة - كلية العلوم الشرعية والعربية',
                        en: 'Al-Safwa University - College of Sharia & Arabic',
                        fr: 'Université Al-Safwa - Collège des Sciences Religieuses et de l’Arabe'
                    },
                    description: {
                        ar: 'كلية متخصصة في تدريس العلوم الإسلامية واللغة العربية بمنهج أهل السنة، تمنح درجة الليسانس عبر برنامج متكامل مدته أربع سنوات، وتقدّم الدراسة أحيانًا عن بُعد عبر قنوات التواصل مثل تليجرام.',
                        en: 'A college specializing in Islamic sciences and Arabic taught upon the Ahl al-Sunnah methodology, granting a bachelor’s degree through a four-year integrated program; studies are sometimes offered remotely via channels such as Telegram.',
                        fr: 'Un collège spécialisé en sciences islamiques et langue arabe selon la méthodologie d’Ahl as-Sunna, délivrant une licence sur un programme intégré de quatre ans; les cours sont parfois proposés à distance via des canaux comme Telegram.'
                    },
                    icon: 'portals/alsafwa.svg',
                    url: 'https://t.me/fosaas2?fbclid=IwY2xjawOf4O9leHRuA2FlbQIxMABicmlkETBmZkxFN2dIb2EwZ1NnY3V2c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHn4On0mcCV7fTAgkStu-do_B_Z-RiGTQ30bDJp0lRStBaE2PIuDCWvuP4fNk_aem_38yamm6QJ--mc6FlZcHqpA',
                    videoUrl: 'https://www.youtube.com/embed/x_OMCIQKdR8?start=155',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'كلية متخصصة تقدّم برامج البكالوريوس في العقيدة، والحديث، والفقه، والتفسير، واللغة العربية، وتوظّف نخبةً من المشايخ في التدريس مع خيارات دراسة عن بُعد.',
                            en: 'A specialized college offering bachelor programs in creed, hadith, fiqh, tafsir and Arabic, staffed by a cadre of scholars and offering remote study options.',
                            fr: 'Un collège spécialisé offrant des licences en croyance, hadith, fiqh, tafsir et arabe, encadré par des savants et proposant des options d’enseignement à distance.'
                        },
                        highlights: {
                            ar: ['منهج أهل السنة والجماعة', 'درجة الليسانس (بكالوريوس) لمدة أربع سنوات', 'خيارات دراسة عن بُعد عبر تليجرام', 'تدريس على يد نخبة من المشايخ'],
                            en: ['Ahl al-Sunnah curriculum', 'Bachelor degree (4-year program)', 'Remote study options via Telegram', 'Taught by a select group of scholars'],
                            fr: ['Programme Ahl as-Sunna', 'Licence (programme de 4 ans)', 'Possibilités d’études à distance via Telegram', 'Enseigné par un groupe de savants']
                        }
                    }
                },
                {
                    id: 'iftaacenter',
                    name: {
                        ar: 'معهد الإفتاء والتفقيه',
                        en: 'Ifta & Fiqh Institute',
                        fr: 'Institut Ifta et Fiqh'
                    },
                    description: {
                        ar: 'أول موقع متخصص في فقه الحنفية أصولًا وفروعًا وتطبيقًا، يضم مئات الدورات مع امتحانات قصيرة ومفصلة، وشهادات وإجازات بالتدريس للمتفوقين.',
                        en: 'The first site specialized in Hanafi fiqh in theory and practice, containing hundreds of courses with short and comprehensive exams, certificates and teaching ijazahs for top students.',
                        fr: 'Le premier site spécialisé en fiqh hanafite en théorie et pratique, proposant des centaines de cours avec examens courts et détaillés, certificats et ijazahs d’enseignement pour les meilleurs élèves.'
                    },
                    url: 'https://portal.iftaacenter.com/',
                    openInNewTab: true,
                    report: {
                        summary: {
                            ar: 'يحتوي المعهد على مئات الدورات في الكتب الحنفية المعتمدة، مع نظام امتحانات بعد كل درس ودورة يمنح من خلاله الطالب شهادة الدورة وإمكانية الحصول على إجازة بالتدريس إذا تفوق.',
                            en: 'The institute hosts hundreds of courses on authoritative Hanafi works, with exams after each lesson and a comprehensive test per course that awards certificates and, for outstanding students, teaching ijazahs.',
                            fr: 'L’institut propose des centaines de cours sur des ouvrages hanafits reconnus, avec des examens après chaque leçon et un examen détaillé par cours délivrant des certificats et, pour les élèves brillants, des ijazahs d’enseignement.'
                        },
                        highlights: {
                            ar: ['مئات الدورات في المذهب الحنفي', 'امتحانات قصيرة بعد كل درس', 'امتحان مفصل لكل دورة وشهادات', 'إجازة بالتدريس للمتفوقين', 'سلم تصاعدي يصل إلى رتبة الإفتاء'],
                            en: ['Hundreds of Hanafi courses', 'Short quizzes after each lesson', 'Comprehensive course exams and certificates', 'Teaching ijazah for top performers', 'Progression track up to position of Ifta (mufti)'],
                            fr: ['Des centaines de cours hanafits', 'QCM courts après chaque leçon', 'Examens détaillés par cours et certificats', 'Ijazah d’enseignement pour les meilleurs', 'Parcours progressif jusqu’au rang d’iftâ']
                        }
                    }
                }
            ]
        },
        {
            id: 'academies',
            name: {
                ar: 'الأكاديميات التعليمية',
                en: 'Educational Academies',
                fr: 'Académies Éducatives'
            },
            icon: <AcademyIcon className="w-6 h-6 text-blue-400" />,
            portals: [
                {
                    id: 'edraak',
                    name: { ar: 'منصة إدراك', en: 'Edraak Platform', fr: 'Plateforme Edraak' },
                    description: {
                        ar: 'إدراك هي منصة إلكترونية عربية للمساقات الجماعية مفتوحة المصادر (MOOCs). تم تأسيس إدراك بمبادرة من مؤسسة الملكة رانيا للتعليم والتنمية والتي تحرص على بذل كافة الجهود والمساعي للمساهمة في وضع العالم العربي في المقدمة في مجال التربية والتعليم كونهما حجر الأساس لتطور وازدهار الشعوب.',
                        en: 'Edraak is an Arabic online platform for open massive courses (MOOCs), founded by the Queen Rania Foundation to help place the Arab world at the forefront of education and learning as the cornerstone for societal progress.',
                        fr: "Edraak est une plateforme arabe de cours en ligne ouverts (MOOC), créée par la Queen Rania Foundation pour placer le monde arabe à l'avant-garde de l'éducation et de l'apprentissage, piliers du progrès des sociétés."
                    },
                    icon: 'images/edraak-logo.svg',
                    url: 'https://www.edraak.org/',
                    openInNewTab: true,
                    videoUrl: 'https://www.youtube.com/embed/4eyCs3_lWqE',
                    report: {
                        summary: {
                            ar: 'إدراك هي منصة إلكترونية عربية للمساقات الجماعية مفتوحة المصادر (MOOCs). تم تأسيس إدراك بمبادرة من مؤسسة الملكة رانيا للتعليم والتنمية والتي تحرص على بذل كافة الجهود والمساعي للمساهمة في وضع العالم العربي في المقدمة في مجال التربية والتعليم كونهما حجر الأساس لتطور وازدهار الشعوب. وتماشيا مع إيمان جلالة الملكة رانيا العبدالله بأهمية التعليم وما له من أثر في تحسين نوعية حياة المجتمعات والدول والأفراد وازدهارها على كل المستويات فإن إدراك تهدف إلى توفير مساقات تعليمية عالية الجودة يقوم على تطوير محتوياتها نخب من خبراء وأكاديمي العالم العربي والعالم، بالإضافة إلى تقديم بعض المساقات العالمية المترجمة للغة العربية. تعمل إدراك بالشراكة مع edX وهي إحدى المنصات التعليمية الإلكترونية الأولى على مستوى العالم والتابعة لجامعة هارفرد الأميركية ومعهد ماساتشوستس للتكنولوجيا. توفر إدراك فرصة الالتحاق بمساقات متنوعة وعلى كافة المستويات لجميع الناطقين باللغة العربية وبشكل مجاني، مع شهادات إتمام إلكترونية. كما تسعى إلى إبراز وتحفيز الخبراء العرب لإثراء المحتوى التعليمي العربي على الإنترنت. وإيمانا من مؤسسة الملكة رانيا بأهمية تقديم الجانب المعرفي والعلمي لكل من المعلم والمتعلم العربيين فإن إدراك تمثل وسيلة مؤثرة تتيح للعالم العربي الفرصة كي يعيد إنتاج ثقافته وصورته للعالم، كما تساهم في تطوير التعليم الإلكتروني عبر جناح بحثي ومعلوماتي يحلل البيانات لتجويد التجربة التعليمية وابتكار أفضل الأساليب التي تخدم المتعلم العربي. وتضم إدراك في فريق عملها نخبة من خبراء التعليم الإلكتروني الشغوفين بالتعلم والمدركين لأهمية مبدأ "العلم لمن يريد".',
                            en: 'Edraak is an Arabic MOOC platform founded by the Queen Rania Foundation to elevate Arab education with high-quality courses built by leading experts and global partners. It collaborates with edX (Harvard and MIT) to offer diverse, free Arabic courses with electronic completion certificates and translated international content. Edraak also promotes Arab experts to enrich online Arabic learning, and its research arm studies data to improve the learning experience while its team of e-learning specialists champions the principle of "knowledge for all."',
                            fr: "Edraak est une plateforme arabe de MOOC créée par la Queen Rania Foundation pour élever l'éducation arabe grâce à des cours de haute qualité développés par des experts et des partenaires internationaux. Elle collabore avec edX (Harvard et MIT) pour proposer des cours variés et gratuits en arabe avec attestations électroniques, ainsi que du contenu mondial traduit. Edraak valorise les experts arabes pour enrichir l'apprentissage en ligne et son pôle de recherche analyse les données afin d'améliorer l'expérience d'apprentissage, tandis que son équipe d'e-learning défend le principe \"le savoir pour tous\"."
                        }
                    }
                },
                {
                    id: 'khan',
                    name: { ar: 'أكاديمية خان', en: 'Khan Academy', fr: 'Khan Academy' },
                    description: {
                        ar: 'أكاديمية خان هي مؤسسة 501(c)(3) غير ربحية تقدم محتوى تعليميًا مجانيًا للجميع.',
                        en: 'Khan Academy is a 501(c)(3) nonprofit providing free educational content for everyone.',
                        fr: "Khan Academy est une organisation à but non lucratif 501(c)(3) qui offre des contenus éducatifs gratuits pour tous."
                    },
                    url: 'https://www.khanacademy.org/',
                    openInNewTab: true,
                    videoUrl: 'https://www.youtube.com/embed/V82RP_p_rQI',
                    report: {
                        summary: {
                            ar: 'مصدر تعليمي شخصي لجميع الأعمار مع تمارين وفيديوهات إرشادية ولوحة تحكم تُمكّن المتعلمين من الدراسة وفق وتيرتهم من الروضة حتى بداية الكلية، مع تغطية الرياضيات والعلوم والقراءة والحوسبة والتاريخ والفن والاقتصاد والمهارات المالية وامتحانات SAT وMCAT وغيرها. تركيزها على إتقان المهارات لبناء أسس قوية للنجاح الأكاديمي والمهني. تقدم أدوات مجانية للأهالي والمعلمين لرصد التقدم الفردي والجماعي، وتُترجم مواردها إلى أكثر من 36 لغة. قصص متعلمين من مختلف الأعمار، مثل Barbara ذات الـ73 عامًا، تعكس الأثر العالمي للمنصة. بدأت بمعلّم واحد ونمت إلى فريق متنوع يضم أكثر من 150 شخصًا يعملون على مهمة: تعليم عالمي المستوى مجاني لأي شخص في أي مكان.',
                            en: 'A personal learning source for all ages with exercises, instructional videos, and a learner dashboard so students can progress at their own pace from early years through early college. Covers math, science, reading, computing, history, art, economics, financial literacy, SAT/MCAT prep, and more, with a mastery approach to build strong foundations. Offers free tools for parents and teachers to track individual and class progress. Resources are translated into 36+ languages, touching millions worldwide—like Barbara, 73, returning to learning. Grew from one tutor to a diverse team of 150+ pursuing the mission: world-class education for anyone, anywhere, for free.',
                            fr: "Une ressource d'apprentissage personnalisée pour tous les âges avec exercices, vidéos pédagogiques et tableau de bord permettant d'apprendre à son propre rythme, de la maternelle au début des études supérieures. Couvre maths, sciences, lecture, informatique, histoire, art, économie, finance personnelle et préparation SAT/MCAT, avec une approche de maîtrise pour des bases solides. Outils gratuits pour parents et enseignants afin de suivre les progrès individuels et de classe. Ressources traduites en 36+ langues, touchant des millions d'apprenants—comme Barbara, 73 ans, qui a repris ses études. Partie d'un seul tuteur, l'équipe est devenue 150+ personnes diverses au service d'une mission : offrir gratuitement une éducation de niveau mondial à tous et partout."
                        }
                    }
                }
            ]
        },
        {
            id: 'institutes',
            name: {
                ar: 'المعاهد العلمية',
                en: 'Scientific Institutes',
                fr: 'Instituts Scientifiques'
            },
            icon: <InstituteIcon className="w-6 h-6 text-purple-400" />,
            portals: [
                {
                    id: 'mit',
                    name: { ar: 'معهد ماساتشوستس للتكنولوجيا', en: 'MIT OpenCourseWare', fr: 'MIT OpenCourseWare' },
                    url: 'https://ocw.mit.edu/',
                    report: {
                        summary: {
                            ar: 'يوفر MIT OCW مكتبة مجانية تضم مقررات المعهد في الهندسة والعلوم وإدارة الأعمال مع مواد كاملة ومتاحة بدون تسجيل.',
                            en: 'MIT OCW offers a free digital library of MIT courses in engineering, sciences, and management with full materials and no enrollment needed.',
                            fr: 'MIT OCW propose une bibliothèque numérique gratuite des cours du MIT en ingénierie, sciences et management, avec supports complets sans inscription.'
                        },
                        highlights: {
                            ar: ['أكثر من 2500 مقرر كامل متاح', 'مواد محدثة بانتظام مع محاضرات وواجبات'],
                            en: ['Access to 2,500+ full courses', 'Continuously refreshed lectures and assignments'],
                            fr: ['Accès à plus de 2 500 cours complets', 'Cours et devoirs mis à jour en continu']
                        },
                        stats: [
                            { label: { ar: 'عدد المتعلمين السنوي', en: 'Annual learners', fr: 'Apprenants annuels' }, value: '5M+' },
                            { label: { ar: 'لغات الترجمة', en: 'Available languages', fr: 'Langues disponibles' }, value: '12' }
                        ]
                    },
                    videoUrl: 'https://www.youtube.com/embed/6fQHLK1aIBs'
                },
                {
                    id: 'stanford',
                    name: { ar: 'جامعة ستانفورد', en: 'Stanford Online', fr: 'Stanford Online' },
                    url: 'https://online.stanford.edu/',
                    report: {
                        summary: {
                            ar: 'تقدم ستانفورد أونلاين برامج احترافية وشهادات مصغرة في الذكاء الاصطناعي وريادة الأعمال والطب باستخدام شراكات مع كبرى الشركات.',
                            en: 'Stanford Online delivers professional programs and micro-credentials in AI, entrepreneurship, and medicine with industry partnerships.',
                            fr: 'Stanford Online propose des programmes professionnels et micro-certifications en IA, entrepreneuriat et médecine grâce à des partenariats industriels.'
                        },
                        highlights: {
                            ar: ['دورات مع خبراء وادي السيليكون', 'شهادات معتمدة يمكن مشاركتها'],
                            en: ['Courses led by Silicon Valley experts', 'Shareable, accredited certificates'],
                            fr: ['Cours animés par des experts de la Silicon Valley', 'Certificats accrédités et partageables']
                        },
                        stats: [
                            { label: { ar: 'مجالات التخصص', en: 'Focus tracks', fr: 'Parcours spécialisés' }, value: '15' },
                            { label: { ar: 'مدة البرامج القصيرة', en: 'Short program length', fr: 'Durée des programmes courts' }, value: '4-10 أسابيع / wks / sem' }
                        ]
                    },
                    videoUrl: 'https://www.youtube.com/embed/LxgMdjyw8Uw'
                },
                {
                    id: 'harvard',
                    name: { ar: 'جامعة هارفارد', en: 'Harvard Online', fr: 'Harvard Online' },
                    url: 'https://online-learning.harvard.edu/',
                    report: {
                        summary: {
                            ar: 'توفر Harvard Online برامج تعلّم مرنة من كليات هارفارد مع تقييمات دورية ومشاريع تطبيقية في العلوم الإنسانية والبيانات.',
                            en: 'Harvard Online provides flexible learning paths from Harvard schools with periodic assessments and applied projects across humanities and data.',
                            fr: 'Harvard Online offre des parcours flexibles issus des écoles Harvard avec évaluations périodiques et projets appliqués en sciences humaines et données.'
                        },
                        highlights: {
                            ar: ['دروس مباشرة مع هيئة التدريس', 'خيارات تعليم ذاتي مع منتديات طلابية'],
                            en: ['Live sessions with faculty', 'Self-paced tracks supported by student forums'],
                            fr: ['Sessions en direct avec le corps professoral', 'Parcours à votre rythme soutenus par des forums étudiants']
                        },
                        stats: [
                            { label: { ar: 'نسبة إنجاز المتعلمين', en: 'Learner completion rate', fr: 'Taux de complétion' }, value: '88%' }
                        ]
                    }
                }
            ]
        },
        {
            id: 'languages',
            name: {
                ar: 'تعلم اللغات',
                en: 'Language Learning',
                fr: 'Apprentissage des Langues'
            },
            icon: <LanguageIcon className="w-6 h-6 text-green-400" />,
            portals: [
                {
                    id: 'duolingo',
                    name: { ar: 'دولينجو', en: 'Duolingo', fr: 'Duolingo' },
                    url: 'https://www.duolingo.com/'
                },
                {
                    id: 'memrise',
                    name: { ar: 'ميمرايز', en: 'Memrise', fr: 'Memrise' },
                    url: 'https://www.memrise.com/'
                },
                {
                    id: 'busuu',
                    name: { ar: 'بوسو', en: 'Busuu', fr: 'Busuu' },
                    url: 'https://www.busuu.com/'
                }
            ]
        },
        {
            id: 'coding',
            name: {
                ar: 'البرمجة والتقنية',
                en: 'Coding & Technology',
                fr: 'Programmation & Technologie'
            },
            icon: <CodingIcon className="w-6 h-6 text-cyan-400" />,
            portals: [
                {
                    id: 'codecademy',
                    name: { ar: 'كود أكاديمي', en: 'Codecademy', fr: 'Codecademy' },
                    url: 'https://www.codecademy.com/'
                },
                {
                    id: 'freecodecamp',
                    name: { ar: 'فري كود كامب', en: 'freeCodeCamp', fr: 'freeCodeCamp' },
                    url: 'https://www.freecodecamp.org/'
                },
                {
                    id: 'w3schools',
                    name: { ar: 'دبليو ثري سكولز', en: 'W3Schools', fr: 'W3Schools' },
                    url: 'https://www.w3schools.com/'
                }
            ]
        },
        {
            id: 'kids',
            name: {
                ar: 'تعليم الأطفال',
                en: 'Kids Education',
                fr: 'Éducation des Enfants'
            },
            icon: <KidsIcon className="w-6 h-6 text-yellow-400" />,
            portals: [
                {
                    id: 'abcya',
                    name: { ar: 'إيه بي سي يا', en: 'ABCya', fr: 'ABCya' },
                    url: 'https://www.abcya.com/'
                },
                {
                    id: 'funbrain',
                    name: { ar: 'فن براين', en: 'Funbrain', fr: 'Funbrain' },
                    url: 'https://www.funbrain.com/'
                },
                {
                    id: 'starfall',
                    name: { ar: 'ستارفول', en: 'Starfall', fr: 'Starfall' },
                    url: 'https://www.starfall.com/'
                }
            ]
        }
    ];

    const handleAccessCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode === ACCESS_CODE_VALUE) {
            setIsAuthenticated(true);
            setShowError(false);
            try {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(ACCESS_CODE_STORAGE_KEY, ACCESS_CODE_VALUE);
                }
            } catch (error) {
                console.warn('Failed to store access code', error);
            }
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const toggleFolder = (folderId: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(folderId)) {
            newExpanded.delete(folderId);
        } else {
            newExpanded.add(folderId);
        }
        setExpandedFolders(newExpanded);
    };

    const openPortal = (portal: Portal) => {
        setSelectedPortal(portal);
        setIsFullscreen(false);
    };

    const closePortal = () => {
        setSelectedPortal(null);
        setIsFullscreen(false);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const openExternalLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
            onClick={onClose}
            dir={dir}
        >
            <div
                className={`bg-gradient-to-br from-[#132a4d] via-[#0e1c33] to-[#081225] border border-cyan-400/20 rounded-[30px] w-full flex overflow-hidden shadow-[0_25px_70px_-15px_rgba(15,118,230,0.45)] relative transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[70] h-screen max-w-full rounded-none' : 'h-[90vh] max-w-7xl'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 p-6 border-b border-white/10 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 z-10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-2xl text-cyan-300 shadow-inner">
                            <PortalIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white font-cairo">{t.educationalPortals}</h2>
                            <p className="text-xs text-cyan-400/60">{t.exploreWorldKnowledge}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Access Code Screen */}
                {!isAuthenticated ? (
                    <div className="flex items-center justify-center w-full h-full pt-16 relative overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

                        <div className="relative z-10 bg-white/10 backdrop-blur-[28px] border border-white/20 rounded-[28px] p-8 max-w-sm w-full mx-4 shadow-[0_15px_35px_-20px_rgba(15,118,230,0.65)] transform transition-all hover:scale-[1.01] duration-500 group">
                            {/* Glowing Border Effect */}
                            <div className="absolute inset-[1px] rounded-[32px] bg-gradient-to-r from-white/5 via-cyan-500/20 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="text-center mb-8 relative">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-5 transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3 font-cairo tracking-wide">
                                    {currentLang === 'ar' ? 'منطقة محمية' : currentLang === 'fr' ? 'Zone Protégée' : 'Protected Area'}
                                </h3>
                                <p className="text-cyan-100/70 text-sm font-light">
                                    {currentLang === 'ar' ? 'يرجى إدخال رمز المرور للمتابعة' : currentLang === 'fr' ? 'Veuillez entrer le code d\'accès' : 'Please enter passcode to proceed'}
                                </p>
                            </div>

                            <form onSubmit={handleAccessCode} className="space-y-6 relative">
                                <div className="relative group/input">
                                    <input
                                        type="password"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                        placeholder=""
                                        className="w-full px-4 py-3 bg-white/15 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-cyan-300 focus:bg-white/20 focus:ring-4 focus:ring-cyan-400/20 transition-all text-center text-xl tracking-[0.45em] font-mono uppercase shadow-inner"
                                        maxLength={7}
                                        autoFocus
                                        autoComplete="off"
                                        aria-label={currentLang === 'ar' ? 'رمز المرور' : currentLang === 'fr' ? 'Code d\'accès' : 'Passcode'}
                                    />
                                </div>

                                {showError && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center justify-center gap-2 text-red-400 text-sm animate-shake">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {currentLang === 'ar' ? 'رمز المرور غير صحيح' : currentLang === 'fr' ? 'Code incorrect' : 'Incorrect passcode'}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_12px_30px_-20px_rgba(59,130,246,0.8)] flex items-center justify-center gap-2 group/btn"
                                >
                                    <span>{currentLang === 'ar' ? 'فتح البوابة' : currentLang === 'fr' ? 'Déverrouiller' : 'Unlock Portal'}</span>
                                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform rtl:group-hover/btn:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-white/40 uppercase tracking-[0.4em]">Secure Access v2.0</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Main Content */
                    <div className="flex w-full h-full pt-24 relative">
                        {isMobile && selectedPortal && (
                            <button
                                onClick={closePortal}
                                className="absolute top-4 left-4 z-20 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl border border-white/20 shadow-lg backdrop-blur"
                            >
                                {currentLang === 'ar' ? 'القائمة' : currentLang === 'fr' ? 'Liste' : 'List'}
                            </button>
                        )}
                        {/* Sidebar - Folder Tree */}
                        <div className={`${isMobile && selectedPortal ? 'hidden' : selectedPortal ? 'w-80' : 'w-full max-w-2xl mx-auto'} border-r border-white/10 bg-black/20 overflow-y-auto custom-scrollbar transition-all duration-300`}>
                            <div className="p-6 space-y-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="mb-2">
                                        {/* Folder Header */}
                                        <button
                                            onClick={() => toggleFolder(category.id)}
                                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                                        >
                                            <ChevronIcon
                                                className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${expandedFolders.has(category.id) ? 'rotate-90' : dir === 'rtl' ? 'rotate-180' : ''
                                                    }`}
                                            />
                                            <FolderIcon className={`w-5 h-5 ${expandedFolders.has(category.id) ? 'text-yellow-400' : 'text-gray-400'}`} />
                                            <span className="text-lg">{category.icon}</span>
                                            <span className="text-white font-bold flex-1 text-left rtl:text-right">{category.name[currentLang]}</span>
                                            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">{category.portals.length}</span>
                                        </button>

                                        {/* Portal Files */}
                                        {expandedFolders.has(category.id) && (
                                            <div className={`mt-2 space-y-1 ${dir === 'rtl' ? 'mr-8' : 'ml-8'} animate-slide-down`}>
                                                {category.portals.map((portal) => (
                                                    <button
                                                        key={portal.id}
                                                        onClick={() => openPortal(portal)}
                                                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all group ${selectedPortal?.id === portal.id
                                                            ? 'bg-cyan-500/20 border border-cyan-500/50'
                                                            : 'hover:bg-white/5 border border-transparent'
                                                            }`}
                                                    >
                                                        <FileIcon className={`w-4 h-4 ${selectedPortal?.id === portal.id ? 'text-cyan-400' : 'text-gray-400'}`} />
                                                        <span className={`text-sm flex-1 text-left rtl:text-right ${selectedPortal?.id === portal.id ? 'text-cyan-300 font-bold' : 'text-white/70 group-hover:text-white'}`}>
                                                            {portal.name[currentLang]}
                                                        </span>
                                                        <PortalIcon className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition-colors" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Portal Viewer */}
                        {selectedPortal && (
                            <div className={`flex-1 flex flex-col bg-black/40 animate-slide-in-right ${isMobile ? 'w-full' : ''}`}>
                                {/* Portal Header */}
                                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0f172a]">
                                    <div className="flex items-center gap-3 flex-1">
                                        <button
                                            onClick={closePortal}
                                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                        >
                                            <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                {selectedPortal.icon && (
                                                    <img
                                                        src={import.meta.env.BASE_URL + selectedPortal.icon}
                                                        alt={selectedPortal.name[currentLang]}
                                                        className="w-6 h-6 object-contain"
                                                    />
                                                )}
                                                <h3 className="text-white font-bold text-base">{selectedPortal.name[currentLang]}</h3>
                                            </div>
                                            {selectedPortal.description && (
                                                <p className="text-cyan-300/70 text-xs mt-1 italic">{selectedPortal.description[currentLang]}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openExternalLink(selectedPortal.url)}
                                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                            title={currentLang === 'ar' ? 'فتح في نافذة جديدة' : currentLang === 'fr' ? 'Ouvrir dans un nouvel onglet' : 'Open in new tab'}
                                        >
                                            <ExternalLinkIcon />
                                        </button>
                                        <button
                                            onClick={toggleFullscreen}
                                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                            title={isFullscreen ? t.exitFullscreen : t.fullscreen}
                                        >
                                            <FullScreenIcon />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#050b18] to-[#01030a]">
                                    <div className="p-6 space-y-6">
                                        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                                <div>
                                                    <p className="text-sm text-cyan-100/80 leading-relaxed">
                                                        {selectedPortal.report
                                                            ? selectedPortal.report.summary[currentLang]
                                                            : currentLang === 'ar'
                                                                ? 'لم يضاف تقرير تفصيلي بعد لهذا المعهد.'
                                                                : currentLang === 'fr'
                                                                    ? 'Aucun rapport détaillé n\'est encore disponible pour cet institut.'
                                                                    : 'No detailed report has been added for this institute yet.'}
                                                    </p>
                                                </div>
                                                {selectedPortalHighlights && selectedPortalHighlights.length > 0 && (
                                                    <ul className="space-y-2 text-white/80 text-sm list-disc list-inside">
                                                        {selectedPortalHighlights.map((point, index) => (
                                                            <li key={`${selectedPortal.id}-highlight-${index}`}>{point}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {selectedPortalStats.length > 0 && (
                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        {selectedPortalStats.map((stat, index) => (
                                                            <div key={`${selectedPortal.id}-stat-${index}`} className="bg-black/30 rounded-xl p-3 border border-white/5">
                                                                <p className="text-xs uppercase tracking-widest text-white/40">{stat.label[currentLang]}</p>
                                                                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-4">
                                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                                                    <h4 className="text-white font-semibold text-lg">
                                                        {currentLang === 'ar' ? 'حفظ في حسابي' : currentLang === 'fr' ? 'Enregistrer dans mon compte' : 'Save to my account'}
                                                    </h4>
                                                    <p className="text-sm text-white/60">
                                                        {currentLang === 'ar'
                                                            ? 'احتفظ بالمعهد للوصول السريع ومراجعته لاحقًا.'
                                                            : currentLang === 'fr'
                                                                ? 'Gardez cet institut pour un accès rapide plus tard.'
                                                                : 'Keep this institute handy for fast access later.'}
                                                    </p>
                                                    <button
                                                        onClick={() => togglePortalSave(selectedPortal.id)}
                                                        className={`w-full py-3 rounded-xl font-semibold transition-all border ${selectedPortalSaved
                                                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                                                            : 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40 hover:bg-cyan-500/30'
                                                            }`}
                                                    >
                                                        {selectedPortalSaved
                                                            ? currentLang === 'ar'
                                                                ? 'إزالة من المحفوظات'
                                                                : currentLang === 'fr'
                                                                    ? 'Retirer des favoris'
                                                                    : 'Remove from saved'
                                                            : currentLang === 'ar'
                                                                ? 'حفظ المعهد'
                                                                : currentLang === 'fr'
                                                                    ? 'Sauvegarder l\'institut'
                                                                    : 'Save institute'}
                                                    </button>
                                                </div>
                                                <div
                                                    className={`rounded-2xl p-5 border ${needsPasswordChange
                                                        ? 'border-amber-400/60 bg-amber-400/10'
                                                        : 'border-emerald-400/40 bg-emerald-400/5'
                                                        }`}
                                                >
                                                    <h4 className="text-white font-semibold text-lg mb-1">
                                                        {currentLang === 'ar' ? 'تذكير الأمان' : currentLang === 'fr' ? 'Rappel de sécurité' : 'Security reminder'}
                                                    </h4>
                                                    <p className="text-sm text-white/70 mb-3">
                                                        {currentLang === 'ar'
                                                            ? 'ننصح بتحديث رمز المرور كل ستة أشهر لحماية حسابك.'
                                                            : currentLang === 'fr'
                                                                ? 'Nous vous conseillons de changer votre code d\'accès tous les six mois pour sécuriser votre compte.'
                                                                : 'We recommend rotating your passcode every six months to protect your account.'}
                                                    </p>
                                                    <p className="text-xs text-white/60 mb-4">
                                                        {needsPasswordChange
                                                            ? currentLang === 'ar'
                                                                ? 'حان وقت تحديث الرمز الآن.'
                                                                : currentLang === 'fr'
                                                                    ? 'Il est temps de mettre à jour votre code.'
                                                                    : 'It is time to refresh your passcode.'
                                                            : nextReminderDate
                                                                ? (currentLang === 'ar'
                                                                    ? `التذكير القادم: ${formatDate(nextReminderDate)}`
                                                                    : currentLang === 'fr'
                                                                        ? `Prochain rappel : ${formatDate(nextReminderDate)}`
                                                                        : `Next reminder: ${formatDate(nextReminderDate)}`)
                                                                : ''}
                                                    </p>
                                                    <button
                                                        onClick={handlePasswordChangeConfirmation}
                                                        className="w-full py-2.5 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition-all"
                                                    >
                                                        {currentLang === 'ar'
                                                            ? 'تم تغيير الرمز الآن'
                                                            : currentLang === 'fr'
                                                                ? 'Je viens de changer le code'
                                                                : 'I changed it now'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-white font-semibold text-lg">
                                                    {currentLang === 'ar' ? 'عرض تعريفي' : currentLang === 'fr' ? 'Présentation vidéo' : 'Spotlight video'}
                                                </h4>
                                                {selectedPortal.videoUrl && <span className="text-xs text-white/50 uppercase tracking-widest">HD</span>}
                                            </div>
                                            {selectedPortal.videoUrl ? (
                                                <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden bg-black/60">
                                                    <iframe
                                                        src={selectedPortal.videoUrl}
                                                        title={`${selectedPortal.name[currentLang]} overview`}
                                                        className="absolute inset-0 w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-white/60">
                                                    {currentLang === 'ar'
                                                        ? 'لا يوجد فيديو تعريفي متاح حاليًا لهذا المعهد.'
                                                        : currentLang === 'fr'
                                                            ? 'Aucune vidéo de présentation n\'est disponible pour le moment.'
                                                            : 'No spotlight video is available for this institute yet.'}
                                                </p>
                                            )}
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                            {selectedPortal.openInNewTab ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f172a] p-8 text-center">
                                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                                        <ExternalLinkIcon className="w-8 h-8 text-cyan-400" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">
                                                        {currentLang === 'ar' ? 'فتح في نافذة جديدة' : currentLang === 'fr' ? 'Ouvrir dans un nouvel onglet' : 'Open in New Window'}
                                                    </h3>
                                                    <p className="text-white/60 mb-8 max-w-xl">
                                                        {currentLang === 'ar'
                                                            ? 'يفتح هذا الموقع في نافذة جديدة لضمان أفضل تجربة تصفح.'
                                                            : currentLang === 'fr'
                                                                ? 'Ce site s\'ouvre dans un nouvel onglet pour assurer la meilleure expérience de navigation.'
                                                                : 'This site opens in a new window to ensure the best browsing experience.'}
                                                    </p>
                                                    <button
                                                        onClick={() => openExternalLink(selectedPortal.url)}
                                                        className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                                    >
                                                        <span>
                                                            {currentLang === 'ar' ? 'زيارة الموقع' : currentLang === 'fr' ? 'Visiter le site' : 'Visit Website'}
                                                        </span>
                                                        <ExternalLinkIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="relative w-full pt-[65%] bg-black">
                                                    <iframe
                                                        src={selectedPortal.url}
                                                        className="absolute inset-0 w-full h-full border-none"
                                                        title={selectedPortal.name[currentLang]}
                                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out forwards;
                }
                @keyframes slide-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out forwards;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};
