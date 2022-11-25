<!-- 查询组件 -->
<template>
    <div id="query">
        <el-form :model="form" label-width="100px">
            <table>
                <tr>
                    <td>
                        <el-form-item label="新亚物料名称">
                            <el-input v-model="form.MATERNAME"/>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="查询日期">
                            <el-date-picker
                                v-model="form.STARTDATE"
                                type="date"
                                :size="10"
                                
                            />
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="供应商料号">
                            <el-input v-model="form.SUPPMATERCODE"/>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="截止日期">
                            <el-date-picker
                                v-model="form.CLOSINGDATE"
                                type="date"
                                :size="10"
                                
                            />
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="订单号">
                            <el-input v-model="form.VBILLCODE"/>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="批号">
                            <el-input v-model="form.SUPPLOTNUM"/>
                        </el-form-item>
                    </td>
                </tr>
                <tr class="Bottom">
                    <td>
                        
                        <el-button type="primary" @click="query" >查询</el-button>
                    </td>
                    <td>
                        <el-button @click="revert">返回</el-button>
                    </td>
                </tr>
            </table>

        </el-form>
    </div>
</template>
<style lang="scss">
    #query{
        width: 600px;
        margin: auto;
        table{
            .Bottom{
                td{
                    button{
                        
                    }
                }
            }
        }
    }
</style>
<script lang="ts" setup>
    import { reactive } from 'vue'
    import {useStore,mapState} from 'vuex'
    const form=reactive({
        MATERNAME:"",//物料名称
        SUPPMATERCODE:"",//供应商料号
        VBILLCODE:"",//订单号
        SUPPLOTNUM:"",//供应商批号
        STARTDATE:"",//起始日期
        CLOSINGDATE:""//截止日期
    })
    
    const emit=defineEmits(['revert'])
    //获取公用数据
    const store = useStore()
    const state = store.state
    const revert=()=>{
        let gb=false
        emit('revert',gb)
    }

    const query=()=>{
        store.commit("modQueryCriteria",form)
        revert()
    }
    
</script>