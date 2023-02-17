<template>
    <div id="loginAdminView">
      <div id="loginAdmin">
          <el-form label-width="90px" label-position="left">
              <h3>管理员登录</h3>
              <el-form-item label="管理员账号">
                  <el-input v-model="admin.admin" placeholder="请输入您的账号"/>
              </el-form-item>
              
              <el-form-item label="登录密码">
                  <el-input v-model="admin.password" type="password" placeholder="请输入密码" maxlength="20" show-password/> 
              </el-form-item>
              <el-button size="100px" @click="onSubmit" type="primary" >登录</el-button>
              <el-button size="100px" @click="onSkipLogin" >切换</el-button>
              
              <el-button size="100px" @click="onReset" >重置</el-button>
          </el-form>
      </div>
      
    </div>
    
    
  </template>
  
  <script lang="ts" setup>
    import { reactive ,ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { getSuppNameApi } from '@/api/getSuppName'
    import { addSuppUserApi } from '@/api/addSuppUser'
    import { loginAdminApi } from '@/api/login'
    import { loginAdminsupplier } from '@/api/loginAdmin'
    import { useRouter } from 'vue-router';
    import DownSearch from "../components/DownSearch.vue"
    
    const router = useRouter();
    
    const dialogVisible = ref(false)
    
    
    
    let admin = reactive({
      admin:"",
      password:""
    })
    
    const supp=ref()

    const supplier=reactive({
      SUPPSHORTNAME:"",
      
      SUPPCODE:""
    })
    let SUPPCODES=['']
    const  updatesupplier=()=>{
      supplier.SUPPSHORTNAME=supp.value.SUPPSHORTNAME
      SUPPCODES=['']
      SUPPCODES=supp.value.SUPPCODES
      supplier.SUPPCODE=SUPPCODES[0]
    }


    
    const onSubmit = () => {
        if(admin.admin==""){
          ElMessage.error('管理员账号不能为空')
        }else if(admin.password==""){
          ElMessage.error('密码不能为空')
        }else{
          const param = {
              admin: admin.admin,
              password: admin.password,
              state:0
          }
          loginAdminApi(param).then((res) => {
              if(res.state=='200'){
                localStorage.setItem("accessToken", res.data)
                router.push('/index')
              }else{
                  ElMessage.error(res.msg)
                  admin.admin=""
                  admin.password=""
              }
          }) 
        }
    }
    
    

    const onReset = () => {
        admin.admin="",
        admin.password=""
    }
    
    const onSkipLogin=()=>{
      router.push('/login')
  }

  

</script>
<style lang="scss">
    #loginAdminView{
      width: 100%;
      height: 100%;
      max-width: 1920px;
      max-height: 1080px;
      background-repeat: no-repeat;
      background-image: url("../assets/bg.webp") ;
      background-size:100%;
      #loginAdmin{
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