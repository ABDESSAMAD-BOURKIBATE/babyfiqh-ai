
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { ArrowIcon } from '../LandingPage';
import { SparklesIcon } from '../icons/SparklesIcon';
import { WORLD_SCENARIOS, Scenario } from '../../utils/worldGameData';

interface WorldInYourHandsGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

// --- Dynamic City Visual Component ---
const DigitalCity: React.FC<{ health: number }> = ({ health }) => {
    // Health affects colors and opacity
    // 0-30: Ruined (Dark Gray/Red)
    // 31-60: Developing (Blue/Gray)
    // 61-100: Thriving (Green/Cyan/Gold)

    const getSkyColor = () => {
        if (health < 40) return '#2d1b1e'; // Dark Red
        if (health < 70) return '#1e293b'; // Slate
        return '#0f172a'; // Deep Blue (Clean)
    };

    const getBuildingColor = (base: string) => {
        if (health < 40) return '#4a4a4a'; // Ruined gray
        return base;
    };

    const glowIntensity = Math.max(0, (health - 40) / 60);
    const pollutionOpacity = Math.max(0, (50 - health) / 50);

    return (
        <div className="w-full h-full relative overflow-hidden rounded-3xl transition-colors duration-1000 ease-in-out" style={{ backgroundColor: getSkyColor() }}>
            
            {/* Stars / Pollution */}
            <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: pollutionOpacity }}>
                {/* Smog Layers */}
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
            </div>
            
            <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: health > 50 ? 1 : 0 }}>
                {/* Stars */}
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full animate-pulse" 
                        style={{ 
                            top: `${Math.random() * 50}%`, 
                            left: `${Math.random() * 100}%`,
                            width: Math.random() * 2 + 1, 
                            height: Math.random() * 2 + 1 
                        }}>
                    </div>
                ))}
            </div>

            {/* Sun / Moon */}
            <div className="absolute top-10 right-10 transition-all duration-1000" 
                style={{ 
                    transform: `translateY(${health < 40 ? '50px' : '0'})`,
                    opacity: health < 30 ? 0.2 : 1
                }}>
                <div className={`w-20 h-20 rounded-full blur-2xl absolute ${health > 60 ? 'bg-cyan-400' : 'bg-red-500'}`} style={{ opacity: 0.4 }}></div>
                <div className={`w-16 h-16 rounded-full ${health > 60 ? 'bg-gradient-to-br from-cyan-300 to-blue-500' : 'bg-gradient-to-br from-red-900 to-gray-800'}`}></div>
            </div>

            {/* The City Skyline (SVG) */}
            <svg viewBox="0 0 400 200" className="absolute bottom-0 w-full h-auto transition-all duration-1000" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="buildGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={health > 60 ? "#3b82f6" : "#475569"} />
                        <stop offset="100%" stopColor={health > 60 ? "#1e40af" : "#1e293b"} />
                    </linearGradient>
                    <linearGradient id="buildGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={health > 60 ? "#10b981" : "#64748b"} />
                        <stop offset="100%" stopColor={health > 60 ? "#047857" : "#334155"} />
                    </linearGradient>
                </defs>

                {/* Background Buildings */}
                <g opacity={0.6}>
                    <rect x="20" y="80" width="40" height="120" fill={getBuildingColor("#334155")} />
                    <rect x="80" y="60" width="50" height="140" fill={getBuildingColor("#475569")} />
                    <rect x="300" y="70" width="60" height="130" fill={getBuildingColor("#334155")} />
                </g>

                {/* Foreground Buildings */}
                <rect x="50" y="100" width="60" height="100" fill="url(#buildGrad1)" className="transition-all duration-1000" />
                {health > 30 && <rect x="140" y="40" width="40" height="160" fill="url(#buildGrad2)" className="transition-all duration-1000" />}
                {health > 50 && <rect x="200" y="80" width="70" height="120" fill="url(#buildGrad1)" className="transition-all duration-1000" />}
                <rect x="280" y="110" width="50" height="90" fill="url(#buildGrad2)" className="transition-all duration-1000" />

                {/* Windows (Lights) */}
                {health > 20 && (
                    <g fill={health > 60 ? "#fbbf24" : "#94a3b8"} opacity={health > 60 ? 0.8 : 0.3}>
                        <rect x="60" y="110" width="5" height="5" />
                        <rect x="70" y="110" width="5" height="5" />
                        <rect x="60" y="120" width="5" height="5" />
                        <rect x="150" y="50" width="20" height="2" />
                        <rect x="150" y="60" width="20" height="2" />
                    </g>
                )}

                {/* Nature / Trees (Appear with health) */}
                {health > 70 && (
                    <g fill="#22c55e">
                        <circle cx="30" cy="190" r="10" />
                        <circle cx="130" cy="195" r="8" />
                        <circle cx="350" cy="190" r="12" />
                    </g>
                )}
            </svg>

            {/* Data Streams (Digital Effect) */}
            {health > 50 && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-1/4 w-px h-full bg-gradient-to-t from-cyan-500 to-transparent opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/3 w-px h-full bg-gradient-to-t from-green-500 to-transparent opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
            )}
        </div>
    );
};

export const WorldInYourHandsGame: React.FC<WorldInYourHandsGameProps> = ({ onBack, currentLang, dir }) => {
    const [worldHealth, setWorldHealth] = useState(50); // Start middle
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [gameSession, setGameSession] = useState<Scenario[]>([]);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'win' | 'lose'>('intro');
    const [lastFeedback, setLastFeedback] = useState<{ text: string, type: 'value' | 'harm' } | null>(null);
    
    const t = translations[currentLang].ui.games;

    const startGame = () => {
        // Shuffle and select 10 scenarios for a quick session, or use all for endless
        // Let's use all but shuffled
        const shuffled = [...WORLD_SCENARIOS].sort(() => Math.random() - 0.5);
        setGameSession(shuffled);
        setWorldHealth(50);
        setCurrentScenarioIndex(0);
        setGameState('playing');
    };

    const handleChoice = (impact: number, feedback: string, type: 'value' | 'harm') => {
        const newHealth = Math.min(100, Math.max(0, worldHealth + impact));
        setWorldHealth(newHealth);
        setLastFeedback({ text: feedback, type });
        setGameState('feedback');
        
        // Vibrate
        if (navigator.vibrate) {
            if (type === 'value') navigator.vibrate(50);
            else navigator.vibrate([100, 50, 100]);
        }
    };

    const nextScenario = () => {
        // Check Win/Loss immediately after feedback
        if (worldHealth >= 100) {
            setGameState('win');
            return;
        }
        if (worldHealth <= 0) {
            setGameState('lose');
            return;
        }

        if (currentScenarioIndex < gameSession.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            // Finished all questions without 100 or 0
            setGameState('win'); // Technically a win for surviving
        }
    };

    // Intro Screen
    if (gameState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-b from-slate-900 to-slate-800 animate-fade-in">
                <button onClick={onBack} className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                    <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="w-32 h-32 mb-8 relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping-slow"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-white/10 shadow-2xl">
                        <span className="text-5xl">🌍</span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white font-amiri mb-4">
                    {currentLang === 'ar' ? 'العالم بين يديك' : 'The World in Your Hands'}
                </h2>
                <p className="text-white/60 mb-8 max-w-md leading-relaxed text-sm md:text-base">
                    {currentLang === 'ar' 
                        ? 'أنت قائد حضاري. مدينتك تحتاج إليك. خياراتك الصحيحة تبني المدينة وتزيدها نوراً، والأخطاء تسبب الظلام. هل يمكنك الوصول إلى 100%؟'
                        : 'You are a leader. Your city needs you. Ethical choices build the city, mistakes bring darkness. Can you reach 100% health?'}
                </p>

                <button 
                    onClick={startGame}
                    className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105"
                >
                    {t.startGame}
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full relative bg-[#0f172a]">
            {/* Top HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button onClick={onBack} className="p-2 rounded-full bg-black/30 backdrop-blur text-white hover:bg-white/10">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex flex-col items-center min-w-[120px]">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider">World Health</span>
                        <div className="w-full h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-1000 ${worldHealth > 60 ? 'bg-emerald-500' : worldHealth > 30 ? 'bg-blue-500' : 'bg-red-500'}`}
                                style={{ width: `${worldHealth}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-white mt-1">{worldHealth}%</span>
                    </div>
                    <span className="text-[10px] text-white/30 bg-black/20 px-2 py-1 rounded-md">
                        Scenario {currentScenarioIndex + 1}/{gameSession.length}
                    </span>
                </div>
            </div>

            {/* World Visualization Area */}
            <div className="h-[55%] w-full relative transition-all duration-1000">
                <DigitalCity health={worldHealth} />
                
                {/* Overlay Effects */}
                {gameState === 'feedback' && lastFeedback?.type === 'value' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-full bg-emerald-500/20 animate-pulse"></div>
                        <SparklesIcon className="w-32 h-32 text-emerald-300 absolute animate-bounce" />
                    </div>
                )}
                {gameState === 'feedback' && lastFeedback?.type === 'harm' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-full bg-red-500/20 animate-pulse"></div>
                    </div>
                )}
            </div>

            {/* Interaction Area */}
            <div className="h-[45%] bg-[#1e293b] rounded-t-[2.5rem] shadow-2xl relative z-10 p-6 md:p-10 -mt-6 border-t border-white/10 flex flex-col justify-center items-center text-center">
                
                {gameState === 'playing' && gameSession[currentScenarioIndex] && (
                    <div className="animate-fade-in-up w-full max-w-2xl">
                        <h3 className="text-xl md:text-2xl font-bold text-white font-amiri mb-8 leading-relaxed">
                            {gameSession[currentScenarioIndex].text[currentLang]}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gameSession[currentScenarioIndex].choices.map((choice, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(choice.impact, choice.feedback[currentLang], choice.type)}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-600 hover:border-indigo-500 text-white font-bold transition-all duration-300 shadow-lg active:scale-95 min-h-[80px] flex items-center justify-center"
                                >
                                    {choice.text[currentLang]}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'feedback' && lastFeedback && (
                    <div className="animate-fade-in w-full max-w-xl">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${lastFeedback.type === 'value' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {lastFeedback.type === 'value' ? '✓' : '✕'}
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${lastFeedback.type === 'value' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {lastFeedback.type === 'value' ? t.correct : t.wrong}
                        </h3>
                        <p className="text-white/80 text-lg mb-8 leading-relaxed font-amiri">
                            {lastFeedback.text}
                        </p>
                        <button 
                            onClick={nextScenario}
                            className="px-10 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-colors"
                        >
                            {t.next}
                        </button>
                    </div>
                )}

                {(gameState === 'win' || gameState === 'lose') && (
                    <div className="animate-fade-in text-center">
                        <div className="text-6xl mb-4">{gameState === 'win' ? '🌟' : '🌩️'}</div>
                        <h2 className={`text-3xl font-bold font-amiri mb-4 ${gameState === 'win' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {gameState === 'win' 
                                ? (currentLang === 'ar' ? 'مجتمع مثالي!' : 'Utopia Achieved!') 
                                : (currentLang === 'ar' ? 'انهيار المدينة...' : 'City Collapsed...')}
                        </h2>
                        <p className="text-white/60 mb-8">
                            {currentLang === 'ar' 
                                ? `مستوى جودة الحياة النهائي: ${worldHealth}%` 
                                : `Final City Quality: ${worldHealth}%`}
                        </p>
                        <button 
                            onClick={startGame}
                            className={`px-10 py-3 rounded-full font-bold shadow-lg transition-colors text-white
                                ${gameState === 'win' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
                        >
                            {t.playAgain}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
