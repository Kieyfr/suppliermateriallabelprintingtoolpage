<template>
  <div id="material">
    <div id="search">
      <input type="text" v-model="input"/>
      <button type="button">搜索</button>
    </div>
    <el-divider />
    <div class="materialtable">
      <el-table
        ref="singleTableRef"
        :data="tableData"
        highlight-current-row
        style="width: 100%;height: 300px;"
        @current-change="handleCurrentChange"
      >
        <el-table-column property="VBILLCODE" label="订单号" width="150" />
        <el-table-column property="MATERCODE" label="新亚物料编码" width="150" />
        <el-table-column property="MATERNAME" label="物料名称" width="150"/>
        <el-table-column property="MATERMATERIALSPEC" label="绞距" />
        <el-table-column property="MATERMATERIALTYPE" label="颜色"  />
      </el-table>
    </div>
    <el-divider />
    <div class="clear">
      <button type="button" @click="clear">关闭</button>
    </div>
    
  </div>
</template>

<style lang="scss">
  #material{
    width: 650px;
    margin: auto;
    #search{
      margin-top: 10px;
      input{
      width: 450px;
      margin-left: 0px;
      }
      button{
        width: 80px;
        margin-left: 10px;
      }
    }
    .materialtable{
      height: 300px;
    }
    .clear{
      width: 100%;
      padding: 0%;
      text-align: right;
      button{
        width: 80px;
        margin-right: 20px;
      }
    }
  }
</style>
<script lang="ts" setup>



import { ref ,defineExpose,provide } from 'vue'
import { reactive } from "vue";
import {defineProps,defineEmits} from 'vue'

import { ElTable } from 'element-plus'
import { pa } from 'element-plus/es/locale';
const input = ref('')

interface Materials {
  VBILLCODE: string//订单号
  MATERCODE: string//物料编码
  MATERNAME: string//物料名称
  MATERMATERIALSPEC: string//物料规格
  MATERMATERIALTYPE: string//物料颜色
}






const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

const setCurrent = (row?: Materials) => {
  singleTableRef.value!.setCurrentRow(row)
}

const  material=reactive({
  VBILLCODE: "",
  MATERCODE: "",
  MATERNAME: "",
  MATERMATERIALSPEC: "",
  MATERMATERIALTYPE: "",
});
const emit=defineEmits(['clickMaterial','clear'])
const clickMaterial=()=>{
  let param=material
  emit('clickMaterial',param)
}
const clear = () => {
  let gb=false
  emit('clear',gb)

}
const handleCurrentChange = (val: Materials) => {
 
  material.VBILLCODE=val.VBILLCODE;
  material.MATERCODE=val.MATERCODE;
  material.MATERNAME=val.MATERNAME;
  material.MATERMATERIALSPEC=val.MATERMATERIALSPEC;
  material.MATERMATERIALTYPE=val.MATERMATERIALTYPE;
  clickMaterial()
  clear()
}




const tableData: Materials[] = [
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  {
    VBILLCODE: '242342342343242',
    MATERCODE: '12423424243',
    MATERNAME: 'MG80017U-105',
    MATERMATERIALSPEC:'23',
    MATERMATERIALTYPE:""
  },
  
]
</script>
