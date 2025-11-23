
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
  
  // Optimized scale calculations
  // Use smaller increments to prevent jitter
  const baseScale = isActive ? 1 + (audioLevel * 0.15) : 1;
  const ringScale = isActive ? 1 + (audioLevel * 0.3) : 1;
  
  // Determine icon based on state
  const renderIcon = () => {
    const iconClass = `w-16 h-16 text-white drop-shadow-md transition-opacity duration-300 ${isSpeaking ? 'opacity-100' : 'opacity-90'}`;
    
    if (!isActive) return <div className="w-16 h-16 rounded-full bg-white/10" />;

    if (emotion === 'thinking' && !isSpeaking) {
        return <BrainIcon className={`${iconClass} animate-pulse`} />;
    }

    if (!isSpeaking && emotion === 'neutral') {
         return <MicIcon className={iconClass} />;
    }

    switch (emotion) {
      case 'happy': return <FaceSmileIcon className={iconClass} />;
      case 'thinking': return <BrainIcon className={iconClass} />;
      case 'empathetic': return <HeartHandIcon className={iconClass} />;
      case 'excited': return <SparklesIcon className={iconClass} />;
      default: return <WaveIcon className={iconClass} />;
    }
  };

  const mainColor = characterId === 'limanour' ? '#10b981' : '#f472b6'; // Emerald / Pink

  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      
      {/* Idle State - Simple Ring */}
      {!isActive && (
          <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-pulse"></div>
      )}

      {/* Active State - Professional Animations (Hardware Accelerated) */}
      {isActive && (
        <>
            {/* 1. Ambient Glow (Static to save GPU) */}
            <div 
                className={`absolute inset-0 rounded-full opacity-20 blur-3xl bg-gradient-to-tr ${gradient}`}
                style={{ transform: 'translateZ(0)' }}
            />

            {/* 2. Outer Ring - Audio Reactive */}
            <div 
                className="absolute inset-0 rounded-full border border-white/10 transition-transform duration-100 ease-linear will-change-transform"
                style={{ 
                    transform: `scale(${ringScale}) translateZ(0)`,
                    boxShadow: `0 0 20px ${mainColor}40` 
                }}
            />

            {/* 3. Middle Ripple Ring */}
            <div 
                className="absolute inset-8 rounded-full border border-white/20 opacity-60 animate-ping-slow"
            />
            
            {/* 4. Rotating Accent Ring */}
            <div 
                className="absolute inset-4 rounded-full border-t-2 border-b-2 border-transparent transition-all duration-1000 ease-in-out opacity-80"
                style={{ 
                    borderColor: isSpeaking ? `${mainColor}80` : 'rgba(255,255,255,0.1)',
                    borderTopColor: isSpeaking ? mainColor : 'transparent',
                    transform: `rotate(${isActive ? Date.now() / 50 : 0}deg) translateZ(0)`,
                }}
            />
        </>
      )}

      {/* Core Sphere - The "Gem" */}
      <div 
        className={`relative z-20 w-40 h-40 rounded-full flex items-center justify-center transition-transform duration-200 ease-out will-change-transform shadow-2xl`}
        style={{ 
            background: `linear-gradient(135deg, ${characterId === 'limanour' ? '#064e3b, #059669' : '#831843, #db2777'})`,
            transform: `scale(${baseScale}) translateZ(0)`,
            boxShadow: isActive ? `0 0 30px ${mainColor}60, inset 0 0 20px rgba(255,255,255,0.2)` : 'none'
        }}
      >
        {/* Shine Reflection */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
        
        {/* Icon Container */}
        <div className="relative z-30">
            {renderIcon()}
        </div>
      </div>

      <style>{`
        @keyframes ping-slow {
            0% { transform: scale(1); opacity: 0.4; }
            50% { opacity: 0.2; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-slow {
            animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};
