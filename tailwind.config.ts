import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ─── Brand Color Palette ───────────────────────────────────────────────
      colors: {
        brand: {
          50:  "#eef5ff",
          100: "#d9e8ff",
          200: "#bbd4ff",
          300: "#8db8ff",
          400: "#5a92ff",
          500: "#3068f5",   // Primary brand blue
          600: "#1d4ed8",   // IIT accent
          700: "#1a3db0",
          800: "#1a338f",
          900: "#1c2f75",
          950: "#141f50",
        },
        navy: {
          50:  "#eef1f8",
          100: "#d8dfef",
          200: "#b6c3e2",
          300: "#8a9dcf",
          400: "#6578b9",
          500: "#4a5ca4",
          600: "#3d4e8c",
          700: "#334172",
          800: "#1e2a52",   // Deep navy background
          900: "#141c3a",
          950: "#0c1124",
        },
        teal: {
          50:  "#edfafa",
          100: "#d5f5f6",
          200: "#aeeaed",
          300: "#76d9de",
          400: "#39bfc7",
          500: "#17a3ad",   // Accent teal
          600: "#128390",
          700: "#136975",
          800: "#165561",
          900: "#164653",
          950: "#082d38",
        },
        gold: {
          50:  "#fffbeb",
          100: "#fff3c4",
          200: "#ffe585",
          300: "#ffd147",
          400: "#ffbb1e",
          500: "#f59e0b",   // Gold accent
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        glass: {
          white: "rgba(255,255,255,0.08)",
          "white-10": "rgba(255,255,255,0.10)",
          "white-15": "rgba(255,255,255,0.15)",
          "white-20": "rgba(255,255,255,0.20)",
          dark: "rgba(14,22,58,0.60)",
          "dark-80": "rgba(14,22,58,0.80)",
        },
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
        widest: "0.25em",
      },

      // ─── Spacing & Layout ──────────────────────────────────────────────────
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },

      // ─── Backdrop Blur (Glassmorphism) ─────────────────────────────────────
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },

      // ─── Box Shadows ───────────────────────────────────────────────────────
      boxShadow: {
        "glass-sm":  "0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
        "glass-md":  "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
        "glass-lg":  "0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
        "glass-xl":  "0 40px 96px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.18)",
        "brand-sm":  "0 0 16px rgba(48,104,245,0.25)",
        "brand-md":  "0 0 32px rgba(48,104,245,0.35)",
        "brand-lg":  "0 0 64px rgba(48,104,245,0.45)",
        "teal-glow": "0 0 32px rgba(23,163,173,0.30)",
        "gold-glow": "0 0 24px rgba(245,158,11,0.35)",
        "card":      "0 4px 24px rgba(14,22,58,0.18)",
        "card-hover":"0 12px 48px rgba(14,22,58,0.30)",
        "inner-top": "inset 0 1px 0 rgba(255,255,255,0.10)",
      },

      // ─── Gradients (via backgroundImage) ──────────────────────────────────
      backgroundImage: {
        "gradient-radial":       "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":         "linear-gradient(135deg, #0c1124 0%, #1e2a52 40%, #141f50 70%, #082d38 100%)",
        "card-gradient":         "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "brand-gradient":        "linear-gradient(135deg, #3068f5 0%, #17a3ad 100%)",
        "gold-gradient":         "linear-gradient(135deg, #f59e0b 0%, #ffbb1e 100%)",
        "navy-gradient":         "linear-gradient(180deg, #0c1124 0%, #1e2a52 100%)",
        "mesh-gradient":         "radial-gradient(at 40% 20%, rgba(48,104,245,0.15) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(23,163,173,0.10) 0, transparent 50%), radial-gradient(at 0% 50%, rgba(245,158,11,0.08) 0, transparent 50%)",
      },

      // ─── Custom Keyframe Animations ────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%":   { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-left": {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-right": {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%":   { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        "slide-down": {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)",     opacity: "1" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(48,104,245,0.30)" },
          "50%":       { boxShadow: "0 0 40px rgba(48,104,245,0.60)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(-4%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
          "50%":       { transform: "translateY(0)",  animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
        },
        "confetti-fall": {
          "0%":   { transform: "translateY(-10px) rotate(0deg)",   opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        "ticker": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        "navbar-blur": {
          "0%":   { backdropFilter: "blur(0px)", backgroundColor: "rgba(14,22,58,0)" },
          "100%": { backdropFilter: "blur(16px)", backgroundColor: "rgba(14,22,58,0.85)" },
        },
      },

      // ─── Animation Utilities ───────────────────────────────────────────────
      animation: {
        "fade-in":       "fade-in 0.5s ease-out forwards",
        "fade-up":       "fade-up 0.6s ease-out forwards",
        "fade-down":     "fade-down 0.6s ease-out forwards",
        "fade-left":     "fade-left 0.6s ease-out forwards",
        "fade-right":    "fade-right 0.6s ease-out forwards",
        "scale-in":      "scale-in 0.5s ease-out forwards",
        "slide-up":      "slide-up 0.5s ease-out forwards",
        "slide-down":    "slide-down 0.4s ease-out forwards",
        "shimmer":       "shimmer 2.5s linear infinite",
        "pulse-glow":    "pulse-glow 2.5s ease-in-out infinite",
        "float":         "float 3.5s ease-in-out infinite",
        "spin-slow":     "spin-slow 12s linear infinite",
        "bounce-soft":   "bounce-soft 1s infinite",
        "confetti-fall": "confetti-fall 3s ease-in forwards",
        "ticker":        "ticker 30s linear infinite",
        "gradient-shift":"gradient-shift 6s ease infinite",
      },

      // ─── Transition Timing Functions ───────────────────────────────────────
      transitionTimingFunction: {
        "bounce-in":  "cubic-bezier(0.68,-0.55,0.265,1.55)",
        "smooth-out": "cubic-bezier(0.25,0.46,0.45,0.94)",
        "elastic":    "cubic-bezier(0.175,0.885,0.32,1.275)",
      },

      // ─── Z-Index Scale ──────────────────────────────────────────────────────
      zIndex: {
        "60":  "60",
        "70":  "70",
        "80":  "80",
        "90":  "90",
        "100": "100",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
