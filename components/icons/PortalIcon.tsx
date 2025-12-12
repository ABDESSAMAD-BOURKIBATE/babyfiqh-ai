import React from 'react';

export const PortalIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
        {/* Outer portal ring */}
        <circle cx="12" cy="12" r="10" opacity="0.3"></circle>

        {/* Inner portal ring */}
        <circle cx="12" cy="12" r="6"></circle>

        {/* Portal energy lines */}
        <path d="M12 2 L12 6"></path>
        <path d="M12 18 L12 22"></path>
        <path d="M2 12 L6 12"></path>
        <path d="M18 12 L22 12"></path>

        {/* Diagonal energy lines */}
        <path d="M4.93 4.93 L7.76 7.76"></path>
        <path d="M16.24 16.24 L19.07 19.07"></path>
        <path d="M19.07 4.93 L16.24 7.76"></path>
        <path d="M7.76 16.24 L4.93 19.07"></path>

        {/* Center dot */}
        <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
    </svg>
);
