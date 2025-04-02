<template>
    <v-container class="signup-container">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <h1 class="text-center mb-5">회원 가입</h1>
  
          <v-text-field label="이름" variant="solo" class="signup-input" rounded placeholder="ex) 홍길동"></v-text-field>
          <v-row>
            <v-col cols="8">
              <v-text-field label="아이디" variant="solo" class="signup-input" rounded></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-btn color="primary" size="large" class="check-id-button">중복 확인</v-btn>
            </v-col>
          </v-row>
          <v-text-field label="이메일" variant="solo" class="signup-input" rounded placeholder="ex) wmthis@example.com"></v-text-field>
          <v-text-field label="비밀번호" type="password" variant="solo" class="signup-input" rounded></v-text-field>
          <v-text-field label="비밀번호 확인" type="password" variant="solo" class="signup-input" rounded></v-text-field>
          <v-text-field label="사업자 번호" variant="solo" class="signup-input" rounded placeholder="ex) 123-12-12345 or 123123-1231234 (법인)"></v-text-field>
          <v-text-field label="핸드폰 번호" variant="solo" class="signup-input" rounded placeholder="ex) 010-1234-1234"></v-text-field>
          <v-row>
            <v-col cols="5">
              <v-text-field variant="solo" class="signup-input" rounded></v-text-field>
            </v-col>
            <v-col cols="2" class="text-center">
              -
            </v-col>
            <v-col cols="5">
              <v-text-field variant="solo" class="signup-input" rounded></v-text-field>
            </v-col>
          </v-row>
  
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn class="signup-button mt-5" color="primary">회원가입 하기</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'SignupForm',
  };
  </script>
  
  <style scoped>
  .text-center {
    margin-bottom: 50px;
    font-size: 40px;
  }
  .signup-container {
    margin-top: 50px;
    padding: 20px;
    border-radius: 10px;
  }
  
  .signup-input {
    margin-bottom: 15px;
  }
  
  .signup-button {
    font-weight: bold;
    color: white;
    border-radius: 15px;
    width: 200px;
    height: 50px;
    font-size: 16px;
  }
  
  .check-id-button {
    height: 50px;
    border-radius: 15px;
    color: black;
  }
  </style>