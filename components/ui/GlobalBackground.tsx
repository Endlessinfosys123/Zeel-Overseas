"use client";

import React from "react";
import { motion } from "framer-motion";

// Floating service-related SVG icons distributed across the page
const floatingIcons = [
  // Passport
  { icon: "🛂", x: "2%", y: "5%", delay: 0, dur: 5 },
  { icon: "✈️", x: "95%", y: "8%", delay: 1, dur: 6 },
  { icon: "📄", x: "1%", y: "22%", delay: 2, dur: 4.5 },
  { icon: "🌍", x: "97%", y: "28%", delay: 0.5, dur: 7 },
  { icon: "🎓", x: "3%", y: "42%", delay: 1.5, dur: 5.5 },
  { icon: "🏛️", x: "94%", y: "48%", delay: 0.8, dur: 6 },
  { icon: "🗺️", x: "2%", y: "63%", delay: 2.2, dur: 4 },
  { icon: "📋", x: "96%", y: "68%", delay: 1.2, dur: 5 },
  { icon: "🌐", x: "4%", y: "80%", delay: 0.3, dur: 6.5 },
  { icon: "🏆", x: "93%", y: "85%", delay: 1.8, dur: 4.5 },
  { icon: "💼", x: "1%", y: "93%", delay: 2.5, dur: 5 },
  { icon: "🗼", x: "95%", y: "95%", delay: 0.7, dur: 5.5 },
];

// Subtle background orbs for each section area
const bgOrbs = [
  { color: "rgba(37,99,235,0.06)", x: "10%", y: "15%", w: 500, h: 500, delay: 0 },
  { color: "rgba(212,175,55,0.06)", x: "60%", y: "10%", w: 400, h: 400, delay: 1 },
  { color: "rgba(6,182,212,0.05)", x: "30%", y: "35%", w: 600, h: 400, delay: 0.5 },
  { color: "rgba(37,99,235,0.05)", x: "75%", y: "45%", w: 450, h: 450, delay: 1.5 },
  { color: "rgba(212,175,55,0.05)", x: "5%", y: "60%", w: 350, h: 350, delay: 2 },
  { color: "rgba(6,182,212,0.04)", x: "55%", y: "70%", w: 500, h: 300, delay: 0.3 },
  { color: "rgba(37,99,235,0.04)", x: "20%", y: "85%", w: 400, h: 400, delay: 1.2 },
  { color: "rgba(212,175,55,0.04)", x: "70%", y: "88%", w: 350, h: 350, delay: 0.8 },
];

export const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Animated Background Orbs */}
      {bgOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.w,
            height: orb.h,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            delay: orb.delay,
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Service Emoji Icons (very subtle, along edges) */}
      {floatingIcons.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none"
          style={{ left: el.x, top: el.y }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.12, 0.22, 0.12],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            delay: el.delay + 1,
            duration: el.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(circle, #2563EB18 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Diagonal stripe very subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #2563EB 0px,
            #2563EB 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />
    </div>
  );
};

export default GlobalBackground;
