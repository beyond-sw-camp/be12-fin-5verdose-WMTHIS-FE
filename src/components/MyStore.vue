<script setup>
import { ref, computed } from 'vue';
import MyStoreLikes from './MyStoreLikes.vue';
import MyStorePosts from './MyStorePosts.vue';

const repositoryType = ref('liked_posts');
const repositoryTypes = [
    { value: 'liked_posts', label: '내가 찜한 게시글' },
    { value: 'my_posts', label: '내가 작성한 게시글' },
    { value: 'transaction_history', label: '거래 내역' },
    { value: 'requested_transactions', label: '요청한 거래' },
    { value: 'received_requests', label: '요청받은 거래' }
];

const currentComponent = computed(() => {
    switch (repositoryType.value) {
        case 'liked_posts':
            return MyStoreLikes;
        case 'my_posts':
            return MyStorePosts;
        case 'transaction_history':
            return TransactionHistory;
        case 'requested_transactions':
            return RequestedTransactions;
        case 'received_requests':
            return ReceivedRequests;
        default:
            return MyStoreLikes;
    }
});
</script>

<template>
    <div class="body">

        <div class="search_container">
            <div class="search_box">
                <select v-model="repositoryType" class="repository_select">
                    <option v-for="type in repositoryTypes" :key="type.value" :value="type.value">
                        {{ type.label }}
                    </option>
                </select>
            </div>
        </div>

        <component :is="currentComponent" />
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

.repository_select {
    flex: 1;
    max-width: 250px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    font-size: 14px;
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
    font-size: 16px;
}

/* 체크박스 크기 조정 */
.checkbox_large {
    width: 20px;
    height: 20px;
}

/* 즐겨찾기 버튼 */
.favorite_btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
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

.page_number {
    padding: 0 10px;
}
</style>