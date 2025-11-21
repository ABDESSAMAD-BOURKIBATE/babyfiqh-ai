
import React from 'react';
import { translations, Language, CharacterId } from '../utils/translations';
import { LogoIcon } from './icons/LogoIcon';
import { InfoIcon } from './icons/InfoIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { XIcon } from './icons/XIcon';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { MessageSquareIcon } from './icons/MessageSquareIcon';
import { BookIcon } from './icons/BookIcon';
import { LogOutIcon } from './icons/LogOutIcon';
import { QuranIcon } from './icons/QuranIcon'; // Import new icon

interface SidebarProps {
    currentLang: Language;
    onLangChange: (lang: Language) => void;
    currentCharacterId: CharacterId;
    onCharacterChange: (id: CharacterId) => void;
    onOpenAbout: () => void;
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    onToggleTheme: () => void;
    isAudioMode: boolean;
    onToggleAudioMode: () => void;
    onOpenLibrary: () => void;
    onOpenFurqan: () => void; // New Prop
    onLogout: () => void;
}

// Simple SVG Icons for characters
const GrandpaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <path d="M16 11c.667-.667 2-2.333 3-4"></path>
    </svg>
);

const GrandmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        <path d="M15.5 11a4 4 0 1 1-7 0"></path>
    </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({
    currentLang,
    onLangChange,
    currentCharacterId,
    onCharacterChange,
    onOpenAbout,
    isOpen,
    onClose,
    isDarkMode,
    onToggleTheme,
    isAudioMode,
    onToggleAudioMode,
    onOpenLibrary,
    onOpenFurqan,
    onLogout
}) => {
    const t = translations[currentLang].ui;
    const isRtl = translations[currentLang].direction === 'rtl';

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'ar', label: 'العربية', flag: '🇸🇦' },
        { code: 'zgh', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
    ];

    // Theme Configuration
    const theme = {
        bg: isDarkMode ? 'bg-[#0f172a]' : 'bg-white',
        border: isDarkMode ? 'border-slate-800' : 'border-gray-100',
        textPrimary: isDarkMode ? 'text-slate-100' : 'text-gray-800',
        textSecondary: isDarkMode ? 'text-slate-400' : 'text-gray-500',
        sectionLabel: isDarkMode ? 'text-indigo-400' : 'text-emerald-600',
        hover: isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100',
        divider: isDarkMode ? 'bg-white/10' : 'bg-gray-100',
        logoBg: isDarkMode ? 'bg-white/10' : 'bg-emerald-50',
        switchContainer: isDarkMode ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200',
        iconActive: 'text-white',
        iconInactive: isDarkMode ? 'text-slate-500' : 'text-slate-400',
        navItemActive: isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-50 text-emerald-700',
    };

    return (
        <>
            {/* Overlay for Mobile when open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`fixed md:static top-0 ${isRtl ? 'right-0' : 'left-0'} z-50 h-full flex flex-col flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden border-r shadow-2xl
                ${isOpen ? 'w-72 translate-x-0' : 'w-0 md:w-0 opacity-0 md:opacity-100 overflow-hidden md:border-none'}
                ${theme.bg} ${theme.border}
            `}
            >
                {/* Header with Close Button */}
                <div className={`p-5 flex items-center justify-between border-b ${theme.border}`}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shadow-sm ${theme.logoBg} overflow-hidden`}>
                            <img src="/images/babyfiqh-ai.png" alt="Babyfiqh AI" className="w-7 h-7 object-contain" />
                        </div>
                        <span className={`font-bold text-lg font-cairo tracking-wide ${theme.textPrimary}`}>
                            Babyfiqh AI
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-1.5 rounded-lg transition-colors ${theme.textSecondary} ${theme.hover}`}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation / Actions */}
                <div className="flex-grow py-6 px-5 flex flex-col gap-6 overflow-y-auto custom-scrollbar">

                    {/* Character Selector */}
                    <div className="flex flex-col gap-3">
                        <span className={`text-xs uppercase tracking-wider font-bold px-1 ${theme.sectionLabel}`}>
                            {t.chooseCharacter}
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onCharacterChange('limanour')}
                                className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all border
                                ${currentCharacterId === 'limanour'
                                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                                        : `bg-transparent ${theme.border} ${theme.textSecondary} hover:bg-emerald-500/10`
                                    }`}
                            >
                                <img
                                    src="/images/limanour.png"
                                    alt={translations[currentLang].characters.limanour.name}
                                    className="w-12 h-12 object-contain drop-shadow-md"
                                />
                                <span className="text-xs font-bold">{translations[currentLang].characters.limanour.name}</span>
                            </button>

                            <button
                                onClick={() => onCharacterChange('amanissa')}
                                className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all border
                                ${currentCharacterId === 'amanissa'
                                        ? 'bg-pink-500 border-pink-500 text-white shadow-lg'
                                        : `bg-transparent ${theme.border} ${theme.textSecondary} hover:bg-pink-500/10`
                                    }`}
                            >
                                <img
                                    src="/images/amanisa.png"
                                    alt={translations[currentLang].characters.amanissa.name}
                                    className="w-12 h-12 object-contain drop-shadow-md"
                                />
                                <span className="text-xs font-bold">{translations[currentLang].characters.amanissa.name}</span>
                            </button>
                        </div>
                    </div>

                    <div className={`w-full h-px my-1 ${theme.divider}`}></div>

                    {/* Library Button */}
                    <button
                        onClick={onOpenLibrary}
                        className={`flex items-center gap-3 p-3.5 rounded-xl transition-all w-full group font-medium bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-amber-500/30 transform hover:translate-y-[-2px]`}
                    >
                        <BookIcon className="w-5 h-5" />
                        <span>{t.library}</span>
                    </button>

                    {/* Furqan Button (New) */}
                    <button
                        onClick={onOpenFurqan}
                        className={`flex items-center gap-3 p-3.5 rounded-xl transition-all w-full group font-medium bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg hover:shadow-emerald-500/30 transform hover:translate-y-[-2px]`}
                    >
                        <QuranIcon className="w-5 h-5" />
                        <span>{t.furqan}</span>
                    </button>

                    <div className={`w-full h-px my-1 ${theme.divider}`}></div>

                    {/* Audio Mode Toggle */}
                    <div className="flex flex-col gap-3">
                        <span className={`text-xs uppercase tracking-wider font-bold px-1 ${theme.sectionLabel}`}>
                            {isRtl ? 'الوضع' : 'Mode'}
                        </span>
                        <div
                            className={`p-1.5 rounded-full flex relative cursor-pointer border shadow-inner transition-colors duration-300 ${theme.switchContainer}`}
                            onClick={onToggleAudioMode}
                        >
                            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-500 shadow-md z-0
                            ${isAudioMode
                                    ? `bg-gradient-to-br from-cyan-500 to-blue-600 ${isRtl ? 'right-[calc(50%+3px)]' : 'left-[calc(50%+3px)]'}`
                                    : `bg-gradient-to-br from-gray-400 to-slate-500 ${isRtl ? 'right-1.5' : 'left-1.5'}`
                                }
                        `}></div>

                            <div className={`flex-1 flex items-center justify-center gap-2 py-2 relative z-10 transition-colors duration-300 ${!isAudioMode ? theme.iconActive : theme.iconInactive}`} title={t.textMode}>
                                <MessageSquareIcon className="w-5 h-5" />
                            </div>
                            <div className={`flex-1 flex items-center justify-center gap-2 py-2 relative z-10 transition-colors duration-300 ${isAudioMode ? theme.iconActive : theme.iconInactive}`} title={t.audioMode}>
                                <SpeakerIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="flex flex-col gap-3">
                        <span className={`text-xs uppercase tracking-wider font-bold px-1 ${theme.sectionLabel}`}>
                            {isRtl ? 'المظهر' : 'Theme'}
                        </span>
                        <div
                            className={`p-1.5 rounded-full flex relative cursor-pointer border shadow-inner transition-colors duration-300 ${theme.switchContainer}`}
                            onClick={onToggleTheme}
                        >
                            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-500 shadow-md z-0
                            ${isDarkMode
                                    ? `bg-gradient-to-br from-[#312e81] to-[#4338ca] ${isRtl ? 'right-[calc(50%+3px)]' : 'left-[calc(50%+3px)]'}`
                                    : `bg-gradient-to-br from-amber-400 to-orange-400 ${isRtl ? 'right-1.5' : 'left-1.5'}`
                                }
                        `}></div>

                            <div className={`flex-1 flex items-center justify-center gap-2 py-2 relative z-10 transition-colors duration-300 ${!isDarkMode ? theme.iconActive : theme.iconInactive}`}>
                                <SunIcon className="w-5 h-5" />
                            </div>
                            <div className={`flex-1 flex items-center justify-center gap-2 py-2 relative z-10 transition-colors duration-300 ${isDarkMode ? theme.iconActive : theme.iconInactive}`}>
                                <MoonIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>


                    <div className={`w-full h-px my-2 ${theme.divider}`}></div>

                    <button
                        onClick={onOpenAbout}
                        className={`flex items-center gap-3 p-3.5 rounded-xl transition-all w-full group font-medium
                        ${theme.textPrimary} ${theme.hover}`}
                    >
                        <InfoIcon className={`w-5 h-5 ${theme.textSecondary}`} />
                        <span>{t.about}</span>
                    </button>

                    <div className="mt-auto pt-4 flex flex-col gap-4">
                        <button
                            onClick={onLogout}
                            className={`flex items-center gap-3 p-3.5 rounded-xl transition-all w-full group font-bold border 
                            ${isDarkMode
                                    ? 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                    : 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'}`}
                        >
                            <LogOutIcon className="w-5 h-5" />
                            <span>{t.logout}</span>
                        </button>

                        <div>
                            <div className={`mb-3 text-xs uppercase tracking-wider font-bold px-1 ${theme.sectionLabel}`}>
                                Language / اللغة
                            </div>
                            <div className="flex flex-col gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => onLangChange(lang.code)}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all w-full border
                                        ${currentLang === lang.code
                                                ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20'
                                                : `border-transparent ${theme.hover} ${theme.textPrimary}`
                                            }`}
                                        lang={lang.code}
                                    >
                                        <span className="text-xl drop-shadow-sm">{lang.flag}</span>
                                        <span className={`text-sm ${currentLang === lang.code ? 'font-bold' : 'font-medium'}`}>
                                            {lang.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-5 border-t ${theme.border} text-center bg-opacity-50`}>
                    <p className={`text-[10px] leading-tight ${theme.textSecondary}`}>
                        © {new Date().getFullYear()} Babyfiqh AI
                    </p>
                </div>
            </aside>
        </>
    );
};
