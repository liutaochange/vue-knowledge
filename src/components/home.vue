<template>
  <div class="home">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'i am home'
    }
  }
}
</script>

<style scoped lang="stylus">
  .home
    font-size: 16px;
    color: hotpink;
</style>

