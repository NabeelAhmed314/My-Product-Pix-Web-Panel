// import path from 'path'
// import * as fs from 'fs'
import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - my-product-pix',
    title: 'my-product-pix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://cdn.quilljs.com/1.3.6/quill.js' },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js',
      },
      { src: 'https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js' },
      {
        src: 'https://connect.facebook.net/en_US/sdk/debug.js',
        async: true,
        crossOrigin: 'anonymous',
      },
      { src: '/scripts/fb.js', body: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/composition-api.js',
    '~/plugins/moment.js',
    '~/plugins/ckeditor.js',
    '~/plugins/chart.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCqeMQ35pILpsPx_5oYs389iUZZ5E8XCEM',
          authDomain: 'my-product-pix.firebaseapp.com',
          projectId: 'my-product-pix',
          storageBucket: 'my-product-pix.appspot.com',
          messagingSenderId: '609307620775',
          appId: '1:609307620775:web:26eb267581df0b0723b282',
          measurementId: 'G-89X9D3SZHE',
        },
        services: {
          messaging: true, // {
          // createServiceWorker: true,
          // fcmPublicVapidKey:
          //   'BI80sjfiBiTXyVX-EvFelLEAtkzHbz8EgJuS0aktNjeY1yhZOVIozXzvNMOCBmU7Q2h6rJVNik_HB0bsnCudAgM',
          // inject: fs.readFileSync('./serviceWorker.js'),
          // },
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://192.168.100.9:5000/',
    baseURL: 'https://api.myproductpix.com/',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/sign-in',
            method: 'post',
            propertyName: 'access_token',
          },
          logout: {
            url: '/auth/sign-out',
            method: 'post',
          },
          user: {
            url: '/auth/profile',
            method: 'get',
            propertyName: '',
          },
        },
        watchLoggedIn: true,
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      },
    },

    redirect: {
      login: '/auth/signin',
      logout: '/',
      callback: '/auth/signin',
      home: '/',
    },
  },

  env: {
    facebookAppId: '293954698861866',
    facebookAppRedirectUri: 'https://login.myproductpix.com/admin/instagram',
    scope:
      'instagram_basic,pages_show_list,instagram_content_publish,pages_read_engagement',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#c80000',
          gold: '#ffe700',
          lightBg: '#ced4d1',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
    // },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  router: {
    middleware: ['auth', 'isVerified'],
  },
}
