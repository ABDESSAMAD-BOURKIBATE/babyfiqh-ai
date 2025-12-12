import React, { useState, useEffect } from 'react';
import { MatchingPair } from './data/arabic/unit1';

interface ActivityViewProps {
    pairs: MatchingPair[];
    onComplete: () => void;
}

interface Card {
    id: string;
    content: string;
    pairId: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ pairs, onComplete }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [matchedCount, setMatchedCount] = useState(0);

    useEffect(() => {
        // Create deck from pairs
        const deck: Card[] = [];
        pairs.forEach(pair => {
            deck.push({ id: `${pair.id}-1`, content: pair.item1, pairId: pair.id, isFlipped: false, isMatched: false });
            deck.push({ id: `${pair.id}-2`, content: pair.item2, pairId: pair.id, isFlipped: false, isMatched: false });
        });
        // Shuffle
        setCards(deck.sort(() => Math.random() - 0.5));
    }, [pairs]);

    const handleCardClick = (clickedCard: Card) => {
        if (clickedCard.isMatched || clickedCard.isFlipped || flippedCards.length >= 2) return;

        const newCards = cards.map(card =>
            card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );
        setCards(newCards);

        const newFlipped = [...flippedCards, clickedCard];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            // Check match
            if (newFlipped[0].pairId === newFlipped[1].pairId) {
                // Match!
                setTimeout(() => {
                    setCards(prev => prev.map(card =>
                        card.pairId === newFlipped[0].pairId ? { ...card, isMatched: true, isFlipped: true } : card
                    ));
                    setFlippedCards([]);
                    setMatchedCount(prev => prev + 1);
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    setCards(prev => prev.map(card =>
                        card.id === newFlipped[0].id || card.id === newFlipped[1].id ? { ...card, isFlipped: false } : card
                    ));
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const isGameComplete = matchedCount === pairs.length && pairs.length > 0;

    return (
        <div className="flex flex-col items-center animate-fade-in pb-8">
            <h3 className="text-3xl font-bold text-white mb-8">لعبة الذاكرة والمطابقة 🧠</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-3xl">
                {cards.map(card => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card)}
                        className={`
                            aspect-square rounded-2xl text-2xl font-bold transition-all duration-500 transform
                            ${card.isFlipped || card.isMatched
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rotate-y-180'
                                : 'bg-white/10 hover:bg-white/20 text-transparent'
                            }
                            ${card.isMatched ? 'opacity-50 scale-95' : 'shadow-xl hover:scale-105'}
                        `}
                    >
                        <div className={card.isFlipped || card.isMatched ? '' : 'hidden'}>
                            {card.content}
                        </div>
                        {!(card.isFlipped || card.isMatched) && (
                            <div className="text-4xl opacity-50">❓</div>
                        )}
                    </button>
                ))}
            </div>

            {isGameComplete && (
                <div className="animate-bounce mb-8">
                    <p className="text-2xl text-emerald-400 font-bold">أحسنت! لقد طابقت جميع البطاقات! 🌟</p>
                </div>
            )}

            <button
                onClick={onComplete}
                disabled={!isGameComplete}
                className={`
                    px-8 py-3 rounded-full font-bold text-xl text-white shadow-lg transition-all duration-300
                    ${isGameComplete
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-emerald-500/30 hover:scale-105'
                        : 'bg-slate-700 opacity-50 cursor-not-allowed'}
                `}
            >
                أكملت النشاط! ✨
            </button>
        </div>
    );
};
