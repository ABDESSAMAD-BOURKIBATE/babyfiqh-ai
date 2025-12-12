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
                    id: 'baldatayiba',
                    name: {
                        ar: 'أكاديمية البلدة الطيبة',
                        en: 'Al-Balda Al-Tayiba Academy',
                        fr: 'Académie Al-Balda Al-Tayiba'
                    },
                    description: {
                {
                    id: 'forqan',
                    name: {
                        ar: 'أكاديمية الفرقان',
                        en: 'Forqan Academy',
                        fr: 'Académie Forqan'
                    },
                    description: {
                        ar: 'أكاديمية الفرقان للثقافة الإسلامية',
                        en: 'Forqan Academy for Islamic Culture',
                        fr: 'Académie Forqan pour la culture islamique'
                    },
                    icon: 'images/forqan-logo.png',
                    url: 'https://forqanacademy.com/',
                    openInNewTab: true,
                    videoUrl: 'https://www.youtube.com/embed/vsZrhJQxWlA',
                    report: {
                        summary: {
                            ar: 'منصة تعليمية متخصصة بنشر الثقافة الإسلامية الأصيلة عبر برامج مبسطة في القرآن وعلومه والعقيدة والفقه والسلوك التربوي، مع اهتمام ببناء وعي رقمي منضبط وترسيخ الهوية لدى الناشئة بوسائل حديثة.',
                            en: 'A learning platform dedicated to authentic Islamic culture, delivering concise programs on Qur’an sciences, creed, jurisprudence, and ethical upbringing while fostering disciplined digital awareness and reinforcing identity for youth through modern delivery.',
                            fr: 'Plateforme éducative dédiée à la culture islamique authentique, proposant des programmes simplifiés sur le Coran et ses sciences, la croyance, le fiqh et l\'éducation spirituelle tout en développant une conscience numérique maîtrisée et l\'identité des jeunes via des moyens modernes.'
                        },
                        highlights: {
                            ar: ['برامج منهجية في القرآن والعقيدة والفقه', 'ترسيخ الهوية الإسلامية للناشئة', 'عناية ببناء وعي رقمي منضبط'],
                            en: ['Structured programs in Qur’an, creed, and fiqh', 'Strengthens Islamic identity for youth', 'Focus on disciplined digital awareness'],
                            fr: ['Programmes structurés en Coran, croyance et fiqh', 'Renforce l\'identité islamique des jeunes', 'Accent sur une conscience numérique maîtrisée']
                        }
                    }
                }
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
                    id: 'khan',
                    name: { ar: 'أكاديمية خان', en: 'Khan Academy', fr: 'Khan Academy' },
                    url: 'https://www.khanacademy.org/'
                },
                {
                    id: 'coursera',
                    name: { ar: 'كورسيرا', en: 'Coursera', fr: 'Coursera' },
                    url: 'https://www.coursera.org/'
                },
                {
                    id: 'edx',
                    name: { ar: 'إيديكس', en: 'edX', fr: 'edX' },
                    url: 'https://www.edx.org/'
                },
                {
                    id: 'udemy',
                    name: { ar: 'يوديمي', en: 'Udemy', fr: 'Udemy' },
                    url: 'https://www.udemy.com/'
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
        if (accessCode === 'VIP2026') {
            setIsAuthenticated(true);
            setShowError(false);
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
                    <div className="flex w-full h-full pt-24">
                        {/* Sidebar - Folder Tree */}
                        <div className={`${selectedPortal ? 'w-80' : 'w-full max-w-2xl mx-auto'} border-r border-white/10 bg-black/20 overflow-y-auto custom-scrollbar transition-all duration-300`}>
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
                                            <span className="text-white font-bold flex-1 text-left">{category.name[currentLang]}</span>
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
                                                        <span className={`text-sm flex-1 text-left ${selectedPortal?.id === portal.id ? 'text-cyan-300 font-bold' : 'text-white/70 group-hover:text-white'}`}>
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
                            <div className="flex-1 flex flex-col bg-black/40 animate-slide-in-right">
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
