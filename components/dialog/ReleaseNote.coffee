# リリースノートの内容を管理するクラス
export default class ReleaseNote
  # 新しいリリース情報は上に足してく
  NOTES = [
    {
      version: '0.0.1'
      update_details: [
        'β版リリース！'
      ]
    },
  ]

  constructor: -> @notes = NOTES
  title: (index) -> "バージョン " + @notes[index].version + " 🎉"
