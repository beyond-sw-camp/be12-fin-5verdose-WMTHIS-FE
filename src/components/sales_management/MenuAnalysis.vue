<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import upIcon from "@/assets/image/up.png";
import downIcon from "@/assets/image/down.png";
import Calendar from "@/components/Calendar.vue";
import { reactive } from "vue";

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
const startDate = ref("");
const endDate = ref("");
const showByMonth = computed(() => {
  if (!startDate.value || !endDate.value) return false;

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  const timeDiff = end.getTime() - start.getTime();
  const dayCount = timeDiff / (1000 * 60 * 60 * 24) + 1; // +1 해서 당일 포함

  return dayCount > 30;
});
const selectedDate = ref("2025-04-07");
const selectedDateTable = computed(() => {
  return selectedDate.value.replace(/-/g, ".").slice(-5);
});

// 선택된 날짜의 판매 데이터
const sortOrder = ref("asc");

const periodSales = computed(() => {
  const query = keyword.value.trim();
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  // 날짜 범위에 해당하는 데이터 필터링
  const filteredSales = salesData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= start && itemDate <= end;
  });
  console.log(filteredSales);

  // 키워드 필터링
  const filteredMenu = filteredSales.filter((item) => {
    return !query || item.menuName.includes(query);
  });

  filteredMenu.sort((a, b) => {
    const dateCompare = sortOrder.value === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);

    // 날짜가 다르면 date 기준으로 정렬
    if (dateCompare !== 0) return dateCompare;

    // 날짜가 같으면 time 기준으로 정렬
    return sortOrder.value === "asc" ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time);
  });

  return Object.values(filteredMenu);
});

const selectedDates = ref(null);
const detailStatus = ref({}); // 날짜별 열림/닫힘 상태 저장

const toggleDetail = (date) => {
  // 이미 선택된 날짜면 상태 토글
  detailStatus.value[date] = !detailStatus.value[date];
  selectedDates.value = date;
};

const sortIcon = (date) => {
  return detailStatus.value[date] ? upIcon : downIcon;
};

// 중복 제거된 날짜 목록
const uniqueDates = computed(() => {
  const dates = periodSales.value.map((item) => item.date);
  return [...new Set(dates)].sort((a, b) => (sortOrder.value === "asc" ? a.localeCompare(b) : b.localeCompare(a)));
});

const uniqueMonths = computed(() => {
  const months = periodSales.value.map((item) => item.date.slice(0, 7)); // 'YYYY-MM'
  return [...new Set(months)].sort((a, b) => (sortOrder.value === "asc" ? a.localeCompare(b) : b.localeCompare(a)));
});
</script>

<template>
  <div class="menu_analysis">
    <div class="menu_list">
      <div class="header">
        <h1>메뉴 분석</h1>
        <div class="search_container">
          <input v-model="keyword" type="text" placeholder="메뉴 검색" class="search_input" />
          <img src="@/assets/image/search_button.png" alt="검색" class="search_icon" />
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
          <Calendar v-model:startDate="startDate" v-model:endDate="endDate" />
        </div>
      </div>
      <div class="chart">
        <!--<Bar :data="chartData" :options="chartOptions" />-->
      </div>

      <!-- 선택된 날짜의 판매 데이터 테이블 -->
      <div class="sales_detail">
        <div class="table_wrapper">
          <div ref="nonScrollableWrapperRef" class="non_scrollable_wrapper">
            <table ref="tableHeaderRef" class="sales_table header_table">
              <thead>
                <tr>
                  <th></th>
                  <th>메뉴명</th>
                  <th>수량</th>
                </tr>
              </thead>
            </table>
          </div>

          <div ref="scrollableWrapperRef" class="scrollable_wrapper">
            <table ref="tableBodyRef" class="sales_table body_table">
              <tbody>
                <!-- 날짜 또는 월 기준 목록 -->
                <template v-for="(key, idx) in showByMonth ? uniqueMonths : uniqueDates" :key="idx">
                  <tr @click="toggleDetail(key)" :class="{ selected: selectedDates === key }" style="cursor: pointer">
                    <td colspan="3">
                      <strong>{{ showByMonth ? key.replace("-", ".") : key.slice(5).replace("-", ".") }}</strong>
                      &nbsp;
                      <img :src="sortIcon(key)" alt="정렬 아이콘" class="search_icon" />
                    </td>
                  </tr>

                  <!-- 상세 내역: 각 key에 대해 필터링 -->
                  <tr
                    v-if="detailStatus[key]"
                    v-for="(item, idx2) in periodSales.filter((i) => (showByMonth ? i.date.startsWith(key) : i.date === key))"
                    :key="`detail-${idx}-${idx2}`"
                  >
                    <td>{{ showByMonth ? item.date : item.time }}</td>
                    <td>{{ item.menuName }}</td>
                    <td>1</td>
                  </tr>
                </template>

                <!-- 데이터 없음 안내 -->
                <tr v-if="uniqueDates.length === 0">
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
  width: 100%;
  height: 100%;
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
