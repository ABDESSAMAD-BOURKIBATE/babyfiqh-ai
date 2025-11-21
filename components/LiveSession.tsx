
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connectToSmartLiveSession } from '../services/geminiService';
import { MicIcon } from './icons/MicIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { Language, translations, CharacterId } from '../utils/translations';
import { SmartOrb } from './SmartOrb';
import { analyzeEmotion, EmotionState } from '../utils/emotionAnalysis';

// --- Audio Helpers for Live API ---
function createBlob(data: Float32Array): { data: string; mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }

    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    return {
        data: base64,
        mimeType: 'audio/pcm;rate=16000',
    };
}

function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number = 24000,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    // Input is mono (1 channel)
    const frameCount = dataInt16.length;

    // FORCE STEREO: Create 2 channels
    const buffer = ctx.createBuffer(2, frameCount, sampleRate);

    const channel0 = buffer.getChannelData(0); // Left
    const channel1 = buffer.getChannelData(1); // Right

    // Copy mono data to both channels
    for (let i = 0; i < frameCount; i++) {
        const sample = dataInt16[i] / 32768.0;
        channel0[i] = sample;
        channel1[i] = sample;
    }
    return buffer;
}

// --- Component ---

interface LiveSessionProps {
    currentLang: Language;
    characterId: CharacterId;
    onExit: () => void;
}

export const LiveSession: React.FC<LiveSessionProps> = ({ currentLang, characterId, onExit }) => {
    const [status, setStatus] = useState<'connecting' | 'active' | 'error' | 'closed'>('connecting');
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [currentEmotion, setCurrentEmotion] = useState<EmotionState>('neutral');
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Settings State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('default');

    const t = translations[currentLang].ui;
    const dir = translations[currentLang].direction;
    const charConfig = translations[currentLang].characters[characterId];

    // Refs for audio handling
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number>(0);

    // Load Devices
    useEffect(() => {
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const speakers = devices.filter(d => d.kind === 'audiooutput');
                setAudioDevices(speakers);
            } catch (e) {
                console.error("Error enumerating devices:", e);
            }
        };
        getDevices();
        // Listen for device changes
        navigator.mediaDevices.addEventListener('devicechange', getDevices);
        return () => navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    }, []);

    // Handle Speaker Change
    const changeAudioOutput = async (deviceId: string) => {
        setSelectedSpeakerId(deviceId);
        setIsSettingsOpen(false);

        if (outputAudioContextRef.current) {
            // @ts-ignore - setSinkId is experimental/newer standard on AudioContext
            if (typeof outputAudioContextRef.current.setSinkId === 'function') {
                try {
                    // @ts-ignore
                    await outputAudioContextRef.current.setSinkId(deviceId);
                } catch (err) {
                    console.error("Failed to set sink ID on AudioContext:", err);
                }
            } else {
                console.warn("setSinkId not supported on this browser's AudioContext");
            }
        }
    };

    // Cleanup function with safety check for AudioContext
    const cleanup = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }

        const closeCtx = async (ctx: AudioContext | null) => {
            if (ctx && ctx.state !== 'closed') {
                try { await ctx.close(); } catch (e) { console.warn("AudioContext close error:", e); }
            }
        };

        closeCtx(inputAudioContextRef.current);
        closeCtx(outputAudioContextRef.current);

        cancelAnimationFrame(animationFrameRef.current);
    }, []);

    // Visualizer Loop
    const updateVisualizer = useCallback(() => {
        if (analyserRef.current && status === 'active') {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);

            // Calculate average volume
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            // Normalize 0-1 (approx)
            const normalized = Math.min(1, average / 50);

            setAudioLevel(normalized);
            setIsSpeaking(normalized > 0.1); // Threshold for "speaking" visually
        }
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    }, [status]);

    useEffect(() => {
        if (status === 'active') {
            updateVisualizer();
        }
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [status, updateVisualizer]);


    useEffect(() => {
        let mounted = true;

        const startSession = async () => {
            try {
                // Audio Setup
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;

                // Input Context (Mic -> API)
                // @ts-ignore 
                inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
                const inputCtx = inputAudioContextRef.current;

                // Output Context (API -> Speakers)
                // @ts-ignore
                outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
                const outputCtx = outputAudioContextRef.current;

                // Try setting initial speaker if selected
                if (selectedSpeakerId !== 'default') {
                    // @ts-ignore
                    if (typeof outputCtx.setSinkId === 'function') {
                        // @ts-ignore
                        outputCtx.setSinkId(selectedSpeakerId).catch(console.warn);
                    }
                }

                // Setup Analyser for Visuals (Output)
                const analyser = outputCtx.createAnalyser();
                analyser.fftSize = 256;
                analyserRef.current = analyser;
                analyser.connect(outputCtx.destination);

                const sessionPromise = connectToSmartLiveSession(
                    {
                        onOpen: () => {
                            if (!mounted) return;
                            setStatus('active');

                            // Start Microphone Stream
                            const source = inputCtx.createMediaStreamSource(stream);
                            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);

                            scriptProcessor.onaudioprocess = (e) => {
                                if (isMicMuted) return;
                                const inputData = e.inputBuffer.getChannelData(0);
                                const pcmBlob = createBlob(inputData);

                                sessionPromise.then(session => {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                });
                            };

                            source.connect(scriptProcessor);
                            scriptProcessor.connect(inputCtx.destination);
                        },
                        onAudioData: async (base64Audio) => {
                            if (!mounted) return;

                            const bytes = decode(base64Audio);
                            // Using stereo forced decoding
                            const audioBuffer = await decodeAudioData(bytes, outputCtx);

                            const source = outputCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            // Connect to Analyser -> Destination
                            source.connect(analyser);

                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;

                            sourcesRef.current.add(source);
                            source.onended = () => sourcesRef.current.delete(source);
                        },
                        onTranscription: (text) => {
                            // Emotional Intelligence Logic
                            if (text) {
                                const emotion = analyzeEmotion(text);
                                setCurrentEmotion(emotion);

                                // Reset emotion to neutral after a delay if speech stops
                                setTimeout(() => {
                                    if (mounted) setCurrentEmotion('neutral');
                                }, 4000);
                            }
                        },
                        onClose: () => {
                            if (mounted) setStatus('closed');
                        },
                        onError: (e) => {
                            console.error("Session error:", e);
                            if (mounted) setStatus('error');
                        }
                    },
                    charConfig.systemInstruction,
                    charConfig.voiceName
                );

            } catch (err) {
                console.error("Failed to start live session", err);
                setStatus('error');
            }
        };

        startSession();

        return () => {
            mounted = false;
            cleanup();
        };
    }, [cleanup, currentLang, isMicMuted, charConfig]); // Removed selectedSpeakerId from dep to avoid restart loop

    const bgGradient = characterId === 'limanour'
        ? 'bg-gradient-to-br from-emerald-900 via-[#064e3b] to-black'
        : 'bg-gradient-to-br from-pink-900 via-[#831843] to-black';

    return (
        <div className={`flex flex-col items-center justify-center h-screen w-screen relative overflow-hidden ${bgGradient}`}>
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[128px]"></div>
            </div>

            {/* Center Visual - Smart Orb */}
            <div className="relative z-10 flex flex-col items-center gap-12 animate-fade-in w-full max-w-md">

                <div className="relative h-80 w-full flex items-center justify-center">
                    <SmartOrb
                        emotion={currentEmotion}
                        characterId={characterId}
                        audioLevel={audioLevel}
                        isActive={status === 'active'}
                        isSpeaking={isSpeaking}
                    />
                </div>

                <div className="text-center space-y-2 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide font-cairo drop-shadow-lg">
                        {status === 'connecting' && `${t.liveConnecting}`}
                        {status === 'active' && `${charConfig.name}`}
                        {status === 'error' && t.liveError}
                        {status === 'closed' && t.liveClosed}
                    </h2>
                    <p className="text-white/70 text-lg font-medium">
                        {status === 'active'
                            ? (isSpeaking ? (currentLang === 'ar' ? 'يتحدث...' : 'Speaking...') : t.liveListening)
                            : ''}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-6 z-50">

                {/* Settings Button */}
                <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="p-6 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-xl relative"
                >
                    <SettingsIcon className="w-8 h-8" />

                    {/* Settings Popover */}
                    {isSettingsOpen && (
                        <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-[#0f172a]/90 border border-white/20 rounded-2xl p-4 backdrop-blur-xl shadow-2xl flex flex-col gap-2 animate-fade-in"
                            dir={dir}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-white font-bold text-sm mb-2 text-center border-b border-white/10 pb-2">
                                {t.audioSettings}
                            </h3>
                            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto custom-scrollbar">
                                {audioDevices.length > 0 ? audioDevices.map((device) => (
                                    <button
                                        key={device.deviceId}
                                        onClick={() => changeAudioOutput(device.deviceId)}
                                        className={`text-xs text-left (isRtl?'text-right':'text-left') p-2 rounded-lg transition-all truncate
                                            ${selectedSpeakerId === device.deviceId
                                                ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/50'
                                                : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        {device.label || `${t.speaker} ${audioDevices.indexOf(device) + 1}`}
                                    </button>
                                )) : (
                                    <p className="text-white/50 text-xs text-center py-2">No devices found</p>
                                )}
                            </div>
                        </div>
                    )}
                </button>

                {/* Mute Button */}
                <button
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`p-6 rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-white/20 text-white
                        ${isMicMuted ? 'bg-red-500/90 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}
                        backdrop-blur-xl`}
                >
                    {isMicMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    ) : (
                        <MicIcon className="w-8 h-8" />
                    )}
                </button>

                {/* Exit Button */}
                <button
                    onClick={onExit}
                    className="p-6 rounded-full bg-red-500/90 hover:bg-red-600 text-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)] border border-white/20 backdrop-blur-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                </button>
            </div>
        </div>
    );
};
