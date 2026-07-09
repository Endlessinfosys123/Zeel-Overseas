"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Shield } from "lucide-react";

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stampActive, setStampActive] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    // 1. Increment progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Speed up near end
        const step = prev > 70 ? 8 : 4;
        return Math.min(prev + step, 100);
      });
    }, 60);

    // 2. Trigger stamp animation at progress 60%
    const stampTimeout = setTimeout(() => {
      setStampActive(true);
    }, 800);

    // 3. Complete preloading
    const finishTimeout = setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        (window as Window & typeof globalThis & { __preloaderFinished?: boolean }).__preloaderFinished = true;
        window.dispatchEvent(new CustomEvent("preloaderFinished"));
      }
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(stampTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  const handleSkip = () => {
    setLoading(false);
    if (typeof window !== "undefined") {
      (window as Window & typeof globalThis & { __preloaderFinished?: boolean }).__preloaderFinished = true;
      window.dispatchEvent(new CustomEvent("preloaderFinished"));
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-brand-offwhite z-[999999] flex flex-col items-center justify-center p-4 select-none"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-xs font-display tracking-widest text-brand-charcoal/40 hover:text-brand-blue transition-colors px-4 py-2 border border-brand-charcoal/10 rounded-full cursor-pointer hover:border-brand-blue"
          >
            SKIP INTRO
          </button>

          <div className="w-full max-w-md bg-white border border-brand-gray-medium/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between aspect-[1.58/1]">
            {/* Ticket Header */}
            <div className="flex justify-between items-start border-b border-dashed border-brand-gray-medium pb-4">
              <div>
                <span className="text-[10px] text-brand-gray-dark uppercase tracking-widest block font-display mb-1">CARRIER</span>
                <img src="/logo.png" alt="Zeel Overseas Logo" className="h-6 w-auto object-contain" />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-brand-gray-dark uppercase tracking-widest block font-display">CLASS</span>
                <span className="text-xs font-bold font-display text-brand-gold">FIRST CLASS</span>
              </div>
            </div>

            {/* Ticket Travel Codes */}
            <div className="flex justify-between items-center py-4 relative">
              <div className="text-left">
                <span className="text-3xl font-display font-black text-brand-charcoal">IND</span>
                <span className="text-[10px] text-brand-gray-dark uppercase block">ORIGIN</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full border-t-2 border-dotted border-brand-gray-medium relative">
                  <motion.div
                    className="absolute top-1/2 left-0 -translate-y-1/2"
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                  >
                    <Plane className="w-4 h-4 text-brand-blue -translate-y-[6px] rotate-90" />
                  </motion.div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-display font-black text-brand-charcoal">GLB</span>
                <span className="text-[10px] text-brand-gray-dark uppercase block">DESTINATION</span>
              </div>
            </div>

            {/* Passport Stamp overlay */}
            <AnimatePresence>
              {stampActive && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ scale: 3, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: -15, opacity: 0.85 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                >
                  <div className="border-[3px] border-brand-gold text-brand-gold font-display font-black tracking-widest text-center uppercase p-3 rounded-xl rotate-[-15deg] shadow-lg flex flex-col items-center justify-center bg-white/90 scale-90">
                    <Shield className="w-6 h-6 mb-1 text-brand-gold animate-bounce" />
                    <span className="text-xs">VISA APPROVED</span>
                    <span className="text-[9px] block">ZEEL OVERSEAS</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ticket Footer */}
            <div className="flex justify-between items-end pt-4 border-t border-brand-gray-medium/40">
              <div>
                <span className="text-[10px] text-brand-gray-dark uppercase tracking-widest block font-display">GATEWAY</span>
                <span className="text-xs font-bold text-brand-charcoal">BORDERLESS FUTURE</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-display font-bold text-brand-blue/30">{progress}%</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <span className="text-xs font-display tracking-widest text-brand-gray-dark uppercase">Preparing boarding passes...</span>
            <div className="w-40 h-[2px] bg-brand-gray-medium mt-3 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-brand-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
