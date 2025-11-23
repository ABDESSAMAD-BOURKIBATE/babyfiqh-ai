
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../../utils/translations';
import { ArrowIcon } from '../LandingPage';
import { BookIcon } from '../icons/BookIcon';
import { MosqueIcon } from '../icons/MosqueIcon';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { KaabaIcon } from '../icons/KaabaIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

interface MemoryGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

// --- Game Assets ---

const LampIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 22h6" />
        <path d="M12 22v-4" />
        <path d="M9 5.1a7 7 0 0 1 6 0" />
        <path d="M12 2v3" />
        <path d="M12 18a5 5 0 0 1-5-5c0-2.5 1.5-3.5 2-4.5.9-1.8 1-3 3-3s2.1 1.2 3 3c.5 1 2 2 2 4.5a5 5 0 0 1-5 5Z" />
    </svg>
);

const CamelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 16a3 3 0 0 0 2.5-1.5" />
        <path d="M8 19a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" />
        <path d="M2 21h20" />
        <path d="M18 21v-6a2 2 0 0 0-2-2h-4.5l-1.5-3h-2l-3 6" />
        <path d="M12 6a2 2 0 0 1-2-2V3" />
        <path d="M8 13h.01" />
    </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// --- Game Logic ---

interface Card {
    id: number;
    iconId: string;
    icon: React.FC<any>;
    color: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const ICONS = [
    { id: 'mosque', component: MosqueIcon, color: 'text-emerald-500' },
    { id: 'book', component: BookIcon, color: 'text-amber-500' },
    { id: 'sun', component: SunIcon, color: 'text-yellow-500' },
    { id: 'moon', component: MoonIcon, color: 'text-blue-400' },
    { id: 'kaaba', component: KaabaIcon, color: 'text-black' },
    { id: 'lamp', component: LampIcon, color: 'text-purple-500' },
    { id: 'camel', component: CamelIcon, color: 'text-orange-600' },
    { id: 'star', component: StarIcon, color: 'text-pink-500' },
];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onBack, currentLang, dir }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gridSize, setGridSize] = useState(4); // 4x4 Grid by default

    const t = translations[currentLang].ui.games;

    // Timer
    useEffect(() => {
        let interval: any;
        if (isPlaying && !isGameOver) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isGameOver]);

    const initializeGame = () => {
        // Select 8 pairs for 4x4 grid
        const selection = ICONS.slice(0, 8);
        const deck = [...selection, ...selection]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({
                id: index,
                iconId: item.id,
                icon: item.component,
                color: item.color,
                isFlipped: false,
                isMatched: false,
            }));
        
        setCards(deck);
        setFlippedIndices([]);
        setMoves(0);
        setTimer(0);
        setIsGameOver(false);
        setIsPlaying(true);
    };

    // Start game on mount
    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (index: number) => {
        if (!isPlaying || isGameOver) return;
        if (flippedIndices.length >= 2) return; // Prevent more than 2 flips at once
        if (cards[index].isFlipped || cards[index].isMatched) return;

        // Flip the card
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);
        
        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prev => prev + 1);
            checkForMatch(newFlipped[0], newFlipped[1]);
        }
    };

    const checkForMatch = (idx1: number, idx2: number) => {
        if (cards[idx1].iconId === cards[idx2].iconId) {
            // Match!
            setTimeout(() => {
                setCards(prev => prev.map((card, i) => 
                    i === idx1 || i === idx2 ? { ...card, isMatched: true } : card
                ));
                setFlippedIndices([]);
                checkWinCondition();
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                setCards(prev => prev.map((card, i) => 
                    i === idx1 || i === idx2 ? { ...card, isFlipped: false } : card
                ));
                setFlippedIndices([]);
            }, 1000);
        }
    };

    const checkWinCondition = () => {
        // We need to check against current state + the 2 just matched
        // But setState is async, so safer to check if matched count will reach total
        // Actually, easiest way is to check if all cards are matched in the next render or count matched now
        setCards(prev => {
            const allMatched = prev.every(c => c.isMatched || c.isFlipped); // Flipped here means the last pair
            if (allMatched) {
                setIsGameOver(true);
                setIsPlaying(false);
            }
            return prev;
        });
    };

    // Format Time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-full p-4 md:p-6 animate-fade-in relative max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white font-amiri">{t.memoryGame}</h2>
                        <p className="text-white/50 text-xs hidden md:block">{t.memoryDesc}</p>
                    </div>
                </div>

                <div className="flex gap-4 text-sm font-bold font-mono">
                    <div className="bg-white/10 px-4 py-2 rounded-xl text-amber-400 border border-white/5 flex flex-col items-center min-w-[80px]">
                        <span className="text-[10px] text-white/40 uppercase">{t.moves}</span>
                        <span>{moves}</span>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-xl text-emerald-400 border border-white/5 flex flex-col items-center min-w-[80px]">
                        <span className="text-[10px] text-white/40 uppercase">{t.time}</span>
                        <span>{formatTime(timer)}</span>
                    </div>
                </div>
            </div>

            {/* Game Grid */}
            <div className="flex-grow flex items-center justify-center pb-8">
                <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-md aspect-square">
                    {cards.map((card, index) => (
                        <div 
                            key={card.id}
                            className="relative w-full h-full perspective-1000 group cursor-pointer"
                            onClick={() => handleCardClick(index)}
                        >
                            <div className={`w-full h-full transition-all duration-500 transform-style-3d relative ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
                                
                                {/* Card Back (Pattern) */}
                                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-600 to-violet-800 rounded-xl border-2 border-white/10 shadow-lg flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                                    <div className="w-8 h-8 rounded-full border-2 border-white/30 opacity-50"></div>
                                </div>

                                {/* Card Front (Icon) */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl shadow-xl flex items-center justify-center border-4 border-white">
                                    {card.isMatched && (
                                        <div className="absolute inset-0 bg-emerald-500/20 animate-pulse rounded-lg"></div>
                                    )}
                                    <card.icon className={`w-10 h-10 md:w-14 md:h-14 ${card.color} drop-shadow-md transition-transform duration-300 ${card.isMatched ? 'scale-110' : ''}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Game Over Modal Overlay */}
            {isGameOver && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl animate-fade-in p-6">
                    <div className="bg-[#1e293b] border border-emerald-500/30 p-8 rounded-3xl text-center max-w-sm w-full shadow-2xl relative overflow-hidden">
                        {/* Confetti/Sparkle Background */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(16,185,129,0.1)_0%,transparent_60%)] animate-pulse"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <SparklesIcon className="w-10 h-10 text-emerald-400" />
                            </div>
                            
                            <h2 className="text-3xl font-bold text-white font-cairo mb-2">{t.greatJob}</h2>
                            <p className="text-white/60 text-sm mb-8">{currentLang === 'ar' ? 'لقد أتممت التحدي بنجاح!' : 'You completed the challenge successfully!'}</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                                    <p className="text-white/40 text-xs uppercase mb-1">{t.time}</p>
                                    <p className="text-2xl font-mono font-bold text-amber-400">{formatTime(timer)}</p>
                                </div>
                                <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                                    <p className="text-white/40 text-xs uppercase mb-1">{t.moves}</p>
                                    <p className="text-2xl font-mono font-bold text-emerald-400">{moves}</p>
                                </div>
                            </div>

                            <button 
                                onClick={initializeGame}
                                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all"
                            >
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
