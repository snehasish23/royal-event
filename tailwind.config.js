/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-gold': '#FFD700',
        'maroon': '#8B0000',
        'emerald': '#228B22',
        'sapphire': '#264A8C',
        'ivory': '#FFFFF0',
        'pink': '#FF4081',
        'orange': '#FF7F32',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
