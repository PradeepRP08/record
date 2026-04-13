/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        record: {
          orange: "#E8612D",
          "orange-dark": "#D4521E",
          "orange-light": "#F0845A",
          dark: "#1E293B",
          "dark-2": "#2D3A4A",
          gray: "#64748B",
          "gray-light": "#F1F5F9",
          "gray-bg": "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
