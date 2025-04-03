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
    { name: "알리오올리오", price: 9000, ingredient: "당근 50g 외 3개", selected: false },
    { name: "들깨 크림 뇨끼", price: 12000, ingredient: "당근 20g 외 1개", selected: false },
    { name: "토마토 파스타", price: 11000, ingredient: "토마토 80g 외 2개", selected: false },
    { name: "봉골레 파스타", price: 13000, ingredient: "조개 100g 외 3개", selected: false }
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
                <input type="text" class="search_input" placeholder="메뉴명 입력" />
                <button class="search_btn">검색</button>
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
                            class="checkbox_large" />
                    </th>
                    <th>상품</th>
                    <th>가격</th>
                    <th>재고</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in menu_items" :key="index">
                    <td>
                        <input type="checkbox" v-model="item.selected" class="checkbox_large" />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}원</td>
                    <td>{{ item.ingredient }}</td>
                    <td>
                        <button class="detail_btn" @click="openDetailModal(item)">상세</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="pagination">
            <button class="prev_btn">〈</button>
            <span class="page_number">1</span>
            <button class="next_btn">〉</button>
        </div>

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

/* 제목 */
.page_title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
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
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search_btn {
    padding: 8px 12px;
    background-color: #5e7955;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.search_btn:hover {
    background-color: #4a5f45;
}

.detail_btn {
    padding: 8px 12px;
    background-color: #FFFFFF;
    color: black;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.detail_btn:hover {
    background-color: #f0f0f0;
}

.action_buttons {
    display: flex;
    gap: 10px;
}

.register_btn,
.delete_btn {
    padding: 8px 12px;
    background-color: #5e7955;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.register_btn:hover,
.delete_btn:hover {
    background-color: #4a5f45;
}

/* 필터 */
.filter_container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    align-items: center;
}

.filter_btn {
    padding: 8px 12px;
    background-color: #d1d5c2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.filter_btn.active,
.filter_btn:hover {
    background-color: #5e7955;
    color: white;
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
    border-bottom: 1px solid #ddd;
}

.menu_table th {
    background-color: #d1d5c2;
    font-size: 20px;
}

/* 체크박스 크기 조정 */
.checkbox_large {
    width: 20px;
    height: 20px;
}

/* 페이지네이션 스타일 */
.pagination {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
}

.prev_btn,
.next_btn {
    padding: 8px 12px;
    background-color: #5e7955;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.prev_btn:hover,
.next_btn:hover {
    background-color: #4a5f45;
}
</style>
