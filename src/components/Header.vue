<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";
import { mdiDotsVertical } from "@mdi/js";
import { mdiBell } from "@mdi/js";

const path1 = mdiMenu;
const path2 = mdiBell;
const path3 = mdiDotsVertical;
</script>

<template>
  <div class="total_header">
    <div class="header_up">
      <img src="../../img/logo.png" alt="로고 이미지" class="header_left_image" />
      <div class="header_up_write">홈 화면</div>
      <div class="header_right_icon">
        <svg-icon type="mdi" :path="path2" class="icon_style"></svg-icon>
        <svg-icon type="mdi" :path="path3" class="icon_style"></svg-icon>
      </div>
    </div>
    <div class="header_down">
      <div class="header_down_write">메인페이지</div>
    </div>
  </div>
</template>

<style scoped>
.total_header {
  width: 100vw;
  height: 13vh;
}
.header_up {
  width: 100%;
  height: 50%;
  background-color: #666666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_left_image {
  width: 5%;
  height: 95%;
  margin-left: 1.25rem;
}

.header_up_write {
  font-size: 1.25rem;
  color: rgb(221, 224, 227);
}

.header_right_icon {
  display: flex;
  gap: 1.25rem;
  margin-right: 1.875rem;
}

.header_down {
  width: 100%;
  height: 50%;
  background-color: #eeeeee;
}

.header_down_write {
  font-size: 1.125rem;
  font-weight: 900;
  display: flex;
  width: 15%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 0.25rem solid black;
}

.icon_style {
  color: white;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
