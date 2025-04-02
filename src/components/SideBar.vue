<script setup>
import MyMenu from './MyMenu.vue';
</script>
<template>
    <aside class="sidebar">
      <div class="menu-section">
        <p class="menu-title">메뉴관리</p>
        <ul>
          <li class="menu-item"><a href="#">MY 메뉴</a></li>
          <li class="menu-item"><a href="#">옵션</a></li>
          <li class="menu-item"><a href="#">카테고리</a></li>
        </ul>
      </div>
  
      <div class="menu-section">
        <p class="menu-title">매출관리</p>
        <ul>
          <li class="menu-item"><a href="#">매출현황</a></li>
          <li class="menu-item"><a href="#">매출상세</a></li>
          <li class="menu-item"><a href="#">달력으로 보기</a></li>
          <li class="menu-item"><a href="#">판매 상품 분석</a></li>
        </ul>
      </div>
  
      <div class="menu-section">
        <p class="menu-title">재고관리</p>
        <ul>
          <li class="menu-item"><a href="#">MY 재고</a></li>
        </ul>
      </div>
  
      <div class="menu-section">
        <p class="menu-title">설정</p>
        <ul>
          <li class="menu-item"><a href="#">내 정보</a></li>
          <li class="menu-item"><a href="#">매장 정보</a></li>
        </ul>
      </div>
      <div class="sidebar-footer">
      <img src="..\assets\icon.png" alt="로고 이미지" class="footer-image" />
      </div>
    </aside>
  </template>
  
  <style scoped>
.sidebar {
    width: 240px;
    min-height: 100vh; /* 최소 높이를 화면 전체 높이로 설정 */
    background-color: #D1D5C2;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: relative; /* 부모 요소 기준 배치 */
    left: 0;
}
  
  .sidebar h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .menu-section {
    margin-bottom: 10px;
  }
  
  .menu-title {
    font-size: 18px;
    color: #000000;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .menu-item {
    list-style: none;
    padding: 8px 0;
  }
  
  .menu-item a {
    text-decoration: none;
    color: #444;
    font-size: 12px;
    display: block;
    padding: 3px 10px;
    border-radius: 5px;
  }
  
  .menu-item a:hover {
    background-color: #B8C2A5;
    color: #222;
  }
  .footer-image {
  width: 200px;  /* 너비 조정 */
  height: auto;  /* 가로 비율 유지 */
  max-width: 200px; /* 최대 크기 제한 */
  display: block;
  margin: 0 auto;  /* 가운데 정렬 */
}
  </style>
  