<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/assets/image/icon.png'; // 로고 이미지 import

// 변수 선언
const router = useRouter();
const logoImage = ref(Logo); // 로고 이미지 참조 추가
const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const verificationCode = ref('');
const isVerificationSent = ref(false);
const verificationTimer = ref(180); // 3분 타이머 (초 단위)
const timerInterval = ref(null);
const errorMessage = ref('');

// 비밀번호 일치 여부 확인
const passwordsMatch = computed(() => {
  if (!password.value || !passwordConfirm.value) return true;
  return password.value === passwordConfirm.value;
});

// 인증번호 발송
const sendVerificationCode = () => {
  if (!email.value) {
    errorMessage.value = '이메일을 입력해주세요.';
    return;
  }

  // 실제 구현에서는 API 호출로 인증번호 발송
  isVerificationSent.value = true;
  errorMessage.value = '';

  // 타이머 시작
  verificationTimer.value = 180;
  if (timerInterval.value) clearInterval(timerInterval.value);

  timerInterval.value = setInterval(() => {
    if (verificationTimer.value > 0) {
      verificationTimer.value--;
    } else {
      clearInterval(timerInterval.value);
      isVerificationSent.value = false;
    }
  }, 1000);
};

// 타이머 포맷팅 (mm:ss)
const formattedTimer = computed(() => {
  const minutes = Math.floor(verificationTimer.value / 60);
  const seconds = verificationTimer.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// 다음 단계로 이동
const submit = () => {
  // 유효성 검사
  if (!username.value) {
    errorMessage.value = '사용자 이름을 입력해주세요.';
    return;
  }

  if (!email.value) {
    errorMessage.value = '이메일을 입력해주세요.';
    return;
  }

  if (!verificationCode.value) {
    errorMessage.value = '인증번호를 입력해주세요.';
    return;
  }

  if (!password.value) {
    errorMessage.value = '비밀번호를 입력해주세요.';
    return;
  }

  if (!passwordConfirm.value) {
    errorMessage.value = '비밀번호 확인을 입력해주세요.';
    return;
  }

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.';
    return;
  }

  // 실제 구현에서는 회원가입 API 호출 후 다음 단계로 이동
  console.log('Form submitted', {
    username: username.value,
    email: email.value,
    password: password.value,
    verificationCode: verificationCode.value
  });

  router.push({ name: 'signup2' });
};

// 컴포넌트 언마운트 시 타이머 정리
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<template>
  <div class="signup-card">
    <!-- 로고 -->
    <div class="logo-container">
      <img :src="logoImage" alt="로고" class="logo" />
    </div>

    <h1 class="signup-title">회원 가입</h1>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- 회원가입 폼 -->
    <form @submit.prevent="submit" class="signup-form">
      <div class="form-group">
        <label for="username">사용자 이름</label>
        <input type="text" id="username" v-model="username" class="form-input" placeholder="이름을 입력하세요" />
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" class="form-input" placeholder="이메일을 입력하세요"
          autocomplete="email" />
      </div>

      <div class="form-group verification-group">
        <label for="verification-code">인증번호</label>
        <div class="verification-container">
          <input type="text" id="verification-code" v-model="verificationCode" class="form-input verification-input"
            placeholder="인증번호 입력" maxlength="6" />
          <button type="button" class="verification-btn" @click="sendVerificationCode">
            {{ isVerificationSent ? '재발송' : '인증' }}
          </button>
        </div>
        <div v-if="isVerificationSent" class="verification-timer">
          인증번호 유효시간: <span class="timer">{{ formattedTimer }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="form-input" placeholder="비밀번호를 입력하세요"
          autocomplete="new-password" />
      </div>

      <div class="form-group">
        <label for="password-confirm">비밀번호 확인</label>
        <input type="password" id="password-confirm" v-model="passwordConfirm" class="form-input"
          :class="{ 'input-error': !passwordsMatch && passwordConfirm }" placeholder="비밀번호를 다시 입력하세요"
          autocomplete="new-password" />
        <div v-if="!passwordsMatch && passwordConfirm" class="password-mismatch">
          비밀번호가 일치하지 않습니다.
        </div>
      </div>

      <button type="submit" class="next-button">
        다음
      </button>
    </form>
  </div>
</template>

<style scoped>
.signup-card {
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

.signup-title {
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

.signup-form {
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

.verification-group {
  position: relative;
}

.verification-container {
  display: flex;
  gap: 10px;
}

.verification-input {
  flex: 1;
}

.verification-btn {
  padding: 0 15px;
  height: 46px;
  background-color: #B8C0C8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  min-width: 80px;
  color: #333;
}

.verification-btn:hover {
  background-color: #98A8B8;
}

.verification-timer {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.timer {
  color: #ff6b6b;
  font-weight: bold;
}

.next-button {
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

.next-button:hover {
  background-color: #98A8B8;
}

/* 모바일 화면에서 이미지 표시 */
@media (max-width: "960px") {
  .signup-container {
    background-image: url('@/assets/image/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .signup-card {
    background-color: rgba(255, 255, 255, 0.95);
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>