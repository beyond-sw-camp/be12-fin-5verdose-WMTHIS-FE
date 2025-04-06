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
    /*
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
*/
    // 2. 주소 리스트
    const addressList = [
      {
        label: "국사봉",
        address: "서울 동작구 국사봉2길 22",
        boardList: [
          { name: "마늘", quantity: "500g", expire: "D - 3", price: "4000원", date: "오늘", store: "가게1" },
          { name: "양파", quantity: "1kg", expire: "D - 2", price: "3000원", date: "1일전", store: "가게1" },
          { name: "우유", quantity: "2L", expire: "D - 1", price: "8000원", date: "2일전", store: "가게1" },
        ],
      },
      {
        label: "여의대방로",
        address: "서울 동작구 여의대방로22길 138",
        boardList: [
          { name: "김치", quantity: "300g", expire: "D - 5", price: "7000원", date: "어제", store: "가게2" },
          { name: "당근", quantity: "5kg", expire: "D - 7", price: "3000원", date: "4일전", store: "가게2" },
        ],
      },
      {
        label: "보라매로",
        address: "서울 동작구 보라매로 96-1",
        boardList: [
          { name: "감자", quantity: "900g", expire: "D - 5", price: "6000원", date: "오늘", store: "가게3" },
          { name: "가지", quantity: "5kg", expire: "D - 10", price: "9000원", date: "오늘", store: "가게3" },
          { name: "피클", quantity: "40kg", expire: "D - 9", price: "5000원", date: "4일전", store: "가게3" },
          { name: "콜라", quantity: "10L", expire: "D - 8", price: "1000원", date: "7일전", store: "가게3" },
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
          let boardHtml = `
            <table class="custom_board_table">
              <thead>
                <tr>
                  <th>판매 물품</th>
                  <th>수량</th>
                  <th>유통기한</th>
                  <th>희망가격</th>
                  <th>등록날짜</th>
                  <th>가게명</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>`;
          boardList.forEach(({ name, quantity, expire, price, date, store }) => {
            boardHtml += `
              <tr>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${expire}</td>
                <td>${price}</td>
                <td>${date}</td>
                <td>${store}</td>
                <td><button class="btn">상세보기</button></td>
              </tr>
            `;
          });

          boardHtml += `
    </tbody>
  </table>
`;
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
    <div id="map" style="width: 100%; height: 65vh; margin"></div>
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
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.fixed_panel {
  position: relative;
  width: 50vw;
  height: 11.25rem;
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

:deep(.custom_board_table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: center;
  overflow: hidden;
  margin-top: 15px;
}

:deep(.custom_board_table thead th) {
  background-color: #b8c0c8;
  font-weight: bold;
  color: #333;
}
:deep(.custom_board_table thead th:first-child) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

:deep(.custom_board_table thead th:last-child) {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

:deep(.custom_board_table th, .custom_board_table td) {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

:deep(.custom_board_table td) {
  padding: 10px;
}

:deep(.btn) {
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

:deep(.btn:hover) {
  background-color: #f0f0f0;
}
</style>
