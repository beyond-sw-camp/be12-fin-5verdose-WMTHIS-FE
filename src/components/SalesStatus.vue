<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-card>
                            <v-card-title>매출 현황</v-card-title>
                            <v-card-text>
                                <div style="font-size: 2rem;">232,100원</div>
                                <p>저번주 오늘보다 - 161,400원</p>
                                <div style="margin-top: 2rem;">
                                    <span style="color:aqua;">■</span> 순이익은 135,300원이에요
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="8">
                        <v-card>
                            <apexchart type="line" :options="chartOptions" :series="series" height="200"></apexchart>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';

const series = ref([
    {
        name: '매출',
        data: [
            12000, 5000, 3000, 2000, 5000, 1000, 2000, 1000, 2000, 3000, 8000,
            10000, 15000, 12000, 10000, 8000, 5000, 3000, 2000, 5000, 10000,
            20000, 30000, 15000,
        ],
    },
]);

const chartOptions = ref({
    chart: {
        id: 'sales-chart',
        type: 'line',
    },
    xaxis: {
        categories: [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
            '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',
        ],
    },
    colors: ['#A7C779'],
    stroke: {
        curve: 'smooth',
    },
    markers: {
        size: 5,
    },
    toolbar: { // 툴바 설정
        show: false, // 툴바 숨김
    },
});

</script>

<style scoped>
.v-card {
    height: 100%;
}
</style>