import Vue from 'vue'
import Datastore from 'nedb'
import { remote } from 'electron'
import path from 'path'

let db = {}
const filePath = path.join(remote.app.getPath('userData'), '/db')

db.folders = new Datastore({
  autoload: true,
  filename: `${filePath}/folders.db`
})
db.config = new Datastore({
  autoload: true,
  filename: `${filePath}/config.db`
})

// すべての Component から db を使用できるように、Vue のプロトタイプに追加する。
// 各 Component で使用する際は this.$db.config のように参照する。
Vue.prototype.$db = db
