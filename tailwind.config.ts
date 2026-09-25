import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces (from Fit_Log.penpot palette)
        base: {
          DEFAULT: "#0f1115",
          soft: "#13161d",
          softer: "#15171d",
        },
        surface: {
          DEFAULT: "#1b1f28",
          raised: "#1e2330",
          hover: "#20242e",
          card: "#232732",
        },
        border: {
          DEFAULT: "#2d313b",
          soft: "#20242e",
        },
        ink: {
          DEFAULT: "#ffffff",
          muted: "#9ca3af",
          soft: "#d1d5db",
          faint: "#6b7280",
        },
        accent: {
          DEFAULT: "#ccff00",
          dim: "#c2f800",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Oswald", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
