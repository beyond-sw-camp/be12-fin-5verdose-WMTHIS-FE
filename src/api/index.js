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
  registerOption(data) {
    console.log("registerOption data", data);
    return instance
      .post("/option/register", data)
      .then((res) => {
        console.log("registerRes", res);
        return res.data.code === 200; // 성공 여부 반환
      })
      .catch((error) => {
        console.error("Error in registerOption:", error);
        return false;
      });
  },
  getOptionList() {
    console.log("getOptionList");
    return instance
      .get("/option/list")
      .then((res) => {
        console.log("registerRes", res);
        console.log("code:", res.data.code);
        if (res.data.code !== 200) {
          return false; // 실패 시 false 반환;
        }
        return res.data.data; // 성공 시 데이터 반환
      })
      .catch((error) => {
        console.error("Error in getOptionList:", error);
        return false;
      });
  },
  updateCategory(payload) {
    return axios.put("/api/category/update", payload);
  },
  deleteOptions(optionIdList) {
    return instance
      .post("/option/delete/batch", optionIdList)
      .then((res) => {
        console.log("deleteOptions res", res);
        return res.data.code === 200;
      })
      .catch((error) => {
        console.error("Error in deleteOptions:", error);
        return false;
      });
  },
  updateOption(requestData) {
    return instance
      .post("/option/update", requestData)
      .then((res) => {
        console.log("deleteOptions res", res);
        return res.data.code === 200;
      })
      .catch((error) => {
        console.error("Error in deleteOptions:", error);
        return false;
      });
  },
  getOptionById(optionId) {
    return instance
      .get(`/option/${optionId}`)
      .then((res) => {
        console.log("getOptionById res", res);
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getOptionById:", error);
        return false;
      });
  },
  getMenuList(page = 0, size = 10) {
    return instance
      .get(`/menu/getList?page=${page}&size=${size}`)
      .then((res) => {
        if (res.data.code !== 200) return false;
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getMenuList: ", error);
        return false;
      });
  },
  getMenuDetail(menuId) {
    console.log("getMenuDetail menuId", menuId);
    return instance
      .get(`/menu/${menuId}`)
      .then((res) => {
        console.log("getMenuDetail res", res);
        if (res.data.code !== 200) return false;
        return res.data.data;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  },

  registerMenu(data) {
    return instance
      .post("menu/register", data)
      .then((res) => {
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in registerMenu:", error);
        return false;
      });
  },
  updateMenu(data) {
    return instance
      .put("/menu/update", data)
      .then((res) => {
        if (res.data.code !== 200) {
          return false;
        }
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in updateMenu:", error);
        return false;
      });
  },
  getStoreInventoryList() {
    return instance
      .get("/inventory/storeInventory/getList")
      .then((res) => {
        if (res.data.code !== 200) return false;
        return res.data.data;
      })
      .catch((error) => {
        console.error("Error in getStoreInventoryList: ", error);
        return false;
      });
  },
  deleteMenus(menuIdList) {
    return instance
      .delete("/menu", {
        data: menuIdList,
      })
      .then((res) => {
        console.log("deleteMenus res", res);
        return res.data.code === 200;
      })
      .catch((error) => {
        console.error("Error in deleteMenus:", error);
        return false;
      });
  },
};
