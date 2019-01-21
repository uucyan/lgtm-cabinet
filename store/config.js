import Vue from 'vue'

export const state = () => ({
  DEFAULT_CONFIG: {
    // サイドバー
    sidebarShowTitle: true,
    sidebarFileTabOpen: false,
    // 画像一覧
    imageListShowGifImage: false,
    imageListKeepScrollPosition: false,
    // 通知
    notificationPosition: 'bottom-right',
    notificationDuration: 4.5,
    notificationConfigUpdateNotify: true,
  },
  config: {}
})

export const getters = {

}

export const mutations = {
  set(state, params) {
    state.config = params.isDefault ? state.DEFAULT_CONFIG : params.config
  },
}

export const actions = {
  find({ state, commit }, isUpdate) {
    // データが1件も存在していなければ、デフォルトの設定値をセット
    // そうでなければ DB から取得したデータをセット
    Vue.prototype.$db.config.count({}, ((error, count) => {
      if (count == 0) {
        commit('set', { config: {}, isDefault: true })
        if (isUpdate && state.config.notificationConfigUpdateNotify) {
          Vue.prototype.$services.notification.notify('reset_config', 'success', state.config)
        }
        return
      }
      // 基本的に1件しか config のデータは保存されていないはずだが、
      // 念の為、最初の1件だけ取得する
      Vue.prototype.$db.config.find({}).sort({}).limit(1).exec((error, docs) => {
        commit('set', { config: docs[0], isDefault: false })
        // 設定の変更時に通知する
        if (isUpdate && state.config.notificationConfigUpdateNotify) {
          Vue.prototype.$services.notification.notify('update_config', 'success', state.config)
        }
      })
    }).bind(this))
  },

  // 設定の登録
  insert({ state, dispatch }, editConfig) {
    let config = Object.assign({}, state.config)
    config[editConfig.key] = editConfig.value

    Vue.prototype.$db.config.insert(config, ((error, newDoc) => {
      if (error == null) {
        dispatch('find', true)
      } else {
        Vue.prototype.$services.notification.notify('update_config', 'error', state.config, error)
      }
    }).bind(this))
  },

  // 設定の更新
  updateBy({ state, dispatch }, editConfig) {
    Vue.prototype.$db.config.count({}, (error, count) => {
      // DB にデータが存在しない場合は新規登録する
      if (count == 0) {
        return dispatch('insert', editConfig)
      }
      // 更新
      Vue.prototype.$db.config.update(
        { _id: state.config._id },
        { $set: { [editConfig.key]: editConfig.value } },
        { multi: true },
        ((error, numReplaced) => {
          if (error == null) {
            dispatch('find', true)
          } else {
            Vue.prototype.$services.notification.notify('update_config', 'error', state.config, error)
          }
        }).bind(this)
      )
    })
  },

  // 設定の削除
  // DB の設定を削除することで、デフォルトの設定値にリセットする
  remove({ state, dispatch }) {
    Vue.prototype.$db.config.remove(
      {},
      { multi: true },
      ((error, numRemoved) => {
        if (error == null) {
          dispatch('find', true)
        } else {
          Vue.prototype.$services.notification.notify('reset_config', 'error', state.config, error)
        }
      }).bind(this)
    )
  }
}
