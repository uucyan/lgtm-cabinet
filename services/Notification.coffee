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
    reset_config:
      success:
        title: '成功'
        message: '設定の初期化に成功しました。'
      warning:
        title: '警告'
        message: '設定の初期化をしませんでした。'

  notify: (category, type, position, duration) ->
    Vue.prototype.$notify
      type: type
      position: position
      duration: duration * 1000
      title: NOTIFICATION_MESSAGES[category][type].title
      message: NOTIFICATION_MESSAGES[category][type].message
