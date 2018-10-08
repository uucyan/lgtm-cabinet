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
  findAll({ commit }) {
    Vue.prototype.$db.folders.find({}, (function (err, docs) {
      commit('set', docs)
    }).bind(this));
  },
  insert({ dispatch }, folderPath) {
    let doc = {
      name: folderPath.split('/').pop(),
      path: folderPath
    }
    Vue.prototype.$db.folders.insert(doc, function (err, newDoc) {
      console.log('error：' + err)
    })
    dispatch('findAll')
  },
  delete({ dispatch }, folder) {
    Vue.prototype.$db.folders.remove({
      _id: folder._id
    }, {}, function (err, numRemoved) {
      console.log('error：' + err)
     })
    dispatch('findAll')
  }
}
