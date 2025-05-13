import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 백엔드 API 주소로 변경
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 필요 시 (ex: 쿠키 인증)
});
export const marketApi = {
  uploadImages(formData) {
    return instance
      .post("/market/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error("파일 업로드 실패", err);
        throw err;
      });
  },
  registerInventorySale(data) {
    console.log("registerInventorySale data", data);
    return instance
      .post("/market/registerSale", data)
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);

        return res.data;
      })
      .catch((error) => {
        console.error("Error in registerInventorySale:", error);
        return error.response.data;
      });
  },
  getInventorySaleList() {
    console.log("getInventorySale list");
    return instance
      .get("/market/getList")
      .then((res) => {
        console.log("res", res);

        return res.data;
      })
      .catch((error) => {
        console.error("Error in getInventorySaleList:", error);
        return false;
      });
  },
  getInventorySaleDetail(saleId) {
    console.log("getInventorySaleDetail id:", saleId);
    return instance
      .get(`/market/get/${saleId}/detail`)
      .then((res) => {
        console.log("detail response:", res);
        return res.data; // BaseResponse<InventorySale> 구조일 것
      })
      .catch((error) => {
        console.error("Error in getInventorySaleDetail:", error);
        return null;
      });
  },
  getTransactionList() {
    console.log("getTransactionList");
    return instance
      .get("/market/transaction")
      .then((res) => {
        console.log("res", res);

        return res.data;
      })
      .catch((error) => {
        console.error("Error in getTransactionList:", error);
        return false;
      });
  },
  getPurchaseList(saleId) {
    console.log("getPurchaseList id:", saleId);
    return instance
      .get(`/market/get/${saleId}/purchaseList`)
      .then((res) => {
        console.log("purchase response:", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getPurchaseList:", error);
        return null;
      });
  },
  registerPurchase(data) {
    console.log("registerPurchase data", data);
    return instance
      .post("/market/registerPurchase", data)
      .then((res) => {
        console.log("registerPurchase res", res);
        return res; // 전체 데이터 반환
      })
      .catch((error) => {
        console.error("Error in registerPurchase:", error);
        return null; // 에러 발생 시 null 반환
      });
  },

  approvePurchase(saleId, purchaseId) {
    console.log("approvePurchase saleId:", saleId, "purchaseId:", purchaseId);
    return instance
      .get(`/market/approve`, {
        params: {
          saleId,
          purchaseId,
        },
      })
      .then((res) => {
        console.log("approvePurchase res", res);
        return res.data.code === 200; // 성공 시 true 반환
      })
      .catch((error) => {
        console.error("Error in approvePurchase:", error);
        return false;
      });
  },
  rejectPurchase(purchaseId) {
    console.log("purchaseId:", purchaseId);
    return instance
      .get(`/market/reject`, {
        params: {
          purchaseId,
        },
      })
      .then((res) => {
        console.log("rejectPurchase res", res);
        return res.data.code === 200; // 성공 시 true 반환
      })
      .catch((error) => {
        console.error("Error in approvePurchase:", error);
        return false;
      });
  },
  confirmDelivery(purchaseId) {
    console.log("confirmDelivery purchaseId:", purchaseId);
    return instance
      .put("/market/confirm", null, {
        params: { purchaseId },
      })
      .then((res) => {
        console.log("confirmDelivery res", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in confirmDelivery:", error);
        return false;
      });
  },
  getMyStore() {
    console.log("getMyStore");
    return instance
      .get("/store/getAddress")
      .then((res) => {
        console.log("res", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getMyStoreAddress:", error);
        return false;
      });
  },
  getNearbyStore() {
    console.log("getNearbyStore");
    return instance
      .get("/store/getNearbyStores")
      .then((res) => {
        console.log("res", res);
        return res.data;
      })
      .catch((error) => {
        console.error("Error in getMyStoreAddress:", error);
        return false;
      });
  },
};
