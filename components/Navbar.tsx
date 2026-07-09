"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isWhiteNav = !isScrolled && pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9990] transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-filter backdrop-blur-lg border-b border-brand-gray-medium/40 py-4 shadow-sm"
            : isWhiteNav
            ? "bg-neutral-950/45 backdrop-filter backdrop-blur-md border-b border-white/5 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className={`flex items-center group z-[9995] transition-all duration-500 rounded-xl px-3 py-1.5 ${
              isWhiteNav 
                ? "bg-white/90 backdrop-blur-md border border-white/20 shadow-sm" 
                : "bg-transparent border-transparent"
            }`}
          >
            <img
              src="/logo.png"
              alt="Zeel Overseas Logo"
              className="h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`link-draw font-display text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? isWhiteNav
                        ? "text-brand-gold-light font-black"
                        : "text-brand-blue"
                      : isWhiteNav
                      ? "text-white/80 hover:text-white"
                      : "text-brand-charcoal hover:text-brand-blue"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-brand-gold text-brand-charcoal hover:text-white font-display font-bold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2 magnetic-target"
            >
              {/* Background slide overlay */}
              <span className="absolute inset-0 bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
              
              {/* Content */}
              <span className="relative z-10 transition-colors duration-300">Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 transition-colors duration-300" />
            </Link>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 z-[9995] cursor-pointer transition-colors duration-300 ${
              isMobileMenuOpen
                ? "text-brand-charcoal"
                : isWhiteNav
                ? "text-white hover:text-brand-gold-light"
                : "text-brand-charcoal hover:text-brand-blue"
            }`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-brand-offwhite z-[9980] flex flex-col justify-center px-8 md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-display text-4xl font-black block tracking-tight ${
                        isActive ? "text-brand-blue" : "text-brand-charcoal"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.4 }}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  className="bg-brand-gold text-brand-charcoal w-full text-center font-display font-bold py-4 px-6 rounded-full inline-flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Footer Details */}
            <div className="absolute bottom-10 left-8 right-8 border-t border-brand-gray-medium/50 pt-6">
              <span className="text-[10px] text-brand-gray-dark uppercase tracking-widest font-display block mb-1">
                CONTACT DIRECT
              </span>
              <a href="tel:+919727407050" className="text-sm font-bold text-brand-charcoal block hover:text-brand-blue">
                +91 97274 07050
              </a>
              <a href="mailto:info@zeeloverseas.com" className="text-sm font-bold text-brand-charcoal block hover:text-brand-blue">
                info@zeeloverseas.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
