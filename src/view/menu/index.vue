<template>
  <div class="boday">
    <!-- 杯子帽子 -->
    <div class="cup-cap"></div>
    <!-- 杯盖 -->
    <div class="cup-top"></div>
    <!-- 杯身 -->
    <div class="cup-body"></div>
    <!-- 盘子 -->
    <div class="cup-bottom"></div>
    <!-- 杯把 -->
    <div class="cup-right"></div>
  </div>
</template>

<script>
</script>

<style scoped>
  .boday{
    position: relative;
  }
  .cup-cap{
    width: 20px;
    height: 20px;
    border: 1px solid #eaeaea;
    position: absolute;
    left: 240px;
  }
  .cup-top{
    width: 300px;
    height: 20px;
    border: 1px solid #EAEAEA;
    position: absolute;
    left: 100px;
  }
  .cup-body{
    width: 300px;
    height:200px;
    border: 1px solid #EAEAEA;
    position: absolute;
    left: 100px;
  }
  .cup-bottom{
    width: 500px;
    height: 10px;
    border: 1px solid #EAEAEA;
    position: absolute;
    bottom: 0px;
  }
  .cup-right{
    width: 50px;
    height: 100px;
    border: 1px solid #EAEAEA;
    position: absolute;
    right: 0px;
  }
</style>
