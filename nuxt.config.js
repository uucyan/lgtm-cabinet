const prodRouterBase = process.env.NODE_ENV === 'DEV' ? {} : {
  router: {
    base: './'
  }
}

module.exports = { ...prodRouterBase,
  mode: 'spa',
  head: {
    title: 'LGTM Cabinet',
    meta: [
      { charset: 'utf-8' }
    ]
   }, // Headers of the page
  loading: false, // Disable default loading bar
  generate: {
    dir: 'dist/electron'
  },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.coffee$/,
        use: 'coffee-loader',
        exclude: /(node_modules)/
      })
      // Extend only webpack config for client-bundle
      if (isClient) { config.target = 'electron-renderer' }
    },
    vendor: ['element-ui']
  },
  plugins: [
    '~plugins/element-ui.coffee',
    '~plugins/datastore.coffee',
    '~plugins/service.coffee',
  ],
  dev: process.env.NODE_ENV === 'DEV',
  css: [
    '@/assets/sass/global.sass',
    'element-ui/lib/theme-chalk/index.css',
  ],
  modules: [
    [
      'nuxt-sass-resources-loader',
      [
        '@/assets/sass/variables/_color.sass',
      ]
    ],
  ],
  rootDir: __dirname
}
