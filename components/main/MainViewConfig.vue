<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto 設定
  el-main.wood-grain-white.z-index-0
</template>

<script lang="coffee">
import handleResizeMixin from "~/components/main/handleResizeMixin.coffee"

export default
  name: 'MainViewFolderConfig'
  mixins: [ handleResizeMixin ]
</script>

<style lang="sass" scoped>
</style>
