"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const countries = [
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Schengen Area", flag: "🇪🇺" },
];

export const TrustBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation using GSAP ScrollTrigger
      const statElements = gsap.utils.toArray(".stat-number") as HTMLElement[];

      statElements.forEach((el) => {
        const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toString();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Double the array for infinite scroll layout
  const doubleCountries = [...countries, ...countries, ...countries];

  return (
    <section ref={containerRef} className="py-16 bg-white border-y border-brand-gray-medium/40 z-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Subhead text */}
        <p className="text-center text-xs font-display font-bold tracking-widest text-brand-gray-dark uppercase mb-8">
          Empowering borderless journeys for ambition
        </p>

        {/* CSS-driven marquee logo bar */}
        <div className="relative w-full overflow-hidden mb-16 py-4 mask-gradient">
          <div className="flex space-x-12 animate-marquee-scroll whitespace-nowrap w-fit">
            {doubleCountries.map((country, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-3 bg-brand-offwhite border border-brand-gray-medium/35 px-5 py-3 rounded-full shadow-sm hover:border-brand-blue/30 transition-colors"
              >
                <span className="text-xl leading-none select-none">{country.flag}</span>
                <span className="font-display font-bold text-sm tracking-wide text-brand-charcoal">
                  {country.name}
                </span>
              </div>
            ))}
          </div>

          {/* Fade overlays on edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Stats Count Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-brand-gray-medium/20">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline font-display font-black text-brand-blue text-5xl md:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="500">0</span>
              <span>+</span>
            </div>
            <span className="text-sm font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Visas Fully Approved
            </span>
          </div>

          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-brand-gray-medium/30 py-6 md:py-0">
            <div className="flex items-baseline font-display font-black text-brand-gold text-5xl md:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="98">0</span>
              <span>%</span>
            </div>
            <span className="text-sm font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Overall Success Rate
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline font-display font-black text-brand-blue text-5xl md:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="15">0</span>
              <span>+</span>
            </div>
            <span className="text-sm font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Target Countries Specialization
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
