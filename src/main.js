// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import qs from 'qs';
import VueCookies from 'vue-cookies'
import elementui from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import global_ from './components/Global'
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import easyui from 'vx-easyui';
import 'babel-polyfill'
import VueJsonp from 'vue-jsonp'
// import promise from 'es6-promise';
// promise.polyfill();
import 'es6-promise/auto'
Vue.use(easyui);
Vue.config.debug = true;
Vue.use(VueJsonp);
Vue.config.productionTip = false;
Vue.prototype.global = global_;
Vue.use(VueCookies);
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
let Base64 = require('js-base64').Base64;
let sha256 = require("js-sha256").sha256;
let date = require('dateformat');
Vue.use(elementui);
Vue.use(easyui);
window.Vue = Vue;
//axios.defaults.baseURL="/api";
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers['Access-Control-Allow-Headers'] = 'access-control-allow-headers,access-control-allow-origin,authorization';

axios.interceptors.request.use(function (config) {


  return config;
}, function (error) {


  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  //console.log(response.data.code);

  switch (response.data.code) {

    case -1:
      // 返回 401 清除token信息并跳转到登录页面

      router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
      })
  }

 return response;
}, function (error) {
  // 对响应错误做点什么
  //console.log(error)
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App ,elementui,easyui},
  template: '<App/>'
})
