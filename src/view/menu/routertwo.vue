<template>
  <div>
    <p>省市区联动</p>
    <div>
      <el-select v-model="province" placeholder="请选择省" @change="GetCity">
         <el-option v-for="item in provincelist" :key="item.id"  :label="item.value" :value="item.id"> </el-option>
      </el-select>
      <el-select v-model="city" placeholder="请选择市" @change="GetErea">
         <el-option v-for="item in cityAll" :key="item.id"  :label="item.value" :value="item.id"> </el-option>
      </el-select>
      <el-select v-model="area" placeholder="请选择区">
         <el-option v-for="item in areaAll" :key="item.id"  :label="item.value" :value="item.id"> </el-option>
      </el-select>
    </div>
    <el-divider content-position="left"></el-divider>
    <div>
      <el-cascader v-model="cascaderCity" :options="provincelist" :props="propslist" ></el-cascader>
    </div>
  </div>
</template>

<script>
  import { choseAddress , GetAddressMap} from '@/common/City/'
  export default{
    data(){
      return{
        province:'',
        provincelist:[],
        cityAll:[],
        areaAll:[],
        city:'',
        area:'',
        cascaderCity:'',
        propslist:{
          value:'value',
          label:'value'
        }
      }
    },
    mounted() {
      let self = this
      GetAddressMap(self)
    },
    methods:{
      GetCity:function(e){
        this.city = ''
        this.cityAll = []
        this.area = ''
        this.areaAll = []
        let self = this
        choseAddress(self,0,e)
      },
      GetErea:function(e){
        this.area = ''
        this.areaAll = []
        let self = this
        choseAddress(self,1,e)
      },
    }
  }
</script>

<style scoped>
</style>
