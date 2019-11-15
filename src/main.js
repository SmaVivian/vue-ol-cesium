import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import request from '@/utils/request'
// import { getCookieDecrypt } from '@/utils/util'

// let Cesium = require('cesium/Cesium')
// // import Cesium from 'cesium/Cesium' //必须全局引入，某个组件中引入忽略无效
// Vue.prototype.Cesium = Cesium

Vue.use(ElementUI)
Vue.prototype.$http = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
