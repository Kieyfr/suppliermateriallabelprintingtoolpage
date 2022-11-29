<template>
  <div id="order">
      <el-table 
      :data="getPrintSheet" 
      style="width: 850px" 
      height="240px" 
      @row-click="selPrintHistory" 
      @row-dblclick="shuangji">  
        <el-table-column type="index" width="50" />
        <el-table-column prop="suppshortname" sortable label="供应商简称" width="200"/>
        <el-table-column prop="matername" sortable label="物料名称" width="200" />
        <el-table-column prop="vbillcode" sortable label="订单号" width="200"/>
        <el-table-column prop="supplotnum" sortable label="商厂批号" width="200"/>
      </el-table>
    <Record :selectPK_ORDER_B="selectPK_ORDER_B" ></Record>
    <Modify v-model:dialogModify="dialogModify" v-model:printSheet="printSheet"></Modify>
  </div>
</template>

<script lang="ts" setup>
import { GetPrintSheet, PrintSheet } from '../types/index'
import { onMounted, reactive ,ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getPrintSheetsApi } from '../api/getPrintSheets'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import Record from "../components/Record.vue"
import Modify from "../components/Modify.vue"

var getPrintSheet: GetPrintSheet[] =reactive([]);

var selectPK_ORDER_B = ref('')

const printSheet: PrintSheet=reactive({
    PK_ORDER:'',            //采购订单主键
    PK_ORDER_B:'',          //采购订单明细主键
    SUPPCODE:'',            //供应商代码
    SUPPNAME:'',            //供应商名称
    SUPPSHORTNAME:'',       //供应商简称
    SUPPMATERCODE:'',       //供应商料号
    SUPPLOTNUM:'',          //供应商批号
    VBILLCODE:'',           //订单号
    MATERCODE:'',           //物料编码
    MATERNAME:'',           //物料名称
    MATERMATERIALSPEC:'',   //物料规格
    MATERMATERIALTYPE:'',   //物料颜色
    PRODUCEDATE: new Date(),         //生产日期
    NETWEIGHT:0.000,        //净重
    GROSSWEIGHT:0.000,      //毛重
    NUM: 0.00,
    PRINT:true             //是否可以打印
})

const dialogModify = ref(false) //修改窗口是否显示

const selPrintHistory=(row:PrintSheet)=>{
  selectPK_ORDER_B.value=row.pk_ORDER_B
}

const shuangji=(row:PrintSheet)=>{
  dialogModify.value=true
  printSheet.PK_ORDER=row.pk_ORDER
  printSheet.PK_ORDER_B=row.pk_ORDER_B
  printSheet.SUPPCODE=row.suppcode
  printSheet.SUPPNAME=row.suppname
  printSheet.SUPPSHORTNAME=row.suppshortname
  printSheet.SUPPMATERCODE=row.suppmatercode
  printSheet.SUPPLOTNUM=row.supplotnum
  printSheet.VBILLCODE=row.vbillcode
  printSheet.MATERCODE=row.matercode
  printSheet.MATERNAME=row.matername
  printSheet.MATERMATERIALSPEC=row.matermaterialspec
  printSheet.MATERMATERIALTYPE=row.matermaterialtype
  printSheet.PRODUCEDATE=row.producedate
  printSheet.NETWEIGHT=row.netweight
  printSheet.GROSSWEIGHT=row.grossweight
  printSheet.NUM=row.num
  printSheet.PRINT=row.print
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
 
</style>