<script setup>
import { ref, watch, computed } from "vue";
import InventoryRegisterModal from "@/components/inventory_management/InventoryRegisterModal.vue";
import InventoryModifyModal from "@/components/inventory_management/InventoryModifyModal.vue";
import DeleteConfirmModal from "@/components/alerts/DeleteConfirmModal.vue";
import DeleteAlertModal from "@/components/alerts/DeleteAlertModal.vue";

const isModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const isDeleteConfirmOpen = ref(false);
const isDeleteAlertOpen = ref(false); // 삭제 항목 선택 안내 모달
const selectedItem = ref(null);

const openModal = () => {
  modalType.value = "register"; // 이 줄 추가
  isModalOpen.value = true;
};
const openDetailModal = (item) => {
  selectedItem.value = item;
  modalType.value = "modify";
  isModalOpen.value = true;
};

const modalType = ref("register");
const closeModal = () => {
  isModalOpen.value = false;
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
};

const inventory_items = ref([
  {
    name: "마늘",
    unit: "2kg",
    quantity: "1개",
    Expirationdate: "입고일로부터 1일",
    selected: false,
  },
  {
    name: "앞다리살",
    unit: "300g",
    quantity: "1개",
    Expirationdate: "입고일로부터 3일",
    selected: false,
  },
  {
    name: "토마토",
    unit: "1kg",
    quantity: "1개",
    Expirationdate: "입고일로부터 5일",
    selected: false,
  },
  {
    name: "양배추",
    unit: "2kg",
    quantity: "1개",
    Expirationdate: "입고일로부터 1일",
    selected: false,
  },
  {
    name: "우유",
    unit: "1L",
    quantity: "1개",
    Expirationdate: "입고일로부터 3일",
    selected: false,
  },
  {
    name: "올리브유",
    unit: "1L",
    quantity: "1개",
    Expirationdate: "입고일로부터 5일",
    selected: false,
  },
  {
    name: "새우",
    unit: "500g",
    quantity: "1개",
    Expirationdate: "입고일로부터 1일",
    selected: false,
  },
]);

const select_all = ref(false);
const isBlocked = computed(
  () => isDeleteConfirmOpen.value || isDeleteAlertOpen.value
);

// 전체 선택 토글
const toggle_select_all = () => {
  if (!isBlocked.value) {
    inventory_items.value.forEach((item) => (item.selected = select_all.value));
  }
};

// 개별 선택 체크 시 전체 선택 여부 감지
watch(
  inventory_items,
  (new_items) => {
    select_all.value = new_items.every((item) => item.selected);
  },
  { deep: true }
);

// 삭제 확인 모달 열기
const openDeleteConfirm = () => {
  if (!isBlocked.value) {
    const selectedItems = inventory_items.value.some((item) => item.selected);
    if (selectedItems) {
      isDeleteConfirmOpen.value = true;
    } else {
      isDeleteAlertOpen.value = true;
    }
  }
};

// 삭제 확인 모달 닫기
const closeDeleteConfirm = () => {
  isDeleteConfirmOpen.value = false;
};

// 삭제 경고 모달 닫기
const closeDeleteAlert = () => {
  isDeleteAlertOpen.value = false;
};

// 삭제 실행
const deleteSelectedItems = () => {
  isDeleteConfirmOpen.value = false;
  inventory_items.value = inventory_items.value.filter(
    (item) => !item.selected
  );
};
</script>
<template>
  <div class="inventory_container">
    <h1 class="page_title">재고 관리</h1>

    <!-- 검색 바 및 등록/삭제 버튼 -->
    <div class="search_container">
      <div class="search_box">
        <input type="text" class="search_input" placeholder="재료명 검색" />
        <button class="search_btn">
          <img src="@/assets/image/search_button.png" class="search_icon" />
        </button>
      </div>
      <div class="action_buttons">
        <button @click="openModal" class="register_btn">등록</button>
        <button @click="openDeleteConfirm" class="delete_btn">삭제</button>
      </div>
    </div>

    <!-- 상품 목록 -->
    <table class="inventory_table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="select_all" @change="toggle_select_all" class="circle_checkbox" />
          </th>
          <th>재고명</th>
          <th>용량/단위</th>
          <th>최소수량</th>
          <th>소비기한</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in inventory_items" :key="index" :class="{ selected_row: item.selected }">
          <td>
            <input type="checkbox" v-model="item.selected" class="circle_checkbox" />
          </td>
          <td class="bold_text">{{ item.name }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.Expirationdate }}</td>
          <td>
            <button class="detail_btn" @click="openDetailModal(item)">
              상세
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 모달 컴포넌트들 -->
    <InventoryRegisterModal v-if="modalType === 'register'" :isOpen="isModalOpen" @close="closeModal" />

    <InventoryModifyModal v-if="modalType === 'modify'" :isOpen="isModalOpen" :item="selectedItem"
      @close="closeModal" />

    <DeleteConfirmModal :isOpen="isDeleteConfirmOpen" @confirm="deleteSelectedItems" @cancel="closeDeleteConfirm" />
    <DeleteAlertModal :isOpen="isDeleteAlertOpen" @close="closeDeleteAlert" />
  </div>
</template>

<style scoped>
.inventory_container {
  padding: 20px;
  color: #413d3d;
}

.bold_text {
  font-weight: bolder;
  color: #413d3d;
}

/* 제목 */
.page_title {
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #413d3d;
}

/* 검색창 및 버튼 */
.search_container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
}

.search_box {
  display: flex;
  gap: 5px;
  flex: 0.6;
}

.search_input {
  flex: 1;
  max-width: 500px;
  padding: 6px;
  border-bottom: 1px solid #ccc;
}

.selected_row {
  background-color: rgba(206, 222, 239, 0.42);
}

.search_btn {
  padding: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.search_btn:hover {
  background-color: #e0e0e0;
  /* 살짝 회색 배경 */
}

/* 이미지 크기 조정 */
.search_icon {
  width: 24px;
  height: 24px;
}

.detail_btn {
  padding: 8px 12px;
  background-color: #b8c0c8;
  color: black;
  width: 80px;
  border: 1px solid #ccc;
  font-size: 14px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.detail_btn:hover {
  background-color: #98a8b8;
}

.action_buttons {
  display: flex;
  gap: 10px;
}

.register_btn,
.delete_btn {
  padding: 8px 12px;
  background-color: #b8c0c8;
  border: none;
  border-radius: 20px;
  width: 80px;
  cursor: pointer;
  font-weight: bold;
}

.register_btn:hover,
.delete_btn:hover {
  background-color: #98a8b8;
}

/* 테이블 */
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

/* 상단 왼쪽 */
.inventory_table thead tr:first-child th:first-child {
  border-top-left-radius: 20px;
}

/* 상단 오른쪽 */
.inventory_table thead tr:first-child th:last-child {
  border-top-right-radius: 20px;
}

/* 왼쪽 아래 둥글게 */
.inventory_table thead tr:first-child th:first-child {
  border-bottom-left-radius: 20px;
}

/* 오른쪽 아래 둥글게 */
.inventory_table thead tr:first-child th:last-child {
  border-bottom-right-radius: 20px;
}

.inventory_table th {
  background-color: #b8c0c8;
  font-size: 18px;
}

.circle_checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #666;
  border-radius: 50%;
  /* 둥글게 */
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;
}

.circle_checkbox:checked {
  background-color: #708090;
  border-color: #708090;
}

.circle_checkbox:checked::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  background: #708090;
  border-radius: 50%;
}
</style>
