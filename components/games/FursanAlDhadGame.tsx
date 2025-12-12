
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { fursanLevels, GameLevel } from '../../utils/gamesData';
import { ArrowIcon } from '../LandingPage';

interface FursanAlDhadGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 ${filled ? 'text-red-500' : 'text-white/20'}`}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

export const FursanAlDhadGame: React.FC<FursanAlDhadGameProps> = ({ onBack, currentLang, dir }) => {
    const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameState, setGameState] = useState<'level_select' | 'playing' | 'level_complete' | 'game_over'>('level_select');
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [combo, setCombo] = useState(0);

    const t = translations[currentLang].ui.games;

    // Timer Logic
    useEffect(() => {
        let timer: any;
        if (gameState === 'playing' && timeLeft > 0 && selectedOption === null) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameState === 'playing') {
            handleTimeOut();
        }
        return () => clearInterval(timer);
    }, [timeLeft, gameState, selectedOption]);

    const handleTimeOut = () => {
        setLives(prev => prev - 1);
        if (lives > 1) {
            // Next question or restart level logic could go here
            // For now, let's mark wrong and move on automatically
            setIsCorrect(false);
            setTimeout(() => {
                handleNext();
            }, 1500);
        } else {
            setGameState('game_over');
        }
    };

    const startLevel = (index: number) => {
        setActiveLevelIndex(index);
        setCurrentQIndex(0);
        setLives(3);
        setScore(0);
        setCombo(0);
        setTimeLeft(30);
        setGameState('playing');
        setSelectedOption(null);
        setIsCorrect(null);
    };

    const handleOptionClick = (index: number) => {
        if (selectedOption !== null) return;
        if (activeLevelIndex === null) return;

        setSelectedOption(index);
        const currentLevel = fursanLevels[activeLevelIndex];
        const correct = index === currentLevel.questions[currentQIndex].correctIndex;
        setIsCorrect(correct);

        if (correct) {
            const timeBonus = Math.ceil(timeLeft / 5);
            const comboBonus = combo * 5;
            setScore(s => s + 10 + timeBonus + comboBonus);
            setCombo(c => c + 1);
        } else {
            setLives(prev => prev - 1);
            setCombo(0);
        }
    };

    const handleNext = () => {
        if (activeLevelIndex === null) return;
        const currentLevel = fursanLevels[activeLevelIndex];

        if (lives === 0) {
            setGameState('game_over');
            return;
        }

        if (currentQIndex < currentLevel.questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            setTimeLeft(30);
        } else {
            setGameState('level_complete');
        }
    };

    // --- Render States ---

    // 1. Level Selection
    if (gameState === 'level_select') {
        return (
            <div className="flex flex-col h-full p-6 animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <h2 className="text-3xl font-bold text-white font-amiri">{t.fursanAlDhad}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {fursanLevels.map((level, idx) => (
                        <button
                            key={level.id}
                            onClick={() => startLevel(idx)}
                            className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 hover:border-indigo-500/50 text-right transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                        >
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{level.title[currentLang]}</h3>
                                    <p className="text-white/40 text-sm">{level.questions.length} {t.question}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    <span className="text-lg font-bold">{idx + 1}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // 2. Game Over / Success
    if (gameState === 'game_over' || gameState === 'level_complete') {
        const isWin = gameState === 'level_complete';
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
                <div className={`text-8xl mb-6 ${isWin ? 'animate-bounce' : 'animate-pulse'}`}>
                    {isWin ? '🎉' : '💔'}
                </div>
                <h2 className={`text-4xl font-bold font-amiri mb-2 ${isWin ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isWin ? t.levelUp : t.gameOver}
                </h2>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 w-full max-w-sm mb-8">
                    <p className="text-white/60 text-sm mb-1">{t.score}</p>
                    <p className="text-4xl font-mono font-bold text-white">{score}</p>
                </div>

                <div className="flex gap-4 w-full max-w-sm">
                    <button
                        onClick={() => setGameState('level_select')}
                        className="flex-1 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors font-bold"
                    >
                        {translations[currentLang].ui.back}
                    </button>
                    <button
                        onClick={() => activeLevelIndex !== null && startLevel(activeLevelIndex)}
                        className={`flex-1 px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105
                            ${isWin ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                    >
                        {t.playAgain}
                    </button>
                </div>
            </div>
        );
    }

    // 3. Playing State
    if (activeLevelIndex === null) return null;
    const currentLevel = fursanLevels[activeLevelIndex];
    const q = currentLevel.questions[currentQIndex];

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto p-4 relative">
            {/* HUD */}
            <div className="flex justify-between items-start mb-6 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xl">
                        <span>{score}</span>
                        <span className="text-[10px] text-amber-400/50 uppercase">PTS</span>
                    </div>
                    {combo > 1 && (
                        <span className="text-xs font-bold text-purple-400 animate-pulse">
                            {combo}x Combo!
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        <ClockIcon className="w-4 h-4" />
                        {timeLeft}s
                    </div>
                </div>

                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <HeartIcon key={i} filled={i < lives} />
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentQIndex) / currentLevel.questions.length) * 100}%` }}
                ></div>
            </div>

            {/* Question Area */}
            <div className="flex-grow flex flex-col justify-center animate-fade-in">
                <h2 className="text-2xl md:text-4xl font-bold text-white font-amiri text-center leading-relaxed drop-shadow-lg mb-12">
                    {q.question[currentLang]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((opt, idx) => {
                        let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"; // Default

                        if (selectedOption !== null) {
                            if (idx === q.correctIndex) {
                                btnClass = "bg-emerald-600 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-2 ring-emerald-400 scale-[1.02]";
                            } else if (idx === selectedOption) {
                                btnClass = "bg-red-600 border-red-500 opacity-80";
                            } else {
                                btnClass = "bg-white/5 border-white/5 opacity-30 cursor-not-allowed";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(idx)}
                                disabled={selectedOption !== null}
                                className={`relative p-6 rounded-2xl border-2 text-lg font-bold text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center text-center min-h-[80px] ${btnClass}`}
                            >
                                {opt[currentLang]}
                                {selectedOption !== null && idx === q.correctIndex && (
                                    <div className="absolute right-4 text-emerald-200">✓</div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer / Next Button Area */}
            <div className="h-24 flex items-center justify-center mt-4">
                {selectedOption !== null && (
                    <div className="animate-fade-in-up w-full max-w-md">
                        {isCorrect ? (
                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-lg"
                            >
                                {currentQIndex < currentLevel.questions.length - 1 ? t.next : t.finish}
                            </button>
                        ) : (
                            <div className="text-center">
                                {lives > 0 ? (
                                    <p className="text-red-400 font-bold mb-2 animate-bounce">{t.wrong}</p>
                                ) : (
                                    <button
                                        onClick={() => setGameState('game_over')}
                                        className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-colors shadow-lg"
                                    >
                                        {t.gameOver}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
