<template>
    <button @click="outputPrint">点击</button>
    <Print ref="printRef" class="print"></Print>
</template>
<script lang="ts" setup>
    import Print from "../components/Print.vue"
    import {ref,reactive} from "vue"
    const printRef =ref()
    const outputPrint = () => {
    
    
        printRef.value.outputPrint()
    };
</script>
<style lang="scss">
    .print{
        display: none;
    }
</style>