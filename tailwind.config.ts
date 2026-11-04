import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        genix: {
          navy: "#1B1947",
          "navy-dark": "#131136",
          "navy-light": "#282566",
          blue: "#3B5998",
          "blue-dark": "#2D4373",
          "blue-light": "#4C70BA",
          crimson: "#E1251B",
          "crimson-dark": "#B81D15",
          slate: "#F8FAFC",
        },
      },
      fontFamily: {
        heading: ["var(--font-nourd)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(27, 25, 71, 0.08)",
        "card-hover": "0 20px 40px -10px rgba(27, 25, 71, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;

