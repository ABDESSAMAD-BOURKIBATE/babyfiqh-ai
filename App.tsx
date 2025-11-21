
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatDisplay } from './components/ChatDisplay';
import { createLimanourChat, sendMessageStreamToLimanour, Chat } from './services/geminiService';
import { playAudio, stopAllAudio } from './utils/audioUtils';
import { CovenantModal } from './components/CovenantModal';
import { InputBar, InputFile } from './components/InputBar';
import { fileToGenerativePart } from './utils/fileUtils';
import { AboutModal } from './components/AboutModal';
import { LiveSession } from './components/LiveSession';
import { LibraryModal } from './components/LibraryModal';
import { translations, Language, CharacterId } from './utils/translations';
import { LibraryItem } from './utils/libraryData';
import { LandingPage } from './components/LandingPage';
import { ParentDashboard } from './components/ParentDashboard';
import { ChildAuthModal } from './components/ChildAuthModal';
import { updateChildStats } from './utils/userData';
import { analyzeEmotion } from './utils/emotionAnalysis';
import { InstallPrompt } from './components/InstallPrompt';
import { FurqanModal } from './components/FurqanModal';
import { GlobalPlayer } from './components/GlobalPlayer';

export type ConversationState = 'idle' | 'loading' | 'error';

export interface MessagePart {
    text?: string;
    inlineData?: {
        mimeType: string;
        data: string;
    };
}

export interface Message {
    role: 'user' | 'model';
    parts: MessagePart[];
}

type AppMode = 'parent' | 'child' | null;

// Media State for Global Player
export interface MediaState {
    url: string;
    title: string;
    subtitle: string;
    isPlaying: boolean;
    canDownload?: boolean;
}

const App: React.FC = () => {
    const [appMode, setAppMode] = useState<AppMode>(() => {
        return typeof window !== 'undefined' ? window.localStorage.getItem('appMode') as AppMode : null;
    });

    const [parentInitialView, setParentInitialView] = useState<'login' | 'register' | 'forgot'>('login');

    const [currentChildId, setCurrentChildId] = useState<string | null>(() => {
        return typeof window !== 'undefined' ? window.localStorage.getItem('currentChildId') : null;
    });

    const [currentLang, setCurrentLang] = useState<Language>('ar');
    const [currentCharacterId, setCurrentCharacterId] = useState<CharacterId>('limanour');
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationState, setConversationState] = useState<ConversationState>('idle');
    const [error, setError] = useState<string | null>(null);
    const [covenantAccepted, setCovenantAccepted] = useState<boolean>(() => {
        return typeof window !== 'undefined' && window.localStorage.getItem('covenantAccepted') === 'true';
    });
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
    const [isFurqanModalOpen, setIsFurqanModalOpen] = useState(false);
    const [isLiveMode, setIsLiveMode] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAudioMode, setIsAudioMode] = useState(false);
    const [showChildAuth, setShowChildAuth] = useState(false);

    // --- Global Media Player State ---
    const [mediaState, setMediaState] = useState<MediaState | null>(null);

    const chatRef = useRef<Chat | null>(null);

    const characterConfig = translations[currentLang].characters[currentCharacterId];

    useEffect(() => {
        const config = translations[currentLang];
        document.documentElement.dir = config.direction;
        document.documentElement.lang = currentLang;

        const systemInstruction = config.characters[currentCharacterId].systemInstruction;
        chatRef.current = createLimanourChat(systemInstruction);
    }, [currentLang, currentCharacterId]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleModeSelect = (mode: 'parent' | 'child', subView?: 'login' | 'register' | 'forgot') => {
        if (mode === 'parent') {
            if (subView) setParentInitialView(subView);
            setAppMode('parent');
        } else {
            setShowChildAuth(true);
        }
    };

    const handleChildLoginSuccess = (childId: string) => {
        localStorage.setItem('appMode', 'child');
        localStorage.setItem('currentChildId', childId);
        setAppMode('child');
        setCurrentChildId(childId);
        setShowChildAuth(false);
    };

    const handleChildLogout = () => {
        localStorage.removeItem('appMode');
        localStorage.removeItem('currentChildId');
        setAppMode(null);
        setCurrentChildId(null);
        setMessages([]);
        setMediaState(null); // Stop media on logout
    };

    const handleClearData = () => {
        if (window.confirm('هل أنت متأكد من رغبتك في مسح جميع البيانات والبدء من جديد؟')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const handleAcceptCovenant = () => {
        localStorage.setItem('covenantAccepted', 'true');
        setCovenantAccepted(true);
    };

    // --- Audio Handling ---

    const handlePlayAudio = useCallback(async (text: string) => {
        if (!text) return;
        try {
            // Stop Global Media Player if TTS starts
            if (mediaState?.isPlaying) {
                setMediaState(prev => prev ? { ...prev, isPlaying: false } : null);
            }
            stopAllAudio();
            const { generateSpeech } = await import('./services/geminiService');
            const voiceName = translations[currentLang].characters[currentCharacterId].voiceName;
            const audioBase64 = await generateSpeech(text, voiceName);
            playAudio(audioBase64);
        } catch (err) {
            console.error("Failed to play audio:", err);
            setError(translations[currentLang].ui.error);
        }
    }, [currentLang, currentCharacterId, mediaState]);

    // --- Media Player Handlers ---
    const handlePlayMedia = (url: string, title: string, subtitle: string, canDownload: boolean = false) => {
        stopAllAudio(); // Stop TTS
        setMediaState({ url, title, subtitle, isPlaying: true, canDownload });
    };

    const handleCloseMedia = () => {
        setMediaState(null);
    };

    const handleMediaPlayPause = (isPlaying: boolean) => {
        setMediaState(prev => prev ? { ...prev, isPlaying } : null);
    };


    const handleSend = useCallback(async (text: string, files: InputFile[]) => {
        if (!text && files.length === 0) return;
        if (!chatRef.current) return;

        // Pause background audio when interacting with AI to avoid noise overlap
        if (mediaState?.isPlaying) {
            setMediaState(prev => prev ? { ...prev, isPlaying: false } : null);
        }

        setConversationState('loading');
        setError(null);

        if (currentChildId) {
            const emotion = analyzeEmotion(text || '');
            updateChildStats(currentChildId, text || 'Media Sent', emotion);
        }

        const userParts: MessagePart[] = [];
        if (text) {
            userParts.push({ text });
        }

        try {
            for (const file of files) {
                const part = await fileToGenerativePart(file.file, file.type);
                userParts.push({ inlineData: part });
            }

            const userMessage: Message = { role: 'user', parts: userParts };
            setMessages(prev => [...prev, userMessage]);

            if (isAudioMode) {
                // @ts-ignore 
                const result = await chatRef.current.sendMessage({ message: userParts });
                const responseText = result.text;

                if (responseText) {
                    const { generateSpeech } = await import('./services/geminiService');
                    const voiceName = translations[currentLang].characters[currentCharacterId].voiceName;

                    const speechText = responseText.replace(/\*\*/g, '');
                    const audioBase64 = await generateSpeech(speechText, voiceName);

                    setMessages(prev => [...prev, {
                        role: 'model',
                        parts: [{
                            inlineData: {
                                mimeType: 'audio/limanour-pcm',
                                data: audioBase64
                            }
                        }]
                    }]);
                }

            } else {
                const stream = await sendMessageStreamToLimanour(chatRef.current, userParts as any);

                let modelResponseText = '';

                setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

                for await (const chunk of stream) {
                    const textChunk = chunk.text;
                    if (textChunk) {
                        modelResponseText += textChunk;
                        const cleanedText = modelResponseText.replace(/\*\*/g, '');
                        setMessages(prev => {
                            const newMessages = [...prev];
                            const lastMessage = newMessages[newMessages.length - 1];
                            if (lastMessage && lastMessage.role === 'model') {
                                lastMessage.parts[0].text = cleanedText;
                            }
                            return newMessages;
                        });
                    }
                }
            }

        } catch (err) {
            console.error('Error sending message:', err);
            setError(err instanceof Error ? err.message : translations[currentLang].ui.error);
            setConversationState('error');
        } finally {
            setConversationState('idle');
        }
    }, [currentLang, isAudioMode, currentCharacterId, handlePlayAudio, currentChildId, mediaState]);

    const handleLibrarySelect = (item: LibraryItem) => {
        setIsLibraryModalOpen(false);
        const prompt = `${translations[currentLang].ui.tellStory} ${item.names[currentLang]}`;
        handleSend(prompt, []);
    };

    if (!appMode) {
        return (
            <>
                <LandingPage
                    onSelectMode={handleModeSelect}
                    onClearData={handleClearData}
                    currentLang={currentLang}
                    onLangChange={setCurrentLang}
                />
                <InstallPrompt currentLang={currentLang} />
                {showChildAuth && (
                    <ChildAuthModal
                        onSuccess={handleChildLoginSuccess}
                        onCancel={() => setShowChildAuth(false)}
                        currentLang={currentLang}
                    />
                )}
            </>
        );
    }

    if (appMode === 'parent') {
        return (
            <>
                <ParentDashboard
                    initialView={parentInitialView}
                    onExit={() => setAppMode(null)}
                    onGoToChildMode={() => {
                        setAppMode(null);
                        setTimeout(() => setShowChildAuth(true), 100);
                    }}
                    currentLang={currentLang}
                />
                <InstallPrompt currentLang={currentLang} />
            </>
        );
    }

    if (appMode === 'child' && !covenantAccepted) {
        return <CovenantModal currentLang={currentLang} onAccept={handleAcceptCovenant} />;
    }

    if (isLiveMode) {
        return (
            <LiveSession
                currentLang={currentLang}
                characterId={currentCharacterId}
                onExit={() => setIsLiveMode(false)}
            />
        );
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden transition-all duration-700 ease-in-out" dir={translations[currentLang].direction}>

            <InstallPrompt currentLang={currentLang} />

            <div
                className={`absolute inset-0 w-full h-full -z-10 bg-size-400 animate-gradient-slow transition-colors duration-700
            ${isDarkMode
                        ? 'bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a]'
                        : currentCharacterId === 'limanour'
                            ? 'bg-gradient-to-br from-[#047857] via-[#0d9488] to-[#d97706]'
                            : 'bg-gradient-to-br from-[#be185d] via-[#db2777] to-[#fb923c]'
                    }`}
            >
                {isDarkMode && (
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
                )}
            </div>

            <div className="flex h-full w-full glass-panel overflow-hidden">

                <Sidebar
                    currentLang={currentLang}
                    onLangChange={setCurrentLang}
                    currentCharacterId={currentCharacterId}
                    onCharacterChange={setCurrentCharacterId}
                    onOpenAbout={() => setIsAboutModalOpen(true)}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    isAudioMode={isAudioMode}
                    onToggleAudioMode={() => setIsAudioMode(!isAudioMode)}
                    onOpenLibrary={() => setIsLibraryModalOpen(true)}
                    onOpenFurqan={() => setIsFurqanModalOpen(true)}
                    onLogout={handleChildLogout}
                />

                <div className="flex-grow flex flex-col relative h-full overflow-hidden transition-all duration-300">
                    <Header
                        currentLang={currentLang}
                        onStartLive={() => {
                            setMediaState(null); // Stop media before live
                            setIsLiveMode(true);
                        }}
                        isSidebarOpen={isSidebarOpen}
                        onOpenSidebar={() => setIsSidebarOpen(true)}
                    />

                    <main className={`flex-grow p-2 md:p-4 flex flex-col items-center w-full overflow-hidden ${mediaState ? 'pb-20' : ''}`}>
                        <div className="w-full h-full max-w-5xl flex flex-col bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                            <ChatDisplay
                                currentLang={currentLang}
                                characterId={currentCharacterId}
                                messages={messages}
                                isLoading={conversationState === 'loading'}
                                error={error}
                                onPlayAudio={handlePlayAudio}
                                isAudioMode={isAudioMode}
                                isDarkMode={isDarkMode}
                            />
                            <InputBar
                                currentLang={currentLang}
                                onSend={handleSend}
                                disabled={conversationState === 'loading'}
                                isAudioMode={isAudioMode}
                            />
                        </div>
                    </main>

                    <footer className="p-2 text-center text-white/40 text-[10px] flex-shrink-0 md:hidden">
                        {translations[currentLang].ui.rights}
                    </footer>
                </div>
            </div>

            {isAboutModalOpen && (
                <AboutModal
                    currentLang={currentLang}
                    onClose={() => setIsAboutModalOpen(false)}
                />
            )}

            {isLibraryModalOpen && (
                <LibraryModal
                    currentLang={currentLang}
                    onClose={() => setIsLibraryModalOpen(false)}
                    onSelect={handleLibrarySelect}
                />
            )}

            {isFurqanModalOpen && (
                <FurqanModal
                    currentLang={currentLang}
                    onClose={() => setIsFurqanModalOpen(false)}
                    onPlayMedia={handlePlayMedia}
                    currentMedia={mediaState}
                />
            )}

            {/* Global Persistent Player */}
            {mediaState && (
                <GlobalPlayer
                    url={mediaState.url}
                    title={mediaState.title}
                    subtitle={mediaState.subtitle}
                    isPlaying={mediaState.isPlaying}
                    onPlayPause={handleMediaPlayPause}
                    onClose={handleCloseMedia}
                    canDownload={mediaState.canDownload}
                />
            )}

            <style>{`
        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .bg-size-400 {
            background-size: 400% 400%;
        }
        .animate-gradient-slow {
            animation: gradientAnimation 20s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default App;
