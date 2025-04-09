<template>
    <div class="login-form pa-8 w-100">
        <div class="text-center mb-8">
            <v-img :src="logoImage" max-width="250" class="mx-auto"></v-img>
        </div>

        <div class="mb-8">
            <h2 class="text-h5 font-weight-medium mb-6 text-center">비밀 번호 찾기</h2>

            <v-form>

                <v-text-field v-model="email" label="이메일" variant="outlined" class="mb-4 rounded-lg" bg-color="white"
                    hide-details></v-text-field>

                <div class="d-flex mb-4">
                    <v-text-field v-model="verificationCode" label="인증번호" variant="outlined" class="rounded-lg mr-2"
                        bg-color="white" hide-details></v-text-field>

                    <v-btn color="grey-lighten-1" class="rounded-lg" height="56" min-width="80">
                        인증
                    </v-btn>
                </div>

                <v-btn block color="grey-lighten-2" class="rounded-lg" height="56" @click="submit">
                    다음
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Logo from '@/assets/image/icon.png' // 로고 이미지 import

// 변수 선언
const router = useRouter();
const logoImage = ref(Logo) // 로고 이미지 참조 추가
const email = ref('')
const verificationCode = ref('')

// 함수 정의
const submit = () => {
    router.push({ name: 'findpwd2' });

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