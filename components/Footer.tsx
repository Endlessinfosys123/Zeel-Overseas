"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Instagram, Facebook, Linkedin, ArrowRight } from "lucide-react";
import { servicesData } from "@/lib/data";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden border-t border-brand-gray-medium/30 z-10 bg-white/70 backdrop-blur-sm">
      {/* Huge faded decorative wordmark in the background */}
      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 select-none pointer-events-none w-full text-center overflow-hidden h-fit z-0 opacity-[0.02] translate-y-[20%]">
        <span className="font-display font-black text-[12vw] tracking-tighter uppercase text-brand-charcoal leading-none whitespace-nowrap">
          ZEEL OVERSEAS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="Zeel Overseas Logo"
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed font-body">
              Your gateway to global education, career advancement, and permanent residency. We deliver premium, certified immigration consulting to move you across borders successfully.
            </p>
            {/* Social media icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-gray-medium flex items-center justify-center text-brand-charcoal hover:text-brand-blue hover:border-brand-blue transition-colors cursor-pointer bg-white"
                  whileHover={{ scale: 1.15, y: -4 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-brand-charcoal">
              Quick Links
            </h3>
            <ul className="space-y-3 flex flex-col">
              <li>
                <Link href="/about" className="text-sm text-brand-charcoal/70 hover:text-brand-blue link-draw w-fit">
                  About Our Agency
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-brand-charcoal/70 hover:text-brand-blue link-draw w-fit">
                  All Visa Services
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm text-brand-charcoal/70 hover:text-brand-blue link-draw w-fit">
                  Client Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-brand-charcoal/70 hover:text-brand-blue link-draw w-fit">
                  Contact Office Direct
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Visas Offered */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-brand-charcoal">
              Immigration Services
            </h3>
            <ul className="space-y-3 flex flex-col">
              {servicesData.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-brand-charcoal/70 hover:text-brand-blue link-draw w-fit"
                  >
                    {service.title} Services
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-brand-charcoal">
              Global Updates
            </h3>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed font-body">
              Subscribe to receive instant policy alerts and immigration changes from target embassies.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-brand-gray-medium/60 text-sm px-4 py-3 rounded-full outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 pr-12 transition-all font-body"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 w-9 h-9 rounded-full bg-brand-blue hover:bg-brand-blue-light text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-600 font-display font-semibold">
                Successfully subscribed for embassy alerts!
              </p>
            )}
          </div>
        </div>

        {/* Target Country Flag row */}
        <div className="border-t border-brand-gray-medium/50 py-8 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center space-x-2 text-xs font-display font-bold tracking-widest text-brand-gray-dark uppercase">
            <span>TARGET COUNTRIES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-display font-semibold text-brand-charcoal/80">
            <span className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-brand-gray-medium/40 rounded-full">
              <span>🇨🇦</span> <span>Canada</span>
            </span>
            <span className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-brand-gray-medium/40 rounded-full">
              <span>🇦🇺</span> <span>Australia</span>
            </span>
            <span className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-brand-gray-medium/40 rounded-full">
              <span>🇬🇧</span> <span>United Kingdom</span>
            </span>
            <span className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-brand-gray-medium/40 rounded-full">
              <span>🇺🇸</span> <span>United States</span>
            </span>
            <span className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-brand-gray-medium/40 rounded-full">
              <span>🇩🇪</span> <span>Germany</span>
            </span>
            <span className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-brand-gray-medium/40 rounded-full">
              <span>🇳🇿</span> <span>New Zealand</span>
            </span>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-brand-gray-medium/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray-dark font-body">
          <p>© {new Date().getFullYear()} Zeel Overseas. All rights reserved. All visual designs are trade-restricted.</p>
          <div className="flex items-center space-x-1.5">
            <span>Crafted by</span>
            <a
              href="https://quantifyrellp.space"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-black tracking-wide text-brand-charcoal hover:text-brand-blue transition-colors uppercase"
            >
              QUANTIFYRE LLP
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
