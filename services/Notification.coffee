# 通知用のサービス
# element-ui の Notification を利用
# SEE：http://element.eleme.io/2.4/#/en-US/component/notification
import Vue from 'vue'

export default class Notification
  NOTIFICATION_MESSAGES =
    copy_image:
      success:
        title: '成功'
        message: 'クリップボードへのコピーに成功しました。'
      error:
        title: '失敗'
        message: 'クリップボードへのコピーに失敗しました。'
      warning:
        title: '警告'
        message: 'フォルダが選択されていないか画像がありません。'
    add_folder:
      success:
        title: '成功'
        message: 'フォルダの追加に成功しました。'
      error:
        title: '失敗'
        message: 'フォルダの追加に失敗しました。'
      warning:
        title: '警告'
        message: 'フォルダを追加しませんでした。'
    delete_folder:
      success:
        title: '成功'
        message: 'フォルダの削除に成功しました。'
      error:
        title: '失敗'
        message: 'フォルダの削除に失敗しました。'
      warning:
        title: '警告'
        message: 'フォルダを削除しませんでした。'
    update_config:
      success:
        title: '成功'
        message: '設定の更新に成功しました。'
      error:
        title: '失敗'
        message: '設定の更新に失敗しました。'
    reset_config:
      success:
        title: '成功'
        message: '設定の初期化に成功しました。'
      warning:
        title: '警告'
        message: '設定の初期化をしませんでした。'
      error:
        title: '失敗'
        message: '設定の初期化に失敗しました。'
    external_service_connection:
      success:
        title: '成功'
        message: '画像の取得に成功しました。'
      warning:
        title: '警告'
        message: '外部サービスへの接続をしませんでした。'
      error:
        title: '失敗'
        message: '外部サービスへの接続に失敗しました。'

  notify: (category, type, config, error = null) ->
    Vue.prototype.$notify
      type: type
      position: config.notificationPosition
      duration: config.notificationDuration * 1000
      customClass: 'my-notification'
      title: NOTIFICATION_MESSAGES[category][type].title
      message: @getMessage(category, type, error)

  getMessage: (category, type, error) ->
    message = NOTIFICATION_MESSAGES[category][type].message
    return message if !error?
    message + "\n" + 'エラー内容：' + error
