
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
      <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M0 0L40 40M40 0L0 40" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" />
  </svg>
);

export const CovenantModal: React.FC<CovenantModalProps> = ({ onAccept, currentLang }) => {
  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 transition-all duration-500">

      {/* Enhanced Vibrant Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-amber-950/20 to-transparent"></div>

      {/* Enhanced Animated Ambient Orbs with More Vibrant Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[5%] w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/20 to-teal-500/15 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-15%] right-[5%] w-[700px] h-[700px] bg-gradient-to-tl from-amber-500/20 to-orange-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[35%] left-[55%] w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/15 to-purple-500/10 rounded-full blur-[90px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>

      {/* Subtle Star Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
              <circle cx="60" cy="30" r="0.5" fill="white" opacity="0.4" />
              <circle cx="30" cy="70" r="1.5" fill="white" opacity="0.2" />
              <circle cx="80" cy="80" r="0.8" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      {/* Modal Container - Enhanced Glassmorphism with Vibrant Accents */}
      <div
        className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900/70 via-indigo-950/60 to-slate-900/70 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-[0_0_100px_rgba(99,102,241,0.3),0_0_60px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col animate-fade-in"
        dir={dir}
      >
        <PatternBackground />

        {/* Enhanced Inner Glow with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-amber-500/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

        {/* Enhanced Ornamental Lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 through-amber-400/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 through-emerald-400/60 to-transparent"></div>

        <div className="relative z-10 flex flex-col h-full max-h-[90vh]">

          {/* Content Scroll Area */}
          <div className="overflow-y-auto custom-scrollbar px-8 md:px-12 pb-6 pt-10 flex-grow">

            <div className="flex flex-col items-center text-center mt-4">
              {/* Enhanced Moon & Star Icon Container with Premium Glow */}
              <div className="relative mb-8 group">
                {/* Multi-layer Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-yellow-500/20 blur-2xl rounded-full group-hover:from-amber-400/40 group-hover:to-yellow-500/30 transition-all duration-500 animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-emerald-400/20 to-teal-500/15 blur-xl rounded-full group-hover:from-emerald-400/30 group-hover:to-teal-500/25 transition-all duration-500"></div>

                {/* Icon Container with Enhanced Design */}
                <div className="relative w-28 h-28 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4),0_0_20px_rgba(245,158,11,0.3)] border-2 border-amber-400/30 rotate-3 transform group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                  {/* Enhanced Moon and Star Icon */}
                  <svg className="w-16 h-16 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Crescent Moon with Gradient */}
                    <defs>
                      <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FCD34D" />
                        <stop offset="50%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEF3C7" />
                        <stop offset="50%" stopColor="#FCD34D" />
                        <stop offset="100%" stopColor="#FBBF24" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Crescent Moon */}
                    <path d="M28 8C28 18.5 19.5 27 9 27C11 27 13 26.5 14.8 25.6C21.5 22.5 26 15.5 26 8C26 6 25.7 4.1 25.1 2.3C26.3 2.1 27.6 2 29 2C28.3 4 28 6 28 8Z" fill="url(#moonGradient)" filter="url(#glow)" transform="translate(10, 10) scale(1.3)" />

                    {/* Bright Star */}
                    <path d="M48 16L49.5 20.5L54 22L49.5 23.5L48 28L46.5 23.5L42 22L46.5 20.5Z" fill="url(#starGradient)" filter="url(#glow)">
                      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                    </path>

                    {/* Small Twinkling Stars */}
                    <circle cx="52" cy="12" r="1.5" fill="#FEF3C7" opacity="0.8">
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="44" cy="32" r="1" fill="#FCD34D" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 font-cairo mb-4 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] tracking-wide animate-text-shimmer">
                {t.covenantTitle}
              </h1>

              <div className="relative w-40 h-1 mb-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full opacity-70 blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-80"></div>
              </div>

              {/* Enhanced Covenant Text Card - Ultra Premium Look */}
              <div className="relative w-full group">
                {/* Multi-layer Card Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-teal-500/25 to-emerald-500/30 rounded-2xl blur-md opacity-60 group-hover:opacity-90 transition duration-1000 animate-pulse-slow"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-l from-amber-500/25 via-yellow-500/20 to-amber-500/25 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>

                <div className="relative bg-gradient-to-br from-slate-900/90 via-indigo-950/85 to-slate-900/90 border-2 border-white/15 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(99,102,241,0.2)] backdrop-blur-md">
                  {/* Enhanced Decorative Corners with Glow */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-md shadow-[0_0_10px_rgba(52,211,153,0.4)]"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/60 rounded-tr-md shadow-[0_0_10px_rgba(251,191,36,0.4)]"></div>
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/60 rounded-bl-md shadow-[0_0_10px_rgba(251,191,36,0.4)]"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-emerald-400/60 rounded-br-md shadow-[0_0_10px_rgba(52,211,153,0.4)]"></div>

                  {/* Corner Accent Dots */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-emerald-400/80 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400/80 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-amber-400/80 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-emerald-400/80 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>

                  <div className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 font-amiri text-xl md:text-2xl leading-relaxed drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] opacity-95 text-center">
                    ﷽
                  </div>

                  <p className="text-lg md:text-2xl leading-[2.2] text-slate-100 font-amiri text-justify font-medium px-2 drop-shadow-sm">
                    {t.covenantBody}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer - Ultra Premium Button */}
          <div className="p-8 md:p-10 bg-gradient-to-t from-slate-950 via-indigo-950/80 to-transparent flex flex-col items-center justify-center relative z-20 mt-[-20px]">
            <button
              onClick={onAccept}
              className="group relative w-full md:w-auto min-w-[300px] py-5 px-12 rounded-full font-bold text-lg md:text-xl overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.3),0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5),0_0_30px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95"
            >
              {/* Enhanced Button Background with Gradient Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 opacity-95 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Enhanced Shine Animation */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:animate-shine" />

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
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes text-shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-text-shimmer {
            background-size: 200% auto;
            animation: text-shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
