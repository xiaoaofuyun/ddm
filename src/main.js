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
Vue.use(easyui);


Vue.config.productionTip = false
Vue.prototype.global = global_
Vue.use(VueCookies)
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
let Base64 = require('js-base64').Base64;
let sha256 = require("js-sha256").sha256;
let date = require('dateformat');
Vue.use(elementui);
Vue.use(easyui);
window.Vue = Vue;






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App ,elementui,easyui},
  template: '<App/>'
})
