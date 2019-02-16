<template lang="pug">
article
  the-sidebar
  main-view
</template>

<script lang="coffee">
import TheSidebar from '~/components/TheSidebar.vue'
import MainView from '~/components/MainView.vue'

export default
  name: 'Index'

  components:
    'the-sidebar': TheSidebar
    'main-view': MainView

  computed:
    config: -> @$store.state.config.config

  created: ->
    @$store.dispatch('config/find', false)
    @$store.dispatch('folders/findAll', {config: @config, isUpdate: false})
</script>

<style lang="sass" scoped>
article
  display: flex
</style>
