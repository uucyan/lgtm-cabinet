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
  el-main.wood-grain-white
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
nativeImage = require('electron').nativeImage
{ clipboard } = require('electron')

export default
  name: 'MainViewImageList'
  data: ->
    isDev: process.env.NODE_ENV == 'development'
    windowWidthSize: window.outerWidth
  computed:
    images: -> @$store.state.folders.images
    folderName: -> @$store.state.folders.selectFolderName
    isExistsImages: -> @$store.getters['folders/isExistsImages']
  methods:
    # 画像をランダムで選択
    randomCopy: ->
      if !@$store.getters['folders/isExistsImages']
        return @sendNotification('warning')
      @copyToClipboard @$store.getters['folders/getRandomImage']
    # 選択画像をクリップボードにコピー
    copyToClipboard:(path) ->
      image = nativeImage.createFromPath(path)
      if image.isEmpty()
        return @sendNotification('error')
      clipboard.writeImage(image)
      @sendNotification('success')
    # 画面上部にメッセージを表示
    sendNotification:(type) ->
      @$services.notification.notify(@, 'copy_image', type)
    # ウィンドウのリサイズ時に横幅を取得
    handleResize: -> @windowWidthSize = window.outerWidth
  created: ->
    # 画面のリサイズ時にイベントを発火させるためのリスナーを登録
    window.addEventListener('resize', @handleResize, false)
  beforeDestroy: ->
    # 登録したイベントリスナーを削除
    window.removeEventListener('resize', @handleResize)
</script>

<style lang="sass" scoped>
ul
  padding: 0px

.itemlist
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5))
  margin: 0 auto
  li
    list-style: none
    float: left
    width: 33.333333%
    padding: 10px
    &:nth-child(3n+1)
      clear: left
  img
    width: 100%
    height: auto

@media screen and (max-width: 1300px)
  .itemlist li
    width: 50%
    &:nth-child(2n+1)
      clear: left
    &:nth-child(3n+1)
      clear: none

@media screen and (max-width: 1000px)
  .itemlist li
    width: 100%
    &:nth-child(2n+1)
      clear: none
</style>
