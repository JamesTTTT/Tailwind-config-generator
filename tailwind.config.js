/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ef9b9d",
        secondary: "#f7a28f",
        accent: "#04d3bb",
        neutral: "#1F1E2F",
        info: "#8DB4E8",
        success: "#24D6A0",
        warning: "#BD9E14",
        error: "#E63333",
        base: "#32395D",
      },
    },
  },
  plugins: [],
};
