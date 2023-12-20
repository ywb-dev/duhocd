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
        primaryHover: '#035897',
        textPrimary: '#1B80CA',
        bgDark: '#144162',
        grey: {
          400: '#C8C8C8',
          500: '#D9D9D9'
        }
      },
      fontSize: {
        ss: '8px'
      }
    },
    container: {
      padding: {
        DEFAULT: '1rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  }
}