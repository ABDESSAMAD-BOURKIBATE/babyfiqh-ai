import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { hadithGameData } from '../../utils/gamesData';
import { ArrowIcon } from '../LandingPage';
import { Check } from 'lucide-react';

interface HadithGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

interface Card {
    id: number;
    text: string;
    pairId: string;
    isFlipped: boolean;
    isMatched: boolean;
    type: 'part1' | 'part2';
}

const ScrollIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a5 5 0 0 1 5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M15 9h-10" />
        <path d="M15 14h-10" />
    </svg>
);

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const HadithGame: React.FC<HadithGameProps> = ({ onBack, currentLang, dir }) => {
    const [view, setView] = useState<'levels' | 'game'>('levels');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentStage, setCurrentStage] = useState(1);
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [activePair, setActivePair] = useState<string | null>(null);
    const [isStageComplete, setIsStageComplete] = useState(false);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    const t = translations[currentLang].ui.games;
    const TOTAL_LEVELS = 20;
    const STAGES_PER_LEVEL = 30;

    useEffect(() => {
        if (view === 'game') {
            initializeStage();
        }
    }, [view, currentLevel, currentStage]);

    const getPairsCount = (stage: number) => {
        if (stage <= 10) return 2; // 4 cards
        if (stage <= 20) return 3; // 6 cards
        return 4; // 8 cards
    };

    const initializeStage = () => {
        const levelData = hadithGameData.find(l => l.id === currentLevel);
        if (!levelData) return;

        const pairsCount = getPairsCount(currentStage);

        let startIndex = 0;
        for (let i = 1; i < currentStage; i++) {
            startIndex += getPairsCount(i);
        }

        const stagePairs = levelData.pairs.slice(startIndex, startIndex + pairsCount);

        const gameCards: Card[] = [];
        stagePairs.forEach((pair, index) => {
            gameCards.push({
                id: index * 2,
                text: pair.part1[currentLang],
                pairId: pair.id,
                isFlipped: false,
                isMatched: false,
                type: 'part1'
            });
            gameCards.push({
                id: index * 2 + 1,
                text: pair.part2[currentLang],
                pairId: pair.id,
                isFlipped: false,
                isMatched: false,
                type: 'part2'
            });
        });

        setCards(gameCards.sort(() => Math.random() - 0.5));
        setFlippedIndices([]);
        setIsStageComplete(false);
        setIsLevelComplete(false);
        setActivePair(null);
    };

    const handleLevelSelect = (level: number) => {
        setCurrentLevel(level);
        setCurrentStage(1);
        setView('game');
    };

    const handleCardClick = (index: number) => {
        if (activePair) return;
        if (flippedIndices.length >= 2) return;
        if (cards[index].isFlipped || cards[index].isMatched) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            checkForMatch(newFlipped[0], newFlipped[1]);
        }
    };

    const checkForMatch = (idx1: number, idx2: number) => {
        const card1 = cards[idx1];
        const card2 = cards[idx2];

        if (card1.pairId === card2.pairId) {
            setTimeout(() => {
                setCards(prev => prev.map((card, i) =>
                    i === idx1 || i === idx2 ? { ...card, isMatched: true } : card
                ));
                setFlippedIndices([]);
                setActivePair(card1.pairId);
            }, 500);
        } else {
            setTimeout(() => {
                setCards(prev => prev.map((card, i) =>
                    i === idx1 || i === idx2 ? { ...card, isFlipped: false } : card
                ));
                setFlippedIndices([]);
            }, 1000);
        }
    };

    const handleCloseExplanation = () => {
        setActivePair(null);
        const allMatched = cards.every(c => c.isMatched);
        if (allMatched) {
            if (currentStage >= STAGES_PER_LEVEL) {
                setIsLevelComplete(true);
            } else {
                setIsStageComplete(true);
            }
        }
    };

    const handleNextStage = () => {
        if (currentStage < STAGES_PER_LEVEL) {
            setCurrentStage(prev => prev + 1);
        }
    };

    const getGridCols = () => {
        const count = cards.length;
        if (count <= 4) return 'grid-cols-2';
        if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-4';
    };

    const renderLevelSelect = () => (
        <div className="p-6 md:p-12 overflow-y-auto h-full custom-scrollbar">
            <h2 className="text-3xl font-bold text-white text-center mb-2 font-amiri">{t.hadithGame}</h2>
            <p className="text-amber-200/60 text-center mb-8">{t.hadithGameDesc}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map(level => (
                    <button
                        key={level}
                        onClick={() => handleLevelSelect(level)}
                        className="group relative aspect-square bg-[#1e293b] border-2 border-white/5 hover:border-amber-500/50 rounded-2xl flex flex-col items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
                    >
                        <div className="absolute top-2 right-2">
                            {level === 1 ? (
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            ) : (
                                <LockIcon className="w-4 h-4 text-white/20" />
                            )}
                        </div>
                        <span className="text-4xl font-bold text-white/20 group-hover:text-amber-500 transition-colors mb-2">{level}</span>
                        <span className="text-xs text-white/40 uppercase tracking-wider">{t.level}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderExplanation = () => {
        if (!activePair) return null;
        const levelData = hadithGameData.find(l => l.id === currentLevel);
        const pairData = levelData?.pairs.find(p => p.id === activePair);
        if (!pairData) return null;

        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
                <div className="bg-[#1e293b] border border-amber-500/50 rounded-3xl p-8 max-w-lg w-full text-center relative shadow-2xl">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-[#0f172a] shadow-lg">
                        <Check className="w-8 h-8" />
                    </div>

                    <h3 className="text-emerald-400 font-bold text-xl mt-4 mb-2">{t.correct}</h3>

                    <div className="bg-black/20 p-4 rounded-xl border border-white/5 mb-6">
                        <p className="text-white font-amiri text-2xl leading-relaxed mb-2" dir="rtl">
                            "{pairData.fullText[currentLang]}"
                        </p>
                    </div>

                    <div className="text-white/80 text-sm leading-relaxed mb-8 bg-amber-900/20 p-4 rounded-xl border border-amber-500/20">
                        <span className="block text-amber-400 font-bold mb-1 text-xs uppercase">{t.hadith.explanation}</span>
                        {pairData.explanation[currentLang]}
                    </div>

                    <button
                        onClick={handleCloseExplanation}
                        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
                    >
                        {t.hadith.continue}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full relative overflow-hidden bg-[#0f172a]">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

            <div className="p-6 flex items-center justify-between relative z-10 bg-gradient-to-b from-black/40 to-transparent">
                <div className="flex items-center gap-4">
                    <button onClick={view === 'game' ? () => setView('levels') : onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-white font-amiri">
                            {view === 'game' ? `${t.level} ${currentLevel} - ${t.hadithGame}` : t.hadithGame}
                        </h2>
                        {view === 'game' && (
                            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                                <span>Stage {currentStage}/{STAGES_PER_LEVEL}</span>
                                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 transition-all duration-500"
                                        style={{ width: `${(currentStage / STAGES_PER_LEVEL) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-grow relative z-10 overflow-hidden">
                {view === 'levels' ? renderLevelSelect() : (
                    <div className="h-full flex flex-col items-center justify-start p-4 md:p-6 overflow-y-auto custom-scrollbar">
                        <div className={`grid ${getGridCols()} gap-3 md:gap-4 max-w-3xl w-full transition-all duration-500`}>
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="aspect-[3/4] relative perspective-1000 cursor-pointer group"
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className={`w-full h-full transition-all duration-500 transform-style-3d relative ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
                                        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-700 to-orange-900 rounded-xl border-2 border-amber-500/30 shadow-lg flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                                            <ScrollIcon className="w-6 h-6 md:w-8 md:h-8 text-amber-200/20" />
                                            <div className="absolute inset-2 border border-dashed border-amber-500/30 rounded-lg"></div>
                                        </div>

                                        <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-xl flex items-center justify-center p-2 md:p-3 text-center border-2 transition-colors
                                            ${card.isMatched
                                                ? 'bg-emerald-900/80 border-emerald-500'
                                                : 'bg-[#1e293b] border-amber-200'
                                            }`}
                                        >
                                            <p className={`font-amiri text-sm md:text-base leading-tight ${card.isMatched ? 'text-emerald-100' : 'text-amber-100'}`}>
                                                {card.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {renderExplanation()}

            {isStageComplete && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-fade-in">
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">✨</div>
                        <h2 className="text-3xl font-bold text-white font-amiri mb-2">{t.greatJob}</h2>
                        <p className="text-white/60 mb-8">Stage {currentStage} Complete!</p>
                        <button onClick={handleNextStage} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto">
                            <span>{t.next}</span>
                            <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            )}

            {isLevelComplete && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-fade-in">
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">🏆</div>
                        <h2 className="text-4xl font-bold text-white font-amiri mb-4">Level {currentLevel} Complete!</h2>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setView('levels')} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold">
                                {t.mainMenu}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};
