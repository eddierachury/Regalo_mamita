/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        rose: {
          blush:   '#f9e8e8',
          soft:    '#f2c4c4',
          mid:     '#d4747a',
          deep:    '#b84e5a',
        },
        burgundy: {
          DEFAULT: '#7d2235',
          dark:    '#5a1525',
        },
        cream:    '#fdf8f3',
        beige:    '#ede0d0',
        gold: {
          light:   '#f5dfa5',
          DEFAULT: '#c9a84c',
          dark:    '#a07830',
        },
      },
    },
  },
  plugins: [],
};
