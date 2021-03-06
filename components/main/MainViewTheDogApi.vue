<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.display-table
      a.header-element-left2.header-title.overflow-x-auto(href="https://thedogapi.com/" target="_blank") TheDogAPI.com
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
            el-button(type='primary', @click='getDogImages()') 画像の再取得
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
        el-tooltip(content='クリックでコピー！', placement='top', effect='light', :disabled="!config.imageListShowTooltip")
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
  name: 'MainViewTheDogApi'
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
    @limit = @config.theDogApiDefaultLimit
    @mimeTypes = @config.theDogApiDefaultMimeTypes
    @getDogImages()

  methods:
    # TheDogAPI から画像を取得
    getDogImages: ->
      @loading = true
      @searchOptionVisible = false
      @images = []
      axios.defaults.headers.common['x-api-key'] = '0f1c7b58-c06d-4e6d-a2c1-ff1c2ef8424f'
      response = await axios.get(
        'https://api.thedogapi.com/v1/images/search',
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
      if @config.theDogApiCopyFormat == 'markdown'
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
</style>
