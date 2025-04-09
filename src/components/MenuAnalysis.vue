<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import upIcon from "../assets/up.png";
import downIcon from "../assets/down.png";

const keyword = ref("");
const salesData = [
  {
    date: "2025-04-05",
    time: "04:55:00",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-07",
    time: "06:34:41",
    categoryName: "파스타",
    menuName: "쉬림프로제",
  },
  {
    date: "2025-04-05",
    time: "20:30:10",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-07",
    time: "09:26:52",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-07",
    time: "15:35:31",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-06",
    time: "17:21:25",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-06",
    time: "00:18:27",
    categoryName: "피자",
    menuName: "포테이토피자",
  },
  {
    date: "2025-04-05",
    time: "01:34:21",
    categoryName: "파스타",
    menuName: "쉬림프로제",
  },
  {
    date: "2025-04-05",
    time: "17:01:13",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-05",
    time: "23:37:55",
    categoryName: "피자",
    menuName: "포테이토피자",
  },
  {
    date: "2025-04-07",
    time: "22:31:25",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-05",
    time: "04:20:04",
    categoryName: "피자",
    menuName: "포테이토피자",
  },
  {
    date: "2025-04-07",
    time: "19:08:03",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-07",
    time: "18:58:56",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-05",
    time: "21:47:10",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-07",
    time: "17:58:41",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-07",
    time: "03:03:02",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-05",
    time: "00:35:05",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-06",
    time: "21:43:30",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-06",
    time: "01:16:19",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-07",
    time: "17:25:53",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-05",
    time: "18:38:43",
    categoryName: "피자",
    menuName: "포테이토피자",
  },
  {
    date: "2025-04-06",
    time: "00:38:58",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-06",
    time: "07:57:46",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-05",
    time: "13:29:15",
    categoryName: "피자",
    menuName: "포테이토피자",
  },
  {
    date: "2025-04-07",
    time: "10:20:19",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-05",
    time: "21:35:05",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-06",
    time: "16:21:18",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-06",
    time: "04:20:32",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-05",
    time: "10:35:25",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-05",
    time: "02:11:43",
    categoryName: "파스타",
    menuName: "크림치즈 파스타",
  },
  {
    date: "2025-04-05",
    time: "17:25:37",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-05",
    time: "15:48:53",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-07",
    time: "02:08:54",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-05",
    time: "06:01:29",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-06",
    time: "21:40:02",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-06",
    time: "12:34:22",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-07",
    time: "06:54:27",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-06",
    time: "00:31:49",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-05",
    time: "23:20:02",
    categoryName: "피자",
    menuName: "쉬림프피자",
  },
  {
    date: "2025-04-06",
    time: "12:44:44",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-05",
    time: "04:20:10",
    categoryName: "피자",
    menuName: "불고기피자",
  },
  {
    date: "2025-04-05",
    time: "04:59:05",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-06",
    time: "00:05:47",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-06",
    time: "11:52:31",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-07",
    time: "12:34:42",
    categoryName: "파스타",
    menuName: "머쉬룸파스타",
  },
  {
    date: "2025-04-06",
    time: "20:26:50",
    categoryName: "피자",
    menuName: "포테이토피자",
  },
  {
    date: "2025-04-06",
    time: "06:49:10",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-06",
    time: "06:16:14",
    categoryName: "파스타",
    menuName: "알리오올리오",
  },
  {
    date: "2025-04-05",
    time: "19:58:13",
    categoryName: "파스타",
    menuName: "쉬림프로제",
  },
];

const flatList = [
  { menuName: "알리오올리오", category: "파스타" },
  { menuName: "쉬림프로제", category: "파스타" },
  { menuName: "머쉬룸파스타", category: "파스타" },
  { menuName: "크림치즈 파스타", category: "파스타" },
  { menuName: "불고기피자", category: "피자" },
  { menuName: "포테이토피자", category: "피자" },
  { menuName: "쉬림프피자", category: "피자" },
];

const filteredList = computed(() => {
  const query = keyword.value.trim();
  if (!query) return flatList;

  return flatList.filter((item) => item.menuName.includes(query));
});

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartData = computed(() => {
  const result = new Array(24).fill(0); // 00시 ~ 23시까지 24칸 초기화
  const query = keyword.value.trim();

  const filteredData = salesData.filter((item) => item.date === selectedDate.value);
  filteredData.forEach(({ menuName, time }) => {
    if (!query || menuName.includes(query)) {
      const hour = parseInt(time.split(":")[0], 10);
      result[hour]++;
    }
  });

  return {
    labels: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")),
    datasets: [
      {
        label: "판매 수",
        data: result,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
    },
  },
};

// 달력 관련 데이터
const currentDate = ref(new Date("2025-04-07"));
const selectedDate = ref("2025-04-07");
const showCalendar = ref(false);
const selectedDateTable = computed(() => {
  return selectedDate.value.replace(/-/g, ".").slice(-5);
});

// 현재 달의 첫 날과 마지막 날 계산
const firstDayOfMonth = computed(() => {
  const date = new Date(currentDate.value);
  date.setDate(1);
  return date;
});

const lastDayOfMonth = computed(() => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
});

// 달력에 표시할 날짜 배열 생성
const calendarDays = computed(() => {
  const days = [];

  // 이전 달의 날짜 추가
  const firstDay = firstDayOfMonth.value.getDay();
  if (firstDay > 0) {
    const prevMonthLastDay = new Date(firstDayOfMonth.value);
    prevMonthLastDay.setDate(0);
    const lastDate = prevMonthLastDay.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(prevMonthLastDay);
      date.setDate(lastDate - i);
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: isSameDay(date, new Date(selectedDate.value)),
      });
    }
  }

  // 현재 달의 날짜 추가
  const lastDate = lastDayOfMonth.value.getDate();
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(firstDayOfMonth.value);
    date.setDate(i);
    days.push({
      date,
      isCurrentMonth: true,
      isSelected: isSameDay(date, new Date(selectedDate.value)),
    });
  }

  // 다음 달의 날짜 추가
  const lastDay = lastDayOfMonth.value.getDay();
  if (lastDay < 6) {
    const nextMonthFirstDay = new Date(lastDayOfMonth.value);
    nextMonthFirstDay.setDate(lastDayOfMonth.value.getDate() + 1);

    for (let i = 0; i < 6 - lastDay; i++) {
      const date = new Date(nextMonthFirstDay);
      date.setDate(nextMonthFirstDay.getDate() + i);
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: isSameDay(date, new Date(selectedDate.value)),
      });
    }
  }

  return days;
});

// 날짜 포맷 함수
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 날짜 비교 함수
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

// 달력 날짜 선택 함수
const selectDate = (day) => {
  selectedDate.value = formatDate(day.date);
  showCalendar.value = false;
};

// 이전 달, 다음 달 이동 함수
const prevMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() - 1);
  currentDate.value = date;
};

const nextMonth = () => {
  const date = new Date(currentDate.value);
  date.setMonth(date.getMonth() + 1);
  currentDate.value = date;
};

// 현재 월 표시 텍스트
const currentMonthText = computed(() => {
  return `${currentDate.value.getFullYear()}년${currentDate.value.getMonth() + 1}월`;
});

// 선택된 날짜의 판매 데이터
const sortOrder = ref("asc");
const sortIcon = computed(() => (sortOrder.value === "asc" ? upIcon : downIcon));
const selectedDateSales = computed(() => {
  // 선택된 날짜의 판매 데이터 필터링
  const query = keyword.value.trim();
  const filteredSales = salesData.filter((item) => item.date === selectedDate.value);
  const filteredMenu = filteredSales.filter((item) => {
    return !query || item.menuName.includes(query);
  });

  filteredMenu.sort((a, b) => {
    return sortOrder.value === "asc"
      ? a.time.localeCompare(b.time) // 오름차순
      : b.time.localeCompare(a.time); // 내림차순
  });
  // 메뉴별 판매 수량 집계
  // const salesByMenu = {};
  // filteredSales.forEach((item) => {
  //   if (!salesByMenu[item.menuName]) {
  //     salesByMenu[item.menuName] = {
  //       menuName: item.menuName,
  //       categoryName: item.categoryName,
  //       time: item.time,
  //       count: 0,
  //     };
  //   }
  //   salesByMenu[item.menuName].count++;
  // });
  return Object.values(filteredMenu);
});

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

// 테이블 너비 동기화를 위한 refs
const nonScrollableWrapperRef = ref(null);
const scrollableWrapperRef = ref(null);
const tableHeaderRef = ref(null);
const tableBodyRef = ref(null);

// 테이블 너비 동기화 함수
const syncTableWidths = () => {
  if (!nonScrollableWrapperRef.value || !scrollableWrapperRef.value || !tableHeaderRef.value || !tableBodyRef.value) return;

  // 스크롤바 너비 계산
  const scrollbarWidth = scrollableWrapperRef.value.offsetWidth - scrollableWrapperRef.value.clientWidth;

  // 헤더 테이블의 너비를 본문 테이블과 동일하게 설정
  const bodyTableWidth = tableBodyRef.value.offsetWidth;
  tableHeaderRef.value.style.width = `${bodyTableWidth}px`;

  // 스크롤바 너비를 고려하여 scrollable_wrapper의 너비 조정
  nonScrollableWrapperRef.value.style.width = `calc(100% - ${scrollbarWidth}px)`;

  // 각 열의 너비 동기화
  const headerCells = tableHeaderRef.value.querySelectorAll("th");
  const bodyCells = tableBodyRef.value.querySelectorAll("tr:first-child td");

  if (headerCells.length === bodyCells.length) {
    for (let i = 0; i < headerCells.length; i++) {
      const width = bodyCells[i].offsetWidth;
      headerCells[i].style.width = `${width}px`;
    }
  }
};

// 컴포넌트 마운트 시 및 데이터 변경 시 테이블 너비 동기화
onMounted(() => {
  nextTick(() => {
    syncTableWidths();

    // 윈도우 리사이즈 시 테이블 너비 재동기화
    window.addEventListener("resize", syncTableWidths);
  });
});

// 선택된 날짜가 변경될 때 테이블 너비 재동기화
watch(selectedDate, () => {
  nextTick(syncTableWidths);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
const onBeforeUnmount = () => {
  window.removeEventListener("resize", syncTableWidths);
};
</script>

<template>
  <div class="menu_analysis">
    <div class="menu_list">
      <div class="header">
        <h1>메뉴 분석</h1>
        <div class="search_container">
          <input v-model="keyword" type="text" placeholder="메뉴 검색" class="search_input" />
          <img src="../assets/search_button.png" alt="검색" class="search_icon" />
        </div>
      </div>
      <table class="menu_table">
        <thead>
          <tr>
            <th>메뉴 명</th>
            <th>카테고리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in filteredList" :key="idx">
            <td>{{ item.menuName }}</td>
            <td>{{ item.category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart_container">
      <div class="chart_header">
        <div class="date_selector">
          <span class="date_display" @click="showCalendar = !showCalendar">
            {{ selectedDate }}
            <span class="calendar_icon">📅</span>
          </span>
          <div v-if="showCalendar" class="calendar">
            <div class="calendar_header">
              <button @click="prevMonth" class="month_nav">&lt;</button>
              <span class="current_month">{{ currentMonthText }}</span>
              <button @click="nextMonth" class="month_nav">&gt;</button>
            </div>
            <div class="weekdays">
              <div class="weekday">S</div>
              <div class="weekday">M</div>
              <div class="weekday">T</div>
              <div class="weekday">W</div>
              <div class="weekday">T</div>
              <div class="weekday">F</div>
              <div class="weekday">S</div>
            </div>
            <div class="days">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="day"
                :class="{
                  other_month: !day.isCurrentMonth,
                  selected: day.isSelected,
                }"
                @click="selectDate(day)"
              >
                {{ day.date.getDate() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart">
        <Bar :data="chartData" :options="chartOptions" />
      </div>

      <!-- 선택된 날짜의 판매 데이터 테이블 -->
      <div class="sales_detail">
        <div class="table_wrapper">
          <div ref="nonScrollableWrapperRef" class="non_scrollable_wrapper">
            <table ref="tableHeaderRef" class="sales_table header_table">
              <thead>
                <tr>
                  <th @click="toggleSortOrder"><img :src="sortIcon" alt="정렬 아이콘" class="search_icon" /> {{ selectedDateTable }}</th>
                  <th>메뉴명</th>
                  <th>수량</th>
                </tr>
              </thead>
            </table>
          </div>

          <div ref="scrollableWrapperRef" class="scrollable_wrapper">
            <table ref="tableBodyRef" class="sales_table body_table">
              <tbody>
                <tr v-for="(item, idx) in selectedDateSales" :key="idx">
                  <td>{{ item.time }}</td>
                  <td>{{ item.menuName }}</td>
                  <td>1</td>
                </tr>
                <tr v-if="selectedDateSales.length === 0">
                  <td colspan="3" class="no_data">해당 날짜의 판매 데이터가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu_analysis {
  width: 90vw;
  height: 70vh;
  background-color: white;
  display: flex;
}

.menu_list {
  width: 45%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.search_container {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  width: 55%;
}

.search_input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.search_input::placeholder {
  color: #ccc;
}

.search_icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.menu_table {
  width: 100%;
  border-spacing: 0;
  margin-top: 10px;
  background-color: white;
}

.menu_table th,
.menu_table td {
  padding: 10px 10px 10px 50px;
  text-align: left;
}

.menu_table th {
  background-color: #b8c0c8;
  font-weight: bold;
}

.menu_table thead th:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.menu_table td {
  border-bottom: 1px solid #b8c0c8;
}

.menu_table thead th:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.menu_table tr:hover {
  background-color: #f9f9f9;
}

.chart_container {
  width: 55%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.chart_header {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.chart {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

/* 달력 스타일 */
.date_selector {
  position: relative;
  margin-left: auto;
}

.date_display {
  cursor: pointer;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

.calendar_icon {
  margin-left: 8px;
}

.calendar {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 12px;
  margin-top: 8px;
}

.calendar_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.month_nav {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.current_month {
  font-weight: bold;
  font-size: 16px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #666;
  padding: 6px 0;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.day:hover {
  background-color: #f0f0f0;
}

.other_month {
  color: #ccc;
}

.selected {
  background-color: rgba(153, 102, 255, 0.2);
  font-weight: bold;
  color: #6b46c1;
}

/* 판매 데이터 테이블 스타일 */
.sales_detail {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  max-height: 200px;
}

.table_wrapper {
  width: 100%;
  position: relative;
}

.non_scrollable_wrapper {
  width: 100%;
  overflow: hidden;
}

.scrollable_wrapper {
  max-height: 130px;
  overflow-y: auto;
  width: 100%;
}

.sales_table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
}

/* 헤더 테이블과 본문 테이블 스타일 분리 */
.header_table {
  margin-bottom: 0;
}

.body_table {
  margin-top: 0;
}

/* 셀 스타일 */
.sales_table th,
.sales_table td {
  padding: 10px;
  text-align: left;
  box-sizing: border-box;
}

/* 헤더 스타일 */
.sales_table th {
  font-weight: bold;
}

.sales_table tr {
  border-top: 1px solid #e3e3e3;
}

.sales_table tr:hover {
  background-color: #f9f9f9;
}

/* 데이터 없을 때 표시 */
.no_data {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>
