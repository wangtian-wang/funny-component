import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App.vue';
import { createApp } from 'vue';

import { setupRouter } from '@/router/index';
import { setupStore } from '@/store/index';
import { setupAntd, setupCustomComponent, setupAssets } from '@/plugin/index';
import MyStore from './my-store/test';
import lazyLoad from './directive/index';
import WaterMark from './components/common/waterMark/index';
import Steps from './components/common/steps/index';
const app = createApp(App);
app.use(MyStore);
app.use(lazyLoad, { preload: 1 });
app.use(WaterMark);
app.use(Steps);
function setupPlugins() {
  setupAntd(app);
  setupAssets();
  setupCustomComponent(app);
}

async function setupApp() {
  setupStore(app);
  await setupRouter(app);
  app.mount('#app');
}
setupPlugins();
setupApp();
require('ant-design-vue/dist/antd.variable.min.css');
