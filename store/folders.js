import Vue from 'vue'

export const state = () => ({
  list: []
})

export const mutations = {
  set(state, docs) {
    state.list = docs;
  }
}

export const actions = {
  // DBに保存したフォルダ一覧をすべて取得
  findAll({ commit }) {
    Vue.prototype.$db.folders.find({}, (function (err, docs) {
      commit('set', docs)
    }).bind(this));
  },
  // フォルダをDBに保存して一覧を更新
  insert({ dispatch }, folderPath) {
    let doc = {
      name: folderPath.split('/').pop(),
      path: folderPath,
      selected: false
    }
    Vue.prototype.$db.folders.insert(doc, function (err, newDoc) {
      console.log('folder insert error：' + err)
    })
    dispatch('findAll')
  },
  // フォルダを一つ削除して一覧を更新
  delete({ dispatch }, folder) {
    Vue.prototype.$db.folders.remove(
      { _id: folder._id },
      {},
      function (err, numRemoved) {
        console.log('folder delete error：' + err)
      }
    )
    dispatch('findAll')
  },
  select(contex, selectFolder) {
    // 元々選択状態だったフォルダを取得
    const selectedFolder = contex.state.list.find((folder) => {
      return (folder.selected === true);
    });
    // 選択状態だったフォルダが存在していれば、
    // 選択状態を解除する。
    if ( selectedFolder !== void 0) {
      Vue.prototype.$db.folders.update(
        { _id: selectedFolder._id },
        { $set: { selected: true } },
        {},
        function (err, numReplaced) {
          console.log('folder selected update error：' + err)
        }
      );
    }

    // 選択したフォルダを選択状態にする。
    Vue.prototype.$db.folders.update(
      { _id: selectFolder._id },
      { $set: { selected: true } },
      {},
      function (err, numReplaced) {
        console.log('folder select update error：' + err)
      }
    );
    contex.dispatch('findAll')
  },
}
