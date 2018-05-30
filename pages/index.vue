<template lang="pug">
section.container
  div
    img(width='256', src='~/assets/img/logo.png')
    h1 lgtm-cabinet
    h2 Nuxt + Electron
    p {{ helloWorld }}
    a.btn.btn-primary(href='https://nuxtjs.org/', target='_blank') Documentation
    a.btn.btn-primary(href='https://github.com/nuxt/nuxt.js', target='_blank') GitHub
    a.btn.btn-secondary(href='https://electronjs.org/', target='_blank') Electron
    a.btn.btn-secondary(href='https://github.com/electron-userland/electron-builder', target='_blank') Electron Builder
</template>

<script lang="coffee">
export default
  name: 'index'
  data: ->
    helloWorld: 'はろーわーるど！'
</script>

<style scoped lang="sass">
.container
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.btn
  margin: 0 8px
</style>
