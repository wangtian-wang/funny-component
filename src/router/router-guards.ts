// import { isNavigationFailure, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';
import type { Router } from 'vue-router';

import { useUserStore } from '@/store/modules/user';
import { Storage } from '@/utils/storage';
import { type WhiteNameList, LOGIN_NAME, REDIRECT_NAME } from './constant';

NProgress.configure({ showSpinner: false });
const defaultRouterPath = '/dashboard/welcome';
export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    NProgress.start();
    const userName = Storage.get('userName');

    if (userName) {
      // 登录成功后 访问Login路由  放行至 dashboard页面
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRouterPath });
        NProgress.done();
      } else {
        // 刷新页面  重新获取路由数据 注册路由
        const hasRoute = router.hasRoute(to.name!);
        await userStore.afterLogin();
        if (hasRoute) {
          next();
        } else {
          next({ ...to, replace: true });
        }
      }
    } else {
      if (whiteNameList.some((item) => item === to.name)) {
        next();
      } else {
        next({ name: LOGIN_NAME, replace: true });
      }
    }
  });
  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
