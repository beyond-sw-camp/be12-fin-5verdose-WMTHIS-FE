<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  startDate: String,
  endDate: String,
  showByMonth: Boolean,
  peroidData: Array,
});

watch(
  () => [props.startDate, props.endDate, props.peroidData],
  ([newStart, newEnd]) => {
    console.log("📅 날짜 변경됨:", newStart, newEnd);
  },
  { immediate: true }
);

function getDateRange(start, end, byMonth = false) {
  const result = [];
  const current = new Date(start);

  while (current <= end) {
    let formatted;
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");

    formatted = byMonth ? `${year}.${month}` : `${month}.${day}`;
    if (!result.includes(formatted)) result.push(formatted);

    byMonth ? current.setMonth(current.getMonth() + 1) : current.setDate(current.getDate() + 1);
  }

  return result;
}

const chartSeries = computed(() => {
  if (!props.startDate || !props.endDate) return [];

  const start = new Date(props.startDate);
  const end = new Date(props.endDate);
  const labels = getDateRange(start, end, props.showByMonth);

  const counts = {};
  props.peroidData.forEach((item) => {
    const itemDate = new Date(item.date);
    let key = props.showByMonth
      ? `${itemDate.getFullYear()}.${String(itemDate.getMonth() + 1).padStart(2, "0")}`
      : `${String(itemDate.getMonth() + 1).padStart(2, "0")}.${String(itemDate.getDate()).padStart(2, "0")}`;

    counts[key] = parseFloat(((counts[key] || 0) + item.quantity).toFixed(2));
  });

  console.log("📊 차트 데이터:", counts);

  return [
    {
      name: "판매 량",
      data: labels.map((label) => counts[label] || 0),
    },
  ];
});

const chartOptions = computed(() => {
  if (!props.startDate || !props.endDate) return {};

  const start = new Date(props.startDate);
  const end = new Date(props.endDate);
  const labels = getDateRange(start, end, props.showByMonth);

  return {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: props.showByMonth ? "월별 판매량" : "일별 판매량",
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
  <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
</template>

<style scoped></style>
