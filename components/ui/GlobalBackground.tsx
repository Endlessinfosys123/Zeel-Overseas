"use client";

import React from "react";
import { motion } from "framer-motion";

/* ── Paper Plane SVG ── */
const PaperPlane = ({ size = 28, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M25 3L13 15M25 3L17 25L13 15M25 3L3 11L13 15" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Compass SVG ── */
const Compass = ({ size = 90, color = "#2563EB" }: { size?: number; color?: string }) => (
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
const Globe = ({ size = 100, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.2" opacity="0.6" />
    <ellipse cx="50" cy="50" rx="22" ry="44" stroke={color} strokeWidth="1" opacity="0.45" />
    <ellipse cx="50" cy="50" rx="44" ry="14" stroke={color} strokeWidth="0.8" opacity="0.4" />
    <ellipse cx="50" cy="50" rx="44" ry="28" stroke={color} strokeWidth="0.6" opacity="0.25" />
    <line x1="6" y1="50" x2="94" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <line x1="50" y1="6" x2="50" y2="94" stroke={color} strokeWidth="0.8" opacity="0.3" />
  </svg>
);

/* ── Visa Stamp SVG ── */
const VisaStamp = ({ size = 75, color = "#D4AF37" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 75 75" fill="none">
    <rect x="5" y="5" width="65" height="65" rx="6" stroke={color} strokeWidth="2" strokeDasharray="5 3" />
    <rect x="13" y="13" width="49" height="49" rx="4" stroke={color} strokeWidth="1.2" opacity="0.7" />
    <text x="37.5" y="32" textAnchor="middle" fontSize="9" fill={color} opacity="0.8" fontWeight="bold" letterSpacing="1">VISA</text>
    <text x="37.5" y="44" textAnchor="middle" fontSize="7" fill={color} opacity="0.65">APPROVED</text>
    <path d="M18 52 L57 52" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <circle cx="37.5" cy="60" r="3" fill={color} opacity="0.5" />
  </svg>
);

/* ── Flight Arc SVG ── */
const FlightArc = ({ w = 280, h = 110, color = "#2563EB" }: { w?: number; h?: number; color?: string }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
    <path d={`M 15 ${h - 15} Q ${w / 2} 12 ${w - 15} ${h - 15}`} stroke={color} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.55" />
    <circle cx="15" cy={h - 15} r="4" fill={color} opacity="0.5" />
    <circle cx={w - 15} cy={h - 15} r="4" fill={color} opacity="0.5" />
    <circle cx={w / 2} cy="14" r="3" fill={color} opacity="0.35" />
  </svg>
);

/* ── Document/SOP Icon ── */
const DocIcon = ({ size = 55, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 55 70" fill="none">
    <rect x="5" y="5" width="45" height="60" rx="5" stroke={color} strokeWidth="1.5" opacity="0.55" />
    <path d="M14 20 L41 20" stroke={color} strokeWidth="1.2" opacity="0.4" />
    <path d="M14 30 L41 30" stroke={color} strokeWidth="1.2" opacity="0.4" />
    <path d="M14 40 L30 40" stroke={color} strokeWidth="1.2" opacity="0.4" />
    <path d="M14 50 L35 50" stroke={color} strokeWidth="1" opacity="0.3" />
    <path d="M32 5 L32 18 L45 18" stroke={color} strokeWidth="1.2" opacity="0.4" />
  </svg>
);

/* ── Passport Book SVG ── */
const PassportIcon = ({ size = 60, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 60 78" fill="none">
    <rect x="4" y="4" width="52" height="70" rx="5" stroke={color} strokeWidth="1.5" opacity="0.55" />
    <rect x="4" y="4" width="8" height="70" rx="3" fill={color} opacity="0.12" />
    <circle cx="34" cy="28" r="10" stroke={color} strokeWidth="1.2" opacity="0.45" />
    <path d="M34 18 L34 38 M24 28 L44 28" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <path d="M14 48 L46 48" stroke={color} strokeWidth="1" opacity="0.35" />
    <path d="M14 54 L46 54" stroke={color} strokeWidth="0.8" opacity="0.25" />
    <path d="M14 60 L36 60" stroke={color} strokeWidth="0.8" opacity="0.25" />
    <text x="30" y="43" textAnchor="middle" fontSize="5" fill={color} opacity="0.5" fontWeight="bold">PASSPORT</text>
  </svg>
);

/* ── All floating elements placed across the full page height ── */
const ELEMENTS = [
  // === ROW 1 — top 0-15% ===
  { type: "plane",    x: "3%",   y: "3%",   rot: 25,  color: "#2563EB", size: 26, delay: 0,   dur: 5   },
  { type: "flag",     x: "15%",  y: "5%",   rot: 0,   color: "",        size: 28, delay: 0.3, dur: 4.5, flag: "🇨🇦" },
  { type: "globe",    x: "78%",  y: "2%",   rot: 10,  color: "#06b6d4", size: 80, delay: 0.8, dur: 7   },
  { type: "flag",     x: "90%",  y: "4%",   rot: 0,   color: "",        size: 28, delay: 0.5, dur: 5,   flag: "🇦🇺" },

  // === ROW 2 — 15-30% ===
  { type: "stamp",    x: "1%",   y: "17%",  rot: -18, color: "#D4AF37", size: 70, delay: 1,   dur: 6   },
  { type: "arc",      x: "12%",  y: "16%",  rot: 0,   color: "#2563EB", size: 260, delay: 0,  dur: 0   },
  { type: "plane",    x: "88%",  y: "18%",  rot: -20, color: "#D4AF37", size: 24, delay: 1.5, dur: 5.5 },
  { type: "flag",     x: "95%",  y: "22%",  rot: 0,   color: "",        size: 28, delay: 1,   dur: 6,   flag: "🇬🇧" },

  // === ROW 3 — 30-45% ===
  { type: "doc",      x: "2%",   y: "32%",  rot: 12,  color: "#2563EB", size: 55, delay: 0.5, dur: 5   },
  { type: "compass",  x: "82%",  y: "30%",  rot: 0,   color: "#D4AF37", size: 85, delay: 0,   dur: 0   },
  { type: "flag",     x: "6%",   y: "40%",  rot: 0,   color: "",        size: 28, delay: 1.2, dur: 4.5, flag: "🇺🇸" },
  { type: "plane",    x: "92%",  y: "38%",  rot: 15,  color: "#10b981", size: 26, delay: 0.8, dur: 6   },

  // === ROW 4 — 45-60% ===
  { type: "passport", x: "1%",   y: "47%",  rot: -8,  color: "#8b5cf6", size: 55, delay: 1.5, dur: 7   },
  { type: "arc",      x: "55%",  y: "46%",  rot: 180, color: "#D4AF37", size: 240, delay: 0,  dur: 0   },
  { type: "flag",     x: "90%",  y: "52%",  rot: 0,   color: "",        size: 28, delay: 0.6, dur: 5,   flag: "🇩🇪" },
  { type: "stamp",    x: "88%",  y: "55%",  rot: 15,  color: "#10b981", size: 65, delay: 0.3, dur: 5.5 },

  // === ROW 5 — 60-75% ===
  { type: "globe",    x: "3%",   y: "60%",  rot: -5,  color: "#2563EB", size: 85, delay: 0.8, dur: 8   },
  { type: "plane",    x: "15%",  y: "68%",  rot: -30, color: "#06b6d4", size: 24, delay: 1,   dur: 5   },
  { type: "flag",     x: "7%",   y: "73%",  rot: 0,   color: "",        size: 28, delay: 1.3, dur: 6,   flag: "🇳🇿" },
  { type: "doc",      x: "89%",  y: "62%",  rot: -12, color: "#06b6d4", size: 52, delay: 0.4, dur: 5.5 },

  // === ROW 6 — 75-90% ===
  { type: "compass",  x: "1%",   y: "78%",  rot: 0,   color: "#2563EB", size: 80, delay: 0,   dur: 0   },
  { type: "arc",      x: "20%",  y: "76%",  rot: 20,  color: "#10b981", size: 220, delay: 0,  dur: 0   },
  { type: "flag",     x: "88%",  y: "78%",  rot: 0,   color: "",        size: 28, delay: 0.7, dur: 5,   flag: "🇸🇬" },
  { type: "stamp",    x: "2%",   y: "85%",  rot: 20,  color: "#8b5cf6", size: 60, delay: 1.2, dur: 6   },
  { type: "plane",    x: "90%",  y: "84%",  rot: 30,  color: "#2563EB", size: 26, delay: 0.5, dur: 5   },

  // === ROW 7 — 90-100% (footer zone) ===
  { type: "passport", x: "85%",  y: "91%",  rot: 10,  color: "#D4AF37", size: 50, delay: 0.8, dur: 6   },
  { type: "flag",     x: "5%",   y: "93%",  rot: 0,   color: "",        size: 28, delay: 1.0, dur: 5,   flag: "🇫🇷" },
  { type: "globe",    x: "44%",  y: "90%",  rot: 0,   color: "#06b6d4", size: 70, delay: 0.3, dur: 7   },
  { type: "flag",     x: "55%",  y: "95%",  rot: 0,   color: "",        size: 28, delay: 1.5, dur: 4.5, flag: "🇪🇺" },
];

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

      {/* ── Horizontal dashed runway lines ── */}
      {["10%","25%","40%","55%","68%","82%","93%"].map((y, i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{ top: y, borderTop: `1px dashed rgba(37,99,235,${i % 2 === 0 ? 0.12 : 0.08})` }}
        />
      ))}

      {/* ── All floating elements ── */}
      {ELEMENTS.map((el, i) => {
        const floatY  = el.type === "arc" || el.type === "compass" ? [0, 0] : [0, -12, 0];
        const floatDur = el.type === "arc" || el.type === "compass" ? 1 : (el.dur || 5);
        const opacity  = el.type === "arc"     ? [0.45, 0.55, 0.45]
                       : el.type === "compass"  ? [0.3,  0.4,  0.3]
                       : el.type === "globe"    ? [0.28, 0.38, 0.28]
                       : el.type === "stamp"    ? [0.3,  0.45, 0.3]
                       : el.type === "passport" ? [0.3,  0.42, 0.3]
                       : el.type === "doc"      ? [0.3,  0.42, 0.3]
                       : el.type === "flag"     ? [0.45, 0.65, 0.45]
                       : /* plane */              [0.5,  0.7,  0.5];

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: el.x,
              top: el.y,
              rotate: el.rot,
            }}
            animate={{
              y: floatY,
              opacity,
              rotate: el.type === "compass" ? [el.rot, el.rot + 360] : el.rot,
            }}
            transition={{
              y:       { duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: el.delay },
              opacity: { duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: el.delay },
              rotate:  el.type === "compass"
                ? { duration: 50, repeat: Infinity, ease: "linear" }
                : undefined,
            }}
          >
            {el.type === "plane"    && <PaperPlane size={el.size} color={el.color} />}
            {el.type === "flag"     && <span style={{ fontSize: el.size }}>{(el as { flag?: string }).flag}</span>}
            {el.type === "globe"    && <Globe     size={el.size} color={el.color} />}
            {el.type === "compass"  && <Compass   size={el.size} color={el.color} />}
            {el.type === "stamp"    && <VisaStamp size={el.size} color={el.color} />}
            {el.type === "arc"      && <FlightArc w={el.size}  h={Math.round(el.size * 0.4)} color={el.color} />}
            {el.type === "doc"      && <DocIcon   size={el.size} color={el.color} />}
            {el.type === "passport" && <PassportIcon size={el.size} color={el.color} />}
          </motion.div>
        );
      })}

      {/* ── Flying paper planes across full width ── */}
      {[
        { sy: "8%",  ey: "5%",  delay: 0,   dur: 14, color: "#2563EB",  dir: 1  },
        { sy: "22%", ey: "19%", delay: 5,   dur: 16, color: "#D4AF37",  dir: -1 },
        { sy: "38%", ey: "36%", delay: 2,   dur: 13, color: "#06b6d4",  dir: 1  },
        { sy: "52%", ey: "55%", delay: 7,   dur: 15, color: "#10b981",  dir: -1 },
        { sy: "67%", ey: "64%", delay: 3,   dur: 17, color: "#8b5cf6",  dir: 1  },
        { sy: "80%", ey: "83%", delay: 9,   dur: 14, color: "#2563EB",  dir: -1 },
        { sy: "93%", ey: "91%", delay: 4,   dur: 16, color: "#D4AF37",  dir: 1  },
      ].map((p, i) => (
        <motion.div
          key={`plane-${i}`}
          className="absolute pointer-events-none"
          style={{ top: p.sy, left: p.dir === 1 ? "-3%" : "103%" }}
          animate={{
            left: p.dir === 1 ? ["-3%", "103%"] : ["103%", "-3%"],
            top: [p.sy, p.ey],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            delay: p.delay,
            duration: p.dur,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "linear",
          }}
        >
          <PaperPlane size={22} color={p.color} />
        </motion.div>
      ))}
    </div>
  );
}
