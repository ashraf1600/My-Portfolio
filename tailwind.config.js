// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          dark: '#1d4ed8',    // Blue 700
          light: '#3b82f6',   // Blue 500
        },
        accent: {
          DEFAULT: '#f59e0b', // Amber 500
          dark: '#d97706',    // Amber 600
          light: '#fbbf24',   // Amber 400
        },
        background: {
          DEFAULT: '#0b1121', // Deep navy
          card: '#111b2e',    // Navy card
          hover: '#162035',   // Navy hover
          light: '#f8f9fa',   // Off white
        },
        navy: {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#6384ff',
          500: '#3b5bdb',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a5f',
          900: '#0b1121',
          950: '#070d1a',
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
        'accent': '0 2px 8px rgba(37, 99, 235, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(37, 99, 235, 0.12)',
      },
    },
  },
  plugins: [],
};
