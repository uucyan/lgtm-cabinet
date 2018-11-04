# アプリケーション起動時にすべての Service をインスタンス化しておき、
# @$services でどのコンポーネントからでも呼び出せるようにしておく。

import Vue from 'vue'
import Notification from '~/services/Notification.coffee'

Vue.prototype.$services = {}
Vue.prototype.$services.notification = new Notification
