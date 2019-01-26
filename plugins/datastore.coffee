import Vue from 'vue'
import Datastore from 'nedb'
import { remote } from 'electron'
import path from 'path'

db = {}
filePath = path.join(remote.app.getPath('userData'), '/db')

db.folders = new Datastore {
  autoload: true
  filename: "#{filePath}/folders.db"
  timestampData: true
}

db.config = new Datastore {
  autoload: true
  filename: "#{filePath}/config.db"
  timestampData: true
}

# すべての Component から db を使用できるように、Vue のプロトタイプに追加する。
# 各 Component で使用する際は this.$db.config のように参照する。
Vue.prototype.$db = db
