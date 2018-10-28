export const state = () => ({
  // フォルダ管理：folderManagement
  // 設定：config
  // フォルダ：folder
  selectedMenu: ''
})

export const getters = {

}

export const mutations = {
  selectMenu(state, menuName) {
    state.selectedMenu = menuName;
  },
}
