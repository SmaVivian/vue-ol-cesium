import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import request from '@/utils/request'
// import { getCookieDecrypt } from '@/utils/util'

Vue.use(ElementUI)
Vue.prototype.$http = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
