"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { RealPlane } from "@/components/ui/GlobalBackground";

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
    <section ref={containerRef} className="py-16 border-y border-brand-gray-medium/20 z-10 relative overflow-hidden bg-transparent">
      {/* Unique TrustBar Local Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Left-to-right slow airliner */}
        <motion.div
          className="absolute opacity-15"
          style={{ top: "15%", left: "-10%", rotate: 90 }}
          animate={{ left: ["-10%", "110%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <RealPlane size={48} color="#2563EB" />
        </motion.div>

        {/* Right-to-left fast airliner */}
        <motion.div
          className="absolute opacity-10"
          style={{ top: "60%", right: "-10%", rotate: -90 }}
          animate={{ right: ["-10%", "110%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 4 }}
        >
          <RealPlane size={40} color="#D4AF37" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />
        </div>

        {/* Stats Count Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center pt-8 border-t border-brand-gray-medium/20">
          <div className="flex flex-col items-center p-4">
            <div className="flex items-baseline font-display font-black text-brand-blue text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="300">0</span>
              <span>+</span>
            </div>
            <span className="text-[10px] md:text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Visas Approved
            </span>
          </div>

          <div className="flex flex-col items-center p-4 border-l border-brand-gray-medium/20">
            <div className="flex items-baseline font-display font-black text-brand-gold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="9">0</span>
              <span>+</span>
            </div>
            <span className="text-[10px] md:text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Years of Experience
            </span>
          </div>

          <div className="flex flex-col items-center p-4 border-t border-brand-gray-medium/20 lg:border-t-0 lg:border-l">
            <div className="flex items-baseline font-display font-black text-brand-blue text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="99">0</span>
              <span>%</span>
            </div>
            <span className="text-[10px] md:text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Success Rate
            </span>
          </div>

          <div className="flex flex-col items-center p-4 border-t border-l border-brand-gray-medium/20 lg:border-t-0">
            <div className="flex items-baseline font-display font-black text-brand-gold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
              <span className="stat-number" data-target="10">0</span>
              <span>+</span>
            </div>
            <span className="text-[10px] md:text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-widest">
              Countries Covered
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
