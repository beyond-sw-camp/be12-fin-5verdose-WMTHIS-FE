import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // 백엔드 API 주소로 변경
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 필요 시 (ex: 쿠키 인증)
});

export const api = {
  verify(data) {
    const verfiyRes = instance.post("/verify", data);
    if (verifyRes.data === "success") {
      return true; // 결제 검증 성공
    } else {
      return false; // 결제 검증 실패
    }
  },
  registerCategory(data) {
    console.log("registerCategory data", data);
    return instance
      .post("/category/register", data)
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);

        return res.data.code === 200; // 성공 시 true 반환;
      })
      .catch((error) => {
        console.error("Error in registerCategory:", error);
        return false;
      });
  },
  getCategoryList() {
    console.log("getCategoryList");
    return instance
      .get("/category/getList")
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);
        if (res.data.code !== 200) {
          return false; // 실패 시 false 반환;
        }
        return res.data.data; // 성공 시 데이터 반환
      })
      .catch((error) => {
        console.error("Error in getCategoryList:", error);
        return false;
      });
  },
  deleteCategory(data) {
    return instance.delete("/category/delete", {
      data: data,
    });
  },
  getCategory(data) {
    return instance.get("/category/detail", {
      params: data,
    });
  },
};
