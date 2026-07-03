"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { processStepsData } from "@/lib/data";
import { Plane } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the progress line height and the flying airplane dot on scroll
      gsap.fromTo(
        ".timeline-progress",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      // 2. Stagger-reveal each milestone block as it comes into viewport
      const steps = gsap.utils.toArray(".timeline-step") as HTMLElement[];
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-brand-offwhite relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
            Our Blueprint
          </span>
          <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
            How We Move You Successfuly.
          </h2>
          <p className="text-sm font-body text-brand-charcoal/70 max-w-xl mx-auto leading-relaxed">
            A precise, six-step visa methodology engineered to ensure compliance accuracy and maximize embassy approvals.
          </p>
        </div>

        {/* Timeline Track Wrapper */}
        <div className="relative max-w-5xl mx-auto mt-16 timeline-container">
          {/* Central Line Track (Desktop) */}
          <div
            ref={lineRef}
            className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-brand-gray-medium/55 transform md:-translate-x-1/2 z-0"
          >
            {/* Growing Progress Line */}
            <div className="timeline-progress absolute top-0 left-0 w-full bg-brand-blue z-10 transition-all duration-75 origin-top flex flex-col justify-end">
              {/* Traveling Airplane Dot */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-brand-blue shadow-md flex items-center justify-center z-20">
                <Plane className="w-4 h-4 text-brand-blue rotate-90" />
              </div>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-16">
            {processStepsData.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-start relative z-10 timeline-step ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left/Right Card Spacer */}
                  <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-12 flex justify-start md:justify-end" />

                  {/* Node Badge */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-white border border-brand-gray-medium/60 shadow-sm flex items-center justify-center font-display font-black text-xs text-brand-charcoal z-20">
                    {step.number}
                  </div>

                  {/* Step Card Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 pr-0 md:pr-12`}>
                    <div className="bg-white border border-brand-gray-medium/50 p-8 rounded-2xl shadow-sm hover:border-brand-blue/20 transition-colors">
                      <span className="text-[10px] font-display font-black tracking-widest text-brand-gold uppercase block mb-1">
                        STEP {step.number}
                      </span>
                      <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
