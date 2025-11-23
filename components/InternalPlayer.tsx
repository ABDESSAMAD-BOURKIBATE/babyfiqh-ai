
import React, { useEffect, useRef, useState } from 'react';
import { PauseIcon } from './icons/PauseIcon';
import { PlayIcon } from './icons/PlayIcon';
import { XIcon } from './icons/XIcon';

interface InternalPlayerProps {
    url: string;
    title: string;
    subtitle?: string;
    onClose: () => void;
}

const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const InternalPlayer: React.FC<InternalPlayerProps> = ({ url, title, subtitle, onClose }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Helper to ensure HTTPS
    const processUrl = (inputUrl: string) => {
        let finalUrl = inputUrl.trim();
        if (typeof window !== 'undefined' && window.location.protocol === 'https:' && finalUrl.startsWith('http:')) {
            finalUrl = finalUrl.replace('http:', 'https:');
        }
        return finalUrl;
    };

    useEffect(() => {
        if (!url) return;
        
        setIsLoading(true);
        setIsPlaying(false);
        
        // Cleanup previous
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }

        const audio = new Audio();
        audio.src = processUrl(url);
        // Removing crossOrigin="anonymous" can sometimes help with specific CDNs if CORS headers aren't perfect,
        // but usually it's good practice. If issues persist, try removing it.
        audio.crossOrigin = "anonymous"; 
        audioRef.current = audio;
        
        const setAudioData = () => {
            setDuration(audio.duration);
            setIsLoading(false);
            // Attempt auto-play when ready
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(e => console.warn("Auto-play prevented:", e));
            }
        };

        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const handleEnded = () => setIsPlaying(false);
        
        const handleError = (e: Event) => {
            console.error("Audio error:", audio.error);
            setIsLoading(false);
            setIsPlaying(false);
        };

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        // Initial load
        audio.load();

        return () => {
            audio.pause();
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [url]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedTime = (x / rect.width) * duration;
        if(isFinite(clickedTime)) {
            audioRef.current.currentTime = clickedTime;
        }
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-xl border-t border-emerald-500/30 p-4 z-50 animate-slide-up shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
            {/* Progress Bar */}
            <div 
                className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 cursor-pointer group"
                onClick={handleSeek}
            >
                <div 
                    className="h-full bg-emerald-500 relative transition-all duration-100" 
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
                <button 
                    onClick={togglePlayPause}
                    disabled={isLoading}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all active:scale-95 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : isPlaying ? (
                        <PauseIcon className="w-5 h-5" />
                    ) : (
                        <PlayIcon className="w-5 h-5 pl-0.5" />
                    )}
                </button>

                <div className="flex-grow min-w-0">
                    <h4 className="text-white font-bold text-sm truncate font-cairo">{title}</h4>
                    {subtitle && <p className="text-emerald-400/70 text-xs truncate">{subtitle}</p>}
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
            <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};
