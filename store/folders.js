import Vue from 'vue'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

export const state = () => ({
  list: [],
  images: [],
  selectFolderName: '',
})

export const getters = {
  isExistsImages(state) {
    return state.images.length != 0
  },
  getImagesLength(state) {
    return state.images.length
  },
}

export const mutations = {
  set(state, docs) {
    for (let i in docs) {
      const date = docs[i].createdAt
      const y = date.getFullYear()
      const m = ("00" + (date.getMonth() + 1)).slice(-2)
      const d = ("00" + date.getDate()).slice(-2)
      const hh = ('00' + date.getHours()).slice(-2)
      const mm = ('00' + date.getMinutes()).slice(-2)
      const ss = ('00' + date.getSeconds()).slice(-2)
      docs[i].createdAt = y + '/' + m + '/' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    state.list = docs
  },
  setImages(state, images) {
    state.images = images
  },
  setSelectFolderName(state, name) {
    state.selectFolderName = name
  }
}

export const actions = {
  // DBに保存したフォルダ一覧をすべて取得
  findAll({ commit }, params) {
    const config = params.config
    Vue.prototype.$db.folders.find({}).sort({ [config.folderSortTagetColmun]: config.folderSortOrder }).exec((error, docs) => {
      commit('set', docs)
      if (params && params.isUpdate) {
        Vue.prototype.$services.notification.notify(params.notificationType, 'success', config)
      }
    })
  },

  // フォルダをDBに保存して一覧を更新
  insert({ dispatch }, params) {
    Vue.prototype.$db.folders.count({ path: params.folderPath }, (error, count) => {
      // 既に登録済みの場合は登録しない
      if (count != 0) {
        Vue.prototype.$services.notification.notify('add_folder', 'error2', params.config)
        return
      }
      const splitText = process.platform === 'win32' ? '\\' : '/'
      let doc = {
        name: params.folderPath.split(splitText).pop(),
        path: params.folderPath,
      }
      Vue.prototype.$db.folders.insert(doc, (error, newDoc) => {
        if (error == null) {
          dispatch('findAll', {isUpdate: true, notificationType: 'add_folder', config: params.config})
        } else {
          Vue.prototype.$services.notification.notify('add_folder', 'error', params.config, error)
        }
      })
    })
  },

  // フォルダを一つ削除して一覧を更新
  delete({ dispatch }, params) {
    Vue.prototype.$db.folders.remove(
      {
        _id: params.folder._id
      },
      {},
      function (error, numRemoved) {
        if (error == null) {
          dispatch('findAll', {isUpdate: true, notificationType: 'delete_folder', config: params.config})
        } else {
          Vue.prototype.$services.notification.notify('delete_folder', 'error', params.config, error)
        }
      }
    )
  },

  // 選択したフォルダの画像一覧を取得
  getImagePaths({ commit }, params) {
    const folder = params.folder
    const imageListShowGifImage = params.imageListShowGifImage
    const regexp = imageListShowGifImage ? /^image\/(jpeg|png|gif)/ : /^image\/(jpeg|png)/

    fs.readdir(folder.path, (error, fileNames) => {
      let images = []
      for (let filename of fileNames) {
        const type = mime.lookup(path.extname(filename))
        if (type && regexp.test(type)) {
          images.push(folder.path + '/' + filename)
        }
      }
      commit('setImages', images)
    })
  },
}
