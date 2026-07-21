"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { RealPlane } from "@/components/ui/GlobalBackground";


const faqs = [
  {
    question: "Which countries does Zeel Overseas provide visa services for?",
    answer: "We support applications for Canada, Australia, the UK, Germany, the USA, New Zealand, and other destinations depending on your goals — ask us during your free consultation."
  },
  {
    question: "Is the first consultation free?",
    answer: "Yes, completely free with no obligation."
  },
  {
    question: "How is Zeel Overseas different from other consultants in Gandhinagar?",
    answer: "We focus on honest eligibility assessment and complete, embassy-ready documentation rather than volume-based processing — every applicant gets individual attention."
  },
  {
    question: "Do you help with visa applications that were previously rejected?",
    answer: "Yes — we review the rejection reasons and rebuild the case to address the specific gaps."
  }
];

export default function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-transparent z-10">
      {/* Unique HomeFAQ Local Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Horizontal runway lines */}
        <div className="absolute left-0 right-0 top-[20%] border-t border-dashed border-brand-blue/15" />
        <div className="absolute left-0 right-0 top-[80%] border-t border-dashed border-brand-blue/15" />

        {/* Commercial airliner landing/takeoff animation */}
        <motion.div
          className="absolute opacity-[0.09]"
          style={{ top: "45%", left: "105%" }}
          animate={{
            left: ["105%", "-15%"],
            top: ["38%", "52%"],
            scale: [1.2, 0.8]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <RealPlane size={90} color="#2563EB" className="-rotate-[90deg]" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
            Common Inquiries
          </span>
          <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
            Frequently Asked <br /> Questions.
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-md border border-brand-gray-medium/55 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-brand-blue/30"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
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
  );
}
