<template lang="pug">
el-dialog(
  title="確認",
  width="30%",
  :visible.sync="confirmDialogVisible",
  :before-close="close"
)
  span(v-if="folder") {{ folder.name }} フォルダを削除しますか？
  br
  span ※実際のフォルダは削除されません。
  span(
    slot="footer",
    class="dialog-footer"
  )
    el-button(@click="close") いいえ
    el-button(
      type="primary",
      @click="close(true)"
    ) はい
</template>

<script lang="coffee">
export default
  props:
    folder: Object
  computed:
    confirmDialogVisible: -> @$store.state.state.confirmDialogVisible
  methods:
    close:(isOk = false) ->
      @$emit('close', isOk)
</script>

<style lang="sass" scoped>
</style>
