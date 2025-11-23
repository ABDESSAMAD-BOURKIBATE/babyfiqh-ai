
import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { MicIcon } from './icons/MicIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { RadioIcon } from './icons/RadioIcon';
import { 
    getQuranPage, 
    getDirectAyahAudio,
    getReciters, 
    getSurahs, 
    getRiwayat, 
    getRadios,
    Reciter, 
    Surah, 
    Riwayah,
    Radio
} from '../services/quranService';

interface FurqanModalProps {
  onClose: () => void;
  currentLang: Language;
  onPlayMedia: (url: string, title: string, subtitle: string) => void;
  currentlyPlayingUrl?: string;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const PlayCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
);

const GridIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

export const FurqanModal: React.FC<FurqanModalProps> = ({ onClose, currentLang, onPlayMedia, currentlyPlayingUrl }) => {
  const [activeTab, setActiveTab] = useState<'recitations' | 'mushaf' | 'radios'>('recitations');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- Mushaf State ---
  const [mushafView, setMushafView] = useState<'list' | 'reader'>('list'); // 'list' for Surah selection, 'reader' for pages
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<any>(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingAudioKey, setLoadingAudioKey] = useState<string | null>(null);

  // --- Recitations State ---
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [riwayat, setRiwayat] = useState<Riwayah[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [selectedRiwayahId, setSelectedRiwayahId] = useState<number | null>(null);
  const [loadingReciters, setLoadingReciters] = useState(false);

  // --- Radios State ---
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loadingRadios, setLoadingRadios] = useState(false);

  // --- Swipe State ---
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial Fetch - Load Surahs & Riwayat if needed for recitations
  useEffect(() => {
      if (activeTab === 'recitations' && (surahs.length === 0 || riwayat.length === 0)) {
          const loadStaticData = async () => {
              const [sData, riData] = await Promise.all([
                  getSurahs(currentLang),
                  getRiwayat(currentLang)
              ]);
              setSurahs(sData);
              setRiwayat(riData);
          };
          loadStaticData();
      }
  }, [activeTab, currentLang]);

  // Fetch Reciters when tab or filter changes
  useEffect(() => {
      if (activeTab === 'recitations') {
          const fetchReciters = async () => {
              setLoadingReciters(true);
              const data = await getReciters(currentLang, selectedRiwayahId || undefined);
              setReciters(data);
              setLoadingReciters(false);
          };
          fetchReciters();
      }
  }, [activeTab, selectedRiwayahId, currentLang]);

  // Fetch Radios
  useEffect(() => {
      if (activeTab === 'radios') {
          const fetchRadios = async () => {
              setLoadingRadios(true);
              const data = await getRadios(currentLang);
              setRadios(data);
              setLoadingRadios(false);
          };
          fetchRadios();
      }
  }, [activeTab, currentLang]);

  // Fetch Page when changed in reader mode
  useEffect(() => {
      if (activeTab === 'mushaf' && mushafView === 'reader') {
          fetchPage(currentPage);
          // Scroll to top when page changes
          if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = 0;
          }
      }
  }, [currentPage, activeTab, mushafView]);

  // --- Logic: Mushaf ---
  const fetchPage = async (page: number) => {
    setLoadingPage(true);
    const data = await getQuranPage(page);
    if (data) setPageData(data);
    setLoadingPage(false);
  };

  const handleSelectSurahForMushaf = (surah: Surah) => {
      setCurrentPage(surah.start_page);
      setMushafView('reader');
      setSearchQuery(''); // Clear search when entering reader
  };

  const handleNextPage = () => { if (currentPage < 604) setCurrentPage(prev => prev + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };

  const handleAyahClick = (globalAyahNum: number, surahNum: number, ayahNum: number, surahName: string) => {
      const key = `${globalAyahNum}`;
      setLoadingAudioKey(key);
      
      // Use the direct URL with Surah/Ayah numbers for better reliability
      const audioUrl = getDirectAyahAudio(surahNum, ayahNum);
      
      if (audioUrl) {
          onPlayMedia(audioUrl, `Ayah ${ayahNum}`, surahName);
      }
      
      // Small delay to clear loading state purely for visual feedback
      setTimeout(() => setLoadingAudioKey(null), 500);
  };

  // --- Logic: Swipe Gestures ---
  const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;
      
      if (isLeftSwipe) {
          handleNextPage();
      }
      if (isRightSwipe) {
          handlePrevPage();
      }
  };

  const handleSurahPlay = (surah: Surah) => {
      if (!selectedReciter || !selectedReciter.moshaf || selectedReciter.moshaf.length === 0) return;
      
      const moshaf = selectedReciter.moshaf[0]; 
      const server = moshaf.server;
      const surahId = surah.id.toString().padStart(3, '0');
      const url = `${server}${surahId}.mp3`;

      const surahNameWithPrefix = currentLang === 'ar' ? `سورة ${surah.name}` : `Surah ${surah.name}`;
      onPlayMedia(url, surahNameWithPrefix, selectedReciter.name);
  };

  // Filters
  const filteredReciters = reciters.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.letter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSurahs = surahs.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRadios = radios.filter(r =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSubTitle = () => {
      if (activeTab === 'recitations') return currentLang === 'ar' ? 'المكتبة الصوتية الشاملة' : 'Comprehensive Audio Library';
      if (activeTab === 'mushaf') return currentLang === 'ar' ? 'القراءة الميسرة' : 'Easy Reading Mode';
      if (activeTab === 'radios') return currentLang === 'ar' ? 'بث مباشر 24/7' : 'Live Stream 24/7';
      return '';
  };

  return (
    <div 
        className="fixed inset-0 z-[60] bg-[#020617]/90 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-fade-in"
        onClick={onClose}
        dir={dir}
    >
        <div 
            className="bg-[#0f172a] border border-white/10 md:rounded-3xl w-full max-w-6xl h-full md:h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
        >
            {/* 1. Top Navigation Bar */}
            <div className="flex flex-col shrink-0 border-b border-white/10 bg-[#1e293b] relative z-20">
                {/* Title & Close */}
                <div className="flex items-center justify-between p-4 md:p-6 pb-2">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl 
                            ${activeTab === 'recitations' ? 'bg-emerald-500/20 text-emerald-400' : 
                              activeTab === 'radios' ? 'bg-red-500/20 text-red-400' :
                              'bg-amber-500/20 text-amber-400'}`}>
                            {activeTab === 'recitations' && <MicIcon className="w-6 h-6" />}
                            {activeTab === 'mushaf' && <BookOpenIcon className="w-6 h-6" />}
                            {activeTab === 'radios' && <RadioIcon className="w-6 h-6" />}
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white font-cairo">
                                {t.furqan}
                            </h2>
                            <p className="text-xs text-white/40 font-medium">
                                {getSubTitle()}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center px-4 mb-2">
                    <div className="flex bg-black/20 p-1 rounded-xl w-full max-w-lg border border-white/5 gap-1">
                        <button 
                            onClick={() => { setActiveTab('recitations'); setSelectedReciter(null); setSearchQuery(''); }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                                ${activeTab === 'recitations' 
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                                    : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        >
                            <MicIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">{t.reciters}</span>
                            <span className="sm:hidden">{t.reciters}</span>
                        </button>
                        
                        <button 
                            onClick={() => { setActiveTab('radios'); setSearchQuery(''); }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                                ${activeTab === 'radios' 
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                                    : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        >
                            <RadioIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">{t.radios}</span>
                            <span className="sm:hidden">{t.radios}</span>
                        </button>

                        <button 
                            onClick={() => { setActiveTab('mushaf'); setMushafView('list'); setSearchQuery(''); }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2
                                ${activeTab === 'mushaf' 
                                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20' 
                                    : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        >
                            <BookOpenIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">{currentLang === 'ar' ? 'المصحف' : 'Mushaf'}</span>
                            <span className="sm:hidden">{currentLang === 'ar' ? 'المصحف' : 'Mushaf'}</span>
                        </button>
                    </div>
                </div>

                {/* Search & Filters Bar */}
                {/* Only show in Recitations, Radios, or Mushaf List view */}
                {((activeTab === 'recitations') || (activeTab === 'radios') || (activeTab === 'mushaf' && mushafView === 'list')) && (
                    <div className="px-4 md:px-6 pb-4 max-w-6xl mx-auto w-full flex flex-col gap-3">
                        <div className="relative group">
                            <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/30 group-focus-within:text-white/70 transition-colors`}>
                                <SearchIcon className="w-5 h-5" />
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={
                                    activeTab === 'recitations' 
                                    ? (currentLang === 'ar' ? "بحث عن قارئ..." : "Search reciter...")
                                    : activeTab === 'radios'
                                    ? (currentLang === 'ar' ? "بحث عن إذاعة..." : "Search radio...")
                                    : (currentLang === 'ar' ? "بحث عن سورة..." : "Search surah...")
                                }
                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all
                                    ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                                `}
                            />
                        </div>

                        {/* Riwayat Filter - Only for Recitations */}
                        {activeTab === 'recitations' && (
                            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                                <button
                                    onClick={() => setSelectedRiwayahId(null)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex-shrink-0
                                        ${selectedRiwayahId === null 
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20' 
                                            : 'bg-black/20 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {currentLang === 'ar' ? 'الكل' : 'All'}
                                </button>
                                {riwayat.map(r => (
                                    <button
                                        key={r.id}
                                        onClick={() => setSelectedRiwayahId(r.id)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border flex-shrink-0
                                            ${selectedRiwayahId === r.id 
                                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20' 
                                                : 'bg-black/20 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        {r.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 2. Main Content Area */}
            <div 
                ref={scrollContainerRef}
                className="flex-grow overflow-y-auto custom-scrollbar bg-[#0f172a] relative scroll-smooth"
            >
                {activeTab === 'recitations' ? (
                    <div className="p-4 md:p-8 min-h-full">
                        {loadingReciters ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-emerald-400/70 font-mono text-sm animate-pulse">Loading Library...</p>
                            </div>
                        ) : selectedReciter ? (
                            // Drill-down: Surah List for Selected Reciter
                            <div className="max-w-5xl mx-auto animate-fade-in">
                                <div className="flex items-center gap-3 mb-6">
                                    <button 
                                        onClick={() => setSelectedReciter(null)}
                                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/10"
                                    >
                                        <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
                                    </button>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white font-cairo">{selectedReciter.name}</h3>
                                        <p className="text-emerald-400 text-xs">{t.reciters}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {filteredSurahs.map(surah => {
                                        const moshaf = selectedReciter.moshaf[0];
                                        const availableSurahs = moshaf.surah_list.split(',');
                                        if (!availableSurahs.includes(surah.id.toString())) return null;

                                        return (
                                            <button
                                                key={surah.id}
                                                onClick={() => handleSurahPlay(surah)}
                                                className="group flex items-center justify-between p-3 bg-[#1e293b]/40 border border-white/5 rounded-xl hover:bg-emerald-900/20 hover:border-emerald-500/30 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center text-sm font-bold font-mono text-white/40 group-hover:text-emerald-400 border border-white/5 group-hover:border-emerald-500/20 transition-colors">
                                                        {surah.id}
                                                    </div>
                                                    <span className="font-amiri font-bold text-lg text-white/90 group-hover:text-white">
                                                        {currentLang === 'ar' ? `سورة ${surah.name}` : `Surah ${surah.name}`}
                                                    </span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                                    <PlayCircleIcon className="w-6 h-6" />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            // Reciters Grid
                            <div className="max-w-6xl mx-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                                    {filteredReciters.map((reciter) => (
                                        <button
                                            key={reciter.id}
                                            onClick={() => setSelectedReciter(reciter)}
                                            className="group relative p-5 rounded-2xl bg-[#1e293b]/60 border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-900/10 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/20 overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center text-xl font-bold text-emerald-500 border border-white/10 group-hover:scale-110 transition-transform shadow-inner">
                                                    {reciter.letter}
                                                </div>
                                                <div className="flex flex-col items-start flex-1 min-w-0">
                                                    <span className="text-white font-bold text-base font-cairo line-clamp-1 w-full text-start group-hover:text-emerald-200 transition-colors">
                                                        {reciter.name}
                                                    </span>
                                                    <span className="text-[10px] text-white/30 uppercase tracking-wider mt-1 group-hover:text-white/50">
                                                        {reciter.moshaf[0]?.name || 'Riwayat Hafs'}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {filteredReciters.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-64 text-white/30">
                                        <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
                                        <p>{t.noResults}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : activeTab === 'radios' ? (
                    // --- RADIOS SECTION ---
                    <div className="p-4 md:p-8 min-h-full">
                        {loadingRadios ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-red-400/70 font-mono text-sm animate-pulse">Tuning in...</p>
                            </div>
                        ) : (
                            <div className="max-w-6xl mx-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                                    {filteredRadios.map((radio) => (
                                        <button
                                            key={radio.id}
                                            onClick={() => onPlayMedia(radio.url, radio.name, 'Radio Live')}
                                            className="group relative p-5 rounded-2xl bg-[#1e293b]/60 border border-white/5 hover:border-red-500/40 hover:bg-red-900/10 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20 overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center text-red-500 border border-white/10 group-hover:scale-110 transition-transform shadow-inner">
                                                    <RadioIcon className="w-7 h-7" />
                                                </div>
                                                <div className="flex flex-col items-start flex-1 min-w-0">
                                                    <span className="text-white font-bold text-sm font-cairo line-clamp-2 w-full text-start group-hover:text-red-200 transition-colors leading-tight">
                                                        {radio.name}
                                                    </span>
                                                    <span className="text-[9px] text-white/30 uppercase tracking-wider mt-2 group-hover:text-white/50 border border-white/10 px-2 py-0.5 rounded-full">
                                                        LIVE
                                                    </span>
                                                </div>
                                                
                                                {/* Playing Indicator if this URL is active */}
                                                {currentlyPlayingUrl === radio.url && (
                                                    <div className="absolute top-2 right-2 flex gap-0.5 h-3 items-end">
                                                        <div className="w-1 bg-red-500 animate-[bounce_1s_infinite] h-2"></div>
                                                        <div className="w-1 bg-red-500 animate-[bounce_1.2s_infinite] h-3"></div>
                                                        <div className="w-1 bg-red-500 animate-[bounce_0.8s_infinite] h-1"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {filteredRadios.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-64 text-white/30">
                                        <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
                                        <p>{t.noResults}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    // --- MUSHAF SECTION ---
                    mushafView === 'list' ? (
                        // 1. SURAH SELECTION LIST
                        <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {filteredSurahs.map((surah) => (
                                    <button
                                        key={surah.id}
                                        onClick={() => handleSelectSurahForMushaf(surah)}
                                        className="group flex items-center justify-between p-4 bg-[#1e293b]/40 border border-white/5 rounded-xl hover:bg-amber-900/20 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center text-sm font-bold font-mono text-white/40 group-hover:text-amber-400 border border-white/5 group-hover:border-amber-500/20 transition-colors">
                                                {surah.id}
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="font-amiri font-bold text-xl text-white/90 group-hover:text-white">
                                                    {currentLang === 'ar' ? `سورة ${surah.name}` : `Surah ${surah.name}`}
                                                </span>
                                                <span className="text-[10px] text-white/30 uppercase">
                                                    {surah.makkia === 1 ? (currentLang === 'ar' ? 'مكية' : 'Meccan') : (currentLang === 'ar' ? 'مدنية' : 'Medinan')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-white/20 group-hover:text-amber-500 transition-colors">
                                            <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {filteredSurahs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 text-white/30">
                                    <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
                                    <p>{t.noResults}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // 2. MUSHAF READER
                        <div className="flex flex-col min-h-full relative bg-[#0f172a] animate-fade-in">
                            
                            {/* Top Page Navigation Bar */}
                            <div className="sticky top-0 z-30 bg-[#1e293b] border-b border-white/10 py-3 px-4 flex items-center justify-between shadow-lg">
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setMushafView('list')} 
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors text-xs font-bold border border-white/5"
                                    >
                                        <GridIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{currentLang === 'ar' ? 'فهرس السور' : 'Surah Index'}</span>
                                    </button>
                                    
                                    <button 
                                        onClick={handleNextPage} 
                                        disabled={currentPage >= 604 || loadingPage}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-white transition-all disabled:opacity-50 disabled:pointer-events-none text-sm font-bold"
                                    >
                                        <ArrowIcon className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                                        <span className="hidden sm:inline">{dir === 'rtl' ? 'التالية' : 'Next'}</span>
                                    </button>
                                </div>

                                <span className="font-mono font-bold text-white/80 text-sm bg-black/20 px-3 py-1 rounded-lg border border-white/5">
                                    {t.page} {currentPage}
                                </span>

                                <button 
                                    onClick={handlePrevPage} 
                                    disabled={currentPage <= 1 || loadingPage}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-white transition-all disabled:opacity-50 disabled:pointer-events-none text-sm font-bold"
                                >
                                    <span className="hidden sm:inline">{dir === 'rtl' ? 'السابقة' : 'Prev'}</span>
                                    <ArrowIcon className={`w-4 h-4 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
                                </button>
                            </div>

                            {/* Content Area - With Swipe Detection */}
                            <div 
                                className="flex justify-center p-4 md:p-8 flex-grow touch-pan-y"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* The Book Container */}
                                <div className="w-full max-w-3xl bg-[#fffbf2] text-[#292524] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col overflow-hidden min-h-[70vh]">
                                    
                                    {/* Book Texture */}
                                    <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                                    
                                    {/* Decorative Frame */}
                                    <div className="absolute inset-3 md:inset-5 border-2 border-[#d4b68b] pointer-events-none z-10">
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#8c6b48]"></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#8c6b48]"></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#8c6b48]"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#8c6b48]"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-20 flex-grow p-8 md:p-12 flex flex-col">
                                        {loadingPage ? (
                                            <div className="flex-grow flex flex-col items-center justify-center text-[#8c6b48]">
                                                <div className="w-12 h-12 border-4 border-[#8c6b48] border-t-transparent rounded-full animate-spin mb-4"></div>
                                                <p className="font-amiri text-lg">جاري تحميل الصفحة...</p>
                                            </div>
                                        ) : pageData ? (
                                            <>
                                                {/* Page Header */}
                                                <div className="flex justify-between items-center mb-6 px-2 text-[#8c6b48] font-bold font-amiri text-lg border-b border-[#d4b68b]/30 pb-2">
                                                    <span>{Object.values(pageData.surahs || {}).map((s:any) => s.name).join(' - ')}</span>
                                                    <span className="text-sm font-mono">{t.page} {currentPage}</span>
                                                </div>

                                                {/* Quran Text - Neat Lines */}
                                                <div className="flex-grow" dir="rtl">
                                                    <div className="text-justify leading-[2.8] md:leading-[3.2] text-2xl md:text-3xl font-amiri text-[#292524]">
                                                        {pageData.ayahs.map((ayah: any, idx: number) => {
                                                            const isBasmalah = ayah.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") && ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayah.surah.number !== 9;
                                                            const displayText = isBasmalah ? ayah.text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim() : ayah.text;
                                                            
                                                            return (
                                                                <React.Fragment key={ayah.number}>
                                                                    {ayah.numberInSurah === 1 && (
                                                                        <div className="w-full my-4 text-center">
                                                                            <div className="inline-block py-2 px-10 bg-[#f3e5ce] rounded-full border border-[#d4b68b]">
                                                                                <h3 className="font-amiri font-bold text-xl text-[#5c4026]">
                                                                                    {ayah.surah.name}
                                                                                </h3>
                                                                            </div>
                                                                            {ayah.surah.number !== 1 && ayah.surah.number !== 9 && (
                                                                                <p className="font-amiri text-xl text-[#5c4026] mt-3 mb-2">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <span 
                                                                        className={`cursor-pointer hover:bg-[#d4b68b]/20 rounded px-0.5 transition-colors duration-200 inline
                                                                            ${loadingAudioKey === `${ayah.number}` ? 'text-[#b45309] animate-pulse' : ''}
                                                                            ${currentlyPlayingUrl?.includes(`/${ayah.number}.mp3`) ? 'bg-[#d4b68b]/40' : ''}
                                                                        `}
                                                                        onClick={() => handleAyahClick(ayah.number, ayah.surah.number, ayah.numberInSurah, ayah.surah.name)}
                                                                    >
                                                                        {displayText} 
                                                                        <span className="text-[#b45309] text-xl mx-1 font-normal select-none inline-block transform translate-y-1">
                                                                            &#64831;{ayah.numberInSurah.toLocaleString('ar-EG')}&#64830;
                                                                        </span>
                                                                    </span>
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Page Footer */}
                                                <div className="mt-6 text-center text-[#8c6b48]/60 text-sm font-mono">
                                                    - {currentPage} -
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.99); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};
