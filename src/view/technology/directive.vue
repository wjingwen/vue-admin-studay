<template>
  <div>
    <div class="title">全局自定义指令</div>
    <p>自动获取当前输入框焦点</p>
    <input v-focus="true"  />
    <p class="magin20">判断当前按钮是否显示</p>
    <input :value="text" type="button" @click="isshowfun"/>
    <div v-isbutton="isshow">显示内容</div>
    <p class="magin20">组件单图片上传并可以删除</p>
    <div><upload-img @getFormImg="successfile($event,'userhandCardimg')" ></upload-img></div>
    <p class="magin20">多图片上传</p>
    <div>
      <upload-more-img @getImgs="successimages($event,'images')"></upload-more-img>
    </div>
  </div>
</template>

<script>
  import UploadImg from '@/components/uploadimg'
  import UploadMoreImg from '@/components/UploadImgMore'
  export default{
    data(){
      return{
        isshow:false,
        text:'点击显示',
        ruleForm:{
          userhandCardimg:'',
          images:''
        }
      }
    },
    components:{
      UploadImg,
      UploadMoreImg
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
  .title
    font-size 16px
    margin-bottom 20px
  .magin20
    margin-top 20px
</style>
