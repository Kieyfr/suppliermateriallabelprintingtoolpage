<template>
    <button @click="dialogPrint=true">点击</button>
    <Print v-model:dialogPrint="dialogPrint"></Print>
</template>
<script lang="ts" setup>
    import Print from "../components/Print.vue"
    import {ref} from "vue"
    const dialogPrint = ref(false) 
</script>
<style>

</style>