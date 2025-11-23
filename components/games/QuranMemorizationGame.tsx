
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { quranGameData, QuranLevel } from '../../utils/gamesData';
import { ArrowIcon } from '../LandingPage';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { PlayIcon } from '../icons/PlayIcon';
import { QuranIcon } from '../icons/QuranIcon';

interface QuranMemorizationGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

export const QuranMemorizationGame: React.FC<QuranMemorizationGameProps> = ({ onBack, currentLang, dir }) => {
    const [currentLevelIndex, setCurrentLevelIndex] = useState<number | null>(null);
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'won' | 'lost'>('menu');
    
    // Arrange Mode State
    const [shuffledVerses, setShuffledVerses] = useState<{id: number, text: string}[]>([]);
    const [orderedVerses, setOrderedVerses] = useState<string[]>([]);
    
    // Complete Mode State
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const t = translations[currentLang].ui.games;

    const startLevel = (index: number) => {
        setCurrentLevelIndex(index);
        setLives(3);
        setGameState('playing');
        setOrderedVerses([]);
        setSelectedOption(null);
        setIsCorrect(null);

        const level = quranGameData[index];
        if (level.type === 'arrange') {
            const verses = level.content.verses.map((v, i) => ({ id: i, text: v }));
            // Shuffle
            setShuffledVerses(verses.sort(() => Math.random() - 0.5));
        }
    };

    const handleVerseClick = (verseText: string) => {
        if (currentLevelIndex === null) return;
        const level = quranGameData[currentLevelIndex];
        
        // Check if correct order
        const expectedVerse = level.content.verses[orderedVerses.length];
        
        if (verseText === expectedVerse) {
            const newOrdered = [...orderedVerses, verseText];
            setOrderedVerses(newOrdered);
            setShuffledVerses(prev => prev.filter(v => v.text !== verseText));
            setScore(s => s + 10);

            if (newOrdered.length === level.content.verses.length) {
                setTimeout(() => setGameState('won'), 500);
            }
        } else {
            handleMistake();
        }
    };

    const handleOptionClick = (option: string) => {
        if (currentLevelIndex === null || selectedOption !== null) return;
        
        const level = quranGameData[currentLevelIndex];
        setSelectedOption(option);
        
        if (option === level.content.missingWord) {
            setIsCorrect(true);
            setScore(s => s + 20);
            setTimeout(() => setGameState('won'), 1500);
        } else {
            setIsCorrect(false);
            handleMistake();
            setTimeout(() => {
                setSelectedOption(null);
                setIsCorrect(null);
            }, 1000);
        }
    };

    const handleMistake = () => {
        setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
                setTimeout(() => setGameState('lost'), 500);
            }
            return newLives;
        });
        // Vibrate if supported
        if (navigator.vibrate) navigator.vibrate(200);
    };

    const renderHearts = () => (
        <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-600'}`} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ))}
        </div>
    );

    if (gameState === 'menu') {
        return (
            <div className="flex flex-col h-full p-6 animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <h2 className="text-3xl font-bold text-white font-amiri">{t.quranMemorization}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {quranGameData.map((level, idx) => (
                        <button
                            key={level.id}
                            onClick={() => startLevel(idx)}
                            className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-white/10 hover:border-emerald-500/50 text-right transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                        >
                            <div className="relative z-10 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors font-amiri">{level.title[currentLang]}</h3>
                                        <p className="text-white/40 text-xs uppercase tracking-wider">
                                            {level.type === 'arrange' ? t.quran.arrange : t.quran.complete}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-emerald-500/20 group-hover:text-emerald-500/60 transition-colors">
                                    <BookOpenIcon className="w-8 h-8" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (gameState === 'won' || gameState === 'lost') {
        const isWin = gameState === 'won';
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    {isWin ? <span className="text-6xl">🌟</span> : <span className="text-6xl">💔</span>}
                </div>
                <h2 className="text-3xl font-bold text-white font-amiri mb-2">
                    {isWin ? t.greatJob : t.gameOver}
                </h2>
                <p className="text-white/60 mb-8 font-amiri text-lg">
                    {isWin ? t.quran.surahComplete : t.wrong}
                </p>
                
                <div className="flex gap-4 w-full max-w-xs">
                    <button 
                        onClick={() => setGameState('menu')}
                        className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
                    >
                        {translations[currentLang].ui.back}
                    </button>
                    <button 
                        onClick={() => currentLevelIndex !== null && startLevel(currentLevelIndex)}
                        className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition-colors"
                    >
                        {t.playAgain}
                    </button>
                </div>
            </div>
        );
    }

    const currentLevel = quranGameData[currentLevelIndex!];

    return (
        <div className="flex flex-col h-full relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            
            {/* Header */}
            <div className="p-6 flex justify-between items-center relative z-10 bg-gradient-to-b from-black/40 to-transparent">
                <div className="flex items-center gap-3">
                    <button onClick={() => setGameState('menu')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="text-white">
                        <h3 className="text-lg font-bold font-amiri">{currentLevel.title[currentLang]}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                            <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/20">
                                {currentLevel.type === 'arrange' ? t.quran.arrange : t.quran.complete}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    {renderHearts()}
                    <span className="text-amber-400 font-mono font-bold text-lg">{score}</span>
                </div>
            </div>

            {/* Game Content */}
            <div className="flex-grow flex flex-col justify-center p-4 md:p-8 relative z-10 max-w-3xl mx-auto w-full">
                
                {currentLevel.type === 'arrange' && (
                    <div className="flex flex-col gap-6 w-full">
                        {/* Drop Zone (Ordered Verses) */}
                        <div className="bg-black/20 border-2 border-dashed border-white/20 rounded-2xl p-6 min-h-[200px] flex flex-col gap-3 items-center justify-center transition-colors duration-300">
                            {orderedVerses.length === 0 && (
                                <p className="text-white/30 text-sm">{t.quran.arrange}</p>
                            )}
                            {orderedVerses.map((verse, idx) => (
                                <div key={idx} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-amiri text-xl md:text-2xl shadow-lg w-full text-center animate-fade-in">
                                    {verse}
                                    <span className="ml-2 text-emerald-200 text-sm">({idx + 1})</span>
                                </div>
                            ))}
                        </div>

                        {/* Source Zone (Scrambled) */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {shuffledVerses.map((verse) => (
                                <button
                                    key={verse.id}
                                    onClick={() => handleVerseClick(verse.text)}
                                    className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-3 rounded-xl font-amiri text-lg md:text-xl transition-all active:scale-95 hover:shadow-lg hover:border-emerald-500/30"
                                >
                                    {verse.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {currentLevel.type === 'complete' && (
                    <div className="flex flex-col items-center w-full gap-8">
                        {/* Verse Display */}
                        <div className="bg-[#fffbf2] text-[#3d2b1f] p-8 rounded-3xl shadow-2xl border-4 border-[#d4b68b] w-full text-center relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#d4b68b] text-[#3d2b1f] px-6 py-1 rounded-full font-bold shadow-md text-sm">
                                {t.question}
                            </div>
                            <div className="font-amiri text-2xl md:text-4xl leading-relaxed" dir="rtl">
                                {currentLevel.content.verses.map((part, idx) => (
                                    <p key={idx} className="mb-2">
                                        {part.includes('___') ? (
                                            <>
                                                {part.split('___')[0]}
                                                <span className="inline-block border-b-2 border-dashed border-[#3d2b1f] w-24 mx-1 text-center text-emerald-600 font-bold">
                                                    {isCorrect ? currentLevel.content.missingWord : '___'}
                                                </span>
                                                {part.split('___')[1]}
                                            </>
                                        ) : part}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-4 w-full">
                            {currentLevel.content.options?.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={selectedOption !== null}
                                    className={`py-4 rounded-2xl font-amiri text-2xl font-bold shadow-lg transition-all transform hover:scale-105
                                        ${selectedOption === option 
                                            ? (isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')
                                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                                        }
                                        ${selectedOption !== null && selectedOption !== option ? 'opacity-50' : ''}
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
