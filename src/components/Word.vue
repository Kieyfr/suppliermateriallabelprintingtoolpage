<!-- 新建组件 -->
<template>
    <div id="word">
        <el-dialog
            v-model="props.dialogWord"
            title="新建"
            width="800px"
            :before-close="handleClose"
            :close-on-click-modal="false"
        >
            <el-form :model="printSheet" label-width="100px" :inline="true">
                <el-form-item label="供应商名称">
                    <el-input v-model="printSheet.SUPPNAME" disabled/>
                </el-form-item>
                <el-form-item label="新亚物料编号">
                    <Material v-model:printSheet="printSheet"></Material>
                    <!-- <el-input  v-model="printSheet.MATERCODE" @click="dialogTableVisible = true"/> -->
                    <!-- <el-input  v-model="printSheet.MATERCODE"/> -->
                </el-form-item>
                <el-form-item label="供应商料号">
                    <el-input v-model="printSheet.SUPPMATERCODE" />
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="printSheet.MATERNAME" disabled />
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="printSheet.VBILLCODE" disabled/>
                </el-form-item>
                <el-form-item label="批号">
                    <el-input v-model="printSheet.SUPPLOTNUM" disabled />
                </el-form-item>
                <el-form-item label="净重">
                    <el-input-number :precision="3" v-model="printSheet.NETWEIGHT"  :min="0"/>
                </el-form-item>
                <el-form-item label="毛重">
                    <el-input-number :precision="3" v-model="printSheet.GROSSWEIGHT" :min="0" />
                </el-form-item>
                <el-form-item label="供应商批号">
                    <el-input v-model="printSheet.SUPPLOTNUM" />
                </el-form-item>
                <!-- <el-form-item label="绞距" v-if="flag=='铜丝'"> -->
                <!-- <el-form-item label="绞距">
                    <el-input v-model="printSheet.MATERMATERIALSPEC" />
                </el-form-item> -->
                <!-- <el-form-item label="颜色" v-else-if="flag=='胶料'"> -->
                <el-form-item label="颜色">
                    <el-input v-model="printSheet.MATERMATERIALTYPE" />
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
                <el-button type="primary">保存</el-button>
                <el-button type="primary">保存并打印</el-button>
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
//  import { el } from 'element-plus/es/locale';
import { reactive , ref, onMounted,inject,watch} from 'vue'
import Material from '../components/Material.vue'
const props = defineProps({
    dialogWord: Boolean
})

const emit = defineEmits(['update:dialogWord'])

const handleClose = () => {
    emit('update:dialogWord', false)
}

    // const dialogTableVisible = ref(false)

const dialogMaterial = ref(false)

const printSheet=reactive({
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
    PRODUCEDATE:'',         //生产日期
    NETWEIGHT:0.000,        //净重
    GROSSWEIGHT:0.000,      //毛重
    PRINT:false             //是否打印
})
const PRINTQUANTITY = ref(1)//打印数量
const PRINTDATE = ref(new Date)//打印日期



    // const  material=reactive({
    //     VBILLCODE: "",
    //     MATERCODE: "",
    //     MATERNAME: "",
    //     MATERMATERIALSPEC: "",
    //     MATERMATERIALTYPE: "",
    //     });
    // var result = ref(material);
    // const clickMaterial=(val)=>{
    //     result.value=val
    //     printSheet.VBILLCODE=result.value.VBILLCODE
    //     printSheet.MATERCODE=result.value.MATERCODE
    //     printSheet.MATERNAME=result.value.MATERNAME
    //     printSheet.MATERMATERIALSPEC=result.value.MATERMATERIALSPEC
    //     printSheet.MATERMATERIALTYPE=result.value.MATERMATERIALTYPE
    // }
    // const clear=(val)=>{
    //     dialogTableVisible.value=val
    // }
   
    
    // const pd=()=>{
    //     var code=printSheet.SUPPCODE;
    //     var type='';
    //     let tsreg=/^06([0-9]|[a-z]|[A-Z]){7}$/;
    //     let jlreg=/^10([0-9]|[a-z]|[A-Z]){7}$/;
    //     if(tsreg.test(code)){
    //         type='铜丝'
    //     }else if(jlreg.test(code)){
    //         type='胶料'
    //     }else{
            
    //     }
    //     return type
    // }
    // const flag=pd()
</script>