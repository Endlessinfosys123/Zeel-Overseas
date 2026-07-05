import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyZeel from "@/components/sections/WhyZeel";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import CountryGrid from "@/components/sections/CountryGrid";
import HomeFAQ from "@/components/sections/HomeFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      {/* 3D Earth Globe + SplitText Title Hero */}
      <HeroSection />
      
      {/* Auto-scrolling countries marquee + Scroll count stats */}
      <TrustBar />
      
      {/* 3D tilt cards bento overview */}
      <ServicesPreview />
      
      {/* Horizontal pinning differentiators */}
      <WhyZeel />
      
      {/* Traveling airplane vertical progress timeline */}
      <ProcessTimeline />
      
      {/* Visual Destinations Parallax city skyline grid */}
      <CountryGrid />
      
      {/* Crossfading client reviews */}
      <TestimonialCarousel />

      {/* Frequently Asked Questions */}
      <HomeFAQ />
      
      {/* Golden CTA banner with floating blur orbs */}
      <FinalCTA />
    </>
  );
}
