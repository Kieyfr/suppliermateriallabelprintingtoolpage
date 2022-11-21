<template>
    
        <div class="login">
        <div class="mylogin">
            <h3>系统登录</h3>
            <el-form  label-width="100px">
                <el-form-item label="供应商代码">
                <el-input  v-model="supplier.supplierCode"  placeholder="请输入您的供应商代码" @change="supplierCode"/>
                </el-form-item>
                <el-form-item label="供应商名称">
                <el-input v-model="supplier.supplierName" disabled placeholder="请输入您的供应商名称" maxlength="20"/>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input
                        
                        v-model="supplier.pwd"
                        type="password"
                        placeholder="请输入密码"
                        maxlength="20"
                        show-password
                    />
                    
                </el-form-item>
                
                
                
                <el-button type="primary" @click="onSubmit" size="100px">登录</el-button>
                <el-button size="100px" @click="onReset" >重置</el-button>
            </el-form>
        </div>
    </div>

    
</template>

<style>
    .login{
        background-color: white;
        border-radius: 15px;
        width: 400px;
        height: 300px;
        margin:0 auto;
    }
    .login h3{
        line-height: 60px;
    }
    .mylogin{
        line-height: 30px;
        width: 300px;
        margin:0 auto;
    }
    
    .mylogin el-form el-form-item{
        width: 300px;
        height: 200px;
        margin: 0 auto;
        text-align: center;
    }
    .mylogin el-form el-form-item el-input{
        width: 100px;
    }
    .mylogin el-form el-form-item span{
        color: red;
        height: 30px;
    }
    
</style>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// import type { Action } from 'element-plus'
// import { el } from 'element-plus/es/locale';


const supplier=reactive({
    supplierCode:"",
    supplierName:"",
    pwd: '',
  
})

const supplierCodeReg=()=>{
    let c_reg=/^([0-9]|[a-z]|[A-Z]){9}$/;
    return c_reg.test(supplier.supplierCode)
}

const supplierCode=()=>{
    const value=supplierCodeReg
}

const onSubmit = () => {
  if(supplier.supplierCode.length==0){
        ElMessageBox.alert('供应商代码不能为空', '提示', {
         // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        // callback: (action: Action) => {
        //   ElMessage({
        //     type: 'info',
        //     message: `action: ${action}`,
        //   })
        // },
        })
    }else if(supplier.pwd.length==0){
        ElMessageBox.alert('密码不能为空', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        // callback: (action: Action) => {
        //   ElMessage({
        //     type: 'info',
        //     message: `action: ${action}`,
        //   })
        // },
        })
    }else{

    }
  }
  const onReset = () => {
    supplier.supplierCode="";
    supplier.supplierName="";
    supplier.pwd="";
  }
</script>