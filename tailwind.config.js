/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F6FEB',       // Deep Blue
        secondary: '#22D1EE',     // Sky Blue
        accent: '#FFD700',        // Gold
        neutralLight: '#F8F9FA',  // Light Grey
        neutralDark: '#212529',   // Very Dark Grey
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}