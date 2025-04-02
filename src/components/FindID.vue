<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const showNumberField = ref(false);
const isVerified = ref(true);
</script>

<template>
  <v-container class="find-password-container">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h1 class="text-center mb-5">내 아이디 찾기</h1>

        <v-text-field label="가입한 전화번호" variant="solo" class="email-input" rounded
          placeholder="ex) 010-1234-5678"></v-text-field>

        <v-row v-if="showNumberField" >
          <v-col cols="8">
            <v-text-field label="인증번호 입력" variant="solo" class="additional-input" rounded
              placeholder="인증번호를 입력해주세요"></v-text-field>
          </v-col>
          <v-col cols="4" class="text-center">
            <v-btn color="primary" @click="isVerified = true">확인</v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              class="find-password-button mt-5"
              color="primary"
              :disabled="!isVerified"
            >
              {{ showNumberField ? '확인' : '인증번호 보내기' }}
            </v-btn>
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