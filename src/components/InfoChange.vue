<template>
    <v-container class="store-info-container">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <h1 class="text-center mb-8">회원 정보 수정</h1>
  
          <v-row>
            <v-col cols="6">
              <p>이름</p>
            </v-col>
            <v-col cols="6">
              <p>홍길동</p>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="6">
              <p>이메일</p>
            </v-col>
            <v-col cols="6">
              <p>wmthis@wmthis.com</p>
            </v-col>
          </v-row>
  
          <v-row style="margin-bottom: 50px;">
            <v-col cols="6">
              <p>사업자번호</p>
            </v-col>
            <v-col cols="6">
              <p>123-12-12345</p>
            </v-col>
          </v-row>
  
          <v-text-field
            label="새 비밀번호"
            variant="solo"
            type="password"
            class="store-input"
            rounded
          ></v-text-field>
  
          <v-text-field
            label="비밀번호 확인"
            variant="solo"
            type="password"
            class="store-input"
            rounded
          ></v-text-field>
  
          <v-text-field
            label="핸드폰 번호"
            variant="solo"
            class="store-input"
            rounded
            placeholder="ex) 010-1234-1234"

          value="010-1234-5678"
          ></v-text-field>
  
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