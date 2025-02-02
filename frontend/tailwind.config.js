import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        // Adding custom font
        "tw-cen": ['"Tw Cen MT Condensed Bold"', "sans-serif"],
        body: ["Arial", "sans-serif"],
      },
      animation: {
        zoom: "zoom 15s ease-in-out infinite", 
      },
      keyframes: {
        zoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },

  plugins: [flowbite.plugin()],
};
