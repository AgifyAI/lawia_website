/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#FAF9F5', alt: '#F3F1EB' },
        accent: {
          DEFAULT: '#6A9BCC',
          dark: '#4E7FAF',
          darker: '#3A6591',
          light: 'rgba(106, 155, 204, 0.14)',
          lighter: 'rgba(106, 155, 204, 0.07)',
        },
        txt: { DEFAULT: '#141413', secondary: '#55554F', tertiary: '#8A8A82' },
      },
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        ui: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
