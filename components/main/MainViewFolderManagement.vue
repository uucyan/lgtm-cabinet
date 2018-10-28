<template lang="pug">
el-container.main
  el-header
    div(style='float: left;')
      p.postit #フォルダ管理
  el-main
    el-button(@click="showOpenFolderSelectDialog") 追加
    el-table(
      :data='folders',
      style='width: 100%'
    )
      el-table-column(
        prop='name',
        label='フォルダ名',
        width='180'
      )
      el-table-column(
        prop='path',
        label='パス',
      )
      el-table-column(
        fixed='right',
        label='操作',
        width='120'
      )
        template(slot-scope='scope')
          el-button(
            size='mini',
            type='danger',
            @click='showConfirmDialog(scope.row)'
          ) 削除
    span(
      slot="footer",
      class="dialog-footer"
    )
    confirm-dialog(
      :folder="targetFolder",
      @close="hideConfirmDialog"
    )
</template>

<script lang="coffee">
import ConfirmDialog from '~/components/ConfirmDialog.vue'
remote = require('electron').remote
dialog = remote.dialog

export default
  name: 'MainViewFolderManagement'
  data: ->
    targetFolder: {}
    MESSAGES: {
      success: '削除しました。'
      warning: '削除されませんでした。'
    }
  computed:
    folders: -> @$store.state.folders.list
    configDialogVisible: -> @$store.state.state.configDialogVisible
  methods:
    showOpenFolderSelectDialog: ->
      folderPath = dialog.showOpenDialog null,
        properties: [ 'openDirectory' ]
        title: 'フォルダ'
        defaultPath: '.'
      if folderPath?
        @insertFolder(folderPath[0])
    insertFolder:(folderPath) ->
      @$store.dispatch('folders/insert', folderPath)
    showConfirmDialog:(folder) ->
      @targetFolder = folder
      @$store.commit('state/confirmDialogVisible', true)
    hideConfirmDialog:(isOk) ->
      @$store.commit('state/confirmDialogVisible', false)
      type = 'warning'
      if isOk is true
        @deleteFolder(@targetFolder)
        type = 'success'
      @targetFolder = {}
      @showMessage(type)
    deleteFolder:(folder) ->
      @$store.dispatch('folders/delete', folder)
    showMessage:(type) ->
      @$message
        showClose: true
        message: @MESSAGES[type]
        type: type
  components:
    'confirm-dialog': ConfirmDialog
</script>

<style lang="sass" scoped>
</style>
