// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {baseURL} from "./request/index"
import store from "./store"
import {deleteRequest, getRequest, postRequest, putRequest} from './utils/api'
Vue.config.productionTip = false
Vue.prototype.$imgUrl = baseURL+"/static/goods/"
Vue.use(ElementUI)
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.$cartTotal = 0
Vue.config.productionTip = false
console.log(store,99)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
