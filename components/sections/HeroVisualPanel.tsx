"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Shield, Globe2, GraduationCap,
  Briefcase, CheckCircle2, Star, MapPin
} from "lucide-react";

/* ─────────────────────────────────────────────
   DESTINATION COUNTRIES
   Added coords for HUD display
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
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

  // Listen for the preloaderFinished event to play the video
  useEffect(() => {
    const handleStartPlayback = () => {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay blocked by browser. User interaction needed to play audio.", err);
          setIsPlaying(false);
        });
      }
    };

    if (typeof window !== "undefined") {
      if ((window as Window & typeof globalThis & { __preloaderFinished?: boolean }).__preloaderFinished) {
        handleStartPlayback();
      } else {
        window.addEventListener("preloaderFinished", handleStartPlayback);
        return () => window.removeEventListener("preloaderFinished", handleStartPlayback);
      }
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = -(mouseY / (height / 2)) * 6; // Limit tilt range
    const rY = (mouseX / (width / 2)) * 6;
    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const dest = destinations[activeIdx];

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center select-none animate-float">
      {/* ── Ambient glow behind the panel ── */}
      <div
        className="absolute w-72 h-72 rounded-full pointer-events-none transition-all duration-700 blur-[50px] opacity-40 z-0 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${dest.color} 0%, transparent 70%)`,
        }}
      />

      {/* ── MAIN CINEMATIC VIDEO PORTAL VIEWPORT ── */}
      <motion.div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full max-w-[480px] aspect-[16/10] rounded-3xl bg-neutral-950 border border-neutral-800 p-1.5 shadow-2xl overflow-visible cursor-default"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "backOut" }}
      >
        {/* Animated Gradient Glow Border Overlay */}
        <div className="absolute -inset-0.5 rounded-[26px] bg-gradient-to-tr from-brand-blue to-brand-gold opacity-30 blur-sm pointer-events-none z-0" />

        {/* Video Viewport Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black z-10 flex items-center justify-center">
          {/* Grain scanlines pattern for technical HUD feel */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-overlay opacity-40 z-20" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40 z-20" />

          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src="/zeel-hero.mp4"
            className="w-full h-full object-cover z-10"
            loop
            muted={isMuted}
            playsInline
          />

          {/* ── Viewfinder HUD Overlays ── */}
          {/* Top-Left: Pulse & Status */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-widest text-white/90 z-30">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>PORTAL RADAR</span>
          </div>

          {/* Top-Right: Target Coords */}
          <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-mono text-white/80 tracking-wide z-30">
            {dest.coords}
          </div>

          {/* Bottom-Left: Live Connection Indicators */}
          <div className="absolute bottom-16 left-3.5 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[10px] font-mono text-white/90 flex flex-col gap-0.5 z-30 text-left">
            <span className="text-[7px] text-white/50 uppercase tracking-widest font-sans font-bold">STREAM SYSTEM</span>
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              FEED ONLINE
            </span>
          </div>

          {/* Bottom-Right: Target country telemetry */}
          <div className="absolute bottom-16 right-3.5 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white flex items-center gap-2.5 z-30 text-left">
            <span className="text-2xl leading-none">{dest.flag}</span>
            <div className="leading-none">
              <div className="text-[10px] font-black font-display tracking-wider text-brand-gold-light">{dest.name.toUpperCase()}</div>
              <div className="text-[8px] text-neutral-300 mt-0.5 font-medium">{dest.visa}</div>
            </div>
          </div>

          {/* ── Custom Glassmorphic Controls ── */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-3.5 bg-black/70 backdrop-blur-lg border border-white/15 px-4 py-2 rounded-full z-30 shadow-lg">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="text-white/80 hover:text-white transition-colors cursor-pointer p-0.5 focus:outline-none"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white/10" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>

            <div className="w-px h-3.5 bg-white/20" />

            {/* Mute/Unmute Action */}
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-all cursor-pointer text-[10px] font-mono uppercase font-black focus:outline-none"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-brand-gold-light" />
                  <span className="text-brand-gold-light tracking-wider animate-pulse">UNMUTE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 tracking-wider">MUTED</span>
                </>
              )}
            </button>

            {/* Micro Audio Equalizer Animation */}
            <div className="flex items-end gap-0.5 h-2.5 w-6 pb-0.5" aria-hidden="true">
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  className={`w-0.5 rounded-full ${isMuted ? "bg-white/20 h-0.5" : "bg-emerald-400"}`}
                  animate={!isMuted && isPlaying ? {
                    height: ["15%", "100%", "30%", "70%", "15%"]
                  } : { height: "20%" }}
                  transition={{
                    duration: 0.6 + bar * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── FLOATING PASSPORT CARD (overlays video bottom-right) ── */}
        <motion.div
          className="absolute -right-6 -bottom-10 z-30 w-56 rounded-2xl overflow-hidden border border-brand-blue/15 bg-white/95 backdrop-blur-md shadow-xl select-none"
          initial={{ y: 20, opacity: 0, rotate: 5 }}
          animate={{
            y: [0, -6, 0],
            opacity: 1,
            rotate: 5,
          }}
          transition={{
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { delay: 1.2, duration: 0.5 },
          }}
          whileHover={{ scale: 1.06, rotate: 0, zIndex: 40 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Header */}
          <div className="bg-brand-blue px-4 py-3 flex items-center justify-between text-white">
            <div>
              <p className="text-[7px] font-mono tracking-widest text-blue-200 uppercase leading-none">REPUBLIC OF INDIA</p>
              <p className="text-[10px] font-display font-black uppercase mt-0.5 leading-none">PASSPORT</p>
            </div>
            <Globe2 className="w-4 h-4 text-blue-300 animate-spin-slow" />
          </div>

          {/* Visa Info */}
          <div className="p-4 relative min-h-[95px] text-left">
            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">VISA STATUS DECK</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.25 }}
                className="mt-2 flex items-center gap-2.5"
              >
                <span className="text-2xl leading-none">{dest.flag}</span>
                <div>
                  <p className="text-xs font-display font-black text-brand-charcoal leading-none">{dest.name}</p>
                  <p className="text-[9px] text-brand-blue font-bold mt-0.5 leading-none">{dest.visa}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Approved Stamp */}
            <AnimatePresence>
              {stamped && (
                <motion.div
                  key={`stamp-${activeIdx}`}
                  initial={{ scale: 2.2, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 0.95, rotate: -10 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                  className="absolute bottom-3 right-3 z-20 border-2 rounded px-2 py-0.5 pointer-events-none"
                  style={{ borderColor: "#22c55e", color: "#22c55e" }}
                >
                  <p className="text-[8px] font-display font-black tracking-wider leading-none">APPROVED</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Machine Readable Footer */}
          <div className="bg-neutral-50 border-t border-neutral-100 px-4 py-2 font-mono text-[6.5px] text-neutral-400/80 tracking-widest leading-none truncate">
            P&lt;INDZEEL&lt;&lt;OVERSEAS&lt;&lt;{dest.name.toUpperCase()}&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          </div>
        </motion.div>
      </motion.div>

      {/* ── FLOATING STAT CARDS (Preserved and repositioned) ── */}
      {/* Top-Right: 2500+ Approved */}
      <motion.div
        className="absolute top-4 right-0 bg-white/95 backdrop-blur-md border border-brand-blue/10 rounded-2xl px-3 py-2.5 shadow-lg z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ delay: 1.5, duration: 0.5, y: { delay: 1.5, duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <div className="text-left">
            <p className="text-xs font-black font-display text-neutral-800">2500+ Approved</p>
            <p className="text-[9px] text-neutral-400 font-medium">Visas this year</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Left: Live Processing */}
      <motion.div
        className="absolute bottom-6 left-0 bg-white/95 backdrop-blur-md border border-brand-blue/10 rounded-2xl px-3 py-2.5 shadow-lg z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
        transition={{ delay: 1.8, duration: 0.5, y: { delay: 1.8, duration: 3.6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <div className="text-left">
            <p className="text-xs font-black font-display text-neutral-800">Live Processing</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={dest.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] text-neutral-400 font-medium"
              >
                {dest.flag} {dest.name} — {dest.visa}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Right: rating */}
      <motion.div
        className="absolute bottom-2 right-4 bg-white/95 backdrop-blur-md border border-brand-gold/20 rounded-2xl px-3.5 py-2 shadow-lg z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ delay: 2.0, duration: 0.5, y: { delay: 2.0, duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 fill-brand-gold text-brand-gold" />
          ))}
        </div>
        <p className="text-[9px] text-neutral-500 mt-0.5 font-display font-black tracking-wide text-left">4.9 · 500+ Reviews</p>
      </motion.div>

      {/* ── ORIGIN PIN ── */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <MapPin className="w-4.5 h-4.5 text-brand-blue" />
        <p className="text-[9px] font-display font-black text-brand-blue mt-0.5 tracking-wider bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-brand-blue/5">Ahmedabad, GJ</p>
      </motion.div>
    </div>
  );
}
