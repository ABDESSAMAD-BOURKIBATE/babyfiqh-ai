import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface BookReaderProps {
    bookUrl: string;
    title: string;
    onClose: () => void;
    onDownload: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({ bookUrl, title, onClose, onDownload }) => {
    const [showSummary, setShowSummary] = useState(false);
    const [summaryLanguage, setSummaryLanguage] = useState<'ar' | 'en' | 'fr'>('ar');

    // Mock summary content
    const summaryContent = {
        ar: "هذا الكتاب هو حصن المسلم، يحتوي على أذكار الكتاب والسنة التي يحتاجها المسلم في يومه وليلته. يشمل أذكار الصباح والمساء، وأذكار الصلاة، وغيرها من الأدعية المهمة.",
        en: "This book is 'Hisn al-Muslim' (Fortress of the Muslim), containing supplications from the Quran and Sunnah for daily life. It includes morning and evening adhkars, prayer supplications, and other important duas.",
        fr: "Ce livre est 'Hisn al-Muslim' (La Citadelle du Musulman), contenant des invocations du Coran et de la Sunna pour la vie quotidienne. Il comprend les adhkars du matin et du soir, les invocations de la prière et d'autres douas importantes."
    };

    return (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex flex-col animate-fade-in">
            {/* Header */}
            <div className="h-16 border-b border-white/10 bg-[#0f172a] flex items-center justify-between px-6 shrink-0">
                <h2 className="text-xl font-bold text-white font-cairo">{title}</h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowSummary(!showSummary)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                    >
                        <SparklesIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">AI Summary</span>
                    </button>
                    <button
                        onClick={onDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="flex-grow flex overflow-hidden relative">
                {/* PDF Viewer */}
                <div className="flex-grow h-full bg-white">
                    <iframe
                        src={bookUrl}
                        className="w-full h-full border-0"
                        title="Book Reader"
                    />
                </div>

                {/* AI Summary Panel */}
                {showSummary && (
                    <div className="w-80 bg-[#1e293b] border-l border-white/10 p-6 flex flex-col gap-4 absolute right-0 top-0 bottom-0 shadow-2xl animate-slide-in-right z-10">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5 text-amber-400" />
                                AI Summary
                            </h3>
                            <button onClick={() => setShowSummary(false)} className="text-white/50 hover:text-white">
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex gap-2 bg-black/20 p-1 rounded-lg">
                            {(['ar', 'en', 'fr'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setSummaryLanguage(lang)}
                                    className={`flex-1 py-1 text-xs font-bold rounded-md transition-colors ${
                                        summaryLanguage === lang
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <div className="flex-grow overflow-y-auto text-white/80 text-sm leading-relaxed font-cairo mt-4">
                            {summaryContent[summaryLanguage]}
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};
