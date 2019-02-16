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
        prop='createdAt',
        label='追加日時',
        width='160'
      )
      el-table-column(
        fixed='right',
        label='操作',
        width='65'
      )
        template(slot-scope='scope')
          el-button(
            type="danger"
            icon="el-icon-delete"
            size="medium"
            circle
            @click='showConfirmDialog(scope.row)'
          )
  delete-folder-confirm-dialog(
    :message="deleteConfirmMessage",
    @close="hideConfirmDialog"
  )
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"
import DeleteFolderConfirmDialog from '~/components/dialog/DeleteFolderConfirmDialog.vue'

remote = require('electron').remote
dialog = remote.dialog

export default
  name: 'MainViewFolderManagement'
  mixins: [ HandleResizeMixin ]
  data: ->
    deleteTargetFolder: {}
    deleteConfirmMessage: ''
  computed:
    folders: -> @$store.state.folders.list
    deleteFolderConfirmDialogVisible: -> @$store.state.app.deleteFolderConfirmDialogVisible
    config: -> @$store.state.config.config
  methods:
    showOpenFolderSelectDialog: ->
      folderPath = dialog.showOpenDialog null,
        properties: [ 'openDirectory' ]
        title: 'フォルダ'
        defaultPath: '.'
      if folderPath?
        @insertFolder(folderPath[0])
      else
        @sendNotification('add_folder', 'warning')

    insertFolder:(folderPath) ->
      @$store.dispatch('folders/insert', {folderPath: folderPath, config: @config})

    showConfirmDialog:(folder) ->
      @deleteTargetFolder = folder
      @deleteConfirmMessage = folder.name + "フォルダを削除しますか？\n※ 実際のフォルダは削除されません"
      @$store.commit('app/deleteFolderConfirmDialogVisible', true)

    hideConfirmDialog:(isOk) ->
      @$store.commit('app/deleteFolderConfirmDialogVisible', false)
      if isOk is true
        @deleteFolder(@deleteTargetFolder)
      else
        @sendNotification('delete_folder', 'warning')
      @deleteTargetFolder = {}

    deleteFolder:(folder) ->
      @$store.dispatch('folders/delete', {folder: folder, config: @config})

    sendNotification:(category, type) ->
      @$services.notification.notify(category, type, @config)
  components:
    'delete-folder-confirm-dialog': DeleteFolderConfirmDialog
</script>

<style lang="sass" scoped>
</style>
