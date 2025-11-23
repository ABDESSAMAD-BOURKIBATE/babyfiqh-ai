
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connectToSmartLiveSession } from '../services/geminiService';
import { MicIcon } from './icons/MicIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { Language, translations, CharacterId } from '../utils/translations';
import { SmartOrb } from './SmartOrb';
import { analyzeEmotion, EmotionState } from '../utils/emotionAnalysis';

// --- Audio Helpers ---
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
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(2, frameCount, sampleRate);
  const channel0 = buffer.getChannelData(0);
  const channel1 = buffer.getChannelData(1);

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
    const [status, setStatus] = useState<'connecting' | 'active' | 'error' | 'closed' | 'reconnecting'>('connecting');
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [currentEmotion, setCurrentEmotion] = useState<EmotionState>('neutral');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // Settings
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('default');

    const t = translations[currentLang].ui;
    const dir = translations[currentLang].direction;
    const charConfig = translations[currentLang].characters[characterId];
    
    // Refs
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number>(0);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const activeSessionRef = useRef<any>(null); 
    
    // Safety Refs
    const isIntentionalExit = useRef(false);
    const retryCountRef = useRef(0);
    const connectionTimeoutRef = useRef<any>(null);

    // Load Devices
    useEffect(() => {
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const speakers = devices.filter(d => d.kind === 'audiooutput');
                setAudioDevices(speakers);
            } catch(e) { console.error(e); }
        };
        getDevices();
    }, []);

    const changeAudioOutput = async (deviceId: string) => {
        setSelectedSpeakerId(deviceId);
        setIsSettingsOpen(false);
        if (outputAudioContextRef.current && 'setSinkId' in outputAudioContextRef.current) {
            try {
                // @ts-ignore
                await outputAudioContextRef.current.setSinkId(deviceId);
            } catch (err) { console.error(err); }
        }
    };

    const cleanup = useCallback(() => {
        if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
            connectionTimeoutRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current.onaudioprocess = null;
        }
        
        // Explicitly close Gemini session
        if (activeSessionRef.current) {
            try {
                activeSessionRef.current.close();
            } catch (e) {
                console.warn("Error closing session:", e);
            }
            activeSessionRef.current = null;
        }
        
        const closeCtx = async (ctx: AudioContext | null) => {
            if (ctx && ctx.state !== 'closed') {
                try { await ctx.close(); } catch(e) {}
            }
        };

        closeCtx(inputAudioContextRef.current);
        closeCtx(outputAudioContextRef.current);
        cancelAnimationFrame(animationFrameRef.current);
    }, []);

    // Visualizer Loop - Optimized
    const updateVisualizer = useCallback(() => {
        if (analyserRef.current && status === 'active') {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            
            let sum = 0;
            for (let i = 0; i < dataArray.length; i += 4) {
                sum += dataArray[i];
            }
            const average = sum / (dataArray.length / 4);
            const normalized = Math.min(1, average / 40); 
            
            setAudioLevel(normalized);
            setIsSpeaking(normalized > 0.05);
        }
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    }, [status]);

    useEffect(() => {
        if (status === 'active') {
            updateVisualizer();
        }
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [status, updateVisualizer]);

    const handleExit = () => {
        isIntentionalExit.current = true;
        cleanup();
        onExit();
    };

    const handleAutoRetry = () => {
        const maxRetries = 3;
        if (retryCountRef.current < maxRetries) {
            retryCountRef.current += 1;
            setStatus('reconnecting');
            cleanup();
            
            const delay = 1000 * Math.pow(2, retryCountRef.current - 1);
            setTimeout(() => {
                if (!isIntentionalExit.current) startSession();
            }, delay);
        } else {
            setStatus('error');
            setErrorMessage(currentLang === 'ar' ? 'تعذر الاتصال بعد عدة محاولات' : 'Failed to connect after retries');
        }
    };

    const startSession = async () => {
        // Check API Key first
        if (!process.env.API_KEY) {
            setStatus('error');
            setErrorMessage(currentLang === 'ar' ? 'مفتاح API مفقود' : 'API Key Missing');
            return;
        }

        try {
            // Set a timeout to catch hanging connections
            connectionTimeoutRef.current = setTimeout(() => {
                if (status === 'connecting' || status === 'reconnecting') {
                    console.warn("Connection timed out");
                    setStatus('error');
                    setErrorMessage(currentLang === 'ar' ? 'انتهت مهلة الاتصال. تحقق من الإنترنت' : 'Connection timed out. Check internet.');
                    cleanup();
                }
            }, 12000); // 12 seconds timeout

            const stream = await navigator.mediaDevices.getUserMedia({ audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }});
            streamRef.current = stream;

            // @ts-ignore 
            inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            // @ts-ignore
            outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

            // IMPORTANT: Resume audio context. If browser blocks autoplay, this might fail if not in response to event.
            // However, since user clicked "Start Live" to get here, context usually resumes fine.
            if (inputAudioContextRef.current.state === 'suspended') {
                await inputAudioContextRef.current.resume();
            }
            if (outputAudioContextRef.current.state === 'suspended') {
                await outputAudioContextRef.current.resume();
            }

            const inputCtx = inputAudioContextRef.current;
            const outputCtx = outputAudioContextRef.current;

            if (selectedSpeakerId !== 'default' && 'setSinkId' in outputCtx) {
                 // @ts-ignore
                 outputCtx.setSinkId(selectedSpeakerId).catch(console.warn);
            }

            const analyser = outputCtx.createAnalyser();
            analyser.fftSize = 128; 
            analyser.smoothingTimeConstant = 0.5;
            analyserRef.current = analyser;
            analyser.connect(outputCtx.destination);

            // Create a WebSocket to the local live-proxy server and bridge messages
            const wsUrl = `ws://localhost:${process.env.LIVE_PROXY_PORT || 3001}/live?voice=${encodeURIComponent(charConfig.voiceName || 'Fenrir')}`;
            const ws = new WebSocket(wsUrl);

            const sessionPromise = new Promise<any>((resolve, reject) => {
                ws.onopen = () => {
                    if (isIntentionalExit.current) return;
                    if (connectionTimeoutRef.current) clearTimeout(connectionTimeoutRef.current);
                    setStatus('active');
                    retryCountRef.current = 0;

                    const source = inputCtx.createMediaStreamSource(stream);
                    const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
                    scriptProcessorRef.current = scriptProcessor;

                    scriptProcessor.onaudioprocess = (e) => {
                        if (isMicMuted || isIntentionalExit.current) return;
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);

                        // send via websocket to server proxy
                        try { ws.send(JSON.stringify({ type: 'input', media: pcmBlob })); } catch (err) { console.warn('WS send failed', err); }
                    };

                    source.connect(scriptProcessor);
                    scriptProcessor.connect(inputCtx.destination);

                    // Resolve a small API compatible with previous session object
                    resolve({ sendRealtimeInput: ({ media }: any) => ws.send(JSON.stringify({ type: 'input', media })), close: () => ws.close() });
                };

                ws.onmessage = async (ev) => {
                    if (isIntentionalExit.current) return;
                    try {
                        const msg = JSON.parse(ev.data);
                        if (msg.type === 'audio' && msg.data) {
                            const bytes = decode(msg.data);
                            const audioBuffer = await decodeAudioData(bytes, outputCtx);

                            const source = outputCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(analyser);

                            const currentTime = outputCtx.currentTime;
                            if (nextStartTimeRef.current < currentTime) nextStartTimeRef.current = currentTime + 0.05;
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;

                            sourcesRef.current.add(source);
                            source.onended = () => sourcesRef.current.delete(source);
                        } else if (msg.type === 'transcription' && msg.text) {
                            if (msg.text.length > 5) {
                                const emotion = analyzeEmotion(msg.text);
                                setCurrentEmotion(emotion);
                                setTimeout(() => { if(!isIntentionalExit.current) setCurrentEmotion('neutral'); }, 3000);
                            }
                        } else if (msg.type === 'error') {
                            setErrorMessage(msg.message || (currentLang === 'ar' ? 'حدث خطأ في الخادم' : 'Server error'));
                            if (!isIntentionalExit.current) handleAutoRetry();
                        }
                    } catch (e) { console.error('Invalid WS message', e); }
                };

                ws.onclose = () => {
                    if (!isIntentionalExit.current) {
                        setErrorMessage(currentLang === 'ar' ? 'انقطع الاتصال بالخدمة.' : 'Session closed unexpectedly.');
                        handleAutoRetry();
                    }
                };

                ws.onerror = (e) => {
                    console.error('WS error', e);
                    setErrorMessage(currentLang === 'ar' ? 'خطأ في الاتصال' : 'Connection error');
                    if (!isIntentionalExit.current) handleAutoRetry();
                    reject(e);
                };
            });

            sessionPromise.then(s => {
                activeSessionRef.current = s;
            }).catch(e => {
                console.error('Failed to connect promise', e);
                try { const msg = e?.message || JSON.stringify(e); setErrorMessage(msg); } catch (err) { setErrorMessage(currentLang === 'ar' ? 'فشل الاتصال' : 'Connection failed'); }
                if (!isIntentionalExit.current) handleAutoRetry();
            });

        } catch (err: any) {
            console.error("Failed to start live session", err);
            if (connectionTimeoutRef.current) clearTimeout(connectionTimeoutRef.current);
            
            // Show explicit error for permission denied
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setStatus('error');
                setErrorMessage(translations[currentLang].ui.micAccessError);
            } else {
                if(!isIntentionalExit.current) handleAutoRetry();
            }
        }
    };

    const handleManualRetry = () => {
        cleanup();
        retryCountRef.current = 0;
        setStatus('connecting');
        setErrorMessage(null);
        startSession();
    };

    useEffect(() => {
        startSession();
        return () => {
            isIntentionalExit.current = true;
            cleanup();
        };
    }, [characterId]); 

    // Theme Logic
    const bgGradient = characterId === 'limanour' 
        ? 'bg-gradient-to-br from-emerald-950 via-[#022c22] to-black' 
        : 'bg-gradient-to-br from-rose-950 via-[#4c0519] to-black';
    
    return (
        <div className={`flex flex-col items-center justify-between h-screen w-screen relative overflow-hidden ${bgGradient}`}>
            {/* Interactive Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Error / Retry Overlay */}
            {status === 'error' && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
                    <div className="bg-[#1e293b] border border-red-500/30 rounded-2xl p-8 text-center max-w-sm w-full shadow-2xl">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{t.liveError}</h3>
                        <p className="text-white/50 mb-6 text-sm">
                            {errorMessage || (currentLang === 'ar' ? 'انقطع الاتصال. يرجى المحاولة مرة أخرى.' : 'Connection lost. Please try again.')}
                        </p>
                        <div className="flex gap-3">
                            <button onClick={handleExit} className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors font-bold text-sm">
                                {t.close}
                            </button>
                            <button onClick={handleManualRetry} className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors font-bold text-sm">
                                {currentLang === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Spacer */}
            <div className="flex-grow-0 h-16 w-full"></div>

            {/* Main Visual Center */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl flex-grow -mt-10">
                
                <div className="relative w-full flex items-center justify-center mb-8 scale-90 md:scale-100 transition-transform duration-500">
                     <SmartOrb 
                        emotion={currentEmotion}
                        characterId={characterId}
                        audioLevel={audioLevel}
                        isActive={status === 'active'}
                        isSpeaking={isSpeaking}
                     />
                </div>

                <div className="text-center z-20 flex flex-col items-center gap-3 min-h-[60px]">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide font-cairo drop-shadow-lg">
                        {(status === 'connecting' || status === 'reconnecting') && (
                            <span className="animate-pulse text-white/80">
                                {status === 'reconnecting' 
                                    ? (currentLang === 'ar' ? 'جاري إعادة الاتصال...' : 'Reconnecting...')
                                    : t.liveConnecting}
                            </span>
                        )}
                        {status === 'active' && charConfig.name}
                    </h2>
                    
                    {status === 'active' && (
                        <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border backdrop-blur-md transition-all duration-300
                            ${isSpeaking 
                                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-200' 
                                : 'bg-white/5 border-white/10 text-white/50'}`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-emerald-400' : 'bg-white/30'}`}></div>
                            <span className="text-[10px] font-bold tracking-wider uppercase">
                                {isSpeaking ? (currentLang === 'ar' ? 'يتحدث' : 'Speaking') : t.liveListening}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full flex justify-center items-center pb-8 pt-4 z-40">
                <div className="flex items-center gap-6 bg-black/40 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-2xl">
                    
                    {/* Settings */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </button>
                        {isSettingsOpen && (
                            <div 
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-[#1e293b] border border-white/20 rounded-xl p-2 shadow-2xl animate-fade-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto custom-scrollbar">
                                    {audioDevices.map((device) => (
                                        <button
                                            key={device.deviceId}
                                            onClick={() => changeAudioOutput(device.deviceId)}
                                            className={`text-[10px] text-left p-2 rounded-lg truncate
                                                ${selectedSpeakerId === device.deviceId ? 'bg-indigo-600 text-white' : 'text-white/70 hover:bg-white/10'}`}
                                        >
                                            {device.label || t.speaker}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mute (Main Action) */}
                    <button 
                        onClick={() => setIsMicMuted(!isMicMuted)}
                        className={`p-5 rounded-full transition-all transform hover:scale-105 shadow-lg border-2 flex items-center justify-center
                            ${isMicMuted 
                                ? 'bg-red-500 text-white border-red-400' 
                                : 'bg-white/10 text-white hover:bg-white/20 border-white/20'}`}
                    >
                         {isMicMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                         ) : (
                            <MicIcon className="w-6 h-6" />
                         )}
                    </button>

                    {/* Exit */}
                    <button 
                        onClick={handleExit}
                        className="p-3 rounded-full bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
