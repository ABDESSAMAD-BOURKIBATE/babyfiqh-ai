
import React from 'react';

export const GameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 13V8" />
    <path d="M12 21v-3" />
    <path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M4.93 19.07 7.76 16.24" />
    <path d="M16.24 7.76 19.07 4.93" />
    <path d="M2 12h3" />
    <path d="M19 12h3" />
    <path d="M7.76 7.76 4.93 4.93" />
    <path d="M19.07 19.07 16.24 16.24" />
  </svg>
);
