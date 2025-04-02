<template>
    <v-container class="store-info-container">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <h1 class="text-center mb-8">회원 정보 수정</h1>
  
  
          <v-row style="margin-bottom: 50px;">
            <v-col cols="6">
              <p>매장명</p>
            </v-col>
            <v-col cols="6">
              <p>o o 떡볶이</p>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="8">
              <v-text-field  variant="solo" class="store-input"  placeholder="주소를 입력해주세요"  value="동작구" rounded></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn class="postal-code-button" rounded>우편번호 검색</v-btn>
            </v-col>
          </v-row>
          
          <v-text-field  variant="solo" class="store-input" placeholder="상세주소를 입력해주세요" value="보라매로 87" rounded></v-text-field>
  
          <v-text-field     variant="solo" class="store-input" 
          value="010-1234-5678" rounded></v-text-field>
  
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn class="submit-button mt-8" rounded>수정</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "StoreInfoForm",
  };
  </script>
  
  <style scoped>
  .store-info-container {
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
  }
  
  .store-input {
    margin-bottom: 16px;
  }
  
  .submit-button {
    background-color: #808080;
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