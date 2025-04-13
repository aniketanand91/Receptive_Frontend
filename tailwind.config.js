/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#1a202c', // Dark gray
        'card-background': '#2d3748', // Medium gray
        'text-color': '#ffffff', // White
        'subtext-color': '#a0aec0', // Light gray
        'highlight-color': '#ecc94b', // Yellow
        'button-bg': '#805ad5', // Purple
        'button-hover-bg': '#6b46c1', // Darker purple
        'footer-bg': '#2d3748', // Footer gray
      },
    },
  },
  plugins: [],
}