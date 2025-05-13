<template>
  <v-app-bar app floating elevation="2" :class="{ 'mt-2': true, scrolled: isScrolled }" color="transparent">
    <div class="d-flex align-center">
      <v-app-bar-title class="font-weight-bold text-white clickable-title" @click="goToDashboard"> WMTHIS </v-app-bar-title>
    </div>

    <div class="d-none d-md-flex">
      <!-- 대시보드 메뉴 -->
      <v-menu open-on-click offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            class="mx-1 header-menu first-menu custom-btn"
            :class="{ 'active-menu': activeMenu === '대시보드' }"
            v-bind="props"
            @click="goToDashboard"
          >
            대시보드
          </v-btn>
        </template>
      </v-menu>

      <!-- 메뉴 관리 -->
      <v-menu open-on-click offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            class="mx-1 header-menu custom-btn"
            :class="{ 'active-menu': activeMenu === '메뉴 관리' }"
            v-bind="props"
            @click="setActiveMenu('메뉴 관리')"
          >
            메뉴 관리
          </v-btn>
        </template>
        <v-list class="dropdown-list">
          <v-list-item
            v-for="(item, index) in ['메뉴 관리', '카테고리 관리', '옵션 관리']"
            :key="index"
            @click="setActiveDropdown('메뉴 관리', item)"
            :class="{ 'active-dropdown': activeDropdowns['메뉴 관리'] === item }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 재고 관리 -->
      <v-menu open-on-click offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            class="mx-1 header-menu custom-btn"
            :class="{ 'active-menu': activeMenu === '재고 관리' }"
            v-bind="props"
            @click="setActiveMenu('재고 관리')"
          >
            재고 관리
          </v-btn>
        </template>
        <v-list class="dropdown-list">
          <v-list-item
            v-for="(item, index) in ['재고 정보', '재고 입고']"
            :key="index"
            @click="setActiveDropdown('재고 관리', item)"
            :class="{ 'active-dropdown': activeDropdowns['재고 관리'] === item }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 가게 분석 -->
      <v-menu open-on-click offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            class="mx-1 header-menu custom-btn"
            :class="{ 'active-menu': activeMenu === '가게 분석' }"
            v-bind="props"
            @click="setActiveMenu('가게 분석')"
          >
            가게 분석
          </v-btn>
        </template>
        <v-list class="dropdown-list">
          <v-list-item
            v-for="(item, index) in ['매출 분석', '메뉴 분석', '재고 분석']"
            :key="index"
            @click="setActiveDropdown('가게 분석', item)"
            :class="{ 'active-dropdown': activeDropdowns['가게 분석'] === item }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 커뮤니티 -->
      <v-menu open-on-click offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            class="mx-1 header-menu custom-btn"
            :class="{ 'active-menu': activeMenu === '커뮤니티' }"
            v-bind="props"
            @click="setActiveMenu('커뮤니티')"
          >
            커뮤니티
          </v-btn>
        </template>
        <v-list class="dropdown-list">
          <v-list-item
            v-for="(item, index) in ['지도로 보기', '목록으로 찾기', '거래내역']"
            :key="index"
            @click="setActiveDropdown('커뮤니티', item)"
            :class="{ 'active-dropdown': activeDropdowns['커뮤니티'] === item }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- 가게 관리 -->
      <v-menu open-on-click offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            class="mx-1 header-menu custom-btn"
            :class="{ 'active-menu': activeMenu === '가게 관리' }"
            v-bind="props"
            @click="setActiveMenu('가게 관리')"
          >
            가게 관리
          </v-btn>
        </template>
        <v-list class="dropdown-list">
          <v-list-item
            v-for="(item, index) in ['MY Page', 'POS']"
            :key="index"
            @click="setActiveDropdown('가게 관리', item)"
            :class="{ 'active-dropdown': activeDropdowns['가게 관리'] === item }"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-spacer></v-spacer>
    <!--
    <v-btn icon class="text-white custom-icon-btn">
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    -->
    <v-menu v-model="showNotificationMenu" :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-white custom-icon-btn" v-bind="props" @click="toggleMenuIfHasNotifications">
          <v-icon>
            {{ notifications.length > 0 ? "mdi-bell-alert" : "mdi-bell" }}
          </v-icon>
        </v-btn>
      </template>

      <v-list class="notification-list">
        <v-list-item v-for="(msg, index) in notifications" :key="index" class="notification-item" @click="goToTransactions(index)">
          <v-list-item-title>{{ msg }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu open-on-click offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-white custom-icon-btn" v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list class="dropdown-list">
        <v-list-item @click="logout">
          <v-list-item-title>로그아웃</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/api/index.js";

const router = useRouter();

const isScrolled = ref(false);
const activeMenu = ref("");
const activeDropdowns = reactive({});

const handleScroll = () => {
  if (window.scrollY > 10) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

const setActiveMenu = (menu) => {
  activeMenu.value = menu;
};

const logout = async () => {
  try {
    await api.getLogout();
    alert("로그아웃 되었습니다.");
    router.push({ name: "login" });
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

const goToDashboard = () => {
  router.push({ name: "dashboard" });
};

const menuRoutes = {
  "메뉴 관리": {
    "메뉴 관리": "MenuMain",
    "카테고리 관리": "MenuCategory",
    "옵션 관리": "MenuOption",
  },
  "재고 관리": {
    "재고 정보": "InventoryMain",
    "재고 입고": "InventoryRegister",
  },
  "가게 분석": {
    "매출 분석": "SalesAnalysis",
    "메뉴 분석": "MenuAnalysis",
    "재고 분석": "InventoryAnalysis",
  },
  커뮤니티: {
    "지도로 보기": "CommunityMap",
    "목록으로 찾기": "CommunityList",
    거래내역: "CommunityTransactions",
  },
  "가게 관리": {
    "MY Page": "MyPage",
    POS: "POSMain",
  },
};

const setActiveDropdown = (menu, item) => {
  activeDropdowns[menu] = item;
  activeMenu.value = menu;

  const routeName = menuRoutes[menu]?.[item];
  if (routeName) {
    router.push({ name: routeName });
  }
};

const showNotificationMenu = ref(false);
const notifications = ref([]); // WebSocket으로 받은 메시지들
let socket;

function toggleMenuIfHasNotifications() {
  showNotificationMenu.value = notifications.value.length > 0;
}

function goToTransactions(index) {
  notifications.value.splice(index, 1); // 클릭한 알림 제거
  showNotificationMenu.value = false; // 알림창 닫기
  router.push("/transactions"); // 페이지 이동
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = () => {
    console.log("✅ WebSocket 연결됨");
  };

  socket.onmessage = (event) => {
    notifications.value.push(event.data);
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket 오류:", error);
  };

  socket.onclose = () => {
    console.log("🔌 WebSocket 연결 종료됨");
  };
});

onBeforeUnmount(() => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.v-app-bar {
  display: flex !important;
  position: relative !important;
  max-width: 1300px;
  border-radius: 8px;
  background-color: #708090 !important;
}

.scrolled {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-menu {
  font-size: 16px;
  color: #292626 !important;
  transition: color 0.3s ease;
  margin-left: 30px !important;
  font-weight: bold !important;
}

.first-menu {
  margin-left: 50px !important;
}

/* 호버 및 클릭 효과 제거 */
.custom-btn::before {
  display: none !important;
}

.custom-btn::after {
  display: none !important;
}

.custom-btn:hover {
  background-color: transparent !important;
}

.custom-btn:active {
  background-color: transparent !important;
}

.custom-icon-btn::before {
  display: none !important;
}

.custom-icon-btn::after {
  display: none !important;
}

/* 드롭다운 스타일링 */
.dropdown-list {
  background-color: #708090 !important;
  border-radius: 8px;
  margin-top: 5px;
  padding: 0;
}

.v-list-item {
  min-height: 40px;
}

.v-list-item__title {
  color: #292626 !important;
  font-weight: bold;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 활성화된 메뉴 스타일 */
.active-menu {
  color: white !important;
}

/* 활성화된 드롭다운 아이템 스타일 */
.active-dropdown .v-list-item__title {
  color: white !important;
}

.clickable-title {
  margin-left: 20px;
  cursor: pointer;
}

.logout-dropdown-list {
  background-color: #708090 !important;
  border-radius: 8px;
  margin-top: 5px;
  padding: 0;
}

.notification-list {
  max-width: 300px;
  padding: 0;
  background-color: #ffffff;
}

.notification-item {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
}

.notification-item:last-child {
  border-bottom: none;
}
</style>
