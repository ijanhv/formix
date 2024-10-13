import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    fontFamily: {
      roboto: ["var(--font-roboto)"],
      quick: ["var(--font-quick)"],
      open: ["var(--font-open)"],
      mont: ["var(--font-mont)"],
      poppins: ["var(--font-poppins)"],
      jost: ["var(--font-jost)"],
      serifDisplay: ["var(--font-serif-display)"],
      libre: ["var(--font-libre)"],
      space: ["var(--font-space)"],
      prata: ["var(--font-prata)"],
      lobster: ["var(--font-lobster)"],
      playfairDisplay: ["var(--font-playfair)"],
    },
    extend: {
      colors: {
        "blue-voilet": "#4B2AAD",
        "cool-december": "#FDFBF9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        twinkle: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "automation-zoom-in": {
          "0%": { transform: "translateY(-30px) scale(0.2)" },
          "100%": { transform: "transform: translateY(0px) scale(1)" },
        },
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        "fade-in-fall": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
            maxHeight: "0",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            maxHeight: "300px",
          },
        },
        "fade-out-fall": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
            maxHeight: "300px",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-20px)",
            maxHeight: "0",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
        "rotate-new": {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        twinkle: "twinkle 0.2s linear 2",
        "fade-in-fall": "fade-in-fall 0.3s ease-out forwards",
        "fade-out-fall": "fade-out-fall 0.3s ease-in forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "automation-zoom-in": "automation-zoom-in 0.5s",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
        "rotate-new": "rotate-new 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        marquee: "marquee var(--duration) linear infinite",
      },
      transitionProperty: {
        "max-height": "max-height", // Ensures transition of height
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
} satisfies Config;

export default config;
