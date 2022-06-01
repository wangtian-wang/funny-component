import type { RouteRecordRaw } from 'vue-router';

import { LOGIN_NAME } from '../constant';
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_NAME,
  component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};
export default [LoginRoute];
