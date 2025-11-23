
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { ArchIcon } from './icons/ArchIcon';
import { searchBooks, getBooksBySubject, Book, getCoverUrl } from '../services/openLibraryService';
import { ArrowIcon } from './LandingPage'; // Reusing ArrowIcon for Back button

interface AndalusModalProps {
  onClose: () => void;
  currentLang: Language;
}

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const AndalusModal: React.FC<AndalusModalProps> = ({ onClose, currentLang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('stories');
  const [readingBook, setReadingBook] = useState<Book | null>(null);

  const t = translations[currentLang].ui;
  const dir = translations[currentLang].direction;

  const categories = [
      { id: 'stories', label: t.catStories, subject: 'children_stories' },
      { id: 'animals', label: t.catAnimals, subject: 'animals' },
      { id: 'science', label: t.catScience, subject: 'science' },
      { id: 'history', label: t.catHistory, subject: 'history' },
      { id: 'adventure', label: t.catAdventure, subject: 'adventure_stories' },
  ];

  // Initial Fetch
  useEffect(() => {
      fetchCategory(categories[0].subject);
  }, []);

  const fetchCategory = async (subject: string) => {
      setLoading(true);
      const results = await getBooksBySubject(subject);
      setBooks(results);
      setLoading(false);
  };

  const handleSearch = async () => {
      if (!searchQuery.trim()) return;
      setLoading(true);
      setActiveCategory('search');
      const results = await searchBooks(searchQuery);
      setBooks(results);
      setLoading(false);
  };

  const handleCategoryClick = (catId: string, subject: string) => {
      setActiveCategory(catId);
      setSearchQuery('');
      fetchCategory(subject);
  };

  const handleReadBook = (book: Book) => {
      // Check if the book has an Internet Archive identifier for embedding
      if (book.ia && book.ia.length > 0) {
          setReadingBook(book);
      } else {
          // Fallback for books without IA ID
          window.open(`https://openlibrary.org${book.key}`, '_blank');
      }
  };

  const renderReader = () => {
      if (!readingBook || !readingBook.ia) return null;
      
      // Construct Archive.org Embed URL
      // ui=embed removes the header/footer of archive.org
      const embedUrl = `https://archive.org/embed/${readingBook.ia[0]}?ui=embed`;

      return (
          <div className="flex flex-col h-full animate-fade-in bg-[#1e1e1e]">
              {/* Reader Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#2c2c2c]">
                  <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setReadingBook(null)}
                        className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                          <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                      </button>
                      <div>
                          <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">{readingBook.title}</h3>
                          <p className="text-white/40 text-xs hidden md:block">{t.readBook}</p>
                      </div>
                  </div>
              </div>
              
              {/* Iframe Reader */}
              <div className="flex-grow relative w-full h-full bg-black">
                  <iframe 
                      src={embedUrl}
                      className="absolute inset-0 w-full h-full border-none"
                      allowFullScreen={true}
                      title={readingBook.title}
                  ></iframe>
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
             {/* Reader Mode */}
             {readingBook ? (
                 renderReader()
             ) : (
                 <>
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

                    {/* Header */}
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

                    {/* Search & Categories */}
                    <div className="p-4 border-b border-white/10 bg-black/20 shrink-0 flex flex-col gap-4 relative z-10">
                        {/* Search */}
                        <div className="relative w-full">
                            <div className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} pointer-events-none text-white/40`}>
                                <SearchIcon className="w-5 h-5" />
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder={t.searchBooks} 
                                className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-all
                                    ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}
                                `}
                            />
                        </div>

                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id, cat.subject)}
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

                    {/* Content Grid */}
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-[#0f172a] relative z-10">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {books.map((book, idx) => (
                                    <div key={book.key + idx} className="group flex flex-col gap-3">
                                        {/* Book Cover */}
                                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5 group-hover:border-amber-500/50 transition-all duration-300 group-hover:-translate-y-1">
                                            {book.cover_i ? (
                                                <img 
                                                    src={getCoverUrl(book.cover_i, 'M')} 
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 text-white/30 bg-white/5">
                                                    <ArchIcon className="w-12 h-12 mb-2 opacity-50" />
                                                    <span className="text-xs font-bold line-clamp-3">{book.title}</span>
                                                </div>
                                            )}
                                            
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                                <button 
                                                    onClick={() => handleReadBook(book)}
                                                    className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                                >
                                                    {t.readBook}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Book Info */}
                                        <div>
                                            <h3 className="text-white font-bold text-sm line-clamp-2 leading-snug mb-1 group-hover:text-amber-400 transition-colors">
                                                {book.title}
                                            </h3>
                                            <p className="text-white/40 text-xs line-clamp-1">
                                                {book.author_name ? book.author_name[0] : 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!loading && books.length === 0 && (
                            <div className="text-center py-20 text-white/30">
                                {t.noResults}
                            </div>
                        )}
                    </div>
                 </>
             )}

        </div>
        <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};
