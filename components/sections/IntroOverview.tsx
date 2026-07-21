"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ShieldCheck, Compass, FileSpreadsheet } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const IntroOverview: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".intro-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-transparent z-10 border-b border-brand-gray-medium/20"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Accent Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block intro-animate">
              Who We Are
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal leading-none intro-animate">
              Why Families Trust <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-blue-light">
                Zeel Overseas.
              </span>
            </h2>
            
            {/* Elegant visual side card */}
            <div className="bg-white/60 backdrop-blur-md border border-brand-gray-medium/50 p-6 rounded-3xl shadow-sm intro-animate flex items-start space-x-4">
              <div className="p-3 bg-brand-blue/10 rounded-2xl text-brand-blue shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-brand-charcoal mb-1">
                  Gandhinagar&apos;s Dedicated Visas Agency
                </h4>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed font-body">
                  Providing honest profile analysis and meticulous document verification to reduce embassy refusal risk.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting paragraph */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-base md:text-lg font-body text-brand-charcoal/80 leading-relaxed intro-animate">
              Moving abroad — for study, work, or a new life — is one of the biggest decisions a family makes. At Zeel Overseas, we handle the part that overwhelms most applicants: the paperwork, the deadlines, the embassy requirements that change without notice.
            </p>
            <p className="text-sm md:text-base font-body text-brand-charcoal/75 leading-relaxed intro-animate">
              Based in Gandhinagar, we work with students, skilled professionals, and families across Gujarat who are applying for visas to Canada, the UK, Australia, Germany, the USA, and other leading destinations. Every case gets a dedicated counselor, a clear document checklist, and honest timelines — no false promises, no vague &quot;trust the process&quot; answers.
            </p>

            {/* Minor features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-brand-gray-medium/20 intro-animate">
              <div className="flex items-center space-x-3 text-sm font-display font-bold text-brand-charcoal/70">
                <Compass className="w-5 h-5 text-brand-gold" />
                <span>Honest, Realistic Timelines</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-display font-bold text-brand-charcoal/70">
                <FileSpreadsheet className="w-5 h-5 text-brand-blue" />
                <span>Clear Document Checklists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroOverview;
