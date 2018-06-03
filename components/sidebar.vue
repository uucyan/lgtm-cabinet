<template lang="pug">
el-menu.el-menu-vertical-demo(default-active='2', @open='handleOpen', @close='handleClose', background-color='#545c64', text-color='#fff', active-text-color='#ffd04b')
  el-submenu(index='1')
    template(slot='title')
      i.el-icon-location
      span Navigator One
    el-menu-item-group(title='Group One')
      el-menu-item(index='1-1') item one
      el-menu-item(index='1-2') item one
    el-menu-item-group(title='Group Two')
      el-menu-item(index='1-3') item three
    el-submenu(index='1-4')
      template(slot='title') item four
      el-menu-item(index='1-4-1') item one
  el-menu-item(index='2')
    i.el-icon-menu
    span Navigator Two
  el-menu-item(index='3', disabled='')
    i.el-icon-document
    span Navigator Three
  el-menu-item(index='4')
    i.el-icon-setting
    span Navigator Four
  el-menu-item(index='5')
    i.el-icon-setting
    span Navigator Four
  el-menu-item(index='6')
    i.el-icon-setting
    span Navigator Four aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  el-menu-item(index='7')
    i.el-icon-setting
    span Navigator Four
  el-menu-item(index='8')
    i.el-icon-setting
    span Navigator Four
</template>

<script lang="coffee">
</script>

<style scoped lang="sass">
ul
  width: 250pX
  height: 100vh
  overflow-y: auto

li
  overflow-x: auto

ul li::-webkit-scrollbar
  display: none
</style>
