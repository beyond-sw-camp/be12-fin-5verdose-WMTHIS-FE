<template>
  <v-form class="w-75">
    <!-- 아이콘 + 입력창 묶음 -->
    <div class="input_with_icon mb-4">
      <img :src="logoUrl" alt="아이콘" class="input_icon" />
      <v-text-field v-model="userId" label="아이디" variant="outlined" class="mb-4 rounded-lg" bg-color="white"
        hide-details></v-text-field>
    </div>

    <v-text-field v-model="password" label="비밀번호" type="password" variant="outlined" class="mb-4 rounded-lg"
      bg-color="white" hide-details />

    <v-row class="mt-1 align-center">
      <v-col cols="6">
        <v-checkbox v-model="rememberId" label="아이디 저장"></v-checkbox>
      </v-col>
      <v-col cols="6" class="text-right">
        <a href="#" class="forgot_password" @click.prevent="findPassword">비밀번호 찾기</a>
      </v-col>
    </v-row>

    <!-- 로그인 버튼: 위쪽 마진 축소 -->
    <v-btn block large color="primary" class="mt-2" height="56" @click="login" submit>로그인</v-btn>

    <!-- 회원가입 링크 -->
    <div class="text-center mt-4">
      <a href="#" class="signup_link" @click.prevent="register">회원가입</a>
    </div>

  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Icon from '@/assets/image/icon.png';

const router = useRouter();
const logoUrl = ref(Icon);
const userId = ref('');
const password = ref('');
const rememberId = ref(false);

const login = () => {
  console.log('로그인 시도', userId.value, password.value, rememberId.value);
};

const findPassword = () => {
  console.log('비밀번호 찾기 클릭');
  router.push({ name: 'findpwd1' });
};

const register = () => {
  console.log('회원가입 클릭');
  router.push({ name: 'signup1' });
};
</script>

<style scoped>
.input_with_icon {
  position: relative;
  width: 100%;
}

.input_icon {
  position: absolute;
  top: -120px;
  left: -20px;
  width: 240px;
}

.signup_link:hover {
  text-decoration: underline;
}
</style>
