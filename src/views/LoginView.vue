<template>
  <div id="loginView">
    <Login></Login>
  </div>
</template>

<script lang="ts" setup>
import Login from "../components/Login.vue";
</script>
<style lang="scss">
  #loginView{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url("../assets/bg.webp") ;
    background-size:100%;
  }
</style>
