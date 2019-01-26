<template lang="pug">
article
  the-sidebar
  the-main-view
</template>

<script lang="coffee">
import TheSidebar from '~/components/TheSidebar.vue'
import TheMainView from '~/components/TheMainView.vue'

export default
  name: 'Index'

  components:
    'the-sidebar': TheSidebar
    'the-main-view': TheMainView

  computed:
    config: -> @$store.state.config.config

  created: ->
    @$store.dispatch('config/find', false)
    setTimeout(@findAllFolders, 500)

  methods:
    findAllFolders: ->
      @$store.dispatch('folders/findAll', {config: @config, isUpdate: false})
</script>

<style lang="sass" scoped>
article
  // min-height: 100vh
  // min-width: 100vh
  display: flex

.color-test
  color: $color-blue
</style>
