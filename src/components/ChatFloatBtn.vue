<template>
    <v-app>
      <v-main>
        <v-container>
          <div style="height: 2000px;">
          </div>
        </v-container>
  
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 100;">
          <v-btn fab color="#B1D5C2" @click="toggleComponent">
            <v-icon color="white" :icon="iconName"></v-icon>
          </v-btn>
  
          <ChatComponent :showComponent="showComponent">
          </ChatComponent>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ChatComponent from './ChatComponent.vue'; // ChatComponent 임포트
  
  const showComponent = ref(false);
  
  const toggleComponent = () => {
    showComponent.value = !showComponent.value;
  };
  
  const iconName = computed(() => {
    return showComponent.value ? 'mdi-close' : 'mdi-chat';
  });
  </script>