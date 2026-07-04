import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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

        // ── Brand palette ──
        earth: {
          50:  "#faf8f5",
          100: "#f5f0e8",
          200: "#e8dcc8",
          300: "#d4c0a0",
          400: "#b89968",
          500: "#a67c52",
          600: "#8b6644",
          700: "#6f5139",
          800: "#5c4432",
          900: "#4d3a2b",
          950: "#2e2118",
        },
        terracotta: {
          50:  "#fef5f3",
          100: "#fde8e3",
          200: "#fbd5cc",
          300: "#f7b6a8",
          400: "#f18d75",
          500: "#e56a4a",
          600: "#d24d2e",
          700: "#b03e23",
          800: "#923621",
          900: "#7a3322",
          950: "#3f1610",
        },
        gold: {
          50:  "#fefbea",
          100: "#fef4c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        forest: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },

        // ── Glass surface tokens (CSS-var driven) ──
        glass: {
          light: "rgba(255,252,248,0.55)",
          strong: "rgba(255,252,248,0.78)",
          dark:   "rgba(18,14,8,0.45)",
        },
      },

      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
      },

      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        xl:   "calc(var(--radius) + 4px)",
        "2xl":"calc(var(--radius) + 8px)",
        "3xl":"calc(var(--radius) + 16px)",
      },

      // ── Backdrop blur scale ──
      backdropBlur: {
        xs:  "4px",
        sm:  "8px",
        md:  "12px",
        lg:  "18px",
        xl:  "24px",
        "2xl": "32px",
        "3xl": "48px",
      },

      // ── Box shadow scale ──
      boxShadow: {
        glass:     "0 8px 32px rgba(139,90,40,0.18), 0 2px 8px rgba(0,0,0,0.06)",
        "glass-lg":"0 20px 60px rgba(100,60,20,0.22), 0 4px 16px rgba(0,0,0,0.1)",
        "glass-inset": "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.04)",
        glow:      "0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2)",
        "glow-forest": "0 0 20px rgba(22,163,74,0.35), 0 0 40px rgba(22,163,74,0.18)",
        "glow-terracotta": "0 0 20px rgba(229,106,74,0.4), 0 0 40px rgba(229,106,74,0.2)",
        "card-hover": "0 12px 40px rgba(139,90,40,0.2), 0 2px 8px rgba(0,0,0,0.06)",
        soft:      "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
      },

      // ── Gradient backgrounds as arbitrary values become simpler ──
      backgroundImage: {
        "gradient-amber":     "linear-gradient(135deg, #f59e0b 0%, #e56a4a 60%, #d97706 100%)",
        "gradient-forest":    "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #166534 100%)",
        "gradient-earth":     "linear-gradient(135deg, #b89968 0%, #a67c52 50%, #8b6644 100%)",
        "gradient-dark":      "linear-gradient(135deg, #1a0f05 0%, #2d1a0a 50%, #1f1309 100%)",
        "gradient-warm":      "linear-gradient(160deg, #fdfaf4 0%, #f8f2e8 40%, #f2ece0 100%)",
        "gradient-glass":     "linear-gradient(135deg, rgba(255,252,248,0.65) 0%, rgba(255,245,230,0.45) 100%)",
        "sheen":              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
      },

      // ── Animation durations ──
      transitionDuration: {
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ── Keyframe animations ──
      keyframes: {
        slideIn: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to:   { transform: "translateX(0)",    opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        scaleIn: {
          from: { transform: "scale(0.92)", opacity: "0" },
          to:   { transform: "scale(1)",    opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,158,11,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(245,158,11,0.6), 0 0 60px rgba(245,158,11,0.2)" },
        },
        gradientShift: {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "slide-in":      "slideIn 0.35s cubic-bezier(0.16,1,0.3,1)",
        "slide-up":      "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        "fade-in":       "fadeIn 0.3s ease-out",
        "scale-in":      "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        "float":         "float 3s ease-in-out infinite",
        "glow-pulse":    "glowPulse 2.5s ease-in-out infinite",
        "gradient":      "gradientShift 4s ease infinite",
        "shimmer":       "shimmer 1.5s infinite",
        "spin-slow":     "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
