import { lazyLoading } from './lazyLoad/lazyLoad';
export default {
  install(App, options) {
    const binding = lazyLoading(App);
    const bindingLoad = new binding(options);
    const lazyLoad = {
      mounted: bindingLoad.bindLazy.bind(bindingLoad),
    };
    App.directive('lazy', lazyLoad);
  },
};
