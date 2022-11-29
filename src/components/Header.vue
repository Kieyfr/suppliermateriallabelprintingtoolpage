<template>
    <div id="header">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">
                <el-icon>
                    <Document />
                    <icon-menu />
                </el-icon>
                <template #title>新建</template>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon>
                    <Search />
                    <icon-menu />
                </el-icon>
                <template #title>查询</template>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon>
                    <Close />
                    <icon-menu />
                </el-icon>
                <template #title>退出</template>
            </el-menu-item>
        </el-menu>
        <Word v-model:dialogWord="dialogWord"></Word>
        <Query v-model:dialogQuery="dialogQuery"></Query>
        <Order></Order>
    </div>
</template>
<script lang="ts" setup>
    import Word from '../components/Word.vue'
    import Query from '../components/Query.vue'
    import Order from "../components/Order.vue"
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const dialogWord = ref(false) //新建窗口是否显示
    const dialogQuery = ref(false) 

    const router = useRouter();

    const handleSelect = (key: string, keyPath: string[]) => {
        if(key=="1"){
            dialogWord.value = true
        }
        if(key=="2"){
            dialogQuery.value = true
        }
        if(key=="3"){
            localStorage.removeItem("accessToken")
            router.push('/')
        }
    }
    
</script>
<style lang="scss">

</style>