"use client";

import React from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   PAPER PLANE SVG
───────────────────────────────────────────── */
const PaperPlane = ({ size = 24, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   COMPASS SVG
───────────────────────────────────────────── */
const CompassSvg = ({ size = 60, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="28" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" />
    <circle cx="30" cy="30" r="18" stroke={color} strokeWidth="0.8" opacity="0.5" />
    <path d="M30 8 L33 30 L30 52 L27 30 Z" fill={color} opacity="0.3" />
    <path d="M8 30 L30 27 L52 30 L30 33 Z" fill={color} opacity="0.15" />
    <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
    <text x="30" y="5" textAnchor="middle" fontSize="5" fill={color} opacity="0.6" fontWeight="bold">N</text>
    <text x="30" y="58" textAnchor="middle" fontSize="5" fill={color} opacity="0.6" fontWeight="bold">S</text>
    <text x="5" y="32" textAnchor="middle" fontSize="5" fill={color} opacity="0.6" fontWeight="bold">W</text>
    <text x="55" y="32" textAnchor="middle" fontSize="5" fill={color} opacity="0.6" fontWeight="bold">E</text>
  </svg>
);

/* ─────────────────────────────────────────────
   PASSPORT STAMP SVG
───────────────────────────────────────────── */
const StampSvg = ({ size = 50, color = "#D4AF37" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
    <rect x="4" y="4" width="42" height="42" rx="4" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
    <rect x="10" y="10" width="30" height="30" rx="2" stroke={color} strokeWidth="1" opacity="0.6" />
    <text x="25" y="22" textAnchor="middle" fontSize="6" fill={color} opacity="0.7" fontWeight="bold">VISA</text>
    <text x="25" y="32" textAnchor="middle" fontSize="5" fill={color} opacity="0.5">APPROVED</text>
    <path d="M14 36 L36 36" stroke={color} strokeWidth="1" opacity="0.5" />
  </svg>
);

/* ─────────────────────────────────────────────
   GLOBE SVG
───────────────────────────────────────────── */
const GlobeSvg = ({ size = 70, color = "#2563EB" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 70 70" fill="none">
    <circle cx="35" cy="35" r="30" stroke={color} strokeWidth="1" opacity="0.4" />
    <ellipse cx="35" cy="35" rx="15" ry="30" stroke={color} strokeWidth="1" opacity="0.3" />
    <ellipse cx="35" cy="35" rx="30" ry="10" stroke={color} strokeWidth="0.8" opacity="0.3" />
    <line x1="5" y1="35" x2="65" y2="35" stroke={color} strokeWidth="0.8" opacity="0.25" />
    <line x1="35" y1="5" x2="35" y2="65" stroke={color} strokeWidth="0.8" opacity="0.25" />
    <ellipse cx="35" cy="35" rx="22" ry="6" stroke={color} strokeWidth="0.6" opacity="0.2" />
  </svg>
);

/* ─────────────────────────────────────────────
   FLIGHT PATH CURVED SVG
───────────────────────────────────────────── */
const FlightPathSvg = ({ w = 200, h = 80, color = "#2563EB" }: { w?: number; h?: number; color?: string }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
    <path
      d={`M 10 ${h - 10} Q ${w / 2} 10 ${w - 10} ${h - 10}`}
      stroke={color}
      strokeWidth="1"
      strokeDasharray="5 4"
      opacity="0.35"
    />
    {/* Small circles on the path ends */}
    <circle cx="10" cy={h - 10} r="3" fill={color} opacity="0.4" />
    <circle cx={w - 10} cy={h - 10} r="3" fill={color} opacity="0.4" />
  </svg>
);



/* ─────────────────────────────────────────────
   COUNTRY FLAG BUBBLES
───────────────────────────────────────────── */
const flags = [
  { flag: "🇨🇦", x: "6%", y: "12%", delay: 0 },
  { flag: "🇦🇺", x: "90%", y: "8%", delay: 0.5 },
  { flag: "🇬🇧", x: "4%", y: "48%", delay: 1.0 },
  { flag: "🇺🇸", x: "92%", y: "52%", delay: 1.5 },
  { flag: "🇩🇪", x: "7%", y: "82%", delay: 2.0 },
  { flag: "🇳🇿", x: "88%", y: "80%", delay: 2.5 },
  { flag: "🇫🇷", x: "50%", y: "4%", delay: 1.2 },
  { flag: "🇸🇬", x: "50%", y: "93%", delay: 0.8 },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
      style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #fafaf8 40%, #fdf8ee 80%, #f0f7ff 100%)" }}
    >

      {/* ── Large ambient blobs ── */}
      {[
        { x: "-8%", y: "-5%", w: 600, c: "rgba(37,99,235,0.07)", dur: 10 },
        { x: "60%", y: "-3%", w: 500, c: "rgba(212,175,55,0.07)", dur: 12 },
        { x: "20%", y: "35%", w: 700, c: "rgba(6,182,212,0.05)", dur: 9 },
        { x: "70%", y: "50%", w: 500, c: "rgba(37,99,235,0.05)", dur: 14 },
        { x: "-5%", y: "70%", w: 450, c: "rgba(212,175,55,0.06)", dur: 11 },
        { x: "55%", y: "80%", w: 550, c: "rgba(16,185,129,0.05)", dur: 13 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: blob.x, top: blob.y,
            width: blob.w, height: blob.w,
            background: `radial-gradient(circle, ${blob.c} 0%, transparent 70%)`,
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: blob.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #2563EB 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── Flight path curves (SVG arcs across screen) ── */}
      <div className="absolute top-[8%] left-[5%] opacity-40">
        <FlightPathSvg w={220} h={90} color="#2563EB" />
      </div>
      <div className="absolute bottom-[12%] right-[4%] rotate-180 opacity-30">
        <FlightPathSvg w={200} h={70} color="#D4AF37" />
      </div>
      <div className="absolute top-[40%] right-[2%] -rotate-45 opacity-25">
        <FlightPathSvg w={160} h={60} color="#06b6d4" />
      </div>
      <div className="absolute bottom-[30%] left-[3%] rotate-12 opacity-25">
        <FlightPathSvg w={180} h={65} color="#2563EB" />
      </div>

      {/* ── Compass roses ── */}
      <motion.div
        className="absolute top-[5%] right-[8%] opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <CompassSvg size={80} color="#2563EB" />
      </motion.div>
      <motion.div
        className="absolute bottom-[8%] left-[5%] opacity-15"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <CompassSvg size={60} color="#D4AF37" />
      </motion.div>

      {/* ── Globe outlines ── */}
      <motion.div
        className="absolute top-[25%] left-[1%] opacity-15"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <GlobeSvg size={90} color="#2563EB" />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] right-[2%] opacity-12"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <GlobeSvg size={75} color="#06b6d4" />
      </motion.div>

      {/* ── Passport stamps ── */}
      {[
        { x: "2%",  y: "35%", rot: -15, delay: 0,   color: "#2563EB" },
        { x: "90%", y: "28%", rot: 12,  delay: 1.5, color: "#D4AF37" },
        { x: "88%", y: "68%", rot: -8,  delay: 0.8, color: "#10b981" },
        { x: "3%",  y: "72%", rot: 20,  delay: 2.0, color: "#8b5cf6" },
      ].map((stamp, i) => (
        <motion.div
          key={i}
          className="absolute opacity-15"
          style={{ left: stamp.x, top: stamp.y, rotate: stamp.rot }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: stamp.delay }}
        >
          <StampSvg size={55} color={stamp.color} />
        </motion.div>
      ))}

      {/* ── Flying paper planes across screen ── */}
      {[
        { sx: "-2%", sy: "20%", ex: "102%", ey: "10%", delay: 0,   dur: 12, color: "#2563EB" },
        { sx: "102%",sy: "55%", ex: "-2%",  ey: "65%", delay: 4,   dur: 15, color: "#D4AF37" },
        { sx: "-2%", sy: "78%", ex: "102%", ey: "70%", delay: 8,   dur: 13, color: "#06b6d4" },
        { sx: "102%",sy: "30%", ex: "-2%",  ey: "38%", delay: 2,   dur: 11, color: "#10b981" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: p.sx, top: p.sy }}
          animate={{
            left: [p.sx, p.ex],
            top: [p.sy, p.ey],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            delay: p.delay,
            duration: p.dur,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <PaperPlane size={20} color={p.color} />
        </motion.div>
      ))}

      {/* ── Country flag bubbles (edges of screen) ── */}
      {flags.map((f, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: f.x, top: f.y }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            delay: f.delay + 1,
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {f.flag}
        </motion.div>
      ))}

      {/* ── Horizontal dotted "runway" lines ── */}
      {["15%", "50%", "82%"].map((y, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 opacity-[0.08]"
          style={{
            top: y,
            borderTop: "1px dashed #2563EB",
          }}
        />
      ))}
    </div>
  );
}
