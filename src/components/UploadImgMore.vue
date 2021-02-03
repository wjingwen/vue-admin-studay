<template>
  <el-upload :id="currentID" name="files" :disabled="disabled" :file-list="keyUrlimg" :action="uploadurl" :limit="imglimit" list-type="picture-card" :on-remove="handleRemove" :on-success="successhandle">
    <i slot="default" class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import { UploadImgUrl } from '@/api/ApiConfig'
  export default{
    props: {
       userkeyistring: {  //图片多个key拼接的字符串。用于图片修改
          type: String
       },
       keyUrlimg:{//{'name':'','url':''}用户图片展示
         type:Array
       },
       disabled:{
         type:Boolean,
         default:false
       },
       classID:{
         type: String,
         default:'el-upload'
       }
    },
    data(){
      return{
        uploadurl:"",
        imglimit:6,
        urlstrings:this.userkeyistring,
        currentID:this.classID
      }
    },
    methods:{
      successhandle(response,file,fileList){
        const dom = document.getElementById(this.currentID).getElementsByClassName('el-upload')[0]
        if(this.urlstrings){
          this.urlstrings = this.urlstrings+'#'+response.data[0]
        }else{
          this.urlstrings = response.data[0]
        }
        this.$emit('getImgs', this.urlstrings)
        let number = this.urlstrings.split('#')
        if(this.urlstrings && number.length>=this.imglimit){
          dom.style.display = 'none'
        }else{
          dom.style.display = 'inline-block'
        }
      },
      handleRemove(file,fileList){
        const dom = document.getElementById(this.currentID).getElementsByClassName('el-upload')[0]
        if(this.urlstrings){
          let urlarr = this.urlstrings.split('#')
          urlarr.forEach(function(e,index){
            if(file.response){
              if(e==file.response.data[0]){
                urlarr.splice(index, 1);
              }
            }else{
              if( e==file.name){
                urlarr.splice(index, 1);
              }
            }
          })
          this.urlstrings = urlarr.join("#")
          this.$emit('getImgs', this.urlstrings)
        }
        dom.style.display = 'inline-block'
      }
    },
    mounted() {
      this.uploadurl = UploadImgUrl()
    }
  }
</script>

<style scoped lang="stylus">
</style>
