<script setup>
import { onMounted } from "vue";
import Header from "./Header.vue";

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=88cbef76e6b13419aaba248f6e344b59&autoload=false&libraries=services";
    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };
    document.head.appendChild(script);
  }
});

const markerList = [];
let normalImage = null;
let largeImage = null;

const handleClosePanel = () => {
  const panel = document.querySelector(".fixed_panel_wrapper");
  if (panel) {
    panel.classList.add("hidden");
    markerList.forEach((m) => m.setImage(normalImage)); // 모두 작게
  }
};

function initMap() {
  const geocoder = new kakao.maps.services.Geocoder();

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    normalImage = new kakao.maps.MarkerImage(
      "../../img/bluePing.png",
      new kakao.maps.Size(30, 30) // 일반 사이즈
    );

    largeImage = new kakao.maps.MarkerImage(
      "../../img/redPing.png",
      new kakao.maps.Size(50, 50) // 클릭 시 크게!
    );

    // 1. 내 위치 마커
    // const myMarker = new kakao.maps.Marker({
    //   position: new kakao.maps.LatLng(lat, lng),
    //   map,
    //   title: "내 위치",
    // });

    // const myContent = document.createElement("div");
    // myContent.className = "custom_overlay";
    // myContent.innerHTML = `
    //   <div class="info_title">📍 내 위치</div>
    // `;

    // const overlay = new kakao.maps.CustomOverlay({
    //   content: myContent, // 문자열이 아닌 DOM 요소
    // });

    // let myOpen = true;

    // kakao.maps.event.addListener(myMarker, "click", function () {
    //   if (myOpen) {
    //     overlay.setMap(null);
    //     myOpen = false;
    //   } else {
    //     overlay.setMap(map);
    //     myOpen = true;
    //   }
    // });

    // 2. 주소 리스트
    const addressList = [
      {
        label: "국사봉",
        address: "서울 동작구 국사봉2길 22",
        boardList: [
          { boardTitle: "마늘 팔아요", boardGoods: "마늘", boardDate: "2024-03-24" },
          { boardTitle: "양파 팔아요", boardGoods: "양파", boardDate: "2024-03-25" },
          { boardTitle: "고추 팔아요", boardGoods: "고추", boardDate: "2024-03-26" },
        ],
      },
      {
        label: "여의대방로",
        address: "서울 동작구 여의대방로22길 138",
        boardList: [
          { boardTitle: "김치 팔아요!!! 팔아요 팔아요 싸게", boardGoods: "김치", boardDate: "2024-03-27" },
          { boardTitle: "당근 팔아요", boardGoods: "당근", boardDate: "2024-03-28" },
        ],
      },
      {
        label: "보라매로",
        address: "서울 동작구 보라매로 96-1",
        boardList: [
          { boardTitle: "감자 팔아요", boardGoods: "감자", boardDate: "2024-03-29" },
          { boardTitle: "가지 팔아요", boardGoods: "가지", boardDate: "2024-03-30" },
          { boardTitle: "피클 팔아요", boardGoods: "피클", boardDate: "2024-03-31" },
          { boardTitle: "콜라 팔아요", boardGoods: "콜라", boardDate: "2024-04-01" },
        ],
      },
    ];

    const fixedPanelWrapper = document.querySelector(".fixed_panel_wrapper");

    addressList.forEach(({ label, address, boardList }) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new kakao.maps.Marker({
            map,
            position: coords,
            title: label,
            image: normalImage,
          });
          markerList.push(marker);

          // 📦 고정 영역에 넣을 HTML 구성
          let boardHtml = `<h3 class="custom_overlay_header"> 게시글 </h3> <br/>`;
          boardList.forEach(({ boardTitle, boardGoods, boardDate }) => {
            boardHtml += `
          <div class="custom_overlay">
            <a class="custom_overlay_board_title custom_overlay_rule">${boardTitle}</a>
            <span class="custom_overlay_board_goods">${boardGoods}, </span>
            <span class="custom_overlay_board_date">(${boardDate})</span>
          </div>
          <hr/>
        `;
          });

          // 🎯 마커 클릭 시 내용 고정 패널에 출력
          const fixedPanelContent = document.querySelector("#fixedPanelContent");

          kakao.maps.event.addListener(marker, "click", () => {
            fixedPanelContent.innerHTML = boardHtml; // ✅ 버튼은 덮지 않음
            fixedPanelWrapper.classList.remove("hidden");
            markerList.forEach((m) => m.setImage(normalImage)); // 모두 작게
            marker.setImage(largeImage); // 클릭된 것만 크게
          });
        }
      });
    });
  });
}
</script>

<template>
  <div>
    <Header></Header>
    <div id="map" style="width: 100%; height: 90vh; margin"></div>
    <div class="fixed_panel_wrapper hidden">
      <div id="fixedPanel" class="fixed_panel">
        <button class="close_btn" @click="handleClosePanel"><img src="../../img/xMark.png" class="panel_button" /></button>
        <div id="fixedPanelContent"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.custom_overlay_header) {
  font-size: 15px;
}

:deep(.custom_overlay) {
  padding: 10px 10 0px 10px;
  border-radius: 8px;
  font-size: 14px;
}

:deep(.custom_overlay_board_title) {
  font-size: 15px;
  color: #0068c3;
  width: 120px;
}
:deep(.custom_overlay_board_goods) {
  width: 30px;
  font-size: 10px;
}
:deep(.custom_overlay_board_date) {
  width: 90px;
  font-size: 10px;
}

:deep(.custom_overlay_rule) {
  display: inline-block;
  white-space: nowrap; /* 줄바꿈 안 함 */
  overflow: hidden; /* 넘치는 부분 감춤 */
  text-overflow: ellipsis; /* 넘친 부분 ... 처리 */
}

.fixed_panel_wrapper {
  position: fixed; /* 화면에 고정 */
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.fixed_panel {
  position: relative;
  width: 270px;
  height: 180px;
  overflow-y: auto;
  background-color: #fffefb;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.hidden {
  display: none;
}

.close_btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10000; /* 다른 요소보다 위로 */
}

.panel_button {
  width: 20px;
  height: 20px;
}
</style>
