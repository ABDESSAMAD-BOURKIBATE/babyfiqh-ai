import React, { useState } from 'react';
import { LessonSection, Question } from './data/arabic/unit1';

interface LessonViewProps {
    sections: LessonSection[];
    onComplete: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ sections, onComplete }) => {
    return (
        <div className="space-y-8 max-w-3xl mx-auto pb-12 animate-fade-in">
            {sections.map((section) => (
                <div key={section.id} className="animate-fade-in-up">
                    {section.type === 'text' && (
                        <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/5 shadow-sm hover:bg-white/10 transition-colors">
                            <p className="text-xl text-slate-200 leading-loose whitespace-pre-line text-right" dir="rtl">
                                {section.content?.split('**').map((part, i) =>
                                    i % 2 === 1 ? <span key={i} className="text-emerald-400 font-bold text-2xl">{part}</span> : part
                                )}
                            </p>
                        </div>
                    )}

                    {section.type === 'question' && section.question && (
                        <InlineQuestion question={section.question} />
                    )}
                </div>
            ))}

            <div className="flex justify-center pt-8">
                <button
                    onClick={onComplete}
                    className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-bold text-xl text-white shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        أكملت الدرس! 🎉
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>
        </div>
    );
};

const InlineQuestion: React.FC<{ question: Question }> = ({ question }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSelect = (index: number) => {
        if (isCorrect) return;

        setSelected(index);
        if (index === question.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-3xl p-8 border border-indigo-500/20 my-8 shadow-xl" dir="rtl">
            <h4 className="text-xl font-bold text-indigo-200 mb-6 flex items-center gap-3">
                <span className="text-2xl">❓</span>
                {question.text}
            </h4>
            <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={isCorrect === true}
                        className={`
                            p-4 rounded-2xl text-right transition-all duration-300 border-2 flex justify-between items-center group
                            ${selected === idx
                                ? (isCorrect
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    : 'bg-red-500/20 border-red-500 text-red-200')
                                : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-300 hover:border-white/20'}
                        `}
                    >
                        <span className="text-lg font-medium">{option}</span>
                        {selected === idx && (
                            <span className="text-xl animate-bounce">{isCorrect ? '✅' : '❌'}</span>
                        )}
                    </button>
                ))}
            </div>
            {isCorrect === false && (
                <p className="text-red-400 text-lg mt-4 font-bold animate-pulse">حاول مرة أخرى! 💪</p>
            )}
            {isCorrect === true && (
                <p className="text-emerald-400 text-lg mt-4 font-bold animate-bounce">أحسنت! إجابة صحيحة 🌟</p>
            )}
        </div>
    );
};
