<template>
    <div id="record">
        <!-- <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @current-change="clickCurrentChange"
            @cell-contextmenu="cellcontextmenu"
            max-height="350"
            @contextmenu.prevent.native="openMenu($event)"
            > -->
          <el-table
            :data="showPrintHistorys"
            style="width: 100%"
            max-height="350"
            >
            <el-table-column type="index" width="50" />
            <el-table-column property="matername" sortable label="物料名称" />
            <el-table-column property="suppmatercode" sortable label="供应商料号" />
            <el-table-column property="producedate" sortable label="生产日期" />
            <el-table-column property="lotnum" sortable label="批号" />
            <el-table-column property="netweight" sortable label="净重" />
            <el-table-column property="grossweight" sortable label="毛重" />
            <el-table-column property="supplotnum" sortable label="供应商批号" />
            <el-table-column property="matermaterialspec" sortable label="物料规格" />
            <el-table-column property="matermaterialtype" sortable label="物料颜色" />
            <el-table-column property="printdate" sortable label="打印日期" />
        </el-table> 
    </div>
    
    <!-- <ul class="custom-contextmenu" ref="customContextMenu">
      <li @click="handlePrintClick()">打印</li>
      <li @click="handleDeleteClick()">删除</li>
    </ul> -->
  </template>
<script lang="ts" setup>
import {  watch ,reactive,ref} from 'vue';
import { selPrintHistoryApi } from '../api/selPrintHistory'
import { ShowPrintHistory } from '../types/index'


const props = defineProps({
    selectPK_ORDER_B: String
})

var showPrintHistorys : ShowPrintHistory[]=reactive([]);

watch(
  () => props.selectPK_ORDER_B,
  (count, prevCount) => {
    selPrintHistory()
    
  }
)
 const selPrintHistory=()=>{
    const param={
      PK_ORDER_B: props.selectPK_ORDER_B          //采购订单明细主键
    }
    selPrintHistoryApi(param).then((res) => {
      if(res.state=='200'){
        showPrintHistorys.length = 0
        showPrintHistorys.push(...res.data)
      }
    }) ;
}

</script>
  
<style lang="scss">
   
</style>