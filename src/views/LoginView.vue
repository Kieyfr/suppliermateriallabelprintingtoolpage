<template>
  <div id="loginView">
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
            <el-button size="100px" @click="onSkipAdmin"  >管理员登录</el-button>
            <el-button size="100px" @click="onReset" >重置</el-button>
        </el-form>
    </div>
    <el-dialog
            v-model="dialogVisible"
            title="第一次登录请设置一个登录密码"
            width="30%"
            :close-on-press-escape="false"
            :show-close="false"
            :close-on-click-modal="false"
            :before-close="handleClose"
        >
        <span>
            <el-input v-model="password" type="password" placeholder="请输入密码" show-password/>
        </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="confirmTrue">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive ,ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getSuppNameApi } from '@/api/getSuppName'
import { addSuppUserApi } from '@/api/addSuppUser'
import { loginApi } from '@/api/login'
import { useRouter } from 'vue-router';

const router = useRouter();

const dialogVisible = ref(false)

const password = ref('')

let supplier = reactive({
    suppCode: '',
    suppName:'',
    suppShortname:'',
    password: ''
})

const getSuppName=()=>{
    const param = {
        suppCode: supplier.suppCode
    }
    getSuppNameApi(param).then((res) => {
        if(res.state=='200'){
            supplier.suppCode = res.data.code;
            supplier.suppName = res.data.name;
            supplier.suppShortname = res.data.shortname;
        }else if(res.state=='201'){
            supplier.suppCode = res.data.code;
            supplier.suppName = res.data.name;
            supplier.suppShortname = res.data.shortname;
            dialogVisible.value=true
        }else if(res.state=='404'){
            supplier.suppCode = '';
            supplier.suppName = '';
            supplier.suppShortname = '';
            supplier.password = '';
            ElMessage.error('供应商代码不存在')
        }
    }) 
}

const addSuppUser=()=>{
    
    const param = {
        CODE: supplier.suppCode,
        NAME: supplier.suppName,
        SHORTNAME: supplier.suppShortname,
        PWD: password.value
    }
    addSuppUserApi(param).then((res) => {
        if(res.state=='200'){
            const param2 = {
                suppCode: supplier.suppCode,
                password: password.value,
                state:1
            }
            loginApi(param2).then((res) => {
                if(res.state=='200'){
                    localStorage.setItem("accessToken", res.data)
                    router.push('/index')
                }else if(res.state=='401'){
                    ElMessage.error('密码错误')
                }else if(res.state=='404'){
                    ElMessage.error('供应商不存在')
                }
            }) 
        }else if(res.state=='500'){
            onReset()
            ElMessage.error('添加失败')
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
            password: supplier.password,
            state:1
        }
        loginApi(param).then((res) => {
            if(res.state=='200'){
                onReset()
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

const onSkipAdmin=()=>{
    router.push('/loginAdmin')
}

const onReset = () => {
    supplier.suppCode='',
    supplier.suppName='',
    supplier.suppShortname='',
    supplier.password=''
}

const handleClose = (done: () => void) => {
    done()
}

const confirmTrue = () => {
    if(password.value!=""){
        dialogVisible.value=false
        addSuppUser()
    }else{
        ElMessage.error('密码不能为空')
    }
    
}
</script>
<style lang="scss">
  #loginView{
    width: 100%;
    height: 100%;
    max-width: 1920px;
    max-height: 1080px;
    background-repeat: no-repeat;
    background-image: url("../assets/bg.webp") ;
    background-size:100%;
    #login{
        background-color: white;
        border-radius: 15px;
        width: 400px;
        height: 280px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .dialog-footer button:first-child {
            margin-right: 10px;
        }
        h3{
            line-height: 40px;
        }
        .el-form {
            width: 300px;
            margin: auto;
        }
    }
  }
</style>
