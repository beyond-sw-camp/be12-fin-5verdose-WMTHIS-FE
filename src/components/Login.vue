    <template>
        <div class="login-container">
        <div class="container">
            <img src="../assets/icon.png" alt="Vue logo" width="500" height="200" class="image" />
        </div>
        <v-text-field label="아이디" variant="solo" class="id-textfield"></v-text-field>
        <v-text-field label="비밀번호" variant="solo" class="password-textfield"></v-text-field>
        <a href="https://www.naver.com" class="signup">회원이 아니신가요?</a>
        <v-btn size="x-large" class="login-button">로그인 하기</v-btn>
        <div class="find-container">
            <a href="https://www.naver.com" class="findId">아이디 찾기</a>
            <a href="https://www.naver.com" class="findPassword">비밀번호 찾기</a>
        </div>
        </div>
    </template>
    
    <script>
    </script>
    
    <style>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* 필요에 따라 제거 가능 */
    }
    .id-textfield, .password-textfield {
        margin-bottom: 20px; /* 텍스트 필드 간격 조정 */
        width: 400px; /* 원하는 너비 설정 */
    }
    .container {
        margin-top: 100px;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .signup {
        margin-bottom: 20px; /* 버튼과 텍스트 간격 조정 */
    } 
    .find-container {
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .findPassword {
        margin-left: 20px; /* 아이디 찾기와 비밀번호 찾기 간격 조정 */
    }
    .login-button {
  font-weight: bold !important; 
  background-color: #666666 !important; /* 배경색 설정 */
  color: white !important; /* 글자색 설정 */
  border-radius: 15px !important; /* 모서리 둥글게 설정 */
}
    .image {
        max-width: 100%;
    }
    </style>