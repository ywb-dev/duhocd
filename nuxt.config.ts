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
    'nuxt-swiper',
    '@pinia/nuxt',
    '@vee-validate/nuxt', 
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
          include: ['Button', 'Accordion', 'Galleria','AccordionTab','RadioButton','Dropdown', 'Chips','InputNumber', 'Textarea','RadioPrimeButton','Password', 'Rating','InputSwitch', 'Checkbox','InputText', 'Menu', 'Sidebar', 'Toast', 'DataTable', 'Column', 'ColumnGroup', 'Row', 'Toolbar', 'Dialog', 'FileUpload', 'Image', 'InlineMessage', 'MegaMenu'],
      }
  },
  css: [
    '~/assets/css/global.css', 
    //'primevue/resources/themes/lara-light-teal/theme.css', 
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'swiper/css',
    'swiper/css/navigation'
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    },
  },
  swiper: {
    styleLang: 'css', // all modules are imported by default
  },
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://api.duhocd.com/'
    }
  }
})
