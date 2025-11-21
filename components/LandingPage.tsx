
import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { Language, translations } from '../utils/translations';

interface LandingPageProps {
    onSelectMode: (mode: 'parent' | 'child', subView?: 'login' | 'register' | 'forgot') => void;
    onClearData: () => void;
    currentLang: Language;
    onLangChange: (lang: Language) => void;
}

const ParentModeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8a3 3 0 1 0 0 6 3 3 0 1 0 0-6" />
        <path d="M16 16c0-2-2-3-4-3s-4 1-4 3" />
    </svg>
);

const ChildModeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 2a5 5 0 0 1 5 5" />
    </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

export const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const UserPlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
);
const LoginIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
);
const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21 2-2 2m-7.6 7.6a6.5 6.5 0 1 1-9-9 6.5 6.5 0 0 1 9 9Zm0 0L21 2" /><path d="m10 15 3 3 2-2" /></svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onSelectMode, onClearData, currentLang, onLangChange }) => {
    const [showParentOptions, setShowParentOptions] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const t = translations[currentLang].ui.landing;
    const dir = translations[currentLang].direction;

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'ar', label: 'العربية', flag: '🇸🇦' },
        { code: 'zgh', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
    ];

    return (
        <div className="fixed inset-0 w-full h-full bg-[#020617] overflow-x-hidden overflow-y-auto font-cairo custom-scrollbar" dir={dir}>

            {/* Professional Background Layer */}
            <div className="fixed inset-0 -z-20">
                {/* Deep Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#000000]"></div>

                {/* Modern Mesh Gradients */}
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-indigo-600/10 rounded-full blur-[100px] opacity-50 mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-emerald-600/10 rounded-full blur-[100px] opacity-50 mix-blend-screen animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-slate-800/20 rounded-full blur-[120px] opacity-30 mix-blend-overlay"></div>

                {/* Subtle Noise Texture for Matte Finish */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* Subtle Tech Grid Overlay */}
            <div className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Language Trigger Button (Top Left/Right based on dir) */}
            <div className={`fixed top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-50 animate-fade-in`}>
                <button
                    onClick={() => setIsLangMenuOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-white group"
                >
                    <div className="p-1 bg-white/10 rounded-full text-indigo-400 group-hover:text-indigo-300">
                        <GlobeIcon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm">
                        {languages.find(l => l.code === currentLang)?.label || 'Language'}
                    </span>
                </button>
            </div>

            {/* Main Content Container - Ensures centering and scrolling */}
            <div className="min-h-full w-full flex flex-col items-center justify-center p-6 md:p-12 pb-24 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up z-10 mt-8 md:mt-0">
                    <div className="relative w-24 h-24 mb-6 group cursor-default">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative w-full h-full bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-amber-500/20 flex items-center justify-center shadow-2xl ring-1 ring-white/5 overflow-hidden">
                            <img src="/images/babyfiqh-ai.png" alt="Babyfiqh AI" className="w-14 h-14 object-contain drop-shadow-lg" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4 tracking-tight font-cairo">
                        {t.mainTitle} <span className="text-amber-500 mx-2">|</span> BabyFiqh AI
                    </h1>

                    <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed font-medium border-b border-white/5 pb-8">
                        {t.subTitle}
                    </p>
                </div>

                {/* Cards Grid - Perfectly Balanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mb-16 z-10">

                    {/* Parent Card */}
                    <button
                        onClick={() => setShowParentOptions(true)}
                        className={`group relative flex flex-col h-full bg-[#1e293b]/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:bg-[#1e293b]/50 hover:border-indigo-500/30 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] hover:-translate-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'} overflow-hidden animate-fade-in-up`}
                        style={{ animationDelay: '0.1s' }}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="flex justify-between items-start mb-6 w-full relative z-10">
                            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-lg ring-1 ring-white/5">
                                <ParentModeIcon className="w-8 h-8" />
                            </div>
                            <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-bold tracking-wider uppercase h-fit">
                                {t.parentMode}
                            </span>
                        </div>

                        <div className={`flex-grow ${dir === 'rtl' ? 'text-right' : 'text-left'} relative z-10`}>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                                {t.parentMode}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 pl-2">
                                {t.parentDesc}
                            </p>
                        </div>

                        <div className="w-full pt-6 border-t border-white/5 mt-auto relative z-10">
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                                    <CheckIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span>{t.parentSupervision}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                                    <CheckIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span>{t.reports}</span>
                                </div>
                            </div>

                            <div className="flex items-center text-indigo-400 text-sm font-bold group-hover:text-indigo-300 group-hover:gap-3 transition-all duration-300">
                                <span>{t.enterParent}</span>
                                <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'mr-2 rotate-180 group-hover:mr-0' : 'ml-2 group-hover:ml-4'}`} />
                            </div>
                        </div>
                    </button>

                    {/* Child Card */}
                    <button
                        onClick={() => onSelectMode('child')}
                        className={`group relative flex flex-col h-full bg-[#1e293b]/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:bg-[#1e293b]/50 hover:border-emerald-500/30 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] hover:-translate-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'} overflow-hidden animate-fade-in-up`}
                        style={{ animationDelay: '0.2s' }}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="flex justify-between items-start mb-6 w-full relative z-10">
                            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg ring-1 ring-white/5">
                                <ChildModeIcon className="w-8 h-8" />
                            </div>
                            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] md:text-xs font-bold tracking-wider uppercase h-fit">
                                {t.childMode}
                            </span>
                        </div>

                        <div className={`flex-grow ${dir === 'rtl' ? 'text-right' : 'text-left'} relative z-10`}>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-200 transition-colors">
                                {t.childMode}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 pl-2">
                                {t.childDesc}
                            </p>
                        </div>

                        <div className="w-full pt-6 border-t border-white/5 mt-auto relative z-10">
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{t.avLearning}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{t.safeContent}</span>
                                </div>
                            </div>

                            <div className="flex items-center text-emerald-400 text-sm font-bold group-hover:text-emerald-300 group-hover:gap-3 transition-all duration-300">
                                <span>{t.startJourney}</span>
                                <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'mr-2 rotate-180 group-hover:mr-0' : 'ml-2 group-hover:ml-4'}`} />
                            </div>
                        </div>
                    </button>

                </div>

                {/* Footer Actions */}
                <div className="flex flex-col items-center gap-4 animate-fade-in-up z-10 opacity-80" style={{ animationDelay: '0.3s' }}>
                    <button
                        onClick={onClearData}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all duration-300 backdrop-blur-sm"
                    >
                        <TrashIcon className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors" />
                        <span className="text-xs text-slate-500 group-hover:text-red-400 transition-colors font-medium">
                            {t.resetData}
                        </span>
                    </button>

                    <p className="text-[10px] text-slate-600 mt-6 font-mono">
                        {translations[currentLang].ui.rights}
                    </p>
                </div>

                {/* Parent Options Modal */}
                {showParentOptions && (
                    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                        <div className="bg-[#1e293b] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-in relative text-center">
                            <button onClick={() => setShowParentOptions(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>

                            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg border border-indigo-500/30">
                                <ParentModeIcon className="w-8 h-8 text-indigo-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">{t.welcomeParent}</h2>
                            <p className="text-white/50 text-sm mb-8">{t.chooseAccess}</p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => onSelectMode('parent', 'register')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-indigo-600 hover:shadow-lg transition-all group ${dir === 'rtl' ? 'text-right' : 'text-left'} border border-white/5`}
                                >
                                    <div className="p-3 rounded-xl bg-white/10 text-white/80 group-hover:bg-white/20">
                                        <UserPlusIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="font-bold text-white">{t.createAccount}</span>
                                        <span className="text-xs text-white/40 group-hover:text-white/70">{t.newAccount}</span>
                                    </div>
                                    <ArrowIcon className={`w-5 h-5 text-white/30 group-hover:text-white ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                                </button>

                                <button
                                    onClick={() => onSelectMode('parent', 'login')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-emerald-600 hover:shadow-lg transition-all group ${dir === 'rtl' ? 'text-right' : 'text-left'} border border-white/5`}
                                >
                                    <div className="p-3 rounded-xl bg-white/10 text-white/80 group-hover:bg-white/20">
                                        <LoginIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="font-bold text-white">{t.login}</span>
                                        <span className="text-xs text-white/40 group-hover:text-white/70">{t.hasAccount}</span>
                                    </div>
                                    <ArrowIcon className={`w-5 h-5 text-white/30 group-hover:text-white ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                                </button>

                                <button
                                    onClick={() => onSelectMode('parent', 'forgot')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-transparent hover:bg-white/5 transition-all group ${dir === 'rtl' ? 'text-right' : 'text-left'} text-white/50 hover:text-white`}
                                >
                                    <KeyIcon className="w-5 h-5 ml-2" />
                                    <span className="font-medium text-sm">{t.forgotPass}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Professional Language Selection Modal */}
                {isLangMenuOpen && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                        onClick={() => setIsLangMenuOpen(false)}
                    >
                        <div
                            className="bg-[#1e293b] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsLangMenuOpen(false)}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-indigo-500/20 shadow-inner">
                                    <GlobeIcon className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">{t.selectLang}</h2>
                                <p className="text-white/50 text-sm mt-1">Select Language / Choisissez la langue</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            onLangChange(lang.code);
                                            setIsLangMenuOpen(false);
                                        }}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group
                                    ${currentLang === lang.code
                                                ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/20'
                                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className={`text-lg font-bold ${currentLang === lang.code ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                                {lang.label}
                                            </span>
                                        </div>
                                        {currentLang === lang.code && (
                                            <CheckIcon className="w-5 h-5 text-white" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }

        .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>

        </div>
    );
};
