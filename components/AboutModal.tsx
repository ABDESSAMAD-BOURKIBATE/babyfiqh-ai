
import React from 'react';
// import { founderImage } from '../assets/founderImage';
import { Language, translations } from '../utils/translations';

interface AboutModalProps {
  onClose: () => void;
  currentLang: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose, currentLang }) => {
  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={dir}
    >
      <div
        className="bg-[#1A433A] border border-amber-500/50 rounded-2xl shadow-2xl max-w-2xl w-full text-center p-8 flex flex-col items-center gap-6 animate-fade-in relative max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button onClick={onClose} className={`absolute top-4 text-gray-400 hover:text-white ${dir === 'rtl' ? 'left-4' : 'right-4'}`}>&times;</button>

        <h1 className="text-3xl font-bold text-white border-b-2 border-amber-500 pb-2 font-cairo">
          {t.aboutTitle}
        </h1>

        <div className="text-lg text-gray-200 leading-relaxed text-justify whitespace-pre-line">
          {t.aboutText}
        </div>

        <div className="bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/30">
          <span className="text-amber-400 font-mono text-sm">{t.version}</span>
        </div>

        <div className="w-full border-t border-amber-500/30 my-2"></div>

        <div className="flex flex-col md:flex-row items-center gap-6 w-full text-right">
          <img src="/images/e28a1ed7-d7f9-4ed3-825c-156b491d62f8.png" alt="Eng. Abdessamad Bourkibate" className="w-32 h-32 rounded-full object-cover border-4 border-amber-500 flex-shrink-0 shadow-lg" />
          <div className={`flex flex-col ${dir === 'rtl' ? 'items-start text-right' : 'items-start text-left'} w-full`}>
            <h3 className="text-xl font-bold text-amber-400 font-cairo">{t.founderTitle}</h3>
            <p className="text-gray-300 leading-relaxed mt-2 text-sm md:text-base">
              {t.founderDesc}
            </p>
          </div>
        </div>

        <div className="text-[10px] text-emerald-200/50 mt-2">
          {t.rights}
        </div>

      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
