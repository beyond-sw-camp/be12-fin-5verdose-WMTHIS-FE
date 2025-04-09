<template>
    <v-app>
        <v-container fluid class="pa-0  fill-height">
            <v-row no-gutters class="fill-height">
                <v-col cols="12" md="8" class="d-none d-md-flex">
                    <AccountImagePanel :imageUrl="imageUrl" />
                </v-col>
                <v-col cols="12" md="4" class="d-flex flex-column align-center justify-center pa-6">
                    <RouterView />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginImage from '@/assets/image/background.png';
import Icon from '@/assets/image/icon.png';
import AccountImagePanel from './AccountImagePanel.vue';

const router = useRouter();
const imageUrl = ref(LoginImage);

</script>

<style scoped></style>