<template>
    <div id="login">
        <el-form label-width="90px" label-position="left">
            <h3>供应商物料标签打印系统</h3>
            <el-form-item label="供应商代码">
                <el-input v-model="supplier.suppCode" placeholder="请输入您的供应商代码" @blur="getSuppName"/>
            </el-form-item>
            <el-form-item label="供应商名称">
                <el-input v-model="supplier.suppName" disabled />
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input v-model="supplier.password" type="password" placeholder="请输入密码" maxlength="20" show-password/> 
            </el-form-item>
            <el-button size="100px" @click="onSubmit" type="primary" >登录</el-button>
            <el-button size="100px" @click="onReset" >重置</el-button>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getSuppNameApi } from '@/api/getSuppName'
import { loginApi } from '@/api/login'
import { useRouter } from 'vue-router';

const router = useRouter();

const supplier = reactive({
    suppCode: '',
    suppName:'',
    password: ''
})

const getSuppName=()=>{
    const param = {
        suppCode: supplier.suppCode
    }
    getSuppNameApi(param).then((res) => {
        if(res.state=='200'){
            supplier.suppName = res.data;
        }else if(res.state=='404'){
            supplier.suppName = "";
            ElMessage.error('供应商代码不存在')
        }
    }) 
}

const onSubmit = () => {
    if(supplier.suppCode=="" || supplier.suppName==""){
        ElMessage.error('请检查供应商是否正确')
    }else if(supplier.password==""){
        ElMessage.error('密码不能为空')
    }else{
        const param = {
        suppCode: supplier.suppCode,
        password: supplier.password
    }
    loginApi(param).then((res) => {
        if(res.state=='200'){
            localStorage.setItem("accessToken", res.data)
            router.push('/index')
        }else if(res.state=='401'){
            ElMessage.error('密码错误')
        }else if(res.state=='404'){
            ElMessage.error('供应商不存在')
        }
    }) 
    }
}

const onReset = () => {
    supplier.suppCode="";
    supplier.suppName="";
    supplier.password="";
}
</script>

<style lang="scss">
    #login{
        background-color: white;
        border-radius: 15px;
        width: 400px;
        height: 280px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        h3{
            line-height: 40px;
        }
        .el-form {
            width: 300px;
            margin: auto;
        }
    }
</style>