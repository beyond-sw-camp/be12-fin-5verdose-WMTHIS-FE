<script setup>
import { ref, computed } from 'vue';
import Calendar from '@/components/sales_management/Calendar.vue';
import SalesDetail from '@/components/sales_management/SalesDetail.vue';

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref(new Date());
const selectedPeriod = ref('today'); // 추가: 선택된 기간 (today, yesterday, week, month)

const currentYearMonth = computed(() => {
    return `${currentYear.value}년 ${currentMonth.value + 1}월`;
});

const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
};

const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
};

const salesData = ref({
    '2025-04-01': [
        { type: 'hall', amount: 12000, paidAt: '2025-04-01 11:25' },
        { type: 'baemin', amount: 18000, paidAt: '2025-04-01 12:10' },
        { type: 'coupang', amount: 16000, paidAt: '2025-04-01 12:45' },
        { type: 'yogiyo', amount: 13000, paidAt: '2025-04-01 13:20' },
        { type: 'hall', amount: 15000, paidAt: '2025-04-01 13:55' },
        { type: 'baemin', amount: 50000, paidAt: '2025-04-01 13:55' }
    ],
    '2025-04-06': [
        { type: 'hall', amount: 12000, paidAt: '2025-04-01 11:25' },
        { type: 'baemin', amount: 18000, paidAt: '2025-04-01 12:10' },
        { type: 'coupang', amount: 16000, paidAt: '2025-04-01 12:45' },
        { type: 'yogiyo', amount: 13000, paidAt: '2025-04-01 13:20' },
        { type: 'hall', amount: 15000, paidAt: '2025-04-01 13:55' },
        { type: 'baemin', amount: 50000, paidAt: '2025-04-01 13:55' }
    ],

    '2025-04-07': [
        { type: 'hall', amount: 12000, paidAt: '2025-04-01 11:25' },
        { type: 'baemin', amount: 18000, paidAt: '2025-04-01 12:10' },
        { type: 'coupang', amount: 16000, paidAt: '2025-04-01 12:45' },
        { type: 'yogiyo', amount: 13000, paidAt: '2025-04-01 13:20' },
        { type: 'hall', amount: 15000, paidAt: '2025-04-01 13:55' },
        { type: 'baemin', amount: 20000, paidAt: '2025-04-01 13:55' }
    ],
    '2025-04-08': [
        { type: 'hall', amount: 12000, paidAt: '2025-04-01 11:25' },
        { type: 'baemin', amount: 18000, paidAt: '2025-04-01 12:10' },
        { type: 'coupang', amount: 16000, paidAt: '2025-04-01 12:45' },
        { type: 'yogiyo', amount: 13000, paidAt: '2025-04-01 13:20' },
        { type: 'hall', amount: 15000, paidAt: '2025-04-01 13:55' },
        { type: 'baemin', amount: 40000, paidAt: '2025-04-01 13:55' }
    ]
});

// 날짜 선택 핸들러
const handleDateSelected = (date) => {
    selectedDate.value = date;
    // 날짜를 직접 클릭했을 때는 selectedPeriod를 null로 설정
    selectedPeriod.value = null;
};

// 기간 선택 핸들러 추가
const handlePeriodSelected = (period) => {
    selectedPeriod.value = period;
};
</script>

<template>
    <div class="app-container">
        <header class="header">
            <h1>매출 분석 상세</h1>
        </header>

        <main class="main-content">
            <div class="calendar-container">
                <Calendar :current-month="currentMonth" :current-year="currentYear" :sales-data="salesData"
                    @update:currentMonth="currentMonth = $event" @update:currentYear="currentYear = $event"
                    @date-selected="handleDateSelected" @period-selected="handlePeriodSelected" />
            </div>
            <div class="sales-detail-container">
                <SalesDetail :selected-date="selectedDate" :sales-data="salesData" :selected-period="selectedPeriod" />
            </div>
        </main>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.header-div {
    display: flex;
    gap: 200px;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
}

.header-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.view-tabs {
    margin-top: 10px;
    display: flex;
    gap: 8px;
}

.tab-btn {
    padding: 6px 12px;
    border: none;
    background-color: #eee;
    cursor: pointer;
    border-radius: 6px;
}

.tab-btn.active {
    background-color: #333;
    color: #fff;
}

.main-content {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.calendar-container {
    flex: 1;
    max-width: 50%;
}

.sales-detail-container {
    flex: 1;
    max-width: 50%;
}
</style>
