import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        brand: {
          blue: {
            DEFAULT: "#2563EB",
            light: "#3B82F6",
            bg: "#EFF6FF",
          },
          gold: {
            DEFAULT: "#D4AF37",
            light: "#FFB84D",
            pale: "#FAF5E6",
          },
          charcoal: "#1A1A1A",
          offwhite: "#FAFAF8",
          warm: "#F1F0EC",
          gray: {
            light: "#F9F9F8",
            medium: "#E5E5E0",
            dark: "#70706B",
          }
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "marquee-scroll": "marquee 35s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
