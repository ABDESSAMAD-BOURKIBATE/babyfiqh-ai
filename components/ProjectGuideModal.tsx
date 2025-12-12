import React, { useState, useEffect } from 'react';
import { Language } from '../utils/translations';
import { getGuideTranslation } from '../utils/guideTranslations';
import { XIcon } from './icons/XIcon';

interface ProjectGuideModalProps {
    onClose: () => void;
    currentLang: Language;
}

export const ProjectGuideModal: React.FC<ProjectGuideModalProps> = ({ onClose, currentLang }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'indicators' | 'questionnaire' | 'future'>('overview');
    const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);
    const guide = getGuideTranslation(currentLang);
    const isRtl = currentLang === 'ar' || currentLang === 'zgh';

    // Animate statistics on mount
    useEffect(() => {
        if (activeTab === 'indicators') {
            const targets = [1250, 5000, 10000, 98];
            const duration = 2000;
            const steps = 60;
            const increment = duration / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                setAnimatedStats(targets.map(target => Math.floor(target * progress)));

                if (currentStep >= steps) {
                    clearInterval(interval);
                    setAnimatedStats(targets);
                }
            }, increment);

            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const tabIcons = {
        overview: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        features: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
        indicators: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        questionnaire: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        future: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-purple-900/95 border border-indigo-500/30 w-full max-w-7xl h-full max-h-[95vh] rounded-3xl shadow-2xl shadow-indigo-500/20 flex flex-col overflow-hidden relative backdrop-blur-xl">

                {/* Animated Background Effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none"></div>

                {/* Glassmorphism Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-white/5 backdrop-blur-md z-10 relative">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="p-4 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl shadow-lg shadow-indigo-500/30 animate-float">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-200 font-cairo">{guide.title}</h2>
                            <p className="text-indigo-300 text-sm md:text-base mt-1">{guide.subtitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 group hover:rotate-90 hover:scale-110"
                    >
                        <XIcon className="w-6 h-6 md:w-8 md:h-8 text-white/70 group-hover:text-white" />
                    </button>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden z-10">

                    {/* Sidebar Navigation with Glassmorphism */}
                    <div className="w-full md:w-72 bg-black/30 backdrop-blur-md border-r border-white/5 p-4 md:p-6 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                        {Object.entries(guide.tabs).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key as any)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 font-bold text-${isRtl ? 'right' : 'left'} group relative overflow-hidden
                                ${activeTab === key
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white hover:scale-102'}`}
                            >
                                {activeTab === key && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse"></div>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-transform duration-500 ${activeTab === key ? 'scale-110' : 'group-hover:scale-110'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tabIcons[key as keyof typeof tabIcons]} />
                                </svg>
                                <span className="relative z-10">{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area with Glassmorphism */}
                    <div className="flex-grow p-6 md:p-10 overflow-y-auto custom-scrollbar bg-black/20 backdrop-blur-sm">

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-slide-up">
                                <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 p-8 md:p-10 rounded-3xl border border-indigo-400/30 shadow-2xl backdrop-blur-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-6 font-cairo relative z-10">{guide.overview.visionTitle}</h3>
                                    <p className="text-lg md:text-xl text-slate-200 leading-loose text-justify relative z-10">
                                        {guide.overview.visionText}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/20 group">
                                        <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                            <span className="text-3xl">🎓</span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-emerald-400 mb-3">{guide.overview.educationalGoalTitle}</h4>
                                        <p className="text-slate-300 leading-relaxed">{guide.overview.educationalGoalText}</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 group">
                                        <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                            <span className="text-3xl">🤖</span>
                                        </div>
                                        <h4 className="text-2xl font-bold text-purple-400 mb-3">{guide.overview.technicalGoalTitle}</h4>
                                        <p className="text-slate-300 leading-relaxed">{guide.overview.technicalGoalText}</p>
                                    </div>
                                </div>

                                {guide.overview.values && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {guide.overview.values.map((value, idx) => (
                                            <div key={idx} className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-indigo-400/40 transition-all duration-500 hover:-translate-y-1 group text-center">
                                                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">
                                                    {['✨', '🚀', '🛡️', '🎮'][idx]}
                                                </div>
                                                <h5 className="text-lg font-bold text-white mb-2">{value.title}</h5>
                                                <p className="text-slate-400 text-sm">{value.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Features Tab */}
                        {activeTab === 'features' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                                {guide.features.list.map((feature, idx) => (
                                    <div key={idx} className="bg-white/5 backdrop-blur-md hover:bg-white/10 p-8 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                                            <span className="text-3xl font-bold text-indigo-300">{idx + 1}</span>
                                        </div>
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-3 font-cairo relative z-10">{feature.title}</h4>
                                        <p className="text-slate-300 leading-relaxed relative z-10">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Indicators Tab */}
                        {activeTab === 'indicators' && (
                            <div className="space-y-8 animate-slide-up">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {guide.indicators.stats.map((stat, idx) => (
                                        <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-indigo-400/40 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 group">
                                            <h4 className="text-slate-400 text-sm mb-3 font-semibold">{stat.label}</h4>
                                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform duration-500">
                                                {idx === 3 ? `${animatedStats[idx]}%` : `${animatedStats[idx].toLocaleString()}+`}
                                            </div>
                                            <span className="inline-block text-emerald-400 text-sm font-bold bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">{stat.change}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-indigo-400/30 transition-all duration-500">
                                    <div className="p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-indigo-900/40 to-purple-900/40">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">{guide.indicators.tableTitle}</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-${isRtl ? 'right' : 'left'}">
                                            <thead className="bg-white/5 text-slate-300 text-sm uppercase">
                                                <tr>
                                                    {guide.indicators.tableHeaders.map((header, idx) => (
                                                        <th key={idx} className="p-4 md:p-6 font-bold">{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 text-slate-200">
                                                {guide.indicators.tableData.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-white/5 transition-colors duration-300">
                                                        <td className="p-4 md:p-6 font-semibold">{row.month}</td>
                                                        <td className="p-4 md:p-6">{row.users}</td>
                                                        <td className="p-4 md:p-6">{row.engagement}</td>
                                                        <td className="p-4 md:p-6 text-emerald-400 font-bold">{row.rating}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Questionnaire Tab */}
                        {activeTab === 'questionnaire' && (
                            <div className="space-y-6 animate-slide-up max-w-3xl mx-auto">
                                <div className="bg-gradient-to-br from-indigo-600/30 to-purple-600/30 backdrop-blur-md border border-indigo-400/40 p-8 rounded-2xl shadow-xl">
                                    <h3 className="text-3xl font-bold text-white mb-3">{guide.questionnaire.title}</h3>
                                    <p className="text-indigo-200">{guide.questionnaire.subtitle}</p>
                                </div>

                                <div className="space-y-6">
                                    {guide.questionnaire.questions.map((q, qIdx) => (
                                        <div key={qIdx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-indigo-400/30 transition-all duration-500">
                                            <label className="block text-white text-xl mb-6 font-bold">{q.question}</label>
                                            <div className="space-y-3">
                                                {q.options.map((opt, oIdx) => (
                                                    <label key={oIdx} className="flex items-center gap-4 p-4 rounded-xl bg-black/30 hover:bg-white/10 cursor-pointer transition-all duration-300 hover:scale-102 group">
                                                        <input type="radio" name={`q${qIdx}`} className="w-6 h-6 text-indigo-500 bg-transparent border-2 border-slate-400 focus:ring-indigo-500 focus:ring-2" />
                                                        <span className="text-slate-200 group-hover:text-white transition-colors">{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-indigo-400/30 transition-all duration-500">
                                        <label className="block text-white text-xl mb-6 font-bold">{guide.questionnaire.openQuestion}</label>
                                        <textarea
                                            className="w-full bg-black/30 border-2 border-white/20 rounded-xl p-5 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 backdrop-blur-sm"
                                            rows={5}
                                            placeholder={guide.questionnaire.placeholder}
                                        ></textarea>
                                    </div>

                                    <button className="w-full py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl text-white text-xl font-bold shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group">
                                        <span className="relative z-10">{guide.questionnaire.submitButton}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Future Tab */}
                        {activeTab === 'future' && (
                            <div className="relative animate-slide-up">
                                <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-40"></div>
                                <div className="space-y-12 relative">
                                    {guide.future.roadmap.map((item, idx) => (
                                        <div key={idx} className="relative pl-16 md:pl-24 group">
                                            <div className="absolute left-[29px] md:left-[45px] top-4 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full border-4 border-slate-900 shadow-[0_0_20px_rgba(99,102,241,0.6)] group-hover:scale-125 transition-transform duration-500"></div>
                                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
                                                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 text-sm font-bold mb-4 border border-indigo-400/30">
                                                    {item.year}
                                                </span>
                                                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-cairo">{item.title}</h4>
                                                <p className="text-slate-300 text-lg leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="relative pl-16 md:pl-24 opacity-70 hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute left-[29px] md:left-[45px] top-4 w-6 h-6 bg-slate-700 rounded-full border-4 border-slate-900 animate-pulse"></div>
                                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 border-dashed">
                                            <h4 className="text-2xl md:text-3xl font-bold text-slate-400 mb-3 font-cairo">{guide.future.personalVision.title}</h4>
                                            <p className="text-slate-400 text-lg leading-relaxed">
                                                {guide.future.personalVision.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out;
                }
                .hover\\:scale-102:hover {
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
};
