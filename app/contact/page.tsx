"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, PhoneCall, Clock } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import ContactSuccessAnimation from "@/components/3d/ContactSuccessAnimation";

// Define Form validation schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Provide a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  visaInterest: z.string().min(1, { message: "Please select a visa stream." }),
  destination: z.string().min(1, { message: "Please select a destination country." }),
  message: z.string().min(5, { message: "Message must contain at least 5 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "animating">("idle");
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form submitted:", data);
    setSubmitState("loading");
    // Mock network request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
    setSubmitState("animating");
  };

  const handleReset = () => {
    setSubmitState("idle");
    setSubmittedData(null);
    reset();
  };

  return (
    <div className="bg-transparent min-h-screen py-16 relative">
      {/* 1. HERO SECTION */}
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl flex flex-col space-y-6">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block">
              Direct Contact
            </span>
            <h1 className="clamp-title font-display font-black text-brand-charcoal leading-none">
              <SplitText text="Let&apos;s Plan Your" type="words" />
              <br />
              <SplitText text="Global Move." type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-charcoal/70 max-w-xl font-body">
              Have a question about your visa options? Reach out — our counsellors are ready to help. Standard evaluation filings are queued in order of arrival.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT FORM & INFO */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 z-10 relative">
        
        {/* Left Column: Form Wrapper / Success Animation Wrapper */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md border border-brand-gray-medium/55 p-8 md:p-10 rounded-3xl shadow-sm overflow-hidden min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {submitState !== "animating" ? (
              <motion.div
                key="contact-form-key"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <h2 className="text-2xl font-display font-black text-brand-charcoal mb-6 border-b border-brand-gray-medium/30 pb-4">
                  Consultation Case File
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full bg-white/60 border ${
                    errors.name ? "border-red-500" : "border-brand-gray-medium/60"
                  } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <span className="text-xs font-semibold text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full bg-white/60 border ${
                    errors.email ? "border-red-500" : "border-brand-gray-medium/60"
                  } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="text-xs font-semibold text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="phone" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className={`w-full bg-white/60 border ${
                    errors.phone ? "border-red-500" : "border-brand-gray-medium/60"
                  } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <span className="text-xs font-semibold text-red-500">{errors.phone.message}</span>
                )}
              </div>

              {/* Visa Interest Dropdown */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="visaInterest" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                  Visa Interest
                </label>
                <select
                  id="visaInterest"
                  {...register("visaInterest")}
                  className={`w-full bg-white/60 border ${
                    errors.visaInterest ? "border-red-500" : "border-brand-gray-medium/60"
                  } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body cursor-pointer`}
                >
                  <option value="">Select a Visa stream</option>
                  <option value="Study Visa">Study Visa</option>
                  <option value="Work Visa">Work Visa</option>
                  <option value="Permanent Residency">Permanent Residency (PR)</option>
                  <option value="Tourist Visa">Tourist / Schengen Visa</option>
                  <option value="Business Visa">Business Investor Visa</option>
                  <option value="Visa Documentation">Forensic SOP Review</option>
                </select>
                {errors.visaInterest && (
                  <span className="text-xs font-semibold text-red-500">{errors.visaInterest.message}</span>
                )}
              </div>
            </div>

            {/* Destination Country Dropdown */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="destination" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                Preferred Destination Country
              </label>
              <select
                id="destination"
                {...register("destination")}
                className={`w-full bg-white/60 border ${
                  errors.destination ? "border-red-500" : "border-brand-gray-medium/60"
                } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body cursor-pointer`}
              >
                <option value="">Select Destination</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Germany">Germany</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Other">Other</option>
              </select>
              {errors.destination && (
                <span className="text-xs font-semibold text-red-500">{errors.destination.message}</span>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                Case Details
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className={`w-full bg-white/60 border ${
                  errors.message ? "border-red-500" : "border-brand-gray-medium/60"
                } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body resize-none`}
                placeholder="Detail your educational history, language score, or job profile..."
              />
              {errors.message && (
                <span className="text-xs font-semibold text-red-500">{errors.message.message}</span>
              )}
            </div>

            {/* Morphing Submit Button */}
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="w-full relative overflow-hidden bg-brand-blue text-white font-display font-bold py-4 px-6 rounded-full shadow-md flex items-center justify-center space-x-2 hover:bg-brand-blue-light transition-colors duration-300 disabled:opacity-80 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {submitState === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="inline-flex items-center space-x-2"
                  >
                    <span>Submit Case File</span>
                    <Send className="w-4 h-4" />
                  </motion.span>
                )}

                {submitState === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center space-x-2"
                  >
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Auditing Submission...</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-animation-key"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {submittedData && (
              <ContactSuccessAnimation
                formData={submittedData}
                onReset={handleReset}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>

        {/* Right Column: Office info & map */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          {/* Office Details */}
          <div className="bg-white/70 backdrop-blur-md border border-brand-gray-medium/55 p-8 rounded-3xl shadow-sm space-y-6">
            <h3 className="font-display font-black text-2xl text-brand-charcoal mb-4">
              Headquarters
            </h3>

            <div className="space-y-4 font-body text-sm text-brand-charcoal/70">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-charcoal block">Zeel Overseas Tower</span>
                  <span>4th Floor, Skyline Avenue, Sector 5, Ahmedabad, Gujarat, India</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <a href="tel:+919876543210" className="hover:text-brand-blue font-semibold text-brand-charcoal">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="mailto:info@zeeloverseas.com" className="hover:text-brand-blue font-semibold text-brand-charcoal">
                  info@zeeloverseas.com
                </a>
              </div>

              <div className="flex items-start space-x-3 border-t border-brand-gray-medium/30 pt-4 text-xs">
                <Clock className="w-4 h-4 text-brand-gray-dark mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-brand-charcoal block">Business Hours:</span>
                  <span>Monday - Saturday: 9:30 AM - 6:30 PM (IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (Premium Silver Light style) */}
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-brand-gray-medium/50 shadow-sm relative bg-brand-warm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.070624734898!2d72.57136215!3d23.02250505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd70d1102b48!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.1) brightness(0.95)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zeel Overseas Office Map Location"
            />
          </div>
        </div>
      </section>

      {/* 3. WHATSAPP FLOATING ACTION BUTTON (Pulse Ripple animation) */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Zeel%20Overseas,%20I%20am%20interested%20in%20a%20visa%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9990] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
        aria-label="Contact via WhatsApp"
      >
        {/* Pulsing Ripple circles */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-[#25D366]/40 animate-pulse -z-10" />
        <PhoneCall className="w-6 h-6 animate-bounce" />
      </a>
    </div>
  );
}
