"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";
import { motion, AnimatePresence } from "framer-motion";

// Target countries data matching company offerings
const destinations = [
  { 
    name: "Canada", 
    flag: "🇨🇦",
    visaType: "Express Entry / Student / PR",
    time: "14h Flight",
    desc: "Direct pathways for skilled workers, university admissions, and family sponsorships.",
    color: "#D4AF37"
  },
  { 
    name: "Australia", 
    flag: "🇦🇺",
    visaType: "Subclass 189/190 / Study / PR",
    time: "9h Flight",
    desc: "Points-based skilled migration streams and top-tier Australian university placements.",
    color: "#2563EB"
  },
  { 
    name: "United Kingdom", 
    flag: "🇬🇧",
    visaType: "Skilled Worker / Student Visa",
    time: "9h Flight",
    desc: "Fast-track corporate work permits, post-study graduate routes, and educational consultancy.",
    color: "#D4AF37"
  },
  { 
    name: "United States", 
    flag: "🇺🇸",
    visaType: "F-1 Student / H-1B Specialist",
    time: "16h Flight",
    desc: "Premium Ivy League college admissions, specialized employment, and investment visas.",
    color: "#2563EB"
  },
  { 
    name: "Germany", 
    flag: "🇩🇪",
    visaType: "Opportunity Card / Job Seeker / EU Blue Card",
    time: "8h Flight",
    desc: "Access to Europe's largest economy with point-based job seeker permits and engineering pathways.",
    color: "#D4AF37"
  },
  { 
    name: "New Zealand", 
    flag: "🇳🇿",
    visaType: "Green List Residency / Accredited Work",
    time: "12h Flight",
    desc: "Fast-tracked pathways for medical, engineering, and tech experts.",
    color: "#2563EB"
  },
];

export const GlobeScene: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeCountry = destinations[activeIdx];

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* 3D R3F Canvas */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={0.9} />
          
          <Suspense fallback={null}>
            <Globe 
              onActiveIndexChange={setActiveIdx} 
              onProgressChange={setProgress} 
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* Floating Travel Map HUD Control Panel */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 z-10 max-w-[320px] w-[calc(100%-16px)] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/85 backdrop-blur-md border border-neutral-200/60 p-4 rounded-2xl shadow-xl flex flex-col gap-2.5 pointer-events-auto select-none"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="text-3xl filter drop-shadow-sm">{activeCountry.flag}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-black text-neutral-900 text-base truncate">
                  Ahmedabad → {activeCountry.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${progress < 1.0 ? "bg-blue-600 animate-pulse" : "bg-green-600"}`} />
                  <span className="text-[10px] font-display font-black tracking-wider uppercase text-neutral-500">
                    {progress < 1.0 ? "In Flight..." : "Arrival - Visa Approved!"}
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Specs */}
            <div className="border-t border-neutral-100 pt-2 flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-500 font-medium">Visa Stream:</span>
                <span className="font-bold text-neutral-800">{activeCountry.visaType}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-neutral-500 font-medium">Flight Duration:</span>
                <span className="font-bold text-neutral-800">{activeCountry.time}</span>
              </div>
              <p className="text-[11px] text-neutral-600/90 leading-relaxed font-body mt-1">
                {activeCountry.desc}
              </p>
            </div>

            {/* Route Map Progress Bar */}
            <div className="w-full mt-1.5">
              <div className="flex justify-between text-[9px] font-display font-bold text-neutral-400 mb-1">
                <span>AHMEDABAD</span>
                <span>{activeCountry.name.toUpperCase()}</span>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-blue h-full transition-all duration-75 ease-out" 
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GlobeScene;
