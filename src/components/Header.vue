<template>
    <div id="header">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <!-- <el-menu-item index="1" @click="dialogNew = true"> -->
            <el-menu-item index="1">
                <el-icon>
                    <Document />
                    <icon-menu />
                </el-icon>
                <template #title>新建</template>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <EditPen />
                    <icon-menu />
                </el-icon>
                <template #title>修改</template>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon>
                    <Delete />
                    <icon-menu />
                </el-icon>
                <template #title>删除</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <Back />
                    <icon-menu />
                </el-icon>
                <template #title>取消</template>
            </el-menu-item>
            <el-menu-item index="5">
                <el-icon>
                    <RefreshRight />
                    <icon-menu />
                </el-icon>
                <template #title>导入</template>
            </el-menu-item>
            <!-- <el-menu-item index="6" @click="refresh"> -->
            <el-menu-item index="6">
                <el-icon>
                    <Refresh />
                    <icon-menu />
                </el-icon>
                <template #title>刷新</template>
            </el-menu-item>
            <!-- <el-menu-item index="7" @click="dialogQuery = true"> -->
            <el-menu-item index="7">
                <el-icon>
                    <Search />
                    <icon-menu />
                </el-icon>
                <template #title>查询</template>
            </el-menu-item>
            <el-menu-item index="8">
                <el-icon>
                    <Setting />
                    <icon-menu />
                </el-icon>
                <template #title>设置</template>
            </el-menu-item>
            <!-- <el-menu-item index="9" @click="LogOut"> -->
            <el-menu-item index="9">
                <el-icon>
                    <Close />
                    <icon-menu />
                </el-icon>
                <template #title>退出</template>
            </el-menu-item>
        </el-menu>
        <Word v-model:dialogWord="dialogWord"></Word>
        <!-- <el-dialog v-model="dialogQuery" title="查询" width="700px"  >
            <Query @revert="revert"></Query>
        </el-dialog> -->
    </div>
</template>
<script lang="ts" setup>
    import Word from '../components/Word.vue'
    import Query from '../components/Query.vue'
    import { ref } from 'vue'

    const dialogWord = ref(false)  //新建窗口是否显示
    // const dialogQuery = ref(false)//查询窗口控制
    
    // const revert=(val)=>{
    //     dialogQuery.value=val
    // }
    // const close=(val)=>{
    //     dialogNew.value=val
    // }
    //刷新
    // const refresh=()=>{
    //     location. reload()
        
    // }
    // const LogOut=()=>{
        
    // }
    
    const activeIndex = ref('1');

    const handleSelect = (key: string, keyPath: string[]) => {
        if(key=="1"){
            dialogWord.value = true
        }
    }
    
</script>
<style lang="scss">

</style>