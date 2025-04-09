<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row no-gutters class="fill-height">
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <v-img :src="imageUrl" cover aspect-ratio="1"></v-img>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center pa-6">
          <div class="text-center mb-6">
            <v-img :src="logoUrl" max-width="150" contain></v-img>
          </div>
          <v-form class="w-75">
            <!-- 아이콘 + 입력창 묶음 -->
            <div class="input_with_icon mb-4">
              <img :src="logoUrl" alt="아이콘" class="input_icon" />
              <v-text-field v-model="userId" label="아이디" outlined dense required></v-text-field>
            </div>

            <v-text-field v-model="password" label="비밀번호" type="password" outlined dense class="mb-2" />

            <v-row class="mt-1 align-center">
              <v-col cols="6">
                <v-checkbox v-model="rememberId" label="아이디 저장"></v-checkbox>
              </v-col>
              <v-col cols="6" class="text-right">
                <a href="#" class="forgot_password" @click.prevent="findPassword">비밀번호 찾기</a>
              </v-col>
            </v-row>

            <!-- 로그인 버튼: 위쪽 마진 축소 -->
            <v-btn block large color="primary" class="mt-2" @click="login" submit>로그인</v-btn>

            <!-- 회원가입 링크 -->
            <div class="text-center mt-2">
              <a href="#" class="signup_link" @click.prevent="register">회원가입</a>
            </div>

          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginImage from '../assets/image/background.png';
import Icon from '../assets/image/icon.png';

const router = useRouter();
const imageUrl = ref(LoginImage);
const logoUrl = ref(Icon);
const userId = ref('');
const password = ref('');
const rememberId = ref(false);

const login = () => {
  console.log('로그인 시도', userId.value, password.value, rememberId.value);
};

const findPassword = () => {
  console.log('비밀번호 찾기 클릭');
};

const register = () => {
  console.log('회원가입 클릭');
  router.push({ name: 'signup' });
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
