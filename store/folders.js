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

export const getters = {
  selectedFolder(state) {
    // return state.list.filter(folder => folder.selected)
    return state.list.find(folder => folder.selected)
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
  // select(context, selectFolder) {
  //   // 元々選択状態だったフォルダを取得
  //   let selectedFolder = context.getters.selectedFolder
  //   // 選択状態だったフォルダが存在していれば、
  //   // 選択状態を解除する。
  //   if ( selectedFolder !== void 0) {
  //     Vue.prototype.$db.folders.update(
  //       { _id: selectedFolder._id },
  //       { $set: { selected: false } },
  //       {},
  //       function (err, numReplaced) {
  //         console.log('folder selected update error：' + err)
  //       }
  //     );
  //   }

  //   context.state.list.forEach(folder => {
  //     Vue.prototype.$db.folders.update(
  //       { _id: folder._id },
  //       { $set: { selected: false } },
  //       {},
  //       function (err, numReplaced) {
  //         console.log('folder selected update error：' + err)
  //       }
  //     );
  //   })

  //   // 選択したフォルダを選択状態にする。
  //   Vue.prototype.$db.folders.update(
  //     { _id: selectFolder._id },
  //     { $set: { selected: true } },
  //     {},
  //     function (err, numReplaced) {
  //       console.log('folder select update error：' + err)
  //     }
  //   );
  //   context.dispatch('findAll')
  //   // context.dispatch('setFolderImages')
  // },
  getImagePaths(context, folder) {
    // let folder = context.getters.selectedFolder
    // console.log('context.getters.selectedFolder' + folder)
    // console.log(folder)
    // if (folder == void 0) {
    //   return
    // }
    fs.readdir(folder.path, (err, fileNames) => {
      let images = []
      for (let filename of fileNames) {
        // const ext = path.extname(filename)
        const type = mime.lookup(path.extname(filename))
        if (type && /^image\//.test(type)) {
          images.push(folder.path + '/' + filename)
        }
      }
      context.commit('setImages', images)
    })
  },
}
