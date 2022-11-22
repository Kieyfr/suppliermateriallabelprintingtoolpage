<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header id="header"></Header>
            </el-header>
           
            
            <el-main>
                <Main id="main"></Main>
            </el-main>
        </el-container>
    </div>
</template>
<style>

</style>
<script lang="ts" setup>
    import Header from "../components/Header.vue";
    import Main from "../components/Main.vue";
</script>
<style>
    #header{
        height: 400px;
    }
    #main{
        margin-top: 70px;
    }
</style>