<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'; // ref 가져오기

const router = useRouter();
const isSignup = ref(true); // 상태 관리 변수 추가

const upButtonClick = () => {
  if (!isSignup.value) {
    router.push({ name: 'signup' });
  } else {
    router.push({ name: 'storeRegister' });
  }
};
const downButtonClick = () => {
  if (!isSignup.value) {
    router.push({ name: 'login' });
  } else {
    router.push({ name: 'main' });
  }
};
</script>

<template>
  <div class="background">
    <div class="left_picture">
      <img src="../../img/image.png" alt="샐러드 이미지" class="background_img" />
    </div>

    <div class="right_content">
      <img src="../assets/icon.png" alt="로고 이미지" class="right_logo_img" />
      <div>
        <p class="right_letter">자동화된 재고관리부터</p>
        <h1 class="right_letter right_letter_bold">다~ 되는 WMTHIS POS</h1>
      </div>
      <div>
        <v-btn
          rounded="xl"
          class="btn_template btn_font"
          color="primary"
          @click="upButtonClick"
        >
          {{ !isSignup ? '회원가입' : '내 가게 POS' }}
        </v-btn>
      </div>
      <div>
        <v-btn
          rounded="xl"
          class="btn_template btn_font"
          color="primary"
          @click="downButtonClick"
        >
          {{ !isSignup ? '회원이에요' : '장터' }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.left_picture {
  width: 30%;
}
.background_img {
  width: 100%;
  height: 100%;
}

.right_content {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.875rem;
  background-color: #FFFEFB;
}

.right_logo_img {
  width: 50%;
  height: 0%;
}

.right_letter {
  font-size: 40px;
}

.right_letter_bold {
  font-weight: 900;
}

.btn_font {
  font-size: 25px;
  color: white;
  width: 280px;
}
.btn_template {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>