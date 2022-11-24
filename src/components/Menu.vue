<template>
    <div id="menu">
        <ul>
            <li @click="dialogNew = true">
                <button type="button" >
                    <el-icon :size="40" class="newbuilt">
                        <Document />
                    </el-icon>
                    <br/>
                    新建
                </button>
                
            </li>
                <el-dialog v-model="dialogNew" title="新建" width="800"  >
                    <Word @close="close"></Word>
                </el-dialog>
            <li>
                <button type="button">
                    <el-icon :size="40" class="modify">
                        <EditPen />
                    </el-icon>
                    <br/>
                    修改
                </button>
            </li>
            <li>
                <button type="button">
                    <el-icon :size="40" class="delete">
                        <Delete />
                    </el-icon>
                    <br/>
                    删除
                </button>
            </li>
            <li>
                <button type="button">
                    <el-icon :size="40" class="cancel">
                        <Back />
                    </el-icon>
                    <br/>
                    取消
                </button>
            </li>
            <li>
                <button type="button">
                    <el-icon :size="40" class="import">
                        <RefreshRight />
                    </el-icon>
                    <br/>
                    导入
                </button>
            </li>
            <li>
                <button type="button" @click="refresh">
                    <el-icon :size="40" class="refresh" >
                        <Refresh />
                    </el-icon>
                    <br/>
                    刷新
                </button>
            </li>
            <li @click="dialogQuery = true">
                <button type="button">
                    <el-icon :size="40" class="search" >
                        <Search />
                    </el-icon>
                    <br/>
                    查询
                </button>
            </li>
                <el-dialog v-model="dialogQuery" title="查询" width="700"  >
                    <Query @revert="revert"></Query>
                </el-dialog>
            <li>
                <button type="button">
                    <el-icon :size="40" class="setting">
                        <Setting />
                    </el-icon>
                    <br/>
                    设置
                    
                </button>
            </li>
            <li>
                <button type="button" @click="LogOut">
                    <el-icon :size="40" class="close">
                        <Close />
                    </el-icon>
                    <br/>
                    退出
                    
                </button>
            </li>
        </ul>
    </div>
</template>
  

<style lang="scss">
    #menu{
        padding: 0px;
        height: 90px;
        ul{
            width: 100%;
            margin-top: 5px;
            margin-left: -38px;
            li{
                list-style-type: none;
                float: left;
                margin-left: 2px;
                button{
                    width: 60px;
                    height: 80px;
                    border:0px;
                    background-color: white;       
                }
                button:hover{
                    border:1px solid  #017CFC;
                    background-color: #A2CFFF;
                }
                .newbuilt:hover{
                    color: #017CFC;
                }
                .modify:hover{
                    color: #017CFC;
                }
                .delete{
                    color: red;
                }
                .import{
                    color: green;
                }
                .refresh{
                    color: green;
                }
            }
        }
    }
    
    
</style>
<script lang="ts" setup>
    import Word from './Word.vue'
    import Query from '../components/Query.vue'
    import { reactive , ref,provide,defineProps,defineEmits,onMounted,inject,watch} from 'vue'
    const dialogNew = ref(false)//新建窗口控制
    const dialogQuery = ref(false)//查询窗口控制
    
    const revert=(val)=>{
        dialogQuery.value=val
    }
    const close=(val)=>{
        dialogNew.value=val
    }
    //刷新
    const refresh=()=>{
        location. reload()
        
    }
    const LogOut=()=>{
        
    }
</script>