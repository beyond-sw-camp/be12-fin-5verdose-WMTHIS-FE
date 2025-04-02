<template>
  <div class="total_header">
    <div class="header_up">
      <v-icon v-if="!menuHidden" class="header-icon" icon="mdi-menu" @click="toggleLeftPanel"></v-icon>
      <v-icon v-if="!homeHidden" class="header-icon" icon="mdi-home"></v-icon>

      <div class="header_right_icon">
        <div class="bell-container">
          <v-icon class="header-icon" icon="mdi-bell" @click="toggleBellDropdown"></v-icon>
          <v-icon v-if="alarmToggle" class="alarm-icon" icon="mdi-exclamation-thick"></v-icon>
        </div>

        <div v-if="isBellDropdownOpen" class="dropdown">
          <p>알림이 없습니다.</p>
          <button class="close-btn" @click="closeBellDropdown">닫기 ✖</button>
        </div>

        <v-icon v-if="menuHidden && homeHidden" class="header-icon" icon="mdi-dots-vertical" @click="togglePanel"></v-icon>
      </div>
    </div>
  </div>
  <RightPanel :isPanelOpen="isPanelOpen" :closePanel="closePanel" />
  <LeftPanel :isPanelOpen="isLeftPanelOpen" :closePanel="closeLeftPanel" />

  <v-overlay :model-value="isPanelOpen || isLeftPanelOpen" class="overlay" @click="closePanels">
    <div class="overlay-content"></div>
  </v-overlay>
</template>

<script setup>
import { ref } from "vue";
import RightPanel from "./RightPanel.vue"; // 오른쪽 패널 컴포넌트 임포트
import LeftPanel from "./LeftPanel.vue"; // 왼쪽패널 컴포넌트 임포트
import ChatFloatBtn from "./ChatFloatBtn.vue";

const isPanelOpen = ref(false);
const isLeftPanelOpen = ref(false);
const isBellDropdownOpen = ref(false);
const alarmToggle = ref(true);
const menuHidden = ref(true);
const homeHidden = ref(false);

const togglePanel = () => {
  isPanelOpen.value = true;
};

const closePanel = () => {
  isPanelOpen.value = false;
};

const toggleLeftPanel = () => {
  isLeftPanelOpen.value = true;
};

const closeLeftPanel = () => {
  isLeftPanelOpen.value = false;
};

const toggleBellDropdown = () => {
  isBellDropdownOpen.value = !isBellDropdownOpen.value;
};

const closeBellDropdown = () => {
  isBellDropdownOpen.value = false;
};

// ✅ 오버레이 클릭 시 패널 닫기
const closePanels = () => {
  isPanelOpen.value = false;
  isLeftPanelOpen.value = false;
};
</script>

<style scoped>
.total_header {
  width: 100vw;
  height: 8vh;
}

.header_up {
  width: 100%;
  height: 100%;
  background-color: #4d826c;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 1.5rem;
}

.header_up_write {
  font-size: 1.25rem;
  color: rgb(221, 224, 227);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header_right_icon {
  display: flex;
  gap: 1.25rem;
  margin-left: auto;
  position: relative;
}

.bell-container {
  position: relative;
}

.header-icon {
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

.alarm-icon {
  position: absolute;
  top: -4px;
  right: -4px;
  color: red;
  width: 0.8rem;
  height: 0.8rem;
  animation: shake 1s infinite alternate;
}

@keyframes shake {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

.dropdown {
  position: absolute;
  top: 2rem;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
  min-width: 150px;
  text-align: center;
  z-index: 10;
}

.dropdown .close-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: black;
}

/* ✅ 오버레이 스타일 */
.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  z-index: 99 !important; /* 패널보다 낮은 z-index */
}

.overlay-content {
  /* 오버레이 내용 (선택 사항) */
}

/* ✅ 패널 스타일 */
.side-panel { /* RightPanel 및 LeftPanel 컴포넌트의 최상위 요소에 적용된 클래스 */
  position: fixed;
  /* ... 기존 스타일 ... */
  z-index: 100; /* 오버레이보다 높은 z-index */
}
</style>