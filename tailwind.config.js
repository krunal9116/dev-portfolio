/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        primary: '#00F5FF',
        secondary: '#6E00FF',
        accent: '#FF00AA',
        muted: '#B3B3B3',
      },
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0,245,255,0.4)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0,245,255,0.8)' },
        },
      },
    },
  },
  plugins: [],
};
