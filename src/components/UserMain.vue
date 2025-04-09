<script setup>
import { RouterView } from 'vue-router';
import Header from './Header.vue';
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  padding-top: 64px;
  /* 헤더 높이에 맞게 조정 */
}

@media (max-width: 959px) {
  .v-main {
    padding-top: 56px;
    /* 모바일에서 헤더 높이에 맞게 조정 */
  }
}
</style>