<template>
    <v-container class="store-info-container">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <h1 class="text-center mb-8">매장 정보를 입력하세요</h1>
  
          <v-text-field label="매장명" variant="solo" class="store-input" rounded></v-text-field>
  
          <v-row>
            <v-col cols="8">
              <v-text-field label="주소" variant="solo" class="store-input" rounded></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn class="postal-code-button" rounded>우편번호 검색</v-btn>
            </v-col>
          </v-row>
  
          <v-text-field label="상세 주소" variant="solo" class="store-input" rounded></v-text-field>
  
          <v-text-field label="매장 전화 번호" variant="solo" class="store-input" rounded></v-text-field>
  
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn class="next-button mt-8">다음</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'StoreInfoForm',
  };
  </script>
  
  <style scoped>
  .store-info-container {
    height: 100vh; /* 화면 전체 높이로 설정 */
    display: flex;
    align-items: center; /* 세로 가운데 정렬 */
  }
  
  
  .postal-code-button {
    background-color: #e0e0e0; /* 연한 회색 버튼 배경색 */
    color: black;
    font-weight: bold;
  }
  
  .next-button {
    background-color: #808080; /* 회색 버튼 배경색 */
    color: white;
    font-weight: bold;
    border-radius: 20px;
    width: 200px;
    height: 50px;
    font-size: 16px;
  }
  
  .text-center {
    margin-bottom: 50px !important;
  }
  </style>