import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        primary: {
          DEFAULT: "#1A535C",
          50: "#E8F4F5",
          100: "#C5E4E7",
          200: "#9DD1D5",
          300: "#75BDC3",
          400: "#4DAAB1",
          500: "#1A535C",
          600: "#154449",
          700: "#103536",
          800: "#0B2626",
          900: "#061717",
        },
        accent: {
          DEFAULT: "#4ECDC4",
          50: "#F0FAFA",
          100: "#D9F3F0",
          200: "#B3E6E1",
          300: "#8DD9D2",
          400: "#67CCC3",
          500: "#4ECDC4",
          600: "#3EA99A",
          700: "#2E8573",
          800: "#1F614D",
          900: "#0F3D2A",
        },
        surface: "#F7FFF7",
      },
    },
  },
  plugins: [],
};
export default config;
