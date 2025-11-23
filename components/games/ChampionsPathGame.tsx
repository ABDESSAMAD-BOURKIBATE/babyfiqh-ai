
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { championsPathData, ChampionMission } from '../../utils/gamesData';
import { ArrowIcon } from '../LandingPage';
import { CrownIcon } from '../icons/CrownIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

interface ChampionsPathGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

export const ChampionsPathGame: React.FC<ChampionsPathGameProps> = ({ onBack, currentLang, dir }) => {
    const [currentMission, setCurrentMission] = useState<ChampionMission | null>(null);
    const [completedMissions, setCompletedMissions] = useState<number[]>([]);
    const [xp, setXp] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    
    const t = translations[currentLang].ui.games.champion;

    // Load progress from local storage
    useEffect(() => {
        const savedData = localStorage.getItem('champion_game_progress');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setCompletedMissions(parsed.completedMissions || []);
            setXp(parsed.xp || 0);
        }
    }, []);

    const saveProgress = (newCompleted: number[], newXp: number) => {
        localStorage.setItem('champion_game_progress', JSON.stringify({
            completedMissions: newCompleted,
            xp: newXp
        }));
    };

    const getNewMission = () => {
        // Filter out missions completed TODAY (simplified: random for now, excluding last one if possible)
        // In a real app, we'd track completion dates.
        const available = championsPathData.filter(m => !completedMissions.includes(m.id));
        
        // If all completed, reset or just pick random
        const pool = available.length > 0 ? available : championsPathData;
        const randomMission = pool[Math.floor(Math.random() * pool.length)];
        
        setCurrentMission(randomMission);
        setShowCelebration(false);
    };

    const completeMission = () => {
        if (!currentMission) return;
        
        const newXp = xp + currentMission.xp;
        const newCompleted = [...completedMissions, currentMission.id];
        
        setXp(newXp);
        setCompletedMissions(newCompleted);
        saveProgress(newCompleted, newXp);
        setShowCelebration(true);
        
        // Vibrate
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    };

    // Rank Calculation
    const getRank = () => {
        if (xp < 50) return { title: 'Beginner', color: 'text-gray-400' };
        if (xp < 150) return { title: 'Scout', color: 'text-emerald-400' };
        if (xp < 300) return { title: 'Hero', color: 'text-blue-400' };
        if (xp < 500) return { title: 'Commander', color: 'text-amber-400' };
        return { title: 'Legend', color: 'text-purple-400' };
    };

    const rank = getRank();

    return (
        <div className="flex flex-col h-full relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}>
            </div>

            {/* Header */}
            <div className="p-6 flex items-center justify-between relative z-10">
                <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 bg-black/30 px-4 py-1 rounded-full border border-white/10">
                        <CrownIcon className={`w-4 h-4 ${rank.color}`} />
                        <span className={`text-sm font-bold uppercase tracking-wider ${rank.color}`}>{rank.title}</span>
                    </div>
                    <span className="text-white/60 text-xs mt-1 font-mono">{xp} {t.xp}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">
                
                {!currentMission ? (
                    <div className="text-center animate-fade-in">
                        <div className="w-32 h-32 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-pulse">
                            <CrownIcon className="w-16 h-16 text-amber-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white font-amiri mb-4">{t.title}</h2>
                        <p className="text-white/60 mb-8 max-w-xs mx-auto leading-relaxed">
                            {translations[currentLang].ui.games.championsPathDesc}
                        </p>
                        <button 
                            onClick={getNewMission}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-transform hover:scale-105 active:scale-95"
                        >
                            {t.mission}
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-md perspective-1000 animate-fade-in-up">
                        {/* Mission Card */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden group">
                            
                            {/* Shiny Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/30 rounded-full blur-3xl"></div>

                            {showCelebration ? (
                                <div className="animate-bounce mb-6">
                                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-white/20">
                                        <SparklesIcon className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300 uppercase tracking-wider mb-4 border border-amber-500/30">
                                        {t.mission}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white font-amiri leading-relaxed">
                                        {currentMission.text[currentLang]}
                                    </h3>
                                </div>
                            )}

                            {showCelebration ? (
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-400 mb-2">{t.complete}</h3>
                                    <p className="text-white/60 mb-6">+{currentMission.xp} {t.xp}</p>
                                    <button 
                                        onClick={getNewMission}
                                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-colors"
                                    >
                                        {translations[currentLang].ui.games.next}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 mt-8">
                                    <div className="flex justify-center items-center gap-2 text-amber-400/80 text-sm font-mono bg-black/20 py-2 rounded-lg mb-4">
                                        <span>Reward:</span>
                                        <span className="font-bold text-amber-400">{currentMission.xp} XP</span>
                                    </div>
                                    
                                    <button 
                                        onClick={completeMission}
                                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <SparklesIcon className="w-5 h-5" />
                                        {t.complete}
                                    </button>
                                    
                                    <button 
                                        onClick={() => setCurrentMission(null)}
                                        className="text-white/40 hover:text-white text-sm underline decoration-white/20 hover:decoration-white transition-all"
                                    >
                                        {translations[currentLang].ui.games.controls.clear}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Confetti Overlay */}
            {showCelebration && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-2 h-2 bg-amber-400 rounded-full animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-10px`,
                                backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'][Math.floor(Math.random() * 4)],
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti linear forwards;
                }
            `}</style>
        </div>
    );
};
