<template lang="pug">
el-dialog(
  title="このアプリの使い方",
  width="70%",
  :visible.sync="descriptionDialogVisible",
  :before-close="close"
)
  el-main(style="height: 400px")
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く
    p ここにつらつらと説明を書く

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
