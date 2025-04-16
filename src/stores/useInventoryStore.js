import { defineStore } from "pinia";
import axios from "axios";

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
    // 재고 정보 세팅
    setInventoryDetail(detail) {
      this.inventoryDetail = detail;
    },

    // 재고 등록 요청
    async registerStoreInventory() {
      try {
        const response = await axios.post(
          "/api/inventory/registerStoreInventory",
          this.inventoryDetail
        );
        return response.data; // BaseResponse<String> 형태
      } catch (error) {
        console.error("재고 등록 실패:", error.response?.data || error.message);
        throw error;
      }
    },
  },
});
