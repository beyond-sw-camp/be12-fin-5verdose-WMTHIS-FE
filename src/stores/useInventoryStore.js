// src/stores/useInventoryStore.js
import { defineStore } from "pinia";
import axios from "axios"; // axios를 사용하여 API 요청을 처리합니다.
import { api } from "@/api/MenuApi.js"; // api 모듈을 가져옵니다.
import useAuthStore from "@/stores/useAuthStore.js"; // 수정된 부분

export const useInventoryStore = defineStore("inventoryStore", {
  state: () => ({
    inventoryDetail: {
      storeInventoryId: null,
      name: "",
      expiryDate: null,
      miniquantity: null,
      unit: "",
    },
    inventoryItems: [],
    inventoryList: [],
  }),

  actions: {
    async registerStoreInventory(storeInventoryData) {
      try {
        const authStore = useAuthStore();
        const token = localStorage.getItem("accessToken"); // 로그인 상태와 관계없이 항상 토큰 가져오기

        // 토큰이 없다면 API 요청을 보낼 수 없음
        if (!token) {
          alert("로그인이 필요한 작업입니다.");
          return;
        }

        const result = await axios.post(
          "/api/inventory/registerInventory",
          storeInventoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 성공적으로 등록되었을 경우
        return result.data;
      } catch (error) {
        console.error("재고 등록 중 오류 발생:", error);
        alert("재고 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },

    async updateInventory(updatedItem) {
      try {
        const response = await api.put(
          `/api/inventory/${updatedItem.id}`,
          updatedItem
        );
        const index = this.inventories.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          this.inventories[index] = response.data;
        }
        return true;
      } catch (error) {
        console.error("Error in updateInventory:", error);
        return false;
      }
    },

    async totalStoreInventory(storeInventoryData) {
      try {
        const result = await api.totalStoreInventory(storeInventoryData);
        if (result.status === 200) {
          return true;
        } else {
          throw new Error("입고 실패");
        }
      } catch (error) {
        console.error("totalStoreInventory 실패:", error);
        return false;
      }
    },

    async searchInventory(storeInventoryData) {
      try {
        const result = await api.searchInventory(storeInventoryData);

        if (result) {
          this.inventoryItems = result; // 검색 결과를 상태에 저장
        } else {
          console.warn("검색 결과가 없습니다.");
          alert("검색 결과가 없습니다.");
        }

        if (result && result !== 404) {
          this.setInventoryDetail(result); // 검색 결과를 상태에 저장
          return result;
        } else {
          console.error("검색 실패 또는 결과 없음");
          alert("검색 실패 또는 결과가 없습니다.");
          return false;
        }
      } catch (error) {
        console.error(
          "searchInventory 실패:",
          error.response || error.message || error
        );
        alert("검색 중 오류가 발생했습니다.");
        return false;
      }
    },
    async getInventoryList() {
      try {
        const data = await api.getStoreInventoryList(); // API 호출
        if (data) {
          this.inventoryList = data; // 데이터가 있으면 목록에 저장
        } else {
          console.error("Failed to fetch inventory list");
        }
      } catch (error) {
        console.error("Error fetching inventory list:", error);
      }
    },
    // 재고 정보 선택
    selectInventory(inventoryId) {
      const inventory = this.inventoryList.find(
        (item) => item.id === inventoryId
      );
      this.selectedInventory = inventory;
    },

    setInventoryDetail(detail) {
      this.inventoryDetail = detail;
    },
  },
});
