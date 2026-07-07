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
    role: "Founder & Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300",
    bio: "With years of dedicated experience in global visa policies, Vikramjit Singh established Zeel Overseas on the principles of transparency and precision. His client-first philosophy ensures that every applicant receives an honest, realistic evaluation and unmatched documentation support."
  },
  {
    name: "Sarah Jenkins",
    role: "Visa Documentation Specialist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    name: "Arjun Mehta",
    role: "Client Relationship Manager",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

const affiliations = [
  { name: "Government Registered Agency", icon: <ShieldCheck className="w-8 h-8 text-brand-blue" /> },
  { name: "Certified Document Specialists", icon: <Award className="w-8 h-8 text-brand-gold" /> },
  { name: "Trusted Counselors & Advisors", icon: <Landmark className="w-8 h-8 text-brand-blue" /> },
  { name: "Embassy Audited Standards", icon: <GraduationCap className="w-8 h-8 text-brand-gold" /> },
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
    <div ref={containerRef} className="bg-transparent">
      {/* 1. HERO SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block about-fade opacity-0 translate-y-4">
              Behind Zeel Overseas
            </span>
            <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
              <SplitText text="About Zeel" type="words" />
              <br />
              <SplitText text="Overseas" type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-blue/90 font-display font-bold about-fade opacity-0 translate-y-4">
              Guiding Your Journey Abroad, One Honest Step at a Time
            </p>
            <p className="text-base text-brand-charcoal/80 max-w-3xl font-body about-fade opacity-0 translate-y-4 leading-relaxed">
              Zeel Overseas was founded with a simple belief: immigration guidance should be honest, thorough, and built around the applicant — not around volume targets. Based in Ahmedabad, we work closely with students, skilled professionals, and families across Gujarat who are ready to take the next step abroad, whether that&apos;s a university admission, a work opportunity, permanent residency, or a family visit.
            </p>
            <p className="text-sm text-brand-charcoal/70 max-w-3xl font-body about-fade opacity-0 translate-y-4 leading-relaxed">
              We know the immigration process can feel opaque — changing embassy rules, confusing document requirements, and no shortage of consultants making promises they can&apos;t keep. Our approach is different: we assess your actual profile, tell you clearly what pathways are realistic, and then handle every piece of documentation with precision so nothing holds up your application.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION WIPE SECTION */}
      <section className="py-24 wipe-section relative z-10 border-y border-brand-gray-medium/20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text split */}
          <div className="lg:col-span-6 space-y-12 pr-0 lg:pr-12">
            <div>
              <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
                Our Objective
              </span>
              <h2 className="text-4xl font-display font-black text-brand-charcoal mb-4">
                Our Mission
              </h2>
              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                To make international mobility accessible and stress-free for every applicant we work with — through transparent counseling, meticulous documentation, and consistent support from first consultation through visa approval and beyond.
              </p>
            </div>

            <div className="border-t border-brand-gray-medium/20 pt-10">
              <span className="text-xs font-display font-black tracking-widest text-brand-gold uppercase block mb-3">
                Our Strategy
              </span>
              <h2 className="text-4xl font-display font-black text-brand-charcoal mb-4">
                Our Approach
              </h2>
              <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                Every client begins with a free, no-obligation consultation where we review your academic or professional background, your target country, and your timeline. From there, we build a personalized visa strategy — university/employer shortlisting (where applicable), a complete document checklist, SOP and interview preparation, and ongoing updates at every stage of the application. We don&apos;t disappear after filing your case; we stay with you through visa approval, travel booking guidance, and pre-departure preparation.
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

      {/* CORE VALUES SECTION */}
      <section className="py-24 border-b border-brand-gray-medium/20 bg-transparent z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
              Our Foundations
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
              Our Core Values.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Transparency", desc: "We give realistic assessments, not sales pitches.", color: "text-brand-blue" },
              { title: "Diligence", desc: "Every document is checked and cross-checked before submission.", color: "text-brand-gold" },
              { title: "Empathy", desc: "We understand this is a major life decision for you and your family.", color: "text-brand-blue" },
              { title: "Accountability", desc: "If something goes wrong, we own it and fix it.", color: "text-brand-gold" },
            ].map((val, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm border border-brand-gray-medium/55 p-8 rounded-3xl shadow-sm hover:border-brand-blue/15 transition-colors">
                <h3 className={`font-display font-bold text-xl ${val.color} mb-3`}>{val.title}</h3>
                <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPANY TIMELINE / MILESTONES */}
      <section className="py-24 relative overflow-hidden bg-transparent">
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
                  <div className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-sm border border-brand-gray-medium/60 shadow-sm flex items-center justify-center font-display font-black text-xs text-brand-blue shrink-0">
                    {milestone.year}
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-brand-gray-medium/55 p-6 rounded-2xl shadow-sm hover:border-brand-blue/15 transition-all">
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

      {/* 4. FOUNDER & TEAM GRID */}
      <section className="py-24 relative z-10 border-t border-brand-gray-medium/20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Founder Feature Block */}
          <div className="bg-white/70 backdrop-blur-md border border-brand-gray-medium/50 rounded-3xl p-8 md:p-12 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 max-w-[280px] mx-auto lg:mx-0">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-brand-gray-medium/40 bg-white">
                  <Image
                    src={teamMembers[0].image}
                    alt={teamMembers[0].name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-display font-black tracking-widest text-brand-gold uppercase block">
                  Meet the Founder
                </span>
                <h3 className="font-display font-black text-3xl text-brand-charcoal">
                  {teamMembers[0].name}
                </h3>
                <p className="text-xs font-display font-bold tracking-wider text-brand-blue uppercase">
                  Founder & Director, Zeel Overseas
                </p>
                <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
                  {teamMembers[0].bio}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
              Our Counselor Team
            </span>
            <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
              Our Counselor Team.
            </h2>
            <p className="text-sm font-body text-brand-charcoal/70 leading-relaxed">
              Behind every successful application is a counselor who knows the process inside out. Our team includes visa documentation specialists, country-specific advisors, and client relationship managers who stay with you from consultation to visa approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.slice(1).map((member, idx) => (
              <Tilt
                key={idx}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareColor="#D4AF37"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
              >
                <div className="group bg-white/60 backdrop-blur-sm border border-brand-gray-medium/60 rounded-3xl p-6 shadow-sm hover:border-brand-gold/30 transition-colors flex items-center space-x-6">
                  {/* Portrait photo frame */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-brand-gray-medium/40 bg-white shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      sizes="100px"
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
      <section className="py-20 border-t border-brand-gray-medium/20 z-10 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-display font-bold tracking-widest text-brand-gray-dark uppercase mb-8">
            Accreditations & Standards
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {affiliations.map((aff, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-sm border border-brand-gray-medium/45 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 shadow-sm hover:border-brand-blue/20 transition-colors animate-float"
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-offwhite flex items-center justify-center border border-brand-gray-medium/20">
                  {aff.icon}
                </div>
                <span className="font-display font-bold text-xs tracking-wide text-brand-charcoal">
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
