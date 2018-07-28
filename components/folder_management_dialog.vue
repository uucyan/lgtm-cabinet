<template lang="pug">
el-dialog(title="フォルダ管理", :visible.sync="folderManagementDialogVisible", width="50%", :before-close="close")
  span ここに画像フォルダの一覧を表示する。
  br
  span 画像フォルダの追加や削除はこのダイアログから行う。
  span(slot="footer", class="dialog-footer")
    el-button(@click="close") 閉じる
    el-button(type="primary", @click="close") 確定
</template>

<script lang="coffee">
export default
  props: ['folderManagementDialogVisible']
  methods:
    close: -> this.$emit('close')
</script>

<style lang="sass" scoped>
</style>
