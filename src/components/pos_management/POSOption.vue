<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    selectedItem: Object
});
const emit = defineEmits(['close', 'addOrder']); // ✅ 주문 추가 이벤트 추가

// ✅ 옵션 리스트 (객체)
const availableOptions = ref([
    {
        name: '추가 재료',
        choices: [
            { label: '선택 없음', price: 0 },
            { label: '베이컨 추가', price: 1000 },
            { label: '새우 추가', price: 1500 },
            { label: '버섯 추가', price: 500 }
        ],
        selected: []
    }
]);
const handleSelection = (option, choice) => {
    if (choice.label === '선택 없음') {
        // ✅ "선택 없음" 선택 시, 다른 옵션 해제 후 "선택 없음"만 선택
        option.selected = [choice];
    } else {
        // ✅ 다른 옵션을 선택하면 "선택 없음" 해제 후 멀티 선택 가능
        option.selected = option.selected.filter(item => item.label !== '선택 없음');

        const exists = option.selected.some(item => item.label === choice.label);
        if (exists) {
            // ✅ 이미 선택된 옵션이면 해제
            option.selected = option.selected.filter(item => item.label !== choice.label);
        } else {
            // ✅ 새로운 옵션 추가 (멀티 선택 가능)
            option.selected.push(choice);
        }
    }
};
// ✅ 옵션 선택 후 확인 버튼 클릭 시
const closeAndConfirm = () => {
    if (!props.selectedItem) return;

    const selectedOptions = availableOptions.value.flatMap(option => option.selected);
    const totalOptionPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);

    const orderData = {
        id: props.selectedItem.id,
        name: props.selectedItem.name,
        price: props.selectedItem.price + totalOptionPrice, // ✅ 기본 가격 + 옵션 가격
        quantity: 1,
        options: selectedOptions // 선택한 옵션 전체 저장
    };

    emit('addOrder', orderData);
    emit('close');
};
</script>

<template>
    <div class="modal_overlay">
        <div class="modal">
            <h2>{{ selectedItem?.name }} 옵션 선택</h2>

            <div v-for="(option, index) in availableOptions" :key="index" class="option_group">
                <p class="option_title">{{ option.name }}</p>
                <div>
                    <label v-for="choice in option.choices" :key="choice.label">
                        <input type="checkbox" :value="choice" :checked="option.selected.includes(choice)"
                            @change="handleSelection(option, choice)" />
                        {{ `${choice.label} (+${choice.price.toLocaleString()}원)` }}
                    </label>
                </div>
            </div>

            <div class="modal_buttons">
                <button class="cancel_btn" @click="$emit('close')">취소</button>
                <button class="confirm_btn" @click="closeAndConfirm">확인</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    height: auto;
    width: 600px;
    text-align: center;
}

.modal h2 {
    font-size: 32px;
}

.option_title {
    text-align: left;
    margin: 2px 0 10px 20px;
    font-size: 26px;
    font-weight: bold;
}

.option_group {
    margin: 15px 0;
}

.option_group label {
    display: block;
    font-weight: bold;
    text-align: left;
    margin: 2px 0 20px 20px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

.modal_buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.confirm_btn {
    background: #B8C0C8;
    color: black;
    font-weight: bold;
    padding: 8px 12px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    width: 100px;
    height: 50px;
    font-size: 16px;
}

.cancel_btn {
    background: #FFFFFF;
    color: black;
    padding: 8px 12px;
    border: #000000 solid 1px;
    border-radius: 16px;
    cursor: pointer;
    font-weight: bold;
    width: 100px;
    height: 50px;
    font-size: 16px;
}

.confirm_btn:hover {
    background: #9BC1AE;
}
</style>