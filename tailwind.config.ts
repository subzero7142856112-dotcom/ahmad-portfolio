import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      colors: {
        ink: {
          DEFAULT: "#05070e",
          deep: "#03050a",
          soft: "#070a12",
          raised: "#090d17",
        },
        surface: {
          DEFAULT: "#0a0e19",
          hover: "#0e1424",
          inset: "#070a12",
        },
        line: {
          DEFAULT: "rgba(148, 163, 184, 0.12)",
          strong: "rgba(148, 163, 184, 0.24)",
          focus: "rgba(79, 125, 255, 0.55)",
        },
        primary: {
          DEFAULT: "#4f7dff",
          light: "#8aa8ff",
          dark: "#3560e6",
          soft: "rgba(79, 125, 255, 0.12)",
          glow: "rgba(79, 125, 255, 0.35)",
        },
        accent: {
          DEFAULT: "#22d3ee",
          soft: "rgba(34, 211, 238, 0.12)",
        },
        violet: {
          DEFAULT: "#7c6bff",
          soft: "rgba(124, 107, 255, 0.14)",
        },
        fg: {
          DEFAULT: "#eef2f9",
          muted: "#98a4ba",
          dim: "#6d7a91",
        },
        success: "#34d399",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        label: "0.16em",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.15rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 40px -28px rgba(0,0,0,0.9)",
        lift: "0 24px 48px -24px rgba(0,0,0,0.85), 0 0 0 1px rgba(79,125,255,0.16)",
        glow: "0 0 0 1px rgba(79,125,255,0.28), 0 12px 40px -16px rgba(79,125,255,0.45)",
        nav: "0 12px 32px -20px rgba(0,0,0,0.9)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0, 18px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s ease both",
        float: "float 7s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
