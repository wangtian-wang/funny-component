import type { RouteRecordRaw } from 'vue-router';
import LayoutView from '@/views/layout/router-view/index.vue';
const moduleName = 'dashboard';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: moduleName,
    redirect: '/dashboard/welcome',
    component: LayoutView,
    meta: {
      title: '看板',
      icon: 'icon-shouyekanban',
    },
    children: [
      {
        path: '/dashboard/welcome',
        name: `${moduleName}-welcome`,
        meta: {
          title: '欢迎',
        },
        component: () =>
          import(/* webpackChunkName: "dashboard-welcome" */ '@/views/dashboard/welcome/index.vue'),
      },
    ],
  },
];
export default routes;
