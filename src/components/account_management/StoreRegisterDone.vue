<template>
    <div class="login-form pa-8 w-100">
        <div class="text-center mb-8">
            <v-img :src="logoImage" max-width="250" class="mx-auto"></v-img>
        </div>

        <div class="mb-8">
            <h2 class="text-h5 font-weight-bold mb-10 text-center">
                가게 등록이 <br> 완료되었습니다!
            </h2>
            <v-btn block color="grey-lighten-2" class="rounded-lg" height="56" @click="submit">
                시작하기
            </v-btn>
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

// 함수 정의
const submit = () => {
    router.push({ name: 'signup1' });
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