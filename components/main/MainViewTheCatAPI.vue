<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.display-table
      a.header-element-left2.header-title.overflow-x-auto(href="https://thecatapi.com/" target="_blank") TheCatAPI.com
      div.header-element-right2
        el-popover(placement='top', v-model='searchOptionVisible')
          div.form-item
            label.form-label
              | 一度に取得する画像の枚数
              br
              | ※ 1枚 〜 27枚まで指定可能です
            el-input-number.input(v-model='limit', :max="27", :min="1")
            span.input-append-text 枚
          div.form-item
            label.form-label
              | 取得する画像の形式
              br
              | ※ 何も選択していない場合、すべての条件で検索されます
            el-checkbox-group.input(v-model='mimeTypes')
              el-checkbox-button(v-for='mimeType in mimeTypeOptions', :label='mimeType', :key='mimeType') {{mimeType}}
          div.margin-bottom-20px
          div(style='text-align: right; margin: 0')
            el-button(type='text', @click='searchOptionVisible = false') 閉じる
            el-button(type='primary', @click='getCatImages()') 画像の再取得
            div.margin-bottom-10px
            p ※ 画像の取得は必ずランダムです
          div.margin-bottom-20px
          el-button(
            v-if="windowWidthSize > 830"
            slot='reference'
            icon='el-icon-search'
            style='background: transparent; color: #ffffff;'
          ) 取得条件
          el-button(
            v-else
            slot='reference'
            circle
            icon='el-icon-search'
            style='background: transparent; color: #ffffff;'
          )

      div.header-element-right2(v-if="windowWidthSize > 830", style='width: 160px;')
        el-button(
          icon='el-icon-printer'
          @click="randomSelectImage()"
          v-bind:disabled='!isExistsImages'
          style='background: transparent; color: #ffffff;'
        ) ランダムコピー
      div.header-element-right2(v-else, style='width: 50px;')
        el-button(
          circle
          icon='el-icon-printer'
          @click="randomSelectImage()"
          v-bind:disabled='!isExistsImages'
          style='background: transparent; color: #ffffff;'
        )
  el-main.wood-grain-white(id='image-list', v-loading="loading")
    ul.itemlist.z-index-0
      li(v-for="image in images")
        img(
          :src="image.url"
          @click="copyToClipboard(image)"
        )
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"
import axios from 'axios'

{ clipboard } = require('electron')

export default
  name: 'MainViewTheCatApi'
  mixins: [ HandleResizeMixin ]
  data: ->
    images: []
    loading: true
    searchOptionVisible: false
    limit: 9
    mimeTypes: ['jpg', 'png', 'gif']
    mimeTypeOptions: ['jpg', 'png', 'gif']

  computed:
    config: -> @$store.state.config.config
    isExistsImages: -> @images.length > 0

  created: ->
    @limit = @config.theCatApiDefaultLimit
    @mimeTypes = @config.theCatApiDefaultMimeTypes
    @getCatImages()

  methods:
    # TheCatAPI から画像を取得
    getCatImages: ->
      @loading = true
      @searchOptionVisible = false
      @images = []
      axios.defaults.headers.common['x-api-key'] = '5c5955bc-4e22-4b18-b4a8-747a9622155d'
      response = await axios.get(
        'https://api.thecatapi.com/v1/images/search',
        { params: { limit: @limit, size: "full", mime_types: @mimeTypes.join(','), order: 'Rand' } }
      )
      if response.status == 200 && response.data.length > 0
        @images = response.data
        @sendNotification('external_service_connection', 'success')
      else
        @sendNotification('external_service_connection', 'error')
      @loading = false

    # 画像をランダムで選択
    randomSelectImage: ->
      return @sendNotification('copy_image', 'warning') if !@isExistsImages
      @copyToClipboard @images[Math.floor(Math.random() * Math.floor(@images.length))]

    # 選択画像をクリップボードにコピー
    copyToClipboard:(image) ->
      if @config.theCatApiCopyFormat == 'markdown'
        copyText = "[![LGTM](#{image.url})](#{image.url})"
      else
        copyText = image.url
      clipboard.writeText(copyText)
      @sendNotification('copy_image', 'success')

    # 通知を送信
    sendNotification:(category, type) ->
      @$services.notification.notify(category, type, @config)

</script>

<style lang="sass" scoped>
.display-table
  display: table
  width: 100%

.header-element-left2
  display: table-cell
  vertical-align: middle

.header-element-right2
  display: table-cell
  vertical-align: middle
  text-align: right

.margin-bottom-10px
  margin-bottom: 10px

.margin-bottom-20px
  margin-bottom: 20px

.input
  width: 300px
  margin-top: auto

.form-item
  display: flex
  border-bottom: solid #573216 1px
  padding: 1.5em 0 0.5em 1.5em

.form-label
  padding-right: 1.5em
  width: 80%

.input-append-text
  margin-top: auto
  margin-left: 10px
  margin-right: 10px

ul
  padding: 0px

img
  cursor: pointer

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
    cursor: pointer

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
