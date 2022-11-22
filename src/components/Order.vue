<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 60%"
    highlight-current-row
    @selection-change="handleSelectionChange"
    @current-change="clickCurrentChange"
    max-height="280"
  >
    <el-table-column type="index" width="50" />
    <el-table-column type="selection" width="55" />
    <el-table-column property="date" s  ortable label="供应商简称" width="120"/>
    <el-table-column property="name" sortable label="物料名称" width="120" />
    <el-table-column property="address" sortable label="订单号" />
    <el-table-column property="address" sortable label="商厂批号" />
    
  </el-table>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const multipleSelection = ref<Orders[]>([])
const currentRow = ref()
interface Orders {
  date: string
  name: string
  address: string
}

const handleSelectionChange = (val: Orders[]) => {
  multipleSelection.value = val
  
}
//选中后触发事件
const clickCurrentChange = (val: Orders | undefined) => {
  currentRow.value = val
  console.log(val)
  //val是获取后行的数据
  
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
    date: '2017-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2018-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
