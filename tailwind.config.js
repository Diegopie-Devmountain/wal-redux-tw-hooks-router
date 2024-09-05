import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "poppins" : ['"Poppins"', ...defaultTheme.fontFamily.sans],
      "matemasie" : ['"Matemasie"', ...defaultTheme.fontFamily.serif],
      "roboto": ['"Roboto"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        "brand-orange": {
          100: '#f7bf23',
          300: '#d19d0d'
        },
        "brand-purple": {
          100: '#ab77f7',
          500: '#2d0569' 
        }
      }
    },
  },
  plugins: [],
}

