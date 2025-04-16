<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/assets/image/icon.png'; // 로고 이미지 import

// 변수 선언
const router = useRouter();
const logoImage = ref(Logo); // 로고 이미지 참조 추가
const storeName = ref('');
const storeAddress = ref('');
const detailAddress = ref('');
const storePhone = ref('');
const errorMessage = ref('');

// 휴대폰 번호 포맷팅 (02-XXXX-XXXX 또는 010-XXXX-XXXX)
const formatPhoneNumber = (value) => {
    if (!value) return '';
    value = value.replace(/[^0-9]/g, '');

    if (value.length <= 2) {
        return value;
    } else if (value.length <= 3) {
        // 휴대폰 번호인 경우 (010, 011 등)
        return value;
    } else if (value.length <= 6) {
        // 지역번호가 2자리인 경우 (02-XXX)
        if (value.startsWith('02')) {
            return value.slice(0, 2) + '-' + value.slice(2);
        }
        // 휴대폰 번호 또는 3자리 지역번호
        else {
            return value.slice(0, 3) + '-' + value.slice(3);
        }
    } else {
        // 지역번호가 2자리인 경우 (02-XXXX-XXXX)
        if (value.startsWith('02')) {
            return value.slice(0, 2) + '-' + value.slice(2, 6) + '-' + value.slice(6, 10);
        }
        // 휴대폰 번호 또는 3자리 지역번호
        else {
            return value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
        }
    }
};

// 휴대폰 번호 입력 처리
const handlePhoneInput = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    storePhone.value = formattedValue;
};

// 주소 검색
const searchAddress = () => {
    new window.daum.Postcode({
        oncomplete: function (data) {
            // 주소 선택 후 callback으로 주소 값을 storeAddress에 할당
            storeAddress.value = data.address; // 기본 주소
        },
        width: '100%',
        height: '100%',
    }).open();
};

// 다음 단계로 이동
const submit = () => {
    // 유효성 검사
    if (!storeName.value) {
        errorMessage.value = '매장명을 입력해주세요.';
        return;
    }

    if (!storeAddress.value) {
        errorMessage.value = '매장 주소를 입력해주세요.';
        return;
    }

    if (!storePhone.value) {
        errorMessage.value = '매장 전화번호를 입력해주세요.';
        return;
    }

    // 실제 구현에서는 가게 등록 API 호출
    console.log('Store registration submitted', {
        storeName: storeName.value,
        storeAddress: storeAddress.value,
        detailAddress: detailAddress.value,
        storePhone: storePhone.value
    });

    router.push({ name: 'storedone' });
};
</script>

<template>
    <div class="store-card">
        <!-- 로고 -->
        <div class="logo-container">
            <img :src="logoImage" alt="로고" class="logo" />
        </div>

        <h1 class="store-title">가게 등록</h1>

        <!-- 에러 메시지 -->
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <!-- 가게 등록 폼 -->
        <form @submit.prevent="submit" class="store-form">
            <div class="form-group">
                <label for="store-name">매장명</label>
                <input type="text" id="store-name" v-model="storeName" class="form-input" placeholder="매장명을 입력하세요" />
            </div>

            <div class="form-group">
                <label for="store-address">매장 주소</label>
                <input type="text" id="store-address" v-model="storeAddress" class="form-input"
                    placeholder="매장 주소를 입력하세요" readonly />
            </div>

            <div class="form-group address-group">
                <label for="detail-address">상세 주소</label>
                <div class="address-container">
                    <input type="text" id="detail-address" v-model="detailAddress" class="form-input address-input"
                        placeholder="상세 주소를 입력하세요" />
                    <button type="button" class="search-btn" @click="searchAddress">
                        검색
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label for="store-phone">매장 전화번호</label>
                <input type="tel" id="store-phone" v-model="storePhone" @input="handlePhoneInput" class="form-input"
                    placeholder="매장 전화번호를 입력하세요" maxlength="13" />
            </div>

            <button type="submit" class="next-button">
                다음
            </button>
        </form>
    </div>
</template>

<style scoped>
.store-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
}

.store-card {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 400px;
    padding: 40px 30px;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.logo {
    max-width: 250px;
    height: auto;
}

.store-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.error-message {
    background-color: #fff0f0;
    color: #e74c3c;
    padding: 12px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    text-align: center;
}

.store-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    margin-bottom: 5px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
    color: #333;
}

.form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
    background-color: white;
}

.form-input:focus {
    border-color: #708090;
    outline: none;
}

.form-input[readonly] {
    background-color: #f9f9f9;
    cursor: default;
}

.address-group {
    position: relative;
}

.address-container {
    display: flex;
    gap: 10px;
}

.address-input {
    flex: 1;
}

.search-btn {
    padding: 0 15px;
    height: 46px;
    background-color: #B8C0C8;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;
    min-width: 80px;
    color: #333;
}

.search-btn:hover {
    background-color: #98A8B8;
}

.next-button {
    width: 100%;
    padding: 14px;
    background-color: #B8C0C8;
    color: #333;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
    height: 56px;
}

.next-button:hover {
    background-color: #98A8B8;
}

/* 모바일 화면에서 이미지 표시 */
@media (max-width: 960px) {
    .store-container {
        background-image: url('@/assets/image/background.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .store-card {
        background-color: rgba(255, 255, 255, 0.95);
        width: 90%;
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>