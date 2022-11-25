<template>
    <div id="header">
        <ul>
            <li @click="dialogNew = true">
                <button type="button" >
                    <el-icon :size="40" class="newbuilt">
                        <Document />
                    </el-icon>
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
                    修改
                </button>
            </li>
            <li>
                <button type="button">
                    <el-icon :size="40" class="delete" color="red">
                        <Delete />
                    </el-icon>
                    删除
                </button>
            </li>
            <li>
                <button type="button">
                    <el-icon :size="40" class="cancel">
                        <Back />
                    </el-icon>
                    取消
                </button>
            </li>
            <li>
                <button type="button">
                    <el-icon :size="40" class="import" color="green" >
                        <RefreshRight />
                    </el-icon>
                    导入
                </button>
            </li>
            <li>
                <button type="button" @click="refresh">
                    <el-icon :size="40" class="refresh" color="green" >
                        <Refresh />
                    </el-icon>
                    刷新
                </button>
            </li>
            <li @click="dialogQuery = true">
                <button type="button">
                    <el-icon :size="40" class="search" >
                        <Search />
                    </el-icon>
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
                    设置
                    
                </button>
            </li>
            <li>
                <button type="button" @click="LogOut">
                    <el-icon :size="40" class="close">
                        <Close />
                    </el-icon>
                    退出
                </button>
            </li>
        </ul>
    </div>
</template>
<style lang="scss">
    #header{
        ul{
            li{
                list-style-type: none;
                float: left;
                margin-left: 2px;
                button{
                    width: 60px;
                    height: 80px;
                    border:0px;
                    background-color: white;     
                    :hover{
                        border:1px solid  #017CFC;
                        background-color: #A2CFFF;
                    }  
                }
                .newbuilt:hover{
                    color: #017CFC;
                }
                .modify:hover{
                    color: #017CFC;
                }
            }
        }
    }
    
    
</style>
<script lang="ts" setup>
    import Word from './Word.vue'
    import Query from '../components/Query.vue'
    import { ref } from 'vue'
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
    
    const activeIndex = ref('1');

    const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    }
    
</script>
