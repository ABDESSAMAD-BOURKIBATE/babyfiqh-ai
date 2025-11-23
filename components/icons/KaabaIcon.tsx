
import React from 'react';

export const KaabaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4 8L12 4L20 8V18L12 22L4 18V8Z" />
    <path d="M12 4V22" />
    <path d="M4 8L12 12L20 8" />
    <path d="M4 13H12" opacity="0.5" />
    <path d="M12 16H20" opacity="0.5" />
  </svg>
);
