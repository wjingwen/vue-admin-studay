<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadcrumblist" :key="index">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        breadcrumblist:[]
      }
    },
    watch:{
      $route() {
        if(this.$route.path == '/admin'){
           this.breadcrumblist = []
        }else{
           this.breadcrumblist = this.$route.matched
        }
      },
    },
    created() {
       if(this.$route.path == '/admin'){
          this.breadcrumblist = []
       }else{
          this.breadcrumblist = this.$route.matched
       }
    }
  }
</script>

<style scoped>
  .breadcrumb{margin: 10px;}
</style>
