<template lang="pug">
section.wood-grain-dark-brown
  el-menu.z-index-1(
    default-active='1',
    background-color='transparent',
    text-color='#fff',
    active-text-color='#ffd04b'
    style='border-right: none'
    ref='menu'
  )
    el-menu-item(
        v-if="'sidebarShowTitle' in config && config.sidebarShowTitle"
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
        span 外部サービス
      el-menu-item(
        index='3-1',
        @click="select('theCatApi')"
      )
        i.el-icon-picture-outline
        span TheCatAPI.com
      el-menu-item(
        index='3-2',
        @click="select('theDogApi')"
      )
        i.el-icon-picture-outline
        span TheDogAPI.com
    el-submenu(index='4')
      template(slot='title')
        span フォルダ
      el-menu-item(
        v-for="(folder, index) in folders",
        :key="folder._id",
        :index="'4-' + index"
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
    config: -> @$store.state.config.config
  mounted: -> setTimeout(@sidebarFileTabOpen, 500)
  methods:
    select:(menuName, folder = null) ->
      @$store.commit('app/selectMenu', menuName)
      if folder?
        @$store.dispatch('folders/getImagePaths', {folder: folder, imageListShowGifImage: @config.imageListShowGifImage})
        @$store.commit('folders/setSelectFolderName', folder.name)
    sidebarFileTabOpen: ->
      if @config.sidebarFileTabOpen? && @config.sidebarFileTabOpen
        @$refs.menu.open 4
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
