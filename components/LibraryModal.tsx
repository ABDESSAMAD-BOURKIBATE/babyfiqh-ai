
import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { 
    prophets, companions, sahabiyat, tabiin, atbaTabiin, scholars, 
    fiqhIbadat, fiqhMuamalat, fiqhFamily, fiqhJinayat, fiqhJudiciary, 
    fiqhPolitics, fiqhEthics, fiqhNawazil, fiqhTech, fiqhCyber,
    LibraryItem 
} from '../utils/libraryData';
import { XIcon } from './icons/XIcon';
import { MizanIcon } from './icons/MizanIcon';

interface LibraryModalProps {
  onClose: () => void;
  onSelect: (item: LibraryItem) => void;
  currentLang: Language;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const LibraryModal: React.FC<LibraryModalProps> = ({ onClose, onSelect, currentLang }) => {
  const [activeTab, setActiveTab] = useState<'prophets' | 'companions' | 'sahabiyat' | 'tabiin' | 'atba_tabiin' | 'scholars' | 'fiqh'>('prophets');
  const [searchQuery, setSearchQuery] = useState('');
  
  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;

  const handleTabChange = (tab: typeof activeTab) => {
      setActiveTab(tab);
      setSearchQuery('');
  };

  // Helper to get items based on tab
  const getItems = () => {
      if (activeTab === 'companions') return companions;
      if (activeTab === 'sahabiyat') return sahabiyat;
      if (activeTab === 'tabiin') return tabiin;
      if (activeTab === 'atba_tabiin') return atbaTabiin;
      if (activeTab === 'scholars') return scholars;
      if (activeTab === 'fiqh') return []; // Handled separately
      return prophets;
  };

  const items = getItems();

  // Filter items based on search query
  const filteredItems = items.filter(item => 
      item.names[currentLang].toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Theme Colors based on Active Tab
  const getTabStyles = (tab: 'prophets' | 'companions' | 'sahabiyat' | 'tabiin' | 'atba_tabiin' | 'scholars' | 'fiqh') => {
      if (tab === 'prophets') return {
          activeText: 'text-amber-400',
          activeBg: 'bg-white/5',
          bar: 'bg-amber-400',
          hover: 'hover:text-amber-300',
          card: 'bg-amber-900/20 hover:bg-amber-900/40 hover:border-amber-500/50',
          iconBg: 'bg-amber-500/20 text-amber-400'
      };
      if (tab === 'companions') return {
          activeText: 'text-emerald-400',
          activeBg: 'bg-white/5',
          bar: 'bg-emerald-400',
          hover: 'hover:text-emerald-300',
          card: 'bg-emerald-900/20 hover:bg-emerald-900/40 hover:border-emerald-500/50',
          iconBg: 'bg-emerald-500/20 text-emerald-400'
      };
      if (tab === 'sahabiyat') return {
          activeText: 'text-pink-400',
          activeBg: 'bg-white/5',
          bar: 'bg-pink-400',
          hover: 'hover:text-pink-300',
          card: 'bg-pink-900/20 hover:bg-pink-900/40 hover:border-pink-500/50',
          iconBg: 'bg-pink-500/20 text-pink-400'
      };
      if (tab === 'tabiin') return {
          activeText: 'text-indigo-400',
          activeBg: 'bg-white/5',
          bar: 'bg-indigo-400',
          hover: 'hover:text-indigo-300',
          card: 'bg-indigo-900/20 hover:bg-indigo-900/40 hover:border-indigo-500/50',
          iconBg: 'bg-indigo-500/20 text-indigo-400'
      };
      if (tab === 'atba_tabiin') return {
          activeText: 'text-cyan-400',
          activeBg: 'bg-white/5',
          bar: 'bg-cyan-400',
          hover: 'hover:text-cyan-300',
          card: 'bg-cyan-900/20 hover:bg-cyan-900/40 hover:border-cyan-500/50',
          iconBg: 'bg-cyan-500/20 text-cyan-400'
      };
      if (tab === 'scholars') return {
          activeText: 'text-violet-400',
          activeBg: 'bg-white/5',
          bar: 'bg-violet-400',
          hover: 'hover:text-violet-300',
          card: 'bg-violet-900/20 hover:bg-violet-900/40 hover:border-violet-500/50',
          iconBg: 'bg-violet-500/20 text-violet-400'
      };
      // Fiqh - Teal Theme
      return {
          activeText: 'text-teal-400',
          activeBg: 'bg-white/5',
          bar: 'bg-teal-400',
          hover: 'hover:text-teal-300',
          card: 'bg-teal-900/20 hover:bg-teal-900/40 hover:border-teal-500/50',
          iconBg: 'bg-teal-500/20 text-teal-400'
      };
  };

  const currentStyle = getTabStyles(activeTab);

  const getTypeName = (item: LibraryItem) => {
      switch (item.type) {
          case 'prophet': return t.prophets;
          case 'companion': return t.companions;
          case 'sahabiyat': return t.sahabiyat;
          case 'tabiin': return t.tabiin;
          case 'atba_tabiin': return t.atbaTabiin;
          case 'scholar': return t.scholars;
          case 'fiqh_ibadat': return t.fiqhIbadat;
          case 'fiqh_muamalat': return t.fiqhMuamalat;
          case 'fiqh_family': return t.fiqhFamily;
          case 'fiqh_jinayat': return t.fiqhJinayat;
          case 'fiqh_judiciary': return t.fiqhJudiciary;
          case 'fiqh_politics': return t.fiqhPolitics;
          case 'fiqh_ethics': return t.fiqhEthics;
          case 'fiqh_nawazil': return t.fiqhNawazil;
          case 'fiqh_tech': return t.fiqhTech;
          case 'fiqh_cyber': return t.fiqhCyber;
          default: return '';
      }
  };
  
  // Configuration for Fiqh Sections
  const fiqhSections = [
      { title: t.fiqhIbadat, data: fiqhIbadat, color: 'teal' },
      { title: t.fiqhMuamalat, data: fiqhMuamalat, color: 'emerald' },
      { title: t.fiqhEthics, data: fiqhEthics, color: 'lime' },
      { title: t.fiqhFamily, data: fiqhFamily, color: 'rose' },
      { title: t.fiqhJinayat, data: fiqhJinayat, color: 'red' },
      { title: t.fiqhJudiciary, data: fiqhJudiciary, color: 'slate' },
      { title: t.fiqhPolitics, data: fiqhPolitics, color: 'blue' },
      { title: t.fiqhNawazil, data: fiqhNawazil, color: 'amber' },
      { title: t.fiqhTech, data: fiqhTech, color: 'cyan' },
      { title: t.fiqhCyber, data: fiqhCyber, color: 'indigo' },
  ];

  // Filter Fiqh sections based on search query
  const filteredFiqhSections = fiqhSections.map(section => ({
      ...section,
      data: section.data.filter(item => item.names[currentLang].toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(section => section.data.length > 0);

  // Helper to get color class
  const getColorClasses = (color: string) => {
      return {
          text: `text-${color}-200`,
          bgIcon: `bg-${color}-500/20`,
          textIcon: `text-${color}-400`,
          card: `bg-${color}-900/20 hover:bg-${color}-900/40 hover:border-${color}-500/50`
      };
  };

  return (
    <div 
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
        dir={dir}
    >
        <div 
            className="bg-[#0f172a] border border-white/20 rounded-3xl w-full max-w-6xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header with Search */}
            <div className="p-6 flex flex-col gap-4 border-b border-white/10 bg-white/5 shrink-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white font-cairo flex items-center gap-2">
                        {t.library}
                    </h2>
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Search Input */}
                <div className="relative w-full">
                    <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                        <SearchIcon className="w-5 h-5" />
                    </div>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={currentLang === 'ar' ? "بحث..." : (currentLang === 'zgh' ? "ⴰⵔⵣⵣⵓ..." : "Search...")} 
                        className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all
                            ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                        `}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-4' : 'right-4'} text-white/40 hover:text-white`}
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-b border-white/10 overflow-x-auto custom-scrollbar shrink-0 bg-black/20">
                <button 
                    onClick={() => handleTabChange('prophets')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none
                        ${activeTab === 'prophets' ? 'text-amber-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    {t.prophets}
                    {activeTab === 'prophets' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>}
                </button>
                <button 
                    onClick={() => handleTabChange('companions')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none
                        ${activeTab === 'companions' ? 'text-emerald-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    {t.companions}
                    {activeTab === 'companions' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>}
                </button>
                 <button 
                    onClick={() => handleTabChange('sahabiyat')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none
                        ${activeTab === 'sahabiyat' ? 'text-pink-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    {t.sahabiyat}
                    {activeTab === 'sahabiyat' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.5)]"></div>}
                </button>
                <button 
                    onClick={() => handleTabChange('tabiin')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none
                        ${activeTab === 'tabiin' ? 'text-indigo-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    {t.tabiin}
                    {activeTab === 'tabiin' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>}
                </button>
                <button 
                    onClick={() => handleTabChange('atba_tabiin')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none
                        ${activeTab === 'atba_tabiin' ? 'text-cyan-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    {t.atbaTabiin}
                    {activeTab === 'atba_tabiin' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>}
                </button>
                <button 
                    onClick={() => handleTabChange('scholars')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none
                        ${activeTab === 'scholars' ? 'text-violet-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    {t.scholars}
                    {activeTab === 'scholars' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]"></div>}
                </button>
                <button 
                    onClick={() => handleTabChange('fiqh')}
                    className={`shrink-0 px-6 py-4 font-bold text-lg transition-all relative whitespace-nowrap outline-none flex items-center gap-2
                        ${activeTab === 'fiqh' ? 'text-teal-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                >
                    <MizanIcon className="w-5 h-5" />
                    {t.fiqh}
                    {activeTab === 'fiqh' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>}
                </button>
            </div>

            {/* Content Grid */}
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-[#0f172a]">
                
                {activeTab === 'fiqh' ? (
                    <div className="flex flex-col gap-10 pb-8">
                        {filteredFiqhSections.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-10">
                                {filteredFiqhSections.map((section, idx) => {
                                    const colors = getColorClasses(section.color);
                                    return (
                                        <div key={idx} className="animate-fade-in" style={{animationDelay: `${0.1 * (idx + 1)}s`}}>
                                            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2 font-cairo ${colors.text}`}>
                                                <span className={`p-1.5 rounded-lg ${colors.bgIcon} ${colors.textIcon}`}>
                                                    <MizanIcon className="w-5 h-5"/>
                                                </span>
                                                {section.title}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {section.data.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => onSelect(item)}
                                                        className={`p-3 rounded-xl border border-white/10 text-right transition-all hover:scale-[1.02] hover:shadow-lg flex items-center gap-3 group ${colors.card}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colors.bgIcon} ${colors.textIcon} transition-transform group-hover:rotate-12`}>
                                                            {item.names[currentLang].charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-white font-bold text-sm font-cairo">
                                                                {item.names[currentLang]}
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-white/30 py-10">
                                {currentLang === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                                {filteredItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onSelect(item)}
                                        className={`p-4 rounded-xl border border-white/10 text-right transition-all hover:scale-[1.02] hover:shadow-lg flex items-center gap-4 group
                                            ${currentStyle.card}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 transition-transform group-hover:rotate-12 ${currentStyle.iconBg}`}>
                                            {item.names[currentLang].charAt(0)}
                                        </div>
                                        <div className="flex flex-col items-start flex-grow">
                                            <span className="text-white font-bold text-lg font-cairo leading-tight">
                                                {item.names[currentLang]}
                                            </span>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span className="text-xs text-white/40 font-mono">
                                                    {getTypeName(item)}
                                                </span>
                                                {item.subtype === 'mother_of_believers' && (
                                                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                                                        {t.motherOfBelievers}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                             <div className="text-center text-white/30 py-10">
                                {currentLang === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.98); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};
