<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close']);

const activeTab = ref('단일메뉴'); // 기본 선택된 탭
const optionName = ref('');
const ingredientName = ref('');
const ingredientAmount = ref('');
const ingredientUnit = ref('');
const ingredients = ref([
    { name: '고추장', amount: '50', unit: 'g' },
    { name: '토마토', amount: '10', unit: 'g' },
    { name: '삼겹살', amount: '50', unit: 'g' }
]);
const category = ref('');

const ingredientOptions = ['고추장', '토마토', '삼겹살', '양파', '파'];
const unitOptions = ['g', 'kg', 'ml', 'L', 'EA'];

const addIngredient = () => {
    if (ingredientName.value && ingredientAmount.value && ingredientUnit.value) {
        ingredients.value.push({
            name: ingredientName.value,
            amount: ingredientAmount.value,
            unit: ingredientUnit.value
        });
        ingredientName.value = '';
        ingredientAmount.value = '';
        ingredientUnit.value = '';
    }
};

const removeIngredient = (index) => {
    ingredients.value.splice(index, 1);
};
const handleRegisterOption = async () => {
    const requestData = {
        name: optionName.value,
        price: parseInt(price.value),
        categoryId: selectedCategoryId.value,
        inventoryQuantities: ingredients.value.map((ingredient) => ({
            inventoryId: getInventoryIdByName(ingredient.name),
            quantity: parseFloat(ingredient.amount),
        })),
    };

    const success = await api.registerOption(requestData);
    if (success) {
        alert('옵션 등록 성공');
        emit('close');
    } else {
        alert('옵션 등록 실패');
    }
};
</script>

<template>
    <div v-if="isOpen" class="modal_overlay" @click.self="emit('close')" style="z-index: 2000;">
        <div class="modal">
            <div class="modal_content">
                <div class="modal_header">
                    <button class="close_btn" @click="emit('close')">✕</button>

                    <h2 class="modal_title">옵션 수정</h2>

                    <p class="modal_desc">카테고리에 사용가능한 옵션을 수정해주세요</p>
                </div>
                <div class="input_group">
                    <div class="modal_title2">
                        <label>옵션명</label>
                        <p class="title_warn">(필수)</p>
                    </div>
                    <p class="sub_title"> 판매 시 사용되는 옵션명을 입력해주세요.</p>
                    <input type="text" v-model="optionName" placeholder="옵션1" />
                </div>


                <div class="input_group">
                    <label>재고 소요량</label>
                    <p class="sub_title"> 옵션을 만드는 데 필요한 재고의 종류와 양을 입력해 주세요.</p>
                    <div class="ingredient_inputs">
                        <select v-model="ingredientName">
                            <option value="" disabled selected>재료 선택</option>
                            <option v-for="item in ingredientOptions" :key="item" :value="item">{{ item }}</option>
                        </select>
                        <input type="number" v-model="ingredientAmount" min="1" placeholder="수량" />
                        <select v-model="ingredientUnit">
                            <option value="" disabled selected>단위 선택</option>
                            <option v-for="unit in unitOptions" :key="unit" :value="unit">{{ unit }}</option>
                        </select>
                        <button class="add_btn" @click="addIngredient">추가</button>
                    </div>
                </div>

                <div class="tag_container">
                    <span v-for="(ingredient, index) in ingredients" :key="index" class="tag">
                        {{ ingredient.name }} {{ ingredient.amount }}{{ ingredient.unit }}
                        <button class="remove_btn" @click="removeIngredient(index)">✕</button>
                    </span>
                </div>

                <div class="input_group">
                    <label>가격</label>
                    <p class="sub_title">옵션의 가격을 입력해주세요.</p>
                    <input type="number" min="1" placeholder="(ex) 50000" />
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

.modal_header {
    border-bottom: #ccc solid 1px;
    margin-bottom: 10px;
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
    margin-bottom: 20px;
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
