module.exports = {
  mode: 'spa',
  head: {title: 'lgtm-cabinet'}, // Headers of the page
  loading: false, // Disable default loading bar
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
    '~plugins/element-ui',
  ],
  dev: process.env.NODE_ENV === 'DEV',
  css: [
    '@/assets/styles/global.sass',
    'element-ui/lib/theme-chalk/index.css',
  ],
  modules: [
    [
      'nuxt-sass-resources-loader',
      [
        '@/assets/styles/variables/_color.sass',
      ]
    ],
  ],
}
