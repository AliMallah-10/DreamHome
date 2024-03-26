/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backdropBlur: {
        md: "9px",
      },
      height: {
        custom: "29rem",
      },
      text: {
        custom: "29rem",
      },
      colors: {
        lightGreen: "#11CF11",
        darkGreen: "#2eca6a",
      },
    },
  },
  plugins: [],
};
