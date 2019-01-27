<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto 設定
    div.header-element-right
      el-button(
        v-if="windowWidthSize > 900"
        icon='el-icon-refresh'
        @click="showConfirmDialog"
        style='background: transparent; color: #ffffff;'
      ) 設定を初期化
      el-button(
        v-else
        circle
        icon='el-icon-refresh'
        @click="showConfirmDialog"
        style='background: transparent; color: #ffffff;'
      )
  el-main.wood-grain-white.z-index-0
    div.config-title
      i.el-icon-menu
      span サイドバー
    div.form-item
      label.form-label サイドバーに「LGTM Cabinet」を表示する
      el-switch.input(v-model='sidebarShowTitle', @change="updateConfig('sidebarShowTitle', sidebarShowTitle)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.form-item
      label.form-label アプリの起動時にサイドバーのフォルダタブを展開した状態にする
      el-switch.input(v-model='sidebarFileTabOpen', @change="updateConfig('sidebarFileTabOpen', sidebarFileTabOpen)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.margin-bottom-20px

    div.config-title
      i.el-icon-picture
      span 画像一覧
    div.form-item
      label.form-label
        | 画像一覧に GIF 形式の画像を表示する
        br
        | ※ GIF 形式の画像はコピーできません
      el-switch.input(v-model='imageListShowGifImage', @change="updateConfig('imageListShowGifImage', imageListShowGifImage)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.form-item
      label.form-label 画像一覧を表示するファルダを切り替えた際に、スクロールの位置を保持する
      el-switch.input(v-model='imageListKeepScrollPosition', @change="updateConfig('imageListKeepScrollPosition', imageListKeepScrollPosition)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.margin-bottom-20px

    div.config-title
      i.el-icon-bell
      span 通知
    div.form-item
      label.form-label
        | 通知の位置
        br
        | ※ フォルダの管理や画像のコピー時に行う通知です
      el-select.input(v-model='notificationPosition', @change="updateConfig('notificationPosition', notificationPosition)",  placeholder='選択')
        el-option(v-for='item in notificationPositionOptions', :key='item.value', :label='item.label', :value='item.value')
    div.form-item
      label.form-label
        | 通知の表示時間
        br
        | ※ 0.1 〜 10.0 秒まで指定可能です
      el-input-number.input(v-model='notificationDuration', @change="updateConfig('notificationDuration', notificationDuration)", :precision="1", :step="0.1", :max="10", :min="0.1")
      span.input-append-text 秒
    div.form-item
      label.form-label 設定の変更時に通知をする
      el-switch.input(v-model='notificationConfigUpdateNotify', @change="updateConfig('notificationConfigUpdateNotify', notificationConfigUpdateNotify)", active-text='する', inactive-text='しない' active-color="#744d30")
    div.margin-bottom-20px

    div.config-title
      i.el-icon-message
      span フォルダ
    div.form-item
      label.form-label
        | フォルダのソート順
        br
        | ※ サイドバーとフォルダ管理に表示するフォルダの順番を設定できます
      el-select.input(v-model='folderSortTagetColmun', @change="updateConfig('folderSortTagetColmun', folderSortTagetColmun)",  placeholder='選択')
        el-option(v-for='item in folderSortTagetColmunOption', :key='item.value', :label='item.label', :value='item.value')
      span.input-append-text の
      el-select.input(v-model='folderSortOrder', @change="updateConfig('folderSortOrder', folderSortOrder)",  placeholder='選択')
        el-option(v-for='item in folderSortOrderOption', :key='item.value', :label='item.label', :value='item.value')
    div.margin-bottom-20px

    div.config-title
      i.el-icon-share
      span TheCatAPI.com
    div.form-item
      label.form-label
        | デフォルトの一度に取得する画像の枚数
        br
        | ※ 1枚 〜 27枚まで指定可能です
      el-input-number.input(v-model='theCatApiDefaultLimit', @change="updateConfig('theCatApiDefaultLimit', theCatApiDefaultLimit)", :max="27", :min="1")
      span.input-append-text 枚
    div.form-item
      label.form-label
        | デフォルトの取得する画像の形式
        br
        | ※ 何も選択していない場合、すべての条件で検索されます
      el-checkbox-group.input(v-model='theCatApiDefaultMimeTypes')
        el-checkbox-button(v-for='mimeType in mimeTypeOptions', @change="updateConfig('theCatApiDefaultMimeTypes', theCatApiDefaultMimeTypes)", :label='mimeType', :key='mimeType') {{mimeType}}
    div.form-item
      label.form-label
        | 画像のコピー形式
        br
        | ※ マークダウン形式にした場合、 "[![LGTM](https://hogehoge)](https://hogehoge)" の形式でコピーします
      el-select.input(v-model='theCatApiCopyFormat', @change="updateConfig('theCatApiCopyFormat', theCatApiCopyFormat)",  placeholder='選択')
        el-option(v-for='item in theCatApiCopyFormatOption', :key='item.value', :label='item.label', :value='item.value')
  reset-config-confirm-dialog(
    :message="resetConfirmMessage",
    @close="hideConfirmDialog"
  )
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"
import ResetConfigConfirmDialog from '~/components/dialog/ResetConfigConfirmDialog.vue'

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
    notificationPosition: 'bottom-right'
    notificationDuration: 4.5
    notificationConfigUpdateNotify: true
    folderSortTagetColmun: 'createdAt'
    folderSortOrder: 1
    theCatApiDefaultLimit: 9
    theCatApiDefaultMimeTypes: ['jpg', 'png', 'gif']
    theCatApiCopyFormat: 'markdown'
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
    folderSortTagetColmunOption: [
      {
        value: 'name'
        label: 'フォルダ名'
      },
      {
        value: 'createdAt'
        label: '追加日時'
      },
    ]
    folderSortOrderOption: [
      {
        value: 1
        label: '昇順'
      },
      {
        value: -1
        label: '降順'
      },
    ]
    theCatApiCopyFormatOption: [
      {
        value: 'markdown'
        label: 'マークダウン'
      },
      {
        value: 'url'
        label: 'URL'
      },
    ]
    mimeTypeOptions: ['jpg', 'png', 'gif']
    resetConfirmMessage: ''

  computed:
    config: -> @$store.state.config.config

  watch:
    config: ->
      @sidebarShowTitle = @config.sidebarShowTitle
      @sidebarFileTabOpen = @config.sidebarFileTabOpen
      @imageListShowGifImage = @config.imageListShowGifImage
      @imageListKeepScrollPosition = @config.imageListKeepScrollPosition
      @notificationPosition = @config.notificationPosition
      @notificationDuration = @config.notificationDuration
      @notificationConfigUpdateNotify = @config.notificationConfigUpdateNotify
      @folderSortTagetColmun = @config.folderSortTagetColmun
      @folderSortOrder = @config.folderSortOrder
      @theCatApiDefaultLimit = @config.theCatApiDefaultLimit
      @theCatApiDefaultMimeTypes = @config.theCatApiDefaultMimeTypes
      @theCatApiCopyFormat = @config.theCatApiCopyFormat
      # フォルダのソートを適用
      @$store.dispatch('folders/findAll', {config: @config, isUpdate: false})

  methods:
    # 設定の更新
    updateConfig:(key, value) ->
      @$store.dispatch('config/updateBy', {key: key, value: value})

    # 設定のリセット
    resetConfig: ->
      @$store.dispatch('config/remove')

    # 確認ダイアログの表示
    showConfirmDialog: ->
      @resetConfirmMessage = "設定を初期状態に戻しますか？"
      @$store.commit('state/resetConfigConfirmDialogVisible', true)

    # 確認ダイアログを閉じる
    hideConfirmDialog:(isOk) ->
      @$store.commit('state/resetConfigConfirmDialogVisible', false)
      if isOk is true
        @resetConfig()
      else
        @sendNotification('reset_config', 'warning')

    # 通知
    sendNotification:(category, type) ->
      @$services.notification.notify(category, type, @config)

  components:
    'reset-config-confirm-dialog': ResetConfigConfirmDialog
</script>

<style lang="sass" scoped>
.form-label
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
  margin-top: auto

.form-item
  display: flex
  border-bottom: solid #573216 1px
  padding: 1.5em 0 0.5em 1.5em

.input-append-text
  margin-top: auto
  margin-left: 10px
  margin-right: 10px

.margin-bottom-20px
  margin-bottom: 20px
</style>
