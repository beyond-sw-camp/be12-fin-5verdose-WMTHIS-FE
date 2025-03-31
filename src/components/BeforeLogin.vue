<script setup>
// 별도 로직 없음
</script>

<template>
  <div class="background">
    <!-- 왼쪽: 이미지 -->
    <div class="left_picture">
      <img src="../../img/image.png" alt="샐러드 이미지" class="background_img" />
    </div>

    <!-- 오른쪽: 텍스트 + 버튼 -->
    <div class="right_content">
      <img src="../../img/icon.png" alt="샐러드 이미지" class="right_logo_img" />
      <div>
        <p class="right_letter">자동화된 재고관리부터</p>
        <h1 class="right_letter right_letter_bold">다~ 되는 WMTHIS POS</h1>
      </div>
      <div>
        <v-btn rounded="xl" class="btn_template btn_font">회원가입</v-btn>
      </div>
      <div>
        <v-btn rounded="xl" class="btn_template btn_font">회원이에요</v-btn>
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
  width: 50%;
}
.background_img {
  width: 100%;
  height: 100%;
}

.right_content {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.875rem;
  background-color: #eeeeee;
}

.right_logo_img {
  width: 50%;
  height: 20%;
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
  background-color: #666666;
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
