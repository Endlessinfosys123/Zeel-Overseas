"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialsData } from "@/lib/data";

export const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideCount = testimonialsData.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block">
              Success Stories
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal">
              Trusted by Hundreds of <br />
              Families.
            </h2>
            <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed max-w-md">
              Read real accounts of clients who resettled in Canada, Australia, the UK, and beyond. We treat every file with strict personalized attention.
            </p>

            {/* Slider Navigation Controls */}
            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-brand-gray-medium/60 text-brand-charcoal hover:border-brand-blue hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer bg-white"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-brand-gray-medium/60 text-brand-charcoal hover:border-brand-blue hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer bg-white"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Carousel Component */}
          <div className="lg:col-span-7 h-[420px] md:h-[350px] relative flex items-center">
            {/* Background quote mark */}
            <Quote className="absolute top-0 left-0 w-32 h-32 text-brand-blue/5 z-0 select-none pointer-events-none" />

            <div className="w-full relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ opacity: { duration: 0.3 }, x: { type: "spring", stiffness: 300, damping: 30 } }}
                  className="bg-brand-offwhite border border-brand-gray-medium/60 p-8 md:p-10 rounded-3xl shadow-sm"
                >
                  {/* Rating Stars */}
                  <div className="flex space-x-1 mb-6 text-brand-gold">
                    {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base md:text-lg font-body italic text-brand-charcoal leading-relaxed mb-8">
                    &quot;{activeTestimonial.quote}&quot;
                  </p>

                  {/* Profile Section */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {/* Using Next Image */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-blue/20">
                        <Image
                          src={activeTestimonial.image}
                          alt={activeTestimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base text-brand-charcoal leading-tight">
                          {activeTestimonial.name}
                        </h4>
                        <span className="text-xs font-display font-bold text-brand-gray-dark uppercase tracking-wider block">
                          {activeTestimonial.visaType}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-brand-charcoal block">
                        {activeTestimonial.destination}
                      </span>
                      <span className="text-xs font-display tracking-widest text-brand-blue font-bold uppercase">
                        APPROVED {activeTestimonial.flag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonialsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > activeIndex ? 1 : -1);
                      setActiveIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-brand-blue" : "w-1.5 bg-brand-gray-medium"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
