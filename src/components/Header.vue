<template>
    
    <div id="header">
      <div id="navigation">
        <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1" class="index">菜单</el-menu-item>
        
        
      </el-menu>
      </div>
      
      <Menu></Menu>
    </div>
      
    
</template>
<style>
    #navigation{
      height: 30px;
    }
    .index{
      font-size: 15px;
      line-height: 30px;
    }
    
    #header{
      
    }
    
</style>
<script lang="ts" setup>
    
    import { ref } from 'vue'
    import Menu from "../components/Menu.vue"
    
    const activeIndex = ref('1');

    const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    }
    
</script>
