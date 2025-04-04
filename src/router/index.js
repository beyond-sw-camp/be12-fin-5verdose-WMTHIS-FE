import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import MyStore from "../components/MyStore.vue";
import MyMenu from "../components/MyMenu.vue";
import MyOption from "../components/MyOption.vue";
import MyCategory from "../components/MyCategory.vue";
import Content from "../components/MyMap.vue";
import Header from "../components/Header.vue";

const routes = createRouter({
  history: createWebHistory(), //createWebHistory(), -> for browser history
  routes: [
    {
      path: "/",
      component: MyOption,
      name: "main",
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
