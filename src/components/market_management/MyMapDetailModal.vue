<script setup>
import { ref } from "vue";

const props = defineProps({
  item: Object, // 전달된 상품 데이터
});

const price = ref("");
const quantity = ref("");
const description = ref("");
const paymentMethod = ref("만나서결제");
const emit = defineEmits(["close"]);

const handleClosePanel = () => {
  emit("close"); // 부모에게 "닫아줘!" 라고 알림
};
</script>

<template>
  <div class="detail_modal">
    <div class="title">
      <h1 class="title_left">{{ item.name }}</h1>
      <div class="title_right">
        <button class="close_btn" @click="handleClosePanel"><img src="@/assets/image/xMark.png"
            class="x_button" /></button>
        <p class="title_store">{{ item.store }}</p>
      </div>
    </div>

    <div class="price_quantity">
      <div>
        <label>희망가격 <span style="color: red">(필수)</span></label>
        <div class="detail_message">구입 희망가격을 입력해주세요</div>
      </div>
      <div><input type="number" class="no_spinner number_insert" v-model="price" /> 원</div>
    </div>

    <div class="price_quantity">
      <div>
        <label>수량 <span style="color: red">(필수)</span></label>
        <div class="detail_message">물품의 수량을 입력해주세요</div>
      </div>
      <div><input type="number" class="no_spinner number_insert" v-model="quantity" /> {{ item.unit }}</div>
    </div>

    <!-- 이미지 영역 -->
    <div class="image_area">
      <img :src="item.images[0]" alt="마늘 이미지" class="main_image" />
      <div class="thumbnail_area">
        <img :src="item.images[1]" alt="썸네일1" />
        <img :src="item.images[2]" alt="썸네일2" />
      </div>
    </div>

    <!-- 설명 -->
    <div class="description_area">
      <label>물품 설명</label>
      <div class="description_item">{{ item.description }}</div>
    </div>

    <!-- 결제 방법 및 날짜 -->
    <div class="payment_section">
      <label>결제방법 <span style="color: red">(필수)</span></label>
      <select v-model="paymentMethod" class="method_select">
        <option>만나서결제</option>
        <option>계좌이체</option>
      </select>
      <div class="date_info">
        <div>
          유통기한<span>{{ item.expireDate }} {{ item.expire }}</span>
        </div>
        <div>
          등록날짜<span>{{ item.regDate }}</span>
        </div>
      </div>
    </div>
    <button class="request_button">거래 요청</button>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  width: 100%;
  height: 10%;
}

.title_left {
  width: 15%;
}

.title_right {
  width: 85%;
  position: relative;
}

.x_button {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10000;
  /* 다른 요소보다 위로 */
  width: 20px;
  height: 20px;
}

.title_store {
  margin-left: 20px;
}

.price_quantity {
  display: flex;
  width: 100%;
  height: 5%;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
}

.detail_modal {
  width: 520px;
  height: 750px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: white;
  font-family: sans-serif;
}

.price_quantity input,
input.no_spinner {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ccc;
  text-align: right;
  padding: 0 10px;
}

input.no_spinner {
  margin-right: 10px;
}

.detail_modal input[type="number"] {
  -moz-appearance: textfield;
}

.image_area {
  width: 100%;
  height: 25%;
  margin-top: 20px;
  display: flex;
}

.image_area .main_image {
  width: 70%;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.thumbnail_area {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 8px;
  margin-left: 15px;
  justify-content: space-between;
}

.thumbnail_area img {
  width: 100%;
  height: 45%;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.description_area {
  margin-top: 20px;
  height: 25%;
}

.description_item {
  width: 100%;
  height: 80%;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  resize: none;
  box-sizing: border-box;
  margin-top: 10px;
}

.payment_section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
}

.method_select {
  border-radius: 10px;
  padding: 7px 30px 7px 15px;
  border: 1px solid #ccc;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,<svg fill="gray" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 25px;
}

.date_info {
  margin-top: 10px;
  font-size: 14px;
  color: black;
}

.date_info span {
  margin-left: 15px;
  color: #6d6d6d;
}

.request_button {
  width: 100%;
  height: 40px;
  background-color: #b1d5c2;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
}

.detail_message {
  font-size: 13px;
  color: #6d6d6d;
}

input.no_spinner::-webkit-outer-spin-button,
input.no_spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
