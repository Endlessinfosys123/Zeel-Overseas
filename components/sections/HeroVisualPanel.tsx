"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Globe2, GraduationCap,
  Briefcase, CheckCircle2, Star, MapPin
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESTINATION COUNTRIES
───────────────────────────────────────────── */
const destinations = [
  { flag: "🇨🇦", name: "Canada",      color: "#ef4444", bg: "#fff1f1", visa: "Express Entry PR",   time: "6 months",  coords: "45.4215° N, 75.6972° W",  icon: <Shield className="w-3 h-3" /> },
  { flag: "🇦🇺", name: "Australia",   color: "#f59e0b", bg: "#fffbeb", visa: "Student Visa 500",   time: "4 weeks",   coords: "35.2809° S, 149.1300° E", icon: <GraduationCap className="w-3 h-3" /> },
  { flag: "🇬🇧", name: "UK",          color: "#3b82f6", bg: "#eff6ff", visa: "Skilled Worker",     time: "8 weeks",   coords: "51.5074° N, 0.1278° W",   icon: <Briefcase className="w-3 h-3" /> },
  { flag: "🇺🇸", name: "USA",         color: "#8b5cf6", bg: "#f5f3ff", visa: "F-1 Student",        time: "3 weeks",   coords: "38.9072° N, 77.0369° W",  icon: <GraduationCap className="w-3 h-3" /> },
  { flag: "🇩🇪", name: "Germany",     color: "#10b981", bg: "#ecfdf5", visa: "EU Blue Card",       time: "10 weeks",  coords: "52.5200° N, 13.4050° E",  icon: <Briefcase className="w-3 h-3" /> },
  { flag: "🇳🇿", name: "New Zealand", color: "#06b6d4", bg: "#ecfeff", visa: "Work Visa",          time: "6 weeks",   coords: "41.2865° S, 174.7762° E", icon: <Globe2 className="w-3 h-3" /> },
];

export default function HeroVisualPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stamped, setStamped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-cycle destinations
  useEffect(() => {
    const interval = setInterval(() => {
      setStamped(false);
      setTimeout(() => {
        setActiveIdx((p) => (p + 1) % destinations.length);
        setTimeout(() => setStamped(true), 600);
      }, 300);
    }, 3500);
    setStamped(true);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = -(mouseY / (height / 2)) * 10; // Limit tilt range to 10 degrees
    const rY = (mouseX / (width / 2)) * 10;
    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const dest = destinations[activeIdx];

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[520px] flex items-center justify-center select-none cursor-default"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* ── CENTRAL PASSPORT CARD (Focal Point, Depth translateZ=50px) ── */}
      <motion.div
        className="relative z-10 w-64 rounded-3xl overflow-hidden border border-brand-blue/15 bg-white/95 backdrop-blur-md shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "backOut" }}
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Header */}
        <div className="bg-brand-blue px-5 py-4 flex items-center justify-between text-white">
          <div>
            <p className="text-[7.5px] font-mono tracking-widest text-blue-200 uppercase leading-none">REPUBLIC OF INDIA</p>
            <p className="text-sm font-display font-black uppercase mt-0.5 leading-none">PASSPORT</p>
          </div>
          <Globe2 className="w-5 h-5 text-blue-300 animate-spin-slow" />
        </div>

        {/* Visa Stamp Area */}
        <div className="p-5 relative min-h-[105px] text-left">
          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">VISA STATUS</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              className="mt-2.5 flex items-center gap-3"
            >
              <span className="text-3.5xl leading-none">{dest.flag}</span>
              <div>
                <p className="text-sm font-display font-black text-brand-charcoal leading-none">{dest.name}</p>
                <p className="text-[10px] text-brand-blue font-bold mt-1 leading-none">{dest.visa}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Approved Stamp */}
          <AnimatePresence>
            {stamped && (
              <motion.div
                key={`stamp-${activeIdx}`}
                initial={{ scale: 2.2, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 0.95, rotate: -12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="absolute bottom-3.5 right-4 z-20 border-2 rounded px-2.5 py-0.5 pointer-events-none"
                style={{ borderColor: "#22c55e", color: "#22c55e" }}
              >
                <p className="text-[9px] font-display font-black tracking-wider leading-none">APPROVED</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Machine Readable Footer */}
        <div className="bg-neutral-50 border-t border-neutral-100 px-5 py-2.5 font-mono text-[7px] text-neutral-400/80 tracking-widest leading-none truncate">
          P&lt;INDZEEL&lt;&lt;OVERSEAS&lt;&lt;{dest.name.toUpperCase()}&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </div>
      </motion.div>

      {/* ── FLOATING STAT CARDS (Arranged in 3D depth space) ── */}

      {/* Top-Right: 2500+ Approved (Depth translateZ=30px) */}
      <motion.div
        className="absolute top-8 right-2 bg-white/95 backdrop-blur-md border border-brand-blue/10 rounded-2xl px-3.5 py-2.5 shadow-lg z-20 text-left"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ delay: 1.5, duration: 0.5, y: { delay: 1.5, duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <div>
            <p className="text-xs font-black font-display text-neutral-800">2500+ Approved</p>
            <p className="text-[9px] text-neutral-400 font-medium mt-0.5">Visas this year</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Left: Live Processing (Depth translateZ=40px) */}
      <motion.div
        className="absolute bottom-10 left-0 bg-white/95 backdrop-blur-md border border-brand-blue/10 rounded-2xl px-3.5 py-2.5 shadow-lg z-20 text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
        transition={{ delay: 1.8, duration: 0.5, y: { delay: 1.8, duration: 3.6, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <div>
            <p className="text-xs font-black font-display text-neutral-800">Live Processing</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={dest.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] text-neutral-400 font-medium mt-0.5"
              >
                {dest.flag} {dest.name} — {dest.visa}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Right: 5-Star Rating (Depth translateZ=20px) */}
      <motion.div
        className="absolute bottom-6 right-4 bg-white/95 backdrop-blur-md border border-brand-gold/20 rounded-2xl px-4 py-2 shadow-lg z-20 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ delay: 2.0, duration: 0.5, y: { delay: 2.0, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 fill-brand-gold text-brand-gold" />
          ))}
        </div>
        <p className="text-[9px] text-neutral-500 mt-1 font-display font-black tracking-wide">4.9 · 500+ Reviews</p>
      </motion.div>

      {/* Top-Left: Active Radar Status Badge (Depth translateZ=15px) */}
      <motion.div
        className="absolute top-12 left-6 bg-white/95 backdrop-blur-md border border-brand-blue/10 rounded-2xl px-3 py-2 shadow-lg z-20 text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, 4, 0] }}
        transition={{ delay: 1.3, duration: 0.5, y: { delay: 1.3, duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transform: "translateZ(15px)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest font-black leading-none">RADAR: LINK OK</span>
        </div>
      </motion.div>

      {/* ── ORIGIN PIN (Depth translateZ=25px) ── */}
      <motion.div
        className="absolute top-[34%] left-[10%] flex flex-col items-center z-20 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        style={{ transform: "translateZ(25px)" }}
      >
        <MapPin className="w-4.5 h-4.5 text-brand-blue" />
        <p className="text-[9px] font-display font-black text-brand-blue mt-0.5 tracking-wider bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-brand-blue/5">Gandhinagar, GJ</p>
      </motion.div>
    </div>
  );
}
