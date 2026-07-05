"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Globe2, GraduationCap,
  Briefcase, Shield, Plane, MapPin, FileText, Star
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESTINATION COUNTRIES
───────────────────────────────────────────── */
const destinations = [
  { flag: "🇨🇦", name: "Canada",      color: "#ef4444", bg: "#fff1f1", visa: "Express Entry PR",   time: "6 months",  icon: <Shield className="w-4 h-4" /> },
  { flag: "🇦🇺", name: "Australia",   color: "#f59e0b", bg: "#fffbeb", visa: "Student Visa 500",   time: "4 weeks",   icon: <GraduationCap className="w-4 h-4" /> },
  { flag: "🇬🇧", name: "UK",          color: "#3b82f6", bg: "#eff6ff", visa: "Skilled Worker",     time: "8 weeks",   icon: <Briefcase className="w-4 h-4" /> },
  { flag: "🇺🇸", name: "USA",         color: "#8b5cf6", bg: "#f5f3ff", visa: "F-1 Student",        time: "3 weeks",   icon: <GraduationCap className="w-4 h-4" /> },
  { flag: "🇩🇪", name: "Germany",     color: "#10b981", bg: "#ecfdf5", visa: "EU Blue Card",       time: "10 weeks",  icon: <Briefcase className="w-4 h-4" /> },
  { flag: "🇳🇿", name: "New Zealand", color: "#06b6d4", bg: "#ecfeff", visa: "Work Visa",          time: "6 weeks",   icon: <Globe2 className="w-4 h-4" /> },
];

/* ─────────────────────────────────────────────
   FLOATING DOCUMENT CARDS (behind passport)
───────────────────────────────────────────── */
const docCards = [
  { label: "SOP",          angle: -25, radius: 180, delay: 0,   color: "#dbeafe", border: "#93c5fd" },
  { label: "IELTS 7.5",   angle: 40,  radius: 170, delay: 0.4, color: "#fef3c7", border: "#fcd34d" },
  { label: "Offer Letter", angle: 105, radius: 185, delay: 0.8, color: "#d1fae5", border: "#6ee7b7" },
  { label: "Bank Proof",   angle: 170, radius: 175, delay: 1.2, color: "#ede9fe", border: "#c4b5fd" },
  { label: "Passport",     angle: 235, radius: 180, delay: 1.6, color: "#fee2e2", border: "#fca5a5" },
  { label: "Embassy Doc",  angle: 300, radius: 170, delay: 2.0, color: "#cffafe", border: "#67e8f9" },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HeroVisualPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stamped, setStamped] = useState(false);

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

  const dest = destinations[activeIdx];

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center select-none">

      {/* ── Ambient glow behind everything ── */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${dest.color}30 0%, transparent 70%)`,
          filter: "blur(40px)",
          transition: "background 0.6s ease",
        }}
      />

      {/* ── Orbiting Document Pills ── */}
      {docCards.map((doc, i) => {
        const rad = (doc.angle * Math.PI) / 180;
        const x = Math.cos(rad) * doc.radius;
        const y = Math.sin(rad) * doc.radius;
        return (
          <motion.div
            key={doc.label}
            className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-display font-black border shadow-sm"
            style={{
              background: doc.color,
              borderColor: doc.border,
              color: "#374151",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [x, x + 4, x - 4, x],
              y: [y, y - 6, y + 6, y],
            }}
            transition={{
              opacity: { delay: doc.delay + 1, duration: 0.5 },
              scale:   { delay: doc.delay + 1, duration: 0.5 },
              x: { delay: doc.delay + 1, duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
              y: { delay: doc.delay + 1, duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <FileText className="w-3 h-3" style={{ color: doc.border }} />
            {doc.label}
          </motion.div>
        );
      })}

      {/* ── CENTRAL PASSPORT CARD ── */}
      <motion.div
        className="relative z-10 w-64"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "backOut" }}
      >
        {/* Passport book */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1e3a8a, #1d4ed8)",
            boxShadow: "0 30px 60px -10px rgba(37,99,235,0.4), 0 10px 20px -5px rgba(0,0,0,0.15)",
          }}
        >
          {/* Passport header */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-display font-black tracking-[0.2em] text-blue-200 uppercase">Republic of India</p>
                <p className="text-lg font-display font-black text-white mt-0.5">PASSPORT</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-blue-400/50 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-blue-300" />
              </div>
            </div>
            <div className="mt-3 h-px bg-blue-600/60" />
          </div>

          {/* Visa stamp area */}
          <div className="px-5 pb-3">
            <p className="text-[9px] font-display font-black tracking-widest text-blue-300 uppercase mb-2">Visa Entry</p>

            {/* Destination flag + name — animates per cycle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3"
              >
                <span className="text-4xl">{dest.flag}</span>
                <div>
                  <p className="text-xl font-display font-black text-white leading-none">{dest.name}</p>
                  <p className="text-[11px] text-blue-200 mt-0.5">{dest.visa}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Approval Stamp */}
            <AnimatePresence>
              {stamped && (
                <motion.div
                  key={`stamp-${activeIdx}`}
                  initial={{ scale: 2, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                  className="absolute top-14 right-4 z-20 border-4 rounded-lg px-2 py-1 pointer-events-none"
                  style={{ borderColor: "#22c55e", color: "#22c55e" }}
                >
                  <p className="text-[10px] font-display font-black tracking-wider">APPROVED</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info strip */}
          <div className="mx-4 mb-4 rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Processing", value: dest.time },
                { label: "Success", value: "98%" },
                { label: "Type", value: "Zeel Expert" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-[10px] font-black font-display text-white leading-none">{item.value}</p>
                  <p className="text-[8px] text-blue-300 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Machine readable zone */}
          <div className="px-5 py-3" style={{ background: "rgba(0,0,0,0.3)" }}>
            <p className="text-[8px] font-mono text-blue-400/70 leading-4 tracking-widest truncate">
              P&lt;INDZEEL&lt;&lt;OVERSEAS&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
            </p>
            <p className="text-[8px] font-mono text-blue-400/70 leading-4 tracking-widest truncate">
              ZL24019826&lt;1IND8502147M2812310&lt;&lt;&lt;&lt;&lt;&lt;&lt;6
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── FLOATING STAT CARDS ── */}
      {/* Top-right: approved count */}
      <motion.div
        className="absolute top-4 right-0 bg-white/90 backdrop-blur-md border border-green-200 rounded-2xl px-3 py-2.5 shadow-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ delay: 1.5, duration: 0.5, y: { delay: 1.5, duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <div>
            <p className="text-xs font-black font-display text-neutral-800">2500+ Approved</p>
            <p className="text-[9px] text-neutral-400">Visas this year</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left: live processing */}
      <motion.div
        className="absolute bottom-8 left-0 bg-white/90 backdrop-blur-md border border-blue-200 rounded-2xl px-3 py-2.5 shadow-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
        transition={{ delay: 1.8, duration: 0.5, y: { delay: 1.8, duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <div>
            <p className="text-xs font-black font-display text-neutral-800">Live Processing</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={dest.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] text-neutral-400"
              >
                {dest.flag} {dest.name} — {dest.visa}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom-right: rating */}
      <motion.div
        className="absolute bottom-4 right-2 bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl px-3 py-2.5 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ delay: 2.0, duration: 0.5, y: { delay: 2.0, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-[9px] text-neutral-500 mt-0.5 font-display font-bold">4.9 · 500+ Reviews</p>
      </motion.div>

      {/* ── DESTINATION DOTS (progress indicator) ── */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {destinations.map((d, i) => (
          <button
            key={d.name}
            onClick={() => { setActiveIdx(i); setStamped(false); setTimeout(() => setStamped(true), 600); }}
            className="relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 cursor-pointer"
            style={{
              borderColor: i === activeIdx ? dest.color : "#e5e7eb",
              background: i === activeIdx ? dest.bg : "white",
            }}
          >
            <span className="text-sm">{d.flag}</span>
          </button>
        ))}
      </div>

      {/* ── FLYING PLANE path ── */}
      <motion.div
        className="absolute pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [-80, 80],
          y: [-20, -60],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      >
        <Plane className="w-5 h-5 text-blue-500 rotate-12" />
      </motion.div>

      {/* ── ORIGIN PIN ── */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-5 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <MapPin className="w-4 h-4 text-blue-600" />
        <p className="text-[8px] font-display font-black text-blue-600 mt-0.5">Ahmedabad, GJ</p>
      </motion.div>
    </div>
  );
}
