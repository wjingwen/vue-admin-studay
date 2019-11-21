<template>
  <div class="main-app">
    <!-- keep-alive缓存机制防止重复刷新DOM include当前指令不会被缓存其他的都会，exclude当前指令会被缓存其他的不会 -->
    <keep-alive include="directive">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    // 组件重复调用
    name: 'app-main',
    data() {
      return {
        desc: '这里是右侧主界面'
      }
    }
  }
</script>

<style scoped lang="stylus">
  .main-app
    padding 5px
    min-width 900px
</style>
