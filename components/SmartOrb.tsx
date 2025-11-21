
import React from 'react';
import { EmotionState, getEmotionColor } from '../utils/emotionAnalysis';
import { FaceSmileIcon, BrainIcon, HeartHandIcon, SparklesIcon, WaveIcon } from './icons/EmotionIcons';
import { MicIcon } from './icons/MicIcon';
import { CharacterId } from '../utils/translations';

interface SmartOrbProps {
  emotion: EmotionState;
  characterId: CharacterId;
  audioLevel: number; // 0 to 1
  isActive: boolean;
  isSpeaking: boolean;
}

export const SmartOrb: React.FC<SmartOrbProps> = ({ emotion, characterId, audioLevel, isActive, isSpeaking }) => {
  const gradient = getEmotionColor(emotion, characterId);
  
  // Dynamic scale based on audio level
  const scale = isActive ? 1 + (audioLevel * 0.3) : 1;
  
  // Render appropriate icon
  const renderIcon = () => {
    const iconProps = { className: "w-20 h-20 text-white drop-shadow-lg transition-all duration-500" };
    
    if (!isActive) return <div className="w-20 h-20 rounded-full bg-white/10" />;

    if (!isSpeaking) return <MicIcon {...iconProps} className="w-20 h-20 text-white/70" />;

    switch (emotion) {
      case 'happy': return <FaceSmileIcon {...iconProps} />;
      case 'thinking': return <BrainIcon {...iconProps} />;
      case 'empathetic': return <HeartHandIcon {...iconProps} />;
      case 'excited': return <SparklesIcon {...iconProps} />;
      default: return <WaveIcon {...iconProps} />; // Neutral/Talking
    }
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      
      {/* Outer Glow / Pulse */}
      {isActive && (
        <div 
            className={`absolute inset-0 rounded-full blur-3xl opacity-30 transition-all duration-700 bg-gradient-to-r ${gradient}`}
            style={{ transform: `scale(${1 + (audioLevel * 0.5)})` }}
        />
      )}

      {/* Ring Animations (Ripples) */}
      {isActive && (
        <>
            <div className={`absolute inset-4 rounded-full border border-white/10 animate-spin-slow opacity-40`} style={{ animationDuration: '10s' }}></div>
            <div className={`absolute inset-10 rounded-full border border-white/20 animate-reverse-spin opacity-30`} style={{ animationDuration: '15s' }}></div>
        </>
      )}

      {/* Core Orb */}
      <div 
        className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${gradient} shadow-[0_0_50px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-500 ease-out z-10 border-4 border-white/10 backdrop-blur-sm`}
        style={{ transform: `scale(${scale})` }}
      >
        {/* Glass Reflection */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
        
        {/* Icon Container */}
        <div className="relative z-20 transform transition-transform duration-300">
            {renderIcon()}
        </div>
      </div>

      {/* Label Status */}
      {isActive && isSpeaking && (
          <div className="absolute -bottom-12 bg-black/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-white/80 text-xs font-medium uppercase tracking-widest animate-fade-in">
              {emotion === 'neutral' ? 'Speaking' : emotion}
          </div>
      )}

      <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
            animation: spin-slow linear infinite;
        }
        .animate-reverse-spin {
            animation: reverse-spin linear infinite;
        }
      `}</style>
    </div>
  );
};
