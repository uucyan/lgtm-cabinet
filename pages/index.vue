<template lang="pug">
article
  sidebar
  main-view
</template>

<script lang="coffee">
import Sidebar from '~/components/sidebar.vue'
import Main from '~/components/main.vue'

export default
  name: 'index'
  components:
    'sidebar': Sidebar
    'main-view': Main
</script>

<style lang="sass" scoped>
article
  min-height: 100vh
  min-width: 100vh
  display: flex

.color-test
  color: $color-blue
</style>
