<template>
    <!-- 차트 컨테이너에 명시적인 높이와 너비 지정 -->
    <div style="pointer-events: none; height: 100%; width: 100%;">
        <apexchart type="bar" :options="chartOptions" :series="series" :height="chartHeight" width="100%"></apexchart>
    </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';

const series = ref([
    {
        data: [14, 11, 9],
    },
]);

const props = defineProps({
    chartHeight: {
        type: Number,
        default: 350,
    },
});

const chartOptions = computed(() => ({
    chart: {
        type: 'bar',
        // height 속성을 여기서 제거하고 컴포넌트 속성으로 직접 전달

        toolbar: {
            show: false, // 오른쪽 위 햄버거 버튼 제거
        },
        // (추가적인 이벤트 비활성화를 위해 빈 이벤트 핸들러를 등록할 수 있음)
        events: {
            click: () => { },
            mouseMove: () => { },
            // 기타 이벤트도 빈 함수로 처리 가능
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: true, // 각 막대별 색상 적용
            barHeight: '70%', // 막대 높이 비율 조정
        },
    },
    dataLabels: {
        enabled: true,
        textAnchor: 'start',
        offsetX: 0,
        style: {
            colors: ['#000'],
        },
        formatter: function (val, opt) {
            return val;
        },
    },
    tooltip: {
        enabled: false, // 툴팁 비활성화
    },
    // x축: 값 관련 옵션 모두 숨김
    xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
    },
    // y축: 카테고리(막대 왼쪽에 표시)만 노출
    yaxis: {
        labels: { show: true },
        axisBorder: { show: false },
        axisTicks: { show: false },
    },
    colors: ['#FFB347', '#FF6347', '#9370DB'],
    legend: {
        show: false, // 범례 숨김
    },
    grid: {
        show: false, // 그리드 숨김 (선택 사항)
    },
    // 반응형 설정 추가
    responsive: [
        {
            breakpoint: 1000,
            options: {
                chart: {
                    height: props.chartHeight
                }
            }
        }
    ]
}));
</script>

<style scoped>
/* 부모 컨테이너가 명시적인 높이를 가지고 있는지 확인하세요 */
:deep(.apexcharts-canvas) {
    height: 100% !important;
}
</style>