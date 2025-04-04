import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import BeforeLogin from "../components/BeforeLogin.vue";
import FindID from "../components/FindID.vue";
import SignUp from "../components/SignUp.vue";
import FindPassword from "../components/FindPassword.vue";
import UserMain from "../components/UserMain.vue";
import StoreRegister from "../components/StoreRegister.vue";
import Info from "../components/Info.vue";
import Start from "../components/Start.vue";
import SalesStatus from "../components/SalesStatus.vue";
import Dashboard from "../components/Dashboard.vue";
import BestMenuChart from "../components/BestMenuChart.vue";

const routes = createRouter({
  history: createWebHistory(), //createWebHistory(), -> for browser history
  routes: [
    {
      path: "/",
      component: UserMain,
      name: "main",
      children: [
        // children 속성 추가
        { path: "/", component: Login, name: "login" },
        { path: "/signup", component: SignUp, name: "signup" },
        { path: "/findId", component: FindID, name: "findId" },
        { path: "/findPwd", component: FindPassword, name: "findPassword" },
        { path: "/registore", component: StoreRegister, name: "storeRegister" },
        { path: "/info", component: Info, name: "info" },
        { path: "/start", component: Start, name: "start" },
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
    if (savedPosition) {
      // 이전 위치로 이동 (뒤로 가기/앞으로 가기 할 때)
      return savedPosition;
    } else {
      // 항상 맨 위로 이동
      return { top: 0 };
    }
  },
});

export default routes;
