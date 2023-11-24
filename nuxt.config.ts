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
      cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
      components: {
         prefix: 'Prime',
          include: ['Button', 'Dropdown', 'InputNumber', 'RadioPrimeButton','Password', 'InputSwitch', 'Checkbox','InputText', 'Menu', 'Sidebar', 'Toast', 'DataTable', 'Column', 'ColumnGroup', 'Row', 'Toolbar', 'Dialog', 'FileUpload'],
      }
  },
  css: [
    '~/assets/css/main.css', 
    // 'primevue/resources/themes/lara-light-teal/theme.css', 
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css'],
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
