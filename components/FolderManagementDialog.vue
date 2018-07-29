<template lang="pug">
el-dialog(
  title="フォルダ管理",
  :visible.sync="folderManagementDialogVisible",
  width="50%",
  :before-close="close"
)
  el-button(@click="insertFolder") 追加
  el-table(
    :data='folders',
    style='width: 100%',
    max-height="250"
  )
    el-table-column(
      prop='name',
      label='フォルダ名',
      width='180'
    )
    el-table-column(
      prop='path',
      label='パス',
    )
    el-table-column(
      fixed='right',
      label='操作',
      width='120'
    )
      template(slot-scope='scope')
        el-button(
          size='mini',
          type='danger',
          @click='deleteFolder(scope.row)'
        ) Delete
  span(
    slot="footer",
    class="dialog-footer"
  )
    el-button(@click="close") 閉じる
    el-button(
      type="primary",
      @click="close"
    ) 確定
</template>

<script lang="coffee">
export default
  data: ->
    folders: []
  created: ->
    @setFolders()
  props:
    folderManagementDialogVisible: Boolean
  methods:
    close: -> @$emit('close')
    setFolders: ->
      @$db.folders.find {}, ((err, docs) ->
        @folders = docs
      ).bind(this)
    insertFolder: ->
      doc =
        name: 'テストフォルダ'
        path: 'test/img.png'
      @$db.folders.insert doc, (err, newDoc) ->
        console.log('err：' + err)
      @setFolders()
    deleteFolder:(folder) ->
      @$db.folders.remove { _id: folder._id }, {}, (err, numRemoved) ->
        console.log('err：' + err)
      @setFolders()
</script>

<style lang="sass" scoped>
</style>
