
import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ParentData, ChildProfile, DEFAULT_STATS } from '../utils/userData';
import { Language, translations } from '../utils/translations';

interface ChildAuthModalProps {
  onSuccess: (childId: string) => void;
  onCancel: () => void;
  currentLang: Language;
}

const ChildHeadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 2a5 5 0 0 1 5 5" />
  </svg>
);

export const ChildAuthModal: React.FC<ChildAuthModalProps> = ({ onSuccess, onCancel, currentLang }) => {
  // 'auth' = Enter PIN/SSO. 'select_profile' = Choose child if multiple match or after SSO.
  const [step, setStep] = useState<'auth' | 'select_profile'>('auth');
  
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<ChildProfile[]>([]);
  
  const [authMethod, setAuthMethod] = useState<'pin' | 'sso'>('pin');
  const [pin, setPin] = useState('');
  const [ssoCode, setSsoCode] = useState('');
  const [error, setError] = useState(false);
  
  const t = translations[currentLang].ui.childAuth;
  const dir = translations[currentLang].direction;

  useEffect(() => {
    const storedParent = localStorage.getItem('babyfiqh_parent_data');
    if (storedParent) {
        const data: ParentData = JSON.parse(storedParent);
        setChildren(data.children);
    }
  }, []);

  // PIN Verification Logic
  useEffect(() => {
      if (authMethod === 'pin' && pin.length === 4) {
          const matches = children.filter(c => c.pin === pin);
          if (matches.length === 1) {
              // Exact match found - Login immediately
              onSuccess(matches[0].id);
          } else if (matches.length > 1) {
              // Ambiguous match (duplicate PINs) - ask user to select
              setFilteredChildren(matches);
              setStep('select_profile');
          } else {
              // No match
              setError(true);
              setTimeout(() => setPin(''), 500);
          }
      }
  }, [pin, children, authMethod, onSuccess]);

  const handleNumberClick = (num: number) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError(false);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const createGuestChild = (): ChildProfile => {
      return {
          id: Date.now().toString(),
          name: currentLang === 'ar' ? 'ضيف صغير' : 'Little Guest',
          age: 6,
          gender: 'boy',
          pin: '0000',
          stats: { ...DEFAULT_STATS },
          createdAt: new Date().toISOString()
      };
  };

  const handleSsoLogin = () => {
      if (ssoCode.toUpperCase().trim() === 'FREE26') {
          if (children.length > 0) {
              // SSO valid, show all children to select who is playing
              setFilteredChildren(children);
              setStep('select_profile');
          } else {
              // No children exist? Create a guest/default child for instant access
              const guest = createGuestChild();
              
              // Check if parent data structure exists
              const storedParent = localStorage.getItem('babyfiqh_parent_data');
              let parentData: ParentData;
              
              if (storedParent) {
                  parentData = JSON.parse(storedParent);
                  parentData.children.push(guest);
              } else {
                  // Create default parent
                  parentData = {
                      id: 'default_parent',
                      fullName: 'Parent',
                      email: 'guest@babyfiqh.ai',
                      password: 'admin',
                      children: [guest]
                  };
              }
              
              localStorage.setItem('babyfiqh_parent_data', JSON.stringify(parentData));
              onSuccess(guest.id);
          }
      } else {
          setError(true);
      }
  };

  // --- STEP 2: Profile Selection (Only if needed) ---
  if (step === 'select_profile') {
      return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 font-cairo" dir={dir}>
            <div className="w-full max-w-2xl animate-fade-in">
                <div className="text-center mb-10">
                    <LogoIcon className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white">{t.whoAreYou}</h2>
                    <p className="text-white/50 mt-2 text-lg">{translations[currentLang].ui.welcomeSubtitle}</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8">
                    {filteredChildren.map(child => (
                        <button 
                            key={child.id}
                            onClick={() => onSuccess(child.id)}
                            className="group flex flex-col items-center gap-4 transition-all hover:-translate-y-2"
                        >
                            <div className={`w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center text-5xl shadow-2xl transition-all group-hover:border-indigo-500 group-hover:shadow-indigo-500/50
                                ${child.gender === 'girl' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'}
                            `}>
                                {child.gender === 'girl' ? '👧' : '👦'}
                            </div>
                            <span className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                {child.name}
                            </span>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => { setStep('auth'); setPin(''); setSsoCode(''); }} 
                    className="mt-16 mx-auto block text-white/40 hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full text-sm"
                >
                    {t.back}
                </button>
            </div>
        </div>
      );
  }

  // --- STEP 1: Auth Input (Default View) ---
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-cairo" dir={dir}>
      <div className="bg-[#1e293b] border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-fade-in relative">
        
        <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <ChildHeadIcon className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{t.title}</h2>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex p-1 bg-black/40 rounded-xl mb-6 w-full">
            <button 
                onClick={() => { setAuthMethod('pin'); setError(false); setSsoCode(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${authMethod === 'pin' ? 'bg-white/10 text-white shadow-sm border border-white/10' : 'text-white/40 hover:text-white/70'}`}
            >
                {t.pinLabel}
            </button>
            <button 
                onClick={() => { setAuthMethod('sso'); setError(false); setPin(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${authMethod === 'sso' ? 'bg-amber-600 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
            >
                {t.ssoLabel}
            </button>
        </div>

        {authMethod === 'pin' ? (
            <>
                <p className="text-white/50 text-sm text-center mb-4">{t.enterPin}</p>
                
                {/* PIN Dots */}
                <div className="flex justify-center gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                i < pin.length 
                                    ? (error ? 'bg-red-500' : 'bg-emerald-500 scale-125') 
                                    : 'bg-white/20'
                            }`}
                        ></div>
                    ))}
                </div>

                {error && <p className="text-red-400 text-center text-sm mb-4 font-bold animate-pulse">{t.incorrect}</p>}

                {/* Numpad */}
                <div className={`grid grid-cols-3 gap-3 mb-2 ${dir === 'rtl' ? '' : ''}`}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleNumberClick(num)}
                            className="h-14 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold text-white transition-colors flex items-center justify-center shadow-lg active:scale-95"
                        >
                            {num}
                        </button>
                    ))}
                    <button onClick={onCancel} className="h-14 rounded-xl text-xs font-bold text-white/40 hover:text-white transition-colors flex items-center justify-center">
                        {translations[currentLang].ui.dashboard.cancel}
                    </button>
                    <button onClick={() => handleNumberClick(0)} className="h-14 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold text-white transition-colors flex items-center justify-center shadow-lg active:scale-95">
                        0
                    </button>
                    <button onClick={handleBackspace} className="h-14 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center justify-center active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                    </button>
                </div>
            </>
        ) : (
            // SSO View
            <div className="flex flex-col gap-4 mb-4 animate-fade-in">
                <p className="text-white/50 text-sm text-center">{t.enterSso}</p>
                
                <div className="relative">
                    <input 
                        type="text"
                        value={ssoCode}
                        onChange={(e) => { setSsoCode(e.target.value); setError(false); }}
                        placeholder="CODE"
                        className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-center text-xl text-white font-bold tracking-[0.2em] focus:border-amber-500 outline-none placeholder-white/10 uppercase"
                        autoFocus
                    />
                </div>
                
                {error && <p className="text-red-400 text-center text-sm font-bold animate-pulse">{t.incorrect}</p>}

                <button 
                    onClick={handleSsoLogin}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 mt-2"
                >
                    {t.check}
                </button>

                <button onClick={onCancel} className="w-full py-3 text-white/40 hover:text-white text-xs font-bold transition-colors">
                    {translations[currentLang].ui.dashboard.cancel}
                </button>
            </div>
        )}

      </div>
      <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </div>
  );
};
