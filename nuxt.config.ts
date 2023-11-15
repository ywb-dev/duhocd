// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@': resolve(__dirname, "/"),
  },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
      usePrimeVue: true,
      options: {
        ripple: true,
      },
      components: {
          include: ['Button', 'speedDial', 'DataTable'],
      }
  },
  css: ['~/assets/css/main.css', 'primevue/resources/themes/lara-light-teal/theme.css'],
})
