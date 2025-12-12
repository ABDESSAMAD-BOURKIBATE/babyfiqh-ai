import React, { useState } from 'react';
import { arabicUnit1, Step } from './data/arabic/unit1';
import { UnitCard } from './UnitCard';
import { LessonView } from './LessonView';
import { ColoringView } from './ColoringView';
import { ActivityView } from './ActivityView';

export const ArabicPortal: React.FC = () => {
    const [activeStep, setActiveStep] = useState<Step | null>(null);

    const handleStepClick = (step: Step) => {
        setActiveStep(step);
    };

    const handleBack = () => {
        setActiveStep(null);
    };

    if (activeStep) {
        return (
            <div className="w-full h-full flex flex-col animate-fade-in">
                <button
                    onClick={handleBack}
                    className="self-start mb-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all flex items-center gap-3 group backdrop-blur-sm border border-white/10"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="font-bold">العودة للوحدات</span>
                </button>

                <div className="flex-grow bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-y-auto custom-scrollbar shadow-2xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-full"></div>
                            <div className="relative text-7xl bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md animate-float">
                                {activeStep.icon}
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">{activeStep.title}</h2>

                        <div className="text-slate-200 text-lg leading-relaxed bg-black/20 p-8 rounded-3xl border border-white/5 shadow-inner">
                            {activeStep.type === 'lesson' && activeStep.sections ? (
                                <LessonView
                                    sections={activeStep.sections}
                                    onComplete={() => handleBack()}
                                />
                            ) : activeStep.type === 'coloring' ? (
                                <ColoringView onComplete={() => handleBack()} />
                            ) : activeStep.type === 'activity' && activeStep.activityPairs ? (
                                <ActivityView
                                    pairs={activeStep.activityPairs}
                                    onComplete={() => handleBack()}
                                />
                            ) : activeStep.type === 'quiz' ? (
                                <div>
                                    <p className="mb-6 text-xl">هذا اختبار! (سيتم تفعيل الأسئلة قريباً)</p>
                                    <div className="text-left rtl:text-right space-y-4">
                                        {activeStep.questions?.map((q, i) => (
                                            <div key={q.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                <p className="font-bold mb-4 text-xl">{i + 1}. {q.text}</p>
                                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {q.options.map((opt, idx) => (
                                                        <li key={idx} className="bg-black/20 p-3 rounded-xl text-center text-slate-300">{opt}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <p className="text-2xl text-slate-400 mb-4">نشاط تفاعلي</p>
                                    <p className="text-lg text-slate-500">{activeStep.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 animate-fade-in pb-12">
            <div className="text-center mb-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/20 blur-[100px] -z-10 rounded-full"></div>
                <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl">مسار تعلم اللغة العربية</h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    ابدأ رحلتك الممتعة في تعلم اللغة العربية من خلال دروس تفاعلية، تلوين، وألعاب ممتعة!
                </p>
            </div>

            <UnitCard unit={arabicUnit1} onStepClick={handleStepClick} />

            {/* Placeholder for future units */}
            <div className="opacity-40 pointer-events-none grayscale filter blur-[1px] transform scale-95">
                <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-2">الوحدة الثانية: قريباً</h3>
                    <p className="text-slate-400">المزيد من المغامرات في الطريق إليك...</p>
                </div>
            </div>
        </div>
    );
};
