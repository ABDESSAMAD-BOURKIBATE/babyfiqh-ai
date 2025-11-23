
import React, { useEffect, useRef, useState } from 'react';
import { PauseIcon } from './icons/PauseIcon';
import { PlayIcon } from './icons/PlayIcon';
import { XIcon } from './icons/XIcon';
import { SpeakerIcon } from './icons/SpeakerIcon';

// Inline Download Icon
const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" {...props}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

interface GlobalPlayerProps {
    url: string;
    title: string;
    subtitle: string;
    isPlaying: boolean;
    onPlayPause: (isPlaying: boolean) => void;
    onClose: () => void;
}

export const GlobalPlayer: React.FC<GlobalPlayerProps> = ({ url, title, subtitle, isPlaying, onPlayPause, onClose }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState(false);
    
    const retryCountRef = useRef(0);

    // Helper to process URL
    const processUrl = (inputUrl: string) => {
        let finalUrl = inputUrl.trim();
        // Attempt HTTPS upgrade if on HTTPS page to avoid mixed content blocking
        if (typeof window !== 'undefined' && window.location.protocol === 'https:' && finalUrl.startsWith('http:')) {
            finalUrl = finalUrl.replace('http:', 'https:');
        }
        return finalUrl;
    };

    useEffect(() => {
        if (!url) return;
        
        setError(false);
        retryCountRef.current = 0;
        setIsDownloading(true);

        // Cleanup previous
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current.load();
            audioRef.current = null;
        }

        const audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.preload = "auto";
        
        // Critical for mobile background playback
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');

        const processedUrl = processUrl(url);
        audio.src = processedUrl;
        audioRef.current = audio;

        const updateTime = () => {
            if (audio.duration && isFinite(audio.duration)) {
                setProgress((audio.currentTime / audio.duration) * 100);
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            onPlayPause(false);
            setProgress(0);
        };

        const handleError = (e: Event) => {
            const code = audio.error?.code;
            const message = audio.error?.message;
            console.warn(`Audio error (Code: ${code}):`, message);
            
            // Try once or twice then fail
            if (retryCountRef.current < 2) {
                retryCountRef.current++;
                setTimeout(() => {
                    if (audioRef.current === audio) {
                        audio.load();
                        if (isPlaying) audio.play().catch(() => {});
                    }
                }, 1500);
            } else {
                setIsDownloading(false);
                setError(true);
                onPlayPause(false);
            }
        };

        const handleWaiting = () => {
            setIsDownloading(true);
        };

        const handlePlaying = () => {
            setIsDownloading(false);
            setError(false);
            retryCountRef.current = 0;
        };

        // Attach Listeners
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('loadedmetadata', () => {
             if(audioRef.current) {
                 const d = audio.duration;
                 setDuration(d);
             }
        });

        // Initial Play
        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Initial play error:", error);
                    onPlayPause(false);
                });
            }
        }

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('playing', handlePlaying);
            audio.pause();
            audio.src = "";
            audio.load();
        };
    }, [url]); 

    // Handle Play/Pause Toggle
    useEffect(() => {
        if (!audioRef.current) return;
        
        if (isPlaying && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.warn("Toggle play failed:", e));
        } else if (!isPlaying && !audioRef.current.paused) {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration || error) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedTime = (x / rect.width) * duration;
        if (isFinite(clickedTime)) {
            audioRef.current.currentTime = clickedTime;
        }
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDownloading || !url || error) return;

        setIsDownloading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `${title || 'audio'}.mp3`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
            window.open(url, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };

    let statusText = subtitle;
    if (error) statusText = "Unavailable";
    else if (isDownloading) statusText = "Buffering...";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0f172a]/95 border-t border-white/10 backdrop-blur-xl p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up">
            {/* Progress Bar */}
            <div 
                className={`absolute top-0 left-0 right-0 h-1 ${error ? 'bg-red-900/50' : 'bg-white/10 cursor-pointer group'}`}
                onClick={!error ? handleSeek : undefined}
            >
                <div 
                    className={`h-full transition-all duration-100 relative ${error ? 'bg-red-500 w-full' : 'bg-amber-500 group-hover:h-1.5'}`} 
                    style={{ width: error ? '100%' : `${progress}%` }}
                >
                    {!error && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                </div>
            </div>

            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-3 overflow-hidden flex-grow">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors relative
                        ${error ? 'bg-red-500/20 text-red-500' : (isPlaying ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/50')}`}>
                        {error ? <WarningIcon className="w-5 h-5" /> : <SpeakerIcon className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                        <h4 className={`font-bold text-sm truncate font-cairo leading-tight ${error ? 'text-red-400' : 'text-white'}`}>
                            {title}
                        </h4>
                        <p className="text-white/50 text-xs truncate font-cairo leading-tight">
                            {statusText}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    {!error && (
                        <button 
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`w-8 h-8 rounded-full hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors ${isDownloading ? 'text-amber-400 cursor-wait' : 'text-white/50'}`}
                            title="Download"
                        >
                            {isDownloading ? (
                                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <DownloadIcon className="w-5 h-5" />
                            )}
                        </button>
                    )}
                    
                    <button 
                        onClick={() => onPlayPause(!isPlaying)}
                        disabled={error} 
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all transform active:scale-95 shadow-lg
                            ${error ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 border border-white/10'}`}
                    >
                        {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 pl-0.5" />}
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-red-500/20 text-white/50 hover:text-red-400 flex items-center justify-center transition-colors"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
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
