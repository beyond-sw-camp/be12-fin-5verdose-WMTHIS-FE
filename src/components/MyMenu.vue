<script setup>
import { ref, watch, computed } from 'vue';
import MenuRegisterModal from './MenuRegisterModal.vue';
import MenuDetailModal from './MenuDetailModal.vue';
import DeleteConfirmModal from './DeleteConfirmModal.vue';
import DeleteAlertModal from './DeleteAlertModal.vue';

const isModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const isDeleteConfirmOpen = ref(false);
const isDeleteAlertOpen = ref(false); // 삭제 항목 선택 안내 모달

const openModal = () => { isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };

const openDetailModal = () => { isDetailModalOpen.value = true; };
const closeDetailModal = () => { isDetailModalOpen.value = false; };

const menu_items = ref([
    { name: "알리오올리오", category: '파스타', ingredient: "당근 50g 외 3개", selected: false },
    { name: "들깨 크림 뇨끼", category: '파스타', ingredient: "당근 20g 외 1개", selected: false },
    { name: "토마토 파스타", category: '파스타', ingredient: "토마토 80g 외 2개", selected: false },
    { name: "봉골레 파스타", category: '파스타', ingredient: "조개 100g 외 3개", selected: false }
]);

const select_all = ref(false);
const isBlocked = computed(() => isDeleteConfirmOpen.value || isDeleteAlertOpen.value);

// 전체 선택 토글
const toggle_select_all = () => {
    if (!isBlocked.value) {
        menu_items.value.forEach(item => (item.selected = select_all.value));
    }
};

// 개별 선택 체크 시 전체 선택 여부 감지
watch(menu_items, (new_items) => {
    select_all.value = new_items.every(item => item.selected);
}, { deep: true });

// 삭제 확인 모달 열기
const openDeleteConfirm = () => {
    if (!isBlocked.value) {
        const selectedItems = menu_items.value.some(item => item.selected);
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
    menu_items.value = menu_items.value.filter(item => !item.selected);
};
</script>
<template>
    <div class="body">
        <h1 class="page_title">메뉴 관리</h1>

        <!-- 검색 바 및 등록/삭제 버튼 -->
        <div class="search_container">
            <div class="search_box">
                <input type="text" class="search_input" placeholder="메뉴명 검색" />
                <button class="search_btn">
                    <img src="../assets/search_button.png" class="search_icon">
                </button>
            </div>
            <div class="action_buttons">
                <button @click="openModal" class="register_btn">등록</button>
                <button @click="openDeleteConfirm" class="delete_btn">삭제</button>
            </div>
        </div>

        <!-- 상품 목록 -->
        <table class="menu_table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" v-model="select_all" @change="toggle_select_all"
                            class="circle_checkbox" />
                    </th>
                    <th>상품</th>
                    <th>카테고리</th>
                    <th>재고</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in menu_items" :key="index" :class="{ 'selected-row': item.selected }">
                    <td>
                        <input type="checkbox" v-model="item.selected" class="circle_checkbox" />
                    </td>
                    <td class="bold-text">{{ item.name }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.ingredient }}</td>
                    <td>
                        <button class="detail_btn" @click="openDetailModal(item)">상세</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 모달 컴포넌트들 -->
        <MenuRegisterModal :isOpen="isModalOpen" @close="closeModal" />
        <MenuDetailModal :isOpen="isDetailModalOpen" @close="closeDetailModal" />
        <DeleteConfirmModal :isOpen="isDeleteConfirmOpen" @confirm="deleteSelectedItems" @cancel="closeDeleteConfirm" />
        <DeleteAlertModal :isOpen="isDeleteAlertOpen" @close="closeDeleteAlert" />
    </div>
</template>

<style scoped>
.body {
    padding: 20px;
}

.bold-text {
    font-weight: bold;
}

/* 제목 */
.page_title {
    font-size: 28px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 30px;
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

.selected-row {
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
    background-color: #B8C0C8;
    color: black;
    width: 80px;
    border: 1px solid #ccc;
    font-size: 14px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
}

.detail_btn:hover {
    background-color: #98A8B8;
}

.action_buttons {
    display: flex;
    gap: 10px;
}

.register_btn,
.delete_btn {
    padding: 8px 12px;
    background-color: #B8C0C8;
    border: none;
    border-radius: 20px;
    width: 80px;
    cursor: pointer;
    font-weight: bold;
}

.register_btn:hover,
.delete_btn:hover {
    background-color: #98A8B8;
}

/* 테이블 */
.menu_table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.menu_table th,
.menu_table td {
    padding: 12px;
    text-align: center;
}


.menu_table td {
    border-bottom: #d1d5c2 solid 1px;
}

/* 상단 왼쪽 */
.menu_table thead tr:first-child th:first-child {
    border-top-left-radius: 20px;
}

/* 상단 오른쪽 */
.menu_table thead tr:first-child th:last-child {
    border-top-right-radius: 20px;
}

/* 왼쪽 아래 둥글게 */
.menu_table thead tr:first-child th:first-child {
    border-bottom-left-radius: 20px;
}

/* 오른쪽 아래 둥글게 */
.menu_table thead tr:first-child th:last-child {
    border-bottom-right-radius: 20px;
}

.menu_table th {
    background-color: #B8C0C8;
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
    background-color: blue;
    border-color: blue;
    ;
}

.circle_checkbox:checked::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
}
</style>