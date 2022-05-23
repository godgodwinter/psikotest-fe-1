import { createRouter, createWebHistory } from 'vue-router';
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
// pages
import NotFound from '../views/NotFound.vue';
import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingLogin from '../views/landing/LandingLogin.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingLayout,
    redirect: '/',
    children: [
      {
        path: '/', 
        name: 'LandingIndex',
        component: LandingIndex,
      },
      {
        path: '/login', 
        name: 'LandingLogin',
        component: LandingLogin,
      },
      {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
  {
    path: '/:catchAll(.*)', redirect: '/404',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
