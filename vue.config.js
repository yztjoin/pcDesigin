const path = require('path');
const config = require('./scripts/config');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}
//生产环境插件
const prodPlugins = [
  //开启gzip 压缩
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(js|css)$' //压缩 js 与 css
    ),
    threshold: 10240,
    minRatio: 0.8
  })
  //打包模块分析
  // new BundleAnalyzerPlugin()
];
module.exports = {
  //部署应用的的基本URL
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //打包路径
  outputDir: `dist${config.folderName}`,
  //css相关配置
  css: {
    //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项
    loaderOptions: {}
  },
  //是否在开发环境下启用eslint检测
  lintOnSave: false,
  //devserver服务
  devServer: {
    //是否自动打开浏览器
    open: false,
    before:require('./mock/index'),
    //代理服务
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      }
    }
  },
  //生产环境source-map 如需线上调试可设为true
  productionSourceMap: false,
  chainWebpack: (config) => {
    //cdn链接
    const cdn = {
      //开发环境
      dev: {
        js: [
          'https://uufefile.uupt.com/CDN/js/axios.js',
          'https://uufefile.uupt.com/CDN/js/vue-router@3.1.6.js',
          'https://uufefile.uupt.com/CDN/js/vue@2.6.11.runtime.js',
          'https://uufefile.uupt.com/CDN/js/min-uuid.js'
        ]
      },
      //生产环境
      build: {
        js: [
          'https://uufefile.uupt.com/CDN/js/axios@0.19.2.min.js',
          'https://uufefile.uupt.com/CDN/js/vue-router@3.1.6.min.js',
          'https://uufefile.uupt.com/CDN/js/vue@2.6.11.min.js',
          'https://uufefile.uupt.com/CDN/js/min-uuid.js'
        ]
      }
    };
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
    //生产环境忽略的打包模块
    config.externals({
      'vue-router': 'VueRouter',
      axios: 'axios',
      vue: 'Vue'
    });
    //配置别名 兼容老项目@um模块
    config.resolve.alias
      .set('components', resolve('@um/components'))
      .set('controls', resolve('@um/controls/modules'))
      .set('public', resolve('@um/public/Src'))
      .set('plug', resolve('@um/plug/Src'));
  },
  configureWebpack: () => {
    return {
      plugins: process.env.NODE_ENV == 'production' ? prodPlugins : []
    };
  }
};
