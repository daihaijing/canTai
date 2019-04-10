import Vue from 'vue'
import Router from 'vue-router'
import routeResolve from '@/util/route-resolving'
import main from '#mod/main/router'
Vue.use(Router);

export default new Router({
  base: __dirname,
  redirect: '/main',  
  routes: routeResolve({
    subRoutes: [main]
  }).children
})
