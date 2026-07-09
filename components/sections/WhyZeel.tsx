"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Shield, BookOpen, FileCheck, CheckCircle } from "lucide-react";

import { motion } from "framer-motion";
import { RealPlane, GlobeIcon } from "@/components/ui/GlobalBackground";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    icon: <BookOpen className="w-8 h-8 text-brand-blue" />,
    title: "Personalized Counseling",
    description: "No two applications are the same; we assess your profile before recommending a country or pathway.",
    badge: "TAILORED"
  },
  {
    icon: <FileCheck className="w-8 h-8 text-brand-gold" />,
    title: "Complete Documentation Support",
    description: "From SOPs to financial proofs, we prepare every document to embassy standard.",
    badge: "EMBASSY READY"
  },
  {
    icon: <Shield className="w-8 h-8 text-brand-blue" />,
    title: "High Approval Track Record",
    description: "Our process is built around getting files right the first time, minimizing rejections and delays.",
    badge: "SUCCESS DRIVEN"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-brand-gold" />,
    title: "End-to-End Guidance",
    description: "We stay with you from first consultation to visa stamp and pre-departure briefing.",
    badge: "COMPLETE"
  }
];

export const WhyZeel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check screen size before initializing horizontal scroll to prevent weird layouts on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const pinWidth = scrollRef.current!.scrollWidth;
      const amountToScroll = pinWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-transparent">
      <div ref={pinRef} className="relative z-10 md:h-screen flex flex-col justify-center overflow-hidden py-20 md:py-0 bg-transparent">
      {/* Globe Orbit Local Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
        <div className="relative w-[300px] h-[300px] opacity-25">
          {/* Wireframe globe outline */}
          <GlobeIcon size={300} color="#2563EB" />
          
          {/* Orbit path circle */}
          <div className="absolute inset-0 rounded-full border border-dashed border-brand-blue/35 animate-spin" style={{ animationDuration: "35s" }} />

          {/* Passenger jet airliner orbiting the globe */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: "300px", height: "300px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <RealPlane size={28} color="#2563EB" className="absolute top-0 left-1/2 -translate-x-1/2 -rotate-90" />
          </motion.div>
        </div>
      </div>

      {/* Mobile view: standard vertical stack */}
      <div className="md:hidden max-w-7xl mx-auto px-6 space-y-12 relative z-10">
        <div>
          <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-2">
            The Zeel Standard
          </span>
          <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
            Why Zeel Overseas?
          </h2>
        </div>
        <div className="space-y-6">
          {differentiators.map((diff, idx) => (
            <div key={idx} className="bg-brand-offwhite border border-brand-gray-medium/50 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                {diff.icon}
              </div>
              <span className="text-[9px] font-display font-black tracking-widest text-brand-blue/60 uppercase block mb-2">
                {diff.badge}
              </span>
              <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">
                {diff.title}
              </h3>
              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view: GSAP horizontal scroll track */}
      <div className="hidden md:block">
        <div ref={scrollRef} className="flex space-x-12 px-[10vw] items-center w-fit h-full">
          {/* Intro Card */}
          <div className="w-[450px] shrink-0 pr-8">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
              The Zeel Standard
            </span>
            <h2 className="text-5xl font-display font-black text-brand-charcoal leading-none mb-6">
              Why Zeel <br />
              Overseas?
            </h2>
            <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
              We stand apart through legal precision, verified success metrics, and absolute commitment to student and worker resettlement success. Scroll horizontally to explore our core pillars.
            </p>
          </div>

          {/* Differentiator Cards */}
          {differentiators.map((diff, idx) => (
            <div
              key={idx}
              className="w-[450px] shrink-0 bg-brand-offwhite border border-brand-gray-medium/60 p-10 rounded-3xl aspect-[1.1/1] flex flex-col justify-between hover:border-brand-blue/30 transition-colors shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm border border-brand-gray-medium/20">
                {diff.icon}
              </div>
              <div>
                <span className="text-[10px] font-display font-black tracking-widest text-brand-blue/60 uppercase block mb-2">
                  {diff.badge}
                </span>
                <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-4">
                  {diff.title}
                </h3>
                <p className="text-sm font-body text-brand-charcoal/75 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default WhyZeel;
