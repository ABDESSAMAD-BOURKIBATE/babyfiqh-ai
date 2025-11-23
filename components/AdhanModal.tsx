
import React, { useState, useEffect, useCallback } from 'react';
import { getPrayerTimes, getPrayerTimesByCity, getQibla, getAzkarFromApi, AdhanResponse } from '../services/adhanService';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { MosqueIcon } from './icons/MosqueIcon';
import { CompassIcon } from './icons/CompassIcon';
import { SunIcon } from './icons/SunIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { WorldIcon } from './icons/WorldIcon';
import { KaabaIcon } from './icons/KaabaIcon';
import { azkarData as staticAzkarData, Zikr } from '../utils/azkarData';
import { WorldTimeSection } from './WorldTimeSection';

interface AdhanModalProps {
  onClose: () => void;
  currentLang: Language;
  onPlayMedia: (url: string, title: string, subtitle: string) => void;
}

export const AdhanModal: React.FC<AdhanModalProps> = ({ onClose, currentLang, onPlayMedia }) => {
  const [activeTab, setActiveTab] = useState<'prayers' | 'qibla' | 'azkar' | 'world'>('prayers');
  const [azkarCategory, setAzkarCategory] = useState<'morning' | 'evening' | 'postPrayer' | null>(null);
  
  // Data States
  const [data, setData] = useState<AdhanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiAzkar, setApiAzkar] = useState<any>(null);
  
  // Qibla State
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [hasCompassPermission, setHasCompassPermission] = useState(false);
  const [calibrationNeeded, setCalibrationNeeded] = useState(false);

  // Input States
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isSetupMode, setIsSetupMode] = useState(true);

  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;

  // Load Saved Location & Azkar on Mount
  useEffect(() => {
      getAzkarFromApi().then(data => {
          if (data) setApiAzkar(data);
      });

      const savedLocation = localStorage.getItem('babyfiqh_prayer_location');
      if (savedLocation) {
          const { city: savedCity, country: savedCountry } = JSON.parse(savedLocation);
          setCity(savedCity);
          setCountry(savedCountry);
          fetchPrayersByCity(savedCity, savedCountry);
      } else {
          setIsSetupMode(true);
      }
  }, []);

  // Request Compass Permission (iOS 13+)
  const requestCompassPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setHasCompassPermission(true);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          alert('Permission denied. Qibla compass requires orientation access.');
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // Non-iOS devices usually don't need explicit permission like this, or use the absolute event
      setHasCompassPermission(true);
    }
  };

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
      let heading = 0;
      
      // iOS
      // @ts-ignore
      if (e.webkitCompassHeading) {
          // @ts-ignore
          heading = e.webkitCompassHeading;
      } 
      // Android / Standard
      else if (e.alpha !== null) {
          // alpha is counter-clockwise, we need clockwise
          // In some implementations, 360 - alpha matches compass heading
          heading = 360 - e.alpha;
      }

      setCompassHeading(heading);
      
      // Simple check for calibration (if heading jumps too erratically or accuracy is reported low)
      // @ts-ignore
      if (e.webkitCompassAccuracy && e.webkitCompassAccuracy < 0) {
          setCalibrationNeeded(true);
      } else {
          setCalibrationNeeded(false);
      }
  }, []);

  const handleAbsoluteOrientation = useCallback((e: any) => {
      // Preferred for Android Chrome
      if (e.alpha !== null) {
          setCompassHeading(360 - e.alpha);
      }
  }, []);

  // Attach Compass Listeners
  useEffect(() => {
      if (activeTab === 'qibla') {
          // Android Chrome absolute orientation
          // Fix: Cast window to any to check for property existence without narrowing type
          if ('ondeviceorientationabsolute' in (window as any)) {
              (window as any).addEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
              setHasCompassPermission(true);
          } else if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
              // Standard non-iOS
              window.addEventListener('deviceorientation', handleOrientation, true);
              setHasCompassPermission(true);
          }
          // iOS logic is handled by the button click in render
      }

      return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
          (window as any).removeEventListener('deviceorientationabsolute', handleAbsoluteOrientation);
      };
  }, [activeTab, handleOrientation, handleAbsoluteOrientation]);


  const fetchPrayersByCity = async (c: string, co: string) => {
      setLoading(true);
      setError(null);
      const response = await getPrayerTimesByCity(c, co);
      if (response) {
          setData(response);
          setIsSetupMode(false);
          localStorage.setItem('babyfiqh_prayer_location', JSON.stringify({ city: c, country: co }));
      } else {
          setError(t.error);
      }
      setLoading(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!city || !country) return;
      fetchPrayersByCity(city, country);
  };

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          const response = await getPrayerTimes(latitude, longitude);
          if (response) {
            setData(response);
            setIsSetupMode(false);
          } else {
            setError(t.error);
          }
          
          // Get accurate Qibla from API
          const qibla = await getQibla(latitude, longitude);
          setQiblaAngle(qibla);
          
          setLoading(false);
        },
        (err) => {
          console.warn(err);
          setError(t.locationError);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const playAdhan = () => {
      // High reliability HTTPS Adhan (Makkah)
      // Using Archive.org for stability and HTTPS support
      const adhanUrl = "https://ia800302.us.archive.org/10/items/AdhanMakkah/Adhan%20Makkah.mp3";
      onPlayMedia(adhanUrl, t.callOfMercy, "Makkah Al-Mukarramah");
  };

  // --- Renderers ---

  const renderLocationSetup = () => (
      <div className="flex flex-col items-center justify-center h-full py-8 px-4 animate-fade-in">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl w-full max-w-xs text-center shadow-xl">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <MosqueIcon className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.prayerTimes}</h3>
              <p className="text-white/50 text-sm mb-6">{t.enterCity}</p>

              <form onSubmit={handleManualSubmit} className="flex flex-col gap-3 w-full">
                  <input 
                      type="text" 
                      placeholder={t.city} 
                      value={city} onChange={e => setCity(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-emerald-500 outline-none text-center transition-all focus:bg-black/50"
                  />
                  <input 
                      type="text" 
                      placeholder={t.country} 
                      value={country} onChange={e => setCountry(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-emerald-500 outline-none text-center transition-all focus:bg-black/50"
                  />
                  
                  {error && <p className="text-red-400 text-xs bg-red-500/10 p-2 rounded">{error}</p>}

                  <button 
                      type="submit"
                      disabled={!city || !country || loading}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 font-bold shadow-lg transition-all mt-2 flex justify-center items-center gap-2"
                  >
                      {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                          t.getTimes
                      )}
                  </button>
              </form>

              <div className="flex items-center gap-3 my-6 w-full">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span className="text-white/30 text-xs">OR</span>
                  <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <button 
                  onClick={requestLocation} 
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                  <CompassIcon className="w-4 h-4" />
                  {t.locateMe} (GPS)
              </button>
          </div>
      </div>
  );

  const renderPrayerTimes = () => {
      if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>;
      if (isSetupMode || !data) return renderLocationSetup();

      const prayers = [
        { name: t.fajr, time: data.timings.Fajr },
        { name: t.sunrise, time: data.timings.Sunrise },
        { name: t.dhuhr, time: data.timings.Dhuhr },
        { name: t.asr, time: data.timings.Asr },
        { name: t.maghrib, time: data.timings.Maghrib },
        { name: t.isha, time: data.timings.Isha },
      ];

      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const nextPrayerIndex = prayers.findIndex(p => p.time > currentTime);
      const activeIndex = nextPrayerIndex === -1 ? 0 : nextPrayerIndex;

      return (
        <div className="space-y-6 animate-fade-in relative">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2 text-emerald-200/70 text-xs">
                    <MosqueIcon className="w-4 h-4" />
                    <span>{city || 'GPS Location'}, {country}</span>
                </div>
                <button 
                    onClick={() => setIsSetupMode(true)} 
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                    title="Change Location"
                >
                    <SettingsIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="flex justify-between items-center bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/20 shadow-lg backdrop-blur-sm">
                <div className={`text-center flex-1 ${dir === 'rtl' ? 'border-l' : 'border-r'} border-white/10`}>
                    <span className="block text-lg font-bold text-emerald-400 font-amiri">
                        {data.date.hijri.day} {data.date.hijri.month.ar}
                    </span>
                    <span className="text-xs text-emerald-200/60 font-mono">{data.date.hijri.year}</span>
                </div>
                <div className="text-center flex-1">
                    <span className="block text-base font-bold text-white font-cairo">
                        {data.date.gregorian.weekday.en}
                    </span>
                    <span className="text-xs text-white/40 font-mono">{data.date.gregorian.date}</span>
                </div>
            </div>

            <div className="space-y-2">
                {prayers.map((prayer, index) => (
                    <div 
                        key={prayer.name}
                        className={`flex justify-between items-center p-3.5 rounded-xl transition-all duration-300
                            ${index === activeIndex 
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-[1.02] border border-emerald-400/50 z-10' 
                                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-transparent'
                            }`}
                    >
                        <span className="font-bold text-lg font-amiri">{prayer.name}</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-lg tracking-wider">{prayer.time.split(' ')[0]}</span>
                            <span className="text-[10px] opacity-60">{prayer.time.split(' ')[1] || ''}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Explicit Play Adhan Button */}
            <button 
                onClick={playAdhan}
                className="w-full mt-4 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 group"
            >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                </div>
                <span>{t.listen} {t.callOfMercy}</span>
            </button>

            <div className="text-center text-[10px] text-white/30 mt-4">
                {data.meta.timezone} • Aladhan API
            </div>
        </div>
      );
  };

  const renderQibla = () => {
      if (!qiblaAngle) return (
          <div className="text-center py-10 text-white/70 flex flex-col items-center justify-center h-full animate-fade-in">
             <p className="mb-6 text-sm max-w-[200px] leading-relaxed">{t.locationError} - {currentLang === 'ar' ? 'مطلوب لنظام القبلة' : 'Required for Qibla'}</p>
             <button onClick={requestLocation} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold flex items-center gap-2 transition-all shadow-lg">
                 <CompassIcon className="w-4 h-4" />
                 {t.locateMe}
             </button>
          </div>
      );

      return (
          <div className="flex flex-col items-center justify-center py-8 animate-fade-in h-full">
              
              {/* Compass Header / Permission Button */}
              {!hasCompassPermission && typeof (DeviceOrientationEvent as any).requestPermission === 'function' ? (
                  <button 
                    onClick={requestCompassPermission}
                    className="bg-amber-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-amber-400 transition-all mb-8 animate-pulse border border-amber-300/50 flex items-center gap-2"
                  >
                      <CompassIcon className="w-5 h-5" />
                      {t.enableCompass}
                  </button>
              ) : (
                  <div className="text-emerald-400 text-sm font-bold mb-8 tracking-wider bg-emerald-900/30 px-4 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                      {t.qiblaDirection}: {Math.round(qiblaAngle)}°
                  </div>
              )}

              {/* Compass Ring */}
              <div className="relative w-64 h-64 rounded-full border-4 border-white/10 shadow-[0_0_60px_rgba(16,185,129,0.15)] bg-gradient-to-b from-[#1e293b] to-[#0f172a] overflow-hidden">
                  
                  {/* Rotating Inner Dial (Based on Device Heading) */}
                  <div 
                    className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `rotate(${-compassHeading}deg)` }}
                  >
                      {/* Directions */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl drop-shadow-md">N</div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 font-bold">S</div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">E</div>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">W</div>
                      
                      {/* Ticks */}
                      {[0, 90, 180, 270].map(deg => (
                          <div key={deg} className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-white/20 origin-bottom" style={{ transformOrigin: '50% 128px', transform: `rotate(${deg}deg)` }}></div>
                      ))}
                      {[30, 60, 120, 150, 210, 240, 300, 330].map(deg => (
                          <div key={deg} className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-white/10 origin-bottom" style={{ transformOrigin: '50% 128px', transform: `rotate(${deg}deg)` }}></div>
                      ))}

                      {/* Kaaba Target Indicator */}
                      {/* This rotates with the dial, so it stays at the correct geographic bearing relative to North */}
                      <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex justify-center pt-8"
                        style={{ transform: `rotate(${qiblaAngle}deg)` }}
                      >
                          <div className="flex flex-col items-center gap-1">
                              <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/50 blur-lg rounded-full animate-pulse"></div>
                                <KaabaIcon className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,1)] relative z-10" />
                              </div>
                              <div className="w-1 h-10 bg-gradient-to-b from-emerald-500 to-transparent rounded-full opacity-80"></div>
                          </div>
                      </div>
                  </div>

                  {/* Fixed Device Center Indicator (Phone Axis) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-400 z-20 shadow-lg"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-red-500/80 z-10"></div>
              </div>
              
              {calibrationNeeded && (
                  <p className="text-amber-400 text-xs mt-4 animate-pulse font-bold">⚠ {currentLang === 'ar' ? 'يرجى معايرة البوصلة (حرك الهاتف رقم 8)' : 'Calibrate Compass (Figure 8 motion)'}</p>
              )}

              <p className="text-center text-white/40 text-xs mt-6 max-w-xs leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  {t.rotatePhone}
              </p>
          </div>
      );
  };

  const ZikrCounter: React.FC<{ zikr: Zikr, onComplete: () => void }> = ({ zikr, onComplete }) => {
      const [count, setCount] = useState(0);
      const targetCount = zikr.count ? parseInt(zikr.count.toString()) : 1;
      
      const handleClick = () => {
          if (count < targetCount) {
              const newCount = count + 1;
              setCount(newCount);
              if (navigator.vibrate) navigator.vibrate(10);
              if (newCount === targetCount) {
                  if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
                  setTimeout(onComplete, 500);
              }
          }
      };

      return (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 text-center animate-fade-in hover:bg-white/10 transition-colors">
              <p className="text-lg md:text-xl font-amiri leading-loose mb-6">{zikr.text || (zikr as any).zekr}</p>
              <button 
                onClick={handleClick}
                disabled={count >= targetCount}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold font-mono transition-all shadow-lg mx-auto ring-4 ring-offset-4 ring-offset-[#0f172a]
                    ${count >= targetCount 
                        ? 'bg-emerald-500 text-white ring-emerald-500/50' 
                        : 'bg-white/10 text-emerald-400 ring-white/10 hover:bg-white/20 active:scale-95'}`}
              >
                  {count >= targetCount ? '✓' : count}
              </button>
              <div className="mt-4 text-xs text-white/40">{t.azkarCount}: {targetCount}</div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(count / targetCount) * 100}%` }}></div>
              </div>
          </div>
      );
  };

  const renderAzkar = () => {
      if (!azkarCategory) {
          return (
              <div className="grid grid-cols-1 gap-4 animate-fade-in">
                  <button onClick={() => setAzkarCategory('morning')} className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-500/60 transition-all flex items-center gap-4 group">
                      <div className="p-3 bg-amber-500/20 rounded-full text-amber-400 group-hover:scale-110 transition-transform"><SunIcon className="w-8 h-8" /></div>
                      <span className="text-xl font-bold text-white">{t.morningAzkar}</span>
                  </button>
                  <button onClick={() => setAzkarCategory('evening')} className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:border-indigo-500/60 transition-all flex items-center gap-4 group">
                      <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-400 group-hover:scale-110 transition-transform"><div className="w-8 h-8 text-2xl text-center">🌙</div></div>
                      <span className="text-xl font-bold text-white">{t.eveningAzkar}</span>
                  </button>
                  <button onClick={() => setAzkarCategory('postPrayer')} className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center gap-4 group">
                      <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 group-hover:scale-110 transition-transform"><MosqueIcon className="w-8 h-8" /></div>
                      <span className="text-xl font-bold text-white">{t.postPrayerAzkar}</span>
                  </button>
              </div>
          );
      }

      let list: Zikr[] = [];
      if (apiAzkar) {
          if (azkarCategory === 'morning' && apiAzkar['أذكار الصباح']) list = apiAzkar['أذكار الصباح'].map((z: any) => ({ text: z.zekr, count: parseInt(z.count) || 1 }));
          else if (azkarCategory === 'evening' && apiAzkar['أذكار المساء']) list = apiAzkar['أذكار المساء'].map((z: any) => ({ text: z.zekr, count: parseInt(z.count) || 1 }));
          else if (azkarCategory === 'postPrayer' && apiAzkar['أذكار بعد السلام من الصلاة المفروضة']) list = apiAzkar['أذكار بعد السلام من الصلاة المفروضة'].map((z: any) => ({ text: z.zekr, count: parseInt(z.count) || 1 }));
      }
      if (list.length === 0) list = staticAzkarData[azkarCategory];
      
      return (
          <div className="animate-fade-in h-full flex flex-col">
              <button onClick={() => setAzkarCategory(null)} className="text-white/50 hover:text-white text-sm mb-4 flex items-center gap-2 w-fit">← {t.back}</button>
              <div className="flex-grow overflow-y-auto custom-scrollbar">
                  {list && list.length > 0 ? list.map((z, i) => <ZikrCounter key={i} zikr={z} onComplete={() => {}} />) : <div className="text-center py-10 text-white/50">{t.loading}</div>}
                  <div className="text-center text-emerald-400 font-bold py-4 opacity-50 text-xs">{apiAzkar ? `${t.source}: Azkar API` : `${t.source}: Local Data`}</div>
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose} dir={dir}>
      <div className="bg-[#0f172a] border border-emerald-500/30 rounded-3xl w-full max-w-md h-[85vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Header & Tabs */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 p-4 pb-0 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white font-cairo flex items-center gap-2">
                        <MosqueIcon className="w-6 h-6 text-emerald-400" />
                        {t.callOfMercy}
                    </h2>
                    <button 
                        onClick={playAdhan}
                        className="p-2 bg-emerald-600/20 hover:bg-emerald-600/40 rounded-full text-emerald-400 transition-all border border-emerald-500/30 animate-pulse"
                        title={t.listen}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                </div>
                <button onClick={onClose} className="text-white/60 hover:text-white"><XIcon className="w-6 h-6" /></button>
            </div>

            <div className="flex gap-2 relative z-10 overflow-x-auto custom-scrollbar pb-1">
                <button onClick={() => setActiveTab('prayers')} className={`flex-1 pb-2 text-xs md:text-sm font-bold border-b-4 transition-colors whitespace-nowrap ${activeTab === 'prayers' ? 'border-emerald-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}>{t.prayerTimes}</button>
                <button onClick={() => setActiveTab('qibla')} className={`flex-1 pb-2 text-xs md:text-sm font-bold border-b-4 transition-colors whitespace-nowrap ${activeTab === 'qibla' ? 'border-emerald-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}>{t.qibla}</button>
                <button onClick={() => setActiveTab('azkar')} className={`flex-1 pb-2 text-xs md:text-sm font-bold border-b-4 transition-colors whitespace-nowrap ${activeTab === 'azkar' ? 'border-emerald-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}>{t.azkar}</button>
                <button onClick={() => setActiveTab('world')} className={`flex-1 pb-2 text-xs md:text-sm font-bold border-b-4 transition-colors whitespace-nowrap flex items-center justify-center gap-1 ${activeTab === 'world' ? 'border-emerald-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}>
                    <WorldIcon className="w-3 h-3" /> {t.worldTimes}
                </button>
            </div>
        </div>

        <div className="flex-grow p-6 overflow-y-auto custom-scrollbar bg-[#0f172a]">
            {activeTab === 'prayers' && renderPrayerTimes()}
            {activeTab === 'qibla' && renderQibla()}
            {activeTab === 'azkar' && renderAzkar()}
            {activeTab === 'world' && <WorldTimeSection currentLang={currentLang} />}
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
