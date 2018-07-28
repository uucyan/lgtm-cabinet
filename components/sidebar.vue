<template lang="pug">
section
  //- el-menu.el-menu-vertical-demo(default-active='2', @open='handleOpen', @close='handleClose', background-color='#545c64', text-color='#fff', active-text-color='#ffd04b')
  el-menu.el-menu-vertical-demo(default-active='2', background-color='#545c64', text-color='#fff', active-text-color='#ffd04b')
    el-submenu(index='1')
      template(slot='title')
        //- i.el-icon-more-outline
        span フォルダ管理・設定
      el-menu-item(index='1-1', @click="folderManagementDialogVisible = true")
        i.el-icon-plus
        span フォルダ管理
      el-menu-item(index='1-2', @click="configDialogVisible = true")
        i.el-icon-setting
        span 設定
      //- el-menu-item-group(title='Group One')
      //-   el-menu-item(index='1-1') item one
      //-   el-menu-item(index='1-2') item one
      //- el-menu-item-group(title='Group Two')
      //-   el-menu-item(index='1-3') item three
      //- el-submenu(index='1-4')
      //-   template(slot='title') item four
      //-   el-menu-item(index='1-4-1') item one
    el-menu-item(index='2')
      i.el-icon-picture-outline
      span アニメ 静止画
    el-menu-item(index='3')
      i.el-icon-picture-outline
      span アニメ gif
    el-menu-item(index='4')
      i.el-icon-picture-outline
      span 面白い系
    el-menu-item(index='5', disabled='')
      i.el-icon-picture-outline
      span 長いディレクトリ名長いディレクトリ名長いディレクトリ名長いディレクトリ名
  folder_management_dialog(:folderManagementDialogVisible="folderManagementDialogVisible", @close="closeDialog")
  config_dialog(:configDialogVisible="configDialogVisible", @close="closeDialog")
</template>

<script lang="coffee">
import FolderManagementDialog from '~/components/folder_management_dialog.vue'
import ConfigDialog from '~/components/config_dialog.vue'

export default
  data: ->
    folderManagementDialogVisible: false
    configDialogVisible: false
  methods:
    closeDialog: ->
      this.folderManagementDialogVisible = false
      this.configDialogVisible = false
  components:
    'folder_management_dialog': FolderManagementDialog
    'config_dialog': ConfigDialog
</script>

<style lang="sass" scoped>
ul
  width: 250px
  height: 100vh
  overflow-y: auto

li
  overflow-x: auto

ul li::-webkit-scrollbar
  display: none
</style>
