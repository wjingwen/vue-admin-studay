<template>
  <el-upload :action="uploadurl" list-type="picture-card" :on-remove="handleRemove" :on-success="successhandle">
    <i slot="default" class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import { UploadImgUrl } from '@/api/ApiConfig'
  export default{
    data(){
      return{
        uploadurl:"",
        urlstrings:''
      }
    },
    methods:{
      successhandle(response,file,fileList){
        this.urlstrings = this.urlstrings+'#'+response.message[0]
        console.log(this.urlstrings)
        this.$emit('getImgs', this.urlstrings)
      },
      handleRemove(file,fileList){
        if(this.urlstrings){
          let urlarr = this.urlstrings.split('#')
          urlarr.forEach(function(e,index){
            if(e==file.response.message[0]){
               urlarr.splice(index, 1);
            }
          })
          this.urlstrings = urlarr.join("#")
          this.$emit('getImgs', this.urlstrings)
        }
      }
    },
    mounted() {
      this.uploadurl = UploadImgUrl()
    }
  }
</script>

<style scoped lang="stylus">
</style>
