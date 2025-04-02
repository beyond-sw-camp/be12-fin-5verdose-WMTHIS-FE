<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <v-container class="find-password-container">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-center mb-5">비밀번호 찾기</h1>

        <v-text-field label="가입된 이메일" variant="solo" class="email-input" rounded
          placeholder="ex) wmthis@example.com"></v-text-field>

        <v-row justify="center">
          <v-col cols="auto">
            <v-btn class="find-password-button mt-5" color="primary">비밀번호 찾기</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-center {
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: bold;
}

.find-password-container {
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;
}

.email-input {
  margin-bottom: 30px;
  font-size: 16px;
}

.additional-input {
  margin-bottom: 30px;
  font-size: 16px;
}

.find-password-button {
  font-weight: bold;
  color: black;
  border-radius: 20px;
  width: 200px;
  height: 50px;
  font-size: 16px;
}
</style>