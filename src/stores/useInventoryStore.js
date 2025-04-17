import { defineStore } from "pinia";
import { api } from "@/api";

export const useInventoryStore = defineStore("inventoryStore", {
  state: () => ({
    inventoryDetail: {
      name: "",
      expiryDate: null,
      miniquantity: null,
      unit: "",
    },
  }),

  actions: {
    async registerStoreInventory(storeInventoryData) {
      try {
        const result = await api.registerInventory(storeInventoryData);
        return result;
      } catch (error) {
        console.error("registerStoreInventory 실패:", error);
        return false;
      }
    },

    async updateInventory(storeInventoryData) {
      try {
        const result = await api.updateInventory(storeInventoryData);
        return result;
      } catch (error) {
        console.error("storeInventory 실패:", error);
        return false;
      }
    },

    async totalStoreInventory(storeInventoryData) {
      try {
        const result = await api.totalStoreInventory(storeInventoryData); // 이 부분 수정
        return result;
      } catch (error) {
        console.error("Error in totalStoreInventory:", error);
        return false;
      }
    },

    async searchInventory(storeInventoryData) {
      try {
        const result = await api.searchInventory(storeInventoryData);

        if (result) {
          inventory_items.value = result; // 검색 결과 성공 시 목록에 적용
        } else {
          console.warn("검색 결과가 없습니다.");
          alert("검색 결과가 없습니다."); // 유저에게 안내
        }

        if (result && result !== 404) {
          this.setInventoryDetail(result); // 검색 결과를 상태에 저장
          return result;
        } else {
          console.error("검색 실패 또는 결과 없음");
          return false;
        }
      } catch (error) {
        console.error("searchInventory 실패:", error);
        return false;
      }
    },
    totalStoreInventory(storeInventoryData) {
      try {
        const response = api.totalStoreInventory(storeInventoryData); // API 호출
        if (response.status === 200) {
          return true;
        } else {
          throw new Error("입고 실패");
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    setInventoryDetail(detail) {
      this.inventoryDetail = detail;
    },
  },
});
