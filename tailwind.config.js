/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Standard Semantic Design Tokens */
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--foreground))",
        },
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--background-secondary))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        overlay: "hsl(var(--overlay))",

        /* Legacy Aliases: Ensures existing components don't break during migration */
        app: {
          bg: "hsl(var(--background))",
          card: "hsl(var(--card))",
          hover: "hsl(var(--background-secondary))",
          border: "hsl(var(--border))",
          text: "hsl(var(--foreground))",
          muted: "hsl(var(--muted-foreground))",
          accent: "hsl(var(--primary))",
        },
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "var(--radius)",
        md: "calc(var(--radius) + 2px)",
        lg: "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        card: "0 1px 2px 0 hsl(var(--overlay) / 0.06), 0 4px 12px hsl(var(--overlay) / 0.08)",
        "card-hover":
          "0 2px 4px 0 hsl(var(--overlay) / 0.08), 0 10px 24px hsl(var(--overlay) / 0.14)",
        popover: "0 8px 30px hsl(var(--overlay) / 0.18)",
      },

      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
