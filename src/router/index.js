import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/account/Login.vue";
import SignUpStep1 from "@/components/account/SignUpStep1.vue";
import SignUpStep2 from "@/components/account/SignUpStep2.vue";
import SignUpDone from "@/components/account/SignUpDone.vue";
import FindPassword from "../components/FindPassword.vue";
import StoreRegister from "@/components/account/StoreRegister.vue";
import StoreRegisterDone from "@/components/account/StoreRegisterDone.vue";
import FindPwdStep1 from "@/components/account/FindPwdStep1.vue";
import FindPwdStep2 from "@/components/account/FindPwdStep2.vue";

import UserMain from "../components/UserMain.vue";
import Info from "../components/Info.vue";
import Start from "../components/Start.vue";
import SalesStatus from "../components/SalesStatus.vue";
import Dashboard from "../components/Dashboard.vue";
import BestMenuChart from "../components/BestMenuChart.vue";
import AccountMain from "@/components/account/AccountMain.vue";

const routes = createRouter({
  history: createWebHistory(), //createWebHistory(), -> for browser history
  routes: [
    {
      path: "/",
      component: UserMain,
      children: [
        // children 속성 추가
        { path: "findPwd", component: FindPassword, name: "findPassword" },
        { path: "registore", component: StoreRegister, name: "storeRegister" },
        { path: "info", component: Info, name: "info" },
        { path: "start", component: Start, name: "start" },
      ],
    },
    {
      path: "/account",
      component: AccountMain,
      children: [
        // children 속성 추가
        { path: "login", component: Login, name: "login" },
        { path: "signup1", component: SignUpStep1, name: "signup1" },
        { path: "signup2", component: SignUpStep2, name: "signup2" },
        { path: "sdone", component: SignUpDone, name: "signupDone" },
        { path: "register", component: StoreRegister, name: "storeRegister" },
        { path: "rdone", component: StoreRegisterDone, name: "storedone" },
        { path: "findpwd1", component: FindPwdStep1, name: "findpwd1" },
        { path: "findpwd2", component: FindPwdStep2, name: "findpwd2" },
      ],
    },
    {
      path: "/salesStatus",
      component: SalesStatus,
      name: "salesStatus",
    },
    {
      path: "/best",
      component: BestMenuChart,
      name: "bestMenuChart",
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "dashboard",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return false;
  },
});

export default routes;
