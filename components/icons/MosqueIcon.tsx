
import React from 'react';

export const MosqueIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2L8 6H16L12 2Z" />
    <path d="M4 10H20" />
    <path d="M5 10V21H19V10" />
    <path d="M9 21V14C9 14 9 12 12 12C15 12 15 14 15 14V21" />
    <path d="M2 21H22" />
    <path d="M12 6V2" />
    <path d="M7 6H17" />
  </svg>
);
