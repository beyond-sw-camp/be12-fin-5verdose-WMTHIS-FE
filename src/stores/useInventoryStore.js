// src/stores/useInventoryStore.js
import { defineStore } from "pinia";
import { api } from "@/api"; // api.js에서 export 된 모든 함수들 가져오기

// Pinia store
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
    // registerStoreInventory 함수 정의
    async registerStoreInventory(storeInventoryData) {
      try {
        const result = await api.registerInventory(storeInventoryData); // api.registerInventory 호출
        return result; // 성공 시 반환
      } catch (error) {
        console.error("registerStoreInventory 실패:", error);
        return false; // 실패 시 false 반환
      }
    },

    setInventoryDetail(detail) {
      this.inventoryDetail = detail;
    },
  },
});
