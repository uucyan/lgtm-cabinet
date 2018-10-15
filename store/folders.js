import Vue from 'vue'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

export const state = () => ({
  list: [],
  images: [],
})

export const mutations = {
  set(state, docs) {
    state.list = docs;
  },
  setImages(state, images) {
    state.images = images;
  }
}

export const actions = {
  // DBに保存したフォルダ一覧をすべて取得
  findAll({ commit }) {
    Vue.prototype.$db.folders.find({}, ((err, docs) => {
      commit('set', docs)
    }).bind(this));
  },
  // フォルダをDBに保存して一覧を更新
  insert({ dispatch }, folderPath) {
    let doc = {
      name: folderPath.split('/').pop(),
      path: folderPath,
    }
    Vue.prototype.$db.folders.insert(doc, (err, newDoc) => {
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
  // 選択したフォルダの画像一覧を取得
  getImagePaths({ commit }, folder) {
    fs.readdir(folder.path, (err, fileNames) => {
      let images = []
      for (let filename of fileNames) {
        const type = mime.lookup(path.extname(filename))
        if (type && /^image\//.test(type)) {
          images.push(folder.path + '/' + filename)
        }
      }
      commit('setImages', images)
    })
  },
}
