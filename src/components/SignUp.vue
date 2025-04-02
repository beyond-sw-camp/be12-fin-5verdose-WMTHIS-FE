<template>
    <v-container class="signup-container">
        <v-row justify="center">
            <v-col cols="12" md="6">
                <h1 class="text-center mb-5">회원 가입</h1>

                <v-text-field label="이름" variant="solo"  class="signup-input" rounded></v-text-field>
                <v-text-field label="이메일" variant="solo" class="signup-input" rounded></v-text-field>
                <v-text-field label="비밀번호" variant="solo" class="signup-input" rounded></v-text-field>
                <v-text-field label="사업자 번호" variant="solo" class="signup-input" rounded></v-text-field>
                <v-text-field label="핸드폰 번호" variant="solo" class="signup-input" rounded></v-text-field>
                <v-text-field label="주민 번호" variant="solo" class="signup-input" rounded></v-text-field>

                <v-row justify="center">
                    <v-col cols="auto">
                        <v-btn class="signup-button mt-5">회원가입 하기</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'SignupForm',
};
</script>

<style scoped>
.text-center {
    margin-bottom: 50px !important;
}
.signup-container {
    margin-top: 50px;
}

.signup-input {
    margin-bottom: 15px;
    
}

.signup-button {
    font-weight: bold !important;
    background-color: #666666 !important;
    color: white !important;
    border-radius: 15px !important;
    width: 200px;
    height: 50px !important;
    font-size: 16px !important;
    /* 글자 크기 조정 */
}
</style>