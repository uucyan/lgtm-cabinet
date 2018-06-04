<template lang="pug">
article
  sidebar
  p.color-test {{ helloWorld }}
</template>

<script lang="coffee">
import Sidebar from '~/components/sidebar.vue'
export default
  name: 'index'
  data: ->
    helloWorld: 'はろーわーるど！'
  components:
    'sidebar': Sidebar
</script>

<style lang="sass" scoped>
article
  min-height: 100vh
  min-width: 100vh
  display: flex

.color-test
  color: #cf2d3a
</style>
