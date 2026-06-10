/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This forces Tailwind to use Montserrat for all standard text
        sans: ['Montserrat', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
