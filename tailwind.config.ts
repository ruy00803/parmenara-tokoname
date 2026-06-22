import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto)", "Noto Sans JP", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#c0392b",
          light: "#e74c3c",
        },
        accent: "#d4a017",
      },
    },
  },
  plugins: [],
};

export default config;
