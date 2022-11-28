<template>
  <router-view v-if="isRouterActive"></router-view>
</template>
<script lang="ts" setup>
import { ref, provide, nextTick } from 'vue'
const isRouterActive = ref(true)
provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body{
	padding: 0px;
  margin: 0px;
  height: 100%;
}
html{
  height: 100%;
}
</style>
