import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { ArchIcon } from './icons/ArchIcon';
import { ArrowIcon } from './LandingPage';

interface AndalusModalProps {
    onClose: () => void;
    currentLang: Language;
}

interface LocalBook {
    id: string;
    title: { ar: string; en: string; fr: string };
    author: { ar: string; en: string; fr: string };
    cover: string;
    pdfUrl: string;
    category: string;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        <path d="M5 3v4"></path>
        <path d="M19 17v4"></path>
        <path d="M3 5h4"></path>
        <path d="M17 19h4"></path>
    </svg>
);

export const AndalusModal: React.FC<AndalusModalProps> = ({ onClose, currentLang }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('religious');
    const [readingBook, setReadingBook] = useState<LocalBook | null>(null);
    const [showAIChat, setShowAIChat] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
    const [chatInput, setChatInput] = useState('');
    const [loadingChat, setLoadingChat] = useState(false);

    const t = translations[currentLang].ui;
    const dir = translations[currentLang].direction;

    const localBooks: LocalBook[] = [
        {
            id: 'hisn-al-muslim',
            title: {
                ar: 'حصن المسلم من أذكار الكتاب والسنة',
                en: 'Fortress of the Muslim',
                fr: 'La Forteresse du Musulman'
            },
            author: {
                ar: 'سعيد بن علي بن وهف القحطاني',
                en: 'Said bin Ali bin Wahf Al-Qahtani',
                fr: 'Said bin Ali bin Wahf Al-Qahtani'
            },
            cover: 'books/first-book/100.png',
            pdfUrl: 'https://islamcontent.com/storage/contents/9295/ar_Hisn_Almuslim.pdf',
            category: 'religious'
        },
        {
            id: 'forty-nawawi',
            title: {
                ar: 'الأربعون النووية',
                en: 'Forty Nawawi Hadith',
                fr: 'Les Quarante Hadiths de Nawawi'
            },
            author: {
                ar: 'الإمام النووي',
                en: 'Imam An-Nawawi',
                fr: 'Imam An-Nawawi'
            },
            cover: 'books/first-book/2.jpg',
            pdfUrl: 'https://d1.islamhouse.com/data/ar/ih_books/parts/Forty_Nawawi_Hadith/ar_Forty_Nawawi_Hadith_Dar_Alsalam.pdf',
            category: 'religious'
        },
        {
            id: 'journey-doubt-faith',
            title: {
                ar: 'رحلتي من الشك إلى الإيمان',
                en: 'My Journey from Doubt to Faith',
                fr: 'Mon voyage du doute à la foi'
            },
            author: {
                ar: 'د. مصطفى محمود',
                en: 'Dr. Mustafa Mahmoud',
                fr: 'Dr. Mustafa Mahmoud'
            },
            cover: 'books/first-book/45.webp',
            pdfUrl: 'https://archive.org/download/20230524_20230524_1845/%D8%B1%D8%AD%D9%84%D8%AA%D9%8A%20%D9%85%D9%86%20%D8%A7%D9%84%D8%B4%D9%83%20%D8%A5%D9%84%D9%89%20%D8%A7%D9%84%D8%A7%D9%8A%D9%85%D8%A7%D9%86%20%D9%85%D8%B5%D8%B7%D9%81%D9%89%20%D9%85%D8%AD%D9%85%D9%88%D8%AF.pdf',
            category: 'religious'
        },
        {
            id: 'animal-world',
            title: {
                ar: 'عالم الحيوان',
                en: 'Animal World',
                fr: 'Le Monde des Animaux'
            },
            author: {
                ar: 'زهراء مسلم حسن',
                en: 'Zahraa Muslim Hassan',
                fr: 'Zahraa Muslim Hassan'
            },
            cover: 'books/first-book/46.webp',
            pdfUrl: 'https://www.kotobati.com/book/reading/7f015fc6-f881-4fab-9781-fedb47748cd4',
            category: 'animals'
        }
    ];

    const categories = [
        { id: 'stories', label: t.catStories },
        { id: 'religious', label: t.catReligious },
        { id: 'animals', label: t.catAnimals },
        { id: 'science', label: t.catScience },
        { id: 'history', label: t.catHistory },
        { id: 'adventure', label: t.catAdventure },
    ];

    const filteredBooks = localBooks.filter(book => book.category === activeCategory);

    const handleDownload = () => {
        if (!readingBook) return;
        // فتح الرابط في تبويب جديد للتحميل
        window.open(readingBook.pdfUrl, '_blank');
    };

    const handleChatWithBook = () => {
        setShowAIChat(true);
        if (chatMessages.length === 0) {
            const welcomeMessages = {
                ar: 'مرحباً! أنا مساعدك الذكي لفهم كتاب حصن المسلم. يمكنك أن تسألني عن أي شيء في الكتاب، مثل:\n• ما هي أذكار الصباح؟\n• كيف أحفظ نفسي قبل النوم؟\n• ماذا أقول عند دخول المسجد؟',
                en: 'Hello! I\'m your smart assistant for understanding Fortress of the Muslim. You can ask me anything about the book!',
                fr: 'Bonjour! Je suis votre assistant intelligent pour comprendre La Forteresse du Musulman!'
            };
            setChatMessages([{ role: 'assistant', content: welcomeMessages[currentLang] }]);
        }
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim() || loadingChat) return;

        const userMessage = chatInput.trim();
        setChatInput('');
        setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoadingChat(true);

        setTimeout(() => {
            let response = '';
            const lowerMsg = userMessage.toLowerCase();

            if (currentLang === 'ar') {
                if (lowerMsg.includes('صباح') || lowerMsg.includes('الصباح')) {
                    response = 'أذكار الصباح من كتاب حصن المسلم:\n\n• آية الكرسي\n• المعوذات الثلاث (الإخلاص، الفلق، الناس)\n• "أصبحنا وأصبح الملك لله"\n• "اللهم بك أصبحنا وبك أمسينا"\n\nيُستحب قراءتها بعد صلاة الفجر.';
                } else if (lowerMsg.includes('نوم') || lowerMsg.includes('النوم') || lowerMsg.includes('أنام')) {
                    response = 'أذكار النوم من كتاب حصن المسلم:\n\n• آية الكرسي\n• المعوذتين (الفلق والناس)\n• "باسمك اللهم أموت وأحيا"\n• "اللهم أسلمت نفسي إليك"\n\nهذه الأذكار تحفظك بإذن الله.';
                } else if (lowerMsg.includes('مسجد') || lowerMsg.includes('المسجد')) {
                    response = 'عند دخول المسجد قل:\n"اللهم افتح لي أبواب رحمتك"\n\nوعند الخروج قل:\n"اللهم إني أسألك من فضلك"';
                } else if (lowerMsg.includes('صفحة') || lowerMsg.includes('فقرة') || lowerMsg.includes('اشرح')) {
                    response = 'يمكنني مساعدتك في فهم أي جزء من الكتاب!\n\nحاول أن تسألني عن:\n• موضوع معين (مثل: أذكار الصباح)\n• دعاء معين (مثل: دعاء السفر)\n• موقف معين (مثل: ماذا أقول عند المطر)\n\nما الذي تريد أن تعرفه بالتحديد؟';
                } else if (lowerMsg.includes('سفر') || lowerMsg.includes('السفر')) {
                    response = 'دعاء السفر:\n"سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون"';
                } else if (lowerMsg.includes('طعام') || lowerMsg.includes('الطعام') || lowerMsg.includes('آكل')) {
                    response = 'قبل الطعام قل: "بسم الله"\nوبعد الطعام قل: "الحمد لله الذي أطعمنا وسقانا وجعلنا مسلمين"';
                } else {
                    response = `شكراً على سؤالك! 😊\n\nكتاب حصن المسلم يحتوي على أذكار وأدعية كثيرة. يمكنك أن تسألني عن:\n\n• أذكار الصباح والمساء\n• أذكار النوم والاستيقاظ\n• أدعية الطعام والشراب\n• أذكار دخول المسجد\n• دعاء السفر\n• وغيرها الكثير!\n\nما الذي تريد أن تعرفه؟`;
                }
            } else if (currentLang === 'en') {
                if (lowerMsg.includes('morning')) {
                    response = 'Morning remembrances from Fortress of the Muslim:\n\n• Ayat al-Kursi\n• The three protective chapters\n• "We have reached morning and the dominion belongs to Allah"\n\nRecite them after Fajr prayer.';
                } else if (lowerMsg.includes('sleep') || lowerMsg.includes('night')) {
                    response = 'Before sleeping, recite:\n\n• Ayat al-Kursi\n• The protective verses\n• "In Your name, O Allah, I die and I live"';
                } else if (lowerMsg.includes('page') || lowerMsg.includes('explain')) {
                    response = 'I can help you understand any part of the book!\n\nTry asking me about:\n• A specific topic (e.g., morning remembrances)\n• A specific supplication\n• A specific situation\n\nWhat would you like to know?';
                } else {
                    response = 'Thank you for your question! 😊\n\nFortress of the Muslim contains many remembrances and supplications. You can ask me about:\n\n• Morning and evening remembrances\n• Sleep and waking supplications\n• Food and drink prayers\n• And much more!\n\nWhat would you like to know?';
                }
            } else {
                if (lowerMsg.includes('matin')) {
                    response = 'Invocations du matin:\n\n• Ayat al-Kursi\n• Les chapitres protecteurs\n\nRécitez-les après la prière de Fajr.';
                } else if (lowerMsg.includes('page') || lowerMsg.includes('expliquer')) {
                    response = 'Je peux vous aider à comprendre n\'importe quelle partie du livre!\n\nEssayez de me poser des questions sur un sujet spécifique.\n\nQue voulez-vous savoir?';
                } else {
                    response = 'Merci pour votre question! 😊\n\nLa Forteresse du Musulman contient de nombreuses invocations. Vous pouvez me poser des questions!\n\nQue voulez-vous savoir?';
                }
            }

            setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setLoadingChat(false);
        }, 1500);
    };

    const renderReader = () => {
        if (!readingBook) return null;

        return (
            <div className="flex flex-col h-full animate-fade-in bg-[#1e1e1e]">
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#2c2c2c]">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setReadingBook(null);
                                setShowAIChat(false);
                                setChatMessages([]);
                            }}
                            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </button>
                        <div>
                            <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">{readingBook.title[currentLang]}</h3>
                            <p className="text-white/40 text-xs hidden md:block">{readingBook.author[currentLang]}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleChatWithBook}
                            className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 text-xs rounded-full transition-colors border border-purple-500/30"
                        >
                            <SparklesIcon className="w-4 h-4" />
                            <span className="hidden md:inline">{currentLang === 'ar' ? 'تحدث مع الكتاب' : currentLang === 'fr' ? 'Parler' : 'Chat'}</span>
                        </button>
                    </div>
                </div>

                <div className="flex-grow relative w-full h-full bg-black flex">
                    <div className={`${showAIChat ? 'w-2/3' : 'w-full'} h-full transition-all duration-300`}>
                        <iframe
                            src={readingBook.pdfUrl}
                            className="w-full h-full border-none"
                            title={readingBook.title[currentLang]}
                        ></iframe>
                    </div>

                    {showAIChat && (
                        <div className="w-1/3 h-full bg-[#1a1a1a] border-l border-white/10 flex flex-col animate-slide-in">
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <SparklesIcon className="w-5 h-5 text-purple-400" />
                                        <h3 className="text-white font-bold text-sm">{currentLang === 'ar' ? 'محادثة ذكية' : currentLang === 'fr' ? 'Chat' : 'Smart Chat'}</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowAIChat(false)}
                                        className="text-white/50 hover:text-white transition-colors"
                                    >
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
                                {chatMessages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded-xl p-3 ${msg.role === 'user'
                                            ? 'bg-purple-600/20 text-white border border-purple-500/30'
                                            : 'bg-white/5 text-white/90 border border-white/10'
                                            }`}>
                                            <p className="text-xs leading-relaxed whitespace-pre-line" dir={dir}>{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {loadingChat && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-white/10 flex-shrink-0">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                                                const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
                                                const recognition = new SpeechRecognition();
                                                recognition.lang = currentLang === 'ar' ? 'ar-SA' : currentLang === 'fr' ? 'fr-FR' : 'en-US';
                                                recognition.continuous = false;
                                                recognition.interimResults = false;

                                                recognition.onstart = () => {
                                                    setChatInput(currentLang === 'ar' ? '🎤 جاري الاستماع...' : currentLang === 'fr' ? '🎤 Écoute...' : '🎤 Listening...');
                                                };

                                                recognition.onresult = (event: any) => {
                                                    const transcript = event.results[0][0].transcript;
                                                    setChatInput(transcript);
                                                    // إرسال الرسالة تلقائياً
                                                    setTimeout(() => {
                                                        if (transcript.trim()) {
                                                            setChatMessages(prev => [...prev, { role: 'user', content: transcript }]);
                                                            setLoadingChat(true);
                                                            setChatInput('');

                                                            setTimeout(() => {
                                                                let response = '';
                                                                const lowerMsg = transcript.toLowerCase();

                                                                if (currentLang === 'ar') {
                                                                    if (lowerMsg.includes('صباح') || lowerMsg.includes('الصباح')) {
                                                                        response = 'أذكار الصباح من كتاب حصن المسلم:\n\n• آية الكرسي\n• المعوذات الثلاث (الإخلاص، الفلق، الناس)\n• "أصبحنا وأصبح الملك لله"\n• "اللهم بك أصبحنا وبك أمسينا"\n\nيُستحب قراءتها بعد صلاة الفجر.';
                                                                    } else if (lowerMsg.includes('نوم') || lowerMsg.includes('النوم') || lowerMsg.includes('أنام')) {
                                                                        response = 'أذكار النوم من كتاب حصن المسلم:\n\n• آية الكرسي\n• المعوذتين (الفلق والناس)\n• "باسمك اللهم أموت وأحيا"\n• "اللهم أسلمت نفسي إليك"\n\nهذه الأذكار تحفظك بإذن الله.';
                                                                    } else if (lowerMsg.includes('مسجد') || lowerMsg.includes('المسجد')) {
                                                                        response = 'عند دخول المسجد قل:\n"اللهم افتح لي أبواب رحمتك"\n\nوعند الخروج قل:\n"اللهم إني أسألك من فضلك"';
                                                                    } else if (lowerMsg.includes('صفحة') || lowerMsg.includes('فقرة') || lowerMsg.includes('اشرح')) {
                                                                        response = 'يمكنني مساعدتك في فهم أي جزء من الكتاب!\n\nحاول أن تسألني عن:\n• موضوع معين (مثل: أذكار الصباح)\n• دعاء معين (مثل: دعاء السفر)\n• موقف معين (مثل: ماذا أقول عند المطر)\n\nما الذي تريد أن تعرفه بالتحديد؟';
                                                                    } else if (lowerMsg.includes('سفر') || lowerMsg.includes('السفر')) {
                                                                        response = 'دعاء السفر:\n"سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون"';
                                                                    } else if (lowerMsg.includes('طعام') || lowerMsg.includes('الطعام') || lowerMsg.includes('آكل')) {
                                                                        response = 'قبل الطعام قل: "بسم الله"\nوبعد الطعام قل: "الحمد لله الذي أطعمنا وسقانا وجعلنا مسلمين"';
                                                                    } else {
                                                                        response = `شكراً على سؤالك! 😊\n\nكتاب حصن المسلم يحتوي على أذكار وأدعية كثيرة. يمكنك أن تسألني عن:\n\n• أذكار الصباح والمساء\n• أذكار النوم والاستيقاظ\n• أدعية الطعام والشراب\n• أذكار دخول المسجد\n• دعاء السفر\n• وغيرها الكثير!\n\nما الذي تريد أن تعرفه؟`;
                                                                    }
                                                                } else if (currentLang === 'en') {
                                                                    if (lowerMsg.includes('morning')) {
                                                                        response = 'Morning remembrances from Fortress of the Muslim:\n\n• Ayat al-Kursi\n• The three protective chapters\n• "We have reached morning and the dominion belongs to Allah"\n\nRecite them after Fajr prayer.';
                                                                    } else if (lowerMsg.includes('sleep') || lowerMsg.includes('night')) {
                                                                        response = 'Before sleeping, recite:\n\n• Ayat al-Kursi\n• The protective verses\n• "In Your name, O Allah, I die and I live"';
                                                                    } else if (lowerMsg.includes('page') || lowerMsg.includes('explain')) {
                                                                        response = 'I can help you understand any part of the book!\n\nTry asking me about:\n• A specific topic (e.g., morning remembrances)\n• A specific supplication\n• A specific situation\n\nWhat would you like to know?';
                                                                    } else {
                                                                        response = 'Thank you for your question! 😊\n\nFortress of the Muslim contains many remembrances and supplications. You can ask me about:\n\n• Morning and evening remembrances\n• Sleep and waking supplications\n• Food and drink prayers\n• And much more!\n\nWhat would you like to know?';
                                                                    }
                                                                } else {
                                                                    if (lowerMsg.includes('matin')) {
                                                                        response = 'Invocations du matin:\n\n• Ayat al-Kursi\n• Les chapitres protecteurs\n\nRécitez-les après la prière de Fajr.';
                                                                    } else if (lowerMsg.includes('page') || lowerMsg.includes('expliquer')) {
                                                                        response = 'Je peux vous aider à comprendre n\'importe quelle partie du livre!\n\nEssayez de me poser des questions sur un sujet spécifique.\n\nQue voulez-vous savoir?';
                                                                    } else {
                                                                        response = 'Merci pour votre question! 😊\n\nLa Forteresse du Musulman contient de nombreuses invocations. Vous pouvez me poser des questions!\n\nQue voulez-vous savoir?';
                                                                    }
                                                                }

                                                                setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
                                                                setLoadingChat(false);
                                                            }, 1500);
                                                        }
                                                    }, 100);
                                                };

                                                recognition.onerror = (event: any) => {
                                                    setChatInput('');
                                                    console.error('Speech recognition error:', event.error);
                                                };

                                                recognition.start();
                                            } else {
                                                alert(currentLang === 'ar' ? 'المتصفح لا يدعم التعرف على الصوت' : 'Voice recognition not supported');
                                            }
                                        }}
                                        className="p-2 bg-white/5 hover:bg-white/10 text-purple-400 hover:text-purple-300 rounded-xl transition-colors border border-white/10"
                                        title={currentLang === 'ar' ? 'تحدث بالصوت' : currentLang === 'fr' ? 'Parler' : 'Voice input'}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                            <line x1="12" y1="19" x2="12" y2="22"></line>
                                        </svg>
                                    </button>
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && !loadingChat && handleSendMessage()}
                                        placeholder={currentLang === 'ar' ? 'اسأل عن الكتاب...' : currentLang === 'fr' ? 'Posez une question...' : 'Ask about the book...'}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-purple-500/50"
                                        dir={dir}
                                        disabled={loadingChat}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!chatInput.trim() || loadingChat}
                                        className="p-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/30 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            dir={dir}
        >
            <div
                className="bg-[#0f172a] border border-amber-500/30 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {readingBook ? (
                    renderReader()
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

                        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-amber-900/20 to-transparent shrink-0 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                                    <ArchIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white font-cairo">{t.andalusLibrary}</h2>
                                    <p className="text-xs text-amber-400/60 font-amiri">{t.worldKidsLibrary}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-4 border-b border-white/10 bg-black/20 shrink-0 flex flex-col gap-4 relative z-10">
                            <div className="relative w-full">
                                <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                                    <SearchIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t.searchBooks}
                                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all
                                    ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                                `}
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                                        ${activeCategory === cat.id
                                                ? 'bg-amber-600 text-white border-amber-600'
                                                : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-[#0f172a] relative z-10">
                            {filteredBooks.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {filteredBooks.map((book) => (
                                        <div key={book.id} className="group flex flex-col gap-3">
                                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5 group-hover:border-amber-500/50 transition-all duration-300 group-hover:-translate-y-1">
                                                <img
                                                    src={import.meta.env.BASE_URL + book.cover}
                                                    alt={book.title[currentLang]}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />

                                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                                    <button
                                                        onClick={() => setReadingBook(book)}
                                                        className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                                    >
                                                        {t.readBook}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-white font-bold text-sm line-clamp-2 leading-snug mb-1 group-hover:text-amber-400 transition-colors">
                                                    {book.title[currentLang]}
                                                </h3>
                                                <p className="text-white/40 text-xs line-clamp-1">
                                                    {book.author[currentLang]}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center text-white/30">
                                        <ArchIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                        <p>{t.noResults}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>
            <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
        `}</style>
        </div>
    );
};
