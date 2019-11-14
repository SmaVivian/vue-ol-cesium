const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/yourProjectName/'
  //   : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([{ from: 'public/', to: 'public' }]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, 'Assets'), to: 'Assets' }
      ]),
      new CopyWebpackPlugin([
        { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
      ]),
      new CopyWebpackPlugin([
        {
          from: path.join(cesiumSource, 'ThirdParty/Workers'),
          to: 'ThirdParty/Workers'
        }
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      })
    ]
    // module: {
    //   // unknownContextCritical: /^.\/.*$/,
    //   unknownContextCritical: false
    // }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@images', resolve('src/images'))
      .set('@cmp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('cesium', resolve(cesiumSource))
    // config.module
    //   .rule('gltf')
    //   .test(/\.(gltf)$/)
    //   .use('url-loader')
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons'))
    //   .end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/mixin.scss";
        `
      }
    }
  },
  devServer: {
    port: 8080,
    proxy: {
      '/singleMuseum': {
        target: 'http://dev.tj720.com', // 内测环境
        // target: 'http://192.168.5.198:8888', // 谢少雄
        ws: false,
        changeOrigin: true
      }
    }
  },

  lintOnSave: undefined
}
