"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { countriesData } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ParallaxCardProps {
  country: typeof countriesData[0];
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({ country }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [transX, setTransX] = useState(0);
  const [transY, setTransY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize from -0.5 to 0.5
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    // Set 3D rotation angles (max 10 degrees)
    setRotateX(-yc * 12);
    setRotateY(xc * 12);
    
    // Inner parallax image translation (max 15px displacement)
    setTransX(-xc * 15);
    setTransY(-yc * 15);
  };

  const handleMouseLeave = () => {
    // Reset positions on leave
    setRotateX(0);
    setRotateY(0);
    setTransX(0);
    setTransY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-brand-gray-medium/40 bg-brand-warm cursor-pointer transition-all duration-300 hover:shadow-xl select-none"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }}
    >
      {/* 1. Background Image layer with inverse translation parallax */}
      <div
        className="absolute inset-0 scale-[1.12]"
        style={{
          transform: `translateX(${transX}px) translateY(${transY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src={country.skylineImage}
          alt={country.name}
          fill
          className="object-cover brightness-[0.85] grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* 2. Soft Gold/Dark Shadow Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-transparent pointer-events-none" />

      {/* 3. Top Accent Flag */}
      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md flex items-center space-x-2 shadow-sm pointer-events-none">
        <span className="text-lg leading-none">{country.flag}</span>
        <span className="text-xs font-display font-bold tracking-wider text-brand-charcoal uppercase">
          {country.name}
        </span>
      </div>

      {/* 4. Text & Action Overlay (Foreground Layer with direct parallax pull) */}
      <div
        className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-white pointer-events-none"
        style={{
          transform: `translateX(${-transX * 0.4}px) translateY(${-transY * 0.4}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="flex justify-between items-end">
          <div className="max-w-[80%]">
            <span className="text-[9px] font-display font-black text-brand-gold uppercase tracking-widest block mb-1">
              VISA DESTINATION
            </span>
            <h3 className="text-2xl font-display font-black tracking-tight leading-none mb-2">
              {country.name}
            </h3>
            <p className="text-[11px] text-white/80 leading-relaxed font-body">
              {country.tagline}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-brand-charcoal flex items-center justify-center shadow-md">
            <ArrowUpRight className="w-5 h-5 text-brand-charcoal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CountryGrid: React.FC = () => {
  return (
    <section className="py-24 bg-brand-warm relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
            Destinations
          </span>
          <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
            Where Ambition Finds <br />
            New Horizons.
          </h2>
          <p className="text-sm font-body text-brand-charcoal/70 max-w-xl leading-relaxed">
            Our network covers the world&apos;s most stable economies, highest quality educational institutions, and thriving job markets.
          </p>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countriesData.map((country) => (
            <Link key={country.code} href={`/services?tab=${country.name.toLowerCase()}`}>
              <ParallaxCard country={country} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryGrid;
