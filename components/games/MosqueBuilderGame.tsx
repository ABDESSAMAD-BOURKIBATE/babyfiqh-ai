
import React, { useState, useRef } from 'react';
import { Language, translations } from '../../utils/translations';
import { ArrowIcon } from '../LandingPage';

interface MosqueBuilderGameProps {
    onBack: () => void;
    currentLang: Language;
    dir: 'rtl' | 'ltr';
}

interface BuilderItem {
    id: string;
    type: 'dome' | 'minaret' | 'wall' | 'door' | 'window' | 'deco';
    x: number;
    y: number;
    variant: number;
}

// --- SVG Assets for Parts ---

const Dome = ({ variant, color }: { variant: number, color?: string }) => {
    const fill = color || (variant === 1 ? "#fbbf24" : variant === 2 ? "#10b981" : "#3b82f6");
    return (
        <svg viewBox="0 0 100 80" width="100" height="80" className="drop-shadow-lg">
            <path d="M10,80 Q50,-60 90,80 Z" fill={fill} stroke="#fff" strokeWidth="2"/>
            <path d="M50,10 L50,-10" stroke="#fbbf24" strokeWidth="3"/>
            <circle cx="50" cy="-15" r="5" fill="#fbbf24" />
            {variant === 1 && <path d="M30,50 Q50,30 70,50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>}
        </svg>
    );
};

const Minaret = ({ variant }: { variant: number }) => (
    <svg viewBox="0 0 40 160" width="40" height="160" className="drop-shadow-lg">
        <rect x="5" y="40" width="30" height="120" fill={variant === 1 ? "#f3f4f6" : "#e5e7eb"} stroke="#9ca3af" strokeWidth="2"/>
        <rect x="0" y="30" width="40" height="10" fill="#fbbf24" rx="2"/>
        <path d="M5,30 L20,0 L35,30 Z" fill="#10b981" stroke="#fff" strokeWidth="2"/>
        <rect x="15" y="60" width="10" height="20" fill="#374151" rx="5"/>
        <rect x="15" y="100" width="10" height="20" fill="#374151" rx="5"/>
    </svg>
);

const Wall = ({ variant }: { variant: number }) => (
    <svg viewBox="0 0 100 80" width="100" height="80" className="drop-shadow-md">
        <rect x="0" y="0" width="100" height="80" fill={variant === 1 ? "#fce7f3" : "#e0f2fe"} stroke="#fff" strokeWidth="2"/>
        <rect x="0" y="0" width="100" height="10" fill="rgba(0,0,0,0.1)"/>
        {variant === 2 && (
            <>
                <line x1="20" y1="10" x2="20" y2="80" stroke="rgba(0,0,0,0.05)" strokeWidth="2"/>
                <line x1="80" y1="10" x2="80" y2="80" stroke="rgba(0,0,0,0.05)" strokeWidth="2"/>
            </>
        )}
    </svg>
);

const Door = ({ variant }: { variant: number }) => (
    <svg viewBox="0 0 60 80" width="60" height="80">
        <path d="M5,80 L5,30 Q30,0 55,30 L55,80 Z" fill={variant === 1 ? "#92400e" : "#854d0e"} stroke="#fff" strokeWidth="2"/>
        <circle cx="45" cy="50" r="3" fill="#fbbf24"/>
        <path d="M30,80 L30,25" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    </svg>
);

const Window = ({ variant }: { variant: number }) => (
    <svg viewBox="0 0 40 60" width="40" height="60">
        <path d="M5,60 L5,20 Q20,0 35,20 L35,60 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2"/>
        <line x1="20" y1="10" x2="20" y2="60" stroke="#0284c7" strokeWidth="2"/>
        <line x1="5" y1="35" x2="35" y2="35" stroke="#0284c7" strokeWidth="2"/>
    </svg>
);

const Decoration = ({ variant }: { variant: number }) => {
    if (variant === 1) return <svg viewBox="0 0 40 40" width="40" height="40"><path d="M20,0 L25,15 L40,20 L25,25 L20,40 L15,25 L0,20 L15,15 Z" fill="#fbbf24"/></svg>;
    return <svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="15" fill="none" stroke="#10b981" strokeWidth="3"/></svg>;
};

// --- Game Component ---

export const MosqueBuilderGame: React.FC<MosqueBuilderGameProps> = ({ onBack, currentLang, dir }) => {
    const [items, setItems] = useState<BuilderItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const t = translations[currentLang].ui.games;
    const tUi = translations[currentLang].ui;

    const addItem = (type: BuilderItem['type'], variant: number) => {
        const newItem: BuilderItem = {
            id: Date.now().toString(),
            type,
            variant,
            x: 150 + Math.random() * 50, // Centerish
            y: 200,
        };
        setItems([...items, newItem]);
        setSelectedId(newItem.id);
    };

    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        setSelectedId(id);
        setIsDragging(true);
        const item = items.find(i => i.id === id);
        if (item) {
            // Calculate offset relative to item position
            // We need screen coordinates vs item coordinates conversion ideally, but for simple drag:
            // Just track start point
            // Better: track offset from item top-left
            // Since we use absolute positioning in % or px, let's use simple delta
            // Actually, let's just use the mouse position relative to the item center roughly
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !selectedId) return;
        
        // Simple movement: move item to pointer position (centered)
        // In a real app, we'd map screen coords to canvas coords properly
        const canvasRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - canvasRect.left;
        const y = e.clientY - canvasRect.top;

        setItems(prev => prev.map(item => 
            item.id === selectedId ? { ...item, x: x - 50, y: y - 50 } : item // -50 centers roughly
        ));
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const deleteSelected = () => {
        if (selectedId) {
            setItems(prev => prev.filter(i => i.id !== selectedId));
            setSelectedId(null);
        }
    };

    const clearAll = () => {
        if (window.confirm(tUi.areYouSure)) {
            setItems([]);
            setSelectedId(null);
        }
    };

    const renderItem = (item: BuilderItem) => {
        const isSelected = item.id === selectedId;
        const style: React.CSSProperties = {
            position: 'absolute',
            left: item.x,
            top: item.y,
            cursor: 'grab',
            filter: isSelected ? 'drop-shadow(0 0 5px #facc15)' : 'none',
            zIndex: isSelected ? 100 : 1,
            touchAction: 'none'
        };

        let Comp;
        switch(item.type) {
            case 'dome': Comp = <Dome variant={item.variant} />; break;
            case 'minaret': Comp = <Minaret variant={item.variant} />; break;
            case 'wall': Comp = <Wall variant={item.variant} />; break;
            case 'door': Comp = <Door variant={item.variant} />; break;
            case 'window': Comp = <Window variant={item.variant} />; break;
            case 'deco': Comp = <Decoration variant={item.variant} />; break;
            default: Comp = null;
        }

        return (
            <div 
                key={item.id} 
                style={style}
                onPointerDown={(e) => handlePointerDown(e, item.id)}
            >
                {Comp}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full relative bg-[#e0f2fe]" onPointerUp={handlePointerUp} onPointerMove={handlePointerMove}>
            
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/30 to-transparent pointer-events-none">
                <div className="pointer-events-auto flex gap-4">
                    <button onClick={onBack} className="p-2 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 text-white transition-colors">
                        <ArrowIcon className={`w-6 h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                    <h2 className="text-2xl font-bold text-white font-amiri drop-shadow-md hidden md:block">{t.mosqueBuilder}</h2>
                </div>
                <div className="pointer-events-auto flex gap-2">
                    <button onClick={deleteSelected} disabled={!selectedId} className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all">
                        {t.controls.delete}
                    </button>
                    <button onClick={clearAll} className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all">
                        {t.controls.clear}
                    </button>
                </div>
            </div>

            {/* Canvas Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Sky Gradient */}
                <div className="absolute top-0 w-full h-2/3 bg-gradient-to-b from-[#38bdf8] to-[#bae6fd]"></div>
                {/* Ground */}
                <div className="absolute bottom-0 w-full h-1/3 bg-[#84cc16] border-t-4 border-[#65a30d]"></div>
                {/* Clouds (Decorative) */}
                <div className="absolute top-10 left-10 w-32 h-12 bg-white/40 rounded-full blur-xl"></div>
                <div className="absolute top-20 right-20 w-48 h-16 bg-white/30 rounded-full blur-xl"></div>
            </div>

            {/* Active Canvas Area */}
            <div className="relative flex-grow z-10 overflow-hidden touch-none">
                {items.map(renderItem)}
                {items.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="text-white/50 text-xl font-bold bg-black/10 p-4 rounded-xl backdrop-blur-sm">
                            {tUi.selectPartsGame}
                        </p>
                    </div>
                )}
            </div>

            {/* Parts Palette */}
            <div className="h-32 bg-white border-t border-gray-200 z-50 flex flex-col shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                <div className="flex overflow-x-auto custom-scrollbar p-2 gap-2 items-center h-full">
                    {/* Domes */}
                    <div className="flex flex-col items-center min-w-[80px] gap-1 border-r pr-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{t.parts.dome}</span>
                        <div className="flex gap-2">
                            <button onClick={() => addItem('dome', 1)} className="p-1 hover:bg-gray-100 rounded"><Dome variant={1} /></button>
                            <button onClick={() => addItem('dome', 2)} className="p-1 hover:bg-gray-100 rounded"><Dome variant={2} /></button>
                        </div>
                    </div>
                    
                    {/* Minarets */}
                    <div className="flex flex-col items-center min-w-[60px] gap-1 border-r pr-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{t.parts.minaret}</span>
                        <button onClick={() => addItem('minaret', 1)} className="p-1 hover:bg-gray-100 rounded"><Minaret variant={1} /></button>
                    </div>

                    {/* Walls */}
                    <div className="flex flex-col items-center min-w-[100px] gap-1 border-r pr-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{t.parts.wall}</span>
                        <div className="flex gap-2">
                            <button onClick={() => addItem('wall', 1)} className="p-1 hover:bg-gray-100 rounded transform scale-75 origin-center"><Wall variant={1} /></button>
                            <button onClick={() => addItem('wall', 2)} className="p-1 hover:bg-gray-100 rounded transform scale-75 origin-center"><Wall variant={2} /></button>
                        </div>
                    </div>

                    {/* Doors/Windows */}
                    <div className="flex flex-col items-center min-w-[100px] gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{t.parts.door} / {t.parts.window}</span>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => addItem('door', 1)} className="p-1 hover:bg-gray-100 rounded"><Door variant={1} /></button>
                            <button onClick={() => addItem('window', 1)} className="p-1 hover:bg-gray-100 rounded"><Window variant={1} /></button>
                        </div>
                    </div>
                    
                    {/* Deco */}
                    <div className="flex flex-col items-center min-w-[60px] gap-1 border-l pl-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{t.parts.deco}</span>
                        <div className="flex gap-2">
                             <button onClick={() => addItem('deco', 1)} className="p-1 hover:bg-gray-100 rounded"><Decoration variant={1} /></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
