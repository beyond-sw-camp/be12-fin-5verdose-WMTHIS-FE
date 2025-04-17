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

    setInventoryDetail(detail) {
      this.inventoryDetail = detail;
    },
  },
});
