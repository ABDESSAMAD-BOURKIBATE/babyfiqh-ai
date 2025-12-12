import React from 'react';

export const WakeUpIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sun */}
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.9" />

        {/* Sun rays */}
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>

        {/* Sparkles */}
        <g opacity="0.7">
            <path d="M8 2L8.5 3.5L10 4L8.5 4.5L8 6L7.5 4.5L6 4L7.5 3.5L8 2Z" fill="currentColor" />
            <path d="M16 2L16.5 3.5L18 4L16.5 4.5L16 6L15.5 4.5L14 4L15.5 3.5L16 2Z" fill="currentColor" />
        </g>
    </svg>
);
