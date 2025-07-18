/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        goat: {
          blue: '#005CA5',
          beige: '#FAF2E6',
          pink: '#FF56A5',
          yellow: '#FFD966',
          black: '#222222',
        },
      },
    },
  },
  plugins: [],
};
