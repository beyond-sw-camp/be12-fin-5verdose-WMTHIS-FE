<script setup>
import { ref, watch, computed } from "vue";
import InventoryCorrectionModal from "@/components/inventory_management/InventoryCorrectionModal.vue";
import InventoryStoreModal from "@/components/inventory_management/InventoryStoreModal.vue";
import DeleteConfirmModal from "@/components/alerts/DeleteConfirmModal.vue";
import DeleteAlertModal from "@/components/alerts/DeleteAlertModal.vue";
import InventoryParticularModal from "@/components/inventory_management/InventoryParticularModal.vue";

import InventorySaleModal from "@/components/inventory_management/InventorySaleModal.vue";

const tab = ref("exp");
const selectedFilter = ref("만료");
const stockStatus = ref("필요");
const isModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const isDeleteConfirmOpen = ref(false);
const isDeleteAlertOpen = ref(false);
const modalType = ref("");

const openParticularModal = () => {
  modalType.value = "particular";
  isModalOpen.value = true;
};

const openStoreModal = () => {
  modalType.value = "store";
  isModalOpen.value = true;
};

const openSaleModal = () => {
  modalType.value = "sale";
  isModalOpen.value = true;
};

const openDetailModal = () => {
  modalType.value = "detail";
  isModalOpen.value = true;
};
const setFilter = (status) => {
  selectedFilter.value = status;
  filterStatus.value = status; // 둘 다 필요할 경우
};
const closeModal = () => (isModalOpen.value = false);

const closeDetailModal = () => (isDetailModalOpen.value = false);
watch(selectedFilter, (newVal) => {
  stockStatus.value = newVal;
});
const filteredItems = computed(() => {
  let items = inventory_items.value;

  // 탭 필터 처리
  if (tab.value === "exp") {
    if (selectedFilter.value !== "전체") {
      items = items.filter((item) => item.status === selectedFilter.value);
    }
  } else if (tab.value === "order") {
    if (selectedFilter.value === "필요") {
      items = items.filter((item) => item.orderNeed !== "-");
    } else if (selectedFilter.value === "충분") {
      items = items.filter((item) => item.orderNeed === "-");
    }
  }

  // 검색 필터 처리
  if (searchKeyword.value.trim() !== "") {
    const keyword = searchKeyword.value.trim().toLowerCase();
    items = items.filter((item) => item.name.toLowerCase().includes(keyword));
  }

  return items;
});

const searchKeyword = ref("");
const inventory_items = ref([
  {
    name: "마늘",
    quantity: "1개",
    totalquantity: "3개",
    status: "만료",
    orderNeed: "1",
    selected: false,
  },
  {
    name: "토마토",
    quantity: "3개",
    totalquantity: "7개",
    status: "유효",
    orderNeed: "2",
    selected: false,
  },
  {
    name: "양배추",
    quantity: "1개",
    totalquantity: "1개",
    status: "만료",
    orderNeed: "1",
    selected: false,
  },
  {
    name: "우유",
    quantity: "3개",
    totalquantity: "9개",
    status: "임박",
    orderNeed: "-",
    selected: false,
  },
  {
    name: "올리브유",
    quantity: "1개",
    totalquantity: "3개",
    status: "만료",
    orderNeed: "1",
    selected: false,
  },
  {
    name: "새우",
    quantity: "5개",
    totalquantity: "5개",
    status: "유효",
    orderNeed: "-",
    selected: false,
  },
  {
    name: "방울토마토",
    quantity: "2개",
    totalquantity: "3개",
    status: "임박",
    orderNeed: "2",
    selected: false,
  },
  {
    name: "닭가슴살",
    quantity: "5개",
    totalquantity: "15개",
    status: "만료",
    orderNeed: "13",
    selected: false,
  },
]);

const select_all = ref(false);
const isBlocked = computed(
  () => isDeleteConfirmOpen.value || isDeleteAlertOpen.value
);
const toggle_select_all = () => {
  if (!isBlocked.value)
    inventory_items.value.forEach((item) => (item.selected = select_all.value));
};

watch(
  inventory_items,
  (new_items) => {
    select_all.value = new_items.every((item) => item.selected);
  },
  { deep: true }
);

const openDeleteConfirm = () => {
  if (!isBlocked.value) {
    const selectedItems = inventory_items.value.some((item) => item.selected);
    if (selectedItems) isDeleteConfirmOpen.value = true;
    else isDeleteAlertOpen.value = true;
  }
};

const closeDeleteConfirm = () => (isDeleteConfirmOpen.value = false);
const closeDeleteAlert = () => (isDeleteAlertOpen.value = false);
const deleteSelectedItems = () => {
  isDeleteConfirmOpen.value = false;
  inventory_items.value = inventory_items.value.filter(
    (item) => !item.selected
  );
};
</script>

<template>
  <!-- 왼쪽: 유통기한 / 발주 필요 재고 -->
  <v-row class="flex_nowrap" no-gutters>
    <v-col cols="3" class="left_panel">
      <!-- 상단: 만료 임박 / 발주 필요 재고 -->
      <v-row class="mb-6" justify="center">
        <!-- 만료 임박 -->
        <v-col cols="12" md="5" class="text-center">
          <div class="label">만료 임박</div>
          <div class="warning_text">마늘</div>
          <div class="warning_text">D-8</div>
        </v-col>

        <!-- 세로 구분선 -->
        <v-col cols="12" md="1" class="d-flex justify-center">
          <div
            class="divider"
            style="width: 2px; background-color: #ccc; height: 100%"
          ></div>
        </v-col>

        <!-- 발주 필요 재고 -->
        <v-col cols="12" md="6" class="text-center">
          <div class="label">발주 필요재고</div>
          <div class="warning_text" v-if="stockStatus === '필요'">6개</div>
          <div class="warning_text" v-else>0</div>
        </v-col>
      </v-row>

      <!-- 탭 -->
      <v-tabs
        v-model="tab"
        class="custom_tabs shift_tabs"
        background-color="transparent"
        show-arrows
      >
        <v-tab
          variant="text"
          value="exp"
          :class="{
            selected_tab: tab === 'exp',
            default_tab: tab !== 'exp',
          }"
        >
          유통기한
        </v-tab>
        <v-tab
          variant="text"
          value="order"
          :class="{
            selected_tab: tab === 'order',
            default_tab: tab !== 'order',
          }"
        >
          발주필요재고
        </v-tab>
      </v-tabs>

      <!-- 탭 콘텐츠 -->
      <v-window v-model="tab">
        <!-- 유통기한 필터 -->
        <v-window-item value="exp">
          <v-row class="mt-3">
            <v-col cols="5">
              <v-btn
                class="filter_btn"
                :class="{ selected: selectedFilter === '전체' }"
                block
                depressed
                @click="selectedFilter = '전체'"
              >
                전체
              </v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="filter_btn"
                :class="{ selected: selectedFilter === '만료' }"
                block
                depressed
                @click="selectedFilter = '만료'"
              >
                만료
              </v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="filter_btn"
                :class="{ selected: selectedFilter === '임박' }"
                block
                depressed
                @click="selectedFilter = '임박'"
              >
                임박
              </v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="filter_btn"
                :class="{ selected: selectedFilter === '유효' }"
                block
                depressed
                @click="selectedFilter = '유효'"
              >
                유효
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- 발주 필요 재고 필터 -->
        <v-window-item value="order">
          <v-row class="mt-3">
            <v-col cols="5">
              <v-btn
                class="filter_btn"
                :class="{ selected: selectedFilter === '필요' }"
                block
                depressed
                @click="selectedFilter = '필요'"
              >
                필요
              </v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn
                class="filter_btn"
                :class="{ selected: selectedFilter === '충분' }"
                block
                depressed
                @click="selectedFilter = '충분'"
              >
                충분
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-col>
    <v-col cols="auto" class="d-flex justify-center">
      <div
        class="divider"
        style="
          width: 2px;
          background-color: #ccc;
          height: 100%;
          margin-left: -75px;
        "
      ></div>
    </v-col>
    <!-- 오른쪽: 재고 테이블 -->
    <v-col cols="3" md="8" style="max-width: 1200px">
      <div class="body">
        <h1 class="page_title">전체재고</h1>

        <div class="search_container">
          <div class="search_box">
            <input
              type="text"
              class="search_input"
              placeholder="재료명 검색"
              v-model="searchKeyword"
            />
            <button class="search_btn">
              <img src="@/assets/image/search_button.png" class="search_icon" />
            </button>
          </div>
          <div class="action_buttons">
            <button @click="openStoreModal" class="register_btn">입고</button>

            <button @click="openSaleModal" class="particular_btn">판매</button>
          </div>
        </div>

        <table class="inventory_table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  v-model="select_all"
                  @change="toggle_select_all"
                  class="circle_checkbox"
                />
              </th>
              <th>재고명</th>
              <th>수량</th>
              <th>총수량</th>
              <th>만료임박</th>
              <th>발주필요재고</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredItems"
              :key="index"
              :class="{ 'selected-row': item.selected }"
            >
              <td>
                <input
                  type="checkbox"
                  v-model="item.selected"
                  class="circle_checkbox"
                />
              </td>
              <td class="bold-text">{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.totalquantity }}</td>
              <td>
                <span :class="'status ' + item.status">{{ item.status }}</span>
              </td>
              <td>
                <span v-if="item.orderNeed !== '-'">{{ item.orderNeed }}</span>
                <span v-else>-</span>
              </td>

              <td>
                <button @click="openParticularModal" class="particular_btn">
                  상세
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <InventoryStoreModal
          v-if="modalType === 'store'"
          :isOpen="isModalOpen"
          @close="closeModal"
        />
        <InventoryCorrectionModal
          v-if="modalType === 'correction'"
          :isOpen="isModalOpen"
          @close="closeModal"
        />
        <InventorySaleModal
          v-if="modalType === 'sale'"
          :isOpen="isModalOpen"
          @close="closeModal"
        />
        <InventoryParticularModal
          v-if="modalType === 'particular'"
          :isOpen="isModalOpen"
          @close="closeModal"
        />

        <DeleteConfirmModal
          :isOpen="isDeleteConfirmOpen"
          @confirm="deleteSelectedItems"
          @cancel="closeDeleteConfirm"
        />
        <DeleteAlertModal
          :isOpen="isDeleteAlertOpen"
          @close="closeDeleteAlert"
        />
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.label {
  font-size: 22px;
  color: #59595e;
  margin-bottom: 4px;
  font-weight: 900;
  text-align: center;
  border-radius: 20px;
  justify-content: center;
  display: flex;
}

.warning_text {
  font-size: 18px;
  font-weight: bold;
  color: red;
  margin-bottom: 4px;
}

.custom_tabs {
  background-color: transparent !important;

  box-shadow: none !important;
  border: none !important;
}

.v-tab {
  color: #413d3d !important;
  font-weight: 500;
  background-color: transparent !important;
  box-shadow: none !important;
  border-radius: 20px 20px 0 0 !important;
  min-width: auto !important;
  padding: 0 16px !important;
}

.selected_tab {
  box-shadow: none !important;
  color: #858b91 !important;
  font-weight: bold;
  border-bottom: 2px solid #c8c8c8;
  background-color: transparent !important;
}

.default_tab:hover {
  box-shadow: none !important;
  color: rgba(112, 128, 144, 0.8) !important;
  background-color: transparent !important;
  font-weight: 500;
  cursor: pointer;
}

.filter_btn {
  box-shadow: none !important;
  background-color: #c2c5c8 !important;
  color: white !important;
  transition: color 0.2s ease;
  border-radius: 999px !important;
  padding: 8px 10px !important;
  margin-left: 20px;
}

.filter_btn.selected {
  background-color: #858b91 !important;
  color: white !important;
}

.body {
  padding: 20px;
  color: #413d3d;
}

.page_title {
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #413d3d;
}

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
}

.search_icon {
  width: 24px;
  height: 24px;
}

.detail_btn {
  padding: 8px 12px;
  background-color: #b8c0c8;
  color: #59595e;
  width: 80px;
  border: 1px solid #ccc;
  font-size: 14px;
  border-radius: 20px;
  font-weight: 500;
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
.particular_btn {
  padding: 8px 12px;
  background-color: #b8c0c8;
  border: none;
  border-radius: 20px;
  width: 80px;
  cursor: pointer;
  font-weight: bold;
}

.register_btn:hover,
.particular_btn:hover {
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

.status.만료 {
  background-color: #ffcccc;
  color: red;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
}

.status.유효 {
  background-color: #ccf2ff;
  color: blue;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
}

.status.임박 {
  background-color: #fff4cc;
  color: #ff9900;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
}

.divider {
  width: 1px;
  background-color: #e5e7eb;
}

.left_panel {
  margin-right: 65px;
}
.shift_tabs {
  margin-left: 50px; /* px 값으로 조절 가능 */
}
</style>
