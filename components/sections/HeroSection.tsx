"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Plane, Globe2, FileCheck, Star } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import HeroVisualPanel from "@/components/sections/HeroVisualPanel";
import { RealPlane, FlightArcPath, CompassIcon } from "@/components/ui/GlobalBackground";

// Quick stat chips with glassmorphic style
const floatStats = [
  { label: "Visas Approved", value: "2500+", color: "bg-white/5 border-white/10 backdrop-blur-md", textColor: "text-white", icon: <FileCheck className="w-4 h-4 text-brand-gold-light" /> },
  { label: "Countries", value: "25+", color: "bg-white/5 border-white/10 backdrop-blur-md", textColor: "text-white", icon: <Globe2 className="w-4 h-4 text-cyan-400" /> },
  { label: "Success Rate", value: "98%", color: "bg-white/5 border-white/10 backdrop-blur-md", textColor: "text-white", icon: <Star className="w-4 h-4 text-amber-400" /> },
];

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | undefined;

    const startAnimations = () => {
      // Start video playback immediately on preloader finish
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay blocked by browser policy.", err);
        });
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline(); // No delay needed now as it's triggered exactly on exit

        tl.to(".split-word", {
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.out",
        })
          .to(
            ".hero-fade",
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.4"
          )
          .to(
            ".hero-right",
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4"
          )
          .to(
            ".hero-float-card",
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "back.out(1.4)" },
            "-=0.4"
          );
      }, containerRef);
    };

    if (typeof window !== "undefined") {
      if ((window as Window & typeof globalThis & { __preloaderFinished?: boolean }).__preloaderFinished) {
        startAnimations();
      } else {
        const handleFinished = () => {
          startAnimations();
        };
        window.addEventListener("preloaderFinished", handleFinished);
        return () => {
          window.removeEventListener("preloaderFinished", handleFinished);
          if (ctx) ctx.revert();
        };
      }
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden z-10 bg-black"
    >
      {/* ── CINEMATIC FULL-BLEED VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 overflow-hidden z-0 select-none">
        {/* Background Video element */}
        <video
          ref={videoRef}
          src="/zeel-hero.mp4"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90 z-0"
          loop
          muted
          playsInline
        />
        {/* Dark overlay mask for perfect text legibility */}
        <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[1px] z-10" />

        {/* ── TECHNICAL TELEMETRY HUD OVERLAY ── */}
        {/* Soft radial glow points */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl z-20" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-3xl z-20" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[280px] rounded-full bg-sky-500/10 blur-3xl z-20" />

        {/* Flight Arc Dotted Line */}
        <div className="absolute top-[18%] left-[2%] opacity-30 z-20">
          <FlightArcPath w={320} h={130} color="#FFFFFF" />
        </div>

        {/* Real passenger jet airliner flying along flight route */}
        <motion.div
          className="absolute z-20"
          style={{ top: "18%", left: "-5%" }}
          animate={{
            left: ["-5%", "105%"],
            top: ["22%", "16%", "22%"],
            rotate: [20, 0, -20],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <RealPlane size={36} color="#FFFFFF" />
        </motion.div>

        {/* Rotating Compass Outline */}
        <motion.div
          className="absolute bottom-[10%] left-[4%] opacity-15 z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <CompassIcon size={100} color="#FFFFFF" />
        </motion.div>
        <div className="absolute -bottom-10 -right-20 w-[350px] h-[350px] rounded-full bg-yellow-500/10 blur-3xl z-20" />
      </div>

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 md:py-20 relative z-10">

        {/* ── LEFT: Text & CTAs (White Glassmorphic Style) ── */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit"
          >
            <Plane className="w-3.5 h-3.5 text-brand-gold-light animate-pulse" />
            <span className="text-[11px] font-display font-black tracking-wider text-white uppercase">
              Now Boarding — Ahmedabad to the World
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="clamp-title font-display font-black leading-none text-white">
            <SplitText text="Your Global" type="words" />
            <br />
            <span className="relative">
              <SplitText text="Future," type="words" />
              <span
                className="relative ml-4 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #FFB84D)" }}
              >
                <SplitText text="Documented." type="words" />
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="clamp-subtitle text-white/80 max-w-lg font-body hero-fade opacity-0 translate-y-4 leading-relaxed">
            Navigate study visas, permanent residency, work permits, and embassy documentation with Ahmedabad&apos;s dedicated immigration consultancy. Honest advice. Complete paperwork support. Real outcomes.
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-2 hero-fade opacity-0 translate-y-4">
            {["Study Visa", "Work Permit", "PR / Residency", "Tourist Visa", "Business Visa"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-display font-bold px-3 py-1.5 rounded-full border"
                style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 hero-fade opacity-0 translate-y-4">
            <Link
              href="/contact"
              className="group text-white text-center font-display font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #2563EB, #06b6d4)" }}
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="border-2 border-white/20 text-white hover:bg-white/10 text-center font-display font-bold px-8 py-4 rounded-full transition-all duration-300 bg-white/5 backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </div>

          {/* Stat Chips */}
          <div className="flex flex-wrap gap-3 pt-2">
            {floatStats.map((stat, i) => (
              <div
                key={i}
                className={`hero-float-card opacity-0 translate-y-4 flex items-center gap-2 border rounded-2xl px-3 py-2 shadow-sm ${stat.color} ${stat.textColor}`}
              >
                {stat.icon}
                <div>
                  <div className="text-xs font-black font-display">{stat.value}</div>
                  <div className="text-[9px] font-medium opacity-75 leading-none">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Premium Floating Widgets Over Video ── */}
        <div className="lg:col-span-6 w-full relative hero-right opacity-0 translate-x-8">
          <HeroVisualPanel />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 select-none pointer-events-none hero-fade opacity-0 translate-y-4 hidden md:flex z-20">
        <span className="text-[9px] font-display font-bold tracking-widest text-white/50 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
