import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
 
const routes = createRouter({
  history: createWebHistory(), //createWebHistory(), -> for browser history
    routes: [
    {
      path: '/',
      component: HelloWorld,
      name: 'main'
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
  }
});
 
 
export default routes