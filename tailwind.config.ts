import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    keyframes: {
      gradient: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
      cursor: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
    },
    animation: {
      gradient: 'gradient 3s ease infinite',
      cursor: "cursor 0.85s steps(2, start) infinite",
    },
    extend: {
      colors: {
        background: '#1e293b',
        foreground: '#e2e8f0'
      },
    },
  },
  plugins: [],
} satisfies Config;