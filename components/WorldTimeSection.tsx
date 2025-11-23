
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { getAllCountries, Country } from '../services/worldService';
import { getPrayerTimesByCity } from '../services/adhanService';
import { GridIcon } from './icons/GridIcon';

interface WorldTimeSectionProps {
    currentLang: Language;
}

type TimePhase = 'dawn' | 'day' | 'sunset' | 'night';

const phaseLabels: Record<TimePhase, Record<Language, string>> = {
    dawn: { ar: 'الفجر', en: 'Dawn', fr: 'Aube', es: 'Amanecer', zgh: 'ⴼⴰⵊⵔ' },
    day: { ar: 'النهار', en: 'Day', fr: 'Jour', es: 'Día', zgh: 'ⴰⵣⴰⵍ' },
    sunset: { ar: 'الغروب', en: 'Sunset', fr: 'Coucher', es: 'Atardecer', zgh: 'ⵜⴰⵖⵓⵢⵢⵓⵜ' },
    night: { ar: 'الليل', en: 'Night', fr: 'Nuit', es: 'Noche', zgh: 'ⵉⴹ' },
};

// --- Visual Components ---

const CloudVisual = () => (
    <svg viewBox="0 0 200 120" className="w-full h-full opacity-90 drop-shadow-2xl">
        <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0.4" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
        </defs>
        {/* Main Cloud Body */}
        <path d="M 40 80 Q 20 80 20 60 Q 20 30 50 30 Q 60 10 90 10 Q 120 10 130 35 Q 160 35 160 65 Q 160 80 130 80 Z" fill="url(#cloudGrad)" filter="url(#blur)" />
        {/* Highlight */}
        <path d="M 50 35 Q 60 15 90 15 Q 115 15 125 35" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" />
    </svg>
);

const SunVisual = () => (
    <div className="relative w-24 h-24">
        {/* Core */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full shadow-[0_0_40px_rgba(253,186,116,0.6)] animate-pulse-slow"></div>
        {/* Rays */}
        <div className="absolute -inset-4 border-2 border-yellow-200/30 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute -inset-8 border border-orange-300/20 rounded-full border-dashed animate-[spin_30s_linear_infinite_reverse]"></div>
    </div>
);

const MoonVisual = () => (
    <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-gray-100 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden">
            <div className="absolute top-2 left-4 w-4 h-4 bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 right-5 w-6 h-6 bg-gray-200 rounded-full opacity-50"></div>
        </div>
        <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)]"></div>
    </div>
);

const SunsetVisual = () => (
    <div className="w-full h-full flex flex-col justify-end items-center relative overflow-hidden">
        {/* Sun dipping */}
        <div className="w-32 h-32 bg-gradient-to-b from-orange-400 to-red-500 rounded-full shadow-[0_0_50px_rgba(249,115,22,0.6)] translate-y-1/3"></div>
        {/* Horizon Line */}
        <div className="w-full h-px bg-white/30 z-10"></div>
        {/* Reflection lines */}
        <div className="w-32 h-1 bg-white/20 rounded-full mt-2"></div>
        <div className="w-24 h-1 bg-white/10 rounded-full mt-1"></div>
        <div className="w-16 h-1 bg-white/05 rounded-full mt-1"></div>
    </div>
);

const Stars = () => (
    <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
            <div 
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    opacity: Math.random() * 0.7 + 0.3,
                    animationDelay: `${Math.random() * 3}s`
                }}
            ></div>
        ))}
    </div>
);

export const WorldTimeSection: React.FC<WorldTimeSectionProps> = ({ currentLang }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [upcomingHours, setUpcomingHours] = useState<string[]>([]);
    const [timePhase, setTimePhase] = useState<TimePhase>('day');
    const [loadingPhase, setLoadingPhase] = useState(false);
    const [loadingCountries, setLoadingCountries] = useState(true);

    const t = translations[currentLang].ui;
    const dir = translations[currentLang].direction;

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            setLoadingCountries(true);
            const data = await getAllCountries();
            setCountries(data);
            if (data.length > 0) {
                // Default to SA or first one
                const defaultCountry = data.find(c => c.code === 'SA') || data[0];
                setSelectedCountry(defaultCountry);
            }
            setLoadingCountries(false);
        };
        fetchCountries();
    }, []);

    // Calculate Time Phase based on Prayer Times
    useEffect(() => {
        if (!selectedCountry) return;

        const calculatePhase = async () => {
            setLoadingPhase(true);
            try {
                // Get current time components in the target timezone
                const now = new Date();
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: selectedCountry.timezone,
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false
                });
                const parts = formatter.formatToParts(now);
                const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
                const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
                const currentMinutes = hour * 60 + minute;

                // Fetch prayer times for the capital
                // Use English names for API reliability
                const data = await getPrayerTimesByCity(selectedCountry.capital.en, selectedCountry.name.en);
                
                if (data) {
                    const parseTime = (timeStr: string) => {
                        const [h, m] = timeStr.split(' ')[0].split(':').map(Number);
                        return h * 60 + m;
                    };

                    const fajr = parseTime(data.timings.Fajr);
                    const sunrise = parseTime(data.timings.Sunrise);
                    const maghrib = parseTime(data.timings.Maghrib);
                    const isha = parseTime(data.timings.Isha);

                    if (currentMinutes >= fajr && currentMinutes < sunrise) {
                        setTimePhase('dawn');
                    } else if (currentMinutes >= sunrise && currentMinutes < maghrib) {
                        setTimePhase('day');
                    } else if (currentMinutes >= maghrib && currentMinutes < isha) {
                        setTimePhase('sunset');
                    } else {
                        setTimePhase('night');
                    }
                } else {
                    // Fallback based on simple hours if API fails
                    if (hour >= 5 && hour < 7) setTimePhase('dawn');
                    else if (hour >= 7 && hour < 18) setTimePhase('day');
                    else if (hour >= 18 && hour < 20) setTimePhase('sunset');
                    else setTimePhase('night');
                }
            } catch (error) {
                console.error("Phase calc error:", error);
                setTimePhase('day');
            } finally {
                setLoadingPhase(false);
            }
        };

        calculatePhase();
    }, [selectedCountry]);

    // Update Clock
    useEffect(() => {
        if (!selectedCountry) return;

        const updateTime = () => {
            try {
                const now = new Date();
                const timeString = now.toLocaleTimeString(currentLang === 'ar' ? 'ar-SA' : 'en-US', {
                    timeZone: selectedCountry.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
                setCurrentTime(timeString);

                const schedule = [];
                for(let i=1; i<=6; i++) {
                    const future = new Date(now.getTime() + i * 60 * 60 * 1000);
                    const hourStr = future.toLocaleTimeString(currentLang === 'ar' ? 'ar-SA' : 'en-US', {
                        timeZone: selectedCountry.timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    schedule.push(hourStr);
                }
                setUpcomingHours(schedule);

            } catch (e) {
                setCurrentTime('--:--:--');
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [selectedCountry, currentLang]);

    const getFlagUrl = (code: string) => `https://flagcdn.com/w320/${code?.toLowerCase() || 'sa'}.png`;

    const getBackgroundGradient = () => {
        switch(timePhase) {
            case 'dawn': return 'bg-gradient-to-br from-[#fdba74] via-[#f97316] to-[#3b82f6]'; // Orange to Blue
            case 'day': return 'bg-gradient-to-b from-[#0ea5e9] to-[#7dd3fc]'; // Sky Blue
            case 'sunset': return 'bg-gradient-to-b from-[#4c1d95] via-[#db2777] to-[#f59e0b]'; // Purple to Orange
            case 'night': return 'bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]'; // Deep Blue
        }
    };

    if (loadingCountries) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!selectedCountry) return null;

    return (
        <div className="flex flex-col h-full animate-fade-in">
            {/* Country Selector */}
            <div className="mb-6">
                <label className="block text-white/50 text-xs mb-2 px-1">{t.selectCountry}</label>
                <div className="relative">
                    <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-emerald-500 transition-colors custom-scrollbar"
                        value={selectedCountry.code}
                        onChange={(e) => {
                            const country = countries.find(c => c.code === e.target.value);
                            if(country) setSelectedCountry(country);
                        }}
                        dir={dir}
                    >
                        {countries.map(c => (
                            <option key={c.code} value={c.code} className="bg-[#1e293b]">
                                {c.name[currentLang]} {c.code !== 'SA' && c.code !== 'MA' ? `(${c.name.en})` : ''}
                            </option>
                        ))}
                    </select>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-4' : 'right-4'} pointer-events-none text-white/50`}>
                        ▼
                    </div>
                </div>
            </div>

            {/* Main Scene Card */}
            <div className={`relative rounded-[2.5rem] p-6 shadow-2xl overflow-hidden transition-all duration-1000 min-h-[300px] flex flex-col items-center justify-between ${getBackgroundGradient()}`}>
                
                {/* Visual Scene Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Day Visuals */}
                    {timePhase === 'day' && (
                        <>
                            <div className="absolute top-4 right-8 animate-float-slow">
                                <SunVisual />
                            </div>
                            <div className="absolute top-20 left-[-20px] w-48 h-32 animate-float-delayed">
                                <CloudVisual />
                            </div>
                            <div className="absolute top-10 right-[-40px] w-32 h-24 opacity-60 animate-float">
                                <CloudVisual />
                            </div>
                        </>
                    )}

                    {/* Night Visuals */}
                    {timePhase === 'night' && (
                        <>
                            <Stars />
                            <div className="absolute top-8 right-8 animate-float-slow">
                                <MoonVisual />
                            </div>
                        </>
                    )}

                    {/* Sunset Visuals */}
                    {timePhase === 'sunset' && (
                        <div className="absolute bottom-0 w-full h-1/2">
                            <SunsetVisual />
                        </div>
                    )}

                    {/* Dawn Visuals */}
                    {timePhase === 'dawn' && (
                        <>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-40 translate-y-1/2"></div>
                            <div className="absolute top-10 left-10 opacity-50">
                                <CloudVisual />
                            </div>
                        </>
                    )}
                </div>

                {/* Content Layer (Glassmorphism) */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    
                    {/* Flag & Phase */}
                    <div className="flex items-center gap-4 mb-4 bg-black/20 backdrop-blur-md p-2 pr-4 pl-2 rounded-full border border-white/10">
                        <img 
                            src={getFlagUrl(selectedCountry.code)} 
                            alt="flag" 
                            className="w-8 h-8 rounded-full object-cover shadow-md border border-white/20"
                        />
                        <span className="text-xs font-bold text-white tracking-wide">
                            {loadingPhase ? '...' : phaseLabels[timePhase][currentLang]}
                        </span>
                    </div>

                    {/* Country Name */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg font-cairo leading-snug">
                            {selectedCountry.name[currentLang]}
                        </h2>
                        <p className="text-white/80 text-sm font-mono tracking-wider uppercase">
                            {selectedCountry.capital[currentLang]}
                        </p>
                    </div>

                    {/* Digital Clock */}
                    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center shadow-lg mb-4">
                        <span className="text-5xl md:text-6xl font-bold font-mono text-white tracking-tight drop-shadow-xl block">
                            {currentTime}
                        </span>
                        <span className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 block">
                            {t.currentTime}
                        </span>
                    </div>

                    {/* Currency & Region - Fixed Height Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full mt-6">
                        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center h-24 transition-all hover:bg-black/30">
                            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2">{t.currency}</span>
                            <span className="text-lg font-bold text-white font-mono tracking-wide truncate w-full text-center">
                                {selectedCountry.currency[currentLang]}
                            </span>
                        </div>
                        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center h-24 transition-all hover:bg-black/30">
                            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2">{t.region}</span>
                            <span className="text-base font-bold text-white tracking-wide truncate w-full text-center">
                                {selectedCountry.region[currentLang]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Time Table */}
            <div className="mt-6 flex-grow">
                <h3 className="text-white/70 text-sm font-bold mb-3 flex items-center gap-2">
                    <GridIcon className="w-4 h-4 text-emerald-400" />
                    {t.timeTable}
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="grid grid-cols-3 bg-white/5 p-2 text-[10px] text-white/40 font-bold uppercase tracking-wider text-center">
                        <div>+1 {currentLang === 'ar' ? 'ساعة' : 'Hour'}</div>
                        <div>+3 {currentLang === 'ar' ? 'ساعات' : 'Hours'}</div>
                        <div>+6 {currentLang === 'ar' ? 'ساعات' : 'Hours'}</div>
                    </div>
                    <div className="grid grid-cols-3 p-3 text-center">
                        <div className="font-mono text-white font-bold">{upcomingHours[0]}</div>
                        <div className="font-mono text-white font-bold">{upcomingHours[2]}</div>
                        <div className="font-mono text-white font-bold">{upcomingHours[5]}</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float { animation: float 4s ease-in-out infinite; }
                .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; animation-delay: 1s; }
                .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            `}</style>
        </div>
    );
};
