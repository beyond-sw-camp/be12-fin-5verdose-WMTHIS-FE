<script setup>
import { ref, computed } from 'vue';

const selectedCategory = ref('all'); // 'all', 'hall', 'baemin', 'coupang', 'yogiyo'

// 카테고리 맵을 정의하여 텍스트를 한국어로 매핑
const categoryMap = {
    all: '전체',
    hall: '홀',
    baemin: '배달의 민족',
    coupang: '쿠팡',
    yogiyo: '요기요',
};

const filteredHourlyData = computed(() => {
    if (selectedCategory.value === 'all') {
        return hourlyData.value;
    }
    return hourlyData.value.map(hour => ({
        hour: hour.hour,
        [selectedCategory.value]: hour[selectedCategory.value],
    }));
});
// 추가: 날짜 범위에 따른 데이터 처리를 위한 props 수정
const props = defineProps({
    selectedDate: {
        type: Object, // Date 객체 또는 null/undefined를 허용
        default: null,
    },
    salesData: {
        type: Object,
        default: () => ({}),
    },
    selectedPeriod: {
        type: String,
        default: 'today', // 'today', 'yesterday', 'week', 'month', 'specific' 중 하나
    }
});

// 날짜 범위에 따른 데이터 필터링 - 수정된 부분
const filteredSalesData = computed(() => {
    if (!props.selectedDate) return [];

    // 선택된 날짜를 기준으로 시작
    const selectedDate = new Date(props.selectedDate);
    selectedDate.setHours(0, 0, 0, 0);

    // 오늘 날짜 계산
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (props.selectedPeriod === 'today') {
        // 오늘 데이터
        const dateStr = formatDateToString(today);
        return props.salesData[dateStr] || [];
    }
    else if (props.selectedPeriod === 'yesterday') {
        // 어제 데이터 - 이미 어제 날짜가 selectedDate로 전달되므로 그대로 사용
        const dateStr = formatDateToString(selectedDate);
        return props.salesData[dateStr] || [];
    }
    else if (props.selectedPeriod === 'week') {
        // 이번 주 데이터 (일요일부터 토요일까지)
        const currentDay = today.getDay(); // 0(일요일)부터 6(토요일)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay); // 이번 주 시작일 (일요일)

        let allWeekData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const dateStr = formatDateToString(date);
            const dayData = props.salesData[dateStr] || [];
            allWeekData = [...allWeekData, ...dayData];
        }
        return allWeekData;
    }
    else if (props.selectedPeriod === 'month') {
        // 이번 달 데이터 (1일부터 말일까지)
        const year = today.getFullYear();
        const month = today.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();

        let allMonthData = [];
        for (let i = 1; i <= lastDay; i++) {
            const date = new Date(year, month, i);
            const dateStr = formatDateToString(date);
            const dayData = props.salesData[dateStr] || [];
            allMonthData = [...allMonthData, ...dayData];
        }
        return allMonthData;
    }
    else if (props.selectedPeriod === 'specific') {
        // 특정 날짜 데이터 - 선택된 날짜의 데이터 표시
        const dateStr = formatDateToString(selectedDate);
        return props.salesData[dateStr] || [];
    }

    // 기본값: 선택된 날짜의 데이터
    const dateStr = formatDateToString(selectedDate);
    return props.salesData[dateStr] || [];
});

// 날짜를 문자열로 변환하는 헬퍼 함수
const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 현재 표시되는 데이터 수정
const currentDateData = computed(() => {
    return filteredSalesData.value;
});

// 표시되는 날짜 텍스트 수정
const formattedDate = computed(() => {
    if (!props.selectedDate) return '';

    const year = props.selectedDate.getFullYear();
    const month = props.selectedDate.getMonth() + 1;
    const date = props.selectedDate.getDate();

    if (props.selectedPeriod === 'today') {
        return `${year}년 ${month}월 ${date}일 (오늘)`;
    }
    else if (props.selectedPeriod === 'yesterday') {
        return `${year}년 ${month}월 ${date}일 (어제)`;
    }
    else if (props.selectedPeriod === 'week') {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const startMonth = startOfWeek.getMonth() + 1;
        const startDate = startOfWeek.getDate();
        const endMonth = endOfWeek.getMonth() + 1;
        const endDate = endOfWeek.getDate();

        return `${year}년 ${startMonth}월 ${startDate}일 ~ ${endMonth}월 ${endDate}일 (이번주)`;
    }
    else if (props.selectedPeriod === 'month') {
        const lastDay = new Date(year, month, 0).getDate();
        return `${year}년 ${month}월 1일 ~ ${month}월 ${lastDay}일 (이번달)`;
    }
    else if (props.selectedPeriod === 'specific') {
        return `${year}년 ${month}월 ${date}일`;
    }

    return `${year}년 ${month}월 ${date}일`;
});

const dateString = computed(() => {
    if (!props.selectedDate) return '';

    const year = props.selectedDate.getFullYear();
    const month = String(props.selectedDate.getMonth() + 1).padStart(2, '0');
    const date = String(props.selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
});


const totalOrders = computed(() => {
    return currentDateData.value.length;
});

const totalSales = computed(() => {
    return currentDateData.value.reduce((sum, item) => sum + item.amount, 0);
});
const deliveryTotal = computed(() => {
    return categorySales.value.baemin + categorySales.value.coupang + categorySales.value.yogiyo;
});
const categorySales = computed(() => {
    const result = {
        hall: 0,
        baemin: 0,
        coupang: 0,
        yogiyo: 0
    };

    currentDateData.value.forEach(item => {
        if (result[item.type] !== undefined) {
            result[item.type] += item.amount;
        }
    });

    return result;
});

const hourlyData = computed(() => {
    const hours = {};

    for (let i = 0; i < 24; i++) {
        hours[i] = {
            hour: i,
            hall: 0,
            baemin: 0,
            coupang: 0,
            yogiyo: 0
        };
    }

    currentDateData.value.forEach(item => {
        const paidTime = new Date(item.paidAt);
        const hour = paidTime.getHours();

        if (hours[hour] && hours[hour][item.type] !== undefined) {
            hours[hour][item.type] += item.amount;
        }
    });

    return Object.values(hours);
});

const formatCurrency = (amount) => {
    return amount.toLocaleString() + '원';
};

const yAxisValues = computed(() => {
    let maxValue = 0;
    hourlyData.value.forEach(hour => {
        const total = hour.hall + hour.baemin + hour.coupang + hour.yogiyo;
        if (total > maxValue) maxValue = total;
    });

    if (maxValue < 20000) maxValue = 20000;

    const step = Math.ceil(maxValue / 5 / 10000) * 10000;
    return [0, step, step * 2, step * 3, step * 4, step * 5];
});

const formatYAxisLabel = (value) => {
    if (value >= 10000) {
        return `${value / 5000}만`;
    }
    return value;
};

const calculateBarHeight = (value) => {
    if (!value) return '0%';
    const maxValue = yAxisValues.value[yAxisValues.value.length - 1];
    const percentage = (value / maxValue) * 100;
    return `${percentage}%`;
};

const categoryOrderCount = computed(() => {
    const result = {
        hall: 0,
        baemin: 0,
        coupang: 0,
        yogiyo: 0
    };

    currentDateData.value.forEach(item => {
        if (result[item.type] !== undefined) {
            result[item.type] += 1;
        }
    });

    return result;
});

// 배달 주문 건수 계산
const deliveryOrderCount = computed(() => {
    return categoryOrderCount.value.baemin + categoryOrderCount.value.coupang + categoryOrderCount.value.yogiyo;
});
</script>

<template>
    <!-- 템플릿 부분은 변경 없음 -->
    <div class="sales-detail">
        <div v-if="props.selectedDate" class="date-info">
            <h2>{{ formattedDate }} 매출 정보</h2>

            <div class="summary-cards">
                <div class="total-summary">
                    <p>총 매출</p><span>{{ formatCurrency(totalSales) }}</span>
                </div>

                <div class="total-summary">
                    <p>주문건수</p><span>{{ totalOrders }}건</span>
                </div>
                <hr>
                <div>
                    <div class="delivery-summary-title">
                        <p>홀</p><span>{{ formatCurrency(categorySales.hall) }} ({{ categoryOrderCount.hall }}건)</span>
                    </div>
                    <div class="delivery-summary-title">
                        <p>배달</p> <span>총 {{ formatCurrency(deliveryTotal) }} ({{ deliveryOrderCount }}건)</span>
                    </div>

                    <hr>
                    <div class="delivery-summary">
                        <p>배민</p><span>{{ formatCurrency(categorySales.baemin) }}
                            ({{ categoryOrderCount.baemin
                            }}건)</span>
                    </div>
                    <div class="delivery-summary">
                        <p>쿠팡</p><span>{{ formatCurrency(categorySales.coupang) }} ({{ categoryOrderCount.coupang
                        }}건)</span>
                    </div>
                    <div class="delivery-summary">
                        <p>요기요</p><span>{{ formatCurrency(categorySales.yogiyo) }} ({{ categoryOrderCount.yogiyo
                        }}건)</span>
                    </div>
                </div>
            </div>

            <div class="sales-detail">
                <div v-if="props.selectedDate" class="date-info">
                    <div class="chart-container">
                        <div class="chart-header">
                            <div class="chart-title">시간대별 매출</div>
                            <div class="chart-buttons">
                                <button v-for="category in ['all', 'hall', 'baemin', 'coupang', 'yogiyo']"
                                    :key="category" :class="{ active: selectedCategory === category }"
                                    @click="selectedCategory = category">
                                    {{ categoryMap[category] }}
                                </button>
                            </div>
                        </div>

                        <div class="chart">
                            <div class="y-axis">
                                <div v-for="value in yAxisValues" :key="value" class="y-axis-label">
                                    {{ formatYAxisLabel(value) }}
                                </div>
                            </div>

                            <div class="chart-bars">
                                <div v-for="hourData in filteredHourlyData" :key="hourData.hour" class="hour-column">
                                    <div class="bar-container">
                                        <div v-if="selectedCategory === 'all' || selectedCategory === 'hall'"
                                            class="bar hall-bar" :style="{ height: calculateBarHeight(hourData.hall) }">
                                        </div>
                                        <div v-if="selectedCategory === 'all' || selectedCategory === 'baemin'"
                                            class="bar baemin-bar"
                                            :style="{ height: calculateBarHeight(hourData.baemin) }"></div>
                                        <div v-if="selectedCategory === 'all' || selectedCategory === 'coupang'"
                                            class="bar coupang-bar"
                                            :style="{ height: calculateBarHeight(hourData.coupang) }"></div>
                                        <div v-if="selectedCategory === 'all' || selectedCategory === 'yogiyo'"
                                            class="bar yogiyo-bar"
                                            :style="{ height: calculateBarHeight(hourData.yogiyo) }"></div>
                                    </div>
                                    <div class="hour-label">{{ hourData.hour }}시</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="no-data">
            <p>날짜를 선택하여 매출 정보를 확인하세요.</p>
        </div>
    </div>
</template>

<style scoped>
.sales-detail {
    height: 100%;
}

.date-info {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.date-info h2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #333;
}

.summary-cards {
    gap: 10px;
    border: #B0B0B0 solid 1px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
}

.summary-cards hr {
    margin-bottom: 15px;
}

.total-summary {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
}

.total-summary span {
    font-weight: bold;
}

.delivery-summary {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 16px;
}

.delivery-summary-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 16px;
}

.delivery-summary-title p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
}

.summary_title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
}

.second-row {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 20px;
}

.card-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
}

.card-value {
    font-size: 16px;
    font-weight: 700;
    color: #333;
}

.chart-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    padding-bottom: 50px;
    /* 기존 padding-bottom에 여유 공간 추가 */
    position: relative;
    /* 절대 위치 요소를 포함하기 위해 relative 설정 */
}

.chart-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.chart-title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
}

.chart-legend {
    display: flex;
    gap: 15px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 2px;
}

.legend-color.hall {
    background-color: #ffd666;
}

.legend-color.baemin {
    background-color: #87e8de;
}

.legend-color.coupang {
    background-color: #ff9c6e;
}

.legend-color.yogiyo {
    background-color: #b37feb;
}

.legend-label {
    font-size: 12px;
    color: #666;
}

.chart {
    flex: 1;
    display: flex;
    position: relative;
}

.y-axis {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    padding-right: 10px;
    width: 40px;
}

.y-axis-label {
    font-size: 12px;
    color: #999;
}

.chart-bars {
    flex: 1;
    display: flex;
    align-items: flex-end;
    gap: 10px;
    position: relative;
}

.chart-bars::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 1px;
    background-color: #eee;
}

.hour-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
    /* position 설정 추가 */
}

.bar-container {
    width: 100%;
    margin-top: 25px;
    height: calc(100% - 10px);
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}

.bar {
    width: 70%;
    transition: height 0.3s;
}

.hall-bar {
    background-color: #ffd666;
    border-radius: 2px 2px 0 0;
    z-index: 4;
}

.baemin-bar {
    background-color: #87e8de;
    margin-top: 1px;
    z-index: 3;
}

.coupang-bar {
    background-color: #ff9c6e;
    margin-top: 1px;
    z-index: 2;
}

.yogiyo-bar {
    background-color: #b37feb;
    margin-top: 1px;
    z-index: 1;
}

.hour-label {
    font-size: 12px;
    color: #666;
    position: absolute;
    bottom: -40px;
}

.no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #999;
}

@media (max-width: 768px) {
    .summary-cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .second-row {
        grid-template-columns: repeat(2, 1fr);
    }
}

.chart-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    /* 버튼들을 오른쪽으로 정렬 */
    flex: 1;
    margin-top: 10px;
}

button {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 12px;
    cursor: pointer;
}

button:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
}

button.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

button:focus {
    outline: none;
}
</style>
