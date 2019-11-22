<template>
  <div class="privateimg">
    <img :src="ImageUrl" :width="width" :height="height" @click="imgdialog"/>
    <el-dialog :visible.sync="dialogVisible" title="图片预览" width="500px">
      <img width="100%" :src="ImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default{
    props:['ImageUrl','width','height'],
    data(){
      return{
        dialogVisible:false
      }
    },
    methods:{
      imgdialog(){
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>
  .privateimg img{cursor: pointer;display: inline-block;}
  .privateimg .el-dialog__body{text-align: center;}
</style>
