import React from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { Language, translations } from '../utils/translations';
import { MicIcon } from './icons/MicIcon';

interface HeaderProps {
  currentLang: Language;
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, isSidebarOpen, onOpenSidebar }) => {
  const t = translations[currentLang].ui;

  return (
    <header className="bg-transparent pt-12 md:pt-6 pb-2 px-4 md:px-8 w-full flex-shrink-0">
      <div className="flex items-center justify-between w-full">

        <div className="flex items-center gap-3">
          {/* Menu Button - Visible when sidebar is closed or on mobile */}
          <button
            onClick={onOpenSidebar}
            className={`p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all ${isSidebarOpen ? 'md:opacity-0 md:pointer-events-none' : 'opacity-100'}`}
            aria-label="Open Menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Mobile Title */}
          <div className="md:hidden flex items-center gap-2">
            <img src={import.meta.env.BASE_URL + 'images/babyfiqh-ai.png'} alt="Logo" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-bold text-white tracking-wide drop-shadow-md font-cairo">
              Babyfiqh AI
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(currentLang === 'ar' ? 'قريباً... نعمل على تحسين هذه الميزة' : 'Coming Soon... We are improving this feature')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-amber-500/50 transform hover:-translate-y-0.5 group relative"
          >
            <div className="bg-white/20 p-1 rounded-full">
              <MicIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm hidden md:inline">{t.startLive}</span>
            <span className="font-bold text-sm md:hidden">Live</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {currentLang === 'ar' ? 'قريباً' : 'Soon'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};