"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, PhoneCall, Clock, HelpCircle, ChevronDown } from "lucide-react";
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
              <SplitText text="Let's Start Your" type="words" />
              <br />
              <SplitText text="Global Journey." type="words" />
            </h1>
            <p className="clamp-subtitle text-brand-charcoal/70 max-w-xl font-body">
              Have questions about your visa options? Want a clear, honest assessment of your profile? Reach out — our team responds quickly and consultations are always free.
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
                        placeholder="+91 97274 07050"
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
                        <option value="PR">Permanent Residency (PR)</option>
                        <option value="Tourist Visa">Tourist Visa</option>
                        <option value="Business Visa">Business Visa</option>
                        <option value="Documentation Support">Documentation Support</option>
                      </select>
                      {errors.visaInterest && (
                        <span className="text-xs font-semibold text-red-500">{errors.visaInterest.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Destination Country Dropdown */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="destination" className="text-xs font-display font-bold text-brand-charcoal/70 uppercase tracking-wide">
                      Preferred Country
                    </label>
                    <select
                      id="destination"
                      {...register("destination")}
                      className={`w-full bg-white/60 border ${
                        errors.destination ? "border-red-500" : "border-brand-gray-medium/60"
                      } text-sm px-4 py-3.5 rounded-xl outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15 transition-all font-body cursor-pointer`}
                    >
                      <option value="">Select Preferred Country</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
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
                      Message
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

                  {/* Submit Button */}
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
                          <span>Submit Inquiry</span>
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
                          <span>Sending case details...</span>
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
              Contact Details
            </h3>

            <div className="space-y-4 font-body text-sm text-brand-charcoal/70">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-charcoal block">Zeel Overseas Address</span>
                  <span>B-403/404, The Landmark, Near Kansar Hotel, Kudasan, Gandhinagar, Gujarat - 382421.</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <a href="tel:+919727407050" className="font-semibold text-brand-charcoal hover:text-brand-blue">
                  +91 97274 07050
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <PhoneCall className="w-5 h-5 text-[#25D366] shrink-0" />
                <a href="https://wa.me/919727407050?text=Hi%20Zeel%20Overseas,%20I%20am%20interested%20in%20a%20visa%20consultation." target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-charcoal hover:text-brand-blue">
                  +91 97274 07050
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="mailto:info@zeeloverseas.com" className="font-semibold text-brand-charcoal hover:text-brand-blue">
                  info@zeeloverseas.com
                </a>
              </div>

              <div className="flex items-start space-x-3 border-t border-brand-gray-medium/30 pt-4 text-xs">
                <Clock className="w-4 h-4 text-brand-gray-dark mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-brand-charcoal block">Office Hours:</span>
                  <span>Mon To Sat, 9:00 AM To 6:00 PM</span>
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

      {/* 2.5. SUBMIT ROADMAP INFOGRAPHIC ("What happens after") */}
      <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="bg-white/40 backdrop-blur-sm border border-brand-gray-medium/20 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-2">
              Next Steps
            </span>
            <h2 className="text-3xl font-display font-black text-brand-charcoal">
              What Happens After You Submit the Form?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Review", desc: "Our team reviews your inquiry within [X hours/1 business day]" },
              { step: "02", title: "Contact", desc: "We call or WhatsApp you to schedule your free consultation" },
              { step: "03", title: "Meeting", desc: "You meet with a counselor (in-person or online) to discuss your goals" },
              { step: "04", title: "Roadmap", desc: "We provide a clear next-steps roadmap — no pressure, no obligation" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <span className="text-3xl font-display font-black text-brand-blue/30 block">{item.step}</span>
                <h4 className="font-display font-bold text-lg text-brand-charcoal">{item.title}</h4>
                <p className="text-xs font-body text-brand-charcoal/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.6. CONTACT-SPECIFIC FAQS */}
      <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-display font-black tracking-widest text-brand-blue uppercase block mb-3">
            Inquiry Guidance
          </span>
          <h2 className="clamp-section-title font-display font-black text-brand-charcoal mb-4">
            Contact FAQs.
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Is the first consultation really free?",
              a: "Yes — your first consultation with Zeel Overseas is completely free, with no obligation."
            },
            {
              q: "Can I get a consultation online if I'm not in Ahmedabad?",
              a: "Yes, we offer video/phone consultations for clients outside Ahmedabad and Gujarat."
            },
            {
              q: "How quickly will someone respond to my inquiry?",
              a: "We aim to respond within [X hours/1 business day] — for urgent queries, WhatsApp or call us directly."
            },
            {
              q: "What should I bring to my first consultation?",
              a: "Nothing is required upfront — just come with your questions. If you have existing documents (passport, transcripts, previous visa history), bringing them helps us give more specific guidance."
            },
            {
              q: "Do you offer weekend consultations?",
              a: "[Confirm with client — many consultancies offer Saturday slots for working professionals.]"
            }
          ].map((item, idx) => (
            <details key={idx} className="group bg-white/70 backdrop-blur-md border border-brand-gray-medium/55 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:border-brand-blue/30 [&_summary::-webkit-details-marker]:hidden">
              <summary className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-base md:text-lg text-brand-charcoal hover:text-brand-blue transition-colors cursor-pointer list-none">
                <div className="flex items-center space-x-3.5 pr-4">
                  <HelpCircle className="w-5 h-5 shrink-0 text-brand-gray-dark group-open:text-brand-blue" />
                  <span>{item.q}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-brand-gray-dark group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-6 pb-6 pt-2 text-sm md:text-base font-body text-brand-charcoal/70 leading-relaxed pl-[42px] border-t border-brand-gray-medium/10">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 3. WHATSAPP FLOATING ACTION BUTTON (Pulse Ripple animation) */}
      <a
        href="https://wa.me/919727407050?text=Hi%20Zeel%20Overseas,%20I%20am%20interested%20in%20a%20visa%20consultation."
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
