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
            <el-form :model="queryInfo" label-width="120px" :inline="true">
                        <el-form-item label="新亚物料名称">
                            <el-input v-model="queryInfo.MATERNAME"/>
                        </el-form-item>
                        <el-form-item label="查询日期">
                            <el-date-picker
                                v-model="queryInfo.STARTDATE"
                                type="date"
                                :size="10"
                            />
                        </el-form-item>
                        <el-form-item label="供应商料号">
                            <el-input v-model="queryInfo.SUPPMATERCODE"/>
                        </el-form-item>
                    
                        <el-form-item label="截止日期">
                            <el-date-picker
                                v-model="queryInfo.CLOSINGDATE"
                                type="date"
                                :size="10"
                            />
                        </el-form-item>
                        <el-form-item label="订单号">
                            <el-input v-model="queryInfo.VBILLCODE"/>
                        </el-form-item>
                        <el-form-item label="批号">
                            <el-input v-model="queryInfo.SUPPLOTNUM"/>
                        </el-form-item>
                        <el-button type="primary" @click="query" >查询</el-button>
                        <el-button @click="handleClose">返回</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<style lang="scss">
    #query{
        width: 600px;
        .el-form-item{
            width: 120x;
            .el-button{
                margin-right: 30px;
            }
            .el-form-item__label{
                // justify-content: flex-start;
                widows: 120px;
            }
            .el-form-item__content{
                width: 220px;
            }
        }
    }
</style>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import {useStore,mapState} from 'vuex'
    const queryInfo=reactive({
        MATERNAME:"",//物料名称
        SUPPMATERCODE:"",//供应商料号
        VBILLCODE:"",//订单号
        SUPPLOTNUM:"",//供应商批号
        STARTDATE:"",//起始日期
        CLOSINGDATE:""//截止日期
    })
    const props = defineProps({
        dialogQuery: Boolean
    })
    const emit = defineEmits(['update:dialogQuery'])

    const handleClose = () => {
        emit('update:dialogQuery', false)
    }
    
    //获取公用数据
    const store = useStore()
    const state = store.state
    

    const query=()=>{
        store.commit("modQueryCriteria",queryInfo)
        handleClose()
    }
    
</script>