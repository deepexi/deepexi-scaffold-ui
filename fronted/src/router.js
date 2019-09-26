import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/:scaffoldId',
      name: 'scaffold',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "scaffold" */ './views/scaffold.vue')
    }
  ]
})
