/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: {
          bg: "var(--bg-primary)",
          card: "var(--bg-secondary)",
          hover: "var(--bg-tertiary)",
          border: "var(--border-color)",
          text: "var(--text-primary)",
          muted: "var(--text-secondary)",
          accent: "var(--accent-color)",
        },
      },
    },
  },
  plugins: [],
};
