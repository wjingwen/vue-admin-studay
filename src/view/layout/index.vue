<template>
  <div class="app-wrapper">
    <header-bar></header-bar>
    <sidebar></sidebar>
    <div class="main-container">
      <tabs-view></tabs-view>
      <tab-bread></tab-bread>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/components/header'
  import Sidebar from './sidebar/sidebar'
  import TabsView from './sidebar/tabs-view'
  import AppMain from './sidebar/app-main'
  import TabBread from './sidebar/tab-bread'
  export default{
    components:{
      HeaderBar,
      Sidebar,
      TabsView,
      AppMain,
      TabBread
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped lang="stylus">
  .app-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    .main-container {
      padding-left: 201px;
      padding-top: 61px;
    }
  }
</style>
