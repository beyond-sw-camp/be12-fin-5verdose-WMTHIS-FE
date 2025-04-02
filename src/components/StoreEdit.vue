<script setup>
import SideBar from './SideBar.vue';
import MyMenu from './MyMenu.vue';
</script>

<template>
  <div class="main">
    <SideBar></SideBar>
    <div class="mymenu_container">
      <MyMenu></MyMenu>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 0;
  display: flex;
}
.mymenu_container {
  width: 100%;
}
</style>
