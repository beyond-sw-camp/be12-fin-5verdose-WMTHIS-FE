<script setup>
import { ref, watch } from "vue";
import { marketApi } from "@/api/MarketApi.js";

import dayjs from 'dayjs';
const props = defineProps({
  isOpen: Boolean,
  item: {
    type: Object,
    required: true,
  },
});



const form = ref({
  inventorySaleId: "",
  name: "",
  storeName: "",
  price: "",
  quantity: "",
  description: "",
  expiryDate: "",
  createdDate: "",
  imageUrls: [],
  method: "만나서결제"
});

const methodMap = {
  "만나서결제": "cash",
  "카드결제": "credit_card"
};

const price = ref("");
const quantity = ref("");
const description = ref("");
const paymentMethod = ref("만나서결제");
const emit = defineEmits(["close"]);


const setItemData = (item) => {
  console.log("item" + item.value);
  form.value.inventorySaleId = item.id;
  form.value.name = item.inventoryName;
  form.value.storeName = item.sellerStoreName;
  form.value.price = item.price;
  form.value.quantity = item.quantity;
  form.value.description = item.content;
  form.value.expiryDate = item.expiryDate;
  form.value.createdDate = item.createdDate;
  form.value.imageUrls = item.imageUrls;
  console.log(form.value);
};

// 구매 요청 보내고 닫기
const sendTradeRequest = () => {

  const data = {
    inventorySaleId: form.value.inventorySaleId,
    inventoryName: form.value.name,
    quantity: form.value.quantity,
    price: form.value.price,
    method: methodMap[form.value.method] || "cash"
  }
  console.log(data);

  const response = marketApi.registerPurchase(data);

  // 서버 에러일때
  if (!response) {

  } else {
    const code = response.code;
    if (code === 200) {

      handleClosePanel();
    }

  }

  handleClosePanel();
}
const getDday = (expirationDate) => {
  const today = dayjs();
  const exp = dayjs(expirationDate);
  const diff = exp.diff(today, 'day');

  if (diff > 0) return `D-${diff}`;
  else if (diff === 0) return 'D-day';
  else return `D+${Math.abs(diff)}`;
};

const handleClosePanel = () => {
  emit("close");
};


watch(() => props.item, (newItem) => {
  console.log('새로 받은 아이템:', newItem);
  if (newItem) setItemData(newItem);
});
</script>

<template>
  <div v-if="isOpen" class="modal_overlay" @click.self="emit('close')">
    <div class="modal">
      <div class="detail_modal">
        <div class="title">
          <h1 class="title_left">{{ form.name }}</h1>
          <div class="title_right">
            <button class="close_btn" @click="handleClosePanel"><img src="@/assets/image/xMark.png"
                class="x_button" /></button>
            <p class="title_store">{{ form.storeName }}</p>
          </div>
        </div>

        <div class="price_quantity">
          <div>
            <label>희망가격 <span style="color: red">(필수)</span></label>
            <div class="detail_message">구입 희망가격을 입력해주세요</div>
          </div>
          <div><input type="number" class="no_spinner number_insert" v-model="form.price" /> 원</div>
        </div>

        <div class="price_quantity">
          <div>
            <label>수량 <span style="color: red">(필수)</span></label>
            <div class="detail_message">물품의 수량을 입력해주세요</div>
          </div>
          <div><input type="number" class="no_spinner number_insert" v-model="form.quantity" /> {{ item.unit }}</div>
        </div>

        <!-- 이미지 영역 -->
        <div class="image_area">
          <img v-if="form.imageUrls.length" :src="form.imageUrls[0]" alt="대표 이미지" class="main_image" />
          <div class="thumbnail_area">
            <img v-for="(img, index) in form.imageUrls.slice(1)" :key="index" :src="img" :alt="`썸네일 ${index + 1}`" />
          </div>
        </div>

        <!-- 설명 -->
        <div class="description_area">
          <label>물품 설명</label>
          <div class="description_item">{{ form.description }}</div>
        </div>

        <!-- 결제 방법 및 날짜 -->
        <div class="payment_section">
          <label>결제방법 <span style="color: red">(필수)</span></label>
          <select v-model="form.method" class="method_select">
            <option>만나서결제</option>
            <option>카드결제</option>
          </select>
          <div class="date_info">
            <div>
              유통기한<span>{{ form.expiryDate }} {{ getDday(form.expiryDate) }}</span>
            </div>
            <div>
              등록날짜<span>{{ form.createdDate }}</span>
            </div>
          </div>
        </div>
        <button class="request_button" @click=sendTradeRequest>거래 요청</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
  z-index: 2000;
}

/* 페이드인 효과 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal {
  height: 100vh;
  background: white;
  border-left: 1px solid #ddd;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  animation: slideIn 0.3s forwards;
}

/* 오른쪽에서 왼쪽으로 슬라이드 */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

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