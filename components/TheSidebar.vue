<template lang="pug">
section
  //- el-menu.el-menu-vertical-demo(default-active='2', @open='handleOpen', @close='handleClose', background-color='#545c64', text-color='#fff', active-text-color='#ffd04b')
  el-menu.el-menu-vertical-demo(
    default-active='2',
    background-color='#545c64',
    text-color='#fff',
    active-text-color='#ffd04b'
  )
    el-submenu(index='1')
      template(slot='title')
        //- i.el-icon-more-outline
        span フォルダ管理・設定
      el-menu-item(
        index='1-1',
        @click="folderManagementDialogVisible = true"
      )
        i.el-icon-plus
        span フォルダ管理
      el-menu-item(
        index='1-2',
        @click="configDialogVisible = true"
      )
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
    el-menu-item(
      v-for="(folder, index) in folders",
      :key="folder._id",
      :index="index + '2'"
    )
      i.el-icon-picture-outline
      span {{ folder.name }}
    //- el-menu-item(index='2')
    //-   i.el-icon-picture-outline
    //-   span アニメ 静止画
    //- el-menu-item(index='3')
    //-   i.el-icon-picture-outline
    //-   span アニメ gif
    //- el-menu-item(index='4')
    //-   i.el-icon-picture-outline
    //-   span 面白い系
    //- el-menu-item(
    //-   index='5',
    //-   disabled=''
    //- )
    //-   i.el-icon-picture-outline
    //-   span 長いディレクトリ名長いディレクトリ名長いディレクトリ名長いディレクトリ名
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
    folders: []
  created: ->
    @setFolders()
  methods:
    setFolders: ->
      @$db.folders.find {}, ((err, docs) ->
        @folders = docs
      ).bind(this)
    closeDialog: ->
      this.folderManagementDialogVisible = false
      this.configDialogVisible = false
      @setFolders()
  components:
    'folder-management-dialog': FolderManagementDialog
    'config-dialog': ConfigDialog
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
