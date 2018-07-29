# lgtm-cabinet

> Nuxt + Electron

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# development with vue devtools
$ npm run dev

# build for production
$ npm run build

For detailed explanation on how things work, checkout [Nuxt.js](https://github.com/nuxt/nuxt.js), [Electron.js](https://electronjs.org/), and [electron-builder](https://www.electron.build/).
```

# 環境構築手順

## 📌 Nuxt + Electron のひな形作成
これ使った↓
[GitHub - nuxt-community/electron-template: Electron starter with nuxt.js](https://github.com/nuxt-community/electron-template)
```bash
vue init nuxt-community/electron-template lgtm-cabinet
cd lgtm-cabinet
yarn install
```

## 📌 ライブラリのインストール
### pug coffeescript sass のインストール
書き方を統一させるために `pug` `coffeescript` `sass` を採用

**インストール**
```bash
yarn add --dev pug@2.0.0-beta6 pug-loader coffeescript coffee-loader node-sass sass-loader
```

### Element のインストール
[Element](http://element.eleme.io/#/en-US/component/installation)

UIは `Element` を使用する。

**インストール**
```bash
yarn add element-ui -S
```

### nuxt-sass-resources-loader のインストール
`/assets/styles/variables/_color.sass` などに定義した変数をvueファイル内で参照できるようにする。

**インストール**
```bash
yarn add --dev nuxt-sass-resources-loader
```

### NeDB のインストール
[GitHub - louischatriot/nedb: The JavaScript Database, for Node.js, nw.js, electron and the browser](https://github.com/louischatriot/nedb)

**インストール**
```bash
yarn add nedb
```

## 📌 CoffeeScript を Vue ファイル内で動かすための設定
下記ファイルの `loader: 'eslint-loader',` をコメントアウトする。

**/lgtm-cabinet/nuxt.config.js**
```js
extend (config, { isDev, isClient }) {
  if (isDev && isClient) {
    // Run ESLint on save
    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      // loader: 'eslint-loader', ← ココをコメントアウト
      exclude: /(node_modules)/
    })
  }
}
```

## 📌 Element を使うための設定
`plugins` ディレクトリ配下に `element-ui.js` を作成し、以下を記述する。

```js
import Vue from 'vue'
import ElementUI from 'element-ui'

const locale = require('element-ui/lib/locale/lang/ja')
Vue.use(ElementUI, { locale })
```

`nuxt.config.js` に以下と追加する。
```js
build: {
    extend (config, { isDev, isClient }) {
      // 省略
    },
    vendor: ['element-ui']
  },
  plugins: [
    '~plugins/element-ui'
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ]
```

- 参考
  - [Nuxt.jsとElementを組み合わせて使う](https://qiita.com/teriyakisan/items/9c2f479c30b8a829eb7c)
  - [vue-cli(v3) + Nuxt.js + ElementUIを触ってみた](https://qiita.com/locol23/items/faaa1c4f161b808b79d8)

## 📌 nuxt-sass-resources-loader を使うための設定
```js
modules: [
  [
    'nuxt-sass-resources-loader',
    [
      '@/assets/styles/variables/_color.sass',
    ]
  ],
],
```

- 参考
  - [《Nuxt.js》Sassの共通の変数やmixinを一括で各コンポーネントに読み込む方法。](https://qiita.com/uto-usui/items/6b745203fa6fad577877)

  ## 📌 NeDB を使うための設定
  1. DB用のファイル追加
  下記みたいな感じで追加する。
  `/plugins/db/folders.db`

  2. datastore ファイルを追加
  `/plugins/datastore.js`
  ```js
  import Vue from 'vue'
  import Datastore from 'nedb'

  let db = {}
  db.folders = new Datastore({
    autoload: true,
    filename: 'plugins/db/folders.db' // 作成した DB ファイルを指定
  })
  db.folders.loadDatabase()

  // すべての Component から db を使用できるように、Vue のプロトタイプに追加する。
  // 各 Component で使用する際は this.$db.folders のように参照する。
  Vue.prototype.$db = db
  ```
  ※上記記述例

  3. nuxt.config.js に設定追加
  ```js
  plugins: [
    '~plugins/element-ui',
    '~plugins/datastore', // ココ追加
  ],
  ```

  - 参考
    - [NeDB を使ってみた](https://qiita.com/tinymouse/items/0731eef4aebf2779bd0b)
    - [electron-vue/savingreading-local-files.md at 99f044896bf3add09d072e9f278ef9d8380337f4 · SimulatedGREG/electron-vue · GitHub](https://github.com/SimulatedGREG/electron-vue/blob/99f044896bf3add09d072e9f278ef9d8380337f4/docs/ja/savingreading-local-files.md)
