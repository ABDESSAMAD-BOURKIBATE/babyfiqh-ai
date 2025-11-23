
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { Language, translations } from '../utils/translations';
import { LogoIcon } from './icons/LogoIcon';

interface CovenantModalProps {
  onAccept: () => void;
  currentLang: Language;
}

// Islamic Geometric Pattern SVG Background - Enhanced
const PatternBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none mix-blend-overlay" width="100%" height="100%">
    <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M0 0L40 40M40 0L0 40" stroke="currentColor" strokeWidth="0.2" opacity="0.5"/>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" />
  </svg>
);

export const CovenantModal: React.FC<CovenantModalProps> = ({ onAccept, currentLang }) => {
  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040a] transition-all duration-500">
      
      {/* Professional Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617]"></div>
      
      {/* Animated Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

      {/* Modal Container - Glassmorphism Professional */}
      <div 
        className="relative w-full max-w-2xl bg-[#0f172a]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-fade-in"
        dir={dir}
      >
        <PatternBackground />
        
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        {/* Ornamental Golden Line Top */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

        <div className="relative z-10 flex flex-col h-full max-h-[90vh]">
            
            {/* Content Scroll Area */}
            <div className="overflow-y-auto custom-scrollbar px-8 md:px-12 pb-6 pt-10 flex-grow">
                
                <div className="flex flex-col items-center text-center mt-4">
                    {/* Logo Container with Glow */}
                    <div className="relative mb-8 group">
                         <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover:bg-amber-500/30 transition-all duration-500"></div>
                         <div className="relative w-24 h-24 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl flex items-center justify-center shadow-2xl border border-amber-500/20 rotate-3 transform group-hover:rotate-0 transition-transform duration-500">
                            <LogoIcon className="w-14 h-14 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                         </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 font-cairo mb-4 drop-shadow-sm tracking-wide">
                        {t.covenantTitle}
                    </h1>
                    
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full opacity-60 mb-10"></div>

                    {/* Covenant Text Card - Premium Look */}
                    <div className="relative w-full group">
                        {/* Card Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                        
                        <div className="relative bg-[#0f172a]/80 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
                            {/* Decorative Corners */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 rounded-tl-sm"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 rounded-tr-sm"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl-sm"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 rounded-br-sm"></div>

                            <div className="mb-6 text-emerald-400 font-amiri text-xl md:text-2xl leading-relaxed drop-shadow-md opacity-90 text-center">
                            ﷽
                            </div>

                            <p className="text-lg md:text-2xl leading-[2.2] text-slate-200 font-amiri text-justify font-medium px-2">
                                {t.covenantBody}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer - Enhanced Button */}
            <div className="p-8 md:p-10 bg-gradient-to-t from-[#020617] via-[#0f172a]/90 to-transparent flex flex-col items-center justify-center relative z-20 mt-[-20px]">
                <button
                    onClick={onAccept}
                    className="group relative w-full md:w-auto min-w-[280px] py-4 px-10 rounded-full font-bold text-lg md:text-xl overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95"
                >
                    {/* Button Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Shine Animation */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-3 text-white font-cairo tracking-wide drop-shadow-md">
                        {t.covenantButton}
                        <SparklesIcon className="w-6 h-6 text-emerald-200 animate-pulse" />
                    </span>
                </button>
                
                <p className="text-slate-500 text-[10px] font-cairo mt-6 opacity-60 hover:opacity-80 transition-opacity">
                    {t.rights}
                </p>
            </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes shine {
            100% { left: 125%; }
        }
        .group-hover\\:animate-shine:hover {
            animation: shine 0.75s;
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.15; transform: scale(1.1); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
