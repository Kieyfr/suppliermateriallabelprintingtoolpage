<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";


@Options({
  components: {
     
  },
})
export default class HomeView extends Vue {}
</script>
<style>
  .home{
    margin: 0 auto;
    border: 1px black solid;
  }
</style>