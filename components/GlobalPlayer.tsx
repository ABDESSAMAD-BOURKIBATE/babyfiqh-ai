
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

interface GlobalPlayerProps {
    url: string;
    title: string;
    subtitle: string;
    isPlaying: boolean;
    onPlayPause: (isPlaying: boolean) => void;
    onClose: () => void;
    canDownload?: boolean;
}

export const GlobalPlayer: React.FC<GlobalPlayerProps> = ({ url, title, subtitle, isPlaying, onPlayPause, onClose, canDownload = false }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Initialize Audio
    useEffect(() => {
        // Cleanup previous audio and abort any pending load
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
            audioRef.current = null;
        }

        abortControllerRef.current = new AbortController();

        const audio = new Audio();
        audio.src = url;
        audioRef.current = audio;

        const updateTime = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            onPlayPause(false);
            setProgress(0);
        };

        const handleError = (e: Event) => {
            console.warn("Audio playback error (likely interrupted or source issue):", e);
            // Do not stop global state immediately to avoid UI flicker if it's just a load race condition
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', () => {
            if (audioRef.current) setDuration(audio.duration);
        });
        audio.addEventListener('error', handleError);

        // Auto play new track
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    onPlayPause(true);
                })
                .catch(error => {
                    if (error.name !== 'AbortError') {
                        console.error("Playback failed:", error);
                        onPlayPause(false);
                    }
                });
        }

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.pause();
        };
    }, [url]);

    // Handle external Play/Pause changes
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying && audioRef.current.paused) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        if (e.name !== 'AbortError') console.error("Resume failed:", e);
                    });
                }
            } else if (!isPlaying && !audioRef.current.paused) {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedTime = (x / rect.width) * duration;
        audioRef.current.currentTime = clickedTime;
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDownloading) return;

        setIsDownloading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `${title}.mp3`);
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed, falling back to direct link:", error);
            // Fallback: Use hidden iframe to trigger download without leaving page
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);

            // Cleanup iframe after a delay
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 60000);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0f172a]/95 border-t border-white/10 backdrop-blur-xl p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up">
            {/* Progress Bar */}
            <div
                className="absolute top-0 left-0 right-0 h-1 bg-white/10 cursor-pointer group"
                onClick={handleSeek}
            >
                <div
                    className="h-full bg-amber-500 transition-all duration-100 relative group-hover:h-1.5"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-3 overflow-hidden flex-grow">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isPlaying ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/50'}`}>
                        <SpeakerIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                        <h4 className="text-white font-bold text-sm truncate font-cairo leading-tight">{title}</h4>
                        <p className="text-white/50 text-xs truncate font-cairo leading-tight">{subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    {canDownload && (
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`w-8 h-8 rounded-full hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors ${isDownloading ? 'opacity-50 cursor-wait' : ''}`}
                            title="Download"
                        >
                            {isDownloading ? (
                                <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <DownloadIcon className="w-5 h-5" />
                            )}
                        </button>
                    )}

                    <button
                        onClick={() => onPlayPause(!isPlaying)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all transform active:scale-95"
                    >
                        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 pl-0.5" />}
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
