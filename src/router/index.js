import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import BeforeLogin from "../components/BeforeLogin.vue";
import FindID from "../components/FindID.vue";
import SignUp from "../components/SignUp.vue";
import FindPassword from "../components/FindPassword.vue";

const routes = createRouter({
  history: createWebHistory(), //createWebHistory(), -> for browser history
  routes: [
    {
      path: "/",
      component: BeforeLogin,
      name: "main",
    },
    {
      path: "/signup",
      component: SignUp,
      name: "signup",
    },
    {
      path: "/login",
      component: Login,
      name: "login",
    },
    {
      path: "/findId",
      component: FindID,
      name: "findId",
    },
    {
      path: "/findPwd",
      component: FindPassword,
      name: "findPassword",
    }
    
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
