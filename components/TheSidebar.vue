<template lang="pug">
section(class='menu-area')
  el-menu.el-menu-vertical-demo(
    default-active='1',
    background-color='#545c64',
    text-color='#fff',
    active-text-color='#ffd04b'
  )
    el-submenu(index='1')
      template(slot='title')
        //- i.el-icon-more-outline
        span フォルダ管理・設定
      el-menu-item(
        id='folder-management-menu-item'
        index='1-1',
        @click="openFolderManagementDialog('folder-management-menu-item')"
      )
        i.el-icon-plus
        span フォルダ管理
      el-menu-item(
        id='config-menu-item'
        index='1-2',
        @click="openConfigDialog('config-menu-item')"
      )
        i.el-icon-setting
        span 設定
  el-menu.el-menu-vertical-demo(
    default-active='1',
    background-color='#545c64',
    text-color='#fff',
    active-text-color='#ffd04b'
  )
    el-menu-item(
      v-for="(folder, index) in folders",
      :key="folder._id",
      :index="index + '2'"
      @click="select(folder)"
    )
      i.el-icon-picture-outline
      span {{ folder.name }}
  folder-management-dialog(
    :folderManagementDialogVisible="folderManagementDialogVisible",
    @close="closeDialog"
  )
  config-dialog(
    :configDialogVisible="configDialogVisible",
    @close="closeDialog"
  )
</template>

<script lang="coffee">
import FolderManagementDialog from '~/components/FolderManagementDialog.vue'
import ConfigDialog from '~/components/ConfigDialog.vue'

export default
  name: 'TheSidebar'
  data: ->
    folderManagementDialogVisible: false
    configDialogVisible: false
    selectMenuItemId: ''
  computed:
    folders: -> @$store.state.folders.list
  methods:
    openFolderManagementDialog:(id) ->
      @folderManagementDialogVisible = true
      @selectMenuItemId = id
      @changeSelectMenuItemStyle('open')
    openConfigDialog:(id) ->
      @configDialogVisible = true
      @selectMenuItemId = id
      @changeSelectMenuItemStyle('open')
    closeDialog: ->
      @folderManagementDialogVisible = false
      @configDialogVisible = false
      @changeSelectMenuItemStyle('close')
    changeSelectMenuItemStyle:(action) ->
      element = document.getElementById @selectMenuItemId
      if !element?
        return
      if action == 'open'
        element.style.color = 'rgb(255, 208, 75)'
        element.className = "el-menu-item is-active"
      else
        element.style.color = 'rgb(255, 255, 255)'
        element.className = "el-menu-item"
    select:(folder) ->
      # @$store.dispatch('folders/select', folder)
      @$store.dispatch('folders/getImagePaths', folder)
  components:
    'folder-management-dialog': FolderManagementDialog
    'config-dialog': ConfigDialog
</script>

<style lang="sass" scoped>
.menu-area
  height: 100vh
  background-color: #545c64

ul
  width: 250px
  overflow-y: auto

li
  overflow-x: auto

ul li::-webkit-scrollbar
  display: none
</style>
