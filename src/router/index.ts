import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { whiteList } from './constant';
import LoginRoutes from './staticRoutes/login';

import { createRouterGuards } from './router-guards';
export const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/dashboard/welcome',
    component: () => import(/* webpackChunkName: 'layout' */ '@/views/layout/index.vue'),
    meta: {
      title: '首页',
    },
    children: [
      //   {
      //     path: 'dashboard/welcome',
      //     name: 'dashboard',
      //     component: () => import(/* webpackChunkName: 'layout' */ '@/views/dashboard/welcome/index.vue'),
      //   },
    ],
  },
  //   {
  //     path: '
  //     name: 'layout',
  //     redirect: '/login',
  //     meta: {
  //       title: '首页',
  //     },
  //   },
  ...LoginRoutes,
];

const router = createRouter({
  //process.env.BASE_URL
  history: createWebHashHistory(),
  routes,
});
/**
 *   vue-router默认会将所有父路由拍平的children拍平,但是假如当前的router是父路由,还是会保存当前的children,
 *
 *
 *
 *
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && whiteList.indexOf(name as string) === -1) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
export async function setupRouter(app: App) {
  createRouterGuards(router, whiteList);
  app.use(router);
  await router.isReady();
}
export default router;
