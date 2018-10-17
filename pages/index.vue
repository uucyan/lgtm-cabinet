<template lang="pug">
article
  the-sidebar
  image-list
</template>

<script lang="coffee">
import TheSidebar from '~/components/TheSidebar.vue'
import ImageList from '~/components/ImageList.vue'

export default
  name: 'Index'
  components:
    'the-sidebar': TheSidebar
    'image-list': ImageList
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
