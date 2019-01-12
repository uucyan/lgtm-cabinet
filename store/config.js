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
    notificationPosition: 'bottom-left',
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
  find({ commit }) {
    // データが1件も存在していなけれな、デフォルトの設定値をセット
    // そうでなければ DB から取得したデータをセット
    Vue.prototype.$db.config.count({}, ((err, count) => {
      if (count == 0) {
        return commit('set', {config: {}, isDefault: true})
      }
      // 基本的に1件しか config のデータは保存されていないはずだが、
      // 念の為、最初の1件だけ取得する
      Vue.prototype.$db.config.find({}).sort({}).limit(1).exec((err, docs) => {
        commit('set', {config: docs[0], isDefault: false})
      })
    }).bind(this))
  },

  // 設定の登録
  insert({ state, dispatch }, editConfig) {
    let config = Object.assign({}, state.config)
    config[editConfig.key] = editConfig.value

    Vue.prototype.$db.config.insert(config, ((err, newDoc) => {
      console.log('config insert error：' + err)
    }).bind(this))
    dispatch('find')
  },

  // 設定の更新
  updateBy({ state, dispatch }, editConfig) {
    Vue.prototype.$db.config.count({}, (err, count) => {
      // DB にデータが存在しない場合は新規登録する
      if (count == 0) {
        return dispatch('insert', editConfig)
      }
      // 更新
      Vue.prototype.$db.config.update(
        { _id: state.config._id },
        { $set: { [editConfig.key]: editConfig.value } },
        { multi: true },
        ((err, numReplaced) => {
          console.log('config update error：' + err)
        }).bind(this)
      )
      dispatch('find')
    })
  },

  // 設定の削除
  // DB の設定を削除することで、デフォルトの設定値にリセットする
  remove({ dispatch }) {
    Vue.prototype.$db.config.remove(
      {},
      { multi: true },
      ((err, numRemoved) => {
        console.log('config all remove error：' + err)
      }).bind(this)
    )
    dispatch('find')
  }
}