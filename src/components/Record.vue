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
            :data="printHistorys"
            style="width: 100%"
            max-height="350"
            >
            <el-table-column type="index" width="50" />
            <el-table-column property="MATERNAME" sortable label="物料名称" />
            <el-table-column property="SUPPMATERCODE" sortable label="供应商料号" />
            <el-table-column property="PRODUCEDATE" sortable label="生产日期" />
            <el-table-column property="LOTNUM" sortable label="批号" />
            <el-table-column property="NETWEIGHT" sortable label="净重" />
            <el-table-column property="GROSSWEIGHT" sortable label="毛重" />
            <el-table-column property="SUPPLOTNUM" sortable label="供应商批号" />
            <el-table-column property="MATERMATERIALSPEC" sortable label="物料规格" />
            <el-table-column property="MATERMATERIALTYPE" sortable label="物料颜色" />
            <el-table-column property="PRINTDATE" sortable label="打印日期" />
        </el-table> 
    </div>
    
    <!-- <ul class="custom-contextmenu" ref="customContextMenu">
      <li @click="handlePrintClick()">打印</li>
      <li @click="handleDeleteClick()">删除</li>
    </ul> -->
  </template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { selPrintHistoryApi } from '../api/selPrintHistory'
import { ShowPrintHistory } from '../types/index'


const props = defineProps({
    selectPK_ORDER_B: String
})

var printHistorys : ShowPrintHistory[]=[];

onMounted(()=>{
    const param={
      PK_ORDER_B: props.selectPK_ORDER_B          //采购订单明细主键
    }
    selPrintHistoryApi(param).then((res) => {
      if(res.state=='200'){
        ShowPrintHistory.push(...res.data)
      }
  }) ;
})
  
  // import { ref } from 'vue'
  
  
  // const multipleSelection = ref<Record[]>([])
  
  // interface Record {
  //   date: string
  //   name: string
  //   address: string
  // }
  
  // const handleSelectionChange = (val: Record[]) => {
  //   multipleSelection.value = val
    
  // }
  // //选中后触发事件
  // const clickCurrentChange = (val: Record | undefined) => {
  //   console.log(val)
  //   //val是获取后行的数据
  // }

  // //右键触发事件
  // const cellcontextmenu=(val:Record)=>{
  //   console.log(val)
  // }


  // //右键弹窗
  // let customContextMenu = ref(null);
  // const openMenu = (e) => {
  //   let top = e.pageY;
  //   let left = e.pageX;
  //   let ele = customContextMenu.value;
  //   ele.style.top = top + 'px';
  //   ele.style.left = left + 'px';
  //   ele.style.display = 'block';
  // };

  // window.addEventListener('click', () => {
  //   let menuElement = customContextMenu.value;
  //   menuElement.style.display = 'none';
  // });

  // //打印触发
  // const handlePrintClick = () => {
  //   console.log("打印")
  // };
  // //删除触发
  // const handleDeleteClick = () => {
  //   console.log("删除")
  // };
</script>
  
<style lang="scss">
    // #record{
        
    // }
    .test-menu {
      width: 200px;
      height: 200px;
      background-color: lightblue;
    }

    .custom-contextmenu {
      z-index: 100;
      border: 1px solid #ccc;
      width: 80px;
      padding: 0;
      list-style: none;
      border-bottom: none;
      position: fixed;
      display: none;
      background-color: #fff;
      li {
        width: 80px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          background-color: skyblue;
        }
      }
    }
</style>