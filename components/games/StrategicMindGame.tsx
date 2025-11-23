
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language, translations } from '../../utils/translations';
import { ArrowIcon } from '../LandingPage';
import { BrainIcon } from '../icons/EmotionIcons';
import { SparklesIcon } from '../icons/SparklesIcon';

interface StrategicMindGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

// Scenarios for kids/teens to analyze
const PRESET_SCENARIOS = [
    {
        id: 'bully',
        text: { 
            ar: 'زميل يضايقك يومياً في المدرسة أمام الجميع. ماذا تفعل؟',
            en: 'A classmate bullies you daily in front of everyone. What do you do?',
            fr: 'Un camarade te harcèle tous les jours. Que fais-tu?',
            es: 'Un compañero te intimida a diario. ¿Qué haces?',
            zgh: 'ⴰⵎⴷⴷⴰⴽⴽⵯⵍ ⴰⵔ ⴽ ⵉⵙⵙⵉⵡⵉⴹ ⴽⵓ ⴰⵙⵙ. ⵎⴰ ⵔⴰ ⵜⵙⴽⵔⵜ?'
        }
    },
    {
        id: 'money',
        text: { 
            ar: 'وجدت مبلغاً كبيراً من المال في فناء المسجد.',
            en: 'You found a large amount of money in the mosque courtyard.',
            fr: 'Tu as trouvé beaucoup d\'argent dans la cour de la mosquée.',
            es: 'Encontraste mucho dinero en el patio de la mezquita.',
            zgh: 'ⵜⵓⴼⵉⴷ ⵉⵇⴰⵔⵉⴹⵏ ⴳ ⵜⵎⵣⴳⵉⴷⴰ.'
        }
    },
    {
        id: 'exam',
        text: { 
            ar: 'صديقك المقرب يطلب منك الغش في الامتحان النهائي.',
            en: 'Your best friend asks you to cheat in the final exam.',
            fr: 'Ton meilleur ami te demande de tricher à l\'examen.',
            es: 'Tu mejor amigo te pide hacer trampa en el examen.',
            zgh: 'ⴰⵎⴷⴷⴰⴽⴽⵯⵍ ⵏⴽ ⵉⵔⴰ ⴰⴷ ⵜⵖⵛⵛⴷ ⴳ ⵍⵉⵎⵜⵉⵃⴰⵏ.'
        }
    }
];

export const StrategicMindGame: React.FC<StrategicMindGameProps> = ({ onBack, currentLang, dir }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [parsedData, setParsedData] = useState<any>(null);
    
    const t = translations[currentLang].ui;

    const analyzeScenario = async (scenarioText: string) => {
        if (!scenarioText.trim()) return;
        setLoading(true);
        setAnalysis(null);
        setParsedData(null);

        try {
            const apiKey = process.env.API_KEY;
            if (!apiKey) throw new Error("API Key not found");

            const ai = new GoogleGenAI({ apiKey });
            const model = 'gemini-2.5-flash'; // Fast & Efficient for game interactions

            const systemInstruction = `أنت محرك ذكاء اصطناعي إستراتيجي يحاكي أسلوب AlphaGo في التفكير عبر تحليل الحالة، بناء تقدير رقمي للحركات، واستخدام Monte-Carlo Tree Search لتقييم الخيارات واختيار أفضل نقلة. عند تقديم أي وضع لعبة يجب أن تنتج: أفضل 3 حركات مع احتمالات الفوز، ملخص MCTS، والحركة النهائية المختارة. استخدم قيم: State Value، Policy Prior، Rollout Simulation، Visit Count، Win Probability. فكّر بشكل احتمالي، ولا تقترح حركات مستحيلة، وقدم النتيجة في صيغة: [State Analysis: …] [Top Moves: …] [MCTS Summary: …] [Best Move: …].`;

            const response = await ai.models.generateContent({
                model: model,
                contents: `Analyze this scenario: "${scenarioText}"`,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                }
            });

            const resultText = response.text;
            if (resultText) {
                setAnalysis(resultText);
                parseOutput(resultText);
            }
        } catch (error) {
            console.error("AI Error:", error);
            setAnalysis("System Error: Neural Link Failed.");
        } finally {
            setLoading(false);
        }
    };

    const parseOutput = (text: string) => {
        const extractSection = (tag: string) => {
            const regex = new RegExp(`\\[${tag}:\\s*([\\s\\S]*?)\\](?=\\s*\\[|$)`, 'i');
            const match = text.match(regex);
            return match ? match[1].trim() : null;
        };

        setParsedData({
            stateAnalysis: extractSection('State Analysis'),
            topMoves: extractSection('Top Moves'),
            mctsSummary: extractSection('MCTS Summary'),
            bestMove: extractSection('Best Move'),
        });
    };

    return (
        <div className="flex flex-col h-full relative bg-[#050505] text-emerald-400 font-mono overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Header */}
            <div className="p-6 flex items-center gap-4 relative z-10 border-b border-emerald-500/30 bg-[#050505]/80 backdrop-blur">
                <button onClick={onBack} className="p-2 rounded-full border border-emerald-500/50 hover:bg-emerald-500/20 text-emerald-400 transition-colors">
                    <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    <h2 className="text-xl font-bold tracking-widest">STRATEGIC_MIND_V1.0</h2>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-10">
                
                <div className="max-w-4xl mx-auto flex flex-col gap-8">
                    
                    {/* Input Section */}
                    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                        <label className="block text-xs text-emerald-500/50 mb-4 uppercase tracking-widest">
                            // Initialize Scenario Parameters
                        </label>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {PRESET_SCENARIOS.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => { setInput(s.text[currentLang]); analyzeScenario(s.text[currentLang]); }}
                                    className="px-3 py-1.5 rounded border border-emerald-500/30 text-xs hover:bg-emerald-500/10 transition-colors text-emerald-300/80"
                                >
                                    LOAD_PRESET: {s.id.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && analyzeScenario(input)}
                                placeholder={currentLang === 'ar' ? "أدخل موقفاً لتحليله..." : "Enter scenario to analyze..."}
                                className="flex-grow bg-[#050505] border border-emerald-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all font-sans"
                                dir={dir}
                            />
                            <button 
                                onClick={() => analyzeScenario(input)}
                                disabled={loading || !input}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:shadow-none"
                            >
                                {loading ? 'PROCESSING...' : 'ANALYZE'}
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                <BrainIcon className="absolute inset-0 m-auto w-10 h-10 text-emerald-500 animate-pulse" />
                            </div>
                            <div className="text-emerald-500/70 text-xs tracking-[0.2em] animate-pulse">
                                RUNNING_MCTS_SIMULATION...
                            </div>
                        </div>
                    )}

                    {/* Results Display */}
                    {!loading && parsedData && (
                        <div className="flex flex-col gap-6 animate-fade-in">
                            
                            {/* State Analysis */}
                            <div className="bg-[#0f172a] border-l-4 border-blue-500 rounded-r-xl p-6 shadow-lg">
                                <h3 className="text-blue-400 text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    State Analysis
                                </h3>
                                <p className="text-white/90 leading-relaxed whitespace-pre-line font-sans">{parsedData.stateAnalysis}</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Top Moves */}
                                <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <BrainIcon className="w-24 h-24" />
                                    </div>
                                    <h3 className="text-emerald-400 text-sm font-bold mb-4 uppercase tracking-wider">Top Moves Calculation</h3>
                                    <div className="text-white/80 text-sm space-y-4 font-sans">
                                        {parsedData.topMoves.split('\n').map((move: string, idx: number) => (
                                            <div key={idx} className="border-b border-white/5 pb-2 last:border-0">
                                                {move}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* MCTS Summary */}
                                <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">
                                    <h3 className="text-purple-400 text-sm font-bold mb-4 uppercase tracking-wider">MCTS Engine Summary</h3>
                                    <div className="font-mono text-xs text-purple-200/80 bg-black/30 p-4 rounded-lg border border-purple-500/20">
                                        {parsedData.mctsSummary}
                                    </div>
                                </div>
                            </div>

                            {/* Best Move */}
                            <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-500/50 rounded-2xl p-8 text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-amber-500 text-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                                        <SparklesIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-amber-400 font-bold text-lg mb-2 uppercase tracking-[0.2em]">Optimal Strategy Selected</h3>
                                    <p className="text-white text-xl md:text-2xl font-bold font-amiri leading-relaxed">
                                        {parsedData.bestMove}
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
