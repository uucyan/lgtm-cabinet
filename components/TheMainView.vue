<template lang="pug">
el-container
  main-view-folder-management(v-show="selectedMenu == 'folderManagement'")
  main-view-config(v-show="selectedMenu == 'config'")
  main-view-image-list(v-show="selectedMenu == 'folder'")
  el-main.wood-grain-white.z-index-0(v-show="selectedMenu == ''")
</template>

<script lang="coffee">
import MainViewImageList from '~/components/main/MainViewImageList.vue'
import MainViewFolderManagement from '~/components/main/MainViewFolderManagement.vue'
import MainViewConfig from '~/components/main/MainViewConfig.vue'

export default
  name: 'MainView'
  computed:
    selectedMenu: -> @$store.state.state.selectedMenu
  components:
    'main-view-image-list': MainViewImageList
    'main-view-folder-management': MainViewFolderManagement
    'main-view-config': MainViewConfig
</script>

<style lang="sass" scoped>
</style>
