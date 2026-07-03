"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Plane, Globe2, FileCheck, Star,
  Shield, GraduationCap, Briefcase, FileText, Landmark,
  CheckCircle2, ArrowUpRight, Users, Clock
} from "lucide-react";
import SplitText from "@/components/ui/SplitText";

// Service Cards data
const services = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Study Visa",
    desc: "Canada, Australia, UK, USA, Germany & NZ university placements",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-700",
    color: "from-blue-50 to-sky-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    stat: "98% Approval",
    href: "/services/study-visa",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Work Permit",
    desc: "H-1B, Skilled Worker, EU Blue Card & employer-sponsored streams",
    tag: "In Demand",
    tagColor: "bg-amber-100 text-amber-700",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    stat: "Fast Track",
    href: "/services/work-visa",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Permanent Residency",
    desc: "Express Entry, Subclass 189/190, Points-based PR streams",
    tag: "Expert Guided",
    tagColor: "bg-green-100 text-green-700",
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    stat: "500+ PRs",
    href: "/services/permanent-residency",
  },
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: "Tourist Visa",
    desc: "Schengen, US B-2, UK Visitor, Australia ETA — stress-free travel",
    tag: "Quick Process",
    tagColor: "bg-purple-100 text-purple-700",
    color: "from-purple-50 to-violet-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    stat: "3-7 Days",
    href: "/services/tourist-visa",
  },
  {
    icon: <Landmark className="w-5 h-5" />,
    title: "Business Visa",
    desc: "Investor, Golden Visa, entrepreneur routes & corporate entries",
    tag: "Premium",
    tagColor: "bg-rose-100 text-rose-700",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    stat: "25+ Countries",
    href: "/services/business-visa",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Documentation",
    desc: "SOP drafting, embassy file audits & refusal letter analysis",
    tag: "Specialist",
    tagColor: "bg-cyan-100 text-cyan-700",
    color: "from-cyan-50 to-teal-50",
    border: "border-cyan-200",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    stat: "0% Errors",
    href: "/services/visa-documentation",
  },
];

// Destination countries loop
const destinations = ["🇨🇦 Canada", "🇦🇺 Australia", "🇬🇧 UK", "🇺🇸 USA", "🇩🇪 Germany", "🇳🇿 New Zealand"];

// Quick stat chips
const floatStats = [
  { label: "Visas Approved", value: "2500+", color: "bg-blue-50 border-blue-200", textColor: "text-blue-700", icon: <FileCheck className="w-4 h-4" /> },
  { label: "Countries", value: "25+", color: "bg-amber-50 border-amber-200", textColor: "text-amber-700", icon: <Globe2 className="w-4 h-4" /> },
  { label: "Success Rate", value: "98%", color: "bg-green-50 border-green-200", textColor: "text-green-700", icon: <Star className="w-4 h-4" /> },
];

// Services showcase panel — right side
const ServicesShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle through services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const active = services[activeIdx];

  return (
    <div className="w-full h-full flex flex-col gap-4 select-none">
      {/* Top row: destination ticker */}
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white/70 backdrop-blur-sm px-4 py-3 flex items-center gap-3 shadow-sm">
        <Plane className="w-4 h-4 text-blue-500 shrink-0 animate-pulse" />
        <div className="flex items-center gap-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-sm font-display font-black text-neutral-700 whitespace-nowrap"
            >
              Now processing: Ahmedabad → {destinations[activeIdx % destinations.length]}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-ping shrink-0" />
      </div>

      {/* Featured Active Service Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`rounded-3xl border-2 ${active.border} bg-gradient-to-br ${active.color} p-6 shadow-md relative overflow-hidden`}
        >
          {/* Decorative radial blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/50 blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4">
            <div className={`p-3 rounded-2xl ${active.iconBg} ${active.iconColor}`}>
              {active.icon}
            </div>
            <span className={`text-[10px] font-black font-display px-2.5 py-1 rounded-full ${active.tagColor}`}>
              {active.tag}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-display font-black text-neutral-800">{active.title}</h3>
          <p className="mt-1 text-sm text-neutral-500 leading-relaxed">{active.desc}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              {active.stat}
            </div>
            <Link
              href={active.href}
              className="flex items-center gap-1 text-xs font-black font-display text-neutral-700 hover:text-blue-600 transition-colors"
            >
              Learn More <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              key={activeIdx}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Service pills grid — all 6 services */}
      <div className="grid grid-cols-3 gap-2.5">
        {services.map((svc, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`group flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? `${svc.border} bg-gradient-to-br ${svc.color} shadow-md scale-105`
                : "border-neutral-100 bg-white/60 hover:bg-white hover:shadow-sm"
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${idx === activeIdx ? `${svc.iconBg} ${svc.iconColor}` : "bg-neutral-100 text-neutral-500 group-hover:bg-blue-50 group-hover:text-blue-600"}`}>
              {svc.icon}
            </div>
            <span className={`text-[10px] font-black font-display text-center leading-tight ${idx === activeIdx ? "text-neutral-800" : "text-neutral-500"}`}>
              {svc.title}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom stat strip */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { icon: <Users className="w-4 h-4" />, val: "2500+", label: "Clients Served", color: "text-blue-600" },
          { icon: <CheckCircle2 className="w-4 h-4" />, val: "98%", label: "Approval Rate", color: "text-green-600" },
          { icon: <Clock className="w-4 h-4" />, val: "6+ Yrs", label: "Experience", color: "text-amber-600" },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-2xl border border-neutral-100 bg-white/70 backdrop-blur-sm shadow-sm">
            <span className={s.color}>{s.icon}</span>
            <span className="text-sm font-black font-display text-neutral-800">{s.val}</span>
            <span className="text-[9px] text-neutral-400 font-medium text-center leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });

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
          ".hero-right",
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
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
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[300px] rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute -bottom-10 -right-20 w-[350px] h-[350px] rounded-full bg-yellow-100/40 blur-3xl" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #2563EB22 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 md:py-20 relative z-10">

        {/* Left: Text & CTAs */}
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
          <h1 className="clamp-title font-display font-black leading-none" style={{ color: "#1A1A1A" }}>
            <SplitText text="Your Global" type="words" />
            <br />
            <span className="relative">
              <SplitText text="Future," type="words" />
              <span
                className="relative ml-4 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #06b6d4)" }}
              >
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

        {/* Right: Services Showcase */}
        <div className="lg:col-span-6 w-full relative hero-right opacity-0 translate-x-8">
          <ServicesShowcase />
        </div>
      </div>

      {/* Scroll Indicator */}
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
