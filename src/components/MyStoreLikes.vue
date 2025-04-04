<script setup>
import { ref } from 'vue';

// 상품 목록을 상태로 관리
const lists = ref([
    {
        title: "유기농 당근 5kg 판매",
        productname: "유기농 당근 (5kg)",
        price: 12000,
        status: "판매중",
        createdDate: "2025-03-25",
        limit: "2025-04-10",
        like: true
    },
    {
        title: "한우 등심 1++ 500g",
        productname: "한우 등심 1++ (500g)",
        price: 45000,
        status: "거래완료",
        createdDate: "2025-03-20",
        limit: "2025-04-05",
        like: false
    },
    {
        title: "친환경 방울토마토 3kg",
        productname: "방울토마토 (3kg)",
        price: 15000,
        status: "판매중",
        createdDate: "2025-03-27",
        limit: "2025-04-15",
        like: true
    }
]);

// 좋아요(찜) 상태 변경
const toggleFavorite = (list) => {
    list.like = !list.like; // 상태 변경
};
</script>

<template>
    <div class="liked-container">
        <h2>내가 찜한 게시글</h2>

        <table class="menu_table">
            <thead>
                <tr>
                    <th>제목</th>
                    <th>물품 이름</th>
                    <th>가격</th>
                    <th>판매 상태</th>
                    <th>등록 날짜</th>
                    <th>유통기한</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- ❌ props.lists → ✅ lists -->
                <tr v-for="list in lists" :key="list.title">
                    <td>{{ list.title }}</td>
                    <td>{{ list.productname }}</td>
                    <td>{{ list.price.toLocaleString() }}원</td>
                    <td>{{ list.status }}</td>
                    <td>{{ list.createdDate }}</td>
                    <td>{{ list.limit }}</td>
                    <td>
                        <button class="favorite_btn" @click="toggleFavorite(list)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                :fill="list.like ? '#ff5a5f' : 'none'" :stroke="list.like ? '#ff5a5f' : '#ccc'"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
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