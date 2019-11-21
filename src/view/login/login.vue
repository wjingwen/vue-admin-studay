<template>
  <div style="margin-top: 8%;">
    <h2 style="text-align: center;">后台管理系统登录</h2>
    <el-form :model="LoginForm" :rules="rulesLogin" ref="LoginForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model.lazy="LoginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="LoginForm.password" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item label="记住密码">
        <el-switch v-model="LoginForm.remoberpass"> </el-switch>
      </el-form-item>
      <el-form-item style="text-align: center;" label-width="0px">
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default{
    data(){
      return{
        LoginForm:{
          username:'',
          password:'',
          avatar:'../static/image/avatar/0.jpg',
          permissions:1,
          remoberpass:false,
        },
        rulesLogin:{
          username:[
            {required:true,message:'请输入账号',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ]
        },
      }
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      submitForm(){
        this.$refs['LoginForm'].validate((valid) => {
          if (valid) {
            if(this.LoginForm.username == 'admin'){
               this.LoginForm.permissions = 1
            }else{
               this.LoginForm.permissions = 2
            }
            sessionStorage.setItem('UserInfo', JSON.stringify(this.LoginForm))
            this.login(this.LoginForm)
            let permissions = this.LoginForm.permissions
             //防止第一次进入无法进行获取正确的权限
              this.$store.dispatch('GenerateRoutes', { permissions })
              this.$router.addRoutes(this.$store.getters.addRouters)
              this.$router.push({ path: '/' })
          }else{
            this.$message.error('请输入正确的登录信息');
          }
        });
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .el-form{box-shadow:0 0 12px #c7c7c7;width: 500px;margin: 0 auto;}
  .el-form .el-input input{width: 90%;}
  .demo-ruleForm{padding:55px 20px;}
</style>
