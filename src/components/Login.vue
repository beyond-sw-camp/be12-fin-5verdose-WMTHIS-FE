<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToFindId = (event) => {
  event.preventDefault(); // 기본 동작 막기
  router.push({ name: 'findId' });
};

const goToFindPassword = (event) => {
  event.preventDefault(); // 기본 동작 막기
  router.push({ name: 'findPassword' });
};

const goToSignUp = (event) => {
  event.preventDefault();
  router.push({ name: 'signup' });
};
</script>

<template>
  <div class="login-container">
    <div class="container">
      <img src="../assets/icon.png" alt="Vue logo" width="500" height="200" class="image" />
    </div>
    <v-text-field label="이메일 아이디" variant="solo" class="id-textfield"></v-text-field>
    <v-text-field label="비밀번호" variant="solo" class="password-textfield"></v-text-field>
    <a href="#" class="signup" @click="goToSignUp">회원이 아니신가요?</a>
    <v-btn size="x-large" class="login-button" color="primary">로그인 하기</v-btn>
    <div class="find-container">
      <a href="#" class="findId" @click="goToFindId">아이디 찾기</a>
      <a href="#" class="findPassword" @click="goToFindPassword">비밀번호 찾기</a>
    </div>
  </div>
</template>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30rem;
}

.id-textfield,
.password-textfield {
  margin-bottom: 20px;
  width: 400px;
}

.container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.signup {
  margin-bottom: 20px;
  cursor: pointer; /* 마우스 커서 설정 */
}

.find-container {
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.findPassword {
  margin-left: 20px;
  cursor: pointer; /* 마우스 커서 설정 */
}

.login-button {
  font-weight: bold !important;
  color: white !important;
  border-radius: 15px !important;
}

.image {
  max-width: 100%;
  width: 20rem;
  height: auto;
}
</style>