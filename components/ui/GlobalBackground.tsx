"use client";

import React from "react";
import { motion } from "framer-motion";

/* ── Realistic Commercial Passenger Jet SVG ── */
export const RealPlane = ({ size = 32, color = "#2563EB", className = "" }: { size?: number; color?: string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`pointer-events-none select-none ${className}`}>
    <path
      d="M32 4 C33.5 4 34.5 6 34.5 9 L35 24 L59 42 C60.5 43 60 44 58 44 L35.5 35 L35 52 L43 57 C44 58 43.5 59 42 59 L32 56.5 L22 59 C20.5 59 20 58 21 57 L29 52 L28.5 35 L6 44 C4 44 3.5 43 5 42 L29 24 L29.5 9 C29.5 6 30.5 4 32 4 Z"
      fill={color}
    />
  </svg>
);

/* ── Compass SVG ── */
export const CompassIcon = ({ size = 90, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
    <circle cx="45" cy="45" r="42" stroke={color} strokeWidth="1.5" strokeDasharray="5 4" />
    <circle cx="45" cy="45" r="28" stroke={color} strokeWidth="1" opacity="0.6" />
    <circle cx="45" cy="45" r="14" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <path d="M45 10 L49 45 L45 80 L41 45 Z" fill={color} opacity="0.35" />
    <path d="M10 45 L45 41 L80 45 L45 49 Z" fill={color} opacity="0.2" />
    <circle cx="45" cy="45" r="4" fill={color} opacity="0.5" />
    <text x="45" y="7" textAnchor="middle" fontSize="7" fill={color} opacity="0.7" fontWeight="bold">N</text>
    <text x="45" y="87" textAnchor="middle" fontSize="7" fill={color} opacity="0.7" fontWeight="bold">S</text>
    <text x="6" y="48" textAnchor="middle" fontSize="7" fill={color} opacity="0.7" fontWeight="bold">W</text>
    <text x="84" y="48" textAnchor="middle" fontSize="7" fill={color} opacity="0.7" fontWeight="bold">E</text>
  </svg>
);

/* ── Globe Wireframe SVG ── */
export const GlobeIcon = ({ size = 100, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.2" opacity="0.6" />
    <ellipse cx="50" cy="50" rx="22" ry="44" stroke={color} strokeWidth="1" opacity="0.45" />
    <ellipse cx="50" cy="50" rx="44" ry="14" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <ellipse cx="50" cy="50" rx="44" ry="28" stroke={color} strokeWidth="0.6" opacity="0.25" />
    <line x1="6" y1="50" x2="94" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <line x1="50" y1="6" x2="50" y2="94" stroke={color} strokeWidth="0.8" opacity="0.3" />
  </svg>
);

/* ── Flight Arc SVG ── */
export const FlightArcPath = ({ w = 280, h = 110, color = "#2563EB" }: { w?: number; h?: number; color?: string }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
    <path d={`M 15 ${h - 15} Q ${w / 2} 12 ${w - 15} ${h - 15}`} stroke={color} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.55" />
    <circle cx="15" cy={h - 15} r="4" fill={color} opacity="0.5" />
    <circle cx={w - 15} cy={h - 15} r="4" fill={color} opacity="0.5" />
    <circle cx={w / 2} cy="14" r="3" fill={color} opacity="0.35" />
  </svg>
);

/* ── Ambient color blobs (full page coverage) ── */
const BLOBS = [
  { x: "-5%",  y: "0%",   w: 700, c: "rgba(37,99,235,0.09)",    dur: 10 },
  { x: "55%",  y: "0%",   w: 600, c: "rgba(212,175,55,0.08)",   dur: 12 },
  { x: "20%",  y: "20%",  w: 800, c: "rgba(6,182,212,0.07)",    dur: 9  },
  { x: "65%",  y: "28%",  w: 600, c: "rgba(37,99,235,0.07)",    dur: 14 },
  { x: "-5%",  y: "45%",  w: 600, c: "rgba(212,175,55,0.08)",   dur: 11 },
  { x: "60%",  y: "50%",  w: 700, c: "rgba(16,185,129,0.07)",   dur: 13 },
  { x: "25%",  y: "65%",  w: 650, c: "rgba(139,92,246,0.06)",   dur: 10 },
  { x: "-5%",  y: "72%",  w: 550, c: "rgba(37,99,235,0.07)",    dur: 9  },
  { x: "65%",  y: "75%",  w: 600, c: "rgba(212,175,55,0.07)",   dur: 12 },
  { x: "30%",  y: "88%",  w: 700, c: "rgba(6,182,212,0.07)",    dur: 11 },
];

export default function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ background: "linear-gradient(160deg, #EFF6FF 0%, #FAFAF8 35%, #FDF8EE 70%, #F0F7FF 100%)" }}
    >
      {/* ── Ambient color blobs ── */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x, top: b.y,
            width: b.w, height: b.w,
            background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
        />
      ))}

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "42px 42px",
        }}
      />
    </div>
  );
}
