/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // 430 이하
        phone: "320px",
        tablet: "744px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};
