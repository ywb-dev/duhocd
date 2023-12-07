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
    '@pinia/nuxt',
  ],
   pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  primevue: {
      usePrimeVue: true,
      options: {
        ripple: true
      },
      cssLayerOrder: 'tailwind-base, tailwind-utilities, primevue',
      components: {
         prefix: 'Prime',
          include: ['Button', 'RadioButton','Dropdown', 'Chips','InputNumber', 'Textarea','RadioPrimeButton','Password', 'Rating','InputSwitch', 'Checkbox','InputText', 'Menu', 'Sidebar', 'Toast', 'DataTable', 'Column', 'ColumnGroup', 'Row', 'Toolbar', 'Dialog', 'FileUpload', 'Image', 'InlineMessage'],
      }
  },
  css: [
    '~/assets/css/main.css', 
    //'primevue/resources/themes/lara-light-teal/theme.css', 
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css'
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/'
    }
  }
})
