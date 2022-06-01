import type { RouteRecordRaw } from 'vue-router';
import LayoutView from '@/views/layout/router-view/index.vue';
const moduleName = 'image';
/**
 *  路由的children必须加上父路由的path, 因为在处理menu的时候 需要用到当前路由的path去跳转
 * 动态添加的路由会对子路由动态拼接上父路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: `/${moduleName}`,
    name: moduleName,
    redirect: `/${moduleName}/image`,
    component: LayoutView,
    meta: {
      title: '图片',
      icon: 'icon-zhuomian',
    },
    children: [
      {
        path: `/${moduleName}/image`,
        name: `${moduleName}-geneator`,
        component: () =>
          import(/* webpackChunkName: 'image-geneator' */ '@/views/image-geneator/index.vue'),
        meta: {
          title: '图片生成器',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
      },
    ],
  },
];
export default routes;
