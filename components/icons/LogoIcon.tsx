import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#fde047', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#d4af37', stopOpacity: 1}} />
        </linearGradient>
    </defs>
    <path d="M14.5 2.5C10.08 2.5 6.5 6.08 6.5 10.5C6.5 14.92 10.08 18.5 14.5 18.5C16.42 18.5 18.19 17.83 19.57 16.71C15.93 17.84 12.5 14.59 12.5 10.5C12.5 6.41 15.93 3.16 19.57 4.29C18.19 3.17 16.42 2.5 14.5 2.5Z" fill="url(#logo-gradient)"/>
    <path d="M20 10.5L19.25 8.75L17.5 8L19.25 7.25L20 5.5L20.75 7.25L22.5 8L20.75 8.75L20 10.5Z" fill="white"/>
    <path d="M16 4L15.5 3L15 4L14.5 5L15 6L15.5 7L16 6L16.5 5L16 4Z" fill="white" opacity="0.8"/>
    <path d="M19 14L18.5 13L18 14L17.5 15L18 16L18.5 17L19 16L19.5 15L19 14Z" fill="white" opacity="0.7"/>
  </svg>
);