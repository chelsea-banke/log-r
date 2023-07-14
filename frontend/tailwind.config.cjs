/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'nunito': ['nunito', 'sans-serif'],
    },
    extend: {
      screens: {
        'mobile': '500px',
        'tablet': '850px'
      },
    },
  },
  plugins: [],
}
