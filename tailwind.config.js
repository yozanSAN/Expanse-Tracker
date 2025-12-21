/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#0b1f17",
        secondary: "#14352b", 
        tertiary :"#1f5c47",

        textPrimary: "#e5f5ec",
        textSecondary: "#9fbdb0",
        textMuted: "#6b8f7f",

        accent: {
          DEFAULT: "#22c55e",
          soft: "#16a34a",
        },

        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f97316",
        info: "#3b82f6",
      },
    },
  },
  plugins: [],
};
