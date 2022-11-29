<!-- 查询组件 -->
<template>
    <div id="query">
        <el-dialog
            v-model="props.dialogQuery"
            title="查询"
            width="800px"
            :before-close="handleClose"
            :close-on-click-modal="false"
        >
            <el-form :model="selInfo" label-width="100px" :inline="true">
                        <el-form-item label="供应商料号">
                            <el-input v-model="selInfo.SUPPMATERCODE"/>
                        </el-form-item>
                        <el-form-item label="供应商批号">
                            <el-input v-model="selInfo.SUPPLOTNUM"/>
                        </el-form-item>
                        <el-form-item label="订单号">
                            <el-input v-model="selInfo.VBILLCODE"/>
                        </el-form-item>
                        <el-form-item label="是否打印完成">
                            <el-radio-group v-model="selInfo.COMPLETION">
                                <el-radio label="全部" />
                                <el-radio label="未完成" />
                                <el-radio label="已完成" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="查询日期">
                            <el-date-picker
                                v-model="selInfo.STARTDATE"
                                type="date"
                                :size="10"
                            />
                        </el-form-item>
                        <el-form-item label="截止日期">
                            <el-date-picker
                                v-model="selInfo.ENDDATE"
                                type="date"
                                :size="10"
                            />
                        </el-form-item>
                        <el-button type="primary" @click="query" >查询</el-button>
                        <el-button @click="handleClose">返回</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    import { getIfPrintSheetsApi } from '../api/getIfPrintSheets'
    const selInfo=reactive({
        SUPPMATERCODE:" ",//供应商料号
        VBILLCODE:" ",//订单号
        SUPPLOTNUM:" ",//供应商批号
        COMPLETION:"全部",//是否完成
        STARTDATE:"2022-11-29",//起始日期
        ENDDATE:"2022-11-29"//截止日期
    })
    const props = defineProps({
        dialogQuery: Boolean
    })
    const emit = defineEmits(['update:dialogQuery'])

    const handleClose = () => {
        emit('update:dialogQuery', false)
    }

    const query=()=>{
        const param = {
            SUPPMATERCODE:selInfo.SUPPMATERCODE,//供应商料号
            VBILLCODE:selInfo.VBILLCODE,//订单号
            SUPPLOTNUM:selInfo.SUPPLOTNUM,//供应商批号
            COMPLETION:selInfo.COMPLETION,//是否完成
            STARTDATE:selInfo.STARTDATE,//起始日期
            ENDDATE:selInfo.ENDDATE//截止日期
        }
        console.log(param)
        getIfPrintSheetsApi(param).then((res) => {
            if(res.state=='200'){  
                console.log(res.data)
            }else if(res.state=='500'){
                ElMessage.error(res.msg)
            }
        }) 
        handleClose()
    }
    
</script>

<style lang="scss">
    #query{
        .el-form-item{
            width: 350px;
            margin-right: 5px;
            margin-left: 5px;
            .el-form-item__label{
                justify-content: flex-start;
            }
            .el-form-item__content{
                min-width: 250px;
                .el-input{
                    width:220px
                }
            }
        }
    }
</style>