"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { servicesData } from "@/lib/data";
import { GraduationCap, Briefcase, FileText, Globe, Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  FileText: FileText,
  Globe: Globe,
  Landmark: Landmark,
  ShieldCheck: ShieldCheck,
};

const filterTabs = [
  { id: "all", label: "All Visa Streams" },
  { id: "academic", label: "Academic & Work" },
  { id: "residency", label: "Residency & Business" },
  { id: "travel", label: "Travel & Audit" },
];

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal hero titles
    const ctx = gsap.context(() => {
      gsap.to(".split-word", {
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.to(".services-fade", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filter services logic
  const filteredServices = servicesData.filter((service) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "academic") {
      return service.slug === "study-visa" || service.slug === "work-visa";
    }
    if (activeFilter === "residency") {
      return service.slug === "permanent-residency" || service.slug === "business-visa";
    }
    if (activeFilter === "travel") {
      return service.slug === "tourist-visa" || service.slug === "visa-documentation";
    }
    return true;
  });

  return (
    <div ref={containerRef} className="bg-brand-offwhite min-h-screen py-16">
      {/* 1. HERO HEADER */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block services-fade opacity-0 translate-y-4">
              Immigration Portfolios
            </span>
            <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
              <SplitText text="Visa Services &" type="words" />
              <br />
              <SplitText text="Embassy Pathways." type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-charcoal/70 max-w-2xl font-body services-fade opacity-0 translate-y-4">
              Certified global mobility streams mapping applicants to permanent residency systems, employment authorizations, and top university admissions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER MENU TAB SYSTEM */}
      <section className="py-8 border-y border-brand-gray-medium/40 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 items-center">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-6 py-3 rounded-full font-display font-bold text-xs tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                  activeFilter === tab.id ? "text-white" : "text-brand-charcoal/60 hover:text-brand-blue"
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeFilter === tab.id && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-brand-blue rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GRID OF SERVICES (Framer Motion Reshuffle) */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => {
                const Icon = iconMap[service.iconName];
                return (
                  <motion.div
                    key={service.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Tilt
                      glareEnable={true}
                      glareMaxOpacity={0.06}
                      glareColor="#2563EB"
                      tiltMaxAngleX={6}
                      tiltMaxAngleY={6}
                      className="h-full animate-fade"
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="bento-card block p-8 rounded-2xl h-full flex flex-col justify-between group relative overflow-hidden bg-white/70 border border-brand-gray-medium/40 shadow-sm min-h-[300px]"
                      >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:bg-brand-blue/10 transition-colors duration-300" />

                        <div>
                          {/* Top Icon Row */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500">
                              {Icon && <Icon className="w-6 h-6" />}
                            </div>
                            <span className="text-[10px] font-display font-black text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                              Success: {service.successRate}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-brand-charcoal/70 leading-relaxed font-body mb-6">
                            {service.shortDesc}
                          </p>
                        </div>

                        {/* Action Footer link */}
                        <div className="flex items-center justify-between pt-4 border-t border-brand-gray-medium/20 text-xs font-display font-bold text-brand-blue">
                          <span>EXPLORE STREAM</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                      </Link>
                    </Tilt>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
