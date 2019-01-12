<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto 設定
    div.header-element-right
      el-button(
        v-if="windowWidthSize > 700"
        icon='el-icon-refresh'
        @click="resetConfig"
        style='background: transparent; color: #ffffff;'
      ) 設定をリセット
      el-button(
        v-else
        circle
        icon='el-icon-refresh'
        @click="resetConfig"
        style='background: transparent; color: #ffffff;'
      )
  el-main.wood-grain-white.z-index-0
    div.config-title
      i.el-icon-menu
      span サイドバー
    div.form-item
      label サイドバーに「LGTM Cabinet」を表示する
      el-switch.input(v-model='sidebarShowTitle', @change="updateConfig('sidebarShowTitle', sidebarShowTitle)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.form-item
      label サイドバーのフォルダタブを常に展開した状態にする
      el-switch.input(v-model='sidebarFileTabOpen', @change="updateConfig('sidebarFileTabOpen', sidebarFileTabOpen)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.margin-bottom-20px

    div.config-title
      i.el-icon-picture
      span 画像一覧
    div.form-item
      label
        | 画像一覧に GIF 形式の画像を表示する
        br
        | ※ GIF 形式の画像はコピーできません
      el-switch.input(v-model='imageListShowGifImage', @change="updateConfig('imageListShowGifImage', imageListShowGifImage)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.form-item
      label 画像一覧を表示するファルダを切り替えた際に、スクロールの位置を保持する
      el-switch.input(v-model='imageListKeepScrollPosition', @change="updateConfig('imageListKeepScrollPosition', imageListKeepScrollPosition)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.margin-bottom-20px

    div.config-title
      i.el-icon-bell
      span 通知
    div.form-item
      label
        | 通知の位置
        br
        | ※ 右上、右下、左上、左下から選択できます
      el-select.input(v-model='notificationPosition', @change="updateConfig('notificationPosition', notificationPosition)",  placeholder='Select')
        el-option(v-for='item in notificationPositionOptions', :key='item.value', :label='item.label', :value='item.value')
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"

export default
  name: 'MainViewFolderConfig'
  mixins: [ HandleResizeMixin ]
  data: ->
    # サイドバー
    sidebarShowTitle: true
    sidebarFileTabOpen: false
    # 画像一覧
    imageListShowGifImage: true
    imageListKeepScrollPosition: false
    # 通知
    notificationPosition: 'bottom-left'
    notificationPositionOptions: [
      {
        value: 'top-right'
        label: '右上'
      },
      {
        value: 'bottom-right'
        label: '右下'
      },
      {
        value: 'top-left'
        label: '左上'
      },
      {
        value: 'bottom-left'
        label: '左下'
      }
    ]
  created: ->
    @$store.dispatch('config/find')

  computed:
    config: -> @$store.state.config.config

  watch:
    config: ->
      @sidebarShowTitle = @config.sidebarShowTitle
      @sidebarFileTabOpen = @config.sidebarFileTabOpen
      @imageListShowGifImage = @config.imageListShowGifImage
      @imageListKeepScrollPosition = @config.imageListKeepScrollPosition
      @notificationPosition = @config.notificationPosition

  methods:
    # 設定の更新
    updateConfig:(key, value) ->
      @$store.dispatch('config/updateBy', {key: key, value: value})

    # 設定のリセット
    resetConfig: ->
      @$store.dispatch('config/remove')
</script>

<style lang="sass" scoped>
label
  padding-right: 1.5em
  width: 80%

i
  margin-right: 5px

.config-title
  font-size: 25px
  font-weight: bold
  margin-bottom: 10px

.input
  width: 200px

.form-item
  display: flex
  border-bottom: solid #573216 1px
  padding: 1.5em 0 0.5em 1.5em

.margin-bottom-20px
  margin-bottom: 20px
</style>
