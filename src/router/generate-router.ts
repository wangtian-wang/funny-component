import type { RouteRecordRaw } from 'vue-router';
import router, { routes } from '@/router';
import { errorRoute, notFound } from './staticRoutes/not-found';
import LoginRoutes from './staticRoutes/login';
import { constantRouteComponents } from '@/router/asyncModules/index';
import { uniqueSlash, isUrl } from '@/utils/urlUtils';

import RouteView from '@/views/layout/router-view/index.vue';
import ErrorView from '@/views/error/index.vue';
import Result from '@/components/basic/result/index.vue';
import staticRoutes from './staticRoutes/index';
const endRoutes: RouteRecordRaw[] = [errorRoute, notFound];
export function filterAsyncRoute(
  routes: API.Menu[],
  parentRoute: API.Menu | null = null,
  lastNamePath: string[] = [],
) {
  const topLevelRoute = routes.filter((item) => item.isShow && item.parentId == parentRoute?.id); // 过滤出一级路由
  const MenuMapRoute = topLevelRoute.map((item) => {
    const { router, name, icon, viewPath, orderNum, keepAlive } = item;
    let fullPath = '';
    const pathPrefix = lastNamePath.slice(-1)[0] || '';
    fullPath = router.startsWith('/') ? router : '/${router}';
    fullPath = router.startsWith(pathPrefix) ? fullPath : pathPrefix + fullPath;
    fullPath = [...new Set(uniqueSlash(fullPath).split('/'))].join('/');
    let realRoutePath = router;
    if (parentRoute) {
      if (fullPath.startsWith(parentRoute?.router)) {
        realRoutePath = fullPath.split(parentRoute.router)[1];
      } else if (!isUrl(parentRoute.router) && !isUrl(router)) {
        realRoutePath = router;
      }
    }
    realRoutePath = realRoutePath.startsWith('/') ? realRoutePath.slice(1) : realRoutePath;
    const route: Partial<RouteRecordRaw> = {
      path: fullPath,
      name: realRoutePath,
      meta: {
        icon,
        orderNum,
        title: name,
        perms: [],
        keepAlive,
        namePath: lastNamePath.concat(fullPath),
      },
    };
    if (item.type === 0) {
      const children = filterAsyncRoute(routes, item, lastNamePath.concat(fullPath));
      if (children?.length) {
        route.component = RouteView;
        route.children = children;
        route.redirect = { path: children[0]?.path as string };
      } else {
        route.component = Result;
      }
      return route;
    } else if (item.type === 1) {
      const Compo = constantRouteComponents[viewPath] || ErrorView;
      route.component = Compo;
      const perms = routes
        .filter((n) => n.parentId === item.id)
        .flatMap((n) => n.perms?.split(','));
      if (route.meta && perms) {
        route.meta.perms = perms;
      }
      return route;
    }
    return undefined;
  });
  const finalRoute = MenuMapRoute.filter((item) => !!item);
  return finalRoute;
}
export function generateDynamicRoute(asyncMenus: API.Menu[]) {
  const routeList = filterAsyncRoute(asyncMenus);
  const layout = routes.find((item) => item.name == 'layout')!;
  generateNamePath(staticRoutes);
  const menus = [...staticRoutes, ...routeList, ...endRoutes] as RouteRecordRaw[];
  layout.children = menus;

  const removeRoutes = router.addRoute(layout);
  const filterRoutes = router
    .getRoutes()
    .filter(
      (item) =>
        (!item.children.length || Object.is(item.meta?.hideChildrenInMenus, true)) &&
        !LoginRoutes.some((n) => n.name === item.name),
    );

  removeRoutes();
  layout.children = [...filterRoutes];
  router.addRoute(layout);
  return { menus, routes: layout.children };
}
function generateNamePath(routes: RouteRecordRaw[], namePath?: string[], parent?: RouteRecordRaw) {
  routes.forEach((item) => {
    if (item.children?.length) {
      if (item.meta && typeof item.name === 'string') {
        item.meta.namePath = Array.isArray(namePath) ? namePath.concat(item.name) : item.name;
        item.meta.fullPath = parent?.meta?.fullPath
          ? [parent.meta.fullPath, item.path].join('/')
          : item.path;
        item.meta.fullPath = uniqueSlash(item.meta.fullPath as string);
        generateNamePath(item.children, item.meta.namePath as string[], item);
      }
    } else {
      if (item.meta && typeof item.name === 'string') {
        item.meta.namePath = Array.isArray(namePath) ? namePath.concat(item.name) : [item.name];
        /**
          item.meta.fullPath = parent?.meta?.fullPath
          ? [parent.meta.fullPath, item.path].join('/')
          : item.path;
          item.meta.fullPath = uniqueSlash(item.meta.fullPath as string);
         */

        item.meta.fullPath = item.path;
      }
    }
  });
}
