import React from 'react';

export const WalletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}>
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9A2.25 2.25 0 0 0 18.75 6.75h-1.5a3 3 0 0 0-3-3h-1.5a3 3 0 0 0-3 3H7.5A2.25 2.25 0 0 0 5.25 9v3m13.5 3H9" 
        />
    </svg>
);
