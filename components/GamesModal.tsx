
import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { GameIcon } from './icons/GameIcon';
import { FursanAlDhadGame } from './games/FursanAlDhadGame';
import { MemoryGame } from './games/MemoryGame';
import { MosqueBuilderGame } from './games/MosqueBuilderGame';
import { QuranMemorizationGame } from './games/QuranMemorizationGame';
import { HadithGame } from './games/HadithGame';
import { ChampionsPathGame } from './games/ChampionsPathGame';
import { WorldInYourHandsGame } from './games/WorldInYourHandsGame';
import { GuardiansOfPurityGame } from './games/GuardiansOfPurityGame';
import { NeuroFiqhGame } from './games/NeuroFiqhGame';
import { StrategicMindGame } from './games/StrategicMindGame';
import { BrainIcon } from './icons/EmotionIcons';
import { MosqueIcon } from './icons/MosqueIcon';
import { QuranIcon } from './icons/QuranIcon';
import { CrownIcon } from './icons/CrownIcon';
import { GlobeHandIcon } from './icons/GlobeHandIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { GridIcon } from './icons/GridIcon';

interface GamesModalProps {
  onClose: () => void;
  currentLang: Language;
}

const ScrollIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a5 5 0 0 1 5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M15 9h-10" />
        <path d="M15 14h-10" />
    </svg>
);

export const GamesModal: React.FC<GamesModalProps> = ({ onClose, currentLang }) => {
  const [activeGame, setActiveGame] = useState<'menu' | 'fursan' | 'memory' | 'mosque' | 'quran' | 'hadith' | 'champion' | 'world' | 'guardians' | 'neuro' | 'strategy'>('menu');
  const t = translations[currentLang].ui.games;
  const dir = translations[currentLang].direction;

  // Render Content Switcher
  const renderContent = () => {
      switch (activeGame) {
          case 'fursan':
              return <FursanAlDhadGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'memory':
              return <MemoryGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'mosque':
              return <MosqueBuilderGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'quran':
              return <QuranMemorizationGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'hadith':
              return <HadithGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'champion':
              return <ChampionsPathGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'world':
              return <WorldInYourHandsGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'guardians':
              return <GuardiansOfPurityGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'neuro':
              return <NeuroFiqhGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'strategy':
              return <StrategicMindGame onBack={() => setActiveGame('menu')} currentLang={currentLang} dir={dir} />;
          case 'menu':
          default:
              return renderMenu();
      }
  };

  const renderMenu = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 animate-fade-in">
          
          {/* NEW: Strategic Mind */}
          <button 
              onClick={() => setActiveGame('strategy')}
              className="group relative bg-black border border-emerald-500/50 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden col-span-1 md:col-span-2"
          >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-[100%] group-hover:animate-shine"></div>
              
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-500 text-emerald-400">
                  <GridIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-amiri mb-2 group-hover:text-emerald-300 transition-colors">
                  {currentLang === 'ar' ? 'العقل الاستراتيجي' : 'Strategic Mind'}
              </h3>
              <p className="text-emerald-200/60 text-sm mb-6 max-w-md mx-auto">
                  {currentLang === 'ar' ? 'محاكي ذكاء اصطناعي لتحليل المواقف واتخاذ القرارات' : 'AI Simulator for strategic analysis and decision making'}
              </p>
              
              <div className="mt-auto px-8 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-bold text-sm shadow-lg transition-colors border border-emerald-400/50">
                  {t.startGame}
              </div>
          </button>

          {/* FEATURED GAME: NeuroFiqh Simulator */}
          <button 
              onClick={() => setActiveGame('neuro')}
              className="group relative bg-[#020617] border border-indigo-500/50 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden col-span-1 md:col-span-2"
          >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
              <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">SIMULATION</div>

              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-transform duration-500 text-indigo-400">
                  <BrainIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-amiri mb-2 group-hover:text-indigo-300 transition-colors">{t.neuroGame}</h3>
              <p className="text-indigo-200/60 text-sm mb-6 max-w-md mx-auto">{t.neuroDesc}</p>
              
              <div className="mt-auto px-8 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-bold text-sm shadow-lg transition-colors border border-indigo-400/50">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card: Guardians */}
          <button 
              onClick={() => setActiveGame('guardians')}
              className="group relative bg-gradient-to-br from-[#0f172a] to-[#312e81] border border-indigo-500/30 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow"></div>
              
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform duration-500 text-indigo-300">
                  <ShieldCheckIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-indigo-300 transition-colors">{t.guardiansGame}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.guardiansDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card: World In Your Hands */}
          <button 
              onClick={() => setActiveGame('world')}
              className="group relative bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-500/30 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform duration-500 text-cyan-300">
                  <GlobeHandIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-cyan-300 transition-colors">{t.worldGame}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.worldGameDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card 1: Fursan Al Dhad */}
          <button 
              onClick={() => setActiveGame('fursan')}
              className="group relative bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform duration-500">
                  <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-indigo-300 transition-colors">{t.fursanAlDhad}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.fursanDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card 2: Memory Game */}
          <button 
              onClick={() => setActiveGame('memory')}
              className="group relative bg-gradient-to-br from-emerald-900 to-teal-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500 text-emerald-300">
                  <BrainIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-emerald-300 transition-colors">{t.memoryGame}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.memoryDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card 3: Mosque Builder */}
          <button 
              onClick={() => setActiveGame('mosque')}
              className="group relative bg-gradient-to-br from-amber-900 to-orange-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform duration-500 text-amber-300">
                  <MosqueIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-amber-300 transition-colors">{t.mosqueBuilder}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.mosqueBuilderDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card 4: Hafiz Al Quran */}
          <button 
              onClick={() => setActiveGame('quran')}
              className="group relative bg-gradient-to-br from-teal-900 to-cyan-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(45,212,191,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.3)] group-hover:scale-110 transition-transform duration-500 text-teal-300">
                  <QuranIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-teal-300 transition-colors">{t.quranMemorization}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.quranMemorizationDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card 5: Hadith Treasures */}
          <button 
              onClick={() => setActiveGame('hadith')}
              className="group relative bg-gradient-to-br from-amber-800 to-yellow-800 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(234,179,8,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:scale-110 transition-transform duration-500 text-yellow-400">
                  <ScrollIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-yellow-300 transition-colors">{t.hadithGame}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.hadithGameDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>

          {/* Game Card 6: Champion's Path */}
          <button 
              onClick={() => setActiveGame('champion')}
              className="group relative bg-gradient-to-br from-orange-900 to-red-900 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
              
              <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform duration-500 text-orange-400">
                  <CrownIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white font-amiri mb-2 group-hover:text-orange-300 transition-colors">{t.championsPath}</h3>
              <p className="text-white/60 text-xs mb-4 line-clamp-2">{t.championsPathDesc}</p>
              
              <div className="mt-auto px-6 py-2 bg-orange-600 hover:bg-orange-500 rounded-full text-white font-bold text-xs shadow-lg transition-colors w-full">
                  {t.startGame}
              </div>
          </button>
      </div>
  );

  return (
    <div 
        className="fixed inset-0 z-[60] bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in font-cairo"
        onClick={onClose}
        dir={dir}
    >
        <div 
            className="bg-[#0a0a0a] border border-indigo-500/30 rounded-[2.5rem] w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] relative"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#1e1b4b] to-[#0f172a] shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <GameIcon className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300 tracking-wide font-amiri">
                            {t.gamesLibrary}
                        </h2>
                        <p className="text-xs text-indigo-300/60 font-medium mt-1 tracking-widest uppercase">Premium Islamic Education</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-opacity-5">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#020617] opacity-90"></div>
                
                <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                    {renderContent()}
                </div>
            </div>
        </div>
        <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            @keyframes shine { 100% { left: 125%; } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            .group-hover\\:animate-shine:hover { animation: shine 0.75s; }
        `}</style>
    </div>
  );
};
