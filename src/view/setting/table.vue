<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" label-width="80px" style="margin-top: 20px;">
      <el-form-item  label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item  label="日期">
        <el-date-picker v-model="form.date"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date" show-overflow-tooltip
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name" show-overflow-tooltip
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address" show-overflow-tooltip
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          form:{
            name:'',
            date:''
          }
        }
      }
    }
</script>

<style scoped>
</style>
