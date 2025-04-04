<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

</script>

<template>
    <v-container class="register-container">
        <v-row justify="center">
            <v-col cols="12" md="6" class="text-center">
                <div class="container">
                    <img src="../assets/icon.png" alt="Vue logo" width="500" height="200" class="image" />
                </div>

                <v-row justify="center" class="button-row">
                    <v-col cols="auto" class="button-container">
                        <v-btn class="next-button" color="primary" rounded>영업시작</v-btn>
                        <v-btn class="next-button" color="primary" rounded>영업종료</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.text-center {
    text-align: center;
}

.register-container {
    margin-top: 100px;
}

.next-button {
    width: 10rem;
}

.button-row {
    margin-top: 100px;
}

.button-container {
    display: flex;
    gap: 100px;
    /* 버튼 간격 조절 */
}
</style>