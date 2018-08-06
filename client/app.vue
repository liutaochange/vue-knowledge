<template>
  <div class="main">
    <div class="cover"></div>
    <header-item></header-item>
    <todo></todo>
    <router-view></router-view>
    <footer-item></footer-item>
  </div>
</template>

<script>
import headerItem from './components/header.vue'
import footerItem from './components/footer.jsx'
import todo from './components/todo.vue'
export default {
  data () {
    return {
      text: 'vue project'
    }
  },
  components: {
    headerItem,
    footerItem,
    todo
  }
}
</script>

<style lang="stylus" scoped>
  .main
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    .cover
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      background-color: #999
      opacity: 0.9
      z-index: -1
</style>

