<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close']);

const menuName = ref('');
const category = ref('');
const optionList = ['면 추가', '밥 추가', '치즈 추가', '고기 추가'];
const optionName = ref('');
const selectedOptions = ref([]);

const addOption = () => {
    if (optionName.value && !selectedOptions.value.includes(optionName.value)) {
        selectedOptions.value.push(optionName.value);
        optionName.value = '';
    }
};

const removeOption = (index) => {
    selectedOptions.value.splice(index, 1);
};


</script>

<template>
    <div v-if="isOpen" class="modal_overlay" @click.self="emit('close')">
        <div class="modal">
            <div class="modal_content">
                <div class="modal_header">
                    <button class="close_btn" @click="emit('close')">✕</button>
                    <h2 class="modal_title">카테고리 수정</h2>
                    <p class="modal_desc">메뉴의 카테고리와 사용가능한 옵션을 수정해주세요.</p>
                </div>
                <div class="input_group">
                    <div class="modal_title2">
                        <label>카테고리 명</label>
                        <p class="title_warn">(필수)</p>
                    </div>
                    <p class="sub_title"> 판매 시 사용하는 카테고리명을 입력해주세요</p>
                    <input type="text" v-model="menuName" placeholder="카테고리1" />
                </div>



                <div class="input_group">
                    <label>옵션</label>
                    <p class="sub_title"> 카테고리에서 사용가능한 옵션을 선택해주세요.</p>
                    <select v-model="category">
                        <option value="">카테고리를 선택해 주세요.</option>
                        <option value="">탕류</option>
                        <option value="">사이드</option>
                        <option value="">선택없음</option>
                    </select>
                </div>

                <div class="input_group">
                    <label>옵션 추가</label>
                    <p class="sub_title">면 추가, 밥 추가 등 메뉴에 적용할 옵션을 선택해 주세요.</p>
                    <div class="ingredient_inputs">
                        <select v-model="optionName">
                            <option value="" disabled selected>옵션 선택</option>
                            <option v-for="item in optionList" :key="item" :value="item">{{ item }}</option>
                        </select>
                        <button class="add_btn" @click="addOption">추가</button>
                    </div>
                </div>

                <div class="tag_container">
                    <span v-for="(opt, index) in selectedOptions" :key="index" class="tag">
                        {{ opt }}
                        <button class="remove_btn" @click="removeOption(index)">✕</button>
                    </span>
                </div>


            </div>
            <div class="modal_footer">
                <button class="confirm_btn" @click="emit('close')">수정</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
}

/* 모달 슬라이드 애니메이션 */
.modal {
    width: 33.33%;
    height: 100vh;
    background: white;
    padding: 20px;
    border-left: 1px solid #ddd;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
    justify-content: space-between;
    /* 상단-하단 요소 분리 */
    position: relative;
    display: flex;
    flex-direction: column;

    transform: translateX(100%);
    animation: slideIn 0.3s forwards;
}

/* 모달 안의 스크롤 영역 */
.modal_content {
    position: relative;
    overflow-y: auto;
    flex: 1;
}

/* 등록 버튼 고정 영역 */
.modal_footer {
    padding: 16px 20px;
    border-top: 1px solid #eee;
    background-color: #fff;
}

/* 페이드인 효과 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* 오른쪽에서 왼쪽으로 슬라이드 */
@keyframes slideIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

.modal_header {
    border-bottom: #ccc solid 1px;
    margin-bottom: 10px;
}

.modal_title2 {
    display: flex;
    align-items: center;
    gap: 8px;
}

.title_warn {
    font-size: 14px;
    color: red;
    font-weight: bold;
}

.close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    z-index: 10;
}

.modal_title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
}

.sub_title {
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #666
}

.modal_desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.tab_menu {
    display: flex;
    border-bottom: none;
    margin-bottom: 15px;
    gap: 10px;
    justify-content: center;
    width: 100%;
}

.tab_menu button {
    flex: 1;
    /* 버튼을 가로로 균등하게 배치 */
    padding: 6px 30px;
    /* 높이를 줄이고 가로 길이를 늘림 */
    background-color: #B8C0C8;
    /* 기본 색 */
    border: 2px solid #B8C0C8;
    border-radius: 30px;
    /* 더 길쭉한 느낌 */
    font-size: 14px;
    /* 폰트 크기도 살짝 줄임 */
    cursor: pointer;
    color: black;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s, transform 0.2s;
    text-align: center;
}

.tab_menu button:hover {
    background-color: #9FA6AD;
}

.tab_menu button.active {
    background-color: #858B91;
    color: white;
    border-color: #858B91;
}

.ingredient_inputs {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
}

.ingredient_inputs select,
.ingredient_inputs input {
    flex: 1;
    min-width: 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.add_btn {
    flex-shrink: 0;
    padding: 10px 14px;
    background: #C8C8C8;
    color: white;
    border: none;
    border-radius: 18px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
}

.add_btn:hover {
    background: #9FA6AD;
}

/* 추가된 재료 리스트 스타일 */
.tag_container {
    margin-top: 5px;
    margin-bottom: 30px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 18px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    display: inline-flex;
    align-items: center;
    background-color: #dbe2ea;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 14px;
    color: #333;
}

.remove_btn {
    background: none;
    border: none;
    color: black;
    margin-left: 8px;
    cursor: pointer;
    font-weight: bold;
}

.input_group input,
.input_group select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 18px;
    font-size: 14px;
}

.input_group label {
    font-size: 16px;
    color: #222;
    font-weight: bold;
    letter-spacing: 0.5px;
}


.input_group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.confirm_btn {
    margin-top: auto;
    padding: 10px;
    background: #B1D5C2;
    color: black;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
}

.confirm_btn:hover {
    background: #8CBFA4;
}
</style>
