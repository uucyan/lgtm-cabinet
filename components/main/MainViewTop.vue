<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto
  el-main.wood-grain-white.z-index-0.main-top
    img(
      src="~assets/img/logo.png"
      class="logo"
    )
    div.title
      p LGTM Cabinet
</template>

<script lang="coffee">
import handleResizeMixin from "~/components/main/handleResizeMixin.coffee"

export default
  name: 'MainViewFolderTop'
  mixins: [ handleResizeMixin ]
</script>

<style lang="sass" scoped>
.main-top
  text-align: center

.logo
  width: 256px
  height: 256px
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5))

.title
  font-family: 'Fredoka One', sans-serif
  font-size: 80px
  color: $color-white
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5))
</style>
