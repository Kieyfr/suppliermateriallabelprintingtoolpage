<template>
  <div>
    <Login class="login"></Login>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Login from "../components/Login.vue";
@Options({
  components: {
    Login
  },
})
export default class HomeView extends Vue {}
</script>
<style>
  
  .login{
    position: absolute;

    top: 50%;

    left: 50%;

    transform: translate(-50%,-50%);
  }
  body{
        background-image: url("../assets/bg.webp") ;
        background-size:100%;
  }
</style>
