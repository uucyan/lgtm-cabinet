<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto {{ folderName }}
    div.header-element-right
      el-button(
        v-if="windowWidthSize > 1000"
        icon='el-icon-printer'
        @click="randomCopy()"
        v-bind:disabled='!isExistsImages'
        style='background: transparent; color: #ffffff;'
      ) ランダムコピー
      el-button(
        v-else
        circle
        icon='el-icon-printer'
        @click="randomCopy()"
        v-bind:disabled='!isExistsImages'
        style='background: transparent; color: #ffffff;'
      )
  el-main.wood-grain-white(id='image-list')
    ul.itemlist.z-index-0(v-if="!isDev")
      li(v-for="image in images")
        img(
          :src="image"
          @click="copyToClipboard(image)"
        )
    //- mock用
    ul.itemlist.z-index-0(v-if="isDev")
      li(v-for="n in 12")
        img(
          src="~assets/img/logo.png"
        )
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"

nativeImage = require('electron').nativeImage
{ clipboard } = require('electron')

export default
  name: 'MainViewImageList'
  mixins: [ HandleResizeMixin ]
  data: ->
    isDev: process.env.NODE_ENV == 'development'

  computed:
    images: -> @$store.state.folders.images
    folderName: -> @$store.state.folders.selectFolderName
    isExistsImages: -> @$store.getters['folders/isExistsImages']
    config: -> @$store.state.config.config
  watch:
    images: -> @scrollTop()

  methods:
    # 画像をランダムで選択
    randomCopy: ->
      if !@isExistsImages
        return @sendNotification('warning')
      @copyToClipboard @images[Math.floor(Math.random() * Math.floor(@images.length))]

    # 選択画像をクリップボードにコピー
    copyToClipboard:(path) ->
      image = nativeImage.createFromPath(path)
      if image.isEmpty()
        return @sendNotification('error')
      clipboard.writeImage(image)
      @sendNotification('success')

    # 画面上部にメッセージを表示
    sendNotification:(type) ->
      @$services.notification.notify('copy_image', type, @config)

    # スクロールをトップにする
    scrollTop: ->
      return if @config.imageListKeepScrollPosition
      element = document.getElementById('image-list')
      element.scrollTop = 0 if element?
</script>

<style lang="sass" scoped>
</style>
