<template lang="pug">
el-dialog(
  title="このアプリについて",
  width="70%",
  :visible.sync="descriptionDialogVisible",
  :before-close="close"
)
  el-main(style="height: 500px")
    h2 LGTM Cabinet とは
      i.el-icon-question
    p 自分が保存している画像を簡単に LGTM 画像として利用できるようにするための画像管理アプリです。
    p ローカル PC 内にあるフォルダ（ディレクトリ）から画像を一覧表示し、その中から簡単に画像をクリップボードへコピーすることが可能です。
    br
    p このアプリのコンセプトとして、ローカル PC 内にあるデータの変更は一切行いません。
    p なので、画像データが勝手に変わってしまったりフォルダが消えてしまうなどの事象は発生しません。
    p その代わり、フォルダの作成や画像自体の管理はご自身で行っていただく必要がございます。
    div.margin-bottom-20px

    h2 機能
      i.el-icon-star-on
    h3 主な機能
    ul.border
      li ローカルフォルダにある画像を簡単にコピーできる
      li
        | 外部サービスの
        |
        a(href="https://thecatapi.com/" target="_blank") TheCatAPI.com
        |
        | から画像を取得し、マークダウンまたは URL 形式で簡単にコピーできる
      li
        | 外部サービスの
        |
        a(href="https://thedogapi.com/" target="_blank") TheDogAPI.com
        |
        | から画像を取得し、マークダウンまたは URL 形式で簡単にコピーできる
    div.margin-bottom-20px
    h3 ローカルフォルダにある画像のサポート形式
    ul.border
      li PNG
      li JPEG
    div.margin-bottom-20px
    h4 GIF 画像について
    p 残念ながら GIF 画像のコピーには対応できておりません。
    p これは技術的な問題です。
    p
      a(href="https://electronjs.org/" target="_blank") Electron
      |
      | が提供する
      |
      a(href="https://electronjs.org/docs/api/clipboard" target="_blank") clipboard
      |
      | を利用してクリップボードへの画像のコピーを実現していますが、
      |
      a(href="https://electronjs.org/docs/api/native-image" target="_blank") nativeImage
      |
      | が GIF 形式の画像をサポートしていないため実現できませんでした。
    p いつかサポートされたら対応したいと思います。
    p ※ 外部サービスから取得した GIF 形式の画像はコピー可能です。
    div.margin-bottom-20px

    h2 今後
      i.el-icon-loading
    p 今後実装したいと思っている機能です。
    p 期待せず待っていてください。
    div.margin-bottom-10px
    ul.border
      li 画像の編集機能
      ul.nest
        li 「LGTM」などのテキストを画像に加えれるようにする
        li
          | 恐らく
          |
          a(href="https://github.com/oliver-moran/jimp" target="_blank") Jimp
          |
          | を使って実装する

  span(
    slot="footer"
    class="dialog-footer"
  )
    el-button(
      @click="close()"
      style='background: transparent; color: #ffffff;'
    ) 閉じる
</template>

<script lang="coffee">
import ChangeStyleMixin from "~/components/dialog/ChangeStyleMixin.coffee"

export default
  mixins: [ ChangeStyleMixin ]
  computed:
    descriptionDialogVisible: -> @$store.state.state.descriptionDialogVisible
  methods:
    close:() -> @$store.commit('state/descriptionDialogVisible', false)
</script>

<style lang="sass" scoped>
h2
  margin-bottom: 10px

h3
  margin-bottom: 10px

h4
  margin-bottom: 10px

p
  line-height: 1.5

a
  color: $color-dark-brown

ul.border
  border-top: solid $color-dark-brown 1px
  border-bottom: solid $color-dark-brown 1px
  padding: 0.5em 0 0.5em 1.5em

ul.nest
  margin: 0 0 0 1em;
  padding: 0;

ul li
  padding: 0.5em 0
</style>
