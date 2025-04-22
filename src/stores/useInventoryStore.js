// src/stores/useInventoryStore.js
import { defineStore } from "pinia";
import axios from "axios"; // axios를 사용하여 API 요청을 처리합니다.
import { api } from "@/api/index.js";
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
        const token = authStore.getLogin()
          ? localStorage.getItem("accessToken")
          : null;

        // api.registerInventory()를 사용하여 메서드 호출
        const result = await api.registerInventory(storeInventoryData);

        return result; // 성공적으로 반환된 데이터
      } catch (error) {
        console.error("registerStoreInventory 실패:", error);
        return false;
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
        const response = await axios.get("/api/inventories"); // 서버에서 재고 리스트 가져오기
        this.inventoryList = response.data;
      } catch (error) {
        console.error("재고 목록을 불러오는 데 실패했습니다.", error);
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
