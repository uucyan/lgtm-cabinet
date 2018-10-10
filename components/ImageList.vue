<template lang="pug">
section
  ul.itemlist.cf
    li(v-for="image in images")
      img(
        :src="image",
        width='300',
        height='200'
      )
</template>

<script lang="coffee">
export default
  name: 'ImageList'
  # data: ->
  #   images: [
  #     { path: "@/assets/img/logo.png" },
  #     { path: '@/assets/img/logo.png' },
  #     { path: '@/assets/img/logo.png' },
  #     { path: '@/assets/img/logo.png' },
  #     { path: '@/assets/img/logo.png' },
  #     { path: '@/assets/img/logo.png' }
  #   ]
  computed:
    images: -> @$store.state.folders.images
  methods:
    requireImg:(imgPath) ->
      require("@/assets/img/logo.png")
</script>

<style lang="sass" scoped>
section
  width: 100%
  height: 100vh
  overflow-y: auto
  padding: 20px

//- ul
//-   // width: auto
//-   padding: 0
//-
//- li
//-   margin: 10px
//-   float: left
//-   list-style: none
//-
//- .image
//-   width: 35vh
//-   // display: block

.itemlist
  max-width: 1024px
  margin: 0 auto
  li
    list-style: none
    float: left
    width: 33.333333%
    padding: 10px
    &:nth-child(3n+1)
      clear: left
  img
    width: 100%
    height: auto

@media screen and (max-width: 767px)
  .itemlist li
    width: 50%
    &:nth-child(2n+1)
      clear: left
    &:nth-child(3n+1)
      clear: none

@media screen and (max-width: 414px)
  .itemlist li
    width: 100%
    &:nth-child(2n+1)
      clear: none
</style>
