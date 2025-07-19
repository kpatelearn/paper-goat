/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
extend: {
  colors: {
    'goat-blue': '#1e3a8a',
    'goat-yellow': '#facc15',
    'goat-pink': '#ec4899',
    'goat-black': '#171717',
  },
  animation: {
    fadeIn: 'fadeIn 1s ease-out forwards',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },
typography: (theme) => ({
  DEFAULT: {
    css: {
      color: theme('colors.goat-black'),
      a: {
        color: theme('colors.goat-blue'),
        textDecoration: 'underline',
        '&:hover': {
          color: theme('colors.goat-pink'),
        },
      },
      h1: {
        fontWeight: '700',
      },
      h2: {
        fontWeight: '700',
        marginTop: '2em',
      },
      h3: {
        fontWeight: '600',
        marginTop: '1.5em',
      },
    },
  },
  invert: {
    css: {
      color: theme('colors.white'),
      a: {
        color: theme('colors.goat-yellow'),
        '&:hover': {
          color: theme('colors.goat-pink'),
        },
      },
      h1: { color: theme('colors.white'), fontWeight: '700' },
      h2: { color: theme('colors.white'), fontWeight: '700' },
      h3: { color: theme('colors.white'), fontWeight: '600' },
      strong: { color: theme('colors.white') },
      code: {
        color: theme('colors.goat-yellow'),
        backgroundColor: theme('colors.goat-black'),
      },
      blockquote: {
        color: theme('colors.gray.100'),
        borderLeftColor: theme('colors.goat-yellow'),
      },
    },
  },
}),

},
  },
  plugins: [require('@tailwindcss/typography')],
}
