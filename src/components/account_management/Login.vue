<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = '이메일과 비밀번호를 모두 입력해주세요.';
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = '';

    // 실제 구현에서는 API 호출로 로그인 처리
    await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션

    // 로그인 성공 시 로컬 스토리지에 아이디 저장 (아이디 저장 체크 시)
    if (rememberMe.value) {
      localStorage.setItem('savedEmail', email.value);
    } else {
      localStorage.removeItem('savedEmail');
    }

    // 로그인 성공 후 대시보드로 이동
    router.push({ name: 'dashboard' });
  } catch (error) {
    errorMessage.value = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
    console.error('로그인 오류:', error);
  } finally {
    isLoading.value = false;
  }
};

const goToSignUp = () => {
  router.push({ name: 'signup1' });
};

const goToForgotPassword = () => {
  router.push('findpwd1');
};

// 페이지 로드 시 저장된 이메일 불러오기
const loadSavedEmail = () => {
  const savedEmail = localStorage.getItem('savedEmail');
  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.value = true;
  }
};

// 컴포넌트 마운트 시 저장된 이메일 불러오기
onMounted(loadSavedEmail);
</script>

<template>
  <div class="login-card">
    <!-- 로고 -->
    <div class="logo-container">
      <img src="@/assets/image/icon.png" alt="WMTHIS 로고" class="logo" />
    </div>

    <h1 class="login-title">로그인</h1>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- 로그인 폼 -->
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">이메일 아이디</label>
        <input type="email" id="email" v-model="email" class="form-input" placeholder="이메일을 입력하세요"
          autocomplete="email" />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="form-input" placeholder="비밀번호를 입력하세요"
          autocomplete="current-password" />
      </div>

      <div class="login-options">
        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="rememberMe" class="remember-checkbox" />
          <label for="remember" class="remember-label">아이디 저장</label>
        </div>

        <a @click="goToForgotPassword" class="forgot-password">비밀번호 찾기</a>
      </div>

      <button type="submit" class="login-button" :disabled="isLoading">
        <span v-if="isLoading">로그인 중...</span>
        <span v-else>로그인</span>
      </button>
    </form>

    <div class="signup-link">
      계정이 없으신가요? <a @click="goToSignUp" class="signup-text">회원가입</a>
    </div>
  </div>
</template>

<style scoped>
.login-card {
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
  height: 60px;
  /* 실제 로고 크기에 맞게 조정 */
}

.login-title {
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

.login-form {
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
}

.form-input:focus {
  border-color: #708090;
  outline: none;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #B8C0C8;
  border-radius: 3px;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.remember-checkbox:checked {
  background-color: #708090;
  border-color: #708090;
}

.remember-checkbox:checked::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.remember-label {
  cursor: pointer;
  color: #666;
}

.forgot-password {
  color: #708090;
  text-decoration: none;
  cursor: pointer;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #708090;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background-color: #5A6978;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.signup-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.signup-text {
  color: #708090;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-left: 5px;
}

.signup-text:hover {
  text-decoration: underline;
}
</style>