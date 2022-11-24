<template>
    <div id="print">
        <el-form :model="form" label-width="120px">
            <table>
                <tr>
                    <td>
                        <el-form-item label="供应商名称">
                            <el-input v-model="form.SUPPNAME" disabled/>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="新亚物料编号">
                            <el-input  v-model="form.MATERCODE" @click="dialogTableVisible = true"/>
                        </el-form-item>
                        <el-dialog v-model="dialogTableVisible" title="物料信息" width="700" >
                            <Material></Material>
                        </el-dialog>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="供应商料号">
                            <el-input v-model="form.SUPPMATERCODE" />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="物料名称">
                            <el-input v-model="form.MATERNAME" disabled />
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="订单号">
                            <el-input v-model="form.VBILLCODE" disabled/>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="批号">
                            <el-input v-model="form.SUPPLOTNUM" disabled />
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="净重">
                            <el-input v-model="form.NETWEIGHT" />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="毛重">
                            <el-input v-model="form.GROSSWEIGHT" />
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="供应商批号">
                            <el-input v-model="form.SUPPLOTNUM" />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="绞距" v-if="flag==true">
                            <el-input v-model="form.MATERMATERIALSPEC" />
                        </el-form-item>
                        <el-form-item label="颜色" v-else>
                            <el-input v-model="form.MATERMATERIALTYPE" />
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="供应商代码">
                            <el-input v-model="form.SUPPCODE" disabled />
                        </el-form-item>
                    </td>
                    <td>
                        
                        <el-form-item label="打印数量" >
                            <el-input v-model="form.PRINTQUANTITY" @click="changeView('adada')"/>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-form-item label="生产日期">
                            <el-date-picker
                                v-model="form.PRODUCEDATE"
                                type="date"
                                :size="10"
                                
                            />
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="打印日期">
                            <el-date-picker
                                v-model="form.PRINTDATE"
                                type="date"
                                :size="10"
                                
                            />
                        </el-form-item>
                    </td>
                </tr>
            </table>
        </el-form>
    </div>
    
</template>
<style lang="scss">
    .hide{
        display: none;
    }
    #print{
        width: 100%;
    }
</style>
<script lang="ts" setup>
    import { reactive , ref,defineProps,defineEmits} from 'vue'
    import Material from '../components/Material.vue'
    import { defineComponent } from "vue";
    const dialogTableVisible = ref(false)
    const form=reactive({
        SUPPCODE:'', //供应商代码
        SUPPNAME:'',//供应商名称
        SUPPSHORTNAME:'',//供应商简称
        SUPPMATERCODE:'',//供应商料号
        SUPPLOTNUM:'',//供应商批号
        VBILLCODE:'',//订单号
        MATERCODE:'',//物料编码
        MATERNAME:'',//物料名称
        MATERMATERIALSPEC:'',//物料规格
        MATERMATERIALTYPE:'阿达',//物料颜色
        PRODUCEDATE:'', //生产日期
        NETWEIGHT:0.000,//净重
        GROSSWEIGHT:0.000,//毛重
        PRINTQUANTITY:1,//打印数量
        PRINTDATE:"",//打印日期
        PRINT:false//是否打印

    })
    
    
    const flag=()=>{
        return false
    }
</script>