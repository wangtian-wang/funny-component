const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_DEV = ['development'].includes(process.env.NODE_ENV);
console.log(process.env.VUE_APP_BaseUrl, 'in vue config');
console.log(process.env.NODE_ENV, 'env-env');
// const port = process.env.port || process.env.config.port || 8098;

/**
 * 配置模块热替换 公共代码打包抽取 runtime.js
 */
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    hot: true,
    client: {
      overlay: false,
      progress: true,
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'svg-icon-[name]',
      });
  },
});
