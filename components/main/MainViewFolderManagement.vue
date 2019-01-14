<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto フォルダ管理
    div.header-element-right
      el-button(
        v-if="windowWidthSize > 700"
        icon='el-icon-plus'
        @click="showOpenFolderSelectDialog"
        style='background: transparent; color: #ffffff;'
      ) 追加
      el-button(
        v-else
        circle
        icon='el-icon-plus'
        @click="showOpenFolderSelectDialog"
        style='background: transparent; color: #ffffff;'
      )
  el-main.wood-grain-white
    el-table(
      :data='folders',
      style='width: 100%'
    ).z-index-0
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
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"
import ConfirmDialog from '~/components/dialog/ConfirmDialog.vue'

remote = require('electron').remote
dialog = remote.dialog

export default
  name: 'MainViewFolderManagement'
  mixins: [ HandleResizeMixin ]
  data: ->
    targetFolder: {}
  computed:
    folders: -> @$store.state.folders.list
    configDialogVisible: -> @$store.state.state.configDialogVisible
    config: -> @$store.state.config.config
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
      @$services.notification.notify(@, 'delete_folder', type, @config.notificationPosition)
  components:
    'confirm-dialog': ConfirmDialog
</script>

<style lang="sass" scoped>
</style>
