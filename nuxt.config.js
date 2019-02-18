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

  // loading: false, // Disable default loading bar

  loadingIndicator: {
    name: 'folding-cube',
    color: '#573216',
    background: 'white'
  },

  generate: {
    dir: 'dist/electron'
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.coffee$/,
        use: 'coffee-loader',
        exclude: /(node_modules)/
      })

      config.target = 'electron-renderer'
    },
  },

  plugins: [
    '~plugins/element-ui.coffee',
    '~plugins/datastore.coffee',
    '~plugins/service.coffee',
  ],

  dev: process.env.NODE_ENV === 'DEV',

  css: [
    '~assets/sass/style.sass',
    'element-ui/lib/theme-chalk/index.css'
  ],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],

  styleResources: {
    sass: [
      './assets/sass/variables/_color.sass',
    ]
  },

  axios: {
  },

  rootDir: __dirname
}
