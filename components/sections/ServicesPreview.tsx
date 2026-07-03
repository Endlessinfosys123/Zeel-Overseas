"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { servicesData } from "@/lib/data";
import { GraduationCap, Briefcase, FileText, Globe, Landmark, ShieldCheck, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  FileText: FileText,
  Globe: Globe,
  Landmark: Landmark,
  ShieldCheck: ShieldCheck,
};

export const ServicesPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for service cards on scroll
      gsap.fromTo(
        ".service-card-wrapper",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-brand-warm relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
            Our Visa Streams
          </span>
          <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
            Custom-Built Pathways to <br />
            Global Success.
          </h2>
          <p className="text-sm font-body text-brand-charcoal/70 max-w-xl leading-relaxed">
            Choose from our specialized visa streams. Each application receives rigorous planning, expert case auditing, and absolute compliance alignment.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName];
            return (
              <div key={service.slug} className="service-card-wrapper">
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#3B82F6"
                  glarePosition="all"
                  tiltMaxAngleX={7}
                  tiltMaxAngleY={7}
                  className="h-full"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="bento-card block p-8 rounded-2xl h-full flex flex-col justify-between group relative overflow-hidden bg-white/70 border border-brand-gray-medium/40 shadow-sm"
                  >
                    {/* Background Decorative Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:bg-brand-blue/10 transition-colors duration-300" />

                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-500">
                        {Icon && <Icon className="w-6 h-6" />}
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

                    {/* Action footer */}
                    <div className="flex items-center space-x-2 pt-4 border-t border-brand-gray-medium/20 text-xs font-display font-bold text-brand-blue">
                      <span>EXPLORE STREAM</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </Link>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
