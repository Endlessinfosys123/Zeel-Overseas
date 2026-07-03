"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Globe2, FileCheck, Plane, Star, Shield, Award } from "lucide-react";
import HeroCanvas from "@/components/3d/HeroCanvas";
import SplitText from "@/components/ui/SplitText";

// Floating passport/visa related emoji decorations
const floatingElements = [
  { icon: "✈️", x: "8%", y: "18%", delay: 0, size: "text-3xl", rotate: -20 },
  { icon: "🌍", x: "82%", y: "12%", delay: 0.5, size: "text-2xl", rotate: 10 },
  { icon: "📋", x: "5%", y: "65%", delay: 1.0, size: "text-2xl", rotate: 15 },
  { icon: "🎓", x: "88%", y: "70%", delay: 0.3, size: "text-3xl", rotate: -10 },
  { icon: "🏛️", x: "15%", y: "88%", delay: 0.8, size: "text-2xl", rotate: 8 },
  { icon: "🗺️", x: "75%", y: "88%", delay: 1.2, size: "text-2xl", rotate: -15 },
  { icon: "📑", x: "92%", y: "42%", delay: 0.6, size: "text-xl", rotate: 20 },
  { icon: "🌐", x: "3%", y: "42%", delay: 1.4, size: "text-xl", rotate: -8 },
];

// Quick stat cards floating around
const floatStats = [
  { label: "Visas Approved", value: "2500+", color: "bg-blue-50 border-blue-200", textColor: "text-blue-700", icon: <FileCheck className="w-4 h-4" /> },
  { label: "Countries", value: "25+", color: "bg-amber-50 border-amber-200", textColor: "text-amber-700", icon: <Globe2 className="w-4 h-4" /> },
  { label: "Success Rate", value: "98%", color: "bg-green-50 border-green-200", textColor: "text-green-700", icon: <Star className="w-4 h-4" /> },
];

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
        )
        .to(
          ".hero-float-card",
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden z-10"
      style={{
        background: "linear-gradient(135deg, #EFF6FF 0%, #FAFAF8 30%, #FDF8EE 65%, #F0F7FF 100%)"
      }}
    >
      {/* Layered Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left sky blue blob */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl" />
        {/* Top-right gold blob */}
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-amber-100/50 blur-3xl" />
        {/* Bottom center blue teal */}
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[300px] rounded-full bg-sky-100/50 blur-3xl" />
        {/* Bottom right gold */}
        <div className="absolute -bottom-10 -right-20 w-[350px] h-[350px] rounded-full bg-yellow-100/40 blur-3xl" />
      </div>

      {/* Floating Emoji Elements */}
      {floatingElements.map((el, idx) => (
        <motion.div
          key={idx}
          className={`absolute select-none pointer-events-none ${el.size} z-0`}
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, y: 20, rotate: el.rotate }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            y: [0, -12, 0],
            rotate: [el.rotate, el.rotate + 5, el.rotate],
          }}
          transition={{
            delay: el.delay + 2,
            duration: 4 + idx * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Subtle animated grid / dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #2563EB22 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 md:py-20 relative z-10">
        {/* Left: Text & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-300/40 backdrop-blur-sm px-4 py-2 rounded-full w-fit"
          >
            <Plane className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span className="text-[11px] font-display font-black tracking-wider text-blue-700 uppercase">
              Now Boarding — Ahmedabad to the World
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="clamp-title font-display font-black leading-none"
            style={{ color: "#1A1A1A" }}>
            <SplitText text="Your Global" type="words" />
            <br />
            <span className="relative">
              <SplitText text="Future," type="words" />
              <span className="relative ml-4 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #06b6d4)" }}>
                <SplitText text="Documented." type="words" />
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="clamp-subtitle text-neutral-600 max-w-lg font-body hero-fade opacity-0 translate-y-4 leading-relaxed">
            Navigate study visas, permanent residency, work permits, and embassy audits with India&apos;s premier immigration consultancy. Evoking absolute trust since 2018.
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-2 hero-fade opacity-0 translate-y-4">
            {["Study Visa", "Work Permit", "PR / Residency", "Tourist Visa", "Business Visa"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-display font-bold px-3 py-1.5 rounded-full border"
                style={{ background: "rgba(37,99,235,0.06)", borderColor: "rgba(37,99,235,0.2)", color: "#2563EB" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 hero-fade opacity-0 translate-y-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden text-white text-center font-display font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #2563EB, #06b6d4)" }}
            >
              <span className="relative z-10">Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/services"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 text-center font-display font-bold px-8 py-4 rounded-full transition-all duration-300 bg-white/70 backdrop-blur-sm"
            >
              Explore Services
            </Link>
          </div>

          {/* Floating Stat Chips */}
          <div className="flex flex-wrap gap-3 pt-2">
            {floatStats.map((stat, i) => (
              <div
                key={i}
                className={`hero-float-card opacity-0 translate-y-4 flex items-center gap-2 border rounded-2xl px-3 py-2 shadow-sm ${stat.color} ${stat.textColor}`}
              >
                {stat.icon}
                <div>
                  <div className="text-xs font-black font-display">{stat.value}</div>
                  <div className="text-[9px] font-medium opacity-70 leading-none">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Globe Canvas */}
        <div className="lg:col-span-6 w-full aspect-square relative flex items-center justify-center hero-globe opacity-0 scale-95 z-10">
          {/* Glow backdrop */}
          <div className="absolute w-[80%] h-[80%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />
          <div className="absolute w-[60%] h-[60%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)" }} />
          <HeroCanvas />

          {/* Floating country arrival badge */}
          <motion.div
            className="absolute top-8 right-8 bg-white/90 backdrop-blur-md border border-green-200 rounded-2xl px-3 py-2 shadow-lg"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              <div>
                <div className="text-[10px] font-black font-display text-green-700">Visa Approved</div>
                <div className="text-[8px] text-neutral-500">98% Success Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Floating IELTS/expertise badge */}
          <motion.div
            className="absolute bottom-12 left-4 bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl px-3 py-2 shadow-lg"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <div>
                <div className="text-[10px] font-black font-display text-amber-700">Certified Experts</div>
                <div className="text-[8px] text-neutral-500">ICCRC • MARA Certified</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 select-none pointer-events-none hero-fade opacity-0 translate-y-4 hidden md:flex">
        <span className="text-[9px] font-display font-bold tracking-widest text-neutral-400 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
