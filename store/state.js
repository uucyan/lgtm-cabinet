export const state = () => ({
  // LGTM Cabinet：''
  // フォルダ管理：folderManagement
  // 設定：config
  // フォルダ：folder
  // TheCatAPI：theCatApi
  selectedMenu: '',
  // 設定を初期化確認ダイアログの表示フラグ
  resetConfigConfirmDialogVisible: false,
  // フォルダ削除確認ダイアログの表示フラグ
  deleteFolderConfirmDialogVisible: false,
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
  resetConfigConfirmDialogVisible(state, visible) {
    state.resetConfigConfirmDialogVisible = visible
  },
  deleteFolderConfirmDialogVisible(state, visible) {
    state.deleteFolderConfirmDialogVisible = visible
  },
  descriptionDialogVisible(state, visible) {
    state.descriptionDialogVisible = visible
  },
  releaseDialogVisible(state, visible) {
    state.releaseDialogVisible = visible
  },
}
