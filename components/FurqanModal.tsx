
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { QuranIcon } from './icons/QuranIcon';
import { TVIcon } from './icons/TVIcon';
import { RadioIcon } from './icons/RadioIcon';
import { getReciters, getSurahs, getLiveTV, getRadios, getRiwayat, Reciter, Surah, LiveTV, Radio, Riwayah } from '../services/quranService';
import { stopAllAudio } from '../utils/audioUtils';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { BookIcon } from './icons/BookIcon';
import { getQuranByEdition, POPULAR_EDITIONS, QuranData, Surah as MushafSurah } from '../services/mushafService';
import { InfoIcon } from './icons/InfoIcon';
import { getSurahInfo, SurahInfo, SurahInfoItem } from '../services/quranpediaService';

interface FurqanModalProps {
    onClose: () => void;
    currentLang: Language;
    onPlayMedia: (url: string, title: string, subtitle: string, canDownload?: boolean) => void;
    currentMedia: { url: string; isPlaying: boolean } | null;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

export const FurqanModal: React.FC<FurqanModalProps> = ({ onClose, currentLang, onPlayMedia, currentMedia }) => {
    const [activeTab, setActiveTab] = useState<'quran' | 'livetv' | 'radio' | 'tafseer' | 'surahInfo'>('quran');
    const [loading, setLoading] = useState(false);

    // Data States
    const [reciters, setReciters] = useState<Reciter[]>([]);
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [liveChannels, setLiveChannels] = useState<LiveTV[]>([]);
    const [radios, setRadios] = useState<Radio[]>([]);
    const [riwayat, setRiwayat] = useState<Riwayah[]>([]);

    // Selection States
    const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRiwayahId, setSelectedRiwayahId] = useState<number | null>(null);

    // Mushaf States
    const [mushafData, setMushafData] = useState<QuranData | null>(null);
    const [selectedEdition, setSelectedEdition] = useState<string>(POPULAR_EDITIONS.UTHMANI);
    const [selectedMushafSurah, setSelectedMushafSurah] = useState<MushafSurah | null>(null);
    const [loadingMushaf, setLoadingMushaf] = useState(false);
    const [currentMushafPage, setCurrentMushafPage] = useState<number>(1);

    // Surah Info States
    const [infoSurahs, setInfoSurahs] = useState<Surah[]>([]);
    const [selectedInfoSurah, setSelectedInfoSurah] = useState<Surah | null>(null);
    const [surahInfoData, setSurahInfoData] = useState<SurahInfo | null>(null);
    const [loadingSurahInfo, setLoadingSurahInfo] = useState(false);

    const t = translations[currentLang].ui;
    const dir = translations[currentLang].direction;

    // Fetch initial data based on tab
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'quran') {
                    if (reciters.length === 0 || selectedRiwayahId !== null) {
                        const [r, s, rw] = await Promise.all([
                            getReciters(currentLang, selectedRiwayahId || undefined),
                            getSurahs(currentLang),
                            riwayat.length === 0 ? getRiwayat(currentLang) : Promise.resolve(riwayat)
                        ]);
                        setReciters(r);
                        setSurahs(s);
                        if (riwayat.length === 0) setRiwayat(rw);
                    }
                } else if (activeTab === 'livetv' && liveChannels.length === 0) {
                    const channels = await getLiveTV();
                    setLiveChannels(channels);
                } else if (activeTab === 'radio' && radios.length === 0) {
                    const r = await getRadios(currentLang);
                    setRadios(r);
                } else if (activeTab === 'surahInfo') {
                    if (infoSurahs.length === 0) {
                        const s = await getSurahs(currentLang);
                        setInfoSurahs(s);
                    }
                } else if (activeTab === 'mushaf') {
                    if (!mushafData) {
                        setLoadingMushaf(true);
                        const data = await getQuranByEdition(selectedEdition);
                        setMushafData(data);
                        setLoadingMushaf(false);
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeTab, currentLang, selectedRiwayahId]);

    // Handle Tab Change
    const handleTabChange = (tab: 'quran' | 'livetv' | 'radio' | 'mushaf' | 'surahInfo') => {
        setActiveTab(tab);
        setSearchQuery('');
        if (tab !== 'quran') {
            setSelectedReciter(null);
        }
        if (tab !== 'mushaf') {
            setSelectedMushafSurah(null);
            setCurrentMushafPage(1);
        }
        if (tab !== 'surahInfo') {
            setSelectedInfoSurah(null);
            setSurahInfoData(null);
        }
    };

    const handlePlaySurah = (surah: Surah) => {
        if (!selectedReciter || !selectedReciter.moshaf || selectedReciter.moshaf.length === 0) return;

        // Determine best moshaf match
        let moshaf = selectedReciter.moshaf[0];

        if (selectedRiwayahId) {
            const matched = selectedReciter.moshaf.find(m => m.moshaf_type === selectedRiwayahId);
            if (matched) moshaf = matched;
        }

        const server = moshaf.server;
        const padId = surah.id.toString().padStart(3, '0');
        const url = `${server}${padId}.mp3`;

        // Force HTTPS
        const secureUrl = url.replace('http://', 'https://');

        // Use Global Handler
        onPlayMedia(secureUrl, surah.name, selectedReciter.name, true);
    };

    const handlePlayRadio = (radio: Radio) => {
        // Force HTTPS
        const secureUrl = radio.url.replace('http://', 'https://');
        onPlayMedia(secureUrl, radio.name, 'Radio Live', false);
    };

    // Filter Logic
    const filteredReciters = reciters.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredSurahs = surahs.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredRadios = radios.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));


    const handleEditionChange = async (edition: string) => {
        setSelectedEdition(edition);
        setLoadingMushaf(true);
        setSelectedMushafSurah(null);
        const data = await getQuranByEdition(edition);
        setMushafData(data);
        setLoadingMushaf(false);
    };


    const handleInfoSurahClick = async (surah: Surah) => { // Changed TafseerSurah to Surah
        setSelectedInfoSurah(surah);
        setLoadingSurahInfo(true);
        try {
            const data = await getSurahInfo(surah.id); // Changed surah.index to surah.id
            setSurahInfoData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingSurahInfo(false);
        }
    };


    const renderContent = () => {
        if (loading && reciters.length === 0 && activeTab === 'quran') {
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }

        if (activeTab === 'quran') {
            if (selectedReciter) {
                // Surah List View
                return (
                    <div className="animate-fade-in">
                        <button
                            onClick={() => { setSelectedReciter(null); }}
                            className="mb-4 text-sm bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            ← {t.back}
                        </button>
                        <h3 className="text-xl font-bold text-amber-400 mb-4 border-b border-white/10 pb-2">{selectedReciter.name}</h3>

                        {/* Filter Surahs */}
                        <div className="relative w-full mb-4">
                            <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-3' : 'left-3'} pointer-events-none text-white/40`}>
                                <SearchIcon className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.surahs + "..."}
                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all
                                    ${dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'}
                                `}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-10">
                            {filteredSurahs.map(surah => {
                                // Check if active in global player
                                const padId = surah.id.toString().padStart(3, '0');
                                const isCurrent = currentMedia?.url.includes(`${padId}.mp3`) && currentMedia?.title === surah.name;
                                const isPlayingCurrent = isCurrent && currentMedia?.isPlaying;

                                return (
                                    <button
                                        key={surah.id}
                                        onClick={() => handlePlaySurah(surah)}
                                        className={`p-3 rounded-xl border transition-all flex items-center justify-between group
                                          ${isCurrent
                                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                              ${isCurrent ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/50'}`}>
                                                {surah.id}
                                            </div>
                                            <span className="font-bold font-cairo">{surah.name}</span>
                                        </div>
                                        {isPlayingCurrent ? (
                                            <PauseIcon className="w-5 h-5 text-amber-400 animate-pulse" />
                                        ) : (
                                            <PlayIcon className="w-5 h-5 text-white/30 group-hover:text-white" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                );
            }

            // Reciter List View
            return (
                <div className="animate-fade-in">
                    {/* Riwayat Filter */}
                    <div className="mb-6 overflow-x-auto custom-scrollbar pb-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSelectedRiwayahId(null)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                                ${selectedRiwayahId === null
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
                            >
                                {translations[currentLang].ui.defaultSpeaker || 'All'}
                            </button>
                            {riwayat.map(r => (
                                <button
                                    key={r.id}
                                    onClick={() => setSelectedRiwayahId(r.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                                    ${selectedRiwayahId === r.id
                                            ? 'bg-amber-500 text-white border-amber-500'
                                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
                                >
                                    {r.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full mb-6">
                        <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                            <SearchIcon className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.reciters + "..."}
                            className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all
                                ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                            `}
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                            {filteredReciters.map(reciter => (
                                <button
                                    key={reciter.id}
                                    onClick={() => { setSelectedReciter(reciter); setSearchQuery(''); }}
                                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 transition-all flex items-center gap-4 group text-right"
                                >
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg group-hover:bg-amber-500 group-hover:text-white transition-colors flex-shrink-0">
                                        {reciter.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <span className="font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1 text-left">{reciter.name}</span>
                                        <span className="text-xs text-white/40 line-clamp-1 text-left">{reciter.moshaf.length > 0 ? reciter.moshaf[0].name : ''}</span>
                                    </div>
                                </button>
                            ))}
                            {filteredReciters.length === 0 && (
                                <div className="col-span-full text-center text-white/40 py-8">
                                    No reciters found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        if (activeTab === 'livetv') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in pb-10">
                    {liveChannels.map(channel => (
                        <div key={channel.id} className="bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="aspect-video w-full bg-black relative group">
                                <iframe
                                    src={channel.url.replace("watch?v=", "embed/") + "?autoplay=0"}
                                    title={channel.name}
                                    className="w-full h-full"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                            </div>
                            <div className="p-4 flex items-center gap-3 bg-white/5">
                                <div className="p-2 bg-red-600 rounded-lg text-white">
                                    <TVIcon className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-white">{channel.name}</span>
                            </div>
                        </div>
                    ))}
                    {liveChannels.length === 0 && <div className="col-span-2 text-center py-10 text-white/50">No channels available</div>}
                </div>
            );
        }

        if (activeTab === 'radio') {
            return (
                <div className="animate-fade-in">
                    <div className="relative w-full mb-6">
                        <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                            <SearchIcon className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.radios + "..."}
                            className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all
                                ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                            `}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-10">
                        {filteredRadios.map(radio => {
                            const secureUrl = radio.url.replace('http://', 'https://');
                            const isCurrentRadio = currentMedia?.url === secureUrl;
                            const isPlayingRadio = isCurrentRadio && currentMedia?.isPlaying;

                            return (
                                <button
                                    key={radio.id}
                                    onClick={() => handlePlayRadio(radio)}
                                    className={`p-4 rounded-xl border transition-all flex items-center justify-between group
                                    ${isCurrentRadio
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                        ${isCurrentRadio ? 'bg-emerald-500 text-white' : 'bg-white/10 text-emerald-500'}`}>
                                            <RadioIcon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold font-cairo truncate text-sm text-left">{radio.name}</span>
                                    </div>
                                    {isPlayingRadio ? (
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5 h-3 items-end">
                                                <div className="w-1 bg-emerald-400 animate-[bounce_1s_infinite]"></div>
                                                <div className="w-1 bg-emerald-400 animate-[bounce_1.2s_infinite]"></div>
                                                <div className="w-1 bg-emerald-400 animate-[bounce_0.8s_infinite]"></div>
                                            </div>
                                            <PauseIcon className="w-5 h-5 text-emerald-400" />
                                        </div>
                                    ) : (
                                        <PlayIcon className="w-5 h-5 text-white/30 group-hover:text-white" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (activeTab === 'mushaf') {
            if (selectedMushafSurah) {
                // Calculate pages
                const surahPages = Array.from(new Set(selectedMushafSurah.ayahs.map(a => a.page))).sort((a: number, b: number) => a - b);
                const pageAyahs = selectedMushafSurah.ayahs.filter(a => a.page === currentMushafPage);
                const isFirstPage = currentMushafPage === surahPages[0];
                const isLastPage = currentMushafPage === surahPages[surahPages.length - 1];

                return (
                    <div className="animate-fade-in h-full flex flex-col relative">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 shrink-0">
                            <button
                                onClick={() => setSelectedMushafSurah(null)}
                                className="text-sm bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                            >
                                ← {t.back}
                            </button>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-emerald-400 font-cairo">
                                    {selectedMushafSurah.englishName}
                                </h3>
                                <p className="text-xs text-white/50">{mushafData?.edition.name}</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded-lg text-xs font-mono text-emerald-400">
                                Page {currentMushafPage}
                            </div>
                        </div>

                        {/* Page Content */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar pb-24">
                            <div className="max-w-4xl mx-auto bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl min-h-[600px] relative">
                                {/* Page Number Watermark */}
                                <div className="absolute top-4 left-4 text-white/5 font-bold text-6xl select-none pointer-events-none">
                                    {currentMushafPage}
                                </div>

                                {/* Bismillah for first page of Surah (except Tawbah) */}
                                {selectedMushafSurah.number !== 9 && currentMushafPage === surahPages[0] && (
                                    <div className="text-center mb-8 font-amiri text-3xl text-emerald-500/80">
                                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                                    </div>
                                )}

                                <div className="text-justify leading-[2.8] font-amiri text-2xl md:text-3xl text-white/90" dir={mushafData?.edition.direction || 'rtl'}>
                                    {pageAyahs.map((ayah) => (
                                        <span key={ayah.number} className="inline hover:bg-white/5 rounded transition-colors px-1">
                                            {ayah.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim()}
                                            <span className="text-emerald-500 font-bold mx-2 text-xl inline-flex items-center justify-center border border-emerald-500/40 rounded-full w-8 h-8 bg-emerald-500/10 align-middle select-none">
                                                {ayah.numberInSurah}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Controls (Sticky Bottom) */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10 pointer-events-none">
                            <button
                                onClick={() => {
                                    const currentIndex = surahPages.indexOf(currentMushafPage);
                                    if (currentIndex > 0) setCurrentMushafPage(surahPages[currentIndex - 1]);
                                }}
                                disabled={isFirstPage}
                                className={`pointer-events-auto px-6 py-3 rounded-full font-bold shadow-lg backdrop-blur-md transition-all flex items-center gap-2 border border-white/10
                                    ${isFirstPage
                                        ? 'bg-black/40 text-white/20 cursor-not-allowed'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 hover:shadow-emerald-500/20'}`}
                            >
                                ← Previous
                            </button>

                            <button
                                onClick={() => {
                                    const currentIndex = surahPages.indexOf(currentMushafPage);
                                    if (currentIndex < surahPages.length - 1) setCurrentMushafPage(surahPages[currentIndex + 1]);
                                }}
                                disabled={isLastPage}
                                className={`pointer-events-auto px-6 py-3 rounded-full font-bold shadow-lg backdrop-blur-md transition-all flex items-center gap-2 border border-white/10
                                    ${isLastPage
                                        ? 'bg-black/40 text-white/20 cursor-not-allowed'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 hover:shadow-emerald-500/20'}`}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                );
            }

            // Main Mushaf View (Edition & Surah Selection)
            return (
                <div className="animate-fade-in h-full flex flex-col">
                    {/* Edition Selection */}
                    <div className="mb-8 shrink-0">
                        <h3 className="text-white/50 text-sm font-bold uppercase tracking-wider mb-3 px-1">{t.selectEdition}</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleEditionChange(POPULAR_EDITIONS.UTHMANI)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border
                                    ${selectedEdition === POPULAR_EDITIONS.UTHMANI
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                {t.arabicText} (عثماني)
                            </button>
                            <button
                                onClick={() => handleEditionChange(POPULAR_EDITIONS.SAHIH_INTERNATIONAL)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border
                                    ${selectedEdition === POPULAR_EDITIONS.SAHIH_INTERNATIONAL
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                English (Sahih Int.)
                            </button>
                            <button
                                onClick={() => handleEditionChange(POPULAR_EDITIONS.FRENCH)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border
                                    ${selectedEdition === POPULAR_EDITIONS.FRENCH
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                Français
                            </button>
                            <button
                                onClick={() => handleEditionChange(POPULAR_EDITIONS.SPANISH)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border
                                    ${selectedEdition === POPULAR_EDITIONS.SPANISH
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                Español
                            </button>
                        </div>
                    </div>

                    {/* Surah Selection */}
                    {loadingMushaf ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : mushafData ? (
                        <div className="flex-grow overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h3 className="text-white/50 text-sm font-bold uppercase tracking-wider">{t.surahs}</h3>
                                <div className="relative w-48">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t.searchPlaceholder}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-10 pr-2">
                                {mushafData.surahs
                                    .filter(s => s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        s.name.includes(searchQuery) ||
                                        s.number.toString().includes(searchQuery))
                                    .map(surah => (
                                        <button
                                            key={surah.number}
                                            onClick={() => {
                                                setSelectedMushafSurah(surah);
                                                if (surah.ayahs.length > 0) {
                                                    setCurrentMushafPage(surah.ayahs[0].page);
                                                }
                                            }}
                                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white/5 text-white/40 flex items-center justify-center text-sm font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors font-mono">
                                                    {surah.number}
                                                </div>
                                                <div className="text-left">
                                                    <span className="font-bold font-cairo text-lg text-white group-hover:text-emerald-200 transition-colors block">{surah.name}</span>
                                                    <span className="text-xs text-white/50">{surah.englishName}</span>
                                                </div>
                                            </div>
                                            <BookIcon className="w-5 h-5 text-white/20 group-hover:text-emerald-400 transition-colors" />
                                        </button>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-white/50 py-20">{t.error}</div>
                    )}
                </div>
            );
        }

        if (activeTab === 'surahInfo') {
            if (selectedInfoSurah) {
                return (
                    <div className="animate-fade-in relative h-full overflow-y-auto custom-scrollbar p-4">
                        <button
                            onClick={() => { setSelectedInfoSurah(null); setSurahInfoData(null); }}
                            className="mb-4 text-sm bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors sticky top-0 z-10 backdrop-blur-md"
                        >
                            ← {t.back}
                        </button>

                        {loadingSurahInfo ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : surahInfoData ? (
                            <div className="space-y-6 max-w-4xl mx-auto pb-10">
                                <h2 className="text-3xl font-bold text-purple-400 text-center font-amiri mb-8 border-b border-white/10 pb-4">
                                    {selectedInfoSurah.name}
                                </h2>

                                {Object.entries(surahInfoData).map(([key, value]) => {
                                    const item = value as SurahInfoItem;
                                    if (!item || !item.title) return null;
                                    return (
                                        <div key={key} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                                            <h3 className="text-xl font-bold text-purple-300 mb-4 font-cairo flex items-center gap-2">
                                                <InfoIcon className="w-5 h-5 opacity-50" />
                                                {item.title}
                                            </h3>
                                            <div
                                                className="text-white/80 leading-relaxed font-cairo text-justify prose prose-invert max-w-none prose-p:mb-4 prose-strong:text-white prose-headings:text-purple-200"
                                                dangerouslySetInnerHTML={{ __html: item.value }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-white/50 py-20">{t.error}</div>
                        )}
                    </div>
                );
            }

            // Surah List
            const filteredInfoSurahs = infoSurahs.filter(s => s.name.includes(searchQuery) || s.id.toString().includes(searchQuery));

            return (
                <div className="animate-fade-in">
                    <div className="relative w-full mb-6">
                        <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                            <SearchIcon className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.surahs + "..."}
                            className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all
                                ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                            `}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-10">
                        {filteredInfoSurahs.map(surah => (
                            <button
                                key={surah.id}
                                onClick={() => handleInfoSurahClick(surah)}
                                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 text-white/50 flex items-center justify-center text-xs font-bold group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        {surah.id}
                                    </div>
                                    <span className="font-bold font-cairo text-white group-hover:text-purple-200 transition-colors">{surah.name}</span>
                                </div>
                                <InfoIcon className="w-5 h-5 text-white/30 group-hover:text-purple-400 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            dir={dir}
        >
            <div
                className="bg-[#0f172a] border border-white/20 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-white/5 shrink-0 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                            <QuranIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white font-cairo">{t.furqan}</h2>

                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center border-b border-white/10 bg-black/20 shrink-0">
                    <button
                        onClick={() => handleTabChange('quran')}
                        className={`flex-1 py-4 font-bold text-sm md:text-base transition-all relative flex items-center justify-center gap-2
                        ${activeTab === 'quran' ? 'text-amber-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <QuranIcon className="w-5 h-5" />
                        {t.reciters} & {t.surahs}
                        {activeTab === 'quran' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>}
                    </button>
                    <button
                        onClick={() => handleTabChange('livetv')}
                        className={`flex-1 py-4 font-bold text-sm md:text-base transition-all relative flex items-center justify-center gap-2
                        ${activeTab === 'livetv' ? 'text-red-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <TVIcon className="w-5 h-5" />
                        {t.liveTv}
                        {activeTab === 'livetv' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></div>}
                    </button>
                    <button
                        onClick={() => handleTabChange('radio')}
                        className={`flex-1 py-4 font-bold text-sm md:text-base transition-all relative flex items-center justify-center gap-2
                        ${activeTab === 'radio' ? 'text-emerald-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <RadioIcon className="w-5 h-5" />
                        {t.radios}
                        {activeTab === 'radio' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>}
                    </button>
                    <button
                        onClick={() => handleTabChange('mushaf')}
                        className={`flex-1 py-4 font-bold text-sm md:text-base transition-all relative flex items-center justify-center gap-2
                        ${activeTab === 'mushaf' ? 'text-emerald-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <BookIcon className="w-5 h-5" />
                        {t.mushaf}
                        {activeTab === 'mushaf' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>}
                    </button>
                    <button
                        onClick={() => handleTabChange('surahInfo')}
                        className={`flex-1 py-4 font-bold text-sm md:text-base transition-all relative flex items-center justify-center gap-2
                        ${activeTab === 'surahInfo' ? 'text-purple-400 bg-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <InfoIcon className="w-5 h-5" />
                        {t.surahInfo}
                        {activeTab === 'surahInfo' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]"></div>}
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-[#0f172a]">
                    {renderContent()}
                </div>

            </div>
            <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
        </div>
    );
};
