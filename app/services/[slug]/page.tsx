"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/lib/data";
import {
  GraduationCap,
  Briefcase,
  FileText,
  Globe,
  Landmark,
  ShieldCheck,
  CheckCircle,
  FileDown,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const iconMap = {
  GraduationCap,
  Briefcase,
  FileText,
  Globe,
  Landmark,
  ShieldCheck,
};

// Accordion Item Component
const AccordionItem: React.FC<{ title: string; content: string; isOpen: boolean; onClick: () => void }> = ({
  title,
  content,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-brand-gray-medium/60 py-4 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-2 font-display font-bold text-base text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer"
      >
        <span>{title}</span>
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
            className="overflow-hidden"
          >
            <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed pt-2 pr-6">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const Icon = iconMap[service.iconName];
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="bg-brand-offwhite min-h-screen py-12">
      {/* 1. HERO PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-6 mb-16 relative">
        <div className="bg-white border border-brand-gray-medium/55 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden relative">
          
          {/* Animated decorative orb */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text Detail */}
          <div className="lg:col-span-8 space-y-6 relative z-10">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-xs font-display font-black text-brand-blue bg-brand-blue/10 px-3.5 py-1 rounded-full uppercase tracking-wider">
                Immigration Stream
              </span>
              <span className="text-xs font-display font-black text-brand-gold bg-brand-gold/15 px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-brand-gold fill-current" />
                <span>Success: {service.successRate}</span>
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black text-brand-charcoal leading-none">
              {service.title} Services
            </h1>

            <p className="text-base md:text-lg text-brand-charcoal/70 leading-relaxed font-body max-w-3xl">
              {service.longDesc}
            </p>
          </div>

          {/* Right Icon/Badge Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative z-10">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-brand-offwhite border border-brand-gray-medium/50 flex items-center justify-center shadow-md animate-float">
              {Icon && <Icon className="w-16 h-16 md:w-20 md:h-20 text-brand-blue" />}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN MAIN BODY */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Requirements & Accordions */}
        <div className="lg:col-span-8 space-y-12">
          {/* Eligibility Requirements */}
          <div className="bg-white border border-brand-gray-medium/50 p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-display font-black text-brand-charcoal mb-6 border-b border-brand-gray-medium/30 pb-4">
              Eligibility Thresholds
            </h2>
            <ul className="space-y-4">
              {service.eligibility.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-start space-x-3 text-sm font-body text-brand-charcoal/75 leading-relaxed"
                >
                  <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Required Documents checklist */}
          <div className="bg-white border border-brand-gray-medium/50 p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-display font-black text-brand-charcoal mb-6 border-b border-brand-gray-medium/30 pb-4">
              Required Documentation Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 bg-brand-offwhite border border-brand-gray-medium/40 p-4 rounded-xl text-xs font-body text-brand-charcoal/80 leading-relaxed"
                >
                  <FileDown className="w-5 h-5 text-brand-gold shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-white border border-brand-gray-medium/50 p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-display font-black text-brand-charcoal mb-6 border-b border-brand-gray-medium/30 pb-4">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-brand-gray-medium/20">
              {service.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  title={faq.question}
                  content={faq.answer}
                  isOpen={openFAQIndex === idx}
                  onClick={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="bg-white border-[2px] border-brand-gold p-8 rounded-3xl shadow-lg relative overflow-hidden">
            {/* Top gold glow effect */}
            <div className="absolute top-0 inset-x-0 h-1 bg-brand-gold" />
            
            <h3 className="font-display font-black text-2xl text-brand-charcoal mb-4">
              Secure Your Visa
            </h3>
            <p className="text-xs font-body text-brand-charcoal/70 leading-relaxed mb-6">
              Our case practitioners can verify your credentials against foreign embassy selection filters. Schedule your evaluation.
            </p>

            <Link
              href="/contact"
              className="w-full bg-brand-blue text-white text-center font-display font-bold py-4 px-6 rounded-full inline-flex items-center justify-center space-x-2 hover:bg-brand-blue-light shadow-md transition-colors"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-6 border-t border-brand-gray-medium/40 pt-4 flex flex-col space-y-2 text-xs text-brand-charcoal/60 font-body">
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span className="font-semibold text-brand-charcoal">Under 2 Hours</span>
              </div>
              <div className="flex justify-between">
                <span>Coaching Available:</span>
                <span className="font-semibold text-brand-charcoal">Yes (IELTS/PTE)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED SERVICES */}
      <section className="max-w-7xl mx-auto px-6 mt-20 pt-16 border-t border-brand-gray-medium/40">
        <h3 className="font-display font-black text-3xl text-brand-charcoal mb-8">
          Other Portfolios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedServices.map((rel) => {
            const RelIcon = iconMap[rel.iconName];
            return (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="bg-white border border-brand-gray-medium/55 p-6 rounded-2xl hover:border-brand-blue/20 transition-colors shadow-sm block group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  {RelIcon && <RelIcon className="w-5 h-5" />}
                </div>
                <h4 className="font-display font-bold text-lg text-brand-charcoal group-hover:text-brand-blue transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs font-body text-brand-charcoal/60 leading-relaxed line-clamp-2">
                  {rel.shortDesc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
