<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Menu from "./components/Menu.vue";
</script>

<template>
  <Header />
  <RouterView />
  <!-- Сюда будут подставляться HomeView и MenuView -->
  <Menu />
</template>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
}
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background: linear-gradient(360deg, #03a8ef 0%, #0371ef 100%);
}

button {
  border: none;
  background-color: unset;
  cursor: pointer;
}
</style>
