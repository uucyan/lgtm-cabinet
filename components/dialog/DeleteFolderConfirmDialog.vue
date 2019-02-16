<template lang="pug">
el-dialog(
  title="確認",
  width="30%",
  :visible.sync="deleteFolderConfirmDialogVisible",
  :before-close="close"
)
  el-main(style="height: 150px")
    span.message {{ message }}
  span(
    slot="footer",
    class="dialog-footer"
  )
    el-button(@click="close" style='background: transparent; color: #ffffff;') いいえ
    el-button(@click="close(true)" style="background: #ffffff; color: #744d30;") はい
</template>

<script lang="coffee">
import ChangeStyleMixin from "~/components/dialog/ChangeStyleMixin.coffee"

export default
  props:
    message: String
  mixins: [ ChangeStyleMixin ]
  computed:
    deleteFolderConfirmDialogVisible: -> @$store.state.app.deleteFolderConfirmDialogVisible
  methods:
    close:(isOk = false) ->
      @$emit('close', isOk)
</script>

<style lang="sass" scoped>
.message
  white-space: pre-wrap
  line-height: 1.5
</style>
