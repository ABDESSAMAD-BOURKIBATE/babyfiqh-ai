import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../utils/translations';
import { projectAnthem, anthemAudioFiles } from '../utils/projectAnthem';

interface AnthemPlayerProps {
    currentLang: Language;
}

export const AnthemPlayer: React.FC<AnthemPlayerProps> = ({ currentLang }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const anthem = projectAnthem[currentLang] || projectAnthem.ar;

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) {
            console.log('Audio element not found');
            return;
        }

        console.log('Toggle play clicked, current state:', isPlaying);
        console.log('Audio src:', audio.src);
        console.log('Audio readyState:', audio.readyState);

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            // Try to load the audio first
            audio.load();

            audio.play()
                .then(() => {
                    console.log('Audio playing successfully');
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error('Error playing audio:', error);
                    console.error('Audio error code:', audio.error?.code);
                    console.error('Audio error message:', audio.error?.message);
                });
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="relative group">
            {/* Compact Player Button */}
            <button
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-white rounded-full shadow-2xl shadow-indigo-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300 group animate-float overflow-hidden border-2 border-indigo-500"
                title={anthem.title}
            >
                <img
                    src={import.meta.env.BASE_URL + 'images/iconancoda.jpg'}
                    alt="Anthem"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

                {isPlaying ? (
                    <svg className="w-8 h-8 text-white relative z-10 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8 text-white ml-1 relative z-10 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>

            {/* Expanded Player */}
            <div className={`fixed bottom-28 right-6 z-50 bg-gradient-to-br from-slate-900/95 to-indigo-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-500/30 p-6 transition-all duration-500 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                <div className="w-64">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-indigo-500/50 shadow-lg">
                            <img
                                src={import.meta.env.BASE_URL + 'images/iconancoda.jpg'}
                                alt="Anthem Cover"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-sm">{anthem.title}</h4>
                            <p className="text-indigo-300 text-xs">{anthem.artist}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(99, 102, 241) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.1) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.1) 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                            </svg>
                        </button>
                        <button onClick={togglePlay} className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors">
                            {isPlaying ? (
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={import.meta.env.BASE_URL + 'audio/anchoda.mp3'}
                preload="auto"
                onError={(e) => console.error('Audio element error:', e)}
                onLoadedData={() => console.log('Audio loaded successfully')}
            />

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
                }
                input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
                }
            `}</style>
        </div>
    );
};
