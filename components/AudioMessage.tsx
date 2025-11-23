

import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { Language, CharacterId } from '../utils/translations';

interface AudioMessageProps {
  src: string;
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

export const AudioMessage: React.FC<AudioMessageProps> = ({ src, currentLang = 'en', isDarkMode, characterId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      const setAudioTime = () => setCurrentTime(audio.currentTime);
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0); 
        if (audio) audio.playbackRate = playbackRate; // Reset rate ensuring next play is correct
      };

      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', handleEnded);

      if (audio.readyState > 0) {
        setAudioData();
      }

      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [src, playbackRate]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.playbackRate = playbackRate;
        audio.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newRate = playbackRate === 1 ? 1.5 : (playbackRate === 1.5 ? 2 : 1);
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Define Theme Styles for User Audio
  // User audio is usually distinct from Model audio. 
  // We'll keep it cleaner, maybe matching the "User Bubble" color but with controls.
  const userColor = characterId === 'limanour' 
    ? (isDarkMode ? 'bg-[#065f46]' : 'bg-[#047857]')
    : (isDarkMode ? 'bg-[#9d174d]' : 'bg-[#be185d]');
  
  const userButtonColor = 'bg-white/20 hover:bg-white/30 text-white';

  return (
    <div className={`flex flex-col w-64 md:w-80 gap-2 p-3 rounded-2xl ${userColor} backdrop-blur-sm shadow-md border border-white/20`}>
        <div className="flex items-center gap-3">
            <audio ref={audioRef} src={src} preload="metadata"></audio>
            
            <button 
                onClick={togglePlayPause} 
                className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 transition-transform transform hover:scale-110 ${userButtonColor}`}
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4 pl-0.5" />}
            </button>

            <div className="flex-grow flex flex-col gap-1">
                <div 
                    className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden cursor-pointer"
                     onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        if(audioRef.current && duration) {
                            audioRef.current.currentTime = (x / rect.width) * duration;
                        }
                    }}
                >
                    <div 
                        className="bg-white h-1.5 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-white/90 px-0.5">
                    <span>{formatTime(currentTime, currentLang)}</span>
                    <span>{formatTime(duration, currentLang)}</span>
                </div>
            </div>

            <button 
                onClick={toggleSpeed}
                className="text-[10px] font-bold bg-black/10 hover:bg-black/20 text-white px-2 py-1 rounded-md min-w-[32px] transition-colors"
            >
                {currentLang === 'ar' ? toEasternArabic(playbackRate + 'x') : playbackRate + 'x'}
            </button>
        </div>
    </div>
  );
};