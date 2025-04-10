<script setup>
import { defineProps, defineEmits, ref } from "vue";
import InventoryCorrectionModal from "@/components/inventory_management/InventoryCorrectionModal.vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);
const isCorrectionModalOpen = ref(false);
const correctionItem = ref(null);
const isParticularModalOpen = ref(false);
const selectedDays = ref("1");
const customDays = ref("");
const isCustomInput = ref(false);
const modalType = ref("");
const isModalOpen = ref(false);
const closeModal = () => {
  isModalOpen.value = false;
};
const openParticularModal = () => {
  isParticularModalOpen.value = true;
};
const openCorrectionModal = (item) => {
  correctionItem.value = item;
  isCorrectionModalOpen.value = false;
  modalType.value = "correction"; // 추가!
  isModalOpen.value = true;
};

const inventory_items = ref([
  {
    store: "2025-04-05",
    totalquantity: "2025-04-08",
    status: "1.6k",
    selected: false,
  },
  {
    store: "2025-04-05",
    totalquantity: "2025-04-08",
    status: "1.2kg",
    selected: false,
  },

  {
    store: "2025-04-05",
    totalquantity: "2025-04-08",
    status: "1kg",
    selected: false,
  },
]);
</script>

<template>
  <v-card>
    <div v-if="isOpen" class="particular_modal_container" @click.self="emit('close')" style="z-index: 2000;">
      <div class="modal">
        <div class="modal_content">
          <div class="modal_header">
            <button class="close_btn" @click="emit('close')">✕</button>

            <h2 class="modal_title">재고 상세</h2>
          </div>
          <div class="input_group">
            <div class="modal_title2">
              <label>재고명</label>
            </div>
            <p class="sub_title">마늘</p>
          </div>

          <div class="input_group">
            <div class="input_row">
              <div class="input_label_group">
                <label>총수량</label>
              </div>
            </div>
            <p class="sub_title">2Kg</p>
          </div>

          <div class="input_group">
            <div class="input_row">
              <div class="input_label_group">
                <label>수량</label>
              </div>
            </div>
            <p class="sub_title">2Kg</p>
          </div>

          <div class="input_group">
            <div class="input_row">
              <div class="input_label_group">
                <label>사용메뉴</label>
              </div>
            </div>
            <p class="sub_title">알리오올리오,감바스</p>
          </div>

          <table class="inventory_table">
            <thead>
              <tr>
                <th>입고날짜</th>
                <th>유통기한</th>
                <th>수량</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in inventory_items" :key="index">
                <td>{{ item.store }}</td>
                <td>{{ item.totalquantity }}</td>
                <td>
                  <span :class="'status ' + item.status">{{
                    item.status
                  }}</span>
                </td>
                <td>
                  <button @click="openCorrectionModal(item)" class="delete_btn">
                    보정
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal_footer">
          <button class="confirm_btn" @click="emit('close')">확인</button>
        </div>
      </div>
      <InventoryParticularModal v-if="modalType === 'particular'" :isOpen="isModalOpen" @close="closeModal" />
      <InventoryCorrectionModal v-if="modalType === 'correction'" :isOpen="isModalOpen" @close="closeModal" />
    </div>
  </v-card>
</template>

<style scoped>
.particular_modal_container {
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
}

.modal_header {
  border-bottom: #ccc solid 1px;
  margin-bottom: 10px;
}

/* 모달 슬라이드 애니메이션 */
.modal {
  width: 33.33%;
  height: 100vh;
  background: white;
  padding: 20px;
  border-left: 1px solid #ddd;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  /* 상단-하단 요소 분리 */
  position: relative;
  display: flex;
  flex-direction: column;

  transform: translateX(100%);
  animation: slideIn 0.3s forwards;
}

/* 모달 안의 스크롤 영역 */
.modal_content {
  position: relative;
  overflow-y: auto;
  flex: 1;
}

/* 등록 버튼 고정 영역 */
.modal_footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  background-color: #fff;
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

/* 오른쪽에서 왼쪽으로 슬라이드 */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

.modal_header {
  border-bottom: #ccc solid 1px;
  padding-bottom: 5px;
  /* 👈 선 위 아래 여백 */
  margin-bottom: 45px;
  /* 👈 선 아래 전체 여백 (원하시는 만큼 늘리세요) */
}

.modal_title2 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal_title2.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.min_qty_input {
  width: 80px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 14px;
  text-align: right;
}

.title_warn {
  font-size: 14px;
  color: red;
  font-weight: bold;
}

.close_btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}

.modal_title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}

.sub_title {
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: #666;
  justify-content: flex-end;
  /* 🌟 오른쪽 정렬 */
}

.modal_desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.tab_inventory {
  display: flex;
  border-bottom: none;
  margin-bottom: 15px;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.inventory_table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.inventory_table th,
.inventory_table td {
  padding: 12px;
  text-align: center;
}

.inventory_table td {
  border-bottom: #d1d5c2 solid 1px;
}

.inventory_table th {
  background-color: #b8c0c8;
  font-size: 18px;
}

.tab_inventory button {
  flex: 1;
  /* 버튼을 가로로 균등하게 배치 */
  padding: 6px 30px;
  /* 높이를 줄이고 가로 길이를 늘림 */
  background-color: #b8c0c8;
  /* 기본 색 */
  border: 2px solid #b8c0c8;
  border-radius: 30px;
  /* 더 길쭉한 느낌 */
  font-size: 14px;
  /* 폰트 크기도 살짝 줄임 */
  cursor: pointer;
  color: black;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  text-align: center;
}

.tab_inventory button:hover {
  background-color: #9fa6ad;
}

.tab_inventory button.active {
  background-color: #858b91;
  color: white;
  border-color: #858b91;
}

.ingredient_inputs {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.ingredient_inputs select,
.ingredient_inputs input {
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.add_btn {
  flex-shrink: 0;
  padding: 10px 14px;
  background: #c8c8c8;
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
}

.add_btn:hover {
  background: #9fa6ad;
}

/* 추가된 재료 리스트 스타일 */
.tag_container {
  margin-top: 5px;
  margin-bottom: 30px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  background-color: #dbe2ea;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
}

.remove_btn {
  background: none;
  border: none;
  color: black;
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
}

.input_group input,
.input_group select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 14px;
}

.input_group label {
  font-size: 16px;
  color: #222;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.input_group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.confirm_btn {
  margin-top: auto;
  padding: 10px;
  background: #b1d5c2;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
}

.confirm_btn:hover {
  background: #8cbfa4;
}

.custom_solid_autocomplete {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 14px;
}

.unit_container {
  display: flex;
  align-items: center;
  gap: 8px;
  /* 입력 필드와 드롭다운 사이 간격 */
}

.unit_input,
.unit_select {
  height: 45px;
  /* 동일한 높이 */
  border-radius: 20px;
  /* 둥근 모서리 */
  border: 1px solid #ccc;
  padding: 0 12px;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: flex-end;
}

.unit_input {
  width: 80px;
  /* 숫자 입력 필드 크기 */
}

.unit_select {
  width: 80px;
  /* 드롭다운 크기 */
  appearance: none;
  /* 기본 스타일 제거 */
  background: white url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='gray'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E") no-repeat right 10px center;
  background-size: 16px;
}

.button_group {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 🌟 가운데 정렬 */
  gap: 8px;
}

.v-btn {
  min-width: 60px;
  /* 모든 버튼 크기 일정하게 */
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
}

.selected_btn {
  background-color: #c8c8c8 !important;
  font-weight: bold;
}

.custom_input {
  width: 10px !important;
  /* 직접입력 칸의 가로 크기 */
  height: 40px !important;
  /* 버튼과 동일한 높이 */
  text-align: center;
  font-size: 14px;
  padding: 0;
}

.fixed_text {
  margin-left: 8px;
  font-size: 14px;
}

.input_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.delete_btn {
  padding: 8px 12px;
  background-color: #b8c0c8;
  border: none;
  border-radius: 20px;
  width: 80px;
  cursor: pointer;
  font-weight: bold;
}

.input_label_group {
  display: flex;
  align-items: center;
  gap: 6px;
  /* label과 (필수) 사이 간격 조절 */
}

.min_qty_input {
  width: 80px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 14px;
  text-align: right;
}
</style>
