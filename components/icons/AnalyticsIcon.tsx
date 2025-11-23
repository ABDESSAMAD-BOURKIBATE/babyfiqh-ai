
import React from 'react';

export const AnalyticsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
    <circle cx="13" cy="5" r="2" className="fill-current opacity-50" />
    <path d="m21 8-4-4-3 3-4-4" className="opacity-50" strokeDasharray="2 2" />
  </svg>
);
