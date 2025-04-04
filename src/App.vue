<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import ChatFloatBtn from './components/ChatFloatBtn.vue';

</script>

<template>
  <Header />
  <RouterView />
  <ChatFloatBtn />
</template>
<style scoped></style>
