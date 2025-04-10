<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import TradeRequestModal from './TradeRequestModal.vue';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// 상태
const showRequestListModal = ref(false);
const selectedProduct = ref('');
const tradeType = ref('전체');
const startDate = ref('');
const endDate = ref('');
const sortOrder = ref('desc');

// 드롭다운
const isOpen = ref(false);
const selectedTradeType = ref('전체');
const tradeTypes = ['전체', '판매', '구매'];

// 모달 관련
const showModal = ref(false);
const modalMessage = ref('');
const currentItemIndex = ref(null);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectType = (type) => {
    selectedTradeType.value = type;
    tradeType.value = type;
    isOpen.value = false;
};

const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// 샘플 거래 데이터
const trade_items = ref([
    {
        type: '판매',
        product: '양파',
        price: 1000,
        quantity: 5,
        status: '요청확인',
        date: '2025-04-07',
        store: '신림분식'
    },
    {
        type: '구매',
        product: '마늘',
        price: 1500,
        quantity: 2,
        status: '배송확정',
        date: '2025-04-06',
        store: '상도파스타'
    },
    {
        type: '구매',
        product: '파슬리',
        price: 700,
        quantity: 1,
        status: '거래완료',
        date: '2025-04-04',
        store: '상도파스타'
    },
]);

const handleButtonClick = (status, index) => {
    currentItemIndex.value = index;

    if (status === '배송확정') {
        modalMessage.value = '배송을 확정하시겠습니까?';
        showModal.value = true;
    } else if (status === '요청확인') {
        selectedProduct.value = trade_items.value[index].product;
        showRequestListModal.value = true;
    }
};

const confirmModal = () => {
    const index = currentItemIndex.value;
    if (trade_items.value[index].status === '배송확정') {
        trade_items.value[index].status = '거래완료';
    }
    showModal.value = false;
};

const cancelModal = () => {
    showModal.value = false;
};

const filteredItems = computed(() => {
    return trade_items.value
        .filter(item => {
            if (tradeType.value !== '전체' && item.type !== tradeType.value) return false;

            const itemDate = dayjs(item.date).startOf('day');
            const start = startDate.value ? dayjs(startDate.value).startOf('day') : null;
            const end = endDate.value ? dayjs(endDate.value).startOf('day') : null;

            return (!start || itemDate.isSameOrAfter(start)) &&
                (!end || itemDate.isSameOrBefore(end));
        })
        .sort((a, b) => {
            const dateA = dayjs(a.date);
            const dateB = dayjs(b.date);
            return sortOrder.value === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
        });
});
</script>

<template>
    <div class="body">
        <h1 class="page_title">거래 내역</h1>

        <!-- 필터 -->
        <div class="search_container">
            <div class="date_filter_box">
                <label>
                    시작일
                    <input type="date" v-model="startDate" />
                </label>
                <label>
                    종료일
                    <input type="date" v-model="endDate" />
                </label>
            </div>
        </div>

        <!-- 거래 내역 테이블 -->
        <table class="menu_table">
            <thead>
                <tr>
                    <th>
                        <div class="dropdown_wrapper">
                            <div class="dropdown_button" @click="toggleDropdown">
                                {{ selectedTradeType }}
                                <span class="arrow">{{ isOpen ? '▲' : '▼' }}</span>
                            </div>
                            <ul v-if="isOpen" class="dropdown_menu">
                                <li v-for="type in tradeTypes" :key="type" @click.stop="selectType(type)">
                                    {{ type }}
                                </li>
                            </ul>
                        </div>
                    </th>
                    <th>판매물품</th>
                    <th>거래가격</th>
                    <th>수량</th>
                    <th>거래상태</th>
                    <th>
                        <div class="sortable_header" @click="toggleSortOrder">
                            거래날짜
                            <span v-if="sortOrder === 'asc'">🔼</span>
                            <span v-else>🔽</span>
                        </div>
                    </th>
                    <th>거래매장</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredItems" :key="index">
                    <td>{{ item.type }}</td>
                    <td class="bold_text">{{ item.product }}</td>
                    <td>{{ item.price.toLocaleString() }}원</td>
                    <td>{{ item.quantity }}개</td>
                    <td>
                        <button v-if="['요청확인', '결제하기', '배송확정'].includes(item.status)"
                            @click="handleButtonClick(item.status, index)" class="detail_btn">
                            {{ item.status }}
                        </button>
                        <span v-else>{{ item.status }}</span>
                    </td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.store }}</td>
                </tr>
            </tbody>
        </table>

        <!-- 확인/취소 모달 - 중앙 정렬 -->
        <div v-if="showModal" class="center_modal_overlay">
            <div class="modal_content">
                <p>{{ modalMessage }}</p>
                <div class="modal_buttons">
                    <button @click="confirmModal" class="modal_btn confirm">확인</button>
                    <button @click="cancelModal" class="modal_btn cancel">취소</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 요청 목록 모달 - 별도 컴포넌트로 분리 -->
    <TradeRequestModal :isOpen="showRequestListModal" :productName="selectedProduct"
        @close="showRequestListModal = false" />
</template>


<style scoped>
/* 중앙 정렬 모달 오버레이 - 확인/취소 모달용 */
.center_modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
}

.modal_content {
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal_content p {
    font-size: 25px;
    font-weight: bold;
}

.modal_buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.modal_btn {
    padding: 8px 16px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.modal_btn.confirm {
    background-color: #B8C0C8;
    color: black;
}

.modal_btn.confirm:hover {
    background: #9BC1AE;
}

.modal_btn.cancel {
    background-color: #ccc;
}

.modal_btn.cancel:hover {
    background-color: #b3b3b3;
}

.body {
    padding: 20px;
}

.bold_text {
    font-weight: bold;
}

.sortable_header {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    user-select: none;
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
    justify-content: flex-end;
}

.date_filter_box {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 16px;
}

.date_filter_box label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 14px;
}

.date_filter_box input {
    border: #ccc solid 1px;
    padding: 5px;
    border-radius: 10px;
}

.search_box {
    display: flex;
    gap: 5px;
    flex: 0.6;
}

.trade_type_select {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
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
    background-color: #B1D5C2;
    color: black;
    width: 90px;
    border: 1px solid #ccc;
    font-size: 14px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
}

.detail_btn:hover {
    background-color: #90BDAA;
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


.dropdown_wrapper {
    position: relative;
    display: inline-block;
}

.dropdown_button {
    padding: 6px 12px;
    background-color: #B8C0C8;
    border-radius: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    user-select: none;
    gap: 4px;
    white-space: nowrap;
}

.arrow {
    font-size: 12px;
}

.dropdown_menu {
    position: absolute;
    list-style: none;
    padding: 0;
    top: 100%;
    left: 0;
    width: 100px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    z-index: 100;
    margin-top: 4px;
}

.dropdown_menu li {
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
}

.dropdown_menu li:hover {
    background-color: #f0f0f0;
}
</style>
