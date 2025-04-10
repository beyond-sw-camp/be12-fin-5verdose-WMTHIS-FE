<script setup>
import { ref, reactive } from 'vue';
import SuccessModal from '@/components/alerts/SuccessModal.vue';

// 사용자 정보 상태
const userProfile = reactive({
    name: '홍길동',
    email: 'user@example.com',
    phone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    detailAddress: '456호',
    birthdate: '1990-01-01',
    profileImage: null
});

// 원본 데이터 백업 (취소 시 복원용)
const originalProfile = { ...userProfile };

// 모달 상태
const isSuccessModalOpen = ref(false);

// 프로필 이미지 업로드 처리
const profileImageRef = ref(null);
const previewImage = ref(null);

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        userProfile.profileImage = file;
        previewImage.value = URL.createObjectURL(file);
    }
};

const triggerImageUpload = () => {
    profileImageRef.value.click();
};

// 폼 제출 처리
const handleSubmit = () => {
    // 여기서 API 호출 등의 저장 로직을 구현
    console.log('저장된 정보:', userProfile);
    isSuccessModalOpen.value = true;
};

// 변경사항 취소
const handleCancel = () => {
    // 원본 데이터로 복원
    Object.assign(userProfile, originalProfile);
    previewImage.value = null;
};

// 성공 모달 닫기
const closeSuccessModal = () => {
    isSuccessModalOpen.value = false;
};
</script>

<template>
    <div class="body">
        <h1 class="page_title">회원정보 수정</h1>

        <form @submit.prevent="handleSubmit" class="profile-form">
            <!-- 프로필 이미지 섹션 -->
            <div class="profile-image-section">
                <div class="profile-image-container" @click="triggerImageUpload">
                    <img v-if="previewImage" :src="previewImage" alt="프로필 이미지" class="profile-image" />
                    <img v-else src="@/assets/image/default-profile.png" alt="기본 프로필" class="profile-image" />
                    <div class="image-overlay">
                        <span>이미지 변경</span>
                    </div>
                </div>
                <input type="file" ref="profileImageRef" @change="handleImageUpload" accept="image/*"
                    style="display: none" />
            </div>

            <!-- 회원정보 입력 폼 -->
            <div class="form-container">
                <div class="form-group">
                    <label>이름</label>
                    <input type="text" v-model="userProfile.name" class="form-input" />
                </div>

                <div class="form-group">
                    <label>이메일</label>
                    <input type="email" v-model="userProfile.email" class="form-input" />
                </div>

                <div class="form-group">
                    <label>전화번호</label>
                    <input type="tel" v-model="userProfile.phone" class="form-input" />
                </div>

                <div class="form-group">
                    <label>주소</label>
                    <div class="address-container">
                        <input type="text" v-model="userProfile.address" class="form-input address-input" />
                        <button type="button" class="address-search-btn">주소 검색</button>
                    </div>
                </div>

                <div class="form-group">
                    <label>상세 주소</label>
                    <input type="text" v-model="userProfile.detailAddress" class="form-input" />
                </div>

                <div class="form-group">
                    <label>생년월일</label>
                    <input type="date" v-model="userProfile.birthdate" class="form-input" />
                </div>

                <!-- 비밀번호 변경 섹션 -->
                <div class="password-section">
                    <h2 class="section-title">비밀번호 변경</h2>

                    <div class="form-group">
                        <label>현재 비밀번호</label>
                        <input type="password" class="form-input" />
                    </div>

                    <div class="form-group">
                        <label>새 비밀번호</label>
                        <input type="password" class="form-input" />
                    </div>

                    <div class="form-group">
                        <label>새 비밀번호 확인</label>
                        <input type="password" class="form-input" />
                    </div>
                </div>

                <!-- 버튼 그룹 -->
                <div class="action_buttons">
                    <button type="submit" class="save_btn">저장</button>
                    <button type="button" @click="handleCancel" class="cancel_btn">취소</button>
                </div>
            </div>
        </form>

        <!-- 성공 모달 -->
        <SuccessModal :isOpen="isSuccessModalOpen" @close="closeSuccessModal" message="회원정보가 성공적으로 수정되었습니다." />
    </div>
</template>

<style scoped>
.body {
    padding: 20px;
}

/* 제목 */
.page_title {
    font-size: 28px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 30px;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

/* 프로필 폼 */
.profile-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 프로필 이미지 섹션 */
.profile-image-section {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.profile-image-container {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 3px solid #B8C0C8;
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(184, 192, 200, 0.7);
    padding: 8px;
    text-align: center;
    color: white;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s;
}

.profile-image-container:hover .image-overlay {
    opacity: 1;
}

/* 폼 컨테이너 */
.form-container {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

/* 주소 입력 */
.address-container {
    display: flex;
    gap: 10px;
}

.address-input {
    flex: 1;
}

.address-search-btn {
    padding: 8px 12px;
    background-color: #B8C0C8;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;
}

.address-search-btn:hover {
    background-color: #98A8B8;
}

/* 비밀번호 섹션 */
.password-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

/* 버튼 */
.action_buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 30px;
}

.save_btn,
.cancel_btn {
    padding: 10px 20px;
    background-color: #B8C0C8;
    border: none;
    border-radius: 20px;
    width: 120px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}

.save_btn {
    background-color: #708090;
    color: white;
}

.save_btn:hover {
    background-color: #5A6978;
}

.cancel_btn:hover {
    background-color: #98A8B8;
}
</style>