<template lang="pug">
el-container.main
  el-header.wood-grain-dark-brown.z-index-1(height='85px' style='padding: 20px 20px 0px 20px; filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));')
    div.header-element-left
      p.header-title.overflow-x-auto
  el-main.wood-grain-white.z-index-0
    div.display-table.logo-area
      div.logo.display-inline-block
      div.title.display-inline-block
        p LGTM
        p Cabinet
    div.cabinet
      .cube.wood-grain-dark-brown
        el-button.wood-grain-dark-brown(
          icon='el-icon-info'
          class="button"
          @click="showDescriptionDialog()"
          round
        ) はじめに
        .right-side.wood-grain-dark-brown
        .top-side.wood-grain-dark-brown
      .cube.wood-grain-dark-brown
        el-button.wood-grain-dark-brown(
          icon='el-icon-document'
          class="button"
          @click="showReleaseDialog()"
          round
        ) リリース
      .cube.wood-grain-dark-brown
        a(href="https://github.com/uucyan/lgtm-cabinet" target="_blank")
          el-button.wood-grain-dark-brown(
            class="button"
            round
          )
            div.github-icon
            span.github-text GitHub
  description-dialog
  release-Dialog
</template>

<script lang="coffee">
import HandleResizeMixin from "~/components/main/HandleResizeMixin.coffee"
import DescriptionDialog from '~/components/dialog/DescriptionDialog.vue'
import ReleaseDialog from '~/components/dialog/ReleaseDialog.vue'

export default
  name: 'MainViewTop'
  mixins: [ HandleResizeMixin ]
  methods:
    showDescriptionDialog: -> @$store.commit('app/descriptionDialogVisible', true)
    showReleaseDialog: -> @$store.commit('app/releaseDialogVisible', true)
  components:
    'description-dialog': DescriptionDialog
    'release-Dialog': ReleaseDialog
</script>

<style lang="sass" scoped>
.logo-area
  text-align: center
  margin-right: auto
  margin-left: auto
  margin-bottom: 20px

.display-inline-block
  display: inline-block
  text-align: left
  vertical-align: middle
  @media screen and (max-width: 842px)
    text-align: center

.title
  font-family: 'Fredoka One', sans-serif
  font-size: 80px
  color: $color-white
  filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5))

.button
  color: #fff
  font-size: 20px
  width: 150px
  height: 45px

.github-text
  display: inline
  margin-left: 5px

.margin-left-10
  margin-left: 10%

.margin-left-20
  margin-left: 20%

.cabinet
  position: relative
  z-index: -1
  filter: drop-shadow(10px -3px 8px rgba(0,0,0,0.5))

.cube
  padding: 20px
  box-sizing: border-box
  margin-right: auto
  margin-left: auto
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  flex-direction: column
  border-bottom: solid 1px $color-dark-brown
  width: 70%
  height: 200px
  position: relative
  @media screen and (max-width: 842px)
    width: 60%

.top-side
  box-sizing: border-box
  position: absolute
  top: -100px
  left: 100px
  height: 100px
  width: 100%
  transform-origin: 0 0
  transform: skewX(-45deg)
  @media screen and (max-width: 842px)
    top: -70px
    left: 70px
    height: 70px

.right-side
  box-sizing: border-box
  position: absolute
  top: 0px
  right: -100px
  height: 600px
  width: 100px
  transform-origin: 0 0
  transform: skewY(-45deg)
  @media screen and (max-width: 842px)
    right: -70px
    width: 70px
</style>
