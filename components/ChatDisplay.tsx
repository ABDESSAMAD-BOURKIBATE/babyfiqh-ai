
import React, { useRef, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { Message, MessagePart } from '../App';
import { AudioMessage } from './AudioMessage';
import { LimanourAudioMessage } from './LimanourAudioMessage';
import { Language, translations, CharacterId } from '../utils/translations';

interface ChatDisplayProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onPlayAudio: (text: string) => void;
  currentLang: Language;
  characterId: CharacterId;
  isAudioMode: boolean;
  isDarkMode: boolean;
}

const LoadingIndicator: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex justify-center items-center p-2">
    <div className="flex items-center gap-2 text-white/70 text-sm bg-black/20 px-4 py-2 rounded-full">
      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      <span>{text}</span>
    </div>
  </div>
);

const renderPart = (part: MessagePart, index: number, currentLang: Language, isDarkMode: boolean, characterId: CharacterId) => {
  if (part.text) {
    return <p key={index} className="whitespace-pre-wrap leading-loose text-lg">{part.text}</p>;
  }
  if (part.inlineData) {
    const { mimeType, data } = part.inlineData;
    const src = `data:${mimeType};base64,${data}`;
    if (mimeType.startsWith('image/')) {
      return <img key={index} src={src} alt="uploaded content" className="rounded-2xl border-4 border-white/20 shadow-lg max-w-full h-auto" />;
    }
    if (mimeType.startsWith('video/')) {
      return <video key={index} controls src={src} className="rounded-2xl border-4 border-white/20 shadow-lg max-w-full" />;
    }
    if (mimeType === 'audio/limanour-pcm') {
      return <LimanourAudioMessage key={index} base64data={data} currentLang={currentLang} isDarkMode={isDarkMode} characterId={characterId} />;
    }
    if (mimeType.startsWith('audio/')) {
      return <AudioMessage key={index} src={src} currentLang={currentLang} isDarkMode={isDarkMode} characterId={characterId} />;
    }
  }
  return null;
};

export const ChatDisplay: React.FC<ChatDisplayProps> = ({
  messages,
  isLoading,
  error,
  onPlayAudio,
  currentLang,
  characterId,
  isAudioMode,
  isDarkMode
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang].ui;
  const charInfo = translations[currentLang].characters[characterId];
  const characterName = charInfo.name;
  const characterImage = characterId === 'limanour' ? '/images/limanour.png' : '/images/amanisa.png';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const themeColor = characterId === 'limanour' ? 'from-amber-400 to-amber-600' : 'from-pink-400 to-pink-600';

  // Simplified bubbles for a cleaner look, especially in audio mode
  const userBubbleColor = characterId === 'limanour'
    ? (isDarkMode ? 'bg-[#065f46]/80 border-[#059669]/50' : 'bg-[#047857]/90 border-[#059669]')
    : (isDarkMode ? 'bg-[#9d174d]/80 border-[#db2777]/50' : 'bg-[#be185d]/90 border-[#db2777]');

  const dir = translations[currentLang].direction;

  return (
    <div className="flex-grow w-full bg-transparent flex flex-col justify-between overflow-hidden relative" dir={dir}>
      {/* Decorative background elements */}
      <div className={`absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${characterId === 'limanour' ? 'bg-emerald-400' : 'bg-pink-400'}`}></div>
      <div className={`absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${characterId === 'limanour' ? 'bg-amber-400' : 'bg-purple-400'}`}></div>

      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 relative z-10 scroll-smooth custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60 mt-10">
            <div className="mb-6 relative">
              <div className={`absolute inset-0 blur-2xl opacity-30 rounded-full ${characterId === 'limanour' ? 'bg-emerald-500' : 'bg-pink-500'}`}></div>
              <img
                src={characterImage}
                alt={characterName}
                className="w-32 h-32 object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xl font-medium text-white">{t.welcomeTitle}</p>
            <p className="text-sm text-white/70">{t.welcomeSubtitle}</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
            {msg.role === 'model' && (
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${themeColor} flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white/20 self-end mb-2 overflow-hidden`}>
                <img src={characterImage} alt={characterName} className="w-full h-full object-cover" />
              </div>
            )}

            <div className={`max-w-[95%] md:max-w-2xl ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`p-1`}>
                {/* Container for message content with hover scale effect */}
                <div className={`
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    ${msg.parts.some(p => p.inlineData?.mimeType.startsWith('audio/'))
                    ? 'bg-transparent' // Audio messages have their own containers
                    : msg.role === 'user'
                      ? `${userBubbleColor} text-white rounded-3xl rounded-br-none border p-5 shadow-md backdrop-blur-sm`
                      : 'bg-white/90 text-gray-800 rounded-3xl rounded-bl-none border border-white p-5 shadow-md backdrop-blur-sm'
                  }
                 `}>
                  {msg.parts.map((part, partIndex) => renderPart(part, partIndex, currentLang, isDarkMode, characterId))}
                </div>
              </div>

              {/* Only show listen button if there is text and we are NOT in audio mode (since audio mode has its own player) */}
              {msg.role === 'model' && msg.parts.some(p => p.text) && !isAudioMode && (
                <div className="mt-2 flex justify-start opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                  <button
                    onClick={() => onPlayAudio(msg.parts.find(p => p.text)?.text || '')}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white/80 text-xs transition-colors"
                  >
                    <SpeakerIcon className="w-3 h-3" />
                    <span>{t.listen}</span>
                  </button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white/10 self-end mb-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${themeColor} flex items-center justify-center shadow-lg overflow-hidden`}>
              <img src={characterImage} alt={characterName} className="w-full h-full object-cover" />
            </div>
            <LoadingIndicator text={`${characterName} ${isAudioMode ? (characterId === 'amanissa' ? t.thinkingFem : t.thinking) : (characterId === 'amanissa' ? t.typingFem : t.typing)}`} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="mx-6 mb-4 text-red-100 bg-red-500/30 border border-red-500/50 p-4 rounded-xl text-center backdrop-blur-md shadow-lg animate-pulse">
          <h3 className="font-bold mb-1">!</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};
