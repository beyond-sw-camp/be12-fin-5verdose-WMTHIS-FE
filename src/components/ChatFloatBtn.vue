<template>
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 100;">
          <v-btn fab color="#B1D5C2" @click="toggleComponent">
            <v-icon color="white" :icon="iconName"></v-icon>
          </v-btn>
  
          <ChatComponent :showComponent="showComponent">
          </ChatComponent>
        </div>
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