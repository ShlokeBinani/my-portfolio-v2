/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#0f0f23',
          100: '#1a1a3a',
          200: '#2d2d5a',
          300: '#404070',
          400: '#5353a0',
          500: '#6366f1',
          600: '#818cf8',
          700: '#a5b4fc',
          800: '#c7d2fe',
          900: '#e0e7ff',
        },
        accent: {
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        dark: {
          100: '#0a0a0f',
          200: '#1a1a2e',
          300: '#16213e',
          400: '#1e293b',
          500: '#334155',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'gemini': 'gemini 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gemini: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '33%': { transform: 'rotate(120deg) scale(1.1)' },
          '66%': { transform: 'rotate(240deg) scale(0.9)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
