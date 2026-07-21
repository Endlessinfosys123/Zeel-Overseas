"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { servicesData } from "@/lib/data";
import { GraduationCap, Briefcase, FileText, Globe, Landmark, ShieldCheck, ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
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

const servicesFAQs = [
  {
    question: "Can I apply for more than one visa type at once?",
    answer: "In most cases no — each visa category has its own requirements and purpose. We'll help you choose the right one first, then plan your next steps."
  },
  {
    question: "Do you only work with certain countries?",
    answer: "We currently support Canada, Australia, UK, Germany, USA, and New Zealand — ask us if your target country isn't listed."
  },
  {
    question: "What if I don't qualify for the service I want?",
    answer: "We'll tell you honestly if your profile doesn't currently meet requirements, and outline what you could do to become eligible."
  },
  {
    question: "How much do your services cost?",
    answer: "Consultation is free; service fees depend on the visa category and complexity of your case."
  }
];

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
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
      return service.slug === "tourist-visa" || service.slug === "documentation-audit";
    }
    return true;
  });

  return (
    <div ref={containerRef} className="bg-transparent min-h-screen py-16">
      {/* 1. HERO HEADER */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block services-fade opacity-0 translate-y-4">
              Immigration Portfolios
            </span>
            <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
              <SplitText text="Comprehensive Immigration" type="words" />
              <br />
              <SplitText text="& Visa Services." type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-charcoal/70 max-w-2xl font-body services-fade opacity-0 translate-y-4 leading-relaxed">
              Whatever stage of your global journey you&apos;re at, Zeel Overseas offers focused, end-to-end support. Explore our core services below, or book a free consultation to discuss which pathway fits your goals.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER MENU TAB SYSTEM */}
      <section className="py-8 border-y border-brand-gray-medium/20 bg-white/40 backdrop-blur-sm relative z-20">
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

      {/* 3. GRID OF SERVICES */}
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

      {/* 4. ADVISORY NOTES / INTERMEDIATE SECTION */}
      <section className="py-20 relative z-10 border-t border-brand-gray-medium/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-display font-black tracking-widest text-brand-gold uppercase block">
                Pathway Assessment
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-brand-charcoal leading-tight">
                Not Sure Which <br />Service You Need?
              </h2>
              <p className="text-sm md:text-base font-body text-brand-charcoal/75 leading-relaxed">
                Many applicants qualify for more than one pathway — for example, a study visa applicant may later be eligible for PR, or a job-seeker visa may lead to an employer-sponsored work permit.
              </p>
              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                During your free consultation, we assess your full profile and recommend the pathway (or combination of pathways) that gives you the best realistic outcome — not just the first option that comes to mind.
              </p>
            </div>
            <div className="lg:col-span-6 bg-white/70 border border-brand-gray-medium/55 p-8 md:p-10 rounded-3xl shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xl text-brand-charcoal">
                Need customized guidance?
              </h3>
              <p className="text-xs font-body text-brand-charcoal/60 leading-relaxed">
                Book a free eligibility assessment session with one of our Gandhinagar counselors. We will evaluate your profile and build a roadmap.
              </p>
              <Link
                href="/contact"
                className="w-full bg-brand-blue text-white text-center font-display font-bold py-4 px-6 rounded-full inline-flex items-center justify-center space-x-2 hover:bg-brand-blue-light shadow-md transition-colors"
              >
                <span>Find Your Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS SECTION */}
      <section className="py-20 border-t border-brand-gray-medium/20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
              Services Queries
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
              Services FAQ.
            </h2>
          </div>

          <div className="space-y-4">
            {servicesFAQs.map((faq, idx) => {
              const isOpen = openFAQIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur-md border border-brand-gray-medium/55 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-brand-blue/30"
                >
                  <button
                    onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-base md:text-lg text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5 pr-4">
                      <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-brand-blue" : "text-brand-gray-dark"}`} />
                      <span>{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-brand-gray-dark" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm md:text-base font-body text-brand-charcoal/70 leading-relaxed pl-[42px]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
