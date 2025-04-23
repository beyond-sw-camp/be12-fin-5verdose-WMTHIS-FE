import { defineStore } from "pinia";
import { reactive, ref } from "vue";

const useAuthStore = defineStore(
  "login",
  () => {
    const loginOrNot = ref(false);

    const storeId = ref("");

    const uInfo = reactive({
      name: "",
      email: "",
      nickname: "",
      userType: "",
    });
    function setInfo(info) {
      uInfo.name = info.name;
      uInfo.email = info.email;
      uInfo.nickname = info.nickname;
      uInfo.userType = info.type;
    }
    function getName() {
      return uInfo.name;
    }
    function getEmail() {
      return uInfo.email;
    }
    function getUserType() {
      return uInfo.userType;
    }
    function setLogin(value) {
      loginOrNot.value = value;
    }
    function getHon() {
      return uInfo.hon;
    }
    function getLogin() {
      return loginOrNot.value;
    }
    function getPw() {
      return uInfo.pw;
    }
    function setStoreId(id) {
      storeId.value = id;
    }
    function getStoreId() {
      return storeId.value;
    }
    return {
      loginOrNot,
      uInfo,
      getLogin,
      getName,
      getUserType,
      setInfo,
      getEmail,
      getHon,
      setLogin,
      getPw,
    };
  },
  {
    persist: {
      enabled: true, // 영속화 활성화
      strategies: [
        {
          storage: localStorage, // 데이터를 저장할 저장소 (localStorage 또는 sessionStorage)
          paths: ["loginOrNot", "uInfo", "storeId"], // 저장할 상태 항목 (여기서는 loginOrNot만 저장)
        },
      ],
    },
  }
);
export default useAuthStore;
