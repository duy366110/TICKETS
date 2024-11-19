/** @type {import('tailwindcss').Config} */
export default {
  important: '#app',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "error": "#d32f2f"
      }
    },
  },
  plugins: [],
}

