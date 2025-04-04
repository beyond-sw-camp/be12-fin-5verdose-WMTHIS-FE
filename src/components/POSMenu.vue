<script setup>
import { ref, computed } from 'vue';
import POSOption from './POSOption.vue';

const menu_items = ref([
    { id: 1, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 2, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 3, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 4, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 5, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 6, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 7, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 8, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 9, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 10, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 11, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 12, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 13, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 14, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 15, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 16, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 17, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 18, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 19, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 20, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 21, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 22, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 23, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 24, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 25, name: '알리오올리오', price: 10000, quantity: 1 },
    { id: 26, name: '알리오올리오', price: 10000, quantity: 1 },
]);

const orderList = ref([]);

const currentPage = ref(1); // 현재 페이지
const itemsPerPage = 16; // 한 페이지에 표시할 아이템 개수

// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(menu_items.value.length / itemsPerPage));

// 현재 페이지의 아이템만 보여주도록 필터링
const paginatedMenuItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const items = menu_items.value.slice(start, start + itemsPerPage);

    // 항상 16개의 아이템을 보여주기 위해 빈 슬롯으로 채우기
    const filledItems = [...items];
    while (filledItems.length < itemsPerPage) {
        filledItems.push(null);
    }

    return filledItems;
});

const total_quantity = computed(() => {
    return orderList.value.reduce((sum, item) => sum + item.quantity, 0);
});

const total_price = computed(() => {
    return orderList.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const showModal = ref(false);
const selectedItem = ref(null);

const openModal = (item) => {
    if (item) {
        selectedItem.value = item;
        showModal.value = true;
    }
};

const closeModal = () => {
    showModal.value = false;
    selectedItem.value = null;
};

const addOrder = (newOrder) => {
    const existingOrder = orderList.value.find(order =>
        order.id === newOrder.id &&
        order.options.length === newOrder.options.length &&
        order.options.every((opt, index) =>
            opt.label === newOrder.options[index].label && opt.price === newOrder.options[index].price
        )
    );

    if (existingOrder) {
        existingOrder.quantity += 1;
    } else {
        orderList.value.push(newOrder);
    }
};

// 이전 페이지로 이동
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

// 다음 페이지로 이동
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

// 수량 증가/감소 함수
const increaseQuantity = (index) => {
    orderList.value[index].quantity += 1;
};

const decreaseQuantity = (index) => {
    if (orderList.value[index].quantity > 1) {
        orderList.value[index].quantity -= 1;
    } else {
        orderList.value.splice(index, 1);
    }
};
</script>

<template>
    <div class="menu_container">
        <!-- 메뉴 목록 -->
        <div class="menu_section">
            <div class="menu_grid">
                <div v-for="(item, index) in paginatedMenuItems" :key="index" class="menu_item" @click="openModal(item)"
                    :class="{ 'empty-item': !item }">
                    <div v-if="item">
                        <div class="menu_name">{{ item.name }}</div>
                        <div class="menu_price">{{ item.price.toLocaleString() }}원</div>
                    </div>
                </div>
            </div>

            <!-- 페이지네이션 -->
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">◀ 이전</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">다음 ▶</button>
            </div>
        </div>

        <!-- 주문 목록 -->
        <div class="order_container">
            <div class="order_list">
                <h3>주문 목록</h3>
                <ul>
                    <li v-for="(order, index) in orderList" :key="index">
                        <div>
                            <strong>{{ order.name }}</strong> ({{ order.quantity }}개) -
                            <span>{{ (order.price * order.quantity).toLocaleString() }}원</span>
                        </div>

                        <div v-if="order.options && order.options.length">
                            <ul>
                                <li v-for="opt in order.options" :key="opt.label">
                                    <span>{{ `${opt.label} (+${opt.price.toLocaleString()}원)` }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="quantity_controls">
                            <button @click="decreaseQuantity(index)">➖</button>
                            <span>{{ order.quantity }}</span>
                            <button @click="increaseQuantity(index)">➕</button>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 주문 버튼 & 결제 버튼 -->
            <div class="order_actions">
                <button class="order_btn">주문</button>
                <button class="cart_btn">
                    <span class="cart_icon">{{ total_quantity }}</span>
                    {{ total_price.toLocaleString() }}원 결제
                </button>
            </div>
        </div>

        <POSOption v-if="showModal" :selectedItem="selectedItem" @close="closeModal" @addOrder="addOrder" />
    </div>
</template>

<style scoped>
.menu_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
    gap: 20px;
}

/* 메뉴 영역을 감싸는 새로운 컨테이너 */
.menu_section {
    display: flex;
    flex-direction: column;
    width: 80%;
}

/* 메뉴 목록 */
.menu_grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    grid-template-rows: repeat(4, minmax(100px, 1fr));
    gap: 10px;
    flex-grow: 1;
    /* 메뉴 목록이 최대한 공간을 차지하도록 설정 */
}


.menu_item {
    background-color: #a9b0bc;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 100px;
    cursor: pointer;
    transition: transform 0.2s;
}

.menu_item:hover:not(.empty-item) {
    transform: scale(1.02);
    background-color: #8e99ab;
}

.empty-item {
    background-color: transparent;
    cursor: default;
}

.menu_name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.menu_price {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: auto;
}

/* 주문 영역 */
.order_container {
    display: flex;
    flex-direction: column;
    width: 500px;
    border: 2px solid #bbb;
    background: #f9f9f9;
    border-radius: 10px;
    max-height: calc(100vh - 40px);
    overflow: hidden;
}

/* 주문 목록 전체 스타일 */
.order_list {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid #ddd;
}

/* 주문 목록 제목 */
.order_list h3 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
}

/* 주문 항목 스타일 */
.order_list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.order_list li {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 10px;
    border: 2px solid #ccc;
}

.order_list li ul {
    margin-top: 3px;
    padding-left: 10px;
    font-size: 14px;
}

.order_list li ul li {
    color: #666;
    border: none;
    margin-bottom: 2px;
    padding: 2px;
}

/* 수량 조절 버튼 스타일 */
.quantity_controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
}

.quantity_controls button {
    background: #B8C0C8;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
}

.quantity_controls button:hover {
    background: #A5B0B8;
    transform: scale(1.05);
}

/* 주문 버튼 & 결제 버튼 (아래 고정) */
.order_actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: white;
}

/* 버튼 스타일 */
.order_btn,
.cart_btn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
}

.order_btn {
    background-color: #d1d5c2;
    color: #333;
    border: none;
}

.order_btn:hover {
    background-color: #c1c5b2;
}

.cart_btn {
    background-color: #6c3ce9;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.cart_btn:hover {
    background-color: #5c2cd9;
}

/* 장바구니 아이콘 */
.cart_icon {
    background-color: white;
    color: #6c3ce9;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
}

/* 페이지네이션 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.pagination button {
    background-color: #6c3ce9;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
}

.pagination button:hover {
    background-color: #5c2cd9;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination span {
    font-size: 16px;
    font-weight: bold;
}

/* 반응형 디자인 */
@media (max-width: 1200px) {
    .menu_container {
        flex-direction: column;
    }

    .menu_grid {
        width: 100%;
    }

    .order_container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
}

@media (max-width: 768px) {
    .menu_grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(8, minmax(100px, 1fr));
    }
}

@media (max-width: 480px) {
    .menu_grid {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(16, minmax(100px, 1fr));
    }
}
</style>