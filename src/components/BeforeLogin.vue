<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goToSignUp = () => {
  router.push('signup');
};
const goToLogin = () => {
  router.push('login');
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
        <v-btn rounded="xl" class="btn_template btn_font" color="primary" @Click = goToSignUp>회원가입</v-btn>
      </div>
      <div>
        <v-btn rounded="xl" class="btn_template btn_font" color="primary" @Click = goToLogin>회원이에요</v-btn>
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
  align-items: center; /* 세로 정렬 */
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>