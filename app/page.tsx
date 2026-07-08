import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import HeroIntroSection from "@/components/sections/HeroIntroSection";
import TrustBar from "@/components/sections/TrustBar";
import IntroOverview from "@/components/sections/IntroOverview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyZeel from "@/components/sections/WhyZeel";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CountryGrid from "@/components/sections/CountryGrid";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import HomeFAQ from "@/components/sections/HomeFAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      {/* Full-bleed video backdrop Hero */}
      <HeroSection />
      
      {/* Hero text copy and 3D floating animation panel */}
      <HeroIntroSection />
      
      {/* Auto-scrolling countries marquee + Scroll count stats */}
      <TrustBar />

      {/* Intro overview of Why Families Trust Zeel Overseas */}
      <IntroOverview />
      
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
