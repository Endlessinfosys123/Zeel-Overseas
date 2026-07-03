"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroCanvas from "@/components/3d/HeroCanvas";
import SplitText from "@/components/ui/SplitText";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal text elements staggeredly
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }); // Let preloader finish

      tl.to(".split-word", {
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
      })
        .to(
          ".hero-fade",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".hero-globe",
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center bg-brand-offwhite py-12 md:py-20 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left relative z-20">
          <div className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/20 px-4 py-1.5 rounded-full w-fit hero-fade opacity-0 translate-y-4">
            <span className="text-[10px] font-display font-black tracking-wider text-brand-blue uppercase">
              Now Boarding
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
          </div>

          <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
            <SplitText text="Your Global" type="words" />
            <br />
            <SplitText text="Future, Documented." type="words" />
          </h1>

          <p className="clamp-subtitle text-brand-charcoal/70 max-w-xl font-body hero-fade opacity-0 translate-y-4">
            Navigate study visas, permanent residency, work permits, and embassy audits with India&apos;s premier, certified immigration consultancy. Evoking absolute trust.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 hero-fade opacity-0 translate-y-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-brand-gold text-brand-charcoal text-center font-display font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-2 magnetic-target"
            >
              <span className="relative z-10">Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0" />
              <span className="absolute inset-0 flex items-center justify-center text-white bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-8 py-4 rounded-full font-display font-bold space-x-2">
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/services"
              className="border border-brand-gray-dark/20 text-brand-charcoal hover:border-brand-blue hover:text-brand-blue text-center font-display font-bold px-8 py-4 rounded-full transition-colors duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Right: R3F Canvas */}
        <div className="lg:col-span-5 w-full aspect-square relative flex items-center justify-center hero-globe opacity-0 scale-95 z-10">
          {/* Subtle gradient backdrop to lift 3D Globe */}
          <div className="absolute w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl" />
          <HeroCanvas />
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 select-none pointer-events-none hero-fade opacity-0 translate-y-4 hidden md:flex">
        <span className="text-[9px] font-display font-bold tracking-widest text-brand-gray-dark uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-brand-gray-dark" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
