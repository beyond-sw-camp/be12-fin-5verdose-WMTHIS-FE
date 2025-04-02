<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

</script>

<template>
  <v-container class="register-container">
    <v-row justify="center">
      <v-col cols="12" md="6" class="text-center">
        <h1 class="mb-5">설정을 시작할게요!</h1>

        <v-col cols="auto">
          <v-btn class="next-button" color="primary" rounded>다음</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.register-container {
  margin-top: 150px;
}
.next-button {
  margin-top: 150px;
  width: 15rem;
}

</style>