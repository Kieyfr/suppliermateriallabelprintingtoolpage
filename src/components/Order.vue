<template>
  <div id="order">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @current-change="clickCurrentChange"
      max-height="350"
    >
      <el-table-column type="index" width="50" />
      <el-table-column type="selection" width="55" />
      <el-table-column property="SHORTNAME" s  ortable label="供应商简称" width="200"/>
      <el-table-column property="MATERNAME" sortable label="物料名称" width="200" />
      <el-table-column property="VBILLCODE" sortable label="订单号" />
      <el-table-column property="SUPPLOTNUM" sortable label="商厂批号" />
      
    </el-table>
  </div>
  
</template>

<script lang="ts" setup>

import { ref ,reactive,computed} from 'vue'
import {useStore,mapState } from 'vuex'

const multipleSelection = ref<Orders[]>([])
const currentRow = ref()
interface Orders {
  SHORTNAME: string//供应商简称
  MATERNAME: string//物料名称
  VBILLCODE: string//订单号
  SUPPLOTNUM:string//供应商批号
}
let orders=[];
let order={
  SHORTNAME: "",
  MATERNAME: "",
  VBILLCODE: "",
  SUPPLOTNUM:""
}
const emit=defineEmits(['clickCurrentChange','handleSelectionChange'])

//获取公用数据
const store = useStore()
const state = store.state

//更改复选框事件
const handleSelectionChange = (val: Orders[]) => {
  // multipleSelection.value = val
  orders=val
  store.commit("modOrders",orders)
}

    

//选中后触发事件
const clickCurrentChange = (val: Orders ) => {
  // currentRow.value = val
  order=val;
  store.commit("modOrder",order)
}
const filterTag = (value: string, row: Orders) => {
  console.log(value)

  // if(value == "全部"){
  //   return row.date
  // }
  // else if(value == "自定义"){
  //   return row.date
  // }
  // else if(value == "空白"){
  //   if(row.date == "" || row.date == null){
  //     return row.date
  //   }
  // }
  // else if(value == "无空白"){
  //   return row.date
  // }
  // return row.date.indexOf(value) != -1
}
const tableData: Orders[] = [
  {
    SHORTNAME: '帆帆',
    MATERNAME: 'Tom',
    VBILLCODE: '24211421421414',
    SUPPLOTNUM:"24325325325"
  },
  {
    SHORTNAME: '帆帆adaa',
    MATERNAME: 'Tom',
    VBILLCODE: '24211421421414',
    SUPPLOTNUM:"24325325325"
  },
]
</script>
