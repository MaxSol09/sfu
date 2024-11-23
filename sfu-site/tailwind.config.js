/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'btn-shadow': '0 0 4px rgba(0, 0, 0, 0.2)',
        'custom-rounded': '0 10px 36px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}

