<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/assets/image/icon.png'; // 로고 이미지 import

// 변수 선언
const router = useRouter();
const logoImage = ref(Logo); // 로고 이미지 참조 추가
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// 비밀번호 일치 여부 확인
const passwordsMatch = computed(() => {
    if (!newPassword.value || !confirmPassword.value) return true;
    return newPassword.value === confirmPassword.value;
});

// 완료 버튼 클릭
const submit = () => {
    // 유효성 검사

    if (!newPassword.value) {
        errorMessage.value = '새 비밀번호를 입력해주세요.';
        return;
    }

    if (!confirmPassword.value) {
        errorMessage.value = '새 비밀번호 확인을 입력해주세요.';
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = '새 비밀번호가 일치하지 않습니다.';
        return;
    }
    // 비밀번호 변경 완료 후 로그인 페이지로 이동
    router.push({ name: 'login' });
};
</script>

<template>
    <div class="reset-card">
        <!-- 로고 -->
        <div class="logo-container">
            <img :src="logoImage" alt="로고" class="logo" />
        </div>

        <h1 class="reset-title">비밀번호 찾기</h1>

        <!-- 에러 메시지 -->
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <!-- 비밀번호 변경 폼 -->
        <form @submit.prevent="submit" class="reset-form">
            <div class="form-group">
                <label for="new-password">새 비밀번호</label>
                <input type="password" id="new-password" v-model="newPassword" class="form-input"
                    placeholder="새 비밀번호를 입력하세요" />
            </div>

            <div class="form-group">
                <label for="confirm-password">새 비밀번호 확인</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" class="form-input"
                    :class="{ 'input-error': !passwordsMatch && confirmPassword }" placeholder="새 비밀번호를 다시 입력하세요" />
                <div v-if="!passwordsMatch && confirmPassword" class="password-mismatch">
                    비밀번호가 일치하지 않습니다.
                </div>
            </div>

            <button type="submit" class="complete-button">
                완료
            </button>
        </form>
    </div>
</template>

<style scoped>
.reset-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
}

.reset-card {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 400px;
    padding: 40px 30px;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.logo {
    max-width: 250px;
    height: auto;
}

.reset-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.error-message {
    background-color: #fff0f0;
    color: #e74c3c;
    padding: 12px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    text-align: center;
}

.reset-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    margin-bottom: 5px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
    color: #333;
}

.form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
    background-color: white;
}

.form-input:focus {
    border-color: #708090;
    outline: none;
}

.input-error {
    border-color: #e74c3c;
}

.password-mismatch {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
}

.complete-button {
    width: 100%;
    padding: 14px;
    background-color: #B8C0C8;
    color: #333;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
    height: 56px;
}

.complete-button:hover {
    background-color: #98A8B8;
}

/* 모바일 화면에서 이미지 표시 */
@media (max-width: 960px) {
    .reset-container {
        background-image: url('@/assets/image/background.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .reset-card {
        background-color: rgba(255, 255, 255, 0.95);
        width: 90%;
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>