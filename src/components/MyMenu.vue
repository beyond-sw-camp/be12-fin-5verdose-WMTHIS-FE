<script setup>
import { ref } from 'vue';

const menuItems = ref([
    { name: "알리오올리오", price: 9000, soldOut: false },
    { name: "들깨 크림 뇨끼", price: 12000, soldOut: true },
    { name: "들깨 크림 뇨끼", price: 12000, soldOut: false },
    { name: "들깨 크림 뇨끼", price: 12000, soldOut: false },
    { name: "들깨 크림 뇨끼", price: 12000, soldOut: false },
    { name: "들깨 크림 뇨끼", price: 12000, soldOut: false },
]);

const sortOptions = ref([
    { label: "최신순", value: "newest" },
    { label: "오래된순", value: "oldest" },
    { label: "인기순", value: "popular" },
]);

const selectedSort = ref(sortOptions.value[0]); // 기본값: 최신순

const selectSort = (option) => {
    selectedSort.value = option; // 선택된 정렬 옵션 업데이트
    console.log("선택된 정렬:", option.value);
};
</script>

<template>
    <div class="body">
        <!-- 페이지 제목 -->
        <h1 class="page-title">MY 메뉴</h1>

        <!-- 검색 바 -->
        <div class="search-container">
            <input type="text" class="search-input" placeholder="메뉴명 또는 가격 입력" />
            <button class="search-btn">검색</button>
        </div>

        <!-- 필터 버튼 -->
        <div class="filter-container">
            <button class="filter-btn active">전체</button>
            <button class="filter-btn">파스타</button>
            <button class="filter-btn">뇨끼</button>
        </div>

        <div class="filter-sort-container">
            <v-menu offset-y attach="body" content-class="custom-menu">
                <template v-slot:activator="{ props }">
                    <button class="sort-btn" v-bind="props">{{ selectedSort.label }} ▼</button>
                </template>

                <v-list>
                    <v-list-item v-for="(option, index) in sortOptions" :key="index" @click="selectSort(option)">
                        <v-list-item-title>{{ option.label }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <button class="add-btn">+ Add</button>
        </div>

        <!-- 상품 목록 -->
        <table class="menu-table">
            <thead>
                <tr>
                    <th>상품</th>
                    <th>가격</th>
                    <th>품절표시</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in menuItems" :key="index">
                    <td>
                        <span class="menu-name">{{ item.name }}</span>
                    </td>
                    <td>{{ item.price }}원</td>
                    <td class="switch-slider">
                        <v-container fluid>
                            <v-switch inset
                                v-model="item.soldOut"
                                :color="item.soldOut ? '#0000FF' : 'grey'"
                                hide-details
                            ></v-switch>
                        </v-container>
                    </td>
                    
                    <td><button class="edit-btn">✏️</button></td>
                    <td><button class="delete-btn">🗑️</button></td>
                </tr>
            </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div class="pagination">
            <button class="prev-btn">〈</button>
            <span class="page-number">1</span>
            <button class="next-btn">〉</button>
        </div>
    </div>
</template>



<style scoped>
/* 본문(body) */
.body {
    padding: 20px;
    margin-top: 30px;
    /* 헤더 높이만큼 이동 */
}

/* 제목 */
.page-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
}

/* 검색창 */
.search-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.search-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search-btn {
    padding: 8px 15px;
    background-color: #5e7955;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.search-btn:hover {
    background-color: #4a5f45;
}

/* 필터 & 정렬 */
.filter-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    align-items: center;
}

.filter-btn {
    padding: 8px 12px;
    background-color: #d1d5c2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

}

.filter-btn:hover {
    background-color: #bfc3ae;
    /* 기존 색보다 더 어두운 회색 */
}

.filter-btn.active {
    background-color: #5e7955;
    color: white;
}

.filter-btn.active:hover {
    background-color: #4a5f45;
    /* 더 진한 초록색 */
}

.filter-sort-container {
    display: flex;
    justify-content: space-between;
    /* 왼쪽(정렬 버튼) & 오른쪽(+ Add 버튼) 정렬 */
    align-items: center;
    margin-bottom: 20px;
}

.sort-btn {
    font-weight: bold;
    padding: 8px 12px;
    background-color: #ddd;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: auto;
    /* 왼쪽 정렬 */
}

.sort-btn:hover {
    background-color: #bbb;
    /* 기존 색보다 더 어두운 회색 */
}

.add-btn {
    font-weight: bold;
    padding: 8px 12px;
    background-color: #5e7955;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;
    /* 오른쪽 정렬 */
}

.add-btn:hover {
    background-color: #4a5f45;
    /* 더 진한 초록색 */
}

/* 테이블 */
.menu-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.menu-name {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
}

.menu-table th,
.menu-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.menu-table th {
    background-color: #d1d5c2;
}
.switch-slider {
    text-align: center; /* 수평 정렬 */
}

.switch-slider .v-input {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 버튼 */
.edit-btn,
.delete-btn {
    border: none;
    background: none;
    cursor: pointer;
}

/* 페이지네이션 */
.pagination {
    display: flex;
    gap: 10px;
    align-items: center;
    /* 세로 중앙 정렬 */
    justify-content: center;
    margin-top: 20px;
}

.prev-btn,
.next-btn {
    padding: 5px 10px;
    background-color: white;
    cursor: pointer;
    font-weight: bold;
}

.prev-btn:hover,
.next-btn:hover {
    background-color: #ddd;
    /* 연한 회색 배경 */
    color: black;
    /* 글씨 색상 유지 */
}

.page-number {
    font-weight: bold;
}
</style>
