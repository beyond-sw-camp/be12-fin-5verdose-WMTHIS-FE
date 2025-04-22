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
    if (verfiyRes.data === "success") {
      return true; // 결제 검증 성공
    } else {
      return false; // 결제 검증 실패
    }
  },

  login(data) {
    const loginRes = instance.post("/user/login", data);
    console.log(loginRes);
    return loginRes;
  },
};
