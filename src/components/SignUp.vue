<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <v-row no-gutters class="fill-height">
          <!-- 왼쪽 이미지 섹션 -->
          <v-col cols="12" md="8" class="d-none d-md-flex">
            <v-img :src="restaurantImage" cover height="100%" class="restaurant-image"></v-img>
          </v-col>

          <!-- 오른쪽 로그인 폼 섹션 -->
          <v-col cols="12" md="4" class="login-form-container d-flex align-center">
            <div class="login-form pa-8 w-100">
              <div class="text-center mb-8">
                <v-img :src="logoImage" max-width="250" class="mx-auto"></v-img>
              </div>

              <div class="mb-8">
                <h2 class="text-h5 font-weight-medium mb-6 text-center">회원 가입</h2>

                <v-form>
                  <v-text-field v-model="username" label="사용자 이름" variant="outlined" class="mb-4 rounded-lg"
                    bg-color="white" hide-details></v-text-field>

                  <v-text-field v-model="password" label="패스워드 입력하세요" variant="outlined" type="password"
                    class="mb-4 rounded-lg" bg-color="white" hide-details></v-text-field>

                  <div class="d-flex mb-4">
                    <v-text-field v-model="verificationCode" label="인증번호" variant="outlined" class="rounded-lg mr-2"
                      bg-color="white" hide-details></v-text-field>

                    <v-btn color="grey-lighten-1" class="rounded-lg" height="56" min-width="80">
                      확인
                    </v-btn>
                  </div>

                  <div class="d-flex mb-6">
                    <v-text-field v-model="registrationNumber" label="주민등록번호" variant="outlined" class="rounded-lg mr-2"
                      bg-color="white" hide-details></v-text-field>

                    <v-btn color="grey-lighten-1" class="rounded-lg" height="56" min-width="80">
                      인증하기
                    </v-btn>
                  </div>

                  <v-btn block color="grey-lighten-2" class="rounded-lg" height="56" @click="submit">
                    다음
                  </v-btn>
                </v-form>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import Background from '../assets/image/background.png'
import Logo from '../assets/image/icon.png' // 로고 이미지 import

// 변수 선언
const restaurantImage = ref(Background)
const logoImage = ref(Logo) // 로고 이미지 참조 추가
const username = ref('')
const password = ref('')
const verificationCode = ref('')
const registrationNumber = ref('')

// 함수 정의
const submit = () => {
  // 폼 제출 로직
  console.log('Form submitted', {
    username: username.value,
    password: password.value,
    verificationCode: verificationCode.value,
    registrationNumber: registrationNumber.value
  })
}
</script>

<style scoped>
.login-form-container {
  background-color: #f8f5f1;
}

/* 모바일 화면에서 이미지 표시 */
@media (max-width: 960px) {
  .v-application {
    background-image: url('../assets/image/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .login-form-container {
    background-color: rgba(248, 245, 241, 0.95);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>