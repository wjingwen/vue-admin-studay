<template>
  <el-upload :action="UploadImgUrl" :disabled="disabled" :headers="headerstoken" :on-success="successfile"
    :show-file-list="false" accept="image/png,image/gif,image/jpg,image/jpeg" class="avatar-uploader">
    <div v-if="imageUrl" class="hoverstyle">
      <b @click="removeimg" class="el-icon-delete delectico"></b>
      <img width="200" height="200" :src="imageUrl" class="avatar">
    </div>
    <div v-else @click="Undisabled">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<script>
  import { UploadImgUrl } from '@/api/ApiConfig'
  export default{
    data(){
      return{
        headerstoken:{},
        disabled:false,
        UploadImgUrl: '',
        imageUrl: '',
      }
    },
    methods:{
      successfile(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.disabled = true
        this.$emit('getFormImg', res.message[0])
      },
      removeimg() {
        this.imageUrl = ''
        this.$emit('getFormImg', '')
      },
      Undisabled() {
        this.disabled = false
      }
    },
    mounted(){
      this.UploadImgUrl = UploadImgUrl()
    }
  }
</script>

<style scoped lang="stylus">
  .avatar-uploader
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden
    width 200px
    height 200px
    text-align center
    line-height 200px
  .hoverstyle:hover
    position relative
  .delectico
    position absolute
    right 10px
    top 10px



</style>
