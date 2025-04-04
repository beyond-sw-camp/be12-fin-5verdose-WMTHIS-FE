<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SalesStatus from './SalesStatus.vue';
import BestMenuChart from './BestMenuChart.vue';
</script>

<template>
    <div class="dashboard_container">
        <div class="status_container">
            <SalesStatus />
        </div>
        <div class="chart_container">
            <BestMenuChart :chartHeight="200" />
        </div>
        <div class="info_container">
            <v-row>
                <v-col cols="12" sm="4">
                    <v-card class="d-flex flex-column">
                        <span>소비기한</span>
                        <div class="d-flex align-center justify-space-between" style="width: 100%;">
                            <img src="../assets/image/calender.png" width="30" height="30">
                            <span>4</span>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card class="d-flex align-center justify-space-around">
                        <span>발주 필요 재고</span>
                        <span>5</span>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card class="d-flex align-center justify-space-around">
                        <span>당일 입고 재고</span>
                        <span>10</span>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style scoped>
.dashboard_container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.status_container {
    width: 70vw;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart_container {
    width: 1000px;
}

.info_container {
    width: 70vw;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>