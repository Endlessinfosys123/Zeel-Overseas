"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Globe as GlobeIcon, AlertCircle } from "lucide-react";

// Dynamically import the GlobeScene client-side only
const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => <GlobeSkeleton />,
});

// A premium loading skeleton that matches the dimensions and structure of the globe
const GlobeSkeleton = () => (
  <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
    {/* Pulsing Globe Outline */}
    <div className="w-72 h-72 rounded-full border border-dashed border-brand-blue/30 flex items-center justify-center animate-pulse duration-2000">
      <div className="w-56 h-56 rounded-full border border-dotted border-brand-gold/40 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-brand-blue/5 flex items-center justify-center">
          <GlobeIcon className="w-12 h-12 text-brand-blue/20 animate-spin duration-3000" />
        </div>
      </div>
    </div>
    <span className="text-xs font-display tracking-widest text-brand-gray-dark uppercase mt-6 block">
      Loading Interactive 3D World...
    </span>
  </div>
);

// High-quality static SVG fallback for users who prefer reduced motion
const StaticFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center relative p-6 select-none">
    <div className="w-full max-w-lg aspect-square relative flex items-center justify-center">
      {/* Custom designed clean line-art world map */}
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-60"
      >
        {/* Simplified global network grid grid */}
        <circle cx="400" cy="250" r="180" stroke="#E5E5E0" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="400" cy="250" r="120" stroke="#E5E5E0" strokeWidth="1.5" />
        <circle cx="400" cy="250" r="60" stroke="#E5E5E0" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Origin Pin (Delhi, India) */}
        <circle cx="510" cy="260" r="6" fill="#2563EB" />
        <circle cx="510" cy="260" r="12" stroke="#2563EB" strokeWidth="1" className="animate-ping" />

        {/* Destination Nodes */}
        {/* Canada */}
        <circle cx="280" cy="180" r="4" fill="#D4AF37" />
        <path d="M 510 260 Q 395 190 280 180" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />
        
        {/* USA */}
        <circle cx="260" cy="220" r="4" fill="#2563EB" />
        <path d="M 510 260 Q 385 200 260 220" stroke="#2563EB" strokeWidth="2" />

        {/* UK */}
        <circle cx="390" cy="160" r="4" fill="#D4AF37" />
        <path d="M 510 260 Q 450 180 390 160" stroke="#D4AF37" strokeWidth="2" />

        {/* Germany */}
        <circle cx="425" cy="170" r="4" fill="#2563EB" />
        <path d="M 510 260 Q 467 200 425 170" stroke="#2563EB" strokeWidth="2" strokeDasharray="2 2" />

        {/* Australia */}
        <circle cx="620" cy="380" r="4" fill="#2563EB" />
        <path d="M 510 260 Q 565 320 620 380" stroke="#2563EB" strokeWidth="2" />

        {/* New Zealand */}
        <circle cx="660" cy="410" r="4" fill="#D4AF37" />
        <path d="M 510 260 Q 585 335 660 410" stroke="#D4AF37" strokeWidth="2" />
      </svg>
      <div className="absolute bottom-6 flex items-center space-x-2 text-xs font-display font-medium text-brand-gray-dark bg-white/80 border border-brand-gray-medium/40 px-3 py-1.5 rounded-full shadow-sm">
        <AlertCircle className="w-3.5 h-3.5 text-brand-blue" />
        <span>Reduced Motion Mode Active — Interactive 3D Suspended</span>
      </div>
    </div>
  </div>
);

export const HeroCanvas: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  return (
    <div className="w-full h-full">
      {prefersReducedMotion ? <StaticFallback /> : <GlobeScene />}
    </div>
  );
};

export default HeroCanvas;
