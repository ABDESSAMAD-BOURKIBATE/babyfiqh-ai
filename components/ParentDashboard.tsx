import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ParentData, ChildProfile, ChildStats, DEFAULT_STATS, generateParentalAdvice, ActivityLog } from '../utils/userData';
import { generateChildPdfReport } from '../utils/reportUtils';
import { ArrowIcon } from './LandingPage';
import { FaceSmileIcon, BrainIcon, HeartHandIcon } from './icons/EmotionIcons';
import { AnalyticsIcon } from './icons/AnalyticsIcon';
import { Language, translations } from '../utils/translations';

interface ParentDashboardProps {
    initialView: 'login' | 'register' | 'forgot';
    onExit: () => void;
    onGoToChildMode: () => void;
    currentLang: Language;
}

// Icons
// Professional SVG Icons
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20.2C9.5 20.2 7.29 18.92 6 16.98C6.03 14.99 10 13.9 12 13.9C13.99 13.9 17.97 14.99 18 16.98C16.71 18.92 14.5 20.2 12 20.2Z" />
    </svg>
);

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6Z" />
    </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" />
    </svg>
);

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
    </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" />
    </svg>
);

const FatherIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const MotherIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 12c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        <path d="M12 2C9.5 2 7.5 3.5 7.5 6c0 1.5 1 3 2.5 3.5.5.2 1 .2 1.5.2 2.5 0 4.5-2 4.5-4.5S14.5 2 12 2z" opacity="0.3" />
    </svg>
);

const CrescentMoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        <path d="M17 8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
    </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
    </svg>
);



const ActivityTimeline: React.FC<{ logs: ActivityLog[], currentLang: Language }> = ({ logs, currentLang }) => {
    const t = translations[currentLang].ui.dashboard;
    const title = currentLang === 'ar' ? 'سجل النشاط' : 'Activity Log';
    const noActivity = currentLang === 'ar' ? 'لا يوجد نشاط حديث' : 'No recent activity';

    if (!logs || logs.length === 0) {
        return (
            <div className="bg-[#1e293b]/30 border border-white/10 rounded-3xl p-6 min-h-[300px] flex flex-col items-center justify-center text-white/30">
                <p>{noActivity}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#1e293b]/30 border border-white/10 rounded-3xl p-6 h-[400px] flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                    <AnalyticsIcon className="w-5 h-5" />
                </span>
                {title}
            </h3>
            <div className="overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {logs.slice().reverse().map((log) => (
                    <div key={log.id} className="bg-white/5 rounded-xl p-3 border border-white/5 flex gap-3 items-start">
                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${log.type === 'video' ? 'bg-red-400' :
                            log.type === 'game' ? 'bg-green-400' :
                                log.type === 'story' ? 'bg-amber-400' :
                                    'bg-blue-400'
                            }`} />
                        <div>
                            <p className="text-sm font-bold text-white/90">{log.title}</p>
                            <p className="text-xs text-white/50">{log.details}</p>
                            <p className="text-[10px] text-white/30 mt-1 font-mono">
                                {new Date(log.timestamp).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ParentalAdviceSection: React.FC<{ child: ChildProfile, currentLang: Language }> = ({ child, currentLang }) => {
    const advice = generateParentalAdvice(child, currentLang);
    const title = currentLang === 'ar' ? 'رؤى ونصائح الذكاء الاصطناعي' : 'AI Insights & Advice';
    const noAdvice = currentLang === 'ar' ? 'مطلوب المزيد من النشاط لتوليد الرؤى.' : 'More activity needed to generate insights.';

    return (
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-3xl p-6 h-[400px] flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 border border-indigo-500/30">
                    <BrainIcon className="w-5 h-5" />
                </span>
                {title}
            </h3>
            <div className="overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {advice.map((tip, i) => (
                    <div key={i} className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm text-indigo-100 leading-relaxed">
                            {tip}
                        </p>
                    </div>
                ))}
                {advice.length === 0 && (
                    <p className="text-white/40 text-center italic mt-10">
                        {noAdvice}
                    </p>
                )}
            </div>
        </div>
    );
};

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ initialView, onExit, onGoToChildMode, currentLang }) => {
    const [parentData, setParentData] = useState<ParentData | null>(null);

    // View State
    const [view, setView] = useState<'login' | 'register' | 'forgot' | 'dashboard' | 'add_child' | 'edit_child' | 'child_report'>(initialView);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

    const t = translations[currentLang].ui;
    const tDashboard = t.dashboard;
    const tAuth = t.auth;
    const dir = translations[currentLang].direction;

    // Forms
    const [regForm, setRegForm] = useState({ fullName: '', email: '', password: '', role: 'father' as 'father' | 'mother' });
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [forgotForm, setForgotForm] = useState({ email: '', newPassword: '' });

    // Add/Edit Child Form
    const [childForm, setChildForm] = useState({ name: '', age: '', pin: '', confirmPin: '', gender: 'boy' as 'boy' | 'girl' });

    // Verification
    const [verificationAnswer, setVerificationAnswer] = useState('');
    const [verificationProblem, setVerificationProblem] = useState({ q: '', a: 0 });
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [reportRange, setReportRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

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

    const mustBeLoggedMessage = currentLang === 'ar'
        ? 'يجب تسجيل الدخول بحساب ولي أمر لحفظ بيانات الأطفال بشكل صحيح.'
        : 'You must be signed in with a parent account to save child data.';

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
            role: regForm.role,
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

        if (!parentData) {
            setError(mustBeLoggedMessage);
            setView('login');
            return;
        }

        if (!childForm.name || !childForm.pin) {
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

        if (!parentData) return;

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
        if (!parentData) return;
        if (window.confirm(tDashboard.confirmDelete)) {
            const updatedParent = {
                ...parentData,
                children: parentData.children.filter(c => c.id !== childId)
            };
            setParentData(updatedParent);
            localStorage.setItem('babyfiqh_parent_data', JSON.stringify(updatedParent));
            setView('dashboard');
        }
    };

    const handleDownloadReport = async (child: ChildProfile) => {
        const lang = currentLang === 'fr' ? 'fr' : currentLang === 'es' ? 'es' : 'en';
        const pdf = await generateChildPdfReport(child, reportRange, lang as any);
        pdf.save(`${child.name}-report-${reportRange}.pdf`);
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

    const handleLogout = () => {
        setParentData(null);
        setView('login');
        onExit();
    };

    // --- Render Helpers ---

    const getSelectedChild = () => parentData?.children.find(c => c.id === selectedChildId);

    // --- VIEWS ---

    // 1. LOGIN VIEW
    if (view === 'login') {
        return (
            <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 py-8 overflow-y-auto custom-scrollbar" dir={dir}>
                <div className="w-full max-w-lg bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10 animate-fade-in my-4 max-h-[90vh] overflow-y-auto custom-scrollbar">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <div className="relative w-20 h-20 bg-[#0f172a] rounded-full border border-white/10 flex items-center justify-center shadow-xl">
                                <LockIcon className="w-10 h-10 text-emerald-400" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">{tAuth.loginTitle}</h1>
                        <p className="text-slate-400 text-sm">{tDashboard.title}</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Input Fields */}
                        <div className="space-y-4">
                            {/* Email */}
                            <div className="group relative">
                                {dir !== 'rtl' && (
                                    <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none z-10">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                )}
                                <input
                                    type="email"
                                    placeholder={tAuth.email}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-emerald-500 focus:bg-black/30 outline-none transition-all`}
                                    value={loginForm.email}
                                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                                />
                                {dir === 'rtl' && (
                                    <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none z-10">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div className="group relative">
                                {dir !== 'rtl' && (
                                    <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none z-10">
                                        <LockIcon className="w-5 h-5" />
                                    </div>
                                )}
                                <input
                                    type="password"
                                    placeholder={tAuth.password}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-emerald-500 focus:bg-black/30 outline-none transition-all`}
                                    value={loginForm.password}
                                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                                />
                                {dir === 'rtl' && (
                                    <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none z-10">
                                        <LockIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-red-400 text-sm font-medium">{error}</p>
                            </div>
                        )}
                        {successMsg && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-emerald-400 text-sm font-medium">{successMsg}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {tAuth.loginBtn}
                        </button>

                        {/* Footer Links */}
                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => setView('forgot')}
                                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
                            >
                                {t.landing.forgotPass}
                            </button>
                            <button
                                type="button"
                                onClick={onExit}
                                className="text-xs text-slate-400 hover:text-white transition-colors font-medium"
                            >
                                {tAuth.back}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // 2. FORGOT PASSWORD VIEW
    if (view === 'forgot') {
        return (
            <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 py-8 overflow-y-auto custom-scrollbar" dir={dir}>
                <div className="w-full max-w-lg bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10 animate-fade-in my-4 max-h-[90vh] overflow-y-auto custom-scrollbar">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <div className="relative w-20 h-20 bg-[#0f172a] rounded-full border border-white/10 flex items-center justify-center shadow-xl">
                                <ShieldIcon className="w-10 h-10 text-amber-400" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">{tAuth.forgotTitle}</h1>
                        <p className="text-slate-400 text-sm text-center">{currentLang === 'ar' ? 'استعادة كلمة المرور' : 'Recover your password'}</p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-6">

                        {/* Input Fields */}
                        <div className="space-y-4">
                            {/* Email */}
                            <div className="group relative">
                                {dir !== 'rtl' && (
                                    <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-amber-400 transition-colors pointer-events-none z-10">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                )}
                                <input
                                    type="email"
                                    placeholder={tAuth.email}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-amber-500 focus:bg-black/30 outline-none transition-all`}
                                    value={forgotForm.email}
                                    onChange={e => setForgotForm({ ...forgotForm, email: e.target.value })}
                                />
                                {dir === 'rtl' && (
                                    <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-amber-400 transition-colors pointer-events-none z-10">
                                        <MailIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>

                            {/* New Password */}
                            <div className="group relative">
                                {dir !== 'rtl' && (
                                    <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-amber-400 transition-colors pointer-events-none z-10">
                                        <LockIcon className="w-5 h-5" />
                                    </div>
                                )}
                                <input
                                    type="password"
                                    placeholder={tAuth.newPassword}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-amber-500 focus:bg-black/30 outline-none transition-all`}
                                    value={forgotForm.newPassword}
                                    onChange={e => setForgotForm({ ...forgotForm, newPassword: e.target.value })}
                                />
                                {dir === 'rtl' && (
                                    <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-amber-400 transition-colors pointer-events-none z-10">
                                        <LockIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Security Question */}
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <ShieldIcon className="w-24 h-24 text-amber-500" />
                            </div>
                            <div className="relative z-10">
                                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 block flex items-center gap-2">
                                    <ShieldIcon className="w-4 h-4" />
                                    {tAuth.securityQuestion}
                                </label>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-white font-mono">{verificationProblem.q} = </span>
                                    <input
                                        type="number"
                                        className="w-24 bg-black/20 border-b-2 border-amber-500/50 text-center font-bold text-xl text-white outline-none focus:border-amber-500 transition-colors py-1"
                                        value={verificationAnswer}
                                        onChange={e => setVerificationAnswer(e.target.value)}
                                        placeholder="?"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-red-400 text-sm font-medium">{error}</p>
                            </div>
                        )}
                        {successMsg && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-emerald-400 text-sm font-medium">{successMsg}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setView('login')}
                                className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-bold text-slate-300 transition-all hover:text-white"
                            >
                                {tDashboard.cancel}
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl font-bold text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {tAuth.changePassBtn}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // 3. REGISTER VIEW
    if (view === 'register') {
        return (
            <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 py-8 overflow-y-auto custom-scrollbar" dir={dir}>
                <div className="w-full max-w-lg bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative z-10 animate-fade-in my-4 max-h-[90vh] overflow-y-auto custom-scrollbar">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <div className="relative w-20 h-20 bg-[#0f172a] rounded-full overflow-hidden border border-white/10 flex items-center justify-center shadow-xl">
                                <img
                                    src={regForm.role === 'mother' ? import.meta.env.BASE_URL + 'images/mother_icon.png' : import.meta.env.BASE_URL + 'images/father_icon.png'}
                                    alt={regForm.role === 'mother' ? 'Mother' : 'Father'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">{tAuth.registerTitle}</h1>
                        <p className="text-slate-400 text-sm">{t.landing.createAccount}</p>
                    </div>

                    <form onSubmit={handleParentRegister} className="space-y-6">

                        {/* Input Fields Group */}
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div className="group relative">
                                {dir !== 'rtl' && (
                                    <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                )}
                                <input
                                    type="text"
                                    placeholder={tAuth.fullName}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-black/30 outline-none transition-all`}
                                    value={regForm.fullName}
                                    onChange={e => setRegForm({ ...regForm, fullName: e.target.value })}
                                />
                                {dir === 'rtl' && (
                                    <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10">
                                        <UserIcon className="w-5 h-5" />
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <div className={`absolute top-3.5 ${dir === 'rtl' ? 'right-4' : 'left-4'} text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10 hidden`}>
                                    {/* Hidden because logic handled below for RTL/LTR specific positioning if needed, but simplified approach: */}
                                </div>
                                {dir !== 'rtl' && <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10"><MailIcon className="w-5 h-5" /></div>}
                                <input
                                    type="email"
                                    placeholder={tAuth.email}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-black/30 outline-none transition-all`}
                                    value={regForm.email}
                                    onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                                />
                                {dir === 'rtl' && <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10"><MailIcon className="w-5 h-5" /></div>}
                            </div>

                            {/* Password */}
                            <div className="group relative">
                                {dir !== 'rtl' && <div className="absolute top-3.5 left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10"><LockIcon className="w-5 h-5" /></div>}
                                <input
                                    type="password"
                                    placeholder={tAuth.password}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3.5 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-black/30 outline-none transition-all`}
                                    value={regForm.password}
                                    onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                                />
                                {dir === 'rtl' && <div className="absolute top-3.5 right-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none z-10"><LockIcon className="w-5 h-5" /></div>}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setRegForm({ ...regForm, role: 'father' })}
                                className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 group overflow-hidden ${regForm.role === 'father' ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                            >
                                <div className={`w-16 h-16 rounded-full overflow-hidden ${regForm.role === 'father' ? 'ring-2 ring-indigo-500' : 'opacity-70 group-hover:opacity-100'} transition-all`}>
                                    <img
                                        src={import.meta.env.BASE_URL + 'images/father_icon.png'}
                                        alt="Father"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className={`text-sm font-bold ${regForm.role === 'father' ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{tDashboard.father || 'Father'}</span>
                                {regForm.role === 'father' && <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,1)]"></div>}
                            </button>

                            <button
                                type="button"
                                onClick={() => setRegForm({ ...regForm, role: 'mother' })}
                                className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 group overflow-hidden ${regForm.role === 'mother' ? 'bg-pink-600/20 border-pink-500 shadow-[0_0_20px_rgba(219,39,119,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                            >
                                <div className={`w-16 h-16 rounded-full overflow-hidden ${regForm.role === 'mother' ? 'ring-2 ring-pink-500' : 'opacity-70 group-hover:opacity-100'} transition-all`}>
                                    <img
                                        src={import.meta.env.BASE_URL + 'images/mother_icon.png'}
                                        alt="Mother"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className={`text-sm font-bold ${regForm.role === 'mother' ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{tDashboard.mother || 'Mother'}</span>
                                {regForm.role === 'mother' && <div className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(219,39,119,1)]"></div>}
                            </button>
                        </div>

                        {/* Security Question */}
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <ShieldIcon className="w-24 h-24 text-amber-500" />
                            </div>
                            <div className="relative z-10">
                                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 block flex items-center gap-2">
                                    <ShieldIcon className="w-4 h-4" />
                                    {tAuth.securityQuestion}
                                </label>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-white font-mono">{verificationProblem.q} = </span>
                                    <input
                                        type="number"
                                        className="w-24 bg-black/20 border-b-2 border-amber-500/50 text-center font-bold text-xl text-white outline-none focus:border-amber-500 transition-colors py-1"
                                        value={verificationAnswer}
                                        onChange={e => setVerificationAnswer(e.target.value)}
                                        placeholder="?"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-red-400 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onExit}
                                className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-bold text-slate-300 transition-all hover:text-white"
                            >
                                {tDashboard.cancel}
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {tAuth.registerBtn}
                            </button>
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
                            <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 shadow-lg ${parentData.role === 'mother' ? 'bg-pink-600' : 'bg-indigo-600'}`}>
                                <img
                                    src={parentData.role === 'mother' ? import.meta.env.BASE_URL + 'images/mother_icon.png' : import.meta.env.BASE_URL + 'images/father_icon.png'}
                                    alt={parentData.role === 'mother' ? 'Mother' : 'Father'}
                                    className="w-full h-full object-cover"
                                />
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
                            <button onClick={handleLogout} className="px-5 py-2.5 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-300 rounded-xl transition-colors text-sm">
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
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10 bg-black/20">
                                                <img
                                                    src={child.gender === 'girl' ? import.meta.env.BASE_URL + 'images/girl_avatar.png' : import.meta.env.BASE_URL + 'images/boy_avatar.png'}
                                                    alt={child.name}
                                                    className="w-full h-full object-cover"
                                                />
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
                                                <AnalyticsIcon className="w-4 h-4" />
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
                                                className="py-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 text-white/60"
                                                title={tDashboard.delete}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-3">
                                            <select
                                                className="w-full bg-black/20 border border-white/10 rounded-xl p-2 text-xs text-white"
                                                value={reportRange}
                                                onChange={(e) => setReportRange(e.target.value as any)}
                                            >
                                                <option value="daily">{currentLang === 'ar' ? 'تقرير يومي' : currentLang === 'fr' ? 'Quotidien' : 'Daily'}</option>
                                                <option value="weekly">{currentLang === 'ar' ? 'تقرير أسبوعي' : currentLang === 'fr' ? 'Hebdomadaire' : 'Weekly'}</option>
                                                <option value="monthly">{currentLang === 'ar' ? 'تقرير شهري' : currentLang === 'fr' ? 'Mensuel' : 'Monthly'}</option>
                                            </select>
                                            <button
                                                onClick={() => handleDownloadReport(child)}
                                                className="w-full py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 rounded-xl text-xs font-bold text-white shadow"
                                            >
                                                {currentLang === 'ar' ? 'تنزيل التقرير' : currentLang === 'fr' ? 'Télécharger' : 'Download'}
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
                            <ArrowIcon className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    // Add/Edit Child View (Updated PIN Validation)
    if (view === 'add_child' || view === 'edit_child') {
        const isEdit = view === 'edit_child';
        const locked = !parentData;
        return (
            <div className="min-h-screen w-full bg-[#0f172a] text-white font-cairo flex items-center justify-center p-4 overflow-y-auto custom-scrollbar" dir={dir}>
                <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-xl font-bold mb-6 text-center">
                        {isEdit ? tDashboard.editChild : tDashboard.addChild}
                    </h2>
                    {locked && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm text-center">
                            {mustBeLoggedMessage}
                        </div>
                    )}
                    <form onSubmit={handleSaveChild} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-white/60">{tDashboard.childName}</label>
                            <input
                                type="text" value={childForm.name} onChange={e => setChildForm({ ...childForm, name: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500 disabled:opacity-50"
                                required
                                disabled={locked}
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-xs text-white/60">{tDashboard.childAge}</label>
                                <input
                                    type="number" value={childForm.age} onChange={e => setChildForm({ ...childForm, age: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500 disabled:opacity-50"
                                    required
                                    disabled={locked}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-xs text-white/60">{tDashboard.childGender}</label>
                                <div className="flex bg-black/20 rounded-xl p-1 gap-1">
                                    <button type="button" disabled={locked} onClick={() => setChildForm({ ...childForm, gender: 'boy' })} className={`flex-1 rounded-lg py-2 text-xs font-bold flex flex-col items-center gap-1 transition-all ${childForm.gender === 'boy' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/50 hover:bg-white/5'} ${locked ? 'opacity-50' : ''}`}>
                                        <img src={import.meta.env.BASE_URL + 'images/boy_avatar.png'} className="w-8 h-8 rounded-full object-cover" />
                                        {tDashboard.boy}
                                    </button>
                                    <button type="button" disabled={locked} onClick={() => setChildForm({ ...childForm, gender: 'girl' })} className={`flex-1 rounded-lg py-2 text-xs font-bold flex flex-col items-center gap-1 transition-all ${childForm.gender === 'girl' ? 'bg-pink-600 text-white shadow-lg' : 'text-white/50 hover:bg-white/5'} ${locked ? 'opacity-50' : ''}`}>
                                        <img src={import.meta.env.BASE_URL + 'images/girl_avatar.png'} className="w-8 h-8 rounded-full object-cover" />
                                        {tDashboard.girl}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-emerald-400 font-bold">{tDashboard.pinCode}</label>
                                <div className="relative">
                                    <LockIcon className={`absolute top-3.5 w-4 h-4 text-white/30 ${dir === 'rtl' ? 'left-3' : 'right-3'}`} />
                                    <input
                                        type="tel" maxLength={4} value={childForm.pin} onChange={e => setChildForm({ ...childForm, pin: e.target.value.replace(/[^0-9]/g, '') })}
                                        className={`w-full bg-black/20 border border-emerald-500/30 rounded-xl p-3 text-white outline-none focus:border-emerald-500 font-mono tracking-widest text-center text-lg ${dir === 'rtl' ? 'pl-10' : 'pr-10'} disabled:opacity-50`}
                                        placeholder="****"
                                        required
                                        disabled={locked}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-emerald-400 font-bold">{tDashboard.confirmPin}</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        maxLength={4}
                                        value={childForm.confirmPin}
                                        onChange={e => setChildForm({ ...childForm, confirmPin: e.target.value.replace(/[^0-9]/g, '') })}
                                        className={`w-full bg-black/20 border rounded-xl p-3 text-white outline-none font-mono tracking-widest text-center text-lg disabled:opacity-50 ${childForm.confirmPin && childForm.pin !== childForm.confirmPin ? 'border-red-500/50 focus:border-red-500' : 'border-emerald-500/30 focus:border-emerald-500'}`}
                                        placeholder="****"
                                        required
                                        disabled={locked}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-xs text-center font-bold bg-red-500/10 p-2 rounded">{error}</p>}

                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => { setView('dashboard'); setSelectedChildId(null); }} className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold">{tDashboard.cancel}</button>
                            <button type="submit" disabled={locked} className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">{tDashboard.save}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Report View - Enhanced
    if (view === 'child_report') {
        const child = getSelectedChild();
        if (!child) return null;

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
                                        <img src={child.gender === 'girl' ? import.meta.env.BASE_URL + 'images/girl_avatar.png' : import.meta.env.BASE_URL + 'images/boy_avatar.png'} className="w-6 h-6 rounded-full object-cover" />
                                        {child.gender === 'boy' ? tDashboard.boy : tDashboard.girl}
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
                            <div className="bg-[#1e293b]/40 border border-white/10 rounded-3xl p-6 relative overflow-hidden min-h-[320px] flex flex-col animate-fade-in-up hover:border-indigo-500/30 transition-all" style={{ animationDelay: '0.1s' }}>
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
                                    {t.dashboard.emotionalIQ}
                                </p>
                            </div>

                            {/* 2. Psychological State */}
                            <div className="bg-[#1e293b]/40 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[320px] animate-fade-in-up hover:border-emerald-500/30 transition-all" style={{ animationDelay: '0.2s' }}>
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
                                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, child.stats.topicsLearned.length * 10 + 20)}%` }}></div>
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
                                                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, child.stats.totalMessages + 10)}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Activity Summary */}
                            <div className="bg-[#1e293b]/40 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[320px] animate-fade-in-up hover:border-amber-500/30 transition-all" style={{ animationDelay: '0.3s' }}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                                <h2 className="text-lg font-bold text-white/80 mb-6 flex items-center gap-2">
                                    <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><AnalyticsIcon className="w-6 h-6" /></div>
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
                                        <span>{t.totalInteractions}</span>
                                        <span className="text-white/70 font-mono">{child.stats.totalMessages}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-white/40">
                                        <span>{t.lastActive}</span>
                                        <span className="text-white/70 font-mono">{new Date(child.stats.lastActive).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed History Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

                            {/* Topics List */}
                            <div className="bg-[#1e293b]/30 border border-white/10 rounded-3xl p-6 min-h-[300px]">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="p-2 bg-teal-500/10 rounded-lg text-teal-400 border border-teal-500/20"><AnalyticsIcon className="w-5 h-5" /></span>
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
                                                <AnalyticsIcon className="w-6 h-6 opacity-50" />
                                            </div>
                                            <p className="text-sm italic">{t.noTopics}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Emotion Timeline */}
                            <div className="bg-[#1e293b]/30 border border-white/10 rounded-3xl p-6 min-h-[300px]">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20"><BrainIcon className="w-5 h-5" /></span>
                                    {tDashboard.emotionalIQ}
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
                                            <p className="text-sm italic">{t.noEmotions}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Activity & Advice Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <ActivityTimeline logs={child.activityLog || []} currentLang={currentLang} />
                            <ParentalAdviceSection child={child} currentLang={currentLang} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
