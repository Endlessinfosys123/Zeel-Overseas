"use client";

import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { RealPlane, FlightArcPath, CompassIcon } from "@/components/ui/GlobalBackground";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleStartPlayback = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay blocked by browser policy.", err);
        });
      }
    };

    if (typeof window !== "undefined") {
      if ((window as Window & typeof globalThis & { __preloaderFinished?: boolean }).__preloaderFinished) {
        handleStartPlayback();
      } else {
        window.addEventListener("preloaderFinished", handleStartPlayback);
        return () => {
          window.removeEventListener("preloaderFinished", handleStartPlayback);
        };
      }
    }
  }, []);

  return (
    <section
      className="relative aspect-[16/9] md:h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-black mt-0 md:-mt-20"
    >
      {/* ── CINEMATIC FULL-BLEED VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 overflow-hidden z-0 select-none pointer-events-none">
        <video
          ref={videoRef}
          src="/zeel-hero-2.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-neutral-950/40 z-10" />
      </div>

      {/* Subtle top vignette for Navbar legibility */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

      {/* Telemetry Radar Overlay (Glows & Paths) */}
      <div className="absolute inset-0 overflow-hidden z-0 select-none pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl z-20" />
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-brand-gold/10 blur-3xl z-20" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[280px] rounded-full bg-sky-500/10 blur-3xl z-20" />

        <div className="hidden md:block absolute top-[18%] left-[2%] opacity-20 z-20">
          <FlightArcPath w={320} h={130} color="#FFFFFF" />
        </div>

        <motion.div
          className="hidden md:block absolute z-20"
          style={{ top: "18%", left: "-5%" }}
          animate={{
            left: ["-5%", "105%"],
            top: ["22%", "16%", "22%"],
            rotate: [20, 0, -20],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <RealPlane size={36} color="#FFFFFF" />
        </motion.div>

        <motion.div
          className="hidden md:block absolute bottom-[10%] left-[4%] opacity-10 z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <CompassIcon size={100} color="#FFFFFF" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 flex-col items-center space-y-1 select-none pointer-events-none z-20">
        <span className="text-[10px] font-display font-bold tracking-widest text-white/50 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
