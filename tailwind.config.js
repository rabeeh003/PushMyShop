/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#4a044e', // Replace with your desired color code
        // 'main-color': '#6d536a',
      },
    },
  },
  plugins: [require("rippleui")],
};
