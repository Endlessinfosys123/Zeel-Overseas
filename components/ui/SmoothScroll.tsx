"use client";

import React, { useEffect } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(updateScrollTrigger);

    return () => {
      gsap.ticker.remove(updateScrollTrigger);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
