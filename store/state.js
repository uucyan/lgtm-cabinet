export const state = () => ({
  // フォルダ管理：folderManagement
  // 設定：config
  // フォルダ：folder
  selectedMenu: '',
  // 確認ダイアログの表示フラグ
  confirmDialogVisible: false,
  // はじめにダイアログの表示フラグ
  descriptionDialogVisible: false,
  // リリースダイアログの表示フラグ
  releaseDialogVisible: false,
})

export const getters = {

}

export const mutations = {
  selectMenu(state, menuName) {
    state.selectedMenu = menuName
  },
  confirmDialogVisible(state, visible) {
    state.confirmDialogVisible = visible
  },
  descriptionDialogVisible(state, visible) {
    state.descriptionDialogVisible = visible
  },
  releaseDialogVisible(state, visible) {
    state.releaseDialogVisible = visible
  },
}
