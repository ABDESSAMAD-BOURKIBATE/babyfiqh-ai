
import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ParentData, ChildProfile, ChildStats, DEFAULT_STATS } from '../utils/userData';
import { ArrowIcon } from './LandingPage';
import { FaceSmileIcon, BrainIcon, HeartHandIcon } from './icons/EmotionIcons';
import { Language, translations } from '../utils/translations';

interface ParentDashboardProps {
  initialView: 'login' | 'register' | 'forgot';
  onExit: () => void;
  onGoToChildMode: () => void;
  currentLang: Language;
}

// Icons
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
);


export const ParentDashboard: React.FC<ParentDashboardProps> = ({ initialView, onExit, onGoToChildMode, currentLang }) => {
  const [parentData, setParentData] = useState<ParentData | null>(null);
  
  // View State: 'login', 'register', 'forgot', 'dashboard', 'add_child', 'child_report', 'edit_child'
  const [view, setView] = useState<'login' | 'register' | 'forgot' | 'dashboard' | 'add_child' | 'edit_child' | 'child_report'>(initialView);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const t = translations[currentLang].ui;
  const tDashboard = t.dashboard;
  const tAuth = t.auth;
  const dir = translations[currentLang].direction;

  // Forms
  const [regForm, setRegForm] = useState({ fullName: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ email: '', newPassword: '' });
  
  // Add/Edit Child Form
  const [childForm, setChildForm] = useState({ name: '', age: '', pin: '', confirmPin: '', gender: 'boy' as 'boy'|'girl' });

  // Verification
  const [verificationAnswer, setVerificationAnswer] = useState('');
  const [verificationProblem, setVerificationProblem] = useState({ q: '', a: 0 });
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Math Challenge
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setVerificationProblem({ q: `${n1} + ${n2}`, a: n1 + n2 });

    // Attempt to load existing data
    const saved = localStorage.getItem('babyfiqh_parent_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        setParentData(parsed); 
    }
  }, []);

  // --- Actions ---

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      
      const saved = localStorage.getItem('babyfiqh_parent_data');
      if (!saved) {
          setError(tAuth.errorNoAccount);
          return;
      }

      const storedData: ParentData = JSON.parse(saved);
      
      if (storedData.email === loginForm.email && storedData.password === loginForm.password) {
          setParentData(storedData);
          setView('dashboard');
      } else {
          setError(tAuth.errorLogin);
      }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccessMsg(null);

      if (parseInt(verificationAnswer) !== verificationProblem.a) {
          setError(tAuth.errorSecurity);
          return;
      }

      const saved = localStorage.getItem('babyfiqh_parent_data');
      if (!saved) {
          setError(tAuth.errorNoAccount);
          return;
      }

      const storedData: ParentData = JSON.parse(saved);
      if (storedData.email !== forgotForm.email) {
          setError(tAuth.errorEmailMismatch);
          return;
      }

      // Update Password
      const updatedData = { ...storedData, password: forgotForm.newPassword };
      localStorage.setItem('babyfiqh_parent_data', JSON.stringify(updatedData));
      setParentData(updatedData);
      setSuccessMsg(tAuth.successReset);
      setTimeout(() => setView('login'), 2000);
  };

  const handleParentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regForm.fullName || !regForm.email || !regForm.password) {
      setError(tAuth.errorMissing);
      return;
    }
    
    if (parseInt(verificationAnswer) !== verificationProblem.a) {
        setError(tAuth.errorSecurity);
        return;
    }

    // Check if overwrite (simple logic for demo)
    if (localStorage.getItem('babyfiqh_parent_data')) {
        if (!window.confirm(tAuth.errorExists)) return;
    }

    const newParent: ParentData = {
        id: Date.now().toString(),
        fullName: regForm.fullName,
        email: regForm.email,
        password: regForm.password, // In real app, hash this
        children: []
    };

    localStorage.setItem('babyfiqh_parent_data', JSON.stringify(newParent));
    setParentData(newParent);
    setView('dashboard');
  };

  const handleEditChild = (child: ChildProfile) => {
      setChildForm({
          name: child.name,
          age: child.age.toString(),
          gender: child.gender,
          pin: child.pin,
          confirmPin: child.pin
      });
      setSelectedChildId(child.id);
      setView('edit_child');
  };

  const handleSaveChild = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if(!childForm.name || !childForm.pin) {
          setError(tAuth.errorMissing);
          return;
      }
      
      // Validation: Strictly 4 digits
      if (!/^\d{4}$/.test(childForm.pin)) {
          setError(tAuth.errorPinLength);
          return;
      }

      if (childForm.pin !== childForm.confirmPin) {
          setError(tAuth.errorPinMatch);
          return;
      }

      if(!parentData) return;

      if (view === 'edit_child' && selectedChildId) {
           // Update existing child
           const updatedChildren = parentData.children.map(c => {
               if (c.id === selectedChildId) {
                   return {
                       ...c,
                       name: childForm.name,
                       age: parseInt(childForm.age) || c.age,
                       gender: childForm.gender,
                       pin: childForm.pin
                   };
               }
               return c;
           });

           const updatedParent = {
               ...parentData,
               children: updatedChildren
           };

           setParentData(updatedParent);
           localStorage.setItem('babyfiqh_parent_data', JSON.stringify(updatedParent));
      } else {
          // Add new child
          const newChild: ChildProfile = {
              id: Date.now().toString(),
              name: childForm.name,
              age: parseInt(childForm.age) || 6,
              gender: childForm.gender,
              pin: childForm.pin,
              stats: DEFAULT_STATS, // Initialize with base stats
              createdAt: new Date().toISOString()
          };

          const updatedParent = {
              ...parentData,
              children: [...parentData.children, newChild]
          };

          setParentData(updatedParent);
          localStorage.setItem('babyfiqh_parent_data', JSON.stringify(updatedParent));
      }
      
      // Reset & Navigate
      setChildForm({ name: '', age: '', pin: '', confirmPin: '', gender: 'boy' });
      setSelectedChildId(null);
      setView('dashboard');
  };

  const handleDeleteChild = (childId: string) => {
      if(!parentData) return;
      if(window.confirm(tDashboard.confirmDelete)) {
          const updatedParent = {
              ...parentData,
              children: parentData.children.filter(c => c.id !== childId)
          };
          setParentData(updatedParent);
          localStorage.setItem('babyfiqh_parent_data', JSON.stringify(updatedParent));
          setView('dashboard');
      }
  };

  const handleViewReport = (childId: string) => {
      // Refetch data from LS to ensure report is fresh
      const saved = localStorage.getItem('babyfiqh_parent_data');
      if (saved) {
        const parsed: ParentData = JSON.parse(saved);
        setParentData(parsed);
      }
      setSelectedChildId(childId);
      setView('child_report');
  };

  // --- Render Helpers ---

  const getSelectedChild = () => parentData?.children.find(c => c.id === selectedChildId);

  // --- VIEWS ---

  // 1. LOGIN VIEW
  if (view === 'login') {
      return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 overflow-y-auto custom-scrollbar" dir={dir}>
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in">
                <div className="flex flex-col items-center mb-6">
                    <LogoIcon className="w-12 h-12 mb-4" />
                    <h1 className="text-2xl font-bold">{tAuth.loginTitle}</h1>
                    <p className="text-white/50 text-sm">{tDashboard.title}</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" placeholder={tAuth.email} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                        value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                    />
                    <input 
                        type="password" placeholder={tAuth.password} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                        value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                    />
                    
                    {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}
                    {successMsg && <p className="text-emerald-400 text-sm text-center bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">{successMsg}</p>}

                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold shadow-lg mt-2 transition-colors">{tAuth.loginBtn}</button>
                    
                    <div className="flex justify-between text-xs text-white/50 pt-4 border-t border-white/5 mt-4">
                        <button type="button" onClick={() => setView('forgot')} className="hover:text-white">{t.landing.forgotPass}</button>
                        <button type="button" onClick={onExit} className="hover:text-white">{tAuth.back}</button>
                    </div>
                </form>
            </div>
        </div>
      );
  }

  // 2. FORGOT PASSWORD VIEW
  if (view === 'forgot') {
      return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 overflow-y-auto custom-scrollbar" dir={dir}>
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in">
                <h2 className="text-xl font-bold mb-6 text-center">{tAuth.forgotTitle}</h2>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <input 
                        type="email" placeholder={tAuth.email} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                        value={forgotForm.email} onChange={e => setForgotForm({...forgotForm, email: e.target.value})}
                    />
                     <input 
                        type="password" placeholder={tAuth.newPassword} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                        value={forgotForm.newPassword} onChange={e => setForgotForm({...forgotForm, newPassword: e.target.value})}
                    />
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <label className="text-xs text-amber-400 block mb-1">{tAuth.securityQuestion}: {verificationProblem.q} = ?</label>
                        <input 
                            type="number" className="w-full bg-transparent border-b border-amber-500/50 text-center font-bold text-white outline-none"
                            value={verificationAnswer} onChange={e => setVerificationAnswer(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    {successMsg && <p className="text-emerald-400 text-sm text-center">{successMsg}</p>}

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setView('login')} className="flex-1 py-3 bg-white/5 rounded-xl">{tDashboard.cancel}</button>
                        <button type="submit" className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold shadow-lg">{tAuth.changePassBtn}</button>
                    </div>
                </form>
            </div>
        </div>
      );
  }

  // 3. REGISTER VIEW
  if (view === 'register') {
      return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 overflow-y-auto custom-scrollbar" dir={dir}>
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in">
                <div className="flex flex-col items-center mb-6">
                    <LogoIcon className="w-12 h-12 mb-4" />
                    <h1 className="text-2xl font-bold">{tAuth.registerTitle}</h1>
                    <p className="text-white/50 text-sm">{t.landing.createAccount}</p>
                </div>
                
                <form onSubmit={handleParentRegister} className="space-y-4">
                    <input 
                        type="text" placeholder={tAuth.fullName} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                        value={regForm.fullName} onChange={e => setRegForm({...regForm, fullName: e.target.value})}
                    />
                    <input 
                        type="email" placeholder={tAuth.email} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                        value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})}
                    />
                    <input 
                        type="password" placeholder={tAuth.password} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none"
                        value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})}
                    />
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <label className="text-xs text-amber-400 block mb-1">{tAuth.securityQuestion}: {verificationProblem.q} = ?</label>
                        <input 
                            type="number" className="w-full bg-transparent border-b border-amber-500/50 text-center font-bold text-white outline-none"
                            value={verificationAnswer} onChange={e => setVerificationAnswer(e.target.value)}
                        />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onExit} className="flex-1 py-3 bg-white/5 rounded-xl">{tDashboard.cancel}</button>
                        <button type="submit" className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold shadow-lg">{tAuth.registerBtn}</button>
                    </div>
                </form>
            </div>
        </div>
      );
  }

  // Main Dashboard View
  if (view === 'dashboard' && parentData) {
      return (
        <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo overflow-y-auto custom-scrollbar" dir={dir}>
             <div className="max-w-5xl mx-auto p-4 md:p-8 pb-20">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-lg">
                            {parentData.fullName.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{tDashboard.title}</h1>
                            <p className="text-indigo-300 text-xs opacity-80">{tDashboard.subtitle}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => { setView('add_child'); setChildForm({ name: '', age: '', pin: '', confirmPin: '', gender: 'boy' }); setSelectedChildId(null); }} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg text-sm font-bold">
                            <PlusIcon className="w-4 h-4" />
                            <span>{tDashboard.addChild}</span>
                        </button>
                        <button onClick={onExit} className="px-5 py-2.5 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-300 rounded-xl transition-colors text-sm">
                            {tDashboard.logout}
                        </button>
                    </div>
                </div>

                {/* Children Grid */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-indigo-400" />
                        {tDashboard.registeredChildren}
                    </h2>
                    
                    {parentData.children.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-3xl border border-dashed border-white/10">
                            <p className="text-white/40 mb-4">{tDashboard.noChildren}</p>
                            <button onClick={() => { setView('add_child'); setChildForm({ name: '', age: '', pin: '', confirmPin: '', gender: 'boy' }); setSelectedChildId(null); }} className="text-emerald-400 font-bold text-sm hover:underline">{tDashboard.addFirst}</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {parentData.children.map(child => (
                                <div key={child.id} className="bg-[#1e293b]/50 border border-white/10 rounded-3xl p-6 relative group hover:border-indigo-500/50 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                                            ${child.gender === 'girl' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {child.gender === 'girl' ? '👧' : '👦'}
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 rounded-lg text-xs font-mono text-white/60 tracking-widest">
                                            PIN: {child.pin}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold mb-1">{child.name}</h3>
                                    <p className="text-xs text-white/50 mb-6">{child.age} {currentLang === 'ar' ? 'سنوات' : 'years'}</p>

                                    <div className="grid grid-cols-3 gap-2">
                                        <button 
                                            onClick={() => handleViewReport(child.id)}
                                            className="py-2.5 bg-white/5 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                                            title={tDashboard.viewReport}
                                        >
                                            <ChartIcon className="w-4 h-4" />
                                        </button>
                                         <button 
                                            onClick={() => handleEditChild(child)}
                                            className="py-2.5 bg-white/5 hover:bg-amber-600 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                                            title={tDashboard.editChild}
                                        >
                                            <EditIcon className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteChild(child.id)}
                                            className="py-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-300 rounded-xl text-xs font-bold transition-colors text-white/60"
                                            title={tDashboard.delete}
                                        >
                                            {tDashboard.delete}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                    <p className="text-white/30 text-xs">{tDashboard.reportUpdate}</p>
                    <button onClick={onGoToChildMode} className="text-indigo-400 text-sm font-bold hover:text-indigo-300 flex items-center gap-2">
                        {tDashboard.goToChildLogin}
                        <ArrowIcon className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`}/>
                    </button>
                </div>

             </div>
        </div>
      );
  }

  // Add/Edit Child View (Updated PIN Validation)
  if (view === 'add_child' || view === 'edit_child') {
      const isEdit = view === 'edit_child';
      return (
          <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 overflow-y-auto custom-scrollbar" dir={dir}>
              <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-xl font-bold mb-6 text-center">
                    {isEdit ? tDashboard.editChild : tDashboard.addChild}
                  </h2>
                  <form onSubmit={handleSaveChild} className="space-y-4">
                      <div className="space-y-2">
                          <label className="text-xs text-white/60">{tDashboard.childName}</label>
                          <input 
                            type="text" value={childForm.name} onChange={e => setChildForm({...childForm, name: e.target.value})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
                            required
                          />
                      </div>
                      <div className="flex gap-4">
                          <div className="flex-1 space-y-2">
                              <label className="text-xs text-white/60">{tDashboard.childAge}</label>
                              <input 
                                type="number" value={childForm.age} onChange={e => setChildForm({...childForm, age: e.target.value})}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500"
                                required
                              />
                          </div>
                          <div className="flex-1 space-y-2">
                               <label className="text-xs text-white/60">{tDashboard.childGender}</label>
                               <div className="flex bg-black/20 rounded-xl p-1">
                                   <button type="button" onClick={() => setChildForm({...childForm, gender: 'boy'})} className={`flex-1 rounded-lg py-2 text-xs font-bold ${childForm.gender === 'boy' ? 'bg-blue-600 text-white' : 'text-white/50'}`}>{tDashboard.boy}</button>
                                   <button type="button" onClick={() => setChildForm({...childForm, gender: 'girl'})} className={`flex-1 rounded-lg py-2 text-xs font-bold ${childForm.gender === 'girl' ? 'bg-pink-600 text-white' : 'text-white/50'}`}>{tDashboard.girl}</button>
                               </div>
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-xs text-emerald-400 font-bold">{tDashboard.pinCode}</label>
                              <div className="relative">
                                   <LockIcon className={`absolute top-3.5 w-4 h-4 text-white/30 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} />
                                   <input 
                                     type="tel" maxLength={4} value={childForm.pin} onChange={e => setChildForm({...childForm, pin: e.target.value.replace(/[^0-9]/g, '')})}
                                     className={`w-full bg-black/20 border border-emerald-500/30 rounded-xl p-3 text-white outline-none focus:border-emerald-500 font-mono tracking-widest text-center text-lg ${dir === 'rtl' ? 'pl-10' : 'pr-10'}`}
                                     placeholder="****"
                                     required
                                   />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs text-emerald-400 font-bold">{tDashboard.confirmPin}</label>
                              <div className="relative">
                                   <input 
                                     type="tel" maxLength={4} value={childForm.confirmPin} onChange={e => setChildForm({...childForm, confirmPin: e.target.value.replace(/[^0-9]/g, '')})}
                                     className={`w-full bg-black/20 border rounded-xl p-3 text-white outline-none font-mono tracking-widest text-center text-lg
                                        ${childForm.confirmPin && childForm.pin !== childForm.confirmPin ? 'border-red-500/50 focus:border-red-500' : 'border-emerald-500/30 focus:border-emerald-500'}
                                     `}
                                     placeholder="****"
                                     required
                                   />
                              </div>
                          </div>
                      </div>

                      {error && <p className="text-red-400 text-xs text-center font-bold bg-red-500/10 p-2 rounded">{error}</p>}

                      <div className="flex gap-3 pt-4">
                          <button type="button" onClick={() => { setView('dashboard'); setSelectedChildId(null); }} className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold">{tDashboard.cancel}</button>
                          <button type="submit" className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold shadow-lg">{tDashboard.save}</button>
                      </div>
                  </form>
              </div>
          </div>
      );
  }

  // Report View - Enhanced
  if (view === 'child_report') {
      const child = getSelectedChild();
      if(!child) return null;

      return (
          // Fixed container with flex-col to handle full height and scrolling
          <div className="fixed inset-0 w-full h-full bg-[#020617] text-white font-cairo flex flex-col" dir={dir}>
              {/* Scrollable Content Area */}
              <div className="flex-grow overflow-y-auto custom-scrollbar p-4 md:p-8">
                  <div className="max-w-6xl mx-auto pb-20">
                      
                      {/* Header & Back Navigation */}
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 animate-fade-in-up">
                          <button onClick={() => setView('dashboard')} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 shrink-0 shadow-lg">
                              <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                          </button>
                          <div>
                            <h1 className="text-3xl font-bold flex items-center gap-3">
                                {child.name}
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${child.gender === 'boy' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-pink-500/20 text-pink-300 border-pink-500/30'}`}>
                                    {child.gender === 'boy' ? '👦 ' + tDashboard.boy : '👧 ' + tDashboard.girl}
                                </div>
                            </h1>
                            <p className="text-white/40 text-sm mt-1">
                                {tDashboard.reportUpdate}
                            </p>
                          </div>
                      </div>

                      {/* Stats Grid - Top Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          
                          {/* 1. Emotional Intelligence Card */}
                          <div className="bg-[#1e293b]/40 border border-white/10 rounded-3xl p-6 relative overflow-hidden min-h-[320px] flex flex-col animate-fade-in-up hover:border-indigo-500/30 transition-all" style={{animationDelay: '0.1s'}}>
                               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                               <div className="mb-4 p-4 bg-indigo-500/20 rounded-full text-indigo-400 w-fit border border-indigo-500/20">
                                   <BrainIcon className="w-8 h-8" />
                               </div>
                               <h2 className="text-lg font-bold text-white/80 mb-2">{tDashboard.emotionalIQ}</h2>
                               
                               <div className="relative w-32 h-32 flex items-center justify-center my-auto mx-auto">
                                   <svg className="w-full h-full transform -rotate-90">
                                       <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                       <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                            strokeDasharray={351.86} 
                                            strokeDashoffset={351.86 - (351.86 * child.stats.emotionalIntelligence / 100)} 
                                            className="text-indigo-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                                            strokeLinecap="round"
                                       />
                                   </svg>
                                   <span className="absolute text-3xl font-bold">{child.stats.emotionalIntelligence}%</span>
                               </div>
                               <p className="text-center text-xs text-white/40 mt-auto">
                                    {currentLang === 'ar' ? 'بناءً على إيجابية التفاعل' : 'Based on interaction positivity'}
                               </p>
                          </div>

                          {/* 2. Psychological State */}
                          <div className="bg-[#1e293b]/40 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[320px] animate-fade-in-up hover:border-emerald-500/30 transition-all" style={{animationDelay: '0.2s'}}>
                               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                               <div className="flex items-center gap-3 mb-6">
                                   <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 w-fit border border-emerald-500/20">
                                       <HeartHandIcon className="w-6 h-6" />
                                   </div>
                                   <h2 className="text-lg font-bold text-white/80">{tDashboard.psychState}</h2>
                               </div>

                               <div className="space-y-6 flex-grow">
                                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <span className="text-sm text-white/70">{tDashboard.dominantMood}</span>
                                       <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg capitalize border border-emerald-500/20">
                                           {child.stats.dominantMood === 'happy' ? tDashboard.happy : 
                                            child.stats.dominantMood === 'curious' ? tDashboard.curious : 
                                            child.stats.dominantMood === 'calm' ? tDashboard.calm : 
                                            child.stats.dominantMood}
                                       </span>
                                   </div>
                                   
                                   <div className="mt-auto space-y-4">
                                       <div className="space-y-1">
                                           <div className="flex justify-between text-xs">
                                               <span>{tDashboard.traitCuriosity}</span>
                                               <span className="text-emerald-400 font-bold">
                                                   {child.stats.topicsLearned.length > 5 ? tDashboard.high : tDashboard.good}
                                               </span>
                                           </div>
                                           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                               <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{width: `${Math.min(100, child.stats.topicsLearned.length * 10 + 20)}%`}}></div>
                                           </div>
                                       </div>

                                       <div className="space-y-1">
                                           <div className="flex justify-between text-xs">
                                               <span>{tDashboard.traitConfidence}</span>
                                               <span className="text-blue-400 font-bold">
                                                   {child.stats.totalMessages > 20 ? tDashboard.high : tDashboard.good}
                                               </span>
                                           </div>
                                           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                               <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{width: `${Math.min(100, child.stats.totalMessages + 10)}%`}}></div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                          </div>

                          {/* 3. Activity Summary */}
                           <div className="bg-[#1e293b]/40 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[320px] animate-fade-in-up hover:border-amber-500/30 transition-all" style={{animationDelay: '0.3s'}}>
                               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                               <h2 className="text-lg font-bold text-white/80 mb-6 flex items-center gap-2">
                                   <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><ChartIcon className="w-6 h-6" /></div>
                                   {tDashboard.learningStats}
                               </h2>

                               <div className="grid grid-cols-2 gap-4 mb-6">
                                   <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
                                       <span className="block text-3xl font-bold text-white mb-1">{child.stats.sessionsCount}</span>
                                       <span className="text-xs text-white/50 uppercase tracking-wider">{tDashboard.sessions}</span>
                                   </div>
                                   <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
                                       <span className="block text-3xl font-bold text-white mb-1">{child.stats.topicsLearned.length}</span>
                                       <span className="text-xs text-white/50 uppercase tracking-wider">{tDashboard.topics}</span>
                                   </div>
                               </div>
                               
                               <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
                                    <div className="flex justify-between text-[10px] text-white/40">
                                        <span>Total Interactions</span>
                                        <span className="text-white/70 font-mono">{child.stats.totalMessages}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-white/40">
                                        <span>Last Active</span>
                                        <span className="text-white/70 font-mono">{new Date(child.stats.lastActive).toLocaleDateString()}</span>
                                    </div>
                               </div>
                          </div>
                      </div>

                      {/* Detailed History Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                          
                          {/* Topics List */}
                          <div className="bg-[#1e293b]/30 border border-white/10 rounded-3xl p-6 min-h-[300px]">
                              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                  <span className="p-2 bg-teal-500/10 rounded-lg text-teal-400 border border-teal-500/20"><ChartIcon className="w-5 h-5"/></span>
                                  {tDashboard.topics} <span className="text-white/40 text-sm">({child.stats.topicsLearned.length})</span>
                              </h3>
                              <div className="bg-black/20 rounded-2xl p-4 h-[250px] overflow-y-auto custom-scrollbar border border-white/5">
                                  {child.stats.topicsLearned.length > 0 ? (
                                      <div className="flex flex-wrap gap-2">
                                          {child.stats.topicsLearned.map((topic, i) => (
                                              <span key={i} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white/90 transition-colors cursor-default shadow-sm">
                                                  {topic}
                                              </span>
                                          ))}
                                      </div>
                                  ) : (
                                      <div className="h-full flex flex-col items-center justify-center text-white/30 gap-2">
                                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                              <ChartIcon className="w-6 h-6 opacity-50" />
                                          </div>
                                          <p className="text-sm italic">{tDashboard.noChildren || 'No topics learned yet'}</p>
                                      </div>
                                  )}
                              </div>
                          </div>

                          {/* Emotion Timeline */}
                           <div className="bg-[#1e293b]/30 border border-white/10 rounded-3xl p-6 min-h-[300px]">
                              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                  <span className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20"><BrainIcon className="w-5 h-5"/></span>
                                  {currentLang === 'ar' ? 'سجل المشاعر' : 'Emotion Timeline'}
                              </h3>
                              <div className="bg-black/20 rounded-2xl p-4 h-[250px] overflow-y-auto custom-scrollbar border border-white/5 space-y-2">
                                  {child.stats.emotionsHistory.length > 0 ? (
                                      child.stats.emotionsHistory.slice().reverse().map((emotion, i) => (
                                          <div key={i} className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors group">
                                              <div className="flex items-center gap-3">
                                                  <div className={`w-2.5 h-2.5 rounded-full shadow-lg
                                                      ${emotion === 'happy' ? 'bg-amber-400 shadow-amber-500/50' : 
                                                        emotion === 'sad' ? 'bg-blue-400 shadow-blue-500/50' : 
                                                        emotion === 'excited' ? 'bg-orange-400 shadow-orange-500/50' : 
                                                        emotion === 'empathetic' ? 'bg-pink-400 shadow-pink-500/50' : 
                                                        'bg-slate-400'}`}>
                                                  </div>
                                                  <span className="capitalize text-sm font-medium text-white/90 group-hover:text-white">{emotion}</span>
                                              </div>
                                              <span className="text-[10px] text-white/30 font-mono">
                                                  #{child.stats.emotionsHistory.length - i}
                                              </span>
                                          </div>
                                      ))
                                  ) : (
                                       <div className="h-full flex flex-col items-center justify-center text-white/30 gap-2">
                                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                              <BrainIcon className="w-6 h-6 opacity-50" />
                                          </div>
                                          <p className="text-sm italic">No emotions recorded yet</p>
                                      </div>
                                  )}
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return null;
};
