<template>
    <div id="record">
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @current-change="clickCurrentChange"
            @cell-contextmenu="cellcontextmenu"
            max-height="350"
            @contextmenu.prevent.native="openMenu($event)"
            >
            <el-table-column type="index" width="50" />
            <el-table-column property="date" s  ortable label="新亚物料编号" width="120"/>
            <el-table-column property="name" sortable label="物料名称" width="120" />
            <el-table-column property="address" sortable label="供应商料号" />
            <el-table-column property="address" sortable label="生产日期" />
            <el-table-column property="address" sortable label="流水号" />
            <el-table-column property="address" sortable label="净重" />
            <el-table-column property="address" sortable label="毛重" />
            <el-table-column property="address" sortable label="商厂批号" />
            <el-table-column property="address" sortable label="绞距" />
            <el-table-column property="address" sortable label="颜色" />
            <el-table-column property="address" sortable label="打印日期" />
            
        </el-table>
        
    </div>
    
    <ul class="custom-contextmenu" ref="customContextMenu">
      <li @click="handlePrintClick()">打印</li>
      <li @click="handleDeleteClick()">删除</li>
    </ul>
  </template>
<style lang="scss">
    #record{
        margin-top: 50px;
    }
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
<script lang="ts" setup>
  
  import { ref } from 'vue'
  
  
  const multipleSelection = ref<Record[]>([])
  
  interface Record {
    date: string
    name: string
    address: string
  }
  
  const handleSelectionChange = (val: Record[]) => {
    multipleSelection.value = val
    
  }
  //选中后触发事件
  const clickCurrentChange = (val: Record | undefined) => {
    
    console.log(val)
    //val是获取后行的数据
    
  }

  //右键触发事件
  const cellcontextmenu=(val:Record)=>{
    
    console.log(val)
  }


  //右键弹窗
  let customContextMenu = ref(null);
  const openMenu = (e) => {
    let top = e.pageY;
    let left = e.pageX;
    let ele = customContextMenu.value;
    ele.style.top = top + 'px';
    ele.style.left = left + 'px';
    ele.style.display = 'block';
  };

  window.addEventListener('click', () => {
    let menuElement = customContextMenu.value;
    menuElement.style.display = 'none';
  });

  //打印触发
  const handlePrintClick = () => {
    console.log("打印")
  };
  //删除触发
  const handleDeleteClick = () => {
    console.log("删除")
  };
  
  

  const tableData: Record[] = [
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
  