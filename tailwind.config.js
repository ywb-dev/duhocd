/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        boxDarkMode: '#2a323d',
        bgDarkMode: '#20262e',
        hoverDarkMode: '#ffffffde',
        'border-field': '#d1d5db',
        primary: '#67a9e7',
        primaryHover: '#035897'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  }
}