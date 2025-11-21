import React from 'react';
import { MicIcon } from './icons/MicIcon';
import { MenuIcon } from './icons/MenuIcon';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
  currentLang: Language;
  onStartLive: () => void;
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onStartLive, isSidebarOpen, onOpenSidebar }) => {
  const t = translations[currentLang].ui;

  return (
    <header className="bg-transparent pt-4 pb-2 px-4 md:px-8 w-full flex-shrink-0">
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

          {/* Mobile Title (Sidebar hides logo on mobile usually, but let's keep header clean) */}
          <div className="md:hidden flex items-center gap-2">
            <img src="/images/babyfiqh-ai.png" alt="Babyfiqh AI" className="w-6 h-6 object-contain" />
            <h1 className="text-lg font-bold text-white tracking-wide drop-shadow-md font-cairo">
              Babyfiqh AI
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartLive}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-amber-500/50 transform hover:-translate-y-0.5 group"
          >
            <div className="bg-white/20 p-1 rounded-full">
              <MicIcon className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-bold text-sm hidden md:inline">{t.startLive}</span>
            <span className="font-bold text-sm md:hidden">Live</span>
          </button>
        </div>
      </div>
    </header>
  );
};