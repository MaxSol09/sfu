/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'btn-shadow': '0 0 4px rgba(0, 0, 0, 0.2)',
        'custom-rounded': '0 5px 36px rgba(0, 0, 0, 0.2)',
        'custom-hoverShadow': '0 0 15px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}

