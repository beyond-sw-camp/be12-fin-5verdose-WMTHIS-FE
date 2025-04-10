<script setup>
import { ref } from 'vue';

const currentCarousel = ref(0);
const series = ref([
    {
        name: '홀',
        data: [
            5000, 3000, 2000, 1500, 2000, 1000, 1500, 2000, 2500, 4000, 6000,
            7000, 8000, 6000, 5000, 4000, 3000, 2000, 1500, 2500, 5000, 8000,
            10000, 6000,
        ],
    },
    {
        name: '배달',
        data: [
            7000, 2000, 1000, 500, 3000, 0, 500, 0, 500, 1000, 2000,
            3000, 7000, 6000, 5000, 4000, 2000, 1000, 500, 2500, 5000,
            12000, 20000, 9000,
        ],
    },
]);

const chartOptions = ref({
    chart: {
        id: 'sales-chart',
        type: 'bar',
        toolbar: { show: false },
    },
    xaxis: {
        categories: [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
            '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
        ],
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: '60%', // 막대 간격 조절
        },
    },
    colors: ['#191970', '#7DC8B1'], // 각각 배달, 홀 색상
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: 'top',
    },
});


const summaries = [
    {
        line1: "이번 주는 재고 단가가 올라 ",
        highlight1: "순수익",
        line2: "이",
        line3: "동일 매출에 비해 ",
        highlight2: "381,200원 ",
        line4: "떨어졌어요!",
    },
    {
        line1: "오늘은 평소보다 ",
        highlight1: "홀 주문",
        line2: "이 많았고,",
        line3: "총 매출은 ",
        highlight2: "1,210,000원 ",
        line4: "기록했어요!",
    },
    {
        line1: "오늘은 평소보다 ",
        highlight1: "배달 주문",
        line2: "이 많았고,",
        line3: "총 매출은 ",
        highlight2: "3,250,000원 ",
        line4: "기록했어요!",
    },
];
</script>


<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-card>
                <v-card-title>매출 현황</v-card-title>
                <v-card-text>
                    <div class="amount">232,100원</div>
                    <div class="comment_main">
                        <p>저번주 오늘보다</p>
                        <p class="amount_highlight"> -161,400원</p>
                    </div>
                    <div class="comment_sub">
                        <div class="comment_sub1">
                            <p class="hall_box">■ </p>
                            <div class="flex-between">
                                <p>홀</p>
                                <p>106,100원</p>
                            </div>
                        </div>
                        <div class="comment_sub1">
                            <p class="delivery_box">■ </p>
                            <div class="flex-between">
                                <p>배달</p>
                                <p>106,100원</p>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="8">
            <v-card>
                <apexchart type="bar" :options="chartOptions" :series="series" height="200"></apexchart>
            </v-card>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" md="9">
            <v-carousel class="carousel-root" show-arrows="hover" cycle hide-delimiter-background
                v-model="currentCarousel">
                <v-carousel-item v-for="(text, i) in summaries" :key="i">
                    <v-sheet class="carousel-sheet">
                        <div class="carousel-content">
                            <p class="carousel-line carousel-line-bold">
                                {{ text.line1 }}
                                <span class="highlight-text">{{ text.highlight1 }}</span>
                                {{ text.line2 }}
                            </p>
                            <p class="carousel-line">
                                {{ text.line3 }}
                                <span class="highlight-text font-bold">{{ text.highlight2 }}</span>
                                <span class="highlight-text font-bold">{{ text.line4 }}</span>
                            </p>
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-col>

        <v-col cols="12" md="3">
            <div class="best_menu_title">이번 주 메뉴 TOP 3</div>
            <div class="best_menu_item">
                <img src="@/assets/image/1st.png" alt="만료임박 아이콘" class="best_menu_icon" />
                <div class="best_menu_list">토마토 파스타</div>
            </div>
            <div class="best_menu_item">
                <div class="best_menu_rank">2</div>
                <div class="best_menu_list">불고기 필라프</div>
            </div>
            <div class="best_menu_item">
                <div class="best_menu_rank">3</div>
                <div class="best_menu_list">로제 파스타</div>
            </div>
        </v-col>
    </v-row>


    <div class="status-wrapper">
        <div class="status-item">
            <span class="status-label">만료임박</span>
            <div class="icon_place">
                <img src="@/assets/image/calendar.png" alt="만료임박 아이콘" class="status-icon" />
                <span class="status-number text-red">4</span>
            </div>
        </div>

        <div class="status-item">
            <span class="status-label">발주 필요</span>
            <div class="icon_place">
                <img src="@/assets/image/stock.png" alt="발주 필요 아이콘" class="status-icon" />
                <span class="status-number text-yellow">5</span>
            </div>
        </div>

        <div class="status-item">
            <span class="status-label">금일 입고</span>
            <div class="icon_place">
                <img src="@/assets/image/completed.png" alt="금일 입고 아이콘" class="status-icon" />
                <span class="status-number text-gray">8</span>
            </div>
        </div>
    </div>

</template>

<style scoped>
.v-card {
    height: 100%;
}

.v-card-title {
    font-size: 20px;
    font-weight: bold;
}

.amount {
    font-size: 36px;
    font-weight: bold;
    margin: 10px 0 10px 0;
}

.comment_main {
    display: flex;
    gap: 5px;
}

.amount_highlight {
    color: blue;
    font-weight: bold;
}

.comment_sub {
    flex-direction: column;
    margin-top: 16px;
}

.comment_sub1 {
    display: flex;
    gap: 5px;
    margin-top: 8px;
}

.hall_box {
    color: #191970;
}

.delivery_box {
    color: #7DC8B1;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.carousel-root {
    height: 100% !important;
    width: 100%;
}

.carousel-sheet {
    background-color: #f5f5f5;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    height: 100%;
}

.carousel-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.carousel-line {
    font-size: 20px;
    margin: 4px 0;
    color: #424242;
}

.carousel-line-bold {
    font-weight: 600;
}

.highlight-text {
    color: #e53935;
}

.font-bold {
    font-weight: bold;
}

.carousel_title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.status-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
}

.status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    gap: 10px;
}

.status-label {
    font-size: 14px;
    color: #888;
    margin-bottom: 4px;
}

.status-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 4px;
}

.status-number {
    font-size: 30px;
    font-weight: bold;
}

.text-red {
    color: #e53935;
}

.text-yellow {
    color: #fbc02d;
}

.text-gray {
    color: #757575;
}

.icon_place {
    display: flex;
    gap: 10px;
    align-items: center;
}

.best_menu_title {
    font-size: 20px;
    font-weight: bold;
    margin: 15px 0 15px 0;
    text-align: center;
    color: black;
}

.best_menu_item {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
}

.best_menu_icon {
    width: 40px;
    height: 40px;
    object-fit: cover;
}

.best_menu_rank {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: #424242;
}

.best_menu_list {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    flex: 1;
    text-align: left;
}

::v-deep(.v-carousel__controls .mdi-circle) {
    color: gray !important;
    /* 기본 회색 */
    opacity: 1 !important;
}

::v-deep(.v-carousel__controls .v-btn--active .mdi-circle) {
    color: black !important;
    /* 현재 선택된 인덱스일 때 진하게 */
}
</style>