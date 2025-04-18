<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { api } from '@/api';
import CategoryRegisterModal from '@/components/menu_management/category/CategoryRegisterModal.vue';
import DeleteConfirmModal from '@/components/alerts/DeleteConfirmModal.vue';
import DeleteAlertModal from '@/components/alerts/DeleteAlertModal.vue';
import CategoryEditModal from '@/components/menu_management/category/CategoryEditModal.vue';

const isRegisterModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteConfirmOpen = ref(false);
const isDeleteAlertOpen = ref(false);
const selectedCategory = ref(null);

const openRegisterModal = () => { isRegisterModalOpen.value = true; };
const closeRegisterModal = () => { isRegisterModalOpen.value = false; };

const openEditModal = (item) => {
    isEditModalOpen.value = true;
    selectedCategory.value = item.id;
};
const closeEditModal = () => { isEditModalOpen.value = false; };

const category_items = ref([]);
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = 10;

const select_all = ref(false);
const isBlocked = computed(() => isDeleteConfirmOpen.value || isDeleteAlertOpen.value);

const toggle_select_all = () => {
    if (!isBlocked.value) {
        category_items.value.forEach(item => (item.selected = select_all.value));
    }
};

watch(category_items, (new_items) => {
    select_all.value = new_items.every(item => item.selected);
}, { deep: true });

const openDeleteConfirm = () => {
    if (!isBlocked.value) {
        const selectedItems = category_items.value.some(item => item.selected);
        if (selectedItems) {
            isDeleteConfirmOpen.value = true;
        } else {
            isDeleteAlertOpen.value = true;
        }
    }
};

const closeDeleteConfirm = () => { isDeleteConfirmOpen.value = false; };
const closeDeleteAlert = () => { isDeleteAlertOpen.value = false; };

const deleteSelectedItems = async () => {
    isDeleteConfirmOpen.value = false;
    const selectedIds = category_items.value.filter(item => item.selected).map(item => item.id);

    try {
        const res = await api.deleteCategory({ ids: selectedIds });
        if (res.data.code === 200) {
            category_items.value = category_items.value.filter(item => !item.selected);
            select_all.value = false;
            fetchCategoryList(currentPage.value);
        } else {
            console.error("삭제 중 에러:", res.data.message);
        }
    } catch (err) {
        console.error("API 호출 실패:", err);
    }
};

const fetchCategoryList = async (page = 0) => {
    try {
        const res = await api.getCategoryList(page, pageSize);
        if (res && res.content) {
            category_items.value = res.content.map(item => ({
                ...item,
                selected: false,
            }));
            currentPage.value = res.page.number;
            totalPages.value = res.page.totalPages;
        }
    } catch (error) {
        console.error('카테고리 목록 불러오기 실패:', error);
    }
};

const goToPage = (page) => {
    if (page >= 0 && page < totalPages.value) {
        fetchCategoryList(page);
    }
};

onMounted(() => {
    fetchCategoryList(0);
});
</script>





<template>
    <div class="body">
        <h1 class="page_title">카테고리 관리</h1>
        <div class="search_container">
            <div class="search_box">
                <input type="text" class="search_input" placeholder="카테고리 검색" />
                <button class="search_btn">
                    <img src="@/assets/image/search_button.png" class="search_icon">
                </button>
            </div>

            <div class="action_buttons">
                <button @click="openRegisterModal" class="register_btn">등록</button>
                <button @click="openDeleteConfirm" class="delete_btn">삭제</button>
            </div>
        </div>
        <table class="menu_table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" v-model="select_all" @change="toggle_select_all"
                            class="circle_checkbox" />
                    </th>
                    <th>카테고리 명</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in category_items" :key="index" :class="{ 'selected-row': item.selected }">
                    <td>
                        <input type="checkbox" v-model="item.selected" class="circle_checkbox" />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>
                        <button class="detail_btn" @click="openEditModal(item)">수정</button>
                    </td>
                </tr>
            </tbody>

        </table>

        <div class="pagination_container">
            <button :disabled="currentPage === 0" @click="goToPage(currentPage - 1)">
                ◀ 이전
            </button>

            <span v-for="page in totalPages" :key="page" @click="goToPage(page - 1)"
                :class="{ 'page-number': true, 'active': currentPage === page - 1 }">
                {{ page }}
            </span>

            <button :disabled="currentPage === totalPages - 1" @click="goToPage(currentPage + 1)">
                다음 ▶
            </button>
        </div>
        <CategoryRegisterModal :isOpen="isRegisterModalOpen" @close="closeRegisterModal" @refresh="fetchCategoryList" />
        <CategoryEditModal :isOpen="isEditModalOpen" :category="selectedCategory" @close="closeEditModal"
            @refresh="fetchCategoryList" />
        <DeleteConfirmModal :isOpen="isDeleteConfirmOpen" @confirm="deleteSelectedItems" @cancel="closeDeleteConfirm" />
        <DeleteAlertModal :isOpen="isDeleteAlertOpen" @close="closeDeleteAlert" />
    </div>
</template>

<style scoped>
.body {
    padding: 20px;
}

.page_title {
    font-size: 28px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 30px;
}

.menu_table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.menu_table th,
.menu_table td {
    padding: 12px;
    text-align: center;
    border-bottom: #d1d5c2 solid 1px;
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

.selected-row {
    background-color: rgba(206, 222, 239, 0.42);
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
    background-color: blue;
    border-color: blue;
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

.search_input {
    flex: 1;
    max-width: 500px;
    padding: 6px;
    border-bottom: 1px solid #ccc;
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

.pagination_container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
}

.page-number {
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 4px;
}

.page-number.active {
    background-color: #ffcc00;
    font-weight: bold;
}
</style>