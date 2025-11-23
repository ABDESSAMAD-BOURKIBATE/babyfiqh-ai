
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { hadithGameData } from '../../utils/gamesData';
import { ArrowIcon } from '../LandingPage';
import { SparklesIcon } from '../icons/SparklesIcon';

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

export const HadithGame: React.FC<HadithGameProps> = ({ onBack, currentLang, dir }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [activePair, setActivePair] = useState<string | null>(null); // To show explanation
    const [isGameOver, setIsGameOver] = useState(false);
    const t = translations[currentLang].ui.games;

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const level = hadithGameData[0]; // Start with level 1
        const gameCards: Card[] = [];
        
        level.pairs.forEach((pair, index) => {
            // Part 1
            gameCards.push({
                id: index * 2,
                text: pair.part1[currentLang],
                pairId: pair.id,
                isFlipped: false,
                isMatched: false,
                type: 'part1'
            });
            // Part 2
            gameCards.push({
                id: index * 2 + 1,
                text: pair.part2[currentLang],
                pairId: pair.id,
                isFlipped: false,
                isMatched: false,
                type: 'part2'
            });
        });

        // Shuffle
        setCards(gameCards.sort(() => Math.random() - 0.5));
        setFlippedIndices([]);
        setIsGameOver(false);
        setActivePair(null);
    };

    const handleCardClick = (index: number) => {
        if (activePair) return; // Wait for explanation to close
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
            // Match
            setTimeout(() => {
                setCards(prev => prev.map((card, i) => 
                    i === idx1 || i === idx2 ? { ...card, isMatched: true } : card
                ));
                setFlippedIndices([]);
                setActivePair(card1.pairId); // Show explanation
            }, 500);
        } else {
            // No Match
            setTimeout(() => {
                setCards(prev => prev.map((card, i) => 
                    i === idx1 || i === idx2 ? { ...card, isFlipped: false } : card
                ));
                setFlippedIndices([]);
            }, 1000);
        }
    };

    const handleCloseExplanation = () => {
        // Check if game over
        const allMatched = cards.every(c => c.isMatched);
        if (allMatched) {
            setIsGameOver(true);
        }
        setActivePair(null);
    };

    const renderExplanation = () => {
        if (!activePair) return null;
        const pairData = hadithGameData[0].pairs.find(p => p.id === activePair);
        if (!pairData) return null;

        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
                <div className="bg-[#1e293b] border border-amber-500/50 rounded-3xl p-8 max-w-lg w-full text-center relative shadow-2xl">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center border-4 border-[#0f172a] shadow-lg">
                        <SparklesIcon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-emerald-400 font-bold text-xl mt-4 mb-2">{t.correct}</h3>
                    
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5 mb-6">
                        <p className="text-white font-amiri text-2xl leading-relaxed mb-2">
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
            {/* Background */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

            {/* Header */}
            <div className="p-6 flex items-center gap-4 relative z-10 bg-gradient-to-b from-black/40 to-transparent">
                <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                    <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white font-amiri">{t.hadithGame}</h2>
                    <p className="text-white/50 text-xs">{t.hadith.matchParts}</p>
                </div>
            </div>

            {/* Game Grid */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {cards.map((card, index) => (
                        <div 
                            key={index}
                            className="aspect-[4/3] relative perspective-1000 cursor-pointer"
                            onClick={() => handleCardClick(index)}
                        >
                            <div className={`w-full h-full transition-all duration-500 transform-style-3d relative ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
                                {/* Front (Hidden) */}
                                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-700 to-orange-900 rounded-xl border-2 border-amber-500/30 shadow-lg flex items-center justify-center">
                                    <ScrollIcon className="w-12 h-12 text-amber-200/20" />
                                    <div className="absolute inset-2 border border-dashed border-amber-500/30 rounded-lg"></div>
                                </div>

                                {/* Back (Revealed) */}
                                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-xl flex items-center justify-center p-4 text-center border-2 transition-colors
                                    ${card.isMatched 
                                        ? 'bg-emerald-900/80 border-emerald-500' 
                                        : 'bg-[#1e293b] border-amber-200'
                                    }`}
                                >
                                    <p className={`font-amiri text-lg leading-tight ${card.isMatched ? 'text-emerald-100' : 'text-amber-100'}`}>
                                        {card.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Explanation Modal */}
            {renderExplanation()}

            {/* Game Over */}
            {isGameOver && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-fade-in">
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">🏆</div>
                        <h2 className="text-4xl font-bold text-white font-amiri mb-4">{t.greatJob}</h2>
                        <div className="flex gap-4 justify-center">
                            <button onClick={onBack} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold">
                                {translations[currentLang].ui.back}
                            </button>
                            <button onClick={initializeGame} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg">
                                {t.playAgain}
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
