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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Electric Blue
          dark: '#1d4ed8',
          light: '#60a5fa',
        },
        accent: {
          DEFAULT: '#f59e0b', // Amber
          dark: '#d97706',
          light: '#fbbf24',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          glow: '#22d3ee',
        },
        background: {
          DEFAULT: '#080d1a', // Rich Deep Obsidian Navy
          card: '#0e172a',
          hover: '#16233f',
          light: '#f8fafc',
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
          950: '#060a14',
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        revealUp: 'revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s infinite linear',
        floatSlow: 'floatSlow 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        spinSlow: 'spinSlow 20s linear infinite',
      },
      boxShadow: {
        'minimal': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'minimal-hover': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'accent': '0 2px 8px rgba(37, 99, 235, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(37, 99, 235, 0.16)',
        'glow-blue': '0 0 35px -5px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 35px -5px rgba(168, 85, 247, 0.35)',
      },
    },
  },
  plugins: [],
};
