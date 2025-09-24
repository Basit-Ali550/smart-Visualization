/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0461A6",   // Main brand color
        black: "#000000",     // Pure black
        grayLight: "#A5A5A5", // Light gray
        grayDark: "#464646",  // Dark gray
      },
    },
  },
  plugins: [],
}
