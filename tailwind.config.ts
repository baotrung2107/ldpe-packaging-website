import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F7FAFC",
          content: "#FFFFFF",
          navy: "#062B4F",
          "light-blue": "#EAF3FC",
          border: "#D9E4EF",
          heading: "#102A43",
          body: "#40566F",
          subtle: "#6B7C93",
          blue: "#0B63CE",
          "blue-hover": "#084FA6",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
      },
      borderRadius: {
        brand: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
