<template lang="pug">
section.wood-grain-dark-brown
  el-menu.z-index-1(
    default-active='1',
    background-color='transparent',
    text-color='#fff',
    active-text-color='#ffd04b'
    style='border-right: none'
  )
    el-menu-item(
        index='1',
        @click="select('')"
      ) LGTM Cabinet
    el-submenu(index='2')
      template(slot='title')
        span 管理・設定
      el-menu-item(
        index='2-1',
        @click="select('folderManagement')"
      )
        i.el-icon-edit-outline
        span フォルダ管理
      el-menu-item(
        index='2-2',
        @click="select('config')"
      )
        i.el-icon-setting
        span 設定
    el-submenu(index='3')
      template(slot='title')
        span フォルダ
      el-menu-item(
        v-for="(folder, index) in folders",
        :key="folder._id",
        :index="'3-' + index"
        @click="select('folder', folder)"
      )
        i.el-icon-picture-outline
        span {{ folder.name }}
</template>

<script lang="coffee">
export default
  name: 'TheSidebar'
  computed:
    folders: -> @$store.state.folders.list
  methods:
    select:(menuName, folder = null) ->
      @$store.commit('state/selectMenu', menuName)
      if folder?
        @$store.dispatch('folders/getImagePaths', folder)
        @$store.commit('folders/setSelectFolderName', folder.name)
</script>

<style lang="sass" scoped>
ul
  height: 100vh
  width: 250px
  overflow-y: auto
  box-shadow: 9px 5px 25px 8px rgba(0, 0, 0, 0.3)

li
  overflow-x: auto

ul li::-webkit-scrollbar
  display: none
</style>
