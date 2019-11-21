<template>
  <div>
    <el-input style="width: 350px;"  autosize prefix-icon="el-icon-document" type="text" v-model="filename" placeholder="请输入文件名"></el-input>
    <el-button @click="handleDownload" :loading="downloadLoading" type="primary">下载Excel</el-button>
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
  export default{
    data() {
      return {
        downloadLoading:false,
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
        filename:''
      }
    },
    methods:{
      handleDownload(){
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['日期', '姓名', '地址']
          const filterVal = ['date', 'name', 'address']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename || 'excel-list',
            autoWidth: this.autoWidth
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
    }
  }
</script>

<style scoped>
</style>
