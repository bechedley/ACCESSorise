/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'blue': '#bbdefb',
      'slate': '#394955',
      'grey': '#9cadbc',
      'pink': '#e4bbd0',
      'mauve': '#ac869a',
      'red': '#ba1a1a',
      'white': '#fff'
    },
    extend: {
      fontFamily: {
        'satisfy': ['Satisfy', 'cursive'],
        'mont-alt': ['Montserrat Alternates', 'sans-serif']
      }
    },
  },
  plugins: [],
}