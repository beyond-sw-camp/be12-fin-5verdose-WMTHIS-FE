<script setup>
import { computed, ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import { useSaleStore } from "@/stores/useSaleStore";
import { watch } from "vue";

const saleStore = useSaleStore();

onMounted(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 👉 getMonth()는 0부터 시작하니 +1 필요

  saleStore.fetchMonthSales({ year, month });
});

const detailedSalesMap = computed(() => {
  const map = {};
  if (Array.isArray(saleStore.monthSales)) {
    saleStore.monthSales.forEach((day) => {
      map[day.date] = {
        salesAmount: day.sales,
        orderCount: day.number,
      };
    });
  }
  return map;
});

const props = defineProps({
  currentMonth: { type: Number, required: true },
  currentYear: { type: Number, required: true },
});

watch(
  () => [props.currentYear, props.currentMonth],
  ([newYear, newMonth]) => {
    // month는 +1 해서 백엔드에 넘겨야 할 수도 있음 (getMonth 0-based 확인)
    saleStore.fetchMonthSales({ year: newYear, month: newMonth + 1 });
  },
  { immediate: true }
);

const emit = defineEmits(["update:currentMonth", "update:currentYear", "date-selected", "period-selected"]);

const rangeSelecting = ref(false);
const selectedRangeStart = ref(null);
const selectedRangeEnd = ref(null);

const selectedDate = ref(null);
const selectedRange = ref([]);
const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const currentYearMonth = computed(() => `${props.currentYear}년 ${props.currentMonth + 1}월`);

const calendarDays = computed(() => {
  const days = [];
  const firstDay = new Date(props.currentYear, props.currentMonth, 1);
  const lastDay = new Date(props.currentYear, props.currentMonth + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  if (firstDayOfWeek > 0) {
    const prevMonthLastDay = new Date(props.currentYear, props.currentMonth, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(props.currentYear, props.currentMonth - 1, prevMonthLastDay - i);
      days.push({ day: prevMonthLastDay - i, date, currentMonth: false, sales: getSalesForDate(date) });
    }
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(props.currentYear, props.currentMonth, i);
    days.push({ day: i, date, currentMonth: true, sales: getSalesForDate(date) });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(props.currentYear, props.currentMonth + 1, i);
    days.push({ day: i, date, currentMonth: false, sales: getSalesForDate(date) });
  }

  return days;
});

const getSalesForDate = (date) => {
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return detailedSalesMap.value[formattedDate] || { salesAmount: 0, orderCount: 0 };
};

const isToday = (date) => {
  const today = new Date();
  return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate();
};

const isSelected = (date) => {
  return selectedRange.value.some(
    (selected) => selected.getFullYear() === date.getFullYear() && selected.getMonth() === date.getMonth() && selected.getDate() === date.getDate()
  );
};

const selectDate = (date) => {
  if (!rangeSelecting.value) {
    activeTab.value = null;
    selectedDate.value = date;
    selectedRange.value = [date];
    emit("date-selected", date);
    emit("period-selected", "specific");
  } else {
    if (!selectedRangeStart.value) {
      selectedRangeStart.value = date;
    } else {
      selectedRangeEnd.value = date;
      const start = selectedRangeStart.value < date ? selectedRangeStart.value : date;
      const end = selectedRangeStart.value > date ? selectedRangeStart.value : date;
      selectedRange.value = getDateRange(start, end);
      selectedDate.value = start;
      emit("date-selected", start);
      emit("period-selected", { type: "custom", start, end });
      rangeSelecting.value = false;
    }
  }
};

const formatSales = (amount) => amount.toLocaleString() + "원";

const startRangeSelection = () => {
  activeTab.value = "custom";
  rangeSelecting.value = true;
  selectedRangeStart.value = null;
  selectedRangeEnd.value = null;
  selectedRange.value = [];
};

const prevMonth = () => {
  if (props.currentMonth === 0) {
    emit("update:currentMonth", 11);
    emit("update:currentYear", props.currentYear - 1);
  } else {
    emit("update:currentMonth", props.currentMonth - 1);
  }
};

const nextMonth = () => {
  if (props.currentMonth === 11) {
    emit("update:currentMonth", 0);
    emit("update:currentYear", props.currentYear + 1);
  } else {
    emit("update:currentMonth", props.currentMonth + 1);
  }
};

const activeTab = ref("today");

const setActiveTab = (tab) => {
  activeTab.value = tab;
  const today = new Date();

  if (tab === "yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    selectedDate.value = yesterday;
    selectedRange.value = [yesterday];
    emit("date-selected", yesterday);
    emit("period-selected", "yesterday");
  } else if (tab === "today") {
    selectedDate.value = today;
    selectedRange.value = [today];
    emit("date-selected", today);
    emit("period-selected", "today");
  } else if (tab === "thisweek") {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    selectedDate.value = startOfWeek;
    selectedRange.value = getDateRange(startOfWeek, endOfWeek);
    emit("date-selected", startOfWeek);
    emit("period-selected", "week");
  } else if (tab === "thismonth") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    selectedDate.value = startOfMonth;
    selectedRange.value = getDateRange(startOfMonth, endOfMonth);
    emit("date-selected", startOfMonth);
    emit("period-selected", "month");
  }
};

const getDateRange = (startDate, endDate) => {
  const range = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    range.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return range;
};
</script>

<template>
  <div class="calendar">
    <div class="calendar-header-function">
      <div class="header-controls">
        <button class="month-nav" @click="prevMonth">
          <span class="arrow">◀</span>
        </button>
        <span class="current-month">{{ currentYearMonth }}</span>
        <button class="month-nav" @click="nextMonth">
          <span class="arrow">▶</span>
        </button>
      </div>
      <div class="view-tabs">
        <button class="tab-btn" :class="{ active: activeTab === 'yesterday' }" @click="setActiveTab('yesterday')">어제</button>
        <button class="tab-btn" :class="{ active: activeTab === 'today' }" @click="setActiveTab('today')">오늘</button>
        <button class="tab-btn" :class="{ active: activeTab === 'thisweek' }" @click="setActiveTab('thisweek')">이번주</button>
        <button class="tab-btn" :class="{ active: activeTab === 'thismonth' }" @click="setActiveTab('thismonth')">이번달</button>
      </div>

      <button class="tab-btn" :class="{ active: activeTab === 'custom' }" @click="startRangeSelection">날짜선택</button>
    </div>
    <div class="calendar-header">
      <div class="weekday" v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-body">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="['calendar-day', { 'other-month': !day.currentMonth }, { today: isToday(day.date) }, { selected: isSelected(day.date) }]"
        @click="selectDate(day.date)"
      >
        <div class="day-number">{{ day.day }}</div>
        <div v-if="day.sales && (day.sales.salesAmount || day.sales.orderCount)" class="sales-indicator">
          <div class="sales-box1">{{ formatSales(day.sales.salesAmount) }}</div>
          <div class="sales-box2">{{ day.sales.orderCount }}건</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.calendar {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 10px;
}

.weekday {
  font-weight: 500;
  padding: 10px;
  color: #666;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background-color: #f0f0f0;
}

.other-month {
  opacity: 0.5;
}

.today {
  background-color: #f0f8ff;
}

.selected {
  background-color: #e6f7ff;
  border: 1px solid #1890ff;
}

.day-number {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

.sales-indicator {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
}

.sales-box1 {
  padding: 2px 4px;
  background-color: #b1d5c2;
  border-radius: 4px;
  color: #333;
  font-weight: 500;
  text-align: center;
}

.sales-box2 {
  padding: 2px 4px;
  background-color: #f8d7a9;
  border-radius: 4px;
  color: #333;
  font-weight: 500;
  text-align: center;
}

.sales-categories {
  display: flex;
  gap: 2px;
  margin-top: 2px;
}

.category-box {
  flex: 1;
  height: 4px;
  border-radius: 2px;
}

.food {
  background-color: #ffd666;
}

.beverage {
  background-color: #87e8de;
}

.other {
  background-color: #ff9c6e;
}

.calendar-header-function {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-month {
  font-size: 16px;
  font-weight: bold;
}

.month-nav {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.view-tabs {
  display: flex;
  gap: 8px;
}

.tab-btn {
  padding: 6px 12px;
  border: none;
  background-color: #eee;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.tab-btn.active {
  background-color: #333;
  /* 활성화된 버튼의 배경색 */
  color: #fff;
  /* 활성화된 버튼의 텍스트 색상 */
}
</style>
