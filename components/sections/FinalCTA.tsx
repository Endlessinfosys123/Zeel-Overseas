"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden z-10">
      {/* 3D-like floating/pulsing pastel orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[80px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-[70px] animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Subtle badge icon */}
        <div className="inline-flex items-center space-x-2 bg-brand-gold/15 border border-brand-gold/25 px-4 py-1.5 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-brand-gold fill-current animate-pulse" />
          <span className="text-[10px] font-display font-black tracking-widest text-brand-gold uppercase">
            Start Today
          </span>
        </div>

        {/* Big Bold Headline */}
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-brand-charcoal leading-none mb-6">
          Your Global Future <br />
          Is A Consultation Away.
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base font-body text-brand-charcoal/70 max-w-xl mx-auto leading-relaxed mb-10">
          Book a direct case audit with our certified consultants. Analyze your eligibility scores for student permits, work visas, or permanent residency pathways under current embassy rules.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group relative overflow-hidden bg-brand-gold text-brand-charcoal font-display font-bold text-sm px-10 py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2 magnetic-target animate-pulse-glow"
          >
            <span className="relative z-10">Book Free Consultation</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0" />
            <span className="absolute inset-0 flex items-center justify-center text-white bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-10 py-5 rounded-full font-display font-bold text-sm space-x-2">
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
