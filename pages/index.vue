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
  created: ->
    @$store.dispatch('folders/findAll')
</script>

<style lang="sass" scoped>
article
  // min-height: 100vh
  // min-width: 100vh
  display: flex

.color-test
  color: $color-blue
</style>
