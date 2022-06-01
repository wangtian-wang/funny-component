import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { store } from '@/store/index';
import { login, getMenu, loginOut } from '../../api/login/index';
import { resetRouter } from '@/router/index';
import { generateDynamicRoute } from '@/router/generate-router';
interface UserState {
  token: string;
  name: string;
  avatar: string;
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: {};
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: '',
      name: '',
      avatar: '',
      perms: [],
      menus: [],
      userInfo: {},
    };
  },
  getters: {
    getAvatar(): string {
      return this.avatar;
    },
    getUserInfo(): object {
      return this.userInfo;
    },
    getPerms(): string[] {
      return this.perms;
    },
    getName(): string {
      return this.name;
    },
  },
  actions: {
    async login(params) {
      try {
        const { data } = await login(params);
        this.setToken(data.data.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLogin() {
      try {
        // 动态注册路由
        const { data } = await getMenu();
        this.perms = data.data.perms;
        const { menus } = generateDynamicRoute(data.data.menus);
        this.menus = menus.filter((item) => !item.meta?.hideInMenu);
        return { menus };
        // 获取菜单
      } catch (error) {}
    },
    logout() {
      loginOut();
      resetRouter();
      this.resetToken();
    },
    setToken(token: string) {
      this.token = token ?? '';
    },
    resetToken() {
      localStorage.removeItem('token');
    },
  },
});
export function useUserStoreOutside() {
  return useUserStore(store);
}
