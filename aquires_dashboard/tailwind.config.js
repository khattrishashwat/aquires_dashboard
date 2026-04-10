import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "#6d28d9",
          foreground: "#ffffff",
        },

        secondary: {
          DEFAULT: "#a855f7",
          foreground: "#ffffff",
        },

        muted: {
          DEFAULT: "#635c8a",
          foreground: "#1a1339",
        },

        card: {
          DEFAULT: "#ffffff",
          foreground: "#1a1339",
        },
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        custom: "32px",
      },

      boxShadow: {
        card: "0 20px 60px rgba(0,0,0,0.08)",
        glow: "0 10px 30px rgba(168,85,247,0.4)",
      },

      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, #6d28d9, #a855f7)",
        "hero-gradient":
          "linear-gradient(to bottom right, #1e1b4b, #6d28d9, #a855f7)",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;