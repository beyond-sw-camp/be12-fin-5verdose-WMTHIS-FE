<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    isOpen: Boolean
});
const menu = ref([
    {
        name: '제육볶음',
        price: 9900,
        category: "볶음류",
        ingredient: [
            '돼지고기 200g',
            '양파 1개',
            '고추장 2T',
            '간장 1T',
            '설탕 1T',
            '대파 50g'
        ]
    }
]);

const selectedMenu = ref(menu.value[0]); // 기본 선택 메뉴 설정
const emit = defineEmits(['close']);
const activeTab = ref('단일메뉴');
</script>

<template>
    <div v-if="isOpen" class="modal_overlay" @click.self="emit('close')">
        <div class="modal">
            <div class="modal_content">
                <div class="modal_header">
                    <button class="close_btn" @click="emit('close')">✕</button>

                    <h2 class="modal_title">메뉴 상세</h2>
                    <p class="modal_desc">이 메뉴의 상세 정보를 확인할 수 있습니다.</p>

                    <div class="tab_menu">
                        <button :class="{ active: activeTab === '단일메뉴' }" disabled>단일메뉴</button>
                        <button :class="{ active: activeTab === '세트메뉴' }" disabled>세트메뉴</button>
                    </div>
                </div>
                <div class="input_group">
                    <div class="modal_title2">
                        <label>메뉴명</label>
                    </div>
                    <p class="sub_title">판매 시 사용되는 정확한 메뉴명입니다.</p>
                    <input type="text" :value="selectedMenu?.name" disabled />
                </div>

                <div class="input_group">
                    <label>재고 소요량</label>
                    <p class="sub_title">메뉴를 만드는 데 필요한 재고의 종류와 양입니다.</p>
                    <div class="ingredient_inputs">
                        <select disabled>
                            <option value="" selected>재료 선택</option>
                        </select>
                        <input type="number" min="1" placeholder="수량" disabled />
                        <select disabled>
                            <option value="" selected>단위 선택</option>
                        </select>
                        <button class="add_btn disabled" disabled>추가</button>
                    </div>
                </div>

                <div class="tag_container">
                    <span v-for="(ingredient, index) in selectedMenu?.ingredient" :key="index" class="tag">
                        {{ ingredient }}
                        <button class="remove_btn disabled" disabled>✕</button>
                    </span>
                </div>

                <div class="input_group">
                    <label>카테고리</label>
                    <p class="sub_title">이 메뉴가 속한 카테고리입니다.</p>
                    <select disabled>
                        <option value="">{{ selectedMenu?.category || "카테고리 없음" }}</option>
                    </select>
                </div>

                <div class="input_group">
                    <label>가격</label>
                    <p class="sub_title">메뉴에 가격을 입력해주세요.</p>
                    <input type="number" v-model="ingredientAmount" :placeholder="selectedMenu?.price" disabled />
                </div>
            </div>
            <div class="modal_footer">
                <button class="confirm_btn" @click="emit('close')">닫기</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal_header {
    border-bottom: #ccc solid 1px;
    margin-bottom: 10px;
}

/* 비활성화 스타일 */
.disabled,
input:disabled,
select:disabled,
button:disabled {
    background: #e0e0e0 !important;
    color: #999 !important;
    cursor: not-allowed !important;
    border: 1px solid #ccc !important;
}

/* 애니메이션 및 기본 레이아웃 */
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

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.modal {
    width: 33.33%;
    height: 100vh;
    background: white;
    padding: 20px;
    border-left: 1px solid #ddd;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    animation: slideIn 0.3s forwards;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
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

/* 제목 */
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

.modal_title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
}

.sub_title {
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #666;
}

.modal_desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

/* 닫기 버튼 */
.close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

/* 탭 메뉴 */
.tab_menu {
    display: flex;
    gap: 10px;
    justify-content: center;
    width: 100%;
    margin-bottom: 15px;
}

.tab_menu button {
    flex: 1;
    padding: 8px 16px;
    background-color: #B1D5C2;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab_menu button:hover {
    background-color: #8CBFA4;
}

.tab_menu button.active {
    background-color: #5E9F83;
    color: white;
}

/* 입력 그룹 */
.input_group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

.input_group label {
    font-size: 16px;
    color: #222;
    font-weight: bold;
    margin-bottom: 6px;
}

.input_group input,
.input_group select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 18px;
    font-size: 14px;
}

/* 재료 입력 */
.ingredient_inputs {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
}

.ingredient_inputs input,
.ingredient_inputs select {
    flex: 1;
    min-width: 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 18px;
    font-size: 14px;
}

/* 추가 버튼 */
.add_btn {
    flex-shrink: 0;
    padding: 10px 16px;
    background: #B1D5C2;
    color: black;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s ease;
}

.add_btn:hover {
    background: #8CBFA4;
}

.add_btn.disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
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
    font-size: 14px;
}

.remove_btn.disabled {
    color: #999;
    cursor: not-allowed;
}

/* 확인 버튼 */
.confirm_btn {
    margin-top: auto;
    padding: 12px;
    background: #B1D5C2;
    color: black;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
}

.confirm_btn:hover {
    background: #8CBFA4;
}

.confirm_btn:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
}
</style>
