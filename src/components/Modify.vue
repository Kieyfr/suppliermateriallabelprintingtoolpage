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
        <Print ref="printRef" class="print"></Print>
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
    .print{
        display: none;
    }
</style>
<script lang="ts" setup>
import { ref, onUpdated} from 'vue'
import { getLotNumApi } from '../api/getLotNum'
import { addPrintHistoryApi } from '../api/addPrintHistory'
import { ElMessage } from 'element-plus'
import {useStore,mapState} from 'vuex'
import {  inject } from 'vue'
import Print from '../components/Print.vue'

const reload = inject('reload')

const props = defineProps({
    dialogModify: Boolean,
    printSheet:Object
})

const emit = defineEmits(['update:dialogModify'])

//获取公用数据
const store = useStore()
const state = store.state

let printInfo2={
      SUPPSHORTNAME:"",       //供应商简称
      MATERNAME:"",           //物料名称
      MATERCODE:"",           //物料代码
      SUPPMATERCODE:"",       //供应商料号
      PRODUCEDATE:"",           //生产日期
      VBILLCODE:"",           //订单号
      SUPPLOTNUM:"",          //供应商批号
      LOTNUM:"",            //批号
      MATERMATERIALSPEC:"",   //物料规格
      MATERMATERIALTYPE:"",   //物料颜色
      NETWEIGHT:"",           //净重
      GROSSWEIGHT:""         //毛重
    }

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
        modprintInfo()
        CreateOneFormPage()
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

const printRef =ref()

//打开打印方法
const CreateOneFormPage = () => {
    printRef.value.CreateOneFormPage()
};

//更改全局信息方法
const modprintInfo=()=>{
    if(props.printSheet.MATERMATERIALSPEC==null){
        props.printSheet.MATERMATERIALSPEC=""
    }else{
        props.printSheet.MATERMATERIALTYPE=""
    }
    printInfo2.SUPPSHORTNAME=props.printSheet.SUPPSHORTNAME
    printInfo2.MATERCODE=props.printSheet.MATERCODE
    printInfo2.MATERNAME=props.printSheet.MATERNAME
    printInfo2.SUPPMATERCODE=props.printSheet.SUPPMATERCODE
    printInfo2.PRODUCEDATE=props.printSheet.PRODUCEDATE
    printInfo2.SUPPLOTNUM=props.printSheet.SUPPLOTNUM
    printInfo2.VBILLCODE=props.printSheet.VBILLCODE
    printInfo2.LOTNUM=LOTNUM
    printInfo2.MATERMATERIALSPEC=props.printSheet.MATERMATERIALSPEC
    printInfo2.MATERMATERIALTYPE=props.printSheet.MATERMATERIALTYPE
    printInfo2.NETWEIGHT=props.printSheet.NETWEIGHT
    printInfo2.GROSSWEIGHT=props.printSheet.GROSSWEIGHT

    store.commit("modPrintInfo",printInfo2)

}

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