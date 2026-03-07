/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease-out both',
        'fade-up-d1': 'fadeUp 0.7s ease-out 0.2s both',
        'fade-up-d2': 'fadeUp 0.7s ease-out 0.4s both',
        'fade-up-d3': 'fadeUp 0.7s ease-out 0.6s both',
      },
    },
  },
  plugins: [],
}
