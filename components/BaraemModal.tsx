
import React, { useState } from 'react';
import { Language, translations } from '../utils/translations';
import { XIcon } from './icons/XIcon';
import { VideoIcon } from './icons/VideoIcon';
import { PlayIcon } from './icons/PlayIcon';
import { baraemVideos, BaraemVideo } from '../utils/baraemData';

interface BaraemModalProps {
  onClose: () => void;
  currentLang: Language;
  onPlayVideo?: () => void;
}

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
    </svg>
);

export const BaraemModal: React.FC<BaraemModalProps> = ({ onClose, currentLang, onPlayVideo }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentVideo, setCurrentVideo] = useState<BaraemVideo | null>(null);

  const t = translations[currentLang].ui;
  const categories = translations[currentLang].ui.baraemCategories;
  const dir = translations[currentLang].direction;

  const categoryList = [
      { id: 'all', label: currentLang === 'ar' ? 'الكل' : 'All' },
      { id: 'cartoons', label: categories.cartoons },
      { id: 'anasheed', label: categories.anasheed },
      { id: 'stories', label: categories.stories },
      { id: 'education', label: categories.education },
      { id: 'manners', label: categories.manners },
  ];

  const filteredVideos = activeCategory === 'all' 
      ? baraemVideos 
      : baraemVideos.filter(v => v.category === activeCategory);

  // Use No-Cookie domain and parameters to remove ads/tracking as much as possible
  const getEmbedUrl = (videoId: string) => 
      `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0&iv_load_policy=3&fs=1&cc_load_policy=0&disablekb=1`;

  const getThumbnailUrl = (videoId: string) => 
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleVideoClick = (video: BaraemVideo) => {
      if (onPlayVideo) {
          onPlayVideo();
      }
      setCurrentVideo(video);
  };

  return (
    <div 
        className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in font-cairo"
        onClick={onClose}
        dir={dir}
    >
        <div 
            className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#121212]">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600/20 rounded-2xl border border-red-600/30">
                        <VideoIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-wide">{t.baraemTube}</h2>
                        <p className="text-xs text-white/40 font-medium mt-1">{t.safeZone}</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-col lg:flex-row h-full overflow-hidden">
                
                {/* Sidebar / Categories */}
                <div className="w-full lg:w-64 bg-[#0f0f0f] border-b lg:border-b-0 lg:border-r border-white/5 p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto custom-scrollbar shrink-0">
                    {categoryList.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveCategory(cat.id); setCurrentVideo(null); }}
                            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group shrink-0
                                ${activeCategory === cat.id 
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span>{cat.label}</span>
                            {activeCategory === cat.id && (
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse hidden lg:block"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-grow flex flex-col overflow-hidden bg-[#050505] relative">
                    
                    {/* Player Section (Overlay if video selected) */}
                    {currentVideo ? (
                        <div className="flex flex-col h-full animate-fade-in">
                            {/* Player Header */}
                            <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-[#121212]">
                                <button 
                                    onClick={() => setCurrentVideo(null)}
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                                >
                                    <ArrowIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                                </button>
                                <h3 className="text-lg font-bold text-white truncate">{currentVideo.title[currentLang]}</h3>
                            </div>
                            
                            {/* Video Frame */}
                            <div className="flex-grow relative w-full bg-black flex items-center justify-center">
                                <div className="aspect-video w-full max-w-5xl max-h-full shadow-2xl border border-white/5 rounded-xl overflow-hidden">
                                    <iframe 
                                        src={getEmbedUrl(currentVideo.videoId)} 
                                        title={currentVideo.title[currentLang]}
                                        className="w-full h-full"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Video Grid */
                        <div className="p-6 overflow-y-auto custom-scrollbar h-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredVideos.map((video) => (
                                    <button
                                        key={video.id}
                                        onClick={() => handleVideoClick(video)}
                                        className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-900/20 text-left"
                                    >
                                        {/* Thumbnail */}
                                        <img 
                                            src={getThumbnailUrl(video.videoId)} 
                                            alt={video.title[currentLang]}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            loading="lazy"
                                        />
                                        
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Play Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg text-white">
                                                <PlayIcon className="w-5 h-5 pl-0.5" />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="absolute bottom-0 left-0 w-full p-4">
                                            <div className="flex items-start gap-3">
                                                <h4 className="text-white font-bold text-sm line-clamp-2 drop-shadow-md flex-grow group-hover:text-red-100 transition-colors">
                                                    {video.title[currentLang]}
                                                </h4>
                                            </div>
                                            <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white/70 backdrop-blur-sm border border-white/5">
                                                {categories[video.category] || video.category}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            
                            {filteredVideos.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 text-white/30">
                                    <VideoIcon className="w-12 h-12 mb-4 opacity-50" />
                                    <p>{t.error}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <style>{`
            @keyframes fade-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};
