<template lang="pug">
article
  sidebar
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

<style scoped lang="sass">
article
  min-height: 100vh
  min-width: 100vh
  display: flex
</style>
