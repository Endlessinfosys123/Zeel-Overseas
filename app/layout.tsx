import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Dynamic wrappers
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/ui/GlobalBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zeel Overseas | Immigration & Visa Consultants, Gandhinagar",
  description: "Zeel Overseas offers expert visa & immigration consultancy in Gandhinagar — study visas, work permits, PR pathways & visa documentation for Canada, UK, Australia, USA & more.",
  keywords: ["Zeel Overseas", "Visa Consultants", "Immigration Agency", "Study Visa Canada", "Australia PR Subclass", "Work Permits UK", "USA Student Visas", "Express Entry Canada", "Embassy Documentation Service", "immigration consultant Gandhinagar", "visa consultancy Gujarat", "study visa consultant Gandhinagar", "work visa consultants", "PR visa consultant", "best immigration consultant in Gandhinagar", "Canada visa consultant Gandhinagar", "Germany opportunity card consultant"],
  authors: [{ name: "Zeel Overseas" }],
  openGraph: {
    title: "Zeel Overseas | Immigration & Visa Consultants, Gandhinagar",
    description: "Zeel Overseas offers expert visa & immigration consultancy in Gandhinagar — study visas, work permits, PR pathways & visa documentation for Canada, UK, Australia, USA & more.",
    type: "website",
    locale: "en_US",
    siteName: "Zeel Overseas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeel Overseas | Immigration & Visa Consultants, Gandhinagar",
    description: "Zeel Overseas offers expert visa & immigration consultancy in Gandhinagar — study visas, work permits, PR pathways & visa documentation for Canada, UK, Australia, USA & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-transparent text-brand-charcoal min-h-screen flex flex-col antialiased">
        {/* Grain Noise Overlay for Tactile Premium Feeling */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Global Animated Background — visa/travel themed floating elements */}
        <GlobalBackground />
        
        {/* Animated Custom Cursor (Spring enabled) */}
        <CustomCursor />
        
        {/* Boarding Pass stamp intro preloader */}
        <Preloader />

        {/* Inertia Smooth Scroll Wrapper */}
        <SmoothScroll>
          <div className="flex flex-col min-h-screen relative" style={{ background: "transparent" }}>
            <Navbar />
            <main className="flex-grow pt-20" style={{ background: "transparent" }}>
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
