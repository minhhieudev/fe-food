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
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'slow-zoom': 'slowZoom 30s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'fade-in-up-delayed': 'fadeInUp 0.8s ease-out 0.3s forwards',
        'fade-in-up-more-delayed': 'fadeInUp 0.8s ease-out 0.6s forwards',
        'move-path': 'movePath 10s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-delay': 'bounce 1s infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slowZoom: {
          '0%, 100%': { transform: 'scale(1.0)' },
          '50%': { transform: 'scale(1.05)' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        movePath: {
          '0%': { transform: 'translate(-50%, -50%) translateX(0%)' },
          '25%': { transform: 'translate(-50%, -50%) translateX(100%)' },
          '50%': { transform: 'translate(-50%, -50%) translateX(100%) translateY(100%)' },
          '75%': { transform: 'translate(-50%, -50%) translateX(0%) translateY(100%)' },
          '100%': { transform: 'translate(-50%, -50%) translateX(0%)' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
        '7000': '7000ms',
      },
      translate: {
        'z-0': '0px',
      },
      rotate: {
        'y-180': '180deg',
      },
      scale: {
        'x-0': '0',
      },
      transformOrigin: {
        'left': 'left',
      },
      perspective: {
        '1000': '1000px',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      minWidth: {
        '250px': '250px',
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
    function({ addUtilities }) {
      const newUtilities = {
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.animation-delay-1000': {
          'animation-delay': '1s',
        },
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
