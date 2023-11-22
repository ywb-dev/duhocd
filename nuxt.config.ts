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
    'nuxt-primevue',
    '@vee-validate/nuxt',
    '@pinia/nuxt'
  ],
  primevue: {
      usePrimeVue: true,
      options: {
        ripple: true
      },
      components: {
         prefix: 'Prime',
          include: ['Button', 'Password', 'InputSwitch', 'Checkbox','InputText', 'Menu', 'Sidebar', 'Toast'],
      }
  },
  css: ['~/assets/css/main.css', 'primevue/resources/themes/lara-light-teal/theme.css', 'primeicons/primeicons.css'],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
})
