
import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../../utils/translations';
import { ArrowIcon } from '../LandingPage';
import { brainNodes, neuroScenarios, BrainNode } from '../../utils/neuroGameData';
import { SparklesIcon } from '../icons/SparklesIcon';

interface NeuroFiqhGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

// --- Visual Components ---

const BrainNodeVisual: React.FC<{ node: BrainNode; isActive: boolean }> = ({ node, isActive }) => {
    // Calculate color based on value (0=Dark Grey, 100=Gold/Neon)
    const getGlow = (val: number) => `0 0 ${val / 2}px ${val > 50 ? '#fbbf24' : '#ef4444'}`;
    const getColor = (val: number) => val > 50 ? '#fbbf24' : '#374151'; // Amber vs Gray

    return (
        <g className="transition-all duration-1000 ease-in-out">
            {/* Glow Effect */}
            <circle 
                cx={node.x + '%'} 
                cy={node.y + '%'} 
                r={isActive ? 6 : 4} 
                fill={getColor(node.value)} 
                fillOpacity={0.3}
                filter={`drop-shadow(${getGlow(node.value)})`}
                className="animate-pulse"
            />
            {/* Core Node */}
            <circle 
                cx={node.x + '%'} 
                cy={node.y + '%'} 
                r={isActive ? 3 : 2} 
                fill={node.value > 50 ? '#fff' : '#9ca3af'} 
            />
            {/* Label */}
            <text 
                x={node.x + '%'} 
                y={(node.y + 5) + '%'} 
                textAnchor="middle" 
                fill="white" 
                fontSize="3" 
                className="font-amiri opacity-80"
            >
                {node.label['ar']} {/* Defaulting to AR for aesthetic, or use currentLang */}
            </text>
        </g>
    );
};

const ConnectionLine: React.FC<{ start: BrainNode; end: BrainNode; active: boolean }> = ({ start, end, active }) => {
    return (
        <line 
            x1={start.x + '%'} 
            y1={start.y + '%'} 
            x2={end.x + '%'} 
            y2={end.y + '%'} 
            stroke={active ? '#fbbf24' : '#334155'} 
            strokeWidth={active ? 0.5 : 0.2} 
            opacity={active ? 0.8 : 0.3}
            className="transition-all duration-1000"
        />
    );
};

// --- Main Component ---

export const NeuroFiqhGame: React.FC<NeuroFiqhGameProps> = ({ onBack, currentLang, dir }) => {
    const [nodes, setNodes] = useState(brainNodes);
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [gameState, setGameState] = useState<'analysis' | 'decision' | 'feedback'>('analysis');
    const [lastFeedback, setLastFeedback] = useState<string>('');
    const [aiLog, setAiLog] = useState<string>(''); // The AlphaGo thought stream

    const t = translations[currentLang].ui.games;

    // Simulate "AI Analysis" Phase
    useEffect(() => {
        if (gameState === 'analysis') {
            const scenario = neuroScenarios[currentScenarioIndex];
            
            // Generate AlphaGo-style analysis
            const calculateWinProb = (choiceIndex: number) => {
                // Heuristic: Positive impact choices have higher win probability
                const impact = scenario.choices[choiceIndex].impact;
                const netImpact = impact.reduce((sum, i) => sum + i.amount, 0);
                return netImpact > 0 ? (85 + Math.random() * 14).toFixed(1) : (5 + Math.random() * 15).toFixed(1);
            };

            const topMovesText = scenario.choices.map((c, i) => 
                `   ${i + 1}. Move "${c.text['en'].substring(0, 15)}..." -> Win Prob: ${calculateWinProb(i)}%`
            ).join('\n');

            const analysisLines = [
                `[State Analysis: Initialized Scenario "${scenario.title['en']}". Neural Topology: Stable.]`,
                `[Top Moves Calculated]:\n${topMovesText}`,
                `[MCTS Summary: 10,000 Rollouts. Policy Prior (P): Balanced. Visit Count (N): High.]`,
                `[Best Move: Pending Human Input...]`
            ];
            
            let currentLineIndex = 0;
            let currentCharIndex = 0;
            setAiLog('');

            const typeWriter = setInterval(() => {
                if (currentLineIndex < analysisLines.length) {
                    const currentString = analysisLines[currentLineIndex];
                    
                    if (currentCharIndex < currentString.length) {
                        setAiLog(prev => {
                            // If we are starting a new line, add newline if prev is not empty
                            const isNewLine = currentCharIndex === 0 && prev !== '';
                            return prev + (isNewLine ? '\n' : '') + currentString[currentCharIndex];
                        });
                        currentCharIndex++;
                    } else {
                        currentLineIndex++;
                        currentCharIndex = 0;
                    }
                } else {
                    clearInterval(typeWriter);
                    setTimeout(() => setGameState('decision'), 1000);
                }
            }, 20); // Typing speed

            return () => clearInterval(typeWriter);
        }
    }, [gameState, currentScenarioIndex]);

    const handleChoice = (choiceIndex: number) => {
        const scenario = neuroScenarios[currentScenarioIndex];
        const choice = scenario.choices[choiceIndex];

        // 1. Show AI evaluation of the move
        setAiLog(prev => prev + `\n\n[User Selection: Option ${choiceIndex + 1}]\n[Executing Strategy...]\n[${choice.aiAnalysis}]\n[Rewiring Brain Architecture...]`);

        // 2. Apply Effects
        const newNodes = nodes.map(node => {
            const impact = choice.impact.find(i => i.nodeId === node.id);
            if (impact) {
                // Clamp value between 0 and 100
                return { ...node, value: Math.min(100, Math.max(0, node.value + impact.amount)) };
            }
            return node;
        });
        
        setNodes(newNodes);
        setLastFeedback(choice.feedback[currentLang]);
        setGameState('feedback');
    };

    const nextTurn = () => {
        if (currentScenarioIndex < neuroScenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
            setGameState('analysis');
        } else {
            // End of Demo for now
            onBack();
        }
    };

    const currentScenario = neuroScenarios[currentScenarioIndex];

    return (
        <div className="flex flex-col h-full relative bg-[#020617] text-white font-mono overflow-hidden">
            
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-white/10 z-10 bg-[#020617]/80 backdrop-blur">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 text-white">
                    <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <h2 className="text-sm md:text-base font-bold text-emerald-400 font-mono tracking-widest">NEURO_FIQH_SIM</h2>
                </div>
                <div className="w-5"></div>
            </div>

            {/* Main Visual Area (The Brain) */}
            <div className="flex-grow relative">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" 
                     style={{backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                </div>

                <svg className="w-full h-full absolute inset-0 pointer-events-none">
                    {/* Connections */}
                    {nodes.map(node => 
                        node.connections.map(targetId => {
                            const target = nodes.find(n => n.id === targetId);
                            if (!target) return null;
                            return <ConnectionLine key={`${node.id}-${target.id}`} start={node} end={target} active={node.value > 50 && target.value > 50} />;
                        })
                    )}
                    {/* Nodes */}
                    {nodes.map(node => (
                        <BrainNodeVisual key={node.id} node={node} isActive={true} />
                    ))}
                </svg>

                {/* AI Log Terminal (The "Thinking" Display) */}
                <div className={`absolute left-4 right-4 md:right-auto md:max-w-md bg-black/80 border border-emerald-500/30 p-4 rounded-lg text-[10px] md:text-xs text-emerald-300 font-mono leading-relaxed shadow-[0_0_20px_rgba(16,185,129,0.1)] z-20 overflow-y-auto custom-scrollbar transition-all duration-500 ease-in-out ${gameState === 'analysis' ? 'top-4 bottom-4' : 'top-4 h-32'}`}>
                    <div className="opacity-50 text-[8px] mb-1 border-b border-emerald-500/20 pb-1 flex justify-between">
                        <span>SYS_LOG_STREAM</span>
                        <span>MCTS_ENGINE_V4</span>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono">{aiLog}</pre>
                    {gameState === 'analysis' && <span className="animate-pulse inline-block w-2 h-3 bg-emerald-500 align-middle ml-1"></span>}
                </div>
            </div>

            {/* Interaction Panel */}
            <div className="min-h-[45%] bg-[#0f172a] border-t border-emerald-500/30 p-6 rounded-t-[2rem] shadow-[0_-10px_50px_rgba(0,0,0,0.7)] relative z-20 flex flex-col justify-center">
                
                {gameState === 'analysis' && (
                    <div className="flex flex-col items-center justify-center h-full text-emerald-500 animate-pulse">
                        <SparklesIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-sm uppercase tracking-widest font-bold">Processing Neural State...</p>
                    </div>
                )}

                {gameState === 'decision' && (
                    <div className="animate-fade-in-up w-full max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white font-amiri">{currentScenario.title[currentLang]}</h3>
                            <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-1 rounded border border-white/10">SCENARIO_0{currentScenarioIndex + 1}</span>
                        </div>
                        <p className="text-gray-300 mb-8 text-lg leading-relaxed font-amiri border-l-2 border-emerald-500/50 pl-4">
                            {currentScenario.description[currentLang]}
                        </p>
                        <div className="grid gap-3">
                            {currentScenario.choices.map((choice, idx) => (
                                <button
                                    key={choice.id}
                                    onClick={() => handleChoice(idx)}
                                    className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-900/20 hover:border-emerald-500/50 transition-all duration-300 flex justify-between items-center group active:scale-[0.98]"
                                >
                                    <span className="text-white font-bold group-hover:text-emerald-300 font-cairo">{choice.text[currentLang]}</span>
                                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors shadow-[0_0_5px_currentColor]"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'feedback' && (
                    <div className="animate-fade-in h-full flex flex-col justify-center items-center text-center w-full max-w-md mx-auto">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/50 mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                            <SparklesIcon className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 font-mono tracking-wide">NEURAL_UPDATE_COMPLETE</h3>
                        <p className="text-gray-300 mb-8 text-lg font-amiri">{lastFeedback}</p>
                        <button 
                            onClick={nextTurn}
                            className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-emerald-500/25"
                        >
                            {t.next}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
