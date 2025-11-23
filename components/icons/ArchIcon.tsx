
import React from 'react';

export const ArchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M3 21h18v-9a9 9 0 0 0-18 0v9z" />
    <path d="M12 7a5 5 0 0 0-5 5v9h10v-9a5 5 0 0 0-5-5z" />
    <path d="M3 12h18" />
  </svg>
);
