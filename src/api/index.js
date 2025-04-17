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

  signUp(data) {
    console.log("SignUp data", data);
    return instance
      .post("/user/signup", data)
      .then((res) => {
        console.log("signUpRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in signUp:", error);
        return false;
      });
  },

  emailSend(data) {
    console.log("EmailSend data", data);
    return instance
      .post("/email/sendcode", { emailUrl: data })
      .then((res) => {
        console.log("emailSendRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in emailSend:", error);
        return false;
      });
  },

  emailAuth(code, emailUrl) {
    console.log("EmailAuth data", code, emailUrl);
    return instance
      .post("/email/authcode", { code, emailUrl })
      .then((res) => {
        console.log("emailAuthRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in emailAuth:", error);
        return false;
      });
  },

  phoneSend(data) {
    console.log("SMS Send data", data);
    return instance
      .post("/user/smssend", { phoneNum: data })
      .then((res) => {
        console.log("smsSendRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in SMS Send:", error);
        return false;
      });
  },

  phoneAuth(code, phoneNum) {
    console.log("PhoneAuth data", code, phoneNum);
    return instance
      .post("/user/phoneverify", { code, phoneNum })
      .then((res) => {
        console.log("PhoneAuthRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in PhoneAuth:", error);
        return false;
      });
  },
};
