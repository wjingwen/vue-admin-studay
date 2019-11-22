<template>
  <el-row>
    <el-col :span="24">
      <div class="textdiv">
        <div><el-tag type="success">自动获取当前输入框焦点：<input v-focus="true"  /></el-tag></div>
        <div>
          <div><el-tag>判断当前按钮是否显示：</el-tag><el-button @click="isshowfun" type="primary" size="small">点击</el-button></div>
          <div><el-tag type="info" v-isbutton="isshow">显示内容</el-tag></div>
        </div>
      </div>
      <div class="imgdiv">
        <div>
          <el-tag type="danger">组件单图片上传并可以删除</el-tag>
          <div><upload-img @getFormImg="successfile($event,'userhandCardimg')" ></upload-img></div>
        </div>
        <div>
          <el-tag type="warning">组件多图片上传</el-tag>
          <div>
            <upload-more-img @getImgs="successimages($event,'images')"></upload-more-img>
          </div>
        </div>
        <div>
          <el-tag type="info">图片预览</el-tag>
          <div>
            <preview-img :ImageUrl="url" :width="100" :height="100"></preview-img>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  import UploadImg from '@/components/uploadimg'
  import UploadMoreImg from '@/components/UploadImgMore'
  import PreviewImg from '@/components/previewimg'
  export default{
    data(){
      return{
        isshow:false,
        text:'点击显示',
        ruleForm:{
          userhandCardimg:'',
          images:'',
        },
        url:"../../../static/image/avatar/0.jpg"
      }
    },
    components:{
      UploadImg,
      UploadMoreImg,
      PreviewImg
    },
    methods:{
      isshowfun(){
        if(this.isshow){
          this.isshow = false
          this.text = '点击显示'
        }else{
          this.isshow = true
          this.text = '点击隐藏'
        }
      },
      //data子级给父级传的的数据，name需要修改数据的名称
      successfile: function(data, name) {
        this.ruleForm[name] = data
      },
      //上传多张图片
      successimages:function(data,name){
        data = data.substr(1)
        this.ruleForm[name] = data
      }
    }
  }
</script>

<style scoped lang="stylus">
  .textdiv,.imgdiv
    display flex
    flex-direction row
    justify-content space-around
    flex-wrap wrap
    margin-top 50px
  .imgdiv .el-tag
    margin-bottom 10px
</style>
