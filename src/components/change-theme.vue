<template>
<el-dropdown @command="changeTheme">
  <span>
   <svg-icon icon-class="clothes"></svg-icon>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="default">青铜绿</el-dropdown-item>
    <el-dropdown-item command="science-gray">深空灰</el-dropdown-item>
    <el-dropdown-item command="science-blue">深空蓝</el-dropdown-item>
    <el-dropdown-item divided></el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
  // 需要更改颜色的引入
  import '@/assets/css/science-blue.css' // the theme changed version element-ui css
  import '@/assets/css/science-gray.css' // the theme changed version element-ui css
  export default{
    methods:{
      changeTheme(command) {
        document.body.className = command
      }
    }
  }
</script>

<style>
</style>
