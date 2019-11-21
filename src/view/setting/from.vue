<template>
  <el-row :gutter="20" style="margin: 20px 0 0 0;">
    <el-col :span="10" :push="1"><div class="grid-content bg-purple">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="demo-ruleForm">
      <el-form-item label="添加标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="选择文章类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择文章类型">
          <el-option label="小说" value="1"></el-option>
          <el-option label="文学" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间" prop="startdate">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startdate" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="结束日期" v-model="form.enddate" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="是否隐藏" prop="isshow">
        <el-switch v-model="form.isshow"></el-switch>
      </el-form-item>
      <el-form-item label="文章类型" prop="typetitle">
        <el-checkbox-group v-model="form.typetitle">
          <el-checkbox label="篮球" name="type"></el-checkbox>
          <el-checkbox label="美食" name="type"></el-checkbox>
          <el-checkbox label="旅游" name="type"></el-checkbox>
          <el-checkbox label="美图" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否收费" prop="isfree">
        <el-radio-group v-model="form.isfree">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="评分" prop="startgrade">
        <el-rate style="margin: 10px 0 0 0;" v-model="form.startgrade" :allow-half="true"  show-score  text-color="#ff9900" score-template="{value}"></el-rate>
      </el-form-item>
      <el-form-item label="简述" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item label-width="0" style="text-align: center;">
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    </div></el-col>
  </el-row>
</template>

<script>
   export default {
      data() {
        return {
          form: {
            title: '',
            type: '',
            startdate: '',
            startgrade:0,
            enddate: '',
            isshow: false,
            typetitle: [],
            isfree: '',
            describe: ''
          },
          rules:{
            title:[
              {'required':true,'message':'请输入标题', trigger: 'blur'},
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
        onSubmit() {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$message.success('success')
            } else {
              this.$message.error('error')
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
</style>
