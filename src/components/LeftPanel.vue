<template>
    <div class="side-panel-left side-panel" :class="{ 'open': isPanelOpen }">
      <div class="header">
        <v-icon icon="mdi-window-close" class="close-btn" @click="closePanel"></v-icon>
        <div class="user-info">
          <span class="user-name">ㅇㅇㅇ님</span>
          <span class="edit-info">정보 수정</span>
        </div>
      </div>
      <div class="nav-items">
        <div class="nav-item">
          <v-icon icon="mdi-home" class="nav-icon"></v-icon>
          <span class="nav-text">메인 페이지</span>
        </div>
        <div class="nav-item">
          <v-icon icon="mdi-credit-card-outline" class="nav-icon"></v-icon>
          <span class="nav-text">거래 내역</span>
        </div>
        <div class="nav-item">
          <v-icon icon="mdi-cog-outline" class="nav-icon"></v-icon>
          <span class="nav-text">내 가게 관리</span>
        </div>
        <div class="nav-item">
          <v-icon icon="mdi-cart-outline" class="nav-icon"></v-icon>
          <span class="nav-text">장터 이동</span>
        </div>
      </div>
      <div class="logout-btn">
        <v-icon icon="mdi-logout" class="logout-icon"></v-icon>
        <span class="logout-text">로그아웃</span>
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
  .side-panel-left {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100vh;
    background-color: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    transition: left 0.3s ease-in-out;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  
  .side-panel-left.open {
    left: 0;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: black;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .user-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .edit-info {
    font-size: 14px;
    color: gray;
  }
  
  .nav-items {
    flex-grow: 1;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
  
  .nav-icon {
    margin-right: 10px;
  }
  
  .nav-text {
    font-size: 16px;
  }
  
  .logout-btn {
    display: flex;
    align-items: center;
    padding: 10px 0;
    color: red;
  }
  
  .logout-icon {
    margin-right: 10px;
  }
  
  .logout-text {
    font-size: 16px;
    font-weight: bold;
  }
  </style>