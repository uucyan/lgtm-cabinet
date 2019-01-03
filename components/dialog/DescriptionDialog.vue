<template lang="pug">
el-dialog(
  title="このアプリについて",
  width="70%",
  :visible.sync="descriptionDialogVisible",
  :before-close="close"
)
  el-main(style="height: 400px")
    h2 LGTM Cabinet とは
    p 自分が保存している画像を簡単に LGTM 画像として利用できるようにするための画像管理アプリです。
    p ローカル PC 内にあるフォルダ（ディレクトリ）から画像を一覧表示し、その中から簡単に画像をクリップボードへコピーすることが可能です。
    br
    p このアプリのコンセプトとして、ローカル PC 内にあるデータの変更は一切行いません。
    p なので、画像データが勝手に変わってしまったりフォルダが消えてしまうなどの事象は発生しません。
    p その代わり、フォルダの作成や画像自体の管理はご自身で行っていただく必要がございます。

    h2 機能
    p 主な機能をご紹介します。
    br
    ul
      li フォルダ（ディレクトリ）をアプリ内に登録/削除
      li 登録したフォルダ（ディレクトリ）を、サイドバーに一覧表示
      li ローカル PC 内にあるフォルダ（ディレクトリ）内にある画像を一覧表示
      li 一覧表示された画像をクリックするだけで、その画像をクリップボードへコピー
      li 一覧表示された画像の中から、ランダムで一つの画像をクリップボードへコピー

    h2 注意事項
    h3 GIF 画像について
    p 残念ながら GIF 画像のコピーには対応できておりません。
    p これは技術的な問題です。
    p
      | Electron が提供する
      |
      a(href="https://electronjs.org/docs/api/clipboard" target="_blank") clipboard
      |
      | を利用してクリップボードへの画像のコピーを実現しているのですが、
      |
      a(href="https://electronjs.org/docs/api/native-image" target="_blank") nativeImage
      |
      | が GIF 形式の画像をサポートしていないため実現できませんでした。
    p いつかサポートされたら対応したいと思います。

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
</style>
