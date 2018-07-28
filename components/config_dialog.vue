<template lang="pug">
el-dialog(title="設定", :visible.sync="configDialogVisible", width="50%", :before-close="close")
  span アプリケーションの設定を行うダイアログ。
  span(slot="footer", class="dialog-footer")
    el-button(@click="close") 閉じる
    el-button(type="primary", @click="close") 確定
</template>

<script lang="coffee">
export default
  props: ['configDialogVisible']
  methods:
    close: -> this.$emit('close')
</script>

<style lang="sass" scoped>
</style>
