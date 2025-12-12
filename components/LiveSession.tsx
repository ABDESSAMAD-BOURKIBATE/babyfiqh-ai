import React, { useEffect, useRef, useState } from 'react';
import { Language, translations, CharacterId } from '../utils/translations';
import { MicIcon } from './icons/MicIcon';
import { connectToSmartLiveSession } from '../services/geminiService';

interface LiveSessionProps {
    currentLang: Language;
    characterId: CharacterId;
    onExit: () => void;
}

// Audio Utils
const SAMPLE_RATE = 16000;

function floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
    for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

function base64EncodeAudio(float32Array: Float32Array) {
    const arrayBuffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(arrayBuffer);
    floatTo16BitPCM(view, 0, float32Array);
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function downsampleBuffer(buffer: Float32Array, inputSampleRate: number, outputSampleRate: number) {
    if (outputSampleRate === inputSampleRate) {
        return buffer;
    }
    const sampleRateRatio = inputSampleRate / outputSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
        const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        let accum = 0, count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
        }
        result[offsetResult] = count > 0 ? accum / count : 0;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
    }
    return result;
}

export const LiveSession: React.FC<LiveSessionProps> = ({ currentLang, characterId, onExit }) => {
    const [status, setStatus] = useState<'initial' | 'connecting' | 'connected' | 'error'>('initial');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [volume, setVolume] = useState(0);

    const sessionRef = useRef<any>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const t = translations[currentLang].ui;
    const charConfig = translations[currentLang].characters[characterId];
    const voiceName = charConfig?.voiceName || 'Fenrir';
    const systemInstruction = charConfig?.systemInstruction || 'You are a kind Islamic mentor speaking warmly to children.';

    useEffect(() => {
        return () => cleanup();
    }, []);

    const cleanup = () => {
        if (sessionRef.current) {
            try {
                sessionRef.current.close();
            } catch (e) {
                console.error("Error closing session", e);
            }
            sessionRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    const startSession = async () => {
        try {
            setStatus('connecting');
            setErrorMessage(null);

            if (!import.meta.env.VITE_API_KEY) {
                throw new Error("API Key not found");
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: SAMPLE_RATE,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            streamRef.current = stream;

            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContextClass();
            await audioCtx.resume();
            audioContextRef.current = audioCtx;

            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            visualize();

            const callbacks = {
                onOpen: () => {
                    console.log('Connected to Gemini Live API');
                    setStatus('connected');
                },
                onAudioData: (base64Audio: string) => {
                    playAudioChunk(base64Audio, audioCtx);
                    setIsSpeaking(true);
                    setTimeout(() => setIsSpeaking(false), 2000);
                },
                onClose: () => {
                    console.log('Connection closed');
                    setStatus((prev) => (prev === 'connected' ? 'error' : prev));
                },
                onError: (e: any) => {
                    console.error('Session error', e);
                    setStatus('error');
                    setErrorMessage(e?.message || 'Connection error');
                }
            };

            const attemptConfigs = [
                { systemInstruction, voice: voiceName },
                { systemInstruction, voice: undefined },
                { systemInstruction: undefined, voice: undefined }
            ];

            let session: any = null;
            let lastError: any = null;

            for (const attempt of attemptConfigs) {
                try {
                    session = await connectToSmartLiveSession(
                        callbacks,
                        attempt.systemInstruction,
                        attempt.voice
                    );
                    if (session) break;
                } catch (error) {
                    lastError = error;
                    console.warn('Live session connection attempt failed', error);
                }
            }

            if (!session) {
                throw lastError || new Error('Failed to establish live session');
            }

            sessionRef.current = session;
            setupAudioProcessing(stream, audioCtx, session);

        } catch (err: any) {
            console.error("Failed to start session:", err);
            setStatus('error');
            setErrorMessage(err.message || "Failed to connect");
        }
    };

    const visualize = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setVolume(average);

        animationFrameRef.current = requestAnimationFrame(visualize);
    };

    const setupAudioProcessing = (stream: MediaStream, audioCtx: AudioContext, session: any) => {
        const source = audioCtx.createMediaStreamSource(stream);
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
            if (!sessionRef.current) return;

            const inputData = e.inputBuffer.getChannelData(0);
            const downsampledData = downsampleBuffer(inputData, audioCtx.sampleRate, 16000);
            const base64Data = base64EncodeAudio(downsampledData);

            session.sendRealtimeInput({
                media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                }
            });
        };

        source.connect(processor);
        processor.connect(audioCtx.destination);
    };

    const playAudioChunk = async (base64Data: string, audioCtx: AudioContext) => {
        try {
            const binaryString = atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const int16Data = new Int16Array(bytes.buffer);
            const float32Data = new Float32Array(int16Data.length);
            for (let i = 0; i < int16Data.length; i++) {
                float32Data[i] = int16Data[i] / 32768.0;
            }

            const audioBuffer = audioCtx.createBuffer(1, float32Data.length, 24000);
            audioBuffer.getChannelData(0).set(float32Data);

            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);

            const currentTime = audioCtx.currentTime;
            if (nextStartTimeRef.current < currentTime) {
                nextStartTimeRef.current = currentTime;
            }
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;

        } catch (e) {
            console.error("Error playing audio chunk", e);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-white">
            <div className="absolute top-12 md:top-6 right-4">
                <button onClick={onExit} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <div className="flex flex-col items-center gap-12 w-full max-w-md px-6">
                <div className="relative">
                    {status === 'connected' && (
                        <>
                            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl transition-all duration-100"
                                style={{ transform: `scale(${1 + (volume / 255) * 0.5})` }}></div>
                            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl transition-all duration-100"
                                style={{ transform: `scale(${1 + (volume / 255) * 1.0})` }}></div>
                        </>
                    )}

                    <div className={`w-40 h-40 rounded-full bg-gray-800 overflow-hidden relative z-10 border-4 ${status === 'connected' ? 'border-emerald-500' : 'border-gray-600'} transition-colors duration-500`}>
                        <img
                            src={characterId === 'limanour' ? import.meta.env.BASE_URL + 'images/limanour.png' : import.meta.env.BASE_URL + 'images/amanisa.png'}
                            alt="Character"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold font-cairo">
                        {status === 'initial' && (currentLang === 'ar' ? 'محادثة مباشرة' : 'Live Talk')}
                        {status === 'connecting' && (currentLang === 'ar' ? 'جاري الاتصال...' : 'Connecting...')}
                        {status === 'connected' && (isSpeaking ? (currentLang === 'ar' ? 'يتحدث...' : 'Speaking...') : (currentLang === 'ar' ? 'استمع...' : 'Listening...'))}
                        {status === 'error' && (currentLang === 'ar' ? 'خطأ في الاتصال' : 'Connection Error')}
                    </h2>

                    {status === 'initial' && (
                        <p className="text-white/60 text-lg">
                            {currentLang === 'ar'
                                ? 'اضغط على الزر أدناه لبدء المحادثة الصوتية'
                                : 'Tap the button below to start voice chat'}
                        </p>
                    )}

                    {errorMessage && <p className="text-red-400 bg-red-500/10 px-4 py-2 rounded-lg">{errorMessage}</p>}
                </div>

                <div className="flex flex-col gap-4 w-full items-center">
                    {status === 'initial' && (
                        <button
                            onClick={startSession}
                            className="w-20 h-20 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-110"
                        >
                            <MicIcon className="w-8 h-8 text-white" />
                        </button>
                    )}

                    {status === 'error' && (
                        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                            {currentLang === 'ar' ? 'تحديث الصفحة' : 'Reload'}
                        </button>
                    )}

                    {status === 'connected' && (
                        <div className="h-12 flex items-center justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1.5 bg-emerald-500 rounded-full animate-pulse"
                                    style={{
                                        height: `${10 + Math.random() * 20}px`,
                                        animationDuration: `${0.5 + Math.random() * 0.5}s`
                                    }}></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
