import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        heading: ["Outfit", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      keyframes: {
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "scan": {
          "from": { transform: "translateY(-100%)" },
          "to": { transform: "translateY(100%)" },
        },
        "pulse-amber": {
          "0%, 100%": { opacity: "1", filter: "brightness(1) contrast(1)" },
          "50%": { opacity: "0.7", filter: "brightness(1.2) contrast(1.1)" },
        },
        "flicker": {
          "0%": { opacity: "0.97" },
          "5%": { opacity: "0.95" },
          "10%": { opacity: "0.9" },
          "15%": { opacity: "0.98" },
          "20%": { opacity: "0.92" },
          "25%": { opacity: "0.99" },
          "30%": { opacity: "0.95" },
          "100%": { opacity: "1" },
        },
        "aberration": {
          "0%, 100%": { textShadow: "1px 0 0 rgba(255,0,0,0.5), -1px 0 0 rgba(0,255,255,0.5)" },
          "50%": { textShadow: "1.5px 0 0 rgba(255,0,0,0.7), -1.5px 0 0 rgba(0,255,255,0.7)" },
        }
      },
      animation: {
        glitch: "glitch 0.2s ease-in-out infinite",
        scan: "scan 8s linear infinite",
        "pulse-amber": "pulse-amber 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flicker": "flicker 0.15s infinite",
        "aberration": "aberration 0.2s ease-in-out infinite",
      },
    },
  }
} satisfies Config;
