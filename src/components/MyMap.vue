<template>
  <div id="map" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import { onMounted } from "vue";

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

    // 1. 내 위치 마커
    const myMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map,
      title: "내 위치",
    });

    const myInfo = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">📍 내 위치</div>`,
    });

    let myOpen = false;

    kakao.maps.event.addListener(myMarker, "click", function () {
      if (myOpen) {
        myInfo.close();
        myOpen = false;
      } else {
        myInfo.open(map, myMarker);
        myOpen = true;
      }
    });

    // 2. 주소 리스트
    const addressList = [
      { label: "대방동", address: "서울 동작구 상도로 76" },
      { label: "여의대방로", address: "서울 동작구 여의대방로22길 138" },
    ];

    addressList.forEach(({ label, address }) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new kakao.maps.Marker({
            map,
            position: coords,
            title: label,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">📍 ${address}</div>`,
          });

          let isOpen = false; // 🔁 열림/닫힘 상태 저장

          kakao.maps.event.addListener(marker, "click", function () {
            if (isOpen) {
              infowindow.close();
              isOpen = false;
            } else {
              infowindow.open(map, marker);
              isOpen = true;
            }
          });
        }
      });
    });
  });
}
</script>
