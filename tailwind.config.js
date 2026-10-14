/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        navy: {
          50: '#f3f6fb',
          100: '#e4ebf5',
          200: '#c6d3e6',
          300: '#9bb0d1',
          400: '#6885b5',
          500: '#46649b',
          600: '#344e7f',
          700: '#2b3f67',
          800: '#1d2b47',
          900: '#121c30',
          950: '#0a1120',
        },
        electric: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1f4fe0',
          700: '#1a3fb8',
          800: '#1b3793',
          900: '#1b3274',
          950: '#142051',
        },
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px -12px rgba(16, 24, 40, 0.12)',
        card: '0 1px 3px rgba(16, 24, 40, 0.06), 0 20px 40px -24px rgba(18, 28, 48, 0.28)',
        glow: '0 18px 48px -16px rgba(51, 102, 255, 0.45)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(18,28,48,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,28,48,0.06) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(60% 60% at 15% 10%, rgba(51,102,255,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 90% 20%, rgba(139,92,246,0.16) 0%, transparent 55%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'grow-bar': {
          '0%': { transform: 'scaleY(0.15)' },
          '100%': { transform: 'scaleY(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease both',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grow-bar': 'grow-bar 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 34s linear infinite',
      },
    },
  },
  plugins: [],
};
