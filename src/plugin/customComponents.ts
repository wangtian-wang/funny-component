import { type App } from 'vue';
import SvgIcon from '@/components/basic/svg-icon/index.vue';
import IconFont from '@/components/basic/iconfont/index';
export function setupCustomComponent(app: App) {
  app.component('SvgIcon', SvgIcon);
  app.component(IconFont.name, IconFont);
}
