<template lang="pug">
el-container
  el-header
    div(style='float: left;')
      p.postit(v-if="folderName") \#{{ folderName }}
      p.postit(v-else) #フォルダ未選択
      p.postit \#{{ imagesLength }}枚
    div(style='float: right;')
      el-button(type='primary', round='' icon='el-icon-printer' @click="randomCopy()" v-bind:disabled='!isExistsImages') ランダムコピー
  el-main
    ul.itemlist.cf
      li(v-for="image in images")
        img(
          :src="image"
          @click="copyToClipboard(image)"
        )
      //- mock用
      li(v-for="n in 10")
        img(
          :src="requireImg()"
        )
</template>

<script lang="coffee">
nativeImage = require('electron').nativeImage
{ clipboard } = require('electron')

export default
  name: 'ImageList'
  data: ->
    messages: {
      success: 'クリップボードへのコピーに成功しました。'
      error: 'クリップボードへのコピーに失敗しました。'
      warning: 'フォルダが選択されていないか画像がありません。'
    }
  computed:
    images: -> @$store.state.folders.images
    folderName: -> @$store.state.folders.selectFolderName
    imagesLength: -> @$store.getters['folders/getImagesLength']
    isExistsImages: -> @$store.getters['folders/isExistsImages']
  methods:
    # 画像をランダムで選択
    randomCopy: ->
      if !@$store.getters['folders/isExistsImages']
        return @showMessage('warning')
      @copyToClipboard @$store.getters['folders/getRandomImage']
    # 選択画像をクリップボードにコピー
    copyToClipboard:(path) ->
      image = nativeImage.createFromPath(path)
      if image.isEmpty()
        return @showMessage('error')
      clipboard.writeImage(image)
      @showMessage('success')
    # 画面上部にメッセージを表示
    showMessage:(type) ->
      @$message
        showClose: true
        message: @messages[type]
        type: type
    requireImg:() ->
      require("@/assets/img/logo.png")
</script>

<style lang="sass" scoped>
section
  height: 100vh
  overflow-y: auto
  padding: 20px


//- ul
//-   // width: auto
//-   padding: 0
//-
//- li
//-   margin: 10px
//-   float: left
//-   list-style: none
//-
//- .image
//-   width: 35vh
//-   // display: block

.postit
  margin: 0
  font-size: 24px
  position: relative
  font-weight: normal
  display: inline-block
  background-color: #feeaac
  padding: 10px
  margin-bottom: 10px
  border-radius: 2px
  margin-right: 20px

.postit:before
  content: ''
  background-color: #b3b3b3
  display: block
  position: absolute
  left: 50%
  height: 60%
  top: 26%
  z-index: -1
  width: 46%
  box-shadow: 0 0 8px 8px #b3b3b3
  transform: rotate(3deg)

.itemlist
  // max-width: 2024px
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
