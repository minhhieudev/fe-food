import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "custom-rgba": "rgba(255, 255, 255, 0.20)",
        "custom-rgba2": "rgba(0, 0, 0, 0.50)",
      },
      backgroundImage: {
        "bg-hot": "",
      },
      colors: {
        "regal-blue": "#243c5a",
        primary: "#FF8900",
        primaryColor: "#FF8900",
        default: "#F2F4F5",
        gray100: "#F7F9FA",
        gray200: "#F2F4F5",
        gray300: "#E3E5E5",
        gray400: "#CDCFD0",
        gray500: "#979C9E",
        green400: "#4caf50",
      },
      spacing: {
        400: "400px",
      },
    },
    fontFamily: {
      Soup: ["Soup of Justice"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#FF8900",
            },
          },
        },
      },
    }),
  ],
};

export default config;
