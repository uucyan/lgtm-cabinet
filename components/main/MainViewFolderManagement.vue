<template lang="pug">
el-container.main
  el-header
    div(style='float: left;')
      p.postit #フォルダ管理
    div(style='float: right;')
      el-button(icon='el-icon-plus' @click="showOpenFolderSelectDialog") 追加
  el-main
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
            type="danger"
            icon="el-icon-delete"
            size="medium"
            circle
            @click='showConfirmDialog(scope.row)'
          )
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
import ConfirmDialog from '~/components/dialog/ConfirmDialog.vue'
import Notification from '~/components/service/Notification.coffee'
remote = require('electron').remote
dialog = remote.dialog

export default
  name: 'MainViewFolderManagement'
  data: ->
    targetFolder: {}
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
      @sendNotification(type)
    deleteFolder:(folder) ->
      @$store.dispatch('folders/delete', folder)
    sendNotification:(type) ->
      Notification.notify(@, 'delete_folder', type)
  components:
    'confirm-dialog': ConfirmDialog
</script>

<style lang="sass" scoped>
</style>
