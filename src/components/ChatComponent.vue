<template>
    <v-slide-y-transition>
      <v-card v-if="showComponent" width="150" height="150" color="#f5f5f5" outlined style="position: absolute; bottom: 60px; right: 0;">
        <slot>채팅방이 될 곳이에요</slot>
      </v-card>
    </v-slide-y-transition>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    showComponent: {
      type: Boolean,
      required: true,
    },
  });
  </script>