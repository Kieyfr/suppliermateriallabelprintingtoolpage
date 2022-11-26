<template>
  <div id="order">
    <el-table :data="getPrintSheet" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column type="selection" width="55" />
      <el-table-column prop="suppshortname" sortable label="供应商简称" width="200"/>
      <el-table-column prop="matername" sortable label="物料名称" width="200" />
      <el-table-column prop="vbillcode" sortable label="订单号" width="200"/>
      <el-table-column prop="supplotnum" sortable label="商厂批号" width="200"/>
    </el-table>
  </div>
</template>

<style lang="scss">
  #order{
    width: 905px;
  }
</style>

<script lang="ts" setup>
import { GetPrintSheet } from '../types/index'
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getPrintSheetsApi } from '../api/getPrintSheets'

var getPrintSheet: GetPrintSheet[] =reactive([]);

onMounted(()=>{
    getPrintSheetsApi().then((res) => {
        if(res.state=='200'){
            getPrintSheet.push(...res.data)
            console.log(getPrintSheet) 
        }else if(res.state=='500'){
            ElMessage.error('获取失败')
        }
    }) ;
})
</script>
