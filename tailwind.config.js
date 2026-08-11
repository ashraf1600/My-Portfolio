// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Blue 500
          dark: '#2563eb',    // Blue 600
          light: '#60a5fa',   // Blue 400
        },
        background: {
          DEFAULT: '#0f172a', // Slate 900
          card: '#1e293b',    // Slate 800
          hover: '#334155',   // Slate 700
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        revealUp: 'revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      boxShadow: {
        'minimal': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'minimal-hover': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'accent': '0 2px 8px rgba(59, 130, 246, 0.15)',
      },
    },
  },
  plugins: [],
};
