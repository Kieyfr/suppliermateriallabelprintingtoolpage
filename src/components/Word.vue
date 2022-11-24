<!-- 信息更改页面 -->
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
                            <Material @clickMaterial="clickMaterial" @clear="clear"></Material>
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
                            <el-input-number :precision="3" v-model="form.NETWEIGHT"  :min="0"/>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="毛重">
                            <el-input-number :precision="3" v-model="form.GROSSWEIGHT" :min="0" />
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
                        <el-form-item label="绞距" v-if="flag=='铜丝'">
                            <el-input v-model="form.MATERMATERIALSPEC" />
                        </el-form-item>
                        <el-form-item label="颜色" v-else-if="flag=='胶料'">
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
                            <el-input-number :precision="0" v-model="form.PRINTQUANTITY" :min="1"/>
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
                <tr class="Bottom">
                    <td>
                        <el-button type="primary">保存</el-button>
                    </td>
                    <td>
                        <el-button @click="close">退出</el-button>
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
        width: 800px;
        margin: auto;
        table{
            .Bottom{
                td{
                    button{
                        width: 80px;
                    }
                }
            }
        }
    }
</style>
<script lang="ts" setup>
    import { el } from 'element-plus/es/locale';
import { reactive , ref,provide,defineProps,defineEmits,onMounted,inject,watch} from 'vue'
    import Material from './Material.vue'
    const dialogTableVisible = ref(false)
    const form=reactive({
        SUPPCODE:'069876543', //供应商代码
        SUPPNAME:'',//供应商名称
        SUPPSHORTNAME:'',//供应商简称
        SUPPMATERCODE:'',//供应商料号
        SUPPLOTNUM:'',//供应商批号
        VBILLCODE:'',//订单号
        MATERCODE:'',//物料编码
        MATERNAME:'',//物料名称
        MATERMATERIALSPEC:'',//物料规格
        MATERMATERIALTYPE:'',//物料颜色
        PRODUCEDATE:'', //生产日期
        NETWEIGHT:0.000,//净重
        GROSSWEIGHT:0.000,//毛重
        PRINTQUANTITY:1,//打印数量
        PRINTDATE:"",//打印日期
        PRINT:false//是否打印

    })
    const  material=reactive({
        VBILLCODE: "",
        MATERCODE: "",
        MATERNAME: "",
        MATERMATERIALSPEC: "",
        MATERMATERIALTYPE: "",
        });
    var result = ref(material);
    const clickMaterial=(val)=>{
        result.value=val
        form.VBILLCODE=result.value.VBILLCODE
        form.MATERCODE=result.value.MATERCODE
        form.MATERNAME=result.value.MATERNAME
        form.MATERMATERIALSPEC=result.value.MATERMATERIALSPEC
        form.MATERMATERIALTYPE=result.value.MATERMATERIALTYPE
    }
    const clear=(val)=>{
        dialogTableVisible.value=val
    }
    const emit=defineEmits(['close'])
    const close=()=>{
        let gb=false
        emit('close',gb)
    }
   
    
    const pd=()=>{
        var code=form.SUPPCODE;
        var type='';
        let tsreg=/^06([0-9]|[a-z]|[A-Z]){7}$/;
        let jlreg=/^10([0-9]|[a-z]|[A-Z]){7}$/;
        if(tsreg.test(code)){
            type='铜丝'
        }else if(jlreg.test(code)){
            type='胶料'
        }else{
            
        }
        return type
    }
    const flag=pd()
</script>