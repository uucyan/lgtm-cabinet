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
    div.button-area
      el-button(
        v-if="windowWidthSize > 675"
        icon='el-icon-info'
        class="button"
        @click="showDescriptionDialog()"
        round
      ) 使い方
      el-button(
        v-else
        icon='el-icon-info'
        class="button-mini"
        @click="showDescriptionDialog()"
        circle
      )
      a(href="https://github.com/uucyan/lgtm-cabinet" target="_blank")
        el-button(
          v-if="windowWidthSize > 675"
          class="button"
          style="margin-left: 10%"
          round
        )
          img(src="~assets/img/github.png" class="github-icon")
          span.github-text GitHub
        el-button(
          v-else
          class="button-mini"
          style="margin-left: 20%"
          circle
        )
          img(src="~assets/img/github.png" class="github-icon")
  description-dialog
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"
import DescriptionDialog from '~/components/dialog/DescriptionDialog.vue'

export default
  name: 'MainViewFolderTop'
  mixins: [ HandleResizeMixin ]
  methods:
    showDescriptionDialog:() -> @$store.commit('state/descriptionDialogVisible', true)
  components:
    'description-dialog': DescriptionDialog
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

.button-area
  margin-top: 50px

.button
  background: #744d30
  color: #fff
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5))
  font-size: 20px
  width: 150px
  height: 45px

.button-mini
  background: #744d30
  color: #fff
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5))
  font-size: 20px
  width: 60px
  height: 60px

.github-icon
  display: inline-block
  width: 20px
  height: 20px
  vertical-align: middle
  margin-bottom: 4px

.github-text
  display: inline
  margin-left: 5px
</style>
