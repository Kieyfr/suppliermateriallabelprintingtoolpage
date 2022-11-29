<!-- 信息更改页面 -->
<template>
    <div id="modify">
        <el-dialog v-model="props.dialogModify" title="打印" width="800px" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="printSheet" label-width="100px" :inline="true">
                <el-form-item label="供应商名称">
                    <el-input v-model="props.printSheet.SUPPSHORTNAME" disabled/>
                </el-form-item>
                <el-form-item label="新亚物料编号">
                    <el-input v-model="props.printSheet.SUPPMATERCODE" disabled/>
                </el-form-item>
                <el-form-item label="供应商料号">
                    <el-input v-model="props.printSheet.SUPPMATERCODE" disabled/>
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="props.printSheet.MATERNAME" disabled />
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="props.printSheet.VBILLCODE" disabled/>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="LOTNUM" disabled />
                </el-form-item>
                <el-form-item label="净重">
                    <el-input-number :precision="3" v-model="props.printSheet.NETWEIGHT"  :min="0"/>
                </el-form-item>
                <el-form-item label="毛重">
                    <el-input-number :precision="3" v-model="props.printSheet.GROSSWEIGHT" :min="0" />
                </el-form-item>
                <el-form-item label="供应商批号">
                    <el-input v-model="props.printSheet.SUPPLOTNUM" />
                </el-form-item>
                <el-form-item label="绞距" v-if="props.printSheet.MATERCODE.substring(0,2)==='06'" >
                    <el-input v-model="props.printSheet.MATERMATERIALSPEC" disabled/>
                </el-form-item>
                <el-form-item label="颜色" v-else>
                    <el-input v-model="props.printSheet.MATERMATERIALTYPE" disabled/>
                </el-form-item>
                <el-form-item label="供应商代码">
                    <el-input v-model="props.printSheet.SUPPCODE" disabled />
                </el-form-item>
                <el-form-item label="打印数量" >
                    <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1"/>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-date-picker
                        v-model="props.printSheet.PRODUCEDATE"
                        type="date"
                    />
                </el-form-item>
                <el-form-item label="打印日期">
                    <el-date-picker
                        v-model="PRINTDATE"
                        type="date"
                    />
                </el-form-item>
                <el-button @click="handleSubit" type="primary">打印</el-button>
                <el-button @click="handleClose">退出</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<style lang="scss">
    #modify{
        .el-form-item{
            width: 360px;
            margin-right: 10px;
            margin-left: 10px;
            .el-form-item__label{
                justify-content: flex-start;
            }
        }
    }
</style>
<script lang="ts" setup>
import { ref, onUpdated} from 'vue'
import { getLotNumApi } from '../api/getLotNum'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import { ElMessage } from 'element-plus'

import {  inject } from 'vue'

const reload = inject('reload')

const props = defineProps({
    dialogModify: Boolean,
    printSheet:Object
})

const emit = defineEmits(['update:dialogModify'])

const handleSubit = () => {
    if(props.printSheet.NETWEIGHT==0.00){
        ElMessage.error('请设置净重')
    }
    else if(props.printSheet.GROSSWEIGHT==0.00){
        ElMessage.error('请设置毛重')
    }
    else if(props.printSheet.GROSSWEIGHT<=props.printSheet.NETWEIGHT){
        ElMessage.error('毛重需要大于等于净重')
    }
    else {
        addPrintHistory()
        reload()
        handleClose()
    }
}

const addPrintHistory=()=>{
    const param={
      PK_ORDER: props.printSheet.PK_ORDER,            //采购订单主键
      PK_ORDER_B: props.printSheet.PK_ORDER_B         //采购订单明细主键
    }
    addPrintHistoryApi(param).then((res) => {
    }) ;

}

const handleClose = () => {
    emit('update:dialogModify', false)
}

const LOTNUM = ref(0)
const PRINTQUANTITY = ref(1)//打印数量
const PRINTDATE = ref(new Date)//打印日期


onUpdated(() => {
    if(props.dialogModify==true){
        const param = {
            PK_ORDER_B:props.printSheet.PK_ORDER_B 
        }
        getLotNumApi(param).then((res) => {
            if(res.state=='200'){
                LOTNUM.value=res.data
                console.log(res.data)
                console.log(LOTNUM.value)
            }else if(res.state=='500'){
                ElMessage.error('获取失败')
            }
        }) ;
    }
})
</script>