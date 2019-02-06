<template lang="pug">
el-container
  main-view-folder-management(v-show="selectedMenu == 'folderManagement'")
  main-view-config(v-show="selectedMenu == 'config'")
  main-view-image-list(v-show="selectedMenu == 'folder'")
  main-view-the-cat-api(v-if="selectedMenu == 'theCatApi'")
  main-view-the-dog-api(v-if="selectedMenu == 'theDogApi'")
  main-view-top(v-show="selectedMenu == ''")
</template>

<script lang="coffee">
import MainViewTop from '~/components/main/MainViewTop.vue'
import MainViewFolderManagement from '~/components/main/MainViewFolderManagement.vue'
import MainViewConfig from '~/components/main/MainViewConfig.vue'
import MainViewImageList from '~/components/main/MainViewImageList.vue'
import MainViewTheCatApi from '~/components/main/MainViewTheCatApi.vue'
import MainViewTheDogApi from '~/components/main/MainViewTheDogApi.vue'

export default
  name: 'MainView'
  computed:
    selectedMenu: -> @$store.state.state.selectedMenu
  components:
    'main-view-top': MainViewTop
    'main-view-folder-management': MainViewFolderManagement
    'main-view-config': MainViewConfig
    'main-view-image-list': MainViewImageList
    'main-view-the-cat-api': MainViewTheCatApi
    'main-view-the-dog-api': MainViewTheDogApi
</script>

<style lang="sass" scoped>
</style>
