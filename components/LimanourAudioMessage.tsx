
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { Language, CharacterId } from '../utils/translations';

const decode = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};

interface LimanourAudioMessageProps {
  base64data: string;
  currentLang?: Language;
  isDarkMode: boolean;
  characterId: CharacterId;
}

const toEasternArabic = (str: string) => {
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
};

const formatTime = (time: number, lang: string = 'en') => {
  if (isNaN(time) || time === Infinity) {
      const zero = lang === 'ar' ? '٠:٠٠' : '0:00';
      return zero;
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const minStr = minutes.toString();
  const secStr = seconds.toString().padStart(2, '0');

  const timeStr = `${minStr}:${secStr}`;

  return lang === 'ar' ? toEasternArabic(timeStr) : timeStr;
};

const BAR_COUNT = 16; // Reduced bar count

export const LimanourAudioMessage: React.FC<LimanourAudioMessageProps> = ({ base64data, currentLang = 'en', isDarkMode, characterId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const startTimeRef = useRef(0);
  const startOffsetRef = useRef(0);
  const animationFrameRef = useRef(0);
  
  // Visualizer State
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(BAR_COUNT));

  const updateProgress = useCallback(() => {
    if (audioContextRef.current) {
      // Update Time
      const elapsedTime = (audioContextRef.current.currentTime - startTimeRef.current) * playbackRate;
      const newCurrentTime = startOffsetRef.current + elapsedTime;
      
      if (newCurrentTime < duration) {
        setCurrentTime(newCurrentTime);
        
        // Update Visualizer
        if (analyserRef.current) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);
            
            const step = Math.floor(bufferLength / BAR_COUNT);
            const samples = new Uint8Array(BAR_COUNT);
            for(let i=0; i<BAR_COUNT; i++) {
                let sum = 0;
                for(let j=0; j<step; j++) {
                    sum += dataArray[i*step + j];
                }
                samples[i] = sum / step;
            }
            setAudioData(samples);
        }

        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setCurrentTime(duration);
        setIsPlaying(false);
        startOffsetRef.current = 0;
        setAudioData(new Uint8Array(BAR_COUNT));
        if(sourceRef.current) {
            sourceRef.current.onended = null;
        }
      }
    }
  }, [duration, playbackRate]);

  const stopProgress = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);
    setAudioData(new Uint8Array(BAR_COUNT));
  }, []);
  
  const handlePlaybackEnd = useCallback(() => {
      setIsPlaying(false);
      setCurrentTime(0);
      startOffsetRef.current = 0;
      stopProgress();
  }, [stopProgress]);

  const play = useCallback(async () => {
    if (!audioBufferRef.current || !audioContextRef.current) return;
    if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
    }
    
    if(sourceRef.current) {
        sourceRef.current.onended = null;
        try { sourceRef.current.stop(); } catch(e) {}
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.playbackRate.value = playbackRate;

    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 128; // Reduced FFT size for fewer bars
    analyser.smoothingTimeConstant = 0.7; 
    analyserRef.current = analyser;

    source.connect(analyser);
    analyser.connect(audioContextRef.current.destination);
    
    source.onended = handlePlaybackEnd;

    source.start(0, startOffsetRef.current);
    sourceRef.current = source;
    
    startTimeRef.current = audioContextRef.current.currentTime;
    setIsPlaying(true);
  }, [handlePlaybackEnd, playbackRate]);

  const pause = useCallback(() => {
    if(sourceRef.current) {
        sourceRef.current.onended = null;
        try { sourceRef.current.stop(); } catch(e) {}
        sourceRef.current = null;
    }
    startOffsetRef.current = currentTime;
    setIsPlaying(false);
  }, [currentTime]);


  useEffect(() => {
    const initAudio = async () => {
      // @ts-ignore
      const context = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = context;
      try {
        const decodedData = decode(base64data);
        const buffer = await decodeAudioData(decodedData, context);
        audioBufferRef.current = buffer;
        setDuration(buffer.duration);
      } catch (error) {
          console.error("Failed to decode audio data:", error);
      }
    };
    initAudio();
    
    return () => {
      if(sourceRef.current){
          sourceRef.current.onended = null;
          try { sourceRef.current.stop(); } catch(e) {}
      }
      const closeCtx = async () => {
          const ctx = audioContextRef.current;
          if (ctx && ctx.state !== 'closed') {
              try { await ctx.close(); } catch(e) { console.warn(e); }
          }
      };
      closeCtx();
    };
  }, [base64data]);

  useEffect(() => {
      if (isPlaying) {
          if(sourceRef.current && sourceRef.current.playbackRate.value !== playbackRate && audioContextRef.current) {
             sourceRef.current.playbackRate.setValueAtTime(playbackRate, audioContextRef.current.currentTime);
             startOffsetRef.current = currentTime;
             startTimeRef.current = audioContextRef.current.currentTime;
          }
          
          stopProgress();
          animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
          stopProgress();
      }
      return stopProgress;
  }, [isPlaying, updateProgress, stopProgress, playbackRate, currentTime]);


  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      if (currentTime >= duration) {
        startOffsetRef.current = 0;
        setCurrentTime(0);
      }
      play();
    }
  };

  const toggleSpeed = () => {
    const newRate = playbackRate === 1 ? 1.5 : (playbackRate === 1.5 ? 2 : 1);
    setPlaybackRate(newRate);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // --- Dynamic Theme Styles ---
  const getThemeStyles = () => {
      if (isDarkMode) {
          return {
              container: "bg-slate-900/40 border-slate-700/50 shadow-slate-900/50",
              barColor: characterId === 'limanour' ? "bg-emerald-400" : "bg-pink-400",
              textColor: "text-slate-200",
              playBtn: characterId === 'limanour'
                  ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "bg-pink-500 hover:bg-pink-400 text-white shadow-[0_0_10px_rgba(236,72,153,0.3)]",
              progressTrack: "bg-slate-700",
              progressFill: characterId === 'limanour' 
                  ? "bg-gradient-to-r from-emerald-400 to-teal-300" 
                  : "bg-gradient-to-r from-pink-400 to-fuchsia-300"
          };
      } else {
          return {
              container: "bg-white/60 border-white/60 shadow-md",
              barColor: characterId === 'limanour' ? "bg-amber-500" : "bg-rose-500",
              textColor: "text-gray-700",
              playBtn: characterId === 'limanour'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-md shadow-amber-500/20"
                  : "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-md shadow-rose-500/20",
              progressTrack: "bg-gray-200",
              progressFill: characterId === 'limanour' 
                  ? "bg-amber-500" 
                  : "bg-rose-500"
          };
      }
  };

  const styles = getThemeStyles();

  return (
    <div className={`flex flex-col w-full min-w-[200px] md:w-[260px] gap-2 p-2.5 rounded-xl border backdrop-blur-xl transition-all duration-500 ${styles.container}`}>
      
      <div className="flex items-center gap-2.5">
        <button 
            onClick={togglePlayPause} 
            disabled={!duration}
            className={`rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${styles.playBtn}`}
            aria-label={isPlaying ? "Pause" : "Play"}
        >
            {isPlaying ? <PauseIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3 pl-0.5" />}
        </button>

        {/* Compact Visualizer */}
        <div className="flex-grow h-5 flex items-center justify-between gap-[1px] px-0.5">
             {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <div 
                    key={i}
                    className={`w-1 rounded-full transition-all duration-100 ease-out ${styles.barColor}`}
                    style={{ 
                        height: isPlaying ? `${Math.max(20, (audioData[i] / 255) * 100)}%` : '3px',
                        opacity: isPlaying ? 0.8 + (audioData[i] / 1200) : 0.4,
                    }}
                ></div>
            ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-1 px-1">
        <div 
            className={`w-full h-1 rounded-full cursor-pointer relative overflow-hidden group ${styles.progressTrack}`}
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedTime = (x / rect.width) * duration;
                if (audioContextRef.current) {
                   startOffsetRef.current = clickedTime;
                   startTimeRef.current = audioContextRef.current.currentTime;
                   if(isPlaying) play(); 
                   else setCurrentTime(clickedTime);
                }
            }}
        >
            <div 
                className={`h-full rounded-full transition-all duration-100 ${styles.progressFill}`} 
                style={{ width: `${progress}%` }}
            >
            </div>
        </div>

        <div className={`flex justify-between items-center text-[9px] font-bold font-mono ${styles.textColor} opacity-70`}>
            <span>{formatTime(currentTime, currentLang)}</span>
            <button 
                onClick={(e) => { e.stopPropagation(); toggleSpeed(); }}
                className="px-1 py-px rounded bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
            >
                 {currentLang === 'ar' ? toEasternArabic(playbackRate + 'x') : playbackRate + 'x'}
            </button>
            <span>{formatTime(duration, currentLang)}</span>
        </div>
      </div>
    </div>
  );
};
