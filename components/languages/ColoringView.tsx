import React, { useState } from 'react';

interface ColoringViewProps {
    onComplete: () => void;
}

export const ColoringView: React.FC<ColoringViewProps> = ({ onComplete }) => {
    const [selectedColor, setSelectedColor] = useState<string>('#ef4444');

    const colors = [
        '#ef4444', // Red
        '#f97316', // Orange
        '#eab308', // Yellow
        '#22c55e', // Green
        '#3b82f6', // Blue
        '#a855f7', // Purple
        '#ec4899', // Pink
    ];

    return (
        <div className="flex flex-col items-center animate-fade-in">
            <h3 className="text-3xl font-bold text-white mb-8">وقت التلوين! 🎨</h3>

            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8 w-full max-w-2xl aspect-video flex items-center justify-center border-4 border-indigo-500/30">
                <p className="text-slate-400 text-xl text-center">
                    (مساحة التلوين التفاعلية ستكون هنا)
                    <br />
                    <span className="text-6xl mt-4 block text-slate-200">أ ب ت</span>
                </p>
            </div>

            {/* Color Palette */}
            <div className="flex gap-4 mb-12 bg-white/10 p-4 rounded-full backdrop-blur-md">
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-4 transition-transform hover:scale-110 ${selectedColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <button
                onClick={onComplete}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-bold text-xl text-white shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
            >
                انتهيت من التلوين! ✨
            </button>
        </div>
    );
};
