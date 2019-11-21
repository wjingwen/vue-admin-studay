<template>
  <el-menu
    mode="vertical"
    class="left-sidebar"
    unique-opened
    background-color=""
    :collapse="isCollapse" :default-active="activeindex">
    <sidebar-item v-for="(router,index) of routers" :key="router.path" :item="router" :base-path="router.path"></sidebar-item>
  </el-menu>
</template>
<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebar-item'
  export default {
    name: 'SideBar',
    components: {
      SidebarItem
    },
    data() {
      return {
        isCollapse: false,
      }
    },
    computed: {
      ...mapGetters([
        'routers'
      ]),
      activeindex(){
        if(this.$route.path){
          return this.$route.path
        }else{
          return '/admin'
        }
      }
    },
  }
</script>
<style lang="stylus">
.left-sidebar
  position fixed
  top 56px
  width 200px
  height 100%
  min-height 500px
  overflow auto
</style>
