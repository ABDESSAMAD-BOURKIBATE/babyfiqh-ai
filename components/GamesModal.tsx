
import React, { useState } from 'react';
import { Gamepad2, Star } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { GameIcon } from './icons/GameIcon';

import { MemoryGame } from './games/MemoryGame';
import { MosqueBuilderGame } from './games/MosqueBuilderGame';
import { QuranMemorizationGame } from './games/QuranMemorizationGame';
import { HadithGame } from './games/HadithGame';
import { ChampionsPathGame } from './games/ChampionsPathGame';
import { WorldInYourHandsGame } from './games/WorldInYourHandsGame';

import { NeuroFiqhGame } from './games/NeuroFiqhGame';
import { StrategicMindGame } from './games/StrategicMindGame';
import { AdvancedQuizGame } from './games/AdvancedQuizGame';
import { BrainIcon } from './icons/EmotionIcons';
import { MosqueIcon } from './icons/MosqueIcon';
import { QuranIcon } from './icons/QuranIcon';
import { CrownIcon } from './icons/CrownIcon';
import { GlobeHandIcon } from './icons/GlobeHandIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { GridIcon } from './icons/GridIcon';
import { logChildActivity } from '../utils/userData';

interface GamesModalProps {
    onClose: () => void;
    currentLang: Language;
}

const ScrollIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a5 5 0 0 1 5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M15 9h-10" />
        <path d="M15 14h-10" />
    </svg>
);

export const GamesModal: React.FC<GamesModalProps> = ({ onClose, currentLang }) => {
    const [activeGame, setActiveGame] = useState<'menu' | 'fursan' | 'memory' | 'mosque' | 'quran' | 'hadith' | 'champion' | 'world' | 'guardians' | 'neuro' | 'strategy' | 'advancedquiz'>('menu');
    const t = translations[currentLang].ui.games;
    const dir = translations[currentLang].direction;

    const handleGameStart = (gameId: string, titleAr: string, titleEn: string) => {
        const childId = localStorage.getItem('currentChildId');
        if (childId) {
            logChildActivity(childId, {
                type: 'game',
                title: currentLang === 'ar' ? titleAr : titleEn,
                details: `Started game: ${titleEn}`,
                topic: 'Interactive Learning'
            });
        }
        setActiveGame(gameId as any);
    };

    // Render Content Switcher
    const renderContent = () => {
        switch (activeGame) {

            case 'memory':
                return <MemoryGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'mosque':
                return <MosqueBuilderGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'quran':
                return <QuranMemorizationGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'hadith':
                return <HadithGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'champion':
                return <ChampionsPathGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'world':
                return <WorldInYourHandsGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;

            case 'neuro':
                return <NeuroFiqhGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'strategy':
                return <StrategicMindGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
            case 'advancedquiz':
                return <AdvancedQuizGame onClose={() => setActiveGame('menu')} currentLang={currentLang} />;
            case 'menu':
            default:
                return renderMenu();
        }
    };

    const renderMenu = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 animate-fade-in">

            {/* FEATURED: Advanced Quiz Game - 15 Levels - ENHANCED PREMIUM DESIGN */}
            <button
                onClick={() => {
                    handleGameStart('advancedquiz', 'فرسان الضاد - 15 مستوى', 'Arabic Knights - 15 Levels');
                    setActiveGame('advancedquiz');
                }}
                className="group relative bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 border-2 border-purple-500/40 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_60px_rgba(168,85,247,0.2),0_0_30px_rgba(99,102,241,0.15)] hover:shadow-[0_0_80px_rgba(168,85,247,0.4),0_0_40px_rgba(99,102,241,0.3)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden col-span-1 md:col-span-2 lg:col-span-3"
            >
                {/* Animated Background Patterns */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-[100%] group-hover:animate-shine"></div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-purple-400/40 rounded-tl-lg"></div>
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-indigo-400/40 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-indigo-400/40 rounded-bl-lg"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-purple-400/40 rounded-br-lg"></div>

                {/* Featured Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] animate-pulse flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    FEATURED
                </div>

                {/* Icon Container with Enhanced Glow */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/20 blur-2xl rounded-full animate-pulse-slow"></div>
                    <div className="relative w-28 h-28 bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-purple-600/20 rounded-full flex items-center justify-center border-2 border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <Gamepad2 className="w-14 h-14 text-purple-300" />
                    </div>
                </div>

                {/* Title with Gradient Animation */}
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 font-amiri mb-3 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-purple-200 transition-all duration-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    {t.arabicKnights15Levels}
                </h3>

                {/* Enhanced Description */}
                <p className="text-white/80 text-base md:text-lg mb-6 max-w-3xl leading-relaxed font-medium">
                    {currentLang === 'ar'
                        ? '🏆 لعبة تعليمية متقدمة مع 15 مستوى متدرج الصعوبة | أكثر من 1000 سؤال | أسئلة عشوائية | نظام نجوم ومكافآت'
                        : '🏆 Advanced educational game with 15 progressive levels | 1000+ questions | Random questions | Stars and rewards system'
                    }
                </p>

                {/* Statistics Grid - Enhanced Design */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl mb-6">
                    {/* Stat 1: Levels */}
                    <div className="relative group/stat">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/10 blur-sm rounded-2xl"></div>
                        <div className="relative bg-purple-500/10 border border-purple-400/30 rounded-2xl p-4 backdrop-blur-sm hover:bg-purple-500/20 transition-all duration-300 hover:scale-105">
                            <div className="text-3xl md:text-4xl font-bold text-purple-300 mb-1">15</div>
                            <div className="text-xs md:text-sm text-purple-200/70 font-medium">{t.levels}</div>
                        </div>
                    </div>

                    {/* Stat 2: Questions */}
                    <div className="relative group/stat">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 blur-sm rounded-2xl"></div>
                        <div className="relative bg-indigo-500/10 border border-indigo-400/30 rounded-2xl p-4 backdrop-blur-sm hover:bg-indigo-500/20 transition-all duration-300 hover:scale-105">
                            <div className="text-3xl md:text-4xl font-bold text-indigo-300 mb-1">1000+</div>
                            <div className="text-xs md:text-sm text-indigo-200/70 font-medium">{t.questions}</div>
                        </div>
                    </div>

                    {/* Stat 3: Random */}
                    <div className="relative group/stat">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-pink-600/10 blur-sm rounded-2xl"></div>
                        <div className="relative bg-pink-500/10 border border-pink-400/30 rounded-2xl p-4 backdrop-blur-sm hover:bg-pink-500/20 transition-all duration-300 hover:scale-105">
                            <div className="text-2xl md:text-3xl font-bold text-pink-300 mb-1">🎲</div>
                            <div className="text-xs md:text-sm text-pink-200/70 font-medium">{t.randomQuestions}</div>
                        </div>
                    </div>

                    {/* Stat 4: Stars */}
                    <div className="relative group/stat">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-600/10 blur-sm rounded-2xl"></div>
                        <div className="relative bg-yellow-500/10 border border-yellow-400/30 rounded-2xl p-4 backdrop-blur-sm hover:bg-yellow-500/20 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Star className="w-6 h-6 md:w-7 md:h-7 fill-yellow-400 text-yellow-400" />
                                <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="text-xs md:text-sm text-yellow-200/70 font-medium">{t.starsSystem}</div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="relative group/btn">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity rounded-full"></div>
                    <div className="relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 rounded-full text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 flex items-center gap-3 group-hover/btn:scale-105">
                        <Gamepad2 className="w-6 h-6" />
                        <span>{t.startGame}</span>
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </button>




            {/* Game Card: World In Your Hands */}
            <button
                onClick={() => handleGameStart('world', 'العالم بين يديك', 'World In Your Hands')}
                className="group relative bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-500/30 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >

                <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform duration-500 text-cyan-300">
                    <GlobeHandIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-cyan-300 transition-colors">{t.worldGame}</h3>
                <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.worldGameDesc}</p>

                <div className="mt-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                    {t.startGame}
                </div>
            </button>



            {/* Game Card 2: Memory Game */}
            <button
                onClick={() => handleGameStart('memory', 'لعبة الذاكرة', 'Memory Game')}
                className="group relative bg-gradient-to-br from-emerald-900 to-teal-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >

                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500 text-emerald-300">
                    <BrainIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-emerald-300 transition-colors">{t.memoryGame}</h3>
                <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.memoryDesc}</p>

                <div className="mt-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                    {t.startGame}
                </div>
            </button>

            {/* Game Card 3: Mosque Builder */}
            <button
                onClick={() => handleGameStart('mosque', 'باني المساجد', 'Mosque Builder')}
                className="group relative bg-gradient-to-br from-amber-900 to-orange-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >

                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform duration-500 text-amber-300">
                    <MosqueIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-amber-300 transition-colors">{t.mosqueBuilder}</h3>
                <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.mosqueBuilderDesc}</p>

                <div className="mt-auto px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                    {t.startGame}
                </div>
            </button>

            {/* Game Card 4: Hafiz Al Quran */}
            <button
                onClick={() => handleGameStart('quran', 'حافظ القرآن', 'Hafiz Al Quran')}
                className="group relative bg-gradient-to-br from-teal-900 to-cyan-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(45,212,191,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >

                <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.3)] group-hover:scale-110 transition-transform duration-500 text-teal-300">
                    <QuranIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-teal-300 transition-colors">{t.quranMemorization}</h3>
                <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.quranMemorizationDesc}</p>

                <div className="mt-auto px-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                    {t.startGame}
                </div>
            </button>

            {/* Game Card 5: Hadith Treasures */}
            <button
                onClick={() => handleGameStart('hadith', 'كنوز الحديث', 'Hadith Treasures')}
                className="group relative bg-gradient-to-br from-amber-800 to-yellow-800 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >

                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:scale-110 transition-transform duration-500 text-yellow-400">
                    <ScrollIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-yellow-300 transition-colors">{t.hadithGame}</h3>
                <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.hadithGameDesc}</p>

                <div className="mt-auto px-6 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                    {t.startGame}
                </div>
            </button>

            {/* Game Card 6: Champion's Path */}
            <button
                onClick={() => handleGameStart('champion', 'طريق البطل', 'Champions Path')}
                className="group relative bg-gradient-to-br from-orange-900 to-red-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >

                <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform duration-500 text-orange-400">
                    <CrownIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-orange-300 transition-colors">{t.championsPath}</h3>
                <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.championsPathDesc}</p>

                <div className="mt-auto px-6 py-2 bg-orange-600 hover:bg-orange-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                    {t.startGame}
                </div>
            </button>
        </div>
    );

    return (
        <div
            className="fixed inset-0 z-[60] bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in font-cairo"
            onClick={onClose}
            dir={dir}
        >
            <div
                className="bg-[#0a0a0a] border border-indigo-500/30 rounded-[2.5rem] w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#1e1b4b] to-[#0f172a] shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                            <GameIcon className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 tracking-wide font-amiri">
                                {t.gamesLibrary}
                            </h2>
                            <p className="text-xs text-indigo-300/60 font-medium mt-1 tracking-widest uppercase">Premium Islamic Education</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#020617] opacity-90"></div>

                    <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            @keyframes shine { 100% { left: 125%; } }
            @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .group-hover\\:animate-shine:hover { animation: shine 0.75s; }
            .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        `}</style>
        </div>
    );
};
