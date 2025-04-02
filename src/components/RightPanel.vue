<template>
    <div class="side-panel" :class="{ 'open': isPanelOpen }">
      <div class="header">
        <v-icon icon="mdi-window-close" class="close-btn" @click="closePanel"></v-icon>
      </div>
      <div class="title">
        <span class="title-text">장터</span>
        <hr class="divider">
      </div>
      <div class="nav-items">
        <div class="nav-item">
          <span class="nav-text">글쓰기</span>
        </div>
        <div class="nav-item">
          <span class="nav-text">MY 장터</span>
        </div>
        <div class="nav-item">
          <span class="nav-text">목록으로 보기</span>
        </div>
        <div class="nav-item">
          <span class="nav-text">지도로 보기</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    isPanelOpen: {
      type: Boolean,
      required: true
    },
    closePanel: {
      type: Function,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .side-panel {
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100vh;
    background-color: #f8f8f8; /* 배경색 변경 */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    transition: right 0.3s ease-in-out;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  
  .side-panel.open {
    right: 0;
  }
  
  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: black;
  }
  
  .title {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .title-text {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .divider {
    border: none;
    border-top: 1px solid black;
  }
  
  .nav-items {
    flex-grow: 1;
  }
  
  .nav-item {
    padding: 10px 0;
    font-size: 16px;
  }
  </style>