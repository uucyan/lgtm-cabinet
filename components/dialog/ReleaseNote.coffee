# リリースノートの内容を管理するクラス
export default class ReleaseNote
  # 新しいリリース情報は上に足してく
  NOTES = [
    {
      version: '1.0.0'
      update_details: [
        'バージョン 1.0.0 リリース！！'
      ]
    },
  ]

  constructor: -> @notes = NOTES
  title: (index) -> "バージョン " + @notes[index].version + " 🎉"
