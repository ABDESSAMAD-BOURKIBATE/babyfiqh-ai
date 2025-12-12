import React, { useState } from 'react';
import { Language } from '../../utils/translations';
import { XIcon } from '../icons/XIcon';
import { ArabicPortal } from './ArabicPortal';

interface LanguageLearningModalProps {
    currentLang: Language;
    onClose: () => void;
}

type LanguagePortal = 'arabic' | 'english' | 'french' | 'spanish';

interface Portal {
    id: LanguagePortal;
    name: string;
    nativeName: string;
    icon: string;
    color: string;
    gradient: string;
}

const portals: Portal[] = [
    {
        id: 'arabic',
        name: 'Arabic Portal',
        nativeName: 'بوابة اللغة العربية',
        icon: '📖',
        color: 'from-emerald-500 to-teal-600',
        gradient: 'bg-emerald-600/10'
    },
    {
        id: 'english',
        name: 'English Portal',
        nativeName: 'English Language Portal',
        icon: '🇬🇧',
        color: 'from-blue-500 to-indigo-600',
        gradient: 'bg-blue-600/10'
    },
    {
        id: 'french',
        name: 'French Portal',
        nativeName: 'Portail de la Langue Française',
        icon: '🇫🇷',
        color: 'from-purple-500 to-pink-600',
        gradient: 'bg-purple-600/10'
    },
    {
        id: 'spanish',
        name: 'Spanish Portal',
        nativeName: 'Portal del Idioma Español',
        icon: '🇪🇸',
        color: 'from-orange-500 to-red-600',
        gradient: 'bg-orange-600/10'
    }
];

export const LanguageLearningModal: React.FC<LanguageLearningModalProps> = ({ currentLang, onClose }) => {
    const [selectedPortal, setSelectedPortal] = useState<LanguagePortal | null>(null);

    if (selectedPortal) {
        const portal = portals.find(p => p.id === selectedPortal);

        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-cairo">
                <div className="relative w-full max-w-6xl h-[90vh] bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedPortal(null)}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {portal?.nativeName}
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow flex flex-col p-6 md:p-8 relative overflow-hidden">

                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                            <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${portal?.gradient} rounded-full blur-[100px]`}></div>
                            <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] ${portal?.gradient} rounded-full blur-[100px]`}></div>
                        </div>

                        {selectedPortal === 'arabic' ? (
                            <ArabicPortal />
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center max-w-lg mx-auto animate-fade-in">
                                <div className="text-9xl mb-8 drop-shadow-2xl animate-float">
                                    {portal?.icon}
                                </div>

                                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                                    {portal?.nativeName}
                                </h2>
                                <h3 className="text-xl text-emerald-400 font-medium mb-6">
                                    قريباً
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    نحن نعمل على إعداد محتوى تعليمي متميز.
                                    <br />
                                    انتظرونا قريباً!
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-cairo">
            <div className="relative w-full max-w-6xl h-[90vh] bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                مكتبة تعلم اللغات
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">
                                اختر البوابة التي تريد الدخول إليها
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar relative">

                    {/* Background Effects */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/10 to-purple-600/10 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 to-orange-600/10 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="flex-grow flex flex-col items-center justify-center text-center max-w-lg mx-auto animate-fade-in">
                        <div className="text-9xl mb-8 drop-shadow-2xl animate-float">
                            🚧
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                            ميزة تعلم اللغات
                        </h2>
                        <h3 className="text-xl text-emerald-400 font-medium mb-6">
                            قريباً
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            نحن نعمل على إعداد محتوى تعليمي متميز لتعلم اللغات.
                            <br />
                            انتظرونا قريباً!
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
