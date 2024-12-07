import { transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Barlow: ["Barlow", "sans-serif"],
      },
      screens: {
        vsm: "400px",
        mlg: { max: "1200px" },
      },
      colors: {
        "body-bg": "#FFFFFF", // White for clean background
        "body-text-color": "#4B4B4B", // Neutral dark gray for text
        "heading-color": "#1E1E50", // Dark navy blue for headings
        "theme-color": "#8B0000", // Maroon as primary theme color
        "theme-bg": "#F6F6F6", // Light gray background
        "theme-bg2": "#E9ECEF", // Slightly darker gray
        "theme-bg-light": "#FAFAFA", // Lightest background
        "theme-color-light": "#D4AF37", // Gold accent color
        "color-white": "#FFFFFF", // White
        "color-dark": "#1E1E50", // Navy blue
        "color-success": "#10B981", // Green for success
        "color-primary": "#8B0000", // Maroon
        "color-info": "#4B4B4B", // Neutral gray for info
        "color-danger": "#FF4D4F", // Red for errors/danger
        "color-warning": "#FFC107", // Yellow for warnings
        "color-secondary": "#D4AF37", // Gold as secondary
        hover: "#A50000", // Slightly lighter maroon for hover
        "border-info-color": "#E0E0E0", // Light gray border
        "border-white-color": "#FFFFFF", // White border
        "footer-bg": "#1E1E50", // Navy blue for footer
        "footer-text-color": "#FFFFFF", // White text on footer
      },
      backgroundImage: {
        "hero-img": "url(./assets/kl-university-banner.jpg)", // Replace with a relevant KL University image
      },

      keyframes: {
        fadeinkey: {
          "0%": {
            transform: "scale(0)",
            visibility: "hidden",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeoutkey: {
          "0%": {
            visibility: "visible",
            opacity: 1,
          },
          "100%": { visibility: "hidden", opacity: 0 },
        },
        floatkey: {
          "0%, 100%": {
            transform: "translate(0,0)",
          },
          "50%": {
            transform: "translate(0,10px)",
          },
        },
        counterspin: {
          to: {
            transform: "rotate(-360deg)",
          },
        },
        clockspin: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        successkey: {
          "0%": {
            transform: "translate(0,100px)",
            visibility: "hidden",
            opacity: 0,
          },
          "100%": {
            transform: "translate(0,0)",
            visibility: "visible",
            opacity: 1,
          },
        },
        fadeinoutkey: {
          "0%, 100%": {
            visibility: "visible",
            opacity: 1,
          },
          "50%": {
            visibility: "hidden",
            opacity: 0,
          },
        },
      },
      animation: {
        fadein: "fadeinkey 300ms",
        fadeout: "fadeoutkey 300ms",
        float: "floatkey 3s ease-in-out infinite",
        counterspin: "counterspin 2s infinite",
        successpayment: "successkey 1s ease-in-out",
        fadeinout: "fadeinoutkey 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("inputs", "& input");
      addVariant("button", "& button");
      addVariant("select", "& select");
      addVariant("link", "& a");
    },
  ],
};
