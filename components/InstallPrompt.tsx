
import React, { useEffect, useState } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';

interface InstallPromptProps {
  currentLang: Language;
}

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
);

export const InstallPrompt: React.FC<InstallPromptProps> = ({ currentLang }) => {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const t = translations[currentLang].ui;

  useEffect(() => {
    // Detect iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) return;

    // Handle Android/Desktop install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show instructions for iOS if not standalone
    if (isIosDevice) {
       // Only show once per session to not be annoying
       if(!sessionStorage.getItem('installPromptShown')) {
            setTimeout(() => setShow(true), 3000); 
            sessionStorage.setItem('installPromptShown', 'true');
       }
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setShow(false);
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-[100] animate-slide-up">
      <div className="bg-[#0f172a]/90 border border-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex items-center justify-between max-w-md mx-auto">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex-shrink-0 shadow-lg"></div>
            <div>
                <h3 className="text-white font-bold text-sm">{t.installApp}</h3>
                <p className="text-white/60 text-xs">{t.installDesc}</p>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            {isIOS ? (
                 <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                    <ShareIcon className="w-4 h-4" />
                    <span>Add to Home</span>
                 </div>
            ) : (
                <button 
                    onClick={handleInstallClick}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg transition-all"
                >
                    Install
                </button>
            )}
            <button onClick={() => setShow(false)} className="text-white/40 hover:text-white p-1">
                <XIcon className="w-5 h-5" />
            </button>
         </div>
      </div>
      <style>{`
        @keyframes slide-up {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
            animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};
