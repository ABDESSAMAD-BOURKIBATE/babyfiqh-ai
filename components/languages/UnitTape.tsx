import React from 'react';
import { Step } from './data/arabic/unit1';

interface UnitTapeProps {
    steps: Step[];
    onStepClick: (step: Step) => void;
}

export const UnitTape: React.FC<UnitTapeProps> = ({ steps, onStepClick }) => {
    return (
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex items-center gap-4 min-w-max px-2">
                {steps.map((step, index) => (
                    <div key={step.id} className="relative group">
                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div className="absolute top-1/2 left-full w-4 h-1 bg-white/10 -translate-y-1/2 z-0"></div>
                        )}

                        <button
                            onClick={() => !step.isLocked && onStepClick(step)}
                            disabled={step.isLocked}
                            className={`
                                relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full border-[6px] transition-all duration-500
                                ${step.isLocked
                                    ? 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed grayscale'
                                    : 'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 border-white shadow-[0_10px_20px_rgba(16,185,129,0.4)] hover:scale-110 hover:shadow-[0_15px_30px_rgba(16,185,129,0.6)] hover:-translate-y-2 cursor-pointer'
                                }
                            `}
                        >
                            <span className="text-3xl drop-shadow-md filter">{step.icon}</span>

                            {/* Shine effect */}
                            {!step.isLocked && (
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-50 pointer-events-none"></div>
                            )}

                            {step.isLocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full backdrop-blur-[2px]">
                                    <span className="text-xl opacity-80">🔒</span>
                                </div>
                            )}
                        </button>
                        <div className="mt-4 text-center w-24 transition-all duration-300 group-hover:scale-105">
                            <p className="text-sm text-white font-bold truncate px-1 drop-shadow-lg">
                                {step.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
