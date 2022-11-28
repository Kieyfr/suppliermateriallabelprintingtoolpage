<!-- 信息更改页面 -->
<template>
    <div id="word">
        <el-dialog v-model="props.dialogWord" title="新建" width="800px" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="printSheet" label-width="100px" :inline="true">
                <el-form-item label="供应商名称">
                    <el-input v-model="printSheet.SUPPSHORTNAME" disabled/>
                </el-form-item>
                <el-form-item label="新亚物料编号">
                    <Material v-model:printSheet="printSheet"></Material>
                </el-form-item>
                <el-form-item label="供应商料号">
                    <el-input v-model="printSheet.SUPPMATERCODE"/>
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="printSheet.MATERNAME" disabled />
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="printSheet.VBILLCODE" disabled/>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="LOTNUM" disabled />
                </el-form-item>
                <el-form-item label="净重">
                    <el-input-number :precision="3" v-model="printSheet.NETWEIGHT"  :min="0"/>
                </el-form-item>
                <el-form-item label="毛重">
                    <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" />
                </el-form-item>
                <el-form-item label="供应商批号">
                    <el-input v-model="printSheet.SUPPLOTNUM"/>
                </el-form-item>
                <el-form-item label="绞距" v-if="printSheet.MATERCODE.substring(0,2)==='06'">
                    <el-input v-model="printSheet.MATERMATERIALSPEC" />
                </el-form-item>
                <el-form-item label="颜色" v-else>
                    <el-input v-model="printSheet.MATERMATERIALTYPE"/>
                </el-form-item>
                <el-form-item label="供应商代码">
                    <el-input v-model="printSheet.SUPPCODE" disabled />
                </el-form-item>
                <el-form-item label="打印数量" >
                    <el-input-number :precision="0" v-model="PRINTQUANTITY" :min="1"/>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-date-picker
                        v-model="printSheet.PRODUCEDATE"
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
    #word{
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
import { reactive , ref, onMounted, onUpdated} from 'vue'
import Material from '../components/Material.vue'
import { PrintSheet } from '../types/index'
import { getLotNumApi } from '../api/getLotNum'
import { getSuppUserApi } from '../api/getSuppUser'
import { addPrintSheetApi } from '../api/addPrintSheet'
import { ElMessage } from 'element-plus'

import {  inject } from 'vue'

const reload = inject('reload')

const props = defineProps({
    dialogWord: Boolean
})

const emit = defineEmits(['update:dialogWord'])

const handleSubit = () => {
    if(printSheet.MATERCODE==''){
        ElMessage.error('请选择新亚物料编号')
    }
    // else if(printSheet.PRODUCEDATE.toString==new Date('01/01/01').toString){
    //     console.log(printSheet.PRODUCEDATE.toString)
    //     console.log(new Date('01/01/01').toString)
    //     ElMessage.error('请选择正确的生产日期')
    // }
    else if(printSheet.SUPPMATERCODE==''){
        ElMessage.error('请填写供应商料号')
    }
    else if(printSheet.SUPPLOTNUM==''){
        ElMessage.error('请填写供应商批号')
    }
    else if(printSheet.NETWEIGHT==0.00){
        ElMessage.error('请设置净重')
    }
    else if(printSheet.GROSSWEIGHT==0.00){
        ElMessage.error('请设置毛重')
    }
    else if(printSheet.GROSSWEIGHT<=printSheet.NETWEIGHT){
        ElMessage.error('毛重需要大于等于净重')
    }
    else {
        addPrintSheetApi(printSheet).then((res) => {
            if(res.state=='200'){
                ElMessage.success('添加成功')
                reload()
            }else if(res.state=='403'){
                ElMessage.error('订单重复，请选择其他订单')
                return
            }else if(res.state=='500'){
                ElMessage.error('添加失败')
            }
        }) 
        handleClose()
    }
}

const handleClose = () => {
    emit('update:dialogWord', false)
}

const dialogMaterial = ref(false)

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

const LOTNUM = ref(0)
const PRINTQUANTITY = ref(1)//打印数量
const PRINTDATE = ref(new Date)//打印日期

onMounted(()=>{
    getSuppUserApi().then((res) => {
        if(res.state=='200'){
            printSheet.SUPPCODE = res.data.code
            printSheet.SUPPNAME = res.data.name
            printSheet.SUPPSHORTNAME = res.data.shortname
        }
    });
})

onUpdated(() => {
    if(props.dialogWord==true){
        getLotNumApi().then((res) => {
        if(res.state=='200'){
            LOTNUM.value = res.data
        }else if(res.state=='500'){
            ElMessage.error('获取失败')
        }
    }) ;
    }
    

})
</script>