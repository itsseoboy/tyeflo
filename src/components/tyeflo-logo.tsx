import * as React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function TyeFloLogo({ className, size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TyeFlo logo"
      role="img"
    >
      <defs>
        <linearGradient id="tyeflo-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9D5CFA" />
          <stop offset="0.5" stopColor="#7B33F1" />
          <stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id="tyeflo-shine" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="tyeflo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#5B21B6" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="2" y="3" width="36" height="36" rx="11" fill="#5B21B6" opacity="0.3" />
      <rect width="40" height="40" rx="11" fill="url(#tyeflo-grad)" filter="url(#tyeflo-shadow)" />
      <rect width="40" height="40" rx="11" fill="url(#tyeflo-shine)" />
      <rect x="9" y="12" width="22" height="5" rx="2.5" fill="white" />
      <rect x="17.5" y="12" width="5" height="17" rx="2.5" fill="white" />
      <path d="M17.5 29C17.5 29 19 33 23 33C27 33 30 30 30 26" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
