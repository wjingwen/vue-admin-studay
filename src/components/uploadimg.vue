<template>
  <el-upload name="files" :action="UploadImgUrl" :disabled="disabled" :headers="headerstoken" :on-success="successfile"
    :show-file-list="false" accept="image/png,image/gif,image/jpg,image/jpeg" class="avatar-uploader">

    <div v-if="imageUrlShow">
      <div v-if="imageUrlShow || imageUrl" class="hoverstyle" @click="removeimg">
        <img width="80" height="100" :src="imageUrl?imageUrl:imageUrlShow" class="avatar">
      </div>
      <div v-else @click="Undisabled" class="center">
        <i class="el-icon-camera-solid avatar-uploader-icon"></i>
        <p style="margin-top: -2.5rem;font-size: 0.875rem;">上 传</p>
      </div>
    </div>
    <div v-else>
      <div v-if="imageUrl" class="hoverstyle">
        <b @click="removeimg" class="el-icon-delete delectico"></b>
        <img width="80" height="100" :src="imageUrl" class="avatar">
      </div>
      <div v-else @click="Undisabled" class="center">
        <i class="el-icon-camera-solid avatar-uploader-icon"></i>
        <p style="margin-top: -2.5rem;font-size: 0.875rem;">上 传</p>
      </div>
    </div>
  </el-upload>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { UploadImgUrl } from '@/api/ApiConfig'
  export default{
    props: {
      imageUrlShow: {
        type: String,
        default:''
      },
    },
    data(){
      return{
        headerstoken:{
          Authorization:''
        },
        disabled:false,
        UploadImgUrl: '',
        imageUrl:this.imageUrlShow
      }
    },
    methods:{
      successfile(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.disabled = true
        this.$emit('getFormImg', res.data)
      },
      removeimg() {
        this.imageUrl = ''
        this.$emit('getFormImg', '')
      },
      Undisabled() {
        this.disabled = false
      }
    },
    computed:{
      ...mapGetters([
        // 'token',
      ])
    },
    mounted(){
      this.headerstoken.Authorization = ''//this.token
      this.UploadImgUrl = UploadImgUrl()
    },
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
