# elements-ui のスタイルを自分で定義したスタイルに変更する
# どれかのダイアログが一度表示されると、すべてのダイアログにスタイルが適用される
export default
  watch:
    # ダイアログが表示された 0.1 秒後にスタイルを変更する
    # body の DOM が生成され終わるのを待つため
    descriptionDialogVisible:() -> setTimeout(@setDialogStyles, 100)
    confirmDialogVisible:() -> setTimeout(@setDialogStyles, 100)
  methods:
    setDialogStyles:() ->
      # ヘッダー全体のスタイル
      document.querySelectorAll('.el-dialog__header').forEach (element) -> element.className = 'my-dialog-header wood-grain-dark-brown'
      # ヘッダーのタイトルテキストのスタイル
      document.querySelectorAll('.el-dialog__title').forEach (element) -> element.className = 'my-dialog-title'
      # フッター全体のスタイル
      document.querySelectorAll('.el-dialog__footer').forEach (element) -> element.className = 'my-dialog-footer wood-grain-dark-brown'
      # body 全体のスタイル
      document.querySelectorAll('.el-dialog__body').forEach (element) -> element.className = 'my-dialog-body wood-grain-white'
