"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { testimonialsData } from "@/lib/data";
import { Star, Play, X, Heart, Globe, BadgeCheck } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const filterPills = [
  { id: "all", label: "All Reviews" },
  { id: "Study Visa", label: "Study Visas" },
  { id: "Work Visa", label: "Work Visas" },
  { id: "Permanent Residency", label: "Residency (PR)" },
];

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal titles
      gsap.to(".split-word", {
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.to(".testimonials-fade", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });

      // Animating the counters
      const counters = gsap.utils.toArray(".count-element") as HTMLElement[];
      counters.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val).toString();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredReviews = testimonialsData.filter((rev) => {
    if (activeFilter === "all") return true;
    return rev.visaType === activeFilter;
  });

  return (
    <div ref={containerRef} className="bg-brand-offwhite min-h-screen py-16">
      {/* 1. HERO HEADER */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block testimonials-fade opacity-0 translate-y-4">
              Client Feedback
            </span>
            <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
              <SplitText text="Verified Client" type="words" />
              <br />
              <SplitText text="Success Stories." type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-charcoal/70 max-w-2xl font-body testimonials-fade opacity-0 translate-y-4">
              Explore honest stories of students and working professionals who achieved overseas residency and permits with our compliance audits.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW SECTION */}
      <section className="py-12 bg-white border-y border-brand-gray-medium/40 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 bg-brand-offwhite p-6 rounded-2xl border border-brand-gray-medium/30">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-display font-black text-brand-charcoal flex items-baseline">
                <span className="count-element" data-target="500">0</span>
                <span>+</span>
              </div>
              <span className="text-[10px] font-display font-bold text-brand-gray-dark uppercase tracking-wider block">
                APPROVED VISAS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-brand-offwhite p-6 rounded-2xl border border-brand-gray-medium/30">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold">
              <BadgeCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-display font-black text-brand-charcoal flex items-baseline">
                <span className="count-element" data-target="98">0</span>
                <span>%</span>
              </div>
              <span className="text-[10px] font-display font-bold text-brand-gray-dark uppercase tracking-wider block">
                SUCCESS RATE
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-brand-offwhite p-6 rounded-2xl border border-brand-gray-medium/30">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Heart className="w-6 h-6 fill-current text-brand-blue" />
            </div>
            <div>
              <div className="text-2xl font-display font-black text-brand-charcoal flex items-baseline">
                <span>4.9</span>
                <span className="text-xs text-brand-gray-dark ml-1">/ 5</span>
              </div>
              <span className="text-[10px] font-display font-bold text-brand-gray-dark uppercase tracking-wider block">
                GOOGLE CLIENT RATING
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABS / FILTER ROW */}
      <section className="py-8 bg-brand-offwhite z-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 items-center">
            {filterPills.map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`relative px-5 py-2.5 rounded-full font-display font-bold text-xs tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                  activeFilter === pill.id ? "text-white" : "text-brand-charcoal/60 hover:text-brand-blue"
                }`}
              >
                <span className="relative z-10">{pill.label}</span>
                {activeFilter === pill.id && (
                  <motion.div
                    layoutId="activeTestimonialTabBackground"
                    className="absolute inset-0 bg-brand-blue rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GRID OF TESTIMONIALS (Bento / Masonry) */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mock Video Testimonial 1 (Always visible for rich visual value) */}
            <motion.div
              layout
              className="bg-brand-charcoal text-white rounded-3xl overflow-hidden aspect-[1.58/1] relative flex flex-col justify-end p-8 border border-brand-gray-dark/20 shadow-lg group select-none"
            >
              {/* Thumbnail image */}
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=400"
                alt="Student Success Video Cover"
                fill
                className="object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent pointer-events-none" />

              {/* Pulsing Play Button */}
              <button
                onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer animate-pulse-glow z-10"
                aria-label="Play testimonial video"
              >
                <Play className="w-6 h-6 fill-current" />
              </button>

              <div className="relative z-10">
                <span className="text-[9px] font-display font-black text-brand-gold uppercase tracking-widest block mb-1">
                  VIDEO TESTIMONIAL
                </span>
                <h3 className="text-xl font-display font-black leading-tight mb-1">
                  Rohan&apos;s Academic Pathway
                </h3>
                <p className="text-xs text-white/70 font-body">
                  McGill University Study Visa approved in 20 days.
                </p>
              </div>
            </motion.div>

            {/* Mock Video Testimonial 2 */}
            <motion.div
              layout
              className="bg-brand-charcoal text-white rounded-3xl overflow-hidden aspect-[1.58/1] relative flex flex-col justify-end p-8 border border-brand-gray-dark/20 shadow-lg group select-none"
            >
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400"
                alt="PR Success Video Cover"
                fill
                className="object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent pointer-events-none" />

              <button
                onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer animate-pulse-glow z-10"
                aria-label="Play testimonial video"
              >
                <Play className="w-6 h-6 fill-current" />
              </button>

              <div className="relative z-10">
                <span className="text-[9px] font-display font-black text-brand-gold uppercase tracking-widest block mb-1">
                  VIDEO TESTIMONIAL
                </span>
                <h3 className="text-xl font-display font-black leading-tight mb-1">
                  Priya&apos;s PR Journey
                </h3>
                <p className="text-xs text-white/70 font-body">
                  Australian Skilled Independent PR subclass 189 approved.
                </p>
              </div>
            </motion.div>

            {/* Rendered Text Testimonials */}
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-brand-gray-medium/55 p-8 rounded-3xl shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4 text-brand-gold">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-sm font-body italic text-brand-charcoal/80 leading-relaxed mb-6">
                      &quot;{rev.quote}&quot;
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-brand-gray-medium/20 mt-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-blue/20">
                        <Image
                          src={rev.image}
                          alt={rev.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-brand-charcoal leading-none mb-1">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] font-display font-bold text-brand-blue uppercase tracking-wider block">
                          {rev.visaType}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-brand-charcoal block">
                        {rev.destination}
                      </span>
                      <span className="text-[9px] font-display font-bold text-brand-gold tracking-wider uppercase">
                        APPROVED {rev.flag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. LIGHTBOX VIDEO MODAL */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            className="fixed inset-0 bg-brand-charcoal/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-3xl aspect-[16/9] bg-black rounded-2xl overflow-hidden shadow-2xl border border-brand-gray-dark/20">
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={activeVideoUrl}
                title="Video Testimonial Player"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
