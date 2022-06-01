/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 */

// import darkTheme from 'ant-design-vue/dist/antd.dark.css;
import { ConfigProvider } from 'ant-design-vue';
import type { Theme } from 'ant-design-vue/lib/config-provider';
import { defineStore } from 'pinia';

import { store } from '../index';
import { THEME_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/storage';
export type { Theme };

const colorStyle = document.createElement('style');
colorStyle.dataset.type = 'theme-dark';
document.head.appendChild(colorStyle);

const setRealDarkTheme = (navTheme?: themeColor) => {
  if (navTheme === 'realDark') {
    document.documentElement.classList.add('dark');
    colorStyle.textContent = 'darkTheme';
  } else {
    document.documentElement.classList.remove('dark');
    colorStyle.textContent = '';
  }
};

export type themeColor = 'light' | 'dark' | 'realDark';
export type themeState = {
  navTheme: themeColor;
  primaryColor: string;
  layout: 'sidemenu' | 'topmenu';
  contentWidth: 'Fluid' | 'Fixed';
  fixedHeader: false;
  fixSideBar: false;
  colorWeak: false;
  menu: {
    locale: true;
  };
  title: string;
  pwa: false;
  iconUrl: string;
};
export const defaultConfig: themeState = {
  navTheme: 'dark',
  primaryColor: 'rgba(24,144,255,.4)',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixSideBar: false,
  fixedHeader: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'vite-antd-admin',
  pwa: false,
  iconUrl: '',
};
let localThemeConfig: Partial<themeState> = {};
try {
  localThemeConfig = JSON.parse(Storage.get(THEME_KEY, '{}'));
  const { primaryColor, navTheme } = localThemeConfig;
  navTheme && setRealDarkTheme(navTheme);
  primaryColor &&
    ConfigProvider.config({
      theme: {
        primaryColor,
      },
    });
} catch (err) {
  localThemeConfig = {};
}
export const useThemeStore = defineStore({
  id: 'theme',
  state: (): themeState => {
    return { ...defaultConfig, ...localThemeConfig };
  },
  getters: {
    getNavTheme(): themeColor {
      return this.navTheme;
    },
  },
  actions: {
    setTheme(theme: Partial<themeState>) {
      for (const key in theme) {
        this[key] = theme[key];
      }
      setRealDarkTheme(theme.navTheme);
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
    fillColor(theme: Theme) {
      this.primaryColor = theme.primaryColor ?? this.primaryColor;
      console.log(
        '🚀 ~ file: projectConfig.ts ~ line 110 ~ fillColor ~ this.primaryColor',
        theme.primaryColor,
      );
      ConfigProvider.config({
        theme,
      });
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
  },
});
export function useThemeOutside() {
  return useThemeStore(store);
}
