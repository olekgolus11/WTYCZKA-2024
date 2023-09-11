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
        "primary-color": "#EE00AB",
        "secondary-color": "#ff4dcc",
        "active-color": "#b30080",
      },
    },
  },
  plugins: [],
};
export default config;
