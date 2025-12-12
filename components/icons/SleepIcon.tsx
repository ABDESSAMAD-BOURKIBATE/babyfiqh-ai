import React from 'react';

export const SleepIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Moon */}
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" opacity="0.8" />

        {/* Zzz symbols */}
        <g opacity="0.9">
            <path d="M16 2L18 2L16 4L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 4L21 4L19 6L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 6L19.5 6L17.5 8L19.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Stars */}
        <circle cx="7" cy="6" r="0.8" fill="currentColor" opacity="0.6" />
        <circle cx="9" cy="4" r="0.5" fill="currentColor" opacity="0.5" />
        <circle cx="5" cy="8" r="0.5" fill="currentColor" opacity="0.4" />
    </svg>
);
