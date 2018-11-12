# ウィンドウサイズ変更を検知してイベントを発火させるためのmixin
# Main系のコンポーネント複数で利用している
export default
  data: ->
    # ウィンドウ全体のサイズ
    windowWidthSize: window.outerWidth
  created: ->
    # ウィンドウのリサイズ時にイベントを発火させるためのリスナーを登録
    window.addEventListener('resize', @handleResize, false)
  beforeDestroy: ->
    # 登録したイベントリスナーを削除
    window.removeEventListener('resize', @handleResize)
  methods:
    # ウィンドウのリサイズ時にウィンドウサイズを取得しなおす
    handleResize: -> @windowWidthSize = window.outerWidth
