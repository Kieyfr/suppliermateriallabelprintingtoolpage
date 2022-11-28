<template>
  <div id="order">
    <el-table :data="getPrintSheet" style="width: 850px" height="240px" @row-click="selPrintHistory">  
      <el-table-column type="index" width="50" />
      <el-table-column prop="suppshortname" sortable label="供应商简称" width="200"/>
      <el-table-column prop="matername" sortable label="物料名称" width="200" />
      <el-table-column prop="vbillcode" sortable label="订单号" width="200"/>
      <el-table-column prop="supplotnum" sortable label="商厂批号" width="200"/>
    </el-table>
    <Record :selectPK_ORDER_B="selectPK_ORDER_B" :key="selectPK_ORDER_B"></Record>
  </div>
</template>

<script lang="ts" setup>
import { GetPrintSheet, PrintSheet } from '../types/index'
import { onMounted, reactive ,ref} from 'vue'
import { ElMessage } from 'element-plus'
import { getPrintSheetsApi } from '../api/getPrintSheets'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import Record from "../components/Record.vue"

const msg= ref('')

var getPrintSheet: GetPrintSheet[] =reactive([]);

let selectPK_ORDER_B = ''

const selPrintHistory=(row:PrintSheet)=>{
  selectPK_ORDER_B=row.PK_ORDER_B
}

const addPrintHistory=(row:PrintSheet)=>{
    const param={
      PK_ORDER: row.pk_ORDER,            //采购订单主键
      PK_ORDER_B: row.pk_ORDER_B,          //采购订单明细主键
    }
    addPrintHistoryApi(param).then((res) => {
        if(res.state=='200'){
            getPrintSheet.push(...res.data)
        }else if(res.state=='500'){
            ElMessage.error('获取失败')
        }
    }) ;

}

onMounted(()=>{
    getPrintSheetsApi().then((res) => {
        if(res.state=='200'){
            getPrintSheet.push(...res.data)
        }else if(res.state=='500'){
            ElMessage.error('获取失败')
        }
    }) ;
})
</script>

<style lang="scss">
  // #order{
  //   width: 905px;
  // }
</style>