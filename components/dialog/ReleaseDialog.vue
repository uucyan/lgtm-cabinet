<template lang="pug">
el-dialog(
  title="リリースノート",
  width="70%",
  :visible.sync="releaseDialogVisible",
  :before-close="close"
)
  el-main(style="height: 400px")
    el-collapse(v-model='activeName', accordion='')
      el-collapse-item(v-for="(notes, index) in ReleaseNote.notes", :key="ReleaseNote.version", :title="ReleaseNote.title(index)", :name="index")
        div.padding-left-10px
          h3 更新内容
          ul
            li(v-for="(update_detail, index) in notes.update_details") {{ update_detail }}

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
import ReleaseNote from "~/components/dialog/ReleaseNote.coffee"

export default
  mixins: [ ChangeStyleMixin ]
  data: ->
    activeName: '1'
    ReleaseNote: new ReleaseNote
  computed:
    releaseDialogVisible: -> @$store.state.app.releaseDialogVisible
  methods:
    close: -> @$store.commit('app/releaseDialogVisible', false)
</script>

<style lang="sass" scoped>
h2
  margin-bottom: 10px

h3
  margin-bottom: 10px

h4
  margin-bottom: 10px

p
  line-height: 1.5

a
  color: $color-dark-brown

ul
  padding: 0.5em 0 0.5em 1.5em

ul.nest
  margin: 0 0 0 1em;
  padding: 0;

ul li
  padding: 0.5em 0

.padding-left-10px
  padding-left: 10px
</style>
