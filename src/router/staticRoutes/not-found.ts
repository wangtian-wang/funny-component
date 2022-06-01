import type { RouteRecordRaw } from 'vue-router';
import LayoutView from '@/views/layout/router-view/index.vue';
const moduleName = 'error';
export const errorRoute: RouteRecordRaw = {
  path: '/error',
  name: moduleName,
  redirect: '/error/404',
  component: LayoutView,
  meta: {
    title: '错误页面',
    icon: 'EditOutlined',
    hideInMenu: true,
    hideInTabs: true,
  },
  children: [
    {
      path: '404',
      name: 'errorPage',
      meta: {
        title: '404 page',
        icon: 'UserOutlined',
        hideInMenu: true,
      },
      component: () => import(/* webpackChunkName: '404'   */ '@/views/error/index.vue'),
    },
  ],
};
export const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  meta: {
    title: 'not found page',
    hideInMenu: true,
    hideInTabs: true,
  },
  component: () => import(/* webpackChunkName:'404'  */ '@/views/error/index.vue'),
};
export default {
  notFound,
  errorRoute,
};
