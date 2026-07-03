"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "@/components/ui/SplitText";
import { milestonesData } from "@/lib/data";
import { ShieldCheck, Award, Landmark, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Vikramjit Singh",
    role: "Founder & Chief Counsel",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    name: "Sarah Jenkins",
    role: "Director of Documentation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Student Admissions",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

const affiliations = [
  { name: "ICCRC Member", icon: <ShieldCheck className="w-8 h-8 text-brand-blue" /> },
  { name: "MARA Approved", icon: <Award className="w-8 h-8 text-brand-gold" /> },
  { name: "AIRC Certified", icon: <Landmark className="w-8 h-8 text-brand-blue" /> },
  { name: "QEAC Registered", icon: <GraduationCap className="w-8 h-8 text-brand-gold" /> },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero text reveal
      gsap.to(".split-word", {
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power4.out",
      });

      gsap.to(".about-fade", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });

      // 2. Scroll-triggered clip-path wipe animation
      gsap.fromTo(
        wipeImageRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".wipe-section",
            start: "top 70%",
          },
        }
      );

      // 3. Stagger-reveal milestones
      const milestones = gsap.utils.toArray(".timeline-item") as HTMLElement[];
      milestones.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-brand-offwhite">
      {/* 1. HERO SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block about-fade opacity-0 translate-y-4">
              Behind Zeel Overseas
            </span>
            <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
              <SplitText text="Engineering Global" type="words" />
              <br />
              <SplitText text="Resettlement." type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-charcoal/70 max-w-2xl font-body about-fade opacity-0 translate-y-4">
              We started with a simple belief: moving across borders is more than getting a stamp. It is a critical, life-altering transition that demands absolute compliance accuracy and legal integrity.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION WIPE SECTION */}
      <section className="py-24 bg-white wipe-section relative z-10 border-y border-brand-gray-medium/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text split */}
          <div className="lg:col-span-6 space-y-12 pr-0 lg:pr-12">
            <div>
              <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
                Our Objective
              </span>
              <h2 className="text-4xl font-display font-black text-brand-charcoal mb-4">
                The Mission
              </h2>
              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                To eliminate visa application uncertainty through rigorous documentation auditing, strategic visa pathing, and direct transparency, enabling ambitious minds to resettle globally without friction.
              </p>
            </div>

            <div className="border-t border-brand-gray-medium/40 pt-10">
              <span className="text-xs font-display font-black tracking-widest text-brand-gold uppercase block mb-3">
                Our Horizon
              </span>
              <h2 className="text-4xl font-display font-black text-brand-charcoal mb-4">
                The Vision
              </h2>
              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                To establish a global standard in resettlement advisory, recognized by international educational bodies and immigration departments as a benchmark for client credibility and application accuracy.
              </p>
            </div>
          </div>

          {/* Right: Clip-path Wipe Image */}
          <div className="lg:col-span-6">
            <div
              ref={wipeImageRef}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-brand-gray-medium/40 bg-brand-warm"
            >
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600&h=450"
                alt="Airplane flying over clouds visual"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY TIMELINE / MILESTONES */}
      <section className="py-24 relative overflow-hidden bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
              Growth Path
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
              Our Milestones.
            </h2>
          </div>

          <div className="max-w-4xl relative">
            {/* Timeline central vertical track */}
            <div className="absolute left-[30px] top-4 bottom-4 w-[1px] bg-brand-gray-medium/80 z-0" />

            <div className="space-y-12 relative z-10">
              {milestonesData.map((milestone, idx) => (
                <div key={idx} className="flex items-start space-x-8 timeline-item">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-brand-gray-medium/60 shadow-sm flex items-center justify-center font-display font-black text-lg text-brand-blue shrink-0">
                    {milestone.year}
                  </div>
                  <div className="bg-white border border-brand-gray-medium/55 p-6 rounded-2xl shadow-sm hover:border-brand-blue/15 transition-all">
                    <h3 className="font-display font-bold text-lg text-brand-charcoal mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM GRID */}
      <section className="py-24 bg-white relative z-10 border-t border-brand-gray-medium/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
              Our Leadership
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
              The Advisory Board.
            </h2>
            <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed max-w-md">
              Experienced lawyers, ex-admission heads, and certified visa analysts dedicated to maintaining absolute integrity in filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <Tilt
                key={idx}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareColor="#D4AF37"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
              >
                <div className="group bg-brand-offwhite border border-brand-gray-medium/60 rounded-3xl p-6 shadow-sm hover:border-brand-gold/30 transition-colors flex flex-col justify-between aspect-[3/4]">
                  {/* Portrait photo frame */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 border border-brand-gray-medium/40 bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-brand-charcoal leading-none mb-1">
                      {member.name}
                    </h3>
                    <span className="text-xs font-display font-bold tracking-widest text-brand-blue uppercase">
                      {member.role}
                    </span>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AFFILIATIONS ROW */}
      <section className="py-20 bg-brand-warm border-y border-brand-gray-medium/40 z-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-display font-bold tracking-widest text-brand-gray-dark uppercase mb-8">
            Global Accreditations & Certifications
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {affiliations.map((aff, idx) => (
              <div
                key={idx}
                className="bg-white border border-brand-gray-medium/45 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 shadow-sm hover:border-brand-blue/20 transition-colors animate-float"
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-offwhite flex items-center justify-center border border-brand-gray-medium/20">
                  {aff.icon}
                </div>
                <span className="font-display font-bold text-sm tracking-wide text-brand-charcoal">
                  {aff.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
