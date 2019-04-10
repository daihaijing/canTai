// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import store from '@/vuex'
import 'css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'css/element.css'
import locale from 'element-ui/lib/locale/lang/en'
import Element from 'element-ui'
import PrototypeExtend from '@/plugins/vue-prototypes'
import App from '#/app'
import '@/util/array-find-polyfill'
import routerIntercept from 'vr/router-intercept'

Vue.use(PrototypeExtend);
//引入axios
import axios from 'axios'

Vue.use(Element,{locale});
//开发过程注释掉路由拦截
routerIntercept(router, store);
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

