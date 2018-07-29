import Vue from 'vue'
import Datastore from 'nedb'

let db = {}
db.folders = new Datastore({
  autoload: true,
  filename: '~plugins/db/folders.db'
})
db.config = new Datastore({
  autoload: true,
  filename: '~plugins/db/config.db'
})

db.folders.loadDatabase()
db.config.loadDatabase()

// すべての Component から db を使用できるように、Vue のプロトタイプに追加する。
// 各 Component で使用する際は this.$db.config のように参照する。
Vue.prototype.$db = db
