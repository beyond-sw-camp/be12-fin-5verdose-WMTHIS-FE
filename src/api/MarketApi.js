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
      .post("/inventorySale/register", data)
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);

        return res.data.code === 200; // 성공 시 true 반환;
      })
      .catch((error) => {
        console.error("Error in registerInventorySale:", error);
        return false;
      });
  },
  getInventorySaleList() {
    console.log("getInventorySale list");
    return instance
      .get("/inventorySale/getList")
      .then((res) => {
        console.log("res", res);

        return res.data;
      })
      .catch((error) => {
        console.error("Error in getInventorySaleList:", error);
        return false;
      });
  },
};
