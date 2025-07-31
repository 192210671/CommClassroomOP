/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cube-red': '#FF0000',
        'cube-orange': '#FF8C00',
        'cube-yellow': '#FFD700',
        'cube-green': '#00FF00',
        'cube-blue': '#0080FF',
        'cube-white': '#FFFFFF',
      },
      animation: {
        'rotate-face': 'rotateFace 0.5s ease-in-out',
        'solve-step': 'solveStep 0.8s ease-in-out',
      },
      keyframes: {
        rotateFace: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(90deg) rotateY(0deg) rotateZ(0deg)' }
        },
        solveStep: {
          '0%': { opacity: '0.7' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '0.7', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}