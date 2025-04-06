<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const orderList = ref([]);
const orderInfo = ref({
    type: '',
    tableId: null,
    deliveryService: ''
});

onMounted(() => {
    try {
        // 주문 정보 가져오기
        if (route.query.orders) {
            orderList.value = JSON.parse(route.query.orders);
        }

        // 주문 타입 정보 가져오기 (테이블 또는 배달)
        const orderType = localStorage.getItem('order_type');
        if (orderType === 'table') {
            orderInfo.value = {
                type: 'table',
                tableId: localStorage.getItem('selected_table_id'),
                deliveryService: ''
            };
        } else if (orderType === 'delivery') {
            orderInfo.value = {
                type: 'delivery',
                tableId: null,
                deliveryService: localStorage.getItem('delivery_service')
            };
        }
    } catch (error) {
        console.error('주문 데이터 파싱 오류:', error);
        orderList.value = [];
    }
});

// 총 수량 계산
const total_quantity = computed(() => {
    return orderList.value.reduce((sum, item) => sum + item.quantity, 0);
});

// 총 가격 계산
const total_price = computed(() => {
    return orderList.value.reduce((sum, item) => {
        const optionsPrice = item.options ? item.options.reduce((optSum, opt) => optSum + opt.price, 0) : 0;
        return sum + ((item.price + optionsPrice) * item.quantity);
    }, 0);
});

// 선택된 결제 방법
const selectedPayment = ref(null);

// 결제 방법 선택
const selectPayment = (method) => {
    selectedPayment.value = method;
};

// 결제 처리
const processPayment = () => {
    if (!selectedPayment.value) {
        alert('결제 방법을 선택해주세요.');
        return;
    }

    // 결제 완료 후 테이블 초기화
    if (orderInfo.value.type === 'table') {
        clearTableOrders(orderInfo.value.tableId);
    } else if (orderInfo.value.type === 'delivery') {
        clearDeliveryOrders(orderInfo.value.deliveryService);
    }

    alert(`${selectedPayment.value} 방식으로 ${total_price.value.toLocaleString()}원 결제가 완료되었습니다.`);
    router.push('/pos');
};

// 테이블 주문 초기화
const clearTableOrders = (tableId) => {
    const tables = JSON.parse(localStorage.getItem('restaurant_tables') || '[]');
    const tableIndex = tables.findIndex(t => t.id == tableId);

    if (tableIndex !== -1) {
        // 테이블 상태 초기화
        tables[tableIndex].status = 'empty';
        tables[tableIndex].orders = [];
        localStorage.setItem('restaurant_tables', JSON.stringify(tables));
    }
};

// 배달 주문 초기화
const clearDeliveryOrders = (service) => {
    const deliveryOrders = JSON.parse(localStorage.getItem('delivery_orders') || '{}');

    if (deliveryOrders[service]) {
        deliveryOrders[service] = [];
        localStorage.setItem('delivery_orders', JSON.stringify(deliveryOrders));
    }
};

// 뒤로가기
const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="payment_container">
        <!-- 결제 섹션 -->
        <div class="payment_section">
            <div class="payment_header">
                <button class="back_btn" @click="goBack">← 뒤로가기</button>
                <h2>총 결제금액</h2>
                <p class="payment_amount">{{ total_price.toLocaleString() }}원을 결제할게요</p>
            </div>

            <!-- 결제 방법 컨테이너 -->
            <div class="payment_methods">
                <!-- 카드 결제 -->
                <div class="payment_method" :class="{ 'selected': selectedPayment === '카드' }"
                    @click="selectPayment('카드')">
                    <div class="payment_icon">
                        <!-- SVG 아이콘으로 대체 (이미지 경로 문제 해결) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                    </div>
                    <p>카드 결제</p>
                </div>

                <!-- 현금 결제 -->
                <div class="payment_method" :class="{ 'selected': selectedPayment === '현금' }"
                    @click="selectPayment('현금')">
                    <div class="payment_icon">
                        <!-- SVG 아이콘으로 대체 (이미지 경로 문제 해결) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <p>현금 결제</p>
                </div>

                <!-- QR 결제 -->
                <div class="payment_method" :class="{ 'selected': selectedPayment === 'QR' }"
                    @click="selectPayment('QR')">
                    <div class="payment_icon">
                        <!-- SVG 아이콘으로 대체 (이미지 경로 문제 해결) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                        </svg>
                    </div>
                    <p>QR 결제</p>
                </div>
            </div>

            <button class="pay_button" @click="processPayment">결제하기</button>
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
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.payment_container {
    display: flex;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    gap: 20px;
}

/* 결제 섹션 스타일 */
.payment_section {
    flex: 2;
    background-color: #f9f9f9;
    border-radius: 15px;
    padding: 30px;
    display: flex;
    flex-direction: column;
}

.payment_header {
    margin-bottom: 30px;
}

.back_btn {
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 15px;
}

.back_btn:hover {
    background-color: #5a6268;
}

.payment_header h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.payment_amount {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

/* 결제 방법 컨테이너 - 가로 정렬 */
.payment_methods {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 40px;
}

.payment_method {
    flex: 1;
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid transparent;
}

.payment_method:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.payment_method.selected {
    border-color: #6c3ce9;
    background-color: #f0e8ff;
}

.payment_icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color: #6c3ce9;
}

.payment_method p {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}

.pay_button {
    background-color: #6c3ce9;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: auto;
}

.pay_button:hover {
    background-color: #5c2cd9;
}

/* 주문 목록 스타일 */
.order_container {
    flex: 1;
    max-width: 400px;
}

.order_list {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid #ddd;
    padding: 15px;
    height: 100%;
    overflow-y: auto;
}

.order_list h3 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
}

.order_list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.order_list li {
    background: #FFFFFF;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #ccc;
}

.order_list li ul {
    margin-top: 5px;
    padding-left: 10px;
    font-size: 14px;
}

.order_list li ul li {
    color: #666;
    border: none;
    margin-bottom: 2px;
    padding: 2px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .payment_container {
        flex-direction: column;
    }

    .payment_section {
        order: 1;
    }

    .order_container {
        order: 2;
        max-width: 100%;
    }

    /* 모바일에서도 가로 정렬 유지 */
    .payment_methods {
        flex-direction: row;
        flex-wrap: wrap;
    }

    /* 모바일에서 결제 방법 카드 크기 조정 */
    .payment_method {
        min-width: 100px;
    }
}

/* 매우 작은 화면에서는 세로 정렬로 변경 */
@media (max-width: 480px) {
    .payment_methods {
        flex-direction: column;
    }
}
</style>