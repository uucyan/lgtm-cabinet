export const state = () => ({
  // フォルダ管理：folderManagement
  // 設定：config
  // フォルダ：folder
  selectedMenu: '',
  // 確認ダイアログの表示フラグ
  confirmDialogVisible: false,
  // 使い方説明ダイアログに表示フラグ
  descriptionDialogVisible: false
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
}
