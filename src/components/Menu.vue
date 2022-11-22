<template>
    
    <div id="menu">
        <el-row class="mb-4">
            <el-button type="blue" class="button">
                <el-icon :size="40" class="icon">
                    <Document />
                    
                </el-icon>
                新建
            </el-button>
            
            
        </el-row>
    </div>
</template>
  
<script lang="ts" setup>
    
  
  
</script>
<style>
    #menu{
        border: 1px #017CFC solid;
        height: 80px;
    }
    .button{
        height: 80px;
        width: 60px;
        position: relative;
        
        
    }
    .button>*{
        display:block;
    }
    .wz{
        display:block;
        font-size: 10px;
    }
    
</style>