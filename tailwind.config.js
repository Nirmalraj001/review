/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sandal: {
          50: '#fdf8f3',
          100: '#faf0e4',
          200: '#f4ddc4',
          300: '#ecc49b',
          400: '#e2a370',
          500: '#d4824a',
          600: '#c26a3f',
          700: '#a15536',
          800: '#824532',
          900: '#6a3a2b',
        },
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#5bb55b',
          500: '#389638',
          600: '#2a7a2a',
          700: '#236123',
          800: '#1f4e1f',
          900: '#1a401a',
        },
        earth: {
          50: '#f7f4f0',
          100: '#ede6d9',
          200: '#dccbb5',
          300: '#c5a888',
          400: '#b08762',
          500: '#9a6f47',
          600: '#85593b',
          700: '#6f4732',
          800: '#5c3b2d',
          900: '#4d3228',
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
