changeReason
<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import upIcon from "@/assets/image/up.png";
import downIcon from "@/assets/image/down.png";
import Calendar from "@/components/Calendar.vue";
import StockDiagram from "@/components/sales_management/StockDiagram.vue";
import { api } from "@/api/index.js";

const keyword = ref("");
const startDate = ref("");
const endDate = ref("");

watch([startDate, endDate], ([newStart, newEnd]) => {
  if (newStart && newEnd) {
    const start = new Date(newStart);
    const end = new Date(newEnd);

    if (start > end) {
      console.warn("⚠️ 시작일이 종료일보다 늦습니다. API 호출하지 않음");
      return;
    }

    fetchAndSetSalesData();
    fetchAndSetMarketData();
  }
});

const salesMenu = ref([]);
async function fetchAndSetSalesData() {
  try {
    const payload = {
      startDate: startDate.value,
      endDate: endDate.value,
    };
    console.log(payload);
    const data = await api.SearchInventorySale(payload);
    console.log("📦 받은 데이터:", data);

    if (data !== 404) {
      salesMenu.value = data.map((item) => {
        const fullDate = new Date(item.date);
        const date = fullDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const time = fullDate.toTimeString().slice(0, 8); // "HH:mm:ss"

        return {
          date,
          time,
          stockName: item.stockName,
          changeReason: item.changeReason,
          quantity: item.quantity,
          unit: item.unit,
        };
      });
    } else {
      console.error("❌ 판매 데이터를 불러오지 못했습니다.");
    }
  } catch (error) {
    console.error("🔥 에러 발생:", error);
  }
}

const salesMarket = ref([]);
async function fetchAndSetMarketData() {
  try {
    const payload = {
      startDate: startDate.value,
      endDate: endDate.value,
    };
    console.log(payload);
    const data = await api.SearchInventoryMarket(payload);
    console.log("📦 받은 데이터:", data);

    if (data !== 404) {
      salesMarket.value = data.map((item) => {
        const fullDate = new Date(item.date);
        const date = fullDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const time = fullDate.toTimeString().slice(0, 8); // "HH:mm:ss"

        return {
          date,
          time,
          stockName: item.stockName,
          changeReason: item.changeReason,
          quantity: item.quantity,
          unit: item.unit,
        };
      });
    } else {
      console.error("❌ 판매 데이터를 불러오지 못했습니다.");
    }
  } catch (error) {
    console.error("🔥 에러 발생:", error);
  }
}

const changeStock = [
  { date: "2025-04-06", time: "09:12:34", stockName: "우유", changeReason: "", quantity: 0.75, unit: "L" },
  { date: "2025-04-07", time: "11:43:21", stockName: "김치", changeReason: "", quantity: -1.2, unit: "kg" },
  { date: "2025-04-05", time: "13:05:56", stockName: "양파", changeReason: "", quantity: 2.5, unit: "kg" },
  { date: "2025-04-06", time: "08:22:19", stockName: "마늘", changeReason: "", quantity: -0.15, unit: "kg" },
  { date: "2025-04-07", time: "14:14:14", stockName: "간장", changeReason: "", quantity: 0.4, unit: "L" },
  { date: "2025-04-05", time: "12:00:01", stockName: "고등어", changeReason: "", quantity: -1.0, unit: "kg" },
  { date: "2025-04-07", time: "15:10:45", stockName: "양파", changeReason: "", quantity: -0.8, unit: "kg" },
  { date: "2025-04-06", time: "16:55:55", stockName: "우유", changeReason: "", quantity: 1.2, unit: "L" },
  { date: "2025-04-05", time: "17:17:17", stockName: "김치", changeReason: "", quantity: -0.6, unit: "kg" },
  { date: "2025-04-07", time: "18:18:18", stockName: "마늘", changeReason: "", quantity: 0.2, unit: "kg" },
  { date: "2025-04-06", time: "07:07:07", stockName: "간장", changeReason: "", quantity: -0.3, unit: "L" },
  { date: "2025-04-05", time: "19:30:30", stockName: "고등어", changeReason: "", quantity: 0.5, unit: "kg" },
  { date: "2025-04-07", time: "20:20:20", stockName: "양파", changeReason: "", quantity: 1.7, unit: "kg" },
  { date: "2025-04-06", time: "21:21:21", stockName: "우유", changeReason: "", quantity: -0.4, unit: "L" },
  { date: "2025-04-05", time: "22:22:22", stockName: "김치", changeReason: "", quantity: 2.0, unit: "kg" },
  { date: "2025-04-06", time: "23:23:23", stockName: "마늘", changeReason: "", quantity: -0.25, unit: "kg" },
  { date: "2025-04-07", time: "06:06:06", stockName: "간장", changeReason: "", quantity: 0.7, unit: "L" },
  { date: "2025-04-05", time: "05:05:05", stockName: "고등어", changeReason: "", quantity: -0.9, unit: "kg" },
  { date: "2025-04-07", time: "04:04:04", stockName: "우유", changeReason: "", quantity: 1.0, unit: "L" },
  { date: "2025-04-06", time: "03:03:03", stockName: "양파", changeReason: "", quantity: -0.65, unit: "kg" },
  { date: "2025-04-05", time: "02:02:02", stockName: "김치", changeReason: "", quantity: 1.1, unit: "kg" },
  { date: "2025-04-06", time: "01:01:01", stockName: "마늘", changeReason: "", quantity: -0.1, unit: "kg" },
  { date: "2025-04-07", time: "00:00:00", stockName: "간장", changeReason: "", quantity: 0.5, unit: "L" },
  { date: "2025-04-05", time: "10:10:10", stockName: "고등어", changeReason: "", quantity: 0.3, unit: "kg" },
  { date: "2025-04-06", time: "11:11:11", stockName: "우유", changeReason: "", quantity: -0.6, unit: "L" },
  { date: "2025-04-07", time: "09:09:09", stockName: "양파", changeReason: "", quantity: 1.0, unit: "kg" },
  { date: "2025-04-05", time: "08:08:08", stockName: "김치", changeReason: "", quantity: -0.4, unit: "kg" },
  { date: "2025-04-06", time: "13:13:13", stockName: "마늘", changeReason: "", quantity: 0.1, unit: "kg" },
  { date: "2025-04-07", time: "12:12:12", stockName: "간장", changeReason: "", quantity: -0.2, unit: "L" },
  { date: "2025-04-05", time: "14:14:14", stockName: "고등어", changeReason: "", quantity: 1.5, unit: "kg" },
];
// 재고 수동 수정

//const total = [...salesMenu, ...changeStock, ...salesMarket];
const total = computed(() => [...salesMenu.value, ...salesMarket.value]);

const flatList = ref([]);
async function fetchAndSetFlatList() {
  const data = await api.SearchStockList();

  if (data !== 404) {
    flatList.value = data.map((item) => ({
      stockName: item.name,
      quantity: item.quantity,
      unit: item.unit,
    }));
  } else {
    console.error("❌ 메뉴 데이터를 불러오지 못했습니다.");
  }
}

onMounted(() => {
  fetchAndSetFlatList(); // ✅ 마운트 시 실행
});

const selectedIndex = ref(0);
const selectedStockName = computed(() => filteredList.value[selectedIndex.value]?.stockName || "");
const selectItem = (index) => {
  selectedIndex.value = index;
};

const selectedTab = ref("total");
const currentDataSource = computed(() => {
  if (selectedTab.value === "menu") return salesMenu.value;
  if (selectedTab.value === "change") return changeStock;
  if (selectedTab.value === "market") return salesMarket.value;
  if (selectedTab.value === "total") return total.value;
  return [];
});

function changeTab(tabName) {
  selectedTab.value = tabName;
}

const filteredList = computed(() => {
  const query = keyword.value.trim();
  if (!query) return flatList.value;

  return flatList.filter((item) => item.stockName.includes(query));
});

// 달력 관련 데이터
const showByMonth = computed(() => {
  if (!startDate.value || !endDate.value) return false;

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  const timeDiff = end.getTime() - start.getTime();
  const dayCount = timeDiff / (1000 * 60 * 60 * 24) + 1; // +1 해서 당일 포함

  return dayCount > 30;
});

// 선택된 날짜의 판매 데이터
const peroidData = computed(() => {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const selectedName = selectedStockName.value;
  // 날짜 범위 필터링
  const filteredSales = currentDataSource.value.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= start && itemDate <= end;
  });

  // 선택된 stockName 기준 필터링
  const filteredByStock = filteredSales.filter((item) => item.stockName === selectedName);

  // 정렬
  filteredByStock.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  return filteredByStock;
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
  const dates = peroidData.value.map((item) => item.date);
  return [...new Set(dates)].sort((a, b) => a.localeCompare(b));
});

const uniqueMonths = computed(() => {
  const months = peroidData.value.map((item) => item.date.slice(0, 7)); // 'YYYY-MM'
  return [...new Set(months)].sort((a, b) => a.localeCompare(b));
});

//차트 데이터 - 메뉴
function getDateRange(start, end, byMonth = false) {
  const result = [];
  const current = new Date(start);

  while (current <= end) {
    let formatted;

    if (byMonth) {
      // YYYY.MM
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      formatted = `${year}.${month}`;
    } else {
      // MM.DD
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const day = String(current.getDate()).padStart(2, "0");
      formatted = `${month}.${day}`;
    }

    if (!result.includes(formatted)) {
      result.push(formatted);
    }

    if (byMonth) {
      current.setMonth(current.getMonth() + 1);
    } else {
      current.setDate(current.getDate() + 1);
    }
  }

  return result;
}
//차트 데이터 - 메뉴
const chartSeries = computed(() => {
  if (!startDate.value || !endDate.value) return [];

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const labels = getDateRange(start, end, showByMonth.value); // 포맷된 라벨

  const counts = {};

  peroidData.value.forEach((item) => {
    const itemDate = new Date(item.date);
    let key;

    if (showByMonth.value) {
      // YYYY.MM
      key = `${itemDate.getFullYear()}.${String(itemDate.getMonth() + 1).padStart(2, "0")}`;
    } else {
      // MM.DD
      key = `${String(itemDate.getMonth() + 1).padStart(2, "0")}.${String(itemDate.getDate()).padStart(2, "0")}`;
    }

    counts[key] = parseFloat(((counts[key] || 0) + item.quantity).toFixed(2));
  });
  console.log(counts);

  return [
    {
      name: "판매 량",
      data: labels.map((label) => counts[label] || 0), // 라벨 기준으로 맞춤
    },
  ];
});

const chartOptions = computed(() => {
  if (!startDate.value || !endDate.value) return {};

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const labels = getDateRange(start, end, showByMonth.value);

  return {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: showByMonth.value ? "월별 판매 건수" : "일별 판매 건수",
      align: "center",
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: "판매 량",
      },
    },
  };
});
</script>

<template>
  <div class="menu_analysis">
    <div class="menu_list">
      <div class="header">
        <h1>재고 소요량 분석</h1>
        <div class="search_container">
          <input v-model="keyword" type="text" placeholder="재고 검색" class="search_input" />
          <img src="@/assets/image/search_button.png" alt="검색" class="search_icon" />
        </div>
      </div>
      <table class="menu_table">
        <thead>
          <tr>
            <th>재고 명</th>
            <th>용량</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in filteredList" :key="idx" @click="selectItem(idx)" :class="{ selected: selectedIndex === idx }">
            <td>{{ item.stockName }}</td>
            <td>{{ item.quantity }}{{ item.unit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chart_container">
      <div class="chart_header">
        <div class="date_selector">
          <div class="stock_list">
            <span @click="changeTab('total')" :class="{ active: selectedTab === 'total' }">전체</span>

            <span @click="changeTab('menu')" :class="{ active: selectedTab === 'menu' }">판매</span>

            <span @click="changeTab('change')" :class="{ active: selectedTab === 'change' }">수정</span>

            <span @click="changeTab('market')" :class="{ active: selectedTab === 'market' }">장터</span>
          </div>
          <Calendar v-model:startDate="startDate" v-model:endDate="endDate" />
        </div>
      </div>
      <div class="chart">
        <StockDiagram :startDate="startDate" :endDate="endDate" :showByMonth="showByMonth" :peroidData="peroidData" />
      </div>

      <!-- 선택된 날짜의 판매 데이터 테이블 -->
      <div class="sales_detail">
        <div class="table_wrapper">
          <div ref="nonScrollableWrapperRef" class="non_scrollable_wrapper">
            <table ref="tableHeaderRef" class="sales_table header_table">
              <thead>
                <tr>
                  <th>{{ selectedStockName }}</th>
                  <th>재고</th>
                  <th>용량</th>
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
                    v-for="(item, idx2) in peroidData.filter((i) => (showByMonth ? i.date.startsWith(key) : i.date === key))"
                    :key="`detail-${idx}-${idx2}`"
                  >
                    <td>{{ showByMonth ? item.date : item.time }}</td>
                    <td>{{ item.changeReason }}</td>
                    <td>{{ item.quantity }}{{ item.unit }}</td>
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

.menu_table tr.selected {
  background-color: #f9f9f9;
}

.menu_table tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
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
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;
  width: 100%;
}

.stock_list span {
  padding: 5px 15px 5px 15px;
}

.stock_list span:hover {
  cursor: pointer;
  background-color: #f9f9f9;
}

.stock_list span.active {
  background-color: #b8c0c8; /* 진한 인디고 */
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
