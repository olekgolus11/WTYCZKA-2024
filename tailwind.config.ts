import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "small-label": "2rem",
        "bigger-label": "2.5rem",
      },
      colors: {
        "primary-color": "#d21212",
        "secondary-color": "#b00d0d",
        "active-color": "#aa1313",
        "mobile-grey": "#050505",
      },
      stroke: {
        "primary-color": "#d21212",
        "secondary-color": "#b00d0d",
        "active-color": "#aa1313",
      },
      borderColor: {
        "primary-color": "#d21212",
        "secondary-color": "#b00d0d",
        "active-color": "#aa1313",
      },
      boxShadowColor: {
        "primary-color": "#d21212",
        "secondary-color": "#b00d0d",
        "active-color": "#aa1313",
      },
      keyframes: {
        "spring-right": {
          from: { transform: "translateX(0px)" },
          to: { transform: "translateX(6px)" },
        },
      },
      animation: {
        "spring-right": "spring-right 0.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
