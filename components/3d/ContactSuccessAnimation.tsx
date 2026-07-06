"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Plane, Loader2, Sparkles, MapPin, ClipboardList, Mail } from "lucide-react";

// Check WebGL availability
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Dynamically import 3D TakeoffScene with a premium loader
const TakeoffScene = dynamic(() => import("./TakeoffScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-[#BAE6FD] via-[#E0F2FE] to-[#FFFBEB] flex flex-col items-center justify-center p-8 min-h-[480px] rounded-3xl select-none">
      <div className="relative flex items-center justify-center mb-6">
        <Loader2 className="w-16 h-16 text-brand-blue animate-spin" />
        <Plane className="w-6 h-6 text-brand-gold absolute" />
      </div>
      <h3 className="font-display font-black text-brand-charcoal text-lg tracking-wide animate-pulse">
        Preparing Flight Animation...
      </h3>
      <span className="text-[10px] font-display font-bold tracking-widest text-brand-gray-dark uppercase mt-2">
        Pre-flight Diagnostics Active
      </span>
    </div>
  ),
});

// A premium 2D fallback page using Framer Motion
const Fallback2DAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#BAE6FD] via-[#E0F2FE] to-[#FFFBEB] relative rounded-3xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 select-none min-h-[480px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/10 via-transparent to-transparent opacity-40" />
      
      {/* Animated 2D Clouds */}
      <motion.div
        initial={{ x: "120%", y: "15%", opacity: 0.4 }}
        animate={{ x: "-120%" }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute w-24 h-8 bg-white/60 rounded-full blur-sm"
      />
      <motion.div
        initial={{ x: "120%", y: "40%", opacity: 0.5 }}
        animate={{ x: "-120%" }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 2.5 }}
        className="absolute w-36 h-12 bg-white/50 rounded-full blur-md"
      />
      <motion.div
        initial={{ x: "120%", y: "65%", opacity: 0.35 }}
        animate={{ x: "-120%" }}
        transition={{ duration: 17, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute w-28 h-10 bg-white/60 rounded-full blur-sm"
      />

      {/* Runway Representation */}
      <div className="absolute bottom-0 w-36 h-28 border-l border-r border-dashed border-brand-charcoal/10 origin-bottom transform [transform:perspective(120px)_rotateX(65deg)] bg-brand-charcoal/5 flex justify-center">
        <div className="w-0.5 h-full bg-brand-gold/50 border-dashed border-t border-b border-spacing-2" />
      </div>

      {/* Jet Soaring */}
      <motion.div
        initial={{ scale: 0.4, y: 90, x: 0, rotate: -15, opacity: 0 }}
        animate={{
          scale: [0.4, 0.5, 1.1, 2.0],
          y: [90, 80, -30, -160],
          x: [0, 8, 30, 95],
          rotate: [-15, -24, -20, -15],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 4.8,
          ease: "easeInOut",
          times: [0, 0.15, 0.65, 1],
          repeat: Infinity,
          repeatDelay: 0.5
        }}
        className="relative z-10 text-brand-blue flex items-center justify-center"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-blue drop-shadow-[0_0_15px_rgba(37,99,235,0.35)] transform -rotate-45"
        >
          <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" fill="#FFFFFF" />
          <path d="M3 21l18-18" strokeWidth="2.5" />
          <path d="M15 6l3.5-3.5a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L18 9" />
          <path d="M9 18H5l-2-2h4" />
        </svg>
        
        {/* Glow Jet Exhaust Flame */}
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 0.25 }}
          className="absolute -bottom-8 w-5 h-16 bg-gradient-to-t from-transparent via-brand-gold to-red-500 blur-sm rounded-full -rotate-45"
        />
      </motion.div>

      <span className="text-xs font-display tracking-widest text-brand-charcoal/50 uppercase absolute bottom-8 animate-pulse">
        Flight Taking Off...
      </span>
    </div>
  );
};

interface ContactSuccessAnimationProps {
  onReset: () => void;
  formData: {
    name: string;
    email: string;
    visaInterest: string;
    destination?: string;
  };
}

export const ContactSuccessAnimation: React.FC<ContactSuccessAnimationProps> = ({ onReset, formData }) => {
  const [showCard, setShowCard] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleAnimationComplete = () => {
    setShowCard(true);
  };

  const show3D = webglSupported && !prefersReducedMotion;

  return (
    <div className="w-full relative aspect-square md:aspect-[4/3.5] min-h-[480px] rounded-3xl overflow-hidden shadow-lg select-none">
      
      {/* 3D Scene or 2D Fallback */}
      <div className="absolute inset-0 z-0">
        {show3D ? (
          <TakeoffScene onComplete={handleAnimationComplete} />
        ) : (
          <Fallback2DAnimation onComplete={handleAnimationComplete} />
        )}
      </div>

      {/* Thank You Glassmorphic Card Overlay */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[6px] z-10 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
              className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Premium Green Checkmark Icon with floating animation */}
              <div className="relative mb-5 flex items-center justify-center">
                <div className="absolute w-16 h-16 rounded-full bg-green-100 border border-green-200 animate-ping opacity-60" />
                <div className="relative w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md">
                  <Check className="w-7 h-7 stroke-[3px]" />
                </div>
              </div>

              {/* Glowing header badge */}
              <div className="inline-flex items-center space-x-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-display font-black tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Case File Submitted</span>
              </div>

              <h3 className="font-display font-black text-2xl text-brand-charcoal leading-tight mb-3">
                Global Journey Initiated!
              </h3>

              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed mb-6">
                Thank you, <span className="font-bold text-brand-blue">{formData.name}</span>! Your query has been logged. Your digital case file has taken off and is now in flight to our visa counselors.
              </p>

              {/* Case Summary box */}
              <div className="w-full bg-brand-warm/60 border border-brand-gray-medium/55 rounded-2xl p-4 mb-6 flex flex-col gap-2.5 text-left text-xs text-brand-charcoal/80">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>
                    <strong className="text-brand-charcoal">Visa Category: </strong>
                    {formData.visaInterest}
                  </span>
                </div>
                {formData.destination && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>
                      <strong className="text-brand-charcoal">Preferred Country: </strong>
                      {formData.destination}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="truncate">
                    <strong className="text-brand-charcoal">Recipient: </strong>
                    {formData.email}
                  </span>
                </div>
              </div>

              <p className="text-[11px] font-body text-brand-gray-dark mb-6">
                A senior advisory officer will review your documents and contact you within 24 hours.
              </p>

              {/* Action Button */}
              <button
                onClick={onReset}
                className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-display font-bold py-3.5 px-6 rounded-full shadow-md flex items-center justify-center space-x-2 transition-all group cursor-pointer"
              >
                <span>File Another Case</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactSuccessAnimation;
